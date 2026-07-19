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

const batches = [
  {
    titleHi: "UPSC GS Foundation",
    titleEn: "UPSC GS Foundation",
    startDateHi: "15 अक्टूबर, 2024",
    startDateEn: "October 15, 2024",
    timeHi: "सुबह 08:00 से दोपहर 12:00 बजे",
    timeEn: "08:00 AM - 12:00 PM",
    medium: "bilingual",
    badgeHi: "प्रवेश प्रारंभ",
    badgeEn: "Admission Open",
    seatsFillPercent: 85,
    descHi: "सामान्य अध्ययन (प्रारंभिक + मुख्य) और CSAT के लिए संपूर्ण तैयारी।",
    descEn: "Complete foundational prep for General Studies (Pre + Mains) and CSAT.",
    locationNameHi: "Rajiv Gandhi Circle Campus",
    locationNameEn: "Rajiv Gandhi Circle Campus",
    center: "indore",
    orderIndex: 1,
  },
  {
    titleHi: "MPPSC Foundation",
    titleEn: "MPPSC Foundation",
    startDateHi: "20 अक्टूबर, 2024",
    startDateEn: "October 20, 2024",
    timeHi: "दोपहर 02:00 से शाम 06:00 बजे",
    timeEn: "02:00 PM - 06:00 PM",
    medium: "hindi",
    badgeHi: "प्रवेश प्रारंभ",
    badgeEn: "Admission Open",
    seatsFillPercent: 60,
    descHi: "MPPSC प्रारंभिक, मुख्य परीक्षा और साक्षात्कार मार्गदर्शन के लिए विशेष बैच।",
    descEn: "Specialized batch dedicated for MPPSC Prelims, Mains, and Interview guidance.",
    locationNameHi: "Rajiv Gandhi Circle Campus",
    locationNameEn: "Rajiv Gandhi Circle Campus",
    center: "indore",
    orderIndex: 2,
  },
  {
    titleHi: "MPSI Specialized",
    titleEn: "MPSI Specialized",
    startDateHi: "01 नवंबर, 2024",
    startDateEn: "November 01, 2024",
    timeHi: "सुबह 10:00 से दोपहर 01:00 बजे",
    timeEn: "10:00 AM - 01:00 PM",
    medium: "hindi",
    badgeHi: "नया बैच",
    badgeEn: "New Batch",
    seatsFillPercent: 40,
    descHi: "MP पुलिस सब इंस्पेक्टर परीक्षा के लिए लक्षित मार्गदर्शन और शारीरिक तैयारी रणनीतियां।",
    descEn: "Targeted guidance and physical preparation strategies for MP Police Sub Inspector exam.",
    locationNameHi: "Rajiv Gandhi Circle Campus",
    locationNameEn: "Rajiv Gandhi Circle Campus",
    center: "indore",
    orderIndex: 3,
  },
];

async function seed() {
  console.log("🌱 Starting to seed offline batches...");

  for (const batch of batches) {
    try {
      console.log(`📝 Creating Sanity document for offline batch: ${batch.titleEn}...`);
      await client.create({
        _type: "offlineBatch",
        ...batch
      });
      console.log(`✅ Seeded ${batch.titleEn} successfully.`);
    } catch (err: any) {
      console.error(`❌ Failed to seed ${batch.titleEn}:`, err.message);
    }
  }

  console.log("🎉 Seeding completed!");
}

seed();
