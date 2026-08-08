// One-off: applies site/db/schema.sql to the Railway Postgres. Equivalent to
// `psql "$DATABASE_URL" -f site/db/schema.sql`, for machines without the
// Postgres client tools installed.
//
//   node --env-file=scripts/.env scripts/apply-schema.mjs

import { Client } from "pg";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  const sql = readFileSync(path.join(__dirname, "..", "db", "schema.sql"), "utf8");

  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();
  try {
    await client.query(sql);
    console.log("Schema applied successfully.");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
