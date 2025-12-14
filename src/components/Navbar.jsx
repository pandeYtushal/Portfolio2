import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Achievements", href: "#achievements" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
      <div className="bg-zinc-900/90 backdrop-blur-md px-6 py-3 rounded-full border border-zinc-800 shadow-xl">
        <div className="flex gap-8 relative">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-2 py-1 text-gray-300 hover:text-white font-medium"
            >
              
              {hoveredIndex === index && (
                <motion.span
                  layoutId="nav-arc"
                  className="absolute -top-4 left-1/2 -translate-x-1/2 h-5 w-14 rounded-b-full bg-purple-500/40 blur-lg"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}

              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
