import { useState, useEffect, useCallback } from "react";
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
   THEME TOGGLE — sliding pill switch
   Thumb slides left (dark/moon) or right (light/sun).
   The icon inside the thumb switches to reflect the CURRENT mode.
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
  const w = size === "md" ? 56 : 44;
  const h = size === "md" ? 28 : 22;
  const thumb = h - 4;
  const travel = w - thumb - 4; // px from left edge to right resting position

  return (
    <motion.button
      id="theme-toggle-btn"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      whileTap={{ scale: 0.93 }}
      transition={{ duration: 0.1 }}
      className="relative shrink-0 cursor-pointer rounded-full border border-app-border bg-app-surface-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-1"
      style={{ width: w, height: h, display: "flex", alignItems: "center" }}
    >
      {/* Track icons */}
      <span
        className="absolute flex items-center justify-center transition-opacity duration-200"
        style={{ left: 7, width: thumb - 6, height: thumb - 4 }}
        aria-hidden
      >
        <Moon
          className="transition-opacity duration-200"
          style={{ width: size === "md" ? 11 : 9, height: size === "md" ? 11 : 9, opacity: isDark ? 0 : 0.35 }}
        />
      </span>
      <span
        className="absolute flex items-center justify-center transition-opacity duration-200"
        style={{ right: 7, width: thumb - 6, height: thumb - 4 }}
        aria-hidden
      >
        <Sun
          className="transition-opacity duration-200"
          style={{ width: size === "md" ? 11 : 9, height: size === "md" ? 11 : 9, opacity: isDark ? 0.35 : 0 }}
        />
      </span>

      {/* Sliding thumb */}
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
              <Moon
                style={{ width: size === "md" ? 12 : 10, height: size === "md" ? 12 : 10, color: "var(--color-app-bg)" }}
              />
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
              <Sun
                style={{ width: size === "md" ? 12 : 10, height: size === "md" ? 12 : 10, color: "var(--color-app-bg)" }}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
};

/* ─────────────────────────────────────────────────────────────
   ANIMATED HAMBURGER — 3 lines morph to × on open
───────────────────────────────────────────────────────────── */
const HamburgerIcon = ({ open }: { open: boolean }) => (
  <span aria-hidden className="flex flex-col justify-center items-end gap-[5px] w-5 h-5">
    <motion.span
      animate={{ rotate: open ? 45 : 0, y: open ? 10 : 0 }}
      transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
      className="block h-[1.5px] rounded-full bg-current origin-center"
      style={{ width: 20 }}
    />
    <motion.span
      animate={{ scaleX: open ? 0 : 1, opacity: open ? 0 : 1 }}
      transition={{ duration: 0.18 }}
      className="block h-[1.5px] rounded-full bg-current"
      style={{ width: 14 }}
    />
    <motion.span
      animate={{ rotate: open ? -45 : 0, y: open ? -10 : 0 }}
      transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
      className="block h-[1.5px] rounded-full bg-current origin-center"
      style={{ width: 20 }}
    />
  </span>
);

/* ─────────────────────────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────────────────────────── */
export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const shouldReduce = useReducedMotion();

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section tracking ── */
  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  /* ── Close on desktop ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Scroll-lock ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Handlers ── */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 54;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setMobileOpen(false);
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
      {/* ════════════════════════════════════════
          TOP BAR
      ════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled
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
            <span className="hidden sm:block text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-app-text-muted group-hover:text-app-text-primary transition-colors duration-200 select-none">
              Tushal Pandey
            </span>
          </button>

          {/* Desktop nav */}
          <nav aria-label="Site navigation" className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] transition-colors duration-200"
                  style={{
                    color: isActive
                      ? "var(--color-app-text-primary)"
                      : "var(--color-app-text-muted)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--color-app-text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--color-app-text-muted)";
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="desktop-active-line"
                      className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-app-accent rounded-full"
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

            {/* Divider */}
            <span className="mx-3 h-4 w-px bg-app-border" aria-hidden />

            {/* Pill toggle — desktop */}
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} size="sm" />
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} size="sm" />

            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              className="flex h-9 w-9 items-center justify-center text-app-text-secondary hover:text-app-text-primary transition-colors cursor-pointer"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
          MOBILE — Backdrop
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[108] bg-black/50 backdrop-blur-[2px] md:hidden"
            onClick={closeMobile}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════
          MOBILE — Right-side sliding panel
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            id="mobile-nav-panel"
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 36, mass: 0.8 }}
            className="fixed top-0 right-0 bottom-0 z-[109] w-72 max-w-[85vw] bg-app-bg border-l border-app-border flex flex-col md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation panel"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 h-[54px] border-b border-app-border shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-app-text-muted">
                Menu
              </span>
              <button
                onClick={closeMobile}
                aria-label="Close navigation"
                className="flex h-8 w-8 items-center justify-center text-app-text-muted hover:text-app-text-primary transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col flex-1 px-3 py-5 gap-0.5 overflow-y-auto"
            >
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={shouldReduce ? {} : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.22, ease: "easeOut" }}
                    className="flex items-center justify-between px-3 py-4 rounded transition-all duration-150"
                    style={{
                      color: isActive
                        ? "var(--color-app-text-primary)"
                        : "var(--color-app-text-secondary)",
                      backgroundColor: isActive
                        ? "var(--color-app-surface)"
                        : "transparent",
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="text-[10px] font-mono tabular-nums"
                        style={{ color: "var(--color-app-text-muted)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-mono font-bold uppercase tracking-[0.12em]">
                        {item.label}
                      </span>
                    </span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-app-accent shrink-0" />
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* Panel footer */}
            <div className="px-5 py-5 border-t border-app-border shrink-0">
              <p className="text-[10px] font-mono text-app-text-muted uppercase tracking-widest mb-1">
                TUSHAL PANDEY
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
