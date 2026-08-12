import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface ToastProps {
  show: boolean;
  message?: string;
}

export const Toast = ({ show, message = "Copied to clipboard" }: ToastProps) => {

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-[9999] pointer-events-none"
    >
      <AnimatePresence>
        {show && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-2.5 border border-app-border bg-app-surface px-4 py-2.5 shadow-lg"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15"
            >
              <Check className="h-3 w-3 text-emerald-400" strokeWidth={2.5} />
            </span>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-app-text-primary">
              {message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
