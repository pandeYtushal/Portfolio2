import type { Transition, Variants } from "framer-motion";

export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const spring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 18,
};

export const springTight: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const durations = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
} as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: durations.base, ease: easeOut },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: easeOut },
  },
};

export const fadeUpSpring: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
};

export const fadeUpSubtle: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.fast, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.base, ease: easeOut },
  },
};

export const staggerContainer = (
  delay = 0.05,
  delayChildren = 0,
): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: delay,
      delayChildren,
    },
  },
});
