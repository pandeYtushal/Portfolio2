import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chrome,
  Activity,
  ArrowRight,
  Sparkles,
  Eye,
  Brain,
  Layers,
  ShieldAlert,
  Zap,
  Play,
  RotateCcw,
  CheckCircle,
  FileText
} from "lucide-react";

const STEPS = [
  { id: "plan", label: "Planning", icon: Brain, desc: "Decomposes complex goals into sequential action lists." },
  { id: "observe", label: "Observation", icon: Eye, desc: "Scans DOM elements and captures full screenshot buffers." },
  { id: "memory", label: "Memory Layer", icon: Layers, desc: "Recalls profile data and maintains tab context." },
  { id: "action", label: "Execution", icon: Zap, desc: "Types, clicks, uploads, and navigates autonomously." },
  { id: "reflect", label: "Reflection", icon: Activity, desc: "Reviews page changes against target expectations." },
  { id: "heal", label: "Self-Healing", icon: RotateCcw, desc: "Recovers from dynamic DOM changes or input errors." },
];

const STATS = [
  { val: "7+", label: "AI Agents", desc: "Cooperating planner, vision, action & healing sub-systems." },
  { val: "20+", label: "Browser Actions", desc: "Autonomous clicks, typing, navigations, & file uploads." },
  { val: "Multi-LLM", label: "Model Orchestrator", desc: "Swappable Gemini, Claude, GPT-4, and Groq backend hubs." },
  { val: "Vision Enabled", label: "Grounding Engine", desc: "Direct element visual detection from screen coordinates." },
  { val: "Memory Layer", label: "Session Context", desc: "Preserves user profiles, histories and task tokens." },
  { val: "Natural Language", label: "Goal Input", desc: "Translates plain text queries into actions with zero scripting." },
];

const HunterShowcase = ({ onReadCaseStudy }) => {
  const [activeStep, setActiveStep] = useState("plan");
  const [showArch, setShowArch] = useState(false);

  return (
    <section id="hunter-spotlight" className="section-container border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-950/40">
      <div className="mb-16 md:mb-24 text-left max-w-4xl">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[10px] font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 mb-4 shadow-sm">
          <span>Featured Showcase</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
          Hunter: Autonomous Browser Copilot
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base">
          A custom agent system built to transform plain text requests into complex, multi-step browser interactions. Designed with a modular agent orchestration layer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column (Browser Mockup + Simulator) - 7 columns */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 shadow-sm overflow-hidden">
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-4 py-3 bg-zinc-50/50 dark:bg-zinc-900/30">
              <div className="flex items-center gap-1.5">
                <span className="h-3.5 w-3.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <span className="h-3.5 w-3.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <span className="h-3.5 w-3.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <div className="flex items-center gap-2 rounded-md bg-zinc-100 dark:bg-zinc-900 px-3 py-1 w-64 justify-center text-[10px] font-mono text-zinc-400 dark:text-zinc-500 border border-zinc-200/50 dark:border-zinc-800">
                <Chrome className="h-3 w-3 text-zinc-400" />
                <span>hunter.ai/agent-loop</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Browser content body simulating Hunter */}
            <div className="p-4 sm:p-6 bg-white dark:bg-black min-h-[300px] flex flex-col justify-between font-mono text-xs text-zinc-500">
              
              {/* Agent execution feed */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-150 dark:border-zinc-900 pb-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-300">ACTIVE SESSION: JOB_APPLICATION_FLOW</span>
                </div>
                
                <div className="space-y-2.5">
                  <div className="text-zinc-600 dark:text-zinc-400">
                    <span className="text-zinc-400 dark:text-zinc-600">&gt;</span> Prompt: &quot;Find frontend developer role at Vercel, score my resume against it.&quot;
                  </div>
                  <div className="text-zinc-400 dark:text-zinc-500">
                    [Planner] Action tree initialized: 1. Search site 2. Ground job info 3. Read local resume.pdf 4. Calculate score.
                  </div>
                  <div className="text-zinc-650 dark:text-zinc-400">
                    [Observer] Capturing dynamic DOM tree... Found button <span className="text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 px-1 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900">&quot;Search Jobs&quot;</span>
                  </div>
                  <div className="text-zinc-400 dark:text-zinc-500">
                    [ActionEngine] Simulating mouse click at target coordinates: [x: 482, y: 194].
                  </div>
                  <div className="text-zinc-650 dark:text-zinc-400">
                    [VisionEngine] Running grounding checks... Input field confirmed visually.
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>[Self-Healing] Action verified. Resume matching index at 92%.</span>
                  </div>
                </div>
              </div>

              {/* Console control footer */}
              <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center text-[10px]">
                <span>AGENT STATUS: IDLE_WAITING</span>
                <span className="text-zinc-400 dark:text-zinc-600">v1.2.6-stable</span>
              </div>

            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowArch(!showArch)}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {showArch ? "Hide Agent Loop" : "View Agent Loop"}
              <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-300 ${showArch ? "rotate-90" : ""}`} />
            </button>
            
            <button
              onClick={onReadCaseStudy}
              className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              <FileText className="h-3.5 w-3.5" />
              Read Case Study
            </button>
          </div>
        </div>

        {/* Right column (Stats & Steps) - 5 columns */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {STATS.slice(0, 4).map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800/80 dark:bg-zinc-900/10 shadow-sm"
              >
                <span className="text-2xl font-bold font-display text-zinc-900 dark:text-white">
                  {stat.val}
                </span>
                <h4 className="mt-1 text-xs font-bold text-zinc-800 dark:text-zinc-300">
                  {stat.label}
                </h4>
                <p className="mt-1.5 text-[10px] leading-relaxed text-zinc-400 dark:text-zinc-500">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800/80 dark:bg-zinc-900/10 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Agent Specifications
            </h4>
            <div className="space-y-3">
              {STATS.slice(4).map((stat) => (
                <div key={stat.label} className="flex justify-between items-start text-xs border-b border-zinc-100 dark:border-zinc-900 pb-2">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-300">{stat.label}</span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-right max-w-[180px]">{stat.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Expandable Architecture diagram panel */}
      <AnimatePresence>
        {showArch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-12 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/40"
          >
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">
              Cognitive Execution Pipeline
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STEPS.map((step) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.id}
                    className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                        {step.label}
                      </h4>
                      <p className="mt-1 text-[11px] leading-relaxed text-zinc-550 dark:text-zinc-400">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HunterShowcase;
