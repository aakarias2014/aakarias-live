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
  console.log("Seeding / Updating Topper Copies in Sanity...");

  // Update existing Ajeet Kumar Mishra docs if needed
  await client.patch("c1ca1a16-0d08-42f1-aabf-fc5e8276c7e1")
    .set({
      name: "अजीत कुमार मिश्रा",
      rank: 1,
      year: 2023,
      exam: "MPPSC",
      subject: "history",
      recommendationReasonHi: "MPPSC 2023 DC रैंक 1 – अजीत कुमार मिश्रा की प्रेरणादायक उत्तर पुस्तिका।",
      recommendationReasonEn: "MPPSC 2023 DC Rank 1 – Ajeet Kumar Mishra's inspirational answer copy.",
    })
    .commit();

  await client.patch("d43e9c8e-0e12-4b83-b10a-e8b5a18fedc2")
    .set({
      name: "अजीत कुमार मिश्रा",
      rank: 1,
      year: 2023,
      exam: "MPPSC",
      subject: "hindi",
      recommendationReasonHi: "सामान्य हिंदी एवं उत्तर लेखन कला हेतु अनुशंसित।",
      recommendationReasonEn: "Recommended for General Hindi and Answer Writing Skills.",
    })
    .commit();

  const additionalToppers = [
    {
      _id: "topper-ethics-ananya",
      _type: "topperCopy",
      name: "अनन्या शर्मा",
      slug: { _type: "slug", current: "ethics-ananya" },
      rank: 1,
      year: 2022,
      exam: "MPPSC",
      score: 158,
      subject: "ethics",
      isRecommended: true,
      recommendationReasonHi: "केस स्टडीज और नैतिक दुविधाओं को हल करने की बेहतरीन संरचना।",
      recommendationReasonEn: "Excellent framework for solving case studies and ethical dilemmas.",
    },
    {
      _id: "topper-history-rohan",
      _type: "topperCopy",
      name: "रोहन देशमुख",
      slug: { _type: "slug", current: "history-rohan" },
      rank: 12,
      year: 2022,
      exam: "MPPSC",
      score: 142,
      subject: "history",
      isRecommended: false,
      recommendationReasonHi: "इतिहास के उत्तरों में आरेख व मानचित्र समावेश की उत्कृष्ट तकनीक।",
      recommendationReasonEn: "Outstanding technique of including maps and diagrams in history answers.",
    },
    {
      _id: "topper-polity-ishani",
      _type: "topperCopy",
      name: "ईशानी गुप्ता",
      slug: { _type: "slug", current: "polity-ishani" },
      rank: 4,
      year: 2022,
      exam: "MPPSC",
      score: 151,
      subject: "polity",
      isRecommended: false,
      recommendationReasonHi: "संवैधानिक अनुच्छेदों व केस लॉज का प्रभावी उपयोग।",
      recommendationReasonEn: "Effective use of constitutional articles and judicial precedents.",
    },
    {
      _id: "topper-essay-vikram",
      _type: "topperCopy",
      name: "विक्रम सिंह",
      slug: { _type: "slug", current: "essay-vikram" },
      rank: 21,
      year: 2021,
      exam: "MPPSC",
      score: 74,
      subject: "hindi",
      isRecommended: false,
      recommendationReasonHi: "निबंध लेखन में विषयों के विविध आयामों का विश्लेषण।",
      recommendationReasonEn: "Comprehensive multi-dimensional analysis in essay writing.",
    },
    {
      _id: "topper-geography-shreya",
      _type: "topperCopy",
      name: "श्रेया मालवीय",
      slug: { _type: "slug", current: "geography-shreya" },
      rank: 18,
      year: 2023,
      exam: "MPPSC",
      score: 138,
      subject: "geography",
      isRecommended: true,
      recommendationReasonHi: "मानचित्र और आरेख प्रस्तुति हेतु अनुशंसित।",
      recommendationReasonEn: "Recommended for Diagrams & Maps.",
    },
    {
      _id: "topper-economy-neha",
      _type: "topperCopy",
      name: "नेहा तिवारी",
      slug: { _type: "slug", current: "economy-neha" },
      rank: 42,
      year: 2023,
      exam: "MPPSC",
      score: 145,
      subject: "economy",
      isRecommended: true,
      recommendationReasonHi: "आंकड़े और केस स्टडी समावेशन हेतु अनुशंसित।",
      recommendationReasonEn: "Recommended for Data & Case Studies.",
    },
  ];

  for (const doc of additionalToppers) {
    await client.createOrReplace(doc);
    console.log(`Synced Sanity document: ${doc._id} (${doc.name})`);
  }

  console.log("Successfully updated Sanity CMS with all topper copies!");
}

main().catch((err) => {
  console.error("Error seeding toppers:", err);
  process.exit(1);
});
