const Skills = () => {
  const skills = ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js',
    'MongoDB', 'SQL', 'Tailwind CSS', 'Git', 'GitHub',
     'AWS', 'Vercel','Python','Figma'];

  return (
    <section id="skills" className="section-container">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Skills</span>
        </h2>
      </div>

      <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-gray-300 hover:text-white hover:border-purple-500/50 transition-all duration-200 text-sm md:text-base font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;

