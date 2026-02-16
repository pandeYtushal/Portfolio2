import { Layout, Server, Wrench } from "lucide-react";

/* eslint-disable react/prop-types */
const Skills = () => {
  const categories = [
    {
      title: "Frontend Development",
      icon: Layout,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Framer Motion"
      ]
    },
    {
      title: "Backend & Database",
      icon: Server,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      skills: [
        "Node.js",
        "SQL",
        "Firebase"
      ]
    },
    {
      title: "Tools & DevOps",
      icon: Wrench,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      skills: [
        "Git",
        "GitHub",
        "VS Code",
        "Postman",
        "Vercel",
        "Figma",
        "Antigravity",
        "Cursor"
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-black text-white px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technical <span className="text-zinc-500">Expertise</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            A curated set of technologies I use to build scalable and performant applications.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className={`p-8 rounded-2xl bg-zinc-950/50 border ${category.border} backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-${category.color.split('-')[1]}-500/10 transition-all duration-300 group`}
              >
                <div className={`w-14 h-14 rounded-xl ${category.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${category.color}`} />
                </div>

                <h3 className="text-xl font-bold mb-6 text-zinc-100">{category.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-sm font-medium text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded-lg group-hover:text-zinc-200 group-hover:border-zinc-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
