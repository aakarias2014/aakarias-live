import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

// Load env.local explicitly
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || dataset === undefined || !token) {
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

function createBlocks(paragraphs: string[], style: "normal" | "h3" = "normal") {
  return paragraphs.map((text, idx) => ({
    _key: `blk-${Math.random().toString(36).substring(2, 9)}-${idx}`,
    _type: "block",
    style,
    children: [
      {
        _key: `spn-${Math.random().toString(36).substring(2, 9)}-${idx}`,
        _type: "span",
        text,
      },
    ],
  }));
}

async function main() {
  console.log("🧹 Cleaning body text & moving all PAA questions into interactive Collapsible FAQ Accordion for Exercise Amogh Jwala 2026...");

  const docId = "ca-exercise-amogh-jwala-2026";
  const slug = "exercise-amogh-jwala-2026-indian-army-uttar-pradesh";

  const titleHi = "अमोघ ज्वाला अभ्यास 2026: बबीना फील्ड फायरिंग रेंज झांसी में भारतीय सेना का युद्ध अभ्यास — MPPSC व UPSC विश्लेषण";
  const titleEn = "Exercise Amogh Jwala 2026: Indian Army Southern Command Combat Drill in Babina Firing Range — MPPSC & UPSC Notes";

  const excerptHi = "भारतीय सेना की दक्षिणी कमान द्वारा 6 से 18 मार्च 2026 तक बबीना फील्ड फायरिंग रेंज (झांसी, उत्तर प्रदेश) में आयोजित 'अमोघ ज्वाला अभ्यास 2026' का विस्तृत परीक्षा विश्लेषण। जानिए शौर्य स्क्वाड्रन, एपाचे हेलीकॉप्टर व MPPSC/UPSC नोट्स।";
  const excerptEn = "Complete analysis of Exercise Amogh Jwala 2026 conducted by Indian Army's Southern Command at Babina Field Firing Ranges, Jhansi (UP) from March 6 to 18, 2026. Includes Shaurya Squadrons, Apache helicopters & MPPSC/UPSC notes.";

  const keywords = [
    "अमोघ ज्वाला अभ्यास 2026",
    "Exercise Amogh Jwala 2026",
    "बबीना फील्ड फायरिंग रेंज",
    "Babina Field Firing Ranges Jhansi",
    "भारतीय सेना दक्षिणी कमान",
    "लेफ्टिनेंट जनरल धीरज सेठ",
    "शौर्य स्क्वाड्रन",
    "Shaurya Squadrons Indian Army",
    "2026 में भारत के प्रमुख सैन्य अभ्यास",
    "अमोघ ज्वाला अभ्यास क्या है",
    "बबीना फील्ड फायरिंग रेंज कहाँ स्थित है",
    "MPPSC Current Affairs 2026",
    "UPSC GS3 Defence Security",
    "Aakar IAS Amogh Jwala",
  ];

  // Professional, natural academic sections (No raw PAA text blocks)
  const sections = [
    {
      _key: "sec-whyInNews",
      kind: "whyInNews",
      title: "चर्चा में क्यों?",
      titleEn: "Why in News?",
      body: createBlocks([
        "भारतीय सेना की दक्षिणी कमान (Southern Command) द्वारा 6 मार्च से 18 मार्च 2026 तक उत्तर प्रदेश के झांसी जिले में स्थित बबीना फील्ड फायरिंग रेंज (Babina Field Firing Ranges) में 13 दिवसीय बहु-क्षेत्रीय (Multi-Domain) युद्ध अभ्यास 'अमोघ ज्वाला 2026' (Exercise Amogh Jwala 2026) का सफल आयोजन किया गया।",
        "इस अभ्यास का अवलोकन दक्षिणी कमान के जनरल ऑफिसर कमांडिंग-इन-चीफ (GOC-in-C) लेफ्टिनेंट जनरल धीरज सेठ द्वारा किया गया। अभ्यास का मुख्य उद्देश्य प्रौद्योगिकी-आधारित यंत्रीकृत (मशीनीकृत) युद्ध क्षमताओं, रात्रि-युद्ध तकनीकों और लाइव-फायर नेटवर्क समन्वय को सत्यापित करना था।",
        "• अभ्यास का नाम: अमोघ ज्वाला अभ्यास 2026 (Exercise Amogh Jwala)",
        "• आयोजन तिथि: 6 मार्च से 18 मार्च 2026 (13 दिवसीय सैन्य अभ्यास)",
        "• आयोजन स्थल: बबीना फील्ड फायरिंग रेंज, झांसी (उत्तर प्रदेश - एमपी बुंदेलखंड सीमा)",
        "• आयोजक कमान: भारतीय सेना की दक्षिणी कमान (पुणे)",
        "• समीक्षा अधिकारी: लेफ्टिनेंट जनरल धीरज सेठ (GOC-in-C Southern Command)",
        "• प्रमुख हथियार: T-90 भीष्म, T-72 टैंक, BMP-2 कॉम्बैट वाहन, एपाचे (Apache) अटैक हेलीकॉप्टर, शौर्य स्क्वाड्रन (Shaurya Squadrons), कामिकेज़ लॉइटरिंग म्यूनिशन और D4 एंटी-ड्रोन प्रणालियां।"
      ]),
      bodyEn: createBlocks([
        "The Indian Army's Southern Command successfully conducted a 13-day high-tempo multi-domain combat exercise named 'Exercise Amogh Jwala 2026' from March 6 to March 18, 2026, at the Babina Field Firing Ranges in Jhansi district, Uttar Pradesh.",
        "The exercise was reviewed by Lieutenant General Dhiraj Seth, General Officer Commanding-in-Chief (GOC-in-C) of Southern Command. It focused on validating technology-driven mechanized warfare capabilities, multi-domain battlefield transparency, and integrated live firepower.",
        "• Exercise Name: Exercise Amogh Jwala 2026",
        "• Operational Window: March 6 to March 18, 2026 (13 Days)",
        "• Location: Babina Field Firing Ranges, Jhansi, Uttar Pradesh (Near MP Bundelkhand border)",
        "• Organizing Command: Southern Command, Indian Army (HQ Pune)",
        "• Reviewing Officer: Lieutenant General Dhiraj Seth (GOC-in-C Southern Command)",
        "• Key Assets Deployed: T-90 Bhishma & T-72 MBTs, BMP-2 ICVs, Apache Attack Helicopters, Shaurya Squadrons, Kamikaze Loitering Munitions, and D4 Anti-Drone Jamming Arrays."
      ]),
    },
    {
      _key: "sec-keyHighlights",
      kind: "keyHighlights",
      title: "अमोघ ज्वाला 2026 की प्रमुख विशेषताएं एवं तकनीकी प्रदर्शन",
      titleEn: "Key Highlights & Technology Maneuvers of Amogh Jwala 2026",
      body: createBlocks([
        "• शौर्य स्क्वाड्रन का परिचालन प्रदर्शन: इस अभ्यास में भारतीय सेना द्वारा नव-गठित 'शौर्य स्क्वाड्रन' (Shaurya Squadrons) की युद्ध क्षमताओं का सफल परीक्षण किया गया। शौर्य स्क्वाड्रन बख्तरबंद टैंक रेजिमेंटों में सीधे ड्रोन-आधारित रियल-टाइम सर्विलांस और सटीक मिसाइल हमले की क्षमता जोड़ते हैं।",
        "• एकीकृत मारक क्षमता (Integrated Combined Arms Firepower): T-90 भीष्म और T-72 मुख्य युद्धक टैंकों, BMP-2 इंफैंट्री कॉम्बैट वाहनों, बोफोर्स व के-9 वज्र तोपखाने और एपाचे अटैक हेलीकॉप्टरों का एक साथ सटीक लाइव-फायर समन्वय प्रदर्शित किया गया।",
        "• लॉइटरिंग म्यूनिशन व एंटी-ड्रोन प्रणाली: अभ्यास में स्वदेशी 'कामिकेज़' आत्मघाती ड्रोनों (Loitering Munitions) तथा रेडियो फ्रीक्वेंसी (RF) जैमिंग पर आधारित एंटी-ड्रोन प्रणालियों का प्रभावी परीक्षण हुआ।",
        "• रात्रि-युद्ध क्षमता (Night-Combat Readiness): थर्मल इमेजिंग, नाइट-विज़न साइट्स और सैटेलाइट डेटा लिंक के माध्यम से रात के अंधेरे में पिन-पॉइंट टारगेट एक्विजिशन और स्ट्राइक मिशन संचालित किए गए।"
      ]),
      bodyEn: createBlocks([
        "• Operational Testing of Shaurya Squadrons: Highlighted the successful combat integration of the Army's newly raised 'Shaurya Squadrons', embedding real-time drone surveillance and precision strike capabilities directly into tank regiments.",
        "• Integrated Combined Arms Firepower: Synchronized maneuvers combining T-90 Bhishma and T-72 MBTs, BMP-2 infantry combat vehicles, heavy artillery, and Apache attack helicopters.",
        "• Loitering Munitions & Counter-Drone Warfare: Deployment of indigenous kamikaze suicide drones alongside advanced radio-frequency anti-drone electronic jamming systems.",
        "• Night Combat & Battlefield Transparency: Precision strike maneuvers conducted under total darkness utilizing thermal imaging sights and real-time satellite data links."
      ]),
    },
    {
      _key: "sec-background",
      kind: "background",
      title: "बबीना फील्ड फायरिंग रेंज का सामरिक महत्व एवं मध्य प्रदेश से जुड़ाव",
      titleEn: "Strategic Importance of Babina Firing Range & MP Military Connection",
      body: createBlocks([
        "• बबीना फील्ड फायरिंग रेंज (झांसी): उत्तर प्रदेश के झांसी जिले में स्थित बबीना कैंट और फायरिंग रेंज भारतीय सेना का बख्तरबंद (Armoured) और मैकेनाइज्ड इन्फैंट्री अभ्यासों का सबसे प्रमुख स्थल है। यह मध्य प्रदेश के निवाड़ी, टीकमगढ़ और दतिया जिलों की सीमा से सटा हुआ है।",
        "• प्रमुख फील्ड फायरिंग रेंज (तुलनात्मक तथ्य):",
        "  - बबीना फील्ड फायरिंग रेंज: झांसी (उत्तर प्रदेश/एमपी सीमा) - बख्तरबंद व तोपखाना अभ्यास",
        "  - महाजन फील्ड फायरिंग रेंज: बीकानेर (राजस्थान) - मरुस्थलीय व संयुक्त अंतर्राष्ट्रीय अभ्यास",
        "  - पोकरण फायरिंग रेंज: जैसलमेर (राजस्थान) - मिसाइल व लाइव-फायर परीक्षण",
        "• मध्य प्रदेश में स्थित प्रमुख सैन्य इकाइयां:",
        "  1. 21 स्ट्राइक कोर (सुदर्शन चक्र कोर): मुख्यालय भोपाल, मध्य प्रदेश।",
        "  2. महू छावनी (डॉ. अम्बेडकर नगर, इंदौर): इन्फैंट्री स्कूल, आर्मी वॉर कॉलेज (Army War College) और एमसीटीई।",
        "  3. जबलपुर सैन्य केंद्र: 506 आर्मी वर्कशॉप, सिग्नल कोर और ऑर्डनेंस फैक्ट्री खमरिया (OFK)।"
      ]),
      bodyEn: createBlocks([
        "• Babina Field Firing Ranges (Jhansi): Situated in Jhansi district (bordering MP's Niwari and Tikamgarh districts), Babina is India's premier facility for heavy armored and mechanized infantry drills.",
        "• Major Firing Ranges Comparison:",
        "  - Babina Firing Range: Jhansi (UP/MP border) - Heavy Armored & Artillery Drills",
        "  - Mahajan Firing Range: Bikaner (Rajasthan) - Desert & Joint International Exercises",
        "  - Pokhran Firing Range: Jaisalmer (Rajasthan) - Live Missile & Ordnance Testing",
        "• Key Military Establishments in Madhya Pradesh:",
        "  1. 21 Strike Corps (Sudarshan Chakra Corps): HQ in Bhopal, MP.",
        "  2. Mhow Cantonment (Indore): Army Infantry School, Army War College, and MCTE.",
        "  3. Jabalpur Defence Hub: 506 Army Workshop, Signal Corps, and Ordnance Factory Khamaria."
      ]),
    },
    {
      _key: "sec-syllabusInterlinking",
      kind: "syllabusInterlinking",
      title: "MPPSC एवं UPSC परीक्षा जुड़ाव",
      titleEn: "MPPSC & UPSC Syllabus Interlinking",
      body: createBlocks([
        "• MPPSC मुख्य परीक्षा: पेपर 3 (इकाई 7) - 'विज्ञान एवं प्रौद्योगिकी, रक्षा प्रौद्योगिकी, स्वदेशीकरण' तथा पेपर 2 - 'राष्ट्रीय सुरक्षा व सीमा सुरक्षा'।",
        "• UPSC मुख्य परीक्षा: GS Paper 3 - 'सुरक्षा चुनौतियां, एकीकृत थिएटर कमान, इलेक्ट्रॉनिक वॉरफेयर और आधुनिक सैन्य अभ्यास'।",
        "• प्रारंभिक परीक्षा तथ्य: बबीना फायरिंग रेंज (झांसी), सुदर्शन चक्र कोर (भोपाल), इन्फैंट्री स्कूल (महू, इंदौर), दक्षिणी कमान (पुणे), और लॉइटरिंग म्यूनिशन का अर्थ।"
      ]),
      bodyEn: createBlocks([
        "• MPPSC Mains: Paper 3 (Unit 7) - Defence Technology, Indigenization of Weapons & Modern Security Architecture.",
        "• UPSC Mains: GS Paper 3 - Security Challenges, Integrated Theatre Commands & Electronic Warfare Capabilities.",
        "• Prelims Quick Facts: Babina Ranges, Sudarshan Chakra Corps (Bhopal), Army War College (Mhow), and Loitering Munition mechanisms."
      ]),
    },
    {
      _key: "sec-seoInterlinks",
      kind: "syllabusInterlinking",
      title: "📌 संबंधित महत्वपूर्ण अध्ययन सामग्री एवं उपयोगी लिंक",
      titleEn: "📌 Related Exam Study Material & Links",
      body: createBlocks([
        "• पूर्वी सीमा सुरक्षा: [किबिथू सेक्टर में पहली बार भारत-चीन कोर कमांडर वार्ता](/current-affairs/india-china-corps-commander-talks-kibithu-sector-2026)",
        "• ड्रोन सर्विलांस तकनीक: [पंजाब में स्थापित देश की पहली ड्रोन बटालियन व शौर्य स्क्वाड्रन सर्विलांस](/current-affairs/indias-first-drone-battalion-punjab-2026)",
        "• एमपीपीएससी परीक्षा पोर्टल: [MPPSC मुख्य परीक्षा पेपर-3 रक्षा एवं वैज्ञानिक तकनीक नोट्स](/mppsc-notes) | [MPPSC Current Affairs Hub](/mppsc-current-affairs)"
      ]),
      bodyEn: createBlocks([
        "• Eastern Border Security: [India-China Military Talks in Kibithu Sector](/current-affairs/india-china-corps-commander-talks-kibithu-sector-2026)",
        "• Tactical Drone Tech: [India's First Drone Battalion Operations in Punjab](/current-affairs/indias-first-drone-battalion-punjab-2026)",
        "• MPPSC Study Notes: [MPPSC Paper 3 Defence & Science Notes](/mppsc-notes)"
      ]),
    },
  ];

  // 10 High-Value Interactive Collapsible FAQs (generates FAQPage JSON-LD schema & interactive accordion)
  const faqs = [
    { _key: "f1", question: "अमोघ ज्वाला अभ्यास 2026 क्या है?", answer: "यह भारतीय सेना की दक्षिणी कमान द्वारा मार्च 2026 में बबीना फील्ड फायरिंग रेंज (झांसी) में आयोजित 13 दिवसीय बहु-क्षेत्रीय युद्ध अभ्यास है, जिसमें टैंक, हेलीकॉप्टर, ड्रोन और तोपखाने का एकीकृत प्रदर्शन किया गया।", questionEn: "What is Exercise Amogh Jwala 2026?", answerEn: "A 13-day multi-domain combat exercise conducted by the Indian Army's Southern Command at Babina Firing Ranges (Jhansi) in March 2026." },
    { _key: "f2", question: "बबीना फील्ड फायरिंग रेंज कहाँ स्थित है?", answer: "बबीना फील्ड फायरिंग रेंज उत्तर प्रदेश के झांसी जिले में स्थित है, जो मध्य प्रदेश (निवाड़ी व टीकमगढ़) की सीमा से सटा हुआ है।", questionEn: "Where is Babina Field Firing Range located?", answerEn: "In Jhansi district, Uttar Pradesh, near the Madhya Pradesh border." },
    { _key: "f3", question: "अमोघ ज्वाला अभ्यास 2026 की समीक्षा किस वरिष्ठ अधिकारी ने की?", answer: "भारतीय सेना की दक्षिणी कमान के जनरल ऑफिसर कमांडिंग-इन-चीफ (GOC-in-C) लेफ्टिनेंट जनरल धीरज सेठ ने अभ्यास का अवलोकन किया।", questionEn: "Who reviewed Exercise Amogh Jwala 2026?", answerEn: "Lieutenant General Dhiraj Seth, GOC-in-C of Southern Command." },
    { _key: "f4", question: "सेना के 'शौर्य स्क्वाड्रन' (Shaurya Squadrons) की क्या भूमिका है?", answer: "शौर्य स्क्वाड्रन बख्तरबंद टैंक रेजिमेंटों में ड्रोन सर्विलांस और सटीक मिसाइल हमलों को एकीकृत करने वाली विशेष इकाइयां हैं।", questionEn: "What is the operational role of Shaurya Squadrons?", answerEn: "Shaurya Squadrons integrate real-time drone surveillance and precision strike capabilities into tank regiments." },
    { _key: "f5", question: "मध्य प्रदेश के किस शहर में भारतीय सेना की 21 स्ट्राइक कोर स्थित है?", answer: "मध्य प्रदेश की राजधानी भोपाल में भारतीय सेना की '21 स्ट्राइक कोर' (सुदर्शन चक्र कोर) का मुख्यालय स्थित है।", questionEn: "Which MP city houses the 21 Strike Corps HQ?", answerEn: "Bhopal, Madhya Pradesh houses the Sudarshan Chakra Corps (21 Corps) HQ." },
    { _key: "f6", question: "लॉइटरिंग म्यूनिशन (Loitering Munitions) क्या होते हैं?", answer: "ये ऐसे कामिकेज़ आत्मघाती ड्रोन होते हैं जो लक्ष्य क्षेत्र के ऊपर मंडराते हैं और लक्ष्य की पहचान होते ही उस पर हमला करके नष्ट हो जाते हैं।", questionEn: "What are Loitering Munitions?", answerEn: "Also known as suicide/kamikaze drones, they hover around a target area and strike directly upon identifying the target." },
    { _key: "f7", question: "महू (Mhow) सैन्य छावनी किस जिले में स्थित है?", answer: "महू (डॉ. अम्बेडकर नगर) मध्य प्रदेश के इंदौर जिले में स्थित एक प्रमुख सैन्य छावनी, इन्फैंट्री स्कूल और आर्मी वॉर कॉलेज है।", questionEn: "In which district is Mhow Cantonment located?", answerEn: "Mhow (Dr. Ambedkar Nagar) is located in Indore district, Madhya Pradesh." },
    { _key: "f8", question: "महाजन और पोकरण फायरिंग रेंज किस राज्य में स्थित हैं?", answer: "महाजन फील्ड फायरिंग रेंज (बीकानेर) और पोकरण रेंज (जैसलमेर) दोनों राजस्थान राज्य में स्थित हैं।", questionEn: "In which state are Mahajan and Pokhran firing ranges located?", answerEn: "Both Mahajan (Bikaner) and Pokhran (Jaisalmer) firing ranges are located in Rajasthan." },
    { _key: "f9", question: "भारतीय सेना की दक्षिणी कमान (Southern Command) का मुख्यालय कहां है?", answer: "भारतीय सेना की दक्षिणी कमान का मुख्यालय पुणे (महाराष्ट्र) में स्थित है।", questionEn: "Where is the Headquarters of the Southern Command located?", answerEn: "Headquarters Southern Command is located in Pune, Maharashtra." },
    { _key: "f10", question: "अमोघ ज्वाला अभ्यास की आधिकारिक आयोजन तिथि क्या थी?", answer: "यह 13 दिवसीय सैन्य अभ्यास 6 मार्च से 18 मार्च 2026 तक संचालित किया गया था।", questionEn: "What were the official dates for Exercise Amogh Jwala 2026?", answerEn: "The 13-day exercise took place from March 6 to March 18, 2026." },
  ];

  const mcqs = [
    {
      _key: "m1",
      question: "भारतीय सेना की दक्षिणी कमान द्वारा 6 से 18 मार्च 2026 तक 'अमोघ ज्वाला अभ्यास 2026' का आयोजन कहाँ किया गया?",
      questionEn: "Where was 'Exercise Amogh Jwala 2026' conducted by the Indian Army's Southern Command from March 6 to 18, 2026?",
      options: ["पोकरण रेंज (राजस्थान)", "बबीना फील्ड फायरिंग रेंज, झांसी (उत्तर प्रदेश)", "महू कैंट (मध्य प्रदेश)", "महाजन रेंज (राजस्थान)"],
      optionsEn: ["Pokhran Ranges", "Babina Field Firing Ranges, Jhansi (UP)", "Mhow Cantt (MP)", "Mahajan Ranges"],
      correctIndex: 1,
      explanation: "अमोघ ज्वाला अभ्यास 2026 का आयोजन उत्तर प्रदेश के झांसी जिले में स्थित बबीना फील्ड फायरिंग रेंज में 6 से 18 मार्च 2026 तक किया गया।",
      explanationEn: "Exercise Amogh Jwala 2026 took place at Babina Field Firing Ranges in Jhansi district, Uttar Pradesh.",
    },
    {
      _key: "m2",
      question: "अमोघ ज्वाला अभ्यास 2026 का अवलोकन भारतीय सेना की किस कमान के प्रमुख लेफ्टिनेंट जनरल धीरज सेठ ने किया?",
      questionEn: "Lieutenant General Dhiraj Seth, who reviewed Exercise Amogh Jwala 2026, is the Commander of which Army Command?",
      options: ["पूर्वी कमान", "दक्षिणी कमान (Southern Command)", "पश्चिमी कमान", "मध्य कमान"],
      optionsEn: ["Eastern Command", "Southern Command", "Western Command", "Central Command"],
      correctIndex: 1,
      explanation: "दक्षिणी कमान (मुख्यालय पुणे) के जनरल ऑफिसर कमांडिंग-इन-चीफ लेफ्टिनेंट जनरल धीरज सेठ ने अभ्यास की समीक्षा की।",
      explanationEn: "Lt. Gen. Dhiraj Seth is the GOC-in-C of Southern Command (HQ Pune).",
    },
    {
      _key: "m3",
      question: "टैंक और बख्तरबंद रेजिमेंटों में ड्रोन सर्विलांस और सटीक हमले को एकीकृत करने हेतु गठित विशेष सैन्य इकाइयों को क्या कहा जाता है?",
      questionEn: "What are the specialized Army units embedding drone surveillance and precision strikes into tank regiments called?",
      options: ["गरुड़ स्क्वाड्रन", "शौर्य स्क्वाड्रन (Shaurya Squadrons)", "अग्नि स्क्वाड्रन", "वज्र स्क्वाड्रन"],
      optionsEn: ["Garud Squadrons", "Shaurya Squadrons", "Agni Squadrons", "Vajra Squadrons"],
      correctIndex: 1,
      explanation: "अमोघ ज्वाला अभ्यास में सेना के 'शौर्य स्क्वाड्रन' के परिचालन कौशल का प्रदर्शन किया गया।",
      explanationEn: "Shaurya Squadrons embed real-time drone capabilities into armored regiments.",
    },
    {
      _key: "m4",
      question: "मध्य प्रदेश के किस शहर में भारतीय सेना की 'सुदर्शन चक्र' (21 स्ट्राइक कोर) का मुख्यालय स्थित है?",
      questionEn: "In which MP city is the Headquarters of Sudarshan Chakra Corps (21 Corps) located?",
      options: ["इंदौर", "ग्वालियर", "भोपाल", "जबलपुर"],
      optionsEn: ["Indore", "Gwalior", "Bhopal", "Jabalpur"],
      correctIndex: 2,
      explanation: "21 स्ट्राइक कोर (सुदर्शन चक्र कोर) का मुख्यालय भोपाल, मध्य प्रदेश में स्थित है।",
      explanationEn: "Sudarshan Chakra Corps (21 Corps) HQ is located in Bhopal, MP.",
    },
    {
      _key: "m5",
      question: "सैन्य शब्दावली में 'लॉइटरिंग म्यूनिशन' (Loitering Munition) का क्या तात्पर्य है?",
      questionEn: "In military terminology, what does 'Loitering Munition' mean?",
      options: ["बैलिस्टिक मिसाइल", "आत्मघाती हमलावर कामिकेज़ ड्रोन (Kamikaze Drone)", "पनडुब्बी रोधी टॉरपीडो", "एंटी-एयरक्राफ्ट गन"],
      optionsEn: ["Ballistic Missile", "Kamikaze / Suicide Drone", "Anti-submarine Torpedo", "Anti-aircraft Gun"],
      correctIndex: 1,
      explanation: "लॉइटरिंग म्यूनिशन ऐसे ड्रोन होते हैं जो हवा में मंडराकर लक्ष्य पर आत्मघाती सटीक हमला करते हैं।",
      explanationEn: "Loitering munitions hover over targets and act as kamikaze strike weapons.",
    },
    {
      _key: "m6",
      question: "भारतीय सेना के इन्फैंट्री स्कूल और आर्मी वॉर कॉलेज मध्य प्रदेश के किस जिले में स्थित हैं?",
      questionEn: "The Infantry School and Army War College are situated in which district of MP?",
      options: ["जबलपुर", "इंदौर (महू)", "सागर", "रीवा"],
      optionsEn: ["Jabalpur", "Indore (Mhow)", "Sagar", "Rewa"],
      correctIndex: 1,
      explanation: "आर्मी वॉर कॉलेज और इन्फैंट्री स्कूल इंदौर जिले के महू (डॉ. अम्बेडकर नगर) में स्थित हैं।",
      explanationEn: "Army War College and Infantry School are located in Mhow, Indore district, MP.",
    },
    {
      _key: "m7",
      question: "राजस्थान के बीकानेर जिले में स्थित प्रमुख भारतीय सैन्य अभ्यास स्थल का क्या नाम है?",
      questionEn: "What is the name of the major military firing range located in Bikaner district of Rajasthan?",
      options: ["बबीना रेंज", "महाजन फील्ड फायरिंग रेंज (Mahajan Range)", "पोकरण रेंज", "अहमदनगर रेंज"],
      optionsEn: ["Babina Range", "Mahajan Field Firing Range", "Pokhran Range", "Ahmednagar Range"],
      correctIndex: 1,
      explanation: "महाजन फील्ड फायरिंग रेंज राजस्थान के बीकानेर जिले में स्थित है।",
      explanationEn: "Mahajan Field Firing Range is located in Bikaner, Rajasthan.",
    },
    {
      _key: "m8",
      question: "MPPSC मुख्य परीक्षा पेपर-3 में 'रक्षा प्रौद्योगिकी' किस इकाई (Unit) का हिस्सा है?",
      questionEn: "Under which Unit of MPPSC Mains Paper 3 is 'Defence Technology' included?",
      options: ["इकाई 1", "इकाई 4", "इकाई 7", "इकाई 10"],
      optionsEn: ["Unit 1", "Unit 4", "Unit 7", "Unit 10"],
      correctIndex: 2,
      explanation: "MPPSC मुख्य परीक्षा के संशोधित पाठ्यक्रम में पेपर-3 की इकाई 7 में विज्ञान, प्रौद्योगिकी और रक्षा तकनीक शामिल है।",
      explanationEn: "Defence technology and science & tech are prescribed under Unit 7 of MPPSC Mains Paper 3.",
    },
  ];

  // Combined body array
  const allHiBlocks: any[] = [];
  const allEnBlocks: any[] = [];
  for (const sec of sections) {
    allHiBlocks.push({
      _key: `h-${sec._key}`,
      _type: "block",
      style: "h2",
      children: [{ _key: `spnh-${sec._key}`, _type: "span", text: sec.title }]
    });
    if (sec.body) allHiBlocks.push(...sec.body);

    allEnBlocks.push({
      _key: `h-en-${sec._key}`,
      _type: "block",
      style: "h2",
      children: [{ _key: `spnh-en-${sec._key}`, _type: "span", text: sec.titleEn || sec.title }]
    });
    if (sec.bodyEn) allEnBlocks.push(...sec.bodyEn);
  }

  const patchData = {
    title: titleHi,
    titleEn,
    excerpt: excerptHi,
    excerptEn,
    keywords,
    sections,
    body: allHiBlocks,
    bodyEn: allEnBlocks,
    faqs,
    mcqs,
    publishedAt: new Date().toISOString(),
  };

  await client.patch(docId).set(patchData).commit();
  console.log(`🎉 Body cleaned & all PAA questions moved into Collapsible FAQ Accordion for: ${slug}!`);
}

main().catch((err) => {
  console.error("❌ Error running cleanup script:", err);
  process.exit(1);
});
