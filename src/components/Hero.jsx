import LiveClock from "./LiveClock";
import { Button } from "@/components/ui/button";
import { Download, Mail, User, MapPin, GraduationCap, Code2, ArrowRight } from "lucide-react";

const FOCUS_AREAS = [
  "Web Development",
  "Problem Solving",
  "Full‑stack Projects",
];

const Hero = () => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden px-4 pt-14 bg-black text-white">
      {/* Live clock & date */}
      <div className="container relative z-10 mx-auto flex max-w-6xl justify-end px-4 pt-2">
        <LiveClock />
      </div>

      {/* Hero */}
      <div className="container relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 py-10 md:flex-row md:items-center md:justify-between md:gap-12 md:py-16">
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
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.classList.remove("hidden");
              }}
            />
            <span className="absolute inset-0 hidden flex items-center justify-center bg-zinc-800 text-zinc-500" aria-hidden>
              <User className="h-12 w-12 sm:h-14 sm:w-14" />
            </span>
          </div>
          {/* Green dot */}
          <span
            className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-black bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.7)] sm:h-5 sm:w-5"
            aria-hidden
          />
        </div>
        <div className="max-w-xl flex-1 text-center md:text-left">
          <p className="text-sm font-medium uppercase tracking-wider text-primary text-zinc-400">
            Student & Developer
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-orange-500">Tushal Pandey</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-zinc-400">
            I build project that blend design and code. I focus on web development, problem
            solving, and turning ideas into working software.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground md:justify-start text-zinc-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-zinc-400" />India
            </span>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <a href="/Tushal_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="default" className="gap-2 bg-white text-black hover:bg-gray-200">
                <Download className="h-4 w-4" />
                Resume
              </Button>
            </a>
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>
              <Button variant="outline" size="default" className="gap-2 border-zinc-700 text-white hover:bg-zinc-800 hover:text-white">
                <Mail className="h-4 w-4" />
                Contact Me
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Focus / What I do */}
      <div className="container relative z-10 mx-auto max-w-6xl border-t border-zinc-800 px-4 py-10 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Code2 className="h-5 w-5 text-white" />
              What I do
            </h2>
            <p className="mt-1 text-sm text-muted-foreground text-zinc-400">
              Building and learning across the stack.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            {FOCUS_AREAS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm font-medium text-foreground"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
          <a href="#skills" onClick={(e) => handleScroll(e, 'skills')}>
            <Button variant="ghost" size="sm" className="gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
              View skills
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </a>
          <a href="#projects" onClick={(e) => handleScroll(e, 'projects')}>
            <Button variant="ghost" size="sm" className="gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
              See projects
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
