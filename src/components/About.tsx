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

// Interactive flowchart renderer based on active milestone
const MilestoneDiagram = ({ year, color }: { year: string; color: string }) => {
  switch (year) {
    case "2023":
      return (
        <div className="border border-app-border bg-app-surface-secondary/40 rounded-xl p-4 flex flex-col gap-3 font-mono text-[10px] tracking-tight relative overflow-hidden">
          <div className="text-[10px] uppercase font-bold mb-1" style={{ color }}>
            Decentralized Web3 Transaction Flow
          </div>
          <div className="flex items-center justify-between gap-2 border border-blue-500/20 bg-blue-500/5 p-2 rounded-lg">
            <span className="text-zinc-700 dark:text-zinc-400">Client App</span>
            <span className="text-blue-600 dark:text-blue-400 animate-pulse font-bold">──[ RPC Request ]──&gt;</span>
            <span className="text-zinc-800 dark:text-zinc-200">Ethereum EVM</span>
          </div>
          <div className="flex justify-center text-zinc-400 dark:text-zinc-500 text-[8px]">▼</div>
          <div className="border border-emerald-500/20 bg-emerald-500/5 p-2.5 rounded-lg text-center">
            <div className="text-emerald-600 dark:text-emerald-400 font-bold">Solidity Smart Contract</div>
            <div className="text-zinc-600 dark:text-zinc-400 mt-1 text-[9px]">State Mutation & Verified Log Emit</div>
          </div>
        </div>
      );
    case "2024":
      return (
        <div className="border border-app-border bg-app-surface-secondary/40 rounded-xl p-4 flex flex-col gap-3 font-mono text-[10px] tracking-tight">
          <div className="text-[10px] uppercase font-bold mb-1" style={{ color }}>
            Zero-Flash Realtime Cache Sync (Melody)
          </div>
          <div className="grid grid-cols-3 gap-2 text-center items-center">
            <div className="border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-2 rounded-lg">
              <div className="text-zinc-800 dark:text-zinc-200 font-bold">Local UI Store</div>
              <div className="text-zinc-500 dark:text-zinc-400 mt-0.5 text-[9px]">Zustand Cached</div>
            </div>
            <div className="flex flex-col items-center justify-center font-bold" style={{ color }}>
              <span className="animate-pulse">⇄ Sync ⇄</span>
              <span className="text-[8px] opacity-75">Sub-200ms</span>
            </div>
            <div className="border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-2 rounded-lg">
              <div className="text-zinc-800 dark:text-zinc-200 font-bold">Firestore DB</div>
              <div className="text-zinc-500 dark:text-zinc-400 mt-0.5 text-[9px]">Realtime Cache</div>
            </div>
          </div>
        </div>
      );
    case "2025":
      return (
        <div className="border border-app-border bg-app-surface-secondary/40 rounded-xl p-4 flex flex-col gap-3 font-mono text-[10px] tracking-tight">
          <div className="text-[10px] uppercase font-bold mb-1" style={{ color }}>
            Structured AI Orchestration Flow
          </div>
          <div className="flex flex-col gap-2">
            <div className="border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-2 rounded-lg text-center">
              <span className="text-zinc-800 dark:text-zinc-300">Client Query Router Hub</span>
            </div>
            <div className="flex justify-around font-bold text-zinc-500 dark:text-zinc-400">
              <span className="hover:text-purple-600 dark:hover:text-purple-400 transition">↙ GPT-4o</span>
              <span className="hover:text-purple-600 dark:hover:text-purple-400 transition">↓ Claude 3.5</span>
              <span className="hover:text-purple-600 dark:hover:text-purple-400 transition">↘ Gemini 3.5</span>
            </div>
            <div className="border border-emerald-500/20 bg-emerald-500/5 p-2 rounded-lg text-center">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Output Parser</span>
              <span className="text-zinc-600 dark:text-zinc-400 text-[9px]"> (Validation ➔ Clean JSON Output)</span>
            </div>
          </div>
        </div>
      );
    case "2026":
    default:
      return (
        <div className="border border-app-border bg-app-surface-secondary/40 rounded-xl p-4 flex flex-col gap-3 font-mono text-[10px] tracking-tight">
          <div className="text-[10px] uppercase font-bold mb-1" style={{ color }}>
            Hunter Multi-Agent System Swarm
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="border border-emerald-500/20 bg-emerald-500/5 p-2 rounded-lg flex flex-col justify-center min-h-[45px]">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Planning Agent</span>
            </div>
            <div className="border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-2 rounded-lg flex flex-col justify-center min-h-[45px]">
              <span className="text-zinc-800 dark:text-zinc-300 font-bold">Memory Node</span>
            </div>
            <div className="border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-2 rounded-lg flex flex-col justify-center min-h-[45px]">
              <span className="text-zinc-800 dark:text-zinc-300 font-bold">Browser Swarm</span>
            </div>
          </div>
          <div className="border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/40 p-2 rounded-lg text-center">
            <span className="font-bold" style={{ color }}>Self-Healing DOM Loop: </span>
            <span className="text-zinc-600 dark:text-zinc-400">Scan ➔ Detect Shifts ➔ Auto-Patch Selector XPath</span>
          </div>
        </div>
      );
  }
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
      className="font-mono text-[60px] md:text-[80px] font-black leading-none tracking-tighter text-app-border select-none pointer-events-none"
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
          className="flex flex-col gap-4 border-b border-app-border pb-8"
        >
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-3">
              01 / ABOUT
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-[-0.04em] text-app-text-primary leading-[1.05]">
              ENGINEERING<br />
              <span style={{ color: active.color }} className="transition-colors duration-500">
                WITH INTENT.
              </span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-app-text-secondary max-w-xl font-mono text-xs">
            Transitioning computational tasks from raw API logic into self-healing autonomous systems.
          </p>
        </motion.div>
      </div>

      {/* ── Grid Container ── */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10">
          
          {/* Left Column: Background & Interests */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Background Info Block */}
            <div className="border border-app-border bg-app-surface/40 backdrop-blur-md rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-app-text-muted">
                01.1 / BACKGROUND
              </h3>
              <p className="text-xs leading-relaxed text-app-text-secondary font-mono">
                I am a systems builder and software engineer. My journey started with cryptography and blockchain protocols, which instilled a deep focus on deterministic logic and execution accuracy.
              </p>
              <p className="text-xs leading-relaxed text-app-text-secondary font-mono">
                Over the years, I transitioned into building full-stack products with a specialized focus on state synchronization, browser automation scrapers, and orchestration systems.
              </p>
              <p className="text-xs leading-relaxed text-app-text-secondary font-mono">
                Currently, I am architecting autonomous agent models that navigate complex dynamic environments, auto-healing in real-time when the DOM shifts.
              </p>
            </div>

            {/* Technical Focus Card */}
            <div className="border border-app-border bg-app-surface/40 backdrop-blur-md rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-app-text-muted">
                01.2 / AREAS OF FOCUS
              </h3>
              <ul className="space-y-4 text-xs text-app-text-secondary font-mono">
                <li className="flex items-start gap-3">
                  <Cpu className="h-4 w-4 text-[#ff8a00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-app-text-primary block font-semibold mb-0.5">Autonomous Systems</strong>
                    Multi-model orchestration, browser control loops, self-healing browser automation nodes.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="h-4 w-4 text-[#3b82f6] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-app-text-primary block font-semibold mb-0.5">Distributed Networks</strong>
                    Decentralized nodes, blockchain state machines, realtime Firestore replication pipelines.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-4 w-4 text-[#a855f7] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-app-text-primary block font-semibold mb-0.5">High-Performance UI</strong>
                    Route-level cache states, zero-flash views, dynamic client-side layouts.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Milestones Timeline */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Year selector tabs (Mobile) */}
            <div className="flex lg:hidden gap-1 pt-4 pb-12 overflow-x-auto scrollbar-none">
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

            {/* Content sub-grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left — Desktop Vertical milestones list */}
                <div className="lg:col-span-4 hidden lg:flex flex-col gap-px border-l border-app-border pl-4">
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
                        className="text-xs font-medium font-mono transition-colors duration-200"
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

                {/* Right — Detail card */}
                <div className="lg:col-span-8 col-span-12">
                  <div
                    className="relative rounded-xl p-6 md:p-8 overflow-hidden flex flex-col gap-6"
                    style={{
                      background: `var(--color-app-surface)`,
                      boxShadow: `0 0 0 1px var(--color-app-border), 0 24px 60px rgba(0,0,0,0.15), inset 0 1px 0 var(--color-app-border)`,
                    }}
                  >
                    {/* Soft ambient glow */}
                    <div
                      className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[100px] pointer-events-none"
                      style={{ backgroundColor: active.color, opacity: 0.08 }}
                    />

                    {/* Title block */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
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
                      <div className="flex items-baseline justify-between flex-wrap gap-2">
                        <h3 className="text-xl md:text-2xl font-black tracking-tight text-app-text-primary">
                          {active.title}
                        </h3>
                        <AnimatedYear year={active.year} />
                      </div>
                      <p
                        className="text-xs font-mono opacity-80 mt-1"
                        style={{ color: active.color }}
                      >
                        {active.subtitle}
                      </p>
                    </div>

                    {/* Detail points */}
                    <div className="relative z-10 flex flex-col gap-3">
                      {active.details.map((point, pIdx) => (
                        <motion.div
                          key={pIdx}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: pIdx * 0.1, duration: 0.35 }}
                          className="flex items-start gap-3 py-2 border-b border-app-border last:border-0"
                        >
                          <span
                            className="mt-[4px] font-mono text-[9px] font-bold shrink-0 tabular-nums opacity-60"
                            style={{ color: active.color }}
                          >
                            {String(pIdx + 1).padStart(2, "0")}
                          </span>
                          <p className="text-xs leading-relaxed text-app-text-secondary font-mono">{point}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Architectural Flowchart Diagram */}
                    <div className="relative z-10 mt-2">
                      <MilestoneDiagram year={active.year} color={active.color} />
                    </div>

                    {/* Bottom meta */}
                    <div className="relative z-10 flex items-center justify-between pt-4 border-t border-app-border mt-auto">
                      <span className="text-[9px] font-mono text-app-text-muted uppercase tracking-widest">
                        Milestone / {active.year}
                      </span>
                      <span
                        className="text-[9px] font-mono font-bold uppercase tracking-widest opacity-60"
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
