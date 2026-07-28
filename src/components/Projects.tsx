import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, X, ArrowUpRight } from "lucide-react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { PROJECTS_DATA, type Project } from "../data/projects";

/* ── Individual project card ── */
const ProjectCard = ({
  project,
  onDetails,
}: {
  project: Project;
  onDetails: () => void;
}) => (
  <div className="group flex flex-col border border-app-border bg-app-surface rounded-lg overflow-hidden transition-all duration-300 hover:border-app-text-muted/60 hover:shadow-lg dark:hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)]">

    {/* Image frame */}
    <div className="relative h-44 bg-app-surface-secondary overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.02] transition-all duration-500"
        onError={(e) => { e.currentTarget.style.opacity = "0"; }}
      />
      {/* Gradient overlay — fades the image into the card surface in both modes */}
      <div className="absolute inset-0 bg-gradient-to-t from-app-surface/95 via-app-surface/10 to-transparent" />
    </div>

    {/* Body */}
    <div className="flex flex-col gap-3 p-5 flex-1">
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-app-text-muted border border-app-border rounded px-2 py-0.5">
          {project.status}
        </span>
        <span className="text-[9px] font-mono text-app-text-muted">{project.timeline}</span>
      </div>

      <h3 className="text-lg font-black text-app-text-primary tracking-tight">
        {project.title}
      </h3>

      <p className="text-[11px] font-mono text-app-text-secondary leading-relaxed line-clamp-2 flex-1">
        {project.description}
      </p>
    </div>

    {/* Footer */}
    <div className="border-t border-app-border px-5 py-3 flex items-center justify-between">
      <button
        onClick={onDetails}
        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-app-text-muted hover:text-app-text-primary transition-colors duration-200 cursor-pointer"
      >
        <span>Details</span>
        <ArrowRight className="h-3 w-3" />
      </button>

      <div className="flex gap-1.5">
        {project.source && (
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            onClick={(e) => e.stopPropagation()}
            className="flex h-7 w-7 items-center justify-center border border-app-border text-app-text-muted hover:text-app-text-primary hover:border-app-text-muted transition-all rounded"
          >
            <FaGithub className="h-3 w-3" />
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            title="Live Demo"
            onClick={(e) => e.stopPropagation()}
            className="flex h-7 w-7 items-center justify-center border border-app-border text-app-text-muted hover:text-app-text-primary hover:border-app-text-muted transition-all rounded"
          >
            <FaExternalLinkAlt className="h-2.5 w-2.5" />
          </a>
        )}
      </div>
    </div>
  </div>
);

/* ── Project detail modal ── */
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
          aria-label="Close"
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

/* ── Main section ── */
export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? PROJECTS_DATA : PROJECTS_DATA.slice(0, 4);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  return (
    <section id="projects" className="border-t border-app-border bg-app-bg">
      <div className="mx-auto max-w-5xl px-6 py-24">

        {/* Header */}
        <div className="mb-12">
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
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleProjects.map((project, i) => (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i % 2 * 0.07 }}
            >
              <ProjectCard project={project} onDetails={() => setSelectedProject(project)} />
            </motion.div>
          ))}
        </div>

        {/* Show more */}
        <div className="flex justify-center mt-10">
          <button
            id="projects-show-more-btn"
            onClick={() => setShowAll((p) => !p)}
            className="inline-flex items-center gap-2 border border-app-border px-7 py-3 text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-app-text-muted hover:border-app-text-secondary hover:text-app-text-primary transition-all duration-200 cursor-pointer"
          >
            {showAll ? "Show Less" : "Show More Projects"}
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
