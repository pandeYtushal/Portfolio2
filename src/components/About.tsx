import { m, useReducedMotion } from "motion/react";
import { springs, stagger } from "../motion.theme";
import { useNavigate } from "react-router-dom";
import { Button } from '@cred/neopop-web/lib/components';

export default function About() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();

  const principles = [
    {
      num: "01",
      title: "Depth over abstraction",
      desc: "Understanding memory layouts, browser rendering pipelines, and network envelopes before assembling dependencies.",
    },
    {
      num: "02",
      title: "Tactile interaction craft",
      desc: "Treating latency, scroll ergonomics, and animation physics as foundational engineering constraints, not decorative polish.",
    },
    {
      num: "03",
      title: "Autonomous workflow tooling",
      desc: "Architecting self-healing agents, visual coordinate routers, and local telemetry tools that solve practical friction.",
    },
  ];

  return (
    <section id="about" className="about-section section-wrap" aria-labelledby="about-heading">
      {/* Section Header */}
      <div className="section-heading mb-6 md:mb-10">
        <div>
          <p className="eyebrow">
            PROFILE <span className="eyebrow-meta">ABOUT ME</span>
          </p>
          <h2 id="about-heading">
            Behind the<br />systems<span className="accent">.</span>
          </h2>
        </div>
        <p className="section-note">
          Engineering products at the intersection of systems discipline and fluid interaction.
        </p>
      </div>

      {/* Editorial Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Portrait & Identity Spec */}
        <m.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={springs.gentle}
          className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 w-full items-center lg:items-start"
        >
          {/* Portrait Image Frame */}
          <div className="relative rounded-none overflow-hidden border border-white/10 bg-[#121214] shadow-2xl aspect-[4/5] max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] w-full">
            <img
              src="/avtar.webp"
              srcSet="/avtar-320.webp 320w, /avtar-640.webp 640w"
              sizes="(max-width: 768px) 90vw, 360px"
              width="640"
              height="640"
              loading="lazy"
              alt="Portrait of Tushal Anand"
              className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
            />
            {/* Subtle Vignette & Identity Bar */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white/90">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold">
                Tushal Anand
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400">
                2026
              </span>
            </div>
          </div>

          {/* Quick Identity Spec Bar */}
          <div className="rounded-none border border-white/[0.08] bg-[#0d0d10] p-3 sm:p-4 flex flex-col gap-2 sm:gap-2.5 max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] w-full">
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] gap-2">
              <span className="text-neutral-500 uppercase shrink-0">LOCATION</span>
              <span className="text-neutral-200 text-right">India · UTC +05:30</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] gap-2">
              <span className="text-neutral-500 uppercase shrink-0">AVAILABILITY</span>
              <span className="text-emerald-400 flex items-center gap-1.5 font-medium text-right">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                Select Roles &amp; Contracts
              </span>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] gap-2">
              <span className="text-neutral-500 uppercase shrink-0">DISCIPLINE</span>
              <span className="text-neutral-200 text-right">Software Engineering</span>
            </div>
          </div>
        </m.div>

        {/* Right Column: Narrative Bio & Core Principles */}
        <m.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...springs.gentle, delay: stagger }}
          className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 w-full"
        >
          {/* Narrative Statement */}
          <div className="space-y-3.5 sm:space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              My engineering foundation started close to the machine in C and C++, cultivating an intuition for memory efficiency, execution cost, and robust data flow. That discipline directly informs how I construct modern web and desktop systems today.
            </p>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              From architecting native Windows HUD interfaces with Tauri and Rust IPC to building autonomous AI agents with multimodal vision loops and low-latency audio streams, I focus on software that solves tangible problems with zero bloat.
            </p>
          </div>

          {/* Core Engineering Principles */}
          <div className="border-t border-white/10 pt-5 sm:pt-6">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-neutral-500 font-semibold block mb-3 sm:mb-4">
              HOW I BUILD
            </span>
            <div className="space-y-3 sm:space-y-3.5">
              {principles.map((p) => (
                <div
                  key={p.num}
                  className="rounded-none border border-white/[0.07] bg-[#0c0c0f]/60 p-3.5 sm:p-5 flex flex-row items-start gap-3 sm:gap-4 transition-colors hover:border-white/20"
                >
                  <span className="font-mono text-xs font-semibold text-neutral-500 shrink-0 mt-0.5">
                    {p.num}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm md:text-base font-semibold text-white tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-400 mt-1 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-1 sm:pt-2">
            <Button
              variant="primary"
              kind="elevated"
              size="medium"
              colorMode="dark"
              onClick={() => navigate("/resume")}
            >
              View Full Resume ↗
            </Button>
          </div>
        </m.div>
      </div>
    </section>
  );
}
