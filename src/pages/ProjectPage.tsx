import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { m } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Zap
} from "lucide-react";
import { PROJECTS_DATA, Project } from "../data/projects";
import { useSEO, BASE_URL } from "../hooks/useSEO";
import { softwareApplicationSchema, breadcrumbSchema } from "../lib/jsonld";
import { Button } from "@cred/neopop-web/lib/components";
import Footer from "../components/Footer";

// ── Per-project JSON-LD injection ─────────────────────────────────────────
function ProjectStructuredData({ project }: { project: Project }) {
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

  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useSEO(
    project
      ? {
          title: `${project.title} — Systems & Architecture Case Study | Tushal Anand`,
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-app-bg text-app-text-primary px-4 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">404 // ROUTE EXCEPTION</span>
        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight mb-4">Project Not Found</h1>
        <p className="text-neutral-400 text-sm max-w-md mb-6">
          The requested engineering case study does not exist or has been relocated in the portfolio index.
        </p>
        <Button
          variant="primary"
          kind="elevated"
          size="medium"
          colorMode="dark"
          onClick={() => navigate("/#projects")}
        >
          Return to Projects ↘
        </Button>
      </div>
    );
  }

  return (
    <>
      <ProjectStructuredData project={project} />
      <div className="project-page min-h-screen bg-[#090909] text-app-text-primary overflow-x-clip selection:bg-white selection:text-black">
        
        {/* Fixed Navigation Bar */}
        <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 md:px-12 py-3 sm:py-4 flex justify-between items-center bg-[#090909]/85 backdrop-blur-md border-b border-white/[0.08] transition-colors">
          <Button
            variant="secondary"
            kind="flat"
            size="small"
            colorMode="dark"
            onClick={() => navigate("/#projects")}
            aria-label="Back to projects index"
          >
            ← Back to Work
          </Button>

          {/* Center Case Index Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white/[0.03] border border-white/10 font-mono text-[11px] uppercase tracking-wider text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-400 font-semibold">{project.figNum}</span>
            <span className="text-neutral-600">/</span>
            <span className="text-white font-medium truncate max-w-[180px]">{project.title}</span>
          </div>

          {/* Quick Prev / Next Switchers */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to={`/project/${prevProject.id}`}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-none bg-white/[0.03] hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all font-mono text-[11px] uppercase tracking-wider"
              title={`Previous: ${prevProject.title}`}
              aria-label="Previous Case Study"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Prev</span>
            </Link>

            <span className="font-mono text-xs text-neutral-500 font-semibold px-1">
              {currentIndex + 1} / {totalProjects}
            </span>

            <Link
              to={`/project/${nextProject.id}`}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-none bg-white/[0.03] hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all font-mono text-[11px] uppercase tracking-wider"
              title={`Next: ${nextProject.title}`}
              aria-label="Next Case Study"
            >
              <span className="hidden md:inline">Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main id="main-content" className="pt-24 sm:pt-32 pb-20 sm:pb-32 px-4 sm:px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex flex-col gap-10 sm:gap-14">

            {/* Breadcrumb & Category Eyebrow */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 sm:gap-2.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-neutral-400 font-semibold flex-wrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <Link to="/" className="hover:text-white transition-colors">HOME</Link>
              <span className="text-neutral-600">/</span>
              <Link to="/#projects" className="hover:text-white transition-colors">WORK</Link>
              <span className="text-neutral-600">/</span>
              <span className="text-white font-bold">{project.figNum}</span>
              <span className="text-neutral-600 hidden sm:inline">·</span>
              <span className="text-neutral-500 hidden sm:inline">{project.tag}</span>
            </nav>

            {/* Title & Narrative Lead */}
            <div className="flex flex-col gap-5 sm:gap-7">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-neutral-500 uppercase font-semibold">
                  SYSTEM DESIGN &amp; TECHNICAL DEEP DIVE
                </span>
                <m.h1
                  layoutId={`project-title-${project.id}`}
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight uppercase text-white"
                >
                  {project.title}
                  <span className="text-neutral-500">.</span>
                </m.h1>
              </div>

              <p className="font-sans text-base sm:text-xl md:text-2xl text-neutral-300 leading-relaxed max-w-3xl font-normal">
                {project.description}
              </p>

              {/* NeoPOP Technical Specification Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                <div className="p-3 sm:p-4 rounded-none bg-[#111114] border border-white/[0.08] shadow-[3px_3px_0px_#18181b] flex flex-col justify-between gap-1">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                    DOMAIN
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-medium text-white truncate">
                    {project.tag.split("&")[0].trim()}
                  </span>
                </div>

                <div className="p-3 sm:p-4 rounded-none bg-[#111114] border border-white/[0.08] shadow-[3px_3px_0px_#18181b] flex flex-col justify-between gap-1">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                    TIMELINE
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-medium text-white">
                    {project.timeline}
                  </span>
                </div>

                <div className="p-3 sm:p-4 rounded-none bg-[#111114] border border-white/[0.08] shadow-[3px_3px_0px_#18181b] flex flex-col justify-between gap-1">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                    SYSTEM STATUS
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-medium text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="truncate">{project.status}</span>
                  </span>
                </div>

                <div className="p-3 sm:p-4 rounded-none bg-[#111114] border border-white/[0.08] shadow-[3px_3px_0px_#18181b] flex flex-col justify-between gap-1">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                    ENGINEERING HIGHLIGHT
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-medium text-neutral-200 truncate" title={project.highlight}>
                    {project.impact}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Prominent Header Deployment */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap pt-2">
                {project.link && (
                  <Button
                    variant="primary"
                    kind="elevated"
                    size="medium"
                    colorMode="dark"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    Live Production System ↗
                  </Button>
                )}
                {project.source && (
                  <Button
                    variant="secondary"
                    kind="elevated"
                    size="medium"
                    colorMode="dark"
                    onClick={() => window.open(project.source, "_blank")}
                  >
                    Source Code ↗
                  </Button>
                )}
              </div>
            </div>

            {/* Obsidian Metallic Showcase Visual Frame */}
            <div className="relative w-full rounded-none overflow-hidden bg-[#101012] border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              {/* Precision Specular Top Glint */}
              <div className="pointer-events-none absolute -top-[1px] left-10 sm:left-16 right-10 sm:right-16 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent z-20" />

              {/* Technical Titlebar */}
              <div className="px-4 py-2.5 sm:px-6 sm:py-3 border-b border-white/[0.08] bg-[#0c0c0e] flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="uppercase tracking-wider font-semibold text-neutral-300">
                    {project.title} · ARCHITECTURAL INSPECTOR
                  </span>
                </div>
                <span className="text-neutral-500 hidden sm:inline tracking-widest">
                  FIG. {project.figNum} · 1920 × 1080 ENCODED
                </span>
              </div>

              {/* Inner Showcase Content */}
              <div className="relative p-2 sm:p-4 bg-[#0a0a0c]">
                {/* Precision Corner L-Marks */}
                <span className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40 z-20" />
                <span className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40 z-20" />
                <span className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40 z-20" />
                <span className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40 z-20" />

                {project.id === "civic" ? (
                  <div className="p-4 sm:p-8 bg-[#0c0c0e] text-neutral-100 flex flex-col gap-6" aria-label="Smart Civic Platform Interface">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-300 font-bold">
                          MUNICIPAL OPERATIONS BOARD · LIVE DISPATCH
                        </span>
                      </div>
                      <span className="font-mono text-[10px] sm:text-xs text-neutral-400 font-semibold">
                        REALTIME TICKET PIPELINE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                      <div className="p-4 rounded-none bg-[#141418] border border-white/10 flex flex-col justify-between min-h-[140px]">
                        <div>
                          <span className="font-mono text-[10px] uppercase text-neutral-500 font-bold">TICKET #CW-8924</span>
                          <h4 className="text-sm sm:text-base font-semibold mt-1 text-white">Street Light Grid Failure</h4>
                          <p className="text-xs text-neutral-400 mt-1">Ward 04 · Central Colony</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs font-mono">
                          <span className="text-amber-400 font-medium">● In Review</span>
                          <span className="text-neutral-500">Canvas 72% compressed</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-none bg-[#141418] border border-white/10 flex flex-col justify-between min-h-[140px]">
                        <div>
                          <span className="font-mono text-[10px] uppercase text-neutral-500 font-bold">TICKET #CW-8925</span>
                          <h4 className="text-sm sm:text-base font-semibold mt-1 text-white">Mainline Water Pressure Drop</h4>
                          <p className="text-xs text-neutral-400 mt-1">Ward 02 · Sector 9 Junction</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs font-mono">
                          <span className="text-emerald-400 font-medium">● Resolved</span>
                          <span className="text-neutral-500">Firestore sync &lt;50ms</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-none bg-[#141418] border border-white/10 flex flex-col justify-between min-h-[140px]">
                        <div>
                          <span className="font-mono text-[10px] uppercase text-neutral-500 font-bold">TICKET #CW-8926</span>
                          <h4 className="text-sm sm:text-base font-semibold mt-1 text-white">Pothole Repair Work Order</h4>
                          <p className="text-xs text-neutral-400 mt-1">Ward 07 · Metro Corridor</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs font-mono">
                          <span className="text-sky-400 font-medium">● Submitted</span>
                          <span className="text-neutral-500">PWA Offline Queued</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] sm:text-xs text-neutral-400">
                      <span>PIPELINE: CLIENT-SIDE HTML5 CANVAS ENCODING</span>
                      <span className="text-emerald-400 font-semibold">ALL CITIZEN REPORTS ENCRYPTED &amp; SYNCED</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-[16/9] sm:aspect-[16/9.5] max-h-[580px] overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={`${project.title} — project screenshot`}
                      className="w-full h-full object-cover object-top hover:scale-[1.015] transition-transform duration-700 contrast-105"
                      loading="eager"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Symmetrical Performance Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-6 rounded-none bg-[#0e0e11] border border-white/[0.08] shadow-[4px_4px_0px_#18181b] flex flex-col justify-between gap-1 sm:gap-2 transition-transform hover:-translate-y-0.5"
                >
                  <span className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-none">
                    {metric.val}
                  </span>
                  <span className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-neutral-400 font-bold">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Problem vs Architectural Solution Cards (NeoPOP Comparative) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Problem Statement Card */}
              <div className="p-5 sm:p-7 rounded-none bg-[#0e0e11] border border-white/[0.09] shadow-[5px_5px_0px_#18181b] flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-bold">
                    <span className="w-2 h-0.5 bg-amber-400" />
                    <span>01 // THE CHALLENGE</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight">
                    Friction &amp; Constraints
                  </h3>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-300 font-normal">
                    {project.problemStatement}
                  </p>
                </div>
                {project.challenges && (
                  <div className="pt-3 border-t border-white/[0.07] font-mono text-xs text-neutral-400 leading-relaxed">
                    <strong className="text-neutral-300 font-semibold uppercase tracking-wider block mb-1">
                      Technical Hurdle:
                    </strong>
                    {project.challenges}
                  </div>
                )}
              </div>

              {/* Solution Card */}
              <div className="p-5 sm:p-7 rounded-none bg-[#0e0e11] border border-white/[0.09] shadow-[5px_5px_0px_#18181b] flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-emerald-400 font-bold">
                    <span className="w-2 h-0.5 bg-emerald-400" />
                    <span>02 // ARCHITECTURAL SOLUTION</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight">
                    Implementation Strategy
                  </h3>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-300 font-normal">
                    {project.solution}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between font-mono text-xs text-neutral-400">
                  <span className="uppercase text-neutral-500 font-semibold tracking-wider">RESULTING IMPACT:</span>
                  <span className="text-emerald-400 font-bold">{project.impact}</span>
                </div>
              </div>
            </div>

            {/* Modular What Was Built / Core Subsystems */}
            {project.whatIBuilt && project.whatIBuilt.length > 0 && (
              <div className="flex flex-col gap-4 sm:gap-6 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 font-bold">
                      ENGINEERING CAPABILITIES
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white mt-1">
                      Subsystems Built &amp; Shipped
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-neutral-500">
                    {project.whatIBuilt.length} MODULES
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {project.whatIBuilt.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 sm:p-5 rounded-none bg-[#0d0d10] border border-white/[0.08] hover:border-white/20 shadow-[3px_3px_0px_#18181b] transition-all flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-center justify-between text-neutral-500 font-mono text-xs">
                        <span className="font-bold text-neutral-400">0{i + 1}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deep Dive & Architecture Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-4 border-t border-white/[0.08]">
              {/* Left Column: Narrative Analysis */}
              <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 font-bold">
                    SYSTEM EXECUTION
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
                    Implementation Discipline
                  </h3>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-300 font-normal">
                    {project.longDescription}
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-white/[0.06]">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 font-bold">
                    TRADE-OFFS &amp; ARCHITECTURE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
                    Engineering Decisions
                  </h3>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-300 font-normal">
                    {project.engineeringDecisions}
                  </p>
                </div>

                {project.futureImprovements && (
                  <div className="p-4 sm:p-5 rounded-none bg-[#0d0d10] border border-white/[0.07] flex flex-col gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      SCALABILITY &amp; ROADMAP
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {project.futureImprovements}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Pipeline Steps & Full Tech Envelope */}
              <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
                {/* Architecture Pipeline Flow */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 font-bold">
                    DATA FLOW
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
                    Architecture Flow
                  </h3>

                  <div className="flex flex-col gap-2 pt-1">
                    {project.architectureSteps.map((step, i) => (
                      <div
                        key={i}
                        onMouseEnter={() => setActiveStep(i)}
                        onMouseLeave={() => setActiveStep(null)}
                        className={`flex items-center gap-3 p-3 sm:p-3.5 rounded-none border transition-all duration-200 cursor-default ${
                          activeStep === i
                            ? "bg-white/[0.08] border-white/30 translate-x-1"
                            : "bg-[#0e0e11] border-white/[0.07] hover:border-white/20"
                        }`}
                      >
                        <span className="font-mono text-xs font-bold text-neutral-400 shrink-0">
                          0{i + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-neutral-200 font-medium">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complete Technology Envelope */}
                <div className="flex flex-col gap-3 pt-4 border-t border-white/[0.06]">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 font-bold">
                    DEPENDENCY SPECS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
                    Full Tech Envelope
                  </h3>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.fullTech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-none bg-[#0f0f13] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-colors font-mono text-xs text-neutral-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap pt-6 border-t border-white/[0.08]">
              {project.link && (
                <Button
                  variant="primary"
                  kind="elevated"
                  size="medium"
                  colorMode="dark"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  Launch Live System ↗
                </Button>
              )}
              {project.source && (
                <Button
                  variant="secondary"
                  kind="elevated"
                  size="medium"
                  colorMode="dark"
                  onClick={() => window.open(project.source, "_blank")}
                >
                  Inspect Source Code ↗
                </Button>
              )}
            </div>

            {/* Sequential Case Study Trail: Redesigned as The Architectural Vault / Visual System Cycler */}
            <div className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-white/[0.12] flex flex-col gap-6 sm:gap-8">
              
              {/* Header Bar with Quick Index Cycler */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CASE STUDY COMPLETE · {project.figNum}</span>
                </div>

                {/* All Systems Fast Cycler Tabs */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {PROJECTS_DATA.map((p, idx) => {
                    const isCurrent = p.id === project.id;
                    return (
                      <Link
                        key={p.id}
                        to={`/project/${p.id}`}
                        className={`px-2.5 py-1 rounded-none font-mono text-[10px] tracking-wider uppercase transition-all border ${
                          isCurrent
                            ? "bg-white text-black font-bold border-white shadow-sm"
                            : "bg-[#111114] text-neutral-400 hover:text-white border-white/10 hover:border-white/20"
                        }`}
                        title={p.title}
                      >
                        0{idx + 1} {p.title.split(" ")[0]}
                      </Link>
                    );
                  })}
                  <button
                    onClick={() => navigate("/#projects")}
                    className="ml-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                  >
                    <span>INDEX ↗</span>
                  </button>
                </div>
              </div>

              {/* Dual Visual Viewport Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
                
                {/* Previous Project Visual Card */}
                <Link
                  to={`/project/${prevProject.id}`}
                  className="group relative flex flex-col justify-between rounded-none bg-[#0c0c0e] border border-white/[0.1] hover:border-white/30 shadow-[4px_4px_0px_#18181b] hover:shadow-[7px_7px_0px_#222] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                  aria-label={`Previous Project: ${prevProject.title}`}
                >
                  {/* Top Bar HUD */}
                  <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-b border-white/[0.08] bg-[#0f0f13] flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1.5 text-neutral-400 group-hover:text-white transition-colors">
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      <span className="font-semibold uppercase tracking-wider">PREVIOUS SYSTEM</span>
                    </span>
                    <span className="font-bold text-neutral-300">{prevProject.figNum}</span>
                  </div>

                  {/* Thumbnail Visual Viewport with HUD Overlay */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black border-b border-white/[0.08]">
                    <img
                      src={prevProject.image}
                      alt={prevProject.title}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 contrast-105 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-90 pointer-events-none" />
                    
                    {/* Viewport Corner Brackets */}
                    <span className="pointer-events-none absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/40" />
                    <span className="pointer-events-none absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/40" />
                    <span className="pointer-events-none absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/40" />
                    <span className="pointer-events-none absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/40" />

                    {/* Floating Metric Pill */}
                    <div className="absolute bottom-2.5 left-3 px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-white/20 font-mono text-[9px] uppercase tracking-wider text-neutral-300">
                      {prevProject.impact}
                    </div>
                  </div>

                  {/* Narrative Body */}
                  <div className="p-4 sm:p-6 flex flex-col gap-2">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                      {prevProject.tag}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-medium text-white group-hover:text-amber-300 transition-colors tracking-tight">
                      {prevProject.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2">
                      {prevProject.description}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-white/[0.07] bg-[#0e0e12] flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-neutral-300 group-hover:text-white font-bold">
                    <span className="flex items-center gap-1.5">
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1.5 transition-transform" />
                      <span>Explore {prevProject.title}</span>
                    </span>
                    <span className="text-neutral-500 group-hover:text-neutral-300">FIG. {prevProject.figNum}</span>
                  </div>
                </Link>

                {/* Next Project Visual Card (Flagship Next Focus) */}
                <Link
                  to={`/project/${nextProject.id}`}
                  className="group relative flex flex-col justify-between rounded-none bg-[#0c0c0e] border border-white/[0.15] hover:border-white/40 shadow-[5px_5px_0px_#18181b] hover:shadow-[8px_8px_0px_#fff]/10 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                  aria-label={`Next Project: ${nextProject.title}`}
                >
                  {/* Top Specular Accent Glint for Up Next */}
                  <div className="pointer-events-none absolute -top-[1px] left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent z-20" />

                  {/* Top Bar HUD */}
                  <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-b border-white/[0.08] bg-[#0f0f13] flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
                    <span className="font-bold text-neutral-400">{nextProject.figNum}</span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                      <span className="uppercase tracking-wider">UP NEXT // ADVANCE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Thumbnail Visual Viewport with HUD Overlay */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black border-b border-white/[0.08]">
                    <img
                      src={nextProject.image}
                      alt={nextProject.title}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 contrast-105 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-90 pointer-events-none" />
                    
                    {/* Viewport Corner Brackets */}
                    <span className="pointer-events-none absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/40" />
                    <span className="pointer-events-none absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/40" />
                    <span className="pointer-events-none absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/40" />
                    <span className="pointer-events-none absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/40" />

                    {/* Floating Metric Pill */}
                    <div className="absolute bottom-2.5 left-3 px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-emerald-500/40 font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{nextProject.impact}</span>
                    </div>
                  </div>

                  {/* Narrative Body */}
                  <div className="p-4 sm:p-6 flex flex-col gap-2">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                      {nextProject.tag}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-medium text-white group-hover:text-emerald-400 transition-colors tracking-tight">
                      {nextProject.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2">
                      {nextProject.description}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-white/[0.07] bg-[#0e0e12] flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white font-bold group-hover:text-emerald-400 transition-colors">
                    <span>Inspect {nextProject.title} Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform text-emerald-400" />
                  </div>
                </Link>

              </div>
            </div>

          </div>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
};

export default ProjectPage;
