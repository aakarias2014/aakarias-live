import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !dataset || !token) {
  console.error("❌ Missing Sanity variables in .env.local!");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function publishMonsoonOffer() {
  console.log("🌧️ Publishing Monsoon Mega Offer to Sanity CMS...");

  // 1. Publish / Update Popup Banner Document
  const popupBannerDoc = {
    _id: "monsoon-mega-offer-2026",
    _type: "popupBanner",
    title: "Monsoon Mega Offer (24-28 July)",
    offerBadge: "🌧️ मानसून मेगा ऑफर",
    offerDateText: "ऑफर सिर्फ 24 से 28 जुलाई के लिए",
    endDate: "2026-07-28T23:59:59.000Z",
    phoneContact: "+91 9713300123",
    whatsappContact: "919713300123",
    altText: "Aakar IAS Monsoon Mega Offer — MPPSC Mains 2027 & Pre+Mains Hybrid Batch",
    isActive: true,
    offerCourses: [
      {
        _key: "mppsc-mains-2027",
        courseName: "MPPSC MAINS 2027 ONLINE LIVE BATCH",
        originalPrice: "24,999",
        offerPrice: "21,999",
        badgeText: "ONLINE LIVE BATCH",
      },
      {
        _key: "mppsc-pre-mains-hybrid",
        courseName: "MPPSC PRE+MAINS ONLINE (HYBRID) BATCH",
        originalPrice: "50,000",
        offerPrice: "40,000",
        badgeText: "RECORDED FROM CLASSROOM",
      },
    ],
  };

  try {
    const existing = await client.getDocument(popupBannerDoc._id);
    if (existing) {
      await client
        .patch(popupBannerDoc._id)
        .set({
          title: popupBannerDoc.title,
          offerBadge: popupBannerDoc.offerBadge,
          offerDateText: popupBannerDoc.offerDateText,
          endDate: popupBannerDoc.endDate,
          phoneContact: popupBannerDoc.phoneContact,
          whatsappContact: popupBannerDoc.whatsappContact,
          offerCourses: popupBannerDoc.offerCourses,
          isActive: true,
        })
        .commit();
      console.log("✅ Updated existing Popup Banner document in Sanity!");
    } else {
      await client.create(popupBannerDoc);
      console.log("✅ Created new Popup Banner document in Sanity!");
    }
  } catch (err) {
    console.warn("⚠️ Popup banner update attempt:", err);
  }

  // 2. Update existing online courses with active monsoon offer
  const courses = await client.fetch<Array<{ _id: string; titleHi?: string; titleEn?: string; price?: string; originalPrice?: string }>>(
    `*[_type == "onlineCourse" && !(_id in path("drafts.**"))]`
  );

  console.log(`Found ${courses.length} online courses in Sanity.`);

  for (const c of courses) {
    const titleHi = c.titleHi || "";
    const titleEn = c.titleEn || "";

    let originalPrice = (c.originalPrice || "24,999").replace(/₹/g, "").trim();
    let offerPrice = (c.price || "21,999").replace(/₹/g, "").trim();
    let badgeHi = "🌧️ मानसून स्पेशल ऑफर";
    let badgeEn = "🌧️ Monsoon Special Offer";

    if (titleHi.includes("2027") || titleEn.includes("2027")) {
      originalPrice = "24,999";
      offerPrice = "21,999";
      badgeHi = "🌧️ मानसून स्पेशल - ₹3,000 की छूट";
      badgeEn = "🌧️ Monsoon Offer - Save ₹3,000";
    } else if (titleHi.includes("प्रारंभिक") || titleHi.includes("Pre") || titleEn.includes("Pre")) {
      originalPrice = "50,000";
      offerPrice = "40,000";
      badgeHi = "🌧️ मानसून स्पेशल - ₹10,000 की छूट";
      badgeEn = "🌧️ Monsoon Offer - Save ₹10,000";
    }

    await client
      .patch(c._id)
      .set({
        originalPrice: originalPrice,
        price: offerPrice,
        isOfferActive: true,
        offerBadgeHi: badgeHi,
        offerBadgeEn: badgeEn,
        offerEndDate: "2026-07-28T23:59:59.000Z",
      })
      .commit();
    console.log(`✅ Cleaned course "${titleHi || titleEn}" -> Price: ₹${offerPrice} (Original: ₹${originalPrice})`);
  }

  console.log("🎉 Monsoon Offer successfully synced & published in Sanity CMS!");
}

publishMonsoonOffer().catch((err) => {
  console.error("❌ Failed to publish Monsoon Offer to Sanity:", err);
  process.exit(1);
});
