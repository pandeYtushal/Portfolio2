import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X, CheckCircle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS_DATA, type Project } from "../data/projects";

/* ─────────────────────────────────────────────────
   GALLERY PROJECT ITEM
───────────────────────────────────────────────── */
const GalleryProjectItem = ({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) => {
  const shouldReduce = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <motion.article
      id={`project-item-${index}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-20 sm:py-28 border-t border-app-border/40 ${isEven ? "" : "lg:flex-row-reverse"
        }`}
    >
      <div className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <motion.div
          whileHover={shouldReduce ? undefined : { scale: 1.018 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onClick={onSelect}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-app-surface cursor-pointer group shadow-2xl shadow-black/20 dark:shadow-black/70"
        >
          <img
            src={project.image}
            alt={`${project.title} — visual preview`}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700"
            loading="lazy"
            decoding="async"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

          <div className="absolute top-5 left-5 font-mono text-xs text-white/80 font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
            {project.figNum}
          </div>

          <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider border border-app-accent/60 text-app-accent bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              Case Study <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white/90">
              <span className="text-xs font-mono text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded">
                {project.metrics[0].label}: {project.metrics[0].val}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      <div className={`lg:col-span-5 flex flex-col items-start gap-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <div className="flex items-center gap-3 text-xs font-mono text-app-text-muted uppercase tracking-widest">
          <span>{project.timeline}</span>
          <span>·</span>
          <span className="text-app-accent font-bold">{project.status}</span>
        </div>

        <h3
          onClick={onSelect}
          className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-app-text-primary hover:text-app-accent transition-colors cursor-pointer leading-tight"
        >
          {project.title}
        </h3>

        <p className="text-sm font-mono text-app-text-secondary leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono text-app-text-muted border border-app-border/60 px-2.5 py-1 rounded-md bg-app-surface/40"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-app-border/40 w-full">
          <button
            onClick={onSelect}
            className="group inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-app-text-primary hover:text-app-accent transition-colors cursor-pointer"
          >
            <span>Case Study</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-app-text-muted hover:text-app-text-primary transition-colors flex items-center gap-1"
            >
              <span>Live</span> <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {project.source && (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-app-text-muted hover:text-app-text-primary transition-colors flex items-center gap-1"
            >
              <span>Source</span> <FaGithub className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/* ─────────────────────────────────────────────────
   PROJECT DETAIL MODAL
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
    className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
  >
    <div className="absolute inset-0" onClick={onClose} />

    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 12 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      data-lenis-prevent
      className="relative w-full max-w-2xl max-h-[88vh] border border-app-border bg-app-surface rounded-2xl overflow-y-auto z-10 shadow-2xl"
    >
      <div className="sticky top-0 bg-app-surface border-b border-app-border flex items-center justify-between px-6 py-4 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-app-accent uppercase">{project.figNum}</span>
          <span className="text-xs font-mono text-app-text-muted">{project.timeline}</span>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center border border-app-border text-app-text-muted hover:text-app-text-primary transition-all rounded-full cursor-pointer"
          aria-label="Close project details"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-6 sm:p-8 flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-sans font-bold tracking-tight text-app-text-primary">{project.title}</h2>
          {project.urlDomain && (
            <p className="mt-1 text-xs font-mono text-app-accent font-bold">{project.urlDomain}</p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-app-text-secondary font-mono">{project.longDescription}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-app-text-primary border-b border-app-border pb-2 mb-3 uppercase tracking-widest font-mono">
            Architecture Challenge
          </h3>
          <p className="text-xs leading-relaxed text-app-text-secondary font-mono">{project.challenges}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-app-text-primary border-b border-app-border pb-2 mb-3 uppercase tracking-widest font-mono">
            Engineered Solution
          </h3>
          <p className="text-xs leading-relaxed text-app-text-secondary font-mono">{project.solution}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-app-text-primary border-b border-app-border pb-2 mb-3 uppercase tracking-widest font-mono">
            Technical Contributions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.whatIBuilt.map((point, i) => (
              <div key={i} className="flex items-start gap-2 p-3 border border-app-border/40 rounded-xl bg-app-surface-secondary">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-app-text-secondary font-mono">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {(project.link || project.source) && (
          <div className="flex gap-4 pt-4 border-t border-app-border">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 h-10 px-6 bg-app-text-primary text-app-bg text-xs font-mono font-bold uppercase tracking-wider rounded-lg hover:bg-app-accent hover:text-black transition-all"
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
                className="inline-flex items-center gap-1.5 h-10 px-5 border border-app-border text-app-text-secondary text-xs font-mono font-bold uppercase tracking-wider rounded-lg hover:text-app-text-primary transition-all"
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
  const [showMore, setShowMore] = useState(false);

  const visibleProjects = showMore ? PROJECTS_DATA : PROJECTS_DATA.slice(0, 4);

  const handleShowMoreToggle = () => {
    if (showMore) {
      setShowMore(false);
      setTimeout(() => {
        const project4Element = document.getElementById("project-item-3");
        if (project4Element) {
          const top = project4Element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 50);
    } else {
      setShowMore(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  return (
    <section id="projects" className="bg-app-bg px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">

        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted block mb-3">
            03 / PROOF
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-medium tracking-tight text-app-text-primary uppercase">
            SELECTED WORK
          </h2>
          <p className="mt-3 max-w-lg text-sm font-mono leading-relaxed text-app-text-secondary">
            A gallery of autonomous AI systems, browser control loops, and production full-stack products.
          </p>
        </div>

        {/* Gallery Items */}
        <div className="flex flex-col">
          {visibleProjects.map((project, i) => (
            <GalleryProjectItem
              key={project.id}
              project={project}
              index={i}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {PROJECTS_DATA.length > 4 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleShowMoreToggle}
              className="group inline-flex items-center gap-2 px-6 py-3 border border-app-border bg-app-surface/60 hover:bg-app-surface text-app-text-primary hover:text-app-accent text-xs font-mono font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:border-app-accent/40 cursor-pointer"
            >
              <span>{showMore ? "Show Less" : "Show More"}</span>
              {showMore ? (
                <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}

      </div>

      {/* Case Study Modal */}
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
