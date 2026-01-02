# MeliTracker (prototype)

UI-first prototype (Next.js + TypeScript + TailwindCSS) for a microSaaS that lets Mercado Libre sellers monitor competitor listings. Everything is mocked so you can demo the full flow and later plug real APIs.

## Stack
- Next.js (App Router) + TypeScript
- TailwindCSS
- Lightweight custom components (inspired by shadcn/ui)
- Mock state managed on the client (no database yet)

## Getting started
1. Install dependencies (respecting your proxy if needed):
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000 and use the **Demo login** button to enter the dashboard.

> If you need to adjust network settings, set `HTTPS_PROXY`/`HTTP_PROXY` before installing packages.

## App structure
- `src/app/(auth)/login` – mock login (email/password + demo login).
- `src/app/(app)/dashboard` – main search + mock results + tracker creation.
- `src/app/(app)/trackers` – list and filter trackers.
- `src/app/(app)/trackers/[id]` – tracker detail with mock events and alert toggles.
- `src/app/pricing` – plan cards and upgrade CTA (mock billing).
- `src/app/settings` – profile + notification placeholders.
- `src/lib` – types, mock data, and helpers (search parsing, mock results).
- `src/components` – UI building blocks (AppShell, cards, modals, providers).

## Notes
- Authentication, scraping, and billing are mocked; hooks are in place to swap in real services later.
- Free plan enforces 3 trackers; upgrade CTA opens pricing.
