import { useEffect, useRef, useState } from "react";
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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isArtworkReady, setIsArtworkReady] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/hero-cat.jpg";

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const chroma = max - min;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          // 1. Chromatic iridescent trail (high color saturation)
          if (chroma >= 25) {
            d[i] = Math.min(255, Math.round(r * 1.35));
            d[i + 1] = Math.min(255, Math.round(g * 1.35));
            d[i + 2] = Math.min(255, Math.round(b * 1.35));
            d[i + 3] = 255;
          }
          // 2. Light studio background (high luminance, low chroma)
          else if (lum > 125 && chroma < 38) {
            const t = Math.min(1, Math.max(0, (lum - 125) / 50));
            d[i + 3] = Math.round(255 * (1 - t) * (chroma / 38));
            d[i] = 9;
            d[i + 1] = 9;
            d[i + 2] = 9;
          }
          // 3. Cat silhouette (low luminance, dark obsidian tone)
          else {
            d[i] = 18;
            d[i + 1] = 18;
            d[i + 2] = 24;
            d[i + 3] = 240;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setIsArtworkReady(true);
      } catch {
        // Fallback gracefully if canvas context has security restriction
        setIsArtworkReady(true);
      }
    };
  }, []);

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
    <section id="home" className="hero section-wrap relative overflow-hidden" aria-labelledby="hero-title">
      {/* Ambient Artwork Layer: Dark Silhouette with Glowing Iridescent Motion Trail */}
      <div
        className="pointer-events-none absolute -right-[15%] sm:right-[-5%] lg:right-[0%] top-1/2 -translate-y-1/2 w-[100vw] sm:w-[70vw] md:w-[58vw] max-w-[880px] z-0 select-none overflow-hidden opacity-90 sm:opacity-100"
        aria-hidden="true"
      >
        <m.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: isArtworkReady ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-[16/9]"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(168,85,247,0.22)]"
          />
          {/* Subtle perimeter feathering so the edges naturally dissolve into #090909 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-transparent to-[#090909]/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent pointer-events-none" />
        </m.div>
      </div>

      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-axis" aria-hidden="true" />

      <div className="hero-content relative z-10">
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

      <div className="hero-index relative z-10">
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
