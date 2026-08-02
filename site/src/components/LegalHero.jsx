import { motion, useReducedMotion } from "framer-motion";
import { contact } from "../data/shared";

export default function LegalHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#1C3B28] min-h-[100svh] flex items-center">
      <div className="pointer-events-none absolute -top-32 -right-32 h-[440px] w-[440px] rounded-full bg-[#D4AF37]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[380px] w-[380px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-6 md:px-10 py-12 lg:py-16">
        {/* Structural wrapper kept LTR so "video-left, content-right" holds
            regardless of the page's RTL direction; text inside resets to rtl. */}
        <div dir="ltr" className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: framed, crisp, un-tinted video */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <motion.div
                animate={reduceMotion ? undefined : { opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-2 rounded-[34px] bg-gradient-to-br from-[#D4AF37]/40 via-[#D4AF37]/10 to-transparent blur-xl"
              />
              <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <video
                  className="h-[340px] w-full object-cover sm:h-[420px] lg:h-[500px]"
                  src="/media/frihat-hero.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right: content on the deep-green backdrop */}
          <div dir="rtl" className="text-right">
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/10 px-5 py-2 font-head text-sm md:text-base font-semibold tracking-wide backdrop-blur-md mb-7"
              style={{ color: "#D4AF37" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
                <path d="M12 3v18M5 8l-3 6a4 4 0 0 0 8 0l-3-6h-2Zm14 0l-3 6a4 4 0 0 0 8 0l-3-6h-2Z" />
                <path d="M4 21h16M5 8h14" />
              </svg>
              فريحات محامون ومستشارون
            </motion.span>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-head font-black leading-[1.3] text-3xl lg:text-4xl text-[#F4F1EA]/95"
            >
              نزاهة قانونية.. لحماية تطلعاتك وحفظ حقوقك
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 max-w-xl text-[#C9D6C2]/85 text-lg md:text-xl leading-loose"
            >
              نقدم حلولاً واستشارات قانونية متكاملة بمهنية عالية ونزاهة مطلقة للأفراد والشركات.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.38 }}
              className="mt-9 flex flex-wrap justify-start gap-4"
            >
              <a
                href="#consult"
                className="inline-flex items-center rounded-full px-9 py-4 font-head font-bold shadow-[0_14px_36px_rgba(212,175,55,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(212,175,55,0.45)]"
                style={{ backgroundColor: "#D4AF37", color: "#1C3B28" }}
              >
                احجز استشارة قانونية
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#F4F1EA]/35 bg-[#F4F1EA]/5 px-9 py-4 font-head font-bold text-[#F4F1EA] backdrop-blur-[8px] transition-all hover:-translate-y-0.5 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10"
              >
                تواصل معنا مباشرة
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
