import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../../data/blog";
import { getTrendingArticles } from "../../lib/articles";

export default function TrendingWidget() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getTrendingArticles(4).then((data) => {
      if (!cancelled) {
        setArticles(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || articles.length === 0) return null;

  return (
    <div className="rounded-3xl border border-green/10 bg-paper p-6 shadow-[0_20px_45px_-25px_rgba(15,43,34,0.3)]">
      <div className="mb-5 flex items-center gap-2">
        <span className="material-symbols-outlined text-gold">local_fire_department</span>
        <h3 className="font-head text-base font-bold text-ink">الأكثر قراءة</h3>
      </div>
      <ol className="space-y-4">
        {articles.map((a, i) => (
          <li key={a.id}>
            <Link to={`/blog/${a.id}`} className="group flex items-start gap-3">
              <span className="font-head text-2xl font-extrabold text-gold/30 group-hover:text-gold transition-colors leading-none w-6 shrink-0">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink leading-snug line-clamp-2 group-hover:text-green transition-colors">
                  {a.title}
                </p>
                <p className="mt-1 text-[11px] text-ink-muted">
                  {getCategory(a.category).emoji} {(a.views || 0).toLocaleString("ar-EG")} مشاهدة
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
