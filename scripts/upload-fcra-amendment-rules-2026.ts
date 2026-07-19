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
  console.log("🚀 Starting upload process for FCRA Amendment Rules 2026 Current Affairs Article...");

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

  // 1. Upload Featured Image
  console.log("📸 Uploading featured image...");
  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imagePaths.featured), {
    filename: "fcra_featured.png",
  });
  console.log(`✔ Uploaded featured image. Asset ID: ${assetFeatured._id}`);

  // 2. Upload Audit Image
  console.log("📸 Uploading audit image...");
  const assetAudit = await client.assets.upload("image", fs.createReadStream(imagePaths.audit), {
    filename: "fcra_compliance_audit.png",
  });
  console.log(`✔ Uploaded audit image. Asset ID: ${assetAudit._id}`);

  // 3. Upload MHA Building Image
  console.log("📸 Uploading MHA building image...");
  const assetMha = await client.assets.upload("image", fs.createReadStream(imagePaths.mha), {
    filename: "fcra_mha_building.png",
  });
  console.log(`✔ Uploaded MHA building image. Asset ID: ${assetMha._id}`);

  // 4. Construct the Article document
  const article = {
    _id: "ca-fcra-amendment-rules-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "fcra-amendment-rules-2026" },
    title: "FCRA संशोधन नियम, 2026 (Foreign Contribution Regulation Amendment Rules, 2026)",
    titleEn: "Foreign Contribution Regulation Amendment Rules, 2026: Key Provisions & Impacts",
    excerpt: "गृह मंत्रालय (MHA) द्वारा विदेशी अंशदान (विनियमन) संशोधन नियम, 2026 अधिसूचित किए गए हैं। इन नियमों का उद्देश्य विदेशी धन प्राप्त करने वाले NGOs के अनुपालन, पारदर्शिता और वित्तीय अनुशासन को मजबूत करना है।",
    excerptEn: "The Ministry of Home Affairs (MHA) has notified the FCRA Amendment Rules, 2026. These updates introduce strict compliance norms, activity-specific registrations, and financial discipline guidelines for NGOs receiving foreign funds.",
    ca_date: "2026-07-18",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 7,
    keywords: [
      "FCRA Amendment Rules 2026",
      "Foreign Contribution Regulation Act",
      "Ministry of Home Affairs FCRA",
      "NGO Foreign Funding compliance",
      "Stanislaus Case 1977",
      "Noel Harper Case 2022",
      "State Bank of India FCRA account",
      "MHA guidelines NGOs",
      "विदेशी अंशदान विनियमन नियम 2026",
      "गृह मंत्रालय एफसीआरए",
      "UPSC Polity",
      "MPPSC Governance"
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // Polity & Governance
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-2", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetFeatured._id },
      alt: "NGO financial compliance book with a magnifying glass on transparency and compliance in front of the Parliament of India",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News / Context ────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "चर्चा में क्यों? (Why in News?)",
        titleEn: "Context & Why in News?",
        body: [
          ...createBlocks([
            "**विदेशी अंशदान (विनियमन) संशोधन नियम, 2026** को **गृह मंत्रालय (MHA)** द्वारा अधिसूचित किया गया है। इन नियमों का उद्देश्य भारत में **विदेशी धन (Foreign Contribution)** प्राप्त करने वाले **गैर-सरकारी संगठनों (NGOs)** एवं संस्थाओं के लिए **पारदर्शिता**, **जवाबदेही** और **वित्तीय अनुशासन** को मजबूत करना है। नए नियम विदेशी अंशदान के उपयोग, पंजीकरण, वित्तीय अनुपालन तथा गतिविधियों के स्पष्ट वर्गीकरण पर विशेष जोर देते हैं।",
            "• **गृह मंत्रालय (MHA)**: **Foreign Contribution (Regulation) Amendment Rules, 2026** अधिसूचित किए हैं।",
            "• **नए नियम**: नए नियमों के तहत विदेशी फंड प्राप्त करने वाले **NGOs** के लिए कई नए अनुपालन (**Compliance**) प्रावधान लागू किए गए हैं।"
          ]),
          createTable(
            "table-fcra-facts-hi",
            "त्वरित तथ्य (Quick Facts)",
            ["विवरण", "जानकारी"],
            [
              ["**नियम**", "**FCRA संशोधन नियम, 2026**"],
              ["**अधिसूचित द्वारा**", "**गृह मंत्रालय (MHA)**"],
              ["**मुख्य उद्देश्य**", "**पारदर्शिता, जवाबदेही और वित्तीय अनुशासन को मजबूत करना**"],
              ["**लागू**", "**विदेशी धन प्राप्त करने वाले NGOs एवं संस्थाओं पर**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "The **Foreign Contribution (Regulation) Amendment Rules, 2026** have been officially notified by the **Ministry of Home Affairs (MHA)**. The updates aim to enhance **transparency**, **accountability**, and **financial discipline** for **Non-Governmental Organizations (NGOs)** and other associations operating in India with foreign funding.",
            "• **Ministry of Home Affairs (MHA)**: Notified the **Foreign Contribution (Regulation) Amendment Rules, 2026**.",
            "• **Compliance Norms**: Several new compliance requirements have been established for all active organizations receiving foreign funds."
          ]),
          createTable(
            "table-fcra-facts-en",
            "Quick Facts at a Glance",
            ["Parameter", "Details"],
            [
              ["**Rules**", "**FCRA Amendment Rules, 2026**"],
              ["**Notified By**", "**Ministry of Home Affairs (MHA)**"],
              ["**Core Objective**", "**Strengthening transparency, accountability, and financial discipline**"],
              ["**Target Entities**", "**NGOs and organizations receiving foreign contributions**"]
            ]
          )
        ],
      },

      /* ── 2. What is FCRA & Nodal Ministry ─────────────────────── */
      {
        _key: "sec-fcra-bg",
        kind: "background",
        title: "FCRA क्या है और इसका उद्देश्य?",
        titleEn: "What is FCRA and its Nodal Framework?",
        body: [
          ...createBlocks([
            "• **FCRA (Foreign Contribution Regulation Act)**: इसका हिंदी नाम **विदेशी अंशदान (विनियमन) अधिनियम** है।",
            "• **मुख्य उद्देश्य**: भारत में **विदेशी अंशदान (Foreign Contribution)** एवं **विदेशी आतिथ्य (Foreign Hospitality)** को विनियमित करना ताकि विदेशी धन का उपयोग भारत की **संप्रभुता**, **राष्ट्रीय सुरक्षा**, **लोकतांत्रिक व्यवस्था** एवं **सार्वजनिक हित** के विरुद्ध न हो।",
            "• **ऐतिहासिक पृष्ठभूमि**:",
            "  - **1976**: पहली बार **FCRA** लागू किया गया (आपातकाल के दौरान)।",
            "  - **2010**: नया **FCRA अधिनियम** लागू किया गया।",
            "  - **2016, 2018 एवं 2020**: महत्वपूर्ण संशोधन किए गए।",
            "  - **2026**: नए संशोधन नियम अधिसूचित किए गए।",
            "• **नोडल मंत्रालय**: **गृह मंत्रालय (Ministry of Home Affairs - MHA)** इसका नोडल प्राधिकरण है।"
          ]),
          {
            _key: "b2-img-mha",
            _type: "image",
            asset: { _type: "reference", _ref: assetMha._id },
            alt: "North Block secretariat building in New Delhi with Indian national flag representing Ministry of Home Affairs",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "• **FCRA (Foreign Contribution Regulation Act)**: Enacted to monitor and regulate foreign funding in India.",
            "• **Core Objective**: To regulate the acceptance and utilization of **Foreign Contribution** and **Foreign Hospitality** to ensure that foreign resources do not compromise the **sovereignty**, **national security**, **democratic system**, and **public interest** of India.",
            "• **Historical Timeline**:",
            "  - **1976**: FCRA was first enacted during the Emergency.",
            "  - **2010**: A new consolidated FCRA legislation replaced the 1976 law.",
            "  - **2016, 2018, & 2020**: Crucial amendments introduced.",
            "  - **2026**: Latest Amendment Rules notified by MHA.",
            "• **Nodal Ministry**: **Ministry of Home Affairs (MHA)** oversees all regulatory functions."
          ]),
          {
            _key: "b2-img-mha-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetMha._id },
            alt: "North Block secretariat building in New Delhi with Indian national flag representing Ministry of Home Affairs",
          }
        ],
      },

      /* ── 3. Major Provisions 2026 ────────────────────────────── */
      {
        _key: "sec-provisions-2026",
        kind: "keyHighlights",
        title: "FCRA संशोधन नियम, 2026 के प्रमुख प्रावधान",
        titleEn: "Key Provisions of FCRA Amendment Rules, 2026",
        body: [
          ...createBlocks([
            "### 1. गतिविधि-विशिष्ट पंजीकरण (Activity-Specific Registration)",
            "• **गतिविधि**: प्रत्येक संगठन को अपनी विशिष्ट गतिविधि स्पष्ट बतानी होगी।",
            "• **कार्यक्षेत्र**: विदेशी फंड का उपयोग किस राज्य/केंद्रशासित प्रदेश में होना है, यह अलग-अलग दर्ज करना होगा।",
            "• **शुल्क**: विभिन्न गतिविधियों के लिए अलग-अलग शुल्क देना होगा।",
            "### 2. धार्मिक गतिविधियों पर स्पष्ट नियम (Religious Activities)",
            "• **अनुमति**: पूजा-अर्चना, धार्मिक शिक्षा, धार्मिक विरासत संरक्षण एवं सामुदायिक रसोई के लिए विदेशी धन का उपयोग जारी रखा जा सकेगा।",
            "• **धर्मांतरण (Religious Conversion)**: धर्मांतरण संबंधी गतिविधियों के लिए विदेशी धन का उपयोग पूर्णतः प्रतिबंधित रहेगा।",
            "### 3. धर्मांतरण पर स्पष्ट प्रतिबंध (Strict Conversion Exclusion)",
            "• **Conversion Excluded**: नियमों में कई स्थानों पर **\"Conversion Excluded\"** स्पष्ट रूप से जोड़ा गया है।",
            "• **सर्वोच्च न्यायालय का संबंधित निर्णय**: **Rev. Stanislaus vs State of Madhya Pradesh (1977)** मामले में सुप्रीम कोर्ट ने कहा था— **\"धर्म का प्रचार करने का अधिकार, किसी दूसरे व्यक्ति का धर्म परिवर्तन कराने का अधिकार नहीं है।\"**",
            "### 4. विदेशी नागरिकों पर प्रतिबंध (Foreign Citizens Restriction)",
            "• **प्रतिबंध**: यदि किसी **NGO** के प्रमुख पदाधिकारी विदेशी नागरिक हैं (सिवाय **PIO** यानी भारतीय मूल के व्यक्ति के) तो सामान्यतः उन्हें **FCRA** अनुमति नहीं दी जाएगी।",
            "### 5. प्रमुख पदाधिकारी (Key Functionary) की विस्तृत परिभाषा",
            "• इसके तहत अध्यक्ष, सचिव, निदेशक, ट्रस्टी, साझेदार (Partner) एवं HUF का कर्ता शामिल किए गए हैं।",
            "### 6. कड़ा वित्तीय अनुपालन (Strict Financial Compliance)",
            "• **75% व्यय**: विदेशी फंड की अगली किस्त प्राप्त करने से पहले पिछले प्राप्त फंड का कम से कम **75%** स्वीकृत गतिविधियों पर खर्च करना होगा।",
            "• **₹10 लाख**: प्रत्येक पंजीकृत संस्था को दो वर्षों में कम से कम **₹10 लाख** स्वीकृत गतिविधियों पर खर्च करना होगा।",
            "### 7. पारदर्शिता बढ़ाई गई (Enhanced Transparency)",
            "• NGOs को अपने अंतिम दाता (Ultimate Donor), आधिकारिक वेबसाइट, सोशल मीडिया अकाउंट और सभी प्रकाशनों का विवरण देना होगा।"
          ]),
          {
            _key: "b3-img-audit",
            _type: "image",
            asset: { _type: "reference", _ref: assetAudit._id },
            alt: "Financial auditors reviewing spreadsheets and checklists on computer screen in a professional office",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### 1. Activity-Specific Registration",
            "• **Specificity**: Organizations must clearly define the specific activity for which funds will be utilized.",
            "• **Territorial Jurisdiction**: Scope of work must be registered separately for each State/UT.",
            "• **Fees**: Separate fees are applicable for registering different kinds of activities.",
            "### 2. Clear Rules on Religious Activities",
            "• **Allowed Use**: Foreign funds can be utilized for worship, religious education, conservation of religious heritage, and community kitchens.",
            "• **Religious Conversion**: Explicitly banned from using foreign funding under all circumstances.",
            "### 3. Strict Ban on Conversions",
            "• **Conversion Excluded**: The term **\"Conversion Excluded\"** has been explicitly inserted at multiple places in the rulebook.",
            "• **Landmark Precedent**: In **Rev. Stanislaus vs State of Madhya Pradesh (1977)**, the Supreme Court ruled: **\"The right to propagate religion does not include the right to convert another person.\"**",
            "### 4. Ban on Foreign Nationals",
            "• **Restrictions**: NGOs headed or controlled by foreign nationals (except **PIOs**) will generally be denied FCRA registration/permission.",
            "### 5. Broadened Definition of Key Functionary",
            "• Includes the President, Secretary, Director, Trustee, Partner, and Karta of a HUF.",
            "### 6. Stringent Financial Discipline",
            "• **75% Expenditure**: At least **75%** of the existing foreign funds must be spent on designated activities before the next installment is released.",
            "• **₹10 Lakh Rule**: Registrants must spend a minimum of **₹10 lakh** over two years on declared welfare/activity programs.",
            "### 7. Heightened Transparency",
            "• Requires detailed disclosure of the Ultimate Donor, official website, social media handles, and publications."
          ]),
          {
            _key: "b3-img-audit-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetAudit._id },
            alt: "Financial auditors reviewing spreadsheets and checklists on computer screen in a professional office",
          }
        ],
      },

      /* ── 4. FCRA 2010 Core Features ──────────────────────────── */
      {
        _key: "sec-fcra-2010-core",
        kind: "keyAspects",
        title: "FCRA, 2010 की प्रमुख विशेषताएँ एवं प्रतिबंध",
        titleEn: "Core Features and Restrictions of FCRA, 2010",
        body: createBlocks([
          "• **पंजीकरण व अनुमति**: विदेशी धन प्राप्त करने के लिए **FCRA Registration** अथवा **Prior Permission** (पूर्व अनुमति) लेना कानूनन अनिवार्य है।",
          "• **कौन विदेशी धन प्राप्त कर सकता है**: Societies Registration Act, 1860, Indian Trust Act, 1882 या Companies Act, 2013 के सेक्शन 8 के तहत पंजीकृत संगठन।",
          "• **कौन विदेशी धन प्राप्त नहीं कर सकता**: चुनाव उम्मीदवार, सांसद, विधायक, राजनीतिक दल, न्यायाधीश, सरकारी कर्मचारी, सरकारी कंपनियों के कर्मचारी और समाचार माध्यमों के संपादक/प्रकाशक।",
          "• **SBI खाता अनिवार्य**: सभी विदेशी अंशदान अनिवार्य रूप से **SBI, नई दिल्ली मुख्य शाखा** में स्थित विशेष FCRA खाते में ही प्राप्त होंगे। वहां से यह अन्य निर्दिष्ट बैंक खातों में भेजा जा सकता है।",
          "• **विदेशी धन का हस्तांतरण**: **2020 संशोधन** के तहत किसी भी अन्य NGO या संस्था को विदेशी धन ट्रांसफर करना पूर्णतः प्रतिबंधित है।",
          "• **वैधता और नवीनीकरण**: पंजीकरण **5 वर्ष** तक वैध रहता है, तथा इसकी समाप्ति से **6 माह पूर्व** नवीनीकरण (Renewal) कराना होता है।"
        ]),
        bodyEn: createBlocks([
          "• **Registration Framework**: Receiving foreign funds necessitates obtaining either **FCRA Registration** or **Prior Permission** from the Central Government.",
          "• **Eligible Entities**: Organizations registered under the Societies Registration Act, 1860, Indian Trust Act, 1882, or Section 8 of the Companies Act, 2013.",
          "• **Barred Entities**: Election candidates, MPs, MLAs, political parties, judges, public servants, government company employees, and editors/publishers of registered print/electronic media.",
          "• **Mandatory SBI Account**: All foreign funds must flow first into a dedicated account at the **SBI, New Delhi Main Branch** (Parliament Street).",
          "• **Transfer Bar**: The **2020 amendment** strictly prohibits transferring foreign contributions to any other association or third party.",
          "• **Validity**: The registration is valid for **5 years** and requires renewal filing **6 months before** expiration."
        ]),
      },

      /* ── 5. Judicial Judgments ───────────────────────────────── */
      {
        _key: "sec-judgments",
        kind: "importance",
        title: "महत्वपूर्ण न्यायिक निर्णय (Important Judgments)",
        titleEn: "Key Judicial Precedents",
        body: createBlocks([
          "• **Rev. Stanislaus बनाम मध्य प्रदेश राज्य (1977)**: धर्म प्रचार का अधिकार ≠ धर्म परिवर्तन कराने का अधिकार।",
          "• **Noel Harper बनाम भारत संघ (2022)**: सर्वोच्च न्यायालय ने **FCRA, 2010** को संवैधानिक घोषित किया। कोर्ट ने कहा कि राष्ट्रीय संप्रभुता और सुरक्षा की रक्षा हेतु विदेशी फंड के नियमन पर उचित प्रतिबंध लगाना जायज है।",
          "• **INSAF बनाम भारत संघ (2020)**: सुप्रीम कोर्ट ने कहा कि FCRA का उद्देश्य राष्ट्रीय हित की रक्षा है। केवल सक्रिय राजनीतिक प्रकृति वाले संगठनों पर ही फंड प्राप्ति का प्रतिबंध तर्कसंगत है।"
        ]),
        bodyEn: createBlocks([
          "• **Rev. Stanislaus vs. State of MP (1977)**: Right to propagate does not equal the right to convert.",
          "• **Noel Harper vs. Union of India (2022)**: The Supreme Court upheld the constitutional validity of the **FCRA 2010** and the 2020 amendments, holding that foreign funds can be strictly regulated for national security.",
          "• **INSAF vs. Union of India (2020)**: Confirmed that public interest and national integrity are paramount, and restrictions are justifiable to keep active political groups away from foreign funds."
        ]),
      },

      /* ── 6. Exam POV ─────────────────────────────────────────── */
      {
        _key: "sec-exam-pov",
        kind: "factsAtAGlance",
        title: "परीक्षा दृष्टिकोण (Exam POV)",
        titleEn: "Exam Perspective & Revision Guidelines",
        body: createBlocks([
          "### याद रखने योग्य महत्वपूर्ण तथ्य",
          "• **पहला अधिनियम** → 1976 | **वर्तमान अधिनियम** → 2010",
          "• **नोडल मंत्रालय** → गृह मंत्रालय (MHA)",
          "• **पंजीकरण वैधता** → 5 वर्ष (नवीनीकरण 6 माह पूर्व)",
          "• **फंड प्राप्ति खाता** → SBI, नई दिल्ली मुख्य शाखा",
          "• **हस्तांतरण (Transfer)** → 2020 संशोधन से पूर्णतः प्रतिबंधित",
          "• **नया संशोधन नियम** → 2026",
          "### महत्वपूर्ण फुल फॉर्म (Full Forms)",
          "• **FCRA**: **Foreign Contribution Regulation Act**",
          "• **MHA**: **Ministry of Home Affairs**",
          "• **NGO**: **Non-Governmental Organization**",
          "• **PIO**: **Person of Indian Origin**",
          "• **SBI**: **State Bank of India**",
          "### क्विक टाइमलाइन रिवीजन",
          "• **1976** → पहला FCRA लागू",
          "• **2010** → नया FCRA अधिनियम",
          "• **2020** → विदेशी फंड ट्रांसफर पर पूर्ण रोक",
          "• **2026** → नए कड़े अनुपालन नियम अधिसूचित"
        ]),
        bodyEn: createBlocks([
          "### Key Facts to Remember",
          "• **First Enactment** → 1976 | **Current Enactment** → 2010",
          "• **Nodal Agency** → Ministry of Home Affairs (MHA)",
          "• **Registration Validity** → 5 Years (6-month prior renewal required)",
          "• **SBI Account Route** → SBI, New Delhi Main Branch",
          "• **Inter-NGO Transfer** → Banned in 2020 amendment",
          "• **Latest Rules** → 2026 MHA Notification",
          "### Major Abbreviations",
          "• **FCRA**: **Foreign Contribution Regulation Act**",
          "• **MHA**: **Ministry of Home Affairs**",
          "• **NGO**: **Non-Governmental Organization**",
          "• **PIO**: **Person of Indian Origin**",
          "• **SBI**: **State Bank of India**",
          "### Quick Timeline Summary",
          "• **1976** → First FCRA law implemented during emergency",
          "• **2010** → Comprehensive new Act replaces 1976 law",
          "• **2020** → Strict bans on inter-NGO transfers introduced",
          "• **2026** → New activity-specific compliance rules enforced"
        ]),
      }
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "FCRA का नोडल मंत्रालय कौन-सा है?",
        questionEn: "Which is the nodal ministry for FCRA in India?",
        options: ["वित्त मंत्रालय", "गृह मंत्रालय", "विदेश मंत्रालय", "विधि मंत्रालय"],
        optionsEn: ["Ministry of Finance", "Ministry of Home Affairs", "Ministry of External Affairs", "Ministry of Law and Justice"],
        correctIndex: 1,
        explanation: "FCRA का नोडल मंत्रालय गृह मंत्रालय (MHA) है। यह विभाग गैर-सरकारी संगठनों और विदेशी फंड की आवक को विनियमित करता है।",
        explanationEn: "The Ministry of Home Affairs (MHA) serves as the nodal ministry for executing and administering the FCRA regulations."
      },
      {
        question: "FCRA के अंतर्गत विदेशी अंशदान प्राप्त करने हेतु अनिवार्य बैंक खाता कहाँ खोला जाता है?",
        questionEn: "Under FCRA, where must the mandatory bank account for receiving foreign contributions be opened?",
        options: ["भारतीय रिजर्व बैंक (RBI)", "पंजाब नेशनल बैंक (PNB)", "SBI, नई दिल्ली मुख्य शाखा", "किसी भी अनुसूचित बैंक में"],
        optionsEn: ["Reserve Bank of India (RBI)", "Punjab National Bank (PNB)", "SBI, New Delhi Main Branch", "In any scheduled commercial bank"],
        correctIndex: 2,
        explanation: "विदेशी धन प्राप्त करने वाली सभी पंजीकृत संस्थाओं को सर्वप्रथम भारतीय स्टेट बैंक (SBI), नई दिल्ली मुख्य शाखा में एक विशेष FCRA खाता खोलना अनिवार्य है।",
        explanationEn: "All foreign contributions must be initially received at the designated FCRA account in the State Bank of India, New Delhi Main Branch."
      },
      {
        question: "FCRA संशोधन नियम, 2026 के अनुसार, NGOs को किसी अन्य NGO को विदेशी अंशदान ट्रांसफर करने के संदर्भ में क्या प्रावधान है?",
        questionEn: "According to the FCRA rules, what is the provision regarding the transfer of foreign funds to another NGO?",
        options: [
          "केवल 50% ट्रांसफर किया जा सकता है",
          "केवल 20% ट्रांसफर किया जा सकता है",
          "पूर्णतः प्रतिबंधित है",
          "गृह मंत्रालय की अनुमति से ही ट्रांसफर किया जा सकता है"
        ],
        optionsEn: [
          "Only 50% can be transferred",
          "Only 20% can be transferred",
          "Completely prohibited",
          "Allowed only with the permission of the Home Ministry"
        ],
        correctIndex: 2,
        explanation: "वर्ष 2020 के संशोधन के बाद से एक NGO से दूसरे NGO को विदेशी धन का हस्तांतरण (Transfer) पूर्णतः प्रतिबंधित कर दिया गया है।",
        explanationEn: "Following the 2020 amendment, transferring foreign contributions to any other NGO or third-party entity is completely prohibited."
      },
      {
        question: "FCRA पंजीकरण (Registration) की वैधता अवधि कितने वर्षों की होती है?",
        questionEn: "What is the validity period of the FCRA registration in India?",
        options: ["3 वर्ष", "5 वर्ष", "10 वर्ष", "आजीवन"],
        optionsEn: ["3 years", "5 years", "10 years", "Lifetime"],
        correctIndex: 1,
        explanation: "FCRA पंजीकरण की वैधता 5 वर्षों की होती है और इसकी समाप्ति तिथि से 6 माह पूर्व इसके नवीनीकरण (Renewal) हेतु आवेदन करना होता है।",
        explanationEn: "FCRA registration is valid for 5 years, and renewal applications must be submitted 6 months prior to the expiry."
      },
      {
        question: "Rev. Stanislaus बनाम मध्य प्रदेश राज्य (1977) का ऐतिहासिक मामला किस विषय से संबंधित है?",
        questionEn: "The landmark Supreme Court case Rev. Stanislaus vs State of Madhya Pradesh (1977) is related to:",
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
        explanation: "इस मामले में सुप्रीम कोर्ट ने निर्णय दिया कि संविधान के तहत धर्म प्रचार करने के अधिकार में किसी दूसरे व्यक्ति का धर्मांतरण (Conversion) कराने का अधिकार शामिल नहीं है।",
        explanationEn: "In this case, the Supreme Court ruled that the right to propagate religion under Article 25 does not include the right to convert another person."
      },
      {
        question: "FCRA संशोधन नियम, 2026 के अनुसार, NGOs को विदेशी फंड की अगली किस्त प्राप्त करने से पहले पिछले फंड का कितना प्रतिशत व्यय करना अनिवार्य है?",
        questionEn: "Under the FCRA Amendment Rules 2026, what percentage of the previous foreign fund must be utilized before receiving the next installment?",
        options: ["25%", "50%", "75%", "100%"],
        optionsEn: ["25%", "50%", "75%", "100%"],
        correctIndex: 2,
        explanation: "नए नियमों के तहत कड़ा वित्तीय अनुपालन लागू करते हुए अगली किस्त जारी होने से पहले पिछले फंड का कम से कम 75% स्वीकृत गतिविधियों पर व्यय करना अनिवार्य है।",
        explanationEn: "To enforce strict financial discipline, the new rules mandate utilizing at least 75% of the existing funds before the next tranche is released."
      },
      {
        question: "विदेशी अंशदान (विनियमन) अधिनियम (FCRA) भारत में पहली बार किस वर्ष लागू किया गया था?",
        questionEn: "In which year was the Foreign Contribution Regulation Act (FCRA) first enacted in India?",
        options: ["1976", "1991", "2010", "2020"],
        optionsEn: ["1976", "1991", "2010", "2020"],
        correctIndex: 0,
        explanation: "FCRA पहली बार आपातकाल के दौरान वर्ष 1976 में लागू किया गया था। बाद में वर्ष 2010 में इसे नए रूप में दोबारा लागू किया गया।",
        explanationEn: "FCRA was first enacted in 1976 during the Emergency, and was later replaced by a new act in 2010."
      },
      {
        question: "निम्नलिखित में से कौन-सा व्यक्ति या संस्था FCRA के तहत विदेशी अंशदान प्राप्त करने के लिए प्रतिबंधित (Prohibited) है?",
        questionEn: "Which of the following individuals/entities are prohibited from receiving foreign contributions under FCRA?",
        options: [
          "चुनाव उम्मीदवार और न्यायाधीश",
          "सांसद और विधायक",
          "सरकारी कर्मचारी और राजनीतिक दल",
          "उपर्युक्त सभी"
        ],
        optionsEn: [
          "Election candidates and Judges",
          "MPs and MLAs",
          "Government employees and Political parties",
          "All of the above"
        ],
        correctIndex: 3,
        explanation: "कानून के अनुसार न्यायाधीश, सरकारी कर्मचारी, सांसद, विधायक, चुनाव उम्मीदवार, राजनीतिक दल और पंजीकृत समाचार पत्रों के संपादक/प्रकाशक विदेशी धन प्राप्त करने के लिए पूर्णतः प्रतिबंधित हैं।",
        explanationEn: "Legislative members, judges, public servants, political parties, election candidates, and editors/publishers of registered media are strictly barred from receiving foreign funds."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "FCRA का नोडल मंत्रालय कौन-सा है?",
        questionEn: "Which is the nodal ministry for FCRA?",
        answer: "FCRA (विदेशी अंशदान विनियमन अधिनियम) का नोडल मंत्रालय गृह मंत्रालय (Ministry of Home Affairs - MHA) है जो सभी NGO पंजीकरण और विदेशी फंड के उपयोग की निगरानी करता है।",
        answerEn: "The Ministry of Home Affairs (MHA) serves as the nodal ministry, overseeing NGO registration and monitoring foreign contribution inflows."
      },
      {
        question: "FCRA के अंतर्गत विदेशी अंशदान प्राप्त करने हेतु अनिवार्य बैंक खाता कहाँ खोला जाता है?",
        questionEn: "Where must the mandatory bank account for FCRA be opened?",
        answer: "सभी विदेशी अनुदान सबसे पहले स्टेट बैंक ऑफ इंडिया (SBI), नई दिल्ली मुख्य शाखा (संसद मार्ग) में खोले गए विशिष्ट FCRA खाते में ही प्राप्त होने चाहिए।",
        answerEn: "All foreign funding must flow first into a designated FCRA account located exclusively at the State Bank of India, New Delhi Main Branch."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Ministry of Home Affairs (MHA), Govt of India", url: "https://mha.gov.in" },
      { label: "FCRA Online Services Portal Portal", url: "https://fcraonline.nic.in" },
      { label: "Supreme Court of India (Noel Harper Judgment)", url: "https://sci.gov.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded FCRA Amendment Rules 2026 Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
