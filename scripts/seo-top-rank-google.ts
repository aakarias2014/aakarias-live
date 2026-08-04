import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

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

// Featured Snippet blocks matching Google's #1 Rank Wording Exactly
const featuredSnippetBlocksHi = [
  {
    _type: "block",
    style: "h3",
    children: [{ _type: "span", text: "मध्य प्रदेश में वर्तमान में कुल 5 रामसर स्थल (Ramsar Sites) हैं" }],
  },
  {
    _type: "block",
    style: "normal",
    children: [
      { _type: "span", text: "मध्य प्रदेश में वर्तमान में कुल " },
      { _type: "span", marks: ["strong"], text: "5 रामसर स्थल (Ramsar Sites in Madhya Pradesh)" },
      { _type: "span", text: " स्थित हैं, जो राज्य के समृद्ध पारिस्थितिकीय संतुलन, पक्षी संरक्षण और आर्द्रभूमि प्रबंधन का प्रतिनिधित्व करते हैं:" }
    ]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **भोज आर्द्रभूमि (Bhoj Wetland)**: यह भोपाल जिले में स्थित है और इसे **2002** में सबसे पहले रामसर स्थल घोषित किया गया था।" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **सांख्य सागर (Sankhya Sagar)**: यह शिवपुरी जिले के माधव राष्ट्रीय उद्यान में स्थित है, जिसे **2022** में रामसर सूची में शामिल किया गया।" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **सिरपुर तालाब (Sirpur Lake)**: यह इंदौर जिले में स्थित है और इसे भी **2022** में रामसर स्थल का दर्जा मिला।" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **यशवंत सागर (Yashwant Sagar)**: यह भी इंदौर जिले में स्थित प्रमुख आर्द्रभूमि है, जिसे वर्ष **2022** में मान्यता दी गई थी।" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **तवा जलाशय (Tawa Reservoir)**: नर्मदापुरम (होशंगाबाद) जिले में सतपुड़ा टाइगर रिजर्व के पास स्थित यह जलाशय प्रदेश का नवीनतम रामसर स्थल है, जिसे **अगस्त 2024** में घोषित किया गया।" }]
  }
];

// Featured Snippet blocks in English
const featuredSnippetBlocksEn = [
  {
    _type: "block",
    style: "h3",
    children: [{ _type: "span", text: "Total 5 Ramsar Sites in Madhya Pradesh (Ramsar Sites in MP)" }],
  },
  {
    _type: "block",
    style: "normal",
    children: [
      { _type: "span", text: "Currently, there are a total of " },
      { _type: "span", marks: ["strong"], text: "5 Ramsar Sites in Madhya Pradesh" },
      { _type: "span", text: ", representing the state's rich ecological balance and wetland conservation:" }
    ]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **Bhoj Wetland**: Located in Bhopal district, declared as MP's first Ramsar site in **2002**." }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **Sankhya Sagar**: Located near Madhav National Park in Shivpuri district, added to the Ramsar list in **2022**." }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **Sirpur Lake (Sirpur Wetland)**: Located in Indore district, received Ramsar designation in **2022**." }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **Yashwant Sagar**: Major wetland in Indore district, recognized under Ramsar in **2022**." }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **Tawa Reservoir**: Located near Satpura Tiger Reserve in Narmadapuram (Hoshangabad) district, latest Ramsar site of MP declared in **August 2024**." }]
  }
];

// Theme 2026 Section Blocks (Hindi)
const theme2026BlocksHi = [
  {
    _type: "block",
    style: "h3",
    children: [{ _type: "span", text: "विश्व आर्द्रभूमि दिवस 2026 थीम (World Wetlands Day 2026 Theme & Facts)" }],
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **विश्व आर्द्रभूमि दिवस (World Wetlands Day)**: प्रतिवर्ष **2 फरवरी** को 1971 के रामसर सम्मेलन के हस्ताक्षर दिवस की स्मृति में मनाया जाता है।" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **विश्व आर्द्रभूमि दिवस 2026 की थीम (Theme 2026)**: **\"Wetlands and Human Wellbeing\" (आर्द्रभूमि और मानव कल्याण)**। यह थीम आर्द्रभूमियों के पारिस्थितिक तंत्र और मानव स्वास्थ्य, आजीविका व जलवायु सुरक्षा के बीच अटूट संबंध पर जोर देती है।" }]
  }
];

