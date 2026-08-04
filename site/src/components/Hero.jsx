import { motion, useReducedMotion } from "framer-motion";
import { hero } from "../data/home";
import { heroEn } from "../data/home.en";
import { useLanguage } from "../lib/LanguageContext";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { lang } = useLanguage();
  const t = lang === "en" ? heroEn : hero;

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center overflow-hidden bg-green-deep">
      {/* Video background */}
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
      >
        <video
          className="h-full w-full object-cover"
          src="/media/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.div>

      {/* Radial overlay — keeps the gold particles visible center-frame, darkens toward the edges for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(17,30,22,0.4) 0%, rgba(17,30,22,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col items-center px-6 md:px-10 py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-head text-base tracking-widest leading-relaxed font-medium uppercase mb-6 text-gold-light"
        >
          {t.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-head font-black text-cream leading-snug max-w-3xl mx-auto text-2xl sm:text-4xl md:text-5xl [text-shadow:0_4px_30px_rgba(15,43,34,0.55)]"
        >
          {t.titleMain}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22 }}
          className="mt-4 font-head font-semibold text-gold-light leading-snug max-w-3xl mx-auto text-2xl sm:text-4xl md:text-5xl"
        >
          {t.titleSub}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="mt-6 max-w-3xl mx-auto text-cream/90 text-sm sm:text-base leading-relaxed"
        >
          {t.description}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42 }}
          className="mt-9 flex flex-wrap justify-center gap-3.5"
        >
          {t.trust.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 rounded-full border border-cream/20 bg-cream/10 px-5 py-2 text-base font-medium text-cream backdrop-blur-md"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-light/25 text-gold-light text-xs">
                ✓
              </span>
              {item}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.52 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center rounded-full px-9 py-4 font-head font-bold shadow-[0_14px_36px_rgba(197,160,89,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(197,160,89,0.45)]"
            style={{ backgroundColor: "#C5A059", color: "#111E16" }}
          >
            {t.ctaPrimary}
          </a>
          <a
            href="https://wa.me/972569200021"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-cream/10 px-9 py-4 font-head font-bold text-cream backdrop-blur-[8px] transition-all hover:-translate-y-0.5 hover:bg-cream hover:text-green-deep"
          >
            {t.ctaSecondary}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="pointer-events-none absolute inset-x-0 bottom-7 hidden md:flex justify-center"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-cream/90"
        >
          <span className="text-[0.65rem] tracking-[0.3em] uppercase">{lang === "en" ? "Scroll Down" : "مرر للأسفل"}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
