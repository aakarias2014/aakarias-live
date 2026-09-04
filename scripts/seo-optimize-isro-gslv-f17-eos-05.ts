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
  console.log("🚀 Starting SEO & AI Overview optimization upload for ISRO GSLV-F17 / EOS-05...");

  const imagePaths = {
    launch: "/Users/aakariastech/.gemini/antigravity-ide/brain/f3f4306f-5b76-4abc-af05-6e33bf4e042f/isro_gslv_f17_eos_05_launch_1788517994143.jpg",
    satellite: "/Users/aakariastech/.gemini/antigravity-ide/brain/f3f4306f-5b76-4abc-af05-6e33bf4e042f/eos_05_satellite_orbit_earth_1788518020367.jpg",
    controlRoom: "/Users/aakariastech/.gemini/antigravity-ide/brain/f3f4306f-5b76-4abc-af05-6e33bf4e042f/isro_control_center_scientists_mission_1788518046731.jpg",
  };

  if (!fs.existsSync(imagePaths.launch) || !fs.existsSync(imagePaths.satellite) || !fs.existsSync(imagePaths.controlRoom)) {
    console.error("❌ Required images not found!");
    process.exit(1);
  }

  console.log("📸 Uploading images to Sanity...");
  const assetLaunch = await client.assets.upload("image", fs.createReadStream(imagePaths.launch), { filename: "isro_gslv_f17_launch.jpg" });
  const assetSatellite = await client.assets.upload("image", fs.createReadStream(imagePaths.satellite), { filename: "eos_05_satellite_orbit.jpg" });
  const assetControlRoom = await client.assets.upload("image", fs.createReadStream(imagePaths.controlRoom), { filename: "isro_control_room_scientists.jpg" });

  const slug = "isro-gslv-f17-eos-05-satellite-launch-2026";
  const docId = `currentAffairs-${slug}`;

  const article: any = {
    _id: docId,
    _type: "currentAffairs",
    title: "अंतरिक्ष में ISRO ने रचा इतिहास: GSLV-F17 से लॉन्च हुआ 'बाज' सैटेलाइट EOS-05 | 36,000 किमी से रखेगा सीमाओं पर पैनी नजर",
    titleEn: "ISRO Launches GSLV-F17 Carrying EOS-05 'Eye in the Sky' Satellite: Complete Analysis & MPPSC Notes",
    slug: {
      _type: "slug",
      current: slug,
    },
    excerpt: "4 सितंबर 2026 को इसरो (ISRO) ने श्रीहरिकोटा से बाहुबली रॉकेट GSLV-F17 के माध्यम से अर्थ ऑब्जर्वेशन सैटेलाइट EOS-05 ('बाज' / Eye in the Sky) का सफल प्रक्षेपण किया। जानिए PM मोदी का वक्तव्य, PSLV vs GSLV अंतर, क्रायोजेनिक इंजन तथा MPPSC एवं UPSC परीक्षा हेतु संपूर्ण नोट्स।",
    excerptEn: "On 4 September 2026, ISRO successfully launched the advanced Earth Observation Satellite EOS-05 ('Eye in the Sky') aboard the GSLV-F17 rocket from Sriharikota. Read PM Modi's statement, technical specs, PSLV vs GSLV differences, and MPPSC & UPSC notes.",
    author: "Aakar IAS Team",
    ca_date: "2026-09-04",
    publishedAt: "2026-09-04T10:30:00Z",
    category: "Science & Technology",
    tags: [
      "tag-mppsc",
      "tag-upsc",
      "gslv-f17",
      "eos-05",
      "isro",
      "eye-in-the-sky-satellite",
      "gisat-1a",
      "satish-dhawan-space-centre",
      "cryogenic-engine-cus15",
      "pslv-vs-gslv",
      "mppsc-science-and-technology",
      "current-affairs-2026"
    ],
    mainImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: assetLaunch._id,
      },
      alt: "ISRO GSLV-F17 Rocket Launching EOS-05 Satellite from Sriharikota",
      caption: "सतीश धवन अंतरिक्ष केंद्र श्रीहरिकोटा से GSLV-F17 का ऐतिहासिक सफल प्रक्षेपण",
    },

    body: [
      ...createBlocks([
        "### मिशन का परिचय एवं ऐतिहासिक सफलता (Mission Overview & PM Modi Statement)",
        "भारतीय अंतरिक्ष अनुसंधान संगठन (**ISRO**) ने **4 सितंबर 2026** को भारत के अंतरिक्ष कार्यक्रम में एक स्वर्णिम उपलब्धि हासिल की। इसरो के शक्तिशाली रॉकेट **GSLV-F17** (Geosynchronous Satellite Launch Vehicle) ने अत्याधुनिक अर्थ ऑब्जर्वेशन सैटेलाइट **EOS-05** को अंतरिक्ष की निर्धारित कक्षा में सफलतापूर्वक स्थापित कर दिया।",
        "यह प्रक्षेपण आंध्र प्रदेश के **श्रीहरिकोटा स्थित सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR)** के द्वितीय लॉन्च पैड से तड़के सुबह **02:55 बजे (IST)** संपन्न हुआ। EOS-05 उपग्रह को पूर्व में **GISAT-1A** के नाम से जाना जाता था।",
        "**प्रधानमंत्री नरेंद्र मोदी का संदेश**: प्रधानमंत्री नरेंद्र मोदी (PM Narendra Modi) ने इसरो के वैज्ञानिकों को इस ऐतिहासिक सफलता पर बधाई देते हुए कहा कि **\"GSLV-F17/EOS-05 का सफल प्रक्षेपण भारत की अंतरिक्ष शक्ति, राष्ट्रीय सुरक्षा और आपदा प्रबंधन क्षमताओं को नई ऊँचाइयों पर ले जाएगा। यह मिशन आत्मनिर्भर भारत की प्रतिबद्धता को दर्शाता है।\"**",
        "**MPPSC (मध्य प्रदेश लोक सेवा आयोग)** की राज्य सेवा मुख्य परीक्षा के **सामान्य अध्ययन प्रश्नपत्र-3 (GS Paper-3: विज्ञान एवं प्रौद्योगिकी)** तथा प्रारंभिक परीक्षा के दृष्टिकोण से यह टॉपिक अत्यंत महत्वपूर्ण है।",

        "• **प्रक्षेपण यान (Launch Vehicle)**: GSLV-F17 (यह GSLV श्रेणी की **19वीं उड़ान** थी)।",
        "• **उपग्रह का नाम (Satellite)**: EOS-05 (Earth Observation Satellite-05), जिसे **'अंतरिक्ष में भारत की बाज आँख' (Eye in the Sky)** कहा जा रहा है।",
        "• **कुल द्रव्यमान (Lift-off Mass)**: उपग्रह का कुल वजन लगभग **2,367 किलोग्राम** है, जो GSLV द्वारा ले जाया गया अब तक का एक प्रमुख पेलोड है।",
        "• **कक्षा (Target Orbit)**: सब-जियोसिंक्रोनस ट्रांसफर ऑर्बिट (Sub-GTO), जहाँ से ऑन-बोर्ड थ्रस्टर्स द्वारा उपग्रह को **36,000 किलोमीटर** की भू-स्थिर कक्षा (Geostationary Orbit - GEO) में स्थापित किया गया।",
        "• **मिशन अवधि (Mission Lifespan)**: 7 वर्ष से अधिक।",
      ]),

      {
        _key: "img-sat-hi",
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetSatellite._id,
        },
        alt: "EOS-05 Earth Observation Satellite in 36000 km Geostationary Orbit",
        caption: "36,000 किमी ऊँचाई पर भू-स्थिर कक्षा (GEO) से भारत और सीमावर्ती क्षेत्रों पर नजर रखता EOS-05 उपग्रह",
      },

      ...createBlocks([
        "### EOS-05 सैटेलाइट की मुख्य खासियतें ('अंतरिक्ष में भारत की आँख')",
        "सामान्यतः पृथ्वी अवलोकन उपग्रह (Earth Observation Satellites) लो अर्थ ऑर्बिट (LEO - 160 से 2,000 किमी) में चक्कर लगाते हैं। लेकिन EOS-05 की सबसे बड़ी विशेषता यह है कि इसे **36,000 किलोमीटर ऊँचाई पर जियोस्टेशनरी ऑर्बिट (GEO)** में स्थापित किया गया है:",
        "• **सतत एवं रियल-टाइम इमेजिंग**: भू-स्थिर कक्षा में उपग्रह पृथ्वी की घूर्णन गति के साथ स्थिर रहता है, जिससे यह **हर 30 मिनट** में संपूर्ण भारतीय भूभाग की हाई-रिजॉल्यूशन रियल-टाइम तस्वीरें भेजने में सक्षम है।",
        "• **सीमा सुरक्षा (Border Surveillance)**: चीन और पाकिस्तान से लगती भारत की थल सीमाओं (LAC, LOC) तथा हिंद महासागर क्षेत्र (IOR) पर 24 घंटे पैनी नजर रखेगा। सीमाओं पर किसी भी संदिग्ध गतिविधि का तुरंत पता चलेगा।",
        "• **आपदा प्रबंधन (Disaster Management)**: चक्रवात (Cyclones), बाढ़ (Floods), भूस्खलन (Landslides) और जंगलों की आग (Forest Fires) जैसी आपदाओं की समय से पूर्व चेतावनी जारी करने में अत्यधिक प्रभावी।",
        "• **कृषि एवं मौसम (Agriculture & Weather)**: फसलों की सेहत, मिट्टी की नमी (Soil Moisture), बादलों की स्थिति और मौसमी बदलावों का सटीक डेटा उपलब्ध कराएगा।",
        "• **एडवांस्ड सेंसर्स (Advanced Sensors)**: उपग्रह में **हाइपरस्पेक्ट्रल इमेजर (Hyperspectral Imager)** और विजिबल, इन्फ्रारेड तरंगदैर्ध्य में काम करने वाले बहु-स्पेक्ट्रमी कैमरे लगे हैं।",

        "### GSLV-F17 रॉकेट की तकनीकी संरचना (Technical Specifications)",
        "GSLV-F17 एक **तीन चरणों वाला भारी प्रक्षेपण यान (3-Stage Heavy Launch Vehicle)** है:",
        "• **प्रथम चरण (Solid Stage - S139)**: ठोस ईंधन चालित S139 मोटर और **4 लिक्विड स्ट्रैप-ऑन मोटर्स (L40)** जो शुरुआती 3800 kN से अधिक थ्रस्ट देते हैं।",
        "• **द्वितीय चरण (Liquid Stage)**: तरल ईंधन चालित **विकास इंजन (Vikas Engine)**, जो रॉकेट को उच्च वेग प्रदान करता है।",
        "• **तृतीय चरण (Cryogenic Stage - CUS15)**: स्वदेशी **क्रायोजेनिक अपर स्टेज (CUS-15)**, जो अत्यधिक कम तापमान पर तरल ईंधन का उपयोग करता है।",
        "• **रॉकेट की ऊँचाई व द्रव्यमान**: GSLV-F17 की कुल ऊँचाई **51.7 मीटर** तथा लिफ्ट-ऑफ वजन लगभग **420.5 टन** है।",
      ]),

      {
        _key: "img-control-hi",
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetControlRoom._id,
        },
        alt: "ISRO Mission Control Center Sriharikota scientists celebrating GSLV-F17 launch",
        caption: "मिशन कंट्रोल सेंटर श्रीहरिकोटा में वैज्ञानिक GSLV-F17 की सफल कक्षा प्रविष्टि का जश्न मनाते हुए",
      },

      ...createBlocks([
        "### PSLV और GSLV में मुख्य अंतर (PSLV vs GSLV Difference)",
        "परीक्षार्थियों के लिए PSLV और GSLV के बीच तकनीकी अंतर समझना अत्यंत आवश्यक है:",
        "• **चरणों की संख्या**: PSLV एक **4-चरणीय (4-Stage)** रॉकेट है (Solid-Liquid-Solid-Liquid), जबकि GSLV एक **3-चरणीय (3-Stage)** रॉकेट है (Solid-Liquid-Cryogenic)।",
        "• **क्रायोजेनिक इंजन**: PSLV में क्रायोजेनिक इंजन नहीं होता है, जबकि GSLV के तीसरे चरण में स्वदेशी क्रायोजेनिक इंजन (CUS) का उपयोग किया जाता है।",
        "• **पेलोड क्षमता**: PSLV मुख्यतः 1,750 किग्रा तक के उपग्रहों को लो अर्थ ऑर्बिट (LEO) या सन-सिंक्रोनस ऑर्बिट (SSO) में ले जाता है। GSLV 2,500 से 4,000 किग्रा तक के भारी उपग्रहों को जियोसिंक्रोनस ट्रांसफर ऑर्बिट (GTO/GEO) में स्थापित करता है।",
        "• **उपनाम**: PSLV को इसरो का **'वर्कहॉर्स' (Workhorse)** और GSLV को **'बाहुबली रॉकेट'** कहा जाता है।",

        "### क्रायोजेनिक इंजन (CUS-15) कैसे काम करता है?",
        "क्रायोजेनिक तकनीक अंतरिक्ष विज्ञान की सबसे जटिल तकनीकों में से एक है:",
        "• **अत्यधिक कम तापमान (Extreme Low Temperature)**: क्रायोजेनिक इंजन में ईंधन के रूप में **तरल हाइड्रोजन ($LH_2$) को $-253^\circ\text{C}$** पर और ऑक्सीडाइजर के रूप में **तरल ऑक्सीजन ($LOX$) को $-183^\circ\text{C}$** पर संग्रहित किया जाता है।",
        "• **उच्च विशिष्ट आवेग (High Specific Impulse)**: यह ठोस या सामान्य तरल इंजन की तुलना में प्रति किलोग्राम ईंधन पर अत्यधिक ऊर्जा और थ्रस्ट (Thrust) उत्पन्न करता है, जिससे भारी उपग्रहों को 36,000 किमी दूर GEO कक्षा तक पहुँचाना संभव होता है।",

        "### MPPSC Mains GS Paper-3 मॉडल उत्तर (Sample 150-Word Answer)",
        "**प्रश्न: GSLV-F17/EOS-05 मिशन के मुख्य उद्देश्यों और रणनीतिक महत्व की विवेचना कीजिए। (5 अंक / 50 शब्द या 11 अंक / 200 शब्द)**",
        "**उत्तर प्रारुप**: 4 सितंबर 2026 को इसरो द्वारा प्रक्षेपित EOS-05 भारत का पहला भू-स्थिर कक्षा (GEO) आधारित पृथ्वी अवलोकन उपग्रह है।",
        "**मुख्य उद्देश्य एवं महत्व**:",
        "• 1. **सीमा सुरक्षा**: 36,000 किमी ऊँचाई से हर 30 मिनट में चीन-पाकिस्तान बॉर्डर व IOR की रियल-टाइम तस्वीरें भेजना।",
        "• 2. **आपदा पूर्व चेतावनी**: चक्रवात, बाढ़ व जंगल की आग की त्वरित सूचना देकर जन-धन हानि को रोकना।",
        "• 3. **तकनीकी आत्मनिर्भरता**: स्वदेशी क्रायोजेनिक इंजन (CUS-15) की विश्वसनीयता का प्रदर्शन।",
        "**निष्कर्ष**: यह मिशन भारत को 'आकाश में बाज की नजर' प्रदान कर राष्ट्रीय सुरक्षा एवं प्राकृतिक संसाधन प्रबंधन में आत्मनिर्भर बनाता है।"
      ])
    ],

    bodyEn: [
      ...createBlocks([
        "### Mission Overview and Historical Milestone (PM Modi Statement)",
        "On **4 September 2026**, the Indian Space Research Organisation (**ISRO**) achieved a monumental milestone in space exploration. ISRO's heavy-lift launch vehicle **GSLV-F17** (Geosynchronous Satellite Launch Vehicle) successfully deployed the state-of-the-art Earth Observation Satellite **EOS-05** into its designated orbit.",
        "The launch took place at **02:55 AM (IST)** from the Second Launch Pad of **Satish Dhawan Space Centre (SDSC SHAR), Sriharikota**, Andhra Pradesh. EOS-05 was earlier designated as **GISAT-1A**.",
        "**PM Narendra Modi's Statement**: Congratulating ISRO scientists on this landmark victory, Prime Minister Narendra Modi stated: **\"The successful launch of GSLV-F17 carrying EOS-05 elevates India's space prowess, national security, and disaster management capabilities to unprecedented heights. This mission embodies the spirit of Atmanirbhar Bharat.\"**",
        "This topic is of vital importance for competitive exams, particularly **MPPSC Mains (GS Paper-3: Science & Technology)** and **MPPSC / UPSC Prelims Current Affairs**.",

        "• **Launch Vehicle**: GSLV-F17 (This was the **19th flight** of the GSLV rocket series).",
        "• **Satellite**: EOS-05 (Earth Observation Satellite-05), famously dubbed as India's **'Eye in the Sky'**.",
        "• **Satellite Mass**: Approximately **2,367 kg**, marking a major heavy payload for GSLV.",
        "• **Target Orbit**: Sub-Geosynchronous Transfer Orbit (Sub-GTO), from where onboard thrusters maneuvered it into a **36,000 km** Geostationary Orbit (GEO).",
        "• **Mission Lifespan**: Expected operational life of over **7 years**.",
      ]),

      {
        _key: "img-sat-en",
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetSatellite._id,
        },
        alt: "EOS-05 Satellite observing Earth from Geostationary Orbit",
        caption: "EOS-05 Satellite observing Indian borders and maritime zone continuously from 36,000 km Geostationary Orbit",
      },

      ...createBlocks([
        "### Core Features of EOS-05 Satellite ('Eye in the Sky')",
        "Unlike conventional Earth observation satellites that orbit in Low Earth Orbit (LEO - 160 to 2,000 km), EOS-05 is positioned in a **36,000 km Geostationary Orbit (GEO)**:",
        "• **Continuous Real-Time Imaging**: Situated in GEO, the satellite rotates at the exact speed of Earth, enabling it to transmit high-resolution real-time images of the Indian landmass every **30 minutes**.",
        "• **Border Surveillance**: Maintains 24/7 vigil over India's land borders with China and Pakistan (LAC, LOC) as well as the Indian Ocean Region (IOR).",
        "• **Disaster Management**: Provides rapid real-time alerts for Cyclones, Floods, Landslides, and Forest Fires, significantly minimizing loss of life.",
        "• **Agriculture & Weather**: Measures crop health, soil moisture, cloud cover dynamics, and weather pattern updates.",
        "• **Payload Sensors**: Equipped with **Hyperspectral Imagers** and multispectral cameras functioning across Visible, Near-Infrared, and Thermal Infrared spectrums.",

        "### GSLV-F17 Technical Architecture",
        "GSLV-F17 is a **three-stage heavy payload launch vehicle**:",
        "• **First Stage (Solid Stage - S139)**: Core solid motor S139 augmented by **4 liquid L40 strap-on motors** generating intense initial thrust.",
        "• **Second Stage (Liquid Stage)**: Powered by the liquid-fueled **Vikas Engine**.",
        "• **Third Stage (Cryogenic Stage - CUS15)**: Indigenous **Cryogenic Upper Stage (CUS-15)** operating at sub-zero cryogenic temperatures.",
        "• **Vehicle Dimensions**: Height of **51.7 meters** and lift-off mass of approximately **420.5 tonnes**.",
      ]),

      {
        _key: "img-control-en",
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetControlRoom._id,
        },
        alt: "ISRO Mission Control Room Sriharikota scientists celebrating GSLV-F17 launch",
        caption: "ISRO Scientists celebrating the successful orbit insertion of EOS-05 satellite at SDSC SHAR Control Room",
      },

      ...createBlocks([
        "### Key Differences Between PSLV and GSLV (PSLV vs GSLV)",
        "Understanding launch vehicle differences is crucial for civil service aspirants:",
        "• **Number of Stages**: PSLV is a **4-Stage** rocket (Solid-Liquid-Solid-Liquid), whereas GSLV is a **3-Stage** rocket (Solid-Liquid-Cryogenic).",
        "• **Cryogenic Engine**: PSLV does not use cryogenic engines; GSLV relies on an indigenous Cryogenic Upper Stage (CUS) in its 3rd stage.",
        "• **Payload Capacity**: PSLV carries satellites up to 1,750 kg into LEO or SSO. GSLV carries heavy payloads (2,500 to 4,000 kg) into GTO and GEO.",
        "• **Nicknames**: PSLV is known as ISRO's **'Workhorse'**, while GSLV is referred to as ISRO's **'Bahubali Rocket'**.",

        "### How Does a Cryogenic Engine (CUS-15) Function?",
        "Cryogenic technology is among the most sophisticated domains in aerospace engineering:",
        "• **Super-Cold Storage**: The engine burns **Liquid Hydrogen ($LH_2$) stored at $-253^\circ\text{C}$** as fuel and **Liquid Oxygen ($LOX$) stored at $-183^\circ\text{C}$** as oxidizer.",
        "• **High Specific Impulse**: Provides maximum thrust per unit mass of propellant, enabling heavy satellites to reach high altitude orbits (36,000 km GEO).",

        "### MPPSC Mains GS-3 Model Answer Capsule",
        "**Question: Discuss the primary objectives and strategic significance of the GSLV-F17/EOS-05 mission. (5 Marks / 50 Words or 11 Marks / 200 Words)**",
        "**Model Answer**: Launched by ISRO on 4 September 2026, EOS-05 is India's first geostationary Earth observation satellite.",
        "**Key Objectives & Significance**:",
        "• 1. **Border Security**: Stationed at 36,000 km, transmits real-time images of LAC, LOC & IOR every 30 minutes.",
        "• 2. **Disaster Alert**: Provides early warnings for cyclones, floods, and forest fires.",
        "• 3. **Tech Sovereignty**: Validates indigenous CUS-15 Cryogenic Engine capabilities.",
        "**Conclusion**: EOS-05 empowers India with a continuous 'Eye in the Sky', fortifying national security and disaster resilience under Atmanirbhar Bharat."
      ])
    ],

    /* ─── PAA & AI Overview Optimized FAQs ─────────────────── */
    faqs: [
      {
        question: "GSLV-F17 मिशन क्या है और इसे कब लॉन्च किया गया?",
        questionEn: "What is the GSLV-F17 mission and when was it launched?",
        answer: "GSLV-F17 इसरो का एक भारी प्रक्षेपण यान मिशन है, जिसे 4 सितंबर 2026 को तड़के 02:55 बजे सतीश धवन अंतरिक्ष केंद्र श्रीहरिकोटा से सफलता पूर्वक लॉन्च किया गया। इसने अर्थ ऑब्जर्वेशन सैटेलाइट EOS-05 को 36,000 किमी की भू-स्थिर कक्षा में स्थापित किया।",
        answerEn: "GSLV-F17 is an ISRO heavy-lift space mission launched successfully on 4 September 2026 at 02:55 AM IST from SDSC SHAR Sriharikota, deploying the EOS-05 Earth Observation Satellite into a 36,000 km Geostationary Orbit."
      },
      {
        question: "EOS-05 सैटेलाइट क्या है और इसे 'Eye in the Sky' क्यों कहा जाता है?",
        questionEn: "What is the EOS-05 satellite and why is it called 'Eye in the Sky'?",
        answer: "EOS-05 (पूर्व नाम GISAT-1A) 2,367 किग्रा वजन का उन्नत भू-प्रेक्षण उपग्रह है। इसे 36,000 किमी ऊँचाई पर भू-स्थिर कक्षा (GEO) में रखा गया है जहाँ से यह हर 30 मिनट में संपूर्ण भारत और चीन-पाकिस्तान सीमाओं की निरंतर रियल-टाइम तस्वीरें भेज सकता है, इसीलिए इसे 'अंतरिक्ष में भारत की बाज आँख' कहते हैं।",
        answerEn: "EOS-05 (formerly GISAT-1A) is a 2,367 kg advanced Earth observation satellite. Positioned in a 36,000 km Geostationary Orbit, it transmits real-time high-resolution images of India and borders every 30 minutes, earning it the title 'Eye in the Sky'."
      },
      {
        question: "इस सैटेलाइट से भारत की राष्ट्रीय सुरक्षा और सीमाओं को क्या फायदा होगा?",
        questionEn: "How will EOS-05 satellite benefit India's national security and border surveillance?",
        answer: "यह उपग्रह चीन और पाकिस्तान से लगती थल सीमाओं (LAC/LOC) और हिंद महासागर (IOR) पर 24 घंटे नजर रखेगा। सीमाओं पर किसी भी असामान्य गतिविधि या सैन्य जमावड़े की रियल-टाइम सूचना हर 30 मिनट में सेना को मिलेगी।",
        answerEn: "EOS-05 maintains 24/7 vigil over India's borders with China and Pakistan (LAC/LOC) and the Indian Ocean Region, providing defense forces with real-time imagery every 30 minutes to detect suspicious activities."
      },
      {
        question: "GSLV-F17 रॉकेट की तकनीकी विशेषताएं (ऊंचाई, वजन, 3-चरण) क्या हैं?",
        questionEn: "What are the technical specifications of GSLV-F17 rocket?",
        answer: "GSLV-F17 की ऊँचाई 51.7 मीटर और वजन 420.5 टन है। यह 3-चरणीय रॉकेट है: प्रथम चरण (ठोस S139 + 4 लिक्विड L40 स्ट्रैप-ऑन), द्वितीय चरण (विकास लिक्विड इंजन), और तृतीय चरण (स्वदेशी क्रायोजेनिक CUS-15 इंजन)।",
        answerEn: "GSLV-F17 stands 51.7 meters tall with a lift-off mass of 420.5 tonnes. It features 3 stages: Solid S139 with 4 L40 liquid strap-ons, Liquid Vikas Engine, and Indigenous Cryogenic CUS-15 Upper Stage."
      },
      {
        question: "GSLV का फुल फॉर्म क्या है और PSLV तथा GSLV में क्या मुख्य अंतर है?",
        questionEn: "What is the full form of GSLV and what is the difference between PSLV and GSLV?",
        answer: "GSLV का फुल फॉर्म Geosynchronous Satellite Launch Vehicle है। PSLV 4-चरणीय रॉकेट है जो हलके उपग्रहों को 160-800 किमी (LEO) की कक्षा में भेजता है, जबकि GSLV 3-चरणीय क्रायोजेनिक रॉकेट है जो भारी उपग्रहों को 36,000 किमी (GEO/GTO) की कक्षा में स्थापित करता है।",
        answerEn: "GSLV stands for Geosynchronous Satellite Launch Vehicle. PSLV is a 4-stage rocket launching lighter payloads to LEO (160-800 km), whereas GSLV is a 3-stage cryogenic rocket placing heavy payloads to GEO/GTO (36,000 km)."
      },
      {
        question: "क्रायोजेनिक इंजन (CUS-15) कैसे काम करता है?",
        questionEn: "How does the Cryogenic Upper Stage (CUS-15) engine work?",
        answer: "क्रायोजेनिक इंजन अत्यंत कम तापमान पर काम करता है। इसमें तरल हाइड्रोजन ($-253^\circ\text{C}$) ईंधन के रूप में और तरल ऑक्सीजन ($-183^\circ\text{C}$) ऑक्सीडाइजर के रूप में प्रयोग होता है, जो भारी उपग्रहों को गहरी कक्षा (GEO) में पहुँचाने के लिए उच्च थ्रस्ट प्रदान करता है।",
        answerEn: "Cryogenic engines operate at extreme sub-zero temperatures using Liquid Hydrogen ($-253^\circ\text{C}$) as fuel and Liquid Oxygen ($-183^\circ\text{C}$) as oxidizer, generating maximum thrust for high-altitude orbit insertion."
      },
      {
        question: "प्रधानमंत्री नरेंद्र मोदी (PM Modi) ने ISRO की इस सफलता पर क्या कहा?",
        questionEn: "What did PM Narendra Modi state regarding ISRO's successful GSLV-F17 launch?",
        answer: "प्रधानमंत्री नरेंद्र मोदी ने ISRO वैज्ञानिकों की सराहना करते हुए कहा कि GSLV-F17/EOS-05 का सफल प्रक्षेपण भारत की आपदा प्रबंधन, राष्ट्रीय सुरक्षा और अंतरिक्ष आत्मनिर्भरता को नई ताकत प्रदान करता है।",
        answerEn: "PM Narendra Modi congratulated ISRO scientists, noting that the successful launch of GSLV-F17 carrying EOS-05 fortifies India's disaster resilience, national security, and space self-reliance."
      },
      {
        question: "सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR) कहाँ स्थित है?",
        questionEn: "Where is Satish Dhawan Space Centre (SDSC SHAR) located?",
        answer: "सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR) भारत के आंध्र प्रदेश राज्य के तिरुपति जिले में श्रीहरिकोटा द्वीप पर स्थित इसरो का मुख्य प्रक्षेपण केंद्र है।",
        answerEn: "Satish Dhawan Space Centre (SDSC SHAR) is ISRO's primary spaceport located at Sriharikota island in Tirupati district, Andhra Pradesh, India."
      }
    ],

    mcqs: [
      {
        question: "4 सितंबर 2026 को इसरो (ISRO) द्वारा लॉन्च किए गए भू-प्रेक्षण उपग्रह EOS-05 का प्रक्षेपण किस रॉकेट से किया गया?",
        questionEn: "Which launch vehicle was used by ISRO to launch the Earth Observation Satellite EOS-05 on 4 September 2026?",
        options: ["PSLV-C58", "GSLV-F17", "SSLV-D3", "LVM3-M4"],
        optionsEn: ["PSLV-C58", "GSLV-F17", "SSLV-D3", "LVM3-M4"],
        correctIndex: 1,
        explanation: "ISRO ने 4 सितंबर 2026 को श्रीहरिकोटा से GSLV-F17 रॉकेट के माध्यम से EOS-05 उपग्रह का सफल प्रक्षेपण किया।",
        explanationEn: "ISRO successfully launched the EOS-05 satellite aboard the GSLV-F17 launch vehicle from Sriharikota on 4 September 2026."
      },
      {
        question: "EOS-05 उपग्रह को पूर्व में किस नाम से जाना जाता था?",
        questionEn: "By what former name was the EOS-05 satellite known?",
        options: ["Cartosat-3", "GISAT-1A", "Risat-2BR1", "OceanSat-3"],
        optionsEn: ["Cartosat-3", "GISAT-1A", "Risat-2BR1", "OceanSat-3"],
        correctIndex: 1,
        explanation: "EOS-05 उपग्रह को पूर्व में GISAT-1A (Geo Imaging Satellite-1A) के नाम से जाना जाता था।",
        explanationEn: "The EOS-05 satellite was previously designated as GISAT-1A (Geo Imaging Satellite-1A)."
      },
      {
        question: "EOS-05 उपग्रह को पृथ्वी की सतह से कितनी ऊँचाई पर स्थित कक्षा में स्थापित किया गया है?",
        questionEn: "At what altitude orbit has the EOS-05 satellite been deployed for continuous imaging?",
        options: ["500 किमी (LEO)", "2,000 किमी (SSO)", "36,000 किमी (GEO)", "20,000 किमी (MEO)"],
        optionsEn: ["500 km (LEO)", "2,000 km (SSO)", "36,000 km (GEO)", "20,000 km (MEO)"],
        correctIndex: 2,
        explanation: "EOS-05 को 36,000 किमी की भू-स्थिर कक्षा (Geostationary Orbit - GEO) में स्थापित किया गया है।",
        explanationEn: "EOS-05 is deployed into a Geostationary Orbit (GEO) at an altitude of approximately 36,000 km."
      },
      {
        question: "GSLV रॉकेट के तीसरे चरण (Third Stage) में किस प्रकार की ईंधन तकनीक का उपयोग किया जाता है?",
        questionEn: "What type of propulsion system is used in the third stage of the GSLV rocket?",
        options: ["ठोस ईंधन", "तरल ईंधन (विकास इंजन)", "स्वदेशी क्रायोजेनिक इंजन (LH2 & LOX)", "परमाणु ईंधन"],
        optionsEn: ["Solid Propulsion", "Liquid Vikas Engine", "Indigenous Cryogenic Engine (LH2 & LOX)", "Nuclear Propulsion"],
        correctIndex: 2,
        explanation: "GSLV के तीसरे चरण (CUS-15) में स्वदेशी क्रायोजेनिक इंजन का उपयोग होता है, जिसमें तरल हाइड्रोजन (-253°C) और तरल ऑक्सीजन (-183°C) का उपयोग होता है।",
        explanationEn: "The third stage of GSLV utilizes an indigenous Cryogenic Upper Stage (CUS-15) powered by Liquid Hydrogen and Liquid Oxygen."
      },
      {
        question: "EOS-05 उपग्रह की मुख्य विशेषता क्या है, जिसके कारण इसे 'Eye in the Sky' कहा जा रहा है?",
        questionEn: "What is the primary feature of EOS-05 satellite due to which it is called 'Eye in the Sky'?",
        options: [
          "यह चंद्रमा की तस्वीरें लेता है।",
          "यह हर 30 मिनट में भारतीय भूभाग और सीमाओं की निरंतर रियल-टाइम तस्वीरें भेज सकता है।",
          "यह केवल रात में काम करता है।",
          "यह एक संचार उपग्रह है।"
        ],
        optionsEn: [
          "It captures lunar surface images.",
          "It can transmit real-time images of India and borders every 30 minutes.",
          "It functions exclusively at night.",
          "It is a covert telecommunications satellite."
        ],
        correctIndex: 1,
        explanation: "EOS-05 भू-स्थिर कक्षा से हर 30 मिनट में संपूर्ण भारतीय भूभाग की रियल-टाइम हाई-रिजॉल्यूशन तस्वीरें प्रदान करता है।",
        explanationEn: "Positioned in GEO, EOS-05 provides continuous real-time imagery of India and border zones every 30 minutes."
      },
      {
        question: "PSLV और GSLV रॉकेट में मुख्य अंतर क्या है?",
        questionEn: "What is the primary technical difference between PSLV and GSLV rockets?",
        options: [
          "PSLV 3-चरणीय है और GSLV 4-चरणीय है।",
          "PSLV में क्रायोजेनिक इंजन नहीं होता जबकि GSLV के तीसरे चरण में क्रायोजेनिक इंजन होता है।",
          "GSLV केवल चंद्रमा पर जाता है।",
          "दोनों में कोई अंतर नहीं है।"
        ],
        optionsEn: [
          "PSLV is 3-stage and GSLV is 4-stage.",
          "PSLV does not use cryogenic engine, while GSLV uses cryogenic engine in its 3rd stage.",
          "GSLV is exclusively for lunar missions.",
          "There is no technical difference between them."
        ],
        correctIndex: 1,
        explanation: "PSLV 4-चरणीय रॉकेट है जिसमें क्रायोजेनिक इंजन नहीं होता, जबकि GSLV 3-चरणीय रॉकेट है जिसमें तीसरे चरण में स्वदेशी क्रायोजेनिक इंजन (CUS) होता है।",
        explanationEn: "PSLV is a 4-stage rocket without cryogenic engines, while GSLV is a 3-stage rocket equipped with a Cryogenic Upper Stage in its 3rd stage."
      },
      {
        question: "सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR) भारत के किस राज्य में स्थित है?",
        questionEn: "Satish Dhawan Space Centre (SDSC SHAR) is located in which Indian state?",
        options: ["तमिलनाडु", "केरल", "आंध्र प्रदेश", "ओडिशा"],
        optionsEn: ["Tamil Nadu", "Kerala", "Andhra Pradesh", "Odisha"],
        correctIndex: 2,
        explanation: "सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR) आंध्र प्रदेश के तिरुपति जिले में श्रीहरिकोटा द्वीप पर स्थित है।",
        explanationEn: "Satish Dhawan Space Centre (SDSC SHAR) is located at Sriharikota island in Tirupati district, Andhra Pradesh."
      },
      {
        question: "GSLV-F17 मिशन, GSLV श्रेणी के प्रक्षेपण यान की कौन-सी उड़ान थी?",
        questionEn: "GSLV-F17 mission marked which flight number for the GSLV series launch vehicles?",
        options: ["12वीं उड़ान", "15वीं उड़ान", "19वीं उड़ान", "25वीं उड़ान"],
        optionsEn: ["12th Flight", "15th Flight", "19th Flight", "25th Flight"],
        correctIndex: 2,
        explanation: "GSLV-F17 इसरो के GSLV श्रेणी के प्रक्षेपण यान की 19वीं उड़ान थी।",
        explanationEn: "GSLV-F17 was the 19th flight of ISRO's Geosynchronous Satellite Launch Vehicle series."
      }
    ],

    sources: [
      { label: "ISRO Official Launch Report - GSLV-F17/EOS-05 Mission", url: "https://www.isro.gov.in" },
      { label: "PM India Official Release on ISRO GSLV-F17 Launch", url: "https://www.pmindia.gov.in" },
      { label: "Press Information Bureau (PIB) Science & Tech Release", url: "https://pib.gov.in" },
      { label: "Aakar IAS Current Affairs Portal", url: "https://aakarias.com/current-affairs" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully updated ISRO GSLV-F17 EOS-05 Article with SEO & AI Overview optimization in Sanity!");
  } catch (err) {
    console.error("❌ Failed to update document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
