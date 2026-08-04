import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

const client = createClient({
  projectId: projectId!,
  dataset: dataset!,
  token: token!,
  apiVersion: "2024-10-01",
  useCdn: false,
});

// Dedicated MP Ramsar Sites Table Data
const mpRamsarTableHi = [
  ["1", "**भोज आर्द्रभूमि (Bhoj Wetland)**", "भोपाल (Bhopal)", "2002", "32 वर्ग किमी", "अपर लेक (बड़ा तालाब) व लोअर लेक (छोटा तालाब); सारस क्रेन आश्रय।"],
  ["2", "**साख्य सागर (Sakhya Sagar)**", "शिवपुरी (माधव राष्ट्रीय उद्यान)", "2022", "2.48 वर्ग किमी", "मणियार नदी पर निर्मित; मगरमच्छ व चिकने कोट वाले ऊदबिलाव का निवास।"],
  ["3", "**सिरपुर आर्द्रभूमि (Sirpur Wetland)**", "इंदौर (Indore)", "2022", "1.61 वर्ग किमी", "होलकर राजवंश द्वारा निर्मित 130 वर्ष पुरानी झील; 130+ पक्षी प्रजातियाँ।"],
  ["4", "**यशवंत सागर (Yashwant Sagar)**", "इंदौर (देपालपुर)", "2022", "8.22 वर्ग किमी", "गंभीर नदी पर जलाशय; सारस क्रेन का प्रमुख प्रजनन स्थल व IBA।"],
  ["5", "**तावा जलाशय (Tawa Reservoir)**", "नर्मदापुरम (सतपुड़ा टाइगर रिजर्व)", "2024", "200 वर्ग किमी", "तावा व देनवा संगम; MP का सबसे बड़ा रामसर स्थल व सतपुड़ा जैव विविधता।"]
];

const mpRamsarTableEn = [
  ["1", "**Bhoj Wetland**", "Bhopal", "2002", "32 sq km", "Upper Lake (Bada Talab) & Lower Lake; Sarus Crane habitat."],
  ["2", "**Sakhya Sagar**", "Shivpuri (Madhav National Park)", "2022", "2.48 sq km", "On Maniyar River; habitat for Mugger Crocodiles & Otters."],
  ["3", "**Sirpur Wetland**", "Indore", "2022", "1.61 sq km", "130-year-old Holkar-built lake; home to 130+ bird species."],
  ["4", "**Yashwant Sagar**", "Indore (Depalpur)", "2022", "8.22 sq km", "On Gambhir River; critical breeding site for Sarus Crane (IBA)."],
  ["5", "**Tawa Reservoir**", "Narmadapuram (Satpura TR)", "2024", "200 sq km", "Confluence of Tawa & Denwa rivers; largest MP Ramsar site."]
];

