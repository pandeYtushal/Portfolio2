import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Cpu, Layers, Terminal, Award, type LucideIcon } from "lucide-react";
import { easeOut } from "../lib/motion";
import { MILESTONES, type MilestoneIconName } from "../data/milestones";

const ICON_MAP: Record<MilestoneIconName, LucideIcon> = {
  Terminal,
  Layers,
  Cpu,
  Award,
};

// Animated number for year
const AnimatedYear = ({ year }: { year: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="font-mono text-[80px] md:text-[120px] font-black leading-none tracking-tighter text-app-border select-none pointer-events-none"
    >
      {year}
    </motion.div>
  );
};

export const About = () => {
  const [activeIdx, setActiveIdx] = useState(3);
  const active = MILESTONES[activeIdx];
  const ActiveIcon = ICON_MAP[active.iconName];

  return (
    <section id="about" className="border-t border-app-border bg-app-bg relative overflow-hidden">

      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-[120px] pointer-events-none opacity-30 transition-colors duration-700"
        style={{ backgroundColor: active.color }}
      />

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-app-border pb-8"
        >
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-3">
              01 / About
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-[-0.04em] text-app-text-primary leading-[1.05]">
              Engineering<br />
              <span style={{ color: active.color }} className="transition-colors duration-500">
                with Intent.
              </span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-app-text-secondary max-w-xs md:text-right">
            Transitioning computational tasks from raw API logic into self-healing autonomous systems.
          </p>
        </motion.div>
      </div>

      {/* ── Timeline ── */}
      <div className="max-w-6xl mx-auto px-6 pb-24">

        {/* Year selector tabs — motion.dev style pill row */}
        <div className="flex lg:hidden gap-1 pt-10 pb-12 overflow-x-auto scrollbar-none">
          {MILESTONES.map((stone, idx) => (
            <button
              key={stone.year}
              onClick={() => setActiveIdx(idx)}
              className="relative shrink-0 px-5 py-2 text-xs font-mono font-bold uppercase tracking-widest focus-visible:outline-none cursor-pointer transition-colors duration-200"
              style={{
                color: activeIdx === idx ? active.color : "var(--color-app-text-muted)",
              }}
            >
              {activeIdx === idx && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: `${active.color}15`, border: `1px solid ${active.color}30` }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{stone.year}</span>
            </button>
          ))}
        </div>

        {/* Content grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
          >
            {/* Left — big year + tag */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <AnimatedYear year={active.year} />
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="h-6 w-6 flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${active.color}20`, color: active.color, border: `1px solid ${active.color}40` }}
                  >
                    <ActiveIcon className="h-3.5 w-3.5" />
                  </div>
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
                    style={{ color: active.color }}
                  >
                    {active.tag}
                  </span>
                </div>
              </div>

              {/* Vertical milestone list */}
              <div className="hidden lg:flex flex-col gap-px mt-8 border-l border-app-border pl-4">
                {MILESTONES.map((stone, idx) => (
                  <button
                    key={stone.year}
                    onClick={() => setActiveIdx(idx)}
                    className="group flex items-center gap-3 py-3 text-left transition-colors duration-200 focus-visible:outline-none cursor-pointer"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: activeIdx === idx ? stone.color : "var(--color-app-border)",
                        boxShadow: activeIdx === idx ? `0 0 8px ${stone.color}` : "none",
                      }}
                    />
                    <span
                      className="font-mono text-xs font-bold transition-colors duration-200"
                      style={{ color: activeIdx === idx ? stone.color : "var(--color-app-text-muted)" }}
                    >
                      {stone.year}
                    </span>
                    <span
                      className="text-xs font-medium transition-colors duration-200"
                      style={{
                        color: activeIdx === idx
                          ? "var(--color-app-text-primary)"
                          : "var(--color-app-text-muted)",
                      }}
                    >
                      {stone.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {/* Right — detail card */}
            <div className="lg:col-span-8">
              <div
                className="relative rounded-xl p-8 md:p-10 overflow-hidden"
                style={{
                  background: `var(--color-app-surface)`,
                  boxShadow: `0 0 0 1px var(--color-app-border), 0 24px 60px rgba(0,0,0,0.15), inset 0 1px 0 var(--color-app-border)`,
                }}
              >
                {/* Soft ambient glow — far corner, very subtle */}
                <div
                  className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[100px] pointer-events-none"
                  style={{ backgroundColor: active.color, opacity: 0.08 }}
                />

                {/* Title block */}
                <div className="relative z-10 mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="h-7 w-7 flex items-center justify-center rounded-lg shrink-0"
                      style={{ backgroundColor: `${active.color}15`, color: active.color }}
                    >
                      <ActiveIcon className="h-3.5 w-3.5" />
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
                      style={{ color: active.color }}
                    >
                      {active.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-app-text-primary mb-2">
                    {active.title}
                  </h3>
                  <p
                    className="text-sm font-mono opacity-70"
                    style={{ color: active.color }}
                  >
                    {active.subtitle}
                  </p>
                </div>

                {/* Detail points */}
                <div className="relative z-10">
                  {active.details.map((point, pIdx) => (
                    <motion.div
                      key={pIdx}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: pIdx * 0.1, duration: 0.35 }}
                      className="flex items-start gap-4 py-4 border-b border-app-border last:border-0"
                    >
                      <span
                        className="mt-[6px] font-mono text-[10px] font-bold shrink-0 tabular-nums opacity-60"
                        style={{ color: active.color }}
                      >
                        {String(pIdx + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-relaxed text-app-text-secondary">{point}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom meta */}
                <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t border-app-border">
                  <span className="text-[10px] font-mono text-app-text-muted uppercase tracking-widest">
                    Milestone / {active.year}
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-60"
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
    </section>
  );
};

export default About;
