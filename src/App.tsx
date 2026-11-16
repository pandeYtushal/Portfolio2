import { lazy, Suspense, useEffect } from "react";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LenisProvider } from "./lib/LenisContext";
import { useLenis } from "./hooks/useLenis";

const Home = lazy(() => import("./pages/Home"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const ResumePage = lazy(() => import("./pages/ResumePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function RouteContent() {
  const location = useLocation();
  const lenis = useLenis();
  useEffect(() => { lenis?.scrollTo(0, { immediate: true }); }, [location.pathname, lenis]);
  return <Suspense fallback={<div className="route-loading" aria-label="Loading page" />}><Routes><Route path="/" element={<Home />} /><Route path="/resume" element={<ResumePage />} /><Route path="/project/:id" element={<ProjectPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></Suspense>;
}

export default function App() {
  return <MotionConfig reducedMotion="user"><LazyMotion features={domAnimation}><LenisProvider><div className="site-shell bg-grain"><a href="#main-content" className="skip-link">Skip to main content</a><RouteContent /></div></LenisProvider></LazyMotion></MotionConfig>;
}
