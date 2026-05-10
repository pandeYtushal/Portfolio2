import { useState } from "react";
import { FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  const projects = [
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
      description:
        "A gym task management application with real-time updates.",
      tech: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
      link: "https://github.com/pandeYtushal",
    },
    {
      title: "Weather Dashboard",
      status: "Live",
      description:
        "A beautiful weather dashboard with real-time data, extended forecasts, and interactive charts.",
      tech: ["React", "API", "Chart.js", "Tailwind CSS"],
      link: "https://github.com/pandeYtushal",
    },
  ];

  return (
    <section id="projects" className="section-container bg-zinc-50 transition-colors duration-300 dark:bg-black">
      {/* Heading */}
      <div className="mb-10 sm:mb-16 text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-5xl leading-tight">
          <span className="text-zinc-500 dark:text-zinc-300">Projects</span>
        </h2>
      </div>

      {/* Projects */}
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {(showAll ? projects : projects.slice(0, 2)).map((project, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-white rounded-xl p-5 sm:p-6 md:p-8 border border-zinc-200 hover:border-orange-500 transition-all duration-300 shadow-lg group dark:bg-zinc-900/80 dark:border-zinc-800 dark:hover:border-red-500">
            {/* Noise texture overlay */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl opacity-[0.02] mix-blend-overlay dark:opacity-[0.04]"
              style={{ backgroundImage: "url('/noise.webp')", backgroundSize: "200px 200px" }}
            />

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white">
                {project.title}
              </h3>

              {project.status && (
                <span
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold border ${project.status === "Live"
                    ? "bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30"
                    : project.status === "Closed"
                      ? "bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30"
                      : "bg-zinc-500/10 text-zinc-600 border-zinc-500/20 dark:bg-zinc-500/20 dark:text-zinc-400 dark:border-zinc-500/30"
                    }`}
                >
                  {project.status}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed text-left max-w-prose dark:text-gray-400">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1.5 text-xs sm:text-sm bg-zinc-100 border border-zinc-200 rounded-full text-zinc-600 dark:bg-zinc-800/80 dark:border-zinc-700 dark:text-gray-300">
                  {tech}
                </span>
              ))}
            </div>

            {/* Link */}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 text-sm font-semibold dark:text-zinc-400 dark:hover:text-blue-300">
                View Project<FaExternalLinkAlt className="w-4 h-4" /></a>)}</div>))}

        {/* Show More / Less */}
        {projects.length > 2 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 text-sm sm:text-base bg-linear-to-r from-zinc-500 to-orange-500 text-white rounded-lg font-semibold flex items-center gap-2 transition-transform hover:scale-105">
              {showAll ? (
                <>
                  Show Less <FaChevronUp />
                </>
              ) : (
                <>
                  Show More <FaChevronDown />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default Projects;
