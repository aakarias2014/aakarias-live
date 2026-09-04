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

function createBlocks(items: string[]): any[] {
  return items.map((text, idx) => {
    const randomSuffix = Math.random().toString(36).substring(2, 9);
    if (text.startsWith("### ")) {
      return {
        _key: `block-h-${idx}-${randomSuffix}`,
        _type: "block",
        style: "h3",
        children: [
          {
            _key: `span-h-${idx}-${randomSuffix}`,
            _type: "span",
            text: text.replace("### ", ""),
          },
        ],
      };
    }
    return {
      _key: `block-${idx}-${randomSuffix}`,
      _type: "block",
      style: "normal",
      children: [
        {
          _key: `span-${idx}-${randomSuffix}`,
          _type: "span",
          text: text,
        },
      ],
    };
  });
}

async function main() {
  console.log("🚀 Starting upload process for ISRO GSLV-F17 / EOS-05 Current Affairs Article...");

  const imagePaths = {
    launch: "/Users/aakariastech/.gemini/antigravity-ide/brain/f3f4306f-5b76-4abc-af05-6e33bf4e042f/isro_gslv_f17_eos_05_launch_1788517994143.jpg",
    satellite: "/Users/aakariastech/.gemini/antigravity-ide/brain/f3f4306f-5b76-4abc-af05-6e33bf4e042f/eos_05_satellite_orbit_earth_1788518020367.jpg",
    controlRoom: "/Users/aakariastech/.gemini/antigravity-ide/brain/f3f4306f-5b76-4abc-af05-6e33bf4e042f/isro_control_center_scientists_mission_1788518046731.jpg",
  };

  if (!fs.existsSync(imagePaths.launch) || !fs.existsSync(imagePaths.satellite) || !fs.existsSync(imagePaths.controlRoom)) {
    console.error("❌ Required generated images not found!");
    process.exit(1);
  }

  console.log("📸 Uploading Launch Image...");
  const assetLaunch = await client.assets.upload("image", fs.createReadStream(imagePaths.launch), {
    filename: "isro_gslv_f17_launch.jpg",
  });

  console.log("📸 Uploading Satellite Orbit Image...");
  const assetSatellite = await client.assets.upload("image", fs.createReadStream(imagePaths.satellite), {
    filename: "eos_05_satellite_orbit.jpg",
  });

  console.log("📸 Uploading Scientists Control Room Image...");
  const assetControlRoom = await client.assets.upload("image", fs.createReadStream(imagePaths.controlRoom), {
    filename: "isro_control_room_scientists.jpg",
  });

  const slug = "isro-gslv-f17-eos-05-satellite-launch-2026";
  const docId = `currentAffairs-${slug}`;

  const article: any = {
    _id: docId,
    _type: "currentAffairs",
    title: "अंतरिक्ष में ISRO ने रचा इतिहास: GSLV-F17 के साथ लॉन्च हुआ 'बाज' सैटेलाइट EOS-05, देश की सीमाओं पर रखेगा नजर",
    titleEn: "ISRO Creates History in Space: GSLV-F17 Launches 'Eye in the Sky' EOS-05 Satellite for Real-Time Border Surveillance",
    slug: {
      _type: "slug",
      current: slug,
    },
    excerpt: "4 सितंबर 2026 को भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने सतीश धवन अंतरिक्ष केंद्र, श्रीहरिकोटा से GSLV-F17 रॉकेट के माध्यम से उन्नत पृथ्वी अवलोकन उपग्रह EOS-05 ('बाज' / Eye in the Sky) का सफल प्रक्षेपण किया। जानिए MPPSC और UPSC परीक्षा के दृष्टिकोण से इस मिशन के सभी प्रमुख पहलू।",
    excerptEn: "On 4 September 2026, ISRO successfully launched the advanced Earth Observation Satellite EOS-05 ('Eye in the Sky') using the GSLV-F17 launch vehicle from SDSC SHAR, Sriharikota. Explore technical details and MPPSC & UPSC exam highlights.",
    author: "Deepraj Sikarwar (Editorial Team)",
    ca_date: "2026-09-04",
    publishedAt: "2026-09-04T10:30:00Z",
    category: "Science & Technology",
    tags: [
      "tag-mppsc",
      "tag-upsc",
      "isro",
      "gslv-f17",
      "eos-05",
      "gisat-1a",
      "space-technology",
      "satellite-launch",
      "science-and-technology",
      "current-affairs-2026"
    ],
    mainImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: assetLaunch._id,
      },
      alt: "ISRO GSLV-F17 Launching EOS-05 Satellite from Sriharikota",
      caption: "GSLV-F17 का श्रीहरिकोटा के सतीश धवन अंतरिक्ष केंद्र से ऐतिहासिक सफल प्रक्षेपण",
    },

    body: [
      ...createBlocks([
        "### मिशन का परिचय एवं ऐतिहासिक सफलता (Mission Overview)",
        "भारतीय अंतरिक्ष अनुसंधान संगठन (**ISRO**) ने **4 सितंबर 2026** को भारत के अंतरिक्ष इतिहास में एक नया अध्याय जोड़ते हुए **GSLV-F17** (Geosynchronus Satellite Launch Vehicle) प्रक्षेपण यान के माध्यम से अपने अत्याधुनिक पृथ्वी अवलोकन उपग्रह **EOS-05** (Earth Observation Satellite-05) को सफलता से प्रक्षेपित किया।",
        "यह प्रक्षेपण आंध्र प्रदेश के **श्रीहरिकोटा स्थित सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR)** के द्वितीय लॉन्च पैड से सुबह 02:55 बजे (IST) संपन्न हुआ। EOS-05 उपग्रह को पूर्व में **GISAT-1A** के नाम से जाना जाता था।",
        "**MPPSC (मध्य प्रदेश लोक सेवा आयोग)** की राज्य सेवा मुख्य परीक्षा (Mains) के **सामान्य अध्ययन प्रश्नपत्र-3 (GS Paper-3)** के 'विज्ञान एवं प्रौद्योगिकी' खंड तथा प्रारंभिक परीक्षा (Prelims) के करेंट अफेयर्स के दृष्टिकोण से यह मिशन अत्यधिक महत्वपूर्ण है।",
        "• **लॉन्च व्हीकल (प्रक्षेपण यान)**: GSLV-F17 (यह GSLV श्रेणी की **19वीं उड़ान** है)।",
        "• **उपग्रह (Satellite)**: EOS-05 (Earth Observation Satellite), जिसे 'अंतरिक्ष में भारत की बाज आँख' (Eye in the Sky) कहा जा रहा है।",
        "• **उपग्रह का वजन (Mass)**: लगभग **2,367 किलोग्राम**।",
        "• **कक्षा (Target Orbit)**: सब-जियोसिंक्रोनस ट्रांसफर ऑर्बिट (Sub-GTO), जहाँ से उपग्रह के ऑन-बोर्ड थ्रस्टर्स के जरिए इसे **36,000 किमी** की भू-स्थिर कक्षा (Geostationary Orbit - GEO) में स्थापित किया जाएगा।",
        "• **मिशन अवधि (Mission Life)**: लगभग **7 वर्ष** से अधिक।",
      ]),

      {
        _key: "img-satellite-hi",
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetSatellite._id,
        },
        alt: "EOS-05 Satellite observing Earth from Geostationary Orbit",
        caption: "भू-स्थिर कक्षा (GEO) में पृथ्वी की सतत निगरानी करता EOS-05 उपग्रह",
      },

      ...createBlocks([
        "### तकनीक एवं रॉकेट की संरचना (Technical Specifications)",
        "GSLV-F17 एक **त्रि-स्तरीय (Three-Stage)** भारी पेलोड क्षमता वाला प्रक्षेपण यान है, जो स्वदेशी क्रायोजेनिक तकनीक से संचालित होता है:",
        "• **प्रथम चरण (Solid Stage - S139)**: ठोस ईंधन मोटर (S139) के साथ **4 लिक्विड स्ट्रैप-ऑन मोटर्स (L40)** का उपयोग किया गया है जो शुरुआती लिफ्ट-ऑफ थ्रस्ट प्रदान करते हैं।",
        "• **द्वितीय चरण (Liquid Stage)**: तरल ईंधन चालित **विकास इंजन (Vikas Engine)**, जो रॉकेट को उच्च गति एवं स्थिरता प्रदान करता है।",
        "• **तृतीय चरण (Cryogenic Stage - CUS15)**: स्वदेशी **क्रायोजेनिक अपर स्टेज (CUS-15)**, जो तरल हाइड्रोजन ($LH_2$) और तरल ऑक्सीजन ($LOX$) का उपयोग करता है।",
        "• **रॉकेट की कुल ऊँचाई एवं द्रव्यमान**: GSLV-F17 की कुल ऊँचाई **51.7 मीटर** और लिफ्ट-ऑफ द्रव्यमान (Lift-off Mass) लगभग **420.5 टन** है।",
        "• **पेलोड सेंसर्स एवं इमेजर**: उपग्रह में **हाइपरस्पेक्ट्रल इमेजर (Hyperspectral Imager)**, इन्फ्रारेड (Infrared) और दृश्यमान (Visible) तरंगदैर्ध्य में उच्च-रिजॉल्यूशन तस्वीरें लेने वाले बहु-स्पेक्ट्रमी कैमरे लगाए गए हैं।",
      ]),

      {
        _key: "img-control-room-hi",
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetControlRoom._id,
        },
        alt: "ISRO Scientists at Mission Control Center Sriharikota celebrating GSLV-F17 success",
        caption: "मिशन कंट्रोल सेंटर श्रीहरिकोटा में वैज्ञानिक GSLV-F17 की सफल लैंडिंग व कक्षा प्रवेश का जश्न मनाते हुए",
      },

      ...createBlocks([
        "### मिशन का रणनीतिक महत्व एवं अनुप्रयोग (Significance & Strategic Applications)",
        "EOS-05 उपग्रह के प्रक्षेपण से भारत की अंतरिक्ष आधारित निगरानी क्षमता में अभूतपूर्व वृद्धि हुई है। MPPSC मुख्य परीक्षा में इसके निम्नलिखित मुख्य अनुप्रयोग उत्तर लेखन में शामिल किए जा सकते हैं:",
        "• **1. राष्ट्रीय सुरक्षा एवं सीमा निगरानी (National Security & Border Surveillance)**: यह उपग्रह **भू-स्थिर कक्षा (GEO)** में स्थापित होकर भारत की थल सीमाओं (LAC, LOC) तथा हिंद महासागर (IOR) पर निरंतर नजर रखेगा। हर **30 मिनट** में भारतीय भूभाग की रियल-टाइम तस्वीरें भेजना इसकी सबसे बड़ी ताकत है।",
        "• **2. आपदा प्रबंधन (Disaster Management)**: चक्रवात (Cyclones), बाढ़ (Floods), भूस्खलन (Landslides), और जंगलों की आग (Forest Fires) की त्वरित पहचान और रियल-टाइम डेटा प्रदान करके जन-धन की हानि रोकने में सहायक होगा।",
        "• **3. कृषि एवं वानिकी विकास (Agriculture & Forestry)**: फसलों के स्वास्थ्य का सटीक आकलन, मिट्टी की नमी (Soil Moisture) का मापन और वन आवरण (Forest Cover) में हो रहे अवैध बदलावों की निगरानी संभव होगी।",
        "• **4. जल संसाधन एवं समुद्र तटीय अवलोकन (Oceanographic & Hydrological Monitoring)**: भारतीय तटरेखा, ग्लेशियरों के पिघलने तथा जल निकायों के फैलाव की जानकारी प्राप्त होगी।",

        "### MPPSC एवं परीक्षा उपयोगी मुख्य तथ्य (Key Exam Highlights for MPPSC)",
        "• **प्रक्षेपण तिथि**: 4 सितंबर 2026",
        "• **प्रक्षेपण स्थल**: सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR), श्रीहरिकोटा, आंध्र प्रदेश",
        "• **रॉकेट**: GSLV-F17 (19वीं GSLV उड़ान)",
        "• **उपग्रह का नाम**: EOS-05 (पूर्व नाम: GISAT-1A)",
        "• **उपग्रह की श्रेणी**: पृथ्वी अवलोकन उपग्रह (Earth Observation Satellite)",
        "• **कक्षा**: जियोसिंक्रोनस / जियोस्टेशनरी ऑर्बिट (GEO - 36,000 किमी)",
        "• **इसरो अध्यक्ष (ISRO Chairman)**: डॉ. एस. सोमनाथ (या तत्कालीन इसरो प्रमुख)",
        "• **क्रायोजेनिक स्टेज**: स्वदेशी CUS-15 इंजन",

        "### मुख्य परीक्षा उत्तर संवर्धन बिंदु (Mains Booster Capsule)",
        "**\"GSLV-F17/EOS-05 मिशन भारत की अंतरिक्ष सुरक्षा और आपदा प्रबंधन प्रणाली को भू-स्थिर कक्षा से रियल-टाइम इमेजिंग प्रदान करने वाला एक क्रांतिकारी मील का पत्थर है। यह भारत की 'आई इन द स्काई' क्षमता को सुदृढ़ कर राष्ट्रीय सुरक्षा और आत्मनिर्भर भारत की परिकल्पना को साकार करता है।\"**"
      ])
    ],

    bodyEn: [
      ...createBlocks([
        "### Mission Overview and Historical Milestone",
        "On **4 September 2026**, the Indian Space Research Organisation (**ISRO**) scripted another golden chapter in space technology by successfully launching the advanced Earth Observation Satellite **EOS-05** aboard the **GSLV-F17** (Geosynchronous Satellite Launch Vehicle) rocket.",
        "The launch took place at 02:55 AM (IST) from the Second Launch Pad of **Satish Dhawan Space Centre (SDSC SHAR), Sriharikota**. EOS-05 was previously designated as **GISAT-1A**.",
        "This mission holds immense significance for competitive examinations, especially **MPPSC Mains (GS Paper-3: Science & Technology)** and **MPPSC / UPSC Prelims Current Affairs**.",
        "• **Launch Vehicle**: GSLV-F17 (This marks the **19th flight** of the GSLV launch vehicle series).",
        "• **Satellite**: EOS-05 (Earth Observation Satellite), famously dubbed as India's **'Eye in the Sky'**.",
        "• **Satellite Mass**: Approximately **2,367 kg**.",
        "• **Target Orbit**: Sub-Geosynchronous Transfer Orbit (Sub-GTO), from where the satellite will be placed into a **36,000 km** Geostationary Orbit (GEO) using onboard propulsion.",
        "• **Mission Lifespan**: Expected to operate for more than **7 years**.",
      ]),

      {
        _key: "img-satellite-en",
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetSatellite._id,
        },
        alt: "EOS-05 Satellite observing Earth from Geostationary Orbit",
        caption: "EOS-05 Satellite monitoring the Indian subcontinent continuously from Geostationary Orbit",
      },

      ...createBlocks([
        "### Technical Specifications and Vehicle Architecture",
        "GSLV-F17 is a **three-stage heavy-lift launch vehicle** powered by indigenous cryogenic technology:",
        "• **First Stage (Solid Stage - S139)**: Core solid motor (S139) augmented by **4 liquid strap-on motors (L40)** providing intense lift-off thrust.",
        "• **Second Stage (Liquid Stage)**: Powered by the liquid-fueled **Vikas Engine**, delivering high velocity and stability.",
        "• **Third Stage (Cryogenic Stage - CUS15)**: Indigenous **Cryogenic Upper Stage (CUS-15)**, fueled by Liquid Hydrogen ($LH_2$) and Liquid Oxygen ($LOX$).",
        "• **Vehicle Height and Mass**: Total height of GSLV-F17 is **51.7 meters** with a lift-off mass of approximately **420.5 tonnes**.",
        "• **Payload Sensors & Imager**: Equipped with high-resolution **Hyperspectral Imagers**, Multispectral cameras operating across Visible, Near-Infrared (NIR), and Thermal Infrared (TIR) bands.",
      ]),

      {
        _key: "img-control-room-en",
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetControlRoom._id,
        },
        alt: "ISRO Scientists at Mission Control Center Sriharikota celebrating GSLV-F17 success",
        caption: "ISRO Scientists celebrating the flawless orbit insertion of EOS-05 at SDSC SHAR Mission Control Room",
      },

      ...createBlocks([
        "### Strategic Applications and Significance",
        "The deployment of EOS-05 drastically elevates India's satellite-based surveillance and monitoring framework:",
        "• **1. National Security & Border Surveillance**: Stationed in **Geostationary Orbit (GEO)**, EOS-05 maintains round-the-clock vigil over land borders (LAC, LOC) and the Indian Ocean Region (IOR). Its ability to transmit real-time images every **30 minutes** is a major strategic booster.",
        "• **2. Disaster Management**: Enables rapid detection and alert systems for Cyclones, Floods, Landslides, and Forest Fires, saving human lives and infrastructure.",
        "• **3. Agriculture & Forestry**: Precise assessment of crop health, soil moisture mapping, and tracking illegal deforestation.",
        "• **4. Oceanographic & Water Resource Tracking**: Provides vital inputs on coastline changes, glacier melting, and surface water bodies.",

        "### Key Quick Facts for MPPSC & Competitive Exams",
        "• **Launch Date**: 4 September 2026",
        "• **Launch Site**: Satish Dhawan Space Centre (SDSC SHAR), Sriharikota",
        "• **Launch Vehicle**: GSLV-F17 (19th GSLV Mission)",
        "• **Satellite Name**: EOS-05 (Former Name: GISAT-1A)",
        "• **Category**: Earth Observation Satellite (EOS)",
        "• **Target Orbit**: Geostationary Orbit (GEO - 36,000 km)",
        "• **Propulsion Stage**: Indigenous CUS-15 Cryogenic Engine",

        "### Mains Answer Booster Capsule",
        "**\"The successful GSLV-F17/EOS-05 launch represents a paradigm shift in India's space-based earth observation capabilities. By offering continuous real-time imaging from a Geostationary Orbit, EOS-05 acts as India's 'Eye in the Sky', fortifying national security, disaster mitigation, and socio-economic planning under Atmanirbhar Bharat.\"**"
      ])
    ],

    mcqs: [
      {
        question: "4 सितंबर 2026 को इसरो (ISRO) द्वारा लॉन्च किए गए पृथ्वी अवलोकन उपग्रह EOS-05 का प्रक्षेपण किस रॉकेट से किया गया?",
        questionEn: "Which launch vehicle was used by ISRO to launch the Earth Observation Satellite EOS-05 on 4 September 2026?",
        options: ["PSLV-C58", "GSLV-F17", "SSLV-D3", "LVM3-M4"],
        optionsEn: ["PSLV-C58", "GSLV-F17", "SSLV-D3", "LVM3-M4"],
        correctIndex: 1,
        explanation: "ISRO ने 4 सितंबर 2026 को श्रीहरिकोटा से GSLV-F17 रॉकेट के माध्यम से EOS-05 उपग्रह का सफल प्रक्षेपण किया।",
        explanationEn: "ISRO successfully launched the EOS-05 satellite aboard the GSLV-F17 launch vehicle from Sriharikota on 4 September 2026."
      },
      {
        question: "उपग्रह EOS-05 को पूर्व में किस नाम से जाना जाता था?",
        questionEn: "By what former name was the EOS-05 satellite known?",
        options: ["Cartosat-3", "GISAT-1A", "Risat-2BR1", "OceanSat-3"],
        optionsEn: ["Cartosat-3", "GISAT-1A", "Risat-2BR1", "OceanSat-3"],
        correctIndex: 1,
        explanation: "EOS-05 उपग्रह को पूर्व में GISAT-1A (Geo Imaging Satellite-1A) के नाम से जाना जाता था।",
        explanationEn: "The EOS-05 satellite was previously designated as GISAT-1A (Geo Imaging Satellite-1A)."
      },
      {
        question: "EOS-05 उपग्रह को किस कक्षा में स्थापित किया गया है?",
        questionEn: "Into which orbit has the EOS-05 satellite been deployed for continuous imaging?",
        options: ["लो अर्थ ऑर्बिट (LEO)", "सन-सिंक्रोनस ऑर्बिट (SSO)", "जियोस्टेशनरी ऑर्बिट (GEO)", "मीडियम अर्थ ऑर्बिट (MEO)"],
        optionsEn: ["Low Earth Orbit (LEO)", "Sun-Synchronous Orbit (SSO)", "Geostationary Orbit (GEO)", "Medium Earth Orbit (MEO)"],
        correctIndex: 2,
        explanation: "EOS-05 को सब-GTO के माध्यम से 36,000 किमी की भू-स्थिर कक्षा (Geostationary Orbit - GEO) में स्थापित किया गया है।",
        explanationEn: "EOS-05 is deployed into a Geostationary Orbit (GEO) at an altitude of approximately 36,000 km."
      },
      {
        question: "GSLV रॉकेट के तीसरे चरण (Third Stage) में किस प्रकार के ईंधन का उपयोग किया जाता है?",
        questionEn: "What type of fuel propulsion system is used in the third stage of the GSLV rocket?",
        options: ["ठोस ईंधन (Solid Fuel)", "तरल ईंधन (Vikas Engine)", "क्रायोजेनिक ईधन (Liquid Hydrogen & Liquid Oxygen)", "परमाणु ईंधन (Nuclear Fuel)"],
        optionsEn: ["Solid Propulsion", "Liquid Vikas Engine", "Cryogenic Propulsion (LH2 & LOX)", "Nuclear Propulsion"],
        correctIndex: 2,
        explanation: "GSLV के तीसरे चरण (CUS-15) में स्वदेशी क्रायोजेनिक इंजन का उपयोग होता है, जिसमें तरल हाइड्रोजन और तरल ऑक्सीजन ईंधन के रूप में होते हैं।",
        explanationEn: "The third stage of GSLV utilizes an indigenous Cryogenic Upper Stage (CUS-15) powered by Liquid Hydrogen and Liquid Oxygen."
      },
      {
        question: "EOS-05 उपग्रह की मुख्य विशेषता क्या है, जिसके कारण इसे 'Eye in the Sky' (आकाश में बाज़) कहा जा रहा है?",
        questionEn: "What is the primary feature of EOS-05 satellite due to which it is called 'Eye in the Sky'?",
        options: [
          "यह चंद्रमा की तस्वीरें लेता है।",
          "यह हर 30 मिनट में भारतीय भूभाग की रियल-टाइम तस्वीरें भेज सकता है।",
          "यह केवल रात में कार्य करता है।",
          "यह एक गुप्त संचार उपग्रह है।"
        ],
        optionsEn: [
          "It captures lunar surface images.",
          "It can transmit real-time images of the Indian subcontinent every 30 minutes.",
          "It functions exclusively at night.",
          "It is a covert telecommunications satellite."
        ],
        correctIndex: 1,
        explanation: "EOS-05 भू-स्थिर कक्षा से हर 30 मिनट में भारतीय भूभाग और सीमाओं की निरंतर रियल-टाइम तस्वीरें प्रदान करने में सक्षम है।",
        explanationEn: "Positioned in GEO, EOS-05 provides continuous real-time imagery of the Indian landmass and borders every 30 minutes."
      },
      {
        question: "सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR) मध्य प्रदेश / भारत के किस राज्य में स्थित है?",
        questionEn: "Satish Dhawan Space Centre (SDSC SHAR) is located in which Indian state?",
        options: ["तमिलनाडु", "केरल", "आंध्र प्रदेश", "ओडिशा"],
        optionsEn: ["Tamil Nadu", "Kerala", "Andhra Pradesh", "Odisha"],
        correctIndex: 2,
        explanation: "सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR) आंध्र प्रदेश के तिरुपति जिले में स्थित श्रीहरिकोटा द्वीप पर स्थित है।",
        explanationEn: "Satish Dhawan Space Centre (SDSC SHAR) is located at Sriharikota island in Tirupati district, Andhra Pradesh."
      },
      {
        question: "GSLV-F17 मिशन, GSLV श्रेणी के प्रक्षेपण यान की कौन-सी उड़ान थी?",
        questionEn: "GSLV-F17 mission marked which flight number for the GSLV series launch vehicles?",
        options: ["12वीं उड़ान", "15वीं उड़ान", "19वीं उड़ान", "25वीं उड़ान"],
        optionsEn: ["12th Flight", "15th Flight", "19th Flight", "25th Flight"],
        correctIndex: 2,
        explanation: "GSLV-F17 इसरो के GSLV श्रेणी के प्रक्षेपण यान की 19वीं उड़ान (19th Flight) थी।",
        explanationEn: "GSLV-F17 was the 19th flight of ISRO's Geosynchronous Satellite Launch Vehicle series."
      },
      {
        question: "EOS-05 उपग्रह का कुल द्रव्यमान (Mass) लगभग कितना है?",
        questionEn: "What is the approximate total mass of the EOS-05 satellite launched by ISRO?",
        options: ["1,200 किग्रा", "1,850 किग्रा", "2,367 किग्रा", "4,100 किग्रा"],
        optionsEn: ["1,200 kg", "1,850 kg", "2,367 kg", "4,100 kg"],
        correctIndex: 2,
        explanation: "EOS-05 उपग्रह का कुल द्रव्यमान लगभग 2,367 किलोग्राम है।",
        explanationEn: "The total lift-off mass of the EOS-05 satellite is approximately 2,367 kg."
      }
    ],

    faqs: [
      {
        question: "EOS-05 उपग्रह क्या है और इसका मुख्य उद्देश्य क्या है?",
        questionEn: "What is the EOS-05 satellite and what is its main objective?",
        answer: "EOS-05 (Earth Observation Satellite-05) इसरो द्वारा विकसित एक अत्याधुनिक भू-प्रेक्षण उपग्रह है। इसका मुख्य उद्देश्य भारत की सीमाओं (LAC/LOC), तटीय क्षेत्रों की रियल-टाइम निगरानी और आपदा प्रबंधन में सटीक डेटा प्रदान करना है।",
        answerEn: "EOS-05 is a state-of-the-art Earth Observation Satellite developed by ISRO designed for continuous real-time surveillance of India's borders, coastal zones, and rapid disaster monitoring."
      },
      {
        question: "EOS-05 उपग्रह को 'Eye in the Sky' क्यों कहा जा रहा है?",
        questionEn: "Why is EOS-05 being called India's 'Eye in the Sky'?",
        answer: "इसे 'Eye in the Sky' इसलिए कहा जा रहा है क्योंकि यह भू-स्थिर कक्षा (GEO - 36,000 किमी) में रहकर हर 30 मिनट में संपूर्ण भारतीय उपमहाद्वीप की हाई-रिजॉल्यूशन रियल-टाइम तस्वीरें भेजने में सक्षम है।",
        answerEn: "It is dubbed 'Eye in the Sky' because operating from Geostationary Orbit (36,000 km), it can transmit high-resolution real-time images of the entire Indian subcontinent every 30 minutes."
      },
      {
        question: "GSLV-F17 रॉकेट में कितने चरण (Stages) होते हैं?",
        questionEn: "How many stages are there in the GSLV-F17 rocket?",
        answer: "GSLV-F17 तीन चरणों वाला रॉकेट है: प्रथम चरण (ठोस ईंधन S139 + 4 लिक्विड स्ट्रैप-ऑन L40), द्वितीय चरण (तरल विकास इंजन), और तृतीय चरण (स्वदेशी क्रायोजेनिक CUS-15 इंजन)।",
        answerEn: "GSLV-F17 is a three-stage launch vehicle: First Stage (Solid S139 motor + 4 liquid L40 strap-ons), Second Stage (Liquid Vikas Engine), and Third Stage (Indigenous Cryogenic CUS-15 Engine)."
      },
      {
        question: "MPPSC परीक्षा के लिए GSLV-F17 / EOS-05 टॉपिक क्यों महत्वपूर्ण है?",
        questionEn: "Why is the GSLV-F17 / EOS-05 topic important for MPPSC examination?",
        answer: "MPPSC Mains GS Paper-3 (Unit-7) में 'भारतीय अंतरिक्ष कार्यक्रम, उपग्रह और उनके अनुप्रयोग' एक सीधा पाठ्यक्रम विषय है। इसके अतिरिक्त Prelims करेंट अफेयर्स में सीधे वस्तुनिष्ठ प्रश्न पूछे जाते हैं।",
        answerEn: "In MPPSC Mains GS Paper-3 (Unit-7), 'Indian Space Programme, Satellites and their Applications' is an explicit syllabus topic. It is also crucial for Prelims Science & Tech MCQs."
      },
      {
        question: "EOS-05 की अपेक्षित सेवा अवधि (Mission Life) कितनी है?",
        questionEn: "What is the expected mission life of EOS-05 satellite?",
        answer: "EOS-05 की अनुमानित सेवा अवधि 7 वर्ष से अधिक रखी गई है।",
        answerEn: "The operational mission life of EOS-05 is estimated to be over 7 years."
      }
    ],

    sources: [
      { label: "ISRO Official Mission Page - GSLV-F17/EOS-05", url: "https://www.isro.gov.in" },
      { label: "Press Information Bureau (PIB) Science & Tech Release", url: "https://pib.gov.in" },
      { label: "Aakar IAS Current Affairs Portal", url: "https://aakarias.com/current-affairs" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded ISRO GSLV-F17 EOS-05 Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
