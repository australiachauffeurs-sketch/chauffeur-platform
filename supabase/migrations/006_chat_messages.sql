CREATE TABLE IF NOT EXISTS chat_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id  UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  sender_role TEXT NOT NULL CHECK (sender_role IN ('customer', 'driver')),
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  is_read     BOOLEAN DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_chat_booking ON chat_messages(booking_id, created_at);
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "chat_public_read" ON chat_messages;
CREATE POLICY "chat_public_read" ON chat_messages FOR SELECT USING (true);
DROP POLICY IF EXISTS "chat_public_insert" ON chat_messages;
CREATE POLICY "chat_public_insert" ON chat_messages FOR INSERT WITH CHECK (true);
-- Add to realtime
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages; EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Add customer_push_token column to bookings if not already present
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='customer_push_token') THEN
    ALTER TABLE bookings ADD COLUMN customer_push_token TEXT;
  END IF;
END $$;
