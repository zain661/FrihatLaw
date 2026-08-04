import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { nhr } from "../data/nhr";
import { nhrEn } from "../data/nhr.en";
import { contact } from "../data/shared";
import { contactEn } from "../data/shared.en";
import { useLanguage } from "../lib/LanguageContext";
import { PayrollMockup, MobileMockup, AttendanceMockup } from "../components/nhr/Mockups";

const HUB_NODES = {
  ar: [
    { icon: "fingerprint", label: "بصمة و GPS", pos: "top-0 end-0", line: [80, 12] },
    { icon: "payments", label: "مسير الرواتب", pos: "top-0 start-0", line: [20, 12] },
    { icon: "event_available", label: "الإجازات", pos: "bottom-0 end-0", line: [80, 88] },
    { icon: "insights", label: "التقارير", pos: "bottom-0 start-0", line: [20, 88] },
  ],
  en: [
    { icon: "fingerprint", label: "Fingerprint & GPS", pos: "top-0 end-0", line: [80, 12] },
    { icon: "payments", label: "Payroll", pos: "top-0 start-0", line: [20, 12] },
    { icon: "event_available", label: "Leave", pos: "bottom-0 end-0", line: [80, 88] },
    { icon: "insights", label: "Reports", pos: "bottom-0 start-0", line: [20, 88] },
  ],
};

const COPY = {
  ar: {
    heroPrefix: "كيان NHR ",
    exploreSolutions: "اكتشف حلولنا",
    contactUs: "تواصل معنا",
    exploreAllServices: "استكشف كافة الخدمات والتفاصيل الشاملة",
    arrow: "←",
    scalesHeading: "يتوسّع معك مهما كان حجم فريقك",
    scalesSubtitle: "اختر حجم مؤسستك لترى كيف تتكيّف كيان NHR مع احتياجاتك",
    whyTrustHeading: "لماذا يثق بنا عملاؤنا",
    ctaBookDemo: "احجز تجربة النظام",
    ctaWhatsapp: "تواصل عبر واتساب",
  },
  en: {
    heroPrefix: "Kayan NHR ",
    exploreSolutions: "Explore Our Solutions",
    contactUs: "Contact Us",
    exploreAllServices: "Explore All Services & Full Details",
    arrow: "→",
    scalesHeading: "Scales With You, Whatever Your Team's Size",
    scalesSubtitle: "Choose your organization's size to see how Kayan NHR adapts to your needs",
    whyTrustHeading: "Why Our Clients Trust Us",
    ctaBookDemo: "Book a System Demo",
    ctaWhatsapp: "Contact via WhatsApp",
  },
};

const SHOWCASE_MOCKUPS = {
  payroll: PayrollMockup,
  mobile: MobileMockup,
  attendance: AttendanceMockup,
};

function CountUp({ target, suffix = "", duration = 1.6 }) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <motion.span onViewportEnter={start} viewport={{ once: true, margin: "-40px" }}>
      {value}
      {suffix}
    </motion.span>
  );
}

const STAT_ICONS = ["groups", "apartment", "encrypted", "location_on"];

