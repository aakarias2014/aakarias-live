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

async function optimizeDroneBattalionSEO() {
  console.log("🚀 Optimizing SEO & Google Search Indexing for India's First Drone Battalion 'Baaz' Article...");

  const docId = "ca-indias-first-drone-battalion-punjab-2026";

  const updatedDoc = {
    title: "भारत की पहली ड्रोन बटालियन 'बाज़' (पंजाब) | MPPSC & UPSC",
    titleEn: "India's First Drone Battalion 'Baaz' in Punjab | MPPSC & UPSC",
    
    seoTitle: "भारत की पहली ड्रोन बटालियन 'बाज़' (पंजाब) | MPPSC & UPSC",
    seoTitleEn: "India's First Drone Battalion 'Baaz' in Punjab | MPPSC & UPSC Notes",
    
    excerpt: "भारतीय सेना ने पंजाब (जालंधर/वज्र कोर) में भारत की पहली समर्पित ड्रोन बटालियन 'बाज़' (Baaz) की स्थापना की। ड्रोन वॉरफेयर, BSF सीमा सुरक्षा एवं MPPSC & UPSC परीक्षा नोट्स।",
    excerptEn: "Indian Army raises India's first dedicated Drone Battalion 'Baaz' under Vajra Corps in Punjab (Jalandhar). Key facts, border surveillance & MPPSC/UPSC study notes.",
    
    seoDescription: "भारतीय सेना की पहली ड्रोन बटालियन 'बाज़' (Baaz) पंजाब (जालंधर, वज्र कोर) में तैनात। भारत-पाक सीमा सुरक्षा, काउंटर-ड्रोन तकनीक व MPPSC & UPSC परीक्षा उपयोगी संपूर्ण जानकारी।",
    seoDescriptionEn: "India's first dedicated Drone Battalion 'Baaz' raised by Indian Army in Punjab under Vajra Corps. Complete study notes, counter-drone tech & MCQs for MPPSC & UPSC.",

    keywords: [
      "देश की पहली ड्रोन बटालियन",
      "भारत की पहली ड्रोन बटालियन बाज़",
      "First Drone Battalion India Baaz Punjab",
      "Baaz Drone Battalion Jalandhar Vajra Corps",
      "Punjab Border Drone Surveillance Indian Army",
      "MPPSC Defence Tech Drone Rules Notes",
      "UPSC Internal Security Counter Drone System",
      "BSF Punjab Border Anti Drone Gun",
      "Heron FPV Drones Indian Army Punjab",
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
      "MPPSC Mains Paper 3 Unit 7 Science & Tech Defense & Robotics Applications",
      "UPSC GS-3 Internal Security, Border Management & Emerging Military Technologies",
    ],

    faqs: [
      {
        _key: "faq1",
        question: "भारतीय सेना द्वारा स्थापित देश की पहली समर्पित ड्रोन बटालियन का क्या नाम रखा गया है?",
        answer: "भारतीय सेना द्वारा पंजाब में गठित देश की पहली समर्पित ड्रोन बटालियन का नाम 'बाज़' (Baaz Drone Battalion) रखा गया है।",
        questionEn: "What is the official name of India's first dedicated Drone Battalion raised by the Indian Army?",
        answerEn: "The official name of India's first dedicated Drone Battalion raised in Punjab is 'Baaz' (Baaz Drone Battalion)."
      },
      {
        _key: "faq2",
        question: "देश की पहली ड्रोन बटालियन 'बाज़' का मुख्यालय कहाँ स्थित है और यह किस कोर के तहत कार्य करेगी?",
        answer: "यह बटालियन पंजाब के जालंधर छावनी में स्थित भारतीय सेना की 11वीं कोर जिसे 'वज्र कोर' (Vajra Corps) कहा जाता है, के अधीन कार्य करेगी।",
        questionEn: "Where is the headquarters of the 'Baaz' Drone Battalion located and under which corps will it operate?",
        answerEn: "It is headquartered at Jalandhar Cantonment in Punjab and operates under the Indian Army's 11 Corps, popularly known as the 'Vajra Corps'."
      },
      {
        _key: "faq3",
        question: "पंजाब सीमा पर 'बाज़' ड्रोन बटालियन की प्राथमिक जिम्मेदारी क्या होगी?",
        answer: "इसकी प्राथमिक जिम्मेदारी भारत-पाकिस्तान अंतर्राष्ट्रीय सीमा पर 24x7 हवाई निगरानी, सीमा पार से हथियारों व ड्रग्स की तस्करी रोकना और दुश्मन के घुसपैठिए ड्रोन को निष्क्रिय करना है।",
        questionEn: "What will be the primary operational role of the 'Baaz' Drone Battalion along the Punjab border?",
        answerEn: "Its primary role includes 24/7 aerial surveillance along the India-Pakistan border, curbing cross-border weapons/drug smuggling, and neutralizing hostile enemy drones."
      },
      {
        _key: "faq4",
        question: "इस ड्रोन बटालियन में किस प्रकार के ड्रोन और सिस्टम शामिल किए गए हैं?",
        answer: "इसमें इजरायली हेरॉन (Heron TP), सर्चर (Searcher Mark II), स्वदेशी FPV (First Person View) कामिकेज़/क्वाडकोप्टर ड्रोन, थर्मल इमेजर तथा एंटी-ड्रोन गन्स शामिल हैं।",
        questionEn: "What types of drones and technological systems are deployed in this battalion?",
        answerEn: "It deploys Israeli Heron TP, Searcher Mk-II, indigenous FPV kamikaze drones, multi-rotor quadcopters, thermal imaging systems, and anti-drone guns."
      },
      {
        _key: "faq5",
        question: "काउंटर-ड्रोन तकनीक (Counter-Drone Technology) क्या है और यह कैसे काम करती है?",
        answer: "काउंटर-ड्रोन तकनीक शत्रु ड्रोन का पता लगाने, ट्रैक करने और उन्हें रेडियो फ्रीक्वेंसी जैमिंग, लेज़र हथियार या स्निपर गन्स द्वारा निष्क्रिय करने की एक सुरक्षा प्रणाली है।",
        questionEn: "What is Counter-Drone technology and how does it function?",
        answerEn: "Counter-Drone technology is a security system designed to detect, track, and neutralize rogue drones using RF jamming, directional spoofing, or hard-kill lasers."
      },
      {
        _key: "faq6",
        question: "भारतीय नागरिक उड्डयन मंत्रालय के 'ड्रोन नियम 2021' (Drone Rules 2021) की मुख्य विशेषताएँ क्या हैं?",
        answer: "इसके तहत ड्रोन ज़ोन (रेड, येलो, ग्रीन) विभाजित किए गए हैं, लाइसेंस प्रक्रिया को सरल बनाया गया है तथा 500 किग्रा तक के पेलोड को इसमें शामिल किया गया है।",
        questionEn: "What are the key features of Ministry of Civil Aviation's Drone Rules 2021?",
        answerEn: "Drone Rules 2021 categorized airspace into Red, Yellow, and Green zones, simplified pilot licensing, and expanded coverage to drones up to 500 kg payload."
      },
      {
        _key: "faq7",
        question: "BSF और भारतीय सेना के बीच पंजाब सीमा सुरक्षा में क्या समन्वय है?",
        answer: "सीमा सुरक्षा बल (BSF) अग्रिम सीमा पुलिसिंग संभालती है, जबकि 'बाज़' ड्रोन बटालियन त्रि-स्तरीय (Three-tier) हवाई निगरानी और त्वरित स्ट्राइक क्षमता प्रदान करती है।",
        questionEn: "How do BSF and Indian Army coordinate along the Punjab border?",
        answerEn: "BSF handles frontline border policing, while the Army's 'Baaz' Battalion provides 3-tier aerial surveillance and rapid counter-strike capability."
      },
      {
        _key: "faq8",
        question: "MPPSC मुख्य परीक्षा Paper 3 Unit 7 में ड्रोन वॉरफेयर से संबंधित कौन-कौन से बिंदु महत्वपूर्ण हैं?",
        answer: "MPPSC मेंस में रोबोटिक्स, रक्षा प्रौद्योगिकी में एआई अनुप्रयोग, मानव रहित हवाई वाहन (UAVs) का सैन्य एवं नागरिक उपयोग तथा रक्षा आत्मनिर्भरता (मेक इन इंडिया) महत्वपूर्ण हैं।",
        questionEn: "What key points are important for MPPSC Mains Paper 3 Unit 7 regarding Drone Warfare?",
        answerEn: "Important areas include Robotics, AI in defense, military applications of UAVs, counter-drone systems, and indigenous defense manufacturing."
      },
      {
        _key: "faq9",
        question: "UPSC GS Paper 3 (आंतरिक सुरक्षा) के तहत सीमा पार ड्रोन खतरे के क्या समाधान हैं?",
        answer: "समाधानों में एंटी-ड्रोन ग्रिड की स्थापना, AI इमेजरी एनालिसिस, BSF-सेना-पुलिस संयुक्त इंटेलिजेंस शेयरिंग और 'मेक इन इंडिया' ड्रोन विनिर्माण को बढ़ावा देना शामिल है।",
        questionEn: "What solutions can be proposed for UPSC GS Paper 3 regarding cross-border drone threats?",
        answerEn: "Key measures include installing integrated anti-drone grids, AI imagery analysis, joint BSF-Army intelligence sharing, and boosting domestic defense tech."
      },
      {
        _key: "faq10",
        question: "भारतीय सेना का 'वज्र कोर' (Vajra Corps) किस ऐतिहासिक युद्ध की वीरगाथा के लिए प्रसिद्ध है?",
        answer: "जालंधर स्थित वज्र कोर 1965 और 1971 के भारत-पाक युद्धों में ऐतिहासिक जीत ('डिफेंडर्स ऑफ पंजाब') हासिल करने के लिए विख्यात है।",
        questionEn: "What historical battle legacy is the Indian Army's 'Vajra Corps' famous for?",
        answerEn: "Headquartered at Jalandhar, Vajra Corps is celebrated as the 'Defenders of Punjab' for its decisive victories in the 1965 and 1971 Indo-Pak wars."
      }
    ],

    mcqs: [
      {
        _key: "m1",
        question: "हाल ही में भारतीय सेना द्वारा पंजाब के जालंधर में गठित देश की पहली समर्पित ड्रोन बटालियन का क्या नाम रखा गया है?",
        questionEn: "What is the name of India's first dedicated Drone Battalion raised by the Indian Army in Jalandhar, Punjab?",
        options: [
          "बाज़ (Baaz)",
          "गरुड़ (Garuda)",
          "रुद्र (Rudra)",
          "अग्नि (Agni)"
        ],
        optionsEn: [
          "Baaz",
          "Garuda",
          "Rudra",
          "Agni"
        ],
        correctIndex: 0,
        explanation: "भारतीय सेना ने पंजाब के जालंधर स्थित 11वीं कोर (वज्र कोर) के तहत देश की पहली समर्पित ड्रोन बटालियन 'बाज़' (Baaz) का गठन किया है।",
        explanationEn: "The Indian Army established India's first dedicated Drone Battalion named 'Baaz' under the 11 Corps (Vajra Corps) at Jalandhar, Punjab."
      },
      {
        _key: "m2",
        question: "देश की पहली 'बाज़' ड्रोन बटालियन भारतीय सेना के किस कोर के अधीन संचालित होगी?",
        questionEn: "Under which Corps of the Indian Army will the country's first 'Baaz' Drone Battalion operate?",
        options: [
          "11वीं कोर (वज्र कोर, जालंधर)",
          "1 कोर (स्ट्राइक कोर, मथुरा)",
          "15 कोर (चिनार कोर, श्रीनगर)",
          "10 कोर (चेतक कोर, बठिंडा)"
        ],
        optionsEn: [
          "11 Corps (Vajra Corps, Jalandhar)",
          "1 Corps (Strike Corps, Mathura)",
          "15 Corps (Chinar Corps, Srinagar)",
          "10 Corps (Chetak Corps, Bathinda)"
        ],
        correctIndex: 0,
        explanation: "यह ऐतिहासिक ड्रोन बटालियन 11वीं वज्र कोर (Vajra Corps) के अंतर्गत पंजाब सीमा पर अग्रिम निगरानी एवं रक्षा अभियानों को संचालित करेगी।",
        explanationEn: "The Drone Battalion operates under the 11 Corps (Vajra Corps) based in Jalandhar to oversee Punjab border security operations."
      },
      {
        _key: "m3",
        question: "भारतीय रक्षा क्षेत्र में उपयोग होने वाले इजरायली 'हेरॉन' (Heron TP) ड्रोन का मुख्य कार्य क्या है?",
        questionEn: "What is the primary operational role of the Israeli 'Heron TP' drone used by Indian Armed Forces?",
        options: [
          "उच्च ऊँचाई पर लंबी अवधि तक निगरानी एवं टोह (MALE - Medium Altitude Long Endurance MISION)",
          "केवल माल ढुलाई",
          "समुद्री गोताखोरी",
          "केवल हवाई तस्वीरों की छपाई"
        ],
        optionsEn: [
          "Medium Altitude Long Endurance (MALE) high-altitude surveillance and reconnaissance",
          "Cargo transportation only",
          "Submarine diving",
          "Aerial photography printing only"
        ],
        correctIndex: 0,
        explanation: "हेरॉन (Heron) एक MALE (Medium Altitude Long Endurance) UAV है, जो 35,000 फीट की ऊंचाई पर 24 से 36 घंटे तक लगातार निगरानी करने में सक्षम है।",
        explanationEn: "Heron is a Medium Altitude Long Endurance (MALE) UAV capable of flying at altitudes over 35,000 ft for up to 36 hours continuous surveillance."
      },
      {
        _key: "m4",
        question: "भारत सरकार के 'ड्रोन नियम 2021' (Drone Rules 2021) के तहत किस हवाई क्षेत्र (Airspace) में उड़ान भरने हेतु पूर्व अनुमति की आवश्यकता नहीं होती है?",
        questionEn: "Under India's Drone Rules 2021, which airspace zone does NOT require prior flight permission?",
        options: [
          "ग्रीन ज़ोन (Green Zone)",
          "रेड ज़ोन (Red Zone)",
          "येलो ज़ोन (Yellow Zone)",
          "ऑरेंज ज़ोन (Orange Zone)"
        ],
        optionsEn: [
          "Green Zone",
          "Red Zone",
          "Yellow Zone",
          "Orange Zone"
        ],
        correctIndex: 0,
        explanation: "ड्रोन नियम 2021 के अनुसार 'ग्रीन ज़ोन' में 400 फीट तक की ऊंचाई तक बिना किसी पूर्व अनुमति के ड्रोन उड़ाने की अनुमति है।",
        explanationEn: "According to Drone Rules 2021, flying drones up to 400 feet in Green Zones does not require prior approval or flight permission."
      },
      {
        _key: "m5",
        question: "कामिकेज़ ड्रोन (Kamikaze Drone) / लोइटरिंग म्यूनिशन (Loitering Munition) की मुख्य विशेषता क्या होती है?",
        questionEn: "What is the key characteristic of a Kamikaze Drone or Loitering Munition?",
        options: [
          "लक्ष्य का पता लगाकर सीधे उससे टकराकर स्वयं को नष्ट कर विस्फोटक हमला करना",
          "केवल खाद्य आपूर्ति पहुँचाना",
          "यात्रियों को बैठाकर उड़ान भरना",
          "केवल उपग्रह सिग्नल रिले करना"
        ],
        optionsEn: [
          "Loitering over target area and self-destructing upon hitting the high-value target",
          "Delivering food parcels only",
          "Transporting civilian passengers",
          "Relaying satellite TV signals only"
        ],
        correctIndex: 0,
        explanation: "लोइटरिंग म्यूनिशन या कामिकेज़ ड्रोन लक्ष्य क्षेत्र के ऊपर मंडराता है और सटीक समय आने पर लक्ष्य से टकराकर आत्मघाती हमला (Suicide strike) करता है।",
        explanationEn: "Loitering munitions / Kamikaze drones hover around a target area and detonate upon impact with the target as precision-guided weapons."
      },
      {
        _key: "m6",
        question: "भारत-पाकिस्तान सीमा पर अवैध ड्रोन घुसपैठ और ड्रग्स तस्करी पर नज़र रखने वाली मुख्य सीमा सुरक्षा एजेंसी कौन सी है?",
        questionEn: "Which primary border guarding force monitors illegal drone incursions and drug smuggling along the India-Pakistan border?",
        options: [
          "सीमा सुरक्षा बल (BSF)",
          "केंद्रीय रिजर्व पुलिस बल (CRPF)",
          "आईटीबीपी (ITBP)",
          "सीआईएसएफ (CISF)"
        ],
        optionsEn: [
          "Border Security Force (BSF)",
          "Central Reserve Police Force (CRPF)",
          "Indo-Tibetan Border Police (ITBP)",
          "Central Industrial Security Force (CISF)"
        ],
        correctIndex: 0,
        explanation: "भारत-पाकिस्तान की 3,323 किमी लंबी अंतर्राष्ट्रीय सीमा (पंजाब एवं राजस्थान सहित) की सुरक्षा की प्राथमिक जिम्मेदारी BSF की है।",
        explanationEn: "The Border Security Force (BSF) is the primary border guarding agency responsible for securing the 3,323 km India-Pakistan border."
      },
      {
        _key: "m7",
        question: "एंटी-ड्रोन तकनीक (Anti-Drone System) में 'सॉफ्ट किल' (Soft-Kill) उपाय का क्या तात्पर्य है?",
        questionEn: "What does a 'Soft-Kill' measure refer to in Counter-Drone / Anti-Drone systems?",
        options: [
          "रेडियो फ्रीक्वेंसी (RF) जैमिंग या जीपीएस स्पूफिंग द्वारा ड्रोन को बिना भौतिक क्षति के नियंत्रित या निष्क्रिय करना",
          "मिसाइल दागकर ड्रोन को हवा में नष्ट करना",
          "लेजर बीम से ड्रोन को जला देना",
          "नेट गन से ड्रोन को पकड़ना"
        ],
        optionsEn: [
          "Disabling or hijacking the drone electronically via RF jamming or GPS spoofing without physical destruction",
          "Firing a missile to blow up the drone in mid-air",
          "Melting the drone frame using high-energy laser beams",
          "Capturing the drone with a physical net gun"
        ],
        correctIndex: 0,
        explanation: "सॉफ्ट-किल में इलेक्ट्रॉनिक युद्ध (EW), RF जैमिंग और GPS स्पूफिंग का प्रयोग कर ड्रोन के सिग्नल काट दिए जाते हैं, जबकि हार्ड-किल (Hard-kill) में भौतिक मिसाइल/लेजर से नष्ट किया जाता है।",
        explanationEn: "Soft-kill relies on electronic warfare, RF jamming, and GPS spoofing to sever control links, whereas hard-kill physically destroys the target."
      },
      {
        _key: "m8",
        question: "MPPSC मेंस परीक्षा हेतु 'रक्षा प्रौद्योगिकी और ड्रोन रोबोटिक्स' किस प्रश्न पत्र के अंतर्गत शामिल है?",
        questionEn: "Which MPPSC Mains paper covers 'Defense Technology and Drone Robotics'?",
        options: [
          "Paper 3 (विज्ञान एवं प्रौद्योगिकी, Unit 7)",
          "Paper 1 (इतिहास एवं भूगोल)",
          "Paper 4 (नीतिशास्त्र)",
          "Paper 2 (राजव्यवस्था एवं अर्थव्यवस्था)"
        ],
        optionsEn: [
          "Paper 3 (Science & Technology, Unit 7)",
          "Paper 1 (History & Geography)",
          "Paper 4 (Ethics & Human Values)",
          "Paper 2 (Polity & Economics)"
        ],
        correctIndex: 0,
        explanation: "MPPSC मुख्य परीक्षा का Paper 3 Unit 7 रोबोटिक्स, कृत्रिम बुद्धिमत्ता (AI) और रक्षा प्रौद्योगिकी के अनुप्रयोगों से संबंधित है।",
        explanationEn: "MPPSC Mains Paper 3 Unit 7 specifically assesses Robotics, Artificial Intelligence, and Defense Technology innovations."
      }
    ]
  };

  const res = await sanityClient.patch(docId).set(updatedDoc).commit();
  console.log("✅ Successfully updated Sanity document:", res._id);
  console.log("👉 New Title (Hi):", res.title);
  console.log("👉 New Title (En):", res.titleEn);
  console.log("👉 New SEO Title (Hi):", res.seoTitle);
}

optimizeDroneBattalionSEO().catch((err) => {
  console.error("❌ Failed to update Sanity doc:", err);
  process.exit(1);
});
