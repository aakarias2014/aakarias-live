import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function main() {
  console.log("Seeding Vijayasiddhi 2025 FLT Test Series to Sanity...");

  const testSeriesDoc = {
    _id: "test-series-vijayasiddhi-2025-flt",
    _type: "testSeries",
    slug: { _type: "slug", current: "vijayasiddhi-2025-flt-test-series" },
    title: "विजयसिद्धि 2025 – Full Length Test Series (FLT)",
    titleEn: "Vijayasiddhi 2025 – MPPSC Mains Full Length Test Series",
    description: "MPPSC 2025 की तैयारी को दें एक मजबूत धार! 6 फुल लेंथ टेस्ट (FLT 1 से FLT 6) संपूर्ण परीक्षा पैटर्न, विस्तृत समाधान एवं व्यक्तिगत फीडबैक के साथ।",
    descriptionEn: "Sharpen your MPPSC 2025 Mains preparation with 6 Full Length Tests (FLT 1 to FLT 6) based on exact exam pattern with detailed solutions and expert feedback.",
    badgeHi: "प्रारंभ तिथि: 31 जुलाई 2026",
    badgeEn: "Starts From: 31st July 2026",
    price: 999,
    originalPrice: 1999,
    active: true,
    orderIndex: -1, // Places it at the top
    features: [
      "**📅 प्रारंभ तिथि: 31 जुलाई 2026 (Starts 31st July 2026)**",
      "**6 Full Length Tests (PAPER 1 to PAPER 6 FLT)**",
      "**हिंदी एवं अंग्रेज़ी माध्यम में उपलब्ध**",
      "ऑनलाइन एवं ऑफ़लाइन दोनों मोड (Morning 10:00 / Evening 5:00)",
      "Hard Copy Explanation (विस्तृत समाधान व प्रदर्शन विश्लेषण)",
      "Doubt Solving By Expert & Special Guidance On Mains Writing",
      "All MP Ranking List & Answer Improvement Lab",
      "महत्वपूर्ण एवं संभावित विषयों पर विशेष फोकस"
    ],
    featuresEn: [
      "**📅 Starts From: 31st July 2026**",
      "**6 Full Length Tests (PAPER 1 to PAPER 6 FLT)**",
      "**Available In Hindi And English**",
      "Available Offline And Online (Morning 10:00 AM / Evening 5:00 PM)",
      "Hard Copy Explanation & Detailed Solution",
      "Doubt Solving By Expert & Special Guidance On Mains Writing",
      "All MP Ranking List & Answer Improvement Lab",
      "Focus on Probable and important topics"
    ]
  };

  await client.createOrReplace(testSeriesDoc);
  console.log("Uploaded Test Series Document: vijayasiddhi-2025-flt");

  const schedules = [
    {
      _id: "test-schedule-flt-1",
      _type: "testSchedule",
      date: "31-07-26",
      code: "FLT-01",
      titleHi: "PAPER 1 FLT (सामान्य अध्ययन - I)",
      titleEn: "PAPER 1 FLT (General Studies - I)",
      focusHi: "शुक्रवार | Morning: 10:00 AM | Evening: 5:00 PM",
      focusEn: "Friday | Morning: 10:00 AM | Evening: 5:00 PM",
      orderIndex: 1
    },
    {
      _id: "test-schedule-flt-2",
      _type: "testSchedule",
      date: "01-08-26",
      code: "FLT-02",
      titleHi: "PAPER 2 FLT (सामान्य अध्ययन - II)",
      titleEn: "PAPER 2 FLT (General Studies - II)",
      focusHi: "शनिवार | Morning: 10:00 AM | Evening: 5:00 PM",
      focusEn: "Saturday | Morning: 10:00 AM | Evening: 5:00 PM",
      orderIndex: 2
    },
    {
      _id: "test-schedule-flt-3",
      _type: "testSchedule",
      date: "02-08-26",
      code: "FLT-03",
      titleHi: "PAPER 3 FLT (सामान्य अध्ययन - III)",
      titleEn: "PAPER 3 FLT (General Studies - III)",
      focusHi: "रविवार | Morning: 10:00 AM | Evening: 5:00 PM",
      focusEn: "Sunday | Morning: 10:00 AM | Evening: 5:00 PM",
      orderIndex: 3
    },
    {
      _id: "test-schedule-flt-4",
      _type: "testSchedule",
      date: "03-08-26",
      code: "FLT-04",
      titleHi: "PAPER 4 FLT (दर्शनशास्त्र, मनोविज्ञान व लोक प्रशासन)",
      titleEn: "PAPER 4 FLT (Ethics, Philosophy & Public Administration)",
      focusHi: "सोमवार | Morning: 10:00 AM | Evening: 5:00 PM",
      focusEn: "Monday | Morning: 10:00 AM | Evening: 5:00 PM",
      orderIndex: 4
    },
    {
      _id: "test-schedule-flt-5",
      _type: "testSchedule",
      date: "04-08-26",
      code: "FLT-05",
      titleHi: "PAPER 5 FLT (सामान्य हिंदी एवं व्याकरण)",
      titleEn: "PAPER 5 FLT (General Hindi & Grammar)",
      focusHi: "मंगलवार | Morning: 10:00 AM | Evening: 5:00 PM",
      focusEn: "Tuesday | Morning: 10:00 AM | Evening: 5:00 PM",
      orderIndex: 5
    },
    {
      _id: "test-schedule-flt-6",
      _type: "testSchedule",
      date: "05-08-26",
      code: "FLT-06",
      titleHi: "PAPER 6 FLT (हिंदी निबंध एवं प्रारूप लेखन)",
      titleEn: "PAPER 6 FLT (Hindi Essay & Draft Writing)",
      focusHi: "बुधवार | Morning: 10:00 AM | Evening: 5:00 PM",
      focusEn: "Wednesday | Morning: 10:00 AM | Evening: 5:00 PM",
      orderIndex: 6
    }
  ];

  for (const sched of schedules) {
    await client.createOrReplace(sched);
    console.log(`Uploaded Test Schedule: ${sched.code} (${sched.titleHi})`);
  }

  console.log("Vijayasiddhi 2025 FLT Test Series successfully added to Sanity CMS!");
}

main().catch((err) => {
  console.error("Error seeding FLT test series:", err);
  process.exit(1);
});
