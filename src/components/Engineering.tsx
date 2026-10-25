import React from "react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const skillReveal: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export const Engineering = () => {
  const categories = [
    {
      title: "Core / Languages",
      skills: ["TypeScript", "JavaScript", "Python", "C/C++", "SQL"]
    },
    {
      title: "Frontend / Frameworks",
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Backend / Databases",
      skills: ["Node.js", "MongoDB", "PostgreSQL", "Firebase"]
    },
    {
      title: "Tools / Platforms",
      skills: ["Git", "GitHub", "AWS", "Vercel", "Figma"]
    }
  ];

  return (
    <section id="engineering" className="relative py-20 sm:py-28 md:py-40 px-5 sm:px-8 md:px-12 text-app-text-primary z-10">

      <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-20">

        {/* Section Header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="flex items-center gap-6"
        >
          <motion.span custom={0} variants={fadeUp} className="font-mono text-sm tracking-widest font-bold text-app-text-primary">02</motion.span>
          <motion.span custom={1} variants={fadeUp} className="font-sans text-xs uppercase tracking-widest font-semibold text-app-text-primary">Engineering & Skills &mdash; The Craft</motion.span>
          <motion.div custom={2} variants={fadeUp} className="h-[1px] flex-1 bg-app-border/70 ml-4" />
        </motion.div>

        {/* Open Editorial Layout: No enclosing card box */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 border-t border-app-border/70 pt-10 items-start"
        >
          <motion.div custom={0} variants={fadeUp} className="md:col-span-5 flex flex-col gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-4xl sm:text-5xl font-serif font-medium leading-[1.1] tracking-tight drop-shadow-[0_2px_15px_rgba(244,244,240,0.7)]"
            >
              IMPLEMENTATION MATTERS.
            </motion.h2>
            <p className="font-sans text-base sm:text-lg text-app-text-secondary leading-relaxed">
              An idea is only as good as its execution. My Computer Science background provides the technical foundation to build robust, scalable systems that bring these concepts to life. I organize my toolkit by function, prioritizing depth and utility.
            </p>
          </motion.div>

          <div className="md:col-span-7 flex flex-col gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              {categories.map((category, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={staggerContainer}
                >
                  <motion.h3
                    variants={skillReveal}
                    className="font-mono text-xs text-app-text-primary uppercase tracking-widest border-b border-app-border/80 pb-2 font-semibold"
                  >
                    {category.title}
                  </motion.h3>
                  <ul className="flex flex-col gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <motion.li
                        key={sIdx}
                        variants={skillReveal}
                        className="font-sans text-base md:text-lg text-app-text-secondary hover:text-app-text-primary hover:translate-x-2 font-medium transition-all duration-300"
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Seamless trail connector: Engineering -> Projects */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 border-t border-app-border/60 pt-6 mt-4"
        >
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-app-text-secondary font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-app-text-primary/70" />
            <span>02 / 06 The Craft Completed</span>
          </div>
          <a 
            href="#projects"
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-app-text-secondary font-semibold hover:text-app-text-primary transition-colors"
          >
            <span>Proceed to 03 Selected Work</span>
            <span className="group-hover:translate-y-0.5 transition-transform">&darr;</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Engineering;
