import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import LiveClock from "./LiveClock";

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <nav
      className={`fixed left-1/2 top-4 z-[100] w-[90%] max-w-4xl -translate-x-1/2 rounded-2xl border border-zinc-200/50 backdrop-blur-md transition-all duration-300 dark:border-zinc-800/50 ${
        scrolled ? "bg-white/90 py-2 shadow-lg dark:bg-black/90" : "bg-white/40 py-2.5 dark:bg-zinc-900/40"
      }`}
    >
      <div className="mx-auto flex w-full items-center justify-between px-6">
        {/* Logo Section */}
        <div className="group flex cursor-pointer items-center gap-3" onClick={handleLogoClick}>
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <img src="/sanskrit%20logo.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">Tushal</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"></span>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden items-center gap-6 md:flex">
          <LiveClock />
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          <button
            onClick={toggleTheme}
            className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun className="h-5 w-5 text-yellow-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="h-5 w-5 text-blue-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <LiveClock />
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all active:scale-90 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="sun-mobile"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <Sun className="h-4 w-4 text-yellow-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon-mobile"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <Moon className="h-4 w-4 text-blue-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
