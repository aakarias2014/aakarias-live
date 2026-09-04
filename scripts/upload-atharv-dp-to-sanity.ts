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
  console.log("🚀 Uploading Atharv Tiwari's DP to Sanity CMS...");
  const imgPath = path.resolve(process.cwd(), "public/images/directors/atharv.png");
  if (!fs.existsSync(imgPath)) {
    console.error("❌ Image file not found at:", imgPath);
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(imgPath);
  console.log("📤 Uploading image asset to Sanity...");
  const asset = await client.assets.upload("image", fileBuffer, {
    filename: "atharv-tiwari-dp.png",
  });
  console.log("✅ Asset uploaded successfully with ID:", asset._id);

  // Fetch current homeConfig youtubeChannels
  const homeConfig = await client.fetch<{ youtubeChannels: any[] }>(
    `*[_type == "homeConfig"][0]{ youtubeChannels }`
  );

  const channels = homeConfig?.youtubeChannels || [
    {
      _key: "ch-1",
      _type: "youtubeChannel",
      title: "Aakar IAS",
      titleEn: "Aakar IAS",
      handle: "@AakarIAS",
      subscribers: "142k सब्सक्राइबर्स",
      subscribersEn: "142k subscribers",
      url: "https://www.youtube.com/@AakarIAS",
    },
    {
      _key: "ch-2",
      _type: "youtubeChannel",
      title: "Aakar IAS English",
      titleEn: "Aakar IAS English",
      handle: "@AakarIASEnglish",
      subscribers: "2k सब्सक्राइबर्स",
      subscribersEn: "2k subscribers",
      url: "https://www.youtube.com/@AakarIASEnglish",
    },
    {
      _key: "ch-3",
      _type: "youtubeChannel",
      title: "अतीत गाथा – Atharv Tiwari",
      titleEn: "Ateet Gatha – Atharv Tiwari",
      handle: "@AteetGathabyAtharvTiwari",
      subscribers: "5.2k सब्सक्राइबर्स",
      subscribersEn: "5.2k subscribers",
      url: "https://www.youtube.com/@AteetGathabyAtharvTiwari",
    },
    {
      _key: "ch-4",
      _type: "youtubeChannel",
      title: "Aakar Govt Exam",
      titleEn: "Aakar Govt Exam",
      handle: "@AakarGovtExam",
      subscribers: "3100 सब्सक्राइबर्स",
      subscribersEn: "3100 subscribers",
      url: "https://www.youtube.com/@AakarEducation-q3c",
    },
    {
      _key: "ch-5",
      _type: "youtubeChannel",
      title: "Aakar- UGC NET & AP",
      titleEn: "Aakar- UGC NET & AP",
      handle: "@AakarUGCNETAP",
      subscribers: "500 सब्सक्राइबर्स",
      subscribersEn: "500 subscribers",
      url: "https://www.youtube.com/@AakarUGCNETAP",
    },
  ];

  // Attach customAvatar asset to Atharv channel
  const updatedChannels = channels.map((ch) => {
    if (ch.title?.includes("Atharv") || ch.titleEn?.includes("Atharv") || ch._key === "ch-3") {
      return {
        ...ch,
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

  console.log("✅ Successfully updated customAvatar for Atharv Tiwari in Sanity CMS!", patchRes._id);
}

main().catch((err) => {
  console.error("❌ Failed to update Sanity CMS:", err);
  process.exit(1);
});
