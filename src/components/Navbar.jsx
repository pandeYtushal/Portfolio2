import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaTools,
  FaTrophy,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home", icon: FaHome },
  { name: "Skills", href: "#skills", icon: FaTools },
  { name: "Achievements", href: "#achievements", icon: FaTrophy },
  { name: "Projects", href: "#projects", icon: FaProjectDiagram },
  { name: "Contact", href: "#contact", icon: FaEnvelope },
];

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = navLinks.findIndex(
              (link) => link.href === `#${entry.target.id}`
            );
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) =>
      observerRef.current.observe(section)
    );

    return () => observerRef.current.disconnect();
  }, []);

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-3">
      <div className="bg-zinc-900/90 backdrop-blur-md px-3 py-2 rounded-full border border-zinc-800 shadow-xl">
        <div className="relative flex gap-4 sm:gap-6 md:gap-8 whitespace-nowrap">
          {navLinks.map((link, index) => {
            const Icon = link.icon;

            return (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className="relative flex items-center justify-center px-2 py-1
                           text-gray-300 hover:text-white transition font-medium"
              >
                {/* ACTIVE glow */}
                {activeIndex === index && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -top-3 left-1/2 -translate-x-1/2
                               h-8 w-12 rounded-b-full bg-purple-500 blur-md"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}

                {/* HOVER glow (animated opacity for smooth in/out) */}
                <motion.span
                  className="absolute -top-2 left-1/2 -translate-x-1/2
                             h-5 w-8 rounded-b-full bg-purple-400/40 blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoverIndex === index && activeIndex !== index ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />

                {/* Icon (mobile) */}
                <Icon className="text-lg sm:hidden" />

                {/* Text (desktop) */}
                <span className="hidden sm:block text-sm md:text-base">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
