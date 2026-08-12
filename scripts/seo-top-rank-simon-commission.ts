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
  console.log("🚀 Starting Ultimate SEO Optimization for Simon Commission Article...");

  // Existing uploaded images IDs from Sanity asset database
  const assetProtestId = "image-00559b736eb8e0c8901485a666b5fe6e416a5c09-1024x1024-jpg";
  const assetLalaId = "image-235a9057d271e1554890dda861681e3f581382a2-1024x1024-jpg";
  const assetNehruId = "image-a4be57309fdd016572b2bfe0926b2ec21a2dea5d-1024x1024-jpg";

  const docId = "gk-simon-commission-1927-1928";

  const updatedArticle = {
    _id: docId,
    _type: "staticGk",
    slug: { _type: "slug", current: "simon-commission-1927-1928-mppsc-notes" },
    title: "साइमन कमीशन (Simon Commission 1927-28): भारत कब आया, गठन, उद्देश्य, 7 सदस्य, विरोध, शहादत एवं सिफारिशें | MPPSC & UPSC Polity Notes",
    titleEn: "Simon Commission (1927-1928): Arrival Date in India, Objectives, 7 Members, Boycott, Legacy | MPPSC & UPSC Notes PDF",
    excerpt: "साइमन कमीशन (भारतीय सांविधानिक आयोग) क्या है? गठन (8 नबंबर 1927), भारत आगमन (3 फरवरी 1928), 7 सदस्य, 'Simon Go Back' विरोध, समर्थकों की सूची, लाला लाजपत राय की शहादत, नेहरू रिपोर्ट 1928 एवं भारत शासन अधिनियम 1935 पर प्रभाव। MPPSC & UPSC सम्पूर्ण नोट्स।",
    excerptEn: "Complete comprehensive guide on Simon Commission (Indian Statutory Commission, 1927-28): Arrival date (Feb 3, 1928), 7 British members list, reasons for boycott, supporters list (Justice Party, Unionists), martyrdom of Lala Lajpat Rai, Nehru Report 1928, recommendations and 1935 Act. Target for MPPSC & UPSC.",
    ca_date: "2026-08-12",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 10,
    keywords: [
      "simon commission bharat kab aaya",
      "simon commission kya hai",
      "simon commission kya tha",
      "simon commission kab aaya tha",
      "simon commission in hindi",
      "simon commission date",
      "simon commission 1927",
      "simon commission per tippani",
      "simon commission members",
      "simon commission year",
      "simon commission bharat kyon aaya",
      "simon commission ke samarthak",
      "simon commission hindi pdf",
      "explain simon commission in hindi",
      "simon commission report hindi",
      "simon commission upsc hindi",
      "simon commission upsc pyq",
      "simon commission upsc notes",
      "simon commission upsc prelims",
      "simon commission upsc mcq",
      "simon commission mppsc",
      "Simon Commission",
      "Simon Go Back",
      "Indian Statutory Commission",
      "Lala Lajpat Rai",
      "1927 Madras Session",
      "Dr MA Ansari",
      "Nehru Report 1928",
      "Government of India Act 1935",
      "Diarchy System 1919",
      "Punjab Kesari",
      "साइमन कमीशन",
      "साइमन वापस जाओ",
      "साइमन कमीशन के सदस्य",
      "साइमन कमीशन के समर्थक",
      "लाला लाजपत राय की शहादत",
      "नेहरू रिपोर्ट 1928",
      "MPPSC Polity Notes",
      "UPSC Polity Notes"
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // Subject-wise: Polity
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-2", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetProtestId },
      alt: "Historic 1928 protest showing Indian freedom fighters holding Simon Go Back banners at Bombay harbor",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Google Featured Snippet / Direct Answer ──────────── */
      {
        _key: "sec-featured-snippet",
        kind: "whyInNews",
        title: "Google Featured Snippet: साइमन कमीशन - त्वरित उत्तर (Quick Answer Box)",
        titleEn: "Google Featured Snippet: Simon Commission Quick Summary",
        body: [
          {
            _key: "fs-1", _type: "block", style: "normal",
            children: [
              { _key: "fs-s1", _type: "span", text: "• **साइमन कमीशन क्या है (What is Simon Commission)**: साइमन कमीशन (औपचारिक नाम: " },
              { _key: "fs-s2", _type: "span", marks: ["strong"], text: "भारतीय सांविधानिक आयोग / Indian Statutory Commission" },
              { _key: "fs-s3", _type: "span", text: ") 7 ब्रिटिश सांसदों का एक समूह था, जिसे ब्रिटेन की सरकार द्वारा भारत शासन अधिनियम 1919 के कामकाज और संवैधानिक प्रगति की समीक्षा हेतु गठित किया गया था।" }
            ]
          },
          {
            _key: "fs-2", _type: "block", style: "normal",
            children: [{ _key: "fs-s4", _type: "span", text: "• **गठन की तिथि (Formation Date)**: 8 नवंबर 1927 (लंदन में सर जॉन साइमन की अध्यक्षता में)।" }]
          },
          {
            _key: "fs-3", _type: "block", style: "normal",
            children: [{ _key: "fs-s5", _type: "span", text: "• **भारत कब आया (Arrival Date in India)**: **3 फरवरी 1928** को साइमन कमीशन पहली बार बंबई (मुंबई) पहुँचा।" }]
          },
          {
            _key: "fs-4", _type: "block", style: "normal",
            children: [{ _key: "fs-s6", _type: "span", text: "• **विरोध का मुख्य कारण (Reason for Boycott)**: इसमें **एक भी भारतीय सदस्य शामिल नहीं था** (All-White Commission / श्वेत आयोग)।" }]
          },
          {
            _key: "fs-5", _type: "block", style: "normal",
            children: [{ _key: "fs-s7", _type: "span", text: "• **प्रसिद्ध नारा (Famous Slogan)**: 'Simon Go Back' (साइमन वापस जाओ)।" }]
          },
          {
            _key: "fs-6", _type: "block", style: "normal",
            children: [{ _key: "fs-s8", _type: "span", text: "• **प्रमुख ऐतिहासिक घटना**: 30 अक्टूबर 1928 को लाहौर में विरोध प्रदर्शन पर पुलिस लाठीचार्ज में घायल होने के बाद 17 नवंबर 1928 को **लाला लाजपत राय (पंजाब केसरी)** की शहादत हुई।" }]
          },
        ],
        bodyEn: [
          {
            _key: "fs-7", _type: "block", style: "normal",
            children: [
              { _key: "fs-s9", _type: "span", text: "• **What is Simon Commission**: The Simon Commission (officially the " },
              { _key: "fs-s10", _type: "span", marks: ["strong"], text: "Indian Statutory Commission" },
              { _key: "fs-s11", _type: "span", text: ") was a panel of seven British Members of Parliament set up in 1927 to study constitutional reform in India." }
            ]
          },
          {
            _key: "fs-8", _type: "block", style: "normal",
            children: [{ _key: "fs-s12", _type: "span", text: "• **Formation Date**: November 8, 1927 in London." }]
          },
          {
            _key: "fs-9", _type: "block", style: "normal",
            children: [{ _key: "fs-s13", _type: "span", text: "• **Arrival Date in India**: **February 3, 1928** at Bombay port." }]
          },
          {
            _key: "fs-10", _type: "block", style: "normal",
            children: [{ _key: "fs-10s", _type: "span", text: "• **Why Boycotted**: It was an 'All-White Commission' with **zero Indian representation**." }]
          },
          {
            _key: "fs-11", _type: "block", style: "normal",
            children: [{ _key: "fs-11s", _type: "span", text: "• **Key Outcome**: Triggered the drafting of the Nehru Report (1928) and shaped the Government of India Act 1935." }]
          },
        ],
      },

      /* ── 2. Introduction & Background ────────────────────────── */
      {
        _key: "sec-intro-background",
        kind: "background",
        title: "साइमन कमीशन क्या है, गठन एवं भारत कब आया?",
        titleEn: "What is Simon Commission, Formation & Arrival Date in India?",
        body: [
          {
            _key: "b2-1", _type: "block", style: "h3",
            children: [{ _key: "s2-1", _type: "span", text: "1. गठन की पृष्ठभूमि एवं भारत में आगमन तिथि" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• **औपचारिक नाम (Formal Name)**: साइमन कमीशन को औपचारिक रूप से **भारतीय सांविधानिक आयोग (Indian Statutory Commission)** कहा गया।" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• **गठन का कारण**: ब्रिटिश सरकार द्वारा **भारत शासन अधिनियम, 1919 (Government of India Act, 1919)** के क्रियान्वयन की समीक्षा हेतु 8 नवंबर 1927 को लंदन में नियुक्त किया गया था। अधिनियम के अनुसार 10 वर्ष बाद आयोग बनना था, परंतु ब्रिटेन में चुनाव के भय से कंज़र्वेटिव सरकार ने इसे 2 वर्ष पूर्व ही गठित कर दिया।" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• **अध्यक्ष एवं 7 ब्रिटिश सदस्य**: आयोग के अध्यक्ष **सर जॉन साइमन (Sir John Simon)** थे। इसके सभी 7 सदस्य ब्रिटिश संसद के सदस्य थे, जिसमें लेबर पार्टी के नेता **क्लेमेंट एटली (Clement Attlee)** भी शामिल थे, जो बाद में 1947 में भारत की स्वतंत्रता के समय ब्रिटेन के प्रधानमंत्री बने।" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• **श्वेत आयोग (All-White Commission)**: इसमें एक भी भारतीय सदस्य को शामिल न किए जाने के कारण इसे 'श्वेत आयोग' (White Commission) कहा गया। इसे भारतीयों के स्वाभिमान और आत्मनिर्णय के अधिकार का सीधा अपमान माना गया।" }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• **भारत कब आया (Arrival Date)**: **3 फरवरी 1928** को साइमन कमीशन बंबई (मुंबई) पहुँचा, जहाँ इसका स्वागत काले झंडों, देशव्यापी हड़ताल और **'Simon Go Back' (साइमन वापस जाओ)** के नारों से हुआ।" }],
          },
          {
            _key: "b2-img-1", _type: "image",
            asset: { _type: "reference", _ref: assetProtestId },
            alt: "Historic 1928 crowd protesting against Simon Commission with Simon Go Back banners at Bombay harbour",
          },
        ],
        bodyEn: [
          {
            _key: "b2-7", _type: "block", style: "h3",
            children: [{ _key: "s2-7", _type: "span", text: "1. Formation Background & Date of Arrival in India" }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• **Official Name**: Indian Statutory Commission." }],
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "• **Formation Date**: November 8, 1927 in London by the British Conservative Government." }],
          },
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "• **Arrival Date in India**: **February 3, 1928** at Bombay port." }],
          },
          {
            _key: "b2-11", _type: "block", style: "normal",
            children: [{ _key: "s2-11", _type: "span", text: "• **All-White Commission**: Consisted of 7 British MPs led by Sir John Simon, excluding Indian members completely." }],
          },
          {
            _key: "b2-img-1-en", _type: "image",
            asset: { _type: "reference", _ref: assetProtestId },
            alt: "Historic 1928 crowd protesting against Simon Commission with Simon Go Back banners at Bombay harbour",
          },
        ],
      },

      /* ── 3. Members List Section ─────────────────────────────── */
      {
        _key: "sec-members-list",
        kind: "keyAspects",
        title: "साइमन कमीशन के 7 सदस्य (List of All 7 Members)",
        titleEn: "List of All 7 Members of the Simon Commission",
        body: [
          {
            _key: "bm-1", _type: "block", style: "h3",
            children: [{ _key: "sm-1", _type: "span", text: "2. साइमन कमीशन के सातों ब्रिटिश सदस्यों के नाम" }],
          },
          {
            _key: "bm-2", _type: "block", style: "normal",
            children: [{ _key: "sm-2", _type: "span", text: "• **1. सर जॉन साइमन (Sir John Simon)**: अध्यक्ष (लिबरल पार्टी)" }]
          },
          {
            _key: "bm-3", _type: "block", style: "normal",
            children: [{ _key: "sm-3", _type: "span", text: "• **2. क्लेमेंट एटली (Clement Attlee)**: सदस्य (लेबर पार्टी - जो 1947 में स्वतंत्रता के समय ब्रिटेन के पीएम बने)" }]
          },
          {
            _key: "bm-4", _type: "block", style: "normal",
            children: [{ _key: "sm-4", _type: "span", text: "• **3. हैरी लेवी-लॉसन, विस्काउंट बर्नहम (Viscount Burnham)**: सदस्य (कंजर्वेटिव पार्टी)" }]
          },
          {
            _key: "bm-5", _type: "block", style: "normal",
            children: [{ _key: "sm-5", _type: "span", text: "• **4. एडवर्ड कैडोगन (Edward Cadogan)**: सदस्य (कंजर्वेटिव पार्टी)" }]
          },
          {
            _key: "bm-6", _type: "block", style: "normal",
            children: [{ _key: "sm-6", _type: "span", text: "• **5. वर्नोन हर्टशॉर्न (Vernon Hartshorn)**: सदस्य (लेबर पार्टी)" }]
          },
          {
            _key: "bm-7", _type: "block", style: "normal",
            children: [{ _key: "sm-7", _type: "span", text: "• **6. जॉर्ज लेन-फॉक्स (George Lane-Fox)**: सदस्य (कंजर्वेटिव पार्टी)" }]
          },
          {
            _key: "bm-8", _type: "block", style: "normal",
            children: [{ _key: "sm-8", _type: "span", text: "• **7. लॉर्ड स्ट्रैथकोना (Lord Strathcona)**: सदस्य (कंजर्वेटिव पार्टी)" }]
          },
        ],
        bodyEn: [
          {
            _key: "bm-9", _type: "block", style: "h3",
            children: [{ _key: "sm-9", _type: "span", text: "2. Complete List of the 7 British Commission Members" }],
          },
          {
            _key: "bm-10", _type: "block", style: "normal",
            children: [{ _key: "sm-10", _type: "span", text: "• **1. Sir John Simon**: Chairman (Liberal Party)" }]
          },
          {
            _key: "bm-11", _type: "block", style: "normal",
            children: [{ _key: "sm-11", _type: "span", text: "• **2. Clement Attlee**: Member (Labour Party - Future British PM during Indian Independence in 1947)" }]
          },
          {
            _key: "bm-12", _type: "block", style: "normal",
            children: [{ _key: "sm-12", _type: "span", text: "• **3. Harry Levy-Lawson, Viscount Burnham**: Member (Conservative)" }]
          },
          {
            _key: "bm-13", _type: "block", style: "normal",
            children: [{ _key: "sm-13", _type: "span", text: "• **4. Edward Cadogan**: Member (Conservative)" }]
          },
          {
            _key: "bm-14", _type: "block", style: "normal",
            children: [{ _key: "sm-14", _type: "span", text: "• **5. Vernon Hartshorn**: Member (Labour)" }]
          },
          {
            _key: "bm-15", _type: "block", style: "normal",
            children: [{ _key: "sm-15", _type: "span", text: "• **6. George Lane-Fox**: Member (Conservative)" }]
          },
          {
            _key: "bm-16", _type: "block", style: "normal",
            children: [{ _key: "sm-16", _type: "span", text: "• **7. Lord Strathcona**: Member (Conservative)" }]
          },
        ],
      },

      /* ── 4. Objectives & Mandate ─────────────────────────────── */
      {
        _key: "sec-objectives-mandate",
        kind: "keyAspects",
        title: "साइमन कमीशन भारत क्यों आया था? (उद्देश्य एवं कार्यदेश)",
        titleEn: "Why Did Simon Commission Come to India? (Objectives & Mandate)",
        body: [
          {
            _key: "b3-1", _type: "block", style: "h3",
            children: [{ _key: "s3-1", _type: "span", text: "3. आयोग के प्रमुख कार्य एवं समीक्षा क्षेत्र" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **द्वैध शासन का मूल्यांकन**: आयोग का मुख्य उद्देश्य भारत सरकार अधिनियम 1919 के कामकाज का मूल्यांकन करना था, विशेष रूप से प्रांतीय द्वैध शासन की प्रणाली, जिसमें प्रांतीय जिम्मेदारियां ब्रिटिश अधिकारियों और भारतीय मंत्रियों के बीच साझा की जाती थीं।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "• **संवैधानिक सुधारों की सिफारिश**: ब्रिटिश संप्रभुता को बनाए रखते हुए शासन संबंधी चुनौतियों और भारतीय मांगों का समाधान करने हेतु सिफारिशें प्रस्तुत करना।" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "• **सांप्रदायिक प्रतिनिधित्व की जांच**: सांप्रदायिक प्रतिनिधित्व की जांच करना तथा बढ़ते राष्ट्रवादी आंदोलनों के बीच कानून और व्यवस्था की स्थिति का आकलन करना।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "• **उत्तरदायी शासन की सीमा**: यह आंकना कि भारत में किस सीमा तक उत्तरदायी सरकार की स्थापना की जा सकती है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-6", _type: "block", style: "h3",
            children: [{ _key: "s3-6", _type: "span", text: "3. Primary Mandate & Terms of Reference" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "• **Diarchy Assessment**: To evaluate the provincial diarchy framework set up under the 1919 Act." }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "• **Constitutional Proposals**: To recommend further legislative reforms while keeping imperial sovereignty intact." }],
          },
          {
            _key: "b3-9", _type: "block", style: "normal",
            children: [{ _key: "s3-9", _type: "span", text: "• **Communal Electorates & Order**: To inspect separate communal electorates and law and order dynamics." }],
          },
        ],
      },

      /* ── 5. Criticism & Boycott ───────────────────────────────── */
      {
        _key: "sec-criticism-boycott",
        kind: "analysis",
        title: "साइमन कमीशन की आलोचना एवं विरोध (Madras Session 1927)",
        titleEn: "Criticism & Boycott of Simon Commission (1927 Madras Session)",
        body: [
          {
            _key: "b3-11", _type: "block", style: "h3",
            children: [{ _key: "s3-11", _type: "span", text: "4. राष्ट्रव्यापी विरोध और कांग्रेस का मद्रास अधिवेशन (1927)" }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "• **भारतीयों का जानबूझकर अपमान**: एक भी भारतीय सदस्य शामिल न किए जाने के कारण इसे भारतीय राजनीतिक आकांक्षाओं का जानबूझकर किया गया अपमान माना गया।" }],
          },
          {
            _key: "b3-13", _type: "block", style: "normal",
            children: [{ _key: "s3-13", _type: "span", text: "• **ब्रिटिश चाल**: भारतीयों का मानना था कि यह आयोग वास्तविक सुधारों में देरी करने और औपनिवेशिक नियंत्रण बनाए रखने के लिए ब्रिटिश रणनीति थी।" }],
          },
          {
            _key: "b3-14", _type: "block", style: "normal",
            children: [{ _key: "s3-14", _type: "span", text: "• **कांग्रेस का मद्रास अधिवेशन (1927)**: भारतीय राष्ट्रीय कांग्रेस ने **1927 में डॉ. एम.ए. अंसारी** की अध्यक्षता में मद्रास अधिवेशन में आधिकारिक तौर पर 'प्रत्येक स्तर पर और प्रत्येक रूप में' राष्ट्रव्यापी बहिष्कार का आह्वान किया।" }],
          },
          {
            _key: "b3-15", _type: "block", style: "normal",
            children: [{ _key: "s3-15", _type: "span", text: "• **राजनीतिक दलों की एकजुटता**: बहिष्कार का समर्थन कांग्रेस, हिंदू महासभा, लिबरल फेडरेशन और मोहम्मद अली जिन्ना के नेतृत्व वाली मुस्लिम लीग ने किया।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-16", _type: "block", style: "h3",
            children: [{ _key: "s3-16", _type: "span", text: "4. Reasons for Boycott & INC Madras Session 1927" }],
          },
          {
            _key: "b3-17", _type: "block", style: "normal",
            children: [{ _key: "s3-17", _type: "span", text: "• **INC Resolution**: Passed at the 1927 Madras Session presided by Dr. M.A. Ansari to boycott the commission 'at every stage and in every form'." }],
          },
          {
            _key: "b3-18", _type: "block", style: "normal",
            children: [{ _key: "s3-18", _type: "span", text: "• **Broad Coalition**: Supported by INC, Hindu Mahasabha, Liberals, and Jinnah's faction of Muslim League." }],
          },
        ],
      },

      /* ── 6. Supporters Section (Key Exam Point) ──────────────── */
      {
        _key: "sec-supporters",
        kind: "keyAspects",
        title: "साइमन कमीशन के समर्थक कौन थे? (Supporters of Simon Commission)",
        titleEn: "Who Supported the Simon Commission? (Supporters List)",
        body: [
          {
            _key: "bs-1", _type: "block", style: "h3",
            children: [{ _key: "ss-1", _type: "span", text: "5. साइमन कमीशन का बहिष्कार न करने वाले दल एवं संगठन" }],
          },
          {
            _key: "bs-2", _type: "block", style: "normal",
            children: [{ _key: "ss-2", _type: "span", text: "प्रतियोगी परीक्षाओं (MPPSC & UPSC) में प्रायः पूछा जाता है कि किन दलों ने साइमन कमीशन का बहिष्कार नहीं किया था:" }]
          },
          {
            _key: "bs-3", _type: "block", style: "normal",
            children: [{ _key: "ss-3", _type: "span", text: "• **1. जस्टिस पार्टी (Justice Party - मद्रास)**: दक्षिण भारत की जस्टिस पार्टी ने गैर-ब्राह्मण हितों की रक्षा हेतु आयोग का समर्थन किया और इसे ज्ञापन सौंपा।" }]
          },
          {
            _key: "bs-4", _type: "block", style: "normal",
            children: [{ _key: "ss-4", _type: "span", text: "• **2. यूनियनवादी पार्टी (Unionist Party - पंजाब)**: सर फजली हुसैन और चौधरी छोटू राम के नेतृत्व वाली पंजाब की यूनियनवादी पार्टी ने बहिष्कार में भाग नहीं लिया।" }]
          },
          {
            _key: "bs-5", _type: "block", style: "normal",
            children: [{ _key: "ss-5", _type: "span", text: "• **3. ऑल इंडिया डिप्रेस्ड क्लासेस एसोसिएशन (Dr. B.R. Ambedkar)**: डॉ. भीमराव अम्बेडकर ने दलितों और शोषित वर्गों के राजनीतिक अधिकारों हेतु आयोग के समक्ष साक्ष्य प्रस्तुत किए।" }]
          },
          {
            _key: "bs-6", _type: "block", style: "normal",
            children: [{ _key: "ss-6", _type: "span", text: "• **4. मुस्लिम लीग का शफी गुट (Shafi Faction)**: मोहम्मद शफी के नेतृत्व वाले मुस्लिम लीग के गुट ने आयोग का सहयोग किया।" }]
          },
        ],
        bodyEn: [
          {
            _key: "bs-7", _type: "block", style: "h3",
            children: [{ _key: "ss-7", _type: "span", text: "5. Parties and Leaders Who Did Not Boycott the Commission" }],
          },
          {
            _key: "bs-8", _type: "block", style: "normal",
            children: [{ _key: "ss-8", _type: "span", text: "• **1. Justice Party (Madras)**: Cooperated with the commission to safeguard non-Brahmin interests." }]
          },
          {
            _key: "bs-9", _type: "block", style: "normal",
            children: [{ _key: "ss-9", _type: "span", text: "• **2. Unionist Party (Punjab)**: Led by Sir Fazl-i-Hussain and Ch. Chhotu Ram, did not boycott." }]
          },
          {
            _key: "bs-10", _type: "block", style: "normal",
            children: [{ _key: "ss-10", _type: "span", text: "• **3. All India Depressed Classes Association**: Dr. B.R. Ambedkar submitted demands for depressed classes." }]
          },
          {
            _key: "bs-11", _type: "block", style: "normal",
            children: [{ _key: "ss-11", _type: "span", text: "• **4. Muslim League (Shafi Group)**: The faction led by Muhammad Shafi cooperated." }]
          },
        ],
      },

      /* ── 7. Protests & Martyrdom of Lala Lajpat Rai ─────────── */
      {
        _key: "sec-protests-martyrdom",
        kind: "keyAspects",
        title: "लाहौर विरोध प्रदर्शन एवं लाला लाजपत राय की शहादत (17 नवंबर 1928)",
        titleEn: "Lahore Protest Rally & Martyrdom of Lala Lajpat Rai (Nov 17, 1928)",
        body: [
          {
            _key: "b4-1", _type: "block", style: "h3",
            children: [{ _key: "s4-1", _type: "span", text: "6. 30 अक्टूबर 1928 की घटना और लालाजी का ऐतिहासिक बयान" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **बंबई आगमन (3 फरवरी 1928)**: 3 फरवरी, 1928 को साइमन कमीशन बंबई (मुंबई) पहुँचा। इसके स्वागत में फूल नहीं, बल्कि काले झंडे और विरोध प्रदर्शन हुए।" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• **युवाओं की भूमिका**: छात्रों और युवाओं ने अग्रणी भूमिका निभाई, जिससे यह स्पष्ट हुआ कि भारतीय युवावर्ग अब स्वतंत्रता के संघर्ष में सक्रिय भागीदारी के लिए तैयार है।" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "• **लाहौर विरोध (30 अक्टूबर 1928)**: 30 अक्टूबर 1928, लाहौर में लाला लाजपत राय (पंजाब केसरी) के नेतृत्व में एक विशाल विरोध रैली आयोजित की गई।" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "• **निर्दय लाठीचार्ज**: पुलिस अधीक्षक स्कॉट / सांडर्स के आदेश पर की गई लाठीचार्ज में लाला लाजपत राय के सिर पर गंभीर चोटें आईं।" }],
          },
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "• **ऐतिहासिक कथन**: *'मेरे शरीर पर पड़ी एक-एक लाठी ब्रिटिश साम्राज्य के ताबूत की कील साबित होगी।'* (Every blow struck on my body will be a nail in the coffin of the British Empire)." }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "• **17 नवंबर 1928 को शहादत**: चोटों के कारण **17 नवंबर 1928** को उनका निधन हो गया। उनकी शहादत ने पूरे देश में क्रांतिकारी चेतना को प्रज्वलित कर दिया।" }],
          },
          {
            _key: "b4-img-2", _type: "image",
            asset: { _type: "reference", _ref: assetLalaId },
            alt: "Lala Lajpat Rai leading the protest against Simon Commission in Lahore in October 1928",
          },
        ],
        bodyEn: [
          {
            _key: "b4-8", _type: "block", style: "h3",
            children: [{ _key: "s4-8", _type: "span", text: "6. The Oct 30 Lahore Lathi Charge & Historic Statement" }],
          },
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "• **Lahore Demonstration**: Led by **Lala Lajpat Rai ('Punjab Kesari')** on Oct 30, 1928." }],
          },
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "• **Martyrdom**: Lala Lajpat Rai succumbed to head injuries on **November 17, 1928**." }],
          },
          {
            _key: "b4-img-2-en", _type: "image",
            asset: { _type: "reference", _ref: assetLalaId },
            alt: "Lala Lajpat Rai leading the protest against Simon Commission in Lahore in October 1928",
          },
        ],
      },

      /* ── 8. Recommendations of Simon Commission ─────────────── */
      {
        _key: "sec-recommendations",
        kind: "analysis",
        title: "साइमन कमीशन की प्रमुख सिफारिशें (Report May 1930 Recommendations)",
        titleEn: "Key Recommendations of the Simon Commission Report (May 1930)",
        body: [
          {
            _key: "br-1", _type: "block", style: "h3",
            children: [{ _key: "sr-1", _type: "span", text: "7. साइमन कमीशन की रिपोर्ट की 5 प्रमुख सिफारिशें" }],
          },
          {
            _key: "br-2", _type: "block", style: "normal",
            children: [{ _key: "sr-2", _type: "span", text: "साइमन कमीशन ने मई 1930 में अपनी रिपोर्ट प्रकाशित की, जिसकी प्रमुख सिफारिशें निम्नलिखित थीं:" }]
          },
          {
            _key: "br-3", _type: "block", style: "normal",
            children: [{ _key: "sr-3", _type: "span", text: "• **1. द्वैध शासन का अंत एवं प्रांतीय स्वायत्तता**: प्रांतों में द्वैध शासन (Diarchy) को समाप्त कर **प्रांतीय स्वायत्तता (Provincial Autonomy)** लागू की जाए।" }]
          },
          {
            _key: "br-4", _type: "block", style: "normal",
            children: [{ _key: "sr-4", _type: "span", text: "• **2. केंद्र में उत्तरदायी शासन का इनकार**: केंद्र में किसी भी प्रकार का उत्तरदायी शासन स्थापित न किया जाए।" }]
          },
          {
            _key: "br-5", _type: "block", style: "normal",
            children: [{ _key: "sr-5", _type: "span", text: "• **3. अखिल भारतीय संघ (All-India Federation)**: ब्रिटिश प्रांतों और देशी रियासतों को मिलाकर एक अखिल भारतीय संघ का विचार प्रस्तुत किया गया।" }]
          },
          {
            _key: "br-6", _type: "block", style: "normal",
            children: [{ _key: "sr-6", _type: "span", text: "• **4. सांप्रदायिक निर्वाचन की निरंतरता**: सांप्रदायिक निर्वाचन प्रणाली (Communal Representation) को बनाए रखा जाए।" }]
          },
          {
            _key: "br-7", _type: "block", style: "normal",
            children: [{ _key: "sr-7", _type: "span", text: "• **5. प्रशासनिक पुनर्गठन**: बर्मा (Burma) को भारत से पृथक किया जाए तथा उड़ीसा एवं सिंध को पृथक प्रांत बनाया जाए।" }]
          },
        ],
        bodyEn: [
          {
            _key: "br-8", _type: "block", style: "h3",
            children: [{ _key: "sr-8", _type: "span", text: "7. 5 Key Recommendations of the Simon Report" }],
          },
          {
            _key: "br-9", _type: "block", style: "normal",
            children: [{ _key: "sr-9", _type: "span", text: "• **1. Abolition of Diarchy**: Replace diarchy with **Provincial Autonomy** in provinces." }]
          },
          {
            _key: "br-10", _type: "block", style: "normal",
            children: [{ _key: "sr-10", _type: "span", text: "• **2. No Responsible Centre**: Denied responsible government at the central level." }]
          },
          {
            _key: "br-11", _type: "block", style: "normal",
            children: [{ _key: "sr-11", _type: "span", text: "• **3. All-India Federation**: Proposed a federation incorporating princely states." }]
          },
          {
            _key: "br-12", _type: "block", style: "normal",
            children: [{ _key: "sr-12", _type: "span", text: "• **4. Continuation of Communal Electorates**: Retained separate electorates." }]
          },
          {
            _key: "br-13", _type: "block", style: "normal",
            children: [{ _key: "sr-13", _type: "span", text: "• **5. Separation of Burma**: Separation of Burma from British India and creation of Sindh/Orissa." }]
          },
        ],
      },

      /* ── 9. Impact on Freedom Struggle & 1935 Act ────────────── */
      {
        _key: "sec-impact-legacy",
        kind: "impact",
        title: "नेहरू रिपोर्ट (1928), 1935 का अधिनियम और सविनय अवज्ञा का मार्ग",
        titleEn: "Nehru Report (1928), GOI Act 1935 & Prelude to Civil Disobedience",
        body: [
          {
            _key: "b5-1", _type: "block", style: "h3",
            children: [{ _key: "s5-1", _type: "span", text: "8. भारतीय स्वतंत्रता आंदोलन पर प्रभाव" }],
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• **स्वशासन की माँग की तीव्रता**: साइमन कमीशन के विरोध ने भारतीयों की स्वशासन की माँग को और तीव्र कर दिया।" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• **नेहरू रिपोर्ट (1928)**: भारत सचिव लॉर्ड बर्कनहेड (Lord Birkenhead) की चुनौती को स्वीकार करते हुए **पं. मोतीलाल नेहरू** की अध्यक्षता में सर्वदलीय समिति ने **नेहरू रिपोर्ट (1928)** प्रस्तुत की, जिसमें डोमिनियन स्टेटस, मूल अधिकारों और धर्मनिरपेक्ष लोकतंत्र की रूपरेखा प्रस्तुत की गई।" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• **भारत शासन अधिनियम, 1935**: साइमन कमीशन की सिफारिशों, गोलमेज सम्मेलनों (Round Table Conferences) और श्वेत पत्र के आधार पर ही **भारत शासन अधिनियम 1935** तैयार हुआ, जिसमें प्रांतीय स्वायत्तता दी गई तथा प्रांतों से द्वैध शासन समाप्त किया गया।" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "• **पूर्ण स्वराज एवं सविनय अवज्ञा (1929-30)**: साइमन कमीशन के विरोध ने **लाहौर अधिवेशन (1929)** में **पूर्ण स्वराज प्रस्ताव** तथा महात्मा गांधी के **सविनय अवज्ञा आंदोलन (1930)** का मार्ग प्रशस्त किया।" }],
          },
          {
            _key: "b5-img-3", _type: "image",
            asset: { _type: "reference", _ref: assetNehruId },
            alt: "Historical manuscript of Nehru Report 1928 drafted in response to Simon Commission challenge",
          },
        ],
        bodyEn: [
          {
            _key: "b5-6", _type: "block", style: "h3",
            children: [{ _key: "s5-6", _type: "span", text: "8. Far-Reaching Impact on Indian Freedom Struggle" }],
          },
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "• **Nehru Report (1928)**: Drafted by Motilal Nehru in response to Birkenhead's challenge." }],
          },
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "• **GOI Act 1935**: Direct legal outcome incorporating provincial autonomy." }],
          },
          {
            _key: "b5-9", _type: "block", style: "normal",
            children: [{ _key: "s5-9", _type: "span", text: "• **Purna Swaraj & Civil Disobedience**: Paved the way for the 1929 Lahore session resolution and 1930 Dandi March." }],
          },
          {
            _key: "b5-img-3-en", _type: "image",
            asset: { _type: "reference", _ref: assetNehruId },
            alt: "Historical manuscript of Nehru Report 1928 drafted in response to Simon Commission challenge",
          },
        ],
      },

      /* ── 10. Quick Revision Fact Sheet ───────────────────────── */
      {
        _key: "sec-mppsc-quick-facts",
        kind: "mppscNotes",
        title: "MPPSC & UPSC परीक्षा उपयोगी Quick Revision Fact Sheet",
        titleEn: "MPPSC & UPSC Exam Quick Revision Fact Sheet",
        body: [
          {
            _key: "b6-1", _type: "block", style: "h3",
            children: [{ _key: "s6-1", _type: "span", text: "9. त्वरित परीक्षा स्मरण बिंदु (Key Exam Facts)" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "• **आयोग की नियुक्ति वर्ष**: 8 नवंबर 1927 (लंदन में)" }]
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• **भारत में आगमन तिथि**: 3 फरवरी 1928 (बंबई)" }]
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "• **आयोग के अध्यक्ष**: सर जॉन साइमन (Sir John Simon)" }]
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "• **कुल सदस्य**: 7 सदस्य (सभी अंग्रेज MP - 'श्वेत आयोग')" }]
          },
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• **उल्लेखनीय सदस्य**: क्लेमेंट एटली (Clement Attlee - 1947 में ब्रिटिश पीएम)" }]
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• **बहिष्कार प्रस्ताव अधिवेशन**: कांग्रेस का मद्रास अधिवेशन 1927 (अध्यक्ष: डॉ. एम. ए. अंसारी)" }]
          },
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "• **समर्थक दल**: जस्टिस पार्टी (मद्रास), यूनियनवादी पार्टी (पंजाब), ऑल इंडिया डिप्रेस्ड क्लासेस एसोसिएशन" }]
          },
          {
            _key: "b6-9", _type: "block", style: "normal",
            children: [{ _key: "s6-9", _type: "span", text: "• **लाहौर प्रदर्शन तिथि**: 30 अक्टूबर 1928 (नेतृत्व: लाला लाजपत राय)" }]
          },
          {
            _key: "b6-10", _type: "block", style: "normal",
            children: [{ _key: "s6-10", _type: "span", text: "• **लाला लाजपत राय की शहादत**: 17 नवंबर 1928" }]
          },
          {
            _key: "b6-11", _type: "block", style: "normal",
            children: [{ _key: "s6-11", _type: "span", text: "• **रिपोर्ट प्रकाशन तिथि**: मई 1930" }]
          },
        ],
        bodyEn: [
          {
            _key: "b6-12", _type: "block", style: "h3",
            children: [{ _key: "s6-12", _type: "span", text: "9. Fast-Track Revision Points for Civil Services" }],
          },
          {
            _key: "b6-13", _type: "block", style: "normal",
            children: [{ _key: "s6-13", _type: "span", text: "• **Appointment Date**: November 8, 1927 (London)" }]
          },
          {
            _key: "b6-14", _type: "block", style: "normal",
            children: [{ _key: "s6-14", _type: "span", text: "• **Arrival Date in India**: February 3, 1928 (Bombay)" }]
          },
          {
            _key: "b6-15", _type: "block", style: "normal",
            children: [{ _key: "s6-15", _type: "span", text: "• **Chairman**: Sir John Simon" }]
          },
          {
            _key: "b6-16", _type: "block", style: "normal",
            children: [{ _key: "s6-16", _type: "span", text: "• **Total Members**: 7 Members (All British - White Commission)" }]
          },
          {
            _key: "b6-17", _type: "block", style: "normal",
            children: [{ _key: "s6-17", _type: "span", text: "• **Notable Member**: Clement Attlee (PM in 1947)" }]
          },
          {
            _key: "b6-18", _type: "block", style: "normal",
            children: [{ _key: "s6-18", _type: "span", text: "• **Boycott Resolution**: INC Madras Session 1927 (Dr. M. A. Ansari)" }]
          },
          {
            _key: "b6-19", _type: "block", style: "normal",
            children: [{ _key: "s6-19", _type: "span", text: "• **Supporters**: Justice Party (Madras), Unionists (Punjab), Depressed Classes Association" }]
          },
          {
            _key: "b6-20", _type: "block", style: "normal",
            children: [{ _key: "s6-20", _type: "span", text: "• **Martyrdom of Lala Lajpat Rai**: November 17, 1928" }]
          },
          {
            _key: "b6-21", _type: "block", style: "normal",
            children: [{ _key: "s6-21", _type: "span", text: "• **Report Published**: May 1930" }]
          },
        ],
      },
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "साइमन कमीशन (Indian Statutory Commission) का गठन कब और कहाँ किया गया था?",
        questionEn: "When and where was the Simon Commission (Indian Statutory Commission) formed?",
        options: ["8 नवंबर 1927, लंदन में", "3 फरवरी 1928, बंबई में", "17 नवंबर 1928, लाहौर में", "26 दिसंबर 1927, मद्रास में"],
        optionsEn: ["November 8, 1927 in London", "February 3, 1928 in Bombay", "November 17, 1928 in Lahore", "December 26, 1927 in Madras"],
        correctIndex: 0,
        explanation: "साइमन कमीशन का गठन 8 नवंबर 1927 को लंदन में ब्रिटिश कंजर्वेटिव सरकार द्वारा किया गया था। यह भारत में 3 फरवरी 1928 को आया था।",
        explanationEn: "The Simon Commission was appointed on November 8, 1927 in London and arrived in India on February 3, 1928."
      },
      {
        question: "साइमन कमीशन का औपचारिक नाम क्या था?",
        questionEn: "What was the official statutory title of the Simon Commission?",
        options: ["भारतीय सांविधानिक आयोग (Indian Statutory Commission)", "भारतीय प्रशासनिक सुधार आयोग", "शाही स्वायत्तता आयोग", "केन्द्रीय सुधार आयोग"],
        optionsEn: ["Indian Statutory Commission", "Indian Administrative Reform Commission", "Royal Autonomy Commission", "Central Reform Commission"],
        correctIndex: 0,
        explanation: "साइमन कमीशन का औपचारिक नाम भारतीय सांविधानिक आयोग (Indian Statutory Commission) था, जिसे 1919 के भारत सरकार अधिनियम की समीक्षा हेतु गठित किया गया था।",
        explanationEn: "The official name of the Simon Commission was the Indian Statutory Commission."
      },
      {
        question: "साइमन कमीशन का भारत में तीव्र विरोध क्यों हुआ?",
        questionEn: "Why did the Simon Commission face unanimous opposition across India?",
        options: ["क्योंकि इसने सांप्रदायिक निर्वाचन समाप्त कर दिया था", "क्योंकि इसमें एक भी भारतीय सदस्य शामिल नहीं था (All-White Commission)", "क्योंकि इसके अध्यक्ष लॉर्ड कैनिंग थे", "क्योंकि इसने प्रांतीय स्वायत्तता रद्द कर दी थी"],
        optionsEn: ["Because it abolished separate electorates", "Because not a single Indian member was included (All-White Commission)", "Because Lord Canning chaired it", "Because it cancelled provincial autonomy"],
        correctIndex: 1,
        explanation: "साइमन कमीशन के सभी 7 सदस्य अंग्रेज (ब्रिटिश संसद के सदस्य) थे। इसमें एक भी भारतीय सदस्य शामिल न होने के कारण इसे 'श्वेत आयोग' कहा गया और इसका तीव्र विरोध हुआ।",
        explanationEn: "All 7 members of the commission were British MPs, making it an all-white commission without Indian representation."
      },
      {
        question: "निम्नलिखित में से किस दल/संगठन ने साइमन कमीशन का बहिष्कार नहीं किया था?",
        questionEn: "Which of the following political parties/organizations did NOT boycott the Simon Commission?",
        options: ["भारतीय राष्ट्रीय कांग्रेस", "जस्टिस पार्टी (मद्रास) एवं यूनियनवादी पार्टी (पंजाब)", "हिंदू महासभा", "मुस्लिम लीग (जिन्ना गुट)"],
        optionsEn: ["Indian National Congress", "Justice Party (Madras) & Unionist Party (Punjab)", "Hindu Mahasabha", "Muslim League (Jinnah Faction)"],
        correctIndex: 1,
        explanation: "मद्रास की जस्टिस पार्टी, पंजाब की यूनियनवादी पार्टी (Unionist Party) तथा डॉ. बी.आर. अम्बेडकर की ऑल इंडिया डिप्रेस्ड क्लासेस एसोसिएशन ने साइमन कमीशन का बहिष्कार नहीं किया था।",
        explanationEn: "The Justice Party of Madras, the Unionist Party of Punjab, and Dr. B.R. Ambedkar's Depressed Classes Association did not boycott the commission."
      },
      {
        question: "भारतीय राष्ट्रीय कांग्रेस के किस अधिवेशन में साइमन कमीशन के पूर्ण बहिष्कार का निर्णय लिया गया?",
        questionEn: "In which session of the Indian National Congress was the decision taken to completely boycott the Simon Commission?",
        options: ["लाहौर अधिवेशन 1929", "मद्रास अधिवेशन 1927", "कलकत्ता अधिवेशन 1928", "कराची अधिवेशन 1931"],
        optionsEn: ["Lahore Session 1929", "Madras Session 1927", "Calcutta Session 1928", "Karachi Session 1931"],
        correctIndex: 1,
        explanation: "दिसंबर 1927 के मद्रास अधिवेशन में डॉ. एम. ए. अंसारी की अध्यक्षता में कांग्रेस ने साइमन कमीशन के पूर्ण बहिष्कार का ऐतिहासिक प्रस्ताव पारित किया था।",
        explanationEn: "The INC Madras Session of December 1927, chaired by Dr. M.A. Ansari, passed the resolution to boycott the Simon Commission."
      },
      {
        question: "साइमन कमीशन के विरोध के दौरान लाहौर में हुए पुलिस लाठीचार्ज में कौन-से महान स्वतंत्रता सेनानी गंभीर रूप से घायल हुए थे?",
        questionEn: "Which great freedom fighter was fatally injured during the police lathi charge while protesting against the Simon Commission in Lahore?",
        options: ["बाल गंगाधर तिलक", "विपिन चंद्र पाल", "लाला लाजपत राय", "गोपाल कृष्ण गोखले"],
        optionsEn: ["Bal Gangadhar Tilak", "Bipin Chandra Pal", "Lala Lajpat Rai", "Gopal Krishna Gokhale"],
        correctIndex: 2,
        explanation: "30 अक्टूबर 1928 को लाहौर में विरोध रैली के दौरान पुलिस लाठीचार्ज में लाला लाजपत राय गंभीर रूप से घायल हुए और 17 नवंबर 1928 को उनकी शहादत हुई।",
        explanationEn: "Lala Lajpat Rai was severely injured during the police lathi charge on Oct 30, 1928 in Lahore and attained martyrdom on Nov 17, 1928."
      },
      {
        question: "'मेरे शरीर पर पड़ी एक-एक लाठी ब्रिटिश साम्राज्य के ताबूत की कील साबित होगी' - यह कथन किसका है?",
        questionEn: "'Every blow struck on my body will be a nail in the coffin of the British Empire' - Who made this statement?",
        options: ["भगत सिंह", "लाला लाजपत राय", "सुभाष चंद्र बोस", "चंद्रशेखर आजाद"],
        optionsEn: ["Bhagat Singh", "Lala Lajpat Rai", "Subhash Chandra Bose", "Chandrashekhar Azad"],
        correctIndex: 1,
        explanation: "यह ऐतिहासिक कथन पंजाब केसरी लाला लाजपत राय का है, जो उन्होंने लाहौर में लाठीचार्ज के बाद घायल अवस्था में कहा था।",
        explanationEn: "This iconic statement was delivered by Punjab Kesari Lala Lajpat Rai after being wounded in Lahore."
      },
      {
        question: "साइमन कमीशन की चुनौती के उत्तर में भारतीयों द्वारा 1928 में तैयार की गई संवैधानिक रिपोर्ट कौन-सी थी?",
        questionEn: "Which constitutional document was prepared by Indians in 1928 in response to the Simon Commission challenge?",
        options: ["जिन्ना के 14 सूत्र", "नेहरू रिपोर्ट (Nehru Report)", "पुना पैक्ट", "वेवेल योजना"],
        optionsEn: ["Jinnah's 14 Points", "Nehru Report", "Poona Pact", "Wavell Plan"],
        correctIndex: 1,
        explanation: "ब्रिटिश भारत सचिव लॉर्ड बर्कनहेड की चुनौती के जवाब में सर्वदलीय समिति ने पं. मोतीलाल नेहरू की अध्यक्षता में 'नेहरू रिपोर्ट (1928)' तैयार की थी।",
        explanationEn: "In response to Lord Birkenhead's challenge, the All-Parties Conference chaired by Motilal Nehru published the Nehru Report in 1928."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "साइमन कमीशन क्या है?",
        questionEn: "What is the Simon Commission?",
        answer: "साइमन कमीशन (औपचारिक नाम: भारतीय सांविधानिक आयोग / Indian Statutory Commission) 7 ब्रिटिश सांसदों का एक आयोग था, जिसे सर जॉन साइमन की अध्यक्षता में 1927 में नियुक्त किया गया था। इसका काम भारत शासन अधिनियम 1919 की समीक्षा करना था।",
        answerEn: "The Simon Commission was a group of 7 British MPs formed under Sir John Simon in 1927 to evaluate the working of the Government of India Act 1919."
      },
      {
        question: "साइमन कमीशन भारत कब आया था?",
        questionEn: "When did the Simon Commission arrive in India?",
        answer: "साइमन कमीशन **3 फरवरी 1928** को पहली बार भारत के बंबई (मुंबई) बंदरगाह पहुँचा, जहाँ इसका 'Simon Go Back' के नारों और काले झंडों से स्वागत हुआ।",
        answerEn: "The Simon Commission arrived in India on **February 3, 1928** at Bombay harbor."
      },
      {
        question: "साइमन कमीशन का गठन कब हुआ था?",
        questionEn: "When was the Simon Commission formed?",
        answer: "साइमन कमीशन का गठन **8 नवंबर 1927** को ब्रिटेन की कंज़र्वेटिव सरकार द्वारा लंदन में किया गया था।",
        answerEn: "The Simon Commission was appointed on **November 8, 1927** in London."
      },
      {
        question: "साइमन कमीशन भारत क्यों आया था?",
        questionEn: "Why did the Simon Commission come to India?",
        answer: "यह 1919 के भारत सरकार अधिनियम के क्रियान्वयन तथा प्रांतीय द्वैध शासन प्रणाली (Diarchy) का मूल्यांकन करने तथा नए संवैधानिक सुधारों की सिफारिश करने हेतु भारत आया था।",
        answerEn: "It came to India to evaluate the 1919 Act, assess provincial diarchy, and recommend future constitutional reforms."
      },
      {
        question: "साइमन कमीशन के 7 सदस्य कौन-कौन थे?",
        questionEn: "Who were the 7 members of the Simon Commission?",
        answer: "1. सर जॉन साइमन (अध्यक्ष), 2. क्लेमेंट एटली, 3. विस्काउंट बर्नहम, 4. एडवर्ड कैडोगन, 5. वर्नोन हर्टशॉर्न, 6. जॉर्ज लेन-फॉक्स, और 7. लॉर्ड स्ट्रैथकोना।",
        answerEn: "1. Sir John Simon (Chair), 2. Clement Attlee, 3. Viscount Burnham, 4. Edward Cadogan, 5. Vernon Hartshorn, 6. George Lane-Fox, 7. Lord Strathcona."
      },
      {
        question: "साइमन कमीशन का विरोध क्यों हुआ था?",
        questionEn: "Why was the Simon Commission boycotted?",
        answer: "क्योंकि इसमें एक भी भारतीय सदस्य शामिल नहीं था। सभी 7 सदस्य अंग्रेज थे, जिसे भारतीयों के आत्मनिर्णय के अधिकार का अपमान माना गया। इसलिए इसे 'श्वेत आयोग' भी कहा गया।",
        answerEn: "Because it was an All-White Commission with zero Indian members, which was seen as an insult to Indian self-determination."
      },
      {
        question: "साइमन कमीशन के समर्थक कौन थे?",
        questionEn: "Who were the supporters of the Simon Commission?",
        answer: "मद्रास की **जस्टिस पार्टी (Justice Party)**, पंजाब की **यूनियनवादी पार्टी (Unionist Party)**, डॉ. बी.आर. अम्बेडकर की **ऑल इंडिया डिप्रेस्ड क्लासेस एसोसिएशन** तथा मुस्लिम लीग के मोहम्मद शफी गुट ने इसका विरोध नहीं किया था।",
        answerEn: "The Justice Party (Madras), Unionist Party (Punjab), Dr. B.R. Ambedkar's Depressed Classes Association, and Muslim League (Shafi Faction) supported or cooperated with the commission."
      },
      {
        question: "लाला लाजपत राय की शहादत साइमन कमीशन से कैसे जुड़ी है?",
        questionEn: "How is Lala Lajpat Rai's martyrdom connected to the Simon Commission?",
        answer: "30 अक्टूबर 1928 को लाहौर में साइमन कमीशन का विरोध करते समय पुलिस लाठीचार्ज में लाला लाजपत राय गंभीर रूप से घायल हो गए और 17 नवंबर 1928 को उनकी शहादत हुई।",
        answerEn: "On Oct 30, 1928 in Lahore, Lala Lajpat Rai was brutally injured in a police lathi charge while protesting the commission and died on Nov 17, 1928."
      },
      {
        question: "साइमन कमीशन का परिणाम क्या हुआ?",
        questionEn: "What was the ultimate outcome of the Simon Commission?",
        answer: "इसके विरोध ने भारतीयों को एकजुट किया, जिससे नेहरू रिपोर्ट (1928), 1929 का पूर्ण स्वराज प्रस्ताव, सविनय अवज्ञा आंदोलन (1930) तथा भारत शासन अधिनियम 1935 में प्रांतीय स्वायत्तता लागू हुई।",
        answerEn: "It led to the drafting of the Nehru Report 1928, the 1929 Purna Swaraj resolution, the Civil Disobedience Movement 1930, and the Government of India Act 1935."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "National Archives of India - Freedom Movement Records", url: "https://nationalarchives.nic.in" },
      { label: "NCERT Class 12 Modern History Textbook", url: "https://ncert.nic.in" },
      { label: "MPPSC Official Syllabus & Constitutional Documents", url: "https://mppsc.mp.gov.in" }
    ]
  };

  try {
    await client.createOrReplace(updatedArticle);
    console.log("✨ Successfully uploaded SEO Ultimate Optimized Simon Commission Article to Sanity CMS!");
  } catch (err) {
    console.error("❌ Failed to update article in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running SEO optimization script:", err);
  process.exit(1);
});
