import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink, Copy, FileText, Download } from "lucide-react";

interface ResumeModalProps {
  onClose: () => void;
}

export const ResumeModal = ({ onClose }: ResumeModalProps) => {
  const pdfUrl = "/Tushal Anand_Resume.pdf";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + pdfUrl);
    } catch (err) {
      console.warn("copy failed:", err);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-app-border bg-app-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
      >
        <div className="flex items-center justify-between gap-3 border-b border-app-border px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0 text-left">
            <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-app-text-muted">
              <FileText className="h-3 w-3" />
              Curriculum Vitae
            </p>
            <h2 id="resume-title" className="mt-0.5 truncate text-base font-bold text-app-text-primary sm:text-lg">
              My Resume
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={copyLink}
              aria-label="Copy resume link"
              className="flex h-8 items-center gap-1.5 rounded-lg border border-app-border bg-transparent px-2.5 text-xs font-semibold text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all active:scale-95 focus-visible:outline-none sm:px-3 cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Copy Link</span>
            </button>
            <a
              href={pdfUrl}
              download
              aria-label="Download resume"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-app-border bg-transparent text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all active:scale-95 focus-visible:outline-none"
            >
              <Download className="h-4 w-4" />
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume in new tab"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-app-border bg-transparent text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all active:scale-95 focus-visible:outline-none"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={onClose}
              aria-label="Close resume preview"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-app-border bg-transparent text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all active:scale-95 focus-visible:outline-none cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-app-surface relative">
          <div className="sm:hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-6 z-10 bg-app-surface">
            <div className="w-20 h-20 bg-app-surface-secondary rounded-full flex items-center justify-center">
              <FileText className="w-10 h-10 text-app-text-primary" />
            </div>
            <div className="max-w-xs">
              <p className="text-xl font-bold text-app-text-primary mb-3">Resume Ready</p>
              <p className="text-sm text-app-text-secondary leading-relaxed">PDF previews are limited on mobile devices. Tap below to view or download.</p>
            </div>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-3 bg-app-text-primary text-app-bg px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
            >
              Open PDF
            </a>
          </div>
          <iframe src={pdfUrl} title="Tushal Pandey Resume" className="hidden sm:block h-full w-full border-none relative z-0" />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ResumeModal;
