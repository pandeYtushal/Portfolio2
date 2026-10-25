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

export const About = () => {
  return (
    <section id="about" className="relative py-20 sm:py-28 md:py-40 px-5 sm:px-8 md:px-12 text-app-text-primary z-10">

      <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-20">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="flex items-center gap-6"
        >
          <motion.span custom={0} variants={fadeUp} className="font-mono text-sm tracking-widest font-bold text-app-text-primary">01</motion.span>
          <motion.span custom={1} variants={fadeUp} className="font-sans text-xs uppercase tracking-widest font-semibold text-app-text-primary">The Person &mdash; The Roots</motion.span>
          <motion.div custom={2} variants={fadeUp} className="h-[1px] flex-1 bg-app-border/70 ml-4" />
        </motion.div>

        {/* Headline — bold editorial title directly over the open landscape */}
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.08] tracking-tight max-w-4xl drop-shadow-[0_2px_15px_rgba(244,244,240,0.7)]"
        >
          "I'D RATHER QUESTION THE OBVIOUS THAN PERFECT THE ORDINARY."
        </motion.h2>

        {/* Narrative & Profile — open editorial columns with NO enclosing card box */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 border-t border-app-border/70 pt-10 items-start"
        >
          {/* Left Column: Portrait & Details */}
          <motion.div custom={0} variants={fadeUp} className="md:col-span-4 flex flex-col gap-6">
            <div className="aspect-[3/4] bg-app-surface-secondary/80 border border-app-border/60 overflow-hidden rounded-lg shadow-md max-w-[280px]">
              <img 
                src="/avtar.png" 
                alt="Tushal Pandey" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100" 
              />
            </div>
            <div className="font-mono text-xs text-app-text-secondary uppercase tracking-widest leading-relaxed">
              Based in India <br/>
              Computer Science Engineer <br/>
              Building across disciplines
            </div>
          </motion.div>

          {/* Right Column: Narrative paragraphs breathing over the landscape */}
          <motion.div 
            custom={1} variants={fadeUp}
            className="md:col-span-8 font-sans text-base sm:text-lg md:text-xl text-app-text-secondary leading-relaxed flex flex-col gap-6"
          >
            <p>
              I've never been particularly interested in making things simply because that's how they've always been made.
            </p>
            <p>
              My background in Computer Science Engineering taught me how to think systematically, breaking down complex problems, optimizing algorithms, and architecting scalable databases. But engineering alone isn't enough if the end experience feels rigid.
            </p>
            <p>
              I'm drawn to the details that change the whole experience. The interface that feels inevitable only after someone has thought hard enough about it. The interaction that makes you pause. The system architecture that effortlessly supports a beautiful frontend.
            </p>
            <p>
              I move between design, code, experiments, and systems engineering because I don't think interesting ideas respect professional boundaries.
            </p>
            <p className="font-medium text-app-text-primary mt-2">
              I'd rather make something with a perspective, backed by rigorous engineering, than something that merely looks correct.
            </p>
          </motion.div>

        </motion.div>

        {/* Seamless trail connector: About -> Engineering */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 border-t border-app-border/60 pt-6 mt-4"
        >
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-app-text-secondary font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-app-text-primary/70" />
            <span>01 / 06 The Roots Completed</span>
          </div>
          <a 
            href="#engineering"
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-app-text-secondary font-semibold hover:text-app-text-primary transition-colors"
          >
            <span>Proceed to 02 The Craft</span>
            <span className="group-hover:translate-y-0.5 transition-transform">&darr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
