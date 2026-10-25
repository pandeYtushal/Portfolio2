import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS_DATA } from "../data/projects";
import PageTransition from "../components/PageTransition";

export const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS_DATA.find((p) => p.id === id);

  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === id);
  const totalProjects = PROJECTS_DATA.length;
  const prevProject = currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : PROJECTS_DATA[totalProjects - 1];
  const nextProject = currentIndex < totalProjects - 1 ? PROJECTS_DATA[currentIndex + 1] : PROJECTS_DATA[0];

  useEffect(() => {
    // Reset scroll whenever project ID changes
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-app-bg text-app-text-primary">
        <h1 className="text-4xl font-serif font-medium mb-4">Project Not Found</h1>
        <Link to="/" className="border-b border-app-text-primary uppercase tracking-widest text-xs font-semibold pb-1">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-app-bg text-app-text-primary overflow-x-clip selection:bg-app-text-primary selection:text-app-bg">
        
        {/* Navbar with Quick Prev / Next Controls */}
        <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 py-3.5 sm:py-5 flex justify-between items-center bg-[#F4F4F0]/95 backdrop-blur-md border-b border-app-border/60 transition-colors shadow-xs">
          <button
            onClick={() => navigate("/#projects")}
            className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-app-text-primary hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to Work</span>
            <span className="sm:hidden">Work</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
              to={`/project/${prevProject.id}`}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-md border border-app-border/80 hover:bg-app-surface text-app-text-secondary hover:text-app-text-primary font-mono text-[11px] uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95"
              title={`Previous: ${prevProject.title}`}
              aria-label="Previous Project"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Prev</span>
            </Link>

            <div className="px-2 py-0.5 rounded bg-app-surface border border-app-border/60 font-mono text-[10px] sm:text-xs font-bold text-app-text-primary uppercase tracking-widest">
              {project.figNum}
            </div>

            <Link
              to={`/project/${nextProject.id}`}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-md border border-app-text-primary/70 bg-app-text-primary text-app-surface sm:bg-transparent sm:text-app-text-primary sm:border-app-border/80 hover:bg-app-surface sm:hover:text-app-text-primary font-mono text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1 transition-all active:scale-95"
              title={`Next: ${nextProject.title}`}
              aria-label="Next Project"
            >
              <span className="hidden md:inline">Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        <main className="pt-24 sm:pt-36 pb-28 sm:pb-40 px-4 sm:px-8 md:px-12">
          <div className="max-w-6xl mx-auto">

            {/* Breadcrumb / Category Eyebrow */}
            <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-app-text-secondary font-semibold mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Chapter 03 &bull; Selected Work</span>
              <span className="text-app-border">/</span>
              <span className="text-app-text-primary font-bold">{project.figNum}</span>
            </div>

            {/* Title Block */}
            <div className="flex flex-col gap-6 sm:gap-8 mb-8 sm:mb-14">
              <motion.h1
                layoutId={`project-title-${project.id}`}
                className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.04] sm:leading-[0.98] tracking-tight uppercase text-app-text-primary"
              >
                {project.title}
              </motion.h1>

              <p className="font-sans text-base sm:text-xl md:text-2xl text-app-text-secondary leading-relaxed max-w-3xl font-medium">
                {project.description}
              </p>

              {/* Responsive Metadata Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 sm:pt-6 border-t border-app-border/70">
                <div className="flex flex-col gap-1 p-2.5 sm:p-0 rounded-lg sm:rounded-none bg-app-surface/60 sm:bg-transparent border sm:border-none border-app-border/60">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-app-text-secondary font-bold">Domain</span>
                  <span className="font-sans text-xs sm:text-sm font-semibold text-app-text-primary truncate">{project.tag.split("&")[0].trim()}</span>
                </div>
                <div className="flex flex-col gap-1 p-2.5 sm:p-0 rounded-lg sm:rounded-none bg-app-surface/60 sm:bg-transparent border sm:border-none border-app-border/60">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-app-text-secondary font-bold">Timeline</span>
                  <span className="font-sans text-xs sm:text-sm font-semibold text-app-text-primary">{project.timeline}</span>
                </div>
                <div className="flex flex-col gap-1 p-2.5 sm:p-0 rounded-lg sm:rounded-none bg-app-surface/60 sm:bg-transparent border sm:border-none border-app-border/60">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-app-text-secondary font-bold">Status</span>
                  <span className="font-sans text-xs sm:text-sm font-semibold text-emerald-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                    <span>{project.status}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Project Image Display (Clean Direct Image) */}
            <motion.div
              layoutId={`project-image-${project.id}`}
              className="mb-10 sm:mb-16 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-app-border/80 bg-app-surface shadow-sm"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover object-top contrast-105"
              />
            </motion.div>

            {/* The Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-14 mb-12 sm:mb-20 pt-8 sm:pt-12 border-t border-app-border/70">
              <div className="flex flex-col gap-3 p-5 sm:p-0 rounded-xl sm:rounded-none bg-app-surface/50 sm:bg-transparent border sm:border-none border-app-border/60">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-800 font-bold">
                  <span className="w-2 h-0.5 bg-amber-700" />
                  <span>The Problem</span>
                </div>
                <p className="font-sans text-sm sm:text-lg leading-relaxed text-app-text-secondary">
                  {project.problemStatement}
                </p>
              </div>

              <div className="flex flex-col gap-3 p-5 sm:p-0 rounded-xl sm:rounded-none bg-app-surface/50 sm:bg-transparent border sm:border-none border-app-border/60">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-800 font-bold">
                  <span className="w-2 h-0.5 bg-emerald-700" />
                  <span>The Intention</span>
                </div>
                <p className="font-sans text-sm sm:text-lg leading-relaxed text-app-text-secondary">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Symmetrical Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-8 mb-12 sm:mb-20 border-y border-app-border/70 py-6 sm:py-12">
              {project.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col gap-1 border-l sm:border-l-2 border-app-border/80 pl-2.5 sm:pl-6">
                  <span className="text-xl sm:text-4xl md:text-5xl font-serif font-medium text-app-text-primary leading-tight">
                    {metric.val}
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-app-text-secondary font-bold">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Deep Dive & Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-14 sm:mb-20">
              <div className="md:col-span-7 flex flex-col gap-8 sm:gap-12">
                <div className="flex flex-col gap-3">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">
                    Implementation
                  </h3>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-app-text-secondary">
                    {project.longDescription}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">
                    Engineering Decisions
                  </h3>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-app-text-secondary">
                    {project.engineeringDecisions}
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col gap-8 sm:gap-12 border-t md:border-none border-app-border/70 pt-8 md:pt-0">
                <div className="flex flex-col gap-3">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">
                    Architecture Flow
                  </h3>
                  <div className="flex flex-col gap-2.5 sm:gap-3">
                    {project.architectureSteps.map((step, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-3 p-3 rounded-lg bg-app-surface/50 border border-app-border/70 font-sans text-xs sm:text-sm font-medium text-app-text-primary"
                      >
                        <span className="font-mono text-[11px] font-bold text-app-text-secondary shrink-0">
                          0{i + 1}
                        </span>
                        <span className="truncate">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">
                    Full Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.fullTech.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 bg-app-surface border border-app-border rounded-md font-mono text-[11px] text-app-text-secondary font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Action Links */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 border-t border-app-border/70 pt-8 sm:pt-12">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-app-text-primary text-app-surface px-4 sm:px-8 h-12 font-mono text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs hover:opacity-90 active:scale-98 transition-all whitespace-nowrap"
                >
                  <span>Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              )}
              {project.source && (
                <a
                  href={project.source}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 sm:gap-2.5 border border-app-border/90 bg-app-surface hover:bg-app-surface-secondary text-app-text-primary px-4 sm:px-8 h-12 font-mono text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs active:scale-98 transition-all whitespace-nowrap"
                >
                  <span>Source Code</span>
                  <Github className="w-3.5 h-3.5 shrink-0" />
                </a>
              )}
            </div>

            {/* Sequential Case Study Trail: Next & Previous Project Modules */}
            <div className="mt-14 sm:mt-24 pt-8 sm:pt-12 border-t border-app-border/70 flex flex-col gap-6 sm:gap-8">
              {/* Chapter Indicator Bar */}
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-app-text-secondary font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Case Study Complete &mdash; {project.figNum}</span>
                </div>
                <button
                  onClick={() => navigate("/#projects")}
                  className="hover:text-app-text-primary transition-colors flex items-center gap-1"
                >
                  <span>Index</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Cards: Next Project takes priority on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Next Project (Primary on Mobile) */}
                <Link
                  to={`/project/${nextProject.id}`}
                  className="order-1 md:order-2 group flex flex-col justify-between p-5 sm:p-7 bg-app-surface border-2 border-app-text-primary/70 hover:border-app-text-primary rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg relative overflow-hidden"
                >
                  <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-app-border/60">
                    <span className="font-semibold text-app-text-primary">{nextProject.figNum}</span>
                    <span className="flex items-center gap-1.5 text-app-text-primary font-bold group-hover:translate-x-1 transition-transform">
                      <span>Next Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="py-4 sm:py-6 flex flex-col gap-1.5 sm:gap-2">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-app-text-secondary font-bold">
                      {nextProject.tag}
                    </span>
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-app-text-primary group-hover:text-amber-800 transition-colors">
                      {nextProject.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-app-text-secondary leading-relaxed line-clamp-2">
                      {nextProject.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-app-border/50 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-app-text-primary font-bold">
                    <span>Explore Next Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>

                {/* Previous Project */}
                <Link
                  to={`/project/${prevProject.id}`}
                  className="order-2 md:order-1 group flex flex-col justify-between p-5 sm:p-7 bg-app-surface/60 hover:bg-app-surface border border-app-border hover:border-app-text-primary/60 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-app-text-secondary pb-3 border-b border-app-border/60">
                    <span className="flex items-center gap-1.5 text-app-text-secondary group-hover:text-app-text-primary group-hover:-translate-x-1 transition-all">
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous Project</span>
                    </span>
                    <span className="font-semibold text-app-text-primary">{prevProject.figNum}</span>
                  </div>

                  <div className="py-4 sm:py-6 flex flex-col gap-1.5 sm:gap-2">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-app-text-secondary font-bold">
                      {prevProject.tag}
                    </span>
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-app-text-primary group-hover:text-amber-800 transition-colors">
                      {prevProject.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-app-text-secondary leading-relaxed line-clamp-2">
                      {prevProject.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-app-border/50 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-app-text-primary font-bold">
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    <span>Read Previous Study</span>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default ProjectPage;
