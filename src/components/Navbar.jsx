import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaTools,
  FaProjectDiagram,
  FaEnvelope,
  FaBlog,
} from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home", icon: FaHome },
  { name: "Skills", href: "#skills", icon: FaTools },
  { name: "Projects", href: "#projects", icon: FaProjectDiagram },
  { name: "Blog", href: "#blog", icon: FaBlog },
  { name: "Contact", href: "#contact", icon: FaEnvelope },
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeLink = navLinks.find(link => link.href === '#' + entry.target.id);
          if (activeLink) {
            setActiveTab(activeLink.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e, href, name) => {
    e.preventDefault();
    setActiveTab(name);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="flex items-center gap-2 sm:gap-4 px-3 py-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg shadow-black/50">
        {navLinks.map((link) => {
          const isActive = activeTab === link.name;
          const isHovering = isHovered === link.name;

          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleClick(e, link.href, link.name)}
              onMouseEnter={() => setIsHovered(link.name)}
              onMouseLeave={() => setIsHovered(null)}
              className="relative flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              style={{
                color: isActive || isHovering ? "#ffffff" : "#9ca3af",
              }}
            >
              {(isActive || isHovering) && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                <link.icon className={`text-lg transition-transform duration-200 ${isActive || isHovering ? "scale-110" : "scale-100"}`} />
                <span className={`hidden sm:inline transition-opacity duration-200 ${isActive || isHovering ? "opacity-100" : "opacity-70"}`}>
                  {link.name}
                </span>
              </span>

              {isActive && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute -bottom-1 w-1 h-1 bg-white rounded-full sm:hidden"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;