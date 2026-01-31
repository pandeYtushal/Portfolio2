import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaTools,
  FaTrophy,
  FaProjectDiagram,
  FaEnvelope,
  FaBlog,
} from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home", icon: FaHome },
  { name: "Skills", href: "#skills", icon: FaTools },
  { name: "Achievements", href: "#achievements", icon: FaTrophy },
  { name: "Projects", href: "#projects", icon: FaProjectDiagram },
  { name: "Contact", href: "#contact", icon: FaEnvelope },
  { name: "Blog", href: "#blog", icon: FaBlog },
];

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector(link.href)).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const index = navLinks.findIndex(
            (link) => link.href === `#${visible.target.id}`);
          if (index !== -1) setActiveIndex(index);}},
      { threshold: 0.6 });
 sections.forEach((section) =>
    observerRef.current.observe(section));

    return () => {
      if (observerRef.current) observerRef.current.disconnect(); };}, []);

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-3">
      <div
        className="relative flex gap-6 bg-zinc-900/90 backdrop-blur-md
                   px-6 py-3 md:px-8 md:py-3
                   rounded-full border border-zinc-800 shadow-xl">
        {navLinks.map((link, index) => {
          const Icon = link.icon;

          return (
            <a key={link.name}href={link.href}aria-label={link.name}aria-current={activeIndex === index ? "page" : undefined}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => setHoverIndex(index)}
              onBlur={() => setHoverIndex(null)}className="relative flex flex-col items-center text-gray-400 hover:text-white transition outline-none">
              {/* ACTIVE GLOW */}
              {activeIndex === index && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute -top-4 left-1/2-translate-x-1/2 h-10 w-10 rounded-full bg-orange-500 blur-xl"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}

              {/* HOVER GLOW */}
              <motion.span className="absolute -top-3 left-1/2-translate-x-1/2 h-8 w-8 rounded-full bg-red-400/30 blur-lg"
                initial={{ opacity: 0 }}
                animate={{
                  opacity:
                    hoverIndex === index &&
                    activeIndex !== index
                      ? 1
                      : 0,}}transition={{ duration: 0.2 }}/>

              {/* ICON */}
              <Icon className="relative text-lg md:text-xl" />

              {/* LABEL (desktop only) */}
              <span className="hidden md:block mt-1 text-[11px]">
                {link.name}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
