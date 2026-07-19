import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

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

const defaultExams = [
  {
    _id: "upsc-prelims-2027",
    _type: "examCalendar",
    name: "UPSC Civil Services Prelims 2027",
    nameEn: "UPSC Civil Services Prelims 2027",
    examDate: "2027-05-23T09:30:00Z",
    dateText: "23 मई 2027",
    dateTextEn: "May 23, 2027",
    status: "upcoming",
    isPrimaryCountdown: false,
    description: "संघ लोक सेवा आयोग द्वारा सिविल सेवा परीक्षा (प्रारंभिक) 2027 का आयोजन इस दिन किया जाएगा।",
    descriptionEn: "UPSC will conduct the Civil Services (Preliminary) Examination 2027 on this date."
  },
  {
    _id: "mppsc-prelims-2027",
    _type: "examCalendar",
    name: "MPPSC State Service Prelims 2027",
    nameEn: "MPPSC State Service Prelims 2027",
    examDate: "2027-06-20T09:30:00Z",
    dateText: "20 जून 2027 (संभावित)",
    dateTextEn: "June 20, 2027 (Expected)",
    status: "upcoming",
    isPrimaryCountdown: false,
    description: "मध्य प्रदेश लोक सेवा आयोग द्वारा राज्य सेवा परीक्षा (प्रारंभिक) 2027 का आयोजन किया जाना संभावित है।",
    descriptionEn: "Madhya Pradesh PSC is expected to conduct its state services preliminary exam in late June."
  },
  {
    _id: "upsc-mains-2027",
    _type: "examCalendar",
    name: "UPSC Civil Services Mains 2027",
    nameEn: "UPSC Civil Services Mains 2027",
    examDate: "2027-09-17T09:30:00Z",
    dateText: "17 सितंबर 2027 से",
    dateTextEn: "From September 17, 2027",
    status: "upcoming",
    isPrimaryCountdown: false,
    description: "मुख्य परीक्षा 5 दिनों की अवधि में आयोजित की जाएगी।",
    descriptionEn: "The Mains examination will be conducted over a period of 5 days."
  },
  {
    _id: "mppsc-mains-2026",
    _type: "examCalendar",
    name: "MPPSC राज्य सेवा (मुख्य) परीक्षा 2026",
    nameEn: "MPPSC State Service Mains Exam 2026",
    examDate: "2026-09-07T10:00:00Z",
    dateText: "07 सितंबर 2026 - 12 सितंबर 2026",
    dateTextEn: "September 7 - 12, 2026",
    status: "upcoming",
    isPrimaryCountdown: true,
    description: "मध्य प्रदेश लोक सेवा आयोग (MPPSC) द्वारा राज्य सेवा मुख्य परीक्षा 2026 का आयोजन 07 सितंबर से 12 सितंबर 2026 तक किया जाएगा। प्रवेश पत्र 29 अगस्त 2026 से उपलब्ध होंगे।",
    descriptionEn: "Madhya Pradesh Public Service Commission (MPPSC) will conduct the State Service Mains Examination 2026 from September 7 to September 12, 2026. Admit cards will be available from August 29, 2026."
  }
];

async function seedExamCalendar() {
  try {
    console.log("🚀 Seeding default exams into Sanity...");
    for (const exam of defaultExams) {
      console.log(`📝 Seeding ${exam.nameEn}...`);
      const result = await client.createOrReplace(exam);
      console.log(`✅ Seeded: ${result._id}`);
    }
    console.log("🎉 All exams seeded successfully!");
  } catch (err: any) {
    console.error("❌ Seeding failed:", err.message);
  }
}

seedExamCalendar();
