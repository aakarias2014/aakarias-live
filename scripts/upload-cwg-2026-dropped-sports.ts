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
  console.log("🚀 Starting upload process for CWG 2026 Dropped Sports Article with unique images...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Unique Featured Thumbnail Banner
  const bannerPath = path.join(publicBlogDir, "cwg_2026_dropped_sports_banner.png");
  let assetFeaturedThumbnail;
  if (fs.existsSync(bannerPath)) {
    console.log("📸 Uploading Unique Dropped Sports Banner to Sanity...");
    assetFeaturedThumbnail = await client.assets.upload("image", fs.createReadStream(bannerPath), {
      filename: "cwg_2026_dropped_sports_banner.png",
    });
    console.log(`✔ Uploaded Dropped Sports Banner. Asset ID: ${assetFeaturedThumbnail._id}`);
  }

  // 2. In-body Image 1: Badminton & Wrestling
  const badmintonWrestlingPath = path.join(publicBlogDir, "cwg_dropped_badminton_wrestling.png");
  let assetBadmintonWrestling;
  if (fs.existsSync(badmintonWrestlingPath)) {
    console.log("📸 Uploading Badminton & Wrestling Image to Sanity...");
    assetBadmintonWrestling = await client.assets.upload("image", fs.createReadStream(badmintonWrestlingPath), {
      filename: "cwg_dropped_badminton_wrestling.png",
    });
    console.log(`✔ Uploaded Badminton & Wrestling Image. Asset ID: ${assetBadmintonWrestling._id}`);
  }

  // 3. In-body Image 2: Hockey & Shooting
  const hockeyShootingPath = path.join(publicBlogDir, "cwg_dropped_hockey_shooting.png");
  let assetHockeyShooting;
  if (fs.existsSync(hockeyShootingPath)) {
    console.log("📸 Uploading Hockey & Shooting Image to Sanity...");
    assetHockeyShooting = await client.assets.upload("image", fs.createReadStream(hockeyShootingPath), {
      filename: "cwg_dropped_hockey_shooting.png",
    });
    console.log(`✔ Uploaded Hockey & Shooting Image. Asset ID: ${assetHockeyShooting._id}`);
  }

  const article = {
    _id: "ca-cwg-2026-dropped-sports",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "commonwealth-games-2026-dropped-sports-list-impact-india" },
    title: "कॉमनवेल्थ गेम्स 2026 से हटाए गए 9 प्रमुख खेल: बैडमिंटन, कुश्ती, हॉकी क्यों हुए बाहर व भारत पर प्रभाव | MPPSC & UPSC",
    titleEn: "Commonwealth Games 2026 Dropped Sports List: Why Badminton, Wrestling, Hockey Removed & Impact on India | MPPSC & UPSC",
    excerpt: "कॉमनवेल्थ गेम्स 2026 (ग्लासगो): बाहर किए गए 9 प्रमुख खेल (Badminton, Wrestling, Hockey, Shooting, Table Tennis, Cricket, Rugby Sevens, Squash, Volleyball), हटने का कारण (बजट एवं इंफ्रास्ट्रक्चर), भारत की पदक तालिका पर प्रभाव एवं MPPSC व UPSC मुख्य परीक्षा उत्तर लेखन नोट्स।",
    excerptEn: "Detailed analysis on 9 sports dropped from Glasgow Commonwealth Games 2026 including Badminton, Wrestling, Hockey, Shooting, Table Tennis, Cricket, Squash. Reasons for reduction, impact on India's medal tally, and MPPSC & UPSC exam revision notes.",
    ca_date: "2026-07-27",
    publishedAt: new Date().toISOString(),
    featured: false,
    readingTime: 9,
    keywords: [
      "Commonwealth Games 2026 dropped sports list",
      "कॉमनवेल्थ गेम्स 2026 से हटाए गए खेल",
      "CWG 2026 removed sports badminton wrestling hockey",
      "Shooting wrestling badminton dropped CWG 2026",
      "CWG 2026 Glasgow scaled down budget",
      "Impact of CWG 2026 dropped sports on India medals",
      "Sports Current Affairs 2026",
      "MPPSC Sports Paper 1 Unit 5 Notes",
      "UPSC GS Paper 3 Sports Economy"
    ],
    category: { _type: "reference", _ref: "cat-sports" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-sports" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["Sports-GK", "MPPSC Paper-1 Unit-5", "MPPSC Paper-3", "Mains-GS"],
    ...(assetFeaturedThumbnail ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetFeaturedThumbnail._id },
        alt: "CWG 2026 Dropped Sports List Removal of Badminton Wrestling Hockey Impact on India MPPSC UPSC Notes",
      }
    } : {}),

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News & Overview ─────────────────────────────── */
      {
        _key: "sec-why-in-news",
        kind: "whyInNews",
        title: "कॉमनवेल्थ गेम्स 2026: 9 लोकप्रिय खेल बाहर क्यों किए गए?",
        titleEn: "CWG 2026 Dropped Sports Overview",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "23वें **कॉमनवेल्थ गेम्स 2026 (Commonwealth Games 2026)** का आयोजन 23 जुलाई से 2 अगस्त 2026 तक स्कॉटलैंड के **ग्लासगो** शहर में हो रहा है। हालाँकि, इस बार का संस्करण 1994 के बाद सबसे छोटा कॉमनवेल्थ गेम्स है। आयोजकों ने **बजट कटौती और मौजूदा बुनियादी ढांचे (Existing Infrastructure)** का हवाला देते हुए 9 प्रमुख खेलों को प्रतियोगिता से बाहर कर दिया है।" }],
          },
          ...(assetBadmintonWrestling ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetBadmintonWrestling._id },
            alt: "Badminton court and wrestling mat dropped sports from Commonwealth Games 2026 MPPSC UPSC Notes",
            caption: "कॉमनवेल्थ गेम्स 2026 से हटाए गए प्रमुख खेल: बैडमिंटन कोर्ट एवं कुश्ती मैट (ग्लासगो 2026 बजट कटौती)",
          }] : []),
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "विक्टोरिया (ऑस्ट्रेलिया) द्वारा मेजबानी से पीछे हटने के बाद ग्लासगो ने अल्प समय में इस प्रतियोगिता की जिम्मेदारी ली, जिसके कारण केवल 10 खेलों को ही जगह मिल सकी।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "Glasgow 2026 CWG scaled down its program to 10 sports to keep cost low, dropping 9 popular disciplines." }],
          },
        ],
      },

      /* ── 2. Complete List of 9 Dropped Sports ─────────────────── */
      {
        _key: "sec-list-dropped-sports",
        kind: "keyHighlights",
        title: "2026 खेलों से बाहर किए गए 9 खेलों की सूची (Complete List)",
        titleEn: "Complete List of 9 Dropped Sports",
        body: [
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{ _key: "sh2-1", _type: "span", text: "हटाए गए 9 खेलों का विवरण (Dropped Disciplines)" }],
          },
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• 🏸 **बैडमिंटन (Badminton)**: पीवी सिंधु, लक्ष्य सेन व सात्विक-चिराग की जोड़ी पदक से वंचित रहेगी।" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• 🤼 **कुश्ती (Wrestling)**: 2022 बर्मिंघम में भारत ने कुश्ती में 6 स्वर्ण सहित 12 पदक जीते थे।" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• 🏑 **हॉकी (Hockey)**: पुरुष व महिला दोनों राष्ट्रीय टीमों के मुकाबले बाहर।" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• 🎯 **निशानेबाजी (Shooting)**: भारत का सर्वकालिक सबसे सफल CWG खेल बाहर।" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• 🏓 **टेबल टेनिस (Table Tennis)**: अंचत शरथ कमल व मनिका बत्रा की स्पर्धाएँ शामिल नहीं।" }],
          },
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• 🏏 **क्रिकेट (T20 Cricket)**: महिला टी20 क्रिकेट स्पर्धा को बाहर किया गया।" }],
          },
          {
            _key: "b2-7", _type: "block", style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: "• 🏉 **रग्बी सेवन्स (Rugby Sevens)**: रग्बी स्पर्धाएँ हटाई गईं।" }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• 🏐 **बीच वॉलीबॉल (Beach Volleyball)**: तटीय खेल प्रतिस्पर्धा बाहर।" }],
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "• 📜 **स्क्वाश (Squash)**: अनाहत सिंह व सौरव घोषाल की पदक स्पर्धाएँ बाहर।" }],
          },
          ...(assetHockeyShooting ? [{
            _type: "image",
            asset: { _type: "reference", _ref: assetHockeyShooting._id },
            alt: "Turf hockey stick ball and shooting target dropped from Commonwealth Games 2026 MPPSC UPSC Notes",
            caption: "भारत के दो पारंपरिक पदक-विजेता खेल निशानेबाजी एवं हॉकी को 2026 कॉमनवेल्थ गेम्स से बाहर रखा गया है",
          }] : []),
        ],
        bodyEn: [
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "List of 9 dropped sports: Badminton, Wrestling, Hockey, Shooting, Table Tennis, Cricket, Rugby Sevens, Beach Volleyball, and Squash." }],
          },
        ],
      },

      /* ── 3. Impact on India's Medal Tally ────────────────────── */
      {
        _key: "sec-impact-india",
        kind: "analysis",
        title: "भारत की पदक तालिका पर प्रभाव (Analysis for MPPSC Mains)",
        titleEn: "Impact on India's Medal Tally Analysis",
        body: [
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{ _key: "sh3-1", _type: "span", text: "1. 2022 बर्मिंघम में भारत के पदकों का ऐतिहासिक आँकड़ा" }],
          },
          {
            _type: "table",
            caption: "2022 CWG में हटाए गए खेलों से भारत के पदक (Birmingham 2022 Medals)",
            headers: ["हटाया गया खेल (Dropped Sport)", "स्वर्ण (Gold)", "रजत (Silver)", "कांस्य (Bronze)", "कुल पदक (Total)"],
            rows: [
              ["**कुश्ती (Wrestling)**", "6", "1", "5", "**12**"],
              ["**टेबल टेनिस (Table Tennis)**", "4", "1", "2", "**7**"],
              ["**बैडमिंटन (Badminton)**", "3", "1", "2", "**6**"],
              ["**हॉकी (Hockey)**", "0", "1", "1", "**2**"],
              ["**क्रिकेट (Cricket)**", "0", "1", "0", "**1**"],
              ["**स्क्वाश (Squash)**", "0", "0", "2", "**2**"],
              ["**कुल संभावित पदक नुकसान**", "**13**", "**5**", "**12**", "**30 पदक**"]
            ]
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "• **30 पदकों का सीधा नुकसान**: बर्मिंघम 2022 में भारत ने कुल 61 पदक (22 स्वर्ण) जीते थे, जिनमें से 30 पदक इन्हीं हटाए गए खेलों से आए थे। अतः भारत की ओवरऑल पदक तालिका में 40-50% तक की कमी आ सकती है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{ _key: "s3-3", _type: "span", text: "India faces a potential loss of ~30 medals out of its 61 tally from 2022 due to the removal of these 9 sports." }],
          },
        ],
      },

      /* ── 4. MPPSC & UPSC Exam Notes (Facts Grid) ────────────── */
      {
        _key: "sec-exam-notes",
        kind: "wayForward",
        title: "MPPSC & UPSC परीक्षा उत्तर लेखन हेतु विशेष तथ्य",
        titleEn: "MPPSC & UPSC Exam Notes",
        body: [
          {
            _type: "facts",
            items: [
              { label: "मेजबान व तिथियाँ", value: "**ग्लासगो, स्कॉटलैंड** (23 जुलाई - 2 अगस्त 2026)" },
              { label: "कुल शामिल खेल", value: "**10 खेल** (1994 के बाद सबसे छोटा आयोजन)" },
              { label: "हटाए गए खेल संख्या", value: "**9 खेल** (बजट एवं इंफ्रास्ट्रक्चर सीमाओं के कारण)" },
              { label: "भारत पर प्रभाव", value: "**~30 पदकों का सीधा नुकसान** (बर्मिंघम 2022 तुलना में)" },
              { label: "CWG 2026 हब पढ़ें", value: "[कॉमनवेल्थ गेम्स 2026 मेडल टैली व समाचार ➔](/current-affairs/commonwealth-games-2026-updates-india-medal-tally)" },
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "High-yield revision points tailored for MPPSC & UPSC exams." }],
          },
        ],
      },
    ],

    /* ─── FAQS ────────────────────────────────────────────── */
    faqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 से किन-किन खेलों को बाहर (Dropped Sports) किया गया है?",
        questionEn: "Which sports have been dropped from Commonwealth Games 2026?",
        answer: "ग्लासगो 2026 से **9 प्रमुख खेलों: बैडमिंटन, कुश्ती, हॉकी, निशानेबाजी, टेबल टेनिस, क्रिकेट (T20), रग्बी सेवन्स, बीच वॉलीबॉल तथा स्क्वाश** को बाहर कर दिया गया है।",
        answerEn: "9 sports including Badminton, Wrestling, Hockey, Shooting, Table Tennis, Cricket, Rugby, Beach Volleyball, and Squash were dropped."
      },
      {
        question: "ग्लासगो 2026 में खेलों की संख्या क्यों घटाई गई है?",
        questionEn: "Why were sports reduced in Glasgow 2026?",
        answer: "ऑस्ट्रेलिया के विक्टोरिया राज्य द्वारा मेजबानी वापस लेने के बाद ग्लासगो ने कम बजट, सीमित समय और मौजूदा स्टेडियमों के अधिकतम उपयोग के लिए खेलों की संख्या घटाकर 10 कर दी।",
        answerEn: "Glasgow scaled down the games to 10 sports due to budget constraints and existing venue availability."
      },
      {
        question: "खेल हटने से भारत की पदक तालिका पर क्या प्रभाव पड़ेगा?",
        questionEn: "How does the removal of these sports impact India's medal tally?",
        answer: "2022 बर्मिंघम खेलों में भारत के 61 पदकों में से 30 पदक (13 स्वर्ण) इन्हीं हटाए गए खेलों से थे, अतः भारत के कुल पदकों की संख्या में भारी गिरावट आने की संभावना है।",
        answerEn: "India lost 30 medals (13 Gold) won in 2022 from these dropped sports."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में अब कुल कितने खेल शामिल हैं?",
        questionEn: "How many sports are included in Commonwealth Games 2026?",
        answer: "ग्लासगो 2026 में केवल 10 प्रमुख खेल (एथलेटिक्स, वेटलिफ्टिंग, मुक्केबाजी, तैराकी, जूडो, जिम्नास्टिक आदि) शामिल हैं।",
        answerEn: "Only 10 sports are featured in Glasgow 2026."
      }
    ],

    /* ─── MCQS ────────────────────────────────────────────── */
    mcqs: [
      {
        question: "कॉमनवेल्थ गेम्स 2026 में निम्नलिखित में से कौन-सा खेल शामिल नहीं (Dropped) है?",
        questionEn: "Which of the following sports is NOT included in Commonwealth Games 2026?",
        options: ["A. बैडमिंटन एवं कुश्ती", "B. मुक्केबाजी", "C. भारोत्तोलन (Weightlifting)", "D. एथलेटिक्स"],
        optionsEn: ["A. Badminton and Wrestling", "B. Boxing", "C. Weightlifting", "D. Athletics"],
        correctIndex: 0,
        explanation: "बैडमिंटन, कुश्ती, हॉकी एवं निशानेबाजी को ग्लासगो 2026 खेलों से बाहर कर दिया गया है।",
        explanationEn: "Badminton, Wrestling, Hockey and Shooting were dropped from CWG 2026."
      },
      {
        question: "बर्मिंघम 2022 में हटाए गए खेलों से भारत ने कुल कितने पदक जीते थे?",
        questionEn: "How many total medals did India win from the dropped sports in Birmingham 2022?",
        options: ["A. 10 पदक", "B. 20 पदक", "C. 30 पदक", "D. 50 पदक"],
        optionsEn: ["A. 10 medals", "B. 20 medals", "C. 30 medals", "D. 30 medals"],
        correctIndex: 2,
        explanation: "भारत ने बर्मिंघम 2022 में हटाए गए 9 खेलों से 13 स्वर्ण सहित कुल 30 पदक जीते थे।",
        explanationEn: "India secured 30 medals (13 Gold) from these dropped sports in 2022."
      }
    ]
  };

  console.log(`📝 Syncing CWG 2026 Dropped Sports article ID "${article._id}" to Sanity CMS with unique images...`);
  const res = await client.createOrReplace(article);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading Commonwealth Games 2026 Dropped Sports article:", err);
  process.exit(1);
});
