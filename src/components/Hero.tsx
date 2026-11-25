import { useState, useRef } from "react";
import { m, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react";
import { springs, stagger } from "../motion.theme";
import { useLenis } from "../hooks/useLenis";
import { Button, Typography } from "@cred/neopop-web/lib/components";
import { fontNameSpaces } from "@cred/neopop-web/lib/primitives";
import { useNavigate, Link } from "react-router-dom";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Sparkles } from "lucide-react";

export default function Hero() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const navigate = useNavigate();

  // Mouse coordinates for ambient canvas light
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);

  const email = "tushalanand4@gmail.com";

  // 3D Tilt calculations for the Art Specimen Frame
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 22 };
  const mouseXSpring = useSpring(cardX, springConfig);
  const mouseYSpring = useSpring(cardY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    cardX.set(xPct);
    cardY.set(yPct);
  };

  const handleCardMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
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
      onMouseMove={handleSectionMouseMove}
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
          background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 220, 24, 0.045), transparent 75%)`,
        }}
        aria-hidden="true"
      />

      <div className="hero-content relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative, Typography & Vitals */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Eyebrow: Status & Latest Ship Pill */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-4 sm:mb-5">
              <div className="eyebrow flex items-center gap-2">
                <span className="live-dot shrink-0" />
                <Typography {...fontNameSpaces.tc10b} color="#9e9e9b">
                  AVAILABLE FOR SELECT PROJECTS <span className="opacity-40">INDIA · IST</span>
                </Typography>
              </div>

              <Link
                to="/project/pulse"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 text-neutral-300 hover:text-white transition-all font-mono text-[10px] sm:text-[11px] uppercase tracking-wider group"
                title="Read case study for Pulse"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <span className="text-neutral-400">LATEST:</span>
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


          </div>

          {/* Right Column: Chromatic Motion Art Centerpiece (Tactile 3D Obsidian Specimen) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end [perspective:1000px] w-full">
            <m.div
              style={{
                rotateX: reduce ? 0 : rotateX,
                rotateY: reduce ? 0 : rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative w-full max-w-[480px] rounded-none bg-[#101013] border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.85)] group select-none transition-shadow hover:shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
            >
              {/* Precision Specular Top Glint */}
              <div className="pointer-events-none absolute -top-[1px] left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent z-20" />

              {/* Technical Titlebar */}
              <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 border-b border-white/[0.08] bg-[#0c0c0e] flex items-center justify-between font-mono text-[10px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="uppercase tracking-wider font-semibold text-neutral-300">
                    MOTION STUDY · SPECTRAL TRACE
                  </span>
                </div>
                <span className="text-neutral-500 font-mono text-[9px] tracking-widest hidden sm:inline">
                  420NM · 680NM
                </span>
              </div>

              {/* Inner Showcase Stage */}
              <div className="relative p-2 sm:p-2.5 bg-[#0a0a0c]">
                {/* Precision Corner L-Marks */}
                <span className="pointer-events-none absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/40 z-20" />
                <span className="pointer-events-none absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/40 z-20" />
                <span className="pointer-events-none absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/40 z-20" />
                <span className="pointer-events-none absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/40 z-20" />

                {/* Chromatic Artwork Frame */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0d0d10] border border-white/[0.06]">
                  <img
                    src="/hero-cat.jpg"
                    alt="Kinetic silhouette with chromatic motion dispersion trail"
                    className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700 contrast-[1.03]"
                    loading="eager"
                  />
                  {/* Subtle Ambient Vignette Overlay */}
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]" />
                </div>
              </div>

              {/* Technical Specimen Footer */}
              <div className="px-3.5 py-2 sm:px-4 sm:py-2 border-t border-white/[0.08] bg-[#0c0c0e] flex items-center justify-between font-mono text-[10px] text-neutral-400">
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span className="tracking-wider uppercase text-[9px] sm:text-[10px] font-medium">
                    Chromatic Dispersion
                  </span>
                </div>
                <span className="text-emerald-400 font-medium text-[9px] sm:text-[10px]">
                  KINETIC STATE ACTIVE
                </span>
              </div>
            </m.div>
          </div>

        </div>
      </div>
    </section>
  );
}
