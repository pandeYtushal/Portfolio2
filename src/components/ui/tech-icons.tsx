import React from "react";

type IconProps = { className?: string; style?: React.CSSProperties };

// ISO / Devicon C Programming Language Logo (Official Blue Hexagon Badge)
export const CIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#659AD2" d="M115.4 30.7L67.1 2.9c-1.9-1.1-4.3-1.1-6.2 0L12.6 30.7c-1.9 1.1-3.1 3.2-3.1 5.4v55.8c0 2.2 1.2 4.3 3.1 5.4l48.3 27.8c1.9 1.1 4.3 1.1 6.2 0l48.3-27.8c1.9-1.1 3.1-3.2 3.1-5.4V36.1c0-2.2-1.2-4.3-3.1-5.4z" />
    <path fill="#FFFFFF" d="M64 96c-17.7 0-32-14.3-32-32s14.3-32 32-32c9.2 0 17.5 3.9 23.3 10.1l-10.7 10.7C73.1 49.3 68.8 47.6 64 47.6c-9.1 0-16.4 7.3-16.4 16.4s7.3 16.4 16.4 16.4c4.8 0 9.1-1.7 12.5-5.1l10.7 10.7C81.5 92.1 73.2 96 64 96z" />
  </svg>
);

// Simple Icons C++ (Official Dark Blue Badge + White C and Pluses)
export const CppIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#00599C" d="M115.4 30.7L67.1 2.9c-1.9-1.1-4.3-1.1-6.2 0L12.6 30.7c-1.9 1.1-3.1 3.2-3.1 5.4v55.8c0 2.2 1.2 4.3 3.1 5.4l48.3 27.8c1.9 1.1 4.3 1.1 6.2 0l48.3-27.8c1.9-1.1 3.1-3.2 3.1-5.4V36.1c0-2.2-1.2-4.3-3.1-5.4z" />
    <path fill="#FFFFFF" d="M52 86c-12.2 0-22-9.8-22-22s9.8-22 22-22c6.3 0 12 2.7 16 7l-7.3 7.3c-2.4-2.4-5.3-3.7-8.7-3.7-6.2 0-11.4 5.2-11.4 11.4s5.2 11.4 11.4 11.4c3.4 0 6.3-1.3 8.7-3.7l7.3 7.3c-4 4.3-9.7 7-16 7z" />
    <path fill="#FFFFFF" d="M78 61h4v-7h6v7h7v6h-7v7h-6v-7h-4zm20 0h4v-7h6v7h7v6h-7v7h-6v-7h-4z" />
  </svg>
);

// Authentic Rust Gear & Glyph
export const RustIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <circle cx="64" cy="64" r="56" fill="#F74C00" />
    <circle cx="64" cy="64" r="42" fill="#000000" />
    <path fill="#F74C00" d="M48 46h24c8.8 0 14.7 5.2 14.7 13.2 0 6.1-3.8 10.9-10.2 12.5l11.5 19.3h-12l-9.8-17H58v17h-10V46zm10 19h13c3.5 0 5.8-2 5.8-5s-2.3-5-5.8-5H58v10z" />
  </svg>
);

// Official TypeScript Logo (Iconic Blue Square + White TS)
export const TypeScriptIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <rect width="128" height="128" rx="20" fill="#3178C6" />
    <path fill="#FFFFFF" d="M68 62.5h-14v48h-11v-48h-14v-9.5h39v9.5zm35.2 24.2c0 14.8-10.2 24.8-26.2 24.8-10 0-18.4-4.5-22.6-11.8l9.4-5.5c2.7 4.7 7.7 7.7 13.2 7.7 8.3 0 14.5-5 14.5-13.2 0-7.3-4.8-10.7-15.6-15-13.2-5.3-20.2-11.2-20.2-22.3 0-12.8 9.9-22.2 24.5-22.2 9.5 0 16.5 3.8 20.6 9.8l-8.5 6c-2.8-4.1-6.8-6.4-12.1-6.4-7.3 0-12.5 4.5-12.5 11.2 0 6.4 4.5 9.7 14.6 13.7 13.8 5.6 20.9 11.7 20.9 23.2z" />
  </svg>
);

