import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import HunterShowcase from "./components/HunterShowcase";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Skills from "./components/Skills";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const [overrideSelectedProject, setOverrideSelectedProject] = useState(null);
  const clickSoundRef = useRef(null);

  useEffect(() => {
    // Preload audio feedback feedbacks
    if (typeof window !== "undefined") {
      const audio = new Audio("/click.wav");
      audio.preload = "auto";
      audio.load();
      clickSoundRef.current = audio;
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch((err) => console.warn("Audio feedback failed:", err));
    }
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-350 dark:bg-black dark:text-zinc-100">
      
      {/* Scroll Progress & Sticky Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="w-full">
        {/* Spotlight Hero Section */}
        <Hero theme={theme} />

        {/* Written introduction */}
        <About />

        {/* Categorized Tech Capability Cards */}
        <TechStack />

        {/* Dedicated Hunter Spotlight Showcase */}
        <HunterShowcase onReadCaseStudy={() => setOverrideSelectedProject("Hunter")} />

        {/* Startup Case Studies Project List */}
        <Projects
          overrideSelectedProject={overrideSelectedProject}
          onClearOverride={() => setOverrideSelectedProject(null)}
        />

        {/* Milestones timeline */}
        <Timeline />

        {/* Expertise Skills Cards */}
        <Skills />

        {/* RSS Medium feed Blog Section */}
        <Blog />

        {/* Available channels Contact Panel */}
        <Contact />

        {/* Minimal Footer */}
        <Footer />
      </main>

    </div>
  );
};

export default App;
