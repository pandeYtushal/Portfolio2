import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Cpu, Download, Mail, Play, CheckCircle, Sparkles, Terminal, ArrowRight } from "lucide-react";
import ResumeModal from "./ResumeModal";

const CYCLING_ROLES = ["AI Agent architectures.", "full stack applications.", "autonomous systems."];

const Hero = ({ theme }) => {
  const [showResume, setShowResume] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);

  // Motion values for tracking cursor positions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Cycling Typewriter Effect
  useEffect(() => {
    let timer;
    const fullText = CYCLING_ROLES[roleIndex];
    const speed = isDeleting ? 20 : 50;

    if (!isDeleting && currentText === fullText) {
      // Wait at the end of typing before deleting
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % CYCLING_ROLES.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="home"
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-white text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white pt-24 md:pt-32"
    >
      {/* 1. Animated Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-80 dark:opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] animate-[grid-sweep_20s_linear_infinite]" />

      {/* 2. Interactive Cursor Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 dark:opacity-50"
        style={{
          background: `radial-gradient(350px circle at ${springX}px ${springY}px, rgba(200,200,200,0.15), transparent 80%)`,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
        style={{
          background: `radial-gradient(280px circle at ${springX}px ${springY}px, rgba(255,255,255,0.04), transparent 85%)`,
        }}
      />

      {/* 3. Subtle Moving Light Beam */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-zinc-200/20 dark:bg-zinc-800/10 blur-[120px] pointer-events-none animate-beam z-0" />

      {/* Main Container */}
      <div className="container relative z-10 mx-auto max-w-6xl px-6 flex flex-col items-center text-center">
        
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-[10px] font-semibold tracking-wide text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 backdrop-blur-sm shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Roles</span>
          </div>
        </motion.div>

        {/* Headline Reveal */}
        <div className="max-w-4xl space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-zinc-900 dark:text-white leading-[1.15]"
          >
            Building Intelligent Products <br className="hidden md:inline" />
            with AI, Full Stack Engineering <br className="hidden md:inline" />
            and Modern Web Technologies.
          </motion.h1>
          
          {/* Subheading + Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto min-h-[50px] pt-2"
          >
            <span>I construct optimized developer products and </span>
            <span className="font-mono text-zinc-800 dark:text-zinc-200 border-r-2 border-zinc-400 dark:border-zinc-600 pr-1 animate-pulse">
              {currentText}
            </span>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            onClick={() => setShowResume(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 shadow-sm"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </button>
        </motion.div>

        {/* Floating UI cards simulation (Left & Right desktop only) */}

      </div>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </section>
  );
};

export default Hero;
