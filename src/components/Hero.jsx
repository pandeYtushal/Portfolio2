import { useState } from "react";
import LiveClock from "./LiveClock";
import ResumeModal from "./ResumeModal";
import { Button } from "@/components/ui/button";
import { Download, Mail, User, MapPin, Code2, ArrowRight, Database } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiJavascript, SiHtml5, SiCss3, SiFramer,
  SiNodedotjs, SiFirebase,
  SiGit, SiGithub, SiVercel, SiFigma, SiCplusplus,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const FOCUS_AREAS = ["Web Development", "Problem Solving", "Full‑stack Projects"];

const TECH_STACK = [
  // Frontend
  { icon: SiReact,       label: "React",         color: "#61DAFB" },
  { icon: SiNextdotjs,   label: "Next.js",       color: "#ffffff" },
  { icon: SiTypescript,  label: "TypeScript",    color: "#3178C6" },
  { icon: SiTailwindcss, label: "Tailwind CSS",  color: "#06B6D4" },
  { icon: SiJavascript,  label: "JavaScript",    color: "#F7DF1E" },
  { icon: SiHtml5,       label: "HTML5",         color: "#E34F26" },
  { icon: SiCss3,        label: "CSS3",          color: "#1572B6" },
  { icon: SiFramer,      label: "Framer Motion", color: "#ffffff" },
  // Backend & DB
  { icon: SiNodedotjs,   label: "Node.js",       color: "#339933" },
  { icon: SiFirebase,    label: "Firebase",      color: "#FFCA28" },
  { icon: Database,      label: "SQL",           color: "#34d399" },
  { icon: SiCplusplus,   label: "C++",           color: "#00599C" },
  // Tools
  { icon: SiGit,         label: "Git",           color: "#F05032" },
  { icon: SiGithub,      label: "GitHub",        color: "#ffffff" },
  { icon: VscVscode,     label: "VS Code",       color: "#007ACC" },
  { icon: SiVercel,      label: "Vercel",        color: "#ffffff" },
  { icon: SiFigma,       label: "Figma",         color: "#F24E1E" },
  { icon: Code2,         label: "Antigravity",   color: "#a78bfa" },
  { icon: ArrowRight,    label: "Cursor",        color: "#ffffff" },
];

const Hero = () => {
  const [showResume, setShowResume] = useState(false);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">

      {/* Clock — top right, desktop only */}
      <div className="hidden md:flex justify-end px-12 pt-5">
        <LiveClock />
      </div>

      {/* Hero */}
      <div className="container relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-8 px-12 py-10 md:flex-row md:items-center md:justify-between md:gap-12 md:py-16">
        {/* Avatar */}
        <div className="relative flex shrink-0">
          <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-zinc-700 bg-zinc-900 shadow-xl ring-2 ring-zinc-800/50 sm:h-32 sm:w-32 md:h-36 md:w-36">
            <img
              src="/avtar.png"
              alt="Tushal Pandey"
              width={144}
              height={144}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <span className="absolute inset-0 hidden items-center justify-center bg-zinc-800 text-zinc-500" aria-hidden>
              <User className="h-12 w-12 sm:h-14 sm:w-14" />
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="max-w-xl flex-1 text-left">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">
            Student &amp; Developer
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="bg-clip-text text-transparent bg-orange-500">Tushal Pandey</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            I like to build projects that blend design and code. I focus on web development,
            problem solving, and turning ideas into working software.
          </p>
          <div className="mt-6 flex items-center gap-1.5 text-sm text-zinc-500">
            <MapPin className="h-4 w-4 text-zinc-400" />
            India
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="default" className="gap-2 bg-white text-black hover:bg-gray-200" onClick={() => setShowResume(true)}>
              <Download className="h-4 w-4" />
              Resume
            </Button>
            <a href="#contact" onClick={(e) => scrollTo(e, "contact")}>
              <Button variant="outline" size="default" className="gap-2 border-zinc-700 text-white hover:bg-zinc-800 hover:text-white">
                <Mail className="h-4 w-4" />
                Contact Me
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* What I do */}
      <div className="container relative z-10 mx-auto max-w-6xl border-t border-zinc-800 px-12 py-10 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Code2 className="h-5 w-5 text-white" />
              What I do
            </h2>
            <p className="mt-1 text-sm text-zinc-400">Building and learning across the stack.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            {FOCUS_AREAS.map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm font-medium">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex">
          <a href="#projects" onClick={(e) => scrollTo(e, "projects")}>
            <Button variant="ghost" size="sm" className="gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
              See projects <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="container relative z-10 mx-auto max-w-6xl border-t border-zinc-800 px-12 py-8 md:py-10">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Tech Stack</p>
        <div className="flex flex-wrap gap-5">
          {TECH_STACK.map(({ icon: Icon, label, color }) => (
            <div key={label} className="group relative flex items-center justify-center transition-transform duration-200 hover:-translate-y-2">
              <Icon size={28} style={{ color }} />
              {/* Tooltip */}
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 scale-95 -translate-y-0 whitespace-nowrap rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-zinc-700 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:scale-100">
                {label}
                <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </section>
  );
};

export default Hero;
