import { useState, useEffect, useRef, forwardRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight, Brain, Cpu, Globe, Zap, CheckCircle, Terminal, FileText, Play, RotateCw, ArrowUpRight } from "lucide-react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { fadeUp, easeOut } from "../lib/motion";

interface Metric {
  label: string;
  val: string;
}

interface Project {
  id: string;
  figNum: string;
  title: string;
  tag: string;
  image: string;
  description: string;
  status: string;
  urlDomain: string;
  highlight: string;
  timeline: string;
  impact: string;
  achievement: string;
  metricPills: string[];
  whatIBuilt: string[];
  problemStatement: string;
  solution: string;
  architectureSteps: string[];
  engineeringDecisions: string;
  futureImprovements: string;
  metrics: Metric[];
  longDescription: string;
  keyPoints: string[];
  tech: string[];
  fullTech: string[];
  challenges: string;
  features: { title: string; desc: string; iconName: string }[];
  link: string;
  source: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "hunter",
    figNum: "FIG.01",
    title: "Hunter",
    tag: "INDEPENDENT TRANSFORMS & AUTOFULL",
    image: "/hunter.png",
    description: "An autonomous AI browser agent that translates natural language goals into self-healing browser execution scripts.",
    status: "Active Alpha",
    urlDomain: "hunter.ai",
    highlight: "Self-healing DOM selectors resolving dynamic client shifts.",
    timeline: "Ongoing",
    impact: "94% target accuracy",
    achievement: "Vision-guided DOM mapping",
    metricPills: ["Manifest V3", "Self-Healing Selector", "Vision Models", "IndexedDB Sync"],
    whatIBuilt: ["Autofill Layout Mapper", "Multi-Agent Executor Loop", "Local Cache Database", "Chrome Extension Core"],
    problemStatement: "Procedural web bots fail instantly when layouts shift, class names update, or buttons change labels, causing broken workflows and high support overhead.",
    solution: "Built a self-healing selection router integrating visual coordination meshes with semantic DOM elements, letting the model target action fields even after code updates.",
    architectureSteps: ["Planner Engine", "Vision Mapper", "Execution Channel", "Reflection Engine"],
    engineeringDecisions: "Eschewed heavy server-based runtimes; executed logic inside Chrome extension sandboxes utilizing local storage caches to preserve user privacy.",
    futureImprovements: "Inject local WebRTC channels to coordinate booking logs across multiple browser profiles simultaneously.",
    metrics: [
      { label: "Target Match", val: "94%" },
      { label: "Fill Speed", val: "<1.2s" },
      { label: "Autofill Rate", val: "88%" }
    ],
    longDescription: "Hunter is an autonomous browser copilot that executes multi-step objectives on any website. Harnessing planning, reflection, and vision capabilities, it processes page screenshots to locate buttons, fill complex forms, bypass dynamic shifts, and cache data schemas locally.",
    keyPoints: [
      "Modular agent architecture dividing planning, action, and validation loops.",
      "Vision coordinates matching mapping buttons and inputs visually.",
      "Self-healing fallback adapting to SPA DOM selector updates."
    ],
    tech: ["Chrome Extension", "AI Agents", "Multi-LLM"],
    fullTech: ["JavaScript", "Chrome Extensions API", "Manifest V3", "Gemini API", "OpenAI API", "Vision Models", "IndexedDB"],
    challenges: "Handling asynchronous dynamic state changes on SPAs. Resolved by implementing a reflective validation step checking site responses before continuing.",
    features: [
      { title: "Smart Planner", desc: "Formulates execution steps based on user prompt inputs.", iconName: "Brain" },
      { title: "Visual Selector", desc: "Finds interactive coordinates bypassing raw selector code.", iconName: "Chrome" },
      { title: "Autofill Engine", desc: "Maps form questions to custom profiles instantly.", iconName: "Cpu" }
    ],
    link: "https://huntterr.vercel.app/",
    source: "https://github.com/pandeYtushal"
  },
  {
    id: "civic",
    figNum: "FIG.02",
    title: "Smart Civic Platform",
    tag: "CANVAS COMPRESSION & FIRESTORE",
    image: "/urban.png",
    description: "A localized complaint logging platform bridging public residents with municipal administrators.",
    status: "Live",
    urlDomain: "urban-utiliy-report.vercel.app",
    highlight: "HTML5 Canvas pre-processing shrinking image payloads by 70% to prevent connection failures.",
    timeline: "2026",
    impact: "70% size compression",
    achievement: "Client-side image scaling",
    metricPills: ["React.js", "Tailwind CSS", "Firebase", "Canvas API", "Real-time Tracking", "PWA"],
    whatIBuilt: [
      "Realtime ticket logging and status updates using Firebase Auth & Firestore.",
      "Client-side image scaling utilizing HTML5 Canvas context scaling.",
      "Mobile-first responsive report form with status trackers and admin tools."
    ],
    problemStatement: "Municipal reporting apps fail in the field because users try to upload high-resolution 12-megapixel images over weak 3G/LTE signals, leading to timed-out requests.",
    solution: "Implemented local pre-processing using HTML5 Canvas to downscale and compress images directly in the browser. Payloads are shrunk by 70% before hitting the Firebase Storage pipeline.",
    architectureSteps: ["Canvas Compressor", "Firebase Upload Queue", "Firestore Sync Engine", "Admin Status Board"],
    engineeringDecisions: "Executed canvas downscaling in the browser to reduce cloud server costs and ensure compatibility with weak cell signals.",
    futureImprovements: "Introduce offline localForage storage logging reports when connectivity is lost.",
    metrics: [
      { label: "Compression", val: "70%" },
      { label: "Alert Latency", val: "<50ms" },
      { label: "Sync Engine", val: "Realtime" }
    ],
    longDescription: "A localized citizen utility reporting system that bridges the gap between urban residents and municipal administrators. Users can document civic issues (e.g. potholes, street light failures, water leakage) with descriptions and photo uploads. The system tracks submissions through statuses (Submitted, In Review, Resolved) and compiles them in a public dashboard to promote transparency.",
    keyPoints: [
      "Realtime Firestore subscriptions updating active municipal ticket boards.",
      "Client-side image scaling optimizing bandwidth usage.",
      "Secure ticket submission rate limiting to prevent dashboard spam."
    ],
    tech: ["React.js", "Tailwind CSS", "Firebase", "JavaScript"],
    fullTech: ["React.js", "Tailwind CSS", "Firebase Authentication", "Firestore", "Firebase Storage", "JavaScript (ES6+)"],
    challenges: "Handling high-volume image uploads on a free-tier storage plan. Implemented client-side canvas-based image compression prior to uploading to Firebase, reducing storage size requirements by over 70%.",
    features: [
      { title: "Issue Logging", desc: "Upload images, describe location, and select categories for municipal reports.", iconName: "FileText" },
      { title: "Firestore Sync", desc: "Real-time sync ensures issues show up on the dashboard instantly.", iconName: "Layers" },
      { title: "Status Tracking", desc: "Visual timeline for issue lifecycles from submission to resolution.", iconName: "CheckCircle" }
    ],
    link: "https://urban-utiliy-report.vercel.app/",
    source: "https://github.com/pandeYtushal"
  },
  {
    id: "melody",
    figNum: "FIG.03",
    title: "Melody Premium",
    tag: "HOISTED PLAYBACK STATE & PWA",
    image: "/music.png",
    description: "Developed a music streaming web app with glassmorphic UI and PWA support for mobile-first experience.",
    status: "Live",
    urlDomain: "meldmusic.vercel.app",
    highlight: "Hoisted Zustand audio playback maintaining uninterrupted playback during navigation.",
    timeline: "2026",
    impact: "Instant state sync",
    achievement: "Zustand audio hoisting",
    metricPills: ["React 19", "Tailwind CSS", "Firebase Auth", "Zustand", "Axios", "Vite"],
    whatIBuilt: [
      "Integrated JioSaavn API for high-quality audio fetching and recommendations.",
      "Firebase Auth with Google Login integration.",
      "Zustand store tracking persistent queues, volumes, and routes."
    ],
    problemStatement: "Standard web music players interrupt audio playback during page navigation or fail when network bandwidth fluctuates, resulting in a choppy listening experience.",
    solution: "Hoisted the audio playback engine to a global React context backed by Zustand for state tracking. Service workers pre-cache adjacent tracks, enabling zero-latency track switches.",
    architectureSteps: ["Zustand Media Store", "HTML5 Audio Engine", "Service Worker Pre-caching", "Saavn API Sync"],
    engineeringDecisions: "Used Zustand instead of Redux Toolkit for audio hoisting. Zustand's atomic state selectors prevented unnecessary re-renders of the dynamic player control elements and canvas visualizers during active playback.",
    futureImprovements: "Introduce real-time collaborative listening sessions using WebRTC data channels for low-latency state synchronization.",
    metrics: [
      { label: "Track Index", val: "10M+" },
      { label: "State Sync", val: "Zustand" },
      { label: "Load latency", val: "<0.3s" }
    ],
    longDescription: "Melody is a premium, high-fidelity music streaming application designed with a dark monochrome aesthetic. Integrated with the JioSaavn API, it provides millions of songs, custom playlist creation, real-time lyric fetching, and intelligent music recommendations. State management is driven by Zustand to handle playback states, tracks queues, and volume controls globally and persistently.",
    keyPoints: [
      "Offline audio cache persistence using active browser Service Workers.",
      "Zustand player orchestration supporting fluid track queue changes.",
      "Dynamic background gradient mesh adapting to song artwork profile."
    ],
    tech: ["React 19", "Tailwind CSS", "Firebase", "Zustand"],
    fullTech: ["React 19", "Tailwind CSS", "Zustand", "Firebase Auth", "JioSaavn API", "Axios", "Vite"],
    challenges: "Preventing layout flashes on theme state updates. Solved by pre-allocating canvas gradient blocks.",
    features: [
      { title: "Audio Sync", desc: "Zustand player hoisting caching state across routes.", iconName: "Layers" },
      { title: "Realtime Lyrics", desc: "Synchronizes lyrics directly with track play milestones.", iconName: "Terminal" },
      { title: "Dynamic Themes", desc: "Fades colors to match songs.", iconName: "Globe" }
    ],
    link: "https://meldmusic.vercel.app/",
    source: "https://github.com/pandeYtushal"
  },
  {
    id: "portfolio",
    figNum: "FIG.04",
    title: "Portfolio",
    tag: "NATIVE TRANSITIONS & THEME SWITCH",
    image: "/port.png",
    description: "Designed and deployed a personal portfolio showcasing projects, certifications, and skills with smooth navigation.",
    status: "Live",
    urlDomain: "tushalpandey.vercel.app",
    highlight: "Personal brand system with dark mode, live resume, and animated sections.",
    timeline: "2025",
    impact: "100 Lighthouse",
    achievement: "Lighthouse SEO optimization",
    metricPills: ["React.js", "Tailwind CSS", "JavaScript", "Vercel"],
    whatIBuilt: [
      "Theme toggle engine persisting user preferences inside LocalStorage.",
      "Framer Motion viewports scroll and page transition triggers.",
      "Lighthouse SEO and performance checklist compliance."
    ],
    problemStatement: "Developer portfolios often suffer from layout flashes on dark-mode toggle loading or carry bloat from heavy animation packages, leading to poor page speeds.",
    solution: "Used raw CSS variables coupled with Tailwind custom colors for the theme engine, avoiding JavaScript-based theme providers that trigger hydration flashes and page-load delays.",
    architectureSteps: ["Theme Injection Script", "React Render Tree", "Framer Motion Viewports", "Vite Asset Pipelines"],
    engineeringDecisions: "Used raw CSS variables coupled with Tailwind custom colors for the theme engine, avoiding JavaScript-based theme providers that trigger hydration flashes and page-load delays.",
    futureImprovements: "Embed an interactive sandbox shell allowing visitors to run commands and inspect projects directly from a mock terminal emulator.",
    metrics: [
      { label: "SEO Score", val: "100" },
      { label: "Performance", val: "99" },
      { label: "Load Time", val: "<0.2s" }
    ],
    longDescription: "A custom-built, high-performance personal portfolio website designed to present professional work, blog posts, and interactive resumes with zero page reloads. Built using React, Vite, and Tailwind CSS, it features smooth Framer Motion animations, a dynamic dark/light mode toggle, an interactive live clock, and a customized resume modal. The layout is optimized for high-speed page loads, accessibility, and clean aesthetics.",
    keyPoints: [
      "Fully responsive layout with customized theme engine supporting immediate theme toggling without layout shifts",
      "Framer Motion integration for layout animations, header transitions, and section-by-section scroll animations",
      "Custom React hook context for audio interactions, providing immediate audio feedback on clicks"
    ],
    tech: ["React.js", "Tailwind CSS", "JavaScript", "Vercel"],
    fullTech: ["React.js", "Tailwind CSS", "Vite", "Framer Motion", "Lucide Icons", "JavaScript", "Vercel"],
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
    id: "cab",
    figNum: "FIG.05",
    title: "Cab Booking Platform",
    tag: "PURE JS ROUTING & CSS TRANSITION",
    image: "/meme.png",
    status: "Archived",
    urlDomain: "",
    description: "A highly responsive cab booking interface simulating dynamic fare calculations and real-time ride tracking. Built using pure JavaScript routing and CSS transitions.",
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
    id: "gym",
    figNum: "FIG.06",
    title: "Fit Gym Tracker",
    tag: "FIRESTORE OFFLINE PERSISTENCE",
    image: "/meme.png",
    status: "Archived",
    urlDomain: "",
    description: "A digital gym companion that logs and tracks daily workouts with persistent offline capability. Automatically resolves out-of-sync states using Firestore local caches.",
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
    id: "weather",
    figNum: "FIG.07",
    title: "Weather Dashboard",
    tag: "TTL LOCALCACHE FORECAST",
    image: "/meme.png",
    status: "Archived",
    urlDomain: "",
    description: "An interactive forecast dashboard projecting extreme weather trends and local forecasts in real-time. Reduces API overhead by 80% using custom local cache policies.",
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



export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? PROJECTS_DATA : PROJECTS_DATA.slice(0, 4);

  useEffect(() => {
    if (showAll) {
      const timer = setTimeout(() => {
        const element = document.getElementById("project-card-cab");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
    return () => { };
  }, [showAll]);

  return (
    <section id="projects" className="bg-app-bg relative border-t border-app-border px-6 py-24">
      {/* Blueprint Grid Lines corner cross decoration */}
      <div className="absolute top-0 left-0 bottom-0 right-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-10 left-10 text-zinc-800 font-mono text-xs">+</div>
        <div className="absolute top-10 right-10 text-zinc-800 font-mono text-xs">+</div>
        <div className="absolute bottom-10 left-10 text-zinc-800 font-mono text-xs">+</div>
        <div className="absolute bottom-10 right-10 text-zinc-800 font-mono text-xs">+</div>
      </div>

      <div className="mx-auto max-w-6xl text-left">
        {/* Header Block */}
        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-app-border bg-app-surface px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-app-accent">
            <span>01</span>
            <span>&gt;</span>
            <span>Project Showcase</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-[-0.04em] text-app-text-primary leading-[1.05]">
            Projects that perform.
          </h2>
          <p className="max-w-2xl text-sm md:text-base leading-relaxed text-app-text-secondary">
            Harnessing low-latency state orchestration, client-side canvas processing, and high-performance physics-based layouts.
          </p>
        </div>

        {/* Blueprint Figures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="group relative bg-[#F6D42D] border border-zinc-950/20 rounded-none p-5 flex flex-col justify-between hover:border-zinc-950/40 hover:shadow-lg hover:shadow-[#F6D42D]/5 transition-all duration-300 overflow-hidden min-h-[420px]"
            >
              {/* Corners Crosshairs decoration */}
              <div className="absolute top-2 left-2 text-zinc-950/30 text-[10px] font-mono select-none">+</div>
              <div className="absolute top-2 right-2 text-zinc-950/30 text-[10px] font-mono select-none">+</div>
              <div className="absolute bottom-2 left-2 text-zinc-950/30 text-[10px] font-mono select-none">+</div>
              <div className="absolute bottom-2 right-2 text-zinc-950/30 text-[10px] font-mono select-none">+</div>

              <div className="absolute top-1.5 right-6 font-mono text-[9px] font-extrabold text-zinc-950 select-none">{project.figNum}</div>

              <div>
                {/* Screenshot Frame */}
                <div className="h-44 w-full mb-4">
                  <div className="relative h-full w-full bg-zinc-950 bg-blueprint-grid border border-zinc-950/25 flex items-center justify-center overflow-hidden rounded-none">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="w-[92%] h-[92%] object-cover rounded-none border border-zinc-950/30 opacity-75 group-hover:opacity-100"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const next = e.currentTarget.nextElementSibling as HTMLElement;
                        if (next) next.classList.remove("hidden");
                      }}
                    />
                    <div className="absolute inset-0 hidden flex flex-col items-center justify-center text-zinc-500">
                      <Terminal className="h-6 w-6 text-[#F6D42D] animate-pulse" />
                      <span className="text-[8px] font-mono mt-1">NO IMAGE</span>
                    </div>
                  </div>
                </div>

                {/* Tag & Info */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="rounded border border-zinc-950/30 bg-zinc-950/5 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-950">
                      {project.status}
                    </span>
                    <span className="text-[9px] text-zinc-800 font-mono">{project.timeline}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-zinc-950 tracking-tight group-hover:text-black transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-[11px] text-zinc-800 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Footer CTAs Row */}
              <div className="mt-5 pt-4 border-t border-zinc-950/15 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 hover:text-black transition-colors cursor-pointer"
                >
                  <span>Project Details</span>
                  <ArrowRight className="h-3 w-3 text-zinc-950" />
                </button>

                <div className="flex gap-2">
                  {project.source && (
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      className="flex h-8 w-8 items-center justify-center rounded border border-zinc-950/15 bg-zinc-950/5 text-zinc-950 hover:bg-zinc-950/10 hover:text-black transition-all active:scale-95"
                    >
                      <FaGithub className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live Demo"
                      className="flex h-8 w-8 items-center justify-center rounded border border-zinc-950/15 bg-zinc-950/5 text-zinc-950 hover:bg-zinc-950/10 hover:text-black transition-all active:scale-95"
                    >
                      <FaExternalLinkAlt className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Trigger Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 border-2 border-[#ffb347] bg-black px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ffb347] hover:bg-[#ffb347] hover:text-black transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span>{showAll ? "Show Less" : "Show More Projects"}</span>
          </button>
        </div>
      </div>

      {/* Project Details Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />

            {/* Centered Project Details Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-3xl max-h-[85vh] border border-[#ffb347]/30 bg-[#0a0a0a] p-6 md:p-10 shadow-2xl shadow-[#ffb347]/5 overflow-y-auto rounded-2xl z-10 text-left"
            >
              {/* Header close */}
              <div className="flex justify-between items-center pb-6 border-b border-zinc-800/60">
                <div className="flex items-center gap-2.5">
                  <span className="rounded border border-[#ffb347] bg-[#ffb347] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-950">
                    Project Details
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">{selectedProject.timeline}</span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="h-8 w-8 rounded-md border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-[#ffb347] hover:border-[#ffb347]/40 transition-all cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Main Body */}
              <div className="mt-8 space-y-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                    {selectedProject.title}
                  </h1>
                  {selectedProject.urlDomain && (
                    <p className="mt-2 text-xs font-mono text-[#ffb347]">{selectedProject.urlDomain}</p>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Challenges & Solutions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#ffb347] border-b border-zinc-800/60 pb-2">The Architecture Challenge</h3>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-400">
                    {selectedProject.challenges}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#ffb347] border-b border-zinc-800/60 pb-2">The Engineered Solution</h3>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-400">
                    {selectedProject.solution}
                  </p>
                </div>

                {/* Details / What I Built */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#ffb347] border-b border-zinc-800/60 pb-2">Technical Contributions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {selectedProject.whatIBuilt.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl border border-zinc-800/50 bg-zinc-900/30">
                        <CheckCircle className="h-4 w-4 text-[#ffb347] shrink-0 mt-0.5" />
                        <span className="text-xs leading-relaxed text-zinc-300">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Stack Tech stack */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#ffb347] border-b border-zinc-800/60 pb-2">Orchestration Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.fullTech.map((tech, idx) => (
                      <span key={idx} className="rounded border border-zinc-800/50 bg-zinc-900/40 px-3 py-1 text-xs font-mono text-zinc-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex items-center gap-4 pt-6 border-t border-zinc-800/60">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#ffb347] px-5 text-xs font-bold text-zinc-950 transition-all hover:bg-[#ffa726] active:scale-95"
                    >
                      <span>Launch Live Demo</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {selectedProject.source && (
                    <a
                      href={selectedProject.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 hover:bg-zinc-800/80 px-5 text-xs font-semibold text-zinc-400 hover:text-white transition-all active:scale-95"
                    >
                      <FaGithub className="h-4 w-4" />
                      <span>View GitHub Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
