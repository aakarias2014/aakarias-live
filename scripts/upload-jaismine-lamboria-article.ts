import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { jaismineLamboriaArticleData } from "../src/data/jaismine-lamboria-article-override";

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
  console.log("🚀 Starting upload process for Jaismine Lamboria World Championship & CWG 2026 Boxing Gold Medal Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Victory Photo Asset
  const victoryPath = path.join(publicBlogDir, "jaismine_lamboria_cwg_2026_gold_victory.png");
  let assetVictory;
  if (fs.existsSync(victoryPath)) {
    console.log("📸 Uploading Jaismine Lamboria Victory Photo to Sanity...");
    try {
      assetVictory = await client.assets.upload("image", fs.createReadStream(victoryPath), {
        filename: "jaismine_lamboria_cwg_2026_gold_victory.png",
      });
      console.log(`✔ Uploaded Victory Photo. Asset ID: ${assetVictory._id}`);
    } catch (e) {
      console.warn("⚠️ Victory Image upload warning:", e);
    }
  }

  // 2. World Championship Photo Asset
  const wcPath = path.join(publicBlogDir, "jaismine_lamboria_world_championship_gold.png");
  let assetWc;
  if (fs.existsSync(wcPath)) {
    console.log("📸 Uploading World Championship Photo to Sanity...");
    try {
      assetWc = await client.assets.upload("image", fs.createReadStream(wcPath), {
        filename: "jaismine_lamboria_world_championship_gold.png",
      });
      console.log(`✔ Uploaded WC Photo. Asset ID: ${assetWc._id}`);
    } catch (e) {
      console.warn("⚠️ WC Image upload warning:", e);
    }
  }

  // 3. Indian Army Photo Asset
  const armyPath = path.join(publicBlogDir, "jaismine_lamboria_indian_army_jco.png");
  let assetArmy;
  if (fs.existsSync(armyPath)) {
    console.log("📸 Uploading Army JCO Photo to Sanity...");
    try {
      assetArmy = await client.assets.upload("image", fs.createReadStream(armyPath), {
        filename: "jaismine_lamboria_indian_army_jco.png",
      });
      console.log(`✔ Uploaded Army Photo. Asset ID: ${assetArmy._id}`);
    } catch (e) {
      console.warn("⚠️ Army Image upload warning:", e);
    }
  }

  const article = {
    ...jaismineLamboriaArticleData,
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
        alt: jaismineLamboriaArticleData.featuredImage.alt,
        caption: jaismineLamboriaArticleData.featuredImage.caption,
      }
    } : {}),
  };

  console.log('📝 Uploading Jaismine Lamboria article ID "ca-jaismine-lamboria-gold-2025-2026" to Sanity CMS...');

  try {
    const res = await client.createOrReplace(article as any);
    console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
    console.log(`URL slug: ${res.slug?.current}`);
  } catch (err) {
    console.error("❌ Failed to upload Jaismine Lamboria article to Sanity:", err);
    process.exit(1);
  }
}

main();
