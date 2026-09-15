import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity environment variables.");
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
  const coverImgPath = "/Users/aakariastech/.gemini/antigravity-ide/brain/407e2179-1fa4-4249-b4d8-c2ec26519d1d/.user_uploaded/media_1789460425382.png";

  if (!fs.existsSync(coverImgPath)) {
    console.error("Cover image file does not exist at:", coverImgPath);
    process.exit(1);
  }

  console.log("Uploading user cover photo asset to Sanity CMS...");

  const coverAsset = await client.assets.upload("image", fs.createReadStream(coverImgPath), {
    filename: "international_day_of_democracy_2026_cover_banner.png",
    contentType: "image/png",
  });

  console.log("Uploaded Cover Asset ID:", coverAsset._id);

  const featuredImage = {
    _type: "image",
    asset: { _type: "reference", _ref: coverAsset._id },
    alt: "अंतर्राष्ट्रीय लोकतंत्र दिवस 2026: 15 सितंबर, जन की आवाज़ लोकतंत्र की पहचान | MPPSC & UPSC Notes",
    caption: "अंतर्राष्ट्रीय लोकतंत्र दिवस 2026 (15 सितंबर) — लोकतंत्र, जनभागीदारी और जवाबदेह शासन (Aakar IAS Banner)"
  };

  console.log("Updating featuredImage (cover photo) for ca-international-day-of-democracy-2026...");
  await client
    .patch("ca-international-day-of-democracy-2026")
    .set({ featuredImage })
    .commit();

  console.log("Updating featuredImage (cover photo) for gk-international-day-of-democracy-2026...");
  await client
    .patch("gk-international-day-of-democracy-2026")
    .set({ featuredImage })
    .commit();

  console.log("Successfully updated cover photo for both currentAffairs and staticGk articles!");
}

main().catch((err) => {
  console.error("Error updating cover photo:", err);
  process.exit(1);
});
