const Skills = () => {
  const skills = [
    "TypeScript",
    "JavaScript",
    "C++",
    "HTML",
    "CSS",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "SQL",
    "Tailwind CSS",
    "Git",
    "GitHub",
    "Vercel",
    "Python",
    "Figma",
  ];

  return (
    <section id="skills" className="section-container">
      {/* Heading */}
      <div className="mb-8 text-center sm:mb-12">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-5xl leading-tight">
          <span className="text-zinc-300">
            Technology & Tools <br className="sm:hidden" />
            I Use
          </span>
        </h2>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base font-medium text-zinc-200 bg-zinc-950 border border-zinc-700 rounded-lg sm:rounded-xl hover:border-red-500
              transition-all duration-300">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
