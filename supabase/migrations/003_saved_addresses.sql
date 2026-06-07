CREATE TABLE IF NOT EXISTS saved_addresses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label       TEXT NOT NULL, -- e.g. "Home", "Work", "Gym"
  address     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_saved_addresses_user ON saved_addresses(user_id);
ALTER TABLE saved_addresses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "saved_addresses_owner" ON saved_addresses;
CREATE POLICY "saved_addresses_owner" ON saved_addresses
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
