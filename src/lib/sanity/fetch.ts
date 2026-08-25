import { sanityClient } from "@/lib/sanity/client";

/**
 * Typed GROQ fetch helper with revalidation support for ISR.
 *
 * Uses the CDN-backed public client (no token) → counts against
 * the 12M CDN Request quota, NOT the 3M direct API quota.
 * In development, requests bypass cache for fresh data every time.
 *
 * @example
 * const article = await sanityFetch<Article>({
 *   query: `*[_type == "article" && slug.current == $slug][0]{ ... }`,
 *   params: { slug },
 *   tags: [`article:${slug}`],
 * });
 */

export type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  /** Revalidate this request at most every N seconds (ISR). */
  revalidate?: number;
  /** Cache tags for on-demand ISR invalidation via the revalidate webhook. */
  tags?: string[];
};

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate,
  tags,
}: SanityFetchOptions): Promise<T> {
  const isDev = process.env.NODE_ENV === "development";
  try {
    return await sanityClient.fetch<T>(query, params, {
      ...(isDev
        ? { cache: "no-store" }
        : revalidate !== undefined
          ? { next: { revalidate, tags } }
          : tags?.length
            ? { next: { tags } }
            : { next: { revalidate: 3600 } }), // default 1hr ISR cache
    });
  } catch (err: any) {
    console.error("[Sanity Fetch Error]:", err?.message ?? err);
    return null as T;
  }
}

export { sanityClient };
