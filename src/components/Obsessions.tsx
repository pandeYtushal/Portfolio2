import React from "react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export const Obsessions = () => {
  return (
    <section id="obsessions" className="relative py-28 md:py-40 px-6 md:px-12 text-app-text-primary z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-14 md:gap-20">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="flex items-center gap-6"
        >
          <motion.span custom={0} variants={fadeUp} className="font-mono text-sm tracking-widest font-bold text-app-text-primary">04</motion.span>
          <motion.span custom={1} variants={fadeUp} className="font-sans text-xs uppercase tracking-widest font-semibold text-app-text-primary">The Obsessions &mdash; The Reflection</motion.span>
          <motion.div custom={2} variants={fadeUp} className="h-[1px] flex-1 bg-app-border/70 ml-4" />
        </motion.div>

        {/* Open Editorial Layout: No enclosing card box */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 border-t border-app-border/70 pt-10 items-start"
        >
          <motion.div custom={0} variants={fadeUp} className="md:col-span-5 flex flex-col gap-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tight drop-shadow-[0_2px_15px_rgba(244,244,240,0.7)]">
              "SMALL DETAILS. UNREASONABLE ATTENTION."
            </h2>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} className="md:col-span-7 flex flex-col gap-10">
            <div className="font-sans text-base sm:text-lg md:text-xl text-app-text-secondary leading-relaxed flex flex-col gap-6">
              <p>
                The weight of a typeface. The timing of an animation. The difference between a transition that feels smooth and one that feels right.
              </p>
              <p>
                The way a product responds when something goes wrong.
              </p>
              <p>
                The things people might never consciously notice, but would miss if they disappeared.
              </p>
              <p>
                I pay attention to these things because the overall experience is often hiding in the details.
              </p>
              <p className="font-medium text-app-text-primary mt-2">
                Not every detail needs to be loud. Every detail needs a reason.
              </p>
            </div>

            {/* Interactive specimens — lightweight swatches */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="border border-app-border/80 p-6 flex flex-col gap-4 bg-app-surface-secondary/70 rounded-xl group cursor-crosshair shadow-sm"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-app-text-primary font-bold">Specimen 01 &mdash; Typography</span>
                <div className="text-4xl font-serif leading-none group-hover:italic transition-all duration-500">
                  Aa
                </div>
                <p className="font-sans text-xs text-app-text-secondary font-medium">
                  Testing the tension between legibility and expression.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="border border-app-border/80 p-6 flex flex-col gap-4 bg-app-surface-secondary/70 rounded-xl group cursor-crosshair shadow-sm"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-app-text-primary font-bold">Specimen 02 &mdash; Motion</span>
                <div className="h-10 flex items-center">
                  <div className="w-4 h-4 bg-app-text-primary rounded-full group-hover:w-full group-hover:rounded-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </div>
                <p className="font-sans text-xs text-app-text-secondary font-medium">
                  Spring physics. Fast entrance, highly damped exit.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Obsessions;
