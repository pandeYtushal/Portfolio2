import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { playClickSound } from "../lib/audio";

import { easeOut } from "../lib/motion";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

interface ThemeButtonProps {
  theme: string;
  onClick: () => void;
}

const ThemeButton = ({ theme, onClick }: ThemeButtonProps) => (
  <button
    onClick={onClick}
    className="group relative flex h-8 w-14 items-center rounded-full border border-app-border bg-app-surface p-1 text-app-text-secondary transition-all hover:text-app-text-primary focus-visible:outline-none cursor-pointer"
    aria-label="Toggle theme"
  >
    <motion.span
      layout
      layoutId="theme-slider"
      className="absolute h-6 w-6 rounded-full bg-app-surface-secondary border border-app-border shadow-sm"
      animate={{
        x: theme === "light" ? 0 : 22,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    />
    <span className="relative z-10 flex w-full justify-between px-1 pointer-events-none">
      <Sun className={`h-3.5 w-3.5 transition-colors duration-300 ${theme === "light" ? "text-app-text-primary" : "text-app-text-muted"}`} />
      <Moon className={`h-3.5 w-3.5 transition-colors duration-300 ${theme === "dark" ? "text-app-text-primary" : "text-app-text-muted"}`} />
    </span>
  </button>
);

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeToggle = useCallback(() => {
    playClickSound();
    toggleTheme();
  }, [toggleTheme]);

  const logoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNavClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100]"
      >
        {/* Main navbar container */}
        <div className={`mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-500 ${scrolled ? "pt-2" : "pt-5"}`}>
          <div className="flex items-center justify-between gap-4">

            {/* LEFT — Logo Block */}
            <button
              onClick={logoClick}
              className={`hidden sm:flex group items-center gap-3 backdrop-blur-xl border border-app-border/50 bg-app-surface/80 px-4 py-2 transition-all duration-300 hover:border-app-accent/30 ${
                scrolled ? "rounded-bl-2xl rounded-tl-2xl" : "rounded-2xl"
              }`}
              aria-label="Back to top"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-xl border border-app-border bg-app-surface transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                <img src="/sanskrit%20logo.png" alt="Logo" className="h-full w-full object-cover" />
              </div>
              <AnimatePresence>
                {!scrolled && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                    className="flex flex-col items-start overflow-hidden whitespace-nowrap"
                  >
                    <span className="text-sm font-bold tracking-tight text-app-text-primary leading-none">Tushal</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-mono font-bold text-app-text-muted">CORE ONLINE</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* CENTER — Orange connecting line (visible on scroll) */}
            <div className={`hidden sm:block flex-1 h-px transition-all duration-500 ${
              scrolled
                ? "bg-gradient-to-r from-app-accent/30 via-app-accent/50 to-app-accent/30"
                : "bg-gradient-to-r from-app-border/20 via-app-border/40 to-app-border/20"
            }`} />

            {/* RIGHT — Nav Links Block */}
            <div className={`hidden sm:flex items-center gap-0 backdrop-blur-xl border border-app-border/50 bg-app-surface/80 transition-all duration-300 hover:border-app-accent/20 ${
              scrolled ? "rounded-br-2xl rounded-tr-2xl p-1" : "rounded-2xl p-1.5"
            }`}>
              {NAV_ITEMS.map((item, idx) => {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="relative flex items-center rounded-xl px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-app-text-secondary transition hover:text-app-text-primary focus-visible:outline-none"
                  >
                    {hoveredIdx === idx && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-app-surface-secondary rounded-xl -z-10 border border-app-accent/15 shadow-[0_0_20px_rgba(255,138,0,0.06)]"
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      />
                    )}
                    {item.label}
                  </a>
                );
              })}

              {/* Divider */}
              <div className="w-px h-5 bg-app-border/40 mx-1" />

              {/* Theme toggle inside nav block */}
              <ThemeButton theme={theme} onClick={handleThemeToggle} />
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 sm:hidden ml-auto">
              <ThemeButton theme={theme} onClick={handleThemeToggle} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
