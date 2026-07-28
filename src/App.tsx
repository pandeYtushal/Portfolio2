import React, { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";

/* Lazy-loaded sections */
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Writing = lazy(() => import("./components/Writing"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

/* Skeleton placeholder shown while a section loads */
const SectionFallback = () => (
  <div className="min-h-[50vh] w-full flex items-center justify-center" aria-hidden>
    <span className="block h-px w-8 bg-app-border" />
  </div>
);

export const App = () => {
  /* ── Theme state ── */
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

  /* ── Scroll progress (thin line at top) ── */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    restDelta: 0.001,
  });

  /* ── Apply dark class + persist ── */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ── Theme wipe toggle ── */
  const toggleTheme = useCallback(
    () => {
      const overlay = document.getElementById("theme-swipe-overlay");
      if (!overlay || overlay.classList.contains("animating-swipe")) return;

      /* Target bg colour prevents a flash on slow devices */
      overlay.style.backgroundColor =
        theme === "dark" ? "#ffffff" : "#0c0c0c";

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
      {/* ── GPU-accelerated theme-transition vertical wipe overlay ──
           Lives outside the React component tree so it never triggers
           React re-renders during the animation. */}
      <div
        id="theme-swipe-overlay"
        className="fixed inset-0 z-[100000] pointer-events-none will-change-[clip-path]"
        aria-hidden
      />

      {/* ── Custom cursor (desktop / pointer:fine only) ── */}
      <CustomCursor />

      {/* ── Scroll-progress line ──
           1px thin accent line at the very top of the viewport.
           Sits above the navbar but below the ripple overlay. */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-app-accent origin-left z-[9999]"
        style={{ scaleX }}
        aria-hidden
      />

      {/* ── Navigation ── */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* ── Page content ── */}
      <main id="main-content" className="relative z-10">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Projects />
          <Skills />
          <Writing />
          <Contact />
        </Suspense>
      </main>

      {/* ── Footer ── */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
