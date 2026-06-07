-- =====================================================
-- Migration: Add push_token column to drivers table
-- =====================================================

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'drivers' AND column_name = 'push_token'
  ) THEN
    ALTER TABLE drivers ADD COLUMN push_token TEXT;
  END IF;
END $$;
