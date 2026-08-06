import { seedArticles } from "../src/data/blog.js";

const WORDS_PER_MINUTE = 180;

function esc(str) {
  return String(str).replace(/'/g, "''");
}

function jsonEsc(obj) {
  return esc(JSON.stringify(obj));
}

function computeReadTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / WORDS_PER_MINUTE));
}

const rows = seedArticles
  .map((a) => {
    return `('${esc(a.id)}', '${esc(a.title)}', '${esc(a.excerpt)}', '${esc(a.content)}', '${jsonEsc(a.author)}'::jsonb, '${esc(a.category)}', '${esc(a.image)}', '${esc(a.date)}', ${a.views ?? 0}, ${computeReadTime(a.content)})`;
  })
  .join(",\n");

const sql = `insert into public.articles (id, title, excerpt, content, author, category, image, date, views, read_time)
values
${rows}
on conflict (id) do nothing;
`;

console.log(sql);
