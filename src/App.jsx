import { useState, useEffect, useRef } from "react";
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

  const clickSoundRef = useRef(null);

  useEffect(() => {
    // Preload audio correctly on mount
    if (typeof window !== "undefined") {
      const audio = new Audio("/click.wav");
      audio.preload = "auto";
      audio.load(); // Force the browser to fetch the file immediately
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
      // Play sound immediately without waiting for fetch
      clickSoundRef.current.play().catch((err) => console.warn("Audio feedback failed:", err));
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
