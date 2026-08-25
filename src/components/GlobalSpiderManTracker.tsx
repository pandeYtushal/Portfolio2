import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";

export const GlobalSpiderManTracker: React.FC = () => {
  const headRef = useRef<SVGGElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Motion Values for Dragging Spider-Man
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const [isDragging, setIsDragging] = useState(false);
  const [headRotation, setHeadRotation] = useState(0);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [webSway, setWebSway] = useState(0);

  const prevMouseX = useRef(0);

  // Automatic eye blinking every 3.6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  // Real-time cursor tracking across the entire window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - prevMouseX.current;
      prevMouseX.current = e.clientX;
      setWebSway((prev) => Math.max(-12, Math.min(12, prev * 0.85 + deltaX * 0.1)));

      if (isDragging || !headRef.current) return;
      const rect = headRef.current.getBoundingClientRect();
      const headCenterX = rect.left + rect.width / 2;
      const headCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - headCenterX;
      const dy = e.clientY - headCenterY;
      const dist = Math.hypot(dx, dy);

      const rad = Math.atan2(dy, dx);
      let deg = (rad * 180) / Math.PI;

      let relativeAngle = deg - 90;
      while (relativeAngle > 180) relativeAngle -= 360;
      while (relativeAngle < -180) relativeAngle += 360;

      const clampedRotation = Math.max(-55, Math.min(55, relativeAngle * 0.72));
      setHeadRotation(clampedRotation);

      const maxOffset = 9;
      const offsetX = dist > 0 ? (dx / dist) * Math.min(maxOffset, dist * 0.025) : 0;
      const offsetY = dist > 0 ? (dy / dist) * Math.min(maxOffset, dist * 0.025) : 0;
      setEyeOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDragging]);

  return (
    <div className="fixed top-[54px] right-4 sm:right-8 md:right-12 z-[90] pointer-events-none select-none">
      <div className="relative w-28 sm:w-36 md:w-40 h-auto pointer-events-none">
        {/* DRAGGABLE SPIDER-MAN + WEB LINE IN SINGLE SYNCHRONIZED SVG */}
        <motion.div
          drag
          dragSnapToOrigin={true}
          dragElastic={0.25}
          dragConstraints={{
            top: 0,
            bottom: typeof window !== "undefined" ? window.innerHeight - 250 : 600,
            left: -180,
            right: 180,
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          style={{
            x: dragX,
            y: dragY,
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 1.15, rotate: [-5, 5, -5] }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 18,
            mass: 0.7,
          }}
          className="relative w-full h-auto cursor-grab active:cursor-grabbing pointer-events-auto filter drop-shadow-[0_0_10px_rgba(255,59,86,0.3)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
        >
          <svg className="w-full h-full overflow-visible" viewBox="0 0 220 200" fill="none">
            <defs>
              <radialGradient id="classic-red-grad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FF4766" />
                <stop offset="70%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#DC2626" />
              </radialGradient>
              <radialGradient id="classic-eye-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F1F5F9" />
              </radialGradient>
            </defs>

            {/* 1. HANGING WEB LINE (Drawn behind Spider-Man from top ceiling edge y=-600 down into feet at y=10) */}
            <path
              d={`M 110 -600 Q ${110 + webSway * 1.2} -200, ${110 + webSway} 10`}
              stroke="#000000"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d={`M 110 -600 Q ${110 + webSway * 1.2} -200, ${110 + webSway} 10`}
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* 2. SPIDER-MAN CHARACTER (Feet rendered ON TOP of web line to hide top endpoint 100%) */}
            <g transform={`translate(${webSway}, 0)`}>
              {/* SUIT BODY */}
              <g id="classic-spidey-body">
                <ellipse cx="110" cy="24" rx="34" ry="22" fill="#000000" />
                <path d="M 78 12 C 72 26, 74 38, 86 44 C 92 48, 98 48, 104 48 C 98 34, 90 20, 78 12 Z" fill="#1D4ED8" stroke="#000000" strokeWidth="3.5" />
                <path d="M 142 12 C 148 26, 146 38, 134 44 C 128 48, 122 48, 116 48 C 122 34, 130 20, 142 12 Z" fill="#1D4ED8" stroke="#000000" strokeWidth="3.5" />
                <path d="M 84 12 C 82 26, 84 40, 94 46 C 100 50, 116 50, 122 46 C 130 40, 132 26, 130 12 Z" fill="url(#classic-red-grad)" stroke="#000000" strokeWidth="3.5" />
                
                {/* Clean web pattern lines strictly contained inside chest (No lines poking out below!) */}
                <g stroke="#000000" strokeWidth="2" opacity="0.9" fill="none">
                  <path d="M 110 12 L 110 32" />
                  <path d="M 110 22 L 92 14" />
                  <path d="M 110 22 L 128 14" />
                  <path d="M 110 22 L 94 30" />
                  <path d="M 110 22 L 126 30" />
                </g>

                {/* RED FEET / BOOTS DRAWN ON TOP SO THEY COVER & HIDE THE ROPE ENDPOINT 100% */}
                <path d="M 86 12 C 86 0, 100 -6, 110 -2 C 120 -6, 134 0, 134 12 Z" fill="#EF4444" stroke="#000000" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 94 8 Q 110 0 126 8" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </g>

              {/* MASK HEAD */}
              <g
                ref={headRef}
                id="classic-spidey-head"
                style={{
                  transformOrigin: "110px 48px",
                  transform: `rotate(${isDragging ? 15 : headRotation}deg)`,
                  transition: "transform 0.08s cubic-bezier(0.1, 0.9, 0.2, 1)"
                }}
              >
                <rect x="103" y="40" width="14" height="10" fill="#EF4444" stroke="#000000" strokeWidth="3" />
                <ellipse cx="110" cy="88" rx="45" ry="39" fill="url(#classic-red-grad)" stroke="#000000" strokeWidth="5" />

                <g stroke="#000000" strokeWidth="2" opacity="0.9" fill="none">
                  <path d="M 110 49 L 110 127" />
                  <path d="M 110 88 L 66 72" />
                  <path d="M 110 88 L 154 72" />
                  <path d="M 110 88 L 68 106" />
                  <path d="M 110 88 L 152 106" />
                  <path d="M 110 88 L 84 123" />
                  <path d="M 110 88 L 136 123" />
                  <path d="M 88 70 Q 110 78 132 70" />
                  <path d="M 76 92 Q 110 101 144 92" />
                  <path d="M 84 112 Q 110 121 136 112" />
                </g>

                <g
                  id="classic-spidey-eyes"
                  style={{
                    transform: `scaleY(${isBlinking ? 0.08 : 1})`,
                    transformOrigin: "110px 88px",
                    transition: "transform 0.12s ease-out",
                  }}
                >
                  <g style={{ transform: `translate(${isDragging ? 0 : eyeOffset.x * 0.75}px, ${isDragging ? -2 : eyeOffset.y * 0.75}px)` }}>
                    <path
                      d="M 78 76 C 75 97, 95 106, 104 96 C 105 84, 97 72, 78 76 Z"
                      fill="url(#classic-eye-grad)"
                      stroke="#000000"
                      strokeWidth="4.5"
                      strokeLinejoin="round"
                    />
                  </g>
                  <g style={{ transform: `translate(${isDragging ? 0 : eyeOffset.x * 0.75}px, ${isDragging ? -2 : eyeOffset.y * 0.75}px)` }}>
                    <path
                      d="M 142 76 C 145 97, 125 106, 116 96 C 115 84, 123 72, 142 76 Z"
                      fill="url(#classic-eye-grad)"
                      stroke="#000000"
                      strokeWidth="4.5"
                      strokeLinejoin="round"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default GlobalSpiderManTracker;
