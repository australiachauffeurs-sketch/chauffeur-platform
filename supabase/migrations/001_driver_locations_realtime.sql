-- =====================================================
-- Migration: Driver Locations Table + Realtime
-- =====================================================

-- Create table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS driver_locations (
  driver_id   UUID PRIMARY KEY REFERENCES drivers(id) ON DELETE CASCADE,
  lat         DECIMAL(10, 7) NOT NULL,
  lng         DECIMAL(10, 7) NOT NULL,
  heading     DECIMAL(5, 2),
  speed       DECIMAL(6, 2),
  accuracy    DECIMAL(8, 2),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Add booking_id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'driver_locations' AND column_name = 'booking_id'
  ) THEN
    ALTER TABLE driver_locations
      ADD COLUMN booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Add heading if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'driver_locations' AND column_name = 'heading'
  ) THEN
    ALTER TABLE driver_locations ADD COLUMN heading DECIMAL(5, 2);
  END IF;
END $$;

-- Add speed if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'driver_locations' AND column_name = 'speed'
  ) THEN
    ALTER TABLE driver_locations ADD COLUMN speed DECIMAL(6, 2);
  END IF;
END $$;

-- Add accuracy if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'driver_locations' AND column_name = 'accuracy'
  ) THEN
    ALTER TABLE driver_locations ADD COLUMN accuracy DECIMAL(8, 2);
  END IF;
END $$;

-- Index for fast lookups by booking
CREATE INDEX IF NOT EXISTS idx_driver_locations_booking ON driver_locations(booking_id);

-- RLS
ALTER TABLE driver_locations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "driver_locations_public_read" ON driver_locations;
CREATE POLICY "driver_locations_public_read"
  ON driver_locations FOR SELECT USING (true);

-- Enable Realtime (safe — skips if already added)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE driver_locations;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
