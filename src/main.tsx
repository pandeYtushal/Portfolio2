import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./index.css";

// Initialize smooth scrolling only on non-touch/desktop devices for better performance
const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
if (!isMobile) {
  const lenis = new Lenis({
    autoRaf: true,
    lerp: 0.05,
    wheelMultiplier: 1.0,
    smoothWheel: true,
  });
  // @ts-ignore
  window.lenis = lenis;
}

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found");
}

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
