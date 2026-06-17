/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import LiveClock from "./LiveClock";

const NAV_ITEMS = [
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
      }}
      className="fixed left-0 right-0 top-0 z-[200] h-[2px] origin-left bg-zinc-900 dark:bg-white"
    />
  );
};

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNavClick = useCallback((event, href) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <ScrollProgress />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-1/2 top-4 z-[100] w-[92%] max-w-4xl -translate-x-1/2 rounded-full border backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "border-zinc-200/80 bg-white/70 py-1.5 shadow-sm dark:border-zinc-800/85 dark:bg-zinc-950/70"
            : "border-zinc-100 bg-zinc-50/30 py-2 dark:border-zinc-900/60 dark:bg-black/20"
        }`}
      >
        <div className="relative z-10 mx-auto flex w-full items-center justify-between px-4 sm:px-6">
          
          {/* Logo Button */}
          <button
            onClick={logoClick}
            className="group flex items-center gap-2 focus-visible:outline-none"
            aria-label="Back to top"
          >
            <div className="relative h-7 w-7 overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm transition-all duration-350 group-hover:scale-105 dark:border-zinc-800 dark:bg-zinc-900">
              <img src="/sanskrit%20logo.png" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">Tushal</span>
          </button>

          {/* Nav Links */}
          <div className="hidden items-center gap-1 rounded-full border border-zinc-200/70 bg-white/40 p-0.5 dark:border-zinc-800/70 dark:bg-zinc-900/40 sm:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="rounded-full px-3.5 py-1 text-xs font-semibold text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Clock and Theme Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden min-[460px]:block">
              <LiveClock />
            </div>
            <div className="h-3 w-px bg-zinc-200 dark:bg-zinc-800" />
            <ThemeButton theme={theme} onClick={toggleTheme} />
          </div>
        </div>
      </motion.nav>
    </>
  );
};

const ThemeButton = ({ theme, onClick }) => (
  <button
    onClick={onClick}
    className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
    aria-label="Toggle theme"
  >
    <AnimatePresence mode="wait">
      {theme === "dark" ? (
        <motion.span
          key="sun"
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="h-[15px] w-[15px] text-zinc-400 dark:text-zinc-300" />
        </motion.span>
      ) : (
        <motion.span
          key="moon"
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="h-[15px] w-[15px] text-zinc-600" />
        </motion.span>
      )}
    </AnimatePresence>
  </button>
);

export default Navbar;
