import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./index.css";

// Initialize smooth scrolling only on non-touch/desktop devices for better performance
const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
if (!isMobile) {
  const lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for premium feel
  });
}

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found");
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