function StatsBar({ data, lang }) {
  return (
    <section className="relative z-20 px-5 -mt-8 pb-10 md:px-16 md:pb-12">
      <Reveal className="relative z-20 mx-auto max-w-6xl rounded-3xl border border-sky-100 bg-white/90 p-6 shadow-xl backdrop-blur md:p-8">
        <div dir={lang === "ar" ? "rtl" : undefined} className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {data.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-900/10 text-sky-700">
                <span className="material-symbols-outlined text-xl">{STAT_ICONS[i]}</span>
              </span>
              {s.location ? (
                <p className="font-head text-lg font-bold text-[#0B2255] md:text-xl">{s.location}</p>
              ) : (
                <p className="font-head bg-gradient-to-r from-sky-600 to-blue-900 bg-clip-text text-3xl font-black text-transparent md:text-4xl">
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
              )}
              <p className="font-body text-xs font-semibold leading-snug text-slate-500 md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
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

function DotGrid({ opacity = 0.1 }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    />
  );
}

function FeatureRow({ tag, title, desc, mockupKey, reverse, lang }) {
  const Mockup = SHOWCASE_MOCKUPS[mockupKey];
  return (
    <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-2" : ""}>
        <Mockup lang={lang} />
      </div>
      <div dir={lang === "ar" ? "rtl" : undefined} className={`text-center lg:text-start ${reverse ? "lg:order-1" : ""}`}>
        <span className="mb-3 inline-block rounded-full border border-[#06BAEB]/30 bg-[#06BAEB]/10 px-3.5 py-1.5 text-xs font-bold text-[#0B7FA8]">
          {tag}
        </span>
        <h3 className="font-head text-2xl md:text-3xl font-bold text-[#0B2255] mb-3">{title}</h3>
        <p className="font-body text-base md:text-lg leading-relaxed text-[#475569] max-w-md mx-auto lg:mx-0">{desc}</p>
      </div>
    </Reveal>
  );
}

function TrustChip({ children }) {
  return (
    <span className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50 px-4 py-2.5 text-xs font-bold text-sky-800 shadow-sm transition-all duration-200 hover:bg-sky-500 hover:text-white">
      {children}
    </span>
  );
}

function ComplianceCard({ icon, title, delay, children }) {
  return (
    <Reveal
      delay={delay}
      className="group relative flex h-full flex-col items-center gap-4 rounded-3xl border border-sky-100 bg-white p-8 text-center shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <span className="absolute inset-x-10 top-0 h-1 rounded-b-full bg-gradient-to-r from-sky-500 to-blue-600" />

      <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-500/30">
        <span className="absolute inset-0 rounded-2xl bg-sky-400 opacity-40 animate-ping" />
        <span className="material-symbols-outlined relative text-2xl">{icon}</span>
      </span>

      <h3 className="font-head text-lg font-bold text-slate-900">{title}</h3>
      {children}
    </Reveal>
  );
}

function ComplianceSection({ data, lang }) {
  return (
    <section className="bg-[#F8FAFC] px-5 py-10 md:px-16 md:py-12">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-head bg-gradient-to-r from-slate-900 via-sky-900 to-slate-900 bg-clip-text text-2xl font-bold text-transparent mb-3 md:text-3xl">
            {data.title}
          </h2>
          <p className="font-body text-sm md:text-base text-slate-500">{data.subtitle}</p>
        </Reveal>

        <div dir={lang === "ar" ? "rtl" : undefined} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 — Legal compliance */}
          <ComplianceCard icon="gavel" title={data.legalTitle}>
            <p className="text-sm leading-relaxed text-slate-600">{data.legal}</p>
          </ComplianceCard>

          {/* Card 2 — Security & privacy, ISO badges */}
          <ComplianceCard icon="encrypted" title={data.securityTitle} delay={0.08}>
            <div className="flex w-full flex-col items-center gap-2.5">
              {data.certifications.map((c) => (
                <TrustChip key={c.code}>
                  <span className="material-symbols-outlined text-base text-current">shield</span>
                  {c.code}
                  <span className="font-medium text-sky-600/70 group-hover:text-white/80">— {c.label}</span>
                </TrustChip>
              ))}
            </div>
          </ComplianceCard>

          {/* Card 3 — Smart integrations */}
          <ComplianceCard icon="hub" title={data.integrationsTitle} delay={0.16}>
            <div className="flex flex-wrap justify-center gap-2.5">
              {data.integrations.map((it) => (
                <TrustChip key={it.label}>
                  <span className="material-symbols-outlined text-base text-current">{it.icon}</span>
                  {it.label}
                </TrustChip>
              ))}
            </div>
          </ComplianceCard>
        </div>
      </div>
    </section>
  );
}

function CompanySizeTabs({ data, lang }) {
  const [active, setActive] = useState(0);
  const current = data[active];
  const dir = lang === "ar" ? "rtl" : undefined;

  return (
    <div>
      <div dir={dir} className="mb-10 flex flex-wrap justify-center gap-3">
        {data.map((seg, i) => (
          <button
            key={seg.key}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full px-6 py-3 font-body text-sm font-bold transition-all ${
              active === i
                ? "bg-[#003d7c] text-white shadow-[0_15px_35px_-10px_rgba(11,34,85,0.5)]"
                : "border border-[#0B5FA5]/20 bg-white text-[#0B2255] hover:border-[#0B5FA5]/50"
            }`}
          >
            {seg.label}
          </button>
        ))}
      </div>

      <motion.div
        key={current.key}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        dir={dir}
        className="mx-auto max-w-3xl rounded-3xl border border-[#0B5FA5]/15 bg-white p-8 text-start shadow-[0_25px_60px_-25px_rgba(11,34,85,0.3)] md:p-10"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-head text-xl font-bold text-[#003d7c] md:text-2xl">{current.headline}</h3>
          <span className="rounded-full bg-[#E3F7FC] px-4 py-1.5 text-xs font-bold text-[#0B7FA8]">{current.range}</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {current.points.map((p) => (
            <div key={p} className="flex items-start gap-2.5">
              <span className="material-symbols-outlined shrink-0 text-lg text-[#06BAEB]">check_circle</span>
              <p className="text-sm leading-relaxed text-[#424751]">{p}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function AutomationHub({ lang }) {
  const nodes = HUB_NODES[lang];
  return (
    <div className="relative mx-auto w-full max-w-[400px] aspect-square">
      <div className="absolute -top-8 -end-8 h-52 w-52 rounded-full bg-[#06BAEB]/30 blur-[70px]" />
      <div className="absolute -bottom-8 -start-8 h-52 w-52 rounded-full bg-[#241F4E]/70 blur-[70px]" />

      <div className="relative h-full w-full rounded-[32px] border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(6,15,50,0.65)] p-7">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full p-7 pointer-events-none" aria-hidden="true">
          {nodes.map((n, i) => (
            <motion.line
              key={n.icon}
              x1="50"
              y1="50"
              x2={n.line[0]}
              y2={n.line[1]}
              stroke="#8FF3FF"
              strokeOpacity="0.55"
              strokeWidth="0.6"
              strokeDasharray="3 3"
              animate={{ strokeDashoffset: [0, -12] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.15 }}
            />
          ))}
        </svg>

        {nodes.map((n) => (
          <div key={n.icon} className={`absolute ${n.pos} flex flex-col items-center gap-2`}>
            <div className="h-14 w-14 rounded-2xl bg-white shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[#0B5FA5] text-2xl">{n.icon}</span>
            </div>
            <span className="text-[10px] font-bold text-white bg-black/25 rounded-full px-2.5 py-1 whitespace-nowrap">{n.label}</span>
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[72px] w-[72px] rounded-2xl overflow-hidden shadow-[0_0_0_6px_rgba(255,255,255,0.14),0_20px_45px_-10px_rgba(0,0,0,0.55)]">
            <img src="/brand/logo-nhr-icon.png" alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessTimeline({ data, lang }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dir = lang === "ar" ? "rtl" : undefined;

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop — alternating zigzag timeline */}
      <div dir={dir} className="relative mx-auto hidden max-w-4xl md:block">
        <div className="absolute end-1/2 top-0 h-full w-[3px] translate-x-1/2 rounded-full bg-[#1E293B]/10" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute end-1/2 top-0 h-full w-[3px] origin-top translate-x-1/2 rounded-full bg-gradient-to-b from-gold-light to-gold shadow-[0_0_20px_rgba(212,175,55,0.6)]"
        />

        <div className="relative flex flex-col gap-14">
          {data.steps.map((step, i) => {
            const isStart = i % 2 === 0;
            return (
              <Reveal key={step.title} className={`relative flex ${isStart ? "justify-start" : "justify-end"}`}>
                <div className={`w-[46%] ${isStart ? "text-start" : "text-end"}`}>
                  <div className="rounded-2xl border border-gold/25 bg-[#F8FAFC] p-6 shadow-[0_15px_35px_-15px_rgba(30,41,59,0.18)]">
                    <h3 className="font-head text-lg font-bold text-[#1E293B] mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-[#475569]">{step.desc}</p>
                  </div>
                </div>

                <div className="absolute end-1/2 top-6 flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-full border-2 border-gold-light bg-gradient-to-br from-[#2563EB] to-[#1E40AF] font-head text-sm font-bold text-gold-light shadow-[0_0_25px_rgba(231,184,77,0.55)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Mobile — compact vertical step list */}
      <div dir={dir} className="relative md:hidden">
        <div className="absolute start-5 top-0 h-full w-[3px] rounded-full bg-[#1E293B]/10" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute start-5 top-0 h-full w-[3px] origin-top rounded-full bg-gradient-to-b from-gold-light to-gold shadow-[0_0_16px_rgba(212,175,55,0.5)]"
        />
        <div className="flex flex-col gap-8">
          {data.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05} className="relative ps-16">
              <div className="absolute start-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold-light bg-gradient-to-br from-[#2563EB] to-[#1E40AF] font-head text-xs font-bold text-gold-light shadow-[0_0_18px_rgba(231,184,77,0.5)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="rounded-2xl border border-gold/25 bg-[#F8FAFC] p-5">
                <h3 className="font-head font-bold text-[#1E293B] mb-1.5">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#475569]">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NHRPage() {
  const { lang } = useLanguage();
  const t = lang === "en" ? nhrEn : nhr;
  const copy = COPY[lang];
  const activeContact = lang === "en" ? contactEn : contact;

  return (
    <div className="bg-[#f9f9fc]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-[#140F3A] via-[#123B7A] to-[#06AEDB] text-white">
        <DotGrid opacity={0.14} />
        <div className="pointer-events-none absolute -top-40 -end-40 h-[520px] w-[520px] rounded-full bg-[#06BAEB]/25 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -start-32 h-[420px] w-[420px] rounded-full bg-[#3A2E8C]/40 blur-[110px]" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-16 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-9 w-9 rounded-xl overflow-hidden shadow-lg shrink-0">
                <img src="/brand/logo-nhr-icon.png" alt="Kayan NHR" className="h-full w-full object-cover" />
              </span>
              <span className="font-body text-sm md:text-base font-semibold tracking-widest leading-relaxed uppercase text-[#8FF3FF]">{t.tag}</span>
            </div>
            <h1 className="font-head text-4xl md:text-6xl font-bold leading-tight mb-6">
              {copy.heroPrefix}
              <span className="bg-gradient-to-l from-[#22D3EE] to-[#B6F9FF] bg-clip-text text-transparent">{t.tagline}</span>
            </h1>
            <p className="font-body text-lg text-white/80 leading-relaxed mb-9 max-w-xl">{t.heroTagline}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="bg-white text-[#0B2255] px-8 py-4 rounded-lg font-body font-semibold hover:shadow-[0_15px_35px_-8px_rgba(255,255,255,0.45)] hover:-translate-y-0.5 transition-all"
              >
                {copy.exploreSolutions}
              </a>
              <Link
                to="/#contact"
                className="border-2 border-white/40 text-white px-8 py-4 rounded-lg font-body font-semibold hover:bg-white/10 backdrop-blur transition-all"
              >
                {copy.contactUs}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <AutomationHub lang={lang} />
          </motion.div>
        </div>
      </section>

      {/* Stats / social proof — floating strip, right below hero */}
      <StatsBar data={t.stats} lang={lang} />

      {/* Integrated Solutions — SaaS feature showcase */}
      <section id="services" className="scroll-mt-24 py-10 md:py-12 bg-[#f9f9fc]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <Reveal className="text-center mb-20">
            <h2 className="font-head text-3xl md:text-4xl font-bold text-[#003d7c] mb-4">{t.solutions.title}</h2>
            <p className="font-body text-[17px] text-[#424751] max-w-xl mx-auto">{t.solutions.subtitle}</p>
            <div className="h-1 w-24 bg-[#06BAEB] mx-auto mt-5" />
          </Reveal>

          <div className="flex flex-col gap-20 md:gap-28">
            {t.featureShowcase.map((f, i) => (
              <FeatureRow key={f.key} tag={f.tag} title={f.title} desc={f.desc} mockupKey={f.mockup} reverse={i % 2 === 1} lang={lang} />
            ))}
          </div>

          <Reveal className="mt-24 grid grid-cols-2 gap-4 md:grid-cols-4">
            {t.quickFacts.map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center gap-2.5 rounded-2xl border border-[#0B5FA5]/10 bg-white p-5 text-center"
              >
                <span className="material-symbols-outlined text-2xl text-[#0B5FA5]">{f.icon}</span>
                <p className="font-body text-xs font-bold leading-snug text-[#0B2255]">{f.label}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="mt-14 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-[#003d7c] px-8 py-4 font-body font-bold text-white shadow-[0_15px_35px_-10px_rgba(11,34,85,0.5)] transition-all hover:-translate-y-0.5 hover:bg-[#0B2255] hover:shadow-[0_20px_40px_-10px_rgba(6,186,235,0.4)]"
            >
              {copy.exploreAllServices}
              <span aria-hidden="true">{copy.arrow}</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Security & Compliance */}
      <ComplianceSection data={t.trust} lang={lang} />

      {/* Company size — scales with you */}
      <section className="py-10 md:py-12 bg-white px-5 md:px-16">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-head text-3xl md:text-4xl font-bold text-[#003d7c] mb-4">{copy.scalesHeading}</h2>
            <p className="font-body text-[17px] text-[#475569] leading-relaxed">{copy.scalesSubtitle}</p>
            <div className="h-1 w-24 bg-[#06BAEB] mx-auto mt-5" />
          </Reveal>

          <CompanySizeTabs data={t.companySizes} lang={lang} />
        </div>
      </section>

      {/* How We Work With You — animated process timeline */}
      <section className="pt-10 pb-10 md:pt-12 md:pb-12 bg-[#f9f9fc] px-5 md:px-16">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="font-head text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">{t.process.title}</h2>
            <p className="font-body text-[17px] text-[#475569] leading-relaxed">{t.process.subtitle}</p>
            <div className="h-1 w-24 bg-gold-light mx-auto mt-5" />
          </Reveal>

          <ProcessTimeline data={t.process} lang={lang} />
        </div>
      </section>

      {/* Why Kayan NHR — real value props */}
      <section className="py-10 md:py-12 bg-white px-5 md:px-16">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-sm md:text-base text-[#0B7FA8] uppercase tracking-widest leading-relaxed mb-3 block font-semibold">
              {t.whyUs.title}
            </span>
            <h2 className="font-head text-3xl md:text-4xl font-bold text-[#003d7c]">{copy.whyTrustHeading}</h2>
            <div className="h-1 w-20 bg-[#06BAEB] mx-auto mt-4" />
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 mb-14">
            {t.whyUs.items.map((it, i) => (
              <Reveal
                key={it}
                delay={i * 0.08}
                className="flex items-start gap-4 p-6 rounded-xl border-s-4 border-[#00658d] bg-[#f9f9fc]"
              >
                <span className="material-symbols-outlined text-[#00658d] shrink-0">check_circle</span>
                <p className="font-body text-[#424751] leading-relaxed">{it}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="text-center">
            <p className="font-body text-sm md:text-base font-semibold text-[#003d7c] uppercase tracking-widest leading-relaxed mb-5">{t.clients.title}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {t.clients.items.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="cursor-pointer rounded-full border border-[#0B5FA5]/20 bg-[#E3F7FC] px-5 py-2.5 text-sm font-medium text-[#0B2255] font-body shadow-sm transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white"
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-5 md:px-10 py-10 md:py-12 bg-[#f9f9fc]">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="relative overflow-hidden rounded-[36px] bg-[#1E293B] px-8 py-16 md:px-16 md:py-20 text-white text-center">
            <DotGrid opacity={0.08} />
            <div className="pointer-events-none absolute -bottom-1/3 -end-1/4 h-[500px] w-[500px] rounded-full bg-sky-500/25 blur-[130px]" />
            <div className="pointer-events-none absolute -top-1/3 -start-1/4 h-[400px] w-[400px] rounded-full bg-sky-400/15 blur-[120px]" />
            <div className="relative max-w-xl mx-auto">
              <div className="inline-flex h-12 w-12 rounded-2xl overflow-hidden shadow-lg mb-6 ring-2 ring-sky-400/40">
                <img src="/brand/logo-nhr-icon.png" alt="" className="h-full w-full object-cover" />
              </div>
              <h2 className="font-head text-2xl md:text-4xl font-extrabold leading-tight mb-5">{t.cta.title}</h2>
              {t.cta.body && <p className="text-white/70 text-lg leading-relaxed mb-10">{t.cta.body}</p>}
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={`mailto:${activeContact.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-9 py-4 font-head font-bold text-[#0B2255] shadow-[0_0_30px_rgba(56,189,248,0.45)] transition-all hover:bg-sky-300 hover:shadow-[0_0_45px_rgba(56,189,248,0.6)]"
                >
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                  {copy.ctaBookDemo}
                </a>
                <a
                  href={`https://wa.me/${t.contact.phones[0].replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-9 py-4 font-head font-bold text-white transition-all hover:border-sky-400/50 hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  {copy.ctaWhatsapp}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60">
                {t.contact.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/[\s-]/g, "")}`} dir="ltr" className="hover:text-sky-300 transition-colors">
                    {p}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
