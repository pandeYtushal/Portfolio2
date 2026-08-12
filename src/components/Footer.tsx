import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { playClickSound } from "../lib/audio";

export const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="border-t border-app-border bg-app-bg py-6">
      <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand / Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2.5"
        >
          <img
            src="/sanskrit logo.png"
            alt=""
            aria-hidden
            className="h-4 w-auto object-contain dark:invert opacity-75"
          />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-app-text-primary select-none">
            Tushal Pandey
          </span>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-[11px] font-mono text-app-text-muted uppercase tracking-widest text-center"
        >
          &copy; {new Date().getFullYear()} Tushal Pandey. All rights reserved.
        </motion.p>

        {/* Minimal Top Link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="group flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-app-text-muted hover:text-app-accent transition-colors duration-200 cursor-pointer"
        >
          <span>Top</span>
          <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
