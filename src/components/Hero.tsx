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
    <div className="relative w-[280px] md:w-[320px] border border-app-accent/20 bg-app-surface/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(255,138,0,0.08)]">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#c8841a] via-[#e8a020] to-[#c8841a]" />

      {/* Avatar image area */}
      <div className="relative h-48 bg-gradient-to-b from-app-surface to-app-bg overflow-hidden">
        <img
          src="/avtar.png"
          alt="Tushal Pandey"
          className="w-full h-full object-cover object-top opacity-90 transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Avatar fallback overlay with initials */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-app-bg/60">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-lg font-black tracking-tight text-white">Tushal Pandey</div>
          </div>
        </div>
      </div>

      {/* Card body stats */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs text-app-text-muted">
          <MapPin className="h-3.5 w-3.5 text-[#e8a020]" />
          <span>India · Open to Remote</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-app-text-muted">
          <Code2 className="h-3.5 w-3.5 text-[#e8a020]" />
          <span>3+ years building</span>
        </div>

        {/* Status pill */}
        <div className="flex items-center gap-2 pt-1">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
            Available for Work
          </span>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-3 right-3 text-[10px] font-mono text-app-accent/40">&#9651;</div>
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

  const headlineWords = "Building Autonomous AI Systems That Actually Execute.".split(" ");

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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* LEFT — Main content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Subtitle pills */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6"
            ></motion.div>

            {/* Typing Role Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-4 h-7 flex items-center justify-center lg:justify-start"
            >
              <span className="font-mono text-sm text-app-accent tracking-wide">
                {typingText}
              </span>
              <span className="ml-0.5 inline-block w-[2px] h-5 bg-app-accent animate-pulse" />
            </motion.div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[72px] font-extrabold tracking-[-0.04em] leading-[1.02] text-app-text-primary max-w-2xl">
              {headlineWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-1 mr-2 lg:mr-3">
                  <motion.span
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 55, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      ease: easeOut,
                      delay: idx * 0.05,
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
              className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start z-20"
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
