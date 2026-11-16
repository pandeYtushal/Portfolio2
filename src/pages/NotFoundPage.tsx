import { Link } from "react-router-dom";
import { useSEO, BASE_URL } from "../hooks/useSEO";
export default function NotFoundPage() {
  useSEO({ title: "Page not found — Tushal Anand", description: "This page does not exist.", canonical: `${BASE_URL}/404`, noindex: true });
  return <main id="main-content" className="not-found"><p className="eyebrow">404 / NOT FOUND</p><h1>Nothing<br />here<span className="accent">.</span></h1><Link to="/" className="button button-primary">Back to home ↗</Link></main>;
}
