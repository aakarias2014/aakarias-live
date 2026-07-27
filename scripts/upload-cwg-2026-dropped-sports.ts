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
  console.log("🚀 Starting upload process for Dedicated CWG 2026 Dropped Sports & India Impact Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const actionThumbnailPath = path.join(publicBlogDir, "mirabai_chanu_glasgow_2026_action_thumbnail.png");

  let assetFeaturedThumbnail;
  if (fs.existsSync(actionThumbnailPath)) {
    console.log("📸 Uploading Action Shot Thumbnail for Dropped Sports Article to Sanity...");
    assetFeaturedThumbnail = await client.assets.upload("image", fs.createReadStream(actionThumbnailPath), {
      filename: "mirabai_chanu_glasgow_2026_action_thumbnail.png",
    });
    console.log(`✔ Uploaded Action Featured Image. Asset ID: ${assetFeaturedThumbnail._id}`);
  }

  const mirabaiPodiumPath = path.join(publicBlogDir, "mirabai_chanu_2026_gold_victory_podium.png");
  let assetVictoryPodium;
  if (fs.existsSync(mirabaiPodiumPath)) {
    console.log("📸 Uploading Victory Podium Photo to Sanity...");
    assetVictoryPodium = await client.assets.upload("image", fs.createReadStream(mirabaiPodiumPath), {
      filename: "mirabai_chanu_2026_gold_victory_podium.png",
    });
    console.log(`✔ Uploaded Victory Podium Image. Asset ID: ${assetVictoryPodium._id}`);
  }

  const article = {
    _id: "ca-cwg-2026-dropped-sports-impact",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "commonwealth-games-2026-dropped-sports-list-impact-india" },
    title: "कॉमनवेल्थ गेम्स 2026 से हटाए गए 9 प्रमुख खेल: बैडमिंटन, कुश्ती, हॉकी क्यों हुए बाहर व भारत पर प्रभाव | MPPSC & UPSC",
    titleEn: "Commonwealth Games 2026 Dropped Sports List: Removal of Badminton, Wrestling, Hockey & Impact on India | MPPSC & UPSC",
    excerpt: "कॉमनवेल्थ गेम्स 2026 (ग्लासगो) से बाहर किए गए 9 प्रमुख खेल (Badminton, Wrestling, Hockey, Table Tennis, Cricket, Squash, Rugby, Volleyball, Triathlon): बजट कटौती के कारण, 2022 में जीते 30 पदकों का नुकसान, भारत के लिए चुनौतियाँ व MPPSC परीक्षा नोट्स।",
    excerptEn: "CWG 2026 Glasgow dropped sports list: Removal of 9 major sports including Badminton, Wrestling, Hockey, Table Tennis, Cricket. Deep analysis of 30 medals lost from 2022 tally, CGF cost reduction reasons, and MPPSC/UPSC exam notes.",
    ca_date: "2026-07-27",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 10,
    keywords: [
      "CWG 2026 dropped sports list",
      "कॉमनवेल्थ गेम्स 2026 से हटाए गए खेल",
      "कॉमनवेल्थ गेम्स 2026 से कुश्ती और बैडमिंटन क्यों हटाए गए",
      "CWG 2026 why wrestling badminton hockey removed",
      "Impact of dropped sports on India medal tally CWG 2026",
      "Glasgow 2026 scaled down CWG format",
      "India 2022 Birmingham vs 2026 Glasgow medals",
      "Badminton Wrestling Table Tennis Hockey Cricket CWG 2026",
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
    ...(assetFeaturedThumbnail ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetFeaturedThumbnail._id },
        alt: "CWG 2026 Dropped Sports List Removal of Badminton Wrestling Hockey Impact on India MPPSC UPSC Notes",
      }
    } : {}),

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News & Overview ────────────────────────────── */
      {
        _key: "sec-why-in-news",
        kind: "whyInNews",
        title: "चर्चा में क्यों? 1994 के बाद सबसे छोटा कॉमनवेल्थ गेम्स व 9 प्रमुख खेलों की छुट्टी",
        titleEn: "Why in News? Removal of 9 Major Sports from CWG 2026 Program",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "राष्ट्रमंडल खेल (**Commonwealth Games 2026**) का आयोजन **23 जुलाई से 2 अगस्त 2026** तक स्कॉटलैंड के **ग्लासगो** में हो रहा है। इस बार का संस्करण 1994 विक्टोरिया खेलों के बाद सबसे सीमित (Scaled-down) कार्यक्रम है। आयोजकों ने अवसंरचनात्मक लागत और बजट कम करने के लिए कार्यक्रम में बड़ा बदलाव करते हुए **9 लोकप्रिय खेलों को बाहर (Dropped Sports)** कर दिया है।" }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "इन हटाए गए 9 खेलों में बैडमिंटन, कुश्ती (Wrestling), हॉकी, टेबल टेनिस तथा क्रिकेट जैसे खेल शामिल हैं, जिनमें भारत पारंपरिक रूप से अत्यधिक मजबूत रहा है। पिछले 2022 बर्मिंघम खेलों में भारत द्वारा जीते गए कुल **61 पदकों में से 30 पदक (50% पदक)** इन्हीं हटाए गए खेलों से आए थे। ऐसे में इन खेलों के बाहर होने से भारत की कुल पदक तालिका पर गंभीर प्रभाव पड़ना तय माना जा रहा है।" }],
          },
          ...(assetVictoryPodium ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetVictoryPodium._id },
            alt: "2026 win mirabai chanu gold medal victory podium glasgow commonwealth games weightlifting mppsc upsc notes",
            caption: "2026 win mirabai chanu: हटे हुए खेलों की चुनौती के बावजूद 48kg वेटलिफ्टिंग में स्वर्ण पदक जीतकर भारत का नाम रोशन करतीं मीराबाई चानू",
          }] : []),
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "Glasgow 2026 has dropped 9 major sports to reduce costs. In Birmingham 2022, nearly 50% (30 out of 61) of India's medals came from these exact 9 dropped disciplines." }],
          },
        ],
      },

      /* ── 2. Full List of 9 Dropped Sports ─────────────────────── */
      {
        _key: "sec-dropped-sports-list",
        kind: "background",
        title: "कॉमनवेल्थ गेम्स 2026 से हटाए गए 9 प्रमुख खेलों की सूची (Complete List)",
        titleEn: "Complete List of 9 Dropped Sports from CWG 2026",
        body: [
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{ _key: "sh2-1", _type: "span", text: "1. 2026 ग्लासगो कार्यक्रम से बाहर किए गए 9 खेल" }],
          },
          {
            _key: "b2-d1", _type: "block", style: "normal",
            children: [{ _key: "s2-d1", _type: "span", text: "• 🚫 **1. बैडमिंटन (Badminton)**: पी.वी. सिंधु, लक्ष्य सेन व सात्विक-चिराग की पदक-दावेदार स्पर्धाएँ बाहर।" }],
          },
          {
            _key: "b2-d2", _type: "block", style: "normal",
            children: [{ _key: "s2-d2", _type: "span", text: "• 🚫 **2. कुश्ती (Wrestling)**: भारत का सबसे बड़ा गोल्ड-माइन खेल बाहर किया गया।" }],
          },
          {
            _key: "b2-d3", _type: "block", style: "normal",
            children: [{ _key: "s2-d3", _type: "span", text: "• 🚫 **3. हॉकी (Hockey)**: पुरुष एवं महिला राष्ट्रीय हॉकी स्पर्धाएँ शामिल नहीं हैं।" }],
          },
          {
            _key: "b2-d4", _type: "block", style: "normal",
            children: [{ _key: "s2-d4", _type: "span", text: "• 🚫 **4. टेबल टेनिस (Table Tennis)**: अचंत शरथ कमल व मनिका बत्रा की सफल स्पर्धाएँ बाहर।" }],
          },
          {
            _key: "b2-d5", _type: "block", style: "normal",
            children: [{ _key: "s2-d5", _type: "span", text: "• 🚫 **5. क्रिकेट (Cricket)**: टी20 महिला क्रिकेट स्पर्धा को हटा दिया गया है।" }],
          },
          {
            _key: "b2-d6", _type: "block", style: "normal",
            children: [{ _key: "s2-d6", _type: "span", text: "• 🚫 **6. स्क्वॉश (Squash)**: सौरव घोसाल व दीपिका पल्लीकल की पदक स्पर्धाएँ बाहर।" }],
          },
          {
            _key: "b2-d7", _type: "block", style: "normal",
            children: [{ _key: "s2-d7", _type: "span", text: "• 🚫 **7. बीच वॉलीबॉल (Beach Volleyball)**: कार्यक्रम से बाहर।" }],
          },
          {
            _key: "b2-d8", _type: "block", style: "normal",
            children: [{ _key: "s2-d8", _type: "span", text: "• 🚫 **8. रग्बी सेवन्स (Rugby Sevens)**: कार्यक्रम से बाहर।" }],
          },
          {
            _key: "b2-d9", _type: "block", style: "normal",
            children: [{ _key: "s2-d9", _type: "span", text: "• 🚫 **9. ट्रायथलॉन (Triathlon)**: कार्यक्रम से बाहर।" }],
          },
          {
            _key: "b2-note", _type: "block", style: "normal",
            children: [{ _key: "s2-nt", _type: "span", text: "📌 **नोट**: इसके अतिरिक्त रोड साइकिलिंग, माउंटेन बाइकिंग, डाइविंग तथा रिदमिक जिम्नास्टिक की उप-स्पर्धाओं को भी इस बार शामिल नहीं किया गया है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "Detailed list of 9 dropped sports: Badminton, Wrestling, Hockey, Table Tennis, Cricket, Squash, Beach Volleyball, Rugby Sevens, and Triathlon." }],
          },
        ],
      },

      /* ── 3. Impact Analysis on India's Medal Tally ──────────────── */
      {
        _key: "sec-india-impact-analysis",
        kind: "keyHighlights",
        title: "भारत की पदक तालिका पर प्रभाव: बर्मिंघम 2022 बनाम ग्लासगो 2026 विश्लेषण",
        titleEn: "Impact Analysis on India's Medal Tally: 2022 Birmingham vs 2026 Glasgow",
        body: [
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{ _key: "sh3-1", _type: "span", text: "1. 2022 बर्मिंघम में हटाए गए खेलों से भारत द्वारा जीते गए पदकों का आंकड़ा" }],
          },
          {
            _type: "table",
            caption: "हटाए गए 9 खेलों में भारत का 2022 बर्मिंघम प्रदर्शन (Medals Lost Analysis Table)",
            headers: ["हटाया गया खेल (Dropped Sport)", "स्वर्ण (Gold)", "रजत (Silver)", "कांस्य (Bronze)", "कुल पदक (Total Medals)"],
            rows: [
              ["**कुश्ती (Wrestling)**", "6", "1", "5", "**12 पदक**"],
              ["**टेबल टेनिस (Table Tennis)**", "4", "1", "2", "**7 पदक**"],
              ["**बैडमिंटन (Badminton)**", "3", "1", "2", "**6 पदक**"],
              ["**हॉकी (Hockey)**", "0", "1", "1", "**2 पदक**"],
              ["**स्क्वाश (Squash)**", "0", "0", "2", "**2 पदक**"],
              ["**क्रिकेट (Cricket)**", "0", "1", "0", "**1 पदक**"],
              ["**कुल नुकसान (Total Medals Lost)**", "**13 स्वर्ण**", "**5 रजत**", "**12 कांस्य**", "**30 पदक (50% नुकसान)**"]
            ]
          },
          {
            _key: "b3-h2", _type: "block", style: "h3",
            children: [{ _key: "sh3-2", _type: "span", text: "2. भारत के लिए ग्लासगो 2026 क्यों बना बड़ी चुनौती?" }],
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "• **स्वर्ण पदकों में 60% की गिरावट की आशंका**: 2022 बर्मिंघम में भारत ने कुल 22 स्वर्ण पदक जीते थे, जिनमें से 13 स्वर्ण पदक केवल कुश्ती, टेबल टेनिस तथा बैडमिंटन से आए थे। इन तीनों खेलों के हटने से भारत की स्वर्ण पदक क्षमता पर सबसे बड़ा आघात हुआ है।" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "• **अब किन खेलों पर टिकी हैं भारत की उम्मीदें?**: 2026 में भारत का मुख्य दारोमदार **भारोत्तोलन (Weightlifting - मीराबाई चानू, ऋषिकांत)**, **मुक्केबाजी (Boxing - लवलीना बोरगोहैन)**, **एथलेटिक्स (Athletics)** तथा **इंटीग्रेटेड पैरा स्पोर्ट्स (झांडू कुमार)** पर टिका रहेगा।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "🏆 **राष्ट्रमंडल खेल 2026 की पूरी स्पोर्ट्स लिस्ट पढ़ें**: [कॉमनवेल्थ गेम्स 2026 के खेलों की पूरी लिस्ट: तिथियाँ, वेन्यू व 125 भारतीय खिलाड़ी](/current-affairs/commonwealth-games-2026-sports-list-schedule-india-events)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "Analysis table showing India lost 30 medals (13 Gold, 5 Silver, 12 Bronze) due to the removal of these 9 sports." }],
          },
        ],
      },

      /* ── 4. Why CGF Scaled Down CWG 2026 Format ───────────────── */
      {
        _key: "sec-why-cgf-scaled-down",
        kind: "analysis",
        title: "राष्ट्रमंडल खेल महासंघ (CGF) ने खेलों का आकार छोटा क्यों किया?",
        titleEn: "Why Commonwealth Games Federation (CGF) Scaled Down CWG 2026 Format",
        body: [
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "• **मेजबानी लागत व अवसंरचनात्मक बोझ कम करना**: मूल मेजबान विक्टोरिया (ऑस्ट्रेलिया) द्वारा अत्यधिक वित्तीय लागत के कारण हटने के बाद ग्लासगो ने कम बजट (~114 मिलियन पाउंड) में खेल कराने की जिम्मेदारी ली।" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• **मौजूदा 4 वेन्यू हब्स का उपयोग**: बिना नया स्टेडियम बनाए ग्लासगो के 4 मौजूदा वेन्यू हब्स में ही 16 खेलों को सीमित रखा गया।" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• **इंटीग्रेटेड पैरा स्पोर्ट्स पर ध्यान**: 6 पैरा खेलों (47 मेडल इवेंट्स) को शामिल कर समावेशिता पर जोर दिया गया।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "CGF scaled down format to minimize hosting costs after Victoria pulled out, using existing 4 venues in Glasgow." }],
          },
        ],
      },

      /* ── 5. MPPSC & UPSC Exam Revision Notes (STYLIZED FACTS GRID) ─── */
      {
        _key: "sec-exam-notes",
        kind: "wayForward",
        title: "MPPSC & UPSC परीक्षा हेतु Quick Revision Study Notes",
        titleEn: "MPPSC & UPSC Exam Notes on CWG 2026 Dropped Sports",
        body: [
          {
            _type: "facts",
            items: [
              { label: "हटाए गए कुल खेल", value: "**9 प्रमुख खेल** (Badminton, Wrestling, Hockey, Table Tennis, Cricket, Squash, Rugby, Volleyball, Triathlon)" },
              { label: "भारत के पदकों पर प्रभाव", value: "2022 के **61 पदकों में से 30 पदक (50%)** इन्हीं 9 खेलों से आए थे" },
              { label: "खोए गए स्वर्ण पदक", value: "**13 स्वर्ण पदक खोए** (Wrestling 6, TT 4, Badminton 3)" },
              { label: "शामिल कुल खेल (2026)", value: "**16 खेल** (10 सामान्य + 6 इंटीग्रेटेड पैरा खेल)" },
              { label: "भारतीय दल क्षमता", value: "**125 एथलीट** (13 खेलों में चुनौती पेश कर रहे हैं)" },
              { label: "मुख्य आशाजनक खेल", value: "**वेटलिफ्टिंग, मुक्केबाजी, एथलेटिक्स तथा पैरा स्पोर्ट्स**" },
            ]
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "🥇 **भारत के पदक विजेताओं की सूची देखें**: [कॉमनवेल्थ गेम्स 2026 मेडल टैली: भारत के सभी पदक विजेता](/current-affairs/commonwealth-games-2026-updates-india-medal-tally)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "High-yield one-liner revision points on dropped sports for MPPSC & UPSC exams." }],
          },
        ],
      },
    ],

    /* ─── FAQS (8 Collapsible FAQs) ───────────────────────── */
    faqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 से कुल कितने खेलों को बाहर (Dropped Sports) कर दिया गया है?",
        questionEn: "How many total sports have been dropped from Commonwealth Games 2026?",
        answer: "ग्लासगो 2026 से **9 प्रमुख खेलों** (बैडमिंटन, कुश्ती, हॉकी, टेबल टेनिस, क्रिकेट, स्क्वॉश, रग्बी सेवन्स, बीच वॉलीबॉल व ट्रायथलॉन) को बाहर कर दिया गया है।",
        answerEn: "A total of 9 major sports have been dropped from CWG 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 से कुश्ती और बैडमिंटन को क्यों हटाया गया?",
        questionEn: "Why were Wrestling and Badminton dropped from Commonwealth Games 2026?",
        answer: "ग्लासगो आयोजकों ने वित्तीय लागत और अवसंरचनात्मक खर्च कम करने के उद्देश्य से खेलों के आकार को सीमित (Scaled-down) किया और केवल 10 सामान्य खेलों को रखा।",
        answerEn: "To reduce hosting costs and infrastructure budget, CGF capped the program to 10 sports."
      },
      {
        question: "इन 9 खेलों के हटने से भारत की पदक तालिका पर क्या प्रभाव पड़ेगा?",
        questionEn: "How will the removal of these 9 sports impact India's medal tally?",
        answer: "2022 बर्मिंघम में भारत द्वारा जीते गए 61 पदकों में से **30 पदक (13 स्वर्ण सहित)** इन्हीं 9 खेलों से आए थे। इनके हटने से भारत की कुल पदक संख्या में लगभग 50% की गिरावट की आशंका है।",
        answerEn: "Nearly 50% of India's 2022 medals (30 out of 61) came from these dropped sports, causing a major impact."
      },
      {
        question: "2022 बर्मिंघम में भारत ने कुश्ती में कितने स्वर्ण पदक जीते थे?",
        questionEn: "How many Gold medals did India win in Wrestling at Birmingham 2022?",
        answer: "भारत ने कुश्ती में रिकॉर्ड **6 स्वर्ण पदक** (कुल 12 पदक) जीते थे, जो 2026 में आयोजित नहीं हो रहा है।",
        answerEn: "India won 6 Gold medals (12 total) in Wrestling at Birmingham 2022."
      },
      {
        question: "ग्लासगो 2026 में भारत का मुख्य दारोमदार किन खेलों पर रहेगा?",
        questionEn: "Which sports will India primarily rely on at Glasgow 2026?",
        answer: "भारत की मुख्य उम्मीदें **भारोत्तोलन (Weightlifting), मुक्केबाजी (Boxing), एथलेटिक्स तथा पैरा स्पोर्ट्स** पर केंद्रित रहेंगी।",
        answerEn: "India will primarily rely on Weightlifting, Boxing, Athletics, and Para Sports."
      },
      {
        question: "ग्लासगो 2026 खेलों में कुल कितने खेल और मेडल इवेंट्स शामिल हैं?",
        questionEn: "How many total sports and medal events are retained in Glasgow 2026?",
        answer: "ग्लासगो 2026 में कुल **16 खेल** (10 सामान्य + 6 पैरा खेल) और **215 मेडल इवेंट्स** शामिल हैं।",
        answerEn: "Glasgow 2026 features 16 sports and 215 medal events."
      },
      {
        question: "राष्ट्रमंडल खेल 2026 का आयोजन कहाँ और कब हो रहा है?",
        questionEn: "Where and when are the Commonwealth Games 2026 held?",
        answer: "स्कॉटलैंड के **ग्लासगो** शहर में **23 जुलाई से 2 अगस्त 2026** तक।",
        answerEn: "Held in Glasgow, Scotland from July 23 to August 2, 2026."
      },
      {
        question: "MPPSC परीक्षा के लिए 'हटाए गए खेल' टॉपिक का क्या महत्व है?",
        questionEn: "What is the relevance of the 'Dropped Sports' topic for MPPSC exams?",
        answer: "MPPSC मुख्य परीक्षा (Paper 1 & Paper 3) तथा प्रारम्भिक परीक्षा GS-1 में अंतरराष्ट्रीय खेल नीतियों, बजट बदलाव तथा भारत के प्रदर्शन प्रभाव पर सीधे विश्लेषणात्मक प्रश्न पूछे जाते हैं।",
        answerEn: "It is a prime analytical topic in MPPSC Prelims Paper 1 GS and Mains Paper 1/3 sports units."
      }
    ],

    /* ─── MCQS (8 High-Quality Practice Quizzes) ───────────────── */
    mcqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 से कुल कितने लोकप्रिय खेलों को कार्यक्रम से बाहर (Dropped) किया गया है?",
        questionEn: "How many popular sports were dropped from the CWG 2026 program?",
        options: ["A. 5 खेल", "B. 9 खेल", "C. 12 खेल", "D. 15 खेल"],
        optionsEn: ["A. 5 sports", "B. 9 sports", "C. 12 sports", "D. 15 sports"],
        correctIndex: 1,
        explanation: "ग्लासगो 2026 खेलों से 9 प्रमुख खेलों (कुश्ती, बैडमिंटन, हॉकी, टेबल टेनिस आदि) को बाहर कर दिया गया है।",
        explanationEn: "A total of 9 major sports were dropped from the Glasgow 2026 program."
      },
      {
        question: "बर्मिंघम 2022 राष्ट्रमंडल खेलों में भारत द्वारा जीते गए कुल 61 पदकों में से कितने पदक (50%) इन हटाए गए 9 खेलों से आए थे?",
        questionEn: "Out of India's 61 medals in 2022, how many medals came from these 9 dropped sports?",
        options: ["A. 15 पदक", "B. 30 पदक (13 स्वर्ण सहित)", "C. 40 पदक", "D. 10 पदक"],
        optionsEn: ["A. 15 medals", "B. 30 medals (including 13 Gold)", "C. 40 medals", "D. 10 medals"],
        correctIndex: 1,
        explanation: "2022 में भारत के 30 पदक (13 स्वर्ण) केवल इन्हीं हटे हुए 9 खेलों से आए थे।",
        explanationEn: "30 out of 61 medals (including 13 Gold) came from these dropped sports."
      },
      {
        question: "2022 बर्मिंघम खेलों में भारत ने किस खेल में सर्वाधिक 6 स्वर्ण पदक (कुल 12 पदक) जीते थे, जो 2026 में हटा दिया गया है?",
        questionEn: "In which sport did India win the highest 6 Gold medals in 2022 that has been dropped in 2026?",
        options: ["A. कुश्ती (Wrestling)", "B. भारोत्तोलन", "C. मुक्केबाजी", "D. एथलेटिक्स"],
        optionsEn: ["A. Wrestling", "B. Weightlifting", "C. Boxing", "D. Athletics"],
        correctIndex: 0,
        explanation: "भारत ने कुश्ती में 6 स्वर्ण पदक जीते थे, जिसे 2026 ग्लासगो खेलों से बाहर कर दिया गया है।",
        explanationEn: "India won 6 Gold medals in Wrestling at Birmingham 2022."
      },
      {
        question: "राष्ट्रमंडल खेल 2026 में बजट और अवसंरचनात्मक खर्च कम करने के लिए खेलों का आकार किसने सीमित (Scaled-down) किया?",
        questionEn: "Who scaled down the CWG 2026 format to reduce hosting and infrastructure costs?",
        options: ["A. कॉमनवेल्थ गेम्स फेडरेशन (CGF)", "B. आईओसी (IOC)", "C. भारतीय ओलंपिक संघ", "D. यूनेस्को"],
        optionsEn: ["A. Commonwealth Games Federation (CGF)", "B. IOC", "C. Indian Olympic Association", "D. UNESCO"],
        correctIndex: 0,
        explanation: "CGF तथा ग्लासगो आयोजकों ने कम बजट में खेल संपन्न कराने हेतु यह फैसला लिया।",
        explanationEn: "CGF and Glasgow organizers scaled down the program to lower costs."
      },
      {
        question: "ग्लासगो 2026 में 9 प्रमुख खेल हटने के बाद भारत की मुख्य उम्मीदें किन खेलों पर टिकी हैं?",
        questionEn: "With 9 sports dropped, which sports will India primarily rely on at CWG 2026?",
        options: ["A. केवल बैडमिंटन", "B. भारोत्तोलन, मुक्केबाजी, एथलेटिक्स व पैरा स्पोर्ट्स", "C. केवल हॉकी", "D. केवल कुश्ती"],
        optionsEn: ["A. Badminton only", "B. Weightlifting, Boxing, Athletics & Para Sports", "C. Hockey only", "D. Wrestling only"],
        correctIndex: 1,
        explanation: "भारत का मुख्य दारोमदार अब वेटलिफ्टिंग, मुक्केबाजी, एथलेटिक्स व पैरा स्पोर्ट्स पर केंद्रित है।",
        explanationEn: "India relies heavily on Weightlifting, Boxing, Athletics, and Para Sports."
      },
      {
        question: "ग्लासगो 2026 में कुल कितने इंटीग्रेटेड पैरा स्पोर्ट्स (47 मेडल इवेंट्स) शामिल हैं?",
        questionEn: "How many integrated para sports (47 medal events) are included in Glasgow 2026?",
        options: ["A. 2 पैरा खेल", "B. 6 पैरा खेल", "C. 10 पैरा खेल", "D. 12 पैरा खेल"],
        optionsEn: ["A. 2 para sports", "B. 6 para sports", "C. 10 para sports", "D. 12 para sports"],
        correctIndex: 1,
        explanation: "ग्लासगो 2026 में 6 इंटीग्रेटेड पैरा स्पोर्ट्स शामिल किए गए हैं।",
        explanationEn: "6 integrated para sports are included in CWG 2026."
      },
      {
        question: "राष्ट्रमंडल खेल 2026 का आयोजन 1994 के किस संस्करण के बाद सबसे छोटा सीमित खेल कार्यक्रम है?",
        questionEn: "Since which 1994 edition is CWG 2026 the smallest scaled-down program?",
        options: ["A. 1994 विक्टोरिया कॉमनवेल्थ गेम्स", "B. 1998 कुआलालंपुर", "C. 2002 मैनचेस्टर", "D. 2010 नई दिल्ली"],
        optionsEn: ["A. 1994 Victoria CWG", "B. 1998 Kuala Lumpur", "C. 2002 Manchester", "D. 2010 New Delhi"],
        correctIndex: 0,
        explanation: "ग्लासगो 2026, 1994 विक्टोरिया (कनाडा) खेलों के बाद सबसे छोटा राष्ट्रमंडल खेल कार्यक्रम है।",
        explanationEn: "Glasgow 2026 is the smallest CWG program since Victoria 1994."
      },
      {
        question: "MPPSC मुख्य परीक्षा में खेलकूद (Sports GK) किस प्रश्नपत्र का अनिवार्य हिस्सा है?",
        questionEn: "In MPPSC Mains examination, Sports GK is a mandatory topic in which paper?",
        options: ["A. Paper 1 एवं Paper 3", "B. केवल गणित", "C. केवल निबंध", "D. केवल दर्शनशास्त्र"],
        optionsEn: ["A. Paper 1 & Paper 3", "B. Mathematics only", "C. Essay only", "D. Philosophy only"],
        correctIndex: 0,
        explanation: "खेलकूद MPPSC Prelims GS-1 तथा Mains Paper 1 & Paper 3 का महत्वपूर्ण हिस्सा है।",
        explanationEn: "Sports GK is a core syllabus unit in MPPSC Mains Paper 1 & Paper 3."
      }
    ]
  };

  console.log(`📝 Syncing CWG 2026 Dropped Sports article ID "${article._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(article);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading CWG Dropped Sports article:", err);
  process.exit(1);
});
