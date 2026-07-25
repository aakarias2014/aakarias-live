import { sanityFetch } from "@/lib/sanity/fetch";
import { TopAnnouncementBar } from "./top-announcement-bar";

type BannerData = {
  offerBadge?: string;
  offerDateText?: string;
  endDate?: string;
  phoneContact?: string;
  whatsappContact?: string;
  isActive?: boolean;
} | null;

/**
 * Server wrapper component that fetches active offer data from Sanity CMS
 * and renders the sticky Top Announcement Bar.
 */
export async function TopAnnouncementBarWrapper() {
  let bannerData: BannerData = null;

  try {
    bannerData = await sanityFetch<BannerData>({
      query: `*[_type == "popupBanner" && isActive == true] | order(_updatedAt desc)[0]{
        offerBadge,
        offerDateText,
        endDate,
        phoneContact,
        whatsappContact,
        isActive
      }`,
      revalidate: process.env.NODE_ENV === "development" ? 0 : 60,
      tags: ["popupBanner"],
    });
  } catch (err) {
    console.error("Failed to fetch top announcement banner from Sanity:", err);
  }

  return (
    <TopAnnouncementBar
      offerBadge={bannerData?.offerBadge || "🌧️ मानसून मेगा ऑफर!"}
      offerDateText={bannerData?.offerDateText || "24 से 28 जुलाई तक"}
      endDate={bannerData?.endDate || "2026-07-28T23:59:59.000Z"}
      phoneContact={bannerData?.phoneContact || "+91 9713300123"}
      whatsappContact={bannerData?.whatsappContact || "919713300123"}
      targetLink="/#courses"
      isActive={bannerData?.isActive ?? true}
    />
  );
}
