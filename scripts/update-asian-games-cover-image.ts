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
  const imagePath = "/Users/aakariastech/.gemini/antigravity-ide/brain/64b3f568-c32a-459a-a042-5de655665154/.user_uploaded/media_1790675794414.png";

  if (!fs.existsSync(imagePath)) {
    console.error("❌ Image file not found at:", imagePath);
    process.exit(1);
  }

  console.log("🚀 Uploading new Asian Games 2026 48 Medals Custom Cover Banner to Sanity Assets...");

  const imageAsset = await client.assets.upload("image", fs.createReadStream(imagePath), {
    filename: "asian_games_2026_48_medals_banner.png",
  });

  console.log("✅ Image asset uploaded to Sanity successfully! Asset ID:", imageAsset._id);

  const featuredImageObj = {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: imageAsset._id,
    },
    alt: "एशियन गेम्स 2026: भारत के 48 पदक (5 स्वर्ण, 21 रजत, 22 कांस्य), नीरू ढांडा, हिमांशु ढिल्लों व रुद्राक्ष पाटिल",
    caption: "चित्र: एशियन गेम्स 2026 (आइची-नागोया, जापान) में भारत का शानदार प्रदर्शन — नीरू ढांडा ट्रैप शूटिंग गोल्ड मेडल एवं 10 मीटर एयर राइफल पदक विजेता।",
  };

  const docIds = [
    "ca-asian-games-2026-10m-air-rifle-india",
    "gk-asian-games-2026-10m-air-rifle-india",
  ];

  for (const docId of docIds) {
    console.log(`📌 Updating featuredImage & mainImage for Sanity document: ${docId}...`);
    await client
      .patch(docId)
      .set({
        featuredImage: featuredImageObj,
        mainImage: featuredImageObj,
      })
      .commit();

    console.log(`✅ Successfully updated cover image for document ${docId}!`);
  }

  console.log("🎉 ALL ASIAN GAMES 2026 COVER IMAGES SUCCESSFULLY UPDATED IN SANITY CMS!");
}

main().catch((err) => {
  console.error("❌ Error updating cover image:", err);
  process.exit(1);
});
