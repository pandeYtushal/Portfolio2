import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItem {
  number: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { number: "01", label: "Home", href: "/#home" },
  { number: "02", label: "About", href: "/#about" },
  { number: "03", label: "Engineering", href: "/#engineering" },
  { number: "04", label: "Selected Work", href: "/#projects" },
  { number: "05", label: "Experience", href: "/#education" },
  { number: "06", label: "Contact", href: "/#contact" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth navigation for both route paths and hash anchors
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
      e.preventDefault();

      // Direct page routes like /resume
      if (!href.includes("#")) {
        navigate(href);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const hash = href.substring(href.indexOf("#"));

      if (location.pathname !== "/") {
        navigate("/" + hash);
      } else {
        // We are already on the home page, scroll smoothly to element
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            // @ts-ignore
            if (window.lenis && typeof window.lenis.scrollTo === "function") {
              // @ts-ignore
              window.lenis.scrollTo(el, { offset: -60, duration: 1.1 });
            } else {
              el.scrollIntoView({ behavior: "smooth" });
            }
          } else if (hash === "#home") {
            // @ts-ignore
            if (window.lenis && typeof window.lenis.scrollTo === "function") {
              // @ts-ignore
              window.lenis.scrollTo(0, { offset: 0, duration: 1.1 });
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }
        }, 50);
      }
    },
    [location.pathname, navigate]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-transparent md:bg-[#F4F4F0]/95 md:backdrop-blur-md md:border-b md:border-app-border/50 py-3.5 sm:py-4 md:shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          : "bg-transparent py-6 sm:py-8"
      } px-6 md:px-12 flex justify-between items-center`}
    >
      {/* Brand / Logo */}
      <div className="z-[110] relative flex items-center">
        <button
          onClick={(e) => handleNavClick(e, "/#home")}
          className="group flex items-center text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-app-text-primary/50 rounded-sm"
          aria-label="Return to top"
        >
          <img
            src="/sanskrit-logo-transparent.png"
            alt="Logo"
            className="h-7 w-auto sm:h-8 object-contain transition-transform duration-300 group-hover:scale-110 shrink-0"
          />
        </button>
      </div>

      {/* Desktop Navigation Links */}
      <nav
        aria-label="Primary Desktop Navigation"
        className="hidden md:flex items-center gap-8 lg:gap-10"
      >
        {NAV_ITEMS.map((item) => {
          const isResumeActive = item.href === "/resume" && location.pathname === "/resume";
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`group relative py-1 font-sans text-xs uppercase tracking-widest transition-colors ${
                isResumeActive
                  ? "text-app-text-primary font-semibold"
                  : "text-app-text-secondary hover:text-app-text-primary"
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-app-text-primary transition-all duration-300 ${
                  isResumeActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          );
        })}
      </nav>

      {/* Status Beacon */}
      <div className="hidden sm:flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-app-text-primary font-semibold">
          Available for Work
        </span>
      </div>
    </header>
  );
};

export default Navbar;
