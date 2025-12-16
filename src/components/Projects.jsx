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
      link: "https://urban-utiliy-report.vercel.app/",
    },
    {
      title: "Cab Booking Platform",
      status: "Closed",
      description:
        "A full frontend page with payment integration, user management, and admin dashboard. Includes ride booking, fare calculation, and driver tracking.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Express", "JWT"],
      link: "https://github.com/pandeYtushal",
    },
     {
      title: "Weather Dashboard",
      status: "Live",
      description:
        "A beautiful weather dashboard with real-time data, extended forecasts, and interactive charts.",
      tech: ["React", "API", "Chart.js", "Tailwind CSS"],
      link: "https://weather-by-tushal.vercel.app/",
    },
    {
      title: "Task Management App",
      status: "Closed",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      tech: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
      link: "https://github.com/pandeYtushal",
    },
   
  ];

  return (
    <section id="projects" className="section-container">
      {/* Heading */}
      <div className="mb-10 sm:mb-16 text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-5xl leading-tight">
          <span className="text-zinc-300">Projects</span>
        </h2>
      </div>

      {/* Projects */}
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {(showAll ? projects : projects.slice(0, 2)).map((project, index) => (
          <div
            key={index}
            className=" bg-zinc-900/80 rounded-xl p-5 sm:p-6 md:p-8 border border-zinc-800 hover:border-purple-500/50  transition-all duration-300 shadow-lg group">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                {project.title}
              </h3>

              {project.status && (
                <span
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold border ${
                    project.status === "Live"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : project.status === "Closed"
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
                  }`}
                >
                  {project.status}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-left max-w-prose">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1.5 text-xs sm:text-sm bg-zinc-800/80 border border-zinc-700 rounded-full text-gray-300">
                  {tech}
                </span>
              ))}
            </div>

            {/* Link */}
            {project.link && (
              <a href={project.link}target="_blank"rel="noopener noreferrer"className="mt-6 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-semibold">
                View Project<FaExternalLinkAlt className="w-4 h-4" /></a>)}</div>))}

        {/* Show More / Less */}
        {projects.length > 2 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-transform hover:scale-105">
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
