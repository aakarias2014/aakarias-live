import { createClient } from "next-sanity";
import { env } from "@/lib/env";

/**
 * Sanity client configuration.
 *
 * Strategy for quota management:
 * ─────────────────────────────
 * - `sanityClient`  → CDN-backed, NO token → public reads (uses 12M CDN quota)
 * - `sanityWriteClient` → No CDN, WITH token → writes, previews, fresh data
 *
 * WHY: Sending a token disables CDN caching on Sanity's side.
 * All token-based reads count against the 3M API Request quota (not CDN quota).
 * By using a token-free client for published reads, we get 4× more headroom.
 *
 * @see https://www.sanity.io/plugins/next-sanity
 */

const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset } = env();
const apiVersion = "2024-10-01";

/**
 * PUBLIC READ CLIENT (CDN-backed, no token).
 * Use for all server-side reads of published content.
 * Requests are cached by Sanity's global CDN → counts against 12M CDN quota.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV !== "development", // CDN in prod only
  // NO token → CDN caching works, counts as CDN Request (12M free limit)
  perspective: "published",
  stega: {
    enabled: process.env.NODE_ENV === "development",
    studioUrl: env().NEXT_PUBLIC_SANITY_STUDIO_URL ?? "/studio",
  },
});

/**
 * AUTHENTICATED WRITE/PREVIEW CLIENT (no CDN, with token).
 * Use ONLY for: mutations, draft previews, Studio live-editing.
 * Counts against 3M API Request quota — use sparingly.
 */
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: env().SANITY_API_WRITE_TOKEN,
  perspective: "published",
});

/** Non-CDN client for draft previews / live editing (Phase 2). */
export const sanityPreviewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: env().SANITY_API_READ_TOKEN,
  perspective: "previewDrafts",
  ignoreBrowserTokenWarning: true,
  stega: {
    enabled: true,
    studioUrl: env().NEXT_PUBLIC_SANITY_STUDIO_URL ?? "/studio",
  },
});

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
} as const;
