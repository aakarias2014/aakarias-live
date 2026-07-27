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
  console.log("📸 Updating thumbnail for Disaster Management Amendment Act 2025 article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const artifactDir = "/Users/aakariastech/.gemini/antigravity-ide/brain/303f8097-7120-4c19-b5d4-05d0c10485d5";
  const destImg = path.join(publicBlogDir, "disaster_management_act_2025_hero_thumbnail.png");

  if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });

  const srcImg = path.join(artifactDir, "disaster_management_act_2025_hero_thumbnail_1785160920183.png");
  if (fs.existsSync(srcImg)) {
    fs.copyFileSync(srcImg, destImg);
  }

  console.log("⬆️ Uploading new thumbnail asset to Sanity CMS...");
  const asset = await client.assets.upload("image", fs.createReadStream(destImg), {
    filename: "disaster_management_act_2025_hero_thumbnail.png",
  });

  console.log(`✔ Uploaded image asset. ID: ${asset._id}`);

  const featuredImageObj = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: "NDRF Emergency Rescue Operation during Flood - Disaster Management Amendment Act 2025 Notes",
  };

  console.log("🔄 Updating Current Affairs document 'ca-disaster-management-amendment-act-2025'...");
  await client
    .patch("ca-disaster-management-amendment-act-2025")
    .set({ featuredImage: featuredImageObj })
    .commit();

  console.log("🔄 Updating Static GK document 'gk-disaster-management-amendment-act-2025'...");
  await client
    .patch("gk-disaster-management-amendment-act-2025")
    .set({ featuredImage: featuredImageObj })
    .commit();

  console.log("✅ Updated featured image thumbnail on both documents in Sanity!");

  console.log("🌐 Triggering Vercel live cache revalidation...");
  try {
    const fetchRes = await fetch("https://www.aakarias.com/api/revalidate?secret=aakar-ias-revalidation-secret-key-2026&path=all");
    const json = await fetchRes.json();
    console.log("🔄 Revalidation output:", json);
  } catch (err) {
    console.warn("⚠️ Revalidation fetch failed:", err);
  }
}

main().catch((err) => {
  console.error("❌ Execution error:", err);
  process.exit(1);
});
