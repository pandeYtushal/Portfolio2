import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { MILESTONES } from "../data/milestones";

const ScrubbingText = ({ text, progress }: { text: string; progress: MotionValue<number> }) => {
  const words = text.split(" ");
  return (
    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight flex flex-wrap gap-x-2 sm:gap-x-3 md:gap-x-4">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(progress, [start, end], [0.1, 1]);
        return (
          <span key={i} className="relative">
            <span className="absolute opacity-10">{word}</span>
            <motion.span style={{ opacity }}>{word}</motion.span>
          </span>
        );
      })}
    </p>
  );
};

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: portraitProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(portraitProgress, [0, 1], [100, -100]);

  const { scrollYProgress: textProgress } = useScroll({
    target: textRef,
    offset: ["start 80%", "end 60%"],
  });

  return (
    <section
      ref={containerRef}
      id="about"
      className="bg-app-bg py-16 md:py-32 overflow-hidden relative"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 flex flex-col gap-16 md:gap-[10vw]">

        {/* Scroll Scrubbing Text */}
        <div ref={textRef} className="w-full max-w-5xl mx-auto py-12">
          <span className="text-sm font-semibold text-app-text-secondary uppercase tracking-widest mb-12 block">
            The Ethos
          </span>
          <ScrubbingText 
            text="I am a full-stack engineer and designer obsessed with creating systems that feel organic, fast, and beautiful. My foundation in decentralized architecture taught me deterministic logic, but my passion lies in crafting user interfaces that feel truly alive." 
            progress={textProgress} 
          />
        </div>

        {/* Header & Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <motion.div style={{ y }} className="relative w-[85%] sm:w-[70%] lg:w-full max-h-[60vh] lg:max-h-none aspect-[4/5] rounded-3xl overflow-hidden bg-app-surface-secondary">
              <img
                src="/avtar.png"
                alt="Tushal Pandey"
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 border border-app-border/20 rounded-3xl pointer-events-none" />
            </motion.div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-16">
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-app-text-primary">
                Engineering <br className="hidden lg:block" />
                the abstract.
              </h2>
              <p className="text-lg text-app-text-secondary leading-relaxed max-w-lg">
                Currently pursuing a B.E. in Computer Science at Chandigarh University, I spend my time architecting highly reliable web applications, building intelligent AI agents, and obsessing over fluid typography and physics-based motion.
              </p>
            </div>

            {/* Milestones */}
            <div className="flex flex-col gap-10 border-t border-app-border/30 pt-10">
              <h3 className="text-sm font-bold text-app-text-secondary uppercase tracking-widest">Selected Milestones</h3>
              
              <div className="flex flex-col gap-6">
                {MILESTONES.map((m) => (
                  <div key={m.year} className="group flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8 pb-6 border-b border-app-border/20 last:border-0 hover:pl-4 transition-all duration-300">
                    <span className="text-xl sm:text-2xl font-bold text-app-text-muted group-hover:text-app-text-primary transition-colors min-w-[5rem]">{m.year}</span>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-lg sm:text-xl font-bold text-app-text-primary">{m.title}</h4>
                      <span className="text-sm font-medium text-app-text-secondary">{m.subtitle}</span>
                    </div>
                    <span className="sm:ml-auto mt-2 sm:mt-0 px-3 py-1 bg-app-surface border border-app-border/40 rounded-full text-xs font-bold uppercase tracking-widest text-app-text-secondary w-fit group-hover:bg-app-text-primary group-hover:text-app-bg transition-colors">
                      {m.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
