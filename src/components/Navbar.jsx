import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import LiveClock from './LiveClock';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled
          ? 'bg-white/80 py-3 backdrop-blur-lg border-b border-zinc-200 dark:bg-black/80 dark:border-zinc-800'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto max-w-6xl px-6 md:px-12 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <img
              src="/sanskrit%20logo.png"
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">Tushal</span>
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.2em] dark:text-zinc-400">Developer</span>
          </div>
        </div>

        {/* Right Section: Clock + Toggle (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <LiveClock />
          </div>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

          <button
            onClick={toggleTheme}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800 dark:hover:border-zinc-700"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
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
                  <Moon className="h-5 w-5 text-blue-600 cursor-pointer" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile View: Toggle + Clock */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex items-center gap-2 mr-1">
            <LiveClock />
          </div>

          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all active:scale-90 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
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
