import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export const Manifesto = () => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.45], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.45], [16, 0]);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative min-h-[75vh] flex flex-col justify-center items-center bg-app-bg px-6 py-36 text-center select-none border-t border-app-border/40"
    >
      <motion.div
        style={shouldReduce ? undefined : { opacity, y }}
        className="max-w-4xl flex flex-col items-center gap-3 sm:gap-5"
      >
        <p className="text-3xl sm:text-5xl md:text-6xl font-sans font-light tracking-tight text-app-text-primary uppercase leading-tight">
          I BUILD SYSTEMS
        </p>
        <p className="text-3xl sm:text-5xl md:text-6xl font-sans font-light tracking-tight text-app-text-primary uppercase leading-tight">
          THAT TURN COMPLEXITY
        </p>
        <p className="text-3xl sm:text-5xl md:text-6xl font-sans font-medium tracking-tight text-app-accent uppercase leading-tight">
          INTO SOMETHING
        </p>
        <p className="text-3xl sm:text-5xl md:text-6xl font-sans font-light tracking-tight text-app-text-primary uppercase leading-tight">
          PEOPLE CAN TRUST.
        </p>
      </motion.div>
    </section>
  );
};

export default Manifesto;
