import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  ArrowLeft,
  ExternalLink,
  Github,
  Eye,
  LayoutGrid, 
  SlidersHorizontal,
  ArrowUpRight
} from "lucide-react";
import { PROJECTS_DATA } from "../data/projects";

const PROJECT_QUOTES: Record<string, string> = {
  pulse: "WHAT IF YOUR DESKTOP HAD A PULSE OF ITS OWN?",
  hunter: "WHAT IF THE BROWSER DID MORE THAN WAIT FOR INSTRUCTIONS?",
  astronomical: "WHAT IF CELESTIAL MATHEMATICS COULD BE FELT THROUGH MOTION?",
  civic: "THE REAL WORLD DOESN'T HAVE A REFRESH BUTTON.",
  melody: "MUSIC DESERVES MORE THAN ANOTHER GRID OF RECTANGLES."
};

const swipeConfidenceThreshold = 3500;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
};

export const Projects = () => {
  const navigate = useNavigate();
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [viewMode, setViewMode] = useState<"showcase" | "grid">("showcase");

  const projects = PROJECTS_DATA;
  const projectCount = projects.length;
  const projectIndex = ((page % projectCount) + projectCount) % projectCount;
  const currentProject = projects[projectIndex];

  // Transition debounce lock to ensure strictly single-step progression
  const isTransitioning = useRef(false);

  const paginate = useCallback((newDirection: number) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    setTimeout(() => {
      isTransitioning.current = false;
    }, 320);
  }, []);

  const jumpToProject = useCallback((index: number) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setPage(([prevPage]) => {
      const current = ((prevPage % projectCount) + projectCount) % projectCount;
      const diff = index - current;
      return [prevPage + diff, diff >= 0 ? 1 : -1];
    });
    setTimeout(() => {
      isTransitioning.current = false;
    }, 320);
  }, [projectCount]);

  // Keyboard navigation support when user interacts with projects section
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If user is focused inside projects section or near it
      if (viewMode !== "showcase") return;
      if (e.key === "ArrowRight") {
        paginate(1);
      } else if (e.key === "ArrowLeft") {
        paginate(-1);
      }
    };

    const sectionEl = sectionRef.current;
    if (sectionEl) {
      sectionEl.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (sectionEl) {
        sectionEl.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [paginate, viewMode]);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      tabIndex={0}
      aria-label="Selected Projects"
      className="relative py-20 sm:py-28 md:py-44 px-5 sm:px-8 md:px-12 text-app-text-primary focus:outline-none transition-colors"
    >

      <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Tracking badge & view toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="font-mono text-xs sm:text-sm tracking-widest font-bold text-app-text-primary">03</span>
              <span className="font-sans text-xs uppercase tracking-widest font-semibold text-app-text-primary">
                The Work &mdash; The Exploration
              </span>
              <div className="h-[1px] w-12 sm:w-24 bg-app-border" />
              <span className="font-mono text-[10px] sm:text-xs text-app-text-primary font-semibold uppercase tracking-wider">
                {projectCount} Systems Built
              </span>
            </div>

            {/* Desktop View Mode Switcher */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-app-surface border border-app-border rounded-full shadow-xs">
              <button
                onClick={() => setViewMode("showcase")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  viewMode === "showcase"
                    ? "bg-app-text-primary text-app-bg font-semibold shadow-xs"
                    : "text-app-text-secondary hover:text-app-text-primary font-medium"
                }`}
                aria-label="Showcase slider view"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Showcase</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  viewMode === "grid"
                    ? "bg-app-text-primary text-app-bg font-semibold shadow-xs"
                    : "text-app-text-secondary hover:text-app-text-primary font-medium"
                }`}
                aria-label="Grid catalog view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Index Grid</span>
              </button>
            </div>
          </div>

          {/* Section Main Headline & Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline">
            <h2 className="lg:col-span-8 text-3xl sm:text-5xl md:text-6xl font-serif font-medium leading-[1.08] tracking-tight">
              "THINGS THAT STARTED WITH A QUESTION."
            </h2>
            <div className="lg:col-span-4 font-sans text-sm sm:text-base text-app-text-secondary leading-relaxed">
              <p>
                Different problems deserve different personalities. From low-level system hooks in Rust to autonomous vision agents in TypeScript.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE VIEW: SIMPLE & AUTHENTIC SWIPE EXPERIENCE (< 768px)      */}
        {/* ============================================================== */}
        <div className="md:hidden flex flex-col gap-4 select-none pt-2">
          {/* Authentic Index Header & Progress Ticks */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-app-text-primary tracking-widest">
                  {String(projectIndex + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}
                </span>
                <span className="text-app-text-primary font-bold">&mdash;</span>
                <span className="uppercase tracking-widest text-app-text-primary font-semibold text-[11px] truncate max-w-[170px]">
                  {currentProject.title}
                </span>
              </div>

              <span className="text-[10px] tracking-widest uppercase text-app-text-primary font-bold">
                Swipe &rarr;
              </span>
            </div>

            {/* Segmented Hairline Progress Indicator */}
            <div className="grid grid-cols-5 gap-1.5 w-full">
              {projects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => jumpToProject(idx)}
                  aria-label={`Go to ${p.title}`}
                  className="py-1 -my-1 focus:outline-none"
                >
                  <div 
                    className={`h-[2px] w-full transition-colors duration-300 ${
                      idx === projectIndex ? "bg-app-text-primary" : "bg-app-border"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Swipeable Motion Container */}
          <div className="relative overflow-hidden pt-2">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={projectIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragDirectionLock
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold || offset.x < -30) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold || offset.x > 30) {
                    paginate(-1);
                  }
                }}
                className="w-full flex flex-col gap-5 cursor-grab active:cursor-grabbing"
              >
                {/* Clean Authentic Image Frame */}
                <div 
                  onClick={() => navigate(`/project/${currentProject.id}`)}
                  className="aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-app-surface-secondary border border-app-border relative group cursor-pointer"
                >
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-app-bg/90 backdrop-blur-xs border border-app-border text-[10px] font-mono tracking-widest uppercase text-app-text-secondary">
                    {currentProject.figNum}
                  </div>
                </div>

                {/* Typography & Narrative (No heavy buttons or nested boxes) */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-app-text-primary font-bold">
                    {currentProject.tag}
                  </span>

                  <h3 
                    onClick={() => navigate(`/project/${currentProject.id}`)}
                    className="text-2xl sm:text-3xl font-serif font-medium leading-snug text-app-text-primary"
                  >
                    {PROJECT_QUOTES[currentProject.id] ? `"${PROJECT_QUOTES[currentProject.id]}"` : currentProject.title}
                  </h3>

                  <p className="font-sans text-sm text-app-text-secondary leading-relaxed line-clamp-3">
                    {currentProject.description}
                  </p>

                  {/* Clean Monospace Tech Stack */}
                  <p className="font-mono text-[11px] text-app-text-secondary font-semibold tracking-wider">
                    {(currentProject.metricPills || currentProject.tech).slice(0, 4).join(" · ")}
                  </p>

                  {/* Action Bar & Next/Prev Controls */}
                  <div className="flex flex-col gap-3 pt-3 mt-1 border-t border-app-border">
                    {/* Primary Action Buttons */}
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => navigate(`/project/${currentProject.id}`)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-app-text-primary text-app-surface text-xs font-mono font-bold uppercase tracking-wider rounded-lg shadow-xs active:scale-[0.98] transition-all"
                      >
                        <span>Project Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {currentProject.link && (
                        <a
                          href={currentProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-app-border rounded-lg text-xs font-mono uppercase tracking-wider text-app-text-primary hover:bg-app-surface-secondary transition-colors"
                        >
                          <span>Live</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {currentProject.source && (
                        <a
                          href={currentProject.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 border border-app-border rounded-lg text-app-text-primary hover:bg-app-surface-secondary transition-colors"
                          aria-label="View source repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {/* Quick Previous / Next Project Buttons for Mobile */}
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                      <button
                        onClick={() => paginate(-1)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 border border-app-border rounded-lg bg-app-surface/60 hover:bg-app-surface text-app-text-secondary hover:text-app-text-primary active:scale-95 transition-all"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Prev Project</span>
                      </button>

                      <button
                        onClick={() => paginate(1)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 border border-app-border rounded-lg bg-app-surface/60 hover:bg-app-surface text-app-text-primary font-semibold active:scale-95 transition-all"
                      >
                        <span>Next Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP & TABLET VIEW: SHOWCASE SLIDER OR INDEX GRID (>= 768px)  */}
        {/* ============================================================== */}
        {viewMode === "showcase" ? (
          <div className="hidden md:flex flex-col gap-10">
            {/* Main Featured Showcase Area: Open Editorial (No outer card box) */}
            <div className="relative border-t border-app-border/70 pt-8 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={projectIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.25 },
                  }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                >
                  {/* Left Column: Details & Narrative (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    {/* Meta info header */}
                    <div className="flex items-center justify-between border-b border-app-border/80 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold tracking-widest text-app-text-primary">
                          {currentProject.figNum}
                        </span>
                        <span className="text-app-text-primary text-xs">&bull;</span>
                        <span className="font-mono text-xs tracking-wider uppercase text-app-text-primary font-semibold">
                          {currentProject.timeline}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-app-surface-secondary border border-app-border text-[11px] font-mono text-app-text-primary font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        <span>{currentProject.status || "Live System"}</span>
                      </div>
                    </div>

                    {/* Tag badge */}
                    <span className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-semibold">
                      {currentProject.tag}
                    </span>

                    {/* Project Title */}
                    <h3 
                      onClick={() => navigate(`/project/${currentProject.id}`)}
                      className="text-4xl lg:text-5xl font-serif font-medium leading-[1.05] tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      {currentProject.title}
                    </h3>

                    {/* Provocative Inquiry Quote */}
                    {PROJECT_QUOTES[currentProject.id] && (
                      <div className="border-l-2 border-app-text-primary pl-4 py-1">
                        <p className="font-serif italic text-base lg:text-lg text-app-text-secondary leading-snug">
                          "{PROJECT_QUOTES[currentProject.id]}"
                        </p>
                      </div>
                    )}

                    {/* Narrative Description */}
                    <p className="font-sans text-base text-app-text-secondary leading-relaxed">
                      {currentProject.description}
                    </p>

                    {/* Highlight callout */}
                    {currentProject.highlight && (
                      <div className="p-3 bg-app-surface-secondary/70 border border-app-border rounded-lg text-xs font-sans text-app-text-secondary">
                        <span className="font-mono uppercase font-bold text-app-text-primary tracking-wider block mb-1">
                          Key Architecture:
                        </span>
                        {currentProject.highlight}
                      </div>
                    )}

                    {/* Live Metrics Grid */}
                    {currentProject.metrics && currentProject.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 py-2 border-y border-app-border/70">
                        {currentProject.metrics.map((metric, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="font-mono text-[10px] uppercase text-app-text-secondary font-bold tracking-wider">
                              {metric.label}
                            </span>
                            <span className="font-mono text-sm font-semibold text-app-text-primary">
                              {metric.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Technology tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(currentProject.metricPills || currentProject.tech).map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-mono bg-app-surface-secondary text-app-text-secondary rounded border border-app-border/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Primary actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        onClick={() => navigate(`/project/${currentProject.id}`)}
                        className="group inline-flex items-center gap-2.5 px-6 py-3 bg-app-text-primary text-app-surface text-xs font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-all shadow-xs active:scale-[0.98]"
                      >
                        <span>Project Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>

                      <button
                        onClick={() => paginate(1)}
                        className="inline-flex items-center gap-2 px-5 py-3 border border-app-border rounded-lg text-xs font-mono uppercase tracking-wider text-app-text-primary hover:bg-app-surface transition-colors"
                      >
                        <span>Next Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {currentProject.link && (
                        <a
                          href={currentProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-3 border border-app-border rounded-lg text-xs font-mono uppercase tracking-wider text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface transition-colors"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {currentProject.source && (
                        <a
                          href={currentProject.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 border border-app-border rounded-lg text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface transition-colors"
                          aria-label="View source repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Frame (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col gap-3">
                    <div
                      onClick={() => navigate(`/project/${currentProject.id}`)}
                      className="group relative aspect-[16/11] w-full rounded-xl overflow-hidden border border-app-border bg-app-surface shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl"
                    >
                      <img
                        src={currentProject.image}
                        alt={currentProject.title}
                        className="w-full h-full object-cover object-top grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                      />

                      {/* Figure Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-app-bg/90 backdrop-blur-md border border-app-border/80 text-[10px] font-mono tracking-widest uppercase text-app-text-primary font-bold rounded">
                        {currentProject.figNum}
                      </div>

                      {/* Hover Overlay Badge */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1.5px]">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono uppercase tracking-widest font-semibold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <Eye className="w-4 h-4" />
                          <span>View Project Details</span>
                        </span>
                      </div>
                    </div>

                    {/* Frame Footer Caption */}
                    <div className="flex items-center justify-between text-xs font-mono text-app-text-secondary font-semibold px-1">
                      <span>Click image to examine case study and project details</span>
                      <span>FIG {String(projectIndex + 1).padStart(2, "0")} OF {String(projectCount).padStart(2, "0")}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Controls: Thumbnail Selector & Navigation Arrows */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
              {/* Thumbnail Strip / Project Switcher */}
              <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                {projects.map((project, idx) => {
                  const isActive = idx === projectIndex;
                  return (
                    <button
                      key={project.id}
                      onClick={() => jumpToProject(idx)}
                      className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all ${
                        isActive
                          ? "bg-app-surface border-app-text-primary text-app-text-primary shadow-sm"
                          : "bg-app-surface/60 border-app-border text-app-text-secondary font-medium hover:text-app-text-primary hover:border-app-border/80"
                      }`}
                    >
                      <span className="font-mono text-xs font-semibold">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-sans text-xs font-semibold leading-tight">
                          {project.title}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-app-text-secondary font-bold">
                          {project.tag.split("&")[0].trim()}
                        </span>
                      </div>

                      {/* Active Indicator Bar */}
                      {isActive && (
                        <motion.div
                          layoutId="activeProjectIndicator"
                          className="absolute -bottom-[1px] inset-x-3 h-[2px] bg-app-text-primary"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Buttons & Keyboard Tip */}
              <div className="flex items-center gap-4">
                <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-app-text-secondary font-semibold">
                  <span className="px-1.5 py-0.5 rounded bg-app-surface border border-app-border text-[10px]">←</span>
                  <span className="px-1.5 py-0.5 rounded bg-app-surface border border-app-border text-[10px]">→</span>
                  <span>keys to browse</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => paginate(-1)}
                    className="p-3 rounded-full border border-app-border bg-app-surface hover:bg-app-text-primary hover:text-app-bg transition-colors shadow-xs"
                    aria-label="Previous project"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    className="p-3 rounded-full border border-app-border bg-app-surface hover:bg-app-text-primary hover:text-app-bg transition-colors shadow-xs"
                    aria-label="Next project"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* INDEX GRID MODE (All Projects view for desktop & tablet)        */
          /* ============================================================== */
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex flex-col justify-between rounded-xl border border-white/20 bg-app-bg/40 backdrop-blur-sm p-6 shadow-xs hover:shadow-lg transition-all"
              >
                <div className="flex flex-col gap-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-xs font-mono text-app-text-secondary font-semibold border-b border-app-border/70 pb-3">
                    <span className="font-semibold text-app-text-primary">{project.figNum}</span>
                    <span className="uppercase">{project.status || "Active"}</span>
                  </div>

                  {/* Thumbnail Preview */}
                  <div 
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-app-surface-secondary border border-app-border cursor-pointer relative"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  {/* Tag & Title */}
                  <span className="font-mono text-[10px] uppercase tracking-widest text-app-text-primary font-bold">
                    {project.tag}
                  </span>

                  <h3 
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="text-2xl font-serif font-medium leading-tight cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs text-app-text-secondary leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(project.metricPills || project.tech).slice(0, 3).map((item, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[10px] font-mono bg-app-surface-secondary text-app-text-secondary rounded border border-app-border/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer links */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-app-border">
                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="text-xs font-bold font-mono uppercase tracking-wider text-app-text-primary flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-app-text-secondary hover:text-app-text-primary transition-colors"
                        aria-label="Live link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.source && (
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-app-text-secondary hover:text-app-text-primary transition-colors"
                        aria-label="Source code"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Seamless trail connector: Projects -> Experience */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 border-t border-app-border/60 pt-6 mt-4"
        >
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-app-text-secondary font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-app-text-primary/70" />
            <span>03 / 06 Selected Work Completed</span>
          </div>
          <a 
            href="#education"
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-app-text-secondary font-semibold hover:text-app-text-primary transition-colors"
          >
            <span>Proceed to 04 Experience</span>
            <span className="group-hover:translate-y-0.5 transition-transform">&darr;</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
