import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SkillCategory {
  num: string;
  category: string;
  items: string[];
  diagram: React.ReactNode;
}

const SKILL_INDEX: SkillCategory[] = [
  {
    num: "01",
    category: "LANGUAGES",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "C++", "HTML5", "CSS3"],
    diagram: (
      <svg className="w-16 h-16 stroke-current text-app-accent" viewBox="0 0 64 64" fill="none">
        <path d="M12 20h20M22 20v24M34 32h18M44 20v24" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="44" r="2.5" fill="currentColor" />
        <circle cx="44" cy="20" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "02",
    category: "SYSTEMS & FRAMEWORKS",
    items: ["React.js", "Tailwind CSS", "Zustand", "Framer Motion", "Vite", "REST APIs", "PostgreSQL"],
    diagram: (
      <svg className="w-16 h-16 stroke-current text-app-accent" viewBox="0 0 64 64" fill="none">
        <circle cx="20" cy="20" r="4" strokeWidth="1.5" />
        <circle cx="44" cy="20" r="4" strokeWidth="1.5" />
        <circle cx="32" cy="44" r="4" strokeWidth="1.5" />
        <path d="M24 22l6 18M40 22l-6 18M24 20h16" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    category: "AI & AUTOMATION",
    items: ["Browser Automation", "LLM Orchestration", "Puppeteer", "Playwright", "Multi-Agent Systems"],
    diagram: (
      <svg className="w-16 h-16 stroke-current text-app-accent" viewBox="0 0 64 64" fill="none">
        <path d="M16 32c0-8.8 7.2-16 16-16s16 7.2 16 16-7.2 16-16 16" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M44 28l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "04",
    category: "TOOLS & INFRASTRUCTURE",
    items: ["Git", "GitHub", "Vercel", "Firebase", "IndexedDB", "Firestore", "VS Code"],
    diagram: (
      <svg className="w-16 h-16 stroke-current text-app-accent" viewBox="0 0 64 64" fill="none">
        <rect x="16" y="16" width="32" height="32" rx="4" strokeWidth="1.5" />
        <path d="M16 28h32M28 28v20" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const TechItem = ({ name }: { name: string }) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.span
      whileHover={
        shouldReduce
          ? undefined
          : { x: 3, transition: { type: "spring", stiffness: 280, damping: 22 } }
      }
      className="text-sm sm:text-base font-sans text-app-text-secondary hover:text-app-text-primary transition-colors cursor-default select-none inline-block"
    >
      {name}
    </motion.span>
  );
};

export const Skills = () => {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  const groupReveal = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="skills" className="border-t border-app-border/40 bg-app-bg px-6 py-24 sm:py-32 overflow-x-hidden">
      <div className="max-w-5xl mx-auto flex flex-col gap-16 sm:gap-20">

        {/* Editorial Introduction */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={groupReveal}
          className="flex flex-col items-start gap-4 max-w-2xl"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-app-text-muted">
            05 / TECHNICAL INDEX
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-normal tracking-tight text-app-text-primary leading-tight">
            The tools change. <br />
            <span className="italic font-serif text-app-text-secondary">The way I build doesn&apos;t.</span>
          </h2>
        </motion.div>

        {/* Asymmetric Technical Index */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (01 & 03) */}
          <div className="lg:col-span-6 flex flex-col gap-12 sm:gap-16">
            {SKILL_INDEX.filter((_, i) => i % 2 === 0).map((group) => (
              <motion.div
                key={group.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={groupReveal}
                onMouseEnter={() => setHoveredGroup(group.num)}
                onMouseLeave={() => setHoveredGroup(null)}
                className="group relative flex flex-col gap-4 py-4 border-b border-app-border/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-light text-app-accent">{group.num}</span>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-app-text-muted group-hover:text-app-text-primary transition-colors">
                      {group.category}
                    </h3>
                  </div>

                  {/* Restrained Abstract Diagram Reveal */}
                  <div className={`transition-opacity duration-500 pointer-events-none ${hoveredGroup === group.num ? "opacity-100" : "opacity-0"}`}>
                    {group.diagram}
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
                  {group.items.map((item) => (
                    <TechItem key={item} name={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column (02 & 04) — Staggered Editorial Offset */}
          <div className="lg:col-span-6 lg:translate-y-12 flex flex-col gap-12 sm:gap-16">
            {SKILL_INDEX.filter((_, i) => i % 2 === 1).map((group) => (
              <motion.div
                key={group.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={groupReveal}
                onMouseEnter={() => setHoveredGroup(group.num)}
                onMouseLeave={() => setHoveredGroup(null)}
                className="group relative flex flex-col gap-4 py-4 border-b border-app-border/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-light text-app-accent">{group.num}</span>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-app-text-muted group-hover:text-app-text-primary transition-colors">
                      {group.category}
                    </h3>
                  </div>

                  {/* Restrained Abstract Diagram Reveal */}
                  <div className={`transition-opacity duration-500 pointer-events-none ${hoveredGroup === group.num ? "opacity-100" : "opacity-0"}`}>
                    {group.diagram}
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
                  {group.items.map((item) => (
                    <TechItem key={item} name={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Quiet Transition Line */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={groupReveal}
          className="pt-8 border-t border-app-border/30 flex items-center justify-between text-[10px] font-mono text-app-text-muted uppercase tracking-widest"
        >
          <span>Tools are only useful when they solve something.</span>
          <span className="hidden sm:inline">TUSHAL PANDEY</span>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
