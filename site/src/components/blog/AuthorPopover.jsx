import { useEffect, useRef, useState } from "react";

function initials(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}

export default function AuthorPopover({ author, tone = "light" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative inline-flex items-center gap-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#2D4A36] via-[#1C3B28] to-[#0f2417] text-[10px] font-bold text-[#f3d98a] ring-1 ring-gold/30 shrink-0">
          {initials(author.name)}
        </span>
        <span className={`text-xs font-semibold truncate ${tone === "dark" ? "text-cream/90" : "text-ink"}`}>{author.name}</span>
      </button>

      {open && (
        <div className="absolute bottom-full right-0 z-30 mb-2 w-56 rounded-2xl border border-gold/25 bg-green-deep p-4 text-right shadow-[0_20px_45px_-15px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#2D4A36] via-[#1C3B28] to-[#0f2417] text-sm font-bold text-[#f3d98a] ring-1 ring-gold/40 shrink-0">
              {initials(author.name)}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-cream truncate">{author.name}</p>
              {author.title && <p className="text-[11px] text-cream/60 truncate">{author.title}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
