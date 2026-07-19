import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

// Load env.local explicitly
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

async function uploadImage(url: string, filename: string) {
  console.log(`📸 Fetching image from: ${url}...`);
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  console.log(`📤 Uploading asset: ${filename}...`);
  const asset = await client.assets.upload("image", buf, { filename });
  return asset;
}

async function seedHomeConfig() {
  try {
    console.log("🚀 Starting Home Configuration seeding...");

    // 1. Upload Images
    const slide1Desktop = await uploadImage(
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&auto=format&fit=crop&q=80",
      "slide1-desktop.jpg"
    );
    const slide1Mobile = await uploadImage(
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
      "slide1-mobile.jpg"
    );

    const slide2Desktop = await uploadImage(
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&auto=format&fit=crop&q=80",
      "slide2-desktop.jpg"
    );
    const slide2Mobile = await uploadImage(
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80",
      "slide2-mobile.jpg"
    );

    // 2. Create or Replace homeConfig document
    console.log("📝 Writing homeConfig document in Sanity...");
    const result = await client.createOrReplace({
      _id: "homeConfig",
      _type: "homeConfig",
      heroTitleHi: "आकार IAS — सिविल सेवा परीक्षा में सर्वश्रेष्ठ मार्गदर्शन",
      heroTitleEn: "Aakar IAS — Shape Your Civil Services Success",
      heroSubtitleHi: "UPSC & MPPSC 2025-26 के लिए नए फाउंडेशन बैच प्रारंभ।",
      heroSubtitleEn: "Admissions open for UPSC & MPPSC 2025-26 foundation batches.",
      noticeTickerHi: "UPSC & MPPSC 2026 फाउंडेशन बैच के लिए प्रवेश प्रारंभ! आज ही संपर्क करें।",
      noticeTickerEn: "Admissions Open for UPSC & MPPSC 2026 Foundation Batches! Contact Us Today.",
      noticeLink: "/contact",
      heroSlides: [
        {
          _key: "slide-1",
          _type: "heroSlide",
          titleHi: "आकार IAS — सिविल सेवा परीक्षा में सर्वश्रेष्ठ मार्गदर्शन",
          titleEn: "Aakar IAS — Shape Your Civil Services Success",
          subtitleHi: "UPSC & MPPSC 2025-26 के लिए नए फाउंडेशन बैच प्रारंभ।",
          subtitleEn: "Admissions open for UPSC & MPPSC 2025-26 foundation batches.",
          desktopImage: {
            _type: "image",
            asset: { _type: "reference", _ref: slide1Desktop._id },
          },
          mobileImage: {
            _type: "image",
            asset: { _type: "reference", _ref: slide1Mobile._id },
          },
          link: "/contact",
        },
        {
          _key: "slide-2",
          _type: "heroSlide",
          titleHi: "उत्कृष्ट टेस्ट सीरीज़ प्रोग्राम",
          titleEn: "Premium Test Series Program",
          subtitleHi: "विस्तृत मूल्यांकन और व्यक्तिगत फीडबैक के साथ मुख्य परीक्षा मॉक टेस्ट।",
          subtitleEn: "Mains mock tests with comprehensive evaluation and personal mentoring.",
          desktopImage: {
            _type: "image",
            asset: { _type: "reference", _ref: slide2Desktop._id },
          },
          mobileImage: {
            _type: "image",
            asset: { _type: "reference", _ref: slide2Mobile._id },
          },
          link: "/test-series",
        },
      ],
    });

    console.log("✅ Home Configuration seeded successfully!", result);
  } catch (err: any) {
    console.error("❌ Failed to seed Home Configuration:", err.message);
  }
}

seedHomeConfig();
