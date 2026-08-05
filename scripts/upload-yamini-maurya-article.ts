import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pnc4agic",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production321",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: "2024-01-01",
});

async function main() {
  console.log("🚀 Uploading Yamini Maurya CWG 2026 Silver Medal Article to Sanity CMS...");

  // 1. Image 1: Silver Medal Celebration
  const img1Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3878d1d-a66f-4a6d-84dd-b181a33cf548/yamini_maurya_cwg_2026_silver_judo_1785845607355.png";
  const pubImg1Dest = path.join(process.cwd(), "public", "images", "blog", "yamini_maurya_cwg_2026_silver_judo.png");
  fs.mkdirSync(path.dirname(pubImg1Dest), { recursive: true });
  fs.copyFileSync(img1Path, pubImg1Dest);

  console.log("⬆ Uploading main image asset to Sanity...");
  const asset1 = await client.assets.upload("image", fs.createReadStream(img1Path), {
    filename: "yamini_maurya_cwg_2026_silver_judo.png",
  });

  // 2. Image 2: Judo Bout Action
  const img2Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3878d1d-a66f-4a6d-84dd-b181a33cf548/yamini_maurya_judo_bout_action_1785845624211.png";
  const pubImg2Dest = path.join(process.cwd(), "public", "images", "blog", "yamini_maurya_judo_bout_action.png");
  fs.copyFileSync(img2Path, pubImg2Dest);

  console.log("⬆ Uploading action image asset to Sanity...");
  const asset2 = await client.assets.upload("image", fs.createReadStream(img2Path), {
    filename: "yamini_maurya_judo_bout_action.png",
  });

  // Category & Tag references
  const categories = await client.fetch(`*[_type == "category" && slug.current in ["sports", "current-affairs", "mppsc"]]`);
  const sportsCat = categories.find((c: any) => c.slug.current === "sports") || categories[0];

  const tags = await client.fetch(`*[_type == "tag" && slug.current in ["tag-mppsc", "tag-upsc", "sports", "judo", "cwg-2026", "madhya-pradesh-gk"]]`);
  const tagRefs = tags.map((t: any) => ({ _type: "reference", _ref: t._id, _key: t._id }));

  const articleId = "ca-yamini-maurya-biography-cwg-2026-silver-medal-judo";
  const slugStr = "yamini-maurya-biography-cwg-2026-silver-medal-judo";

  const doc = {
    _id: articleId,
    _type: "currentAffairs",
    slug: { _type: "slug", current: slugStr },
    title: "यामिनी मौर्य (Yamini Maurya): सागर से CWG 2026 जूडो सिल्वर मेडल, पैर टूटने के बाद की वापसी, परिवार, रिकॉर्ड्स व नोट्स | MPPSC & UPSC",
    titleEn: "Yamini Maurya (Judo): Biography, CWG 2026 Silver Medal in 57kg, Comeback after Injury, Achievements & MPPSC / UPSC Notes",
    excerpt: "सागर (मध्य प्रदेश) की जूडो खिलाड़ी यामिनी मौर्य ने ग्लासगो राष्ट्रमंडल खेल 2026 (CWG 2026) में महिला 57kg वर्ग में रजत पदक जीतकर इतिहास रचा। 2017 में पैर टूटने के बाद अभूतपूर्व वापसी, 2022 राष्ट्रीय खेल स्वर्ण, 2025 हांगकांग एशियन ओपन स्वर्ण व MPPSC परीक्षा उपयोगी नोट्स।",
    excerptEn: "Yamini Maurya from Sagar district, Madhya Pradesh won the Silver Medal in Women's 57kg Judo at Glasgow Commonwealth Games 2026. Complete biography, comeback story after leg fracture in 2017, Asian Open Gold, national titles, and MPPSC/UPSC exam notes.",
    publishedAt: "2026-08-04T12:00:00.000Z",
    ca_date: "2026-08-04",
    readingTime: 12,
    category: sportsCat ? { _type: "reference", _ref: sportsCat._id } : undefined,
    tags: tagRefs,
    mainImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset1._id },
      alt: "यामिनी मौर्य कॉमनवेल्थ गेम्स 2026 में जूडो 57kg वर्ग में सिल्वर मेडल जीत का जश्न मनाते हुए (Yamini Maurya Silver Medal CWG 2026)",
      caption: "यामिनी मौर्य (Yamini Maurya): ग्लासगो राष्ट्रमंडल खेल 2026 (CWG 2026) में भारत के लिए 20वाँ पदक (सिल्वर मेडल) विजेता",
    },
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset1._id },
      alt: "यामिनी मौर्य कॉमनवेल्थ गेम्स 2026 सिल्वर मेडल (Yamini Maurya CWG 2026 Silver Medal Judo)",
      caption: "मध्य प्रदेश के सागर जिले की जूडो स्टार यामिनी मौर्य (Yamini Maurya)",
    },
    body: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "परिचय एवं ग्लासगो कॉमनवेल्थ गेम्स 2026 की ऐतिहासिक उपलब्धि" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "मध्य प्रदेश के **सागर जिले** की प्रतिभावान जूडो खिलाड़ी **यामिनी मौर्य (Yamini Maurya)** ने ग्लासगो **राष्ट्रमंडल खेल 2026 (CWG 2026)** में शानदार प्रदर्शन करते हुए **महिला 57 किलोग्राम वर्ग में रजत पदक (Silver Medal)** जीतकर देश और प्रदेश का नाम रोशन किया है। यामिनी ने अपने उत्कृष्ट खेल के दम पर फाइनल मुकाबले तक का सफर तय किया, जहाँ कड़ी टक्कर के बाद उन्हें इंग्लैंड की स्टार खिलाड़ी **असेल्या टोपराक (Acelya Toprak)** से हार का सामना करना पड़ा और उन्होंने रजत पदक अपने नाम किया।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "यामिनी मौर्य की इस उपलब्धि के साथ ही राष्ट्रमंडल खेल 2026 में भारत के कुल पदकों की संख्या **20** हो गई है, जिसमें **5 स्वर्ण (Gold)**, **11 रजत (Silver)** और **4 कांस्य पदक (Bronze)** शामिल हैं। जूडो खेल में भारत के लिए यह तीसरा पदक है, इससे पूर्व [हर्ष सिंह (Harsh Singh)](/current-affairs/harsh-singh-biography-cwg-2026-gold-medal-judo) तथा [अस्मिता डे (Asmita Dey)](/current-affairs/asmita-dey-biography-cwg-2026-gold-medal-judo) ने स्वर्ण पदक जीतकर भारत का डंका बजाया था।",
          },
        ],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: asset1._id },
        alt: "यामिनी मौर्य सिल्वर मेडल ग्लासगो 2026 (Yamini Maurya Silver Medal Glasgow 2026)",
        caption: "यामिनी मौर्य (Yamini Maurya) - ग्लासगो CWG 2026 में महिला 57kg जूडो स्पर्धा की रजत पदक विजेता",
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "प्रारंभिक जीवन, पारिवारिक पृष्ठभूमि व संघर्ष की कहानी" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "यामिनी मौर्य मध्य प्रदेश के **सागर जिले** के एक अत्यंत सामान्य किसान परिवार से ताल्लुक रखती हैं। उनके पिता **हरिओम मौर्य (Hariom Maurya)** पेशे से किसान हैं तथा माता गृहणी हैं। यामिनी अपने परिवार में तीन बहनों और एक भाई के बीच पली-बढ़ी हैं। उनके चाचा **श्रीनाथ मौर्य** के अनुसार, पारिवारिक स्थिति आर्थिक रूप से बहुत मजबूत न होने के कारण शुरुआत में परिजनों को लड़की को घर से दूर खेल परिसर भेजने में संकोच था, परंतु यामिनी की अटूट लगन को देखकर पूरे परिवार ने उनका पूर्ण सहयोग किया।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **स्थानिक पृष्ठभूमि:** सागर जिला (मध्य प्रदेश)।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **पिता का नाम:** श्री हरिओम मौर्य (कृषक)।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **चाचा का नाम:** श्री श्रीनाथ मौर्य।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **प्रारंभिक कोच:** दीपक रजक (दीपक सर)।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **प्रारंभिक मैदान:** पुराने सदर स्कूल का मैदान, सागर।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **परिवार संरचना:** 3 बहनें एवं 1 भाई।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "यामिनी के कोच **दीपक रजक (Deepak Rajak)** ने बताया कि उन्होंने पहली बार यामिनी को सागर के **पुराने सदर स्कूल के मैदान** में खेलते देखा था। उनकी गजब की चपलता और खेल प्रतिभा को पहचानकर उन्होंने परिजनों से मुलाकात की और उन्हें खेल परिसर की जूडो अकादमी में दाखिला दिलाने हेतु प्रेरित किया। पारिवारिक परंपराओं व आर्थिक बाधाओं के बावजूद कोच के समझाने पर परिजनों ने यामिनी को नियमित प्रशिक्षण की अनुमति दी।",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2017 का भीषण हादसा: पैर टूटने के बाद अभूतपूर्व वापसी (Comeback Story)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "यामिनी के खेल करियर में वर्ष **2017** सबसे कठिन दौर साबित हुआ, जब एक राष्ट्रीय स्तर की प्रतियोगिता के दौरान उनका **पैर गंभीर रूप से टूट गया (Leg Fracture)**। इस भीषण चोट के कारण उन्हें लगभग **1 वर्ष तक मैट और खेल से पूरी तरह दूर** रहना पड़ा। कई लोगों को लगा कि शायद उनका खेल करियर समाप्त हो गया है, लेकिन यामिनी ने अपनी अदम्य इच्छाशक्ति और लगन के बल पर हार नहीं मानी।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "चिकित्सकीय उपचार और फिजियोथेरेपी के बाद स्वस्थ होते ही उन्होंने पुनः अभ्यास शुरू किया और लगातार **4 वर्षों की कठोर तपस्या व कड़ी मेहनत** के दम पर न केवल राष्ट्रीय स्तर पर वापसी की, बल्कि अंतर्राष्ट्रीय पटल पर भारत का प्रतिनिधित्व करते हुए राष्ट्रमंडल खेलों का पदक जीता।",
          },
        ],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: asset2._id },
        alt: "यामिनी मौर्य जूडो 57kg फाइनल बाउट (Yamini Maurya Judo 57kg Bout CWG 2026)",
        caption: "ग्लासगो 2026 में महिला 57kg जूडो स्पर्धा के दौरान यामिनी मौर्य का मुकाबला",
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "यामिनी मौर्य की प्रमुख राष्ट्रीय व अंतर्राष्ट्रीय उपलब्धियाँ (Career Achievements)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "यामिनी मौर्य वर्ष **2022** से लगातार अंतर्राष्ट्रीय मंचों पर भारतीय तिरंगे का गौरव बढ़ा रही हैं। उनकी प्रमुख उपलब्धियों की सूची निम्नलिखित है:",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **ग्लासगो राष्ट्रमंडल खेल 2026 (CWG 2026):** महिला 57kg वर्ग में **रजत पदक (Silver Medal)**।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **डकार अफ्रीका ओपन 2026 (Dakar Africa Open 2026):** महिला 57kg श्रेणी में **स्वर्ण पदक (Gold Medal)**।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **हांगकांग एशियन ओपन 2025 (Hong Kong Asian Open 2025):** अंतर्राष्ट्रीय स्तर पर **स्वर्ण पदक (Gold Medal)**।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **36वें राष्ट्रीय खेल 2022 (National Games 2022):** गुजरात में आयोजित राष्ट्रीय खेलों में **स्वर्ण पदक (Gold Medal)**।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **सीनियर राष्ट्रीय जूडो चैम्पियनशिप (Senior National Judo Championship):** **2 बार** लगातार सीनियर नेशनल चैंपियन का खिताब।" }],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "CWG 2026 में भारत की मेडल तालिका एवं जूडो का योगदान" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "यामिनी मौर्य के सिल्वर मेडल के साथ ही भारत ने [कॉमनवेल्थ गेम्स 2026 मेडल टैली](/current-affairs/commonwealth-games-2026-updates-india-medal-tally) में **20 पदकों (5 Gold, 11 Silver, 4 Bronze)** का आंकड़ा पार कर लिया है। विशेष रूप से जूडो में भारतीय एथलीटों ने 3 पदक जीतकर भारत के पदक तालिका में अभूतपूर्व वृद्धि की है।",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "MPPSC व UPSC परीक्षा के लिए अति-महत्वपूर्ण तथ्य (Exam Key Points)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **खिलाड़ी का नाम:** यामिनी मौर्य (Yamini Maurya)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **संबद्ध राज्य/जिला:** मध्य प्रदेश (सागर जिला)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **खेल अनुशासन:** जूडो (Judo)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **भार वर्ग:** महिला 57 किलोग्राम (-57kg Category)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **CWG 2026 पदक:** रजत पदक (Silver Medal)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **फाइनल प्रतिद्वंद्वी:** असेल्या टोपराक (इंग्लैंड)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **कोच का नाम:** दीपक रजक" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **एशियन ओपन स्वर्ण:** 2025 हांगकांग एशियन ओपन" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **अफ्रीका ओपन स्वर्ण:** 2026 डकार अफ्रीका ओपन" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **नेशनल गेम्स स्वर्ण:** 2022 राष्ट्रीय खेल (गुजरात)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **MPPSC परीक्षा हेतु महत्व:** मध्य प्रदेश खेल परिदृश्य (MP Paper 1/GS3) तथा खेल पुरस्कार एवं व्यक्ति विशेष प्रश्नोत्तर।" }],
      },
    ],
    faqs: [
      {
        question: "यामिनी मौर्य ने राष्ट्रमंडल खेल 2026 (CWG 2026) में कौन सा पदक जीता है?",
        questionEn: "Which medal did Yamini Maurya win at the Commonwealth Games 2026?",
        answer: "यामिनी मौर्य ने ग्लासगो राष्ट्रमंडल खेल 2026 में महिला 57 किलोग्राम जूडो स्पर्धा में रजत पदक (Silver Medal) जीता है।",
        answerEn: "Yamini Maurya won the Silver Medal in the Women's 57kg Judo event at the Glasgow Commonwealth Games 2026.",
      },
      {
        question: "यामिनी मौर्य मध्य प्रदेश के किस जिले की निवासी हैं?",
        questionEn: "Which district of Madhya Pradesh does Yamini Maurya belong to?",
        answer: "यामिनी मौर्य मध्य प्रदेश के सागर जिले की निवासी हैं।",
        answerEn: "Yamini Maurya hails from Sagar district in Madhya Pradesh.",
      },
      {
        question: "CWG 2026 जूडो के फाइनल मुकाबले में यामिनी मौर्य का सामना किससे हुआ?",
        questionEn: "Who was Yamini Maurya's opponent in the CWG 2026 Judo final bout?",
        answer: "फाइनल मुकाबले में यामिनी मौर्य का सामना इंग्लैंड की स्टार जूडो खिलाड़ी असेल्या टोपराक (Acelya Toprak) से हुआ।",
        answerEn: "In the final bout, Yamini Maurya faced star Judo athlete Acelya Toprak from England.",
      },
      {
        question: "यामिनी मौर्य ने 2025 और 2026 में कौन सी प्रमुख अंतर्राष्ट्रीय प्रतियोगिताएँ जीती हैं?",
        questionEn: "Which major international events did Yamini Maurya win in 2025 and 2026?",
        answer: "यामिनी मौर्य ने 2025 हांगकांग एशियन ओपन में स्वर्ण पदक तथा 2026 डकार (सेनेगल) अफ्रीका ओपन में स्वर्ण पदक जीता है।",
        answerEn: "Yamini Maurya won Gold Medals at the 2025 Hong Kong Asian Open and the 2026 Dakar (Senegal) Africa Open.",
      },
      {
        question: "यामिनी मौर्य के शुरुआती कोच कौन हैं जिन्होंने सागर के सदर स्कूल मैदान में उनकी प्रतिभा पहचानी?",
        questionEn: "Who is Yamini Maurya's early coach who identified her talent at Sadar School ground in Sagar?",
        answer: "यामिनी मौर्य के शुरुआती कोच दीपक रजक (Deepak Rajak) हैं।",
        answerEn: "Yamini Maurya's early coach is Deepak Rajak.",
      },
    ],
    mcqs: [
      {
        question: "ग्लासगो राष्ट्रमंडल खेल 2026 (CWG 2026) में मध्य प्रदेश की यामिनी मौर्य ने जूडो के किस भार वर्ग में रजत पदक जीता?",
        questionEn: "In which weight category of Judo did Yamini Maurya of Madhya Pradesh win the Silver Medal at the Glasgow Commonwealth Games 2026?",
        options: ["महिला 48 किलोग्राम", "महिला 52 किलोग्राम", "महिला 57 किलोग्राम", "महिला 63 किलोग्राम"],
        optionsEn: ["Women's 48 kg", "Women's 52 kg", "Women's 57 kg", "Women's 63 kg"],
        correctIndex: 2,
        explanation: "सागर (मध्य प्रदेश) की जूडो एथलीट यामिनी मौर्य ने राष्ट्रमंडल खेल 2026 में महिला 57 किलोग्राम (-57kg) वर्ग में रजत पदक (Silver Medal) प्राप्त किया।",
        explanationEn: "Judo athlete Yamini Maurya from Sagar (MP) won the Silver Medal in the Women's 57kg category at CWG 2026.",
      },
      {
        question: "CWG 2026 जूडो महिला 57kg के स्वर्ण पदक मुकाबले में यामिनी मौर्य को किस देश की खिलाड़ी से पराजय मिली?",
        questionEn: "In the Gold Medal bout of Women's 57kg Judo at CWG 2026, Yamini Maurya was defeated by an athlete from which country?",
        options: ["स्कॉटलैंड", "इंग्लैंड (असेल्या टोपराक)", "ऑस्ट्रेलिया", "कनाडा"],
        optionsEn: ["Scotland", "England (Acelya Toprak)", "Australia", "Canada"],
        correctIndex: 1,
        explanation: "फाइनल मैच में इंग्लैंड की असेल्या टोपराक (Acelya Toprak) ने स्वर्ण पदक जीता तथा यामिनी मौर्य ने रजत पदक प्राप्त किया।",
        explanationEn: "In the final match, Acelya Toprak of England won the Gold Medal while Yamini Maurya claimed Silver.",
      },
      {
        question: "यामिनी मौर्य मध्य प्रदेश के किस जिले से संबंधित हैं?",
        questionEn: "Yamini Maurya belongs to which district of Madhya Pradesh?",
        options: ["इंदौर", "भोपाल", "सागर", "जबलपुर"],
        optionsEn: ["Indore", "Bhopal", "Sagar", "Jabalpur"],
        correctIndex: 2,
        explanation: "यामिनी मौर्य मध्य प्रदेश के सागर जिले की रहने वाली हैं और उनके पिता हरिओम मौर्य कृषक हैं।",
        explanationEn: "Yamini Maurya belongs to Sagar district in Madhya Pradesh and her father Hariom Maurya is a farmer.",
      },
      {
        question: "यामिनी मौर्य ने वर्ष 2025 में किस अंतर्राष्ट्रीय ओपन जूडो प्रतियोगिता में स्वर्ण पदक जीता था?",
        questionEn: "In which international Open Judo competition did Yamini Maurya win a Gold Medal in the year 2025?",
        options: ["पेरिस ओपन", "हांगकांग एशियन ओपन", "टोक्यो ओपन", "लंदन एशियन ओपन"],
        optionsEn: ["Paris Open", "Hong Kong Asian Open", "Tokyo Open", "London Asian Open"],
        correctIndex: 1,
        explanation: "यामिनी मौर्य ने 2025 हांगकांग एशियन ओपन तथा 2026 डकार अफ्रीका ओपन दोनों में स्वर्ण पदक अपने नाम किया है।",
        explanationEn: "Yamini Maurya won Gold Medals at both the 2025 Hong Kong Asian Open and 2026 Dakar Africa Open.",
      },
      {
        question: "वर्ष 2022 में गुजरात में आयोजित 36वें राष्ट्रीय खेलों में यामिनी मौर्य ने कौन सा पदक प्राप्त किया था?",
        questionEn: "Which medal did Yamini Maurya win at the 36th National Games held in Gujarat in 2022?",
        options: ["कांस्य पदक", "रजत पदक", "स्वर्ण पदक", "कोई नहीं"],
        optionsEn: ["Bronze Medal", "Silver Medal", "Gold Medal", "None"],
        correctIndex: 2,
        explanation: "यामिनी मौर्य ने 2022 के राष्ट्रीय खेलों में महिला जूडो स्पर्धा में स्वर्ण पदक (Gold Medal) जीता था।",
        explanationEn: "Yamini Maurya won the Gold Medal in women's Judo at the 2022 National Games in Gujarat.",
      },
      {
        question: "सागर में यामिनी मौर्य के प्रतिभा की पहचान सर्वप्रथम किस प्रारंभिक कोच ने सदर स्कूल मैदान में की थी?",
        questionEn: "Which early coach first identified Yamini Maurya's talent at the Sadar School ground in Sagar?",
        options: ["दीपक रजक", "महेश यादव", "सुरेश कुमार", "अजय शर्मा"],
        optionsEn: ["Deepak Rajak", "Mahesh Yadav", "Suresh Kumar", "Ajay Sharma"],
        correctIndex: 0,
        explanation: "यामिनी के शुरुआती कोच दीपक रजक ने उनकी क्षमता को पहचानकर उन्हें जूडो प्रशिक्षण हेतु प्रेरित किया।",
        explanationEn: "Her early coach Deepak Rajak recognized her talent and motivated her family for professional Judo training.",
      },
      {
        question: "यामिनी मौर्य किस वर्ष एक प्रतियोगिता के दौरान गंभीर चोट (पैर टूटने) के बाद 1 वर्ष तक खेल से दूर रहीं?",
        questionEn: "In which year was Yamini Maurya out of sports for nearly 1 year due to a severe leg fracture during a competition?",
        options: ["2015", "2017", "2019", "2021"],
        optionsEn: ["2015", "2017", "2019", "2021"],
        correctIndex: 1,
        explanation: "वर्ष 2017 में पैर टूटने के बावजूद यामिनी ने हार नहीं मानी और 4 वर्षों की कड़ी मेहनत से अंतर्राष्ट्रीय स्तर पर सफल वापसी की।",
        explanationEn: "In 2017, despite suffering a severe leg fracture, she persevered and made a successful comeback at the international level.",
      },
      {
        question: "ग्लासगो राष्ट्रमंडल खेल 2026 में यामिनी मौर्य के रजत पदक जीत के साथ भारत के कुल पदकों की संख्या कितनी हो गई?",
        questionEn: "With Yamini Maurya's Silver Medal win, what did India's total medal count reach at the Glasgow Commonwealth Games 2026?",
        options: ["15 पदक", "18 पदक", "20 पदक (5 स्वर्ण, 11 रजत, 4 कांस्य)", "25 पदक"],
        optionsEn: ["15 Medals", "18 Medals", "20 Medals (5 Gold, 11 Silver, 4 Bronze)", "25 Medals"],
        correctIndex: 2,
        explanation: "यामिनी मौर्य के सिल्वर मेडल के साथ ही CWG 2026 में भारत की पदक संख्या 20 (5 स्वर्ण, 11 रजत, 4 कांस्य) तक पहुँच गई।",
        explanationEn: "With Yamini Maurya's Silver Medal, India's medal tally reached 20 (5 Gold, 11 Silver, 4 Bronze) at CWG 2026.",
      },
    ],
  };

  await client.createOrReplace(doc);
  console.log(`✅ Successfully uploaded Yamini Maurya article to Sanity CMS: ${articleId}`);

  // 3. Update CWG 2026 Live Medal Tally article (ca-commonwealth-games-2026-updates-india-medal-tally) in Sanity
  console.log("🔄 Updating CWG 2026 Live Medal Tally article in Sanity with Medal #20 (Yamini Maurya)...");
  const cwgDoc = await client.fetch(`*[_id == "ca-commonwealth-games-2026-updates-india-medal-tally"][0]`);
  if (cwgDoc) {
    const updatedExcerpt = "कॉमनवेल्थ गेम्स 2026 (Glasgow CWG 2026) मेडल टैली अद्यतन: भारत ने 20 पदक (5 स्वर्ण, 11 रजत, 4 कांस्य) जीते। यामिनी मौर्य (सिल्वर - 57kg जूडो), हर्ष सिंह (गोल्ड), अस्मिता डे (गोल्ड), नीरज चोपड़ा, मुक्केबाजी, जूडो, एथलेटिक्स विजेताओं की पूरी सूची।";
    const updatedTitle = "कॉमनवेल्थ गेम्स 2026 मेडल टैली (CWG 2026 Live Medal Table): भारत के 20 पदक विजेता (5 स्वर्ण, 11 रजत, 4 कांस्य), जूडो, मुक्केबाजी, एथलेटिक्स व पूरी लिस्ट | MPPSC & UPSC";

    await client
      .patch("ca-commonwealth-games-2026-updates-india-medal-tally")
      .set({
        title: updatedTitle,
        excerpt: updatedExcerpt,
      })
      .commit();
    console.log("✅ Updated CWG 2026 Live Medal Tally article in Sanity!");
  }

  console.log("✨ Yamini Maurya article processing complete!");
}

main().catch((err) => {
  console.error("❌ Upload script failed:", err);
  process.exit(1);
});
