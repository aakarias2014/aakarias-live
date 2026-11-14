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

// Helper function to sanitize text by stripping zero-width unicode characters
function sanitizeText(str: string): string {
  if (!str) return "";
  return str.replace(/[\u200B-\u200D\u200E\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u00AD\u2000-\u200A]/g, "").trim();
}

function createTable(key: string, caption: string, headers: string[], rows: string[][]): any {
  const cleanedHeaders = headers.map(sanitizeText);
  const cleanedRows = rows.map((r) => r.map(sanitizeText));
  return {
    _key: key,
    _type: "table",
    table: {
      caption: sanitizeText(caption),
      headers: cleanedHeaders,
      rows: cleanedRows,
    },
  };
}

async function main() {
  console.log("🚀 Starting upload process for COSMOS-Mysuru LED Dome Planetarium Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    cover: path.resolve(process.cwd(), "public/images/blog/cosmos-mysuru-led-dome-planetarium-user-cover.jpg"),
    interior: path.resolve(process.cwd(), "public/images/blog/cosmos-mysuru-led-dome-interior-experience.jpg"),
  };

  // Verify images exist
  if (!fs.existsSync(imagePaths.cover) || !fs.existsSync(imagePaths.interior)) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Cover Image
  console.log("📸 Uploading cover banner image to Sanity...");
  const assetCover = await client.assets.upload("image", fs.createReadStream(imagePaths.cover), {
    filename: "cosmos-mysuru-led-dome-planetarium-user-cover.jpg",
  });
  console.log(`✔ Uploaded Cover Image. Asset ID: ${assetCover._id}`);

  // 2. Upload Interior Image
  console.log("📸 Uploading interior dome visualization image to Sanity...");
  const assetInterior = await client.assets.upload("image", fs.createReadStream(imagePaths.interior), {
    filename: "cosmos-mysuru-led-dome-interior-experience.jpg",
  });
  console.log(`✔ Uploaded Interior Image. Asset ID: ${assetInterior._id}`);

  const authorId = "author-aakar-ias-team";

  // SEO Target Keywords
  const keywordsArray = [
    "भारत का पहला LED डोम तारामंडल",
    "कॉसमॉस मैसूरु क्या है",
    "cosmos mysuru led dome planetarium",
    "india first led dome planetarium cosmos mysuru",
    "cosmos mysuru inauguration date narendra modi",
    "cosmos planetarium mysore university iia",
    "indian institute of astrophysics cosmos mysuru",
    "difference between led dome and optical projector planetarium",
    "mppsc science and technology cosmos mysuru notes",
    "upsc science and technology led dome planetarium",
    "15 meter tilted led dome 8k resolution 4.2 crore leds",
    "mppsc prelims unit 7 science institutions notes",
  ];

  const docTitleHi = "भारत का पहला LED डोम तारामंडल ‘कॉसमॉस-मैसूरु’: मुख्य विशेषताएँ, 8K तकनीक, IIA व परीक्षा नोट्स | MPPSC & UPSC";
  const docTitleEn = "India's First LED Dome Planetarium 'COSMOS-Mysuru': Key Facts, 8K Technology, IIA & Exam Notes | MPPSC & UPSC";

  const docExcerptHi = "13 नवंबर 2026 को प्रधानमंत्री नरेंद्र मोदी ने मैसूर विश्वविद्यालय परिसर (कर्नाटक) में भारत के पहले 15-मीटर टिल्टेड LED डोम तारामंडल ‘कॉसमॉस-मैसूरु’ (COSMOS-Mysuru) का उद्घाटन किया। IIA द्वारा विकसित इस तारामंडल में 6,150 LED पैनल्स, 4.2 करोड़ व्यक्तिगत LEDs और 8K इमर्सिव तकनीक शामिल है। जानें पारंपरिक प्रोजेक्टर से अंतर व 8 अभ्यास MCQs।";
  const docExcerptEn = "On 13 November 2026, Prime Minister Narendra Modi inaugurated India's first-ever 15-meter tilted LED dome planetarium 'COSMOS-Mysuru' at the University of Mysore campus, Karnataka. Developed by the Indian Institute of Astrophysics (IIA), it features 6,150 LED panels, 4.2 crore individual LEDs, and true 8K resolution. Includes comparative table and 8 practice MCQs for MPPSC & UPSC.";

  const docSlug = "indias-first-led-dome-planetarium-cosmos-mysuru";

  // Upsert for both Current Affairs and Static GK
  const docIds = [
    "ca-indias-first-led-dome-planetarium-cosmos-mysuru",
    "gk-indias-first-led-dome-planetarium-cosmos-mysuru",
  ];

  for (const docId of docIds) {
    const isCA = docId.startsWith("ca-");
    console.log(`📌 Upserting document ${docId}...`);

    const articlePayload: any = {
      _type: isCA ? "currentAffairs" : "staticGk",
      slug: { _type: "slug", current: docSlug },
      title: sanitizeText(docTitleHi),
      titleEn: sanitizeText(docTitleEn),
      excerpt: sanitizeText(docExcerptHi),
      excerptEn: sanitizeText(docExcerptEn),
      ca_date: "2026-11-14",
      publishedAt: "2026-11-14T08:00:00.000Z",
      featured: true,
      readingTime: 8,
      keywords: keywordsArray,
      seoTitle: sanitizeText("भारत का पहला LED डोम तारामंडल ‘कॉसमॉस-मैसूरु’ | MPPSC & UPSC"),
      seoTitleEn: sanitizeText("India's First LED Dome Planetarium COSMOS-Mysuru | MPPSC & UPSC Notes"),
      metaDescription: sanitizeText(docExcerptHi),
      metaDescriptionEn: sanitizeText(docExcerptEn),
      category: { _type: "reference", _ref: "cat-scitech" },
      author: { _type: "reference", _ref: authorId },
      tags: [
        { _type: "reference", _ref: "tag-mppsc", _key: "ref-tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc", _key: "ref-tag-upsc" },
        { _type: "reference", _ref: "tag-prelims", _key: "ref-tag-prelims" },
        { _type: "reference", _ref: "tag-mains", _key: "ref-tag-mains" },
      ],
      syllabus: [
        "MPPSC Prelims Paper-1 Unit 7 (Science, Environment & Health - Indian Scientific Research Institutions)",
        "MPPSC Mains Paper-3 Unit 7 (Science & Technology - Indian Institutes & Modern Tech Innovations)",
        "UPSC GS Paper-3 (Science & Technology - Indigenization of Technology & Achievements of Indians)",
      ],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetCover._id },
        alt: "भारत का पहला LED डोम तारामंडल ‘कॉसमॉस-मैसूरु’ शुरू | India's First LED Dome Planetarium COSMOS-Mysuru Banner",
      },
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetCover._id },
        alt: "India's First LED Dome Planetarium COSMOS-Mysuru Banner with Starlit Dome Architecture",
      },
      nextArticle: {
        title: "भारत का नया AI सुपरकंप्यूटर 'परम प्रज्ञा': सुपरकंप्यूटिंग क्रांति व AI डोमिनेंस",
        titleEn: "India's New AI Supercomputer 'PARAM Pragya': HPC & AI Dominance Notes",
        href: "/current-affairs/param-pragya-ai-supercomputer-india-supercomputing-journey",
      },

      /* ─── SECTIONS ──────────────────────────────────────────────── */
      sections: [
        /* ── 1. Overview & Context ────────────────────────────────── */
        {
          _key: "sec-overview",
          kind: "whyInNews",
          title: sanitizeText("चर्चा में क्यों? (Why in News: कॉसमॉस-मैसूरु का ऐतिहासिक उद्घाटन)"),
          titleEn: sanitizeText("Why in News? (Historic Launch of COSMOS-Mysuru)"),
          body: [
            {
              _key: "b1-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s1-1", _type: "span", text: sanitizeText("खगोल विज्ञान एवं आधुनिक प्रौद्योगिकी में भारत की ऐतिहासिक छलांग") }],
            },
            {
              _key: "b1-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-2", _type: "span", text: sanitizeText("• **ऐतिहासिक उद्घाटन**: 13 नवंबर 2026 को प्रधानमंत्री **नरेंद्र मोदी** ने कर्नाटक के ऐतिहासिक शहर मैसूरु स्थित **मैसूर विश्वविद्यालय (University of Mysore)** के मानसगंगोत्री परिसर में भारत के पहले अत्याधुनिक LED डोम तारामंडल **‘कॉसमॉस-मैसूरु’ (COSMOS-Mysuru)** का आधिकारिक उद्घाटन किया।") }],
            },
            {
              _key: "b1-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-3", _type: "span", text: sanitizeText("• **विकसित करने वाली संस्था**: इस अत्याधुनिक तारामंडल का विकास भारत सरकार के विज्ञान एवं प्रौद्योगिकी विभाग (DST) के अधीन कार्यरत प्रतिष्ठित स्वायत्त संस्थान **इंडियन इंस्टीट्यूट ऑफ एस्ट्रोफिजिक्स (IIA - Indian Institute of Astrophysics, बेंगलुरु)** द्वारा मैसूर विश्वविद्यालय के सहयोग से किया गया है।") }],
            },
            {
              _key: "b1-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-4", _type: "span", text: sanitizeText("• **परीक्षा प्रासंगिकता**: [MPPSC Prelims Syllabus 2026](/mppsc/prelims-syllabus) की यूनिट 7 (प्रमुख भारतीय वैज्ञानिक संस्थान एवं उपलब्धियाँ) तथा [MPPSC Mains Syllabus 2026](/mppsc/mains-syllabus) के पेपर 3 (विज्ञान एवं प्रौद्योगिकी) के लिए यह विषय अत्यंत महत्वपूर्ण है।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b1-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s1-1e", _type: "span", text: sanitizeText("India's Landmark Milestone in Astronomy & Optical Tech") }],
            },
            {
              _key: "b1-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-2e", _type: "span", text: sanitizeText("• **Historic Dedication**: On 13 November 2026, Prime Minister **Narendra Modi** inaugurated India's first-ever state-of-the-art LED Dome Planetarium named **'COSMOS-Mysuru'** at the Manasagangotri campus of the **University of Mysore**, Karnataka.") }],
            },
            {
              _key: "b1-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-3e", _type: "span", text: sanitizeText("• **Developing Institution**: Conceived and executed by the premier autonomous institute under the Department of Science and Technology (DST) — the **Indian Institute of Astrophysics (IIA, Bengaluru)** — in institutional collaboration with the University of Mysore.") }],
            },
            {
              _key: "b1-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s1-4e", _type: "span", text: sanitizeText("• **Exam Alignment**: Directly relevant for [MPPSC Prelims Paper 1 Unit 7](/en/mppsc/prelims-syllabus) (Indian Scientific Institutions & Achievements) and [MPPSC Mains Paper 3 Unit 7](/en/mppsc/mains-syllabus) (Science & Technology Innovations).") }],
            },
          ],
        },

        /* ── 2. Key Facts Table & Bullet Points ───────────────────── */
        {
          _key: "sec-key-facts",
          kind: "initiatives",
          title: sanitizeText("कॉसमॉस-मैसूरु: प्रमुख तकनीकी विनिर्देश एवं सांख्यिकी (Key Technical Specifications)"),
          titleEn: sanitizeText("COSMOS-Mysuru: Core Technical Specifications & Architecture"),
          body: [
            {
              _key: "b2-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-1", _type: "span", text: sanitizeText("तकनीकी उत्कृष्टता के मुख्य घटक") }],
            },
            {
              _key: "b2-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-2", _type: "span", text: sanitizeText("• **15 मीटर का झुका हुआ (Tilted) डोम**: इसमें 15 मीटर व्यास का एक झुका हुआ (15° Tilted) हेमिस्फेरिकल डोम बनाया गया है, जो दर्शकों को बिना गर्दन उठाए प्राकृतिक दृष्टि कोण में ब्रह्मांड का 360-डिग्री दृश्य प्रदान करता है।") }],
            },
            {
              _key: "b2-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-3", _type: "span", text: sanitizeText("• **6,150 व्यक्तिगत LED पैनल्स**: डोम की आंतरिक सतह पर लगभग 6,150 उच्च परिशुद्धता वाले मॉड्यूलर LED पैनल्स को सीमलेस (बिना किसी जोड़ के) तरीके से संरेखित किया गया है।") }],
            },
            {
              _key: "b2-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-4", _type: "span", text: sanitizeText("• **4.2 करोड़ व्यक्तिगत LEDs**: पूरी स्क्रीन पर कुल मिलाकर लगभग **4.2 करोड़ (42 Million)** व्यक्तिगत माइक्रो/मिनी LEDs लगी हैं, जो प्रत्येक पिक्सेल को स्वतंत्र रूप से नियंत्रित करती हैं।") }],
            },
            {
              _key: "b2-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-5", _type: "span", text: sanitizeText("• **8K अल्ट्रा-हाई डेफिनिशन रिजॉल्यूशन**: यह सिस्टम ट्रू 8K रिजॉल्यूशन (लगभग 8000 पिक्सल क्षैतिज विस्तार) और उच्च फ्रेम दर (60/120 fps) पर खगोलीय दृश्यों का सजीव प्रतिपादन करता है।") }],
            },
            {
              _key: "b2-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-6", _type: "span", text: sanitizeText("• **स्वयं प्रकाशित स्क्रीन (Self-Emissive Screen)**: पारंपरिक तारामंडलों के विपरीत इसमें किसी केंद्रीय या परिधीय प्रोजेक्टर की आवश्यकता नहीं होती। LED पैनल्स स्वयं प्रकाश उत्पन्न करते हैं, जिससे छाया या ऑप्टिकल विकृति पूरी तरह समाप्त हो जाती है।") }],
            },
            {
              _key: "b2-img",
              _type: "image",
              asset: { _type: "reference", _ref: assetInterior._id },
              alt: "COSMOS-Mysuru 15-meter Tilted LED Dome Planetarium Interior Experience with 8K Cosmic Visuals",
              caption: "चित्र: कॉसमॉस-मैसूरु का आंतरिक 15-मीटर टिल्टेड LED डोम — 8K अल्ट्रा-हाई डेफिनिशन में ब्रह्मांड, आकाशगंगाओं व तारों का 360-डिग्री जीवंत प्रदर्शन",
            },
          ],
          bodyEn: [
            {
              _key: "b2-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s2-1e", _type: "span", text: sanitizeText("Core Pillars of Technical Excellence") }],
            },
            {
              _key: "b2-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-2e", _type: "span", text: sanitizeText("• **15-Meter Tilted Hemispherical Dome**: Engineered with a 15-meter diameter dome inclined at a 15-degree angle, optimizing human ergonomic line-of-sight for immersive horizon-to-zenith viewing without neck strain.") }],
            },
            {
              _key: "b2-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-3e", _type: "span", text: sanitizeText("• **6,150 Modular LED Panels**: Precision-tiled with 6,150 custom curved active-matrix LED modules forming a continuous, perfectly seamless curvilinear canvas.") }],
            },
            {
              _key: "b2-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-4e", _type: "span", text: sanitizeText("• **4.2 Crore (42 Million) Discrete LEDs**: Powered by an astonishing matrix of approximately 42 million individually controllable RGB micro/mini light-emitting diodes.") }],
            },
            {
              _key: "b2-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-5e", _type: "span", text: sanitizeText("• **True 8K Spatial Resolution**: Capable of ultra-high dynamic range 8K spatial rendering (7680 × 4320 effective baseline) driven at high temporal refresh rates (60/120 Hz).") }],
            },
            {
              _key: "b2-6e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s2-6e", _type: "span", text: sanitizeText("• **Self-Emissive Active Display**: Eliminates traditional optical and digital projectors entirely. Every pixel generates its own light, eliminating throw shadows, beam scattering, and bulb degradation.") }],
            },
          ],
        },

        /* ── 3. LED Dome vs Traditional Projector Comparison ─────── */
        {
          _key: "sec-comparison",
          kind: "background",
          title: sanitizeText("LED डोम बनाम पारंपरिक ऑप्टिकल/डिजिटल प्रोजेक्टर: तुलनात्मक सारणी (Comparative Analysis)"),
          titleEn: sanitizeText("Comparative Analysis: LED Dome vs Traditional Optical Projector Planetarium"),
          body: [
            {
              _key: "b3-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-1", _type: "span", text: sanitizeText("• **तारामंडल प्रौद्योगिकी में पीढ़ीगत बदलाव**: पारंपरिक ऑप्टिकल (जैसे कार्ल ज़ाइस) या डिजिटल प्रोजेक्टर आधारित तारामंडलों की तुलना में LED डोम तकनीक कई गुना अधिक उन्नत है:") }],
            },
            createTable(
              "table-led-vs-projector",
              "LED डोम तकनीक बनाम पारंपरिक प्रोजेक्टर आधारित तारामंडल की तुलना",
              ["मापदंड (Parameter)", "कॉसमॉस-मैसूरु (LED डोम)", "पारंपरिक तारामंडल (प्रोजेक्टर आधारित)"],
              [
                ["प्रदर्शन तकनीक", "स्वयं-प्रकाश उत्सर्जक LED सतह (Self-Emissive)", "बाहरी प्रोजेक्टर द्वारा स्क्रीन पर परावर्तित प्रकाश"],
                ["चमक (Brightness)", "अत्यधिक उच्च (परिवेशी प्रकाश में भी स्पष्ट)", "मध्यम से कम (कमरे में पूर्ण अंधेरा आवश्यक)"],
                ["कंट्रास्ट अनुपात", "अनंत (Infinite Contrast - पिक्सेल बंद होने पर शुद्ध काला)", "सीमित (गहरे काले रंग के बजाय स्लेटी/ग्रे दिखता है)"],
                ["360° विसर्जन अनुभव", "पूर्णतः निर्बाध (Seamless, शून्य छाया प्रभाव)", "प्रोजेक्टर बीम में दर्शकों की छाया पड़ने का जोखिम"],
                ["रिजॉल्यूशन एवं विवरण", "ट्रू 8K अल्ट्रा-हाई डेफिनिशन (4.2 करोड़ LED)", "प्रोजेक्टर लेंस की गुणवत्ता व फोकस पर निर्भर (2K से 4K)"],
                ["रखरखाव व जीवनकाल", "दीर्घकालिक जीवनकाल (1,00,000 घंटे), कम ऊर्जा ह्रास", "लैंप/लेजर रिप्लेसमेंट, नियमित लेंस कैलिब्रेशन की जरूरत"],
                ["खगोलीय डेटा सिमुलेशन", "रीयल-टाइम हाई-स्पीड एस्ट्रोफिजिकल डेटा फीड्स", "पूर्व-रिकॉर्डेड डिजिटल वीडियो तक मुख्यतः सीमित"]
              ]
            ),
          ],
          bodyEn: [
            {
              _key: "b3-1e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s3-1e", _type: "span", text: sanitizeText("• **Technological Paradigm Shift**: Benchmarking next-generation active-matrix LED domes against conventional optical-mechanical and digital projection systems:") }],
            },
            createTable(
              "table-led-vs-projector-en",
              "Comparative Analysis: LED Dome vs Conventional Projection Planetarium",
              ["Parameter", "COSMOS-Mysuru (Active LED Dome)", "Conventional Planetarium (Projection Based)"],
              [
                ["Display Architecture", "Self-emissive modular curved surface", "External optical or digital projectors reflecting onto dome"],
                ["Peak Luminance", "Ultra-high luminance (Vibrant even with ambient lighting)", "Low to moderate (Requires absolute darkness)"],
                ["Contrast Ratio", "Infinite (Pure true blacks when diodes switch off)", "Limited (Blacks appear hazy grey due to light scatter)"],
                ["Obstruction & Shadows", "Completely shadow-free across entire 360° hemisphere", "Susceptible to audience or hardware shadow cast"],
                ["Native Resolution", "Native True 8K spatial resolution (42 million diodes)", "Typically 2K–4K, subject to edge-blending distortions"],
                ["Operational Lifespan", "Exceeds 100,000 operational hours with low degradation", "Frequent bulb/laser degradation and optical recalibration"],
                ["Dynamic Research Feeding", "Real-time raw astronomical simulations & telescope streams", "Primarily restricted to pre-rendered motion files"]
              ]
            ),
          ],
        },

        /* ── 4. Scientific Working Principle ──────────────────────── */
        {
          _key: "sec-working-principle",
          kind: "issues",
          title: sanitizeText("LED डोम तकनीक की कार्यप्रणाली एवं वैज्ञानिक सिद्धांत (Scientific Working Principle)"),
          titleEn: sanitizeText("Engineering Architecture & Scientific Operating Principles"),
          body: [
            {
              _key: "b4-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-1", _type: "span", text: sanitizeText("1. सेमीकंडक्टर p-n जंक्शन एवं इलेक्ट्रो-ल्यूमिनेसेंस") }],
            },
            {
              _key: "b4-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-2", _type: "span", text: sanitizeText("• **मूल भौतिक सिद्धांत**: LED (Light Emitting Diode) एक अर्धचालक (Semiconductor) डायोड है। जब इसमें विद्युत धारा प्रवाहित की जाती है, तो इलेक्ट्रॉन और होल्स का पुनर्संयोजन (Recombination) होता है, जिससे ऊर्जा फोटॉनों (प्रकाश) के रूप में उत्सर्जित होती है। इस प्रक्रिया को **इलेक्ट्रो-ल्यूमिनेसेंस (Electroluminescence)** कहा जाता है।") }],
            },
            {
              _key: "b4-3",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-3", _type: "span", text: sanitizeText("2. एक्टिव-मैट्रिक्स एवं सब-मिलीमीटर पिक्सेल पिच") }],
            },
            {
              _key: "b4-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-4", _type: "span", text: sanitizeText("• **सटीक नियंत्रण**: डोम में लगी प्रत्येक LED स्वतंत्र रूप से नियंत्रित होती है। अति-सूक्ष्म पिक्सेल पिच (Pixel Pitch) के कारण दर्शक डोम के अत्यंत समीप बैठने पर भी अलग-अलग पिक्सेल या रेखाओं को नहीं देख सकते, जिससे पूरी सतह एक अखंड आकाशगंगा जैसी प्रतीत होती है।") }],
            },
            {
              _key: "b4-5",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-5", _type: "span", text: sanitizeText("3. ट्रू ब्लैक एवं अंतरिक्ष का वास्तविक दृश्य") }],
            },
            {
              _key: "b4-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-6", _type: "span", text: sanitizeText("• **असीम कंट्रास्ट**: अंतरिक्ष का अधिकांश भाग अत्यधिक अंधेरा (Deep Black) होता है। पारंपरिक प्रोजेक्टर प्रकाश फेंकते हैं, जिससे काला रंग भी हल्का धूसर दिखता है। इसके विपरीत, LED डोम में जिस बिंदु पर अंधकार दिखाना होता है, वहाँ की LED को **पूरी तरह बंद (Off)** कर दिया जाता है, जिससे अंतरिक्ष की अथाह गहराई का वास्तविक वैज्ञानिक अनुभव मिलता है।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b4-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-1e", _type: "span", text: sanitizeText("1. Semiconductor P-N Junction & Electroluminescence") }],
            },
            {
              _key: "b4-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-2e", _type: "span", text: sanitizeText("• **Physics Foundation**: A Light Emitting Diode (LED) operates on the principle of solid-state electroluminescence. When a forward bias current flows through the semiconductor p-n junction, electrons recombine with electron holes, releasing energy as photons.") }],
            },
            {
              _key: "b4-3e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-3e", _type: "span", text: sanitizeText("2. Active-Matrix Addressing & Sub-Millimeter Pitch") }],
            },
            {
              _key: "b4-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-4e", _type: "span", text: sanitizeText("• **Micro-Precision Control**: Each of the 42 million diodes is independently modulated via high-speed micro-controllers. Ultra-fine pixel pitch prevents optical screen-door artifacts, creating an indistinguishable synthetic celestial firmament.") }],
            },
            {
              _key: "b4-5e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s4-5e", _type: "span", text: sanitizeText("3. Absolute True Black & Infinite Dynamic Contrast") }],
            },
            {
              _key: "b4-6e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s4-6e", _type: "span", text: sanitizeText("• **Cosmic Realism**: Cosmic space is overwhelmingly pitch-black. Traditional projectors bleed stray light, rendering voids as washed-out grey. With active LED technology, diodes are turned off entirely (zero luminance output), reproducing true deep cosmic voids.") }],
            },
          ],
        },

        /* ── 5. Scientific, Educational & Research Applications ───── */
        {
          _key: "sec-applications",
          kind: "reforms",
          title: sanitizeText("कॉसमॉस-मैसूरु के प्रमुख शैक्षणिक एवं वैज्ञानिक उपयोग (Applications & Significance)"),
          titleEn: sanitizeText("Strategic Scientific, Academic & Research Applications"),
          body: [
            {
              _key: "b5-1",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-1", _type: "span", text: sanitizeText("1. उच्च-स्तरीय खगोल भौतिकी शोध (Astrophysics Research)") }],
            },
            {
              _key: "b5-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-2", _type: "span", text: sanitizeText("• **जटिल सिमुलेशन**: ब्रह्मांडीय आकाशगंगाओं के टकराव, सुपरनोवा विस्फोट, ब्लैक होल के एक्रीशन डिस्क और न्यूट्रॉन तारों के विलय जैसे जटिल कंप्यूटर मॉडलों को 8K 3D अंतरिक्ष में विज़ुअलाइज़ करना।") }],
            },
            {
              _key: "b5-3",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-3", _type: "span", text: sanitizeText("2. भारतीय वेधशालाओं से रीयल-टाइम डेटा एकीकरण") }],
            },
            {
              _key: "b5-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-4", _type: "span", text: sanitizeText("• **वेधशाला नेटवर्क**: IIA की लद्दाख स्थित हानले वेधशाला (Himalayan Chandra Telescope), कवलूर वेधशाला, उदयपुर सौर वेधशाला और इसरो के आदित्य-L1 सौर मिशन से प्राप्त वास्तविक अवलोकनों को शोधकर्ताओं के लिए सीधे डोम पर प्रदर्शित किया जा सकेगा।") }],
            },
            {
              _key: "b5-5",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-5", _type: "span", text: sanitizeText("3. STEM शिक्षा एवं वैज्ञानिक दृष्टिकोण का प्रसार") }],
            },
            {
              _key: "b5-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-6", _type: "span", text: sanitizeText("• **विद्यार्थियों में प्रेरणा**: स्कूली एवं कॉलेज स्तर के विद्यार्थियों को खगोल विज्ञान, भौतिकी एवं एयरोस्पेस इंजीनियरिंग के क्षेत्र में अनुसंधान हेतु व्यावहारिक मंच प्रदान करना।") }],
            },
            {
              _key: "b5-7",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-7", _type: "span", text: sanitizeText("4. वैज्ञानिक पर्यटन एवं सार्वजनिक सहभागिता") }],
            },
            {
              _key: "b5-8",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-8", _type: "span", text: sanitizeText("• **हेरिटेज सिटी मैसूरु का नया आकर्षण**: मैसूरु पैलेस और वृंदावन गार्डन्स के साथ-साथ यह डोम तारामंडल कर्नाटक में विज्ञान पर्यटन (Science Tourism) का प्रमुख अंतरराष्ट्रीय केंद्र बनेगा।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b5-1e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-1e", _type: "span", text: sanitizeText("1. Advanced Computational Astrophysical Modeling") }],
            },
            {
              _key: "b5-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-2e", _type: "span", text: sanitizeText("• **Complex Dynamic Simulations**: Allows spatial visualization of complex relativistic astrophysics: binary neutron star mergers, black hole accretion physics, gravitational lens warping, and cosmic web filament evolution.") }],
            },
            {
              _key: "b5-3e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-3e", _type: "span", text: sanitizeText("2. Direct Telemetric Ingestion from Indian Observatories") }],
            },
            {
              _key: "b5-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-4e", _type: "span", text: sanitizeText("• **National Observational Grid**: Directly interfaced to ingest astronomical observations from the Himalayan Chandra Telescope (Hanle, Ladakh), Vainu Bappu Observatory (Kavalur), Udaipur Solar Observatory, and ISRO's Aditya-L1 solar coronagraph data.") }],
            },
            {
              _key: "b5-5e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-5e", _type: "span", text: sanitizeText("3. STEM Education & Scientific Temper Promotion") }],
            },
            {
              _key: "b5-6e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-6e", _type: "span", text: sanitizeText("• **Inspiring Next-Gen Scientists**: Fosters curiosity in young students across physics, astronomical instrumentation, computational science, and aerospace engineering.") }],
            },
            {
              _key: "b5-7e",
              _type: "block",
              style: "h3",
              children: [{ _key: "s5-7e", _type: "span", text: sanitizeText("4. Flagship Destination for Science Tourism") }],
            },
            {
              _key: "b5-8e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s5-8e", _type: "span", text: sanitizeText("• **Global Scientific Hub**: Augments Mysuru's heritage circuit (Mysuru Palace, Chamundi Hills) with world-class scientific infrastructure attracting international scholars and tourists.") }],
            },
          ],
        },

        /* ── 6. Full Forms & Institutional Framework ─────────────── */
        {
          _key: "sec-institutional",
          kind: "background",
          title: sanitizeText("परीक्षा हेतु महत्वपूर्ण Full Forms एवं संस्थागत पृष्ठभूमि (Institutional Framework)"),
          titleEn: sanitizeText("Essential Acronyms & Institutional Background for MPPSC & UPSC"),
          body: [
            {
              _key: "b6-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-1", _type: "span", text: sanitizeText("• **IIA (Indian Institute of Astrophysics - भारतीय खगोल भौतिकी संस्थान)**: भारत सरकार के विज्ञान एवं प्रौद्योगिकी विभाग (DST) का प्रमुख अनुसंधान संस्थान। मुख्यालय: बेंगलुरु (कर्नाटक)। इसके अंतर्गत हानले (लद्दाख), कवलूर (तमिलनाडु), और कोडाइकनाल वेधशालाएँ संचालित होती हैं।") }],
            },
            {
              _key: "b6-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-2", _type: "span", text: sanitizeText("• **LED (Light Emitting Diode)**: प्रकाश उत्सर्जक डायोड — एक ठोस-अवस्था (Solid-State) अर्धचालक युक्ति जो विद्युत धारा से सीधे प्रकाश उत्पन्न करती है।") }],
            },
            {
              _key: "b6-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-3", _type: "span", text: sanitizeText("• **8K Resolution**: लगभग 8,000 पिक्सल (7680 × 4320 पिक्सल) की क्षैतिज रिजॉल्यूशन श्रेणी, जो 4K से 4 गुना तथा 1080p Full HD से 16 गुना अधिक विवरण प्रदान करती है।") }],
            },
            {
              _key: "b6-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-4", _type: "span", text: sanitizeText("• **COSMOS**: ब्रह्मांड (Cosmos) तथा खगोल विज्ञान के सार्वजनिक प्रसार एवं आउटरीच से संबंधित बहुविषयक पहल।") }],
            },
            {
              _key: "b6-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-5", _type: "span", text: sanitizeText("• **DST (Department of Science and Technology)**: भारत सरकार का विज्ञान एवं प्रौद्योगिकी मंत्रालय, जो वैज्ञानिक अनुसंधान संस्थानों को वित्तीय व नीतिगत संबल देता है।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b6-1e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-1e", _type: "span", text: sanitizeText("• **IIA (Indian Institute of Astrophysics)**: Premier autonomous national research institution under the Department of Science and Technology (DST), Govt of India. Headquarters: Bengaluru, Karnataka. Operates world-class facilities including Hanle Gamma-Ray & Optical Telescopes in Ladakh.") }],
            },
            {
              _key: "b6-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-2e", _type: "span", text: sanitizeText("• **LED (Light Emitting Diode)**: Solid-state semiconductor optoelectronic diode emitting photon streams directly under electrical forward bias.") }],
            },
            {
              _key: "b6-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-3e", _type: "span", text: sanitizeText("• **8K UHD**: Display resolution standard delivering 7680 × 4320 pixels (33.18 million pixels per frame) — 4 times the detail of 4K and 16 times of standard 1080p.") }],
            },
            {
              _key: "b6-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-4e", _type: "span", text: sanitizeText("• **COSMOS**: Cosmological scientific outreach and astrophysics research visualization initiative.") }],
            },
            {
              _key: "b6-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s6-5e", _type: "span", text: sanitizeText("• **DST**: Department of Science & Technology, Ministry of Science & Technology, Government of India.") }],
            },
          ],
        },

        /* ── 7. Rapid High-Yield Exam Memory Points ───────────────── */
        {
          _key: "sec-exam-highlights",
          kind: "background",
          title: sanitizeText("MPPSC एवं UPSC परीक्षा हेतु महत्वपूर्ण स्मरणीय तथ्य (High-Yield Quick Revision)"),
          titleEn: sanitizeText("High-Yield Quick Revision Highlights for MPPSC & UPSC"),
          body: [
            {
              _key: "b7-1",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-1", _type: "span", text: sanitizeText("• **भारत का पहला LED डोम तारामंडल**: कॉसमॉस-मैसूरु (COSMOS-Mysuru)।") }],
            },
            {
              _key: "b7-2",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-2", _type: "span", text: sanitizeText("• **स्थान**: मैसूर विश्वविद्यालय (मानसगंगोत्री परिसर), कर्नाटक।") }],
            },
            {
              _key: "b7-3",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-3", _type: "span", text: sanitizeText("• **उद्घाटन तिथि**: 13 नवंबर 2026।") }],
            },
            {
              _key: "b7-4",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-4", _type: "span", text: sanitizeText("• **उद्घाटनकर्ता**: प्रधानमंत्री नरेंद्र मोदी।") }],
            },
            {
              _key: "b7-5",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-5", _type: "span", text: sanitizeText("• **विकासकर्ता संस्थान**: इंडियन इंस्टीट्यूट ऑफ एस्ट्रोफिजिक्स (IIA, बेंगलुरु)।") }],
            },
            {
              _key: "b7-6",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-6", _type: "span", text: sanitizeText("• **डोम का व्यास एवं प्रकार**: 15 मीटर व्यास, 15° झुका हुआ (Tilted) डोम।") }],
            },
            {
              _key: "b7-7",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-7", _type: "span", text: sanitizeText("• **LED पैनल्स की संख्या**: लगभग 6,150 मॉड्यूलर पैनल्स।") }],
            },
            {
              _key: "b7-8",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-8", _type: "span", text: sanitizeText("• **व्यक्तिगत LEDs की कुल संख्या**: लगभग 4.2 करोड़ (42 Million)।") }],
            },
            {
              _key: "b7-9",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-9", _type: "span", text: sanitizeText("• **प्रसारण रिजॉल्यूशन**: 8K अल्ट्रा-हाई डेफिनिशन (True 8K)।") }],
            },
            {
              _key: "b7-10",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-10", _type: "span", text: sanitizeText("• **प्रोजेक्टर की आवश्यकता**: शून्य (स्वयं प्रकाश उत्सर्जक स्क्रीन तकनीक)।") }],
            },
          ],
          bodyEn: [
            {
              _key: "b7-1e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-1e", _type: "span", text: sanitizeText("• **First LED Dome Planetarium of India**: COSMOS-Mysuru.") }],
            },
            {
              _key: "b7-2e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-2e", _type: "span", text: sanitizeText("• **Geographic Location**: University of Mysore (Manasagangotri), Karnataka.") }],
            },
            {
              _key: "b7-3e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-3e", _type: "span", text: sanitizeText("• **Inauguration Date**: 13 November 2026.") }],
            },
            {
              _key: "b7-4e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-4e", _type: "span", text: sanitizeText("• **Dignitary**: Prime Minister Narendra Modi.") }],
            },
            {
              _key: "b7-5e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-5e", _type: "span", text: sanitizeText("• **Lead Institution**: Indian Institute of Astrophysics (IIA, Bengaluru).") }],
            },
            {
              _key: "b7-6e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-6e", _type: "span", text: sanitizeText("• **Physical Geometry**: 15-meter diameter, 15-degree tilted hemispherical dome.") }],
            },
            {
              _key: "b7-7e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-7e", _type: "span", text: sanitizeText("• **Modular LED Count**: Approximately 6,150 active modules.") }],
            },
            {
              _key: "b7-8e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-8e", _type: "span", text: sanitizeText("• **Total Diode Population**: ~4.2 crore (42 Million) individual micro/mini LEDs.") }],
            },
            {
              _key: "b7-9e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-9e", _type: "span", text: sanitizeText("• **Display Resolution**: True 8K Ultra-High Definition.") }],
            },
            {
              _key: "b7-10e",
              _type: "block",
              style: "normal",
              children: [{ _key: "s7-10e", _type: "span", text: sanitizeText("• **Projector Dependency**: Zero (Self-emissive direct LED architecture).") }],
            },
          ],
        },
      ],

      /* ── 8 Practice MCQs (Quizzes) ──────────────────────────────── */
      mcqs: [
        {
          question: "भारत के पहले LED डोम तारामंडल ‘कॉसमॉस-मैसूरु’ (COSMOS-Mysuru) का विकास किस प्रमुख संस्थान द्वारा किया गया है?",
          questionEn: "Which premier institution developed India's first LED dome planetarium 'COSMOS-Mysuru'?",
          options: [
            "इसरो (ISRO)",
            "डीआरडीओ (DRDO)",
            "इंडियन इंस्टीट्यूट ऑफ एस्ट्रोफिजिक्स (IIA)",
            "भारतीय विज्ञान संस्थान (IISc Bengaluru)"
          ],
          optionsEn: [
            "Indian Space Research Organisation (ISRO)",
            "Defence Research & Development Organisation (DRDO)",
            "Indian Institute of Astrophysics (IIA)",
            "Indian Institute of Science (IISc Bengaluru)"
          ],
          correctIndex: 2,
          explanation: "कॉसमॉस-मैसूरु का विकास विज्ञान एवं प्रौद्योगिकी विभाग (DST) के अधीन कार्यरत इंडियन इंस्टीट्यूट ऑफ एस्ट्रोफिजिक्स (IIA, बेंगलुरु) द्वारा मैसूर विश्वविद्यालय के सहयोग से किया गया है।",
          explanationEn: "COSMOS-Mysuru was spearheaded by the Indian Institute of Astrophysics (IIA, Bengaluru), an autonomous institute under the Department of Science and Technology (DST)."
        },
        {
          question: "कॉसमॉस-मैसूरु तारामंडल का उद्घाटन 13 नवंबर 2026 को कहाँ किया गया?",
          questionEn: "Where was the COSMOS-Mysuru planetarium inaugurated on 13 November 2026?",
          options: [
            "मैसूर विश्वविद्यालय परिसर, कर्नाटक",
            "आईआईएससी परिसर, बेंगलुरु",
            "उस्मानिया विश्वविद्यालय, हैदराबाद",
            "पुणे विश्वविद्यालय, महाराष्ट्र"
          ],
          optionsEn: [
            "University of Mysore Campus, Karnataka",
            "IISc Campus, Bengaluru",
            "Osmania University, Hyderabad",
            "Pune University, Maharashtra"
          ],
          correctIndex: 0,
          explanation: "प्रधानमंत्री नरेंद्र मोदी ने 13 नवंबर 2026 को कर्नाटक के मैसूरु में मैसूर विश्वविद्यालय के मानसगंगोत्री परिसर में इसका उद्घाटन किया।",
          explanationEn: "Prime Minister Narendra Modi dedicated the facility at the Manasagangotri campus of the University of Mysore, Karnataka."
        },
        {
          question: "कॉसमॉस-मैसूरु LED डोम तारामंडल का व्यास (Diameter) कितना है?",
          questionEn: "What is the physical diameter of the COSMOS-Mysuru tilted LED dome?",
          options: [
            "10 मीटर",
            "12 मीटर",
            "15 मीटर",
            "20 मीटर"
          ],
          optionsEn: [
            "10 meters",
            "12 meters",
            "15 meters",
            "20 meters"
          ],
          correctIndex: 2,
          explanation: "कॉसमॉस-मैसूरु में 15 मीटर व्यास का झुका हुआ (Tilted) हेमिस्फेरिकल LED डोम बनाया गया है, जो दर्शकों को सहज दृष्टि कोण प्रदान करता है।",
          explanationEn: "The facility features a 15-meter diameter tilted dome engineered to optimize human ergonomic line-of-sight."
        },
        {
          question: "कॉसमॉस-मैसूरु के LED डोम में कुल कितनी व्यक्तिगत LEDs लगाई गई हैं?",
          questionEn: "Approximately how many individual micro/mini LEDs power the display surface of COSMOS-Mysuru?",
          options: [
            "लगभग 1.5 करोड़",
            "लगभग 2.8 करोड़",
            "लगभग 4.2 करोड़",
            "लगभग 6.5 करोड़"
          ],
          optionsEn: [
            "Approximately 1.5 Crore",
            "Approximately 2.8 Crore",
            "Approximately 4.2 Crore (42 Million)",
            "Approximately 6.5 Crore"
          ],
          correctIndex: 2,
          explanation: "डोम की सतह पर 6,150 LED पैनल्स में कुल मिलाकर लगभग 4.2 करोड़ (42 Million) व्यक्तिगत LEDs मौजूद हैं।",
          explanationEn: "The 6,150 tiled LED modules house approximately 4.2 crore (42 million) individual micro/mini light emitting diodes."
        },
        {
          question: "कॉसमॉस-मैसूरु LED डोम किस रिजॉल्यूशन पर खगोलीय दृश्यों का प्रदर्शन करता है?",
          questionEn: "What display resolution standard is deployed in the COSMOS-Mysuru LED dome planetarium?",
          options: [
            "Full HD (1080p)",
            "2K Cinema",
            "4K Ultra HD",
            "8K Ultra-High Definition (True 8K)"
          ],
          optionsEn: [
            "Full HD (1080p)",
            "2K Cinema",
            "4K Ultra HD",
            "8K Ultra-High Definition (True 8K)"
          ],
          correctIndex: 3,
          explanation: "कॉसमॉस-मैसूरु ट्रू 8K रिजॉल्यूशन (लगभग 8000 पिक्सल क्षैतिज विस्तार) पर काम करता है, जो अंतरिक्ष दृश्यों की बेजोड़ स्पष्टता और गहराई सुनिश्चित करता है।",
          explanationEn: "It features True 8K spatial resolution (7680 × 4320 pixels), delivering 16 times the visual detail of standard 1080p Full HD."
        },
        {
          question: "पारंपरिक तारामंडल की तुलना में LED डोम तकनीक का सबसे प्रमुख वैज्ञानिक लाभ क्या है?",
          questionEn: "What is the primary scientific advantage of an active LED dome over conventional projector-based planetariums?",
          options: [
            "यह स्वयं प्रकाश उत्सर्जित करता है, जिससे अनंत कंट्रास्ट और ट्रू ब्लैक मिलता है और प्रोजेक्टर की छाया नहीं पड़ती",
            "यह केवल ब्लैक एंड व्हाइट चित्र ही दिखा सकता है",
            "इसमें अधिक ध्वनि प्रदूषण होता है",
            "इसके लिए कमरे में भारी प्रकाश की आवश्यकता होती है"
          ],
          optionsEn: [
            "It is self-emissive, delivering infinite contrast, true deep blacks, and zero projector shadows",
            "It can display only monochrome imagery",
            "It produces acoustic interference",
            "It requires full ambient sunlight inside"
          ],
          correctIndex: 0,
          explanation: "LED डोम स्वयं-प्रकाश उत्सर्जक (Self-Emissive) स्क्रीन पर आधारित है, जिससे पिक्सेल बंद होने पर गहरा काला रंग (True Black) मिलता है और प्रोजेक्टर बीम की छाया समाप्त हो जाती है।",
          explanationEn: "Active self-emissive diodes allow individual pixels to turn off completely for infinite contrast, eliminating ambient projector scatter."
        },
        {
          question: "इंडियन इंस्टीट्यूट ऑफ एस्ट्रोफिजिक्स (IIA) का केंद्रीय मुख्यालय कहाँ स्थित है?",
          questionEn: "Where is the headquarters of the Indian Institute of Astrophysics (IIA) located?",
          options: [
            "नई दिल्ली",
            "बेंगलुरु (कर्नाटक)",
            "पुणे (महाराष्ट्र)",
            "हैदराबाद (तेलंगाना)"
          ],
          optionsEn: [
            "New Delhi",
            "Bengaluru (Karnataka)",
            "Pune (Maharashtra)",
            "Hyderabad (Telangana)"
          ],
          correctIndex: 1,
          explanation: "इंडियन इंस्टीट्यूट ऑफ एस्ट्रोफिजिक्स (IIA) का मुख्यालय कोरमंगला, बेंगलुरु में स्थित है। यह लद्दाख के हानले में स्थित विश्व की सबसे ऊँची ऑप्टिकल वेधशालाओं में से एक का संचालन भी करता है।",
          explanationEn: "IIA is headquartered in Bengaluru, Karnataka, and operates astronomical observatories including the high-altitude Himalayan Chandra Telescope at Hanle, Ladakh."
        },
        {
          question: "LED (प्रकाश उत्सर्जक डायोड) भौतिकी के किस मूल सिद्धांत पर कार्य करता है?",
          questionEn: "On which fundamental physics principle does a Light Emitting Diode (LED) operate?",
          options: [
            "प्रकाश विद्युत प्रभाव (Photoelectric Effect)",
            "इलेक्ट्रो-ल्यूमिनेसेंस (Electroluminescence in p-n Junction)",
            "थर्मियोनिक उत्सर्जन (Thermionic Emission)",
            "नाभिकीय विखंडन (Nuclear Fission)"
          ],
          optionsEn: [
            "Photoelectric Effect",
            "Electroluminescence (p-n Junction Recombination)",
            "Thermionic Emission",
            "Nuclear Fission"
          ],
          correctIndex: 1,
          explanation: "LED एक सेमीकंडक्टर p-n जंक्शन डायोड है जो अग्र अभिनति (Forward Bias) में इलेक्ट्रॉनों और होल्स के पुनर्संयोजन से फोटॉन उत्सर्जित करता है, जिसे इलेक्ट्रो-ल्यूमिनेसेंस कहते हैं।",
          explanationEn: "LEDs function via solid-state electroluminescence, where electron-hole recombination across a forward-biased p-n junction releases energy as visible photons."
        }
      ],

      /* ── 10 Collapsible FAQs ────────────────────────────────────── */
      faqs: [
        {
          question: "कॉसमॉस-मैसूरु (COSMOS-Mysuru) क्या है?",
          questionEn: "What is COSMOS-Mysuru?",
          answer: "कॉसमॉस-मैसूरु भारत का पहला अत्याधुनिक 15-मीटर LED डोम तारामंडल है, जो कर्नाटक के मैसूर विश्वविद्यालय परिसर में स्थित है। इसका उद्घाटन 13 नवंबर 2026 को प्रधानमंत्री नरेंद्र मोदी द्वारा किया गया।",
          answerEn: "COSMOS-Mysuru is India's first state-of-the-art 15-meter tilted LED dome planetarium, located at the University of Mysore, Karnataka, inaugurated by PM Narendra Modi on 13 Nov 2026."
        },
        {
          question: "कॉसमॉस-मैसूरु का विकास किस संस्था ने किया है?",
          questionEn: "Which agency developed COSMOS-Mysuru?",
          answer: "इसका विकास विज्ञान एवं प्रौद्योगिकी विभाग (DST) के अधीन कार्यरत इंडियन इंस्टीट्यूट ऑफ एस्ट्रोफिजिक्स (IIA, बेंगलुरु) द्वारा मैसूर विश्वविद्यालय के साथ मिलकर किया गया है।",
          answerEn: "It was developed by the Indian Institute of Astrophysics (IIA, Bengaluru) under the Department of Science and Technology (DST) in partnership with the University of Mysore."
        },
        {
          question: "LED डोम तारामंडल पारंपरिक तारामंडल से कैसे भिन्न है?",
          questionEn: "How does an LED dome planetarium differ from traditional planetariums?",
          answer: "पारंपरिक तारामंडल में प्रोजेक्टर द्वारा स्क्रीन पर प्रकाश फेंका जाता है, जबकि LED डोम में 6,150 मॉड्यूलर LED पैनल्स स्वयं प्रकाश उत्पन्न करते हैं। इससे गहरा काला रंग, अनंत कंट्रास्ट, 8K स्पष्टता और शून्य छाया प्रभाव मिलता है।",
          answerEn: "Traditional planetariums rely on external optical projectors reflecting onto a dome, while LED domes feature self-emissive LED panels delivering infinite contrast and zero projection shadows."
        },
        {
          question: "डोम में कितने LED पैनल्स और व्यक्तिगत LEDs लगी हैं?",
          questionEn: "How many LED panels and individual LEDs are installed in COSMOS-Mysuru?",
          answer: "डोम में लगभग 6,150 मॉड्यूलर LED पैनल्स लगे हैं, जिनमें कुल मिलाकर लगभग 4.2 करोड़ (42 Million) व्यक्तिगत LEDs कार्यरत हैं।",
          answerEn: "The dome incorporates approximately 6,150 modular LED panels housing nearly 4.2 crore (42 million) individual micro/mini LEDs."
        },
        {
          question: "कॉसमॉस-मैसूरु का स्क्रीन रिजॉल्यूशन क्या है?",
          questionEn: "What is the native display resolution of COSMOS-Mysuru?",
          answer: "यह 8K अल्ट्रा-हाई डेफिनिशन (True 8K Resolution - 7680 × 4320 पिक्सल) पर खगोलीय दृश्यों का सजीव एवं इमर्सिव प्रतिपादन करता है।",
          answerEn: "It delivers native True 8K Ultra-High Definition resolution, offering unparalleled cosmic detail and depth."
        },
        {
          question: "डोम को झुका हुआ (Tilted Dome) क्यों बनाया गया है?",
          questionEn: "Why is the dome engineered in a tilted configuration?",
          answer: "15 डिग्री झुका हुआ डोम दर्शकों को बिना सिर या गर्दन उठाए स्वाभाविक दृष्टि रेखा में 360-डिग्री क्षितिज से लेकर शीर्ष तक का दृश्य अनुभव कराने में मदद करता है।",
          answerEn: "The 15-degree tilt aligns with natural human eye ergonomics, allowing comfortable horizon-to-zenith immersive viewing without neck strain."
        },
        {
          question: "क्या कॉसमॉस-मैसूरु में वैज्ञानिक शोध कार्य भी संभव होगा?",
          questionEn: "Will COSMOS-Mysuru support scientific astronomical research?",
          answer: "हाँ, यह भारतीय वेधशालाओं (जैसे हानले लद्दाख, आदित्य-L1) से प्राप्त रीयल-टाइम खगोलीय डेटा और सुपरकंप्यूटर सिमुलेशन को 3D विज़ुअलाइज़ करने के लिए एक शोध मंच के रूप में भी कार्य करेगा।",
          answerEn: "Yes, it functions as a visual analytical platform ingesting raw astronomical data from observatories like Hanle and missions like Aditya-L1 for astrophysical modeling."
        },
        {
          question: "IIA का पूरा नाम क्या है और इसका क्या कार्य है?",
          questionEn: "What is the full form and mandate of IIA?",
          answer: "IIA का पूरा नाम 'Indian Institute of Astrophysics' (भारतीय खगोल भौतिकी संस्थान) है। यह खगोल विज्ञान, सौर भौतिकी, और ऑप्टिकल इंस्ट्रूमेंटेशन में भारत का सर्वोच्च अनुसंधान संस्थान है।",
          answerEn: "IIA stands for Indian Institute of Astrophysics, India's premier national research institution dedicated to astronomy, astrophysics, and space instrumentation."
        },
        {
          question: "MPPSC परीक्षा के किस पेपर में यह विषय शामिल है?",
          questionEn: "In which MPPSC exam papers is this topic relevant?",
          answer: "यह MPPSC प्रारंभिक परीक्षा के पेपर-1 की यूनिट 7 (वैज्ञानिक संस्थान एवं उपलब्धियाँ) तथा मुख्य परीक्षा के पेपर-3 (विज्ञान एवं प्रौद्योगिकी) के लिए प्रत्यक्ष रूप से महत्वपूर्ण है।",
          answerEn: "It is directly aligned with MPPSC Prelims Paper 1 Unit 7 (Scientific Institutions & Achievements) and MPPSC Mains Paper 3 (Science & Technology)."
        },
        {
          question: "क्या LED डोम में परिवेशी प्रकाश (Ambient Light) होने पर भी दृश्य स्पष्ट दिखता है?",
          questionEn: "Can an LED dome operate clearly in the presence of ambient lighting?",
          answer: "हाँ, क्योंकि LED पैनल्स की चमक (Brightness/Luminance) अत्यधिक उच्च होती है, इसलिए पारंपरिक प्रोजेक्टर के विपरीत इसमें हल्की रोशनी होने पर भी तस्वीरें धुंधली नहीं होतीं।",
          answerEn: "Yes, because self-emissive LEDs produce high luminance, maintaining vivid contrast even under subtle ambient lighting."
        }
      ]
    };

    const res = await client.createOrReplace({
      _id: docId,
      ...articlePayload,
    });

    console.log(`✅ Successfully published ${docId} to Sanity CMS!`);
  }

  console.log("🎉 All documents uploaded and synced to Sanity CMS successfully!");
}

main().catch((err) => {
  console.error("❌ Error uploading article:", err);
  process.exit(1);
});

