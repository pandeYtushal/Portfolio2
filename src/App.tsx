import React, { lazy, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const About = lazy(() => import("./components/About"));
import CustomCursor from "./components/CustomCursor";
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Writing = lazy(() => import("./components/Writing"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const SectionFallback = () => (
  <div className="min-h-[40vh] w-full" aria-hidden="true" />
);

export const App = () => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "dark";
    }
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (e?: React.MouseEvent) => {
    const overlay = document.getElementById("theme-swipe-overlay");
    if (!overlay || overlay.classList.contains("animating-ripple")) return;

    // Retrieve coordinate points of the trigger click event
    let x = window.innerWidth - 40; // Default fallback to top right area
    let y = 40;

    if (e) {
      x = e.clientX;
      y = e.clientY;
    }

    // Set coordinates as CSS custom variables to feed into clip-path keyframe circle() origin center
    overlay.style.setProperty("--ripple-x", `${x}px`);
    overlay.style.setProperty("--ripple-y", `${y}px`);

    // Dynamically set background color to target theme bg to prevent flashing
    if (theme === "dark") {
      overlay.style.backgroundColor = "#f5f5f7"; // Target light bg
    } else {
      overlay.style.backgroundColor = "#030303"; // Target dark bg
    }

    overlay.classList.add("animating-ripple");

    // Switch the theme exactly halfway through the sweep (0.4s)
    setTimeout(() => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }, 400);

    // Clean up class after animation finishes (0.8s)
    setTimeout(() => {
      overlay.classList.remove("animating-ripple");
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-app-bg text-app-text-primary selection:bg-app-accent selection:text-black overflow-hidden font-sans">
      {/* Theme Transition Swipe Overlay (GPU-Accelerated outside React loop) */}
      <div
        id="theme-swipe-overlay"
        className="fixed inset-0 w-full h-full z-[100000] pointer-events-none"
      />

      {/* Custom Global Cursor */}
      <CustomCursor />

      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-app-accent origin-left z-[9999]"
        style={{ scaleX }}
      />

      <div
        className="fixed inset-0 pointer-events-none z-[998] opacity-[0.015] bg-[repeat] bg-[size:180px_180px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-app-accent/5 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-app-accent-blue/5 blur-[120px] mix-blend-screen" />
      </div>

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Projects />
          <Skills />
          <Writing />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
