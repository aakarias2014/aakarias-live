import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { priyaGhanghasArticleData } from "../src/data/priya-ghanghas-article-override";

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
  console.log("🚀 Starting upload process for Priya Ghanghas CWG 2026 60kg Boxing Gold Medal Article & Photos...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Victory Gold Medal Photo Asset
  const victoryPath = path.join(publicBlogDir, "priya_ghanghas_cwg_2026_gold_victory.png");
  let assetVictory;
  if (fs.existsSync(victoryPath)) {
    console.log("📸 Uploading Priya Ghanghas Gold Victory Photo to Sanity...");
    try {
      assetVictory = await client.assets.upload("image", fs.createReadStream(victoryPath), {
        filename: "priya_ghanghas_cwg_2026_gold_victory.png",
      });
      console.log(`✔ Uploaded Victory Photo. Asset ID: ${assetVictory._id}`);
    } catch (e) {
      console.warn("⚠️ Victory Image upload warning:", e);
    }
  }

  // 2. Glasgow Ring Victory Photo Asset
  const ringPath = path.join(publicBlogDir, "priya_ghanghas_glasgow_ring_victory.png");
  let assetRing;
  if (fs.existsSync(ringPath)) {
    console.log("📸 Uploading Priya Ghanghas Glasgow Ring Victory Photo to Sanity...");
    try {
      assetRing = await client.assets.upload("image", fs.createReadStream(ringPath), {
        filename: "priya_ghanghas_glasgow_ring_victory.png",
      });
      console.log(`✔ Uploaded Ring Photo. Asset ID: ${assetRing._id}`);
    } catch (e) {
      console.warn("⚠️ Ring Image upload warning:", e);
    }
  }

  // 3. Hand Wrap Portrait Photo Asset
  const portraitPath = path.join(publicBlogDir, "priya_ghanghas_hand_wrap_portrait.png");
  let assetPortrait;
  if (fs.existsSync(portraitPath)) {
    console.log("📸 Uploading Priya Ghanghas Hand Wrap Portrait Photo to Sanity...");
    try {
      assetPortrait = await client.assets.upload("image", fs.createReadStream(portraitPath), {
        filename: "priya_ghanghas_hand_wrap_portrait.png",
      });
      console.log(`✔ Uploaded Portrait Photo. Asset ID: ${assetPortrait._id}`);
    } catch (e) {
      console.warn("⚠️ Portrait Image upload warning:", e);
    }
  }

  const article = {
    ...priyaGhanghasArticleData,
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
        alt: priyaGhanghasArticleData.featuredImage.alt,
        caption: priyaGhanghasArticleData.featuredImage.caption,
      }
    } : {}),
  };

  console.log('📝 Uploading Priya Ghanghas article ID "ca-priya-ghanghas-gold-cwg-2026" to Sanity CMS...');

  try {
    const res = await client.createOrReplace(article as any);
    console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
    console.log(`URL slug: ${res.slug?.current}`);
  } catch (err) {
    console.error("❌ Failed to upload Priya Ghanghas article to Sanity:", err);
    process.exit(1);
  }
}

main();