// Official JavaScript Logo (Iconic Yellow Square + Black JS)
export const JavaScriptIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <rect width="128" height="128" rx="20" fill="#F7DF1E" />
    <path fill="#000000" d="M72.2 92.5c2.2 3.6 5.2 6.1 10.3 6.1 5.2 0 8.5-2.6 8.5-6.2 0-4.3-3.5-5.9-9.3-8.4l-3.2-1.4c-9.3-4-15.4-9-15.4-19.8 0-9.8 7.5-17.3 19.3-17.3 8.3 0 14.3 2.9 18.3 10l-8.4 5.4c-2-3.5-4.2-4.9-9.9-4.9-4.1 0-7 2.3-7 5.4 0 3.7 2.9 5.2 8.7 7.7l3.2 1.4c11.3 4.8 16.7 9.8 16.7 20.4 0 11.7-9.2 18-21.7 18-12.1 0-19.3-5.8-22.8-13.1l9.7-5.8zm-33.8-5.3c1.3 2.3 2.8 4.2 5.5 4.2 3.2 0 5.2-1.6 5.2-7.8V46.5h11.9v37.2c0 12.3-7.2 17.8-17.4 17.8-9 0-14.8-4.7-17.8-12.5l10.6-4.7z" />
  </svg>
);

// Official Python Double Snake (Blue & Yellow Authentic Vectors)
export const PythonIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#3776AB" d="M63.5 1.5c-32.4 0-30.4 14.1-30.4 14.1l.1 14.6h31v4.4H20.6S0 32.2 0 64.9c0 32.7 17.9 31.6 17.9 31.6h10.7V81.6s-.6-17 16.7-17h30.7s13.2.3 13.2-12.7V20.8s1.6-19.3-25.7-19.3zM47.2 11.3a5.8 5.8 0 1 1 0 11.6 5.8 5.8 0 0 1 0-11.6z" />
    <path fill="#FFD43B" d="M64.5 126.5c32.4 0 30.4-14.1 30.4-14.1l-.1-14.6h-31v-4.4h43.6s20.6 2.4 20.6-30.3c0-32.7-17.9-31.6-17.9-31.6h-10.7v14.9s.6 17-16.7 17H52.1s-13.2-.3-13.2 12.7v31.1s-1.6 19.3 25.7 19.3zm16.3-9.8a5.8 5.8 0 1 1 0-11.6 5.8 5.8 0 0 1 0 11.6z" />
  </svg>
);

// Relational Database / SQL Multi-Tiered Cylinder
export const SqlIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#E38C00" d="M16 32v22c0 9.9 21.5 18 48 18s48-8.1 48-18V32z" />
    <ellipse cx="64" cy="54" rx="48" ry="16" fill="#FFA000" opacity="0.3" />
    <path fill="#E38C00" d="M16 58v22c0 9.9 21.5 18 48 18s48-8.1 48-18V58z" />
    <ellipse cx="64" cy="80" rx="48" ry="16" fill="#FFA000" opacity="0.3" />
    <path fill="#E38C00" d="M16 84v22c0 9.9 21.5 18 48 18s48-8.1 48-18V84z" />
    <ellipse cx="64" cy="32" rx="48" ry="18" fill="#FFB300" />
    <ellipse cx="64" cy="29" rx="44" ry="15" fill="#FFE082" />
  </svg>
);

// Authentic React Atom (Cyan Glowing Nucleus + 3 Electron Orbits)
export const ReactIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <circle cx="64" cy="64" r="14" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="6" fill="none">
      <ellipse cx="64" cy="64" rx="56" ry="21" />
      <ellipse cx="64" cy="64" rx="56" ry="21" transform="rotate(60 64 64)" />
      <ellipse cx="64" cy="64" rx="56" ry="21" transform="rotate(120 64 64)" />
    </g>
  </svg>
);

// Official Next.js Logo (Solid Disc + White N + Gradient Leg)
export const NextIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <circle cx="64" cy="64" r="64" fill="#000000" />
    <path fill="#FFFFFF" d="M99.5 117.2L42.2 44.8H32v54.4h10.4V59.4l51.6 65.3c1.9-2.2 3.7-4.6 5.5-7.5z" />
    <path fill="url(#nextGrad)" d="M85.5 44.8h10.4v38.8L85.5 70.8z" />
    <defs>
      <linearGradient id="nextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// Official Tailwind CSS Cyan Wave SVG
export const TailwindIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#06B6D4" d="M64 25.6c-17.1 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.7C72.9 56.7 80.9 65 100.3 65c17.1 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.7-6.3-6.4-14.3-14.7-33.7-14.7zm-32 38.4c-17.1 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.7C40.9 95.1 48.9 103.4 68.3 103.4c17.1 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.7C81.4 72.3 73.4 64 54 64h-22z" />
  </svg>
);

// Official Framer / Motion Geometry SVG
export const MotionIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#FF0055" d="M21.3 0h85.4v42.7H64zM21.3 42.7H64l42.7 42.6H21.3zM21.3 85.3H64v42.7z" />
  </svg>
);

