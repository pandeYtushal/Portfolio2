/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { FaExternalLinkAlt, FaChevronDown, FaChevronUp, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    title: "Portfolio",
    image: "/port.png",
    status: "Live",
    description:
      "A modern, responsive portfolio website showcasing my projects, skills, and experience with a clean theme system and smooth interactions.",
    highlight:
      "Personal brand system with dark mode, live resume, and animated sections.",
    tech: ["React", "Tailwind CSS", "Vite", "JavaScript"],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal",
  },
  {
    title: "Urban Utility Report",
    image: "/urban.png",
    status: "Live",
    description:
      "A utility reporting system for urban areas with issue submission, tracking, and clear data views for better planning.",
    highlight:
      "Civic reporting flow with fast submissions and admin-ready issue tracking.",
    tech: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
    link: "https://urbanreport.vercel.app/",
    source: "https://github.com/pandeYtushal",
  },
  {
    title: "Melody",
    image: "/music.png",
    status: "Live",
    description:
      "A premium music streaming platform with a monochrome UI, high-fidelity playback, intelligent discovery, Zustand state, and PWA support.",
    highlight:
      "Polished playback experience with persistent state and PWA behavior.",
    tech: [
      "React 19",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "Firebase",
      "JioSaavn API",
    ],
    link: "https://meldmusic.vercel.app/",
    source: "https://github.com/pandeYtushal",
  },
  {
    title: "Cab Booking Platform",
    image: "/projects/cab-booking.webp",
    status: "Closed",
    description:
      "A frontend booking experience with user management, fare calculation, ride flow screens, and an admin dashboard.",
    highlight:
      "Ride booking interface with fare logic and dashboard screens.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal",
  },
  {
    title: "Fit Gym Tracker",
    image: "/projects/gym-tracker.webp",
    status: "Closed",
    description:
      "A gym task management application with responsive task views and real-time Firebase updates.",
    highlight: "Workout task tracking with Firebase-backed updates.",
    tech: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal",
  },
  {
    title: "Weather Dashboard",
    image: "/projects/weather-dashboard.webp",
    status: "Closed",
    description:
      "A weather dashboard with real-time data, extended forecasts, search states, and interactive charts.",
    highlight:
      "Forecast cards, charted weather trends, and responsive search states.",
    tech: ["React", "API", "Chart.js", "Tailwind CSS"],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal",
  },
];

const ProjectPreview = ({ project }) => {
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="h-64 w-full object-cover transition-all duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${
            project.status === "Live"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/20"
              : "bg-zinc-900/30 text-zinc-200 border border-white/10"
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Project Title */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h4 className="text-xl font-bold text-white">
          {project.title}
        </h4>

        <p className="mt-1 text-sm text-zinc-300">
          {project.highlight}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => (
  <span
    className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
      status === "Live"
        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:border-emerald-500/30 dark:text-emerald-400"
        : "border-zinc-500/20 bg-zinc-500/10 text-zinc-500 dark:border-zinc-500/30 dark:text-zinc-400"
    }`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${status === "Live" ? "animate-pulse bg-emerald-500" : "bg-zinc-400 dark:bg-zinc-500"}`} />
    {status}
  </span>
);

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = useMemo(() => {
    return showAll ? PROJECTS : PROJECTS.slice(0, 4);
  }, [showAll]);

  return (
    <section id="projects" className="section-container bg-zinc-50 transition-colors duration-300 dark:bg-black">
      <div className="mb-12 text-center md:mb-20 md:text-left">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Featured{" "}
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Work</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
          A focused selection of projects showing product thinking, responsive UI.
        </p>
      </div>

      <div className="mx-auto w-full">
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:bg-zinc-900/50 dark:ring-zinc-800 dark:hover:bg-zinc-900 dark:hover:ring-orange-500/50 sm:p-6"
              >
                <div className="absolute -inset-x-4 -top-4 -z-10 h-24 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-orange-500/10" />

                <div>
                  <ProjectPreview project={project} index={index} />

                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-zinc-900 transition-colors group-hover:text-orange-500 dark:text-white dark:group-hover:text-orange-400 sm:text-2xl">
                      {project.title}
                    </h3>
                    {project.status && <StatusBadge status={project.status} />}
                  </div>

                  <p className="mb-8 max-w-prose text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-zinc-200/50 bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800 dark:text-zinc-300 sm:text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-max items-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:bg-white dark:text-black dark:hover:bg-orange-400"
                      >
                        View Project
                        <FaExternalLinkAlt className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.source && (
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-max items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                      >
                        <FaGithub className="h-4 w-4" />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {PROJECTS.length > 4 && (
          <motion.div layout className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 active:translate-y-0 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            >
              {showAll ? "Show Less" : "Show More"}
              {showAll ? (
                <FaChevronUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <FaChevronDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
