import { useEffect, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { springs, stagger } from "../motion.theme";
const skills = ["Rust", "React", "TypeScript", "AI agents", "Tauri", "Automation", "Web systems"];
export default function About() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (event: PointerEvent) => {
      const tile = (event.target as HTMLElement).closest<HTMLElement>(".spotlight");
      if (!tile) return;
      const rect = tile.getBoundingClientRect();
      tile.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      tile.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce]);
  const reveal = (i: number) => ({ initial: reduce ? false : { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { ...springs.gentle, delay: i * stagger } });
  return <section id="about" className="about-section section-wrap"><div className="section-heading"><div><p className="eyebrow">PROFILE <span className="eyebrow-meta">BASED IN INDIA</span></p><h2>About<span className="accent">.</span></h2></div></div>
    <div className="bento-grid">
      <m.article {...reveal(0)} className="bento-tile bio-tile spotlight"><span className="tile-index">01 / PROFILE</span><p>Engineer focused on <span className="accent">useful systems</span>, direct interfaces, and reliable software.</p><span className="tile-foot">TUSHAL ANAND · SOFTWARE ENGINEER</span></m.article>
      <m.article {...reveal(1)} className="bento-tile portrait-tile spotlight"><img src="/avtar.webp" srcSet="/avtar-320.webp 320w, /avtar-640.webp 640w" sizes="(max-width: 700px) 90vw, 30vw" width="640" height="640" loading="lazy" alt="Portrait of Tushal Anand" /><span className="portrait-label">TUSHAL ANAND · 2026</span></m.article>
      <m.article {...reveal(2)} className="bento-tile skills-tile spotlight"><span className="tile-index">02 / STACK</span><h3>Tools I use.</h3><div className="skill-chips">{skills.map(skill => <span key={skill}>{skill}</span>)}</div></m.article>
      <m.article {...reveal(3)} className="bento-tile location-tile spotlight"><span className="tile-index">03 / LOCATION</span><strong>India<span className="accent">.</span></strong><ISTClock /><span className="tile-foot">IST · UTC +05:30</span></m.article>
      <m.article {...reveal(4)} className="bento-tile stats-tile spotlight"><span className="tile-index">04 / FOCUS</span><strong>Build<span className="accent">.</span></strong><span className="tile-foot">PRODUCT ENGINEERING<br />INTERACTION DESIGN<br />AI AUTOMATION</span></m.article>
    </div>
  </section>;
}
function ISTClock() { const [time] = useClock(); return <span className="clock-value">{time}</span>; }
function useClock() { const [time, setTime] = useState(""); useEffect(() => { const tick = () => setTime(new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date())); tick(); const id = window.setInterval(tick, 1000); return () => window.clearInterval(id); }, []); return [time] as const; }
