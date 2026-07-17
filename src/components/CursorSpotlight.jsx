import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export const CursorSpotlight = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduce = useReducedMotion();

  const springX = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 24 });

  useEffect(() => {
    if (shouldReduce) return;

    // Find the relative parent element to attach mouse move listeners
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    // Ensure the parent is positioned relative so spotlight displays correctly
    const computedStyle = window.getComputedStyle(parent);
    if (computedStyle.position === "static") {
      parent.style.position = "relative";
    }

    const handleMouseMove = (e) => {
      const rect = parent.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const rect = parent.getBoundingClientRect();
      const touch = e.touches[0];
      mouseX.set(touch.clientX - rect.left);
      mouseY.set(touch.clientY - rect.top);
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mouseX, mouseY, shouldReduce]);

  if (shouldReduce) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Light glow (standard) */}
      <motion.div
        className="absolute inset-0 opacity-40 dark:opacity-50"
        style={{
          background: `radial-gradient(350px circle at ${springX}px ${springY}px, rgba(220,220,220,0.15), transparent 80%)`,
        }}
      />
      {/* Light glow (dark-mode accent) */}
      <motion.div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: `radial-gradient(280px circle at ${springX}px ${springY}px, rgba(255,255,255,0.05), transparent 85%)`,
        }}
      />
    </div>
  );
};

export default CursorSpotlight;
