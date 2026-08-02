export default function CategoryTabs({ filters, active, onChange }) {
  return (
    <div dir="rtl" className="flex flex-wrap justify-center gap-2">
      {filters.map((f) => {
        const isActive = active === f.key;
        return (
          <button
            key={f.key}
            type="button"
            onClick={() => onChange(f.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
              isActive ? "bg-green-deep text-cream" : "bg-cream-deep/60 text-ink-muted hover:bg-cream-deep"
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
