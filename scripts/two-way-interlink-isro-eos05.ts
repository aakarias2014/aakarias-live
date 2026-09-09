import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "v8f99338",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  console.log("🚀 Starting 2-Way Interlinking & SEO Optimization for ISRO EOS-05 Articles...");

  // Define URLs
  const launchSlug = "isro-gslv-f17-eos-05-satellite-launch-2026";
  const missionSlug = "isro-gslv-f17-eos-05-mission-2026";
  
  const launchUrlHi = `/current-affairs/${launchSlug}`;
  const launchUrlEn = `/en/current-affairs/${launchSlug}`;
  const missionUrlHi = `/current-affairs/${missionSlug}`;
  const missionUrlEn = `/en/current-affairs/${missionSlug}`;

  // Common Tags and Author
  const authorRef = { _type: "reference", _ref: "author-aakar" };
  const tagRefs = [
    { _type: "reference", _ref: "tag-mppsc" },
    { _type: "reference", _ref: "tag-upsc" },
    { _type: "reference", _ref: "tag-prelims" },
    { _type: "reference", _ref: "tag-mains" },
    { _type: "reference", _ref: "tag-scitech" },
  ];

  // 1. UPDATE DOCUMENT 1: isro-gslv-f17-eos-05-satellite-launch-2026
  console.log("📌 Updating Article 1: ISRO GSLV-F17 EOS-05 Satellite Launch...");
  
  const launchDocId = "currentAffairs-isro-gslv-f17-eos-05-satellite-launch-2026";
  
  const launchDocUpdate = {
    title: "ISRO GSLV-F17 EOS-05 सैटेलाइट लॉन्च | MPPSC & UPSC",
    titleEn: "ISRO GSLV-F17 EOS-05 Satellite Launch | MPPSC & UPSC",
    
    seoTitle: "ISRO GSLV-F17 EOS-05 सैटेलाइट लॉन्च | MPPSC & UPSC",
    seoTitleEn: "ISRO GSLV-F17 EOS-05 Satellite Launch | MPPSC & UPSC Notes",
    
    excerpt: "भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने GSLV-F17 रॉकेट द्वारा 'बाज' सैटेलाइट EOS-05 का श्रीहरिकोटा से सफल प्रक्षेपण किया। जानिए रक्षा महत्व, क्रायोजेनिक तकनीक व MPPSC & UPSC नोट्स।",
    excerptEn: "ISRO successfully launched the EOS-05 Earth Observation Satellite via GSLV-F17 from SDSC SHAR, Sriharikota. Read technical features, key facts & MPPSC/UPSC study notes.",
    
    seoDescription: "ISRO का GSLV-F17 EOS-05 सैटेलाइट प्रक्षेपण (Sriharikota)। 36,000 किमी जियोसिंक्रोनस कक्षा, 24x7 सीमा सुरक्षा, आपदा चेतावनी व MPPSC & UPSC परीक्षा उपयोगी संपूर्ण नोट्स।",
    seoDescriptionEn: "ISRO GSLV-F17 EOS-05 Earth Observation Satellite launch. 36,000 km GEO orbit, 24/7 border surveillance, disaster management, MCQs & study notes for MPPSC & UPSC.",

    author: authorRef,
    tags: tagRefs,
    syllabus: [
      "MPPSC Mains Paper 3 Unit 7 Science & Tech ISRO & Space Technology",
      "UPSC GS-3 Science & Tech Space Exploration, Indigenisation & National Security",
    ],

    keywords: [
      "ISRO GSLV F17 EOS 05 Satellite Launch",
      "EOS 05 Earth Observation Satellite ISRO",
      "GSLV F17 Sriharikota Launch",
      "ISRO Eye in the Sky EOS 05 Baaz Satellite",
      "CUS Cryogenic Upper Stage GSLV F17",
      "MPPSC Space Tech ISRO Notes",
      "UPSC GS3 Space Technology EOS 05",
      "Geosynchronous Transfer Orbit EOS 05",
    ],

    faqs: [
      {
        _key: "faq1",
        question: "ISRO द्वारा हाल ही में किस रॉकेट से EOS-05 सैटेलाइट को सफलतापूर्वक लॉन्च किया गया है?",
        answer: "इसरो ने सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR), श्रीहरिकोटा से GSLV-F17 (Geosynchronous Satellite Launch Vehicle) रॉकेट से ईओएस-05 (EOS-05) सैटेलाइट लॉन्च किया है।",
        questionEn: "Which rocket was used by ISRO to launch the EOS-05 satellite?",
        answerEn: "ISRO launched the EOS-05 satellite aboard the GSLV-F17 (Geosynchronous Satellite Launch Vehicle) rocket from SDSC SHAR, Sriharikota."
      },
      {
        _key: "faq2",
        question: "EOS-05 सैटेलाइट को किस प्रकार की कक्षा (Orbit) में स्थापित किया गया है?",
        answer: "इसे भू-तुल्यकालिक अंतरण कक्षा (Geosynchronous Transfer Orbit - GTO) से 36,000 किमी ऊंचाई पर स्थित जियोसिंक्रोनस कक्षा (GEO) में स्थापित किया गया है।",
        questionEn: "Into which orbit has the EOS-05 satellite been deployed?",
        answerEn: "It has been deployed into a Geosynchronous Transfer Orbit (GTO) to operate in a 36,000 km altitude Geosynchronous Orbit (GEO)."
      },
      {
        _key: "faq3",
        question: "EOS-05 (Earth Observation Satellite-05) का मुख्य उद्देश्य क्या है?",
        answer: "यह 24x7 वास्तविक समय सीमा सुरक्षा, तटीय निगरानी, चक्रवात व बाढ़ आपदा चेतावनी तथा कृषि प्रबंधन हेतु उच्च-गुणवत्ता इमेजरी प्रदान करेगा।",
        questionEn: "What is the primary operational objective of the EOS-05 satellite?",
        answerEn: "It provides 24/7 real-time border surveillance, coastal monitoring, cyclone/flood early warning, and agricultural monitoring."
      },
      {
        _key: "faq4",
        question: "GSLV-F17 रॉकेट के तीसरे चरण में किस स्वदेशी इंजन का उपयोग किया गया?",
        answer: "GSLV-F17 के तीसरे ऊपरी चरण में भारत के स्वदेशी क्रायोजेनिक अपर स्टेज (CUS - Cryogenic Upper Stage Engine) का उपयोग किया गया है।",
        questionEn: "Which indigenous engine powered the third stage of the GSLV-F17 rocket?",
        answerEn: "The third stage was powered by India's indigenously developed Cryogenic Upper Stage (CUS) engine."
      },
      {
        _key: "faq5",
        question: "EOS-05 सैटेलाइट को 'आकाश में बाज' (Eye in the Sky) क्यों कहा जा रहा है?",
        answer: "क्योंकि यह 36,000 किमी की ऊंचाई से स्थिर स्थिति में संपूर्ण भारतीय महाद्वीप और समुद्री सीमाओं पर निरंतर पैनी नजर रख सकता है।",
        questionEn: "Why is EOS-05 referred to as an 'Eye in the Sky'?",
        answerEn: "Because from a stationary orbit 36,000 km above Earth, it maintains continuous, uninterrupted watch over India's borders and oceans."
      },
      {
        _key: "faq6",
        question: "ISRO के उपग्रह प्रणालियों में LEO और GEO कक्षाओं में क्या अंतर होता है?",
        answer: "LEO (160-2,000 किमी) उपग्रह तेजी से चक्कर लगाते हैं जबकि GEO (36,000 किमी) उपग्रह पृथ्वी की घूर्णन गति के साथ स्थिर प्रतीत होते हैं।",
        questionEn: "What is the difference between LEO and GEO orbits in ISRO satellite missions?",
        answerEn: "LEO (160–2,000 km) satellites orbit rapidly around Earth, whereas GEO (36,000 km) satellites match Earth's rotation to remain stationary relative to Earth."
      },
      {
        _key: "faq7",
        question: "संबंधित लेख: ISRO GSLV-F17 EOS-05 मिशन 2026 का विस्तृत विवरण कहाँ उपलब्ध है?",
        answer: "आप आकार IAS वेबसाइट पर [ISRO GSLV-F17 EOS-05 मिशन 2026 संपूर्ण विश्लेषण](/current-affairs/isro-gslv-f17-eos-05-mission-2026) पर विस्तृत नोट्स पढ़ सकते हैं।",
        questionEn: "Related Reading: Where can I read the full ISRO EOS-05 Mission 2026 report?",
        answerEn: "You can read the full report at [ISRO GSLV-F17 EOS-05 Mission 2026 Complete Notes](/en/current-affairs/isro-gslv-f17-eos-05-mission-2026)."
      },
      {
        _key: "faq8",
        question: "MPPSC मुख्य परीक्षा में ISRO के उपग्रह अभियानों का सिलेबस कवरेज क्या है?",
        answer: "यह विषय MPPSC Mains Paper 3, Unit 7 (विज्ञान एवं प्रौद्योगिकी, इसरो का इतिहास एवं उपग्रह विकास) का प्रमुख भाग है।",
        questionEn: "What is the MPPSC Mains syllabus coverage for ISRO satellite launches?",
        answerEn: "This topic directly corresponds to MPPSC Mains Paper 3, Unit 7 (Science & Technology, ISRO History & Satellite Innovation)."
      },
      {
        _key: "faq9",
        question: "UPSC GS Paper 3 में अंतरिक्ष तकनीक और रक्षा इमेजरी से संबंधित क्या प्रश्न बनते हैं?",
        answer: "UPSC में स्वदेशी क्रायोजेनिक तकनीक, रिमोट सेंसिंग, राष्ट्रीय सुरक्षा में उपग्रहों की भूमिका और निजी व सरकारी अंतरिक्ष साझेदारी से संबंधित प्रश्न पूछे जाते हैं।",
        questionEn: "What core areas are evaluated in UPSC GS Paper 3 regarding space technology?",
        answerEn: "UPSC evaluates indigenous cryogenic tech, remote sensing, satellite applications in national security, and space sector reforms."
      },
      {
        _key: "faq10",
        question: "श्रीहरिकोटा स्थित सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR) किस राज्य में स्थित है?",
        answer: "सतीश धवन अंतरिक्ष केंद्र आंध्र प्रदेश राज्य के तिरुपति जिले (सुलुरपेटा) के निकट श्रीहरिकोटा द्वीप पर स्थित है।",
        questionEn: "In which state is Satish Dhawan Space Centre (SDSC SHAR), Sriharikota located?",
        answerEn: "Satish Dhawan Space Centre is located at Sriharikota island in Tirupati district, Andhra Pradesh, India."
      }
    ],

    mcqs: [
      {
        _key: "m1",
        question: "हाल ही में ISRO द्वारा प्रक्षेपित 'EOS-05' (Earth Observation Satellite-05) किस रॉकेट द्वारा लॉन्च किया गया?",
        questionEn: "Which rocket launched ISRO's 'EOS-05' Earth Observation Satellite?",
        options: [
          "GSLV-F17",
          "PSLV-C58",
          "LVM3-M4",
          "SSLV-D3"
        ],
        optionsEn: [
          "GSLV-F17",
          "PSLV-C58",
          "LVM3-M4",
          "SSLV-D3"
        ],
        correctIndex: 0,
        explanation: "ISRO ने GSLV-F17 (Geosynchronous Satellite Launch Vehicle) द्वारा एडवांस अर्थ ऑब्जर्वेशन सैटेलाइट EOS-05 को श्रीहरिकोटा से सफलतापूर्वक प्रक्षेपित किया।",
        explanationEn: "ISRO launched the advanced Earth Observation Satellite EOS-05 using the GSLV-F17 rocket from Sriharikota."
      },
      {
        _key: "m2",
        question: "EOS-05 उपग्रह की मुख्य विशेषता और प्राथमिक कक्षा (Orbit) कौन सी है?",
        questionEn: "What is the primary operational orbit of the EOS-05 satellite?",
        options: [
          "36,000 किमी भू-तुल्यकालिक कक्षा (GEO)",
          "500 किमी ध्रुवीय सूर्य तुल्यकालिक कक्षा (SSO)",
          "400 किमी निम्न पृथ्वी कक्षा (LEO)",
          "चंद्रमा की कक्षा (Lunar Orbit)"
        ],
        optionsEn: [
          "36,000 km Geosynchronous Orbit (GEO)",
          "500 km Sun-Synchronous Polar Orbit (SSO)",
          "400 km Low Earth Orbit (LEO)",
          "Lunar Orbit"
        ],
        correctIndex: 0,
        explanation: "EOS-05 को 36,000 किमी ऊंचाई वाली GEO (Geosynchronous Orbit) में तैनात किया गया है, जहाँ से यह भारत पर निरंतर 24x7 नज़र रख सकता है।",
        explanationEn: "EOS-05 is positioned in a 36,000 km Geosynchronous Orbit (GEO), allowing continuous 24/7 monitoring over the Indian subcontinent."
      },
      {
        _key: "m3",
        question: "GSLV रॉकेट श्रृंखला के तीसरे चरण में प्रयुक्त 'CUS' का क्या अर्थ है?",
        questionEn: "What does 'CUS' stand for in the 3rd stage of ISRO's GSLV rocket series?",
        options: [
          "Cryogenic Upper Stage (क्रायोजेनिक अपर स्टेज)",
          "Central Utility System",
          "Core Unmanned Stage",
          "Combined Ultra Engine"
        ],
        optionsEn: [
          "Cryogenic Upper Stage",
          "Central Utility System",
          "Core Unmanned Stage",
          "Combined Ultra Engine"
        ],
        correctIndex: 0,
        explanation: "CUS का अर्थ Cryogenic Upper Stage है, जिसमें तरल हाइड्रोजन (LH2) और तरल ऑक्सीजन (LOX) ईंधन का उपयोग होता है।",
        explanationEn: "CUS stands for Cryogenic Upper Stage, which utilizes Liquid Hydrogen (LH2) as fuel and Liquid Oxygen (LOX) as oxidizer."
      },
      {
        _key: "m4",
        question: "पृथ्वी अवलोकन उपग्रहों (Earth Observation Satellites) का प्राथमिक उपयोग किन क्षेत्रों में होता है?",
        questionEn: "What are the primary applications of Earth Observation Satellites (EOS)?",
        options: [
          "आपदा प्रबंधन, कृषि पूर्वानुमान, सीमा निगरानी एवं मौसम चेतावनी",
          "केवल मनोरंजक रेडियो प्रसारण",
          "केवल अंतरिक्ष मलबे को नष्ट करना",
          "केवल बैंकिंग एटीएम लेनदेन"
        ],
        optionsEn: [
          "Disaster management, crop monitoring, border surveillance, and weather warnings",
          "Entertainment radio broadcasting only",
          "Space debris destruction only",
          "Banking ATM transactions only"
        ],
        correctIndex: 0,
        explanation: "EOS उपग्रहों का उपयोग कृषि, वानिकी, तटीय सुरक्षा, जल संसाधन प्रबंधन तथा बाढ़ व चक्रवात जैसी आपदाओं की पूर्व चेतावनी में होता है।",
        explanationEn: "EOS satellites provide crucial data for agriculture, forestry, coastal security, water resources, and disaster early warnings."
      },
      {
        _key: "m5",
        question: "भारतीय अंतरिक्ष कार्यक्रम में सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR) कहाँ स्थित है?",
        questionEn: "Where is Satish Dhawan Space Centre (SDSC SHAR) located in India?",
        options: [
          "श्रीहरिकोटा, आंध्र प्रदेश",
          "थुम्बा, केरल",
          "चांदीपुर, ओडिशा",
          "महेंद्रगिरि, तमिलनाडु"
        ],
        optionsEn: [
          "Sriharikota, Andhra Pradesh",
          "Thumba, Kerala",
          "Chandipur, Odisha",
          "Mahendragiri, Tamil Nadu"
        ],
        correctIndex: 0,
        explanation: "SDSC SHAR भारत का मुख्य रॉकेट प्रक्षेपण केंद्र है, जो आंध्र प्रदेश के श्रीहरिकोटा द्वीप पर स्थित है।",
        explanationEn: "SDSC SHAR is India's primary spaceport located on Sriharikota island in Andhra Pradesh."
      },
      {
        _key: "m6",
        question: "ISRO द्वारा विकसित स्वदेशी क्रायोजेनिक इंजन का क्या नाम है?",
        questionEn: "What is the designation of the indigenous Cryogenic engine developed by ISRO for GSLV?",
        options: [
          "CE-7.5 एवं CE-20",
          "Vikas-1",
          "PSOM-XL",
          "Kalpana-1"
        ],
        optionsEn: [
          "CE-7.5 and CE-20",
          "Vikas-1",
          "PSOM-XL",
          "Kalpana-1"
        ],
        correctIndex: 0,
        explanation: "ISRO ने GSLV हेतु CE-7.5 तथा LVM3 हेतु शक्तिशाली CE-20 स्वदेशी क्रायोजेनिक इंजनों का विकास किया है।",
        explanationEn: "ISRO developed the CE-7.5 for GSLV and the high-thrust CE-20 engine for LVM3 indigenous cryogenic upper stages."
      },
      {
        _key: "m7",
        question: "संबद्ध अंतर-लिंकिंग: भारत का पहला निजी ऑर्बिटल रॉकेट कौन सा है जिसे 2026 में अंतरिक्ष क्षेत्र हेतु लॉन्च किया गया?",
        questionEn: "Interlinking Check: What is India's first private orbital rocket launched for space expansion?",
        options: [
          "विक्रम-1 (Skyroot Aerospace)",
          "अग्निबाण (Agnikul Cosmos)",
          "आरएच-560",
          "पीएसएलवी-एक्सएल"
        ],
        optionsEn: [
          "Vikram-1 (Skyroot Aerospace)",
          "Agnibaan (Agnikul Cosmos)",
          "RH-560",
          "PSLV-XL"
        ],
        correctIndex: 0,
        explanation: "विक्रम-1 स्काईरूट एयरोस्पेस द्वारा निर्मित भारत का पहला निजी ऑर्बिटल रॉकेट है। [पूरी रिपोर्ट पढ़ें](/current-affairs/vikram-1-orbital-rocket-skyroot-aerospace-launch)।",
        explanationEn: "Vikram-1 is India's 1st private orbital rocket built by Skyroot Aerospace. [Read full notes](/en/current-affairs/vikram-1-orbital-rocket-skyroot-aerospace-launch)."
      },
      {
        _key: "m8",
        question: "MPPSC Mains Paper 3 Unit 7 के तहत ISRO से संबंधित प्रश्नों हेतु कौन-सा कथन सत्य है?",
        questionEn: "Which statement is correct regarding ISRO topics under MPPSC Mains Paper 3 Unit 7?",
        options: [
          "इसरो के उपग्रहों का अनुप्रयोग, क्रायोजेनिक तकनीक और अंतरिक्ष नीतियां प्रत्यक्ष पाठ्यक्रम का भाग हैं।",
          "केवल चंद्रमा की दूरी पूछी जाती है।",
          "केवल विदेशी उपग्रहों का अध्ययन करना होता है।",
          "उपग्रहों का कोई सामाजिक लाभ नहीं है।"
        ],
        optionsEn: [
          "ISRO satellite applications, cryogenic technology, and space policies form a core part of the syllabus.",
          "Only distance to moon is asked.",
          "Only foreign satellites need to be studied.",
          "Satellites have no societal applications."
        ],
        correctIndex: 0,
        explanation: "MPPSC मेंस में इसरो की इतिहास, उपग्रह तकनीक, रिमोट सेंसिंग एवं सामाजिक-आर्थिक अनुप्रयोगों का गहन मूल्यांकन होता है।",
        explanationEn: "MPPSC Mains Paper 3 Unit 7 emphasizes ISRO's technological evolutions, remote sensing, and national development applications."
      }
    ]
  };

  await sanityClient.patch(launchDocId).set(launchDocUpdate).commit();
  console.log("✅ Article 1 updated successfully in Sanity:", launchDocId);

  // 2. CREATE / UPDATE DOCUMENT 2: isro-gslv-f17-eos-05-mission-2026
  console.log("📌 Creating/Updating Article 2: ISRO GSLV-F17 EOS-05 Mission 2026...");
  
  const missionDocId = "ca-isro-gslv-f17-eos-05-mission-2026";
  
  const missionDocUpdate = {
    _id: missionDocId,
    _type: "currentAffairs",
    slug: { _type: "slug", current: missionSlug },
    
    title: "ISRO GSLV-F17 EOS-05 मिशन 2026 | MPPSC & UPSC",
    titleEn: "ISRO GSLV-F17 EOS-05 Mission 2026 | MPPSC & UPSC",
    
    seoTitle: "ISRO GSLV-F17 EOS-05 मिशन 2026 | MPPSC & UPSC",
    seoTitleEn: "ISRO GSLV-F17 EOS-05 Mission 2026 | MPPSC & UPSC Notes",
    
    excerpt: "ISRO का GSLV-F17 EOS-05 पृथ्वी अवलोकन मिशन: स्वदेशी CUS क्रायोजेनिक इंजन, 36,000 किमी जियोसिंक्रोनस कक्षा, रक्षा व आपदा प्रबंधन हेतु MPPSC & UPSC परीक्षा नोट्स।",
    excerptEn: "Complete breakdown of ISRO's GSLV-F17 EOS-05 Earth Observation Mission featuring CUS Cryogenic Engine, GEO orbit capabilities & key study notes for MPPSC & UPSC.",
    
    seoDescription: "ISRO GSLV-F17 EOS-05 मिशन संपूर्ण विश्लेषण। सतीश धवन अंतरिक्ष केंद्र प्रक्षेपण, 36,000 किमी GEO पेलोड्स, 24x7 तटीय सुरक्षा व MPPSC & UPSC परीक्षा हेतु आवश्यक नोट्स।",
    seoDescriptionEn: "ISRO GSLV-F17 EOS-05 Earth Observation Mission analysis. SDSC Sriharikota launch, 36,000 km GEO orbit payload specs, coastal defense & study notes for MPPSC/UPSC.",

    publishedAt: new Date().toISOString(),
    ca_date: "2026-09-08",
    featured: true,
    readingTime: 10,

    author: authorRef,
    tags: tagRefs,
    syllabus: [
      "MPPSC Mains Paper 3 Unit 7 Science & Tech ISRO & Space Technology",
      "UPSC GS-3 Science & Tech Space Exploration & Disaster Management",
    ],

    keywords: [
      "ISRO GSLV F17 EOS 05 Mission 2026",
      "EOS 05 Earth Observation Mission Analysis",
      "GSLV F17 Sriharikota Space Mission",
      "ISRO CUS Cryogenic Engine GSLV F17",
      "Geosynchronous Orbit Space Technology India",
      "MPPSC Science Tech Space Notes",
      "UPSC GS3 Space Policy EOS 05",
      "India Border Security Satellite EOS 05",
    ],

    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "भारतीय अंतरिक्ष अनुसंधान संगठन (**ISRO**) ने सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR), श्रीहरिकोटा के दूसरे लॉन्च पैड से अपने शक्तिशाली **GSLV-F17** (Geosynchronous Satellite Launch Vehicle) रॉकेट द्वारा **EOS-05 (Earth Observation Satellite-05)** का सफल प्रक्षेपण किया है। यह उपग्रह 36,000 किलोमीटर की ऊंचाई पर स्थित भू-तुल्यकालिक कक्षा (Geosynchronous Orbit - GEO) में स्थापित होकर भारत की सीमाओं, तटीय क्षेत्रों एवं प्राकृतिक आपदाओं पर 24 घंटे निरंतर निगरानी रखेगा। **MPPSC (प्रारंभिक एवं मुख्य परीक्षा Paper 3 Unit 7)** और **UPSC (GS-3)** परीक्षा के दृष्टिगत यह मिशन अत्यंत महत्वपूर्ण है।",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "🔗 संबंधित मुख्य लेख (Interlinking Links)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [ISRO GSLV-F17 EOS-05 सैटेलाइट लॉन्च लाइव विवरण व मुख्य बिंदु ➔](/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026)\n",
          },
          {
            _type: "span",
            text: "👉 [भारत का पहला निजी ऑर्बिटल रॉकेट 'विक्रम-1' (Skyroot Aerospace) ➔](/current-affairs/vikram-1-orbital-rocket-skyroot-aerospace-launch)\n",
          },
          {
            _type: "span",
            text: "👉 [विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र (आंध्र प्रदेश) ➔](/current-affairs/worlds-first-autonomous-shipbuilding-centre-andhra-pradesh-2026)\n",
          },
          {
            _type: "span",
            text: "👉 [भारत की पहली ड्रोन बटालियन 'बाज़' (पंजाब) ➔](/current-affairs/indias-first-drone-battalion-punjab-2026)\n",
          },
          {
            _type: "span",
            text: "👉 [PARAM प्रज्ञा AI सुपरकंप्यूटर एवं भारत की सुपरकंप्यूटिंग यात्रा ➔](/general-awareness/param-pragya-ai-supercomputer-india-supercomputing-journey)",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "GSLV-F17 EOS-05 मिशन: एक दृष्टि में (Quick Fact Sheet)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• **प्रक्षेपण एजेंसी**: भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO)\n" },
          { _type: "span", text: "• **रॉकेट नाम**: GSLV-F17 (Geosynchronous Satellite Launch Vehicle)\n" },
          { _type: "span", text: "• **उपग्रह का नाम**: EOS-05 (Earth Observation Satellite-05 / 'आकाश में बाज')\n" },
          { _type: "span", text: "• **प्रक्षेपण स्थल**: सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR), श्रीहरिकोटा (आंध्र प्रदेश)\n" },
          { _type: "span", text: "• **लक्ष्य कक्षा**: जियोसिंक्रोनस कक्षा (GEO, ~36,000 किमी ऊंचाई)\n" },
          { _type: "span", text: "• **तीसरा चरण इंजन**: स्वदेशी क्रायोजेनिक अपर स्टेज (CUS - Cryogenic Upper Stage)\n" },
          { _type: "span", text: "• **मुख्य अनुप्रयोग**: 24x7 सीमा सुरक्षा, चक्रवात/बाढ़ पूर्व चेतावनी, कृषि व तटीय प्रबंधन" },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "GSLV-F17 की तकनीकी बनावट एवं क्रायोजेनिक चरण" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "GSLV-F17 एक तीन-स्तरीय (Three-Stage) प्रक्षेपण यान है:\n• **प्रथम चरण (S139)**: ठोस प्रणोदक (Solid Fuel - HTPB) तथा 4 स्ट्रैप-ऑन लिक्विड मोटर्स (Vikas Engines)।\n• **द्वितीय चरण (GS2)**: तरल ईंधन (Vikas Engine) जो अनसिमेट्रिकल डाइमिथाइल हाइड्राजीन (UDMH) पर कार्य करता है।\n• **तृतीय चरण (CUS)**: भारत का अति-आधुनिक **क्रायोजेनिक अपर स्टेज (CE-7.5)** जो बेहद कम तापमान पर द्रव हाइड्रोजन (-253°C) और द्रव ऑक्सीजन (-183°C) का उपयोग करता है। यह इंजन भारी उपग्रहों को 36,000 किमी उच्च कक्षा में स्थापित करने में सक्षम है।",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "MPPSC & UPSC परीक्षा दृष्टिकोण (Exam POV)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• **MPPSC Mains Paper 3 Unit 7**: ISRO के विकास का इतिहास, प्रमुख उपग्रह (Remote Sensing & Communication Satellites), क्रायोजेनिक तकनीक का विकास एवं सामाजिक लाभ।\n• **UPSC GS-3 (Science & Tech)**: अंतरिक्ष प्रौद्योगिकी का मेक इन इंडिया में योगदान, सीमा सुरक्षा में उपग्रह इमेजरी का महत्व तथा स्पेस 2.0 नीतियाँ।",
          },
        ],
      },
    ],

    bodyEn: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The **Indian Space Research Organisation (ISRO)** has successfully launched the **EOS-05 (Earth Observation Satellite-05)** aboard the **GSLV-F17** (Geosynchronous Satellite Launch Vehicle) rocket from the Satish Dhawan Space Centre (SDSC SHAR), Sriharikota. Deployed into a 36,000 km Geosynchronous Orbit (GEO), EOS-05 serves as an advanced 'Eye in the Sky' for 24/7 border surveillance, disaster management, and oceanographic monitoring. Crucial for **MPPSC (Mains Paper 3 Unit 7)** and **UPSC (GS-3 Science & Tech)**.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "🔗 Essential Interlink Connections" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [ISRO GSLV-F17 EOS-05 Satellite Launch Key Highlights ➔](/en/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026)\n",
          },
          {
            _type: "span",
            text: "👉 [India's First Private Orbital Rocket 'Vikram-1' (Skyroot) ➔](/en/current-affairs/vikram-1-orbital-rocket-skyroot-aerospace-launch)\n",
          },
          {
            _type: "span",
            text: "👉 [World's First Autonomous Shipbuilding Centre in Andhra Pradesh ➔](/en/current-affairs/worlds-first-autonomous-shipbuilding-centre-andhra-pradesh-2026)\n",
          },
          {
            _type: "span",
            text: "👉 [India's First Dedicated Drone Battalion 'Baaz' in Punjab ➔](/en/current-affairs/indias-first-drone-battalion-punjab-2026)\n",
          },
          {
            _type: "span",
            text: "👉 [PARAM Pragya AI Supercomputer & India's Supercomputing Journey ➔](/en/general-awareness/param-pragya-ai-supercomputer-india-supercomputing-journey)",
          },
        ],
      },
    ],

    faqs: [
      {
        _key: "faq1",
        question: "ISRO GSLV-F17 EOS-05 मिशन 2026 की मुख्य विशेषता क्या है?",
        answer: "यह मिशन 36,000 किमी ऊंचाई वाली GEO कक्षा में उन्नत अर्थ ऑब्जर्वेशन सैटेलाइट EOS-05 को स्थापित करता है जो 24 घंटे भारत की सीमाओं पर इमेजरी प्रदान करेगा।",
        questionEn: "What is the key highlight of ISRO GSLV-F17 EOS-05 Mission 2026?",
        answerEn: "It deploys the advanced EOS-05 Earth Observation Satellite into a 36,000 km GEO orbit to provide continuous 24/7 border imagery over India."
      },
      {
        _key: "faq2",
        question: "ISRO GSLV-F17 EOS-05 सैटेलाइट का लॉन्च विवरण कहाँ पढ़ें?",
        answer: "संबद्ध लेख देखें: [ISRO GSLV-F17 EOS-05 सैटेलाइट लॉन्च लाइव अपडेट्स व नोट्स](/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026)।",
        questionEn: "Where can I read the companion launch report?",
        answerEn: "See companion report: [ISRO GSLV-F17 EOS-05 Satellite Launch Key Highlights](/en/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026)."
      },
      {
        _key: "faq3",
        question: "GSLV-F17 में क्रायोजेनिक अपर स्टेज (CUS) का क्या कार्य है?",
        answer: "CUS अत्यधिक ठंडे तरल हाइड्रोजन व ऑक्सीजन ईंधन का उपयोग कर सैटेलाइट को 36,000 किमी उच्च भू-तुल्यकालिक कक्षा (GEO) में धकेलता है।",
        questionEn: "What is the role of the Cryogenic Upper Stage (CUS) in GSLV-F17?",
        answerEn: "CUS burns liquid hydrogen and liquid oxygen at extreme sub-zero temperatures to thrust payloads into a 36,000 km Geosynchronous Orbit."
      },
      {
        _key: "faq4",
        question: "EOS-05 उपग्रह का जीवनकाल और वजन कितना है?",
        answer: "EOS-05 का वजन लगभग 2,200 किग्रा है और इसका मिशन जीवनकाल 10 से अधिक वर्षों का है।",
        questionEn: "What is the weight and mission lifespan of the EOS-05 satellite?",
        answerEn: "EOS-05 weighs approximately 2,200 kg and has a design mission life of over 10 years."
      },
      {
        _key: "faq5",
        question: "राष्ट्रीय सुरक्षा एवं आपदा प्रबंधन में EOS-05 का क्या महत्व है?",
        answer: "यह 24x7 सीमा निगरानी, घुसपैठ रोकथाम, समुद्री सुरक्षा और चक्रवात, बाढ़ व भूस्खलन जैसी प्राकृतिक आपदाओं की त्वरित चेतावनी देता है।",
        questionEn: "How does EOS-05 contribute to national security and disaster management?",
        answerEn: "It provides 24/7 border surveillance, anti-intrusion tracking, maritime security, and rapid early warnings for cyclones, floods & landslides."
      },
      {
        _key: "faq6",
        question: "GSLV और PSLV रॉकेटों में मुख्य अंतर क्या है?",
        answer: "PSLV मुख्यतः निम्न व ध्रुवीय कक्षाओं (LEO/SSO) के लिए उपयोग होता है, जबकि GSLV भारी उपग्रहों को 36,000 किमी उच्च GEO कक्षाओं में भेजता है।",
        questionEn: "What is the primary difference between GSLV and PSLV rockets?",
        answerEn: "PSLV primarily targets Low Earth and Polar Orbits (LEO/SSO), whereas GSLV carries heavy payloads to 36,000 km high Geosynchronous Orbits (GEO)."
      },
      {
        _key: "faq7",
        question: "SDSC SHAR श्रीहरिकोटा से कितने लॉन्च पैड संचालित होते हैं?",
        answer: "सतीश धवन अंतरिक्ष केंद्र श्रीहरिकोटा में दो सक्रिय लॉन्च पैड (First & Second Launch Pads) स्थित हैं।",
        questionEn: "How many launch pads are operational at SDSC SHAR, Sriharikota?",
        answerEn: "Satish Dhawan Space Centre Sriharikota operates two active launch complexes (First & Second Launch Pads)."
      },
      {
        _key: "faq8",
        question: "MPPSC मेंस पेपर 3 यूनिट 7 में इस टॉपिक की तैयारी कैसे करें?",
        answer: "इसरो के उपग्रहों की सूची, क्रायोजेनिक इंजन (CE-7.5/CE-20), रिमोट सेंसिंग के अनुप्रयोग और स्पेस 2.0 सुधारों पर उत्तर तैयार करें।",
        questionEn: "How should candidates prepare this topic for MPPSC Mains Paper 3 Unit 7?",
        answerEn: "Focus on ISRO's satellite roadmap, indigenous Cryogenic engines (CE-7.5/CE-20), remote sensing applications, and space reforms."
      },
      {
        _key: "faq9",
        question: "UPSC सिविल सेवा परीक्षा में GEO सैटेलाइट्स से संबंधित मुख्य प्रश्न क्या बनते हैं?",
        answer: "UPSC में LEO/GEO कक्षाओं का तुलनात्मक विश्लेषण, सैन्य संचार उपग्रह और अंतर्राष्ट्रीय अंतरिक्ष प्रतिस्पर्धा पर प्रश्न पूछे जाते हैं।",
        questionEn: "What UPSC civil services questions stem from GEO satellite missions?",
        answerEn: "UPSC focuses on LEO vs GEO comparative analysis, military communications satellites, and space diplomacy."
      },
      {
        _key: "faq10",
        question: "इसरो के अन्य संबंधित लेख आकार IAS पर कहाँ मिलेंगे?",
        answer: "आप [विक्रम-1 निजी रॉकेट](/current-affairs/vikram-1-orbital-rocket-skyroot-aerospace-launch) तथा [PARAM प्रज्ञा सुपरकंप्यूटर](/general-awareness/param-pragya-ai-supercomputer-india-supercomputing-journey) भी पढ़ सकते हैं।",
        questionEn: "Where can I read other space & tech articles on Aakar IAS?",
        answerEn: "Check [Vikram-1 Private Rocket](/en/current-affairs/vikram-1-orbital-rocket-skyroot-aerospace-launch) and [PARAM Pragya Supercomputer](/en/general-awareness/param-pragya-ai-supercomputer-india-supercomputing-journey)."
      }
    ],

    mcqs: [
      {
        _key: "m1",
        question: "ISRO के GSLV-F17 EOS-05 मिशन 2026 से संबंधित कौन सा कथन सत्य है?",
        questionEn: "Which statement is true regarding ISRO's GSLV-F17 EOS-05 Mission 2026?",
        options: [
          "यह 36,000 किमी GEO कक्षा में स्थापित अर्थ ऑब्जर्वेशन सैटेलाइट मिशन है।",
          "यह मंगल ग्रह हेतु एक लैंडर मिशन है।",
          "यह केवल सूर्य के अध्ययन हेतु भेजा गया है।",
          "यह एक मानवयुक्त अंतरिक्ष यान है।"
        ],
        optionsEn: [
          "It is an Earth Observation Satellite mission deployed into a 36,000 km GEO orbit.",
          "It is a Mars lander mission.",
          "It is meant exclusively for solar observation.",
          "It is a crewed spaceflight mission."
        ],
        correctIndex: 0,
        explanation: "EOS-05 एक उच्च-क्षमता अर्थ ऑब्जर्वेशन सैटेलाइट है जो 36,000 किमी ऊंचाई वाली भू-तुल्यकालिक कक्षा (GEO) से निरंतर निगरानी करेगा।",
        explanationEn: "EOS-05 is a high-capacity Earth Observation Satellite positioned in a 36,000 km GEO orbit for continuous monitoring."
      },
      {
        _key: "m2",
        question: "संबद्ध लेख इंटर-लिंकिंग: ISRO GSLV-F17 EOS-05 सैटेलाइट के लॉन्च का विवरण किस URL पर उपलब्ध है?",
        questionEn: "Interlinking Check: Where is the companion launch report available?",
        options: [
          "/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026",
          "/current-affairs/neeraj-chopra-2026",
          "/current-affairs/budget-2026",
          "/current-affairs/ramsar-2026"
        ],
        optionsEn: [
          "/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026",
          "/current-affairs/neeraj-chopra-2026",
          "/current-affairs/budget-2026",
          "/current-affairs/ramsar-2026"
        ],
        correctIndex: 0,
        explanation: "ISRO GSLV-F17 EOS-05 का विस्तृत लॉन्च विवरण [ISRO GSLV-F17 EOS-05 सैटेलाइट लॉन्च](/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026) पर उपलब्ध है।",
        explanationEn: "Full launch details are available at [ISRO GSLV-F17 EOS-05 Satellite Launch](/en/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026)."
      },
      {
        _key: "m3",
        question: "ISRO के स्वदेशी क्रायोजेनिक इंजन (CE-7.5 / CE-20) में ईंधन और ऑक्सीडाइजर के रूप में किसका उपयोग होता है?",
        questionEn: "What propellants are used in ISRO's indigenous Cryogenic engines (CE-7.5 / CE-20)?",
        options: [
          "तरल हाइड्रोजन (LH2) और तरल ऑक्सीजन (LOX)",
          "केरोसिन और पेट्रोल",
          "डीजल और प्राकृतिक गैस",
          "यूरिया और अमोनिया"
        ],
        optionsEn: [
          "Liquid Hydrogen (LH2) and Liquid Oxygen (LOX)",
          "Kerosene and Petrol",
          "Diesel and Natural Gas",
          "Urea and Ammonia"
        ],
        correctIndex: 0,
        explanation: "क्रायोजेनिक इंजनों में अत्यधिक शीतलीकृत तरल हाइड्रोजन (ईंधन, -253°C) तथा तरल ऑक्सीजन (ऑक्सीडाइजर, -183°C) का उपयोग होता है।",
        explanationEn: "Cryogenic engines burn liquid hydrogen fuel (-253°C) and liquid oxygen oxidizer (-183°C) at ultra-low temperatures."
      },
      {
        _key: "m4",
        question: "श्रीहरिकोटा (आंध्र प्रदेश) स्थित सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR) का नाम किस महान भारतीय वैज्ञानिक के नाम पर रखा गया है?",
        questionEn: "Satish Dhawan Space Centre (SDSC SHAR) is named after which legendary Indian space scientist?",
        options: [
          "प्रो. सतीश धवन (पूर्व अध्यक्ष, ISRO)",
          "डॉ. एपीजे अब्दुल कलाम",
          "डॉ. होमी जहांगीर भाभा",
          "प्रो. यू.आर. राव"
        ],
        optionsEn: [
          "Prof. Satish Dhawan (Former Chairman, ISRO)",
          "Dr. APJ Abdul Kalam",
          "Dr. Homi Jehangir Bhabha",
          "Prof. U.R. Rao"
        ],
        correctIndex: 0,
        explanation: "यह केंद्र भारत के महान अंतरिक्ष वैज्ञानिक एवं इसरो के पूर्व अध्यक्ष प्रोफेसर सतीश धवन (1972-1984) के नाम पर नामित है।",
        explanationEn: "It is named after Prof. Satish Dhawan, pioneer space scientist and former Chairman of ISRO (1972–1984)."
      },
      {
        _key: "m5",
        question: "पृथ्वी की भू-तुल्यकालिक कक्षा (Geosynchronous Orbit - GEO) की समुद्र तल से औसत ऊंचाई कितनी होती है?",
        questionEn: "What is the approximate altitude of Earth's Geosynchronous Orbit (GEO) above sea level?",
        options: [
          "35,786 किमी (लगभग 36,000 किमी)",
          "500 किमी",
          "1,000 किमी",
          "1,00,000 किमी"
        ],
        optionsEn: [
          "35,786 km (approx. 36,000 km)",
          "500 km",
          "1,000 km",
          "100,000 km"
        ],
        correctIndex: 0,
        explanation: "GEO कक्षा की ऊंचाई विषुवत रेखा से लगभग 35,786 किमी (36,000 किमी) होती है, जहाँ उपग्रह की परिक्रमण अवधि पृथ्वी की 24 घंटे की घूर्णन अवधि के समान होती है।",
        explanationEn: "GEO orbit altitude is approx. 35,786 km above Earth's equator, matching Earth's 24-hour rotational period."
      },
      {
        _key: "m6",
        question: "भारत की 'ब्लू इकोनॉमी' और तटीय सुरक्षा में EOS-05 उपग्रह का क्या योगदान है?",
        questionEn: "How does the EOS-05 satellite contribute to India's Blue Economy and coastal security?",
        options: [
          "तटीय कटाव, समुद्री प्रदूषण, चक्रवात चेतावनी और अवैध जहाज गतिविधियों पर 24 घंटे इमेजरी प्रदान करना",
          "केवल मछली पकाने की रसीदें जारी करना",
          "केवल विदेशी बंदरगाहों का निर्माण करना",
          "केवल समुद्र में सड़कें बनाना"
        ],
        optionsEn: [
          "Providing 24/7 imagery for coastal erosion, marine pollution, cyclone warnings, and vessel tracking",
          "Issuing fish cooking receipts only",
          "Building foreign ports only",
          "Constructing undersea roads only"
        ],
        correctIndex: 0,
        explanation: "EOS-05 तटीय पारितंत्र, समुद्री यातायात निगरानी और चक्रवात/सुनामी पूर्व चेतावनी में निर्णायक भूमिका निभाता है।",
        explanationEn: "EOS-05 delivers critical intelligence for coastal ecosystem monitoring, maritime traffic control, and storm warnings."
      },
      {
        _key: "m7",
        question: "इंटर-लिंकिंग प्रश्न: भारत का पहला निजी ऑर्बिटल रॉकेट 'विक्रम-1' किस एयरोस्पेस स्टार्ट-अप द्वारा बनाया गया है?",
        questionEn: "Interlinking Check: Which aerospace startup built India's 1st private orbital rocket 'Vikram-1'?",
        options: [
          "स्काईरूट एयरोस्पेस (Skyroot Aerospace)",
          "अग्निकुल कॉस्मॉस",
          "पिक्सेल (Pixaxel)",
          "ध्रुव स्पेस"
        ],
        optionsEn: [
          "Skyroot Aerospace",
          "Agnikul Cosmos",
          "Pixaxel",
          "Dhruva Space"
        ],
        correctIndex: 0,
        explanation: "विक्रम-1 स्काईरूट एयरोस्पेस (हैदराबाद) द्वारा निर्मित निजी ऑर्बिटल रॉकेट है। [पूरी रिपोर्ट पढ़ें](/current-affairs/vikram-1-orbital-rocket-skyroot-aerospace-launch)।",
        explanationEn: "Vikram-1 was built by Skyroot Aerospace. [Read full notes](/en/current-affairs/vikram-1-orbital-rocket-skyroot-aerospace-launch)."
      },
      {
        _key: "m8",
        question: "MPPSC मुख्य परीक्षा Paper 3 Unit 7 में अंतरिक्ष प्रौद्योगिकी के अंतर्गत किन शीर्षकों से प्रश्न पूछे जाते हैं?",
        questionEn: "Which key headings are evaluated under Space Technology in MPPSC Mains Paper 3 Unit 7?",
        options: [
          "इसरो के उपग्रह, प्रक्षेपण यान (PSLV/GSLV/LVM3), रिमोट सेंसिंग एवं सामाजिक लाभ",
          "केवल क्रिकेट मैच प्रसारण",
          "केवल फिल्मों की शूटिंग",
          "केवल कार रेसिंग"
        ],
        optionsEn: [
          "ISRO satellites, launch vehicles (PSLV/GSLV/LVM3), remote sensing, and societal applications",
          "Cricket match broadcasting only",
          "Movie shooting locations only",
          "Car racing tracks only"
        ],
        correctIndex: 0,
        explanation: "MPPSC मेंस परीक्षा का Paper 3 Unit 7 इसरो की उपलब्धियों, उपग्रहों एवं प्रक्षेपण यानों के विस्तृत ज्ञान का परीक्षण करता है।",
        explanationEn: "MPPSC Mains Paper 3 Unit 7 thoroughly evaluates ISRO's space achievements, launch vehicles, and remote sensing applications."
      }
    ]
  };

  await sanityClient.createOrReplace(missionDocUpdate);
  console.log("✅ Article 2 created/updated successfully in Sanity:", missionDocId);

  // 3. EXECUTE TWO-WAY INTERLINKING SCRIPT
  console.log("🔗 Executing Two-Way Interlinking across related articles...");
  
  // Also run authority interlink script if available
  try {
    const authorityScript = require("./two-way-seo-interlink-authority");
    if (typeof authorityScript === "function") {
      await authorityScript();
    }
  } catch (e) {
    console.log("Note on authority script execution:", e instanceof Error ? e.message : e);
  }

  console.log("🎉 SUCCESS! Both ISRO EOS-05 articles have been 2-way interlinked & fully updated!");
}

main().catch((err) => {
  console.error("❌ Interlinking script failed:", err);
  process.exit(1);
});
