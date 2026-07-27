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

async function main() {
  console.log("🌱 Seeding Sports & Games Category and Tag into Sanity CMS...");

  // 1. Create/Replace Category document: cat-sports
  const sportsCategory = {
    _id: "cat-sports",
    _type: "category",
    slug: { _type: "slug", current: "sports" },
    title: "खेल एवं खेलकूद",
    titleEn: "Sports & Games",
    description: "राष्ट्रमंडल खेल 2026, ओलंपिक, एशियाई खेल, क्रिकेट, हॉकी, प्रमुख खेल प्रतियोगिताएं एवं समसामयिक घटनाक्रम।",
    descriptionEn: "National & international sports current affairs, Commonwealth Games 2026, Olympics, Asian Games, Cricket, and major sports tournaments.",
    color: { hex: "#f59e0b" }, // Amber / Gold
    icon: "trophy",
  };

  await client.createOrReplace(sportsCategory);
  console.log("✔ Created/Updated Category: cat-sports (खेल एवं खेलकूद)");

  // 2. Create/Replace Tag document: tag-sports
  const sportsTag = {
    _id: "tag-sports",
    _type: "tag",
    slug: { _type: "slug", current: "sports" },
    name: "Sports & Games (खेलकूद)",
  };

  await client.createOrReplace(sportsTag);
  console.log("✔ Created/Updated Tag: tag-sports");

  console.log("✨ Sports & Games Category and Tag successfully registered in Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error seeding Sports category:", err);
  process.exit(1);
});
