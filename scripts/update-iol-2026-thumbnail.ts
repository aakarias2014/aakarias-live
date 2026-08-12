import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

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
  console.log("📸 Updating featured image thumbnail for International Linguistics Olympiad 2026 article...");

  const imagePath = path.resolve(process.cwd(), "public/images/blog/iol-2026-india-winners-thumbnail.png");

  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Image file not found at ${imagePath}`);
    process.exit(1);
  }

  // 1. Upload new thumbnail image to Sanity
  console.log("📤 Uploading new banner thumbnail asset to Sanity...");
  const asset = await client.assets.upload("image", fs.createReadStream(imagePath), {
    filename: "iol_2026_india_winners_thumbnail.png",
  });

  console.log(`✔ Uploaded thumbnail asset. Asset ID: ${asset._id}`);

  const featuredImageObj = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: "IOL 2026 International Linguistics Olympiad India Winners Official Team Banner",
  };

  // 2. Patch ca-international-linguistics-olympiad-2026-india
  console.log("⚡ Patching ca-international-linguistics-olympiad-2026-india...");
  await client
    .patch("ca-international-linguistics-olympiad-2026-india")
    .set({ featuredImage: featuredImageObj })
    .commit();
  console.log("✔ Updated featuredImage in ca-international-linguistics-olympiad-2026-india");

  // 3. Patch gk-international-linguistics-olympiad-2026-india
  console.log("⚡ Patching gk-international-linguistics-olympiad-2026-india...");
  await client
    .patch("gk-international-linguistics-olympiad-2026-india")
    .set({ featuredImage: featuredImageObj })
    .commit();
  console.log("✔ Updated featuredImage in gk-international-linguistics-olympiad-2026-india");

  console.log("✨ Successfully updated thumbnail for IOL 2026 article in Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error updating thumbnail:", err);
  process.exit(1);
});
