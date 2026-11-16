import { useEffect, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { useLenis } from "../hooks/useLenis";
import { springs } from "../motion.theme";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();
  const reduce = useReducedMotion();
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 640);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  const top = () => {
    if (lenis) lenis.scrollTo(0, { duration: reduce ? 0 : .45 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  return <m.button className="back-to-top" type="button" aria-label="Back to top" onClick={top} initial={false} animate={visible ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: 12, pointerEvents: "none" }} transition={springs.ui}><span>TOP</span><i>↑</i></m.button>;
}
