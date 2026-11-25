import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion, useScroll } from "motion/react";
import { springs, stagger } from "../motion.theme";
import { useLenis } from "../hooks/useLenis";

const links = [
  { label: "Work", href: "#projects" },
  { label: "Tools", href: "#tools" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    const ids = ["home", "projects", "tools", "experience", "about", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -40%" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menu);
    return () => document.body.classList.remove("menu-open");
  }, [menu]);

  const close = () => setMenu(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    close();
    document.body.classList.remove("menu-open");
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        if (lenis) {
          // Lenis automatically respects and subtracts targetStyle.scrollMarginTop (72px)
          lenis.scrollTo(target as HTMLElement, { offset: 0 });
        } else {
          const navOffset = window.innerWidth <= 768 ? -60 : -72;
          const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY + navOffset;
          window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
        }
        window.history.pushState(null, "", href);
      }
    }
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    close();
    document.body.classList.remove("menu-open");
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }
    window.history.pushState(null, "", "/#home");
  };

  return (
    <>
      <m.div className="page-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <header className="nav-wrap">
        <nav className="nav-pill" aria-label="Main navigation">
          <a className="nav-brand hidden md:inline-block" href="/#home" onClick={handleBrandClick}>
            TA<span className="accent">.</span>
          </a>
          <div className="nav-links">
            {links.map((item) => (
              <a
                key={item.href}
                className="nav-link"
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-current={active === item.href.slice(1) ? "location" : undefined}
              >
                {item.label}
                {active === item.href.slice(1) && (
                  <m.span layoutId="nav-active" className="nav-indicator" transition={springs.ui} />
                )}
              </a>
            ))}
          </div>
          <button
            className="menu-toggle"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <span className="menu-label">{menu ? "CLOSE" : "MENU"}</span>
            <i />
            <i />
          </button>
        </nav>
      </header>
      <AnimatePresence>
        {menu && (
          <m.div
            className="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mobile-menu-top">
              <span>TUSHAL ANAND</span>
              <button onClick={close}>CLOSE ×</button>
            </div>
            <div className="mobile-menu-links">
              {links.map((item, i) => (
                <m.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={reduce ? false : { y: 24, opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...springs.ui, delay: i * stagger }}
                >
                  {item.label}
                  <span>↗</span>
                </m.a>
              ))}
            </div>
            <p>SOFTWARE ENGINEER · INDIA</p>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
