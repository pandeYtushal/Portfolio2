import { useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { PROJECTS_DATA } from "../data/projects";
import { springs } from "../motion.theme";

export default function Projects() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const project = PROJECTS_DATA[active];

  return <section id="projects" className="work-section section-wrap" aria-label="Selected projects">
    <div className="section-heading"><div><p className="eyebrow">SELECTED WORK <span className="eyebrow-meta">{String(PROJECTS_DATA.length).padStart(2, "0")} SYSTEMS</span></p><h2>Project<br />index<span className="accent">.</span></h2></div><p className="section-note">Select a system.<br />Open the full case study.</p></div>
    <div className="project-index">
      <div className="project-index-list" role="list" aria-label="Project index">{PROJECTS_DATA.map((item, index) => <Link key={item.id} role="listitem" viewTransition to={`/project/${item.id}`} className={`project-index-row ${active === index ? "is-active" : ""}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}><span className="project-index-number">{item.figNum}</span><span className="project-index-title">{item.title}</span><span className="project-index-tag">{item.tag}</span><span className="project-index-status">{item.status}</span><span className="project-index-arrow">↗</span></Link>)}</div>
      <m.div className="project-index-preview" key={project.id} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={springs.ui}><div className="preview-topline"><span>{project.figNum} / {project.timeline}</span><span>{project.status}</span></div><Link viewTransition to={`/project/${project.id}`} aria-label={`Open ${project.title} case study`}><m.img layoutId={`project-image-${project.id}`} src={project.image} srcSet={`${project.image.replace(".webp", "-640.webp")} 640w, ${project.image.replace(".webp", "-1200.webp")} 1200w`} sizes="(min-width: 1024px) 50vw, 100vw" width="1200" height="800" loading="lazy" decoding="async" alt={`${project.title} project interface`} /></Link><div className="preview-detail"><p>{project.description}</p><span>{project.impact}</span></div></m.div>
    </div>
    <div className="project-mobile-list">{PROJECTS_DATA.map((item, index) => <m.article key={item.id} className={`project-mobile-item ${active === index ? "is-active" : ""}`} initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={springs.gentle}><button type="button" aria-expanded={active === index} onClick={() => setActive(index)}><span>{item.figNum}</span><strong>{item.title}</strong><i>{active === index ? "−" : "+"}</i></button>{active === index && <m.div className="project-mobile-reveal" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={springs.gentle}><Link viewTransition to={`/project/${item.id}`}><img src={item.image} srcSet={`${item.image.replace(".webp", "-640.webp")} 640w, ${item.image.replace(".webp", "-1200.webp")} 1200w`} sizes="100vw" width="1200" height="800" loading="lazy" alt={`${item.title} project interface`} /><span>Open case study ↗</span></Link><p>{item.tag} · {item.status}</p></m.div>}</m.article>)}</div>
  </section>;
}
