import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ip } from "../data/ip";
import { ipEn } from "../data/ip.en";
import { useLanguage } from "../lib/LanguageContext";
import PageCTA from "../components/PageCTA";

const collageItemsBase = [
  {
    src: "/brand/ip-collage-patents.png",
    labelKey: "patents",
    className: "col-span-1 row-span-4",
    floatDuration: 7,
    floatDelay: 0,
  },
  {
    src: "/brand/ip-collage-trademarks.png",
    labelKey: "trademarks",
    icon: "®",
    className: "col-span-2 row-span-2",
    floatDuration: 6,
    floatDelay: 0.3,
  },
  {
    src: "/brand/ip-collage-copyright.png",
    labelKey: "copyright",
    icon: "©",
    className: "col-span-1 row-span-2",
    floatDuration: 8,
    floatDelay: 0.6,
  },
  {
    src: "/brand/ip-collage-innovation.png",
    labelKey: "designs",
    className: "col-span-1 row-span-2",
    floatDuration: 6.5,
    floatDelay: 0.9,
  },
];

const COPY = {
  ar: {
    ctaRequest: "طلب استشارة",
    exploreServices: "تعرف على خدماتنا",
    coverageLabel: "التغطية الإقليمية المباشرة:",
    aboutHeading: "خبرة قانونية متخصصة عابرة للحدود",
    visionMissionTitle: "رؤيتنا ورسالتنا",
    visionLabel: "رؤيتنا",
    missionLabel: "رسالتنا",
    ctaTitle: "ابدأ اليوم أولى خطوات حماية ملكيتك الفكرية",
    ctaButton: "حجز استشارة",
    collageLabels: { patents: "حماية البراءات", trademarks: "العلامات التجارية", copyright: "حقوق النشر", designs: "الرسوم الصناعية" },
  },
  en: {
    ctaRequest: "Request a Consultation",
    exploreServices: "Explore Our Services",
    coverageLabel: "Direct Regional Coverage:",
    aboutHeading: "Specialized Legal Expertise Across Borders",
    visionMissionTitle: "Our Vision & Mission",
    visionLabel: "Our Vision",
    missionLabel: "Our Mission",
    ctaTitle: "Take the first step to protect your intellectual property today",
    ctaButton: "Book a Consultation",
    collageLabels: { patents: "Patent Protection", trademarks: "Trademarks", copyright: "Copyright", designs: "Industrial Designs" },
  },
};

