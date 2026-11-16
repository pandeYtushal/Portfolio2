import { m, useReducedMotion } from "motion/react";
import { springs, stagger } from "../motion.theme";

const groups = [
  ["01", "Languages", ["TypeScript", "JavaScript", "Rust", "Python", "SQL"]],
  ["02", "Interface", ["React", "Next.js", "Tailwind CSS", "Motion", "Vite"]],
  ["03", "Systems", ["Tauri", "Node.js", "Firebase", "PostgreSQL", "MongoDB"]],
  ["04", "Workflow", ["Git", "GitHub", "Figma", "Vercel", "AWS"]],
] as const;

export default function StackMarquee() {
  const reduce = useReducedMotion();
  return <section id="tools" className="tools-section section-wrap" aria-label="Tools and methods">
    <div className="tools-heading"><div><p className="eyebrow">CAPABILITIES <span className="eyebrow-meta">TOOLS / METHODS</span></p><h2>Built with<br />depth<span className="accent">.</span></h2></div><p>Tools selected for the job.<br />Systems made to stay useful.</p></div>
    <div className="tool-index">{groups.map(([number, title, tools], index) => <m.article key={title} className="tool-group" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ ...springs.gentle, delay: index * stagger }}><div className="tool-group-head"><span>{number}</span><h3>{title}</h3></div><ul>{tools.map(tool => <li key={tool}>{tool}<span>↗</span></li>)}</ul></m.article>)}</div>
  </section>;
}
