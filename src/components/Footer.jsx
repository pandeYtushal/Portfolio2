import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-app-border bg-app-bg transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-6 px-6 py-10 md:px-12">
        
        {/* Left Side Quote */}
        <p className="text-[11px] font-medium text-app-text-muted max-w-xs text-center sm:text-left">
          &quot;Design is not just what it looks like and feels like. Design is how it works.&quot;
        </p>

        {/* Right Side Copyright and Trigger */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-[11px] text-app-text-muted">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-app-accent"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              <p>
                Built by <span className="font-bold text-app-text-primary">Tushal Pandey</span>
              </p>
            </div>
            <span className="h-3 w-px bg-app-border" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="cursor-default select-none transition-colors"
            >
              &copy; {new Date().getFullYear()} All Rights Reserved
            </motion.p>
          </div>

          {/* Back to top scroll button */}
          <button
            onClick={scrollToTop}
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-app-border bg-app-surface hover:bg-app-surface-secondary shadow-none transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-3.5 w-3.5 text-app-text-secondary transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
