-- Add payment_method column if missing
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='payment_method') THEN
    ALTER TABLE bookings ADD COLUMN payment_method TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash','bank_transfer','invoice','complimentary'));
  END IF;
END $$;

-- Add payment_status column if missing
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='payment_status') THEN
    ALTER TABLE bookings ADD COLUMN payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','waived'));
  END IF;
END $$;

-- Add paid_at column if missing
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='paid_at') THEN
    ALTER TABLE bookings ADD COLUMN paid_at TIMESTAMPTZ;
  END IF;
END $$;

-- Add payment_notes column if missing
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='payment_notes') THEN
    ALTER TABLE bookings ADD COLUMN payment_notes TEXT;
  END IF;
END $$;
