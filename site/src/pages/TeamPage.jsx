import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { team } from "../data/team";

const ENTITY_BADGES = {
  legal: { label: "فريحات للمحاماة", emoji: "⚖️", className: "bg-emerald-100 text-emerald-900 border-emerald-300" },
  ip: { label: "الملكية الفكرية", emoji: "💡", className: "bg-purple-100 text-purple-900 border-purple-300" },
  nhr: { label: "كيان NHR", emoji: "💻", className: "bg-sky-100 text-sky-900 border-sky-300" },
  tech: { label: "الأنظمة والتقنية", emoji: "🖥️", className: "bg-amber-100 text-amber-900 border-[#D4AF37]/60" },
};

const CARD = "rounded-2xl border border-[#D4AF37]/30 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md";

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

function Eyebrow({ children, className = "" }) {
  return (
    <span className={`font-team-body mb-4 inline-block text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37] ${className}`}>
      {children}
    </span>
  );
}

function EntityBadgePill({ type }) {
  const b = ENTITY_BADGES[type];
  if (!b) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold ${b.className}`}>
      <span aria-hidden="true">{b.emoji}</span>
      {b.label}
    </span>
  );
}

function PersonSilhouette({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8v1H4v-1Z" />
    </svg>
  );
}

function PersonAvatar({ name, photo, size = "h-16 w-16", position = "object-center" }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className={`${size} ${position} shrink-0 rounded-full object-cover ring-2 ring-[#D4AF37]/70 shadow-[0_10px_25px_-10px_rgba(28,59,40,0.5)] transition-all duration-300 group-hover:ring-[#D4AF37]`}
      />
    );
  }
  return (
    <div className={`${size} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2D4A36] via-[#1C3B28] to-[#0f2417] ring-2 ring-[#D4AF37]/40 shadow-[0_10px_25px_-10px_rgba(15,43,34,0.5)]`}>
      <PersonSilhouette className="h-[42%] w-[42%] text-[#f3d98a]/90" />
    </div>
  );
}

function PageHeader() {
  return (
    <section className="bg-[#F7F5EE] px-6 pb-6 pt-32 text-center md:pt-40">
      <Reveal>
        <Eyebrow>{team.hero.eyebrow}</Eyebrow>
        <h1 className="font-team-head mb-3 text-3xl font-extrabold text-[#1C3B28] md:text-4xl">{team.hero.title}</h1>
        <p className="font-team-body mx-auto max-w-xl text-[#3D453E]/75">{team.hero.subtitle}</p>
      </Reveal>
    </section>
  );
}

