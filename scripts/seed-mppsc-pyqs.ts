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
  console.log("🌱 Uploading PDF placeholder asset to Sanity...");
  const dummyPdfPath = path.resolve(process.cwd(), "public/dummy.pdf");
  if (!fs.existsSync(dummyPdfPath)) {
    console.error("❌ dummy.pdf not found in public/ directory!");
    process.exit(1);
  }

  const pdfAsset = await client.assets.upload("file", fs.createReadStream(dummyPdfPath), {
    filename: "mppsc-pyq-placeholder.pdf",
    contentType: "application/pdf",
  });
  console.log(`✔ Uploaded PDF asset. ID: ${pdfAsset._id}`);

  console.log("🌱 Generating MPPSC PYQs for years 2019-2025...");

  const yearsList = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const pyqDocs: any[] = [];

  for (const y of yearsList) {
    if (y === 2025) {
      // 2025 has only Prelims Paper 1 & 2
      pyqDocs.push(
        {
          _id: `pyq-mppsc-prelims-${y}-p1`,
          _type: "pyq",
          slug: { _type: "slug", current: `mppsc-prelims-${y}-paper-1` },
          title: `MPPSC प्रारंभिक परीक्षा ${y}: पिछले वर्षों के प्रश्न (पेपर-1)`,
          titleEn: `MPPSC PRELIMS ${y}: PREVIOUS YEARS QUESTION (PAPER-1)`,
          exam: "MPPSC",
          year: y,
          subject: "Polity",
          topic: "General Studies (Paper 1)",
          paper: "Prelims Paper 1",
          file: { _type: "file", asset: { _type: "reference", _ref: pdfAsset._id } },
          publishedAt: new Date(`${y}-07-08T09:00:00Z`).toISOString(),
        },
        {
          _id: `pyq-mppsc-prelims-${y}-p2`,
          _type: "pyq",
          slug: { _type: "slug", current: `mppsc-prelims-${y}-paper-2` },
          title: `MPPSC प्रारंभिक परीक्षा ${y}: पिछले वर्षों के प्रश्न (पेपर-2)`,
          titleEn: `MPPSC PRELIMS ${y}: PREVIOUS YEARS QUESTION (PAPER-2)`,
          exam: "MPPSC",
          year: y,
          subject: "CSAT",
          topic: "General Aptitude Test (Paper 2)",
          paper: "Prelims Paper 2",
          file: { _type: "file", asset: { _type: "reference", _ref: pdfAsset._id } },
          publishedAt: new Date(`${y}-07-08T09:01:00Z`).toISOString(),
        }
      );
    } else {
      // Mains Papers 1-6
      const subjectsMap = ["History", "Polity", "Science & Tech", "Ethics", "Ethics", "Ethics"];
      const paperNames = ["Mains GS 1", "Mains GS 2", "Mains GS 3", "Mains GS 4", "Mains GS 4", "Optional"];
      const topicDetails = [
        "History & Culture",
        "Constitution, Governance & Polity",
        "Science, Tech & Health",
        "Philosophy, Psychology & Admin Ethics",
        "General Hindi & Grammar",
        "Hindi Essay & Drafting"
      ];
      
      for (let pNum = 1; pNum <= 6; pNum++) {
        pyqDocs.push({
          _id: `pyq-mppsc-mains-${y}-p${pNum}`,
          _type: "pyq",
          slug: { _type: "slug", current: `mppsc-mains-${y}-paper-${pNum}` },
          title: `MPPSC मुख्य परीक्षा ${y}: पिछले वर्षों के प्रश्न (पेपर-${pNum})`,
          titleEn: `MPPSC MAINS ${y}: PREVIOUS YEARS QUESTION (PAPER-${pNum})`,
          exam: "MPPSC",
          year: y,
          subject: subjectsMap[pNum - 1],
          topic: topicDetails[pNum - 1],
          paper: paperNames[pNum - 1],
          file: { _type: "file", asset: { _type: "reference", _ref: pdfAsset._id } },
          publishedAt: new Date(`${y}-07-08T08:0${pNum}:00Z`).toISOString(),
        });
      }

      // Prelims Papers 1 & 2
      pyqDocs.push(
        {
          _id: `pyq-mppsc-prelims-${y}-p1`,
          _type: "pyq",
          slug: { _type: "slug", current: `mppsc-prelims-${y}-paper-1` },
          title: `MPPSC प्रारंभिक परीक्षा ${y}: पिछले वर्षों के प्रश्न (पेपर-1)`,
          titleEn: `MPPSC PRELIMS ${y}: PREVIOUS YEARS QUESTION (PAPER-1)`,
          exam: "MPPSC",
          year: y,
          subject: "Polity",
          topic: "General Studies (Paper 1)",
          paper: "Prelims Paper 1",
          file: { _type: "file", asset: { _type: "reference", _ref: pdfAsset._id } },
          publishedAt: new Date(`${y}-07-08T09:00:00Z`).toISOString(),
        },
        {
          _id: `pyq-mppsc-prelims-${y}-p2`,
          _type: "pyq",
          slug: { _type: "slug", current: `mppsc-prelims-${y}-paper-2` },
          title: `MPPSC प्रारंभिक परीक्षा ${y}: पिछले वर्षों के प्रश्न (पेपर-2)`,
          titleEn: `MPPSC PRELIMS ${y}: PREVIOUS YEARS QUESTION (PAPER-2)`,
          exam: "MPPSC",
          year: y,
          subject: "CSAT",
          topic: "General Aptitude Test (Paper 2)",
          paper: "Prelims Paper 2",
          file: { _type: "file", asset: { _type: "reference", _ref: pdfAsset._id } },
          publishedAt: new Date(`${y}-07-08T09:01:00Z`).toISOString(),
        }
      );
    }
  }

  console.log(`🌱 Seeding ${pyqDocs.length} MPPSC PYQ documents to Sanity...`);

  for (const pyq of pyqDocs) {
    await client.createOrReplace(pyq);
    console.log(`✔ Seeded: ${pyq.titleEn}`);
  }

  console.log("✨ All MPPSC PYQ documents seeded successfully!");
}

main().catch(console.error);
