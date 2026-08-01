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
  console.log("🚀 Starting upload process for Ashmita Dey CWG 2026 Judo Gold Medal Biography Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");

  // 1. Flag Celebration Photo
  const flagPath = path.join(publicBlogDir, "asmita_dey_cwg_2026_gold_flag_celebration.png");
  let assetFlag;
  if (fs.existsSync(flagPath)) {
    console.log("📸 Uploading Flag Celebration Photo for Ashmita Dey to Sanity...");
    try {
      assetFlag = await client.assets.upload("image", fs.createReadStream(flagPath), {
        filename: "asmita_dey_cwg_2026_gold_flag_celebration.png",
      });
      console.log(`✔ Uploaded Flag Celebration Photo. Asset ID: ${assetFlag._id}`);
    } catch (e) {
      console.warn("⚠️ Image upload warning:", e);
    }
  }

  // 2. Gold Medal Close-Up Photo
  const closeUpPath = path.join(publicBlogDir, "asmita_dey_cwg_2026_gold_medal_close_up.jpg");
  let assetCloseUp;
  if (fs.existsSync(closeUpPath)) {
    console.log("📸 Uploading Gold Medal Close-Up Photo for Ashmita Dey to Sanity...");
    try {
      assetCloseUp = await client.assets.upload("image", fs.createReadStream(closeUpPath), {
        filename: "asmita_dey_cwg_2026_gold_medal_close_up.jpg",
      });
      console.log(`✔ Uploaded Close-Up Photo. Asset ID: ${assetCloseUp._id}`);
    } catch (e) {
      console.warn("⚠️ Image upload warning:", e);
    }
  }

  // 3. Gold Medal Heart Pose Photo
  const heartPosePath = path.join(publicBlogDir, "asmita_dey_cwg_2026_gold_heart_pose.jpg");
  let assetHeartPose;
  if (fs.existsSync(heartPosePath)) {
    console.log("📸 Uploading Heart Pose Photo for Ashmita Dey to Sanity...");
    try {
      assetHeartPose = await client.assets.upload("image", fs.createReadStream(heartPosePath), {
        filename: "asmita_dey_cwg_2026_gold_heart_pose.jpg",
      });
      console.log(`✔ Uploaded Heart Pose Photo. Asset ID: ${assetHeartPose._id}`);
    } catch (e) {
      console.warn("⚠️ Image upload warning:", e);
    }
  }

  const article = {
    _id: "ca-asmita-dey-gold-cwg-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "asmita-dey-biography-cwg-2026-gold-medal-judo" },
    title: "अस्मिता डे (Ashmita Dey): कौन हैं जूडो गोल्ड मेडलिस्ट? जीवनी, पिता का सपना, UP पुलिस SI, CWG 2026 में भारत का पहला स्वर्ण व नोट्स | MPPSC & UPSC",
    titleEn: "Who is Ashmita Dey? Biography, Age, UP Police SI, Father's Dream, CWG 2026 Judo 1st Gold Medal & Notes | MPPSC & UPSC",
    excerpt: "कौन हैं अस्मिता डे (Ashmita Dey)? त्रिपुरा के बेलोनिया से निकलकर भोपाल SAI सेंटर में सोलंकी सर से ट्रेनिंग, दिवंगत पिता का सपना पूरा कर कॉमनवेल्थ गेम्स 2026 में महिलाओं के 48kg जूडो स्पर्धा में भारत का पहला ऐतिहासिक स्वर्ण पदक, UP पुलिस सब-इंस्पेक्टर पद, PM मोदी की बधाई व MPPSC/UPSC परीक्षा उपयोगी नोट्स।",
    excerptEn: "Who is Ashmita Dey (Ashmita Dey Judoka)? Inspiring biography of Tripura's athlete turned Judoka and UP Police Sub-Inspector who won India's FIRST EVER Gold Medal in Judo at the Commonwealth Games (Glasgow 2026 - Women's 48kg), fulfilling her late father's dream, PM Modi's praise, and MPPSC/UPSC study notes.",
    ca_date: "2026-08-01",
    publishedAt: "2026-08-01T08:30:00.000Z",
    featured: true,
    readingTime: 12,
    keywords: [
      "Asmita Dey",
      "Ashmita Dey",
      "अस्मिता डे",
      "अश्मिता डे",
      "Who is Asmita Dey",
      "कौन हैं अस्मिता डे",
      "ashmita dey judo",
      "ashmita dey age",
      "ashmita dey commonwealth",
      "ashmita dey wins gold",
      "ashmita dey judo biography",
      "ashmita dey state",
      "ashmita dey tripura",
      "ashmita dey gold",
      "ashmita dey gold medal",
      "ashmita dey commonwealth games",
      "asmita dey up police sub inspector",
      "अस्मिता डे यूपी पुलिस दरोगा",
      "अस्मिता डे पिता का सपना",
      "PM Modi congratulates Asmita Dey",
      "asmita dey bhopal sai center",
      "yashpal solanki judo coach",
      "CWG 2026 judo gold medal india",
      "first indian judoka gold cwg",
      "asmita dey vs heidi quach golden score",
      "TOPS development group judo",
      "Glasgow 2026 judo results india",
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
    ...(assetFlag ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetFlag._id },
        alt: "अस्मिता डे (Ashmita Dey) तिरंगे के साथ कॉमनवेल्थ गेम्स 2026 जूडो स्वर्ण पदक जीत का जश्न मनाते हुए (Ashmita Dey Flag Celebration CWG 2026)",
        caption: "कॉमनवेल्थ गेम्स 2026 (ग्लासगो): महिला 48 किग्रा जूडो में भारत का पहला ऐतिहासिक स्वर्ण पदक जीतकर भारतीय तिरंगा लहरातीं अस्मिता डे (Ashmita Dey)",
      }
    } : {}),

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      {
        _key: "sec-asmita-overview",
        kind: "whyInNews",
        title: "चर्चा में क्यों? कौन हैं अस्मिता डे (Ashmita Dey)? CWG 2026 में रचा पहला स्वर्णिम इतिहास",
        titleEn: "Why in News? Who is Ashmita Dey? Historic First CWG Judo Gold Medalist",
        body: [
          ...(assetFlag ? [{
            _key: "b1-img-flag",
            _type: "image",
            asset: { _type: "reference", _ref: assetFlag._id },
            alt: "अस्मिता डे तिरंगे के साथ कॉमनवेल्थ गेम्स 2026 जूडो स्वर्ण पदक जीत का जश्न मनाते हुए (Ashmita Dey Flag Celebration CWG 2026)",
            caption: "कॉमनवेल्थ गेम्स 2026 (ग्लासगो): महिला 48 किग्रा जूडो में भारत का पहला ऐतिहासिक स्वर्ण पदक जीतकर भारतीय तिरंगा लहरातीं अस्मिता डे (Ashmita Dey)",
          }] : []),
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{
              _key: "s1-1",
              _type: "span",
              text: "स्कॉटलैंड के **ग्लासगो** में आयोजित **23वें कॉमनवेल्थ गेम्स 2026 (Glasgow CWG 2026)** में भारत की युवा जूडो खिलाड़ी **अस्मिता डे (Ashmita Dey / अस्मिता डे)** ने महिलाओं की 48 किलोग्राम भारवर्ग स्पर्धा में **स्वर्ण पदक (Gold Medal)** जीतकर इतिहास रच दिया है। अस्मिता की यह विजय अत्यंत गौरवशाली है क्योंकि राष्ट्रमंडल खेलों के 96 वर्षों के इतिहास में जूडो खेल में भारत का यह **पहला स्वर्ण पदक (First Ever Judo Gold Medal)** है।",
              textEn: "At the **23rd Commonwealth Games 2026 (Glasgow CWG 2026)** in Glasgow, Scotland, Indian judoka **Ashmita Dey (Asmita Dey)** scripted history by winning the **Gold Medal** in the Women's 48kg category. Asmita's triumph is extraordinary, marking India's **FIRST EVER Gold Medal in Judo** in the 96-year history of the Commonwealth Games."
            }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{
              _key: "s1-2",
              _type: "span",
              text: "अस्मिता डे ने फाइनल मुकाबले में कनाडा की शीर्ष खिलाड़ी **हेइडी क्वैच (Heidi Quach)** को अतिरिक्त समय ('गोल्डन स्कोर' / सडन डेथ) में पराजित कर यह स्वर्णिम उपलब्धि प्राप्त की। इस जीत से भारत की [**कॉमनवेल्थ गेम्स 2026 मेडल टैली**](/current-affairs/commonwealth-games-2026-updates-india-medal-tally) में स्वर्ण पदकों की संख्या बढ़कर 5 हो गई। इसी प्रतियोगिता में पुरुषों के 60किग्रा जूडो में **हर्ष सिंह** ने भी स्वर्ण पदक तथा महिलाओं के 57किग्रा में **यामिनी मौर्या** ने रजत पदक जीतकर भारतीय जूडो दल को अभूतपूर्व सफलता दिलाई।",
              textEn: "Ashmita Dey secured this golden milestone by defeating Canada's top seed **Heidi Quach** in the extra time ('Golden Score' / Sudden Death). This victory elevated India's gold count to 5 in the official [**CWG 2026 Medals Tally**](/en/current-affairs/commonwealth-games-2026-updates-india-medal-tally). In the same tournament, **Harsh Singh** won Gold in Men's 60kg Judo and **Yamini Mourya** secured Silver in Women's 57kg Judo."
            }],
          },
          {
            _key: "b1-h1", _type: "block", style: "h3",
            children: [{
              _key: "sh1-1",
              _type: "span",
              text: "अस्मिता डे: एक नज़र में (Ashmita Dey Quick Fact Sheet)",
              textEn: "Ashmita Dey: At a Glance (Quick Fact Sheet)"
            }],
          },
          {
            _type: "table",
            caption: "अस्मिता डे: प्रोफाइल व मुख्य विवरण (Ashmita Dey Profile)",
            captionEn: "Ashmita Dey Profile & Major Achievements",
            headers: ["विवरण (Parameter)", "जानकारी (Details)"],
            headersEn: ["Parameter", "Details"],
            rows: [
              ["**पूरा नाम (Full Name)**", "अस्मिता डे (Ashmita Dey / Asmita Dey)"],
              ["**मूल निवास (Hometown)**", "बेलोनिया, दक्षिण त्रिपुरा (Tripura)"],
              ["**वर्तमान पद (Current Role)**", "सब-इंस्पेक्टर (SI), उत्तर प्रदेश पुलिस (UP Police)"],
              ["**खेल (Sport Discipline)**", "जूडो (Judo - Women's 48kg Class)"],
              ["**ट्रेनिंग अकादमी (Training Academy)**", "साई (SAI) रीजनेबल सेंटर, भोपाल (मध्य प्रदेश)"],
              ["**मुख्य कोच (Head Coach)**", "यशपाल सोलंकी (Yashpal Solanki)"],
              ["**सरकारी योजना समर्थन (Govt Scheme)**", "TOPS (Target Olympic Podium Scheme) Development Group"],
              ["**CWG 2026 उपलब्धि (CWG 2026 Achievement)**", "**स्वर्ण पदक (Gold Medal)** - भारत का जूडो में पहला स्वर्ण!"]
            ],
            rowsEn: [
              ["**Full Name**", "Ashmita Dey (Asmita Dey)"],
              ["**Hometown**", "Belonia, South Tripura"],
              ["**Current Profession**", "Sub-Inspector (SI), Uttar Pradesh Police (UP Police)"],
              ["**Sport Discipline**", "Judo (Women's 48kg Category)"],
              ["**Training Academy**", "SAI Regional Centre, Bhopal (Madhya Pradesh)"],
              ["**Head Coach**", "Yashpal Solanki"],
              ["**Government Scheme**", "TOPS (Target Olympic Podium Scheme) Development Group"],
              ["**CWG 2026 Achievement**", "**Gold Medal** - India's 1st Ever CWG Judo Gold!"]
            ]
          }
        ],
      },

      {
        _key: "sec-father-dream-police",
        kind: "background",
        title: "दिवंगत पिता का सपना किया पूरा & UP पुलिस में दरोगा का पद (Personal Background & UP Police Role)",
        titleEn: "Fulfilling Late Father's Dream & Role as UP Police Sub-Inspector",
        body: [
          {
            _key: "b-f1", _type: "block", style: "normal",
            children: [{
              _key: "s-f1",
              _type: "span",
              text: "• **पोडियम पर छलके आँसू व पिता का सपना**: कॉमनवेल्थ गेम्स में स्वर्ण पदक गले में पहनते ही अस्मिता डे की आँखों में खुशी और भावुकता के आँसू छलक पड़े। अस्मिता ने अपना यह ऐतिहासिक स्वर्ण पदक अपने **दिवंगत पिता** को समर्पित किया। उनके पिता का सपना था कि अस्मिता एक दिन अंतरराष्ट्रीय खेल मंच पर भारत का नाम रोशन करे और तिरंगा लहराए।",
              textEn: "• **Tears of Emotion & Late Father's Dream**: As the Gold medal was placed around her neck on the podium, tears streamed down Ashmita Dey's eyes. She dedicated her historic victory to her **late father**, whose lifelong dream was to see his daughter bring glory to India on the global stage."
            }],
          },
          {
            _key: "b-f2", _type: "block", style: "normal",
            children: [{
              _key: "s-f2",
              _type: "span",
              text: "• **उत्तर प्रदेश पुलिस में सब-इंस्पेक्टर (UP Police SI)**: राष्ट्रीय व अंतरराष्ट्रीय जूडो स्पर्धाओं में उत्कृष्ट प्रदर्शन के चलते अस्मिता डे को **उत्तर प्रदेश पुलिस (UP Police)** में खेल कोटे के तहत सब-इंस्पेक्टर (दारोगा) पद पर नियुक्त किया गया था। अस्मिता ने अपनी सफलता पर कहा कि नौकरी से उन्हें आर्थिक स्थिरता मिली जिससे वे पूरी तरह जूडो पर ध्यान केंद्रित कर सकीं।",
              textEn: "• **Sub-Inspector in Uttar Pradesh Police**: Recognizing her exemplary achievements in Judo, Ashmita Dey was appointed as a **Sub-Inspector (SI) in UP Police** under the sports quota. Ashmita shared that employment provided her financial security to train relentlessly for the Commonwealth Games."
            }],
          },
          {
            _key: "b-f3", _type: "block", style: "normal",
            children: [{
              _key: "s-f3",
              _type: "span",
              text: "• **प्रधानमंत्री नरेंद्र मोदी व उपराष्ट्रपति की बधाई**: ऐतिहासिक स्वर्ण पदक जीतने पर भारत के **प्रधानमंत्री नरेंद्र मोदी** और **उपराष्ट्रपति** ने अस्मिता डे एवं हर्ष सिंह को बधाई दी तथा उनके अदम्य साहस व खेल कौशल की सराहना की।",
              textEn: "• **Congratulations from PM Narendra Modi & Vice President**: Prime Minister **Narendra Modi** and the Vice President congratulated Ashmita Dey and Harsh Singh for their historic gold-winning performances in Judo."
            }],
          }
        ],
      },

      {
        _key: "sec-cwg-matches-path",
        kind: "analysis",
        title: "कॉमनवेल्थ गेम्स 2026: अस्मिता डे का क्वार्टर-फाइनल से स्वर्ण पदक तक का स्वर्णिम सफर",
        titleEn: "CWG 2026 Journey: Quarter-Finals to Golden Score Gold Victory",
        body: [
          ...(assetCloseUp ? [{
            _key: "b2-img-close-up",
            _type: "image",
            asset: { _type: "reference", _ref: assetCloseUp._id },
            alt: "अस्मिता डे कॉमनवेल्थ गेम्स 2026 स्वर्ण पदक के साथ मुस्कराते हुए (Ashmita Dey Gold Medal Close Up)",
            caption: "ग्लासगो 2026: स्वर्णिम पदक के साथ अस्मिता डे - इप्पोन, युको और सडन डेथ में शानदार दबदबा दिखातीं भारतीय चैंपियन",
          }] : []),
          {
            _key: "b2-h1", _type: "block", style: "h3",
            children: [{
              _key: "sh2-1",
              _type: "span",
              text: "1. क्वार्टर-फाइनल: स्कॉटलैंड की ईवा इविंग पर इप्पोन (Ippon) से जीत",
              textEn: "1. Quarter-Final: Dominated Eva Ewing (Scotland) via Ippon"
            }],
          },
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{
              _key: "s2-1",
              _type: "span",
              text: "• **क्वार्टर फाइनल मैच**: अस्मिता डे ने अपने अभियान की शुरुआत मेजबान स्कॉटलैंड की **ईवा इविंग (Eva Ewing)** के खिलाफ की। मैच के शुरुआती मिनटों में ही अस्मिता ने आक्रामक जूडो तकनीक का प्रदर्शन करते हुए प्रतिद्वंद्वी को मैट पर गिराया और **'इप्पोन' (Ippon - जूडो में पूर्ण अंक/सीधी जीत)** हासिल कर सेमीफाइनल में प्रवेश किया।",
              textEn: "• **Quarter-Final Bout**: Asmita started her campaign against host Scotland's **Eva Ewing**. Demonstrating flawless technical aggression, she scored an **'Ippon' (knockout throw in Judo)** early in the bout to march into the semi-finals."
            }],
          },
          {
            _key: "b2-h2", _type: "block", style: "h3",
            children: [{
              _key: "sh2-2",
              _type: "span",
              text: "2. सेमीफाइनल: समर शॉ को युको (Yuko 1-0) से हराकर पदक पक्का किया",
              textEn: "2. Semi-Final: Defeated Summer Shaw (1-0 Yuko) to Secure Final Spot"
            }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{
              _key: "s2-2",
              _type: "span",
              text: "• **सेमीफाइनल मैच**: सेमीफाइनल में अस्मिता का सामना स्कॉटलैंड की ही सशक्त दावेदार **समर शॉ (Summer Shaw)** से हुआ। अस्मिता ने 4 मिनट के पूरे मैच में बेहतरीन डिफेंस और जवाबी आक्रमण बनाए रखा और **युको (1-0)** के अंतर से जीत दर्ज कर भारत के लिए पदक सुनिश्चित किया।",
              textEn: "• **Semi-Final Bout**: In the semi-finals, Asmita faced another Scottish contender **Summer Shaw**. Maintaining tactical defense and swift counter-attacks, she won by **1-0 Yuko** to guarantee a podium finish for India."
            }],
          },
          {
            _key: "b2-h3", _type: "block", style: "h3",
            children: [{
              _key: "sh2-3",
              _type: "span",
              text: "3. फाइनल मुकाबला: कनाडा की हेइडी क्वैच के खिलाफ 'गोल्डन स्कोर' सडन डेथ जीत",
              textEn: "3. Grand Final: Thrilling 'Golden Score' Victory Over Heidi Quach (Canada)"
            }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{
              _key: "s2-3",
              _type: "span",
              text: "• **गोल्डन स्कोर में ऐतिहासिक जीत**: फाइनल में कनाडा की विश्वस्तरीय जूडोका **हेइडी क्वैच (Heidi Quach)** के खिलाफ निर्धारित समय तक स्कोर 0-0 रहा। इसके बाद मुकाबला **'गोल्डन स्कोर' (Golden Score / Sudden Death)** में गया, जहाँ अस्मिता ने धैर्य बनाए रखते हुए निर्णायक क्षण में वज़ा-अरी दांव लगाकर जीत अपने नाम की और भारत को ऐतिहासिक गोल्ड मेडल दिलाया।",
              textEn: "• **Golden Score Triumph**: In the intense final against Canada's **Heidi Quach**, regular time ended at 0-0. The match stretched into **'Golden Score' (Sudden Death)**, where Asmita executed a decisive Waza-ari throw to claim India's historic Gold medal."
            }],
          }
        ],
      },

      {
        _key: "sec-life-bhopal-sai",
        kind: "background",
        title: "त्रिपुरा से भोपाल SAI सेंटर तक का प्रेरणादायक सफर (Early Life & Training)",
        titleEn: "From Tripura Athletics to Bhopal SAI: Inspiring Journey of Ashmita Dey",
        body: [
          ...(assetHeartPose ? [{
            _key: "b3-img-heart",
            _type: "image",
            asset: { _type: "reference", _ref: assetHeartPose._id },
            alt: "अस्मिता डे हाथ से हार्ट शेप बनाकर स्वर्ण पदक के साथ पोज़ देते हुए (Ashmita Dey Heart Pose CWG 2026)",
            caption: "त्रिपुरा के बेलोनिया से भोपाल SAI एकेडमी तक: कठिनाइयों को मात देकर विश्व मंच पर चमकतीं अस्मिता डे",
          }] : []),
          {
            _key: "b3-h1", _type: "block", style: "h3",
            children: [{
              _key: "sh3-1",
              _type: "span",
              text: "1. 800 मीटर रनिंग से जूडो तक का परिवर्तन (Track Athlete to Judoka)",
              textEn: "1. Transition from 800m Track Runner to Professional Judoka"
            }],
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{
              _key: "s3-1",
              _type: "span",
              text: "• **त्रिपुरा का गौरव**: अस्मिता डे उत्तर-पूर्वी राज्य त्रिपुरा के **बेलोनिया (Belonia)** शहर की रहने वाली हैं। प्रारंभिक वर्षों में वे एक एथलीट थीं और **800 मीटर मध्यम दूरी की दौड़** में भाग लिया करती थीं।",
              textEn: "• **Pride of Tripura**: Ashmita Dey hails from **Belonia** town in South Tripura. In her early childhood, she was a track athlete competing in **800m middle-distance running**."
            }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{
              _key: "s3-2",
              _type: "span",
              text: "• **जूडो की ओर मोड़**: एक जिला स्तरीय ट्रायल के दौरान जब उन्होंने अन्य खिलाड़ियों को जूडो के दांव-पेच आजमाते देखा, तब उनका रुझान इस मार्शल आर्ट खेल की तरफ बढ़ा और उन्होंने एथलेटिक्स छोड़कर जूडो को अपना मुख्य खेल चुना।",
              textEn: "• **Turning Point**: During a district trial, witnessing local judokas executing throws sparked her passion for martial arts, prompting her to switch completely from athletics to Judo."
            }],
          },
          {
            _key: "b3-h2", _type: "block", style: "h3",
            children: [{
              _key: "sh3-2",
              _type: "span",
              text: "2. भोपाल SAI सेंटर में कोचिंग एवं कोच यशपाल सोलंकी की भूमिका (MP Special Context)",
              textEn: "2. Training at SAI Regional Centre Bhopal under Coach Yashpal Solanki"
            }],
          },
          {
            _key: "b3-3", _type: "block", style: "normal",
            children: [{
              _key: "s3-3",
              _type: "span",
              text: "• **मध्य प्रदेश भोपाल कनेक्ट**: अस्मिता डे की खेल प्रतिभा को तराशने में मध्य प्रदेश के **भोपाल स्थित साई (SAI) रीजनल सेंटर** का केंद्रीय योगदान रहा है। वे कई वर्षों से भोपाल में रहकर ट्रेनिंग कर रही हैं।",
              textEn: "• **Madhya Pradesh Bhopal Connection**: The **Sports Authority of India (SAI) Regional Centre in Bhopal, Madhya Pradesh** played a central role in polishing Asmita's technique, where she has trained for several years."
            }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{
              _key: "s3-4",
              _type: "span",
              text: "• **कोच यशपाल सोलंकी का मार्गदर्शन**: प्रसिद्ध जूडो कोच **यशपाल सोलंकी (Yashpal Solanki)** की देखरेख में अस्मिता ने अपनी ग्रिपिंग, फुटवर्क और सडन डेथ रणनीति में महारत हासिल की।",
              textEn: "• **Guidance of Coach Yashpal Solanki**: Under renowned Judo coach **Yashpal Solanki**, Asmita mastered grip controls, counter-footwork, and Sudden Death strategies."
            }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{
              _key: "s3-5",
              _type: "span",
              text: "• **TOPS योजना का समर्थन**: भारत सरकार के खेल मंत्रालय द्वारा संचालित **टारगेट ओलंपिक पोडियम स्कीम (TOPS Development Group)** की सहायता से उन्हें विश्वस्तरीय ट्रेनिंग व इंटरनेशनल एक्सपोजर प्राप्त हुआ।",
              textEn: "• **Support from TOPS Scheme**: Inclusion in the Ministry of Youth Affairs & Sports' **Target Olympic Podium Scheme (TOPS) Development Group** provided her with international exposure and scientific training facilities."
            }],
          }
        ],
      },

      {
        _key: "sec-interlinking-cwg-champions",
        kind: "keyHighlights",
        title: "CWG 2026 भारत के स्वर्ण पदक विजेता (Interlinked Gold Champions)",
        titleEn: "CWG 2026 India's Gold Champions & Interlinked Profiles",
        body: [
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{
              _key: "s4-1",
              _type: "span",
              text: "ग्लासगो कॉमनवेल्थ गेम्स 2026 में भारत के स्वर्ण पदक विजेताओं की विस्तृत गाथा पढ़ने के लिए हमारे विशेष आलेखों पर जाएँ:",
              textEn: "Explore detailed biography profiles of India's CWG 2026 Gold Medal winners across different sports disciplines:"
            }],
          },
          {
            _key: "b4-chanu", _type: "block", style: "normal",
            children: [{
              _key: "s4-c",
              _type: "span",
              text: "• 🥇 [**मीराबाई चानू (Mirabai Chanu)**](/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting): भारोत्तोलन (वेटलिफ्टिंग 48kg) में लगातार तीसरा स्वर्ण पदक।",
              textEn: "• 🥇 [**Mirabai Chanu Biography**](/en/current-affairs/mirabai-chanu-biography-cwg-2026-gold-medal-weightlifting): Historic 3rd consecutive CWG Gold in Weightlifting 48kg."
            }],
          },
          {
            _key: "b4-sharmila", _type: "block", style: "normal",
            children: [{
              _key: "s4-s",
              _type: "span",
              text: "• 🥇 [**शर्मिला धनखड़ (Sharmila Dhankar)**](/current-affairs/sharmila-dhankar-biography-cwg-2026-gold-medal-para-athletics): महिला शॉट पुट F57 पैरा-एथलेटिक्स में स्वर्ण पदक।",
              textEn: "• 🥇 [**Sharmila Dhankar Biography**](/en/current-affairs/sharmila-dhankar-biography-cwg-2026-gold-medal-para-athletics): Gold medal in Women's Shot Put F57 Para Athletics."
            }],
          },
          {
            _key: "b4-gavit", _type: "block", style: "normal",
            children: [{
              _key: "s4-g",
              _type: "span",
              text: "• 🥇 [**दिलीप गावित (Dilip Gavit)**](/current-affairs/dilip-gavit-biography-cwg-2026-gold-medal-para-athletics): पुरुष 100m T47 स्प्रिंट में 10.71s रिकॉर्ड के साथ स्वर्ण पदक।",
              textEn: "• 🥇 [**Dilip Gavit Biography**](/en/current-affairs/dilip-gavit-biography-cwg-2026-gold-medal-para-athletics): Gold medal in Men's 100m T47 sprint with 10.71s Games Record."
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
        _key: "sec-revision-notes-asmita",
        kind: "wayForward",
        title: "MPPSC & UPSC परीक्षा हेतु अस्मिता डे Quick Revision Study Notes",
        titleEn: "MPPSC & UPSC Exam Notes: Ashmita Dey Quick Revision Grid",
        body: [
          {
            _type: "facts",
            items: [
              { label: "एथलीट का नाम", labelEn: "Athlete Name", value: "**अस्मिता डे (Ashmita Dey)**", valueEn: "**Ashmita Dey (Asmita Dey)**" },
              { label: "गृह राज्य व शहर", labelEn: "Hometown & State", value: "**बेलोनिया, त्रिपुरा** (Tripura)", valueEn: "**Belonia, South Tripura**" },
              { label: "वर्तमान पद", labelEn: "Current Profession", value: "**सब-इंस्पेक्टर (SI), UP पुलिस**", valueEn: "**Sub-Inspector (SI), UP Police**" },
              { label: "खेल व भारवर्ग", labelEn: "Sport & Category", value: "**जूडो (Judo - 48kg Women)**", valueEn: "**Judo (Women's 48kg Class)**" },
              { label: "ट्रेनिंग सेंटर", labelEn: "Training Academy", value: "**SAI रीजनेबल सेंटर, भोपाल (म.प्र.)**", valueEn: "**SAI Regional Centre, Bhopal (M.P.)**" },
              { label: "मुख्य कोच", labelEn: "Head Coach", value: "**यशपाल सोलंकी (Yashpal Solanki)**", valueEn: "**Yashpal Solanki**" },
              { label: "CWG 2026 उपलब्धि", labelEn: "CWG 2026 Title", value: "**स्वर्ण पदक** (जूडो में भारत का पहला गोल्ड)", valueEn: "**Gold Medal** (India's 1st Ever CWG Judo Gold)" },
            ]
          }
        ],
      }
    ],

    /* ─── FAQS ──────────────────────────────────────────────────── */
    faqs: [
      {
        question: "कौन हैं अस्मिता डे (Who is Ashmita Dey)?",
        questionEn: "Who is Ashmita Dey (Asmita Dey)?",
        answer: "अस्मिता डे (Ashmita Dey) त्रिपुरा के बेलोनिया की निवासी जूडो खिलाड़ी एवं उत्तर प्रदेश पुलिस में सब-इंस्पेक्टर (SI) हैं, जिन्होंने राष्ट्रमंडल खेल 2026 (ग्लासगो) में महिलाओं के 48kg वर्ग में भारत के लिए जूडो इतिहास का पहला स्वर्ण पदक जीता।",
        answerEn: "Ashmita Dey (Asmita Dey) is an Indian judoka from Belonia, Tripura and a Sub-Inspector in UP Police, who won India's FIRST EVER Gold Medal in Judo at the Commonwealth Games 2026 (Glasgow - Women's 48kg)."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 में अस्मिता डे ने किस खेल में स्वर्ण पदक जीता है?",
        questionEn: "In which sport did Ashmita Dey win the Gold medal at Commonwealth Games 2026?",
        answer: "अस्मिता डे ने स्कॉटलैंड के ग्लासगो में आयोजित कॉमनवेल्थ गेम्स 2026 में **महिलाओं की 48 किलोग्राम जूडो (Judo 48kg)** स्पर्धा में भारत के लिए ऐतिहासिक स्वर्ण पदक जीता।",
        answerEn: "Ashmita Dey won the historic Gold medal in the **Women's 48kg Judo** discipline at the Glasgow Commonwealth Games 2026."
      },
      {
        question: "अस्मिता डे किस विभाग में सरकारी पद पर कार्यरत हैं?",
        questionEn: "What is Ashmita Dey's current government profession?",
        answer: "अस्मिता डे उत्तर प्रदेश पुलिस (UP Police) में खेल कोटे के तहत **सब-इंस्पेक्टर (Sub-Inspector / दारोगा)** पद पर कार्यरत हैं।",
        answerEn: "Ashmita Dey serves as a **Sub-Inspector (SI) in Uttar Pradesh Police (UP Police)** under the sports quota."
      },
      {
        question: "कॉमनवेल्थ गेम्स के इतिहास में जूडो में स्वर्ण पदक जीतने वाली पहली भारतीय खिलाड़ी कौन हैं?",
        questionEn: "Who is the first Indian judoka to win a Gold medal in Commonwealth Games history?",
        answer: "अस्मिता डे (Ashmita Dey) राष्ट्रमंडल खेलों के 96 वर्षों के इतिहास में जूडो खेल में स्वर्ण पदक जीतने वाली **पहली भारतीय खिलाड़ी** बन गई हैं।",
        answerEn: "Ashmita Dey has become the **first ever Indian athlete** to win a Gold medal in Judo in Commonwealth Games history."
      },
      {
        question: "अस्मिता डे किस राज्य की रहने वाली हैं और उनका शुरुआती खेल कौन-सा था?",
        questionEn: "Which state does Ashmita Dey belong to and what was her initial sport?",
        answer: "अस्मिता डे उत्तर-पूर्व राज्य **त्रिपुरा के बेलोनिया** शहर की निवासी हैं। जूडो में आने से पहले वे एक एथलीट थीं और **800 मीटर दौड़** में हिस्सा लिया करती थीं।",
        answerEn: "Ashmita Dey hails from **Belonia town in Tripura**. Before switching to Judo, she was a track athlete competing in **800m running**."
      },
      {
        question: "अस्मिता डे किस स्पोर्ट्स अकादमी में और किस कोच की देखरेख में ट्रेनिंग लेती हैं?",
        questionEn: "Which sports academy and coach trained Ashmita Dey?",
        answer: "वे मध्य प्रदेश के **भोपाल स्थित साई (SAI) रीजनेबल सेंटर** में प्रसिद्ध कोच **यशपाल सोलंकी** की देखरेख में ट्रेनिंग प्राप्त करती हैं।",
        answerEn: "She trains at the **SAI Regional Centre in Bhopal (Madhya Pradesh)** under renowned head coach **Yashpal Solanki**."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 जूडो के फाइनल में अस्मिता डे ने किसे हराया?",
        questionEn: "Whom did Ashmita Dey defeat in the CWG 2026 Judo final?",
        answer: "फाइनल मुकाबले में अस्मिता डे ने कनाडा की **हेइडी क्वैच (Heidi Quach)** को 'गोल्डन स्कोर' (सडन डेथ) में पराजित करके स्वर्ण पदक हासिल किया।",
        answerEn: "In the final bout, Ashmita Dey defeated Canada's **Heidi Quach** in the 'Golden Score' (Sudden Death) extra time."
      },
      {
        question: "MPPSC प्रारंभिक परीक्षा हेतु अस्मिता डे से संबंधित कौन-से प्रश्न पूछे जा सकते हैं?",
        questionEn: "What type of questions can be asked about Ashmita Dey in MPPSC exams?",
        answer: "MPPSC Paper 1 GS Unit-5 में अस्मिता डे के खेल (जूडो), भारवर्ग (48kg), स्वर्ण पदक, मूल राज्य (त्रिपुरा), भोपाल SAI सेंटर ट्रेनिंग, UP पुलिस SI पद व कोच (यशपाल सोलंकी) पर आधारित 2-4 अंक के वस्तुनिष्ठ प्रश्न आ सकते हैं।",
        answerEn: "In MPPSC Prelims Paper 1 Unit-5, 2-4 mark questions can directly target her sport (Judo 48kg), Gold medal, state (Tripura), UP Police SI post, and Bhopal SAI training connection."
      }
    ],

    /* ─── MCQS ──────────────────────────────────────────────────── */
    mcqs: [
      {
        question: "कौन हैं अस्मिता डे (Ashmita Dey) जिन्होंने कॉमनवेल्थ गेम्स 2026 में इतिहास रचा?",
        questionEn: "Who is Ashmita Dey, who created history at Commonwealth Games 2026?",
        options: ["A. त्रिपुरा की जूडोका व UP पुलिस SI (जूडो 48kg गोल्ड)", "B. भारोत्तोलक", "C. पहलवान", "D. निशानेबाज"],
        optionsEn: ["A. Judoka from Tripura & UP Police SI (Judo 48kg Gold)", "B. Weightlifter", "C. Wrestler", "D. Shooter"],
        correctIndex: 0,
        explanation: "अस्मिता डे (Ashmita Dey) त्रिपुरा की निवासी जूडो खिलाड़ी एवं UP पुलिस में सब-इंस्पेक्टर हैं, जिन्होंने CWG 2026 में जूडो का पहला स्वर्ण पदक जीता।",
        explanationEn: "Ashmita Dey is a Judoka from Tripura and UP Police SI who won India's 1st CWG Judo Gold medal."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 (ग्लासगो) में महिलाओं की 48 किग्रा जूडो स्पर्धा में स्वर्ण पदक किस भारतीय खिलाड़ी ने जीता?",
        questionEn: "Which Indian athlete won the Gold medal in Women's 48kg Judo at Commonwealth Games 2026?",
        options: ["A. अस्मिता डे (Ashmita Dey)", "B. यामिनी मौर्या", "C. शुशीला देवी", "D. तूलिका मान"],
        optionsEn: ["A. Ashmita Dey", "B. Yamini Mourya", "C. Shushila Devi", "D. Tulika Maan"],
        correctIndex: 0,
        explanation: "अस्मिता डे ने महिला 48 किग्रा जूडो स्पर्धा में भारत के लिए ऐतिहासिक स्वर्ण पदक जीता।",
        explanationEn: "Ashmita Dey won the historic Gold medal for India in Women's 48kg Judo competition."
      },
      {
        question: "राष्ट्रमंडल खेलों (CWG) के इतिहास में जूडो खेल में स्वर्ण पदक जीतने वाली पहली भारतीय खिलाड़ी कौन हैं?",
        questionEn: "Who became the first ever Indian judoka to win a Gold medal in Commonwealth Games history?",
        options: ["A. अस्मिता डे (Ashmita Dey)", "B. अवतारी कौर", "C. बबीता कुमारी", "D. पूजा गहलोत"],
        optionsEn: ["A. Ashmita Dey", "B. Avtari Kaur", "C. Babita Kumari", "D. Pooja Gehlot"],
        correctIndex: 0,
        explanation: "अस्मिता डे राष्ट्रमंडल खेलों के इतिहास में जूडो में स्वर्ण पदक जीतने वाली पहली भारतीय खिलाड़ी बनी हैं।",
        explanationEn: "Ashmita Dey created history as the first Indian athlete to win a CWG Gold medal in Judo."
      },
      {
        question: "अस्मिता डे भारत के किस राज्य/केंद्रशासित प्रदेश की मूल निवासी हैं?",
        questionEn: "Which Indian state/UT is Ashmita Dey originally from?",
        options: ["A. त्रिपुरा (बेलोनिया)", "B. असम", "C. मणिपुर", "D. हरियाणा"],
        optionsEn: ["A. Tripura (Belonia)", "B. Assam", "C. Manipur", "D. Haryana"],
        correctIndex: 0,
        explanation: "अस्मिता डे उत्तर-पूर्व राज्य त्रिपुरा के बेलोनिया शहर की रहने वाली हैं।",
        explanationEn: "Ashmita Dey hails from Belonia town in the northeastern state of Tripura."
      },
      {
        question: "अस्मिता डे मध्य प्रदेश के किस शहर स्थित SAI (साई) रीजनेबल सेंटर में ट्रेनिंग प्राप्त करती हैं?",
        questionEn: "In which MP city is the SAI Regional Centre located where Ashmita Dey trains?",
        options: ["A. भोपाल", "B. इंदौर", "C. ग्वालियर", "D. जबलपुर"],
        optionsEn: ["A. Bhopal", "B. Indore", "C. Gwalior", "D. Jabalpur"],
        correctIndex: 0,
        explanation: "वे भोपाल स्थित साई (SAI) रीजनेबल सेंटर में कोच यशपाल सोलंकी से ट्रेनिंग लेती हैं।",
        explanationEn: "She trains at the SAI Regional Centre in Bhopal under head coach Yashpal Solanki."
      },
      {
        question: "कॉमनवेल्थ गेम्स 2026 जूडो के फाइनल मुकाबले में अस्मिता डे ने किस देश की खिलाड़ी को पराजित किया?",
        questionEn: "Which country's player did Ashmita Dey defeat in the CWG 2026 Judo final?",
        options: ["A. कनाडा (हेइडी क्वैच)", "B. स्कॉटलैंड", "C. ऑस्ट्रेलिया", "D. इंग्लैंड"],
        optionsEn: ["A. Canada (Heidi Quach)", "B. Scotland", "C. Australia", "D. England"],
        correctIndex: 0,
        explanation: "अस्मिता ने फाइनल में कनाडा की हेइडी क्वैच को 'गोल्डन स्कोर' (सडन डेथ) में पराजित किया।",
        explanationEn: "Asmita defeated Heidi Quach of Canada in the Golden Score (Sudden Death) extra time."
      },
      {
        question: "अस्मिता डे वर्तमान में किस राज्य की पुलिस सेवा में सब-इंस्पेक्टर (SI) पद पर कार्यरत हैं?",
        questionEn: "In which state's police force does Ashmita Dey serve as a Sub-Inspector (SI)?",
        options: ["A. उत्तर प्रदेश पुलिस (UP Police)", "B. मध्य प्रदेश पुलिस", "C. त्रिपुरा पुलिस", "D. दिल्ली पुलिस"],
        optionsEn: ["A. Uttar Pradesh Police (UP Police)", "B. Madhya Pradesh Police", "C. Tripura Police", "D. Delhi Police"],
        correctIndex: 0,
        explanation: "अस्मिता डे खेल कोटे के तहत उत्तर प्रदेश पुलिस में सब-इंस्पेक्टर पद पर तैनात हैं।",
        explanationEn: "Ashmita Dey serves as a Sub-Inspector in Uttar Pradesh Police under the sports quota."
      },
      {
        question: "अस्मिता डे के मुख्य कोच का नाम क्या है जिन्होंने उन्हें भोपाल SAI सेंटर में प्रशिक्षित किया?",
        questionEn: "What is the name of Ashmita Dey's head coach at SAI Bhopal?",
        options: ["A. यशपाल सोलंकी", "B. जसवंत सिंह", "C. गुरुचरण सिंह", "D. रामसिंह यादव"],
        optionsEn: ["A. Yashpal Solanki", "B. Jaswant Singh", "C. Gurcharan Singh", "D. Ram Singh Yadav"],
        correctIndex: 0,
        explanation: "अस्मिता डे भोपाल साई सेंटर में प्रख्यात कोच यशपाल सोलंकी की देखरेख में ट्रेनिंग करती हैं।",
        explanationEn: "Ashmita Dey trains under renowned head coach Yashpal Solanki at SAI Bhopal."
      }
    ]
  };

  console.log('📝 Uploading Ashmita Dey article ID "ca-asmita-dey-gold-cwg-2026" to Sanity CMS...');
  await client.createOrReplace(article);
  console.log('🎉 SUCCESS! Ashmita Dey Article uploaded & published in Sanity CMS. Document ID: ca-asmita-dey-gold-cwg-2026');
  console.log('URL slug: asmita-dey-biography-cwg-2026-gold-medal-judo');
}

main().catch((err) => {
  console.error("❌ Upload process failed:", err);
  process.exit(1);
});
