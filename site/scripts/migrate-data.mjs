// One-off: copies `articles` and `newsletter_subscribers` data from the old
// Supabase Postgres into the new Railway Postgres, and re-hosts every
// article cover image (external Supabase Storage URLs *and* legacy raw
// base64 data URLs some older rows still carry) onto the new Uploads
// service. Truncates the destination tables first (clearing the seed rows
// schema.sql inserted) so there's no primary-key collision.
//
// The `image` column is fetched per-row, separately from the rest of the
// article, because a couple of legacy rows carry multi-MB base64 images
// directly in that column — bundling that into one big `select *` made the
// whole query time out on this network. Fetching it in isolation per row
// keeps each request small and lets slow ones fail without blocking the
// rest.
//
//   node --env-file=scripts/.env scripts/migrate-data.mjs

import { Client } from "pg";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

async function uploadImage(uploadUrl, buffer, filename, contentType) {
  const formData = new FormData();
  formData.append("file", new Blob([buffer], { type: contentType }), filename);
  const res = await fetch(`${uploadUrl}/upload`, { method: "POST", body: formData });
  if (!res.ok) throw new Error(`upload failed: HTTP ${res.status}`);
  const { url } = await res.json();
  return url;
}

// Resolves an article's `image` value to a clean, small URL on the Uploads
// service. Returns the value unchanged if it's already a local /brand/...
// asset, or if re-hosting fails for any reason (never blocks the migration).
async function resolveImage(uploadUrl, id, image) {
  if (!image) return image;

  if (image.startsWith("data:")) {
    const match = image.match(/^data:([^;]+);base64,(.*)$/s);
    if (!match) return image;
    const [, contentType, b64] = match;
    const buffer = Buffer.from(b64, "base64");
    const ext = contentType.split("/")[1]?.split("+")[0] || "jpg";
    console.log(`  -> uploading embedded base64 image (${(buffer.length / 1024).toFixed(0)} KB)...`);
    try {
      return await uploadImage(uploadUrl, buffer, `${id}.${ext}`, contentType);
    } catch (err) {
      console.error(`  -> upload failed, keeping base64 inline: ${err.message}`);
      return image;
    }
  }

  if (image.startsWith("http")) {
    console.log(`  -> re-hosting external image...`);
    try {
      const res = await fetch(image);
      if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      const contentType = res.headers.get("content-type") || "image/jpeg";
      const name = image.split("/").pop() || `${id}.jpg`;
      return await uploadImage(uploadUrl, buffer, name, contentType);
    } catch (err) {
      console.error(`  -> re-host failed, keeping original URL: ${err.message}`);
      return image;
    }
  }

  return image;
}

// Opens a dedicated short-lived connection just for this one query, and
// closes it immediately after. The shared long-lived `source` connection was
// observed to drop unexpectedly partway through transferring the large
// legacy base64 image values — a fresh connection per large fetch is more
// resilient than reusing one connection across several big transfers.
async function fetchImageColumn(connectionString, id) {
  const client = new Client({ connectionString, connectionTimeoutMillis: 10000, query_timeout: 300000 });
  client.on("error", (err) => console.error(`  -> source connection error for ${id}: ${err.message}`));
  await client.connect();
  try {
    const { rows } = await client.query("select image from public.articles where id = $1", [id]);
    return rows[0]?.image ?? null;
  } finally {
    await client.end().catch(() => {});
  }
}

async function copyArticles(source, dest, sourceConnectionString, uploadUrl) {
  console.log("articles: querying source (excluding image column)...");
  const { rows, fields } = await source.query(
    "select id, title, excerpt, content, author, category, date, views, read_time, created_at from public.articles"
  );
  console.log(`articles: source returned ${rows.length} row(s). Truncating destination...`);
  await dest.query("truncate table public.articles");
  if (rows.length === 0) {
    console.log("articles: nothing to copy.");
    return;
  }

  const columns = [...fields.map((f) => f.name), "image"];
  const columnList = columns.map((c) => `"${c}"`).join(", ");
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");

  let i = 0;
  for (const row of rows) {
    i += 1;
    console.log(`articles: row ${i}/${rows.length} (id=${row.id})`);

    let rawImage = null;
    const attempts = 3;
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        rawImage = await fetchImageColumn(sourceConnectionString, row.id);
        break;
      } catch (err) {
        console.error(`  -> image fetch failed (attempt ${attempt}/${attempts}): ${err.message}`);
        if (attempt === attempts) console.error(`  -> giving up on image for ${row.id}, leaving it empty.`);
      }
    }

    const image = await resolveImage(uploadUrl, row.id, rawImage);
    const values = [...fields.map((f) => row[f.name]), image];
    await dest.query(`insert into public.articles (${columnList}) values (${placeholders})`, values);
  }
  console.log(`articles: copied ${rows.length} row(s).`);
}

async function copySubscribers(source, dest) {
  const { rows, fields } = await source.query("select * from public.newsletter_subscribers");
  await dest.query("truncate table public.newsletter_subscribers");
  if (rows.length === 0) {
    console.log("newsletter_subscribers: nothing to copy.");
    return;
  }
  const columns = fields.map((f) => f.name);
  const columnList = columns.map((c) => `"${c}"`).join(", ");
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
  for (const row of rows) {
    const values = columns.map((c) => row[c]);
    await dest.query(`insert into public.newsletter_subscribers (${columnList}) values (${placeholders})`, values);
  }
  console.log(`newsletter_subscribers: copied ${rows.length} row(s).`);
}

async function main() {
  const SUPABASE_DATABASE_URL = requireEnv("SUPABASE_DATABASE_URL");
  const DATABASE_URL = requireEnv("DATABASE_URL");
  const UPLOAD_URL = requireEnv("UPLOAD_URL");

  // Transferring the legacy multi-hundred-KB/multi-MB base64 image values
  // from Supabase appears severely bandwidth-limited on this network (a
  // single 861KB value alone exceeded a 30s timeout) — generous timeout to
  // let those specific transfers finish rather than fail outright.
  const source = new Client({ connectionString: SUPABASE_DATABASE_URL, connectionTimeoutMillis: 10000, query_timeout: 300000 });
  const dest = new Client({ connectionString: DATABASE_URL, connectionTimeoutMillis: 10000, query_timeout: 300000 });
  source.on("error", (err) => console.error(`source connection error: ${err.message}`));
  dest.on("error", (err) => console.error(`dest connection error: ${err.message}`));
  console.log("Connecting to source (Supabase)...");
  await source.connect();
  console.log("Connecting to destination (Railway)...");
  await dest.connect();
  console.log("Both connected.");

  try {
    await copyArticles(source, dest, SUPABASE_DATABASE_URL, UPLOAD_URL);
    await copySubscribers(source, dest);
  } finally {
    await source.end().catch(() => {});
    await dest.end().catch(() => {});
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
