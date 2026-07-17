import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling via Lenis. Disabled when the user prefers reduced motion.
 */
export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // Disable smooth scrolling on touch devices or small screens to preserve fast native momentum scroll
    const isTouchOrMobile = 
      window.innerWidth < 768 || 
      "ontouchstart" in window || 
      navigator.maxTouchPoints > 0;
    if (isTouchOrMobile) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}
