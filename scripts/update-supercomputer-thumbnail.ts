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
  console.log("📸 Starting upload of custom Supercomputer Thumbnail...");

  const imagePath = path.resolve(process.cwd(), "public/images/blog/supercomputer-custom-thumbnail.png");

  if (!fs.existsSync(imagePath)) {
    console.error("❌ Custom thumbnail not found at:", imagePath);
    process.exit(1);
  }

  // Upload Asset to Sanity
  console.log("⬆ Uploading image asset to Sanity...");
  const asset = await client.assets.upload("image", fs.createReadStream(imagePath), {
    filename: "supercomputer_custom_thumbnail.png",
  });
  console.log(`✔ Uploaded thumbnail asset. Asset ID: ${asset._id}`);

  const featuredImageObj = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: "सुपरकंप्यूटर क्या है? उपयोग, विशेषताएँ, इतिहास और भारत के प्रमुख सुपरकंप्यूटर | MPPSC & UPSC Notes",
    caption: "चित्र: सुपरकंप्यूटर क्या है? उपयोग, विशेषताएँ, इतिहास और भारत के प्रमुख सुपरकंप्यूटर",
  };

  // Update Static GK Document
  const gkDoc = await client.getDocument("gk-supercomputer-what-is-supercomputing-guide");
  if (gkDoc) {
    await client.patch(gkDoc._id).set({ featuredImage: featuredImageObj }).commit();
    console.log("✨ Successfully updated featuredImage for Static GK document!");
  } else {
    console.warn("⚠️ Static GK document not found.");
  }

  // Update Current Affairs Document
  const caDoc = await client.getDocument("ca-supercomputer-what-is-supercomputing-guide");
  if (caDoc) {
    await client.patch(caDoc._id).set({ featuredImage: featuredImageObj }).commit();
    console.log("✨ Successfully updated featuredImage for Current Affairs document!");
  } else {
    console.warn("⚠️ Current Affairs document not found.");
  }

  console.log("🎉 Custom Thumbnail successfully updated on both documents!");
}

main().catch((err) => {
  console.error("❌ Error updating thumbnail:", err);
  process.exit(1);
});
