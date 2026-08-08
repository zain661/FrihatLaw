import { postgrest, apiConfigured, uploadUrl } from "./apiClient";
import { seedArticles } from "../data/blog";

const WORDS_PER_MINUTE = 180;

const NOT_CONFIGURED_MESSAGE =
  "قاعدة البيانات غير مُهيأة بعد. أضف VITE_POSTGREST_URL و VITE_UPLOAD_URL في ملف .env ثم أعد تشغيل الخادم.";

function computeReadTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / WORDS_PER_MINUTE));
}

function autoExcerpt(content) {
  const flat = content.trim().replace(/\s+/g, " ");
  return flat.slice(0, 140) + (flat.length > 140 ? "…" : "");
}

// `read_time` is precomputed and stored at write time (see createArticle /
// updateArticle) so list queries can skip fetching the heavy `content` field
// entirely. Falls back to computing it from `content` for seed articles and
// as a safety net for any row written before the column existed.
function withReadTime(article) {
  const { read_time, ...rest } = article;
  return { ...rest, readTime: read_time ?? computeReadTime(article.content ?? "") };
}

function byDateDesc(a, b) {
  return new Date(b.date) - new Date(a.date);
}

// Lightweight field set for article list/card views — deliberately excludes
// `content` (the heavy field) to keep list queries fast.
const LIST_FIELDS = "id, title, excerpt, image, date, views, category, author, read_time";

// Until the API is configured, the site still renders (read-only) using the
// bundled seed articles, instead of hard-crashing every page that lists them.
export async function getAllArticles() {
  if (!apiConfigured) {
    return seedArticles.map(withReadTime).sort(byDateDesc);
  }
  const { data, error } = await postgrest.from("articles").select(LIST_FIELDS).order("date", { ascending: false });
  if (error) throw error;
  return data.map(withReadTime);
}

export async function getArticleById(id) {
  if (!apiConfigured) {
    const found = seedArticles.find((a) => a.id === id);
    return found ? withReadTime(found) : null;
  }
  const { data, error } = await postgrest.from("articles").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? withReadTime(data) : null;
}

export async function getTrendingArticles(limit = 4) {
  if (!apiConfigured) {
    return seedArticles
      .map(withReadTime)
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit);
  }
  const { data, error } = await postgrest
    .from("articles")
    .select(LIST_FIELDS)
    .order("views", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data.map(withReadTime);
}

// Best-effort — a failed view count should never break the article page.
export async function incrementArticleViews(articleId) {
  if (!apiConfigured) return;
  try {
    const { error } = await postgrest.rpc("increment_views", { article_id: articleId });
    if (error) throw error;
  } catch (err) {
    console.error("Failed to increment article views:", err);
  }
}

export async function subscribeToNewsletter(email) {
  const normalized = email.trim().toLowerCase();
  if (!apiConfigured) {
    throw new Error("الاشتراك في النشرة غير متاح حاليًا، حاول لاحقًا.");
  }

  let result;
  try {
    result = await postgrest.from("newsletter_subscribers").insert({ email: normalized });
  } catch {
    throw new Error("تعذّر الاتصال بالخادم، تحقق من اتصالك بالإنترنت وحاول مرة أخرى.");
  }

  const { error } = result;
  if (error) {
    if (error.code === "23505") {
      throw new Error("هذا البريد الإلكتروني مُشترك بالفعل!");
    }
    throw new Error("تعذّر إتمام الاشتراك، حاول مرة أخرى.");
  }
}

// Uploads a cover image to the Uploads service (Railway Volume) and returns
// its public URL — articles store a plain HTTP URL in the `image` column,
// never raw base64.
export async function uploadArticleImage(file) {
  if (!apiConfigured) throw new Error(NOT_CONFIGURED_MESSAGE);

  const formData = new FormData();
  formData.append("file", file);

  let response;
  try {
    response = await fetch(`${uploadUrl}/upload`, { method: "POST", body: formData });
  } catch (err) {
    console.error("Failed to upload article image:", err);
    throw new Error("تعذّر رفع الصورة، حاول مرة أخرى.");
  }
  if (!response.ok) {
    console.error("Failed to upload article image:", await response.text().catch(() => response.statusText));
    throw new Error("تعذّر رفع الصورة، حاول مرة أخرى.");
  }

  const { url } = await response.json();
  return url;
}

export async function createArticle({ title, content, author, category, image }) {
  if (!apiConfigured) throw new Error(NOT_CONFIGURED_MESSAGE);
  const article = {
    id: `art-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    excerpt: autoExcerpt(content),
    content,
    author,
    category,
    image,
    date: new Date().toISOString().slice(0, 10),
    views: 0,
    read_time: computeReadTime(content),
  };
  const { error } = await postgrest.from("articles").insert(article);
  if (error) throw error;
  return article;
}

export async function updateArticle(id, { title, content, author, category, image }) {
  if (!apiConfigured) throw new Error(NOT_CONFIGURED_MESSAGE);
  const updates = {
    title,
    excerpt: autoExcerpt(content),
    content,
    author,
    category,
    image,
    read_time: computeReadTime(content),
  };
  const { data, error } = await postgrest.from("articles").update(updates).eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteArticle(id) {
  if (!apiConfigured) throw new Error(NOT_CONFIGURED_MESSAGE);
  const { error } = await postgrest.from("articles").delete().eq("id", id);
  if (error) throw error;
}
