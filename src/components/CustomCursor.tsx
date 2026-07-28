import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export const CustomCursor = () => {
  const mouseX    = useMotionValue(-100);
  const mouseY    = useMotionValue(-100);
  const shouldReduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 350, damping: 28, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [hasFinePointer, setHasFinePointer] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const onChange = () => setHasFinePointer(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (shouldReduce || !hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      setIsHovered(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        !!target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer")
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, shouldReduce, hasFinePointer]);

  if (shouldReduce || !hasFinePointer) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width:  isHovered ? 40 : 8,
        height: isHovered ? 40 : 8,
        // Use a plain rgba value — no mix-blend-screen which disappears on light backgrounds.
        // The orange dot is visible in both dark and light modes.
        backgroundColor: isHovered
          ? "rgba(249, 115, 22, 0.10)"
          : "rgba(249, 115, 22, 0.90)",
        borderColor: isHovered
          ? "rgba(249, 115, 22, 0.50)"
          : "rgba(249, 115, 22, 0.00)",
        borderWidth: "1.5px",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      // Removed mix-blend-screen — it caused the cursor to disappear on light backgrounds
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block"
    />
  );
};

export default CustomCursor;
