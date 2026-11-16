import { useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { springs } from "../motion.theme";

const groups = [
  { number: "01", title: "Languages", detail: "Foundations for systems and interfaces.", tools: ["TypeScript", "JavaScript", "Rust", "Python", "SQL"] },
  { number: "02", title: "Interface", detail: "Interfaces that stay clear under use.", tools: ["React", "Next.js", "Tailwind CSS", "Motion", "Vite"] },
  { number: "03", title: "Systems", detail: "Desktop, backend, and persistent data.", tools: ["Tauri", "Node.js", "Firebase", "PostgreSQL", "MongoDB"] },
  { number: "04", title: "Workflow", detail: "Tools that keep delivery moving.", tools: ["Git", "GitHub", "Figma", "Vercel", "AWS"] },
] as const;

export default function StackMarquee() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = groups[active];
  return <section id="tools" className="tools-section section-wrap" aria-label="Tools and methods">
    <div className="tools-heading"><div><p className="eyebrow">CAPABILITIES <span className="eyebrow-meta">TOOLS / METHODS</span></p><h2>Built with<br />depth<span className="accent">.</span></h2></div><p>Tools selected for the job.<br />Systems made to stay useful.</p></div>
    <div className="tool-lab"><div className="tool-tabs" role="tablist" aria-label="Capability groups">{groups.map((group, index) => <button key={group.title} type="button" role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}><span>{group.number}</span>{group.title}</button>)}</div><m.article key={current.title} className="tool-stage" role="tabpanel" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={springs.ui}><div className="tool-stage-copy"><span>{current.number} / 04</span><h3>{current.title}</h3><p>{current.detail}</p></div><ul>{current.tools.map((tool, index) => <li key={tool}><span>{String(index + 1).padStart(2, "0")}</span>{tool}<i>↗</i></li>)}</ul></m.article></div>
  </section>;
}
