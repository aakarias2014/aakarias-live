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

interface NcertBookSeed {
  titleHi: string;
  titleEn: string;
  classNumber: number;
  subject: string;
  part?: string;
}

// ─── NCERT Books Data (Class 6-12) ──────────────────────────────────────────
const ncertBooks: NcertBookSeed[] = [
  // ──── Class 12 ────
  { titleHi: "NCERT हिंदी - कक्षा 12 (कला एवं संस्कृति भाग-II)", titleEn: "NCERT Hindi - Class 12 (Art and Culture Part II)", classNumber: 12, subject: "Art & Culture", part: "Part II" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (कला एवं संस्कृति भाग-I)", titleEn: "NCERT Hindi - Class 12 (Art and Culture Part I)", classNumber: 12, subject: "Art & Culture", part: "Part I" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (सामाजिक विज्ञान – इतिहास भाग-I)", titleEn: "NCERT Hindi - Class 12 (Social Science – History Part I)", classNumber: 12, subject: "History", part: "Part I" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (सामाजिक विज्ञान – इतिहास भाग-II)", titleEn: "NCERT Hindi - Class 12 (Social Science – History Part II)", classNumber: 12, subject: "History", part: "Part II" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (सामाजिक विज्ञान – इतिहास भाग-III)", titleEn: "NCERT Hindi - Class 12 (Social Science – History Part III)", classNumber: 12, subject: "History", part: "Part III" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (सामाजिक विज्ञान – भूगोल भाग-I)", titleEn: "NCERT Hindi - Class 12 (Social Science – Geography Part I)", classNumber: 12, subject: "Geography", part: "Part I" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (सामाजिक विज्ञान – भूगोल भाग-II)", titleEn: "NCERT Hindi - Class 12 (Social Science – Geography Part II)", classNumber: 12, subject: "Geography", part: "Part II" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (सामाजिक विज्ञान – भूगोल भाग-III)", titleEn: "NCERT Hindi - Class 12 (Social Science – Geography Part III)", classNumber: 12, subject: "Geography", part: "Part III" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (सामाजिक विज्ञान – राजनीति भाग-I)", titleEn: "NCERT Hindi - Class 12 (Social Science – Political Science Part I)", classNumber: 12, subject: "Polity", part: "Part I" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (सामाजिक विज्ञान – राजनीति भाग-II)", titleEn: "NCERT Hindi - Class 12 (Social Science – Political Science Part II)", classNumber: 12, subject: "Polity", part: "Part II" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (सामाजिक विज्ञान – राजनीति भाग-III)", titleEn: "NCERT Hindi - Class 12 (Social Science – Political Science Part III)", classNumber: 12, subject: "Polity", part: "Part III" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (जीव विज्ञान)", titleEn: "NCERT Hindi - Class 12 (Biology)", classNumber: 12, subject: "Biology" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (अर्थशास्त्र भाग-I)", titleEn: "NCERT Hindi - Class 12 (Economics Part I)", classNumber: 12, subject: "Economics", part: "Part I" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (अर्थशास्त्र भाग-II)", titleEn: "NCERT Hindi - Class 12 (Economics Part II)", classNumber: 12, subject: "Economics", part: "Part II" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (समाजशास्त्र भाग-I)", titleEn: "NCERT Hindi - Class 12 (Sociology Part I)", classNumber: 12, subject: "Sociology", part: "Part I" },
  { titleHi: "NCERT हिंदी - कक्षा 12 (समाजशास्त्र भाग-II)", titleEn: "NCERT Hindi - Class 12 (Sociology Part II)", classNumber: 12, subject: "Sociology", part: "Part II" },

  // ──── Class 11 ────
  { titleHi: "NCERT हिंदी - कक्षा 11 (कला एवं संस्कृति)", titleEn: "NCERT Hindi - Class 11 (Art and Culture)", classNumber: 11, subject: "Art & Culture" },
  { titleHi: "NCERT हिंदी - कक्षा 11 (इतिहास – विश्व इतिहास)", titleEn: "NCERT Hindi - Class 11 (History – World History)", classNumber: 11, subject: "History" },
  { titleHi: "NCERT हिंदी - कक्षा 11 (भूगोल – भौतिक भूगोल भाग-I)", titleEn: "NCERT Hindi - Class 11 (Geography – Physical Geography Part I)", classNumber: 11, subject: "Geography", part: "Part I" },
  { titleHi: "NCERT हिंदी - कक्षा 11 (भूगोल – भौतिक भूगोल भाग-II)", titleEn: "NCERT Hindi - Class 11 (Geography – Physical Geography Part II)", classNumber: 11, subject: "Geography", part: "Part II" },
  { titleHi: "NCERT हिंदी - कक्षा 11 (राजनीति विज्ञान – भारत का संविधान)", titleEn: "NCERT Hindi - Class 11 (Political Science – Indian Constitution)", classNumber: 11, subject: "Polity" },
  { titleHi: "NCERT हिंदी - कक्षा 11 (राजनीति विज्ञान – राजनीतिक सिद्धांत)", titleEn: "NCERT Hindi - Class 11 (Political Science – Political Theory)", classNumber: 11, subject: "Polity", part: "Part II" },
  { titleHi: "NCERT हिंदी - कक्षा 11 (अर्थशास्त्र)", titleEn: "NCERT Hindi - Class 11 (Economics)", classNumber: 11, subject: "Economics" },
  { titleHi: "NCERT हिंदी - कक्षा 11 (जीव विज्ञान)", titleEn: "NCERT Hindi - Class 11 (Biology)", classNumber: 11, subject: "Biology" },
  { titleHi: "NCERT हिंदी - कक्षा 11 (भौतिक विज्ञान भाग-I)", titleEn: "NCERT Hindi - Class 11 (Physics Part I)", classNumber: 11, subject: "Physics", part: "Part I" },
  { titleHi: "NCERT हिंदी - कक्षा 11 (भौतिक विज्ञान भाग-II)", titleEn: "NCERT Hindi - Class 11 (Physics Part II)", classNumber: 11, subject: "Physics", part: "Part II" },
  { titleHi: "NCERT हिंदी - कक्षा 11 (रसायन विज्ञान भाग-I)", titleEn: "NCERT Hindi - Class 11 (Chemistry Part I)", classNumber: 11, subject: "Chemistry", part: "Part I" },
  { titleHi: "NCERT हिंदी - कक्षा 11 (रसायन विज्ञान भाग-II)", titleEn: "NCERT Hindi - Class 11 (Chemistry Part II)", classNumber: 11, subject: "Chemistry", part: "Part II" },
  { titleHi: "NCERT हिंदी - कक्षा 11 (समाजशास्त्र)", titleEn: "NCERT Hindi - Class 11 (Sociology)", classNumber: 11, subject: "Sociology" },

  // ──── Class 10 ────
  { titleHi: "NCERT हिंदी - कक्षा 10 (इतिहास – भारत और समकालीन विश्व II)", titleEn: "NCERT Hindi - Class 10 (History – India and Contemporary World II)", classNumber: 10, subject: "History" },
  { titleHi: "NCERT हिंदी - कक्षा 10 (भूगोल – समकालीन भारत II)", titleEn: "NCERT Hindi - Class 10 (Geography – Contemporary India II)", classNumber: 10, subject: "Geography" },
  { titleHi: "NCERT हिंदी - कक्षा 10 (राजनीति – लोकतांत्रिक राजनीति II)", titleEn: "NCERT Hindi - Class 10 (Polity – Democratic Politics II)", classNumber: 10, subject: "Polity" },
  { titleHi: "NCERT हिंदी - कक्षा 10 (अर्थशास्त्र – आर्थिक विकास की समझ)", titleEn: "NCERT Hindi - Class 10 (Economics – Understanding Economic Development)", classNumber: 10, subject: "Economics" },
  { titleHi: "NCERT हिंदी - कक्षा 10 (विज्ञान)", titleEn: "NCERT Hindi - Class 10 (Science)", classNumber: 10, subject: "Science" },

  // ──── Class 9 ────
  { titleHi: "NCERT हिंदी - कक्षा 9 (इतिहास – भारत और समकालीन विश्व I)", titleEn: "NCERT Hindi - Class 9 (History – India and Contemporary World I)", classNumber: 9, subject: "History" },
  { titleHi: "NCERT हिंदी - कक्षा 9 (भूगोल – समकालीन भारत I)", titleEn: "NCERT Hindi - Class 9 (Geography – Contemporary India I)", classNumber: 9, subject: "Geography" },
  { titleHi: "NCERT हिंदी - कक्षा 9 (राजनीति – लोकतांत्रिक राजनीति I)", titleEn: "NCERT Hindi - Class 9 (Polity – Democratic Politics I)", classNumber: 9, subject: "Polity" },
  { titleHi: "NCERT हिंदी - कक्षा 9 (अर्थशास्त्र)", titleEn: "NCERT Hindi - Class 9 (Economics)", classNumber: 9, subject: "Economics" },
  { titleHi: "NCERT हिंदी - कक्षा 9 (विज्ञान)", titleEn: "NCERT Hindi - Class 9 (Science)", classNumber: 9, subject: "Science" },

  // ──── Class 8 ────
  { titleHi: "NCERT हिंदी - कक्षा 8 (इतिहास – हमारे अतीत III)", titleEn: "NCERT Hindi - Class 8 (History – Our Pasts III)", classNumber: 8, subject: "History" },
  { titleHi: "NCERT हिंदी - कक्षा 8 (भूगोल – संसाधन एवं विकास)", titleEn: "NCERT Hindi - Class 8 (Geography – Resources and Development)", classNumber: 8, subject: "Geography" },
  { titleHi: "NCERT हिंदी - कक्षा 8 (राजनीति – सामाजिक एवं राजनीतिक जीवन III)", titleEn: "NCERT Hindi - Class 8 (Polity – Social and Political Life III)", classNumber: 8, subject: "Polity" },
  { titleHi: "NCERT हिंदी - कक्षा 8 (विज्ञान)", titleEn: "NCERT Hindi - Class 8 (Science)", classNumber: 8, subject: "Science" },

  // ──── Class 7 ────
  { titleHi: "NCERT हिंदी - कक्षा 7 (इतिहास – हमारे अतीत II)", titleEn: "NCERT Hindi - Class 7 (History – Our Pasts II)", classNumber: 7, subject: "History" },
  { titleHi: "NCERT हिंदी - कक्षा 7 (भूगोल – हमारा पर्यावरण)", titleEn: "NCERT Hindi - Class 7 (Geography – Our Environment)", classNumber: 7, subject: "Geography" },
  { titleHi: "NCERT हिंदी - कक्षा 7 (राजनीति – सामाजिक एवं राजनीतिक जीवन II)", titleEn: "NCERT Hindi - Class 7 (Polity – Social and Political Life II)", classNumber: 7, subject: "Polity" },
  { titleHi: "NCERT हिंदी - कक्षा 7 (विज्ञान)", titleEn: "NCERT Hindi - Class 7 (Science)", classNumber: 7, subject: "Science" },

  // ──── Class 6 ────
  { titleHi: "NCERT हिंदी - कक्षा 6 (इतिहास – हमारे अतीत I)", titleEn: "NCERT Hindi - Class 6 (History – Our Pasts I)", classNumber: 6, subject: "History" },
  { titleHi: "NCERT हिंदी - कक्षा 6 (भूगोल – पृथ्वी: हमारा आवास)", titleEn: "NCERT Hindi - Class 6 (Geography – The Earth: Our Habitat)", classNumber: 6, subject: "Geography" },
  { titleHi: "NCERT हिंदी - कक्षा 6 (राजनीति – सामाजिक एवं राजनीतिक जीवन I)", titleEn: "NCERT Hindi - Class 6 (Polity – Social and Political Life I)", classNumber: 6, subject: "Polity" },
  { titleHi: "NCERT हिंदी - कक्षा 6 (विज्ञान)", titleEn: "NCERT Hindi - Class 6 (Science)", classNumber: 6, subject: "Science" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log("🌱 Uploading PDF placeholder asset to Sanity...");
  const dummyPdfPath = path.resolve(process.cwd(), "public/dummy.pdf");
  if (!fs.existsSync(dummyPdfPath)) {
    console.error("❌ dummy.pdf not found in public/ directory!");
    process.exit(1);
  }

  const pdfAsset = await client.assets.upload("file", fs.createReadStream(dummyPdfPath), {
    filename: "ncert-placeholder.pdf",
    contentType: "application/pdf",
  });
  console.log(`✔ Uploaded PDF asset. ID: ${pdfAsset._id}`);

  console.log(`🌱 Seeding ${ncertBooks.length} NCERT E-Book documents to Sanity...`);

  for (const book of ncertBooks) {
    const slug = slugify(book.titleEn);
    const doc = {
      _id: `ncert-${slug}`,
      _type: "ncertBook",
      slug: { _type: "slug", current: slug },
      title: book.titleHi,
      titleEn: book.titleEn,
      classNumber: book.classNumber,
      subject: book.subject,
      part: book.part || undefined,
      language: "hi",
      file: { _type: "file", asset: { _type: "reference", _ref: pdfAsset._id } },
      publishedAt: new Date().toISOString(),
    };

    await client.createOrReplace(doc);
    console.log(`✔ Seeded: Class ${book.classNumber} — ${book.titleEn}`);
  }

  console.log("✨ All NCERT E-Book documents seeded successfully!");
}

main().catch(console.error);
