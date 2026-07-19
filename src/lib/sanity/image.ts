import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityConfig } from "@/lib/sanity/client";

const builder = createImageUrlBuilder(sanityConfig);


/**
 * Build an optimized Sanity image URL. In Phase 3 these URLs can be transparently
 * routed through Cloudflare R2 by swapping this builder for an adapter.
 */
export function sanityImage(source: SanityImageSource | undefined | null) {
  if (!source) return null;
  return builder.image(source);
}

export type SanityImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "jpg" | "png";
  blur?: number;
  fit?: "crop" | "fill" | "max" | "scale" | "min";
};

/** Returns a fully-qualified URL string for a Sanity image, or null if absent. */
export function imageUrl(
  source: SanityImageSource | undefined | null,
  options: SanityImageOptions = {},
): string | null {
  const img = sanityImage(source);
  if (!img) return null;
  let chain = img;
  if (options.width) chain = chain.width(options.width);
  if (options.height) chain = chain.height(options.height);
  if (options.quality) chain = chain.quality(options.quality);
  if (options.format) chain = chain.format(options.format);
  if (options.fit) chain = chain.fit(options.fit);
  if (options.blur) chain = chain.blur(options.blur);
  return chain.url();
}
