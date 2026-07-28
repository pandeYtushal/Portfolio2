import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-app-border bg-app-bg py-6">
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between gap-4">

        {/* Left: copyright */}
        <p className="text-[10px] font-mono text-app-text-muted uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-app-text-secondary font-bold">Tushal Pandey</span>
          <span className="hidden sm:inline">. All rights reserved.</span>
        </p>

        {/* Right: back to top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-app-text-muted hover:text-app-text-primary transition-colors duration-200 cursor-pointer"
        >
          <span>Back to top</span>
          <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
