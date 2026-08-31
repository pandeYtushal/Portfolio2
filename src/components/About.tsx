import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Cpu,
  Layers,
  Terminal,
  Award,
  Globe,
  Zap,
  Briefcase,
  GraduationCap,
  BookOpen,
  FlaskConical,
  Code2,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { easeOut } from "../lib/motion";
import { MILESTONES, type MilestoneIconName } from "../data/milestones";

const ICON_MAP: Record<MilestoneIconName, LucideIcon> = {
  Terminal,
  Layers,
  Cpu,
  Award,
};

/* ── Animated large year number ── */
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

/* ── Stat / info pill ── */
const InfoPill = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-app-text-muted">
      {label}
    </span>
    <span className="text-xs font-semibold text-app-text-primary">{value}</span>
  </div>
);

/* ── Achievement badge ── */
interface Achievement {
  icon: LucideIcon;
  color: string;
  label: string;
  sub: string;
}

const AchievementBadge = ({ item, index }: { item: Achievement; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.4, ease: easeOut }}
    className="relative overflow-hidden group transition-all duration-300 border border-app-border bg-app-surface
      /* mobile: portrait card */
      flex flex-col items-center text-center gap-2 p-4 rounded-lg
      /* sm+: landscape row */
      sm:flex-row sm:items-start sm:text-left sm:min-w-[200px] sm:flex-shrink-0"
    style={{ borderColor: `${item.color}20` }}
  >
    {/* ambient glow */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background: `radial-gradient(circle at 50% 0%, ${item.color}12 0%, transparent 70%)`,
      }}
    />

    {/* icon */}
    <div
      className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0 relative z-10 sm:h-7 sm:w-7 sm:rounded"
      style={{ backgroundColor: `${item.color}14`, color: item.color }}
    >
      <item.icon className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
    </div>

    {/* text */}
    <div className="relative z-10 min-w-0">
      <p className="text-xs font-semibold text-app-text-primary leading-tight">{item.label}</p>
      <p className="text-[10px] font-mono text-app-text-muted mt-0.5 leading-relaxed">{item.sub}</p>
    </div>
  </motion.div>
);

/* ── Focus area item ── */
const FOCUS_AREAS = [
  {
    icon: Cpu,
    color: "#f97316",
    title: "Autonomous Systems",
    desc: "Multi-model orchestration, browser control loops, self-healing automation nodes.",
  },
  {
    icon: Globe,
    color: "#6b7280",
    title: "Distributed Networks",
    desc: "Decentralized nodes, blockchain state machines, realtime replication pipelines.",
  },
  {
    icon: Zap,
    color: "#9ca3af",
    title: "High-Performance UI",
    desc: "Route-level cache states, zero-flash views, dynamic client-side layouts.",
  },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    icon: ScrollText,
    color: "#f59e0b",
    label: "Springer Publication",
    sub: "ICICC-2026 · Research Paper",
  },
  {
    icon: Award,
    color: "#10b981",
    label: "NPTEL Certified",
    sub: "IoT · Cloud · Edge ML",
  },
  {
    icon: Code2,
    color: "#6366f1",
    label: "JSProof Certified",
    sub: "Metacrafters · JavaScript",
  },
  {
    icon: FlaskConical,
    color: "#ec4899",
    label: "Research Papers",
    sub: "Blockchain · ZK Cryptography",
  },
];

