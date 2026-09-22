import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "v8f99338",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  const imagePath = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3ff0c53-d00f-4d3d-a759-669ae0e099de/.user_uploaded/media_1790083719701.png";

  if (!fs.existsSync(imagePath)) {
    console.error("❌ Image file not found at:", imagePath);
    process.exit(1);
  }

  console.log("🚀 Uploading Asian Games Air Rifle Custom Banner to Sanity Assets...");

  const imageAsset = await sanityClient.assets.upload("image", fs.createReadStream(imagePath), {
    filename: "asian_games_2026_10m_air_rifle_banner.png",
  });

  console.log("✅ Image asset uploaded to Sanity successfully! Asset ID:", imageAsset._id);

  const featuredImageField = {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: imageAsset._id,
    },
    alt: "एशियन गेम्स 2026: 10 मीटर एयर राइफल में भारत का शानदार प्रदर्शन",
  };

  // Find all documents related to asian-games-2026 air rifle
  const query = `*[_type in ["currentAffairs", "staticGk"] && slug.current match "*asian-games-2026*"]{ _id, title, "slug": slug.current }`;
  const docs = await sanityClient.fetch(query);

  console.log(`Found ${docs.length} document(s) matching asian-games-2026:`);
  docs.forEach((d: any) => console.log(` - ID: ${d._id}, Slug: ${d.slug}`));

  // Fallback to explicit IDs if query returns empty
  let targetIds = docs.map((d: any) => d._id);
  if (targetIds.length === 0) {
    targetIds = [
      "ca-asian-games-2026-10m-air-rifle-india",
      "gk-asian-games-2026-10m-air-rifle-india",
    ];
  }

  for (const docId of targetIds) {
    console.log(`📌 Updating featuredImage & mainImage for document: ${docId}...`);
    await sanityClient
      .patch(docId)
      .set({
        featuredImage: featuredImageField,
        mainImage: featuredImageField,
      })
      .commit();
    console.log(`✅ Successfully updated cover image for ${docId}`);
  }

  console.log("🎉 ALL ASIAN GAMES AIR RIFLE COVER IMAGES UPDATED SUCCESSFULLY IN SANITY CMS!");
}

main().catch((err) => {
  console.error("❌ Failed to upload cover image:", err);
  process.exit(1);
});
