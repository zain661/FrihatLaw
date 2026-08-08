import { PostgrestClient } from "@supabase/postgrest-js";

const postgrestUrl = import.meta.env.VITE_POSTGREST_URL;
export const uploadUrl = import.meta.env.VITE_UPLOAD_URL;

// Missing until the two env vars below are filled in — see .env.example.
// Articles fall back to seed-only, read-only behavior until this is configured.
export const apiConfigured = Boolean(postgrestUrl && uploadUrl);

export const postgrest = postgrestUrl ? new PostgrestClient(postgrestUrl) : null;
