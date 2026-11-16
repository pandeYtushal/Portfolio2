import { m, useReducedMotion, useScroll, useSpring, useVelocity, useTransform } from "motion/react";
import { useRef } from "react";
import { springs } from "../motion.theme";
const stack = ["RUST", "REACT", "TYPESCRIPT", "TAURI", "AI AGENTS", "VITE", "AUTOMATION", "SYSTEMS"];
export default function StackMarquee() {
  const ref = useRef<HTMLElement>(null); const reduced = useReducedMotion();
  const { scrollY } = useScroll(); const velocity = useVelocity(scrollY); const smooth = useSpring(velocity, springs.gentle);
  const skew = useTransform(smooth, [-1000, 1000], [-3, 3]);
  const duration = useTransform(smooth, [-1000, 0, 1000], ["42s", "34s", "26s"]);
  const Row = ({ reverse = false }: { reverse?: boolean }) => <div className={`marquee-row ${reverse ? "reverse" : ""}`}><m.div className="marquee-content" style={{ animationDuration: duration }}>{[...stack, ...stack].map((name, i) => <span key={`${name}-${i}`}>{name}<i>✳</i></span>)}</m.div></div>;
  return <section ref={ref} className="stack-section" aria-label="Technology stack"><div className="stack-label section-wrap"><span className="eyebrow">TOOLS / METHODS</span><span className="eyebrow-meta">SELECTED</span></div>{reduced ? <div className="stack-static">{stack.map(item => <span key={item}>{item}</span>)}</div> : <m.div style={{ skewX: skew }} className="marquee" aria-hidden="true"><Row /><Row reverse /></m.div>}</section>;
}
