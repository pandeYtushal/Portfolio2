const Skills = () => {
  const skills = [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "SQL",
    "Tailwind CSS",
    "Git",
    "GitHub",
    "AWS",
    "Vercel",
    "Python",
    "Figma",
  ];

  return (
    <section id="skills" className="section-container">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-zinc-300">Technology & Tools I Use</span>
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 text-sm md:text-base font-medium text-zinc-200 bg-zinc-950 border border-zinc-700 rounded-xl hover:border-zinc-500 transition">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
