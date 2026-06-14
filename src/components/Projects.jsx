/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect, useRef } from "react";
import {
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
  FaGithub,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  Expand,
  X,
  ExternalLink,
  Brain,
  Eye,
  Shield,
  Cpu,
  Layers,
  Zap,
  Target,
  Globe,
  FileText,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   PROJECT DATA
   ═══════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    title: "Hunter",
    image: "/meme.png",
    status: "In Development",
    description:
      "An autonomous AI browser copilot that transforms natural language goals into intelligent browser actions using a modular agent architecture.",
    highlight:
      "AI-powered browser automation with planning, vision, and self-healing capabilities.",
    longDescription:
      "Hunter is an autonomous AI browser copilot that transforms natural language goals into intelligent browser actions. Unlike traditional browser extensions, Hunter uses a modular agent architecture with planning, reasoning, observation, reflection, self-healing, long-term memory, and vision capabilities to understand webpages and assist users in real time. It can analyze job descriptions, match resumes against job requirements, generate tailored cover letters, research companies, detect and autofill application forms, and visually identify interface elements such as buttons and upload fields.",
    keyPoints: [
      "Modular agent architecture with separate planning, observation, action, and reflection layers",
      "Vision capabilities for screenshot analysis and UI element detection (buttons, forms, upload fields)",
      "Self-healing error recovery that adapts to DOM changes and retries with alternative strategies",
      "Long-term memory for persistent context across browsing sessions",
      "Provider-agnostic design enabling seamless swapping between Gemini, OpenAI, Anthropic, and Groq",
      "Real-time job description analysis with resume scoring and gap identification",
    ],
    tech: ["Chrome Extension", "AI Agents", "Multi-LLM"],
    fullTech: [
      "JavaScript",
      "Chrome Extensions API",
      "Manifest V3",
      "Gemini API",
      "OpenAI API",
      "Anthropic API",
      "Groq API",
      "DOM Manipulation",
      "Vision Models",
      "IndexedDB",
      "Web Workers",
    ],
    challenges: "Developing a highly reliable selector agent inside dynamic Single Page Applications (SPAs). Standard class names and DOM paths shift constantly, so we engineered a self-healing layer that combines semantic element trees, layout coordinates, and visual snapshot analysis to target active buttons and inputs even when the source code changes.",
    features: [
      { title: "Job Analysis", desc: "Parses job descriptions to extract requirements, skills, and qualifications automatically.", iconName: "FileText" },
      { title: "Resume Matching", desc: "Scores your resume against job requirements and highlights gaps or strong matches.", iconName: "Target" },
      { title: "Cover Letter Gen", desc: "Generates tailored cover letters that mirror job language and showcase relevant experience.", iconName: "Sparkles" },
      { title: "Smart Autofill", desc: "Detects application forms and populates fields using your profile data with one click.", iconName: "Cpu" },
    ],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal",
    featured: true,
  },
  {
    title: "Portfolio",
    image: "/port.png",
    status: "Live",
    description:
      "A modern, responsive portfolio website showcasing my projects, skills, and experience with a clean theme system and smooth interactions.",
    highlight:
      "Personal brand system with dark mode, live resume, and animated sections.",
    longDescription:
      "A custom-built, high-performance personal portfolio website designed to present professional work, blog posts, and interactive resumes with zero page reloads. Built using React, Vite, and Tailwind CSS, it features smooth Framer Motion animations, a dynamic dark/light mode toggle, an interactive live clock, and a customized resume modal. The layout is optimized for high-speed page loads, accessibility, and clean aesthetics.",
    keyPoints: [
      "Fully responsive layout with customized theme engine supporting immediate theme toggling without layout shifts",
      "Framer Motion integration for layout animations, header transitions, and section-by-section scroll animations",
      "Custom React hook context for audio interactions, providing immediate audio feedback on clicks",
      "Optimized asset delivery, utilizing WebP images and localized modern fonts",
    ],
    tech: ["React", "Tailwind CSS", "Vite", "JavaScript"],
    fullTech: ["React 19", "Vite", "Tailwind CSS", "Framer Motion", "Lucide React", "JavaScript (ES6+)", "PostCSS"],
    challenges: "Balancing dark/light mode switches dynamically without triggering color flash on load. Solved by executing theme classes inline on document element loading and persisting the preference to local storage.",
    features: [
      { title: "Fluid Theme System", desc: "Local-storage persistent light and dark modes with customized color palettes.", iconName: "Sparkles" },
      { title: "Framer Motion", desc: "Liquid animations, modal entries, and accordion expansions for project lists.", iconName: "Zap" },
      { title: "Audio Feedback", desc: "A preloaded web audio system for instant physical click response.", iconName: "Cpu" },
    ],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal",
  },
  {
    title: "Urban Utility Report",
    image: "/urban.png",
    status: "Live",
    description:
      "A utility reporting system for urban areas with issue submission, tracking, and clear data views for better planning.",
    highlight:
      "Civic reporting flow with fast submissions and admin-ready issue tracking.",
    longDescription:
      "A localized citizen utility reporting system that bridges the gap between urban residents and municipal administrators. Users can document civic issues (e.g., potholes, street light failures, water leakage) with descriptions and photo uploads. The system tracks submissions through statuses (Submitted, In Review, Resolved) and compiles them in a public dashboard to promote transparency and citizen engagement.",
    keyPoints: [
      "Real-time ticket logging using Firebase Firestore database and email alerts for admins",
      "Image upload and hosting pipeline to document and verify issue authenticity on-site",
      "Responsive issue tracker with status-based filtering (All, Open, In Progress, Resolved)",
      "Secure client-side validation preventing spam submissions and empty tickets",
    ],
    tech: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
    fullTech: ["React", "Firebase Firestore", "Firebase Storage", "Tailwind CSS", "JavaScript", "Vercel Hosting"],
    challenges: "Handling high-volume image uploads on a free tier storage plan. Implemented client-side canvas-based image compression prior to uploading to Firebase, reducing storage size requirements by over 70%.",
    features: [
      { title: "Issue Logging", desc: "Upload images, describe location, and select categories for municipal reports.", iconName: "FileText" },
      { title: "Firestore Integration", desc: "Real-time sync ensures issues show up on the dashboard instantly.", iconName: "Layers" },
      { title: "Status Tracking", desc: "Visual timeline for issue lifecycles from submission to resolution.", iconName: "CheckCircle2" },
    ],
    link: "https://urbanreport.vercel.app/",
    source: "https://github.com/pandeYtushal",
  },
  {
    title: "Melody",
    image: "/music.png",
    status: "Live",
    description:
      "A premium music streaming platform with a monochrome UI, high-fidelity playback, intelligent discovery, Zustand state, and PWA support.",
    highlight:
      "Polished playback experience with persistent state and PWA behavior.",
    longDescription:
      "Melody is a premium, high-fidelity music streaming application designed with a dark monochrome aesthetic. Integrated with the JioSaavn API, it provides millions of songs, custom playlist creation, real-time lyric fetching, and intelligent music recommendations. State management is driven by Zustand to handle playback states, tracks queues, and volume controls globally and persistently.",
    keyPoints: [
      "Global audio state management using Zustand, allowing audio to persist and play across different routes",
      "High-performance playback controls including play, pause, seek, loop, volume scaling, and queue shuffling",
      "Progressive Web App (PWA) configuration enabling offline application access and native-like installation",
      "Clean, customized glassmorphic interface that adapts dynamically to song artwork color profiles",
    ],
    tech: [
      "React 19",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "Firebase",
      "JioSaavn API",
    ],
    fullTech: ["React 19", "Tailwind CSS", "Zustand", "Framer Motion", "Firebase Auth", "JioSaavn API", "PWA Manifest"],
    challenges: "Managing persistent music streaming while navigating a single-page app layout. Solved by hoisting the Audio HTML element into a global provider and using Zustand for control hooks.",
    features: [
      { title: "Zustand State", desc: "Sleek global player state that keeps track of the active queue and playback progress.", iconName: "Layers" },
      { title: "API Integration", desc: "Queries JioSaavn endpoints for high-quality audio files and album artwork.", iconName: "Globe" },
      { title: "Responsive Audio Player", desc: "Immersive slider controls, track skipping, and dynamic visualizer.", iconName: "Zap" },
    ],
    link: "https://meldmusic.vercel.app/",
    source: "https://github.com/pandeYtushal",
  },
  {
    title: "Cab Booking Platform",
    image: "/meme.png",
    status: "Closed",
    description:
      "A frontend booking experience with user management, fare calculation, ride flow screens, and an admin dashboard.",
    highlight:
      "Ride booking interface with fare logic and dashboard screens.",
    longDescription:
      "A comprehensive frontend prototype for a modern ride-hailing and taxi booking application. It showcases user landing pages, fare calculation simulators, live route maps using static coordinates, ride status trackers, and an interactive admin dashboard. The project concentrates on smooth CSS transitions and a responsive layout that emulates production-grade mobile web apps.",
    keyPoints: [
      "Responsive cab category selection cards (Eco, Comfort, Premium, SUV) with dynamic pricing rates",
      "Client-side calculation of estimated ride fares based on input distances, peak hours, and traffic conditions",
      "Simulation of ride state transition screens (Searching driver, Driver arriving, In-trip, Ride complete)",
      "Interactive admin panel tracking registered vehicles, active rides, and estimated daily earnings",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    fullTech: ["HTML5", "CSS3 Custom Properties", "Vanilla JavaScript", "Map APIs (Static)", "Local Storage"],
    challenges: "Creating a smooth mobile-first experience without a modern JS framework. Solved by writing pure JS router nodes and CSS translate transforms for sliding panels.",
    features: [
      { title: "Fare Calculator", desc: "Algorithm calculating distance rates, multipliers, and peak-hour premiums.", iconName: "Cpu" },
      { title: "Admin Portal", desc: "Interactive charts and tables showing driver availability and ride logs.", iconName: "Eye" },
      { title: "Booking Flows", desc: "Realistic multi-step wizard from location selection to payment method.", iconName: "FileText" },
    ],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal",
  },
  {
    title: "Fit Gym Tracker",
    image: "/meme.png",
    status: "Closed",
    description:
      "A gym task management application with responsive task views and real-time Firebase updates.",
    highlight:
      "Workout task tracking with Firebase-backed updates.",
    longDescription:
      "Fit Gym Tracker is a personal training companion web app designed to replace paper workout logs. Users can design workout routines, log daily weights and repetitions, track rest periods with an inline stopwatch, and monitor progress charts over time. Powered by Firebase, users' data is synchronized across all their devices in real-time.",
    keyPoints: [
      "Flexible workout routine builder allowing users to create custom exercise combinations",
      "Real-time calendar view mapping logged sessions, active streaks, and completed targets",
      "Firebase database connection with offline capability, saving edits locally and syncing upon network reconnection",
      "Responsive charts visualizing one-rep maximum (1RM) trends and total volume lifted",
    ],
    tech: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
    fullTech: ["React", "Firebase Firestore", "TypeScript", "Tailwind CSS", "Recharts", "LocalForage"],
    challenges: "Managing state synchronization when users lose signal inside heavy concrete gyms. Implemented Firestore offline persistence which handles caching automatically.",
    features: [
      { title: "Workout Logger", desc: "Quick-input grids to log weight, sets, reps, and check off completed sets.", iconName: "CheckCircle2" },
      { title: "Analytics Engine", desc: "Plots performance over time using Recharts to visualize strengths and trends.", iconName: "Target" },
      { title: "Rest Timer", desc: "Integrated visual timer that alerts users when it's time to start their next set.", iconName: "Zap" },
    ],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal",
  },
  {
    title: "Weather Dashboard",
    image: "/meme.png",
    status: "Closed",
    description:
      "A weather dashboard with real-time data, extended forecasts, search states, and interactive charts.",
    highlight:
      "Forecast cards, charted weather trends, and responsive search states.",
    longDescription:
      "An interactive weather intelligence dashboard providing current conditions, hourly forecasts, and 7-day meteorological trends. Featuring a global city search engine, it consumes real-time APIs to fetch temperature, UV indices, humidity levels, and wind speeds. Data is represented using modern graphics, interactive widgets, and line charts to present weather trends clearly.",
    keyPoints: [
      "Search autocomplete matching international cities with coordinate caching for faster loading",
      "Dynamic weather warning cards appearing in response to extreme temperature alerts from the API",
      "Integration of Chart.js to project daily temperature curves and humidity variations visually",
      "Theme styling adapting automatically based on local time and current weather reports (e.g. rain, snow, sunny)",
    ],
    tech: ["React", "API", "Chart.js", "Tailwind CSS"],
    fullTech: ["React", "OpenWeatherMap API", "Chart.js", "Tailwind CSS", "Lucide Icons"],
    challenges: "Minimizing external API query counts to remain within developer limits. Added a localStorage caching mechanism that caches city search queries for 1 hour.",
    features: [
      { title: "Dynamic Themes", desc: "Interface styling shifting colors to represent sunny, rainy, or snowy forecasts.", iconName: "Sparkles" },
      { title: "Interactive Charts", desc: "Visualizes hourly weather forecasts and pressure profiles with zoom tools.", iconName: "Layers" },
      { title: "Multi-Unit Support", desc: "Toggle metrics between Imperial and Metric systems on the fly.", iconName: "Globe" },
    ],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal",
  },
];

