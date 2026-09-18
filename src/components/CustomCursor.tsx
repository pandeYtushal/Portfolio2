import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";

export const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const shouldReduce = useReducedMotion();
  const [hoverState, setHoverState] = useState<"default" | "link" | "project">("default");

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
      
      const projectHover = t.closest('[data-cursor="view"]');
      if (projectHover) {
        setHoverState("project");
        return;
      }

      const isLink = 
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        !!t.closest("a") ||
        !!t.closest("button") ||
        !!t.closest('[role="button"]') ||
        t.classList.contains("cursor-pointer");

      setHoverState(isLink ? "link" : "default");
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
        width: hoverState === "project" ? 100 : hoverState === "link" ? 80 : 16,
        height: hoverState === "project" ? 100 : hoverState === "link" ? 80 : 16,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full hidden md:flex items-center justify-center bg-white ${hoverState !== "project" ? "mix-blend-difference" : ""}`}
    >
      <AnimatePresence>
        {hoverState === "project" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-black text-xs font-bold uppercase tracking-widest"
          >
            View
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomCursor;
