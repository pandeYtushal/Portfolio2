import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { PROJECTS_DATA } from "../data/projects";
import { springs } from "../motion.theme";

function ProjectRail() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);
  const reduce = useReducedMotion();
  const trackPointer = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };
  return <section ref={ref} id="projects" className={`work-section section-wrap ${reduce ? "motion-reduced" : ""}`}>
    <div className="section-heading"><div><p className="eyebrow">SELECTED WORK <span className="eyebrow-meta">{String(PROJECTS_DATA.length).padStart(2, "0")} SYSTEMS</span></p><h2>Built to <span className="accent">work.</span></h2></div><p className="section-note">Focused software. Clear interfaces.<br />Systems with a job to do.</p></div>
    <div className="work-sticky"><m.div className="project-track" style={reduce ? undefined : { x }}>
      {PROJECTS_DATA.map((project, index) => <Link viewTransition to={`/project/${project.id}`} className="project-card spotlight-project" onPointerMove={trackPointer} key={project.id}>
        <div className="project-image"><m.img src={project.image} srcSet={`${project.image.replace(".webp", "-640.webp")} 640w, ${project.image.replace(".webp", "-1200.webp")} 1200w`} sizes="(min-width:1024px) 70vw, (min-width:700px) 48vw, 100vw" alt={`${project.title} project interface`} width="1200" height="800" loading="lazy" decoding="async" whileHover={reduce ? undefined : { scale: 1 }} initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={springs.gentle} /><span className="project-number">0{index + 1} / 0{PROJECTS_DATA.length}</span><span className="project-open">↗</span></div>
        <div className="project-meta"><div><p className="eyebrow">{project.tag}</p><h3>{project.title}</h3><p>{project.description}</p><p className="project-impact">{project.impact}</p></div><span className="project-status">{project.status}</span></div>
      </Link>)}
    </m.div></div>
    <div className="work-stack">{PROJECTS_DATA.map((project, index) => <m.article key={project.id} className="project-reveal" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={springs.gentle}><Link viewTransition to={`/project/${project.id}`} className="project-card spotlight-project" onPointerMove={trackPointer}><div className="project-image"><img src={project.image} srcSet={`${project.image.replace(".webp", "-640.webp")} 640w, ${project.image.replace(".webp", "-1200.webp")} 1200w`} sizes="(min-width:1024px) 70vw, (min-width:700px) 48vw, 100vw" alt={`${project.title} project interface`} width="1200" height="800" loading="lazy" /><span className="project-number">0{index + 1} / 0{PROJECTS_DATA.length}</span><span className="project-open">↗</span></div><div className="project-meta"><div><p className="eyebrow">{project.tag}</p><h3>{project.title}</h3><p>{project.description}</p><p className="project-impact">{project.impact}</p></div><span className="project-status">{project.status}</span></div></Link></m.article>)}</div>
  </section>;
}
export default ProjectRail;
