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
  console.error("Missing Sanity environment variables.");
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
  const coverImgPath = "/Users/aakariastech/.gemini/antigravity-ide/brain/407e2179-1fa4-4249-b4d8-c2ec26519d1d/.user_uploaded/media_1789470102152.png";
  const img1Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/407e2179-1fa4-4249-b4d8-c2ec26519d1d/trishna_satellite_payloads_isro_cnes_1789470233020.jpg";
  const img2Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/407e2179-1fa4-4249-b4d8-c2ec26519d1d/trishna_agricultural_water_stress_geoglam_1789470255088.jpg";

  console.log("Uploading TRISHNA mission image assets to Sanity CMS...");

  const coverAsset = await client.assets.upload("image", fs.createReadStream(coverImgPath), {
    filename: "trishna_mission_cover_banner.png",
    contentType: "image/png",
  });

  const img1Asset = await client.assets.upload("image", fs.createReadStream(img1Path), {
    filename: "trishna_satellite_payloads_isro_cnes.jpg",
    contentType: "image/jpeg",
  });

  const img2Asset = await client.assets.upload("image", fs.createReadStream(img2Path), {
    filename: "trishna_agricultural_water_stress_geoglam.jpg",
    contentType: "image/jpeg",
  });

  console.log("Uploaded Cover Asset ID:", coverAsset._id);
  console.log("Uploaded Image 1 Asset ID:", img1Asset._id);
  console.log("Uploaded Image 2 Asset ID:", img2Asset._id);

  const titleHi = "TRISHNA मिशन (तृष्णा): ISRO व CNES का संयुक्त पृथ्वी अवलोकन उपग्रह, पेलोड, जल तनाव, GEOGLAM व Global Water Watch | MPPSC & UPSC Notes";
  const titleEn = "TRISHNA Mission: ISRO & CNES Joint Earth Observation Satellite, TIR & VNIR Payloads, Water Stress, GEOGLAM & Global Water Watch | MPPSC & UPSC";

  const excerptHi = "TRISHNA मिशन (ISRO & CNES) का संपूर्ण तकनीकी एवं विश्लेषणात्मक विवरण: 761 किमी सूर्य-तुल्यकालिक कक्षा, TIR (CNES) व VNIR-SWIR (ISRO) पेलोड्स, 57 मीटर स्थानिक विभेदन, जल तनाव (Water Stress), अर्बन हीट आइलैंड, GEOGLAM (G-20), Global Water Watch तथा MPPSC एवं UPSC परीक्षा हेतु 10 FAQs व 8 अभ्यास MCQs।";
  const excerptEn = "Comprehensive analytical study of TRISHNA Mission by ISRO & CNES France. Covers 761 km Sun-Synchronous Orbit, TIR (CNES) & VNIR-SWIR (ISRO) payloads, 57m spatial resolution, water stress monitoring, GEOGLAM (G20 initiative), Global Water Watch, 10 FAQs, and 8 practice MCQs for MPPSC & UPSC exams.";

  const slug = "trishna-mission-isro-cnes-earth-observation-water-stress-mppsc-upsc-notes";
  const publishedAt = "2026-09-15T11:00:00.000Z";
  const caDate = "2026-09-15";

  const bodyHi = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "**TRISHNA (तृष्णा - Thermal InfraRed Imaging Satellite for High-resolution Natural Resource Assessment)** मिशन भारत की अंतरिक्ष एजेंसी **ISRO (Indian Space Research Organisation)** और फ्रांस की राष्ट्रीय अंतरिक्ष एजेंसी **CNES (Centre National d’Études Spatiales)** का एक ऐतिहासिक संयुक्त पृथ्वी-अवलोकन (Earth Observation) मिशन है। इस मिशन का प्राथमिक फोकस पृथ्वी की सतह के तापमान (Land Surface Temperature), स्थलीय जल तनाव (Water Stress), जल उपयोग दक्षता, जल निकायों की गुणवत्ता, अर्बन हीट आइलैंड और जलवायु परिवर्तन से जुड़े सूक्ष्म तापीय बदलावों की उच्च-रिज़ॉल्यूशन निगरानी करना है। प्रतियोगी परीक्षाओं (**[MPPSC मुख्य परीक्षा प्रश्नपत्र 3 - विज्ञान, प्रौद्योगिकी एवं पर्यावरण](/mppsc/mains-syllabus)** तथा **UPSC GS Paper 3 - Science & Technology, Environment & Agriculture**) के दृष्टिकोण से TRISHNA मिशन, इसके पेलोड, वैश्विक कृषि निगरानी ढांचा (GEOGLAM) और डेटा प्लेटफॉर्म्स (Global Water Watch) अत्यंत महत्त्वपूर्ण विषय हैं। नवीनतम समसामयिकी के लिए हमारे [MPPSC Current Affairs](/mppsc-current-affairs) और [General Awareness](/general-awareness) अनुभाग को फॉलो करें।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: coverAsset._id },
      alt: "TRISHNA मिशन: भारत-फ्रांस का संयुक्त पृथ्वी अवलोकन मिशन | MPPSC & UPSC Notes Banner",
      caption: "TRISHNA मिशन (ISRO & CNES) — भारत और फ्रांस का संयुक्त पृथ्वी अवलोकन उपग्रह मिशन (कृषि, जल संसाधन, पर्यावरण एवं जलवायु निगरानी)।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. TRISHNA मिशन: प्रमुख तथ्य (Key Mission Parameters)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **मिशन का नाम (Full Name)**: TRISHNA (Thermal InfraRed Imaging Satellite for High-resolution Natural Resource Assessment)।\n• **सहभागी अंतरिक्ष एजेंसियां (Partner Agencies)**: ISRO (भारत) एवं CNES (फ्रांस)।\n• **ISRO की भूमिका**: VNIR-SWIR पेलोड का विकास, सैटेलाइट बस निर्माण और प्रक्षेपण (Launch Operations)।\n• **CNES की भूमिका**: TIR (Thermal Infra-Red) पेलोड का विकास और थर्मल इंफ्रा-रेड डेटा प्रोसेसिंग।\n• **प्रस्तावित कक्षा (Target Orbit)**: 761 किमी की ऊँचाई पर सूर्य-तुल्यकालिक कक्षा (Sun-Synchronous Orbit - SSO)।\n• **नियोजित परिचालन अवधि (Design Lifespan)**: 5 वर्ष।\n• **स्थानिक विभेदन - भूमि व तटीय क्षेत्र (Spatial Resolution for Land & Coast)**: 57 मीटर (हाई-रिज़ॉल्यूशन थर्मल मैपिंग)।\n• **स्थानिक विभेदन - महासागरीय व ध्रुवीय क्षेत्र (Spatial Resolution for Ocean & Polar)**: 1 किलोमीटर।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. TRISHNA मिशन के प्रमुख पेलोड (Scientific Payloads)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **1. TIR पेलोड (Thermal Infra-Red Payload)**: इसे फ्रांस की एजेंसी **CNES** द्वारा विकसित किया गया है। यह 4-चैनल वाला दीर्घ-तरंग इंफ्रारेड (Long-Wave Infrared - LWIR) सेंसर है, जो पृथ्वी की सतह के तापमान (Land Surface Temperature - LST) और उत्सर्जन (Emissivity) का सटीक मापन करता है।\n• **2. VNIR-SWIR पेलोड (Visible Near Infrared - Shortwave Infrared)**: इसे भारत की एजेंसी **ISRO** द्वारा विकसित किया गया है। इसमें 7 स्पेक्ट्रल बैंड शामिल हैं, जो वनस्पति स्वास्थ्य (Vegetation Health), एल्बेडो (Albedo), मृदा नमी (Soil Moisture) और वायुमंडलीय सुधार डेटा एकत्र करते हैं।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img1Asset._id },
      alt: "TRISHNA उपग्रह कक्षा (761 किमी SSO), TIR (CNES) एवं VNIR-SWIR (ISRO) पेलोड्स | MPPSC & UPSC Notes",
      caption: "चित्र 1: TRISHNA उपग्रह का 761 किमी सूर्य-तुल्यकालिक कक्षा में संचालन — TIR पेलोड (CNES, फ्रांस) एवं VNIR-SWIR पेलोड (ISRO, भारत)।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. TRISHNA मिशन के मुख्य उद्देश्य (Core Scientific Objectives)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **स्थलीय जल तनाव (Water Stress) का आकलन**: कृषि क्षेत्रों में वाष्पोत्सर्जन (Evapotranspiration) और मृदा नमी की कमी से होने वाले जल तनाव का सटीक आकलन करना।\n• **उच्च-रिज़ॉल्यूशन तापमान निगरानी**: पृथ्वी की सतह के तापमान और थर्मल उत्सर्जन का 57 मीटर रिज़ॉल्यूशन पर मानचित्रण।\n• **सिंचाई एवं फसल जल उपयोग दक्षता**: फसलों द्वारा जल उपभोग को मापकर कुशल सिंचाई प्रबंधन में किसानों और नीति निर्माताओं की सहायता करना।\n• **तटीय व अंतर्देशीय जल गुणवत्ता**: नदियों, झीलों, जलाशयों और तटीय क्षेत्रों में जल की गुणवत्ता, तापमान विसंगतियों और गतिशीलता की निगरानी।\n• **अर्बन हीट आइलैंड (Urban Heat Island - UHI)**: तीव्र शहरीकरण के कारण शहरों में बढ़ते तापीय प्रभावों और हीटवेव का अध्ययन।\n• **भूतापीय व ज्वालामुखीय विसंगतियाँ**: सक्रिय ज्वालामुखियों और भूतापीय ऊर्जा स्रोतों से उत्सर्जित तापीय संकेतों का पता लगाना।\n• **ग्लेशियर व क्रायोस्फीयर निगरानी**: हिमालयी और ध्रुवीय क्षेत्रों में ग्लेशियरों की गतिशीलता, बर्फ पिघलने की दर और पर्माफ्रॉस्ट थॉ (Permafrost Thaw) का अध्ययन।\n• **वायुमंडलीय पैरामीटर्स**: एयरोसोल, वायुमंडलीय जलवाष्प और बादलों के आवरण (Cloud Cover) से संबंधित सटीक डेटा सेट उपलब्ध कराना।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. TRISHNA क्यों महत्वपूर्ण है? (Strategic & Practical Applications)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **कृषि एवं खाद्य सुरक्षा (Agriculture & Food Security)**: फसल जल उत्पादकता बढ़ाने, सूखा चेतावनी प्रणाली (Drought Warning Systems) विकसित करने और सटीक कृषि (Precision Agriculture) को बढ़ावा देने में मदद करता है।\n• **जलवायु परिवर्तन निगरानी (Climate Change Monitoring)**: वाष्पोत्सर्जन, वैश्विक तापमान वृद्धि, सुखाड़ और भूमि क्षरण (Land Degradation) का दीर्घकालिक वैज्ञानिक डेटा प्रदान करता है।\n• **जल संसाधन प्रबंधन (Water Resource Management)**: जल निकायों की भराव क्षमता, उप-समुद्री भूजल निर्वहन (Submarine Groundwater Discharge) और जल संकट वाले क्षेत्रों की पहचान में सहायक।\n• **क्रायोस्फीयर सुरक्षा (Cryosphere & Glacier Safety)**: जलविद्युत परियोजनाओं, बाढ़ चेतावनी और ग्लेशियल लेक आउटबर्स्ट फ्लड (GLOF) के जोखिम आकलन हेतु महत्वपूर्ण डेटा। विस्तृत जानकारी के लिए हमारे [MPPSC Notes](/mppsc-notes) पढ़ें।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img2Asset._id },
      alt: "कृषि जल तनाव, अर्बन हीट आइलैंड, GEOGLAM एवं Global Water Watch तकनीक | MPPSC & UPSC Notes",
      caption: "चित्र 2: कृषि जल तनाव मापन, अर्बन हीट आइलैंड अध्ययन, GEOGLAM वैश्विक कृषि निगरानी ढांचा और AI आधारित Global Water Watch प्लेटफॉर्म।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. GEOGLAM एवं Global Water Watch क्या हैं?" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **GEOGLAM (Group on Earth Observations Global Agricultural Monitoring)**: यह जून 2011 में **G-20 कृषि मंत्रियों** द्वारा स्वीकृत एक वैश्विक पहल है। इसका मुख्य उद्देश्य खाद्य सुरक्षा, फसल उत्पादन पूर्वानुमान और बाजार पारदर्शिता बढ़ाने हेतु पृथ्वी अवलोकन (EO) डेटा का उपयोग करना है। यह खाद्य मूल्य अस्थिरता पर G-20 की कार्ययोजना (Action Plan on Food Price Volatility) का मुख्य भाग है।\n• **Global Water Watch**: यह वैश्विक स्तर पर जल संसाधनों से संबंधित रीयल-टाइम डेटा प्रदान करने वाला एक अत्याधुनिक डेटा प्लेटफॉर्म है। यह आर्टिफिशियल इंटेलिजेंस (AI) और सैटेलाइट अर्थ ऑब्जर्वेशन (EO) तकनीकों का उपयोग कर दुनिया भर के जलाशयों में जल की मात्रा, प्रमुख नदियों के जल स्तर और प्रवाह की सटीक जानकारी देता है। अपनी परीक्षा तैयारी को मजबूत करने हेतु हमारे [Online Courses](/online-courses) और [Publications](/publications) देखें।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "6. MPPSC & UPSC परीक्षा हेतु क्विक रिवीजन पॉइंट्स (Quick Revision Notes)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **TRISHNA** → ISRO (भारत) व CNES (फ्रांस) का संयुक्त पृथ्वी अवलोकन मिशन\n• **TIR पेलोड** → CNES द्वारा निर्मित 4-चैनल वाला लॉन्ग-वेव इंफ्रारेड सेंसर\n• **VNIR-SWIR पेलोड** → ISRO द्वारा निर्मित 7 स्पेक्ट्रल बैंड वाला पेलोड\n• **ऊँचाई व कक्षा** → 761 किमी सूर्य-तुल्यकालिक कक्षा (SSO)\n• **परिचालन अवधि** → 5 वर्ष\n• **स्थानिक विभेदन** → भूमि हेतु 57 मीटर, महासागर हेतु 1 किमी\n• **मुख्य कार्य** → जल तनाव (Water Stress), LST, अर्बन हीट आइलैंड व ग्लेशियर निगरानी\n• **GEOGLAM** → G-20 कृषि मंत्रियों द्वारा जून 2011 में शुरू की गई वैश्विक कृषि निगरानी पहल\n• **Global Water Watch** → AI और EO तकनीकों से जल निकायों की निगरानी करने वाला वैश्विक प्लेटफॉर्म",
        },
      ],
    },
  ];

  const bodyEn = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "**TRISHNA (Thermal InfraRed Imaging Satellite for High-resolution Natural Resource Assessment)** is a landmark joint Earth Observation (EO) satellite mission developed by India's space agency **ISRO (Indian Space Research Organisation)** and France's national space agency **CNES (Centre National d’Études Spatiales)**. The primary objective of TRISHNA is to provide high-resolution thermal mapping of Earth's surface temperature, terrestrial water stress, crop evapotranspiration, inland and coastal water quality, urban heat islands, and climate change dynamics. From the perspective of competitive examinations (**[MPPSC Mains Paper 3 - Science, Tech & Environment](/mppsc/mains-syllabus)** and **UPSC GS Paper 3 - Science & Technology, Environment & Agriculture**), understanding TRISHNA's technical parameters, scientific payloads, GEOGLAM framework, and Global Water Watch integration is crucial. For updated coverage, follow our [MPPSC Current Affairs](/mppsc-current-affairs) and [General Awareness](/general-awareness) portals.",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: coverAsset._id },
      alt: "TRISHNA Mission: India-France Joint Earth Observation Satellite | MPPSC & UPSC Notes Banner",
      caption: "TRISHNA Mission (ISRO & CNES) — India-France Joint Earth Observation Mission for Water Resources, Agriculture & Climate Monitoring."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. TRISHNA Mission: Key Technical Parameters" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Full Form**: TRISHNA (Thermal InfraRed Imaging Satellite for High-resolution Natural Resource Assessment).\n• **Partner Agencies**: ISRO (India) and CNES (France).\n• **ISRO Contribution**: VNIR-SWIR payload development, satellite bus design, and launch operations.\n• **CNES Contribution**: TIR (Thermal Infra-Red) payload development and thermal data processing.\n• **Target Orbit**: Sun-Synchronous Orbit (SSO) at an altitude of **761 km**.\n• **Design Lifespan**: **5 years**.\n• **Spatial Resolution (Land & Coastal)**: **57 meters** (High-resolution thermal mapping).\n• **Spatial Resolution (Ocean & Polar)**: **1 kilometer**.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. Scientific Payloads of TRISHNA Satellite" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **1. TIR Payload (Thermal Infra-Red)**: Developed by France's **CNES**, this 4-channel Long-Wave Infrared (LWIR) sensor accurately measures Land Surface Temperature (LST) and land emissivity.\n• **2. VNIR-SWIR Payload (Visible Near Infrared - Shortwave Infrared)**: Developed by India's **ISRO**, featuring 7 spectral bands for vegetation health, surface albedo, soil moisture, and atmospheric corrections.",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img1Asset._id },
      alt: "TRISHNA Satellite Orbit 761km SSO, TIR CNES payload and VNIR-SWIR ISRO payload | MPPSC & UPSC Notes",
      caption: "Figure 1: TRISHNA Satellite operations in 761 km Sun-Synchronous Orbit — Featuring TIR Payload (CNES France) & VNIR-SWIR Payload (ISRO India)."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. Core Scientific Objectives of TRISHNA" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Terrestrial Water Stress Assessment**: Precise evaluation of evapotranspiration and soil moisture deficit in agricultural fields.\n• **High-Resolution Temperature Mapping**: Mapping Earth's land surface temperature at 57-meter resolution.\n• **Irrigation & Crop Water Efficiency**: Supporting farmers and policymakers in efficient irrigation water management.\n• **Inland & Coastal Water Quality**: Monitoring water temperature anomalies, turbidity, and dynamics in rivers, lakes, and coasts.\n• **Urban Heat Island (UHI) Studies**: Assessing micro-climatic thermal variations and heatwaves caused by rapid urbanization.\n• **Geothermal & Volcanic Monitoring**: Detecting thermal anomalies from active volcanoes and geothermal energy sources.\n• **Glacier & Cryosphere Safety**: Tracking glacier retreat, snow melt dynamics, and permafrost thaw in Himalayan and polar regions.\n• **Atmospheric Profiling**: Providing essential data on aerosol optical depth, water vapor, and cloud cover.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. Strategic & Practical Importance of TRISHNA" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Agriculture & Food Security**: Enhances crop water productivity, enables early drought warning systems, and promotes precision farming.\n• **Climate Change Monitoring**: Provides long-term scientific datasets on evapotranspiration, global warming impacts, and land degradation.\n• **Water Resource Management**: Helps monitor reservoir storage capacity, identify submarine groundwater discharge, and manage water-stressed zones.\n• **Cryosphere & Hydrological Safety**: Critical inputs for Glacial Lake Outburst Flood (GLOF) risk assessment and hydroelectric power management. For structured notes, explore our [MPPSC Notes](/mppsc-notes).",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img2Asset._id },
      alt: "Agricultural water stress, Urban Heat Island, GEOGLAM and Global Water Watch AI technology | MPPSC & UPSC Notes",
      caption: "Figure 2: Satellite imaging for crop water stress, Urban Heat Island analysis, GEOGLAM agricultural monitoring, and Global Water Watch AI platform."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. Understanding GEOGLAM & Global Water Watch" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **GEOGLAM (Group on Earth Observations Global Agricultural Monitoring)**: Launched by **G-20 Agriculture Ministers in June 2011** as part of the G-20 Action Plan on Food Price Volatility. It aims to enhance Earth Observation data usage for global food security, crop yield forecasting, and market transparency.\n• **Global Water Watch**: An advanced global water resources data platform utilizing Artificial Intelligence (AI) and Earth Observation (EO) technologies. It provides real-time information on global reservoir water volumes, river levels, and hydrological discharge rates. To strengthen your exam readiness, check out our [Online Courses](/online-courses) and [Publications](/publications).",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "6. Quick Revision Points for MPPSC & UPSC Exams" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **TRISHNA** → Joint Earth Observation Mission of ISRO (India) and CNES (France)\n• **TIR Payload** → 4-channel Long-Wave Infrared sensor built by CNES\n• **VNIR-SWIR Payload** → 7 spectral band sensor built by ISRO\n• **Orbit & Altitude** → 761 km Sun-Synchronous Orbit (SSO)\n• **Design Lifespan** → 5 Years\n• **Spatial Resolution** → 57 m for Land/Coast, 1 km for Ocean/Polar\n• **Primary Applications** → Water stress, LST, Urban Heat Island, glacier monitoring\n• **GEOGLAM** → G-20 Agriculture Ministers initiative launched in June 2011\n• **Global Water Watch** → AI & EO powered global water body monitoring platform",
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "TRISHNA मिशन किन दो अंतरिक्ष एजेंसियों का संयुक्त प्रोजेक्ट है?",
      questionEn: "TRISHNA Mission is a joint project between which two space agencies?",
      answer: "TRISHNA मिशन भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) और फ्रांस की अंतरिक्ष एजेंसी CNES (Centre National d’Études Spatiales) का संयुक्त पृथ्वी अवलोकन मिशन है।",
      answerEn: "TRISHNA Mission is a joint Earth observation project of India's ISRO and France's national space agency CNES."
    },
    {
      question: "TRISHNA मिशन का मुख्य उद्देश्य क्या है?",
      questionEn: "What is the primary objective of the TRISHNA Mission?",
      answer: "इसका मुख्य उद्देश्य उच्च-रिज़ॉल्यूशन पर पृथ्वी की सतह के तापमान, स्थलीय जल तनाव (Water Stress), फसल जल उपयोग, जल निकायों की गुणवत्ता और अर्बन हीट आइलैंड की निगरानी करना है।",
      answerEn: "Its primary objective is high-resolution monitoring of Earth's surface temperature, land water stress, crop water utilization, water body quality, and urban heat islands."
    },
    {
      question: "TRISHNA उपग्रह में कौन-कौन से दो प्रमुख पेलोड लगाए जा रहे हैं?",
      questionEn: "Which two main payloads are onboard the TRISHNA satellite?",
      answer: "इसमें CNES द्वारा विकसित TIR (Thermal Infra-Red: 4-चैनल LWIR) और ISRO द्वारा विकसित VNIR-SWIR (7 स्पेक्ट्रल बैंड पेलोड) लगाए जा रहे हैं।",
      answerEn: "It carries the TIR payload (4-channel LWIR) developed by CNES and the VNIR-SWIR payload (7 spectral bands) developed by ISRO."
    },
    {
      question: "TRISHNA उपग्रह को किस ऊँचाई और कक्षा में स्थापित किया जाएगा?",
      questionEn: "In which orbit and altitude will TRISHNA satellite be placed?",
      answer: "TRISHNA उपग्रह को 761 किमी की ऊँचाई पर सूर्य-तुल्यकालिक कक्षा (Sun-Synchronous Orbit - SSO) में स्थापित किया जाएगा।",
      answerEn: "TRISHNA satellite will be deployed in a Sun-Synchronous Orbit (SSO) at an altitude of 761 km."
    },
    {
      question: "भूमि एवं तटीय क्षेत्रों के लिए TRISHNA का स्थानिक विभेदन (Spatial Resolution) कितना है?",
      questionEn: "What is the spatial resolution of TRISHNA for land and coastal regions?",
      answer: "भूमि और तटीय क्षेत्रों के लिए TRISHNA का स्थानिक विभेदन 57 मीटर है, जबकि महासागरीय व ध्रुवीय क्षेत्रों के लिए यह 1 किलोमीटर है।",
      answerEn: "The spatial resolution of TRISHNA is 57 meters for land and coastal regions, and 1 km for oceanic and polar regions."
    },
    {
      question: "GEOGLAM पहल क्या है और इसे कब लॉन्च किया गया था?",
      questionEn: "What is the GEOGLAM initiative and when was it launched?",
      answer: "GEOGLAM (Group on Earth Observations Global Agricultural Monitoring) को जून 2011 में G-20 कृषि मंत्रियों द्वारा खाद्य सुरक्षा व कृषि निगरानी हेतु लॉन्च किया गया था।",
      answerEn: "GEOGLAM was launched in June 2011 by G-20 Agriculture Ministers to enhance Earth Observation data usage for food security and agriculture."
    },
    {
      question: "Global Water Watch डेटा प्लेटफॉर्म की क्या विशेषता है?",
      questionEn: "What is the key feature of the Global Water Watch platform?",
      answer: "यह प्लेटफॉर्म आर्टिफिशियल इंटेलिजेंस (AI) और अर्थ ऑब्जर्वेशन (EO) तकनीकों का उपयोग कर वैश्विक जलाशयों में जल मात्रा और नदियों के प्रवाह की जानकारी देता है।",
      answerEn: "It uses AI and Earth Observation (EO) technologies to provide real-time global data on reservoir water volumes and river stream flows."
    },
    {
      question: "TRISHNA मिशन की नियोजित परिचालन अवधि (Design Lifespan) कितनी है?",
      questionEn: "What is the planned operational lifespan of TRISHNA mission?",
      answer: "TRISHNA मिशन की नियोजित परिचालन अवधि 5 वर्ष है।",
      answerEn: "The planned operational lifespan of TRISHNA mission is 5 years."
    },
    {
      question: "अर्बन हीट आइलैंड (Urban Heat Island - UHI) अध्ययन में TRISHNA की क्या भूमिका होगी?",
      questionEn: "What role will TRISHNA play in studying Urban Heat Islands (UHI)?",
      answer: "TRISHNA का 57 मीटर हाई-रिज़ॉल्यूशन थर्मल इंफ्रारेड सेंसर शहरों के सूक्ष्म तापीय बदलावों, कंक्रीट संरचनाओं के तापमान और हीटवेव पैटर्न की सटीक मैपिंग करेगा।",
      answerEn: "TRISHNA's 57m high-resolution thermal sensor will accurately map micro-climatic thermal variations, urban concrete structure heat, and heatwave patterns."
    },
    {
      question: "MPPSC व UPSC परीक्षा के दृष्टिकोण से TRISHNA मिशन किस विषय से संबंधित है?",
      questionEn: "From MPPSC & UPSC perspective, TRISHNA mission falls under which syllabus section?",
      answer: "यह MPPSC मुख्य परीक्षा प्रश्नपत्र 3 (विज्ञान एवं प्रौद्योगिकी, पर्यावरण) और UPSC GS Paper 3 (अंतरिक्ष प्रौद्योगिकी, जल संसाधन एवं पर्यावरण) से संबंधित है।",
      answerEn: "It pertains to MPPSC Mains Paper 3 (Science & Tech, Environment) and UPSC GS Paper 3 (Space Technology, Water Resources & Environment)."
    }
  ];

  const mcqs = [
    {
      question: "TRISHNA (तृष्णा) मिशन निम्नलिखित में से किन दो अंतरिक्ष एजेंसियों की एक संयुक्त पहल है?",
      questionEn: "TRISHNA Mission is a joint initiative of which two space agencies?",
      options: ["A. ISRO एवं NASA", "B. ISRO एवं CNES (फ्रांस)", "C. ISRO एवं JAXA (जापान)", "D. NASA एवं ESA"],
      optionsEn: ["A. ISRO & NASA", "B. ISRO & CNES (France)", "C. ISRO & JAXA (Japan)", "D. NASA & ESA"],
      correctIndex: 1,
      explanation: "TRISHNA मिशन भारत की अंतरिक्ष एजेंसी ISRO और फ्रांस की राष्ट्रीय अंतरिक्ष एजेंसी CNES का एक संयुक्त पृथ्वी अवलोकन उपग्रह मिशन है।",
      explanationEn: "TRISHNA is a joint Earth observation satellite mission of India's ISRO and France's CNES."
    },
    {
      question: "TRISHNA उपग्रह में प्रयुक्त TIR (Thermal Infra-Red) पेलोड किस एजेंसी द्वारा विकसित किया गया है?",
      questionEn: "The TIR (Thermal Infra-Red) payload onboard TRISHNA satellite has been developed by which agency?",
      options: ["A. ISRO (भारत)", "B. CNES (फ्रांस)", "C. JAXA (जापान)", "D. DLR (जर्मनी)"],
      optionsEn: ["A. ISRO (India)", "B. CNES (France)", "C. JAXA (Japan)", "D. DLR (Germany)"],
      correctIndex: 1,
      explanation: "TIR (Thermal Infra-Red) पेलोड फ्रांस की अंतरिक्ष एजेंसी CNES द्वारा विकसित किया गया है, जबकि VNIR-SWIR पेलोड ISRO द्वारा विकसित किया गया है।",
      explanationEn: "The TIR payload was developed by CNES (France), while the VNIR-SWIR payload was developed by ISRO (India)."
    },
    {
      question: "TRISHNA उपग्रह को पृथ्वी की किस कक्षा और ऊँचाई पर स्थापित करने का प्रस्ताव है?",
      questionEn: "In which orbit and altitude is TRISHNA satellite proposed to be launched?",
      options: [
        "A. 500 किमी भू-तुल्यकालिक कक्षा (GEO)",
        "B. 761 किमी सूर्य-तुल्यकालिक कक्षा (SSO)",
        "C. 1000 किमी मध्यम पृथ्वी कक्षा (MEO)",
        "D. 400 किमी ध्रुवीय कक्षा (PO)"
      ],
      optionsEn: [
        "A. 500 km Geosynchronous Orbit (GEO)",
        "B. 761 km Sun-Synchronous Orbit (SSO)",
        "C. 1000 km Medium Earth Orbit (MEO)",
        "D. 400 km Polar Orbit (PO)"
      ],
      correctIndex: 1,
      explanation: "TRISHNA उपग्रह को 761 किमी की ऊँचाई पर सूर्य-तुल्यकालिक कक्षा (Sun-Synchronous Orbit - SSO) में स्थापित किया जाएगा।",
      explanationEn: "TRISHNA satellite will be positioned in a Sun-Synchronous Orbit (SSO) at an altitude of 761 km."
    },
    {
      question: "भूमि और तटीय क्षेत्रों की थर्मल मैपिंग हेतु TRISHNA मिशन का स्थानिक विभेदन (Spatial Resolution) कितना निर्धारित है?",
      questionEn: "What is the spatial resolution of TRISHNA mission for thermal mapping of land and coastal areas?",
      options: ["A. 10 मीटर", "B. 25 मीटर", "C. 57 मीटर", "D. 250 मीटर"],
      optionsEn: ["A. 10 meters", "B. 25 meters", "C. 57 meters", "D. 250 meters"],
      correctIndex: 2,
      explanation: "TRISHNA उपग्रह भूमि एवं तटीय क्षेत्रों के लिए 57 मीटर का उच्च स्थानिक विभेदन तथा महासागरीय व ध्रुवीय क्षेत्रों के लिए 1 किमी विभेदन प्रदान करेगा।",
      explanationEn: "TRISHNA provides a high spatial resolution of 57 meters for land and coastal zones, and 1 km for oceanic and polar regions."
    },
    {
      question: "वैश्विक कृषि निगरानी ढांचा 'GEOGLAM' की शुरुआत किस समूह के कृषि मंत्रियों की पहल पर की गई थी?",
      questionEn: "The global agricultural monitoring initiative 'GEOGLAM' was launched at the initiative of Agriculture Ministers of which group?",
      options: ["A. G-7", "B. G-20", "C. BRICS", "D. ASEAN"],
      optionsEn: ["A. G-7", "B. G-20", "C. BRICS", "D. ASEAN"],
      correctIndex: 1,
      explanation: "GEOGLAM (Group on Earth Observations Global Agricultural Monitoring) को जून 2011 में G-20 कृषि मंत्रियों द्वारा खाद्य सुरक्षा हेतु लॉन्च किया गया था।",
      explanationEn: "GEOGLAM was launched in June 2011 by G-20 Agriculture Ministers as part of the G-20 Action Plan on Food Price Volatility."
    },
    {
      question: "TRISHNA मिशन के संदर्भ में निम्नलिखित कथनों पर विचार कीजिए:\n1. VNIR-SWIR पेलोड 7 स्पेक्ट्रल बैंड के साथ ISRO द्वारा विकसित किया गया है।\n2. इस मिशन की नियोजित परिचालन अवधि 10 वर्ष है।\nउपर्युक्त में से कौन-सा/से कथन सत्य है/हैं?",
      questionEn: "Consider the following statements regarding TRISHNA Mission:\n1. The VNIR-SWIR payload with 7 spectral bands has been developed by ISRO.\n2. The planned operational lifespan of this mission is 10 years.\nWhich of the above statements is/are correct?",
      options: ["A. केवल 1", "B. केवल 2", "C. 1 और 2 दोनों", "D. न तो 1 और न ही 2"],
      optionsEn: ["A. Only 1", "B. Only 2", "C. Both 1 and 2", "D. Neither 1 nor 2"],
      correctIndex: 0,
      explanation: "कथन 1 सत्य है। कथन 2 असत्य है क्योंकि TRISHNA मिशन की नियोजित परिचालन अवधि (Design Lifespan) 5 वर्ष है, न कि 10 वर्ष।",
      explanationEn: "Statement 1 is correct. Statement 2 is incorrect because the planned operational lifespan of TRISHNA mission is 5 years, not 10 years."
    },
    {
      question: "आर्टिफिशियल इंटेलिजेंस (AI) और सैटेलाइट डाटा का उपयोग कर वैश्विक जलाशयों व नदी प्रवाह की निगरानी करने वाला डेटा प्लेटफॉर्म कौन-सा है?",
      questionEn: "Which global data platform monitors reservoir volumes and river flows using AI and satellite data?",
      options: ["A. Global Forest Watch", "B. Global Water Watch", "C. Earth Data Hub", "D. AquaSat Online"],
      optionsEn: ["A. Global Forest Watch", "B. Global Water Watch", "C. Earth Data Hub", "D. AquaSat Online"],
      correctIndex: 1,
      explanation: "Global Water Watch प्लेटफॉर्म AI और अर्थ ऑब्जर्वेशन (EO) तकनीकों का उपयोग कर वैश्विक जलाशयों में जल की मात्रा और नदी प्रवाह की रीयल-टाइम जानकारी उपलब्ध कराता है।",
      explanationEn: "Global Water Watch uses AI and Earth Observation (EO) technologies to provide real-time global water resource data."
    },
    {
      question: "TRISHNA मिशन निम्नलिखित में से किस तापीय व पर्यावरणीय परिघटना के अध्ययन में सहायक होगा?",
      questionEn: "TRISHNA Mission will aid in the study of which of the following thermal and environmental phenomena?",
      options: [
        "A. स्थलीय जल तनाव एवं फसल वाष्पोत्सर्जन",
        "B. अर्बन हीट आइलैंड (Urban Heat Island)",
        "C. ग्लेशियर गतिशीलता एवं बर्फ पिघलने का पैटर्न",
        "D. उपर्युक्त सभी"
      ],
      optionsEn: [
        "A. Terrestrial water stress & crop evapotranspiration",
        "B. Urban Heat Island (UHI)",
        "C. Glacier dynamics & snow melt patterns",
        "D. All of the above"
      ],
      correctIndex: 3,
      explanation: "TRISHNA का 57m थर्मल इंफ्रा-रेड डेटा जल तनाव, अर्बन हीट आइलैंड, ग्लेशियर पिघलने, भूतापीय विसंगतियों और तटीय जल गुणवत्ता के अध्ययन में बहुआयामी भूमिका निभाएगा।",
      explanationEn: "TRISHNA's 57m thermal infrared data supports water stress analysis, urban heat island studies, glacier dynamics, geothermal anomaly detection, and coastal water quality."
    }
  ];

  console.log("Upserting currentAffairs document in Sanity...");

  const caDoc = {
    _id: "ca-trishna-mission-isro-cnes-2026",
    _type: "currentAffairs",
    title: titleHi,
    titleEn,
    slug: { _type: "slug", current: slug },
    date: publishedAt,
    ca_date: caDate,
    publishedAt,
    excerpt: excerptHi,
    excerptEn,
    author: { _type: "reference", _ref: "author-aakar" },
    category: { _type: "reference", _ref: "cat-misc" },
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverAsset._id },
      alt: "TRISHNA मिशन: ISRO व CNES का भारत-फ्रांस संयुक्त पृथ्वी अवलोकन मिशन | MPPSC & UPSC Notes Banner",
      caption: "TRISHNA मिशन (ISRO & CNES) — भारत और फ्रांस का संयुक्त पृथ्वी अवलोकन उपग्रह मिशन (सतत विकास, जल तनाव व जलवायु निगरानी)।"
    },
    tags: [
      { _type: "reference", _ref: "tag-mppsc", _key: "tag-mppsc-key" },
      { _type: "reference", _ref: "tag-upsc", _key: "tag-upsc-key" },
      { _type: "reference", _ref: "tag-national-affairs", _key: "tag-national-affairs-key" },
      { _type: "reference", _ref: "tag-important-days", _key: "tag-important-days-key" },
      { _type: "reference", _ref: "tag-prelims", _key: "tag-prelims-key" },
      { _type: "reference", _ref: "tag-mains", _key: "tag-mains-key" }
    ],
    nextArticle: {
      title: "अंतर्राष्ट्रीय लोकतंत्र दिवस 2026: 15 सितंबर, जनभागीदारी व जवाबदेह शासन",
      titleEn: "International Day of Democracy 2026: 15th September, Civic Participation & Governance",
      href: "/current-affairs/international-day-of-democracy-2026-15-september-civic-participation-mppsc-upsc-notes"
    },
    body: bodyHi,
    bodyEn,
    faqs,
    mcqs
  };

  const resCa = await client.createOrReplace(caDoc);
  console.log("Successfully published currentAffairs document:", resCa._id);

  console.log("Upserting staticGk document for Science & Tech feed...");
  const gkDoc = {
    ...caDoc,
    _id: "gk-trishna-mission-isro-cnes-2026",
    _type: "staticGk",
  };
  const resGk = await client.createOrReplace(gkDoc);
  console.log("Successfully published staticGk document:", resGk._id);
}

main().catch((err) => {
  console.error("Error publishing TRISHNA article:", err);
  process.exit(1);
});
