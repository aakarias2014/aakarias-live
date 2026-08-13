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

// Helper to convert an array of strings into separate Portable Text blocks with Markdown link parsing
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

    // Parse simple markdown links [Text](URL) in text if present
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const children: any[] = [];
    const markDefs: any[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        children.push({
          _key: `span-t-${idx}-${children.length}-${randomSuffix}`,
          _type: "span",
          text: text.substring(lastIndex, match.index),
        });
      }
      const linkKey = `link-${idx}-${markDefs.length}-${randomSuffix}`;
      markDefs.push({
        _key: linkKey,
        _type: "link",
        href: match[2],
      });
      children.push({
        _key: `span-l-${idx}-${children.length}-${randomSuffix}`,
        _type: "span",
        text: match[1],
        marks: [linkKey],
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      children.push({
        _key: `span-e-${idx}-${children.length}-${randomSuffix}`,
        _type: "span",
        text: text.substring(lastIndex),
      });
    }

    return {
      _key: `block-${idx}-${randomSuffix}`,
      _type: "block",
      style: "normal",
      markDefs: markDefs.length > 0 ? markDefs : undefined,
      children: children.length > 0 ? children : [
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
  console.log("🚀 Starting Top-Rank SEO & Interlinking optimization for Transgender Persons Amendment Act 2026...");

  // Existing image asset IDs already in Sanity
  const assetFeaturedId = "image-90f88afda06cec008d7366f7daf6222e25dc3ffd-1024x1024-jpg";
  const assetDmOfficeId = "image-04fdcdeb6c51f7431d9141c423c82f74e60329f5-1024x1024-jpg";
  const assetRightsBookId = "image-e6f9dc6e68a180b49d3c0de3cfc6ab8864a2b443-1024x1024-jpg";

  const articleSlug = "transgender-persons-amendment-act-2026-mppsc-upsc-notes";

  const article = {
    _id: "ca-transgender-persons-amendment-act-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: articleSlug },
    title: "उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम, 2026 (Transgender Persons Amendment Act 2026) | MPPSC & UPSC के लिए मुख्य प्रावधान, धारा 18, प्रमाण-पत्र व PDF",
    titleEn: "Transgender Persons (Protection of Rights) Amendment Act 2026: Key Provisions, Definitions, Section 18, PAA & MPPSC / UPSC Notes PDF",
    excerpt: "उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम, 2026 का संपूर्ण SEO और परीक्षा विश्लेषण। 30 मार्च 2026 को राष्ट्रपति मंजूरी। MPPSC (पेपर-2: सामाजिक-कानूनी सुरक्षा व राजव्यवस्था) एवं UPSC के लिए 2019 अधिनियम में अंतर, सामाजिक-सांस्कृतिक पहचान (हिजड़ा, अरावणी, जोगता), किन्नर व ट्रांसजेंडर में अंतर, धारा 18 सजा, जिला मजिस्ट्रेट प्रमाण-पत्र व 8 MCQs हिंदी व अंग्रेजी में।",
    excerptEn: "Comprehensive Google SERP & AI search top-ranking study guide on the Transgender Persons (Protection of Rights) Amendment Act 2026. Covers passage dates (30 March 2026), 2019 vs 2026 comparison, Hijra/Aravani/Jogta identities, Section 18 penalties, DM Certificate, NALSA Judgement, model Mains Q&A, 8 MCQs and FAQs for MPPSC & UPSC.",
    ca_date: "2026-08-13",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 12,
    keywords: [
      "Transgender Persons Amendment Act 2026",
      "transgender persons amendment act 2026 upsc",
      "transgender persons protection of rights amendment act 2026",
      "transgender persons protection of rights amendment act 2026 pdf",
      "Trans Bill 2026 summary",
      "Transgender Amendment Act, 2026 UPSC",
      "Transgender Bill 2026 India",
      "Transgender bill 2026 kya hai",
      "Transgender Bill 2026 in hindi",
      "उभयलिंगी व्यक्ति अधिकारों का संरक्षण संशोधन अधिनियम 2026",
      "ट्रांसजेंडर के लिए नया कानून क्या है",
      "ट्रांसजेंडर के संवैधानिक अधिकार क्या हैं",
      "किन्नर और ट्रांसजेंडर में क्या अंतर होता है",
      "ट्रांसजेंडर प्रोटेक्शन एक्ट 2019 क्या है",
      "Section 18 Transgender Act",
      "Certificate of Identity District Magistrate Transgender",
      "NALSA Judgement 2014 Transgender Rights",
      "MPPSC Mains Paper 2 Governance",
      "MPPSC Polity Notes PDF"
    ],
    category: { _type: "reference", _ref: "cat-polity" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["MPPSC-Paper-2", "GS-2", "Prelims-GS"],

    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetFeaturedId },
      alt: "Transgender Persons Protection of Rights Amendment Act 2026 MPPSC UPSC Notes Sansad Bhavan Parliament",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Featured Snippet / Quick Summary Box ────────────── */
      {
        _key: "sec-featured-snippet",
        kind: "whyInNews",
        title: "उभयलिंगी व्यक्ति संशोधन अधिनियम 2026: मुख्य बिंदु (Quick Overview)",
        titleEn: "Transgender Persons Amendment Act 2026: Quick Overview",
        body: [
          ...createBlocks([
            "• **विधेयक व अधिनियम का नाम**: उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम, 2026 / Transgender Persons (Protection of Rights) Amendment Act, 2026",
            "• **मूल कानून**: ट्रांसजेंडर व्यक्ति (अधिकारों का संरक्षण) अधिनियम, 2019 (Parent Act 2019)",
            "• **संसदीय मंजूरी की तिथियाँ**: लोकसभा में पेश (**13 मार्च 2026**) | लोकसभा पारित (**24 मार्च 2026**) | राज्यसभा पारित (**25 मार्च 2026**) | राष्ट्रपति मंजूरी (**30 मार्च 2026** को अधिनियम बना)",
            "• **प्रमाण-पत्र जारीकर्ता प्राधिकरण**: जिला मजिस्ट्रेट (District Magistrate - DM)",
            "• **सजा व दंड का प्रावधान (धारा 18)**: जबरन श्रम, घर से निकालने व प्रताड़ना पर **6 माह से 2 वर्ष तक का कारावास व जुर्माना**",
            "• **शामिल पहचानें**: हिजड़ा, अरावणी, जोगता, नपुंसक (यूनक) तथा इंटरसेक्स विविधताएँ (Intersex Variations)",
            "• **परीक्षा उपयोगिता**: [MPPSC मुख्य परीक्षा पाठ्यक्रम](/mppsc/mains-syllabus) (द्वितीय प्रश्नपत्र - सामाजिक विधान व शासन व्यवस्था) तथा [MPPSC प्रारंभिक परीक्षा](/mppsc/prelims-syllabus) (इकाई 5: भारतीय राजव्यवस्था)"
          ]),
          createTable(
            "table-transgender-quick-facts-hi",
            "ट्रांसजेंडर व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम 2026: मुख्य बिंदु",
            ["पैरामीटर / विषय", "नवीनतम कानूनी प्रावधान"],
            [
              ["**अधिनियम का नाम**", "**उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम, 2026**"],
              ["**राष्ट्रपति की मंजूरी**", "**30 मार्च 2026 (Formal Enactment Date)**"],
              ["**मूल अधिनियम**", "**ट्रांसजेंडर व्यक्ति (अधिकारों का संरक्षण) अधिनियम, 2019**"],
              ["**पहचान प्रमाण-पत्र प्राधिकारी**", "**जिला मजिस्ट्रेट (District Magistrate)**"],
              ["**अपराध व दंड की धारा**", "**धारा 18 (6 माह से 2 वर्ष कारावास + जुर्माना)**"],
              ["**शामिल सामाजिक-सांस्कृतिक वर्ग**", "**हिजड़ा, अरावणी, जोगता, नपुंसक व इंटरसेक्स विविधताएँ**"],
              ["**अपवर्जन सीमा (Exclusion)**", "**केवल पृथक Sexual Orientation वाले व्यक्ति अधिनियम से बाहर**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "• **Act Name**: Transgender Persons (Protection of Rights) Amendment Act, 2026",
            "• **Parent Legislation**: Transgender Persons (Protection of Rights) Act, 2019",
            "• **Enactment Date**: Introduced 13 March 2026, Passed Lok Sabha 24 March 2026, Passed Rajya Sabha 25 March 2026, Presidential Assent **30 March 2026**.",
            "• **Certifying Authority**: District Magistrate (DM)",
            "• **Penalty Clause**: Section 18 prescribes **6 months to 2 years imprisonment with fine** for offences against transgender persons.",
            "• **Target Exams**: Crucial for [MPPSC Mains Paper-2](/mppsc/mains-syllabus) and UPSC GS-2 Governance."
          ]),
          createTable(
            "table-transgender-quick-facts-en",
            "Transgender Persons Amendment Act 2026: Key Highlights",
            ["Parameter", "Details"],
            [
              ["**Act Title**", "**Transgender Persons (Protection of Rights) Amendment Act, 2026**"],
              ["**Enactment Date**", "**30 March 2026**"],
              ["**Parent Act**", "**Transgender Persons (Protection of Rights) Act, 2019**"],
              ["**Identity Authority**", "**District Magistrate (DM)**"],
              ["**Penalty Section**", "**Section 18 (6 months to 2 years imprisonment + fine)**"],
              ["**Socio-Cultural Groups**", "**Hijra, Aravani, Jogta, Eunuch & Intersex Variations**"]
            ]
          )
        ],
      },

      /* ── 2. Parent Act 2019 vs 2026 Amendment Comparison ─────── */
      {
        _key: "sec-comparison-table",
        kind: "keyHighlights",
        title: "2019 के मूल अधिनियम एवं 2026 संशोधन में अंतर व तुलना (2019 vs 2026 Comparison)",
        titleEn: "Comparison: 2019 Parent Act vs 2026 Amendment Act",
        body: [
          ...createBlocks([
            "### 1. 2019 के मूल अधिनियम के प्रमुख उद्देश्य",
            "वर्ष 2019 के मूल कानून का प्राथमिक ध्यान निम्नलिखित सामाजिक व कानूनी सुधारों पर था:",
            "• **अधिकारों की रक्षा**: शिक्षा, स्वास्थ्य सेवा, रोजगार तथा सार्वजनिक स्थलों के उपयोग में समानता और सुरक्षा।",
            "• **पहचान की कानूनी मान्यता**: स्व-निर्धारित लैंगिक पहचान (Self-perceived Gender Identity) का अधिकार देना।",
            "• **भेदभाव का प्रतिषेध**: सरकारी व निजी प्रतिष्ठानों में लिंग आधारित किसी भी प्रकार के भेदभाव को गैर-कानूनी घोषित करना।",
            "• **कल्याणकारी नीतियाँ**: पुनर्वास, कौशल प्रशिक्षण, चिकित्सा सहायता तथा सामाजिक सुरक्षा कार्ड प्रदान करना।",
            "### 2. 2026 संशोधन के माध्यम से किए गए मुख्य सुधार",
            "• **परिभाषा का स्पष्टीकरण**: 2019 के अधिनियम में अत्यधिक व्यापक परिभाषा के कारण उत्पन्न प्रशासनिक भ्रम को दूर करते हुए 2026 में विशिष्ट सूचीबद्ध श्रेणियों को निर्धारित किया गया।",
            "• **यौन अभिविन्यास का अपवर्जन (Exclusion of Sexual Orientation)**: 2026 के संशोधन में यह स्पष्ट किया गया है कि जिन व्यक्तियों की केवल सेक्सुअल ओरिएंटेशन (Sexual Orientation) अलग है, वे इसमें शामिल नहीं होंगे।",
            "• **प्रशासनिक सुरक्षा मानक**: जिला मजिस्ट्रेट द्वारा जारी प्रमाण-पत्र प्रक्रिया में 2020 के नियमों (धारा 6 के शपथपत्र आवेदन) के साथ नए सत्यापन मानक जोड़े गए हैं।",
            "• **संबंधित सामाजिक विधान लिंक**: [MPPSC समान नागरिक संहिता (UCC) विधेयक](/current-affairs/mp-ucc-bill-2026-mppsc-upsc-notes) तथा [महिलाओं की सुरक्षा कानून](/general-awareness/women-safety-laws-india-mppsc-notes) भी इसी श्रेणी के अंतर्गत आते हैं।"
          ]),
          createTable(
            "table-comparison-2019-2026-hi",
            "मूल अधिनियम 2019 बनाम संशोधन अधिनियम 2026: तुलनात्मक विश्लेषण",
            ["तुलना का आधार", "2019 का मूल अधिनियम", "2026 का संशोधन अधिनियम"],
            [
              ["**परिभाषा का दायरा**", "अत्यधिक व्यापक एवं स्व-पहचान आधारित", "सूचीबद्ध श्रेणियों, इंटरसेक्स व जबरन पहचान पर आधारित"],
              ["**यौन अभिविन्यास (Sexual Orientation)**", "स्पष्ट अंतर का अभाव था", "केवल Sexual Orientation वाले व्यक्तियों को स्पष्ट रूप से बाहर रखा गया"],
              ["**सामाजिक-सांस्कृतिक वर्ग**", "सामान्य ट्रांसजेंडर शब्द का प्रयोग", "हिजड़ा, अरावणी, जोगता को स्पष्ट रूप से सूचीबद्ध किया गया"],
              ["**इंटरसेक्स प्रावधान**", "आंशिक उल्लेख", "रिप्रोडक्टिव व सेक्सुअल संरचनात्मक परिस्थितियों का स्पष्ट वर्गीकरण"],
              ["**प्रमाण-पत्र प्रक्रिया**", "2020 नियमों के तहत शपथपत्र-आधारित", "जिला मजिस्ट्रेट द्वारा सुदृढ़ प्रशासनिक सत्यापन मानक"]
            ]
          ),
          {
            _key: "b-img-rights-book",
            _type: "image",
            asset: { _type: "reference", _ref: assetRightsBookId },
            alt: "Transgender Rights Protection Law Book and Scale of Justice MPPSC UPSC Notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Comparison: 2019 Act vs 2026 Amendment",
            "• **2019 Parent Act**: Broad self-perceived gender identity framework focusing on non-discrimination and welfare.",
            "• **2026 Amendment**: Refines statutory definitions into explicit listed categories, removes vague overlaps with sexual orientation, and strengthens DM certification guidelines."
          ]),
          createTable(
            "table-comparison-2019-2026-en",
            "Parent Act 2019 vs Amendment Act 2026: Comparative Breakdown",
            ["Parameter", "2019 Parent Act", "2026 Amendment Act"],
            [
              ["**Definition Ambit**", "Broad & self-perceived", "Specific listed categories & intersex variations"],
              ["**Sexual Orientation**", "Lacked explicit boundary", "Distinct sexual orientation alone explicitly excluded"],
              ["**Socio-Cultural Groups**", "Generic transgender term", "Explicit recognition of Hijra, Aravani, Jogta"],
              ["**Certifying Process**", "2020 Rules affidavit model", "Enhanced DM administrative verification"]
            ]
          )
        ],
      },

      /* ── 3. Differences: Kinnar, Hijra, Transgender, Intersex ──── */
      {
        _key: "sec-differences-identities",
        kind: "analysis",
        title: "किन्नर, हिजड़ा, अरावणी, जोगता, ट्रांसजेंडर और इंटरसेक्स में क्या अंतर होता है?",
        titleEn: "Differences Between Kinnar, Hijra, Aravani, Jogta, Transgender & Intersex",
        body: [
          ...createBlocks([
            "गूगल सर्च एवं प्रतियोगी परीक्षाओं (MPPSC & UPSC) में अक्सर यह प्रश्न पूछा जाता है कि पारंपरिक पहचानों और आधुनिक शब्दावली में क्या मुख्य अंतर है:",
            "### 1. ट्रांसजेंडर (Transgender)",
            "• **परिभाषा**: यह एक व्यापक छाता शब्द (Umbrella Term) है, जो ऐसे व्यक्तियों के लिए उपयोग किया जाता है जिनकी लैंगिक पहचान (Gender Identity) जन्म के समय निर्दिष्ट लिंग (Assigned Sex at Birth) से भिन्न होती है।",
            "### 2. किन्नर एवं हिजड़ा (Kinnar & Hijra)",
            "• **पारंपरिक सामाजिक-सांस्कृतिक पहचान**: 'हिजड़ा' या 'किन्नर' भारतीय उपमहाद्वीप की एक प्राचीन और पारंपरिक सामाजिक-सांस्कृतिक ट्रांसजेंडर पहचान है।",
            "• **सामुदायिक जीवन**: इनका अपना एक सुगठित सामाजिक ताना-बाना (जैसे गुरु-चेला परंपरा) और सांस्कृतिक रीति-रिवाज होते हैं।",
            "### 3. अरावणी एवं जोगता (Aravani & Jogta)",
            "• **अरावणी (Aravani)**: मुख्य रूप से तमिलनाडु एवं दक्षिण भारत का पारंपरिक ट्रांसजेंडर समुदाय, जो कूटान्डवर मंदिर उत्सव से जुड़ा है।",
            "• **जोगता (Jogta)**: महाराष्ट्र, कर्नाटक व आंध्र प्रदेश के ग्रामीण क्षेत्रों में यल्लम्मा देवी की पारंपरिक धार्मिक सेवा से जुड़ी पहचान।",
            "### 4. इंटरसेक्स (Intersex)",
            "• **जैविक भिन्नता (Biological Variation)**: इंटरसेक्स एक पूर्णतः जैविक/शारीरिक स्थिति है, जिसमें व्यक्ति जन्मजात रूप से ऐसी आनुवंशिक, गुणसूत्रीय (Chromosomal) या शारीरिक संरचना के साथ जन्म लेता है जो पारंपरिक पुरुष या महिला के मानक जैविक लक्षणों से मेल नहीं खाती।",
            "• **अंतर्संबंधित नोट्स**: [आपदा प्रबंधन संशोधन अधिनियम 2025](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes) तथा [73वें और 74वें संविधान संशोधन नोट्स](/general-awareness/73-74-amendment-act-panchayati-raj-mppsc-notes) भी सामाजिक न्याय के अंतर्गत आते हैं।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Key Differences Among Terminology",
            "• **Transgender**: Umbrella term for persons whose gender identity differs from their assigned sex at birth.",
            "• **Hijra / Kinnar**: Traditional socio-cultural South Asian transgender community with distinct cultural systems.",
            "• **Aravani & Jogta**: Regional socio-cultural and socio-religious traditional identities in Tamil Nadu and Deccan regions.",
            "• **Intersex**: Biological variation where a person is born with reproductive or sexual anatomy that does not conform to standard male or female biological norms."
          ])
        ],
      },

      /* ── 4. Section 18 Offences & DM Certificate ──────────────── */
      {
        _key: "sec-section18-dm-cert",
        kind: "keyHighlights",
        title: "धारा 18 (अपराध व दंड), पहचान प्रमाण-पत्र (DM Certificate) व 2020 नियम",
        titleEn: "Section 18 Offences, DM Identity Certificate & 2020 Rules",
        body: [
          ...createBlocks([
            "### 1. 2019 अधिनियम की धारा 18 के तहत अपराध एवं सजा",
            "मूल अधिनियम की **धारा 18** ट्रांसजेंडर व्यक्तियों के मानवाधिकारों के उल्लंघन पर कड़े दंड का प्रावधान करती है। इसमें निम्नलिखित 4 मुख्य अपराधों को संज्ञेय अपराध माना गया है:",
            "• **1. जबरन या बंधुआ श्रम (Forced Labour)**: किसी ट्रांसजेंडर व्यक्ति को उसकी इच्छा के विरुद्ध जबरन काम कराने या भीख मांगने के लिए विवश करना।",
            "• **2. सार्वजनिक स्थान का निषेध (Denial of Public Spaces)**: शैक्षणिक संस्थानों, अस्पतालों, परिवहन या सार्वजनिक सुविधाओं के उपयोग से रोकना।",
            "• **3. घर या गांव से बेदखली (Forced Eviction)**: किसी व्यक्ति को उसके निवास स्थान, परिवार या गांव को छोड़ने पर मजबूर करना।",
            "• **4. शारीरिक या मानसिक प्रताड़ना (Physical / Mental Harm)**: शारीरिक चोट, यौन शोषण या भावनात्मक प्रताड़ना देना।",
            "• **दंड**: इन अपराधों के दोषियों के लिए **6 माह से 2 वर्ष तक का कठोर कारावास** तथा **जुर्माने** का कानूनी प्रावधान है।",
            "### 2. जिला मजिस्ट्रेट द्वारा पहचान प्रमाण-पत्र (Certificate of Identity by DM)",
            "• **आवेदन प्रक्रिया**: ट्रांसजेंडर व्यक्ति पहचान प्रमाण-पत्र प्राप्त करने के लिए अपने संबंधित **जिला मजिस्ट्रेट (District Magistrate - DM)** के समक्ष आवेदन कर सकता है।",
            "• **कानूनी मान्यता**: जिला मजिस्ट्रेट द्वारा जारी यह प्रमाण-पत्र व्यक्ति को सभी सरकारी योजनाओं, राशन कार्ड, आधार, पासपोर्ट और शैक्षणिक प्रमाणपत्रों में उसकी पहचान दर्ज कराने का कानूनी अधिकार देता है।",
            "### 3. वर्ष 2020 के नियम एवं धारा 6 का शपथपत्र (2020 Rules & Affidavit)",
            "• **धारा 6 के तहत शपथपत्र**: 2020 में जारी नियमों की धारा 6 के अनुसार आवेदक को एक **शपथपत्र (Affidavit)** प्रस्तुत करना होता था, जिसमें स्व-घोषणा के आधार पर पहचान दर्ज की जाती थी।"
          ]),
          {
            _key: "b-img-dm-office",
            _type: "image",
            asset: { _type: "reference", _ref: assetDmOfficeId },
            alt: "District Magistrate Certificate of Identity Transgender Act 2026 MPPSC UPSC Notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Section 18 Offences & Penalties",
            "Section 18 penalizes 4 specific offences against transgender persons:",
            "• Forced or bonded labor / involuntary begging.",
            "• Denial of access to public places, educational institutions, or hospitals.",
            "• Forced eviction from home or village.",
            "• Physical, sexual, or emotional harm.",
            "• **Penalty**: Imprisonment from 6 months to 2 years with fine.",
            "### Certificate of Identity",
            "• Issued by the **District Magistrate (DM)** upon application to grant official legal recognition."
          ])
        ],
      },

      /* ── 5. Constitutional Safeguards & NALSA Judgement ───────── */
      {
        _key: "sec-constitution-nalsa",
        kind: "analysis",
        title: "भारत में ट्रांसजेंडर व्यक्तियों के संवैधानिक अधिकार एवं NALSA फैसला (2014)",
        titleEn: "Constitutional Safeguards & Landmark NALSA Judgement (2014)",
        body: [
          ...createBlocks([
            "भारतीय संविधान के तहत ट्रांसजेंडर व्यक्तियों के अधिकारों की सुरक्षा हेतु प्रमुख संवैधानिक प्रावधान निम्नलिखित हैं:",
            "### 1. संवैधानिक अनुच्छेद (Constitutional Articles)",
            "• **अनुच्छेद 14 (समता का अधिकार)**: विधि के समक्ष समता और विधियों के समान संरक्षण का अधिकार सभी व्यक्तियों (तृतीय लिंग सहित) को प्राप्त है।",
            "• **अनुच्छेद 15 व 16 (भेदभाव का प्रतिषेध)**: धर्म, मूलवंश, जाति, लिंग (Sex/Gender) के आधार पर सार्वजनिक स्थानों व सरकारी रोजगार में भेदभाव पर रोक।",
            "• **अनुच्छेद 19(1)(a) (वाक व अभिव्यक्ति की स्वतंत्रता)**: अपनी लैंगिक पहचान, पोशाक और पहनावे को व्यक्त करने की पूर्ण स्वतंत्रता।",
            "• **अनुच्छेद 21 (प्राण एवं दैहिक स्वतंत्रता का अधिकार)**: मानवीय गरिमा के साथ जीने का अधिकार, जिसमें अपनी पहचान चुनने और निजता का अधिकार (Right to Privacy) शामिल है।",
            "### 2. ऐतिहासिक NALSA फैसला (NALSA Judgement 2014)",
            "• **सुप्रीम कोर्ट का ऐतिहासिक निर्णय**: वर्ष 2014 में **राष्ट्रीय कानूनी सेवा प्राधिकरण बनाम भारत संघ (NALSA vs Union of India)** मामले में सर्वोच्च न्यायालय ने ट्रांसजेंडर व्यक्तियों को **'तृतीय लिंग' (Third Gender)** के रूप में मान्यता दी।",
            "• **स्व-पहचान का अधिकार**: सुप्रीम कोर्ट ने स्पष्ट किया कि बिना किसी शल्य-चिकित्सा (Surgery) के व्यक्ति को अपनी लैंगिक पहचान चुनने का अधिकार संविधान के अनुच्छेद 21 का अभिन्न अंग है।",
            "• **संबद्ध संविधान अध्ययन**: [संविधान सभा का गठन व इतिहास](/general-awareness/constituent-assembly-formation-history-mppsc-notes) भी भारतीय संवैधानिक विकास का आधार है।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Constitutional Protections for Transgender Persons",
            "• **Article 14**: Right to Equality before Law.",
            "• **Articles 15 & 16**: Prohibition of discrimination on grounds of sex/gender in public employment and access.",
            "• **Article 19(1)(a)**: Right to Freedom of Expression including self-gender presentation.",
            "• **Article 21**: Right to Life and Personal Liberty with human dignity and self-perceived identity.",
            "### NALSA vs Union of India Judgement (2014)",
            "• The Supreme Court legally recognized transgender persons as the **'Third Gender'** and upheld self-perceived gender identity as a fundamental right under Article 21."
          ])
        ],
      },

      /* ── 6. Frequently Asked Questions ───────── */
      {
        _key: "sec-paa-google",
        kind: "faqSection",
        title: "अक्सर पूछे जाने वाले महत्वपूर्ण प्रश्न (Frequently Asked Questions)",
        titleEn: "Frequently Asked Questions (Key Doubts Cleared)",
        body: [
          ...createBlocks([
            "उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम, 2026 से संबंधित महत्वपूर्ण प्रश्नों के उत्तर नीचे दिए गए हैं:",
            "### Q1. ट्रांसजेंडर के लिए नया कानून क्या है? (What is the new law for transgenders?)",
            "**उत्तर**: भारत सरकार द्वारा पारित **उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम, 2026** नया कानून है। इसे 30 मार्च 2026 को राष्ट्रपति की मंजूरी मिली। यह 2019 के मूल कानून में संशोधन करके परिभाषा को सुदृढ़ करता है और जिला मजिस्ट्रेट द्वारा पहचान प्रमाण-पत्र प्रक्रिया को स्पष्ट करता है।",
            "### Q2. ट्रांसजेंडर के संवैधानिक अधिकार क्या हैं? (What are the constitutional rights of transgenders?)",
            "**उत्तर**: भारतीय संविधान के अनुच्छेद 14 (समानता का अधिकार), अनुच्छेद 15 व 16 (भेदभाव का प्रतिषेध), अनुच्छेद 19(1)(a) (अभिव्यक्ति की स्वतंत्रता) और अनुच्छेद 21 (गरिमापूर्ण जीवन व निजता का अधिकार) के तहत ट्रांसजेंडर व्यक्तियों को पूर्ण संवैधानिक सुरक्षा प्राप्त है।",
            "### Q3. किन्नर और ट्रांसजेंडर में क्या अंतर होता है? (What is the difference between Kinnar and Transgender?)",
            "**उत्तर**: 'ट्रांसजेंडर' एक व्यापक आधुनिक छाता शब्द है, जबकि 'किन्नर' (या हिजड़ा) भारतीय उपमहाद्वीप की एक पारंपरिक सामाजिक-सांस्कृतिक और सांस्कृतिक-धार्मिक पहचान है जिसका अपना एक विशिष्ट सामुदायिक ताना-बाना होता है।",
            "### Q4. ट्रांसजेंडर प्रोटेक्शन एक्ट 2019 क्या है? (What is Transgender Protection Act 2019?)",
            "**उत्तर**: यह 2019 में बना मूल अधिनियम है, जिसका उद्देश्य ट्रांसजेंडर व्यक्तियों के अधिकारों की रक्षा करना, उनकी पहचान को कानूनी मान्यता देना, शिक्षा व नौकरियों में भेदभाव रोकना और कल्याणकारी नीतियाँ बनाना था। 2026 में इसमें महत्वपूर्ण संशोधन किए गए हैं।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Frequently Asked Questions",
            "Key questions and answers regarding the Transgender Persons Amendment Act 2026:",
            "**Q1. What is the Transgender Persons Amendment Act 2026?**",
            "Answer: It is an amending legislation enacted on 30 March 2026 to refine statutory definitions, protect socio-cultural identities (Hijra, Aravani, Jogta), specify Section 18 penalties, and streamline DM identity certificates.",
            "**Q2. What are the constitutional rights of transgender persons in India?**",
            "Answer: Rights guaranteed under Articles 14, 15, 16, 19(1)(a), and Article 21 as affirmed by the 2014 NALSA Supreme Court judgement.",
            "**Q3. Who issues the Certificate of Identity to a transgender person?**",
            "Answer: The District Magistrate (DM) of the respective district."
          ])
        ],
      },

      /* ── 7. Model Mains Q&A for MPPSC Mains Paper 2 ──────────── */
      {
        _key: "sec-mains-model-qa",
        kind: "mainsAnswerWriting",
        title: "MPPSC मुख्य परीक्षा मॉडल प्रश्नोत्तर (Mains Model Q&A - Paper 2)",
        titleEn: "MPPSC Mains Model Answer Writing - Paper 2 Governance",
        body: [
          ...createBlocks([
            "### मॉडल प्रश्न (MPPSC मुख्य परीक्षा - 11 अंक / 200 शब्द)",
            "**प्रश्न**: 'उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम, 2026 के प्रमुख बदलावों की विवेचना कीजिए। भारत में ट्रांसजेंडर समुदाय के सामाजिक-कानूनी सशक्तीकरण में यह अधिनियम कहाँ तक सहायक सिद्ध होगा?'",
            "### उत्तर प्रारूप एवं मुख्य बिंदु (Model Answer Outline)",
            "• **1. भूमिका (Introduction)**: 30 मार्च 2026 को राष्ट्रपति की मंजूरी के बाद लागू हुए उभयलिंगी व्यक्ति संशोधन अधिनियम, 2026 का संक्षिप्त परिचय दीजिए।",
            "• **2. 2026 अधिनियम के प्रमुख बदलाव (Key Provisions)**:",
            "  - स्पष्ट एवं विशिष्ट श्रेणियों का वर्गीकरण (हिजड़ा, अरावणी, जोगता, नपुंसक व इंटरसेक्स)।",
            "  - केवल यौन अभिविन्यास (Sexual Orientation) वाले व्यक्तियों का अपवर्जन।",
            "  - जिला मजिस्ट्रेट (DM) द्वारा प्रमाण-पत्र जारी करने की सुव्यवस्थित प्रक्रिया।",
            "  - धारा 18 के तहत अपराधों पर 6 माह से 2 वर्ष कारावास एवं जुर्माना।",
            "• **3. सामाजिक-कानूनी सशक्तीकरण में भूमिका (Impact & Significance)**:",
            "  - NALSA निर्णय (2014) के तहत अनुच्छेद 14, 15, 19 व 21 के संवैधानिक अधिकारों का सुदृढ़ीकरण।",
            "  - सामाजिक भेदभाव, जबरन बेदखली और बंधुआ श्रम से सुरक्षा।",
            "• **4. निष्कर्ष (Conclusion)**: प्रशासनिक संवेदनशीलता, त्वरित क्रियान्वयन और समाज में जागरूकता फैलाकर इस कानून को और अधिक प्रभावी बनाया जा सकता है।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### MPPSC Mains Model Question (11 Marks / 200 Words)",
            "**Question**: Discuss the key amendments introduced by the Transgender Persons (Protection of Rights) Amendment Act, 2026. How will it strengthen the socio-legal empowerment of transgender persons in India?",
            "**Model Answer Highlights**: Introduce enactment date (30 March 2026), highlight key definition overhaul, socio-cultural inclusions (Hijra, Aravani, Jogta), Section 18 penal provisions, DM identity certificate, and constitutional alignment with Articles 14, 15, 19, 21."
          ])
        ],
      },

      /* ── 8. Exam Point of View Summary Table ──────────────────── */
      {
        _key: "sec-exam-summary",
        kind: "keyHighlights",
        title: "EXAM POINT OF VIEW : परीक्षा की दृष्टि से महत्वपूर्ण तथ्य",
        titleEn: "EXAM POINT OF VIEW: Quick Revision Notes for MPPSC & UPSC",
        body: [
          ...createBlocks([
            "MPPSC (प्रारंभिक एवं मुख्य परीक्षा) तथा UPSC अभ्यर्थियों के लिए इस अधिनियम के सबसे महत्वपूर्ण स्मरणीय तथ्य नीचे संकलित किए गए हैं:",
            "• **मूल अधिनियम**: ट्रांसजेंडर व्यक्ति (अधिकारों का संरक्षण) अधिनियम, 2019",
            "• **संशोधन वर्ष**: 2026 (Transgender Persons Amendment Act, 2026)",
            "• **लोकसभा में प्रस्तुति**: 13 मार्च 2026",
            "• **लोकसभा की मंजूरी**: 24 मार्च 2026",
            "• **राज्यसभा की मंजूरी**: 25 मार्च 2026",
            "• **राष्ट्रपति की स्वीकृति**: 30 मार्च 2026 (कानून लागू)",
            "• **पहचान प्रमाण-पत्र जारीकर्ता प्राधिकरण**: जिला मजिस्ट्रेट (District Magistrate - DM)",
            "• **धारा 18 का विषय**: अपराध एवं दंड (6 माह से 2 वर्ष कारावास + जुर्माना)",
            "• **2020 नियम की विशेषता**: धारा 6 के तहत शपथपत्र-आधारित स्व-घोषणा आवेदन",
            "• **सम्बंधित अध्ययन सामग्री**: [MPPSC समान नागरिक संहिता (UCC) नोट्स](/current-affairs/mp-ucc-bill-2026-mppsc-upsc-notes) तथा [महिलाओं के सुरक्षा कानून नोट्स](/general-awareness/women-safety-laws-india-mppsc-notes)।"
          ]),
          createTable(
            "table-exam-summary-hi",
            "MPPSC / UPSC परीक्षा रिवीजन तालिका: उभयलिंगी व्यक्ति संशोधन अधिनियम 2026",
            ["परीक्षा उपयोगी बिंदु", "तथ्य / प्रावधान"],
            [
              ["**अधिनियम का नाम**", "**उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम, 2026**"],
              ["**अधिनियम बनने की तिथि**", "**30 मार्च 2026**"],
              ["**प्राधिकरण (प्रमाण-पत्र)**", "**जिला मजिस्ट्रेट (District Magistrate)**"],
              ["**अपराध व दंड की धारा**", "**धारा 18 (6 माह से 2 वर्ष कारावास + जुर्माना)**"],
              ["**शामिल पारंपरिक पहचानें**", "**हिजड़ा, अरावणी, जोगता, नपुंसक व इंटरसेक्स विविधताएँ**"],
              ["**अधिनियम से बाहर (Excluded)**", "**केवल यौन अभिविन्यास (Sexual Orientation) या Self-perceived sexual identity वाले व्यक्ति**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "Key summary bullet points for MPPSC Prelims/Mains and UPSC exams:",
            "• **Parent Act**: Transgender Persons (Protection of Rights) Act, 2019",
            "• **Amendment Act**: 2026",
            "• **Lok Sabha Introduced**: 13 March 2026",
            "• **Lok Sabha Passed**: 24 March 2026",
            "• **Rajya Sabha Passed**: 25 March 2026",
            "• **Presidential Assent**: 30 March 2026",
            "• **Issuing Authority for Certificate**: District Magistrate (DM)",
            "• **Section 18**: Offences & Penalties (6 months to 2 years imprisonment + fine)",
            "• **2020 Rules**: Affidavit-based application under Section 6"
          ]),
          createTable(
            "table-exam-summary-en",
            "MPPSC & UPSC Exam Summary: Transgender Persons Amendment Act 2026",
            ["Exam Topic", "Key Provision"],
            [
              ["**Act Name**", "**Transgender Persons (Protection of Rights) Amendment Act, 2026**"],
              ["**Date of Enactment**", "**30 March 2026**"],
              ["**Competent Authority**", "**District Magistrate (DM)**"],
              ["**Penalty Clause**", "**Section 18 (6 months to 2 years imprisonment + fine)**"],
              ["**Socio-Cultural Groups**", "**Hijra, Aravani, Jogta, Eunuch & Intersex Variations**"],
              ["**Exclusion Clause**", "**Persons with distinct Sexual Orientation alone**"]
            ]
          )
        ],
      },
    ],

    /* ─── FAQs ─────────────────────────────────────────────────── */
    faqs: [
      {
        question: "उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम, 2026 किस तिथि को लागू / अधिनियमित हुआ?",
        answer: "यह संशोधन विधेयक 13 मार्च 2026 को लोकसभा में पेश किया गया, जिसे 24 मार्च 2026 को लोकसभा तथा 25 मार्च 2026 को राज्यसभा ने पारित किया। 30 मार्च 2026 को राष्ट्रपति की स्वीकृति मिलने के बाद यह अधिनियम बन गया।",
        questionEn: "On which date was the Transgender Persons (Protection of Rights) Amendment Act, 2026 enacted?",
        answerEn: "The Amendment Bill was introduced in Lok Sabha on 13 March 2026, passed by Lok Sabha on 24 March 2026, passed by Rajya Sabha on 25 March 2026, and received Presidential assent on 30 March 2026 to become an Act.",
      },
      {
        question: "2026 के संशोधन अधिनियम के अनुसार पहचान प्रमाण-पत्र (Certificate of Identity) जारी करने का अधिकार किसके पास है?",
        answer: "अधिनियम के प्रावधानों के तहत ट्रांसजेंडर व्यक्ति जिला मजिस्ट्रेट (District Magistrate - DM) के समक्ष आवेदन करके पहचान प्रमाण-पत्र प्राप्त कर सकता है।",
        questionEn: "Which authority is empowered to issue the Certificate of Identity under the 2026 Amendment Act?",
        answerEn: "Under the provisions of the Act, a transgender person can apply to the District Magistrate (DM) to receive a Certificate of Identity.",
      },
      {
        question: "2026 के संशोधन में किन सामाजिक-सांस्कृतिक पहचानों को स्पष्ट रूप से शामिल किया गया है?",
        answer: "संशोधन में हिजड़ा, अरावणी, जोगता, नपुंसक (यूनक) तथा अन्य संबंधित पारंपरिक पहचानों एवं इंटरसेक्स विविधताओं (Intersex Variations) को शामिल किया गया है।",
        questionEn: "Which socio-cultural identities have been explicitly included in the 2026 Amendment?",
        answerEn: "The amendment explicitly incorporates socio-cultural identities such as Hijra, Aravani, Jogta, Eunuchs, and persons with Intersex Variations.",
      },
      {
        question: "मूल अधिनियम 2019 की धारा 18 किससे संबंधित है और इसमें क्या सजा का प्रावधान है?",
        answer: "धारा 18 ट्रांसजेंडर व्यक्तियों के खिलाफ होने वाले अपराधों (जबरन श्रम, सार्वजनिक स्थानों से रोकना, घर से निकालना, शारीरिक/मानसिक क्षति) तथा उनके लिए 6 माह से 2 वर्ष तक के कारावास एवं जुर्माने की सजा का प्रावधान करती है।",
        questionEn: "What is Section 18 of the parent 2019 Act concerned with, and what penalties does it prescribe?",
        answerEn: "Section 18 details offences against transgender persons (forced labor, denial of public access, forced eviction, physical/mental harm) and prescribes 6 months to 2 years imprisonment with fine.",
      },
      {
        question: "क्या 2026 के संशोधन अधिनियम में केवल सेक्सुअल ओरिएंटेशन (Sexual Orientation) वाले व्यक्तियों को शामिल किया गया है?",
        answer: "नहीं, 2026 के संशोधन में यह स्पष्ट किया गया है कि ऐसे व्यक्ति इसमें शामिल नहीं होंगे जिनकी केवल सेक्सुअल ओरिएंटेशन या self-perceived sexual identity अलग है।",
        questionEn: "Are individuals with distinct sexual orientation alone included under the 2026 Amendment Act?",
        answerEn: "No, the 2026 amendment explicitly clarifies that individuals with distinct sexual orientation or self-perceived sexual identity alone are not included under this definition.",
      },
      {
        question: "किन्नर और ट्रांसजेंडर में क्या अंतर होता है?",
        answer: "'ट्रांसजेंडर' एक व्यापक आधुनिक छाता शब्द है, जबकि 'किन्नर' या 'हिजड़ा' भारतीय उपमहाद्वीप का एक पारंपरिक सामाजिक-सांस्कृतिक समुदाय है जिसकी अपनी सांस्कृतिक रीति-रिवाज और परंपराएँ होती हैं।",
        questionEn: "What is the difference between Kinnar and Transgender?",
        answerEn: "'Transgender' is an umbrella term for gender identity, whereas 'Kinnar' or 'Hijra' represents a traditional South Asian socio-cultural community with distinct cultural systems.",
      },
      {
        question: "भारत में ट्रांसजेंडर व्यक्तियों के संवैधानिक अधिकार कौन-कौन से हैं?",
        answer: "भारतीय संविधान के अनुच्छेद 14 (समानता का अधिकार), अनुच्छेद 15 व 16 (भेदभाव का प्रतिषेध), अनुच्छेद 19(1)(a) (अभिव्यक्ति का अधिकार) तथा अनुच्छेद 21 (गरिमापूर्ण जीवन का अधिकार) मुख्य संवैधानिक सुरक्षा प्रदान करते हैं।",
        questionEn: "What are the key constitutional rights for transgender persons in India?",
        answerEn: "Protections under Articles 14, 15, 16, 19(1)(a), and Article 21 (Right to Life with Dignity) as affirmed by the Supreme Court NALSA judgment.",
      },
      {
        question: "MPPSC मुख्य परीक्षा में यह अधिनियम किस प्रश्नपत्र के अंतर्गत आता है?",
        answer: "यह विषय MPPSC मुख्य परीक्षा के द्वितीय प्रश्नपत्र (Paper 2: शासन व्यवस्था, राजव्यवस्था, सामाजिक न्याय एवं सामाजिक विधान) के अंतर्गत महत्वपूर्ण है।",
        questionEn: "Under which paper does this Act fall in the MPPSC Mains Syllabus?",
        answerEn: "This topic is vital under MPPSC Mains Paper 2 (Governance, Polity, Social Justice, and Social Legislations).",
      },
    ],

    /* ─── MCQs (EXACTLY 8 FOR CURRENT AFFAIRS) ───────────────── */
    mcqs: [
      {
        question: "ट्रांसजेंडर व्यक्ति (अधिकारों का संरक्षण) संशोधन विधेयक, 2026 को राष्ट्रपति की मंजूरी किस तिथि को प्राप्त हुई?",
        options: ["13 मार्च 2026", "24 मार्च 2026", "25 मार्च 2026", "30 मार्च 2026"],
        correctIndex: 3,
        explanation: "विधेयक 13 मार्च 2026 को लोकसभा में प्रस्तुत हुआ, 24 मार्च को लोकसभा तथा 25 मार्च को राज्यसभा द्वारा पारित किया गया और 30 मार्च 2026 को राष्ट्रपति की मंजूरी मिलने के साथ अधिनियम बन गया।",
        questionEn: "On which date did the Transgender Persons (Protection of Rights) Amendment Bill, 2026 receive Presidential assent?",
        optionsEn: ["13 March 2026", "24 March 2026", "25 March 2026", "30 March 2026"],
        explanationEn: "The Bill was introduced on 13 March 2026, passed by Lok Sabha on 24 March, passed by Rajya Sabha on 25 March, and received Presidential assent on 30 March 2026.",
      },
      {
        question: "अधिनियम के तहत ट्रांसजेंडर व्यक्ति के लिए पहचान प्रमाण-पत्र (Certificate of Identity) जारी करने हेतु अधिकृत प्राधिकारी कौन है?",
        options: ["सुप्रीम कोर्ट का मुख्य न्यायाधीश", "जिला मजिस्ट्रेट (District Magistrate)", "राज्य का राज्यपाल", "मुख्य चुनाव आयुक्त"],
        correctIndex: 1,
        explanation: "अधिनियम के प्रावधानों के अनुसार ट्रांसजेंडर व्यक्ति पहचान प्रमाण-पत्र प्राप्त करने के लिए जिला मजिस्ट्रेट (DM) के समक्ष आवेदन करता है।",
        questionEn: "Who is the competent authority to issue the Certificate of Identity to a transgender person under the Act?",
        optionsEn: ["Chief Justice of Supreme Court", "District Magistrate (DM)", "State Governor", "Chief Election Commissioner"],
        explanationEn: "Under the provisions of the Act, a transgender person applies to the District Magistrate (DM) to receive a Certificate of Identity.",
      },
      {
        question: "मूल अधिनियम (2019) की धारा 18 के अंतर्गत ट्रांसजेंडर व्यक्तियों के खिलाफ होने वाले अपराधों के लिए कितना दंड निर्धारित किया गया है?",
        options: ["1 माह से 3 माह कारावास", "6 माह से 2 वर्ष तक कारावास और जुर्माना", "5 वर्ष से 7 वर्ष कारावास", "केवल 1000 रुपये जुर्माना"],
        correctIndex: 1,
        explanation: "धारा 18 के तहत चार प्रमुख अपराधों (जबरन श्रम, सार्वजनिक स्थानों से रोकना, घर से निकालना, शारीरिक/मानसिक प्रताड़ना) के लिए 6 माह से 2 वर्ष तक की जेल और जुर्माने का प्रावधान है।",
        questionEn: "What penalty is prescribed under Section 18 of the parent 2019 Act for offences against transgender persons?",
        optionsEn: ["1 month to 3 months imprisonment", "6 months to 2 years imprisonment and fine", "5 years to 7 years imprisonment", "Fine of ₹1000 only"],
        explanationEn: "Section 18 prescribes imprisonment from 6 months to 2 years along with a fine for offences like forced labor, denial of access, forced eviction, and harm.",
      },
      {
        question: "2026 के संशोधन अधिनियम में निम्नलिखित में से किस सामाजिक-सांस्कृतिक पहचान को शामिल किया गया है?",
        options: ["हिजड़ा", "अरावणी", "जोगता", "उपरोक्त सभी"],
        correctIndex: 3,
        explanation: "संशोधन में हिजड़ा, अरावणी, जोगता, नपुंसक तथा अन्य क्षेत्रीय व पारंपरिक पहचानों को स्पष्ट रूप से शामिल किया गया है।",
        questionEn: "Which of the following socio-cultural identities is/are included under the 2026 Amendment Act?",
        optionsEn: ["Hijra", "Aravani", "Jogta", "All of the above"],
        explanationEn: "The 2026 Amendment explicitly includes Hijra, Aravani, Jogta, Eunuchs, and other traditional socio-cultural identities.",
      },
      {
        question: "2026 के संशोधन अधिनियम के अनुसार निम्नलिखित में से किसे ट्रांसजेंडर व्यक्ति की परिभाषा से बाहर रखा गया है?",
        options: ["इंटरसेक्स विविधताओं वाले व्यक्ति", "जोगता व अरावणी समुदाय", "केवल पृथक यौन अभिविन्यास (Sexual Orientation) वाले व्यक्ति", "नपुंसक (यूनक)"],
        correctIndex: 2,
        explanation: "संशोधन में यह स्पष्ट रूप से निर्धारित किया गया है कि ऐसे व्यक्ति इसमें शामिल नहीं होंगे जिनकी केवल Sexual Orientation या self-perceived sexual identity अलग है।",
        questionEn: "As per the 2026 Amendment Act, which group is explicitly excluded from the definition of transgender person?",
        optionsEn: ["Persons with intersex variations", "Jogta and Aravani communities", "Individuals with distinct sexual orientation alone", "Eunuchs"],
        explanationEn: "The amendment explicitly clarifies that individuals with distinct sexual orientation or self-perceived sexual identity alone are excluded.",
      },
      {
        question: "सर्वोच्च न्यायालय के किस ऐतिहासिक फैसले में ट्रांसजेंडर व्यक्तियों को 'तृतीय लिंग' (Third Gender) के रूप में कानूनी मान्यता दी गई?",
        options: ["नवतेज सिंह जोहर फैसला (2018)", "NALSA बनाम भारत संघ मामला (2014)", "के. एस. पुट्टस्वामी फैसला (2017)", "केशवानंद भारती मामला (1973)"],
        correctIndex: 1,
        explanation: "NALSA बनाम भारत संघ (2014) मामले में सर्वोच्च न्यायालय ने ट्रांसजेंडर व्यक्तियों को तृतीय लिंग के रूप में स्वीकार करते हुए अनुच्छेद 21 के तहत स्व-पहचान का अधिकार दिया।",
        questionEn: "In which landmark judgement did the Supreme Court recognize transgender persons as 'Third Gender'?",
        optionsEn: ["Navtej Singh Johar Judgement (2018)", "NALSA vs Union of India (2014)", "K.S. Puttaswamy Judgement (2017)", "Kesavananda Bharati Case (1973)"],
        explanationEn: "In NALSA vs Union of India (2014), the Supreme Court legally recognized transgender persons as Third Gender and affirmed self-perceived gender identity.",
      },
      {
        question: "वर्ष 2020 के नियमों में धारा 6 के तहत आवेदन की क्या विशेषता थी?",
        options: ["हाई कोर्ट द्वारा मौखिक आदेश", "शपथपत्र-आधारित आवेदन (Affidavit-based Application)", "केवल पासपोर्ट के आधार पर स्वीकृति", "मेडिकल बोर्ड का अनिवार्य भौतिक परीक्षण"],
        correctIndex: 1,
        explanation: "वर्ष 2020 के नियमों में धारा 6 के लिए शपथपत्र-आधारित आवेदन का प्रावधान था, जिसमें आवेदक स्वयं को ट्रांसजेंडर घोषित करता था।",
        questionEn: "What was the key feature of Section 6 applications under the Transgender Rules 2020?",
        optionsEn: ["Oral order by High Court", "Affidavit-based Application", "Acceptance solely via Passport", "Mandatory physical exam by Medical Board"],
        explanationEn: "Under the 2020 Rules, Section 6 provided an affidavit-based application where the applicant self-declared their status.",
      },
      {
        question: "MPPSC मुख्य परीक्षा की दृष्टि से उभयलिंगी व्यक्ति अधिनियम किस प्रश्नपत्र से संबंधित है?",
        options: ["इतिहास व संस्कृति", "द्वितीय प्रश्नपत्र (भारतीय राजव्यवस्था, सामाजिक विधान व सुशासन)", "भूगोल व पर्यावरण", "गणित व तार्किक योग्यता"],
        correctIndex: 1,
        explanation: "यह अधिनियम MPPSC मुख्य परीक्षा के द्वितीय प्रश्नपत्र (Paper 2: Polity, Governance & Social Legislations) तथा प्रारंभिक परीक्षा इकाई 5 हेतु अत्यंत महत्वपूर्ण है।",
        questionEn: "For MPPSC examination, the Transgender Persons Act is primarily associated with which paper?",
        optionsEn: ["History & Culture", "Mains Paper 2 (Polity, Social Legislation & Governance)", "Geography & Environment", "Mathematics & Aptitude"],
        explanationEn: "This Act is a core topic in MPPSC Mains Paper 2 (Governance, Polity, and Social Justice/Legislations) and Prelims Unit 5.",
      },
    ],
  };

  // Upload / Replace Article in Sanity
  console.log("💾 Uploading Top-Rank SEO & Interlinked currentAffairs article to Sanity...");
  const res = await client.createOrReplace(article);
  console.log(`✅ Successfully uploaded Top-Rank SEO Article to Sanity! Document ID: ${res._id}`);
}

main().catch((err) => {
  console.error("❌ Error uploading SEO article to Sanity:", err);
  process.exit(1);
});
