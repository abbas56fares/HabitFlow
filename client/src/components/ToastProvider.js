import React, { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

/** showToast(message, variant) — variant: "success" | "error" | "info" */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }

  return context;
}

const VARIANTS = {
  success: {
    icon: "fa-solid fa-circle-check",
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  error: {
    icon: "fa-solid fa-circle-exclamation",
    accent: "text-red-400",
    border: "border-red-500/30",
  },
  info: {
    icon: "fa-solid fa-circle-info",
    accent: "text-violet-400",
    border: "border-violet-500/30",
  },
};

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, variant = "success") => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { id, message, variant }]);
      window.setTimeout(() => dismiss(id), 3500);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <div
        className="fixed bottom-4 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:bottom-6 sm:right-6"
        role="status"
        aria-live="polite"
      >
        {toasts.map(({ id, message, variant }) => {
          const style = VARIANTS[variant] || VARIANTS.info;

          return (
            <div
              key={id}
              className={`flex items-start gap-3 rounded-xl border ${style.border} bg-slate-800/95 p-4 shadow-xl shadow-black/40 backdrop-blur-xl`}
            >
              <i className={`${style.icon} ${style.accent} mt-0.5 text-base`} aria-hidden="true"></i>
              <p className="flex-1 text-sm leading-relaxed text-slate-200">{message}</p>
              <button
                type="button"
                onClick={() => dismiss(id)}
                aria-label="Dismiss notification"
                className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-700/60 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                <i className="fa-solid fa-xmark text-sm" aria-hidden="true"></i>
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
