import { m, useReducedMotion } from "motion/react";
import { springs, stagger } from "../motion.theme";

const experience = [
  { period: "Jan 2026 — Present", company: "Freelance", type: "Self-employed", description: "Building polished, high-performance web experiences from interactive portfolios to full-stack applications.", highlights: ["React / Next.js / Vite", "Motion design", "Full-stack integrations"] },
  { period: "Jun 2024 — Aug 2024", company: "Metacrafters", type: "Internship", description: "Developed and deployed smart contracts, decentralized frontends, and on-chain data flows during an intensive summer program.", highlights: ["Solidity & EVM", "Web3.js / Ethers.js", "DApp frontend"] },
] as const;

export default function Experience() {
  const reduce = useReducedMotion();
  return <section id="experience" className="experience-section section-wrap"><div className="experience-heading"><p className="eyebrow">EXPERIENCE <span className="eyebrow-meta">SELECTED ROLES</span></p><h2>Work in<br />practice<span className="accent">.</span></h2></div><div className="experience-list">{experience.map((item, index) => <m.article key={item.company} className="experience-row" initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ ...springs.gentle, delay: index * stagger }}><div className="experience-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{item.period}</span></div><div className="experience-role"><h3>{item.company}</h3><p>{item.type}</p></div><div className="experience-detail"><p>{item.description}</p><div>{item.highlights.map(highlight => <span key={highlight}>{highlight}</span>)}</div></div></m.article>)}</div></section>;
}
