import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { process } from "../data/home";
import { processEn } from "../data/home.en";
import { useLanguage } from "../lib/LanguageContext";

function nodeStyle(lit) {
  return {
    backgroundColor: lit ? "#C9992F" : "#FDFCF7",
    borderColor: lit ? "#C9992F" : "rgba(201,153,47,0.35)",
    boxShadow: lit ? "0 0 0 6px rgba(201,153,47,0.15)" : "0 0 0 0 rgba(201,153,47,0)",
    scale: lit ? 1.06 : 1,
  };
}

export default function Process() {
  const { lang } = useLanguage();
  const t = lang === "en" ? processEn : process;
  const STEPS = t.steps;
  const N = STEPS.length;
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [revealed, setRevealed] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setRevealed(N);
      return;
    }
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setRevealed((c) => Math.max(c, i + 1)), 200 + i * 350)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion]);

  const displayCount = hoverIndex !== null ? hoverIndex + 1 : revealed;
  const lineWidth = displayCount > 0 ? ((displayCount - 0.5) / N) * 100 : 0;

  return (
    <section id="process" className="relative overflow-hidden bg-paper border-t border-gold/12 py-14 md:py-20 px-6 md:px-10">
      <div className="pointer-events-none absolute -top-20 -start-20 h-[380px] w-[380px] rounded-full bg-teal/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -end-24 h-[380px] w-[380px] rounded-full bg-gold/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <p className="font-head text-base tracking-wide leading-relaxed text-gold font-semibold uppercase mb-5">{t.eyebrow}</p>
          <h2 className="font-head text-3xl md:text-5xl font-extrabold text-green-deep leading-tight mb-5">
            {t.title}
          </h2>
          <p className="text-ink-muted text-lg leading-relaxed">{t.desc}</p>
        </motion.div>

        {/* Desktop: connected horizontal timeline */}
        <div ref={containerRef} className="relative hidden md:grid grid-cols-4 gap-6">
          <div className="absolute inset-x-0 top-7 h-[3px] rounded-full bg-green/10" />
          <motion.div
            className="absolute start-0 top-7 h-[3px] rounded-full"
            style={{ width: `${lineWidth}%`, background: "linear-gradient(90deg, #E7B84D, #C9992F)" }}
            animate={{ width: `${lineWidth}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {STEPS.map((step, i) => {
            const lit = i < displayCount;
            return (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <motion.span
                  animate={nodeStyle(lit)}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 font-head font-black text-sm"
                >
                  <span style={{ color: lit ? "#FDFCF7" : "#0F2B22" }}>{String(i + 1).padStart(2, "0")}</span>
                </motion.span>

                <div
                  className={`mt-6 max-w-[230px] rounded-[20px] border bg-cream p-5 transition-all duration-300 ${
                    lit ? "border-gold/40 shadow-[0_16px_36px_-24px_rgba(15,43,34,0.25)]" : "border-green/10"
                  }`}
                >
                  <h3 className="font-head text-base font-bold text-green-deep mb-2">{step.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{step.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / tablet: connected vertical timeline */}
        <div className="md:hidden relative">
          <div className="absolute start-7 top-2 bottom-2 w-[3px] rounded-full bg-green/10" />
          <motion.div
            className="absolute start-7 top-2 w-[3px] rounded-full"
            style={{ height: `${lineWidth}%`, background: "linear-gradient(180deg, #E7B84D, #C9992F)" }}
            animate={{ height: `${lineWidth}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          <div className="space-y-8">
            {STEPS.map((step, i) => {
              const lit = i < displayCount;
              return (
                <div
                  key={step.title}
                  className="relative ps-20"
                  onTouchStart={() => setHoverIndex(i)}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <motion.span
                    animate={nodeStyle(lit)}
                    transition={{ duration: 0.4 }}
                    className="absolute start-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 font-head font-black text-sm"
                  >
                    <span style={{ color: lit ? "#FDFCF7" : "#0F2B22" }}>{String(i + 1).padStart(2, "0")}</span>
                  </motion.span>

                  <div
                    className={`rounded-[20px] border bg-cream p-5 transition-all duration-300 ${
                      lit ? "border-gold/40 shadow-[0_16px_36px_-24px_rgba(15,43,34,0.25)]" : "border-green/10"
                    }`}
                  >
                    <h3 className="font-head text-base font-bold text-green-deep mb-2">{step.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
