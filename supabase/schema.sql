-- =====================================================
-- Elite Chauffeurs Australia — Supabase Schema
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── CUSTOMERS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT UNIQUE NOT NULL,
  phone         TEXT,
  total_bookings INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── DRIVERS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS drivers (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name      TEXT NOT NULL,
  last_name       TEXT NOT NULL,
  email           TEXT UNIQUE NOT NULL,
  phone           TEXT NOT NULL,
  license_number  TEXT,
  profile_photo   TEXT,
  rating          DECIMAL(3,2) DEFAULT 5.0,
  total_trips     INT DEFAULT 0,
  status          TEXT DEFAULT 'offline' CHECK (status IN ('available','on_trip','offline')),
  is_approved     BOOLEAN DEFAULT FALSE,
  current_lat     DECIMAL(10,7),
  current_lng     DECIMAL(10,7),
  location_updated_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── VEHICLES ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vehicles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id   UUID REFERENCES drivers(id) ON DELETE SET NULL,
  make        TEXT NOT NULL,
  model       TEXT NOT NULL,
  year        INT NOT NULL,
  color       TEXT,
  license_plate TEXT NOT NULL,
  category    TEXT NOT NULL CHECK (category IN ('sedan','suv','luxury','van','stretch_limo')),
  capacity    INT NOT NULL DEFAULT 3,
  photo       TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PRICING CONFIG ────────────────────────────────────
CREATE TABLE IF NOT EXISTS pricing_config (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_category    TEXT UNIQUE NOT NULL,
  base_rate_per_km    DECIMAL(10,2) NOT NULL,
  minimum_fare        DECIMAL(10,2) NOT NULL,
  airport_surcharge   DECIMAL(10,2) DEFAULT 0,
  after_hours_mult    DECIMAL(4,2) DEFAULT 1.0,
  booking_fee         DECIMAL(10,2) DEFAULT 5.0,
  wedding_flat_rate   DECIMAL(10,2),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_by          UUID REFERENCES auth.users(id)
);

-- Seed default pricing
INSERT INTO pricing_config (vehicle_category, base_rate_per_km, minimum_fare, airport_surcharge, after_hours_mult, booking_fee) VALUES
  ('sedan',        2.80, 65.00, 15.00, 1.25, 5.00),
  ('suv',          3.50, 85.00, 20.00, 1.25, 5.00),
  ('luxury',       5.50, 130.00, 30.00, 1.30, 10.00),
  ('van',          4.00, 100.00, 25.00, 1.20, 5.00),
  ('stretch_limo', 8.00, 200.00, 50.00, 1.35, 15.00)
ON CONFLICT (vehicle_category) DO NOTHING;

-- ─── BOOKINGS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id         UUID REFERENCES customers(id) ON DELETE SET NULL,
  driver_id           UUID REFERENCES drivers(id) ON DELETE SET NULL,
  vehicle_id          UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  booking_type        TEXT NOT NULL CHECK (booking_type IN ('airport_transfer','corporate','wedding','special_event','hourly')),
  vehicle_category    TEXT NOT NULL,
  status              TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','driver_assigned','en_route','arrived','in_progress','completed','cancelled')),
  scheduled_at        TIMESTAMPTZ NOT NULL,
  passengers          INT DEFAULT 1,
  luggage             INT DEFAULT 0,
  special_requests    TEXT,
  flight_number       TEXT,
  -- Location
  pickup_address      TEXT NOT NULL,
  pickup_lat          DECIMAL(10,7),
  pickup_lng          DECIMAL(10,7),
  dropoff_address     TEXT NOT NULL,
  dropoff_lat         DECIMAL(10,7),
  dropoff_lng         DECIMAL(10,7),
  -- Route
  distance_km         DECIMAL(8,2),
  duration_minutes    INT,
  -- Pricing
  base_charge         DECIMAL(10,2),
  booking_fee         DECIMAL(10,2),
  airport_surcharge   DECIMAL(10,2) DEFAULT 0,
  after_hours_surcharge DECIMAL(10,2) DEFAULT 0,
  gst                 DECIMAL(10,2),
  total_amount        DECIMAL(10,2),
  currency            TEXT DEFAULT 'AUD',
  -- Payment
  payment_status      TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','refunded','failed')),
  stripe_payment_id   TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ─── RATINGS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ratings (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id  UUID REFERENCES bookings(id) ON DELETE CASCADE,
  driver_id   UUID REFERENCES drivers(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  rating      INT CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ROW LEVEL SECURITY ────────────────────────────────
ALTER TABLE customers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings        ENABLE ROW LEVEL SECURITY;

-- Customers: can only see/edit own data
CREATE POLICY "customers_own" ON customers FOR ALL USING (auth.uid() = id);

-- Bookings: customers see own bookings; service role sees all
CREATE POLICY "bookings_customer_read"  ON bookings FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "bookings_customer_insert" ON bookings FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Drivers: approved drivers see own data
CREATE POLICY "drivers_own" ON drivers FOR ALL USING (auth.uid() = user_id);

-- Pricing config: public read, admin write (via service role)
CREATE POLICY "pricing_public_read" ON pricing_config FOR SELECT USING (true);

-- ─── REALTIME (for live driver tracking) ──────────────
ALTER PUBLICATION supabase_realtime ADD TABLE drivers;
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;

-- ─── UPDATED_AT triggers ──────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookings_updated_at  BEFORE UPDATE ON bookings  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
