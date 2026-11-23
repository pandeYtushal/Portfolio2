import { useEffect } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";
import Contact from "../components/Contact";
import { useSEO, BASE_URL } from "../hooks/useSEO";
import { personSchema, websiteSchema } from "../lib/jsonld";
import StackMarquee from "../components/StackMarquee";
import Experience from "../components/Experience";
import Projects from "../components/Projects";

function StructuredData() {
  useEffect(() => {
    const entries = [["home-person-schema", personSchema()], ["home-website-schema", websiteSchema()]] as const;
    entries.forEach(([id, data]) => {
      let script = document.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
      if (!script) { script = document.createElement("script"); script.type = "application/ld+json"; script.dataset.seoId = id; document.head.appendChild(script); }
      script.textContent = JSON.stringify(data);
    });
    return () => entries.forEach(([id]) => document.querySelector(`script[data-seo-id="${id}"]`)?.remove());
  }, []);
  return null;
}

export default function Home() {
  useSEO({ title: "Tushal Anand — Software Engineer", description: "Software engineer building useful systems with C++, React, and AI agents.", canonical: `${BASE_URL}/`, ogImage: `${BASE_URL}/avtar.webp` });
  return <><StructuredData /><Navbar /><main id="main-content" tabIndex={-1}><Hero /><Projects /><StackMarquee /><Experience /><About /><Contact /><Footer /></main></>;
}
