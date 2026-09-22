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
  console.log("🚀 Starting upload process for Asian Games 2026 Medal Tally & Indian Winners List...");

  let authorId = "author-aakar-ias-team";
  const existingAuthor = await client.getDocument(authorId);
  if (!existingAuthor) {
    await client.createIfNotExists({
      _id: authorId,
      _type: "author",
      name: "Aakar IAS Team",
      role: "Senior Editorial & Subject Specialist",
      bio: "Chief Editor specializing in MPPSC & UPSC Current Affairs, Polity, Science & Sports Awareness.",
    });
  }

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
    name: "MPPSC",
    nameEn: "MPPSC Exam",
    slug: { _type: "slug", current: "mppsc" },
  });

  let upscTagId = "tag-upsc";
  await client.createIfNotExists({
    _id: upscTagId,
    _type: "tag",
    name: "UPSC",
    nameEn: "UPSC Exam",
    slug: { _type: "slug", current: "upsc" },
  });

  // Use the custom banner image asset ID created previously
  const customBannerAssetRef = "image-3cd35bfdbe79aa7dc4800a3ae54aea0ce422683b-1024x405-png";

  const featuredImageObj = {
    _type: "image",
    asset: { _type: "reference", _ref: customBannerAssetRef },
    alt: "Asian Games 2026 Medal Tally: Complete Table and Full List of Indian Winners | एशियन गेम्स 2026 भारत पदक तालिका",
    caption: "चित्र: आइची-नागोया, जापान में आयोजित एशियन गेम्स 2026 में 10 मीटर एयर राइफल और महिला क्रिकेट में भारत का ऐतिहासिक स्वर्णिम प्रदर्शन।",
  };

  // Section 0: Why in News & Complete Medal Tally Overview
  const sec0MedalTallyOverview = {
    _key: "sec-0-medal-tally-overview",
    kind: "whyInNews",
    title: "एशियन गेम्स 2026 पदक तालिका: भारत के कुल पदक एवं विजेताओं की पूरी सूची (Asian Games 2026 Medal Tally India)",
    titleEn: "Asian Games 2026 Medal Tally: Complete Table & Full List of Indian Winners",
    body: [
      ...createBlocks([
        "### एशियन गेम्स 2026 (आइची-नागोया) में भारत का शानदार प्रदर्शन",
        "• **एशियन गेम्स 2026 पदक तालिका में भारत**: आइची-नागोया, जापान में आयोजित 20वें एशियन गेम्स (**20th Asian Games 2026**) में भारतीय एथलीटों ने उत्कृष्ट प्रदर्शन करते हुए **7 पदक (1 स्वर्ण, 4 रजत, 2 कांस्य)** अपने नाम कर लिए हैं।",
        "• **महिला क्रिकेट में पहला स्वर्ण पदक (First Gold)**: कप्तान हरमनप्रीत कौर के नेतृत्व में भारतीय महिला क्रिकेट टीम ने फाइनल में उत्कृष्ट खेल दिखाते हुए भारत को एशियन गेम्स 2026 का **पहला स्वर्ण पदक (Gold Medal 🥇)** दिलाया।",
        "• **निशानेबाजी (Shooting) में 5 पदकों का दबदबा**: 10 मीटर एयर राइफल स्पर्धाओं में भारतीय निशानेबाज़ों ने 4 रजत (Silver) और 1 कांस्य (Bronze) पदक जीतकर पदकों का अंबार लगा दिया।",
        "• **मिक्स्ड मार्शल आर्ट्स (MMA/Wushu) में इतिहास**: सुचिका तरियाल ने महिला पारंपरिक स्पर्धा में ऐतिहासिक **कांस्य पदक (Bronze Medal 🥉)** जीता।",
        "• **MPPSC परीक्षा संदर्भ**: प्रतियोगी परीक्षाओं की तैयारी हेतु [MPPSC खेलकूद एवं समसामयिकी नोट्स](/mppsc-current-affairs) और [MPPSC मुख्य परीक्षा पाठ्यक्रम](/mppsc/mains-syllabus) अवश्य देखें।"
      ]),
      createTable(
        "table-indian-medallists-2026-hi",
        "एशियन गेम्स 2026: भारतीय पदक विजेताओं की पूरी सूची (Indian Medallists at 2026 Asian Games)",
        ["क्र.सं. (No.)", "खिलाड़ी / टीम (Athlete / Team)", "खेल (Sport)", "स्पर्धा (Event)", "पदक (Medal)"],
        [
          ["1", "एलावेनिल वालारिवन, सोनम मस्कर, विदार्सा विनोद", "निशानेबाजी (Shooting)", "महिला 10m एयर राइफल टीम", "सिल्वर (Silver 🥈)"],
          ["2", "एलावेनिल वालारिवन (Elavenil Valarivan)", "निशानेबाजी (Shooting)", "महिला 10m एयर राइफल व्यक्तिगत", "सिल्वर (Silver 🥈)"],
          ["3", "रुद्राक्ष पाटिल, पार्थ माने, हिमांशु ढिल्लों", "निशानेबाजी (Shooting)", "पुरुष 10m एयर राइफल टीम (1890.1 अंक)", "सिल्वर (Silver 🥈)"],
          ["4", "हिमांशु ढिल्लों (Himanshu Dhillon)", "निशानेबाजी (Shooting)", "पुरुष 10m एयर राइफल व्यक्तिगत", "सिल्वर (Silver 🥈)"],
          ["5", "रुद्राक्ष पाटिल (Rudrankksh Patil)", "निशानेबाजी (Shooting)", "पुरुष 10m एयर राइफल व्यक्तिगत", "कांस्य (Bronze 🥉)"],
          ["6", "सुचिका तरियाल (Suchika Tariyal)", "मिक्स्ड मार्शल आर्ट्स (MMA)", "महिला पारंपरिक स्पर्धा", "कांस्य (Bronze 🥉)"],
          ["7", "भारतीय महिला क्रिकेट टीम (Team India)", "क्रिकेट (Cricket)", "महिला टी-20 स्पर्धा", "स्वर्ण (Gold 🥇)"]
        ]
      ),
      createTable(
        "table-sports-tally-2026-hi",
        "एशियन गेम्स 2026: भारत की खेल-वार पदक तालिका (India's Asian Games 2026 Medal Table by Sport)",
        ["खेल (Sport)", "गोल्ड (Gold 🥇)", "सिल्वर (Silver 🥈)", "ब्रॉन्ज (Bronze 🥉)", "कुल (Total)"],
        [
          ["निशानेबाजी (Shooting)", "0", "4", "1", "5"],
          ["मिक्स्ड मार्शल आर्ट्स (MMA / Wushu)", "0", "0", "1", "1"],
          ["क्रिकेट (Cricket)", "1", "0", "0", "1"],
          ["**कुल योग (TOTAL)**", "**1**", "**4**", "**2**", "**7**"]
        ]
      )
    ],
    bodyEn: [
      ...createBlocks([
        "### Asian Games 2026: India's Medal Tally Overview",
        "• **Stellar Medal Tally**: At the **20th Asian Games 2026** in Aichi-Nagoya, Japan, Team India has accumulated **7 medals (1 Gold, 4 Silver, 2 Bronze)**.",
        "• **Historic Gold in Women's Cricket**: Captain Harmanpreet Kaur led the Indian Women's Cricket Team to India's first **Gold Medal** of the Games.",
        "• **Shooting Dominance (5 Medals)**: India's 10m Air Rifle squad bagged 4 Silver and 1 Bronze medals across team and individual events.",
        "• **Martial Arts Milestone**: Suchika Tariyal secured a **Bronze Medal** in Women's Traditional Mixed Martial Arts.",
        "• **Exam Cross Reference**: For comprehensive exam preparation, check out our [MPPSC Current Affairs Hub](/mppsc-current-affairs) and [MPPSC Prelims Syllabus](/mppsc/prelims-syllabus)."
      ]),
      createTable(
        "table-indian-medallists-2026-en",
        "Indian Medallists at 2026 Asian Games (Full Winners List)",
        ["No.", "Athlete / Team", "Sport", "Event", "Medal"],
        [
          ["1", "Elavenil Valarivan, Sonam Maskar, Vidarsa Vinod", "Shooting", "Women's 10m Air Rifle Team", "Silver 🥈"],
          ["2", "Elavenil Valarivan", "Shooting", "Women's 10m Air Rifle Individual", "Silver 🥈"],
          ["3", "Rudrankksh Patil, Parth Mane, Himanshu Dhillon", "Shooting", "Men's 10m Air Rifle Team (1890.1 pts)", "Silver 🥈"],
          ["4", "Himanshu Dhillon", "Shooting", "Men's 10m Air Rifle Individual", "Silver 🥈"],
          ["5", "Rudrankksh Patil", "Shooting", "Men's 10m Air Rifle Individual", "Bronze 🥉"],
          ["6", "Suchika Tariyal", "Mixed Martial Arts", "Women's Traditional Event", "Bronze 🥉"],
          ["7", "Team India", "Cricket", "Women's T20 Tournament", "Gold 🥇"]
        ]
      ),
      createTable(
        "table-sports-tally-2026-en",
        "India's Asian Games 2026 Medal Tally by Each Sport",
        ["Sport", "Gold 🥇", "Silver 🥈", "Bronze 🥉", "Total"],
        [
          ["Shooting", "0", "4", "1", "5"],
          ["Mixed Martial Arts", "0", "0", "1", "1"],
          ["Cricket", "1", "0", "0", "1"],
          ["**TOTAL**", "**1**", "**4**", "**2**", "**7**"]
        ]
      )
    ]
  };

  // Section 1: Detailed Discipline Analysis
  const sec1DisciplineAnalysis = {
    _key: "sec-1-discipline-analysis",
    kind: "background",
    title: "विभिन्न खेल स्पर्धाओं में भारत का प्रदर्शन: क्रिकेट, निशानेबाजी एवं मार्शल आर्ट्स",
    titleEn: "Discipline-wise Breakdown: Cricket, Shooting & Mixed Martial Arts",
    body: [
      ...createBlocks([
        "### 1. महिला क्रिकेट (Women's Cricket) — भारत का पहला गोल्ड",
        "• **ऐतिहासिक जीत**: भारतीय महिला क्रिकेट टीम ने एशियन गेम्स 2026 के फाइनल में असाधारण प्रदर्शन करते हुए **गोल्ड मेडल** जीता।",
        "• **कप्तान का योगदान**: कप्तान **हरमनप्रीत कौर** के नेतृत्व में टीम इंडिया ने फाइनल मुकाबले में विरोधी टीम को पराजित कर भारत का स्वर्ण खाता खोला।",
        "### 2. पुरुषों की 10 मीटर एयर राइफल (Men's 10m Air Rifle)",
        "• **टीम सिल्वर (1890.1 अंक)**: हिमांशु ढिल्लों, रुद्राक्ष पाटिल और पार्थ माने की भारतीय त्रयी ने 1890.1 अंक जुटाकर सिल्वर मेडल जीता (चीन 1899.0 गोल्ड)।",
        "• **व्यक्तिगत स्पर्धा**: हिमांशु ढिल्लों ने अपने डेब्यू गेम्स में **सिल्वर मेडल** तथा 2022 वर्ल्ड चैंपियन रुद्राक्ष पाटिल ने **कांस्य पदक** हासिल किया।",
        "### 3. महिलाओं की 10 मीटर एयर राइफल (Women's 10m Air Rifle)",
        "• **टीम सिल्वर**: एलावेनिल वालारिवन, सोनम मस्कर और विदार्सा विनोद ने महिलाओं की 10m एयर राइफल टीम स्पर्धा में **रजत पदक** जीता।",
        "• **व्यक्तिगत सिल्वर**: एलावेनिल वालारिवन ने व्यक्तिगत फाइनल में निरंतरता का परिचय देते हुए **सिल्वर मेडल** हासिल किया।",
        "### 4. मिक्स्ड मार्शल आर्ट्स (MMA/Wushu)",
        "• **सुचिका तरियाल का कांस्य**: सुचिका तरियाल ने महिला पारंपरिक स्पर्धा में कांस्य पदक जीतकर मार्शल आर्ट्स में भारत का परचम लहराया।",
        "• **ऑनलाइन कोर्स संदर्भ**: अधिक खेल नोट्स के लिए हमारे [Aakar IAS ऑनलाइन कोचिंग पाठ्यक्रम](/online-courses) से जुड़ें।"
      ])
    ],
    bodyEn: [
      ...createBlocks([
        "### 1. Women's Cricket — India's First Gold Medal",
        "• **Historic Triumph**: Led by captain **Harmanpreet Kaur**, Team India clinched the Gold Medal in Women's Cricket.",
        "### 2. Men's 10m Air Rifle Shooting",
        "• **Team Silver (1890.1 pts)**: Himanshu Dhillon, Rudrankksh Patil, and Parth Mane won Team Silver.",
        "• **Individual Double Medal**: Debutant Himanshu Dhillon bagged Silver, while 2022 World Champion Rudrankksh Patil won Bronze.",
        "### 3. Women's 10m Air Rifle Shooting",
        "• **Double Silver**: Elavenil Valarivan won Individual Silver and led the team (with Sonam Maskar & Vidarsa Vinod) to Team Silver.",
        "### 4. Mixed Martial Arts (MMA)",
        "• **Suchika Tariyal's Bronze**: Won Bronze in Women's Traditional Event."
      ])
    ]
  };

  // Section 2: Asian Games History & Host Cities
  const sec2AsianGamesFacts = {
    _key: "sec-2-asian-games-facts",
    kind: "keyHighlights",
    title: "एशियन गेम्स (Asian Games) का इतिहास, मेज़बान शहर एवं ओसीए (OCA) तथ्य",
    titleEn: "Asian Games History, Host Cities & Olympic Council of Asia (OCA) Facts",
    body: [
      ...createBlocks([
        "### एशियन गेम्स (Asian Games) का अवलोकन",
        "• **परिभाषा व संचालन**: एशियन गेम्स एशियाई महाद्वीप की सबसे बड़ी बहु-खेल प्रतियोगिता है, जिसका आयोजन **ओलंपिक काउंसिल ऑफ एशिया (OCA)** द्वारा प्रत्येक 4 वर्ष में किया जाता है।",
        "• **प्रथम एशियन गेम्स (1951 नई दिल्ली)**: पहले एशियन गेम्स का आयोजन वर्ष 1951 में **नई दिल्ली, भारत** में हुआ था (11 प्रतिभागी देश)।",
        "• **भारत की दूसरी मेजबानी**: भारत ने वर्ष **1982 (9वें एशियन गेम्स)** में पुनः नई दिल्ली में मेजबानी की थी।",
        "### एशियन गेम्स मेज़बान शहरों की सूची (Host Cities Timeline)",
        "• **2023 (19वाँ संस्करण)**: हांगझोऊ, चीन (Hangzhou, China) — भारत ने रिकॉर्ड 107 पदक जीते।",
        "• **2026 (20वाँ संस्करण)**: आइची-नागोया, जापान (Aichi-Nagoya, Japan)।",
        "• **2030 (21वाँ संस्करण)**: दोहा, कतर (Doha, Qatar)।",
        "• **2034 (22वाँ संस्करण)**: रियाद, सऊदी अरब (Riyadh, Saudi Arabia)।",
        "• **संबंधित पृष्ठ**: हमारे [सामान्य ज्ञान एवं खेलकूद हब](/general-awareness) पर विस्तृत इतिहास उपलब्ध है।"
      ]),
      createTable(
        "table-asian-games-hosts-hi",
        "एशियन गेम्स: प्रमुख संस्करणों एवं मेज़बान शहरों का विवरण (Asian Games Fact Sheet)",
        ["वर्ष (Year)", "संस्करण (Edition)", "मेज़बान शहर व देश (Host City & Country)", "महत्वपूर्ण तथ्य (Key Highlight)"],
        [
          ["1951", "1st Asian Games", "नई दिल्ली, भारत (New Delhi, India)", "प्रथम एशियन गेम्स (11 प्रतिभागी देश)"],
          ["1982", "9th Asian Games", "नई दिल्ली, भारत (New Delhi, India)", "भारत में दूसरी बार आयोजन (अपोलो शुभंकर)"],
          ["2023", "19th Asian Games", "हांगझोऊ, चीन (Hangzhou, China)", "भारत का रिकॉर्ड 107 पदकों का सर्वश्रेष्ठ प्रदर्शन"],
          ["2026", "20th Asian Games", "आइची-नागोया, जापान (Aichi-Nagoya, Japan)", "भारत ने 7 पदक जीते (1 गोल्ड, 4 सिल्वर, 2 ब्रॉन्ज)"],
          ["2030", "21st Asian Games", "दोहा, कतर (Doha, Qatar)", "पश्चिम एशिया में आयोजन"],
          ["2034", "22nd Asian Games", "रियाद, सऊदी अरब (Riyadh, Saudi Arabia)", "सऊदी अरब में पहला आयोजन"]
        ]
      )
    ],
    bodyEn: [
      ...createBlocks([
        "### Overview & History of Asian Games",
        "• **Governing Body**: Governed by the **Olympic Council of Asia (OCA)**.",
        "• **First Asian Games**: Held in **1951 in New Delhi, India**.",
        "• **Host Cities Timeline**: 2023 Hangzhou (China) -> 2026 Aichi-Nagoya (Japan) -> 2030 Doha (Qatar) -> 2034 Riyadh (Saudi Arabia)."
      ])
    ]
  };

  // Section 3: High-Yield Exam Points
  const sec3ExamPoints = {
    _key: "sec-3-exam-points",
    kind: "background",
    title: "MPPSC और UPSC परीक्षा के लिए महत्वपूर्ण तथ्य (Exam Highlights)",
    titleEn: "High-Yield Exam Points for MPPSC & UPSC Prelims",
    body: [
      ...createBlocks([
        "### MPPSC प्रारंभिक परीक्षा (Unit 8: खेलकूद व समसामयिकी) क्विक पॉइंटर्स",
        "• **प्रश्‍न**: एशियन गेम्स 2026 में भारत का पहला गोल्ड किस खेल में आया? — **उत्तर**: महिला क्रिकेट (कप्तान: हरमनप्रीत कौर)।",
        "• **प्रश्‍न**: एशियन गेम्स 2026 में भारत ने कुल कितने पदक जीते हैं? — **उत्तर**: 7 पदक (1 स्वर्ण, 4 रजत, 2 कांस्य)।",
        "• **प्रश्‍न**: पुरुषों की 10 मीटर एयर राइफल टीम का स्कोर कितना था? — **उत्तर**: 1890.1 अंक (सिल्वर मेडल)।",
        "• **प्रश्‍न**: महिलाओं की 10m एयर राइफल व्यक्तिगत स्पर्धा में किसने सिल्वर जीता? — **उत्तर**: एलावेनिल वालारिवन।",
        "• **प्रश्‍न**: मिक्स्ड मार्शल आर्ट्स में कांस्य पदक विजेता भारतीय कौन हैं? — **उत्तर**: सुचिका तरियाल।",
        "• **प्रश्‍न**: प्रथम एशियाई खेलों (1951) का आयोजन कहाँ हुआ था? — **उत्तर**: नई दिल्ली, भारत।"
      ])
    ],
    bodyEn: [
      ...createBlocks([
        "### Key Revision Points for Competitive Exams",
        "• **First Gold 2026**: Women's Cricket (Harmanpreet Kaur).",
        "• **Total Medals**: 7 Medals (1 Gold, 4 Silver, 2 Bronze).",
        "• **Men's 10m Air Rifle Team Score**: 1890.1 points (Silver).",
        "• **Women's 10m Air Rifle Silver**: Elavenil Valarivan.",
        "• **MMA Bronze**: Suchika Tariyal."
      ])
    ]
  };

  // 8 High-Quality Practice MCQs
  const mcqs = [
    {
      question: "एशियन गेम्स 2026 में भारत ने अपना पहला स्वर्ण पदक (Gold Medal) किस खेल स्पर्धा में जीता?",
      questionEn: "In which sport did India win its first Gold Medal at the Asian Games 2026?",
      options: ["पुरुष 10 मीटर एयर राइफल", "महिला क्रिकेट", "मिक्स्ड मार्शल आर्ट्स", "बैडमिंटन"],
      optionsEn: ["Men's 10m Air Rifle", "Women's Cricket", "Mixed Martial Arts", "Badminton"],
      correctIndex: 1,
      explanation: "हरमनप्रीत कौर के नेतृत्व में भारतीय महिला क्रिकेट टीम ने एशियन गेम्स 2026 में भारत को पहला स्वर्ण पदक दिलाया।",
      explanationEn: "The Indian Women's Cricket Team, led by Harmanpreet Kaur, won India's first Gold Medal at Asian Games 2026."
    },
    {
      question: "एशियन गेम्स 2026 में भारत ने अब तक कुल कितने पदक हासिल किए हैं?",
      questionEn: "How many total medals has India won so far at the Asian Games 2026?",
      options: ["5 पदक", "7 पदक (1 गोल्ड, 4 सिल्वर, 2 ब्रॉन्ज)", "10 पदक", "12 पदक"],
      optionsEn: ["5 Medals", "7 Medals (1 Gold, 4 Silver, 2 Bronze)", "10 Medals", "12 Medals"],
      correctIndex: 1,
      explanation: "भारत ने एशियन गेम्स 2026 में कुल 7 पदक जीते हैं (1 गोल्ड महिला क्रिकेट में, 4 सिल्वर निशानेबाजी में, 1 ब्रॉन्ज निशानेबाजी में तथा 1 ब्रॉन्ज मार्शल आर्ट्स में)।",
      explanationEn: "India has won a total of 7 medals (1 Gold, 4 Silver, 2 Bronze)."
    },
    {
      question: "पुरुषों की 10 मीटर एयर राइफल टीम स्पर्धा में सिल्वर मेडल जीतने वाली भारतीय टीम का कुल स्कोर कितना था?",
      questionEn: "What was the total score of the Indian team that won Silver in Men's 10m Air Rifle Team event at Asian Games 2026?",
      options: ["1899.0 अंक", "1890.1 अंक", "1884.2 अंक", "1905.0 अंक"],
      optionsEn: ["1899.0 points", "1890.1 points", "1884.2 points", "1905.0 points"],
      correctIndex: 1,
      explanation: "हिमांशु ढिल्लों, रुद्राक्ष पाटिल और पार्थ माने की टीम ने 1890.1 अंकों के साथ सिल्वर मेडल जीता।",
      explanationEn: "The team of Himanshu Dhillon, Rudrankksh Patil, and Parth Mane scored 1890.1 points to win Silver."
    },
    {
      question: "महिलाओं की 10 मीटर एयर राइफल व्यक्तिगत स्पर्धा में किस भारतीय निशानेबाज ने सिल्वर मेडल हासिल किया?",
      questionEn: "Which Indian shooter bagged the Silver Medal in Women's 10m Air Rifle Individual at Asian Games 2026?",
      options: ["एलावेनिल वालारिवन", "सोनम मस्कर", "विदार्सा विनोद", "मनु भाकर"],
      optionsEn: ["Elavenil Valarivan", "Sonam Maskar", "Vidarsa Vinod", "Manu Bhaker"],
      correctIndex: 0,
      explanation: "एलावेनिल वालारिवन (Elavenil Valarivan) ने महिलाओं की 10m एयर राइफल व्यक्तिगत स्पर्धा में सिल्वर मेडल जीता।",
      explanationEn: "Elavenil Valarivan won the Silver Medal in the Women's 10m Air Rifle Individual event."
    },
    {
      question: "एशियन गेम्स 2026 में मिक्स्ड मार्शल आर्ट्स (MMA/Wushu) में भारत के लिए कांस्य पदक किसने जीता?",
      questionEn: "Who won the Bronze Medal for India in Mixed Martial Arts (MMA) at the Asian Games 2026?",
      options: ["सुचिका तरियाल", "रोशिबिना देवी", "लवलीना बोरगोहेन", "मैरी कॉम"],
      optionsEn: ["Suchika Tariyal", "Roshibina Devi", "Lovlina Borgohain", "Mary Kom"],
      correctIndex: 0,
      explanation: "सुचिका तरियाल (Suchika Tariyal) ने महिला पारंपरिक मिक्स्ड मार्शल आर्ट्स स्पर्धा में कांस्य पदक जीता।",
      explanationEn: "Suchika Tariyal won the Bronze Medal in Women's Traditional Mixed Martial Arts."
    },
    {
      question: "2022 के 10 मीटर एयर राइफल वर्ल्ड चैंपियन रह चुके किस निशानेबाज ने एशियन गेम्स 2026 में कांस्य पदक जीता?",
      questionEn: "Which shooter, who won the 2022 10m Air Rifle World Championship, won Bronze at Asian Games 2026?",
      options: ["रुद्राक्ष पाटिल", "हिमांशु ढिल्लों", "पार्थ माने", "दिव्यांश सिंह पंवार"],
      optionsEn: ["Rudrankksh Patil", "Himanshu Dhillon", "Parth Mane", "Divyansh Singh Panwar"],
      correctIndex: 0,
      explanation: "रुद्राक्ष पाटिल ने व्यक्तिगत 10m एयर राइफल में कांस्य पदक और टीम स्पर्धा में सिल्वर मेडल जीता।",
      explanationEn: "Rudrankksh Patil won the Individual Bronze Medal and Team Silver Medal."
    },
    {
      question: "प्रथम एशियन गेम्स (1951) का आयोजन किस शहर में हुआ था?",
      questionEn: "Which city hosted the inaugural Asian Games in 1951?",
      options: ["नई दिल्ली (भारत)", "टोक्यो (जापान)", "बैंकॉक (थाईलैंड)", "मनीला (फिलीपींस)"],
      optionsEn: ["New Delhi (India)", "Tokyo (Japan)", "Bangkok (Thailand)", "Manila (Philippines)"],
      correctIndex: 0,
      explanation: "प्रथम एशियाई खेलों की मेजबानी 1951 में नई दिल्ली (भारत) ने की थी।",
      explanationEn: "The first Asian Games were hosted by New Delhi, India in 1951."
    },
    {
      question: "21वें एशियन गेम्स 2030 की मेजबानी किस शहर को सौंपी गई है?",
      questionEn: "Which city has been awarded the hosting rights for the 21st Asian Games in 2030?",
      options: ["दोहा (कतर)", "रियाद (सऊदी अरब)", "आइची-नागोया (जापान)", "गुवांगझू (चीन)"],
      optionsEn: ["Doha (Qatar)", "Riyadh (Saudi Arabia)", "Aichi-Nagoya (Japan)", "Guangzhou (China)"],
      correctIndex: 0,
      explanation: "2030 के 21वें एशियन गेम्स का आयोजन दोहा, कतर में किया जाएगा।",
      explanationEn: "The 2030 Asian Games will be held in Doha, Qatar."
    }
  ];

  // 10 Collapsible FAQs
  const faqs = [
    {
      question: "एशियन गेम्स 2026 पदक तालिका (Medal Tally) में भारत ने कुल कितने पदक जीते हैं?",
      questionEn: "How many total medals has India won in the Asian Games 2026 Medal Tally?",
      answer: "भारत ने एशियन गेम्स 2026 में कुल 7 पदक जीते हैं — 1 स्वर्ण पदक (महिला क्रिकेट), 4 रजत पदक (निशानेबाजी) और 2 कांस्य पदक (निशानेबाजी व मार्शल आर्ट्स)।",
      answerEn: "India has won a total of 7 medals at Asian Games 2026 — 1 Gold (Women's Cricket), 4 Silver (Shooting), and 2 Bronze (Shooting & MMA)."
    },
    {
      question: "एशियन गेम्स 2026 में भारत का पहला स्वर्ण पदक किसने जीता?",
      questionEn: "Who won India's first Gold Medal at Asian Games 2026?",
      answer: "कप्तान हरमनप्रीत कौर की अगुवाई में भारतीय महिला क्रिकेट टीम ने एशियन गेम्स 2026 का भारत के लिए पहला गोल्ड मेडल जीता।",
      answerEn: "The Indian Women's Cricket Team, captained by Harmanpreet Kaur, won India's first Gold Medal at the Games."
    },
    {
      question: "निशानेबाजी (Shooting) में भारत को कौन-कौन से पदक मिले?",
      questionEn: "Which medals did India win in Shooting at Asian Games 2026?",
      answer: "निशानेबाजी में भारत को 5 पदक मिले: पुरुषों की 10m एयर राइफल टीम (सिल्वर), महिलाओं की 10m एयर राइफल टीम (सिल्वर), हिमांशु ढिल्लों (व्यक्तिगत सिल्वर), एलावेनिल वालारिवन (व्यक्तिगत सिल्वर), तथा रुद्राक्ष पाटिल (व्यक्तिगत कांस्य)।",
      answerEn: "India won 5 shooting medals: Men's 10m Air Rifle Team (Silver), Women's 10m Air Rifle Team (Silver), Himanshu Dhillon (Individual Silver), Elavenil Valarivan (Individual Silver), and Rudrankksh Patil (Individual Bronze)."
    },
    {
      question: "पुरुषों की 10 मीटर एयर राइफल टीम का कुल स्कोर क्या था?",
      questionEn: "What was the score of the Men's 10m Air Rifle Team?",
      answer: "हिमांशु ढिल्लों, रुद्राक्ष पाटिल और पार्थ माने की त्रयी ने 1890.1 अंकों का स्कोर बनाकर सिल्वर मेडल हासिल किया।",
      answerEn: "The trio of Himanshu Dhillon, Rudrankksh Patil, and Parth Mane scored 1890.1 points to win Silver."
    },
    {
      question: "मिक्स्ड मार्शल आर्ट्स (MMA) में कांस्य पदक विजेता कौन हैं?",
      questionEn: "Who won the Bronze Medal in Mixed Martial Arts (MMA)?",
      answer: "सुचिका तरियाल (Suchika Tariyal) ने महिला पारंपरिक मिक्स्ड मार्शल आर्ट्स स्पर्धा में कांस्य पदक जीता।",
      answerEn: "Suchika Tariyal won the Bronze Medal in Women's Traditional MMA."
    },
    {
      question: "एशियन गेम्स 2026 का मेज़बान शहर कौन सा है?",
      questionEn: "Which city is hosting the Asian Games 2026?",
      answer: "20वें एशियन गेम्स 2026 का आयोजन आइची-नागोया, जापान (Aichi-Nagoya, Japan) में हो रहा है।",
      answerEn: "The 20th Asian Games 2026 are taking place in Aichi-Nagoya, Japan."
    },
    {
      question: "प्रथम एशियन गेम्स का आयोजन कब और कहाँ हुआ था?",
      questionEn: "When and where were the first Asian Games held?",
      answer: "प्रथम एशियाई खेलों का आयोजन वर्ष 1951 में नई दिल्ली, भारत में हुआ था।",
      answerEn: "The inaugural Asian Games were hosted in New Delhi, India in 1951."
    },
    {
      question: "एशियन गेम्स का संचालन कौन सी संस्था करती है?",
      questionEn: "Which organization conducts the Asian Games?",
      answer: "एशियन गेम्स का आयोजन Olympic Council of Asia (OCA) द्वारा किया जाता है।",
      answerEn: "The Asian Games are organized by the Olympic Council of Asia (OCA)."
    },
    {
      question: "आगामी 2030 और 2034 एशियन गेम्स के मेज़बान शहर कौन से हैं?",
      questionEn: "Which cities are hosting the 2030 and 2034 Asian Games?",
      answer: "2030 के एशियन गेम्स दोहा (कतर) में तथा 2034 के एशियन गेम्स रियाद (सऊदी अरब) में आयोजित होंगे।",
      answerEn: "The 2030 Games will be in Doha (Qatar) and the 2034 Games in Riyadh (Saudi Arabia)."
    },
    {
      question: "यह जानकारी MPPSC एवं UPSC परीक्षा के लिए क्यों महत्वपूर्ण है?",
      questionEn: "Why is this article critical for MPPSC & UPSC exams?",
      answer: "यह जानकारी MPPSC Prelims (Unit 8: Sports & Current Affairs) तथा UPSC Prelims खेल सम्बंधित प्रश्नों के लिए अति-उपयोगी है।",
      answerEn: "It covers essential sports current affairs for MPPSC Prelims Unit 8 and UPSC General Awareness."
    }
  ];

  const docSlug = "asian-games-2026-10m-air-rifle-india-medals-himanshu-dhillon-rudrankksh-patil";
  const docTitleHi = "एशियन गेम्स 2026 पदक तालिका (Medal Tally): भारत के कुल पदक, विजेताओं की पूरी सूची व टेबल | MPPSC & UPSC खेल नोट्स";
  const docTitleEn = "Asian Games 2026 Medal Tally: India's Total Medals, Complete Winners Table & Sport-wise List | MPPSC & UPSC Sports Notes";
  const docExcerptHi = "एशियन गेम्स 2026 (आइची-नागोया, जापान) में भारत ने कुल 7 पदक (1 स्वर्ण, 4 रजत, 2 कांस्य) हासिल किए हैं। महिला क्रिकेट में भारत ने पहला गोल्ड मेडल जीता, जबकि 10 मीटर एयर राइफल और मिक्स्ड मार्शल आर्ट्स में निशानेबाज़ों व एथलीटों ने रिकॉर्ड पदक तालिका बनाई। देखें भारतीय विजेताओं की पूरी सूची व टेबल।";
  const docExcerptEn = "At the 2026 Asian Games in Aichi-Nagoya, Japan, Team India has clinched 7 medals (1 Gold, 4 Silver, 2 Bronze). Harmanpreet Kaur led India Women's Cricket to Gold, while shooters and MMA athletes added 6 medals. Explore the complete medal tally, winners list, and sport-wise table.";

  const keywordsArray = [
    "asian games 2026 medal tally",
    "asian games 2026 medal list",
    "asian games 2026 medal tally table",
    "asian games 2026 medal table",
    "asian games 2026 medal list india",
    "asian games 2026 medal list winners",
    "asian games 2026 medal tally table results",
    "asian games 2026 medal tally india",
    "india at asian games 2026 medal tally",
    "asian games 2026 medal list india winners list",
    "women cricket gold medal asian games 2026",
    "himanshu dhillon rudrankksh patil parth mane",
    "elavenil valarivan 10m air rifle silver",
    "suchika tariyal mma bronze asian games"
  ];

  const docIds = [
    "ca-asian-games-2026-10m-air-rifle-india",
    "gk-asian-games-2026-10m-air-rifle-india",
  ];

  for (const docId of docIds) {
    const isCA = docId.startsWith("ca-");
    console.log(`📌 Patching document ${docId}...`);

    const docPayload: any = {
      _type: isCA ? "currentAffairs" : "staticGk",
      title: cleanText(docTitleHi),
      titleEn: cleanText(docTitleEn),
      slug: { _type: "slug", current: docSlug },
      publishedAt: "2026-09-22T10:00:00.000Z",
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
      seoTitle: cleanText("एशियन गेम्स 2026 पदक तालिका (Medal Tally): भारत के विजेताओं की सूची | MPPSC Notes"),
      seoTitleEn: cleanText("Asian Games 2026 Medal Tally: Complete Table & Indian Winners List"),
      metaDescription: cleanText(docExcerptHi),
      metaDescriptionEn: cleanText(docExcerptEn),
      keywords: keywordsArray,
      sections: [
        sec0MedalTallyOverview,
        sec1DisciplineAnalysis,
        sec2AsianGamesFacts,
        sec3ExamPoints,
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

    console.log(`✅ Document ${docId} successfully updated with complete Asian Games 2026 Medal Tally & Tables!`);
  }

  console.log("🎉 ALL ASIAN GAMES 2026 MEDAL TALLY ARTICLES SUCCESSFULLY PUBLISHED TO SANITY CMS!");
}

main().catch((err) => {
  console.error("❌ Failed to upload Asian Games medal tally article:", err);
  process.exit(1);
});
