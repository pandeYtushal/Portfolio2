import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import ResumePage from "./pages/ResumePage";
import GlobalSpiderManTracker from "./components/GlobalSpiderManTracker";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

  useEffect(() => {
    // Simple load simulate
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return null; // Very minimal load state, avoid flashy preloader

  return (
    <div className="relative min-h-screen bg-transparent text-app-text-primary font-sans antialiased overflow-x-clip selection:bg-app-text-primary selection:text-app-bg bg-grain">
      
      {/* Fixed Atmospheric Pastoral Landscape Backdrop */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none"
      >
        <img
          src="/landscape-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02]"
        />
        {/* Soft Ambient Parchment Scrim */}
        <div className="absolute inset-0 bg-[#F4F4F0]/30 pointer-events-none" />
      </div>

      {/* Sticky Spider-Man */}
      <GlobalSpiderManTracker />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200000] focus:px-4 focus:py-2 focus:bg-app-text-primary focus:text-app-bg focus:text-xs focus:font-bold focus:uppercase focus:tracking-wider focus:outline-none focus:rounded"
      >
        Skip to main content
      </a>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
