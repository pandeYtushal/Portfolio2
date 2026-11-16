import { m, useReducedMotion } from "motion/react";
import { springs, stagger } from "../motion.theme";

export default function Hero() {
  const reduce = useReducedMotion();
  return <section id="home" className="hero section-wrap">
    <div className="hero-grid" aria-hidden="true" /><div className="hero-axis" aria-hidden="true" />
    <div className="hero-content">
      <p className="eyebrow"><span className="live-dot" /> AVAILABLE FOR SELECT PROJECTS <span className="eyebrow-meta">INDIA · IST</span></p>
      <h1 className="hero-name" aria-label="Tushal Anand"><span className="name-line"><m.span initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ ...springs.ui, delay: stagger }}>Tushal</m.span></span><span className="name-line"><m.span initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ ...springs.ui, delay: stagger * 2 }}>Anand<span className="accent">.</span></m.span></span></h1>
      <div className="hero-bottom"><div className="hero-actions"><a className="button button-primary magnetic" href="#projects">View work <span>↘</span></a><a className="button button-quiet magnetic" href="/resume">Resume <span>↗</span></a></div></div>
    </div>
    <div className="hero-index"><span>SOFTWARE ENGINEER</span><span>SCROLL TO EXPLORE ↓</span></div>
  </section>;
}
