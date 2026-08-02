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
