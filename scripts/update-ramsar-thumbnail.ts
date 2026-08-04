import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

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
  console.log("📷 Updating Ramsar Sites article thumbnail image...");

  const sourcePath = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3878d1d-a66f-4a6d-84dd-b181a33cf548/media__1785834297062.png";
  const targetPublicPath = path.resolve(process.cwd(), "public/images/blog/ramsar_sites_india_2026_banner.png");

  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source thumbnail image file not found at: ${sourcePath}`);
    process.exit(1);
  }

  // Ensure public directory exists & copy file
  fs.mkdirSync(path.dirname(targetPublicPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPublicPath);
  console.log(`✅ Copied thumbnail to local public path: ${targetPublicPath}`);

  // Upload image to Sanity CMS as an asset
  console.log("⬆ Uploading thumbnail asset to Sanity CMS...");
  const imageStream = fs.createReadStream(targetPublicPath);
  const asset = await client.assets.upload("image", imageStream, {
    filename: "ramsar_sites_india_2026_banner.png",
    contentType: "image/png",
  });

  console.log(`✅ Thumbnail uploaded to Sanity! Asset ID: ${asset._id}`);

  const featuredImageObj = {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
    alt: "भारत में रामसर स्थल 2026: राज्यवार सूची, कुल 101 स्थल, 101वाँ स्थल ग्लाव झील | Ramsar Sites in India 2026",
    altEn: "Ramsar Sites in India 2026: State-wise List, Total 101 Sites, 101st Site Glaw Lake",
    caption: "भारत में रामसर स्थल 2026 (101वाँ स्थल: ग्लाव झील, अरुणाचल प्रदेश)",
    captionEn: "Ramsar Sites in India 2026 (101st Site: Glaw Lake, Arunachal Pradesh)",
    url: "/images/blog/ramsar_sites_india_2026_banner.png",
  };

  const ramsarDocIds = [
    "ca-ramsar-sites-in-india-2026",
    "ca-ramsar-sites-in-india-2026-seo",
    "ca-ramsar-sites-in-india-short",
    "ca-ramsar-sites-in-india",
    "gk-ramsar-sites-in-india"
  ];

  for (const docId of ramsarDocIds) {
    await client.patch(docId).set({
      featuredImage: featuredImageObj,
      mainImage: featuredImageObj
    }).commit();
    console.log(`✅ Successfully updated featured thumbnail for Sanity document: ${docId}`);
  }

  console.log("✨ Ramsar Sites article thumbnail update complete across all CMS documents & local public folder!");
}

main().catch((err) => {
  console.error("❌ Error updating thumbnail:", err);
  process.exit(1);
});