// Theme 2026 Section Blocks (English)
const theme2026BlocksEn = [
  {
    _type: "block",
    style: "h3",
    children: [{ _type: "span", text: "World Wetlands Day 2026 Theme & Global Importance" }],
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **World Wetlands Day**: Celebrated globally every year on **February 2** to commemorate the adoption of the Ramsar Convention in 1971." }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **World Wetlands Day 2026 Theme**: **\"Wetlands and Human Wellbeing\"**. Highlights the critical link between wetland health and human prosperity, food security, and climate adaptation." }]
  }
];

// All High-Volume Keywords Extracted from User Screenshots
const topRankKeywords = [
  "mp ramsar site 2026",
  "mp me ramsar site kitni hai 2026",
  "mp me ramsar sites kitni hai",
  "mp me kitne ramsar site hai",
  "how many ramsar sites in mp",
  "how many ramsar sites in madhya pradesh",
  "madhya pradesh ki sabse chhoti ramsar site",
  "mp ramsar site 2025",
  "ramsar site 2026 in india",
  "ramsar site 2026 theme",
  "ramsar sites 2026 list",
  "ramsar sites 2026 upsc",
  "ramsar sites 2026 map",
  "ramsar sites 2026 pdf",
  "ramsar sites 2026 ki theme",
  "ramsar site 2026 up",
  "ramsar site 2026 theme in hindi",
  "ramsar site in india 2026 list",
  "ramsar site in india 2026 in hindi",
  "ramsar site in india 2026",
  "ramsar sites in india 2026 pdf",
  "ramsar sites in india 2026 upsc",
  "ramsar sites in india 2026 theme",
  "ramsar sites in india 2026 map",
  "ramsar sites in india 2026 total",
  "ramsar sites in india 2026 latest",
  "ramsar sites in india 2026 state wise",
  "मध्य प्रदेश में वर्तमान में कुल 5 रामसर स्थल हैं",
  "मध्य प्रदेश के प्रमुख रामसर स्थल",
  "भोज आर्द्रभूमि भोपाल 2002",
  "सांख्य सागर शिवपुरी 2022",
  "सिरपुर तालाब इंदौर 2022",
  "यशवंत सागर इंदौर 2022",
  "तवा जलाशय नर्मदापुरम 2024",
  "101st ramsar site india glaw lake"
];

// High Ranking PAA FAQs
const topRankFaqs = [
  {
    question: "मध्य प्रदेश में वर्तमान में कुल कितनी रामसर साइट हैं (2026)?",
    questionEn: "How many total Ramsar Sites are there in Madhya Pradesh (as of 2026)?",
    answer: "मध्य प्रदेश में वर्तमान में कुल 5 रामसर स्थल (Ramsar Sites) हैं: 1. भोज आर्द्रभूमि (भोपाल - 2002), 2. सांख्य सागर (शिवपुरी - 2022), 3. सिरपुर तालाब (इंदौर - 2022), 4. यशवंत सागर (इंदौर - 2022), और 5. तवा जलाशय (नर्मदापुरम - 2024)।",
    answerEn: "Currently, there are 5 Ramsar Sites in Madhya Pradesh: 1. Bhoj Wetland (Bhopal - 2002), 2. Sankhya Sagar (Shivpuri - 2022), 3. Sirpur Lake (Indore - 2022), 4. Yashwant Sagar (Indore - 2022), and 5. Tawa Reservoir (Narmadapuram - 2024)."
  },
  {
    question: "विश्व आर्द्रभूमि दिवस 2026 की थीम (World Wetlands Day 2026 Theme) क्या है?",
    questionEn: "What is the theme for World Wetlands Day 2026?",
    answer: "विश्व आर्द्रभूमि दिवस (2 फरवरी 2026) की थीम \"Wetlands and Human Wellbeing\" (आर्द्रभूमि और मानव कल्याण) है।",
    answerEn: "The theme for World Wetlands Day (February 2, 2026) is \"Wetlands and Human Wellbeing\"."
  },
  {
    question: "मध्य प्रदेश का सबसे नया और सबसे बड़ा रामसर स्थल कौन सा है?",
    questionEn: "Which is the newest and largest Ramsar Site in Madhya Pradesh?",
    answer: "नर्मदापुरम जिले में स्थित 'तवा जलाशय' (Tawa Reservoir - 200 वर्ग किमी) मध्य प्रदेश का सबसे नया (अगस्त 2024 में घोषित) तथा क्षेत्रफल में सबसे बड़ा रामसर स्थल है।",
    answerEn: "Tawa Reservoir in Narmadapuram district (200 sq km) is the newest (declared in August 2024) and largest Ramsar Site in Madhya Pradesh."
  },
  {
    question: "3 अगस्त 2026 को घोषित भारत का 101वाँ रामसर स्थल कौन सा है?",
    questionEn: "Which site was declared as India's 101st Ramsar Site on August 3, 2026?",
    answer: "3 अगस्त 2026 को अरुणाचल प्रदेश के लोहित जिले स्थित 'ग्लाव झील' (Glaw Lake) को भारत का 101वाँ रामसर स्थल घोषित किया गया। यह अरुणाचल प्रदेश का पहला रामसर स्थल है।",
    answerEn: "On August 3, 2026, Glaw Lake located in Lohit district of Arunachal Pradesh was designated as India's 101st Ramsar Site."
  }
];

