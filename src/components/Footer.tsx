import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      ref={ref}
      className="border-t border-app-border bg-app-bg"
    >
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Brand */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-app-text-primary"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "1rem" }}
        >
          Tushal<span style={{ color: "var(--color-app-accent)" }}>.</span>
        </motion.span>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[11px] font-mono text-app-text-muted uppercase tracking-widest"
        >
          &copy; {new Date().getFullYear()} Tushal Pandey
        </motion.p>

        {/* Back to top */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="group flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-app-text-muted hover:text-app-accent transition-colors duration-200 cursor-pointer"
        >
          Top
          <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>

      </div>
    </footer>
  );
};

export default Footer;