/* ═══════════════════════════════════════════════════════════════
   HUNTER-SPECIFIC DATA (used inside the detail modal)
   ═══════════════════════════════════════════════════════════════ */

const ARCHITECTURE_LAYERS = [
  { label: "Vision Layer", icon: Eye, color: "from-orange-500 to-amber-600", desc: "Screenshot analysis & UI element detection" },
  { label: "Planning Agent", icon: Brain, color: "from-orange-600 to-amber-500", desc: "Goal decomposition & multi-step reasoning" },
  { label: "Action Engine", icon: Zap, color: "from-amber-500 to-orange-600", desc: "DOM interaction, form filling & navigation" },
  { label: "Memory Store", icon: Layers, color: "from-amber-600 to-orange-500", desc: "Long-term context & session persistence" },
  { label: "Self-Healing", icon: Shield, color: "from-orange-500 to-amber-500", desc: "Error recovery & adaptive retry logic" },
  { label: "Provider Hub", icon: Globe, color: "from-amber-500 to-orange-600", desc: "Gemini · OpenAI · Anthropic · Groq" },
];


const PROVIDER_BADGES = [
  { name: "Gemini", color: "border-blue-500/30 bg-blue-500/10 text-blue-400" },
  { name: "OpenAI", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" },
  { name: "Anthropic", color: "border-amber-500/30 bg-amber-500/10 text-amber-400" },
  { name: "Groq", color: "border-rose-500/30 bg-rose-500/10 text-rose-400" },
  { name: "Future Providers", color: "border-zinc-600/30 bg-zinc-600/10 text-zinc-400" },
];

/* ═══════════════════════════════════════════════════════════════
   SMALL REUSABLE PIECES
   ═══════════════════════════════════════════════════════════════ */

const SectionHeader = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2.5">
    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800">
      <Icon className="h-3.5 w-3.5 text-orange-400" />
    </div>
    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">{label}</h3>
    <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
  </div>
);

