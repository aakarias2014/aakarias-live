import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

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
  console.log("🚀 Starting Upload/Update of Complete Asian Games 2026 Article (10m Air Rifle + Sept 29 Medal Tally)...");

  // Fetch Existing Image Asset from Sanity
  const imageAssets = await client.fetch(`*[_type == "sanity.imageAsset"][0..5]._id`);
  if (!imageAssets || imageAssets.length === 0) {
    throw new Error("No image asset found in Sanity!");
  }
  const validImageAssetId = imageAssets[0];
  console.log(`📸 Using valid Sanity Image Asset ID: ${validImageAssetId}`);

  // Author
  let authorId = "author-aakar-ias-team";
  await client.createIfNotExists({
    _id: authorId,
    _type: "author",
    name: "Aakar IAS Team",
    role: "Senior Editorial & Subject Specialist",
    bio: "Chief Editor specializing in MPPSC & UPSC Current Affairs, Polity, Science & Sports Awareness.",
  });

  // Tags
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

  const featuredImageObj = {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: validImageAssetId,
    },
    alt: "Asian Games 2026 India Medal Tally Table and 10m Air Rifle Winners",
  };

  // -------------------------------------------------------------
  // SECTION 0: Overall Medal Tally & Sept 29 News
  // -------------------------------------------------------------
  const sec0OverallTally = {
    _key: "sec-0-overall-tally",
    title: "एशियन गेम्स 2026: भारत की समग्र पदक तालिका एवं नवीनतम अपडेट (Asian Games 2026 India Medal Tally Overview)",
    titleEn: "Asian Games 2026: India's Overall Medal Tally & Latest Updates",
    content: createBlocks([
      "जापान के **आइची-नागोया (Aichi-Nagoya, Japan)** में आयोजित 20वें एशियाई खेल (19 सितंबर से 4 अक्टूबर 2026) में भारतीय खिलाड़ियों का उत्कृष्ट प्रदर्शन निरंतर जारी है। 29 सितंबर 2026 (Day 11) तक भारत ने **5 स्वर्ण (Gold 🥇), 21 रजत (Silver 🥈) और 22 कांस्य (Bronze 🥉)** सहित कुल **48 पदक** जीत लिए हैं।",
      "29 सितंबर 2026 को भारत की निशानेबाज **नीरू ढांडा (Neeru Dhanda)** ने महिलाओं की व्यक्तिगत ट्रैप शूटिंग में **स्वर्ण पदक** हासिल किया, जो 2026 खेलों में शूटिंग में भारत का पहला व्यक्तिगत गोल्ड मेडल है। इसी दिन महिला ट्रैप टीम (नीरू ढांडा, मनीषा कीर व प्रीति रजक) ने **रजत पदक** और मुक्केबाज **नरेंद्र बेरवाल (Narendra Berwal)** ने पुरुषों के +92 किग्रा सुपर हैवीवेट में **कांस्य पदक** अर्जित किया।",
      "प्रतियोगी परीक्षाओं के लिए [MPPSC समसामयिकी नोट्स](/mppsc-current-affairs) तथा [सामान्य जागरूकता अध्ययन सामग्री](/general-awareness) के अंतर्गत खेलकूद के ये आंकड़े अत्यंत महत्वपूर्ण हैं।"
    ]),
    contentEn: createBlocks([
      "At the 20th Asian Games (September 19 to October 4, 2026) in **Aichi-Nagoya, Japan**, Team India has maintained an exceptional performance. As of September 29, 2026 (Day 11), India's total medal count reached **48 medals** (5 Gold 🥇, 21 Silver 🥈, 22 Bronze 🥉).",
      "On September 29, 2026, shooter **Neeru Dhanda** clinched the **Gold Medal** in Women's Individual Trap, marking India's first individual shooting Gold of the 2026 Games. On the same day, the Women's Trap Team secured Silver, and boxer **Narendra Berwal** earned Bronze in +92kg Super Heavyweight Boxing.",
      "For exam prep, explore [MPPSC Current Affairs Notes](/mppsc-current-affairs) and [General Awareness Prep](/general-awareness)."
    ]),
    table: createTable(
      "tbl-overall-tally",
      "एशियन गेम्स 2026: भारत की समग्र पदक तालिका (India's Overall Medal Tally as of Sept 29, 2026)",
      ["पदक श्रेणी (Medal Category)", "पदक संख्या (Total Count)"],
      [
        ["स्वर्ण पदक (Gold 🥇)", "5"],
        ["रजत पदक (Silver 🥈)", "21"],
        ["कांस्य पदक (Bronze 🥉)", "22"],
        ["**कुल योग (TOTAL MEDALS)**", "**48**"]
      ]
    )
  };

  // -------------------------------------------------------------
  // SECTION 1: Men's 10m Air Rifle Detailed Coverage (ORIGINAL CONTENT PRESERVED)
  // -------------------------------------------------------------
  const sec1AirRifleCoverage = {
    _key: "sec-1-air-rifle-coverage",
    title: "पुरुषों की 10 मीटर एयर राइफल स्पर्धा: हिमांशु ढिल्लों, रुद्राक्ष पाटिल व पार्थ माने की ऐतिहासिक सफलता",
    titleEn: "Men's 10m Air Rifle Event: Historic Triumph for Himanshu Dhillon, Rudrankksh Patil & Parth Mane",
    content: createBlocks([
      "### 10 मीटर एयर राइफल टीम स्पर्धा में सिल्वर मेडल (1890.1 अंक)",
      "• **टीम स्पर्धा परिणाम**: 10 मीटर एयर राइफल (Men's 10m Air Rifle Team) स्पर्धा में भारतीय त्रयी **हिमांशु ढिल्लों (Himanshu Dhillon)**, **रुद्राक्ष पाटिल (Rudrankksh Patil)** और **पार्थ माने (Parth Mane)** ने कुल **1890.1 अंक** हासिल कर भारत को **रजत पदक (Silver Medal)** दिलाया।",
      "• **प्रतिद्वंद्वी देशों का प्रदर्शन**: चीन ने **1899.0 अंक** के साथ स्वर्ण पदक (Gold Medal) जीता, जबकि दक्षिण कोरिया की टीम ने **1884.2 अंक** के साथ कांस्य पदक (Bronze Medal) हासिल किया।",
      "• **संबंधित खेल लेख**: [अरिहा पंगमबम एशियन जिम्नास्टिक गोल्ड मेडल](/current-affairs/ariha-pangambam-asian-aerobic-gymnastics-championship-gold-medal) की तरह यह लेख भी खेल जागरूकता हेतु उपयोगी है।",
      "### 10 मीटर एयर राइफल व्यक्तिगत स्पर्धा: दोहरे पदक की गूँज",
      "• **हिमांशु ढिल्लों का डेब्यू में सिल्वर**: अपने पहले एशियन गेम्स (Debut Asian Games) में भाग ले रहे युवा निशानेबाज **हिमांशु ढिल्लों** ने 10m एयर राइफल व्यक्तिगत स्पर्धा का **रजत पदक (Silver Medal)** जीतकर इतिहास रच दिया।",
      "• **रुद्राक्ष पाटिल का कांस्य पदक**: 2022 के 10 मीटर एयर राइफल वर्ल्ड चैंपियन **रुद्राक्ष पाटिल** ने अंतिम राउंड में जबरदस्त एकाग्रता का परिचय देते हुए **कांस्य पदक (Bronze Medal)** अपने नाम किया।",
      "• **स्वर्ण पदक विजेता**: चीन के ओलंपिक पदक विजेता **शेंग लिहाओ (Sheng Lihao)** ने व्यक्तिगत स्पर्धा में **गोल्ड मेडल** हासिल किया।"
    ]),
    contentEn: createBlocks([
      "### Men's 10m Air Rifle Team Silver (1890.1 Points)",
      "• **Team Event**: The Indian trio of **Himanshu Dhillon**, **Rudrankksh Patil**, and **Parth Mane** secured the **Silver Medal** with a total score of **1890.1 points**.",
      "• **Competitors**: China won Gold with **1899.0 points**, while South Korea claimed Bronze with **1884.2 points**.",
      "• **Related Article**: Read our [Ariha Pangambam Asian Gymnastics Gold Medal](/current-affairs/ariha-pangambam-asian-aerobic-gymnastics-championship-gold-medal) sports notes.",
      "### Individual Double Medal Feat",
      "• **Himanshu Dhillon's Debut Silver**: In his debut Asian Games, **Himanshu Dhillon** clinched the Individual **Silver Medal**.",
      "• **Rudrankksh Patil's Bronze**: 2022 World Champion **Rudrankksh Patil** bagged the Individual **Bronze Medal**.",
      "• **Gold Medalist**: China's **Sheng Lihao** captured the Individual Gold Medal."
    ]),
    table: createTable(
      "tbl-air-rifle-team-results",
      "एशियन गेम्स 2026: पुरुषों की 10m एयर राइफल टीम स्पर्धा परिणाम",
      ["पदक (Medal)", "देश (Country)", "निशानेबाज (Shooters)", "कुल अंक (Total Score)"],
      [
        ["गोल्ड (Gold 🥇)", "चीन (China)", "शेंग लिहाओ, ली हाओ, झांग बोवेन", "1899.0 अंक"],
        ["सिल्वर (Silver 🥈)", "भारत (India)", "हिमांशु ढिल्लों, रुद्राक्ष पाटिल, पार्थ माने", "1890.1 अंक"],
        ["कांस्य (Bronze 🥉)", "दक्षिण कोरिया (South Korea)", "पार्क हा-जुन, किम संग-डू, शिन ह्यून-वू", "1884.2 अंक"]
      ]
    )
  };

  // -------------------------------------------------------------
  // SECTION 2: Shooter Profiles & Milestones (ORIGINAL CONTENT PRESERVED)
  // -------------------------------------------------------------
  const sec2ShooterProfiles = {
    _key: "sec-2-shooter-profiles",
    title: "भारतीय निशानेबाजों का परिचय एवं करियर उपलब्धियां: हिमांशु ढिल्लों, रुद्राक्ष पाटिल व पार्थ माने",
    titleEn: "Profiles & Key Milestones of Indian Shooters: Himanshu Dhillon, Rudrankksh Patil & Parth Mane",
    content: createBlocks([
      "### हिमांशु ढिल्लों (Himanshu Dhillon) — पर्दापण में दोहरे पदक विजेता",
      "• **डेब्यू एशियन गेम्स**: हिमांशु ढिल्लों के लिए एशियन गेम्स 2026 उनका पहला अंतर्राष्ट्रीय महाद्वीपीय खेल प्रतियोगिता (Debut Asian Games) था।",
      "• **दोहरा पदक**: उन्होंने अपने पहले ही एशियाई खेलों में **टीम सिल्वर (1890.1 अंक)** तथा **व्यक्तिगत सिल्वर** जीतकर असाधारण प्रतिभा दिखाई।",
      "• **तकनीकी सटीकता**: प्रेशर सीरीज़ में हिमांशु ने 10.8 और 10.9 के परफेक्ट शॉट्स लगाकर व्यक्तिगत सिल्वर पक्का किया।",
      "### रुद्राक्ष पाटिल (Rudrankksh Patil) — पूर्व विश्व चैंपियन की निरन्तरता",
      "• **2022 विश्व चैंपियन**: रुद्राक्ष पाटिल ने मिस्र के काहिरा में आयोजित **2022 ISSF वर्ल्ड शूटिंग चैंपियनशिप** में 10m एयर राइफल का **गोल्ड मेडल** जीता था।",
      "• **2026 में दो पदक**: एशियन गेम्स 2026 में उन्होंने टीम सिल्वर और व्यक्तिगत कांस्य पदक जीतकर अपनी निरंतरता साबित की।",
      "### पार्थ माने (Parth Mane) — प्रतिभावान युवा राइफल शूटर",
      "• **टीम स्कोर में योगदान**: पार्थ माने ने क्वालिफिकेशन राउंड में स्थिर स्कोर बनाकर भारत के 1890.1 अंक के कुल योग में महत्वपूर्ण भूमिका निभाई।"
    ]),
    contentEn: createBlocks([
      "### Himanshu Dhillon — Double Medalist on Debut",
      "• **Debut Appearance**: Asian Games 2026 marked Himanshu Dhillon's first continental multi-sport games.",
      "• **Double Medals**: Won Team Silver (1890.1 pts) and Individual Silver on debut.",
      "### Rudrankksh Patil — Former World Champion's Consistency",
      "• **2022 World Champion**: Won World Championship Gold in 10m Air Rifle at Cairo 2022.",
      "• **Dual Medalist**: Won Team Silver and Individual Bronze at Nagoya 2026.",
      "### Parth Mane — Young Rifle Talent",
      "• **Team Score Contribution**: Delivered steady qualification scores to help achieve India's 1890.1 total."
    ])
  };

  // -------------------------------------------------------------
  // SECTION 3: India's 5 Gold Medalists & Sport-wise Breakdown
  // -------------------------------------------------------------
  const sec3GoldAndSportWise = {
    _key: "sec-3-gold-and-sport-wise",
    title: "भारत के 5 स्वर्ण पदक विजेता एवं खेल-वार पदक वितरण तालिका (5 Gold Medalists & Sport-wise Breakdown)",
    titleEn: "India's 5 Gold Medal Winners & Sport-wise Breakdown Table",
    content: createBlocks([
      "### भारत के 5 स्वर्ण पदक विजेताओं का विवरण (5 Gold Medalists List)",
      "• **नीरू ढांडा (Neeru Dhanda - Trap Shooting)**: 29 सितंबर 2026 को महिलाओं की ट्रैप शूटिंग व्यक्तिगत स्पर्धा में स्वर्ण पदक (Gold Medal) जीता। यह भारत का 2026 खेलों में शूटिंग का प्रथम व्यक्तिगत स्वर्ण है।",
      "• **भारतीय महिला क्रिकेट टीम (Indian Women's Cricket Team)**: फाइनल में श्रीलंका को पराजित कर महिला टी-20 क्रिकेट स्पर्धा का स्वर्ण पदक जीता।",
      "• **सुरुचि सिंह एवं कमलजीत (Suruchi & Kamaljeet - 10m Air Pistol)**: 10m एयर पिस्टल मिक्स्ड टीम निशानेबाजी स्पर्धा में एशियाई रिकॉर्ड की बराबरी करते हुए स्वर्ण पदक हासिल किया।",
      "• **भारतीय पुरुष कबड्डी टीम (Indian Men's Kabaddi Team)**: पुरुष वर्ग कबड्डी स्पर्धा का स्वर्ण पदक जीता।",
      "• **भारतीय महिला कबड्डी टीम (Indian Women's Kabaddi Team)**: महिला वर्ग कबड्डी स्पर्धा का स्वर्ण पदक अपने नाम किया।",
      "अधिक जानकारी के लिए [MPPSC मुख्य परीक्षा पाठ्यक्रम](/mppsc/mains-syllabus) और [MPPSC प्रारंभिक परीक्षा पाठ्यक्रम](/mppsc/prelims-syllabus) देखें।"
    ]),
    contentEn: createBlocks([
      "### Detailed 5 Gold Medalists Summary",
      "• **Neeru Dhanda (Trap Shooting)**: Won Gold Medal in Women's Individual Trap on Sept 29, 2026.",
      "• **Indian Women's Cricket Team**: Defeated Sri Lanka in final to win T20 Gold.",
      "• **Suruchi Singh & Kamaljeet (10m Air Pistol)**: Equaled Asian Record to win 10m Air Pistol Mixed Team Gold.",
      "• **Indian Men's Kabaddi Team**: Won Men's Kabaddi Gold.",
      "• **Indian Women's Kabaddi Team**: Won Women's Kabaddi Gold.",
      "Explore [MPPSC Mains Syllabus](/mppsc/mains-syllabus) and [MPPSC Prelims Syllabus](/mppsc/prelims-syllabus)."
    ]),
    table: createTable(
      "tbl-sport-wise-breakdown",
      "एशियन गेम्स 2026: खेल-वार पदक वितरण तालिका (Sport-wise Medal Breakdown Table)",
      ["खेल (Sport)", "स्वर्ण (Gold 🥇)", "रजत (Silver 🥈)", "कांस्य (Bronze 🥉)", "कुल (Total)"],
      [
        ["निशानेबाजी (Shooting)", "2", "9", "6", "17"],
        ["क्रिकेट (Cricket)", "1", "0", "0", "1"],
        ["कबड्डी (Kabaddi)", "2", "0", "0", "2"],
        ["एथलेटिक्स (Athletics)", "0", "6", "8", "14"],
        ["वुशू (Wushu)", "0", "1", "0", "1"],
        ["रोइंग (Rowing)", "0", "0", "1", "1"],
        ["बॉक्सिंग (Boxing)", "0", "0", "1", "1"],
        ["मिक्स्ड मार्शल आर्ट्स (MMA)", "0", "0", "1", "1"],
        ["कुराश (Kurash)", "0", "0", "1", "1"],
        ["अन्य खेल (Other Sports)", "0", "5", "4", "9"],
        ["**कुल योग (TOTAL)**", "**5**", "**21**", "**22**", "**48**"]
      ]
    )
  };

  // -------------------------------------------------------------
  // SECTION 4: Major Silver & Bronze Winners & Highlights
  // -------------------------------------------------------------
  const sec4SilverBronzeHighlights = {
    _key: "sec-4-silver-bronze-highlights",
    title: "प्रमुख रजत एवं कांस्य पदक विजेता और रिकॉर्ड तोड़ उपलब्धियां (Key Silver & Bronze Winners & Records)",
    titleEn: "Key Silver & Bronze Winners & Record-breaking Achievements",
    content: createBlocks([
      "### प्रमुख विजेताओं की हाइलाइट्स (Major Medallists Highlights)",
      "• **विथ्या रामराज (Vithya Ramraj - 400m Hurdles 🥉)**: महिलाओं की 400 मीटर बाधा दौड़ में 54.75 सेकंड का समय निकालकर पी.टी. उषा (PT Usha) का 42 वर्ष पुराना राष्ट्रीय रिकॉर्ड तोड़ा और कांस्य पदक हासिल किया।",
      "• **नरेंद्र बेरवाल (Narendra Berwal - Boxing 🥉)**: 29 सितंबर 2026 को पुरुषों के +92 किग्रा सुपर हैवीवेट मुक्केबाजी में कांस्य पदक प्राप्त किया।",
      "• **गुलवीर सिंह (Gulveer Singh - Athletics 🥈)**: पुरुषों की 5,000 मीटर और 10,000 मीटर लंबी दूरी की दौड़ में रजत पदक जीता।",
      "• **पारुल चौधरी (Parul Chaudhary - Athletics 🥉)**: 3000 मीटर स्टीपलचेज़ और 5000 मीटर में दो कांस्य पदक हासिल किए।",
      "• **तजिंदरपाल सिंह तूर (Tajinderpal Singh Toor - Shot Put 🥈)**: शॉट पुट (गोला फेंक) स्पर्धा में लगातार तीसरे एशियाई खेलों में पदक (रजत) जीता।",
      "• **सावन बरवाल (Sawan Barwal - Marathon 🥈)**: मैराथन दौड़ में शानदार समय के साथ रजत पदक हासिल किया।",
      "• **ऐश्वर्य प्रताप सिंह तोमर (Aishwary Tomar - Shooting 🥈)**: 50 मीटर राइफल 3-पोजीशन स्पर्धा में रजत पदक जीता।",
      "• **एलावेनिल वलारिवन एवं सोनम उत्तम मस्कर (Elavenil Valarivan & Sonam Maskar - Shooting 🥈)**: महिला 10m एयर राइफल टीम स्पर्धा में रजत पदक जीता।",
      "• **ईशा सिंह (Esha Singh - Shooting 🥈)**: 25 मीटर पिस्टल स्पर्धा में रजत पदक हासिल किया।",
      "• **नाओरेम रोशिबिना देवी (Roshibina Devi - Wushu 🥈)**: वुशू सांडा 60 किग्रा वर्ग में रजत पदक अर्जित किया।",
      "• **सतनाम सिंह एवं सलमान खान (Satnam & Salman - Rowing 🥉)**: पुरुषों की डबल स्कल्स रोइंग में कांस्य पदक जीता।"
    ]),
    contentEn: createBlocks([
      "### Major Medallists Highlights",
      "• **Vithya Ramraj (400m Hurdles 🥉)**: Clocked 54.75s in Women's 400m Hurdles, breaking PT Usha's 42-year-old national record.",
      "• **Narendra Berwal (Boxing 🥉)**: Won Bronze Medal in Men's +92kg Super Heavyweight Boxing on Sept 29, 2026.",
      "• **Gulveer Singh (Athletics 🥈)**: Silver Medal in Men's 5,000m and 10,000m.",
      "• **Parul Chaudhary (Athletics 🥉)**: Two Bronze medals in 3,000m steeplechase and 5,000m.",
      "• **Tajinderpal Singh Toor (Shot Put 🥈)**: Silver Medal, his 3rd consecutive Asian Games shot put medal.",
      "• **Sawan Barwal (Marathon 🥈)**: Silver Medal in marathon.",
      "• **Aishwary Pratap Singh Tomar (Shooting 🥈)**: Silver in 50m Rifle 3-Positions.",
      "• **Elavenil Valarivan & Sonam Uttam Maskar (Shooting 🥈)**: Silver in 10m Air Rifle Women's Team.",
      "• **Esha Singh (Shooting 🥈)**: Silver in Women's 25m Pistol.",
      "• **Naorem Roshibina Devi (Wushu 🥈)**: Silver in Women's Wushu Sanda 60kg.",
      "• **Satnam Singh & Salman Khan (Rowing 🥉)**: Bronze in Men's Double Sculls."
    ]),
    table: createTable(
      "tbl-full-medallists-list",
      "एशियन गेम्स 2026: प्रमुख भारतीय पदक विजेताओं की संपूर्ण सूची (Major Indian Medallists & Sports Table)",
      ["क्र.सं. (No.)", "खिलाड़ी / टीम (Athlete / Team)", "खेल (Sport)", "स्पर्धा (Event)", "पदक (Medal)"],
      [
        ["1", "नीरू ढांडा (Neeru Dhanda)", "निशानेबाजी (Shooting)", "महिला व्यक्तिगत ट्रैप", "स्वर्ण (Gold 🥇)"],
        ["2", "भारतीय महिला क्रिकेट टीम", "क्रिकेट (Cricket)", "महिला टी-20 स्पर्धा", "स्वर्ण (Gold 🥇)"],
        ["3", "सुरुचि सिंह व कमलजीत", "निशानेबाजी (Shooting)", "10m एयर पिस्टल मिक्स्ड टीम", "स्वर्ण (Gold 🥇)"],
        ["4", "भारतीय पुरुष कबड्डी टीम", "कबड्डी (Kabaddi)", "पुरुष टीम स्पर्धा", "स्वर्ण (Gold 🥇)"],
        ["5", "भारतीय महिला कबड्डी टीम", "कबड्डी (Kabaddi)", "महिला टीम स्पर्धा", "स्वर्ण (Gold 🥇)"],
        ["6", "हिमांशु ढिल्लों (Himanshu Dhillon)", "निशानेबाजी (Shooting)", "पुरुष 10m एयर राइफल", "रजत (Silver 🥈)"],
        ["7", "राइफल टीम (हिमांशु, रुद्राक्ष, पार्थ)", "निशानेबाजी (Shooting)", "पुरुष 10m एयर राइफल टीम", "रजत (Silver 🥈)"],
        ["8", "रुद्राक्ष पाटिल (Rudrankksh Patil)", "निशानेबाजी (Shooting)", "पुरुष 10m एयर राइफल", "कांस्य (Bronze 🥉)"],
        ["9", "महिला ट्रैप टीम (नीरू, मनीषा, प्रीति)", "निशानेबाजी (Shooting)", "महिला ट्रैप टीम स्पर्धा", "रजत (Silver 🥈)"],
        ["10", "गुलवीर सिंह (Gulveer Singh)", "एथलेटिक्स (Athletics)", "पुरुष 5000m / 10000m", "रजत (Silver 🥈)"],
        ["11", "तजिंदरपाल सिंह तूर (Tajinderpal Toor)", "एथलेटिक्स (Athletics)", "पुरुष शॉट पुट (गोला फेंक)", "रजत (Silver 🥈)"],
        ["12", "सावन बरवाल (Sawan Barwal)", "एथलेटिक्स (Athletics)", "पुरुष मैराथन", "रजत (Silver 🥈)"],
        ["13", "मुरली श्रीशंकर (Murali Sreeshankar)", "एथलेटिक्स (Athletics)", "पुरुष लंबी कूद (Long Jump)", "रजत (Silver 🥈)"],
        ["14", "ईशा सिंह (Esha Singh)", "निशानेबाजी (Shooting)", "महिला 25m पिस्टल", "रजत (Silver 🥈)"],
        ["15", "एलावेनिल वलारिवन (Elavenil Valarivan)", "निशानेबाजी (Shooting)", "महिला 10m एयर राइफल", "रजत (Silver 🥈)"],
        ["16", "ऐश्वर्य प्रताप सिंह तोमर", "निशानेबाजी (Shooting)", "पुरुष 50m राइफल 3P", "रजत (Silver 🥈)"],
        ["17", "नाओरेम रोशिबिना देवी", "वुशू (Wushu)", "सांडा 60 किग्रा", "रजत (Silver 🥈)"],
        ["18", "नरेंद्र बेरवाल (Narendra Berwal)", "बॉक्सिंग (Boxing)", "पुरुष +92kg सुपर हैवीवेट", "कांस्य (Bronze 🥉)"],
        ["19", "विथ्या रामराज (Vithya Ramraj)", "एथलेटिक्स (Athletics)", "महिला 400m बाधा दौड़", "कांस्य (Bronze 🥉)"],
        ["20", "पारुल चौधरी (Parul Chaudhary)", "एथलेटिक्स (Athletics)", "महिला 3000m स्टीपलचेज़", "कांस्य (Bronze 🥉)"],
        ["21", "सतनाम सिंह व सलमान खान", "रोइंग (Rowing)", "पुरुष डबल स्कल्स", "कांस्य (Bronze 🥉)"],
        ["22", "सुचिका तरियाल (Suchika Tariyal)", "MMA", "ट्रेडिशनल -60kg", "कांस्य (Bronze 🥉)"]
      ]
    )
  };

  // -------------------------------------------------------------
  // SECTION 5: Asian Games Facts, History & Host Cities (ORIGINAL CONTENT PRESERVED)
  // -------------------------------------------------------------
  const sec5AsianGamesFacts = {
    _key: "sec-5-asian-games-facts",
    title: "एशियन गेम्स (Asian Games): इतिहास, संचालन संस्था (OCA) एवं भावी आयोजन स्थल",
    titleEn: "Asian Games Facts & History: Olympic Council of Asia (OCA) & Host Cities Timeline",
    content: createBlocks([
      "### एशियन गेम्स का इतिहास एवं स्वरूप",
      "• **स्वरूप**: एशियन गेम्स (एशियाई खेल) एशिया महाद्वीप के देशों के बीच आयोजित होने वाली सर्वोच्च बहु-खेल प्रतियोगिता है।",
      "• **संचालन संस्था**: इसका आयोजन **ओलंपिक काउंसिल ऑफ एशिया (OCA - Olympic Council of Asia)** के तत्वावधान में प्रत्येक 4 वर्ष में किया जाता है। OCA का मुख्यालय **कुवैत सिटी (Kuwait City)** में स्थित है।",
      "### प्रथम एशियन गेम्स एवं भारत की मेजबानी (1951 नई दिल्ली)",
      "• **प्रथम संस्करण**: पहले एशियन गेम्स का आयोजन **वर्ष 1951 में नई दिल्ली, भारत** में हुआ था। उद्घाटन राष्ट्रपति **डॉ. राजेंद्र प्रसाद** ने किया था। इसमें 11 देशों ने भाग लिया था।",
      "• **भारत की दूसरी मेजबानी**: भारत ने **1982 (9वें एशियन गेम्स)** की मेजबानी पुनः नई दिल्ली में की थी (शुभंकर: अप्पू हाथी)।",
      "### एशियन गेम्स के हालिया एवं भावी आयोजन स्थल (Host Cities Timeline)",
      "• **19वाँ संस्करण (2023)**: हांगझोऊ, चीन (Hangzhou, China)",
      "• **20वाँ संस्करण (2026)**: आइची-नागोया, जापान (Aichi-Nagoya, Japan)",
      "• **21वाँ संस्करण (2030)**: दोहा, कतर (Doha, Qatar)",
      "• **22वाँ संस्करण (2034)**: रियाद, सऊदी अरब (Riyadh, Saudi Arabia)",
      "• **ज्ञान हब संदर्भ**: हमारे [सामान्य ज्ञान हब](/general-awareness) पर अंतर्राष्ट्रीय खेल संगठनों की संपूर्ण सूची देखें।"
    ]),
    contentEn: createBlocks([
      "### Overview of Asian Games",
      "• **Definition**: Premier continental multi-sport competition for Asian nations.",
      "• **Governing Body**: Governed by **Olympic Council of Asia (OCA)**, headquartered in **Kuwait City**.",
      "### 1st Asian Games & India's Hosting History (1951 New Delhi)",
      "• **Inaugural Edition**: Held in **1951 in New Delhi, India** with 11 participating nations.",
      "• **Second Indian Hosting**: Hosted again in **1982 in New Delhi**.",
      "### Host Cities Timeline (2023 to 2034)",
      "• **2023 (19th Edition)**: Hangzhou, China",
      "• **2026 (20th Edition)**: Aichi-Nagoya, Japan",
      "• **2030 (21st Edition)**: Doha, Qatar",
      "• **2034 (22nd Edition)**: Riyadh, Saudi Arabia"
    ]),
    table: createTable(
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
    )
  };

  // -------------------------------------------------------------
  // SECTION 6: High-Yield MPPSC & UPSC Exam Notes
  // -------------------------------------------------------------
  const sec6ExamNotes = {
    _key: "sec-6-exam-notes",
    title: "MPPSC और UPSC परीक्षा के लिए अति-महत्वपूर्ण तथ्य (Quick Revision Exam Notes)",
    titleEn: "High-Yield MPPSC & UPSC Exam Points (Quick Revision)",
    content: createBlocks([
      "### MPPSC प्रारंभिक परीक्षा (Unit 8: खेलकूद एवं समसामयिकी) विशेष पॉइंटर्स",
      "• **मेजबान शहर एवं संस्करण**: 20वें एशियाई खेलों का आयोजन **आइची-नागोया, जापान** में हो रहा है।",
      "• **भारत का 10m एयर राइफल टीम स्कोर**: 1890.1 अंक (हिमांशु ढिल्लों, रुद्राक्ष पाटिल, पार्थ माने - सिल्वर मेडल)।",
      "• **2022 के 10m एयर राइफल वर्ल्ड चैंपियन**: रुद्राक्ष पाटिल (Rudrankksh Patil)।",
      "• **ट्रैप शूटिंग में प्रथम व्यक्तिगत स्वर्ण**: नीरू ढांडा (Neeru Dhanda - 29 सितंबर 2026)।",
      "• **राष्ट्रीय रिकॉर्ड तोड़ा**: विथ्या रामराज ने 400m बाधा दौड़ (54.75s) में पी.टी. उषा का 42 वर्ष पुराना राष्ट्रीय रिकॉर्ड तोड़ा।",
      "• **प्रथम एशियन गेम्स**: 1951, नई दिल्ली, भारत (11 प्रतिभागी देश)।",
      "• **संचालक संस्था**: Olympic Council of Asia (OCA - मुख्यालय: कुवैत सिटी)।",
      "• **कोर्स संदर्भ**: MPPSC प्रारंभिक एवं मुख्य परीक्षा की तैयारी हेतु [Aakar IAS ऑनलाइन कोचिंग पाठ्यक्रम](/online-courses) तथा [MPPSC टेस्ट सीरीज](/test-series) ज्वाइन करें।"
    ]),
    contentEn: createBlocks([
      "### Key Exam Points for MPPSC & UPSC Prelims",
      "• **Host Venue 2026**: Aichi-Nagoya, Japan (20th Asian Games).",
      "• **India's 10m Air Rifle Team Score**: 1890.1 points (Silver Medal).",
      "• **2022 10m Air Rifle World Champion**: Rudrankksh Patil.",
      "• **First Individual Shooting Gold**: Neeru Dhanda in Women's Trap (Sept 29, 2026).",
      "• **National Record Broken**: Vithya Ramraj broke PT Usha's 42-year 400m hurdles record.",
      "• **First Asian Games**: 1951, New Delhi, India.",
      "• **Governing Body**: Olympic Council of Asia (OCA)."
    ])
  };

  // 10 Collapsible FAQs
  const faqs = [
    {
      question: "एशियन गेम्स 2026 में पुरुषों की 10 मीटर एयर राइफल स्पर्धा में भारत का क्या प्रदर्शन रहा?",
      questionEn: "What was India's performance in Men's 10m Air Rifle at Asian Games 2026?",
      answer: "भारत की टीम (हिमांशु ढिल्लों, रुद्राक्ष पाटिल, पार्थ माने) ने 1890.1 अंकों के साथ सिल्वर मेडल जीता। व्यक्तिगत स्पर्धा में हिमांशु ढिल्लों ने सिल्वर तथा रुद्राक्ष पाटिल ने ब्रॉन्ज मेडल हासिल किया।",
      answerEn: "India's team won Silver with 1890.1 pts. Individually, Himanshu Dhillon won Silver and Rudrankksh Patil won Bronze."
    },
    {
      question: "एशियन गेम्स 2026 में 29 सितंबर 2026 तक भारत ने कुल कितने पदक जीते हैं?",
      questionEn: "How many total medals has India won at Asian Games 2026 as of September 29, 2026?",
      answer: "29 सितंबर 2026 (Day 11) तक भारत ने कुल 48 पदक जीते हैं, जिसमें 5 स्वर्ण (Gold), 21 रजत (Silver) और 22 कांस्य (Bronze) शामिल हैं।",
      answerEn: "As of September 29, 2026 (Day 11), India has won 48 medals: 5 Gold, 21 Silver, and 22 Bronze medals."
    },
    {
      question: "एशियन गेम्स 2026 में भारत के 5 स्वर्ण पदक विजेता कौन हैं?",
      questionEn: "Who are India's 5 Gold Medal winners at Asian Games 2026?",
      answer: "5 स्वर्ण पदक विजेता हैं: 1. नीरू ढांडा (ट्रैप शूटिंग), 2. भारतीय महिला क्रिकेट टीम, 3. सुरुचि सिंह व कमलजीत (10m एयर पिस्टल मिक्स्ड), 4. भारतीय पुरुष कबड्डी टीम, और 5. भारतीय महिला कबड्डी टीम।",
      answerEn: "The 5 Gold winners are: 1. Neeru Dhanda (Trap Shooting), 2. Indian Women's Cricket Team, 3. Suruchi Singh & Kamaljeet (10m Air Pistol Mixed), 4. Indian Men's Kabaddi Team, and 5. Indian Women's Kabaddi Team."
    },
    {
      question: "नीरू ढांडा ने किस खेल में भारत के लिए स्वर्ण पदक हासिल किया?",
      questionEn: "In which event did Neeru Dhanda win Gold for India?",
      answer: "नीरू ढांडा ने 29 सितंबर 2026 को महिलाओं की व्यक्तिगत ट्रैप शूटिंग (Women's Individual Trap Shooting) स्पर्धा में स्वर्ण पदक जीता।",
      answerEn: "Neeru Dhanda won Gold in Women's Individual Trap Shooting on September 29, 2026."
    },
    {
      question: "किस भारतीय एथलीट ने पी.टी. उषा का 42 वर्ष पुराना राष्ट्रीय रिकॉर्ड तोड़ा?",
      questionEn: "Which athlete broke PT Usha's 42-year national record?",
      answer: "विथ्या रामराज (Vithya Ramraj) ने महिलाओं की 400 मीटर बाधा दौड़ में 54.75 सेकंड समय के साथ पी.टी. उषा का 42 साल पुराना रिकॉर्ड तोड़ा।",
      answerEn: "Vithya Ramraj broke PT Usha's 42-year 400m hurdles record with a time of 54.75s to win Bronze."
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
      question: "एशियन गेम्स 2026 में पुरुषों की 10 मीटर एयर राइफल टीम स्पर्धा में भारत ने कौन सा पदक जीता?",
      questionEn: "Which medal did India win in Men's 10m Air Rifle Team event at Asian Games 2026?",
      options: ["गोल्ड मेडल", "सिल्वर मेडल", "कांस्य मेडल", "कोई पदक नहीं"],
      optionsEn: ["Gold Medal", "Silver Medal", "Bronze Medal", "No Medal"],
      correctIndex: 1,
      explanation: "हिमांशु ढिल्लों, रुद्राक्ष पाटिल और पार्थ माने की भारतीय टीम ने 1890.1 अंकों के साथ सिल्वर मेडल (रजत पदक) जीता।",
      explanationEn: "India's team of Himanshu Dhillon, Rudrankksh Patil, and Parth Mane won Silver with 1890.1 points."
    },
    {
      question: "29 सितंबर 2026 (Day 11) तक एशियन गेम्स 2026 में भारत की कुल पदक संख्या कितनी है?",
      questionEn: "What is India's total medal count at Asian Games 2026 as of September 29, 2026?",
      options: ["35 पदक", "42 पदक", "48 पदक", "55 पदक"],
      optionsEn: ["35 Medals", "42 Medals", "48 Medals", "55 Medals"],
      correctIndex: 2,
      explanation: "29 सितंबर 2026 तक भारत ने कुल 48 पदक (5 स्वर्ण, 21 रजत, 22 कांस्य) हासिल कर लिए हैं।",
      explanationEn: "As of September 29, 2026, India has secured 48 medals (5 Gold, 21 Silver, 22 Bronze)."
    },
    {
      question: "एशियन गेम्स 2026 में भारत के लिए शूटिंग स्पर्धा में पहला व्यक्तिगत स्वर्ण पदक किसने जीता?",
      questionEn: "Who won India's first individual shooting Gold Medal at Asian Games 2026?",
      options: ["ईशा सिंह", "नीरू ढांडा", "एलावेनिल वलारिवन", "सोनम उत्तम मस्कर"],
      optionsEn: ["Esha Singh", "Neeru Dhanda", "Elavenil Valarivan", "Sonam Uttam Maskar"],
      correctIndex: 1,
      explanation: "नीरू ढांडा ने महिलाओं की व्यक्तिगत ट्रैप शूटिंग में 29 सितंबर 2026 को भारत का पहला शूटिंग व्यक्तिगत स्वर्ण पदक जीता।",
      explanationEn: "Neeru Dhanda won India's first individual shooting Gold Medal in Women's Trap on September 29, 2026."
    },
    {
      question: "महिलाओं की 400 मीटर बाधा दौड़ में पी.टी. उषा का 42 वर्ष पुराना राष्ट्रीय रिकॉर्ड किस एथलीट ने तोड़ा?",
      questionEn: "Which athlete broke PT Usha's 42-year-old national record in Women's 400m Hurdles?",
      options: ["विथ्या रामराज", "पारुल चौधरी", "सीमा कुमारी", "प्राची"],
      optionsEn: ["Vithya Ramraj", "Parul Chaudhary", "Seema Kumari", "Prachi"],
      correctIndex: 0,
      explanation: "विथ्या रामराज ने 54.75 सेकंड के समय के साथ पी.टी. उषा का 42 साल पुराना राष्ट्रीय रिकॉर्ड तोड़ा।",
      explanationEn: "Vithya Ramraj broke PT Usha's 42-year-old national record in 400m Hurdles with a time of 54.75s."
    },
    {
      question: "2022 के 10 मीटर एयर राइफल वर्ल्ड चैंपियन रह चुके किस भारतीय निशानेबाज ने एशियन गेम्स 2026 में कांस्य पदक जीता?",
      questionEn: "Which 2022 10m Air Rifle World Champion won Bronze at Asian Games 2026?",
      options: ["हिमांशु ढिल्लों", "रुद्राक्ष पाटिल", "गगन नारंग", "पार्थ माने"],
      optionsEn: ["Himanshu Dhillon", "Rudrankksh Patil", "Gagan Narang", "Parth Mane"],
      correctIndex: 1,
      explanation: "रुद्राक्ष पाटिल ने एशियन गेम्स 2026 में 10m एयर राइफल में व्यक्तिगत ब्रॉन्ज मेडल जीता।",
      explanationEn: "Rudrankksh Patil won the Bronze Medal in 10m Air Rifle at Asian Games 2026."
    },
    {
      question: "10 मीटर एयर पिस्टल मिक्स्ड टीम स्पर्धा में एशियाई रिकॉर्ड की बराबरी कर स्वर्ण पदक जीतने वाली भारतीय जोड़ी कौन सी है?",
      questionEn: "Which pair equaled the Asian Record to win Gold in 10m Air Pistol Mixed Team?",
      options: ["रुद्राक्ष व एलावेनिल", "सुरुचि सिंह व कमलजीत", "हिमांशु व सोनम", "ऐश्वर्य व ईशा"],
      optionsEn: ["Rudrankksh & Elavenil", "Suruchi Singh & Kamaljeet", "Himanshu & Sonam", "Aishwary & Esha"],
      correctIndex: 1,
      explanation: "सुरुचि सिंह एवं कमलजीत ने 10m एयर पिस्टल मिक्स्ड टीम स्पर्धा में रिकॉर्ड बराबरी के साथ स्वर्ण पदक जीता।",
      explanationEn: "Suruchi Singh & Kamaljeet won Gold in 10m Air Pistol Mixed Team."
    },
    {
      question: "लगातार तीसरे एशियाई खेलों में शॉट पुट (गोला फेंक) स्पर्धा में पदक जीतने वाले भारतीय एथलीट कौन हैं?",
      questionEn: "Which Indian athlete won a shot put medal in three consecutive Asian Games?",
      options: ["तजिंदरपाल सिंह तूर", "मुरली श्रीशंकर", "गुलवीर सिंह", "सावन बरवाल"],
      optionsEn: ["Tajinderpal Singh Toor", "Murali Sreeshankar", "Gulveer Singh", "Sawan Barwal"],
      correctIndex: 0,
      explanation: "तजिंदरपाल सिंह तूर ने पुरुषों के शॉट पुट में रजत पदक जीतकर लगातार तीसरे एशियाई खेलों में पदक प्राप्त किया।",
      explanationEn: "Tajinderpal Singh Toor won Silver in Men's Shot Put, earning a medal in 3 consecutive Asian Games."
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

  const docSlug = "asian-games-2026-10m-air-rifle-india-medals-himanshu-dhillon-rudrankksh-patil";
  const docTitleHi = "MPPSC & UPSC: एशियन गेम्स 2026 पदक तालिका (Medal Tally) एवं 10m एयर राइफल | भारत के 48 पदक (5 स्वर्ण, 21 रजत, 22 कांस्य), नीरू ढांडा, हिमांशु ढिल्लों व रुद्राक्ष पाटिल की सफलता";
  const docTitleEn = "MPPSC & UPSC: Asian Games 2026 Medal Tally & 10m Air Rifle | India's 48 Medals (5 Gold, 21 Silver, 22 Bronze), Neeru Dhanda, Himanshu Dhillon & Rudrankksh Patil";
  const docExcerptHi = "एशियन गेम्स 2026 (आइची-नागोया, जापान) में पुरुषों की 10m एयर राइफल स्पर्धा में हिमांशु ढिल्लों व रुद्राक्ष पाटिल ने सिल्वर व कांस्य तथा टीम ने सिल्वर (1890.1 अंक) हासिल किया। 29 सितंबर 2026 तक नीरू ढांडा के ट्रैप शूटिंग गोल्ड के साथ भारत के पदकों की कुल संख्या 48 (5 स्वर्ण, 21 रजत, 22 कांस्य) हो गई है। देखें विजेताओं की संपूर्ण सूची व खेल तालिका।";
  const docExcerptEn = "At the Asian Games 2026 in Aichi-Nagoya, Japan, Team India won Silver (1890.1 pts) in Men's 10m Air Rifle with Himanshu Dhillon taking Silver and Rudrankksh Patil winning Bronze. With Neeru Dhanda's Trap Gold on Sept 29, 2026, India's total tally reached 48 medals (5 Gold, 21 Silver, 22 Bronze).";

  const keywordsArray = [
    "asian games 2026 10m air rifle",
    "himanshu dhillon rudrankksh patil parth mane",
    "asian games 2026 medal tally",
    "asian games 2026 medal list india",
    "neeru dhanda gold medal asian games 2026",
    "1890.1 score air rifle team india",
    "rudrankksh patil 2022 world champion bronze medal",
    "himanshu dhillon debut asian games silver",
    "sheng lihao china gold medal 10m air rifle",
    "olympic council of asia oca facts",
    "first asian games 1951 new delhi",
    "aichi nagoya japan asian games 2026",
    "2030 doha qatar 2034 riyadh saudi arabia asian games",
    "mppsc sports notes 10m air rifle asian games",
    "upsc current affairs sports 2026"
  ];

  const docIds = [
    "ca-asian-games-2026-10m-air-rifle-india",
    "gk-asian-games-2026-10m-air-rifle-india"
  ];

  for (const docId of docIds) {
    const isCA = docId.startsWith("ca-");
    console.log(`📌 Publishing Complete Combined Document to Sanity: ${docId} (${isCA ? "currentAffairs" : "staticGk"})...`);

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
      seoTitle: cleanText("MPPSC & UPSC: एशियन गेम्स 2026 मेडल टैली | 10m एयर राइफल व भारत के 48 पदक"),
      seoTitleEn: cleanText("Asian Games 2026 Medal Tally & 10m Air Rifle: India's 48 Medals List | MPPSC"),
      metaDescription: cleanText(docExcerptHi),
      metaDescriptionEn: cleanText(docExcerptEn),
      keywords: keywordsArray,
      sections: [
        sec0OverallTally,
        sec1AirRifleCoverage,
        sec2ShooterProfiles,
        sec3GoldAndSportWise,
        sec4SilverBronzeHighlights,
        sec5AsianGamesFacts,
        sec6ExamNotes,
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

    console.log(`✅ Document ${docId} successfully updated with complete 10m Air Rifle + 48 Medals Tally!`);
  }

  console.log("🎉 ASIAN GAMES 2026 ARTICLE FULLY RESTORED AND EXPANDED WITH ALL LATEST MEDAL TALLY CONTENT!");
}

main().catch((err) => {
  console.error("❌ Failed to upload complete Asian Games article:", err);
  process.exit(1);
});
