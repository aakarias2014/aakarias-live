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

async function expandAndInterlinkEOS05() {
  console.log("🚀 Expanding English Content & 2-Way Authority Interlinking for ISRO EOS-05 Mission 2026...");

  const docId = "ca-isro-gslv-f17-eos-05-mission-2026";

  const fullBodyHi = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "भारतीय अंतरिक्ष अनुसंधान संगठन (**ISRO**) ने सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR), श्रीहरिकोटा के द्वितीय प्रक्षेपण पैड से **GSLV-F17** (Geosynchronous Satellite Launch Vehicle) रॉकेट द्वारा **EOS-05 (Earth Observation Satellite-05)** का सफल प्रक्षेपण किया। **'आकाश में बाज' (Eye in the Sky)** उपनाम से जाना जाने वाला यह उपग्रह 36,000 किलोमीटर की ऊंचाई पर स्थित भू-तुल्यकालिक कक्षा (Geosynchronous Orbit - GEO) में स्थापित होकर भारत की 7,500+ किमी लंबी तटरेखा तथा उत्तरी/पूर्वी अंतर्राष्ट्रीय सीमाओं की 24x7 रियल-टाइम निगरानी करेगा। यह लेख **MPPSC (Mains Paper 3 Unit 7)** और **UPSC (GS-3 Science & Tech)** के परीक्षार्थियों हेतु अत्यंत उपयोगी है।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "🔗 संबंधित उच्च-अथॉरिटी लेख (Key Interlinked Articles)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• 🚀 [**ISRO GSLV-F17 EOS-05 सैटेलाइट लॉन्च लाइव विवरण**](/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026): लॉन्च टाइमलाइन, पेलोड्स एवं प्रारंभिक बिंदु।\n",
        },
        {
          _type: "span",
          text: "• 🌌 [**विक्रम-1: भारत का पहला निजी ऑर्बिटल रॉकेट (Skyroot Aerospace)**](/current-affairs/vikram-1-orbital-rocket-skyroot-aerospace-launch): स्काईरूट एयरोस्पेस एवं भारत का निजी अंतरिक्ष सुधार।\n",
        },
        {
          _type: "span",
          text: "• 🚢 [**विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र (आंध्र प्रदेश)**](/current-affairs/worlds-first-autonomous-shipbuilding-centre-andhra-pradesh-2026): नेल्लोर में मैरीटाइम रोबोटिक्स व AI शिप्स।\n",
        },
        {
          _type: "span",
          text: "• 🛩️ [**भारत की पहली ड्रोन बटालियन 'बाज़' (पंजाब)**](/current-affairs/indias-first-drone-battalion-punjab-2026): जालंधर वज्र कोर एवं BSF सीमा सुरक्षा तकनीक।\n",
        },
        {
          _type: "span",
          text: "• 💻 [**PARAM प्रज्ञा AI सुपरकंप्यूटर व भारत की सुपरकंप्यूटिंग यात्रा**](/general-awareness/param-pragya-ai-supercomputer-india-supercomputing-journey): C-DAC व NSM की ऐतिहासिक उपलब्धियां।\n",
        },
        {
          _type: "span",
          text: "• 🌊 [**भारत के प्रमुख रामसर स्थल (Ramsar Sites in India List)**](/general-awareness/ramsar-sites-in-india): आर्द्रभूमि संरक्षण व पर्यावरण नोट्स।\n",
        },
        {
          _type: "span",
          text: "• 🛡️ [**आपदा प्रबंधन (संशोधन) अधिनियम 2025 नोट्स**](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes): NDMA, SDMA व आपदा चेतावनी प्रणाली।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. EOS-05 मिशन की मुख्य विशेषताएँ (Key Highlights)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• **प्रक्षेपक यान**: GSLV-F17 (Geosynchronous Satellite Launch Vehicle)\n" },
        { _type: "span", text: "• **उपग्रह भार**: लगभग 2,200 किलोग्राम (2.2 टन कक्षा क्षमता)\n" },
        { _type: "span", text: "• **प्रक्षेपण स्थल**: सतीश धवन अंतरिक्ष केंद्र (SDSC SHAR), श्रीहरिकोटा (आंध्र प्रदेश)\n" },
        { _type: "span", text: "• **कक्षा**: जियोसिंक्रोनस कक्षा (GEO) — 36,000 किमी ऊंचाई\n" },
        { _type: "span", text: "• **तृतीय चरण**: स्वदेशी क्रायोजेनिक अपर स्टेज (CUS - Cryogenic Upper Stage)\n" },
        { _type: "span", text: "• **मिशन जीवनकाल**: 10 वर्ष से अधिक (Over 10 Years Operational Lifespan)" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. स्वदेशी क्रायोजेनिक इंजन (CUS) तकनीक एवं GSLV की संरचना" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "GSLV-F17 तीन चरणों वाला प्रक्षेपण यान है:\n• **प्रथम चरण (S139)**: ठोस ईंधन (Solid HTPB) तथा 4 विकास (Vikas) लिक्विड स्ट्रैप-ऑन मोटर्स।\n• **द्वितीय चरण (GS2)**: तरल ईंधन (Vikas Engine) जो UDMH एवं N2O4 पर कार्य करता है।\n• **तृतीय चरण (CUS - CE-7.5)**: इसरो द्वारा पूर्णतः स्वदेशी रूप से विकसित क्रायोजेनिक इंजन, जो अत्यंत निम्न तापमान पर **तरल हाइड्रोजन (LH2 -253°C)** तथा **तरल ऑक्सीजन (LOX -183°C)** को जलाकर भारी उपग्रहों को 36,000 किमी GEO कक्षा में सटीक रूप से स्थापित करता है।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. राष्ट्रीय सुरक्षा एवं आपदा प्रबंधन में EOS-05 का महत्व" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **24x7 सीमा सुरक्षा**: 36,000 किमी ऊंचाई से स्थिर रहने के कारण यह उपग्रह लद्दाख, अरुणाचल, पंजाब एवं हिंद महासागर में दुश्मन की गतिविधियों पर लगातार पैनी नजर रखेगा।\n• **चक्रवात व बाढ़ पूर्व चेतावनी**: बंगाल की खाड़ी और अरब सागर में उठने वाले चक्रवातों, तूफानों व अतिवृष्टि की 48 घंटे पूर्व सटीक इमेजरी प्रदान करेगा।\n• **तटीय सुरक्षा व मैरीटाइम डोमेन अवेयरनेस (MDA)**: अवैध जहाजों, समुद्री डकैती और तटीय घुसपैठ को रोकने में नौसेना व तट रक्षक बल (Indian Coast Guard) को डेटा देगा।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. MPPSC & UPSC परीक्षा उपयोगी त्वरित नोट्स (Quick Exam Revision)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **MPPSC Mains Paper 3 Unit 7**: ISRO के उपग्रह (Remote Sensing & Communication), स्वदेशी क्रायोजेनिक विकास (CE-7.5/CE-20), अंतरिक्ष तकनीक का सामाजिक-आर्थिक लाभ।\n• **UPSC GS-3 (Science & Tech & Internal Security)**: अंतरिक्ष नीति 2023, स्पेस 2.0 सुधार, राष्ट्रीय सुरक्षा में उपग्रह इमेजरी की भूमिका एवं आपदा प्रबंधन (SDG 13 & 14)।",
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
          text: "The **Indian Space Research Organisation (ISRO)** has successfully launched the **EOS-05 (Earth Observation Satellite-05)** aboard the **GSLV-F17** (Geosynchronous Satellite Launch Vehicle) rocket from the Second Launch Pad of Satish Dhawan Space Centre (SDSC SHAR), Sriharikota. Popularly nicknamed the **'Eye in the Sky'**, EOS-05 operates from a 36,000 km altitude Geosynchronous Orbit (GEO) to deliver 24/7 real-time surveillance across India's 7,500+ km coastline and northern/eastern borders. This comprehensive breakdown is tailored specifically for **MPPSC (Mains Paper 3 Unit 7)** and **UPSC (GS-3 Science & Tech)** aspirants.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "🔗 High-Authority Interlinked Articles" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• 🚀 [**ISRO GSLV-F17 EOS-05 Satellite Launch Key Highlights**](/en/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026): Launch timeline, payload specs, and orbit injection.\n",
        },
        {
          _type: "span",
          text: "• 🌌 [**Vikram-1: India's 1st Private Orbital Rocket (Skyroot Aerospace)**](/en/current-affairs/vikram-1-orbital-rocket-skyroot-aerospace-launch): Skyroot Aerospace & India's commercial space reforms.\n",
        },
        {
          _type: "span",
          text: "• 🚢 [**World's 1st Autonomous Shipbuilding Centre in Andhra Pradesh**](/en/current-affairs/worlds-first-autonomous-shipbuilding-centre-andhra-pradesh-2026): Nellore high-tech shipyard & AI maritime tech.\n",
        },
        {
          _type: "span",
          text: "• 🛩️ [**India's 1st Dedicated Drone Battalion 'Baaz' in Punjab**](/en/current-affairs/indias-first-drone-battalion-punjab-2026): Jalandhar Vajra Corps & BSF counter-drone operations.\n",
        },
        {
          _type: "span",
          text: "• 💻 [**PARAM Pragya AI Supercomputer & India's Supercomputing Journey**](/en/general-awareness/param-pragya-ai-supercomputer-india-supercomputing-journey): C-DAC & National Supercomputing Mission.\n",
        },
        {
          _type: "span",
          text: "• 🌊 [**Ramsar Sites in India Complete List & Map Notes**](/en/general-awareness/ramsar-sites-in-india): Wetland conservation & environmental science.\n",
        },
        {
          _type: "span",
          text: "• 🛡️ [**Disaster Management Amendment Act 2025 Study Notes**](/en/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes): NDMA, SDMA & early warning systems.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. Executive Summary & EOS-05 Mission Specifications" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• **Launch Vehicle**: GSLV-F17 (Geosynchronous Satellite Launch Vehicle Mark II)\n" },
        { _type: "span", text: "• **Payload Mass**: Approx. 2,200 kg (2.2-tonne GTO payload capacity)\n" },
        { _type: "span", text: "• **Spaceport**: Satish Dhawan Space Centre (SDSC SHAR), Sriharikota, Andhra Pradesh\n" },
        { _type: "span", text: "• **Target Orbit**: Geosynchronous Orbit (GEO) — 36,000 km altitude\n" },
        { _type: "span", text: "• **Upper Stage Propulsion**: Indigenous Cryogenic Upper Stage (CUS - CE-7.5 Engine)\n" },
        { _type: "span", text: "• **Mission Lifespan**: Design operational lifespan exceeding 10 years" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. GSLV Architecture & Indigenous Cryogenic Upper Stage (CUS)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "GSLV-F17 is a 3-stage heavy launch vehicle featuring:\n• **First Stage (GS1 / S139)**: Solid propellant core motor with 4 liquid Vikas engine strap-ons.\n• **Second Stage (GS2)**: Earth-storable liquid Vikas engine burning UDMH and N2O4.\n• **Third Stage (CUS - CE-7.5)**: ISRO's indigenous Cryogenic Upper Stage burning **Liquid Hydrogen (LH2 at -253°C)** and **Liquid Oxygen (LOX at -183°C)**. This ultra-high-efficiency engine provides the necessary velocity increment to place heavy satellites into GEO.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. Strategic Defense, Maritime & Disaster Monitoring Utility" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **24/7 Border Surveillance**: Stationary GEO positioning enables continuous optical & radar imaging over Ladakh, Arunachal Pradesh, Punjab border, and the Indian Ocean Region.\n• **Cyclone & Flood Early Warning**: Delivers high-resolution imagery 48 hours prior to landfall for cyclones developing in the Bay of Bengal and Arabian Sea.\n• **Maritime Domain Awareness (MDA)**: Tracks dark ships, illegal fishing, and sea piracy in coordination with the Indian Navy and Coast Guard.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. MPPSC & UPSC Exam Point of View (Quick Revision)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **MPPSC Mains Paper 3 Unit 7**: ISRO history, satellite classifications (Remote Sensing vs Communication), Cryogenic development (CE-7.5 / CE-20), and societal benefits.\n• **UPSC GS-3 (Science & Tech / Security)**: Indian Space Policy 2023, Space 2.0 commercialization, dual-use satellite applications in national defense, and disaster management (SDG 13 & 14).",
        },
      ],
    },
  ];

  const updatedDoc = {
    title: "ISRO GSLV-F17 EOS-05 मिशन 2026 | MPPSC & UPSC",
    titleEn: "ISRO GSLV-F17 EOS-05 Mission 2026 | MPPSC & UPSC",
    
    seoTitle: "ISRO GSLV-F17 EOS-05 मिशन 2026 | MPPSC & UPSC",
    seoTitleEn: "ISRO GSLV-F17 EOS-05 Mission 2026 | MPPSC & UPSC Notes",
    
    excerpt: "ISRO का GSLV-F17 EOS-05 पृथ्वी अवलोकन मिशन: स्वदेशी CUS क्रायोजेनिक इंजन, 36,000 किमी जियोसिंक्रोनस कक्षा, रक्षा व आपदा प्रबंधन हेतु MPPSC & UPSC परीक्षा नोट्स।",
    excerptEn: "Complete breakdown of ISRO's GSLV-F17 EOS-05 Earth Observation Mission featuring CUS Cryogenic Engine, GEO orbit capabilities & key study notes for MPPSC & UPSC.",
    
    seoDescription: "ISRO GSLV-F17 EOS-05 मिशन संपूर्ण विश्लेषण। सतीश धवन अंतरिक्ष केंद्र प्रक्षेपण, 36,000 किमी GEO पेलोड्स, 24x7 तटीय सुरक्षा व MPPSC & UPSC परीक्षा हेतु आवश्यक नोट्स।",
    seoDescriptionEn: "ISRO GSLV-F17 EOS-05 Earth Observation Mission analysis. SDSC Sriharikota launch, 36,000 km GEO orbit payload specs, coastal defense & study notes for MPPSC/UPSC.",

    body: fullBodyHi,
    bodyEn: fullBodyEn,

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

    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
      { _type: "reference", _ref: "tag-scitech" },
    ],

    syllabus: [
      "MPPSC Mains Paper 3 Unit 7 Science & Tech ISRO & Space Technology",
      "UPSC GS-3 Science & Tech Space Exploration & Disaster Management",
    ],
  };

  const res = await sanityClient.patch(docId).set(updatedDoc).commit();
  console.log("✅ Successfully updated Article 2 in Sanity with full English Body & 2-Way Interlinks:", res._id);
}

expandAndInterlinkEOS05().catch((err) => {
  console.error("❌ Failed to expand English content:", err);
  process.exit(1);
});
