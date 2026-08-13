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

// Helper to convert array of strings into separate Portable Text blocks with markdown link parsing
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

// Helper to create table block
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
  console.log("🚀 Starting upload process for 73rd and 74th Amendments Static GK Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    constitution: path.resolve(process.cwd(), "public/images/blog/const-amendments-1992-1.png"),
    panchayat: path.resolve(process.cwd(), "public/images/blog/const-amendments-1992-2.png"),
    municipal: path.resolve(process.cwd(), "public/images/blog/const-amendments-1992-3.png"),
  };

  // Upload images to Sanity
  console.log("📸 Uploading images to Sanity...");
  const assetConst = await client.assets.upload("image", fs.createReadStream(imagePaths.constitution), {
    filename: "const_amendments_1992_constitution.png",
  });
  const assetPanchayat = await client.assets.upload("image", fs.createReadStream(imagePaths.panchayat), {
    filename: "const_amendments_1992_panchayat.png",
  });
  const assetMunicipal = await client.assets.upload("image", fs.createReadStream(imagePaths.municipal), {
    filename: "const_amendments_1992_municipal.png",
  });
  console.log(`✔ Uploaded image assets:
    - Const: ${assetConst._id}
    - Panchayat: ${assetPanchayat._id}
    - Municipal: ${assetMunicipal._id}`);

  // User requested slug: 73-74-amendment-act-panchayati-raj-mppsc-notes
  const targetSlug = "73-74-amendment-act-panchayati-raj-mppsc-notes";

  const article = {
    _id: "gk-73-74-constitutional-amendments-1992",
    _type: "staticGk",
    slug: { _type: "slug", current: targetSlug },
    title: "73वां व 74वां संविधान संशोधन अधिनियम (पंचायती राज व नगरीय निकाय) | MPPSC & UPSC के लिए मुख्य प्रावधान, 11वीं व 12वीं अनुसूची व नोट्स",
    titleEn: "73rd and 74th Constitutional Amendment Acts, 1992 (Panchayati Raj & Municipalities): MPPSC & UPSC Notes PDF",
    excerpt: "73वें एवं 74वें संविधान संशोधन अधिनियम (1992) का संपूर्ण विश्लेषण। पंचायती राज और नगरीय निकायों को संवैधानिक दर्जा, त्रिस्तरीय स्वशासन प्रणाली, 11वीं व 12वीं अनुसूची, राज्य निर्वाचन आयोग, राज्य वित्त आयोग, MPPSC (पेपर-2: राजव्यवस्था व स्थानीय स्वशासन) एवं UPSC परीक्षा नोट्स।",
    excerptEn: "Comprehensive exam-oriented notes on the 73rd and 74th Constitutional Amendment Acts, 1992. Covers 3-tier Panchayati Raj system, 11th & 12th Schedules, 29 & 18 functional items, State Election Commission, State Finance Commission, DPC, and MCQs for MPPSC & UPSC.",
    ca_date: "2026-08-13",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 12,
    keywords: [
      "73-74 amendment act panchayati raj mppsc notes",
      "73rd Amendment Act 1992",
      "74th Amendment Act 1992",
      "73वां संविधान संशोधन पंचायती राज",
      "74वां संविधान संशोधन नगरीय निकाय",
      "Panchayati Raj System in India",
      "Local Self Government India",
      "11th Schedule 29 Subjects",
      "12th Schedule 18 Subjects",
      "Gram Sabha Articles 243",
      "State Election Commission",
      "State Finance Commission",
      "MPPSC Mains Paper 2 Governance",
      "MPPSC Polity Notes PDF"
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
      asset: { _type: "reference", _ref: assetConst._id },
      alt: "Gold-embossed Constitution of India book representing 73rd and 74th constitutional amendments Panchayati Raj MPPSC UPSC Notes",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Quick Summary Box ────────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "73वां व 74वां संविधान संशोधन अधिनियम: मुख्य बिंदु (Quick Overview)",
        titleEn: "73rd and 74th Constitutional Amendment Acts: Quick Overview",
        body: [
          ...createBlocks([
            "वर्ष 1992 में पारित **73वें एवं 74वें संविधान संशोधन अधिनियमों** ने भारत में स्थानीय स्वशासन (Local Self Government) को संवैधानिक दर्जा प्रदान कर भारत में लोकतांत्रिक विकेंद्रीकरण (Democratic Decentralization) का ऐतिहासिक सूत्रपात किया।",
            "• **73वां संविधान संशोधन (ग्रामीण स्वशासन)**: इसके द्वारा संविधान में **भाग-9 (Part IX)** तथा **11वीं अनुसूची (11th Schedule)** जोड़ी गई, जिसमें पंचायतों को काम करने के लिए **29 कार्य क्षेत्र (Subjects)** सौंपे गए।",
            "• **74वां संविधान संशोधन (शहरी स्वशासन)**: इसके द्वारा संविधान में **भाग-9A (Part IXA)** तथा **12वीं अनुसूची (12th Schedule)** जोड़ी गई, जिसमें नगर पालिकाओं को **18 कार्य क्षेत्र** सौंपे गए।",
            "• **संवैधानिक प्रवर्तन तिथियाँ**: 73वां संशोधन **24 अप्रैल 1993** से लागू हुआ (इसलिए प्रतिवर्ष 24 अप्रैल को **राष्ट्रीय पंचायती राज दिवस** मनाया जाता है) तथा 74वां संशोधन **1 जून 1993** से लागू हुआ।",
            "• **परीक्षा उपयोगिता**: यह विषय [MPPSC मुख्य परीक्षा पाठ्यक्रम](/mppsc/mains-syllabus) (द्वितीय प्रश्नपत्र - भारतीय राजव्यवस्था व स्थानीय शासन) एवं [MPPSC प्रारंभिक परीक्षा](/mppsc/prelims-syllabus) (इकाई 5) तथा UPSC GS-2 के लिए अत्यंत महत्वपूर्ण है।"
          ]),
          createTable(
            "table-73-74-overview-hi",
            "73वें एवं 74वें संविधान संशोधन अधिनियम: एक नजर में",
            ["विशेषता / पैरामीटर", "73वां संविधान संशोधन (पंचायती राज)", "74वां संविधान संशोधन (नगरीय निकाय)"],
            [
              ["**विषय (Subject)**", "ग्रामीण स्थानीय स्वशासन (Rural Local Bodies)", "शहरी स्थानीय स्वशासन (Urban Local Bodies)"],
              ["**संवैधानिक भाग (Part)**", "भाग IX (Part IX - अनुच्छेद 243 से 243O)", "भाग IXA (Part IXA - अनुच्छेद 243P से 243ZG)"],
              ["**अनुसूची (Schedule)**", "11वीं अनुसूची (11th Schedule)", "12वीं अनुसूची (12th Schedule)"],
              ["**कार्यों की संख्या (Subjects)**", "29 कार्य क्षेत्र", "18 कार्य क्षेत्र"],
              ["**लागू होने की तिथि**", "24 अप्रैल 1993 (राष्ट्रीय पंचायती राज दिवस)", "1 जून 1993"],
              ["**आरक्षण का प्रावधान**", "महिलाओं के लिए न्यूनतम 33% (1/3) सीट", "महिलाओं के लिए न्यूनतम 33% (1/3) सीट"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "The **73rd and 74th Constitutional Amendment Acts of 1992** granted statutory constitutional status to rural Panchayati Raj Institutions and Urban Local Bodies in India.",
            "• **73rd Amendment (Rural)**: Added **Part IX** and the **11th Schedule** with **29 functional subjects**.",
            "• **74th Amendment (Urban)**: Added **Part IXA** and the **12th Schedule** with **18 functional subjects**.",
            "• **Enactment Dates**: 73rd Amendment came into force on **24 April 1993** (National Panchayati Raj Day), and 74th Amendment on **1 June 1993**.",
            "• **Exam Value**: Highly vital for [MPPSC Mains Paper-2](/mppsc/mains-syllabus) and UPSC GS-2."
          ]),
          createTable(
            "table-73-74-overview-en",
            "73rd & 74th Constitutional Amendment Acts: At a Glance",
            ["Parameter", "73rd Amendment (Panchayati Raj)", "74th Amendment (Municipalities)"],
            [
              ["**Scope**", "Rural Local Self-Government", "Urban Local Self-Government"],
              ["**Constitutional Part**", "Part IX (Articles 243 to 243O)", "Part IXA (Articles 243P to 243ZG)"],
              ["**Schedule Added**", "11th Schedule", "12th Schedule"],
              ["**Functional Subjects**", "29 Subjects", "18 Subjects"],
              ["**Enforcement Date**", "24 April 1993 (National Panchayati Raj Day)", "1 June 1993"],
              ["**Women Reservation**", "Minimum 33% (1/3rd seats)", "Minimum 33% (1/3rd seats)"]
            ]
          )
        ],
      },

      /* ── 2. Historical Background & Committees ───────────────── */
      {
        _key: "sec-committees-history",
        kind: "background",
        title: "ऐतिहासिक पृष्ठभूमि एवं प्रमुख समितियाँ (Historical Background & Committees)",
        titleEn: "Historical Background & Key Committees on Panchayati Raj",
        body: [
          ...createBlocks([
            "भारत में पंचायती राज व्यवस्था के विकास का इतिहास अत्यंत प्राचीन रहा है। चोल साम्राज्य (Chola Empire) से लेकर आधुनिक भारत में लॉर्ड रिपन (Lord Ripon - 1882) के 'स्थानीय स्वशासन का मैग्नाकार्टा' तक इसका क्रमिक विकास हुआ। स्वतंत्रता के पश्चात अनुच्छेद 40 (राज्य के नीति निदेशक तत्व) के तहत ग्राम पंचायतों के गठन का निर्देश दिया गया।",
            "### प्रमुख सिफारिशी समितियाँ (Key Advisory Committees)",
            "• **बलवंत राय मेहता समिति (1957)**: लोकतांत्रिक विकेंद्रीकरण की सिफारिश की और **त्रिस्तरीय पंचायती राज व्यवस्था** (ग्राम स्तर, खंड स्तर व जिला स्तर) का सुझाव दिया। 2 अक्टूबर 1959 को राजस्थान के **नागौर जिले** में पंडित जवाहरलाल नेहरू द्वारा भारत में पहली बार पंचायती राज का उद्घाटन किया गया।",
            "• **अशोक मेहता समिति (1977)**: त्रिस्तरीय के स्थान पर **द्विस्तरीय प्रणाली** (मंडल पंचायत व जिला परिषद) का सुझाव दिया।",
            "• **जी.वी.के. राव समिति (1985)**: 'बिना जड़ की घास' (Grass without roots) की संज्ञा देते हुए नियमित चुनाव कराने का सुझाव दिया।",
            "• **एल.एम. सिंघवी समिति (1986)**: पंचायतों को **संवैधानिक दर्जा (Constitutional Status)** देने की सिफारिश करने वाली सबसे प्रमुख समिति थी।",
            "• **पी.के. थुंगन समिति (1988)**: पंचायतों को संवैधानिक मान्यता देने तथा 5 वर्ष के निश्चित कार्यकाल का समर्थन किया।"
          ]),
          {
            _key: "b-img-panchayat",
            _type: "image",
            asset: { _type: "reference", _ref: assetPanchayat._id },
            alt: "Gram Panchayat Sarpanch village meeting assembly represented under 73rd amendment MPPSC UPSC Notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Key Historical Committees",
            "• **Balwant Rai Mehta Committee (1957)**: Recommended democratic decentralization and a 3-tier Panchayati Raj system. First launched in Nagaur, Rajasthan on 2 October 1959.",
            "• **Ashok Mehta Committee (1977)**: Suggested a 2-tier model (Mandal Panchayat & Zilla Parishad).",
            "• **G.V.K. Rao Committee (1985)**: Highlighted administrative delays ('grass without roots').",
            "• **L.M. Singhvi Committee (1986)**: Strongly recommended granting **Constitutional Status** to Panchayati Raj Institutions.",
            "• **P.K. Thungan Committee (1988)**: Advocated 5-year fixed tenure and constitutional protection."
          ])
        ],
      },

      /* ── 3. Detailed Provisions of 73rd Amendment ───────────── */
      {
        _key: "sec-73rd-provisions",
        kind: "keyHighlights",
        title: "73वां संविधान संशोधन अधिनियम, 1992 (पंचायती राज के विस्तृत प्रावधान)",
        titleEn: "Key Provisions of the 73rd Constitutional Amendment Act, 1992",
        body: [
          ...createBlocks([
            "73वें संविधान संशोधन द्वारा अनुच्छेद 243 से 243O तक विस्तृत प्रावधान जोड़े गए। इसके प्रमुख अनिवार्य एवं ऐच्छिक प्रावधान निम्नलिखित हैं:",
            "### 1. ग्राम सभा (Article 243A)",
            "• ग्राम सभा पंचायती राज व्यवस्था का प्राथमिक एवं स्थायी अंग है। इसमें गाँव के सभी पंजीकृत मतदाता (Registered Voters) शामिल होते हैं।",
            "### 2. त्रिस्तरीय संरचना (Article 243B)",
            "• 20 लाख से अधिक जनसंख्या वाले राज्यों में त्रिस्तरीय संरचना (ग्राम पंचायत, जनपद/ब्लॉक पंचायत, जिला पंचायत) अनिवार्य है। 20 लाख से कम जनसंख्या वाले राज्यों में मध्यवर्ती स्तर न बनाने की छूट है।",
            "### 3. सीटों का आरक्षण (Article 243D)",
            "• **अनुसूचित जाति (SC) व जनजाति (ST)**: उनकी जनसंख्या के अनुपात में आरक्षण।",
            "• **महिलाओं के लिए आरक्षण**: सभी स्तरों पर कुल सीटों का **कम से कम 33% (1/3)** महिलाओं के लिए आरक्षित। (मध्य प्रदेश जैसे राज्यों में महिलाओं को **50% आरक्षण** दिया गया है)।",
            "### 4. कार्यसूची एवं 29 विषय (11th Schedule - Article 243G)",
            "11वीं अनुसूची में कुल **29 विषय** शामिल हैं, जैसे: कृषि, भूमि सुधार, लघु सिंचाई, पशुपालन, पेयजल, ग्रामीण सड़कें, गरीबी उन्मूलन कार्यक्रम, प्राथमिक व माध्यमिक शिक्षा, स्वास्थ्य एवं स्वच्छता।",
            "### 5. राज्य निर्वाचन आयोग एवं राज्य वित्त आयोग (Articles 243K & 243I)",
            "• **राज्य निर्वाचन आयोग (Article 243K)**: स्वतंत्र निष्पक्ष चुनाव कराने हेतु राज्य राज्यपाल द्वारा राज्य निर्वाचन आयुक्त की नियुक्ति।",
            "• **राज्य वित्त आयोग (Article 243I)**: पंचायतों की वित्तीय स्थिति की समीक्षा हेतु प्रति **5 वर्ष में राज्यपाल द्वारा** गठित किया जाता है।",
            "• **संबद्ध कानून**: [उभयलिंगी व्यक्ति संशोधन अधिनियम 2026](/current-affairs/transgender-persons-amendment-act-2026-mppsc-upsc-notes) तथा [एमपी समान नागरिक संहिता (UCC) विधेयक](/current-affairs/mp-ucc-bill-2026-mppsc-upsc-notes) भी राज्य विधायिका से संबंधित हैं।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Key Features of 73rd Amendment (Articles 243 - 243O)",
            "• **Gram Sabha (Art 243A)**: Foundation of local democracy comprising all registered village voters.",
            "• **Three-Tier Structure (Art 243B)**: Gram Panchayat, Block Samiti, Zilla Parishad.",
            "• **Reservation (Art 243D)**: Minimum 33% seats reserved for women (50% in states like Madhya Pradesh).",
            "• **11th Schedule (Art 243G)**: Contains 29 functional subjects.",
            "• **State Election Commission (Art 243K)**: Conducts local body elections.",
            "• **State Finance Commission (Art 243I)**: Constituted every 5 years by the Governor to review local finances."
          ])
        ],
      },

      /* ── 4. Detailed Provisions of 74th Amendment ───────────── */
      {
        _key: "sec-74th-provisions",
        kind: "keyHighlights",
        title: "74वां संविधान संशोधन अधिनियम, 1992 (नगरीय निकायों के विस्तृत प्रावधान)",
        titleEn: "Key Provisions of the 74th Constitutional Amendment Act, 1992",
        body: [
          ...createBlocks([
            "74वें संशोधन संशोधन द्वारा संविधान में भाग IXA (अनुच्छेद 243P से 243ZG) और **12वीं अनुसूची** जोड़ी गई, जिसका उद्देश्य शहरी क्षेत्रों में लोकतांत्रिक स्वशासन स्थापित करना है:",
            "### 1. तीन प्रकार की नगर पालिकाएँ (Article 243Q)",
            "• **नगर पंचायत (Nagar Panchayat)**: संक्रमणशील क्षेत्रों (Rural to Urban transition areas) के लिए।",
            "• **नगर पालिका परिषद (Municipal Council)**: छोटे शहरी क्षेत्रों के लिए।",
            "• **नगर निगम (Municipal Corporation)**: बड़े महानगरों और बड़े शहरी क्षेत्रों के लिए।",
            "### 2. 12वीं अनुसूची एवं 18 विषय (12th Schedule - Article 243W)",
            "12वीं अनुसूची में कुल **18 विषय** शामिल हैं, जैसे: नगर योजना (Urban Planning), भूमि उपयोग का नियमन, सड़कें व पुल, जल आपूर्ति, सार्वजनिक स्वास्थ्य व स्वच्छता, अग्निशमन सेवाएँ, झुग्गी सुधार व पर्यावरण संरक्षण।",
            "### 3. जिला आयोजना समिति व महानगर आयोजना समिति (Articles 243ZD & 243ZE)",
            "• **जिला आयोजना समिति (DPC - Article 243ZD)**: जिला स्तर पर पंचायतों और नगर पालिकाओं द्वारा तैयार की गई योजनाओं को समेकित (Consolidate) करने हेतु गठित।",
            "• **महानगर आयोजना समिति (MPC - Article 243ZE)**: महानगर क्षेत्रों के लिए विकास योजना का प्रारूप तैयार करने हेतु।"
          ]),
          {
            _key: "b-img-municipal",
            _type: "image",
            asset: { _type: "reference", _ref: assetMunicipal._id },
            alt: "Urban Nagar Nigam Municipal Corporation building representing 74th amendment MPPSC UPSC Notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Key Features of 74th Amendment (Articles 243P - 243ZG)",
            "• **Three Types of Urban Bodies (Art 243Q)**: Nagar Panchayat, Municipal Council, Municipal Corporation.",
            "• **12th Schedule (Art 243W)**: Contains 18 urban functional subjects.",
            "• **District Planning Committee (DPC - Art 243ZD)**: Consolidates rural and urban developmental plans at district level.",
            "• **Metropolitan Planning Committee (MPC - Art 243ZE)**: Prepares development draft for metropolitan areas."
          ])
        ],
      },

      /* ── 5. Frequently Asked Questions (FAQs) ──────────────── */
      {
        _key: "sec-faqs-section",
        kind: "faqSection",
        title: "अक्सर पूछे जाने वाले महत्वपूर्ण प्रश्न (Frequently Asked Questions)",
        titleEn: "Frequently Asked Questions (Key Doubts Cleared)",
        body: [
          ...createBlocks([
            "73वें और 74वें संविधान संशोधन अधिनियम से संबंधित प्रतियोगी परीक्षाओं में पूछे जाने वाले महत्वपूर्ण प्रश्नों के उत्तर नीचे दिए गए हैं:",
            "### Q1. 73वां और 74वां संविधान संशोधन किस वर्ष पारित हुआ और कब लागू हुआ?",
            "उत्तर: दोनों संशोधन अधिनियम वर्ष 1992 में संसद द्वारा पारित हुए। 73वां संशोधन 24 अप्रैल 1993 से लागू हुआ (जिसकी याद में राष्ट्रीय पंचायती राज दिवस मनाया जाता है) तथा 74वां संशोधन 1 जून 1993 से लागू हुआ।",
            "### Q2. 11वीं और 12वीं अनुसूची में कितने-कितने विषय शामिल हैं?",
            "उत्तर: 73वें संशोधन द्वारा जोड़ी गई 11वीं अनुसूची में 29 विषय (ग्रामीण विकास संबंधी) तथा 74वें संशोधन द्वारा जोड़ी गई 12वीं अनुसूची में 18 विषय (शहरी विकास संबंधी) शामिल हैं।",
            "### Q3. पंचायती राज संस्थाओं में महिलाओं के लिए कितना आरक्षण निर्धारित है?",
            "उत्तर: संविधान के अनुच्छेद 243D के तहत महिलाओं के लिए न्यूनतम 33% (1/3) आरक्षण अनिवार्य है। हालांकि, मध्य प्रदेश, बिहार, राजस्थान आदि राज्यों ने इसे बढ़ाकर 50% कर दिया है।",
            "### Q4. राज्य वित्त आयोग का गठन किस अनुच्छेद के तहत किया जाता है?",
            "उत्तर: राज्य वित्त आयोग (State Finance Commission) का गठन संविधान के अनुच्छेद 243I (पंचायतों हेतु) तथा अनुच्छेद 243Y (नगर पालिकाओं हेतु) के तहत प्रत्येक 5 वर्ष में राज्य के राज्यपाल द्वारा किया जाता है।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Frequently Asked Questions",
            "Key questions and answers regarding the 73rd and 74th Constitutional Amendment Acts:",
            "**Q1. When did the 73rd Amendment Act come into force?**",
            "Answer: On 24 April 1993, celebrated annually as National Panchayati Raj Day.",
            "**Q2. How many subjects are listed in the 11th and 12th Schedules?**",
            "Answer: 11th Schedule has 29 subjects (rural); 12th Schedule has 18 subjects (urban).",
            "**Q3. What is the constitutional reservation for women in local bodies?**",
            "Answer: Minimum 33% (1/3rd seats) under Article 243D, extended to 50% in states like MP."
          ])
        ],
      },

      /* ── 6. MPPSC Mains Model Answer Writing ─────────────────── */
      {
        _key: "sec-mains-model-qa",
        kind: "mainsAnswerWriting",
        title: "MPPSC मुख्य परीक्षा मॉडल प्रश्नोत्तर (Mains Model Q&A - Paper 2)",
        titleEn: "MPPSC Mains Model Answer Writing - Paper 2 Governance",
        body: [
          ...createBlocks([
            "### मॉडल प्रश्न (MPPSC मुख्य परीक्षा - 11 अंक / 200 शब्द)",
            "**प्रश्न**: 'भारत में लोकतांत्रिक विकेंद्रीकरण की दिशा में 73वें एवं 74वें संविधान संशोधन अधिनियमों के योगदान का मूल्यांकन कीजिए। इन संस्थाओं की मुख्य चुनौतियों की विवेचना कीजिए।'",
            "### उत्तर प्रारूप एवं मुख्य बिंदु (Model Answer Outline)",
            "• **1. भूमिका (Introduction)**: 1992 के 73वें व 74वें संशोधनों का परिचय देते हुए अनुच्छेद 40 एवं भाग 9 व 9A का उल्लेख कीजिए।",
            "• **2. प्रमुख योगदान (Key Contributions)**:",
            "  - त्रिस्तरीय संरचना, नियमित 5 वर्ष के चुनाव तथा राज्य निर्वाचन आयोग (Art 243K) का गठन।",
            "  - 11वीं (29 विषय) व 12वीं अनुसूची (18 विषय) द्वारा शक्तियों का हस्तांतरण।",
            "  - महिलाओं को 33%-50% आरक्षण तथा SC/ST को आनुपातिक प्रतिनिधित्व से सामाजिक समावेश।",
            "• **3. मुख्य चुनौतियाँ (Challenges - 3Fs)**:",
            "  - **Funds (वित्त की कमी)**: राज्य वित्त आयोग की सिफारिशों का अधूरा क्रियान्वयन व कर जुटाने की सीमित शक्ति।",
            "  - **Functions (कार्यों का अधूरा हस्तांतरण)**: नौकरशाही का हस्तक्षेप और शक्तियों को सौंपने में हिचकिचाहट।",
            "  - **Functionaries (कर्मचारियों की कमी)**: तकनीकी व प्रशासनिक अमले का अभाव तथा 'सरपंच पति' संस्कृति।",
            "• **4. निष्कर्ष (Conclusion)**: द्वितीय प्रशासनिक सुधार आयोग (2nd ARC) की सिफारिशों के अनुरूप 3Fs के सुदृढ़ीकरण से ही वास्तविक 'ग्राम स्वराज' का सपना साकार होगा।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### MPPSC Mains Model Question (11 Marks / 200 Words)",
            "**Question**: Evaluate the contribution of the 73rd and 74th Constitutional Amendment Acts towards democratic decentralization in India. Discuss the key challenges faced by local self-government institutions.",
            "**Model Answer Highlights**: Introduce 1992 constitutional status, detail 3-tier model, 11th & 12th schedules, women empowerment, analyze 3Fs challenges (Funds, Functions, Functionaries), and conclude with 2nd ARC recommendations."
          ])
        ],
      },

      /* ── 7. Exam Point of View Summary Table ──────────────────── */
      {
        _key: "sec-exam-summary",
        kind: "keyHighlights",
        title: "EXAM POINT OF VIEW : परीक्षा की दृष्टि से महत्वपूर्ण तथ्य",
        titleEn: "EXAM POINT OF VIEW: Quick Revision Notes for MPPSC & UPSC",
        body: [
          ...createBlocks([
            "MPPSC (प्रारंभिक व मुख्य परीक्षा) तथा UPSC अभ्यर्थियों के लिए इस अधिनियम के सबसे महत्वपूर्ण स्मरणीय तथ्य नीचे दिए गए हैं:",
            "• **73वां संशोधन (भाग 9)**: अनुच्छेद 243 से 243O | 11वीं अनुसूची | 29 विषय | 24 अप्रैल 1993 से लागू",
            "• **74वां संशोधन (भाग 9A)**: अनुच्छेद 243P से 243ZG | 12वीं अनुसूची | 18 विषय | 1 जून 1993 से लागू",
            "• **राष्ट्रीय पंचायती राज दिवस**: प्रतिवर्ष 24 अप्रैल को मनाया जाता है",
            "• **प्रथम पंचायती राज राज्य**: राजस्थान (नागौर जिला - 2 अक्टूबर 1959)",
            "• **संवैधानिक सिफारिश समिति**: एल.एम. सिंघवी समिति (1986)",
            "• **महिला आरक्षण**: अनुच्छेद 243D (न्यूनतम 33%, MP में 50%)",
            "• **राज्य निर्वाचन आयोग**: अनुच्छेद 243K | **राज्य वित्त आयोग**: अनुच्छेद 243I",
            "• **जिला आयोजना समिति (DPC)**: अनुच्छेद 243ZD | **महानगर आयोजना समिति (MPC)**: अनुच्छेद 243ZE",
            "• **सम्बंधित अध्ययन सामग्री**: [संविधान सभा का गठन व इतिहास](/general-awareness/constituent-assembly-formation-history-mppsc-notes), [आपदा प्रबंधन (संशोधन) अधिनियम 2025](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes) तथा [उभयलिंगी व्यक्ति अधिनियम 2026](/current-affairs/transgender-persons-amendment-act-2026-mppsc-upsc-notes)।"
          ]),
          createTable(
            "table-exam-summary-hi",
            "MPPSC / UPSC परीक्षा रिवीजन तालिका: 73वां व 74वां संविधान संशोधन",
            ["परीक्षा उपयोगी बिंदु", "तथ्य / प्रावधान"],
            [
              ["**73वां संशोधन (ग्रामीण)**", "**भाग IX, अनुसूची 11 (29 विषय), लागू: 24 अप्रैल 1993**"],
              ["**74वां संशोधन (शहरी)**", "**भाग IXA, अनुसूची 12 (18 विषय), लागू: 1 जून 1993**"],
              ["**प्रथम उद्घाटन राज्य**", "**राजस्थान (नागौर जिला - 2 अक्टूबर 1959)**"],
              ["**संवैधानिक सिफारिश समिति**", "**एल.एम. सिंघवी समिति (1986)**"],
              ["**महिला आरक्षण**", "**अनुच्छेद 243D (न्यूनतम 33%, मध्य प्रदेश में 50%)**"],
              ["**चुनाव व वित्त आयोग**", "**अनुच्छेद 243K (निर्वाचन आयोग) एवं अनुच्छेद 243I (वित्त आयोग)**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "Key revision bullet points for MPPSC Prelims/Mains and UPSC exams:",
            "• **73rd Amendment (Part IX)**: Articles 243-243O | 11th Schedule | 29 Subjects | Enforced 24 April 1993",
            "• **74th Amendment (Part IXA)**: Articles 243P-243ZG | 12th Schedule | 18 Subjects | Enforced 1 June 1993",
            "• **First State**: Rajasthan (Nagaur district - 2 Oct 1959)",
            "• **Constitutional Recommendation**: L.M. Singhvi Committee (1986)",
            "• **Women Reservation**: Article 243D (Minimum 33%, 50% in MP)",
            "• **Commissions**: Article 243K (Election Commission), Article 243I (Finance Commission)"
          ]),
          createTable(
            "table-exam-summary-en",
            "MPPSC & UPSC Exam Summary: 73rd & 74th Amendments 1992",
            ["Exam Topic", "Key Provision"],
            [
              ["**73rd Amendment (Rural)**", "**Part IX, 11th Schedule (29 subjects), Enforced 24 April 1993**"],
              ["**74th Amendment (Urban)**", "**Part IXA, 12th Schedule (18 subjects), Enforced 1 June 1993**"],
              ["**Inaugural State**", "**Rajasthan (Nagaur District - 2 Oct 1959)**"],
              ["**Recommending Committee**", "**L.M. Singhvi Committee (1986)**"],
              ["**Women Reservation**", "**Article 243D (Minimum 33%, 50% in MP)**"],
              ["**Commissions**", "**Article 243K (SEC) & Article 243I (SFC)**"]
            ]
          )
        ],
      },
    ],

    /* ─── FAQs ─────────────────────────────────────────────────── */
    faqs: [
      {
        question: "73वां और 74वां संविधान संशोधन किस वर्ष पारित हुआ और कब लागू हुआ?",
        answer: "दोनों संशोधन अधिनियम वर्ष 1992 में संसद द्वारा पारित हुए। 73वां संशोधन 24 अप्रैल 1993 से लागू हुआ (जिसकी याद में राष्ट्रीय पंचायती राज दिवस मनाया जाता है) तथा 74वां संशोधन 1 जून 1993 से लागू हुआ।",
        questionEn: "When did the 73rd Amendment Act come into force?",
        answerEn: "On 24 April 1993, which is celebrated annually as National Panchayati Raj Day in India.",
      },
      {
        question: "11वीं और 12वीं अनुसूची में कितने-कितने विषय शामिल हैं?",
        answer: "73वें संशोधन द्वारा जोड़ी गई 11वीं अनुसूची में 29 विषय (ग्रामीण विकास संबंधी) तथा 74वें संशोधन द्वारा जोड़ी गई 12वीं अनुसूची में 18 विषय (शहरी विकास संबंधी) शामिल हैं।",
        questionEn: "How many subjects are listed in the 11th and 12th Schedules?",
        answerEn: "11th Schedule contains 29 rural subjects, while 12th Schedule contains 18 urban functional subjects.",
      },
      {
        question: "पंचायती राज संस्थाओं में महिलाओं के लिए कितना आरक्षण निर्धारित है?",
        answer: "संविधान के अनुच्छेद 243D के तहत महिलाओं के लिए न्यूनतम 33% (1/3) आरक्षण अनिवार्य है। मध्य प्रदेश, बिहार, राजस्थान जैसे राज्यों में इसे बढ़ाकर 50% किया गया है।",
        questionEn: "What is the constitutional reservation for women in Panchayati Raj Institutions?",
        answerEn: "Minimum 33% (1/3rd seats) under Article 243D, extended to 50% in states like Madhya Pradesh.",
      },
      {
        question: "राज्य वित्त आयोग का गठन किस अनुच्छेद के तहत किया जाता है?",
        answer: "राज्य वित्त आयोग का गठन संविधान के अनुच्छेद 243I (पंचायतों हेतु) तथा अनुच्छेद 243Y (नगर पालिकाओं हेतु) के तहत प्रत्येक 5 वर्ष में राज्य के राज्यपाल द्वारा किया जाता है।",
        questionEn: "Under which article is the State Finance Commission constituted?",
        answerEn: "Under Article 243I (for Panchayats) and Article 243Y (for Municipalities) constituted every 5 years by the Governor.",
      },
      {
        question: "भारत में पंचायती राज का औपचारिक उद्घाटन सर्वप्रथम कहाँ और कब हुआ?",
        answer: "2 अक्टूबर 1959 को राजस्थान के नागौर जिले में तत्कालीन प्रधानमंत्री पंडित जवाहरलाल नेहरू द्वारा बलवंत राय मेहता समिति की सिफारिशों पर पंचायती राज का औपचारिक उद्घाटन किया गया था।",
        questionEn: "Where and when was Panchayati Raj formally inaugurated in India?",
        answerEn: "On 2 October 1959 in Nagaur district, Rajasthan, inaugurated by Prime Minister Jawaharlal Nehru based on Balwant Rai Mehta Committee recommendations.",
      },
      {
        question: "जिला आयोजना समिति (DPC) का उल्लेख किस अनुच्छेद में है?",
        answer: "जिला आयोजना समिति (District Planning Committee) का प्रावधान 74वें संविधान संशोधन के तहत अनुच्छेद 243ZD में किया गया है, जो जिला स्तर पर ग्रामीण व शहरी योजनाओं का समेकन करती है।",
        questionEn: "Which constitutional article details the District Planning Committee (DPC)?",
        answerEn: "Article 243ZD under the 74th Amendment Act for consolidating rural and urban development plans at the district level.",
      },
      {
        question: "पंचायतों का कार्यकाल कितना होता है और विघटन की स्थिति में कितने समय में चुनाव अनिवार्य है?",
        answer: "पंचायतों का सामान्य कार्यकाल प्रथम बैठक से 5 वर्ष होता है। यदि पंचायत समय से पूर्व विघटित होती है, तो विघटन की तिथि से 6 माह के भीतर चुनाव कराना अनिवार्य है।",
        questionEn: "What is the tenure of Panchayats and timeline for fresh elections upon premature dissolution?",
        answerEn: "Fixed 5-year tenure; upon premature dissolution, fresh elections must be held within 6 months.",
      },
      {
        question: "MPPSC परीक्षा की दृष्टि से 73वां व 74वां संशोधन किस प्रश्नपत्र से संबंधित है?",
        answer: "यह विषय MPPSC मुख्य परीक्षा के द्वितीय प्रश्नपत्र (Paper 2: शासन व्यवस्था, राजव्यवस्था व स्थानीय स्वशासन) तथा प्रारंभिक परीक्षा की इकाई 5 हेतु अत्यंत महत्वपूर्ण है।",
        questionEn: "Under which MPPSC paper is the Panchayati Raj topic covered?",
        answerEn: "MPPSC Mains Paper 2 (Governance, Polity & Local Self-Government) and Prelims Unit 5.",
      },
    ],

    /* ─── MCQs (EXACTLY 8 FOR STATIC GK / CURRENT AFFAIRS) ───── */
    mcqs: [
      {
        question: "73वां संविधान संशोधन अधिनियम, 1992 किस तिथि से प्रभाव में आया?",
        options: ["2 अक्टूबर 1959", "24 अप्रैल 1993", "1 जून 1993", "26 जनवरी 1950"],
        correctIndex: 1,
        explanation: "73वां संविधान संशोधन 24 अप्रैल 1993 से लागू हुआ, जिसकी स्मृति में प्रतिवर्ष 24 अप्रैल को राष्ट्रीय पंचायती राज दिवस मनाया जाता है।",
        questionEn: "On which date did the 73rd Constitutional Amendment Act, 1992 come into force?",
        optionsEn: ["2 October 1959", "24 April 1993", "1 June 1993", "26 January 1950"],
        explanationEn: "The 73rd Amendment came into force on 24 April 1993, celebrated annually as National Panchayati Raj Day.",
      },
      {
        question: "73वें संविधान संशोधन द्वारा संविधान में कौन सी अनुसूची जोड़ी गई और इसमें कुल कितने विषय हैं?",
        options: ["9वीं अनुसूची, 22 विषय", "10वीं अनुसूची, 10 विषय", "11वीं अनुसूची, 29 विषय", "12वीं अनुसूची, 18 विषय"],
        correctIndex: 2,
        explanation: "73वें संशोधन द्वारा संविधान में 11वीं अनुसूची जोड़ी गई, जिसमें पंचायती राज संस्थाओं के लिए 29 कार्य क्षेत्र (Subjects) शामिल हैं।",
        questionEn: "Which schedule was added by the 73rd Constitutional Amendment Act, and how many subjects does it contain?",
        optionsEn: ["9th Schedule, 22 subjects", "10th Schedule, 10 subjects", "11th Schedule, 29 subjects", "12th Schedule, 18 subjects"],
        explanationEn: "The 73rd Amendment added the 11th Schedule containing 29 functional subjects for rural local bodies.",
      },
      {
        question: "74वें संविधान संशोधन अधिनियम द्वारा जोड़ी गई 12वीं अनुसूची में नगर पालिकाओं के लिए कितने विषयों का उल्लेख है?",
        options: ["12 विषय", "18 विषय", "29 विषय", "33 विषय"],
        correctIndex: 1,
        explanation: "74वें संविधान संशोधन (नगरीय निकाय) द्वारा जोड़ी गई 12वीं अनुसूची में कुल 18 विषय शामिल हैं।",
        questionEn: "How many functional subjects are listed under the 12th Schedule added by the 74th Amendment Act?",
        optionsEn: ["12 subjects", "18 subjects", "29 subjects", "33 subjects"],
        explanationEn: "The 12th Schedule added by the 74th Amendment contains 18 urban functional subjects.",
      },
      {
        question: "भारत में स्थानीय स्वशासन का जनक (Father of Local Self-Government in India) किसे माना जाता है?",
        options: ["लॉर्ड कर्जन", "लॉर्ड रिपन", "लॉर्ड माउंटबेटन", "पंडित जवाहरलाल नेहरू"],
        correctIndex: 1,
        explanation: "वर्ष 1882 में स्थानीय स्वशासन पर प्रसिद्ध प्रस्ताव पारित करने के कारण लॉर्ड रिपन को भारत में स्थानीय स्वशासन का जनक कहा जाता है।",
        questionEn: "Who is known as the 'Father of Local Self-Government in India'?",
        optionsEn: ["Lord Curzon", "Lord Ripon", "Lord Mountbatten", "Jawaharlal Nehru"],
        explanationEn: "Lord Ripon is regarded as the Father of Local Self-Government in India due to his landmark 1882 resolution.",
      },
      {
        question: "निम्नलिखित में से किस समिति ने पंचायती राज संस्थाओं को 'संवैधानिक दर्जा' देने की सबसे सशक्त सिफारिश की थी?",
        options: ["बलवंत राय मेहता समिति (1957)", "अशोक मेहता समिति (1977)", "जी.वी.के. राव समिति (1985)", "एल.एम. सिंघवी समिति (1986)"],
        correctIndex: 3,
        explanation: "एल.एम. सिंघवी समिति (1986) ने पंचायतों को संवैधानिक रूप से संरक्षित और मान्यता देने की सिफारिश की थी, जिसके परिणामस्वरूप 73वां संशोधन पारित हुआ।",
        questionEn: "Which committee strongly recommended granting 'Constitutional Status' to Panchayati Raj Institutions?",
        optionsEn: ["Balwant Rai Mehta Committee (1957)", "Ashok Mehta Committee (1977)", "G.V.K. Rao Committee (1985)", "L.M. Singhvi Committee (1986)"],
        explanationEn: "The L.M. Singhvi Committee (1986) recommended granting constitutional status to local self-government institutions.",
      },
      {
        question: "संविधान के किस अनुच्छेद के तहत पंचायती राज संस्थाओं के लिए 'राज्य निर्वाचन आयोग' (State Election Commission) का प्रावधान है?",
        options: ["अनुच्छेद 243A", "अनुच्छेद 243D", "अनुच्छेद 243I", "अनुच्छेद 243K"],
        correctIndex: 3,
        explanation: "अनुच्छेद 243K के तहत पंचायतों के चुनावों के संचालन, मतदाता सूची तैयार करने और नियंत्रण हेतु स्वतंत्र राज्य निर्वाचन आयोग का प्रावधान है।",
        questionEn: "Under which article of the Indian Constitution is the State Election Commission provided for Panchayats?",
        optionsEn: ["Article 243A", "Article 243D", "Article 243I", "Article 243K"],
        explanationEn: "Article 243K provides for a State Election Commission to superintend, direct, and conduct all elections to Panchayats.",
      },
      {
        question: "जिला स्तर पर ग्रामीण और शहरी विकास योजनाओं के समेकन हेतु 'जिला आयोजना समिति' (DPC) का गठन किस अनुच्छेद के तहत होता है?",
        options: ["अनुच्छेद 243ZD", "अनुच्छेद 243ZE", "अनुच्छेद 243ZB", "अनुच्छेद 243ZA"],
        correctIndex: 0,
        explanation: "74वें संशोधन के तहत अनुच्छेद 243ZD के अनुसार प्रत्येक राज्य में जिला स्तर पर जिला आयोजना समिति (District Planning Committee) का गठन किया जाता है।",
        questionEn: "Under which article is the District Planning Committee (DPC) constituted to consolidate district plans?",
        optionsEn: ["Article 243ZD", "Article 243ZE", "Article 243ZB", "Article 243ZA"],
        explanationEn: "Article 243ZD provides for the constitution of a District Planning Committee at the district level.",
      },
      {
        question: "मध्य प्रदेश में पंचायती राज संस्थाओं में महिलाओं के लिए कितने प्रतिशत स्थान आरक्षित किए गए हैं?",
        options: ["33%", "40%", "50%", "25%"],
        correctIndex: 2,
        explanation: "संविधान में न्यूनतम 33% आरक्षण अनिवार्य है, परंतु मध्य प्रदेश पंचायती राज अधिनियम के तहत महिलाओं को पंचायतों में 50% आरक्षण दिया गया है।",
        questionEn: "What percentage of seats is reserved for women in Panchayati Raj Institutions in Madhya Pradesh?",
        optionsEn: ["33%", "40%", "50%", "25%"],
        explanationEn: "While Article 243D mandates a minimum 33% reservation, Madhya Pradesh provides 50% reservation for women in local bodies.",
      },
    ],
  };

  // Upload / Replace Article in Sanity
  console.log("💾 Uploading 73rd & 74th Amendments Article to Sanity...");
  const res = await client.createOrReplace(article);
  console.log(`✅ Successfully uploaded article to Sanity! Document ID: ${res._id}`);

  // If previous duplicate slug document exists under a different ID, clean it up or ensure current slug points to this doc
  console.log(`✔ Primary URL slug set to: /general-awareness/${targetSlug}`);
}

main().catch((err) => {
  console.error("❌ Error uploading article to Sanity:", err);
  process.exit(1);
});
