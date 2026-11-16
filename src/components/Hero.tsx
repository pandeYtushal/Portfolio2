import { useEffect, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { springs, stagger } from "../motion.theme";

const terminal = "$ whoami -> software engineer / rust / react / ai agents";
export default function Hero() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? terminal : "");
  useEffect(() => {
    if (reduce) { setTyped(terminal); return; }
    let i = 0, timer = 0;
    const tick = () => { i++; setTyped(terminal.slice(0, i)); if (i < terminal.length) timer = window.setTimeout(tick, /[\/>]/.test(terminal[i - 1]) ? 240 : 34 + Math.random() * 45); };
    timer = window.setTimeout(tick, 450);
    return () => window.clearTimeout(timer);
  }, [reduce]);
  return <section id="home" className="hero section-wrap">
    <div className="hero-grid" aria-hidden="true" /><m.div className="hero-glow" aria-hidden="true" />
    <div className="hero-content">
      <p className="eyebrow"><span className="live-dot" /> AVAILABLE FOR SELECT PROJECTS <span className="eyebrow-meta">INDIA · IST</span></p>
      <h1 className="hero-name" aria-label="Tushal Anand"><span className="name-line"><m.span initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ ...springs.ui, delay: stagger }}>Tushal</m.span></span><span className="name-line"><m.span initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ ...springs.ui, delay: stagger * 2 }}>Anand<span className="accent">.</span></m.span></span></h1>
      <div className="hero-bottom"><div className="terminal" aria-label={terminal}><span className="terminal-text">{typed}</span><span className="cursor" aria-hidden="true">▍</span></div><div className="hero-actions"><a className="button button-primary magnetic" href="#projects">View work <span>↘</span></a><a className="button button-quiet magnetic" href="/resume">Resume <span>↗</span></a></div></div>
      <div className="hero-specs" aria-label="Portfolio overview"><div><span>FOCUS</span><strong>Systems</strong></div><div><span>STACK</span><strong>React / Rust</strong></div><div><span>WORK</span><strong>05 projects</strong></div><div><span>BASED</span><strong>India</strong></div></div>
    </div>
    <div className="hero-index"><span>SOFTWARE ENGINEER</span><span>SCROLL TO EXPLORE ↓</span></div>
  </section>;
}
