import React, { lazy, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import CustomCursor from "./components/CustomCursor";
import GlobalSpiderManTracker from "./components/GlobalSpiderManTracker";
import Preloader from "./components/Preloader";
import LiveEnvironment from "./components/LiveEnvironment";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Force scroll to top on every route change, overcoming Lenis interpolation
    // @ts-ignore
    if (window.lenis) {
      // @ts-ignore
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-app-bg text-app-text-primary font-sans antialiased overflow-hidden selection:bg-app-text-primary selection:text-app-bg">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Subtle Grain / Noise Overlay (Optional for premium feel) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-screen"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200000] focus:px-4 focus:py-2 focus:bg-app-text-primary focus:text-app-bg focus:text-xs focus:font-bold focus:uppercase focus:tracking-wider focus:outline-none focus:rounded"
      >
        Skip to main content
      </a>

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Sticky Spider-Man */}
      <GlobalSpiderManTracker />

      {/* Live Environment Sync */}
      <LiveEnvironment />

      {/* Top Scroll Progress Line - Sleek White */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-app-text-primary origin-left z-[9999]"
        style={{ scaleX }}
        aria-hidden
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
