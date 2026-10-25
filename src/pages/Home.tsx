import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import About from "../components/About";
import Engineering from "../components/Engineering";
import Projects from "../components/Projects";
import Education from "../components/Education";
import Notebook from "../components/Notebook";
import Contact from "../components/Contact";

const LANDSCAPES = [
  { id: "home", src: "/landscape-bg.jpg", alt: "Morning hills & open road" },
  { id: "about", src: "/landscape-about.jpg", alt: "Great ancient oak & countryside" },
  { id: "engineering", src: "/landscape-skills.jpg", alt: "Stone bridge over mountain stream" },
  { id: "projects", src: "/landscape-projects.jpg", alt: "Explorer overlooking sunlit valley" },
  { id: "reflection", src: "/landscape-reflection.jpg", alt: "Reflective mountain lake" },
  { id: "contact", src: "/landscape-contact.jpg", alt: "Tuscan road sunset" },
];

export const Home = () => {
  const { hash } = useLocation();
  const [activeBg, setActiveBg] = useState<string>("home");

  useEffect(() => {
    // Preload all high-res landscape backdrops
    LANDSCAPES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });

    const sectionToBg: Record<string, string> = {
      home: "home",
      about: "about",
      engineering: "engineering",
      projects: "projects",
      education: "reflection",
      notebook: "reflection",
      contact: "contact",
    };

    let sectionOffsets: { id: string; top: number; bottom: number }[] = [];

    const measureSections = () => {
      sectionOffsets = ["home", "about", "engineering", "projects", "education", "notebook", "contact"].map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: 0, bottom: 0 };
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        return { id, top, bottom: top + el.offsetHeight };
      });
    };

    measureSections();
    window.addEventListener("resize", measureSections, { passive: true });

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (scrollY < 100) {
            setActiveBg("home");
            ticking = false;
            return;
          }

          if (window.innerHeight + scrollY >= document.body.offsetHeight - 120) {
            setActiveBg("contact");
            ticking = false;
            return;
          }

          const focalPoint = scrollY + window.innerHeight * 0.42;
          let found = "home";

          for (const s of sectionOffsets) {
            if (focalPoint >= s.top && focalPoint <= s.bottom) {
              found = sectionToBg[s.id] || "home";
              break;
            }
          }

          setActiveBg(found);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", measureSections);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (window.lenis && typeof window.lenis.scrollTo === "function") {
            window.lenis.scrollTo(el, { offset: -60, duration: 1.1 });
          } else {
            window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
          }
        }
      }, 150);
    }
  }, [hash]);

  return (
    <PageTransition>
      <Navbar />

      {/* Fixed Fullscreen Landscape Canvas (Smooth Crossfading High-Res Artwork) */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 pointer-events-none -z-10 select-none overflow-hidden"
      >
        {LANDSCAPES.map((item) => {
          const isActive = activeBg === item.id;
          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.02,
                zIndex: isActive ? 2 : 1,
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="absolute inset-0 w-full h-full will-change-[opacity,transform]"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center filter brightness-[1.0] contrast-[1.02]"
              />
            </motion.div>
          );
        })}

        {/* Ambient Warm Parchment Scrim: zero blur for instant 120fps performance + rich font legibility */}
        <div className="absolute inset-0 bg-[#F4F4F0]/58 z-10 pointer-events-none" />

        {/* Subtle Vignette & Depth Wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-app-bg/20 z-10 pointer-events-none" />
      </div>

      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Engineering />
        <Projects />
        <Education />
        <Notebook />
        <Contact />
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Home;
