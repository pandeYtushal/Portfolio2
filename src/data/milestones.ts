export type MilestoneIconName = "Terminal" | "Layers" | "Cpu" | "Award";

export interface Milestone {
  year: string;
  title: string;
  subtitle: string;
  tag: string;
  details: string[];
  iconName: MilestoneIconName;
  color: string;
}

export const MILESTONES: Milestone[] = [
  {
    year: "2023",
    title: "Started Development",
    subtitle: "Solidity & Decentralized Web3 Systems",
    tag: "Foundation",
    iconName: "Terminal",
    color: "#3b82f6",
    details: [
      "Designed cryptographic scripts and smart contracts on Ethereum networks.",
      "Explored standard structures for decentralized client execution logic.",
      "Built clean computational routines using pure Solidity structures.",
    ],
  },
  {
    year: "2024",
    title: "Full Stack Projects",
    subtitle: "React, Zustand, and Realtime Database Synchronization",
    tag: "Growth",
    iconName: "Layers",
    color: "#ff8a00",
    details: [
      "Designed Melody, a high-fidelity streaming platform featuring zero-flash route cache states.",
      "Built municipal tracking registers synced in realtime via Firestore caching.",
      "Optimized load times to sub-200ms using local asset indexing.",
    ],
  },
  {
    year: "2025",
    title: "AI Agents",
    subtitle: "Structured Reasoning & Multi-Model Orchestration",
    tag: "Breakout",
    iconName: "Cpu",
    color: "#a855f7",
    details: [
      "Orchestrated custom model router hubs dynamically selector-swapping client queries.",
      "Built browser automation scrapers utilizing coordinate models.",
      "Developed structured JSON API parsers formatting text results.",
    ],
  },
  {
    year: "2026",
    title: "Building Hunter",
    subtitle: "Flagship Autonomous Browser Automation Agent",
    tag: "Present",
    iconName: "Award",
    color: "#10b981",
    details: [
      "Architecting self-healing DOM selectors resolving real-time app shifts.",
      "Orchestrating concurrent sub-agents coordinating planning, browser, and memory nodes.",
      "Deploying client extension architecture bypassing captcha blockages.",
    ],
  },
];
