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
  console.log("🚀 Uploading Aakar Govt Exam DP to Sanity CMS...");
  const imgPath = path.resolve(process.cwd(), "public/images/aakar-govt-exam-logo.png");
  if (!fs.existsSync(imgPath)) {
    console.error("❌ Image file not found at:", imgPath);
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(imgPath);
  console.log("📤 Uploading image asset to Sanity...");
  const asset = await client.assets.upload("image", fileBuffer, {
    filename: "aakar-govt-exam-logo.png",
  });
  console.log("✅ Asset uploaded successfully with ID:", asset._id);

  // Fetch current homeConfig youtubeChannels
  const homeConfig = await client.fetch<{ youtubeChannels: any[] }>(
    `*[_type == "homeConfig"][0]{ youtubeChannels }`
  );

  const channels = homeConfig?.youtubeChannels || [];

  // Attach customAvatar asset to Aakar Govt Exam channel
  const updatedChannels = channels.map((ch) => {
    if (ch.title?.includes("Govt Exam") || ch.titleEn?.includes("Govt Exam") || ch._key === "ch-4") {
      return {
        ...ch,
        title: "Aakar Govt Exam",
        titleEn: "Aakar Govt Exam",
        subscribers: "3100 सब्सक्राइबर्स",
        subscribersEn: "3100 subscribers",
        customAvatar: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
      };
    }
    return ch;
  });

  const patchRes = await client
    .patch("homeConfig")
    .set({ youtubeChannels: updatedChannels })
    .commit();

  console.log("✅ Successfully updated customAvatar for Aakar Govt Exam in Sanity CMS!", patchRes._id);
}

main().catch((err) => {
  console.error("❌ Failed to update Sanity CMS:", err);
  process.exit(1);
});
