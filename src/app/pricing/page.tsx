"use client";

import AppShell from "@/components/AppShell";
import { useAppState } from "@/components/providers/app-state-provider";
import { useToast } from "@/components/providers/toast-provider";
import { plans } from "@/lib/mockData";
import { Check, Shield } from "lucide-react";

export default function PricingPage() {
  const { userPlan, setPlan } = useAppState();
  const { push } = useToast();

  const handleSelect = (planId: typeof plans[number]["id"]) => {
    setPlan(planId);
    push({ title: `Plan ${planId} seleccionado`, description: "Upgrade mock aplicado", variant: "success" });
  };

  return (
    <AppShell
      headerContent={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Planes</p>
            <h1 className="text-xl font-semibold text-slate-900">Elige el plan para tu operación</h1>
            <p className="text-sm text-slate-600">Mock de billing. Upgrade para habilitar más trackers.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            Plan actual: {userPlan.name}
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`card relative p-5 ${plan.id === userPlan.id ? "border-brand-blue/60 shadow-lg" : ""}`}
          >
            {plan.id === userPlan.id && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand-blue px-2 py-1 text-xs font-semibold text-white">
                <Shield className="h-4 w-4" /> Actual
              </span>
            )}
            <p className="text-xs uppercase tracking-wide text-slate-500">{plan.name}</p>
            <h3 className="text-2xl font-bold text-slate-900">${plan.priceMonthly}/mo</h3>
            <p className="text-sm text-slate-600">{plan.trackerLimit} trackers · {plan.minIntervalMinutes} min mínimo</p>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              {plan.perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-blue" /> {perk}
                </div>
              ))}
            </div>
            <button onClick={() => handleSelect(plan.id)} className="btn-primary mt-4 w-full">
              {plan.id === userPlan.id ? "Plan activo" : "Elegir plan"}
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
