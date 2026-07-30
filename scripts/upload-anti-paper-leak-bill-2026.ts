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

// Helper to convert an array of strings into separate Portable Text blocks
function createBlocks(items: string[]): any[] {
  return items.map((text, idx) => {
    const randomSuffix = Math.random().toString(36).substring(2, 9);
    if (text.startsWith("### ")) {
      return {
        _key: `block-h-${idx}-${randomSuffix}`,
        _type: "block",
        style: "h3",
        children: [
          {
            _key: `span-h-${idx}-${randomSuffix}`,
            _type: "span",
            text: text.replace("### ", ""),
          },
        ],
      };
    }
    return {
      _key: `block-${idx}-${randomSuffix}`,
      _type: "block",
      style: "normal",
      children: [
        {
          _key: `span-${idx}-${randomSuffix}`,
          _type: "span",
          text: text,
        },
      ],
    };
  });
}

// Helper to create a custom table block
function createTable(key: string, caption: string, headers: string[], rows: string[][]): any {
  return {
    _key: key,
    _type: "table",
    table: {
      caption,
      headers,
      rows,
    },
  };
}

async function main() {
  console.log("🚀 Starting upload for Anti-Paper Leak Bill 2026 Current Affairs Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    featured: path.resolve(process.cwd(), "public/images/blog/anti-paper-leak-1.png"),
    court: path.resolve(process.cwd(), "public/images/blog/anti-paper-leak-2.png"),
  };

  // Upload images to Sanity
  console.log("📸 Uploading images to Sanity...");
  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imagePaths.featured), {
    filename: "anti_paper_leak_bill_parliament.png",
  });
  const assetCourt = await client.assets.upload("image", fs.createReadStream(imagePaths.court), {
    filename: "anti_paper_leak_fast_track_court.png",
  });
  console.log(`✔ Uploaded assets. Featured: ${assetFeatured._id}, Court: ${assetCourt._id}`);

  // Construct Article Document
  const article = {
    _id: "ca-anti-paper-leak-bill-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "anti-paper-leak-bill-2026-mppsc-upsc-notes" },
    title: "लोक परीक्षा (अनुचित साधनों की रोकथाम) संशोधन विधेयक 2026 (Anti Paper Leak Bill 2026) | MPPSC & UPSC के लिए मुख्य बिंदु, सजा, जुर्माना व PDF",
    titleEn: "Anti Paper Leak Bill 2026 (Public Examinations Amendment Bill 2026): Key Provisions, Penalties & MPPSC / UPSC Notes PDF",
    excerpt: "लोकसभा से पारित लोक परीक्षा (अनुचित साधनों की रोकथाम) संशोधन विधेयक 2026 (Anti Paper Leak Bill 2026) का संपूर्ण विश्लेषण। MPPSC (पेपर-2: राजव्यवस्था व शासन) एवं UPSC के लिए 10 वर्ष तक जेल, ₹10 करोड़ जुर्माना, 2-3-5-10 रूल, 15 अपराध, फास्ट ट्रैक कोर्ट और 2 माह में जांच नियम हिंदी में पढ़ें।",
    excerptEn: "Complete study guide on Anti Paper Leak Bill 2026 (Public Examinations Prevention of Unfair Means Amendment Bill 2026) for MPPSC & UPSC exams. Covers 10-year imprisonment, ₹10 Crore penalty, 2-3-5-10 rule, fast track courts, and 2-month investigation timeline.",
    ca_date: "2026-07-30",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 9,
    keywords: [
      "anti paper leak bill",
      "anti paper leak bill 2026",
      "anti paper leak law",
      "anti paper leak amendment bill",
      "anti paper leak bill passed",
      "anti paper leak bill kya hai",
      "anti paper leak bill 2026 kya hai",
      "लोक परीक्षा अनुचित साधनों की रोकथाम संशोधन विधेयक 2026",
      "पेपर लीक बिल 2026 क्या है",
      "भारत में पेपर लीक का कानून क्या है",
      "Public Examinations Prevention of Unfair Means Amendment Bill 2026",
      "MPPSC Mains Paper 2 Governance",
      "MPPSC Anti Paper Leak Notes"
    ],
    category: { _type: "reference", _ref: "cat-polity" },
    author: { _type: "reference", _ref: "author-aakar" },
    // MPPSC Priority Rule: Put tag-mppsc before tag-upsc
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-2", "MPPSC-Paper-2", "Prelims-GS"],

    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetFeatured._id },
      alt: "Anti Paper Leak Bill 2026 Parliament Public Examinations Amendment Bill MPPSC UPSC Notes",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News / Context ────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "चर्चा में क्यों? (Context & Anti Paper Leak Bill 2026 Passed)",
        titleEn: "Context & Anti Paper Leak Bill 2026 Passed",
        body: [
          ...createBlocks([
            "हाल ही में **लोकसभा** ने **लोक परीक्षा (अनुचित साधनों की रोकथाम) संशोधन विधेयक, 2026 (Public Examinations Prevention of Unfair Means Amendment Bill, 2026)** को **ध्वनि मत (Voice Vote)** से पारित कर दिया है।",
            "• **मूल उद्देश्य**: देश की प्रतियोगी परीक्षाओं में **पेपर लीक**, **नकल**, **OMR शीट से छेड़छाड़** और **संगठित परीक्षा अपराधों (Organized Exam Syndicates)** पर प्रभावी नियंत्रण स्थापित करना तथा जांच एवं न्यायिक प्रक्रिया को अधिक तेज और सख्त बनाना है।",
            "• **सख्त कार्रवाई**: यह विधेयक दोषियों के खिलाफ **10 वर्ष तक के कारावास** तथा **₹10 करोड़ तक के जुर्माने** का कड़ा कानूनी दायरा प्रदान करता है।",
            "• **परीक्षा उपयोगिता**: यह विषय [MPPSC मुख्य परीक्षा पाठ्यक्रम](/mppsc/mains-syllabus) (द्वितीय प्रश्नपत्र - भारतीय राजव्यवस्था, लोक प्रशासन व सुशासन) तथा [MPPSC प्रारंभिक परीक्षा](/mppsc/prelims-syllabus) हेतु अत्यंत महत्वपूर्ण है।"
          ]),
          createTable(
            "table-anti-paper-leak-facts-hi",
            "लोक परीक्षा संशोधन विधेयक 2026: एक नज़र में (Quick Highlights)",
            ["पैरामीटर / विषय", "नवीनतम कानूनी प्रावधान"],
            [
              ["**विधेयक का नाम**", "**लोक परीक्षा (अनुचित साधनों की रोकथाम) संशोधन विधेयक, 2026**"],
              ["**अंग्रेजी नाम**", "**Public Examinations (Prevention of Unfair Means) Amendment Bill, 2026**"],
              ["**मूल कानून**", "**लोक परीक्षा (अनुचित साधनों की रोकथाम) अधिनियम, 2024**"],
              ["**अधिकतम सजा (पेपर लीक)**", "**10 वर्ष तक का कठोर कारावास**"],
              ["**अधिकतम जुर्माना (संगठित गिरोह)**", "**₹10 करोड़ तक का जुर्माना**"],
              ["**जांच व ट्रायल समयावधि**", "**2 माह में जांच, 3 माह में ट्रायल पूरा करने का लक्ष्य**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "The **Lok Sabha** has passed the **Public Examinations (Prevention of Unfair Means) Amendment Bill, 2026** by voice vote.",
            "• **Core Objective**: To curb paper leaks, OMR tampering, organized exam cartels, and fake admit cards in competitive public exams.",
            "• **Stringent Penalties**: Imposes up to 10 years imprisonment and ₹10 Crore fine for organized crime.",
            "• **Target Exams**: Crucial for [MPPSC Mains Paper-2](/mppsc/mains-syllabus) and UPSC GS-2 Governance."
          ]),
          createTable(
            "table-anti-paper-leak-facts-en",
            "Anti-Paper Leak Bill 2026 At a Glance",
            ["Parameter", "Details"],
            [
              ["**Bill Title**", "**Public Examinations Amendment Bill, 2026**"],
              ["**Parent Act**", "**Public Examinations Act, 2024**"],
              ["**Max Imprisonment**", "**Up to 10 Years**"],
              ["**Max Fine (Organized Crime)**", "**Up to ₹10 Crore**"],
              ["**Investigation & Trial Time**", "**2 Months Investigation, 3 Months Trial**"]
            ]
          )
        ],
      },

      /* ── 2. Background ───────────────────────────────────────── */
      {
        _key: "sec-bg",
        kind: "background",
        title: "पृष्ठभूमि: लोक परीक्षा (अनुचित साधनों की रोकथाम) अधिनियम, 2024",
        titleEn: "Background: Public Examinations Act, 2024",
        body: [
          ...createBlocks([
            "• **2024 का मूल अधिनियम**: वर्ष 2024 में संसद द्वारा **लोक परीक्षा (अनुचित साधनों की रोकथाम) अधिनियम, 2024** लागू किया गया था।",
            "• **संशोधन की आवश्यकता क्यों पड़ी?**: विभिन्न राज्यों एवं राष्ट्रीय स्तर की प्रतियोगी परीक्षाओं (जैसे NEET, UGC-NET, राज्य PSCs) में लगातार सामने आए पेपर लीक मामलों, संगठित गिरोहों के दुस्साहस तथा न्यायिक प्रक्रियाओं में होने वाली देरी को देखते हुए सरकार ने वर्ष 2026 में इसमें व्यापक संशोधन प्रस्तावित किया।",
            "• **मुख्य लक्ष्य**: जांच एजेंसियों को समयबद्ध कानूनी शक्तियां देना, विशेष **फास्ट ट्रैक कोर्ट (Fast Track Courts)** स्थापित करना तथा परीक्षार्थियों के विश्वास को पुनः बहाल करना।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "• **The 2024 Parent Act**: The Public Examinations Act was originally enacted in 2024 to deal with malpractices in public examinations.",
            "• **Need for 2026 Amendment**: Persistent paper leaks by organized examination mafias necessitated stricter timelines, specialized STFs, and fast-track courts to ensure swift justice."
          ])
        ],
      },

      /* ── 3. Major Features & Penalties ───────────────────────── */
      {
        _key: "sec-provisions",
        kind: "keyHighlights",
        title: "संशोधन विधेयक 2026 की प्रमुख विशेषताएँ एवं सजा के प्रावधान",
        titleEn: "Major Provisions & Penalties under Anti-Paper Leak Bill 2026",
        body: [
          ...createBlocks([
            "### 1. पेपर लीक पर कड़ी सजा (Strict Punishment for Paper Leaks)",
            "• **कारावास**: न्यूनतम **5 वर्ष** और अधिकतम **10 वर्ष** तक का कठोर कारावास।",
            "• **जुर्माना**: व्यक्ति या अपराधी पर **₹50 लाख तक** के जुर्माने का प्रावधान।",
            "### 2. संगठित अपराध पर कठोर कार्रवाई (Organized Crime & Syndicates)",
            "• **गिरोह या नेटवर्क**: पेपर लीक गिरोह, कोचिंग माफिया या संगठित नेटवर्क से जुड़े मामलों में न्यूनतम **7 वर्ष की जेल**।",
            "• **भारी जुर्माना**: संगठित गिरोहों पर **₹10 करोड़ तक का जुर्माना** और संपत्ति कुर्की का प्रावधान।",
            "### 3. समयबद्ध जांच (Time-bound Investigation)",
            "• **2 माह का लक्ष्य**: आपराधिक मामलों की जांच आदेश जारी होने के **2 महीने के भीतर** पूरी करने का सख्त निर्देश।",
            "### 4. समयबद्ध ट्रायल (Time-bound Trial)",
            "• **3 माह में निपटारा**: चार्जशीट दाखिल होने के **3 महीने के भीतर** मुकदमे का निपटारा करने का लक्ष्य।",
            "• **रोजाना सुनवाई**: आवश्यकता अनुसार त्वरित न्याय हेतु रोजाना (Day-to-day) सुनवाई का प्रावधान।",
            "### 5. फास्ट ट्रैक कोर्ट एवं विशेष STF (Fast Track Courts & Special STF)",
            "• राज्य सरकारें एवं केंद्र शासित प्रदेश विशेष **फास्ट ट्रैक कोर्ट** स्थापित कर सकेंगे।",
            "• आवश्यकता पड़ने पर केंद्र सरकार **विशेष टास्क फोर्स (Special Task Force - STF)** गठित कर जांच सौंप सकेगी।"
          ]),
          {
            _key: "b3-img-court",
            _type: "image",
            asset: { _type: "reference", _ref: assetCourt._id },
            alt: "Fast track court investigation deadline hourglass for Anti Paper Leak Bill 2026",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### 1. Penalties for Paper Leak",
            "• Minimum 5 years to maximum 10 years imprisonment and ₹50 Lakh fine.",
            "### 2. Organized Crime & Cartels",
            "• Minimum 7 years jail and up to ₹10 Crore fine for organized paper leak syndicates.",
            "### 3. Strict Timelines",
            "• Investigation within 2 months, Trial completion within 3 months of chargesheet filing."
          ]),
          {
            _key: "b3-img-court-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetCourt._id },
            alt: "Fast track court investigation deadline hourglass for Anti Paper Leak Bill 2026",
          }
        ],
      },

      /* ── 4. Classification of Offenses ───────────────────────── */
      {
        _key: "sec-offenses",
        kind: "keyAspects",
        title: "अपराधों का स्पष्ट वर्गीकरण एवं परीक्षा सुरक्षा मानक",
        titleEn: "Classification of 15 Offenses & Exam Security Standards",
        body: createBlocks([
          "### विधेयक में शामिल प्रमुख 15 प्रकार के अपराध",
          "विधेयक में लगभग 15 प्रकार के अपराध स्पष्ट रूप से परिभाषित किए गए हैं:",
          "• **प्रश्नपत्र लीक करना या उत्तर कुंजी समय से पूर्व उजागर करना**",
          "• **OMR शीट या कंप्यूटर नेटवर्क से छेड़छाड़ करना**",
          "• **फर्जी वेबसाइट या फर्जी एडमिट कार्ड तैयार करना**",
          "• **परीक्षा में अनुचित साधनों (Unfair Means) या इलेक्ट्रॉनिक उपकरणों का प्रयोग**",
          "• **मुन्नाभाई / फर्जी परीक्षार्थी (Impersonation) बिठाना**",
          "### परीक्षा सुरक्षा व्यवस्था मानक (Standard Operating Procedures)",
          "• **बायोमेट्रिक पंजीकरण**: अभ्यर्थियों का अनिवार्य बायोमेट्रिक सत्यापन।",
          "• **परीक्षा केंद्रों का प्री-ऑडित**: निजी व सरकारी केंद्रों का पूर्व सुरक्षा ऑडिट।",
          "• **सुरक्षित सीट आवंटन**: रैंडम सीट अलॉटमेंट और सीसीटीवी निगरानी।",
          "• **सुरक्षित प्रश्नपत्र लॉजिस्टिक्स**: जीपीएस ट्रैकिंग और डिजिटल लॉक के साथ प्रश्नपत्र सुरक्षा।"
        ]),
        bodyEn: createBlocks([
          "### 15 Expressly Defined Offenses",
          "Includes question paper leaks, OMR tampering, impersonation, fake admit cards, and unauthorized network access.",
          "### SOPs for Examination Security",
          "Mandatory biometric verification, pre-audit of test centers, GPS tracking of exam papers, and random seat allocation."
        ]),
      },



      /* ── 6. MPPSC Mains Paper-2 Exam Analysis ────────────────── */
      {
        _key: "sec-mppsc-analysis",
        kind: "keyAspects",
        title: "MPPSC मुख्य परीक्षा (द्वितीय प्रश्नपत्र) व सुशासन (Governance) विश्लेषण",
        titleEn: "MPPSC Mains Paper-2 Governance & Administrative Reforms",
        body: createBlocks([
          "### MPPSC Mains Paper-2 (Section A & B) उत्तर लेखन बिंदु",
          "• **युवाओं के अधिकारों का संरक्षण**: निष्पक्ष प्रतियोगी परीक्षाएं देश के मेधावी युवाओं को न्याय दिलाने और योग्यता-आधारित चयन सुनिश्चित करने का आधार हैं।",
          "• **प्रशासनिक सुशासन (Good Governance)**: सुदृढ़ कानून से लोक सेवा आयोगों (MPPSC, UPSC) तथा परीक्षा निकायों (NTA) की साख और जनता का विश्वास पुनर्स्थापित होता है।",
          "• **चुनौतियाँ**: त्वरित न्याय हेतु राज्यों में पर्याप्त Fast Track Courts और विशेष Forensic Experts की उपलब्धता सुनिश्चित करना। [MPPSC Notes Portal](/mppsc-notes) पर संपूर्ण सुशासन अध्ययन सामग्री उपलब्ध है।"
        ]),
        bodyEn: createBlocks([
          "### MPPSC Mains Paper-2 Answer Writing Framework",
          "• Protection of merit, restoration of institutional trust in MPPSC & UPSC, and administrative capacity building for fast-track trials."
        ]),
      },

      /* ── 7. Facts at a Glance for Quick Revision ─────────────── */
      {
        _key: "sec-interlinking-seo",
        kind: "factsAtAGlance",
        title: "🔗 क्विक रिवीजन & संबंधित MPPSC अध्ययन सामग्री (SEO Interlinking)",
        titleEn: "Quick Revision & Related MPPSC Notes (Interlinking)",
        body: createBlocks([
          "### त्वरित रिवीजन पॉइंटर्स (Quick Revision)",
          "• **2024** → मूल एंटी पेपर लीक कानून (Public Examinations Act)",
          "• **2026** → संशोधन विधेयक लोकसभा से ध्वनि मत से पारित",
          "• **सजा** → 5 वर्ष से 10 वर्ष तक कठोर कारावास",
          "• **जुर्माना** → ₹50 लाख (सामान्य) | ₹10 करोड़ तक (संगठित गिरोह)",
          "• **जांच समयावधि** → 2 माह | **ट्रायल** → 3 माह",
          "• **विशेष संस्थाएं** → Fast Track Courts एवं Special STF",
          "### संबंधित MPPSC अध्ययन सामग्री & महत्वपूर्ण लिंक्स",
          "👉 [FCRA Amendment Bill & Rules 2026: मुख्य प्रावधान व MPPSC Notes](/current-affairs/fcra-amendment-rules-2026)",
          "👉 [MPPSC Mains Syllabus 2026 (द्वितीय प्रश्नपत्र: राजव्यवस्था व शासन)](/mppsc/mains-syllabus)",
          "👉 [MPPSC Prelims Complete Syllabus & Exam Pattern](/mppsc/prelims-syllabus)",
          "👉 [MPPSC Previous Year Question Papers & Model Answers](/mppsc/previous-year-papers)",
          "👉 [आपदा प्रबंधन (संशोधन) अधिनियम 2025: मुख्य प्रावधान व MPPSC Notes](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)",
          "👉 [73वां व 74वां संविधान संशोधन अधिनियम (पंचायती राज व नगरीय निकाय)](/general-awareness/73rd-74th-constitutional-amendment-acts-panchayati-raj-mppsc-notes)",
          "👉 [भारत में महिलाओं की सुरक्षा हेतु कानून व संवैधानिक प्रावधान](/general-awareness/women-safety-laws-in-india-constitutional-provisions-mppsc-notes)",
          "👉 [MPPSC 2026-27 ऑनलाइन लाइव बैच में प्रवेश लें](/online-courses/mppsc-mains-2027-online-live-batch)"
        ]),
        bodyEn: createBlocks([
          "### Related MPPSC Notes & Links",
          "👉 [FCRA Amendment Bill 2026 Notes](/current-affairs/fcra-amendment-rules-2026)",
          "👉 [MPPSC Mains Syllabus](/mppsc/mains-syllabus)",
          "👉 [MPPSC Prelims Syllabus](/mppsc/prelims-syllabus)",
          "👉 [Disaster Management Amendment Act 2025](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)"
        ]),
      }
    ],

    /* ─── MCQs (EXACTLY 8 HIGH-QUALITY MCQs) ───────────────── */
    mcqs: [
      {
        question: "लोक परीक्षा (अनुचित साधनों की रोकथाम) संशोधन विधेयक, 2026 के अनुसार सामान्य पेपर लीक अपराध में अधिकतम कितनी सजा का प्रावधान है?",
        questionEn: "Under the Anti-Paper Leak Amendment Bill 2026, what is the maximum imprisonment for general paper leak offenses?",
        options: ["5 वर्ष", "7 वर्ष", "10 वर्ष", "आजीवन कारावास"],
        optionsEn: ["5 years", "7 years", "10 years", "Life imprisonment"],
        correctIndex: 2,
        explanation: "विधेयक के अनुसार पेपर लीक के सामान्य मामलों में दोषियों को न्यूनतम 5 वर्ष और अधिकतम 10 वर्ष तक के कठोर कारावास का प्रावधान किया गया है।",
        explanationEn: "The bill mandates a minimum of 5 years up to a maximum of 10 years rigorous imprisonment for paper leak offenses."
      },
      {
        question: "लोक परीक्षा संशोधन विधेयक 2026 के तहत संगठित परीक्षा अपराध गिरोह (Organized Crime Syndicates) पर अधिकतम कितना जुर्माना लगाया जा सकता है?",
        questionEn: "What is the maximum fine for organized paper leak syndicates under the 2026 Bill?",
        options: ["₹10 लाख", "₹50 लाख", "₹1 करोड़", "₹10 करोड़"],
        optionsEn: ["₹10 Lakh", "₹50 Lakh", "₹1 Crore", "₹10 Crore"],
        correctIndex: 3,
        explanation: "संगठित परीक्षा माफिया, गिरोहों या नेटवर्कों पर कड़ा शिकंजा कसने के लिए ₹10 करोड़ तक के जुर्माने तथा संपत्ति कुर्की का प्रावधान है।",
        explanationEn: "Organized cartels and paper leak syndicates face a fine of up to ₹10 Crore along with asset attachment."
      },
      {
        question: "विधेयक 2026 के अनुसार, पेपर लीक मामले की आपराधिक जांच (Investigation) कितने समय के भीतर पूरी करने का लक्ष्य रखा गया है?",
        questionEn: "According to the 2026 Bill, what is the target timeline to complete investigation in paper leak cases?",
        options: ["1 महीना", "2 महीने", "3 महीने", "6 महीने"],
        optionsEn: ["1 month", "2 months", "3 months", "6 months"],
        correctIndex: 1,
        explanation: "कानून के अनुसार जांच प्रक्रिया को अधिक तेज बनाने के लिए 2 महीने के भीतर जांच पूरी करने का लक्ष्य रखा गया है।",
        explanationEn: "The law sets a strict deadline of completing investigations within 2 months."
      },
      {
        question: "चार्जशीट दाखिल होने के बाद अदालत द्वारा मुकदमे (Trial) का निपटारा कितने समय के भीतर करने का प्रावधान है?",
        questionEn: "Within what timeframe must court trials be completed after chargesheet filing under the 2026 Bill?",
        options: ["2 महीने", "3 महीने", "6 महीने", "1 वर्ष"],
        optionsEn: ["2 months", "3 months", "6 months", "1 year"],
        correctIndex: 1,
        explanation: "विधेयक में चार्जशीट दाखिल होने के 3 महीने के भीतर मुकदमे का निपटारा करने हेतु रोजाना सुनवाई और फास्ट ट्रैक कोर्ट का प्रावधान है।",
        explanationEn: "Trials are targeted for completion within 3 months of chargesheet filing through fast-track courts."
      },
      {
        question: "मूल लोक परीक्षा (अनुचित साधनों की रोकथाम) अधिनियम भारत में किस वर्ष लागू किया गया था?",
        questionEn: "In which year was the parent Public Examinations (Prevention of Unfair Means) Act enacted in India?",
        options: ["2020", "2022", "2024", "2025"],
        optionsEn: ["2020", "2022", "2024", "2025"],
        correctIndex: 2,
        explanation: "मूल लोक परीक्षा अधिनियम वर्ष 2024 में लागू किया गया था, जिसे वर्ष 2026 में और अधिक सख्त बनाने हेतु संशोधित किया गया है।",
        explanationEn: "The parent Public Examinations Act was originally enacted in 2024."
      },
      {
        question: "लोक परीक्षा संशोधन विधेयक, 2026 को संसद के किस सदन से हाल ही में ध्वनि मत (Voice Vote) से पारित किया गया है?",
        questionEn: "Which house of Parliament recently passed the Public Examinations Amendment Bill 2026 by voice vote?",
        options: ["राज्यसभा", "लोकसभा", "विधान परिषद", "नीति आयोग"],
        optionsEn: ["Rajya Sabha", "Lok Sabha", "Legislative Council", "NITI Aayog"],
        correctIndex: 1,
        explanation: "यह संशोधन विधेयक लोकसभा से ध्वनि मत से पारित कर दिया गया है।",
        explanationEn: "The amendment bill was passed by voice vote in the Lok Sabha."
      },
      {
        question: "एंटी पेपर लीक कानून 2026 में याद रखने की '2-3-5-10 ट्रिक' में '5' का क्या अर्थ है?",
        questionEn: "In the '2-3-5-10' mnemonic trick for Anti-Paper Leak Bill 2026, what does '5' stand for?",
        options: ["5 महीने की जांच", "5 वर्ष न्यूनतम सजा", "5 करोड़ जुर्माना", "5 फास्ट ट्रैक कोर्ट"],
        optionsEn: ["5 months investigation", "5 years minimum sentence", "5 Crore fine", "5 fast track courts"],
        correctIndex: 1,
        explanation: "'2-3-5-10' नियम में 2=2 माह जांच, 3=3 माह ट्रायल, 5=5 वर्ष न्यूनतम सजा, 10=10 वर्ष अधिकतम सजा।",
        explanationEn: "In the 2-3-5-10 rule, 5 represents 5 years minimum imprisonment for paper leak offenses."
      },
      {
        question: "लोक परीक्षा संशोधन विधेयक 2026 में कुल कितने प्रकार के परीक्षा अपराधों का स्पष्ट वर्गीकरण किया गया है?",
        questionEn: "How many specific categories of examination offenses are clearly defined in the 2026 Amendment Bill?",
        options: ["5", "10", "15", "20"],
        optionsEn: ["5", "10", "15", "20"],
        correctIndex: 2,
        explanation: "विधेयक में लगभग 15 प्रकार के अपराधों (जैसे ओएमआर छेड़छाड़, फर्जी एडमिट कार्ड, पेपर लीक आदि) का स्पष्ट वर्गीकरण किया गया है।",
        explanationEn: "The bill explicitly categorizes approximately 15 distinct types of examination offenses."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "Anti Paper Leak Bill 2026 Kya Hai?",
        questionEn: "What is Anti Paper Leak Bill 2026?",
        answer: "लोक परीक्षा (अनुचित साधनों की रोकथाम) संशोधन विधेयक 2026 लोकसभा द्वारा पारित एक कड़ा कानून है, जिसका उद्देश्य पेपर लीक करने वालों, OMR छेड़छाड़ करने वालों और परीक्षा माफिया पर 10 वर्ष तक जेल व 10 करोड़ रुपये जुर्माने की सख्त कार्रवाई करना है।",
        answerEn: "The Anti Paper Leak Bill 2026 (Public Examinations Amendment Bill 2026) is a stringent law passed by Lok Sabha targeting paper leak syndicates with up to 10 years imprisonment and ₹10 Crore fine."
      },
      {
        question: "पेपर लीक बिल 2026 में सजा और जुर्माने का क्या प्रावधान है?",
        questionEn: "What are the penalty provisions in Anti Paper Leak Bill 2026?",
        answer: "सामान्य पेपर लीक में 5 से 10 वर्ष की जेल और ₹50 लाख जुर्माना, जबकि संगठित गिरोहों/माफिया के लिए न्यूनतम 7 वर्ष की जेल और ₹10 करोड़ तक का जुर्माना प्रावधानित है।",
        answerEn: "General paper leak carries 5-10 years jail and ₹50 Lakh fine, while organized crime cartels face minimum 7 years jail and up to ₹10 Crore fine."
      },
      {
        question: "एंटी पेपर लीक कानून में '2-3-5-10 रूल' क्या है?",
        questionEn: "What is the '2-3-5-10 rule' in Anti Paper Leak Law?",
        answer: "2-3-5-10 नियम एक शॉर्टकट ट्रिक है: 2 माह में जांच पूरी, 3 माह में ट्रायल पूरा, 5 वर्ष न्यूनतम सजा और 10 वर्ष अधिकतम सजा।",
        answerEn: "The 2-3-5-10 rule stands for: 2 months investigation, 3 months trial, 5 years minimum sentence, and 10 years maximum sentence."
      },
      {
        question: "क्या इस विधेयक में Fast Track Courts और Special STF का प्रावधान है?",
        questionEn: "Does the bill provide for Fast Track Courts and Special STF?",
        answer: "हां, मामलों की त्वरित सुनवाई हेतु राज्यों को विशेष फास्ट ट्रैक कोर्ट स्थापित करने और केंद्र सरकार द्वारा विशेष टास्क फोर्स (STF) गठित करने का वैधानिक प्रावधान है।",
        answerEn: "Yes, state governments can set up Fast Track Courts, and the Central Government can constitute a Special Task Force (STF) for investigation."
      },
      {
        question: "भारत में मूल पेपर लीक रोधी कानून किस वर्ष बना था?",
        questionEn: "In which year was the original Anti-Paper Leak Act passed in India?",
        answer: "मूल लोक परीक्षा (अनुचित साधनों की रोकथाम) अधिनियम वर्ष 2024 में पारित हुआ था, जिसे 2026 में संशोधन विधेयक द्वारा और अधिक कठोर बनाया गया है।",
        answerEn: "The parent Public Examinations (Prevention of Unfair Means) Act was passed in 2024 and amended in 2026."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Lok Sabha Debates & Bills", url: "https://sansad.in/ls" },
      { label: "Ministry of Personnel, Public Grievances and Pensions", url: "https://persmin.gov.in" },
      { label: "Press Information Bureau (PIB Factsheet)", url: "https://pib.gov.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Anti-Paper Leak Bill 2026 Article to Sanity CMS!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
