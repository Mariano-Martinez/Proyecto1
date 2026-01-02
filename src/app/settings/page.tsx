"use client";

import AppShell from "@/components/AppShell";
import { useAppState } from "@/components/providers/app-state-provider";
import { useToast } from "@/components/providers/toast-provider";
import Link from "next/link";
import { useState } from "react";
import { Bell, Mail, MessageCircle } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAppState();
  const { push } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [telegramHandle, setTelegramHandle] = useState("@miusuario");

  const savePreferences = () => {
    push({ title: "Preferencias guardadas (mock)", description: "Conecta APIs reales más adelante.", variant: "success" });
  };

  return (
    <AppShell
      headerContent={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Settings</p>
            <h1 className="text-xl font-semibold text-slate-900">Preferencias y perfil</h1>
            <p className="text-sm text-slate-600">Todo mockeado; listo para conectar con APIs.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Bell className="h-4 w-4 text-brand-blue" /> Alertas por email y Telegram (placeholder)
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card space-y-3 p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">Perfil</p>
          <div>
            <label className="text-sm font-semibold text-slate-900">Nombre</label>
            <input className="input mt-1" defaultValue={user.name} disabled />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-900">Email</label>
            <input className="input mt-1" defaultValue={user.email} disabled />
          </div>
        </div>
        <div className="card space-y-4 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Mail className="h-4 w-4 text-brand-blue" /> Notificaciones
          </div>
          <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications((v) => !v)}
              className="h-4 w-4 accent-brand-blue"
            />
            Recibir alertas por email
          </label>
          <div>
            <label className="text-sm font-semibold text-slate-900">Telegram (placeholder)</label>
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded-full bg-slate-100 p-2 text-slate-600">
                <MessageCircle className="h-4 w-4" />
              </span>
              <input
                className="input flex-1"
                value={telegramHandle}
                onChange={(e) => setTelegramHandle(e.target.value)}
                placeholder="@tuusuario"
              />
            </div>
          </div>
          <button onClick={savePreferences} className="btn-primary">
            Guardar cambios (mock)
          </button>
        </div>
      </div>
      <div className="mt-6 card p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Billing</p>
            <p className="text-sm text-slate-600">Placeholder de cobros. Redirige a pricing.</p>
          </div>
          <Link href="/pricing" className="btn-secondary">
            Ver planes
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
