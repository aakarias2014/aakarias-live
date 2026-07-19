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
  console.log("🌱 Uploading offline classroom brochure PDF to Sanity...");
  const dummyPdfPath = path.resolve(process.cwd(), "public/dummy.pdf");
  if (!fs.existsSync(dummyPdfPath)) {
    console.error("❌ dummy.pdf not found in public/ directory!");
    process.exit(1);
  }

  const pdfAsset = await client.assets.upload("file", fs.createReadStream(dummyPdfPath), {
    filename: "offline-classroom-brochure.pdf",
    contentType: "application/pdf",
  });
  console.log(`✔ Uploaded brochure PDF asset. ID: ${pdfAsset._id}`);

  console.log("🌱 Seeding offlinePageConfig document to Sanity...");
  const doc = {
    _id: "offlinePageConfig",
    _type: "offlinePageConfig",
    brochure: {
      _type: "file",
      asset: {
        _type: "reference",
        _ref: pdfAsset._id,
      },
    },
  };

  await client.createOrReplace(doc);
  console.log("✨ Seeding offlinePageConfig successfully completed!");
}

main().catch(console.error);
