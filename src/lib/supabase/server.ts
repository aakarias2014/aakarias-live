/**
 * Supabase server client (Phase 2).
 *
 * Uses the service role key for server-side mutations (Server Actions).
 * NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 *
 * Returns null when not configured so Server Actions degrade gracefully
 * (Phase 1 behaviour: log but don't persist).
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

let _serverClient: SupabaseClient<Database> | null = null;

export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("[supabase] Critical Error: Missing NEXT_PUBLIC_SUPABASE_URL or Supabase keys.");
    return null;
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("[supabase] Warning: SUPABASE_SERVICE_ROLE_KEY is not set in environment variables. Falling back to ANON key. Ensure RLS policies allow inserts.");
  }

  if (!_serverClient) {
    _serverClient = createClient<Database>(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return _serverClient;
}
