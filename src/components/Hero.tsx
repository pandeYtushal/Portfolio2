import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

const AvatarCard = () => (
  <div className="w-[240px] shrink-0">
    <div className="relative overflow-hidden rounded-xl border border-app-border bg-app-surface-secondary aspect-[3/4]">
      <img
        src="/avtar.png"
        alt="Tushal Pandey"
        className="w-full h-full object-cover"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>

    <div className="mt-3 flex flex-col gap-1.5 pl-0.5">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-app-text-muted">
        <MapPin className="h-2.5 w-2.5 shrink-0" />
        <span>India · Open to Work</span>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-app-text-muted">
        <Code2 className="h-2.5 w-2.5 shrink-0" />
        <span>3+ years building</span>
      </div>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">Available</span>
      </div>
    </div>
  </div>
);

export const Hero = () => {
  const [showResume, setShowResume]   = useState(false);
  const [typingText, setTypingText]   = useState("");
  const [roleIdx,    setRoleIdx]      = useState(0);
  const [isDeleting, setIsDeleting]   = useState(false);
  const shouldReduceMotion            = useReducedMotion();

  /* Typewriter effect */
  useEffect(() => {
    const current = TYPING_ROLES[roleIdx];
    const speed   = isDeleting ? 40 : 75;

    if (!isDeleting && typingText === current) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (isDeleting && typingText === "") {
      setIsDeleting(false);
      setRoleIdx((p) => (p + 1) % TYPING_ROLES.length);
      return;
    }

    const t = setTimeout(() => {
      setTypingText((p) =>
        isDeleting ? p.slice(0, -1) : current.slice(0, p.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [typingText, isDeleting, roleIdx]);

  const headline = ["BUILDING", "AUTONOMOUS", "SYSTEMS."];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-app-bg">
      <CursorSpotlight />

      <div
        className="absolute inset-0 pointer-events-none z-0 dark:block hidden"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl w-full px-6 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-14 lg:gap-20">

          <div className="flex-1 flex flex-col items-start min-w-0">
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-7"
            >
              00 / INTRO
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mb-5 h-5 flex items-center"
            >
              <span className="font-mono text-xs text-app-accent">{typingText}</span>
              <span className="ml-0.5 inline-block w-[2px] h-[14px] bg-app-accent animate-pulse" />
            </motion.div>

            <h1 className="text-[clamp(2.8rem,8vw,5.5rem)] font-black tracking-tight leading-[0.95] text-app-text-primary mb-6">
              {headline.map((word, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: easeOut, delay: 0.12 + i * 0.1 }}
                    className="block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5, ease: easeOut }}
              className="text-sm font-mono leading-relaxed text-app-text-secondary max-w-md mb-10"
            >
              Turning complex workflows into self-healing autonomous systems.
              Specializing in AI agents, browser automation, and full-stack products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.5, ease: easeOut }}
              className="flex flex-wrap gap-3"
            >
              <Magnetic>
                <a
                  href="#projects"
                  id="hero-explore-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center gap-2 h-11 px-6 bg-app-accent text-black text-[11px] font-bold uppercase tracking-[0.12em] hover:bg-app-accent/85 transition-colors duration-200 active:scale-95"
                >
                  <span>Explore Work</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Magnetic>

              <Magnetic>
                <button
                  id="hero-resume-btn"
                  onClick={() => setShowResume(true)}
                  className="inline-flex items-center gap-2 h-11 px-6 border border-app-text-muted/40 text-app-text-secondary text-[11px] font-bold uppercase tracking-[0.12em] hover:border-app-text-secondary hover:text-app-text-primary transition-all duration-200 active:scale-95 cursor-pointer bg-transparent"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Resume</span>
                </button>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.65, ease: easeOut }}
            className="lg:self-center"
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
