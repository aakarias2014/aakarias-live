/**
 * Algolia search adapter — STUB (Phase 5).
 *
 * Defines the `SearchAdapter` interface used by the search UI. Phase 1 uses
 * the Sanity-backed search adapter (GROQ). Phase 5 swaps in Algolia by
 * returning an `AlgoliaAdapter` from `getSearchAdapter()` when configured.
 *
 * To activate (Phase 5):
 *   1. npm i algoliasearch
 *   2. Set NEXT_PUBLIC_ALGOLIA_* + ALGOLIA_* env vars
 *   3. Implement AlgoliaAdapter below and index articles on publish webhook.
 */

import { featureFlags } from "@/lib/env";

export type SearchHit = {
  id: string;
  title: string;
  excerpt?: string;
  href: string;
  category?: string;
  date?: string;
  image?: string | null;
  _highlightResult?: Record<string, { value: string; matchedWords: string[] }>;
};

export interface SearchAdapter {
  search(query: string, options?: { limit?: number; locale?: "hi" | "en" }): Promise<SearchHit[]>;
  trending(): Promise<string[]>;
}

/** Reminder logger so devs know the stub is in use. */
export function algoliaStatus(): { active: boolean; reason?: string } {
  if (featureFlags.algolia) {
    return {
      active: false,
      reason: "Algolia credentials detected — adapter not yet wired (Phase 5 TODO).",
    };
  }
  return { active: false, reason: "Algolia not configured (Phase 5)." };
}