function CollageTile({ src, label, icon, className, floatDuration, floatDelay }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      className={`group relative overflow-hidden rounded-2xl border border-[#D4AF37]/20 shadow-[0_20px_45px_-20px_rgba(28,59,40,0.25)] ${className}`}
    >
      <img
        src={src}
        alt={label}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {icon && (
        <span className="absolute top-3 end-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white/90 backdrop-blur-sm font-head text-sm font-bold text-[#D4AF37] shadow-sm">
          {icon}
        </span>
      )}

      <div className="absolute inset-0 flex items-end justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-[#354D40]/70 via-[#354D40]/10 to-transparent">
        <span className="mb-4 translate-y-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/90 px-4 py-1.5 text-xs font-head font-bold text-[#354D40] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function IPCollageGrid({ labels }) {
  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-4 h-[420px] sm:h-[480px] lg:h-[560px]">
      {collageItemsBase.map((item) => (
        <CollageTile key={item.src} {...item} label={labels[item.labelKey]} />
      ))}
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// polished olive-green + antique-gold metallic sphere, lit from the top-left
const sphereGradient =
  "radial-gradient(circle_at_32%_28%,#f3d98a_0%,#D4AF37_26%,#8a7a3a_50%,#4a5c34_74%,#212b18_100%)";

// gentle per-sphere drift so the four don't move in lockstep
const driftMotion = [
  { y: [0, -14, 0, 8, 0], x: [0, 5, 0, -5, 0], duration: 9 },
  { y: [0, 10, 0, -12, 0], x: [0, -6, 0, 5, 0], duration: 10.5 },
  { y: [0, -12, 0, 10, 0], x: [0, 6, 0, -4, 0], duration: 8.5 },
  { y: [0, 9, 0, -11, 0], x: [0, -5, 0, 6, 0], duration: 11 },
];

export default function IPPage() {
  const reduceMotion = useReducedMotion();
  const { lang } = useLanguage();
  const t = lang === "en" ? ipEn : ip;
  const copy = COPY[lang];
  // In Arabic, the structural wrapper is forced dir="ltr" so "grid on the
  // physical left, content on the physical right" holds regardless of the
  // page's RTL flow. In English that's already the natural order.
  const wrapperDir = lang === "ar" ? "ltr" : undefined;
  const contentDir = lang === "ar" ? "rtl" : undefined;

  return (
    <div className="bg-[#F7F5EE]">
      {/* Hero — Light */}
      <section className="relative overflow-hidden bg-[#F7F5EE] pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="pointer-events-none absolute -top-32 -start-32 h-[420px] w-[420px] rounded-full bg-[#D4AF37]/10 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-24 -end-24 h-[380px] w-[380px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1320px] px-5 md:px-16">
          <div dir={wrapperDir} className="grid gap-14 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <IPCollageGrid labels={copy.collageLabels} />
            </motion.div>

            <div dir={contentDir} className="text-start">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-head text-[36px] md:text-[48px] leading-[1.3] tracking-[-0.02em] font-bold text-[#354D40] mb-4"
              >
                {t.heroHeadline}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="font-body text-[20px] md:text-[22px] font-semibold text-[#9A7B2F] mb-5"
              >
                {t.heroBrand}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-body text-[17px] md:text-[18px] leading-[1.7] text-[#2C3E30]"
              >
                {t.heroTagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row justify-start items-center gap-4 mt-8"
              >
                <Link
                  to="/#contact"
                  className="h-12 w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#996515] text-slate-950 px-8 rounded-lg font-body font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-lg">gavel</span>
                  {copy.ctaRequest}
                </Link>
                <a
                  href="#services"
                  className="h-12 w-full sm:w-auto border border-[#D4AF37]/40 text-[#354D40] px-8 rounded-lg font-body font-semibold text-sm flex items-center justify-center hover:bg-[#D4AF37]/10 transition-colors"
                >
                  {copy.exploreServices}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About — Dark */}
      <section id="about" className="scroll-mt-24 py-24 md:py-32 bg-[#354D40]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:pe-10"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full bg-gradient-to-tr from-[#D4AF37]/20 via-white/5 to-transparent blur-3xl" />
            </div>

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03 }}
              className="relative w-full max-w-sm aspect-square backdrop-blur-xl bg-white/95 border border-[#D4AF37]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] rounded-3xl p-6 flex items-center justify-center mx-auto transition-[border-color,box-shadow] duration-300 hover:border-[#D4AF37]/70 hover:shadow-[0_35px_75px_-20px_rgba(212,175,55,0.45)]"
            >
              <img src={t.logo} alt={t.name} className="w-full h-full object-contain drop-shadow-sm" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#D4AF37] font-body text-sm md:text-base font-semibold tracking-widest leading-relaxed uppercase mb-4 block">
              {t.intro.title}
            </span>
            <h2 className="font-head text-[32px] font-bold text-[#F7F5EE] mb-8 leading-snug">
              {copy.aboutHeading}
            </h2>
            <div className="space-y-6">
              {t.intro.paragraphs.map((p) => (
                <p key={p} className="font-body text-base leading-[1.8] text-[#F7F5EE]/85">
                  {p}
                </p>
              ))}
              <div className="pt-2">
                <p className="font-body text-[#F7F5EE]/60 text-sm font-semibold mb-4">{copy.coverageLabel}</p>
                <div className="flex flex-wrap gap-3">
                  {t.presenceBadges.map((b) => (
                    <span
                      key={b.label}
                      className="inline-flex items-center gap-1.5 bg-white/5 border border-[#D4AF37]/50 text-[#F7F5EE] rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-[#D4AF37]/15 hover:scale-105"
                    >
                      <span className="material-symbols-outlined text-base leading-none text-[#D4AF37]">{b.icon}</span>
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why IP Matters (Value / Process) — Light */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-[#F7F5EE]">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
          <defs>
            <pattern id="whyMattersMesh" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M0 32 L32 0 L64 32 L32 64 Z" fill="none" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="32" cy="32" r="3" fill="#D4AF37" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#whyMattersMesh)" />
        </svg>

        <div className="pointer-events-none absolute -top-24 -start-24 h-96 w-96 rounded-full bg-[#D4AF37]/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -end-24 h-96 w-96 rounded-full bg-[#354D40]/10 blur-[120px]" />

        <div className="relative max-w-[1280px] mx-auto px-5 md:px-16">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center rounded-full bg-[#D4AF37]/10 backdrop-blur-md border border-[#D4AF37]/40 text-[#9A7B2F] text-sm font-semibold tracking-wider px-4 py-1.5 mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              {t.whyItMatters.badge}
            </span>
            <h2 className="font-head text-[36px] md:text-[40px] font-bold text-[#354D40] mb-5 leading-tight">
              {t.whyItMatters.title}
            </h2>
            <p className="font-body text-base leading-[1.8] text-[#2C3E30]">{t.whyItMatters.subtitle}</p>
          </Reveal>

          <div className="relative">
            <div className="pointer-events-none absolute top-6 bottom-6 end-16 w-px bg-gradient-to-b from-[#D4AF37]/60 via-[#354D40]/30 to-transparent lg:hidden" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {t.whyItMatters.points.map((point, i) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={{ y: -6 }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] },
                    y: { type: "spring", stiffness: 220, damping: 22 },
                  }}
                  className={`group relative rounded-3xl bg-white border border-[#D4AF37]/25 shadow-[0_20px_45px_-25px_rgba(53,77,64,0.3)] transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-[0_30px_65px_-20px_rgba(212,175,55,0.3)] p-8 ${
                    i === 1 ? "lg:-mt-8" : "lg:mt-8"
                  }`}
                >
                  <span className="relative z-10 block font-head text-4xl font-bold text-[#9A7B2F] mb-4 select-none">
                    0{i + 1}
                  </span>

                  <h3 className="relative z-10 font-head text-xl font-bold text-[#354D40] mb-3 leading-snug">
                    {point.title}
                  </h3>
                  <p className="relative z-10 font-body text-[15px] leading-[1.8] text-[#2C3E30]">{point.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission — Dark */}
      <section className="py-24 md:py-32 bg-[#354D40]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <Reveal className="text-center mb-16">
            <h2 className="font-head text-[32px] md:text-[48px] font-semibold text-[#F7F5EE]">{copy.visionMissionTitle}</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4" />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {[
              { icon: "visibility", title: copy.visionLabel, body: t.vision },
              { icon: "flag", title: copy.missionLabel, body: t.mission },
            ].map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.1}
                className="group relative p-8 md:p-12 bg-white rounded-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:shadow-[0_30px_65px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 start-0 w-2 h-full bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-8 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#354D40] transition-colors duration-500">
                  <span className="material-symbols-outlined text-4xl">{v.icon}</span>
                </div>
                <h3 className="font-head text-2xl font-semibold text-[#354D40] mb-6">{v.title}</h3>
                <p className="font-body text-[17px] leading-[1.7] text-[#2C3E30]">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Goals — olive & gold floating spheres timeline — Light */}
      <section className="relative overflow-hidden py-28 md:py-40 bg-[#F7F5EE]">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
          <defs>
            <pattern id="oliveLattice" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M28 0 L56 28 L28 56 L0 28 Z" fill="none" stroke="#D4AF37" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#oliveLattice)" />
        </svg>

        <div className="pointer-events-none absolute -top-32 -start-20 h-[420px] w-[420px] rounded-full bg-[#354D40]/15 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-28 -end-20 h-[380px] w-[380px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />

        <div className="relative max-w-[1280px] mx-auto px-5 md:px-16">
          <Reveal className="text-center max-w-2xl mx-auto mb-24">
            <h2 className="font-head text-[36px] md:text-[44px] font-bold text-[#354D40]">{t.goals.title}</h2>
          </Reveal>

          <div className="relative">
            <svg
              className="hidden lg:block absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-40"
              viewBox="0 0 1000 200"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="strategicThread" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f3d98a" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#f3d98a" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0,100 C150,15 280,185 500,100 C720,15 850,185 1000,100"
                stroke="url(#strategicThread)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="[filter:drop-shadow(0_0_6px_rgba(212,175,55,0.65))]"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </svg>

            <div className="pointer-events-none absolute top-6 bottom-6 end-16 w-px bg-gradient-to-b from-[#f3d98a]/60 via-[#D4AF37]/50 to-[#f3d98a]/20 lg:hidden" />

            <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-20 lg:gap-6">
              {t.goals.items.map((g, i) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col items-center text-center ${i % 2 === 1 ? "lg:mt-16" : ""}`}
                >
                  <motion.div
                    animate={reduceMotion ? undefined : { y: driftMotion[i].y, x: driftMotion[i].x }}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 0 35px rgba(212,175,55,0.4)",
                    }}
                    transition={{
                      x: { duration: driftMotion[i].duration, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: driftMotion[i].duration, repeat: Infinity, ease: "easeInOut" },
                      scale: { type: "spring", stiffness: 200, damping: 18 },
                      boxShadow: { duration: 0.3, ease: "easeOut" },
                    }}
                    className="relative mb-7"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-[#D4AF37]/25 blur-2xl" />
                    <div
                      className="relative h-32 w-32 md:h-36 md:w-36 rounded-full flex items-center justify-center shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)] ring-1 ring-[#f3d98a]/40"
                      style={{ background: sphereGradient }}
                    >
                      <span className="pointer-events-none absolute top-3 start-6 h-6 w-10 rounded-full bg-white/40 blur-md" />
                      <span className="material-symbols-outlined relative text-4xl font-bold text-[#354D40]">{g.icon}</span>
                    </div>
                  </motion.div>

                  <span className="inline-block px-6 py-2.5 rounded-2xl bg-[#354D40] shadow-[0_10px_25px_-10px_rgba(53,77,64,0.5)]">
                    <span className="font-body text-sm md:text-base font-medium text-[#F7F5EE] leading-[1.6]">
                      {g.title}
                    </span>
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services — Dark */}
      <section id="services" className="scroll-mt-24 py-24 md:py-32 bg-[#354D40]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <Reveal className="mb-20 text-center md:text-start">
            <h2 className="font-head text-[32px] md:text-[48px] font-bold text-[#F7F5EE]">{t.services.title}</h2>
            <p className="font-body text-[17px] leading-[1.7] text-[#F7F5EE]/80 max-w-xl mt-4 mx-auto md:mx-0">{t.services.intro}</p>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
            {/* Featured — right column in RTL (first in DOM), primary service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-2/5 relative overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#2F4A3C] via-[#2B4034] to-[#213228] p-10 md:p-12 shadow-[0_0_70px_-20px_rgba(212,175,55,0.35)] transition-shadow duration-500 hover:shadow-[0_0_90px_-15px_rgba(212,175,55,0.5)]"
            >
              <div className="pointer-events-none absolute -top-20 -end-20 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-[100px]" />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-[#f3d98a]/10" />

              <span className="relative material-symbols-outlined text-6xl text-[#D4AF37] [text-shadow:0_0_30px_rgba(212,175,55,0.5)]">
                {t.services.grid[0].icon}
              </span>
              <h3 className="relative font-head text-2xl md:text-[28px] font-bold text-[#F7F5EE] leading-snug mt-7 mb-4">
                {t.services.grid[0].title}
              </h3>
              <p className="relative font-body text-base md:text-[17px] leading-[1.85] text-[#F7F5EE]/80">
                {t.services.grid[0].body}
              </p>
            </motion.div>

            {/* Supporting — left column in RTL, borderless stacked services */}
            <div className="lg:w-3/5 flex flex-col divide-y divide-[#D4AF37]/20">
              {t.services.grid.slice(1).map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-start gap-5 py-7 first:pt-0 last:pb-0"
                >
                  <span className="material-symbols-outlined text-2xl text-[#D4AF37] shrink-0 mt-0.5 transition-colors duration-300 group-hover:text-[#f3d98a]">
                    {s.icon}
                  </span>
                  <div>
                    <h4 className="font-head text-lg md:text-xl font-bold text-[#F7F5EE] mb-2">{s.title}</h4>
                    <p className="font-body text-[15px] leading-[1.75] text-[#F7F5EE]/65">{s.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Framework — Light */}
      <section className="relative overflow-hidden py-24 md:py-28 bg-[#F7F5EE] border-y border-[#D4AF37]/15">
        <div className="pointer-events-none absolute top-0 start-1/4 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[110px]" />

        <Reveal className="relative max-w-[1280px] mx-auto px-5 md:px-16 flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-3/5 order-2 md:order-1">
            <h2 className="font-head text-[28px] md:text-[36px] font-bold text-[#354D40] mb-6 leading-tight">
              {t.legalFramework.title}
            </h2>
            <p className="font-body text-[18px] leading-[1.8] text-[#354D40]/90 mb-8 max-w-xl border-s-2 border-[#D4AF37]/50 ps-5">
              {t.legalFramework.paragraph}
            </p>
            <div className="flex flex-wrap gap-3">
              {t.legalFramework.treaties.map((tr) => (
                <motion.span
                  key={tr}
                  whileHover={{ y: -2, boxShadow: "0 10px 30px -8px rgba(212,175,55,0.5)" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-br from-[#354D40] to-[#2B4034] border border-[#D4AF37]/40 text-[#F7F5EE] font-body text-sm font-semibold shadow-[0_8px_20px_-8px_rgba(53,77,64,0.35)]"
                >
                  {tr}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="w-full md:w-2/5 order-1 md:order-2 flex justify-center">
            <div className="relative h-56 w-56">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[#D4AF37]/25 blur-[60px]" />

              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 h-full w-full"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="100" cy="100" r="94" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 10" opacity="0.7" />
                {Array.from({ length: 12 }).map((_, idx) => (
                  <line
                    key={idx}
                    x1="100"
                    y1="10"
                    x2="100"
                    y2="20"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    opacity="0.6"
                    transform={`rotate(${idx * 30} 100 100)`}
                  />
                ))}
              </motion.svg>

              <div className="absolute inset-5 rounded-full ring-1 ring-[#D4AF37]/40" />

              <div className="absolute inset-9 rounded-full bg-gradient-to-br from-[#faf6ea] via-[#f3ecd8] to-[#e8dcb8] border border-[#D4AF37]/50 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.35)] flex items-center justify-center p-2">
                <span className="pointer-events-none absolute top-4 start-8 h-5 w-10 rounded-full bg-white/50 blur-md" />
                <img src="/brand/ip-icon.png" alt={t.tag} className="relative w-26 h-30 mx-auto" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <PageCTA
        title={copy.ctaTitle}
        button={copy.ctaButton}
        email={t.contact.email}
        whatsapp={`https://wa.me/${t.contact.phones[0].replace(/\D/g, "")}`}
        phones={t.contact.phones}
      />
    </div>
  );
}
