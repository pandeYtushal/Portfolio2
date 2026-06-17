import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-zinc-100 bg-white dark:border-zinc-900 dark:bg-black transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-6 px-6 py-10 md:px-12">
        
        {/* Left Side Quote */}
        <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 max-w-xs text-center sm:text-left">
          &quot;Design is not just what it looks like and feels like. Design is how it works.&quot;
        </p>

        {/* Right Side Copyright and Trigger */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-[11px] text-zinc-400 dark:text-zinc-500">
          <div className="flex items-center gap-2">
            <p>
              Built by <span className="font-bold text-zinc-800 dark:text-zinc-200">Tushal Pandey</span>
            </p>
            <span className="h-3 w-px bg-zinc-200 dark:bg-zinc-800" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              &copy; {new Date().getFullYear()} All Rights Reserved
            </motion.p>
          </div>

          {/* Back to top scroll button */}
          <button
            onClick={scrollToTop}
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-3.5 w-3.5 text-zinc-550 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
