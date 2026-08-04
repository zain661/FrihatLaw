import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getCategory } from "../data/blog";
import { getAllArticles, getArticleById, incrementArticleViews } from "../lib/articles";
import PageCTA from "../components/PageCTA";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [more, setMore] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getArticleById(id).then(async (found) => {
      if (cancelled) return;
      setArticle(found);
      if (found) {
        const all = await getAllArticles();
        if (!cancelled) {
          setMore(all.filter((a) => a.id !== found.id && a.category === found.category).slice(0, 3));
        }
      }
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!article) return;
    const key = `viewed_${id}`;
    if (!sessionStorage.getItem(key)) {
      incrementArticleViews(id);
      sessionStorage.setItem(key, "true");
    }
  }, [article, id]);

  if (loading) {
    return <div className="bg-cream min-h-[60vh] pt-32" />;
  }

  if (!article) {
    return (
      <div className="bg-cream min-h-[60vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <h1 className="font-head text-2xl font-bold text-ink mb-4">لم يتم العثور على هذا المقال</h1>
        <Link to="/blog" className="text-green font-bold hover:text-gold transition-colors">
          ← العودة إلى المقالات والمدونة
        </Link>
      </div>
    );
  }

  const cat = getCategory(article.category);
  const paragraphs = article.content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1C3B28] to-[#132B1C] px-5 pt-32 pb-16 md:px-16 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full bg-gold-light/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-gold-light hover:text-cream transition-colors">
              <span aria-hidden="true">→</span>
              العودة إلى المقالات والمدونة
            </Link>
            <span className={`mb-4 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold ${cat.badgeClass}`}>
              <span aria-hidden="true">{cat.emoji}</span>
              {cat.entity}
            </span>
            <h1 className="font-head text-2xl md:text-4xl font-bold text-cream leading-tight mb-5">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-cream/70">
              <span className="font-semibold text-cream">{article.author.name}</span>
              {article.author.title && <span>· {article.author.title}</span>}
              <span>· {formatDate(article.date)}</span>
              <span>· {article.readTime} دقائق قراءة</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 overflow-hidden rounded-3xl shadow-[0_25px_60px_-20px_rgba(15,43,34,0.3)]">
            <img src={article.image} alt="" className="w-full h-64 md:h-96 object-cover" />
          </div>
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base md:text-lg leading-loose text-ink-muted">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="px-5 pb-14 md:px-16">
          <div className="mx-auto max-w-3xl border-t border-green/10 pt-10">
            <p className="font-head text-sm tracking-widest text-green font-bold uppercase mb-5">مقالات ذات صلة</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {more.map((a) => (
                <Link
                  key={a.id}
                  to={`/blog/${a.id}`}
                  className="group rounded-2xl overflow-hidden border border-green/10 bg-paper hover:shadow-[0_15px_35px_-15px_rgba(15,43,34,0.3)] transition-shadow"
                >
                  <div className="h-28 overflow-hidden">
                    <img src={a.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <p className="p-3 text-sm font-bold text-ink leading-snug line-clamp-2 group-hover:text-green transition-colors">
                    {a.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <PageCTA title="هل لديك سؤال قانوني أو مؤسسي؟" body="فريق فريحات جروب جاهز لمساعدتك — احجز استشارتك اليوم." />
    </div>
  );
}
