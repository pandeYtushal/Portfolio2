import { motion } from "framer-motion";
import { Cpu, Layers, ShieldCheck, DatabaseZap } from "lucide-react";

const SKILLS = [
  {
    title: "AI Agent Development",
    icon: Cpu,
    description: "Designing autonomous, multi-agent browser systems featuring self-healing DOM actions, visual element grounding, and semantic tree planning.",
    tools: ["Gemini 1.5 Pro/Flash", "OpenAI GPT-4o", "Anthropic Claude", "Manifest V3 APIs", "Vision-LLMs"],
    experience: "Engineered Hunter, a browser copilot running 7+ concurrent planning, memory, and reflection sub-agents.",
  },
  {
    title: "Full Stack Architectures",
    icon: Layers,
    description: "Constructing high-performance single page applications (SPAs) and PWAs with global states, real-time media streams, and optimized loading sequences.",
    tools: ["React", "Next.js", "Zustand", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
    experience: "Built Melody, a high-fidelity streaming application with persistent global playback state and progressive asset preloading.",
  },
  {
    title: "Database Sync & Storage",
    icon: DatabaseZap,
    description: "Implementing resilient real-time databases, local cache layers, and custom client-side compression systems for data integrity under poor connectivity.",
    tools: ["Firebase Firestore", "IndexedDB", "localForage", "SQL", "Storage Pipelines"],
    experience: "Created Urban Utility Report with a Firestore tracking dashboard, utilizing canvas compression to reduce image payloads by 70%.",
  },
  {
    title: "Clean Architecture & Tooling",
    icon: ShieldCheck,
    description: "Structuring clean, decoupled codebases with swap-ready API handlers, static typed pipelines, and linting configurations.",
    tools: ["Git & GitHub", "TypeScript", "Vite", "PostCSS", "Chrome DevTools", "Web Workers"],
    experience: "Constructed provider-agnostic LLM client hubs and offline-first database sync triggers for low-connectivity environments.",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-container border-t border-app-border bg-app-bg">
      <div className="mb-16 md:mb-24 text-left max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-app-text-muted mb-3">
          Specialization
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-app-text-primary sm:text-4xl md:text-5xl">
          Engineering Focus
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-app-text-secondary sm:text-base">
          Beyond general web development, I focus on software systems that merge artificial intelligence with robust, user-centered design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILLS.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between rounded-2xl border border-app-border bg-app-surface p-6 transition-all duration-300 hover:border-app-border hover:scale-[1.01] shadow-none"
            >
              <div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-app-border bg-app-surface-secondary text-app-text-secondary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-app-text-primary">
                    {skill.title}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-app-text-secondary">
                  {skill.description}
                </p>
              </div>

              <div className="mt-8 space-y-4 pt-6 border-t border-app-border">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted mb-2">
                    Key Tools & Tech
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-app-border bg-app-surface-secondary px-2.5 py-0.5 text-[10px] font-medium text-app-text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted mb-1">
                    Applied Experience
                  </h4>
                  <p className="text-xs leading-relaxed text-app-text-secondary">
                    {skill.experience}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
