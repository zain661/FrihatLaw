import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { legal } from "../data/legal";
import { contact } from "../data/shared";
import LegalHero from "../components/LegalHero";
import BrandImage from "../components/BrandImage";

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

const practiceIcons = {
  corporate: (
    <>
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M9 21v-6h6v6" />
      <path d="M4 9h16" />
    </>
  ),
  civil: (
    <>
      <path d="M12 4v16" />
      <path d="M4 8h16" />
      <path d="M4 8L1.5 13.5a3 3 0 0 0 6 0L5 8" />
      <path d="M20 8l-2.5 5.5a3 3 0 0 0 6 0L18 8" />
      <path d="M9 20h6" />
    </>
  ),
  arbitration: (
    <>
      <path d="M3 12l4-4 4 4-4 4-4-4Z" />
      <path d="M13 12h3l2 2" />
      <path d="M13 12l3 5 4-2-3-6" />
    </>
  ),
  banking: (
    <>
      <path d="M3 10l9-6 9 6" />
      <path d="M5 10v9M10 10v9M14 10v9M19 10v9" />
      <path d="M3 21h18" />
    </>
  ),
  ip: (
    <>
      <path d="M12 3l7.5 3.2v5.6c0 5-3.2 8.6-7.5 10-4.3-1.4-7.5-5-7.5-10V6.2L12 3Z" />
      <path d="M9 12.2l2 2 4-4.4" />
    </>
  ),
  gov: (
    <>
      <path d="M4 21V10l8-6 8 6v11" />
      <path d="M9 21v-7h6v7" />
      <path d="M4 21h16" />
    </>
  ),
  execution: (
    <>
      <path d="M14 3v5a1 1 0 0 0 1 1h5" />
      <path d="M6 3h8l6 6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M9.5 14.5l2 2 4-4.5" />
    </>
  ),
};

function PracticeIcon({ id }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9">
      {practiceIcons[id] ?? practiceIcons.corporate}
    </svg>
  );
}

const sectorIcons = {
  corporate: practiceIcons.corporate,
  banking: practiceIcons.banking,
  gov: practiceIcons.gov,
  ventures: (
    <>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </>
  ),
  individuals: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <circle cx="17.5" cy="9" r="2.3" />
      <path d="M15.7 14.3c2.7.4 4.8 2.3 4.8 5.2" />
    </>
  ),
};

function SectorIcon({ id, className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {sectorIcons[id] ?? sectorIcons.corporate}
    </svg>
  );
}