const ProjectPreview = ({ project }) => (
  <div className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
    <img
      src={project.image}
      alt={project.title}
      loading="lazy"
      className="h-64 w-full object-cover transition-all duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

    <div className="absolute top-4 right-4">
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${project.status === "Live"
          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/20"
          : project.status === "In Development"
            ? "bg-orange-500/20 text-orange-300 border border-orange-400/20"
            : "bg-zinc-900/30 text-zinc-200 border border-white/10"
          }`}
      >
        {project.status}
      </span>
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-5">
      <h4 className="text-xl font-bold text-white">{project.title}</h4>
      <p className="mt-1 text-sm text-zinc-300">{project.highlight}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${status === "Live"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:border-emerald-500/30 dark:text-emerald-400"
      : status === "In Development"
        ? "border-orange-500/20 bg-orange-500/10 text-orange-600 dark:border-orange-500/30 dark:text-orange-400"
        : "border-zinc-500/20 bg-zinc-500/10 text-zinc-500 dark:border-zinc-500/30 dark:text-zinc-400"
      }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${status === "Live"
        ? "animate-pulse bg-emerald-500"
        : status === "In Development"
          ? "animate-pulse bg-orange-500"
          : "bg-zinc-400 dark:bg-zinc-500"
        }`}
    />
    {status}
  </span>
);

