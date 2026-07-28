import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Cpu, Layers, Terminal, Award, Globe, Zap, type LucideIcon } from "lucide-react";
import { easeOut } from "../lib/motion";
import { MILESTONES, type MilestoneIconName } from "../data/milestones";

const ICON_MAP: Record<MilestoneIconName, LucideIcon> = {
  Terminal,
  Layers,
  Cpu,
  Award,
};

/* Animated large year number */
const AnimatedYear = ({ year }: { year: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="font-mono text-5xl font-black leading-none tracking-tighter select-none text-app-surface-secondary"
    >
      {year}
    </motion.span>
  );
};

export const About = () => {
  const [activeIdx, setActiveIdx] = useState(3);
  const active     = MILESTONES[activeIdx];
  const ActiveIcon = ICON_MAP[active.iconName];

  return (
    <section id="about" className="border-t border-app-border bg-app-bg">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-24">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mb-16 border-b border-app-border pb-10"
        >
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-4">
            01 / ABOUT
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-app-text-primary leading-[1.0]">
            ENGINEERING<br />
            <span style={{ color: active.color }} className="transition-colors duration-500">
              WITH INTENT.
            </span>
          </h2>
          <p className="mt-5 text-sm font-mono text-app-text-secondary max-w-lg leading-relaxed">
            Transitioning computational tasks from raw API logic into self-healing autonomous systems.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left: Bio + Focus */}
          <div className="lg:col-span-4 flex flex-col gap-5">

            {/* Bio */}
            <div className="border border-app-border rounded-lg p-5 bg-app-surface flex flex-col gap-3">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-app-text-muted mb-1">
                Background
              </p>
              <p className="text-[11px] font-mono leading-relaxed text-app-text-secondary">
                I am a systems builder and software engineer. My journey started with cryptography and
                blockchain protocols, which instilled a deep focus on deterministic logic and execution accuracy.
              </p>
              <p className="text-[11px] font-mono leading-relaxed text-app-text-secondary">
                I transitioned into full-stack products with a specialized focus on state synchronization,
                browser automation scrapers, and orchestration systems.
              </p>
              <p className="text-[11px] font-mono leading-relaxed text-app-text-secondary">
                Currently architecting autonomous agent models that navigate complex dynamic environments,
                auto-healing in real-time when the DOM shifts.
              </p>
            </div>

            {/* Areas of Focus */}
            <div className="border border-app-border rounded-lg p-5 bg-app-surface flex flex-col gap-4">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-app-text-muted mb-1">
                Areas of Focus
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Cpu,   color: "#f97316", title: "Autonomous Systems",   desc: "Multi-model orchestration, browser control loops, self-healing automation nodes." },
                  { icon: Globe, color: "#6b7280", title: "Distributed Networks",  desc: "Decentralized nodes, blockchain state machines, realtime replication pipelines." },
                  { icon: Zap,   color: "#9ca3af", title: "High-Performance UI",  desc: "Route-level cache states, zero-flash views, dynamic client-side layouts." },
                ].map(({ icon: Icon, color, title, desc }) => (
                  <li key={title} className="flex items-start gap-3">
                    <div
                      className="h-6 w-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${color}12`, color }}
                    >
                      <Icon className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-app-text-primary mb-0.5">{title}</p>
                      <p className="text-[11px] font-mono text-app-text-secondary leading-relaxed">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Mobile year tabs */}
            <div className="flex lg:hidden gap-1.5 overflow-x-auto pb-1">
              {MILESTONES.map((stone, idx) => (
                <button
                  key={stone.year}
                  onClick={() => setActiveIdx(idx)}
                  className="shrink-0 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest rounded-full border transition-all duration-200 cursor-pointer"
                  style={{
                    borderColor:     activeIdx === idx ? `${stone.color}40` : "var(--color-app-border)",
                    color:           activeIdx === idx ? stone.color : "var(--color-app-text-muted)",
                    backgroundColor: activeIdx === idx ? `${stone.color}0e` : "transparent",
                  }}
                >
                  {stone.year}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: easeOut }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                {/* Desktop year list */}
                <div className="hidden lg:flex lg:col-span-4 flex-col gap-px border-l border-app-border pl-4">
                  {MILESTONES.map((stone, idx) => (
                    <button
                      key={stone.year}
                      onClick={() => setActiveIdx(idx)}
                      className="group flex items-center gap-3 py-3 text-left cursor-pointer transition-all duration-200"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-300"
                        style={{
                          backgroundColor: activeIdx === idx ? stone.color : "var(--color-app-text-muted)",
                          opacity:         activeIdx === idx ? 1 : 0.4,
                          boxShadow:       activeIdx === idx ? `0 0 5px ${stone.color}` : "none",
                        }}
                      />
                      <span
                        className="font-mono text-[11px] font-bold transition-colors duration-200 w-10 shrink-0"
                        style={{ color: activeIdx === idx ? stone.color : "var(--color-app-text-muted)" }}
                      >
                        {stone.year}
                      </span>
                      <span
                        className="text-[11px] font-mono transition-colors duration-200 truncate"
                        style={{ color: activeIdx === idx ? "var(--color-app-text-primary)" : "var(--color-app-text-muted)" }}
                      >
                        {stone.title}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Detail card */}
                <div className="lg:col-span-8">
                  <div className="relative border border-app-border rounded-lg bg-app-surface overflow-hidden flex flex-col gap-5 p-6">
                    {/* Ambient glow */}
                    <div
                      className="absolute -top-16 -right-16 h-40 w-40 rounded-full blur-[80px] pointer-events-none transition-colors duration-500"
                      style={{ backgroundColor: active.color, opacity: 0.06 }}
                    />

                    {/* Header */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="h-6 w-6 rounded flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${active.color}14`, color: active.color }}
                        >
                          <ActiveIcon className="h-3 w-3" />
                        </div>
                        <span
                          className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
                          style={{ color: active.color }}
                        >
                          {active.tag}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <h3 className="text-xl font-black tracking-tight text-app-text-primary">
                          {active.title}
                        </h3>
                        <AnimatedYear year={active.year} />
                      </div>
                      <p
                        className="text-[11px] font-mono mt-1 opacity-60"
                        style={{ color: active.color }}
                      >
                        {active.subtitle}
                      </p>
                    </div>

                    {/* Points */}
                    <div className="relative z-10 flex flex-col">
                      {active.details.map((point, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.09, duration: 0.3 }}
                          className="flex items-start gap-3 py-2.5 border-b border-app-border last:border-0"
                        >
                          <span
                            className="font-mono text-[9px] font-bold shrink-0 mt-[3px] opacity-40"
                            style={{ color: active.color }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="text-[11px] leading-relaxed text-app-text-secondary font-mono">{point}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="relative z-10 flex items-center justify-between border-t border-app-border pt-3 mt-auto">
                      <span className="text-[9px] font-mono text-app-text-muted uppercase tracking-widest">
                        Milestone · {active.year}
                      </span>
                      <span
                        className="text-[9px] font-mono font-bold uppercase tracking-widest opacity-40"
                        style={{ color: active.color }}
                      >
                        {active.tag} ──
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
