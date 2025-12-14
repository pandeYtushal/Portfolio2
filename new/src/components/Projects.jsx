import { useState } from 'react';
import { FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  
  const projects = [
    {
      title: 'Portfolio',
      status: 'Live',
      description: 'A modern, responsive portfolio website showcasing my projects, skills, and experience. Built with React and Tailwind CSS, featuring a sleek dark theme and smooth animations.',
      tech: ['React', 'Tailwind CSS', 'Vite', 'JavaScript'],
      link: 'https://github.com/pandeYtushal',
    },
    {
      title: 'Urban Utility Report',
      status: 'Live',
      description: 'A comprehensive utility reporting system for urban areas. Track and analyze utility usage, generate reports, and visualize data trends for better urban planning and resource management.',
      tech: ['React', 'Firebase', 'Tailwind CSS', 'Javascript'],
      link: 'https://urban-utiliy-report.vercel.app/',
    },
    {
      title: 'Cab Booking Platform',
      status: 'Closed',
      description: 'A full frontend page with payment integration, user management, and admin dashboard. Features include ride booking, fare calculations, driver tracking.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express', 'JWT'],
      link: 'https://github.com/pandeYtushal',
    },
    {
      title: 'Task Management App',
      status: 'Closed',
      description: 'A collaborative task management application with real-time updates and team collaboration features. Organize projects, assign tasks, track progress, and communicate with your team seamlessly.',
      tech: ['React', 'Firebase', 'Tailwind CSS', 'WebSockets', 'TypeScript'],
      link: 'https://github.com/pandeYtushal',
    },
    {
      title: 'Weather Dashboard',
      status: 'Closed',
      description: 'A beautiful weather dashboard with location-based forecasts and interactive charts. Get real-time weather data, extended forecasts, and detailed meteorological information with an intuitive interface.',
      tech: ['React', 'API Integration', 'Chart.js', 'Tailwind CSS', 'OpenWeather API'],
      link: 'https://github.com/pandeYtushal',
    },
  ];

  return (
    <section id="projects" className="section-container bg-zinc-950/80 backdrop-blur-sm">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Projects</span>
        </h2>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {(showAll ? projects : projects.slice(0, 2)).map((project, index) => (
          <div
            key={index}
            className="bg-zinc-900/80 rounded-xl p-6 md:p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300 group shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:gradient-text transition-all">
                {project.title}
              </h3>
           {project.status && (<span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
           project.status === "Live"
           ? "bg-green-500/20 text-green-400 border-green-500/30"
           : project.status === "In Progress"
           ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
           : project.status === "Closed"
           ? "bg-red-500/20 text-red-400 border-red-500/30"
           : "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"}`}>
         {project.status}
        </span>)}

            </div>
            <p className="text-gray-400 mb-4 leading-relaxed text-lg">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-zinc-800/70 text-gray-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <a
                href={project.link}
                className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center transition-colors"
              >
                View Project
                <FaExternalLinkAlt className="w-4 h-4 ml-2" />
              </a>
            )}
          </div>
        ))}
        
        {projects.length > 2 && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              {showAll ? (
                <>
                  <span>Show Less</span>
                  <FaChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  <span>Show More</span>
                  <FaChevronDown className="w-5 h-5" />
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

