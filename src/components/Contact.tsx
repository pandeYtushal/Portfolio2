import { useState } from "react";
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "tushalanand4@gmail.com";
  const copy = async () => { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };
  return <section id="contact" className="contact-section section-wrap"><p className="eyebrow">CONTACT <span className="eyebrow-meta">OPEN TO THE RIGHT PROBLEMS</span></p><div className="contact-main"><a href={`mailto:${email}`} className="contact-email">{email}<span className="accent">↗</span></a><button className="copy-button" onClick={copy}>{copied ? "COPIED" : "COPY EMAIL"}</button></div><div className="contact-bottom"><p>Have a specific project in mind?</p><div className="social-links"><a href="https://github.com/pandeYtushal" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/tushal-anand18/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="mailto:tushalanand4@gmail.com">EMAIL ↗</a></div></div></section>;
}
