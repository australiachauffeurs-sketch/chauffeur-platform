CREATE TABLE IF NOT EXISTS surge_rules (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  multiplier  DECIMAL(4,2) NOT NULL DEFAULT 1.0,
  is_active   BOOLEAN DEFAULT FALSE,
  applies_to  TEXT DEFAULT 'all', -- 'all', 'airport', 'corporate' etc
  reason      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO surge_rules (name, multiplier, applies_to, reason) VALUES
  ('Friday Night', 1.3, 'all', 'High demand Friday evenings'),
  ('Event Surge',  1.5, 'all', 'Major events in the city'),
  ('Peak Morning', 1.2, 'all', 'Morning rush 7-9am'),
  ('Holiday',      1.4, 'all', 'Public holidays')
ON CONFLICT DO NOTHING;
