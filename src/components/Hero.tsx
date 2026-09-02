import { useState, useRef, useEffect } from "react";
import { motion, useSpring, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ResumeModal from "./ResumeModal";

export const Hero = () => {
  const [showResume, setShowResume] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  // Controlled 4-8px spring pointer follow physics for portrait artwork
  const springConfig = { stiffness: 150, damping: 22, mass: 0.5 };
  const portraitX = useSpring(0, springConfig);
  const portraitY = useSpring(0, springConfig);

  // Scroll dynamics for portrait (subtle position shift on scroll)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  // Combined vertical translation for pointer follow + scroll dynamics
  const combinedPortraitY = useTransform(
    [portraitY, portraitScrollY],
    ([y, sy]) => (y as number) + (sy as number)
  );

  useEffect(() => {
    if (shouldReduce) return;

    // Only enable mouse follow physics on desktop pointer devices
    const isPointerCapable = window.matchMedia("(hover: hover)").matches;
    if (!isPointerCapable) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (rect.width / 2);
      const dy = (e.clientY - centerY) / (rect.height / 2);

      // Strictly bounded 4-8px physical movement
      portraitX.set(Math.max(-8, Math.min(8, dx * 6)));
      portraitY.set(Math.max(-8, Math.min(8, dy * 6)));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [portraitX, portraitY, shouldReduce]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center bg-app-bg px-6 pt-24 sm:pt-28 pb-16 overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Primary Typographic Headline Area */}
          <div className="order-1 lg:order-none lg:col-span-7 lg:row-start-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-app-text-muted block mb-3">
              01 / SYSTEM ARCHITECT & FULL-STACK
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-medium tracking-tight uppercase leading-[0.93] text-app-text-primary"
            >
              I BUILD <br />
              <span className="text-app-accent font-semibold">AUTONOMOUS SYSTEMS.</span>
            </motion.h1>
          </div>

          {/* Integrated Portrait Artwork (Asymmetric Desktop Placement) */}
          <motion.div
            style={
              shouldReduce
                ? undefined
                : { x: portraitX, y: combinedPortraitY, scale: portraitScale }
            }
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-2 relative w-full flex justify-center lg:justify-end my-4 lg:my-0"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/70">
              <img
                src="/avtar.png"
                alt="Tushal Pandey"
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                loading="eager"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Supporting Statement & Subordinate Actions (Anchoring Lower Region) */}
          <div className="order-3 lg:order-none lg:col-span-7 lg:row-start-2 flex flex-col gap-6 max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-xs sm:text-sm font-mono text-app-text-secondary leading-relaxed"
            >
              Full-stack engineer crafting autonomous AI browser agents, self-healing control loops, and production web applications with deterministic precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center gap-8 pt-2"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-app-text-primary hover:text-app-accent border-b border-app-text-primary/40 hover:border-app-accent pb-1 transition-all"
              >
                <span>EXPLORE WORK</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>

              <button
                onClick={() => setShowResume(true)}
                className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-app-text-muted hover:text-app-text-primary border-b border-transparent hover:border-app-text-muted pb-1 transition-all cursor-pointer"
              >
                RESUME
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </section>
  );
};

export default Hero;
