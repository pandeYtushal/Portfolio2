import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  CheckCircle,
  Github,
  Chrome,
  ChevronDown
} from "lucide-react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

/* ═══════════════════════════════════════════════════════════════
   PROJECT DATA WITH PREMIUM METRICS & METADATA
   ═══════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    title: "Hunter",
    image: "/meme.png",
    status: "In Development",
    urlDomain: "hunter.ai",
    description: "An autonomous AI browser copilot that transforms natural language goals into intelligent browser actions using a modular agent architecture.",
    highlight: "AI-powered browser automation with planning, vision, and self-healing capabilities.",
    metrics: [
      { label: "AI Agents", val: "7+" },
      { label: "Browser Actions", val: "20+" },
      { label: "Model Swaps", val: "4 Hubs" }
    ],
    longDescription: "Hunter is an autonomous AI browser copilot that transforms natural language goals into intelligent browser actions. Unlike traditional browser extensions, Hunter uses a modular agent architecture with planning, reasoning, observation, reflection, self-healing, long-term memory, and vision capabilities to understand webpages and assist users in real time. It can analyze job descriptions, match resumes against job requirements, generate tailored cover letters, research companies, detect and autofill application forms, and visually identify interface elements such as buttons and upload fields.",
    keyPoints: [
      "Modular agent architecture with separate planning, observation, action, and reflection layers",
      "Vision capabilities for screenshot analysis and UI element detection (buttons, forms, upload fields)",
      "Self-healing error recovery that adapts to DOM changes and retries with alternative strategies",
      "Long-term memory for persistent context across browsing sessions",
      "Provider-agnostic design enabling seamless swapping between Gemini, OpenAI, Anthropic, and Groq"
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
      "IndexedDB"
    ],
    challenges: "Developing a highly reliable selector agent inside dynamic Single Page Applications (SPAs). Standard class names and DOM paths shift constantly, so we engineered a self-healing layer that combines semantic element trees, layout coordinates, and visual snapshot analysis to target active buttons and inputs even when the source code changes.",
    features: [
      { title: "Job Analysis", desc: "Parses job descriptions to extract requirements, skills, and qualifications automatically.", iconName: "FileText" },
      { title: "Resume Matching", desc: "Scores your resume against job requirements and highlights gaps or strong matches.", iconName: "Target" },
      { title: "Cover Letter Gen", desc: "Generates tailored cover letters that mirror job language and showcase relevant experience.", iconName: "FileText" },
      { title: "Smart Autofill", desc: "Detects application forms and populates fields using your profile data with one click.", iconName: "Cpu" }
    ],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal",
    featured: true
  },
  {
    title: "Melody",
    image: "/music.png",
    status: "Live",
    urlDomain: "melody.audio",
    description: "A premium music streaming platform with a monochrome UI, high-fidelity playback, intelligent discovery, Zustand state, and PWA support.",
    highlight: "Polished playback experience with persistent state and PWA behavior.",
    metrics: [
      { label: "Track Index", val: "10M+" },
      { label: "State Sync", val: "Zustand" },
      { label: "Asset Load", val: "Precached" }
    ],
    longDescription: "Melody is a premium, high-fidelity music streaming application designed with a dark monochrome aesthetic. Integrated with the JioSaavn API, it provides millions of songs, custom playlist creation, real-time lyric fetching, and intelligent music recommendations. State management is driven by Zustand to handle playback states, tracks queues, and volume controls globally and persistently.",
    keyPoints: [
      "Global audio state management using Zustand, allowing audio to persist and play across different routes",
      "High-performance playback controls including play, pause, seek, loop, volume scaling, and queue shuffling",
      "Progressive Web App (PWA) configuration enabling offline application access and native-like installation",
      "Clean, customized dark interface that adapts dynamically to song artwork color profiles"
    ],
    tech: ["React 19", "Zustand", "Firebase", "JioSaavn API"],
    fullTech: ["React 19", "Tailwind CSS", "Zustand", "Framer Motion", "Firebase Auth", "JioSaavn API", "PWA Manifest"],
    challenges: "Managing persistent music streaming while navigating a single-page app layout. Solved by hoisting the Audio HTML element into a global provider and using Zustand for control hooks.",
    features: [
      { title: "Zustand State", desc: "Sleek global player state that keeps track of the active queue and playback progress.", iconName: "Layers" },
      { title: "API Integration", desc: "Queries JioSaavn endpoints for high-quality audio files and album artwork.", iconName: "Globe" },
      { title: "Responsive Audio Player", desc: "Immersive slider controls, track skipping, and dynamic visualizer.", iconName: "Zap" }
    ],
    link: "https://meldmusic.vercel.app/",
    source: "https://github.com/pandeYtushal"
  },
  {
    title: "Urban Utility Report",
    image: "/urban.png",
    status: "Live",
    urlDomain: "urbanreport.gov",
    description: "A utility reporting system for urban areas with issue submission, tracking, and clear data views for better municipal planning.",
    highlight: "Civic reporting flow with fast submissions and admin-ready issue tracking.",
    metrics: [
      { label: "Size Compression", val: "70%" },
      { label: "Alert Latency", val: "<50ms" },
      { label: "Sync Engine", val: "Realtime" }
    ],
    longDescription: "A localized citizen utility reporting system that bridges the gap between urban residents and municipal administrators. Users can document civic issues (e.g., potholes, street light failures, water leakage) with descriptions and photo uploads. The system tracks submissions through statuses (Submitted, In Review, Resolved) and compiles them in a public dashboard to promote transparency and citizen engagement.",
    keyPoints: [
      "Real-time ticket logging using Firebase Firestore database and email alerts for admins",
      "Image upload and hosting pipeline to document and verify issue authenticity on-site",
      "Responsive issue tracker with status-based filtering (All, Open, In Progress, Resolved)",
      "Secure client-side validation preventing spam submissions and empty tickets"
    ],
    tech: ["React", "Firebase", "Tailwind CSS", "Firestore"],
    fullTech: ["React", "Firebase Firestore", "Firebase Storage", "Tailwind CSS", "JavaScript", "Vercel Hosting"],
    challenges: "Handling high-volume image uploads on a free tier storage plan. Implemented client-side canvas-based image compression prior to uploading to Firebase, reducing storage size requirements by over 70%.",
    features: [
      { title: "Issue Logging", desc: "Upload images, describe location, and select categories for municipal reports.", iconName: "FileText" },
      { title: "Firestore Integration", desc: "Real-time sync ensures issues show up on the dashboard instantly.", iconName: "Layers" },
      { title: "Status Tracking", desc: "Visual timeline for issue lifecycles from submission to resolution.", iconName: "CheckCircle" }
    ],
    link: "https://urbanreport.vercel.app/",
    source: "https://github.com/pandeYtushal"
  },
  {
    title: "Portfolio Platform",
    image: "/port.png",
    status: "Live",
    urlDomain: "tushal.dev",
    description: "A modern, responsive portfolio website showcasing my projects, skills, and experience with a clean theme system and smooth interactions.",
    highlight: "Personal brand system with dark mode, live resume, and animated sections.",
    metrics: [
      { label: "SEO Score", val: "100" },
      { label: "Performance", val: "99" },
      { label: "Load Time", val: "0.2s" }
    ],
    longDescription: "A custom-built, high-performance personal portfolio website designed to present professional work, blog posts, and interactive resumes with zero page reloads. Built using React, Vite, and Tailwind CSS, it features smooth Framer Motion animations, a dynamic dark/light mode toggle, an interactive live clock, and a customized resume modal. The layout is optimized for high-speed page loads, accessibility, and clean aesthetics.",
    keyPoints: [
      "Fully responsive layout with customized theme engine supporting immediate theme toggling without layout shifts",
      "Framer Motion integration for layout animations, header transitions, and section-by-section scroll animations",
      "Custom React hook context for audio interactions, providing immediate audio feedback on clicks",
      "Optimized asset delivery, utilizing WebP images and localized modern fonts"
    ],
    tech: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
    fullTech: ["React 19", "Vite", "Tailwind CSS", "Framer Motion", "Lucide React", "JavaScript (ES6+)", "PostCSS"],
    challenges: "Balancing dark/light mode switches dynamically without triggering color flash on load. Solved by executing theme classes inline on document element loading and persisting the preference to local storage.",
    features: [
      { title: "Fluid Theme System", desc: "Local-storage persistent light and dark modes with customized color palettes.", iconName: "Layers" },
      { title: "Framer Motion", desc: "Liquid animations, modal entries, and accordion expansions for project lists.", iconName: "Zap" },
      { title: "Audio Feedback", desc: "A preloaded web audio system for instant physical click response.", iconName: "Cpu" }
    ],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal"
  },
  {
    title: "Cab Booking Platform",
    image: "/meme.png",
    status: "Closed",
    urlDomain: "ridecab.io",
    description: "A frontend booking experience with user management, fare calculation, ride flow screens, and an admin dashboard.",
    highlight: "Ride booking interface with fare logic and dashboard screens.",
    metrics: [
      { label: "Wizard Steps", val: "4 Screens" },
      { label: "Pricing System", val: "Dynamic" },
      { label: "Responsive", val: "Fluid" }
    ],
    longDescription: "A comprehensive frontend prototype for a modern ride-hailing and taxi booking application. It showcases user landing pages, fare calculation simulators, live route maps using static coordinates, ride status trackers, and an interactive admin dashboard. The project concentrates on smooth CSS transitions and a responsive layout that emulates production-grade mobile web apps.",
    keyPoints: [
      "Responsive cab category selection cards (Eco, Comfort, Premium, SUV) with dynamic pricing rates",
      "Client-side calculation of estimated ride fares based on input distances, peak hours, and traffic conditions",
      "Simulation of ride state transition screens (Searching driver, Driver arriving, In-trip, Ride complete)",
      "Interactive admin panel tracking registered vehicles, active rides, and estimated daily earnings"
    ],
    tech: ["HTML5", "CSS3", "JavaScript"],
    fullTech: ["HTML5", "CSS3 Custom Properties", "Vanilla JavaScript", "Map APIs (Static)", "Local Storage"],
    challenges: "Creating a smooth mobile-first experience without a modern JS framework. Solved by writing pure JS router nodes and CSS translate transforms for sliding panels.",
    features: [
      { title: "Fare Calculator", desc: "Algorithm calculating distance rates, multipliers, and peak-hour premiums.", iconName: "Cpu" },
      { title: "Admin Portal", desc: "Interactive charts and tables showing driver availability and ride logs.", iconName: "Eye" },
      { title: "Booking Flows", desc: "Realistic multi-step wizard from location selection to payment method.", iconName: "FileText" }
    ],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal"
  },
  {
    title: "Fit Gym Tracker",
    image: "/meme.png",
    status: "Closed",
    urlDomain: "gymfit.app",
    description: "A gym task management application with responsive task views and real-time Firebase updates.",
    highlight: "Workout task tracking with Firebase-backed updates.",
    metrics: [
      { label: "Calendar Log", val: "Streak UI" },
      { label: "Visual Stats", val: "Recharts" },
      { label: "Connectivity", val: "Offline" }
    ],
    longDescription: "Fit Gym Tracker is a personal training companion web app designed to replace paper workout logs. Users can design workout routines, log daily weights and repetitions, track rest periods with an inline stopwatch, and monitor progress charts over time. Powered by Firebase, users' data is synchronized across all their devices in real-time.",
    keyPoints: [
      "Flexible workout routine builder allowing users to create custom exercise combinations",
      "Real-time calendar view mapping logged sessions, active streaks, and completed targets",
      "Firebase database connection with offline capability, saving edits locally and syncing upon network reconnection",
      "Responsive charts visualizing one-rep maximum (1RM) trends and total volume lifted"
    ],
    tech: ["React", "Firebase", "TypeScript"],
    fullTech: ["React", "Firebase Firestore", "TypeScript", "Tailwind CSS", "Recharts", "LocalForage"],
    challenges: "Managing state synchronization when users lose signal inside heavy concrete gyms. Implemented Firestore offline persistence which handles caching automatically.",
    features: [
      { title: "Workout Logger", desc: "Quick-input grids to log weight, sets, reps, and check off completed sets.", iconName: "CheckCircle" },
      { title: "Analytics Engine", desc: "Plots performance over time using Recharts to visualize strengths and trends.", iconName: "Target" },
      { title: "Rest Timer", desc: "Integrated visual timer that alerts users when it's time to start their next set.", iconName: "Zap" }
    ],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal"
  },
  {
    title: "Weather Dashboard",
    image: "/meme.png",
    status: "Closed",
    urlDomain: "skyweather.net",
    description: "A weather dashboard with real-time data, extended forecasts, search states, and interactive charts.",
    highlight: "Forecast cards, charted weather trends, and responsive search states.",
    metrics: [
      { label: "Cache TTL", val: "1 Hour" },
      { label: "Graph Engine", val: "Chart.js" },
      { label: "Theme State", val: "Dynamic" }
    ],
    longDescription: "An interactive weather intelligence dashboard providing current conditions, hourly forecasts, and 7-day meteorological trends. Featuring a global city search engine, it consumes real-time APIs to fetch temperature, UV indices, humidity levels, and wind speeds. Data is represented using modern graphics, interactive widgets, and line charts to present weather trends clearly.",
    keyPoints: [
      "Search autocomplete matching international cities with coordinate caching for faster loading",
      "Dynamic weather warning cards appearing in response to extreme temperature alerts from the API",
      "Integration of Chart.js to project daily temperature curves and humidity variations visually",
      "Theme styling adapting automatically based on local time and current weather reports (e.g. rain, snow, sunny)"
    ],
    tech: ["React", "API", "Chart.js"],
    fullTech: ["React", "OpenWeatherMap API", "Chart.js", "Tailwind CSS", "Lucide Icons"],
    challenges: "Minimizing external API query counts to remain within developer limits. Added a localStorage caching mechanism that caches city search queries for 1 hour.",
    features: [
      { title: "Dynamic Themes", desc: "Interface styling shifting colors to represent sunny, rainy, or snowy forecasts.", iconName: "Globe" },
      { title: "Interactive Charts", desc: "Visualizes hourly weather forecasts and pressure profiles with zoom tools.", iconName: "Layers" },
      { title: "Multi-Unit Support", desc: "Toggle metrics between Imperial and Metric systems on the fly.", iconName: "Globe" }
    ],
    link: "https://github.com/pandeYtushal",
    source: "https://github.com/pandeYtushal"
  }
];

const ICON_MAP = {
  Sparkles,
  Zap,
  Cpu,
  Layers,
  Globe,
  FileText,
  Target,
  CheckCircle,
  Eye,
  Shield,
  Brain
};

/* ═══════════════════════════════════════════════════════════════
   PREMIUM BROWSER MOCKUP CONTAINER
   ═══════════════════════════════════════════════════════════════ */

