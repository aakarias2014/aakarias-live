-- ============================================================
-- Aakar IAS — Enable Public / Anon Insert RLS Policies for Leads
-- ============================================================

-- Allow anonymous visitors to submit contact messages & lead inquiries
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'anon_insert_contact_messages'
  ) THEN
    CREATE POLICY "anon_insert_contact_messages"
      ON public.contact_messages FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- Allow anonymous visitors to subscribe to WhatsApp updates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'whatsapp_subscribers' AND policyname = 'anon_insert_whatsapp_subscribers'
  ) THEN
    CREATE POLICY "anon_insert_whatsapp_subscribers"
      ON public.whatsapp_subscribers FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'whatsapp_subscribers' AND policyname = 'anon_update_whatsapp_subscribers'
  ) THEN
    CREATE POLICY "anon_update_whatsapp_subscribers"
      ON public.whatsapp_subscribers FOR UPDATE
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- Allow anonymous visitors to subscribe to newsletter
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'newsletter_subscribers' AND policyname = 'anon_insert_newsletter_subscribers'
  ) THEN
    CREATE POLICY "anon_insert_newsletter_subscribers"
      ON public.newsletter_subscribers FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;
