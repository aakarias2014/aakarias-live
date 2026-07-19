-- ============================================================
-- Aakar IAS — Supabase Phase 2 Initial Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Newsletter Subscribers ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL UNIQUE,
  locale      TEXT NOT NULL DEFAULT 'hi' CHECK (locale IN ('hi', 'en')),
  source      TEXT,          -- 'footer' | 'article' | 'homepage'
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email   ON public.newsletter_subscribers (email);
CREATE INDEX IF NOT EXISTS idx_newsletter_locale  ON public.newsletter_subscribers (locale);
CREATE INDEX IF NOT EXISTS idx_newsletter_active  ON public.newsletter_subscribers (active);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER newsletter_updated_at
  BEFORE UPDATE ON public.newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── Contact Messages ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  subject     TEXT,
  message     TEXT NOT NULL,
  locale      TEXT NOT NULL DEFAULT 'hi' CHECK (locale IN ('hi', 'en')),
  user_agent  TEXT,
  status      TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_status     ON public.contact_messages (status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_email      ON public.contact_messages (email);

-- ─── Downloads Tracker ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.downloads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_slug TEXT NOT NULL,
  title         TEXT NOT NULL,
  kind          TEXT NOT NULL DEFAULT 'monthly_pdf' CHECK (kind IN ('monthly_pdf', 'pyq', 'syllabus', 'free_pdf')),
  locale        TEXT NOT NULL DEFAULT 'hi' CHECK (locale IN ('hi', 'en')),
  url           TEXT NOT NULL,
  count         INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (resource_slug, locale)
);

CREATE INDEX IF NOT EXISTS idx_downloads_slug   ON public.downloads (resource_slug);
CREATE INDEX IF NOT EXISTS idx_downloads_kind   ON public.downloads (kind);
CREATE INDEX IF NOT EXISTS idx_downloads_count  ON public.downloads (count DESC);

CREATE TRIGGER downloads_updated_at
  BEFORE UPDATE ON public.downloads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── Row Level Security ──────────────────────────────────────────────────────
-- Allow service role full access (used from Server Actions).
-- Anon role can only read download counts (for public display).

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads              ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS automatically.

-- Downloads: public read access for counts
CREATE POLICY "public_read_downloads"
  ON public.downloads FOR SELECT
  TO anon
  USING (true);

-- ─── Helper: upsert_download ─────────────────────────────────────────────────
-- Called from the download Server Action to atomically increment count.
CREATE OR REPLACE FUNCTION public.upsert_download(
  p_slug  TEXT,
  p_title TEXT,
  p_kind  TEXT,
  p_url   TEXT,
  p_locale TEXT
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.downloads (resource_slug, title, kind, url, locale, count)
  VALUES (p_slug, p_title, p_kind, p_url, p_locale, 1)
  ON CONFLICT (resource_slug, locale)
  DO UPDATE SET count = downloads.count + 1, updated_at = NOW();
END;
$$;
