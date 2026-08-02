import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getCategory } from "../../data/blog";
import AudioPlayerPill from "./AudioPlayerPill";
import AuthorPopover from "./AuthorPopover";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" });
}

export default function HeroSpotlight({ article }) {
  const cat = getCategory(article.category);
  const readAloudText = `${article.title}. ${article.excerpt}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-[32px] bg-green-deep shadow-[0_35px_80px_-30px_rgba(15,43,34,0.55)] border border-gold/20"
    >
      <div className="absolute inset-0">
        <img src={article.image} alt="" className="h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/85 to-green-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-green-deep/50" />
      </div>

      <div className="relative flex flex-col justify-end min-h-[440px] md:min-h-[520px] p-7 md:p-12">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-gold-light/15 px-3 py-1 text-[11px] font-bold tracking-wider text-gold-light uppercase">
            الخبر الأبرز
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${cat.badgeClass}`}>
            <span aria-hidden="true">{cat.emoji}</span>
            {cat.entity}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold-light/10 px-3 py-1.5 text-xs font-bold text-gold-light shadow-[0_0_25px_-4px_rgba(212,175,55,0.65)]">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            {article.readTime} دقائق قراءة
          </span>
        </div>

        <Link to={`/blog/${article.id}`} className="group w-fit">
          <h2 className="font-head text-2xl md:text-4xl font-bold text-cream leading-tight mb-4 max-w-3xl group-hover:text-gold-light transition-colors">
            {article.title}
          </h2>
        </Link>
        <p className="text-cream/70 text-sm md:text-base leading-relaxed max-w-2xl mb-7 line-clamp-2">{article.excerpt}</p>

        <div className="flex flex-wrap items-center gap-4 md:gap-5">
          <AuthorPopover author={article.author} tone="dark" />
          <span className="h-4 w-px bg-cream/20 hidden sm:block" aria-hidden="true" />
          <span className="text-xs text-cream/60">{formatDate(article.date)}</span>
          <AudioPlayerPill text={readAloudText} minutes={article.readTime} />
        </div>
      </div>
    </motion.div>
  );
}
