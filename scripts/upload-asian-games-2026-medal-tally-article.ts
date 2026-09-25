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

  const customBannerAssetRef = "image-3cd35bfdbe79aa7dc4800a3ae54aea0ce422683b-1024x405-png";

  const featuredImageObj = {
    _type: "image",
    asset: { _type: "reference", _ref: customBannerAssetRef },
    alt: "Asian Games 2026 Medal Tally: 19 Medals (2 Gold, 8 Silver, 9 Bronze) | एशियन गेम्स 2026 भारत पदकों की पूरी सूची",
    caption: "चित्र: आइची-नागोया, जापान में आयोजित एशियन गेम्स 2026 में भारत की 19 पदकों की तालिका (2 स्वर्ण, 8 रजत, 9 कांस्य)।",
  };

  // Section 0: Overview & Complete Medal Tally Tables
  const sec0MedalTallyOverview = {
    _key: "sec-0-medal-tally-overview",
    kind: "whyInNews",
    title: "एशियन गेम्स 2026 पदक तालिका: भारत ने जीते 19 पदक (2 स्वर्ण, 8 रजत, 9 कांस्य)",
    titleEn: "Asian Games 2026 Medal Tally: India Wins 19 Medals (2 Gold, 8 Silver, 9 Bronze)",
    body: [
      ...createBlocks([
        "### एशियन गेम्स 2026 (आइची-नागोया) में भारत का शानदार प्रदर्शन",
        "• **एशियन गेम्स 2026 पदक तालिका (19 Medals)**: आइची-नागोया, जापान में आयोजित 20वें एशियन गेम्स (**20th Asian Games 2026**) में भारतीय खिलाड़ियों ने उत्कृष्ट प्रदर्शन जारी रखते हुए अब तक **2 स्वर्ण, 8 रजत और 9 कांस्य सहित कुल 19 पदक** हासिल कर लिए हैं।",
        "• **क्रिकेट में स्वर्ण (Gold Medal 🥇)**: भारतीय महिला क्रिकेट टीम (कप्तान हरमनप्रीत कौर) ने टी-20 स्पर्धा में ऐतिहासिक स्वर्ण पदक जीता।",
        "• **शूटिंग में स्वर्ण व पदकों की बौछार (Gold & Medals in Shooting)**: सुरुचि और कमलजीत ने शूटिंग में स्वर्ण पदक जीता। इसके अतिरिक्त एलावेनिल वलारिवन, सोनम उत्तम मस्कर, रुद्राक्ष पाटिल, हिमांशु ढिल्लों, ऐश्वर्य प्रताप सिंह तोमर और नीरज कुमार ने विभिन्न राइफल व पिस्तौल स्पर्धाओं में रजत व कांस्य पदक हासिल किए।",
        "• **वुशू (Wushu Silver 🥈)**: नाओरेम रोशिबिना देवी ने सांडा 60 किग्रा वर्ग में शानदार रजत पदक हासिल किया।",
        "• **रोइंग (Rowing Bronze 🥉)**: सतनाम सिंह और सलमान खान ने पुरुषों के डबल स्कल्स (Double Sculls) में कांस्य पदक जीता।",
        "• **एथलेटिक्स (Athletics Bronze 🥉)**: सीमा कुमारी ने महिलाओं की 10,000 मीटर दौड़ में कांस्य पदक प्राप्त किया।",
        "• **मिक्स्ड मार्शल आर्ट्स (MMA Bronze 🥉)**: सुचिका तरियाल ने ट्रेडिशनल -60 किग्रा वर्ग में ऐतिहासिक कांस्य पदक जीता।",
        "• **MPPSC परीक्षा संदर्भ**: प्रतियोगी परीक्षाओं हेतु [MPPSC खेलकूद एवं समसामयिकी नोट्स](/mppsc-current-affairs) और [MPPSC मुख्य परीक्षा पाठ्यक्रम](/mppsc/mains-syllabus) का नियमित अभ्यास करें।"
      ]),
      createTable(
        "table-overall-medal-tally-2026-hi",
        "भारत की पदक तालिका (Asian Games 2026 India Medal Tally)",
        ["पदक का प्रकार (Medal Category)", "कुल संख्या (Total Count)"],
        [
          ["स्वर्ण (Gold 🥇)", "2"],
          ["रजत (Silver 🥈)", "8"],
          ["कांस्य (Bronze 🥉)", "9"],
          ["**कुल योग (Total Medals)**", "**19**"]
        ]
      ),
      createTable(
        "table-sports-tally-2026-hi",
        "एशियन गेम्स 2026: खेल-वार पदक तालिका (Sport-wise Medal Tally)",
        ["खेल (Sport)", "स्वर्ण (Gold 🥇)", "रजत (Silver 🥈)", "कांस्य (Bronze 🥉)", "कुल (Total)"],
        [
          ["क्रिकेट (Cricket)", "1", "0", "0", "1"],
          ["निशानेबाजी (Shooting)", "1", "7", "6", "14"],
          ["वुशू (Wushu)", "0", "1", "0", "1"],
          ["रोइंग (Rowing)", "0", "0", "1", "1"],
          ["एथलेटिक्स (Athletics)", "0", "0", "1", "1"],
          ["मिक्स्ड मार्शल आर्ट्स (MMA)", "0", "0", "1", "1"],
          ["**कुल योग (TOTAL)**", "**2**", "**8**", "**9**", "**19**"]
        ]
      ),
      createTable(
        "table-indian-medallists-2026-hi",
        "प्रमुख पदक विजेता और खेल (Major Indian Medallists & Sports List)",
        ["क्र.सं. (No.)", "खिलाड़ी / टीम (Athlete / Team)", "खेल (Sport)", "स्पर्धा / श्रेणी (Event)", "पदक (Medal)"],
        [
          ["1", "भारतीय महिला क्रिकेट टीम (Team India)", "क्रिकेट (Cricket)", "महिला टी-20 स्पर्धा", "स्वर्ण (Gold 🥇)"],
          ["2", "सुरुचि और कमलजीत (Suruchi & Kamaljeet)", "निशानेबाजी (Shooting)", "राइफल टीम स्पर्धा", "स्वर्ण (Gold 🥇)"],
          ["3", "नाओरेम रोशिबिना देवी (Roshibina Devi)", "वुशू (Wushu)", "सांडा 60 किग्रा वर्ग", "रजत (Silver 🥈)"],
          ["4", "एलावेनिल वलारिवन (Elavenil Valarivan)", "निशानेबाजी (Shooting)", "महिला 10m एयर राइफल व्यक्तिगत व टीम", "रजत (Silver 🥈)"],
          ["5", "सोनम उत्तम मस्कर (Sonam Uttam Maskar)", "निशानेबाजी (Shooting)", "महिला 10m एयर राइफल टीम", "रजत (Silver 🥈)"],
          ["6", "हिमांशु ढिल्लों (Himanshu Dhillon)", "निशानेबाजी (Shooting)", "पुरुष 10m एयर राइफल व्यक्तिगत व टीम", "रजत (Silver 🥈)"],
          ["7", "ऐश्वर्य प्रताप सिंह तोमर (Aishwary Tomar)", "निशानेबाजी (Shooting)", "पुरुष राइफल 3-पोजीशन स्पर्धा", "रजत (Silver 🥈)"],
          ["8", "नीरज कुमार (Neeraj Kumar)", "निशानेबाजी (Shooting)", "राइफल स्पर्धा", "रजत (Silver 🥈)"],
          ["9", "रुद्राक्ष पाटिल (Rudrankksh Patil)", "निशानेबाजी (Shooting)", "पुरुष 10m एयर राइफल व्यक्तिगत व टीम", "कांस्य (Bronze 🥉)"],
          ["10", "सतनाम सिंह और सलमान खान (Satnam & Salman)", "रोइंग (Rowing)", "पुरुषों के डबल स्कल्स स्पर्धा", "कांस्य (Bronze 🥉)"],
          ["11", "सीमा कुमारी (Seema Kumari)", "एथलेटिक्स (Athletics)", "महिलाओं की 10,000 मीटर दौड़", "कांस्य (Bronze 🥉)"],
          ["12", "सुचिका तरियाल (Suchika Tariyal)", "मिक्स्ड मार्शल आर्ट्स (MMA)", "ट्रेडिशनल -60 किग्रा वर्ग", "कांस्य (Bronze 🥉)"]
        ]
      )
    ],
    bodyEn: [
      ...createBlocks([
        "### Asian Games 2026: India's Updated Medal Tally (19 Medals)",
        "• **Stellar Tally**: At the **20th Asian Games 2026** in Aichi-Nagoya, Japan, Team India has accumulated **19 medals (2 Gold, 8 Silver, 9 Bronze)**.",
        "• **Two Gold Medals**: Won by Indian Women's Cricket Team and Shooters Suruchi & Kamaljeet.",
        "• **Multi-Sport Success**: Medals earned across Cricket, Shooting, Wushu, Rowing, Athletics, and Mixed Martial Arts.",
        "• **Exam Cross Reference**: For comprehensive exam preparation, check out our [MPPSC Current Affairs Hub](/mppsc-current-affairs) and [MPPSC Prelims Syllabus](/mppsc/prelims-syllabus)."
      ]),
      createTable(
        "table-overall-medal-tally-2026-en",
        "India's Medal Tally at Asian Games 2026",
        ["Medal Category", "Total Count"],
        [
          ["Gold 🥇", "2"],
          ["Silver 🥈", "8"],
          ["Bronze 🥉", "9"],
          ["**TOTAL MEDALS**", "**19**"]
        ]
      ),
      createTable(
        "table-sports-tally-2026-en",
        "India's Asian Games 2026 Medal Tally by Sport",
        ["Sport", "Gold 🥇", "Silver 🥈", "Bronze 🥉", "Total"],
        [
          ["Cricket", "1", "0", "0", "1"],
          ["Shooting", "1", "7", "6", "14"],
          ["Wushu", "0", "1", "0", "1"],
          ["Rowing", "0", "0", "1", "1"],
          ["Athletics", "0", "0", "1", "1"],
          ["Mixed Martial Arts", "0", "0", "1", "1"],
          ["**TOTAL**", "**2**", "**8**", "**9**", "**19**"]
        ]
      ),
      createTable(
        "table-indian-medallists-2026-en",
        "Major Indian Medallists & Sports at Asian Games 2026",
        ["No.", "Athlete / Team", "Sport", "Event", "Medal"],
        [
          ["1", "Team India Women's Cricket", "Cricket", "Women's T20 Tournament", "Gold 🥇"],
          ["2", "Suruchi & Kamaljeet", "Shooting", "Rifle Team Event", "Gold 🥇"],
          ["3", "Naorem Roshibina Devi", "Wushu", "Sanda 60kg Category", "Silver 🥈"],
          ["4", "Elavenil Valarivan", "Shooting", "Women's 10m Air Rifle Individual & Team", "Silver 🥈"],
          ["5", "Sonam Uttam Maskar", "Shooting", "Women's 10m Air Rifle Team", "Silver 🥈"],
          ["6", "Himanshu Dhillon", "Shooting", "Men's 10m Air Rifle Individual & Team", "Silver 🥈"],
          ["7", "Aishwary Pratap Singh Tomar", "Shooting", "Men's Rifle 3-Position", "Silver 🥈"],
          ["8", "Neeraj Kumar", "Shooting", "Men's Rifle Event", "Silver 🥈"],
          ["9", "Rudrankksh Patil", "Shooting", "Men's 10m Air Rifle Individual & Team", "Bronze 🥉"],
          ["10", "Satnam Singh & Salman Khan", "Rowing", "Men's Double Sculls", "Bronze 🥉"],
          ["11", "Seema Kumari", "Athletics", "Women's 10,000m Race", "Bronze 🥉"],
          ["12", "Suchika Tariyal", "Mixed Martial Arts", "Traditional -60kg Category", "Bronze 🥉"]
        ]
      )
    ]
  };

  // Section 1: Detailed Discipline Analysis
  const sec1DisciplineAnalysis = {
    _key: "sec-1-discipline-analysis",
    kind: "background",
    title: "विभिन्न खेल स्पर्धाओं में भारत की उपलब्धियाँ: क्रिकेट, शूटिंग, वुशू, रोइंग, एथलेटिक्स व MMA",
    titleEn: "Discipline-wise Breakdown: Cricket, Shooting, Wushu, Rowing, Athletics & MMA",
    body: [
      ...createBlocks([
        "### 1. महिला क्रिकेट (Women's Cricket) — पहला स्वर्ण पदक",
        "• **ऐतिहासिक स्वर्णिम प्रदर्शन**: कप्तान **हरमनप्रीत कौर** की कप्तानी में भारतीय महिला क्रिकेट टीम ने फाइनल में उत्कृष्ट प्रदर्शन करते हुए भारत के लिए **पहला स्वर्ण पदक (Gold Medal 🥇)** जीता।",
        "### 2. निशानेबाजी (Shooting) — सुरुचि व कमलजीत का गोल्ड और 13 अन्य पदक",
        "• **स्वर्ण पदक**: सुरुचि और कमलजीत ने शूटिंग में शानदार एकाग्रता का परिचय देते हुए भारत को **दूसरा स्वर्ण पदक** दिलाया।",
        "• **रजत व कांस्य पदक विजेता**: एलावेनिल वलारिवन, सोनम उत्तम मस्कर, रुद्राक्ष पाटिल, हिमांशु ढिल्लों (1890.1 टीम स्कोर), ऐश्वर्य प्रताप सिंह तोमर तथा नीरज कुमार ने विभिन्न स्पर्धाओं में पदक जीते।",
        "### 3. वुशू (Wushu) — रोशिबिना देवी का रजत पदक",
        "• **सांडा 60 किग्रा वर्ग**: नाओरेम रोशिबिना देवी ने लगातार दूसरे एशियन गेम्स में पदक जीतते हुए **रजत पदक (Silver Medal 🥈)** अपने नाम किया।",
        "### 4. रोइंग (Rowing) — डबल स्कल्स में कांस्य",
        "• **सतनाम सिंह व सलमान खान**: पुरुषों की डबल स्कल्स स्पर्धा में सतनाम सिंह और सलमान खान की जोड़ी ने **कांस्य पदक (Bronze Medal 🥉)** जीता।",
        "### 5. एथलेटिक्स (Athletics) — सीमा कुमारी का कांस्य",
        "• **10,000 मीटर दौड़**: सीमा कुमारी ने महिलाओं की 10,000 मीटर दौड़ में बेहतरीन गति दिखाते हुए **कांस्य पदक** हासिल किया।",
        "### 6. मिक्स्ड मार्शल आर्ट्स (MMA)",
        "• **सुचिका तरियाल**: सुचिका तरियाल ने ट्रेडिशनल -60 किग्रा वर्ग में ऐतिहासिक **कांस्य पदक (Bronze Medal 🥉)** जीता।",
        "• **ऑनलाइन कोर्स संदर्भ**: विस्तृत नोट्स के लिए हमारे [Aakar IAS ऑनलाइन कोचिंग पाठ्यक्रम](/online-courses) से जुड़ें।"
      ])
    ],
    bodyEn: [
      ...createBlocks([
        "### 1. Women's Cricket — First Gold Medal",
        "• **Gold Triumph**: Led by captain Harmanpreet Kaur, India won Gold in Women's Cricket.",
        "### 2. Shooting — Gold by Suruchi & Kamaljeet",
        "• **Gold Medal**: Suruchi & Kamaljeet secured Gold in Shooting.",
        "• **Multi-Medal Squad**: Elavenil Valarivan, Sonam Uttam Maskar, Rudrankksh Patil, Himanshu Dhillon, Aishwary Tomar, and Neeraj Kumar bagged Silver and Bronze medals.",
        "### 3. Wushu — Roshibina Devi's Silver",
        "• **Silver Medal**: Naorem Roshibina Devi won Silver in Sanda 60kg class.",
        "### 4. Rowing — Satnam Singh & Salman Khan",
        "• **Bronze Medal**: Won Bronze in Men's Double Sculls.",
        "### 5. Athletics — Seema Kumari",
        "• **Bronze Medal**: Seema Kumari won Bronze in Women's 10,000m race.",
        "### 6. Mixed Martial Arts (MMA)",
        "• **Suchika Tariyal**: Won Bronze in Traditional -60kg event."
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
        "• **प्रथम एशियन गेम्स (1951 नई दिल्ली)**: पहले एशियन गेम्स का आयोजन वर्ष 1951 में **नई दिल्ली, भारत** में हुआ था।",
        "• **भारत की दूसरी मेजबानी**: भारत ने वर्ष **1982 (9वें एशियन गेम्स)** में पुनः नई दिल्ली में मेजबानी की थी।",
        "### एशियन गेम्स मेज़बान शहरों की सूची (Host Cities Timeline)",
        "• **2023 (19वाँ संस्करण)**: हांगझोऊ, चीन (Hangzhou, China) — भारत ने 107 पदक जीते थे।",
        "• **2026 (20वाँ संस्करण)**: आइची-नागोया, जापान (Aichi-Nagoya, Japan) — वर्तमान में भारत के 19 पदक हैं।",
        "• **2030 (21वाँ संस्करण)**: दोहा, कतर (Doha, Qatar)।",
        "• **2034 (22वाँ संस्करण)**: रियाद, सऊदी अरब (Riyadh, Saudi Arabia)।",
        "• **संबंधित पृष्ठ**: हमारे [सामान्य ज्ञान एवं खेलकूद हब](/general-awareness) पर विस्तृत जानकारी उपलब्ध है।"
      ]),
      createTable(
        "table-asian-games-hosts-hi",
        "एशियन गेम्स: प्रमुख संस्करणों एवं मेज़बान शहरों का विवरण (Asian Games Fact Sheet)",
        ["वर्ष (Year)", "संस्करण (Edition)", "मेज़बान शहर व देश (Host City & Country)", "महत्वपूर्ण तथ्य (Key Highlight)"],
        [
          ["1951", "1st Asian Games", "नई दिल्ली, भारत (New Delhi, India)", "प्रथम एशियन गेम्स (11 प्रतिभागी देश)"],
          ["1982", "9th Asian Games", "नई दिल्ली, भारत (New Delhi, India)", "भारत में दूसरी बार आयोजन"],
          ["2023", "19th Asian Games", "हांगझोऊ, चीन (Hangzhou, China)", "भारत का रिकॉर्ड 107 पदकों का प्रदर्शन"],
          ["2026", "20th Asian Games", "आइची-नागोया, जापान (Aichi-Nagoya, Japan)", "भारत के 19 पदक (2 स्वर्ण, 8 रजत, 9 कांस्य)"],
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
        "• **प्रश्‍न**: एशियन गेम्स 2026 में भारत ने अब तक कुल कितने पदक जीते हैं? — **उत्तर**: 19 पदक (2 स्वर्ण, 8 रजत, 9 कांस्य)।",
        "• **प्रश्‍न**: शूटिंग में भारत को स्वर्ण पदक किसने दिलाया? — **उत्तर**: सुरुचि और कमलजीत की जोड़ी ने।",
        "• **प्रश्‍न**: क्रिकेट में स्वर्ण पदक किस टीम ने जीता? — **उत्तर**: भारतीय महिला क्रिकेट टीम (कप्तान: हरमनप्रीत कौर)।",
        "• **प्रश्‍न**: वुशू में सांडा 60 किग्रा वर्ग में रजत पदक किसने जीता? — **उत्तर**: नाओरेम रोशिबिना देवी।",
        "• **प्रश्‍न**: रोइंग में पुरुषों की डबल स्कल्स स्पर्धा में कांस्य पदक विजेता कौन हैं? — **उत्तर**: सतनाम सिंह और सलमान खान।",
        "• **प्रश्‍न**: महिलाओं की 10,000 मीटर दौड़ में कांस्य पदक किसने जीता? — **उत्तर**: सीमा कुमारी।",
        "• **प्रश्‍न**: मिक्स्ड मार्शल आर्ट्स (MMA) में कांस्य पदक विजेता कौन हैं? — **उत्तर**: सुचिका तरियाल।"
      ])
    ],
    bodyEn: [
      ...createBlocks([
        "### Key Revision Points for Competitive Exams",
        "• **Total Medals 2026**: 19 Medals (2 Gold, 8 Silver, 9 Bronze).",
        "• **Gold Medals**: Indian Women's Cricket Team & Shooters Suruchi & Kamaljeet.",
        "• **Wushu Silver**: Naorem Roshibina Devi (Sanda 60kg).",
        "• **Rowing Bronze**: Satnam Singh & Salman Khan (Men's Double Sculls).",
        "• **Athletics Bronze**: Seema Kumari (Women's 10,000m).",
        "• **MMA Bronze**: Suchika Tariyal."
      ])
    ]
  };

  // 8 High-Quality Practice MCQs
  const mcqs = [
    {
      question: "एशियन गेम्स 2026 में भारत ने अब तक (अद्यतन तालिका अनुसार) कुल कितने पदक जीत लिए हैं?",
      questionEn: "According to the updated medal tally, how many total medals has India won at Asian Games 2026 so far?",
      options: ["15 पदक", "19 पदक (2 स्वर्ण, 8 रजत, 9 कांस्य)", "22 पदक", "25 पदक"],
      optionsEn: ["15 Medals", "19 Medals (2 Gold, 8 Silver, 9 Bronze)", "22 Medals", "25 Medals"],
      correctIndex: 1,
      explanation: "भारत ने एशियन गेम्स 2026 में 2 स्वर्ण, 8 रजत और 9 कांस्य सहित कुल 19 पदक हासिल किए हैं।",
      explanationEn: "India has won a total of 19 medals (2 Gold, 8 Silver, 9 Bronze) at the 2026 Asian Games."
    },
    {
      question: "एशियन गेम्स 2026 में निशानेबाजी (Shooting) में भारत के लिए स्वर्ण पदक (Gold Medal) किसने जीता?",
      questionEn: "Who won the Gold Medal for India in Shooting at the Asian Games 2026?",
      options: ["एलावेनिल वलारिवन और मनु भाकर", "सुरुचि और कमलजीत", "रुद्राक्ष पाटिल और हिमांशु ढिल्लों", "ऐश्वर्य प्रताप सिंह तोमर"],
      optionsEn: ["Elavenil Valarivan & Manu Bhaker", "Suruchi & Kamaljeet", "Rudrankksh Patil & Himanshu Dhillon", "Aishwary Pratap Singh Tomar"],
      correctIndex: 1,
      explanation: "सुरुचि और कमलजीत ने निशानेबाजी स्पर्धा में उत्कृष्ट प्रदर्शन करते हुए भारत के लिए स्वर्ण पदक जीता।",
      explanationEn: "Suruchi and Kamaljeet won the Gold Medal for India in Shooting."
    },
    {
      question: "एशियन गेम्स 2026 में वुशू (Wushu) की सांडा 60 किग्रा वर्ग स्पर्धा में किस भारतीय खिलाड़ी ने रजत पदक जीता?",
      questionEn: "Which Indian athlete won the Silver Medal in Wushu (Sanda 60kg category) at Asian Games 2026?",
      options: ["नाओरेम रोशिबिना देवी", "सुचिका तरियाल", "सीमा कुमारी", "लवलीना बोरगोहेन"],
      optionsEn: ["Naorem Roshibina Devi", "Suchika Tariyal", "Seema Kumari", "Lovlina Borgohain"],
      correctIndex: 0,
      explanation: "नाओरेम रोशिबिना देवी ने वुशू सांडा 60 किग्रा वर्ग में रजत पदक (Silver Medal) अपने नाम किया।",
      explanationEn: "Naorem Roshibina Devi secured the Silver Medal in Wushu Sanda 60kg category."
    },
    {
      question: "रोइंग (Rowing) में पुरुषों के डबल स्कल्स (Men's Double Sculls) में किस भारतीय जोड़ी ने कांस्य पदक हासिल किया?",
      questionEn: "Which Indian pair won the Bronze Medal in Rowing (Men's Double Sculls) at Asian Games 2026?",
      options: ["सतनाम सिंह और सलमान खान", "नीरज कुमार और ऐश्वर्य तोमर", "हिमांशु ढिल्लों और रुद्राक्ष पाटिल", "अर्जुन लाल और अरविंद सिंह"],
      optionsEn: ["Satnam Singh & Salman Khan", "Neeraj Kumar & Aishwary Tomar", "Himanshu Dhillon & Rudrankksh Patil", "Arjun Lal & Arvind Singh"],
      correctIndex: 0,
      explanation: "सतनाम सिंह और सलमान खान ने पुरुषों के डबल स्कल्स रोइंग में भारत के लिए कांस्य पदक हासिल किया।",
      explanationEn: "Satnam Singh and Salman Khan won the Bronze Medal in Men's Double Sculls Rowing."
    },
    {
      question: "एथलेटिक्स में महिलाओं की 10,000 मीटर दौड़ स्पर्धा में किस भारतीय धाविका ने कांस्य पदक प्राप्त किया?",
      questionEn: "Which Indian athlete won the Bronze Medal in Women's 10,000m race at Asian Games 2026?",
      options: ["सीमा कुमारी", "पारुल चौधरी", "अनु रानी", "हरमिलन बैंस"],
      optionsEn: ["Seema Kumari", "Parul Chaudhary", "Annu Rani", "Harmilan Bains"],
      correctIndex: 0,
      explanation: "सीमा कुमारी ने महिलाओं की 10,000 मीटर दौड़ में कांस्य पदक (Bronze Medal) प्राप्त किया।",
      explanationEn: "Seema Kumari won the Bronze Medal in Women's 10,000m race."
    },
    {
      question: "मिक्स्ड मार्शल आर्ट्स (MMA) के ट्रेडिशनल -60 किग्रा वर्ग में कांस्य पदक जीतने वाली भारतीय एथलीट कौन हैं?",
      questionEn: "Who won the Bronze Medal for India in Mixed Martial Arts (MMA) Traditional -60kg event?",
      options: ["सुचिका तरियाल", "रोशिबिना देवी", "सुरुचि", "कमलजीत"],
      optionsEn: ["Suchika Tariyal", "Roshibina Devi", "Suruchi", "Kamaljeet"],
      correctIndex: 0,
      explanation: "सुचिका तरियाल (Suchika Tariyal) ने ट्रेडिशनल -60 किग्रा मिक्स्ड मार्शल आर्ट्स में कांस्य पदक जीता।",
      explanationEn: "Suchika Tariyal won the Bronze Medal in Traditional -60kg Mixed Martial Arts."
    },
    {
      question: "एशियन गेम्स 2026 में महिला क्रिकेट में भारत ने कौन सा पदक जीता?",
      questionEn: "Which medal did India win in Women's Cricket at Asian Games 2026?",
      options: ["स्वर्ण पदक (Gold)", "रजत पदक (Silver)", "कांस्य पदक (Bronze)", "कोई नहीं"],
      optionsEn: ["Gold Medal", "Silver Medal", "Bronze Medal", "None"],
      correctIndex: 0,
      explanation: "कप्तान हरमनप्रीत कौर के नेतृत्व में भारतीय महिला क्रिकेट टीम ने स्वर्ण पदक (Gold Medal) जीता।",
      explanationEn: "Indian Women's Cricket Team won the Gold Medal under captain Harmanpreet Kaur."
    },
    {
      question: "20वें एशियन गेम्स 2026 का आयोजन स्थल कौन सा है?",
      questionEn: "What is the host venue for the 20th Asian Games 2026?",
      options: ["आइची-नागोया (जापान)", "हांगझोऊ (चीन)", "दोहा (कतर)", "रियाद (सऊदी अरब)"],
      optionsEn: ["Aichi-Nagoya (Japan)", "Hangzhou (China)", "Doha (Qatar)", "Riyadh (Saudi Arabia)"],
      correctIndex: 0,
      explanation: "20वें एशियन गेम्स 2026 का आयोजन आइची-नागोया, जापान में हो रहा है।",
      explanationEn: "The 20th Asian Games 2026 are hosted in Aichi-Nagoya, Japan."
    }
  ];

  // 10 Collapsible FAQs
  const faqs = [
    {
      question: "एशियन गेम्स 2026 पदक तालिका (Medal Tally) में भारत के पास कुल कितने पदक हैं?",
      questionEn: "How many total medals does India have in the Asian Games 2026 Medal Tally?",
      answer: "अद्यतन तालिका के अनुसार भारत ने एशियन गेम्स 2026 में कुल 19 पदक (2 स्वर्ण, 8 रजत और 9 कांस्य) जीते हैं।",
      answerEn: "As per the updated tally, India has won 19 total medals (2 Gold, 8 Silver, and 9 Bronze) at Asian Games 2026."
    },
    {
      question: "एशियन गेम्स 2026 में भारत के 2 स्वर्ण पदक किन खेलों में आए हैं?",
      questionEn: "In which sports did India win its 2 Gold Medals at Asian Games 2026?",
      answer: "भारत के 2 स्वर्ण पदक महिला क्रिकेट टीम (कप्तान: हरमनप्रीत कौर) तथा निशानेबाजी (सुरुचि और कमलजीत) में आए हैं।",
      answerEn: "India's 2 Gold Medals came in Women's Cricket Team and Shooting (Suruchi & Kamaljeet)."
    },
    {
      question: "वुशू (Wushu) में भारत को रजत पदक किसने दिलाया?",
      questionEn: "Who won the Silver Medal for India in Wushu?",
      answer: "नाओरेम रोशिबिना देवी ने सांडा 60 किग्रा वर्ग में भारत को रजत पदक दिलाया।",
      answerEn: "Naorem Roshibina Devi won the Silver Medal in Sanda 60kg category."
    },
    {
      question: "रोइंग (Rowing) में भारत के पदक विजेता कौन हैं?",
      questionEn: "Who are India's medal winners in Rowing?",
      answer: "सतनाम सिंह और सलमान खान ने पुरुषों के डबल स्कल्स (Men's Double Sculls) में कांस्य पदक जीता।",
      answerEn: "Satnam Singh and Salman Khan won the Bronze Medal in Men's Double Sculls."
    },
    {
      question: "एथलेटिक्स में सीमा कुमारी ने कौन सा पदक हासिल किया?",
      questionEn: "Which medal did Seema Kumari win in Athletics?",
      answer: "सीमा कुमारी ने महिलाओं की 10,000 मीटर दौड़ में कांस्य पदक प्राप्त किया।",
      answerEn: "Seema Kumari won the Bronze Medal in Women's 10,000m race."
    },
    {
      question: "मिक्स्ड मार्शल आर्ट्स (MMA) में भारत की कांस्य पदक विजेता कौन हैं?",
      questionEn: "Who is India's Bronze medallist in Mixed Martial Arts (MMA)?",
      answer: "सुचिका तरियाल ने ट्रेडिशनल -60 किग्रा वर्ग में कांस्य पदक जीता।",
      answerEn: "Suchika Tariyal won the Bronze Medal in Traditional -60kg class."
    },
    {
      question: "निशानेबाजी (Shooting) में पदक जीतने वाले प्रमुख भारतीय निशानेबाज कौन हैं?",
      questionEn: "Who are the major Indian shooters who won medals at Asian Games 2026?",
      answer: "निशानेबाजी में सुरुचि व कमलजीत (स्वर्ण), एलावेनिल वलारिवन, सोनम उत्तम मस्कर, रुद्राक्ष पाटिल, हिमांशु ढिल्लों, ऐश्वर्य प्रताप सिंह तोमर और नीरज कुमार ने पदक जीते।",
      answerEn: "Shooters Suruchi & Kamaljeet (Gold), Elavenil Valarivan, Sonam Uttam Maskar, Rudrankksh Patil, Himanshu Dhillon, Aishwary Tomar, and Neeraj Kumar won medals."
    },
    {
      question: "एशियन गेम्स 2026 का आयोजन किस देश व शहर में हो रहा है?",
      questionEn: "Which host country and city are organizing Asian Games 2026?",
      answer: "20वें एशियाई खेलों का आयोजन आइची-नागोया, जापान (Aichi-Nagoya, Japan) में हो रहा है।",
      answerEn: "The 20th Asian Games are taking place in Aichi-Nagoya, Japan."
    },
    {
      question: "प्रथम एशियन गेम्स का आयोजन कब और कहाँ हुआ था?",
      questionEn: "When and where were the inaugural Asian Games held?",
      answer: "प्रथम एशियाई खेल वर्ष 1951 में नई दिल्ली, भारत में आयोजित किए गए थे।",
      answerEn: "The inaugural Asian Games were held in New Delhi, India in 1951."
    },
    {
      question: "यह जानकारी MPPSC एवं UPSC परीक्षा के लिए क्यों आवश्यक है?",
      questionEn: "Why is this article essential for MPPSC & UPSC preparation?",
      answer: "MPPSC Prelims (Unit 8: खेलकूद व राष्ट्रीय समसामयिकी) तथा UPSC Prelims खेल जागरूकता खंड में पदकों, खिलाड़ियों और खेलों से संबंधित सीधे प्रश्न पूछे जाते हैं।",
      answerEn: "MPPSC Prelims Unit 8 and UPSC General Awareness frequently feature direct questions on sports medals and athletes."
    }
  ];

  const docSlug = "asian-games-2026-10m-air-rifle-india-medals-himanshu-dhillon-rudrankksh-patil";
  const docTitleHi = "एशियन गेम्स 2026 पदक तालिका (Medal Tally): भारत के 19 पदक (2 स्वर्ण, 8 रजत, 9 कांस्य), विजेताओं की पूरी सूची व टेबल | MPPSC & UPSC खेल नोट्स";
  const docTitleEn = "Asian Games 2026 Medal Tally: India's 19 Medals (2 Gold, 8 Silver, 9 Bronze), Complete Winners Table & Sport-wise List | MPPSC & UPSC Sports Notes";
  const docExcerptHi = "एशियन गेम्स 2026 (आइची-नागोया, जापान) में भारत ने अब तक 2 स्वर्ण, 8 रजत और 9 कांस्य सहित कुल 19 पदक जीत लिए हैं। भारतीय महिला क्रिकेट टीम और शूटिंग में सुरुचि-कमलजीत ने स्वर्ण पदक हासिल किया। देखें क्रिकेट, शूटिंग, वुशू, रोइंग, एथलेटिक्स व MMA के विजेताओं की पूरी सूची व टेबल।";
  const docExcerptEn = "At the 2026 Asian Games in Aichi-Nagoya, Japan, Team India has clinched a total of 19 medals (2 Gold, 8 Silver, 9 Bronze). Indian Women's Cricket Team and Shooters Suruchi & Kamaljeet secured Gold Medals. Explore the complete medal tally, sport-wise breakdown, and full winners list.";

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
    "suruchi kamaljeet shooting gold asian games",
    "roshibina devi wushu silver asian games",
    "satnam singh salman khan rowing bronze",
    "seema kumari athletics bronze asian games",
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
      publishedAt: "2026-09-25T10:00:00.000Z",
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
      seoTitle: cleanText("एशियन गेम्स 2026 पदक तालिका (Medal Tally): भारत के 19 पदकों की सूची व टेबल | MPPSC Notes"),
      seoTitleEn: cleanText("Asian Games 2026 Medal Tally: India's 19 Medals Table & Full Winners List"),
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

    console.log(`✅ Document ${docId} successfully updated with 19 Medals Tally!`);
  }

  console.log("🎉 ALL ASIAN GAMES 2026 MEDAL TALLY ARTICLES SUCCESSFULLY PUBLISHED TO SANITY CMS!");
}

main().catch((err) => {
  console.error("❌ Failed to upload Asian Games medal tally article:", err);
  process.exit(1);
});
