"use client";

import AppShell from "@/components/AppShell";
import { Sparkles, Search, PlayCircle, Bell, ShieldCheck, Link as LinkIcon } from "lucide-react";

const steps = [
  {
    title: "Busca o pega una URL",
    description: "Ingresa texto como “iphone 13 128gb” o pega una URL de Mercado Libre. El parser detecta si es link y genera un label.",
    icon: <LinkIcon className="h-5 w-5 text-brand-blue" />,
  },
  {
    title: "Revisa resultados mock",
    description: "Haz clic en “Buscar” y verás 10 publicaciones simuladas. Es solo UI; luego conectaremos APIs reales.",
    icon: <Search className="h-5 w-5 text-brand-blue" />,
  },
  {
    title: "Inicia seguimiento",
    description: "Presiona “Iniciar seguimiento” para crear el tracker con el intervalo según tu plan (Free = 30 min).",
    icon: <PlayCircle className="h-5 w-5 text-brand-blue" />,
  },
  {
    title: "Monitorea cambios",
    description: "En /trackers ves el listado; en cada detalle aparecen eventos simulados y toggles de alertas por tipo.",
    icon: <Bell className="h-5 w-5 text-brand-blue" />,
  },
];

const plans = [
  { name: "Free", detail: "Hasta 3 trackers · checks cada 30 min" },
  { name: "Starter", detail: "10 trackers · checks cada 15 min" },
  { name: "Pro", detail: "25 trackers · checks cada 10 min" },
  { name: "Business", detail: "60 trackers · checks cada 5 min" },
];

export default function HowItWorksPage() {
  return (
    <AppShell
      headerContent={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Guía</p>
            <h1 className="text-xl font-semibold text-slate-900">Cómo funciona MeliTracker</h1>
            <p className="text-sm text-slate-600">Recorrido rápido del flujo mockeado y los límites de plan.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Sparkles className="h-4 w-4 text-brand-blue" /> UI-first prototype
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="card space-y-4 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Flujo en 4 pasos</h2>
          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.title} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  {step.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="text-xs text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Trackers</p>
            <p className="text-sm text-slate-700">
              Cada tracker guarda label, query o URL, intervalo según plan y estadísticas básicas. Los eventos en el detalle son mockeados y
              listos para conectar con un backend real.
            </p>
          </div>
        </div>
        <div className="card space-y-4 p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-blue" />
            <h2 className="text-lg font-semibold text-slate-900">Planes y límites</h2>
          </div>
          <p className="text-sm text-slate-600">Regla simple: Free permite 3 trackers; los demás amplían límite y bajan intervalo.</p>
          <div className="grid grid-cols-1 gap-2">
            {plans.map((plan) => (
              <div key={plan.name} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{plan.name}</p>
                  <p className="text-xs text-slate-600">{plan.detail}</p>
                </div>
                {plan.name === "Free" && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Límite 3</span>
                )}
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
            <p className="font-semibold text-slate-900">Autenticación y datos</p>
            <p>Login y eventos están mockeados. Esta página resume el flujo para cuando integremos scraping o APIs oficiales.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
