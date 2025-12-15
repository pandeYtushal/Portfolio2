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
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-3">
      <div className="bg-zinc-900/90 backdrop-blur-md px-3 py-2 rounded-full border border-zinc-800 shadow-xl max-w-full overflow-x-auto">
        <div className="relative flex gap-4 sm:gap-6 md:gap-8 whitespace-nowrap">
          {navLinks.map((link, index) => {
            const Icon = link.icon;

            return (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(index)}
                className="relative flex items-center justify-center px-2 py-1
                           text-gray-300 hover:text-white font-medium"
              >
                {/* Glow arc */}
                {activeIndex === index && (
                  <motion.span
                    layoutId="nav-arc"
                    className="absolute -top-3 left-1/2 -translate-x-1/2
                               h-8 w-12 rounded-b-full bg-purple-500 blur-md"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}

                {/* ICON → mobile */}
                <Icon className="text-lg sm:hidden" />

                {/* TEXT → tablet & desktop */}
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
