import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { ankushPanghalArticleData } from "../src/data/ankush-panghal-article-override";

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
  console.log("🚀 Starting upload process for Ankush Panghal CWG 2026 80kg Boxing Gold Medal Article & Photos...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Victory Podium Gold Medal Photo Asset
  const victoryPath = path.join(publicBlogDir, "ankush_panghal_cwg_2026_gold_victory.png");
  let assetVictory;
  if (fs.existsSync(victoryPath)) {
    console.log("📸 Uploading Ankush Panghal Gold Victory Photo to Sanity...");
    try {
      assetVictory = await client.assets.upload("image", fs.createReadStream(victoryPath), {
        filename: "ankush_panghal_cwg_2026_gold_victory.png",
      });
      console.log(`✔ Uploaded Victory Photo. Asset ID: ${assetVictory._id}`);
    } catch (e) {
      console.warn("⚠️ Victory Image upload warning:", e);
    }
  }

  // 2. Namaste Bow Gratitude Photo Asset
  const namastePath = path.join(publicBlogDir, "ankush_panghal_namaste_gratitude.png");
  let assetNamaste;
  if (fs.existsSync(namastePath)) {
    console.log("📸 Uploading Ankush Panghal Namaste Gratitude Photo to Sanity...");
    try {
      assetNamaste = await client.assets.upload("image", fs.createReadStream(namastePath), {
        filename: "ankush_panghal_namaste_gratitude.png",
      });
      console.log(`✔ Uploaded Namaste Photo. Asset ID: ${assetNamaste._id}`);
    } catch (e) {
      console.warn("⚠️ Namaste Image upload warning:", e);
    }
  }

  // 3. Teammate Split Victory Photo Asset
  const splitPath = path.join(publicBlogDir, "ankush_panghal_narender_berwal_victory.png");
  let assetSplit;
  if (fs.existsSync(splitPath)) {
    console.log("📸 Uploading Ankush Panghal Teammate Victory Photo to Sanity...");
    try {
      assetSplit = await client.assets.upload("image", fs.createReadStream(splitPath), {
        filename: "ankush_panghal_narender_berwal_victory.png",
      });
      console.log(`✔ Uploaded Split Photo. Asset ID: ${assetSplit._id}`);
    } catch (e) {
      console.warn("⚠️ Split Image upload warning:", e);
    }
  }

  const article = {
    ...ankushPanghalArticleData,
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
        alt: ankushPanghalArticleData.featuredImage.alt,
        caption: ankushPanghalArticleData.featuredImage.caption,
      }
    } : {}),
  };

  console.log('📝 Uploading Ankush Panghal article ID "ca-ankush-panghal-gold-cwg-2026" to Sanity CMS...');

  try {
    const res = await client.createOrReplace(article as any);
    console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
    console.log(`URL slug: ${res.slug?.current}`);
  } catch (err) {
    console.error("❌ Failed to upload Ankush Panghal article to Sanity:", err);
    process.exit(1);
  }
}

main();
