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

const dummyReleases = [
  {
    slug: "mppsc-mock-interview-series-2026",
    titleHi: "आकार IAS ने आयोजित की विशाल MPPSC मॉक इंटरव्यू श्रृंखला, 500+ अभ्यर्थी शामिल",
    titleEn: "Aakar IAS organised massive MPPSC mock interviews, 500+ aspirants participated",
    source: "Dainik Bhaskar",
    publishedAt: "2026-06-15",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    url: "https://www.bhaskar.com",
  },
  {
    slug: "felicitation-ceremony-indore-center-2026",
    titleHi: "सिविल सेवा परीक्षा में सफल अभ्यर्थियों का आकार IAS इंदौर केंद्र पर सम्मान समारोह",
    titleEn: "Felicitation ceremony of successful civil services candidates at Aakar IAS Indore Center",
    source: "Nai Dunia",
    publishedAt: "2026-06-20",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    url: "https://www.naidunia.com",
  },
  {
    slug: "upsc-preparation-strategy-seminar-2026",
    titleHi: "UPSC परीक्षा तैयारी रणनीति पर इंदौर में विशेष मार्गदर्शन सत्र का आयोजन",
    titleEn: "Special guidance seminar organized in Indore on UPSC preparation strategy",
    source: "Patrika",
    publishedAt: "2026-06-28",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    url: "https://www.patrika.com",
  },
];

async function seedMediaReleases() {
  try {
    console.log("🚀 Seeding Media Releases in Sanity...");

    for (const item of dummyReleases) {
      console.log(`\n📄 Processing release: ${item.slug}`);
      
      // Upload image
      const imageAsset = await uploadImage(item.imageUrl, `${item.slug}.jpg`);

      // Create document
      const doc = {
        _type: "mediaRelease",
        _id: `mediaRelease-${item.slug}`,
        slug: { _type: "slug", current: item.slug },
        title: item.titleHi,
        titleEn: item.titleEn,
        source: item.source,
        publishedAt: item.publishedAt,
        url: item.url,
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: imageAsset._id },
        },
      };

      console.log("✍️ Writing to Sanity...");
      await client.createOrReplace(doc);
      console.log(`✅ Seeded media release: ${item.titleEn}`);
    }

    console.log("\n🎉 Seeding of Media Releases completed successfully!");
  } catch (err: any) {
    console.error("❌ Seeding failed:", err.message);
  }
}

seedMediaReleases();
