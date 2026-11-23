import StackRolodex, { type RolodexItem } from "./ui/stack-rolodex";
import ToolOrbit from "./ui/ToolOrbit";
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

// Complete technology stack representing all capabilities across mobile and desktop
const ALL_TECH: RolodexItem[] = [
  { id: "c", name: "C", color: "#659AD2", icon: CIcon },
  { id: "cpp", name: "C++", color: "#00599C", icon: CppIcon },
  { id: "ts", name: "TypeScript", color: "#3178C6", icon: TypeScriptIcon },
  { id: "js", name: "JavaScript", color: "#F7DF1E", icon: JavaScriptIcon },
  { id: "python", name: "Python", color: "#3776AB", icon: PythonIcon },
  { id: "sql", name: "SQL", color: "#E38C00", icon: SqlIcon },
  { id: "react", name: "React", color: "#61DAFB", icon: ReactIcon },
  { id: "next", name: "Next.js", icon: NextIcon }, // monochrome brand keeps neutral pill
  { id: "tailwind", name: "Tailwind CSS", color: "#06B6D4", icon: TailwindIcon },
  { id: "motion", name: "Motion", color: "#FF0055", icon: MotionIcon },
  { id: "node", name: "Node.js", color: "#5FA04E", icon: NodeIcon },
  { id: "firebase", name: "Firebase", color: "#FFCA28", icon: FirebaseIcon },
  { id: "postgres", name: "PostgreSQL", color: "#336791", icon: PostgresIcon },
  { id: "mongodb", name: "MongoDB", color: "#47A248", icon: MongoIcon },
  { id: "git", name: "Git", color: "#F05032", icon: GitIcon },
  { id: "github", name: "GitHub", icon: GitHubIcon }, // monochrome brand keeps neutral pill
  { id: "figma", name: "Figma", color: "#F24E1E", icon: FigmaIcon },
  { id: "vercel", name: "Vercel", icon: VercelIcon }, // monochrome brand keeps neutral pill
  { id: "aws", name: "AWS", color: "#FF9900", icon: AwsIcon },
];

export default function StackMarquee() {
  return (
    <section id="tools" className="tools-section section-wrap" aria-labelledby="tools-heading">
      <div className="tools-heading">
        <div>
          <p className="eyebrow">
            CAPABILITIES <span className="eyebrow-meta">TOOLS / METHODS</span>
          </p>
          <h2 id="tools-heading">
            Built with<br />depth<span className="accent">.</span>
          </h2>
        </div>
        <p>
          Tools selected for the job.<br />Systems made to stay useful.
        </p>
      </div>

      {/* Mobile-Only: Interactive Stack Rolodex */}
      <div className="md:hidden flex items-center justify-center my-8 py-2 w-full">
        <StackRolodex
          items={ALL_TECH}
          label="in my stack"
          interval={2000}
          step={48}
        />
      </div>

      {/* Desktop-Only: Semi-Circle Circular Motion Tool Orbit with Square Cards */}
      <div className="hidden md:flex flex-col items-center justify-center w-full my-4">
        <ToolOrbit items={ALL_TECH} />
      </div>
    </section>
  );
}
