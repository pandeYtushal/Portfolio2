import { lazy, Suspense, useState, useEffect } from "react";
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
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

  const toggleTheme = () => {
    const overlay = document.getElementById("theme-swipe-overlay");
    if (!overlay || overlay.classList.contains("animating")) return;

    overlay.classList.add("animating");

    // Switch the theme exactly halfway through the swipe (0.4s)
    setTimeout(() => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }, 400);

    // Clean up class after animation finishes (0.8s)
    setTimeout(() => {
      overlay.classList.remove("animating");
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-app-bg text-app-text-primary selection:bg-app-accent selection:text-black overflow-hidden font-sans">
      {/* Theme Transition Swipe Overlay (GPU-Accelerated outside React loop) */}
      <div
        id="theme-swipe-overlay"
        className="fixed inset-y-0 left-0 w-full bg-app-accent z-[100000] translate-x-full pointer-events-none"
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
