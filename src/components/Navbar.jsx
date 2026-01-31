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
      { threshold: 0.6 }
    );

    sections.forEach((section) => observerRef.current.observe(section));
    return () => observerRef.current.disconnect();
  }, []);

  const radius = 60; // Adjust for circle size
  const angleStep = 360 / navLinks.length;

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="relative w-32 h-32 bg-zinc-900/90 backdrop-blur-md rounded-full border border-zinc-800 shadow-xl flex items-center justify-center">
        {navLinks.map((link, index) => {
          const Icon = link.icon;
          const angle = index * angleStep;
          const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
          const y = radius * Math.sin((angle - 90) * (Math.PI / 180));
          const isActive = activeIndex === index;
          const isHovered = hoverIndex === index;

          return (
            <motion.a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="absolute flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white transition"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
              animate={{
                rotate: isActive || isHovered ? 360 : 0,
                scale: isActive || isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="text-lg" />
            </motion.a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
