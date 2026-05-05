import { useEffect } from "react";
import { X, ExternalLink, Copy, FileText } from "lucide-react";

const ResumeModal = ({ onClose }) => {
  const pdfUrl = "/Tushal_Resume.pdf";

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + pdfUrl);
    } catch {}
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal panel */}
      <div
        className="relative flex h-[92vh] w-[92vw] max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          {/* Left: title */}
          <div>
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              <FileText className="h-3 w-3" />
              Curriculum Vitae
            </p>
            <h2 className="mt-0.5 text-lg font-bold text-white">My Resume</h2>
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              title="Copy link"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy Link
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new tab"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={onClose}
              title="Close"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── PDF Viewer ── */}
        <div className="flex-1 overflow-hidden bg-zinc-900">
          <iframe
            src={pdfUrl}
            title="Tushal Pandey Resume"
            className="h-full w-full border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