const BrowserMockup = ({ src, alt, domain = "github.com" }) => (
  <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 shadow-sm transition-all duration-300">
    {/* Top Header Bar */}
    <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-4 py-2 bg-zinc-50/50 dark:bg-zinc-900/40">
      {/* 3 Red/Yellow/Green Window Dots */}
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>
      {/* URL Address Box */}
      <div className="flex items-center gap-1.5 rounded bg-zinc-100 dark:bg-zinc-900 px-3 py-0.5 w-44 sm:w-56 justify-center text-[10px] font-mono text-zinc-400 dark:text-zinc-500 border border-zinc-200/40 dark:border-zinc-850">
        <Chrome className="h-2.5 w-2.5" />
        <span className="truncate">{domain}</span>
      </div>
      <div className="w-10" />
    </div>
    {/* Body image container */}
    <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-103"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const fallback = e.currentTarget.nextElementSibling;
          if (fallback) fallback.classList.remove("hidden");
        }}
      />
      {/* Fallback image cover */}
      <div className="absolute inset-0 hidden flex-col items-center justify-center bg-zinc-50 text-zinc-400 dark:bg-zinc-900/60 dark:text-zinc-500">
        <FileText className="h-8 w-8" />
        <span className="text-[10px] font-mono mt-1">Asset unavailable</span>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   CASE STUDY SLIDE-OVER DRAWER (Linear-like sub-page state)
   ═══════════════════════════════════════════════════════════════ */

