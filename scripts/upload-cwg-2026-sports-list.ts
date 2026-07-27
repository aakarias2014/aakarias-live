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
  console.log("🚀 Starting upload process for CWG 2026 Full Sports List & Schedule Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const actionThumbnailPath = path.join(publicBlogDir, "mirabai_chanu_glasgow_2026_action_thumbnail.png");

  let assetFeaturedThumbnail;
  if (fs.existsSync(actionThumbnailPath)) {
    console.log("📸 Uploading Action Shot Thumbnail for CWG Sports List to Sanity...");
    assetFeaturedThumbnail = await client.assets.upload("image", fs.createReadStream(actionThumbnailPath), {
      filename: "mirabai_chanu_glasgow_2026_action_thumbnail.png",
    });
    console.log(`✔ Uploaded Action Featured Image. Asset ID: ${assetFeaturedThumbnail._id}`);
  }

  const mirabaiPodiumPath = path.join(publicBlogDir, "mirabai_chanu_2026_gold_victory_podium.png");
  let assetVictoryPodium;
  if (fs.existsSync(mirabaiPodiumPath)) {
    console.log("📸 Uploading Mirabai Chanu 2026 Gold Victory Podium Photo to Sanity...");
    assetVictoryPodium = await client.assets.upload("image", fs.createReadStream(mirabaiPodiumPath), {
      filename: "mirabai_chanu_2026_gold_victory_podium.png",
    });
    console.log(`✔ Uploaded Victory Podium Image. Asset ID: ${assetVictoryPodium._id}`);
  }

  const article = {
    _id: "ca-cwg-2026-sports-list-schedule",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "commonwealth-games-2026-sports-list-schedule-india-events" },
    title: "कॉमनवेल्थ गेम्स 2026 के खेलों की पूरी लिस्ट: शामिल खेल, तिथियाँ, वेन्यू, भारत की भागीदारी व हटाए गए खेल | MPPSC & UPSC",
    titleEn: "Commonwealth Games 2026 Full Sports List, Schedule, Venues, India Events & Dropped Sports | MPPSC & UPSC Notes",
    excerpt: "राष्ट्रमंडल खेल 2026 (ग्लासगो, स्कॉटलैंड): 16 शामिल खेल (10 सामान्य + 6 पैरा), 215 मेडल इवेंट्स, 125 सदस्यीय भारतीय दल, तिथियाँ, 4 वेन्यू, हटाए गए 9 प्रमुख खेल (Badminton, Wrestling, Hockey, Table Tennis) व MPPSC/UPSC परीक्षा नोट्स।",
    excerptEn: "CWG 2026 Glasgow full sports list: 16 sports (10 able-bodied + 6 integrated para), 215 medal events, 125-member Indian contingent across 13 sports, schedule, venues, 9 dropped major sports and MPPSC/UPSC exam notes.",
    ca_date: "2026-07-27",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 12,
    keywords: [
      "Commonwealth Games 2026 Sports List",
      "कॉमनवेल्थ गेम्स 2026 खेलों की सूची",
      "CWG 2026 schedule and venues",
      "कॉमनवेल्थ गेम्स 2026 शेड्यूल वेन्यू",
      "CWG 2026 dropped sports list",
      "कॉमनवेल्थ गेम्स 2026 से हटाए गए खेल",
      "India at Commonwealth Games 2026",
      "CWG 2026 Indian athletes squad",
      "Mirabai Chanu 2026 Gold Medal",
      "Glasgow 2026 CWG venues",
      "Scotstoun Stadium SEC Center",
      "Sir Chris Hoy Velodrome",
      "Tollcross International Swimming Centre",
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
        alt: "Commonwealth Games 2026 Glasgow Full Sports List Schedule Venues Indian Athletes MPPSC UPSC Notes",
      }
    } : {}),

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News & Overview ────────────────────────────── */
      {
        _key: "sec-overview-highlights",
        kind: "whyInNews",
        title: "ग्लासगो 2026: 1994 के बाद सबसे छोटा कॉमनवेल्थ गेम्स कार्यक्रम एवं मुख्य बिंदु",
        titleEn: "Glasgow 2026 Overview: Smallest CWG Program Since 1994 & Key Highlights",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "राष्ट्रमंडल खेल (**Commonwealth Games 2026**) का 23वां संस्करण **23 जुलाई से 2 अगस्त 2026** तक स्कॉटलैंड के **ग्लासगो** शहर में आयोजित किया जा रहा है। इस बार का संस्करण कई मायनों में खास है, क्योंकि 1994 के बाद यह सबसे छोटा कॉमनवेल्थ गेम्स कार्यक्रम होगा। प्रतियोगिता में 74 राष्ट्रों और क्षेत्रों के 3,000 से अधिक एथलीट हिस्सा ले रहे हैं।" }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "ग्लासगो 2026 में कुल **16 खेल** शामिल किए गए हैं, जिनमें 10 सामान्य (Able-bodied) खेल और 6 इंटीग्रेटेड पैरा स्पोर्ट्स शामिल हैं। इन खेलों में कुल **215 मेडल इवेंट्स** (47 पैरा मेडल इवेंट्स सहित) आयोजित होंगे। भारत का **125 सदस्यीय दल** इस बार **13 खेलों** (8 सामान्य + 5 पैरा) में अपनी मजबूत चुनौती पेश कर रहा है।" }],
          },
          ...(assetVictoryPodium ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetVictoryPodium._id },
            alt: "2026 win mirabai chanu gold medal victory podium glasgow commonwealth games weightlifting mppsc upsc notes",
            caption: "2026 win mirabai chanu: ग्लासगो कॉमनवेल्th गेम्स 2026 में 48kg स्वर्ण पदक और अधिकारिक शुभंकर के साथ पोडियम पर साइखोम मीराबाई चानू",
          }] : []),
          {
            _key: "b1-h1", _type: "block", style: "h3",
            children: [{ _key: "sh1-1", _type: "span", text: "मुख्य बिंदु तालिका (Glasgow 2026 Key Highlights Table)" }],
          },
          {
            _type: "table",
            caption: "राष्ट्रमंडल खेल 2026: मुख्य बिंदु एवं आँकड़े (Highlights Table)",
            headers: ["विवरण (Parameter)", "महत्वपूर्ण जानकारी (Details)"],
            rows: [
              ["**आयोजन (Event)**", "23वें राष्ट्रमंडल खेल 2026 (Commonwealth Games 2026)"],
              ["**आयोजन स्थल (Venue & City)**", "ग्लासगो, स्कॉटलैंड (United Kingdom)"],
              ["**आयोजन तिथि (Dates)**", "23 जुलाई – 2 अगस्त 2026"],
              ["**सहभागी देश / क्षेत्र (Nations)**", "74 राष्ट्र एवं क्षेत्र"],
              ["**कुल खिलाड़ी (Total Athletes)**", "3,000+ एथलीट"],
              ["**कुल खेल (Total Sports)**", "**16 खेल** (10 सामान्य + 6 पैरा खेल)"],
              ["**कुल मेडल इवेंट्स (Medal Events)**", "**215 मेडल इवेंट्स** (47 पैरा इवेंट्स शामिल)"],
              ["**भारतीय दल (Indian Contingent)**", "**125 खिलाड़ी**"],
              ["**भारत की भागीदारी (India Events)**", "**13 खेलों में** (8 सामान्य + 5 पैरा स्पोर्ट्स)"]
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "Glasgow 2026 features 16 sports (10 able-bodied + 6 para) with 215 medal events across 4 venue hubs. India has fielded a 125-member squad across 13 sports." }],
          },
        ],
      },

      /* ── 2. All 16 Sports Schedule, Venues & Medal Events ───────── */
      {
        _key: "sec-all-sports-schedule",
        kind: "background",
        title: "कॉमनवेल्थ गेम्स 2026 में शामिल सभी 16 खेलों की सूची, तिथियाँ व वेन्यू",
        titleEn: "All 16 CWG 2026 Sports List, Schedule Dates & Venues Table",
        body: [
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "ग्लासगो 2026 के सभी मुकाबले मुख्य रूप से शहर के **4 प्रमुख वेन्यू हब्स** (SEC Center / Armadillo / OVO Hydro, Scotstoun Stadium, Tollcross International Swimming Centre, Sir Chris Hoy Velodrome) में आयोजित हो रहे हैं, जो लगभग 8 मील के दायरे में स्थित हैं।" }],
          },
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{ _key: "sh2-1", _type: "span", text: "1. सभी 16 खेलों की आधिकारिक तालिका (16 Sports Master Schedule Table)" }],
          },
          {
            _type: "table",
            caption: "कॉमनवेल्थ गेम्स 2026: सभी 16 खेलों की सूची, मेडल इवेंट, तिथियाँ एवं वेन्यू",
            headers: ["खेल (Sport)", "मेडल इवेंट (Medals)", "प्रतियोगिता तिथि (Dates)", "वेन्यू (Venue Hub)"],
            rows: [
              ["**3x3 बास्केटबॉल**", "2", "25 – 29 जुलाई", "SEC सेंटर"],
              ["**आर्टिस्टिक जिम्नास्टिक**", "14", "24 – 28 जुलाई", "ग्लासगो इंटरनेशनल एरीना"],
              ["**एथलेटिक्स (Athletics)**", "43", "27 जुलाई – 1 अगस्त", "स्कॉटस्टाउन स्टेडियम"],
              ["**बॉक्सिंग (Boxing)**", "14", "24 जुलाई – 1 अगस्त", "SEC सेंटर"],
              ["**बाउल्स (Lawn Bowls)**", "4", "24 जुलाई – 2 अगस्त", "SEC सेंटर"],
              ["**जूडो (Judo)**", "14", "31 जुलाई – 2 अगस्त", "SEC सेंटर"],
              ["**नेटबॉल (Netball)**", "1", "24 जुलाई – 2 अगस्त", "OVO हाइड्रो"],
              ["**स्विमिंग (Swimming)**", "42", "24 – 29 जुलाई", "टोलक्रॉस इंटरनेशनल स्विमिंग सेंटर"],
              ["**ट्रैक साइकिलिंग (Track Cycling)**", "18", "30 जुलाई – 2 अगस्त", "सर क्रिस होय वेलोड्रोम"],
              ["**वेटलिफ्टिंग (Weightlifting)**", "16", "26 – 30 जुलाई", "SEC आर्माडिलो"],
              ["**पैरा एथलेटिक्स (Para Athletics)**", "16", "27 जुलाई – 1 अगस्त", "स्कॉटस्टाउन स्टेडियम"],
              ["**पैरा बाउल्स (Para Bowls)**", "3", "24 जुलाई – 2 अगस्त", "SEC सेंटर"],
              ["**पैरा पावरलिफ्टिंग (Para Powerlifting)**", "4", "26 – 30 जुलाई", "SEC आर्माडिलो"],
              ["**पैरा स्विमिंग (Para Swimming)**", "14", "24 – 29 जुलाई", "टोलक्रॉस इंटरनेशनल स्विमिंग सेंटर"],
              ["**पैरा ट्रैक साइकिलिंग (Para Track Cycling)**", "8", "30 जुलाई – 2 अगस्त", "सर क्रिस होय वेलोड्रोम"],
              ["**3x3 व्हीलचेयर बास्केटबॉल**", "2", "25 – 29 जुलाई", "SEC सेंटर"]
            ]
          },
          {
            _key: "b2-h2", _type: "block", style: "h3",
            children: [{ _key: "sh2-2", _type: "span", text: "2. किस खेल में सबसे अधिक मेडल इवेंट्स हैं? (Top Medal Events)" }],
          },
          {
            _type: "table",
            caption: "सर्वश्रेष्ठ मेडल इवेंट्स वाले खेल (Top Medal Events Table)",
            headers: ["क्रमांक (No.)", "खेल (Sport)", "मेडल इवेंट्स (Medal Events)"],
            rows: [
              ["1", "**एथलेटिक्स (Athletics)**", "**43 मेडल इवेंट्स**"],
              ["2", "**स्विमिंग (Swimming)**", "**42 मेडल इवेंट्स**"],
              ["3", "**ट्रैक साइकिलिंग (Track Cycling)**", "**18 मेडल इवेंट्स**"],
              ["4", "**वेटलिफ्टिंग (Weightlifting)**", "**16 मेडल इवेंट्स**"],
              ["5", "**पैरा एथलेटिक्स (Para Athletics)**", "**16 मेडल इवेंट्स**"]
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "Complete schedule of all 16 sports across 4 venues in Glasgow with Athletics (43) and Swimming (42) holding the maximum medal events." }],
          },
        ],
      },

      /* ── 3. India's Sport-wise Participation Breakdown ───────── */
      {
        _key: "sec-india-athletes-breakdown",
        kind: "keyHighlights",
        title: "भारत किन खेलों में हिस्सा ले रहा है? (125 सदस्यीय भारतीय दल का विवरण)",
        titleEn: "India's Sport-wise Contingent Breakdown Table (125 Athletes in 13 Sports)",
        body: [
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "भारत इस बार कुल **13 खेलों** (8 सामान्य खेल एवं 5 इंटीग्रेटेड पैरा खेल) में अपने **125 खिलाड़ियों** को उतार रहा है।" }],
          },
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{ _key: "sh3-1", _type: "span", text: "1. खेलवार भारतीय खिलाड़ियों की संख्या (India Athletes Count Table)" }],
          },
          {
            _type: "table",
            caption: "भारत की खेलवार भागीदारी एवं खिलाड़ियों की संख्या (India Squad Breakdown)",
            headers: ["क्रमांक (No.)", "खेल (Sport)", "भारतीय खिलाड़ियों की संख्या (Athletes Count)"],
            rows: [
              ["1", "**एथलेटिक्स (Athletics)**", "**32 खिलाड़ी**"],
              ["2", "**बॉक्सिंग (Boxing)**", "**14 खिलाड़ी**"],
              ["3", "**जूडो (Judo)**", "**14 खिलाड़ी**"],
              ["4", "**वेटलिफ्टिंग (Weightlifting)**", "**12 खिलाड़ी** (मीराबाई चानू, ऋषिकांत सिंह आदि)"],
              ["5", "**पैरा एथलेटिक्स (Para Athletics)**", "**11 खिलाड़ी**"],
              ["6", "**आर्टिस्टिक जिम्नास्टिक (Gymnastics)**", "**8 खिलाड़ी**"],
              ["7", "**पैरा पावरलिफ्टिंग (Para Powerlifting)**", "**7 खिलाड़ी** (झांडू कुमार आदि)"],
              ["8", "**बाउल्स (Lawn Bowls)**", "**6 खिलाड़ी**"],
              ["9", "**ट्रैक साइकिलिंग (Track Cycling)**", "**6 खिलाड़ी**"],
              ["10", "**पैरा स्विमिंग (Para Swimming)**", "**5 खिलाड़ी**"],
              ["11", "**स्विमिंग (Swimming)**", "**5 खिलाड़ी**"],
              ["12", "**3x3 व्हीलचेयर बास्केटबॉल**", "**4 खिलाड़ी**"],
              ["13", "**पैरा ट्रैक साइकिलिंग**", "**1 खिलाड़ी**"],
              ["--", "**कुल भारतीय दल (Total Contingent)**", "**125 खिलाड़ी (13 खेल)**"]
            ]
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "🏋️ **मीराबाई चानू की स्वर्णिम जीवनी पढ़ें**: [मीराबाई चानू (Mirabai Chanu): जीवनी, CWG 2026 स्वर्ण पदक, 190kg रिकॉर्ड व 10 लाइन नोट्स](/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "India's 125-member squad features 32 in Athletics, 14 in Boxing, 14 in Judo, 12 in Weightlifting, 11 in Para Athletics, and 7 in Para Powerlifting." }],
          },
        ],
      },

      /* ── 4. Dropped Sports & Format Changes ────────────────────── */
      {
        _key: "sec-dropped-sports-changes",
        kind: "analysis",
        title: "कॉमनवेल्थ गेम्स 2026 से हटाए गए 9 प्रमुख खेल व ग्लासगो में हुए बड़े बदलाव",
        titleEn: "9 Major Dropped Sports from CWG 2026 & Key Format Changes in Glasgow",
        body: [
          {
            _key: "b4-h1", _type: "block", style: "h3",
            children: [{ _key: "sh4-1", _type: "span", text: "1. 2026 खेलों से बाहर किए गए 9 लोकप्रिय खेल (MPPSC Important Notes)" }],
          },
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "ग्लासगो 2026 में बजट और अवसंरचनात्मक खर्च कम करने के उद्देश्य से 9 प्रमुख लोकप्रिय खेलों को कार्यक्रम से बाहर कर दिया गया है:" }],
          },
          {
            _key: "b4-d1", _type: "block", style: "normal",
            children: [{ _key: "s4-d1", _type: "span", text: "• 🚫 **बैडमिंटन (Badminton)** | 🚫 **कुश्ती (Wrestling)** | 🚫 **हॉकी (Hockey)**" }],
          },
          {
            _key: "b4-d2", _type: "block", style: "normal",
            children: [{ _key: "s4-d2", _type: "span", text: "• 🚫 **टेबल टेनिस (Table Tennis)** | 🚫 **क्रिकेट (Cricket)** | 🚫 **स्क्वॉश (Squash)**" }],
          },
          {
            _key: "b4-d3", _type: "block", style: "normal",
            children: [{ _key: "s4-d3", _type: "span", text: "• 🚫 **बीच वॉलीबॉल (Beach Volleyball)** | 🚫 **रग्बी सेवन्स (Rugby Sevens)** | 🚫 **ट्रायथलॉन (Triathlon)**" }],
          },
          {
            _key: "b4-h2", _type: "block", style: "h3",
            children: [{ _key: "sh4-2", _type: "span", text: "2. ग्लासगो 2026 में क्या-क्या बड़े बदलाव हुए?" }],
          },
          {
            _key: "b4-c1", _type: "block", style: "normal",
            children: [{ _key: "s4-c1", _type: "span", text: "• **1994 के बाद सबसे छोटा कार्यक्रम**: 1994 विक्टोरिया खेलों के बाद यह कॉमनवेल्थ गेम्स का सबसे सीमित प्रारूप है।" }],
          },
          {
            _key: "b4-c2", _type: "block", style: "normal",
            children: [{ _key: "s4-c2", _type: "span", text: "• **4 क्लस्टर वेन्यू (8 मील दायरा)**: सभी 16 खेल केवल 4 वेन्यू क्लस्टर्स में ही आयोजित हो रहे हैं।" }],
          },
          {
            _key: "b4-c3", _type: "block", style: "normal",
            children: [{ _key: "s4-c3", _type: "span", text: "• **6 इंटीग्रेटेड पैरा स्पोर्ट्स (47 मेडल इवेंट्स)**: पैरा स्पोर्ट्स को मुख्य खेलों के साथ एकीकृत किया गया है।" }],
          },
          {
            _key: "b4-c4", _type: "block", style: "normal",
            children: [{ _key: "s4-c4", _type: "span", text: "• **अतिरिक्त हटाए गए इवेंट्स**: रोड साइकिलिंग, माउंटेन बाइकिंग, डाइविंग तथा रिदमिक जिम्नास्टिक को भी हटा दिया गया है।" }],
          },
          {
            _key: "b4-h3", _type: "block", style: "h3",
            children: [{ _key: "sh4-3", _type: "span", text: "3. भारत के लिए क्यों चुनौतीपूर्ण होगा ग्लासगो 2026?" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "भारत ने बर्मिंघम 2022 में शानदार प्रदर्शन करते हुए **61 पदक (22 स्वर्ण, 16 रजत, 23 कांस्य)** जीतकर चौथा स्थान हासिल किया था। हालांकि, इस बार भारत के 5 पारंपरिक मजबूत खेल (**कुश्ती, बैडमिंटन, टेबल टेनिस, हॉकी व क्रिकेट**) बाहर होने के कारण भारत के लिए 2022 जैसा प्रदर्शन दोहराना चुनौतीपूर्ण रहेगा। अब भारत की मुख्य उम्मीदें वेटलिफ्टिंग, मुक्केबाजी, एथलेटिक्स और पैरा स्पोर्ट्स पर टिकी हैं।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "9 major sports dropped including Badminton, Wrestling, Hockey, Table Tennis, Cricket. Comparison with Birmingham 2022 (61 medals, 4th rank)." }],
          },
        ],
      },

      /* ── 5. MPPSC & UPSC Exam Revision Notes (STYLIZED FACTS GRID) ─── */
      {
        _key: "sec-exam-notes",
        kind: "wayForward",
        title: "MPPSC & UPSC परीक्षा हेतु Quick Revision Study Notes",
        titleEn: "MPPSC & UPSC Sports Exam Notes on CWG 2026 Schedule",
        body: [
          {
            _type: "facts",
            items: [
              { label: "आयोजन तिथि व स्थान", value: "**23 जुलाई – 2 अगस्त 2026**, ग्लासगो (स्कॉटलैंड)" },
              { label: "कुल खेल व मेडल इवेंट्स", value: "**16 खेल** (10 सामान्य + 6 पैरा) | **215 मेडल इवेंट्स**" },
              { label: "भारतीय दल क्षमता", value: "**125 एथलीट** (13 खेलों में भाग ले रहे हैं)" },
              { label: "सर्वाधिक मेडल इवेंट खेल", value: "**एथलेटिक्स (43)** एवं **स्विमिंग (42)**" },
              { label: "प्रमुख हटाए गए खेल", value: "**निशानेबाजी, कुश्ती, बैडमिंटन, हॉकी, टेबल टेनिस, क्रिकेट**" },
              { label: "2022 बर्मिंघम तुलना", value: "2022 में भारत ने **61 पदक (22 स्वर्ण)** जीतकर 4th रैंक पाई थी" },
            ]
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "🥇 **भारत की पूरी मेडल टैली देखें**: [कॉमनवेल्थ गेम्स 2026 मेडल टैली: भारत के सभी पदक विजेता व तालिका](/current-affairs/commonwealth-games-2026-updates-india-medal-tally)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "High-yield summary facts on CWG 2026 sports list and Indian participation." }],
          },
        ],
      },
    ],

    /* ─── FAQS (8 Collapsible FAQs) ───────────────────────── */
    faqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 में कुल कितने खेल और मेडल इवेंट्स शामिल हैं?",
        questionEn: "How many total sports and medal events are included in CWG 2026?",
        answer: "ग्लासगो 2026 में कुल **16 खेल** (10 सामान्य + 6 इंटीग्रेटेड पैरा स्पोर्ट्स) और **215 मेडल इवेंट्स** (47 पैरा इवेंट्स) शामिल हैं।",
        answerEn: "CWG 2026 includes 16 sports (10 able-bodied + 6 para) and 215 medal events."
      },
      {
        question: "भारत ग्लासगो कॉमनवेल्थ गेम्स 2026 में कितने खेलों में हिस्सा ले रहा है?",
        questionEn: "In how many sports is India participating at Glasgow CWG 2026?",
        answer: "भारत का **125 सदस्यीय दल** कुल **13 खेलों** (8 सामान्य खेल + 5 पैरा स्पोर्ट्स) में चुनौती पेश कर रहा है।",
        answerEn: "India's 125-member contingent is competing across 13 sports."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में किस खेल में सबसे अधिक मेडल इवेंट्स हैं?",
        questionEn: "Which sport has the highest number of medal events at CWG 2026?",
        answer: "सबसे अधिक मेडल इवेंट्स **एथलेटिक्स (43 मेडल इवेंट्स)** तथा **स्विमिंग (42 मेडल इवेंट्स)** में आयोजित हो रहे हैं।",
        answerEn: "Athletics has the highest number of medal events (43), followed by Swimming (42)."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 से किन 9 प्रमुख खेलों को बाहर कर दिया गया है?",
        questionEn: "Which 9 major sports have been dropped from Commonwealth Games 2026?",
        answer: "ग्लासगो 2026 से **बैडमिंटन, कुश्ती, हॉकी, टेबल टेनिस, क्रिकेट, स्क्वॉश, रग्बी सेवन्स, बीच वॉलीबॉल तथा ट्रायथलॉन** को बाहर कर दिया गया है।",
        answerEn: "Badminton, Wrestling, Hockey, Table Tennis, Cricket, Squash, Rugby Sevens, Beach Volleyball, and Triathlon were dropped."
      },
      {
        question: "ग्लासगो 2026 राष्ट्रमंडल खेलों का आयोजन कब से कब तक हो रहा है?",
        questionEn: "What are the dates for the Glasgow Commonwealth Games 2026?",
        answer: "23वें राष्ट्रमंडल खेल **23 जुलाई से 2 अगस्त 2026** तक स्कॉटलैंड के ग्लासगो में आयोजित हो रहे हैं।",
        answerEn: "CWG 2026 is being held from July 23 to August 2, 2026 in Glasgow, Scotland."
      },
      {
        question: "ग्लासगो 2026 में प्रतियोगिताओं का आयोजन कितने वेन्यू हब्स में हो रहा है?",
        questionEn: "In how many venue hubs are competitions held at Glasgow 2026?",
        answer: "मुकाबले केवल **4 प्रमुख वेन्यू हब्स** (SEC Center, Scotstoun Stadium, Tollcross Swimming Centre, Sir Chris Hoy Velodrome) में 8 मील के दायरे में हो रहे हैं।",
        answerEn: "Competitions are hosted across 4 major venue hubs within an 8-mile radius."
      },
      {
        question: "बर्मिंघम 2022 में भारत का प्रदर्शन कैसा रहा था?",
        questionEn: "How did India perform at the Birmingham 2022 Commonwealth Games?",
        answer: "भारत ने बर्मिंघम 2022 में कुल **61 पदक** (22 स्वर्ण, 16 रजत, 23 कांस्य) जीतकर पदक तालिका में चौथा स्थान हासिल किया था।",
        answerEn: "India won 61 medals (22 Gold) and ranked 4th at Birmingham 2022."
      },
      {
        question: "MPPSC परीक्षा के लिए कॉमनवेल्थ गेम्स 2026 स्पोर्ट्स लिस्ट से कौन-से प्रश्न बनते हैं?",
        questionEn: "Which questions are asked in MPPSC exams from CWG 2026 sports list?",
        answer: "MPPSC प्रारम्भिक परीक्षा में कुल खेल (16), भारतीय दल (125), हटाए गए खेल (कुश्ती, निशानेबाजी, बैडमिंटन) तथा मेडल इवेंट्स से प्रश्न पूछे जाते हैं।",
        answerEn: "Total sports (16), Indian squad (125), dropped sports, and venue cities are core MPPSC GS questions."
      }
    ],

    /* ─── MCQS (8 High-Quality Practice Quizzes) ───────────────── */
    mcqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 (ग्लासगो) में कुल कितने खेलों (Sports) को शामिल किया गया है?",
        questionEn: "How many total sports are included in the Commonwealth Games 2026?",
        options: ["A. 20 खेल", "B. 16 खेल (10 सामान्य + 6 पैरा)", "C. 25 खेल", "D. 12 खेल"],
        optionsEn: ["A. 20 sports", "B. 16 sports (10 able-bodied + 6 para)", "C. 25 sports", "D. 12 sports"],
        correctIndex: 1,
        explanation: "ग्लासगो 2026 में कुल 16 खेल शामिल किए गए हैं (10 सामान्य खेल और 6 इंटीग्रेटेड पैरा स्पोर्ट्स)।",
        explanationEn: "CWG 2026 features 16 sports comprising 10 able-bodied and 6 integrated para sports."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भारत का कितने सदस्यीय दल हिस्सा ले रहा है?",
        questionEn: "How many members are in the Indian contingent competing at CWG 2026?",
        options: ["A. 100 खिलाड़ी", "B. 125 खिलाड़ी", "C. 150 खिलाड़ी", "D. 200 खिलाड़ी"],
        optionsEn: ["A. 100 athletes", "B. 125 athletes", "C. 150 athletes", "D. 200 athletes"],
        correctIndex: 1,
        explanation: "भारत का 125 सदस्यीय दल 13 खेलों (8 सामान्य + 5 पैरा स्पोर्ट्स) में भाग ले रहा है।",
        explanationEn: "India has sent a 125-member squad competing across 13 sports."
      },
      {
        question: "राष्ट्रमंडल खेल 2026 में सबसे अधिक मेडल इवेंट्स (43 इवेंट्स) किस खेल में आयोजित हो रहे हैं?",
        questionEn: "Which sport has the maximum medal events (43 events) at CWG 2026?",
        options: ["A. स्विमिंग", "B. एथलेटिक्स (Athletics)", "C. वेटलिफ्टिंग", "D. मुक्केबाजी"],
        optionsEn: ["A. Swimming", "B. Athletics", "C. Weightlifting", "D. Boxing"],
        correctIndex: 1,
        explanation: "एथलेटिक्स में सबसे अधिक 43 मेडल इवेंट्स और स्विमिंग में 42 मेडल इवेंट्स आयोजित हो रहे हैं।",
        explanationEn: "Athletics features the highest number of medal events with 43 events."
      },
      {
        question: "ग्लासगो कॉमनवेल्थ गेम्स 2026 से किस पारंपरिक रूप से मजबूत भारतीय खेल को बाहर कर दिया गया है?",
        questionEn: "Which traditionally strong Indian sport was dropped from Glasgow CWG 2026?",
        options: ["A. वेटलिफ्टिंग", "B. बैडमिंटन, कुश्ती व हॉकी", "C. बॉक्सिंग", "D. एथलेटिक्स"],
        optionsEn: ["A. Weightlifting", "B. Badminton, Wrestling & Hockey", "C. Boxing", "D. Athletics"],
        correctIndex: 1,
        explanation: "बैडमिंटन, कुश्ती, हॉकी, टेबल टेनिस व क्रिकेट को ग्लासगो 2026 से बाहर रखा गया है।",
        explanationEn: "Badminton, Wrestling, Hockey, Table Tennis and Cricket were dropped from CWG 2026."
      },
      {
        question: "ग्लासगो 2026 कॉमनवेल्थ गेम्स में कुल कितने मेडल इवेंट्स (Medal Events) आयोजित होंगे?",
        questionEn: "How many total medal events will be held at Glasgow CWG 2026?",
        options: ["A. 215 मेडल इवेंट्स", "B. 300 मेडल इवेंट्स", "C. 150 मेडल इवेंट्स", "D. 180 मेडल इवेंट्स"],
        optionsEn: ["A. 215 medal events", "B. 300 medal events", "C. 150 medal events", "D. 180 medal events"],
        correctIndex: 0,
        explanation: "ग्लासगो 2026 में कुल 215 मेडल इवेंट्स (47 पैरा मेडल इवेंट्स सहित) आयोजित हो रहे हैं।",
        explanationEn: "Glasgow 2026 will host 215 medal events including 47 para events."
      },
      {
        question: "बर्मिंघम 2022 राष्ट्रमंडल खेलों में भारत ने कुल कितने पदक जीतकर चौथा स्थान हासिल किया था?",
        questionEn: "How many total medals did India win at the Birmingham 2022 CWG to rank 4th?",
        options: ["A. 61 पदक (22 स्वर्ण)", "B. 101 पदक", "C. 50 पदक", "D. 40 पदक"],
        optionsEn: ["A. 61 medals (22 Gold)", "B. 101 medals", "C. 50 medals", "D. 40 medals"],
        correctIndex: 0,
        explanation: "भारत ने बर्मिंघम 2022 में 22 स्वर्ण सहित कुल 61 पदक जीतकर 4th स्थान प्राप्त किया था।",
        explanationEn: "India won 61 medals including 22 Gold at Birmingham 2022."
      },
      {
        question: "ग्लासगो 2026 खेल 1994 के किस राष्ट्रमंडल खेल संस्करण के बाद सबसे छोटा (Scaled-down) कार्यक्रम है?",
        questionEn: "Since which 1994 CWG edition is Glasgow 2026 the smallest scaled-down program?",
        options: ["A. 1994 विक्टोरिया (कनाडा)", "B. 1998 कुआलालंपुर", "C. 1990 ऑकलैंड", "D. 1986 एडिनबर्ग"],
        optionsEn: ["A. 1994 Victoria (Canada)", "B. 1998 Kuala Lumpur", "C. 1990 Auckland", "D. 1986 Edinburgh"],
        correctIndex: 0,
        explanation: "ग्लासगो 2026, 1994 विक्टोरिया (कनाडा) कॉमनवेल्थ गेम्स के बाद सबसे छोटा खेल कार्यक्रम है।",
        explanationEn: "Glasgow 2026 is the smallest CWG program since Victoria 1994."
      },
      {
        question: "MPPSC प्रारम्भिक परीक्षा प्रश्नपत्र-1 में खेल समसामयिकी (Sports Current Affairs) किस यूनिट का हिस्सा है?",
        questionEn: "In MPPSC Prelims Paper 1 GS, Sports Current Affairs is part of which unit?",
        options: ["A. Unit 8 (अंतरराष्ट्रीय एवं राष्ट्रीय समसामयिक घटनाएँ व खेल)", "B. Unit 1", "C. Unit 5", "D. Unit 10"],
        optionsEn: ["A. Unit 8 (Current Affairs & Sports)", "B. Unit 1", "C. Unit 5", "D. Unit 10"],
        correctIndex: 0,
        explanation: "खेल समसामयिकी MPPSC Prelims Paper 1 की Unit 8 तथा Mains Paper 1/3 का अनिवार्य विषय है।",
        explanationEn: "Sports Current Affairs is covered under Unit 8 of MPPSC Prelims GS Paper 1."
      }
    ]
  };

  console.log(`📝 Syncing CWG 2026 Sports List article ID "${article._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(article);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading CWG Sports List article:", err);
  process.exit(1);
});
