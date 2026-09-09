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
  console.log("🚀 Syncing Complete 1:1 Bilingual English Content (bodyEn) & Body for ISRO EOS-05 Mission...");

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
      children: [{ _type: "span", text: "🔗 संबंधित मुख्य लेख (Interlinking Links)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• 🚀 [**ISRO GSLV-F17 EOS-05 सैटेलाइट लॉन्च लाइव विवरण**](/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026): लॉन्च टाइमलाइन, पेलोड्स एवं प्रारंभिक बिंदु।\n" },
        { _type: "span", text: "• 🌌 [**विक्रम-1: भारत का पहला निजी ऑर्बिटल रॉकेट (Skyroot Aerospace)**](/current-affairs/vikram-1-orbital-rocket-skyroot-aerospace-launch): स्काईरूट एयरोस्पेस एवं भारत का निजी अंतरिक्ष सुधार।\n" },
        { _type: "span", text: "• 🚢 [**विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र (आंध्र प्रदेश)**](/current-affairs/worlds-first-autonomous-shipbuilding-centre-andhra-pradesh-2026): नेल्लोर में मैरीटाइम रोबोटिक्स व AI शिप्स।\n" },
        { _type: "span", text: "• 🛩️ [**भारत की पहली ड्रोन बटालियन 'बाज़' (पंजाब)**](/current-affairs/indias-first-drone-battalion-punjab-2026): जालंधर वज्र कोर एवं BSF सीमा सुरक्षा तकनीक।\n" },
        { _type: "span", text: "• 💻 [**PARAM प्रज्ञा AI सुपरकंप्यूटर व भारत की सुपरकंप्यूटिंग यात्रा**](/general-awareness/param-pragya-ai-supercomputer-india-supercomputing-journey): C-DAC व NSM की ऐतिहासिक उपलब्धियां।\n" },
        { _type: "span", text: "• 🌊 [**भारत के प्रमुख रामसर स्थल (Ramsar Sites in India List)**](/general-awareness/ramsar-sites-in-india): आर्द्रभूमि संरक्षण व पर्यावरण नोट्स।\n" },
        { _type: "span", text: "• 🛡️ [**आपदा प्रबंधन (संशोधन) अधिनियम 2025 नोट्स**](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes): NDMA, SDMA व आपदा चेतावनी प्रणाली।" },
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
        { _type: "span", text: "GSLV-F17 एक तीन-स्तरीय (Three-Stage) प्रक्षेपण यान है:\n" },
        { _type: "span", text: "• **प्रथम चरण (S139)**: ठोस प्रणोदक (Solid Fuel - HTPB) तथा 4 स्ट्रैप-ऑन लिक्विड मोटर्स (Vikas Engines)।\n" },
        { _type: "span", text: "• **द्वितीय चरण (GS2)**: तरल ईंधन (Vikas Engine) जो अनसिमेट्रिकल डाइमिथाइल हाइड्राजीन (UDMH) पर कार्य करता है।\n" },
        { _type: "span", text: "• **तृतीय चरण (CUS - CE-7.5)**: भारत का अति-आधुनिक **क्रायोजेनिक अपर स्टेज (CE-7.5)** जो बेहद कम तापमान पर द्रव हाइड्रोजन (-253°C) और द्रव ऑक्सीजन (-183°C) का उपयोग करता है। यह इंजन भारी उपग्रहों को 36,000 किमी उच्च कक्षा में स्थापित करने में सक्षम है।" },
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
        { _type: "span", text: "• **MPPSC Mains Paper 3 Unit 7**: ISRO के विकास का इतिहास, प्रमुख उपग्रह (Remote Sensing & Communication Satellites), क्रायोजेनिक तकनीक का विकास एवं सामाजिक लाभ।\n" },
        { _type: "span", text: "• **UPSC GS-3 (Science & Tech)**: अंतरिक्ष प्रौद्योगिकी का मेक इन इंडिया में योगदान, सीमा सुरक्षा में उपग्रह इमेजरी का महत्व तथा स्पेस 2.0 नीतियाँ।" },
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
          text: "The **Indian Space Research Organisation (ISRO)** has successfully launched the **EOS-05 (Earth Observation Satellite-05)** aboard the **GSLV-F17** (Geosynchronous Satellite Launch Vehicle) rocket from the Second Launch Pad of Satish Dhawan Space Centre (SDSC SHAR), Sriharikota. Nicknamed **'Eye in the Sky'**, this satellite operates from a 36,000 km Geosynchronous Orbit (GEO) to deliver 24/7 real-time surveillance across India's 7,500+ km coastline and northern/eastern borders. This comprehensive study material is specifically tailored for **MPPSC (Mains Paper 3 Unit 7)** and **UPSC (GS-3 Science & Tech)** civil services candidates.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "🔗 Related High-Authority Articles (Interlinking Links)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• 🚀 [**ISRO GSLV-F17 EOS-05 Satellite Launch Key Highlights**](/en/current-affairs/isro-gslv-f17-eos-05-satellite-launch-2026): Launch timeline, payload specs, and orbit injection.\n" },
        { _type: "span", text: "• 🌌 [**Vikram-1: India's 1st Private Orbital Rocket (Skyroot Aerospace)**](/en/current-affairs/vikram-1-orbital-rocket-skyroot-aerospace-launch): Commercial space reforms and launch vehicle tech.\n" },
        { _type: "span", text: "• 🚢 [**World's 1st Autonomous Shipbuilding Centre in Andhra Pradesh**](/en/current-affairs/worlds-first-autonomous-shipbuilding-centre-andhra-pradesh-2026): Nellore high-tech shipyard & AI maritime tech.\n" },
        { _type: "span", text: "• 🛩️ [**India's 1st Dedicated Drone Battalion 'Baaz' in Punjab**](/en/current-affairs/indias-first-drone-battalion-punjab-2026): Jalandhar Vajra Corps & BSF counter-drone operations.\n" },
        { _type: "span", text: "• 💻 [**PARAM Pragya AI Supercomputer & India's Supercomputing Journey**](/en/general-awareness/param-pragya-ai-supercomputer-india-supercomputing-journey): C-DAC & National Supercomputing Mission.\n" },
        { _type: "span", text: "• 🌊 [**Ramsar Sites in India Complete List & Map Notes**](/en/general-awareness/ramsar-sites-in-india): Wetland conservation & environmental science.\n" },
        { _type: "span", text: "• 🛡️ [**Disaster Management Amendment Act 2025 Study Notes**](/en/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes): NDMA, SDMA & early warning systems." },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "GSLV-F17 EOS-05 Mission: Quick Fact Sheet" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• **Launching Agency**: Indian Space Research Organisation (ISRO)\n" },
        { _type: "span", text: "• **Launch Rocket**: GSLV-F17 (Geosynchronous Satellite Launch Vehicle)\n" },
        { _type: "span", text: "• **Satellite Name**: EOS-05 (Earth Observation Satellite-05 / 'Eye in the Sky')\n" },
        { _type: "span", text: "• **Launch Site**: Satish Dhawan Space Centre (SDSC SHAR), Sriharikota (Andhra Pradesh)\n" },
        { _type: "span", text: "• **Target Orbit**: Geosynchronous Orbit (GEO, ~36,000 km altitude)\n" },
        { _type: "span", text: "• **3rd Stage Engine**: Indigenous Cryogenic Upper Stage (CUS - Cryogenic Upper Stage)\n" },
        { _type: "span", text: "• **Primary Applications**: 24/7 border security, cyclone/flood early warning, agriculture & coastal management" },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "GSLV-F17 Technical Architecture & Cryogenic Stage" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "GSLV-F17 is a 3-stage heavy launch vehicle:\n" },
        { _type: "span", text: "• **First Stage (S139)**: Solid propellant (Solid Fuel - HTPB) with 4 Vikas liquid strap-on motors.\n" },
        { _type: "span", text: "• **Second Stage (GS2)**: Liquid propellant (Vikas Engine) operating on Unsymmetrical Dimethylhydrazine (UDMH).\n" },
        { _type: "span", text: "• **Third Stage (CUS - CE-7.5)**: ISRO's indigenous Cryogenic Upper Stage burning **Liquid Hydrogen (LH2 -253°C)** and **Liquid Oxygen (LOX -183°C)** at extreme sub-zero temperatures. This engine injects heavy satellites into 36,000 km high orbit." },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "MPPSC & UPSC Exam Point of View (Exam POV)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        { _type: "span", text: "• **MPPSC Mains Paper 3 Unit 7**: ISRO history, satellite classifications (Remote Sensing vs Communication), Cryogenic development (CE-7.5 / CE-20), and societal benefits.\n" },
        { _type: "span", text: "• **UPSC GS-3 (Science & Tech / Security)**: Indian Space Policy 2023, Space 2.0 commercialization, dual-use satellite applications in national defense, and disaster management (SDG 13 & 14)." },
      ],
    },
  ];

  await sanityClient
    .patch(docId)
    .set({
      body: fullBodyHi,
      bodyEn: fullBodyEn,
    })
    .commit();

  console.log("✅ Successfully updated Sanity doc ca-isro-gslv-f17-eos-05-mission-2026 with full bilingual body & bodyEn!");
}

main().catch((err) => {
  console.error("❌ Sync failed:", err);
  process.exit(1);
});
