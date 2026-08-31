import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUpSubtle } from "../lib/motion";

const SKILL_CATEGORIES = [
  {
    id: "languages",
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "C++", "C", "HTML5", "CSS3"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    skills: ["React.js", "Tailwind CSS", "Zustand", "Framer Motion", "Vite", "PWA Support"],
  },
  {
    id: "tools",
    title: "Tools & Infra",
    skills: ["Git", "GitHub", "PostgreSQL", "Firestore", "IndexedDB", "Firebase", "REST APIs", "Vercel", "VS Code"],
  },
  {
    id: "ai",
    title: "AI & Automation",
    skills: ["Browser Automation", "LLM Orchestration", "Prompt Engineering", "Multi-Agent Systems", "Puppeteer", "Playwright"],
  },
];

export const Skills = () => {
  const [activeId, setActiveId] = useState("languages");
  const active = SKILL_CATEGORIES.find((c) => c.id === activeId)!;

  return (
    <section id="skills" className="border-t border-app-border bg-app-bg">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-24">

        <motion.div
          variants={fadeUpSubtle}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-4">
            03 / SKILLS
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-app-text-primary leading-[1.0]">
            THE STACK.
          </h2>
          <p className="mt-4 text-sm font-mono leading-relaxed text-app-text-secondary max-w-md">
            Curated set of languages, frameworks, infrastructure layers, and AI tooling.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-app-border pb-6">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeId === cat.id;
            return (
              <button
                key={cat.id}
                id={`skill-tab-${cat.id}`}
                onClick={() => setActiveId(cat.id)}
                className="h-9 px-4 text-[10px] font-mono font-bold uppercase tracking-[0.15em] border transition-all duration-200 cursor-pointer"
                style={{
                  borderColor:     isActive
                    ? "var(--color-app-accent)"
                    : "var(--color-app-text-muted)",
                  color:           isActive
                    ? "var(--color-app-accent)"
                    : "var(--color-app-text-secondary)",
                  backgroundColor: isActive
                    ? "transparent"
                    : "transparent",
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        <div className="min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="flex flex-wrap gap-2.5"
            >
              {active.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.18 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-app-border bg-app-surface text-app-text-secondary hover:text-app-text-primary hover:border-app-text-muted transition-colors duration-200 cursor-default"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-app-accent shrink-0" />
                  <span className="text-[11px] font-mono font-semibold tracking-[0.08em]">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Visually hidden full skill list for screen readers and non-JS crawlers */}
        <div className="sr-only" aria-label="Full skills list">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <h3>{cat.title}</h3>
              <ul>
                {cat.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
