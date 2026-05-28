import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import LiveClock from "./LiveClock";

// ─── Scroll Progress Bar ────────────────────────────────────────────────────
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        boxShadow: "0 0 10px rgba(249,115,22,0.7), 0 0 4px rgba(251,191,36,0.5)",
      }}
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 origin-left"
    />
  );
};

// ─── Main Navbar ────────────────────────────────────────────────────────────
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

  return (
    <>
      <ScrollProgress />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          boxShadow: scrolled
            ? theme === "dark"
              ? "0 0 0 1px rgba(255,255,255,0.08) inset, 0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.45), 0 0 40px rgba(249,115,22,0.05)"
              : "0 0 0 1px rgba(255,255,255,0.9) inset, 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)"
            : theme === "dark"
              ? "0 0 0 1px rgba(255,255,255,0.05) inset, 0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)"
              : "0 0 0 1px rgba(255,255,255,0.8) inset, 0 4px 20px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
        className={`fixed left-1/2 top-4 z-[100] w-[92%] max-w-4xl -translate-x-1/2 rounded-2xl border backdrop-blur-2xl transition-all duration-300 ${scrolled
          ? "border-zinc-300/50 bg-zinc-100/40 py-2 dark:border-white/[0.07] dark:bg-zinc-950/40"
          : "border-zinc-200/60 bg-zinc-50/20 py-2.5 dark:border-white/[0.05] dark:bg-zinc-950/20"
          }`}
      >
        {/* Frosted glass inner highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: theme === "dark"
              ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 55%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 55%)",
          }}
        />
        <div className="relative z-10 mx-auto flex w-full items-center justify-between px-5">

          {/* Logo */}
          <button
            onClick={logoClick}
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="Back to top"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
              <img src="/sanskrit%20logo.png" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight text-black dark:text-white">
                Tushal
              </span>
            </div>
          </button>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <LiveClock />
            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
            <ThemeButton theme={theme} onClick={toggleTheme} />
          </div>
        </div>
      </motion.nav>
    </>
  );
};

// ─── Theme Toggle Button ────────────────────────────────────────────────────
const ThemeButton = ({ theme, onClick }) => (
  <button
    onClick={onClick}
    className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
    aria-label="Toggle theme"
  >
    <AnimatePresence mode="wait">
      {theme === "dark" ? (
        <motion.span
          key="sun"
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.25 }}
        >
          <Sun className="h-[18px] w-[18px] text-amber-400" />
        </motion.span>
      ) : (
        <motion.span
          key="moon"
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.25 }}
        >
          <Moon className="h-[18px] w-[18px] text-indigo-500" />
        </motion.span>
      )}
    </AnimatePresence>
  </button>
);

export default Navbar;
