import React from "react";
import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div 
      className="relative h-[40vh] md:h-[60vh] lg:h-[80vh] w-full" 
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <footer className="fixed bottom-0 w-full h-[40vh] md:h-[60vh] lg:h-[80vh] bg-app-surface border-t border-app-border/20 flex flex-col justify-end pb-8 sm:pb-12 pt-16 z-0">
        <div className="w-full flex flex-col justify-between h-full max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16">
          
          {/* Massive Statement */}
          <div className="flex flex-col flex-1 justify-center items-center text-center">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-app-text-primary uppercase leading-[0.85]">
              Let's build <br />
              <span className="text-app-text-secondary">extraordinary.</span>
            </h2>
          </div>

          {/* Links & Copyright */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-app-border/40 text-sm font-bold tracking-widest uppercase text-app-text-muted">
            <span>&copy; {new Date().getFullYear()} Tushal Pandey.</span>

            <div className="flex items-center gap-8">
              <a href="https://github.com/pandeYtushal" target="_blank" rel="noreferrer" className="hover:text-app-text-primary transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/tushal-anand18/" target="_blank" rel="noreferrer" className="hover:text-app-text-primary transition-colors">
                LinkedIn
              </a>
              <a href="https://medium.com/@tushalpandey" target="_blank" rel="noreferrer" className="hover:text-app-text-primary transition-colors">
                Medium
              </a>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
              className="group flex items-center gap-3 hover:text-app-text-primary transition-colors bg-app-bg px-6 py-3 rounded-full"
            >
              <span>Back to top</span>
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
