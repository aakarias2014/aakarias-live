import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !dataset || !token) {
  console.error("❌ Missing Sanity environment variables in .env.local!");
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
  const newImagePath = "/Users/aakariastech/.gemini/antigravity-ide/brain/fd3a9409-fc40-42fe-b9fb-a975a01b25dd/.user_uploaded/media_1789050430222.jpg";

  if (!fs.existsSync(newImagePath)) {
    console.error("❌ Cover image file not found:", newImagePath);
    process.exit(1);
  }

  console.log("📸 Uploading new official MP Police Constable 2026 poster image to Sanity CMS...");
  const imageAsset = await client.assets.upload("image", fs.createReadStream(newImagePath), {
    filename: "mp-police-constable-recruitment-2026-official-banner.jpg",
    contentType: "image/jpeg",
  });
  console.log("✔ Uploaded Asset ID:", imageAsset._id);

  const docId = "mp-police-constable-recruitment-2026";
  console.log(`🖼 Updating featuredImage for document: ${docId}...`);

  await client.patch(docId)
    .set({
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
        alt: "MP Police Constable GD Recruitment 2026 Official Banner 7500 Posts Rules Syllabus Salary",
        caption: "मध्यप्रदेश पुलिस आरक्षक (जी.डी.) भर्ती परीक्षा 2026 — कुल 7500 पद (6800 GD + 700 SAF) आधिकारिक पोस्टर बैनर",
      },
    })
    .commit();

  console.log("🎉 SUCCESS! Cover page updated successfully in Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error updating cover image:", err);
  process.exit(1);
});
