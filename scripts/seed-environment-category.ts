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
  console.log("🌱 Creating & updating 'Environment & Ecology' subject category in Sanity CMS...");

  const environmentCategory = {
    _id: "cat-environment",
    _type: "category",
    slug: { _type: "slug", current: "environment" },
    title: "पर्यावरण और जैव विविधता",
    titleEn: "Environment & Ecology",
    description: "UPSC, MPPSC एवं अन्य राज्य लोक सेवा आयोग परीक्षाओं हेतु पर्यावरण, पारिस्थितिकी, जैव विविधता, जलवायु परिवर्तन, सतत विकास एवं प्रदूषण नियंत्रण पर अद्यतन अध्ययन सामग्री।",
    descriptionEn: "Comprehensive study material on Environment, Ecology, Biodiversity, Climate Change, Sustainable Development, and Environmental Conservation for UPSC and MPPSC civil services preparation.",
    color: { hex: "#10b981" }, // Emerald green
    icon: "leaf",
  };

  console.log("Creating/updating category in Sanity:", environmentCategory.titleEn);
  await client.createOrReplace(environmentCategory);

  console.log("✨ Successfully created and synced Environment & Ecology subject category to Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