function FounderSection({ founder }) {
  return (
    <section className="relative overflow-hidden bg-[#F7F5EE] px-6 py-20 md:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#D4AF37]/8 blur-[140px]" />
      <Reveal className="relative mx-auto max-w-2xl text-center">
        <Eyebrow>القيادة المؤسسية</Eyebrow>
        <div className="relative mx-auto mb-8 h-52 w-52 md:h-64 md:w-64">
          <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-[#D4AF37]/45 to-transparent blur-xl" />
          <img
            src={founder.photo}
            alt={founder.name}
            className="relative h-full w-full rounded-full object-cover ring-4 ring-[#D4AF37] shadow-[0_35px_70px_-20px_rgba(28,59,40,0.45)]"
          />
        </div>
        <h2 className="font-team-head mb-2 text-3xl font-extrabold text-[#1C3B28] md:text-4xl">{founder.name}</h2>
        <div className="mx-auto mb-6 h-px w-16 bg-[#D4AF37]" />
        <p className="font-team-body mb-8 text-lg font-semibold text-[#D4AF37]">{founder.role}</p>
        <p className="font-team-body mx-auto max-w-xl italic leading-loose text-[#3D453E]/85">"{founder.quote}"</p>
      </Reveal>
    </section>
  );
}

function ExecutiveDirectorSection({ director }) {
  return (
    <section className="bg-[#F7F5EE] px-6 pb-20 md:pb-24">
      <Reveal className="mx-auto max-w-4xl">
        <div className={`${CARD} flex flex-col items-center gap-10 p-8 md:flex-row md:gap-16 md:p-12`}>
          <img
            src={director.photo}
            alt={director.name}
            className="h-40 w-40 shrink-0 rounded-full object-cover ring-2 ring-[#D4AF37] shadow-[0_20px_45px_-15px_rgba(28,59,40,0.4)] md:h-52 md:w-52"
          />
          <div className="flex-1 text-center md:text-right">
            <Eyebrow>الإدارة التنفيذية</Eyebrow>
            <h3 className="font-team-head mb-1 text-2xl font-bold text-[#1C3B28]">{director.name}</h3>
            <p className="font-team-body mb-4 font-semibold text-[#D4AF37]">{director.role}</p>
            <p className="font-team-body leading-relaxed text-[#3D453E]/80">{director.bio}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function MemberPanel({ member, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay }}
      className={`${CARD} group flex flex-col items-center p-8 text-center hover:-translate-y-1 hover:scale-[1.02]`}
    >
      <div className="mb-5 transition-transform duration-300 group-hover:scale-105">
        <PersonAvatar name={member.name} photo={member.photo} size="h-32 w-32" />
      </div>
      <h4 className="font-team-head text-xl font-bold text-[#1C3B28]">{member.name}</h4>
      <p className="font-team-body mb-3 mt-1 text-base text-[#3D453E]/70">{member.role}</p>
      {member.badge && <EntityBadgePill type={member.badge} />}
    </motion.div>
  );
}

function TraineesBanner() {
  return (
    <Reveal delay={0.2} className="mx-auto mt-14 max-w-3xl">
      <Link
        to="/team/trainees"
        className={`${CARD} group flex flex-col items-center gap-6 p-8 text-center hover:scale-[1.01] hover:border-[#D4AF37]/60 sm:flex-row sm:text-right`}
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1C3B28] text-2xl text-[#D4AF37] shadow-[0_10px_25px_-10px_rgba(28,59,40,0.5)] transition-transform duration-300 group-hover:-translate-x-1">
          🎓
        </span>
        <div className="flex-1">
          <h3 className="font-team-head text-xl font-bold text-[#1C3B28]">قسم المتدربين القانونيين (Legal Interns)</h3>
          <p className="font-team-body mt-1 text-base text-[#3D453E]/70">{team.trainees.subtitle}</p>
        </div>
        <span
          aria-hidden="true"
          className="font-team-head shrink-0 text-2xl text-[#D4AF37] transition-transform duration-300 group-hover:-translate-x-1"
        >
          ←
        </span>
      </Link>
    </Reveal>
  );
}

function LegalSection({ section }) {
  return (
    <section className="bg-[#F7F5EE] px-6 py-20 md:py-24">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <h2 className="font-team-head text-2xl font-extrabold text-[#1C3B28] md:text-3xl">{section.title}</h2>
      </Reveal>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {section.members.map((m, i) => (
          <MemberPanel key={m.name} member={m} delay={(i % 3) * 0.06} />
        ))}
      </div>
      <TraineesBanner />
    </section>
  );
}

function FeaturedMemberSection({ section, tone = "light" }) {
  return (
    <section className={`px-6 py-20 md:py-24 ${tone === "light" ? "bg-[#F7F5EE]" : "bg-white/50"}`}>
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <h2 className="font-team-head text-2xl font-extrabold text-[#1C3B28] md:text-3xl">{section.title}</h2>
      </Reveal>
      <Reveal delay={0.1} className="mx-auto max-w-lg">
        <div className={`${CARD} group flex flex-col items-center p-10 text-center hover:-translate-y-1 hover:scale-[1.02] md:p-12`}>
          <div className="mb-6 transition-transform duration-300 group-hover:scale-105">
            <PersonAvatar name={section.member.name} photo={section.member.photo} size="h-44 w-44" position="object-top" />
          </div>
          <h3 className="font-team-head text-2xl font-bold text-[#1C3B28]">{section.member.name}</h3>
          <p className="font-team-body mb-4 mt-1 text-lg text-[#3D453E]/75">{section.member.role}</p>
          {section.member.badge && <EntityBadgePill type={section.member.badge} />}
        </div>
      </Reveal>
    </section>
  );
}

function HRSection({ section }) {
  return (
    <section className="bg-[#F7F5EE] px-6 py-20 md:py-24">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <h2 className="font-team-head text-2xl font-extrabold text-[#1C3B28] md:text-3xl">{section.title}</h2>
      </Reveal>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
        {section.members.map((m, i) => (
          <MemberPanel key={m.name} member={m} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}

export default function TeamPage() {
  return (
    <div className="font-team-body">
      <PageHeader />
      <FounderSection founder={team.founder} />
      <ExecutiveDirectorSection director={team.executiveDirector} />
      <LegalSection section={team.legalSection} />
      <FeaturedMemberSection section={team.financeSection} tone="white" />
      <FeaturedMemberSection section={team.engineeringSection} tone="light" />
      <HRSection section={team.hrSection} />
      <FeaturedMemberSection section={team.officeSection} tone="white" />
    </div>
  );
}
