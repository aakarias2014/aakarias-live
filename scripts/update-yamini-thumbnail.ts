import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pnc4agic",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production321",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: "2024-01-01",
});

async function main() {
  console.log("📷 Updating Yamini Maurya article thumbnail banner...");

  const bannerPath = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3878d1d-a66f-4a6d-84dd-b181a33cf548/media__1785847547888.png";
  if (!fs.existsSync(bannerPath)) {
    throw new Error(`Banner file not found at: ${bannerPath}`);
  }

  // 1. Copy to public folder
  const pubBannerDest = path.join(process.cwd(), "public", "images", "blog", "yamini_maurya_cwg_2026_silver_banner.png");
  const pubJudoDest = path.join(process.cwd(), "public", "images", "blog", "yamini_maurya_cwg_2026_silver_judo.png");
  
  fs.mkdirSync(path.dirname(pubBannerDest), { recursive: true });
  fs.copyFileSync(bannerPath, pubBannerDest);
  fs.copyFileSync(bannerPath, pubJudoDest);
  console.log(`✅ Saved thumbnail to local public path: ${pubBannerDest}`);

  // 2. Upload asset to Sanity CMS
  console.log("⬆ Uploading new thumbnail asset to Sanity CMS...");
  const asset = await client.assets.upload("image", fs.createReadStream(bannerPath), {
    filename: "yamini_maurya_cwg_2026_silver_banner.png",
    contentType: "image/png",
  });
  console.log(`✅ Thumbnail asset uploaded to Sanity! Asset ID: ${asset._id}`);

  // 3. Patch Yamini Maurya article document in Sanity CMS
  const articleId = "ca-yamini-maurya-biography-cwg-2026-silver-medal-judo";
  const updatedImage = {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
    alt: "मध्य प्रदेश की बेटी यामिनी मौर्य ने रचा इतिहास! कॉमनवेल्थ गेम्स 2026 जूडो 57kg सिल्वर मेडल - सागर जिला (Yamini Maurya CWG 2026 Silver Medal Banner)",
    caption: "मध्य प्रदेश की बेटी यामिनी मौर्य ने ग्लासगो राष्ट्रमंडल खेल 2026 में महिला 57kg जूडो स्पर्धा में सिल्वर मेडल जीता",
  };

  await client.patch(articleId).set({
    featuredImage: updatedImage,
    mainImage: updatedImage,
  }).commit();
  console.log(`✅ Successfully updated featured thumbnail for Sanity document: ${articleId}`);

  console.log("✨ Yamini Maurya thumbnail update complete!");
}

main().catch((err) => {
  console.error("❌ Update failed:", err);
  process.exit(1);
});
