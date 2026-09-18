import React, { lazy, Suspense } from "react";
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div className="relative min-h-screen bg-app-bg text-app-text-primary font-sans antialiased overflow-hidden selection:bg-app-text-primary selection:text-app-bg">
      
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

      {/* Top Scroll Progress Line - Sleek White */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-app-text-primary origin-left z-[9999]"
        style={{ scaleX }}
        aria-hidden
      />

      {/* Navigation */}
      <Navbar />

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
