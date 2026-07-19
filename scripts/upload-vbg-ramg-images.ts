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
  console.log("📸 Uploading rural workers image to Sanity...");

  const imagePath = "/Users/aakariastech/.gemini/antigravity-ide/brain/88da7c54-64f2-4b71-8cb1-fd9504f89743/vbg_ramg_rural_workers_1782898060648.png";

  if (!fs.existsSync(imagePath)) {
    console.error("❌ Image file does not exist at:", imagePath);
    process.exit(1);
  }

  // Upload image
  console.log("Uploading image...");
  const asset = await client.assets.upload("image", fs.createReadStream(imagePath), {
    filename: "vbg_ramg_rural_workers.png",
  });
  console.log("✔ Uploaded Image, ID:", asset._id);

  // Update ca-vbg-ramg-act-2026 article with featured image
  console.log("Updating ca-vbg-ramg-act-2026 article...");
  await client.patch("ca-vbg-ramg-act-2026")
    .set({
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
        alt: "Rural Indian workers constructing a water conservation check dam under the VB-G RAM G Act",
      }
    })
    .commit();

  console.log("✨ Image successfully uploaded and linked to VB-G RAM G Act article!");
}

main().catch((err) => {
  console.error("❌ Error uploading/linking image:", err);
  process.exit(1);
});
