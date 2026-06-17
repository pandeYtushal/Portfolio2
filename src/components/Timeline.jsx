import { motion } from "framer-motion";
import { Award, Compass, Globe, Cpu, Terminal } from "lucide-react";

const MILESTONES = [
  {
    year: "2022",
    title: "Started Programming",
    icon: Terminal,
    description: "Began writing code in C++ and diving into object-oriented programming. Built a strong foundation in data structures, command-line applications, and core software algorithms.",
  },
  {
    year: "2023",
    title: "Decentralized Systems & Web3",
    icon: Compass,
    description: "Ventured into blockchain systems and smart contracts. Designed Solidity scripts and security validation layers, expanding knowledge of cryptography and distributed computing.",
  },
  {
    year: "2024",
    title: "Full Stack Product Engineering",
    icon: Globe,
    description: "Deepened expertise in frontend design and backend state integration. Shipped PWA audio players, real-time ticket logs, and database structures using React, Zustand, and Firebase.",
  },
  {
    year: "2025",
    title: "AI Integrations & Pipelines",
    icon: Cpu,
    description: "Transitioned to building AI-assisted applications. Developed structured parsing clients, model router hubs, and vision model APIs, shifting focus toward cognitive automation.",
  },
  {
    year: "2026",
    title: "Autonomous Browser Agents",
    icon: Award,
    description: "Architected Hunter, an autonomous web copilot. Engineered a multi-agent system featuring memory stores, DOM selector self-healing, and vision element grounding.",
  },
];

const Timeline = () => {
  return (
    <section id="journey" className="section-container border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
      <div className="mb-20 md:mb-28 text-left max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3">
          Evolution
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
          Journey Timeline
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base">
          A progression of my software engineering pathway, charting a transition from procedural C++ coding to complex autonomous AI systems.
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Central Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-200 dark:bg-zinc-800 -translate-x-[0.5px]" />

        <div className="space-y-12 md:space-y-16">
          {MILESTONES.map((stone, index) => {
            const Icon = stone.icon;
            const isEven = index % 2 === 0;

            return (
              <div key={stone.year} className="relative flex flex-col md:flex-row items-start md:items-center">
                {/* Visual node marker */}
                <div className="absolute left-4 md:left-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 shadow-sm -translate-x-[15.5px] z-10">
                  <Icon className="h-3.5 w-3.5" />
                </div>

                {/* Left pane (desktop: year or content) */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 text-left md:text-right ${
                  isEven ? "md:opacity-100" : "md:order-last md:text-left md:pl-12"
                }`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  >
                    <span className="font-mono text-sm font-bold text-zinc-400 dark:text-zinc-500">
                      {stone.year}
                    </span>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
                      {stone.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-md ml-auto max-md:ml-0 md:mr-0">
                      {stone.description}
                    </p>
                  </motion.div>
                </div>

                {/* Right empty pane spacer for desktop */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
