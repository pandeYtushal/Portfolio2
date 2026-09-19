import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./index.css";

// Initialize smooth scrolling only on non-touch/desktop devices for better performance
const lenis = new Lenis({
  lerp: 0.1, // Higher value makes it snappier and faster
  wheelMultiplier: 1.5, // Increases the scroll distance per wheel click
  smoothWheel: true,
  syncTouch: false, // Ensures native touch scroll on actual mobile devices isn't slowed down
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// @ts-ignore
window.lenis = lenis;

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
