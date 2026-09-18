import { useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";

const MagneticButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.4); // 0.4 determines the pull strength
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className="relative group cursor-pointer inline-block"
    >
      {children}
    </motion.div>
  );
};

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("tushalanand4@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // fail silently
    }
  }, []);

  return (
    <section
      id="contact"
      className="py-16 md:py-32 bg-app-bg relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 flex flex-col items-center text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col items-center gap-8 w-full"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-app-border/40 bg-app-surface/50 backdrop-blur-sm text-xs font-medium text-app-text-secondary uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for selected missions
          </div>

          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-app-text-primary leading-[0.85] uppercase text-center mt-6">
            Let's Talk.
          </h2>

          <div className="mt-16 sm:mt-24">
            <MagneticButton onClick={copyEmail}>
              <div className="absolute -inset-2 bg-gradient-to-r from-app-border/20 via-app-text-primary/10 to-app-border/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative flex items-center gap-4 sm:gap-6 bg-app-surface border border-app-border/40 px-6 sm:px-10 py-4 sm:py-6 rounded-full hover:bg-app-text-primary hover:text-app-bg transition-colors duration-500 group-hover:border-transparent max-w-[90vw] overflow-hidden">
                <span className="text-lg sm:text-3xl md:text-4xl font-bold tracking-tight truncate">
                  tushalanand4@gmail.com
                </span>
                <div className="flex items-center justify-center bg-app-bg/50 group-hover:bg-app-bg/10 rounded-full p-[clamp(0.5rem,1.5vw,1rem)] transition-colors shrink-0">
                  {copied ? <Check className="w-[clamp(1.2rem,2vw,1.5rem)] h-[clamp(1.2rem,2vw,1.5rem)]" /> : <ArrowUpRight className="w-[clamp(1.2rem,2vw,1.5rem)] h-[clamp(1.2rem,2vw,1.5rem)]" />}
                </div>
              </div>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold uppercase tracking-widest text-app-text-secondary whitespace-nowrap pointer-events-none">
                {copied ? "Copied to clipboard" : "Click to copy address"}
              </div>
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-16 md:mt-32 flex items-center justify-center gap-6 md:gap-8 w-full border-t border-app-border/20 pt-10 md:pt-16"
        >
          <a
            href="https://github.com/pandeYtushal"
            target="_blank"
            rel="noreferrer"
            className="text-app-text-secondary hover:text-app-text-primary transition-colors p-4"
          >
            <FaGithub className="w-8 h-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/tushal-anand18/"
            target="_blank"
            rel="noreferrer"
            className="text-app-text-secondary hover:text-app-text-primary transition-colors p-4"
          >
            <FaLinkedin className="w-8 h-8" />
          </a>
          <a
            href="https://medium.com/@tushalpandey"
            target="_blank"
            rel="noreferrer"
            className="text-app-text-secondary hover:text-app-text-primary transition-colors p-4"
          >
            <FaMedium className="w-8 h-8" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
