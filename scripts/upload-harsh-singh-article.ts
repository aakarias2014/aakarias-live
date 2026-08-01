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
  console.log("🚀 Starting upload process for Harsh Singh CWG 2026 Judo Gold Medal Biography Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Flag Photo (Photo 3)
  const photoFlagPath = path.join(publicBlogDir, "harsh_singh_cwg_2026_flag.jpg");
  let assetPhotoFlag;
  if (fs.existsSync(photoFlagPath)) {
    console.log("📸 Uploading Flag Photo for Harsh Singh to Sanity...");
    try {
      assetPhotoFlag = await client.assets.upload("image", fs.createReadStream(photoFlagPath), {
        filename: "harsh_singh_cwg_2026_flag.jpg",
      });
      console.log(`✔ Uploaded Flag Photo. Asset ID: ${assetPhotoFlag._id}`);
    } catch (e) {
      console.warn("⚠️ Flag Image upload warning:", e);
    }
  }

  // 2. Mascot Photo (Photo 4)
  const photoMascotPath = path.join(publicBlogDir, "harsh_singh_cwg_2026_mascot.png");
  let assetPhotoMascot;
  if (fs.existsSync(photoMascotPath)) {
    console.log("📸 Uploading Mascot Photo for Harsh Singh to Sanity...");
    try {
      assetPhotoMascot = await client.assets.upload("image", fs.createReadStream(photoMascotPath), {
        filename: "harsh_singh_cwg_2026_mascot.png",
      });
      console.log(`✔ Uploaded Mascot Photo. Asset ID: ${assetPhotoMascot._id}`);
    } catch (e) {
      console.warn("⚠️ Mascot Image upload warning:", e);
    }
  }

  // 3. Closeup Photo (Photo 5)
  const photoCloseupPath = path.join(publicBlogDir, "harsh_singh_cwg_2026_closeup.png");
  let assetPhotoCloseup;
  if (fs.existsSync(photoCloseupPath)) {
    console.log("📸 Uploading Closeup Photo for Harsh Singh to Sanity...");
    try {
      assetPhotoCloseup = await client.assets.upload("image", fs.createReadStream(photoCloseupPath), {
        filename: "harsh_singh_cwg_2026_closeup.png",
      });
      console.log(`✔ Uploaded Closeup Photo. Asset ID: ${assetPhotoCloseup._id}`);
    } catch (e) {
      console.warn("⚠️ Closeup Image upload warning:", e);
    }
  }

  const article = {
    _id: "ca-harsh-singh-gold-cwg-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "harsh-singh-biography-cwg-2026-gold-medal-judo" },
    title: "हर्ष सिंह (Harsh Singh): कौन हैं जूडो गोल्ड मेडलिस्ट? जीवनी, उम्र, 41 सेकंड में पलटा मैच, ऑस्ट्रेलियन ओलंपियन को हराकर CWG इतिहास का पहला पुरुष स्वर्ण व नोट्स | MPPSC & UPSC",
    titleEn: "Who is Harsh Singh? Biography, Age, Defeated Australian Olympian Joshua Katz, CWG 2026 1st Male Judo Gold Medal & Notes | MPPSC & UPSC",
    excerpt: "कौन हैं हर्ष सिंह (Harsh Singh)? दिल्ली के 23 वर्षीय जूडोका जिन्होंने कॉमनवेल्थ गेम्स 2026 (ग्लासगो) में पुरुषों की 60kg जूडो स्पर्धा के फाइनल में मैच खत्म होने से 41 सेकंड पहले स्पेशल दांव से ऑस्ट्रेलियाई ओलंपियन जोशुआ कात्ज़ को हराकर भारत को राष्ट्रमंडल खेलों का पहला पुरुष जूडो स्वर्ण पदक दिलाया, अस्मिता के साथ डबल गोल्ड, IJF सर्किट करियर व MPPSC/UPSC परीक्षा उपयोगी नोट्स।",
    excerptEn: "Who is Harsh Singh? Inspiring biography of Delhi's 23-year-old Judoka who created history at Glasgow CWG 2026 by winning India's FIRST EVER Male Gold Medal in Judo (60kg category), defeating Australian Olympian Joshua Katz with a decisive throw 41 seconds before the bout ended, IJF circuit journey, and MPPSC/UPSC study notes.",
    ca_date: "2026-08-01",
    publishedAt: "2026-08-01T08:35:00.000Z",
    featured: true,
    readingTime: 12,
    keywords: [
      "Harsh Singh",
      "हर्ष सिंह",
      "Who is Harsh Singh",
      "कौन हैं हर्ष सिंह",
      "harsh singh judo",
      "harsh singh age 23",
      "harsh singh delhi",
      "harsh singh judo biography",
      "harsh singh cwg 2026 gold medal",
      "harsh singh vs joshua katz final",
      "harsh singh 41 seconds special throw",
      "first indian male judoka gold cwg",
      "judo double gold india cwg 2026",
      "asmita dey and harsh singh judo gold",
      "IJF grand slam judo harsh singh",
      "Glasgow 2026 judo 60kg gold",
      "PM Modi congratulates Harsh Singh",
      "Sports Current Affairs 2026",
      "खेल समसामयिकी 2026",
      "MPPSC Sports Notes",
      "MPPSC Paper 1 Sports Syllabus",
      "MPPSC Paper 3 General Knowledge",
      "UPSC Current Affairs Sports"
    ],
    category: { _type: "reference", _ref: "cat-sports" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-sports" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["Sports-GK", "MPPSC Paper-1 Unit-5", "MPPSC Paper-3", "Prelims-GS"],
    ...(assetPhotoFlag ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetPhotoFlag._id },
        alt: "हर्ष सिंह तिरंगे के साथ कॉमनवेल्थ गेम्स 2026 जूडो स्वर्ण पदक का जश्न मनाते हुए (Harsh Singh holding Indian Flag CWG 2026 Gold Medal)",
        caption: "ग्लासगो राष्ट्रमंडल खेल 2026: 60kg जूडो में भारत का पहला ऐतिहासिक पुरुष स्वर्ण पदक जीतकर तिरंगा लहराते 23 वर्षीय चैंपियन हर्ष सिंह (Harsh Singh)",
      }
    } : {}),

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      {
        _key: "sec-harsh-overview",
        kind: "whyInNews",
        title: "चर्चा में क्यों? कौन हैं हर्ष सिंह (Harsh Singh)? जूडो में रचा भारत का पहला पुरुष स्वर्ण इतिहास",
        titleEn: "Why in News? Who is Harsh Singh? First Male Judoka to Win CWG Gold",
        body: [
          ...(assetPhotoFlag ? [{
            _key: "b1-img-gold",
            _type: "image",
            asset: { _type: "reference", _ref: assetPhotoFlag._id },
            alt: "हर्ष सिंह तिरंगे के साथ कॉमनवेल्थ गेम्स 2026 जूडो स्वर्ण पदक का जश्न मनाते हुए (Harsh Singh holding Indian Flag CWG 2026 Gold Medal)",
            caption: "ग्लासगो राष्ट्रमंडल खेल 2026: 60kg जूडो में भारत का पहला ऐतिहासिक पुरुष स्वर्ण पदक जीतकर तिरंगा लहराते 23 वर्षीय चैंपियन हर्ष सिंह (Harsh Singh)",
          }] : []),
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{
              _key: "s1-1",
              _type: "span",
              text: "स्कॉटलैंड के **ग्लासगो** में आयोजित **23वें कॉमनवेल्थ गेम्स 2026 (Glasgow CWG 2026)** में भारत के 23 वर्षीय युवा जूडोका **हर्ष सिंह (Harsh Singh)** ने पुरुषों की 60 किलोग्राम भारवर्ग स्पर्धा में **स्वर्ण पदक (Gold Medal)** जीतकर स्वर्णिम इतिहास रच दिया है। हर्ष राष्ट्रमंडल खेलों के 96 वर्षों के इतिहास में जूडो खेल में **स्वर्ण पदक जीतने वाले पहले भारतीय पुरुष एथलीट (India's First-Ever Male CWG Judo Gold Medalist)** बन गए हैं।",
              textEn: "At the **23rd Commonwealth Games 2026 (Glasgow CWG 2026)** in Glasgow, Scotland, 23-year-old Indian judoka **Harsh Singh** created historic waves by winning the **Gold Medal** in the Men's 60kg category. Harsh became the **first-ever male athlete from India** to win a Commonwealth Games Gold medal in Judo."
            }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{
              _key: "s1-2",
              _type: "span",
              text: "हर्ष सिंह ने महामुकाबले (फाइनल) में ऑस्ट्रेलिया के बेहद अनुभवी ओलंपियन खिलाड़ी **जोशुआ कात्ज़ (Joshua Katz)** को मात दी। मैच समाप्त होने से महज **41 सेकंड पहले** हर्ष ने अपने विशेष दांव से विरोधी को चित कर स्वर्ण पदक अपने नाम किया। अस्मिता डे (महिला 48kg गोल्ड) के बाद हर्ष की इस उपलब्धि से महज 30 मिनट के भीतर भारत ने जूडो में **ऐतिहासिक डबल गोल्ड (Double Gold in Judo)** हासिल किया और भारत की [**कॉमनवेल्थ गेम्स 2026 मेडल टैली**](/current-affairs/commonwealth-games-2026-updates-india-medal-tally) में पदकों की संख्या 23 तक पहुँचा दी।",
              textEn: "In the thrilling final bout, Harsh Singh defeated Australia's seasoned Olympian **Joshua Katz**. Executing a decisive technique **just 41 seconds before the final buzzer**, Harsh secured the gold. Combined with [**Asmita Dey's Gold**](/current-affairs/asmita-dey-biography-cwg-2026-gold-medal-judo), this earned India an unprecedented **Double Gold in Judo** within 30 minutes, pushing India's tally in the [**CWG 2026 Medals Standings**](/en/current-affairs/commonwealth-games-2026-updates-india-medal-tally) to 23."
            }],
          },
          {
            _key: "b1-h1", _type: "block", style: "h3",
            children: [{
              _key: "sh1-1",
              _type: "span",
              text: "हर्ष सिंह: एक नज़र में (Harsh Singh Quick Fact Sheet)",
              textEn: "Harsh Singh: At a Glance (Quick Fact Sheet)"
            }],
          },
          {
            _type: "table",
            caption: "हर्ष सिंह: प्रोफाइल व मुख्य विवरण (Harsh Singh Profile)",
            captionEn: "Harsh Singh Profile & Major Achievements",
            headers: ["विवरण (Parameter)", "जानकारी (Details)"],
            headersEn: ["Parameter", "Details"],
            rows: [
              ["**पूरा नाम (Full Name)**", "हर्ष सिंह (Harsh Singh)"],
              ["**आयु (Age)**", "23 वर्ष (23 Years)"],
              ["**मूल निवास (Hometown)**", "नई दिल्ली (New Delhi, India)"],
              ["**खेल (Sport Discipline)**", "जूडो (Judo - Men's 60kg Class)"],
              ["**अंतरराष्ट्रीय अनुभव (Circuit)**", "IJF (International Judo Federation) Grand Slam & Grand Prix"],
              ["**फाइनल प्रतिद्वंद्वी (Final Opponent)**", "जोशुआ कात्ज़ (Joshua Katz - Australia Olympian)"],
              ["**निर्णायक पल (Decisive Moment)**", "मैच समाप्त होने से 41 सेकंड पूर्व स्पेशल थ्रो दांव"],
              ["**CWG 2026 उपलब्धि (CWG 2026 Title)**", "**स्वर्ण पदक (Gold Medal)** - भारत का पहला पुरुष जूडो गोल्ड!"]
            ],
            rowsEn: [
              ["**Full Name**", "Harsh Singh"],
              ["**Age**", "23 Years"],
              ["**Hometown**", "New Delhi, India"],
              ["**Sport Discipline**", "Judo (Men's 60kg Category)"],
              ["**Circuit Experience**", "IJF (International Judo Federation) Grand Slam & Grand Prix"],
              ["**Final Opponent**", "Joshua Katz (Australian Olympian)"],
              ["**Decisive Moment**", "Special throw executed 41 seconds before the final buzzer"],
              ["**CWG 2026 Title**", "**Gold Medal** - India's 1st Ever Male CWG Judo Gold!"]
            ]
          }
        ],
      },

      {
        _key: "sec-harsh-matches-path",
        kind: "analysis",
        title: "ग्लासगो 2026: हर्ष सिंह का सेमीफाइनल से 41 सेकंड के स्वर्णिम दांव तक का सफर",
        titleEn: "Glasgow 2026: Semi-Finals to the Thrilling 41-Second Gold Throw",
        body: [
          ...(assetPhotoMascot ? [{
            _key: "b2-img-mascot",
            _type: "image",
            asset: { _type: "reference", _ref: assetPhotoMascot._id },
            alt: "हर्ष सिंह कॉमनवेल्थ गेम्स 2026 जूडो 60kg स्वर्ण पदक व मैस्कॉट के साथ विक्ट्री स्टैंड पर (Harsh Singh CWG 2026 Gold Medalist with Mascot)",
            caption: "कॉमनवेल्थ गेम्स 2026 (ग्लासगो): 60kg जूडो स्पर्धा में स्वर्ण पदक व आधिकारिक मैस्कॉट के साथ विक्ट्री स्टैंड पर हर्ष सिंह (Harsh Singh)",
          }] : []),
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{
              _key: "sh2-1",
              _type: "span",
              text: "1. सेमीफाइनल मुकाबला: ऑस्ट्रेलिया के पेड्रो कार्लोस को दी शिकस्त",
              textEn: "1. Semi-Final Bout: Outclassed Pedro Carlos Antun Neto (Australia)"
            }],
          },
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{
              _key: "s2-1",
              _type: "span",
              text: "• **सेमीफाइनल में जीत**: 60 किलोग्राम भारवर्ग के सेमीफाइनल में हर्ष सिंह का सामना ऑस्ट्रेलिया के मजबूत जूडोका **पेड्रो कार्लोस एंटुन नेटो (Pedro Carlos Antun Neto)** से हुआ। हर्ष ने अपने फुर्तीले फुटवर्क और ग्रिप कंट्रोल का प्रयोग करते हुए विरोधी को दबाव में रखा और अंक हासिल कर सीधे फाइनल में जगह बनाई और भारत का पदक पक्का किया।",
              textEn: "• **Semi-Final Domination**: In the 60kg semi-final, Harsh faced Australia's formidable **Pedro Carlos Antun Neto**. Using swift footwork and tactical grip maneuvers, Harsh outscored his opponent to secure a final berth and guarantee a medal for India."
            }],
          },
          {
            _key: "b2-h2", _type: "block", style: "h3",
            children: [{
              _key: "sh2-2",
              _type: "span",
              text: "2. फाइनल मुकाबला: ओलंपियन जोशुआ कात्ज़ के खिलाफ 41 सेकंड का चमत्कारिक दांव",
              textEn: "2. Final Clash: Miraculous Throw 41 Seconds Before Time Against Olympian Joshua Katz"
            }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{
              _key: "s2-2",
              _type: "span",
              text: "• **फाइनल की चुनौती**: फाइनल में हर्ष के सामने ऑस्ट्रेलिया के दो बार के ओलंपियन और राष्ट्रमंडल खेलों के पदक विजेता **जोशुआ कात्ज़ (Joshua Katz)** थे। कात्ज़ का अनुभव मैच की शुरुआत में हावी दिख रहा था, लेकिन हर्ष ने शांत और संतुलित दिमाग से मुकाबला जारी रखा।",
              textEn: "• **Final Challenge**: Harsh met two-time Australian Olympian and veteran medalist **Joshua Katz** in the summit clash. Despite Katz's immense international experience, Harsh maintained relentless composure."
            }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{
              _key: "s2-3",
              _type: "span",
              text: "• **41 सेकंड में स्वर्णिम दांव**: मैच समाप्त होने में जब केवल **41 सेकंड** का समय बचा था, तब हर्ष ने अचानक से एक अप्रत्याशित और सटीक तकनीक (स्पेशल थ्रो दांव) लगाई जिससे कात्ज़ मैट पर चित हो गए। रेफरी ने तुरंत भारतीय खिलाड़ी के पक्ष में अंक दिए और समय खत्म होते ही हर्ष ने स्वर्णिम जीत का परचम लहराया।",
              textEn: "• **Decisive Throw at 41 Seconds**: With just **41 seconds** remaining on the clock, Harsh executed a lightning-fast counter-throw that sent Katz flat onto the mat. The referee signaled the winning score, sealing India's historic male judo gold."
            }],
          }
        ],
      },

      {
        _key: "sec-ijf-circuit-career",
        kind: "background",
        title: "दिल्ली से अंतरराष्ट्रीय IJF सर्किट तक: हर्ष सिंह का संघर्ष व उपलब्धियाँ",
        titleEn: "From Delhi to International IJF Circuit: Harsh Singh's Hard Work",
        body: [
          ...(assetPhotoCloseup ? [{
            _key: "b3-img-closeup",
            _type: "image",
            asset: { _type: "reference", _ref: assetPhotoCloseup._id },
            alt: "हर्ष सिंह कॉमनवेल्थ गेम्स 2026 जूडो स्वर्ण पदक प्रदर्शित करते हुए (Harsh Singh displaying Gold Medal Close-up)",
            caption: "ऐतिहासिक स्वर्णिम क्षण: ग्लासगो में भारत का पहला पुरुष जूडो स्वर्ण पदक गर्व से दिखाते 23 वर्षीय हर्ष सिंह (Harsh Singh)",
          }] : []),
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{
              _key: "sh3-1",
              _type: "span",
              text: "1. दिल्ली की मैट से अंतरराष्ट्रीय जूडो महासंघ (IJF) तक का सफर",
              textEn: "1. From Delhi Mats to International Judo Federation (IJF) Circuit"
            }],
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{
              _key: "s3-1",
              _type: "span",
              text: "• **दिल्ली में शुरुआत**: दिल्ली के रहने वाले 23 वर्षीय हर्ष सिंह ने बहुत छोटी उम्र में जूडो सीखना शुरू किया था। वे 60 किलोग्राम भारवर्ग में भारत के सबसे होनहार और निरंतर प्रदर्शन करने वाले एथलीट माने जाते हैं।",
              textEn: "• **Delhi Roots**: Hailing from New Delhi, 23-year-old Harsh Singh took up Judo at an early age and emerged as India's most consistent 60kg judoka."
            }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{
              _key: "s3-2",
              _type: "span",
              text: "• **IJF ग्रैंड स्लैम एवं ग्रैंड प्रिक्स का अनुभव**: राष्ट्रमंडल खेलों से पहले हर्ष ने **अंतरराष्ट्रीय जूडो महासंघ (IJF)** के तहत विभिन्न महाद्वीपीय चैंपियनशिप, ग्रैंड स्लैम और ग्रैंड प्रिक्स स्पर्धाओं में भारत का प्रतिनिधित्व किया था। विश्व के शीर्ष 10 जूडोकाओं के खिलाफ खेलने के अनुभव ने उन्हें ग्लासगो की मैट पर घबराहटमुक्त और आक्रामक खेल दिखाने में मदद की।",
              textEn: "• **IJF Grand Slam & Grand Prix Exposure**: Prior to CWG 2026, Harsh represented India in multiple **IJF Grand Slam and Grand Prix events**. Competing against world top-10 judokas built the endurance and tactical acuity that fueled his victory in Glasgow."
            }],
          },
          {
            _key: "b3-h2", _type: "block", style: "h3",
            children: [{
              _key: "sh3-2",
              _type: "span",
              text: "2. प्रधानमंत्री नरेंद्र मोदी व खेलजगत द्वारा सराहना",
              textEn: "2. Praise from PM Narendra Modi & National Leaders"
            }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{
              _key: "s3-3",
              _type: "span",
              text: "• **पीएम मोदी एवं नेताओं की बधाई**: पुरुष जूडो में भारत का पहला ऐतिहासिक स्वर्ण पदक जीतने पर भारत के **प्रधानमंत्री नरेंद्र मोदी**, उपराष्ट्रपति तथा खेल मंत्री ने हर्ष सिंह को बधाई दी। पीएम मोदी ने कहा कि हर्ष की यह जीत भारत के युवा एथलीटों को मार्शल आर्ट्स में नई ऊँचाइयों को छूने के लिए प्रेरित करेगी।",
              textEn: "• **Praise from PM Modi**: Prime Minister **Narendra Modi**, the Vice President, and Union Sports Minister praised Harsh Singh for creating history. PM Modi stated that Harsh's historic gold will inspire millions of Indian youth to pursue combat sports."
            }],
          }
        ],
      },

      {
        _key: "sec-interlinking-harsh-champions",
        kind: "keyHighlights",
        title: "CWG 2026 भारत के अन्य स्वर्णिम विजेता (Interlinked Gold Champions)",
        titleEn: "CWG 2026 India's Gold Champions & Interlinked Profiles",
        body: [
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{
              _key: "s4-1",
              _type: "span",
              text: "कॉमनवेल्थ गेम्स 2026 में भारत के अन्य स्वर्ण पदक विजेताओं की संपूर्ण जीवनी पढ़ने हेतु नीचे दिए गए लिंक्स पर जाएँ:",
              textEn: "Explore detailed biography profiles of India's CWG 2026 Gold Medal champions across different sports:"
            }],
          },
          {
            _key: "b4-asmita", _type: "block", style: "normal",
            children: [{
              _key: "s4-a",
              _type: "span",
              text: "• 🥇 [**अस्मिता डे (Asmita Dey)**](/current-affairs/asmita-dey-biography-cwg-2026-gold-medal-judo): महिला 48kg जूडो में भारत की पहली महिला स्वर्ण पदक विजेता।",
              textEn: "• 🥇 [**Ashmita Dey Biography**](/en/current-affairs/asmita-dey-biography-cwg-2026-gold-medal-judo): India's 1st Female CWG Gold Medalist in Judo 48kg."
            }],
          },
          {
            _key: "b4-chanu", _type: "block", style: "normal",
            children: [{
              _key: "s4-c",
              _type: "span",
              text: "• 🥇 [**मीराबाई चानू (Mirabai Chanu)**](/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting): वेटलिफ्टिंग 48kg में लगातार तीसरा CWG स्वर्ण पदक।",
              textEn: "• 🥇 [**Mirabai Chanu Biography**](/en/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting): Historic 3rd consecutive CWG Gold in Weightlifting."
            }],
          },
          {
            _key: "b4-sharmila", _type: "block", style: "normal",
            children: [{
              _key: "s4-s",
              _type: "span",
              text: "• 🥇 [**शर्मिला धनखड़ (Sharmila Dhankar)**](/current-affairs/sharmila-dhankar-biography-cwg-2026-gold-medal-para-athletics): पैरा-एथलेटिक्स शॉट पुट F57 में रिकॉर्ड स्वर्ण पदक।",
              textEn: "• 🥇 [**Sharmila Dhankar Biography**](/en/current-affairs/sharmila-dhankar-biography-cwg-2026-gold-medal-para-athletics): Gold Medal in Women's Shot Put F57 Para Athletics."
            }],
          },
          {
            _key: "b4-gavit", _type: "block", style: "normal",
            children: [{
              _key: "s4-g",
              _type: "span",
              text: "• 🥇 [**दिलीप गावित (Dilip Gavit)**](/current-affairs/dilip-gavit-biography-cwg-2026-gold-medal-para-athletics): 100m T47 स्प्रिंट में 10.71s गेम्स रिकॉर्ड के साथ स्वर्ण पदक।",
              textEn: "• 🥇 [**Dilip Gavit Biography**](/en/current-affairs/dilip-gavit-biography-cwg-2026-gold-medal-para-athletics): Gold Medal in Men's 100m T47 with 10.71s Games Record."
            }],
          },
          {
            _key: "b4-cwg-full", _type: "block", style: "normal",
            children: [{
              _key: "s4-full",
              _type: "span",
              text: "• 📊 [**कॉमनवेल्थ गेम्स 2026 लाइव मेडल टैली एवं भारत की पूरी सूची**](/current-affairs/commonwealth-games-2026-updates-india-medal-tally): 23 पदकों की अद्यतन तालिका व संपूर्ण विवरण।",
              textEn: "• 📊 [**CWG 2026 Live Medal Standings & India Tally**](/en/current-affairs/commonwealth-games-2026-updates-india-medal-tally): Complete updated standings of all 23 Indian medal winners."
            }],
          }
        ],
      },

      {
        _key: "sec-revision-notes-harsh",
        kind: "wayForward",
        title: "MPPSC & UPSC परीक्षा हेतु हर्ष सिंह Quick Revision Study Notes",
        titleEn: "MPPSC & UPSC Exam Notes: Harsh Singh Quick Revision Grid",
        body: [
          {
            _type: "facts",
            items: [
              { label: "एथलीट का नाम", labelEn: "Athlete Name", value: "**हर्ष सिंह (Harsh Singh)**", valueEn: "**Harsh Singh**" },
              { label: "आयु व गृह नगर", labelEn: "Age & Hometown", value: "**23 वर्ष, नई दिल्ली** (Delhi)", valueEn: "**23 Years, New Delhi**" },
              { label: "खेल व भारवर्ग", labelEn: "Sport & Category", value: "**जूडो (Judo - 60kg Men)**", valueEn: "**Judo (Men's 60kg Class)**" },
              { label: "फाइनल प्रतिद्वंद्वी", labelEn: "Final Opponent", value: "**जोशुआ कात्ज़ (ऑस्ट्रेलिया ओलंपियन)**", valueEn: "**Joshua Katz (Australian Olympian)**" },
              { label: "निर्णायक थ्रो", labelEn: "Winning Throw", value: "**मैच समाप्त होने से 41 सेकंड पूर्व**", valueEn: "**41 Seconds Before Final Buzzer**" },
              { label: "CWG 2026 उपलब्धि", labelEn: "CWG 2026 Title", value: "**स्वर्ण पदक** (भारत का पहला पुरुष जूडो गोल्ड)", valueEn: "**Gold Medal** (India's 1st Ever Male CWG Judo Gold)" },
            ]
          }
        ],
      }
    ],

    /* ─── FAQS ──────────────────────────────────────────────────── */
    faqs: [
      {
        question: "कौन हैं हर्ष सिंह (Who is Harsh Singh)?",
        questionEn: "Who is Harsh Singh?",
        answer: "हर्ष सिंह दिल्ली के 23 वर्षीय जूडो खिलाड़ी हैं जिन्होंने कॉमनवेल्थ गेम्स 2026 (ग्लासगो) में पुरुषों की 60kg वर्ग में ऑस्ट्रेलिया के ओलंपियन जोशुआ कात्ज़ को हराकर भारत को जूडो इतिहास का पहला पुरुष स्वर्ण पदक दिलाया।",
        answerEn: "Harsh Singh is a 23-year-old Judoka from Delhi who created history at Glasgow CWG 2026 by winning India's FIRST EVER Male Gold Medal in Judo (60kg category)."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में हर्ष सिंह ने किस खेल में स्वर्ण पदक जीता है?",
        questionEn: "In which sport did Harsh Singh win the Gold medal at CWG 2026?",
        answer: "हर्ष सिंह ने ग्लासगो कॉमनवेल्थ गेम्स 2026 में **पुरुषों की 60 किलोग्राम जूडो (Judo 60kg)** स्पर्धा में भारत के लिए स्वर्ण पदक जीता।",
        answerEn: "Harsh Singh won the Gold medal in the **Men's 60kg Judo** discipline at the Glasgow Commonwealth Games 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 जूडो के फाइनल मुकाबले में हर्ष सिंह ने किस ओलंपियन खिलाड़ी को हराया?",
        questionEn: "Which Olympian did Harsh Singh defeat in the CWG 2026 Judo final?",
        answer: "हर्ष सिंह ने फाइनल में ऑस्ट्रेलिया के अनुभवी ओलंपियन **जोशुआ कात्ज़ (Joshua Katz)** को मैच समाप्त होने से महज 41 सेकंड पहले स्पेशल थ्रो से पराजित किया।",
        answerEn: "Harsh Singh defeated Australian Olympian **Joshua Katz** with a spectacular throw just 41 seconds before the final buzzer."
      },
      {
        question: "राष्ट्रमंडल खेलों के इतिहास में जूडो में पहला पुरुष स्वर्ण पदक किस भारतीय ने जीता है?",
        questionEn: "Who became the first male judoka from India to win CWG Gold?",
        answer: "हर्ष सिंह राष्ट्रमंडल खेलों के 96 वर्षों के इतिहास में जूडो खेल में स्वर्ण पदक जीतने वाले **पहले भारतीय पुरुष खिलाड़ी** बन गए हैं।",
        answerEn: "Harsh Singh became the **first ever Indian male judoka** to win a Gold medal in Commonwealth Games history."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 जूडो में भारत ने कुल कितने स्वर्ण पदक जीते हैं?",
        questionEn: "How many Gold medals did India win in Judo at CWG 2026?",
        answer: "भारत ने जूडो में 2 ऐतिहासिक स्वर्ण पदक जीते: अस्मिता डे (महिला 48kg) और हर्ष सिंह (पुरुष 60kg)।",
        answerEn: "India won 2 historic Gold medals in Judo at CWG 2026: Asmita Dey (Women's 48kg) and Harsh Singh (Men's 60kg)."
      },
      {
        question: "हर्ष सिंह भारत के किस राज्य/शहर के रहने वाले हैं?",
        questionEn: "Which city/state is Harsh Singh originally from?",
        answer: "हर्ष सिंह भारत की राजधानी **नई दिल्ली (New Delhi)** के रहने वाले हैं।",
        answerEn: "Harsh Singh hails from **New Delhi**, India."
      },
      {
        question: "हर्ष सिंह को अंतरराष्ट्रीय स्तर पर किस जूडो सर्किट में खेलने का अनुभव रहा है?",
        questionEn: "Which international circuit did Harsh Singh compete in before CWG 2026?",
        answer: "हर्ष सिंह ने अंतरराष्ट्रीय जूडो महासंघ (**IJF - International Judo Federation**) के तहत कई ग्रैंड स्लैम और ग्रैंड प्रिक्स स्पर्धाओं में भारत का प्रतिनिधित्व किया है।",
        answerEn: "Harsh Singh competed extensively in the **IJF (International Judo Federation)** Grand Slam and Grand Prix tournaments."
      },
      {
        question: "MPPSC प्रारंभिक परीक्षा हेतु हर्ष सिंह से संबंधित कौन-से प्रश्न पूछे जा सकते हैं?",
        questionEn: "What type of questions can be asked about Harsh Singh in MPPSC exams?",
        answer: "MPPSC Paper 1 GS Unit-5 में हर्ष सिंह के खेल (पुरुष जूडो 60kg), स्वर्ण पदक, फाइनल प्रतिद्वंद्वी (जोशुआ कात्ज़), रिकॉर्ड व 41 सेकंड के स्वर्णिम दांव पर आधारित 2-4 अंक के प्रश्न सीधे आ सकते हैं।",
        answerEn: "In MPPSC Prelims Paper 1 Unit-5, questions will directly target his sport (Men's Judo 60kg), Gold medal, final opponent (Joshua Katz), and 41-second decisive throw."
      }
    ],

    /* ─── MCQS ──────────────────────────────────────────────────── */
    mcqs: [
      {
        question: "कौन हैं हर्ष सिंह (Harsh Singh) जिन्होंने कॉमनवेल्थ गेम्स 2026 में इतिहास रचा?",
        questionEn: "Who is Harsh Singh, who created history at Commonwealth Games 2026?",
        options: ["A. दिल्ली के 23 वर्षीय जूडोका (पुरुष 60kg जूडो में भारत का पहला CWG स्वर्ण)", "B. पहलवान", "C. बॉक्सिंग खिलाड़ी", "D. भारोत्तोलक"],
        optionsEn: ["A. 23-year-old Judoka from Delhi (India's 1st Male CWG Judo Gold in 60kg)", "B. Wrestler", "C. Boxer", "D. Weightlifter"],
        correctIndex: 0,
        explanation: "हर्ष सिंह दिल्ली के 23 वर्षीय जूडो खिलाड़ी हैं जिन्होंने CWG 2026 में पुरुषों के 60kg वर्ग में भारत का पहला पुरुष जूडो गोल्ड जीता।",
        explanationEn: "Harsh Singh is a 23-year-old Judoka from Delhi who won India's 1st Male CWG Judo Gold medal."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 (ग्लासगो) में पुरुषों की 60 किग्रा जूडो स्पर्धा में स्वर्ण पदक किस भारतीय खिलाड़ी ने जीता?",
        questionEn: "Which Indian athlete won the Gold medal in Men's 60kg Judo at Commonwealth Games 2026?",
        options: ["A. हर्ष सिंह (Harsh Singh)", "B. विजय कुमार", "C. जसलीन सिंह", "D. अवतार सिंह"],
        optionsEn: ["A. Harsh Singh", "B. Vijay Kumar", "C. Jasleen Singh", "D. Avtar Singh"],
        correctIndex: 0,
        explanation: "हर्ष सिंह ने पुरुष 60 किग्रा जूडो स्पर्धा में भारत के लिए ऐतिहासिक स्वर्ण पदक जीता।",
        explanationEn: "Harsh Singh won the historic Gold medal for India in Men's 60kg Judo competition."
      },
      {
        question: "राष्ट्रमंडल खेलों (CWG) के इतिहास में जूडो खेल में पहला पुरुष स्वर्ण पदक जीतने वाले भारतीय खिलाड़ी कौन हैं?",
        questionEn: "Who became the first ever male judoka from India to win a CWG Gold medal?",
        options: ["A. हर्ष सिंह (Harsh Singh)", "B. सुशील कुमार", "C. विजेंदर सिंह", "D. विकास कृष्णन"],
        optionsEn: ["A. Harsh Singh", "B. Sushil Kumar", "C. Vijender Singh", "D. Vikas Krishan"],
        correctIndex: 0,
        explanation: "हर्ष सिंह राष्ट्रमंडल खेलों के इतिहास में जूडो में पहला पुरुष स्वर्ण पदक जीतने वाले भारतीय खिलाड़ी बने हैं।",
        explanationEn: "Harsh Singh created history as the first male Indian athlete to win a CWG Gold medal in Judo."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 जूडो के फाइनल मुकाबले में हर्ष सिंह ने किस देश के ओलंपियन जोशुआ कात्ज़ को हराया?",
        questionEn: "Which country's Olympian Joshua Katz did Harsh Singh defeat in the CWG 2026 Judo final?",
        options: ["A. ऑस्ट्रेलिया (Australia)", "B. स्कॉटलैंड", "C. इंग्लैंड", "D. कनाडा"],
        optionsEn: ["A. Australia", "B. Scotland", "C. England", "D. Canada"],
        correctIndex: 0,
        explanation: "हर्ष सिंह ने फाइनल में ऑस्ट्रेलिया के दो बार के ओलंपियन जोशुआ कात्ज़ को मैच समाप्त होने से 41 सेकंड पहले हराया।",
        explanationEn: "Harsh defeated Australian two-time Olympian Joshua Katz 41 seconds before the final time."
      },
      {
        question: "हर्ष सिंह ने फाइनल मुकाबले में मैच खत्म होने से कितने सेकंड पहले निर्णायक स्पेशल दांव लगाकर स्वर्ण पदक पक्का किया?",
        questionEn: "How many seconds before the final buzzer did Harsh Singh execute his winning throw?",
        options: ["A. 41 सेकंड", "B. 30 सेकंड", "C. 15 सेकंड", "D. 50 सेकंड"],
        optionsEn: ["A. 41 Seconds", "B. 30 Seconds", "C. 15 Seconds", "D. 50 Seconds"],
        correctIndex: 0,
        explanation: "हर्ष सिंह ने मैच समाप्त होने से ठीक 41 सेकंड पहले अपना स्पेशल दांव लगाकर विरोधी को चित कर दिया।",
        explanationEn: "Harsh Singh executed his winning throw exactly 41 seconds before the final buzzer."
      },
      {
        question: "हर्ष सिंह भारत के किस शहर के निवासी हैं?",
        questionEn: "Which city is Harsh Singh originally from?",
        options: ["A. नई दिल्ली (New Delhi)", "B. भोपाल", "C. चंडीगढ़", "D. जयपुर"],
        optionsEn: ["A. New Delhi", "B. Bhopal", "C. Chandigarh", "D. Jaipur"],
        correctIndex: 0,
        explanation: "हर्ष सिंह भारत की राजधानी नई दिल्ली के रहने वाले हैं।",
        explanationEn: "Harsh Singh hails from New Delhi, India."
      },
      {
        question: "अस्मिता डे और हर्ष सिंह की स्वर्णिम सफलता से भारत ने CWG 2026 में जूडो खेल में क्या उपलब्धि हासिल की?",
        questionEn: "What achievement did India unlock in Judo at CWG 2026 through Asmita Dey & Harsh Singh?",
        options: ["A. ऐतिहासिक डबल गोल्ड (Double Gold)", "B. 5 गोल्ड", "C. 10 पदक", "D. कोई पदक नहीं"],
        optionsEn: ["A. Historic Double Gold", "B. 5 Gold", "C. 10 Medals", "D. No Medals"],
        correctIndex: 0,
        explanation: "अस्मिता डे और हर्ष सिंह ने 30 मिनट के भीतर स्वर्ण पदक जीतकर भारत को जूडो में ऐतिहासिक डबल गोल्ड दिलाया।",
        explanationEn: "Asmita Dey and Harsh Singh clinched gold medals within 30 minutes, giving India a historic Double Gold in Judo."
      },
      {
        question: "हर्ष सिंह किस अंतरराष्ट्रीय जूडो महासंघ के सर्किट में ग्रैंड स्लैम और ग्रैंड प्रिक्स प्रतियोगिताओं में भाग ले चुके हैं?",
        questionEn: "Which international judo circuit has Harsh Singh participated in prior to CWG 2026?",
        options: ["A. IJF (International Judo Federation)", "B. WKF", "C. BWF", "D. UWW"],
        optionsEn: ["A. IJF (International Judo Federation)", "B. WKF", "C. BWF", "D. UWW"],
        correctIndex: 0,
        explanation: "हर्ष सिंह IJF (International Judo Federation) सर्किट में कई ग्रैंड स्लैम व ग्रैंड प्रिक्स में खेल चुके हैं।",
        explanationEn: "Harsh Singh has competed extensively in the IJF (International Judo Federation) circuit."
      }
    ]
  };

  console.log('📝 Uploading Harsh Singh article ID "ca-harsh-singh-gold-cwg-2026" to Sanity CMS...');
  await client.createOrReplace(article);
  console.log('🎉 SUCCESS! Harsh Singh Article uploaded & published in Sanity CMS. Document ID: ca-harsh-singh-gold-cwg-2026');
  console.log('URL slug: harsh-singh-biography-cwg-2026-gold-medal-judo');
}

main().catch((err) => {
  console.error("❌ Upload process failed:", err);
  process.exit(1);
});
