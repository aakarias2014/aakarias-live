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

async function main() {
  console.log("🚀 Starting upload process for International Linguistics Olympiad 2026 Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    winners: path.resolve(process.cwd(), "public/images/blog/iol-2026-india-winners-bucharest.png"),
    training: path.resolve(process.cwd(), "public/images/blog/panini-linguistics-iiit-hyderabad.png"),
    aiNlp: path.resolve(process.cwd(), "public/images/blog/linguistics-ai-nlp-computational.png"),
  };

  // Check if files exist
  if (!fs.existsSync(imagePaths.winners) || !fs.existsSync(imagePaths.training) || !fs.existsSync(imagePaths.aiNlp)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Winners Image
  console.log("📸 Uploading IOL 2026 winners image...");
  const assetWinners = await client.assets.upload("image", fs.createReadStream(imagePaths.winners), {
    filename: "iol_2026_india_winners_bucharest.png",
  });
  console.log(`✔ Uploaded winners image. Asset ID: ${assetWinners._id}`);

  // 2. Upload Training Image
  console.log("📸 Uploading IIIT Hyderabad training image...");
  const assetTraining = await client.assets.upload("image", fs.createReadStream(imagePaths.training), {
    filename: "panini_linguistics_iiit_hyderabad.png",
  });
  console.log(`✔ Uploaded training image. Asset ID: ${assetTraining._id}`);

  // 3. Upload AI NLP Linguistics Image
  console.log("📸 Uploading AI NLP Linguistics image...");
  const assetAiNlp = await client.assets.upload("image", fs.createReadStream(imagePaths.aiNlp), {
    filename: "linguistics_ai_nlp_computational.png",
  });
  console.log(`✔ Uploaded AI NLP image. Asset ID: ${assetAiNlp._id}`);

  const articleSlug = "international-linguistics-olympiad-2026-india-gold-medal-mppsc-notes";

  // Construct Document Object for Current Affairs
  const caArticle = {
    _id: "ca-international-linguistics-olympiad-2026-india",
    _type: "currentAffairs",
    slug: { _type: "slug", current: articleSlug },
    title: "23वाँ अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL) 2026: भारत ने जीता 1 स्वर्ण व 3 कांस्य पदक, श्रीलक्ष्मी वेंकटरमन बनीं गोल्ड मेडलिस्ट | MPPSC & UPSC Notes",
    titleEn: "23rd International Linguistics Olympiad (IOL) 2026: India Wins 1 Gold & 3 Bronze Medals, Sreelakshmi Venkataraman Secures Gold | MPPSC & UPSC Notes PDF",
    excerpt: "रोमानिया के बुखारेस्ट में आयोजित 23वें अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL 2026) में भारत का ऐतिहासिक प्रदर्शन। श्रीलक्ष्मी वेंकटरमन ने 70.0 अंकों के साथ जीता स्वर्ण पदक, 3 कांस्य व 1 ऑनरेबल मेंशन। पाणिनि लिंग्विस्टिक्स ओलंपियाड (PLO) तथा IIIT हैदराबाद (LTRC) की भूमिका। MPPSC (पेपर-3: विज्ञान व प्रौद्योगिकी) एवं UPSC हेतु नोट्स।",
    excerptEn: "India achieved a historic feat at the 23rd International Linguistics Olympiad (IOL 2026) in Bucharest, Romania, winning 1 Gold (Sreelakshmi Venkataraman), 3 Bronze medals, and 1 Honourable Mention. Detailed insights on Panini Linguistics Olympiad (PLO) and IIIT Hyderabad LTRC for MPPSC & UPSC.",
    ca_date: "2026-08-12",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 8,
    keywords: [
      "International Linguistics Olympiad 2026",
      "IOL 2026 Romania Bucharest",
      "Sreelakshmi Venkataraman Gold Medalist",
      "23rd International Linguistics Olympiad",
      "Panini Linguistics Olympiad PLO",
      "IIIT Hyderabad LTRC",
      "Language Technologies Research Centre",
      "Aarav Anil Rao Bronze",
      "Nishant Shankar Lakshmanan Bronze",
      "Advay Mishra Bronze",
      "Soham Amit Pednekar Honourable Mention",
      "Computational Linguistics AI NLP",
      "इंटरनेशनल लिंग्विस्टिक्स ओलंपियाड 2026",
      "पाणिनि लिंग्विस्टिक्स ओलंपियाड",
      "श्रीलक्ष्मी वेंकटरमन स्वर्ण पदक",
      "MPPSC Science and Technology",
      "UPSC Science and Tech Current Affairs"
    ],
    category: { _type: "reference", _ref: "cat-scitech" }, // Science & Technology
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-3", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetWinners._id },
      alt: "Indian students celebrating with gold and bronze medals holding the Indian tricolor flag at 23rd International Linguistics Olympiad 2026 award ceremony in Bucharest Romania",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News / Context ────────────────────────────── */
      {
        _key: "sec-why-important",
        kind: "whyInNews",
        title: "परीक्षा में क्यों महत्वपूर्ण? (Why is it Important in Exams?)",
        titleEn: "Why is it Important in Exams?",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "रोमानिया की राजधानी **बुखारेस्ट (Bucharest, Romania)** में आयोजित **23वें अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (23rd International Linguistics Olympiad - IOL 2026)** में भारतीय छात्रों ने इतिहास रचते हुए **1 स्वर्ण (Gold Medal), 3 कांस्य (Bronze Medals) तथा 1 ऑनरेबल मेंशन (Honourable Mention)** हासिल किया है। लोक सेवा आयोग (MPPSC राज्य सेवा परीक्षा एवं UPSC Civil Services Exam) के **सामान्य अध्ययन पेपर-3 (विज्ञान, प्रौद्योगिकी, भाषा-विज्ञान एवं आर्टिफिशियल इंटेलिजेंस / AI & NLP)** के लिए अंतर्राष्ट्रीय ओलंपिक प्रतियोगिताओं में भारत के प्रदर्शन एवं पाणिनि भाषाविज्ञान मॉडल से संबंधित तथ्य अत्यंत महत्वपूर्ण हैं।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "India achieved a historic milestone at the **23rd International Linguistics Olympiad (IOL 2026)** held in Bucharest, Romania, winning **1 Gold, 3 Bronze, and 1 Honourable Mention**. This achievement is highly relevant for MPPSC & UPSC GS Paper-3 (Science & Technology, Computational Linguistics, and AI/NLP)." }],
          },
        ],
      },

      /* ── 2. India's Achievement & Winners List ───────────────── */
      {
        _key: "sec-achievement-winners",
        kind: "background",
        title: "भारत की ऐतिहासिक उपलब्धि एवं विजेता छात्रों की सूची",
        titleEn: "India's Historic Achievement & List of Medal Winners",
        body: [
          {
            _key: "b2-1", _type: "block", style: "h3",
            children: [{ _key: "s2-1", _type: "span", text: "1. आईओएल 2026 में भारत का प्रदर्शन एवं पदक तालिका" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• **आयोजन स्थान (Venue)**: बुखारेस्ट, रोमानिया (Bucharest, Romania)" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• **प्रतियोगिता का नाम एवं संस्करण**: 23वाँ International Linguistics Olympiad (IOL 2026)" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• **वैश्विक भागीदारी**: प्रतियोगिता में **40 से अधिक देशों के 255 प्रतिभागियों** ने हिस्सा लिया।" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• **भारतीय दल का आकार**: भारतीय दल में **8 छात्रों** ने व्यक्तिगत प्रतियोगिता में भाग लिया।" }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• **भारत का कुल पदक तालिका**: **1 स्वर्ण पदक (Gold), 3 कांस्य पदक (Bronze) और 1 ऑनरेबल मेंशन (Honourable Mention)**" }],
          },
          {
            _key: "b2-7", _type: "block", style: "h3",
            children: [{ _key: "s2-7", _type: "span", text: "भारतीय विजेताओं के नाम तथा अर्जित सम्मान:" }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• **श्रीलक्ष्मी वेंकटरमन (Sreelakshmi Venkataraman)**: **स्वर्ण पदक (Gold Medal)** — 70.0 अंक (70.0 Marks)" }]
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "• **आरव अनिल राव (Aarav Anil Rao)**: **कांस्य पदक (Bronze Medal)**" }]
          },
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "• **निशांत शंकर लक्ष्मणन (Nishant Shankar Lakshmanan)**: **कांस्य पदक (Bronze Medal)**" }]
          },
          {
            _key: "b2-11", _type: "block", style: "normal",
            children: [{ _key: "s2-11", _type: "span", text: "• **अद्वय मिश्रा (Advay Mishra)**: **कांस्य पदक (Bronze Medal)**" }]
          },
          {
            _key: "b2-12", _type: "block", style: "normal",
            children: [{ _key: "s2-12", _type: "span", text: "• **सोहम अमित पेडणेकर (Soham Amit Pednekar)**: **Honourable Mention (ऑनरेबल मेंशन)**" }]
          },
          {
            _key: "b2-img-1", _type: "image",
            asset: { _type: "reference", _ref: assetWinners._id },
            alt: "Indian students celebrating gold and bronze medals with Indian national flag at IOL 2026 Bucharest",
          },
        ],
        bodyEn: [
          {
            _key: "b2-13", _type: "block", style: "h3",
            children: [{ _key: "s2-13", _type: "span", text: "1. Performance of Team India & Medal Tally" }],
          },
          {
            _key: "b2-14", _type: "block", style: "normal",
            children: [{ _key: "s2-14", _type: "span", text: "• **Venue**: Bucharest, Romania" }],
          },
          {
            _key: "b2-15", _type: "block", style: "normal",
            children: [{ _key: "s2-15", _type: "span", text: "• **Edition**: 23rd International Linguistics Olympiad (IOL 2026)" }],
          },
          {
            _key: "b2-16", _type: "block", style: "normal",
            children: [{ _key: "s2-16", _type: "span", text: "• **Global Participation**: 255 contestants from over 40 countries." }],
          },
          {
            _key: "b2-17", _type: "block", style: "normal",
            children: [{ _key: "s2-17", _type: "span", text: "• **Team India**: 8 students selected for individual contests." }],
          },
          {
            _key: "b2-18", _type: "block", style: "normal",
            children: [{ _key: "s2-18", _type: "span", text: "• **Medal Tally**: **1 Gold, 3 Bronze, and 1 Honourable Mention**." }],
          },
          {
            _key: "b2-19", _type: "block", style: "normal",
            children: [{ _key: "s2-19", _type: "span", text: "• **Gold Medalist**: **Sreelakshmi Venkataraman** (70.0 score)." }],
          },
          {
            _key: "b2-20", _type: "block", style: "normal",
            children: [{ _key: "s2-20", _type: "span", text: "• **Bronze Medalists**: Aarav Anil Rao, Nishant Shankar Lakshmanan, Advay Mishra." }],
          },
          {
            _key: "b2-21", _type: "block", style: "normal",
            children: [{ _key: "s2-21", _type: "span", text: "• **Honourable Mention**: Soham Amit Pednekar." }],
          },
          {
            _key: "b2-img-1-en", _type: "image",
            asset: { _type: "reference", _ref: assetWinners._id },
            alt: "Indian students celebrating gold and bronze medals with Indian national flag at IOL 2026 Bucharest",
          },
        ],
      },

      /* ── 3. What is International Linguistics Olympiad (IOL)? ── */
      {
        _key: "sec-what-is-iol",
        kind: "keyAspects",
        title: "क्या है International Linguistics Olympiad (IOL)?",
        titleEn: "What is the International Linguistics Olympiad (IOL)?",
        body: [
          {
            _key: "b3-1", _type: "block", style: "h3",
            children: [{ _key: "s3-1", _type: "span", text: "2. आईओएल की अवधारणा, उद्देश्य तथा 5 मुख्य परीक्षण क्षेत्र" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **परिभाषा (IOL Definition)**: **IOL = International Linguistics Olympiad**। यह स्कूली छात्रों के लिए प्रतिवर्ष आयोजित होने वाली विश्व की 13 अंतर्राष्ट्रीय विज्ञान ओलंपियाडों में से एक प्रमुख शैक्षणिक प्रतियोगिता है।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **मूल्यांकन का आधार**: इसमें रटने की क्षमता (rote learning) के बजाय **तार्किक सोच (Logical Thinking), भाषा-विश्लेषण (Linguistic Analysis) और समस्या-समाधान कौशल (Problem-Solving Skills)** को परखा जाता है।" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "• **प्रश्नों का स्वरूप**: छात्रों को पूर्णतः अज्ञात या अपरिचित भाषाओं (Unfamiliar/Extinct Languages) से जुड़े भाषाई डेटा दिए जाते हैं और उन्हें उनके आधार पर भाषाई नियम, व्याकरणिक संरचनाएं एवं पैटर्न खोजने होते हैं।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "h3",
            children: [{ _key: "s3-5", _type: "span", text: "आईओएल परीक्षा के 5 प्रमुख भाषाई क्षेत्र (5 Core Linguistic Domains):" }],
          },
          {
            _key: "b3-6", _type: "block", style: "normal",
            children: [{ _key: "s3-6", _type: "span", text: "• **1. ध्वनिविज्ञान (Phonetics / Phonology)**: ध्वनियों और उनके उच्चारण पैटर्न का विश्लेषण।" }]
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "• **2. रूपविज्ञान (Morphology)**: शब्दों की आंतरिक संरचना, उपसर्ग/प्रत्यय एवं रूप निर्धारण।" }]
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "• **3. वाक्यविन्यास (Syntax)**: वाक्यों के निर्माण के नियम तथा शब्द क्रम।" }]
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "• **4. अर्थविज्ञान (Semantics)**: शब्दों और वाक्यों के अर्थ तथा संबंध।" }]
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "• **5. भाषा तुलना एवं पैटर्न पहचान (Language Comparison & Pattern Recognition)**: विभिन्न भाषा परिवारों की तुलना एवं लिपि-विश्लेषण।" }]
          },
        ],
        bodyEn: [
          {
            _key: "b3-11", _type: "block", style: "h3",
            children: [{ _key: "s3-11", _type: "span", text: "2. Concept, Structure and 5 Key Testing Domains of IOL" }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "• **Overview**: The International Linguistics Olympiad (IOL) is one of the 13 International Science Olympiads for high school students worldwide." }],
          },
          {
            _key: "b3-13", _type: "block", style: "normal",
            children: [{ _key: "s3-13", _type: "span", text: "• **Focus**: Tests logical analytical reasoning, structural pattern recognition, and problem-solving skills rather than prior knowledge of specific languages." }],
          },
          {
            _key: "b3-14", _type: "block", style: "normal",
            children: [{ _key: "s3-14", _type: "span", text: "• **5 Domains**: Phonetics/Phonology, Morphology, Syntax, Semantics, and Language Comparison & Pattern Recognition." }],
          },
        ],
      },

      /* ── 4. Indian Selection Process (PLO) & IIIT Hyderabad ───── */
      {
        _key: "sec-plo-iiit-hyderabad",
        kind: "keyAspects",
        title: "पाणिनि लिंग्विस्टिक्स ओलंपियाड (PLO) एवं IIIT हैदराबाद की भूमिका",
        titleEn: "Panini Linguistics Olympiad (PLO) & Role of IIIT Hyderabad",
        body: [
          {
            _key: "b4-1", _type: "block", style: "h3",
            children: [{ _key: "s4-1", _type: "span", text: "3. राष्ट्रीय चयन प्रक्रिया (Panini Linguistics Olympiad - PLO)" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **चयन संस्था (PLO)**: भारतीय टीम का चयन **पाणिनि लिंग्विस्टिक्स ओलंपियाड (Panini Linguistics Olympiad - PLO)** के माध्यम से किया जाता है। महान प्राचीन भारतीय वैयाकरण **महर्षि पाणिनि** के नाम पर इस प्रतियोगिता का नामकरण किया गया है।" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• **2026 के चयन चरण की प्रक्रिया (Selection Funnel)**:" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "  - **पंजीकरण (Registrations)**: देशभर से **525 छात्रों ने पंजीकरण** कराया।" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "  - **ओपन क्वालिफाइंग राउंड**: **338 छात्र** ओपन नेशनल क्वालिफाइंग परीक्षा में शामिल हुए।" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "  - **प्रशिक्षण शिविर हेतु चयन**: शीर्ष **34 प्रतिभागियों** का चयन IIIT हैदराबाद में आयोजित विशेष राष्ट्रीय प्रशिक्षण शिविर हेतु किया गया।" }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "  - **प्रशिक्षण शिविर की अवधि**: यह शिविर **31 मई से 10 जून 2026** तक संचालित हुआ।" }],
          },
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "  - **अंतिम टीम चयन**: शिविर के बाद मूल्यांकन के आधार पर **8 सदस्यीय अंतिम भारतीय टीम** का चयन रोमानिया हेतु किया गया।" }],
          },
          {
            _key: "b4-9", _type: "block", style: "h3",
            children: [{ _key: "s4-9", _type: "span", text: "IIIT हैदराबाद के LTRC सेंटर का योगदान:" }],
          },
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "• **प्रशिक्षण केंद्र**: भारतीय टीम के गहन प्रशिक्षण कार्यक्रम का संचालन **IIIT Hyderabad के Language Technologies Research Centre (LTRC)** द्वारा किया जाता है।" }],
          },
          {
            _key: "b4-11", _type: "block", style: "normal",
            children: [{ _key: "s4-11", _type: "span", text: "• **प्रशिक्षण की तकनीकें**: शिविर में विशेषज्ञ संकाय द्वारा लेक्चर्स, मेंटरिंग सत्र, जटिल समस्या-समाधान अभ्यास, मॉक ओलंपियाड और मूल्यांकन टेस्ट आयोजित किए गए।" }],
          },
          {
            _key: "b4-img-2", _type: "image",
            asset: { _type: "reference", _ref: assetTraining._id },
            alt: "High school students participating in Panini Linguistics Olympiad training workshop at IIIT Hyderabad LTRC",
          },
        ],
        bodyEn: [
          {
            _key: "b4-12", _type: "block", style: "h3",
            children: [{ _key: "s4-12", _type: "span", text: "3. National Selection via PLO & Role of IIIT Hyderabad LTRC" }],
          },
          {
            _key: "b4-13", _type: "block", style: "normal",
            children: [{ _key: "s4-13", _type: "span", text: "• **Panini Linguistics Olympiad (PLO)**: The national qualifying competition named after ancient Indian grammarian Maharishi Panini." }],
          },
          {
            _key: "b4-14", _type: "block", style: "normal",
            children: [{ _key: "s4-14", _type: "span", text: "• **Selection Stages 2026**: 525 registered -> 338 appeared in Open National Round -> Top 34 trained at IIIT Hyderabad (May 31 to June 10, 2026) -> Final 8 selected." }],
          },
          {
            _key: "b4-15", _type: "block", style: "normal",
            children: [{ _key: "s4-15", _type: "span", text: "• **IIIT Hyderabad LTRC**: Language Technologies Research Centre at IIIT Hyderabad conducts mentoring, lectures, and mock olympiad problem-solving sessions." }],
          },
          {
            _key: "b4-img-2-en", _type: "image",
            asset: { _type: "reference", _ref: assetTraining._id },
            alt: "High school students participating in Panini Linguistics Olympiad training workshop at IIIT Hyderabad LTRC",
          },
        ],
      },

      /* ── 5. Significance & Impact on AI / Computational Ling ──── */
      {
        _key: "sec-significance-ai-nlp",
        kind: "analysis",
        title: "क्यों महत्वपूर्ण है? (AI, NLP एवं भाषा-प्रौद्योगिकी में उपयोगिता)",
        titleEn: "Why is it Significant? (Relevance to AI, NLP & Computational Linguistics)",
        body: [
          {
            _key: "b5-1", _type: "block", style: "h3",
            children: [{ _key: "s5-1", _type: "span", text: "4. भाषाविज्ञान का कृत्रिम बुद्धिमत्ता (AI) एवं भाषा-प्रौद्योगिकी से संबंध" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• **वैश्विक प्रतिस्पर्धात्मकता**: यह उपलब्धि भाषाविज्ञान में भारतीय छात्रों की **वैश्विक प्रतिस्पर्धात्मक क्षमता (Global Competitiveness)** को स्थापित करती है।" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• **AI तथा NLP में उपयोगिता**: भाषाविज्ञान अध्ययन में विकसित होने वाली तार्किक और संरचनात्मक विश्लेषण क्षमता **कृत्रिम बुद्धिमत्ता (AI - Artificial Intelligence), प्राकृतिक भाषा प्रसंस्करण (NLP - Natural Language Processing) तथा कम्प्यूटेशनल भाषाविज्ञान (Computational Linguistics)** जैसे अत्याधुनिक क्षेत्रों की नींव है।" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• **पाणिनि व्याकरण की प्रासंगिकता**: महर्षि पाणिनि का 'अष्टाध्यायी' (Astadhyayi) विश्व का पहला औपचारिक नियम-आधारित व्याकरण (Formal Rule-Based Grammar) है, जिसे आधुनिक कंप्यूटर कोड और प्रोग्रामिंग लैंग्वेज की प्रेरणा माना जाता है।" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "• **भाषा-प्रौद्योगिकी में क्रांति**: अंतरराष्ट्रीय ओलंपियाड में भारत की निरंतर सफलता देश में भाषा-विज्ञान एवं भारतीय भाषा-प्रौद्योगिकी (Bhashini Mission) के प्रति युवाओं की बढ़ती रुचि को दर्शाती है।" }],
          },
          {
            _key: "b5-img-3", _type: "image",
            asset: { _type: "reference", _ref: assetAiNlp._id },
            alt: "Graphic illustration connecting Paninian grammar syntax trees to Artificial Intelligence and Natural Language Processing NLP",
          },
        ],
        bodyEn: [
          {
            _key: "b5-6", _type: "block", style: "h3",
            children: [{ _key: "s5-6", _type: "span", text: "4. Technological Relevance to Artificial Intelligence & Language Models" }],
          },
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "• **Link to AI & NLP**: Structural linguistic analysis skill is foundational for **Artificial Intelligence (AI), Large Language Models (LLMs), and Natural Language Processing (NLP)**." }],
          },
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "• **Panini's Legacy**: Maharishi Panini's Astadhyayi is celebrated as the world's first formal rule-based generative grammar system." }],
          },
          {
            _key: "b5-img-3-en", _type: "image",
            asset: { _type: "reference", _ref: assetAiNlp._id },
            alt: "Graphic illustration connecting Paninian grammar syntax trees to Artificial Intelligence and Natural Language Processing NLP",
          },
        ],
      },

      /* ── 6. Exam Quick Revision Fact Sheet ───────────────────── */
      {
        _key: "sec-mppsc-quick-facts",
        kind: "mppscNotes",
        title: "परीक्षा के लिए महत्वपूर्ण तथ्य (MPPSC & UPSC Revision Sheet)",
        titleEn: "Key Exam Facts for MPPSC & UPSC Civil Services",
        body: [
          {
            _key: "b6-1", _type: "block", style: "h3",
            children: [{ _key: "s6-1", _type: "span", text: "5. आईओएल 2026 परीक्षा उपयोगी स्मरण बिंदु" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "• **आयोजन स्थान (IOL 2026 Venue)**: बुखारेस्ट, रोमानिया (Bucharest, Romania)" }]
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• **संस्करण (Edition)**: 23वाँ (23rd Edition)" }]
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "• **भारत की पहली भागीदारी**: वर्ष 2009" }]
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "• **2026 में भारत की उपलब्धि**: 1 Gold + 3 Bronze + 1 Honourable Mention" }]
          },
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• **भारतीय स्वर्ण पदक विजेता**: श्रीलक्ष्मी वेंकटरमन (70.0 अंक)" }]
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• **राष्ट्रीय चयन प्रतियोगिता**: पाणिनि लिंग्विस्टिक्स ओलंपियाड (PLO)" }]
          },
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "• **प्रशिक्षण संस्थान**: IIIT Hyderabad (LTRC - Language Technologies Research Centre)" }]
          },
          {
            _key: "b6-9", _type: "block", style: "normal",
            children: [{ _key: "s6-9", _type: "span", text: "• **2026 कुल प्रतिभागी**: 255 छात्र (40 से अधिक देश)" }]
          },
          {
            _key: "b6-10", _type: "block", style: "normal",
            children: [{ _key: "s6-10", _type: "span", text: "• **मुख्य परीक्षण आधार**: भाषा + तर्क + पैटर्न पहचान + समस्या समाधान" }]
          },
        ],
        bodyEn: [
          {
            _key: "b6-11", _type: "block", style: "h3",
            children: [{ _key: "s6-11", _type: "span", text: "5. Quick Revision Points for Civil Services" }],
          },
          {
            _key: "b6-12", _type: "block", style: "normal",
            children: [{ _key: "s6-12", _type: "span", text: "• **Venue**: Bucharest, Romania (23rd Edition)" }]
          },
          {
            _key: "b6-13", _type: "block", style: "normal",
            children: [{ _key: "s6-13", _type: "span", text: "• **India's First Participation**: 2009" }]
          },
          {
            _key: "b6-14", _type: "block", style: "normal",
            children: [{ _key: "s6-14", _type: "span", text: "• **Tally 2026**: 1 Gold, 3 Bronze, 1 Honourable Mention" }]
          },
          {
            _key: "b6-15", _type: "block", style: "normal",
            children: [{ _key: "s6-15", _type: "span", text: "• **Gold Medalist**: Sreelakshmi Venkataraman (70.0 score)" }]
          },
          {
            _key: "b6-16", _type: "block", style: "normal",
            children: [{ _key: "s6-16", _type: "span", text: "• **National Selection**: Panini Linguistics Olympiad (PLO)" }]
          },
          {
            _key: "b6-17", _type: "block", style: "normal",
            children: [{ _key: "s6-17", _type: "span", text: "• **Training Institute**: IIIT Hyderabad (LTRC)" }]
          },
        ],
      },
    ],

    /* ─── MCQs (EXACTLY 8 HIGH QUALITY MCQs FOR CURRENT AFFAIRS) ── */
    mcqs: [
      {
        question: "International Linguistics Olympiad 2026 में भारत के लिए स्वर्ण पदक किसने जीता?",
        questionEn: "Who won the Gold Medal for India at the International Linguistics Olympiad 2026?",
        options: ["आरव अनिल राव", "अद्वय मिश्रा", "श्रीलक्ष्मी वेंकटरमन", "सोहम अमित पेडणेकर"],
        optionsEn: ["Aarav Anil Rao", "Advay Mishra", "Sreelakshmi Venkataraman", "Soham Amit Pednekar"],
        correctIndex: 2,
        explanation: "श्रीलक्ष्मी वेंकटरमन (Sreelakshmi Venkataraman) ने बुखारेस्ट, रोमानिया में आयोजित 23वें अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL 2026) में 70.0 अंक हासिल कर भारत के लिए स्वर्ण पदक जीता।",
        explanationEn: "Sreelakshmi Venkataraman scored 70.0 points to win the Gold Medal for India at the 23rd International Linguistics Olympiad (IOL 2026) in Bucharest, Romania."
      },
      {
        question: "23वें अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL 2026) का आयोजन किस स्थान पर किया गया था?",
        questionEn: "Where was the 23rd International Linguistics Olympiad (IOL 2026) hosted?",
        options: ["पेरिस, फ्रांस", "बुखारेस्ट, रोमानिया", "टोक्यो, जापान", "जेनेवा, स्विट्जरलैंड"],
        optionsEn: ["Paris, France", "Bucharest, Romania", "Tokyo, Japan", "Geneva, Switzerland"],
        correctIndex: 1,
        explanation: "IOL 2026 का आयोजन रोमानिया की राजधानी बुखारेस्ट (Bucharest, Romania) में किया गया था, जिसमें 40+ देशों के 255 प्रतिभागियों ने हिस्सा लिया।",
        explanationEn: "The 23rd IOL 2026 was hosted in Bucharest, Romania, featuring 255 contestants from over 40 countries."
      },
      {
        question: "अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL) हेतु भारतीय टीम का चयन किस राष्ट्रीय प्रतियोगिता के माध्यम से किया जाता है?",
        questionEn: "Through which national competition is the Indian team selected for the International Linguistics Olympiad (IOL)?",
        options: ["आर्यभट्ट गणित ओलंपियाड", "पाणिनि लिंग्विस्टिक्स ओलंपियाड (PLO)", "भास्कर भाषा ओलंपियाड", "राष्ट्रीय विज्ञान ओलंपियाड (NSO)"],
        optionsEn: ["Aryabhata Mathematics Olympiad", "Panini Linguistics Olympiad (PLO)", "Bhaskara Language Olympiad", "National Science Olympiad (NSO)"],
        correctIndex: 1,
        explanation: "भारतीय टीम का चयन 'पाणिनि लिंग्विस्टिक्स ओलंपियाड' (Panini Linguistics Olympiad - PLO) के माध्यम से किया जाता है। 2026 में इसके तहत 525 छात्रों ने पंजीकरण कराया था।",
        explanationEn: "The Indian squad for IOL is selected through the Panini Linguistics Olympiad (PLO), named after ancient grammarian Maharishi Panini."
      },
      {
        question: "IOL 2026 की भारतीय टीम के लिए राष्ट्रीय प्रशिक्षण शिविर का आयोजन किस प्रतिष्ठित संस्थान के LTRC सेंटर द्वारा किया गया?",
        questionEn: "The national training camp for Team India IOL 2026 was conducted by the LTRC center of which premier institute?",
        options: ["IIT बॉम्बे", "IIIT हैदराबाद", "TIFR मुंबई", "IISc बेंगलुरु"],
        optionsEn: ["IIT Bombay", "IIIT Hyderabad", "TIFR Mumbai", "IISc Bengaluru"],
        correctIndex: 1,
        explanation: "भारतीय टीम के प्रशिक्षण शिविर का संचालन **IIIT Hyderabad के Language Technologies Research Centre (LTRC)** द्वारा 31 मई से 10 जून 2026 तक किया गया था।",
        explanationEn: "The training camp was conducted by the Language Technologies Research Centre (LTRC) at IIIT Hyderabad from May 31 to June 10, 2026."
      },
      {
        question: "23वें अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL 2026) में भारत का कुल प्रदर्शन क्या रहा?",
        questionEn: "What was India's overall medal performance at the 23rd International Linguistics Olympiad (IOL 2026)?",
        options: ["2 स्वर्ण + 2 रजत", "1 स्वर्ण + 3 कांस्य + 1 ऑनरेबल मेंशन", "3 स्वर्ण + 1 कांस्य", "2 रजत + 3 कांस्य"],
        optionsEn: ["2 Gold + 2 Silver", "1 Gold + 3 Bronze + 1 Honourable Mention", "3 Gold + 1 Bronze", "2 Silver + 3 Bronze"],
        correctIndex: 1,
        explanation: "भारत ने IOL 2026 में कुल 1 स्वर्ण पदक (श्रीलक्ष्मी वेंकटरमन), 3 कांस्य पदक (आरव अनिल राव, निशांत शंकर लक्ष्मणन, अद्वय मिश्रा) तथा 1 ऑनरेबल मेंशन (सोहम अमित पेडणेकर) प्राप्त किया।",
        explanationEn: "India won 1 Gold, 3 Bronze medals, and 1 Honourable Mention at IOL 2026."
      },
      {
        question: "भारत ने अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL) में पहली बार किस वर्ष भाग लिया था?",
        questionEn: "In which year did India participate in the International Linguistics Olympiad (IOL) for the first time?",
        options: ["2001", "2009", "2014", "2020"],
        optionsEn: ["2001", "2009", "2014", "2020"],
        correctIndex: 1,
        explanation: "भारत ने अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL) में पहली बार वर्ष **2009** में भाग लिया था और तब से निरंतर उत्कृष्ट प्रदर्शन कर रहा है।",
        explanationEn: "India first participated in the International Linguistics Olympiad in the year 2009."
      },
      {
        question: "अंतर्राष्ट्रीय भाषाविज्ञान ओलंपियाड (IOL) में मुख्य रूप से किस कौशल की परीक्षा ली जाती है?",
        questionEn: "What primary skill is evaluated in the International Linguistics Olympiad (IOL)?",
        options: ["विदेशी भाषाओं को रटने की क्षमता", "तार्किक सोच, भाषाई पैटर्न विश्लेषण एवं समस्या-समाधान", "केवल संस्कृत व्याकरण का ज्ञान", "साहित्यिक निबंध लेखन"],
        optionsEn: ["Rote memorization of foreign languages", "Logical reasoning, linguistic pattern analysis & problem solving", "Only knowledge of Sanskrit grammar", "Literary essay writing"],
        correctIndex: 1,
        explanation: "IOL में किसी भाषा के पूर्व ज्ञान या रटने के बजाय अपरिचित भाषाओं के डेटा के आधार पर तार्किक सोच, भाषा-विश्लेषण और समस्या-समाधान कौशल की परीक्षा ली जाती है।",
        explanationEn: "IOL tests logical analytical reasoning and pattern recognition using unfamiliar linguistic data rather than prior language knowledge."
      },
      {
        question: "भाषाविज्ञान ओलंपियाड में विकसित होने वाली तार्किक क्षमता मुख्य रूप से प्रौद्योगिकी के किस क्षेत्र में उपयोगी है?",
        questionEn: "The analytical skill developed through linguistics olympiads is directly applicable in which technology domain?",
        options: ["आर्टिफिशियल इंटेलिजेंस (AI) एवं प्राकृतिक भाषा प्रसंस्करण (NLP)", "नाभिकीय भौतिकी", "ऑटोमोबाइल डिजाइनिंग", "समुद्री जीवविज्ञान"],
        optionsEn: ["Artificial Intelligence (AI) & Natural Language Processing (NLP)", "Nuclear Physics", "Automobile Designing", "Marine Biology"],
        correctIndex: 0,
        explanation: "भाषाई संरचना और पैटर्न विश्लेषण कौशल AI, नेचुरल लैंग्वेज प्रोसेसिंग (NLP), कम्प्यूटेशनल लिंग्विस्टिक्स और बड़े भाषा मॉडल (LLMs) के विकास में अत्यंत महत्वपूर्ण है।",
        explanationEn: "Linguistic structural analysis directly powers Artificial Intelligence (AI), Natural Language Processing (NLP), and Computational Linguistics."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "International Linguistics Olympiad (IOL) 2026 में भारत का क्या प्रदर्शन रहा?",
        questionEn: "What was India's performance at the International Linguistics Olympiad (IOL) 2026?",
        answer: "रोमानिया के बुखारेस्ट में आयोजित 23वें IOL 2026 में भारत ने 1 स्वर्ण पदक (श्रीलक्ष्मी वेंकटरमन), 3 कांस्य पदक (आरव अनिल राव, निशांत शंकर लक्ष्मणन, अद्वय मिश्रा) तथा 1 ऑनरेबल मेंशन (सोहम अमित पेडणेकर) हासिल किया।",
        answerEn: "India won 1 Gold (Sreelakshmi Venkataraman), 3 Bronze medals, and 1 Honourable Mention at the 23rd IOL 2026 in Bucharest, Romania."
      },
      {
        question: "IOL 2026 में भारत के लिए स्वर्ण पदक किसने जीता?",
        questionEn: "Who won the Gold Medal for India at IOL 2026?",
        answer: "श्रीलक्ष्मी वेंकटरमन (Sreelakshmi Venkataraman) ने 70.0 अंकों के साथ भारत के लिए स्वर्ण पदक जीता।",
        answerEn: "Sreelakshmi Venkataraman won the Gold Medal for India with a score of 70.0 points."
      },
      {
        question: "पाणिनि लिंग्विस्टिक्स ओलंपियाड (PLO) क्या है?",
        questionEn: "What is the Panini Linguistics Olympiad (PLO)?",
        answer: "पाणिनि लिंग्विस्टिक्स ओलंपियाड (PLO) भारत की राष्ट्रीय प्रतियोगिता है, जिसके माध्यम से IOL हेतु भारतीय दल का चयन किया जाता है। 2026 में इसमें 525 छात्रों ने पंजीकरण कराया था।",
        answerEn: "PLO is India's national selection competition for IOL, named after ancient grammarian Maharishi Panini."
      },
      {
        question: "IOL हेतु भारतीय टीम को किस संस्थान द्वारा प्रशिक्षित किया जाता है?",
        questionEn: "Which institute trains the Indian team for IOL?",
        answer: "IIIT Hyderabad का Language Technologies Research Centre (LTRC) भारतीय टीम के लिए विशेष प्रशिक्षण शिविर आयोजित करता है। 2026 में शिविर 31 मई से 10 जून तक चला।",
        answerEn: "The Language Technologies Research Centre (LTRC) at IIIT Hyderabad conducts the national training camp for Team India."
      },
      {
        question: "International Linguistics Olympiad में किस प्रकार के प्रश्न पूछे जाते हैं?",
        questionEn: "What types of questions are asked in the International Linguistics Olympiad?",
        answer: "इसमें छात्रों को अपरिचित या लुप्तप्राय भाषाओं का डेटा दिया जाता है और रटने की जगह ध्वनिविज्ञान, रूपविज्ञान, वाक्यविन्यास और अर्थविज्ञान के आधार पर तार्किक पैटर्न खोजने होते हैं।",
        answerEn: "Contestants are given data from unfamiliar languages to deduce grammar rules and patterns across phonetics, morphology, syntax, and semantics."
      },
      {
        question: "भाषाविज्ञान का आर्टिफिशियल इंटेलिजेंस (AI) में क्या महत्व है?",
        questionEn: "What is the significance of linguistics in Artificial Intelligence (AI)?",
        answer: "भाषाविज्ञान का तार्किक ढांचा AI, नेचुरल लैंग्वेज प्रोसेसिंग (NLP), कम्प्यूटेशनल लिंग्विस्टिक्स और ChatGPT / Gemini जैसे बड़े भाषा मॉडलों (LLMs) के विकास की मूल नींव है।",
        answerEn: "Linguistic structures form the core foundation for Natural Language Processing (NLP), Computational Linguistics, and AI Large Language Models."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "International Linguistics Olympiad (IOL Official)", url: "https://ioling.org" },
      { label: "IIIT Hyderabad Language Technologies Research Centre (LTRC)", url: "https://ltrc.iiit.ac.in" },
      { label: "Panini Linguistics Olympiad (PLO Portal)", url: "https://plo.iiit.ac.in" }
    ]
  };

  // Construct Static GK Document Object as well
  const gkArticle = {
    ...caArticle,
    _id: "gk-international-linguistics-olympiad-2026-india",
    _type: "staticGk",
  };

  try {
    console.log("📤 Uploading caArticle to Sanity...");
    await client.createOrReplace(caArticle);
    console.log("✔ Successfully created/replaced ca-international-linguistics-olympiad-2026-india");

    console.log("📤 Uploading gkArticle to Sanity...");
    await client.createOrReplace(gkArticle);
    console.log("✔ Successfully created/replaced gk-international-linguistics-olympiad-2026-india");

    console.log("✨ Successfully published International Linguistics Olympiad 2026 article in Sanity CMS!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
