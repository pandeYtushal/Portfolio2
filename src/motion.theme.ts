export const springs = {
  ui: { type: "spring" as const, stiffness: 250, damping: 28 },
  gentle: { type: "spring" as const, stiffness: 90, damping: 18 },
  snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
};
export const stagger = 0.08;
export const easing = [0.22, 1, 0.36, 1] as const;
