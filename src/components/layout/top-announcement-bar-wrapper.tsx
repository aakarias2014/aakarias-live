import { sanityFetch } from "@/lib/sanity/fetch";
import { TopAnnouncementBar } from "./top-announcement-bar";

type BannerData = {
  offerBadge?: string;
  offerDateText?: string;
  endDate?: string;
  step1Text?: string;
  step2Text?: string;
  buttonText?: string;
  buttonLink?: string;
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
        step1Text,
        step2Text,
        buttonText,
        buttonLink,
        phoneContact,
        whatsappContact,
        isActive
      }`,
      revalidate: process.env.NODE_ENV === "development" ? 0 : 3600,
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
      step1Text={bannerData?.step1Text || "🌧️ MPPSC Mains 2027 Batch — ₹21,999/- (विशेष छूट)"}
      step2Text={bannerData?.step2Text || "⚡ Pre + Mains Hybrid Batch — ₹40,000/- (विशेष छूट)"}
      buttonText={bannerData?.buttonText || "ऑफर देखें"}
      targetLink={bannerData?.buttonLink || "/#courses"}
      phoneContact={bannerData?.phoneContact || "+91 9713300123"}
      whatsappContact={bannerData?.whatsappContact || "919713300123"}
      isActive={bannerData?.isActive ?? true}
    />
  );
}