export const About = () => {
  const [activeIdx, setActiveIdx] = useState(3);
  const active = MILESTONES[activeIdx];
  const ActiveIcon = ICON_MAP[active.iconName];

  return (
    <section id="about" className="border-t border-app-border bg-app-bg">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-24">

        {/* ── Zone 1: Header ── */}
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

        {/* ── Zone 2: Identity Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {/* Bio card */}
          <div className="md:col-span-1 border border-app-border rounded-lg p-5 bg-app-surface flex flex-col gap-3">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-app-text-muted mb-1">
              Background
            </h3>
            <p className="text-[11px] font-mono leading-relaxed text-app-text-secondary">
              Systems builder &amp; software engineer. Started with cryptography and blockchain
              protocols — deep focus on deterministic logic and execution accuracy.
            </p>
            <p className="text-[11px] font-mono leading-relaxed text-app-text-secondary">
              Transitioned into full-stack products specializing in state synchronization,
              browser automation scrapers, and orchestration systems.
            </p>
            <div className="mt-auto pt-3 border-t border-app-border grid grid-cols-2 gap-4">
              <InfoPill label="Based in" value="India" />
              <InfoPill label="Status" value="Open to Work" />
            </div>
          </div>

          {/* Education card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.12 }}
            className="border rounded-lg p-5 bg-app-surface flex flex-col gap-4 relative overflow-hidden"
            style={{ borderColor: "#3b82f620" }}
          >
            <div
              className="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-[60px] pointer-events-none"
              style={{ backgroundColor: "#3b82f6", opacity: 0.05 }}
            />
            <div className="flex items-center gap-2 relative z-10">
              <div
                className="h-7 w-7 rounded flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#3b82f614", color: "#3b82f6" }}
              >
                <GraduationCap className="h-3.5 w-3.5" />
              </div>
              <h3
                className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
                style={{ color: "#3b82f6" }}
              >
                Education
              </h3>
            </div>
            <div className="relative z-10 flex flex-col gap-1.5">
              <p className="text-sm font-black tracking-tight text-app-text-primary leading-tight">
                B.E. Computer Science &amp; Engineering
              </p>
              <p className="text-[11px] font-mono text-app-text-secondary">
                Chandigarh University
              </p>
              <p className="text-[10px] font-mono text-app-text-muted mt-0.5">
                2022 – 2026
              </p>
            </div>
            <div className="mt-auto relative z-10 pt-3 border-t border-app-border flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-3 w-3 text-app-text-muted" />
                <span className="text-[10px] font-mono text-app-text-muted">
                  Mohali, Punjab
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["DSA", "OS", "DBMS", "CN", "AI/ML"].map((course) => (
                  <span
                    key={course}
                    className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wide"
                    style={{ backgroundColor: "#3b82f610", color: "#3b82f6" }}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.2 }}
            className="border rounded-lg p-5 bg-app-surface flex flex-col gap-4 relative overflow-hidden"
            style={{ borderColor: "#f97316" + "20" }}
          >
            <div
              className="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-[60px] pointer-events-none"
              style={{ backgroundColor: "#f97316", opacity: 0.05 }}
            />
            <div className="flex items-center gap-2 relative z-10">
              <div
                className="h-7 w-7 rounded flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#f9731614", color: "#f97316" }}
              >
                <Briefcase className="h-3.5 w-3.5" />
              </div>
              <h3
                className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
                style={{ color: "#f97316" }}
              >
                Experience
              </h3>
            </div>
            <div className="relative z-10 flex flex-col gap-1.5">
              <p className="text-sm font-black tracking-tight text-app-text-primary leading-tight">
                Apprenticeship
              </p>
              <p className="text-[11px] font-mono text-app-text-secondary">
                Metacrafters
              </p>
              <p className="text-[10px] font-mono text-app-text-muted mt-0.5">
                June 2024 – August 2024
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-1.5">
              {[
                "Built JavaScript modules covering async patterns, closures & DOM APIs.",
                "Completed JSProof certification through structured JS curriculum.",
                "Applied core JS fundamentals across real-world project assessments.",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span
                    className="font-mono text-[9px] font-bold shrink-0 mt-[2px]"
                    style={{ color: "#f97316", opacity: 0.5 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[10px] font-mono text-app-text-secondary leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Zone 3: Journey Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
          className="mb-10"
        >
          {/* Section label */}
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-6">
            Journey
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Areas of Focus */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="border border-app-border rounded-lg p-5 bg-app-surface flex flex-col gap-4">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-app-text-muted mb-1">
                  Areas of Focus
                </h4>
                <ul className="space-y-4">
                  {FOCUS_AREAS.map(({ icon: Icon, color, title, desc }) => (
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

            {/* Timeline */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Mobile year tabs */}
              <div className="flex lg:hidden gap-1.5 overflow-x-auto pb-1">
                {MILESTONES.map((stone, idx) => (
                  <button
                    key={stone.year}
                    onClick={() => setActiveIdx(idx)}
                    className="shrink-0 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest rounded-full border transition-all duration-200 cursor-pointer"
                    style={{
                      borderColor: activeIdx === idx ? `${stone.color}40` : "var(--color-app-border)",
                      color: activeIdx === idx ? stone.color : "var(--color-app-text-muted)",
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
                            opacity: activeIdx === idx ? 1 : 0.4,
                            boxShadow: activeIdx === idx ? `0 0 5px ${stone.color}` : "none",
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
        </motion.div>

        {/* ── Zone 4: Achievements Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-6">
            Achievements
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-nowrap sm:overflow-x-auto sm:pb-2 scrollbar-none">
            {ACHIEVEMENTS.map((item, index) => (
              <AchievementBadge key={item.label} item={item} index={index} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
