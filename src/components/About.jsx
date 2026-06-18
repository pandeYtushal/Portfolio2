import { motion } from "framer-motion";
import { User, Cpu, Layers } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-container border-t border-app-border bg-app-bg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Text Pane (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-app-text-muted">
            Introduction
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-app-text-primary sm:text-4xl md:text-5xl">
            Engineering with Intent
          </h2>
          
          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-app-text-secondary">
            <p>
              I am a software engineer specializing in <strong className="font-semibold text-app-text-primary">AI agents</strong>, <strong className="font-semibold text-app-text-primary">robust full stack systems</strong>, and <strong className="font-semibold text-app-text-primary">responsive web architectures</strong>. I build products that transition cognitive workflows from raw LLM reasoning into dynamic browser execution.
            </p>
            <p>
              My design philosophy is defined by <strong className="font-semibold text-app-text-primary">clean, decoupled architectures</strong>, minimal interfaces, and strict performance metrics. Instead of generic templates, I prioritize building <strong className="font-semibold text-app-text-primary">self-healing action selectors</strong>, optimized client states, and performant render paths.
            </p>
            <p>
              Currently, I engineer <strong className="font-semibold text-app-text-primary">autonomous browser copilots</strong>—orchestrating multi-model pipelines that interpret natural language, ground UI elements visually, and execute tasks with structured context memory.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-app-border">
            <div>
              <div className="flex items-center gap-2 text-app-text-primary font-semibold text-sm">
                <Cpu className="h-4 w-4 text-app-text-secondary" />
                <span>AI Engineering</span>
              </div>
              <p className="mt-2 text-xs text-app-text-secondary">
                Designing agent loops, vision-based UI grounding, and automated form analysis.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-app-text-primary font-semibold text-sm">
                <Layers className="h-4 w-4 text-app-text-secondary" />
                <span>Full Stack Mastery</span>
              </div>
              <p className="mt-2 text-xs text-app-text-secondary">
                Optimizing react render pipelines, Zustand client states, and client-side data compression.
              </p>
            </div>
          </div>
        </div>

        {/* Profile Image Frame (Right 5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="group relative w-64 sm:w-72 aspect-[4/5] rounded-2xl border border-app-border bg-app-surface p-3 shadow-none transition-all duration-300"
          >
            {/* Elegant light sweep gloss overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden">
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-[sweep_1s_ease-in-out]" />
            </div>

            {/* Inner Border Frame */}
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-app-border bg-app-surface-secondary flex items-center justify-center">
              <img
                src="/avtar.png"
                alt="Tushal Pandey"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <span
                className="absolute inset-0 hidden items-center justify-center bg-app-surface-secondary text-app-text-muted"
                aria-hidden
              >
                <User className="h-16 w-16" />
              </span>
            </div>

            {/* Decorative Corner Lines */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-app-text-muted/30 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-app-text-muted/30 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-app-text-muted/30 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-app-text-muted/30 pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
;
