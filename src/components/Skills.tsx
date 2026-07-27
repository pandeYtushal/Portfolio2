import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUpSubtle } from "../lib/motion";

const SKILL_CATEGORIES = [
  {
    id: "languages",
    title: "LANGUAGES",
    color: "#ff8a00",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "C++", "C", "HTML5", "CSS3"],
  },
  {
    id: "frameworks",
    title: "FRAMEWORKS",
    color: "#a855f7",
    skills: ["React.js", "Tailwind CSS", "Zustand", "Framer Motion", "Vite", "PWA Support"],
  },
  {
    id: "tools",
    title: "TOOLS & INFRA",
    color: "#3b82f6",
    skills: ["Git", "GitHub", "PostgreSQL", "Firestore", "IndexedDB", "Firebase", "REST APIs", "Vercel", "VS Code"],
  },
  {
    id: "ai",
    title: "AI & AUTOMATION",
    color: "#10b981",
    skills: ["Browser Automation", "LLM Orchestration", "Prompt Engineering", "Multi-Agent Systems", "Puppeteer", "Playwright"],
  },
];

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("languages");
  const active = SKILL_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section id="skills" className="border-t border-app-border bg-app-bg relative overflow-hidden">

      {/* motion.dev-style header */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <motion.div
          variants={fadeUpSubtle}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative z-10 flex flex-col gap-4 border-b border-app-border pb-8"
        >
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-3">
              03 / SKILLS
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-sans font-bold tracking-tight text-app-text-primary leading-[1.05]">
              CORE ENGINE.
            </h2>
          </div>
          <p className="text-xs font-mono leading-relaxed text-app-text-secondary max-w-xl">
            Curated set of models, compilers, infrastructure layers, and state environments.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24 relative z-10">

        {/* Category switcher - styled like Hero buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex h-11 items-center justify-center px-6 text-[10px] font-mono font-bold uppercase tracking-[0.15em] transition-all duration-300 active:scale-95 cursor-pointer ${isActive
                    ? "border-2 bg-app-surface"
                    : "border-2 border-app-border bg-transparent text-app-text-muted hover:border-app-text-secondary hover:text-app-text-primary"
                  }`}
                style={{
                  borderColor: isActive ? active.color : undefined,
                  color: isActive ? active.color : undefined,
                }}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Minimal Grid of Sharp Tags */}
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              {active.skills.map((skill, idx) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03, duration: 0.2 }}
                  className="px-5 py-4 border border-app-border bg-app-surface text-app-text-primary rounded-none flex items-center gap-3 hover:border-white/20 transition-colors cursor-default"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: active.color,
                      boxShadow: `0 0 8px ${active.color}`,
                    }}
                  />
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.15em]">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;
