/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import LiveClock from "./LiveClock";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Writing", href: "#writing" },
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
      className="fixed left-0 right-0 top-0 z-[200] h-[2px] origin-left bg-app-accent"
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
        className={`fixed left-1/2 top-4 z-[100] w-[92%] max-w-4xl -translate-x-1/2 rounded-full border backdrop-blur-md transition-all duration-300 ${scrolled
          ? "border-app-border bg-app-surface/80 py-1.5 shadow-none"
          : "border-app-border bg-app-bg/30 py-2"
          }`}
      >
        <div className="relative z-10 mx-auto flex w-full items-center justify-between px-4 sm:px-6">

          {/* Logo Button */}
          <button
            onClick={logoClick}
            className="group flex items-center gap-2 focus-visible:outline-none"
            aria-label="Back to top"
          >
            <div className="relative h-7 w-7 overflow-hidden rounded-full border border-app-border bg-app-surface transition-all duration-300 group-hover:scale-105">
              <img src="/sanskrit%20logo.png" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-sm font-bold tracking-tight text-app-text-primary">Tushal</span>
          </button>

          {/* Nav Links */}
          <div className="hidden items-center gap-1 rounded-full border border-app-border bg-app-surface-secondary/40 p-0.5 sm:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="rounded-full px-3.5 py-1 text-xs font-semibold text-app-text-secondary transition hover:bg-app-surface hover:text-app-text-primary"
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
            <div className="h-3 w-px bg-app-border" />
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
    className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-app-border bg-app-surface text-app-text-secondary transition-all hover:bg-app-surface-secondary hover:text-app-text-primary active:scale-95"
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
          <Sun className="h-[15px] w-[15px]" />
        </motion.span>
      ) : (
        <motion.span
          key="moon"
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="h-[15px] w-[15px]" />
        </motion.span>
      )}
    </AnimatePresence>
  </button>
);

export default Navbar;
