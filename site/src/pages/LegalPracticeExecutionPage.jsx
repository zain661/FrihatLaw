import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { legalPracticeExecution } from "../data/legalPracticeExecution";
import { legalPracticeExecutionEn } from "../data/legalPracticeExecution.en";
import { legal } from "../data/legal";
import { legalEn } from "../data/legal.en";
import { useLanguage } from "../lib/LanguageContext";
import PageCTA from "../components/PageCTA";

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

function ExecutionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
      <path d="M14 3v5a1 1 0 0 0 1 1h5" />
      <path d="M6 3h8l6 6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M9.5 14.5l2 2 4-4.5" />
    </svg>
  );
}

const COPY = {
  ar: { back: "العودة إلى مجالات الممارسة", arrow: "→", ctaTitle: "لديك حكم أو سند تنفيذي بحاجة لمتابعة؟", ctaButton: "حجز استشارة" },
  en: { back: "Back to Practice Areas", arrow: "←", ctaTitle: "Have a judgment or executive instrument that needs follow-up?", ctaButton: "Book a Consultation" },
};

export default function LegalPracticeExecutionPage() {
  const { lang } = useLanguage();
  const t = lang === "en" ? legalPracticeExecutionEn : legalPracticeExecution;
  const office = lang === "en" ? legalEn.office : legal.office;
  const copy = COPY[lang];

  return (
    <div className="bg-[#1C3B28]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24 px-6 md:px-10">
        <div className="pointer-events-none absolute -top-32 -start-32 h-[420px] w-[420px] rounded-full bg-[#D4AF37]/10 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-24 -end-24 h-[380px] w-[380px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-[900px] text-center">
          <Link
            to="/frihat-legal#practices"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors mb-8"
          >
            <span aria-hidden>{copy.arrow}</span> {copy.back}
          </Link>

          <Reveal>
            <p className="font-head text-sm md:text-base tracking-widest leading-relaxed text-[#D4AF37] font-semibold uppercase mb-5">
              {t.eyebrow}
            </p>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <ExecutionIcon />
            </div>
            <h1 className="font-head text-3xl md:text-5xl font-extrabold text-[#F4F1EA] mb-8 leading-tight">
              {t.title}
            </h1>
            <div className="h-1 w-16 bg-[#D4AF37] mx-auto mb-10 rounded-full" />
          </Reveal>

          <Reveal delay={0.1} className="space-y-5 text-start">
            {t.intro.map((p) => (
              <p key={p} className="font-body text-[17px] leading-[1.9] text-emerald-100/85">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#21442D] py-20 md:py-28 px-6 md:px-10">
        <div className="mx-auto max-w-[900px]">
          <Reveal className="text-start mb-10">
            <h2 className="font-head text-xl md:text-2xl font-bold text-[#F4F1EA] mb-5">
              {t.services.title}
            </h2>
            <p className="font-body text-[16px] leading-[1.85] text-emerald-100/80">
              {t.services.intro}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="grid sm:grid-cols-2 gap-4">
            {t.services.items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-[#D4AF37]/15 bg-[#1C3B28] px-5 py-4"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
                <p className="font-body text-[15px] leading-[1.7] text-emerald-100/80 text-start">{item}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Work method */}
      <section className="bg-[#1C3B28] py-20 md:py-28 px-6 md:px-10">
        <div className="mx-auto max-w-[900px]">
          <Reveal className="rounded-2xl border border-[#D4AF37]/20 bg-[#21442D] p-7 md:p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)]">
            <h2 className="font-head text-xl md:text-2xl font-bold text-[#F4F1EA] mb-6">
              {t.workMethod.title}
            </h2>
            <div className="space-y-4 text-start">
              {t.workMethod.paragraphs.map((p) => (
                <p key={p} className="font-body text-[16px] leading-[1.85] text-emerald-100/80">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[#21442D] py-20 md:py-28 px-6 md:px-10">
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <h2 className="font-head text-2xl md:text-3xl font-bold text-[#F4F1EA] mb-10">
              {t.philosophy.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-start">
            {t.philosophy.paragraphs.map((p) => (
              <p key={p} className="font-body text-[16px] leading-[1.85] text-emerald-100/80">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-[#F7F5EE] py-20 md:py-28 px-6 md:px-10">
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <h2 className="font-head text-2xl md:text-3xl font-bold text-[#354D40] mb-10">
              {t.achievements.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="inline-flex flex-col items-center rounded-3xl border border-[#D4AF37]/30 bg-white px-12 py-10 shadow-[0_25px_60px_-25px_rgba(53,77,64,0.3)] mb-10">
              <span className="font-head text-5xl md:text-6xl font-black text-[#D4AF37]">
                {t.achievements.stat.value}
              </span>
              <span className="font-body text-base font-semibold text-[#354D40] mt-3">
                {t.achievements.stat.label}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-body text-[16px] leading-[1.85] text-[#2C3E30] text-start">
              {t.achievements.body}
            </p>
          </Reveal>
        </div>
      </section>

      <PageCTA
        title={copy.ctaTitle}
        button={copy.ctaButton}
        email={office.email}
        whatsapp={`https://wa.me/${office.phones[1].replace(/\D/g, "")}`}
        phones={office.phones}
      />
    </div>
  );
}
