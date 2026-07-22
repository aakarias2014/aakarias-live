import { sanityFetch } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";
import { ScrollInquiryModal } from "./scroll-inquiry-modal";

type PopupBannerData = {
  image: unknown;
  altText: string | null;
  isActive: boolean;
} | null;

/**
 * Server wrapper that fetches the popup banner image from Sanity
 * and passes the resolved URL to the client-side ScrollInquiryModal.
 */
export async function ScrollInquiryModalWrapper() {
  let posterUrl = "/images/ads/inquiry-poster.png"; // fallback
  let posterAlt = "Aakar IAS Academy — Admission Open 2026-27";

  try {
    const banner = await sanityFetch<PopupBannerData>({
      query: `*[_type == "popupBanner" && isActive == true] | order(_updatedAt desc)[0]{
        image,
        altText,
        isActive
      }`,
      revalidate: process.env.NODE_ENV === "development" ? 0 : 60,
      tags: ["popupBanner"],
    });

    if (banner?.image) {
      const url = imageUrl(banner.image, { width: 800, quality: 85, format: "webp" });
      if (url) posterUrl = url;
      if (banner.altText) posterAlt = banner.altText;
    }
  } catch (err) {
    console.error("Failed to fetch popup banner from Sanity:", err);
    // Fallback to static image silently
  }

  return <ScrollInquiryModal posterUrl={posterUrl} posterAlt={posterAlt} />;
}
