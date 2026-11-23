import { useState, useEffect } from "react";
import { m, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";
import type { RolodexItem } from "./stack-rolodex";

interface ToolOrbitProps {
  items: RolodexItem[];
  className?: string;
}

export function ToolOrbit({ items, className }: ToolOrbitProps) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const count = items.length;
  const activeTool = items[activeIndex] || items[0];

  // Uninterrupted continuous clockwise rotation across all screen types
  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 2200);
    return () => clearInterval(timer);
  }, [count]);

  // Orbital Geometry Constants — Wide Aerodynamic Horizon Curve (Factory.com / motion.dev style)
  const RADIUS = 440; // Expansive radius for a gentle, elegant arc
  const STEP_DEG = 13.5; // Tighter angular step keeps cards unified and balanced
  const APEX_DEG = -90; // Top apex is -90 degrees (12 o'clock)
  const ORIGIN_Y = 520; // Center of the circular orbit

  return (
    <div
      className={cn(
        "relative w-full select-none overflow-hidden py-1 flex flex-col items-center justify-center",
        className
      )}
      role="region"
      aria-label="Interactive desktop tools orbit"
    >
      {/* Ambient background glow matching active tool color */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-700 opacity-25"
        style={{
          background: activeTool?.color
            ? `radial-gradient(circle 500px at 50% 80px, ${activeTool.color}35 0%, transparent 70%)`
            : "radial-gradient(circle 500px at 50% 80px, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Main Horizon Arena — Compact, Wide & Fully Visible */}
      <div className="relative w-full max-w-[960px] h-[340px] mx-auto overflow-hidden">
        {/* Orbital Guide Curve SVG — Centered and Aligned with Cards */}
        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
          width="960"
          height="340"
          viewBox="0 0 960 340"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="orbitFade" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="30%" stopColor="white" stopOpacity="0.18" />
              <stop offset="100%" stopColor="white" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <path
            d="M 107 287 A 440 440 0 0 1 853 287"
            fill="none"
            stroke="url(#orbitFade)"
            strokeWidth="2"
            strokeDasharray="6 9"
          />
        </svg>

        {/* Big Square Cards Orbiting Clockwise along the Circular Arc */}
        <div className="absolute inset-0 pointer-events-none">
          {items.map((item, idx) => {
            // Signed circular offset from the active apex item
            let offset = (idx - activeIndex + count) % count;
            if (offset > count / 2) {
              offset -= count;
            }

            const absOffset = Math.abs(offset);
            // Render up to 4 items on each side (9 cards total visible along the arc)
            const isVisible = absOffset <= 4;

            // Angle in degrees: APEX_DEG - offset * STEP_DEG ensures clockwise motion (Left -> Apex -> Right)
            const deg = APEX_DEG - offset * STEP_DEG;
            const rad = (deg * Math.PI) / 180;

            // Circular coordinates centered on the arena
            const x = Math.round(RADIUS * Math.cos(rad));
            const y = Math.round(ORIGIN_Y + RADIUS * Math.sin(rad));

            // Depth-based scaling and boosted legibility (no faded/invisible cards)
            const isActive = offset === 0;
            const scale = isActive ? 1.22 : Math.max(0.78, 1 - absOffset * 0.055);
            const opacity = !isVisible
              ? 0
              : isActive
              ? 1
              : absOffset === 1
              ? 0.92
              : absOffset === 2
              ? 0.78
              : absOffset === 3
              ? 0.62
              : 0.48;

            const Icon = item.icon;

            return (
              <m.button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Select ${item.name}`}
                initial={false}
                animate={{
                  x: x,
                  y: y,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 210,
                        damping: 24,
                        mass: 0.85,
                      }
                }
                style={{
                  left: "50%",
                  top: "0px",
                  marginLeft: "-56px",
                  marginTop: "-56px",
                  zIndex: 20 - absOffset,
                  pointerEvents: isVisible ? "auto" : "none",
                  boxShadow:
                    isActive && item.color
                      ? `0 0 45px ${item.color}55, 0 16px 36px rgba(0,0,0,0.75)`
                      : "0 8px 24px rgba(0,0,0,0.5)",
                  borderColor:
                    isActive && item.color
                      ? `${item.color}90`
                      : isActive
                      ? "rgba(255, 255, 255, 0.45)"
                      : "rgba(255, 255, 255, 0.12)",
                  backgroundColor:
                    isActive && item.color
                      ? `${item.color}18`
                      : isActive
                      ? "rgba(255, 255, 255, 0.09)"
                      : "rgba(14, 14, 15, 0.92)",
                }}
                className={cn(
                  "absolute flex flex-col items-center justify-center rounded-2xl border backdrop-blur-md cursor-pointer transition-colors duration-300",
                  "w-28 h-28 p-3.5 select-none",
                  isActive
                    ? "text-white"
                    : "text-neutral-400 hover:text-white hover:border-white/30"
                )}
              >
                {/* Brand Icon — Enlarged */}
                {Icon && (
                  <span
                    className="w-11 h-11 flex items-center justify-center shrink-0 mb-1.5 transition-transform duration-200"
                    style={{
                      color: isActive && item.color ? item.color : "currentColor",
                    }}
                  >
                    <Icon className="w-10 h-10 shrink-0" />
                  </span>
                )}

                {/* Tool Name — Clear & Legible */}
                <span className="text-xs font-semibold tracking-tight truncate max-w-full px-1">
                  {item.name}
                </span>

                {/* Active apex indicator pip */}
                {isActive && (
                  <span
                    className="absolute -top-2 w-3 h-3 rounded-full shadow-md"
                    style={{
                      backgroundColor: item.color || "#fff",
                      boxShadow: `0 0 12px ${item.color || "#fff"}`,
                    }}
                    aria-hidden="true"
                  />
                )}
              </m.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ToolOrbit;
