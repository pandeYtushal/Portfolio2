import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cinematic fake loading sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait half a second at 100% for dramatic effect before revealing
          setTimeout(onComplete, 500);
          return 100;
        }
        // Jump by random intervals to feel like actual asset loading
        return prev + Math.floor(Math.random() * 15) + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-app-text-primary text-app-bg"
    >
      {/* Percentage Counter */}
      <div className="text-6xl sm:text-8xl md:text-[12rem] font-bold tracking-tighter tabular-nums overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {Math.min(progress, 100)}%
        </motion.div>
      </div>

      {/* Footer metadata */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 text-xs sm:text-sm font-bold uppercase tracking-widest"
      >
        Tushal &copy;
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 text-xs sm:text-sm font-bold uppercase tracking-widest"
      >
        Portfolio 2026
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
