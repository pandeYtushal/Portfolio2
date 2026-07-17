import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export const CursorSpotlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduce = useReducedMotion();

  const springX = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 24 });

  useEffect(() => {
    if (shouldReduce) return () => {};

    const parent = containerRef.current?.parentElement;
    if (!parent) return () => {};

    const computedStyle = window.getComputedStyle(parent);
    if (computedStyle.position === "static") {
      parent.style.position = "relative";
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleTouchMove = (e: TouchEvent) => {
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
      <motion.div
        className="absolute inset-0 opacity-40 dark:opacity-50"
        style={{
          background: `radial-gradient(400px circle at ${springX}px ${springY}px, rgba(255, 138, 0, 0.08), transparent 80%)`,
        }}
      />
      <motion.div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: `radial-gradient(300px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.02), transparent 85%)`,
        }}
      />
    </div>
  );
};

export default CursorSpotlight;
