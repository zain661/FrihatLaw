import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FILTERS, blogHero } from "../data/blog";
import { getAllArticles } from "../lib/articles";
import { supabaseConfigured } from "../lib/supabaseClient";
import HeroSpotlight from "../components/blog/HeroSpotlight";
import SearchBar from "../components/blog/SearchBar";
import CategoryTabs from "../components/blog/CategoryTabs";
import ArticleCard from "../components/blog/ArticleCard";
import TrendingWidget from "../components/blog/TrendingWidget";
import NewsletterBox from "../components/blog/NewsletterBox";

function matchesQuery(article, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    article.title.toLowerCase().includes(q) ||
    article.excerpt.toLowerCase().includes(q) ||
    article.author.name.toLowerCase().includes(q)
  );
}

export default function BlogPage() {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    getAllArticles().then((articles) => {
      if (!cancelled) {
        setAllArticles(articles);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const searched = useMemo(() => allArticles.filter((a) => matchesQuery(a, query)), [allArticles, query]);
  const filtered = active === "all" ? searched : searched.filter((a) => a.category === active);
  const suggestions = query.trim() ? searched.slice(0, 5) : [];

  const isDefaultView = active === "all" && !query.trim();
  const spotlight = isDefaultView ? filtered[0] : null;
  const gridArticles = isDefaultView ? filtered.slice(1) : filtered;

  return (
    <div className="bg-cream">
      {/* Hero heading */}
      <section className="relative bg-gradient-to-br from-[#1C3B28] to-[#132B1C] px-5 pt-32 pb-16 md:px-16 md:pt-40 md:pb-20">
        <div className="relative mx-auto max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-head text-3xl font-bold text-cream mb-4 md:text-5xl">{blogHero.title}</h1>
            <p className="font-body text-cream/70">{blogHero.subtitle}</p>
          </motion.div>
        </div>
        <Link
          to="/admin/post-article"
          className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full border border-cream/15 px-3.5 py-1.5 text-[11px] font-semibold text-cream/50 hover:text-gold-light hover:border-gold-light/40 transition-colors"
        >
          ⚙️ لوحة النشر للفريق
        </Link>
        {!supabaseConfigured && (
          <p className="absolute bottom-5 right-5 rounded-full border border-amber-300/40 bg-amber-400/10 px-3.5 py-1.5 text-[11px] font-semibold text-amber-200">
            وضع القراءة فقط — لم يتم ربط قاعدة البيانات بعد
          </p>
        )}
      </section>

      <section className="px-5 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          {/* Search + filters */}
          <div className="mb-14 space-y-6">
            <SearchBar value={query} onChange={setQuery} suggestions={suggestions} />
            <CategoryTabs filters={FILTERS} active={active} onChange={setActive} />
          </div>

          {/* Featured hero spotlight */}
          {spotlight && (
            <div className="mb-14">
              <HeroSpotlight article={spotlight} />
            </div>
          )}

          {/* Main grid + sidebar */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <motion.div
                key={`${active}-${query}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {loading ? (
                  <div className="rounded-3xl border border-dashed border-green/20 py-20 text-center">
                    <p className="text-ink-muted">جارٍ تحميل المقالات...</p>
                  </div>
                ) : gridArticles.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-green/20 py-20 text-center">
                    <p className="text-ink-muted mb-1">
                      {query.trim() ? `لا توجد نتائج لـ «${query}»` : "لا توجد مقالات في هذا التصنيف بعد."}
                    </p>
                    {query.trim() && (
                      <p className="text-xs text-ink-muted/70">جرّب البحث بكلمات أخرى أو تصفح كل التصنيفات.</p>
                    )}
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {gridArticles.map((a) => (
                      <ArticleCard key={a.id} article={a} />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            <aside className="space-y-8 lg:sticky lg:top-28 self-start">
              <TrendingWidget />
              <NewsletterBox />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
