import { m, useReducedMotion } from "motion/react";
import { springs, stagger } from "../motion.theme";
import { useLenis } from "../hooks/useLenis";

export default function Hero() {
  const reduce = useReducedMotion();
  const lenis = useLenis();

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) {
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: 0 });
      } else {
        const navOffset = window.innerWidth <= 768 ? -60 : -72;
        const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY + navOffset;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      }
      window.history.pushState(null, "", "#projects");
    }
  };

  return (
    <section id="home" className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-axis" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">
          <span className="live-dot" /> AVAILABLE FOR SELECT PROJECTS <span className="eyebrow-meta">INDIA · IST</span>
        </p>
        <h1 id="hero-title" className="hero-name" aria-label="Tushal Anand">
          <span className="name-line">
            <m.span initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ ...springs.ui, delay: stagger }}>
              Tushal
            </m.span>
          </span>
          <span className="name-line">
            <m.span initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ ...springs.ui, delay: stagger * 2 }}>
              Anand<span className="accent">.</span>
            </m.span>
          </span>
        </h1>
        <div className="hero-intro">
          <p>
            I’m Tushal, a software engineer in India. I build thoughtful web and desktop products, from the first interface to the systems behind it.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary magnetic"
              href="#projects"
              onClick={handleScrollToProjects}
              aria-label="View work"
            >
              View work <span>↘</span>
            </a>
            <a className="button button-quiet magnetic" href="/resume" aria-label="View resume">
              Resume <span>↗</span>
            </a>
          </div>
        </div>
      </div>
      <div className="hero-index">
        <span>SOFTWARE ENGINEER</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  );
}
