-- Driver document expiry fields and onboarding flag

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='drivers' AND column_name='license_expiry') THEN
    ALTER TABLE drivers ADD COLUMN license_expiry DATE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='drivers' AND column_name='insurance_expiry') THEN
    ALTER TABLE drivers ADD COLUMN insurance_expiry DATE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='drivers' AND column_name='registration_expiry') THEN
    ALTER TABLE drivers ADD COLUMN registration_expiry DATE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='drivers' AND column_name='onboarding_complete') THEN
    ALTER TABLE drivers ADD COLUMN onboarding_complete BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='drivers' AND column_name='vehicle_make') THEN
    ALTER TABLE drivers ADD COLUMN vehicle_make TEXT;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='drivers' AND column_name='vehicle_model') THEN
    ALTER TABLE drivers ADD COLUMN vehicle_model TEXT;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='drivers' AND column_name='vehicle_year') THEN
    ALTER TABLE drivers ADD COLUMN vehicle_year INTEGER;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='drivers' AND column_name='vehicle_plate') THEN
    ALTER TABLE drivers ADD COLUMN vehicle_plate TEXT;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='drivers' AND column_name='vehicle_category') THEN
    ALTER TABLE drivers ADD COLUMN vehicle_category TEXT;
  END IF;
END $$;
