import { useState, useRef } from "react";
import { Button, Typography } from "@cred/neopop-web/lib/components";
import { fontNameSpaces } from "@cred/neopop-web/lib/primitives";

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
      {/* Section Heading matching portfolio design system */}
      <div className="section-heading mb-4 md:mb-6">
        <div>
          <div className="eyebrow flex items-center gap-2">
            <Typography {...fontNameSpaces.tc12b} color="#9e9e9b">
              CONTACT <span className="opacity-40">OPEN TO WORK</span>
            </Typography>
          </div>
          <h2 id="contact-heading">
            Let’s build<br />together<span className="accent">.</span>
          </h2>
        </div>
        <p className="section-note">
          Have an opportunity, question, or want to collaborate? Reach out directly.
        </p>
      </div>

      <div className="contact-main flex items-center gap-4 sm:gap-6 flex-wrap my-6 sm:my-8">
        <a href={`mailto:${email}`} className="contact-email" aria-label={`Email ${email}`}>
          {email}<span className="accent" aria-hidden="true">↗</span>
        </a>
        <Button
          variant={feedback === "COPIED" ? "primary" : "secondary"}
          kind="elevated"
          size="medium"
          colorMode="dark"
          onClick={copy}
          aria-live="polite"
          aria-label={feedback === "COPIED" ? "Email copied to clipboard" : "Copy email address to clipboard"}
        >
          {feedback}
        </Button>
      </div>
      <div className="contact-bottom flex justify-between items-center gap-4 flex-wrap">
        <Typography {...fontNameSpaces.tb16m} color="#9e9e9b">
          Have a specific project in mind?
        </Typography>
        <div className="social-links flex items-center gap-6 flex-wrap">
          <a href="https://github.com/pandeYtushal" target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <Typography {...fontNameSpaces.tc12b} color="#d4d4ce">
              GITHUB ↗
            </Typography>
          </a>
          <a href="https://www.linkedin.com/in/tushal-anand18/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            <Typography {...fontNameSpaces.tc12b} color="#d4d4ce">
              LINKEDIN ↗
            </Typography>
          </a>
          <a href={`mailto:${email}`} aria-label="Send direct email">
            <Typography {...fontNameSpaces.tc12b} color="#d4d4ce">
              EMAIL ↗
            </Typography>
          </a>
        </div>
      </div>
    </section>
  );
}
