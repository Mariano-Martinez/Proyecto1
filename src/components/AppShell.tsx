"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, LogOut, Search, Settings, Sparkles, Tag } from "lucide-react";
import { clsx } from "clsx";
import { useAppState } from "./providers/app-state-provider";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/trackers", label: "Trackers", icon: Search },
  { href: "/pricing", label: "Pricing", icon: Tag },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function AppShell({ children, headerContent }: { children: React.ReactNode; headerContent?: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userPlan, logout } = useAppState();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white/90 p-6 backdrop-blur lg:flex">
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Sparkles className="h-6 w-6 text-brand-blue" />
          MeliTracker
        </Link>
        <p className="mt-1 text-xs text-slate-500">Monitorea tu competencia en ML</p>
        <div className="mt-6 flex flex-col gap-2">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
                  active ? "bg-brand-blue text-white shadow-sm" : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="mt-auto rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Plan</p>
          <p className="text-base font-semibold text-slate-900">{userPlan.name}</p>
          <p className="text-xs text-slate-600">{userPlan.trackerLimit} trackers · {userPlan.minIntervalMinutes} min</p>
          <Link href="/pricing" className="btn-primary mt-3 w-full text-center text-sm">
            Upgrade
          </Link>
        </div>
      </aside>
      <main className="flex-1">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 lg:hidden">
                <Sparkles className="h-6 w-6 text-brand-blue" />
                <span className="text-lg font-semibold text-slate-900">MeliTracker</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                Plan {userPlan.name}
              </div>
              <div className="flex items-center gap-3 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-bold text-brand-blue">
                  {user.name[0]}
                </div>
                <div className="hidden flex-col leading-tight sm:flex">
                  <span className="text-sm font-semibold text-slate-900">{user.name}</span>
                  <span className="text-xs text-slate-500">{user.email}</span>
                </div>
                <button onClick={() => { logout(); router.push("/login"); }} className="btn-secondary ml-2 inline-flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
            {headerContent}
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
