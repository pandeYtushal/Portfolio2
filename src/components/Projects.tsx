import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PROJECTS_DATA, type Project } from "../data/projects";

/* ─────────────────────────────────────────────────
   PROJECT CARD (STICKY)
───────────────────────────────────────────────── */
const ProjectCard = ({ project, index, total, isMobile }: { project: Project; index: number; total: number; isMobile: boolean }) => {
  const navigate = useNavigate();
  // Fluid sticky top based on viewport height so it scales perfectly on all screens
  const stickyTop = isMobile ? 'auto' : `calc(5vh + ${index * 3}vh)`;

  return (
    <div
      onClick={() => navigate(`/project/${project.id}`)}
      data-cursor="view"
      className={`group cursor-pointer flex flex-col p-6 sm:p-10 md:p-16 rounded-[2rem] bg-app-surface border border-app-border/40 hover:border-app-text-secondary/50 transition-colors shadow-2xl h-auto min-h-[50vh] md:h-[clamp(400px,75vh,800px)] overflow-hidden ${isMobile ? 'relative mb-8' : 'sticky'}`}
      style={{ top: stickyTop }}
    >
      <div className="flex items-center justify-between mb-auto z-10">
        <span className="px-4 py-2 rounded-full bg-app-bg border border-app-border/40 text-[clamp(0.7rem,1.5vw,0.75rem)] font-bold tracking-widest uppercase text-app-text-primary">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex items-center justify-center w-[clamp(2.5rem,6vw,3rem)] h-[clamp(2.5rem,6vw,3rem)] rounded-full bg-app-text-primary text-app-bg transform group-hover:scale-110 transition-transform shrink-0">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
      
      {/* Background Image behind the card for visual flair */}
      <motion.div 
        layoutId={`project-image-${project.id}`}
        className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 hidden md:block"
      >
         <div className="absolute inset-0 bg-gradient-to-t from-app-surface via-app-surface/90 to-transparent z-10" />
         <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
      </motion.div>

      <div className="flex flex-col gap-6 mt-8 z-10">
        <motion.h3 
          layoutId={`project-title-${project.id}`}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-app-text-primary tracking-tighter leading-none group-hover:text-app-text-secondary transition-colors"
        >
          {project.title}
        </motion.h3>
        <p className="text-base md:text-lg lg:text-xl text-app-text-muted max-w-2xl leading-relaxed line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mt-4">
          {project.tech?.slice(0, 4).map((techItem) => (
            <span key={techItem} className="px-4 py-2 rounded-full bg-app-border/10 border border-app-border/20 text-sm font-medium text-app-text-secondary backdrop-blur-md">
              {techItem}
            </span>
          ))}
        </div>

        {/* Direct Links */}
        <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-app-border/20 relative z-20" onClick={(e) => e.stopPropagation()}>
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
            />
          ))}
        </div>

        {/* View More on GitHub */}
        <div className="flex justify-center mt-[-10vh] pb-32 relative z-20">
          <a
            href="https://github.com/pandeYtushal"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-app-surface border border-app-border/40 hover:border-app-text-primary px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest text-app-text-primary transition-all hover:bg-app-text-primary hover:text-app-bg"
          >
            View More on GitHub
            <FaGithub className="w-5 h-5 transition-transform group-hover:scale-110" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;
