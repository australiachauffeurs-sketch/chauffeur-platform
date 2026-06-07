DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='loyalty_points') THEN
    ALTER TABLE user_profiles ADD COLUMN loyalty_points INTEGER DEFAULT 0;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='loyalty_tier') THEN
    ALTER TABLE user_profiles ADD COLUMN loyalty_tier TEXT DEFAULT 'Silver' CHECK (loyalty_tier IN ('Silver','Gold','Platinum'));
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS loyalty_transactions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id  UUID REFERENCES bookings(id) ON DELETE SET NULL,
  points      INTEGER NOT NULL,
  type        TEXT NOT NULL CHECK (type IN ('earn','redeem')),
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "loyalty_owner" ON loyalty_transactions USING (auth.uid() = user_id);
