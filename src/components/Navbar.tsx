import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface NavItem {
  id: string;
  number: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", number: "00", label: "Home", href: "/#home" },
  { id: "about", number: "01", label: "About", href: "/#about" },
  { id: "engineering", number: "02", label: "Craft", href: "/#engineering" },
  { id: "projects", number: "03", label: "Work", href: "/#projects" },
  { id: "education", number: "04", label: "Experience", href: "/#education" },
  { id: "notebook", number: "05", label: "Writings", href: "/#notebook" },
  { id: "contact", number: "06", label: "Contact", href: "/#contact" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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

  // Scroll spy: dynamic section detection and URL hash synchronization
  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const sectionIds = ["home", "about", "engineering", "projects", "education", "notebook", "contact"];

    if (window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (sectionIds.includes(hashId)) {
        setActiveSection(hashId);
      }
    }

    let ticking = false;

    const handleScrollSpy = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // If at the very top of page
          if (scrollY < 120) {
            setActiveSection("home");
            if (window.location.hash && window.location.hash !== "#home") {
              window.history.replaceState(null, "", window.location.pathname);
            }
            ticking = false;
            return;
          }

          // If near the bottom of page
          if (window.innerHeight + scrollY >= document.body.offsetHeight - 120) {
            setActiveSection("contact");
            if (window.location.hash !== "#contact") {
              window.history.replaceState(null, "", "#contact");
            }
            ticking = false;
            return;
          }

          // Check visible section by focal line
          const focalPoint = scrollY + window.innerHeight * 0.38;
          let currentId = "home";

          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop;
              const bottom = top + el.offsetHeight;
              if (focalPoint >= top && focalPoint <= bottom) {
                currentId = id;
                break;
              }
            }
          }

          setActiveSection(currentId);
          const targetHash = currentId === "home" ? window.location.pathname : `#${currentId}`;
          if (window.location.hash !== (currentId === "home" ? "" : `#${currentId}`)) {
            window.history.replaceState(null, "", targetHash);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [location.pathname]);

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
      const sectionId = hash.replace("#", "");

      if (location.pathname !== "/") {
        navigate("/" + hash);
      } else {
        // Immediately update state and browser address bar URL
        setActiveSection(sectionId);
        window.history.pushState(null, "", hash === "#home" ? window.location.pathname : hash);

        // Smooth scroll to target section
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            if (window.lenis && typeof window.lenis.scrollTo === "function") {
              window.lenis.scrollTo(el, { offset: -60, duration: 1.1 });
            } else {
              el.scrollIntoView({ behavior: "smooth" });
            }
          } else if (hash === "#home") {
            if (window.lenis && typeof window.lenis.scrollTo === "function") {
              window.lenis.scrollTo(0, { offset: 0, duration: 1.1 });
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }
        }, 30);
      }
    },
    [location.pathname, navigate]
  );

  return (
    <>
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
          const isActive = location.pathname === "/" ? activeSection === item.id : false;
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`group relative py-1 font-sans text-xs uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-app-text-primary font-semibold"
                  : "text-app-text-secondary hover:text-app-text-primary"
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-app-text-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          );
        })}
      </nav>

      {/* Status Beacon & Resume */}
      <div className="hidden sm:flex items-center gap-5">
        <a
          href="https://drive.google.com/file/d/1IC8AQ-YlGLaIRvwjntPes1bw7snDX167/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs uppercase tracking-widest text-app-text-secondary hover:text-app-text-primary transition-colors font-semibold"
        >
          Resume
        </a>
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-app-text-primary font-semibold">
            Available for Work
          </span>
        </div>
      </div>
    </header>

    {/* Connected Floating Mobile Bottom Dock */}
    {location.pathname === "/" && (
      <nav 
        aria-label="Mobile Bottom Navigation" 
        className="fixed bottom-4 left-3 right-3 z-[120] md:hidden flex flex-col items-center pointer-events-none"
      >
        {/* Expanded Navigation Drawer Sheet */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm mb-2.5 bg-[#F4F4F0]/95 backdrop-blur-xl border border-app-border/80 shadow-[0_16px_40px_rgba(0,0,0,0.18)] rounded-2xl p-4 flex flex-col gap-2.5 pointer-events-auto"
            >
              <div className="flex items-center justify-between pb-2 border-b border-app-border/60">
                <span className="font-mono text-[10px] uppercase tracking-widest text-app-text-primary font-bold">
                  Chapters &mdash; Continuous Journey
                </span>
                <span className="font-mono text-[10px] text-app-text-secondary font-semibold">
                  {(NAV_ITEMS.find((n) => n.id === activeSection)?.number || "00")} / 06
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={(e) => {
                        setMobileNavOpen(false);
                        handleNavClick(e, item.href);
                      }}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all ${
                        isActive
                          ? "bg-app-text-primary text-app-surface font-semibold shadow-xs"
                          : "hover:bg-app-surface-secondary text-app-text-secondary active:scale-98"
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-70">{item.number}</span>
                      <span className="font-sans text-xs uppercase tracking-wider truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2.5 mt-1 border-t border-app-border/60 flex items-center justify-between">
                <a
                  href="https://drive.google.com/file/d/1IC8AQ-YlGLaIRvwjntPes1bw7snDX167/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-wider text-app-text-primary font-bold hover:underline flex items-center gap-1.5"
                >
                  <span>Resume (PDF)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="mailto:tushalanand4@gmail.com"
                  className="font-mono text-[11px] uppercase tracking-wider text-app-text-secondary font-semibold hover:text-app-text-primary"
                >
                  Get in touch &rarr;
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Dock Capsule */}
        <div className="pointer-events-auto bg-[#F4F4F0]/95 backdrop-blur-md border border-app-border/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-3.5 py-2 rounded-full flex items-center gap-3">
          {/* Active Chapter Pulse Button */}
          <button
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-app-text-primary font-bold active:scale-95 transition-transform"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span>
              {activeSection === "home" 
                ? "00 Prologue" 
                : `${(NAV_ITEMS.find((n) => n.id === activeSection) || NAV_ITEMS[1]).number} ${(NAV_ITEMS.find((n) => n.id === activeSection) || NAV_ITEMS[1]).label}`}
            </span>
            <span className="text-[9px] text-app-text-secondary">
              {mobileNavOpen ? "▲" : "▼"}
            </span>
          </button>

          <div className="w-[1px] h-3.5 bg-app-border/80" />

          {/* Quick Resume Link */}
          <a
            href="https://drive.google.com/file/d/1IC8AQ-YlGLaIRvwjntPes1bw7snDX167/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-wider font-bold text-app-text-secondary hover:text-app-text-primary transition-colors"
          >
            CV
          </a>

          <div className="w-[1px] h-3.5 bg-app-border/80" />

          {/* Chapters Toggle */}
          <button
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-label="Toggle navigation chapters"
            className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider bg-app-text-primary text-app-surface px-3 py-1 rounded-full font-bold shadow-xs active:scale-95 transition-transform"
          >
            <span>{mobileNavOpen ? "Close" : "Index"}</span>
          </button>
        </div>
      </nav>
    )}
  </>
  );
};

export default Navbar;
