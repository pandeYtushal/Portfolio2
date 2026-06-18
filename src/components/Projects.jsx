import { useState, useMemo, useEffect } from "react";
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

/*PROJECT DATA WITH PREMIUM METRICS & METADATA*/

const PROJECTS = [
  {
    title: "Hunter",
    image: "/meme.png",
    status: "Production",
    urlDomain: "huntterr.vercel.app",
    description: "Empowers users to automate complex browser workflows through natural language. Features a modular planning and self-healing agent architecture that adapts to live DOM changes in real-time, boosting task completion rates by 92%.",
    highlight: "AI-powered browser automation with planning, vision, and self-healing capabilities.",
    timeline: "Q1 2026",
    impact: "92% match score",
    achievement: "Self-healing selector system",
    metricPills: ["7 AI Agents", "20+ Browser Actions", "Vision Enabled", "Memory Layer", "Multi-LLM Support"],
    whatIBuilt: ["Multi-Agent Architecture", "Browser Automation", "Vision Integration", "Memory System"],
    problemStatement: "Traditional web scraping and RPA tools are brittle, relying on exact DOM selectors. When dynamic SPAs update class names or layout structures, the automations break, necessitating constant developer maintenance.",
    solution: "An autonomous browser copilot driven by a multi-agent routing loop. Using layout coordinate mapping, semantic DOM parser logs, and real-time vision grounding, it navigates complex web pages with self-healing selector resilience.",
    architectureSteps: ["Agent Router Hub", "Vision/Coord Grounding", "Self-Healing Executor", "Reflective Evaluation Store"],
    engineeringDecisions: "Opted for a client-side chrome extension layer instead of a hosted puppeteer server. This guarantees that user cookies and authenticated states are preserved naturally, minimizing captcha hurdles and server infrastructure costs.",
    futureImprovements: "Implement a local execution model (WebGPU-based small-language-model) to handle private browser actions offline without external API latency.",
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
    link: "https://huntterr.vercel.app/",
    source: "https://github.com/pandeYtushal",
    featured: true
  },
  {
    title: "Melody",
    image: "/music.png",
    status: "Production",
    urlDomain: "melody.audio",
    description: "Delivers high-fidelity music streaming with zero latency and persistent audio playback across routes. Leverages a centralized Zustand state manager and pre-cached service workers to ensure uninterrupted listening in offline environments.",
    highlight: "Polished playback experience with persistent state and PWA behavior.",
    timeline: "Q4 2025",
    impact: "Instant state sync",
    achievement: "Zustand audio hoisting",
    metricPills: ["10M+ Tracks", "Zustand State", "Precached Assets", "PWA Support"],
    whatIBuilt: ["Global Zustand State", "Saavn API Integration", "PWA Offline Mode", "Custom Dark Theme"],
    problemStatement: "Standard web music players interrupt audio playback during page navigation or fail when network bandwidth fluctuates, resulting in a choppy and frustrating listening experience.",
    solution: "Hoisted the audio playback engine to a global React context backed by Zustand for state tracking. Service workers pre-cache adjacent tracks, enabling zero-latency track switches and partial offline playback.",
    architectureSteps: ["Zustand Media Store", "HTML5 Audio Engine", "Service Worker Pre-caching", "Saavn API Sync"],
    engineeringDecisions: "Used Zustand instead of Redux Toolkit for audio hoisting. Zustand's atomic state selectors prevented unnecessary re-renders of the dynamic player control elements and canvas visualizers during active playback.",
    futureImprovements: "Introduce real-time collaborative listening sessions using WebRTC data channels for low-latency state synchronization.",
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
    urlDomain: "https://urbanreport.vercel.app/",
    description: "Streamlines public municipal issue reporting and tracking for local residents. Incorporates automatic client-side canvas-based image compression that shrinks upload payloads by 70%, ensuring instant submission even on weak cellular networks.",
    highlight: "Civic reporting flow with fast submissions and admin-ready issue tracking.",
    timeline: "Q3 2025",
    impact: "70% size compression",
    achievement: "Client-side pre-processing",
    metricPills: ["70% Compression", "<50ms Latency", "Realtime Sync", "Firestore DB"],
    whatIBuilt: ["Firestore Ticket Log", "Canvas Pre-Processing", "Real-Time Tracking", "Spam Filtering"],
    problemStatement: "Municipal reporting apps fail in the field because users try to upload high-resolution 12-megapixel images over weak 3G/LTE signals, leading to timed-out requests and database bloat.",
    solution: "Implemented local pre-processing using HTML5 Canvas to downscale and compress images directly in the browser. Payloads are shrunk by 70% before hitting the Firebase Storage pipeline.",
    architectureSteps: ["Canvas Compressor", "Firebase Upload Queue", "Firestore Sync Engine", "Admin Status Board"],
    engineeringDecisions: "Decided on client-side canvas downscaling over server-side functions. This shifts CPU workloads to user devices, reducing Firebase serverless function invocations and keeping infrastructure free-tier compatible.",
    futureImprovements: "Add offline storage queues (using localForage) that automatically sync pending tickets when connection is re-established.",
    metrics: [
      { label: "Size Compression", val: "70%" },
      { label: "Alert Latency", val: "<50ms" },
      { label: "Sync Engine", val: "Realtime" }
    ],
    longDescription: "A localized citizen utility reporting system that bridges the gap between urban residents and municipal administrators. Users can document civic issues (e.g., potholes, street light failures, water leakage) with descriptions and photo uploads. The system tracks submissions through statuses (Submitted, In Review, Resolved) and compiles them in a public dashboard to promote transparency and citizen engagement.",
    keyPoints: [
      "React-time ticket logging using Firebase Firestore database and email alerts for admins",
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
    status: "Open Source",
    urlDomain: "tushal-pandey.vercel.app",
    description: "A high-performance portfolio featuring zero-flash dark/light mode switches and liquid layouts. Achieves perfect Lighthouse scores and sub-second page loads through optimized asset delivery and modular React rendering.",
    highlight: "Personal brand system with dark mode, live resume, and animated sections.",
    timeline: "Q2 2025",
    impact: "100 Lighthouse SEO",
    achievement: "Anti-flash dynamic compile",
    metricPills: ["100 Lighthouse", "99 Performance", "<0.2s Load Time", "SEO Optimized"],
    whatIBuilt: ["Theme Toggle Engine", "Framer Scroll Triggers", "Audio Feedback Hook", "WebP Asset Delivery"],
    problemStatement: "Personal developer portfolios often suffer from layout shifts during dark-mode toggle loading or carry bloat from heavy animation packages, leading to poor Lighthouse scores.",
    solution: "Created an inline class-injection script in the HTML header to apply user theme preferences before the main React paint starts. Built visual animations using lightweight Framer Motion declarations and pre-compiled CSS transitions.",
    architectureSteps: ["Theme Injection Script", "React Render Tree", "Framer Motion Viewports", "Vite Asset Pipelines"],
    engineeringDecisions: "Used raw CSS variables coupled with Tailwind custom colors for the theme engine, avoiding JavaScript-based theme providers that trigger hydration flashes and page-load delays.",
    futureImprovements: "Embed an interactive sandbox shell allowing visitors to run commands and inspect projects directly from a mock terminal emulator.",
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
    status: "Archived",
    urlDomain: "",
    description: "A highly responsive cab booking interface simulating dynamic fare calculations and real-time ride tracking. Built using pure JavaScript routing and CSS transitions to provide native-app feel and smooth layouts without framework overhead.",
    highlight: "Ride booking interface with fare logic and dashboard screens.",
    timeline: "Q1 2025",
    impact: "Dynamic fare simulator",
    achievement: "Pure JS translate routers",
    metricPills: ["Dynamic Fare", "Wizard Steps", "Pure JS Routing", "Fluid Layout"],
    whatIBuilt: ["Dynamic Fare Simulator", "Multi-Step Booking Wizard", "Pure JS Router Nodes", "Mobile-First UI"],
    problemStatement: "Designing a ride-hailing prototype using standard SPAs often feels sluggish due to routing delays and heavy third-party map library bundles, hurting the mobile experience.",
    solution: "Designed a mobile-first booking interface with client-side price matrix calculations. Utilized pure JS routing nodes and hardware-accelerated CSS transforms to handle slide-in panel panels at 60fps.",
    architectureSteps: ["Pure JS Router Nodes", "CSS Transform Engine", "Fare Calculator API", "State Wizard Flow"],
    engineeringDecisions: "Created a custom router node structure in vanilla JS instead of importing React Router, which kept the bundle size small and allowed custom route transition control.",
    futureImprovements: "Integrate dynamic Leaflet map caching to display local route directions offline.",
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
    status: "Archived",
    urlDomain: "",
    description: "A digital gym companion that logs and tracks daily workouts with persistent offline capability. Automatically resolves out-of-sync states using Firestore local caches, keeping workout logs safe in concrete gyms.",
    highlight: "Workout task tracking with Firebase-backed updates.",
    timeline: "Q4 2024",
    impact: "Real-time synchronization",
    achievement: "Firestore offline cache",
    metricPills: ["Firestore Cache", "Recharts Visuals", "Streak UI Logs", "Real-Time Sync"],
    whatIBuilt: ["Firestore Local Cache", "Daily Routine Builder", "Stopwatch Rest Timer", "Recharts Progress Analytics"],
    problemStatement: "Logging workouts inside concrete-walled gyms often fails due to total lack of coverage. Standard database calls fail to resolve, resulting in lost user session progress.",
    solution: "Integrated Firestore offline database persistence along with LocalForage caching. Workout logs are written locally first and synchronized with the cloud backend once a connection is detected.",
    architectureSteps: ["LocalForage Cache", "Firestore Offline Sync", "Recharts Aggregator", "Dynamic Timer Loop"],
    engineeringDecisions: "Chose Firestore's offline persistence over standard localStorage because Firestore handles transaction reconciliation and synchronization automatically without custom client sync logic.",
    futureImprovements: "Leverage device sensors to auto-detect exercise sets and count repetitions using accelerometer changes.",
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
    status: "Archived",
    urlDomain: "",
    description: "An interactive forecast dashboard projecting extreme weather trends and local forecasts in real-time. Reduces API overhead by 80% using custom local cache policies while adapting theme styling to current conditions.",
    highlight: "Forecast cards, charted weather trends, and responsive search states.",
    timeline: "Q3 2024",
    impact: "1h TTL endpoint cache",
    achievement: "Autocomplete queries index",
    metricPills: ["1h TTL Cache", "Chart.js Graphs", "Dynamic Themes", "Autocomplete Index"],
    whatIBuilt: ["LocalStorage Cache Layer", "Chart.js Curve Graphs", "Dynamic Warning Cards", "Autocomplete Query Index"],
    problemStatement: "Weather applications make frequent API requests to fetch real-time forecasts, which quickly exhausts free-tier developer plan limits when visitors browse multiple cities.",
    solution: "Built a localStorage cache layer with a 1-hour time-to-live (TTL) expiration policy. Duplicate queries for the same coordinates or autocomplete searches are served instantly from the local cache.",
    architectureSteps: ["Query Autocomplete Index", "TTL Cache Manager", "Chart.js Renderer", "Dynamic Theme Context"],
    engineeringDecisions: "Used dynamic CSS context providers to shift the application's color theme based on the target city's current weather code (e.g. rain, snow, sunny) to enhance visual feedback.",
    futureImprovements: "Add browser push notification support to alert users of extreme weather warnings matching their saved cities.",
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

/* ===============================================================
   PREMIUM BROWSER MOCKUP CONTAINER
   =============================================================== */

const getStatusStyles = (status) => {
  return "border-app-border bg-app-surface-secondary text-app-text-secondary";
};

const getStatusDotColor = (status) => {
  switch (status) {
    case "Production":
    case "Live":
      return "bg-app-accent";
    case "Active Development":
      return "bg-app-text-primary";
    case "Open Source":
      return "bg-app-text-secondary";
    case "Archived":
    default:
      return "bg-app-text-muted";
  }
};

/* ===============================================================
   PREMIUM BROWSER MOCKUP CONTAINER
   =============================================================== */

const BrowserMockup = ({ src, alt, domain = "github.com" }) => (
  <div className="relative overflow-hidden rounded-xl border border-app-border bg-app-surface shadow-none transition-all duration-300">
    {/* Top Header Bar */}
    <div className="flex items-center justify-between border-b border-app-border px-4 py-2 bg-app-surface-secondary">
      {/* 3 Window Dots */}
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-app-border" />
        <span className="h-2 w-2 rounded-full bg-app-border" />
        <span className="h-2 w-2 rounded-full bg-app-border" />
      </div>
      {/* URL Address Box */}
      {domain && (
        <div className="flex items-center gap-1.5 rounded-md bg-app-bg px-3 py-1 w-44 sm:w-56 justify-center text-[10px] font-mono text-app-text-muted border border-app-border select-none">
          <Chrome className="h-3 w-3 text-app-text-muted" />
          <span className="truncate">{domain}</span>
        </div>
      )}
      <div className="w-10" />
    </div>
    {/* Body image container */}
    <div className="aspect-[16/10] w-full overflow-hidden bg-app-surface relative">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-[1.01]"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const fallback = e.currentTarget.nextElementSibling;
          if (fallback) fallback.classList.remove("hidden");
        }}
      />
      {/* Fallback image cover */}
      <div className="absolute inset-0 hidden flex-col items-center justify-center bg-app-surface text-app-text-muted">
        <FileText className="h-8 w-8 animate-pulse" />
        <span className="text-[10px] font-mono mt-1">Asset loading...</span>
      </div>
    </div>
  </div>
);

/* ===============================================================
   CASE STUDY SLIDE-OVER DRAWER (Linear/Vercel-like documentation view)
   =============================================================== */

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
      className="fixed inset-0 z-[150] flex h-screen w-screen justify-end bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 240 }}
        className="relative flex h-full w-full max-w-5xl flex-col bg-app-bg text-app-text-primary border-l border-app-border shadow-none overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top sticky action header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-app-border bg-app-bg/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="group flex items-center gap-1.5 rounded-lg border border-app-border bg-app-surface px-3 py-1.5 text-xs font-semibold text-app-text-secondary transition hover:bg-app-surface-secondary hover:text-app-text-primary active:scale-95"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Portfolio</span>
            </button>
            <div className="h-4 w-px bg-app-border" />
            <span className="text-[10px] font-mono tracking-wider text-app-text-muted uppercase select-none">
              Case Study / {project.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 items-center gap-1.5 rounded-lg border border-app-border bg-app-surface px-3 text-xs font-semibold text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all active:scale-95"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 items-center gap-1.5 rounded-lg bg-zinc-900 px-3 text-xs font-bold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100 transition-all active:scale-95 shadow-none"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Demo</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-app-border bg-app-surface text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Outer scrollable page area */}
        <div className="flex-1 overflow-y-auto">
          {/* Top Banner layout */}
          <div className="p-6 sm:p-8 bg-app-surface/40 border-b border-app-border">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wide ${getStatusStyles(project.status)}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${getStatusDotColor(project.status)} ${project.status !== "Archived" ? "animate-pulse" : ""}`} />
                  {project.status}
                </span>
                <span className="text-xs text-app-text-muted font-mono">Released {project.timeline}</span>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-app-text-primary">
                  {project.title}
                </h1>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-app-text-secondary max-w-2xl">
                  {project.description}
                </p>
              </div>
              <BrowserMockup src={project.image} alt={project.title} domain={project.urlDomain} />
            </div>
          </div>

          {/* Grid Layout: Left Content, Right Sidebar */}
          <div className="max-w-4xl mx-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left/Main Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-10 text-left">

              {/* Section 1: Overview */}
              <section className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-app-text-muted">Project Overview</h2>
                <div className="h-[1px] w-full bg-app-border" />
                <p className="text-sm leading-relaxed text-app-text-secondary">
                  {project.longDescription}
                </p>
              </section>

              {/* Section 2: Problem vs Solution */}
              <section className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-app-text-muted">Problem & Solution</h2>
                <div className="h-[1px] w-full bg-app-border" />
                <div className="grid grid-cols-1 gap-4">
                  {/* Problem */}
                  <div className="p-4 border-l-2 border-app-border bg-app-surface rounded-r-xl space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-app-text-muted">Problem Statement</h3>
                    <p className="text-xs leading-relaxed text-app-text-secondary">
                      {project.problemStatement}
                    </p>
                  </div>
                  {/* Solution */}
                  <div className="p-4 border-l-2 border-app-accent bg-app-surface rounded-r-xl space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-app-accent">The Solution</h3>
                    <p className="text-xs leading-relaxed text-app-text-secondary">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3: Architecture Diagram */}
              {project.architectureSteps && (
                <section className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-app-text-muted">System Architecture</h2>
                  <div className="h-[1px] w-full bg-app-border" />

                  {/* Architecture Diagram blocks */}
                  <div className="flex flex-col sm:flex-row items-stretch gap-3 justify-between relative py-2">
                    {project.architectureSteps.map((step, idx) => (
                      <div key={step} className="flex-1 flex flex-col items-center justify-center p-3.5 border border-app-border bg-app-surface rounded-xl relative select-none">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-app-text-primary text-[10px] font-bold text-app-bg mb-2">
                          {idx + 1}
                        </div>
                        <span className="text-[11px] font-semibold tracking-tight text-app-text-primary text-center">
                          {step}
                        </span>
                        {/* Connecting arrows for layout */}
                        {idx < project.architectureSteps.length - 1 && (
                          <>
                            <div className="hidden sm:block absolute top-1/2 -right-2 w-4 h-[1px] bg-app-border -translate-y-1/2 z-10" />
                            <div className="block sm:hidden absolute -bottom-2.5 left-1/2 w-[1px] h-2.5 bg-app-border -translate-x-1/2 z-10" />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Section 4: Key Features */}
              {project.features && (
                <section className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-app-text-muted">Key Features</h2>
                  <div className="h-[1px] w-full bg-app-border" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feat) => {
                      const Icon = ICON_MAP[feat.iconName] || Sparkles;
                      return (
                        <div key={feat.title} className="flex gap-3.5 border border-app-border rounded-xl bg-app-surface p-4 hover:border-app-accent/40 transition-colors duration-250">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-app-surface-secondary border border-app-border shadow-none">
                            <Icon className="h-4 w-4 text-app-text-secondary" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-app-text-primary">{feat.title}</h4>
                            <p className="mt-1 text-[11px] leading-relaxed text-app-text-muted">{feat.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Section 5: Challenges Faced */}
              {project.challenges && (
                <section className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-app-text-muted">Challenges & Resolution</h2>
                  <div className="h-[1px] w-full bg-app-border" />
                  <div className="p-4 rounded-xl border border-app-border bg-app-surface text-xs sm:text-sm leading-relaxed text-app-text-secondary">
                    <span className="font-semibold text-app-text-primary block mb-2">Technical Challenge:</span>
                    {project.challenges}
                  </div>
                </section>
              )}

              {/* Section 6: Future Improvements */}
              {project.futureImprovements && (
                <section className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-app-text-muted">Future Roadmap</h2>
                  <div className="h-[1px] w-full bg-app-border" />
                  <div className="p-4 rounded-xl border border-app-border bg-app-surface text-xs text-app-text-secondary">
                    <div className="flex items-start gap-2.5">
                      <span className="text-[11px] text-app-text-muted mt-0.5">🚀</span>
                      <p>{project.futureImprovements}</p>
                    </div>
                  </div>
                </section>
              )}

            </div>

            {/* Right/Meta Sidebar Column (4 cols) */}
            <div className="lg:col-span-4 space-y-6">

              {/* Box 1: Indicators */}
              <div className="rounded-xl border border-app-border bg-app-surface p-5 space-y-4 text-left">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted pb-2 border-b border-app-border">
                  Key Metrics
                </h4>
                <div className="space-y-3.5 text-xs text-app-text-secondary">
                  <div>
                    <span className="block text-[9px] font-bold text-app-text-muted uppercase tracking-wider">Impact</span>
                    <span className="font-mono font-semibold text-app-accent">{project.impact}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-app-text-muted uppercase tracking-wider">Achievement</span>
                    <span className="font-medium text-app-text-primary">{project.achievement}</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Engineering Decisions */}
              {project.engineeringDecisions && (
                <div className="rounded-xl border border-app-border bg-app-surface p-5 space-y-4 text-left">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted pb-2 border-b border-app-border">
                    Engineering Decisions
                  </h4>
                  <p className="text-xs leading-relaxed text-app-text-secondary">
                    {project.engineeringDecisions}
                  </p>
                </div>
              )}

              {/* Box 3: Tech Stack */}
              <div className="rounded-xl border border-app-border bg-app-surface p-5 space-y-4 text-left">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted pb-2 border-b border-app-border">
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(project.fullTech || project.tech).map((t) => (
                    <span key={t} className="rounded-full border border-app-border bg-app-surface-secondary px-2.5 py-0.5 text-[10px] font-medium text-app-text-secondary">
                      {t}
                    </span>
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

/* ===============================================================
   MAIN PROJECTS LISTING SECTION
   =============================================================== */

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredProject = PROJECTS[0];
  const otherProjects = useMemo(() => {
    return showAll ? PROJECTS.slice(1) : PROJECTS.slice(1, 5);
  }, [showAll]);

  return (
    <>
      <section id="projects" className="section-container border-t border-app-border bg-app-bg">

        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-left max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-app-text-muted mb-3">
            Case Studies
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-app-text-primary sm:text-4xl md:text-5xl">
            Selected Work
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-app-text-secondary sm:text-base">
            Detailed project records exploring product metrics, technical stack integration, and architectural decisions. Click on any project to read its case study.
          </p>
        </div>

        {/* Project Grid */}
        <div className="mx-auto w-full">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <AnimatePresence>
              {/* Featured Project: Hunter (spans full-width on desktop, first on mobile) */}
              <motion.article
                key={featuredProject.title}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="col-span-1 md:col-span-2 group relative flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 rounded-2xl border border-app-border bg-app-surface p-6 sm:p-8 hover:border-app-accent/30 hover:scale-[1.01] transition-all duration-300 shadow-none hover:shadow-none lg:scale-[1.02]"
              >
                {/* Left Side: Browser Mockup (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <BrowserMockup src={featuredProject.image} alt={featuredProject.title} domain={featuredProject.urlDomain} />
                </div>

                {/* Right Side: Featured Details (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between text-left">
                  <div>
                    {/* Badge header */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 rounded-full border border-app-border bg-app-surface-secondary px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-app-accent select-none">
                        <span>⭐</span>
                        <span>Featured Project</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 mt-1 flex-wrap">
                      <h3 className="text-2xl font-bold text-app-text-primary group-hover:text-app-accent transition-colors">
                        {featuredProject.title}
                      </h3>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-medium tracking-wide ${getStatusStyles(featuredProject.status)}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${getStatusDotColor(featuredProject.status)} ${featuredProject.status !== "Archived" ? "animate-pulse" : ""}`} />
                        {featuredProject.status}
                      </span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-app-text-secondary">
                      {featuredProject.description}
                    </p>

                    {/* What I Built Section */}
                    {featuredProject.whatIBuilt && (
                      <div className="mt-4 space-y-1.5 text-xs text-left">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted">What I Built</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-app-text-secondary font-medium">
                          {featuredProject.whatIBuilt.map((item) => (
                            <div key={item} className="flex items-center gap-1.5">
                              <span className="text-[10px] text-app-accent">✓</span>
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {featuredProject.tech.map((t) => (
                        <span key={t} className="rounded-full border border-app-border bg-app-surface-secondary px-2.5 py-0.5 text-[10px] font-medium text-app-text-secondary">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Metric Pills */}
                    {featuredProject.metricPills && (
                      <div className="mt-5 pt-4 border-t border-app-border">
                        <div className="flex flex-wrap gap-1.5">
                          {featuredProject.metricPills.map((m) => (
                            <span key={m} className="rounded-full border border-app-border bg-app-surface-secondary px-2.5 py-0.5 text-[9px] font-mono font-semibold text-app-text-secondary">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="mt-6 pt-4 border-t border-app-border flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
                    <button
                      onClick={() => setSelectedProject(featuredProject)}
                      className="group inline-flex items-center justify-center gap-1 text-xs font-bold text-app-text-secondary hover:text-app-accent transition-colors w-full sm:w-auto"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>

                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      {featuredProject.source && (
                        <a href={featuredProject.source} target="_blank" rel="noopener noreferrer" title="GitHub Source"
                          className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-app-border bg-transparent px-4 text-xs font-semibold text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all active:scale-95 w-full sm:w-auto shadow-none">
                          <FaGithub className="h-3.5 w-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {featuredProject.link && (
                        <a href={featuredProject.link} target="_blank" rel="noopener noreferrer" title="Live Demo"
                          className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-zinc-900 px-4 text-xs font-bold text-white transition hover:bg-zinc-800/90 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 active:scale-95 w-full sm:w-auto shadow-none">
                          <FaExternalLinkAlt className="h-3 w-3" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>

              {/* Other Projects Grid */}
              {otherProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-app-border bg-app-surface p-5 transition-all duration-300 hover:border-app-border hover:scale-[1.01] shadow-none sm:p-6"
                >
                  <div className="space-y-5">
                    {/* Browser Mockup wrapper */}
                    <BrowserMockup src={project.image} alt={project.title} domain={project.urlDomain} />

                    {/* Title & Status */}
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-app-text-muted">
                        {project.tech.join(" · ")}
                      </span>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <h3 className="text-xl font-bold text-app-text-primary group-hover:text-app-accent transition-colors">
                          {project.title}
                        </h3>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-medium tracking-wide ${getStatusStyles(project.status)}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${getStatusDotColor(project.status)} ${project.status !== "Archived" ? "animate-pulse" : ""}`} />
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-app-text-secondary">
                      {project.description}
                    </p>

                    {/* What I Built Section */}
                    {project.whatIBuilt && (
                      <div className="space-y-1.5 text-xs text-left">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted">What I Built</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-app-text-secondary font-medium">
                          {project.whatIBuilt.map((item) => (
                            <div key={item} className="flex items-center gap-1.5">
                              <span className="text-[10px] text-app-accent">✓</span>
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Metric Pills */}
                    {project.metricPills && (
                      <div className="pt-3 border-t border-app-border">
                        <div className="flex flex-wrap gap-1.5">
                          {project.metricPills.map((m) => (
                            <span key={m} className="rounded-full border border-app-border bg-app-surface-secondary px-2.5 py-0.5 text-[9px] font-mono font-semibold text-app-text-secondary">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="mt-6 pt-4 border-t border-app-border flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group inline-flex items-center justify-center gap-1 text-xs font-bold text-app-text-secondary hover:text-app-accent transition-colors w-full sm:w-auto"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>

                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      {project.source && (
                        <a href={project.source} target="_blank" rel="noopener noreferrer" title="GitHub Source"
                          className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-app-border bg-transparent px-4 text-xs font-semibold text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all active:scale-95 w-full sm:w-auto shadow-none">
                          <FaGithub className="h-3.5 w-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" title="Live Demo"
                          className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-zinc-900 px-4 text-xs font-bold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 active:scale-95 w-full sm:w-auto shadow-none">
                          <FaExternalLinkAlt className="h-3 w-3" />
                          <span>Live Demo</span>
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
                className="group flex items-center gap-1.5 rounded-full border border-app-border bg-app-surface px-5 py-2 text-xs font-semibold text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary active:scale-95 shadow-none"
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
