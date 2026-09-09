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
  const imagePath = "/Users/aakariastech/.gemini/antigravity-ide/brain/fcfa0448-a293-4e16-a995-5bdd913eed61/.user_uploaded/media_1788941815404.png";

  if (!fs.existsSync(imagePath)) {
    console.error("❌ Image file not found at:", imagePath);
    process.exit(1);
  }

  console.log("🚀 Uploading User Cover Image to Sanity Assets...");

  // Upload image asset to Sanity
  const imageAsset = await sanityClient.assets.upload("image", fs.createReadStream(imagePath), {
    filename: "isro_gslv_f17_eos_05_cover.png",
  });

  console.log("✅ Image asset uploaded to Sanity successfully! Asset ID:", imageAsset._id);

  const featuredImageField = {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: imageAsset._id,
    },
    alt: "ISRO GSLV-F17 EOS-05 Satellite Mission Launch",
  };

  // Document IDs to update
  const docIds = [
    "ca-isro-gslv-f17-eos-05-mission-2026",
    "currentAffairs-isro-gslv-f17-eos-05-satellite-launch-2026",
  ];

  for (const docId of docIds) {
    console.log(`📌 Updating featuredImage for document: ${docId}...`);
    await sanityClient
      .patch(docId)
      .set({
        featuredImage: featuredImageField,
        mainImage: featuredImageField,
      })
      .commit();
    console.log(`✅ Successfully updated cover image for ${docId}`);
  }

  console.log("🎉 ALL COVER IMAGES UPDATED SUCCESSFULLY IN SANITY CMS!");
}

main().catch((err) => {
  console.error("❌ Failed to upload cover image:", err);
  process.exit(1);
});
