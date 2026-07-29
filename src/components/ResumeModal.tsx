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
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + pdfUrl);
    } catch (err) {
      console.warn("Failed to copy link:", err);
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
        onClick={(event) => event.stopPropagation()}
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
              onClick={handleCopy}
              title="Copy link"
              aria-label="Copy resume link"
              className="flex h-8 items-center gap-1.5 rounded-lg border border-app-border bg-transparent px-2.5 text-xs font-semibold text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all active:scale-95 shadow-none focus-visible:outline-none sm:px-3 cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Copy Link</span>
            </button>
            <a
              href={pdfUrl}
              download
              title="Download resume"
              aria-label="Download resume"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-app-border bg-transparent text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all active:scale-95 shadow-none focus-visible:outline-none"
            >
              <Download className="h-4 w-4" />
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new tab"
              aria-label="Open resume in new tab"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-app-border bg-transparent text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all active:scale-95 shadow-none focus-visible:outline-none"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={onClose}
              title="Close"
              aria-label="Close resume preview"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-app-border bg-transparent text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all active:scale-95 shadow-none focus-visible:outline-none cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-app-surface">
          <iframe src={pdfUrl} title="Tushal Pandey Resume" className="h-full w-full border-none" />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ResumeModal;
