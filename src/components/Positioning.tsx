import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export const Positioning = () => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const line1Opacity = useTransform(scrollYProgress, [0.05, 0.25], [0.15, 1]);
  const line2Opacity = useTransform(scrollYProgress, [0.25, 0.5], [0.15, 1]);
  const line3Opacity = useTransform(scrollYProgress, [0.5, 0.75], [0.15, 1]);

  const line1Y = useTransform(scrollYProgress, [0.05, 0.25], [24, 0]);
  const line2Y = useTransform(scrollYProgress, [0.25, 0.5], [24, 0]);
  const line3Y = useTransform(scrollYProgress, [0.5, 0.75], [24, 0]);

  return (
    <section
      ref={containerRef}
      id="positioning"
      className="relative min-h-[80vh] flex flex-col justify-center bg-app-bg px-6 py-32 sm:py-44 border-t border-app-border/40 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col items-start gap-12">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted">
          02 / POSITIONING
        </span>

        <div className="flex flex-col gap-6 max-w-4xl">
          <motion.p
            style={shouldReduce ? undefined : { opacity: line1Opacity, y: line1Y }}
            className="text-2xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight leading-snug text-app-text-primary"
          >
            I design autonomous AI agents that navigate web interfaces, execute complex multi-step goals, and heal their own scripts in real time.
          </motion.p>

          <motion.p
            style={shouldReduce ? undefined : { opacity: line2Opacity, y: line2Y }}
            className="text-2xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight leading-snug text-app-accent"
          >
            Turning non-deterministic LLM output into deterministic, low-latency production pipelines.
          </motion.p>

          <motion.p
            style={shouldReduce ? undefined : { opacity: line3Opacity, y: line3Y }}
            className="text-base sm:text-xl font-mono text-app-text-secondary leading-relaxed pt-4"
          >
            From browser automation scrapers to distributed state machines — built with precision, speed, and quiet resilience.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Positioning;
