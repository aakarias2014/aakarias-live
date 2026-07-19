import { sanityClient } from "@/lib/sanity/client";

/**
 * Typed GROQ fetch helpers with revalidation support for ISR.
 * Always returns parsed data typed by the caller.
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
  /** Revalidate this request at most every N seconds. */
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
  return sanityClient.fetch<T>(query, params, {
    ...(isDev
      ? { cache: "no-store" }
      : revalidate !== undefined
        ? { next: { revalidate, tags } }
        : tags?.length
          ? { next: { tags } }
          : {}),
  });
}

export { sanityClient };
