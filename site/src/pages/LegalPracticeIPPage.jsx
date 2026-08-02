import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { legalPracticeIp } from "../data/legalPracticeIp";
import { ip } from "../data/ip";
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

const serviceIcons = {
  corporate: (
    <>
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M9 21v-6h6v6" />
      <path d="M4 9h16" />
    </>
  ),
  ip: (
    <>
      <path d="M12 3l7.5 3.2v5.6c0 5-3.2 8.6-7.5 10-4.3-1.4-7.5-5-7.5-10V6.2L12 3Z" />
      <path d="M9 12.2l2 2 4-4.4" />
    </>
  ),
  agency: (
    <>
      <path d="M3 10.5 12 4l9 6.5" />
      <path d="M5 10v9h14v-9" />
      <path d="M9.5 14.5h5" />
    </>
  ),
};

function ServiceIcon({ id }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
      {serviceIcons[id] ?? serviceIcons.corporate}
    </svg>
  );
}

export default function LegalPracticeIPPage() {
  return (
    <div className="bg-[#1C3B28]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24 px-6 md:px-10">
        <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#D4AF37]/10 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-[900px] text-center">
          <Link
            to="/frihat-legal#practices"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors mb-8"
          >
            <span aria-hidden>→</span> العودة إلى مجالات الممارسة
          </Link>

          <Reveal>
            <p className="font-head text-sm md:text-base tracking-widest leading-relaxed text-[#D4AF37] font-semibold uppercase mb-5">
              {legalPracticeIp.eyebrow}
            </p>
            <h1 className="font-head text-3xl md:text-5xl font-extrabold text-[#F4F1EA] mb-8 leading-tight">
              {legalPracticeIp.title}
            </h1>
            <div className="h-1 w-16 bg-[#D4AF37] mx-auto mb-10 rounded-full" />
          </Reveal>

          <Reveal delay={0.1} className="space-y-5 text-right">
            {legalPracticeIp.intro.map((p) => (
              <p key={p} className="font-body text-[17px] leading-[1.9] text-emerald-100/85">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#21442D] py-20 md:py-28 px-6 md:px-10">
        <div className="mx-auto max-w-[900px] space-y-12">
          {legalPracticeIp.services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 0.1}
              className="rounded-2xl border border-[#D4AF37]/20 bg-[#1C3B28] p-7 md:p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                  <ServiceIcon id={s.icon} />
                </div>
                <h2 className="font-head text-xl md:text-2xl font-bold text-[#F4F1EA]">{s.title}</h2>
              </div>
              <div className="space-y-4 text-right">
                {s.paragraphs.map((p) => (
                  <p key={p} className="font-body text-[16px] leading-[1.85] text-emerald-100/80">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-[#F7F5EE] py-20 md:py-28 px-6 md:px-10">
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <h2 className="font-head text-2xl md:text-3xl font-bold text-[#354D40] mb-6">
              {legalPracticeIp.methodology.title}
            </h2>
            <div className="h-1 w-16 bg-[#D4AF37] mx-auto mb-10 rounded-full" />
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-right">
            {legalPracticeIp.methodology.paragraphs.map((p) => (
              <p key={p} className="font-body text-[16px] leading-[1.85] text-[#2C3E30]">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <PageCTA
        title="تحتاج استشارة في تأسيس شركتك أو حماية علامتك التجارية؟"
        button="حجز استشارة"
        email={ip.contact.email}
        whatsapp={`https://wa.me/${ip.contact.phones[0].replace(/\D/g, "")}`}
        phones={ip.contact.phones}
      />
    </div>
  );
}
