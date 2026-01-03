"use client";

import AppShell from "@/components/AppShell";
import { useAppState } from "@/components/providers/app-state-provider";
import { defaultAlerts } from "@/lib/mockData";
import { EventType } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { AlertTriangle, ArrowLeft, Bell, PauseCircle, PlayCircle } from "lucide-react";

export default function TrackerDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { trackers, getEventsForTracker, alertsPreferences, updateAlert, toggleTrackerStatus } = useAppState();

  const tracker = useMemo(() => trackers.find((t) => t.id === params.id), [trackers, params.id]);

  const events = tracker ? getEventsForTracker(tracker.id) : [];
  const alerts = (tracker && alertsPreferences[tracker.id]) || defaultAlerts;

  const toggle = (key: EventType) => {
    updateAlert(tracker!.id, key, !alerts[key]);
  };

  if (!tracker) {
    return (
      <AppShell>
        <div className="card p-6">
          <p className="text-sm text-slate-700">Tracker no encontrado.</p>
          <button onClick={() => router.push("/trackers")} className="btn-primary mt-3 text-sm">
            Volver
          </button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      headerContent={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => router.push("/trackers")} className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Volver
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Bell className="h-4 w-4 text-brand-blue" />
            Alertas configurables por evento
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px,1fr]">
        <div className="card space-y-3 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Tracker</p>
              <h1 className="text-xl font-semibold text-slate-900">{tracker.label}</h1>
              <p className="text-sm text-slate-600">{tracker.queryText || tracker.searchUrl}</p>
              <p className="text-xs text-slate-500">Intervalo {tracker.intervalMinutes} min</p>
            </div>
            <span
              className={`badge ${tracker.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
            >
              {tracker.status === "ACTIVE" ? "Activo" : "Pausado"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
              Creado {new Date(tracker.createdAt).toLocaleDateString()}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
              Último check {new Date(tracker.lastCheckedAt).toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => toggleTrackerStatus(tracker.id)}
            className="btn-primary inline-flex items-center gap-2"
          >
            {tracker.status === "ACTIVE" ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
            {tracker.status === "ACTIVE" ? "Pausar" : "Activar"}
          </button>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Alertas</p>
            <p className="text-xs text-slate-600">Configura qué eventos disparan notificaciones (mock).</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
              {(["NEW_LISTING", "PRICE_DOWN", "PRICE_UP", "ENDED"] as EventType[]).map((key) => (
                <label key={key} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm">
                  <input
                    type="checkbox"
                    checked={alerts[key]}
                    onChange={() => toggle(key)}
                    className="h-4 w-4 accent-brand-blue"
                  />
                  {copy[key]}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="card p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Eventos mock</p>
            <h3 className="text-lg font-semibold text-slate-900">Últimos cambios detectados</h3>
            <p className="text-sm text-slate-600">Generados localmente, listos para reemplazar por API real.</p>
          </div>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="card flex items-start justify-between p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <span className={`badge ${badgeColor[event.type]}`}>{copy[event.type]}</span>
                    <span className="text-slate-500">{new Date(event.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{event.title}</p>
                  <p className="text-xs text-slate-600">
                    ${event.price.toLocaleString()} {event.oldPrice ? `(antes ${event.oldPrice.toLocaleString()})` : ""}
                  </p>
                  {event.url && (
                    <a href={event.url} className="text-xs font-semibold text-brand-blue hover:underline" target="_blank" rel="noreferrer">
                      Ver publicación
                    </a>
                  )}
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <div className="card flex items-center gap-2 p-4 text-sm text-slate-600">
                <AlertTriangle className="h-4 w-4 text-amber-500" /> Sin eventos simulados todavía.
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

const copy: Record<EventType, string> = {
  NEW_LISTING: "Nuevo listing",
  PRICE_DOWN: "Precio bajó",
  PRICE_UP: "Precio subió",
  ENDED: "Finalizado",
};

const badgeColor: Record<EventType, string> = {
  NEW_LISTING: "bg-emerald-100 text-emerald-700",
  PRICE_DOWN: "bg-sky-100 text-sky-700",
  PRICE_UP: "bg-amber-100 text-amber-700",
  ENDED: "bg-slate-200 text-slate-700",
};
