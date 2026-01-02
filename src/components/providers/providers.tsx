"use client";

import { AppStateProvider } from "@/components/providers/app-state-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AppStateProvider>{children}</AppStateProvider>
    </ToastProvider>
  );
}
