import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle, X, ArrowUpRight, Plus, Minus } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS_DATA, type Project } from "../data/projects";

/* ─────────────────────────────────────────────────
   STATUS BADGE STYLES
───────────────────────────────────────────────── */
const STATUS_STYLES: Record<string, { dot: string; label: string }> = {
  "Active Alpha": { dot: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]", label: "text-emerald-400" },
  "Live":         { dot: "bg-blue-400  shadow-[0_0_6px_rgba(96,165,250,0.6)]",  label: "text-blue-400"   },
  "Archived":     { dot: "bg-app-text-muted opacity-40",                          label: "text-app-text-muted" },
};

/* ─────────────────────────────────────────────────
   EXPANDABLE PROJECT ROW
───────────────────────────────────────────────── */
const ProjectRow = ({
  project,
  isOpen,
  onToggle,
  onDetails,
  index,
}: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
  onDetails: () => void;
  index: number;
}) => {
  const shouldReduce = useReducedMotion();
  const status = STATUS_STYLES[project.status] ?? STATUS_STYLES["Archived"];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`border-b border-app-border transition-colors duration-300 ${
        isOpen ? "bg-app-surface" : ""
      }`}
    >
      {/* ── Row trigger ── */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 sm:gap-6 px-1 py-5 text-left cursor-pointer group"
        aria-expanded={isOpen}
        aria-controls={`project-panel-${project.id}`}
      >
        {/* Fig number */}
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-app-text-muted shrink-0 w-10 hidden sm:block">
          {project.figNum}
        </span>

        {/* Index on mobile */}
        <span className="font-mono text-[9px] font-bold text-app-text-muted shrink-0 sm:hidden">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Title */}
        <h3
          className={`font-black text-base sm:text-xl lg:text-2xl tracking-tight flex-1 min-w-0 transition-colors duration-200 ${
            isOpen
              ? "text-app-accent"
              : "text-app-text-primary group-hover:text-app-accent"
          }`}
        >
          {project.title}
        </h3>

        {/* Tech pills — desktop only */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {project.tech.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[8px] font-mono font-bold uppercase tracking-widest text-app-text-muted border border-app-border px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Status */}
        <span
          className={`hidden sm:flex items-center gap-1.5 text-[8px] font-mono font-bold uppercase tracking-widest shrink-0 ${status.label}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full shrink-0 animate-pulse ${status.dot}`} />
          {project.status}
        </span>

        {/* Year */}
        <span className="font-mono text-[10px] text-app-text-muted shrink-0 hidden md:block w-14 text-right">
          {project.timeline}
        </span>

        {/* Toggle icon */}
        <div
          className={`shrink-0 flex items-center justify-center h-7 w-7 border transition-all duration-200 ${
            isOpen
              ? "border-app-accent text-app-accent"
              : "border-app-border text-app-text-muted group-hover:border-app-text-muted group-hover:text-app-text-primary"
          }`}
        >
          {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
        </div>
      </button>

      {/* ── Expanded panel ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`project-panel-${project.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              shouldReduce
                ? { duration: 0 }
                : { duration: 0.38, ease: [0.04, 0.62, 0.23, 0.98] }
            }
            className="overflow-hidden"
          >
            <div className="px-1 pb-10 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">

              {/* ── Left: Image + metric pills ── */}
              <div className="lg:col-span-2">
                <div className="relative aspect-video overflow-hidden bg-app-surface-secondary border border-app-border">
                  <img
                    src={project.image}
                    alt={`${project.title} — project preview screenshot`}
                    className="w-full h-full object-cover opacity-60 transition-opacity duration-500 hover:opacity-80"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                  />
                  {/* gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Fig watermark */}
                  <span className="absolute top-3 left-3 font-mono text-[9px] font-bold tracking-widest text-white/30 uppercase">
                    {project.figNum}
                  </span>

                  {/* Metric pills */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {project.metricPills.slice(0, 4).map((pill) => (
                      <span
                        key={pill}
                        className="text-[7px] font-mono font-bold uppercase tracking-widest bg-black/60 backdrop-blur-sm text-white/80 px-2 py-0.5"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact metrics row */}
                {project.metrics.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-px border border-app-border bg-app-border">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="flex flex-col items-center justify-center gap-0.5 py-3 bg-app-surface"
                      >
                        <span className="font-mono text-sm font-black text-app-text-primary tracking-tight">
                          {m.val}
                        </span>
                        <span className="text-[8px] font-mono uppercase tracking-wider text-app-text-muted text-center">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Right: Content ── */}
              <div className="lg:col-span-3 flex flex-col gap-6">

                {/* Description + highlight */}
                <div className="flex flex-col gap-2">
                  <p className="text-sm leading-relaxed text-app-text-secondary">
                    {project.description}
                  </p>
                  {project.highlight && (
                    <p className="text-[11px] font-mono text-app-accent leading-relaxed pl-3 border-l-2 border-app-accent/50">
                      {project.highlight}
                    </p>
                  )}
                </div>

                {/* What I built */}
                <div>
                  <p className="text-[9px] font-mono font-bold uppercase tracking-[0.22em] text-app-text-muted mb-3">
                    Built
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {project.whatIBuilt.map((point, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-2.5 border border-app-border bg-app-surface-secondary/50"
                      >
                        <span className="font-mono text-[8px] font-bold text-app-accent/60 shrink-0 mt-[1px]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] font-mono leading-relaxed text-app-text-secondary">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div>
                  <p className="text-[9px] font-mono font-bold uppercase tracking-[0.22em] text-app-text-muted mb-3">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.fullTech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono font-bold uppercase tracking-wide border border-app-border text-app-text-muted px-2.5 py-1 hover:border-app-text-muted hover:text-app-text-secondary transition-colors duration-150"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-app-border mt-auto">
                  <button
                    onClick={(e) => { e.stopPropagation(); onDetails(); }}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-app-text-muted hover:text-app-text-primary transition-colors duration-150 cursor-pointer"
                  >
                    <span>Full Case Study</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>

                  {project.link && project.link !== project.source && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} live project`}
                      className="inline-flex items-center gap-1.5 h-8 px-5 bg-app-accent text-black text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-app-accent/85 active:scale-95 transition-all duration-150"
                    >
                      <span>Live</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}

                  {project.source && (
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source on GitHub`}
                      className="inline-flex items-center gap-1.5 h-8 px-4 border border-app-border text-app-text-muted text-[10px] font-mono font-bold uppercase tracking-wider hover:text-app-text-primary hover:border-app-text-muted active:scale-95 transition-all duration-150"
                    >
                      <FaGithub className="h-3 w-3" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

/* ─────────────────────────────────────────────────
   PROJECT DETAIL MODAL (unchanged)
───────────────────────────────────────────────── */
const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
  >
    <div className="absolute inset-0" onClick={onClose} />

    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      transition={{ duration: 0.2 }}
      data-lenis-prevent
      className="relative w-full max-w-2xl max-h-[88vh] border border-app-border bg-app-surface rounded-xl overflow-y-auto z-10"
    >
      {/* Modal header */}
      <div className="sticky top-0 bg-app-surface border-b border-app-border flex items-center justify-between px-6 py-4 z-10">
        <div className="flex items-center gap-2.5">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-app-text-muted border border-app-border rounded px-2 py-0.5">
            Project Details
          </span>
          <span className="text-[9px] font-mono text-app-text-muted">{project.timeline}</span>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center border border-app-border text-app-text-muted hover:text-app-text-primary hover:border-app-text-muted transition-all rounded cursor-pointer"
          aria-label="Close project details"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Modal body */}
      <div className="p-6 flex flex-col gap-7">

        {/* Title block */}
        <div>
          <h2 className="text-3xl font-black tracking-tight text-app-text-primary">{project.title}</h2>
          {project.urlDomain && (
            <p className="mt-1 text-xs font-mono text-app-accent font-bold">{project.urlDomain}</p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-app-text-secondary">{project.longDescription}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-app-text-primary border-b border-app-border pb-2 mb-3 uppercase tracking-wide">
            Architecture Challenge
          </h3>
          <p className="text-[11px] leading-relaxed text-app-text-secondary font-mono">{project.challenges}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-app-text-primary border-b border-app-border pb-2 mb-3 uppercase tracking-wide">
            Engineered Solution
          </h3>
          <p className="text-[11px] leading-relaxed text-app-text-secondary font-mono">{project.solution}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-app-text-primary border-b border-app-border pb-2 mb-3 uppercase tracking-wide">
            Technical Contributions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.whatIBuilt.map((point, i) => (
              <div key={i} className="flex items-start gap-2 p-3 border border-app-border rounded-lg bg-app-surface-secondary">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed text-app-text-secondary">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-app-text-primary border-b border-app-border pb-2 mb-3 uppercase tracking-wide">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.fullTech.map((tech, i) => (
              <span key={i} className="border border-app-border bg-app-surface-secondary px-2.5 py-1 text-[10px] font-mono text-app-text-secondary rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {(project.link || project.source) && (
          <div className="flex gap-3 pt-2 border-t border-app-border">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 h-10 px-5 bg-app-text-primary text-app-bg text-[11px] font-bold rounded hover:opacity-85 transition-opacity active:scale-95"
              >
                <span>Launch Live</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 h-10 px-5 border border-app-border text-app-text-secondary text-[11px] font-bold rounded hover:text-app-text-primary hover:border-app-text-muted transition-all active:scale-95"
              >
                <FaGithub className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  </motion.div>
);

/* ─────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────── */
export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openId, setOpenId] = useState<string>("hunter"); // first project open by default
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? PROJECTS_DATA : PROJECTS_DATA.slice(0, 4);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  const handleToggleShowAll = () => {
    if (showAll) {
      const section = document.getElementById("projects");
      if (section) {
        const top = section.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setTimeout(() => {
        setShowAll(false);
        // keep only visible projects open; collapse if now hidden
        if (!PROJECTS_DATA.slice(0, 4).find((p) => p.id === openId)) {
          setOpenId("");
        }
      }, 600);
    } else {
      setShowAll(true);
    }
  };

  /* Lock body scroll when modal is open */
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  return (
    <section id="projects" className="border-t border-app-border bg-app-bg">
      <div className="mx-auto max-w-5xl px-6 py-24">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-4">
            02 / PROJECTS
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-app-text-primary leading-[1.0]">
            SELECTED WORK.
          </h2>
          <p className="mt-4 max-w-lg text-sm font-mono leading-relaxed text-app-text-secondary">
            Harnessing low-latency state orchestration, client-side canvas processing,
            and high-performance physics-based layouts.
          </p>
        </motion.div>

        {/* ── Column labels ── */}
        <div className="flex items-center gap-4 sm:gap-6 px-1 pb-3 border-b border-app-border mb-0">
          <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-app-text-muted shrink-0 w-10 hidden sm:block">
            Fig
          </span>
          <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-app-text-muted flex-1">
            Project
          </span>
          <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-app-text-muted hidden lg:block shrink-0 w-28">
            Tech
          </span>
          <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-app-text-muted hidden sm:block shrink-0 w-24">
            Status
          </span>
          <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-app-text-muted hidden md:block shrink-0 w-14 text-right">
            Year
          </span>
          <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-app-text-muted shrink-0 w-7 text-center">
            ↕
          </span>
        </div>

        {/* ── Project rows ── */}
        <AnimatePresence initial={false}>
          {visibleProjects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              isOpen={openId === project.id}
              onToggle={() => handleToggle(project.id)}
              onDetails={() => setSelectedProject(project)}
            />
          ))}
        </AnimatePresence>

        {/* ── Show more / less ── */}
        {PROJECTS_DATA.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <button
              id="projects-show-more-btn"
              onClick={handleToggleShowAll}
              className="group inline-flex items-center gap-2.5 border border-app-border px-7 py-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-app-text-muted hover:border-app-text-secondary hover:text-app-text-primary transition-all duration-200 cursor-pointer"
            >
              {showAll ? (
                <>
                  <Minus className="h-3 w-3" />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <Plus className="h-3 w-3" />
                  <span>
                    {PROJECTS_DATA.length - 4} More Project{PROJECTS_DATA.length - 4 !== 1 ? "s" : ""}
                  </span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Detail modal portal ── */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Projects;
