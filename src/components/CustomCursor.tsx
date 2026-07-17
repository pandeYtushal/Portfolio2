import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const shouldReduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 350, damping: 28, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (shouldReduce) return () => {};

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer");
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, shouldReduce]);

  if (shouldReduce) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovered ? 48 : 8,
        height: isHovered ? 48 : 8,
        backgroundColor: isHovered ? "rgba(255, 138, 0, 0.12)" : "rgb(255, 138, 0)",
        borderColor: isHovered ? "rgba(255, 138, 0, 0.5)" : "rgba(255, 138, 0, 0)",
        borderWidth: "1px",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block mix-blend-screen"
    />
  );
};

export default CustomCursor;
