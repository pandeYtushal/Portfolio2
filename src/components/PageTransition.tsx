import React from "react";
import { motion, Variants } from "framer-motion";

const slideVariants: Variants = {
  initial: {
    scaleX: 1,
    transformOrigin: "left",
  },
  animate: {
    scaleX: 0,
    transformOrigin: "left",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    scaleX: 1,
    transformOrigin: "right",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={slideVariants}
        // #E2F62A or #FFD700 (yellow)
        className="fixed inset-0 z-[99999] bg-[#E2F62A] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
