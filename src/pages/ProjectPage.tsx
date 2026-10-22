import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { PROJECTS_DATA } from "../data/projects";
import PageTransition from "../components/PageTransition";

export const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS_DATA.find((p) => p.id === id);

  useEffect(() => {
    // Reset scroll on mount
    window.scrollTo(0, 0);
  }, []);

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
        
        {/* Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-8 flex justify-between items-center bg-app-bg/90 backdrop-blur-md border-b border-app-border/50 transition-colors">
          <button
            onClick={() => navigate("/#projects")}
            className="group flex items-center gap-3 text-xs font-sans uppercase tracking-widest font-semibold hover:opacity-60 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Index
          </button>
          <div className="text-xs font-mono tracking-widest uppercase text-app-text-primary font-bold">
            {project.figNum}
          </div>
        </header>

        <main className="pt-32 pb-40 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">

            {/* Title Block */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12 mb-24">
              <div className="md:col-span-8 flex flex-col gap-8">
                <motion.h1
                  layoutId={`project-title-${project.id}`}
                  className="text-5xl sm:text-6xl md:text-8xl font-serif font-medium leading-[0.95] tracking-tight uppercase"
                >
                  {project.title}
                </motion.h1>
                <p className="font-sans text-xl md:text-2xl text-app-text-secondary leading-relaxed max-w-2xl font-medium">
                  {project.description}
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col gap-8 md:items-end md:text-right pt-2 md:pt-0 border-t md:border-none border-app-border">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-app-text-primary font-bold">Domain</span>
                  <span className="font-sans text-sm font-semibold text-app-text-secondary">{project.tag}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-app-text-primary font-bold">Timeline</span>
                  <span className="font-sans text-sm font-semibold text-app-text-secondary">{project.timeline}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-app-text-primary font-bold">Status</span>
                  <span className="font-sans text-sm font-semibold text-app-text-secondary">{project.status}</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <motion.div
              layoutId={`project-image-${project.id}`}
              className="w-full aspect-video md:aspect-[21/9] bg-app-surface border border-app-border overflow-hidden mb-24 p-2 sm:p-4"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            {/* The Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-32 pt-12 border-t border-app-border">
              <div className="md:col-span-6 flex flex-col gap-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">The Problem</h3>
                <p className="font-sans text-lg md:text-xl leading-relaxed text-app-text-secondary">
                  {project.problemStatement}
                </p>
              </div>
              <div className="md:col-span-6 flex flex-col gap-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">The Intention</h3>
                <p className="font-sans text-lg md:text-xl leading-relaxed text-app-text-secondary">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-32 border-y border-app-border py-16">
              {project.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col gap-2 border-l border-app-border pl-6">
                  <span className="text-4xl md:text-5xl font-serif font-medium text-app-text-primary">{metric.val}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-app-text-primary font-bold">{metric.label}</span>
                </div>
              ))}
            </div>

            {/* Deep Dive & Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-32">
              <div className="md:col-span-7 flex flex-col gap-16">
                <div className="flex flex-col gap-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">Implementation</h3>
                  <p className="font-sans text-base leading-relaxed text-app-text-secondary">
                    {project.longDescription}
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">Engineering Decisions</h3>
                  <p className="font-sans text-base leading-relaxed text-app-text-secondary">
                    {project.engineeringDecisions}
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col gap-16 border-t md:border-none border-app-border pt-12 md:pt-0">
                <div className="flex flex-col gap-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">Architecture</h3>
                  <div className="flex flex-col gap-4">
                    {project.architectureSteps.map((step, i) => (
                      <div key={i} className="flex items-center gap-4 font-sans text-sm font-medium text-app-text-secondary border-b border-app-border pb-4">
                        <span className="font-mono text-xs text-app-text-primary font-bold">0{i + 1}</span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.fullTech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-app-surface border border-app-border font-sans text-xs text-app-text-secondary font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-6 border-t border-app-border pt-16">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-4 bg-app-text-primary text-app-bg px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest hover:bg-app-text-secondary transition-colors"
                >
                  View Live Site <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.source && (
                <a
                  href={project.source}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-4 border border-app-text-primary text-app-text-primary px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest hover:bg-app-surface transition-colors"
                >
                  Source Code <Github className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default ProjectPage;