function MethodologyTimeline({ steps }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop — alternating zigzag timeline */}
      <div dir="rtl" className="relative mx-auto hidden max-w-4xl md:block">
        <div className="absolute right-1/2 top-0 h-full w-[3px] translate-x-1/2 rounded-full bg-[#D4AF37]/15" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute right-1/2 top-0 h-full w-[3px] origin-top translate-x-1/2 rounded-full bg-gradient-to-b from-[#E7C77C] to-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.6)]"
        />

        <div className="relative flex flex-col gap-14">
          {steps.map((step, i) => {
            const isStart = i % 2 === 0;
            return (
              <Reveal key={step.title} className={`relative flex ${isStart ? "justify-start" : "justify-end"}`}>
                <div className={`w-[46%] ${isStart ? "text-right" : "text-left"}`}>
                  <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#21442D] p-6 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.4)]">
                    <h3 className="font-head text-lg font-bold text-[#F4F1EA] mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-emerald-100/80">{step.desc}</p>
                  </div>
                </div>

                <div className="absolute right-1/2 top-6 flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-full border-2 border-[#F4F1EA]/10 bg-[#D4AF37] font-head text-sm font-bold text-[#1C3B28] shadow-[0_0_25px_rgba(212,175,55,0.45)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Mobile — compact vertical step list */}
      <div dir="rtl" className="relative md:hidden">
        <div className="absolute right-5 top-0 h-full w-[3px] rounded-full bg-[#D4AF37]/15" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute right-5 top-0 h-full w-[3px] origin-top rounded-full bg-gradient-to-b from-[#E7C77C] to-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.5)]"
        />
        <div className="flex flex-col gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05} className="relative pr-16">
              <div className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#F4F1EA]/10 bg-[#D4AF37] font-head text-xs font-bold text-[#1C3B28] shadow-[0_0_18px_rgba(212,175,55,0.45)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#21442D] p-5">
                <h3 className="font-head font-bold text-[#F4F1EA] mb-1.5">{step.title}</h3>
                <p className="text-sm leading-relaxed text-emerald-100/80">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

const SECTOR_SLIDE_VW = 82;
const SECTOR_PEEK_VW = (100 - SECTOR_SLIDE_VW) / 2;

function SectorsHorizontalScroll({ tag, title, items }) {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`${SECTOR_PEEK_VW}vw`, `${SECTOR_PEEK_VW - (items.length - 1) * SECTOR_SLIDE_VW}vw`]
  );
  const activeProgress = useTransform(scrollYProgress, [0, 1], [0, items.length - 1]);
  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(activeProgress, "change", (v) => setActiveIndex(Math.round(v)));

  return (
    <div ref={trackRef} className="relative" style={{ height: `${items.length * 60}vh` }}>
      <div className="sticky top-20 flex h-[420px] flex-col overflow-hidden md:top-24 md:h-[460px]">
        <div className="shrink-0 border-b border-[#D4AF37]/20 px-6 py-5 text-center md:px-10">
          <p className="font-head text-sm md:text-base tracking-widest leading-relaxed text-[#D4AF37] font-semibold uppercase mb-3">{tag}</p>
          <h2 className="font-head text-2xl md:text-4xl font-extrabold text-[#F4F1EA]">{title}</h2>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto mt-3 rounded-full" />

          <div className="mx-auto mt-4 flex max-w-[220px] items-center gap-3">
            <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#D4AF37]/15">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="absolute inset-0 origin-right rounded-full bg-[#D4AF37]"
              />
            </div>
            <span className="font-head text-xs font-bold tracking-widest text-[#D4AF37] shrink-0">
              {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <motion.div dir="ltr" style={{ x }} className="flex h-full">
            {items.map((s) => (
              <div
                key={s.name}
                className="flex h-full shrink-0 items-center justify-center px-6 md:px-16"
                style={{ width: `${SECTOR_SLIDE_VW}vw` }}
              >
                <div dir="rtl" className="flex max-w-3xl flex-col items-center gap-6 text-center md:flex-row md:items-start md:gap-10 md:text-right">
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 md:h-28 md:w-28">
                    <div className="absolute inset-0 rounded-full bg-[#D4AF37]/15 blur-xl" />
                    <SectorIcon id={s.icon} className="relative h-12 w-12 text-[#D4AF37] md:h-14 md:w-14" />
                  </div>
                  <div>
                    <h3 className="font-head text-xl font-extrabold text-[#F4F1EA] mb-3 md:text-2xl">{s.name}</h3>
                    <p className="max-w-lg text-emerald-100/80 leading-relaxed">{s.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[9vw] bg-gradient-to-r from-[#1C3B28] via-[#1C3B28]/70 to-transparent backdrop-blur-[2px]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[9vw] bg-gradient-to-l from-[#1C3B28] via-[#1C3B28]/70 to-transparent backdrop-blur-[2px]" />
        </div>
      </div>
    </div>
  );
}

export default function LegalPage() {
  return (
    <>
      <LegalHero />

      {/* About */}
      <section id="about" className="scroll-mt-24 bg-[#1C3B28] pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-10">
        <div className="mx-auto max-w-[1100px] grid lg:grid-cols-12 gap-14 items-center">
          <Reveal className="lg:col-span-5 relative">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <BrandImage src="/brand/office-height-1.jpg" alt={legal.name} className="h-full w-full" fallbackLabel={legal.tag} />
              </div>
              <div className="absolute -bottom-6 -start-6 w-full h-full border-2 border-[#D4AF37]/60 rounded-2xl -z-0" />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="font-head text-sm md:text-base tracking-widest leading-relaxed text-[#D4AF37] font-semibold uppercase mb-5 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#D4AF37]" /> {legal.intro.title}
            </p>
            <h2 className="font-head text-3xl md:text-4xl font-extrabold text-[#F4F1EA] mb-6 leading-snug">
              {legal.intro.heading}
            </h2>
            <div className="space-y-5 text-emerald-100/80 text-lg leading-loose mb-8">
              {legal.intro.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="space-y-3">
              {legal.intro.checklist.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl font-bold text-[#D4AF37] shrink-0">check_circle</span>
                  <span className="font-body font-semibold text-[#F4F1EA]">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Methodology */}
      <section id="methodology" className="scroll-mt-24 bg-[#1C3B28] pt-12 pb-24 md:pt-16 md:pb-32 px-6 md:px-10">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="text-center mb-16 max-w-2xl mx-auto">
            <p className="font-head text-sm md:text-base tracking-widest leading-relaxed text-[#D4AF37] font-semibold uppercase mb-5">{legal.methodology.tag}</p>
            <h2 className="font-head text-3xl md:text-4xl font-extrabold text-[#F4F1EA]">{legal.methodology.title}</h2>
            <div className="h-1 w-16 bg-[#D4AF37] mx-auto mt-6 rounded-full" />
          </Reveal>

          <MethodologyTimeline steps={legal.methodology.steps} />
        </div>
      </section>

      {/* Practice areas — bento grid */}
      <section id="practices" className="scroll-mt-24 bg-[#1C3B28] py-24 md:py-32 px-6 md:px-10">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="text-center mb-14 max-w-2xl mx-auto">
            <p className="font-head text-sm md:text-base tracking-widest leading-relaxed text-[#D4AF37] font-semibold uppercase mb-5">{legal.practiceAreas.title}</p>
            <h2 className="font-head text-3xl md:text-4xl font-extrabold text-[#F4F1EA]">تغطية قانونية شاملة لاحتياجاتك</h2>
            <div className="h-1 w-16 bg-[#D4AF37] mx-auto mt-6 rounded-full" />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {legal.practiceAreas.items.map((p, i) => (
              <Reveal
                key={p.name}
                delay={(i % 3) * 0.08}
                className="group relative overflow-hidden rounded-2xl bg-[#21442D] border border-[#D4AF37]/20 p-8 flex flex-col hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.25)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="absolute top-0 right-0 left-0 h-[2px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300" />
                <div className="mb-6 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110">
                  <PracticeIcon id={p.icon} />
                </div>
                <h3 className="font-head font-extrabold text-[#F4F1EA] mb-2">{p.name}</h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed mb-auto">{p.body}</p>
                {p.href ? (
                  <Link
                    to={p.href}
                    className="mt-7 flex items-center gap-2 text-sm font-head font-bold text-[#D4AF37] group-hover:gap-3.5 transition-all"
                  >
                    اكتشف المزيد <span aria-hidden>←</span>
                  </Link>
                ) : (
                  <a
                    href="#consult"
                    className="mt-7 flex items-center gap-2 text-sm font-head font-bold text-[#D4AF37] group-hover:gap-3.5 transition-all"
                  >
                    اكتشف المزيد <span aria-hidden>←</span>
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors served — horizontal scroll-jacked narrative */}
      <section id="sectors" className="scroll-mt-24 relative bg-[#1C3B28]">
        <SectorsHorizontalScroll tag={legal.sectors.tag} title={legal.sectors.title} items={legal.sectors.items} />
      </section>

      {/* Final CTA — page-local dark variant (shared PageCTA stays untouched for IPPage) */}
      <section id="consult" className="scroll-mt-28 bg-[#1C3B28] py-24 md:py-32 px-6 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[36px] border border-[#D4AF37]/25 bg-[#21442D] px-8 py-16 md:px-16 md:py-20 text-center shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute -bottom-1/3 -right-1/4 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />
            <div className="relative max-w-xl mx-auto">
              <h2 className="font-head text-2xl md:text-4xl font-extrabold leading-tight mb-10 text-[#F4F1EA]">
                ابدأ استشارتك القانونية اليوم
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center rounded-full px-9 py-4 font-head font-bold transition-colors"
                  style={{ backgroundColor: "#D4AF37", color: "#1C3B28" }}
                >
                  حجز استشارة
                </a>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-[#F4F1EA]/35 px-9 py-4 font-head font-bold text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10"
                >
                  واتساب
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
