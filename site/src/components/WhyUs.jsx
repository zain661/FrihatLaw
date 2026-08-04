import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { whyUs } from "../data/home";
import { whyUsEn } from "../data/home.en";
import { useLanguage } from "../lib/LanguageContext";

const COPY = {
  ar: { eyebrow: "لماذا فريحات جروب", title: "ثقة مؤسسية مبنية على أساس قانوني صلب" },
  en: { eyebrow: "Why Frihat Group", title: "Institutional Trust Built on a Solid Legal Foundation" },
};

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const { lang } = useLanguage();
  const t = COPY[lang];
  const items = lang === "en" ? whyUsEn : whyUs;
  // In Arabic, the numbered list is deliberately forced onto the physical
  // left (dir="ltr" wrapper + dir="rtl" children) — a specific aesthetic
  // choice. In English that's already the natural LTR order, so no override
  // is needed; the grid's normal DOM order does it for free.
  const wrapperDir = lang === "ar" ? "ltr" : undefined;
  const innerDir = lang === "ar" ? "rtl" : undefined;

  return (
    <section className="bg-cream text-ink border-t border-gold/12 py-14 md:py-20 px-6 md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <p className="font-head text-base tracking-wide leading-relaxed text-gold font-semibold uppercase mb-5">{t.eyebrow}</p>
          <h2 className="font-head text-3xl md:text-4xl font-extrabold text-green-deep leading-tight">{t.title}</h2>
        </motion.div>

        <div dir={wrapperDir} className="grid gap-8 lg:grid-cols-12 lg:gap-6 items-stretch">
          <div dir={innerDir} className="lg:col-span-5">
            <nav className="flex flex-col">
              {items.map((w, i) => (
                <button
                  key={w.title}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="group relative flex w-full items-center gap-5 rounded-2xl px-4 py-5 text-start transition-colors duration-300"
                >
                  {active === i && (
                    <motion.span
                      layoutId="whyus-highlight"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      className="absolute inset-0 rounded-2xl border border-gold/25 bg-paper shadow-[0_16px_36px_-26px_rgba(15,43,34,0.2)]"
                    />
                  )}
                  <span
                    className={`relative z-10 font-head text-2xl font-black shrink-0 w-10 transition-colors duration-300 ${
                      active === i ? "text-gold" : "text-gold/35 group-hover:text-gold/60"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`relative z-10 font-head text-base md:text-lg font-bold transition-colors duration-300 ${
                      active === i ? "text-green-deep" : "text-ink-muted group-hover:text-green-deep"
                    }`}
                  >
                    {w.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div dir={innerDir} className="lg:col-span-7">
            <div className="relative h-full min-h-[280px]">
              <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-gold/15 blur-[70px]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex h-full flex-col justify-center rounded-[28px] border border-gold/25 bg-paper p-10 md:p-12 shadow-[0_30px_70px_-32px_rgba(15,43,34,0.25)]"
                >
                  <span className="font-head text-5xl font-black text-gold/20 mb-6 block leading-none">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-head text-2xl md:text-3xl font-extrabold text-green-deep mb-4">{items[active].title}</h3>
                  <p className="text-ink-muted text-lg leading-relaxed">{items[active].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
