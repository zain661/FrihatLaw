import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { companies } from "../data/home";

const N = companies.length;
const AUTOPLAY_MS = 3000;

function relativePosition(index, active) {
  const rel = (index - active + N) % N;
  if (rel === 0) return 0;
  return rel <= Math.floor(N / 2) ? rel : rel - N;
}

function useSpreadOffset() {
  const [offset, setOffset] = useState(260);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setOffset(w < 640 ? 110 : w < 1024 ? 200 : 260);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return offset;
}

function StackCard({ c, pos, offset, onSelect }) {
  const isActive = pos === 0;

  return (
    <motion.div
      onClick={onSelect}
      className="absolute inset-0 m-auto h-full w-full max-w-lg cursor-pointer select-none rounded-[28px] border bg-cream p-8 pb-14 md:p-12 md:pb-16 flex flex-col"
      style={{ borderColor: isActive ? "rgba(201,153,47,0.5)" : "rgba(201,153,47,0.2)" }}
      animate={{
        x: pos * offset,
        scale: isActive ? 1 : 0.86,
        opacity: isActive ? 1 : 0.6,
        rotateY: pos * -8,
        zIndex: isActive ? 30 : 20 - Math.abs(pos),
        boxShadow: isActive
          ? "0 32px 70px -30px rgba(15,43,34,0.35)"
          : "0 16px 40px -28px rgba(15,43,34,0.18)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <div className="mb-6 text-right">
        <span className="font-head text-2xl font-black text-gold">{c.order}</span>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-paper border border-green/10 flex items-center justify-center">
          <img src={c.logo} alt={c.tag} className="h-8 w-8 object-contain" />
        </span>
        <span className="font-head text-xs tracking-[0.25em] font-bold uppercase text-gold whitespace-nowrap">{c.tag}</span>
      </div>

      <h3 className="font-head text-2xl font-extrabold text-green-deep leading-snug line-clamp-2 h-16 mb-4">{c.name}</h3>
      <p className="text-ink-muted leading-relaxed line-clamp-3 h-20 mb-6">{c.summary}</p>
      <p className="text-xs text-ink-muted/70 leading-relaxed line-clamp-2 h-10 border-t border-green/10 pt-5 mb-8">{c.credential}</p>

      <Link
        to={c.href}
        onClick={(e) => !isActive && e.preventDefault()}
        tabIndex={isActive ? 0 : -1}
        className="mt-auto inline-flex w-fit items-center gap-1.5 font-head font-bold text-sm text-gold"
      >
        <span className="border-b-2 border-transparent pb-0.5 transition-colors duration-300 hover:border-current">
          استكشف الكيان
        </span>
        <span aria-hidden="true">←</span>
      </Link>
    </motion.div>
  );
}

export default function Companies() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const reduceMotion = useReducedMotion();
  const offset = useSpreadOffset();

  useEffect(() => {
    if (reduceMotion || hovering) return;
    const id = setInterval(() => setActive((a) => (a + 1) % N), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active, hovering, reduceMotion]);

  return (
    <section className="relative overflow-hidden bg-paper border-t border-gold/12 py-14 md:py-20 px-6 md:px-10">
      <div className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="font-head text-base tracking-wide leading-relaxed text-gold font-semibold uppercase mb-5">كياناتنا</p>
          <h2 className="font-head text-3xl md:text-5xl font-extrabold text-green-deep leading-tight">
            منظومة متكاملة تحت مظلة فريحات جروب
          </h2>
        </motion.div>

        <div
          className="relative mx-auto h-[560px] sm:h-[520px] max-w-4xl"
          style={{ perspective: 1400 }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="كيانات فريحات جروب"
        >
          {companies.map((c, i) => (
            <StackCard
              key={c.id}
              c={c}
              pos={relativePosition(i, active)}
              offset={offset}
              onSelect={() => setActive(i)}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => setActive((a) => (a - 1 + N) % N)}
            aria-label="الكيان السابق"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-cream text-green-deep transition-all duration-300 hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(197,160,89,0.5)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-2">
            {companies.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                aria-label={c.name}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-gold" : "w-2.5 bg-gold/25 hover:bg-gold/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setActive((a) => (a + 1) % N)}
            aria-label="الكيان التالي"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-cream text-green-deep transition-all duration-300 hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(197,160,89,0.5)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
