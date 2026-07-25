import { ArrowUp } from "lucide-react";
import LiveClock from "./LiveClock";
import Magnetic from "./ui/Magnetic";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-app-border bg-app-bg overflow-hidden py-12 md:py-16">
      {/* Accent ambient glow in the background */}
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-app-accent/3 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/4 w-[250px] h-[250px] rounded-full bg-app-accent-blue/3 blur-[90px] pointer-events-none z-0" />

      {/* Decorative top border line with accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-app-accent/30 to-transparent" />

      <div className="container mx-auto max-w-6xl px-6 relative z-10 space-y-12">
        {/* Main top row: Brand info + Back to Top */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Brand & Mission column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 max-w-sm">
            <Magnetic>
              <div 
                onClick={scrollToTop}
                className="group flex items-center cursor-pointer"
              >
                <div className="flex flex-col items-start text-left">
                  <h4 className="text-lg font-black tracking-tighter text-app-text-primary leading-none">Tushal Pandey</h4>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-mono font-bold text-app-text-muted">CORE ONLINE</span>
                  </div>
                </div>
              </div>
            </Magnetic>
            <p className="text-xs leading-relaxed text-app-text-secondary">
              Architecting autonomous web automation agents, multi-agent reasoning graphs, and high-fidelity user experiences.
            </p>
          </div>

          {/* Magnetic Back to Top button */}
          <div className="flex items-center justify-center">
            <Magnetic>
              <button
                onClick={scrollToTop}
                className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-app-border bg-app-surface text-app-text-secondary hover:text-app-accent hover:border-app-accent/40 transition-all duration-300 shadow-lg cursor-pointer"
                title="Scroll to Top"
                aria-label="Back to top"
              >
                <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Typographic quote divider */}
        <div className="py-6 border-y border-app-border/40 text-center select-none">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.35em] text-app-text-muted uppercase">
            TRANSITIONING COMPUTATIONAL LOGIC INTO AUTONOMY
          </span>
        </div>

        {/* Bottom Dock-style Copyright + Clock Bar */}
        <div className="backdrop-blur-md bg-app-surface/30 border border-app-border/60 rounded-3xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          {/* Copyright text */}
          <span className="text-[10px] font-semibold uppercase tracking-wider text-app-text-secondary select-none">
            © {new Date().getFullYear()} Tushal Pandey · All rights reserved.
          </span>

          {/* Separation line for mobile layout */}
          <div className="h-px w-12 bg-app-border sm:hidden" />

          {/* Live Clock component */}
          <div className="flex items-center">
            <LiveClock />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
