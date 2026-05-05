import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blog from './components/Blog';
import LiveClock from './components/LiveClock';

function App() {
  return (
    <div className="bg-black text-white">
      {/* Sticky clock bar — mobile only */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/80 bg-black/90 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-between px-5 py-2.5">
          {/* Left: logo + name */}
          <div className="flex items-center gap-2.5">
            {/* Logo + online dot wrapper */}
            <div className="relative h-9 w-9 shrink-0">
              <div className="h-9 w-9 overflow-hidden rounded-full border border-zinc-700 bg-white">
                <img
                  src="/sanskrit%20logo.png"
                  alt="Logo"
                  className="h-full w-full scale-110 object-contain"
                />
              </div>
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">Tushal</span>
          </div>
          {/* Right: clock */}
          <LiveClock />
        </div>
      </header>

      {/* Page content — padded below the sticky bar on mobile only */}
      <div className="pt-12 md:pt-0">
        <Hero />
        <Projects />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default App;