import { AlertsPreference, Event, Plan, PlanId, Tracker, User } from "./types";

export const plans: Plan[] = [
  {
    id: "FREE",
    name: "Free",
    trackerLimit: 3,
    minIntervalMinutes: 30,
    priceMonthly: 0,
    perks: ["3 trackers", "30 min checks", "Email summaries"],
  },
  {
    id: "STARTER",
    name: "Starter",
    trackerLimit: 10,
    minIntervalMinutes: 15,
    priceMonthly: 19,
    perks: ["10 trackers", "15 min checks", "Basic alerts"],
  },
  {
    id: "PRO",
    name: "Pro",
    trackerLimit: 25,
    minIntervalMinutes: 10,
    priceMonthly: 39,
    perks: ["25 trackers", "10 min checks", "Alerts + webhooks"],
  },
  {
    id: "BUSINESS",
    name: "Business",
    trackerLimit: 60,
    minIntervalMinutes: 5,
    priceMonthly: 79,
    perks: ["60 trackers", "5 min checks", "Team seats + SLA"],
  },
];

export const planIntervals: Record<PlanId, number> = {
  FREE: 30,
  STARTER: 15,
  PRO: 10,
  BUSINESS: 5,
};

export const defaultUser: User = {
  id: "user_1",
  name: "Meli Seller",
  email: "seller@example.com",
  plan: "FREE",
};

const now = new Date();
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

export const initialTrackers: Tracker[] = [
  {
    id: "trk_1",
    label: "iPhone 13 128gb",
    source: "ML",
    queryText: "iphone 13 128gb",
    intervalMinutes: 30,
    status: "ACTIVE",
    createdAt: daysAgo(10),
    lastCheckedAt: daysAgo(0),
    stats: { newListings: 4, priceChanges: 2, ended: 1 },
  },
  {
    id: "trk_2",
    label: "Samsung Galaxy S23",
    source: "ML",
    queryText: "samsung galaxy s23",
    intervalMinutes: 30,
    status: "PAUSED",
    createdAt: daysAgo(14),
    lastCheckedAt: daysAgo(1),
    stats: { newListings: 7, priceChanges: 3, ended: 0 },
  },
  {
    id: "trk_3",
    label: "Macbook Air M2",
    source: "ML",
    queryText: "macbook air m2",
    intervalMinutes: 30,
    status: "ACTIVE",
    createdAt: daysAgo(20),
    lastCheckedAt: daysAgo(0.5),
    stats: { newListings: 2, priceChanges: 1, ended: 0 },
  },
];

export const defaultAlerts: AlertsPreference = {
  NEW_LISTING: true,
  PRICE_DOWN: true,
  PRICE_UP: false,
  ENDED: true,
};

const eventTemplates: Omit<Event, "id" | "trackerId" | "createdAt">[] = [
  {
    type: "NEW_LISTING",
    title: "Nuevo listing destacado",
    price: 999,
    url: "https://articulo.mercadolibre.com.ar/MLA-123456789",
  },
  {
    type: "PRICE_DOWN",
    title: "Bajada de precio en publicación",
    price: 899,
    oldPrice: 999,
    url: "https://articulo.mercadolibre.com.ar/MLA-987654321",
  },
  {
    type: "PRICE_UP",
    title: "Ajuste al alza",
    price: 1050,
    oldPrice: 999,
    url: "https://articulo.mercadolibre.com.ar/MLA-11111111",
  },
  {
    type: "ENDED",
    title: "Publicación finalizada",
    price: 0,
    url: "https://articulo.mercadolibre.com.ar/MLA-22222222",
  },
];

export const mockEvents: Record<string, Event[]> = Object.fromEntries(
  initialTrackers.map((tracker, idx) => {
    const events: Event[] = Array.from({ length: 10 }).map((_, i) => {
      const template = eventTemplates[(i + idx) % eventTemplates.length];
      const createdAt = new Date(now.getTime() - (i + idx) * 3 * 60 * 60 * 1000).toISOString();
      return {
        id: `evt_${tracker.id}_${i}`,
        trackerId: tracker.id,
        createdAt,
        ...template,
      };
    });
    return [tracker.id, events];
  })
);
