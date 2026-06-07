-- Feature 1: Recurring / Scheduled Bookings
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='is_recurring') THEN
    ALTER TABLE bookings ADD COLUMN is_recurring BOOLEAN DEFAULT FALSE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='recurrence_rule') THEN
    ALTER TABLE bookings ADD COLUMN recurrence_rule TEXT; -- e.g. "weekly:monday", "weekly:monday,friday", "monthly:1"
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='parent_booking_id') THEN
    ALTER TABLE bookings ADD COLUMN parent_booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Feature 3: Multi-Stop Trips — waypoints
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='waypoints') THEN
    ALTER TABLE bookings ADD COLUMN waypoints JSONB DEFAULT '[]';
  END IF;
END $$;
