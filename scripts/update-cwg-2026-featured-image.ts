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
  console.log("🚀 Updating CWG 2026 article featured image to '13 स्वर्ण' banner...");

  const bannerPath = path.resolve(process.cwd(), "public/images/blog/cwg_2026_india_medals_tally_banner.png");

  if (!fs.existsSync(bannerPath)) {
    console.error("❌ Banner image not found at:", bannerPath);
    process.exit(1);
  }

  // 1. Upload the correct banner image to Sanity
  console.log("📸 Uploading '13 स्वर्ण' banner image to Sanity...");
  const asset = await client.assets.upload("image", fs.createReadStream(bannerPath), {
    filename: "cwg_2026_india_medals_tally_banner.png",
    title: "कॉमनवेल्थ गेम्स 2026 भारत मेडल टैली - 13 स्वर्ण बैनर",
  });
  console.log("✅ Image uploaded:", asset._id);

  // 2. Find the CWG 2026 article document
  const slug = "commonwealth-games-2026-updates-india-medal-tally";
  const query = `*[_type in ["currentAffairs", "staticGk", "article"] && slug.current == $slug][0]{ _id, _type, title }`;
  const doc = await client.fetch(query, { slug });

  if (!doc) {
    console.error("❌ Article document not found for slug:", slug);
    process.exit(1);
  }

  console.log(`📄 Found document: ${doc._id} (${doc._type}) — "${doc.title}"`);

  // 3. Patch the document's featuredImage to use the new banner
  console.log("🔧 Patching featuredImage...");
  await client
    .patch(doc._id)
    .set({
      featuredImage: {
        _type: "image",
        alt: "कॉमनवेल्थ गेम्स 2026 मेडल टैली: भारत के 39 पदक - 13 स्वर्ण, 17 रजत, 9 कांस्य | CWG 2026 India Medal Tally",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
    })
    .commit();

  console.log("✅ featuredImage updated successfully!");

  // 4. Also update mainImage if it exists
  await client
    .patch(doc._id)
    .set({
      mainImage: {
        _type: "image",
        alt: "कॉमनवेल्थ गेम्स 2026 मेडल टैली: भारत के 39 पदक - 13 स्वर्ण, 17 रजत, 9 कांस्य | CWG 2026 India Medal Tally",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
    })
    .commit();

  console.log("✅ mainImage also updated!");
  console.log("🎉 Done! The '13 स्वर्ण' banner is now the featured image in Sanity CMS.");
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
