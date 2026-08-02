import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { testimonials, companies } from "../data/home";

const TOTAL = testimonials.length;
const AUTOPLAY_MS = 4000;
const TRANSITION_MS = 500;
const ENTITY_LOGOS = Object.fromEntries(companies.map((c) => [c.id, c.logo]));

function useVisibleCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setCount(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return count;
}

function Stars() {
  return (
    <div className="mb-5 flex items-center gap-1 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

function ClientAvatar({ name, logo }) {
  if (logo) {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#C5A059]/30 bg-white">
        <img src={logo} alt={name} className="h-full w-full object-contain p-1" />
      </span>
    );
  }

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C5A059]/30 bg-green-deep font-head text-base font-bold text-gold">
      {name.trim().charAt(0)}
    </span>
  );
}

function TestimonialCard({ t, widthPercent }) {
  return (
    <div className="shrink-0 px-3" style={{ width: `${widthPercent}%` }}>
      <div
        className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-cream p-8 text-right shadow-[0_16px_40px_-26px_rgba(15,43,34,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-26px_rgba(15,43,34,0.28)]"
        style={{ border: "1px solid rgba(197,160,89,0.2)" }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 left-4 font-head text-[7rem] font-black leading-none text-gold/10 select-none"
        >
          "
        </span>

        <div className="relative">
          <span className="inline-flex flex-row items-center gap-2 whitespace-nowrap rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1.5 text-xs font-semibold text-gold mb-5">
            {ENTITY_LOGOS[t.entityId] && (
              <img src={ENTITY_LOGOS[t.entityId]} alt="" className="h-4 w-4 shrink-0 object-contain" />
            )}
            {t.entity}
          </span>

          <Stars />

          <p className="text-ink leading-relaxed line-clamp-4 h-28 mb-8">{t.quote}</p>

          <div className="flex flex-row items-center gap-3 border-t border-green/10 pt-5">
            <ClientAvatar name={t.name} logo={t.logo} />
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#1C352D] line-clamp-1">{t.name}</p>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{t.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const visibleCount = useVisibleCount();

  // extended = [..last `visibleCount` clones, ..real items, ..first `visibleCount` clones]
  const extended = [
    ...testimonials.slice(TOTAL - visibleCount),
    ...testimonials,
    ...testimonials.slice(0, visibleCount),
  ];

  const [trackIndex, setTrackIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [hovering, setHovering] = useState(false);
  const snapTimer = useRef(null);

  // Reset to a stable base position whenever the responsive card count changes
  useEffect(() => {
    setWithTransition(false);
    setTrackIndex(0);
    const id = requestAnimationFrame(() => setWithTransition(true));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount]);

  const step = (delta) => setTrackIndex((i) => i + delta);

  // Autoplay
  useEffect(() => {
    if (TOTAL === 0 || reduceMotion || hovering) return;
    const id = setInterval(() => step(1), AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex, hovering, reduceMotion]);

  // After each slide finishes, silently snap back into the real [0, TOTAL) range if we've drifted into the cloned edges
  useEffect(() => {
    clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => {
      if (trackIndex >= TOTAL) {
        setWithTransition(false);
        setTrackIndex((i) => i - TOTAL);
      } else if (trackIndex < 0) {
        setWithTransition(false);
        setTrackIndex((i) => i + TOTAL);
      }
    }, TRANSITION_MS + 30);
    return () => clearTimeout(snapTimer.current);
  }, [trackIndex, visibleCount]);

  useEffect(() => {
    if (!withTransition) {
      const id = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [withTransition]);

  if (TOTAL === 0) return null;

  const cardWidthPercent = 100 / visibleCount;
  // Track is padded with `visibleCount` clones on each end (see `extended`
  // above), so shifting by +trackIndex card-widths lands on real index
  // `trackIndex` — confirmed empirically against this RTL flex-row layout.
  const translateX = trackIndex * cardWidthPercent;
  const activeReal = ((trackIndex % TOTAL) + TOTAL) % TOTAL;

  return (
    <section className="relative overflow-hidden bg-cream border-t border-gold/12 py-14 md:py-20 px-6 md:px-10">
      <div className="pointer-events-none absolute top-0 right-1/4 h-[380px] w-[380px] rounded-full bg-teal/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="font-head text-base tracking-wide leading-relaxed text-gold font-semibold uppercase mb-5">
            آراء عملائنا
          </p>
          <h2 className="font-head text-3xl md:text-4xl font-extrabold text-green-deep leading-tight">
            ثقة عملائنا هي أفضل شهادة على عملنا
          </h2>
        </motion.div>

        <div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="آراء عملاء فريحات جروب"
        >
          <div className="relative w-full overflow-hidden py-2">
            <div
              className={`flex flex-row flex-nowrap ${
                withTransition && !reduceMotion ? "transition-transform duration-500 ease-in-out" : ""
              }`}
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {extended.map((t, i) => (
                <TestimonialCard key={`${t.id}-${i}`} t={t} widthPercent={cardWidthPercent} />
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => step(-1)}
              aria-label="السابق"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-paper text-green-deep transition-all duration-300 hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(197,160,89,0.5)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setTrackIndex(i)}
                  aria-label={t.name}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeReal ? "w-8 bg-gold" : "w-2.5 bg-gold/25 hover:bg-gold/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => step(1)}
              aria-label="التالي"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-paper text-green-deep transition-all duration-300 hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(197,160,89,0.5)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
