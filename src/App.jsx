import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Achievements from './components/Achievements';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Skills />
      <Achievements/>
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;