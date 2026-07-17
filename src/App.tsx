import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Stats from "./components/Stats";
import Skills from "./components/Skills";
import Writing from "./components/Writing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  // Theme synchronization
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
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="relative min-h-screen bg-app-bg text-app-text-primary selection:bg-app-accent selection:text-black overflow-hidden font-sans">

      {/* Dynamic grain/noise overlay (Expensive cinematic feel) */}
      <div
        className="fixed inset-0 pointer-events-none z-[999] opacity-[0.015] bg-[repeat] bg-[size:180px_180px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Floating dynamic backdrop gradient mesh (Linear/Stripe style) */}
      <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-app-accent/5 blur-[120px] mix-blend-screen animate-beam" />
        <div className="absolute top-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-app-accent-blue/5 blur-[120px] mix-blend-screen animate-beam" style={{ animationDelay: "-4s" }} />
      </div>

      {/* Interactive custom cursor */}
      <CustomCursor />

      {/* Navigation Dock */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Scrolling Sections Scaffold */}
      <main className="relative z-10 w-full flex flex-col">
        {/* Cinematic Viewport Hero */}
        <Hero />

        {/* Narrative Interactive About Timeline */}
        <About />

        {/* Projects showcase & flagship Hunter */}
        <Projects />

        {/* Counting Stats Dashboard */}
        <Stats />

        {/* Skills Scrolling Marquees */}
        <Skills />

        {/* Medium blog articles */}
        <Writing />

        {/* Direct Contact triggers */}
        <Contact />
      </main>

      {/* Modular site footer */}
      <Footer />
    </div>
  );
};

export default App;
