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

  return (
    <nav className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-zinc-900/90 backdrop-blur-md p-2 rounded-r-lg border-r border-zinc-800 shadow-xl">
        <div className="flex flex-col gap-4">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            const isActive = activeIndex === index;
            const isHovered = hoverIndex === index;

            return (
              <motion.a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className="relative flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white transition font-medium rounded-lg overflow-hidden"
                animate={{ width: isHovered ? 150 : 50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-bg"
                    className="absolute inset-0 bg-purple-500/20 rounded-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}

                <Icon className="text-lg flex-shrink-0" />
                <motion.span
                  className="text-sm whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
