import React, { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import GlobalSpiderManTracker from "./components/GlobalSpiderManTracker";

/* Lazy-loaded storytelling sections */
const Positioning = lazy(() => import("./components/Positioning"));
const Projects = lazy(() => import("./components/Projects"));
const Manifesto = lazy(() => import("./components/Manifesto"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Writing = lazy(() => import("./components/Writing"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const SectionFallback = () => (
  <div className="min-h-[40vh] w-full flex items-center justify-center" aria-hidden>
    <span className="block h-px w-8 bg-app-border" />
  </div>
);

export const App = () => {
  /* Theme state */
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "dark";
    }
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => {
      const overlay = document.getElementById("theme-swipe-overlay");
      if (!overlay || overlay.classList.contains("animating-swipe")) return;

      overlay.style.backgroundColor =
        theme === "dark" ? "#ffffff" : "#0d0d0e";

      overlay.classList.add("animating-swipe");

      const t1 = setTimeout(
        () => setTheme((p) => (p === "dark" ? "light" : "dark")),
        350
      );
      const t2 = setTimeout(
        () => overlay.classList.remove("animating-swipe"),
        750
      );

      return () => { clearTimeout(t1); clearTimeout(t2); };
    },
    [theme]
  );

  return (
    <div
      className="relative min-h-screen bg-app-bg text-app-text-primary font-sans antialiased overflow-x-hidden"
      style={{ overflowX: "hidden" }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200000] focus:px-4 focus:py-2 focus:bg-app-accent focus:text-white focus:text-xs focus:font-bold focus:uppercase focus:tracking-wider focus:outline-none focus:rounded"
      >
        Skip to main content
      </a>

      <div
        id="theme-swipe-overlay"
        className="fixed inset-0 z-[100000] pointer-events-none will-change-[clip-path]"
        aria-hidden
      />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Sticky Spider-Man */}
      <GlobalSpiderManTracker />

      {/* Top Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-app-accent origin-left z-[9999]"
        style={{ scaleX }}
        aria-hidden
      />

      {/* Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Storytelling Journey Main Content */}
      <main id="main-content" className="relative z-10">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Positioning />
          <Projects />
          <Manifesto />
          <About />
          <Skills />
          <Writing />
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