// Dedicated Blocks for MP Ramsar Sites Section
const mpSectionBlocksHi = [
  {
    _type: "block",
    style: "h3",
    children: [{ _type: "span", text: "6. मध्य प्रदेश के 5 रामसर स्थल (Ramsar Sites in Madhya Pradesh - Complete List & MPPSC Notes)" }],
  },
  {
    _type: "block",
    style: "normal",
    children: [
      { _type: "span", text: "मध्य प्रदेश में वर्तमान में कुल " },
      { _type: "span", marks: ["strong"], text: "5 अंतरराष्ट्रीय महत्व के रामसर स्थल (5 Ramsar Sites in MP)" },
      { _type: "span", text: " स्थित हैं। MPPSC प्रारंभिक परीक्षा (Unit-7) तथा मुख्य परीक्षा (GS-3) दोनों के दृष्टिकोण से यह टॉपिक अत्यंत महत्वपूर्ण है। नीचे मध्य प्रदेश के सभी 5 रामसर स्थलों की विशेष SEO तालिका व विस्तृत विवरण प्रस्तुत है:" }
    ]
  },
  {
    _type: "table",
    caption: "मध्य प्रदेश के 5 रामसर स्थलों की पृथक सूची (5 Ramsar Sites in Madhya Pradesh Table)",
    headers: ["क्रमांक", "रामसर स्थल का नाम", "जिला", "नामित वर्ष", "क्षेत्रफल", "प्रमुख पारिस्थितिक विशेषता"],
    rows: mpRamsarTableHi
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **1. भोज आर्द्रभूमि (Bhoj Wetland, Bhopal - 2002)**: यह मध्य प्रदेश का प्रथम रामसर स्थल है (वर्ष 2002 में घोषित)। इसमें दो मानव निर्मित झीलें—'अपर लेक' (बड़ा तालाब, जो 11वीं सदी में परमार राजा भोज द्वारा निर्मित) और 'लोअर लेक' (छोटा तालाब) शामिल हैं। यह सारस क्रेन और विविध प्रवासी जलपक्षियों का मुख्य प्राकृतिक आवास है।" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **2. साख्य सागर (Sakhya Sagar, Shivpuri - 2022)**: शिवपुरी जिले में माधव राष्ट्रीय उद्यान के निकट स्थित यह जलाशय मणियार नदी पर बना हुआ है। यह दलदली मगरमच्छों (Mugger Crocodiles) और चिकने कोट वाले ऊदबिलावों (Smooth-Coated Otters) का प्रमुख आश्रय स्थल है।" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **3. सिरपुर आर्द्रभूमि (Sirpur Wetland, Indore - 2022)**: इंदौर में स्थित यह 130 वर्ष पुराना मानव निर्मित आर्द्रभूमि क्षेत्र इंदौर के होल्कर राजवंश द्वारा विकसित किया गया था। यह 130 से अधिक पक्षी प्रजातियों (जैसे मिस्र का गिद्ध, कॉमन पोचार्ड) का शीतकालीन आवास है।" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **4. यशवंत सागर (Yashwant Sagar, Indore - 2022)**: इंदौर जिले के देपालपुर क्षेत्र में गंभीर नदी पर बना यह जलाशय मध्य भारत में 'सारस क्रेन' (Sarus Crane) का सबसे बड़ा प्रजनन क्षेत्र माना जाता है और इसे बॉम्बे नेचुरल हिस्ट्री सोसाइटी (BNHS) द्वारा महत्वपूर्ण पक्षी क्षेत्र (IBA) घोषित किया गया है।" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **5. तावा जलाशय (Tawa Reservoir, Narmadapuram - 2024)**: नर्मदापुरम जिले में सतपुड़ा टाइगर रिजर्व की सीमा के भीतर तावा और देनवा नदी के संगम पर स्थित यह जलाशय मध्य प्रदेश का सबसे बड़ा रामसर स्थल (200 वर्ग किमी) है। यह मत्स्य विविधता एवं भारतीय विशाल गिलहरी (Indian Giant Squirrel) का निवास स्थान है।" }]
  }
];

const mpSectionBlocksEn = [
  {
    _type: "block",
    style: "h3",
    children: [{ _type: "span", text: "6. 5 Ramsar Sites in Madhya Pradesh (Ramsar Sites in MP - Complete List & MPPSC Notes)" }],
  },
  {
    _type: "block",
    style: "normal",
    children: [
      { _type: "span", text: "Madhya Pradesh currently has " },
      { _type: "span", marks: ["strong"], text: "5 Ramsar Sites of international importance" },
      { _type: "span", text: ". Below is the dedicated list and detailed ecological analysis of all 5 Ramsar sites in MP for MPPSC & UPSC preparation:" }
    ]
  },
  {
    _type: "table",
    caption: "5 Ramsar Sites in Madhya Pradesh (MPPSC SEO Table)",
    headers: ["S.No", "Ramsar Site Name", "District", "Year", "Area", "Key Ecological Features"],
    rows: mpRamsarTableEn
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **1. Bhoj Wetland (Bhopal - 2002)**: MP's 1st Ramsar site. Consists of Upper Lake (Bada Talab, built by King Bhoj in 11th century) and Lower Lake. Habitat for Sarus Crane and migratory birds." }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **2. Sakhya Sagar (Shivpuri - 2022)**: Reservoir on Maniyar River adjacent to Madhav National Park. Home to Mugger Crocodiles and Smooth-Coated Otters." }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **3. Sirpur Wetland (Indore - 2022)**: 130-year-old man-made wetland created by Holkar rulers of Indore. Supports 130+ migratory waterbird species." }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **4. Yashwant Sagar (Indore - 2022)**: Reservoir on Gambhir River. Largest Sarus Crane breeding area in Central India and designated Important Bird Area (IBA)." }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "• **5. Tawa Reservoir (Narmadapuram - 2024)**: Located inside Satpura Tiger Reserve at Tawa-Denwa confluence. Largest Ramsar site in MP (200 sq km)." }]
  }
];

