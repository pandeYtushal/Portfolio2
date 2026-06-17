import { motion } from "framer-motion";
import { User, ShieldAlert, Cpu, Layers } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-container border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Text Pane (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            Introduction
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
            Engineering with Intent
          </h2>
          
          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-zinc-650 dark:text-zinc-400">
            <p>
              I am a software engineer dedicated to building intelligent systems, robust web architectures, and seamless user experiences. By bridging cognitive AI pipelines with modern frontend design, I create products that operate autonomously and solve tangible problems.
            </p>
            <p>
              My design philosophy centers on clean architecture, minimal design interfaces, and strict attention to performance details. I believe that developer portfolios and SaaS platforms alike should feel premium, typography-first, and highly responsive. Rather than building generic interfaces, my focus is on engineering self-healing autonomous workflows, clean state stores, and secure integration boundaries.
            </p>
            <p>
              Currently, my research is focused on autonomous browser agents—orchestrating multi-model systems that interpret natural language, navigate dynamic SPAs through vision and semantic tree recognition, and recover gracefully from dynamic DOM updates.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-100 dark:border-zinc-900">
            <div>
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-sm">
                <Cpu className="h-4 w-4 text-zinc-500" />
                <span>AI Engineering</span>
              </div>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Designing agent loops, vision-based UI grounding, and automated form analysis.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-sm">
                <Layers className="h-4 w-4 text-zinc-500" />
                <span>Full Stack Mastery</span>
              </div>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
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
            whileHover={{ y: -6, rotate: 1 }}
            className="group relative w-64 sm:w-72 aspect-[4/5] rounded-2xl border border-zinc-200/80 bg-zinc-50 p-3 dark:border-zinc-800/80 dark:bg-zinc-900/20 shadow-sm transition-all duration-300"
          >
            {/* Elegant light sweep gloss overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden">
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-[sweep_1s_ease-in-out]" />
            </div>

            {/* Inner Border Frame */}
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/40 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
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
                className="absolute inset-0 hidden items-center justify-center bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                aria-hidden
              >
                <User className="h-16 w-16" />
              </span>
            </div>

            {/* Decorative Corner Lines */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-zinc-350 dark:border-zinc-700 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-zinc-350 dark:border-zinc-700 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-zinc-350 dark:border-zinc-700 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-zinc-350 dark:border-zinc-700 pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
