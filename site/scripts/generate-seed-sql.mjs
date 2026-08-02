import { seedArticles } from "../src/data/blog.js";

function esc(str) {
  return String(str).replace(/'/g, "''");
}

function jsonEsc(obj) {
  return esc(JSON.stringify(obj));
}

const rows = seedArticles
  .map((a) => {
    return `('${esc(a.id)}', '${esc(a.title)}', '${esc(a.excerpt)}', '${esc(a.content)}', '${jsonEsc(a.author)}'::jsonb, '${esc(a.category)}', '${esc(a.image)}', '${esc(a.date)}', ${a.views ?? 0})`;
  })
  .join(",\n");

const sql = `insert into public.articles (id, title, excerpt, content, author, category, image, date, views)
values
${rows}
on conflict (id) do nothing;
`;

console.log(sql);
