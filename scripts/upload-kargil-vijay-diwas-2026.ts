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
  console.log("🚀 Starting upload process for Kargil Vijay Diwas 2026 Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    featured: path.resolve(process.cwd(), "public/images/blog/kargil-1.png"),
    opVijay: path.resolve(process.cwd(), "public/images/blog/kargil-2.png"),
    heroes: path.resolve(process.cwd(), "public/images/blog/kargil-3.png"),
  };

  // Check if files exist
  if (
    !fs.existsSync(imagePaths.featured) ||
    !fs.existsSync(imagePaths.opVijay) ||
    !fs.existsSync(imagePaths.heroes)
  ) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Featured Memorial Image
  console.log("📸 Uploading Kargil War Memorial image...");
  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imagePaths.featured), {
    filename: "kargil_dras_memorial.png",
  });
  console.log(`✔ Uploaded Memorial image. Asset ID: ${assetFeatured._id}`);

  // 2. Upload Operation Vijay Image
  console.log("📸 Uploading Operation Vijay image...");
  const assetOpVijay = await client.assets.upload("image", fs.createReadStream(imagePaths.opVijay), {
    filename: "kargil_op_vijay.png",
  });
  console.log(`✔ Uploaded Operation Vijay image. Asset ID: ${assetOpVijay._id}`);

  // 3. Upload Heroes Victory Image
  console.log("📸 Uploading Kargil Heroes Victory image...");
  const assetHeroes = await client.assets.upload("image", fs.createReadStream(imagePaths.heroes), {
    filename: "kargil_heroes_victory.png",
  });
  console.log(`✔ Uploaded Heroes Victory image. Asset ID: ${assetHeroes._id}`);

  // 4. Construct the Article document
  const article = {
    _id: "ca-kargil-vijay-diwas-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "kargil-vijay-diwas-2026" },
    title: "कारगिल विजय दिवस 2026 (Kargil Vijay Diwas 2026): तिथि, इतिहास, थीम, महत्व, ऑपरेशन विजय | MPPSC, UPSC",
    titleEn: "Kargil Vijay Diwas 2026: Date, History, Theme, Operation Vijay & Significance | UPSC, MPPSC",
    excerpt: "कारगिल विजय दिवस 2026 प्रत्येक वर्ष 26 जुलाई को 1999 के कारगिल युद्ध में भारत की विजय की स्मृति में मनाया जाता है। वर्ष 2026 में भारत 27वाँ कारगिल विजय दिवस मनाएगा। जानिए ऑपरेशन विजय, ऑपरेशन सफेद सागर, परमवीर चक्र विजेताओं और परीक्षा उपयोगी बिंदु।",
    excerptEn: "Kargil Vijay Diwas is observed annually on July 26 to commemorate India's victory in the 1999 Kargil War. India observes the 27th anniversary in 2026. Read about Operation Vijay, Operation Safed Sagar, PVC heroes, and key exam insights.",
    ca_date: "2026-07-26",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 7,
    keywords: [
      "Kargil Vijay Diwas 2026",
      "कारगिल विजय दिवस 2026",
      "Operation Vijay 1999",
      "Operation Safed Sagar",
      "Operation Talwar Navy",
      "Captain Vikram Batra PVC",
      "Kargil War Memorial Dras",
      "Tiger Hill Tololing",
      "Param Vir Chakra Winners Kargil",
      "UPSC Defense Current Affairs",
      "MPPSC Current Affairs 26 July"
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // Polity & Security
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
      { _type: "reference", _ref: "tag-important-days" },
    ],
    syllabus: ["GS-3", "Security Forces", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetFeatured._id },
      alt: "Kargil War Memorial at Dras Ladakh with Indian national flag fluttering against snowy Himalayan peaks Tololing and Tiger Hill",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Context & Why in News ────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "चर्चा में क्यों? (Why in News?)",
        titleEn: "Context & Why in News?",
        body: [
          ...createBlocks([
            "**कारगिल विजय दिवस 2026 (Kargil Vijay Diwas 2026)** प्रत्येक वर्ष **26 जुलाई** को भारत की **1999 के कारगिल युद्ध** में ऐतिहासिक विजय की स्मृति में मनाया जाता है। वर्ष **2026** में यह **27वाँ कारगिल विजय दिवस** होगा। यह दिवस **भारतीय सशस्त्र बलों** के अदम्य साहस, सर्वोच्च बलिदान और राष्ट्रभक्ति को समर्पित है।",
            "### मुख्य हाइलाइट्स",
            "• **26 जुलाई 2026**: भारत **27वाँ कारगिल विजय दिवस** मनाएगा।",
            "• **ऑपरेशन विजय**: **1999** में भारतीय सेना ने ऑपरेशन विजय के माध्यम से कारगिल की ऊँची चोटियों को पाकिस्तान समर्थित घुसपैठियों से मुक्त कराया था।",
            "• **राष्ट्रीय आयोजन**: देशभर में शहीद सैनिकों को श्रद्धांजलि, द्रास स्थित कारगिल वार मेमोरियल पर मुख्य स्मृति समारोह और राष्ट्रभक्ति कार्यक्रम आयोजित किए जाएंगे।"
          ]),
          createTable(
            "table-kargil-facts-hi",
            "त्वरित तथ्य (Quick Facts)",
            ["विवरण", "जानकारी"],
            [
              ["**दिवस**", "**कारगिल विजय दिवस**"],
              ["**तिथि**", "**26 जुलाई 2026**"],
              ["**वर्ष/वर्षगांठ**", "**27वाँ**"],
              ["**युद्ध**", "**कारगिल युद्ध, 1999**"],
              ["**प्रमुख थलसेना अभियान**", "**ऑपरेशन विजय**"],
              ["**वायुसेना अभियान**", "**ऑपरेशन सफेद सागर**"],
              ["**मुख्य स्मारक**", "**कारगिल वार मेमोरियल, द्रास (लद्दाख)**"],
              ["**उद्देश्य**", "**शहीद सैनिकों के साहस एवं बलिदान को नमन**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "**Kargil Vijay Diwas 2026** is commemorated every year on **July 26** to mark India's historic victory in the **1999 Kargil War**. The year **2026** marks the **27th Kargil Vijay Diwas**. This solemn occasion is dedicated to honoring the extraordinary courage, supreme sacrifices, and unyielding patriotism of the **Indian Armed Forces**.",
            "### Key Highlights",
            "• **26 July 2026**: India observes the **27th Kargil Vijay Diwas**.",
            "• **Operation Vijay**: In **1999**, the Indian Army successfully launched Operation Vijay to evict Pakistani intruders from the strategic icy heights of Kargil.",
            "• **National Tributes**: Wreath-laying ceremonies at the Kargil War Memorial in Dras, Ladakh, along with nationwide tribute programs."
          ]),
          createTable(
            "table-kargil-facts-en",
            "Quick Facts at a Glance",
            ["Parameter", "Details"],
            [
              ["**Occasion**", "**Kargil Vijay Diwas**"],
              ["**Date**", "**26 July 2026**"],
              ["**Anniversary**", "**27th Anniversary**"],
              ["**War Period**", "**Kargil War, May-July 1999**"],
              ["**Army Operation**", "**Operation Vijay**"],
              ["**Air Force Operation**", "**Operation Safed Sagar**"],
              ["**Main Memorial**", "**Kargil War Memorial, Dras (Ladakh)**"],
              ["**Core Objective**", "**Honoring fallen heroes & celebrating military victory**"]
            ]
          )
        ],
      },

      /* ── 2. Theme & War Background ────────────────────────────── */
      {
        _key: "sec-theme-background",
        kind: "background",
        title: "थीम एवं कारगिल युद्ध (1999) की पृष्ठभूमि",
        titleEn: "Theme & Background of 1999 Kargil War",
        body: [
          ...createBlocks([
            "### क्या 2026 की कोई आधिकारिक थीम घोषित हुई है?",
            "• **आधिकारिक थीम**: कारगिल विजय दिवस की सामान्यतः कोई औपचारिक वार्षिक थीम घोषित नहीं की जाती।",
            "### वर्ष 2026 का मुख्य फोकस",
            "• **कारगिल के वीरों को श्रद्धांजलि**: मातृभूमि की रक्षा में प्राण न्योछावर करने वाले 527 शहीदों को नमन।",
            "• **राष्ट्रभक्ति एवं राष्ट्रीय एकता**: राष्ट्रीय अखंडता का संदेश फैलाना।",
            "• **युवाओं में सैन्य प्रेरणा**: सैन्य बलों में भर्ती एवं राष्ट्र सेवा हेतु युवाओं को प्रेरित करना।",
            "• **शहीद परिवारों का सम्मान**: वीरांगनाओं एवं शहीद परिवारों के कल्याण हेतु प्रतिबद्धता।",
            "### कारगिल युद्ध (1999) क्या था?",
            "• **कारगिल युद्ध**: भारत और पाकिस्तान के बीच **मई से जुलाई 1999** तक लद्दाख के कारगिल जिले में लड़ा गया एक सीमित युद्ध था।",
            "• **पाकिस्तानी घुसपैठ**: पाकिस्तानी सैनिकों एवं सशस्त्र आतंकवादियों ने **LoC (Line of Control)** पार कर **कारगिल, द्रास, बटालिक और टोलोलिंग** क्षेत्र की रणनीतिक ऊँची चोटियों पर अवैध कब्जा कर लिया था।",
            "• **ऑपरेशन विजय**: भारतीय सेना ने **ऑपरेशन विजय** चलाकर अत्यंत कठिन परिस्थितियों में दुश्मन को खदेड़ा और सभी चोटियों पर पुनः तिरंगा फहराया।",
            "• **विजय दिवस की घोषणा**: **26 जुलाई 1999** को भारतीय सेना ने कारगिल युद्ध में पूर्ण विजय की आधिकारिक घोषणा की थी।"
          ]),
          {
            _key: "b2-img-op-vijay",
            _type: "image",
            asset: { _type: "reference", _ref: assetOpVijay._id },
            alt: "Indian Air Force fighter jet flying over Kargil mountain peaks during Operation Safed Sagar and Indian Army troops on high ridge",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Theme for Kargil Vijay Diwas 2026",
            "• **Official Theme**: Kargil Vijay Diwas generally does not carry an officially designated theme by the Ministry of Defence.",
            "### Core Focus for 2026 Celebrations",
            "• **Homage to Kargil Heroes**: Remembering the supreme sacrifice of 527 Indian soldiers.",
            "• **Patriotism & Unity**: Fostering national integration and military readiness.",
            "• **Youth Inspiration**: Encouraging youth participation in military service.",
            "• **Honor to Martyr Families**: Supporting Veer Naris and families of fallen heroes.",
            "### What was the Kargil War (1999)?",
            "• **Kargil Conflict**: An armed conflict between India and Pakistan fought between **May and July 1999** in the high-altitude Kargil district of Ladakh.",
            "• **Pakistani Infiltration**: Pakistani regular troops and paramilitary infiltrators crossed the **Line of Control (LoC)** to covertly occupy winter-vacated Indian posts at **Kargil, Dras, Batalik, and Tololing**.",
            "• **Operation Vijay**: The Indian Army launched **Operation Vijay** to reclaim occupied heights under extreme weather and terrain conditions.",
            "• **Declaration of Victory**: On **26 July 1999**, the Indian Armed Forces successfully cleared all occupied posts, declaring absolute victory."
          ]),
          {
            _key: "b2-img-op-vijay-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetOpVijay._id },
            alt: "Indian Air Force fighter jet flying over Kargil mountain peaks during Operation Safed Sagar and Indian Army troops on high ridge",
          }
        ],
      },

      /* ── 3. Causes & Military Operations ──────────────────────────── */
      {
        _key: "sec-causes-operations",
        kind: "keyHighlights",
        title: "कारगिल युद्ध के कारण एवं प्रमुख सैन्य ऑपरेशन",
        titleEn: "Causes of War & Key Military Operations",
        body: [
          ...createBlocks([
            "### कारगिल युद्ध के प्रमुख कारण",
            "• **1. पाकिस्तान की घुसपैठ**: LoC पार कर भारतीय क्षेत्र की रणनीतिक चोटियों पर गुप्त कब्जा करना।",
            "• **2. कश्मीर विवाद**: भारत और पाकिस्तान के बीच लंबे समय से जारी सीमा तनाव।",
            "• **3. राष्ट्रीय राजमार्ग NH-1 पर नियंत्रण**: पाकिस्तान का मुख्य उद्देश्य **श्रीनगर–लेह मार्ग (NH-1)** पर गोलाबारी कर लद्दाख और सियाचिन को भारत से काटना था।",
            "• **4. लाहौर घोषणा (1999) की विफलता**: फरवरी 1999 में शांति समझौते पर हस्ताक्षर के बावजूद पाकिस्तान द्वारा पीठ में छुरा घोंपना।",
            "• **5. 1998 के परमाणु परीक्षण**: मई 1998 में दोनों देशों द्वारा परमाणु परीक्षणों के बाद बढा तनाव।",
            "### ऑपरेशन विजय (Operation Vijay)",
            "• **प्रारंभ**: भारतीय सेना द्वारा **26 मई 1999** को शुरू किया गया मुख्य सैन्य अभियान।",
            "• **मुख्य उद्देश्य**: घुसपैठियों को खदेड़ना, LoC की सुरक्षा और भारतीय क्षेत्र पर पूर्ण नियंत्रण स्थापित करना।",
            "### ऑपरेशन सफेद सागर (Operation Safed Sagar)",
            "• **संबंधित सेना**: **भारतीय वायुसेना (IAF)** का ऐतिहासिक हवाई अभियान।",
            "• **उच्च हिमालयी क्षेत्रों में हवाई हमले**: 20,000 फीट से अधिक की ऊँचाई पर जेट लड़ाकू विमानों (मिराज-2000, मिग-21, मिग-27) द्वारा सटीक बमबारी।",
            "• **विशेष उपलब्धि**: सैन्य इतिहास में पहली बार इतनी अत्यधिक ऊँचाई और कठिन भू-भाग में सघन वायु अभियान चलाया गया।",
            "### युद्ध के प्रमुख क्षेत्र (Key Battlefields)",
            "• **टाइगर हिल (Tiger Hill)**",
            "• **टोलोलिंग (Tololing)**",
            "• **पॉइंट 4875 (बत्रा टॉप)**",
            "• **द्रास (Dras)**",
            "• **बटालिक (Batalik)**",
            "• **मुश्कोह घाटी (Mushkoh Valley)**"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Major Causes of the Kargil Conflict",
            "• **1. Infiltration across LoC**: Covert occupation of vacant high-altitude Indian posts across the Line of Control.",
            "• **2. Kashmir Dispute**: Escalation of long-standing border disputes.",
            "• **3. Threat to National Highway NH-1**: Pakistan aimed to interdict the **Srinagar-Leh Highway (NH-1)** to sever Ladakh and Siachen from Kashmir.",
            "• **4. Breach of Lahore Declaration (1999)**: Violation of the peace agreement signed in February 1999.",
            "• **5. Post-1998 Nuclear Dynamics**: Heightened deterrence after the 1998 nuclear tests.",
            "### Operation Vijay (Indian Army)",
            "• **Launch**: Launched officially on **May 26, 1999**.",
            "• **Objective**: Evict Pakistani intruders, restore sanctity of the LoC, and reclaim Indian territory.",
            "### Operation Safed Sagar (Indian Air Force)",
            "• **Air Force Role**: The IAF executed precision strikes using Mirage-2000, MiG-21, and MiG-27 aircraft at altitudes over 20,000 feet.",
            "• **Milestone**: The first high-altitude close air support mission executed at such extreme elevation in military history.",
            "### Major Battlefields",
            "• **Tiger Hill**",
            "• **Tololing**",
            "• **Point 4875 (Batra Top)**",
            "• **Dras Sector**",
            "• **Batalik Sector**",
            "• **Mushkoh Valley**"
          ])
        ],
      },

      /* ── 4. War Heroes & Tri-Service Operations Table ─────────────── */
      {
        _key: "sec-heroes-tri-services",
        kind: "analysis",
        title: "कारगिल युद्ध के प्रमुख वीर एवं त्रि-सेवा ऑपरेशन",
        titleEn: "Kargil War Heroes & Tri-Service Military Operations",
        body: [
          ...createBlocks([
            "### कारगिल युद्ध के प्रमुख वीर (Param Vir Chakra Awardees)",
            "कारगिल युद्ध में अदम्य साहस के लिए 4 शूरवीरों को भारत का सर्वोच्च सैन्य सम्मान **परमवीर चक्र (PVC)** प्रदान किया गया:",
            "• **कैप्टन विक्रम बत्रा (PVC)**: 13 जैक राइफल्स — मरणोपरांत (पॉइंट 5140 और 4875 पर विजय, प्रसिद्ध नारा: *'यह दिल माँगे मोर!'*)।",
            "• **लेफ्टिनेंट मनोज कुमार पांडेय (PVC)**: 1/11 गोरखा राइफल्स — मरणोपरांत (खालूबार की लड़ाई)।",
            "• **ग्रेनेडियर (अब सुबेदार मेजर) योगेंद्र सिंह यादव (PVC)**: 18 ग्रेनेडियर्स (टाइगर हिल पर कब्जा)।",
            "• **राइफलमैन (अब सुबेदार) संजय कुमार (PVC)**: 13 जैक राइफल्स (फ्लैट टॉप पर कब्जा)।",
            "### महत्वपूर्ण सैन्य ऑपरेशन तालिका"
          ]),
          createTable(
            "table-kargil-tri-service-hi",
            "कारगिल युद्ध के प्रमुख त्रि-सेवा सैन्य ऑपरेशन (Tri-Service Operations)",
            ["अभियान का नाम (Operation)", "सशस्त्र बल (Armed Force)", "भूमिका एवं विवरण"],
            [
              ["**ऑपरेशन विजय**", "**भारतीय थलसेना (Indian Army)**", "**कारगिल की ऊँची चोटियों से घुसपैठियों को खदेड़ने का मुख्य स्थल अभियान**"],
              ["**ऑपरेशन सफेद सागर**", "**भारतीय वायुसेना (IAF)**", "**उच्च हिमालयी क्षेत्रों में सटीक हवाई हमले और टोही मिशन**"],
              ["**ऑपरेशन तलवार**", "**भारतीय नौसेना (Indian Navy)**", "**उत्तरी अरब सागर में आक्रामक गश्त कर पाकिस्तान के समुद्री मार्गों की नाकेबंदी**"]
            ]
          ),
          {
            _key: "b4-img-heroes",
            _type: "image",
            asset: { _type: "reference", _ref: assetHeroes._id },
            alt: "Brave Indian soldiers hoisting the national tricolor flag on top of Tiger Hill mountain peak in Kargil",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Kargil War Heroes (Param Vir Chakra Recipients)",
            "Four bravehearts were awarded India's highest wartime gallantry award, the **Param Vir Chakra (PVC)**:",
            "• **Captain Vikram Batra (PVC)**: 13 JAK Rifles (Posthumous) — Iconic hero of Point 5140 & Point 4875 (*'Yeh Dil Maange More!'*).",
            "• **Lieutenant Manoj Kumar Pandey (PVC)**: 1/11 Gorkha Rifles (Posthumous) — Hero of Khalubar Peak.",
            "• **Grenadier (now Subedar Major) Yogendra Singh Yadav (PVC)**: 18 Grenadiers — Hero of Tiger Hill assault.",
            "• **Rifleman (now Subedar) Sanjay Kumar (PVC)**: 13 JAK Rifles — Hero of Flat Top capture.",
            "### Tri-Service Operations Table"
          ]),
          createTable(
            "table-kargil-tri-service-en",
            "Kargil War Tri-Service Military Operations",
            ["Operation Name", "Armed Force", "Role & Description"],
            [
              ["**Operation Vijay**", "**Indian Army**", "**Main ground assault to reclaim high-altitude posts**"],
              ["**Operation Safed Sagar**", "**Indian Air Force**", "**High-altitude precision air strikes & tactical reconnaissance**"],
              ["**Operation Talwar**", "**Indian Navy**", "**Blockade of Pakistani sea routes in the Arabian Sea**"]
            ]
          ),
          {
            _key: "b4-img-heroes-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetHeroes._id },
            alt: "Brave Indian soldiers hoisting the national tricolor flag on top of Tiger Hill mountain peak in Kargil",
          }
        ],
      },

      /* ── 5. Significance & War Memorial ───────────────────────────── */
      {
        _key: "sec-significance-memorial",
        kind: "arguments",
        title: "कारगिल विजय दिवस का महत्व एवं कारगिल वार मेमोरियल",
        titleEn: "Significance of Vijay Diwas & Kargil War Memorial",
        body: [
          ...createBlocks([
            "### कारगिल विजय दिवस का महत्व",
            "• **शहीदों को श्रद्धांजलि**: देश के लिए सर्वोच्च बलिदान देने वाले 527 वीर सैनिकों को कृतज्ञ राष्ट्र का नमन।",
            "• **राष्ट्रीय एकता एवं अखंडता**: भारत की संप्रभुता और सीमा सुरक्षा का सशक्त संदेश।",
            "• **युवाओं को प्रेरणा**: भावी पीढ़ियों में देश सेवा और राष्ट्रभक्ति की प्रेरणा।",
            "• **सैन्य इतिहास का संरक्षण**: कठिनतम युद्ध स्थितियों में भारतीय सेना की रणनीति और वीरता का सम्मान।",
            "• **राष्ट्रीय सुरक्षा जागरूकता**: सीमाओं की सुरक्षा और त्रि-सेवा समन्वय का महत्व।",
            "### कारगिल वार मेमोरियल (Kargil War Memorial)",
            "• **स्थान**: **द्रास (Dras), लद्दाख** — NH-1 पर स्थित।",
            "• **संचालन**: भारतीय सेना।",
            "• **विशेषताएँ**: मेमोरियल में गुलाबी बलुआ पत्थर की दीवार पर कारगिल युद्ध में शहीद हुए सभी 527 सैनिकों के नाम स्वर्ण अक्षरों में उत्कीर्ण हैं। इसके सामने विशाल राष्ट्रीय ध्वज और पीछे अमर जवान ज्योति प्रज्वलित रहती है।",
            "### LoC क्या है?",
            "• **LoC (Line of Control)**: भारत और पाकिस्तान के बीच जम्मू-कश्मीर में 1972 के शिमला समझौते के तहत निर्धारित वास्तविक सैन्य नियंत्रण रेखा।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Significance of Kargil Vijay Diwas",
            "• **Paying Homage to Martyrs**: Honoring 527 soldiers who laid down their lives for the nation.",
            "• **National Unity & Sovereignty**: Affirming India's territorial integrity and border security resolve.",
            "• **Youth Inspiration**: Instilling values of patriotism and national service in future generations.",
            "• **Preserving Military History**: Commemorating one of the most arduous high-altitude battles ever fought.",
            "• **National Security Awareness**: Reinforcing the vital importance of border readiness and tri-service synergy.",
            "### Kargil War Memorial, Dras",
            "• **Location**: Situated at **Dras, Ladakh** along National Highway 1 (NH-1).",
            "• **Maintained By**: Indian Army.",
            "• **Features**: The memorial wall bears the names of all 527 fallen soldiers carved in gold letters on pink sandstone, flanked by the national flag and the eternal flame (Amar Jawan Jyoti).",
            "### What is the Line of Control (LoC)?",
            "• **Line of Control (LoC)**: The military control line dividing Indian and Pakistani controlled territories in J&K, established under the 1972 Simla Agreement."
          ])
        ],
      },

      /* ── 6. Exam Point of View & Quick Revision ───────────────────── */
      {
        _key: "sec-exam-pov",
        kind: "examPerspective",
        title: "Exam Point of View & Quick Revision",
        titleEn: "Exam Point of View & Quick Revision",
        body: [
          ...createBlocks([
            "### परीक्षा हेतु महत्वपूर्ण तथ्य (Exam Essentials)",
            "• **पहली बार**: कारगिल युद्ध पूर्णतः अत्यधिक ऊँचाई (High Altitude) वाले क्षेत्रों में लड़ा गया।",
            "• **युद्ध अवधि**: **मई 1999 – 26 जुलाई 1999**",
            "• **विजय दिवस**: **26 जुलाई** (वार्षिक आयोजन)",
            "• **युद्ध क्षेत्र**: **कारगिल, द्रास, बटालिक, टोलोलिंग (लद्दाख)**",
            "• **पहला विजय दिवस आयोजन**: वर्ष **2000** में शुरू।",
            "### Full Forms",
            "• **LoC**: **Line of Control (नियंत्रण रेखा)**",
            "• **PVC**: **Param Vir Chakra (परमवीर चक्र)**",
            "• **IAF**: **Indian Air Force (भारतीय वायुसेना)**",
            "• **NH-1**: **National Highway-1 (पूर्ववर्ती NH-1D, श्रीनगर-लेह मार्ग)**",
            "### Prelims Quick Revision",
            "• **कारगिल विजय दिवस** → **26 जुलाई**",
            "• **वर्ष 2026** → **27वाँ कारगिल विजय दिवस**",
            "• **थलसेना अभियान** → **ऑपरेशन विजय**",
            "• **वायुसेना अभियान** → **ऑपरेशन सफेद सागर**",
            "• **नौसेना अभियान** → **ऑपरेशन तलवार**",
            "• **मुख्य स्मारक** → **द्रास (लद्दाख)**",
            "• **सर्वोच्च वीरता सम्मान** → **परमवीर चक्र (PVC)**",
            "• **प्रमुख युद्ध क्षेत्र** → **टाइगर हिल, टोलोलिंग, पॉइंट 4875 (बत्रा टॉप)**",
            "### UPSC/MPPSC Mains Value Addition",
            "• **मुख्य निष्कर्ष**: कारगिल विजय दिवस केवल भारत की सैन्य विजय का प्रतीक नहीं है, बल्कि यह **राष्ट्रीय एकता**, **सैनिकों के सर्वोच्च बलिदान**, **सीमा सुरक्षा** और **राष्ट्रभक्ति** की भावना का जीवंत प्रतीक है। यह दिवस हमें राष्ट्रीय सुरक्षा के प्रति सजग रहने तथा भारतीय सशस्त्र बलों के योगदान का सम्मान करने की प्रेरणा देता है।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Exam Essentials (Key Takeaways)",
            "• **First Time**: Kargil War was fought entirely in extreme high-altitude mountain terrain.",
            "• **War Timeline**: **May 1999 – 26 July 1999**.",
            "• **Vijay Diwas Date**: **26 July** (Annual event).",
            "• **Battle Sectors**: **Kargil, Dras, Batalik, Tololing (Ladakh)**.",
            "• **First Commemoration**: Started in year **2000**.",
            "### Full Forms",
            "• **LoC**: **Line of Control**",
            "• **PVC**: **Param Vir Chakra**",
            "• **IAF**: **Indian Air Force**",
            "• **NH-1**: **National Highway-1 (Srinagar-Leh Highway)**",
            "### Prelims Quick Revision",
            "• **Kargil Vijay Diwas** → **26 July**",
            "• **2026 Anniversary** → **27th Anniversary**",
            "• **Army Operation** → **Operation Vijay**",
            "• **Air Force Operation** → **Operation Safed Sagar**",
            "• **Navy Operation** → **Operation Talwar**",
            "• **Memorial Location** → **Dras (Ladakh)**",
            "• **Highest Gallantry Award** → **Param Vir Chakra (PVC)**",
            "### Mains Value Addition",
            "• **Core Philosophy**: Kargil Vijay Diwas represents more than a strategic military victory; it stands as a testament to national integration, high-altitude joint warfare capabilities, border vigilance, and supreme patriotism."
          ])
        ],
      }
    ],

    /* ─── MCQS (EXACTLY 8 HIGH QUALITY MCQs) ───────────────────── */
    mcqs: [
      {
        question: "कारगिल युद्ध (1999) के दौरान भारतीय वायुसेना द्वारा चलाए गए अभियान का नाम क्या था?",
        questionEn: "What was the operational code name of the airstrikes conducted by the Indian Air Force during the 1999 Kargil War?",
        options: ["ऑपरेशन मेघदूत", "ऑपरेशन कैक्टस", "ऑपरेशन सफेद सागर", "ऑपरेशन त्रिशूल"],
        optionsEn: ["Operation Meghdoot", "Operation Cactus", "Operation Safed Sagar", "Operation Trishul"],
        correctIndex: 2,
        explanation: "ऑपरेशन सफेद सागर (Operation Safed Sagar) कारगिल युद्ध के दौरान भारतीय वायुसेना द्वारा संचालित हवाई अभियान था।",
        explanationEn: "Operation Safed Sagar was the operational code name assigned to the Indian Air Force's air strikes during the Kargil War in 1999."
      },
      {
        question: "वर्ष 2026 में भारत कौन-सा कारगिल विजय दिवस मनाएगा?",
        questionEn: "Which anniversary of Kargil Vijay Diwas will India observe in 2026?",
        options: ["25वाँ", "26वाँ", "27वाँ", "30वाँ"],
        optionsEn: ["25th", "26th", "27th", "30th"],
        correctIndex: 2,
        explanation: "वर्ष 1999 के कारगिल युद्ध में विजय की स्मृति में वर्ष 2026 में भारत 27वाँ कारगिल विजय दिवस मनाएगा।",
        explanationEn: "India observes the 27th anniversary of Kargil Vijay Diwas in 2026, commemorating victory in the 1999 war."
      },
      {
        question: "1999 के कारगिल युद्ध के दौरान भारतीय थलसेना द्वारा चलाए गए मुख्य सैन्य अभियान का नाम क्या था?",
        questionEn: "What was the code name of the main military operation launched by the Indian Army during the 1999 Kargil War?",
        options: ["ऑपरेशन विजय", "ऑपरेशन पराक्रम", "ऑपरेशन मेघदूत", "ऑपरेशन कैक्टस"],
        optionsEn: ["Operation Vijay", "Operation Parakram", "Operation Meghdoot", "Operation Cactus"],
        correctIndex: 0,
        explanation: "भारतीय थलसेना ने घुसपैठियों को खदेड़ने और कारगिल की ऊँची चोटियों पर पुनः कब्जा करने के लिए 'ऑपरेशन विजय' चलाया था।",
        explanationEn: "The Indian Army launched Operation Vijay to reclaim occupied mountain posts across Kargil."
      },
      {
        question: "कारगिल वार मेमोरियल (Kargil War Memorial) भारत के किस स्थान पर स्थित है?",
        questionEn: "Where is the Kargil War Memorial located?",
        options: ["श्रीनगर (जम्मू और कश्मीर)", "द्रास (लद्दाख)", "शिमला (हिमाचल प्रदेश)", "देहरादून (उत्तराखंड)"],
        optionsEn: ["Srinagar (J&K)", "Dras (Ladakh)", "Shimla (Himachal Pradesh)", "Dehradun (Uttarakhand)"],
        correctIndex: 1,
        explanation: "प्रसिद्ध कारगिल वार मेमोरियल लद्दाख के द्रास (Dras) क्षेत्र में राष्ट्रीय राजमार्ग 1 (NH-1) पर स्थित है।",
        explanationEn: "The official Kargil War Memorial is situated at Dras in Ladakh along National Highway 1."
      },
      {
        question: "'यह दिल माँगे मोर!' किस कारगिल युद्ध नायक एवं परमवीर चक्र (PVC) विजेता का प्रसिद्ध विजय उद्घोष था?",
        questionEn: "'Yeh Dil Maange More!' was the iconic victory slogan of which Kargil War hero and PVC recipient?",
        options: ["कैप्टन विक्रम बत्रा", "लेफ्टिनेंट मनोज कुमार पांडेय", "ग्रेनेडियर योगेंद्र सिंह यादव", "राइफलमैन संजय कुमार"],
        optionsEn: ["Captain Vikram Batra", "Lieutenant Manoj Kumar Pandey", "Grenadier Yogendra Singh Yadav", "Rifleman Sanjay Kumar"],
        correctIndex: 0,
        explanation: "13 जैक राइफल्स के कैप्टन विक्रम बत्रा (मरणोपरांत PVC) ने पॉइंट 5140 और 4875 पर विजय के बाद 'यह दिल माँगे मोर!' का उद्घोष किया था।",
        explanationEn: "Captain Vikram Batra of 13 JAK Rifles famously used the slogan 'Yeh Dil Maange More!' after capturing Point 5140."
      },
      {
        question: "कारगिल युद्ध (1999) के दौरान भारतीय नौसेना द्वारा अरब सागर में पाकिस्तान के समुद्री मार्गों की नाकेबंदी हेतु कौन-सा ऑपरेशन शुरू किया गया था?",
        questionEn: "Which operational deployment was initiated by the Indian Navy in the Arabian Sea during the 1999 Kargil conflict?",
        options: ["ऑपरेशन तलवार", "ऑपरेशन समुद्र सेतु", "ऑपरेशन कैक्टस", "ऑपरेशन वरुण"],
        optionsEn: ["Operation Talwar", "Operation Samudra Setu", "Operation Cactus", "Operation Varuna"],
        correctIndex: 0,
        explanation: "कारगिल युद्ध के दौरान भारतीय नौसेना ने उत्तरी अरब सागर में 'ऑपरेशन तलवार' के तहत आक्रामक गश्त कर पाकिस्तान के नौसैनिक मार्गों को अवरुद्ध कर दिया था।",
        explanationEn: "The Indian Navy launched Operation Talwar in the Arabian Sea to blockade Pakistani sea trade routes during the conflict."
      },
      {
        question: "भारत और पाकिस्तान के बीच जम्मू-कश्मीर क्षेत्र में वास्तविक सैन्य नियंत्रण रेखा को किस नाम से जाना जाता है?",
        questionEn: "What is the official demarcation line separating Indian and Pakistani controlled parts of Jammu and Kashmir known as?",
        options: ["मैकमोहन रेखा", "रेडक्लिफ रेखा", "नियंत्रण रेखा (LoC)", "शून्य रेखा"],
        optionsEn: ["McMahon Line", "Radcliffe Line", "Line of Control (LoC)", "Zero Line"],
        correctIndex: 2,
        explanation: "भारत और पाकिस्तान के बीच जम्मू-कश्मीर में वास्तविक सैन्य नियंत्रण रेखा को LoC (Line of Control) कहा जाता है, जो 1972 के शिमला समझौते के तहत निर्धारित हुई थी।",
        explanationEn: "The military line of control separating Jammu & Kashmir between India and Pakistan is designated as the Line of Control (LoC)."
      },
      {
        question: "कारगिल युद्ध में अभूतपूर्व वीरता के लिए कुल कितने भारतीय सैनिकों को सर्वोच्च सैन्य सम्मान 'परमवीर चक्र' (PVC) से सम्मानित किया गया था?",
        questionEn: "How many Indian soldiers were awarded the Param Vir Chakra (PVC) for extraordinary valor in the Kargil War?",
        options: ["2", "4", "7", "10"],
        optionsEn: ["2", "4", "7", "10"],
        correctIndex: 1,
        explanation: "कारगिल युद्ध के लिए 4 वीरों को परमवीर चक्र प्रदान किया गया — कैप्टन विक्रम बत्रा (मरणोपरांत), लेफ्टिनेंट मनोज कुमार पांडेय (मरणोपरांत), सुबेदार मेजर योगेंद्र सिंह यादव और सुबेदार संजय कुमार।",
        explanationEn: "Four soldiers were awarded the Param Vir Chakra for the Kargil War: Capt. Vikram Batra, Lt. Manoj Kumar Pandey, Grenadier Yogendra Singh Yadav, and Rifleman Sanjay Kumar."
      }
    ],

    /* ─── FAQS ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "कारगिल विजय दिवस कब मनाया जाता है और 2026 में कौन-सी वर्षगांठ है?",
        questionEn: "When is Kargil Vijay Diwas observed and which anniversary is in 2026?",
        answer: "कारगिल विजय दिवस प्रत्येक वर्ष 26 जुलाई को मनाया जाता है। वर्ष 2026 में 1999 के कारगिल युद्ध में भारत की विजय की 27वीं वर्षगांठ है।",
        answerEn: "Kargil Vijay Diwas is observed annually on July 26. The year 2026 marks the 27th anniversary of India's victory in the 1999 Kargil War."
      },
      {
        question: "क्या वर्ष 2026 के लिए कारगिल विजय दिवस की कोई आधिकारिक थीम घोषित की गई है?",
        questionEn: "Is there an official theme for Kargil Vijay Diwas 2026?",
        answer: "नहीं, कारगिल विजय दिवस की सामान्यतः रक्षा मंत्रालय द्वारा कोई औपचारिक वार्षिक थीम घोषित नहीं की जाती। इसका मुख्य ध्यान शहीदों को श्रद्धांजलि और राष्ट्रभक्ति पर केंद्रित रहता है।",
        answerEn: "No official theme is formally released for Kargil Vijay Diwas. The core focus remains honoring fallen heroes and celebrating patriotism."
      },
      {
        question: "कारगिल युद्ध में भारतीय सशस्त्र बलों के प्रमुख ऑपरेशनों के नाम क्या थे?",
        questionEn: "What were the code names of the major military operations in the Kargil War?",
        answer: "भारतीय थलसेना का मुख्य अभियान 'ऑपरेशन विजय' था, भारतीय वायुसेना का हवाई अभियान 'ऑपरेशन सफेद सागर' था, और भारतीय नौसेना की नाकेबंदी गश्त 'ऑपरेशन तलवार' थी।",
        answerEn: "The Indian Army executed 'Operation Vijay', the Indian Air Force executed 'Operation Safed Sagar', and the Indian Navy executed 'Operation Talwar'."
      },
      {
        question: "कारगिल वार मेमोरियल कहाँ स्थित है?",
        questionEn: "Where is the Kargil War Memorial located?",
        answer: "कारगिल वार मेमोरियल लद्दाख के द्रास (Dras) क्षेत्र में राष्ट्रीय राजमार्ग 1 (NH-1) पर स्थित है। यहाँ 527 शहीद सैनिकों के नाम अंकित हैं।",
        answerEn: "The Kargil War Memorial is located at Dras in Ladakh along National Highway 1 (NH-1), honoring all 527 fallen soldiers."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Indian Army Official Portal (ADGPI)", url: "https://indianarmy.nic.in" },
      { label: "Ministry of Defence, Govt of India", url: "https://mod.gov.in" },
      { label: "Indian Air Force Official Portal", url: "https://indianairforce.nic.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Kargil Vijay Diwas 2026 Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
