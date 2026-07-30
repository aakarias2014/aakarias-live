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
  console.log("🚀 Starting SEO Interlinking upload for FCRA Bill & Amendment Rules 2026 Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    featured: path.resolve(process.cwd(), "public/images/blog/fcra-1.png"),
    audit: path.resolve(process.cwd(), "public/images/blog/fcra-2.png"),
    mha: path.resolve(process.cwd(), "public/images/blog/fcra-3.png"),
  };

  // Check if files exist
  if (
    !fs.existsSync(imagePaths.featured) ||
    !fs.existsSync(imagePaths.audit) ||
    !fs.existsSync(imagePaths.mha)
  ) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // Upload images
  console.log("📸 Uploading images to Sanity...");
  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imagePaths.featured), {
    filename: "fcra_featured.png",
  });
  const assetAudit = await client.assets.upload("image", fs.createReadStream(imagePaths.audit), {
    filename: "fcra_compliance_audit.png",
  });
  const assetMha = await client.assets.upload("image", fs.createReadStream(imagePaths.mha), {
    filename: "fcra_mha_building.png",
  });

  // Construct document with exact high-search Google queries & internal SEO interlinks
  const article = {
    _id: "ca-fcra-amendment-rules-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "fcra-amendment-rules-2026" },
    title: "FCRA Amendment Bill & Rules 2026 | FCRA Bill Kya Hai, FCRA Full Form, नामित प्राधिकारी & MPPSC/UPSC Notes PDF",
    titleEn: "FCRA Amendment Bill & Rules 2026: FCRA Bill Kya Hai, Full Form, Designated Authority & MPPSC/UPSC Notes",
    excerpt: "गृह मंत्रालय (MHA) द्वारा संसद में पेश FCRA Amendment Bill 2026 और FCRA Rules 2026 का संपूर्ण विश्लेषण। जानें FCRA Bill Kya Hai, FCRA Full Form, नामित प्राधिकारी (Designated Authority), 75% व्यय नियम, धर्मांतरण प्रतिबंध और MPPSC/UPSC परीक्षा उपयोगी मुख्य तथ्य।",
    excerptEn: "Complete study guide on FCRA Amendment Bill 2026 & Rules 2026 for MPPSC & UPSC. Learn FCRA Bill Kya Hai, FCRA full form in Hindi, Designated Authority provisions, 75% fund utilization rule, and SC judgments.",
    ca_date: "2026-07-18",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 10,
    keywords: [
      "fcra bill",
      "fcra bill 2026",
      "fcra bill kya hai",
      "fcra kya hai",
      "fcra full form",
      "fcra full form in hindi",
      "fcra amendment bill 2026",
      "fcra amendment bill 2026 mppsc",
      "fcra amendment bill 2026 upsc",
      "fcra bill 2026 passed",
      "fcra bill 2026 pdf",
      "fcra bill 2026 status",
      "fcra amendment rules 2026 hindi",
      "fcra hindi",
      "fcra new rules 2026",
      "fcra 2026 current affairs hindi",
      "नामित प्राधिकारी FCRA 2026",
      "Designated Authority FCRA",
      "Foreign Contribution Regulation Amendment Bill 2026",
      "MPPSC Mains Paper 2 Governance",
      "MPPSC Prelims Polity Notes"
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // Polity & Governance
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
      alt: "FCRA Amendment Bill 2026 FCRA Bill Kya Hai MPPSC UPSC Notes in Hindi",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News / Context ────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "चर्चा में क्यों? (Context & FCRA Bill 2026 Status)",
        titleEn: "Context & FCRA Bill 2026 Status",
        body: [
          ...createBlocks([
            "हाल ही में **गृह मंत्रालय (Ministry of Home Affairs - MHA)** द्वारा संसद (लोकसभा) में **विदेशी अंशदान (विनियमन) संशोधन विधेयक, 2026 (Foreign Contribution Regulation Amendment Bill, 2026)** पेश किया गया है तथा नए **FCRA Amendment Rules, 2026** अधिसूचित किए गए हैं।",
            "• **FCRA Bill 2026 Kya Hai**: यह विधेयक भारत में विदेशी धन (**Foreign Grants**) प्राप्त करने वाले **NGOs** और ट्रस्टों की संपत्तियों और गतिविधियों पर सरकारी निगरानी बढ़ाने के लिए लाया गया है।",
            "• **नामित प्राधिकारी (Designated Authority)**: यदि किसी NGO का FCRA लाइसेंस रद्द या सरेंडर होता है, तो उसकी विदेशी संपत्तियों के प्रबंधन हेतु केंद्र सरकार द्वारा एक **Designated Authority** नियुक्त करने का स्पष्ट प्रावधान किया गया है।",
            "• **परीक्षा उपयोगिता**: यह टॉपिक [MPPSC मुख्य परीक्षा पाठ्यक्रम](/mppsc/mains-syllabus) (द्वितीय प्रश्नपत्र - भारतीय राजव्यवस्था व लोक प्रशासन) एवं [MPPSC प्रारंभिक परीक्षा](/mppsc/prelims-syllabus) परीक्षा के लिए अत्यधिक महत्वपूर्ण है।"
          ]),
          createTable(
            "table-fcra-facts-hi",
            "FCRA Amendment Bill 2026: मुख्य बिंदु (Quick Facts)",
            ["विषय / पैरामीटर", "नवीनतम विवरण"],
            [
              ["**विधेयक का नाम**", "**FCRA Amendment Bill, 2026 / FCRA संशोधन नियम 2026**"],
              ["**FCRA Full Form**", "**Foreign Contribution (Regulation) Act**"],
              ["**नोडल मंत्रालय**", "**गृह मंत्रालय (Ministry of Home Affairs - MHA)**"],
              ["**विशेष प्रावधान**", "**नामित प्राधिकारी (Designated Authority), 75% व्यय नियम व धर्मांतरण रोक**"],
              ["**प्राथमिक बैंक**", "**SBI, नई दिल्ली मुख्य शाखा (संसद मार्ग)**"],
              ["**टारगेट परीक्षा**", "**[MPPSC मेंस & प्रीलिम्स](/mppsc/mains-syllabus) & UPSC GS-2**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "The **Foreign Contribution (Regulation) Amendment Bill, 2026** was introduced in Parliament alongside **FCRA Amendment Rules, 2026** by the **Ministry of Home Affairs (MHA)**.",
            "• **Core Objective**: Establishes a **Designated Authority** for managing assets of non-compliant NGOs.",
            "• **Target Exams**: Essential reading for [MPPSC Mains Paper-2](/mppsc/mains-syllabus) and UPSC GS Paper-2."
          ]),
          createTable(
            "table-fcra-facts-en",
            "FCRA Bill 2026 At a Glance",
            ["Parameter", "Details"],
            [
              ["**Bill Name**", "**FCRA Amendment Bill, 2026**"],
              ["**FCRA Full Form**", "**Foreign Contribution (Regulation) Act**"],
              ["**Nodal Agency**", "**Ministry of Home Affairs (MHA)**"],
              ["**Key Mechanism**", "**Designated Authority for Asset Management**"],
              ["**Mandatory Route**", "**SBI New Delhi Main Branch**"]
            ]
          )
        ],
      },

      /* ── 2. FCRA Kya Hai & Full Form ───────────────────────── */
      {
        _key: "sec-fcra-bg",
        kind: "background",
        title: "FCRA क्या है और FCRA का Full Form? (What is FCRA & Full Form)",
        titleEn: "What is FCRA & Full Form in Hindi?",
        body: [
          ...createBlocks([
            "### FCRA Kya Hai (FCRA क्या है?)",
            "• **FCRA (Foreign Contribution Regulation Act)** भारत सरकार का एक प्रमुख कानून है जो देश में गैर-सरकारी संगठनों (NGOs), ट्रस्टों और कंपनियों द्वारा विदेशों से प्राप्त होने वाले **चंदे, अनुदान (Foreign Funding)** और **विदेशी आतिथ्य (Foreign Hospitality)** को नियंत्रित करता है।",
            "### FCRA Ka Full Form (FCRA का फुल फॉर्म)",
            "• **अंग्रेजी में Full Form**: **Foreign Contribution (Regulation) Act**",
            "• **हिंदी में नाम**: **विदेशी अंशदान (विनियमन) अधिनियम**",
            "### FCRA का ऐतिहासिक घटनाक्रम (History & Evolution)",
            "• **1976**: आपातकाल के समय विदेशी हस्तक्षेप रोकने हेतु पहली बार **FCRA 1976** बना।",
            "• **2010**: पुराने कानून को रिप्लेस कर **FCRA 2010** लागू किया गया।",
            "• **2020**: एक NGO से दूसरे NGO को **फंड ट्रांसफर (Sub-granting)** पर पूरी रोक लगाई गई और **SBI नई दिल्ली** में खाता अनिवार्य किया गया।",
            "• **2026 (FCRA Bill & Rules 2026)**: **Designated Authority**, **75% fund usage** तथा **Conversion Excluded** नियम लागू किए गए।"
          ]),
          {
            _key: "b2-img-mha",
            _type: "image",
            asset: { _type: "reference", _ref: assetMha._id },
            alt: "Ministry of Home Affairs North Block New Delhi - FCRA Nodal Ministry",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### FCRA Full Form & Definition",
            "• **Full Form**: **Foreign Contribution (Regulation) Act**.",
            "• **Hindi Name**: **विदेशी अंशदान (विनियमन) अधिनियम**.",
            "• **Purpose**: Regulates foreign donations to NGOs and associations to safeguard national sovereignty.",
            "### Timeline",
            "• **1976**: First enacted during Emergency.",
            "• **2010**: New consolidated law.",
            "• **2020**: Inter-NGO transfer banned & SBI New Delhi route made mandatory.",
            "• **2026**: FCRA Bill & Rules 2026 introduced with Designated Authority provisions."
          ]),
          {
            _key: "b2-img-mha-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetMha._id },
            alt: "Ministry of Home Affairs North Block New Delhi - FCRA Nodal Ministry",
          }
        ],
      },

      /* ── 3. Major Provisions FCRA Bill & Rules 2026 ────────────── */
      {
        _key: "sec-provisions-2026",
        kind: "keyHighlights",
        title: "FCRA Amendment Bill & Rules 2026 के प्रमुख बिंदु",
        titleEn: "Key Highlights of FCRA Amendment Bill & Rules 2026",
        body: [
          ...createBlocks([
            "### 1. नामित प्राधिकारी (Designated Authority) का गठन",
            "• **संपत्ति प्रबंधन**: यदि किसी NGO का FCRA लाइसेंस रद्द होता है या समाप्त होता है, तो उसकी विदेशी संपत्तियों के प्रबंधन हेतु केंद्र द्वारा **Designated Authority** नियुक्त होगी।",
            "### 2. धर्मांतरण पर कड़ा प्रतिबंध (Strict Anti-Conversion Exclusions)",
            "• **Conversion Excluded**: नियमावली में स्पष्ट किया गया है कि धर्मांतरण गतिविधियों के लिए विदेशी धन का इस्तेमाल नहीं किया जा सकता। [संविधान सभा व मौलिक अधिकारों का इतिहास](/general-awareness/constituent-assembly-of-india-making-of-constitution-mppsc-notes) में अनुच्छेद 25 की व्याख्या देखें।",
            "### 3. 75% व्यय नियम (75% Fund Utilization Norm)",
            "• अगली किस्त पाने से पहले पिछले प्राप्त फंड का कम से कम **75%** घोषित सामाजिक कार्य पर खर्च करना अनिवार्य है।",
            "### 4. गतिविधि-विशिष्ट पंजीकरण (Activity-Specific Registration)",
            "• NGOs को अपनी विशिष्ट गतिविधि और कार्य करने वाले राज्य का अलग विवरण देना होगा।",
            "### 5. विदेशी नागरिकों पर रोक (Foreign Functionary Restrictions)",
            "• विदेशी नागरिक (सिवाय PIO/OCI) FCRA संस्थाओं के मुख्य पदाधिकारी नहीं बन सकते।"
          ]),
          {
            _key: "b3-img-audit",
            _type: "image",
            asset: { _type: "reference", _ref: assetAudit._id },
            alt: "Auditors inspecting NGO foreign fund compliance audit under FCRA 2026",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### 1. Designated Authority Provision",
            "• Government-appointed officer to manage and dispose of foreign assets of cancelled/expired NGOs.",
            "### 2. Strict Ban on Proselytization",
            "• Explicit insertion of **'Conversion Excluded'** across all permissible activities.",
            "### 3. 75% Fund Expenditure Rule",
            "• At least **75%** of previous grants must be utilized prior to releasing fresh funds."
          ]),
          {
            _key: "b3-img-audit-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetAudit._id },
            alt: "Auditors inspecting NGO foreign fund compliance audit under FCRA 2026",
          }
        ],
      },

      /* ── 4. MPPSC & UPSC Exam Analysis ───────────────────────── */
      {
        _key: "sec-mppsc-exam-pov",
        kind: "keyAspects",
        title: "MPPSC मेंस (पेपर-2) एवं UPSC परीक्षा उत्तर लेखन विश्लेषण",
        titleEn: "MPPSC Mains Paper-2 & UPSC Governance Notes",
        body: createBlocks([
          "### MPPSC मुख्य परीक्षा हेतु उत्तर लेखन बिंदु",
          "• **सुरक्षा vs नागरिक समाज**: राष्ट्रीय सुरक्षा और गैर-सरकारी संगठनों के जनकल्याणकारी कार्यों में संतुलन। [MPPSC Notes Portal](/mppsc-notes) पर संपूर्ण मॉडल उत्तर देखें।",
          "• **वित्तीय पारदर्शिता**: अवैध मनी लॉन्ड्रिंग और धर्मांतरण नेटवर्क पर नकेल।",
          "### FCRA के तहत विदेशी धन प्राप्त करने से प्रतिबंधित वर्ग (Prohibited Entities)",
          "• **चुनाव उम्मीदवार (Election Candidates)**",
          "• **सांसद, विधायक व मंत्री (MPs, MLAs & Ministers)**",
          "• **न्यायाधीश व सरकारी कर्मचारी (Judges & Public Servants)**",
          "• **राजनीतिक दल (Political Parties)**",
          "• **समाचार माध्यमों के सम्पादक व प्रकाशक (Editors & Publishers)**"
        ]),
        bodyEn: createBlocks([
          "### Prohibited Entities under FCRA",
          "• Election candidates, MPs, MLAs, Judges, Public Servants, Political Parties, and Media Editors."
        ]),
      },

      /* ── 5. Judicial Judgments ───────────────────────────────── */
      {
        _key: "sec-judgments",
        kind: "importance",
        title: "महत्वपूर्ण न्यायिक निर्णय (Landmark Judgments)",
        titleEn: "Landmark Judgments on FCRA",
        body: createBlocks([
          "• **Rev. Stanislaus बनाम मध्य प्रदेश राज्य (1977)**: सुप्रीम कोर्ट ने कहा कि अनुच्छेद 25 के तहत धर्म प्रचार में धर्मांतरण का अधिकार शामिल नहीं है।",
          "• **Noel Harper बनाम भारत संघ (2022)**: सुप्रीम कोर्ट ने FCRA 2010 व 2020 संशोधनों की संवैधानिक वैधता को बरकरार रखा।",
          "• **INSAF बनाम भारत संघ (2020)**: राष्ट्रीय संप्रभुता हेतु विदेशी फंड के नियमन को जायज ठहराया।"
        ]),
        bodyEn: createBlocks([
          "• **Rev. Stanislaus vs State of MP (1977)**: Propagate religion != Right to convert.",
          "• **Noel Harper vs Union of India (2022)**: SC upheld constitutional validity of FCRA amendments."
        ]),
      },

      /* ── 6. Facts at a Glance & Related Links (Interlinking) ─── */
      {
        _key: "sec-interlinking-seo",
        kind: "factsAtAGlance",
        title: "🔗 संबंधित MPPSC अध्ययन सामग्री & महत्वपूर्ण लिंक्स (Important Interlinks)",
        titleEn: "Related MPPSC Study Material & Important Links",
        body: createBlocks([
          "### परीक्षा उपयोगी त्वरित तथ्य",
          "• **FCRA Full Form** → **Foreign Contribution (Regulation) Act**",
          "• **नोडल मंत्रालय** → **गृह मंत्रालय (MHA)**",
          "• **मुख्य बैंक शाखा** → **SBI, नई दिल्ली मुख्य शाखा**",
          "• **पंजीकरण वैधता** → **5 वर्ष (6 माह पूर्व नवीनीकरण)**",
          "• **NGO से NGO फंड ट्रांसफर** → **पूर्णतः प्रतिबंधित (2020)**",
          "### संबंधित MPPSC नोट्स & कानून (SEO Interlinking)",
          "👉 [MPPSC Mains Syllabus 2026 (द्वितीय प्रश्नपत्र: राजव्यवस्था व शासन)](/mppsc/mains-syllabus)",
          "👉 [MPPSC Prelims Complete Syllabus & Exam Pattern](/mppsc/prelims-syllabus)",
          "👉 [MPPSC Previous Year Question Papers & Model Answers](/mppsc/previous-year-papers)",
          "👉 [आपदा प्रबंधन (संशोधन) अधिनियम 2025: मुख्य प्रावधान व MPPSC Notes](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)",
          "👉 [73वां व 74वां संविधान संशोधन अधिनियम (पंचायती राज व नगरीय निकाय)](/general-awareness/73rd-74th-constitutional-amendment-acts-panchayati-raj-mppsc-notes)",
          "👉 [भारत में महिलाओं की सुरक्षा हेतु कानून व संवैधानिक प्रावधान](/general-awareness/women-safety-laws-in-india-constitutional-provisions-mppsc-notes)",
          "👉 [भारतीय संविधान सभा: निर्माण, बैठकें व प्रमुख समितियां](/general-awareness/constituent-assembly-of-india-making-of-constitution-mppsc-notes)",
          "👉 [MPPSC 2026-27 ऑनलाइन लाइव बैच में प्रवेश लें](/online-courses/mppsc-mains-2027-online-live-batch)"
        ]),
        bodyEn: createBlocks([
          "### Related MPPSC Study Notes & Links",
          "👉 [MPPSC Mains Syllabus](/mppsc/mains-syllabus)",
          "👉 [MPPSC Prelims Syllabus](/mppsc/prelims-syllabus)",
          "👉 [Disaster Management Amendment Act 2025](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)",
          "👉 [73rd & 74th Constitutional Amendment Acts](/general-awareness/73rd-74th-constitutional-amendment-acts-panchayati-raj-mppsc-notes)"
        ]),
      }
    ],

    /* ─── MCQs (EXACTLY 8 HIGH-QUALITY MCQs) ───────────────── */
    mcqs: [
      {
        question: "FCRA (विदेशी अंशदान विनियमन अधिनियम) का नोडल मंत्रालय कौन-सा है?",
        questionEn: "Which is the nodal ministry for FCRA in India?",
        options: ["वित्त मंत्रालय", "गृह मंत्रालय (MHA)", "विदेश मंत्रालय", "विधि एवं न्याय मंत्रालय"],
        optionsEn: ["Ministry of Finance", "Ministry of Home Affairs (MHA)", "Ministry of External Affairs", "Ministry of Law and Justice"],
        correctIndex: 1,
        explanation: "FCRA का नोडल मंत्रालय गृह मंत्रालय (MHA) है जो गैर-सरकारी संगठनों और विदेशी फंड की निगरानी करता है।",
        explanationEn: "The Ministry of Home Affairs (MHA) is the nodal ministry overseeing FCRA registrations."
      },
      {
        question: "FCRA का पूर्ण रूप (Full Form) क्या है?",
        questionEn: "What is the full form of FCRA?",
        options: [
          "Foreign Currency Regulation Act",
          "Foreign Contribution (Regulation) Act",
          "Federal Corporate Regulation Authority",
          "Financial Contribution Regulation Act"
        ],
        optionsEn: [
          "Foreign Currency Regulation Act",
          "Foreign Contribution (Regulation) Act",
          "Federal Corporate Regulation Authority",
          "Financial Contribution Regulation Act"
        ],
        correctIndex: 1,
        explanation: "FCRA का फुल फॉर्म Foreign Contribution (Regulation) Act (विदेशी अंशदान (विनियमन) अधिनियम) है।",
        explanationEn: "FCRA stands for Foreign Contribution (Regulation) Act."
      },
      {
        question: "FCRA Bill 2026 के तहत रद्द हुए NGOs की विदेशी संपत्तियों का प्रबंधन करने के लिए किसकी नियुक्ति का प्रावधान है?",
        questionEn: "Under FCRA Bill 2026, who is appointed to manage assets of cancelled FCRA NGOs?",
        options: ["नियंत्रक एवं महालेखा परीक्षक (CAG)", "नामित प्राधिकारी (Designated Authority)", "नीति आयोग", "लोकपाल"],
        optionsEn: ["Comptroller and Auditor General (CAG)", "Designated Authority", "NITI Aayog", "Lokpal"],
        correctIndex: 1,
        explanation: "FCRA Bill 2026 के तहत लाइसेंस रद्द या समाप्त होने पर विदेशी संपत्तियों के प्रबंधन व निपटान हेतु केंद्र सरकार द्वारा एक Designated Authority (नामित प्राधिकारी) नियुक्त करने का प्रावधान है।",
        explanationEn: "The FCRA Bill 2026 provides for a Designated Authority to take over, manage, or dispose of assets of non-compliant NGOs."
      },
      {
        question: "FCRA के अंतर्गत विदेशी अंशदान प्राप्त करने हेतु अनिवार्य प्राथमिक बैंक खाता कहाँ खोलना होता है?",
        questionEn: "Under FCRA, where must the mandatory primary bank account for foreign contributions be opened?",
        options: ["भारतीय रिजर्व बैंक (RBI)", "पंजाब नेशनल बैंक (PNB)", "SBI, नई दिल्ली मुख्य शाखा", "बैंक ऑफ बड़ौदा, मुंबई"],
        optionsEn: ["Reserve Bank of India (RBI)", "Punjab National Bank (PNB)", "SBI, New Delhi Main Branch", "Bank of Baroda, Mumbai"],
        correctIndex: 2,
        explanation: "विदेशी धन प्राप्त करने वाली सभी पंजीकृत संस्थाओं को सर्वप्रथम भारतीय स्टेट बैंक (SBI), नई दिल्ली मुख्य शाखा (संसद मार्ग) में ही प्राथमिक FCRA खाता खोलना अनिवार्य है।",
        explanationEn: "All foreign contributions must be initially received at the designated FCRA account in the State Bank of India, New Delhi Main Branch."
      },
      {
        question: "FCRA संशोधन नियम 2026 के अनुसार, NGOs को विदेशी फंड की अगली किस्त प्राप्त करने से पहले पिछले फंड का कितना प्रतिशत व्यय करना अनिवार्य है?",
        questionEn: "Under FCRA Amendment Rules 2026, what percentage of prior funds must be spent before releasing the next installment?",
        options: ["25%", "50%", "75%", "100%"],
        optionsEn: ["25%", "50%", "75%", "100%"],
        correctIndex: 2,
        explanation: "नए नियमों के तहत अगली किस्त जारी होने से पहले पिछले फंड का कम से कम 75% स्वीकृत गतिविधियों पर व्यय करना अनिवार्य है।",
        explanationEn: "To enforce financial discipline, the rules mandate spending at least 75% of prior funds before fresh installments are released."
      },
      {
        question: "FCRA पंजीकरण (Registration) की वैधता अवधि कितने वर्षों की होती है?",
        questionEn: "What is the validity period of FCRA registration in India?",
        options: ["3 वर्ष", "5 वर्ष", "10 वर्ष", "आजीवन"],
        optionsEn: ["3 years", "5 years", "10 years", "Lifetime"],
        correctIndex: 1,
        explanation: "FCRA पंजीकरण की वैधता 5 वर्षों की होती है और इसकी समाप्ति से 6 माह पूर्व नवीनीकरण (Renewal) का आवेदन करना होता है।",
        explanationEn: "FCRA registration is valid for 5 years and requires renewal filing 6 months prior to expiry."
      },
      {
        question: "Rev. Stanislaus बनाम मध्य प्रदेश राज्य (1977) का ऐतिहासिक मामला किस विषय से संबंधित है?",
        questionEn: "The landmark Supreme Court case Rev. Stanislaus vs State of MP (1977) is related to:",
        options: [
          "कार्यस्थल पर यौन उत्पीड़न की रोकथाम",
          "धार्मिक स्वतंत्रता और धर्म परिवर्तन की सीमाएं",
          "विदेशी अंशदान का विनियमन",
          "प्रेस और अभिव्यक्ति की स्वतंत्रता"
        ],
        optionsEn: [
          "Prevention of sexual harassment at workplace",
          "Religious freedom and limits of conversion",
          "Regulation of foreign contributions",
          "Freedom of press and speech"
        ],
        correctIndex: 1,
        explanation: "इस मामले में सुप्रीम कोर्ट ने निर्णय दिया कि अनुच्छेद 25 के तहत धर्म प्रचार करने के अधिकार में किसी दूसरे व्यक्ति का धर्मांतरण (Conversion) कराने का अधिकार शामिल नहीं है।",
        explanationEn: "The SC ruled that the right to propagate religion under Article 25 does not include the right to convert another person."
      },
      {
        question: "निम्नलिखित में से कौन-सा व्यक्ति या संस्था FCRA के तहत विदेशी अंशदान प्राप्त करने के लिए कानूनन प्रतिबंधित (Prohibited) है?",
        questionEn: "Which of the following entities are prohibited from receiving foreign contributions under FCRA?",
        options: [
          "चुनाव उम्मीदवार और न्यायाधीश",
          "सांसद, विधायक और राजनीतिक दल",
          "सरकारी कर्मचारी और समाचार पत्र संपादक",
          "उपर्युक्त सभी"
        ],
        optionsEn: [
          "Election candidates and Judges",
          "MPs, MLAs and Political parties",
          "Government employees and Media Editors",
          "All of the above"
        ],
        correctIndex: 3,
        explanation: "कानून के अनुसार न्यायाधीश, सरकारी कर्मचारी, सांसद, विधायक, चुनाव उम्मीदवार, राजनीतिक दल और समाचार माध्यमों के संपादक विदेशी धन प्राप्त करने के लिए पूर्णतः प्रतिबंधित हैं।",
        explanationEn: "Legislators, judges, public servants, political parties, election candidates, and media editors are strictly barred from receiving foreign funds."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "FCRA Bill 2026 Kya Hai?",
        questionEn: "What is FCRA Bill 2026?",
        answer: "FCRA Bill 2026 गृह मंत्रालय द्वारा संसद में पेश किया गया एक विधेयक है, जो विदेशी धन प्राप्त करने वाले NGOs के लिए Designated Authority (नामित प्राधिकारी), 75% व्यय नियम और धर्मांतरण पर सख्त रोक के प्रावधान करता है।",
        answerEn: "FCRA Bill 2026 is a legislative amendment introducing a Designated Authority for NGO asset management, 75% fund usage rules, and strict anti-conversion compliance."
      },
      {
        question: "FCRA Ka Full Form Kya Hai?",
        questionEn: "What is the full form of FCRA?",
        answer: "FCRA का Full Form Foreign Contribution (Regulation) Act (विदेशी अंशदान (विनियमन) अधिनियम) है। इसका नोडल मंत्रालय गृह मंत्रालय (MHA) है।",
        answerEn: "FCRA stands for Foreign Contribution (Regulation) Act. It is administered by the Ministry of Home Affairs (MHA)."
      },
      {
        question: "FCRA Bill 2026 me Designated Authority (नामित प्राधिकारी) kya hai?",
        questionEn: "What is the Designated Authority under FCRA Bill 2026?",
        answer: "यदि किसी NGO का FCRA लाइसेंस रद्द, सरेंडर या समाप्त हो जाता है, तो उसकी विदेशी संपत्तियों के प्रबंधन व निस्तारण के लिए सरकार द्वारा Designated Authority नियुक्त की जाएगी।",
        answerEn: "A Designated Authority is a government-appointed authority tasked with managing and disposing of foreign assets of non-compliant or cancelled NGOs."
      },
      {
        question: "FCRA ka khata kis bank me kholna compulsory hai?",
        questionEn: "Which bank account is compulsory for FCRA?",
        answer: "सभी विदेशी अनुदान अनिवार्य रूप से भारतीय स्टेट बैंक (SBI), नई दिल्ली मुख्य शाखा (संसद मार्ग) में स्थित विशिष्ट FCRA खाते में ही प्राप्त होने चाहिए।",
        answerEn: "All foreign grants must flow first into a dedicated FCRA account located exclusively at the State Bank of India, New Delhi Main Branch."
      },
      {
        question: "Kya ek NGO apna FCRA fund doosre NGO ko transfer kar sakta hai?",
        questionEn: "Can an NGO transfer FCRA funds to another NGO?",
        answer: "नहीं, FCRA 2020 संशोधन के तहत किसी भी NGO द्वारा दूसरे NGO को विदेशी धन ट्रांसफर (Sub-granting) करना पूर्णतः प्रतिबंधित है।",
        answerEn: "No, transferring foreign contributions to any other NGO or third party is strictly prohibited under the 2020 amendment."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Ministry of Home Affairs (MHA), Govt of India", url: "https://mha.gov.in" },
      { label: "FCRA Online Services Portal", url: "https://fcraonline.nic.in" },
      { label: "PRS Legislative Research (FCRA Bill 2026)", url: "https://prsindia.org" },
      { label: "Supreme Court of India (Noel Harper & Stanislaus Judgments)", url: "https://sci.gov.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded FCRA Bill & Rules 2026 Article with Rich Interlinking to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
