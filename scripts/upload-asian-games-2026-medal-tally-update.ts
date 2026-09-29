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
  console.log("🚀 Starting upload/update process for Asian Games 2026 Medal Tally & Winners List Article (Sept 29, 2026)...");

  // 1. Fetch Existing Image Asset from Sanity
  const imageAssets = await client.fetch(`*[_type == "sanity.imageAsset"][0..5]._id`);
  if (!imageAssets || imageAssets.length === 0) {
    throw new Error("No image asset found in Sanity!");
  }
  const validImageAssetId = imageAssets[0];
  console.log(`📸 Using valid Sanity Image Asset ID: ${validImageAssetId}`);

  // 2. Ensure Default Author (Aakar IAS Team)
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

  // 3. Tags
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

  // Featured Image Object
  const featuredImageObj = {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: validImageAssetId,
    },
    alt: "Asian Games 2026 India Medal Tally Table and Winners List",
  };

  // Section 0: Overview & Overall Medal Tally
  const sec0Overview = {
    _key: "sec-0-overview",
    title: "एशियन गेम्स 2026: भारत का प्रदर्शन एवं समग्र पदक तालिका (Asian Games 2026 Medal Tally Overview)",
    titleEn: "Asian Games 2026: India's Overall Performance & Medal Tally Overview",
    content: createBlocks([
      "जापान के **आइची-नागोया (Aichi-Nagoya, Japan)** में आयोजित 20वें एशियाई खेल (19 सितंबर से 4 अक्टूबर 2026) में भारतीय एथलीटों ने अभूतपूर्व प्रदर्शन किया है। 29 सितंबर 2026 (Day 11) तक भारत की कुल पदक संख्या **48 पदक** तक पहुँच चुकी है, जिसमें **5 स्वर्ण (Gold 🥇), 21 रजत (Silver 🥈) और 22 कांस्य (Bronze 🥉)** शामिल हैं।",
      "29 सितंबर 2026 को भारत की स्टार ट्रैप शूटर **नीरू ढांडा (Neeru Dhanda)** ने महिलाओं की व्यक्तिगत ट्रैप स्पर्धा में शानदार प्रदर्शन करते हुए **स्वर्ण पदक** अपने नाम किया। यह एशियन गेम्स 2026 में भारत का शूटिंग में पहला व्यक्तिगत स्वर्ण पदक है। इसी दिन महिला ट्रैप टीम (नीरू ढांडा, मनीषा कीर और प्रीति रजक) ने **रजत पदक** भी प्राप्त किया।",
      "प्रतियोगी परीक्षाओं की दृष्टि से [MPPSC समसामयिकी नोट्स](/mppsc-current-affairs) तथा [सामान्य जागरूकता अध्ययन सामग्री](/general-awareness) के अंतर्गत खेलकूद संबंधी प्रश्न अत्यधिक महत्वपूर्ण होते हैं।"
    ]),
    contentEn: createBlocks([
      "At the 20th Asian Games (September 19 to October 4, 2026) held in **Aichi-Nagoya, Japan**, Indian athletes delivered an outstanding performance. As of September 29, 2026 (Day 11), India's total medal tally reached **48 medals**, comprising **5 Gold 🥇, 21 Silver 🥈, and 22 Bronze 🥉**.",
      "On September 29, 2026, star shooter **Neeru Dhanda** won the **Gold Medal** in the Women's Individual Trap event, securing India's first individual shooting Gold of the 2026 Games. On the same day, the Women's Trap Shooting Team won the **Silver Medal**.",
      "For competitive exams, this updated tally is crucial for [MPPSC Current Affairs Notes](/mppsc-current-affairs) and [General Awareness Prep](/general-awareness)."
    ]),
    table: createTable(
      "tbl-overall-tally",
      "एशियन गेम्स 2026: भारत की समग्र पदक तालिका (Asian Games 2026 India Overall Medal Tally)",
      ["पदक श्रेणी (Medal Category)", "पदक संख्या (Count)"],
      [
        ["स्वर्ण पदक (Gold 🥇)", "5"],
        ["रजत पदक (Silver 🥈)", "21"],
        ["कांस्य पदक (Bronze 🥉)", "22"],
        ["**कुल योग (TOTAL MEDALS)**", "**48**"]
      ]
    )
  };

  // Section 1: India's 5 Gold Medal Winners
  const sec1GoldWinners = {
    _key: "sec-1-gold-winners",
    title: "भारत के 5 स्वर्ण पदक विजेता (India's 5 Gold Medal Winners)",
    titleEn: "India's 5 Gold Medal Winners",
    content: createBlocks([
      "### भारत के स्वर्ण पदक विजेताओं का विवरण (Detailed Gold Medalists List)",
      "• **नीरू ढांडा (Neeru Dhanda - Trap Shooting)**: 29 सितंबर 2026 को महिलाओं की ट्रैप निशानेबाजी स्पर्धा में स्वर्ण पदक (Gold Medal) जीता। यह भारत का 2026 खेलों में शूटिंग का प्रथम व्यक्तिगत स्वर्ण है।",
      "• **भारतीय महिला क्रिकेट टीम (Indian Women's Cricket Team)**: फाइनल मुकाबले में श्रीलंका को हराकर महिला टी-20 क्रिकेट स्पर्धा में लगातार दूसरी बार स्वर्ण पदक जीता।",
      "• **सुरुचि सिंह एवं कमलजीत (Suruchi & Kamaljeet - 10m Air Pistol)**: 10 मीटर एयर पिस्टल मिक्स्ड टीम निशानेबाजी स्पर्धा में एशियाई रिकॉर्ड की बराबरी करते हुए भारत को स्वर्ण पदक दिलाया।",
      "• **भारतीय पुरुष कबड्डी टीम (Indian Men's Kabaddi Team)**: एशियाई खेलों के पुरुष वर्ग कबड्डी फाइनल में जीत दर्ज कर स्वर्ण पदक अपने नाम किया।",
      "• **भारतीय महिला कबड्डी टीम (Indian Women's Kabaddi Team)**: महिला वर्ग कबड्डी स्पर्धा के रोमांचक फाइनल में विजयी होकर भारत के नाम स्वर्ण पदक दर्ज किया।"
    ]),
    contentEn: createBlocks([
      "### Detailed Gold Medalists Summary",
      "• **Neeru Dhanda (Trap Shooting)**: Won Gold Medal in Women's Individual Trap event on Sept 29, 2026, marking India's first individual shooting gold at Asian Games 2026.",
      "• **Indian Women's Cricket Team**: Defeated Sri Lanka in the final to successfully defend their T20 Gold Medal.",
      "• **Suruchi Singh & Kamaljeet (10m Air Pistol)**: Equaled the Asian Record to win Gold in the 10m Air Pistol Mixed Team event.",
      "• **Indian Men's Kabaddi Team**: Claimed Gold Medal by winning the Men's Kabaddi tournament final.",
      "• **Indian Women's Kabaddi Team**: Secured Gold Medal after victory in the Women's Kabaddi final match."
    ])
  };

  // Section 2: Sport-Wise Medal Breakdown Table
  const sec2SportWiseTable = {
    _key: "sec-2-sport-wise",
    title: "खेल-वार पदक तालिका (Sport-wise Medal Tally of India)",
    titleEn: "Sport-wise Medal Breakdown of Team India",
    content: createBlocks([
      "एशियन गेम्स 2026 में शूटिंग (Shooting) और एथलेटिक्स (Athletics) भारत के लिए सबसे ज्यादा पदक दिलाने वाले खेल रहे हैं। नीचे विभिन्न खेलों में भारत के पदक जीत की विस्तृत खेल-वार तालिका दी गई है:",
      "विस्तृत पाठ्यक्रम अध्ययन हेतु [MPPSC मुख्य परीक्षा पाठ्यक्रम](/mppsc/mains-syllabus) और [MPPSC प्रारंभिक परीक्षा पाठ्यक्रम](/mppsc/prelims-syllabus) देखें।"
    ]),
    contentEn: createBlocks([
      "Shooting and Athletics contributed the largest share of medals for India at the 2026 Asian Games. Below is the comprehensive sport-wise medal breakdown table:",
      "Explore [MPPSC Mains Syllabus](/mppsc/mains-syllabus) and [MPPSC Prelims Syllabus](/mppsc/prelims-syllabus) for structured preparation."
    ]),
    table: createTable(
      "tbl-sport-wise",
      "एशियन गेम्स 2026: खेल-वार पदक वितरण (Sport-wise Medal Breakdown Table)",
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

  // Section 3: Major Silver & Bronze Winners & Highlights
  const sec3KeyHighlights = {
    _key: "sec-3-key-highlights",
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
      "• **हिमांशु ढिल्लों एवं रुद्राक्ष पाटिल (Himanshu Dhillon & Rudrankksh Patil - Shooting 🥈/🥉)**: 10 मीटर एयर राइफल व्यक्तिगत व टीम स्पर्धा में रजत व कांस्य पदक जीता।",
      "• **ऐश्वर्य प्रताप सिंह तोमर (Aishwary Tomar - Shooting 🥈)**: 50 मीटर राइफल 3-पोजीशन स्पर्धा में रजत पदक जीता।",
      "• **एलावेनिल वलारिवन एवं सोनम उत्तम मस्कर (Elavenil Valarivan & Sonam Maskar - Shooting 🥈)**: महिला 10m एयर राइफल टीम स्पर्धा में रजत पदक जीता।",
      "• **ईशा सिंह (Esha Singh - Shooting 🥈)**: 25 मीटर पिस्टल स्पर्धा में रजत पदक हासिल किया।",
      "• **नाओरेम रोशिबिना देवी (Roshibina Devi - Wushu 🥈)**: वुशू सांडा 60 किग्रा वर्ग में रजत पदक अर्जित किया।",
      "• **सतनाम सिंह एवं सलमान खान (Satnam & Salman - Rowing 🥉)**: पुरुषों की डबल स्कल्स रोइंग में कांस्य पदक जीता।"
    ]),
    contentEn: createBlocks([
      "### Major Medallists Highlights",
      "• **Vithya Ramraj (400m Hurdles 🥉)**: Clocked 54.75s in Women's 400m Hurdles, breaking PT Usha's 42-year-old national record to secure Bronze.",
      "• **Narendra Berwal (Boxing 🥉)**: Won Bronze Medal in Men's +92kg Super Heavyweight Boxing on Sept 29, 2026.",
      "• **Gulveer Singh (Athletics 🥈)**: Secured Silver Medal in Men's 5,000m and 10,000m track events.",
      "• **Parul Chaudhary (Athletics 🥉)**: Clinched two Bronze medals in 3,000m steeplechase and 5,000m.",
      "• **Tajinderpal Singh Toor (Shot Put 🥈)**: Won Silver Medal, earning his 3rd consecutive Asian Games shot put medal.",
      "• **Sawan Barwal (Marathon 🥈)**: Secured Silver Medal in the marathon.",
      "• **Himanshu Dhillon & Rudrankksh Patil (Shooting 🥈/🥉)**: Won Silver and Bronze in 10m Air Rifle individual & team events.",
      "• **Aishwary Pratap Singh Tomar (Shooting 🥈)**: Secured Silver in 50m Rifle 3-Positions event.",
      "• **Elavenil Valarivan & Sonam Uttam Maskar (Shooting 🥈)**: Won Silver in 10m Air Rifle Women's Team event.",
      "• **Esha Singh (Shooting 🥈)**: Secured Silver in Women's 25m Pistol event.",
      "• **Naorem Roshibina Devi (Wushu 🥈)**: Won Silver in Women's Wushu Sanda 60kg event.",
      "• **Satnam Singh & Salman Khan (Rowing 🥉)**: Secured Bronze in Men's Double Sculls."
    ]),
    table: createTable(
      "tbl-full-medallists",
      "एशियन गेम्स 2026: प्रमुख भारतीय पदक विजेताओं की सूची (Major Indian Medallists & Sports Table)",
      ["क्र.सं. (No.)", "खिलाड़ी / टीम (Athlete / Team)", "खेल (Sport)", "स्पर्धा (Event)", "पदक (Medal)"],
      [
        ["1", "नीरू ढांडा (Neeru Dhanda)", "निशानेबाजी (Shooting)", "महिला व्यक्तिगत ट्रैप", "स्वर्ण (Gold 🥇)"],
        ["2", "भारतीय महिला क्रिकेट टीम", "क्रिकेट (Cricket)", "महिला टी-20 स्पर्धा", "स्वर्ण (Gold 🥇)"],
        ["3", "सुरुचि सिंह व कमलजीत", "निशानेबाजी (Shooting)", "10m एयर पिस्टल मिक्स्ड टीम", "स्वर्ण (Gold 🥇)"],
        ["4", "भारतीय पुरुष कबड्डी टीम", "कबड्डी (Kabaddi)", "पुरुष टीम स्पर्धा", "स्वर्ण (Gold 🥇)"],
        ["5", "भारतीय महिला कबड्डी टीम", "कबड्डी (Kabaddi)", "महिला टीम स्पर्धा", "स्वर्ण (Gold 🥇)"],
        ["6", "महिला ट्रैप टीम (नीरू, मनीषा, प्रीति)", "निशानेबाजी (Shooting)", "महिला ट्रैप टीम स्पर्धा", "रजत (Silver 🥈)"],
        ["7", "गुलवीर सिंह (Gulveer Singh)", "एथलेटिक्स (Athletics)", "पुरुष 5000m / 10000m", "रजत (Silver 🥈)"],
        ["8", "तजिंदरपाल सिंह तूर (Tajinderpal Toor)", "एथलेटिक्स (Athletics)", "पुरुष शॉट पुट (गोला फेंक)", "रजत (Silver 🥈)"],
        ["9", "सावन बरवाल (Sawan Barwal)", "एथलेटिक्स (Athletics)", "पुरुष मैराथन", "रजत (Silver 🥈)"],
        ["10", "मुरली श्रीशंकर (Murali Sreeshankar)", "एथलेटिक्स (Athletics)", "पुरुष लंबी कूद (Long Jump)", "रजत (Silver 🥈)"],
        ["11", "ईशा सिंह (Esha Singh)", "निशानेबाजी (Shooting)", "महिला 25m पिस्टल", "रजत (Silver 🥈)"],
        ["12", "एलावेनिल वलारिवन (Elavenil Valarivan)", "निशानेबाजी (Shooting)", "महिला 10m एयर राइफल", "रजत (Silver 🥈)"],
        ["13", "हिमांशु ढिल्लों (Himanshu Dhillon)", "निशानेबाजी (Shooting)", "पुरुष 10m एयर राइफल", "रजत (Silver 🥈)"],
        ["14", "ऐश्वर्य प्रताप सिंह तोमर", "निशानेबाजी (Shooting)", "पुरुष 50m राइफल 3P", "रजत (Silver 🥈)"],
        ["15", "नाओरेम रोशिबिना देवी", "वुशू (Wushu)", "सांडा 60 किग्रा", "रजत (Silver 🥈)"],
        ["16", "नरेंद्र बेरवाल (Narendra Berwal)", "बॉक्सिंग (Boxing)", "पुरुष +92kg सुपर हैवीवेट", "कांस्य (Bronze 🥉)"],
        ["17", "विथ्या रामराज (Vithya Ramraj)", "एथलेटिक्स (Athletics)", "महिला 400m बाधा दौड़", "कांस्य (Bronze 🥉)"],
        ["18", "पारुल चौधरी (Parul Chaudhary)", "एथलेटिक्स (Athletics)", "महिला 3000m स्टीपलचेज़", "कांस्य (Bronze 🥉)"],
        ["19", "रुद्राक्ष पाटिल (Rudrankksh Patil)", "निशानेबाजी (Shooting)", "पुरुष 10m एयर राइफल", "कांस्य (Bronze 🥉)"],
        ["20", "सतनाम सिंह व सलमान खान", "रोइंग (Rowing)", "पुरुष डबल स्कल्स", "कांस्य (Bronze 🥉)"],
        ["21", "सीमा कुमारी (Seema Kumari)", "एथलेटिक्स (Athletics)", "महिला 10,000m दौड़", "कांस्य (Bronze 🥉)"],
        ["22", "सुचिका तरियाल (Suchika Tariyal)", "MMA", "ट्रेडिशनल -60kg", "कांस्य (Bronze 🥉)"]
      ]
    )
  };

  // Section 4: Exam Notes for MPPSC & UPSC
  const sec4ExamNotes = {
    _key: "sec-4-exam-notes",
    title: "MPPSC व UPSC परीक्षा दृष्टि से महत्वपूर्ण समसामयिकी बिंदु (Exam Takeaways & Notes)",
    titleEn: "Important Exam Points for MPPSC & UPSC Preparation",
    content: createBlocks([
      "### परीक्षा उपयोगी तथ्य (Key Exam Facts)",
      "• **मेजबान शहर एवं संस्करण**: 20वें एशियाई खेलों का आयोजन **आइची-नागोया, जापान (Aichi-Nagoya, Japan)** में 19 सितंबर से 4 अक्टूबर 2026 तक किया जा रहा है।",
      "• **भारत की कुल पदक संख्या**: 29 सितंबर 2026 तक भारत ने **कुल 48 पदक (5 स्वर्ण, 21 रजत, 22 कांस्य)** जीते हैं।",
      "• **शूटिंग में पहला व्यक्तिगत स्वर्ण**: नीरू ढांडा ने महिलाओं की व्यक्तिगत ट्रैप निशानेबाजी में भारत के लिए 2026 खेलों का पहला व्यक्तिगत शूटिंग स्वर्ण पदक जीता।",
      "• **राष्ट्रीय रिकॉर्ड ध्वस्त**: विथ्या रामराज ने महिलाओं की 400 मीटर बाधा दौड़ में 54.75 सेकंड के समय के साथ पी.टी. उषा का 42 वर्ष पुराना राष्ट्रीय रिकॉर्ड तोड़ा।",
      "• **प्रथम एशियन गेम्स का इतिहास**: प्रथम एशियाई खेलों का आयोजन वर्ष **1951 में नई दिल्ली, भारत** में हुआ था। भारत ने 1951 तथा 1982 में दो बार एशियाई खेलों की मेजबानी की है।",
      "• **MPPSC परीक्षा संदर्भ**: [MPPSC समसामयिकी एवं खेलकूद नोट्स](/mppsc-current-affairs), [MPPSC टेस्ट सीरीज](/test-series) और ऑनलाइन तैयारी हेतु [Aakar IAS ऑनलाइन कोर्सेस](/online-courses) का लाभ उठाएं।"
    ]),
    contentEn: createBlocks([
      "### Key Exam Facts",
      "• **Host City & Edition**: The 20th Asian Games are taking place in **Aichi-Nagoya, Japan** from September 19 to October 4, 2026.",
      "• **India's Total Tally**: As of September 29, 2026, India has secured **48 Medals (5 Gold, 21 Silver, 22 Bronze)**.",
      "• **First Individual Shooting Gold**: Neeru Dhanda won India's first individual shooting Gold Medal of the 2026 Games in Women's Trap.",
      "• **National Record**: Vithya Ramraj broke PT Usha's 42-year-old national record in Women's 400m Hurdles (54.75s).",
      "• **Inaugural Asian Games History**: The first Asian Games were hosted in **New Delhi, India in 1951**. India hosted the Games twice (1951 and 1982).",
      "• **MPPSC Exam Reference**: Practice with [MPPSC Current Affairs Notes](/mppsc-current-affairs), [MPPSC Test Series](/test-series), and explore [Online Courses](/online-courses)."
    ])
  };

  // 10 Collapsible FAQs
  const faqs = [
    {
      question: "एशियन गेम्स 2026 में भारत ने 29 सितंबर 2026 तक कुल कितने पदक जीते हैं?",
      questionEn: "How many total medals has India won at Asian Games 2026 as of September 29, 2026?",
      answer: "एशियन गेम्स 2026 में 29 सितंबर 2026 (Day 11) तक भारत ने कुल 48 पदक जीते हैं, जिसमें 5 स्वर्ण (Gold), 21 रजत (Silver) और 22 कांस्य (Bronze) पदक शामिल हैं।",
      answerEn: "As of September 29, 2026 (Day 11), India has won a total of 48 medals: 5 Gold, 21 Silver, and 22 Bronze medals."
    },
    {
      question: "एशियन गेम्स 2026 में भारत के 5 स्वर्ण पदक विजेता कौन-कौन हैं?",
      questionEn: "Who are India's 5 Gold Medal winners at Asian Games 2026?",
      answer: "भारत के 5 स्वर्ण पदक विजेता हैं: 1. नीरू ढांडा (ट्रैप शूटिंग), 2. भारतीय महिला क्रिकेट टीम, 3. सुरुचि सिंह व कमलजीत (10m एयर पिस्टल मिक्स्ड), 4. भारतीय पुरुष कबड्डी टीम, और 5. भारतीय महिला कबड्डी टीम।",
      answerEn: "India's 5 Gold Medal winners are: 1. Neeru Dhanda (Trap Shooting), 2. Indian Women's Cricket Team, 3. Suruchi Singh & Kamaljeet (10m Air Pistol Mixed Team), 4. Indian Men's Kabaddi Team, and 5. Indian Women's Kabaddi Team."
    },
    {
      question: "नीरू ढांडा ने किस खेल स्पर्धा में स्वर्ण पदक हासिल किया है?",
      questionEn: "In which event did Neeru Dhanda win the Gold Medal?",
      answer: "नीरू ढांडा ने महिलाओं की व्यक्तिगत ट्रैप निशानेबाजी (Women's Individual Trap Shooting) स्पर्धा में स्वर्ण पदक जीता। यह 2026 खेलों में शूटिंग का भारत का पहला व्यक्तिगत स्वर्ण है।",
      answerEn: "Neeru Dhanda won the Gold Medal in Women's Individual Trap Shooting, marking India's first individual shooting gold at the 2026 Games."
    },
    {
      question: "एशियन गेम्स 2026 का आयोजन किस देश व शहर में किया जा रहा है?",
      questionEn: "Where are the Asian Games 2026 being held?",
      answer: "20वें एशियाई खेलों का आयोजन आइची-नागोया, जापान (Aichi-Nagoya, Japan) में 19 सितंबर से 4 अक्टूबर 2026 तक किया जा रहा है।",
      answerEn: "The 20th Asian Games are taking place in Aichi-Nagoya, Japan from September 19 to October 4, 2026."
    },
    {
      question: "किस भारतीय एथलीट ने पी.टी. उषा का 42 वर्ष पुराना राष्ट्रीय रिकॉर्ड तोड़ा?",
      questionEn: "Which Indian athlete broke PT Usha's 42-year-old national record?",
      answer: "विथ्या रामराज (Vithya Ramraj) ने महिलाओं की 400 मीटर बाधा दौड़ में 54.75 सेकंड का समय निकालकर पी.टी. उषा के 42 साल पुराने राष्ट्रीय रिकॉर्ड को ध्वस्त कर कांस्य पदक जीता।",
      answerEn: "Vithya Ramraj broke PT Usha's 42-year-old national record in Women's 400m Hurdles with a time of 54.75s to win Bronze."
    },
    {
      question: "एशियन गेम्स 2026 में निशानेबाजी (Shooting) में भारत को कुल कितने पदक मिले हैं?",
      questionEn: "How many total medals did India win in Shooting at Asian Games 2026?",
      answer: "निशानेबाजी (Shooting) में भारत ने सर्वाधिक 17 पदक जीते हैं, जिसमें 2 स्वर्ण (Gold), 9 रजत (Silver) और 6 कांस्य (Bronze) पदक शामिल हैं।",
      answerEn: "India has won a total of 17 shooting medals, comprising 2 Gold, 9 Silver, and 6 Bronze medals."
    },
    {
      question: "भारतीय महिला क्रिकेट टीम ने एशियन गेम्स 2026 में कौन सा पदक जीता?",
      questionEn: "Which medal did the Indian Women's Cricket Team win at Asian Games 2026?",
      answer: "भारतीय महिला क्रिकेट टीम ने फाइनल मुकाबले में श्रीलंका को हराकर स्वर्ण पदक (Gold Medal) जीता और अपना एशियाई खिताब सफलतापूर्वक बरकरार रखा।",
      answerEn: "The Indian Women's Cricket Team defeated Sri Lanka in the final to win the Gold Medal and defend their title."
    },
    {
      question: "तजिंदरपाल सिंह तूर ने किस स्पर्धा में लगातार तीसरी बार एशियन गेम्स में पदक जीता?",
      questionEn: "In which event did Tajinderpal Singh Toor win his third consecutive Asian Games medal?",
      answer: "तजिंदरपाल सिंह तूर ने पुरुषों की शॉट पुट (गोला फेंक) स्पर्धा में रजत पदक जीतकर लगातार तीसरे एशियाई खेलों में पदक प्राप्त करने का कीर्तिमान बनाया।",
      answerEn: "Tajinderpal Singh Toor won Silver in Men's Shot Put, earning his third consecutive Asian Games medal."
    },
    {
      question: "प्रथम एशियाई खेलों (Inaugural Asian Games) का आयोजन कब और कहाँ हुआ था?",
      questionEn: "When and where were the inaugural Asian Games held?",
      answer: "प्रथम एशियाई खेलों का आयोजन वर्ष 1951 में नई दिल्ली, भारत (New Delhi, India) में हुआ था।",
      answerEn: "The inaugural Asian Games were held in New Delhi, India in 1951."
    },
    {
      question: "यह जानकारी MPPSC एवं UPSC परीक्षा के लिए क्यों महत्वपूर्ण है?",
      questionEn: "Why is this updated medal tally important for MPPSC & UPSC preparation?",
      answer: "MPPSC Prelims (Unit 8: खेलकूद व राष्ट्रीय समसामयिकी) तथा UPSC Prelims जनरल अवेयरनेस में एशियाई खेलों के पदक विजेताओं, रिकॉर्ड्स एवं आयोजकों से सीधे प्रश्न पूछे जाते हैं।",
      answerEn: "MPPSC Prelims Unit 8 and UPSC General Awareness frequently feature direct objective questions on Asian Games medalists, records, and host venues."
    }
  ];

  // 8 Practice MCQs (Quizzes) for currentAffairs
  const mcqs = [
    {
      question: "20वें एशियाई खेल 2026 का आयोजन निम्नलिखित में से किस देश व शहर में किया जा रहा है?",
      questionEn: "The 20th Asian Games 2026 are being held in which host city and country?",
      options: [
        "हांगझोऊ, चीन (Hangzhou, China)",
        "आइची-नागोया, जापान (Aichi-Nagoya, Japan)",
        "रियाद, सउदी अरब (Riyadh, Saudi Arabia)",
        "बैंकॉक, थाईलैंड (Bangkok, Thailand)"
      ],
      optionsEn: [
        "Hangzhou, China",
        "Aichi-Nagoya, Japan",
        "Riyadh, Saudi Arabia",
        "Bangkok, Thailand"
      ],
      correctIndex: 1,
      explanation: "20वें एशियाई खेल 2026 का आयोजन 19 सितंबर से 4 अक्टूबर 2026 तक आइची-नागोया, जापान (Aichi-Nagoya, Japan) में हो रहा है।",
      explanationEn: "The 20th Asian Games 2026 are being hosted in Aichi-Nagoya, Japan from September 19 to October 4, 2026."
    },
    {
      question: "29 सितंबर 2026 (Day 11) तक एशियन गेम्स 2026 में भारत की कुल पदक संख्या कितनी है?",
      questionEn: "What is India's total medal count at the Asian Games 2026 as of September 29, 2026?",
      options: ["35 पदक", "42 पदक", "48 पदक", "55 पदक"],
      optionsEn: ["35 Medals", "42 Medals", "48 Medals", "55 Medals"],
      correctIndex: 2,
      explanation: "29 सितंबर 2026 तक भारत ने कुल 48 पदक (5 स्वर्ण, 21 रजत, 22 कांस्य) हासिल कर लिए हैं।",
      explanationEn: "As of September 29, 2026, India has secured 48 medals (5 Gold, 21 Silver, 22 Bronze)."
    },
    {
      question: "एशियन गेम्स 2026 में भारत के लिए शूटिंग स्पर्धा में पहला व्यक्तिगत स्वर्ण पदक किसने जीता?",
      questionEn: "Who won India's first individual shooting Gold Medal at the Asian Games 2026?",
      options: [
        "ईशा सिंह (Esha Singh)",
        "नीरू ढांडा (Neeru Dhanda)",
        "एलावेनिल वलारिवन (Elavenil Valarivan)",
        "सोनम उत्तम मस्कर (Sonam Maskar)"
      ],
      optionsEn: [
        "Esha Singh",
        "Neeru Dhanda",
        "Elavenil Valarivan",
        "Sonam Uttam Maskar"
      ],
      correctIndex: 1,
      explanation: "नीरू ढांडा ने महिलाओं की व्यक्तिगत ट्रैप शूटिंग में 29 सितंबर 2026 को भारत का पहला शूटिंग व्यक्तिगत स्वर्ण पदक जीता।",
      explanationEn: "Neeru Dhanda won India's first individual shooting Gold Medal in Women's Trap on September 29, 2026."
    },
    {
      question: "महिलाओं की 400 मीटर बाधा दौड़ में पी.टी. उषा का 42 वर्ष पुराना राष्ट्रीय रिकॉर्ड किस एथलीट ने तोड़ा?",
      questionEn: "Which athlete broke PT Usha's 42-year-old national record in Women's 400m Hurdles?",
      options: [
        "विथ्या रामराज (Vithya Ramraj)",
        "पारुल चौधरी (Parul Chaudhary)",
        "सीमा कुमारी (Seema Kumari)",
        "प्राची (Prachi)"
      ],
      optionsEn: [
        "Vithya Ramraj",
        "Parul Chaudhary",
        "Seema Kumari",
        "Prachi"
      ],
      correctIndex: 0,
      explanation: "विथ्या रामराज ने 54.75 सेकंड के समय के साथ पी.टी. उषा का 42 साल पुराना राष्ट्रीय रिकॉर्ड तोड़कर कांस्य पदक जीता।",
      explanationEn: "Vithya Ramraj broke PT Usha's 42-year-old national record in 400m Hurdles with a time of 54.75s to win Bronze."
    },
    {
      question: "भारतीय महिला क्रिकेट टीम ने एशियन गेम्स 2026 के फाइनल में किस देश को हराकर स्वर्ण पदक जीता?",
      questionEn: "Indian Women's Cricket Team defeated which country in the Asian Games 2026 final to win Gold?",
      options: [
        "पाकिस्तान (Pakistan)",
        "बांग्लादेश (Bangladesh)",
        "श्रीलंका (Sri Lanka)",
        "ऑस्ट्रेलिया (Australia)"
      ],
      optionsEn: [
        "Pakistan",
        "Bangladesh",
        "Sri Lanka",
        "Australia"
      ],
      correctIndex: 2,
      explanation: "भारतीय महिला क्रिकेट टीम ने फाइनल मुकाबले में श्रीलंका को पराजित कर लगातार दूसरी बार स्वर्ण पदक जीता।",
      explanationEn: "The Indian Women's Cricket Team defeated Sri Lanka in the final match to secure the Gold Medal."
    },
    {
      question: "10 मीटर एयर पिस्टल मिक्स्ड टीम स्पर्धा में एशियाई रिकॉर्ड की बराबरी कर स्वर्ण पदक जीतने वाली भारतीय जोड़ी कौन सी है?",
      questionEn: "Which pair equaled the Asian Record to win Gold in 10m Air Pistol Mixed Team event?",
      options: [
        "रुद्राक्ष पाटिल एवं एलावेनिल वलारिवन",
        "सुरुचि सिंह एवं कमलजीत",
        "हिमांशु ढिल्लों एवं सोनम मस्कर",
        "ऐश्वर्य तोमर एवं ईशा सिंह"
      ],
      optionsEn: [
        "Rudrankksh Patil & Elavenil Valarivan",
        "Suruchi Singh & Kamaljeet",
        "Himanshu Dhillon & Sonam Maskar",
        "Aishwary Tomar & Esha Singh"
      ],
      correctIndex: 1,
      explanation: "सुरुचि सिंह एवं कमलजीत ने 10 मीटर एयर पिस्टल मिक्स्ड टीम स्पर्धा में एशियाई रिकॉर्ड की बराबरी करते हुए स्वर्ण पदक जीता।",
      explanationEn: "Suruchi Singh & Kamaljeet equaled the Asian Record in 10m Air Pistol Mixed Team to win Gold."
    },
    {
      question: "लगातार तीसरे एशियाई खेलों में शॉट पुट (गोला फेंक) स्पर्धा में पदक जीतने वाले भारतीय एथलीट कौन हैं?",
      questionEn: "Which Indian athlete won a shot put medal in three consecutive Asian Games?",
      options: [
        "तजिंदरपाल सिंह तूर (Tajinderpal Singh Toor)",
        "मुरली श्रीशंकर (Murali Sreeshankar)",
        "गुलवीर सिंह (Gulveer Singh)",
        "सावन बरवाल (Sawan Barwal)"
      ],
      optionsEn: [
        "Tajinderpal Singh Toor",
        "Murali Sreeshankar",
        "Gulveer Singh",
        "Sawan Barwal"
      ],
      correctIndex: 0,
      explanation: "तजिंदरपाल सिंह तूर ने पुरुषों के शॉट पुट में रजत पदक जीतकर लगातार तीसरे एशियन गेम्स में पदक प्राप्त किया।",
      explanationEn: "Tajinderpal Singh Toor won Silver in Men's Shot Put, earning a medal in his third consecutive Asian Games."
    },
    {
      question: "प्रथम एशियाई खेलों (Inaugural Asian Games) का आयोजन किस वर्ष एवं शहर में हुआ था?",
      questionEn: "In which year and city were the first inaugural Asian Games organized?",
      options: [
        "1951, नई दिल्ली (New Delhi, 1951)",
        "1954, मनीला (Manila, 1954)",
        "1958, टोक्यो (Tokyo, 1958)",
        "1962, जकार्ता (Jakarta, 1962)"
      ],
      optionsEn: [
        "New Delhi, 1951",
        "Manila, 1954",
        "Tokyo, 1958",
        "Jakarta, 1962"
      ],
      correctIndex: 0,
      explanation: "प्रथम एशियाई खेलों का आयोजन वर्ष 1951 में नई दिल्ली, भारत में किया गया था।",
      explanationEn: "The inaugural Asian Games were organized in New Delhi, India in 1951."
    }
  ];

  const docSlug = "asian-games-2026-10m-air-rifle-india-medals-himanshu-dhillon-rudrankksh-patil";
  const docTitleHi = "MPPSC & UPSC: एशियन गेम्स 2026 पदक तालिका (Medal Tally) | भारत के 48 पदक (5 स्वर्ण, 21 रजत, 22 कांस्य), नीरू ढांडा गोल्ड व विजेताओं की सूची";
  const docTitleEn = "MPPSC & UPSC: Asian Games 2026 Medal Tally | India's 48 Medals (5 Gold, 21 Silver, 22 Bronze), Neeru Dhanda Gold & Full Winners List";
  const docExcerptHi = "एशियन गेम्स 2026 (आइची-नागोया, जापान) में 29 सितंबर 2026 तक भारत ने 5 स्वर्ण, 21 रजत और 22 कांस्य सहित कुल 48 पदक जीत लिए हैं। नीरू ढांडा ने ट्रैप शूटिंग में पहला व्यक्तिगत शूटिंग गोल्ड जीता। देखें महिला क्रिकेट, शूटिंग, एथलेटिक्स व कबड्डी विजेताओं की संपूर्ण श्रेणीवार सूची व टेबल।";
  const docExcerptEn = "At the 2026 Asian Games in Aichi-Nagoya, Japan, Team India has clinched 48 medals (5 Gold, 21 Silver, 22 Bronze) as of September 29, 2026. Neeru Dhanda bagged India's first individual shooting Gold in Women's Trap. Explore the complete sport-wise medal table, winners list, and MPPSC & UPSC notes.";

  const keywordsArray = [
    "asian games 2026 medal tally",
    "asian games 2026 medal list",
    "asian games 2026 medal tally table",
    "asian games 2026 medal table india",
    "asian games 2026 medal list india winners list",
    "mppsc current affairs asian games 2026",
    "neeru dhanda gold medal asian games 2026",
    "women cricket gold medal asian games 2026",
    "suruchi kamaljeet shooting gold asian games",
    "narendra berwal boxing bronze asian games",
    "vithya ramraj 400m hurdles bronze",
    "parul chaudhary steeplechase bronze",
    "tajinderpal singh toor shot put silver",
    "gulveer singh athletics silver asian games 2026",
    "himanshu dhillon rudrankksh patil shooting medals"
  ];

  const docIds = [
    "ca-asian-games-2026-10m-air-rifle-india",
    "gk-asian-games-2026-10m-air-rifle-india"
  ];

  for (const docId of docIds) {
    const isCA = docId.startsWith("ca-");
    console.log(`📌 Updating Sanity document: ${docId} (${isCA ? "currentAffairs" : "staticGk"})...`);

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
      seoTitle: cleanText("MPPSC & UPSC: एशियन गेम्स 2026 मेडल टैली | भारत के 48 पदक व विजेताओं की सूची"),
      seoTitleEn: cleanText("Asian Games 2026 Medal Tally: India's 48 Medals & Full Winners List | MPPSC & UPSC"),
      metaDescription: cleanText(docExcerptHi),
      metaDescriptionEn: cleanText(docExcerptEn),
      keywords: keywordsArray,
      sections: [
        sec0Overview,
        sec1GoldWinners,
        sec2SportWiseTable,
        sec3KeyHighlights,
        sec4ExamNotes,
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

    console.log(`✅ Document ${docId} successfully updated with latest 48 Medals Tally!`);
  }

  console.log("🎉 ALL ASIAN GAMES 2026 MEDAL TALLY ARTICLES SUCCESSFULLY UPDATED AND PUBLISHED TO SANITY CMS!");
}

main().catch((err) => {
  console.error("❌ Failed to update Asian Games medal tally article:", err);
  process.exit(1);
});
