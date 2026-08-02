import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ip } from "../data/ip";
import PageCTA from "../components/PageCTA";

const collageItems = [
  {
    src: "/brand/ip-collage-patents.png",
    label: "حماية البراءات",
    className: "col-span-1 row-span-4",
    floatDuration: 7,
    floatDelay: 0,
  },
  {
    src: "/brand/ip-collage-trademarks.png",
    label: "العلامات التجارية",
    icon: "®",
    className: "col-span-2 row-span-2",
    floatDuration: 6,
    floatDelay: 0.3,
  },
  {
    src: "/brand/ip-collage-copyright.png",
    label: "حقوق النشر",
    icon: "©",
    className: "col-span-1 row-span-2",
    floatDuration: 8,
    floatDelay: 0.6,
  },
  {
    src: "/brand/ip-collage-innovation.png",
    label: "الابتكار الصناعي",
    className: "col-span-1 row-span-2",
    floatDuration: 6.5,
    floatDelay: 0.9,
  },
];

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
        <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white/90 backdrop-blur-sm font-head text-sm font-bold text-[#D4AF37] shadow-sm">
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

function IPCollageGrid() {
  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-4 h-[420px] sm:h-[480px] lg:h-[560px]">
      {collageItems.map((item) => (
        <CollageTile key={item.src} {...item} />
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

  return (
    <div className="bg-[#F7F5EE]">
      {/* Hero — Light */}
      <section className="relative overflow-hidden bg-[#F7F5EE] pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#D4AF37]/10 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1320px] px-5 md:px-16">
          {/* Structural wrapper kept LTR so "grid-left, content-right" holds
              regardless of the page's RTL direction; text inside resets to rtl. */}
          <div dir="ltr" className="grid gap-14 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <IPCollageGrid />
            </motion.div>

            <div dir="rtl" className="text-right">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-head text-[36px] md:text-[48px] leading-[1.3] tracking-[-0.02em] font-bold text-[#354D40] mb-4"
              >
                {ip.heroHeadline}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="font-body text-[20px] md:text-[22px] font-semibold text-[#9A7B2F] mb-5"
              >
                {ip.heroBrand}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-body text-[17px] md:text-[18px] leading-[1.7] text-[#2C3E30]"
              >
                {ip.heroTagline}
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
                  طلب استشارة
                </Link>
                <a
                  href="#services"
                  className="h-12 w-full sm:w-auto border border-[#D4AF37]/40 text-[#354D40] px-8 rounded-lg font-body font-semibold text-sm flex items-center justify-center hover:bg-[#D4AF37]/10 transition-colors"
                >
                  تعرف على خدماتنا
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About (النبذة) — Dark */}
      <section id="about" className="scroll-mt-24 py-24 md:py-32 bg-[#354D40]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:pl-10"
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
              <img src={ip.logo} alt={ip.name} className="w-full h-full object-contain drop-shadow-sm" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#D4AF37] font-body text-sm md:text-base font-semibold tracking-widest leading-relaxed uppercase mb-4 block">
              {ip.intro.title}
            </span>
            <h2 className="font-head text-[32px] font-bold text-[#F7F5EE] mb-8 leading-snug">
              خبرة قانونية متخصصة عابرة للحدود
            </h2>
            <div className="space-y-6">
              {ip.intro.paragraphs.map((p) => (
                <p key={p} className="font-body text-base leading-[1.8] text-[#F7F5EE]/85">
                  {p}
                </p>
              ))}
              <div className="pt-2">
                <p className="font-body text-[#F7F5EE]/60 text-sm font-semibold mb-4">التغطية الإقليمية المباشرة:</p>
                <div className="flex flex-wrap gap-3">
                  {ip.presenceBadges.map((b) => (
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

        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#D4AF37]/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#354D40]/10 blur-[120px]" />

        <div className="relative max-w-[1280px] mx-auto px-5 md:px-16">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center rounded-full bg-[#D4AF37]/10 backdrop-blur-md border border-[#D4AF37]/40 text-[#9A7B2F] text-sm font-semibold tracking-wider px-4 py-1.5 mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              {ip.whyItMatters.badge}
            </span>
            <h2 className="font-head text-[36px] md:text-[40px] font-bold text-[#354D40] mb-5 leading-tight">
              {ip.whyItMatters.title}
            </h2>
            <p className="font-body text-base leading-[1.8] text-[#2C3E30]">{ip.whyItMatters.subtitle}</p>
          </Reveal>

          <div className="relative">
            <div className="pointer-events-none absolute top-6 bottom-6 right-16 w-px bg-gradient-to-b from-[#D4AF37]/60 via-[#354D40]/30 to-transparent lg:hidden" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {ip.whyItMatters.points.map((point, i) => (
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
                  <span className="absolute top-6 left-8 font-head text-5xl font-black bg-gradient-to-br from-[#D4AF37] via-[#9A7B2F] to-[#5c4a1a] bg-clip-text text-transparent opacity-25 select-none">
                    0{i + 1}
                  </span>

                  <motion.span
                    whileHover={{
                      boxShadow: [
                        "0 0 20px rgba(212,175,55,0.3)",
                        "0 0 40px rgba(212,175,55,0.65)",
                        "0 0 20px rgba(212,175,55,0.3)",
                      ],
                    }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full mb-6 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.6)] ring-1 ring-[#f3d98a]/40"
                    style={{ background: sphereGradient }}
                  >
                    <span className="pointer-events-none absolute top-2 left-3 h-3.5 w-6 rounded-full bg-white/40 blur-[5px]" />
                    <span className="material-symbols-outlined relative text-3xl text-[#fbe9b8] drop-shadow-[0_0_8px_rgba(212,175,55,0.85)]">
                      {point.icon}
                    </span>
                  </motion.span>

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
            <h2 className="font-head text-[32px] md:text-[48px] font-semibold text-[#F7F5EE]">رؤيتنا ورسالتنا</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4" />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {[
              { icon: "visibility", title: "رؤيتنا", body: ip.vision },
              { icon: "flag", title: "رسالتنا", body: ip.mission },
            ].map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.1}
                className="group relative p-8 md:p-12 bg-white rounded-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:shadow-[0_30px_65px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
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

        <div className="pointer-events-none absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full bg-[#354D40]/15 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-28 -right-20 h-[380px] w-[380px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />

        <div className="relative max-w-[1280px] mx-auto px-5 md:px-16">
          <Reveal className="text-center max-w-2xl mx-auto mb-24">
            <h2 className="font-head text-[36px] md:text-[44px] font-bold text-[#354D40]">{ip.goals.title}</h2>
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

            <div className="pointer-events-none absolute top-6 bottom-6 right-16 w-px bg-gradient-to-b from-[#f3d98a]/60 via-[#D4AF37]/50 to-[#f3d98a]/20 lg:hidden" />

            <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-20 lg:gap-6">
              {ip.goals.items.map((g, i) => (
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
                      <span className="pointer-events-none absolute top-3 left-6 h-6 w-10 rounded-full bg-white/40 blur-md" />
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
          <Reveal className="mb-20 text-center md:text-right">
            <h2 className="font-head text-[32px] md:text-[48px] font-bold text-[#F7F5EE]">{ip.services.title}</h2>
            <p className="font-body text-[17px] leading-[1.7] text-[#F7F5EE]/80 max-w-xl mt-4 mx-auto md:mx-0">{ip.services.intro}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
            {ip.services.grid.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -8, boxShadow: "0 40px 70px -20px rgba(212,175,55,0.35)" }}
                transition={{
                  opacity: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
                  y: { type: "spring", stiffness: 220, damping: 22 },
                  boxShadow: { duration: 0.4 },
                }}
                className={`group relative pt-16 pb-10 px-8 rounded-2xl text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] ${
                  i % 2 === 1 ? "lg:mt-10" : ""
                }`}
              >
                {/* dark panel fill + gold edge + hover light-streak, clipped to the card shape */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2F4A3C] via-[#2B4034] to-[#213228]" />
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent skew-x-[-20deg]"
                    initial={{ x: "-40%", opacity: 0 }}
                    whileHover={{ x: "420%", opacity: 1 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl border border-[#D4AF37]/25 transition-colors duration-500 group-hover:border-[#D4AF37]/70 pointer-events-none" />

                {/* floating 3D sculptural icon */}
                <div className="absolute -top-9 inset-x-0 flex justify-center">
                  <div
                    className="relative h-[72px] w-[72px] rounded-full flex items-center justify-center shadow-[0_18px_30px_-10px_rgba(0,0,0,0.45)] ring-1 ring-[#f3d98a]/50"
                    style={{ background: sphereGradient }}
                  >
                    <span className="pointer-events-none absolute top-2 left-4 h-4 w-7 rounded-full bg-white/40 blur-[6px]" />
                    <span className="material-symbols-outlined relative text-3xl text-[#fbe9b8] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">
                      {s.icon}
                    </span>
                  </div>
                </div>

                <h3 className="relative font-head text-xl font-bold mb-4 text-[#F7F5EE]">{s.title}</h3>
                <p className="relative font-body text-[16px] leading-[1.75] text-[#F7F5EE]/75 mb-8">{s.body}</p>
                <span className="relative inline-flex items-center gap-2 text-[#D4AF37] font-body text-sm font-semibold">
                  المزيد
                  <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:-translate-x-1.5">
                    arrow_back
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Framework — Light */}
      <section className="relative overflow-hidden py-24 md:py-28 bg-[#F7F5EE] border-y border-[#D4AF37]/15">
        <div className="pointer-events-none absolute top-0 left-1/4 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[110px]" />

        <Reveal className="relative max-w-[1280px] mx-auto px-5 md:px-16 flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-3/5 order-2 md:order-1">
            <h2 className="font-head text-[28px] md:text-[36px] font-bold text-[#354D40] mb-6 leading-tight">
              {ip.legalFramework.title}
            </h2>
            <p className="font-body text-[18px] leading-[1.8] text-[#354D40]/90 mb-8 max-w-xl border-r-2 border-[#D4AF37]/50 pr-5">
              {ip.legalFramework.paragraph}
            </p>
            <div className="flex flex-wrap gap-3">
              {ip.legalFramework.treaties.map((t) => (
                <motion.span
                  key={t}
                  whileHover={{ y: -2, boxShadow: "0 10px 30px -8px rgba(212,175,55,0.5)" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-br from-[#354D40] to-[#2B4034] border border-[#D4AF37]/40 text-[#F7F5EE] font-body text-sm font-semibold shadow-[0_8px_20px_-8px_rgba(53,77,64,0.35)]"
                >
                  {t}
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
                <span className="pointer-events-none absolute top-4 left-8 h-5 w-10 rounded-full bg-white/50 blur-md" />
                <img src="/brand/ip-icon.png" alt={ip.tag} className="relative w-26 h-30 mx-auto" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <PageCTA
        title="احمِ ابتكارك وملكيتك الفكرية اليوم"
        button="حجز استشارة"
        email={ip.contact.email}
        whatsapp={`https://wa.me/${ip.contact.phones[0].replace(/\D/g, "")}`}
        phones={ip.contact.phones}
      />
    </div>
  );
}
