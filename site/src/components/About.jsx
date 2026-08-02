import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { about } from "../data/home";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function useCountUp(target, enabled) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(enabled ? 0 : target);

  useEffect(() => {
    if (!isInView) return;
    if (!enabled) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.3,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, enabled, target]);

  return { ref, value };
}

export default function About() {
  const reduceMotion = useReducedMotion();
  const match = about.stat.value.match(/^(\D*)(\d+)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const numeric = match ? Number(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const { ref: statRef, value: statValue } = useCountUp(numeric, !reduceMotion);

  return (
    <section id="about" className="relative overflow-hidden bg-cream py-14 md:py-20 px-6 md:px-10">
      <div className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-teal/10 blur-[100px]" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className="relative mx-auto flex max-w-[1360px] flex-col items-stretch gap-12 md:flex-row md:gap-0"
      >
        {/* Right column — brand headline + stat */}
        <motion.div variants={itemVariants} className="md:w-[42%] md:shrink-0 md:pl-14">
          <h2
            className="font-kufi text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.4] tracking-wide mb-8"
            style={{ color: "#111E16" }}
          >
            {about.title}
          </h2>

          <div ref={statRef} className="flex items-end gap-4">
            <p
              className="font-kufi text-6xl md:text-7xl font-black tabular-nums leading-none"
              style={{ color: "#C5A059" }}
            >
              {prefix}
              {statValue}
              {suffix}
            </p>
            <p className="mb-2 max-w-[160px] text-sm leading-relaxed text-ink-muted">{about.stat.label}</p>
          </div>
        </motion.div>

        {/* Delicate vertical gold separator */}
        <div className="hidden w-px shrink-0 self-stretch bg-gold/30 md:block" />

        {/* Left column — full text, wide-stretching */}
        <motion.div variants={itemVariants} className="flex flex-1 items-center md:pr-14">
          <div className="w-full space-y-6 md:max-w-[900px]">
            <p className="text-ink text-xl leading-[1.8] tracking-wide font-medium">
              {about.bodyLead}
              <span className="font-bold" style={{ color: "#C5A059" }}>
                {about.bodyHighlight}
              </span>
              {about.bodyTail}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