async function main() {
  console.log("🚀 Inserting dedicated '6. मध्य प्रदेश के 5 रामसर स्थल' section into Sanity documents...");

  const docIds = [
    "ca-ramsar-sites-in-india-2026",
    "ca-ramsar-sites-in-india-2026-seo",
    "ca-ramsar-sites-in-india-short",
    "ca-ramsar-sites-in-india"
  ];

  for (const docId of docIds) {
    const doc = await client.fetch(`*[_id == $docId][0]`, { docId });
    if (!doc) continue;

    // Filter out previous MP section if any, to avoid duplication
    const cleanBody = doc.body.filter((b: any) => !b.children?.[0]?.text?.includes("मध्य प्रदेश के 5 रामसर स्थल"));
    const cleanBodyEn = (doc.bodyEn || []).filter((b: any) => !b.children?.[0]?.text?.includes("5 Ramsar Sites in Madhya Pradesh"));

    // Find position of section 6 (which will become section 7)
    const insertIdx = cleanBody.findIndex((b: any) => b.children?.[0]?.text?.includes("भारत के प्रमुख रामसर स्थल"));
    const splitAt = insertIdx !== -1 ? insertIdx : cleanBody.length - 2;

    // Renumber subsequent section headers in Hindi
    const newBody = [
      ...cleanBody.slice(0, splitAt),
      ...mpSectionBlocksHi,
      ...cleanBody.slice(splitAt).map((block: any) => {
        if (block.style === "h3" && block.children?.[0]?.text) {
          let text = block.children[0].text;
          if (text.startsWith("6.")) text = text.replace("6.", "7.");
          else if (text.startsWith("7.")) text = text.replace("7.", "8.");
          else if (text.startsWith("8.")) text = text.replace("8.", "9.");
          return { ...block, children: [{ ...block.children[0], text }] };
        }
        return block;
      })
    ];

    const insertIdxEn = cleanBodyEn.findIndex((b: any) => b.children?.[0]?.text?.includes("Major Comparative Facts"));
    const splitAtEn = insertIdxEn !== -1 ? insertIdxEn : cleanBodyEn.length - 2;

    const newBodyEn = [
      ...cleanBodyEn.slice(0, splitAtEn),
      ...mpSectionBlocksEn,
      ...cleanBodyEn.slice(splitAtEn).map((block: any) => {
        if (block.style === "h3" && block.children?.[0]?.text) {
          let text = block.children[0].text;
          if (text.startsWith("6.")) text = text.replace("6.", "7.");
          else if (text.startsWith("7.")) text = text.replace("7.", "8.");
          else if (text.startsWith("8.")) text = text.replace("8.", "9.");
          return { ...block, children: [{ ...block.children[0], text }] };
        }
        return block;
      })
    ];

    const updatedKeywords = Array.from(new Set([
      ...(doc.keywords || []),
      "मध्य प्रदेश के 5 रामसर स्थल",
      "Ramsar Sites in Madhya Pradesh",
      "MP 5 Ramsar Sites",
      "Bhoj Wetland Bhopal MPPSC",
      "Sakhya Sagar Shivpuri",
      "Sirpur Wetland Indore",
      "Yashwant Sagar Indore",
      "Tawa Reservoir Narmadapuram MPPSC"
    ]));

    await client.patch(docId).set({ body: newBody, bodyEn: newBodyEn, keywords: updatedKeywords }).commit();
    console.log(`✅ Successfully inserted MP Ramsar Sites section into: ${docId}`);
  }

  console.log("✨ All documents updated with dedicated MP Ramsar Sites section!");
}

main().catch((err) => {
  console.error("❌ Error updating MP Ramsar section:", err);
  process.exit(1);
});
