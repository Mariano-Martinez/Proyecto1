"use client";

import AppShell from "@/components/AppShell";
import { useAppState } from "@/components/providers/app-state-provider";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BadgeCheck, PauseCircle, PlayCircle } from "lucide-react";

export default function TrackersPage() {
  const { trackers, userPlan } = useAppState();
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "PAUSED">("ALL");

  const filtered = useMemo(() => {
    if (statusFilter === "ALL") return trackers;
    return trackers.filter((t) => t.status === statusFilter);
  }, [statusFilter, trackers]);

  return (
    <AppShell
      headerContent={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Trackers</p>
            <h1 className="text-xl font-semibold text-slate-900">Todos tus monitoreos</h1>
            <p className="text-sm text-slate-600">Filtra por estado y abre el detalle.</p>
          </div>
          <div className="flex items-center gap-2">
            {(["ALL", "ACTIVE", "PAUSED"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  statusFilter === key ? "bg-brand-blue text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {key === "ALL" ? "Todos" : key === "ACTIVE" ? "Activos" : "Pausados"}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="card overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Intervalo</th>
              <th>Estado</th>
              <th>Stats</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tracker) => (
              <tr key={tracker.id}>
                <td className="text-slate-900">
                  <div className="font-semibold">{tracker.label}</div>
                  <div className="text-xs text-slate-500">Creado {new Date(tracker.createdAt).toLocaleDateString()}</div>
                </td>
                <td>{tracker.intervalMinutes} min</td>
                <td>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                      tracker.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {tracker.status === "ACTIVE" ? <PlayCircle className="h-4 w-4" /> : <PauseCircle className="h-4 w-4" />}
                    {tracker.status === "ACTIVE" ? "Activo" : "Pausado"}
                  </span>
                </td>
                <td className="text-sm text-slate-700">
                  {tracker.stats.newListings} nuevos · {tracker.stats.priceChanges} cambios · {tracker.stats.ended} finalizados
                </td>
                <td className="text-right">
                  <Link href={`/trackers/${tracker.id}`} className="btn-primary text-xs">
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-6 text-center text-sm text-slate-600">Sin trackers en este filtro.</div>}
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <BadgeCheck className="h-4 w-4 text-brand-blue" /> Límite actual {userPlan.trackerLimit} trackers en plan {userPlan.name}.
      </div>
    </AppShell>
  );
}
