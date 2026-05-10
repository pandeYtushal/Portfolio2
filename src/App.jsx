import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blog from './components/Blog';

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const audio = new Audio('/click.mp3');
    audio.play().catch(err => console.log("Audio play failed:", err));
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="bg-white text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Page content — padded for the navbar */}
      <div className="pt-20 md:pt-0">
        <Hero theme={theme} toggleTheme={toggleTheme} />
        <Projects />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;