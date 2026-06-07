CREATE TABLE IF NOT EXISTS referrals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_email  TEXT NOT NULL,
  referred_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','completed','rewarded')),
  referrer_credit DECIMAL(10,2) DEFAULT 20.00,
  referred_credit DECIMAL(10,2) DEFAULT 20.00,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  completed_at    TIMESTAMPTZ
);

-- Referral code on users (store in a profile table or bookings)
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id       UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code TEXT UNIQUE NOT NULL,
  referral_credit DECIMAL(10,2) DEFAULT 0,
  total_referrals INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "referrals_owner" ON referrals USING (auth.uid() = referrer_id);
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_owner" ON user_profiles USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
