import { useState, useMemo } from "react";
import { FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    title: "Portfolio",
    status: "Live",
    description:
      "A modern, responsive portfolio website showcasing my projects, skills, and experience. Built with React and Tailwind CSS, featuring a sleek dark theme and smooth animations.",
    tech: ["React", "Tailwind CSS", "Vite", "JavaScript"],
    link: "https://github.com/pandeYtushal",
  },
  {
    title: "Urban Utility Report",
    status: "Live",
    description:
      "A comprehensive utility reporting system for urban areas. Track and analyze utility usage, generate reports, and visualize data trends for better urban planning.",
    tech: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
    link: "https://urbanreport.vercel.app/",
  },
  {
    title: "Melody",
    status: "Live",
    description:
      "A premium music streaming platform with a sleek monochrome UI. Features include high-fidelity audio playback, intelligent discovery, persistent state management with Zustand, and full PWA support.",
    tech: ["React 19", "Tailwind CSS", "Zustand", "Framer Motion", "Firebase", "JioSaavn API"],
    link: "https://meldmusic.vercel.app/",
  },
  {
    title: "Cab Booking Platform",
    status: "Closed",
    description:
      "A full frontend page with user management, and admin dashboard. Includes ride booking, fare calculation, and driver tracking.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/pandeYtushal",
  },
  {
    title: "Fit Gym Tracker",
    status: "Closed",
    description: "A gym task management application with real-time updates.",
    tech: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
    link: "https://github.com/pandeYtushal",
  },
  {
    title: "Weather Dashboard",
    status: "Closed",
    description: "A beautiful weather dashboard with real-time data, extended forecasts, and interactive charts.",
    tech: ["React", "API", "Chart.js", "Tailwind CSS"],
    link: "https://github.com/pandeYtushal",
  },
];

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = useMemo(() => {
    return showAll ? PROJECTS : PROJECTS.slice(0, 4);
  }, [showAll]);

  return (
    <section id="projects" className="section-container bg-zinc-50 transition-colors duration-300 dark:bg-black">
      {/* Section Heading */}
      <div className="mb-12 text-center md:mb-20 md:text-left">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Featured{" "}
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Work</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
          A selection of projects that showcase my passion for building clean, user-friendly, and performant web
          applications.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto w-full">
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:bg-zinc-900/50 dark:ring-zinc-800 dark:hover:bg-zinc-900 dark:hover:ring-orange-500/50 sm:p-8"
              >
                {/* Glow Backdrop */}
                <div className="absolute -inset-x-4 -top-4 -z-10 h-24 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-orange-500/10" />

                <div>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-zinc-900 transition-colors group-hover:text-orange-500 dark:text-white dark:group-hover:text-orange-400 sm:text-2xl">
                      {project.title}
                    </h3>
                    {project.status && (
                      <span
                        className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          project.status === "Live"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:border-emerald-500/30 dark:text-emerald-400"
                            : "border-zinc-500/20 bg-zinc-500/10 text-zinc-500 dark:border-zinc-500/30 dark:text-zinc-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            project.status === "Live" ? "animate-pulse bg-emerald-500" : "bg-zinc-400 dark:bg-zinc-500"
                          }`}
                        />
                        {project.status}
                      </span>
                    )}
                  </div>

                  <p className="mb-8 max-w-prose text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-zinc-200/50 bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800 dark:text-zinc-300 sm:text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-max items-center gap-2 text-sm font-semibold text-zinc-900 transition-colors hover:text-orange-500 dark:text-white dark:hover:text-orange-400"
                    >
                      View Project{" "}
                      <FaExternalLinkAlt className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More Button */}
        {PROJECTS.length > 4 && (
          <motion.div layout className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
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
