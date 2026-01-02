"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";

type Toast = {
  id: string;
  title: string;
  description?: string;
  variant?: "success" | "error" | "info";
};

type ToastContextValue = {
  push: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const createId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `toast_${Math.random().toString(36).slice(2, 9)}`);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = (toast: Omit<Toast, "id">) => {
    const id = createId();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  };

  const value = useMemo(() => ({ push }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-6 top-6 z-50 flex max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={clsx(
              "rounded-xl border bg-white px-4 py-3 shadow-lg",
              toast.variant === "success" && "border-emerald-200",
              toast.variant === "error" && "border-rose-200",
              toast.variant === "info" && "border-blue-200"
            )}
          >
            <p className="text-sm font-semibold text-slate-800">{toast.title}</p>
            {toast.description ? (
              <p className="text-xs text-slate-600">{toast.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};
