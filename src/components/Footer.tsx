import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUp, Eye } from "lucide-react";

/* ── Animated counter ─────────────────────────────────────────────── */
const AnimatedNumber = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    let start = 0;
    const duration = 800;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [value]);

  return <>{display.toLocaleString()}</>;
};

/* ── Visitor count (counterapi.dev — real, shared across all users) ── */
// Namespace is unique to your portfolio. Counter auto-creates on first hit.
const NAMESPACE = "tushal-pandey-portfolio-v1";
const COUNTER_KEY = "visitors";

// Optional seed: set VITE_VISITOR_BASE in your Vercel/Netlify dashboard
// so the displayed count = API count + BASE
const BASE = parseInt(import.meta.env.VITE_VISITOR_BASE ?? "0", 10);

const SESSION_KEY = "_pv_session";

const CACHE_KEY = "_pv_cache"; // localStorage cache for instant display

const useVisitorCount = () => {
  // Seed from cache immediately so there's no blank delay
  const [count, setCount] = useState(() => {
    const cached = parseInt(localStorage.getItem(CACHE_KEY) ?? "0", 10);
    return cached > 0 ? cached + BASE : 0;
  });

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY);

    // New session → increment; same session → just read
    const endpoint = alreadyCounted
      ? `https://api.counterapi.dev/v1/${NAMESPACE}/${COUNTER_KEY}`
      : `https://api.counterapi.dev/v1/${NAMESPACE}/${COUNTER_KEY}/up`;

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        const val = (data?.count ?? data?.value ?? 0);
        if (val > 0) {
          localStorage.setItem(CACHE_KEY, String(val)); // update cache
          setCount(val + BASE);
          if (!alreadyCounted) sessionStorage.setItem(SESSION_KEY, "1");
        }
      })
      .catch(() => {/* keep showing cached value */});
  }, []);

  return count;
};


/* ── Main footer ──────────────────────────────────────────────────── */
export const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const visitorCount = useVisitorCount();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-app-border bg-app-bg"
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 120%, color-mix(in srgb, var(--color-app-accent) 6%, transparent), transparent)",
        }}
      />

      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/3"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-app-accent), transparent)",
          opacity: 0.5,
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-10 md:py-12">

        {/* ── Single row: brand + visitor + back-to-top ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Brand + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span
              className="font-bold tracking-tight text-app-text-primary"
              style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "1.15rem" }}
            >
              Tushal<span style={{ color: "var(--color-app-accent)" }}>.</span>
            </span>
          </div>

          {/* Visitor badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-app-border bg-app-surface px-3 py-1.5">
            <Eye className="h-3 w-3 text-app-accent shrink-0" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-app-text-muted">
              {visitorCount > 0 ? (
                <>
                  <AnimatedNumber value={visitorCount} />
                  <span className="ml-1">Unique Visitors</span>
                </>
              ) : (
                "counting…"
              )}
            </span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-1.5 rounded-full border border-app-border bg-app-surface px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-app-text-muted transition-all duration-200 hover:border-app-accent/40 hover:text-app-text-primary hover:bg-app-surface-secondary cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-app-border my-6" />

        {/* Copyright */}
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center text-[10px] font-mono text-app-text-muted uppercase tracking-[0.2em]"
        >
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-app-text-secondary font-bold">Tushal Pandey</span>
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
