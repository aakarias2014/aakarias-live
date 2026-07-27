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
  console.log("🚀 Starting upload process for CWG 2026 Sports List Article with unique images...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Unique Featured Thumbnail Banner
  const bannerPath = path.join(publicBlogDir, "cwg_2026_sports_list_banner.png");
  let assetFeaturedThumbnail;
  if (fs.existsSync(bannerPath)) {
    console.log("📸 Uploading Unique CWG 2026 Sports List Arena Banner to Sanity...");
    assetFeaturedThumbnail = await client.assets.upload("image", fs.createReadStream(bannerPath), {
      filename: "cwg_2026_sports_list_banner.png",
    });
    console.log(`✔ Uploaded Sports List Banner. Asset ID: ${assetFeaturedThumbnail._id}`);
  }

  // 2. In-body Image 1: Included Disciplines Arena
  const includedDisciplinesPath = path.join(publicBlogDir, "cwg_2026_included_disciplines.png");
  let assetIncludedDisciplines;
  if (fs.existsSync(includedDisciplinesPath)) {
    console.log("📸 Uploading Included Sports Disciplines Arena Image to Sanity...");
    assetIncludedDisciplines = await client.assets.upload("image", fs.createReadStream(includedDisciplinesPath), {
      filename: "cwg_2026_included_disciplines.png",
    });
    console.log(`✔ Uploaded Included Disciplines Image. Asset ID: ${assetIncludedDisciplines._id}`);
  }

  // 3. In-body Image 2: Indian Athletes Athletics Training
  const indianAthletesPath = path.join(publicBlogDir, "cwg_2026_indian_athletes_training.png");
  let assetIndianAthletes;
  if (fs.existsSync(indianAthletesPath)) {
    console.log("📸 Uploading Indian Athletes Training Image to Sanity...");
    assetIndianAthletes = await client.assets.upload("image", fs.createReadStream(indianAthletesPath), {
      filename: "cwg_2026_indian_athletes_training.png",
    });
    console.log(`✔ Uploaded Indian Athletes Image. Asset ID: ${assetIndianAthletes._id}`);
  }

  const article = {
    _id: "ca-cwg-2026-sports-list-schedule",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "commonwealth-games-2026-sports-list-schedule-india-events" },
    title: "कॉमनवेल्थ गेम्स 2026 के खेलों की पूरी लिस्ट: शामिल खेल, तिथियाँ, वेन्यू, भारत की भागीदारी व हटाए गए खेल | MPPSC & UPSC",
    titleEn: "Commonwealth Games 2026 Glasgow Full Sports List Schedule Venues Indian Athletes MPPSC UPSC Notes",
    excerpt: "राष्ट्रमंडल खेल (CWG) 2026 स्कॉटलैंड के ग्लासगो में 23 जुलाई से 2 अगस्त तक आयोजित होंगे। जानें 10 शामिल खेलों की पूरी सूची, वेन्यू विवरण, भारत का 122 सदस्यीय दल, पैरा स्पर्धाएँ, हटाए गए 9 खेल एवं MPPSC व UPSC मुख्य परीक्षा उपयोगी नोट्स।",
    excerptEn: "Complete sports list for Glasgow Commonwealth Games 2026 (July 23 - Aug 2): 10 included disciplines, venues, Indian contingent of 122 athletes, para sports integration, list of 9 dropped sports, and MPPSC & UPSC study notes.",
    ca_date: "2026-07-27",
    publishedAt: new Date().toISOString(),
    featured: false,
    readingTime: 10,
    keywords: [
      "Commonwealth Games 2026 Glasgow sports list",
      "कॉमनवेल्थ गेम्स 2026 खेलों की सूची",
      "CWG 2026 full sports list schedule venues",
      "Glasgow 2026 included 10 sports",
      "CWG 2026 Indian athletes squad contingent",
      "Sports Current Affairs 2026",
      "MPPSC Sports Paper 1 Unit 5 Notes",
      "MPPSC General Knowledge Sports Notes"
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
      /* ── 1. Overview & Dates ──────────────────────────────────── */
      {
        _key: "sec-overview",
        kind: "whyInNews",
        title: "राष्ट्रमंडल खेल 2026: आयोजन तिथि, मेजबान शहर व मुख्य विवरण",
        titleEn: "CWG 2026 Overview, Dates & Venues",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "23वें **कॉमनवेल्थ गेम्स 2026 (Commonwealth Games 2026)** का आयोजन **23 जुलाई से 2 अगस्त 2026** तक स्कॉटलैंड की सांस्कृतिक राजधानी **ग्लासगो** में किया जा रहा है। प्रतियोगिता में 74 राष्ट्रमंडल देशों के लगभग 3,000 से अधिक एथलीट हिस्सा ले रहे हैं। भारत ने **122 एथलीटों का मजबूत दल** मैदान में उतारा है।" }],
          },
          ...(assetIncludedDisciplines ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetIncludedDisciplines._id },
            alt: "Glasgow 2026 included sports disciplines arena weightlifting gymnastics judo MPPSC UPSC Notes",
            caption: "ग्लासगो 2026 कॉमनवेल्थ गेम्स मल्टी-स्पोर्ट्स एरिना: भारोत्तोलन, जिम्नास्टिक एवं जूडो स्पर्धा स्थल",
          }] : []),
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "ग्लासगो ने इससे पहले 2014 में भी राष्ट्रमंडल खेलों की सफल मेजबानी की थी। इस बार खेलों का संचालन 4 प्रमुख वेन्यू क्लस्टर्स (Scotstoun Stadium, Tollcross International Swimming Centre, Emirates Arena, तथा Scottish Event Campus) में हो रहा है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "The 23rd Commonwealth Games 2026 in Glasgow features 3,000+ athletes from 74 nations across 4 venue clusters." }],
          },
        ],
      },

      /* ── 2. Included 10 Sports Disciplines ────────────────────── */
      {
        _key: "sec-included-sports",
        kind: "keyHighlights",
        title: "ग्लासगो 2026 में शामिल 10 खेलों की पूरी सूची (Detailed Sports List)",
        titleEn: "Complete List of 10 Included Sports Disciplines",
        body: [
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{ _key: "sh2-1", _type: "span", text: "1. शामिल खेलों का विवरण एवं भारतीय भागीदारी" }],
          },
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• 🏋️ **भारोत्तोलन एवं पैरा पावरलिफ्टिंग (Weightlifting & Para Powerlifting)**: मीराबाई चानू, ऋषिकांत सिंह, मुथुपांडी राजा व झांडू कुमार।" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• 🥊 **मुक्केबाजी (Boxing)**: लवलीना बोरगोहैन (75kg), मोहम्मद हुसामुद्दीन, शिव थापा।" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• 🏃 **एथलेटिक्स एवं पैरा एथलेटिक्स (Athletics & Para Athletics)**: मुरली श्रीशंकर, तजिंदरपाल सिंह तूर, पारुल चौधरी, गुलवीर सिंह, अनिमेष कुजूर।" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• 🏊 **तैराकी एवं पैरा तैराकी (Aquatics - Swimming & Para Swimming)**: श्रीहरि नटराज, साजन प्रकाश।" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• 🤸 **आर्टिस्टिक जिम्नास्टिक (Artistic Gymnastics)**: प्रणति नायक एवं दीपेश लष्करी।" }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• 🥋 **जूडो (Judo)**: सुशीला देवी लिकमाबाम, विजय कुमार यादव।" }],
          },
          {
            _key: "b2-7", _type: "block", style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: "• 🎳 **लॉन बाउल्स (Lawn Bowls)**: लवली चौबे, नयनमोनी सैकिया, पिंकी, रूपा रानी तिर्की।" }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• 🚴 **ट्रैक साइकिलिंग एवं पैरा साइकिलिंग (Track Cycling)**: रोनाल्डो सिंह, एसो एल्बेन।" }],
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "• 🏀 **3×3 व्हीलचेयर बास्केटबॉल (3x3 Basketball & Wheelchair Basketball)**: पैरा बास्केटबॉल दल।" }],
          },
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "• 🏐 **नेटबॉल (Netball)**: महिला राष्ट्रीय टीम।" }],
          },
          ...(assetIndianAthletes ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetIndianAthletes._id },
            alt: "Indian track and field athletics athletes training for Commonwealth Games 2026 MPPSC UPSC Notes",
            caption: "राष्ट्रमंडल खेल 2026 में 100m, 200m, लम्बी कूद व भाला फेंक स्पर्धाओं में भाग लेते भारतीय एथलीट",
          }] : []),
        ],
        bodyEn: [
          {
            _key: "b2-11", _type: "block", style: "normal",
            children: [{ _key: "s2-11", _type: "span", text: "10 included sports: Weightlifting, Boxing, Athletics, Swimming, Gymnastics, Judo, Lawn Bowls, Track Cycling, 3x3 Basketball, and Netball." }],
          },
        ],
      },

      /* ── 3. Venues Table ─────────────────────────────────────── */
      {
        _key: "sec-venues-table",
        kind: "analysis",
        title: "ग्लासगो 2026: प्रमुख खेल परिसर एवं वेन्यू तालिका (Venue Details)",
        titleEn: "Venues & Venues Cluster Table",
        body: [
          {
            _type: "table",
            caption: "कॉमनवेल्थ गेम्स 2026 वेन्यू एवं आयोजित खेल (Venue Cluster Table)",
            headers: ["खेल परिसर (Venue)", "आयोजित खेल (Sports Events)"],
            rows: [
              ["**Scotstoun Stadium**", "एथलेटिक्स व पैरा एथलेटिक्स"],
              ["**Tollcross International Swimming Centre**", "तैराकी व पैरा तैराकी"],
              ["**Emirates Arena / Sir Chris Hoy Velodrome**", "ट्रैक साइकिलिंग, जिम्नास्टिक, मुक्केबाजी"],
              ["**Scottish Event Campus (SEC)**", "भारोत्तोलन, जूडो, 3x3 बास्केटबॉल, लॉन बाउल्स, नेटबॉल"]
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "4 venue clusters hosting the 10 sports in Glasgow." }],
          },
        ],
      },

      /* ── 4. MPPSC & UPSC Study Notes ─────────────────────────── */
      {
        _key: "sec-exam-notes",
        kind: "wayForward",
        title: "MPPSC & UPSC परीक्षा उपयोगी Facts Grid Notes",
        titleEn: "MPPSC & UPSC Exam Notes",
        body: [
          {
            _type: "facts",
            items: [
              { label: "2026 CWG संस्करण", value: "**23वां संस्करण** (ग्लासगो, स्कॉटलैंड)" },
              { label: "आयोजन तिथियाँ", value: "**23 जुलाई - 2 अगस्त 2026** (11 दिवसीय आयोजन)" },
              { label: "भारतीय दल क्षमता", value: "**122 एथलीट** (8 नियमित + 5 पैरा खेल)" },
              { label: "शामिल कुल खेल", value: "**10 खेल** (पैरा स्पर्धाओं के साथ एकीकृत)" },
              { label: "हटाए गए खेल", value: "[हटाए गए 9 खेलों की सूची एवं भारत पर प्रभाव ➔](/current-affairs/commonwealth-games-2026-dropped-sports-list-impact-india)" },
              { label: "भारत मेडल टैली", value: "[भारत की पूरी मेडल तालिका एवं पदक विजेता ➔](/current-affairs/commonwealth-games-2026-updates-india-medal-tally)" },
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "High-yield one-liner revision notes tailored for MPPSC & UPSC exams." }],
          },
        ],
      },
    ],

    /* ─── FAQS ────────────────────────────────────────────── */
    faqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 में कुल कितने खेल शामिल हैं?",
        questionEn: "How many sports are included in Commonwealth Games 2026?",
        answer: "ग्लासगो 2026 में कुल 10 खेल (भारोत्तोलन, मुक्केबाजी, एथलेटिक्स, तैराकी, जिम्नास्टिक, जूडो, लॉन बाउल्स, साइकिलिंग, बास्केटबॉल, नेटबॉल) शामिल हैं।",
        answerEn: "10 sports are featured in Glasgow CWG 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 का आयोजन कहाँ हो रहा है?",
        questionEn: "Where are the Commonwealth Games 2026 taking place?",
        answer: "23वें कॉमनवेल्थ गेम्स 2026 स्कॉटलैंड के ग्लासगो शहर में 23 जुलाई से 2 अगस्त 2026 तक आयोजित हो रहे हैं।",
        answerEn: "Glasgow, Scotland is hosting CWG 2026 from July 23 to August 2, 2026."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में भारत का कितने सदस्यीय दल हिस्सा ले रहा है?",
        questionEn: "How many athletes are representing India at CWG 2026?",
        answer: "भारत का 122 सदस्यीय दल 8 नियमित खेलों और 5 पैरा स्पर्धाओं में भाग ले रहा है।",
        answerEn: "An Indian contingent of 122 athletes is competing across events."
      }
    ],

    /* ─── MCQS ────────────────────────────────────────────── */
    mcqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 का आयोजन स्कॉटलैंड के किस शहर में हो रहा है?",
        questionEn: "Which city is hosting the Commonwealth Games 2026?",
        options: ["A. एडिनबर्ग", "B. ग्लासगो", "C. बर्मिंघम", "D. लंदन"],
        optionsEn: ["A. Edinburgh", "B. Glasgow", "C. Birmingham", "D. London"],
        correctIndex: 1,
        explanation: "23वें कॉमनवेल्थ गेम्स 2026 का आयोजन ग्लासगो, स्कॉटलैंड में हो रहा है।",
        explanationEn: "Glasgow is hosting CWG 2026."
      },
      {
        question: "ग्लासगो 2026 राष्ट्रमंडल खेलों में कुल कितने खेलों को शामिल किया गया है?",
        questionEn: "How many total sports disciplines are included in Glasgow 2026?",
        options: ["A. 10 खेल", "B. 19 खेल", "C. 25 खेल", "D. 30 खेल"],
        optionsEn: ["A. 10 sports", "B. 19 sports", "C. 25 sports", "D. 30 sports"],
        correctIndex: 0,
        explanation: "बजट कटौती के कारण ग्लासगो 2026 में केवल 10 खेलों को ही जगह मिली है।",
        explanationEn: "Only 10 sports are featured in Glasgow 2026."
      }
    ]
  };

  console.log(`📝 Syncing CWG 2026 Sports List article ID "${article._id}" to Sanity CMS with unique images...`);
  const res = await client.createOrReplace(article);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading Commonwealth Games 2026 Sports List article:", err);
  process.exit(1);
});
