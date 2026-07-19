/**
 * Supabase browser client (Phase 2).
 *
 * Exports a lazy singleton. Returns null when Supabase is not configured so
 * all callers can gracefully degrade without crashing.
 */

import { createBrowserClient } from "@supabase/ssr";
import { type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

let _client: SupabaseClient<Database> | null = null;

export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  if (!_client) {
    _client = createBrowserClient<Database>(url, key);
  }
  return _client;
}
