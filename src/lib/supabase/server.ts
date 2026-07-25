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
import ws from "ws";

let _serverClient: SupabaseClient<Database> | null = null;

export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("[supabase] Critical Error: Missing NEXT_PUBLIC_SUPABASE_URL or Supabase keys.");
    return null;
  }

  if (!_serverClient) {
    try {
      _serverClient = createClient<Database>(url, key, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
        realtime: {
          transport: ws,
        },
      });
    } catch (err) {
      console.error("[supabase] Failed to initialize Supabase server client:", err);
      return null;
    }
  }
  return _serverClient;
}
