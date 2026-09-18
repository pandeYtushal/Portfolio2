import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS_DATA, type Project } from "../data/projects";

/* ─────────────────────────────────────────────────
   MODERN SLEEK MODAL
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
    className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-app-bg/80 backdrop-blur-xl"
    data-lenis-prevent="true"
  >
    <div className="absolute inset-0" onClick={onClose} />

    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative w-full max-w-5xl h-[90vh] md:h-[85vh] bg-app-surface border border-app-border/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
    >
      {/* Header */}
      <div className="sticky top-0 bg-app-surface/90 backdrop-blur-md border-b border-app-border/40 flex items-center justify-between px-6 py-4 z-10">
        <span className="text-xs font-semibold text-app-text-secondary uppercase tracking-wider">
          {project.tag || "Project Details"}
        </span>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-app-border/10 text-app-text-muted hover:text-app-text-primary hover:bg-app-border/30 transition-all cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-10 lg:p-16 custom-scrollbar flex flex-col gap-10 md:gap-16">
        {/* Title Block */}
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-app-text-primary mb-6">
            {project.title}
          </h2>
          <p className="text-lg sm:text-xl text-app-text-secondary leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Content Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-sm font-bold text-app-text-primary uppercase tracking-widest mb-4">
                The Challenge
              </h3>
              <p className="text-base text-app-text-secondary leading-relaxed">
                {project.challenges || project.problemStatement}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-app-text-primary uppercase tracking-widest mb-4">
                The Solution
              </h3>
              <p className="text-base text-app-text-secondary leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-app-text-primary uppercase tracking-widest mb-6">
              Key Features
            </h3>
            <div className="flex flex-col gap-4">
              {project.whatIBuilt.map((point, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-app-border/5 border border-app-border/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-app-text-primary mt-2 shrink-0" />
                  <span className="text-base text-app-text-secondary leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-app-text-primary uppercase tracking-widest mb-6">
              Impact
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {project.metrics.map((m, i) => (
                <div key={i} className="flex flex-col p-4 sm:p-6 rounded-2xl bg-app-border/5 border border-app-border/10">
                  <span className="text-3xl font-bold text-app-text-primary mb-2">{m.val}</span>
                  <span className="text-sm font-medium text-app-text-muted">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {(project.link || project.source) && (
          <div className="flex flex-col sm:flex-row gap-4 pt-8 md:pt-10 border-t border-app-border/20 mt-auto">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-app-text-primary text-app-bg text-sm font-bold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
              >
                <span>Visit Project</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-app-surface border border-app-border/40 text-app-text-primary text-sm font-bold tracking-widest uppercase hover:bg-app-text-primary hover:text-app-bg transition-all w-full sm:w-auto"
              >
                <FaGithub className="h-5 w-5" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  </motion.div>
);

/* ─────────────────────────────────────────────────
   PROJECT CARD (STICKY)
───────────────────────────────────────────────── */
const ProjectCard = ({ project, index, total, isMobile, onClick }: { project: Project; index: number; total: number; isMobile: boolean; onClick: () => void }) => {
  // Fluid sticky top based on viewport height so it scales perfectly on all screens
  const stickyTop = isMobile ? 'auto' : `calc(5vh + ${index * 3}vh)`;

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer flex flex-col p-6 sm:p-10 md:p-16 rounded-[2rem] bg-app-surface border border-app-border/40 hover:border-app-text-secondary/50 transition-colors shadow-2xl h-auto min-h-[50vh] md:h-[clamp(400px,70vh,800px)] overflow-hidden ${isMobile ? 'relative mb-8' : 'sticky'}`}
      style={{ top: stickyTop }}
    >
      <div className="flex items-center justify-between mb-auto">
        <span className="px-4 py-2 rounded-full bg-app-bg border border-app-border/40 text-[clamp(0.7rem,1.5vw,0.75rem)] font-bold tracking-widest uppercase text-app-text-primary">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex items-center justify-center w-[clamp(2.5rem,6vw,3rem)] h-[clamp(2.5rem,6vw,3rem)] rounded-full bg-app-text-primary text-app-bg transform group-hover:scale-110 transition-transform shrink-0">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex flex-col gap-6 mt-8">
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-app-text-primary tracking-tighter leading-none group-hover:text-app-text-secondary transition-colors">
          {project.title}
        </h3>
        <p className="text-base md:text-lg lg:text-xl text-app-text-muted max-w-2xl leading-relaxed line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mt-4">
          {project.tech?.slice(0, 4).map((techItem) => (
            <span key={techItem} className="px-4 py-2 rounded-full bg-app-border/10 border border-app-border/20 text-sm font-medium text-app-text-secondary">
              {techItem}
            </span>
          ))}
        </div>

        {/* Direct Links */}
        <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-app-border/20" onClick={(e) => e.stopPropagation()}>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-app-text-primary hover:text-app-text-secondary transition-colors"
            >
              Live Site <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {project.source && (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-app-text-primary hover:text-app-text-secondary transition-colors ml-4"
            >
              <FaGithub className="w-4 h-4" /> Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────── */
export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-16 md:py-32 bg-app-bg relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-10 md:px-16 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 md:gap-6 mb-16 md:mb-32">
          <span className="text-sm font-semibold text-app-text-secondary uppercase tracking-widest">
            Selected Work
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-app-text-primary">
            Featured Projects.
          </h2>
        </div>

        {/* Sticky Stacked Project Container */}
        <div className="flex flex-col gap-12 pb-[20vh]">
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={idx} 
              total={PROJECTS_DATA.length}
              isMobile={isMobile}
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </div>

      </div>

      {/* MODAL PORTAL */}
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
