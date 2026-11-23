import { useState, useRef } from "react";

export default function Contact() {
  const [feedback, setFeedback] = useState<string>("COPY EMAIL");
  const timeoutRef = useRef<number | null>(null);
  const email = "tushalanand4@gmail.com";

  const showFeedback = (text: string) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setFeedback(text);
    timeoutRef.current = window.setTimeout(() => {
      setFeedback("COPY EMAIL");
    }, 2000);
  };

  const copy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
        showFeedback("COPIED");
        return;
      }
      throw new Error("Clipboard API unavailable");
    } catch {
      // Fallback for denied permissions or unsupported environments
      try {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (successful) {
          showFeedback("COPIED");
        } else {
          showFeedback("EMAIL: " + email);
        }
      } catch {
        showFeedback("EMAIL: " + email);
      }
    }
  };

  return (
    <section id="contact" className="contact-section section-wrap" aria-labelledby="contact-heading">
      <p className="eyebrow">
        CONTACT <span className="eyebrow-meta">OPEN TO THE RIGHT PROBLEMS</span>
      </p>
      <div className="contact-main">
        <a href={`mailto:${email}`} className="contact-email" aria-label={`Email ${email}`}>
          {email}<span className="accent" aria-hidden="true">↗</span>
        </a>
        <button
          className="copy-button"
          onClick={copy}
          aria-live="polite"
          aria-label={feedback === "COPIED" ? "Email copied to clipboard" : "Copy email address to clipboard"}
        >
          {feedback}
        </button>
      </div>
      <div className="contact-bottom">
        <p id="contact-heading">Have a specific project in mind?</p>
        <div className="social-links">
          <a href="https://github.com/pandeYtushal" target="_blank" rel="noreferrer" aria-label="GitHub profile">
            GITHUB ↗
          </a>
          <a href="https://www.linkedin.com/in/tushal-anand18/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            LINKEDIN ↗
          </a>
          <a href={`mailto:${email}`} aria-label="Send direct email">
            EMAIL ↗
          </a>
        </div>
      </div>
    </section>
  );
}
