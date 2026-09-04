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

// Helper to convert array of strings to Portable Text blocks
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
  console.log("🚀 Starting upload process for Ariha Pangambam Asian Gymnastics Gold Medal Article...");

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

  // 4. Upload Images
  const imgPathFeatured = "/Users/aakariastech/.gemini/antigravity-ide/brain/50f115f9-b00e-4c6b-bea1-d01c7d0acf76/ariha_pangambam_featured_1786451100000_1786451492959.png";
  const imgPathAction = "/Users/aakariastech/.gemini/antigravity-ide/brain/50f115f9-b00e-4c6b-bea1-d01c7d0acf76/ariha_pangambam_action_1786451200000_1786451514175.png";
  const imgPathSportsMgmt = "/Users/aakariastech/.gemini/antigravity-ide/brain/50f115f9-b00e-4c6b-bea1-d01c7d0acf76/ariha_pangambam_sports_management_1786451300000_1786451604750.png";

  const featuredAssetId = await uploadImageAsset(imgPathFeatured, "ariha_pangambam_featured.png");
  const actionAssetId = await uploadImageAsset(imgPathAction, "ariha_pangambam_action.png");
  const sportsMgmtAssetId = await uploadImageAsset(imgPathSportsMgmt, "ariha_pangambam_sports_management.png");

  const featuredImageObj = {
    _type: "image",
    asset: { _type: "reference", _ref: featuredAssetId },
    alt: "अरिहा पंगमबम: एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप में भारत का पहला स्वर्ण पदक",
    caption: "चित्र: 22 वर्षीया अरिहा पंगमबम (मणिपुर) ने एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप (7 अगस्त 2026) में भारत के लिए पहला स्वर्ण पदक जीतकर इतिहास रचा।",
  };

  const actionImageBlock = {
    _key: "img-block-action",
    _type: "image",
    asset: { _type: "reference", _ref: actionAssetId },
    alt: "अरिहा पंगमबम का 19.100 स्कोर के साथ एयरोबिक जिम्नास्टिक्स फाइनल प्रदर्शन",
    caption: "चित्र: सीनियर महिला व्यक्तिगत स्पर्धा के दौरान 19.100 का सर्वोच्च स्कोर हासिल करतीं भारतीय जिम्नास्ट अरिहा पंगमबम।",
  };

  const sportsMgmtImageBlock = {
    _key: "img-block-sports-mgmt",
    _type: "image",
    asset: { _type: "reference", _ref: sportsMgmtAssetId },
    alt: "अरिहा पंगमबम - स्पोर्ट्स मैनेजमेंट शिक्षा एवं अंतर्राष्ट्रीय महासंघ (FIG) जुड़ाव",
    caption: "चित्र: खेल प्रदर्शन के साथ-साथ AISTS India से स्पोर्ट्स लीडरशिप व स्पोर्ट्स मैनेजमेंट में उच्च शिक्षा प्राप्त कर रहीं अरिहा पंगमबम।",
  };

  // Section 0: Championship History & AGU (New Section from User Screenshot)
  const sec0ChampionshipHistory = {
    _key: "sec-0-championship-history",
    kind: "whyInNews",
    title: "एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप (AGU): इतिहास, स्वरूप व भारत की उपलब्धि",
    titleEn: "Asian Aerobic Gymnastics Championships (AGU): History, Format & India's Milestone",
    body: [
      ...createBlocks([
        "### एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप का इतिहास (History of Championship)",
        "• **शासी संस्था (Governing Body)**: एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप का आयोजन **एशियन जिम्नास्टिक्स यूनियन (AGU - Asian Gymnastics Union)** द्वारा किया जाता है, जिसमें पूरे एशिया के सर्वश्रेष्ठ एयरोबिक जिम्नास्ट हिस्सा लेते हैं।",
        "• **शुरुआत (Inaugural Edition)**: पहली एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप का आयोजन **मार्च 2009 में बैंकॉक, थाईलैंड (Bangkok, Thailand)** में किया गया था।",
        "• **प्रतिभागी देश (Participating Nations)**: 2009 के पहले संस्करण में भारत, चीन, जापान, कोरिया और थाईलैंड सहित 10 एशियाई देशों ने हिस्सा लिया था।",
        "• **खेल का स्वरूप (Sports Format)**: एयरोबिक जिम्नास्टिक्स में खिलाड़ी संगीत की तीव्र धुन पर अपनी शारीरिक ताकत (Strength), लचक (Flexibility), संतुलन (Balance) और जटिल तकनीकी कौशल का गतिशील प्रदर्शन करते हैं।",
        "### 10वीं चैंपियनशिप (2026) में भारत का स्वर्णिम सफर (7 अगस्त 2026)",
        "• **ऐतिहासिक तारीख**: भारत इस चैंपियनशिप में लंबे समय से भाग ले रहा है, लेकिन **7 अगस्त 2026** को भारत ने इस खेल के इतिहास का सबसे बड़ा स्वर्णिम अध्याय लिखा।",
        "• **10वाँ संस्करण व स्थल**: 10वीं एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप का आयोजन **तगाएताय सिटी (Tagaytay City, फिलीपींस)** में किया गया।",
        "• **पहला गोल्ड मेडल (Gold Medal)**: मणिपुर की 22 वर्षीया **अरिहा पंगमबम (Ariha Pangambam)** ने **सीनियर महिला व्यक्तिगत (Senior Women's Individual)** स्पर्धा में स्वर्ण पदक जीतकर नया इतिहास रचा।",
        "• **एक और ऐतिहासिक पदक (Senior Aero Step Bronze Medal)**: इसी 2026 चैंपियनशिप में भारत की टीम ने **सीनियर एयरो स्टेप (Senior Aero Step)** कैटेगरी में भी **कांस्य पदक (Bronze Medal)** अपने नाम किया।"
      ]),
      createTable(
        "table-agu-history-hi",
        "एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप: संक्षिप्त इतिहास व भारत का रिकॉर्ड (AGU Summary)",
        ["पैरामीटर (Parameter)", "विवरण (Details)"],
        [
          ["**शासी संस्था**", "एशियन जिम्नास्टिक्स यूनियन (AGU - Asian Gymnastics Union)"],
          ["**पहला संस्करण**", "मार्च 2009 | बैंकॉक, थाईलैंड (10 प्रतिभागी देश)"],
          ["**10वाँ संस्करण (2026)**", "7 अगस्त 2026 | तगाएताय सिटी (Tagaytay City), फिलीपींस"],
          ["**भारत का पहला स्वर्ण**", "अरिहा पंगमबम (Senior Individual Women, Score: 19.100)"],
          ["**भारत का दूसरा पदक**", "सीनियर एयरो स्टेप (Senior Aero Step) कैटेगरी में कांस्य पदक (Bronze)"],
          ["**अंतर्राष्ट्रीय संस्था**", "FIG (Fédération Internationale de Gymnastique - लुसाने, स्विट्जरलैंड)"]
        ]
      )
    ],
    bodyEn: [
      ...createBlocks([
        "### History of Asian Aerobic Gymnastics Championships (AGU)",
        "• **Governing Body**: Organized by the **Asian Gymnastics Union (AGU)**, featuring elite aerobic gymnasts across Asia.",
        "• **Inaugural Championship**: The 1st Asian Aerobic Gymnastics Championship was held in **March 2009 in Bangkok, Thailand**.",
        "• **Participating Countries**: 10 countries competed in the inaugural 2009 edition, including India, China, Japan, Korea, and Thailand.",
        "• **Sport Format**: Athletes perform high-intensity continuous dynamic movements demonstrating strength, flexibility, balance, and artistry synced with music rhythm.",
        "### India's Double Medal Sweep at 10th Asian Championship (August 7, 2026)",
        "• **Historical Date**: On **August 7, 2026**, India registered its greatest performance in continental gymnastics history in Tagaytay City, Philippines.",
        "• **First Gold Medal**: Ariha Pangambam won **Gold** in Senior Individual Women with 19.100 points.",
        "• **Bronze Medal**: Indian squad also bagged **Bronze Medal** in the **Senior Aero Step** category!"
      ]),
      createTable(
        "table-agu-history-en",
        "Asian Aerobic Gymnastics Championships Fact Sheet",
        ["Parameter", "Details"],
        [
          ["**Governing Body**", "Asian Gymnastics Union (AGU)"],
          ["**First Edition**", "March 2009 | Bangkok, Thailand (10 Nations)"],
          ["**10th Edition (2026)**", "August 7, 2026 | Tagaytay City, Philippines"],
          ["**India's First Gold**", "Ariha Pangambam (Senior Women's Individual - 19.100 Score)"],
          ["**India's Bronze Medal**", "Senior Aero Step Category Team Bronze Medal"]
        ]
      )
    ]
  };

  // Section 1: Intro & Historical Achievement (Slides 1, 2, 3)
  const sec1Intro = {
    _key: "sec-1-intro-achievement",
    kind: "background",
    title: "ऐतिहासिक उपलब्धि: अरिहा पंगमबम ने एशियन एयरोबिक जिम्नास्टिक में भारत को दिलाया पहला गोल्ड",
    titleEn: "Historic Milestone: Ariha Pangambam Wins India's First Gold at Asian Aerobic Gymnastics Championships",
    body: [
      ...createBlocks([
        "### भारत के खेल इतिहास में नया स्वर्णिम अध्याय",
        "• **ऐतिहासिक उपलब्धि**: मणिपुर की 22 वर्षीया युवा जिम्नास्ट **अरिहा पंगमबम (Ariha Pangambam)** ने **7 अगस्त 2026** को एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप में **सीनियर महिला व्यक्तिगत (Senior Individual Women)** स्पर्धा में **स्वर्ण पदक (Gold Medal)** जीतकर इतिहास रच दिया।",
        "• **प्रथम भारतीय जिम्नास्ट**: अरिहा पंगमबम इस महाद्वीपीय प्रतियोगिता में भारत के लिए **पहला ऐतिहासिक स्वर्ण पदक** जीतने वाली पहली भारतीय जिम्नास्ट बन गई हैं।",
        "• **प्रतियोगिता स्थल व वर्ग**: यह 10वीं एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप तगाएताय सिटी (Tagaytay City, फिलीपींस) में आयोजित की गई थी।",
        "### फाइनल में 19.100 का शानदार स्कोरिंग ब्रेकअप",
        "• **आर्टिस्ट्री स्कोर (Artistry)**: **8.650** — कलात्मकता, संगीत समन्वय और रचनात्मक कोरियोग्राफी।",
        "• **एग्जीक्यूशन स्कोर (Execution)**: **7.600** — तकनीकों के सटीक निष्पादन और लैंडिंग बैलेंस।",
        "• **डिफिकल्टी स्कोर (Difficulty)**: **2.850** — कठिन शारीरिक स्टंट्स और एरोबिक एलिमेंट्स।",
        "• **कुल स्कोर (Total Score)**: **19.100** — इस सर्वोच्च स्कोर के साथ अरिहा पोडियम पर पहले स्थान पर रहीं।"
      ]),
      actionImageBlock,
    ],
    bodyEn: [
      ...createBlocks([
        "### A New Golden Chapter in Indian Sports History",
        "• **Historic Milestone**: 22-year-old gymnast **Ariha Pangambam** from Manipur made history on **August 7, 2026** by winning **India's first-ever Senior Women's Individual Gold Medal** at the **10th Asian Aerobic Gymnastics Championship** in Tagaytay City, Philippines.",
        "• **First Indian Gymnast**: She became the very first Indian gymnast to secure an Asian Aerobic Gymnastics continental Gold Medal.",
        "### Score Breakdown of Final Routine (Total: 19.100)",
        "• **Artistry Score**: **8.650**",
        "• **Execution Score**: **7.600**",
        "• **Difficulty Score**: **2.850**",
        "• **Total Overall Score**: **19.100**"
      ])
    ]
  };

  // Section 2: Journey from Failure to Gold & National Records (Slides 4, 5)
  const sec2Journey = {
    _key: "sec-2-journey-national-records",
    kind: "keyHighlights",
    title: "असफलता से स्वर्ण पदक तक का प्रेरणादायक सफर एवं राष्ट्रीय रिकॉर्ड",
    titleEn: "Journey from Fourth Place to Continental Gold & National Achievements",
    body: [
      ...createBlocks([
        "### दो बार पदक से चूकने के बाद रिकॉर्ड तोड़ वापसी (Resilience & Perseverance)",
        "• **2022 एशियन चैंपियनशिप**: वर्ष 2022 की एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप में अरिहा चौथे स्थान (**4th Position**) पर रहीं।",
        "• **2024 एशियन चैंपियनशिप**: वर्ष 2024 की प्रतियोगिता में भी वह पुनः चौथे स्थान (**4th Position**) पर रहीं।",
        "• **अचूक निरंतरता व मेहनत**: दोनों बार पोडियम से बाहर रहने के बावजूद अरिहा ने कठिन अभ्यास जारी रखा और 2026 में ऐतिहासिक स्वर्ण पदक जीता।",
        "### राष्ट्रीय स्तर पर अभूतपूर्व उपलब्धियाँ (National Games Dominance)",
        "• **2023 राष्ट्रीय खेल (National Games)**: गोवा में आयोजित राष्ट्रीय खेलों में एयरोबिक जिम्नास्टिक्स में **स्वर्ण पदक** जीता।",
        "• **2025 राष्ट्रीय खेल (National Games)**: उत्तराखंड में आयोजित राष्ट्रीय खेलों में लगातार दूसरा **स्वर्ण पदक** अपने नाम किया।",
        "• **राष्ट्रीय चैंपियन**: अरिहा कई बार राष्ट्रीय जिम्नास्टिक्स चैंपियनशिप में स्वर्ण पदक हासिल कर चुकी हैं।"
      ])
    ],
    bodyEn: [
      ...createBlocks([
        "### Bouncing Back from Heartbreak (4th Position in 2022 & 2024)",
        "• **2022 Asian Championship**: Finished in **4th place**.",
        "• **2024 Asian Championship**: Finished in **4th place**.",
        "• **Relentless Determination**: Elevated her difficulty score to triumph with Gold in 2026.",
        "### Domestic Dominance & National Games Titles",
        "• **2023 National Games**: Won **Gold Medal** at Goa National Games.",
        "• **2025 National Games**: Retained her championship by winning **Gold Medal** at Uttarakhand National Games."
      ])
    ]
  };

  // Section 3: Profile, Coach & Sports Management Education (Slides 6, 7, 8)
  const sec3ProfileEducation = {
    _key: "sec-3-profile-coach-education",
    kind: "background",
    title: "अरिहा पंगमबम: व्यक्तिगत परिचय, कोच एवं स्पोर्ट्स मैनेजमेंट में उच्च शिक्षा",
    titleEn: "Ariha Pangambam Profile: Bio, Coach & Sports Management Studies",
    body: [
      ...createBlocks([
        "### बायोडाटा एवं प्रोफाइल संक्षिप्त विवरण (Ariha Pangambam Bio Profile)",
        "• **नाम**: अरिहा पंगमबम (Ariha Pangambam)",
        "• **उम्र**: 22 वर्ष",
        "• **गृह राज्य**: मणिपुर (Manipur)",
        "• **खेल अनुशासन**: एयरोबिक जिम्नास्टिक्स (Aerobic Gymnastics)",
        "• **मुख्य स्पर्धा**: सीनियर महिला व्यक्तिगत (Senior Individual Women)",
        "### कोच का मार्गदर्शन एवं अंतर्राष्ट्रीय अनुभव",
        "• **मुख्य कोच**: अरिहा अपनी सफलता का संपूर्ण श्रेय अपने कोच **युमनाम रंजन सिंह (Yumnam Ranjan Singh)** को देती हैं।",
        "• **अंतर्राष्ट्रीय प्रतियोगिताएँ**: अरिहा ने अंतर्राष्ट्रीय जिम्नास्टिक्स महासंघ (**FIG - Fédération Internationale de Gymnastique**) की FIG एयरोबिक जिम्नास्टिक वर्ल्ड चैंपियनशिप और Suzuki World Cup में भारत का प्रतिनिधित्व किया है।",
        "### स्पोर्ट्स मैनेजमेंट (Sports Management) में उच्च शिक्षा",
        "• **शैक्षणिक उपलब्धि**: खेल के साथ-साथ अरिहा **AISTS India** से स्पोर्ट्स मैनेजमेंट में **Post-Graduate Certificate** की पढ़ाई कर रही हैं।",
        "• **प्रमुख विषय क्षेत्र**: स्पोर्ट्स लीडरशिप (Sports Leadership) एवं खेल प्रशासन (Sports Governance)।"
      ]),
      createTable(
        "table-ariha-profile-hi",
        "अरिहा पंगमबम: प्रोफाइल एवं उपलब्धियों का संक्षिप्त विवरण (Quick Facts Sheet)",
        ["पैरामीटर (Parameter)", "विवरण (Details)"],
        [
          ["**एथलीट का नाम**", "अरिहा पंगमबम (Ariha Pangambam)"],
          ["**उम्र व राज्य**", "22 वर्ष | मणिपुर (Manipur)"],
          ["**खेल व स्पर्धा**", "एयरोबिक जिम्नास्टिक्स | सीनियर महिला व्यक्तिगत"],
          ["**नवीनतम उपलब्धि**", "7 अगस्त 2026 को एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप में भारत का पहला स्वर्ण पदक"],
          ["**फाइनल स्कोर**", "19.100 (Artistry: 8.650, Execution: 7.600, Difficulty: 2.850)"],
          ["**कोच का नाम**", "युमनाम रंजन सिंह (Yumnam Ranjan Singh)"],
          ["**2026 भारत का दूसरा पदक**", "सीनियर एयरो स्टेप (Senior Aero Step) कैटेगरी में कांस्य पदक"],
          ["**राष्ट्रीय खेल उपलब्धियां**", "2023 (गोवा) एवं 2025 (उत्तराखंड) राष्ट्रीय खेल में स्वर्ण पदक"],
          ["**उच्च शिक्षा**", "AISTS India से Post-Graduate Certificate in Sports Management"],
          ["**अंतर्राष्ट्रीय निकाय**", "FIG (Fédération Internationale de Gymnastique) & AGU (Asian Gymnastics Union)"]
        ]
      ),
      sportsMgmtImageBlock,
    ],
    bodyEn: [
      ...createBlocks([
        "### Profile & Key Personal Details",
        "• **Full Name**: Ariha Pangambam",
        "• **Age**: 22 Years",
        "• **Home State**: Manipur",
        "• **Sport Discipline**: Aerobic Gymnastics",
        "• **Event Category**: Senior Women's Individual",
        "### Dedicated Coaching & International Exposure",
        "• **Coach**: Trained under **Yumnam Ranjan Singh**.",
        "• **International Events**: FIG Aerobic Gymnastics World Championship & Suzuki World Cup.",
        "### Sports Management Education",
        "• **Academic Pursuit**: Pursuing Post-Graduate Certificate in Sports Management from **AISTS India**."
      ]),
      createTable(
        "table-ariha-profile-en",
        "Ariha Pangambam Quick Facts Table",
        ["Parameter", "Details"],
        [
          ["**Athlete Name**", "Ariha Pangambam"],
          ["**Age & State**", "22 Years | Manipur"],
          ["**Sport Discipline**", "Aerobic Gymnastics | Senior Individual Women"],
          ["**Latest Achievement**", "August 7, 2026: First-ever Asian Aerobic Gymnastics Gold Medal for India"],
          ["**Final Score**", "19.100 (Artistry: 8.650, Execution: 7.600, Difficulty: 2.850)"],
          ["**Coach**", "Yumnam Ranjan Singh"],
          ["**India's Bronze Medal**", "Senior Aero Step Category Team Bronze"],
          ["**National Games**", "Gold Medals in 2023 (Goa) & 2025 (Uttarakhand) Games"]
        ]
      )
    ]
  };

  // Section 4: Exam Quick Revision & Interlinking (Slide 9)
  const sec4QuickRevision = {
    _key: "sec-4-exam-quick-revision",
    kind: "impact",
    title: "परीक्षा हेतु त्वरित दोहराव (Exam Quick Revision Summary)",
    titleEn: "Exam Quick Revision Notes for MPPSC & UPSC",
    body: [
      ...createBlocks([
        "### ⚡ एक नज़र में महत्वपूर्ण परीक्षा तथ्य (Exam One-Liners)",
        "• **अरिहा पंगमबम** → मणिपुर की एयरोबिक जिम्नास्ट जिन्होंने 7 अगस्त 2026 को एशियन चैंपियनशिप में पहला स्वर्ण पदक जीता।",
        "• **प्रतियोगिता व शासी निकाय** → 10वीं एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप (तगाएताय सिटी, फिलीपींस) | शासी निकाय: एशियन जिम्नास्टिक्स यूनियन (AGU)।",
        "• **प्रथम एशियन चैंपियनशिप इतिहास** → मार्च 2009 में बैंकॉक, थाईलैंड में पहला संस्करण आयोजित किया गया था।",
        "• **भारत का दूसरा पदक (2026)** → सीनियर एयरो स्टेप (Senior Aero Step) कैटेगरी में भारत ने कांस्य पदक (Bronze) जीता।",
        "• **फाइनल स्कोर** → 19.100 (कलात्मकता: 8.650, निष्पादन: 7.600, कठिनाई: 2.850)।",
        "• **कोच** → युमनाम रंजन सिंह।",
        "• **राष्ट्रीय खेल उपलब्धियां** → 2023 (गोवा) और 2025 (उत्तराखंड) राष्ट्रीय खेलों में स्वर्ण पदक विजेता।",
        "• **FIG** → Fédération Internationale de Gymnastique (स्थापना: 1881, मुख्यालय: लुसाने, स्विट्जरलैंड)।"
      ])
    ],
    bodyEn: [
      ...createBlocks([
        "### ⚡ One-Liner Exam Revision Facts",
        "• **Ariha Pangambam** → Manipur gymnast who won India's 1st Asian Aerobic Gymnastics Gold on August 7, 2026.",
        "• **Event & AGU Body** → 10th Asian Aerobic Gymnastics Championships (Tagaytay City, Philippines) organized by Asian Gymnastics Union (AGU).",
        "• **Inaugural Edition** → First Asian Championship held in March 2009 in Bangkok, Thailand.",
        "• **India's Bronze Medal** → Senior Aero Step category team bronze medal in 2026.",
        "• **Final Score** → 19.100 (Artistry: 8.650, Execution: 7.600, Difficulty: 2.850).",
        "• **Coach** → Yumnam Ranjan Singh.",
        "• **FIG HQ** → Lausanne, Switzerland (Founded 1881)."
      ])
    ]
  };

  // 8 High-Quality MCQs
  const mcqs = [
    {
      question: "अरिहा पंगमबम (Ariha Pangambam) ने किस खेल स्पर्धा में भारत के लिए एशियन चैंपियनशिप में पहला ऐतिहासिक स्वर्ण पदक जीता?",
      questionEn: "In which sports event did Ariha Pangambam win India's historic first-ever Gold Medal at the Asian Championships?",
      options: [
        "रिदमिक जिम्नास्टिक्स (Rhythmic Gymnastics)",
        "एयरोबिक जिम्नास्टिक्स (Aerobic Gymnastics)",
        "आर्टिस्टिक जिम्नास्टिक्स (Artistic Gymnastics)",
        "ट्रैम्पोलिन जिम्नास्टिक्स (Trampoline Gymnastics)"
      ],
      optionsEn: [
        "Rhythmic Gymnastics",
        "Aerobic Gymnastics",
        "Artistic Gymnastics",
        "Trampoline Gymnastics"
      ],
      correctIndex: 1,
      explanation: "मणिपुर की 22 वर्षीया अरिहा पंगमबम ने एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप में सीनियर महिला व्यक्तिगत स्पर्धा में 19.100 अंक हासिल कर भारत के लिए पहला ऐतिहासिक स्वर्ण पदक जीता।",
      explanationEn: "Ariha Pangambam from Manipur scored 19.100 points in Senior Women's Individual Aerobic Gymnastics to win India's first-ever Gold Medal."
    },
    {
      question: "पहली एशियन एयरोबic जिम्नास्टिक्स चैंपियनशिप का आयोजन मार्च 2009 में कहाँ किया गया था?",
      questionEn: "Where was the inaugural Asian Aerobic Gymnastics Championship held in March 2009?",
      options: [
        "बैंकॉक, थाईलैंड (Bangkok, Thailand)",
        "टोक्यो, जापान (Tokyo, Japan)",
        "बीजिंग, चीन (Beijing, China)",
        "सियोल, दक्षिण कोरिया (Seoul, South Korea)"
      ],
      optionsEn: [
        "Bangkok, Thailand",
        "Tokyo, Japan",
        "Beijing, China",
        "Seoul, South Korea"
      ],
      correctIndex: 0,
      explanation: "पहली एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप का आयोजन मार्च 2009 में बैंकॉक, थाईलैंड में हुआ था जिसमें भारत, चीन, जापान सहित 10 देशों ने भाग लिया था।",
      explanationEn: "The inaugural Asian Aerobic Gymnastics Championship took place in March 2009 in Bangkok, Thailand with 10 competing nations."
    },
    {
      question: "एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप किस क्षेत्रीय निकाय द्वारा आयोजित की जाती है?",
      questionEn: "Which continental governing body organizes the Asian Aerobic Gymnastics Championships?",
      options: [
        "एशियन जिम्नास्टिक्स यूनियन (AGU - Asian Gymnastics Union)",
        "ओलंपिक परिषद एशिया (OCA)",
        "एशियाई खेल संघ (AGA)",
        "अंतर्राष्ट्रीय जिम्नास्टिक्स संघ (FIG)"
      ],
      optionsEn: [
        "Asian Gymnastics Union (AGU)",
        "Olympic Council of Asia (OCA)",
        "Asian Games Federation (AGA)",
        "International Gymnastics Federation (FIG)"
      ],
      correctIndex: 0,
      explanation: "एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप का आयोजन एशियन जिम्नास्टिक्स यूनियन (AGU) द्वारा किया जाता है।",
      explanationEn: "The continental championship is organized by the Asian Gymnastics Union (AGU)."
    },
    {
      question: "10वीं एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप 2026 में भारत ने स्वर्ण पदक के अलावा किस स्पर्धा में कांस्य पदक (Bronze Medal) हासिल किया?",
      questionEn: "In addition to Gold, in which category did India win a Bronze Medal at the 10th Asian Aerobic Gymnastics Championship 2026?",
      options: [
        "सीनियर एयरो स्टेप (Senior Aero Step)",
        "मिक्स पेयर्स (Mixed Pairs)",
        "ट्रियो स्पर्धा (Trio Event)",
        "जूनियर महिला व्यक्तिगत (Junior Women Individual)"
      ],
      optionsEn: [
        "Senior Aero Step",
        "Mixed Pairs",
        "Trio Event",
        "Junior Women Individual"
      ],
      correctIndex: 0,
      explanation: "7 अगस्त 2026 को 10वीं एशियन चैंपियनशिप (तगाएताय सिटी, फिलीपींस) में भारत ने अरिहा के स्वर्ण पदक के अलावा 'सीनियर एयरो स्टेप' (Senior Aero Step) कैटेगरी में कांस्य पदक भी जीता।",
      explanationEn: "Besides Ariha's Gold, India secured a Bronze Medal in the Senior Aero Step category at the 10th Asian Championship."
    },
    {
      question: "अरिहा पंगमबम भारत के किस राज्य से संबंधित हैं?",
      questionEn: "Which Indian state does Ariha Pangambam belong to?",
      options: ["असम (Assam)", "मणिपुर (Manipur)", "त्रिपुरा (Tripura)", "मिजोरम (Mizoram)"],
      optionsEn: ["Assam", "Manipur", "Tripura", "Mizoram"],
      correctIndex: 1,
      explanation: "अरिहा पंगमबम मणिपुर राज्य की रहने वाली 22 वर्षीया अंतर्राष्ट्रीय एयरोबिक जिम्नास्ट हैं।",
      explanationEn: "Ariha Pangambam is a 22-year-old international aerobic gymnast hailing from Manipur."
    },
    {
      question: "एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप में अरिहा पंगमबम ने फाइनल में कुल कितना स्कोर प्राप्त किया?",
      questionEn: "What was the total score achieved by Ariha Pangambam in the Asian Aerobic Gymnastics Championship final?",
      options: ["17.850", "18.500", "19.100", "20.000"],
      optionsEn: ["17.850", "18.500", "19.100", "20.000"],
      correctIndex: 2,
      explanation: "अरिहा ने फाइनल में 19.100 का सर्वश्रेष्ट कुल स्कोर (Artistry: 8.650, Execution: 7.600, Difficulty: 2.850) प्राप्त किया।",
      explanationEn: "Ariha scored a total of 19.100 points (Artistry: 8.650, Execution: 7.600, Difficulty: 2.850) to secure the top spot."
    },
    {
      question: "अरिहा पंगमबम के मुख्य कोच (Coach) का नाम क्या है?",
      questionEn: "What is the name of Ariha Pangambam's coach?",
      options: [
        "युमनाम रंजन सिंह (Yumnam Ranjan Singh)",
        "एन. बीरेन सिंह (N. Biren Singh)",
        "डिंको सिंह (Dingko Singh)",
        "कुंजारानी देवी (Kunjarani Devi)"
      ],
      optionsEn: [
        "Yumnam Ranjan Singh",
        "N. Biren Singh",
        "Dingko Singh",
        "Kunjarani Devi"
      ],
      correctIndex: 0,
      explanation: "अरिहा पंगमबम अपनी स्वर्णिम सफलता का श्रेय अपने मुख्य कोच युमनाम रंजन सिंह (Yumnam Ranjan Singh) को देती हैं।",
      explanationEn: "Ariha attributes her historical gold medal success to the dedicated guidance of her coach Yumnam Ranjan Singh."
    },
    {
      question: "अंतर्राष्ट्रीय जिम्नास्टिक्स महासंघ (FIG) का मुख्यालय कहाँ स्थित है?",
      questionEn: "Where is the headquarters of International Gymnastics Federation (FIG - Fédération Internationale de Gymnastique) located?",
      options: [
        "लुसाने, स्विट्जरलैंड (Lausanne, Switzerland)",
        "पेरिस, फ्रांस (Paris, France)",
        "लंदन, ब्रिटेन (London, UK)",
        "जेनेवा, स्विट्जरलैंड (Geneva, Switzerland)"
      ],
      optionsEn: [
        "Lausanne, Switzerland",
        "Paris, France",
        "London, UK",
        "Geneva, Switzerland"
      ],
      correctIndex: 0,
      explanation: "FIG (Fédération Internationale de Gymnastique) की स्थापना 1881 में हुई थी और इसका मुख्यालय लुसाने (Lausanne), स्विट्जरलैंड में स्थित है।",
      explanationEn: "FIG was founded in 1881 and its international headquarters is located in Lausanne, Switzerland."
    }
  ];

  // Collapsible FAQs (7+ detailed FAQs)
  const faqs = [
    {
      question: "अरिहा पंगमबम कौन हैं और उन्होंने क्या नया इतिहास रचा है?",
      questionEn: "Who is Ariha Pangambam and what historic record did she create?",
      answer: "अरिहा पंगमबम मणिपुर की 22 वर्षीया जिम्नास्ट हैं जिन्होंने 7 अगस्त 2026 को एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप में भारत के लिए पहला ऐतिहासिक स्वर्ण पदक (Gold Medal) जीता है।",
      answerEn: "Ariha Pangambam is a 22-year-old gymnast from Manipur who won India's first-ever Senior Individual Women's Gold Medal at the Asian Aerobic Gymnastics Championships on August 7, 2026."
    },
    {
      question: "एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप का इतिहास क्या है और पहली प्रतियोगिता कब हुई थी?",
      questionEn: "What is the history of Asian Aerobic Gymnastics Championships and when was the 1st edition held?",
      answer: "पहली एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप का आयोजन मार्च 2009 में बैंकॉक (थाईलैंड) में एशियन जिम्नास्टिक्स यूनियन (AGU) द्वारा किया गया था जिसमें 10 एशियाई देशों ने भाग लिया था।",
      answerEn: "The 1st Asian Aerobic Gymnastics Championship was organized by Asian Gymnastics Union (AGU) in March 2009 in Bangkok, Thailand with 10 nations."
    },
    {
      question: "2026 एशियन चैंपियनशिप में भारत ने स्वर्ण के अलावा कौन सा पदक जीता?",
      questionEn: "Which other medal did India win at the 2026 Asian Championships besides Gold?",
      answer: "अरिहा पंगमबम के स्वर्ण पदक के अलावा भारत ने 'सीनियर एयरो स्टेप' (Senior Aero Step) कैटेगरी में कांस्य पदक (Bronze Medal) भी जीता।",
      answerEn: "Besides Ariha's Gold, India secured a Bronze Medal in the Senior Aero Step category."
    },
    {
      question: "एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप के फाइनल में अरिहा का कुल स्कोर कितना था?",
      questionEn: "What was Ariha Pangambam's final score in the Asian Championships?",
      answer: "अरिहा ने कुल 19.100 का स्कोर प्राप्त किया जिसमें कलात्मकता (Artistry) 8.650, निष्पादन (Execution) 7.600 तथा कठिनाई (Difficulty) 2.850 थी।",
      answerEn: "She achieved a winning total score of 19.100 (Artistry: 8.650, Execution: 7.600, Difficulty: 2.850)."
    },
    {
      question: "अरिहा पंगमबम के मुख्य कोच कौन हैं?",
      questionEn: "Who is the coach of Ariha Pangambam?",
      answer: "अरिहा पंगमबम के मुख्य कोच युमनाम रंजन सिंह (Yumnam Ranjan Singh) हैं।",
      answerEn: "Ariha Pangambam trains under her coach Yumnam Ranjan Singh."
    },
    {
      question: "राष्ट्रीय खेल (National Games) में अरिहा का क्या प्रदर्शन रहा है?",
      questionEn: "What is Ariha Pangambam's performance record in the National Games?",
      answer: "अरिहा ने 2023 गोवा राष्ट्रीय खेल तथा 2025 उत्तराखंड राष्ट्रीय खेल दोनों में एयरोबिक जिम्नास्टिक्स में लगातार स्वर्ण पदक जीते हैं।",
      answerEn: "She secured Gold Medals in Aerobic Gymnastics at both the 2023 Goa and 2025 Uttarakhand National Games."
    },
    {
      question: "अरिहा पंगमबम खेल के अलावा किस क्षेत्र में उच्च शिक्षा प्राप्त कर रही हैं?",
      questionEn: "What higher education program is Ariha Pangambam pursuing?",
      answer: "वह AISTS India से स्पोर्ट्स लीडरशिप और स्पोर्ट्स मैनेजमेंट में Post-Graduate Certificate की पढ़ाई कर रही हैं।",
      answerEn: "She is pursuing a Post-Graduate Certificate in Sports Management & Leadership from AISTS India."
    }
  ];

  // Document Construction
  const docSlug = "ariha-pangambam-asian-aerobic-gymnastics-championship-gold-medal";
  const docTitleHi = "अरिहा पंगमबम ने रचा इतिहास: एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप में भारत को दिलाया पहला ऐतिहासिक स्वर्ण पदक | MPPSC & UPSC खेल नोट्स";
  const docTitleEn = "Ariha Pangambam Creates History: Wins India's First Gold at Asian Aerobic Gymnastics Championships | MPPSC & UPSC Sports Notes";
  const docExcerptHi = "7 अगस्त 2026 को मणिपुर की 22 वर्षीया अरिहा पंगमबम (Ariha Pangambam) ने एशियन एयरोबिक जिम्नास्टिक चैंपियनशिप (AGU) में सीनियर महिला व्यक्तिगत स्पर्धा में 19.100 स्कोर के साथ भारत के लिए पहला ऐतिहासिक स्वर्ण पदक जीतकर इतिहास रचा।";
  const docExcerptEn = "On August 7, 2026, 22-year-old Ariha Pangambam from Manipur wins India's first-ever Senior Women's Individual Gold Medal at the Asian Aerobic Gymnastics Championships (AGU) in Tagaytay City, Philippines with a 19.100 score.";

  const keywordsArray = [
    "ariha pangambam gymnastics",
    "asian aerobic gymnastics championships history agu",
    "march 2009 bangkok thailand first Asian Aerobic Gymnastics Championship",
    "senior aero step bronze medal india 2026",
    "7 august 2026 ariha pangambam gold medal",
    "ariha pangambam gold medal asian gymnastics",
    "अरिहा पंगमबम",
    "एशियन एयरोबिक जिम्नास्टिक्स चैंपियनशिप इतिहास AGU",
    "अरिहा पंगमबम जिम्नास्टिक स्वर्ण पदक",
    "asian aerobic gymnastics championship 2026",
    "first indian gold medal aerobic gymnastics",
    "ariha pangambam manipur",
    "yumnam ranjan singh coach",
    "aists india sports management ariha pangambam",
    "mppsc sports notes ariha pangambam",
    "upsc current affairs sports 2026",
    "aerobic gymnastics 19.100 score"
  ];

  // 1. Create Current Affairs Document
  const caDocId = "ca-ariha-pangambam-asian-gymnastics-gold-2026";
  const caDocument = {
    _id: caDocId,
    _type: "currentAffairs",
    title: docTitleHi,
    titleEn: docTitleEn,
    slug: { _type: "slug", current: docSlug },
    author: { _type: "reference", _ref: authorId },
    tag: { _type: "reference", _ref: sportsTagId },
    tags: [
      { _type: "reference", _ref: sportsTagId, _key: "tag-key-sports" },
      { _type: "reference", _ref: mppscTagId, _key: "tag-key-mppsc" }
    ],
    publishedAt: "2026-08-11T16:00:00Z",
    excerpt: docExcerptHi,
    excerptEn: docExcerptEn,
    keywords: keywordsArray,
    featuredImage: featuredImageObj,
    sections: [
      sec0ChampionshipHistory,
      sec1Intro,
      sec2Journey,
      sec3ProfileEducation,
      sec4QuickRevision
    ],
    mcqs: mcqs,
    faqs: faqs,
  };

  await client.createOrReplace(caDocument);
  console.log(`✨ Successfully published Current Affairs document to Sanity: ${caDocId}`);

  // 2. Create Static GK Document
  const gkDocId = "gk-ariha-pangambam-asian-gymnastics-gold-2026";
  const gkDocument = {
    ...caDocument,
    _id: gkDocId,
    _type: "staticGk",
  };

  await client.createOrReplace(gkDocument);
  console.log(`✨ Successfully published Static GK document to Sanity: ${gkDocId}`);

  console.log("🎉 Ariha Pangambam Asian Gymnastics Gold Medal Article upload with AGU History & Senior Aero Step Bronze update complete!");
}

main().catch((err) => {
  console.error("❌ Error uploading article:", err);
  process.exit(1);
});
