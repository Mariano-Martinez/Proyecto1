"use client";

import { Tracker } from "@/lib/types";
import { Activity, Pause, Play, Timer } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

interface Props {
  tracker: Tracker;
  onToggleStatus?: (id: string) => void;
}

const statusCopy: Record<Tracker["status"], { label: string; color: string }> = {
  ACTIVE: { label: "Activo", color: "bg-emerald-100 text-emerald-700" },
  PAUSED: { label: "Pausado", color: "bg-amber-100 text-amber-700" },
};

export default function TrackerCard({ tracker, onToggleStatus }: Props) {
  const status = statusCopy[tracker.status];
  return (
    <div className="card flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Mercado Libre</p>
          <h3 className="text-lg font-semibold text-slate-900">{tracker.label}</h3>
          <p className="text-xs text-slate-500">Intervalo {tracker.intervalMinutes} min</p>
        </div>
        <span className={clsx("badge", status.color)}>{status.label}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
        <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          <Activity className="h-4 w-4 text-brand-blue" /> {tracker.stats.newListings} nuevos
        </span>
        <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          💸 {tracker.stats.priceChanges} cambios precio
        </span>
        <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          ✅ {tracker.stats.ended} finalizados
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Timer className="h-4 w-4 text-slate-500" /> Último check {new Date(tracker.lastCheckedAt).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleStatus?.(tracker.id)}
            className="btn-secondary inline-flex items-center gap-2"
          >
            {tracker.status === "ACTIVE" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{tracker.status === "ACTIVE" ? "Pausar" : "Reanudar"}</span>
          </button>
          <Link href={`/trackers/${tracker.id}`} className="btn-primary text-sm">
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}
