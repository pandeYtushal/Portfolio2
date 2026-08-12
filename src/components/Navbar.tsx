import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sun, Moon, X } from "lucide-react";
import { playClickSound } from "../lib/audio";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  theme: string;
  toggleTheme: (e?: React.MouseEvent) => void;
}

/* ─────────────────────────────────────────────────────────────
   MODERN HAMBURGER ICON — 3 lines with staggered widths
───────────────────────────────────────────────────────────── */
const HamburgerIcon = ({ open }: { open?: boolean }) => (
  <motion.span
    aria-hidden
    className="relative flex flex-col justify-center items-end gap-[4px] w-5 h-5 cursor-pointer"
    whileHover="hover"
  >
    <motion.span
      animate={{ rotate: open ? 45 : 0, y: open ? 5.5 : 0 }}
      variants={{
        hover: { width: 20 },
      }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className="block h-[1.5px] rounded-none bg-app-text-primary origin-center"
      style={{ width: 20 }}
    />
    <motion.span
      animate={{ scaleX: open ? 0 : 1, opacity: open ? 0 : 1 }}
      variants={{
        hover: { width: 18, x: -2 },
      }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className="block h-[1.5px] rounded-none bg-app-accent origin-right"
      style={{ width: 12 }}
    />
    <motion.span
      animate={{ rotate: open ? -45 : 0, y: open ? -5.5 : 0 }}
      variants={{
        hover: { width: 20 },
      }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className="block h-[1.5px] rounded-none bg-app-text-primary origin-center"
      style={{ width: 20 }}
    />
  </motion.span>
);

/* ─────────────────────────────────────────────────────────────
   THEME TOGGLE — rounded sliding pill switch
───────────────────────────────────────────────────────────── */
const ThemeToggle = ({
  theme,
  onToggle,
  size = "sm",
}: {
  theme: string;
  onToggle: (e: React.MouseEvent) => void;
  size?: "sm" | "md";
}) => {
  const isDark = theme === "dark";
  const w = size === "md" ? 52 : 42;
  const h = size === "md" ? 26 : 22;
  const thumb = h - 4;
  const travel = w - thumb - 4;

  return (
    <motion.button
      id="theme-toggle-btn"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.1 }}
      className="relative shrink-0 cursor-pointer rounded-full border border-app-border bg-app-surface-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
      style={{ width: w, height: h, display: "flex", alignItems: "center" }}
    >
      <span
        className="absolute flex items-center justify-center transition-opacity duration-200"
        style={{ left: 6, width: thumb - 4, height: thumb - 4 }}
        aria-hidden
      >
        <Moon
          style={{ width: size === "md" ? 11 : 9, height: size === "md" ? 11 : 9, opacity: isDark ? 0 : 0.35 }}
        />
      </span>
      <span
        className="absolute flex items-center justify-center transition-opacity duration-200"
        style={{ right: 6, width: thumb - 4, height: thumb - 4 }}
        aria-hidden
      >
        <Sun
          style={{ width: size === "md" ? 11 : 9, height: size === "md" ? 11 : 9, opacity: isDark ? 0.35 : 0 }}
        />
      </span>

      <motion.span
        animate={{ x: isDark ? 2 : travel }}
        transition={{ type: "spring", stiffness: 500, damping: 36, mass: 0.5 }}
        className="absolute flex items-center justify-center rounded-full shadow-sm"
        style={{
          width: thumb,
          height: thumb,
          top: 2,
          backgroundColor: "var(--color-app-text-primary)",
        }}
        aria-hidden
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon-thumb"
              initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              <Moon style={{ width: size === "md" ? 12 : 10, height: size === "md" ? 12 : 10, color: "var(--color-app-bg)" }} />
            </motion.span>
          ) : (
            <motion.span
              key="sun-thumb"
              initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              <Sun style={{ width: size === "md" ? 12 : 10, height: size === "md" ? 12 : 10, color: "var(--color-app-bg)" }} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
};

/* ─────────────────────────────────────────────────────────────
   FULL-SCREEN OVERLAY
───────────────────────────────────────────────────────────── */
interface FullScreenOverlayProps {
  activeSection: string;
  onClose: () => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  theme: string;
  onToggleTheme: (e: React.MouseEvent) => void;
}

const FullScreenOverlay = ({
  activeSection,
  onClose,
  onNavClick,
  theme,
  onToggleTheme,
}: FullScreenOverlayProps) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "circle(0% at 90% 90%)" }}
      animate={{ opacity: 1, clipPath: "circle(150% at 90% 90%)" }}
      exit={{ opacity: 0, clipPath: "circle(0% at 90% 90%)" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[110] bg-app-bg/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-10 md:hidden overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Overlay"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <img src="/sanskrit logo.png" alt="" aria-hidden className="h-5 w-auto dark:invert opacity-80" />
          <span className="text-[11px] font-mono text-app-text-primary dark:text-white font-bold tracking-wider px-2.5 py-1 rounded-full bg-app-surface border border-app-border">
            {time || "11:28:38 AM"} IST
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} size="sm" />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-app-surface border border-app-border text-app-text-primary cursor-pointer hover:bg-app-surface-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Nav Links — Icon-free Typography */}
      <nav className="flex flex-col gap-2 my-auto py-8">
        {NAV_ITEMS.map((item, i) => {
          const isActive = activeSection === item.href.slice(1);
          return (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={(e) => onNavClick(e, item.href)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.04, duration: 0.28 }}
              className="group flex items-center justify-between py-4 border-b border-app-border/30 transition-colors"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-xs font-mono text-app-text-muted tabular-nums">
                  0{i + 1}
                </span>
                <span
                  className="text-3xl font-black uppercase tracking-wider transition-transform duration-200 group-hover:translate-x-2"
                  style={{
                    color: isActive ? "var(--color-app-accent)" : "var(--color-app-text-primary)",
                  }}
                >
                  {item.label}
                </span>
              </div>
              {isActive && (
                <span className="h-2 w-2 rounded-full bg-app-accent" />
              )}
            </motion.a>
          );
        })}
      </nav>

      {/* Bottom Footer */}
      <div className="flex items-center justify-between shrink-0 pt-4 border-t border-app-border/40">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-app-text-muted">
            Available for work
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-app-text-secondary">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-app-text-primary transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-app-text-primary transition-colors">
            LinkedIn
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-app-text-primary transition-colors">
            X
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN NAVBAR COMPONENT
───────────────────────────────────────────────────────────── */
export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isNavigating = useRef(false);
  const shouldReduce = useReducedMotion();

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section tracking */
  useEffect(() => {
    const handleScroll = () => {
      if (isNavigating.current) return;

      const scrollPosition = window.scrollY + 120;
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.href.slice(1));
        return {
          id: item.href.slice(1),
          offsetTop: el ? el.offsetTop : 0,
          offsetHeight: el ? el.offsetHeight : 0,
        };
      });

      const current = sections.find(
        (sec) =>
          scrollPosition >= sec.offsetTop && scrollPosition < sec.offsetTop + sec.offsetHeight
      );

      if (current) {
        setActiveSection(current.id);
      } else if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Desktop auto-close mobile state */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Lock body scroll when overlay open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Handlers */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.slice(1);
      setActiveSection(id);
      isNavigating.current = true;

      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 54;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setMobileOpen(false);

      setTimeout(() => {
        isNavigating.current = false;
      }, 800);
    },
    []
  );

  const handleThemeToggle = useCallback(
    (e: React.MouseEvent) => {
      playClickSound();
      toggleTheme(e);
    },
    [toggleTheme]
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ── TOP HEADER BAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "border-b border-app-border bg-app-bg/95 backdrop-blur-xl shadow-sm dark:shadow-none"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-6 h-[54px] flex items-center justify-between gap-6">
          {/* Logo + Name */}
          <button
            onClick={scrollToTop}
            aria-label="Go to top"
            className="shrink-0 flex items-center gap-2.5 cursor-pointer group"
          >
            <img
              src="/sanskrit logo.png"
              alt=""
              aria-hidden
              className="h-[18px] w-auto object-contain dark:invert opacity-70 group-hover:opacity-100 transition-opacity duration-200"
            />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-app-text-muted group-hover:text-app-text-primary transition-colors duration-200 select-none">
              Tushal Pandey
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            aria-label="Site navigation"
            className="hidden md:flex items-center gap-0.5"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.href.slice(1);
              const isHovered = hoveredIndex === index;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] transition-colors duration-200"
                  style={{
                    color:
                      isActive || isHovered
                        ? "var(--color-app-text-primary)"
                        : "var(--color-app-text-muted)",
                  }}
                >
                  {isHovered && (
                    <motion.span
                      layoutId="desktop-hover-pill"
                      className="absolute inset-0 bg-app-surface-secondary/40 rounded-md z-0"
                      transition={
                        shouldReduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 300, damping: 28 }
                      }
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="desktop-active-line"
                      className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-app-accent rounded-full z-10"
                      transition={
                        shouldReduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                </a>
              );
            })}
            <span className="mx-3 h-4 w-px bg-app-border" aria-hidden />
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} size="sm" />
          </nav>

          {/* Mobile top-bar: Theme toggle on the right */}
          <div className="md:hidden flex items-center">
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} size="sm" />
          </div>
        </div>
      </header>

      {/* ── BOTTOM CENTER FLOATING SHARP NAVBOX WITH MODERN HAMBURGER ICON ── */}
      <AnimatePresence>
        {!mobileOpen && (
          <motion.button
            key="bottom-menu-pill"
            onClick={() => {
              playClickSound();
              setMobileOpen(true);
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="fixed bottom-6 right-6 z-[107] md:hidden flex items-center justify-center h-11 w-11 rounded-none bg-app-surface/90 backdrop-blur-3xl border border-app-border hover:border-app-accent/60 shadow-2xl shadow-black/40 cursor-pointer transition-colors duration-200"
            aria-label="Open navigation menu"
          >
            <HamburgerIcon open={false} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── FULL-SCREEN MORPHING OVERLAY ── */}
      <AnimatePresence>
        {mobileOpen && (
          <FullScreenOverlay
            activeSection={activeSection}
            onClose={closeMobile}
            onNavClick={handleNavClick}
            theme={theme}
            onToggleTheme={handleThemeToggle}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
