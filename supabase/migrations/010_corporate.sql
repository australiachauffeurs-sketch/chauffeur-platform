CREATE TABLE IF NOT EXISTS corporate_accounts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  abn          TEXT,
  billing_email TEXT NOT NULL,
  billing_address TEXT,
  credit_limit DECIMAL(10,2) DEFAULT 5000,
  current_balance DECIMAL(10,2) DEFAULT 0,
  payment_terms INTEGER DEFAULT 30, -- days
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='corporate_account_id') THEN
    ALTER TABLE bookings ADD COLUMN corporate_account_id UUID REFERENCES corporate_accounts(id) ON DELETE SET NULL;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='cost_centre') THEN
    ALTER TABLE bookings ADD COLUMN cost_centre TEXT;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='po_number') THEN
    ALTER TABLE bookings ADD COLUMN po_number TEXT;
  END IF;
END $$;
