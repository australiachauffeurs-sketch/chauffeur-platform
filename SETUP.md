# Elite Chauffeurs Australia — Setup Guide

## What's Been Built

| App | Location | Port | Description |
|-----|----------|------|-------------|
| Customer Website | `apps/web` | 3000 | Booking, auth, dashboard |
| Admin Panel | `apps/admin` | 3001 | Bookings, drivers, pricing |
| Customer Mobile | `apps/mobile` | Expo | iOS + Android customer app |
| Driver Mobile | `apps/driver` | Expo | iOS + Android driver app |

---

## Step 1 — Set Up Supabase (Free)

1. Go to **https://supabase.com** → Create a new project
2. Copy your project URL and keys from **Settings → API**
3. Go to **SQL Editor** → paste the entire contents of `supabase/schema.sql` → Run
4. Done — your database, auth, and realtime are ready

---

## Step 2 — Set Up Google Maps (Free $200/month credit)

1. Go to **https://console.cloud.google.com**
2. Create a project → Enable these APIs:
   - **Distance Matrix API**
   - **Places API**
   - **Maps JavaScript API**
3. Create an API key under **Credentials**

---

## Step 3 — Set Up Stripe (No monthly fee)

1. Go to **https://dashboard.stripe.com**
2. Get your **publishable key** and **secret key**
3. For webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

---

## Step 4 — Configure Environment Variables

**For web app** (`apps/web/.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
GOOGLE_MAPS_API_KEY=AIza...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**For admin app** (`apps/admin/.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

**For mobile apps** (`apps/mobile/.env` and `apps/driver/.env`):
```
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
EXPO_PUBLIC_API_URL=http://localhost:3000
```

---

## Step 5 — Run the Apps

```bash
# From root — run BOTH web + admin simultaneously
npm run dev

# OR run individually
cd apps/web   && npm run dev   # → http://localhost:3000
cd apps/admin && npm run dev   # → http://localhost:3001

# Customer mobile app
cd apps/mobile && npx expo start
# Press 'i' for iOS simulator, 'a' for Android emulator, scan QR for device

# Driver mobile app
cd apps/driver && npx expo start
```

---

## Step 6 — Deploy to Production

### Web + Admin → Vercel (Free)
```bash
npm install -g vercel
cd apps/web   && vercel --prod
cd apps/admin && vercel --prod
```

### Mobile → Expo EAS (Free tier)
```bash
npm install -g eas-cli
eas login
eas build --platform all    # builds both iOS + Android
eas submit --platform all   # submits to App Store + Play Store
```

---

## Pricing — How It Works

The pricing engine lives in `packages/utils/src/pricing.ts`.

- Admin updates rates at `http://localhost:3001/pricing`
- Changes saved to Supabase `pricing_config` table
- All new bookings immediately use the updated rates
- GST (10%) is automatically added at checkout
- After-hours surcharge applies before 6am and after 10pm

---

## Architecture Summary

```
Customer Browser/App
        ↓
  Next.js API (Vercel)   ← all business logic lives here
        ↓
  Supabase (PostgreSQL + Auth + Realtime)

Driver App → Supabase Realtime → Customer App (live tracking)
Admin Panel → Supabase (direct service role queries)
```

---

## Key Files

| File | Purpose |
|------|---------|
| `packages/utils/src/pricing.ts` | Core pricing engine |
| `packages/utils/src/types.ts` | Shared TypeScript types |
| `apps/web/app/api/pricing/distance/route.ts` | Google Maps distance calc |
| `apps/web/app/api/pricing/quote/route.ts` | Live price quotes |
| `apps/web/app/api/booking/create/route.ts` | Create booking |
| `supabase/schema.sql` | Full database schema |
| `apps/admin/app/(admin)/pricing/page.tsx` | Admin pricing editor |
| `apps/driver/src/screens/ActiveTripScreen.tsx` | Driver trip flow |
