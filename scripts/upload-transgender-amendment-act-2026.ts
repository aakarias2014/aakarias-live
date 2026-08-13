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
  console.log("🚀 Starting upload for Transgender Persons (Protection of Rights) Amendment Act, 2026...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    featured: path.resolve(process.cwd(), "public/images/blog/transgender-act-2026-parliament.png"),
    dmOffice: path.resolve(process.cwd(), "public/images/blog/transgender-identity-certificate-dm.png"),
    rightsBook: path.resolve(process.cwd(), "public/images/blog/transgender-rights-protection-act.png"),
  };

  // Upload images to Sanity
  console.log("📸 Uploading images to Sanity...");
  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imagePaths.featured), {
    filename: "transgender_act_2026_parliament.png",
  });
  const assetDmOffice = await client.assets.upload("image", fs.createReadStream(imagePaths.dmOffice), {
    filename: "transgender_identity_certificate_dm.png",
  });
  const assetRightsBook = await client.assets.upload("image", fs.createReadStream(imagePaths.rightsBook), {
    filename: "transgender_rights_protection_act.png",
  });
  console.log(`✔ Uploaded assets:
    - Featured: ${assetFeatured._id}
    - DM Office: ${assetDmOffice._id}
    - Rights Book: ${assetRightsBook._id}`);

  // Construct Article Document
  const article = {
    _id: "ca-transgender-persons-amendment-act-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "transgender-persons-amendment-act-2026-mppsc-upsc-notes" },
    title: "उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम, 2026 (Transgender Persons Amendment Act 2026) | MPPSC & UPSC के लिए परीक्षा उपयोगी तथ्य, धारा 18 व प्रमाण-पत्र प्रक्रिया",
    titleEn: "Transgender Persons (Protection of Rights) Amendment Act 2026: Key Provisions, Definitions, Section 18 & MPPSC / UPSC Notes PDF",
    excerpt: "उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम, 2026 का संपूर्ण विश्लेषण। 30 मार्च 2026 को राष्ट्रपति की मंजूरी के बाद यह अधिनियम बना। MPPSC (पेपर-2: सामाजिक-कानूनी सुरक्षा व राजव्यवस्था) एवं UPSC के लिए 2019 अधिनियम में बदलाव, सामाजिक-सांस्कृतिक पहचान (हिजड़ा, अरावणी, जोगता), धारा 18 के तहत सजा और जिला मजिस्ट्रेट द्वारा पहचान प्रमाण-पत्र प्रक्रिया हिंदी एवं अंग्रेजी में पढ़ें।",
    excerptEn: "Complete exam-oriented analysis of the Transgender Persons (Protection of Rights) Amendment Act, 2026 enacted on 30 March 2026. Detailed study guide for MPPSC Mains Paper 2 and UPSC GS-2 covering parent 2019 Act, 2026 amendments, socio-cultural identities (Hijra, Aravani, Jogta), intersex provisions, Section 18 offences, and DM Certificate of Identity.",
    ca_date: "2026-08-13",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 10,
    keywords: [
      "Transgender Persons Amendment Act 2026",
      "उभयलिंगी व्यक्ति अधिकारों का संरक्षण संशोधन अधिनियम 2026",
      "Transgender Persons Protection of Rights Act 2019",
      "MPPSC Mains Paper 2 Governance",
      "MPPSC Polity Notes",
      "Section 18 Transgender Act",
      "Certificate of Identity District Magistrate Transgender",
      "Hijra Aravani Jogta legal recognition India",
      "Intersex rights India 2026",
      "Social Justice and Governance MPPSC UPSC"
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
    syllabus: ["MPPSC-Paper-2", "GS-2", "Prelims-GS"],

    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetFeatured._id },
      alt: "Transgender Persons Protection of Rights Amendment Act 2026 MPPSC UPSC Notes Sansad Bhavan Parliament",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Context & Passage Timeline ───────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "अधिनियम 2026 : एक नजर में (Context & Enactment Timeline)",
        titleEn: "Act 2026 At a Glance: Context & Legislative Timeline",
        body: [
          ...createBlocks([
            "हाल ही में भारत सरकार द्वारा **उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) संशोधन अधिनियम, 2026 (Transgender Persons (Protection of Rights) Amendment Act, 2026)** को संसद से पारित कर राष्ट्रपति की स्वीकृति प्राप्त की गई।",
            "• **संसदीय प्रक्रिया और तिथियाँ**: **ट्रांसजेंडर व्यक्ति (अधिकारों का संरक्षण) संशोधन विधेयक, 2026** को **13 मार्च 2026** को लोकसभा में प्रस्तुत किया गया। इसके बाद **लोकसभा ने 24 मार्च 2026** को तथा **राज्यसभा ने 25 मार्च 2026** को इसे मंजूरी प्रदान की। **30 मार्च 2026** को भारत के राष्ट्रपति की स्वीकृति मिलने के उपरांत यह औपचारिक अधिनियम बन गया।",
            "• **मूल कानून में संशोधन**: यह अधिनियम वर्ष 2019 के मूल कानून—**ट्रांसजेंडर व्यक्ति (अधिकारों का संरक्षण) अधिनियम, 2019 (Transgender Persons (Protection of Rights) Act, 2019)** में महत्वपूर्ण संशोधन करता है।",
            "• **परीक्षा उपयोगिता**: यह विषय [MPPSC मुख्य परीक्षा पाठ्यक्रम](/mppsc/mains-syllabus) (द्वितीय प्रश्नपत्र - शासन व्यवस्था, सामाजिक न्याय एवं भारतीय राजव्यवस्था) तथा [MPPSC प्रारंभिक परीक्षा](/mppsc/prelims-syllabus) (इकाई 5: भारत की संवैधानिक प्रणाली एवं सामाजिक विधान) के लिए अत्यंत महत्वपूर्ण है।"
          ]),
          createTable(
            "table-transgender-timeline-hi",
            "ट्रांसजेंडर व्यक्ति संशोधन अधिनियम, 2026: प्रमुख तिथियाँ एवं तथ्य (Quick Highlights)",
            ["संसदीय / प्रशासनिक चरण", "महत्वपूर्ण तिथि व विवरण"],
            [
              ["**लोकसभा में प्रस्तुति (Introduction)**", "**13 मार्च 2026**"],
              ["**लोकसभा मंजूरी (Lok Sabha Passed)**", "**24 मार्च 2026**"],
              ["**राज्यसभा मंजूरी (Rajya Sabha Passed)**", "**25 मार्च 2026**"],
              ["**राष्ट्रपति की मंजूरी (Presidential Assent)**", "**30 मार्च 2026 (अधिनियम बना)**"],
              ["**मूल अधिनियम (Parent Act)**", "**ट्रांसजेंडर व्यक्ति (अधिकारों का संरक्षण) अधिनियम, 2019**"],
              ["**पहचान प्रमाण-पत्र जारीकर्ता (Certificate Authority)**", "**जिला मजिस्ट्रेट (District Magistrate - DM)**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "The **Transgender Persons (Protection of Rights) Amendment Act, 2026** was enacted into law following Presidential assent on **30 March 2026**.",
            "• **Legislative Timeline**: Introduced in Lok Sabha on **13 March 2026**, passed by Lok Sabha on **24 March 2026**, passed by Rajya Sabha on **25 March 2026**, and assented to by the President on **30 March 2026**.",
            "• **Parent Legislation**: Amends the **Transgender Persons (Protection of Rights) Act, 2019**.",
            "• **Exam Relevance**: Highly relevant for [MPPSC Mains Paper-2](/mppsc/mains-syllabus) (Governance, Polity & Social Justice) and UPSC GS-2."
          ]),
          createTable(
            "table-transgender-timeline-en",
            "Transgender Persons Amendment Act 2026: Key Milestones",
            ["Milestone / Provision", "Details"],
            [
              ["**Introduction in Lok Sabha**", "**13 March 2026**"],
              ["**Passed by Lok Sabha**", "**24 March 2026**"],
              ["**Passed by Rajya Sabha**", "**25 March 2026**"],
              ["**Presidential Assent**", "**30 March 2026 (Enacted into Law)**"],
              ["**Parent Legislation**", "**Transgender Persons (Protection of Rights) Act, 2019**"],
              ["**Issuing Authority for Identity Certificate**", "**District Magistrate (DM)**"]
            ]
          )
        ],
      },

      /* ── 2. Parent Act Objectives vs 2026 Amendments ──────────── */
      {
        _key: "sec-objectives-changes",
        kind: "keyHighlights",
        title: "2019 के मूल अधिनियम का उद्देश्य एवं 2026 संशोधन में प्रमुख बदलाव",
        titleEn: "Objectives of 2019 Parent Act & Key Changes in 2026 Amendment",
        body: [
          ...createBlocks([
            "### 1. 2019 के मूल अधिनियम का उद्देश्य (Objectives of 2019 Act)",
            "वर्ष 2019 के मूल अधिनियम का मुख्य उद्देश्य ट्रांसजेंडर व्यक्तियों के कानूनी एवं सामाजिक कल्याण को सुनिश्चित करना था, जिसमें निम्नलिखित बातें शामिल थीं:",
            "• **अधिकारों की रक्षा**: शिक्षा, रोजगार, स्वास्थ्य सेवा और सार्वजनिक सुविधाओं में मौलिक व कानूनी अधिकारों की सुरक्षा।",
            "• **पहचान की मान्यता**: प्रत्येक ट्रांसजेंडर व्यक्ति की लैंगिक पहचान को कानूनी रूप से स्वीकार करना।",
            "• **भेदभाव से सुरक्षा**: किसी भी संस्था, प्रतिष्ठान या समाज द्वारा लैंगिक आधार पर किए जाने वाले भेदभाव का निषेध।",
            "• **कल्याणकारी उपाय**: पुनर्वसन, कौशल विकास, चिकित्सा सहायता और सामाजिक सुरक्षा योजनाओं का क्रियान्वयन।",
            "### 2. 2026 संशोधन में प्रमुख बदलाव (Major Changes in 2026 Amendment)",
            "• **परिभाषा का पुनर्गठन**: 2026 के संशोधन के बाद ट्रांसजेंडर व्यक्ति की परिभाषा को **सूचीबद्ध श्रेणियों**, **इंटरसेक्स विविधताओं (Intersex Variations)** तथा **जबरन ट्रांसजेंडर पहचान अपनाने के लिए बाध्य व्यक्तियों** के आधार पर निर्धारित किया गया है।",
            "• **विशिष्ट श्रेणियों का सूचीकरण**: संशोधन में पुरानी अत्यधिक व्यापक एवं अस्पष्ट परिभाषा को हटाकर कुछ विशिष्ट और स्पष्ट श्रेणियों को सूचीबद्ध किया गया है।",
            "• **यौन अभिविन्यास का स्पष्टीकरण (Exclusion of Sexual Orientation)**: संशोधन में यह स्पष्ट रूप से निर्धारित किया गया है कि ऐसे व्यक्ति इसमें शामिल नहीं होंगे जिनकी केवल **सेक्सुअल ओरिएंटेशन (Sexual Orientation)** अलग है या जिनकी **self-perceived sexual identity** अलग है। इससे ट्रांसजेंडर पहचान और लैंगिक अभिविन्यास के मध्य स्पष्ट कानूनी अंतर स्थापित किया गया है।"
          ]),
          {
            _key: "b-img-rights-book",
            _type: "image",
            asset: { _type: "reference", _ref: assetRightsBook._id },
            alt: "Transgender Rights Protection Law Book and Scale of Justice MPPSC UPSC Notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### 1. Objectives of the 2019 Parent Act",
            "• Protection of rights in education, employment, healthcare, and public spaces.",
            "• Legal recognition of self-perceived gender identity.",
            "• Protection against discrimination across public and private establishments.",
            "• Welfare measures, rehabilitation, and skill development schemes.",
            "### 2. Key Amendments in 2026",
            "• **Refined Definition**: Defines transgender persons based on listed specific categories, intersex variations, and individuals forced to adopt transgender identity.",
            "• **Removal of Broad Ambit**: Replaces vague definitions with specific, well-defined statutory categories.",
            "• **Exclusion of Sexual Orientation**: Explicitly clarifies that individuals with distinct sexual orientation or self-perceived sexual identity alone are not included under this definition."
          ]),
        ],
      },

      /* ── 3. Socio-Cultural Identities & Intersex Provisions ─────── */
      {
        _key: "sec-identities-intersex",
        kind: "analysis",
        title: "सामाजिक-सांस्कृतिक पहचानें एवं इंटरसेक्स से संबंधित प्रावधान",
        titleEn: "Socio-Cultural Identities & Intersex Provisions in 2026 Act",
        body: [
          ...createBlocks([
            "### 1. शामिल सामाजिक-सांस्कृतिक पहचानें (Socio-Cultural Identities Included)",
            "भारत की समृद्ध सांस्कृतिक विविधता और पारंपरिक सामाजिक संरचना को ध्यान में रखते हुए 2026 के संशोधन में सामाजिक-सांस्कृतिक पहचान से जुड़े कई विशिष्ट वर्गों को स्पष्ट रूप से शामिल किया गया है:",
            "• **हिजड़ा (Hijra)**: पारंपरिक दक्षिण एशियाई सामाजिक-सांस्कृतिक ट्रांसजेंडर समुदाय।",
            "• **अरावणी (Aravani)**: मुख्य रूप से तमिलनाडु एवं दक्षिण भारत में मान्यता प्राप्त ट्रांसजेंडर समुदाय।",
            "• **जोगता (Jogta)**: महाराष्ट्र, कर्नाटक व आंध्र प्रदेश क्षेत्र से जुड़ी पारंपरिक सामाजिक-धार्मिक पहचान।",
            "• **अन्य संबंधित पारंपरिक पहचानें**: भारत के विभिन्न राज्यों में प्रचलित अन्य क्षेत्रीय एवं पारंपरिक ट्रांसजेंडर पहचानें।",
            "### 2. इंटरसेक्स एवं संबंधित श्रेणियों से जुड़े प्रावधान (Intersex Provisions)",
            "अधिनियम में कुछ अन्य विशिष्ट जैविक व जैविक-सामाजिक श्रेणियों को भी सम्मिलित किया गया है:",
            "• **नपुंसक (यूनक / Eunuch)**: पारंपरिक जैविक या शल्य-चिकित्सीय श्रेणी।",
            "• **इंटरसेक्स से संबंधित व्यक्ति (Intersex Variations)**: ऐसे व्यक्ति जिनकी जन्मजात शारीरिक/आनुवंशिक संरचना पुरुष या महिला के मानक जैविक मानदंडों से भिन्न होती है।",
            "• **प्रजनन / लैंगिक संरचना के आधार पर वर्गीकरण**: इसमें ऐसे व्यक्तियों का भी उल्लेख है जिन्हें उनकी **रिप्रोडक्टिव (Reproductive)** या **सेक्सुअल संरचनाओं/लक्षणों** से संबंधित परिस्थितियों के आधार पर वर्गीकृत किया गया है।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### 1. Included Socio-Cultural Identities",
            "• **Hijra**: Traditional South Asian socio-cultural transgender identity.",
            "• **Aravani**: Recognized traditional identity primarily in Tamil Nadu and Southern India.",
            "• **Jogta**: Traditional socio-religious identity prevalent in Maharashtra, Karnataka, and Andhra Pradesh.",
            "• **Other Traditional Identities**: Regional cultural identities recognized across Indian states.",
            "### 2. Intersex & Biological Variations",
            "• **Eunuchs (नपुंसक)**: Explicitly incorporated under statutory categories.",
            "• **Persons with Intersex Variations**: Individuals born with reproductive or sexual anatomy that does not fit typical male or female biological definitions.",
            "• **Structural Anatomical Classification**: Encompasses conditions related to congenital reproductive or sexual structures."
          ])
        ],
      },

      /* ── 4. Section 18 & Certificate of Identity ───────────────── */
      {
        _key: "sec-section18-certificate",
        kind: "keyHighlights",
        title: "धारा 18 (अपराध व दंड), पहचान प्रमाण-पत्र और 2020 नियम",
        titleEn: "Section 18 Offences & Penalties, Identity Certificate & 2020 Rules",
        body: [
          ...createBlocks([
            "### 1. 2019 अधिनियम की धारा 18: अपराध एवं दंड के महत्वपूर्ण प्रावधान",
            "मूल अधिनियम की **धारा 18 (Section 18)** ट्रांसजेंडर व्यक्तियों के विरुद्ध होने वाले अपराधों और उनके लिए निर्धारित दंड का प्रावधान करती है। इसमें मुख्य रूप से **चार सामान्य अपराधों** का उल्लेख है:",
            "• **जबरन या बंधुआ श्रम (Forced or Bonded Labour)**: किसी ट्रांसजेंडर व्यक्ति से जबरन या बिना मजदूरी के काम कराना (भीख मांगने के लिए मजबूर करने सहित)।",
            "• **सार्वजनिक स्थान का उपयोग करने से रोकना (Denial of Access to Public Spaces)**: शैक्षणिक संस्थानों, अस्पतालों, सार्वजनिक परिवहन, मनोरंजन स्थलों या सार्वजनिक मार्गों पर जाने से रोकना।",
            "• **घर या गांव छोड़ने को मजबूर करना (Forced Eviction)**: किसी व्यक्ति को उसके निवास स्थान, परिवार या गांव से जबरन बाहर निकालना।",
            "• **शारीरिक या मानसिक हानि पहुंचाना (Physical or Mental Harm)**: शारीरिक चोट पहुंचाना, यौन उत्पीड़न या मानसिक-भावनात्मक प्रताड़ना देना।",
            "• **दंड का प्रावधान**: इन अपराधों के लिए **6 माह से लेकर 2 वर्ष तक का कारावास** और **जुर्माने** का सख्त कानूनी प्रावधान किया गया है।",
            "### 2. पहचान प्रमाण-पत्र जारी करने की प्रक्रिया (Certificate of Identity)",
            "• **आवेदन अधिकारी**: अधिनियम के तहत ट्रांसजेंडर व्यक्ति अपनी लैंगिक पहचान दर्ज कराने हेतु **जिला मजिस्ट्रेट (District Magistrate - DM)** के समक्ष आवेदन कर सकता है।",
            "• **प्रमाण-पत्र निर्गमन**: जिला मजिस्ट्रेट द्वारा आवश्यक जांच प्रक्रिया पूर्ण होने के पश्चात आवेदक को **पहचान प्रमाण-पत्र (Certificate of Identity)** जारी किया जाता है, जो सभी सरकारी व गैर-सरकारी अभिलेखों में मान्य होता है।",
            "### 3. 2020 के नियमों से जुड़ा महत्वपूर्ण तथ्य (Transgender Rules 2020)",
            "• **शपथपत्र-आधारित आवेदन**: वर्ष 2020 में लागू किए गए नियमों में **धारा 6 के अंतर्गत शपथपत्र-आधारित आवेदन (Affidavit-based Application)** का प्रावधान किया गया था।",
            "• **स्वयं-घोषणा (Self-Declaration)**: इसमें आवेदक स्वयं को ट्रांसजेंडर घोषित करते हुए एक शपथपत्र जमा करता था, जिसके आधार पर पहचान पत्र की प्रक्रिया आगे बढ़ती थी। 2026 के संशोधन के बाद परिभाषा एवं पहचान की प्रक्रिया में महत्वपूर्ण प्रशासनिक स्पष्टता और सुरक्षा मानक जोड़े गए हैं।"
          ]),
          {
            _key: "b-img-dm-office",
            _type: "image",
            asset: { _type: "reference", _ref: assetDmOffice._id },
            alt: "District Magistrate Certificate of Identity Transgender Act 2026 MPPSC UPSC Notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### 1. Section 18: Offences & Penalties",
            "Section 18 specifies four primary categories of offences against transgender persons:",
            "• **Forced / Bonded Labour**: Forcing a transgender person into bonded labor or involuntary begging.",
            "• **Denial of Access to Public Spaces**: Obstructing entry to public places, hospitals, educational institutions, or transport.",
            "• **Forced Eviction**: Compelling a transgender person to leave their home, family, or village.",
            "• **Physical or Mental Harm**: Inflicting physical injury, sexual abuse, or emotional harassment.",
            "• **Penalty**: Imprisonment for a term ranging from **6 months to 2 years** along with a fine.",
            "### 2. Certificate of Identity Process",
            "• Transgender persons can submit an application to the **District Magistrate (DM)** to obtain a Certificate of Identity.",
            "### 3. Transgender Rules 2020",
            "• Under the 2020 Rules, **Section 6** provided for an **Affidavit-based application** where applicants self-declared their transgender status."
          ]),
        ],
      },

      /* ── 5. Exam Point of View Summary ───────────────────────── */
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
            "• **2020 नियम की विशेषता**: धारा 6 के तहत शपथपत्र-आधारित स्व-घोषणा आवेदन"
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
        question: "वर्ष 2020 के नियमों में धारा 6 के तहत आवेदन की क्या विशेषता थी?",
        options: ["हाई कोर्ट द्वारा मौखिक आदेश", "शपथपत्र-आधारित आवेदन (Affidavit-based Application)", "केवल पासपोर्ट के आधार पर स्वीकृति", "मेडिकल बोर्ड का अनिवार्य भौतिक परीक्षण"],
        correctIndex: 1,
        explanation: "वर्ष 2020 के नियमों में धारा 6 के लिए शपथपत्र-आधारित आवेदन का प्रावधान था, जिसमें आवेदक स्वयं को ट्रांसजेंडर घोषित करता था।",
        questionEn: "What was the key feature of Section 6 applications under the Transgender Rules 2020?",
        optionsEn: ["Oral order by High Court", "Affidavit-based Application", "Acceptance solely via Passport", "Mandatory physical exam by Medical Board"],
        explanationEn: "Under the 2020 Rules, Section 6 provided an affidavit-based application where the applicant self-declared their status.",
      },
      {
        question: "उभयलिंगी व्यक्ति (अधिकारों का संरक्षण) अधिनियम, 2019 का मूल उद्देश्य क्या था?",
        options: ["अधिकारों की रक्षा व पहचान की मान्यता", "भेदभाव से सुरक्षा", "कल्याणकारी उपायों को सुनिश्चित करना", "उपरोक्त सभी"],
        correctIndex: 3,
        explanation: "2019 के मूल अधिनियम का उद्देश्य ट्रांसजेंडर व्यक्तियों के अधिकारों की रक्षा, पहचान की कानूनी मान्यता, भेदभाव से सुरक्षा और सामाजिक कल्याणकारी उपायों को सुनिश्चित करना था।",
        questionEn: "What was the primary objective of the parent Transgender Persons (Protection of Rights) Act, 2019?",
        optionsEn: ["Protection of rights and recognition of identity", "Protection against discrimination", "Ensuring welfare measures", "All of the above"],
        explanationEn: "The 2019 Parent Act aimed at protection of rights, recognition of self-perceived gender identity, prohibiting discrimination, and providing welfare measures.",
      },
      {
        question: "MPPSC परीक्षा की दृष्टि से उभयलिंगी व्यक्ति अधिनियम किस भाग/विषय से संबंधित है?",
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
  console.log("💾 Uploading currentAffairs article to Sanity...");
  const res = await client.createOrReplace(article);
  console.log(`✅ Successfully uploaded article to Sanity! Document ID: ${res._id}`);
}

main().catch((err) => {
  console.error("❌ Error uploading article to Sanity:", err);
  process.exit(1);
});
