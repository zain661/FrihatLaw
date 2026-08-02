import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { team } from "../data/team";

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

function Eyebrow({ children }) {
  return (
    <span className="font-team-body mb-4 inline-block text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
      {children}
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

function TraineePanel({ member, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay }}
      className={`${CARD} flex flex-col items-center p-8 text-center hover:-translate-y-1 hover:scale-[1.02]`}
    >
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="mb-5 h-28 w-28 rounded-full object-cover ring-2 ring-[#D4AF37]/70 shadow-[0_10px_25px_-10px_rgba(28,59,40,0.5)]"
        />
      ) : (
        <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#2D4A36] via-[#1C3B28] to-[#0f2417] ring-2 ring-[#D4AF37]/40 shadow-[0_10px_25px_-10px_rgba(15,43,34,0.5)]">
          <PersonSilhouette className="h-12 w-12 text-[#f3d98a]/90" />
        </div>
      )}
      <h4 className="font-team-head text-xl font-bold text-[#1C3B28]">{member.name}</h4>
      <p className="font-team-body mt-1 text-base text-[#3D453E]/70">{member.role}</p>
    </motion.div>
  );
}

function YearGroup({ year, delay = 0 }) {
  return (
    <Reveal delay={delay} className="mb-16 last:mb-0">
      <div className="mb-8 flex items-center gap-4">
        <span className="font-team-head text-lg font-bold text-[#1C3B28]">{year.label}</span>
        <span className="h-px flex-1 bg-[#D4AF37]/25" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {year.members.map((m, i) => (
          <TraineePanel key={m.name} member={m} delay={i * 0.08} />
        ))}
      </div>
    </Reveal>
  );
}

export default function TeamTraineesPage() {
  const { trainees } = team;

  return (
    <div className="font-team-body bg-[#F7F5EE]">
      <section className="px-6 pb-16 pt-32 text-center md:pt-40">
        <Reveal>
          <Link
            to="/team"
            className="font-team-body mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#1C3B28]/70 transition-colors hover:text-[#D4AF37]"
          >
            <span aria-hidden="true">→</span>
            العودة إلى فريق العمل
          </Link>
          <Eyebrow>{trainees.eyebrow}</Eyebrow>
          <h1 className="font-team-head mb-3 text-3xl font-extrabold text-[#1C3B28] md:text-4xl">{trainees.title}</h1>
          <p className="font-team-body mx-auto mb-6 max-w-xl text-lg font-semibold text-[#D4AF37]">{trainees.subtitle}</p>
          <p className="font-team-body mx-auto max-w-2xl leading-loose text-[#3D453E]/85">{trainees.intro}</p>
        </Reveal>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl">
          {trainees.years.map((year, i) => (
            <YearGroup key={year.key} year={year} delay={i * 0.1} />
          ))}
        </div>
      </section>
    </div>
  );
}
