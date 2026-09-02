import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const shouldReduce = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-app-border/40 bg-app-bg py-12">
      <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/sanskrit logo.png"
            alt=""
            aria-hidden
            className="h-4 w-auto object-contain dark:invert opacity-80"
          />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-app-text-primary select-none">
            TUSHAL PANDEY
          </span>
        </div>

        {/* Copyright */}
        <p className="text-[10px] font-mono text-app-text-muted uppercase tracking-widest text-center">
          &copy; {new Date().getFullYear()} Tushal Pandey · Built with Intent
        </p>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-app-text-muted hover:text-app-text-primary transition-colors cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <motion.div
            whileHover={shouldReduce ? undefined : { y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </motion.div>
        </button>

      </div>
    </footer>
  );
};

export default Footer;
