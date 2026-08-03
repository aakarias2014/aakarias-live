import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { preetiPawarArticleData } from "../src/data/preeti-pawar-article-override";

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
  console.log("🚀 Starting upload process for Preeti Pawar CWG 2026 Boxing Gold Medal Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Victory Photo Asset
  const victoryPath = path.join(publicBlogDir, "preeti_pawar_cwg_2026_gold_victory.png");
  let assetVictory;
  if (fs.existsSync(victoryPath)) {
    console.log("📸 Uploading Preeti Pawar Gold Victory Photo to Sanity...");
    try {
      assetVictory = await client.assets.upload("image", fs.createReadStream(victoryPath), {
        filename: "preeti_pawar_cwg_2026_gold_victory.png",
      });
      console.log(`✔ Uploaded Victory Photo. Asset ID: ${assetVictory._id}`);
    } catch (e) {
      console.warn("⚠️ Victory Image upload warning:", e);
    }
  }

  // 2. Boxing Bout Photo Asset
  const boutPath = path.join(publicBlogDir, "preeti_pawar_boxing_bout_cwg_2026.png");
  let assetBout;
  if (fs.existsSync(boutPath)) {
    console.log("📸 Uploading Boxing Bout Photo to Sanity...");
    try {
      assetBout = await client.assets.upload("image", fs.createReadStream(boutPath), {
        filename: "preeti_pawar_boxing_bout_cwg_2026.png",
      });
      console.log(`✔ Uploaded Bout Photo. Asset ID: ${assetBout._id}`);
    } catch (e) {
      console.warn("⚠️ Bout Image upload warning:", e);
    }
  }

  // 3. Indian Army Photo Asset
  const armyPath = path.join(publicBlogDir, "preeti_pawar_indian_army_jco.png");
  let assetArmy;
  if (fs.existsSync(armyPath)) {
    console.log("📸 Uploading Army JCO Photo to Sanity...");
    try {
      assetArmy = await client.assets.upload("image", fs.createReadStream(armyPath), {
        filename: "preeti_pawar_indian_army_jco.png",
      });
      console.log(`✔ Uploaded Army Photo. Asset ID: ${assetArmy._id}`);
    } catch (e) {
      console.warn("⚠️ Army Image upload warning:", e);
    }
  }

  const article = {
    ...preetiPawarArticleData,
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
        alt: preetiPawarArticleData.featuredImage.alt,
        caption: preetiPawarArticleData.featuredImage.caption,
      }
    } : {}),
  };

  console.log('📝 Uploading Preeti Pawar article ID "ca-preeti-pawar-gold-cwg-2026" to Sanity CMS...');
  await client.createOrReplace(article);
  console.log('🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ca-preeti-pawar-gold-cwg-2026');
  console.log('URL slug: preeti-pawar-biography-cwg-2026-gold-medal-boxing');
}

main().catch((err) => {
  console.error("❌ Upload process failed:", err);
  process.exit(1);
});
