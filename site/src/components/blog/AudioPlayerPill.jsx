import { motion } from "framer-motion";
import { useSpeechReader } from "../../lib/useSpeechReader";

export default function AudioPlayerPill({ text, minutes }) {
  const { playing, toggle, supported } = useSpeechReader(text);

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!supported}
      title={supported ? undefined : "الاستماع غير مدعوم في هذا المتصفح"}
      className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 bg-cream/10 px-4 py-2 text-xs font-bold text-cream backdrop-blur-sm hover:bg-cream/15 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-light text-green-deep shrink-0">
        <span className="material-symbols-outlined text-[15px]">{playing ? "pause" : "play_arrow"}</span>
      </span>
      <span>
        {playing ? "جارٍ الاستماع" : "استمع للمقال"} · {minutes} دقائق
      </span>
      {playing && (
        <span className="flex items-end gap-0.5 h-3" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-0.5 bg-gold-light rounded-full"
              animate={{ height: ["30%", "100%", "30%"] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </span>
      )}
    </button>
  );
}
