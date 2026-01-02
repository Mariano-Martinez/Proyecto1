"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { defaultAlerts, defaultUser, initialTrackers, mockEvents, planIntervals, plans } from "@/lib/mockData";
import { AlertsPreference, Event, Plan, PlanId, Tracker, User } from "@/lib/types";

const createId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `id_${Math.random().toString(36).slice(2, 9)}`);

const hydrateAlerts = () => {
  const record: Record<string, AlertsPreference> = {};
  initialTrackers.forEach((tracker) => {
    record[tracker.id] = { ...defaultAlerts };
  });
  return record;
};

type AddTrackerInput = {
  label: string;
  queryText?: string;
  searchUrl?: string;
};

type AppStateContextValue = {
  user: User;
  isAuthenticated: boolean;
  trackers: Tracker[];
  alertsPreferences: Record<string, AlertsPreference>;
  userPlan: Plan;
  login: (email: string) => void;
  demoLogin: () => void;
  logout: () => void;
  setPlan: (plan: PlanId) => void;
  addTracker: (input: AddTrackerInput) => { ok: boolean; reason?: string; tracker?: Tracker };
  toggleTrackerStatus: (id: string) => void;
  updateAlert: (trackerId: string, key: keyof AlertsPreference, value: boolean) => void;
  getEventsForTracker: (trackerId: string) => Event[];
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [trackers, setTrackers] = useState<Tracker[]>(initialTrackers);
  const [alertsPreferences, setAlertsPreferences] = useState<Record<string, AlertsPreference>>(hydrateAlerts);

  const userPlan = useMemo(() => plans.find((p) => p.id === user.plan) || plans[0], [user.plan]);

  const login = useCallback((email: string) => {
    setUser({ ...defaultUser, email, name: email.split("@")[0] || defaultUser.name });
    setIsAuthenticated(true);
  }, []);

  const demoLogin = useCallback(() => {
    setUser(defaultUser);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const setPlan = useCallback((plan: PlanId) => {
    setUser((prev) => ({ ...prev, plan }));
  }, []);

  const addTracker = useCallback(
    (input: AddTrackerInput) => {
      if (trackers.length >= userPlan.trackerLimit) {
        return { ok: false, reason: "limit-reached" as const };
      }
      const newTracker: Tracker = {
        id: createId(),
        label: input.label,
        source: "ML",
        queryText: input.queryText,
        searchUrl: input.searchUrl,
        intervalMinutes: planIntervals[userPlan.id],
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
        lastCheckedAt: new Date().toISOString(),
        stats: { newListings: 0, priceChanges: 0, ended: 0 },
      };
      setTrackers((prev) => [newTracker, ...prev]);
      setAlertsPreferences((prev) => ({ ...prev, [newTracker.id]: { ...defaultAlerts } }));
      mockEvents[newTracker.id] = generateEventsForLabel(newTracker.id, input.label);
      return { ok: true, tracker: newTracker };
    },
    [trackers.length, userPlan.id, userPlan.trackerLimit]
  );

  const toggleTrackerStatus = useCallback((id: string) => {
    setTrackers((prev) =>
      prev.map((tracker) =>
        tracker.id === id
          ? { ...tracker, status: tracker.status === "ACTIVE" ? "PAUSED" : "ACTIVE" }
          : tracker
      )
    );
  }, []);

  const updateAlert = useCallback((trackerId: string, key: keyof AlertsPreference, value: boolean) => {
    setAlertsPreferences((prev) => ({
      ...prev,
      [trackerId]: {
        ...(prev[trackerId] || defaultAlerts),
        [key]: value,
      },
    }));
  }, []);

  const getEventsForTracker = useCallback((trackerId: string) => {
    return mockEvents[trackerId] || [];
  }, []);

  const value: AppStateContextValue = {
    user,
    isAuthenticated,
    trackers,
    alertsPreferences,
    userPlan,
    login,
    demoLogin,
    logout,
    setPlan,
    addTracker,
    toggleTrackerStatus,
    updateAlert,
    getEventsForTracker,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

function generateEventsForLabel(trackerId: string, label: string): Event[] {
  return Array.from({ length: 10 }).map((_, idx) => ({
    id: `evt_${trackerId}_${idx}`,
    trackerId,
    createdAt: new Date(Date.now() - idx * 2 * 60 * 60 * 1000).toISOString(),
    title: `${label} update ${idx + 1}`,
    price: 300 + idx * 15,
    type: idx % 2 === 0 ? "NEW_LISTING" : "PRICE_DOWN",
    oldPrice: idx % 2 === 0 ? undefined : 320 + idx * 15,
    url: "https://articulo.mercadolibre.com.ar/MLA-0000000",
  }));
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
