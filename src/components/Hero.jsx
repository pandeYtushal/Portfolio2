import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Download, ArrowRight, Brain, Eye, Zap, RotateCcw, Layers, MessageSquare, Sparkles } from "lucide-react";
import ResumeModal from "./ResumeModal";

const CYCLING_ROLES = ["AI Agent architectures.", "full stack applications.", "autonomous systems."];
const TRUST_ITEMS = ["AI Agents", "Full Stack Engineering", "Browser Automation", "Modern React", "TypeScript", "Prompt Engineering"];
const MOBILE_TRUST_ITEMS = ["AI Agents", "Browser Automation", "React", "TypeScript", "Prompt Engineering", "Full Stack"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18
    }
  }
};

// Node details & icons for the workflow card
const WORKFLOW_STEPS = [
  { label: "User Prompt", detail: "Apply to Senior Frontend position at Vercel", icon: MessageSquare },
  { label: "Planner", detail: "Parsed target objectives: check form, fill fields, send logs", icon: Brain },
  { label: "Vision", detail: "Locating input coordinates visually bypassing dynamic class shifts", icon: Eye },
  { label: "Executor", detail: "Dispatched keyboard inputs and form file uploads", icon: Zap },
  { label: "Reflection", detail: "Form status check: submitted successfully (200 OK)", icon: RotateCcw },
  { label: "Memory", detail: "Cached session tokens & history logs in background context", icon: Layers },
];

