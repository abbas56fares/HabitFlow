import React, { useEffect } from "react";

/**
 * Shared dialog shell: dimmed overlay, elevated panel, Escape to close.
 * The panel's entry transition is a scripted, user-triggered state change —
 * not hover or scroll feedback.
 */
export default function Modal({ title, onClose, children, footer }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-slate-700/50 bg-slate-800/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4 border-b border-slate-700/50 px-5 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-100 sm:text-xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-700/60 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">{children}</div>

        {footer && (
          <div className="flex flex-col-reverse gap-3 border-t border-slate-700/50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
