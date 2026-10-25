export interface Metric {
  label: string;
  val: string;
}

export interface Project {
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

export const PROJECTS_DATA: Project[] = [
  {
    id: "pulse",
    figNum: "FIG.01",
    title: "Pulse",
    tag: "SYSTEM LAYER & TAURI",
    image: "/Pulse.png",
    description: "A quiet system layer for Windows bringing media, notifications, and system activity into one compact surface at the top of your screen.",
    status: "Active",
    urlDomain: "github.com/pandeYtushal/Pulse",
    highlight: "Native Rust services interfacing directly with Windows APIs.",
    timeline: "2026",
    impact: "Unified system layer",
    achievement: "Tauri & Rust integration",
    metricPills: ["Tauri 2", "React", "TypeScript", "Rust", "Windows APIs"],
    whatIBuilt: [
      "Built a desktop application using Tauri 2, React, and Rust.",
      "Developed native Rust services to read Windows system state like media sessions, clipboard, and battery.",
      "Created a compact, unobtrusive React interface to display system activity at the top of the screen."
    ],
    problemStatement: "System information, media controls, and notifications are scattered across the Windows interface, leading to a fragmented and distracting user experience.",
    solution: "Developed a quiet, unified system layer that aggregates media, notifications, clipboard, power, and connection events into a single, cohesive surface using Tauri and Rust.",
    architectureSteps: ["Rust System Services", "Tauri IPC Bridge", "React Interface", "Windows API Integration"],
    engineeringDecisions: "Chose Tauri and Rust for a lightweight, native-feeling desktop experience with minimal memory footprint while securely accessing low-level Windows APIs.",
    futureImprovements: "Implement comprehensive local notification history and expand browser extension capabilities for deeper integration.",
    metrics: [
      { label: "Platform", val: "Windows" },
      { label: "Framework", val: "Tauri 2" },
      { label: "Core", val: "Rust" }
    ],
    longDescription: "Pulse is a quiet system layer for Windows built with Tauri 2, React, TypeScript, and Rust. The React interface presents current activity, while native Rust services read supported Windows system state and report it to the interface. It displays media sessions, playback controls, notification activity, clipboard changes, power alerts, and connection events in one compact surface.",
    keyPoints: [
      "Native Windows API integration using Rust.",
      "Lightweight desktop application architecture with Tauri 2.",
      "Unified display for media, notifications, clipboard, and system events."
    ],
    tech: ["Tauri", "React", "Rust"],
    fullTech: ["Tauri 2", "React", "TypeScript", "Rust", "Windows APIs"],
    challenges: "Interfacing safely and efficiently with diverse low-level Windows APIs for media and notifications. Addressed by writing robust native Rust services to handle state monitoring and IPC bridging to the React frontend.",
    features: [
      { title: "System Activity", desc: "Monitors battery, Bluetooth, USB, and screenshot events.", iconName: "Activity" },
      { title: "Media Controls", desc: "Displays Windows media metadata and provides playback controls.", iconName: "PlayCircle" },
      { title: "Notification Layer", desc: "Aggregates notification activity and optional sanitized clipboard previews.", iconName: "Bell" }
    ],
    link: "https://pulse-website-nine.vercel.app/",
    source: "https://github.com/pandeYtushal/Pulse"
  },
  {
    id: "hunter",
    figNum: "FIG.02",
    title: "Hunter",
    tag: "INDEPENDENT TRANSFORMS & AUTOFULL",
    image: "/hunter.png",
    description: "An autonomous AI browser agent that translates natural language goals into self-healing browser execution scripts.",
    status: "Active Alpha",
    urlDomain: "huntterr.vercel.app",
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
    id: "astronomical",
    figNum: "FIG.03",
    title: "Astronomical",
    tag: "SCROLL-VELOCITY PHYSICS & D3 MAP",
    image: "/astronomical.png",
    description: "A multimedia web archive documenting the history of Indian mathematical astronomy, celestial models, and architectural observatories spanning 1,500 years.",
    status: "Live",
    urlDomain: "astronomical-chi.vercel.app",
    highlight: "Physics-based scroll-velocity timeline of historical scholars and a coordinate-mapped observatory index.",
    timeline: "2026",
    impact: "1500 years catalogued",
    achievement: "D3-geo observatory mapping",
    metricPills: ["Next.js 15", "Framer Motion", "d3-geo", "Scroll Physics", "Custom Fonts"],
    whatIBuilt: [
      "Cinematic 3D gallery with physics-based scroll-velocity driven timeline.",
      "Abstract coordinate map of historical observatories using d3-geo projections.",
      "Detailed archive pages for scholars: Aryabhata, Brahmagupta, Bhaskara II.",
      "Modern Space Era section covering ISRO achievements including Chandrayaan and AstroSat."
    ],
    problemStatement: "The rich history of Indian mathematical astronomy, spanning Vedic astronomy, the Aryabhatiya, Jantar Mantar, and ISRO, lacks a single visually coherent web archive that honours both its depth and its modern context.",
    solution: "Built a Next.js 15 multimedia archive with Framer Motion cinematic transitions, a d3-geo abstract observatory map, and scroll-velocity physics driving the historical timeline experience.",
    architectureSteps: ["Scroll Physics Engine", "d3-geo Map Renderer", "Archive Content Layer", "Framer Motion Transitions"],
    engineeringDecisions: "Used d3-geo for the abstract coordinate-based map instead of a tile-map service to maintain visual control and avoid external API dependencies for historical observatory locations.",
    futureImprovements: "Add primary source manuscript viewer with annotated translations of the Aryabhatiya and Brahmasphutasiddhanta.",
    metrics: [
      { label: "Timeline Span", val: "1,500yr" },
      { label: "Stack", val: "Next 15" },
      { label: "Map Engine", val: "d3-geo" }
    ],
    longDescription: "Astronomical is a multimedia web archive that documents the history of Indian mathematical astronomy across 1,500 years. The archive features a physics-based cinematic timeline of historical scholars and celestial models, an interactive d3-geo abstract map of ancient observatories like Jantar Mantar, deep-dive archive pages on Aryabhata, Brahmagupta, and Bhaskara II, and a Modern Space Era section covering ISRO milestones including Chandrayaan and AstroSat.",
    keyPoints: [
      "Physics-based scroll-velocity driven timeline delivering a cinematic browsing experience.",
      "d3-geo coordinate-based observatory map for Jantar Mantar and ancient universities.",
      "Archive depth covering scholars from Aryabhata (5th century CE) through ISRO's modern era."
    ],
    tech: ["Next.js 15", "Framer Motion", "d3-geo"],
    fullTech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "d3-geo", "Space Grotesk", "IBM Plex Mono"],
    challenges: "Rendering fluid scroll-velocity physics on a static archive without sacrificing page performance. Solved by decoupling the physics engine from the React render cycle using Framer Motion's useScroll and transform utilities.",
    features: [
      { title: "Cinematic Timeline", desc: "Physics-based scroll-velocity driven gallery of historical scholars and celestial events.", iconName: "Layers" },
      { title: "Observatory Map", desc: "Abstract d3-geo coordinate map of Jantar Mantar and ancient astronomical universities.", iconName: "Globe" },
      { title: "Scholar Archives", desc: "Deep-dive pages on Aryabhata, Brahmagupta, Bhaskara II and their primary works.", iconName: "FileText" }
    ],
    link: "https://astronomical-chi.vercel.app/",
    source: "https://github.com/pandeYtushal/Astronomical"
  },
  {
    id: "civic",
    figNum: "FIG.04",
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
    figNum: "FIG.05",
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
  }
];
