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
  console.log("🚀 Starting upload process for Vikram-1 Orbital Rocket Current Affairs Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    featured: path.resolve(process.cwd(), "public/images/blog/vikram-1-featured.jpg"),
    stages: path.resolve(process.cwd(), "public/images/blog/vikram-1-stages.png"),
    founders: path.resolve(process.cwd(), "public/images/blog/vikram-1-founders.png"),
    cleanroom: path.resolve(process.cwd(), "public/images/blog/vikram-1-cleanroom.png"),
  };

  // Check if files exist
  if (
    !fs.existsSync(imagePaths.featured) ||
    !fs.existsSync(imagePaths.stages) ||
    !fs.existsSync(imagePaths.founders) ||
    !fs.existsSync(imagePaths.cleanroom)
  ) {
    console.error("❌ Required images not found in public/images/blog/");
    process.exit(1);
  }

  // 1. Upload Featured Image
  console.log("📸 Uploading featured image...");
  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imagePaths.featured), {
    filename: "vikram_1_featured.jpg",
  });
  console.log(`✔ Uploaded featured image. Asset ID: ${assetFeatured._id}`);

  // 2. Upload Stages Image
  console.log("📸 Uploading stages image...");
  const assetStages = await client.assets.upload("image", fs.createReadStream(imagePaths.stages), {
    filename: "vikram_1_stages.png",
  });
  console.log(`✔ Uploaded stages image. Asset ID: ${assetStages._id}`);

  // 3. Upload Founders Image
  console.log("📸 Uploading founders image...");
  const assetFounders = await client.assets.upload("image", fs.createReadStream(imagePaths.founders), {
    filename: "vikram_1_founders.png",
  });
  console.log(`✔ Uploaded founders image. Asset ID: ${assetFounders._id}`);

  // 4. Upload Cleanroom Image
  console.log("📸 Uploading cleanroom image...");
  const assetCleanroom = await client.assets.upload("image", fs.createReadStream(imagePaths.cleanroom), {
    filename: "vikram_1_cleanroom.png",
  });
  console.log(`✔ Uploaded cleanroom image. Asset ID: ${assetCleanroom._id}`);

  // 5. Construct the Article document
  const article = {
    _id: "ca-vikram-1-orbital-rocket",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "vikram-1-orbital-rocket-skyroot" },
    title: "भारत का पहला निजी ऑर्बिटल रॉकेट 'विक्रम-1' : भारत के निजी अंतरिक्ष क्षेत्र की ऐतिहासिक उड़ान",
    titleEn: "Vikram-1: India's First Private Commercial Orbital Rocket by Skyroot Aerospace",
    excerpt: "हैदराबाद स्थित स्काईरूट एयरोस्पेस द्वारा विकसित देश का पहला निजी ऑर्बिटल लॉन्च व्हीकल 'विक्रम-1' सफलतापूर्वक लॉन्च किया गया है। यह छोटे उपग्रहों को लो अर्थ ऑर्बिट (LEO) में स्थापित करने वाला ऐतिहासिक कदम है।",
    excerptEn: "Hyderabad-based Skyroot Aerospace has successfully launched 'Vikram-1', India's first private commercial orbital launch vehicle, marking a historic milestone in India's private space sector and self-reliance.",
    ca_date: "2026-07-18",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 6,
    keywords: [
      "Vikram-1 rocket launch",
      "Skyroot Aerospace",
      "India first private orbital rocket",
      "Mission Agaman",
      "Vikram-S sub-orbital",
      "ISRO private space sector",
      "IN-SPACe",
      "Pawan Kumar Chandna",
      "Naga Bharath Daka",
      "Low Earth Orbit LEO",
      "SpaceTech Unicorn India",
      "विक्रम-1 रॉकेट लॉन्च",
      "स्काईरूट एयरोस्पेस",
      "UPSC Science & Technology",
      "MPPSC Space Tech"
    ],
    category: { _type: "reference", _ref: "cat-scitech" }, // Science & Technology
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-3", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetFeatured._id },
      alt: "Rendering of Vikram-1 private orbital rocket launching into space over planet Earth",
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
            "भारत ने अंतरिक्ष क्षेत्र में एक और ऐतिहासिक उपलब्धि हासिल करते हुए देश का पहला निजी ऑर्बिटल लॉन्च व्हीकल **'विक्रम-1'** सफलतापूर्वक लॉन्च किया। **हैदराबाद** स्थित **स्काईरूट एयरोस्पेस (Skyroot Aerospace)** द्वारा विकसित इस रॉकेट ने **श्रीहरिकोटा** स्थित **इसरो (ISRO)** के लॉन्च पैड से उड़ान भरकर कई टेक्नोलॉजी डेमोंस्ट्रेशन पेलोड को **लो अर्थ ऑर्बिट (LEO)** में स्थापित किया। यह उपलब्धि भारत के निजी अंतरिक्ष उद्योग और **आत्मनिर्भर भारत अभियान** की दिशा में एक महत्वपूर्ण मील का पत्थर है।",
            "• **भारत का पहला निजी ऑर्बिटल रॉकेट**: **'विक्रम-1'** सफलतापूर्वक लॉन्च किया गया।",
            "• **विकासकर्ता**: **Skyroot Aerospace** (हैदराबाद आधारित स्पेसटेक कंपनी)।",
            "• **लॉन्च स्थल**: **सतीश धवन अंतरिक्ष केंद्र (SDSC), श्रीहरिकोटा**।",
            "• **मिशन का नाम**: **Mission Agaman (मिशन आगमन)**।"
          ]),
          createTable(
            "table-vikram-facts-hi",
            "त्वरित तथ्य (Quick Facts)",
            ["विवरण", "जानकारी"],
            [
              ["**भारत का पहला निजी ऑर्बिटल रॉकेट**", "**विक्रम-1**"],
              ["**निर्माता**", "**Skyroot Aerospace**"],
              ["**लॉन्च स्थल**", "**सतीश धवन अंतरिक्ष केंद्र (SDSC), श्रीहरिकोटा**"],
              ["**मिशन का नाम**", "**Mission Agaman**"],
              ["**उद्देश्य**", "**छोटे एवं मध्यम आकार के उपग्रहों को LEO में स्थापित करना**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "Marking a historic moment for India's space industry, the nation's first private commercial orbital launch vehicle, **'Vikram-1'**, was successfully launched. Developed by Hyderabad-based space technology startup **Skyroot Aerospace**, the rocket blasted off from **ISRO's** launchpad in **Sriharikota**, placing multiple technology demonstration payloads into **Low Earth Orbit (LEO)**. This milestone accelerates private participation under the **Atmanirbhar Bharat** initiative.",
            "• **India's First Private Orbital Rocket**: Successful commercial launch of **'Vikram-1'**.",
            "• **Developer**: **Skyroot Aerospace** (Hyderabad).",
            "• **Launch Site**: **Satish Dhawan Space Centre (SDSC), Sriharikota**.",
            "• **Mission Code**: **Mission Agaman**."
          ]),
          createTable(
            "table-vikram-facts-en",
            "Quick Facts",
            ["Parameter", "Details"],
            [
              ["**India's First Private Orbital Rocket**", "**Vikram-1**"],
              ["**Manufacturer**", "**Skyroot Aerospace**"],
              ["**Launch Venue**", "**SDSC, Sriharikota**"],
              ["**Mission Name**", "**Mission Agaman**"],
              ["**Objective**", "**Deploying small and medium satellites into LEO**"]
            ]
          )
        ],
      },

      /* ── 2. What is Vikram-1 & Specs ────────────────────────── */
      {
        _key: "sec-what-is-vikram-1",
        kind: "background",
        title: "विक्रम-1 क्या है और इसकी विशेषताएँ?",
        titleEn: "What is Vikram-1? Specifications & Capacity",
        body: [
          ...createBlocks([
            "• **पहचान**: **विक्रम-1** भारत का पहला **Private Commercial Orbital Launch Vehicle** (निजी व्यावसायिक कक्षीय प्रक्षेपण यान) है।",
            "• **उद्देश्य**: इसे छोटे एवं मध्यम आकार के उपग्रहों (**Small Satellites**) को **पृथ्वी की निचली कक्षा (Low Earth Orbit - LEO)** में स्थापित करने के लिए विशेष रूप से डिज़ाइन किया गया है।",
            "• **नामकरण**: इस रॉकेट का नाम भारतीय अंतरिक्ष कार्यक्रम के जनक महान वैज्ञानिक **डॉ. विक्रम साराभाई** के सम्मान में रखा गया है।"
          ]),
          createTable(
            "table-vikram-specs-hi",
            "विक्रम-1 की प्रमुख विशेषताएँ (Key Specifications)",
            ["विवरण", "जानकारी"],
            [
              ["**स्थापना वर्ष (Skyroot)**", "**2018**"],
              ["**मुख्यालय**", "**हैदराबाद**"],
              ["**ऊँचाई**", "**लगभग 20 मीटर**"],
              ["**कुल वजन**", "**लगभग 40 टन**"],
              ["**व्यास**", "**1.7 मीटर**"],
              ["**अधिकतम गति**", "**लगभग 8 किमी/सेकंड**"],
              ["**थ्रस्ट क्षमता**", "**1200 kN (Kilo Newton)**"],
              ["**LEO पेलोड क्षमता (वर्तमान)**", "**350 किलोग्राम**"],
              ["**LEO पेलोड क्षमता (अधिकतम)**", "**500 किलोग्राम**"],
              ["**SSO पेलोड क्षमता**", "**लगभग 260 किलोग्राम**"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "• **Definition**: **Vikram-1** is India's first multi-stage, private commercial orbital launch vehicle.",
            "• **Core Objective**: Built to offer affordable and on-demand launch services for small and medium-sized satellites into **Low Earth Orbit (LEO)**.",
            "• **Namesake**: Named in honor of the father of the Indian space program, **Dr. Vikram Sarabhai**."
          ]),
          createTable(
            "table-vikram-specs-en",
            "Vikram-1 Specifications & Capacity",
            ["Parameter", "Details"],
            [
              ["**Developer Founded**", "**2018 (Skyroot)**"],
              ["**Headquarters**", "**Hyderabad**"],
              ["**Height**", "**~20 meters**"],
              ["**Total Lift-off Mass**", "**~40 tonnes**"],
              ["**Diameter**", "**1.7 meters**"],
              ["**Peak Velocity**", "**~8 km/second**"],
              ["**Total Thrust**", "**1200 kN**"],
              ["**LEO Capacity (Current Mission)**", "**350 kg**"],
              ["**LEO Capacity (Maximum)**", "**500 kg**"],
              ["**SSO Capacity**", "**~260 kg**"]
            ]
          )
        ],
      },

      /* ── 3. Advanced Technology ────────────────────────────── */
      {
        _key: "sec-tech",
        kind: "keyHighlights",
        title: "विक्रम-1 की आधुनिक तकनीक",
        titleEn: "Advanced Technologies of Vikram-1",
        body: [
          ...createBlocks([
            "विक्रम-1 में अत्याधुनिक एरोस्पेस तकनीक का प्रयोग किया गया है जो इसे लागत प्रभावी और हल्का बनाती है:",
            "### 1. 3D Printed Liquid Engine",
            "• **वजन**: पारंपरिक रूप से बने इंजनों से यह लगभग **50% हल्का** है।",
            "• **लाभ**: विनिर्माण समय एवं निर्माण लागत को बेहद कम करता है।",
            "### 2. Carbon Composite Structure (कार्बन कम्पोजिट संरचना)",
            "• **संरचना**: रॉकेट का ढांचा पूर्णतः हल्के और अत्यधिक मजबूत कार्बन फाइबर कंपोजिट से बना है।",
            "• **लाभ**: यान का वजन कम करके ईंधन दक्षता को कई गुना बढ़ा देता है।",
            "### 3. Solid Fuel Booster (ठोस ईंधन बूस्टर)",
            "• **विशेषता**: उच्च प्रदर्शन क्षमता वाला कार्बन फाइबर-आधारित ठोस रॉकेट मोटर जो शुरुआती थ्रस्ट प्रदान करता है।"
          ]),
          {
            _key: "b3-img-stages",
            _type: "image",
            asset: { _type: "reference", _ref: assetStages._id },
            alt: "Modular stages of Vikram-1 rocket placed on yellow support frames in cleanroom",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "Vikram-1 incorporates cutting-edge materials and manufacturing processes to ensure reliability and low cost:",
            "### 1. 3D Printed Liquid Engines",
            "• **Weight**: Nearly **50% lighter** than conventionally manufactured rocket engines.",
            "• **Advantage**: Saves production time, reduces costs, and simplifies components.",
            "### 2. Carbon Composite Airframe",
            "• **Material**: The entire fuselage/body structure is made of advanced carbon fiber composites.",
            "• **Advantage**: Provides high strength-to-weight ratio, optimizing fuel efficiency.",
            "### 3. High-Performance Solid Propulsion",
            "• **Boosters**: Solid fuel boosters constructed using carbon-composite casings to supply reliable initial thrust."
          ]),
          {
            _key: "b3-img-stages-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetStages._id },
            alt: "Modular stages of Vikram-1 rocket placed on yellow support frames in cleanroom",
          }
        ],
      },

      /* ── 4. Payloads & Mission ───────────────────────────────── */
      {
        _key: "sec-payloads",
        kind: "keyAspects",
        title: "मिशन आगमन एवं भेजे गए पेलोड",
        titleEn: "Mission Agaman & Payload Deployments",
        body: createBlocks([
          "• **कुल पेलोड**: 'मिशन आगमन' के तहत कुल **6 पेलोड** को सफलतापूर्वक लो अर्थ ऑर्बिट में स्थापित किया गया।",
          "• **भारतीय पेलोड्स**: भारत के विभिन्न संस्थानों और स्टार्टअप द्वारा निर्मित **5 टेक्नोलॉजी डेमोंस्ट्रेशन पेलोड**।",
          "• **अंतरराष्ट्रीय पेलोड**: जर्मनी की **DQBED GmbH** का **1 पेलोड**।",
          "• **विशेष पेलोड**: इस मिशन में प्रधानमंत्री नरेंद्र मोदी का एक **डिजिटल पोस्टकार्ड** भी अंतरिक्ष में भेजा गया, जो देश की डिजिटल क्रांति का प्रतीक है।"
        ]),
        bodyEn: createBlocks([
          "• **Total Payloads**: A total of **6 payloads** were successfully deployed into orbit under 'Mission Agaman'.",
          "• **Indian Payloads**: **5 technology demonstration payloads** built by domestic academic institutions and tech startups.",
          "• **International Payload**: **1 payload** belonging to Germany's **DQBED GmbH**.",
          "• **Special Payload**: A **digital postcard** featuring Prime Minister Narendra Modi was launched, celebrating India's space reforms."
        ]),
      },

      /* ── 5. About Skyroot & Infinity Campus ──────────────────── */
      {
        _key: "sec-skyroot-about",
        kind: "importance",
        title: "स्काईरूट एयरोस्पेस (Skyroot Aerospace) एवं इन्फिनिटी कैंपस",
        titleEn: "About Skyroot Aerospace & Infinity Campus",
        body: [
          ...createBlocks([
            "• **स्थापना**: वर्ष **2018**।",
            "• **संस्थापक**: **पवन कुमार चंदना** एवं **नागा भरत डाका** (दोनों भारतीय अंतरिक्ष अनुसंधान संगठन - **ISRO** के पूर्व वैज्ञानिक रहे हैं)।",
            "• **इन्फिनिटी कैंपस (Infinity Campus)**: हैदराबाद में स्थित स्काईरूट का यह एकीकृत मुख्यालय लगभग **2 लाख वर्ग फुट** में फैला हुआ है। इसका उद्घाटन वर्ष **2025** में किया गया था। यहाँ रॉकेट का डिजाइन, असेंबली और परीक्षण एक ही स्थान पर किया जाता है।",
            "• **निजी स्पेसटेक यूनिकॉर्न**: स्काईरूट एयरोस्पेस **वर्ष 2026** में भारत की **पहली निजी स्पेसटेक यूनिकॉर्न (SpaceTech Unicorn)** कंपनी बन गई।"
          ]),
          {
            _key: "b5-img-cleanroom",
            _type: "image",
            asset: { _type: "reference", _ref: assetCleanroom._id },
            alt: "Skyroot founders Pawan Kumar Chandna and Naga Bharath Daka standing in traditional attire in front of Vikram-1 rocket",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "• **Founding**: Established in **2018** in Hyderabad.",
            "• **Founders**: **Pawan Kumar Chandna** and **Naga Bharath Daka** (both former **ISRO** scientists).",
            "• **Infinity Campus**: Skyroot's mega integrated aerospace facility in Hyderabad, spread across **200,000 square feet**, inaugurated in **2025**. It houses design, manufacturing, assembly, and testing lines under one roof.",
            "• **SpaceTech Unicorn**: In **2026**, Skyroot Aerospace became India's **first private SpaceTech Unicorn** after securing major venture funding."
          ]),
          {
            _key: "b5-img-cleanroom-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetCleanroom._id },
            alt: "Skyroot founders Pawan Kumar Chandna and Naga Bharath Daka standing in traditional attire in front of Vikram-1 rocket",
          }
        ],
      },

      /* ── 6. Vikram-S vs Vikram-1 & Vikram-2 ──────────────────── */
      {
        _key: "sec-vikram-s-vs-1",
        kind: "importance",
        title: "विक्रम-एस (Vikram-S) और विक्रम-1 में अंतर",
        titleEn: "Vikram-S vs Vikram-1 & Future Roadmap",
        body: [
          ...createBlocks([
            "• **विक्रम-एस (Vikram-S)**:",
            "  - **18 नवंबर 2022** को सफलतापूर्वक लॉन्च।",
            "  - **पहला कदम**: यह भारत का **पहला निजी सब-ऑर्बिटल रॉकेट (Sub-Orbital Rocket)** था।",
            "  - **मिशन**: **Mission Prarambh (मिशन प्रारंभ)**।",
            "  - **प्रदर्शन**: इसने **88.8 किमी** की ऊँचाई हासिल की और 3 पेलोड को अंतरिक्ष की दहलीज तक ले गया।",
            "• **विक्रम-2 (Vikram-2)**: स्काईरूट ने घोषणा की है कि अधिक क्षमता वाले **विक्रम-2** रॉकेट का प्रक्षेपण **वर्ष 2027** में किया जाएगा। यह LEO में **900 किलोग्राम** और SSO में **600 किलोग्राम** पेलोड भेजने में सक्षम होगा।"
          ]),
          createTable(
            "table-vikram-vs-hi",
            "विक्रम-एस बनाम विक्रम-1 (Difference)",
            ["विवरण", "विक्रम-एस", "विक्रम-1"],
            [
              ["**रॉकेट प्रकार**", "**Sub-Orbital Rocket**", "**Orbital Rocket**"],
              ["**मिशन का नाम**", "**Mission Prarambh**", "**Mission Agaman**"],
              ["**पेलोड संख्या**", "**3 पेलोड**", "**6 पेलोड**"],
              ["**मुख्य लक्ष्य**", "**परीक्षण एवं सब-ऑर्बिटल उड़ान**", "**LEO में उपग्रहों को स्थापित करना (व्यावसायिक)**"]
            ]
          ),
          {
            _key: "b6-img-founders",
            _type: "image",
            asset: { _type: "reference", _ref: assetFounders._id },
            alt: "Pawan Chandna and Naga Bharath Daka standing in front of Vikram-1 split nose cone",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "• **Vikram-S (Sub-orbital)**:",
            "  - Launched on **November 18, 2022**.",
            "  - **Milestone**: India's **first private sub-orbital rocket** launch.",
            "  - **Mission Code**: **Mission Prarambh**.",
            "  - **Result**: Reached an apogee of **88.8 km** to test and validate technology.",
            "• **Vikram-2 (Future)**: Slated for launch in **2027**, Vikram-2 is designed to lift up to **900 kg** to LEO and **600 kg** to Sun-Synchronous Orbit (SSO)."
          ]),
          createTable(
            "table-vikram-vs-en",
            "Vikram-S vs. Vikram-1 Comparison",
            ["Parameter", "Vikram-S", "Vikram-1"],
            [
              ["**Flight Category**", "**Sub-Orbital Rocket**", "**Orbital Rocket**"],
              ["**Mission Title**", "**Mission Prarambh**", "**Mission Agaman**"],
              ["**No. of Payloads**", "**3 Payloads**", "**6 Payloads**"],
              ["**Core Achievement**", "**Validated key engines at 88.8 km**", "**Successfully placed satellites in LEO**"]
            ]
          ),
          {
            _key: "b6-img-founders-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetFounders._id },
            alt: "Pawan Chandna and Naga Bharath Daka standing in front of Vikram-1 split nose cone",
          }
        ],
      },

      /* ── 7. Orbits & Private Space Reform ────────────────────── */
      {
        _key: "sec-orbits-reforms",
        kind: "keyAspects",
        title: "अंतरिक्ष कक्षाएँ एवं भारत का निजी अंतरिक्ष सुधार",
        titleEn: "Space Orbits & India's Private Space Sector Reforms",
        body: createBlocks([
          "### 1. लो अर्थ ऑर्बिट (Low Earth Orbit - LEO)",
          "• **परिभाषा**: पृथ्वी की सतह से लगभग **160 से 2000 किमी** की ऊँचाई पर स्थित कक्षा।",
          "• **उपयोग**: यहाँ मुख्य रूप से मौसम पूर्वानुमान, संचार, मैपिंग और रिमोट सेंसिंग उपग्रह तथा अंतर्राष्ट्रीय अंतरिक्ष स्टेशन (ISS) स्थापित किए जाते हैं।",
          "### 2. सन सिंक्रोनस ऑर्बिट (Sun Synchronous Orbit - SSO)",
          "• **परिभाषा**: यह एक विशेष ध्रुवीय कक्षा (Polar Orbit) है, जिसमें उपग्रह पृथ्वी के चारों ओर चक्कर लगाते समय सूर्य के साथ एक निश्चित कोण बनाए रखता है। यह पृथ्वी के अवलोकन और छायाचित्रण के लिए सबसे उत्तम मानी जाती है।",
          "### 3. नियामक ढांचा - IN-SPACe",
          "• **IN-SPACe (Indian National Space Promotion and Authorization Centre)**: इसकी स्थापना **वर्ष 2020** में की गई।",
          "• **कार्य**: यह अंतरिक्ष विभाग (DoS) के तहत एक एकल खिड़की नोडल एजेंसी है, जो गैर-सरकारी निजी संस्थाओं (NGPEs) को अंतरिक्ष गतिविधियों की अनुमति देती है।",
          "• **NSIL (NewSpace India Limited)**: इसरो (ISRO) की व्यावसायिक शाखा है, जो निजी भागीदारी और तकनीक हस्तांतरण का समन्वय करती है।"
        ]),
        bodyEn: createBlocks([
          "### 1. Low Earth Orbit (LEO)",
          "• **Definition**: An orbit extending from **160 km to 2,000 km** above the Earth's surface.",
          "• **Application**: Ideal for Earth-imaging, remote sensing, weather monitoring, telecommunications, and space stations.",
          "### 2. Sun-Synchronous Orbit (SSO)",
          "• **Definition**: A polar orbit in which a satellite passes over any given point of the Earth's surface at the same local solar time. Preferred for mapping and environmental tracking.",
          "### 3. Space Reforms & IN-SPACe",
          "• **IN-SPACe**: Established in **2020** as a single-window nodal agency under the Department of Space to license and promote private players.",
          "• **NSIL**: The commercial wing of ISRO, focused on marketing launch vehicles, technology transfers, and private sector onboarding."
        ]),
      },

      /* ── 8. Exam POV ─────────────────────────────────────────── */
      {
        _key: "sec-exam-pov",
        kind: "factsAtAGlance",
        title: "परीक्षा दृष्टिकोण (Exam POV)",
        titleEn: "Exam Perspective & Revision Highlights",
        body: createBlocks([
          "### याद रखने योग्य महत्वपूर्ण तथ्य (Quick Revision)",
          "• **पहला निजी ऑर्बिटल रॉकेट** → **विक्रम-1** (Mission Agaman)",
          "• **पहला निजी सब-ऑर्बिटल रॉकेट** → **विक्रम-S** (Mission Prarambh)",
          "• **निर्माता व विकासकर्ता** → **Skyroot Aerospace** (हैदराबाद)",
          "• **निजी स्पेस सेक्टर का नियामक** → **IN-SPACe** (स्थापना: 2020)",
          "• **संस्थापक (Skyroot)** → पवन कुमार चंदना और नागा भरत डाका (पूर्व ISRO वैज्ञानिक)",
          "• **प्रथम निजी स्पेसटेक यूनिकॉर्न** → स्काईरूट एयरोस्पेस (2026)",
          "• **रोडमैप** → **विक्रम-2** का प्रक्षेपण वर्ष 2027 में प्रस्तावित है।",
          "### महत्वपूर्ण फुल फॉर्म (Full Forms)",
          "• **ISRO**: **Indian Space Research Organisation**",
          "• **LEO**: **Low Earth Orbit**",
          "• **SSO**: **Sun Synchronous Orbit**",
          "• **IN-SPACe**: **Indian National Space Promotion and Authorization Centre**",
          "• **NSIL**: **NewSpace India Limited**",
          "• **kN**: **Kilo Newton**",
          "### मुख्य परीक्षा उत्तर-लेखन (One-Liner Capsule)",
          "**\"विक्रम-1 भारत का पहला निजी रूप से विकसित ऑर्बिटल लॉन्च व्हीकल है, जिसे स्काईरूट एयरोस्पेस ने विकसित किया है। यह छोटे उपग्रहों को लो अर्थ ऑर्बिट (LEO) में स्थापित करने हेतु डिज़ाइन किया गया है और भारत के निजी अंतरिक्ष क्षेत्र के विकास में एक ऐतिहासिक उपलब्धि माना जाता है।\"**"
        ]),
        bodyEn: createBlocks([
          "### Key Facts to Remember (Quick Revision)",
          "• **First Private Orbital Rocket** → **Vikram-1** (Mission Agaman)",
          "• **First Private Sub-Orbital Rocket** → **Vikram-S** (Mission Prarambh)",
          "• **Developer Company** → **Skyroot Aerospace** (Hyderabad)",
          "• **Private Space Regulator** → **IN-SPACe** (Established in 2020)",
          "• **Founders** → Pawan Kumar Chandna & Naga Bharath Daka (ex-ISRO)",
          "• **First SpaceTech Unicorn** → Skyroot Aerospace (2026)",
          "• **Roadmap** → **Vikram-2** scheduled for 2027.",
          "### Crucial Abbreviations",
          "• **ISRO**: **Indian Space Research Organisation**",
          "• **LEO**: **Low Earth Orbit**",
          "• **SSO**: **Sun Synchronous Orbit**",
          "• **IN-SPACe**: **Indian National Space Promotion and Authorization Centre**",
          "• **NSIL**: **NewSpace India Limited**",
          "• **kN**: **Kilo Newton**",
          "### Mains Answer Booster Capsule",
          "**\"Vikram-1 is India's first privately developed orbital launch vehicle, designed by Skyroot Aerospace to place light satellites in Low Earth Orbit (LEO). This success signals the maturity of India's private space industry and demonstrates solid technology commercialization.\"**"
        ]),
      }
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "भारत का पहला निजी ऑर्बिटल लॉन्च व्हीकल कौन-सा है?",
        questionEn: "Which is India's first private commercial orbital launch vehicle?",
        options: ["SSLV", "PSLV", "विक्रम-1", "GSLV"],
        optionsEn: ["SSLV", "PSLV", "Vikram-1", "GSLV"],
        correctIndex: 2,
        explanation: "विक्रम-1 भारत का पहला निजी व्यावसायिक ऑर्बिटल लॉन्च व्हीकल है, जो उपग्रहों को लो अर्थ ऑर्बिट (LEO) में स्थापित कर सकता है।",
        explanationEn: "Vikram-1 is India's first private commercial orbital launch vehicle, capable of deploying satellites into Low Earth Orbit."
      },
      {
        question: "विक्रम-1 का निर्माण किस कंपनी ने किया है?",
        questionEn: "Which company has manufactured the Vikram-1 rocket?",
        options: ["HAL", "BEL", "Skyroot Aerospace", "DRDO"],
        optionsEn: ["HAL", "BEL", "Skyroot Aerospace", "DRDO"],
        correctIndex: 2,
        explanation: "विक्रम-1 रॉकेट का निर्माण और विकास हैदराबाद स्थित निजी क्षेत्र की कंपनी स्काईरूट एयरोस्पेस (Skyroot Aerospace) द्वारा किया गया है।",
        explanationEn: "Vikram-1 was built and developed by Skyroot Aerospace, a Hyderabad-based private space technology company."
      },
      {
        question: "IN-SPACe की स्थापना किस वर्ष की गई थी?",
        questionEn: "In which year was IN-SPACe established to facilitate private space participation?",
        options: ["2018", "2019", "2020", "2022"],
        optionsEn: ["2018", "2019", "2020", "2022"],
        correctIndex: 2,
        explanation: "भारत सरकार ने निजी कंपनियों को अंतरिक्ष क्षेत्र में विनियमित और बढ़ावा देने के लिए वर्ष 2020 में IN-SPACe की स्थापना की थी।",
        explanationEn: "The Government of India established IN-SPACe in 2020 to promote and authorize private space sector activities."
      },
      {
        question: "विक्रम-1 रॉकेट के संबंध में निम्नलिखित में से कौन-सा कथन सत्य है/हैं?",
        questionEn: "Which of the following statements is/are true regarding the Vikram-1 rocket?",
        options: [
          "यह एक सब-ऑर्बिटल रॉकेट है।",
          "इसमें 3D प्रिंटेड लिक्विड इंजन का उपयोग किया गया है।",
          "इसकी अधिकतम LEO पेलोड क्षमता 1000 किलोग्राम है।",
          "उपर्युक्त सभी कथन सत्य हैं।"
        ],
        optionsEn: [
          "It is a sub-orbital rocket.",
          "It features a 3D-printed liquid engine.",
          "Its maximum payload capacity to LEO is 1000 kg.",
          "All of the above statements are true."
        ],
        correctIndex: 1,
        explanation: "विक्रम-1 एक ऑर्बिटल रॉकेट है जिसमें 3D प्रिंटेड लिक्विड इंजन का उपयोग हुआ है। इसकी अधिकतम LEO क्षमता 500 किग्रा है (न कि 1000 किग्रा)।",
        explanationEn: "Vikram-1 is an orbital rocket featuring a 3D printed liquid engine. Its maximum payload capacity to LEO is 500 kg (not 1000 kg)."
      },
      {
        question: "भारत का पहला निजी सब-ऑर्बिटल रॉकेट 'विक्रम-एस' (Vikram-S) किस मिशन के तहत लॉन्च किया गया था?",
        questionEn: "Under which mission was India's first private sub-orbital rocket 'Vikram-S' launched?",
        options: ["Mission Agaman", "Mission Prarambh", "Mission Gaganyaan", "Mission Agnikool"],
        optionsEn: ["Mission Agaman", "Mission Prarambh", "Mission Gaganyaan", "Mission Agnikool"],
        correctIndex: 1,
        explanation: "विक्रम-एस (Vikram-S) को 18 नवंबर 2022 को 'मिशन प्रारंभ' (Mission Prarambh) के तहत सफलतापूर्वक सब-ऑर्बिटल टेस्ट के लिए लॉन्च किया गया था।",
        explanationEn: "Vikram-S was launched for a sub-orbital test under 'Mission Prarambh' on November 18, 2022."
      },
      {
        question: "स्काईरूट एयरोस्पेस के संस्थापकों में शामिल पवन कुमार चंदना और नागा भरत डाका पूर्व में किस संस्थान के वैज्ञानिक थे?",
        questionEn: "Founders of Skyroot Aerospace, Pawan Kumar Chandna and Naga Bharath Daka, were former scientists of which organization?",
        options: ["DRDO", "ISRO", "HAL", "BARC"],
        optionsEn: ["DRDO", "ISRO", "HAL", "BARC"],
        correctIndex: 1,
        explanation: "स्काईरूट एयरोस्पेस के संस्थापक पवन कुमार चंदना और नागा भरत डाका दोनों भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) के पूर्व वैज्ञानिक हैं।",
        explanationEn: "Both founders of Skyroot Aerospace are former scientists of the Indian Space Research Organisation (ISRO)."
      },
      {
        question: "लो अर्थ ऑर्बिट (LEO) पृथ्वी की सतह से लगभग कितनी ऊँचाई तक स्थित कक्षा को माना जाता है?",
        questionEn: "Low Earth Orbit (LEO) is situated at what altitude range from the Earth's surface?",
        options: ["50–100 किमी", "160–2000 किमी", "36000 किमी", "20000–35000 किमी"],
        optionsEn: ["50–100 km", "160–2000 km", "36000 km", "20000–35000 km"],
        correctIndex: 1,
        explanation: "लो अर्थ ऑर्बिट (LEO) पृथ्वी की सतह से लगभग 160 किमी से 2000 किमी तक की ऊँचाई को कहते हैं, जहाँ उपग्रह स्थापित किए जाते हैं।",
        explanationEn: "Low Earth Orbit (LEO) is generally defined as the altitude range between 160 km and 2,000 km above the Earth's surface."
      },
      {
        question: "स्काईरूट एयरोस्पेस भारत की पहली निजी स्पेसटेक यूनिकॉर्न किस वर्ष में बनी?",
        questionEn: "In which year did Skyroot Aerospace become India's first private SpaceTech Unicorn?",
        options: ["2022", "2024", "2025", "2026"],
        optionsEn: ["2022", "2024", "2025", "2026"],
        correctIndex: 3,
        explanation: "स्काईरूट एयरोस्पेस वर्ष 2026 में $1 बिलियन से अधिक मूल्यांकन (Valuation) हासिल कर भारत की पहली स्पेसटेक यूनिकॉर्न बनी।",
        explanationEn: "Skyroot Aerospace achieved a valuation of over $1 billion in 2026, becoming India's first SpaceTech Unicorn."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "भारत का पहला निजी ऑर्बिटल लॉन्च व्हीकल कौन-सा है?",
        questionEn: "Which is India's first private orbital launch vehicle?",
        answer: "भारत का पहला निजी ऑर्बिटल लॉन्च व्हीकल 'विक्रम-1' (Vikram-1) है, जिसे हैदराबाद के स्काईरूट एयरोस्पेस ने विकसित किया है।",
        answerEn: "Vikram-1 is India's first private orbital launch vehicle, developed by Hyderabad-based Skyroot Aerospace."
      },
      {
        question: "विक्रम-1 और विक्रम-एस में मुख्य अंतर क्या है?",
        questionEn: "What is the main difference between Vikram-1 and Vikram-S?",
        answer: "विक्रम-एस एक सब-ऑर्बिटल रॉकेट था (जो अंतरिक्ष सीमा छूकर लौटा था), जबकि विक्रम-1 एक ऑर्बिटल रॉकेट है जो उपग्रहों को लो अर्थ ऑर्बिट (LEO) में स्थापित करने की क्षमता रखता है।",
        answerEn: "Vikram-S was a sub-orbital test rocket (which did not enter orbit), whereas Vikram-1 is an orbital rocket designed to deploy payloads into Low Earth Orbit (LEO)."
      },
      {
        question: "IN-SPACe की स्थापना कब हुई और इसका क्या कार्य है?",
        questionEn: "When was IN-SPACe established and what is its role?",
        answer: "IN-SPACe की स्थापना 2020 में की गई थी। यह अंतरिक्ष विभाग के अधीन काम करने वाली नोडल एजेंसी है, जो निजी क्षेत्र के अंतरिक्ष उपक्रमों को अनुमति एवं सुविधा प्रदान करती है।",
        answerEn: "IN-SPACe was established in 2020 under the Department of Space to act as a single-window regulator and facilitator for private players."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Skyroot Aerospace Official Portal", url: "https://skyroot.in" },
      { label: "Indian Space Research Organisation (ISRO)", url: "https://isro.gov.in" },
      { label: "IN-SPACe India Portal", url: "https://inspace.gov.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Vikram-1 Orbital Rocket Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