// Simple Icons Vite
export const ViteIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#646CFF" d="M125.8 11.9L68.5 111.4c-1.8 3.1-6.2 3.1-8 0L3.2 11.9c-2-3.4.6-7.8 4.6-7.6l56.2 3.3 57.2-3.3c4-.2 6.6 4.2 4.6 7.6z" />
    <path fill="#FFD43B" d="M84.2 11.9L49.1 72.7c-.8 1.4.2 3.2 1.8 3.2h21.4l-7.7 34.2c-.4 1.8 1.8 2.9 2.9 1.5l36.5-47.8c1-1.3.1-3.2-1.5-3.2H82.2l12.8-26.6c.7-1.4-.4-3-2-3h-8.8z" />
  </svg>
);

// Simple Icons Tauri Interlocking Structure
export const TauriIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <circle cx="64" cy="64" r="56" fill="#24C8D8" />
  </svg>
);

// Official Node.js Green Hexagon SVG
export const NodeIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#339933" d="M64 128c-1.7 0-3.4-.4-4.9-1.3L15.3 101.4c-3-1.7-4.9-5-4.9-8.5V41.7c0-3.5 1.9-6.8 4.9-8.5l43.8-25.3c3-1.7 6.8-1.7 9.8 0l43.8 25.3c3 1.7 4.9 5 4.9 8.5v51.2c0 3.5-1.9 6.8-4.9 8.5L68.9 126.7c-1.5.9-3.2 1.3-4.9 1.3z" />
    <path fill="#FFFFFF" d="M64 100.8c-1.1 0-2.2-.3-3.2-.8L37.2 86.4c-1.5-.9-2.5-2.5-2.5-4.2V58.7c0-1.7 1-3.3 2.5-4.2l23.6-13.6c2-1.2 4.4-1.2 6.4 0l23.6 13.6c1.5.9 2.5 2.5 2.5 4.2v23.5c0 1.7-1 3.3-2.5 4.2L67.2 100c-1 .5-2.1.8-3.2.8z" />
  </svg>
);

// Official Multi-Color Firebase Flame (Amber, Orange, Gold)
export const FirebaseIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#FFA000" d="M20.7 83.6L33.3 2.5c.3-1.8 2.6-2.4 3.7-1l13.6 25.5L20.7 83.6z" />
    <path fill="#F57C00" d="M76.3 38.1L66.6 19.5c-.7-1.4-2.7-1.4-3.4 0l-9.9 18.6 23 0z" />
    <path fill="#FFCA28" d="M107.3 103.3L95.6 28.6c-.3-1.7-2.4-2.3-3.5-1L20.7 83.6l40.4 22.8c1.8 1 4.1 1 5.9 0l40.3-23.1z" />
  </svg>
);

// Official PostgreSQL Blue Slonik Elephant SVG
export const PostgresIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#336791" d="M64 4C30.9 4 4 30.9 4 64s26.9 60 60 60 60-26.9 60-60S97.1 4 64 4zm28.6 68.4c-2.4 12-14.7 18.2-27.2 18.2-4.5 0-9.2-.9-13.6-2.9l-2.4 11.2c-1.2 5.5-6.5 9.1-12 7.9-5.5-1.2-9.1-6.5-7.9-12l4.8-22.3C27.9 76 24 67.9 24 59.1c0-17.6 17.9-31.9 40-31.9s40 14.3 40 31.9c0 4.8-1.4 9.4-4 13.5l1.6 5.8c1 3.5-.9 7.1-4.4 8.1-1.6.5-3.3.3-4.6-.6z" />
    <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
  </svg>
);

// Official MongoDB Green Leaf SVG
export const MongoIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#4DB33D" d="M64 0C60.6 8 28 41.5 28 72.3c0 20.5 12.6 37.8 30.7 44.6v11.1h10.6V117C87.4 110.1 100 92.8 100 72.3 100 41.5 67.4 8 64 0z" />
    <path fill="#3F9B35" d="M64 0c-.2.5-.4 1-.6 1.5C59.9 9.3 28 41.5 28 72.3c0 20.5 12.6 37.8 30.7 44.6v11.1h5.3V0z" />
    <path fill="#FFFFFF" opacity="0.3" d="M64 30c-1 3-3 8-3 15s2 12 3 15 3-8 3-15-2-12-3-15z" />
  </svg>
);