const AIShowcaseCard = ({ theme }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        staggerChildren: 0.08,
      }
    }
  };

  const nodeVariants = {
    hidden: { opacity: 0, x: -12 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className="relative overflow-hidden rounded-2xl border border-app-border bg-app-surface p-1 shadow-none w-full transition-all duration-300"
    >
      {/* Browser shell header */}
      <div className="flex items-center justify-between border-b border-app-border px-4 py-3 bg-app-surface-secondary rounded-t-xl">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-app-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-app-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-app-border" />
        </div>
        {/* Hunter AI logo in center of browser header */}
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-tight text-app-text-primary select-none">
          <Sparkles className="h-3.5 w-3.5 text-app-text-primary" />
          <span>Hunter AI Dashboard</span>
        </div>
        <div className="w-12" />
      </div>

      {/* Dashboard Body */}
      <div className="p-4 sm:p-5 bg-app-bg min-h-[350px] flex flex-col justify-between select-none">

        {/* Flow elements */}
        <div className="relative space-y-4">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <motion.div
                key={step.label}
                variants={nodeVariants}
                className="relative flex items-start gap-3.5">

                {/* Connecting Line with Glow Pulse */}
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-0 w-[1.5px] bg-app-border">
                    {/* Glowing pulse particle moving down */}
                    {isActive && (
                      <motion.div
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-3 rounded-full bg-app-accent blur-[1px]"
                      />
                    )}
                  </div>
                )}

                {/* Node icon sphere */}
                <motion.div
                  animate={{
                    borderColor: isActive ? "var(--color-app-accent)" : "var(--color-app-border)",
                    scale: isActive ? 1.05 : 1,
                  }}
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-app-surface shadow-none transition-all duration-300 ${isActive
                      ? "border-app-accent text-app-accent"
                      : "border-app-border text-app-text-muted"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                </motion.div>

                {/* Node Text & Status Description */}
                <div className="text-left">
                  <h4 className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-app-text-primary" : "text-app-text-muted"
                    }`}>
                    {step.label}
                  </h4>
                  <p className={`text-xs mt-0.5 leading-normal transition-colors duration-300 ${isActive ? "text-app-text-secondary font-medium" : "text-app-text-muted"
                    }`}>
                    {step.detail}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.div>
  );
};

const Hero = ({ theme }) => {
  const [showResume, setShowResume] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);

  // Motion values for tracking cursor positions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor movement with custom Linear-like damping
  const springX = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 24 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    mouseX.set(touch.clientX - rect.left);
    mouseY.set(touch.clientY - rect.top);
  };

  // Cycling Typewriter Effect
  useEffect(() => {
    let timer;
    const fullText = CYCLING_ROLES[roleIndex];
    const speed = isDeleting ? 20 : 50;

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % CYCLING_ROLES.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      id="home"
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-app-bg text-app-text-primary transition-colors duration-300 pt-[100px] pb-[80px] md:pt-32 md:pb-24"
    >
      {/* 1. Strengthened Animated Grid Background (opacity-40 on mobile, 100 on desktop) */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.08)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 dark:opacity-30 md:opacity-100 md:dark:opacity-80 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] animate-[grid-sweep_16s_linear_infinite] pointer-events-none" />

      {/* 2. Smooth Interactive Cursor & Finger Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 dark:opacity-50"
        style={{
          background: `radial-gradient(350px circle at ${springX}px ${springY}px, rgba(220,220,220,0.15), transparent 80%)`,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
        style={{
          background: `radial-gradient(280px circle at ${springX}px ${springY}px, rgba(255,255,255,0.05), transparent 85%)`,
        }}
      />

      {/* 3. Subtle Moving Spotlight Light Beam */}
      <div className="absolute top-[15%] left-[15%] w-[400px] h-[400px] rounded-full bg-app-surface-secondary/20 blur-[130px] pointer-events-none animate-beam z-0" />

      {/* 4. Light Noise Texture Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none mix-blend-overlay dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Grid Container for Layout Splits */}
      <div className="container relative z-10 mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Left Column: Headline copy, buttons, and mobile showcase card */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full">

          {/* Availability Badge - Animated Entrance */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="flex items-center justify-center lg:justify-start mb-6 md:mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-app-border bg-app-surface/60 px-3.5 py-1 text-[10px] font-semibold tracking-wide text-app-text-secondary backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Roles</span>
            </div>
          </motion.div>

          {/* Title & Headline */}
          <div className="w-full">
            <motion.h1
              variants={itemVariants}
              initial="hidden"
              animate="show"
              className="text-[44px] font-bold tracking-[-0.03em] leading-[1.05] md:text-4xl md:font-extrabold md:tracking-tight md:leading-[1.12] lg:text-6xl text-app-text-primary text-center lg:text-left"
            >
              Building Intelligent Products <br className="hidden md:inline" />
              with AI, Full Stack Engineering <br className="hidden md:inline" />
              and Modern Web Technologies.
            </motion.h1>

            {/* Subheading typewriter for desktop */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="show"
              className="hidden md:block text-sm sm:text-base md:text-lg text-app-text-secondary max-w-2xl mx-auto lg:mx-0 min-h-[50px] pt-2 mt-[28px] text-center lg:text-left"
            >
              <span>I construct optimized developer products and </span>
              <span className="font-mono text-app-text-primary border-r-2 border-app-border pr-1 animate-pulse">
                {currentText}
              </span>
            </motion.div>

            {/* Subheading static description for mobile */}
            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate="show"
              className="block md:hidden text-base leading-[1.7] text-app-text-secondary max-w-[90%] mx-auto mt-[28px] text-center font-normal"
            >
              I build AI-powered products, autonomous browser agents, and scalable full-stack applications focused on performance and exceptional user experiences.
            </motion.p>
          </div>

          {/* Tactile CTA Buttons */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="mt-[32px] md:mt-10 flex flex-col md:flex-row justify-center lg:justify-start items-center gap-3.5 md:gap-4 w-full md:w-auto px-6 md:px-0"
          >
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.01, y: -0.5 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group flex h-[56px] md:h-auto w-full md:w-auto items-center justify-center gap-2 rounded-lg bg-zinc-900 px-5 py-3 text-base md:text-sm font-semibold md:font-bold text-white transition hover:bg-zinc-800/90 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 shadow-none"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>

            <motion.button
              onClick={() => setShowResume(true)}
              whileHover={{ scale: 1.01, y: -0.5 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex h-[56px] md:h-auto w-full md:w-auto items-center justify-center gap-2 rounded-lg border border-app-border bg-transparent px-5 py-3 text-base md:text-sm font-semibold md:font-bold text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all duration-300 shadow-none"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </motion.button>
          </motion.div>

          {/* 5. Mobile Showcase Card (block below buttons, above specializing on mobile) */}
          <div className="block lg:hidden w-full mt-10 px-2">
            <AIShowcaseCard theme={theme} />
          </div>

        </div>

        {/* Right Column: Desktop Showcase Card (beside hero on desktop) */}
        <div className="hidden lg:block lg:col-span-5 w-full">
          <AIShowcaseCard theme={theme} />
        </div>

      </div>

      {/* 7. Trust Signals / Specializing Section (Full-width below the grid) */}
      <div className="container relative z-10 mx-auto max-w-6xl px-6 mt-12 md:mt-20">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="pt-8 border-t border-app-border w-full"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-app-text-muted mb-4 text-center">
            Specializing In
          </p>

          {/* Desktop version (remains unchanged) */}
          <div className="hidden md:flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs text-app-text-secondary">
            {TRUST_ITEMS.map((item) => (
              <span key={item} className="flex items-center gap-1.5 font-medium transition-colors hover:text-app-text-primary">
                <span className="text-app-accent">✓</span>
                <span>{item}</span>
              </span>
            ))}
          </div>

          {/* Mobile version (rounded pills) */}
          <div className="flex md:hidden flex-wrap justify-center gap-2.5 px-4">
            {MOBILE_TRUST_ITEMS.map((item) => (
              <motion.span
                key={item}
                whileHover={{ y: -0.5, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center justify-center rounded-full border border-app-border bg-app-surface/60 px-3.5 py-1.5 text-xs font-semibold text-app-text-secondary backdrop-blur-sm"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </section>
  );
};

export default Hero;
