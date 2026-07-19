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
  console.log("🌱 Seeding General Awareness (Static GK) subjects/categories into Sanity...");

  const newCategories = [
    {
      _id: "cat-history",
      _type: "category",
      slug: { _type: "slug", current: "history" },
      title: "भारतीय इतिहास",
      titleEn: "Indian History",
      description: "प्राचीन, मध्यकालीन और आधुनिक भारतीय इतिहास तथा कला एवं संस्कृति से संबंधित लेख।",
      descriptionEn: "Articles related to Ancient, Medieval, and Modern Indian History, and Art & Culture.",
      color: { hex: "#f43f5e" }, // Rose
      icon: "book-open",
    },
    {
      _id: "cat-geography",
      _type: "category",
      slug: { _type: "slug", current: "geography" },
      title: "भूगोल",
      titleEn: "Geography",
      description: "भारत एवं विश्व का भूगोल, भौतिक भूगोल और पर्यावरण भूगोल से जुड़े विषय।",
      descriptionEn: "Geography of India & World, Physical Geography, and Environmental Geography.",
      color: { hex: "#06b6d4" }, // Cyan
      icon: "globe",
    },
    {
      _id: "cat-general-science",
      _type: "category",
      slug: { _type: "slug", current: "general-science" },
      title: "सामान्य विज्ञान",
      titleEn: "General Science",
      description: "भौतिकी, रसायन विज्ञान और जीव विज्ञान के महत्वपूर्ण सिद्धांत और तथ्य।",
      descriptionEn: "Important principles and facts of Physics, Chemistry, and Biology.",
      color: { hex: "#14b8a6" }, // Teal
      icon: "flask-conical",
    },
    {
      _id: "cat-mpgk",
      _type: "category",
      slug: { _type: "slug", current: "mpgk" },
      title: "मध्य प्रदेश सामान्य ज्ञान (MPGK)",
      titleEn: "MP GK",
      description: "मध्य प्रदेश का इतिहास, भूगोल, राजव्यवस्था, अर्थव्यवस्था, संस्कृति और विविध तथ्य।",
      descriptionEn: "History, Geography, Polity, Economy, Culture, and miscellaneous facts of Madhya Pradesh.",
      color: { hex: "#ec4899" }, // Pink
      icon: "map-pin",
    },
    {
      _id: "cat-misc",
      _type: "category",
      slug: { _type: "slug", current: "misc" },
      title: "विविध",
      titleEn: "Miscellaneous",
      description: "महत्वपूर्ण राष्ट्रीय व अंतरराष्ट्रीय संगठन, पुरस्कार, खेलकूद और अन्य विविध विषय।",
      descriptionEn: "Important national & international organizations, awards, sports, and other miscellaneous topics.",
      color: { hex: "#64748b" }, // Slate
      icon: "layers",
    },
  ];

  for (const cat of newCategories) {
    console.log(`Creating/updating category: ${cat.titleEn}...`);
    await client.createOrReplace(cat);
  }

  console.log("✨ Successfully seeded all General Awareness categories!");
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
