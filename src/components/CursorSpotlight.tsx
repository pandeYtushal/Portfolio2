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

    if (window.getComputedStyle(parent).position === "static")
      parent.style.position = "relative";

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      mouseX.set(e.clientX - r.left);
      mouseY.set(e.clientY - r.top);
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const r = parent.getBoundingClientRect();
      mouseX.set(e.touches[0].clientX - r.left);
      mouseY.set(e.touches[0].clientY - r.top);
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("touchmove", onTouch);
    };
  }, [mouseX, mouseY, shouldReduce]);

  if (shouldReduce) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.12] dark:opacity-[0.45]"
        style={{
          background: `radial-gradient(450px circle at ${springX}px ${springY}px, rgba(249, 115, 22, 1), transparent 70%)`,
        }}
      />
    </div>
  );
};

export default CursorSpotlight;
