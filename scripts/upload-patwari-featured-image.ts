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
  const docId = "mp-patwari-group-2-subgroup-4-bharti-2026";
  const imagePath = path.resolve(process.cwd(), "public/images/notifications/mp-patwari-group-2-subgroup-4-bharti-2026-thumbnail.jpg");

  if (!fs.existsSync(imagePath)) {
    console.error("Image file not found at:", imagePath);
    process.exit(1);
  }

  console.log("Uploading thumbnail image asset to Sanity...");
  const imageAsset = await client.assets.upload("image", fs.createReadStream(imagePath), {
    filename: "mp-patwari-group-2-subgroup-4-bharti-2026-thumbnail.jpg",
    contentType: "image/jpeg",
  });

  console.log("Image uploaded! Asset ID:", imageAsset._id);

  console.log(`Patching notification ${docId} with featuredImage...`);
  const patch = client.patch(docId).set({
    featuredImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: imageAsset._id,
      },
      alt: "MP Group 2 Sub Group 4 & MP Patwari Recruitment 2026 Official Rulebook Thumbnail Banner",
      caption: "मध्य प्रदेश समूह-02 उपसमूह-04 एवं पटवारी भर्ती परीक्षा 2026 - 2306 पद आधिकारिक रूलबुक व भर्ती बैनर",
    },
  });

  const res = await patch.commit();
  console.log("Successfully updated notification in Sanity CMS:");
  console.log("Document ID:", res._id);
  console.log("featuredImage:", res.featuredImage);
}

main().catch((err) => {
  console.error("Error updating notification featuredImage:", err);
  process.exit(1);
});
