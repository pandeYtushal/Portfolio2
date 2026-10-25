import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

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

  // --- Scroll & Drag Physics Engine ---
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { damping: 40, stiffness: 200, mass: 0.5 });
  
  // Y Translation: Drops down when scrolling fast down, pulls up slightly when scrolling up
  const spideyY = useTransform(smoothVelocity, [-2000, 0, 2000], [-40, 0, 250]);
  
  // Arm Rotations (Flaring arms out when falling or when dragged under tension)
  const armLeftRotate = useTransform(smoothVelocity, [0, 1500], [0, 35]);
  const armRightRotate = useTransform(smoothVelocity, [0, 1500], [0, -35]);
  const dragArmLeft = useTransform(dragY, [0, 450], [0, 26]);
  const dragArmRight = useTransform(dragY, [0, 450], [0, -26]);
  const finalArmLeft = useTransform([armLeftRotate, dragArmLeft], ([vel, drag]: number[]) => vel + drag);
  const finalArmRight = useTransform([armRightRotate, dragArmRight], ([vel, drag]: number[]) => vel + drag);

  // Eye Widen (Panic & tension eyes when falling fast or dragged hard)
  const eyeFallScale = useTransform(smoothVelocity, [0, 1500], [1, 1.5]);
  const dragEyeScale = useTransform(dragY, [0, 500], [1, 1.25]);
  const finalEyeScale = useTransform([eyeFallScale, dragEyeScale], ([vel, drag]: number[]) => Math.max(vel, drag));

  // --- Infinite Anchored Tension Web ---
  // Rope reaches -6000px up into the sky so it never ends no matter how far he is dragged.
  // The ceiling anchor counter-translates dragX so the top of the rope remains firmly pinned to the sky.
  const webPath = useTransform([dragX, spideyY], ([x, y]: number[]) => {
    const anchorX = 110 - x;
    const handY = 12 + y;
    const midX = 110 - x * 0.35 + webSway * 1.2;
    const midY = -2000 + y * 0.4;
    return `M ${anchorX} -6000 Q ${midX} ${midY}, ${110 + webSway} ${handY}`;
  });

  // Physical Rope Tension Effects (Line thins slightly under high tension)
  const webCoreWidth = useTransform(dragY, [0, 600], [2.6, 1.6]);
  const webOuterWidth = useTransform(dragY, [0, 600], [5.2, 3.4]);
  const webTensionGlow = useTransform(dragY, [0, 500], [0.85, 1]);

  // Automatic eye blinking every 3.6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  // Real-time cursor & touch tracking across the entire window
  useEffect(() => {
    let animId: number | null = null;

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (animId) return;

      animId = window.requestAnimationFrame(() => {
        animId = null;
        const deltaX = clientX - prevMouseX.current;
        prevMouseX.current = clientX;
        setWebSway((prev) => Math.max(-14, Math.min(14, prev * 0.85 + deltaX * 0.12)));

        if (isDragging || !headRef.current) return;
        const rect = headRef.current.getBoundingClientRect();
        const headCenterX = rect.left + rect.width / 2;
        const headCenterY = rect.top + rect.height / 2;

        const dx = clientX - headCenterX;
        const dy = clientY - headCenterY;
        const dist = Math.hypot(dx, dy);

        const rad = Math.atan2(dy, dx);
        const deg = (rad * 180) / Math.PI;

        let relativeAngle = deg - 90;
        while (relativeAngle > 180) relativeAngle -= 360;
        while (relativeAngle < -180) relativeAngle += 360;

        const clampedRotation = Math.max(-55, Math.min(55, relativeAngle * 0.75));
        setHeadRotation(clampedRotation);

        const maxOffset = 9;
        const offsetX = dist > 0 ? (dx / dist) * Math.min(maxOffset, dist * 0.028) : 0;
        const offsetY = dist > 0 ? (dy / dist) * Math.min(maxOffset, dist * 0.028) : 0;
        setEyeOffset({ x: offsetX, y: offsetY });
      });
    };

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      if (animId) window.cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isDragging]);

  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolledPastHero(window.scrollY > 380);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (shouldReduceMotion || !hasScrolledPastHero) return null;

  return (
    <div className="fixed top-14 sm:top-[54px] right-2 sm:right-6 md:right-12 z-[90] pointer-events-none select-none">
      <div className="relative w-20 sm:w-28 md:w-40 lg:w-44 h-auto pointer-events-none">
        {/* DRAGGABLE HIGH-DEFINITION SPIDER-MAN */}
        <motion.div
          drag
          dragSnapToOrigin={true}
          dragElastic={0.42}
          dragConstraints={{
            top: 0,
            bottom: typeof window !== "undefined" ? window.innerHeight - 80 : 800,
            left: -220,
            right: 80,
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          style={{ x: dragX, y: dragY }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 1.12, rotate: [-4, 4, -4] }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 14,
            mass: 0.6,
          }}
          className="relative w-full h-auto cursor-grab active:cursor-grabbing pointer-events-auto filter drop-shadow-[0_4px_16px_rgba(230,0,38,0.35)] drop-shadow-[0_16px_36px_rgba(0,0,0,0.6)]"
        >
          <svg className="w-full h-full overflow-visible" viewBox="0 0 220 210" fill="none">
            <defs>
              <radialGradient id="spidey-red-grad" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FF3B5C" />
                <stop offset="60%" stopColor="#E60026" />
                <stop offset="100%" stopColor="#990014" />
              </radialGradient>
              <linearGradient id="spidey-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
              <radialGradient id="spidey-eye-grad" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </radialGradient>
              <linearGradient id="web-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="90%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#F1F5F9" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* HANGING WEB LINE - INFINITE TENSION ROPE */}
            <g id="spidey-rope">
              {/* Outer structural tension shadow */}
              <motion.path
                d={webPath}
                stroke="#000000"
                style={{ strokeWidth: webOuterWidth }}
                strokeLinecap="round"
              />
              {/* Inner glowing silk thread with tension */}
              <motion.path
                d={webPath}
                stroke="url(#web-line-grad)"
                style={{ strokeWidth: webCoreWidth, opacity: webTensionGlow }}
                strokeLinecap="round"
              />
            </g>

            {/* SPIDER-MAN BODY & HEAD (Translated by scroll velocity) */}
            <motion.g style={{ y: spideyY }} transform={`translate(${webSway}, 0)`}>
              <g id="spidey-body">
                <ellipse cx="110" cy="24" rx="36" ry="24" fill="#000000" />
                
                {/* Left Arm */}
                <motion.g style={{ rotate: finalArmLeft, transformOrigin: "84px 30px" }}>
                  <path d="M 76 10 C 70 26, 72 40, 84 46 C 92 50, 98 50, 104 50 C 98 34, 88 18, 76 10 Z" fill="url(#spidey-blue-grad)" stroke="#000000" strokeWidth="3" />
                </motion.g>
                
                {/* Right Arm */}
                <motion.g style={{ rotate: finalArmRight, transformOrigin: "136px 30px" }}>
                  <path d="M 144 10 C 150 26, 148 40, 136 46 C 128 50, 122 50, 116 50 C 122 34, 132 18, 144 10 Z" fill="url(#spidey-blue-grad)" stroke="#000000" strokeWidth="3" />
                </motion.g>
                <path d="M 84 10 C 82 26, 84 42, 94 48 C 100 52, 120 52, 126 48 C 136 42, 138 26, 136 10 Z" fill="url(#spidey-red-grad)" stroke="#000000" strokeWidth="3.5" />

                <g stroke="#000000" strokeWidth="1.8" opacity="0.85" fill="none">
                  <path d="M 110 10 L 110 34" />
                  <path d="M 110 22 L 90 14" />
                  <path d="M 110 22 L 130 14" />
                  <path d="M 110 22 L 92 32" />
                  <path d="M 110 22 L 128 32" />
                </g>

                <path d="M 110 20 L 106 25 L 110 28 L 114 25 Z" fill="#000000" />
                <path d="M 106 23 C 100 21, 98 17, 96 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 114 23 C 120 21, 122 17, 124 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 106 26 C 98 27, 96 31, 94 34" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 114 26 C 122 27, 124 31, 126 34" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />

                <path d="M 84 10 C 84 -2, 98 -8, 110 -4 C 122 -8, 136 -2, 136 10 Z" fill="url(#spidey-red-grad)" stroke="#000000" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 94 8 Q 110 -2 128 6" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </g>

              <g
                ref={headRef}
                id="spidey-head"
                style={{
                  transformOrigin: "110px 50px",
                  transform: `rotate(${isDragging ? 15 : headRotation}deg)`,
                  transition: "transform 0.08s cubic-bezier(0.1, 0.9, 0.2, 1)"
                }}
              >
                <rect x="103" y="42" width="14" height="12" fill="#E60026" stroke="#000000" strokeWidth="3" />
                <ellipse cx="110" cy="90" rx="46" ry="40" fill="url(#spidey-red-grad)" stroke="#000000" strokeWidth="5" />

                <g stroke="#000000" strokeWidth="2" opacity="0.88" fill="none">
                  <path d="M 110 50 L 110 130" />
                  <path d="M 110 90 L 65 74" />
                  <path d="M 110 90 L 155 74" />
                  <path d="M 110 90 L 67 108" />
                  <path d="M 110 90 L 153 108" />
                  <path d="M 110 90 L 83 126" />
                  <path d="M 110 90 L 137 126" />
                  <path d="M 87 72 Q 110 80 133 72" />
                  <path d="M 75 94 Q 110 103 145 94" />
                  <path d="M 83 114 Q 110 123 137 114" />
                </g>

                <motion.g
                  id="spidey-eyes"
                  style={{
                    scaleY: isBlinking ? 0.08 : 1,
                    scale: finalEyeScale,
                    transformOrigin: "110px 90px",
                  }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                >
                  <g style={{ transform: `translate(${isDragging ? 0 : eyeOffset.x * 0.8}px, ${isDragging ? -2 : eyeOffset.y * 0.8}px)` }}>
                    <path
                      d="M 76 77 C 73 99, 94 108, 104 98 C 105 85, 96 73, 76 77 Z"
                      fill="url(#spidey-eye-grad)"
                      stroke="#000000"
                      strokeWidth="5"
                      strokeLinejoin="round"
                    />
                  </g>

                  <g style={{ transform: `translate(${isDragging ? 0 : eyeOffset.x * 0.8}px, ${isDragging ? -2 : eyeOffset.y * 0.8}px)` }}>
                    <path
                      d="M 144 77 C 147 99, 126 108, 116 98 C 115 85, 124 73, 144 77 Z"
                      fill="url(#spidey-eye-grad)"
                      stroke="#000000"
                      strokeWidth="5"
                      strokeLinejoin="round"
                    />
                  </g>
                </motion.g>
              </g>
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default GlobalSpiderManTracker;
