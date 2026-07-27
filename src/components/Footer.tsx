import { ArrowUp } from "lucide-react";
import Magnetic from "./ui/Magnetic";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-app-border bg-app-bg py-8">
      {/* Decorative top border line with accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-app-accent/20 to-transparent" />

      <div className="container mx-auto max-w-6xl px-6 relative z-10 grid grid-cols-1 lg:grid-cols-3 items-center gap-6 font-mono text-[9px] uppercase tracking-[0.25em] text-app-text-muted select-none">
        {/* Left: Copyright */}
        <div className="text-left font-bold text-app-text-secondary">
          &copy; {new Date().getFullYear()} <span className="text-app-text-primary font-black">TUSHAL PANDEY</span>. ALL RIGHTS RESERVED.
        </div>

        {/* Center: Quote (hidden on mobile, centered on desktop grid) */}
        <div className="hidden lg:block text-center font-bold text-app-text-secondary tracking-[0.25em] whitespace-nowrap">
          TRANSITIONING COMPUTATIONAL LOGIC INTO AUTONOMY
        </div>

        {/* Right: Sleek magnetic button */}
        <div className="flex justify-start lg:justify-end">
          <Magnetic>
            <button
              onClick={scrollToTop}
              className="group flex h-8 items-center gap-1.5 border border-app-border bg-app-surface px-4 rounded-full text-app-text-secondary hover:text-app-accent hover:border-app-accent/40 transition-all duration-300 cursor-pointer text-[9px] uppercase tracking-[0.15em] font-bold"
              title="Back to Top"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
