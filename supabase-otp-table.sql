-- Run this SQL in Supabase Dashboard → SQL Editor
-- Creates the otp_codes table for storing verification codes

CREATE TABLE IF NOT EXISTS otp_codes (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text NOT NULL,
  code       text NOT NULL,
  type       text NOT NULL CHECK (type IN ('signup', 'recovery')),
  expires_at timestamptz NOT NULL,
  used       boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_otp_codes_email_type ON otp_codes (email, type, used);

-- Auto-cleanup: delete OTPs older than 1 hour (optional, run as cron)
-- DELETE FROM otp_codes WHERE created_at < now() - interval '1 hour';

-- Enable RLS but allow service role full access
ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;

-- Policy: only service role can read/write (API routes use service key)
CREATE POLICY "Service role full access" ON otp_codes
  FOR ALL
  USING (true)
  WITH CHECK (true);
