"use client";

import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="card max-w-lg space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Plan Free</p>
            <h3 className="text-xl font-semibold text-slate-900">Límite de trackers alcanzado</h3>
            <p className="text-sm text-slate-600">
              Tu plan actual permite hasta 3 trackers. Mejora a Starter, Pro o Business para habilitar más monitoreos y frecuencias más rápidas.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-500 transition hover:text-slate-700">
            ×
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { name: "Starter", trackers: 10, interval: "15 min" },
            { name: "Pro", trackers: 25, interval: "10 min" },
            { name: "Business", trackers: 60, interval: "5 min" },
          ].map((plan) => (
            <div key={plan.name} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
              <p className="text-sm font-semibold text-slate-900">{plan.name}</p>
              <p className="text-xs text-slate-600">{plan.trackers} trackers</p>
              <p className="text-xs text-slate-600">Checks cada {plan.interval}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <button onClick={onClose} className="btn-secondary">
            Seguir en Free
          </button>
          <Link href="/pricing" className="btn-primary">
            Ver planes y upgrade
          </Link>
        </div>
      </div>
    </div>
  );
}
