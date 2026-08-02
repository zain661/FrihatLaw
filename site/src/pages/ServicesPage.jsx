import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { nhr } from "../data/nhr";
import { contact } from "../data/shared";

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

function ModuleHeader({ tag, title }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10">
      {tag && (
        <span className="mb-4 inline-flex items-center rounded-full border border-[#06BAEB]/30 bg-[#06BAEB]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B7FA8]">
          {tag}
        </span>
      )}
      <h2 className="font-head text-2xl md:text-3xl font-bold text-[#003d7c]">{title}</h2>
    </div>
  );
}

function ChecklistGrid({ items }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2 max-w-4xl mx-auto">
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          className="flex items-start gap-3 rounded-xl border border-[#0B5FA5]/12 bg-white p-4 shadow-[0_10px_25px_-18px_rgba(11,34,85,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#06BAEB]/40 hover:shadow-[0_18px_35px_-18px_rgba(6,186,235,0.35)]"
        >
          <span className="material-symbols-outlined shrink-0 text-lg text-[#06BAEB]">check_circle</span>
          <p className="text-sm leading-relaxed text-[#424751]">{item}</p>
        </motion.div>
      ))}
    </div>
  );
}

function FeatureCard({ icon, title, items, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="flex flex-col rounded-2xl border border-[#0B5FA5]/12 bg-white p-6 shadow-[0_15px_35px_-20px_rgba(11,34,85,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#06BAEB]/40 hover:shadow-[0_25px_45px_-20px_rgba(6,186,235,0.4)]"
    >
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#003d7c] to-[#0B5FA5] text-white shadow-[0_10px_20px_-8px_rgba(11,34,85,0.5)]">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </span>
      <h3 className="font-head text-base font-bold text-[#003d7c] mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm leading-relaxed text-[#475569]">
            <span className="material-symbols-outlined shrink-0 text-base text-[#06BAEB] mt-0.5">arrow_back</span>
            {it}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function SplitColumn({ icon, title, intro, items, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-2xl border border-[#0B5FA5]/12 bg-white p-7 shadow-[0_15px_35px_-20px_rgba(11,34,85,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#06BAEB]/40 hover:shadow-[0_25px_45px_-20px_rgba(6,186,235,0.4)]"
    >
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#003d7c] to-[#0B5FA5] text-white shadow-[0_10px_20px_-8px_rgba(11,34,85,0.5)]">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </span>
      <h3 className="font-head text-lg font-bold text-[#003d7c] mb-2">{title}</h3>
      {intro && <p className="text-sm text-[#475569] leading-relaxed mb-4">{intro}</p>}
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm leading-relaxed text-[#424751]">
            <span className="material-symbols-outlined shrink-0 text-base text-[#06BAEB] mt-0.5">check_circle</span>
            {it}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ModuleContent({ activeKey }) {
  switch (activeKey) {
    case "hr":
      return (
        <div>
          <ModuleHeader tag={nhr.hrServices.tag} title={nhr.hrServices.title} />
          <ChecklistGrid items={nhr.hrServices.items} />
        </div>
      );
    case "tech":
      return (
        <div>
          <ModuleHeader tag={nhr.systems.tag} title={nhr.systems.title} />
          <p className="text-center text-[#475569] leading-relaxed max-w-2xl mx-auto mb-10">{nhr.systems.intro}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nhr.systems.groups.map((g, i) => (
              <FeatureCard key={g.title} icon={g.icon} title={g.title} items={g.items} delay={i * 0.06} />
            ))}
          </div>
        </div>
      );
    case "consulting":
      return (
        <div>
          <ModuleHeader tag={nhr.consulting.tag} title={nhr.consulting.title} />
          <ChecklistGrid items={nhr.consulting.items} />
        </div>
      );
    case "support":
      return (
        <div>
          <ModuleHeader tag={nhr.support.tag} title="الدعم الفني وأمان البيانات" />
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <SplitColumn icon="support_agent" title={nhr.support.title} items={nhr.support.items} />
            <SplitColumn
              icon="shield_lock"
              title={nhr.security.title}
              intro={nhr.security.intro}
              items={nhr.security.items}
              delay={0.08}
            />
          </div>
        </div>
      );
    default:
      return null;
  }
}

function ModuleTabs({ tabs, active, onChange }) {
  return (
    <div dir="rtl" className="mb-14 flex flex-wrap justify-center gap-3">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className={`flex items-center gap-2 rounded-full px-5 py-3.5 font-body text-sm font-bold transition-all md:px-6 ${
            active === t.key
              ? "bg-[#003d7c] text-white shadow-[0_15px_35px_-10px_rgba(11,34,85,0.5)]"
              : "border border-[#0B5FA5]/20 bg-white text-[#0B2255] hover:border-[#0B5FA5]/50"
          }`}
        >
          <span className="material-symbols-outlined text-lg">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const { hero, tabs } = nhr.servicesPage;
  const [active, setActive] = useState(tabs[0].key);

  return (
    <div className="bg-[#f9f9fc]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-[#140F3A] via-[#123B7A] to-[#06AEDB] text-white">
        <DotGrid opacity={0.14} />
        <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#06BAEB]/25 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#3A2E8C]/40 blur-[110px]" />

        <div className="relative z-10 max-w-[900px] mx-auto px-5 md:px-16 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link
              to="/kayan-nhr"
              className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#8FF3FF] transition-colors hover:text-white"
            >
              <span aria-hidden="true">→</span>
              العودة إلى كيان NHR
            </Link>
            {hero.eyebrow && (
              <span className="mb-5 inline-flex items-center rounded-full border border-[#06BAEB]/40 bg-[#06BAEB]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#8FF3FF]">
                {hero.eyebrow}
              </span>
            )}
            <h1 className="font-head text-3xl md:text-5xl font-bold leading-tight mb-6">{hero.title}</h1>
            <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">{hero.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Tabbed modules */}
      <section className="py-24 md:py-32 bg-[#f9f9fc] px-5 md:px-16">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <ModuleTabs tabs={tabs} active={active} onChange={setActive} />
          </Reveal>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ModuleContent activeKey={active} />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-5 md:px-10 py-24 md:py-28 bg-[#f9f9fc]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#140F3A] via-[#123B7A] to-[#06AEDB] px-8 py-16 md:px-16 md:py-20 text-center text-white">
            <DotGrid opacity={0.12} />
            <div className="pointer-events-none absolute -bottom-1/3 -right-1/4 h-[500px] w-[500px] rounded-full bg-[#22D3EE]/20 blur-[120px]" />
            <div className="pointer-events-none absolute -top-1/3 -left-1/4 h-[400px] w-[400px] rounded-full bg-[#3A2E8C]/40 blur-[110px]" />
            <div className="relative mx-auto max-w-xl">
              <div className="mb-6 inline-flex h-12 w-12 overflow-hidden rounded-2xl shadow-lg">
                <img src="/brand/logo-nhr-icon.png" alt="" className="h-full w-full object-cover" />
              </div>
              <h2 className="font-head mb-5 text-2xl md:text-4xl font-extrabold leading-tight">جاهز لبناء منظومتك المتكاملة؟</h2>
              <p className="mb-10 text-lg leading-relaxed text-white/80">تواصل مع فريق كيان NHR وابدأ رحلة التحول اليوم</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center rounded-full bg-white px-9 py-4 font-head font-bold text-[#0B2255] transition-colors hover:bg-[#EAF7FB]"
                >
                  تواصل معنا الآن
                </a>
                <a
                  href={`https://wa.me/${nhr.contact.phones[0].replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-white/40 px-9 py-4 font-head font-bold text-white transition-colors hover:bg-white/10"
                >
                  واتساب
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