// Official Git Orange-Red Diamond & Branches SVG
export const GitIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#F05032" d="M125.6 58.3L69.7 2.4c-3.2-3.2-8.4-3.2-11.7 0L46.6 13.8l15.5 15.5c3 1 5.3 3.5 5.9 6.7l15.5 15.5c3.2.6 5.7 3 6.7 5.9 1.4 4.5-.4 9.4-4.4 11.9s-9.3 1.5-12.2-2.3c-2.1-2.7-2.5-6.4-1.1-9.5L58.1 43.1v28.5c1.8 1 3.2 2.8 3.7 5 1.1 5-.9 10-5.1 12.6s-9.6 1.7-12.7-2.1c-2.3-2.9-2.7-6.9-1.2-10.2 1.5-3.3 4.9-5.4 8.5-5.3V42.3L35.7 26.7 2.4 60c-3.2 3.2-3.2 8.4 0 11.7l55.9 55.9c3.2 3.2 8.4 3.2 11.7 0l55.6-55.6c3.2-3.2 3.2-8.5 0-11.7z" />
    <circle cx="75" cy="53" r="7" fill="#FFFFFF" />
    <circle cx="53" cy="38" r="7" fill="#FFFFFF" />
    <circle cx="53" cy="88" r="7" fill="#FFFFFF" />
  </svg>
);

// Official GitHub Octocat Silhouette SVG
export const GitHubIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#FFFFFF" fillRule="evenodd" clipRule="evenodd" d="M64 0C28.7 0 0 28.7 0 64c0 28.3 18.3 52.3 43.8 60.8 3.2.6 4.4-1.4 4.4-3.1 0-1.5-.1-6.5-.1-11.8-17.8 3.9-21.6-7.6-21.6-7.6-2.9-7.4-7.1-9.4-7.1-9.4-5.8-4 .4-3.9.4-3.9 6.4.5 9.8 6.6 9.8 6.6 5.7 9.8 15 7 18.6 5.3.6-4.2 2.2-7 4-8.6-14.2-1.6-29.2-7.1-29.2-31.6 0-7 2.5-12.7 6.6-17.2-.7-1.6-2.9-8.1.6-17 0 0 5.4-1.7 17.6 6.6 5.1-1.4 10.6-2.2 16-2.2s10.9.7 16 2.2c12.2-8.3 17.6-6.6 17.6-6.6 3.5 8.8 1.3 15.4.6 17 4.1 4.5 6.6 10.2 6.6 17.2 0 24.6-15 30-29.3 31.6 2.3 2 4.3 5.9 4.3 11.9 0 8.6-.1 15.5-.1 17.6 0 1.7 1.2 3.7 4.4 3.1C109.7 116.3 128 92.3 128 64c0-35.3-28.7-64-64-64z" />
  </svg>
);

// Official 5-Color Figma Logo SVG
export const FigmaIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#0ACF83" d="M36 128c15.5 0 28-12.5 28-28V72H36c-15.5 0-28 12.5-28 28s12.5 28 28 28z" />
    <path fill="#A259FF" d="M8 72c0-15.5 12.5-28 28-28h28v56H36C20.5 100 8 87.5 8 72z" />
    <path fill="#F24E1E" d="M8 28C8 12.5 20.5 0 36 0h28v56H36C20.5 56 8 43.5 8 28z" />
    <path fill="#FF7262" d="M64 0h28c15.5 0 28 12.5 28 28s-12.5 28-28 28H64V0z" />
    <path fill="#1ABCFE" d="M92 44c15.5 0 28 12.5 28 28s-12.5 28-28 28c-15.5 0-28-12.5-28-28s12.5-28 28-28z" />
  </svg>
);

// Official Vercel White Triangle SVG
export const VercelIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#FFFFFF" d="M64 16L120 112H8z" />
  </svg>
);

// Official AWS Logo with Orange Smile Arrow SVG
export const AwsIcon = ({ className = "w-4 h-4", style }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} style={style}>
    <path fill="#FFFFFF" d="M47.7 54.5h8.9l12.8 35.4h-9l-2.6-7.7H45.7l-2.6 7.7H35l12.7-35.4zm7.7 20.9l-3.8-11.5-3.8 11.5h7.6z" />
    <path fill="#FF9900" d="M97.1 91.8c-12.5 9.2-30.7 14.1-46.6 14.1-22.3 0-42.5-8-57.9-21.4-.9-.8-.9-2.3 0-3.1 1.9-1.9 3.8-3.7 5.7-5.6.8-.8 2.2-.8 3.1 0 12.7 10.7 28.7 17.1 46.1 17.1 13.3 0 27.6-3.8 38.8-11.2 1.4-.9 3.2-.5 4.1.9.9 1.4 1.9 2.8 2.9 4.2.8 1.8.6 3.6-.2 5z" />
    <path fill="#FF9900" d="M106.8 84.4c-2.1-2.7-13.3-1.1-20.2.5-2.1.5-2.1-1.1-.5-2.1 9-5.9 23.9-4.2 25.5-2.1 2.1 2.1-.5 17-9 23.9-1.6 1.1-2.7.5-2.1-1.1 2.1-6.3 7.4-16.5 6.3-19.1z" />
  </svg>
);
