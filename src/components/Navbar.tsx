import { useState, useEffect, useCallback, useRef } from "react";
import { Sun, Moon } from "lucide-react";

const NAV_ITEMS = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  theme: string;
  toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeToggle = ({
  theme,
  onToggle,
}: {
  theme: string;
  onToggle: (e: React.MouseEvent) => void;
}) => {
  const isDark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-1.5 text-app-text-muted hover:text-app-text-primary transition-colors cursor-pointer"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isNavigating = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isNavigating.current) return;
      const scrollPosition = window.scrollY + 140;

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

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.slice(1);
      setActiveSection(id);
      isNavigating.current = true;

      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: "smooth" });
      }

      setTimeout(() => {
        isNavigating.current = false;
      }, 800);
    },
    []
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
        ? "bg-app-bg/90 backdrop-blur-md py-4 border-b border-app-border/40"
        : "bg-transparent py-6 sm:py-8"
        }`}
      role="banner"
    >
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between">
        {/* Brand Name */}
        <button
          onClick={scrollToTop}
          className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-app-text-primary hover:text-app-accent transition-colors cursor-pointer select-none"
        >
          TUSHAL PANDEY
        </button>

        {/* Quiet Desktop Navigation */}
        <nav aria-label="Site navigation" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-xs font-mono tracking-widest uppercase transition-colors duration-200 ${isActive
                  ? "text-app-text-primary font-bold"
                  : "text-app-text-muted hover:text-app-text-primary"
                  }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="h-3 w-px bg-app-border" />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </nav>

        {/* Mobile Theme Toggle */}
        <div className="md:hidden flex items-center">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
