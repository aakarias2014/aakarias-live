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
  console.log("🚀 Starting upload process for 'West Bengal Name Change to Paschim Banga' Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    cover: path.resolve(process.cwd(), "public/images/blog/west-bengal-name-change-paschim-banga-cover.jpg"),
    constitution: path.resolve(process.cwd(), "public/images/blog/indian-constitution-article-3-parliament-state-renaming.jpg"),
  };

  // Verify images exist
  if (!fs.existsSync(imagePaths.cover) || !fs.existsSync(imagePaths.constitution)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Cover Banner Image
  console.log("📸 Uploading cover banner image to Sanity...");
  const coverStream = fs.createReadStream(imagePaths.cover);
  const coverAsset = await client.assets.upload("image", coverStream, {
    filename: "west-bengal-name-change-paschim-banga-cover.jpg",
    contentType: "image/jpeg",
  });
  console.log("✔ Uploaded Cover Image. Asset ID:", coverAsset._id);

  // 2. Upload Supporting Constitution / Parliament Image
  console.log("📸 Uploading Article 3 Parliament Constitution image to Sanity...");
  const constStream = fs.createReadStream(imagePaths.constitution);
  const constAsset = await client.assets.upload("image", constStream, {
    filename: "indian-constitution-article-3-parliament-state-renaming.jpg",
    contentType: "image/jpeg",
  });
  console.log("✔ Uploaded Supporting Image. Asset ID:", constAsset._id);

  // Article metadata
  const docSlug = "west-bengal-name-change-paschim-banga-2026";
  const publishedAt = "2026-11-24T08:00:00Z";

  // Document types to create / replace
  const targetDocIds = [
    { docId: "ca-west-bengal-name-change-paschim-banga-2026", type: "currentAffairs" },
    { docId: "gk-west-bengal-name-change-paschim-banga-2026", type: "staticGk" },
  ];

  for (const { docId, type } of targetDocIds) {
    console.log(`📌 Upserting document ${docId}...`);

    const articlePayload = {
      _type: type,
      title: "पश्चिम बंगाल का नाम बदलकर ‘पश्चिम बंग’ करने का प्रस्ताव: जानिए पूरा इतिहास, कारण और संवैधानिक प्रक्रिया | MPPSC & UPSC",
      titleEn: "West Bengal Name Change Proposal to 'Paschim Banga': History, Constitutional Procedure Under Article 3 & Exam Notes | MPPSC & UPSC",
      slug: { _type: "slug", current: docSlug },
      publishedAt: publishedAt,
      date: "2026-11-24",
      ca_date: "2026-11-23",
      readingTime: 11,
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
        { _type: "reference", _ref: "tag-national-affairs", _key: "t-nat" },
        { _type: "reference", _ref: "tag-prelims", _key: "t-prelims" },
        { _type: "reference", _ref: "tag-mains", _key: "t-mains" },
      ],
      syllabus: [
        "MPPSC Prelims 2026 Unit 5 (भारत एवं मध्य प्रदेश की संवैधानिक व्यवस्था / Constitution of India)",
        "MPPSC Mains 2026 Paper 2 Part A (भारतीय संविधान, शासन व्यवस्था एवं राजनीतिक ढांचा)",
        "UPSC CSE GS Paper 2 (Indian Constitution: Historical Underpinnings, Evolution, Features, Amendments & Significant Provisions - Articles 1-4)",
      ],
      featuredImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: coverAsset._id,
        },
        alt: "पश्चिम बंगाल का नाम बदलकर पश्चिम बंग करने का प्रस्ताव 2026 सुवेंदु अधिकारी कैबिनेट निर्णय Paschim Banga Name Change",
        caption: "पश्चिम बंगाल मंत्रिमंडल द्वारा राज्य का नाम बदलकर 'पश्चिम बंग' (Paschim Banga) करने के प्रस्ताव को मंजूरी (23 नवंबर 2026)",
      },
      excerpt: "पश्चिम बंगाल मंत्रिमंडल ने 23 नवंबर 2026 को राज्य का नाम बदलकर 'पश्चिम बंग' (Paschim Banga) करने के प्रस्ताव को मंजूरी दी। जानिए 1999 से 2026 तक का 27 वर्षों का घटनाक्रम, संविधान के अनुच्छेद 3 व 4 के तहत राज्य नाम परिवर्तन की प्रक्रिया, बंगाल विभाजन का इतिहास एवं MPPSC व UPSC परीक्षा उपयोगी तथ्य।",
      excerptEn: "West Bengal Cabinet approved renaming the state as 'Paschim Banga'. Explore the complete 1999–2026 timeline, constitutional procedure under Articles 3 & 4 of the Indian Constitution, historical Bengal partitions, and high-yield notes for MPPSC & UPSC.",
      keywords: [
        "West Bengal Name Change 2026",
        "Paschim Banga Name Change",
        "पश्चिम बंगाल का नाम परिवर्तन",
        "West Bengal New Name Paschim Banga",
        "Article 3 Indian Constitution state renaming procedure",
        "अनुच्छेद 3 राज्य का नाम बदलने की प्रक्रिया",
        "अनुच्छेद 4 संविधान संशोधन",
        "पश्चिम बंगाल नाम बदलने का इतिहास 1999 से 2026",
        "Bengal Partition 1905 Lord Curzon MPPSC",
        "1911 Bengal Partition Annulment",
        "सुवेंदु अधिकारी पश्चिम बंगाल कैबिनेट निर्णय 2026",
        "पश्चिम बंगाल विधानसभा शीतकालीन सत्र 2026",
        "West Bengal Current Affairs 2026",
        "MPPSC Indian Polity Notes Article 3",
        "UPSC Indian Polity State Reorganisation Act",
        "राज्य पुनर्गठन एवं सीमा परिवर्तन",
        "राष्ट्रपति की पूर्व सिफारिश अनुच्छेद 3",
        "विधानसभा की राय बाध्यकारी नहीं",
        "साधारण बहुमत द्वारा राज्य का नाम परिवर्तन",
        "Lord Curzon 1905 Swadeshi Movement",
        "United Provinces to Uttar Pradesh state renaming",
        "Madras to Tamil Nadu Mysore to Karnataka",
      ],
      nextArticle: {
        title: "लेडी ऑफ नचना: पन्ना में मिली 1,500 साल पुरानी गुप्तकालीन दुर्लभ प्रतिमा, पार्वती मंदिर व परीक्षा नोट्स",
        titleEn: "Lady of Nachna: 1,500-Year-Old Gupta Sculpture Discovered in Panna, Parvati Temple & MPPSC Notes",
        href: "/current-affairs/lady-of-nachna-1500-year-old-gupta-sculpture-panna-mppsc-notes",
      },
      sections: [
        // Section 1: परिप्रेक्ष्य एवं मुख्य तथ्य
        {
          _key: "sec-overview",
          kind: "whyInNews",
          title: "1. पश्चिम बंगाल के नाम परिवर्तन से जुड़ी प्रमुख जानकारी (Overview & Current Decision)",
          titleEn: "1. Overview & Current Cabinet Decision: Renaming to Paschim Banga",
          body: [
            {
              _key: "blk-ov-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "पश्चिम बंगाल के नाम परिवर्तन को लेकर एक बार फिर देश में महत्वपूर्ण राजनीतिक और प्रशासनिक पहल की गई है। **23 नवंबर 2026** को मुख्यमंत्री सुवेंदु अधिकारी की अध्यक्षता में आयोजित राज्य मंत्रिमंडल की बैठक में पश्चिम बंगाल का नाम बदलकर **‘पश्चिम बंग’ (Paschim Banga)** करने के ऐतिहासिक प्रस्ताव को सर्वसम्मति से मंजूरी प्रदान की गई।",
                },
              ],
            },
            {
              _key: "blk-ov-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "मुख्यमंत्री ने आधिकारिक घोषणा करते हुए बताया कि इस संबंध में औपचारिक सरकारी संकल्प **9 दिसंबर 2026** को पश्चिम बंगाल विधानसभा के शीतकालीन सत्र (4 से 14 दिसंबर 2026) के दौरान सदन के पटल पर प्रस्तुत किया जाएगा। विधानसभा से इस प्रस्ताव के पारित होने के बाद इसे केंद्र सरकार और गृह मंत्रालय के विचारार्थ भेजा जाएगा। सबसे खास बात यह है कि इस प्रस्ताव के अनुसार, हिंदी और बंगाली के साथ-साथ **अंग्रेजी सहित सभी आधिकारिक भाषाओं** में भी राज्य का नाम 'West Bengal' के स्थान पर **'Paschim Banga'** ही प्रयुक्त किया जाएगा।",
                },
              ],
            },
            {
              _key: "blk-ov-3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "पश्चिम बंगाल नाम परिवर्तन 2026: त्वरित परीक्षा सारणी",
                },
              ],
            },
            createTable(
              "tbl-overview",
              "पश्चिम बंगाल नाम परिवर्तन 2026: प्रमुख प्रशासनिक व संवैधानिक तथ्य",
              ["विवरण (Attribute)", "आधिकारिक जानकारी (Official Information)"],
              [
                ["वर्तमान आधिकारिक नाम", "पश्चिम बंगाल (West Bengal)"],
                ["प्रस्तावित नया नाम", "पश्चिम बंग (Paschim Banga) — सभी भाषाओं में एकरूप"],
                ["राज्य की राजधानी", "कोलकाता (Kolkata)"],
                ["मुख्यमंत्री", "सुवेंदु अधिकारी (Suvendu Adhikari)"],
                ["कैबिनेट मंजूरी तिथि", "23 नवंबर 2026"],
                ["विधानसभा में प्रस्तुति तिथि", "9 दिसंबर 2026"],
                ["विधानसभा शीतकालीन सत्र", "4 से 14 दिसंबर 2026"],
                ["संबंधित संवैधानिक प्रावधान", "भारतीय संविधान के अनुच्छेद 3 एवं अनुच्छेद 4"],
                ["अंतिम विधायी प्राधिकारी", "भारत की संसद (Parliament of India) — साधारण बहुमत द्वारा"],
                ["संबद्ध ऐतिहासिक घटना", "1905 एवं 1947 का बंगाल विभाजन (Partition of Bengal)"],
              ]
            ),
            {
              _key: "blk-ov-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **संवैधानिक मर्यादा:** मंत्रिमंडल की मंजूरी और राज्य विधानसभा में प्रस्ताव पारित किया जाना नाम परिवर्तन का केवल प्रारंभिक चरण है। किसी भी राज्य का आधिकारिक नाम वैधानिक रूप से बदलने के लिए संसद की अनुमति और राष्ट्रपति की संस्तुति अनिवार्य होती है। अधिक जानकारी के लिए [MPPSC Prelims Syllabus](/mppsc/prelims-syllabus) और [भारतीय राजव्यवस्था नोट्स](/general-awareness) का अध्ययन करें।",
                },
              ],
            },
          ],
          bodyEn: [
            {
              _key: "blk-en-ov-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "A major administrative and constitutional initiative has emerged regarding the renaming of West Bengal. On **November 23, 2026**, the State Cabinet headed by Chief Minister Suvendu Adhikari unanimously approved the formal proposal to rename the state as **'Paschim Banga'** across all official languages.",
                },
              ],
            },
            {
              _key: "blk-en-ov-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "Chief Minister Suvendu Adhikari announced that the resolution will be introduced in the West Bengal Legislative Assembly on **December 9, 2026**, during the ongoing Winter Session (December 4–14, 2026). Once passed by the Assembly, the resolution will be forwarded to the Union Government and the Ministry of Home Affairs. Notably, the proposal specifies adopting **'Paschim Banga' uniformly in English** as well, replacing 'West Bengal'.",
                },
              ],
            },
            {
              _key: "blk-en-ov-3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "West Bengal Renaming 2026: Quick Examination Data Table",
                },
              ],
            },
            createTable(
              "tbl-en-overview",
              "West Bengal Name Change 2026: Key Administrative & Constitutional Facts",
              ["Attribute", "Official Details"],
              [
                ["Current Official Name", "West Bengal (पश्चिम बंगाल)"],
                ["Proposed New Name", "Paschim Banga (पश्चिम बंग) — Uniform across all languages"],
                ["State Capital", "Kolkata"],
                ["Chief Minister", "Suvendu Adhikari"],
                ["Cabinet Approval Date", "November 23, 2026"],
                ["Assembly Tabled Date", "December 9, 2026"],
                ["Assembly Winter Session", "December 4 to 14, 2026"],
                ["Governing Constitutional Articles", "Articles 3 and 4 of the Constitution of India"],
                ["Ultimate Legislative Authority", "Parliament of India (by Simple Majority)"],
                ["Historical Antecedents", "1905 & 1947 Partitions of Bengal"],
              ]
            ),
            {
              _key: "blk-en-ov-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Constitutional Prerogative:** State Cabinet approval and legislative resolution represent only the recommendatory stage. Formally altering the name of a State in the First Schedule of the Constitution strictly requires central parliamentary legislation under Article 3. Explore our [MPPSC Mains Syllabus](/en/mppsc/mains-syllabus) and [General Awareness Hub](/en/general-awareness).",
                },
              ],
            },
          ],
        },

        // Section 2: नाम परिवर्तन की आवश्यकता क्यों महसूस हुई?
        {
          _key: "sec-reasons",
          kind: "issues",
          title: "2. पश्चिम बंगाल का नाम बदलने की आवश्यकता क्यों महसूस हुई? (Why Renaming Was Needed)",
          titleEn: "2. Underlying Rationale: Why Was Renaming West Bengal Necessary?",
          body: [
            {
              _key: "blk-rs-intro",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "पश्चिम बंगाल का नाम बदलने की मांग कोई आकस्मिक विचार नहीं है, बल्कि इसके पीछे तीन अत्यंत ठोस भाषाई, प्रशासनिक और ऐतिहासिक तर्क विद्यमान हैं:",
                },
              ],
            },
            {
              _key: "blk-rs-sub1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "(i) अंग्रेजी वर्णमाला में अंतिम स्थान का प्रशासनिक नुकसान (Alphabetical Disadvantage)",
                },
              ],
            },
            {
              _key: "blk-rs-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **वर्णानुक्रम का संकट:** अंग्रेजी में राज्य का नाम ‘West Bengal’ अक्षर **'W'** से प्रारंभ होता है। भारत के 28 राज्यों और 8 केंद्र शासित प्रदेशों की अंग्रेजी वर्णमाला सूची में पश्चिम बंगाल का स्थान लगभग सबसे अंत में आता है।",
                },
              ],
            },
            {
              _key: "blk-rs-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **राष्ट्रीय बैठकों में सीमित समय:** नीति आयोग (NITI Aayog), अंतर-राज्यीय परिषद (Inter-State Council), राष्ट्रीय विकास परिषद तथा केंद्रीय मंत्रालयों की उच्चस्तरीय बैठकों में राज्यों के प्रतिनिधियों को वर्णक्रमानुसार बोलने का अवसर मिलता है।",
                },
              ],
            },
            {
              _key: "blk-rs-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **प्रशासनिक उपेक्षा का समाधान:** बैठक के अंतिम घंटों तक आते-आते समय की भारी कमी हो जाती है, जिससे पश्चिम बंगाल के मुख्यमंत्री या मुख्य सचिव को अपने राज्य की गंभीर समस्याओं को विस्तार से रखने के लिए अत्यंत कम समय (मात्र 2-3 मिनट) मिल पाता है। ‘Paschim Banga’ नाम अपनाने से राज्य वर्णमाला में **'P'** अक्षर पर आ जाएगा, जिससे उसे मध्य क्रम में पर्याप्त समय मिल सकेगा।",
                },
              ],
            },
            {
              _key: "blk-rs-sub2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "(ii) भाषाई पहचान और एकरूपता (Linguistic Identity & Homogeneity)",
                },
              ],
            },
            {
              _key: "blk-rs-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **मातृभाषा में स्वाभाविक नाम:** पश्चिम बंगाल की मुख्य राजभाषा बंगाली है। आम बोलचाल, बंगाली साहित्य और सांस्कृतिक विमर्श में इस राज्य को सदैव **‘पश्चिम बंग’** ही कहा जाता रहा है।",
                },
              ],
            },
            {
              _key: "blk-rs-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **भाषाई विसंगति का निवारण:** अंग्रेजी में 'West Bengal' और बंगाली में 'पश्चिम बंग' होने से एक अस्वाभाविक द्वैधता बनी रहती थी। नए प्रस्ताव से सभी भाषाओं में 'Paschim Banga' नाम अपनाकर राष्ट्रीय स्तर पर एकरूपता स्थापित होगी।",
                },
              ],
            },
            {
              _key: "blk-rs-sub3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "(iii) ऐतिहासिक पहचान और प्रासंगिकता (Historical Legitimacy)",
                },
              ],
            },
            {
              _key: "blk-rs-6",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **1947 विभाजन की विरासत:** वर्ष 1947 में जब भारत स्वतंत्र हुआ, तो बंगाल प्रांत का विभाजन धर्म के आधार पर हुआ। पश्चिमी हिंदू-बहुल हिस्सा भारतीय संघ में सम्मिलित हुआ, जिसे 'पश्चिम बंगाल' कहा गया, जबकि पूर्वी मुस्लिम-बहुल हिस्सा 'पूर्वी पाकिस्तान' बना।",
                },
              ],
            },
            {
              _key: "blk-rs-7",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **'पश्चिम' शब्द की संवेदनशीलता:** कई बुद्धिजीवियों का मानना है कि जब पूर्वी पाकिस्तान 1971 में स्वतंत्र राष्ट्र **बांग्लादेश** बन चुका है, तो भारत के इस राज्य के नाम में दिशा सूचक 'पश्चिम' (West) रखना औपनिवेशिक विभाजन की दुखद स्मृति को दर्शाता है। तथापि 'पश्चिम बंग' नाम बंगाली अस्मिता और भारतीय अखंडता का सुंदर संतुलन प्रस्तुत करता है।",
                },
              ],
            },
          ],
          bodyEn: [
            {
              _key: "blk-en-rs-intro",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "The demand to rename West Bengal is rooted in three compelling administrative, linguistic, and historical rationales:",
                },
              ],
            },
            {
              _key: "blk-en-rs-sub1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "(i) Administrative Handicap of Alphabetical Ordering ('W' vs 'P')",
                },
              ],
            },
            {
              _key: "blk-en-rs-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **The Alphabetical Bottleneck:** Starting with the letter **'W'**, 'West Bengal' consistently ranks near the absolute bottom of the alphabetical list of Indian States and Union Territories.",
                },
              ],
            },
            {
              _key: "blk-en-rs-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Truncated Speaking Time at National Forums:** In critical inter-state conferences such as NITI Aayog Governing Council meetings, Inter-State Council conventions, and GST Council debates, states address the chair in alphabetical order.",
                },
              ],
            },
            {
              _key: "blk-en-rs-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Administrative Parity:** By the time the turn for West Bengal arrives, sessions frequently suffer severe time fatigue, forcing state delegates to compress vital fiscal and developmental representations into mere minutes. Transitioning to **'Paschim Banga'** vaults the state to letter **'P'**, securing timely speaking slots.",
                },
              ],
            },
            {
              _key: "blk-en-rs-sub2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "(ii) Linguistic Identity and Single-Nomenclature Uniformity",
                },
              ],
            },
            {
              _key: "blk-en-rs-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Native Language Concordance:** In the state's principal language, Bengali, residents universally refer to their homeland as **'Paschim Banga' (পশ্চিমবঙ্গ)** rather than 'West Bengal'.",
                },
              ],
            },
            {
              _key: "blk-en-rs-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Overcoming Multi-Lingual Confusion:** Adopting 'Paschim Banga' universally across English, Hindi, and regional records fosters streamlined pan-Indian constitutional uniformity.",
                },
              ],
            },
            {
              _key: "blk-en-rs-sub3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "(iii) Historical Memory of the 1947 Partition",
                },
              ],
            },
            {
              _key: "blk-en-rs-6",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Echoes of 1947 Partition:** In 1947, Bengal was bifurcated along religious lines; the western Hindu-majority districts formed West Bengal within India, while East Bengal became East Pakistan (liberated as sovereign Bangladesh in 1971).",
                },
              ],
            },
            {
              _key: "blk-en-rs-7",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Reclaiming Cultural Dignity:** While some historical purists debated dispensing with 'West' altogether, 'Paschim Banga' strikes a balanced resonance between historic constitutional continuity and linguistic self-definition.",
                },
              ],
            },
          ],
        },

        // Section 3: पश्चिम बंगाल के नाम परिवर्तन का 27 वर्षों का इतिहास (1999–2026)
        {
          _key: "sec-history-timeline",
          kind: "background",
          title: "3. पश्चिम बंगाल के नाम परिवर्तन का पूरा इतिहास (1999–2026 Timeline)",
          titleEn: "3. Complete 27-Year History of West Bengal Renaming Attempts (1999–2026)",
          body: [
            {
              _key: "blk-hist-intro",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "पश्चिम बंगाल का नाम बदलने का प्रयास कोई नई पहल नहीं है। पिछले **27 वर्षों (1999 से 2026)** में विभिन्न राज्य सरकारों द्वारा निरंतर विधायी प्रस्ताव पारित किए गए, किंतु केंद्र सरकार की सहमति अथवा प्रक्रियात्मक अड़चनों के कारण वे लागू नहीं हो सके।",
                },
              ],
            },
            {
              _key: "blk-hist-sub1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "1999: ज्योति बसु व वाम मोर्चा सरकार का प्रथम प्रस्ताव",
                },
              ],
            },
            {
              _key: "blk-hist-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **जुलाई 1999 की पहल:** तत्कालीन मुख्यमंत्री ज्योति बसु के नेतृत्व वाली वाम मोर्चा (Left Front) सरकार ने पहली बार राज्य का नाम बदलकर **‘पश्चिम बंग’ (Paschim Banga)** करने का औपचारिक संकल्प विधानसभा में रखा। हालांकि तत्कालीन केंद्र सरकार (अटल बिहारी वाजपेयी नेतृत्व वाली एनडीए सरकार) के स्तर पर यह विधायी रूप नहीं ले सका।",
                },
              ],
            },
            {
              _key: "blk-hist-sub2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "2011: ममता बनर्जी सरकार का 'पश्चिम बंग' संकल्प",
                },
              ],
            },
            {
              _key: "blk-hist-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **सितंबर 2011 का प्रस्ताव:** 34 वर्षों के वाम शासन के उपरांत तृणमूल कांग्रेस के सत्ता में आने पर मुख्यमंत्री ममता बनर्जी ने सर्वदलीय सहमति से राज्य का नाम **‘पश्चिम बंग’ (Paschim Banga)** करने का प्रस्ताव विधानसभा से पारित कराकर केंद्र को भेजा। केंद्र ने प्रशासनिक स्तर पर इस पर आगे कोई संवैधानिक विधेयक संसद में प्रस्तुत नहीं किया।",
                },
              ],
            },
            {
              _key: "blk-hist-sub3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "2016: तीन भाषाओं में तीन भिन्न नामों का पेचीदा प्रस्ताव",
                },
              ],
            },
            {
              _key: "blk-hist-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **अगस्त 2016 का त्रिभाषी प्रस्ताव:** पश्चिम बंगाल विधानसभा ने एक अनोखा प्रस्ताव पारित किया, जिसमें तीन अलग-अलग भाषाओं में राज्य के तीन पृथक नाम प्रस्तावित किए गए थे: बंगाली में **‘बांग्ला’ (Bangla)**, अंग्रेजी में **‘बेंगल’ (Bengal)**, और हिंदी में **‘बांगाल’ (Bangal)**।",
                },
              ],
            },
            {
              _key: "blk-hist-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **केंद्रीय गृह मंत्रालय की आपत्ति:** केंद्र सरकार ने इसे यह कहते हुए अस्वीकार कर दिया कि भारत के संविधान की प्रथम अनुसूची में प्रत्येक राज्य का एक सुसंगत और एकीकृत नाम होना आवश्यक है, न कि विभिन्न भाषाओं के लिए पृथक-पृथक नाम।",
                },
              ],
            },
            {
              _key: "blk-hist-sub4",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "2018–2019: सभी भाषाओं में 'बांग्ला' नाम व अंतरराष्ट्रीय संप्रभुता विवाद",
                },
              ],
            },
            {
              _key: "blk-hist-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **26 जुलाई 2018 का सर्वसम्मत संकल्प:** राज्य विधानसभा ने संशोधन करते हुए सभी भाषाओं (हिंदी, अंग्रेजी, बंगाली) में एक समान नाम **‘बांग्ला’ (Bangla)** रखने का प्रस्ताव पारित किया।",
                },
              ],
            },
            {
              _key: "blk-hist-6",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **जुलाई 2019 में केंद्र का स्पष्ट इनकार:** केंद्रीय गृह मंत्रालय और विदेश मंत्रालय (MEA) ने इस प्रस्ताव को नामंजूर कर दिया। प्रमुख कारण यह था कि पड़ोसी संप्रभु राष्ट्र **‘बांग्लादेश’ (Bangladesh)** और भारतीय राज्य के नाम ‘बांग्ला’ (Bangla) में अत्यधिक समानता थी, जिससे संयुक्त राष्ट्र (UN) एवं अंतरराष्ट्रीय राजनयिक मंचों पर गंभीर भ्रम उत्पन्न होने की प्रबल आशंका थी।",
                },
              ],
            },
            {
              _key: "blk-hist-sub5",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "2026: 'पश्चिम बंग' नाम का सर्वसमावेशी पुनरुत्थान",
                },
              ],
            },
            {
              _key: "blk-hist-7",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **23 नवंबर 2026 की कैबिनेट स्वीकृति:** मुख्यमंत्री सुवेंदु अधिकारी की कैबिनेट ने पूर्ववर्ती 'बांग्ला' विवाद को दरकिनार करते हुए सर्वस्वीकार्य नाम **'पश्चिम बंग' (Paschim Banga)** को चुना है, जो अंतरराष्ट्रीय स्तर पर किसी भ्रम को जन्म नहीं देता और अंग्रेजी में भी 'P' अक्षर का प्रशासनिक लाभ प्रदान करता है।",
                },
              ],
            },
            createTable(
              "tbl-timeline-history",
              "पश्चिम बंगाल नाम परिवर्तन का ऐतिहासिक कालक्रम (1999–2026 Evolution Table)",
              ["वर्ष (Year)", "तत्कालीन सरकार / मुख्यमंत्री", "प्रस्तावित राज्य नाम", "केंद्र का रुख व परिणाम (Outcome)"],
              [
                ["1999", "वाम मोर्चा (ज्योति बसु)", "पश्चिम बंग (Paschim Banga)", "केंद्र स्तर पर विधायी प्रक्रिया आगे नहीं बढ़ी"],
                ["2011", "तृणमूल कांग्रेस (ममता बनर्जी)", "पश्चिम बंग (Paschim Banga)", "संसद में विधेयक प्रस्तुत नहीं हुआ"],
                ["2016", "तृणमूल कांग्रेस (ममता बनर्जी)", "बांग्ला (बंगाली), बेंगल (अंग्रेजी), बांगाल (हिंदी)", "केंद्र द्वारा अस्वीकार: बहु-भाषी विसंगति"],
                ["2018", "तृणमूल कांग्रेस (ममता बनर्जी)", "बांग्ला (Bangla) — सभी भाषाओं में", "गृह मंत्रालय द्वारा खारिज: बांग्लादेश से समानता का संप्रभु भ्रम"],
                ["2026", "भाजपा / एनडीए (सुवेंदु अधिकारी)", "पश्चिम बंग (Paschim Banga) — अंग्रेजी में भी", "कैबिनेट स्वीकृत; 9 दिसंबर 2026 को विधानसभा में पेश"],
              ]
            ),
          ],
          bodyEn: [
            {
              _key: "blk-en-hist-intro",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "The institutional quest to rename West Bengal spans **27 years (1999 to 2026)**, marked by multiple legislative resolutions, central rejections, and diplomatic debates over sovereign naming conflicts.",
                },
              ],
            },
            {
              _key: "blk-en-hist-sub1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "1999: Left Front Government's Inaugural Resolution",
                },
              ],
            },
            {
              _key: "blk-en-hist-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **July 1999 Initiative:** The Left Front ministry under Chief Minister Jyoti Basu first piloted a resolution to rename the state **'Paschim Banga'**. However, it did not culminate in central parliamentary legislation during the Atal Bihari Vajpayee-led NDA regime.",
                },
              ],
            },
            {
              _key: "blk-en-hist-sub2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "2011: Mamata Banerjee Cabinet's 'Paschim Banga' Push",
                },
              ],
            },
            {
              _key: "blk-en-hist-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **September 2011 Bid:** Following the end of 34 years of Left rule, the newly elected Trinamool Congress administration passed an all-party Assembly resolution endorsing **'Paschim Banga'**, but central sponsorship stalled.",
                },
              ],
            },
            {
              _key: "blk-en-hist-sub3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "2016: The Tri-Lingual Naming Complexity",
                },
              ],
            },
            {
              _key: "blk-en-hist-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **August 2016 Three-Tier Formula:** The Assembly proposed three distinct names based on linguistic mediums: **'Bangla'** in Bengali, **'Bengal'** in English, and **'Bangal'** in Hindi.",
                },
              ],
            },
            {
              _key: "blk-en-hist-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **MHA Objection:** The Ministry of Home Affairs declined the formula, maintaining that the First Schedule of the Constitution mandates a singular, non-divergent nomenclature across all statutory records.",
                },
              ],
            },
            {
              _key: "blk-en-hist-sub4",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "2018–2019: 'Bangla' and the International Diplomatic Impediment",
                },
              ],
            },
            {
              _key: "blk-en-hist-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **July 2018 Universal 'Bangla' Resolution:** The state assembly unanimously passed a modified resolution adopting **'Bangla'** uniformly across English, Hindi, and Bengali.",
                },
              ],
            },
            {
              _key: "blk-en-hist-6",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **July 2019 Central Refusal:** The Union Government and Ministry of External Affairs rejected 'Bangla' on foreign policy grounds. The close linguistic similarity between 'Bangla' and sovereign neighbor **Bangladesh** posed potential diplomatic confusion in international forums like the United Nations.",
                },
              ],
            },
            {
              _key: "blk-en-hist-sub5",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "2026: Consensus Revival of 'Paschim Banga'",
                },
              ],
            },
            {
              _key: "blk-en-hist-7",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **November 2026 Decision:** Chief Minister Suvendu Adhikari revived the pragmatic title **'Paschim Banga'**, avoiding diplomatic overlap while securing the vital alphabetical advantage ('P') in English.",
                },
              ],
            },
            createTable(
              "tbl-en-timeline-history",
              "Chronological Matrix: West Bengal Renaming Efforts (1999–2026)",
              ["Year", "Government / Chief Minister", "Proposed Name", "Outcome & Central Stance"],
              [
                ["1999", "Left Front (Jyoti Basu)", "Paschim Banga", "No central statutory enactment"],
                ["2011", "Trinamool Congress (Mamata Banerjee)", "Paschim Banga", "Parliamentary bill not introduced"],
                ["2016", "Trinamool Congress (Mamata Banerjee)", "Bangla (Bengali), Bengal (English), Bangal (Hindi)", "Rejected by Centre: Multi-lingual divergence"],
                ["2018", "Trinamool Congress (Mamata Banerjee)", "Bangla (Universal)", "Rejected by MHA: Diplomatic confusion with Bangladesh"],
                ["2026", "BJP / NDA (Suvendu Adhikari)", "Paschim Banga (Uniform in English)", "Cabinet approved; Tabled in Assembly on Dec 9, 2026"],
              ]
            ),
          ],
        },

        // Section 4: राज्य का नाम बदलने की संवैधानिक प्रक्रिया: अनुच्छेद 3 एवं 4
        {
          _key: "sec-constitution",
          kind: "reforms",
          title: "4. राज्य का नाम बदलने की संवैधानिक प्रक्रिया: अनुच्छेद 3 एवं 4 (Constitutional Procedure)",
          titleEn: "4. Constitutional Mechanism Under Articles 3 & 4: How a State is Renamed",
          body: [
            {
              _key: "blk-const-intro",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "भारतीय संविधान के तहत भारत राज्यों का एक अविनाशी संघ है, किंतु राज्य स्वयं में नश्वर हैं (Indestructible Union of Destructible States)। किसी राज्य की सीमा, क्षेत्र अथवा **नाम में परिवर्तन** करने की अनन्य शक्ति भारत की संसद (Parliament) में निहित है। इसके लिए **अनुच्छेद 3 और अनुच्छेद 4** का पालन अनिवार्य है।",
                },
              ],
            },
            // Embed supporting image
            {
              _key: "blk-const-img",
              _type: "image",
              asset: {
                _type: "reference",
                _ref: constAsset._id,
              },
              alt: "भारतीय संविधान का अनुच्छेद 3 संसद भवन नई दिल्ली राज्य नाम परिवर्तन संवैधानिक प्रक्रिया Indian Constitution Article 3 Sansad Bhavan",
              caption: "भारतीय संसद और संविधान का अनुच्छेद 3: राज्यों के पुनर्गठन एवं नाम परिवर्तन की सर्वोच्च विधायी शक्ति",
            },
            {
              _key: "blk-const-sub1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "अनुच्छेद 3: संसद की राज्यों के पुनर्गठन संबंधी शक्तियाँ",
                },
              ],
            },
            {
              _key: "blk-const-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **अनुच्छेद 3 के तहत प्रदत्त अधिकार:** संसद विधि द्वारा— (a) किसी राज्य में से उसका राज्यक्षेत्र अलग करके या दो या अधिक राज्यों को मिलाकर नया राज्य बना सकती है; (b) किसी राज्य का क्षेत्र बढ़ा सकती है; (c) किसी राज्य का क्षेत्र घटा सकती है; (d) किसी राज्य की सीमाओं में परिवर्तन कर सकती है; और (e) **किसी राज्य के नाम में परिवर्तन (Alter the name of any State)** कर सकती है।",
                },
              ],
            },
            {
              _key: "blk-const-sub2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "राज्य का नाम बदलने के 4 अनिवार्य संवैधानिक चरण (Step-by-Step Procedure)",
                },
              ],
            },
            {
              _key: "blk-const-step1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **चरण 1: राष्ट्रपति की पूर्व संस्तुति (Prior Presidential Recommendation):** अनुच्छेद 3 के परंतुक (proviso) के अनुसार, किसी राज्य के नाम, क्षेत्र या सीमा में परिवर्तन से संबंधित कोई भी विधेयक संसद के किसी भी सदन (लोकसभा या राज्यसभा) में **राष्ट्रपति की पूर्व सिफारिश** के बिना पेश नहीं किया जा सकता।",
                },
              ],
            },
            {
              _key: "blk-const-step2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **चरण 2: राज्य विधानमंडल की राय (Reference to State Legislature):** राष्ट्रपति विधेयक को संसद में पेश कराने से पूर्व संबंधित राज्य के विधानमंडल के पास उसकी राय (views) जानने हेतु भेजते हैं। इसके लिए राष्ट्रपति द्वारा एक निश्चित समयावधि (specified period) निर्धारित की जाती है।",
                },
              ],
            },
            {
              _key: "blk-const-step2-note",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **अति-महत्वपूर्ण परीक्षा बिंदु (बाध्यकारी नहीं):** राज्य विधानमंडल की राय **संसद या राष्ट्रपति पर बाध्यकारी (Binding) नहीं** होती। यदि राज्य विधानसभा प्रस्ताव को अस्वीकार भी कर दे, अथवा निर्धारित समय में कोई उत्तर न दे, तब भी संसद विधेयक को पारित करने के लिए पूर्णतः स्वतंत्र है (*बाबूलाल पराते बनाम बॉम्बे राज्य, 1960*)।",
                },
              ],
            },
            {
              _key: "blk-const-step3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **चरण 3: संसद में साधारण बहुमत (Simple Majority in Parliament):** दोनों सदनों (लोकसभा एवं राज्यसभा) में यह विधेयक उपस्थित और मतदान करने वाले सदस्यों के **साधारण बहुमत (Simple Majority - 50% से अधिक)** द्वारा पारित किया जाता है।",
                },
              ],
            },
            {
              _key: "blk-const-step4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **चरण 4: राष्ट्रपति की औपचारिक सहमति (Presidential Assent):** संसद द्वारा पारित होने के पश्चात जब राष्ट्रपति विधेयक पर अपने हस्ताक्षर करते हैं, तो यह अधिनियम (Act) बन जाता है। गृह मंत्रालय द्वारा राजपत्र (Gazette of India) में अधिसूचना जारी होते ही नया नाम आधिकारिक रूप से प्रभावी हो जाता है।",
                },
              ],
            },
            {
              _key: "blk-const-sub3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "अनुच्छेद 4 का विशेष महत्व: क्या यह अनुच्छेद 368 के तहत संविधान संशोधन है?",
                },
              ],
            },
            {
              _key: "blk-const-art4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **अनुच्छेद 4(2) का स्पष्ट प्रावधान:** अनुच्छेद 4(2) स्पष्ट रूप से उल्लेख करता है कि अनुच्छेद 2 या अनुच्छेद 3 के तहत बनाया गया कोई भी कानून संविधान के **अनुच्छेद 368 के प्रयोजनों के लिए संविधान का संशोधन (Constitutional Amendment) नहीं माना जाएगा**।",
                },
              ],
            },
            {
              _key: "blk-const-art4-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **प्रथम एवं चतुर्थ अनुसूची में स्वतः संशोधन:** इस कानून के माध्यम से संविधान की **प्रथम अनुसूची** (राज्यों के नाम व क्षेत्र) तथा **चौथी अनुसूची** (राज्यसभा में सीटों का आवंटन) में आवश्यक परिणामी संशोधन संसद द्वारा सामान्य विधायी शक्ति के तहत कर दिए जाते हैं। अतः किसी विशेष बहुमत (Special Majority) अथवा आधे राज्यों के अनुसमर्थन की आवश्यकता नहीं होती।",
                },
              ],
            },
          ],
          bodyEn: [
            {
              _key: "blk-en-const-intro",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "Under the constitutional architecture of India, the Union is an **indestructible Union of destructible states**. The exclusive authority to alter state boundaries, areas, or names resides solely with the **Parliament of India**, governed by **Articles 3 and 4**.",
                },
              ],
            },
            {
              _key: "blk-en-const-img",
              _type: "image",
              asset: {
                _type: "reference",
                _ref: constAsset._id,
              },
              alt: "Article 3 of Constitution of India Sansad Bhavan New Delhi state renaming procedure",
              caption: "The Parliament of India and Article 3: Plenary constitutional powers over State Reorganisation",
            },
            {
              _key: "blk-en-const-sub1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "Article 3: Parliamentary Competence Over States",
                },
              ],
            },
            {
              _key: "blk-en-const-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Substantive Scope of Article 3:** Parliament may by law— (a) form a new State; (b) increase the area of any State; (c) diminish the area of any State; (d) alter the boundaries of any State; and (e) **alter the name of any State**.",
                },
              ],
            },
            {
              _key: "blk-en-const-sub2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "Four Mandatory Constitutional Stages in Renaming a State",
                },
              ],
            },
            {
              _key: "blk-en-const-step1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Stage 1: Prior Presidential Recommendation:** Under the proviso to Article 3, no bill altering the name or boundaries of any state can be introduced in either House of Parliament except on the prior recommendation of the President.",
                },
              ],
            },
            {
              _key: "blk-en-const-step2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Stage 2: Reference to State Legislature:** Before introducing the bill, the President must refer it to the concerned State Legislature for expressing its views within a specified period.",
                },
              ],
            },
            {
              _key: "blk-en-const-step2-note",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Critical Judicial Precedent (Non-Binding Views):** The views expressed by the State Legislature are **strictly recommendatory and not binding** on Parliament or the President (*Babulal Parate v. State of Bombay, AIR 1960 SC 51*). Even if the assembly rejects the proposal, Parliament possesses plenary power to enact it.",
                },
              ],
            },
            {
              _key: "blk-en-const-step3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Stage 3: Passage by Simple Majority:** The bill requires passage in both the Lok Sabha and Rajya Sabha by a **Simple Majority** of members present and voting.",
                },
              ],
            },
            {
              _key: "blk-en-const-step4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Stage 4: Presidential Assent & Gazette Notification:** Following passage, the President accords assent. Upon publication in the Gazette of India by the Ministry of Home Affairs, the renaming takes constitutional effect.",
                },
              ],
            },
            {
              _key: "blk-en-const-sub3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "Article 4: Exemption from Article 368 Amendment Rigor",
                },
              ],
            },
            {
              _key: "blk-en-const-art4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Exemption from Article 368:** Article 4(2) expressly stipulates that laws enacted under Article 2 or Article 3 shall **not be deemed to be an amendment of the Constitution** for the purposes of Article 368. Consequently, no special majority or ratification by states is required.",
                },
              ],
            },
            {
              _key: "blk-en-const-art4-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Consequential Alterations:** Such legislation automatically updates the **First Schedule** (List of States and UTs) and **Fourth Schedule** (Allocation of Rajya Sabha seats) of the Constitution.",
                },
              ],
            },
          ],
        },

        // Section 5: बंगाल विभाजन का ऐतिहासिक संदर्भ: 1905, 1911 एवं 1947
        {
          _key: "sec-bengal-partition",
          kind: "background",
          title: "5. बंगाल विभाजन का ऐतिहासिक संदर्भ: 1905, 1911 एवं 1947 (Historical Context of Bengal Partitions)",
          titleEn: "5. Historical Matrix of Bengal Partitions: 1905, 1911 and 1947",
          body: [
            {
              _key: "blk-part-intro",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "पश्चिम बंगाल की पहचान और उसके नाम में 'पश्चिम' शब्द के समावेश को समझने के लिए आधुनिक भारतीय इतिहास के तीन प्रमुख विभाजनों और उनके प्रभावों को जानना आवश्यक है:",
                },
              ],
            },
            {
              _key: "blk-part-sub1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "1905 का बंगाल विभाजन: लॉर्ड कर्जन और स्वदेशी आंदोलन",
                },
              ],
            },
            {
              _key: "blk-part-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **कर्जन की 'फूट डालो और राज करो' नीति:** तत्कालीन ब्रिटिश वायसराय लॉर्ड कर्जन (Lord Curzon) ने 20 जुलाई 1905 को बंगाल विभाजन की घोषणा की और **16 अक्टूबर 1905** को इसे विधिवत लागू किया। प्रशासनिक असुविधा का बहाना बनाकर वास्तव में राष्ट्रीय आंदोलन के केंद्र बंगाल को धार्मिक आधार पर विभाजित किया गया।",
                },
              ],
            },
            {
              _key: "blk-part-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **स्वदेशी एवं बहिष्कार आंदोलन का उद्भव:** इस विभाजन के विरोध में 7 अगस्त 1905 को कलकत्ता के टाउन हॉल से **स्वदेशी आंदोलन (Swadeshi Movement)** प्रारंभ हुआ। 16 अक्टूबर 1905 को पूरे बंगाल में 'शोक दिवस' मनाया गया, गुरुदेव रवींद्रनाथ टैगोर के आह्वान पर 'राखी दिवस' का आयोजन हुआ और टैगोर ने प्रसिद्ध राष्ट्रगान **'आमार शोनार बांला'** की रचना की।",
                },
              ],
            },
            {
              _key: "blk-part-sub2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "1911 में बंगाल विभाजन का निरस्तीकरण व राजधानी स्थानांतरण",
                },
              ],
            },
            {
              _key: "blk-part-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **दिल्ली दरबार 1911:** स्वदेशी आंदोलन के उग्र राष्ट्रवाद के दबाव में ब्रिटिश सम्राट जॉर्ज पंचम और वायसराय लॉर्ड हार्डिंग द्वितीय ने दिसंबर 1911 के ऐतिहासिक दिल्ली दरबार में **बंगाल विभाजन को रद्द (Annulment of Partition)** करने की घोषणा की।",
                },
              ],
            },
            {
              _key: "blk-part-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **कलकत्ता से दिल्ली राजधानी परिवर्तन:** इसी अवसर पर ब्रिटिश भारत की राजधानी को कलकत्ता से दिल्ली स्थानांतरित करने तथा बिहार एवं ओडिशा को बंगाल से अलग कर नए प्रांत बनाने का निर्णय लिया गया।",
                },
              ],
            },
            {
              _key: "blk-part-sub3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "1947 का विभाजन और 'पश्चिम बंगाल' का प्रादुर्भाव",
                },
              ],
            },
            {
              _key: "blk-part-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **माउंटबेटन योजना और रेडक्लिफ रेखा:** 1947 में भारत की स्वतंत्रता के समय सर सिरिल रेडक्लिफ की अध्यक्षता में सीमा आयोग ने बंगाल का सांप्रदायिक आधार पर पुनः स्थायी विभाजन किया। पश्चिमी हिस्सा 'पश्चिम बंगाल' के रूप में भारत का अंग बना, जबकि पूर्वी हिस्सा 'पूर्वी पाकिस्तान' बना जो 1971 के मुक्ति संग्राम के बाद संप्रभु **बांग्लादेश** के रूप में उभरा।",
                },
              ],
            },
          ],
          bodyEn: [
            {
              _key: "blk-en-part-intro",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "The contemporary identity of West Bengal and the cardinal designation 'West' can only be understood through three historic partition milestones in modern Indian history:",
                },
              ],
            },
            {
              _key: "blk-en-part-sub1",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "The 1905 Partition of Bengal: Lord Curzon and Swadeshi Movement",
                },
              ],
            },
            {
              _key: "blk-en-part-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Curzon's Divide and Rule Strategy:** Viceroy Lord Curzon announced the partition on July 20, 1905, taking formal effect on **October 16, 1905**. Masked under administrative convenience, it strategically severed the nerve center of Indian nationalism along communal lines.",
                },
              ],
            },
            {
              _key: "blk-en-part-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Genesis of Swadeshi & Boycott:** On August 7, 1905, the Swadeshi Movement was formally proclaimed at the Calcutta Town Hall. October 16 was observed as a Day of Mourning and Raksha Bandhan Day, while Rabindranath Tagore penned the historic anthem **'Amar Shonar Bangla'**.",
                },
              ],
            },
            {
              _key: "blk-en-part-sub2",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "1911 Annulment of Partition & Capital Shift to Delhi",
                },
              ],
            },
            {
              _key: "blk-en-part-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Delhi Durbar 1911:** Overwhelmed by revolutionary nationalist pressure, King George V and Viceroy Lord Hardinge II officially **annulled the partition of Bengal** at the grand Delhi Durbar in December 1911.",
                },
              ],
            },
            {
              _key: "blk-en-part-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Capital Relocation:** Concurrently, the imperial capital of British India was transferred from Calcutta to Delhi, while Bihar and Orissa were partitioned into a separate province.",
                },
              ],
            },
            {
              _key: "blk-en-part-sub3",
              _type: "block",
              style: "h3",
              children: [
                {
                  _type: "span",
                  text: "1947 Partition and Birth of the State of 'West Bengal'",
                },
              ],
            },
            {
              _key: "blk-en-part-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Mountbatten Plan & Radcliffe Line:** During India's independence in August 1947, Sir Cyril Radcliffe's Boundary Commission bifurcated Bengal. The western sector became the Indian State of West Bengal, while the eastern wing formed East Pakistan (which emerged as sovereign Bangladesh after the 1971 Liberation War).",
                },
              ],
            },
          ],
        },

        // Section 6: भारत में पूर्व में हुए प्रमुख राज्यों के नाम परिवर्तन (Historical Precedents)
        {
          _key: "sec-state-precedents",
          kind: "initiatives",
          title: "6. भारत में राज्यों के नाम परिवर्तन के प्रमुख ऐतिहासिक उदाहरण (Historical Precedents in India)",
          titleEn: "6. Historical Precedents: Other States Renamed in Post-Independence India",
          body: [
            {
              _key: "blk-prec-intro",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "स्वतंत्र भारत में राज्यों और शहरों के नाम में परिवर्तन की एक सुदीर्घ और स्थापित परंपरा रही है। अनुच्छेद 3 के तहत संसद ने पूर्व में कई राज्यों के नाम सफलतापूर्वक परिवर्तित किए हैं:",
                },
              ],
            },
            createTable(
              "tbl-state-precedents",
              "स्वतंत्र भारत में राज्यों के नाम परिवर्तन की ऐतिहासिक सूची",
              ["क्रम (S.No.)", "पूर्व नाम (Original Name)", "नया नाम (Renamed Title)", "परिवर्तन का वर्ष", "संबद्ध अधिनियम (Enacting Legislation)"],
              [
                ["1", "संयुक्त प्रांत (United Provinces)", "उत्तर प्रदेश (Uttar Pradesh)", "1950", "संयुक्त प्रांत (नाम परिवर्तन) आदेश, 1950"],
                ["2", "मद्रास (Madras State)", "तमिलनाडु (Tamil Nadu)", "1969", "मद्रास राज्य (नाम परिवर्तन) अधिनियम, 1968"],
                ["3", "मैसूर (Mysore State)", "कर्नाटक (Karnataka)", "1973", "मैसूर राज्य (नाम परिवर्तन) अधिनियम, 1973"],
                ["4", "लक्कादीव, मिनिकॉय और अमीनदीवी", "लक्षद्वीप (Lakshadweep)", "1973", "लक्कादीव, मिनिकॉय (नाम परिवर्तन) अधिनियम, 1973"],
                ["5", "उत्तरांचल (Uttaranchal)", "उत्तराखंड (Uttarakhand)", "2007", "उत्तरांचल (नाम परिवर्तन) अधिनियम, 2006"],
                ["6", "उड़ीसा (Orissa)", "ओडिशा (Odisha)", "2011", "उड़ीसा (नाम परिवर्तन) अधिनियम, 2011"],
              ]
            ),
            {
              _key: "blk-prec-summary",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **ओडिशा का महत्वपूर्ण उदाहरण (2011):** वर्ष 2011 में जब 'Orissa' को 'Odisha' और भाषा 'Oriya' को 'Odia' किया गया, तो संसद द्वारा 113वां संविधान संशोधन अधिनियम (भाषा हेतु 8वीं अनुसूची) तथा 'उड़ीसा (नाम परिवर्तन) अधिनियम 2011' पारित किया गया था। पश्चिम बंगाल के मामले में 'Paschim Banga' नाम अपनाने के लिए संसद को 'पश्चिम बंगाल (नाम परिवर्तन) अधिनियम' पारित करना होगा।",
                },
              ],
            },
          ],
          bodyEn: [
            {
              _key: "blk-en-prec-intro",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "Altering the nomenclature of states to honor vernacular heritage and cultural identity is a well-established constitutional practice in independent India:",
                },
              ],
            },
            createTable(
              "tbl-en-state-precedents",
              "Chronology of States Renamed in Post-Independence India Under Article 3",
              ["No.", "Original Name", "New Renamed Name", "Year", "Enacting Parliamentary Legislation"],
              [
                ["1", "United Provinces (संयुक्त प्रांत)", "Uttar Pradesh (उत्तर प्रदेश)", "1950", "United Provinces (Alteration of Name) Order, 1950"],
                ["2", "Madras State (मद्रास)", "Tamil Nadu (तमिलनाडु)", "1969", "Madras State (Alteration of Name) Act, 1968"],
                ["3", "Mysore State (मैसूर)", "Karnataka (कर्नाटक)", "1973", "Mysore State (Alteration of Name) Act, 1973"],
                ["4", "Laccadive, Minicoy & Amindivi Islands", "Lakshadweep (लक्षद्वीप)", "1973", "Laccadive, Minicoy (Alteration of Name) Act, 1973"],
                ["5", "Uttaranchal (उत्तरांचल)", "Uttarakhand (उत्तराखंड)", "2007", "Uttaranchal (Alteration of Name) Act, 2006"],
                ["6", "Orissa (उड़ीसा)", "Odisha (ओडिशा)", "2011", "Orissa (Alteration of Name) Act, 2011"],
              ]
            ),
            {
              _key: "blk-en-prec-summary",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **The 2011 Odisha Precedent:** In 2011, Parliament enacted the 'Orissa (Alteration of Name) Act' alongside the 113th Constitutional Amendment Act to change the language name 'Oriya' to 'Odia' in the Eighth Schedule. A corresponding 'West Bengal (Alteration of Name) Act' will be required for Paschim Banga.",
                },
              ],
            },
          ],
        },

        // Section 7: MPPSC एवं UPSC परीक्षा हेतु महत्वपूर्ण स्मरणीय तथ्य
        {
          _key: "sec-exam-highlights",
          kind: "keyHighlights",
          title: "7. MPPSC एवं UPSC परीक्षा हेतु महत्वपूर्ण स्मरणीय तथ्य (High-Yield Quick Revision)",
          titleEn: "7. High-Yield Exam Memory Points for MPPSC & UPSC Aspirants",
          body: [
            {
              _key: "blk-ex-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **अनुच्छेद 3 का अधिकार:** भारत में किसी राज्य का नाम बदलने, उसकी सीमा में परिवर्तन करने अथवा नए राज्य का गठन करने का अनन्य अधिकार केवल **संसद** के पास है।",
                },
              ],
            },
            {
              _key: "blk-ex-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **राष्ट्रपति की पूर्व अनुमति:** राज्य के नाम परिवर्तन संबंधी विधेयक संसद में प्रस्तुत करने से पूर्व **राष्ट्रपति की पूर्व अनुशंसा (Prior Recommendation)** अनिवार्य शर्त है।",
                },
              ],
            },
            {
              _key: "blk-ex-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **गैर-बाध्यकारी राज्य विधानमंडल:** विधेयक पर संबंधित राज्य विधानमंडल की राय केवल सलाहकार (Advisory) होती है; संसद राज्य की सहमति के बिना भी नाम बदलने के लिए पूर्ण स्वतंत्र है।",
                },
              ],
            },
            {
              _key: "blk-ex-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **संसद का बहुमत प्रकार:** ऐसा विधेयक संसद के दोनों सदनों में मात्र **साधारण बहुमत (Simple Majority - 50% से अधिक उपस्थित व मतदान)** से पारित होता है।",
                },
              ],
            },
            {
              _key: "blk-ex-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **अनुच्छेद 368 से छूट:** अनुच्छेद 4(2) के अनुसार, अनुच्छेद 3 के तहत पारित कानून को अनुच्छेद 368 के तहत संविधान संशोधन नहीं माना जाता।",
                },
              ],
            },
            {
              _key: "blk-ex-6",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **संविधान की अनुसूचियों पर प्रभाव:** नाम परिवर्तन के कारण संविधान की **प्रथम अनुसूची (राज्यों के नाम)** तथा आवश्यकतानुसार **चौथी अनुसूची (राज्यसभा सीटें)** संशोधित होती हैं।",
                },
              ],
            },
            {
              _key: "blk-ex-7",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **बंगाल विभाजन के मुख्य तथ्य:** 1905 में लॉर्ड कर्जन द्वारा विभाजन (16 अक्टूबर 1905 लागू); 1911 में लॉर्ड हार्डिंग द्वितीय व जॉर्ज पंचम द्वारा निरस्तीकरण; 1947 में सर सिरिल रेडक्लिफ आयोग द्वारा स्थायी विभाजन।",
                },
              ],
            },
            {
              _key: "blk-ex-8",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **संबद्ध केस कानून:** *बाबूलाल पराते बनाम बॉम्बे राज्य (1960)* — सुप्रीम कोर्ट ने अभिनिर्धारित किया कि राज्य विधानमंडल को मूल विधेयक भेजा जाना पर्याप्त है; संसद द्वारा किए गए बाद के संशोधनों हेतु बार-बार राज्य से राय लेना आवश्यक नहीं।",
                },
              ],
            },
          ],
          bodyEn: [
            {
              _key: "blk-en-ex-1",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Plenary Power under Article 3:** The exclusive legislative competence to alter state names, redraw boundaries, or carve out new territories belongs solely to the **Parliament of India**.",
                },
              ],
            },
            {
              _key: "blk-en-ex-2",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Prior Presidential Sanction:** Introduction of any bill under Article 3 requires mandatory **prior recommendation of the President**.",
                },
              ],
            },
            {
              _key: "blk-en-ex-3",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Non-Binding Nature of State Views:** The opinion of the State Legislature on the referred bill is purely advisory and **not binding** upon Parliament or the President.",
                },
              ],
            },
            {
              _key: "blk-en-ex-4",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Legislative Threshold:** The bill is enacted by a **Simple Majority** (greater than 50% of members present and voting) in both Houses of Parliament.",
                },
              ],
            },
            {
              _key: "blk-en-ex-5",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Exemption from Article 368:** Pursuant to Article 4(2), laws enacted under Article 3 are not considered constitutional amendments under Article 368.",
                },
              ],
            },
            {
              _key: "blk-en-ex-6",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Schedules Impacted:** The enactment updates the **First Schedule** (Territories of States) and **Fourth Schedule** (Allocation of Rajya Sabha seats).",
                },
              ],
            },
            {
              _key: "blk-en-ex-7",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Key Historical Partition Dates:** 1905 Partition enacted by Lord Curzon (Oct 16, 1905); 1911 Annulment by King George V & Lord Hardinge II; 1947 Mountbatten Plan & Radcliffe Commission permanently bifurcated Bengal.",
                },
              ],
            },
            {
              _key: "blk-en-ex-8",
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "• **Landmark Constitutional Ruling:** *Babulal Parate v. State of Bombay (1960)* — The Supreme Court held that once the original bill has been referred to the state legislature, fresh reference is not required for amendments introduced in Parliament.",
                },
              ],
            },
          ],
        },
      ],

      // 10 Collapsible FAQs
      faqs: [
        {
          question: "पश्चिम बंगाल का प्रस्तावित नया नाम क्या है और यह निर्णय कब लिया गया?",
          questionEn: "What is the proposed new name of West Bengal and when was it approved?",
          answer: "पश्चिम बंगाल का प्रस्तावित नया नाम 'पश्चिम बंग' (Paschim Banga) है। 23 नवंबर 2026 को मुख्यमंत्री सुवेंदु अधिकारी की अध्यक्षता वाली राज्य कैबिनेट ने इस प्रस्ताव को मंजूरी दी।",
          answerEn: "The proposed new name is 'Paschim Banga'. The State Cabinet headed by Chief Minister Suvendu Adhikari approved the proposal on November 23, 2026."
        },
        {
          question: "क्या राज्य विधानसभा द्वारा प्रस्ताव पारित करने से नाम स्वतः बदल जाता है?",
          questionEn: "Does passing a resolution in the State Assembly automatically change the state's name?",
          answer: "नहीं। राज्य विधानसभा का प्रस्ताव केवल एक सिफारिश होता है। भारतीय संविधान के अनुच्छेद 3 के तहत राज्य का नाम आधिकारिक रूप से बदलने की अनन्य शक्ति केवल भारत की संसद के पास है।",
          answerEn: "No. The state assembly resolution is purely recommendatory. Under Article 3 of the Indian Constitution, the sole power to alter the name of any State resides with the Parliament of India."
        },
        {
          question: "पश्चिम बंगाल का नाम बदलने की मुख्य प्रशासनिक आवश्यकता क्या है?",
          questionEn: "What is the primary administrative reason for renaming West Bengal?",
          answer: "अंग्रेजी में 'West Bengal' का पहला अक्षर 'W' होने के कारण राष्ट्रीय बैठकों (NITI Aayog, Inter-State Council) में राज्य का क्रम अंत में आता है और बोलने का समय कम मिलता है। 'Paschim Banga' होने से यह 'P' अक्षर पर आकर मध्य में आ जाएगा।",
          answerEn: "Starting with 'W', West Bengal ranks near the bottom in alphabetical order at national forums (NITI Aayog, GST Council), resulting in truncated speaking time. 'Paschim Banga' shifts it to 'P', ensuring adequate representation."
        },
        {
          question: "वर्ष 2018 में पश्चिम बंगाल का नाम 'बांग्ला' करने के प्रस्ताव को केंद्र ने क्यों खारिज किया था?",
          questionEn: "Why did the Union Government reject the 2018 proposal to rename the state as 'Bangla'?",
          answer: "केंद्रीय गृह मंत्रालय और विदेश मंत्रालय के अनुसार 'बांग्ला' (Bangla) नाम पड़ोसी संप्रभु देश 'बांग्लादेश' (Bangladesh) से अत्यधिक मिलता-जुलता था, जिससे अंतरराष्ट्रीय राजनयिक व संयुक्त राष्ट्र मंचों पर भ्रम की स्थिति उत्पन्न हो सकती थी।",
          answerEn: "The Union Ministry of Home Affairs and External Affairs rejected 'Bangla' because of its close similarity to sovereign neighbor Bangladesh, which risked creating diplomatic confusion at international forums such as the UN."
        },
        {
          question: "राज्य का नाम बदलने के लिए संविधान में कौन सा अनुच्छेद प्रयुक्त होता है?",
          questionEn: "Which Article of the Indian Constitution governs the renaming of states?",
          answer: "भारतीय संविधान का अनुच्छेद 3 संसद को किसी भी राज्य के क्षेत्र, सीमा अथवा नाम में परिवर्तन करने का अधिकार प्रदान करता है।",
          answerEn: "Article 3 of the Constitution of India empowers Parliament by law to alter the area, boundaries, or name of any State."
        },
        {
          question: "क्या राज्य के नाम परिवर्तन के लिए अनुच्छेद 368 के तहत विशेष बहुमत आवश्यक है?",
          questionEn: "Does renaming a state require a special constitutional amendment under Article 368?",
          answer: "नहीं। अनुच्छेद 4(2) के अनुसार अनुच्छेद 3 के तहत बनाए गए कानून को अनुच्छेद 368 के तहत संविधान संशोधन नहीं माना जाता। यह संसद में साधारण बहुमत (Simple Majority) से पारित होता है।",
          answerEn: "No. Under Article 4(2), legislation enacted under Article 3 is not deemed to be a constitutional amendment under Article 368 and requires only a Simple Majority in Parliament."
        },
        {
          question: "1905 में बंगाल का विभाजन किस वायसराय ने किया था और यह कब लागू हुआ?",
          questionEn: "Which Viceroy partitioned Bengal in 1905 and when did it take effect?",
          answer: "ब्रिटिश वायसराय लॉर्ड कर्जन (Lord Curzon) ने 1905 में बंगाल का विभाजन किया, जो 16 अक्टूबर 1905 को प्रभावी हुआ। इसके विरोध में स्वदेशी एवं बहिष्कार आंदोलन प्रारंभ हुआ।",
          answerEn: "British Viceroy Lord Curzon partitioned Bengal in 1905, taking effect on October 16, 1905, triggering the historic Swadeshi and Boycott Movement."
        },
        {
          question: "बंगाल विभाजन को किस वर्ष और किस वायसराय के कार्यकाल में रद्द किया गया था?",
          questionEn: "In which year and under which Viceroy was the Partition of Bengal annulled?",
          answer: "दिसंबर 1911 के ऐतिहासिक दिल्ली दरबार में ब्रिटिश सम्राट जॉर्ज पंचम और वायसराय लॉर्ड हार्डिंग द्वितीय द्वारा बंगाल विभाजन को रद्द किया गया था।",
          answerEn: "The Partition of Bengal was annulled at the Delhi Durbar in December 1911 by King George V and Viceroy Lord Hardinge II."
        },
        {
          question: "स्वतंत्र भारत में पूर्व में किन प्रमुख राज्यों के नाम बदले गए हैं?",
          questionEn: "Which major Indian states have undergone name changes in post-independence India?",
          answer: "संयुक्त प्रांत से उत्तर प्रदेश (1950), मद्रास से तमिलनाडु (1969), मैसूर से कर्नाटक (1973), उत्तरांचल से उत्तराखंड (2007) और उड़ीसा से ओडिशा (2011)।",
          answerEn: "United Provinces to Uttar Pradesh (1950), Madras to Tamil Nadu (1969), Mysore to Karnataka (1973), Uttaranchal to Uttarakhand (2007), and Orissa to Odisha (2011)."
        },
        {
          question: "MPPSC और UPSC परीक्षा के लिए इस विषय की क्या प्रासंगिकता है?",
          questionEn: "What is the syllabus relevance of this topic for MPPSC and UPSC exams?",
          answer: "MPPSC प्रारंभिक परीक्षा यूनिट 5 (संवैधानिक व्यवस्था), मुख्य परीक्षा पेपर 2 (भारतीय संविधान व संघवाद) तथा UPSC GS Paper 2 (अनुच्छेद 1-4, राज्य पुनर्गठन) में यह अत्यंत महत्वपूर्ण करंट अफेयर्स टॉपिक है।",
          answerEn: "Directly mapped to MPPSC Prelims Unit 5 (Constitutional Governance), MPPSC Mains Paper 2 (Polity & Federalism), and UPSC GS Paper 2 (Articles 1-4 & State Reorganisation)."
        }
      ],

      // Exactly 8 High-Quality MCQs
      mcqs: [
        {
          question: "भारतीय संविधान के किस अनुच्छेद के अंतर्गत संसद को किसी मौजूदा राज्य के नाम में परिवर्तन करने की अनन्य शक्ति प्राप्त है?",
          questionEn: "Under which Article of the Constitution of India does Parliament possess the exclusive power to alter the name of any existing State?",
          options: [
            "अनुच्छेद 1 (Article 1)",
            "अनुच्छेद 2 (Article 2)",
            "अनुच्छेद 3 (Article 3)",
            "अनुच्छेद 4 (Article 4)"
          ],
          correctIndex: 2,
          explanation: "भारतीय संविधान का अनुच्छेद 3(e) संसद को विधि द्वारा किसी भी राज्य के नाम में परिवर्तन करने का अधिकार प्रदान करता है।",
          explanationEn: "Article 3(e) of the Indian Constitution empowers Parliament by law to alter the name of any existing State."
        },
        {
          question: "किसी राज्य के नाम या सीमा में परिवर्तन से संबंधित विधेयक को संसद में प्रस्तुत करने से पूर्व किसकी पूर्व सिफारिश अनिवार्य है?",
          questionEn: "Prior recommendation of whom is mandatory before introducing a bill altering the name or boundaries of a State in Parliament?",
          options: [
            "संबंधित राज्य के राज्यपाल की (Governor of the concerned State)",
            "भारत के राष्ट्रपति की (President of India)",
            "लोकसभा अध्यक्ष की (Speaker of Lok Sabha)",
            "अंतर-राज्यीय परिषद की (Inter-State Council)"
          ],
          correctIndex: 1,
          explanation: "अनुच्छेद 3 के परंतुक के अनुसार, किसी राज्य के नाम, क्षेत्र या सीमा परिवर्तन संबंधी विधेयक राष्ट्रपति की पूर्व सिफारिश के बिना संसद में पेश नहीं किया जा सकता।",
          explanationEn: "According to the proviso to Article 3, no bill altering the name, area, or boundary of any state can be introduced without the prior recommendation of the President of India."
        },
        {
          question: "संविधान के अनुच्छेद 3 के तहत राज्य विधानमंडल द्वारा भेजी गई राय के संदर्भ में कौन-सा कथन सत्य है?",
          questionEn: "Which statement is correct regarding the views expressed by the State Legislature under Article 3?",
          options: [
            "राज्य विधानमंडल की राय संसद पर पूर्णतः बाध्यकारी है",
            "राज्य विधानमंडल की राय केवल राष्ट्रपति पर बाध्यकारी है",
            "राज्य विधानमंडल की राय राष्ट्रपति या संसद पर बाध्यकारी नहीं है",
            "संसद को राज्य की राय के बिना विधेयक पारित करने का कोई अधिकार नहीं है"
          ],
          correctIndex: 2,
          explanation: "सुप्रीम कोर्ट (बाबूलाल पराते केस 1960) के अनुसार राज्य विधानमंडल की राय केवल सलाहकारी होती है और संसद या राष्ट्रपति पर बाध्यकारी नहीं होती।",
          explanationEn: "As affirmed in Babulal Parate v. State of Bombay (1960), the views expressed by the State Legislature are recommendatory and not binding upon Parliament or the President."
        },
        {
          question: "अनुच्छेद 3 के अंतर्गत किसी राज्य का नाम बदलने वाले विधेयक को संसद के प्रत्येक सदन द्वारा किस बहुमत से पारित किया जाना आवश्यक है?",
          questionEn: "By what majority must a bill altering the name of a State under Article 3 be passed in each House of Parliament?",
          options: [
            "संसद के विशेष बहुमत द्वारा (Special Majority under Article 368)",
            "साधारण बहुमत द्वारा (Simple Majority of members present and voting)",
            "विशेष बहुमत तथा आधे राज्यों के अनुसमर्थन द्वारा (Special Majority with 50% State Ratification)",
            "उपस्थित सदस्यों के दो-तिहाई बहुमत द्वारा (Two-thirds of members present)"
          ],
          correctIndex: 1,
          explanation: "अनुच्छेद 3 के तहत राज्य का नाम या सीमा बदलने वाला कानून दोनों सदनों में उपस्थित और मतदान करने वाले सदस्यों के साधारण बहुमत (Simple Majority) से पारित होता है।",
          explanationEn: "Under Article 3, legislation altering the name or boundaries of a state requires passage by a Simple Majority of members present and voting in both Houses."
        },
        {
          question: "अनुच्छेद 4(2) के अनुसार, अनुच्छेद 2 या अनुच्छेद 3 के तहत बनाए गए कानूनों के संदर्भ में क्या प्रावधान है?",
          questionEn: "According to Article 4(2), what is the constitutional provision regarding laws made under Article 2 or Article 3?",
          options: [
            "उन्हें अनुच्छेद 368 के तहत संविधान संशोधन माना जाता है",
            "उन्हें अनुच्छेद 368 के प्रयोजनों के लिए संविधान संशोधन नहीं माना जाएगा",
            "उन्हें उच्चतम न्यायालय के अनुमोदन के बिना लागू नहीं किया जा सकता",
            "उन्हें केवल संयुक्त अधिवेशन (Joint Sitting) में ही पारित किया जा सकता है"
          ],
          correctIndex: 1,
          explanation: "अनुच्छेद 4(2) स्पष्ट करता है कि अनुच्छेद 2 या 3 के तहत बनाए गए कानूनों को अनुच्छेद 368 के तहत संविधान संशोधन नहीं माना जाएगा।",
          explanationEn: "Article 4(2) explicitly provides that laws enacted under Article 2 or Article 3 shall not be deemed to be an amendment of the Constitution for the purposes of Article 368."
        },
        {
          question: "वर्ष 1905 में बंगाल का विभाजन किस ब्रिटिश वायसराय ने किया था तथा यह किस तिथि को लागू हुआ?",
          questionEn: "Which British Viceroy partitioned Bengal in 1905 and on which date did it come into effect?",
          options: [
            "लॉर्ड डलहौजी — 15 अगस्त 1905",
            "लॉर्ड कर्जन — 16 अक्टूबर 1905",
            "लॉर्ड मिंटो — 11 दिसंबर 1905",
            "लॉर्ड चेम्सफोर्ड — 26 जनवरी 1906"
          ],
          correctIndex: 1,
          explanation: "लॉर्ड कर्जन ने 20 जुलाई 1905 को विभाजन की घोषणा की थी, जो 16 अक्टूबर 1905 को प्रभावी हुआ। इस दिन पूरे बंगाल में शोक दिवस और रक्षाबंधन दिवस मनाया गया।",
          explanationEn: "Lord Curzon announced the partition of Bengal on July 20, 1905, taking formal effect on October 16, 1905, marked as a Day of Mourning and Raksha Bandhan across Bengal."
        },
        {
          question: "वर्ष 1911 में किस ऐतिहासिक घटना के दौरान बंगाल विभाजन को रद्द करने तथा राजधानी को कलकत्ता से दिल्ली स्थानांतरित करने की घोषणा हुई?",
          questionEn: "During which historic event in 1911 was the partition of Bengal annulled and the capital shifted from Calcutta to Delhi?",
          options: [
            "इलाहाबाद दरबार (Allahabad Durbar)",
            "दिल्ली दरबार (Delhi Durbar by King George V)",
            "शिमला सम्मेलन (Shimla Conference)",
            "गोलमेज सम्मेलन (Round Table Conference)"
          ],
          correctIndex: 1,
          explanation: "दिसंबर 1911 के ऐतिहासिक दिल्ली दरबार में ब्रिटिश सम्राट जॉर्ज पंचम और वायसराय लॉर्ड हार्डिंग द्वितीय द्वारा बंगाल विभाजन को रद्द किया गया तथा राजधानी कलकत्ता से दिल्ली स्थानांतरित की गई।",
          explanationEn: "At the grand Delhi Durbar in December 1911, King George V and Viceroy Lord Hardinge II annulled the partition of Bengal and declared the transfer of the capital from Calcutta to Delhi."
        },
        {
          question: "वर्ष 2011 में किस भारतीय राज्य का नाम संसद द्वारा कानून पारित करके आधिकारिक रूप से बदला गया था?",
          questionEn: "Which Indian state's name was officially altered in 2011 through parliamentary legislation?",
          options: [
            "मैसूर से कर्नाटक (Mysore to Karnataka)",
            "उत्तरांचल से उत्तराखंड (Uttaranchal to Uttarakhand)",
            "मद्रास से तमिलनाडु (Madras to Tamil Nadu)",
            "उड़ीसा से ओडिशा (Orissa to Odisha)"
          ],
          correctIndex: 3,
          explanation: "वर्ष 2011 में संसद द्वारा 'उड़ीसा (नाम परिवर्तन) अधिनियम, 2011' तथा 113वां संविधान संशोधन पारित करके 'Orissa' को 'Odisha' और भाषा 'Oriya' को 'Odia' किया गया।",
          explanationEn: "In 2011, Parliament enacted the 'Orissa (Alteration of Name) Act, 2011' and 113th Constitutional Amendment Act to change 'Orissa' to 'Odisha' and 'Oriya' to 'Odia'."
        }
      ]
    };

    const res = await client.createOrReplace({
      _id: docId,
      ...articlePayload,
    });

    console.log(`✅ Successfully published ${docId} to Sanity CMS!`);
  }

  // 3. Bi-Directional Backlink Patch: Update 'ca-lady-of-nachna-gupta-sculpture-panna' nextArticle
  console.log("🔗 Updating bi-directional reciprocal backlink on 'ca-lady-of-nachna-gupta-sculpture-panna'...");
  try {
    await client
      .patch("ca-lady-of-nachna-gupta-sculpture-panna")
      .set({
        nextArticle: {
          title: "पश्चिम बंगाल का नाम बदलकर ‘पश्चिम बंग’ करने का प्रस्ताव: जानिए पूरा इतिहास, कारण और संवैधानिक प्रक्रिया",
          titleEn: "West Bengal Name Change Proposal to 'Paschim Banga': History, Constitutional Procedure Under Article 3 & Exam Notes",
          href: `/current-affairs/${docSlug}`,
        },
      })
      .commit();
    console.log("✅ Successfully linked 'ca-lady-of-nachna-gupta-sculpture-panna' -> 'west-bengal-name-change-paschim-banga-2026'!");
  } catch (err) {
    console.warn("⚠️ Warning updating reciprocal backlink:", err);
  }

  console.log("🎉 All documents uploaded, synced to Sanity CMS, and interlinked successfully!");
}

main().catch((err) => {
  console.error("❌ Error uploading article:", err);
  process.exit(1);
});