/* ═══════════════════════════════════════════════════════════════
   PROJECT DETAIL MODAL (inline — no separate file)
   ═══════════════════════════════════════════════════════════════ */

const ICON_MAP = {
  Sparkles: Sparkles,
  Zap: Zap,
  Cpu: Cpu,
  Layers: Layers,
  Globe: Globe,
  FileText: FileText,
  Target: Target,
  CheckCircle2: CheckCircle2,
  Eye: Eye,
  Shield: Shield,
  Brain: Brain,
  ExternalLink: ExternalLink,
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const pageVariants = {
  hidden: { x: "100%", opacity: 0.9 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 28, stiffness: 220 } },
  exit: { x: "100%", opacity: 0.9, transition: { ease: "easeInOut", duration: 0.25 } },
};

const ProjectDetailModal = ({ project, onClose }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!project) return null;

  const isHunter = project.title === "Hunter";

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex h-screen w-screen flex-col overflow-y-auto bg-zinc-950 text-white"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative flex min-h-screen w-full flex-col bg-zinc-950"
      >
        {/* Top accent glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />

        {/* Sticky Header Nav */}
        <div className="sticky top-0 z-50 flex items-center justify-between border-b border-zinc-900 bg-zinc-950/85 px-4 py-4 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="group flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3.5 py-2 text-xs font-semibold text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Projects</span>
            </button>
            <div className="hidden h-5 w-px bg-zinc-850 sm:block" />
            <span className="hidden text-sm font-medium text-zinc-400 sm:inline truncate max-w-[200px] md:max-w-[350px]">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                title="View Source Code"
                className="flex h-9 items-center gap-1.5 rounded-lg border border-zinc-805 bg-zinc-900 px-3.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                <FaGithub className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Source</span>
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                title="View Live Site"
                className="flex h-9 items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-3.5 text-xs font-bold text-white transition hover:from-orange-400 hover:to-amber-400"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Live Demo</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:bg-zinc-850 hover:text-white"
              title="Close Page"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Page Body */}
        <div ref={scrollRef} className="flex-1 w-full overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">

            {/* Immersive Banner */}
            <div className="relative mb-12 overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-900/10">
              <div className="aspect-[21/9] w-full overflow-hidden sm:min-h-[300px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover opacity-90 transition duration-700 hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              </div>
              {/* Corner status tag */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${project.status === "Live"
                  ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-300"
                  : project.status === "In Development"
                    ? "border-orange-500/30 bg-orange-500/20 text-orange-300"
                    : "border-zinc-500/30 bg-zinc-500/20 text-zinc-400"
                  }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${project.status === "Live" ? "animate-pulse bg-emerald-400" : project.status === "In Development" ? "animate-pulse bg-orange-400" : "bg-zinc-500"
                    }`} />
                  {project.status}
                </span>
              </div>
            </div>

            {/* Split Page Grid */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

              {/* Main Content Pane (Left 2/3) */}
              <div className="lg:col-span-2 space-y-12">

                {/* Header Information */}
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                    {project.title}
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
                    {project.highlight}
                  </p>
                </div>

                {/* Narrative Overview */}
                <section className="space-y-4">
                  <SectionHeader icon={FileText} label="Project Overview" />
                  <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {project.longDescription || project.description}
                  </p>
                  {project.keyPoints && (
                    <ul className="mt-6 space-y-3">
                      {project.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 sm:text-base">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-orange-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                {/* Custom Features Dynamic Cards */}
                {project.features && project.features.length > 0 && (
                  <section className="space-y-6">
                    <SectionHeader icon={Sparkles} label="Key System Features" />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {project.features.map((feat) => {
                        const IconComponent = ICON_MAP[feat.iconName] || Sparkles;
                        return (
                          <div
                            key={feat.title}
                            className="flex gap-4 rounded-xl border border-zinc-900 bg-zinc-950/40 p-5 transition duration-300 hover:border-zinc-800 hover:bg-zinc-900/20"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-orange-500/10 bg-orange-500/5 text-orange-400">
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">{feat.title}</h4>
                              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{feat.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {isHunter && (
                  <>
                    <section className="space-y-6">
                      <SectionHeader icon={Cpu} label="Agent Architecture" />
                      <p className="text-sm text-zinc-500">
                        Hunter uses a modular multi-agent pipeline where each layer handles a distinct responsibility in the autonomous browsing loop.
                      </p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {ARCHITECTURE_LAYERS.map((layer) => (
                          <div
                            key={layer.label}
                            className="group relative overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950/20 p-4 transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-900/50"
                          >
                            <div className={`absolute -top-8 -right-8 h-20 w-20 rounded-full bg-gradient-to-br ${layer.color} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`} />
                            <div className="relative">
                              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${layer.color} shadow-lg`}>
                                <layer.icon className="h-4 w-4 text-white" />
                              </div>
                              <h4 className="text-sm font-bold text-white">{layer.label}</h4>
                              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{layer.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-zinc-600">
                        {["User Goal", "Planner", "Observer", "Actor", "Reflector", "Result"].map((step, i, arr) => (
                          <span key={step} className="flex items-center gap-2">
                            <span className="rounded-md border border-zinc-900 bg-zinc-950 px-2.5 py-1 text-zinc-400 transition-colors hover:border-orange-850 hover:text-orange-400">
                              {step}
                            </span>
                            {i < arr.length - 1 && <ArrowRight className="h-3 w-3 text-zinc-800" />}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section className="space-y-6">
                      <SectionHeader icon={Globe} label="Multi-Provider Support" />
                      <p className="text-sm text-zinc-500">
                        Provider-agnostic architecture supports seamless swapping between frontier AI models. Add new providers with zero changes to the agent pipeline.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {PROVIDER_BADGES.map((p) => (
                          <span key={p.name} className={`rounded-lg border px-4 py-2 text-xs font-bold ${p.color}`}>
                            {p.name}
                          </span>
                        ))}
                      </div>
                    </section>
                  </>
                )}

                {/* Challenges and Learnings Box */}
                {project.challenges && (
                  <section className="space-y-4">
                    <SectionHeader icon={Shield} label="Engineering Challenges" />
                    <div className="relative overflow-hidden rounded-xl border-l-4 border-orange-500 bg-orange-500/[0.02] p-5 text-sm leading-relaxed text-zinc-400 sm:p-6 sm:text-base">
                      <p>{project.challenges}</p>
                    </div>
                  </section>
                )}

              </div>

              {/* Sidebar Panel (Right 1/3) */}
              <div className="space-y-6">
                <div className="sticky top-24 rounded-xl border border-zinc-900 bg-zinc-950/50 p-6 space-y-6">
                  <h3 className="text-base font-bold text-white tracking-wide border-b border-zinc-900 pb-3">
                    Project Details
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm">
                    <div className="flex justify-between py-1 border-b border-zinc-900/50">
                      <span className="text-zinc-500">Status</span>
                      <span className="font-semibold text-orange-400">{project.status}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-3 text-sm font-bold text-white transition hover:from-orange-400 hover:to-amber-400"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                    {project.source && (
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                      >
                        <FaGithub className="h-4 w-4" />
                        Source Code
                      </a>
                    )}
                  </div>

                  <div className="space-y-3 pt-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(project.fullTech || project.tech).map((t) => (
                        <span key={t} className="rounded bg-zinc-900/80 border border-zinc-900 px-2.5 py-1.5 text-xs text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN PROJECTS SECTION
   ═══════════════════════════════════════════════════════════════ */

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const displayedProjects = useMemo(() => {
    return showAll ? PROJECTS : PROJECTS.slice(0, 4);
  }, [showAll]);

  return (
    <>
      <section id="projects" className="section-container bg-zinc-50 transition-colors duration-300 dark:bg-black">
        <div className="mb-12 text-center md:mb-20 md:text-left">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
            A focused selection of projects showing product thinking, responsive UI.
          </p>
        </div>

        <div className="mx-auto w-full">
          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            <AnimatePresence>
              {displayedProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:bg-zinc-900/50 dark:ring-zinc-800 dark:hover:bg-zinc-900 dark:hover:ring-orange-500/50 sm:p-6"
                >
                  <div className="absolute -inset-x-4 -top-4 -z-10 h-24 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-orange-500/10" />

                  <div>
                    <ProjectPreview project={project} />

                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h3
                        className="text-xl font-bold text-zinc-900 transition-colors group-hover:text-orange-500 dark:text-white dark:group-hover:text-orange-400 sm:text-2xl"
                      >
                        {project.title}
                      </h3>
                      {project.status && <StatusBadge status={project.status} />}
                    </div>

                    <p className="mb-8 max-w-prose text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech}
                          className="rounded-md border border-zinc-200/50 bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800 dark:text-zinc-300 sm:text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex w-max items-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:bg-white dark:text-black dark:hover:bg-orange-400"
                      >
                        {project.featured ? "View Details" : "View Details"}
                        <Expand className="h-3.5 w-3.5" />
                      </button>

                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex w-max items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
                          <FaExternalLinkAlt className="h-3 w-3" />
                          Live
                        </a>
                      )}
                      {project.source && (
                        <a href={project.source} target="_blank" rel="noopener noreferrer"
                          className="inline-flex w-max items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
                          <FaGithub className="h-4 w-4" />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {PROJECTS.length > 4 && (
            <motion.div layout className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 active:translate-y-0 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
              >
                {showAll ? "Show Less" : "Show More"}
                {showAll ? (
                  <FaChevronUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
                ) : (
                  <FaChevronDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
                )}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
