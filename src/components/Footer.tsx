import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaMediumM } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import LiveClock from "./LiveClock";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/pandeYtushal", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tushal-anand18/", icon: FaLinkedinIn },
  { label: "Medium", href: "https://medium.com/@tushalpandey", icon: FaMediumM },
  { label: "Email", href: "mailto:tushalanand4@gmail.com", icon: HiOutlineMail },
];

const TECH_STACK = ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-app-border bg-app-bg overflow-hidden">
      {/* Orange gradient divider line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-app-accent/40 to-transparent" />

      <div className="container mx-auto max-w-6xl px-6 pt-16 pb-8">
        {/* Top section: Nav + Socials + Back to Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-app-border/40">
          
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-xl border border-app-border bg-app-surface">
                <img src="/sanskrit%20logo.png" alt="Logo" className="h-full w-full object-cover" />
              </div>
              <span className="text-base font-bold tracking-tight text-app-text-primary">Tushal Pandey</span>
            </div>
            <p className="text-xs leading-relaxed text-app-text-muted max-w-xs">
              Building autonomous AI systems and browser automation agents. Open to full-time roles and collaboration.
            </p>
            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-app-text-muted">
                Available for Work
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-app-text-muted">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm text-app-text-secondary hover:text-app-accent transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials + Back to Top */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-app-text-muted">Connect</h4>
              <div className="flex items-center gap-3">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-app-border bg-app-surface text-app-text-secondary hover:text-app-accent hover:border-app-accent/30 transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 border-2 border-app-border bg-transparent px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-app-text-muted hover:border-app-accent hover:text-app-accent transition-all duration-300 cursor-pointer"
            >
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom section: Tech stack + Copyright + Clock */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Built with */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-app-text-muted mr-1">
              Built with
            </span>
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded border border-app-border/50 bg-app-surface/30 px-2.5 py-0.5 text-[10px] font-mono text-app-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Copyright + Clock */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <LiveClock />
            <div className="h-3 w-px bg-app-border hidden sm:block" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-app-text-muted">
              © {new Date().getFullYear()} Tushal Pandey
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
