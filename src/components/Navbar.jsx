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
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-3">
      <div className="bg-zinc-900/90 backdrop-blur-md px-3 py-2 rounded-full border border-zinc-800 shadow-xl max-w-full overflow-x-auto">
        <div className="relative flex gap-4 sm:gap-6 md:gap-8 whitespace-nowrap">
          {navLinks.map((link, index) => (
            <a key={link.name}href={link.href} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(index)}className="relative px-2 py-1 text-xs sm:text-sm md:text-base text-gray-300 hover:text-white font-medium">
              {activeIndex === index && (
                <motion.span
                  layoutId="nav-arc"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 h-8 w-12 rounded-b-full bg-purple-500 blur-md"
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
