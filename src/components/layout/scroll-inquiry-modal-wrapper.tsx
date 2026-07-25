import { sanityFetch } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";
import { ScrollInquiryModal } from "./scroll-inquiry-modal";

export type OfferCourseItem = {
  courseName: string;
  originalPrice?: string;
  offerPrice?: string;
  badgeText?: string;
};

export type PopupBannerData = {
  title?: string;
  offerBadge?: string;
  offerDateText?: string;
  endDate?: string;
  phoneContact?: string;
  whatsappContact?: string;
  image?: unknown;
  altText?: string | null;
  offerCourses?: OfferCourseItem[];
  isActive?: boolean;
} | null;

/**
 * Server wrapper that fetches the popup banner image and offer details from Sanity
 * and passes the data to the client-side ScrollInquiryModal.
 */
export async function ScrollInquiryModalWrapper() {
  let posterUrl = "/images/ads/inquiry-poster.png"; // fallback
  let posterAlt = "Aakar IAS Academy — Admission Open 2026-27";
  let bannerData: PopupBannerData = null;

  try {
    bannerData = await sanityFetch<PopupBannerData>({
      query: `*[_type == "popupBanner" && isActive == true] | order(_updatedAt desc)[0]{
        title,
        offerBadge,
        offerDateText,
        endDate,
        phoneContact,
        whatsappContact,
        image,
        altText,
        offerCourses,
        isActive
      }`,
      revalidate: process.env.NODE_ENV === "development" ? 0 : 60,
      tags: ["popupBanner"],
    });

    if (bannerData?.image) {
      const url = imageUrl(bannerData.image, { width: 800, quality: 85, format: "webp" });
      if (url) posterUrl = url;
      if (bannerData.altText) posterAlt = bannerData.altText;
    }
  } catch (err) {
    console.error("Failed to fetch popup banner from Sanity:", err);
    // Fallback to static image silently
  }

  return (
    <ScrollInquiryModal
      posterUrl={posterUrl}
      posterAlt={posterAlt}
      offerBadge={bannerData?.offerBadge}
      offerDateText={bannerData?.offerDateText}
      endDate={bannerData?.endDate}
      phoneContact={bannerData?.phoneContact || "+91 9713300123"}
      whatsappContact={bannerData?.whatsappContact || "919713300123"}
      offerCourses={bannerData?.offerCourses}
    />
  );
}
