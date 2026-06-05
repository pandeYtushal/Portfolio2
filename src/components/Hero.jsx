/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import ResumeModal from "./ResumeModal";
import { Button } from "@/components/ui/button";
import { Download, Mail, User, MapPin, ArrowRight, Database, Heart, Rocket } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiFramer,
  SiNodedotjs,
  SiFirebase,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiCplusplus,
  SiShadcnui,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const TECH_STACK = [
  // Frontend
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "#06B6D4" },
  { icon: SiShadcnui, label: "Shadcn UI", color: "#ffffff" },
  { icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
  { icon: SiHtml5, label: "HTML5", color: "#E34F26" },
  { icon: SiCss3, label: "CSS3", color: "#1572B6" },
  { icon: SiFramer, label: "Framer Motion", color: "#ffffff" },
  // Backend & DB
  { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { icon: SiFirebase, label: "Firebase", color: "#FFCA28" },
  { icon: Database, label: "SQL", color: "#34d399" },
  { icon: SiCplusplus, label: "C++", color: "#00599C" },
  // Tools
  { icon: SiGit, label: "Git", color: "#F05032" },
  { icon: SiGithub, label: "GitHub", color: "#ffffff" },
  { icon: VscVscode, label: "VS Code", color: "#007ACC" },
  { icon: SiVercel, label: "Vercel", color: "#ffffff" },
  { icon: SiFigma, label: "Figma", color: "#F24E1E" },
  { icon: Heart, label: "Lovable", color: "#ff4d4d" },
  { icon: Rocket, label: "Antigravity", color: "#a78bfa" },
  { icon: ArrowRight, label: "Cursor", color: "#ffffff" },
];

const Hero = ({ theme }) => {
  const [showResume, setShowResume] = useState(false);

  const scrollTo = useCallback((e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col overflow-hidden bg-white text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white"
    >
      {/* Hero Content */}
      <div className="container relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between md:gap-12 md:px-12 md:py-20">
        {/* Avatar */}
        <div className="relative flex shrink-0">
          <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-zinc-200 bg-zinc-100 shadow-xl ring-2 ring-zinc-200/50 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-zinc-800/50 sm:h-32 sm:w-32 md:h-36 md:w-36">
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
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.classList.remove("hidden");
              }}
            />
            <span
              className="absolute inset-0 hidden items-center justify-center bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
              aria-hidden
            >
              <User className="h-12 w-12 sm:h-14 sm:w-14" />
            </span>
          </div>
        </div>

        {/* Text Details */}
        <div className="flex-1 max-w-xl text-left">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Student &amp; Developer
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Tushal Pandey
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            I like to build projects that blend design and code. I focus on web development, problem solving, and
            turning ideas into working software.
          </p>
          <div className="mt-6 flex items-center gap-1.5 text-sm text-zinc-500">
            <MapPin className="h-4 w-4 text-zinc-400" />
            India
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="default"
              className="gap-2 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              onClick={() => setShowResume(true)}
            >
              <Download className="h-4 w-4" />
              Resume
            </Button>
            <a href="#contact" onClick={(e) => scrollTo(e, "contact")}>
              <Button
                variant="outline"
                size="default"
                className="gap-2 border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Tech Stack Slider */}
      <div className="container relative z-10 mx-auto max-w-6xl border-t border-zinc-200 px-6 py-8 dark:border-zinc-800 md:px-12 md:py-10">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Tech Stack</p>
        <div className="relative -mx-6 flex overflow-hidden md:mx-0 md:overflow-visible">
          <div className="flex gap-3 px-6 max-md:animate-scroll-x max-md:hover:[animation-play-state:paused] md:flex-wrap md:gap-6 md:px-0">
            {/* Main Stack */}
            <div className="flex shrink-0 gap-3 md:contents">
              {TECH_STACK.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="group relative flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-3.5 py-2 shadow-sm transition-all duration-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800 md:border-none md:bg-transparent md:p-0 md:shadow-none md:hover:-translate-y-2 md:hover:bg-transparent"
                >
                  <Icon
                    size={22}
                    className="md:h-7 md:w-7"
                    style={{ color: theme === "dark" ? color : color === "#ffffff" ? "#000000" : color }}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 md:hidden">
                    {label}
                  </span>

                  {/* Desktop Tooltip */}
                  <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 -translate-y-0 scale-95 whitespace-nowrap rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-zinc-700 transition-all duration-200 group-hover:scale-100 group-hover:-translate-y-1 group-hover:opacity-100 dark:bg-zinc-800 dark:ring-zinc-700 md:block">
                    {label}
                    <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
                  </span>
                </div>
              ))}
            </div>

            {/* Infinite Scroll Duplicate (Mobile Only) */}
            <div className="flex shrink-0 gap-3 md:hidden">
              {TECH_STACK.map(({ icon: Icon, label, color }) => (
                <div
                  key={`duplicate-${label}`}
                  className="flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-3.5 py-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
                >
                  <Icon size={22} style={{ color: theme === "dark" ? color : color === "#ffffff" ? "#000000" : color }} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mask Gradients for Scrolling */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent dark:from-black md:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-black md:hidden" />
        </div>
      </div>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </section>
  );
};

export default Hero;
