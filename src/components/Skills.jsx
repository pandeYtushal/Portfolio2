import { Layout, Server, Wrench, MousePointer2, Rocket } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiHtml5, SiCss3, SiFramer,
  SiNodedotjs, SiPostgresql, SiFirebase,
  SiGit, SiGithub, SiPostman, SiVercel, SiFigma
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const Skills = () => {
  const categories = [
    {
      title: "Frontend Development",
      icon: Layout,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      skills: [
        { name: "React", icon: SiReact, color: "group-hover:text-[#61DAFB]" },
        { name: "Next.js", icon: SiNextdotjs, color: "group-hover:text-white" },
        { name: "TypeScript", icon: SiTypescript, color: "group-hover:text-[#3178C6]" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "group-hover:text-[#06B6D4]" },
        { name: "JavaScript", icon: SiJavascript, color: "group-hover:text-[#F7DF1E]" },
        { name: "HTML5", icon: SiHtml5, color: "group-hover:text-[#E34F26]" },
        { name: "CSS3", icon: SiCss3, color: "group-hover:text-[#1572B6]" },
        { name: "Framer Motion", icon: SiFramer, color: "group-hover:text-[#0055FF]" }
      ]
    },
    {
      title: "Backend & Database",
      icon: Server,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      skills: [
        { name: "Node.js", icon: SiNodedotjs, color: "group-hover:text-[#339933]" },
        { name: "SQL", icon: SiPostgresql, color: "group-hover:text-[#4169E1]" },
        { name: "Firebase", icon: SiFirebase, color: "group-hover:text-[#FFCA28]" }
      ]
    },
    {
      title: "Tools & DevOps",
      icon: Wrench,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      skills: [
        { name: "Git", icon: SiGit, color: "group-hover:text-[#F05032]" },
        { name: "GitHub", icon: SiGithub, color: "group-hover:text-white" },
        { name: "VS Code", icon: VscVscode, color: "group-hover:text-[#007ACC]" },
        { name: "Vercel", icon: SiVercel, color: "group-hover:text-white" },
        { name: "Figma", icon: SiFigma, color: "group-hover:text-[#F24E1E]" },
        { name: "Antigravity", icon: Rocket, color: "group-hover:text-emerald-500" },
        { name: "Cursor", icon: MousePointer2, color: "group-hover:text-white" }
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

        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className={`flex flex-col h-full p-8 rounded-3xl bg-zinc-950/50 border ${category.border} backdrop-blur-sm relative overflow-hidden group`}
              >
                {/* Category Header */}
                <div className="relative z-10 flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-2xl ${category.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100">{category.title}</h3>
                </div>

                {/* Skills Grid */}
                <div className="relative z-10 grid grid-cols-2 gap-3 mt-auto">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800/80 hover:border-zinc-700 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center shrink-0">
                        <skill.icon className={`w-4 h-4 text-zinc-400 transition-colors duration-300 ${skill.color}`} />
                      </div>
                      <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                        {skill.name}
                      </span>
                    </div>
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
