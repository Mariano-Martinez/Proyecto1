export type PlanId = "FREE" | "STARTER" | "PRO" | "BUSINESS";

export type User = {
  id: string;
  name: string;
  email: string;
  plan: PlanId;
};

export type Plan = {
  id: PlanId;
  name: string;
  trackerLimit: number;
  minIntervalMinutes: number;
  priceMonthly: number;
  perks: string[];
};

export type TrackerStatus = "ACTIVE" | "PAUSED";

export type Tracker = {
  id: string;
  label: string;
  source: "ML";
  queryText?: string;
  searchUrl?: string;
  intervalMinutes: number;
  status: TrackerStatus;
  createdAt: string;
  lastCheckedAt: string;
  stats: {
    newListings: number;
    priceChanges: number;
    ended: number;
  };
};

export type EventType = "NEW_LISTING" | "PRICE_DOWN" | "PRICE_UP" | "ENDED";

export type Event = {
  id: string;
  trackerId: string;
  type: EventType;
  title: string;
  price: number;
  oldPrice?: number;
  url?: string;
  createdAt: string;
};

export type SearchResult = {
  id: string;
  title: string;
  price: number;
  seller: string;
  location: string;
  thumbnail: string;
  link: string;
};

export type AlertsPreference = {
  NEW_LISTING: boolean;
  PRICE_DOWN: boolean;
  PRICE_UP: boolean;
  ENDED: boolean;
};
