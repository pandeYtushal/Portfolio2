import { useState, useRef } from "react";
import { m, useReducedMotion } from "motion/react";
import { springs, stagger } from "../motion.theme";
import { useLenis } from "../hooks/useLenis";
import { Button, Typography } from "@cred/neopop-web/lib/components";
import { fontNameSpaces } from "@cred/neopop-web/lib/primitives";
import { useNavigate, Link } from "react-router-dom";
import { ArrowUpRight, Check, Copy, Github, Linkedin } from "lucide-react";

export default function Hero() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const navigate = useNavigate();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);

  const email = "tushalanand4@gmail.com";

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleScrollToProjects = () => {
    const target = document.querySelector("#projects");
    if (target) {
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: 0 });
      } else {
        const navOffset = window.innerWidth <= 768 ? -60 : -72;
        const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY + navOffset;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      className="hero section-wrap relative overflow-hidden"
      aria-labelledby="hero-title"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Grid */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Reactive Ambient Spotlight Following Cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 z-0"
        style={{
          opacity: isHovered ? 1 : 0.35,
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 220, 24, 0.045), transparent 75%)`,
        }}
        aria-hidden="true"
      />

      <div className="hero-content relative z-10 w-full flex flex-col justify-center">
        {/* Top Eyebrow: Status & Latest Ship Pill */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6">
          <div className="eyebrow flex items-center gap-2">
            <span className="live-dot shrink-0" />
            <Typography {...fontNameSpaces.tc10b} color="#9e9e9b">
              AVAILABLE FOR SELECT PROJECTS <span className="opacity-40">INDIA · IST</span>
            </Typography>
          </div>

          <Link
            to="/project/pulse"
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 text-neutral-300 hover:text-white transition-all font-mono text-[10px] sm:text-[11px] uppercase tracking-wider group"
            title="Read case study for Pulse"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="text-neutral-400">LATEST SHIP:</span>
            <span className="font-semibold text-white group-hover:text-amber-300 transition-colors">
              PULSE · WINDOWS HUD
            </span>
            <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </Link>
        </div>

        {/* Role Monospace Eyebrow */}
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-neutral-400 uppercase font-semibold mb-1 sm:mb-2 block">
          SYSTEMS &amp; PRODUCT ENGINEERING
        </span>

        {/* Hero Title */}
        <h1 id="hero-title" className="hero-name" aria-label="Tushal Anand">
          <span className="name-line">
            <m.span initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ ...springs.ui, delay: stagger }}>
              Tushal
            </m.span>
          </span>
          <span className="name-line">
            <m.span initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ ...springs.ui, delay: stagger * 2 }}>
              Anand<span className="accent inline-block hover:scale-110 transition-transform cursor-pointer" title="Building systems that stay useful">.</span>
            </m.span>
          </span>
        </h1>

        {/* Hero Narrative Intro */}
        <div className="hero-intro">
          <Typography
            {...fontNameSpaces.tb14m}
            color="#b2b2ad"
            style={{ maxWidth: "52ch", lineHeight: 1.65, marginBottom: "1.35rem" }}
          >
            I’m Tushal, a software engineer building quiet, high-performance desktop layers in Rust and interactive web applications with React, TypeScript, and autonomous AI agents.
          </Typography>

          {/* Action Row: Primary + Secondary + Quick Direct Socials & Email */}
          <div className="hero-actions flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              variant="primary"
              kind="elevated"
              size="medium"
              colorMode="dark"
              onClick={handleScrollToProjects}
            >
              View work ↘
            </Button>
            <Button
              variant="secondary"
              kind="elevated"
              size="medium"
              colorMode="dark"
              onClick={() => navigate("/resume")}
            >
              Resume ↗
            </Button>

            {/* Quick Direct Touchpoints */}
            <div className="flex items-center gap-2 pl-1 sm:pl-2">
              <a
                href="https://github.com/pandeYtushal"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-none bg-[#111114] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/tushal-anand18/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-none bg-[#111114] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="h-10 px-3.5 rounded-none bg-[#111114] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors font-mono text-xs"
                title="Click to copy email address"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tactile 3-Column Engineering Vitals Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mt-8 sm:mt-10 pt-6 border-t border-white/[0.08] max-w-4xl">
          <div className="p-3 sm:p-4 rounded-none bg-[#0e0e11] border border-white/[0.08] shadow-[3px_3px_0px_#18181b] flex flex-col justify-between gap-1.5">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
              PRIMARY STACK
            </span>
            <span className="font-sans text-xs sm:text-sm font-medium text-neutral-200">
              Rust · TypeScript · React 19 · Tauri 2
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-none bg-[#0e0e11] border border-white/[0.08] shadow-[3px_3px_0px_#18181b] flex flex-col justify-between gap-1.5">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
              SPECIALIZATION
            </span>
            <span className="font-sans text-xs sm:text-sm font-medium text-neutral-200">
              Native Desktop Layers &amp; AI Agents
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-none bg-[#0e0e11] border border-white/[0.08] shadow-[3px_3px_0px_#18181b] flex flex-col justify-between gap-1.5">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
              SYSTEM STATUS
            </span>
            <span className="font-sans text-xs sm:text-sm font-medium text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Available · India (IST)</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
