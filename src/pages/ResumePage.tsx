import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSEO, BASE_URL } from "../hooks/useSEO";
import { Button, Typography } from "@cred/neopop-web/lib/components";
import { fontNameSpaces } from "@cred/neopop-web/lib/primitives";

const pdfPreviewUrl = "https://drive.google.com/file/d/1IC8AQ-YlGLaIRvwjntPes1bw7snDX167/preview";
const pdfDirectUrl = "https://drive.google.com/file/d/1IC8AQ-YlGLaIRvwjntPes1bw7snDX167/view?usp=drive_link";

export default function ResumePage() {
  const navigate = useNavigate();
  const [frameStyle, setFrameStyle] = useState<"metallic" | "neopop">("metallic");
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: "Curriculum Vitae — Tushal Anand",
    description:
      "Curriculum Vitae of Tushal Anand — Computer Science Engineer specialising in full-stack web development, AI workflow automation, and decentralized technologies.",
    canonical: `${BASE_URL}/resume`,
    ogImage: `${BASE_URL}/avtar.webp`,
    ogType: "profile",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!frameRef.current) return;
      const rect = frameRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      frameRef.current.style.setProperty("--mouse-x", `${x}px`);
      frameRef.current.style.setProperty("--mouse-y", `${y}px`);

      // Keep spotlight active when cursor is within or hovering near the frame
      const isNear =
        e.clientX >= rect.left - 60 &&
        e.clientX <= rect.right + 60 &&
        e.clientY >= rect.top - 60 &&
        e.clientY <= rect.bottom + 60;
      setIsHovered(isNear);
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (!frameRef.current || !e.touches[0]) return;
      const rect = frameRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      frameRef.current.style.setProperty("--mouse-x", `${x}px`);
      frameRef.current.style.setProperty("--mouse-y", `${y}px`);
      setIsHovered(true);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("touchmove", handleWindowTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("touchmove", handleWindowTouchMove);
    };
  }, []);

  return (
    <>
      <div className="print:hidden">
        <Navbar />
      </div>
      <main
        id="main-content"
        tabIndex={-1}
        className="resume-page min-h-screen bg-app-surface text-app-text-primary pt-24 pb-12 px-3 sm:px-6 md:px-12 flex flex-col items-center"
      >
        <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col gap-6 sm:gap-8 items-center">
          
          {/* Header & Controls */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-app-border pb-4 sm:pb-6 print:hidden">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Button 
                  variant="secondary"
                  kind="flat"
                  size="small"
                  colorMode="dark"
                  onClick={() => navigate(-1)}
                  aria-label="Back to previous page"
                >
                  ← Back
                </Button>
                <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight">Curriculum Vitae</h1>
              </div>
              <Typography {...fontNameSpaces.tc12b} color="#9e9e9b">
                TUSHAL ANAND · SOFTWARE ENGINEER
              </Typography>
            </div>

            <div className="resume-actions flex items-center gap-3 flex-wrap">
              {/* Style Switcher: Metallic Glass vs NeoPOP 3D Offset */}
              <div className="inline-flex items-center p-1 rounded-full bg-[#121212] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setFrameStyle("metallic")}
                  style={{ color: frameStyle === "metallic" ? "#000000" : "#a3a3a3" }}
                  className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 ${
                    frameStyle === "metallic"
                      ? "bg-white !text-black font-bold shadow-sm"
                      : "!text-neutral-400 hover:!text-white"
                  }`}
                  aria-pressed={frameStyle === "metallic"}
                >
                  Metallic Glass
                </button>
                <button
                  type="button"
                  onClick={() => setFrameStyle("neopop")}
                  style={{ color: frameStyle === "neopop" ? "#000000" : "#a3a3a3" }}
                  className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 ${
                    frameStyle === "neopop"
                      ? "bg-white !text-black font-bold shadow-sm"
                      : "!text-neutral-400 hover:!text-white"
                  }`}
                  aria-pressed={frameStyle === "neopop"}
                >
                  NeoPOP 3D
                </button>
              </div>

              <Button
                variant="primary"
                kind="elevated"
                size="small"
                colorMode="dark"
                onClick={() => window.open(pdfDirectUrl, "_blank")}
              >
                Open in Drive ↗
              </Button>
            </div>
          </div>

          {/* Obsidian Metallic & NeoPOP Frame Container */}
          <div
            ref={frameRef}
            className={`relative w-full max-w-[850px] h-[78vh] min-h-[580px] max-h-[1050px] transition-all duration-300 print:m-0 print:p-0 print:border-none print:shadow-none print:bg-transparent ${
              frameStyle === "metallic"
                ? "metallic-wrapper rounded-2xl p-[1.5px] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95)]"
                : "neopop-wrapper"
            }`}
          >
            {/* Dynamic Mouse-Tracking Spotlight */}
            {frameStyle === "metallic" && (
              <div
                className="metallic-spotlight pointer-events-none absolute inset-0 z-10 print:hidden"
                style={{
                  opacity: isHovered ? 1 : 0,
                }}
              />
            )}

            {/* Top Specular Light Glint */}
            {frameStyle === "metallic" && (
              <div className="pointer-events-none absolute -top-[1px] left-10 sm:left-14 right-10 sm:right-14 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent z-20 print:hidden" />
            )}

            {/* Bottom Subtle Reflection Glint */}
            {frameStyle === "metallic" && (
              <div className="pointer-events-none absolute -bottom-[1px] left-16 sm:left-24 right-16 sm:right-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-20 print:hidden" />
            )}

            {/* Inner Matte Obsidian Canvas (The Resume Content Slot) */}
            <div
              className={`matte-surface relative w-full h-full overflow-hidden flex flex-col p-1.5 sm:p-2.5 transition-all duration-300 print:bg-transparent print:border-none print:shadow-none print:p-0 ${
                frameStyle === "metallic"
                  ? "rounded-[14.5px] border border-white/[0.08]"
                  : "neopop-inner bg-app-bg border border-app-border"
              }`}
            >
              {/* Precision Corner L-Marks */}
              <span className="pointer-events-none absolute top-3 left-3 sm:top-4 sm:left-4 w-3 h-3 border-t border-l border-white/35 z-20 print:hidden" />
              <span className="pointer-events-none absolute top-3 right-3 sm:top-4 sm:right-4 w-3 h-3 border-t border-r border-white/35 z-20 print:hidden" />
              <span className="pointer-events-none absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-3 h-3 border-b border-l border-white/35 z-20 print:hidden" />
              <span className="pointer-events-none absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-3 h-3 border-b border-r border-white/35 z-20 print:hidden" />

              {/* Faint Radial Ambient Sheen */}
              {frameStyle === "metallic" && (
                <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/[0.035] blur-3xl z-0 print:hidden" />
              )}

              {/* The Resume PDF Viewer embedded seamlessly under the frame */}
              <iframe
                src={pdfPreviewUrl}
                title="Tushal Anand Resume"
                className="w-full h-full rounded-[10px] sm:rounded-[12px] border-0 bg-[#090909] relative z-10"
                allow="autoplay"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
