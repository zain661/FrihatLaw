// Sends the "new article published" email to every newsletter subscriber.
//
// This site is a static Vite SPA with no backend server/API routes, so this
// is a standalone script — not something the site can trigger by itself yet.
// Run it by hand right after publishing an article (or wire it into a CI
// job / cron / Supabase database webhook later if you want it automatic):
//
//   node --env-file=scripts/.env scripts/send-newsletter.mjs <articleId>
//
// Required env vars — put them in scripts/.env (already covered by the
// repo's ".env" gitignore rule, so it won't be committed). See
// scripts/.env.example for the full list. Never prefix these with VITE_ —
// that would bundle the service-role/Resend keys into the public site.

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const BATCH_SIZE = 100; // Resend's batch send limit per call

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name} (see scripts/.env.example)`);
    process.exit(1);
  }
  return value;
}

function chunk(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

function buildEmailHtml(article, siteUrl) {
  const articleUrl = `${siteUrl}/blog/${article.id}`;
  return `
  <div style="background:#F7F5EE;padding:32px 16px;font-family:Tahoma,Arial,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e7e2d6;">
      <tr>
        <td style="background:#1C3B28;padding:24px;text-align:center;">
          <span style="color:#D4AF37;font-size:13px;letter-spacing:2px;font-weight:bold;text-transform:uppercase;">فريحات جروب</span>
        </td>
      </tr>
      ${
        article.image
          ? `<tr><td><img src="${article.image}" alt="" width="560" style="width:100%;display:block;max-height:280px;object-fit:cover;" /></td></tr>`
          : ""
      }
      <tr>
        <td style="padding:28px 28px 8px;direction:rtl;text-align:right;">
          <h1 style="margin:0 0 12px;font-size:22px;line-height:1.4;color:#1C3B28;">${article.title}</h1>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#4b5a51;">${article.excerpt}</p>
          <a href="${articleUrl}" style="display:inline-block;background:#D4AF37;color:#1C3B28;font-weight:bold;font-size:14px;padding:12px 24px;border-radius:999px;text-decoration:none;">اقرأ المقال كاملاً ←</a>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;direction:rtl;text-align:right;border-top:1px solid #eee;">
          <p style="margin:0;font-size:12px;color:#9a9488;">
            تصلك هذه الرسالة لأنك اشتركت في نشرة فريحات جروب البريدية.
            للإلغاء، يمكنك الرد على هذه الرسالة وسنقوم بإزالة بريدك فورًا.
          </p>
        </td>
      </tr>
    </table>
  </div>`;
}

async function main() {
  const articleId = process.argv[2];
  if (!articleId) {
    console.error("Usage: node scripts/send-newsletter.mjs <articleId>");
    process.exit(1);
  }

  const SUPABASE_URL = requireEnv("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const RESEND_API_KEY = requireEnv("RESEND_API_KEY");
  const RESEND_FROM_EMAIL = requireEnv("RESEND_FROM_EMAIL");
  const SITE_URL = process.env.SITE_URL || "https://frihatlaw-production-3d94.up.railway.app";

  // Service-role key bypasses RLS — required here since the anon key is
  // intentionally blocked from reading newsletter_subscribers (see schema.sql).
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const resend = new Resend(RESEND_API_KEY);

  const { data: article, error: articleError } = await supabase
    .from("articles")
    .select("*")
    .eq("id", articleId)
    .maybeSingle();
  if (articleError) throw articleError;
  if (!article) {
    console.error(`No article found with id "${articleId}"`);
    process.exit(1);
  }

  const { data: subscribers, error: subsError } = await supabase
    .from("newsletter_subscribers")
    .select("email");
  if (subsError) throw subsError;
  if (!subscribers || subscribers.length === 0) {
    console.log("No subscribers to send to. Done.");
    return;
  }

  const html = buildEmailHtml(article, SITE_URL);
  const batches = chunk(subscribers, BATCH_SIZE);

  let sent = 0;
  for (const batch of batches) {
    const payload = batch.map(({ email }) => ({
      from: RESEND_FROM_EMAIL,
      to: email,
      subject: `مقال جديد: ${article.title}`,
      html,
    }));
    const { error } = await resend.batch.send(payload);
    if (error) {
      console.error("Batch send failed:", error);
      continue;
    }
    sent += batch.length;
  }

  console.log(`Sent "${article.title}" to ${sent}/${subscribers.length} subscriber(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
