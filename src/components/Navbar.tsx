import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useDragControls } from "framer-motion";
import { Sun, Moon } from "lucide-react";
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
      {/* track icons */}
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

      {/* sliding thumb */}
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

/* bottom sheet — swipe to close, staggered links, focus trap */
interface BottomSheetProps {
  activeSection: string;
  onClose: () => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  shouldReduce: boolean;
  theme: string;
  onToggleTheme: (e: React.MouseEvent) => void;
}

const BottomSheet = ({
  activeSection,
  onClose,
  onNavClick,
  shouldReduce,
}: BottomSheetProps) => {
  const sheetRef = useRef<HTMLElement>(null);
  const dragControls = useDragControls();

  /* ── Focus trap ── */
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    const focusable = sheet.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    document.addEventListener("keydown", trap);
    first?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [onClose]);

  /* ── Close on scroll ── */
  useEffect(() => {
    const onScroll = () => onClose();
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onClose]);

  return (
    <motion.aside
      id="mobile-nav-panel"
      layoutId="mobile-nav"
      layout
      ref={sheetRef}
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.4 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 80 || info.velocity.y > 300) onClose();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 38, mass: 0.7 }}
      className="fixed bottom-0 left-0 right-0 z-[109] bg-app-bg border-t border-app-border flex flex-col md:hidden overflow-hidden"
      style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: "85dvh" }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
    >
      {/* Drag handle — touch target to initiate swipe */}
      <div
        className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing shrink-0"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="h-1 w-10 rounded-full bg-app-border" />
      </div>

      {/* Sheet header */}
      <div className="flex items-center justify-between px-5 py-3 shrink-0">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted">
          {activeSection ? (
            <>
              <span className="text-app-accent">{activeSection}</span>
              <span className="mx-1.5 opacity-30">/</span>
              <span>Menu</span>
            </>
          ) : "Menu"}
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-8 w-8 items-center justify-center text-app-text-muted hover:text-app-text-primary transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav
        aria-label="Mobile navigation"
        className="flex flex-col px-3 pb-4 gap-0.5 overflow-y-auto"
      >
        {NAV_ITEMS.map((item, i) => {
          const isActive = activeSection === item.href.slice(1);
          return (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={(e) => onNavClick(e, item.href)}
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduce ? {} : { opacity: 0, y: 10, transition: { delay: (NAV_ITEMS.length - 1 - i) * 0.03, duration: 0.15 } }}
              transition={{ delay: i * 0.05, duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex items-center justify-between px-4 py-4 transition-colors duration-150"
              style={{
                color: isActive ? "var(--color-app-text-primary)" : "var(--color-app-text-secondary)",
                backgroundColor: isActive ? "var(--color-app-surface)" : "transparent",
              }}
            >
              {/* Left accent bar */}
              {isActive && (
                <motion.span
                  layoutId="sheet-active-bar"
                  className="absolute left-0 top-2 bottom-2 w-[2px] bg-app-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="flex items-center gap-4">
                <span
                  className="text-[10px] font-mono tabular-nums w-5 text-right"
                  style={{ color: "var(--color-app-text-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-mono font-bold uppercase tracking-[0.1em]">
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

      {/* Bottom safe area */}
      <div className="shrink-0 h-6" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
    </motion.aside>
  );
};

/* main navbar */
export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isNavigating = useRef(false);
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
    const handleScroll = () => {
      if (isNavigating.current) return;

      const scrollPosition = window.scrollY + 120; // Offset for header + buffer

      // Check if we are at the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // Find the current section
      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.href.slice(1));
        return {
          id: item.href.slice(1),
          offsetTop: el ? el.offsetTop : 0,
          offsetHeight: el ? el.offsetHeight : 0,
        };
      });

      // Find which section contains the scrollPosition
      const current = sections.find(
        (sec) =>
          scrollPosition >= sec.offsetTop &&
          scrollPosition < sec.offsetTop + sec.offsetHeight
      );

      if (current) {
        setActiveSection(current.id);
      } else if (window.scrollY < 100) {
        // If at the very top, clear active section
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
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
      {/* top bar */}
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
                    color: isActive || isHovered
                      ? "var(--color-app-text-primary)"
                      : "var(--color-app-text-muted)",
                  }}
                >
                  {/* Sliding Hover Background Pill */}
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

            {/* Divider */}
            <span className="mx-3 h-4 w-px bg-app-border" aria-hidden />

            {/* Pill toggle — desktop */}
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} size="sm" />
          </nav>

          {/* Mobile: only theme toggle in top bar — nav is in the floating FAB */}
          <div className="md:hidden flex items-center">
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} size="sm" />
          </div>
        </div>
      </header>

      {/* backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[108] bg-black/60 backdrop-blur-[3px] md:hidden"
            onClick={closeMobile}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* bottom sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <BottomSheet
            activeSection={activeSection}
            onClose={closeMobile}
            onNavClick={handleNavClick}
            shouldReduce={!!shouldReduce}
            theme={theme}
            onToggleTheme={handleThemeToggle}
          />
        )}
      </AnimatePresence>
      {/* floating FAB — mobile only */}
      <AnimatePresence>
        {!mobileOpen && (
          <motion.button
            id="mobile-menu-btn"
            layoutId="mobile-nav"
            layout
            key="fab"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-controls="mobile-nav-panel"
            className="fixed bottom-6 right-6 z-[107] md:hidden flex items-center justify-center px-5 py-3 cursor-pointer"
            style={{
              background: "var(--color-app-surface)",
              border: "1px solid var(--color-app-border)",
              borderRadius: 999,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.12)",
            }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            <HamburgerIcon open={false} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
