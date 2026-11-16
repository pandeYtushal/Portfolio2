import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { m } from "motion/react";
import { ExternalLink, Github, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS_DATA } from "../data/projects";
import { useSEO, BASE_URL } from "../hooks/useSEO";
import { softwareApplicationSchema, breadcrumbSchema } from "../lib/jsonld";

// ── Per-project JSON-LD injection ─────────────────────────────────────────
function ProjectStructuredData({ project }: { project: (typeof PROJECTS_DATA)[number] }) {
  useEffect(() => {
    const appId = `project-app-${project.id}`;
    const bcId = `project-bc-${project.id}`;

    const appSchema = softwareApplicationSchema({
      title: project.title,
      description: project.description,
      url: `${BASE_URL}/project/${project.id}`,
      image: project.image,
      tech: project.fullTech,
      status: project.status,
      link: project.link,
      source: project.source,
    });
    const bcSchema = breadcrumbSchema(project.title, project.id);

    [[appId, appSchema], [bcId, bcSchema]].forEach(([id, schema]) => {
      let el = document.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
      if (!el) {
        el = document.createElement("script");
        el.type = "application/ld+json";
        el.setAttribute("data-seo-id", id as string);
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    });

    return () => {
      [appId, bcId].forEach((id) => {
        document.querySelector(`script[data-seo-id="${id}"]`)?.remove();
      });
    };
  }, [project]);

  return null;
}

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

  // ── SEO for valid project ───────────────────────────────────────────────
  // Hook is always called (React rules); noindex is used for missing projects
  useSEO(
    project
      ? {
          title: `${project.title} — Case Study | Tushal Anand`,
          description: project.description,
          canonical: `${BASE_URL}/project/${project.id}`,
          ogImage: `${BASE_URL}${project.image}`,
          ogType: "article",
        }
      : {
          title: "Project Not Found | Tushal Anand",
          description: "The requested project could not be found.",
          canonical: `${BASE_URL}/project/${id ?? "unknown"}`,
          noindex: true,
        }
  );

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
    <>
      <ProjectStructuredData project={project} />
      <div className="project-page min-h-screen bg-app-bg text-app-text-primary overflow-x-clip selection:bg-app-text-primary selection:text-app-bg">
        
        {/* Navbar with Quick Prev / Next Controls */}
        <header className="project-page-nav fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 py-3.5 sm:py-5 flex justify-between items-center backdrop-blur-md border-b border-app-border/60 transition-colors">
          <button
            onClick={() => navigate("/#projects")}
            className="action-link action-link-back"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to Work</span>
            <span className="sm:hidden">Work</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
              to={`/project/${prevProject.id}`}
              className="action-link action-link-compact"
              title={`Previous: ${prevProject.title}`}
              aria-label="Previous Project"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Prev</span>
            </Link>

            <div className="case-id">
              {project.figNum}
            </div>

            <Link
              to={`/project/${nextProject.id}`}
              className="action-link action-link-compact"
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
            <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-app-text-secondary font-semibold mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <Link to="/" className="hover:text-app-text-primary transition-colors">Home</Link>
              <span className="text-app-border">/</span>
              <Link to="/#projects" className="hover:text-app-text-primary transition-colors">Work</Link>
              <span className="text-app-border">/</span>
              <span className="text-app-text-primary font-bold">{project.figNum}</span>
            </nav>

            {/* Title Block */}
            <div className="flex flex-col gap-6 sm:gap-8 mb-8 sm:mb-14">
              <m.h1
                layoutId={`project-title-${project.id}`}
                className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.04] sm:leading-[0.98] tracking-tight uppercase text-app-text-primary"
              >
                {project.title}
              </m.h1>

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
            <m.div
              layoutId={`project-image-${project.id}`}
              className="mb-10 sm:mb-16 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-app-border/80 bg-app-surface shadow-sm"
            >
              <img
                src={project.image}
                alt={`${project.title} — project screenshot`}
                className="w-full h-auto object-cover object-top contrast-105"
              />
            </m.div>

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
                  <h2 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">
                    Implementation
                  </h2>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-app-text-secondary">
                    {project.longDescription}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">
                    Engineering Decisions
                  </h2>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-app-text-secondary">
                    {project.engineeringDecisions}
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col gap-8 sm:gap-12 border-t md:border-none border-app-border/70 pt-8 md:pt-0">
                <div className="flex flex-col gap-3">
                  <h2 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">
                    Architecture Flow
                  </h2>
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
                  <h2 className="font-mono text-xs uppercase tracking-widest text-app-text-primary font-bold">
                    Full Tech Stack
                  </h2>
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
            <div className="detail-actions">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="action-link action-link-emphasis"
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
                  className="action-link"
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
                  className="action-link"
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
                  className="case-study-link order-1 md:order-2 group"
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
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-app-text-primary group-hover:text-amber-800 transition-colors">
                      {nextProject.title}
                    </h3>
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
                  className="case-study-link order-2 md:order-1 group"
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
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-app-text-primary group-hover:text-amber-800 transition-colors">
                      {prevProject.title}
                    </h3>
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
    </>
  );
};

export default ProjectPage;
