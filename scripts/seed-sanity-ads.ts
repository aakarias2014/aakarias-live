import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity credentials in environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

const defaultAds = [
  {
    _id: "ad-batch-2025",
    _type: "ad",
    titleHi: "नया बैच शुरू!",
    titleEn: "New Batch Starting!",
    subtitleHi: "UPSC प्रीलिम्स 2025 के लिए विशेष क्रैश कोर्स।",
    subtitleEn: "Special Crash Course for UPSC Prelims 2025.",
    ctaHi: "अभी जुड़ें →",
    ctaEn: "Join Now →",
    href: "/download",
    hrefEn: "/en/download",
  },
  {
    _id: "ad-monthly-pdf",
    _type: "ad",
    titleHi: "मासिक PDF डाउनलोड करें",
    titleEn: "Download Monthly PDF",
    subtitleHi: "जून 2025 की सम्पूर्ण करेंट अफेयर्स PDF — निःशुल्क।",
    subtitleEn: "Complete June 2025 Current Affairs PDF — Free.",
    ctaHi: "PDF पाएं →",
    ctaEn: "Get PDF →",
    href: "/monthly-pdf",
    hrefEn: "/en/monthly-pdf",
  },
  {
    _id: "ad-app-download",
    _type: "ad",
    titleHi: "आकार IAS ऐप डाउनलोड करें",
    titleEn: "Download Aakar IAS App",
    subtitleHi: "MCQ, लाइव क्लास, और करेंट अफेयर्स — एक ऐप में।",
    subtitleEn: "MCQs, Live Classes & Current Affairs — all in one app.",
    ctaHi: "अभी डाउनलोड करें →",
    ctaEn: "Download Now →",
    href: "/download",
    hrefEn: "/en/download",
  },
  {
    _id: "ad-test-series",
    _type: "ad",
    titleHi: "टेस्ट सीरीज़ 2025",
    titleEn: "Test Series 2025",
    subtitleHi: "UPSC प्रीलिम्स की सटीक तैयारी के लिए मॉक टेस्ट।",
    subtitleEn: "Mock tests designed for UPSC Prelims precision.",
    ctaHi: "टेस्ट दें →",
    ctaEn: "Start Test →",
    href: "/test-series",
    hrefEn: "/en/test-series",
  },
];

async function main() {
  console.log("Seeding Sanity CMS with default Advertisement / Banner (ad) documents...");

  for (const adDoc of defaultAds) {
    await client.createOrReplace(adDoc);
    console.log(`Uploaded/Updated Ad in Sanity CMS: ${adDoc.titleHi} (${adDoc._id})`);
  }

  console.log("Sanity CMS Ad seeding completed successfully!");
}

main().catch((err) => {
  console.error("Failed to seed Sanity ads:", err);
  process.exit(1);
});
