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

async function optimizeShipbuildingSEO() {
  console.log("🚀 Optimizing SEO & Google Title for World's First Autonomous Shipbuilding Centre Article...");

  const docId = "ca-worlds-first-autonomous-shipbuilding-centre-ap-2026";

  const updatedDoc = {
    title: "विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र (आंध्र प्रदेश) | MPPSC & UPSC",
    titleEn: "World's First Autonomous Shipbuilding Centre in Andhra Pradesh | MPPSC & UPSC",
    
    seoTitle: "विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र (आंध्र प्रदेश) | MPPSC & UPSC",
    seoTitleEn: "World's First Autonomous Shipbuilding Centre in Andhra Pradesh | MPPSC & UPSC Notes",
    
    excerpt: "आंध्र प्रदेश के नेल्लोर जिले में स्थापित हो रहा है विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र। जानिए तकनीक, रक्षा महत्व एवं MPPSC & UPSC परीक्षा उपयोगी नोट्स।",
    excerptEn: "India is building the world's first autonomous shipbuilding centre in Andhra Pradesh. Read detailed Blue Economy, AI tech & exam notes for MPPSC & UPSC.",
    
    seoDescription: "विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र (Autonomous Shipbuilding Centre) आंध्र प्रदेश के नेल्लोर (जुब्वलादिन्ने) में स्थापित। MPPSC & UPSC परीक्षा नोट्स।",
    seoDescriptionEn: "World's first autonomous maritime shipbuilding hub in Andhra Pradesh (Nellore). Detailed AI navigation, Blue Economy facts, MCQs & study notes for MPPSC & UPSC.",

    keywords: [
      "विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र",
      "World's First Autonomous Shipbuilding Centre Andhra Pradesh",
      "Autonomous Shipyard Nellore Juvvaladinne",
      "Sagar Defence Engineering Andhra Pradesh",
      "Autonomous Vessels India Maritime Tech",
      "Blue Economy Sagarmala MPPSC",
      "MPPSC Science Tech Robotics Notes",
      "UPSC GS3 Maritime Infrastructure AI",
      "Andhra Pradesh Autonomous Shipyard 2026",
    ],

    author: {
      _type: "reference",
      _ref: "author-aakar",
    },

    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
      { _type: "reference", _ref: "tag-scitech" },
    ],

    syllabus: [
      "MPPSC Mains Paper 3 Unit 7 Science & Tech Robotics & Artificial Intelligence",
      "UPSC GS-3 Maritime Infrastructure, AI Applications & Blue Economy Growth",
    ],

    faqs: [
      {
        _key: "faq1",
        question: "विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र भारत के किस राज्य में स्थापित किया जा रहा है?",
        answer: "यह अत्याधुनिक स्वायत्त जहाज निर्माण केंद्र भारत के आंध्र प्रदेश राज्य के नेल्लोर जिले में जुब्वलादिन्ने (Juvvaladinne) मछली पकड़ने के बंदरगाह के समीप स्थापित किया जा रहा है।",
        questionEn: "In which state of India is the world's first autonomous shipbuilding centre being established?",
        answerEn: "This state-of-the-art autonomous shipbuilding facility is being set up in Nellore district of Andhra Pradesh, India, near Juvvaladinne fishing harbor."
      },
      {
        _key: "faq2",
        question: "इस स्वायत्त जहाज निर्माण केंद्र का विकास किस कंपनी द्वारा किया जा रहा है?",
        answer: "इस परियोजना का निर्माण भारतीय रक्षा प्रौद्योगिकी फर्म 'सागर डिफेंस इंजीनियरिंग' (Sagar Defence Engineering) द्वारा आंध्र प्रदेश सरकार के सहयोग से किया जा रहा है।",
        questionEn: "Which company is developing this autonomous shipbuilding facility?",
        answerEn: "The facility is being developed by Indian defense-tech firm 'Sagar Defence Engineering' in partnership with the Government of Andhra Pradesh."
      },
      {
        _key: "faq3",
        question: "इस केंद्र में किस प्रकार के समुद्री जहाजों का निर्माण किया जाएगा?",
        answer: "यहाँ मानवमुफ्त सतह पोत (USVs - Unmanned Surface Vessels), स्वायत्त जलमार्ग वाहन (AUVs), एआई-सक्षम नौवहन प्रणाली (AI-enabled Navigation Systems) तथा नौसेना रक्षा प्रणालियों का निर्माण और परीक्षण होगा।",
        questionEn: "What types of maritime vessels will be manufactured at this facility?",
        answerEn: "It will design, manufacture, and test Unmanned Surface Vessels (USVs), Autonomous Underwater/Surface Vehicles (AUVs), and AI-guided naval surveillance platforms."
      },
      {
        _key: "faq4",
        question: "स्वायत्त जहाजों (Autonomous Ships) में किन प्रमुख प्रौद्योगिकियों का उपयोग होता है?",
        answer: "इनमें आर्टिफिशियल इंटेलिजेंस (AI), रोबोटिक्स, डिजिटल ट्विन (Digital Twin), सेंसर फ्यूजन, मशीन लर्निंग और सैटेलाइट नेविगेशन (GNSS/NavIC) जैसी अत्याधुनिक तकनीकों का प्रयोग होता है।",
        questionEn: "What key technologies are integrated into Autonomous Ships?",
        answerEn: "They incorporate Artificial Intelligence (AI), Robotics, Sensor Fusion, Digital Twin technology, Machine Learning, and Satellite Navigation (NavIC/GNSS)."
      },
      {
        _key: "faq5",
        question: "आंध्र प्रदेश सरकार ने इस केंद्र के पहले चरण हेतु कितनी भूमि आवंटित की है?",
        answer: "आंध्र प्रदेश सरकार ने प्रथम चरण में इस अत्याधुनिक सुविधा केंद्र के निर्माण के लिए लगभग 29.58 एकड़ भूमि आवंटित की है।",
        questionEn: "How much land has been allocated by the Andhra Pradesh government for Phase 1?",
        answerEn: "The Andhra Pradesh government has allocated approximately 29.58 acres of land for the initial phase of this facility."
      },
      {
        _key: "faq6",
        question: "भारत की ब्लू इकोनॉमी (Blue Economy) के लिए इस परियोजना का क्या महत्व है?",
        answer: "यह केंद्र भारत को समुद्री प्रौद्योगिकी में वैश्विक आत्मनिर्भरता प्रदान करेगा, तटीय सुरक्षा को मजबूत करेगा और सागरमाला कार्यक्रम के तहत ब्लू इकोनॉमी को बढ़ावा देगा।",
        questionEn: "What is the significance of this project for India's Blue Economy?",
        answerEn: "It positions India as a global hub for autonomous maritime technology, enhances coastal surveillance, and accelerates Blue Economy growth under the Sagarmala initiative."
      },
      {
        _key: "faq7",
        question: "नौसेना और तटीय सुरक्षा में स्वायत्त जहाजों का क्या लाभ है?",
        answer: "स्वायत्त जहाज बिना मानव चालक दल के 24x7 निगरानी, माइन स्वीपिंग, एंटी-पाइरेसी गश्त, और समुद्री खोज एवं बचाव अभियानों को बिना जनहानि के जोखिम के पूरा कर सकते हैं।",
        questionEn: "What are the defense and surveillance benefits of autonomous naval vessels?",
        answerEn: "Autonomous ships carry out 24/7 coastal patrol, mine countermeasures, anti-piracy operations, and search & rescue without endangering human crew."
      },
      {
        _key: "faq8",
        question: "MPPSC मेंस परीक्षा हेतु यह विषय किस सिलेबस यूनिट से संबंधित है?",
        answer: "यह विषय MPPSC मुख्य परीक्षा के Paper 3, Unit 7 (विज्ञान एवं प्रौद्योगिकी, रोबोटिक्स, एआई एवं रक्षा तकनीक) से प्रत्यक्ष रूप से संबंधित है।",
        questionEn: "Which MPPSC Mains syllabus unit covers this topic?",
        answerEn: "This topic directly aligns with MPPSC Mains Paper 3, Unit 7 (Science & Technology, Robotics, AI, and Defense Innovations)."
      },
      {
        _key: "faq9",
        question: "UPSC GS Paper 3 में स्वायत्त जहाजों से संबंधित कौन-कौन से आयाम पूछे जा सकते हैं?",
        answer: "UPSC GS-3 के तहत आंतरिक सुरक्षा (तटीय सुरक्षा), अवसंरचना विकास (पोर्ट्स & मैरीटाइम), एआई/रोबोटिक्स अनुप्रयोग और ब्लू इकोनॉमी ग्रोथ से संबंधित मुख्य परीक्षा प्रश्न बन सकते हैं।",
        questionEn: "What dimensions can be asked in UPSC GS Paper 3 regarding autonomous ships?",
        answerEn: "UPSC GS-3 can cover internal security (coastal defense), infrastructure (ports & shipping), AI/Robotics applications, and sustainable Blue Economy."
      },
      {
        _key: "faq10",
        question: "सागर डिफेंस इंजीनियरिंग कंपनी की अन्य प्रमुख उपलब्धियां क्या हैं?",
        answer: "सागर डिफेंस इंजीनियरिंग ने भारतीय नौसेना हेतु 'वरुण' (भारत का पहला मानव-वाहक ड्रोन) तथा स्वायत्त गश्ती नौकाओं (USVs) का सफल निर्माण किया है।",
        questionEn: "What are the other major achievements of Sagar Defence Engineering?",
        answerEn: "Sagar Defence Engineering previously built 'Varuna' (India's first human-carrying drone) and autonomous patrol craft for the Indian Navy."
      }
    ],

    mcqs: [
      {
        _key: "m1",
        question: "हाल ही में चर्चा में रहा 'विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र' (Autonomous Shipbuilding Centre) भारत के किस स्थान पर स्थापित किया जा रहा है?",
        questionEn: "Where is the world's first autonomous shipbuilding centre being established in India?",
        options: [
          "नेल्लोर, आंध्र प्रदेश (Juvvaladinne)",
          "कोच्चि, केरल",
          "विशाखापट्टनम, आंध्र प्रदेश",
          "तूतीकोरिन, तमिलनाडु"
        ],
        optionsEn: [
          "Nellore, Andhra Pradesh (Juvvaladinne)",
          "Kochi, Kerala",
          "Visakhapatnam, Andhra Pradesh",
          "Tuticorin, Tamil Nadu"
        ],
        correctIndex: 0,
        explanation: "आंध्र प्रदेश के नेल्लोर जिले में स्थित जुब्वलादिन्ने मछली पकड़ने के बंदरगाह के पास विश्व का पहला स्वायत्त समुद्री जहाज निर्माण और प्रणाली केंद्र (World's First Autonomous Shipbuilding Centre) स्थापित किया जा रहा है।",
        explanationEn: "The world's first autonomous maritime shipbuilding and systems centre is being set up near Juvvaladinne in Nellore district, Andhra Pradesh."
      },
      {
        _key: "m2",
        question: "आंध्र प्रदेश में स्थापित हो रहे स्वायत्त जहाज निर्माण केंद्र का विकास किस रक्षा तकनीक फर्म द्वारा किया जा रहा है?",
        questionEn: "Which defense tech firm is developing the autonomous shipbuilding centre in Andhra Pradesh?",
        options: [
          "सागर डिफेंस इंजीनियरिंग (Sagar Defence Engineering)",
          "मझगांव डॉक शिपबिल्डर्स (MDL)",
          "गार्डन रीच शिपबिल्डर्स (GRSE)",
          "कोचीन शिपयार्ड लिमिटेड (CSL)"
        ],
        optionsEn: [
          "Sagar Defence Engineering",
          "Mazagon Dock Shipbuilders (MDL)",
          "Garden Reach Shipbuilders (GRSE)",
          "Cochin Shipyard Limited (CSL)"
        ],
        correctIndex: 0,
        explanation: "इस महत्वाकांक्षी सुविधा केंद्र का निर्माण सागर डिफेंस इंजीनियरिंग (Sagar Defence Engineering) द्वारा आंध्र प्रदेश सरकार के सहयोग से किया जा रहा है।",
        explanationEn: "This landmark facility is being established by Sagar Defence Engineering in partnership with the Government of Andhra Pradesh."
      },
      {
        _key: "m3",
        question: "स्वायत्त सतह पोत (Unmanned Surface Vessels - USVs) के संदर्भ में निम्नलिखित कथनों पर विचार कीजिए:\n1. ये बिना किसी मानव चालक दल के एआई और सेंसर फ्यूजन द्वारा नेविगेट करते हैं।\n2. इनका उपयोग 24x7 तटीय निगरानी, खदान हटाने (Mine Countermeasures) और एंटी-पाइरेसी में किया जा सकता है।\nउपर्युक्त में से कौन-सा/से कथन सत्य है/हैं?",
        questionEn: "Consider the following statements regarding Unmanned Surface Vessels (USVs):\n1. They navigate without human crew using AI and sensor fusion.\n2. They can be used for 24/7 coastal patrol, mine countermeasures, and anti-piracy operations.\nWhich of the statements given above is/are correct?",
        options: [
          "केवल 1",
          "केवल 2",
          "1 और 2 दोनों",
          "न तो 1, न ही 2"
        ],
        optionsEn: [
          "Only 1",
          "Only 2",
          "Both 1 and 2",
          "Neither 1 nor 2"
        ],
        correctIndex: 2,
        explanation: "दोनों कथन सत्य हैं। USVs कृत्रिम बुद्धिमत्ता, रोबोटिक्स और डिजिटल ट्विन तकनीक का उपयोग कर बिना चालक दल के जटिल समुद्री अभियानों को सुरक्षित और सटीक रूप से अंजाम देते हैं।",
        explanationEn: "Both statements are correct. USVs utilize AI, robotics, and digital twin technology to operate complex maritime tasks without human crew."
      },
      {
        _key: "m4",
        question: "भारत का पहला मानव-वाहक पर्सनल एयर व्हीकल (Human-Carrying Drone) 'वरुण' (Varuna) किस भारतीय कंपनी द्वारा विकसित किया गया था?",
        questionEn: "Which Indian company developed India's first human-carrying drone 'Varuna'?",
        options: [
          "सागर डिफेंस इंजीनियरिंग",
          "ड्रोनआचार्य एरोस्पेस",
          "आइडियाफोर्ज (IdeaForge)",
          "गरुड़ एयरोस्पेस"
        ],
        optionsEn: [
          "Sagar Defence Engineering",
          "DroneAcharya Aerial Innovations",
          "IdeaForge",
          "Garuda Aerospace"
        ],
        correctIndex: 0,
        explanation: "सागर डिफेंस इंजीनियरिंग ने भारतीय नौसेना के लिए भारत का पहला पैसेंजर/ह्यूमन-कैरिंग ड्रोन 'वरुण' विकसित किया था। यही कंपनी अब आंध्र प्रदेश में पहला स्वायत्त शिपयार्ड बना रही है।",
        explanationEn: "Sagar Defence Engineering designed 'Varuna', India's first passenger drone for the Indian Navy, and is now building the autonomous shipbuilding hub."
      },
      {
        _key: "m5",
        question: "भारत सरकार की 'सागरमाला परियोजना' (Sagarmala Project) का मुख्य उद्देश्य क्या है?",
        questionEn: "What is the primary objective of the Government of India's 'Sagarmala Project'?",
        options: [
          "बंदरगाह आधारित प्रत्यक्ष विकास और तटीय शिपिंग बुनियादी ढांचे को आधुनिक बनाना",
          "केवल विदेशी बंदरगाहों का अधिग्रहण",
          "नदियों को आपस में जोड़ना",
          "मछुआरों के लिए केवल सब्सिडी वितरण"
        ],
        optionsEn: [
          "Port-led direct development and modernization of coastal shipping infrastructure",
          "Only acquisition of foreign ports",
          "Interlinking of inland rivers",
          "Distributing subsidies to fishermen only"
        ],
        correctIndex: 0,
        explanation: "सागरमाला परियोजना भारत की 7,500+ किमी लंबी तटरेखा पर पोर्ट-लीड डेवलपमेंट, आधुनिक शिपिंग और ब्लू इकोनॉमी को बढ़ावा देने का फ्लैगशिप कार्यक्रम है।",
        explanationEn: "Sagarmala is India's flagship program aimed at port-led development, modernizing maritime logistics, and expanding the Blue Economy across India's coast."
      },
      {
        _key: "m6",
        question: "स्वायत्त जहाजों (Autonomous Ships) की निर्माण प्रक्रिया में 'डिजिटल ट्विन' (Digital Twin) तकनीक का क्या कार्य होता है?",
        questionEn: "What is the role of 'Digital Twin' technology in manufacturing autonomous ships?",
        options: [
          "भौतिक जहाज की एक आभासी/डिजिटल रेप्लिका बनाकर वास्तविक समय में प्रदर्शन और सिमुलेशन का परीक्षण करना",
          "जहाज के बाहरी हिस्से का रंग चुनना",
          "केबल टीवी सिग्नल प्रदान करना",
          "केवल ईंधन की रसीद जनरेट करना"
        ],
        optionsEn: [
          "Creating a real-time virtual/digital replica of the vessel for performance monitoring and simulation",
          "Selecting exterior paint colors",
          "Providing satellite cable TV signals",
          "Generating fuel payment receipts only"
        ],
        correctIndex: 0,
        explanation: "डिजिटल ट्विन तकनीक एक भौतिक जहाज या प्रणाली की सटीक डिजिटल प्रतिकृति (Virtual Replica) बनाती है, जिससे निर्माण और नौवहन के दौरान दूरस्थ परीक्षण और विफलता पूर्वानुमान संभव होता है।",
        explanationEn: "Digital Twin technology creates an exact virtual replica of physical ships to simulate real-world conditions and predict component maintenance."
      },
      {
        _key: "m7",
        question: "सतत विकास लक्ष्य (SDG) का कौन सा गोल विशेष रूप से जलीय जीवन और समुद्री संसाधनों के संरक्षण से संबंधित है?",
        questionEn: "Which Sustainable Development Goal (SDG) specifically focuses on 'Life Below Water'?",
        options: [
          "SDG 14 (Life Below Water)",
          "SDG 6 (Clean Water)",
          "SDG 13 (Climate Action)",
          "SDG 9 (Industry & Innovation)"
        ],
        optionsEn: [
          "SDG 14 (Life Below Water)",
          "SDG 6 (Clean Water)",
          "SDG 13 (Climate Action)",
          "SDG 9 (Industry & Innovation)"
        ],
        correctIndex: 0,
        explanation: "SDG 14 (जल में जीवन / Life Below Water) महासागरों, समुद्रों और समुद्री संसाधनों के सतत उपयोग एवं संरक्षण से संबंधित है, जो ब्लू इकोनॉमी का मुख्य स्तंभ है।",
        explanationEn: "SDG 14 (Life Below Water) concentrates on the conservation and sustainable use of oceans, seas, and marine resources."
      },
      {
        _key: "m8",
        question: "MPPSC मुख्य परीक्षा में 'ब्लू इकोनॉमी' और 'मैरीटाइम रोबोटिक्स' से संबंधित प्रश्न पत्र का मुख्य भाग कौन सा है?",
        questionEn: "Which paper of MPPSC Mains explicitly tests 'Blue Economy' and 'Maritime Robotics'?",
        options: [
          "Paper 3 (विज्ञान एवं प्रौद्योगिकी, यूनिट 7)",
          "Paper 1 (इतिहास)",
          "Paper 4 (नीतिशास्त्र)",
          "Paper 5 (सामान्य हिंदी)"
        ],
        optionsEn: [
          "Paper 3 (Science & Technology, Unit 7)",
          "Paper 1 (History)",
          "Paper 4 (Ethics)",
          "Paper 5 (General Hindi)"
        ],
        correctIndex: 0,
        explanation: "MPPSC मेंस परीक्षा का Paper 3 Unit 7 रोबोटिक्स, आर्टिफिशियल इंटेलिजेंस, अंतरिक्ष एवं रक्षा प्रौद्योगिकी से संबंधित है, जिसमें स्वायत्त जहाज तकनीक अत्यंत प्रासंगिक है।",
        explanationEn: "MPPSC Mains Paper 3 Unit 7 explicitly assesses Robotics, AI, Defense Innovations, and emerging technological applications."
      }
    ]
  };

  const res = await sanityClient.patch(docId).set(updatedDoc).commit();
  console.log("✅ Successfully updated Sanity document:", res._id);
  console.log("👉 New Title (Hi):", res.title);
  console.log("👉 New Title (En):", res.titleEn);
  console.log("👉 New SEO Title (Hi):", res.seoTitle);
}

optimizeShipbuildingSEO().catch((err) => {
  console.error("❌ Failed to update Sanity doc:", err);
  process.exit(1);
});
