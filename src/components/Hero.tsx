import { m, useReducedMotion } from "motion/react";
import { springs, stagger } from "../motion.theme";
import { useLenis } from "../hooks/useLenis";
import { Button, Typography } from "@cred/neopop-web/lib/components";
import { fontNameSpaces } from "@cred/neopop-web/lib/primitives";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const navigate = useNavigate();

  const handleScrollToProjects = () => {
    const target = document.querySelector("#projects");
    if (target) {
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: 0 });
      } else {
        const navOffset = window.innerWidth <= 768 ? -60 : -72;
        const top =
          (target as HTMLElement).getBoundingClientRect().top +
          window.scrollY +
          navOffset;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      }
    }
  };

  return (
    <section id="home" className="hero section-wrap" aria-labelledby="hero-title">
      {/* Background Chromatic Motion Artwork */}
      <div className="hero-bg-media" aria-hidden="true">
        <img
          src="/hero-cat.jpg"
          alt=""
          className="hero-bg-img"
        />
        <div className="hero-bg-overlay" />
      </div>

      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-axis" aria-hidden="true" />

      <div className="hero-content">
        <div className="eyebrow flex items-center gap-2 flex-wrap">
          <span className="live-dot shrink-0" />
          <Typography {...fontNameSpaces.tc10b} color="#9e9e9b">
            AVAILABLE FOR SELECT PROJECTS <span className="opacity-40">INDIA · IST</span>
          </Typography>
        </div>

        <h1 id="hero-title" className="hero-name" aria-label="Tushal Anand">
          <span className="name-line">
            <m.span
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ ...springs.ui, delay: stagger }}
            >
              Tushal
            </m.span>
          </span>
          <span className="name-line">
            <m.span
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ ...springs.ui, delay: stagger * 2 }}
            >
              Anand<span className="accent">.</span>
            </m.span>
          </span>
        </h1>

        <div className="hero-intro">
          <Typography
            {...fontNameSpaces.tb14m}
            color="#b2b2ad"
            style={{ maxWidth: "48ch", lineHeight: 1.6, marginBottom: "1.35rem" }}
          >
            I’m Tushal, a software engineer building thoughtful web and desktop products, from the first interface to the systems behind it.
          </Typography>

          <div className="hero-actions flex items-center gap-3 sm:gap-4 flex-wrap">
            <Button
              variant="primary"
              kind="elevated"
              size="medium"
              colorMode="dark"
              onClick={handleScrollToProjects}
            >
              View work ↘
            </Button>
            <Button
              variant="secondary"
              kind="elevated"
              size="medium"
              colorMode="dark"
              onClick={() => navigate("/resume")}
            >
              Resume ↗
            </Button>
          </div>
        </div>
      </div>

      <div className="hero-index">
        <Typography {...fontNameSpaces.tc10b} color="#64645f">
          SOFTWARE ENGINEER
        </Typography>
        <Typography {...fontNameSpaces.tc10b} color="#64645f">
          SCROLL TO EXPLORE ↓
        </Typography>
      </div>
    </section>
  );
}
