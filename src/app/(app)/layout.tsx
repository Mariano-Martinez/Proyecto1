"use client";

import { useAppState } from "@/components/providers/app-state-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppState();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
}
