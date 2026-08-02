import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ value, onChange, suggestions }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const trimmed = value.trim();

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <span className="material-symbols-outlined absolute top-1/2 right-4 -translate-y-1/2 text-ink-muted/60 pointer-events-none">
        search
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        placeholder="ابحث في المقالات والمدونة..."
        className="w-full rounded-full border border-green/15 bg-paper py-3.5 pr-12 pl-5 text-ink outline-none focus:border-gold transition-colors shadow-[0_10px_30px_-15px_rgba(15,43,34,0.2)]"
      />

      {open && trimmed && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-green/10 bg-paper shadow-[0_25px_50px_-20px_rgba(15,43,34,0.35)]">
          {suggestions.length > 0 ? (
            suggestions.map((a) => (
              <button
                key={a.id}
                type="button"
                onMouseDown={() => navigate(`/blog/${a.id}`)}
                className="flex w-full items-center gap-3 px-4 py-3 text-right hover:bg-green/5 transition-colors cursor-pointer"
              >
                <img src={a.image} alt="" className="h-9 w-9 rounded-lg object-cover shrink-0" />
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">{a.title}</span>
              </button>
            ))
          ) : (
            <p className="px-4 py-4 text-center text-sm text-ink-muted">
              لا توجد نتائج لـ «{trimmed}» — جرّب كلمة أخرى.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
