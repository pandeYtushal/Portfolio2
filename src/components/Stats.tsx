import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Briefcase, Bot, Cpu, GitCommit } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/motion";

interface CounterProps {
  value: number;
  suffix?: string;
}

const Counter = ({ value, suffix = "" }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString() + suffix);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return () => {};

    const controls = animate(motionValue, value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [isInView, motionValue, value]);

  return <motion.span ref={ref} className="font-mono">{rounded}</motion.span>;
};

const STATS_ITEMS = [
  { value: 8, suffix: "+", label: "Production Projects", icon: Briefcase },
  { value: 24500, suffix: "+", label: "Completed Automations", icon: Bot },
  { value: 12, suffix: "", label: "AI Models Integrated", icon: Cpu },
  { value: 1840, suffix: "+", label: "GitHub Commits", icon: GitCommit },
];

export const Stats = () => {
  return (
    <section className="section-container border-t border-app-border bg-app-bg/50 backdrop-blur-sm relative overflow-hidden">
      {/* Blurred background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-app-accent/5 blur-[120px] pointer-events-none z-0" />

      <motion.div
        variants={staggerContainer(0.06, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
      >
        {STATS_ITEMS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="group flex flex-col items-center text-center p-6 md:p-8 border border-app-border/40 bg-app-surface/20 rounded-2xl backdrop-blur-md hover:border-app-accent/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-app-accent/20 bg-app-accent/5 mb-5 group-hover:bg-app-accent/10 transition-colors duration-300">
                <Icon className="h-5 w-5 text-app-accent" />
              </div>

              {/* Counter */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-app-text-primary">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>

              {/* Orange accent line */}
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#ff8a00] to-[#ffb347] rounded-full my-3 opacity-60 group-hover:w-12 group-hover:opacity-100 transition-all duration-500" />

              {/* Label */}
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-app-text-muted">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Stats;
