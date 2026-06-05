/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { X, ExternalLink, Copy, FileText, Download } from "lucide-react";

const ResumeModal = ({ onClose }) => {
  const pdfUrl = "/Tushal_Resume.pdf";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
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

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
      >
        <div className="flex items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              <FileText className="h-3 w-3" />
              Curriculum Vitae
            </p>
            <h2 id="resume-title" className="mt-0.5 truncate text-base font-bold text-white sm:text-lg">
              My Resume
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={handleCopy}
              title="Copy link"
              aria-label="Copy resume link"
              className="flex h-8 items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-900 px-2.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 sm:px-3"
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Copy Link</span>
            </button>
            <a
              href={pdfUrl}
              download
              title="Download resume"
              aria-label="Download resume"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 text-zinc-400 transition hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <Download className="h-4 w-4" />
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new tab"
              aria-label="Open resume in new tab"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 text-zinc-400 transition hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={onClose}
              title="Close"
              aria-label="Close resume preview"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 text-zinc-400 transition hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-zinc-900">
          <iframe src={pdfUrl} title="Tushal Pandey Resume" className="h-full w-full border-none" />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
