import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#projects" },
  { label: "Profile", href: "#about" },
  { label: "Tech", href: "#skills" },
  { label: "Blog", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

/* ─────────────────────────────────────────────────
   MAGNETIC WRAPPER
───────────────────────────────────────────────── */
const MagneticItem = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
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
      style={{ x: springX, y: springY }}
      className="cursor-pointer p-4 -m-4"
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────
   FULLSCREEN OVERLAY MENU
───────────────────────────────────────────────── */
const MenuOverlay = ({ isOpen, close }: { isOpen: boolean; close: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: "circle(0% at 100% 0%)" }}
          animate={{ clipPath: "circle(150% at 100% 0%)" }}
          exit={{ clipPath: "circle(0% at 100% 0%)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[120] bg-app-text-primary text-app-bg overflow-y-auto overscroll-contain"
          data-lenis-prevent="true"
        >
          <div className="min-h-full grid grid-rows-[auto_1fr_auto] px-6 sm:px-16">
            {/* Close Button in Overlay */}
            <div className="flex justify-end pt-8 sm:pt-12 pb-4">
              <MagneticItem>
                <button
                  onClick={close}
                  className="text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                  Close
                </button>
              </MagneticItem>
            </div>

            {/* Links Container */}
            <div className="flex flex-col gap-4 sm:gap-6 max-w-6xl mx-auto w-full self-center py-8">
              {NAV_ITEMS.map((item, i) => (
                <div key={item.label} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      close();
                      setTimeout(() => {
                        const el = document.querySelector(item.href);
                        if (el) {
                          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
                        }
                      }, 800);
                    }}
                    initial={{ y: "100%", rotateX: -90 }}
                    animate={{ y: "0%", rotateX: 0 }}
                    exit={{ y: "-100%", rotateX: 90 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 * i }}
                    className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase origin-bottom hover:text-app-bg hover:opacity-50 transition-opacity leading-none py-1 sm:py-2"
                    style={{ WebkitTextStroke: "1px var(--color-app-bg)" }}
                  >
                    {item.label}
                  </motion.a>
                </div>
              ))}
            </div>

            {/* Socials / Footer of menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-6 sm:gap-8 text-xs sm:text-sm font-bold tracking-widest uppercase pb-10 sm:pb-12 pt-4"
            >
              <a href="https://github.com/pandeYtushal" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity">GH</a>
              <a href="https://www.linkedin.com/in/tushal-anand18/" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity">IN</a>
              <a href="https://medium.com/@tushalpandey" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity">MD</a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────────────── */
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-10 py-6 sm:py-8 flex justify-between items-center pointer-events-none mix-blend-difference text-white">

        {/* Logo */}
        <div className="pointer-events-auto">
          <MagneticItem>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm font-bold uppercase tracking-widest"
            >
              Tushal &copy;
            </button>
          </MagneticItem>
        </div>

        {/* Menu Button */}
        <div className="pointer-events-auto">
          <MagneticItem>
            <button
              onClick={() => setMenuOpen(true)}
              className="text-sm font-bold uppercase tracking-widest flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-white" />
              Menu
            </button>
          </MagneticItem>
        </div>

      </header>

      <MenuOverlay isOpen={menuOpen} close={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
