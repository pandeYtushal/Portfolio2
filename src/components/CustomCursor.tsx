import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const shouldReduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const spring = { stiffness: 400, damping: 28, mass: 0.1 };
  const cursorX = useSpring(mouseX, spring);
  const cursorY = useSpring(mouseY, spring);

  const [finePointer, setFinePointer] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (shouldReduce || !finePointer) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setHovered(
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        !!t.closest("a") ||
        !!t.closest("button") ||
        !!t.closest('[role="button"]') ||
        t.classList.contains("cursor-pointer")
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY, shouldReduce, finePointer]);

  if (shouldReduce || !finePointer) return null;

  return (
    <motion.div
      style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hovered ? 80 : 16,
        height: hovered ? 80 : 16,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full hidden md:block bg-white mix-blend-difference"
    />
  );
};

export default CustomCursor;
