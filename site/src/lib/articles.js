import { supabase, supabaseConfigured } from "./supabaseClient";
import { seedArticles } from "../data/blog";

const WORDS_PER_MINUTE = 180;

const NOT_CONFIGURED_MESSAGE =
  "قاعدة البيانات غير مُهيأة بعد. أضف VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env ثم أعد تشغيل الخادم.";

function computeReadTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / WORDS_PER_MINUTE));
}

function autoExcerpt(content) {
  const flat = content.trim().replace(/\s+/g, " ");
  return flat.slice(0, 140) + (flat.length > 140 ? "…" : "");
}

function withReadTime(article) {
  return { ...article, readTime: computeReadTime(article.content) };
}

function byDateDesc(a, b) {
  return new Date(b.date) - new Date(a.date);
}

// Until Supabase is configured, the site still renders (read-only) using the
// bundled seed articles, instead of hard-crashing every page that lists them.
export async function getAllArticles() {
  if (!supabaseConfigured) {
    return seedArticles.map(withReadTime).sort(byDateDesc);
  }
  const { data, error } = await supabase.from("articles").select("*").order("date", { ascending: false });
  if (error) throw error;
  return data.map(withReadTime);
}

export async function getArticleById(id) {
  if (!supabaseConfigured) {
    const found = seedArticles.find((a) => a.id === id);
    return found ? withReadTime(found) : null;
  }
  const { data, error } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? withReadTime(data) : null;
}

export async function getTrendingArticles(limit = 4) {
  if (!supabaseConfigured) {
    return seedArticles
      .map(withReadTime)
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit);
  }
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("views", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data.map(withReadTime);
}

// Best-effort — a failed view count should never break the article page.
export async function incrementArticleViews(articleId) {
  if (!supabaseConfigured) return;
  try {
    const { error } = await supabase.rpc("increment_views", { article_id: articleId });
    if (error) throw error;
  } catch (err) {
    console.error("Failed to increment article views:", err);
  }
}

export async function subscribeToNewsletter(email) {
  const normalized = email.trim().toLowerCase();
  if (!supabaseConfigured) {
    throw new Error("الاشتراك في النشرة غير متاح حاليًا، حاول لاحقًا.");
  }

  let result;
  try {
    result = await supabase.from("newsletter_subscribers").insert({ email: normalized });
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

const IMAGE_BUCKET = "article-images";

// Uploads a cover image to Supabase Storage and returns its public URL —
// articles store a plain HTTP URL in the `image` column, never raw base64.
export async function uploadArticleImage(file) {
  if (!supabaseConfigured) throw new Error(NOT_CONFIGURED_MESSAGE);

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const filePath = `articles/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(filePath, file);
  if (error) {
    console.error("Failed to upload article image:", error);
    throw new Error("تعذّر رفع الصورة، حاول مرة أخرى.");
  }

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function createArticle({ title, content, author, category, image }) {
  if (!supabaseConfigured) throw new Error(NOT_CONFIGURED_MESSAGE);
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
  };
  const { error } = await supabase.from("articles").insert(article);
  if (error) throw error;
  return article;
}

export async function updateArticle(id, { title, content, author, category, image }) {
  if (!supabaseConfigured) throw new Error(NOT_CONFIGURED_MESSAGE);
  const updates = { title, excerpt: autoExcerpt(content), content, author, category, image };
  const { data, error } = await supabase.from("articles").update(updates).eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteArticle(id) {
  if (!supabaseConfigured) throw new Error(NOT_CONFIGURED_MESSAGE);
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
}
