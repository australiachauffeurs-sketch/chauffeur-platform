-- Leads captured from the website quote form
CREATE TABLE IF NOT EXISTS leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT,
  email       TEXT,
  phone       TEXT,
  pickup      TEXT,
  dropoff     TEXT,
  service     TEXT,
  travel_date TEXT,
  source_page TEXT,
  status      TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','converted','closed')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- service-role only (API uses admin client); no public policies on purpose
