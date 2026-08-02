import { useState } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../../data/blog";
import { isBookmarked, toggleBookmark } from "../../lib/bookmarks";
import AuthorPopover from "./AuthorPopover";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" });
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.41-1.42a9.87 9.87 0 0 0 4.63 1.18h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.11.11-1.79-.11a15.9 15.9 0 0 1-1.7-.63c-3-1.3-4.95-4.32-5.1-4.52-.15-.2-1.22-1.62-1.22-3.1s.77-2.19 1.05-2.5c.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.24.6.83 2.07.9 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.61.17.3.76 1.26 1.63 2.04 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.74-.86.94-1.16.2-.3.4-.24.66-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.35.08.13.08.75-.16 1.43Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M6.94 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM4.75 9.75h4.38V20H4.75V9.75Zm6.56 0h4.2v1.4h.06c.58-1.06 2-2.17 4.11-2.17 4.4 0 5.21 2.75 5.21 6.32V20h-4.38v-5.05c0-1.2-.02-2.75-1.68-2.75-1.69 0-1.95 1.28-1.95 2.66V20h-4.37V9.75Z" />
    </svg>
  );
}

function QuickAction({ href, onClick, label, children }) {
  const base =
    "pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-green-deep shadow-md hover:bg-white transition-colors cursor-pointer";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={base}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} className={base}>
      {children}
    </button>
  );
}

export default function ArticleCard({ article }) {
  const [saved, setSaved] = useState(() => isBookmarked(article.id));
  const cat = getCategory(article.category);
  const shareUrl = `${window.location.origin}/blog/${article.id}`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-paper border border-green/10 shadow-[0_15px_40px_-20px_rgba(15,43,34,0.25)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:border-[#D4AF37]/40 hover:shadow-[0_25px_55px_-20px_rgba(212,175,55,0.35)]">
      <Link to={`/blog/${article.id}`} aria-label={article.title} className="absolute inset-0 z-0" />

      <div className="relative h-44 overflow-hidden">
        <img
          src={article.image}
          alt=""
          className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute top-3 left-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100 transition-opacity">
          <QuickAction
            onClick={() => setSaved(toggleBookmark(article.id))}
            label={saved ? "إزالة من المحفوظات" : "حفظ المقال"}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={saved ? { fontVariationSettings: '"FILL" 1' } : undefined}
            >
              bookmark
            </span>
          </QuickAction>
          <QuickAction
            href={`https://wa.me/?text=${encodeURIComponent(article.title + " — " + shareUrl)}`}
            label="مشاركة عبر واتساب"
          >
            <WhatsAppIcon />
          </QuickAction>
          <QuickAction
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            label="مشاركة عبر لينكدإن"
          >
            <LinkedInIcon />
          </QuickAction>
        </div>
      </div>

      <div className="pointer-events-none relative z-10 flex flex-1 flex-col p-5">
        <div className="mb-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${cat.badgeClass}`}>
            <span aria-hidden="true">{cat.emoji}</span>
            {cat.entity}
          </span>
        </div>
        <h3 className="font-head text-base font-bold text-ink leading-snug mb-2 group-hover:text-green transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-green/10">
          <span className="pointer-events-auto min-w-0">
            <AuthorPopover author={article.author} />
          </span>
          <span className="text-[11px] text-ink-muted shrink-0">
            {article.readTime} د · {formatDate(article.date)}
          </span>
        </div>
      </div>
    </div>
  );
}
