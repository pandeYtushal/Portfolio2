import React from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export const Contact = () => {
  return (
    <section id="contact" className="relative py-20 sm:py-28 md:py-40 px-5 sm:px-8 md:px-12 text-app-text-primary z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-14 md:gap-20">

        {/* Section Header */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="flex items-center gap-6"
        >
          <motion.span custom={0} variants={fadeUp} className="font-mono text-sm tracking-widest font-bold text-app-text-primary">06</motion.span>
          <motion.span custom={1} variants={fadeUp} className="font-sans text-xs uppercase tracking-widest font-semibold text-app-text-primary">The Exit &mdash; The Next Chapter</motion.span>
          <motion.div custom={2} variants={fadeUp} className="h-[1px] flex-1 bg-app-border/70 ml-4" />
        </motion.div>

        {/* Open Editorial Layout: No enclosing card box */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 border-t border-app-border/70 pt-10 items-start"
        >
          <motion.div custom={0} variants={fadeUp} className="md:col-span-7 flex flex-col gap-6">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-medium leading-[1.08] tracking-tight drop-shadow-[0_2px_20px_rgba(244,244,240,0.7)]">
              "ANYWAY. ENOUGH ABOUT THE WEBSITE."
            </h2>
            <div className="font-sans text-base sm:text-lg md:text-xl text-app-text-secondary leading-relaxed flex flex-col gap-4 max-w-xl">
              <p>
                Have an interesting problem, an unusual idea, or something worth making? I'd rather talk about that.
              </p>
              <p className="font-medium text-app-text-primary">
                No elaborate pitch. Just tell me what you're thinking.
              </p>
            </div>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} className="md:col-span-5 flex flex-col items-start gap-8">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:tushalanand4@gmail.com"
              className="group inline-flex items-center justify-center gap-4 bg-app-text-primary text-app-surface px-8 py-5 text-sm font-bold tracking-widest uppercase transition-all shadow-md hover:shadow-amber-500/20 rounded-sm"
            >
              <span>Get In Touch</span>
              <span className="block w-2 h-2 rounded-full bg-amber-400 group-hover:scale-150 transition-transform" />
            </motion.a>

            <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-widest text-app-text-secondary mt-4 w-full">
              <span className="mb-2 border-b border-app-border/80 pb-2 inline-block font-bold text-app-text-primary">Directory</span>
              <a href="https://github.com/pandeYtushal" target="_blank" rel="noreferrer" className="group flex items-center justify-between text-app-text-primary font-semibold hover:text-app-accent transition-colors py-2 border-b border-app-border/60">
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4 text-app-text-primary group-hover:text-app-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <a href="https://www.linkedin.com/in/tushal-anand18/" target="_blank" rel="noreferrer" className="group flex items-center justify-between text-app-text-primary font-semibold hover:text-app-accent transition-colors py-2 border-b border-app-border/60">
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 text-app-text-primary group-hover:text-app-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="group flex items-center justify-between text-app-text-primary font-semibold hover:text-app-accent transition-colors py-2 border-b border-app-border/60">
                <span>X (Twitter)</span>
                <ArrowUpRight className="w-4 h-4 text-app-text-primary group-hover:text-app-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <a href="https://medium.com/@tushalpandey" target="_blank" rel="noreferrer" className="group flex items-center justify-between text-app-text-primary font-semibold hover:text-app-accent transition-colors py-2">
                <span>Medium</span>
                <ArrowUpRight className="w-4 h-4 text-app-text-primary group-hover:text-app-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Journey Completion Trail Connector */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 border-t border-app-border/60 pt-6 mt-4"
        >
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-app-text-secondary font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>06 / 06 Journey Completed</span>
          </div>
          <a 
            href="#home"
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-app-text-secondary font-semibold hover:text-app-text-primary transition-colors"
          >
            <span>Return to Overlook</span>
            <span className="group-hover:-translate-y-0.5 transition-transform">&uarr;</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
