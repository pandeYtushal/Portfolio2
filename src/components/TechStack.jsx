import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Server, Brain, Database, Cloud, Wrench, ChevronRight } from "lucide-react";

const CATEGORIES = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: Brain,
    description: "Developing intelligent agent pipelines, multi-LLM orchestration, and vision-guided automation.",
    tools: ["AI Agents", "Gemini API", "OpenAI API", "Anthropic", "Vision Models", "RAG Systems", "Prompt Engineering"],
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: Layout,
    description: "Crafting modern, typography-first user interfaces with responsive structures and smooth interactions.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI", "JavaScript (ES6+)"],
  },
  {
    id: "backend",
    title: "Backend & Systems",
    icon: Server,
    description: "Implementing server architectures, streaming protocols, and clean computational logic.",
    tools: ["Node.js", "Express", "REST APIs", "C++", "Structured Logic"],
  },
  {
    id: "databases",
    title: "Databases & Storage",
    icon: Database,
    description: "Architecting real-time synchronization, client-side storage, and secure caching models.",
    tools: ["Firestore", "PostgreSQL", "IndexedDB", "LocalForage", "SQL"],
  },
  {
    id: "cloud",
    title: "Cloud & Deployment",
    icon: Cloud,
    description: "Deploying scalable serverless operations, optimizing assets, and continuous delivery systems.",
    tools: ["Vercel", "Firebase Storage", "Firebase Auth", "CI/CD Platforms"],
  },
  {
    id: "tools",
    title: "Development Tools",
    icon: Wrench,
    description: "Utilizing modern software tooling to maintain high engineering standards and fast iteration cycles.",
    tools: ["Git", "GitHub", "Chrome Extensions API", "VS Code", "Figma", "Lovable", "Cursor"],
  },
];

const TechStack = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <section id="tech" className="section-container border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
      <div className="mb-16 md:mb-24 text-left max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3">
          Capabilities
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
          Core Technologies
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base">
          A structured look at my engineering stack. I specialize in designing autonomous AI agents and constructing clean web interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isHovered = hoveredCategory === cat.id;

          return (
            <motion.div
              key={cat.id}
              className="relative overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-6 dark:border-zinc-800/80 dark:bg-zinc-900/10 transition-colors duration-300"
              onMouseEnter={() => setHoveredCategory(cat.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              layout
            >
              {/* Top Accent line on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-900 dark:bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.25 }}
              />

              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <ChevronRight
                  className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${
                    isHovered ? "translate-x-1 text-zinc-900 dark:text-white" : ""
                  }`}
                />
              </div>

              <h3 className="mt-6 text-lg font-bold text-zinc-900 dark:text-white">
                {cat.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {cat.description}
              </p>

              {/* Staggered Expandable Details Container */}
              <div className="mt-6 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/40">
                <div className="flex flex-wrap gap-1.5">
                  {cat.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center rounded border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-medium text-zinc-600 transition-colors dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStack;
