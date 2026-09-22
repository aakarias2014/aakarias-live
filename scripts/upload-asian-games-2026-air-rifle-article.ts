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

function cleanText(str: string): string {
  if (!str) return "";
  return str.replace(/[\u200B-\u200D\u200E\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u00AD\u2000-\u200A]/g, "").trim();
}

// Helper to convert array of strings to Portable Text blocks
function createBlocks(items: string[]): any[] {
  return items.map((rawText, idx) => {
    const text = cleanText(rawText);
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

// Helper to create table block
function createTable(key: string, caption: string, headers: string[], rows: string[][]): any {
  const cleanedHeaders = headers.map(cleanText);
  const cleanedRows = rows.map((r) => r.map(cleanText));
  return {
    _key: key,
    _type: "table",
    table: {
      caption: cleanText(caption),
      headers: cleanedHeaders,
      rows: cleanedRows,
    },
  };
}

async function uploadImageAsset(filePath: string, filename: string) {
  console.log(`📸 Uploading image ${filename}...`);
  const imageStream = fs.createReadStream(filePath);
  const asset = await client.assets.upload("image", imageStream, {
    filename,
  });
  console.log(`✔ Uploaded ${filename}. Asset ID: ${asset._id}`);
  return asset._id;
}

async function main() {
  console.log("🚀 Starting upload process for Asian Games 2026 Air Rifle Shooting Article...");

  // 1. Ensure Default Author
  let authorId = "author-aakar-ias-team";
  const existingAuthor = await client.getDocument(authorId);
  if (!existingAuthor) {
    console.log("📝 Creating default author: Aakar IAS Team...");
    await client.createIfNotExists({
      _id: authorId,
      _type: "author",
      name: "Aakar IAS Team",
      role: "Senior Editorial & Subject Specialist",
      bio: "Chief Editor specializing in MPPSC & UPSC Current Affairs, Polity, Science & Sports Awareness.",
    });
  }

  // 2. Ensure Sports Tag
  let sportsTagId = "tag-sports";
  const existingSportsTag = await client.getDocument(sportsTagId);
  if (!existingSportsTag) {
    console.log("📌 Creating tag: Sports & Athletics...");
    await client.createIfNotExists({
      _id: sportsTagId,
      _type: "tag",
      name: "खेल एवं खेलकूद (Sports)",
      nameEn: "Sports & Games",
      slug: { _type: "slug", current: "sports" },
    });
  }

  // 3. Ensure MPPSC Tag
  let mppscTagId = "tag-mppsc";
  const existingMppscTag = await client.getDocument(mppscTagId);
  if (!existingMppscTag) {
    await client.createIfNotExists({
      _id: mppscTagId,
      _type: "tag",
      name: "MPPSC",
      nameEn: "MPPSC Exam",
      slug: { _type: "slug", current: "mppsc" },
    });
  }

  // 4. Ensure UPSC Tag
  let upscTagId = "tag-upsc";
  const existingUpscTag = await client.getDocument(upscTagId);
  if (!existingUpscTag) {
    await client.createIfNotExists({
      _id: upscTagId,
      _type: "tag",
      name: "UPSC",
      nameEn: "UPSC Exam",
      slug: { _type: "slug", current: "upsc" },
    });
  }

  // 5. Upload Images
  const imgPathFeatured = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3ff0c53-d00f-4d3d-a759-669ae0e099de/asian_games_2026_air_rifle_featured_1790072758506.jpg";
  const imgPathAction = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3ff0c53-d00f-4d3d-a759-669ae0e099de/himanshu_rudrankksh_air_rifle_action_1790072792507.jpg";
  const imgPathInfographic = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3ff0c53-d00f-4d3d-a759-669ae0e099de/asian_games_history_infographic_1790072865005.jpg";

  const featuredAssetId = await uploadImageAsset(imgPathFeatured, "asian_games_2026_air_rifle_featured.jpg");
  const actionAssetId = await uploadImageAsset(imgPathAction, "himanshu_rudrankksh_air_rifle_action.jpg");
  const infographicAssetId = await uploadImageAsset(imgPathInfographic, "asian_games_history_infographic.jpg");

  const featuredImageObj = {
    _type: "image",
    asset: { _type: "reference", _ref: featuredAssetId },
    alt: "एशियन गेम्स 2026: 10 मीटर एयर राइफल में भारत का शानदार प्रदर्शन - टीम सिल्वर और 2 व्यक्तिगत पदक",
    caption: "चित्र: एशियन गेम्स 2026 (आइची-नागोया, जापान) में पुरुषों की 10 मीटर एयर राइफल टीम स्पर्धा में सिल्वर मेडल (1890.1 अंक) जीतने वाली भारतीय त्रयी हिमांशु ढिल्लों, रुद्राक्ष पाटिल और पार्थ माने।",
  };

  const actionImageBlock = {
    _key: "img-block-shooting-action",
    _type: "image",
    asset: { _type: "reference", _ref: actionAssetId },
    alt: "10 मीटर एयर राइफल निशानेबाजी स्पर्धा में भारतीय निशानेबाज का अचूक निशाना",
    caption: "चित्र: 10 मीटर एयर राइफल रेंज पर अपनी तकनीकी एकाग्रता और सटीक निशाने का प्रदर्शन करता भारतीय निशानेबाज।",
  };

  const infographicImageBlock = {
    _key: "img-block-asian-games-timeline",
    _type: "image",
    asset: { _type: "reference", _ref: infographicAssetId },
    alt: "एशियन गेम्स (Asian Games) का इतिहास एवं भावी आयोजन स्थल (1951 नई दिल्ली से 2034 रियाद)",
    caption: "चित्र: ओलंपिक काउंसिल ऑफ एशिया (OCA) के तत्वावधान में आयोजित एशियन गेम्स के प्रमुख संस्करणों और मेज़बान शहरों का विहंगम दृश्य।",
  };

  // Section 0: Shooting Overview & Medal Details
  const sec0Overview = {
    _key: "sec-0-shooting-overview",
    kind: "whyInNews",
    title: "एशियन गेम्स 2026: पुरुषों की 10 मीटर एयर राइफल में भारत का स्वर्णिम प्रदर्शन",
    titleEn: "Asian Games 2026: India's Stellar Shooting Performance in Men's 10m Air Rifle",
    body: [
      ...createBlocks([
        "### एशियन गेम्स 2026 में निशानेबाजी की ऐतिहासिक सफलता",
        "• **ऐतिहासिक सफलता**: आइची-नागोया, जापान में आयोजित **एशियन गेम्स 2026** (20th Asian Games) में भारतीय निशानेबाजों ने पुरुषों की **10 मीटर एयर राइफल (10m Air Rifle)** स्पर्धाओं में असाधारण कौशल दिखाते हुए देश को गौरवान्वित किया।",
        "• **टीम स्पर्धा में सिल्वर मेडल**: भारतीय त्रयी **हिमांशु ढिल्लों (Himanshu Dhillon)**, **रुद्राक्ष पाटिल (Rudrankksh Patil)** और **पार्थ माने (Parth Mane)** ने कुल **1890.1 अंक** हासिल कर रजत पदक (**Silver Medal**) अपने नाम किया।",
        "• **टीम स्पर्धा पदक तालिका**: चीन ने **1899.0 अंक** के साथ गोल्ड मेडल और दक्षिण कोरिया ने **1884.2 अंक** के साथ ब्रॉन्ज मेडल जीता।",
        "• **हालिया स्पोर्ट्स नोट्स का संदर्भ**: आप हमारी पिछली [अरिहा पंगमबम एशियन जिम्नास्टिक गोल्ड मेडल नोट्स](/current-affairs/ariha-pangambam-asian-aerobic-gymnastics-championship-gold-medal) की तरह इस लेख को भी MPPSC परीक्षा के दृष्टिकोण से ज़रूर पढ़ें।",
        "### व्यक्तिगत स्पर्धा में दो भारतीय पदकों की गूँज",
        "• **हिमांशु ढिल्लों का सिल्वर मेडल**: अपने पहले एशियन गेम्स (Debut Asian Games) में भाग ले रहे **हिमांशु ढिल्लों** ने फाइनल में शानदार प्रदर्शन करते हुए **रजत पदक (Silver Medal)** हासिल किया।",
        "• **रुद्राक्ष पाटिल का कांस्य पदक**: 2022 के 10 मीटर एयर राइफल वर्ल्ड चैंपियन रह चुके दिग्गज भारतीय निशानेबाज **रुद्राक्ष पाटिल** ने व्यक्तिगत स्पर्धा में **कांस्य पदक (Bronze Medal)** जीता।",
        "• **स्वर्ण पदक विजेता**: चीन के स्टार निशानेबाज **शेंग लिहाओ (Sheng Lihao)** ने व्यक्तिगत स्पर्धा का **गोल्ड मेडल** अपने नाम किया।"
      ]),
      createTable(
        "table-shooting-team-results-hi",
        "एशियन गेम्स 2026: पुरुषों की 10 मीटर एयर राइफल टीम स्पर्धा परिणाम",
        ["पदक (Medal)", "देश (Country)", "खिलाड़ी (Shooters)", "कुल अंक (Total Score)"],
        [
          ["**गोल्ड (Gold)**", "चीन (China)", "शेंग लिहाओ, ली हाओ, झांग बोवेन", "1899.0 अंक"],
          ["**सिल्वर (Silver)**", "भारत (India)", "हिमांशु ढिल्लों, रुद्राक्ष पाटिल, पार्थ माने", "1890.1 अंक"],
          ["**ब्रॉन्ज (Bronze)**", "दक्षिण कोरिया (South Korea)", "पार्क हा-जुन, किम संग-डू, शिन ह्यून-वू", "1884.2 अंक"]
        ]
      ),
      createTable(
        "table-shooting-ind-results-hi",
        "एशियन गेम्स 2026: पुरुषों की 10 मीटर एयर राइफल व्यक्तिगत स्पर्धा परिणाम",
        ["पदक (Medal)", "निशानेबाज (Shooter)", "देश (Country)", "विशेष टिप्पणी (Notes)"],
        [
          ["**गोल्ड (Gold)**", "शेंग लिहाओ (Sheng Lihao)", "चीन (China)", "ओलंपिक व एशियन रिकॉर्ड होल्डर"],
          ["**सिल्वर (Silver)**", "हिमांशु ढिल्लों (Himanshu Dhillon)", "भारत (India)", "पहला एशियन गेम्स डेब्यू में सिल्वर"],
          ["**ब्रॉन्ज (Bronze)**", "रुद्राक्ष पाटिल (Rudrankksh Patil)", "भारत (India)", "2022 वर्ल्ड चैंपियन"]
        ]
      )
    ],
    bodyEn: [
      ...createBlocks([
        "### Historical Success in Men's 10m Air Rifle at Asian Games 2026",
        "• **Stellar Achievement**: At the **20th Asian Games 2026** in Aichi-Nagoya, Japan, Indian shooters delivered an outstanding performance in the Men's **10m Air Rifle** disciplines.",
        "• **Team Silver Medal**: The Indian trio of **Himanshu Dhillon**, **Rudrankksh Patil**, and **Parth Mane** clinched the **Silver Medal** with a total score of **1890.1 points**.",
        "• **Team Standings**: China claimed **Gold** with **1899.0 points**, while South Korea bagged **Bronze** with **1884.2 points**.",
        "• **Cross Reference**: Read our previous article on [Ariha Pangambam Asian Gymnastics Gold Medal Notes](/current-affairs/ariha-pangambam-asian-aerobic-gymnastics-championship-gold-medal) for complete sports prep.",
        "### Double Medal Triumph in Individual Event",
        "• **Himanshu Dhillon's Silver**: Competing in his debut Asian Games, **Himanshu Dhillon** secured the **Silver Medal**.",
        "• **Rudrankksh Patil's Bronze**: 2022 World Champion **Rudrankksh Patil** added a **Bronze Medal** to India's tally.",
        "• **Gold Medalist**: China's **Sheng Lihao** won the Individual Gold Medal."
      ]),
      createTable(
        "table-shooting-team-results-en",
        "Asian Games 2026: Men's 10m Air Rifle Team Results",
        ["Medal", "Country", "Shooters Trio", "Total Score"],
        [
          ["**Gold**", "China", "Sheng Lihao & Team", "1899.0 pts"],
          ["**Silver**", "India", "Himanshu Dhillon, Rudrankksh Patil, Parth Mane", "1890.1 pts"],
          ["**Bronze**", "South Korea", "Park Ha-jun & Team", "1884.2 pts"]
        ]
      )
    ]
  };

  // Section 1: Shooter Profiles & Key Milestones
  const sec1Profiles = {
    _key: "sec-1-shooter-profiles",
    kind: "background",
    title: "भारतीय निशानेबाजों का परिचय एवं खेल यात्रा: हिमांशु ढिल्लों, रुद्राक्ष पाटिल और पार्थ माने",
    titleEn: "Profiles & Key Career Milestones of Indian Shooters: Himanshu, Rudrankksh & Parth",
    body: [
      ...createBlocks([
        "### हिमांशु ढिल्लों (Himanshu Dhillon) — डेब्यू में दोहरी सफलता",
        "• **पहला एशियन गेम्स**: एशियन गेम्स 2026 हिमांशु ढिल्लों का पहला अंतर्राष्ट्रीय महाद्वीपीय खेल (Debut Asian Games) था।",
        "• **दोहरा पदक**: उन्होंने अपने पर्दापण में ही **टीम सिल्वर (1890.1 अंक)** तथा **व्यक्तिगत सिल्वर** जीतकर इतिहास रच दिया।",
        "• **तकनीकी नियंत्रण**: अंतिम शॉट प्रेशर सीरीज़ में हिमांशु ने 10.8 तथा 10.9 के अचूक निशाने साधकर रजत पदक पक्का किया।",
        "### रुद्राक्ष पाटिल (Rudrankksh Patil) — पूर्व विश्व चैंपियन का दबदबा",
        "• **2022 विश्व चैंपियन**: रुद्राक्ष पाटिल ने मिस्र के काहिरा में आयोजित **2022 ISSF वर्ल्ड शूटिंग चैंपियनशिप** में 10 मीटर एयर राइफल में **स्वर्ण पदक** जीता था।",
        "• **अंतर्राष्ट्रीय अनुभव**: ओलंपिक कोटा विजेता और कई ISSF वर्ल्ड कप गोल्ड मेडलिस्ट के रूप में रुद्राक्ष भारतीय शूटिंग टीम के मुख्य स्तंभ हैं।",
        "• **2026 में दो पदक**: एशियन गेम्स 2026 में टीम सिल्वर और व्यक्तिगत कांस्य पदक जीतकर उन्होंने अपनी निरंतरता साबित की।",
        "### पार्थ माने (Parth Mane) — युवा सनसनी",
        "• **टीम का मुख्य आधार**: पार्थ माने ने 10 मीटर एयर राइफल क्वालिफिकेशन राउंड में लगातार स्थिर स्कोर बनाकर भारत के 1890.1 अंक के कुल योग में महती भूमिका निभाई।",
        "• **MPPSC परीक्षा अध्ययन संदर्भ**: अधिक खेल अध्ययन सामग्री के लिए हमारे [MPPSC खेलकूद एवं समसामयिकी नोट्स](/mppsc-current-affairs) और [MPPSC प्रीलिम्स नोट्स](/mppsc-notes) देखें।"
      ]),
      actionImageBlock
    ],
    bodyEn: [
      ...createBlocks([
        "### Himanshu Dhillon — Outstanding Asian Games Debut",
        "• **First Asian Games**: Asian Games 2026 marked Himanshu Dhillon's inaugural appearance.",
        "• **Double Medalist**: Claimed Team Silver and Individual Silver in his very first appearance.",
        "### Rudrankksh Patil — Former World Champion's Brilliance",
        "• **2022 World Champion**: Won World Championship Gold in 10m Air Rifle at Cairo 2022.",
        "• **Dual Medalist at Nagoya 2026**: Won Team Silver and Individual Bronze.",
        "### Parth Mane — Promising Young Talent",
        "• **Crucial Score Contribution**: Built a stable base score to ensure India's 1890.1 total."
      ])
    ]
  };

  // Section 2: Asian Games Facts & History
  const sec2AsianGamesFacts = {
    _key: "sec-2-asian-games-facts",
    kind: "keyHighlights",
    title: "एशियन गेम्स (Asian Games): इतिहास, संचालन संस्था (OCA) और महत्वपूर्ण तथ्य",
    titleEn: "Asian Games Facts & History: Olympic Council of Asia (OCA) & Host Cities",
    body: [
      ...createBlocks([
        "### एशियन गेम्स (Asian Games) का अवलोकन",
        "• **परिभाषा व स्वरूप**: एशियन गेम्स (एशियाई खेल) एशिया महाद्वीप के देशों के बीच आयोजित होने वाली सर्वोच्च **बहु-खेल प्रतियोगिता (Multi-Sport Event)** है।",
        "• **शासी संस्था (Governing Body)**: इसका आयोजन **ओलंपिक काउंसिल ऑफ एशिया (OCA - Olympic Council of Asia)** के तत्वावधान में किया जाता है।",
        "• **आयोजन अंतराल**: एशियन गेम्स का आयोजन सामान्यतः **प्रत्येक 4 वर्ष के अंतराल (Every 4 Years)** पर किया जाता है।",
        "### प्रथम एशियन गेम्स एवं भारत का योगदान (1951 नई दिल्ली)",
        "• **प्रथम संस्करण**: पहले एशियन गेम्स का आयोजन **वर्ष 1951 में नई दिल्ली, भारत** में हुआ था।",
        "• **उद्घाटन**: इसका उद्घाटन भारत के प्रथम राष्ट्रपति **डॉ. राजेंद्र प्रसाद** ने ध्यानचंद नेशनल स्टेडियम में किया था।",
        "• **प्रतिभागी देश**: 1951 के पहले एशियन गेम्स में **11 देशों** के 489 एथलीटों ने हिस्सा लिया था।",
        "• **भारत की दूसरी मेजबानी**: भारत ने पुनः **1982 (9वें एशियन गेम्स)** की मेजबानी नई दिल्ली में की थी।",
        "### एशियन गेम्स के हालिया एवं आगामी आयोजन स्थल (Host Cities Timeline)",
        "• **19वाँ संस्करण (2023)**: हांगझोऊ, चीन (Hangzhou, China)",
        "• **20वाँ संस्करण (2026)**: आइची-नागोया, जापान (Aichi-Nagoya, Japan)",
        "• **21वाँ संस्करण (2030)**: दोहा, कतर (Doha, Qatar)",
        "• **22वाँ संस्करण (2034)**: रियाद, सऊदी अरब (Riyadh, Saudi Arabia)",
        "• **संबंधित पृष्ठ**: हमारे [सामान्य ज्ञान एवं खेलकूद हब](/general-awareness) पर अंतर्राष्ट्रीय खेल संगठनों की पूरी सूची उपलब्ध है।"
      ]),
      createTable(
        "table-asian-games-hosts-hi",
        "एशियन गेम्स: प्रमुख संस्करणों एवं मेज़बान शहरों का विवरण (Asian Games Fact Sheet)",
        ["वर्ष (Year)", "संस्करण (Edition)", "मेज़बान शहर व देश (Host City & Country)", "महत्वपूर्ण तथ्य (Key Highlight)"],
        [
          ["**1951**", "1st Asian Games", "नई दिल्ली, भारत (New Delhi, India)", "प्रथम एशियन गेम्स (11 प्रतिभागी देश)"],
          ["**1982**", "9th Asian Games", "नई दिल्ली, भारत (New Delhi, India)", "भारत में दूसरी बार आयोजन (अपोलो शुभंकर)"],
          ["**2023**", "19th Asian Games", "हांगझोऊ, चीन (Hangzhou, China)", "भारत का रिकॉर्ड 107 पदकों का सर्वश्रेष्ठ प्रदर्शन"],
          ["**2026**", "20th Asian Games", "आइची-नागोया, जापान (Aichi-Nagoya, Japan)", "हिमांशु ढिल्लों व रुद्राक्ष पाटिल का राइफल पदक"],
          ["**2030**", "21st Asian Games", "दोहा, कतर (Doha, Qatar)", "पश्चिम एशिया में दूसरा आयोजन"],
          ["**2034**", "22nd Asian Games", "रियाद, सऊदी अरब (Riyadh, Saudi Arabia)", "सऊदी अरब में पहला आयोजन"]
        ]
      ),
      infographicImageBlock
    ],
    bodyEn: [
      ...createBlocks([
        "### Overview of Asian Games",
        "• **Definition**: The premier continental multi-sport competition contested by Asian athletes.",
        "• **Governing Body**: Organized under the auspices of the **Olympic Council of Asia (OCA)**.",
        "• **Frequency**: Organized every 4 years.",
        "### 1st Asian Games & India's Hosting History (1951 New Delhi)",
        "• **Inaugural Edition**: Held in **1951 in New Delhi, India** with 11 participating nations.",
        "• **Second Indian Hosting**: India hosted again in **1982 in New Delhi**.",
        "### Host Cities Timeline (2023 to 2034)",
        "• **2023 (19th Edition)**: Hangzhou, China",
        "• **2026 (20th Edition)**: Aichi-Nagoya, Japan",
        "• **2030 (21st Edition)**: Doha, Qatar",
        "• **2034 (22nd Edition)**: Riyadh, Saudi Arabia"
      ]),
      createTable(
        "table-asian-games-hosts-en",
        "Asian Games Historical Timeline & Host Cities",
        ["Year", "Edition", "Host City & Country", "Key Significance"],
        [
          ["**1951**", "1st Edition", "New Delhi, India", "Inaugural Asian Games (11 Nations)"],
          ["**1982**", "9th Edition", "New Delhi, India", "2nd time hosted in India"],
          ["**2023**", "19th Edition", "Hangzhou, China", "India's record 107 medals"],
          ["**2026**", "20th Edition", "Aichi-Nagoya, Japan", "Air Rifle Silver & Bronze for India"],
          ["**2030**", "21st Edition", "Doha, Qatar", "Doha Asian Games"],
          ["**2034**", "22nd Edition", "Riyadh, Saudi Arabia", "Riyadh Asian Games"]
        ]
      )
    ]
  };

  // Section 3: Exam Summary & MPPSC Takeaways
  const sec3ExamPoints = {
    _key: "sec-3-exam-points",
    kind: "background",
    title: "MPPSC और UPSC परीक्षा के लिए अति-महत्वपूर्ण तथ्य (Quick Revision Notes)",
    titleEn: "High-Yield MPPSC & UPSC Exam Points (Quick Revision)",
    body: [
      ...createBlocks([
        "### MPPSC प्रारंभिक परीक्षा (Unit 8: खेल एवं समसामयिकी) विशेष पॉइंटर्स",
        "• **प्रश्‍न**: एशियन गेम्स 2026 का आयोजन स्थल कौन सा शहर है? — **उत्तर**: आइची-नागोया, जापान (Aichi-Nagoya, Japan)।",
        "• **प्रश्‍न**: पुरुषों की 10 मीटर एयर राइफल टीम स्पर्धा का सिल्वर मेडल किसने जीता? — **उत्तर**: भारत (हिमांशु ढिल्लों, रुद्राक्ष पाटिल, पार्थ माने - 1890.1 अंक)।",
        "• **प्रश्‍न**: 2022 के 10 मीटर एयर राइफल वर्ल्ड चैंपियन कौन थे? — **उत्तर**: रुद्राक्ष पाटिल (Rudrankksh Patil)।",
        "• **प्रश्‍न**: प्रथम एशियन गेम्स का आयोजन कब और कहाँ हुआ? — **उत्तर**: 1951, नई दिल्ली, भारत।",
        "• **प्रश्‍न**: एशियन गेम्स का संचालन कौन सी संस्था करती है? — **उत्तर**: Olympic Council of Asia (OCA - मुख्यालय: कुवैत सिटी)।",
        "• **ऑनलाइन कोर्स संदर्भ**: MPPSC प्रारंभिक एवं मुख्य परीक्षा की संपूर्ण तैयारी के लिए [Aakar IAS ऑनलाइन कोचिंग पाठ्यक्रम](/online-courses) से जुड़ें।"
      ])
    ],
    bodyEn: [
      ...createBlocks([
        "### Key Exam Points for MPPSC & UPSC Prelims",
        "• **Host Venue 2026**: Aichi-Nagoya, Japan (20th Asian Games).",
        "• **India's 10m Air Rifle Team Score**: 1890.1 points (Silver Medal).",
        "• **2022 10m Air Rifle World Champion**: Rudrankksh Patil (Won Bronze at 2026 Asian Games).",
        "• **First Asian Games**: 1951, New Delhi, India (11 Countries).",
        "• **Governing Body**: Olympic Council of Asia (OCA)."
      ])
    ]
  };

  // MCQs array (8 High-Quality MCQs)
  const mcqs = [
    {
      question: "एशियन गेम्स 2026 में पुरुषों की 10 मीटर एयर राइफल टीम स्पर्धा में भारत ने कौन सा पदक जीता?",
      questionEn: "Which medal did India win in the Men's 10m Air Rifle Team event at the Asian Games 2026?",
      options: ["गोल्ड मेडल (Gold Medal)", "सिल्वर मेडल (Silver Medal)", "कांस्य मेडल (Bronze Medal)", "कोई पदक नहीं"],
      optionsEn: ["Gold Medal", "Silver Medal", "Bronze Medal", "No Medal"],
      correctIndex: 1,
      explanation: "हिमांशु ढिल्लों, रुद्राक्ष पाटिल और पार्थ माने की भारतीय टीम ने 1890.1 अंकों के साथ सिल्वर मेडल (रजत पदक) हासिल किया।",
      explanationEn: "The Indian team comprising Himanshu Dhillon, Rudrankksh Patil, and Parth Mane won the Silver Medal with 1890.1 points."
    },
    {
      question: "एशियन गेम्स 2026 की 10 मीटर एयर राइफल टीम स्पर्धा में भारतीय टीम का कुल स्कोर कितना था?",
      questionEn: "What was the total score of the Indian team in the 10m Air Rifle Team event at Asian Games 2026?",
      options: ["1899.0 अंक", "1890.1 अंक", "1884.2 अंक", "1902.5 अंक"],
      optionsEn: ["1899.0 points", "1890.1 points", "1884.2 points", "1902.5 points"],
      correctIndex: 1,
      explanation: "भारतीय टीम ने 1890.1 अंक हासिल कर दूसरा स्थान (सिल्वर) प्राप्त किया। चीन 1899.0 अंक के साथ प्रथम रहा।",
      explanationEn: "India secured second place with 1890.1 points. China won Gold with 1899.0 points."
    },
    {
      question: "एशियन गेम्स 2026 में 10 मीटर एयर राइफल व्यक्तिगत स्पर्धा में किस भारतीय निशानेबाज ने रजत (Silver) पदक जीता?",
      questionEn: "Which Indian shooter won the Silver Medal in the Men's 10m Air Rifle Individual event at Asian Games 2026?",
      options: ["रुद्राक्ष पाटिल", "हिमांशु ढिल्लों", "पार्थ माने", "अभिनव बिंद्रा"],
      optionsEn: ["Rudrankksh Patil", "Himanshu Dhillon", "Parth Mane", "Abhinav Bindra"],
      correctIndex: 1,
      explanation: "हिमांशु ढिल्लों ने अपने पहले ही एशियन गेम्स डेब्यू में व्यक्तिगत 10 मीटर एयर राइफल स्पर्धा का सिल्वर मेडल जीता।",
      explanationEn: "Himanshu Dhillon won the Silver Medal in his debut Asian Games performance."
    },
    {
      question: "2022 के 10 मीटर एयर राइफल वर्ल्ड चैंपियन रह चुके किस भारतीय निशानेबाज ने एशियन गेम्स 2026 में कांस्य पदक जीता?",
      questionEn: "Which Indian shooter, who was the 2022 10m Air Rifle World Champion, won Bronze at Asian Games 2026?",
      options: ["हिमांशु ढिल्लों", "रुद्राक्ष पाटिल", "गगन नारंग", "पार्थ माने"],
      optionsEn: ["Himanshu Dhillon", "Rudrankksh Patil", "Gagan Narang", "Parth Mane"],
      correctIndex: 1,
      explanation: "2022 के 10 मीटर एयर राइफल वर्ल्ड चैंपियन रुद्राक्ष पाटिल ने एशियन गेम्स 2026 में व्यक्तिगत स्पर्धा का ब्रॉन्ज मेडल जीता।",
      explanationEn: "Rudrankksh Patil, the 2022 World Champion in 10m Air Rifle, won the Bronze Medal at Asian Games 2026."
    },
    {
      question: "एशियन गेम्स 2026 में 10 मीटर एयर राइफल व्यक्तिगत स्पर्धा का स्वर्ण पदक किसने जीता?",
      questionEn: "Who won the Gold Medal in the 10m Air Rifle Individual event at Asian Games 2026?",
      options: ["शेंग लिहाओ (चीन)", "हिमांशु ढिल्लों (भारत)", "पार्क हा-जुन (दक्षिण कोरिया)", "रुद्राक्ष पाटिल (भारत)"],
      optionsEn: ["Sheng Lihao (China)", "Himanshu Dhillon (India)", "Park Ha-jun (South Korea)", "Rudrankksh Patil (India)"],
      correctIndex: 0,
      explanation: "चीन के शेंग लिहाओ (Sheng Lihao) ने व्यक्तिगत स्पर्धा में स्वर्ण पदक जीता।",
      explanationEn: "Sheng Lihao of China clinched the Gold Medal in the individual event."
    },
    {
      question: "प्रथम एशियन गेम्स का आयोजन किस वर्ष एवं किस स्थान पर किया गया था?",
      questionEn: "In which year and location were the 1st Asian Games held?",
      options: ["1951, नई दिल्ली (भारत)", "1954, मनीला (फिलीपींस)", "1958, टोक्यो (जापान)", "1982, मुंबई (भारत)"],
      optionsEn: ["1951, New Delhi (India)", "1954, Manila (Philippines)", "1958, Tokyo (Japan)", "1982, Mumbai (India)"],
      correctIndex: 0,
      explanation: "पहला एशियन गेम्स मार्च 1951 में नई दिल्ली, भारत में आयोजित किया गया था, जिसमें 11 देशों ने भाग लिया था।",
      explanationEn: "The inaugural Asian Games were hosted in New Delhi, India in 1951 with 11 participating nations."
    },
    {
      question: "एशियन गेम्स का संचालन किस अंतरराष्ट्रीय खेल संस्था के तत्वावधान में होता है?",
      questionEn: "Under the auspices of which international organization are the Asian Games conducted?",
      options: ["International Olympic Committee (IOC)", "Olympic Council of Asia (OCA)", "Asian Sports Federation (ASF)", "International Shooting Sport Federation (ISSF)"],
      optionsEn: ["International Olympic Committee (IOC)", "Olympic Council of Asia (OCA)", "Asian Sports Federation (ASF)", "International Shooting Sport Federation (ISSF)"],
      correctIndex: 1,
      explanation: "एशियन गेम्स का आयोजन Olympic Council of Asia (OCA - ओलंपिक परिषद एशिया) द्वारा किया जाता है।",
      explanationEn: "Asian Games are governed and organized by the Olympic Council of Asia (OCA)."
    },
    {
      question: "21वें एशियन गेम्स (2030) का आयोजन किस देश/शहर में प्रस्तावित है?",
      questionEn: "Which city/country is designated to host the 21st Asian Games in 2030?",
      options: ["आइची-नागोया (जापान)", "दोहा (कतर)", "रियाद (सऊदी अरब)", "बैंकॉक (थाईलैंड)"],
      optionsEn: ["Aichi-Nagoya (Japan)", "Doha (Qatar)", "Riyadh (Saudi Arabia)", "Bangkok (Thailand)"],
      correctIndex: 1,
      explanation: "2030 के 21वें एशियन गेम्स का आयोजन दोहा, कतर में होगा, जबकि 2034 का आयोजन रियाद, सऊदी अरब में होगा।",
      explanationEn: "The 2030 Asian Games will be held in Doha, Qatar, while Riyadh, Saudi Arabia will host in 2034."
    }
  ];

  // Collapsible FAQs (10 High-Value FAQs)
  const faqs = [
    {
      question: "एशियन गेम्स 2026 में 10 मीटर एयर राइफल टीम स्पर्धा में भारत ने कौन सा पदक जीता?",
      questionEn: "Which medal did India win in the Men's 10m Air Rifle Team event at Asian Games 2026?",
      answer: "भारतीय त्रयी हिमांशु ढिल्लों, रुद्राक्ष पाटिल और पार्थ माने ने 1890.1 अंकों के साथ सिल्वर मेडल (रजत पदक) जीता।",
      answerEn: "India's team of Himanshu Dhillon, Rudrankksh Patil, and Parth Mane won the Silver Medal with 1890.1 points."
    },
    {
      question: "एशियन गेम्स 2026 में 10 मीटर एयर राइफल व्यक्तिगत स्पर्धा में भारतीय निशानेबाजों का क्या प्रदर्शन रहा?",
      questionEn: "What was the result of Indian shooters in the 10m Air Rifle Individual event at Asian Games 2026?",
      answer: "व्यक्तिगत स्पर्धा में हिमांशु ढिल्लों ने सिल्वर मेडल और रुद्राक्ष पाटिल ने ब्रॉन्ज मेडल जीता।",
      answerEn: "In the individual event, Himanshu Dhillon won Silver and Rudrankksh Patil won Bronze."
    },
    {
      question: "10 मीटर एयर राइफल व्यक्तिगत स्पर्धा में गोल्ड मेडल किसने जीता?",
      questionEn: "Who won Gold in the 10m Air Rifle Individual event at Asian Games 2026?",
      answer: "चीन के निशानेबाज शेंग लिहाओ (Sheng Lihao) ने स्वर्ण पदक अपने नाम किया।",
      answerEn: "Sheng Lihao of China won the Individual Gold Medal."
    },
    {
      question: "रुद्राक्ष पाटिल की प्रमुख अंतर्राष्ट्रीय उपलब्धियाँ क्या हैं?",
      questionEn: "What are the major international achievements of Rudrankksh Patil?",
      answer: "रुद्राक्ष पाटिल 2022 के 10 मीटर एयर राइफल वर्ल्ड चैंपियन रह चुके हैं। उन्होंने एशियन गेम्स 2026 में टीम सिल्वर और व्यक्तिगत ब्रॉन्ज मेडल जीता।",
      answerEn: "Rudrankksh Patil won the 10m Air Rifle World Championship in 2022 and clinched Team Silver & Individual Bronze at Asian Games 2026."
    },
    {
      question: "क्या एशियन गेम्स 2026 हिमांशु ढिल्लों का पहला एशियन गेम्स था?",
      questionEn: "Was Asian Games 2026 the debut appearance for Himanshu Dhillon?",
      answer: "हाँ, हिमांशु ढिल्लों का यह पहला एशियन गेम्स (Debut Asian Games) था, जिसमें उन्होंने टीम और व्यक्तिगत दोनों स्पर्धाओं में सिल्वर मेडल जीता।",
      answerEn: "Yes, this was Himanshu Dhillon's debut Asian Games, where he won Silver in both Team and Individual events."
    },
    {
      question: "एशियन गेम्स का संचालन किस संस्था द्वारा किया जाता है?",
      questionEn: "Which body governs the Asian Games?",
      answer: "एशियन गेम्स का संचालन Olympic Council of Asia (OCA) के तत्वावधान में किया जाता है।",
      answerEn: "The Asian Games are governed by the Olympic Council of Asia (OCA)."
    },
    {
      question: "पहला एशियन गेम्स कब और कहाँ आयोजित हुआ था?",
      questionEn: "When and where was the first Asian Games held?",
      answer: "प्रथम एशियन गेम्स का आयोजन 1951 में नई दिल्ली, भारत में हुआ था, जिसमें 11 देशों ने भाग लिया था।",
      answerEn: "The first Asian Games were held in 1951 in New Delhi, India, with 11 participating nations."
    },
    {
      question: "एशियन गेम्स 2026 का आयोजन कहाँ हो रहा है?",
      questionEn: "Where are the Asian Games 2026 being held?",
      answer: "एशियन गेम्स 2026 (20th Asian Games) का आयोजन आइची-नागोया, जापान (Aichi-Nagoya, Japan) में हो रहा है।",
      answerEn: "The 2026 Asian Games (20th edition) are hosted in Aichi-Nagoya, Japan."
    },
    {
      question: "आगामी 2030 और 2034 के एशियन गेम्स कहाँ आयोजित किए जाएंगे?",
      questionEn: "Where will the 2030 and 2034 Asian Games take place?",
      answer: "2030 के एशियन गेम्स दोहा (कतर) में तथा 2034 के एशियन गेम्स रियाद (सऊदी अरब) में आयोजित किए जाएंगे।",
      answerEn: "The 2030 Asian Games will be held in Doha (Qatar), and the 2034 Asian Games in Riyadh (Saudi Arabia)."
    },
    {
      question: "यह समाचार MPPSC एवं UPSC परीक्षा की दृष्टि से क्यों महत्वपूर्ण है?",
      questionEn: "Why is this news significant for MPPSC and UPSC exams?",
      answer: "यह खबर MPPSC Prelims (Unit 8: Sports & Current Affairs) और Mains (General Awareness) के साथ-साथ UPSC prelims खेल सम्बन्धी प्रश्नों के लिए अत्यंत महत्वपूर्ण है।",
      answerEn: "This news is vital for MPPSC Prelims (Unit 8: Sports) and General Awareness sections as well as UPSC current affairs."
    }
  ];

  // Document Slugs and Titles
  const docSlug = "asian-games-2026-10m-air-rifle-india-medals-himanshu-dhillon-rudrankksh-patil";
  const docTitleHi = "एशियन गेम्स 2026: 10 मीटर एयर राइफल में भारत का शानदार प्रदर्शन | हिमांशु ढिल्लों, रुद्राक्ष पाटिल व पार्थ माने का कमाल | MPPSC & UPSC खेल नोट्स";
  const docTitleEn = "Asian Games 2026: India's Shooting Triumph in 10m Air Rifle | Silver & Bronze Medals for Himanshu Dhillon, Rudrankksh Patil & Team | MPPSC & UPSC Sports Notes";
  const docExcerptHi = "आइची-नागोया, जापान में आयोजित एशियन गेम्स 2026 में भारत ने पुरुषों की 10 मीटर एयर राइफल स्पर्धाओं में शानदार प्रदर्शन करते हुए टीम सिल्वर (1890.1 अंक) तथा व्यक्तिगत स्पर्धा में हिमांशु ढिल्लों ने सिल्वर और रुद्राक्ष पाटिल ने ब्रॉन्ज मेडल जीतकर देश का नाम रोशन किया।";
  const docExcerptEn = "At the Asian Games 2026 in Aichi-Nagoya, Japan, India's shooting squad excelled in the Men's 10m Air Rifle events. The team of Himanshu Dhillon, Rudrankksh Patil, and Parth Mane won Silver (1890.1 pts), while Himanshu Dhillon bagged Silver and Rudrankksh Patil won Bronze in the individual event.";

  const keywordsArray = [
    "asian games 2026 10m air rifle",
    "himanshu dhillon rudrankksh patil parth mane",
    "asian games 2026 shooting silver medal india",
    "1890.1 score air rifle team india",
    "rudrankksh patil 2022 world champion bronze medal",
    "himanshu dhillon debut asian games silver",
    "sheng lihao china gold medal 10m air rifle",
    "olympic council of asia oca facts",
    "first asian games 1951 new delhi",
    "aichi nagoya japan asian games 2026",
    "2030 doha qatar 2034 riyadh saudi arabia asian games",
    "mppsc sports notes 10m air rifle asian games",
    "upsc current affairs sports 2026",
    "एशियन गेम्स 2026 10 मीटर एयर राइफल भारत"
  ];

  // Reference Ariha Pangambam Document for nextArticle linkage
  const arihaCaDoc = await client.getDocument("ca-ariha-pangambam-asian-gymnastics-gold-2026");

  // 1. Create Current Affairs Document
  const caDocId = "ca-asian-games-2026-10m-air-rifle-india";
  const caDocument: any = {
    _id: caDocId,
    _type: "currentAffairs",
    title: docTitleHi,
    titleEn: docTitleEn,
    slug: { _type: "slug", current: docSlug },
    author: { _type: "reference", _ref: authorId },
    tag: { _type: "reference", _ref: sportsTagId },
    tags: [
      { _type: "reference", _ref: sportsTagId, _key: "tag-key-sports" },
      { _type: "reference", _ref: mppscTagId, _key: "tag-key-mppsc" },
      { _type: "reference", _ref: upscTagId, _key: "tag-key-upsc" }
    ],
    publishedAt: new Date().toISOString(),
    excerpt: docExcerptHi,
    excerptEn: docExcerptEn,
    keywords: keywordsArray,
    featuredImage: featuredImageObj,
    sections: [
      sec0Overview,
      sec1Profiles,
      sec2AsianGamesFacts,
      sec3ExamPoints
    ],
    mcqs: mcqs,
    faqs: faqs,
  };

  if (arihaCaDoc) {
    caDocument.nextArticle = { _type: "reference", _ref: arihaCaDoc._id };
  }

  await client.createOrReplace(caDocument);
  console.log(`✨ Successfully published Current Affairs document to Sanity: ${caDocId}`);

  // 2. Create Static GK Document
  const gkDocId = "gk-asian-games-2026-10m-air-rifle-india";
  const gkDocument = {
    ...caDocument,
    _id: gkDocId,
    _type: "staticGk",
  };

  await client.createOrReplace(gkDocument);
  console.log(`✨ Successfully published Static GK document to Sanity: ${gkDocId}`);

  // 3. Update Ariha Pangambam article with bi-directional cross link
  if (arihaCaDoc) {
    console.log("🔗 Updating Ariha Pangambam document to cross-link with new Air Rifle article...");
    await client.patch(arihaCaDoc._id)
      .set({
        nextArticle: { _type: "reference", _ref: caDocId }
      })
      .commit();
    console.log("✔ Bi-directional cross-link established!");
  }

  console.log("🎉 Asian Games 2026 10m Air Rifle Article publication complete!");
}

main().catch((err) => {
  console.error("❌ Error uploading article:", err);
  process.exit(1);
});
