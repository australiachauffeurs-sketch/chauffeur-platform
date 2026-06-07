CREATE TABLE IF NOT EXISTS promo_codes (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code         TEXT UNIQUE NOT NULL,
  description  TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  min_booking_amount DECIMAL(10,2) DEFAULT 0,
  max_uses     INTEGER DEFAULT NULL, -- NULL = unlimited
  uses_count   INTEGER DEFAULT 0,
  valid_from   TIMESTAMPTZ DEFAULT NOW(),
  valid_until  TIMESTAMPTZ DEFAULT NULL, -- NULL = no expiry
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Seed some example promo codes
INSERT INTO promo_codes (code, description, discount_type, discount_value, max_uses) VALUES
  ('WELCOME10', 'Welcome discount - 10% off your first ride', 'percent', 10, 1000),
  ('AIRPORT20', '$20 off airport transfers', 'fixed', 20, 500),
  ('VIP15', 'VIP 15% discount', 'percent', 15, 100)
ON CONFLICT (code) DO NOTHING;
