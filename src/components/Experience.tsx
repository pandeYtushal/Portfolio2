import { m, useReducedMotion } from "motion/react";
import { springs, stagger } from "../motion.theme";
import { Typography } from "@cred/neopop-web/lib/components";
import { fontNameSpaces } from "@cred/neopop-web/lib/primitives";

const experience = [
  { period: "Jan 2026 — Present", company: "Freelance", type: "Self-employed", description: "Building polished, high-performance web experiences from interactive portfolios to full-stack applications.", highlights: ["React, Next.js, TypeScript", "Motion design", "Full-stack integrations"] },
  { period: "Jun 2024 — Aug 2024", company: "Metacrafters", type: "Internship", description: "Developed and deployed smart contracts, decentralized frontends, and on-chain data flows during an intensive summer program.", highlights: ["Solidity & EVM", "Web3.js & Ethers.js", "DApp frontend"] },
] as const;

export default function Experience() {
  const reduce = useReducedMotion();
  return (
    <section id="experience" className="experience-section section-wrap" aria-labelledby="experience-heading">
      <div className="experience-heading mb-4 md:mb-6">
        <div className="eyebrow flex items-center gap-2">
          <Typography {...fontNameSpaces.tc12b} color="#9e9e9b">
            EXPERIENCE <span className="opacity-40">SELECTED ROLES</span>
          </Typography>
        </div>
        <h2 id="experience-heading">
          Work in<br />practice<span className="accent">.</span>
        </h2>
        <p className="section-note">
          Independent product engineering and decentralized systems development.
        </p>
      </div>
      <div className="experience-list">
        {experience.map((item, index) => (
          <m.article
            key={item.company}
            className="experience-row"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ ...springs.gentle, delay: index * stagger }}
          >
            <div className="experience-meta">
              <Typography {...fontNameSpaces.tc12b} color="#f1f1ee">
                {String(index + 1).padStart(2, "0")}
              </Typography>
              <Typography {...fontNameSpaces.tc10b} color="#9e9e9b">
                {item.period}
              </Typography>
            </div>
            <div className="experience-role">
              <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                {item.company}
              </h3>
              <Typography {...fontNameSpaces.tc10b} color="#9e9e9b" style={{ marginTop: "4px" }}>
                {item.type}
              </Typography>
            </div>
            <div className="experience-detail">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-[48ch]">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {item.highlights.map(highlight => (
                  <span key={highlight} className="px-2.5 py-1 text-[11px] font-mono rounded-none bg-white/[0.08] border border-white/10 text-neutral-200">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </m.article>
        ))}
      </div>
    </section>
  );
}
