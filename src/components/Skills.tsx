import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Frontend & Motion",
    description: "Building fluid, pixel-perfect user interfaces with modern frameworks and physics-based animation engines.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "WebGL"]
  },
  {
    title: "Backend & Systems",
    description: "Architecting scalable server logic, relational databases, and secure real-time APIs.",
    skills: ["Node.js", "Python", "PostgreSQL", "Supabase", "Firebase", "Docker", "REST APIs"]
  },
  {
    title: "AI & Autonomous",
    description: "Integrating large language models and vision systems into autonomous agents and browser automation.",
    skills: ["LLM Orchestration", "Multi-Agent Systems", "Playwright", "Puppeteer", "Vision Models", "Prompt Eng"]
  },
  {
    title: "Design & Tooling",
    description: "Rapid prototyping, wireframing, and modern CI/CD deployment pipelines.",
    skills: ["Figma", "Git", "Vercel", "GitHub Actions", "WebRTC", "Canvas API"]
  }
];

export const Skills = () => {
  return (
    <section
      id="skills"
      className="py-16 md:py-32 bg-app-bg relative z-10"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-10 md:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col gap-4"
          >
            <span className="text-sm font-bold font-mono text-app-text-secondary uppercase tracking-widest">
              Capabilities
            </span>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-app-text-primary leading-[0.85] uppercase">
              Technical<br/>Arsenal
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="max-w-md text-base sm:text-lg text-app-text-muted leading-relaxed font-medium pb-2"
          >
            I operate across the full stack, utilizing bleeding-edge frameworks to construct robust architectures and immaculate interfaces.
          </motion.p>
        </div>

        {/* Structural List */}
        <div className="flex flex-col border-t border-app-border/40">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: index * 0.1 }}
              className="group flex flex-col lg:flex-row border-b border-app-border/40 py-10 md:py-16 hover:bg-app-text-primary hover:text-app-bg transition-colors duration-500 cursor-pointer -mx-4 sm:-mx-10 md:-mx-16 px-4 sm:px-10 md:px-16"
            >
              <div className="lg:w-2/5 flex flex-col justify-between pr-8">
                <div className="flex items-start gap-4 mb-6 lg:mb-0">
                  <span className="font-mono text-sm opacity-50 mt-2">0{index + 1}</span>
                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                    {category.title}
                  </h3>
                </div>
                <p className="text-app-text-muted group-hover:text-app-bg/70 transition-colors mt-6 lg:mt-12 max-w-sm text-lg hidden sm:block">
                  {category.description}
                </p>
              </div>
              
              <div className="lg:w-3/5 mt-8 lg:mt-0 flex flex-col justify-between">
                <div className="flex flex-wrap items-start gap-3">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-5 py-2.5 rounded-full border border-app-border/40 text-sm font-bold uppercase tracking-widest text-app-text-primary group-hover:border-app-bg/30 group-hover:text-app-bg transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="hidden lg:flex justify-end w-full mt-12">
                  <div className="w-16 h-16 rounded-full border border-app-border/40 flex items-center justify-center group-hover:bg-app-bg group-hover:text-app-text-primary transition-colors transform group-hover:scale-110 duration-500">
                    <ArrowUpRight className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
