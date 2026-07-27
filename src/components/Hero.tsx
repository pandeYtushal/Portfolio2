import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { Download, ArrowRight, MapPin, Code2 } from "lucide-react";
import ResumeModal from "./ResumeModal";
import { easeOut } from "../lib/motion";
import Magnetic from "./ui/Magnetic";
import CursorSpotlight from "./CursorSpotlight";

const TYPING_ROLES = [
  "AI Agent Developer",
  "Browser Automation Engineer",
  "Full Stack Builder",
  "System Architect",
];

// 3D Tilt Avatar Card
const AvatarCard = () => {
  return (
    <div className="relative w-[280px] md:w-[320px] bg-app-surface/60 backdrop-blur-md rounded-2xl border border-app-border p-3 pb-4 shadow-[0_20px_80px_rgba(0,0,0,0.4)] flex flex-col gap-4">
      {/* Photo Container with corner brackets */}
      <div className="relative p-1.5">
        {/* Retro Focus Brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/60" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/60" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/60" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/60" />

        {/* Photo Image Wrapper */}
        <div className="relative overflow-hidden rounded-xl bg-zinc-950 border border-white/5 aspect-[723/651]">
          <img
            src="/avtar.png"
            alt="Tushal Pandey"
            className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-[1.02]"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          {/* Name tag inside photo */}
          <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono tracking-wider text-white/80 border border-white/5">
            Tushal Pandey
          </div>
        </div>
      </div>

      {/* Card body stats */}
      <div className="space-y-3 px-1">
        <div className="flex items-center gap-2.5 text-xs text-app-text-secondary font-mono">
          <MapPin className="h-3.5 w-3.5 text-[#e8a020]" />
          <span>India · Open to Work</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-app-text-secondary font-mono">
          <Code2 className="h-3.5 w-3.5 text-[#e8a020]" />
          <span>3+ years building</span>
        </div>

        {/* Status pill */}
        <div className="flex items-center gap-2 pt-1">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
            Available for Work
          </span>
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const [showResume, setShowResume] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  // Typing animation effect
  useEffect(() => {
    const currentRole = TYPING_ROLES[roleIdx];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && typingText === currentRole) {
      const pause = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(pause);
    }

    if (isDeleting && typingText === "") {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % TYPING_ROLES.length);
      return () => { };
    }

    const timeout = setTimeout(() => {
      setTypingText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentRole.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, roleIdx]);

  const headlineLines = [
    "BUILDING AUTONOMOUS",
    "AI SYSTEMS THAT",
    "ACTUALLY EXECUTE."
  ];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-app-bg pt-[100px] pb-[80px]"
    >
      {/* Background spotlight */}
      <CursorSpotlight />

      {/* Subtle Grid Background */}
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 0.3 : heroOpacity,
          scale: shouldReduceMotion ? 1 : heroScale,
        }}
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none"
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-6">

        {/* Two-column layout: left = text, right = avatar card */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">

          {/* LEFT — Main content */}
          <div className="flex-1 flex flex-col items-start text-left w-full">

            {/* Subtitle pills */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="flex flex-wrap items-center justify-start gap-2.5 mb-6"
            >
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted">
                00 / HOME
              </p>
            </motion.div>

            {/* Typing Role Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-4 h-7 flex items-center justify-start"
            >
              <span className="font-mono text-sm text-app-accent tracking-wide">
                {typingText}
              </span>
              <span className="ml-0.5 inline-block w-[2px] h-5 bg-app-accent animate-pulse" />
            </motion.div>

            {/* Desktop Headline (sm and up) */}
            <h1 className="hidden sm:block text-3xl sm:text-5xl lg:text-[72px] font-extrabold tracking-[-0.04em] leading-[1.02] text-app-text-primary max-w-3xl">
              {headlineLines.map((line, lineIdx) => (
                <span key={lineIdx} className="block overflow-hidden py-1">
                  {line.split(" ").map((word, wordIdx) => (
                    <span key={wordIdx} className="inline-block overflow-hidden mr-2 lg:mr-3">
                      <motion.span
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 55, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                          duration: 0.6,
                          ease: easeOut,
                          delay: (lineIdx * 3 + wordIdx) * 0.05,
                        }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Mobile Headline (below sm) */}
            <h1 className="block sm:hidden text-4xl font-extrabold tracking-[-0.04em] leading-[1.1] text-app-text-primary max-w-xl">
              {"BUILDING AUTONOMOUS AI SYSTEMS THAT ACTUALLY EXECUTE.".split(" ").map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-0.5 mr-1.5">
                  <motion.span
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.5,
                      ease: easeOut,
                      delay: idx * 0.04,
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6 text-sm md:text-base leading-relaxed text-app-text-secondary max-w-md"
            >
              Turning complex workflows into self-healing autonomous systems. Specializing in AI agents, browser automation, and full-stack products.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5, ease: easeOut }}
              className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-start z-20 w-full"
            >
              <Magnetic>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex h-12 items-center justify-center gap-2 border-2 border-[#e8a020] bg-black px-8 text-xs font-bold uppercase tracking-[0.15em] text-[#e8a020] hover:bg-[#e8a020] hover:text-black transition-all duration-300 active:scale-95"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>

              <Magnetic>
                <button
                  onClick={() => setShowResume(true)}
                  className="flex h-12 items-center justify-center gap-2 border-2 border-app-border bg-transparent px-8 text-xs font-bold uppercase tracking-[0.15em] text-app-text-secondary hover:border-app-accent hover:text-app-accent transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Resume</span>
                </button>
              </Magnetic>
            </motion.div>
          </div>

          {/* RIGHT — Avatar card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: easeOut }}
            className="flex-shrink-0"
          >
            <AvatarCard />
          </motion.div>
        </div>

      </div>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </section>
  );
};

export default Hero;
