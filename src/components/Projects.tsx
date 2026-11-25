import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@cred/neopop-web/lib/components";
import { fontNameSpaces } from "@cred/neopop-web/lib/primitives";

interface ShowcaseProject {
  id: string;
  num: string;
  category: string;
  title: string;
  subtitle: string;
  quote: string;
  tech: string[];
  activeGradient: string;
  inactiveBg: string;
  accentColor: string;
  liveUrl?: string;
  caseStudyUrl: string;
}

const PROJECTS: ShowcaseProject[] = [
  {
    id: "pulse",
    num: "01",
    category: "DESKTOP HUD & TAURI",
    title: "Pulse",
    subtitle: "A quiet, native Windows HUD layer built with Tauri 2 and Rust IPC.",
    quote:
      "System telemetry and media controls shouldn't require switching contexts. Pulse unifies notifications, hardware state, and playback into a single unobtrusive surface at the top of your screen.",
    tech: ["Tauri 2", "Rust", "React", "Windows API"],
    activeGradient: "linear-gradient(135deg, #090514 0%, #1a0c32 45%, #581c87 85%, #7e22ce 100%)",
    inactiveBg: "#0d0918",
    accentColor: "#a855f7",
    liveUrl: "https://pulse-website-nine.vercel.app/",
    caseStudyUrl: "/project/pulse",
  },
  {
    id: "hunter",
    num: "02",
    category: "AUTONOMOUS AGENTS",
    title: "Hunter",
    subtitle: "Autonomous AI browser agent with visual coordinates and self-healing DOM routers.",
    quote:
      "Procedural web scrapers fail instantly when layouts or CSS selectors change. Hunter pairs multimodal vision with local semantic caching to navigate dynamic single-page applications with 94% accuracy.",
    tech: ["Chrome MV3", "Vision Models", "IndexedDB", "Agent Loop"],
    activeGradient: "linear-gradient(135deg, #03120e 0%, #062b20 45%, #047857 85%, #059669 100%)",
    inactiveBg: "#061511",
    accentColor: "#10b981",
    liveUrl: "https://huntterr.vercel.app/",
    caseStudyUrl: "/project/hunter",
  },
  {
    id: "astronomical",
    num: "03",
    category: "3D & SCROLL PHYSICS",
    title: "Astronomical",
    subtitle: "1,500 years of Indian mathematical astronomy catalogued in interactive 3D.",
    quote:
      "From Vedic astronomy and the Aryabhatiya to modern Chandrayaan milestones, this archive merges physics-based scroll velocity with abstract d3-geo projections of ancient observatories.",
    tech: ["Next.js 15", "Framer Motion", "d3-geo", "Scroll Physics"],
    activeGradient: "linear-gradient(135deg, #060919 0%, #0d1738 42%, #1e2e6c 78%, #b45309 100%)",
    inactiveBg: "#080d20",
    accentColor: "#f59e0b",
    liveUrl: "https://astronomical-chi.vercel.app/",
    caseStudyUrl: "/project/astronomical",
  },
  {
    id: "civic",
    num: "04",
    category: "PERFORMANCE OPTIMIZATION",
    title: "Smart Civic",
    subtitle: "Localized civic reporting platform optimized for low-bandwidth municipal networks.",
    quote:
      "Field reporting tools crash when users upload 12-megapixel images over unstable cell towers. Client-side HTML5 canvas compression shrinks photo payloads by 70% before hitting the storage queue.",
    tech: ["React", "HTML5 Canvas", "Firebase", "Realtime Sync"],
    activeGradient: "linear-gradient(135deg, #101114 0%, #1e1f26 45%, #7c2d12 82%, #c2410c 100%)",
    inactiveBg: "#121318",
    accentColor: "#f97316",
    liveUrl: "https://urbanreport.vercel.app/",
    caseStudyUrl: "/project/civic",
  },
  {
    id: "melody",
    num: "05",
    category: "AUDIO STATE ARCHITECTURE",
    title: "Melody",
    subtitle: "High-fidelity audio streaming with hoisted Zustand state and offline PWA caching.",
    quote:
      "Audio streams shouldn't stutter or reset when switching tabs or pages. Hoisted Zustand audio state delivers uninterrupted playback, instant queue modifications, and zero-latency track pre-caching.",
    tech: ["React 19", "Zustand", "PWA Cache", "JioSaavn API"],
    activeGradient: "linear-gradient(135deg, #050f18 0%, #0a2238 45%, #0369a1 85%, #0284c7 100%)",
    inactiveBg: "#07131e",
    accentColor: "#0ea5e9",
    liveUrl: "https://meldmusic.vercel.app/",
    caseStudyUrl: "/project/melody",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <section id="projects" className="work-section section-wrap" aria-labelledby="projects-heading">
      {/* Section Heading */}
      <div className="section-heading mb-4 md:mb-6">
        <div>
          <div className="eyebrow flex items-center gap-2">
            <Typography {...fontNameSpaces.tc12b} color="#9e9e9b">
              SELECTED WORK <span className="opacity-40">05 SYSTEMS</span>
            </Typography>
          </div>
          <h2 id="projects-heading">
            Featured<br />projects<span className="accent">.</span>
          </h2>
        </div>
        <p className="section-note">
          Engineered systems built for performance, resilience, and real-world utility.
        </p>
      </div>

      {/* Desktop Showcase: Ultra-smooth Hardware-Accelerated Flex Accordion */}
      <div className="hidden md:flex gap-3 h-[460px] md:h-[480px] w-full select-none">
        {PROJECTS.map((project, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              style={{
                flex: isActive ? "1 1 0%" : "0 0 76px",
                background: isActive ? project.activeGradient : project.inactiveBg,
                borderColor: isActive ? `${project.accentColor}50` : "rgba(255, 255, 255, 0.08)",
                transition: "flex 420ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms ease, border-color 300ms ease",
                willChange: "flex",
              }}
              className={`relative rounded-none overflow-hidden border cursor-pointer select-none ${
                isActive
                  ? "cursor-default shadow-2xl ring-1 ring-inset ring-white/10"
                  : "hover:border-white/20 hover:brightness-110"
              }`}
              role="tab"
              aria-selected={isActive}
              aria-label={`Project ${project.title}`}
            >
              {isActive ? (
                /* Active Expanded Content — Instant rendering without blocking wait */
                <div className="p-6 lg:p-8 flex flex-col justify-between h-full text-white animate-in fade-in duration-200">
                  {/* Top: Category & Project Title */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-neutral-400">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-300 font-normal leading-relaxed mt-1 max-w-xl">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Middle: Architectural Quote */}
                  <div className="my-auto py-3">
                    <p className="text-lg md:text-xl lg:text-[23px] font-medium text-white/95 leading-snug tracking-tight max-w-3xl">
                      &ldquo;{project.quote}&rdquo;
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-[11px] font-mono rounded-none bg-white/[0.08] border border-white/10 text-neutral-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Action Links */}
                  <div className="flex items-center gap-4 pt-2">
                    <Button
                      variant="primary"
                      kind="elevated"
                      size="medium"
                      colorMode="dark"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        navigate(project.caseStudyUrl);
                      }}
                    >
                      Read case study →
                    </Button>

                    {project.liveUrl && (
                      <Button
                        variant="secondary"
                        kind="elevated"
                        size="medium"
                        colorMode="dark"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          window.open(project.liveUrl, "_blank");
                        }}
                      >
                        Live preview ↗
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                /* Inactive Collapsed Column — Minimal, Typographic & Clean */
                <div className="flex flex-col items-center justify-between h-full py-8 px-2 text-white/70">
                  {/* Top: Project Number */}
                  <span className="font-mono text-xs font-medium text-neutral-400">
                    {project.num}
                  </span>

                  {/* Middle: Vertical Title */}
                  <div className="my-auto">
                    <span className="[writing-mode:vertical-rl] rotate-180 text-xs font-mono tracking-widest text-neutral-400 uppercase font-medium">
                      {project.title}
                    </span>
                  </div>

                  {/* Bottom: Accent Indicator Dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full opacity-60"
                    style={{ backgroundColor: project.accentColor }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Showcase: Smooth Vertical Expanding Stack */}
      <div className="md:hidden flex flex-col gap-3 w-full">
        {PROJECTS.map((project, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              style={{
                background: isActive ? project.activeGradient : project.inactiveBg,
                borderColor: isActive ? `${project.accentColor}50` : "rgba(255, 255, 255, 0.08)",
                transition: "background-color 300ms ease, border-color 300ms ease",
              }}
              className={`rounded-none border overflow-hidden select-none cursor-pointer ${
                isActive ? "p-4 sm:p-6 text-white min-h-[340px] flex flex-col justify-between cursor-default" : "p-3.5 sm:p-4"
              }`}
            >
              {isActive ? (
                /* Mobile Active Content */
                <div className="flex flex-col justify-between h-full gap-5">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-neutral-400">
                      {project.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base font-medium text-white/95 leading-snug">
                    &ldquo;{project.quote}&rdquo;
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] font-mono rounded-none bg-white/[0.08] text-neutral-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10 flex-wrap">
                    <Button
                      variant="primary"
                      kind="elevated"
                      size="small"
                      colorMode="dark"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        navigate(project.caseStudyUrl);
                      }}
                    >
                      Read case study →
                    </Button>
                    {project.liveUrl && (
                      <Button
                        variant="secondary"
                        kind="elevated"
                        size="small"
                        colorMode="dark"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          window.open(project.liveUrl, "_blank");
                        }}
                      >
                        Live ↗
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                /* Mobile Inactive Row */
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-neutral-400">
                      {project.num}
                    </span>
                    <span className="text-sm font-medium text-white/90">
                      {project.title}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">→</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
