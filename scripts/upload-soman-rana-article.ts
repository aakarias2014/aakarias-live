import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { somanRanaArticleData } from "../src/data/soman-rana-article-override";

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

async function main() {
  console.log("🚀 Starting upload process for Subedar Soman Rana CWG 2026 Para Shot Put Gold Medal Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Victory Photo Asset
  const victoryPath = path.join(publicBlogDir, "soman_rana_cwg_2026_gold_victory.png");
  let assetVictory;
  if (fs.existsSync(victoryPath)) {
    console.log("📸 Uploading Soman Rana Gold Victory Photo to Sanity...");
    try {
      assetVictory = await client.assets.upload("image", fs.createReadStream(victoryPath), {
        filename: "soman_rana_cwg_2026_gold_victory.png",
      });
      console.log(`✔ Uploaded Victory Photo. Asset ID: ${assetVictory._id}`);
    } catch (e) {
      console.warn("⚠️ Victory Image upload warning:", e);
    }
  }

  // 2. Shot Put Action Photo Asset
  const actionPath = path.join(publicBlogDir, "soman_rana_shot_put_action.png");
  let assetAction;
  if (fs.existsSync(actionPath)) {
    console.log("📸 Uploading Shot Put Action Photo to Sanity...");
    try {
      assetAction = await client.assets.upload("image", fs.createReadStream(actionPath), {
        filename: "soman_rana_shot_put_action.png",
      });
      console.log(`✔ Uploaded Action Photo. Asset ID: ${assetAction._id}`);
    } catch (e) {
      console.warn("⚠️ Action Image upload warning:", e);
    }
  }

  const article = {
    ...somanRanaArticleData,
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
        alt: somanRanaArticleData.featuredImage.alt,
        caption: somanRanaArticleData.featuredImage.caption,
      }
    } : {}),
  };

  console.log('📝 Uploading Soman Rana article ID "ca-soman-rana-gold-cwg-2026" to Sanity CMS...');

  try {
    const res = await client.createOrReplace(article as any);
    console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
    console.log(`URL slug: ${res.slug?.current}`);
  } catch (err) {
    console.error("❌ Failed to upload Soman Rana article to Sanity:", err);
    process.exit(1);
  }
}

main();
