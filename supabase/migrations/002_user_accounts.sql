-- ============================================================
-- Aakar IAS — Supabase User Accounts Migration (Phase 3)
-- ============================================================

-- ─── User Profiles ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  target_exam TEXT DEFAULT 'Both' CHECK (target_exam IN ('UPSC', 'MPPSC', 'Both')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at for profiles
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── Bookmarks ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id  TEXT NOT NULL,
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'currentAffairs',
  locale      TEXT NOT NULL DEFAULT 'hi' CHECK (locale IN ('hi', 'en')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, article_id)
);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks (user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_article ON public.bookmarks (article_id);

-- ─── Quiz History ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quiz_history (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_slug  TEXT NOT NULL,
  score         INTEGER NOT NULL,
  total         INTEGER NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_history_user ON public.quiz_history (user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_history_created ON public.quiz_history (created_at DESC);

-- ─── Row Level Security ──────────────────────────────────────────────────────
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_history  ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Bookmarks Policies
CREATE POLICY "Users can view their own bookmarks"
  ON public.bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add bookmarks"
  ON public.bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own bookmarks"
  ON public.bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- Quiz History Policies
CREATE POLICY "Users can view their own quiz history"
  ON public.quiz_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can log their quiz attempts"
  ON public.quiz_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ─── Trigger: Auto-create Profile on Sign Up ──────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, target_exam)
  VALUES (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Student'),
    'Both'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check and drop trigger if exists first, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
