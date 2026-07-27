import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Terminal, ArrowUpRight } from "lucide-react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { PROJECTS_DATA, type Project } from "../data/projects";

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? PROJECTS_DATA : PROJECTS_DATA.slice(0, 4);

  useEffect(() => {
    if (showAll) {
      const timer = setTimeout(() => {
        const element = document.getElementById("project-card-cab");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
    return () => { };
  }, [showAll]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="bg-app-bg relative border-t border-app-border px-6 py-24">
      {/* Blueprint Grid Lines corner cross decoration */}
      <div className="absolute top-0 left-0 bottom-0 right-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-10 left-10 text-zinc-800 font-mono text-xs">+</div>
        <div className="absolute top-10 right-10 text-zinc-800 font-mono text-xs">+</div>
        <div className="absolute bottom-10 left-10 text-zinc-800 font-mono text-xs">+</div>
        <div className="absolute bottom-10 right-10 text-zinc-800 font-mono text-xs">+</div>
      </div>

      <div className="mx-auto max-w-6xl text-left">
        {/* Header Block */}
        <div className="space-y-4 mb-16">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-3">
            02 / PROJECTS
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-app-text-primary leading-[1.05]">
            PROJECTS THAT PERFORM.
          </h2>
          <p className="max-w-2xl text-xs font-mono leading-relaxed text-app-text-secondary">
            Harnessing low-latency state orchestration, client-side canvas processing, and high-performance physics-based layouts.
          </p>
        </div>

        {/* Blueprint Figures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="group relative bg-[#F6D42D] border border-zinc-950/20 rounded-none p-5 flex flex-col justify-between hover:border-zinc-950/40 hover:shadow-lg hover:shadow-[#F6D42D]/5 transition-all duration-300 overflow-hidden min-h-[420px]"
            >
              {/* Corners Crosshairs decoration */}
              <div className="absolute top-2 left-2 text-zinc-950/30 text-[10px] font-mono select-none">+</div>
              <div className="absolute top-2 right-2 text-zinc-950/30 text-[10px] font-mono select-none">+</div>
              <div className="absolute bottom-2 left-2 text-zinc-950/30 text-[10px] font-mono select-none">+</div>
              <div className="absolute bottom-2 right-2 text-zinc-950/30 text-[10px] font-mono select-none">+</div>

              <div className="absolute top-1.5 right-6 font-mono text-[9px] font-extrabold text-zinc-950 select-none">{project.figNum}</div>

              <div>
                {/* Screenshot Frame */}
                <div className="h-44 w-full mb-4">
                  <div className="relative h-full w-full bg-zinc-950 bg-blueprint-grid border border-zinc-950/25 flex items-center justify-center overflow-hidden rounded-none">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="w-[92%] h-[92%] object-cover rounded-none border border-zinc-950/30 opacity-75 group-hover:opacity-100"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const next = e.currentTarget.nextElementSibling as HTMLElement;
                        if (next) next.classList.remove("hidden");
                      }}
                    />
                    <div className="absolute inset-0 hidden flex flex-col items-center justify-center text-zinc-500">
                      <Terminal className="h-6 w-6 text-[#F6D42D] animate-pulse" />
                      <span className="text-[8px] font-mono mt-1">NO IMAGE</span>
                    </div>
                  </div>
                </div>

                {/* Tag & Info */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="rounded border border-zinc-950/30 bg-zinc-950/5 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-950">
                      {project.status}
                    </span>
                    <span className="text-[9px] text-zinc-800 font-mono">{project.timeline}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-zinc-950 tracking-tight group-hover:text-black transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-[10px] font-mono text-zinc-800 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Footer CTAs Row */}
              <div className="mt-5 pt-4 border-t border-zinc-950/15 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 hover:text-black transition-colors cursor-pointer"
                >
                  <span>Project Details</span>
                  <ArrowRight className="h-3 w-3 text-zinc-950" />
                </button>

                <div className="flex gap-2">
                  {project.source && (
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      className="flex h-8 w-8 items-center justify-center rounded border border-zinc-950/15 bg-zinc-950/5 text-zinc-950 hover:bg-zinc-950/10 hover:text-black transition-all active:scale-95"
                    >
                      <FaGithub className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live Demo"
                      className="flex h-8 w-8 items-center justify-center rounded border border-zinc-950/15 bg-zinc-950/5 text-zinc-950 hover:bg-zinc-950/10 hover:text-black transition-all active:scale-95"
                    >
                      <FaExternalLinkAlt className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Trigger Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 border-2 border-app-accent bg-app-surface px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-app-accent hover:bg-app-accent hover:text-black transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span>{showAll ? "Show Less" : "Show More Projects"}</span>
          </button>
        </div>
      </div>

      {/* Project Details Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />

            {/* Centered Project Details Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              data-lenis-prevent
              className="relative w-full max-w-3xl max-h-[85vh] border border-app-border bg-app-surface p-6 md:p-10 shadow-2xl shadow-black/10 dark:shadow-white/5 overflow-y-auto rounded-2xl z-10 text-left"
            >
              {/* Header close */}
              <div className="flex justify-between items-center pb-6 border-b border-app-border">
                <div className="flex items-center gap-2.5">
                  <span className="rounded border border-app-text-primary bg-app-text-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-app-bg">
                    Project Details
                  </span>
                  <span className="text-[10px] text-app-text-muted font-mono">{selectedProject.timeline}</span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="h-8 w-8 rounded-md border border-app-border bg-app-surface-secondary flex items-center justify-center text-app-text-secondary hover:text-app-text-primary hover:border-app-text-primary/40 transition-all cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Main Body */}
              <div className="mt-8 space-y-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-app-text-primary">
                    {selectedProject.title}
                  </h1>
                  {selectedProject.urlDomain && (
                    <p className="mt-2 text-xs font-mono text-app-text-primary font-bold">{selectedProject.urlDomain}</p>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-app-text-secondary">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Challenges & Solutions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-app-text-primary border-b border-app-border pb-2">The Architecture Challenge</h3>
                  <p className="text-xs md:text-sm leading-relaxed text-app-text-secondary">
                    {selectedProject.challenges}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-app-text-primary border-b border-app-border pb-2">The Engineered Solution</h3>
                  <p className="text-xs md:text-sm leading-relaxed text-app-text-secondary">
                    {selectedProject.solution}
                  </p>
                </div>

                {/* Details / What I Built */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-app-text-primary border-b border-app-border pb-2">Technical Contributions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {selectedProject.whatIBuilt.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl border border-app-border bg-app-surface-secondary">
                        <CheckCircle className="h-4 w-4 text-app-text-primary shrink-0 mt-0.5" />
                        <span className="text-xs leading-relaxed text-app-text-secondary">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Stack Tech stack */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-app-text-primary border-b border-app-border pb-2">Orchestration Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.fullTech.map((tech, idx) => (
                      <span key={idx} className="rounded border border-app-border bg-app-surface-secondary px-3 py-1 text-xs font-mono text-app-text-secondary">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex items-center gap-4 pt-6 border-t border-app-border">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center gap-2 rounded-md bg-app-text-primary px-5 text-xs font-bold text-app-bg transition-all hover:opacity-90 active:scale-95"
                    >
                      <span>Launch Live Demo</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {selectedProject.source && (
                    <a
                      href={selectedProject.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center gap-2 rounded-md border border-app-border bg-app-surface-secondary hover:bg-app-surface-secondary/80 px-5 text-xs font-semibold text-app-text-secondary hover:text-app-text-primary transition-all active:scale-95"
                    >
                      <FaGithub className="h-4 w-4" />
                      <span>View GitHub Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
