import { createClient } from "next-sanity";
import { env } from "@/lib/env";

/**
 * Configured Sanity client (read). Used by server components, server actions,
 * and route handlers. For live/draft previews use `sanityClient` with
 * `perspective: "previewDrafts"` (Phase 2).
 *
 * @see https://www.sanity.io/plugins/next-sanity
 */

const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset } = env();

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01", // pin a stable GROQ API version
  useCdn: process.env.NODE_ENV === "production", // edge-cached, fast reads in production; fresh reads in dev
  token: env().SANITY_API_READ_TOKEN, // optional; needed for private datasets
  perspective: "published",
  stega: {
    // Stegano encoding powers click-to-edit in Presentation (Phase 2).
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    studioUrl: env().NEXT_PUBLIC_SANITY_STUDIO_URL ?? "/studio",
  },
});

/** Non-CDN client for draft previews / fresh data (Phase 2 live editing). */
export const sanityPreviewClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
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
  apiVersion: "2024-10-01",
} as const;
