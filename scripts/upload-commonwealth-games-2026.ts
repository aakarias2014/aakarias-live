import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { cwg2026ArticleData } from "../src/data/cwg-2026-article-override";

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
  console.log("🚀 Starting upload process for CWG 2026 Medals Tally & Updates Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. 5 Gold Medals Thumbnail Image Asset
  const thumbPath = path.join(publicBlogDir, "cwg_2026_5_gold_medals_thumbnail.jpg");
  let assetThumb;
  if (fs.existsSync(thumbPath)) {
    console.log("📸 Uploading 5 Gold Medals Thumbnail Photo to Sanity...");
    try {
      assetThumb = await client.assets.upload("image", fs.createReadStream(thumbPath), {
        filename: "cwg_2026_5_gold_medals_thumbnail.jpg",
      });
      console.log(`✔ Uploaded Thumbnail Photo. Asset ID: ${assetThumb._id}`);
    } catch (e) {
      console.warn("⚠️ Image upload warning:", e);
    }
  }

  // 2. Medals Tally Banner Asset
  const tallyBannerPath = path.join(publicBlogDir, "cwg_2026_india_medals_tally_banner.png");
  let assetTallyBanner;
  if (fs.existsSync(tallyBannerPath)) {
    console.log("📸 Uploading Medals Tally Banner Photo to Sanity...");
    try {
      assetTallyBanner = await client.assets.upload("image", fs.createReadStream(tallyBannerPath), {
        filename: "cwg_2026_india_medals_tally_banner.png",
      });
      console.log(`✔ Uploaded Tally Banner Photo. Asset ID: ${assetTallyBanner._id}`);
    } catch (e) {
      console.warn("⚠️ Image upload warning:", e);
    }
  }

  // Replace inline body image asset with Sanity reference if uploaded
  const sections = (cwg2026ArticleData.sections || []).map((sec: any) => {
    if (sec.body && Array.isArray(sec.body)) {
      const body = sec.body.map((b: any) => {
        if (b._type === "image" && assetTallyBanner) {
          return {
            ...b,
            asset: { _type: "reference", _ref: assetTallyBanner._id },
          };
        }
        return b;
      });
      return { ...sec, body };
    }
    return sec;
  });

  const article = {
    ...cwg2026ArticleData,
    sections,
    category: { _type: "reference", _ref: "cat-sports" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-sports" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    ...(assetTallyBanner ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetTallyBanner._id },
        alt: cwg2026ArticleData.featuredImage.alt,
        caption: cwg2026ArticleData.featuredImage.caption,
      },
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetTallyBanner._id },
        alt: cwg2026ArticleData.featuredImage.alt,
        caption: cwg2026ArticleData.featuredImage.caption,
      }
    } : {}),
  };

  console.log('📝 Uploading CWG 2026 article ID "ca-commonwealth-games-2026" to Sanity CMS...');
  await client.createOrReplace(article);
  console.log('🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ca-commonwealth-games-2026');
  console.log('URL slug: commonwealth-games-2026-updates-india-medal-tally');
}

main().catch((err) => {
  console.error("❌ Upload process failed:", err);
  process.exit(1);
});
