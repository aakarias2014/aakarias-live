-- ============================================================
-- Aakar IAS — Supabase WhatsApp Subscribers Table (Layout Overhaul)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.whatsapp_subscribers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone       TEXT NOT NULL UNIQUE,
  locale      TEXT NOT NULL DEFAULT 'hi' CHECK (locale IN ('hi', 'en')),
  source      TEXT,          -- 'footer' | 'homepage'
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_whatsapp_phone   ON public.whatsapp_subscribers (phone);
CREATE INDEX IF NOT EXISTS idx_whatsapp_locale  ON public.whatsapp_subscribers (locale);
CREATE INDEX IF NOT EXISTS idx_whatsapp_active  ON public.whatsapp_subscribers (active);

-- Trigger for auto-updating updated_at
CREATE TRIGGER whatsapp_updated_at
  BEFORE UPDATE ON public.whatsapp_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE public.whatsapp_subscribers ENABLE ROW LEVEL SECURITY;
