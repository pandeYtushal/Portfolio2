import { useState, useRef, useEffect } from "react";
import { motion, useSpring, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MILESTONES } from "../data/milestones";

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(3);

  // Controlled 4-8px spring pointer follow physics for portrait artwork
  const springConfig = { stiffness: 140, damping: 24, mass: 0.6 };
  const portraitX = useSpring(0, springConfig);
  const portraitY = useSpring(0, springConfig);

  // Subtle scroll displacement for portrait
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  const combinedPortraitY = useTransform(
    [portraitY, portraitScrollY],
    ([y, sy]) => (y as number) + (sy as number)
  );

  useEffect(() => {
    if (shouldReduce) return;
    const isPointerCapable = window.matchMedia("(hover: hover)").matches;
    if (!isPointerCapable) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!portraitRef.current) return;
      const rect = portraitRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (rect.width / 2);
      const dy = (e.clientY - centerY) / (rect.height / 2);

      portraitX.set(Math.max(-6, Math.min(6, dx * 5)));
      portraitY.set(Math.max(-6, Math.min(6, dy * 5)));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [portraitX, portraitY, shouldReduce]);

  // Slow, subtle scroll animation variants
  const fadeInVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="bg-app-bg px-6 py-28 sm:py-40 overflow-x-hidden border-t border-app-border/40"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-32 sm:gap-44">

        {/* ── SCENE 1: HUMAN INTRODUCTION ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInVariant}
          className="flex flex-col items-start gap-6 max-w-3xl"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-app-text-muted">
            04 / HUMAN
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-normal tracking-tight leading-[1.15] text-app-text-primary">
            I like building things <br className="hidden sm:inline" />
            that become <span className="italic font-serif text-app-accent">quieter</span> the more complex they get.
          </h2>
        </motion.div>

        {/* ── SCENE 2: PORTRAIT MOMENT ── */}
        <motion.div
          ref={portraitRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInVariant}
          className="w-full flex justify-center sm:justify-start"
        >
          <motion.div
            style={
              shouldReduce
                ? undefined
                : { x: portraitX, y: combinedPortraitY }
            }
            className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <img
              src="/avtar.png"
              alt="Tushal Pandey — Personal Portrait"
              className="w-full h-full object-cover grayscale opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
              loading="lazy"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* ── SCENE 3: PERSONAL STORY (3 Moments) ── */}
        <div className="flex flex-col gap-16 sm:gap-24 max-w-2xl">
          
          {/* Moment 1: Origin */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInVariant}
            className="flex flex-col items-start gap-3"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-accent">
              01 / ORIGIN
            </span>
            <p className="text-sm sm:text-base font-mono text-app-text-secondary leading-relaxed">
              My journey began in cryptography and decentralized systems — learning early on that predictability, deterministic logic, and execution accuracy are paramount.
            </p>
          </motion.div>

          {/* Moment 2: Building */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInVariant}
            className="flex flex-col items-start gap-3"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-accent">
              02 / BUILDING
            </span>
            <p className="text-sm sm:text-base font-mono text-app-text-secondary leading-relaxed">
              Over the past 3 years, I transitioned into full-stack architecture, AI agent orchestration, and browser automation nodes — engineering software that absorbs operational complexity behind simple, quiet interfaces.
            </p>
          </motion.div>

          {/* Moment 3: Now */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInVariant}
            className="flex flex-col items-start gap-3"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-accent">
              03 / NOW
            </span>
            <p className="text-sm sm:text-base font-mono text-app-text-secondary leading-relaxed">
              Currently pursuing my B.E. in Computer Science at Chandigarh University (2022–2026), architecting self-healing browser automation tools like Hunter, and writing technical research on decentralized state synchronization.
            </p>
          </motion.div>

        </div>

        {/* ── SCENE 4: EDITORIAL JOURNEY ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInVariant}
          className="flex flex-col gap-12"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-app-text-muted">
            MEMORIES & MILESTONES
          </span>

          <div className="flex flex-col gap-10">
            {MILESTONES.map((m, idx) => {
              const isSelected = activeTimelineIdx === idx;
              return (
                <div
                  key={m.year}
                  onMouseEnter={() => setActiveTimelineIdx(idx)}
                  onClick={() => setActiveTimelineIdx(idx)}
                  className={`group flex flex-col sm:flex-row sm:items-baseline justify-between py-6 border-b border-app-border/40 transition-all duration-500 cursor-pointer ${
                    isSelected ? "opacity-100" : "opacity-45 hover:opacity-80"
                  }`}
                >
                  <div className="flex items-baseline gap-6 sm:gap-12">
                    <span className="text-2xl sm:text-4xl font-mono font-light text-app-text-muted group-hover:text-app-accent transition-colors">
                      {m.year}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-sans font-medium text-app-text-primary">
                        {m.title}
                      </h3>
                      <p className="text-xs font-mono text-app-text-muted mt-1">
                        {m.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-app-accent mt-3 sm:mt-0">
                    {m.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── SCENE 5: WHAT I CARE ABOUT (EDITORIAL LINES) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInVariant}
          className="flex flex-col gap-12"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-app-text-muted">
            WHAT I CARE ABOUT
          </span>

          <div className="flex flex-col gap-8">
            <div className="group flex flex-col gap-2 transition-transform duration-300 hover:translate-x-1">
              <h3 className="text-2xl sm:text-4xl font-sans font-medium text-app-text-primary group-hover:text-app-accent transition-colors">
                DETERMINISTIC EXECUTION
              </h3>
              <p className="text-xs sm:text-sm font-mono text-app-text-secondary max-w-xl">
                Building systems that deliver predictable state synchronization even under edge-case network conditions.
              </p>
            </div>

            <div className="group flex flex-col gap-2 transition-transform duration-300 hover:translate-x-1">
              <h3 className="text-2xl sm:text-4xl font-sans font-medium text-app-text-primary group-hover:text-app-accent transition-colors">
                AUTONOMOUS NODES
              </h3>
              <p className="text-xs sm:text-sm font-mono text-app-text-secondary max-w-xl">
                Creating self-healing control loops that recover gracefully without human intervention.
              </p>
            </div>

            <div className="group flex flex-col gap-2 transition-transform duration-300 hover:translate-x-1">
              <h3 className="text-2xl sm:text-4xl font-sans font-medium text-app-text-primary group-hover:text-app-accent transition-colors">
                QUIET INTERACTION
              </h3>
              <p className="text-xs sm:text-sm font-mono text-app-text-secondary max-w-xl">
                Designing interfaces that respect human focus through restrained motion, breathing space, and physical feedback.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── SCENE 6: CLOSING ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInVariant}
          className="pt-12 flex flex-col items-start gap-4 border-t border-app-border/30"
        >
          <p className="text-2xl sm:text-3xl font-sans italic text-app-text-secondary leading-snug">
            Still learning. <br />
            Still building. <br />
            Still curious.
          </p>
          <span className="text-xs font-mono text-app-text-muted uppercase tracking-widest pt-2">
            TUSHAL PANDEY · 2026
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
