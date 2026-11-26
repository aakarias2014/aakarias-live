import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

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

// Helper function to sanitize text by stripping zero-width unicode characters
function sanitizeText(str: string): string {
  if (!str) return "";
  return str.replace(/[\u200B-\u200D\u200E\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u00AD\u2000-\u200A]/g, "").trim();
}

function createTable(key: string, caption: string, headers: string[], rows: string[][]): any {
  const cleanedHeaders = headers.map(sanitizeText);
  const cleanedRows = rows.map((r) => r.map(sanitizeText));
  return {
    _key: key,
    _type: "table",
    table: {
      caption: sanitizeText(caption),
      headers: cleanedHeaders,
      rows: cleanedRows,
    },
  };
}

async function main() {
  console.log("🚀 Starting upload process for 'Constitution Day 2026 (Samvidhan Diwas)' Article...");

  const imagePaths = {
    cover: path.resolve(process.cwd(), "public/images/blog/constitution-day-2026-samvidhan-diwas-cover.jpg"),
    preamble: path.resolve(process.cwd(), "public/images/blog/indian-constitution-preamble-manuscript.jpg"),
  };

  if (!fs.existsSync(imagePaths.cover) || !fs.existsSync(imagePaths.preamble)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Cover Banner Image
  console.log("📸 Uploading cover banner image to Sanity...");
  const coverStream = fs.createReadStream(imagePaths.cover);
  const coverAsset = await client.assets.upload("image", coverStream, {
    filename: "constitution-day-2026-samvidhan-diwas-cover.jpg",
    contentType: "image/jpeg",
  });
  console.log("✔ Uploaded Cover Image. Asset ID:", coverAsset._id);

  // 2. Upload Supporting Preamble Image
  console.log("📸 Uploading Preamble Manuscript image to Sanity...");
  const preambleStream = fs.createReadStream(imagePaths.preamble);
  const preambleAsset = await client.assets.upload("image", preambleStream, {
    filename: "indian-constitution-preamble-manuscript.jpg",
    contentType: "image/jpeg",
  });
  console.log("✔ Uploaded Supporting Image. Asset ID:", preambleAsset._id);

  const docSlug = "constitution-day-2026-history-theme-preamble";
  const publishedAt = "2026-11-26T08:00:00Z";

  const targetDocIds = [
    { docId: "ca-constitution-day-2026", type: "currentAffairs" },
    { docId: "gk-constitution-day-2026", type: "staticGk" },
  ];

  for (const { docId, type } of targetDocIds) {
    console.log(`📌 Upserting document ${docId}...`);

    const articlePayload = {
      _type: type,
      title: "संविधान दिवस 2026: इतिहास, महत्व, प्रस्तावना, थीम और महत्वपूर्ण तथ्य | MPPSC & UPSC",
      titleEn: "Constitution Day 2026 (Samvidhan Diwas): History, Theme @76, Preamble & Exam Facts | MPPSC & UPSC",
      slug: { _type: "slug", current: docSlug },
      publishedAt: publishedAt,
      date: "2026-11-26",
      ca_date: "2026-11-26",
      readingTime: 12,
      category: {
        _type: "reference",
        _ref: "cat-polity", // राजव्यवस्था
      },
      author: {
        _type: "reference",
        _ref: "author-aakar-ias-team",
      },
      tags: [
        { _type: "reference", _ref: "tag-mppsc", _key: "t-mppsc" },
        { _type: "reference", _ref: "tag-upsc", _key: "t-upsc" },
        { _type: "reference", _ref: "tag-important-days", _key: "t-days" },
        { _type: "reference", _ref: "tag-national-affairs", _key: "t-nat" },
        { _type: "reference", _ref: "tag-prelims", _key: "t-prelims" },
        { _type: "reference", _ref: "tag-mains", _key: "t-mains" },
      ],
      syllabus: [
        "MPPSC Prelims 2026 Unit 5 (भारत एवं मध्य प्रदेश की संवैधानिक व्यवस्था / Constitution of India)",
        "MPPSC Mains 2026 Paper 2 Part A (भारतीय संविधान: निर्माण, विशेषताएँ, प्रस्तावना एवं मूल संरचना)",
        "UPSC CSE GS Paper 2 (Indian Constitution: Historical Underpinnings, Evolution, Features & Preamble)",
      ],
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: coverAsset._id,
        },
        alt: "संविधान दिवस 2026 भारतीय संविधान डॉ बी आर आंबेडकर संसद भवन Constitution Day 2026 India",
        caption: "संविधान दिवस 2026 (26 नवंबर): ‘संविधान @76: डॉ. बी. आर. आंबेडकर की संवैधानिक दृष्टि और भारतीय लोकतंत्र का भविष्य’",
      },
      excerpt: "संविधान दिवस प्रत्येक वर्ष 26 नवंबर को मनाया जाता है। जानें संविधान दिवस 2026 की थीम, 26 नवंबर 1949 का इतिहास, भारतीय संविधान की प्रस्तावना, 42वां संविधान संशोधन, डॉ. बी. आर. आंबेडकर का योगदान एवं MPPSC व UPSC परीक्षा के लिए महत्वपूर्ण तथ्य।",
      excerptEn: "Constitution Day (Samvidhan Diwas) is celebrated every year on November 26 in India. Explore the 2026 theme, history since 1949, the complete Preamble, 42nd Amendment, Dr. B.R. Ambedkar's role, and high-yield notes for MPPSC & UPSC.",
      keywords: [
        "संविधान दिवस 2026",
        "Constitution Day 2026",
        "Samvidhan Diwas 2026",
        "संविधान दिवस कब मनाया जाता है",
        "संविधान दिवस 2026 की थीम क्या है",
        "The Constitution @76 Dr. B.R. Ambedkar's Constitutional Vision",
        "संविधान दिवस का इतिहास",
        "भारतीय संविधान कब अपनाया गया था",
        "संविधान सभा के अध्यक्ष कौन थे",
        "संविधान प्रारूप समिति के अध्यक्ष कौन थे",
        "संविधान निर्माण में कितना समय लगा",
        "भारतीय संविधान की प्रस्तावना हिंदी में",
        "42वें संविधान संशोधन द्वारा प्रस्तावना में कौन से शब्द जोड़े गए",
        "संविधान दिवस और गणतंत्र दिवस में अंतर",
        "MPPSC के लिए संविधान दिवस के महत्वपूर्ण तथ्य",
        "Kesavananda Bharati Case Basic Structure Doctrine",
        "National Law Day 26 November India",
        "Constitution Day India 2026 MPPSC UPSC Notes",
      ],
      sources: [
        {
          label: "PIB – संविधान दिवस 2026 की तिथि और आयोजन",
          url: "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2341449&lang=1&reg=1",
        },
        {
          label: "PIB – संविधान दिवस 2026 की आधिकारिक थीम",
          url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2340938&lang=2&reg=48",
        },
        {
          label: "India Code – भारतीय संविधान की प्रस्तावना",
          url: "https://www.indiacode.nic.in/bitstream/123456789/19150/1/constitution_of_india.pdf",
        },
        {
          label: "PIB – संविधान निर्माण के महत्वपूर्ण तथ्य",
          url: "https://newindiasamachar.pib.gov.in/WriteReadData/Magazine/2026/Nov/M202611161.pdf",
        },
      ],
      nextArticle: {
        _type: "reference",
        _ref: "ca-west-bengal-name-change-paschim-banga-2026",
      },
      sections: [
        // Section 1: संविधान दिवस 2026 परिचय एवं त्वरित सारणी
        {
          _key: "sec-intro",
          kind: "whyInNews",
          title: "1. संविधान दिवस 2026: एक नजर में (Introduction & Quick Overview)",
          titleEn: "1. Constitution Day 2026: Introduction & Overview at a Glance",
          body: [
            {
              _key: "blk-in-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "**संविधान दिवस प्रत्येक वर्ष 26 नवंबर को मनाया जाता है।** **संविधान दिवस 2026 (Constitution Day 2026)** भारत में **26 नवंबर 2026** को मनाया जाएगा। यह दिवस भारतीय संविधान को अपनाए जाने की ऐतिहासिक घटना की याद दिलाता है। **26 नवंबर 1949** को संविधान सभा ने भारतीय संविधान को अंगीकृत किया था, जबकि यह **26 जनवरी 1950** को लागू हुआ। संविधान दिवस का उद्देश्य नागरिकों में संविधान के प्रति जागरूकता बढ़ाना और न्याय, स्वतंत्रता, समानता तथा बंधुता जैसे संवैधानिक मूल्यों को मजबूत करना है।",
                },
              ],
            },
            {
              _key: "blk-in-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "वर्ष 2026 में संविधान दिवस की आधिकारिक थीम है— **“The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy”** अर्थात् **“संविधान @76: डॉ. बी. आर. आंबेडकर की संवैधानिक दृष्टि और भारतीय लोकतंत्र का भविष्य”**।",
                },
              ],
            },
            {
              _key: "blk-in-h3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "संविधान दिवस 2026: एक नजर में (Quick Facts Table)",
                },
              ],
            },
            createTable(
              "tbl-overview",
              "संविधान दिवस 2026 से संबंधित प्रमुख तथ्य",
              ["महत्वपूर्ण जानकारी (Fact)", "विवरण (Details)"],
              [
                ["संविधान दिवस", "26 नवंबर (प्रतिवर्ष)"],
                ["संविधान दिवस 2026", "26 नवंबर 2026"],
                ["संविधान अपनाया गया", "26 नवंबर 1949"],
                ["संविधान लागू हुआ", "26 जनवरी 1950"],
                ["संविधान सभा के अध्यक्ष", "डॉ. राजेंद्र प्रसाद"],
                ["प्रारूप समिति के अध्यक्ष", "डॉ. बी. आर. आंबेडकर"],
                ["संविधान दिवस मनाने की शुरुआत", "वर्ष 2015 (डॉ. आंबेडकर की 125वीं जयंती वर्ष पर)"],
                ["2026 की थीम", "The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy"],
              ]
            ),
            {
              _key: "blk-in-3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "संविधान दिवस क्या है और 26 नवंबर को ही क्यों मनाया जाता है?",
                },
              ],
            },
            {
              _key: "blk-in-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **संविधान दिवस क्या है:** संविधान दिवस भारत में प्रत्येक वर्ष 26 नवंबर को मनाया जाने वाला एक महत्वपूर्ण राष्ट्रीय दिवस है। भारतीय संविधान देश की शासन व्यवस्था, नागरिकों के अधिकारों, राज्य के कर्तव्यों और लोकतांत्रिक संस्थाओं के कार्य करने के आधार को निर्धारित करता है। इसका उद्देश्य केवल ऐतिहासिक घटना को याद करना नहीं, बल्कि नागरिकों को संविधान में निहित मूल्यों के प्रति जागरूक करना है।",
                },
              ],
            },
            {
              _key: "blk-in-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **26 नवंबर को ही क्यों:** **26 नवंबर 1949** को संविधान सभा ने भारतीय संविधान को **अंगीकृत, अधिनियमित और आत्मार्पित** किया था। इसी ऐतिहासिक घटना की स्मृति में 26 नवंबर को संविधान दिवस मनाया जाता है। हालांकि इसके अधिकांश प्रावधान **26 जनवरी 1950** को लागू हुए, इसलिए 26 जनवरी को भारत में गणतंत्र दिवस मनाया जाता है।",
                },
              ],
            },
          ],
          bodyEn: [
            {
              _key: "blk-en-in-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "**Constitution Day (Samvidhan Diwas) is celebrated every year on November 26.** **Constitution Day 2026** will be observed across India on **November 26, 2026**, commemorating the historic adoption of the Constitution of India by the Constituent Assembly on **November 26, 1949** (coming into full effect on **January 26, 1950**). Its goal is to promote constitutional awareness among citizens and reinforce the values of justice, liberty, equality, and fraternity.",
                },
              ],
            },
            {
              _key: "blk-en-in-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "The official theme for Constitution Day 2026 is: **“The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy”**.",
                },
              ],
            },
            {
              _key: "blk-en-in-h3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "Constitution Day 2026: At a Glance",
                },
              ],
            },
            createTable(
              "tbl-en-overview",
              "Constitution Day 2026: Key Facts & Milestones",
              ["Key Parameter", "Details"],
              [
                ["Constitution Day (Samvidhan Diwas)", "November 26 (Annually)"],
                ["Constitution Day 2026 Date", "November 26, 2026"],
                ["Date of Adoption", "November 26, 1949"],
                ["Date of Enforcement", "January 26, 1950"],
                ["President of Constituent Assembly", "Dr. Rajendra Prasad"],
                ["Chairman of Drafting Committee", "Dr. B.R. Ambedkar"],
                ["Official Inception as Constitution Day", "2015 (125th Birth Anniversary Year of Dr. Ambedkar)"],
                ["2026 Official Theme", "The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy"],
              ]
            ),
            {
              _key: "blk-en-in-3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "What is Constitution Day and Why November 26?",
                },
              ],
            },
            {
              _key: "blk-en-in-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Meaning & Purpose:** The Constitution defines India's governance architecture, fundamental rights, directive duties, and institutional checks. Samvidhan Diwas educates citizens about constitutional morality and democratic ideals.",
                },
              ],
            },
            {
              _key: "blk-en-in-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Significance of November 26:** On **November 26, 1949**, the Constituent Assembly formally adopted, enacted, and gave to the people of India the Constitution. While major provisions commenced on **January 26, 1950** (celebrated as Republic Day), November 26 marks the completion and adoption of the supreme law.",
                },
              ],
            },
          ],
        },

        // Section 2: इतिहास, 2026 थीम एवं महत्वपूर्ण तिथियां
        {
          _key: "sec-history-theme",
          kind: "background",
          title: "2. संविधान दिवस का इतिहास, 2026 की थीम एवं निर्माण की प्रमुख तिथियां (History & Theme)",
          titleEn: "2. History of Constitution Day, 2026 Theme & Constituent Assembly Timeline",
          body: [
            {
              _key: "blk-ht-h3-1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "संविधान दिवस का इतिहास (राष्ट्रीय विधि दिवस से संविधान दिवस तक)",
                },
              ],
            },
            {
              _key: "blk-ht-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **संविधान सभा की शुरुआत:** भारत का संविधान स्वतंत्रता प्राप्ति के बाद देश की शासन व्यवस्था को लोकतांत्रिक और संवैधानिक आधार प्रदान करने के लिए तैयार किया गया था। संविधान सभा की पहली बैठक **9 दिसंबर 1946** को हुई थी। इसके बाद विस्तृत चर्चा के उपरांत **26 नवंबर 1949** को संविधान को अपनाया गया।",
                },
              ],
            },
            {
              _key: "blk-ht-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **वर्ष 2015 से आधिकारिक घोषणा:** भारत सरकार ने **वर्ष 2015** में 26 नवंबर को आधिकारिक रूप से **संविधान दिवस** के रूप में मनाने का निर्णय लिया। यह ऐतिहासिक निर्णय **डॉ. बी. आर. आंबेडकर की 125वीं जयंती वर्ष** के अवसर पर लिया गया था। इससे पहले 26 नवंबर को **राष्ट्रीय विधि दिवस (National Law Day)** के रूप में जाना जाता था।",
                },
              ],
            },
            {
              _key: "blk-ht-h3-2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "संविधान दिवस 2026 की थीम (Official Theme 2026)",
                },
              ],
            },
            {
              _key: "blk-ht-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "संविधान दिवस 2026 की थीम **“The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy”** (हिंदी अर्थ: **“संविधान @76: डॉ. बी. आर. आंबेडकर की संवैधानिक दृष्टि और भारतीय लोकतंत्र का भविष्य”**) है। यह थीम न्याय, स्वतंत्रता, समानता और बंधुता के महत्व के साथ लोकतांत्रिक शासन, **संवैधानिक नैतिकता (Constitutional Morality)**, संस्थागत जवाबदेही तथा समावेशी समाज की अवधारणा को रेखांकित करती है।",
                },
              ],
            },
            {
              _key: "blk-ht-h3-3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "भारतीय संविधान निर्माण की महत्वपूर्ण तिथियां (1946–1950)",
                },
              ],
            },
            createTable(
              "tbl-making-dates",
              "भारतीय संविधान निर्माण से संबंधित प्रमुख ऐतिहासिक तिथियां",
              ["तिथि (Date)", "महत्वपूर्ण घटना (Milestone Event)"],
              [
                ["9 दिसंबर 1946", "संविधान सभा की पहली बैठक (अस्थायी अध्यक्ष: डॉ. सच्चिदानंद सिन्हा)"],
                ["11 दिसंबर 1946", "डॉ. राजेंद्र प्रसाद संविधान सभा के स्थायी अध्यक्ष चुने गए"],
                ["13 दिसंबर 1946", "पंडित जवाहरलाल नेहरू ने ऐतिहासिक उद्देश्य प्रस्ताव (Objectives Resolution) प्रस्तुत किया"],
                ["22 जनवरी 1947", "उद्देश्य प्रस्ताव संविधान सभा द्वारा सर्वसम्मति से स्वीकार किया गया"],
                ["29 अगस्त 1947", "डॉ. बी. आर. आंबेडकर की अध्यक्षता में प्रारूप समिति (Drafting Committee) का गठन"],
                ["26 नवंबर 1949", "भारतीय संविधान अंगीकृत एवं अपनाया गया"],
                ["24 जनवरी 1950", "संविधान सभा के सदस्यों ने संविधान पर अंतिम हस्ताक्षर किए"],
                ["26 जनवरी 1950", "भारतीय संविधान पूर्णतः लागू हुआ (गणतंत्र दिवस)"],
              ]
            ),
            {
              _key: "blk-ht-4",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "संविधान सभा, प्रारूप समिति और निर्माण अवधि",
                },
              ],
            },
            {
              _key: "blk-ht-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **संविधान सभा के अध्यक्ष:** **डॉ. राजेंद्र प्रसाद** संविधान सभा के स्थायी अध्यक्ष थे। संविधान निर्माण की संपूर्ण प्रक्रिया के संचालन में उन्होंने महत्वपूर्ण भूमिका निभाई।",
                },
              ],
            },
            {
              _key: "blk-ht-6",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **प्रारूप समिति के अध्यक्ष एवं गठन:** **डॉ. भीमराव रामजी आंबेडकर** भारतीय संविधान की प्रारूप समिति के अध्यक्ष थे। उन्हें भारतीय संविधान का प्रमुख शिल्पकार कहा जाता है। प्रारूप समिति का गठन **29 अगस्त 1947** को किया गया था।",
                },
              ],
            },
            {
              _key: "blk-ht-7",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **संविधान निर्माण में लगा कुल समय:** भारतीय संविधान के निर्माण में लगभग **2 वर्ष, 11 महीने और 18 दिन** का समय लगा। इसमें शासन व्यवस्था, नागरिकों के अधिकार, केंद्र-राज्य संबंध (जैसे [अनुच्छेद 3 व राज्य पुनर्गठन](/current-affairs/west-bengal-name-change-paschim-banga-2026)), न्यायपालिका और सामाजिक न्याय से जुड़े विषयों पर गहन विचार-विमर्श हुआ।",
                },
              ],
            },
          ],
          bodyEn: [
            {
              _key: "blk-en-ht-h3-1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "History of Constitution Day (From National Law Day to Samvidhan Diwas)",
                },
              ],
            },
            {
              _key: "blk-en-ht-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Genesis of the Constituent Assembly:** The Constituent Assembly held its inaugural session on **December 9, 1946**, culminating in the formal adoption of the Constitution on **November 26, 1949**.",
                },
              ],
            },
            {
              _key: "blk-en-ht-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **2015 Official Designation:** In **2015**, marking the **125th birth anniversary year of Dr. B.R. Ambedkar**, the Government of India officially declared November 26 as **Constitution Day (Samvidhan Diwas)**. Previously, the day was observed as **National Law Day**.",
                },
              ],
            },
            {
              _key: "blk-en-ht-h3-2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "Official Theme of Constitution Day 2026",
                },
              ],
            },
            {
              _key: "blk-en-ht-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "The 2026 theme is **“The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy”**. It highlights constitutional morality, institutional accountability, inclusive social justice, and democratic resilience.",
                },
              ],
            },
            {
              _key: "blk-en-ht-h3-3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "Milestone Dates in the Making of the Indian Constitution (1946–1950)",
                },
              ],
            },
            createTable(
              "tbl-en-making-dates",
              "Chronology of Key Dates in Framing India's Constitution",
              ["Date", "Historic Event"],
              [
                ["December 9, 1946", "First meeting of the Constituent Assembly (Interim President: Dr. Sachchidananda Sinha)"],
                ["December 11, 1946", "Dr. Rajendra Prasad elected permanent President of the Constituent Assembly"],
                ["December 13, 1946", "Jawaharlal Nehru moved the Objectives Resolution"],
                ["January 22, 1947", "Objectives Resolution unanimously adopted by the Constituent Assembly"],
                ["August 29, 1947", "Drafting Committee constituted under Dr. B.R. Ambedkar"],
                ["November 26, 1949", "Constitution of India formally adopted and enacted"],
                ["January 24, 1950", "Final signing of the Constitution by Assembly members"],
                ["January 26, 1950", "Constitution came into full force (Republic Day)"],
              ]
            ),
            {
              _key: "blk-en-ht-4",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "Constituent Assembly, Drafting Committee & Duration",
                },
              ],
            },
            {
              _key: "blk-en-ht-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **President of the Assembly:** **Dr. Rajendra Prasad** served as the permanent President, steering deliberations across diverse committees.",
                },
              ],
            },
            {
              _key: "blk-en-ht-6",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Drafting Committee & Chief Architect:** Formed on **August 29, 1947**, the Drafting Committee was chaired by **Dr. B.R. Ambedkar**, revered as the chief architect of the Indian Constitution.",
                },
              ],
            },
            {
              _key: "blk-en-ht-7",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Total Drafting Duration:** Framing the Constitution took exactly **2 years, 11 months, and 18 days**, encompassing exhaustive debates on fundamental rights, federalism (such as [Article 3 state reorganization](/en/current-affairs/west-bengal-name-change-paschim-banga-2026)), and judicial independence.",
                },
              ],
            },
          ],
        },

        // Section 3: भारतीय संविधान की प्रस्तावना एवं महत्वपूर्ण तथ्य
        {
          _key: "sec-preamble",
          kind: "reforms",
          title: "3. भारतीय संविधान की प्रस्तावना, 42वां संशोधन एवं केशवानंद भारती वाद (Preamble & Basic Structure)",
          titleEn: "3. Preamble of the Constitution of India, 42nd Amendment & Basic Structure Doctrine",
          body: [
            {
              _key: "blk-pr-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "भारतीय संविधान की **प्रस्तावना (Preamble)** संविधान के उद्देश्यों और मूल आदर्शों को स्पष्ट करती है। यह बताती है कि भारत किस प्रकार का राष्ट्र है और नागरिकों को किन मूल्यों की प्राप्ति सुनिश्चित करने का संकल्प लिया गया है।",
                },
              ],
            },
            {
              _key: "blk-pr-img",
              _type: "image",
              asset: {
                _type: "reference",
                _ref: preambleAsset._id,
              },
              alt: "भारतीय संविधान की प्रस्तावना मूल पांडुलिपि Preamble of Indian Constitution illuminated manuscript",
              caption: "भारतीय संविधान की मूल सुसज्जित प्रस्तावना (Original Calligraphed & Illuminated Preamble)",
            },
            {
              _key: "blk-pr-h3-1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "भारतीय संविधान की संपूर्ण प्रस्तावना (हिंदी में)",
                },
              ],
            },
            {
              _key: "blk-pr-quote",
              _type: "block",
              style: "blockquote",
              children: [
                {
                  _type: "span",
                  text: "“हम, भारत के लोग, भारत को एक संपूर्ण प्रभुत्व-संपन्न, समाजवादी, पंथनिरपेक्ष, लोकतंत्रात्मक गणराज्य बनाने के लिए, तथा उसके समस्त नागरिकों को: सामाजिक, आर्थिक और राजनीतिक न्याय, विचार, अभिव्यक्ति, विश्वास, धर्म और उपासना की स्वतंत्रता, प्रतिष्ठा और अवसर की समता प्राप्त कराने के लिए, तथा उन सब में व्यक्ति की गरिमा और राष्ट्र की एकता और अखंडता सुनिश्चित कराने वाली बंधुता बढ़ाने के लिए, दृढ़ संकल्प होकर अपनी संविधान सभा में आज तारीख 26 नवंबर 1949 ई. को एतद्द्वारा इस संविधान को अंगीकृत, अधिनियमित और आत्मार्पित करते हैं।”",
                },
              ],
            },
            {
              _key: "blk-pr-h3-2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "संविधान की प्रस्तावना के महत्वपूर्ण परीक्षा तथ्य",
                },
              ],
            },
            {
              _key: "blk-pr-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **प्रस्तावना के चार प्रमुख आदर्श:** भारतीय संविधान की प्रस्तावना में चार मूलभूत आदर्शों का उल्लेख किया गया है: **1. न्याय (Justice), 2. स्वतंत्रता (Liberty), 3. समानता (Equality), और 4. बंधुता (Fraternity)**। ये चारों आदर्श भारतीय लोकतंत्र की आधारशिला हैं।",
                },
              ],
            },
            {
              _key: "blk-pr-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **42वां संविधान संशोधन अधिनियम, 1976:** इसके द्वारा प्रस्तावना में तीन नए शब्द जोड़े गए— **समाजवादी (Socialist), पंथनिरपेक्ष (Secular), तथा अखंडता (Integrity)**। (प्रस्तावना में अब तक केवल एक ही बार संशोधन हुआ है)।",
                },
              ],
            },
            {
              _key: "blk-pr-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **केशवानंद भारती मामला (1973) व मूल संरचना सिद्धांत:** सर्वोच्च न्यायालय ने *केशवानंद भारती बनाम केरल राज्य (1973)* के ऐतिहासिक निर्णय में स्पष्ट किया कि **प्रस्तावना संविधान का अभिन्न हिस्सा है**। इसी निर्णय में **मूल संरचना सिद्धांत (Basic Structure Doctrine)** प्रतिपादित हुआ, जिसके अनुसार संसद संविधान में संशोधन कर सकती है, किंतु उसकी मूल संरचना को नष्ट नहीं कर सकती।",
                },
              ],
            },
          ],
          bodyEn: [
            {
              _key: "blk-en-pr-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "The **Preamble** encapsulates the fundamental philosophy, sovereign goals, and core ideals of the Constitution of India.",
                },
              ],
            },
            {
              _key: "blk-en-pr-img",
              _type: "image",
              asset: {
                _type: "reference",
                _ref: preambleAsset._id,
              },
              alt: "Original illuminated Preamble of the Constitution of India manuscript",
              caption: "The Original Calligraphed and Illuminated Preamble of the Constitution of India",
            },
            {
              _key: "blk-en-pr-h3-1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "Text of the Preamble of India",
                },
              ],
            },
            {
              _key: "blk-en-pr-quote",
              _type: "block",
              style: "blockquote",
              children: [
                {
                  _type: "span",
                  text: "“WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN, SOCIALIST, SECULAR, DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation; IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.”",
                },
              ],
            },
            {
              _key: "blk-en-pr-h3-2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "Critical Facts About the Preamble",
                },
              ],
            },
            {
              _key: "blk-en-pr-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Four Core Constitutional Ideals:** The Preamble enshrines four foundational pillars: **1. Justice, 2. Liberty, 3. Equality, and 4. Fraternity**.",
                },
              ],
            },
            {
              _key: "blk-en-pr-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **42nd Constitutional Amendment Act, 1976:** Added three terms to the Preamble— **Socialist, Secular, and Integrity** (the Preamble has been amended only once in history).",
                },
              ],
            },
            {
              _key: "blk-en-pr-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Kesavananda Bharati Case (1973) & Basic Structure:** The Supreme Court affirmed that the **Preamble is an integral part of the Constitution** and propounded the **Basic Structure Doctrine**, establishing that Parliament cannot alter or destroy the Constitution's foundational structure.",
                },
              ],
            },
          ],
        },

        // Section 4: संविधान दिवस का महत्व, गणतंत्र दिवस से अंतर एवं आयोजन
        {
          _key: "sec-significance-diff",
          kind: "initiatives",
          title: "4. संविधान दिवस का महत्व, गणतंत्र दिवस से अंतर एवं 2026 के कार्यक्रम (Significance & Comparison)",
          titleEn: "4. Significance of Constitution Day, Difference from Republic Day & 2026 Observance",
          body: [
            {
              _key: "blk-sd-h3-1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "संविधान दिवस के 5 प्रमुख महत्व",
                },
              ],
            },
            {
              _key: "blk-sd-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **1. संवैधानिक जागरूकता:** नागरिकों को संविधान की संरचना, उद्देश्यों और संस्थागत कार्यप्रणाली से परिचित कराना।",
                },
              ],
            },
            {
              _key: "blk-sd-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **2. मौलिक अधिकारों की जानकारी:** नागरिकों को उनके मौलिक अधिकारों और उनकी संवैधानिक सुरक्षा (अनुच्छेद 32) के प्रति सजग बनाना।",
                },
              ],
            },
            {
              _key: "blk-sd-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **3. मौलिक कर्तव्यों की समझ:** अधिकारों के साथ-साथ संविधान (अनुच्छेद 51A), राष्ट्रीय प्रतीकों और लोकतांत्रिक संस्थाओं के सम्मान के कर्तव्यों का बोध कराना।",
                },
              ],
            },
            {
              _key: "blk-sd-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **4. लोकतांत्रिक मूल्यों का सुदृढ़ीकरण:** न्याय, स्वतंत्रता, समानता और बंधुता के संवैधानिक आदर्शों को समाज में मजबूत करना।",
                },
              ],
            },
            {
              _key: "blk-sd-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **5. डॉ. बी. आर. आंबेडकर के योगदान का स्मरण:** संविधान के प्रमुख शिल्पकार डॉ. आंबेडकर और संविधान सभा के समस्त सदस्यों के ऐतिहासिक कार्यों का सम्मान करना।",
                },
              ],
            },
            {
              _key: "blk-sd-h3-2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "संविधान दिवस और गणतंत्र दिवस में अंतर (Comparison Table)",
                },
              ],
            },
            createTable(
              "tbl-diff-republic",
              "संविधान दिवस (26 नवंबर) बनाम गणतंत्र दिवस (26 जनवरी) तुलनात्मक सारणी",
              ["तुलना का आधार (Basis)", "संविधान दिवस (Constitution Day)", "गणतंत्र दिवस (Republic Day)"],
              [
                ["तिथि", "26 नवंबर", "26 जनवरी"],
                ["ऐतिहासिक महत्व", "संविधान अपनाया (अंगीकृत) गया", "संविधान पूर्णतः लागू हुआ"],
                ["ऐतिहासिक वर्ष", "1949", "1950"],
                ["मुख्य उद्देश्य", "संविधान के प्रति नागरिक जागरूकता एवं मूल्यों का प्रचार", "भारत के संप्रभु लोकतांत्रिक गणतंत्र बनने का राष्ट्रीय उत्सव"],
                ["आधिकारिक शुरुआत", "वर्ष 2015 से संविधान दिवस के रूप में", "वर्ष 1950 से गणतंत्र दिवस के रूप में"],
              ]
            ),
            {
              _key: "blk-sd-h3-3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "संविधान दिवस 2026 कैसे मनाया जाएगा? (National Celebrations)",
                },
              ],
            },
            {
              _key: "blk-sd-6",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **सामूहिक प्रस्तावना वाचन व कार्यक्रम:** देशभर के शैक्षणिक और सरकारी संस्थानों में संविधान की प्रस्तावना का सामूहिक वाचन, लोकतंत्र पर व्याख्यान, स्कूलों/कॉलेजों में प्रश्नोत्तरी, निबंध व वाद-विवाद प्रतियोगिताएं, मौलिक अधिकार व कर्तव्य जागरूकता सत्र तथा डॉ. बी. आर. आंबेडकर के योगदान पर विशेष संगोष्ठियां आयोजित की जाती हैं।",
                },
              ],
            },
          ],
          bodyEn: [
            {
              _key: "blk-en-sd-h3-1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "Five Pillars of Significance of Constitution Day",
                },
              ],
            },
            {
              _key: "blk-en-sd-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **1. Constitutional Awareness:** Fosters widespread civic understanding of India's constitutional structure and ideals.",
                },
              ],
            },
            {
              _key: "blk-en-sd-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **2. Understanding Fundamental Rights:** Educates citizens on their enforceable rights and remedies (Article 32).",
                },
              ],
            },
            {
              _key: "blk-en-sd-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **3. Promoting Fundamental Duties:** Reminds citizens of their obligations (Article 51A) to respect national symbols and constitutional institutions.",
                },
              ],
            },
            {
              _key: "blk-en-sd-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **4. Strengthening Democratic Values:** Reinforces justice, liberty, equality, and fraternity in everyday governance.",
                },
              ],
            },
            {
              _key: "blk-en-sd-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **5. Honoring Dr. B.R. Ambedkar:** Pays tribute to Dr. Ambedkar and the entire Constituent Assembly for framing India's guiding legal charter.",
                },
              ],
            },
            {
              _key: "blk-en-sd-h3-2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "Difference Between Constitution Day and Republic Day",
                },
              ],
            },
            createTable(
              "tbl-en-diff-republic",
              "Comparison Matrix: Constitution Day vs Republic Day",
              ["Basis", "Constitution Day (Samvidhan Diwas)", "Republic Day"],
              [
                ["Date", "November 26", "January 26"],
                ["Historical Significance", "Constitution was adopted", "Constitution came into force"],
                ["Year", "1949", "1950"],
                ["Primary Objective", "Promote constitutional awareness and civic values", "Celebrate India becoming a sovereign democratic republic"],
                ["Official Inception", "Celebrated as Constitution Day since 2015", "Celebrated as Republic Day since 1950"],
              ]
            ),
            {
              _key: "blk-en-sd-h3-3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "How Constitution Day 2026 is Celebrated Nationwide",
                },
              ],
            },
            {
              _key: "blk-en-sd-6",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Nationwide Civic Observances:** Government ministries, schools, and universities hold mass readings of the Preamble, constitutional lectures, quiz and essay competitions, debates on rights and duties, and seminars honoring Dr. B.R. Ambedkar's legacy.",
                },
              ],
            },
          ],
        },

        // Section 5: MPPSC व अन्य परीक्षाओं के लिए स्मरणीय तथ्य
        {
          _key: "sec-exam-points",
          kind: "keyHighlights",
          title: "5. MPPSC एवं अन्य प्रतियोगी परीक्षाओं हेतु महत्वपूर्ण तथ्य (High-Yield Exam Notes)",
          titleEn: "5. High-Yield Constitutional Facts for MPPSC, UPSC & Other Competitive Exams",
          body: [
            {
              _key: "blk-ep-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **संविधान अपनाने एवं लागू होने की तिथि:** भारतीय संविधान **26 नवंबर 1949** को अपनाया गया और **26 जनवरी 1950** को लागू हुआ।",
                },
              ],
            },
            {
              _key: "blk-ep-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **संविधान सभा एवं प्रारूप समिति:** पहली बैठक **9 दिसंबर 1946** को हुई; स्थायी अध्यक्ष **डॉ. राजेंद्र प्रसाद** थे; प्रारूप समिति का गठन **29 अगस्त 1947** को हुआ जिसके अध्यक्ष **डॉ. बी. आर. आंबेडकर** थे।",
                },
              ],
            },
            {
              _key: "blk-ep-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **निर्माण अवधि एवं संशोधन:** संविधान निर्माण में **2 वर्ष, 11 महीने और 18 दिन** लगे। **42वें संविधान संशोधन, 1976** द्वारा प्रस्तावना में *समाजवादी, पंथनिरपेक्ष और अखंडता* शब्द जोड़े गए।",
                },
              ],
            },
            {
              _key: "blk-ep-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **संविधान दिवस की शुरुआत एवं थीम 2026:** वर्ष **2015** से आधिकारिक रूप से मनाया जा रहा है (पूर्व में राष्ट्रीय विधि दिवस)। 2026 की थीम **“The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy”** है।",
                },
              ],
            },
            {
              _key: "blk-ep-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **MPPSC परीक्षा की तैयारी एवं अन्य संसाधन:** MPPSC Prelims Unit 5 व Mains Paper 2 की संपूर्ण तैयारी के लिए [MPPSC Prelims Syllabus 2026](/mppsc/prelims-syllabus), [MPPSC Mains Syllabus 2026](/mppsc/mains-syllabus), [सामान्य ज्ञान नोट्स](/general-awareness) तथा [मध्य प्रदेश पुरातत्व विशेष: लेडी ऑफ नचना](/current-affairs/lady-of-nachna-1500-year-old-gupta-sculpture-panna-mppsc-notes) अवश्य पढ़ें।",
                },
              ],
            },
          ],
          bodyEn: [
            {
              _key: "blk-en-ep-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Adoption & Enforcement:** Adopted on **November 26, 1949**, and came into force on **January 26, 1950**.",
                },
              ],
            },
            {
              _key: "blk-en-ep-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Assembly & Drafting Body:** First sitting on **December 9, 1946**; permanent President **Dr. Rajendra Prasad**; Drafting Committee formed on **August 29, 1947** under **Dr. B.R. Ambedkar**.",
                },
              ],
            },
            {
              _key: "blk-en-ep-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Duration & Preamble Amendment:** Took **2 years, 11 months, and 18 days**. The **42nd Amendment Act, 1976** inserted *Socialist, Secular, and Integrity*.",
                },
              ],
            },
            {
              _key: "blk-en-ep-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Inception & 2026 Theme:** Celebrated officially since **2015** (formerly National Law Day). The 2026 theme is **“The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy”**.",
                },
              ],
            },
            {
              _key: "blk-en-ep-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **MPPSC & Competitive Exam Resources:** Strengthen your MPPSC Prelims Unit 5 & Mains Paper 2 preparation with [MPPSC Prelims Syllabus 2026](/en/mppsc/prelims-syllabus), [MPPSC Mains Syllabus 2026](/en/mppsc/mains-syllabus), and our [General Awareness Hub](/en/general-awareness).",
                },
              ],
            },
          ],
        },
      ],

      // 10 Collapsible FAQs
      faqs: [
        {
          question: "संविधान दिवस कब मनाया जाता है और संविधान दिवस 2026 कब है?",
          questionEn: "When is Constitution Day celebrated and when is Constitution Day 2026?",
          answer: "संविधान दिवस भारत में प्रत्येक वर्ष 26 नवंबर को मनाया जाता है। वर्ष 2026 में संविधान दिवस 26 नवंबर 2026 को मनाया जाएगा।",
          answerEn: "Constitution Day is celebrated annually on November 26 in India. Constitution Day 2026 falls on November 26, 2026."
        },
        {
          question: "संविधान दिवस 2026 की थीम क्या है?",
          questionEn: "What is the official theme of Constitution Day 2026?",
          answer: "संविधान दिवस 2026 की थीम 'The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy' (संविधान @76: डॉ. बी. आर. आंबेडकर की संवैधानिक दृष्टि और भारतीय लोकतंत्र का भविष्य) है।",
          answerEn: "The 2026 theme is 'The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy'."
        },
        {
          question: "भारतीय संविधान कब अपनाया गया और कब लागू हुआ था?",
          questionEn: "When was the Indian Constitution adopted and when did it come into force?",
          answer: "भारतीय संविधान को संविधान सभा द्वारा 26 नवंबर 1949 को अपनाया (अंगीकृत) गया था, जबकि यह 26 जनवरी 1950 को पूर्णतः लागू हुआ।",
          answerEn: "The Constitution was adopted by the Constituent Assembly on November 26, 1949, and came into full effect on January 26, 1950."
        },
        {
          question: "संविधान सभा के स्थायी अध्यक्ष और प्रारूप समिति के अध्यक्ष कौन थे?",
          questionEn: "Who were the President of the Constituent Assembly and Chairman of the Drafting Committee?",
          answer: "संविधान सभा के स्थायी अध्यक्ष डॉ. राजेंद्र प्रसाद थे तथा प्रारूप समिति (Drafting Committee) के अध्यक्ष डॉ. भीमराव रामजी आंबेडकर थे।",
          answerEn: "Dr. Rajendra Prasad was the permanent President of the Constituent Assembly, and Dr. B.R. Ambedkar was the Chairman of the Drafting Committee."
        },
        {
          question: "संविधान निर्माण में कितना समय लगा था?",
          questionEn: "How much time did it take to frame the Indian Constitution?",
          answer: "भारतीय संविधान के निर्माण में कुल 2 वर्ष, 11 महीने और 18 दिन का समय लगा था।",
          answerEn: "Framing the Constitution of India took 2 years, 11 months, and 18 days."
        },
        {
          question: "संविधान दिवस आधिकारिक रूप से किस वर्ष से मनाया जा रहा है?",
          questionEn: "Since which year has Constitution Day been officially celebrated in India?",
          answer: "भारत सरकार द्वारा वर्ष 2015 में डॉ. बी. आर. आंबेडकर की 125वीं जयंती वर्ष के उपलक्ष्य में 26 नवंबर को संविधान दिवस मनाने की शुरुआत की गई। इससे पहले इसे राष्ट्रीय विधि दिवस कहा जाता था।",
          answerEn: "Constitution Day was officially inaugurated in 2015 by the Government of India to mark Dr. B.R. Ambedkar's 125th birth anniversary year. Earlier it was known as National Law Day."
        },
        {
          question: "42वें संविधान संशोधन द्वारा प्रस्तावना में कौन-से शब्द जोड़े गए?",
          questionEn: "Which words were added to the Preamble by the 42nd Constitutional Amendment?",
          answer: "42वें संविधान संशोधन अधिनियम, 1976 द्वारा भारतीय संविधान की प्रस्तावना में 'समाजवादी' (Socialist), 'पंथनिरपेक्ष' (Secular) और 'अखंडता' (Integrity) शब्द जोड़े गए।",
          answerEn: "The 42nd Constitutional Amendment Act, 1976 added the words 'Socialist', 'Secular', and 'Integrity' to the Preamble."
        },
        {
          question: "क्या प्रस्तावना भारतीय संविधान का हिस्सा है?",
          questionEn: "Is the Preamble a part of the Indian Constitution?",
          answer: "हाँ, सर्वोच्च न्यायालय ने केशवानंद भारती बनाम केरल राज्य (1973) के ऐतिहासिक मामले में निर्णय दिया कि प्रस्तावना संविधान का अभिन्न हिस्सा है और संसद मूल संरचना को नष्ट नहीं कर सकती।",
          answerEn: "Yes, in Kesavananda Bharati v. State of Kerala (1973), the Supreme Court held that the Preamble is an integral part of the Constitution and propounded the Basic Structure Doctrine."
        },
        {
          question: "संविधान दिवस और गणतंत्र दिवस में मुख्य अंतर क्या है?",
          questionEn: "What is the main difference between Constitution Day and Republic Day?",
          answer: "26 नवंबर (संविधान दिवस) को 1949 में संविधान को अपनाया गया था, जबकि 26 जनवरी (गणतंत्र दिवस) को 1950 में संविधान को पूर्ण रूप से लागू किया गया था।",
          answerEn: "November 26 (Constitution Day) commemorates the adoption of the Constitution in 1949, while January 26 (Republic Day) celebrates its enforcement in 1950."
        },
        {
          question: "प्रारूप समिति का गठन कब हुआ था?",
          questionEn: "When was the Drafting Committee of the Indian Constitution formed?",
          answer: "भारतीय संविधान की प्रारूप समिति (Drafting Committee) का गठन 29 अगस्त 1947 को डॉ. बी. आर. आंबेडकर की अध्यक्षता में किया गया था।",
          answerEn: "The Drafting Committee was constituted on August 29, 1947, under the chairmanship of Dr. B.R. Ambedkar."
        }
      ],

      // Exactly 8 High-Quality MCQs
      mcqs: [
        {
          question: "भारतीय संविधान की प्रस्तावना में ‘समाजवादी’, ‘पंथनिरपेक्ष’ और ‘अखंडता’ शब्द किस संविधान संशोधन द्वारा जोड़े गए थे?",
          questionEn: "By which Constitutional Amendment were the words 'Socialist', 'Secular', and 'Integrity' added to the Preamble of the Indian Constitution?",
          options: [
            "24वां संविधान संशोधन (24th Amendment)",
            "42वां संविधान संशोधन (42nd Amendment)",
            "44वां संविधान संशोधन (44th Amendment)",
            "52वां संविधान संशोधन (52nd Amendment)"
          ],
          correctIndex: 1,
          explanation: "42वें संविधान संशोधन अधिनियम, 1976 द्वारा प्रस्तावना में ‘समाजवादी’, ‘पंथनिरपेक्ष’ और ‘अखंडता’ शब्द जोड़े गए थे। प्रस्तावना में अब तक केवल एक बार ही संशोधन हुआ है।",
          explanationEn: "The 42nd Constitutional Amendment Act, 1976 inserted 'Socialist', 'Secular', and 'Integrity' into the Preamble. The Preamble has been amended only once."
        },
        {
          question: "संविधान दिवस 2026 (26 नवंबर 2026) की आधिकारिक थीम क्या है?",
          questionEn: "What is the official theme of Constitution Day 2026 (November 26, 2026)?",
          options: [
            "Hamara Samvidhan, Hamara Swabhiman",
            "The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy",
            "India: Mother of Democracy and Constitutional Morality",
            "75 Years of Indian Constitution: Unity and Integrity"
          ],
          correctIndex: 1,
          explanation: "वर्ष 2026 में संविधान दिवस की आधिकारिक थीम 'The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy' है।",
          explanationEn: "The official theme for Constitution Day 2026 is 'The Constitution @76: Dr. B.R. Ambedkar's Constitutional Vision and the Future of Indian Democracy'."
        },
        {
          question: "भारत सरकार ने किस वर्ष 26 नवंबर को आधिकारिक रूप से ‘संविधान दिवस’ के रूप में मनाने की शुरुआत की?",
          questionEn: "In which year did the Government of India officially begin celebrating November 26 as 'Constitution Day'?",
          options: [
            "वर्ष 2014",
            "वर्ष 2015",
            "वर्ष 2016",
            "वर्ष 2019"
          ],
          correctIndex: 1,
          explanation: "भारत सरकार ने वर्ष 2015 में डॉ. बी. आर. आंबेडकर की 125वीं जयंती वर्ष के अवसर पर 26 नवंबर को आधिकारिक रूप से संविधान दिवस मनाने की घोषणा की।",
          explanationEn: "In 2015, commemorating Dr. B.R. Ambedkar's 125th birth anniversary year, the Government of India officially declared November 26 as Constitution Day."
        },
        {
          question: "संविधान सभा द्वारा भारतीय संविधान की प्रारूप समिति (Drafting Committee) का गठन कब किया गया था?",
          questionEn: "When was the Drafting Committee of the Indian Constituent Assembly constituted?",
          options: [
            "9 दिसंबर 1946",
            "22 जनवरी 1947",
            "29 अगस्त 1947",
            "26 नवंबर 1949"
          ],
          correctIndex: 2,
          explanation: "प्रारूप समिति का गठन 29 अगस्त 1947 को डॉ. बी. आर. आंबेडकर की अध्यक्षता में किया गया था।",
          explanationEn: "The Drafting Committee was formed on August 29, 1947, with Dr. B.R. Ambedkar as its Chairman."
        },
        {
          question: "भारतीय संविधान के निर्माण में संविधान सभा को कुल कितना समय लगा था?",
          questionEn: "How much total time did the Constituent Assembly take to draft the Constitution of India?",
          options: [
            "2 वर्ष, 10 महीने और 12 दिन",
            "2 वर्ष, 11 महीने और 18 दिन",
            "3 वर्ष, 1 महीना और 5 दिन",
            "1 वर्ष, 11 महीने और 26 दिन"
          ],
          correctIndex: 1,
          explanation: "भारतीय संविधान के निर्माण में कुल 2 वर्ष, 11 महीने और 18 दिन का समय लगा था।",
          explanationEn: "The framing of the Indian Constitution took 2 years, 11 months, and 18 days."
        },
        {
          question: "सर्वोच्च न्यायालय ने किस ऐतिहासिक वाद में माना कि ‘प्रस्तावना संविधान का हिस्सा है’ तथा ‘मूल संरचना सिद्धांत’ (Basic Structure Doctrine) प्रतिपादित किया?",
          questionEn: "In which landmark judgment did the Supreme Court hold that the 'Preamble is part of the Constitution' and propound the Basic Structure Doctrine?",
          options: [
            "बेरुबारी यूनियन मामला (1960)",
            "गोलकनाथ मामला (1967)",
            "केशवानंद भारती बनाम केरल राज्य (1973)",
            "मिनर्वा मिल्स मामला (1980)"
          ],
          correctIndex: 2,
          explanation: "केशवानंद भारती बनाम केरल राज्य (1973) मामले में सर्वोच्च न्यायालय ने प्रस्तावना को संविधान का अभिन्न भाग माना और मूल संरचना सिद्धांत स्थापित किया।",
          explanationEn: "In Kesavananda Bharati v. State of Kerala (1973), the Supreme Court held that the Preamble is an integral part of the Constitution and established the Basic Structure Doctrine."
        },
        {
          question: "13 दिसंबर 1946 को संविधान सभा में ऐतिहासिक ‘उद्देश्य प्रस्ताव’ (Objectives Resolution) किसने प्रस्तुत किया था?",
          questionEn: "Who presented the historic 'Objectives Resolution' in the Constituent Assembly on December 13, 1946?",
          options: [
            "डॉ. राजेंद्र प्रसाद",
            "सरदार वल्लभभाई पटेल",
            "पंडित जवाहरलाल नेहरू",
            "डॉ. बी. आर. आंबेडकर"
          ],
          correctIndex: 2,
          explanation: "13 दिसंबर 1946 को पंडित जवाहरलाल नेहरू ने उद्देश्य प्रस्ताव प्रस्तुत किया था, जिसे 22 जनवरी 1947 को सर्वसम्मति से स्वीकार किया गया। यही आगे चलकर प्रस्तावना का आधार बना।",
          explanationEn: "Jawaharlal Nehru moved the Objectives Resolution on December 13, 1946, which was unanimously adopted on January 22, 1947, forming the foundation of the Preamble."
        },
        {
          question: "वर्ष 2015 से पूर्व 26 नवंबर को भारत में किस दिवस के रूप में मनाया जाता था?",
          questionEn: "Prior to 2015, how was November 26 observed in India?",
          options: [
            "राष्ट्रीय एकता दिवस (National Unity Day)",
            "राष्ट्रीय विधि दिवस (National Law Day)",
            "सुशासन दिवस (Good Governance Day)",
            "लोकतंत्र दिवस (Democracy Day)"
          ],
          correctIndex: 1,
          explanation: "वर्ष 2015 में संविधान दिवस घोषित किए जाने से पूर्व 26 नवंबर को देश में 'राष्ट्रीय विधि दिवस' (National Law Day) के रूप में मनाया जाता था।",
          explanationEn: "Before being officially designated as Constitution Day in 2015, November 26 was observed as 'National Law Day' across India."
        }
      ]
    };

    await client.createOrReplace({
      _id: docId,
      ...articlePayload,
    });

    console.log(`✅ Successfully published ${docId} to Sanity CMS!`);
  }

  // 3. Bi-Directional Backlink Patch: Update 'ca-west-bengal-name-change-paschim-banga-2026' nextArticle
  console.log("🔗 Updating bi-directional reciprocal backlink on 'ca-west-bengal-name-change-paschim-banga-2026'...");
  try {
    await client
      .patch("ca-west-bengal-name-change-paschim-banga-2026")
      .set({
        nextArticle: {
          _type: "reference",
          _ref: "ca-constitution-day-2026",
        },
      })
      .commit();
    console.log("✅ Successfully linked 'ca-west-bengal-name-change-paschim-banga-2026' -> 'ca-constitution-day-2026'!");
  } catch (err) {
    console.warn("⚠️ Warning updating reciprocal backlink:", err);
  }

  console.log("🎉 All documents uploaded, synced to Sanity CMS, and interlinked successfully!");
}

main().catch((err) => {
  console.error("❌ Error uploading article:", err);
  process.exit(1);
});