async function main() {
  console.log("🚀 Optimizing article for Google #1 Rank & Featured Snippets (Position 0)...");

  const docIds = [
    "ca-ramsar-sites-in-india-2026",
    "ca-ramsar-sites-in-india-2026-seo",
    "ca-ramsar-sites-in-india-short",
    "ca-ramsar-sites-in-india"
  ];

  for (const docId of docIds) {
    const doc = await client.fetch(`*[_id == $docId][0]`, { docId });
    if (!doc) continue;

    // Filter out previous MP section to insert exact snippet matching Google search
    const cleanBody = doc.body.filter((b: any) => !b.children?.[0]?.text?.includes("मध्य प्रदेश"));
    const cleanBodyEn = (doc.bodyEn || []).filter((b: any) => !b.children?.[0]?.text?.includes("Madhya Pradesh"));

    // Insert Featured Snippet block and Theme 2026 block
    const newBody = [
      ...cleanBody.slice(0, 4), // After introduction
      ...featuredSnippetBlocksHi,
      ...theme2026BlocksHi,
      ...cleanBody.slice(4)
    ];

    const newBodyEn = [
      ...cleanBodyEn.slice(0, 4),
      ...featuredSnippetBlocksEn,
      ...theme2026BlocksEn,
      ...cleanBodyEn.slice(4)
    ];

    const updatedKeywords = Array.from(new Set([
      ...(doc.keywords || []),
      ...topRankKeywords
    ]));

    // Combine FAQs ensuring top rank PAA FAQs are at the top
    const combinedFaqs = [
      ...topRankFaqs,
      ...(doc.faqs || []).filter((f: any) => !topRankFaqs.some(t => t.question === f.question))
    ];

    await client.patch(docId).set({
      body: newBody,
      bodyEn: newBodyEn,
      keywords: updatedKeywords,
      faqs: combinedFaqs,
      seoTitle: "भारत में रामसर स्थल 2026 (कुल 101 स्थल, MP में 5) | Ramsar Sites 2026 | MPPSC & UPSC Notes",
      seoDescription: "मध्य प्रदेश में वर्तमान में कुल 5 रामसर स्थल हैं (भोज, सांख्य सागर, सिरपुर, यशवंत सागर, तवा)। भारत में 101 रामसर स्थल 2026, 101वाँ स्थल ग्लाव झील, 2026 थीम व 8 MCQs। MPPSC & UPSC नोट्स।"
    }).commit();

    console.log(`✅ Successfully optimized document for Google #1 Rank: ${docId}`);
  }

  console.log("✨ All Ramsar documents fully optimized for Google Featured Snippet & Top Ranking!");
}

main().catch((err) => {
  console.error("❌ Error running SEO optimization:", err);
  process.exit(1);
});
