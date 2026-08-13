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
  console.log("🚀 Starting Top-Rank SEO & Indexed URL alignment for 73rd and 74th Constitutional Amendments...");

  // Existing uploaded images IDs from Sanity asset database
  const assetConstId = "image-bac2c57a0cf482b4efa615f865de8fecc875d55f-1024x1024-jpg";
  const assetPanchayatId = "image-df3cb98492854b688f5e613bcb1f2db293ef6548-1024x1024-jpg";
  const assetMunicipalId = "image-fcb0622ce7f25d8b307acb015a6161a1adb4f312-1024x1024-jpg";

  // Google Indexed Primary Slug requested by user:
  // https://aakarias.com/en/current-affairs/73rd-74th-constitutional-amendment-acts-panchayati-raj-mppsc-notes
  const googleIndexedSlug = "73rd-74th-constitutional-amendment-acts-panchayati-raj-mppsc-notes";
  const shortSlug = "73-74-amendment-act-panchayati-raj-mppsc-notes";

  // Comprehensive Keyword Target Array covering all Google Autocomplete, PAA & Search Queries
  const seoKeywords = [
    // Google Autocomplete (Hinglish + Hindi + English)
    "73 va samvidhan sanshodhan kisse sambandhit hai",
    "73 va samvidhan sanshodhan kya hai",
    "73 va samvidhan sanshodhan kab hua",
    "73 va samvidhan sanshodhan ki pramukh visheshtaon ki vyakhya karen",
    "73 va samvidhan sanshodhan kab lagu hua",
    "73 va samvidhan sanshodhan adhiniyam evam vartman janjati rajniti sangathan",
    "73 va samvidhan sanshodhan adhiniyam kya hai",
    "73 va samvidhan sanshodhan ki vyakhya kijiye",
    "73 va samvidhan sanshodhan kyon mahatvpurn hai",
    "73 va samvidhan sanshodhan kab hua tha",
    "73 and 74 amendment in hindi",
    "73 and 74 amendment of indian constitution in hindi",
    "73 and 74 amendment of indian constitution",
    "73 and 74 amendment act",
    "73 and 74 amendment",
    "73 and 74 constitutional amendment",
    "73 and 74 constitutional amendment act",
    "73 and 74 amendment of indian constitution year",
    "73 and 74 amendment year",
    "73 and 74 caa",
    "74 va samvidhan sanshodhan",
    "74 va samvidhan sanshodhan kab lagu hua",
    "73rd and 74th Amendment PDF",
    "73 and 74 Amendment UPSC",
    "73rd and 74th Constitutional Amendment Act",
    "73 and 74 Amendment ipleaders",
    "73rd and 74th Amendment Notes",
    "73rd and 74th amendment in which schedule",
    "73 and 74 amendment implementation",
    "73rd and 74th Amendment assignment",
    "73वां संविधान संशोधन PDF",
    "74वां संविधान संशोधन PDF",
    "73 व 74 वें संविधान संशोधन",
    "74 संविधान संशोधन कब हुआ wikipedia",
    "पंचायत राज 73 और 74 के संशोधन क्या हैं",
    "73वां और 74वां संशोधन क्या हैं",
    "73वां और 74वां संविधान संशोधन कब हुए थे",
    "73वां संविधान संशोधन में क्या लिखा गया है",
    "संविधान के 73वें एवं 74वें संशोधन में क्या अंतर है",
    "73वें और 74वें संशोधन की 30वीं वर्षगाँठ",
    // People Also Ask Specific Queries
    "अनुच्छेद 243a से 243o में क्या प्रावधान हैं",
    "अनुच्छेद 243-y में क्या है",
    "अनुच्छेद 243d 3 क्या कहता है",
    "अनुच्छेद 243J किस बारे में है",
    // MPPSC & UPSC Target Keywords
    "MPPSC Mains Paper 2 Governance Panchayati Raj",
    "MPPSC Polity Notes PDF",
    "11th Schedule 29 Subjects",
    "12th Schedule 18 Subjects",
    "Gram Sabha Article 243A",
    "State Election Commission Article 243K",
    "State Finance Commission Article 243I",
    "PESA Act 1996 Tribal Politics"
  ];

  const commonData = {
    title: "73वां व 74वां संविधान संशोधन अधिनियम (पंचायती राज व नगरीय निकाय): कब लागू हुआ, 11वीं व 12वीं अनुसूची, 29 विषय, मुख्य प्रावधान व अंतर | MPPSC & UPSC Notes",
    titleEn: "73rd and 74th Constitutional Amendment Acts, 1992 (Panchayati Raj & Municipalities): Implementation Date, 11th & 12th Schedules, 29 & 18 Subjects, Key Features & Difference | MPPSC & UPSC Notes PDF",
    excerpt: "73वें (पंचायती राज) और 74वें (नगरीय निकाय) संविधान संशोधन अधिनियम 1992 का संपूर्ण विश्लेषण। भारत में कब लागू हुआ (24 अप्रैल 1993 व 1 जून 1993), भाग 9 व 9A, 11वीं (29 विषय) व 12वीं अनुसूची (18 विषय), अनुच्छेद 243A से 243ZG तक विस्तृत व्याख्या, 33%-50% महिला आरक्षण (अनुच्छेद 243D), राज्य चुनाव व वित्त आयोग, PESA अधिनियम 1996 एवं MPPSC/UPSC नोट्स।",
    excerptEn: "Comprehensive exam-oriented guide on the 73rd & 74th Constitutional Amendment Acts, 1992. Covers implementation dates (24 April 1993 & 1 June 1993), Parts IX & IXA, 11th & 12th Schedules (29 & 18 subjects), Articles 243A-243ZG breakdown, women reservation (Art 243D), SEC, SFC, DPC, PESA Act 1996, comparative tables, 8 FAQs & 8 MCQs for MPPSC & UPSC.",
    ca_date: "2026-08-13",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 14,
    keywords: seoKeywords,
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
      asset: { _type: "reference", _ref: assetConstId },
      alt: "73वां व 74वां संविधान संशोधन अधिनियम 1992 पंचायती राज एवं नगरीय निकाय MPPSC UPSC नोट्स",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Quick Overview ──────────────────────────────────── */
      {
        _key: "sec-overview",
        kind: "whyInNews",
        title: "73वां व 74वां संविधान संशोधन अधिनियम: मुख्य बिंदु (Quick Overview)",
        titleEn: "73rd and 74th Constitutional Amendment Acts: Quick Overview",
        body: [
          ...createBlocks([
            "भारत में **73वें एवं 74वें संविधान संशोधन अधिनियम, 1992** (73rd and 74th Constitutional Amendment Acts) द्वारा लोकतांत्रिक विकेंद्रीकरण (Democratic Decentralization) को संवैधानिक संरक्षण प्रदान किया गया। इसके माध्यम से भारत में ग्रामीण पंचायती राज संस्थाओं और शहरी नगरीय निकायों को त्रिस्तरीय स्वशासन प्रणाली का रूप दिया गया।",
            "• **73वां संविधान संशोधन (ग्रामीण स्वशासन)**: 24 अप्रैल 1993 से लागू हुआ (इसलिए 24 अप्रैल को **राष्ट्रीय पंचायती राज दिवस** मनाया जाता है)। इसके द्वारा संविधान में **भाग IX** तथा **11वीं अनुसूची** जोड़ी गई, जिसमें **29 कार्य क्षेत्र (Subjects)** शामिल हैं।",
            "• **74वां संविधान संशोधन (शहरी स्वशासन)**: 1 जून 1993 से लागू हुआ। इसके द्वारा संविधान में **भाग IXA** तथा **12वीं अनुसूची** जोड़ी गई, जिसमें **18 कार्य क्षेत्र** शामिल हैं।",
            "• **संवैधानिक प्रावधान**: अनुच्छेद 243 से 243O (पंचायतों हेतु) तथा अनुच्छेद 243P से 243ZG (नगर पालिकाओं हेतु)।",
            "• **आरक्षण**: महिलाओं के लिए न्यूनतम 33% (1/3) आरक्षण अनिवार्य (मध्य प्रदेश में **50% आरक्षण** लागू)।",
            "• **परीक्षा उपयोगिता**: यह विषय [MPPSC मुख्य परीक्षा पाठ्यक्रम](/mppsc/mains-syllabus) (द्वितीय प्रश्नपत्र: भारतीय राजव्यवस्था व स्थानीय शासन) तथा UPSC GS-2 के लिए अत्यंत महत्वपूर्ण है।"
          ]),
          createTable(
            "table-73-74-summary",
            "73वें एवं 74वें संविधान संशोधन अधिनियम: मुख्य तुलनात्मक तालिका",
            ["विशेषता / विषय (Feature)", "73वां संविधान संशोधन (पंचायती राज)", "74वां संविधान संशोधन (नगरीय निकाय)"],
            [
              ["**संवैधानिक भाग (Part)**", "भाग IX (Part IX - अनुच्छेद 243 से 243O)", "भाग IXA (Part IXA - अनुच्छेद 243P से 243ZG)"],
              ["**संविधान अनुसूची (Schedule)**", "11वीं अनुसूची (11th Schedule)", "12वीं अनुसूची (12th Schedule)"],
              ["**कार्यों की संख्या (Subjects)**", "29 कार्य क्षेत्र (29 Subjects)", "18 कार्य क्षेत्र (18 Subjects)"],
              ["**लागू होने की तिथि (Enforcement)**", "24 अप्रैल 1993 (राष्ट्रीय पंचायती राज दिवस)", "1 जून 1993"],
              ["**संस्थागत स्तर (Tiers)**", "ग्राम पंचायत, जनपद/ब्लॉक पंचायत, जिला पंचायत", "नगर पंचायत, नगर पालिका परिषद, नगर निगम"],
              ["**महिला आरक्षण (Reservation)**", "अनुच्छेद 243D (न्यूनतम 33%, MP में 50%)", "अनुच्छेद 243T (न्यूनतम 33%, MP में 50%)"],
              ["**संबद्ध स्वतंत्र आयोग**", "राज्य निर्वाचन आयोग (243K), राज्य वित्त आयोग (243I)", "राज्य निर्वाचन आयोग (243ZA), राज्य वित्त आयोग (243Y)"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "The **73rd and 74th Constitutional Amendment Acts of 1992** institutionalized local self-government in India.",
            "• **73rd Amendment (Rural)**: Enforced on **24 April 1993** (National Panchayati Raj Day). Added **Part IX** and **11th Schedule** with **29 subjects**.",
            "• **74th Amendment (Urban)**: Enforced on **1 June 1993**. Added **Part IXA** and **12th Schedule** with **18 subjects**.",
            "• **Women Reservation**: Minimum 33% (1/3rd seats) mandated nationally, extended to **50% in Madhya Pradesh**."
          ])
        ],
      },

      /* ── 2. Historical Background & 73rd Amendment Overview ─── */
      {
        _key: "sec-73rd-details",
        kind: "background",
        title: "73वां संविधान संशोधन अधिनियम क्या है और कब लागू हुआ? (73rd Amendment Act 1992 Overview)",
        titleEn: "What is the 73rd Constitutional Amendment Act 1992 and when was it enforced?",
        body: [
          ...createBlocks([
            "73वां संविधान संशोधन अधिनियम, 1992 (73rd Constitutional Amendment Act) ग्रामीण भारत में त्रिस्तरीय पंचायती राज व्यवस्था को संवैधानिक मान्यता देने वाला ऐतिहासिक कानून है।",
            "### ऐतिहासिक पृष्ठभूमि एवं प्रमुख सिफारिशी समितियाँ",
            "भारत में पंचायती राज की नींव लॉर्ड रिपन के 1882 के स्थानीय स्वशासन प्रस्ताव और स्वतंत्रता के बाद भारतीय संविधान के **अनुच्छेद 40 (राज्य के नीति निदेशक तत्व)** पर आधारित है। इसे संवैधानिक स्वरूप देने में निम्नलिखित समितियों का अमूल्य योगदान रहा:",
            "• **बलवंत राय मेहता समिति (1957)**: भारत में **त्रिस्तरीय पंचायती राज व्यवस्था** (ग्राम स्तर, मध्यवर्ती/जनपद स्तर, जिला स्तर) की सिफारिश की। 2 अक्टूबर 1959 को राजस्थान के **नागौर जिले** में भारत के प्रथम प्रधानमंत्री पंडित जवाहरलाल नेहरू द्वारा पंचायती राज का औपचारिक उद्घाटन किया गया।",
            "• **अशोक मेहता समिति (1977)**: त्रिस्तरीय व्यवस्था के स्थान पर **द्विस्तरीय प्रणाली** (मंडल पंचायत एवं जिला परिषद) का सुझाव दिया।",
            "• **जी.वी.के. राव समिति (1985)**: पंचायतों को बिना वित्तीय अधिकार के 'बिना जड़ की घास' (Grass without roots) कहा।",
            "• **एल.एम. सिंघवी समिति (1986)**: पंचायती राज संस्थाओं को **संवैधानिक दर्जा देने (Constitutional Status)** की सबसे सशक्त सिफारिश करने वाली समिति थी।",
            "• **पी.के. थुंगन समिति (1988)**: संवैधानिक दर्जा और 5 वर्ष का निश्चित कार्यकाल तय करने का सुझाव दिया।",
            "### संसद में पारित होने व लागू होने का समय-क्रम (Timeline)",
            "• **लोकसभा पारित**: 22 दिसंबर 1992",
            "• **राज्यसभा पारित**: 23 दिसंबर 1992",
            "• **राष्ट्रपति की स्वीकृति**: 20 अप्रैल 1993 (राष्ट्रपति डॉ. शंकर दयाल शर्मा द्वारा स्वीकृत)",
            "• **प्रवर्तन (लागू होने की तिथि)**: **24 अप्रैल 1993** (इसी कारण प्रतिवर्ष 24 अप्रैल को **राष्ट्रीय पंचायती राज दिवस** के रूप में मनाया जाता है)।"
          ]),
          {
            _key: "b-img-panchayat",
            _type: "image",
            asset: { _type: "reference", _ref: assetPanchayatId },
            alt: "Gram Panchayat Sarpanch meeting under 73rd constitutional amendment MPPSC UPSC Notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Historical Committees on Panchayati Raj",
            "• **Balwant Rai Mehta Committee (1957)**: Recommended a 3-tier Panchayati Raj system. First launched in Nagaur, Rajasthan on 2 October 1959.",
            "• **Ashok Mehta Committee (1977)**: Advocated a 2-tier model.",
            "• **G.V.K. Rao Committee (1985)**: Highlighted administrative weakness ('grass without roots').",
            "• **L.M. Singhvi Committee (1986)**: Strongly recommended granting **Constitutional Status** to Panchayati Raj.",
            "• **P.K. Thungan Committee (1988)**: Supported 5-year tenure and constitutional protection.",
            "### Legislative Timeline",
            "Enacted on 20 April 1993 and came into force on **24 April 1993** (National Panchayati Raj Day)."
          ])
        ],
      },

      /* ── 3. Articles 243A to 243O Detailed Breakdown ───────── */
      {
        _key: "sec-articles-243",
        kind: "keyHighlights",
        title: "अनुच्छेद 243A से 243O के प्रमुख प्रावधान (Article 243A to 243O Breakdown & Article 243D Women Reservation)",
        titleEn: "Detailed Constitutional Provisions: Articles 243A to 243O Explained",
        body: [
          ...createBlocks([
            "73वें संविधान संशोधन द्वारा संविधान के भाग IX में अनुच्छेद 243 से 243O तक कुल 16 अनुच्छेद शामिल किए गए। प्रतियोगी परीक्षाओं (MPPSC/UPSC) हेतु प्रत्येक अनुच्छेद का विवरण नीचे दिया गया है:",
            "### 1. अनुच्छेद 243A: ग्राम सभा (Gram Sabha)",
            "• ग्राम सभा पंचायती राज व्यवस्था का मूल आधार और प्राथमिक स्थायी निकाय है। इसमें गाँव की मतदाता सूची में पंजीकृत **सभी वयस्क नागरिक** शामिल होते हैं।",
            "### 2. अनुच्छेद 243B: पंचायतों का गठन (Constitution of Panchayats)",
            "• 20 लाख से अधिक आबादी वाले राज्यों में त्रिस्तरीय ढाँचा (ग्राम, जनपद/मध्यवर्ती और जिला स्तर) अनिवार्य है। 20 लाख से कम जनसंख्या वाले राज्यों में मध्यवर्ती स्तर बनाना अनिवार्य नहीं है।",
            "### 3. अनुच्छेद 243C: पंचायतों की संरचना (Composition of Panchayats)",
            "• पंचायतों के सभी प्रत्यक्ष चुनाव प्रादेशिक निर्वाचन क्षेत्रों से सीधे चुने जाएंगे। ग्राम पंचायत के अध्यक्ष (सरपंच) के चुनाव का तरीका राज्य विधानमंडल तय करता है।",
            "### 4. अनुच्छेद 243D: सीटों का आरक्षण एवं महिला आरक्षण (Reservation of Seats & Article 243D(3))",
            "• **अनुसूचित जाति (SC) व अनुसूचित जनजाति (ST)**: जनसंख्या के अनुपात में आरक्षण।",
            "• **अनुच्छेद 243D(3) (महिला आरक्षण)**: प्रत्येक पंचायत में प्रत्यक्ष निर्वाचन द्वारा भरी जाने वाली कुल सीटों का **कम से कम एक-तिहाई (33%)** महिलाओं के लिए आरक्षित होगा।",
            "• **मध्य प्रदेश में महिला आरक्षण**: मध्य प्रदेश पंचायती राज अधिनियम के तहत महिलाओं को पंचायतों के सभी स्तरों पर **50% आरक्षण** प्रदान किया गया है।",
            "### 5. अनुच्छेद 243E: पंचायतों का कार्यकाल (Duration of Panchayats)",
            "• पंचायतों का कार्यकाल पहली बैठक से **5 वर्ष** निर्धारित है। यदि पंचायत समय से पूर्व विघटित होती है, तो विघटन की तिथि से **6 माह के भीतर** चुनाव कराना अनिवार्य है।",
            "### 6. अनुच्छेद 243G: 11वीं अनुसूची एवं 29 विषय (11th Schedule & 29 Functional Subjects)",
            "• पंचायतों को आर्थिक विकास और सामाजिक न्याय हेतु कार्य करने की शक्तियाँ दी गई हैं। 11वीं अनुसूची में कुल **29 विषय** शामिल हैं, जैसे: कृषि, भूमि सुधार, लघु सिंचाई, पशुपालन, मत्स्य पालन, पेयजल, ग्रामीण सड़कें, गरीबी उन्मूलन, प्राथमिक शिक्षा, स्वास्थ्य व स्वच्छता।",
            "### 7. अनुच्छेद 243I: राज्य वित्त आयोग (State Finance Commission)",
            "• राज्य की पंचायतों की वित्तीय स्थिति की समीक्षा करने और करों/राजस्व के बँटवारे की सिफारिश हेतु **प्रति 5 वर्ष में राज्य के राज्यपाल द्वारा** राज्य वित्त आयोग का गठन किया जाता है।",
            "### 8. अनुच्छेद 243J: पंचायतों के लेखाओं की संपरीक्षा (Audit of Accounts of Panchayats)",
            "• पंचायतों द्वारा व्यय किए गए धन के लेखा-जोखा एवं ऑडिट की व्यवस्था राज्य विधानमंडल द्वारा बनाए गए कानूनों के तहत की जाती है।",
            "### 9. अनुच्छेद 243K: राज्य निर्वाचन आयोग (State Election Commission)",
            "• पंचायतों के सभी चुनावों के लिए मतदाता सूची तैयार करने, अधीक्षण, निर्देशन और नियंत्रण हेतु एक स्वतंत्र **राज्य निर्वाचन आयोग** का प्रावधान है, जिसके प्रमुख राज्य निर्वाचन आयुक्त की नियुक्ति राज्यपाल द्वारा की जाती है।",
            "• **सम्बंधित अध्ययन सामग्री**: [संविधान सभा का गठन व इतिहास](/general-awareness/constituent-assembly-formation-history-mppsc-notes), [उभयलिंगी व्यक्ति संशोधन अधिनियम 2026](/current-affairs/transgender-persons-amendment-act-2026-mppsc-upsc-notes) तथा [एमपी समान नागरिक संहिता (UCC) विधेयक](/current-affairs/mp-ucc-bill-2026-mppsc-upsc-notes)।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Key Articles Breakdown (243A to 243O)",
            "• **Art 243A (Gram Sabha)**: Primary permanent body comprising registered village voters.",
            "• **Art 243B (3-Tier System)**: Mandates 3-tier structure for states with population > 20 Lakhs.",
            "• **Art 243D / Art 243D(3) (Reservation)**: Guarantees minimum 33% reservation for women (50% in Madhya Pradesh).",
            "• **Art 243E (Tenure)**: Fixed 5-year tenure; elections mandatory within 6 months upon early dissolution.",
            "• **Art 243G (11th Schedule)**: Contains 29 functional subjects for rural development.",
            "• **Art 243I (State Finance Commission)**: Constituted every 5 years by the Governor.",
            "• **Art 243J (Audit)**: State legislature determines audit procedures for Panchayats.",
            "• **Art 243K (State Election Commission)**: Independent body conducting local elections."
          ])
        ],
      },

      /* ── 4. 74th Amendment Act & Article 243P to 243ZG ─────── */
      {
        _key: "sec-74th-details",
        kind: "keyHighlights",
        title: "74वां संविधान संशोधन अधिनियम, 12वीं अनुसूची (18 विषय) एवं अनुच्छेद 243P से 243ZG (74th Amendment & Article 243-Y)",
        titleEn: "74th Constitutional Amendment Act: Urban Local Bodies, 12th Schedule & Article 243-Y",
        body: [
          ...createBlocks([
            "74वां संविधान संशोधन अधिनियम, 1992 शहरी स्थानीय निकायों (Municipalities) को संवैधानिक दर्जा प्रदान करता है। यह 1 जून 1993 से लागू हुआ।",
            "### 1. नगर पालिकाओं के तीन प्रकार (Article 243Q)",
            "• **नगर पंचायत**: ग्रामीण क्षेत्र से शहरी क्षेत्र में परिवर्तित हो रहे संक्रमणशील क्षेत्रों के लिए।",
            "• **नगर पालिका परिषद**: छोटे शहरी क्षेत्रों के लिए।",
            "• **नगर निगम**: बड़े महानगरों और बड़े नगरों के लिए।",
            "### 2. 12वीं अनुसूची एवं 18 विषय (12th Schedule & 18 Subjects - Article 243W)",
            "12वीं अनुसूची में नगर पालिकाओं के कार्यों के लिए **18 विषय** तय किए गए हैं, जिनमें नगर योजना, भूमि उपयोग नियमन, सड़कें व पुल, जल आपूर्ति, लोक स्वास्थ्य, अग्निशमन सेवाएँ, झुग्गी सुधार व पर्यावरण संरक्षण शामिल हैं।",
            "### 3. अनुच्छेद 243-Y: राज्य वित्त आयोग (Article 243-Y)",
            "• अनुच्छेद 243-Y के तहत अनुच्छेद 243I में गठित राज्य वित्त आयोग ही नगर पालिकाओं की वित्तीय स्थिति की समीक्षा करेगा और राज्य के संचित कोष से अनुदान की सिफारिश करेगा।",
            "### 4. जिला आयोजना समिति एवं महानगर आयोजना समिति (Articles 243ZD & 243ZE)",
            "• **अनुच्छेद 243ZD (जिला आयोजना समिति - DPC)**: जिला स्तर पर पंचायतों और नगर पालिकाओं द्वारा बनाई गई विकास योजनाओं को समेकित (Consolidate) करने हेतु गठित की जाती है।",
            "• **अनुच्छेद 243ZE (महानगर आयोजना समिति - MPC)**: महानगर क्षेत्रों (Metropolitan Areas) में संपूर्ण विकास का प्रारूप तैयार करती है।"
          ]),
          {
            _key: "b-img-municipal",
            _type: "image",
            asset: { _type: "reference", _ref: assetMunicipalId },
            alt: "Municipal Corporation Building 74th constitutional amendment MPPSC UPSC Notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### 74th Amendment Overview (Articles 243P to 243ZG)",
            "• **3 Urban Bodies (Art 243Q)**: Nagar Panchayat, Municipal Council, Municipal Corporation.",
            "• **12th Schedule (Art 243W)**: Contains 18 urban functional subjects.",
            "• **Art 243-Y (State Finance Commission)**: Reviews municipal financial health.",
            "• **Art 243ZD (District Planning Committee)**: Consolidates rural and urban plans at district level.",
            "• **Art 243ZE (Metropolitan Planning Committee)**: Prepares development draft for metropolitan regions."
          ])
        ],
      },

      /* ── 5. Comparison Table: 73rd vs 74th Amendment ───────── */
      {
        _key: "sec-comparison",
        kind: "background",
        title: "73वें एवं 74वें संविधान संशोधन में क्या अंतर है? (Difference between 73rd and 74th Amendments)",
        titleEn: "Difference between 73rd and 74th Constitutional Amendment Acts",
        body: [
          ...createBlocks([
            "संविधान के 73वें और 74वें संशोधन दोनों का उद्देश्य स्थानीय स्वशासन को मजबूत करना है, परंतु इनके कार्यक्षेत्र और संरचना में मुख्य अंतर निम्नलिखित हैं:"
          ]),
          createTable(
            "table-diff-73-74",
            "73वें एवं 74वें संविधान संशोधन में अंतर (Comparison Table)",
            ["तुलना का आधार", "73वां संविधान संशोधन (पंचायती राज)", "74वां संविधान संशोधन (नगरीय निकाय)"],
            [
              ["**कार्यक्षेत्र (Scope)**", "ग्रामीण क्षेत्र (Rural Areas)", "शहरी / नगरीय क्षेत्र (Urban Areas)"],
              ["**संवैधानिक भाग (Part)**", "भाग IX (Part IX)", "भाग IXA (Part IXA)"],
              ["**अनुसूची (Schedule)**", "11वीं अनुसूची (11th Schedule)", "12वीं अनुसूची (12th Schedule)"],
              ["**विषयों की संख्या (Subjects)**", "29 कार्य क्षेत्र", "18 कार्य क्षेत्र"],
              ["**लागू होने की तिथि**", "24 अप्रैल 1993 (राष्ट्रीय पंचायती राज दिवस)", "1 जून 1993"],
              ["**प्राथमिक संस्था**", "ग्राम सभा (Gram Sabha)", "वार्ड समितियाँ (Ward Committees)"],
              ["**विशेष समिति**", "ग्राम विकास समितियाँ", "जिला आयोजना समिति (243ZD) व महानगर समिति (243ZE)"]
            ]
          )
        ],
        bodyEn: [
          createTable(
            "table-diff-73-74-en",
            "Key Differences: 73rd vs 74th Amendment Act",
            ["Parameter", "73rd Amendment (Panchayati Raj)", "74th Amendment (Municipalities)"],
            [
              ["**Domain**", "Rural Local Bodies", "Urban Local Bodies"],
              ["**Part Added**", "Part IX", "Part IXA"],
              ["**Schedule**", "11th Schedule (29 Subjects)", "12th Schedule (18 Subjects)"],
              ["**Enforcement Date**", "24 April 1993", "1 June 1993"],
              ["**Basic Unit**", "Gram Sabha", "Ward Committee"]
            ]
          )
        ],
      },

      /* ── 6. PESA Act 1996 & Tribal Politics ─────────────────── */
      {
        _key: "sec-pesa-tribal",
        kind: "keyHighlights",
        title: "जनजातीय क्षेत्रों में कार्यान्वयन: PESA अधिनियम 1996 एवं वर्तमान जनजाति राजनीति (73rd Amendment & Tribal Governance)",
        titleEn: "PESA Act 1996: Extension of 73rd Amendment to Scheduled Areas & Tribal Politics",
        body: [
          ...createBlocks([
            "73वें संविधान संशोधन के प्रावधान मूल रूप से संविधान की 5वीं अनुसूची के अनुसूचित जनजातीय क्षेत्रों (Scheduled Areas) में स्वतः लागू नहीं हुए थे।",
            "• **PESA अधिनियम 1996 (PESA Act 1996)**: दिलीप सिंह भूरिया समिति की सिफारिशों के आधार पर 24 दिसंबर 1996 को **पंचायत (अनुसूचित क्षेत्रों पर विस्तार) अधिनियम, 1996** पारित किया गया।",
            "• **मुख्य अधिकार**: PESA अधिनियम ने जनजातीय समुदायों की परंपराओं, सांस्कृतिक पहचान, लघु वनोपज (MFP) पर स्वामित्व, जल-जंगल-जमीन तथा ग्राम सभा को सर्वाधिकार प्रदान किए।",
            "• **वर्तमान जनजाति राजनीति**: मध्य प्रदेश (जहाँ 15 नवंबर 2022 को PESA नियम लागू किए गए) तथा अन्य राज्यों में जनजातीय राजनीति संगठन एवं स्वशासन को सुदृढ़ करने में इस अधिनियम की भूमिका सर्वोपरि है।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### PESA Act 1996 (Panchayats Extension to Scheduled Areas)",
            "• Enacted on 24 December 1996 based on the Dilip Singh Bhuria Committee recommendations.",
            "• Extended 73rd Amendment provisions to Fifth Schedule tribal areas, granting Gram Sabha customary rights over land, water, and Minor Forest Produce (MFP)."
          ])
        ],
      },

      /* ── 7. 30th Anniversary Evaluation & MPPSC Mains Model Answer */
      {
        _key: "sec-mains-qa-eval",
        kind: "mainsAnswerWriting",
        title: "30वीं वर्षगाँठ, 3Fs चुनौतियाँ एवं MPPSC मुख्य परीक्षा मॉडल प्रश्नोत्तर (Mains Model Q&A)",
        titleEn: "30th Anniversary Evaluation, 3Fs Challenges & MPPSC Mains Model Q&A",
        body: [
          ...createBlocks([
            "पंचायती राज और नगरीय निकायों की स्थापना के 30 से अधिक वर्ष पूरे होने के बाद भी स्थानीय निकायों को कई चुनौतियों का सामना करना पड़ रहा है:",
            "### मुख्य चुनौतियाँ (3Fs - Funds, Functions, Functionaries)",
            "• **1. Funds (वित्त की कमी)**: राज्य वित्त आयोग की सिफारिशों को समय पर लागू न करना, पंचायतों द्वारा कर जुटाने की सीमित क्षमता और अनुदान पर अत्यधिक निर्भरता।",
            "• **2. Functions (कार्यों का अधूरा हस्तांतरण)**: राज्यों द्वारा 29 व 18 विषयों का पूर्ण हस्तांतरण न करना तथा नौकरशाही का अत्यधिक हस्तक्षेप।",
            "• **3. Functionaries (कर्मचारियों का अभाव)**: तकनीकी व प्रशासनिक कर्मचारियों की कमी तथा राजनीति में 'सरपंच पति' (Sarpanch Pati) संस्कृति का प्रभाव।",
            "### MPPSC मुख्य परीक्षा मॉडल उत्तर प्रारूप (11 अंक / 200 शब्द)",
            "**प्रश्न**: 'भारत में लोकतांत्रिक विकेंद्रीकरण की दिशा में 73वें एवं 74वें संविधान संशोधन अधिनियमों के योगदान का मूल्यांकन कीजिए। इन संस्थाओं की मुख्य चुनौतियों की विवेचना कीजिए।'",
            "• **उत्तर की रूपरेखा**: भूमिका (1992 के संशोधनों का संदर्भ) ➔ त्रिस्तरीय ढाँचा व आरक्षण द्वारा सामाजिक समावेश ➔ 3Fs (वित्त, कार्य, कर्मचारी) चुनौतियाँ ➔ द्वितीय प्रशासनिक सुधार आयोग (2nd ARC) सिफारिशों के साथ सकारात्मक निष्कर्ष।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### 3Fs Challenges (Funds, Functions, Functionaries)",
            "• **Funds**: Inadequate financial devolution by state governments.",
            "• **Functions**: Incomplete transfer of 29/18 subjects.",
            "• **Functionaries**: Lack of administrative staff and 'Sarpanch Pati' proxy culture.",
            "### MPPSC Mains 11-Mark Model Outline",
            "Detail 1992 constitutional decentralization, achievements in women empowerment, 3Fs bottlenecks, and 2nd ARC reform solutions."
          ])
        ],
      },

      /* ── 8. Frequently Asked Questions (FAQs) ──────────────── */
      {
        _key: "sec-faqs-section",
        kind: "faqSection",
        title: "अक्सर पूछे जाने वाले महत्वपूर्ण प्रश्न (Frequently Asked Questions)",
        titleEn: "Frequently Asked Questions (Key Doubts Cleared)",
        body: [
          ...createBlocks([
            "73वें और 74वें संविधान संशोधन से संबंधित सबसे ज्यादा पूछे जाने वाले प्रश्नों के उत्तर नीचे दिए गए हैं:",
            "### Q1. 73वां संविधान संशोधन किससे संबंधित है और कब लागू हुआ?",
            "उत्तर: 73वां संविधान संशोधन **ग्रामीण पंचायती राज व्यवस्था** से संबंधित है। यह 1992 में पारित हुआ और **24 अप्रैल 1993** से लागू हुआ (राष्ट्रीय पंचायती राज दिवस)।",
            "### Q2. 74वां संविधान संशोधन कब लागू हुआ और किस अनुसूची से संबंधित है?",
            "उत्तर: 74वां संविधान संशोधन (शहरी नगरीय निकाय) **1 जून 1993** से लागू हुआ। यह संविधान की **12वीं अनुसूची** से संबंधित है, जिसमें 18 विषय शामिल हैं।",
            "### Q3. अनुच्छेद 243A से 243O में क्या प्रावधान हैं?",
            "उत्तर: ये अनुच्छेद पंचायती राज से संबंधित हैं: 243A (ग्राम सभा), 243B (त्रिस्तरीय गठन), 243D (महिला व SC/ST आरक्षण), 243G (11वीं अनुसूची के 29 विषय), 243I (राज्य वित्त आयोग) और 243K (राज्य निर्वाचन आयोग)।",
            "### Q4. अनुच्छेद 243D(3) क्या कहता है?",
            "उत्तर: अनुच्छेद 243D(3) के अनुसार प्रत्येक पंचायत में सीटों का कम से कम **एक-तिहाई (33%)** महिलाओं के लिए आरक्षित होना अनिवार्य है (मध्य प्रदेश में 50% लागू)।",
            "### Q5. अनुच्छेद 243-Y और अनुच्छेद 243J किस बारे में हैं?",
            "उत्तर: **अनुच्छेद 243-Y** नगर पालिकाओं के लिए राज्य वित्त आयोग की व्यवस्था करता है। **अनुच्छेद 243J** पंचायतों के खातों के लेखा-जोखा व ऑडिट से संबंधित है।",
            "### Q6. 11वीं और 12वीं अनुसूची में कितने-कितने विषय हैं?",
            "उत्तर: 11वीं अनुसूची में ग्रामीण विकास हेतु **29 विषय** तथा 12वीं अनुसूची में शहरी निकायों हेतु **18 विषय** शामिल हैं।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Frequently Asked Questions",
            "Q1. What is the 73rd Constitutional Amendment Act related to and when was it enforced?",
            "Answer: It is related to rural Panchayati Raj and was enforced on 24 April 1993.",
            "Q2. What are the main provisions under Articles 243A to 243O?",
            "Answer: Gram Sabha (243A), 3-tier structure (243B), Women Reservation (243D), 29 Subjects (243G), SFC (243I), SEC (243K).",
            "Q3. What does Article 243D(3) mandate?",
            "Answer: Mandates a minimum of 33% reservation for women in Panchayats (50% in MP)."
          ])
        ],
      },

      /* ── 9. Exam Point of View Revision ──────────────────────── */
      {
        _key: "sec-exam-summary",
        kind: "keyHighlights",
        title: "EXAM POINT OF VIEW : परीक्षा की दृष्टि से महत्वपूर्ण तथ्य",
        titleEn: "EXAM POINT OF VIEW: Revision Summary for MPPSC & UPSC",
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
            "• **PESA अधिनियम 1996**: 24 दिसंबर 1996 (दिलीप सिंह भूरिया समिति)",
            "• **सम्बंधित अध्ययन सामग्री**: [संविधान सभा का गठन व इतिहास](/general-awareness/constituent-assembly-formation-history-mppsc-notes), [आपदा प्रबंधन संशोधन अधिनियम 2025](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes) तथा [उभयलिंगी व्यक्ति अधिनियम 2026](/current-affairs/transgender-persons-amendment-act-2026-mppsc-upsc-notes)।"
          ]),
          createTable(
            "table-exam-summary-final",
            "MPPSC / UPSC परीक्षा रिवीजन तालिका: 73वां व 74वां संविधान संशोधन",
            ["परीक्षा उपयोगी बिंदु", "तथ्य / प्रावधान"],
            [
              ["**73वां संशोधन (ग्रामीण)**", "भाग IX, अनुसूची 11 (29 विषय), लागू: 24 अप्रैल 1993"],
              ["**74वां संशोधन (शहरी)**", "भाग IXA, अनुसूची 12 (18 विषय), लागू: 1 जून 1993"],
              ["**प्रथम उद्घाटन राज्य**", "राजस्थान (नागौर जिला - 2 अक्टूबर 1959)"],
              ["**संवैधानिक सिफारिश समिति**", "एल.एम. सिंघवी समिति (1986)"],
              ["**महिला आरक्षण**", "अनुच्छेद 243D (न्यूनतम 33%, मध्य प्रदेश में 50%)"],
              ["**चुनाव व वित्त आयोग**", "अनुच्छेद 243K (निर्वाचन आयोग) एवं अनुच्छेद 243I (वित्त आयोग)"],
              ["**PESA अधिनियम**", "24 दिसंबर 1996 (भूरिया समिति)"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "Key revision bullet points for MPPSC Prelims/Mains and UPSC exams:",
            "• **73rd Amendment**: Part IX, 11th Schedule (29 subjects), 24 April 1993",
            "• **74th Amendment**: Part IXA, 12th Schedule (18 subjects), 1 June 1993",
            "• **First State**: Rajasthan (Nagaur - 2 Oct 1959)",
            "• **PESA Act**: 24 Dec 1996 (Bhuria Committee)"
          ])
        ],
      },
    ],

    /* ─── FAQs Array Field ─────────────────────────────────────── */
    faqs: [
      {
        question: "73वां संविधान संशोधन किससे संबंधित है और कब लागू हुआ?",
        answer: "73वां संविधान संशोधन ग्रामीण पंचायती राज व्यवस्था से संबंधित है। यह 1992 में संसद द्वारा पारित हुआ और 24 अप्रैल 1993 से लागू हुआ, जिसकी याद में प्रतिवर्ष 24 अप्रैल को राष्ट्रीय पंचायती राज दिवस मनाया जाता है।",
        questionEn: "What is the 73rd Constitutional Amendment Act related to and when was it enforced?",
        answerEn: "It is related to the rural Panchayati Raj system and came into force on 24 April 1993 (National Panchayati Raj Day).",
      },
      {
        question: "74वां संविधान संशोधन कब लागू हुआ और इसमें कितने विषय हैं?",
        answer: "74वां संविधान संशोधन (नगरीय निकाय) 1 जून 1993 से लागू हुआ। इसके द्वारा जोड़ी गई 12वीं अनुसूची में कुल 18 कार्य क्षेत्र (Subjects) शामिल हैं।",
        questionEn: "When did the 74th Amendment Act come into force and how many subjects does it contain?",
        answerEn: "It came into force on 1 June 1993 and added the 12th Schedule containing 18 urban functional subjects.",
      },
      {
        question: "अनुच्छेद 243A से 243O के मुख्य प्रावधान क्या हैं?",
        answer: "ये अनुच्छेद पंचायती राज से संबंधित हैं: 243A (ग्राम सभा), 243B (त्रिस्तरीय गठन), 243D (आरक्षण), 243G (11वीं अनुसूची के 29 विषय), 243I (राज्य वित्त आयोग) और 243K (राज्य निर्वाचन आयोग)।",
        questionEn: "What are the key provisions under Articles 243A to 243O?",
        answerEn: "Gram Sabha (243A), 3-tier structure (243B), Reservation (243D), 29 subjects (243G), SFC (243I), SEC (243K).",
      },
      {
        question: "अनुच्छेद 243D(3) में महिलाओं के लिए कितने प्रतिशत आरक्षण का प्रावधान है?",
        answer: "अनुच्छेद 243D(3) के तहत पंचायतों में महिलाओं के लिए कम से कम 33% (1/3) आरक्षण अनिवार्य है। मध्य प्रदेश, बिहार, राजस्थान जैसे राज्यों ने इसे बढ़ाकर 50% किया है।",
        questionEn: "What reservation is mandated for women under Article 243D(3)?",
        answerEn: "Minimum 33% (1/3rd seats) nationally, extended to 50% in states like Madhya Pradesh.",
      },
      {
        question: "अनुच्छेद 243-Y और अनुच्छेद 243J किस विषय से संबंधित हैं?",
        answer: "अनुच्छेद 243-Y नगर पालिकाओं हेतु राज्य वित्त आयोग का प्रावधान करता है। अनुच्छेद 243J पंचायतों के खातों के ऑडिट (संपरीक्षा) से संबंधित है।",
        questionEn: "What do Article 243-Y and Article 243J deal with?",
        answerEn: "Article 243-Y deals with the State Finance Commission for Municipalities; Article 243J deals with Panchayat account audits.",
      },
      {
        question: "11वीं और 12वीं अनुसूची में कितने-कितने विषय शामिल हैं?",
        answer: "11वीं अनुसूची में ग्रामीण स्थानीय स्वशासन हेतु 29 विषय तथा 12वीं अनुसूची में शहरी निकायों हेतु 18 विषय शामिल हैं।",
        questionEn: "How many subjects are listed in the 11th and 12th Schedules?",
        answerEn: "11th Schedule contains 29 rural subjects, while 12th Schedule contains 18 urban subjects.",
      },
      {
        question: "PESA अधिनियम 1996 क्या है और यह क्यों महत्वपूर्ण है?",
        answer: "PESA अधिनियम (पंचायत अनुसूचित क्षेत्रों पर विस्तार अधिनियम, 1996) दिलीप सिंह भूरिया समिति की सिफारिशों पर 24 दिसंबर 1996 को बना। यह 5वीं अनुसूची के जनजातीय क्षेत्रों में ग्राम सभा को स्वशासन और प्राकृतिक संसाधनों पर विशेष अधिकार देता है।",
        questionEn: "What is the PESA Act 1996?",
        answerEn: "Enacted on 24 December 1996 based on Bhuria Committee recommendations, extending 73rd Amendment principles to 5th Schedule tribal areas.",
      },
      {
        question: "MPPSC परीक्षा की दृष्टि से 73वां व 74वां संशोधन किस प्रश्नपत्र से संबंधित है?",
        answer: "यह विषय MPPSC मुख्य परीक्षा के द्वितीय प्रश्नपत्र (Paper 2: शासन व्यवस्था, राजव्यवस्था व स्थानीय स्वशासन) तथा प्रारंभिक परीक्षा की इकाई 5 हेतु अत्यंत महत्वपूर्ण है।",
        questionEn: "Under which MPPSC paper is the Panchayati Raj topic covered?",
        answerEn: "MPPSC Mains Paper 2 (Governance & Local Self-Government) and Prelims Unit 5.",
      },
    ],

    /* ─── MCQs Array Field (EXACTLY 8 HIGH QUALITY MCQs) ────── */
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
        question: "संविधान के अनुच्छेद 243D(3) के अनुसार पंचायतों में महिलाओं के लिए न्यूनतम कितना आरक्षण अनिवार्य है?",
        options: ["25%", "33% (एक-तिहाई)", "50%", "15%"],
        correctIndex: 1,
        explanation: "अनुच्छेद 243D(3) के अनुसार पंचायतों में प्रत्यक्ष चुनाव की कुल सीटों का कम से कम 33% (1/3) महिलाओं के लिए आरक्षित होगा।",
        questionEn: "What minimum reservation is guaranteed for women in Panchayats under Article 243D(3)?",
        optionsEn: ["25%", "33% (One-third)", "50%", "15%"],
        explanationEn: "Article 243D(3) mandates a minimum of 33% (one-third) seats reserved for women in Panchayats.",
      },
      {
        question: "निम्नलिखित में से किस समिति ने पंचायती राज संस्थाओं को 'संवैधानिक दर्जा' देने की सिफारिश की थी?",
        options: ["बलवंत राय मेहता समिति (1957)", "अशोक मेहता समिति (1977)", "जी.वी.के. राव समिति (1985)", "एल.एम. सिंघवी समिति (1986)"],
        correctIndex: 3,
        explanation: "एल.एम. सिंघवी समिति (1986) ने पंचायतों को संवैधानिक रूप से संरक्षित और मान्यता देने की सिफारिश की थी।",
        questionEn: "Which committee strongly recommended granting 'Constitutional Status' to Panchayati Raj Institutions?",
        optionsEn: ["Balwant Rai Mehta Committee (1957)", "Ashok Mehta Committee (1977)", "G.V.K. Rao Committee (1985)", "L.M. Singhvi Committee (1986)"],
        explanationEn: "The L.M. Singhvi Committee (1986) recommended granting constitutional status to local self-government institutions.",
      },
      {
        question: "संविधान के किस अनुच्छेद के तहत नगर पालिकाओं के लिए 'राज्य वित्त आयोग' (State Finance Commission) का प्रावधान है?",
        options: ["अनुच्छेद 243I", "अनुच्छेद 243K", "अनुच्छेद 243-Y", "अनुच्छेद 243ZD"],
        correctIndex: 2,
        explanation: "अनुच्छेद 243-Y के तहत नगर पालिकाओं की वित्तीय स्थिति की समीक्षा हेतु राज्य वित्त आयोग का प्रावधान है। (अनुच्छेद 243I पंचायतों हेतु है)।",
        questionEn: "Under which article of the Indian Constitution is the State Finance Commission provided for Municipalities?",
        optionsEn: ["Article 243I", "Article 243K", "Article 243-Y", "Article 243ZD"],
        explanationEn: "Article 243-Y provides for the State Finance Commission to review the financial position of Municipalities.",
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
        question: "PESA अधिनियम, 1996 किस समिति की सिफारिशों के आधार पर पारित किया गया था?",
        options: ["बलवंत राय मेहता समिति", "दिलीप सिंह भूरिया समिति", "अशोक मेहता समिति", "सरदार स्वर्ण सिंह समिति"],
        correctIndex: 1,
        explanation: "दिलीप सिंह भूरिया समिति (Bhuria Committee) की सिफारिशों पर 24 दिसंबर 1996 को PESA अधिनियम पारित किया गया था।",
        questionEn: "The PESA Act, 1996 was enacted based on the recommendations of which committee?",
        optionsEn: ["Balwant Rai Mehta Committee", "Dilip Singh Bhuria Committee", "Ashok Mehta Committee", "Swaran Singh Committee"],
        explanationEn: "The PESA Act 1996 was enacted based on the recommendations of the Dilip Singh Bhuria Committee.",
      },
    ],
  };

  // 1. Primary document with Google Indexed Slug: 73rd-74th-constitutional-amendment-acts-panchayati-raj-mppsc-notes
  console.log("💾 Uploading Primary Document to Sanity with Google Indexed Slug...");
  const doc1 = {
    _id: "gk-73-74-constitutional-amendments-1992",
    _type: "staticGk",
    slug: { _type: "slug", current: googleIndexedSlug },
    ...commonData,
  };
  const res1 = await client.createOrReplace(doc1);
  console.log(`✅ Uploaded Primary Static GK Article! ID: ${res1._id}, Slug: /general-awareness/${googleIndexedSlug}`);

  // 2. Secondary document with Current Affairs type & Google Indexed Slug
  console.log("💾 Uploading Current Affairs document to Sanity with Google Indexed Slug...");
  const doc2 = {
    _id: "ca-73-74-constitutional-amendments-1992",
    _type: "currentAffairs",
    slug: { _type: "slug", current: googleIndexedSlug },
    ...commonData,
  };
  const res2 = await client.createOrReplace(doc2);
  console.log(`✅ Uploaded Current Affairs Article! ID: ${res2._id}, Slug: /current-affairs/${googleIndexedSlug}`);

  // 3. Short slug document for backward compatibility
  console.log("💾 Uploading Alias Document for short slug...");
  const doc3 = {
    _id: "gk-73-74-short-slug-alias",
    _type: "staticGk",
    slug: { _type: "slug", current: shortSlug },
    ...commonData,
  };
  const res3 = await client.createOrReplace(doc3);
  console.log(`✅ Uploaded Alias Article! ID: ${res3._id}, Slug: /general-awareness/${shortSlug}`);

  console.log("🎉 All 3 documents successfully uploaded to Sanity CMS!");
  console.log(`Live URLs aligned:
    - https://aakarias.com/en/current-affairs/${googleIndexedSlug}
    - https://aakarias.com/current-affairs/${googleIndexedSlug}
    - https://aakarias.com/general-awareness/${googleIndexedSlug}
    - https://aakarias.com/en/general-awareness/${googleIndexedSlug}
  `);
}

main().catch((err) => {
  console.error("❌ Error uploading Top-Rank SEO Article to Sanity:", err);
  process.exit(1);
});
