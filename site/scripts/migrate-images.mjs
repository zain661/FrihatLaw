// One-off: moves article cover images off Supabase Storage onto the new
// Uploads service (Railway Volume), and rewrites `articles.image` in Postgres
// to point at the new URLs. Safe to re-run — rows whose `image` no longer
// starts with "http" (already migrated, or a local /brand/... asset) are
// skipped.
//
// Run once, after both the Railway Postgres (with schema + data already
// loaded) and the Uploads service are live:
//
//   node --env-file=scripts/.env scripts/migrate-images.mjs
//
// Required env vars — put them in scripts/.env (see scripts/.env.example):
//   DATABASE_URL   Railway Postgres connection string
//   UPLOAD_URL     Public URL of the Uploads service (no trailing slash)

import { Pool } from "pg";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

async function main() {
  const DATABASE_URL = requireEnv("DATABASE_URL");
  const UPLOAD_URL = requireEnv("UPLOAD_URL");

  const pool = new Pool({ connectionString: DATABASE_URL });

  const { rows } = await pool.query("select id, image from public.articles where image like 'http%'");
  if (rows.length === 0) {
    console.log("No externally-hosted images left to migrate. Done.");
    await pool.end();
    return;
  }

  let migrated = 0;
  for (const { id, image } of rows) {
    try {
      const sourceRes = await fetch(image);
      if (!sourceRes.ok) throw new Error(`download failed: HTTP ${sourceRes.status}`);
      const blob = await sourceRes.blob();

      const formData = new FormData();
      formData.append("file", blob, image.split("/").pop() || `${id}.jpg`);

      const uploadRes = await fetch(`${UPLOAD_URL}/upload`, { method: "POST", body: formData });
      if (!uploadRes.ok) throw new Error(`upload failed: HTTP ${uploadRes.status}`);
      const { url } = await uploadRes.json();

      await pool.query("update public.articles set image = $1 where id = $2", [url, id]);
      console.log(`[${id}] ${image} -> ${url}`);
      migrated += 1;
    } catch (err) {
      console.error(`[${id}] failed:`, err.message);
    }
  }

  console.log(`Migrated ${migrated}/${rows.length} image(s).`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
