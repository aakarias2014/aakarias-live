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
  console.log("📸 Updating featured thumbnail for Environmental Laws in India Article in Sanity CMS...");

  const userUploadedImagePath = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3e69904-e85d-4cda-b8a4-97e34fb756b4/media__1786364888917.png";
  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const destPath = path.join(publicBlogDir, "env_laws_india_custom_thumbnail.png");

  if (!fs.existsSync(userUploadedImagePath)) {
    console.error("❌ User uploaded image not found at path:", userUploadedImagePath);
    process.exit(1);
  }

  if (!fs.existsSync(publicBlogDir)) {
    fs.mkdirSync(publicBlogDir, { recursive: true });
  }

  // Copy to public folder
  fs.copyFileSync(userUploadedImagePath, destPath);
  console.log("✔ Copied image to public/images/blog/env_laws_india_custom_thumbnail.png");

  // Upload to Sanity asset pipeline
  console.log("🚀 Uploading custom thumbnail asset to Sanity...");
  const asset = await client.assets.upload("image", fs.createReadStream(destPath), {
    filename: "env_laws_india_custom_thumbnail.png",
  });

  console.log(`✔ Uploaded image asset to Sanity. Asset ID: ${asset._id}`);

  const altTag = "भारत में पर्यावरण संबंधी कानून: प्रमुख अधिनियम, नीतियाँ (Environmental Laws in India: Major Acts, Policies) - Banner showing leafy green globe, judicial gavel, and brass scales of justice";

  // Patch the staticGk document in Sanity
  console.log("📝 Patching document 'gk-environmental-laws-in-india' in Sanity CMS...");
  await client
    .patch("gk-environmental-laws-in-india")
    .set({
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: altTag,
      },
    })
    .commit();

  console.log("🎉 Successfully updated article thumbnail and alt tag in Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error updating thumbnail:", err);
  process.exit(1);
});
