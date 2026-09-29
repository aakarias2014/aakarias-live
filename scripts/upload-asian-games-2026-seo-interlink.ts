import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

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

async function main() {
  console.log("🚀 Starting Complete 48 Medal Winners List Update for Asian Games 2026...");

  // Upload/Verify Custom Cover Image Asset
  const imagePath = "/Users/aakariastech/.gemini/antigravity-ide/brain/64b3f568-c32a-459a-a042-5de655665154/.user_uploaded/media_1790675794414.png";
  let coverAssetId = "image-89db2c8584fee6e431b955c684e90d5c1d6caa5f-1024x406-png";

  if (fs.existsSync(imagePath)) {
    console.log("📸 Uploading/verifying custom cover image...");
    const imageAsset = await client.assets.upload("image", fs.createReadStream(imagePath), {
      filename: "asian_games_2026_48_medals_banner_seo.png",
    });
    coverAssetId = imageAsset._id;
    console.log(`✔ Cover Image Asset ID: ${coverAssetId}`);
  }

  const actionImagePath = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3ff0c53-d00f-4d3d-a759-669ae0e099de/himanshu_rudrankksh_air_rifle_action_1790072792507.jpg";
  const infographicPath = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3ff0c53-d00f-4d3d-a759-669ae0e099de/asian_games_history_infographic_1790072865005.jpg";

  const actionAssetId = await client.assets.upload("image", fs.createReadStream(actionImagePath), { filename: "himanshu_rudrankksh_action_seo.jpg" }).then(r => r._id);
  const infographicAssetId = await client.assets.upload("image", fs.createReadStream(infographicPath), { filename: "asian_games_timeline_seo.jpg" }).then(r => r._id);

  const featuredImageObj = {
    _type: "image",
    asset: { _type: "reference", _ref: coverAssetId },
    alt: "2026 एशियन गेम्स में भारतीय पदक विजेताओं की संपूर्ण 48 विजेताओं की सूची | MPPSC & UPSC Notes",
    caption: "चित्र: एशियन गेम्स 2026 (आइची-नागोया, जापान) में भारत के 48 पदकों का संपूर्ण पदक तालिका सूची।",
  };

  const actionImageBlock = {
    _key: "img-block-shooting-action",
    _type: "image",
    asset: { _type: "reference", _ref: actionAssetId },
    alt: "10 मीटर एयर राइफल निशानेबाजी स्पर्धा में हिमांशु ढिल्लों व रुद्राक्ष पाटिल",
    caption: "चित्र: 10 मीटर एयर राइफल स्पर्धा में सटीक निशाना साधते भारतीय निशानेबाज।",
  };

  const infographicImageBlock = {
    _key: "img-block-asian-games-timeline",
    _type: "image",
    asset: { _type: "reference", _ref: infographicAssetId },
    alt: "एशियन गेम्स (Asian Games) का इतिहास एवं भावी आयोजन स्थल टाइमलाइन",
    caption: "चित्र: 1951 नई दिल्ली से 2034 रियाद तक एशियाई खेलों की ऐतिहासिक विकास यात्रा।",
  };

  // Author & Tags
  let authorId = "author-aakar-ias-team";
  await client.createIfNotExists({
    _id: authorId,
    _type: "author",
    name: "Aakar IAS Team",
    role: "Senior Editorial & Subject Specialist",
    bio: "Chief Editor specializing in MPPSC & UPSC Current Affairs, Polity, Science & Sports Awareness.",
  });

  let sportsTagId = "tag-sports";
  await client.createIfNotExists({
    _id: sportsTagId,
    _type: "tag",
    name: "खेल एवं खेलकूद (Sports)",
    nameEn: "Sports & Games",
    slug: { _type: "slug", current: "sports" },
  });

  let mppscTagId = "tag-mppsc";
  await client.createIfNotExists({
    _id: mppscTagId,
    _type: "tag",
    name: "MPPSC परीक्षा नोट्स",
    nameEn: "MPPSC Exam Notes",
    slug: { _type: "slug", current: "mppsc" },
  });

  let upscTagId = "tag-upsc";
  await client.createIfNotExists({
    _id: upscTagId,
    _type: "tag",
    name: "UPSC समसामयिकी",
    nameEn: "UPSC Current Affairs",
    slug: { _type: "slug", current: "upsc" },
  });

  // -------------------------------------------------------------
  // SECTION 0: Overall Medal Tally & Sept 29 News
  // -------------------------------------------------------------
  const sec0OverallTally = {
    _key: "sec-0-overall-tally",
    kind: "whyInNews",
    title: "एशियन गेम्स 2026: भारत की समग्र पदक तालिका (Asian Games 2026 Medal Tally India) एवं नवीनतम समाचार",
    titleEn: "Asian Games 2026: India's Overall Medal Tally & Latest Live Updates",
    body: [
      ...createBlocks([
        "### एशियाई खेल 2026 में भारत का स्वर्णिम प्रदर्शन (48 कुल पदक)",
        "• **समग्र पदक संख्या (Medal Tally)**: जापान के **आइची-नागोया (Aichi-Nagoya, Japan)** में आयोजित 20वें एशियाई खेल (19 सितंबर से 4 अक्टूबर 2026) में 29 सितंबर 2026 (Day 11) तक भारत ने **5 स्वर्ण (Gold 🥇), 21 रजत (Silver 🥈) और 22 कांस्य (Bronze 🥉)** सहित कुल **48 पदक** जीत लिए हैं।",
        "• **नीरू ढांडा का ट्रैप शूटिंग गोल्ड**: 29 सितंबर 2026 को भारत की निशानेबाज **नीरू ढांडा (Neeru Dhanda)** ने महिलाओं की व्यक्तिगत ट्रैप निशानेबाजी में **स्वर्ण पदक (Gold Medal)** हासिल किया। यह एशियन गेम्स 2026 में भारत का पहला व्यक्तिगत शूटिंग गोल्ड है।",
        "• **महिला ट्रैप टीम का रजत पदक**: नीरू ढांडा, मनीषा कीर और आशिमा अहलावत की भारतीय महिला ट्रैप निशानेबाजी टीम ने 29 सितंबर 2026 को शानदार **रजत पदक (Silver Medal)** अर्जित किया।",
        "• **नरेंद्र बेरवाल का मुक्केबाजी कांस्य**: 29 सितंबर 2026 को भारतीय मुक्केबाज **नरेंद्र बेरवाल (Narendra Berwal)** ने पुरुषों के +90 किग्रा सुपर हैवीवेट बॉक्सिंग वर्ग में **कांस्य पदक (Bronze Medal)** अपने नाम किया।",
        "• **परीक्षा हेतु इंटरलिंकिंग रिसोर्स**: विस्तृत तैयारी के लिए [MPPSC समसामयिकी एवं खेलकूद नोट्स](/mppsc-current-affairs), [सामान्य जागरूकता हब](/general-awareness) तथा [पुरस्कार एवं सम्मान नोट्स](/awards-and-honors) का नियमित अध्ययन करें।"
      ]),
      createTable(
        "tbl-overall-tally",
        "एशियन गेम्स 2026: भारत की समग्र पदक तालिका (Asian Games 2026 India Overall Medal Tally)",
        ["पदक श्रेणी (Medal Category)", "पदक संख्या (Total Count)"],
        [
          ["**स्वर्ण पदक (Gold 🥇)**", "5"],
          ["**रजत पदक (Silver 🥈)**", "21"],
          ["**कांस्य पदक (Bronze 🥉)**", "22"],
          ["**कुल योग (TOTAL MEDALS)**", "**48**"]
        ]
      )
    ],
    bodyEn: [
      ...createBlocks([
        "### Asian Games 2026: Team India's 48 Medals Tally",
        "• **Overall Medal Haul**: At the 20th Asian Games (Sept 19 to Oct 4, 2026) in **Aichi-Nagoya, Japan**, Team India reached **48 medals** (5 Gold 🥇, 21 Silver 🥈, 22 Bronze 🥉) as of September 29, 2026.",
        "• **Neeru Dhanda's Historic Trap Shooting Gold**: On September 29, 2026, **Neeru Dhanda** won the **Gold Medal** in Women's Individual Trap Shooting — India's first individual shooting Gold of the 2026 Games.",
        "• **Women's Trap Team Silver**: The team of Neeru Dhanda, Manisha Keer, and Aashima Ahlawat bagged **Silver** in Women's Trap Team event.",
        "• **Narendra Berwal's Boxing Bronze**: Boxer **Narendra Berwal** clinched **Bronze** in Men's +90kg Super Heavyweight Boxing on Sept 29, 2026.",
        "• **Exam Resources**: Explore [MPPSC Current Affairs Notes](/mppsc-current-affairs) and [General Awareness Prep](/general-awareness)."
      ]),
      createTable(
        "tbl-overall-tally-en",
        "Asian Games 2026: India's Overall Medal Tally Table",
        ["Medal Category", "Total Count"],
        [
          ["**Gold Medal 🥇**", "5"],
          ["**Silver Medal 🥈**", "21"],
          ["**Bronze Medal 🥉**", "22"],
          ["**TOTAL MEDALS**", "**48**"]
        ]
      )
    ]
  };

  // -------------------------------------------------------------
  // SECTION 1: Men's 10m Air Rifle Detailed Coverage
  // -------------------------------------------------------------
  const sec1AirRifleCoverage = {
    _key: "sec-1-air-rifle-coverage",
    kind: "whyInNews",
    title: "पुरुषों की 10 मीटर एयर राइफल स्पर्धा: हिमांशु ढिल्लों, रुद्राक्ष पाटिल व पार्थ माने की ऐतिहासिक सफलता",
    titleEn: "Men's 10m Air Rifle Event: Historic Triumph for Himanshu Dhillon, Rudrankksh Patil & Parth Mane",
    body: [
      ...createBlocks([
        "### 10 मीटर एयर राइफल टीम स्पर्धा में सिल्वर मेडल (1890.1 अंक)",
        "• **ऐतिहासिक सफलता**: पुरुषों की **10 मीटर एयर राइफल (10m Air Rifle)** टीम स्पर्धा में भारतीय त्रयी **रुद्राक्ष पाटिल (Rudrankksh Patil)**, **पार्थ माने (Parth Mane)** और **हिमांशु ढिल्लों (Himanshu Dhillon)** ने कुल **1890.1 अंक** हासिल कर भारत को **रजत पदक (Silver Medal)** दिलाया।",
        "• **प्रतिद्वंद्वी देशों का प्रदर्शन**: चीन ने **1899.0 अंक** के साथ स्वर्ण पदक (Gold Medal) जीता, जबकि दक्षिण कोरिया की टीम ने **1884.2 अंक** के साथ कांस्य पदक (Bronze Medal) हासिल किया।",
        "• **संबंधित स्पोर्ट्स लेख**: हमारे [अरिहा पंगमबम एशियन जिम्नास्टिक स्वर्ण पदक लेख](/current-affairs/ariha-pangambam-asian-aerobic-gymnastics-championship-gold-medal) तथा [72वें राष्ट्रीय फिल्म पुरस्कार 2026 लेख](/current-affairs/72nd-national-film-awards-2026-winners-list-full-recipients) को भी ज़रूर पढ़ें।",
        "### 10 मीटर एयर राइफल व्यक्तिगत स्पर्धा: दोहरे पदक की गूँज",
        "• **हिमांशु ढिल्लों का डेब्यू में सिल्वर**: अपने पहले एशियन गेम्स (Debut Asian Games) में भाग ले रहे युवा निशानेबाज **हिमांशु ढिल्लों** ने 10m एयर राइफल व्यक्तिगत स्पर्धा का **रजत पदक (Silver Medal)** जीतकर देश का नाम रोशन किया।",
        "• **रुद्राक्ष पाटिल का कांस्य पदक**: 2022 के 10 मीटर एयर राइफल वर्ल्ड चैंपियन **रुद्राक्ष पाटिल** ने व्यक्तिगत स्पर्धा में **कांस्य पदक (Bronze Medal)** अपने नाम किया।",
        "• **स्वर्ण पदक विजेता**: चीन के ओलंपिक पदक विजेता **शेंग लिहाओ (Sheng Lihao)** ने व्यक्तिगत स्पर्धा में **गोल्ड मेडल** हासिल किया।"
      ]),
      createTable(
        "table-shooting-team-results-hi",
        "एशियन गेम्स 2026: पुरुषों की 10 मीटर एयर राइफल टीम स्पर्धा परिणाम",
        ["पदक (Medal)", "देश (Country)", "खिलाड़ी (Shooters)", "कुल अंक (Total Score)"],
        [
          ["**गोल्ड (Gold 🥇)**", "चीन (China)", "शेंग लिहाओ, ली हाओ, झांग बोवेन", "1899.0 अंक"],
          ["**सिल्वर (Silver 🥈)**", "भारत (India)", "रुद्राक्ष पाटिल, पार्थ माने, हिमांशु ढिल्लों", "1890.1 अंक"],
          ["**ब्रॉन्ज (Bronze 🥉)**", "दक्षिण कोरिया (South Korea)", "पार्क हा-जुन, किम संग-डू, शिन ह्यून-वू", "1884.2 अंक"]
        ]
      )
    ],
    bodyEn: [
      ...createBlocks([
        "### Men's 10m Air Rifle Team Silver (1890.1 Points)",
        "• **Team Event**: The Indian trio of **Rudrankksh Patil**, **Parth Mane**, and **Himanshu Dhillon** secured the **Silver Medal** with a total score of **1890.1 points**.",
        "• **Competitors**: China won Gold with **1899.0 points**, while South Korea claimed Bronze with **1884.2 points**.",
        "• **Related Article**: Read our [Ariha Pangambam Asian Gymnastics Gold Medal](/current-affairs/ariha-pangambam-asian-aerobic-gymnastics-championship-gold-medal) sports notes."
      ])
    ]
  };

  // -------------------------------------------------------------
  // SECTION 2: Complete 48 Medal Winners List (1 to 48 Exact Table)
  // -------------------------------------------------------------
  const sec2Complete48List = {
    _key: "sec-2-complete-48-list",
    kind: "keyHighlights",
    title: "2026 एशियन गेम्स में भारतीय पदक विजेताओं की संपूर्ण सूची (1 से 48 तक)",
    titleEn: "Complete List of Indian Medal Winners at 2026 Asian Games (1 to 48)",
    body: [
      ...createBlocks([
        "### 2026 एशियन गेम्स: भारतीय पदक विजेताओं की संपूर्ण 48 सूची (Asian Games 2026 Full Indian Medallists Table)",
        "नीचे एशियन गेम्स 2026 (आइची-नागोया, जापान) में भारत के सभी 48 पदक विजेताओं के नाम, खेल और स्पर्धाओं की संपूर्ण प्रामाणिक सूची दी गई है:"
      ]),
      createTable(
        "tbl-complete-48-medallists-hi",
        "2026 एशियन गेम्स में भारतीय पदक विजेताओं की संपूर्ण सूची (1 से 48)",
        ["नंबर (No.)", "एथलीट (Athlete / Team)", "खेल (Sport)", "इवेंट (Event)"],
        [
          ["1", "एलावेनिल वलारिवन, सोनम मास्कर, विदर्शा विनोद", "शूटिंग", "वूमेंस 10मी एयर राइफल टीम"],
          ["2", "एलावेनिल वलारिवन", "शूटिंग", "वूमेंस 10मी एयर राइफल"],
          ["3", "रुद्राक्ष पाटिल, पार्थ माने, हिमांशु ढिल्लों", "शूटिंग", "मेंस 10मी एयर राइफल टीम"],
          ["4", "हिमांशु ढिल्लों", "शूटिंग", "मेंस 10मी एयर राइफल"],
          ["5", "रुद्राक्ष पाटिल", "शूटिंग", "मेंस 10मी एयर राइफल"],
          ["6", "सुचिका तरियाल", "मिक्स्ड मार्शल आर्ट", "वूमेंस ट्रेडिशन -60किग्रा"],
          ["7", "टीम इंडिया (महिला क्रिकेट)", "क्रिकेट", "वूमेंस टीम"],
          ["8", "परिनाज धालीवाल, रायजा ढिल्लों, माहेश्वरी चौहान", "शूटिंग", "वूमेंस स्कीट टीम"],
          ["9", "अनंतजीत सिंह नरुका, भवतेग सिंह गिल, मैराज अहमद खान", "शूटिंग", "मेंस स्कीट टीम"],
          ["10", "जय मीणा", "सॉफ्ट टेनिस", "मेंस सिंगल्स"],
          ["11", "मीराबाई चानू", "वेटलिफ्टिंग", "वूमेंस 49 किग्रा"],
          ["12", "टीम इंडिया (पुरुष बैडमिंटन)", "बैडमिंटन", "मेंस टीम"],
          ["13", "सतनाम सिंह, सलमान खान", "रोइंग", "मेंस डबल्स स्कल"],
          ["14", "रोशिबिना देवी", "वुशु", "वूमेंस 60किग्रा सांडा"],
          ["15", "अनंतजीत सिंह नरुका, परिनाज धालीवाल", "शूटिंग", "मिक्स्ड स्कीट टीम"],
          ["16", "सीमा", "एथलेटिक्स", "वूमेंस 10,000 मीटर"],
          ["17", "टीम इंडिया", "एथलेटिक्स", "मिक्स्ड 4x400 मीटर"],
          ["18", "ऐश्वर्य प्रताप सिंह तोमर, रुद्राक्ष पाटिल, नीरज कुमार", "शूटिंग", "मेंस 50 मीटर राइफल 3 पोजीशन"],
          ["19", "कमलजीत, सुरुचि सिंह", "शूटिंग", "मिक्स्ड टीम 10 मीटर एयर पिस्टल"],
          ["20", "दिया चितले/मानुष शाह", "टेबल टेनिस", "मिक्स्ड डबल्स"],
          ["21", "मनप्रीत कौर", "एथलेटिक्स", "शॉट पुट"],
          ["22", "गुलवीर सिंह", "एथलेटिक्स", "मेंस 10000 मीटर"],
          ["23", "बरानिका इलांगोवन", "एथलेटिक्स", "वूमेंस पोल वॉल्ट"],
          ["24", "सावन बरवाल", "एथलेटिक्स", "मैराथन"],
          ["25", "तिलोत्तमा सेन, विदर्शा विनोद, आशि चौकसे", "शूटिंग", "वूमेंस 50 मीटर राइफल 3 पोजीशन"],
          ["26", "जोश्ना चिनप्पा, वेलवन सेंथिलकुमार", "स्क्वैश", "मिक्स्ड डबल्स"],
          ["27", "टीम इंडिया (महिला कबड्डी)", "कबड्डी", "वूमेंस"],
          ["28", "टीम इंडिया (पुरुष कबड्डी)", "कबड्डी", "मेंस"],
          ["29", "तजिंदर पाल सिंह तूर", "एथलेटिक्स", "शॉट पुट"],
          ["30", "पारुल चौधरी", "एथलेटिक्स", "वूमेंस 400मी"],
          ["31", "अभय सिंह", "स्क्वैश", "मेंस सिंगल्स"],
          ["32", "अनाहत सिंह", "स्क्वैश", "वूमेंस सिंगल्स"],
          ["33", "हरिता भद्रा", "एथलेटिक्स", "वूमेंस 200मी"],
          ["34", "एंसी सोजन", "एथलेटिक्स", "वूमेंस लॉन्ग जंप"],
          ["35", "तेजस्विन शंकर", "एथलेटिक्स", "डेकाथलॉन"],
          ["36", "पारुल चौधरी", "एथलेटिक्स", "वूमेंस 3000 मी स्टीपलचेज"],
          ["37", "सर्वेश कुशारे", "एथलेटिक्स", "मेंस हाई जंप"],
          ["38", "पिंकी बल्हारा", "कुराश", "वूमेंस -78 किग्रा"],
          ["39", "ईशा सिंह", "शूटिंग", "वूमेंस 25 मीटर पिस्टल"],
          ["40", "विथ्या रामराज", "एथलेटिक्स", "वूमेंस 400 मीटर हर्डल्स"],
          ["41", "गुलवीर सिंह", "एथलेटिक्स", "मेंस 1500 मीटर"],
          ["42", "पारुल चौधरी", "एथलेटिक्स", "वूमेंस 1500 मीटर"],
          ["43", "मुरली श्रीशंकर", "एथलेटिक्स", "मेंस लॉन्ग जंप"],
          ["44", "यशवीर सिंह", "एथलेटिक्स", "मेंस जैवलिन थ्रो"],
          ["45", "रोहित यादव", "एथलेटिक्स", "मेंस जैवलिन थ्रो"],
          ["46", "नीरू ढांडा, मनीषा कीर, आशिमा अहलावत", "शूटिंग", "वूमेंस ट्रैप टीम"],
          ["47", "नीरू ढांडा", "शूटिंग", "वूमेंस ट्रैप"],
          ["48", "नरेंद्र बेरवाल", "बॉक्सिंग", "मेंस +90किग्रा"]
        ]
      )
    ],
    bodyEn: [
      ...createBlocks([
        "### Asian Games 2026: Complete 48 Indian Medal Winners List",
        "Below is the complete official table of all 48 Indian medal winners at the 2026 Asian Games in Aichi-Nagoya, Japan:"
      ]),
      createTable(
        "tbl-complete-48-medallists-en",
        "2026 Asian Games Complete Indian Medal Winners List (1 to 48)",
        ["No.", "Athlete / Team", "Sport", "Event"],
        [
          ["1", "Elavenil Valarivan, Sonam Maskar, Vidarsa Vinod", "Shooting", "Women's 10m Air Rifle Team"],
          ["2", "Elavenil Valarivan", "Shooting", "Women's 10m Air Rifle"],
          ["3", "Rudrankksh Patil, Parth Mane, Himanshu Dhillon", "Shooting", "Men's 10m Air Rifle Team"],
          ["4", "Himanshu Dhillon", "Shooting", "Men's 10m Air Rifle"],
          ["5", "Rudrankksh Patil", "Shooting", "Men's 10m Air Rifle"],
          ["6", "Suchika Tariyal", "MMA", "Women's Traditional -60kg"],
          ["7", "Team India (Women's Cricket)", "Cricket", "Women's Team"],
          ["8", "Parinaaz Dhaliwal, Raiza Dhillon, Maheshwari Chauhan", "Shooting", "Women's Skeet Team"],
          ["9", "Anantjeet Singh Naruka, Gurjoat Siingh Khangura, Mairaj Ahmad Khan", "Shooting", "Men's Skeet Team"],
          ["10", "Jay Meena", "Soft Tennis", "Men's Singles"],
          ["11", "Mirabai Chanu", "Weightlifting", "Women's 49kg"],
          ["12", "Team India (Men's Badminton)", "Badminton", "Men's Team"],
          ["13", "Satnam Singh, Salman Khan", "Rowing", "Men's Double Sculls"],
          ["14", "Naorem Roshibina Devi", "Wushu", "Women's 60kg Sanda"],
          ["15", "Anantjeet Singh Naruka, Parinaaz Dhaliwal", "Shooting", "Mixed Skeet Team"],
          ["16", "Seema", "Athletics", "Women's 10,000m"],
          ["17", "Team India", "Athletics", "Mixed 4x400m Relay"],
          ["18", "Aishwary Pratap Singh Tomar, Rudrankksh Patil, Niraj Kumar", "Shooting", "Men's 50m Rifle 3-Positions"],
          ["19", "Kamaljeet, Suruchi Singh", "Shooting", "Mixed Team 10m Air Pistol"],
          ["20", "Diya Chitale, Manush Shah", "Table Tennis", "Mixed Doubles"],
          ["21", "Manpreet Kaur", "Athletics", "Shot Put"],
          ["22", "Gulveer Singh", "Athletics", "Men's 10,000m"],
          ["23", "Baranica Elangovan", "Athletics", "Women's Pole Vault"],
          ["24", "Sawan Barwal", "Athletics", "Marathon"],
          ["25", "Tilotama Sen, Vidarsa Vinod, Ashi Chouksey", "Shooting", "Women's 50m Rifle 3-Positions"],
          ["26", "Joshna Chinappa, Velavan Senthilkumar", "Squash", "Mixed Doubles"],
          ["27", "Team India (Women's Kabaddi)", "Kabaddi", "Women's Team"],
          ["28", "Team India (Men's Kabaddi)", "Kabaddi", "Men's Team"],
          ["29", "Tajinderpal Singh Toor", "Athletics", "Shot Put"],
          ["30", "Parul Chaudhary", "Athletics", "Women's 400m"],
          ["31", "Abhay Singh", "Squash", "Men's Singles"],
          ["32", "Anahat Singh", "Squash", "Women's Singles"],
          ["33", "Harita Bhadra", "Athletics", "Women's 200m"],
          ["34", "Ancy Sojan", "Athletics", "Women's Long Jump"],
          ["35", "Tejaswin Shankar", "Athletics", "Decathlon"],
          ["36", "Parul Chaudhary", "Athletics", "Women's 3000m Steeplechase"],
          ["37", "Sarvesh Kushare", "Athletics", "Men's High Jump"],
          ["38", "Pinky Balhara", "Kurash", "Women's -78kg"],
          ["39", "Esha Singh", "Shooting", "Women's 25m Pistol"],
          ["40", "Vithya Ramraj", "Athletics", "Women's 400m Hurdles"],
          ["41", "Gulveer Singh", "Athletics", "Men's 1500m"],
          ["42", "Parul Chaudhary", "Athletics", "Women's 1500m"],
          ["43", "Murali Sreeshankar", "Athletics", "Men's Long Jump"],
          ["44", "Yashvir Singh", "Athletics", "Men's Javelin Throw"],
          ["45", "Rohit Yadav", "Athletics", "Men's Javelin Throw"],
          ["46", "Neeru Dhanda, Manisha Keer, Aashima Ahlawat", "Shooting", "Women's Trap Team"],
          ["47", "Neeru Dhanda", "Shooting", "Women's Trap"],
          ["48", "Narendra Berwal", "Boxing", "Men's +90kg"]
        ]
      )
    ]
  };

  // -------------------------------------------------------------
  // SECTION 3: Shooter Profiles & Milestones
  // -------------------------------------------------------------
  const sec3ShooterProfiles = {
    _key: "sec-3-shooter-profiles",
    kind: "background",
    title: "भारतीय निशानेबाजों का परिचय एवं खेल यात्रा: हिमांशु ढिल्लों, रुद्राक्ष पाटिल और पार्थ माने",
    titleEn: "Profiles & Key Career Milestones of Indian Shooters: Himanshu, Rudrankksh & Parth",
    body: [
      ...createBlocks([
        "### हिमांशु ढिल्लों (Himanshu Dhillon) — पर्दापण में दोहरे पदक विजेता",
        "• **पहला एशियन गेम्स**: एशियन गेम्स 2026 हिमांशु ढिल्लों का पहला अंतर्राष्ट्रीय महाद्वीपीय खेल प्रतियोगिता (Debut Asian Games) था।",
        "• **दोहरा पदक**: उन्होंने अपने पर्दापण में ही **टीम सिल्वर (1890.1 अंक)** तथा **व्यक्तिगत सिल्वर** जीतकर असाधारण प्रतिभा दिखाई।",
        "### रुद्राक्ष पाटिल (Rudrankksh Patil) — पूर्व विश्व चैंपियन का दबदबा",
        "• **2022 विश्व चैंपियन**: रुद्राक्ष पाटिल ने मिस्र के काहिरा में आयोजित **2022 ISSF वर्ल्ड शूटिंग चैंपियनशिप** में 10 मीटर एयर राइफल का **गोल्ड मेडल** जीता था।",
        "• **2026 में दो पदक**: एशियन गेम्स 2026 में टीम सिल्वर और व्यक्तिगत कांस्य पदक जीतकर उन्होंने अपनी निरंतरता साबित की।",
        "### पार्थ माने (Parth Mane) — युवा निशानेबाजी सनसनी",
        "• **टीम का मुख्य आधार**: पार्थ माने ने 10 मीटर एयर राइफल क्वालिफिकेशन राउंड में लगातार स्थिर स्कोर बनाकर भारत के 1890.1 अंक के कुल योग में महती भूमिका निभाई।",
        "• **MPPSC परीक्षा अध्ययन संदर्भ**: अधिक खेल अध्ययन सामग्री के लिए हमारे [MPPSC खेलकूद एवं समसामयिकी नोट्स](/mppsc-current-affairs), [MPPSC प्रीलिम्स नोट्स](/mppsc-notes) तथा [MPPSC टॉपर कॉपी](/mppsc/toppers-copy) देखें।"
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
        "• **Dual Medalist at Nagoya 2026**: Won Team Silver and Individual Bronze."
      ])
    ]
  };

  // -------------------------------------------------------------
  // SECTION 4: Asian Games Facts, History & Host Cities
  // -------------------------------------------------------------
  const sec4AsianGamesFacts = {
    _key: "sec-4-asian-games-facts",
    kind: "keyHighlights",
    title: "एशियन गेम्स (Asian Games): इतिहास, संचालन संस्था (OCA) एवं भावी आयोजन स्थल",
    titleEn: "Asian Games Facts & History: Olympic Council of Asia (OCA) & Host Cities Timeline",
    body: [
      ...createBlocks([
        "### एशियन गेम्स का इतिहास एवं स्वरूप",
        "• **स्वरूप**: एशियन गेम्स (एशियाई खेल) एशिया महाद्वीप के देशों के बीच आयोजित होने वाली सर्वोच्च बहु-खेल प्रतियोगिता है।",
        "• **संचालन संस्था**: इसका आयोजन **ओलंपिक काउंसिल ऑफ एशिया (OCA - Olympic Council of Asia)** के तत्वावधान में प्रत्येक 4 वर्ष में किया जाता है। OCA का मुख्यालय **कुवैत सिटी (Kuwait City)** में स्थित है।",
        "### प्रथम एशियन गेम्स एवं भारत की मेजबानी (1951 नई दिल्ली)",
        "• **प्रथम संस्करण**: पहले एशियन गेम्स का आयोजन **वर्ष 1951 में नई दिल्ली, भारत** में हुआ था। उद्घाटन राष्ट्रपति **डॉ. राजेंद्र प्रसाद** ने ध्यानचंद नेशनल स्टेडियम में किया था।",
        "• **भारत की दूसरी मेजबानी**: भारत ने **1982 (9वें एशियन गेम्स)** की मेजबानी पुनः नई दिल्ली में की थी (शुभंकर: अप्पू हाथी)।",
        "### एशियन गेम्स के हालिया एवं भावी आयोजन स्थल (Host Cities Timeline)",
        "• **19वाँ संस्करण (2023)**: हांगझोऊ, चीन (Hangzhou, China)",
        "• **20वाँ संस्करण (2026)**: आइची-नागोया, जापान (Aichi-Nagoya, Japan)",
        "• **21वाँ संस्करण (2030)**: दोहा, कतर (Doha, Qatar)",
        "• **22वाँ संस्करण (2034)**: रियाद, सऊदी अरब (Riyadh, Saudi Arabia)",
        "• **ज्ञान हब संदर्भ**: हमारे [सामान्य ज्ञान हब](/general-awareness) पर अंतर्राष्ट्रीय खेल संगठनों की संपूर्ण सूची देखें।"
      ]),
      createTable(
        "tbl-asian-games-hosts",
        "एशियन गेम्स: प्रमुख संस्करणों एवं मेज़बान शहरों की सारणी (Asian Games Timeline & Host Cities)",
        ["वर्ष (Year)", "संस्करण (Edition)", "मेज़बान शहर व देश (Host City & Country)", "महत्वपूर्ण तथ्य (Key Highlight)"],
        [
          ["**1951**", "1st Asian Games", "नई दिल्ली, भारत (New Delhi, India)", "प्रथम एशियन गेम्स (11 प्रतिभागी देश)"],
          ["**1982**", "9th Asian Games", "नई दिल्ली, भारत (New Delhi, India)", "भारत में दूसरी बार आयोजन (अपोलो/अप्पू शुभंकर)"],
          ["**2023**", "19th Asian Games", "हांगझोऊ, चीन (Hangzhou, China)", "भारत का रिकॉर्ड 107 पदकों का सर्वश्रेष्ठ प्रदर्शन"],
          ["**2026**", "20th Asian Games", "आइची-नागोया, जापान (Aichi-Nagoya, Japan)", "48 पदक (5 स्वर्ण, 21 रजत, 22 कांस्य)"],
          ["**2030**", "21st Asian Games", "दोहा, कतर (Doha, Qatar)", "पश्चिम एशिया में दूसरा आयोजन"],
          ["**2034**", "22nd Asian Games", "रियाद, सऊदी अरब (Riyadh, Saudi Arabia)", "सऊदी अरब में पहला आयोजन"]
        ]
      ),
      infographicImageBlock
    ],
    bodyEn: [
      ...createBlocks([
        "### Overview of Asian Games",
        "• **Definition**: Premier continental multi-sport competition for Asian nations.",
        "• **Governing Body**: Governed by **Olympic Council of Asia (OCA)**, headquartered in **Kuwait City**.",
        "### Host Cities Timeline (2023 to 2034)",
        "• **2023 (19th Edition)**: Hangzhou, China",
        "• **2026 (20th Edition)**: Aichi-Nagoya, Japan",
        "• **2030 (21st Edition)**: Doha, Qatar",
        "• **2034 (22nd Edition)**: Riyadh, Saudi Arabia"
      ])
    ]
  };

  // -------------------------------------------------------------
  // SECTION 5: High-Yield MPPSC & UPSC Exam Notes
  // -------------------------------------------------------------
  const sec5ExamNotes = {
    _key: "sec-5-exam-notes",
    kind: "background",
    title: "MPPSC और UPSC परीक्षा के लिए अति-महत्वपूर्ण तथ्य (Quick Revision Exam Notes)",
    titleEn: "High-Yield MPPSC & UPSC Exam Points (Quick Revision)",
    body: [
      ...createBlocks([
        "### MPPSC प्रारंभिक परीक्षा (Unit 8: खेलकूद एवं समसामयिकी) विशेष पॉइंटर्स",
        "• **प्रश्‍न**: एशियन गेम्स 2026 का आयोजन स्थल कौन सा शहर है? — **उत्तर**: आइची-नागोया, जापान (Aichi-Nagoya, Japan)।",
        "• **प्रश्‍न**: पुरुषों की 10 मीटर एयर राइफल टीम स्पर्धा का सिल्वर मेडल किसने जीता? — **उत्तर**: भारत (रुद्राक्ष पाटिल, पार्थ माने, हिमांशु ढिल्लों - 1890.1 अंक)।",
        "• **प्रश्‍न**: 2022 के 10 मीटर एयर राइफल वर्ल्ड चैंपियन कौन थे? — **उत्तर**: रुद्राक्ष पाटिल (Rudrankksh Patil)।",
        "• **प्रश्‍न**: शूटिंग में 2026 खेलों का पहला व्यक्तिगत स्वर्ण किसने जीता? — **उत्तर**: नीरू ढांडा (Neeru Dhanda - महिला ट्रैप)।",
        "• **प्रश्‍न**: प्रथम एशियन गेम्स का आयोजन कब और कहाँ हुआ? — **उत्तर**: 1951, नई दिल्ली, भारत।",
        "• **कोर्स व टेस्ट सीरीज संदर्भ**: MPPSC की तैयारी हेतु [Aakar IAS ऑनलाइन कोचिंग कोर्सेस](/online-courses), [Aakar IAS ऑफलाइन बैचेस](/offline-courses), [MPPSC टेस्ट सीरीज](/test-series) तथा [MPPSC PYQ (पिछले वर्षों के प्रश्न पत्र)](/mppsc/previous-year-papers) का अभ्यास करें।"
      ])
    ],
    bodyEn: [
      ...createBlocks([
        "### Key Exam Points for MPPSC & UPSC Prelims",
        "• **Host Venue 2026**: Aichi-Nagoya, Japan (20th Asian Games).",
        "• **India's 10m Air Rifle Team Score**: 1890.1 points (Silver Medal).",
        "• **First Individual Shooting Gold**: Neeru Dhanda in Women's Trap (Sept 29, 2026).",
        "• **First Asian Games**: 1951, New Delhi, India."
      ])
    ]
  };

  // 10 Collapsible FAQs
  const faqs = [
    {
      question: "2026 एशियन गेम्स में भारत के कुल कितने एथलीट/टीमें पदक विजेता बने हैं?",
      questionEn: "How many total athletes/teams won medals for India at 2026 Asian Games?",
      answer: "एशियन गेम्स 2026 (आइची-नागोया, जापान) में भारत के कुल 48 एथलीटों एवं टीमों ने विभिन्न स्पर्धाओं में पदक (5 स्वर्ण, 21 रजत, 22 कांस्य) जीते हैं।",
      answerEn: "At the 2026 Asian Games, a total of 48 Indian athletes and teams secured medals across various events."
    },
    {
      question: "एशियन गेम्स 2026 में 10 मीटर एयर राइफल टीम स्पर्धा का पदक विजेता कौन है?",
      questionEn: "Who won the medal in 10m Air Rifle Team at 2026 Asian Games?",
      answer: "रुद्राक्ष पाटिल, पार्थ माने और हिमांशु ढिल्लों की भारतीय जोड़ी ने 1890.1 अंकों के साथ पुरुषों की 10 मीटर एयर राइफल टीम स्पर्धा में सिल्वर मेडल (रजत पदक) जीता।",
      answerEn: "Rudrankksh Patil, Parth Mane, and Himanshu Dhillon won Silver in Men's 10m Air Rifle Team event."
    },
    {
      question: "नीरू ढांडा ने एशियन गेम्स 2026 में कौन से पदक जीते?",
      questionEn: "Which medals did Neeru Dhanda win at 2026 Asian Games?",
      answer: "नीरू ढांडा ने महिलाओं की व्यक्तिगत ट्रैप शूटिंग में स्वर्ण पदक (Gold) तथा नीरू ढांडा, मनीषा कीर व आशिमा अहलावत की टीम ने महिला ट्रैप टीम स्पर्धा में रजत पदक (Silver) जीता।",
      answerEn: "Neeru Dhanda won Individual Trap Gold and Women's Trap Team Silver."
    },
    {
      question: "एशियन गेम्स 2026 में महिला क्रिकेट में भारत का क्या प्रदर्शन रहा?",
      questionEn: "What was India's performance in Women's Cricket at 2026 Asian Games?",
      answer: "भारतीय महिला क्रिकेट टीम (टीम इंडिया) ने एशियन गेम्स 2026 में स्वर्ण पदक (Gold Medal) अपने नाम किया।",
      answerEn: "The Indian Women's Cricket Team won the Gold Medal at the 2026 Asian Games."
    },
    {
      question: "एशियन गेम्स 2026 में पुरुषों व महिलाओं की कबड्डी में भारत का प्रदर्शन कैसा रहा?",
      questionEn: "How did Indian Kabaddi teams perform at 2026 Asian Games?",
      answer: "भारतीय पुरुष कबड्डी टीम और भारतीय महिला कबड्डी टीम दोनों ने अपने-अपने वर्गों में स्वर्ण पदक (Gold Medals) प्राप्त किए।",
      answerEn: "Both Indian Men's and Women's Kabaddi teams bagged Gold Medals in their respective events."
    },
    {
      question: "2022 के 10 मीटर एयर राइफल वर्ल्ड चैंपियन कौन थे?",
      questionEn: "Who was the 2022 10m Air Rifle World Champion?",
      answer: "रुद्राक्ष पाटिल (Rudrankksh Patil) ने 2022 ISSF वर्ल्ड शूटिंग चैंपियनशिप में 10m एयर राइफल का गोल्ड मेडल जीता था।",
      answerEn: "Rudrankksh Patil won the 10m Air Rifle World Championship Gold in 2022."
    },
    {
      question: "एशियन गेम्स 2026 का आयोजन कहाँ और कब हो रहा है?",
      questionEn: "Where and when are Asian Games 2026 being held?",
      answer: "20वें एशियाई खेलों का आयोजन 19 सितंबर से 4 अक्टूबर 2026 तक आइची-नागोया, जापान (Aichi-Nagoya, Japan) में हो रहा है।",
      answerEn: "The 20th Asian Games are taking place in Aichi-Nagoya, Japan from September 19 to October 4, 2026."
    },
    {
      question: "प्रथम एशियाई खेलों (1951) का आयोजन कहाँ हुआ था?",
      questionEn: "Where were the first Asian Games held in 1951?",
      answer: "प्रथम एशियाई खेलों का आयोजन 1951 में नई दिल्ली, भारत में हुआ था।",
      answerEn: "The first Asian Games were held in New Delhi, India in 1951."
    },
    {
      question: "आगामी 2030 और 2034 के एशियन गेम्स कहाँ आयोजित होंगे?",
      questionEn: "Where will the 2030 and 2034 Asian Games take place?",
      answer: "2030 के एशियन गेम्स दोहा (कतर) में तथा 2034 के एशियन गेम्स रियाद (सऊदी अरब) में आयोजित होंगे।",
      answerEn: "The 2030 Asian Games will be held in Doha (Qatar), and 2034 in Riyadh (Saudi Arabia)."
    },
    {
      question: "यह जानकारी MPPSC एवं UPSC परीक्षा के लिए क्यों आवश्यक है?",
      questionEn: "Why is this essential for MPPSC and UPSC exams?",
      answer: "MPPSC Prelims (Unit 8: खेलकूद व समसामयिकी) और Mains (General Awareness) के साथ-साथ UPSC prelims में पदक विजेताओं और रिकॉर्ड्स पर प्रश्न आते हैं।",
      answerEn: "MPPSC Prelims Unit 8 and UPSC General Awareness test questions directly on Asian Games medalists and sports records."
    }
  ];

  // 8 Practice MCQs (Quizzes)
  const mcqs = [
    {
      question: "2026 एशियन गेम्स (आइची-नागोया) में भारत के कुल कितने पदक विजेताओं की सूची दर्ज की गई है?",
      questionEn: "How many total medal winners are listed for India at the 2026 Asian Games?",
      options: ["35 एथलीट/टीमें", "40 एथलीट/टीमें", "48 एथलीट/टीमें", "52 एथलीट/टीमें"],
      optionsEn: ["35 Athletes/Teams", "40 Athletes/Teams", "48 Athletes/Teams", "52 Athletes/Teams"],
      correctIndex: 2,
      explanation: "2026 एशियन गेम्स में भारत के कुल 48 एथलीटों व टीमों की सूची में 5 स्वर्ण, 21 रजत और 22 कांस्य शामिल हैं।",
      explanationEn: "India secured 48 total medals (5 Gold, 21 Silver, 22 Bronze) at the 2026 Asian Games."
    },
    {
      question: "एशियन गेम्स 2026 में पुरुषों की 10 मीटर एयर राइफल टीम स्पर्धा में भारत की ओर से किन निशानेबाजों ने भाग लिया?",
      questionEn: "Which shooters represented India in Men's 10m Air Rifle Team event at 2026 Asian Games?",
      options: ["एलावेनिल, सोनम, विदर्शा", "रुद्राक्ष पाटिल, पार्थ माने, हिमांशु ढिल्लों", "अनंतजीत, भवतेग, मैराज", "कमलजीत, सुरुचि"],
      optionsEn: ["Elavenil, Sonam, Vidarsa", "Rudrankksh Patil, Parth Mane, Himanshu Dhillon", "Anantjeet, Gurjoat, Mairaj", "Kamaljeet, Suruchi"],
      correctIndex: 1,
      explanation: "रुद्राक्ष पाटिल, पार्थ माने और हिमांशु ढिल्लों ने 1890.1 अंकों के साथ सिल्वर मेडल जीता।",
      explanationEn: "Rudrankksh Patil, Parth Mane, and Himanshu Dhillon won Team Silver with 1890.1 points."
    },
    {
      question: "2026 एशियन गेम्स में महिलाओं की 10मी एयर राइफल टीम स्पर्धा में कांस्य/रजत पदक प्राप्त करने वाली भारतीय तिकड़ी कौन सी है?",
      questionEn: "Which Indian trio won a medal in Women's 10m Air Rifle Team event?",
      options: ["एलावेनिल वलारिवन, सोनम मास्कर, विदर्शा विनोद", "परिनाज, रायजा, माहेश्वरी", "तिलोत्तमा, विदर्शा, आशि", "नीरू, मनीषा, आशिमा"],
      optionsEn: ["Elavenil Valarivan, Sonam Maskar, Vidarsa Vinod", "Parinaaz, Raiza, Maheshwari", "Tilotama, Vidarsa, Ashi", "Neeru, Manisha, Aashima"],
      correctIndex: 0,
      explanation: "एलावेनिल वलारिवन, सोनम मास्कर और विदर्शा विनोद ने वूमेंस 10मी एयर राइफल टीम स्पर्धा में पदक जीता।",
      explanationEn: "Elavenil Valarivan, Sonam Maskar, and Vidarsa Vinod won the medal in Women's 10m Air Rifle Team."
    },
    {
      question: "एशियन गेम्स 2026 में भारत की महिला क्रिकेट टीम ने कौन सा पदक हासिल किया?",
      questionEn: "Which medal did India's Women's Cricket Team win at Asian Games 2026?",
      options: ["गोल्ड मेडल", "सिल्वर मेडल", "कांस्य मेडल", "कोई पदक नहीं"],
      optionsEn: ["Gold Medal", "Silver Medal", "Bronze Medal", "No Medal"],
      correctIndex: 0,
      explanation: "भारतीय महिला क्रिकेट टीम (टीम इंडिया) ने वूमेंस क्रिकेट स्पर्धा में स्वर्ण पदक जीता।",
      explanationEn: "Team India won Gold Medal in Women's Cricket."
    },
    {
      question: "एशियन गेम्स 2026 में मुक्केबाजी के +90 किग्रा (सुपर हैवीवेट) वर्ग में भारत के लिए कांस्य पदक किसने प्राप्त किया?",
      questionEn: "Who won Bronze for India in Men's +90kg Boxing at 2026 Asian Games?",
      options: ["नरेंद्र बेरवाल", "सचिन सिवाच", "अंकुश पंघाल", "दीपक भोरिया"],
      optionsEn: ["Narendra Berwal", "Sachin Siwach", "Ankush Panghal", "Deepak Bhoria"],
      correctIndex: 0,
      explanation: "नरेंद्र बेरवाल ने पुरुषों के +90किग्रा मुक्केबाजी वर्ग में कांस्य पदक हासिल किया।",
      explanationEn: "Narendra Berwal won Bronze in Men's +90kg Boxing."
    },
    {
      question: "10 मीटर एयर पिस्टल मिक्स्ड टीम स्पर्धा में स्वर्ण पदक जीतने वाली भारतीय जोड़ी कौन सी है?",
      questionEn: "Which pair won Gold in 10m Air Pistol Mixed Team event?",
      options: ["कमलजीत, सुरुचि सिंह", "दिया चितले, मानुष शाह", "अनंतजीत, परिनाज", "सतनाम, सलमान"],
      optionsEn: ["Kamaljeet, Suruchi Singh", "Diya Chitale, Manush Shah", "Anantjeet, Parinaaz", "Satnam, Salman"],
      correctIndex: 0,
      explanation: "कमलजीत और सुरुचि सिंह ने मिक्स्ड टीम 10 मीटर एयर पिस्टल स्पर्धा में स्वर्ण पदक जीता।",
      explanationEn: "Kamaljeet and Suruchi Singh won Gold in 10m Air Pistol Mixed Team."
    },
    {
      question: "2026 एशियन गेम्स में वूमेंस ट्रैप निशानेबाजी स्पर्धा में स्वर्ण पदक विजेता कौन हैं?",
      questionEn: "Who won Gold in Women's Trap Shooting at Asian Games 2026?",
      options: ["नीरू ढांडा", "मनीषा कीर", "आशिमा अहलावत", "ईशा सिंह"],
      optionsEn: ["Neeru Dhanda", "Manisha Keer", "Aashima Ahlawat", "Esha Singh"],
      correctIndex: 0,
      explanation: "नीरू ढांडा ने महिलाओं की व्यक्तिगत ट्रैप स्पर्धा में स्वर्ण पदक जीता।",
      explanationEn: "Neeru Dhanda won Gold in Women's Individual Trap."
    },
    {
      question: "प्रथम एशियाई खेलों (Inaugural Asian Games) का आयोजन किस वर्ष एवं शहर में हुआ था?",
      questionEn: "In which year and city were the first inaugural Asian Games organized?",
      options: ["1951, नई दिल्ली", "1954, मनीला", "1958, टोक्यो", "1962, जकार्ता"],
      optionsEn: ["New Delhi, 1951", "Manila, 1954", "Tokyo, 1958", "Jakarta, 1962"],
      correctIndex: 0,
      explanation: "प्रथम एशियाई खेलों का आयोजन वर्ष 1951 में नई दिल्ली, भारत में किया गया था।",
      explanationEn: "The inaugural Asian Games were organized in New Delhi, India in 1951."
    }
  ];

  // Slugs, Titles & High Intent Keyword Targets
  const docSlug = "asian-games-2026-10m-air-rifle-india-medals-himanshu-dhillon-rudrankksh-patil";
  const docTitleHi = "MPPSC & UPSC: 2026 एशियन गेम्स में भारतीय पदक विजेताओं की संपूर्ण सूची (Asian Games 2026 Indian Medal Winners List 1 to 48) | 10m एयर राइफल व नीरू ढांडा गोल्ड";
  const docTitleEn = "MPPSC & UPSC: 2026 Asian Games Indian Medal Winners List (Full 1 to 48 Medallists Table) | 10m Air Rifle & Complete Winners";
  const docExcerptHi = "2026 एशियन गेम्स (Asian Games 2026 Aichi-Nagoya, Japan) में भारतीय पदक विजेताओं की संपूर्ण 48 विजेताओं की प्रामाणिक सूची (1 से 48)। एलावेनिल वलारिवन, रुद्राक्ष पाटिल, पार्थ माने, हिमांशु ढिल्लों, नीरू ढांडा, मीराबाई चानू, टीम इंडिया क्रिकेट व कबड्डी तथा नरेंद्र बेरवाल सहित सभी एथलीटों व स्पर्धाओं का विस्तृत विवरण देखें।";
  const docExcerptEn = "Complete official list of all 48 Indian medal winners (1 to 48) at the 2026 Asian Games in Aichi-Nagoya, Japan. Features Elavenil Valarivan, Rudrankksh Patil, Parth Mane, Himanshu Dhillon, Neeru Dhanda, Mirabai Chanu, Team India Cricket/Kabaddi, and all medalled events with MPPSC notes.";

  const keywordsArray = [
    "2026 एशियन गेम्स में भारतीय पदक विजेताओं की सूची",
    "asian games 2026 indian medal winners list",
    "asian games 2026 medal tally",
    "asian games 2026 india medal tally",
    "asian games 2026 medal tally table",
    "asian games 2026 medal list india winners list",
    "asian games 2026 held in which country in hindi",
    "asian games 2026 cricket schedule in hindi",
    "asian games 2026 cricket in hindi",
    "asian games 2026 cricket team list hindi",
    "asian games 2026 cricket schedule time table hindi",
    "asian games 2026 cricket india squad hindi",
    "asian games 2026 kya hai in hindi",
    "asian games 2026 india squad hindi",
    "asian games 2026 schedule in hindi",
    "asian games 2026 current affairs hindi",
    "mppsc current affairs asian games 2026",
    "mppsc prelims unit 8 sports asian games",
    "neeru dhanda gold medal asian games 2026",
    "vithya ramraj 400m hurdles record pt usha",
    "himanshu dhillon rudrankksh patil air rifle",
    "last asian games medal tally",
    "india gold medal in asian games",
    "asian games 2026 india medal hopes",
    "india in asian games 2026",
    "asian games india"
  ];

  const docIds = [
    "ca-asian-games-2026-10m-air-rifle-india",
    "gk-asian-games-2026-10m-air-rifle-india"
  ];

  for (const docId of docIds) {
    const isCA = docId.startsWith("ca-");
    console.log(`📌 Publishing Updated Document with 48 Winners List to Sanity: ${docId} (${isCA ? "currentAffairs" : "staticGk"})...`);

    const docPayload: any = {
      _type: isCA ? "currentAffairs" : "staticGk",
      title: cleanText(docTitleHi),
      titleEn: cleanText(docTitleEn),
      slug: { _type: "slug", current: docSlug },
      publishedAt: "2026-09-29T10:00:00.000Z",
      excerpt: cleanText(docExcerptHi),
      excerptEn: cleanText(docExcerptEn),
      featuredImage: featuredImageObj,
      mainImage: featuredImageObj,
      author: { _type: "reference", _ref: authorId },
      tags: [
        { _type: "reference", _ref: sportsTagId, _key: "ref-tag-sports" },
        { _type: "reference", _ref: mppscTagId, _key: "ref-tag-mppsc" },
        { _type: "reference", _ref: upscTagId, _key: "ref-tag-upsc" },
      ],
      seoTitle: cleanText("2026 एशियन गेम्स में भारतीय पदक विजेताओं की संपूर्ण सूची (1 से 48) | MPPSC"),
      seoTitleEn: cleanText("2026 Asian Games Indian Medal Winners List (1 to 48) | MPPSC & UPSC"),
      metaDescription: cleanText(docExcerptHi),
      metaDescriptionEn: cleanText(docExcerptEn),
      keywords: keywordsArray,
      sections: [
        sec0OverallTally,
        sec1AirRifleCoverage,
        sec2Complete48List,
        sec3ShooterProfiles,
        sec4AsianGamesFacts,
        sec5ExamNotes,
      ],
      mcqs: mcqs,
      faqs: faqs,
      nextArticle: {
        title: "अरिहा पंगमबम ने एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप में जीता ऐतिहासिक गोल्ड मेडल",
        titleEn: "Ariha Pangambam Wins Historic Gold at Asian Aerobic Gymnastics Championship",
        href: "/current-affairs/ariha-pangambam-asian-aerobic-gymnastics-championship-gold-medal",
      },
    };

    await client.createOrReplace({
      _id: docId,
      ...docPayload,
    });

    console.log(`✅ Document ${docId} successfully updated with complete 48 Medallists List!`);
  }

  // Bi-directional Cross-Linking
  const arihaCaDoc = await client.getDocument("ca-ariha-pangambam-asian-gymnastics-gold-2026");
  if (arihaCaDoc) {
    console.log("🔗 Updating Ariha Pangambam article cross-link...");
    await client.patch("ca-ariha-pangambam-asian-gymnastics-gold-2026")
      .set({
        nextArticle: {
          title: docTitleHi,
          titleEn: docTitleEn,
          href: `/current-affairs/${docSlug}`
        }
      })
      .commit();
    console.log("✔ Cross-link confirmed!");
  }

  console.log("🎉 COMPLETE 48 MEDALLISTS LIST UPDATE & PUBLISH SUCCESSFUL!");
}

main().catch((err) => {
  console.error("❌ Failed to update 48 Medallists List:", err);
  process.exit(1);
});
