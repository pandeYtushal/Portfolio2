import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 z-10 pt-36"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-12 md:gap-20">
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-serif font-medium leading-[0.95] text-app-text-primary tracking-tight max-w-[90%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            I DON'T MAKE
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-app-text-secondary italic font-normal"
          >
            THINGS TO FILL
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            A SCREEN.
          </motion.div>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 border-t border-app-border/70 pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-xl font-sans text-base md:text-lg leading-relaxed text-app-text-secondary"
          >
            <p className="mb-4">
              I make them because something about the way things are could be more interesting. As a Computer Science Engineer, I use code to build systems, interactions, and ideas that actually work—not just things that look correct.
            </p>
            <p>
              I'm interested in what happens when technical rigor meets creative intention — and a concept becomes something you can actually experience.
            </p>
            <p className="mt-8 font-mono text-xs font-semibold tracking-widest text-app-text-primary uppercase">
              LESS NOISE. MORE NERVE.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col gap-4 font-sans text-sm font-semibold tracking-widest uppercase"
          >
            <a 
              href="#projects" 
              className="group flex items-center gap-3 text-app-text-primary hover:text-amber-800 transition-colors"
            >
              <span>Explore the work</span>
              <span className="block w-6 h-[1.5px] bg-app-text-primary group-hover:w-10 transition-all duration-300" />
            </a>
            <Link 
              to="/resume" 
              className="group flex items-center gap-3 text-app-text-secondary hover:text-app-text-primary transition-colors"
            >
              <span>Resume</span>
              <span className="block w-6 h-[1.5px] bg-app-text-secondary group-hover:bg-app-text-primary group-hover:w-10 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Seamless trail connector leading from Home into About */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 border-t border-app-border/60 pt-6"
        >
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-app-text-primary font-semibold whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
            <span>Prologue &mdash; The Overlook</span>
          </div>
          <a 
            href="#about"
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-app-text-secondary font-semibold hover:text-app-text-primary transition-colors whitespace-nowrap"
          >
            <span>Follow the path to The Roots</span>
            <span className="group-hover:translate-y-0.5 transition-transform">&darr;</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
