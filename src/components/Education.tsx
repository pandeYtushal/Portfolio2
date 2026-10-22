import React from "react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const rowReveal: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

interface ExperienceItem {
  period: string;
  company: string;
  type: string;
  description: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: "Jan 2026 — Present",
    company: "Freelance",
    type: "Self-Employed",
    description:
      "Building polished, high-performance web experiences for clients — from interactive portfolios to full-stack applications. Focused on delivering premium UI/UX with modern frameworks and clean, maintainable code.",
    highlights: [
      "React / Next.js / Vite",
      "Motion Design & Animations",
      "Full-Stack Integrations",
    ],
  },
  {
    period: "Jun 2024 — Aug 2024",
    company: "Metacrafters",
    type: "Internship",
    description:
      "Developed and deployed smart contracts on EVM-compatible chains, built decentralized front-ends, and explored token standards, DeFi patterns, and on-chain data flows during an intensive summer program.",
    highlights: [
      "Solidity & EVM Smart Contracts",
      "Web3.js / Ethers.js Integration",
      "DApp Frontend Development",
    ],
  },
];

export const Education = () => {
  return (
    <section id="education" className="relative py-28 md:py-40 px-6 md:px-12 text-app-text-primary z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-14 md:gap-20">

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="flex items-center gap-6"
        >
          <motion.span custom={0} variants={fadeUp} className="font-mono text-sm tracking-widest font-bold text-app-text-primary">05</motion.span>
          <motion.span custom={1} variants={fadeUp} className="font-sans text-xs uppercase tracking-widest font-semibold text-app-text-primary">Experience</motion.span>
          <motion.div custom={2} variants={fadeUp} className="h-[1px] flex-1 bg-app-border/70 ml-4" />
        </motion.div>

        {/* Open Editorial Layout */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 border-t border-app-border/70 pt-10 items-start"
        >
          <motion.div custom={0} variants={fadeUp} className="md:col-span-5 flex flex-col gap-6">
            <h2 className="text-4xl sm:text-5xl font-serif font-medium leading-[1.1] tracking-tight drop-shadow-[0_2px_15px_rgba(244,244,240,0.7)]">
              WORK &amp; EXPERIENCE
            </h2>
            <p className="font-sans text-base sm:text-lg text-app-text-secondary leading-relaxed">
              From blockchain internships to independent client work — a record of professional roles where I shipped real products and sharpened my craft.
            </p>
          </motion.div>

          <div className="md:col-span-7 flex flex-col gap-8">
            {experiences.map((item, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={rowReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="group border-b border-app-border/70 pb-8 flex flex-col gap-3 hover:translate-x-2 transition-transform duration-300"
              >
                <div className="flex items-baseline justify-between flex-wrap gap-2">
                  <span className="font-mono text-xs text-app-text-primary tracking-wider uppercase font-bold">
                    {item.period} &bull; {item.type}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-medium text-app-text-primary group-hover:text-app-accent transition-colors">
                  {item.company}
                </h3>

                <p className="font-sans text-sm sm:text-base text-app-text-secondary leading-relaxed mt-1">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {item.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full border border-app-border/60 font-mono text-[11px] tracking-wider text-app-text-secondary uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Education;
