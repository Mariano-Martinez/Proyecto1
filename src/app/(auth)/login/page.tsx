"use client";

import { useAppState } from "@/components/providers/app-state-provider";
import { useToast } from "@/components/providers/toast-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  const { login, demoLogin, isAuthenticated } = useAppState();
  const { push } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("seller@example.com");
  const [password, setPassword] = useState("password");

  useEffect(() => {
    if (isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    push({ title: "Sesión iniciada (mock)", description: "Ahora puedes usar el dashboard", variant: "success" });
    router.push("/dashboard");
  };

  const handleDemo = () => {
    demoLogin();
    push({ title: "Demo login listo", description: "Estás en modo demo con plan Free", variant: "info" });
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-[#f5f7ff] to-[#eef2ff] px-4">
      <div className="card w-full max-w-md p-8">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Sparkles className="h-6 w-6 text-brand-blue" />
          MeliTracker
        </div>
        <p className="mt-1 text-sm text-slate-600">Prototype UI para trackear competencia en Mercado Libre.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-800">Email</label>
            <input
              className="input mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-800">Password</label>
            <input
              className="input mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Entrar
          </button>
        </form>
        <button onClick={handleDemo} className="btn-secondary mt-3 w-full">
          Demo login
        </button>
        <div className="mt-4 text-center text-xs text-slate-500">
          Autenticación mockeada. Más tarde podrás usar SSO o Supabase Auth.
        </div>
      </div>
    </div>
  );
}
