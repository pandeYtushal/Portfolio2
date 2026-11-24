import { useNavigate } from "react-router-dom";
import { useSEO, BASE_URL } from "../hooks/useSEO";
import { Button, Typography } from "@cred/neopop-web/lib/components";
import { fontNameSpaces } from "@cred/neopop-web/lib/primitives";

export default function NotFoundPage() {
  const navigate = useNavigate();
  useSEO({ title: "Page not found — Tushal Anand", description: "This page does not exist.", canonical: `${BASE_URL}/404`, noindex: true });
  return (
    <main id="main-content" className="not-found flex flex-col items-start justify-center gap-6 p-8 min-h-screen">
      <div className="eyebrow">
        <Typography {...fontNameSpaces.tc12b} color="#9e9e9b">
          404 / NOT FOUND
        </Typography>
      </div>
      <Typography {...fontNameSpaces.th44eb} color="#f1f1ee" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", lineHeight: 0.85, letterSpacing: "-0.08em" }}>
        Nothing<br />here<span className="accent">.</span>
      </Typography>
      <Button
        variant="primary"
        kind="elevated"
        size="medium"
        colorMode="dark"
        onClick={() => navigate('/')}
      >
        Back to home ↗
      </Button>
    </main>
  );
}
