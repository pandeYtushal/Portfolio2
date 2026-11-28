import ToolOrbit, { type TechCardItem } from "./ui/ToolOrbit";
import {
  CIcon,
  CppIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  PythonIcon,
  SqlIcon,
  ReactIcon,
  NextIcon,
  TailwindIcon,
  MotionIcon,
  NodeIcon,
  FirebaseIcon,
  PostgresIcon,
  MongoIcon,
  GitIcon,
  GitHubIcon,
  FigmaIcon,
  VercelIcon,
  AwsIcon,
} from "./ui/tech-icons";

// Capabilities catalog and runtime architecture toolchain registry
const ALL_TECH: TechCardItem[] = [
  {
    id: "ts",
    name: "TypeScript",
    category: "RUNTIME",
    tagline: "Type Systems & Safety",
    projects: ["Pulse", "Hunter", "Melody"],
    color: "#38bdf8",
    bgGradient: "linear-gradient(155deg, #1e3a5f 0%, #0f172a 100%)",
    icon: TypeScriptIcon,
  },
  {
    id: "react",
    name: "React 19",
    category: "UI CORE",
    tagline: "Component Architecture",
    projects: ["Pulse", "Melody", "Civic"],
    color: "#61dafb",
    bgGradient: "linear-gradient(155deg, #0e374e 0%, #081a26 100%)",
    icon: ReactIcon,
  },
  {
    id: "next",
    name: "Next.js 15",
    category: "FULL-STACK",
    tagline: "Server Components & Edge",
    projects: ["Astronomical"],
    color: "#ffffff",
    bgGradient: "linear-gradient(155deg, #27272a 0%, #09090b 100%)",
    icon: NextIcon,
  },
  {
    id: "python",
    name: "Python",
    category: "AI & AGENTS",
    tagline: "Multimodal Vision Loops",
    projects: ["Hunter"],
    color: "#34d399",
    bgGradient: "linear-gradient(155deg, #0d4a36 0%, #06231a 100%)",
    icon: PythonIcon,
  },
  {
    id: "motion",
    name: "Motion",
    category: "PHYSICS",
    tagline: "Springs & Morphing",
    projects: ["Astronomical", "Portfolio"],
    color: "#fb7185",
    bgGradient: "linear-gradient(155deg, #4d0a27 0%, #1a020d 100%)",
    icon: MotionIcon,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "DESIGN TOKENS",
    tagline: "Utility Token Systems",
    projects: ["All Systems"],
    color: "#22d3ee",
    bgGradient: "linear-gradient(155deg, #0e3d4a 0%, #061c22 100%)",
    icon: TailwindIcon,
  },
  {
    id: "node",
    name: "Node.js",
    category: "BACKEND",
    tagline: "Asynchronous Event Loops",
    projects: ["Melody", "Hunter"],
    color: "#4ade80",
    bgGradient: "linear-gradient(155deg, #144322 0%, #071f0e 100%)",
    icon: NodeIcon,
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "DATABASE",
    tagline: "Enterprise Relational",
    projects: ["Smart Civic", "Pulse"],
    color: "#38bdf8",
    bgGradient: "linear-gradient(155deg, #1b3a5c 0%, #0a1928 100%)",
    icon: PostgresIcon,
  },
  {
    id: "c",
    name: "C",
    category: "SYSTEMS",
    tagline: "Deterministic Memory",
    projects: ["Core Systems"],
    color: "#93c5fd",
    bgGradient: "linear-gradient(155deg, #2a3348 0%, #111827 100%)",
    icon: CIcon,
  },
  {
    id: "cpp",
    name: "C++",
    category: "COMPUTE",
    tagline: "High-Throughput Logic",
    projects: ["Algorithms"],
    color: "#60a5fa",
    bgGradient: "linear-gradient(155deg, #1e3050 0%, #0b1526 100%)",
    icon: CppIcon,
  },
  {
    id: "sql",
    name: "SQL",
    category: "DATABASE",
    tagline: "ACID Relational Queries",
    projects: ["Smart Civic"],
    color: "#fbbf24",
    bgGradient: "linear-gradient(155deg, #4d300b 0%, #1c1003 100%)",
    icon: SqlIcon,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "DOCUMENT",
    tagline: "Aggregation & BSON",
    projects: ["Fullstack"],
    color: "#4ade80",
    bgGradient: "linear-gradient(155deg, #114220 0%, #061e0d 100%)",
    icon: MongoIcon,
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "REALTIME",
    tagline: "Edge Sync & Auth Rules",
    projects: ["Smart Civic"],
    color: "#f59e0b",
    bgGradient: "linear-gradient(155deg, #4d2e05 0%, #1f1100 100%)",
    icon: FirebaseIcon,
  },
  {
    id: "git",
    name: "Git",
    category: "DEV TOOLS",
    tagline: "Atomic Commits & Rebase",
    projects: ["Workflow"],
    color: "#f87171",
    bgGradient: "linear-gradient(155deg, #4c1d13 0%, #1c0a06 100%)",
    icon: GitIcon,
  },
  {
    id: "github",
    name: "GitHub",
    category: "CI & CD",
    tagline: "Actions & Automations",
    projects: ["Workflow"],
    color: "#f4f4f5",
    bgGradient: "linear-gradient(155deg, #27272a 0%, #09090b 100%)",
    icon: GitHubIcon,
  },
  {
    id: "figma",
    name: "Figma",
    category: "DESIGN",
    tagline: "Interactive UI Specs",
    projects: ["All Interfaces"],
    color: "#fb923c",
    bgGradient: "linear-gradient(155deg, #471b12 0%, #190906 100%)",
    icon: FigmaIcon,
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "EDGE CDN",
    tagline: "Instant Previews & Edge",
    projects: ["All Deployments"],
    color: "#ffffff",
    bgGradient: "linear-gradient(155deg, #27272a 0%, #09090b 100%)",
    icon: VercelIcon,
  },
  {
    id: "aws",
    name: "AWS",
    category: "CLOUD",
    tagline: "S3 & Serverless Lambda",
    projects: ["Cloud Systems"],
    color: "#fbbf24",
    bgGradient: "linear-gradient(155deg, #4d2f06 0%, #1f1201 100%)",
    icon: AwsIcon,
  },
  {
    id: "js",
    name: "JavaScript",
    category: "WEB RUNTIME",
    tagline: "ESNext & Browser Engines",
    projects: ["Core Web"],
    color: "#fde047",
    bgGradient: "linear-gradient(155deg, #4d4306 0%, #1c1800 100%)",
    icon: JavaScriptIcon,
  },
];

export default function StackMarquee() {
  return (
    <section id="tools" className="tools-section section-wrap" aria-labelledby="tools-heading">
      <div className="tools-heading mb-4 md:mb-6">
        <div>
          <p className="eyebrow">
            CAPABILITIES <span className="eyebrow-meta">TOOLS &amp; METHODS</span>
          </p>
          <h2 id="tools-heading">
            Built with<br />depth<span className="accent">.</span>
          </h2>
        </div>
        <p className="section-note">
          Tools selected for the job.<br />Systems made to stay useful.
        </p>
      </div>

      {/* Interactive 3D capability manifold */}
      <div className="w-full">
        <ToolOrbit items={ALL_TECH} />
      </div>
    </section>
  );
}
