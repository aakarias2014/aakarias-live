import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { arundhatiChoudharyArticleData } from "../src/data/arundhati-choudhary-article-override";

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

async function main() {
  console.log("🚀 Starting upload process for Arundhati Choudhary CWG 2026 70kg Boxing Gold Medal Article & Photos...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Victory Gold Medal Photo Asset
  const victoryPath = path.join(publicBlogDir, "arundhati_choudhary_cwg_2026_gold_victory.png");
  let assetVictory;
  if (fs.existsSync(victoryPath)) {
    console.log("📸 Uploading Arundhati Choudhary Gold Victory Photo to Sanity...");
    try {
      assetVictory = await client.assets.upload("image", fs.createReadStream(victoryPath), {
        filename: "arundhati_choudhary_cwg_2026_gold_victory.png",
      });
      console.log(`✔ Uploaded Victory Photo. Asset ID: ${assetVictory._id}`);
    } catch (e) {
      console.warn("⚠️ Victory Image upload warning:", e);
    }
  }

  // 2. Ring Victory Photo Asset
  const ringPath = path.join(publicBlogDir, "arundhati_choudhary_ring_celebration.png");
  let assetRing;
  if (fs.existsSync(ringPath)) {
    console.log("📸 Uploading Arundhati Choudhary Ring Celebration Photo to Sanity...");
    try {
      assetRing = await client.assets.upload("image", fs.createReadStream(ringPath), {
        filename: "arundhati_choudhary_ring_celebration.png",
      });
      console.log(`✔ Uploaded Ring Photo. Asset ID: ${assetRing._id}`);
    } catch (e) {
      console.warn("⚠️ Ring Image upload warning:", e);
    }
  }

  // 3. Coaches Corner Photo Asset
  const coachesPath = path.join(publicBlogDir, "arundhati_choudhary_ring_corner_coaches.png");
  let assetCoaches;
  if (fs.existsSync(coachesPath)) {
    console.log("📸 Uploading Arundhati Choudhary Coaches Corner Photo to Sanity...");
    try {
      assetCoaches = await client.assets.upload("image", fs.createReadStream(coachesPath), {
        filename: "arundhati_choudhary_ring_corner_coaches.png",
      });
      console.log(`✔ Uploaded Coaches Photo. Asset ID: ${assetCoaches._id}`);
    } catch (e) {
      console.warn("⚠️ Coaches Image upload warning:", e);
    }
  }

  const article = {
    ...arundhatiChoudharyArticleData,
    category: { _type: "reference", _ref: "cat-sports" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-sports" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    ...(assetVictory ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetVictory._id },
        alt: arundhatiChoudharyArticleData.featuredImage.alt,
        caption: arundhatiChoudharyArticleData.featuredImage.caption,
      }
    } : {}),
  };

  console.log('📝 Uploading Arundhati Choudhary article ID "ca-arundhati-choudhary-gold-cwg-2026" to Sanity CMS...');

  try {
    const res = await client.createOrReplace(article as any);
    console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
    console.log(`URL slug: ${res.slug?.current}`);
  } catch (err) {
    console.error("❌ Failed to upload Arundhati Choudhary article to Sanity:", err);
    process.exit(1);
  }
}

main();
