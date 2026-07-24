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
  console.log("🌱 Uploading MPPSC 2016 Demo PDF asset to Sanity...");
  const dummyPdfPath = path.resolve(process.cwd(), "public/dummy.pdf");
  if (!fs.existsSync(dummyPdfPath)) {
    console.error("❌ dummy.pdf not found in public/ directory!");
    process.exit(1);
  }

  const pdfAsset = await client.assets.upload("file", fs.createReadStream(dummyPdfPath), {
    filename: "MPPSC-Question-Paper-2016-Demo-Key.pdf",
    contentType: "application/pdf",
  });
  console.log(`✔ Uploaded Demo PDF asset. ID: ${pdfAsset._id}`);

  console.log("🌱 Generating MPPSC 2016 PYQ Documents in Sanity...");

  const pyq2016Docs = [
    {
      _id: "pyq-mppsc-prelims-2016-p1",
      _type: "pyq",
      slug: { _type: "slug", current: "mppsc-prelims-2016-paper-1" },
      title: "MPPSC प्रारंभिक परीक्षा 2016 (GS Paper 1) उत्तर कुंजी सहित",
      titleEn: "MPPSC Prelims 2016 GS Paper 1 with Answer Key",
      exam: "MPPSC",
      year: 2016,
      subject: "Polity",
      paper: "Prelims Paper 1",
      topic: "General Studies Paper 1",
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: pdfAsset._id,
        },
      },
    },
    {
      _id: "pyq-mppsc-prelims-2016-p2",
      _type: "pyq",
      slug: { _type: "slug", current: "mppsc-prelims-2016-paper-2" },
      title: "MPPSC प्रारंभिक परीक्षा 2016 (CSAT Paper 2)",
      titleEn: "MPPSC Prelims 2016 CSAT Paper 2",
      exam: "MPPSC",
      year: 2016,
      subject: "CSAT",
      paper: "Prelims Paper 2",
      topic: "General Aptitude & Reasoning",
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: pdfAsset._id,
        },
      },
    },
    {
      _id: "pyq-mppsc-mains-2016-gs1",
      _type: "pyq",
      slug: { _type: "slug", current: "mppsc-mains-2016-gs-1" },
      title: "MPPSC मुख्य परीक्षा 2016 (Mains GS Paper 1)",
      titleEn: "MPPSC Mains 2016 GS Paper 1",
      exam: "MPPSC",
      year: 2016,
      subject: "History",
      paper: "Mains GS 1",
      topic: "History & Geography",
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: pdfAsset._id,
        },
      },
    },
    {
      _id: "pyq-mppsc-mains-2016-gs2",
      _type: "pyq",
      slug: { _type: "slug", current: "mppsc-mains-2016-gs-2" },
      title: "MPPSC मुख्य परीक्षा 2016 (Mains GS Paper 2)",
      titleEn: "MPPSC Mains 2016 GS Paper 2",
      exam: "MPPSC",
      year: 2016,
      subject: "Polity",
      paper: "Mains GS 2",
      topic: "Polity & Economics",
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: pdfAsset._id,
        },
      },
    },
    {
      _id: "pyq-mppsc-mains-2016-gs3",
      _type: "pyq",
      slug: { _type: "slug", current: "mppsc-mains-2016-gs-3" },
      title: "MPPSC मुख्य परीक्षा 2016 (Mains GS Paper 3)",
      titleEn: "MPPSC Mains 2016 GS Paper 3",
      exam: "MPPSC",
      year: 2016,
      subject: "Science & Tech",
      paper: "Mains GS 3",
      topic: "Science, Tech & Maths",
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: pdfAsset._id,
        },
      },
    },
    {
      _id: "pyq-mppsc-mains-2016-gs4",
      _type: "pyq",
      slug: { _type: "slug", current: "mppsc-mains-2016-gs-4" },
      title: "MPPSC मुख्य परीक्षा 2016 (Mains GS Paper 4)",
      titleEn: "MPPSC Mains 2016 GS Paper 4",
      exam: "MPPSC",
      year: 2016,
      subject: "Ethics",
      paper: "Mains GS 4",
      topic: "Ethics & Psychology",
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: pdfAsset._id,
        },
      },
    },
  ];

  for (const doc of pyq2016Docs) {
    await client.createOrReplace(doc);
    console.log(`✔ Synced to Sanity: ${doc.title} (${doc._id})`);
  }

  console.log("🎉 Successfully seeded MPPSC 2016 Demo PYQs to Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Failed to seed MPPSC 2016 PYQs:", err);
  process.exit(1);
});