const CaseStudyDrawer = ({ project, onClose }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex h-screen w-screen justify-end bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 220 }}
        className="relative flex h-full w-full max-w-4xl flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white border-l border-zinc-200 dark:border-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top sticky action header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 bg-white/95 dark:bg-zinc-950/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="group flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-650 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back</span>
            </button>
            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 max-w-[200px] truncate">
              {project.urlDomain}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-650 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-350 dark:hover:bg-zinc-800"
              >
                <Github className="h-3.5 w-3.5" />
                <span>Source</span>
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 items-center gap-1.5 rounded-lg bg-zinc-900 px-3 text-xs font-bold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Demo</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-450 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable contents */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-12">
          
          {/* Main banner image mockup */}
          <BrowserMockup src={project.image} alt={project.title} domain={project.urlDomain} />

          {/* Grid Layout: Case study details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Narrative details (8 cols) */}
            <div className="lg:col-span-8 space-y-8 text-left">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Case Study
                </span>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mt-1">
                  {project.title}
                </h1>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-650 dark:text-zinc-450">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Key point lists */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500">
                  Core Operations & Accomplishments
                </h3>
                <ul className="space-y-3">
                  {project.keyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400">
                      <CheckCircle className="h-4 w-4 shrink-0 text-zinc-800 dark:text-white mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Custom specs features */}
              {project.features && (
                <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-900">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500">
                    System Architecture Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feat) => {
                      const Icon = ICON_MAP[feat.iconName] || Sparkles;
                      return (
                        <div key={feat.title} className="flex gap-3.5 border border-zinc-200/60 rounded-xl bg-zinc-50/50 p-4 dark:border-zinc-900 dark:bg-zinc-900/10">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800">
                            <Icon className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{feat.title}</h4>
                            <p className="mt-1 text-[11px] leading-relaxed text-zinc-450 dark:text-zinc-550">{feat.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Engineering challenges */}
              {project.challenges && (
                <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-900">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500">
                    Engineering Challenges & Resolution
                  </h3>
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 sm:p-5 dark:border-zinc-900 dark:bg-zinc-900/5 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.challenges}
                  </div>
                </div>
              )}
            </div>

            {/* Right Meta details (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Tech Stack list */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-900 dark:bg-zinc-900/10 space-y-4 text-left">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/40">
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(project.fullTech || project.tech).map((t) => (
                    <span key={t} className="rounded border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-medium text-zinc-650 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics list */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-900 dark:bg-zinc-900/10 space-y-4 text-left">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/40">
                  Project Metrics
                </h4>
                <div className="space-y-3.5">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex justify-between items-center text-xs">
                      <span className="text-zinc-550 dark:text-zinc-400">{m.label}</span>
                      <span className="font-mono font-bold text-zinc-900 dark:text-white">{m.val}</span>
                    </div>
                  ))}
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
   MAIN PROJECTS LISTING SECTION
   ═══════════════════════════════════════════════════════════════ */

const Projects = ({ overrideSelectedProject = null, onClearOverride = null }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Synchronize dynamic case study triggers from outside (e.g. HunterShowcase)
  useEffect(() => {
    if (overrideSelectedProject) {
      const found = PROJECTS.find(p => p.title.toLowerCase() === overrideSelectedProject.toLowerCase());
      if (found) {
        setSelectedProject(found);
      }
      if (onClearOverride) onClearOverride();
    }
  }, [overrideSelectedProject, onClearOverride]);

  const displayedProjects = useMemo(() => {
    return showAll ? PROJECTS : PROJECTS.slice(0, 4);
  }, [showAll]);

  return (
    <>
      <section id="projects" className="section-container border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-left max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3">
            Case Studies
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
            Selected Work
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base">
            Detailed project records exploring product metrics, technical stack integration, and architectural decisions. Click on any project to read its case study.
          </p>
        </div>

        {/* Project Grid */}
        <div className="mx-auto w-full">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <AnimatePresence>
              {displayedProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/20 p-5 dark:border-zinc-800/85 dark:bg-zinc-900/5 hover:border-zinc-350 dark:hover:border-zinc-700 transition-colors duration-300 sm:p-6"
                >
                  <div className="space-y-6">
                    {/* Browser Mockup wrapper */}
                    <BrowserMockup src={project.image} alt={project.title} domain={project.urlDomain} />

                    {/* Meta rows */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          {project.tech.join(" · ")}
                        </span>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-0.5 group-hover:text-zinc-650 dark:group-hover:text-zinc-300 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      
                      {/* Pulse Status indicator */}
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
                        project.status === "Live"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : project.status === "In Development"
                            ? "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "border-zinc-300 bg-zinc-100 text-zinc-550 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                      }`}>
                        <span className={`h-1 w-1 rounded-full ${
                          project.status === "Live" ? "animate-pulse bg-emerald-500" : project.status === "In Development" ? "animate-pulse bg-amber-500" : "bg-zinc-400"
                        }`} />
                        {project.status}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {project.description}
                    </p>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-zinc-100 dark:border-zinc-900">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-left">
                          <span className="block text-[8px] uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500">
                            {m.label}
                          </span>
                          <span className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                            {m.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-8 flex flex-wrap gap-3 items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group inline-flex items-center gap-1 text-xs font-bold text-zinc-900 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300 transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                    
                    <div className="flex gap-2">
                      {project.source && (
                        <a href={project.source} target="_blank" rel="noopener noreferrer" title="GitHub Source"
                          className="flex h-7 w-7 items-center justify-center rounded border border-zinc-200 bg-white text-zinc-450 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">
                          <FaGithub className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" title="Live Demo"
                          className="flex h-7 w-7 items-center justify-center rounded border border-zinc-200 bg-white text-zinc-450 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">
                          <FaExternalLinkAlt className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Show More toggle button */}
          {PROJECTS.length > 4 && (
            <motion.div layout className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-5 py-2 text-xs font-semibold text-zinc-850 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-350 dark:hover:bg-zinc-800 active:scale-95"
              >
                <span>{showAll ? "Show Less" : "Show All Case Studies"}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Case Study Subpage Slide-over Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyDrawer
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
export { PROJECTS };
