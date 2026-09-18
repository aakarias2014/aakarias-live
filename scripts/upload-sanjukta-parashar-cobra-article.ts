import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

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
  console.log("🚀 Starting upload process for IPS Sanjukta Parashar CoBRA IG Article to Sanity CMS...");

  const bannerImgPath = "/Users/aakariastech/.gemini/antigravity-ide/brain/bb2c6d67-18cc-486b-872a-592123954632/sanjukta_parashar_cobra_ig_1789737305084.jpg";
  const opsImgPath = "/Users/aakariastech/.gemini/antigravity-ide/brain/bb2c6d67-18cc-486b-872a-592123954632/cobra_commandos_jungle_warfare_1789737346165.jpg";

  console.log("📸 Uploading Banner Image Asset to Sanity...");
  const bannerAsset = await client.assets.upload("image", fs.createReadStream(bannerImgPath), {
    filename: "sanjukta_parashar_cobra_ig.jpg",
    contentType: "image/jpeg",
  });
  console.log("✔ Banner Asset ID:", bannerAsset._id);

  console.log("📸 Uploading Operations Image Asset to Sanity...");
  const opsAsset = await client.assets.upload("image", fs.createReadStream(opsImgPath), {
    filename: "cobra_commandos_jungle_warfare.jpg",
    contentType: "image/jpeg",
  });
  console.log("✔ Ops Asset ID:", opsAsset._id);

  const docId = "sanjukta-parashar-first-woman-ig-crpf-cobra";

  const h3Block = (text: string) => ({
    _type: "block",
    _key: `h3_${Math.random().toString(36).substring(2, 9)}`,
    style: "h3",
    children: [{ _type: "span", text }],
  });

  const pBlock = (text: string) => ({
    _type: "block",
    _key: `p_${Math.random().toString(36).substring(2, 9)}`,
    style: "normal",
    children: [{ _type: "span", text }],
  });

  const bulletBlock = (text: string) => ({
    _type: "block",
    _key: `b_${Math.random().toString(36).substring(2, 9)}`,
    style: "normal",
    children: [{ _type: "span", text: text.startsWith("• ") ? text : `• ${text}` }],
  });

  const imageBlock = (assetId: string, alt: string, caption: string) => ({
    _type: "image",
    _key: `img_${Math.random().toString(36).substring(2, 9)}`,
    asset: {
      _type: "reference",
      _ref: assetId,
    },
    alt,
    caption,
  });

  // Hindi Body Blocks
  const body = [
    pBlock("2006 बैच की भारतीय पुलिस सेवा (IPS) अधिकारी **डॉ. संजुक्ता पराशर** को केंद्रीय रिजर्व पुलिस बल (CRPF) की विशेष गुरिल्ला व जंगल युद्ध कमांडो यूनिट **CoBRA (Commando Battalion for Resolute Action)** का **Inspector General (IG)** नियुक्त किया गया है। वह इस प्रतिष्ठित और कठिन बल का नेतृत्व करने वाली देश की **पहली महिला अधिकारी** बन गई हैं।"),
    pBlock("CRPF मुख्यालय द्वारा जारी आधिकारिक आदेशानुसार, डॉ. संजुक्ता पराशर 1996 बैच के IPS अधिकारी दानेश राणा का स्थान लेंगी। यह नियुक्ति भारतीय सुरक्षा बलों और वामपंथी उग्रवाद (LWE) विरोधी अभियानों में महिला नेतृत्व का एक नया इतिहास रचती है।"),

    h3Block("1. डॉ. संजुक्ता पराशर: साहसी आईपीएस अधिकारी और 'आयरन लेडी ऑफ असम'"),
    pBlock("असम-मेघालय कैडर की 2006 बैच की आईपीएस अधिकारी संजुक्ता पराशर अपनी अद्वितीय निडरता और उग्रवाद-रोधी अभियानों के लिए पूरे देश में जानी जाती हैं। असम के संवेदनशील जिलों में एनडीएफबी (NDFB-S) और उल्फा (ULFA) उग्रवादियों के खिलाफ उन्होंने स्वयं हाथ में AK-47 लेकर अभियानों का नेतृत्व किया। इसी कारण उन्हें **'आयरन लेडी ऑफ असम'** और **'लेडी सिंघम'** के नाम से भी पुकारा जाता है।"),

    bulletBlock("• जातीय हिंसा पर नियंत्रण (2008): पहली पोस्टिंग तिनसुकिया के माकुम में हुई। इसके बाद 2008 में बोडो और अन्य समुदायों के बीच भड़की उडालगुड़ी जातीय हिंसा के दौरान मौके पर पहुंचकर शांति स्थापित की।"),
    bulletBlock("• एके-47 लेकर घने जंगलों में ऑपरेशन: सोनितपुर में SP रहते हुए CRPF और पुलिस कमांडो के साथ घने जंगलों में एनडीएफबी (NDFB-S) के खिलाफ कई अभियानों की अगुवाई की।"),
    bulletBlock("• रातभर चला जॉइंट ऑपरेशन (2016): अगस्त 2016 में असम-अरुणाचल सीमा के पास भीषण गोलीबारी और ग्रेनेड हमलों के बीच सुरक्षा बलों का नेतृत्व किया जिसमें 3 खूंखार उग्रवादी मारे गए।"),
    bulletBlock("• 1 साल में 16 उग्रवादियों का सफाया: 2014–15 के दौरान उनके नेतृत्व में चलाए गए अभियानों में 16 उग्रवादी ढेर हुए और 64 गिरफ्तार किए गए।"),
    bulletBlock("• उग्रवादी धमकियों के बावजूद अदम्य साहस: उग्रवादी संगठनों से जान से मारने की कई धमकियों के बावजूद उन्होंने आतंकवाद व अपराध के खिलाफ अपनी ड्यूटी निडरता से जारी रखी।"),

    imageBlock(
      opsAsset._id,
      "CRPF CoBRA commandos jungle warfare anti-naxalite operation in dense forests",
      "CRPF CoBRA कमांडोज: घने जंगलों व वामपंथी उग्रवाद प्रभावित क्षेत्रों में गुरिल्ला ऑपरेशन हेतु प्रशिक्षित जंगल वॉरियर्स"
    ),

    h3Block("2. संजुक्ता पराशर का संपूर्ण करियर टाइमलाइन (Career Profile)"),
    bulletBlock("• 2005–2006: संघ लोक सेवा आयोग (UPSC CSE) परीक्षा में ऑल इंडिया रैंक 85 (AIR 85) प्राप्त की और IPS चयनित हुईं।"),
    bulletBlock("• 2006: भारतीय पुलिस सेवा (IPS) में औपचारिक रूप से शामिल हुईं और असम-मेघालय कैडर आवंटित हुआ।"),
    bulletBlock("• 2008: तिनसुकिया जिले के माकुम में असिस्टेंट एसपी के रूप में पहली पोस्टिंग।"),
    bulletBlock("• 2009–2011: असम के अत्यधिक संवेदनशील इलाकों में उग्रवाद-रोधी (Anti-Insurgency) अभियानों की कमान संभाली।"),
    bulletBlock("• 2011–2016: जोरहाट और सोनितपुर जिलों की पुलिस अधीक्षक (SP) रहीं। ULFA और NDFB के खिलाफ निर्णायक प्रहार किए।"),
    bulletBlock("• 2017–2024: राष्ट्रीय जांच एजेंसी (NIA) में केंद्रीय प्रतिनियुक्ति पर बतौर DIG कार्य किया और आतंकवाद व अंतरराष्ट्रीय अपराधों की जांच की।"),
    bulletBlock("• 2024: पुलिस महानिरीक्षक (IGP) पद पर पदोन्नत हुईं।"),
    bulletBlock("• 2025: सीआईडी (CID Assam) में जांच एवं खुफिया संबंधी प्रमुख जिम्मेदारियां संभालीं।"),
    bulletBlock("• अगस्त 2026: केंद्रीय रिजर्व पुलिस बल (CRPF) में IG पद पर केंद्रीय प्रतिनियुक्ति।"),
    bulletBlock("• सितंबर 2026: CRPF CoBRA (कमांडो बटालियन फॉर रिजॉल्यूट एक्शन) यूनिट की पहली महिला IG के रूप में कार्यभार ग्रहण किया।"),

    h3Block("3. CRPF CoBRA यूनिट क्या है? (Commando Battalion for Resolute Action)"),
    pBlock("**CoBRA** का पूरा नाम **Commando Battalion for Resolute Action** है। यह भारत के केंद्रीय सशस्त्र पुलिस बल **CRPF** की एक अत्यंत कुशल और घातक विशेष कमांडो यूनिट है।"),
    bulletBlock("• गठन (Establishment): CRPF ने वामपंथी उग्रवाद (LWE / Naxalism) तथा पूर्वोत्तर के उग्रवाद से निपटने के लिए वर्ष **2008-09** में CoBRA बटालियनों का गठन किया था।"),
    bulletBlock("• विशेषता (Specialization): CoBRA कमांडोज को **जंगल युद्ध (Jungle Warfare)**, गुरिल्ला रणनीति, घात लगाकर हमला करने (Ambush) तथा कठिन भौगोलिक परिस्थितियों में अभियानों हेतु विशेष प्रशिक्षण दिया जाता है।"),
    bulletBlock("• लोकप्रिय नाम: इस बल के जवानों को **'जंगल वॉरियर्स' (Jungle Warriors)** भी कहा जाता है।"),
    bulletBlock("• कुल यूनिट्स: वर्तमान में CoBRA सेक्टर के अंतर्गत कुल **10 CoBRA बटालियन (Units)** कार्यरत हैं जो छत्तीसगढ़, झारखंड, ओडिशा, तेलंगाना तथा पूर्वोत्तर राज्यों में तैनात हैं।"),
    bulletBlock("• हालिया महत्वपूर्ण तैनाती: वर्ष 2026 में मणिपुर में सशस्त्र हिंसा और उग्रवाद पर काबू पाने के लिए CRPF ने CoBRA की दो विशेष यूनिट्स तैनात की हैं।"),

    h3Block("4. MPPSC & UPSC परीक्षा उपयोगी तथ्य (Exam Key Points)"),
    pBlock("प्रतियोगी परीक्षाओं (MPPSC, UPSC, SSC, State PCS) के दृष्टिकोण से निम्नलिखित तथ्य अत्यंत महत्वपूर्ण हैं:"),
    bulletBlock("• CoBRA का फुल फॉर्म: **Commando Battalion for Resolute Action**"),
    bulletBlock("• मातृ संस्था: **CRPF (Central Reserve Police Force)**"),
    bulletBlock("• गठन वर्ष: **2008-09**"),
    bulletBlock("• पद व अधिकारी: **डॉ. संजुक्ता पराशर** (2006 बैच IPS, असम-मेघालय कैडर) — CoBRA की **पहली महिला IG**"),
    bulletBlock("• पूर्ववर्ती अधिकारी: 1996 बैच के IPS अधिकारी **दानेश राणा** का स्थान लिया"),
    bulletBlock("• उपनाम / उपाधि: **'आयरन लेडी ऑफ असम'** एवं **'लेडी सिंघम'**"),
    bulletBlock("• प्रासंगिकता (Syllabus): MPPSC मुख्य परीक्षा पेपर-3 (सुरक्षा बल व आंतरिक सुरक्षा) एवं UPSC GS Paper-3 (Internal Security & LWE Challenges)."),

    pBlock("आंतरिक सुरक्षा, नक्सलवाद एवं सुरक्षा बलों के अन्य महत्वपूर्ण नोट्स पढ़ने के लिए हमारे [MPPSC मुख्य परीक्षा नोट्स](/mppsc-notes) तथा [सामान्य अध्ययन अध्ययन सामग्री](/general-awareness) का अवलोकन करें।")
  ];

  // English Body Blocks
  const bodyEn = [
    pBlock("In a historic milestone for Indian Security Forces, 2006-batch Indian Police Service (IPS) officer **Dr. Sanjukta Parashar** has been appointed as the **Inspector General (IG)** of CRPF's elite jungle warfare unit — **CoBRA (Commando Battalion for Resolute Action)**. She is the **first woman officer** to head this specialized commando force."),
    pBlock("According to the official order released by CRPF Headquarters, Dr. Sanjukta Parashar succeeds 1996-batch IPS officer Danesh Rana. Her appointment sets a revolutionary benchmark for women leadership in combat command and anti-Left Wing Extremism (LWE) counter-insurgency operations."),

    h3Block("1. Dr. Sanjukta Parashar: The 'Iron Lady of Assam'"),
    pBlock("An IPS officer of the Assam-Meghalaya Cadre (2006 Batch), Dr. Sanjukta Parashar is widely acclaimed for her unyielding courage in counter-insurgency operations. During her tenure in sensitive districts of Assam, she personally led armed raids with an AK-47 assault rifle against militant outfits such as NDFB(S) and ULFA, earning her the epithet of **'Iron Lady of Assam'** and **'Lady Singham'**."),

    bulletBlock("• Handling Ethnic Conflicts (2008): Assigned to Udalguri following her first posting in Makum (Tinsukia), she restored law and order during violent Bodo ethnic clashes."),
    bulletBlock("• Leading Jungle Operations with AK-47: As Superintendent of Police (SP) in Sonitpur, she personally led CRPF commandos and police teams deep inside dense tropical forests against NDFB(S) insurgents."),
    bulletBlock("• Overnight Counter-Terror Mission (2016): In August 2016, she led a high-stakes joint operation along the Assam-Arunachal border under heavy gunfire and grenade attacks, neutralizing 3 militant commanders."),
    bulletBlock("• Neutralized 16 Militants in One Year: Under her leadership during 2014–15, 16 insurgents were neutralized and 64 apprehended in anti-insurgency strikes."),
    bulletBlock("• Fearless Duty Despite Death Threats: Despite constant assassination threats from militant groups, she continued to spearhead front-line counter-terrorism operations."),

    h3Block("2. Sanjukta Parashar: Career Timeline"),
    bulletBlock("• 2005–2006: Secured All India Rank 85 (AIR 85) in UPSC Civil Services Examination and joined the Indian Police Service (IPS)."),
    bulletBlock("• 2006: Formally allocated the Assam-Meghalaya IPS Cadre."),
    bulletBlock("• 2008: First posting as Assistant SP in Makum, Tinsukia district."),
    bulletBlock("• 2009–2011: Handled anti-insurgency operations in conflict-prone belts of Assam."),
    bulletBlock("• 2011–2016: Served as SP of Jorhat and Sonitpur districts, dealing major blows to ULFA and NDFB(S)."),
    bulletBlock("• 2017–2024: Deputed to the National Investigation Agency (NIA) as DIG, probing high-profile terror networks."),
    bulletBlock("• 2024: Promoted to Inspector General of Police (IGP)."),
    bulletBlock("• 2025: Served in Assam CID handling intelligence and major criminal investigations."),
    bulletBlock("• August 2026: Appointed on Central Deputation to Central Reserve Police Force (CRPF) as IG."),
    bulletBlock("• September 2026: Took charge as the first woman Inspector General (IG) of CRPF CoBRA Sector."),

    h3Block("3. Understanding CRPF CoBRA Unit"),
    pBlock("**CoBRA** stands for **Commando Battalion for Resolute Action**. It is the premier specialized commando wing of the **Central Reserve Police Force (CRPF)**."),
    bulletBlock("• Formation: Established in **2008-09** specifically to counter Left Wing Extremism (LWE / Naxalism) and North-East insurgency."),
    bulletBlock("• Specialization: CoBRA commandos undergo grueling training in **Jungle Warfare**, guerrilla tactics, tactical ambushes, and survival in dense rainforests."),
    bulletBlock("• Nickname: Commonly known across armed forces as **'Jungle Warriors'**."),
    bulletBlock("• Total Battalions: Operates **10 CoBRA Battalions** deployed across LWE-affected states like Chhattisgarh, Jharkhand, Odisha, Telangana, and North-Eastern states."),
    bulletBlock("• Recent Operational Deployment: In 2026, CRPF deployed two CoBRA units in Manipur to quell armed violence and restore peace."),

    h3Block("4. Key Takeaways for MPPSC & UPSC Exams"),
    bulletBlock("• CoBRA Full Form: **Commando Battalion for Resolute Action**"),
    bulletBlock("• Parent Force: **CRPF (Central Reserve Police Force)**"),
    bulletBlock("• Establishment Year: **2008-09**"),
    bulletBlock("• Official Appointed: **Dr. Sanjukta Parashar (IPS 2006 Assam-Meghalaya Cadre)** — **First Female IG of CoBRA**"),
    bulletBlock("• Predecessor: **Danesh Rana (IPS 1996 Batch)**"),
    bulletBlock("• Popular Sobriquet: **'Iron Lady of Assam'** / **'Lady Singham'**"),
    bulletBlock("• Exam Relevance: MPPSC Mains Paper 3 (Internal Security & CAPF) and UPSC GS Paper 3 (LWE Challenges & Internal Security)."),

    pBlock("For detailed internal security notes, check out our [MPPSC Mains Notes](/en/mppsc-notes) and [General Studies Hub](/en/general-awareness).")
  ];

  // Exactly 8 Practice MCQs for Current Affairs Rule
  const mcqs = [
    {
      _key: "mcq1",
      question: "CRPF की विशेष कमांडो यूनिट CoBRA का पूरा नाम (Full Form) क्या है?",
      questionEn: "What is the full form of CRPF's specialized commando unit 'CoBRA'?",
      options: [
        "Commando Battalion for Resolute Action",
        "Combat Battalion for Regional Authority",
        "Central Commando Battalion for Rapid Action",
        "Command Battalion for Risk Assessment"
      ],
      optionsEn: [
        "Commando Battalion for Resolute Action",
        "Combat Battalion for Regional Authority",
        "Central Commando Battalion for Rapid Action",
        "Command Battalion for Risk Assessment"
      ],
      correctIndex: 0,
      explanation: "CoBRA का पूरा नाम 'Commando Battalion for Resolute Action' है। यह CRPF की एक विशेष जंगल युद्ध कमांडो यूनिट है जिसका गठन 2008-09 में नक्सलवाद से निपटने हेतु हुआ था।",
      explanationEn: "CoBRA stands for 'Commando Battalion for Resolute Action'. It is a specialized jungle warfare commando unit of CRPF formed in 2008-09 to counter Naxalism."
    },
    {
      _key: "mcq2",
      question: "सितंबर 2026 में CRPF की CoBRA यूनिट की पहली महिला IG (Inspector General) किसे नियुक्त किया गया है?",
      questionEn: "Who has been appointed as the first female IG of CRPF's CoBRA Unit in September 2026?",
      options: [
        "संजुक्ता पराशर (Sanjukta Parashar)",
        "किरण बेदी (Kiran Bedi)",
        "कंचन चौधरी भट्टाचार्य (Kanchan Chaudhary)",
        "अर्चना रामसुंदरम (Archana Ramasundaram)"
      ],
      optionsEn: [
        "Sanjukta Parashar",
        "Kiran Bedi",
        "Kanchan Chaudhary Bhattacharya",
        "Archana Ramasundaram"
      ],
      correctIndex: 0,
      explanation: "2006 बैच की IPS अधिकारी डॉ. संजुक्ता पराशर को CRPF की CoBRA यूनिट की पहली महिला Inspector General (IG) नियुक्त किया गया है।",
      explanationEn: "2006-batch IPS officer Dr. Sanjukta Parashar has been appointed as the first female Inspector General (IG) of CRPF's CoBRA Unit."
    },
    {
      _key: "mcq3",
      question: "IPS डॉ. संजुक्ता पराशर किस कैडर और बैच की भारतीय पुलिस सेवा (IPS) अधिकारी हैं?",
      questionEn: "IPS Dr. Sanjukta Parashar belongs to which cadre and batch of the Indian Police Service?",
      options: [
        "2006 बैच, असम-मेघालय कैडर",
        "2004 बैच, मध्य प्रदेश कैडर",
        "2008 बैच, उत्तर प्रदेश कैडर",
        "2005 बैच, महाराष्ट्र कैडर"
      ],
      optionsEn: [
        "2006 Batch, Assam-Meghalaya Cadre",
        "2004 Batch, Madhya Pradesh Cadre",
        "2008 Batch, Uttar Pradesh Cadre",
        "2005 Batch, Maharashtra Cadre"
      ],
      correctIndex: 0,
      explanation: "संजुक्ता पराशर 2006 बैच की IPS अधिकारी हैं जिन्हें असम-मेघालय कैडर आवंटित हुआ था।",
      explanationEn: "Sanjukta Parashar is a 2006-batch IPS officer allocated to the Assam-Meghalaya Cadre."
    },
    {
      _key: "mcq4",
      question: "CRPF द्वारा CoBRA (कमांडो बटालियन फॉर रिजॉल्यूट एक्शन) का गठन किस वर्ष किया गया था?",
      questionEn: "In which year was CRPF's CoBRA (Commando Battalion for Resolute Action) established?",
      options: [
        "2008-09",
        "2002-03",
        "2014-15",
        "1999-00"
      ],
      optionsEn: [
        "2008-09",
        "2002-03",
        "2014-15",
        "1999-00"
      ],
      correctIndex: 0,
      explanation: "वामपंथी उग्रवाद (LWE / नक्सलवाद) और पूर्वोत्तर उग्रवाद से निपटने के लिए CRPF ने 2008-09 में CoBRA का गठन किया था।",
      explanationEn: "CRPF established CoBRA in 2008-09 specifically to counter Left-Wing Extremism (LWE / Naxalism) and North-East insurgency."
    },
    {
      _key: "mcq5",
      question: "असम में उग्रवाद विरोधी अभियानों में उनकी अदम्य वीरता के लिए संजुक्ता पराशर को किस लोकप्रिय नाम से जाना जाता है?",
      questionEn: "By what popular epithet is Sanjukta Parashar known for her fierce anti-insurgency operations in Assam?",
      options: [
        "आयरन लेडी ऑफ असम (Iron Lady of Assam)",
        "झांसी की रानी",
        "नाइटिंगेल ऑफ ईस्ट",
        "ब्लेड रनर"
      ],
      optionsEn: [
        "Iron Lady of Assam",
        "Rani of Jhansi",
        "Nightingale of the East",
        "Blade Runner"
      ],
      correctIndex: 0,
      explanation: "घने जंगलों में हाथ में AK-47 लेकर NDFB और ULFA उग्रवादियों के खिलाफ प्रहार करने के कारण उन्हें 'आयरन लेडी ऑफ असम' और 'लेडी सिंघम' कहा जाता है।",
      explanationEn: "For leading operations with an AK-47 against NDFB and ULFA militants in dense forests, she is famously called the 'Iron Lady of Assam'."
    },
    {
      _key: "mcq6",
      question: "CoBRA (कमांडो बटालियन फॉर रिजॉल्यूट एक्शन) किस केंद्रीय सशस्त्र पुलिस बल (CAPF) की विशेष विंग है?",
      questionEn: "CoBRA (Commando Battalion for Resolute Action) is a specialized wing of which Central Armed Police Force (CAPF)?",
      options: [
        "CRPF (Central Reserve Police Force)",
        "BSF (Border Security Force)",
        "ITBP (Indo-Tibetan Border Police)",
        "CISF (Central Industrial Security Force)"
      ],
      optionsEn: [
        "CRPF (Central Reserve Police Force)",
        "BSF (Border Security Force)",
        "ITBP (Indo-Tibetan Border Police)",
        "CISF (Central Industrial Security Force)"
      ],
      correctIndex: 0,
      explanation: "CoBRA केंद्रीय रिजर्व पुलिस बल (CRPF) की विशेष गुरिल्ला और जंगल युद्ध कमांडो यूनिट है।",
      explanationEn: "CoBRA is the specialized guerrilla and jungle warfare commando unit of the Central Reserve Police Force (CRPF)."
    },
    {
      _key: "mcq7",
      question: "वर्तमान में CoBRA सेक्टर के अंतर्गत कितनी CoBRA यूनिट्स / बटालियन कार्यरत हैं?",
      questionEn: "How many CoBRA battalions / units operate under the CoBRA Sector currently?",
      options: [
        "10 बटालियन",
        "05 बटालियन",
        "15 बटालियन",
        "20 बटालियन"
      ],
      optionsEn: [
        "10 Battalions",
        "05 Battalions",
        "15 Battalions",
        "20 Battalions"
      ],
      correctIndex: 0,
      explanation: "वर्तमान में CoBRA सेक्टर के अंतर्गत 10 CoBRA बटालियन कार्यरत हैं जो वामपंथी उग्रवाद (LWE) प्रभावित राज्यों में तैनात हैं।",
      explanationEn: "Currently, 10 CoBRA battalions operate under the CoBRA sector deployed in Left-Wing Extremism (LWE) affected regions."
    },
    {
      _key: "mcq8",
      question: "डॉ. संजुक्ता पराशर ने CRPF CoBRA के IG पद पर किस 1996 बैच के IPS अधिकारी का स्थान लिया?",
      questionEn: "Dr. Sanjukta Parashar succeeded which 1996-batch IPS officer as IG of CRPF CoBRA?",
      options: [
        "दानेश राणा (Danesh Rana)",
        "राजीव राय भटनागर (Rajiv Rai Bhatnagar)",
        "कुलदीप सिंह (Kuldiep Singh)",
        "अनीश दयाल सिंह (Anish Dayal Singh)"
      ],
      optionsEn: [
        "Danesh Rana",
        "Rajiv Rai Bhatnagar",
        "Kuldiep Singh",
        "Anish Dayal Singh"
      ],
      correctIndex: 0,
      explanation: "संजुक्ता पराशर ने 1996 बैच के IPS अधिकारी दानेश राणा का स्थान लिया है।",
      explanationEn: "Dr. Sanjukta Parashar succeeded 1996-batch IPS officer Danesh Rana."
    }
  ];

  // 10 Collapsible FAQs
  const faqs = [
    {
      _key: "faq1",
      question: "संजुक्ता पराशर कौन हैं और वे क्यों चर्चा में हैं?",
      answer: "संजुक्ता पराशर 2006 बैच की असम-मेघालय कैडर की IPS अधिकारी हैं। सितंबर 2026 में उन्हें CRPF की विशेष कमांडो यूनिट CoBRA (Commando Battalion for Resolute Action) की पहली महिला Inspector General (IG) नियुक्त किया गया है।",
      questionEn: "Who is Sanjukta Parashar and why is she in news?",
      answerEn: "Sanjukta Parashar is a 2006-batch IPS officer of Assam-Meghalaya cadre. In September 2026, she became the first woman Inspector General (IG) of CRPF's specialized commando unit CoBRA."
    },
    {
      _key: "faq2",
      question: "CoBRA का पूरा नाम (Full Form) और इसका मुख्य कार्य क्या है?",
      answer: "CoBRA का पूरा नाम 'Commando Battalion for Resolute Action' है। यह CRPF की विशेष कमांडो यूनिट है जिसे मुख्य रूप से जंगल युद्ध, वामपंथी उग्रवाद (LWE / नक्सलवाद) और गुरिल्ला ऑपरेशनों के लिए गठित किया गया है।",
      questionEn: "What is the full form and role of CoBRA?",
      answerEn: "CoBRA stands for Commando Battalion for Resolute Action. It is CRPF's specialized commando unit designed for jungle warfare, guerrilla tactics, and countering Left Wing Extremism (LWE)."
    },
    {
      _key: "faq3",
      question: "CoBRA का गठन किस वर्ष हुआ था और इसमें कुल कितनी बटालियन हैं?",
      answer: "CoBRA का गठन वर्ष 2008-09 में किया गया था। वर्तमान में इसके अंतर्गत 10 CoBRA बटालियन कार्यरत हैं जो नक्सल प्रभावित राज्यों में तैनात हैं।",
      questionEn: "When was CoBRA established and how many battalions does it have?",
      answerEn: "CoBRA was established in 2008-09. Currently, there are 10 CoBRA battalions operating under the CoBRA Sector in LWE-affected states."
    },
    {
      _key: "faq4",
      question: "संजुक्ता पराशर को किस लोकप्रिय नाम से जाना जाता है?",
      answer: "असम में उग्रवादियों (ULFA और NDFB) के खिलाफ हाथ में AK-47 लेकर वीरतापूर्वक अभियानों का नेतृत्व करने के लिए उन्हें 'आयरन लेडी ऑफ असम' और 'लेडी सिंघम' कहा जाता है।",
      questionEn: "What popular epithet is given to Sanjukta Parashar?",
      answerEn: "She is popularly known as the 'Iron Lady of Assam' and 'Lady Singham' for personally leading anti-terror strikes with an AK-47 assault rifle in Assam's dense forests."
    },
    {
      _key: "faq5",
      question: "संजुक्ता पराशर की UPSC रैंक और पुलिस सेवा में प्रवेश कब हुआ?",
      answer: "संजुक्ता पराशर ने 2005-06 की UPSC सिविल सेवा परीक्षा में ऑल इंडिया रैंक 85 (AIR 85) हासिल की और 2006 में भारतीय पुलिस सेवा (IPS) में शामिल हुईं।",
      questionEn: "What was Sanjukta Parashar's UPSC rank and entry into IPS?",
      answerEn: "She secured All India Rank 85 (AIR 85) in UPSC CSE 2005-06 and formally joined the Indian Police Service (IPS) in 2006."
    },
    {
      _key: "faq6",
      question: "CoBRA कमांडोज को किस अन्य नाम से जाना जाता है?",
      answer: "CoBRA कमांडोज को कठिन भौगोलिक क्षेत्रों और घने जंगलों में उनकी अदम्य लडाई क्षमता के कारण 'जंगल वॉरियर्स' (Jungle Warriors) भी कहा जाता है।",
      questionEn: "By what other name are CoBRA commandos known?",
      answerEn: "CoBRA commandos are commonly known as 'Jungle Warriors' due to their specialized combat proficiency in dense tropical rainforests."
    },
    {
      _key: "faq7",
      question: "संजुक्ता पराशर ने NIA में क्या कार्य किया?",
      answer: "वर्ष 2017 से 2024 तक संजुक्ता पराशर राष्ट्रीय जांच एजेंसी (NIA) में केंद्रीय प्रतिनियुक्ति पर बतौर DIG कार्यरत रहीं, जहाँ उन्होंने गंभीर टेरर फंडिंग व आतंकवाद संबंधी मामलों की जांच की।",
      questionEn: "What role did Sanjukta Parashar play in NIA?",
      answerEn: "From 2017 to 2024, she served as DIG in the National Investigation Agency (NIA) on central deputation, supervising high-profile terror investigations."
    },
    {
      _key: "faq8",
      question: "CoBRA की हालिया विशेष तैनाती कहाँ की गई है?",
      answer: "CRPF ने हाल ही में (2026 में) मणिपुर में भड़की सशस्त्र हिंसा पर नियंत्रण पाने हेतु CoBRA की दो विशेष यूनिट्स तैनात की हैं।",
      questionEn: "Where has CoBRA been deployed recently in 2026?",
      answerEn: "CRPF deployed two CoBRA units in Manipur in 2026 to curb armed violence and stabilize the conflict-affected region."
    },
    {
      _key: "faq9",
      question: "CoBRA के IG पद पर संजुक्ता पराशर ने किसका स्थान लिया?",
      answer: "उन्होंने 1996 बैच के IPS अधिकारी दानेश राणा का स्थान लिया।",
      questionEn: "Whom did Sanjukta Parashar succeed as IG of CoBRA?",
      answerEn: "She succeeded 1996-batch IPS officer Danesh Rana as Inspector General of CRPF CoBRA."
    },
    {
      _key: "faq10",
      question: "यह विषय MPPSC व UPSC परीक्षा के लिए क्यों महत्वपूर्ण है?",
      answer: "यह विषय महिला सशक्तिकरण (Women Empowerment), आंतरिक सुरक्षा (Internal Security - GS Paper 3), नक्सलवाद (LWE) तथा भारत के प्रमुख सुरक्षा बलों से संबंधित समसामयिक प्रश्नों के लिए अत्यंत महत्वपूर्ण है।",
      questionEn: "Why is this topic important for MPPSC and UPSC exams?",
      answerEn: "This topic is vital for MPPSC and UPSC exams covering Internal Security (GS Paper 3), CAPF leadership, Left-Wing Extremism (LWE), and Women Empowerment in Security Forces."
    }
  ];

  const articleDoc = {
    _id: docId,
    _type: "currentAffairs",
    title: "संजुक्ता पराशर: CRPF CoBRA की पहली महिला IG बनीं | IPS अधिकारी नियुक्ति, करियर प्रोफाइल व परीक्षा उपयोगी तथ्य",
    titleEn: "IPS Sanjukta Parashar Appointed First Female IG of CRPF CoBRA: Career Profile, Security Forces & Exam Notes",
    slug: {
      _type: "slug",
      current: docId,
    },
    date: "2026-09-18T00:00:00Z",
    publishedAt: "2026-09-18T00:00:00Z",
    author: "Aakar IAS Team",
    category: "Security / Current Affairs",
    tags: ["tag-mppsc", "tag-upsc", "tag-current-affairs", "tag-security-forces", "tag-women-empowerment"],
    excerpt: "2006 बैच की IPS अधिकारी संजुक्ता पराशर को CRPF की विशेष कमांडो यूनिट CoBRA (Commando Battalion for Resolute Action) का पहली महिला IG नियुक्त किया गया है। जानें उनका करियर प्रोफाइल, CoBRA यूनिट का इतिहास एवं MPPSC व UPSC परीक्षा उपयोगी तथ्य।",
    excerptEn: "IPS officer Dr. Sanjukta Parashar (2006 batch, Assam-Meghalaya cadre) has been appointed as the first woman Inspector General (IG) of CRPF CoBRA (Commando Battalion for Resolute Action). Read her career profile, CoBRA operational role, and key exam notes.",
    featuredImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: bannerAsset._id,
      },
      alt: "IPS Sanjukta Parashar appointed first woman IG of CRPF CoBRA commando unit jungle warriors",
      caption: "IPS अधिकारी डॉ. संजुक्ता पराशर — CRPF की विशेष कमांडो यूनिट CoBRA (Commando Battalion for Resolute Action) की पहली महिला Inspector General (IG)",
    },
    nextArticle: {
      title: "MP Police Constable Bharti 2026: 7500+ पदों पर भर्ती अधिसूचना जारी",
      titleEn: "MP Police Constable Recruitment 2026: 7500+ Posts Notification Out",
      href: "/notifications/mp-police-constable-recruitment-2026",
    },
    body,
    bodyEn,
    mcqs,
    faqs,
  };

  console.log("🚀 Creating/Replacing Current Affairs document in Sanity CMS...");
  const res = await client.createOrReplace(articleDoc);
  console.log("✅ Successfully published Sanjukta Parashar CoBRA IG article to Sanity CMS!");
  console.log("📄 Document ID:", res._id);
  console.log("🔗 Slug:", res.slug.current);
}

main().catch((err) => {
  console.error("❌ Error uploading article to Sanity:", err);
  process.exit(1);
});
