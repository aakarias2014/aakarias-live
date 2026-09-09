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
  console.log("🚀 Starting High-Authority 2-Way Interlinking & SEO Optimization for Vikram-1 Rocket Article...");

  const targetSlug = "vikram-1-orbital-rocket-skyroot-aerospace-launch";
  const legacySlug = "vikram-1-orbital-rocket-skyroot";

  const authorRef = { _type: "reference", _ref: "author-aakar" };
  const tagRefs = [
    { _type: "reference", _ref: "tag-mppsc" },
    { _type: "reference", _ref: "tag-upsc" },
    { _type: "reference", _ref: "tag-prelims" },
    { _type: "reference", _ref: "tag-mains" },
    { _type: "reference", _ref: "tag-scitech" },
  ];

  const fullBodyHi = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "भारतीय निजी अंतरिक्ष क्षेत्र (Commercial Space Sector) ने उस समय एक ऐतिहासिक मील का पत्थर हासिल किया जब हैदराबाद स्थित एयरोस्पेस स्टार्ट-अप **स्काईरूट एयरोस्पेस (Skyroot Aerospace)** ने भारत के पहले निजी ऑर्बिटल रॉकेट **'विक्रम-1' (Vikram-1 Orbital Rocket)** के सफल प्रक्षेपण की घोषणा की। यह रॉकेट 480 किलोग्राम पेलोड को निम्न पृथ्वी कक्षा (Low Earth Orbit - LEO) में स्थापित करने में सक्षम है। भारत सरकार द्वारा **IN-SPACe (इंडियन नेशनल स्पेस संवर्धन और प्राधिकरण केंद्र)** के गठन के बाद यह भारत का सबसे बड़ा निजी अंतरिक्ष अभियान है। यह लेख **MPPSC (Mains Paper 3 Unit 7)** और **UPSC (GS-3 Science & Tech)** के परीक्षार्थियों हेतु अत्यंत महत्वपूर्ण है।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "संबंधित उच्च-अथॉरिटी लेख (Key Interlinked Articles)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• [**ISRO GSLV-F17 EOS-05 सैटेलाइट लॉन्च लाइव विवरण**](/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026): सतीश धवन अंतरिक्ष केंद्र लॉन्च व 36,000 किमी कक्षा इमेजरी।\n" },
        { _type: "span", text: "• [**ISRO GSLV-F17 EOS-05 मिशन 2026 संपूर्ण विश्लेषण**](/current-affairs/isro-gslv-f17-eos-05-mission-2026): स्वदेशी CUS क्रायोजेनिक इंजन व पेलोड तकनीक।\n" },
        { _type: "span", text: "• [**विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र (आंध्र प्रदेश)**](/current-affairs/worlds-first-autonomous-shipbuilding-centre-andhra-pradesh-2026): नेल्लोर जुब्वलादिन्ने हाई-टेक शिपयार्ड व AI शिप्स।\n" },
        { _type: "span", text: "• [**भारत की पहली ड्रोन बटालियन 'बाज़' (पंजाब)**](/current-affairs/indias-first-drone-battalion-punjab-2026): जालंधर वज्र कोर एवं BSF सीमा सुरक्षा तकनीक।\n" },
        { _type: "span", text: "• [**PARAM प्रज्ञा AI सुपरकंप्यूटर व भारत की सुपरकंप्यूटिंग यात्रा**](/general-awareness/param-pragya-ai-supercomputer-india-supercomputing-journey): C-DAC व NSM की उपलब्धियां।\n" },
        { _type: "span", text: "• [**भारत के प्रमुख रामसर स्थल पूरी सूची**](/general-awareness/ramsar-sites-in-india): आर्द्रभूमि संरक्षण व पर्यावरण विज्ञान।\n" },
        { _type: "span", text: "• [**आपदा प्रबंधन (संशोधन) अधिनियम 2025 नोट्स**](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes): NDMA, SDMA व आपदा पूर्व चेतावनी।" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. विक्रम-1 रॉकेट की प्रमुख विशेषताएँ (Quick Fact Sheet)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• **निर्माता कंपनी**: स्काईरूट एयरोस्पेस (Skyroot Aerospace, हैदराबाद)\n" },
        { _type: "span", text: "• **रॉकेट प्रकार**: बहु-स्तरीय ऑर्बिटल लॉन्च व्हीकल (Multi-Stage Orbital Rocket)\n" },
        { _type: "span", text: "• **पेलोड क्षमता**: 480 किग्रा (LEO - Low Earth Orbit, 500 किमी)\n" },
        { _type: "span", text: "• **मुख्य इंजन**: कलाम-100 (Kalam-100 Solid Rocket Motor) एवं रमन-1 (Raman Engine)\n" },
        { _type: "span", text: "• **संरचनात्मक सामग्री**: ऑल-कार्बन-फाइबर बॉडी (All-Carbon-Fiber Structure)\n" },
        { _type: "span", text: "• **नोडल एजेंसी**: IN-SPACe एवं ISRO टेक्नोलॉजी ट्रांसफर" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. आधुनिक 3D-प्रिंटेड इंजन एवं कलाम सीरीज तकनीक" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "विक्रम-1 रॉकेट में स्वदेशी रूप से डिजाइन किए गए 3D-प्रिंटेड लिक्विड इंजन एवं सॉलिड रॉकेट मोटर्स का उपयोग किया गया है:\n• **कलाम-100 (Kalam-100)**: यह रॉकेट का मुख्य सॉलिड प्रोपल्शन स्टेज है, जिसे कार्बन-कम्पोजिट केस में 3D-प्रिंटिंग तकनीक से तैयार किया गया है।\n• **रमन-1 (Raman-1)**: यह 3D-प्रिंटेड 4-इंजन ऐरे वाला लिक्विड अपर स्टेज है, जो उपग्रहों को कक्षा में अत्यंत सटीक रूप से स्थापित (Multi-orbit insertion) करने में सक्षम है।\n• **इनफिनिटी कैंपस**: स्काईरूट का हैदराबाद स्थित मुख्यालय 'इनफिनिटी कैंपस' एशिया की सबसे बड़ी निजी रॉकेट विनिर्माण सुविधा है।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. IN-SPACe एवं भारतीय अंतरिक्ष 2.0 नीति का महत्व" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **IN-SPACe गठन**: 2020 में भारत सरकार ने गैर-सरकारी संस्थाओं (NGPEs) को ISRO की बुनियादी सुविधाओं का उपयोग करने हेतु IN-SPACe (सिंगल-विंडो नोडल एजेंसी) की स्थापना की।\n• **भारतीय अंतरिक्ष नीति 2023**: निजी कंपनियों को रॉकेट निर्माण, उपग्रह संचालन और वाणिज्यिक ग्राउंड स्टेशनों की स्थापना की पूर्ण अनुमति प्रदान करती है।\n• **वैश्विक न्यू-स्पेस बाज़ार**: भारत वर्तमान में 8 अरब डॉलर के वैश्विक अंतरिक्ष अर्थव्यवस्था में 2% हिस्सेदारी रखता है, जिसे 2030 तक 8% से अधिक करने का लक्ष्य है।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. MPPSC & UPSC परीक्षा दृष्टिकोण (Exam POV)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **MPPSC Mains Paper 3 Unit 7**: भारत में अंतरिक्ष प्रौद्योगिकी विकास, इसरो बनाम निजी अंतरिक्ष क्षेत्र, 3D प्रिंटिंग तकनीक का अनुप्रयोग तथा स्काईरूट विक्रम सीरीज।\n• **UPSC GS-3 (Science & Tech)**: इंडियन स्पेस पॉलिसी 2023, IN-SPACe का रोल, वाणिज्यिक उपग्रह प्रक्षेपण बाज़ार और न्यू-स्पेस इकोसिस्टम में मेक इन इंडिया।",
        },
      ],
    },
  ];

  const fullBodyEn = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "India's commercial space sector crossed a historic milestone as Hyderabad-based aerospace start-up **Skyroot Aerospace** unveiled its first private commercial orbital rocket, **Vikram-1**. Designed to carry up to 480 kg payload into Low Earth Orbit (LEO), Vikram-1 represents a giant leap in India's Space 2.0 reforms led by **IN-SPACe (Indian National Space Promotion and Authorization Centre)**. Essential reading for candidates preparing for **MPPSC (Mains Paper 3 Unit 7)** and **UPSC (GS-3 Science & Tech)**.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "Related High-Authority Articles (Interlinking Links)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• [**ISRO GSLV-F17 EOS-05 Satellite Launch Key Highlights**](/en/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026): SDSC SHAR launch timeline and GEO satellite specs.\n" },
        { _type: "span", text: "• [**ISRO GSLV-F17 EOS-05 Mission 2026 Complete Notes**](/en/current-affairs/isro-gslv-f17-eos-05-mission-2026): Indigenous CUS Cryogenic Engine & GEO payloads.\n" },
        { _type: "span", text: "• [**World's 1st Autonomous Shipbuilding Centre in Andhra Pradesh**](/en/current-affairs/worlds-first-autonomous-shipbuilding-centre-andhra-pradesh-2026): Nellore shipyard & AI maritime tech.\n" },
        { _type: "span", text: "• [**India's 1st Dedicated Drone Battalion 'Baaz' in Punjab**](/en/current-affairs/indias-first-drone-battalion-punjab-2026): Jalandhar Vajra Corps & BSF counter-drone operations.\n" },
        { _type: "span", text: "• [**PARAM Pragya AI Supercomputer & India's Supercomputing Journey**](/en/general-awareness/param-pragya-ai-supercomputer-india-supercomputing-journey): C-DAC & National Supercomputing Mission.\n" },
        { _type: "span", text: "• [**Ramsar Sites in India Complete List & Map Notes**](/en/general-awareness/ramsar-sites-in-india): Wetland conservation & environmental science.\n" },
        { _type: "span", text: "• [**Disaster Management Amendment Act 2025 Study Notes**](/en/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes): NDMA, SDMA & early warning systems." },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. Vikram-1 Rocket Specifications & Quick Fact Sheet" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• **Developing Firm**: Skyroot Aerospace (Hyderabad, Telangana)\n" },
        { _type: "span", text: "• **Launch Vehicle Class**: Multi-Stage Private Orbital Rocket\n" },
        { _type: "span", text: "• **Payload Capacity**: 480 kg to 500 km Low Earth Orbit (LEO)\n" },
        { _type: "span", text: "• **Propulsion Motors**: Kalam-100 (Solid Stage) and Raman-1 (Liquid Upper Stage)\n" },
        { _type: "span", text: "• **Structural Architecture**: All-Carbon-Fiber Composite Airframe\n" },
        { _type: "span", text: "• **Regulatory Nodal Body**: IN-SPACe (Department of Space)" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. 3D-Printed Engines & Kalam Motor Series" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Vikram-1 features cutting-edge 3D-printed liquid thrusters and solid rocket stages:\n• **Kalam-100**: High-thrust solid rocket motor built using carbon-filament winding technology for maximum mass efficiency.\n• **Raman-1**: 3D-printed 4-engine liquid upper stage offering multi-orbit payload insertion capability.\n• **MAX-Q / Infinity Campus**: Skyroot's 60,000 sq ft headquarters in Hyderabad represents Asia's largest private rocket manufacturing facility.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. IN-SPACe & Indian Space Policy 2023" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **IN-SPACe Role**: Created in 2020 as an autonomous single-window nodal agency under the Department of Space to enable Non-Government Private Entities (NGPEs) to use ISRO infrastructure.\n• **Indian Space Policy 2023**: Delineates roles for ISRO (R&D), NSIL (commercialization), and IN-SPACe (private sector authorization).\n• **Global NewSpace Market**: India aims to scale its global space economy share from 2% ($8 Billion) to over 8% by 2030.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. MPPSC & UPSC Exam Point of View (Exam POV)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **MPPSC Mains Paper 3 Unit 7**: Evolution of space technology in India, ISRO vs private startups, 3D printing applications in aerospace, and Skyroot Vikram series.\n• **UPSC GS-3 (Science & Tech)**: Indian Space Policy 2023, commercial satellite launch market, IN-SPACe regulatory framework, and Make in India NewSpace ecosystem.",
        },
      ],
    },
  ];

  const faqs = [
    {
      _key: "f1",
      question: "भारत का पहला निजी ऑर्बिटल रॉकेट कौन सा है और इसे किस कंपनी ने बनाया है?",
      answer: "भारत का पहला निजी ऑर्बिटल रॉकेट 'विक्रम-1' (Vikram-1) है, जिसे हैदराबाद स्थित एयरोस्पेस स्टार्ट-अप स्काईरूट एयरोस्पेस (Skyroot Aerospace) ने तैयार किया है।",
      questionEn: "What is India's first private orbital rocket and which company built it?",
      answerEn: "India's first private orbital rocket is 'Vikram-1', developed by Hyderabad-based aerospace startup Skyroot Aerospace."
    },
    {
      _key: "f2",
      question: "विक्रम-1 रॉकेट की पेलोड क्षमता कितनी है और यह किस कक्षा के लिए डिज़ाइन किया गया है?",
      answer: "विक्रम-1 लगभग 480 किलोग्राम पेलोड को 500 किलोमीटर की ऊंचाई पर स्थित निम्न पृथ्वी कक्षा (Low Earth Orbit - LEO) में स्थापित कर सकता है।",
      questionEn: "What is the payload capacity of the Vikram-1 rocket and for which orbit is it designed?",
      answerEn: "Vikram-1 can carry a payload of up to 480 kg into a 500 km altitude Low Earth Orbit (LEO)."
    },
    {
      _key: "f3",
      question: "विक्रम-1 रॉकेट के इंजनों का नाम क्या है?",
      answer: "विक्रम-1 में मुख्य सॉलिड प्रोपल्शन चरण हेतु 'कलाम-100' (Kalam-100) और लिक्विड अपर स्टेज हेतु 3D-प्रिंटेड 'रमन-1' (Raman-1) इंजनों का उपयोग किया गया है।",
      questionEn: "What are the names of the propulsion engines powering the Vikram-1 rocket?",
      answerEn: "It is powered by the Kalam-100 solid rocket motor for primary thrust and the 3D-printed Raman-1 liquid engine array for upper-stage orbit insertion."
    },
    {
      _key: "f4",
      question: "IN-SPACe (इंडियन नेशनल स्पेस प्रमोशन एंड ऑथराइजेशन सेंटर) की स्थापना का मुख्य उद्देश्य क्या है?",
      answer: "IN-SPACe एक स्वतंत्र सिंगल-विंडो नोडल एजेंसी है जो गैर-सरकारी निजी कंपनियों को ISRO की अंतरिक्ष सुविधाओं और रॉकेट प्रक्षेपण का अवसर प्रदान करती है।",
      questionEn: "What is the primary objective of IN-SPACe?",
      answerEn: "IN-SPACe serves as an autonomous single-window nodal agency authorizing private space entities to utilize ISRO's launch facilities and infrastructure."
    },
    {
      _key: "f5",
      question: "स्काईरूट एयरोस्पेस की स्थापना किसने की थी?",
      answer: "स्काईरूट एयरोस्पेस की स्थापना पूर्व इसरो वैज्ञानिकों पवन कुमार चंदना और नागा भरत डाका ने 2018 में की थी।",
      questionEn: "Who are the founders of Skyroot Aerospace?",
      answerEn: "Skyroot Aerospace was founded in 2018 by former ISRO scientists Pawan Kumar Chandana and Naga Bharath Daka."
    },
    {
      _key: "f6",
      question: "अंतरिक्ष क्षेत्र में '3D-प्रिंटिंग तकनीक' का उपयोग करने का मुख्य लाभ क्या है?",
      answer: "3D-प्रिंटिंग से इंजन पुर्जों की संख्या 80% तक घट जाती है, वजन हल्का होता है, और विनिर्माण समय महीनों से घटकर कुछ ही दिनों में पूरा हो जाता है।",
      questionEn: "What is the key advantage of using 3D-printing technology in rocket engine manufacturing?",
      answerEn: "3D-printing reduces component part-counts by up to 80%, lowers structural weight, and cuts manufacturing lead-times from months to days."
    },
    {
      _key: "f7",
      question: "संबंधित लेख: ISRO GSLV-F17 EOS-05 मिशन 2026 का विवरण कहाँ उपलब्ध है?",
      answer: "आप आकार IAS वेबसाइट पर [ISRO GSLV-F17 EOS-05 मिशन 2026 विस्तृत नोट्स](/current-affairs/isro-gslv-f17-eos-05-mission-2026) पढ़ सकते हैं।",
      questionEn: "Related Article: Where can I read about ISRO's GSLV-F17 EOS-05 Mission?",
      answerEn: "Read complete notes at [ISRO GSLV-F17 EOS-05 Mission 2026 Complete Notes](/en/current-affairs/isro-gslv-f17-eos-05-mission-2026)."
    },
    {
      _key: "f8",
      question: "MPPSC मुख्य परीक्षा Paper 3 Unit 7 में इस विषय की तैयारी कैसे करें?",
      answer: "निजी अंतरिक्ष सुधार, IN-SPACe की भूमिका, स्काईरूट एयरोस्पेस की उपलब्धियां और 3D प्रिंटिंग के तकनीकी लाभों पर नोट्स तैयार करें।",
      questionEn: "How to prepare this topic for MPPSC Mains Paper 3 Unit 7?",
      answerEn: "Prepare concise notes covering Space 2.0 reforms, IN-SPACe mandate, Skyroot Vikram series, and 3D printing applications."
    },
    {
      _key: "f9",
      question: "UPSC GS Paper 3 में निजी अंतरिक्ष उद्योग से संबंधित क्या प्रश्न बनते हैं?",
      answer: "वैश्विक न्यू-स्पेस अर्थव्यवस्था में भारत का लक्ष्य, मेक इन इंडिया इन स्पेस, निजी सैटेलाइट लॉन्च मार्केट तथा स्पेस डेब्रिस प्रबंधन पर प्रश्न पूछे जाते हैं।",
      questionEn: "What dimensions are tested in UPSC GS Paper 3 regarding private space industry?",
      answerEn: "UPSC tests India's target in global space economy, NewSpace commercial launch market, space debris mitigation, and policy frameworks."
    },
    {
      _key: "f10",
      question: "स्काईरूट का 'इनफिनिटी कैंपस' कहाँ स्थित है?",
      answer: "स्काईरूट एयरोस्पेस का 'इनफिनिटी कैंपस' तेलंगाना की राजधानी हैदराबाद में स्थित है, जो एशिया का सबसे बड़ा निजी रॉकेट विनिर्माण केंद्र है।",
      questionEn: "Where is Skyroot's Infinity Campus located?",
      answerEn: "Infinity Campus is located in Hyderabad, Telangana, operating as Asia's largest private rocket manufacturing facility."
    }
  ];

  const mcqs = [
    {
      _key: "m1",
      question: "भारत का पहला निजी तौर पर निर्मित ऑर्बिटल रॉकेट कौन सा है जिसे स्काईरूट एयरोस्पेस द्वारा विकसित किया गया है?",
      questionEn: "Which is India's first privately built orbital rocket developed by Skyroot Aerospace?",
      options: [
        "विक्रम-1 (Vikram-1)",
        "अग्निबाण (Agnibaan)",
        "वरुण (Varuna)",
        "रोहिणी-560 (RH-560)"
      ],
      optionsEn: [
        "Vikram-1",
        "Agnibaan",
        "Varuna",
        "RH-560"
      ],
      correctIndex: 0,
      explanation: "विक्रम-1 स्काईरूट एयरोस्पेस द्वारा निर्मित भारत का पहला निजी ऑर्बिटल रॉकेट है, जो 480 किग्रा पेलोड को LEO कक्षा में ले जा सकता है।",
      explanationEn: "Vikram-1 is India's first privately developed orbital rocket by Skyroot Aerospace capable of deploying 480 kg into LEO."
    },
    {
      _key: "m2",
      question: "निजी अंतरिक्ष संस्थाओं (NGPEs) को ISRO की सुविधाओं के उपयोग हेतु अधिकृत करने वाली भारत सरकार की नोडल एजेंसी कौन सी है?",
      questionEn: "Which single-window nodal agency authorizes private space entities in India to use ISRO infrastructure?",
      options: [
        "IN-SPACe",
        "NSIL",
        "DRDO",
        "HAL"
      ],
      optionsEn: [
        "IN-SPACe",
        "NSIL",
        "DRDO",
        "HAL"
      ],
      correctIndex: 0,
      explanation: "IN-SPACe (Indian National Space Promotion and Authorization Centre) निजी अंतरिक्ष कंपनियों को अधिकृत एवं प्रोत्साहित करने वाली नोडल एजेंसी है।",
      explanationEn: "IN-SPACe is the single-window nodal agency under the Department of Space regulating and supporting private space startups."
    },
    {
      _key: "m3",
      question: "विक्रम-1 रॉकेट के मुख्य सॉलिड प्रोपल्शन इंजन का क्या नाम है?",
      questionEn: "What is the name of the main solid propulsion engine of the Vikram-1 rocket?",
      options: [
        "कलाम-100 (Kalam-100)",
        "विकास-1 (Vikas-1)",
        "रमन-2",
        "क्रायो-7.5"
      ],
      optionsEn: [
        "Kalam-100",
        "Vikas-1",
        "Raman-2",
        "Cryo-7.5"
      ],
      correctIndex: 0,
      explanation: "विक्रम-1 का मुख्य सॉलिड प्रोपल्शन स्टेज 'कलाम-100' मोटर द्वारा संचालित होता है, जो पूर्व राष्ट्रपति डॉ. एपीजे अब्दुल कलाम के नाम पर है।",
      explanationEn: "The main solid rocket motor is named Kalam-100 in honor of former President Dr. APJ Abdul Kalam."
    },
    {
      _key: "m4",
      question: "एशिया का सबसे बड़ा निजी रॉकेट विनिर्माण केंद्र 'इनफिनिटी कैंपस' भारत के किस शहर में स्थित है?",
      questionEn: "Where is Asia's largest private rocket manufacturing facility 'Infinity Campus' located?",
      options: [
        "हैदराबाद, तेलंगाना",
        "बेंगलुरु, कर्नाटक",
        "चेन्नई, तमिलनाडु",
        "अहमदाबाद, गुजरात"
      ],
      optionsEn: [
        "Hyderabad, Telangana",
        "Bengaluru, Karnataka",
        "Chennai, Tamil Nadu",
        "Ahmedabad, Gujarat"
      ],
      correctIndex: 0,
      explanation: "स्काईरूट एयरोस्पेस का 'इनफिनिटी कैंपस' हैदराबाद में स्थित है।",
      explanationEn: "Skyroot Aerospace's 60,000 sq ft Infinity Campus rocket facility is located in Hyderabad, Telangana."
    },
    {
      _key: "m5",
      question: "भारतीय अंतरिक्ष नीति 2023 के तहत वाणिज्यिक उपग्रह प्रक्षेपण और परिचालन का दायित्व मुख्य रूप से किस संस्था का है?",
      questionEn: "Under Indian Space Policy 2023, commercial space operations are primarily driven by which body?",
      options: [
        "NSIL (न्यूस्पेस इंडिया लिमिटेड) एवं निजी संस्थाएं",
        "केवल DRDO",
        "केवल CSIR",
        "केवल नौसेना"
      ],
      optionsEn: [
        "NSIL & Private Space Entities",
        "DRDO only",
        "CSIR only",
        "Indian Navy only"
      ],
      correctIndex: 0,
      explanation: "अंतरिक्ष नीति 2023 के अनुसार ISRO अनुसंधान पर केंद्रित है, जबकि NSIL और निजी संस्थाएं वाणिज्यिक प्रक्षेपण संभालती हैं।",
      explanationEn: "Space Policy 2023 designates ISRO for R&D while NSIL and private entities execute commercial space launches."
    },
    {
      _key: "m6",
      question: "रॉकेट निर्माण में 3D-प्रिंटिंग तकनीक का मुख्य लाभ क्या है?",
      questionEn: "What is the primary benefit of 3D printing in rocket engine manufacturing?",
      options: [
        "पुर्जों की संख्या घटाना, हल्का वजन और विनिर्माण समय में भारी कमी",
        "रॉकेट को अदृश्य बनाना",
        "केवल रॉकेट का रंग बदलना",
        "इंधन की आवश्यकता समाप्त करना"
      ],
      optionsEn: [
        "Drastic reduction in part counts, lighter weight, and faster manufacturing",
        "Making rockets invisible",
        "Changing exterior paint color only",
        "Eliminating fuel requirement entirely"
      ],
      correctIndex: 0,
      explanation: "3D-प्रिंटिंग तकनीक से जटिल रॉकेट इंजनों का निर्माण एक ही टुकड़े में संभव होता है, जिससे समय और लागत दोनों बचती हैं।",
      explanationEn: "3D printing allows complex engine geometries to be printed as single components, saving lead times and structural weight."
    },
    {
      _key: "m7",
      question: "इंटर-लिंकिंग प्रश्न: ISRO द्वारा GSLV-F17 से हाल ही में प्रक्षेपित 'EOS-05' किस प्रकार का उपग्रह है?",
      questionEn: "Interlinking Check: What type of satellite is ISRO's 'EOS-05' launched via GSLV-F17?",
      options: [
        "पृथ्वी अवलोकन उपग्रह (Earth Observation Satellite)",
        "मौसम उपग्रह केवल",
        "केवल रेडियो नेविगेशन",
        "केवल चंद्रमा रोवर"
      ],
      optionsEn: [
        "Earth Observation Satellite",
        "Weather satellite only",
        "Radio navigation only",
        "Lunar rover only"
      ],
      correctIndex: 0,
      explanation: "EOS-05 इसरो का उन्नत पृथ्वी अवलोकन उपग्रह है। [विस्तृत रिपोर्ट पढ़ें](/current-affairs/isro-gslv-f17-eos-05-mission-2026)।",
      explanationEn: "EOS-05 is ISRO's advanced Earth Observation Satellite. [Read full notes](/en/current-affairs/isro-gslv-f17-eos-05-mission-2026)."
    },
    {
      _key: "m8",
      question: "MPPSC मेंस परीक्षा हेतु 'स्पेस टेक्नोलॉजी एवं स्काईरूट विक्रम-1' किस पेपर से संबंधित है?",
      questionEn: "Which paper of MPPSC Mains tests 'Space Technology & Skyroot Vikram-1'?",
      options: [
        "Paper 3 (विज्ञान एवं प्रौद्योगिकी, Unit 7)",
        "Paper 1 (इतिहास)",
        "Paper 4 (नीतिशास्त्र)",
        "Paper 5 (हिंदी)"
      ],
      optionsEn: [
        "Paper 3 (Science & Technology, Unit 7)",
        "Paper 1 (History)",
        "Paper 4 (Ethics)",
        "Paper 5 (Hindi)"
      ],
      correctIndex: 0,
      explanation: "MPPSC मेंस परीक्षा का Paper 3 Unit 7 अंतरिक्ष प्रौद्योगिकी, इसरो और निजी अंतरिक्ष सुधारों का मूल्यांकन करता है।",
      explanationEn: "MPPSC Mains Paper 3 Unit 7 directly assesses Space Technology, ISRO achievements, and commercial space startups."
    }
  ];

  const docPayload = {
    title: "भारत का पहला निजी रॉकेट 'विक्रम-1' (स्काईरूट) | MPPSC & UPSC",
    titleEn: "India's First Private Orbital Rocket 'Vikram-1' (Skyroot) | MPPSC & UPSC",
    
    seoTitle: "भारत का पहला निजी रॉकेट 'विक्रम-1' (स्काईरूट) | MPPSC & UPSC",
    seoTitleEn: "India's First Private Orbital Rocket 'Vikram-1' (Skyroot) | MPPSC & UPSC Notes",
    
    excerpt: "भारत का पहला निजी ऑर्बिटल रॉकेट 'विक्रम-1' (स्काईरूट एयरोस्पेस)। पेलोड क्षमता, 3D प्रिंटेड लिक्विड इंजन कलाम-100 व MPPSC & UPSC परीक्षा नोट्स।",
    excerptEn: "India's first private orbital rocket Vikram-1 by Skyroot Aerospace. 3D-printed Kalam-100 engines, payload specs & study notes for MPPSC & UPSC.",
    
    seoDescription: "भारत का पहला निजी ऑर्बिटल रॉकेट 'विक्रम-1' (स्काईरूट एयरोस्पेस)। LEO पेलोड क्षमता, कलाम इंजनों की तकनीक, IN-SPACe व MPPSC & UPSC परीक्षा उपयोगी संपूर्ण नोट्स।",
    seoDescriptionEn: "India's first private orbital rocket Vikram-1 developed by Skyroot Aerospace. Kalam-100 engines, LEO payload specs, IN-SPACe reforms & study notes for MPPSC & UPSC.",

    body: fullBodyHi,
    bodyEn: fullBodyEn,
    faqs: faqs,
    mcqs: mcqs,

    author: authorRef,
    tags: tagRefs,
    syllabus: [
      "MPPSC Mains Paper 3 Unit 7 Science & Tech Space Technology & Startups",
      "UPSC GS-3 Science & Tech Space Exploration & Commercialization",
    ],

    keywords: [
      "Vikram 1 Orbital Rocket Skyroot Aerospace",
      "India First Private Rocket Vikram 1",
      "Skyroot Aerospace Infinity Campus Hyderabad",
      "Kalam 100 Rocket Engine Skyroot",
      "IN SPACe Space 2 Policy India",
      "MPPSC Science Tech Space Notes",
      "UPSC GS3 Space Reforms Private Sector",
    ],
  };

  // 1. Update ca-vikram-1-orbital-rocket (legacy) and set slug to targetSlug
  await sanityClient
    .patch("ca-vikram-1-orbital-rocket")
    .set({
      ...docPayload,
      slug: { _type: "slug", current: targetSlug },
    })
    .commit();
  console.log("✅ Updated ca-vikram-1-orbital-rocket with slug:", targetSlug);

  // 2. Also ensure document exists for slug targetSlug directly
  const targetDocId = "ca-vikram-1-orbital-rocket-skyroot-aerospace-launch";
  await sanityClient.createOrReplace({
    _id: targetDocId,
    _type: "currentAffairs",
    slug: { _type: "slug", current: targetSlug },
    publishedAt: new Date().toISOString(),
    ca_date: "2026-09-08",
    featured: true,
    readingTime: 9,
    ...docPayload,
  });
  console.log("✅ Created/Replaced target doc:", targetDocId);

  // 3. Execute 2-Way Interlinking across related authority articles
  console.log("🔗 Executing Two-Way Interlinking for Vikram-1 Rocket...");
  
  const authorityScript = require("./two-way-seo-interlink-authority");
  if (typeof authorityScript === "function") {
    await authorityScript();
  }

  console.log("🎉 SUCCESS! Vikram-1 Rocket article has been 2-way interlinked & fully updated!");
}

main().catch((err) => {
  console.error("❌ Failed to optimize Vikram-1 article:", err);
  process.exit(1);
});
