import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import ResumeModal from "./ResumeModal";

// Split text into characters for advanced reveal
const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 24,
        stiffness: 120,
        mass: 1.5,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "inline-block", perspective: "1000px" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-flex overflow-hidden"
    >
      {characters.map((char, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block" }}
          key={index}
          className="origin-bottom"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const Hero = () => {
  const [showResume, setShowResume] = useState(false);
  
  const { scrollY } = useScroll();
  // Move the hero content down slightly as you scroll down
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  // Fade out slightly as it goes behind
  const opacity = useTransform(scrollY, [0, 800], [1, 0.3]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end pb-12 sm:pb-24 bg-transparent overflow-hidden z-10"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hidden md:block absolute top-1/4 -right-1/4 sm:right-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-app-text-primary/5 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 px-4 sm:px-10 md:px-16 w-full flex flex-col items-start text-left max-w-[1600px] mx-auto"
      >
        
        <div className="flex flex-col mb-12 sm:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-app-border/40 bg-app-surface/30 backdrop-blur-sm text-[10px] sm:text-xs font-medium text-app-text-secondary w-fit mb-6 sm:mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for selected missions
          </motion.div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] text-app-text-primary uppercase flex flex-col">
            <div className="overflow-hidden">
              <AnimatedText text="CREATIVE" delay={0.1} />
            </div>
            <div className="overflow-hidden text-app-text-secondary ml-[10vw] sm:ml-[5vw] md:ml-[10vw]">
              <AnimatedText text="ENGINEER" delay={0.3} />
            </div>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-10">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1 }}
            className="max-w-md text-base sm:text-lg text-app-text-muted leading-relaxed font-medium"
          >
            I build modern, high-performance web applications, intelligent agents, and exceptional user experiences. Focused on fluid motion and pixel-perfect design.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1.2 }}
            className="flex items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("projects");
                if (el) {
                  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
                }
              }}
              className="flex-1 sm:flex-none group flex items-center justify-center gap-3 bg-app-text-primary text-app-bg px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all hover:bg-app-text-secondary"
            >
              <span>Explore</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </a>

            <button
              onClick={() => setShowResume(true)}
              className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-app-surface/50 border border-app-border/40 text-app-text-primary rounded-full transition-all hover:bg-app-text-primary hover:text-app-bg"
              aria-label="View Resume"
            >
              <ArrowRight className="w-5 h-5 transition-transform group-hover:-rotate-45" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </section>
  );
};

export default Hero;
