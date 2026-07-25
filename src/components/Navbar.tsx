import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { playClickSound } from "../lib/audio";

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
    <span className="relative z-10 flex w-full justify-between px-1.5 pointer-events-none">
      <Sun className={`h-3 w-3 transition-colors duration-300 ${theme === "light" ? "text-app-text-primary" : "text-app-text-muted"}`} />
      <Moon className={`h-3 w-3 transition-colors duration-300 ${theme === "dark" ? "text-app-text-primary" : "text-app-text-muted"}`} />
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
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 pointer-events-none">
      <div className={`mx-auto max-w-6xl transition-all duration-300 ${scrolled ? "pt-3" : "pt-6"}`}>
        <div className="flex items-center justify-between gap-4">
          
          {/* LEFT ISLAND — Branding */}
          <button
            onClick={logoClick}
            className={`pointer-events-auto hidden md:flex items-center gap-2.5 backdrop-blur-md border border-app-border/60 bg-app-bg/75 shadow-sm transition-all duration-300 hover:border-app-accent/30 select-none cursor-pointer ${
              scrolled ? "px-4 py-2 rounded-xl" : "px-5 py-2.5 rounded-2xl"
            }`}
            aria-label="Back to top"
          >
            <span className="text-xs font-mono font-bold tracking-wider text-app-text-primary uppercase">TP.</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* RIGHT ISLAND — Navigation links & Theme Button */}
          <div 
            className={`pointer-events-auto ml-auto md:ml-0 flex items-center transition-all duration-300 md:backdrop-blur-md md:border md:border-app-border/60 md:bg-app-bg/75 md:shadow-sm md:hover:border-app-accent/20 ${
              scrolled ? "md:p-1 md:rounded-xl gap-2" : "md:p-1.5 md:rounded-2xl gap-3"
            }`}
          >
            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="relative rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-app-text-secondary transition-all hover:text-app-text-primary"
                >
                  {hoveredIdx === idx && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-app-surface-secondary border border-app-border rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 26 }}
                    />
                  )}
                  {item.label}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-4 bg-app-border" />

            {/* Theme Toggle Button */}
            <ThemeButton theme={theme} onClick={handleThemeToggle} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
