import React, { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";

/* Lazy-loaded storytelling sections */
const Positioning = lazy(() => import("../components/Positioning"));
const Projects = lazy(() => import("../components/Projects"));
const Manifesto = lazy(() => import("../components/Manifesto"));
const About = lazy(() => import("../components/About"));
const Skills = lazy(() => import("../components/Skills"));
const Writing = lazy(() => import("../components/Writing"));
const Contact = lazy(() => import("../components/Contact"));

const SectionFallback = () => (
  <div className="min-h-[40vh] w-full flex items-center justify-center" aria-hidden>
    <span className="block h-px w-8 bg-app-border" />
  </div>
);

export const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <PageTransition>
      <Navbar />
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
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </PageTransition>
  );
};

export default Home;
