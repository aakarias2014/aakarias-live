import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { sachinSiwachArticleData } from "../src/data/sachin-siwach-article-override";

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
  console.log("🚀 Starting upload process for Sachin Siwach CWG 2026 60kg Boxing Gold Medal Article & Photos...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Victory Thumbs Up Photo Asset
  const victoryPath = path.join(publicBlogDir, "sachin_siwach_cwg_2026_gold_victory.jpg");
  let assetVictory;
  if (fs.existsSync(victoryPath)) {
    console.log("📸 Uploading Sachin Siwach Gold Victory Photo to Sanity...");
    try {
      assetVictory = await client.assets.upload("image", fs.createReadStream(victoryPath), {
        filename: "sachin_siwach_cwg_2026_gold_victory.jpg",
      });
      console.log(`✔ Uploaded Victory Photo. Asset ID: ${assetVictory._id}`);
    } catch (e) {
      console.warn("⚠️ Victory Image upload warning:", e);
    }
  }

  // 2. Ring Arm Raised Photo Asset
  const ringPath = path.join(publicBlogDir, "sachin_siwach_ring_arm_raised.png");
  let assetRing;
  if (fs.existsSync(ringPath)) {
    console.log("📸 Uploading Sachin Siwach Ring Arm Raised Photo to Sanity...");
    try {
      assetRing = await client.assets.upload("image", fs.createReadStream(ringPath), {
        filename: "sachin_siwach_ring_arm_raised.png",
      });
      console.log(`✔ Uploaded Ring Photo. Asset ID: ${assetRing._id}`);
    } catch (e) {
      console.warn("⚠️ Ring Image upload warning:", e);
    }
  }

  // 3. Namaste Bow Gratitude Photo Asset
  const namastePath = path.join(publicBlogDir, "sachin_siwach_namaste_gratitude.png");
  let assetNamaste;
  if (fs.existsSync(namastePath)) {
    console.log("📸 Uploading Sachin Siwach Namaste Gratitude Photo to Sanity...");
    try {
      assetNamaste = await client.assets.upload("image", fs.createReadStream(namastePath), {
        filename: "sachin_siwach_namaste_gratitude.png",
      });
      console.log(`✔ Uploaded Namaste Photo. Asset ID: ${assetNamaste._id}`);
    } catch (e) {
      console.warn("⚠️ Namaste Image upload warning:", e);
    }
  }

  const article = {
    ...sachinSiwachArticleData,
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
        alt: sachinSiwachArticleData.featuredImage.alt,
        caption: sachinSiwachArticleData.featuredImage.caption,
      }
    } : {}),
  };

  console.log('📝 Uploading Sachin Siwach article ID "ca-sachin-siwach-gold-cwg-2026" to Sanity CMS...');

  try {
    const res = await client.createOrReplace(article as any);
    console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
    console.log(`URL slug: ${res.slug?.current}`);
  } catch (err) {
    console.error("❌ Failed to upload Sachin Siwach article to Sanity:", err);
    process.exit(1);
  }
}

main();
