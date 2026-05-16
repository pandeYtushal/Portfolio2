import { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Blog from "./components/Blog";

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Preload audio for consistent performance
  const clickSound = useMemo(() => {
    if (typeof window !== "undefined") {
      return new Audio("/click.wav");
    }
    return null;
  }, []);

  const toggleTheme = () => {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch((err) => console.warn("Audio feedback failed:", err));
    }
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="pt-20 md:pt-0">
        <Hero theme={theme} />
        <Projects />
        <Blog />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default App;
