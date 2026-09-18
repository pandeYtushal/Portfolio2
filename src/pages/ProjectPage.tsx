import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
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
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/" className="underline text-app-text-secondary hover:text-app-text-primary">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-app-bg text-app-text-primary overflow-x-hidden">
        {/* Navbar / Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-8 flex justify-between items-center mix-blend-difference text-white">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back
        </button>
        <div className="text-xs font-medium tracking-widest opacity-50 uppercase">
          {project.figNum}
        </div>
      </header>

      <main className="pb-32 pt-32 sm:pt-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-10">

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end mb-16 sm:mb-24">
            <div className="lg:col-span-8 flex flex-col">
              <motion.h1
                layoutId={`project-title-${project.id}`}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.85] mb-6"
              >
                {project.title}
              </motion.h1>
              <p className="text-lg sm:text-xl md:text-2xl text-app-text-muted font-medium max-w-2xl">
                {project.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-8 lg:items-end">
              <div className="flex flex-wrap lg:justify-end gap-3">
                {project.metricPills.slice(0, 4).map((pill) => (
                  <span
                    key={pill}
                    className="px-4 py-2 border border-app-border/40 rounded-full text-xs font-medium tracking-wide"
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-app-text-primary text-app-bg px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-app-text-secondary transition-colors"
                >
                  Live Site <ExternalLink className="w-4 h-4" />
                </a>
                {project.source && (
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border border-app-border/40 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:border-app-text-primary transition-colors"
                  >
                    Code <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <motion.div
            layoutId={`project-image-${project.id}`}
            className="w-full aspect-video md:aspect-[21/9] bg-app-surface/50 rounded-2xl sm:rounded-3xl overflow-hidden relative mb-24 sm:mb-32 group"
          >
            <div className="absolute inset-0 bg-app-text-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 object-top"
            />
          </motion.div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-32">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-app-text-muted mb-6">The Challenge</h3>
              <p className="text-xl sm:text-2xl leading-relaxed text-app-text-secondary font-medium">
                {project.problemStatement}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-app-text-muted mb-6">The Solution</h3>
              <p className="text-xl sm:text-2xl leading-relaxed text-app-text-secondary font-medium">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-32 border-y border-app-border/40 py-16">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col border-l border-app-border/40 pl-6">
                <span className="text-5xl sm:text-6xl font-bold tracking-tighter mb-2">{metric.val}</span>
                <span className="text-sm font-medium uppercase tracking-widest text-app-text-muted">{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-app-text-muted mb-6">Deep Dive</h3>
              <p className="text-lg leading-relaxed text-app-text-secondary mb-8">
                {project.longDescription}
              </p>
              <h3 className="text-sm font-bold uppercase tracking-widest text-app-text-muted mb-6 mt-12">Engineering</h3>
              <p className="text-lg leading-relaxed text-app-text-secondary">
                {project.engineeringDecisions}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-app-text-muted mb-6">Architecture</h3>
              <div className="flex flex-col gap-4 mb-12">
                {project.architectureSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-4 text-lg font-medium text-app-text-secondary border-b border-app-border/40 pb-4">
                    <span className="text-xs text-app-text-muted opacity-50">0{i + 1}</span>
                    {step}
                  </div>
                ))}
              </div>

              <h3 className="text-sm font-bold uppercase tracking-widest text-app-text-muted mb-6">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.fullTech.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-app-surface/50 border border-app-border/40 rounded-md text-sm text-app-text-secondary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Next Project CTA (Optional, but looks amazing for SPAs) */}
      <div className="w-full bg-app-text-primary text-app-bg py-32 flex flex-col items-center justify-center text-center px-4">
        <span className="text-sm font-bold uppercase tracking-widest opacity-50 mb-6">Keep Exploring</span>
        <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter uppercase mb-12">
          Ready for more?
        </h2>
        <button
          onClick={() => navigate("/")}
          className="group flex items-center justify-center gap-4 bg-app-bg text-app-text-primary px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105"
        >
          View All Work
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      </div>
    </PageTransition>
  );
};

export default ProjectPage;
