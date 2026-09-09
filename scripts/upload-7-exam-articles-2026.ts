import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

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

const imagePaths = {
  kibithu: "/Users/aakariastech/.gemini/antigravity-ide/brain/cb01bba0-c967-4e88-8773-dba1be31687b/india_china_kibithu_talks_2026_1788871139573.jpg",
  amogh: "/Users/aakariastech/.gemini/antigravity-ide/brain/cb01bba0-c967-4e88-8773-dba1be31687b/exercise_amogh_jwala_2026_1788871301700.jpg",
  drone: "/Users/aakariastech/.gemini/antigravity-ide/brain/cb01bba0-c967-4e88-8773-dba1be31687b/first_drone_battalion_punjab_2026_1788871330586.jpg",
  sikhya: "/Users/aakariastech/.gemini/antigravity-ide/brain/cb01bba0-c967-4e88-8773-dba1be31687b/punjab_sikhya_kranti_2_0_2026_1788871359866.jpg",
  drap: "/Users/aakariastech/.gemini/antigravity-ide/brain/cb01bba0-c967-4e88-8773-dba1be31687b/drap_dumpsite_remediation_2026_1788871383182.jpg",
  shipbuilding: "/Users/aakariastech/.gemini/antigravity-ide/brain/cb01bba0-c967-4e88-8773-dba1be31687b/autonomous_shipbuilding_centre_ap_2026_1788871525008.jpg",
  water: "/Users/aakariastech/.gemini/antigravity-ide/brain/cb01bba0-c967-4e88-8773-dba1be31687b/un_world_water_development_report_2026_1788871548545.jpg",
};

// Helper to wrap strings as portable text block array
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
  console.log("🚀 Uploading 7 Exhaustive, Rich, Exam-Focused Current Affairs Articles with full Section Body text...");

  // Upload Assets
  console.log("📸 Uploading assets to Sanity...");
  const assetKibithu = await client.assets.upload("image", fs.createReadStream(imagePaths.kibithu), { filename: "kibithu_talks.jpg" });
  const assetAmogh = await client.assets.upload("image", fs.createReadStream(imagePaths.amogh), { filename: "amogh_jwala.jpg" });
  const assetDrone = await client.assets.upload("image", fs.createReadStream(imagePaths.drone), { filename: "drone_battalion.jpg" });
  const assetSikhya = await client.assets.upload("image", fs.createReadStream(imagePaths.sikhya), { filename: "sikhya_kranti.jpg" });
  const assetDrap = await client.assets.upload("image", fs.createReadStream(imagePaths.drap), { filename: "drap_dumpsite.jpg" });
  const assetShipbuilding = await client.assets.upload("image", fs.createReadStream(imagePaths.shipbuilding), { filename: "autonomous_shipbuilding.jpg" });
  const assetWater = await client.assets.upload("image", fs.createReadStream(imagePaths.water), { filename: "un_water_report.jpg" });

  console.log("✔ Uploaded all 7 image assets!");

  const articles = [
    /* ═════════════════════════════════════════════════════════════════════════
       ARTICLE 1: India-China Military Talks in Kibithu Sector
       ═════════════════════════════════════════════════════════════════════════ */
    {
      _id: "ca-india-china-corps-commander-talks-kibithu-2026",
      _type: "currentAffairs",
      slug: { _type: "slug", current: "india-china-corps-commander-talks-kibithu-sector-2026" },
      title: "भारत-चीन सैन्य वार्ता: किबिथू सेक्टर में पहली बार कोर कमांडर स्तर की बैठक — MPPSC व UPSC परीक्षा विश्लेषण",
      titleEn: "India-China Military Talks: First Corps Commander Level Meeting in Kibithu Sector — MPPSC & UPSC Analysis",
      excerpt: "अरुणाचल प्रदेश के किबिथू सेक्टर (वाचा-दमाई सीमा कार्मिक बैठक बिंदु) में भारत और चीन के बीच पहली बार कोर कमांडर स्तर की वार्ता आयोजित की गई। जानिए MPPSC व UPSC परीक्षा की दृष्टि से इसके मुख्य बिंदु।",
      excerptEn: "India and China held their first Corps Commander-level military talks in the Kibithu sector (Vacha-Damai Border Personnel Meeting Point) in Eastern Arunachal Pradesh. Read the detailed breakdown for MPPSC & UPSC.",
      ca_date: "2026-09-08",
      publishedAt: new Date().toISOString(),
      featured: true,
      readingTime: 9,
      keywords: [
        "भारत-चीन सैन्य वार्ता",
        "किबिथू सेक्टर",
        "वाचा-दमाई सीमा कार्मिक बैठक बिंदु",
        "कोर कमांडर वार्ता",
        "अरुणाचल प्रदेश सीमा",
        "MPPSC Current Affairs",
        "UPSC International Relations",
        "Kibithu Sector Talks",
        "Vacha Damai BPM Point",
        "India China Border Security",
      ],
      category: { _type: "reference", _ref: "cat-polity" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [
        { _type: "reference", _ref: "tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc" },
        { _type: "reference", _ref: "tag-prelims" },
        { _type: "reference", _ref: "tag-mains" },
        { _type: "reference", _ref: "tag-international-affairs" },
      ],
      syllabus: ["MPPSC Mains Paper 2 Sec A Unit 5", "UPSC GS-2 IR & Security", "Prelims GS-1 International Relations"],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetKibithu._id },
        alt: "India-China Corps Commander Military Talks in Kibithu Sector Arunachal Pradesh",
      },
      sections: [
        {
          _key: "sec-kibithu-1",
          kind: "whyInNews",
          title: "चर्चा में क्यों?",
          titleEn: "Why in News?",
          body: createBlocks([
            "अरुणाचल प्रदेश के पूर्वी मोर्चे पर स्थित किबिथू सेक्टर के वाचा-दमाई सीमा कार्मिक बैठक बिंदु (Vacha-Damai BPM Point) पर भारत और चीन के बीच पहली बार कोर कमांडर स्तर (Corps Commander Level) की सैन्य वार्ता आयोजित की गई।",
            "इससे पहले भारत और चीन के बीच कोर कमांडर स्तर की उच्च स्तरीय सैन्य वार्ताएं मुख्य रूप से पूर्वी लद्दाख (चुशूल-मोल्डो बीपीएम पॉइंट) में केंद्रित रहती थीं। पूर्वी कमान (Eastern Command) के तहत किबिथू सेक्टर में कोर कमांडर स्तर की बैठक का आयोजन दोनों देशों द्वारा वास्तविक नियंत्रण रेखा (LAC) पर शांति और स्थिरता बनाए रखने के प्रयासों का एक महत्वपूर्ण चरण माना जा रहा है।"
          ]),
          bodyEn: createBlocks([
            "For the first time, India and China conducted Corps Commander-level military talks at the Kibithu Sector (Vacha-Damai Border Personnel Meeting Point) in Eastern Arunachal Pradesh.",
            "Previously, high-level Corps Commander military dialogues were predominantly concentrated in Eastern Ladakh (Chushul-Moldo BPM points). Elevating the military interactions in Kibithu Sector under the Indian Army's Eastern Command marks a historic operational milestone to ensure stability along the Eastern LAC."
          ]),
        },
        {
          _key: "sec-kibithu-2",
          kind: "background",
          title: "किबिथू की भौगोलिक स्थिति एवं ऐतिहासिक पृष्ठभूमि",
          titleEn: "Geographical Location & Historical Context of Kibithu",
          body: createBlocks([
            "• भौगोलिक स्थान: किबिथू भारत के अरुणाचल प्रदेश राज्य के अंजाव (Anjaw) जिले में स्थित भारत का सबसे पूर्वी बसा हुआ गांव और सैन्य सेक्टर है।",
            "• लोहित नदी का प्रवेश: ब्रह्मपुत्र की प्रमुख सहायक नदी 'लोहित नदी' (Lohit River) तिब्बत (चीन) से निकलकर किबिथू के समीप ही भारतीय क्षेत्र में प्रवेश करती है।",
            "• 1962 का युद्ध और वालोंग की लड़ाई: 1962 के भारत-चीन युद्ध में किबिथू और निकटवर्ती वालोंग क्षेत्र में भारतीय सेना (4 कुमाऊँ रेजिमेंट व अन्य टुकड़ियों) ने चीनी सेना के विरुद्ध ऐतिहासिक वीरता के साथ वालोंग का युद्ध (Battle of Walong) लड़ा था।",
            "• वाइब्रेंट विलेज प्रोग्राम: भारत सरकार के गृह मंत्रालय द्वारा चलाए जा रहे 'वाइब्रेंट विलेज प्रोग्राम' (VVP) के तहत किबिथू में सीमावर्ती अधोसंरचना, 4G कनेक्टिविटी और पर्यटन सुविधाओं का कायाकल्प किया जा रहा है।"
          ]),
          bodyEn: createBlocks([
            "• Geographic Location: Kibithu is India's easternmost inhabited settlement guarding the Line of Actual Control (LAC) in the Anjaw district of Arunachal Pradesh.",
            "• Entry of Lohit River: The Lohit River, a major tributary of the Brahmaputra, enters India from Tibet near Kibithu.",
            "• 1962 Sino-Indian War & Battle of Walong: Kibithu and the adjacent Walong sector witnessed the historic Battle of Walong in 1962, where Indian Army units mounted legendary resistance against the PLA.",
            "• Vibrant Villages Programme (VVP): Kibithu is a flagship border village under India's Centrally Sponsored Vibrant Villages Programme receiving roads, 4G telecommunications, and eco-tourism upgrades."
          ]),
        },
        {
          _key: "sec-kibithu-3",
          kind: "keyHighlights",
          title: "वार्ता के प्रमुख एजेंडा एवं भारत-चीन बीपीएम केंद्र",
          titleEn: "Core Agenda & India-China BPM Points",
          body: createBlocks([
            "• वाचा-दमाई बीपीएम केंद्र: वाचा-दमाई (Vacha-Damai) भारत-चीन सीमा पर स्थापित 5 आधिकारिक सीमा कार्मिक बैठक बिंदुओं (BPM Points) में से एक है।",
            "• भारत-चीन सीमा के 5 प्रमुख बीपीएम बिंदु:",
            "  1. चुशूल (Chushul) - लद्दाख सेक्टर",
            "  2. दौलत बेग ओल्डी (Daulat Beg Oldi - DBO) - लद्दाख सेक्टर",
            "  3. नाथू ला (Nathu La) - सिक्किम सेक्टर",
            "  4. बुम ला (Bum La) - तवांग, अरुणाचल प्रदेश",
            "  5. वाचा-दमाई (Vacha-Damai) - किबिथू, अरुणाचल प्रदेश",
            "• मुख्य बातचीत के मुद्दे: एलएसी पर गश्त संरेखण (Patrol Alignment) के दौरान किसी भी प्रत्यक्ष संघर्ष को रोकने, स्थानीय फ्लैग मीटिंग तंत्र को मजबूत करने और सीमा सुरक्षा संचार हॉटलाइन को सुदृढ़ बनाने पर सहमति बनी।"
          ]),
          bodyEn: createBlocks([
            "• Vacha-Damai BPM Significance: Vacha-Damai is one of 5 officially designated Border Personnel Meeting (BPM) points along the LAC.",
            "• 5 Official India-China BPM Points:",
            "  1. Chushul (Ladakh Sector)",
            "  2. Daulat Beg Oldi - DBO (Ladakh Sector)",
            "  3. Nathu La (Sikkim Sector)",
            "  4. Bum La (Tawang, Arunachal Pradesh)",
            "  5. Vacha-Damai (Kibithu, Arunachal Pradesh)",
            "• Operational Takeaways: Both sides agreed on maintaining local disengagement protocols, safeguarding patrol rights, establishing field hotlines, and holding regular tactical consultations."
          ]),
        },
        {
          _key: "sec-kibithu-4",
          kind: "syllabusInterlinking",
          title: "MPPSC एवं UPSC परीक्षा उपयोगी जुड़ाव",
          titleEn: "MPPSC & UPSC Syllabus Interlinking",
          body: createBlocks([
            "• MPPSC मुख्य परीक्षा: पेपर 2, खंड 'अ' (इकाई 5) - 'भारत की विदेश नीति, पड़ोसी देश तथा चीन संबंध' एवं पेपर 3 (इकाई 7) - 'राष्ट्रीय सुरक्षा एवं सीमा प्रबंधन'।",
            "• UPSC मुख्य परीक्षा: GS Paper 2 (अंतर्राष्ट्रीय संबंध एवं भारत-चीन द्विपक्षीय नीतियां) और GS Paper 3 (सीमावर्ती क्षेत्रों में सुरक्षा चुनौतियां)।",
            "• प्रारंभिक परीक्षा उपयोगी तथ्य: किबिथू (अरुणाचल प्रदेश), लोहित नदी, वाचा-दमाई बीपीएम बिंदु, और भारतीय सेना की पूर्वी कमान (मुख्यालय: फोर्ट विलियम, कोलकाता)।"
          ]),
          bodyEn: createBlocks([
            "• MPPSC Mains: Paper 2, Section A (Unit 5) - India's Foreign Policy and Relations with Neighboring Countries & Paper 3 (Unit 7) - National Security Framework.",
            "• UPSC Mains: GS Paper 2 (India and its Neighborhood Relations) & GS Paper 3 (Border Area Management & Security Challenges).",
            "• Prelims Quick Facts: Kibithu coordinates, Lohit river entry point, Vacha-Damai BPM point, and HQ of Indian Army's Eastern Command (Fort William, Kolkata)."
          ]),
        },
      ],
      faqs: [
        { _key: "f1", question: "किबिथू सेक्टर कहाँ स्थित है?", answer: "किबिथू भारत के अरुणाचल प्रदेश राज्य के अंजाव जिले में स्थित भारत का सबसे पूर्वी गांव व सैन्य सेक्टर है।", questionEn: "Where is Kibithu sector located?", answerEn: "Kibithu is India's easternmost village and military sector located in the Anjaw district of Arunachal Pradesh." },
        { _key: "f2", question: "वाचा-दमाई सीमा कार्मिक बिंदु (Vacha-Damai BPM) का क्या महत्व है?", answer: "यह अरुणाचल प्रदेश में वास्तविक नियंत्रण रेखा (LAC) पर स्थित भारत और चीन का आधिकारिक बॉर्डर पर्सोनेल मीटिंग पॉइंट है जहाँ सैन्य वार्ता आयोजित की जाती है।", questionEn: "What is the importance of Vacha-Damai BPM point?", answerEn: "It is an officially designated Border Personnel Meeting (BPM) point along the LAC in Arunachal Pradesh for military dialogue." },
        { _key: "f3", question: "किबिथू के पास कौन सी प्रमुख नदी भारत में प्रवेश करती है?", answer: "ब्रह्मपुत्र की प्रमुख सहायक नदी 'लोहित नदी' (Lohit River) किबिथू के पास से ही चीन (तिब्बत) से भारत में प्रवेश करती है।", questionEn: "Which major river enters India near Kibithu?", answerEn: "The Lohit River, a major tributary of the Brahmaputra, enters India from Tibet near Kibithu." },
        { _key: "f4", question: "भारत और चीन के बीच कुल कितने बीपीएम (BPM) केंद्र हैं?", answer: "भारत-चीन सीमा पर 5 प्रमुख बीपीएम बिंदु हैं: चुशूल व दौलत बेग ओल्डी (लद्दाख), बुम ला व वाचा-दमाई (अरुणाचल प्रदेश), तथा नाथू ला (सिक्किम)।", questionEn: "How many BPM points exist between India and China?", answerEn: "There are 5 official BPM points: Chushul & DBO (Ladakh), Bum La & Vacha-Damai (Arunachal Pradesh), and Nathu La (Sikkim)." },
        { _key: "f5", question: "किबिथू का 1962 के भारत-चीन युद्ध से क्या संबंध है?", answer: "1962 के युद्ध में किबिथू और वालोंग (Battle of Walong) में भारतीय सेना ने चीनी सेना के खिलाफ ऐतिहासिक और वीरतापूर्ण प्रतिरोध दर्ज किया था।", questionEn: "How is Kibithu connected to the 1962 Indo-China War?", answerEn: "Kibithu and Walong witnessed the historic Battle of Walong in 1962 where Indian forces mounted fierce resistance against the PLA." },
        { _key: "f6", question: "वाइब्रेंट विलेज प्रोग्राम (VVP) क्या है?", answer: "केंद्र सरकार की योजना जिसके तहत चीन सीमा से सटे किबिथू जैसे भारत के सीमावर्ती गांवों का बुनियादी व पर्यटन विकास किया जा रहा है।", questionEn: "What is the Vibrant Villages Programme (VVP)?", answerEn: "A Centrally Sponsored Scheme aimed at comprehensive development of border villages like Kibithu along the China border." },
      ],
      mcqs: [
        {
          _key: "m1",
          question: "हाल ही में भारत और चीन के बीच किबिथू सेक्टर के किस स्थान पर पहली बार कोर कमांडर स्तर की वार्ता आयोजित की गई?",
          questionEn: "At which location in the Kibithu sector were the first-ever Corps Commander-level talks between India and China held?",
          options: ["बुम ला (Bum La)", "वाचा-दमाई (Vacha-Damai)", "नाथू ला (Nathu La)", "चुशूल (Chushul)"],
          optionsEn: ["Bum La", "Vacha-Damai", "Nathu La", "Chushul"],
          correctIndex: 1,
          explanation: "अरुणाचल प्रदेश के किबिथू सेक्टर में स्थित वाचा-दमाई सीमा कार्मिक बैठक बिंदु (Vacha-Damai BPM) पर पहली बार कोर कमांडर स्तर की वार्ता आयोजित हुई।",
          explanationEn: "The Corps Commander talks took place at the Vacha-Damai Border Personnel Meeting point in Kibithu sector, Arunachal Pradesh.",
        },
        {
          _key: "m2",
          question: "भारत का सबसे पूर्वी स्थान 'किबिथू' मध्य प्रदेश व संघ लोक सेवा आयोग की दृष्टि से किस राज्य/केंद्रशासित प्रदेश में स्थित है?",
          questionEn: "In which State/UT is India's easternmost settlement 'Kibithu' situated?",
          options: ["सिक्किम", "असम", "अरुणाचल प्रदेश", "नागालैंड"],
          optionsEn: ["Sikkim", "Assam", "Arunachal Pradesh", "Nagaland"],
          correctIndex: 2,
          explanation: "किबिथू अरुणाचल प्रदेश के अंजाव जिले में स्थित भारत का सबसे पूर्वी गांव है।",
          explanationEn: "Kibithu is located in the Anjaw district of Arunachal Pradesh.",
        },
        {
          _key: "m3",
          question: "किबिथू क्षेत्र से होकर कौन सी प्रमुख नदी भारत में प्रवेश करती है?",
          questionEn: "Which river enters India through the Kibithu region?",
          options: ["सुबनसिरी नदी", "लोहित नदी", "दिबांग नदी", "तीस्ता नदी"],
          optionsEn: ["Subansiri River", "Lohit River", "Dibang River", "Teesta River"],
          correctIndex: 1,
          explanation: "लोहित नदी तिब्बत (चीन) से निकलकर किबिथू के पास भारत में प्रवेश करती है।",
          explanationEn: "Lohit River enters India from Tibet near Kibithu.",
        },
        {
          _key: "m4",
          question: "भारत-चीन वास्तविक नियंत्रण रेखा (LAC) पर स्थित निम्नलिखित में से कौन सा सीमा कार्मिक बैठक (BPM) बिंदु अरुणाचल प्रदेश में है?",
          questionEn: "Which of the following Border Personnel Meeting (BPM) points along the LAC is situated in Arunachal Pradesh?",
          options: ["दौलत बेग ओल्डी", "मोल्डो", "वाचा-दमाई", "नाथू ला"],
          optionsEn: ["Daulat Beg Oldi", "Moldo", "Vacha-Damai", "Nathu La"],
          correctIndex: 2,
          explanation: "वाचा-दमाई (Vacha-Damai) और बुम ला (Bum La) दोनों अरुणाचल प्रदेश में स्थित बीपीएम बिंदु हैं।",
          explanationEn: "Vacha-Damai and Bum La are located in Arunachal Pradesh.",
        },
        {
          _key: "m5",
          question: "भारत सरकार का 'वाइब्रेंट विलेज प्रोग्राम' (Vibrant Villages Programme) मुख्य रूप से किससे संबंधित है?",
          questionEn: "What is the primary objective of India's 'Vibrant Villages Programme'?",
          options: ["तटीय क्षेत्रों के विकास से", "उत्तरी सीमावर्ती गांवों के समग्र विकास से", "रेगिस्तानी इलाकों में सिंचाई से", "मेट्रो शहरों में कनेक्टिविटी से"],
          optionsEn: ["Coastal development", "Comprehensive development of northern border villages", "Desert irrigation", "Metro transit expansion"],
          correctIndex: 1,
          explanation: "यह कार्यक्रम चीन सीमा से सटे उत्तरी सीमावर्ती गांवों (जैसे किबिथू) के इंफ्रास्ट्रक्चर और आजीविका विकास के लिए शुरू किया गया है।",
          explanationEn: "It targets infrastructure and livelihood development of northern border villages along China border.",
        },
        {
          _key: "m6",
          question: "1962 के भारत-चीन युद्ध में किबिथू के निकट कौन सी प्रसिद्ध ऐतिहासिक लड़ाई लड़ी गई थी?",
          questionEn: "Which famous battle was fought near Kibithu during the 1962 Sino-Indian War?",
          options: ["वालोंग की लड़ाई (Battle of Walong)", "रेजांग ला की लड़ाई", "बोमडिला की लड़ाई", "द्रास की लड़ाई"],
          optionsEn: ["Battle of Walong", "Battle of Rezang La", "Battle of Bomdila", "Battle of Dras"],
          correctIndex: 0,
          explanation: "किबिथू के निकट वालोंग में 1962 का ऐतिहासिक 'बैटल ऑफ वालोंग' लड़ा गया था।",
          explanationEn: "The famous Battle of Walong was fought near Kibithu in 1962.",
        },
        {
          _key: "m7",
          question: "भारतीय सेना के पूर्वी कमान (Eastern Command) का मुख्यालय कहाँ स्थित है?",
          questionEn: "Where is the Headquarters of the Eastern Command of the Indian Army located?",
          options: ["गुवाहाटी", "शिलांग", "कोलकाता (फोर्ट विलियम)", "तेजपुर"],
          optionsEn: ["Guwahati", "Shillong", "Kolkata (Fort William)", "Tezpur"],
          correctIndex: 2,
          explanation: "भारतीय सेना की पूर्वी कमान का मुख्यालय कोलकाता (पश्चिम बंगाल) में स्थित है।",
          explanationEn: "Headquarters of Eastern Command is located at Fort William in Kolkata.",
        },
        {
          _key: "m8",
          question: "MPPSC मुख्य परीक्षा पेपर-2 के दृष्टिकोण से भारत-चीन संबंधों में तनाव कम करने का प्राथमिक कूटनीतिक साधन क्या कहलाता है?",
          questionEn: "In the context of India-China border relations, what are formal agreement measures to prevent conflict termed?",
          options: ["सशस्त्र हस्तक्षेप", "विश्वास निर्माण उपाय (Confidence-Building Measures - CBMs)", "आर्थिक नाकाबंदी", "सैन्य गठबंधन"],
          optionsEn: ["Armed Intervention", "Confidence-Building Measures (CBMs)", "Economic Blockade", "Military Alliance"],
          correctIndex: 1,
          explanation: "सीमा पर शांति बनाए रखने और संघर्ष रोकने के लिए सीबीएम (CBMs - Confidence Building Measures) का प्रयोग किया जाता है।",
          explanationEn: "Confidence-Building Measures (CBMs) are diplomatic and military protocols used to reduce tension along borders.",
        },
      ],
    },

    /* ═════════════════════════════════════════════════════════════════════════
       ARTICLE 2: Exercise Amogh Jwala
       ═════════════════════════════════════════════════════════════════════════ */
    {
      _id: "ca-exercise-amogh-jwala-2026",
      _type: "currentAffairs",
      slug: { _type: "slug", current: "exercise-amogh-jwala-2026-indian-army-uttar-pradesh" },
      title: "अमोघ ज्वाला अभ्यास 2026: उत्तर प्रदेश में भारतीय सेना का बड़ा सैन्य अभ्यास — MPPSC व UPSC विश्लेषण",
      titleEn: "Exercise Amogh Jwala 2026: Indian Army's Major Combat Drill in Uttar Pradesh — MPPSC & UPSC Analysis",
      excerpt: "भारतीय सेना की दक्षिणी एवं मध्य कमान द्वारा बबीना फील्ड फायरिंग रेंज (उत्तर प्रदेश) में 13 दिवसीय 'अमोघ ज्वाला अभ्यास' का सफल आयोजन किया गया। जानिए इसके प्रमुख सामरिक बिंदु व MPPSC/UPSC नोट्स।",
      excerptEn: "Indian Army successfully conducted the 13-day 'Exercise Amogh Jwala' at Babina Field Firing Range in Uttar Pradesh evaluating combat readiness and Shaurya drone squadrons. Read MPPSC & UPSC notes.",
      ca_date: "2026-09-08",
      publishedAt: new Date().toISOString(),
      featured: true,
      readingTime: 9,
      keywords: [
        "अमोघ ज्वाला अभ्यास",
        "Amogh Jwala Exercise",
        "भारतीय सेना अभ्यास",
        "उत्तर प्रदेश सैन्य अभ्यास",
        "बबीना फील्ड फायरिंग रेंज",
        "MPPSC Defence Current Affairs",
        "UPSC GS3 Security",
        "Shaurya Squadrons Indian Army",
      ],
      category: { _type: "reference", _ref: "cat-scitech" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [
        { _type: "reference", _ref: "tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc" },
        { _type: "reference", _ref: "tag-prelims" },
        { _type: "reference", _ref: "tag-mains" },
        { _type: "reference", _ref: "tag-national-affairs" },
      ],
      syllabus: ["MPPSC Mains Paper 3 Unit 7 Science & Tech", "UPSC GS-3 Defence Technology & Internal Security"],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetAmogh._id },
        alt: "Exercise Amogh Jwala Indian Army Combat Maneuver Drill in Uttar Pradesh",
      },
      sections: [
        {
          _key: "sec-amogh-1",
          kind: "whyInNews",
          title: "चर्चा में क्यों?",
          titleEn: "Why in News?",
          body: createBlocks([
            "भारतीय सेना द्वारा उत्तर प्रदेश के बबीना फील्ड फायरिंग रेंज (Babina Field Firing Ranges) में 13 दिवसीय बहु-आयामी युद्ध अभ्यास 'अमोघ ज्वाला' (Exercise Amogh Jwala) का सफल आयोजन किया गया।",
            "इस अभ्यास में थल सेना की दक्षिणी कमान (Southern Command) के कमांडर लेफ्टिनेंट जनरल धीरज सेठ की उपस्थिति में आधुनिक युद्ध तकनीकों, एकीकृत मारक क्षमता और बहु-स्तरीय रक्षा प्रणालियों का लाइव-फायर प्रदर्शन किया गया।"
          ]),
          bodyEn: createBlocks([
            "The Indian Army successfully executed a 13-day high-tempo multi-domain exercise named 'Exercise Amogh Jwala' at the Babina Field Firing Ranges in Uttar Pradesh.",
            "Witnessed by Lieutenant General Dhiraj Seth (GOC-in-C Southern Command), the exercise validated new operational concepts, technology-driven battlefield transparency, and integrated multi-domain fire synchronization."
          ]),
        },
        {
          _key: "sec-amogh-2",
          kind: "keyHighlights",
          title: "अभ्यास के प्रमुख सामरिक घटक एवं तकनीक परीक्षण",
          titleEn: "Key Tactical Components & Weapon Systems Tested",
          body: createBlocks([
            "• बबीना फील्ड फायरिंग रेंज: उत्तर प्रदेश के झांसी जिले में स्थित बबीना रेंज भारतीय सेना का बख्तरबंद (Armoured) और मैकेनाइज्ड इन्फैंट्री अभ्यासों का प्रमुख केंद्र है, जो मध्य प्रदेश के बुंदेलखंड (निवाड़ी/टीकमगढ़) से सटा हुआ है।",
            "• शौर्य स्क्वाड्रन (Shaurya Squadrons): इस अभ्यास की सबसे बड़ी विशेषता सेना के 'शौर्य स्क्वाड्रन' का परिचालन परीक्षण था, जो टैंक और बख्तरबंद रेजिमेंटों में ड्रोन सर्विलांस और सटीक मिसाइल हमलों का एकीकरण करता है।",
            "• एकीकृत मारक क्षमता: T-90 'भीष्म' और T-72 टैंकों, BMP-2 कॉम्बैट वाहनों, एपाचे (Apache) अटैक हेलीकॉप्टरों और तोपखाने का एक साथ सटीक लाइव-फायर समन्वय।",
            "• लॉइटरिंग म्यूनिशन व एंटी-ड्रोन सिस्टम: स्वदेशी आत्मघाती ड्रोन (Kamikaze Drones) तथा इलेक्ट्रॉनिक वॉरफेयर (EW) द्वारा शत्रुतापूर्ण ड्रोनों को हवा में ही निष्क्रिय करने की क्षमता का परीक्षण किया गया।"
          ]),
          bodyEn: createBlocks([
            "• Babina Firing Ranges: Situated near Jhansi (UP/MP border), Babina is India's premier firing range for heavy armor and mechanized infantry drills.",
            "• Shaurya Squadrons Deployment: Highlighted the employment of 'Shaurya Squadrons' designed to embed drone-led real-time surveillance and precision strikes directly into tank regiments.",
            "• Combined Arms Firepower: Synchronized maneuvers involving T-90 Bhishma & T-72 main battle tanks, BMP-2 ICVs, Apache attack helicopters, and heavy field artillery.",
            "• Loitering Munitions & Electronic Warfare: Tested indigenous suicide/kamikaze drones alongside radio-frequency anti-drone jamming arrays."
          ]),
        },
        {
          _key: "sec-amogh-3",
          kind: "background",
          title: "मध्य प्रदेश से सामरिक संबंध एवं कमान संरचना",
          titleEn: "Strategic Connection with Madhya Pradesh & Army Commands",
          body: createBlocks([
            "• मध्य प्रदेश में सैन्य केंद्र: मध्य प्रदेश की राजधानी भोपाल में भारतीय सेना की 21 स्ट्राइक कोर (सुदर्शन चक्र कोर - Sudarshan Chakra Corps) का मुख्यालय स्थित है।",
            "• इंदौर (महू Cantonment): इंदौर जिले के महू में प्रतिष्ठित इन्फैंट्री स्कूल, आर्मी वॉर कॉलेज (Army War College) और मिलिट्री कॉलेज ऑफ टेलीकम्युनिकेशन इंजीनियरिंग (MCTE) स्थित हैं।",
            "• जबलपुर सैन्य केंद्र: जबलपुर में 506 आर्मी वर्कशॉप, सिग्नल कोर और ऑर्डनेंस फैक्ट्री (खमरिया व व्हीकल फैक्ट्री) स्थापित हैं।",
            "• सेना की 7 कमान: भारतीय सेना में 6 क्षेत्रीय परिचालन कमान (जैसे मध्य कमान - लखनऊ, दक्षिणी कमान - पुणे) और 1 प्रशिक्षण कमान (ARTRAC - शिमला) कार्यरत हैं।"
          ]),
          bodyEn: createBlocks([
            "• MP Military Establishments: Bhopal houses the HQ of the Indian Army's 21 Strike Corps (Sudarshan Chakra Corps).",
            "• Mhow (Indore District): Mhow is home to the Army Infantry School, Army War College, and Military College of Telecommunication Engineering (MCTE).",
            "• Jabalpur Defence Hub: Houses 506 Army Workshop, Signal Corps training facility, and Ordnance Factory Khamaria.",
            "• 7 Army Commands: The Indian Army operates 6 regional operational commands (Central HQ Lucknow, Southern HQ Pune) and 1 Training Command (ARTRAC Shimla)."
          ]),
        },
        {
          _key: "sec-amogh-4",
          kind: "syllabusInterlinking",
          title: "MPPSC एवं UPSC परीक्षा जुड़ाव",
          titleEn: "MPPSC & UPSC Syllabus Interlinking",
          body: createBlocks([
            "• MPPSC मुख्य परीक्षा: पेपर 3 (इकाई 7) - 'विज्ञान एवं प्रौद्योगिकी, रक्षा प्रौद्योगिकी, रक्षा तकनीक का स्वदेशीकरण' तथा पेपर 2 - 'राष्ट्रीय सुरक्षा'।",
            "• UPSC मुख्य परीक्षा: GS Paper 3 - 'सुरक्षा चुनौतियां, थिएटर कमान, इलेक्ट्रॉनिक वॉरफेयर व सैन्य अभ्यास'।",
            "• प्रारंभिक परीक्षा तथ्य: बबीना रेंज (झांसी), सुदर्शन चक्र कोर (भोपाल), इन्फैंट्री स्कूल (महू, इंदौर), और लॉइटरिंग म्यूनिशन का अर्थ।"
          ]),
          bodyEn: createBlocks([
            "• MPPSC Mains: Paper 3 (Unit 7) - Defence Technology, Indigenization of Weapons & Modern Security Architecture.",
            "• UPSC Mains: GS Paper 3 - Security Challenges, Integrated Theatre Commands & Electronic Warfare Capabilities.",
            "• Prelims Quick Facts: Babina Ranges, Sudarshan Chakra Corps (Bhopal), Army War College (Mhow), and Loitering Munition mechanisms."
          ]),
        },
      ],
      faqs: [
        { _key: "f1", question: "अमोघ ज्वाला अभ्यास किस सेना द्वारा आयोजित किया गया?", answer: "यह अभ्यास भारतीय सेना (Indian Army) की दक्षिणी व मध्य कमान द्वारा उत्तर प्रदेश में आयोजित किया गया।", questionEn: "Which defense force conducted Exercise Amogh Jwala?", answerEn: "Exercise Amogh Jwala was conducted by the Indian Army in Uttar Pradesh." },
        { _key: "f2", question: "अमोघ ज्वाला अभ्यास कहाँ आयोजित किया गया था?", answer: "यह अभ्यास उत्तर प्रदेश के झांसी जिले में स्थित बबीना फील्ड फायरिंग रेंज (Babina Field Firing Ranges) में आयोजित हुआ।", questionEn: "Where was Exercise Amogh Jwala conducted?", answerEn: "At the Babina Field Firing Ranges in Jhansi district, Uttar Pradesh." },
        { _key: "f3", question: "सेना के 'शौर्य स्क्वाड्रन' (Shaurya Squadrons) की क्या भूमिका है?", answer: "शौर्य स्क्वाड्रन बख्तरबंद टैंक रेजिमेंटों में ड्रोन सर्विलांस और सटीक मिसाइल हमलों को एकीकृत करने वाली समर्पित इकाइयां हैं।", questionEn: "What is the operational role of Shaurya Squadrons?", answerEn: "Shaurya Squadrons integrate drone surveillance and precision strikes directly into tank regiments." },
        { _key: "f4", question: "मध्य प्रदेश के किस शहर में भारतीय सेना की 21 स्ट्राइक कोर स्थित है?", answer: "मध्य प्रदेश की राजधानी भोपाल में भारतीय सेना की '21 स्ट्राइक कोर' (सुदर्शन चक्र कोर) का मुख्यालय स्थित है।", questionEn: "Which MP city houses the 21 Strike Corps HQ?", answerEn: "Bhopal, Madhya Pradesh houses the Sudarshan Chakra Corps (21 Corps) HQ." },
        { _key: "f5", question: "लॉइटरिंग म्यूनिशन (Loitering Munitions) क्या होते हैं?", answer: "ये ऐसे कामिकेज़ आत्मघाती ड्रोन होते हैं जो लक्ष्य क्षेत्र के ऊपर मंडराते हैं और लक्ष्य की पहचान होते ही उस पर हमला करके नष्ट हो जाते हैं।", questionEn: "What are Loitering Munitions?", answerEn: "Also known as suicide/kamikaze drones, they hover around a target area and strike directly upon identifying the target." },
        { _key: "f6", question: "महू (Mhow) सैन्य छावनी किस जिले में स्थित है?", answer: "महू (डॉ. अम्बेडकर नगर) मध्य प्रदेश के इंदौर जिले में स्थित एक प्रमुख सैन्य छावनी और इन्फैंट्री स्कूल है।", questionEn: "In which district is Mhow Cantonment located?", answerEn: "Mhow (Dr. Ambedkar Nagar) is located in Indore district, Madhya Pradesh." },
      ],
      mcqs: [
        {
          _key: "m1",
          question: "हाल ही में 13 दिवसीय 'अमोघ ज्वाला अभ्यास' का आयोजन भारतीय सेना द्वारा कहाँ किया गया?",
          questionEn: "Where was the 13-day 'Exercise Amogh Jwala' recently conducted by the Indian Army?",
          options: ["पोकरण रेंज (राजस्थान)", "बबीना फील्ड फायरिंग रेंज (उत्तर प्रदेश)", "महू कैंट (मध्य प्रदेश)", "अहमदनगर (महाराष्ट्र)"],
          optionsEn: ["Pokhran Ranges", "Babina Field Firing Ranges (UP)", "Mhow Cantt (MP)", "Ahmednagar (Maharashtra)"],
          correctIndex: 1,
          explanation: "अमोघ ज्वाला अभ्यास भारतीय सेना द्वारा उत्तर प्रदेश के बबीना फील्ड फायरिंग रेंज में आयोजित किया गया।",
          explanationEn: "Exercise Amogh Jwala took place at Babina Field Firing Ranges in Uttar Pradesh.",
        },
        {
          _key: "m2",
          question: "टैंक रेजिमेंटों में ड्रोन सर्विलांस और सटीक हमले को एकीकृत करने हेतु भारतीय सेना द्वारा गठित विशेष स्क्वाड्रन का नाम क्या है?",
          questionEn: "What is the name of the Army's specialized squadrons integrating drone surveillance into tank regiments?",
          options: ["गरुड़ स्क्वाड्रन", "शौर्य स्क्वाड्रन (Shaurya Squadrons)", "अग्नि स्क्वाड्रन", "वज्र स्क्वाड्रन"],
          optionsEn: ["Garud Squadrons", "Shaurya Squadrons", "Agni Squadrons", "Vajra Squadrons"],
          correctIndex: 1,
          explanation: "अमोघ ज्वाला अभ्यास में सेना के 'शौर्य स्क्वाड्रन' के परिचालन कौशल का प्रदर्शन किया गया।",
          explanationEn: "Shaurya Squadrons embed drone capabilities into armored regiments.",
        },
        {
          _key: "m3",
          question: "मध्य प्रदेश के किस शहर में भारतीय सेना की 'सुदर्शन चक्र' (21 स्ट्राइक कोर) का मुख्यालय स्थित है?",
          questionEn: "In which MP city is the Headquarters of Sudarshan Chakra Corps (21 Corps) located?",
          options: ["इंदौर", "ग्वालियर", "भोपाल", "जबलपुर"],
          optionsEn: ["Indore", "Gwalior", "Bhopal", "Jabalpur"],
          correctIndex: 2,
          explanation: "21 स्ट्राइक कोर (सुदर्शन चक्र कोर) का मुख्यालय भोपाल, मध्य प्रदेश में स्थित है।",
          explanationEn: "Sudarshan Chakra Corps (21 Corps) HQ is located in Bhopal, MP.",
        },
        {
          _key: "m4",
          question: "सैन्य शब्दावली में 'लॉइटरिंग म्यूनिशन' (Loitering Munition) का क्या तात्पर्य है?",
          questionEn: "In military terminology, what does 'Loitering Munition' mean?",
          options: ["बैलिस्टिक मिसाइल", "आत्मघाती हमलावर ड्रोन (Kamikaze Drone)", "पनडुब्बी रोधी टॉरपीडो", "एंटी-एयरक्राफ्ट गन"],
          optionsEn: ["Ballistic Missile", "Kamikaze / Suicide Drone", "Anti-submarine Torpedo", "Anti-aircraft Gun"],
          correctIndex: 1,
          explanation: "लॉइटरिंग म्यूनिशन ऐसे ड्रोन होते हैं जो हवा में मंडराकर लक्ष्य पर आत्मघाती सटीक हमला करते हैं।",
          explanationEn: "Loitering munitions hover over targets and act as kamikaze strike weapons.",
        },
        {
          _key: "m5",
          question: "भारतीय सेना के इन्फैंट्री स्कूल और आर्मी वॉर कॉलेज मध्य प्रदेश के किस जिले में स्थित हैं?",
          questionEn: "The Infantry School and Army War College are situated in which district of MP?",
          options: ["जबलपुर", "इंदौर (महू)", "सागर", "रीवा"],
          optionsEn: ["Jabalpur", "Indore (Mhow)", "Sagar", "Rewa"],
          correctIndex: 1,
          explanation: "आर्मी वॉर कॉलेज और इन्फैंट्री स्कूल इंदौर जिले के महू (डॉ. अम्बेडकर नगर) में स्थित हैं।",
          explanationEn: "Army War College and Infantry School are located in Mhow, Indore district, MP.",
        },
        {
          _key: "m6",
          question: "MPPSC मुख्य परीक्षा पेपर-3 में 'रक्षा प्रौद्योगिकी' किस इकाई (Unit) का हिस्सा है?",
          questionEn: "Under which Unit of MPPSC Mains Paper 3 is 'Defence Technology' included?",
          options: ["इकाई 1", "इकाई 4", "इकाई 7", "इकाई 10"],
          optionsEn: ["Unit 1", "Unit 4", "Unit 7", "Unit 10"],
          correctIndex: 2,
          explanation: "MPPSC मुख्य परीक्षा के संशोधित पाठ्यक्रम में पेपर-3 की इकाई 7 में विज्ञान, प्रौद्योगिकी और रक्षा तकनीक शामिल है।",
          explanationEn: "Defence technology and science & tech are prescribed under Unit 7 of MPPSC Mains Paper 3.",
        },
        {
          _key: "m7",
          question: "अमोघ ज्वाला अभ्यास के दौरान भारतीय सेना की किस परिचालन कमान (Command) के कमांडर उपस्थित थे?",
          questionEn: "Which Army Command Commander witnessed the culmination of Exercise Amogh Jwala?",
          options: ["पूर्वी कमान", "दक्षिणी कमान (Southern Command)", "पश्चिमी कमान", "उत्तरी कमान"],
          optionsEn: ["Eastern Command", "Southern Command", "Western Command", "Northern Command"],
          correctIndex: 1,
          explanation: "दक्षिणी कमान के जीओसी-इन-सी लेफ्टिनेंट जनरल धीरज सेठ ने बबीना में अभ्यास की समीक्षा की।",
          explanationEn: "Lt. Gen. Dhiraj Seth (GOC-in-C Southern Command) reviewed the exercise.",
        },
        {
          _key: "m8",
          question: "भारतीय सेना में कुल कितनी भौगोलिक और परिचालन कमान (Commands) कार्यरत हैं?",
          questionEn: "How many operational and training commands currently exist in the Indian Army?",
          options: ["5 कमान", "6 परिचालन + 1 प्रशिक्षण = 7 कमान", "10 कमान", "12 कमान"],
          optionsEn: ["5 Commands", "6 Operational + 1 Training = 7 Commands", "10 Commands", "12 Commands"],
          correctIndex: 1,
          explanation: "भारतीय सेना में कुल 7 कमान हैं (6 क्षेत्रीय परिचालन कमान और 1 आर्मी ट्रेनिंग कमान ARTRAC शिमला)।",
          explanationEn: "The Indian Army operates 6 regional operational commands and 1 training command (ARTRAC).",
        },
      ],
    },

    /* ═════════════════════════════════════════════════════════════════════════
       ARTICLE 3: India's First Drone Battalion in Punjab
       ═════════════════════════════════════════════════════════════════════════ */
    {
      _id: "ca-indias-first-drone-battalion-punjab-2026",
      _type: "currentAffairs",
      slug: { _type: "slug", current: "indias-first-drone-battalion-punjab-2026" },
      title: "भारत की पहली ड्रोन बटालियन 'बाज़' (पंजाब) | MPPSC & UPSC",
      titleEn: "India's First Drone Battalion 'Baaz' in Punjab | MPPSC & UPSC",
      excerpt: "भारतीय सेना ने पंजाब (जालंधर/वज्र कोर) में भारत की पहली समर्पित ड्रोन बटालियन 'बाज़' (Baaz) की स्थापना की। ड्रोन वॉरफेयर, BSF सीमा सुरक्षा एवं MPPSC & UPSC परीक्षा नोट्स।",
      excerptEn: "Indian Army raises India's first dedicated Drone Battalion 'Baaz' under Vajra Corps in Punjab (Jalandhar). Key facts, border surveillance & MPPSC/UPSC study notes.",
      ca_date: "2026-09-08",
      publishedAt: new Date().toISOString(),
      featured: true,
      readingTime: 9,
      keywords: [
        "देश की पहली ड्रोन बटालियन",
        "पंजाब ड्रोन बटालियन",
        "First Drone Battalion India",
        "Drone Security Punjab Border",
        "MPPSC Defence & Tech",
        "UPSC Internal Security Drones",
        "Counter Drone Technology India",
        "BSF Drone Countermeasures",
      ],
      category: { _type: "reference", _ref: "cat-scitech" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [
        { _type: "reference", _ref: "tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc" },
        { _type: "reference", _ref: "tag-prelims" },
        { _type: "reference", _ref: "tag-mains" },
        { _type: "reference", _ref: "tag-scitech" },
      ],
      syllabus: ["MPPSC Mains Paper 3 Unit 7 Science & Tech", "UPSC GS-3 Cyber & Internal Security", "Prelims Science Special"],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetDrone._id },
        alt: "India's First Drone Battalion Operations along Punjab International Border",
      },
      sections: [
        {
          _key: "sec-drone-1",
          kind: "whyInNews",
          title: "चर्चा में क्यों?",
          titleEn: "Why in News?",
          body: createBlocks([
            "सीमावर्ती राज्य पंजाब में पाकिस्तान सीमा से होने वाली अवैध ड्रोन घुसपैठ, नशीले पदार्थों (ड्रग्स) व हथियारों की तस्करी से निपटने तथा आधुनिक रक्षा ड्रोनों की लाइव सीमा टेस्टिंग के लिए देश की पहली समर्पित 'ड्रोन बटालियन' (India's First Drone Battalion) का गठन किया गया है।",
            "यह बटालियन भारतीय सेना और सीमा सुरक्षा बल (BSF) के संयुक्त समन्वय में काम करेगी और मानवरहित हवाई प्रणालियों (UAS) तथा काउंटर-ड्रोन तकनीक (Anti-Drone Technology) के संचालन का प्रमुख केंद्र बनेगी।"
          ]),
          bodyEn: createBlocks([
            "To counter cross-border illegal drone incursions carrying contraband and weapons, India's first dedicated Drone Battalion has been raised in Punjab along the 553 km India-Pakistan border.",
            "Operating under joint Army and Border Security Force (BSF) protocols, this unit serves as a operational hub for Unmanned Aerial Systems (UAS) and counter-drone warfare."
          ]),
        },
        {
          _key: "sec-drone-2",
          kind: "keyHighlights",
          title: "बटालियन के तकनीकी घटक एवं काउंटर-ड्रोन उपाय",
          titleEn: "Technical Components & Counter-Drone Warfare",
          body: createBlocks([
            "• 553 किमी सीमा निगरानी: पंजाब से लगी 553 किलोमीटर लंबी अंतरराष्ट्रीय सीमा पर रात के समय उड़ान भरने वाले छोटे और नैनो ड्रोनों की स्वचालित ट्रैकिंग।",
            "• D4 एंटी-ड्रोन सिस्टम: DRDO द्वारा विकसित D4 सिस्टम (Drone Detection, Deterrence and Destruction System) का उपयोग करके रेडियो फ्रीक्वेंसी (RF) जैमिंग और जीपीएस स्पूफिंग द्वारा ड्रोनों को मार गिराना।",
            "• स्वदेशी रक्षा स्टार्टअप्स का टेस्टबेड: भारतीय रक्षा स्टार्टअप्स द्वारा निर्मित लॉजिस्टिक्स डिलीवरी ड्रोन और हेवी-पेलोड ड्रोनों का वास्तविक सीमा परिस्थितियों में परीक्षण किया जाएगा।",
            "• एआई-आधारित नाइट विज़न: ड्रोनों में आर्टिफ़िशियल इंटेलिजेंस (AI) और थर्मल इमेजिंग कैमरों का उपयोग कर घने कोहरे व रात में भी घुसपैठ का सटीक पता लगाना।"
          ]),
          bodyEn: createBlocks([
            "• 553 km Border Perimeter Coverage: Continuous day and night automated tracking of hostile UAVs across the Punjab international border.",
            "• D4 Anti-Drone System: Deployment of DRDO's D4 System (Drone Detection, Deterrence and Destruction) using RF jamming and GPS spoofing.",
            "• Defense Startup Testbed: Serves as a live proving ground for Indian defense startups building combat and logistics multi-copter drones.",
            "• AI-Enabled Night Vision: Thermal cameras coupled with AI algorithms for detecting human and drone intrusions in dense fog."
          ]),
        },
        {
          _key: "sec-drone-3",
          kind: "background",
          title: "ड्रोन नियम 2021 एवं मध्य प्रदेश में ड्रोन तकनीक का उपयोग",
          titleEn: "Drone Rules 2021 & Drone Applications in Madhya Pradesh",
          body: createBlocks([
            "• भारत में ड्रोन नियम 2021: नागरिक उड्डयन मंत्रालय द्वारा जारी 'ड्रोन नियम 2021' (Drone Rules 2021) के तहत ड्रोनों को 5 श्रेणियों में वर्गीकृत किया गया है: नैनो (≤250g), माइक्रो (>250g से 2kg), स्मॉल (>2kg से 25kg), मीडियम (>25kg से 150kg), तथा लार्ज (>150kg)।",
            "• डिजिटल स्काई प्लेटफॉर्म: भारत के हवाई क्षेत्र को ग्रीन, येलो और रेड ज़ोन में विभाजित कर नो-फ्लाई ज़ोन में ड्रोन उड़ान को नियंत्रित करता है।",
            "• मध्य प्रदेश में 'स्वामित्व योजना': मध्य प्रदेश भारत का पहला राज्य है जिसने 'स्वामित्व योजना' (SVAMITVA Scheme) के तहत राज्य के 50,000+ गांवों में ग्रामीण आवासीय संपत्तियों का ड्रोन मैपिंग द्वारा डिजिटल अधिकार अभिलेख प्रस्तुत किया है।",
            "• कृषि एवं आपदा प्रबंधन में ड्रोन: MP में फसलों पर कीटनाशक छिड़काव, बाढ़ आपदा सर्विलांस और ग्वालियर व इंदौर में 'ड्रोन स्कूल' (Drone Schools) की स्थापना की गई है।"
          ]),
          bodyEn: createBlocks([
            "• Drone Rules 2021 Categories: Governed by Civil Aviation Ministry into 5 weight tiers: Nano (≤250g), Micro (250g–2kg), Small (2kg–25kg), Medium (25kg–150kg), and Large (>150kg).",
            "• DigitalSky Platform: Manages airspace zoning into Green, Yellow, and Red zones across India.",
            "• SVAMITVA Scheme in MP: Madhya Pradesh pioneered 100% rural property survey mapping using drones under the SVAMITVA Scheme.",
            "• Civil Applications in MP: Agricultural pesticide spraying, flood relief assessment, and establishing dedicated Drone Schools in Gwalior and Indore."
          ]),
        },
        {
          _key: "sec-drone-4",
          kind: "syllabusInterlinking",
          title: "MPPSC एवं UPSC परीक्षा जुड़ाव",
          titleEn: "MPPSC & UPSC Syllabus Interlinking",
          body: createBlocks([
            "• MPPSC मुख्य परीक्षा: पेपर 3 (इकाई 7) - 'ड्रोन तकनीक, रोबोटिक्स, आईटी अनुप्रयोग' एवं पेपर 2 - 'राष्ट्रीय सुरक्षा व सीमावर्ती चुनौतियां'।",
            "• UPSC मुख्य परीक्षा: GS Paper 3 - 'सीमावर्ती क्षेत्रों में सुरक्षा चुनौतियां, संगठित अपराध और गैर-राज्य कलाकारों (Non-State Actors) द्वारा आधुनिक तकनीक का दुरुपयोग'।",
            "• प्रारंभिक परीक्षा तथ्य: देश की पहली ड्रोन बटालियन (पंजाब), D4 सिस्टम (DRDO), नैनो ड्रोन वजन सीमा (250 ग्राम), और MP के ड्रोन स्कूल।"
          ]),
          bodyEn: createBlocks([
            "• MPPSC Mains: Paper 3 (Unit 7) - Drone Technology Applications, Robotics & IT in Defence + Paper 2 - National Security.",
            "• UPSC Mains: GS Paper 3 - Security Challenges in Border Areas, Non-State Actors & Emerging Technology Threats.",
            "• Prelims Quick Facts: India's first Drone Battalion (Punjab), D4 System (DRDO), Nano Drone limit (250g), and MP Drone Schools."
          ]),
        },
      ],
      faqs: [
        { _key: "f1", question: "देश की पहली ड्रोन बटालियन किस राज्य में स्थापित की गई है?", answer: "देश की पहली ड्रोन बटालियन सीमावर्ती राज्य पंजाब में स्थापित की गई है।", questionEn: "In which state has India's first Drone Battalion been set up?", answerEn: "India's first Drone Battalion has been established in the border state of Punjab." },
        { _key: "f2", question: "ड्रोन बटालियन का प्राथमिक कार्य क्या होगा?", answer: "सीमापार से होने वाली ड्रोन तस्करी (ड्रग्स व हथियार) को रोकना, रात में सर्विलांस करना और नए स्वदेशी ड्रोनों का परीक्षण करना।", questionEn: "What is the primary operational role of the Drone Battalion?", answerEn: "To counter cross-border illegal drone incursions, execute 24/7 surveillance, and test indigenously developed defence UAVs." },
        { _key: "f3", question: "एंटी-ड्रोन सिस्टम (Anti-Drone System) कैसे कार्य करता है?", answer: "एंटी-ड्रोन सिस्टम रेडियो फ्रीक्वेंसी जैमिंग, लेजर डिसेबलिंग या काइनेटिक इंटरसेप्टर नेट के माध्यम से शत्रुतापूर्ण ड्रोनों को नष्ट या निष्क्रिय करता है।", questionEn: "How does an Anti-Drone System work?", answerEn: "It detects, tracks, and neutralizes rogue drones using RF jamming, spoofing, high-energy lasers, or net catchers." },
        { _key: "f4", question: "भारत में नागरिक ड्रोन उड़ानों को विनियमित करने वाला प्रमुख नियम कौन सा है?", answer: "नागरिक उड्डयन मंत्रालय द्वारा जारी 'ड्रोन नियम 2021' (Drone Rules 2021) और 'डिजिटल स्काई प्लेटफॉर्म'।", questionEn: "Which regulation governs civilian drone operations in India?", answerEn: "The Drone Rules 2021 administered by the Ministry of Civil Aviation via the DigitalSky Platform." },
        { _key: "f5", question: "मध्य प्रदेश में ड्रोन तकनीक का प्रमुख उपयोग किस सरकारी योजना में हो रहा है?", answer: "मध्य प्रदेश में 'स्वामित्व योजना' (SVAMITVA Scheme) के तहत ग्रामीण भूमि के नक्शे तैयार करने के लिए ड्रोन सर्वेक्षण का व्यापक उपयोग हुआ है।", questionEn: "In which major scheme is drone tech extensively used in MP?", answerEn: "The SVAMITVA Scheme, where drone mapping is used to create digital property cards for rural households across Madhya Pradesh." },
        { _key: "f6", question: "ड्रोन की कुल कितनी श्रेणियां (Categories) ड्रोन नियम 2021 में वर्गीकृत हैं?", answer: "कुल 5 श्रेणियां: नैनो (Nano ≤ 250g), माइक्रो (Micro > 250g to 2kg), स्मॉल (Small > 2kg to 25kg), मीडियम (Medium > 25kg to 150kg), और लार्ज (Large > 150kg)।", questionEn: "What are the 5 weight categories of drones in Drone Rules 2021?", answerEn: "Nano (≤250g), Micro (250g–2kg), Small (2kg–25kg), Medium (25kg–150kg), and Large (>150kg)." },
      ],
      mcqs: [
        {
          _key: "m1",
          question: "भारत में आधुनिक टेस्टिंग और सीमा सुरक्षा को बढ़ावा देने के लिए देश की पहली ड्रोन बटालियन कहाँ शुरू की गई है?",
          questionEn: "Where has India's first dedicated Drone Battalion been initiated for advanced testing and border security?",
          options: ["राजस्थान", "पंजाब", "जम्मू-कश्मीर", "गुजरात"],
          optionsEn: ["Rajasthan", "Punjab", "Jammu & Kashmir", "Gujarat"],
          correctIndex: 1,
          explanation: "पंजाब राज्य में देश की पहली ड्रोन बटालियन की शुरुआत की गई है।",
          explanationEn: "India's first Drone Battalion was launched in Punjab.",
        },
        {
          _key: "m2",
          question: "भारत सरकार के उड्डयन नियमों के अनुसार 250 ग्राम या उससे कम वजन वाले ड्रोन को किस श्रेणी में रखा जाता है?",
          questionEn: "According to Drone Rules 2021, drones weighing 250 grams or less are classified under which category?",
          options: ["नैनो ड्रोन (Nano Drone)", "माइक्रो ड्रोन", "स्मॉल ड्रोन", "लार्ज ड्रोन"],
          optionsEn: ["Nano Drone", "Micro Drone", "Small Drone", "Large Drone"],
          correctIndex: 0,
          explanation: "250 ग्राम या उससे कम वजन के ड्रोनों को 'नैनो ड्रोन' श्रेणी में वर्गीकृत किया जाता है।",
          explanationEn: "Drones weighing 250g or less are classified as Nano Drones.",
        },
        {
          _key: "m3",
          question: "मध्य प्रदेश में ग्रामीण संपत्तियों के सटीक सीमांकन हेतु ड्रोन सर्वेक्षण किस योजना के तहत संचालित किया गया?",
          questionEn: "Under which scheme was drone-based mapping conducted for rural property boundary demarcation in MP?",
          options: ["स्वामित्व योजना (SVAMITVA Scheme)", "पीएम किसान योजना", "स्मार्ट सिटी मिशन", "डिजिटल इंडिया मिशन"],
          optionsEn: ["SVAMITVA Scheme", "PM Kisan Scheme", "Smart Cities Mission", "Digital India Mission"],
          correctIndex: 0,
          explanation: "स्वामित्व योजना के तहत ग्रामीण इलाकों में संपत्तियों का ड्रोन मैपिंग के माध्यम से डिजिटल रिकॉर्ड तैयार किया जाता है।",
          explanationEn: "SVAMITVA Scheme utilizes drone mapping for rural property validation.",
        },
        {
          _key: "m4",
          question: "रेडियो फ्रीक्वेंसी (RF) जैमिंग द्वारा अवैध ड्रोनों के नेविगेशन को बाधित करने वाली प्रणाली क्या कहलाती है?",
          questionEn: "A defense technology that disrupts illegal drone navigation using Radio Frequency jamming is called:",
          options: ["रेडार जैमर", "एंटी-ड्रोन सिस्टम (Anti-Drone System)", "सोनार डिटेक्टर", "जीपीएस स्पूफर"],
          optionsEn: ["Radar Jammer", "Anti-Drone System", "Sonar Detector", "GPS Spoofer"],
          correctIndex: 1,
          explanation: "एंटी-ड्रोन प्रणालियां आरएफ जैमिंग के जरिए अवैध ड्रोनों के सिग्नल तोड़कर उन्हें निष्क्रिय करती हैं।",
          explanationEn: "Anti-drone systems disrupt RF control signals to neutralize rogue drones.",
        },
        {
          _key: "m5",
          question: "नागरिक उड्डयन मंत्रालय द्वारा ड्रोन उड़ानों की अनुमति और रजिस्ट्रेशन के लिए कौन सा डिजिटल पोर्टल शुरू किया गया है?",
          questionEn: "Which portal is launched by the Civil Aviation Ministry for drone flight registration and airspace zoning?",
          options: ["गरुड़ पोर्टल", "डिजिटल स्काई प्लेटफॉर्म (DigitalSky Platform)", "ड्रोन सेवा पोर्टल", "सुरक्षा स्काई"],
          optionsEn: ["Garud Portal", "DigitalSky Platform", "Drone Seva Portal", "Suraksha Sky"],
          correctIndex: 1,
          explanation: "डिजिटल स्काई (DigitalSky Platform) भारत में ड्रोन रजिस्ट्रेशन और ग्रीन/येलो/रेड एयरस्पेस ज़ोन प्रबंधन का आधिकारिक पोर्टल है।",
          explanationEn: "DigitalSky Platform manages airspace zoning and drone registration in India.",
        },
        {
          _key: "m6",
          question: "डीआरडीओ (DRDO) द्वारा निर्मित स्वदेशी एंटी-ड्रोन प्रणाली का नाम क्या है?",
          questionEn: "What is the name of the indigenous anti-drone system developed by DRDO?",
          options: ["D4 सिस्टम (Drone De-Addiction and Detection System)", "इंद्रजाल (Indrajaal)", "अग्नि अस्त्र", "वज्र ड्रोन"],
          optionsEn: ["D4 System", "Indrajaal", "Agni Astra", "Vajra Drone"],
          correctIndex: 0,
          explanation: "DRDO ने 'D4 System' (Drone Detection, Deterrence and Destruction System) विकसित किया है।",
          explanationEn: "DRDO developed the D4 anti-drone countermeasure system.",
        },
        {
          _key: "m7",
          question: "ड्रोन निर्माण और घटकों (Components) के संवर्धन हेतु भारत सरकार द्वारा कौन सी प्रोत्साहन योजना लागू की गई है?",
          questionEn: "Which incentive scheme was introduced by the Indian Government to boost domestic drone manufacturing?",
          options: ["PLI योजना (Production Linked Incentive for Drones)", "FAME इंडिया योजना", "मुद्रा योजना", "मेक इन एमपी"],
          optionsEn: ["PLI Scheme for Drones", "FAME India Scheme", "Mudra Scheme", "Make in MP"],
          correctIndex: 0,
          explanation: "ड्रोन व ड्रोन घटकों के लिए उत्पादन से जुड़ी प्रोत्साहन योजना (PLI Scheme) लागू की गई है।",
          explanationEn: "The PLI Scheme incentivizes domestic manufacturing of drones and components.",
        },
        {
          _key: "m8",
          question: "MPPSC परीक्षा की दृष्टि से 'दोहरे उपयोग वाली तकनीक' (Dual-Use Technology) का सर्वोत्कृष्ट उदाहरण क्या है?",
          questionEn: "From an MPPSC exam perspective, what is a prime example of 'Dual-Use Technology'?",
          options: ["परमाणु हथियार", "ड्रोन तकनीक (Drone Technology)", "भाप का इंजन", "पारंपरिक तोपखाना"],
          optionsEn: ["Nuclear Weapons", "Drone Technology", "Steam Engine", "Conventional Artillery"],
          correctIndex: 1,
          explanation: "ड्रोन तकनीक सिविल (कृषि, मैपिंग, आपदा) और मिलिट्री (सर्विलांस, स्ट्राइक) दोनों क्षेत्रों में समान रूप से उपयोगी होने के कारण दोहरे उपयोग वाली तकनीक है।",
          explanationEn: "Drone technology serves both civil applications (agriculture, mapping) and military defense.",
        },
      ],
    },

    /* ═════════════════════════════════════════════════════════════════════════
       ARTICLE 4: Punjab Sikhya Kranti 2.0
       ═════════════════════════════════════════════════════════════════════════ */
    {
      _id: "ca-punjab-sikhya-kranti-2-0-2026",
      _type: "currentAffairs",
      slug: { _type: "slug", current: "punjab-sikhya-kranti-2-0-education-scheme" },
      title: "पंजाब सिख्या क्रांति 2.0: स्कूली शिक्षा सुधार और बुनियादी ढांचा आधुनिकीकरण पहल — MPPSC व UPSC विश्लेषण",
      titleEn: "Punjab Sikhya Kranti 2.0: Modernizing School Infrastructure & Quality Education — MPPSC & UPSC Notes",
      excerpt: "शिक्षा के क्षेत्र में सुधार और सरकारी स्कूलों के बुनियादी ढांचे को अत्याधुनिक बनाने के लिए 'पंजाब सिख्या क्रांति 2.0' की शुरुआत की गई है। जानिए इसके उद्देश्य और परीक्षा उपयोगी तथ्य।",
      excerptEn: "Punjab launched 'Sikhya Kranti 2.0' to revolutionize public school education, digital classrooms, and teacher training. Read detailed breakdown for MPPSC & UPSC Mains Paper 2.",
      ca_date: "2026-09-08",
      publishedAt: new Date().toISOString(),
      featured: true,
      readingTime: 8,
      keywords: [
        "पंजाब सिख्या क्रांति 2.0",
        "Punjab Sikhya Kranti 2.0",
        "School Education Reform Punjab",
        "NEP 2020 State Schemes",
        "MPPSC Social Development Education",
        "UPSC GS2 Education Human Capital",
        "Schools of Eminence Punjab",
      ],
      category: { _type: "reference", _ref: "cat-misc" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [
        { _type: "reference", _ref: "tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc" },
        { _type: "reference", _ref: "tag-prelims" },
        { _type: "reference", _ref: "tag-mains" },
        { _type: "reference", _ref: "tag-national-affairs" },
      ],
      syllabus: ["MPPSC Mains Paper 2 Sec B Unit 2 Education & HRD", "UPSC GS-2 Social Justice & Human Resources"],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetSikhya._id },
        alt: "Punjab Sikhya Kranti 2.0 Modern Smart Classroom Infrastructure Initiative",
      },
      sections: [
        {
          _key: "sec-sikhya-1",
          kind: "whyInNews",
          title: "चर्चा में क्यों?",
          titleEn: "Why in News?",
          body: createBlocks([
            "पंजाब सरकार द्वारा राज्य के सभी सरकारी स्कूलों के शैक्षणिक माहौल, बुनियादी ढांचे (Infrastructure) और शिक्षण गुणवत्ता में क्रांतिकारी सुधार लाने के लिए 'पंजाब सिख्या क्रांति 2.0' (Punjab Sikhya Kranti 2.0) का औपचारिक शुभारंभ किया गया है।",
            "इस पहल के अंतर्गत प्राथमिक स्तर से लेकर उच्च माध्यमिक स्तर तक सरकारी स्कूलों को निजी कॉन्वेंट स्कूलों से बेहतर डिजिटल और इंफ्रास्ट्रक्चर सुविधाओं से लैस करने का लक्ष्य रखा गया है।"
          ]),
          bodyEn: createBlocks([
            "The Punjab Government officially launched 'Punjab Sikhya Kranti 2.0' to modernize public school education, integrate digital smart boards, enhance foundational literacy, and upgrade school infrastructure state-wide.",
            "The initiative aims to position government schools on par with private educational institutions by embedding smart technology and global pedagogical training."
          ]),
        },
        {
          _key: "sec-sikhya-2",
          kind: "keyHighlights",
          title: "योजना के प्रमुख पिलर एवं नवीन पहलें",
          titleEn: "Key Pillars & Core Educational Programs",
          body: createBlocks([
            "• स्मार्ट क्लासरूम व वाई-फाई कनेक्टिविटी: 12,000 से अधिक सरकारी स्कूलों में 4K इंटरएक्टिव स्मार्ट बोर्ड, सौर ऊर्जा बैकअप और हाई-स्पीड वाई-फाई की स्थापना।",
            "• अंतरराष्ट्रीय शिक्षक प्रशिक्षण: फिनलैंड (Finland) और सिंगापुर जैसे वैश्विक शिक्षा केंद्रों में प्राथमिक व उच्च प्राथमिक शिक्षकों तथा प्राचार्यों (Headmasters) को शैक्षणिक प्रशिक्षण हेतु भेजना।",
            "• स्कूल ऑफ एमिनेंस (Schools of Eminence): कक्षा 9वीं से 12वीं तक के छात्रों के लिए जेईई (JEE), नीट (NEET), क्लैट (CLAT) और यूपीएससी/राज्य पीएससी की नींव हेतु विशेष निःशुल्क कोचिंग।",
            "• रोबोटिक्स एवं एआई लैब: ग्रामीण सरकारी स्कूलों में STEM (Science, Technology, Engineering, and Mathematics) शिक्षा को बढ़ावा देने के लिए एआई व रोबोटिक्स क्लब का गठन।"
          ]),
          bodyEn: createBlocks([
            "• Smart Classrooms & High-Speed Wi-Fi: Installation of 4K interactive smart panels and Wi-Fi across 12,000+ public primary and secondary schools.",
            "• International Educator Exposure: Training headmasters and teachers in global centers of educational excellence like Finland and Singapore.",
            "• Schools of Eminence Expansion: Dedicated coaching hubs for Class 9-12 preparing for competitive entrance exams (JEE, NEET, UPSC/PSC foundation).",
            "• STEM & Robotics Labs: Establishing AI and robotics clubs in rural government schools to promote hands-on technical skills."
          ]),
        },
        {
          _key: "sec-sikhya-3",
          kind: "background",
          title: "राष्ट्रीय शिक्षा नीति (NEP 2020) एवं MP 'सीएम राइज स्कूल' से तुलना",
          titleEn: "NEP 2020 Alignment & Comparison with MP's CM RISE Schools",
          body: createBlocks([
            "• NEP 2020 का 5+3+3+4 मॉडल: पुरानी 10+2 प्रणाली को बदलकर 5 वर्ष (फाउंडेशनल), 3 वर्ष (प्रिपेरेटरी), 3 वर्ष (मिडिल), और 4 वर्ष (सेकेंडरी) का नया ढांचा लागू किया गया।",
            "• संवैधानिक प्रावधान (अनुच्छेद 21A): 86वें संविधान संशोधन अधिनियम 2002 द्वारा शामिल अनुच्छेद 21A 6 से 14 वर्ष के बच्चों को मुफ्त व अनिवार्य शिक्षा का अधिकार देता है।",
            "• मध्य प्रदेश की 'सीएम राइज स्कूल योजना': मध्य प्रदेश सरकार द्वारा 9,000 से अधिक विश्वस्तरीय 'सीएम राइज स्कूल' (CM RISE Schools) विकसित किए जा रहे हैं, जिनमें स्मार्ट क्लासरूम, स्विमिंग पूल, डिजिटल लैब और बस परिवहन सुविधाएं शामिल हैं।",
            "• निपुण भारत मिशन (NIPUN Bharat): वर्ष 2026-27 तक ग्रेड 3 तक प्रत्येक बच्चे में मूलभूत साक्षरता और संख्याज्ञान (FLN) प्राप्त करने का राष्ट्रीय लक्ष्य।"
          ]),
          bodyEn: createBlocks([
            "• NEP 2020 Pedagogical Framework: Replaces the 10+2 structure with the 5+3+3+4 model (Foundational, Preparatory, Middle, Secondary).",
            "• Constitutional Guarantee (Article 21A): Enacted by the 86th Amendment Act 2002, guaranteeing free and compulsory education for ages 6-14.",
            "• MP's CM RISE Schools Scheme: Madhya Pradesh is setting up 9,000+ CM RISE Schools featuring smart labs, sports facilities, and digital transport infrastructure.",
            "• NIPUN Bharat Target: Mandates universal Foundational Literacy and Numeracy (FLN) for Grade 3 students by 2026-27."
          ]),
        },
        {
          _key: "sec-sikhya-4",
          kind: "syllabusInterlinking",
          title: "MPPSC एवं UPSC परीक्षा जुड़ाव",
          titleEn: "MPPSC & UPSC Syllabus Interlinking",
          body: createBlocks([
            "• MPPSC मुख्य परीक्षा: पेपर 2, खंड 'ब' (इकाई 2) - 'मानव संसाधन विकास: प्राथमिक शिक्षा, बालिका साक्षरता, सीएम राइज योजना व तकनीकी शिक्षा'।",
            "• UPSC मुख्य परीक्षा: GS Paper 2 - 'मानव पूंजी, शिक्षा क्षेत्र में सुधार और सामाजिक न्याय'।",
            "• प्रारंभिक परीक्षा तथ्य: अनुच्छेद 21A (86वां संशोधन 2002), समवर्ती सूची (42वां संशोधन 1976), सीएम राइज स्कूल (MP), और NEP 2020 की 5+3+3+4 संरचना।"
          ]),
          bodyEn: createBlocks([
            "• MPPSC Mains: Paper 2, Section B (Unit 2) - Human Resource Development: Primary Education, Girl Literacy & CM RISE Scheme.",
            "• UPSC Mains: GS Paper 2 - Issues relating to development and management of Social Sector/Services relating to Education and Human Capital.",
            "• Prelims Quick Facts: Article 21A (86th Amendment 2002), Concurrent List placement (42nd Amendment 1976), CM RISE Scheme (MP), and NEP 5+3+3+4 framework."
          ]),
        },
      ],
      faqs: [
        { _key: "f1", question: "पंजाब सिख्या क्रांति 2.0 का मुख्य लक्ष्य क्या है?", answer: "सरकारी स्कूलों में डिजिटल स्मार्ट क्लासरूम, अंतरराष्ट्रीय शिक्षक प्रशिक्षण और STEM शिक्षा के जरिए शिक्षा की गुणवत्ता का आधुनिकीकरण।", questionEn: "What is the primary goal of Punjab Sikhya Kranti 2.0?", answerEn: "To modernize public school education through digital smart classrooms, international teacher training, and STEM infrastructure." },
        { _key: "f2", question: "मध्य प्रदेश की कौन सी योजना सिख्या क्रांति 2.0 के समान है?", answer: "मध्य प्रदेश सरकार की 'सीएम राइज स्कूल योजना' (CM RISE School Scheme) सरकारी स्कूलों के आधुनिक कायाकल्प हेतु संचालित है।", questionEn: "Which MP state scheme aligns with Sikhya Kranti 2.0?", answerEn: "Madhya Pradesh government's flagship 'CM RISE Schools Scheme'." },
        { _key: "f3", question: "राष्ट्रीय शिक्षा नीति (NEP 2020) की शैक्षणिक संरचना क्या है?", answer: "NEP 2020 में पुरानी 10+2 संरचना के स्थान पर नई 5+3+3+4 शैक्षणिक संरचना लागू की गई है।", questionEn: "What is the pedagogical structure under National Education Policy (NEP 2020)?", answerEn: "NEP 2020 replaces the 10+2 model with the new 5+3+3+4 curricular framework." },
        { _key: "f4", question: "भारतीय संविधान के किस अनुच्छेद में शिक्षा का मौलिक अधिकार (Right to Education) वर्णित है?", answer: "86वें संविधान संशोधन 2002 द्वारा शामिल किए गए अनुच्छेद 21A में 6 से 14 वर्ष के बच्चों के लिए मुफ्त अनिवार्य शिक्षा का अधिकार है।", questionEn: "Which Constitutional Article guarantees the Fundamental Right to Education?", answerEn: "Article 21A, inserted by the 86th Constitutional Amendment Act 2002, guaranteeing free & compulsory education for ages 6-14." },
        { _key: "f5", question: "निपुण भारत मिशन (NIPUN Bharat) का लक्ष्य वर्ष क्या है?", answer: "वर्ष 2026-27 तक ग्रेड 3 के अंत तक प्रत्येक बच्चे में मूलभूत साक्षरता और संख्याज्ञान (FLN) प्राप्त करना।", questionEn: "What is the target timeline for NIPUN Bharat Mission?", answerEn: "To achieve Foundational Literacy and Numeracy (FLN) by the end of Grade 3 by 2026-27." },
        { _key: "f6", question: "STEM शिक्षा का फुल फॉर्म क्या है?", answer: "STEM का अर्थ है: Science (विज्ञान), Technology (प्रौद्योगिकी), Engineering (इंजीनियरिंग) और Mathematics (गणित)।", questionEn: "What does the acronym STEM stand for in education policy?", answerEn: "Science, Technology, Engineering, and Mathematics." },
      ],
      mcqs: [
        {
          _key: "m1",
          question: "शिक्षा के क्षेत्र में बुनियादी ढांचे को आधुनिक बनाने के लिए 'सिख्या क्रांति 2.0' पहल किस राज्य सरकार द्वारा शुरू की गई है?",
          questionEn: "Which state government launched the 'Sikhya Kranti 2.0' initiative to modernize school education infrastructure?",
          options: ["हरियाणा", "पंजाब", "दिल्ली", "राजस्थान"],
          optionsEn: ["Haryana", "Punjab", "Delhi", "Rajasthan"],
          correctIndex: 1,
          explanation: "'सिख्या क्रांति 2.0' पंजाब सरकार की एक विशेष शिक्षा सुधार पहल है।",
          explanationEn: "Sikhya Kranti 2.0 is a flagship education initiative of the Punjab Government.",
        },
        {
          _key: "m2",
          question: "मध्य प्रदेश में सरकारी स्कूलों को सर्वसुविधायुक्त और डिजिटल बनाने के लिए कौन सी महत्वाकांक्षी योजना चलाई जा रही है?",
          questionEn: "Which ambitious state scheme is being implemented in Madhya Pradesh to make public schools modern and digital?",
          options: ["सीएम राइज स्कूल योजना (CM RISE School Scheme)", "मेधावी छात्र योजना", "शिक्षा श्री योजना", "ज्ञानोदय योजना"],
          optionsEn: ["CM RISE School Scheme", "Medhavi Chhatra Yojana", "Shiksha Shree Scheme", "Gyanodaya Yojana"],
          correctIndex: 0,
          explanation: "मध्य प्रदेश में 'सीएम राइज स्कूल योजना' के तहत विश्वस्तरीय सरकारी स्कूल विकसित किए जा रहे हैं।",
          explanationEn: "CM RISE School Scheme is MP's landmark initiative for modernizing public schools.",
        },
        {
          _key: "m3",
          question: "राष्ट्रीय शिक्षा नीति (NEP 2020) के तहत पुरानी 10+2 स्कूली प्रणाली को किस नए ढांचे से बदला गया है?",
          questionEn: "Under NEP 2020, the traditional 10+2 school structure was replaced by which new curricular framework?",
          options: ["5+3+3+4", "3+5+3+4", "5+4+3+3", "4+3+3+5"],
          optionsEn: ["5+3+3+4", "3+5+3+4", "5+4+3+3", "4+3+3+5"],
          correctIndex: 0,
          explanation: "NEP 2020 में 5 वर्ष (फाउंडेशनल) + 3 वर्ष (प्रिपेरेटरी) + 3 वर्ष (मिडिल) + 4 वर्ष (सेकेंडरी) का ढांचा है।",
          explanationEn: "NEP 2020 prescribes the 5+3+3+4 curricular model.",
        },
        {
          _key: "m4",
          question: "भारतीय संविधान का अनुच्छेद 21A (Article 21A) किस संविधान संशोधन द्वारा जोड़ा गया था?",
          questionEn: "Article 21A of the Indian Constitution was inserted by which Constitutional Amendment Act?",
          options: ["44वां संशोधन", "86वां संशोधन (2002)", "91वां संशोधन", "103वां संशोधन"],
          optionsEn: ["44th Amendment", "86th Amendment Act (2002)", "91st Amendment", "103rd Amendment"],
          correctIndex: 1,
          explanation: "86वें संविधान संशोधन अधिनियम 2002 द्वारा शिक्षा को अनुच्छेद 21A के तहत मौलिक अधिकार बनाया गया।",
          explanationEn: "The 86th Amendment Act 2002 made education a Fundamental Right under Article 21A.",
        },
        {
          _key: "m5",
          question: "केंद्र सरकार के शिक्षा मंत्रालय द्वारा शुरू किए गए 'निपुण भारत' (NIPUN Bharat) का मुख्य उद्देश्य क्या है?",
          questionEn: "What is the primary objective of the 'NIPUN Bharat' Mission launched by the Ministry of Education?",
          options: ["उच्च शिक्षा में शोध", "मूलभूत साक्षरता और संख्याज्ञान (FLN)", "व्यावसायिक आईटीआई ट्रेनिंग", "विदेशी छात्रवृत्ति"],
          optionsEn: ["Higher Education Research", "Foundational Literacy and Numeracy (FLN)", "Vocational ITI Training", "Foreign Scholarships"],
          correctIndex: 1,
          explanation: "निपुण भारत का उद्देश्य बच्चों में पढ़ना-लिखना और बुनियादी गणितीय क्षमता (FLN) विकसित करना है।",
          explanationEn: "NIPUN Bharat aims for Foundational Literacy and Numeracy among primary students.",
        },
        {
          _key: "m6",
          question: "MPPSC मुख्य परीक्षा पेपर-2 के अनुसार भारत में प्राथमिक शिक्षा के प्रसार में प्रमुख बाधा क्या है?",
          questionEn: "According to MPPSC Mains Paper 2, what is a primary structural bottleneck in Indian primary education?",
          options: ["डिजिटल विभाजन और बुनियादी ढांचे की कमी", "पुस्तकों का अधिक वजन", "वर्ष में अधिक छुट्टियां", "सार्वजनिक परिवहन की अधिकता"],
          optionsEn: ["Digital Divide & Infrastructure Gap", "Excessive Textbook Weight", "Too many annual holidays", "Excess public transport"],
          correctIndex: 0,
          explanation: "ग्रामीण-शहरी डिजिटल विभाजन (Digital Divide) और स्कूलों में शौचालय व बिजली जैसे इंफ्रास्ट्रक्चर की कमी प्रमुख बाधा है।",
          explanationEn: "Digital divide and infrastructure deficits remain major educational bottlenecks.",
        },
        {
          _key: "m7",
          question: "'पीएम श्री' (PM-SHRI) योजना के तहत देश भर में कितने स्कूलों को मॉडल स्कूल के रूप में अपग्रेड किया जा रहा है?",
          questionEn: "Under the PM-SHRI scheme, approximately how many schools across India are being upgraded as exemplar schools?",
          options: ["5,000", "14,500 से अधिक", "50,000", "1,00,000"],
          optionsEn: ["5,000", "Over 14,500", "50,000", "1,00,000"],
          correctIndex: 1,
          explanation: "पीएम श्री (PM Schools for Rising India) योजना के तहत देश भर के 14,500 से अधिक स्कूलों का कायाकल्प हो रहा है।",
          explanationEn: "Over 14,500 schools across India are upgraded under PM-SHRI.",
        },
        {
          _key: "m8",
          question: "शिक्षा को संविधान की किस सूची में रखा गया है?",
          questionEn: "Under which Schedule List of the Indian Constitution is 'Education' placed?",
          options: ["संघ सूची (Union List)", "राज्य सूची (State List)", "समवर्ती सूची (Concurrent List)", "अवशिष्ट शक्तियां"],
          optionsEn: ["Union List", "State List", "Concurrent List", "Residuary Powers"],
          correctIndex: 2,
          explanation: "42वें संविधान संशोधन 1976 द्वारा शिक्षा को राज्य सूची से हटाकर समवर्ती सूची (Concurrent List) में स्थानांतरित किया गया था।",
          explanationEn: "Education was moved from the State List to the Concurrent List via the 42nd Amendment 1976.",
        },
      ],
    },

    /* ═════════════════════════════════════════════════════════════════════════
       ARTICLE 5: Dumpsite Remediation Accelerator Program (DRAP)
       ═════════════════════════════════════════════════════════════════════════ */
    {
      _id: "ca-dumpsite-remediation-accelerator-program-drap-2026",
      _type: "currentAffairs",
      slug: { _type: "slug", current: "dumpsite-remediation-accelerator-program-drap-sbm-u-2-0" },
      title: "डंपसाइट रेमेडिएशन एक्सेलेरेटर प्रोग्राम (DRAP): स्वच्छ भारत मिशन - शहरी 2.0 का नया चरण — MPPSC व UPSC विश्लेषण",
      titleEn: "Dumpsite Remediation Accelerator Program (DRAP) under SBM-U 2.0 — Solid Waste & MPPSC/UPSC Notes",
      excerpt: "शहरी कचरे के प्रबंधन और पुराने कचरे के पहाड़ों (Legacy Waste) को समाप्त करने के लिए स्वच्छ भारत मिशन-शहरी 2.0 के तहत DRAP लागू किया जा रहा है। जानिए मध्य प्रदेश इंदौर मॉडल एवं परीक्षा हेतु संपूर्ण विवरण।",
      excerptEn: "India launches DRAP under Swachh Bharat Mission - Urban 2.0 to clear legacy waste dumpsites and foster circular economy. Read complete analysis for MPPSC & UPSC Mains Paper 3 Environment.",
      ca_date: "2026-09-08",
      publishedAt: new Date().toISOString(),
      featured: true,
      readingTime: 9,
      keywords: [
        "डंपसाइट रेमेडिएशन एक्सेलेरेटर प्रोग्राम",
        "DRAP SBM-U 2.0",
        "Swachh Bharat Mission Urban 2.0",
        "Biomining Legacy Waste India",
        "Indore Garbage Free City Model",
        "MPPSC Solid Waste Management",
        "UPSC GS3 Urban Environment",
        "Solid Waste Rules 2016",
      ],
      category: { _type: "reference", _ref: "cat-environment" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [
        { _type: "reference", _ref: "tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc" },
        { _type: "reference", _ref: "tag-prelims" },
        { _type: "reference", _ref: "tag-mains" },
        { _type: "reference", _ref: "tag-national-affairs" },
      ],
      syllabus: ["MPPSC Mains Paper 3 Unit 9 Environment & Waste Management", "UPSC GS-3 Environmental Pollution & Urban Governance"],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetDrap._id },
        alt: "Dumpsite Remediation Accelerator Program DRAP Biomining Legacy Waste SBM-U 2.0",
      },
      sections: [
        {
          _key: "sec-drap-1",
          kind: "whyInNews",
          title: "चर्चा में क्यों?",
          titleEn: "Why in News?",
          body: createBlocks([
            "आवासन और शहरी कार्य मंत्रालय (Ministry of Housing and Urban Affairs - MoHUA) द्वारा स्वच्छ भारत मिशन - शहरी 2.0 (SBM-U 2.0) के अंतर्गत 'डंपसाइट रेमेडिएशन एक्सेलेरेटर प्रोग्राम' (DRAP) की शुरुआत की गई है।",
            "इस महत्वाकांक्षी कार्यक्रम का प्राथमिक लक्ष्य 'लक्ष्य: ज़ीरो डंपसाइट' (Lakshya: Zero Dumpsites) के तहत सितंबर 2026 तक देश भर के शहरों में दशकों से जमा पुराने कचरे के पहाड़ों (Legacy Waste Dumpsites) का 100% वैज्ञानिक निस्तारण करना है।"
          ]),
          bodyEn: createBlocks([
            "The Ministry of Housing and Urban Affairs (MoHUA) launched the Dumpsite Remediation Accelerator Program (DRAP) under Swachh Bharat Mission - Urban 2.0 (SBM-U 2.0).",
            "The initiative operates under the mission mandate 'Lakshya: Zero Dumpsites' targeting complete scientific biomining of legacy waste dumpsites by September 2026."
          ]),
        },
        {
          _key: "sec-drap-2",
          kind: "keyHighlights",
          title: "DRAP की मुख्य विशेषताएं एवं लक्ष्य आंकड़े",
          titleEn: "Key Highlights & Core Statistical Targets",
          body: createBlocks([
            "• 214 उच्च-प्रभाव डंपसाइट का चयन: DRAP के तहत 202 शहरी स्थानीय निकायों (ULBs) में स्थित 214 उच्च-प्रभाव डंपसाइट्स (High-Impact Dumpsites) को प्राथमिकता दी गई है।",
            "• 8.6 से 8.8 करोड़ मीट्रिक टन कचरे का निस्तारण: ये 214 डंपसाइट भारत के कुल लेगेसी वेस्ट के लगभग 80% भाग (8.6 से 8.8 करोड़ मीट्रिक टन) का प्रतिनिधित्व करते हैं।",
            "• ₹550 प्रति टन वित्तीय सहायता: केंद्र सरकार द्वारा लेगेसी वेस्ट के वैज्ञानिक रेमेडिएशन के लिए स्थानीय निकायों को ₹550 प्रति मीट्रिक टन की वित्तीय सहायता दी जा रही है।",
            "• बायोमाइनिंग (Biomining) प्रक्रिया: ट्रॉमल स्क्रीन द्वारा कचरे की छंटाई करके रिफ्यूज डिराइव्ड फ्यूल (RDF) को सीमेंट भट्टियों में ईंधन के रूप में, कार्बनिक मृदा संशोधक (Fine Soil) को खेतों में और इनर्ट वेस्ट को निर्माण कार्यों में उपयोग करना।"
          ]),
          bodyEn: createBlocks([
            "• Priority Focus on 214 Dumpsites: Prioritizes 214 high-impact legacy dumpsites across 202 Urban Local Bodies (ULBs).",
            "• 8.6 to 8.8 Crore Metric Tonnes Target: These priority sites hold nearly 80% of India's total legacy waste (~8.6 to 8.8 crore MT).",
            "• ₹550 per Tonne Central Incentive: Provides financial support of ₹550 per metric tonne of legacy waste remediated.",
            "• Biomining Process: Uses trommel screening to segregate legacy waste into Refuse Derived Fuel (RDF) for cement plants, fine organic soil for agriculture, and inert aggregates."
          ]),
        },
        {
          _key: "sec-drap-3",
          kind: "background",
          title: "मध्य प्रदेश का इंदौर मॉडल एवं मियावाकी वनीकरण",
          titleEn: "Indore Benchmark Model & Miyawaki Urban Forestry",
          body: createBlocks([
            "• इंदौर नगर निगम की ऐतिहासिक सफलता: मध्य प्रदेश के इंदौर ने देवगुराड़िया स्थित 100 एकड़ के डंपसाइट पर जमा 13 लाख मीट्रिक टन लेगेसी वेस्ट का 100% बायोमाइनिंग करके 100 एकड़ मूल्यवान शहरी भूमि को पूरी तरह से कचरा मुक्त और हरा-भरा बनाया।",
            "• मियावाकी तकनीक (Miyawaki Method): डंपसाइट से खाली कराई गई भूमि पर सघन जापानी वनीकरण तकनीक 'मियावाकी' द्वारा 'सिटी फॉरेस्ट' और जैव-विविधता पार्क विकसित किए जा रहे हैं।",
            "• ठोस अपशिष्ट प्रबंधन नियम 2016 (SWM Rules 2016): भारत में ठोस कचरे के गीले-सूखे पृथक्करण, कंपोस्टिंग और रिसाइक्लिंग के लिए कानूनी ढांचा प्रदान करते हैं।"
          ]),
          bodyEn: createBlocks([
            "• Indore Legacy Waste Benchmark: Indore Municipal Corporation successfully biomined 1.3 million MT of legacy waste at Devguradia dumpsite, fully reclaiming 100 acres of prime urban land.",
            "• Miyawaki Method Afforestation: Reclaimed dumpsites are transformed into dense urban forests using the Japanese Miyawaki technique.",
            "• Solid Waste Management Rules 2016: Enforces mandatory waste segregation at source and circular recycling."
          ]),
        },
        {
          _key: "sec-drap-4",
          kind: "syllabusInterlinking",
          title: "MPPSC एवं UPSC परीक्षा जुड़ाव",
          titleEn: "MPPSC & UPSC Syllabus Interlinking",
          body: createBlocks([
            "• MPPSC मुख्य परीक्षा: पेपर 3 (इकाई 9) - 'पर्यावरण एवं ठोस अपशिष्ट प्रबंधन: बायोमाइनिंग, कचरा निस्तारण व स्वच्छ भारत मिशन' तथा पेपर 2 - 'नगरीय निकाय'।",
            "• UPSC मुख्य परीक्षा: GS Paper 3 - 'पर्यावरण प्रदूषण, अपशिष्ट प्रबंधन, सर्कुलर इकोनॉमी व सतत शहरी विकास'।",
            "• प्रारंभिक परीक्षा तथ्य: SBM-U 2.0, DRAP का लक्ष्य वर्ष (सितंबर 2026), ₹550/टन प्रोत्साहन, और इंदौर देवगुराड़िया बायोमाइनिंग मॉडल।"
          ]),
          bodyEn: createBlocks([
            "• MPPSC Mains: Paper 3 (Unit 9) - Environment & Solid Waste Management: Biomining & Landfill Remediation + Paper 2 - Urban Governance.",
            "• UPSC Mains: GS Paper 3 - Environmental Pollution, Degradation, Solid Waste Management & Circular Economy.",
            "• Prelims Quick Facts: SBM-U 2.0 timeline, DRAP target (September 2026), ₹550/tonne incentive, and Indore Devguradia model."
          ]),
        },
      ],
      faqs: [
        { _key: "f1", question: "DRAP कार्यक्रम किस मिशन के अंतर्गत शुरू किया गया है?", answer: "यह कार्यक्रम आवास और शहरी कार्य मंत्रालय द्वारा 'स्वच्छ भारत मिशन - शहरी 2.0' (SBM-U 2.0) के अंतर्गत शुरू किया गया है।", questionEn: "Under which mission is the DRAP initiative implemented?", answerEn: "Under Swachh Bharat Mission - Urban 2.0 (SBM-U 2.0) by MoHUA." },
        { _key: "f2", question: "बायोमाइनिंग (Biomining) प्रक्रिया क्या है?", answer: "बायोमाइनिंग पुरानी डंपसाइटों के कचरे को मशीनों द्वारा छानकर मिट्टी, रिफ्यूज डिराइव्ड फ्यूल (RDF) और रीसाइक्लेबल प्लास्टिक में अलग करने की वैज्ञानिक प्रक्रिया है।", questionEn: "What is Biomining of legacy waste?", answerEn: "Biomining is the mechanical and biological segregation of legacy landfill waste into fine soil, RDF fuel, and recyclable fractions." },
        { _key: "f3", question: "मध्य प्रदेश का कौन सा शहर 7 बार लगातार भारत का सबसे स्वच्छ शहर बना है?", answer: "मध्य प्रदेश का 'इंदौर' (Indore) शहर लगातार 7 बार स्वच्छ सर्वेक्षण में भारत का सबसे स्वच्छ शहर चुना गया है।", questionEn: "Which MP city won India's cleanest city award 7 consecutive times?", answerEn: "Indore in Madhya Pradesh." },
        { _key: "f4", question: "RDF (Refuse-Derived Fuel) का उपयोग कहाँ किया जाता है?", answer: "छंटाई किए गए प्लास्टिक व सूखे कचरे से बने RDF का उपयोग सीमेंट कारखानों के भट्टों में कोयले के स्थान पर ईधन के रूप में किया जाता है।", questionEn: "Where is Refuse-Derived Fuel (RDF) utilized?", answerEn: "RDF generated from segregated plastic waste is used as alternative fuel in cement kilns and waste-to-energy plants." },
        { _key: "f5", question: "स्वच्छ भारत मिशन - शहरी 2.0 की अवधि क्या है?", answer: "SBM-U 2.0 को वर्ष 2021 से 2026 तक की 5 वर्ष की अवधि के लिए लॉन्च किया गया था।", questionEn: "What is the official operational period of SBM-U 2.0?", answerEn: "SBM-U 2.0 operates for a 5-year period from 2021 to 2026." },
        { _key: "f6", question: "ठोस अपशिष्ट प्रबंधन नियम (SWM Rules) किस वर्ष लागू किए गए थे?", answer: "पर्यावरण, वन और जलवायु परिवर्तन मंत्रालय द्वारा ठोस अपशिष्ट प्रबंधन नियम वर्ष 2016 (SWM Rules 2016) में अधिसूचित किए गए थे।", questionEn: "In which year were Solid Waste Management Rules enacted in India?", answerEn: "Solid Waste Management Rules were notified in 2016." },
      ],
      mcqs: [
        {
          _key: "m1",
          question: "डंपसाइट रेमेडिएशन एक्सेलेरेटर प्रोग्राम (DRAP) किस केंद्रीय मंत्रालय की पहल है?",
          questionEn: "Dumpsite Remediation Accelerator Program (DRAP) is an initiative of which Union Ministry?",
          options: ["पर्यावरण, वन एवं जलवायु परिवर्तन मंत्रालय", "आवास और शहरी कार्य मंत्रालय (MoHUA)", "जल शक्ति मंत्रालय", "ग्रामीण विकास मंत्रालय"],
          optionsEn: ["Ministry of Environment", "Ministry of Housing and Urban Affairs (MoHUA)", "Ministry of Jal Shakti", "Ministry of Rural Development"],
          correctIndex: 1,
          explanation: "DRAP पहल आवास और शहरी कार्य मंत्रालय (MoHUA) द्वारा स्वच्छ भारत मिशन-शहरी 2.0 के तहत शुरू की गई है।",
          explanationEn: "DRAP is spearheaded by the Ministry of Housing and Urban Affairs.",
        },
        {
          _key: "m2",
          question: "मध्य प्रदेश का कौन सा शहर अपने 100 एकड़ के देवगुराड़िया डंपसाइट का 100% बायोमाइनिंग करके देश का रोल मॉडल बना?",
          questionEn: "Which MP city became a national benchmark by 100% biomining its 100-acre Devguradia dumpsite?",
          options: ["भोपाल", "ग्वालियर", "इंदौर", "जबलपुर"],
          optionsEn: ["Bhopal", "Gwalior", "Indore", "Jabalpur"],
          correctIndex: 2,
          explanation: "इंदौर नगर निगम ने देवगुराड़िया डंपसाइट के 13 लाख मीट्रिक टन पुराने कचरे को पूरी तरह बायोमाइनिंग से समाप्त किया।",
          explanationEn: "Indore achieved 100% biomining of its Devguradia dumpsite.",
        },
        {
          _key: "m3",
          question: "पुराने कचरे की बायोमाइनिंग छंटाई के दौरान प्राप्त 'RDF' का क्या अर्थ है?",
          questionEn: "In solid waste management biomining, what does the acronym 'RDF' stand for?",
          options: ["Recycled Dust Factor", "Refuse-Derived Fuel (रिफ्यूज-डिराइव्ड फ्यूल)", "Regional Dump Facility", "Resource Development Fund"],
          optionsEn: ["Recycled Dust Factor", "Refuse-Derived Fuel", "Regional Dump Facility", "Resource Development Fund"],
          correctIndex: 1,
          explanation: "RDF का अर्थ Refuse-Derived Fuel है जिसका उपयोग सीमेंट भट्टियों में ईंधन के रूप में किया जाता है।",
          explanationEn: "RDF stands for Refuse-Derived Fuel used as alternative energy in industrial kilns.",
        },
        {
          _key: "m4",
          question: "स्वच्छ भारत मिशन - शहरी 2.0 (SBM-U 2.0) का मुख्य विजन क्या है?",
          questionEn: "What is the core vision of Swachh Bharat Mission - Urban 2.0?",
          options: ["केवल शौचालय निर्माण", "कचरा मुक्त शहर (Garbage-Free Cities)", "निःशुल्क पेयजल आपूर्ति", "प्लास्टिक उत्पादन पर पूर्ण प्रतिबंध"],
          optionsEn: ["Toilets construction only", "Garbage-Free Cities", "Free drinking water", "Total plastic ban"],
          correctIndex: 1,
          explanation: "SBM-U 2.0 का मुख्य लक्ष्य सभी भारतीय शहरों को 100% 'कचरा मुक्त शहर' (Garbage-Free Cities) बनाना है।",
          explanationEn: "SBM-U 2.0 envisions creating Garbage-Free Cities across India.",
        },
        {
          _key: "m5",
          question: "भारत में ठोस अपशिष्ट प्रबंधन नियम (Solid Waste Management Rules) किस वर्ष अधिसूचित किए गए थे?",
          questionEn: "Solid Waste Management Rules were notified in India in which year?",
          options: ["2000", "2014", "2016", "2020"],
          optionsEn: ["2000", "2014", "2016", "2020"],
          correctIndex: 2,
          explanation: "ठोस अपशिष्ट प्रबंधन नियम 2016 (SWM Rules 2016) में लागू किए गए थे।",
          explanationEn: "Solid Waste Management Rules were framed in 2016.",
        },
        {
          _key: "m6",
          question: "शहरी अपशिष्ट प्रबंधन में 'सर्कुलर इकोनॉमी' (Circular Economy) का मुख्य सिद्धांत क्या है?",
          questionEn: "What is the core principle of a 'Circular Economy' in urban waste management?",
          options: ["कचरा जलाना", "कचरा समुद्र में फेंकना", "Reduce, Reuse, Recycle (पुनर्चक्रण व पुनरु उपयोग)", "कचरा गड्ढों में दबाना"],
          optionsEn: ["Incineration", "Ocean Dumping", "Reduce, Reuse, Recycle", "Deep Landfill Burial"],
          correctIndex: 2,
          explanation: "सर्कुलर इकोनॉमी संसाधनों का चक्रण बनाकर अपशिष्ट शून्य करने (Reduce, Reuse, Recycle) पर आधारित है।",
          explanationEn: "Circular economy focuses on minimizing waste through reduction, reuse, and recycling.",
        },
        {
          _key: "m7",
          question: "MPPSC मुख्य परीक्षा पेपर-3 इकाई-9 के अनुसार जैव-चिकित्सा अपशिष्ट (Bio-Medical Waste) के निपटान की मानक विधि क्या है?",
          questionEn: "As per MPPSC Mains Paper 3 Unit 9, what is the standard method for disposing of infectious Bio-Medical Waste?",
          options: ["इंसिनरेशन (Incineration / भस्मीकरण)", "बायोमाइनिंग", "कंपोस्टिंग", "खुले में जलाना"],
          optionsEn: ["Incineration", "Biomining", "Composting", "Open Burning"],
          correctIndex: 0,
          explanation: "संक्रामक बायो-मेडिकल कचरे का उच्च तापमान पर भस्मीकरण (Incineration / Autoclaving) किया जाता है।",
          explanationEn: "Infectious bio-medical waste requires high-temperature incineration or autoclaving.",
        },
        {
          _key: "m8",
          question: "कचरे के पहाड़ों को हटाकर शहरी वनीकरण के लिए अपनाई जाने वाली प्रसिद्ध जापानी तकनीक का नाम क्या है?",
          questionEn: "What is the name of the famous Japanese dense urban afforestation method used on reclaimed dumpsites?",
          options: ["मियावाकी तकनीक (Miyawaki Method)", "बोनसाई तकनीक", "हॉर्टिकल्चर मेथड", "टेरेस गार्डनिंग"],
          optionsEn: ["Miyawaki Method", "Bonsai Method", "Horticulture Method", "Terrace Gardening"],
          correctIndex: 0,
          explanation: "मियावाकी तकनीक के जरिए सीमित शहरी स्थान और पुनर्प्राप्त भूमि पर तेजी से सघन जंगल विकसित किए जाते हैं।",
          explanationEn: "Miyawaki method is used to grow dense native urban forests on reclaimed land.",
        },
      ],
    },

    /* ═════════════════════════════════════════════════════════════════════════
       ARTICLE 6: World's First Autonomous Shipbuilding Centre in Andhra Pradesh
       ═════════════════════════════════════════════════════════════════════════ */
    {
      _id: "ca-worlds-first-autonomous-shipbuilding-centre-ap-2026",
      _type: "currentAffairs",
      slug: { _type: "slug", current: "worlds-first-autonomous-shipbuilding-centre-andhra-pradesh-2026" },
      title: "विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र (आंध्र प्रदेश) | MPPSC & UPSC",
      titleEn: "World's First Autonomous Shipbuilding Centre in Andhra Pradesh | MPPSC & UPSC",
      excerpt: "आंध्र प्रदेश के नेल्लोर जिले में स्थापित हो रहा है विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र। जानिए तकनीक, रक्षा महत्व एवं MPPSC & UPSC परीक्षा उपयोगी नोट्स।",
      excerptEn: "India is building the world's first autonomous shipbuilding centre in Andhra Pradesh. Read detailed Blue Economy, AI tech & exam notes for MPPSC & UPSC.",
      ca_date: "2026-09-08",
      publishedAt: new Date().toISOString(),
      featured: true,
      readingTime: 9,
      keywords: [
        "विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र",
        "Autonomous Shipbuilding Centre Andhra Pradesh",
        "Autonomous Ships India Maritime",
        "Sagarmala Blue Economy India",
        "MPPSC Science Tech Maritime",
        "UPSC GS3 Robotics AI Maritime",
        "Andhra Pradesh High Tech Shipyard",
      ],
      category: { _type: "reference", _ref: "cat-scitech" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [
        { _type: "reference", _ref: "tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc" },
        { _type: "reference", _ref: "tag-prelims" },
        { _type: "reference", _ref: "tag-mains" },
        { _type: "reference", _ref: "tag-scitech" },
      ],
      syllabus: ["MPPSC Mains Paper 3 Unit 7 Science & Tech Robotics", "UPSC GS-3 Maritime Economy, AI & Infrastructure"],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetShipbuilding._id },
        alt: "World's First Autonomous Shipbuilding Hub in Andhra Pradesh India",
      },
      sections: [
        {
          _key: "sec-ship-1",
          kind: "whyInNews",
          title: "चर्चा में क्यों?",
          titleEn: "Why in News?",
          body: createBlocks([
            "भारत के तटीय राज्य आंध्र प्रदेश (Andhra Pradesh) में विश्व का पहला समर्पित 'स्वायत्त समुद्री जहाज निर्माण केंद्र' (World's First Autonomous Shipbuilding Hub) स्थापित करने की घोषणा की गई है।",
            "यह उच्च स्तरीय नौवहन केंद्र आर्टिफिशियल इंटेलिजेंस (AI), सेंसर ग्रिड और रोबोटिक्स से संचालित बिना नाविक वाले (Unmanned Cargo & Naval Craft) व्यापारिक मालवाहक जहाजों का डिजाइन, निर्माण और परीक्षण करेगा।"
          ]),
          bodyEn: createBlocks([
            "India is establishing the world's first dedicated Autonomous Shipbuilding Centre in Andhra Pradesh.",
            "This state-of-the-art facility will design, construct, and test AI-navigated unmanned commercial cargo vessels and naval surveillance craft."
          ]),
        },
        {
          _key: "sec-ship-2",
          kind: "keyHighlights",
          title: "केंद्र की मुख्य तकनीकी विशेषताएं एवं ब्लू इकोनॉमी",
          titleEn: "Key Technical Features & Blue Economy Alignment",
          body: createBlocks([
            "• स्वायत्त नौवहन तकनीक (Autonomous Navigation): जहाजों में LiDAR, RADAR, एआई कोलिजन अवॉइडेंस सेंसरों और सेटेलाइट रिमोट कंट्रोल का एकीकरण किया जाएगा, जिससे मानवीय भूलों से होने वाली समुद्री दुर्घटनाएं शून्य हो सकें।",
            "• सागरमाला प्रोजेक्ट और रसद लागत: भारत सरकार की 'सागरमाला परियोजना' (Sagarmala Project) के तहत समुद्री रसद लागत (Logistics Cost) को सकल घरेलू उत्पाद (GDP) के 14% से घटाकर 8% करने में यह केंद्र मील का पत्थर साबित होगा।",
            "• आंध्र प्रदेश की भौगोलिक बढ़त: गुजरात (1,214 किमी) के बाद आंध्र प्रदेश भारत का दूसरा सबसे लंबा समुद्र तट (974 किमी) रखता है, जहाँ विशाखापत्तनम शिपयार्ड और काकीनाडा प्रमुख तटीय केंद्र हैं।",
            "• हरित समुद्री परिवहन (Green Shipping): स्वायत्त जहाजों में हाइब्रिड हाइड्रोजन ईंधन सेल और इलेक्ट्रिक ड्राइव का प्रयोग कर शून्य उत्सर्जन लक्ष्य हासिल किया जाएगा।"
          ]),
          bodyEn: createBlocks([
            "• Autonomous Navigation & Collision Avoidance: Integrates LiDAR, satellite communication links, and AI algorithms for crewless maritime transit.",
            "• Sagarmala Project Logistics Synergy: Reduces India's maritime logistics cost from 14% to sub-8% of GDP under the Sagarmala initiative.",
            "• Geographic Edge of Andhra Pradesh: AP possesses India's second-longest coastline (974 km) with major ports like Visakhapatnam.",
            "• Zero-Emission Green Shipping: Integrates hydrogen fuel cell technology into autonomous cargo vessels."
          ]),
        },
        {
          _key: "sec-ship-3",
          kind: "background",
          title: "मध्य प्रदेश अंतर्देशीय जलमार्ग (National Waterways in MP)",
          titleEn: "National Waterways Context & MP Relevance",
          body: createBlocks([
            "• मध्य प्रदेश की स्थिति: मध्य प्रदेश एक भू-आवृत (Landlocked) राज्य है, किंतु भारत सरकार द्वारा मध्य प्रदेश में प्रवाहित होने वाली 'नर्मदा नदी' पर राष्ट्रीय जलमार्ग-73 (NW-73) घोषित किया गया है।",
            "• चंबल नदी जलमार्ग: मध्य प्रदेश के उत्तरी क्षेत्र में चंबल नदी (NW-24) पर भी अंतर्देशीय जलमार्ग विकास की संभावनाएं तलाशी जा रही हैं।",
            "• अंतर्राष्ट्रीय समुद्री संगठन (IMO): संयुक्त राष्ट्र की विशेष एजेंसी IMO (मुख्यालय: लंदन, यूके) अंतरराष्ट्रीय नौवहन सुरक्षा और स्वायत्त जहाजों (MASS - Maritime Autonomous Surface Ships) के नियमन के लिए कोड तैयार कर रही है।"
          ]),
          bodyEn: createBlocks([
            "• MP Inland Waterways: Although MP is landlocked, National Waterway 73 (NW-73) is declared on the Narmada River.",
            "• Chambal Waterway Potential: National Waterway 24 (NW-24) covers segments of the Chambal River in northern MP.",
            "• IMO Regulatory Framework: The International Maritime Organization (HQ London) is establishing the MASS Code for autonomous surface ships."
          ]),
        },
        {
          _key: "sec-ship-4",
          kind: "syllabusInterlinking",
          title: "MPPSC एवं UPSC परीक्षा जुड़ाव",
          titleEn: "MPPSC & UPSC Syllabus Interlinking",
          body: createBlocks([
            "• MPPSC मुख्य परीक्षा: पेपर 3 (इकाई 7) - 'आर्टिफिशियल इंटेलिजेंस, रोबोटिक्स, इंडस्ट्रियल 4.0 व सूचना प्रौद्योगिकी'।",
            "• UPSC मुख्य परीक्षा: GS Paper 3 - 'अधोसंरचना: बंदरगाह, नौवहन, ब्लू इकोनॉमी व रोबोटिक्स'।",
            "• प्रारंभिक परीक्षा तथ्य: दूसरा सबसे लंबा समुद्र तट (आंध्र प्रदेश - 974 किमी), NW-73 (नर्मदा नदी), IMO का मुख्यालय (लंदन), और विशाखापत्तनम पोर्ट।"
          ]),
          bodyEn: createBlocks([
            "• MPPSC Mains: Paper 3 (Unit 7) - Artificial Intelligence, Robotics, and Advanced IT Applications.",
            "• UPSC Mains: GS Paper 3 - Infrastructure: Ports, Shipping, Blue Economy, Industry 4.0 & AI.",
            "• Prelims Quick Facts: Second longest coastline (AP ~974 km), NW-73 (Narmada River), IMO HQ (London), and Visakhapatnam Port Authority."
          ]),
        },
      ],
      faqs: [
        { _key: "f1", question: "विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र भारत के किस राज्य में स्थापित हो रहा है?", answer: "यह आधुनिक केंद्र आंध्र प्रदेश राज्य के तटीय क्षेत्र में स्थापित किया जा रहा है।", questionEn: "In which state is the world's first autonomous shipbuilding centre being built?", answerEn: "In the coastal state of Andhra Pradesh, India." },
        { _key: "f2", question: "स्वायत्त जहाज (Autonomous Ship) क्या होता है?", answer: "ऐसा जहाज जो बिना मानव क्रू के आर्टिफिशियल इंटेलिजेंस, सेंसरों और सैटेलाइट रिमोट कंट्रोल के जरिए समुद्र में स्वयं नौवहन करता है।", questionEn: "What is an Autonomous Ship?", answerEn: "A vessel capable of navigating oceans independently using AI sensors, automated control algorithms, and satellite remote monitoring." },
        { _key: "f3", question: "भारत के किस राज्य का समुद्र तट सबसे लंबा है?", answer: "भारत में सबसे लंबा समुद्र तट गुजरात (लगभग 1,214 किमी) का है, जबकि दूसरा सबसे लंबा समुद्र तट आंध्र प्रदेश (974 किमी) का है।", questionEn: "Which Indian state has the longest coastline?", answerEn: "Gujarat has the longest coastline (~1,214 km), followed by Andhra Pradesh (~974 km)." },
        { _key: "f4", question: "भारत सरकार का 'सागरमाला कार्यक्रम' (Sagarmala Programme) किससे संबंधित है?", answer: "बंदरगाहों के आधुनिकीकरण, पोर्ट-लेड विकास और समुद्री तटीय रसद दक्षता सुधारने से।", questionEn: "What is the core objective of Sagarmala Programme?", answerEn: "Port modernization, port-led industrialization, and coastal shipping logistics enhancement." },
        { _key: "f5", question: "ब्लू इकोनॉमी (Blue Economy) से क्या तात्पर्य है?", answer: "समुद्री संसाधनों का आर्थिक विकास, आजीविका सुधार और नौकरियों के लिए सतत व पर्यावरण-अनुकूल उपयोग।", questionEn: "What does the term 'Blue Economy' signify?", answerEn: "Sustainable utilization of ocean resources for economic growth, improved livelihoods, and marine ecosystem health." },
        { _key: "f6", question: "मध्य प्रदेश में नौवहन और अंतर्देशीय जलमार्ग (Inland Waterways) की क्या स्थिति है?", answer: "मध्य प्रदेश भू-आवृत (Landlocked) राज्य है, किंतु नर्मदा नदी पर राष्ट्रीय जलमार्ग-73 (NW-73) घोषित है।", questionEn: "What is the status of inland waterways in MP?", answerEn: "MP is landlocked, but National Waterway 73 (NW-73) is declared on the Narmada River." },
      ],
      mcqs: [
        {
          _key: "m1",
          question: "हाल ही में 'विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र' भारत के किस राज्य में स्थापित करने की घोषणा की गई है?",
          questionEn: "Where in India is the 'World's First Autonomous Shipbuilding Centre' being established?",
          options: ["तमिलनाडु", "गुजरात", "आंध्र प्रदेश", "केरल"],
          optionsEn: ["Tamil Nadu", "Gujarat", "Andhra Pradesh", "Kerala"],
          correctIndex: 2,
          explanation: "विश्व का पहला स्वायत्त समुद्री जहाज निर्माण केंद्र आंध्र प्रदेश में स्थापित किया जा रहा है।",
          explanationEn: "It is being set up in Andhra Pradesh.",
        },
        {
          _key: "m2",
          question: "मुख्य भूमि भारत में गुजरात के बाद दूसरा सबसे लंबा समुद्र तट (Coastline) किस राज्य का है?",
          questionEn: "Which state possesses the second-longest coastline in mainland India after Gujarat?",
          options: ["महाराष्ट्र", "तमिलनाडु", "आंध्र प्रदेश", "ओडिशा"],
          optionsEn: ["Maharashtra", "Tamil Nadu", "Andhra Pradesh", "Odisha"],
          correctIndex: 2,
          explanation: "आंध्र प्रदेश का समुद्र तट 974 किमी लंबा है जो गुजरात (1,214 किमी) के बाद भारत में दूसरा सबसे लंबा है।",
          explanationEn: "Andhra Pradesh has the second-longest coastline (~974 km).",
        },
        {
          _key: "m3",
          question: "भारत सरकार का 'सागरमाला प्रोजेक्ट' (Sagarmala Project) प्राथमिक रूप से किस क्षेत्र के विकास से जुड़ा है?",
          questionEn: "India's flagship 'Sagarmala Project' is primarily associated with which sector?",
          options: ["रेलवे नेटवर्क", "बंदरगाह विकास एवं समुद्री रसद (Ports & Maritime Logistics)", "हवाई अड्डे", "सौर ऊर्जा"],
          optionsEn: ["Railway network", "Port Development & Maritime Logistics", "Airports", "Solar Energy"],
          correctIndex: 1,
          explanation: "सागरमाला प्रोजेक्ट का मुख्य उद्देश्य बंदरगाहों का कायाकल्प और तटीय शिपिंग को बढ़ावा देना है।",
          explanationEn: "Sagarmala targets port modernization and coastal shipping development.",
        },
        {
          _key: "m4",
          question: "स्वायत्त जहाजों में मानवीय हस्तक्षेप के बिना नेविगेशन और बाधा पहचान के लिए किस तकनीक का प्रयोग होता है?",
          questionEn: "Which technology is primarily deployed for obstacle detection in autonomous ship navigation?",
          options: ["LiDAR और AI नेविगेशन एल्गोरिदम", "केवल सोनार", "थर्मामीटर सेंसर", "केवल जीपीएस"],
          optionsEn: ["LiDAR & AI Navigation Algorithms", "Sonar only", "Thermometer sensor", "GPS only"],
          correctIndex: 0,
          explanation: "स्वायत्त जहाजों में LiDAR, RADAR, ऑप्टिकल कैमरे और एआई एल्गोरिदम का उपयोग होता है।",
          explanationEn: "LiDAR, radar, optical sensors, and AI algorithms power autonomous navigation.",
        },
        {
          _key: "m5",
          question: "हिंदुस्तान शिपयार्ड लिमिटेड (Hindustan Shipyard Limited - HSL) आंध्र प्रदेश के किस शहर में स्थित है?",
          questionEn: "Hindustan Shipyard Limited (HSL) is located in which city of Andhra Pradesh?",
          options: ["काकीनाडा", "विशाखापत्तनम", "नेल्लोर", "मछलीपट्टनम"],
          optionsEn: ["Kakinada", "Visakhapatnam", "Nellore", "Machilipatnam"],
          correctIndex: 1,
          explanation: "हिंदुस्तान शिपयार्ड लिमिटेड विशाखापत्तनम में स्थित भारत का प्रमुख रक्षा व वाणिज्यिक शिपयार्ड है।",
          explanationEn: "Hindustan Shipyard Limited is located in Visakhapatnam, AP.",
        },
        {
          _key: "m6",
          question: "मध्य प्रदेश से होकर प्रवाहित होने वाली किस नदी पर राष्ट्रीय जलमार्ग-73 (NW-73) घोषित किया गया है?",
          questionEn: "Which river flowing through Madhya Pradesh is designated as National Waterway 73 (NW-73)?",
          options: ["चंबल नदी", "नर्मदा नदी", "सोन नदी", "ताप्ती नदी"],
          optionsEn: ["Chambal River", "Narmada River", "Son River", "Tapti River"],
          correctIndex: 1,
          explanation: "नर्मदा नदी पर घोषित राष्ट्रीय जलमार्ग का नाम NW-73 है।",
          explanationEn: "Narmada River is designated as National Waterway 73.",
        },
        {
          _key: "m7",
          question: "विश्व समुद्री संगठन (International Maritime Organization - IMO) का मुख्यालय कहाँ स्थित है?",
          questionEn: "Where is the Headquarters of the International Maritime Organization (IMO) located?",
          options: ["जेनेवा", "लंदन (यूके)", "न्यूयोर्क", "पेरिस"],
          optionsEn: ["Geneva", "London (UK)", "New York", "Paris"],
          correctIndex: 1,
          explanation: "IMO (अंतर्राष्ट्रीय समुद्री संगठन) का मुख्यालय लंदन, यूनाइटेड किंगडम में स्थित है।",
          explanationEn: "IMO headquarters is situated in London, United Kingdom.",
        },
        {
          _key: "m8",
          question: "MPPSC मुख्य परीक्षा पेपर-3 में 'इंडस्ट्री 4.0' और रोबोटिक्स का अध्ययन किस विषय के अंतर्गत किया जाता है?",
          questionEn: "Under MPPSC Mains Paper 3, Industry 4.0 and Robotics are studied under which section?",
          options: ["इतिहास", "विज्ञान एवं प्रौद्योगिकी (इकाई 7)", "दर्शनशास्त्र", "भूगोल"],
          optionsEn: ["History", "Science & Technology (Unit 7)", "Philosophy", "Geography"],
          correctIndex: 1,
          explanation: "विज्ञान एवं प्रौद्योगिकी की इकाई 7 में एआई, रोबोटिक्स और आधुनिक तकनीकों का अध्ययन होता है।",
          explanationEn: "Unit 7 of Science & Technology covers Robotics, AI, and Industry 4.0 applications.",
        },
      ],
    },

    /* ═════════════════════════════════════════════════════════════════════════
       ARTICLE 7: UN World Water Development Report 2026 by UNESCO
       ═════════════════════════════════════════════════════════════════════════ */
    {
      _id: "ca-un-world-water-development-report-2026",
      _type: "currentAffairs",
      slug: { _type: "slug", current: "un-world-water-development-report-2026-unesco" },
      title: "संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026: यूनेस्को द्वारा जारी — वैश्विक जल संकट व MPPSC/UPSC विश्लेषण",
      titleEn: "UN World Water Development Report 2026 Released by UNESCO — Water Crisis & MPPSC/UPSC Notes",
      excerpt: "यूनेस्को (UNESCO) द्वारा UN-Water की ओर से जारी 'संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026' के मुख्य बिंदु। जल संसाधनों का प्रबंधन, सतत विकास लक्ष्य 6 और MPPSC व UPSC परीक्षा उपयोगी नोट्स।",
      excerptEn: "UNESCO published the UN World Water Development Report 2026 highlighting global aquifer depletion, climate resilience, and SDG 6 targets. Read comprehensive breakdown for MPPSC & UPSC.",
      ca_date: "2026-09-08",
      publishedAt: new Date().toISOString(),
      featured: true,
      readingTime: 9,
      keywords: [
        "संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026",
        "UN World Water Development Report 2026",
        "UNESCO Water Report 2026",
        "SDG 6 Clean Water Sanitation",
        "MPPSC Water Resource Management",
        "UPSC GS3 Environment Hydrology",
        "Jal Jeevan Mission MP",
        "Groundwater Depletion India",
      ],
      category: { _type: "reference", _ref: "cat-environment" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [
        { _type: "reference", _ref: "tag-mppsc" },
        { _type: "reference", _ref: "tag-upsc" },
        { _type: "reference", _ref: "tag-prelims" },
        { _type: "reference", _ref: "tag-mains" },
        { _type: "reference", _ref: "tag-international-affairs" },
      ],
      syllabus: ["MPPSC Mains Paper 3 Units 9 & 10 Water Resources & Hydrology", "UPSC GS-3 Environment & Water Management"],
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetWater._id },
        alt: "UN World Water Development Report 2026 Published by UNESCO Groundwater Hydrology",
      },
      sections: [
        {
          _key: "sec-water-1",
          kind: "whyInNews",
          title: "चर्चा में क्यों?",
          titleEn: "Why in News?",
          body: createBlocks([
            "संयुक्त राष्ट्र शैक्षिक, वैज्ञानिक तथा सांस्कृतिक संगठन (UNESCO) द्वारा 'UN-Water' की ओर से विश्व जल दिवस (22 मार्च) के अवसर पर वार्षिक 'संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026' (UN World Water Development Report 2026) जारी की गई है।",
            "यह वैश्विक रिपोर्ट मीठे पानी (Freshwater) के घटते संसाधनों, भूजल के अत्यधिक दोहन, और जलवायु परिवर्तन से जल चक्र पर पड़ रहे दुष्प्रभावों की वैश्विक समीक्षा प्रस्तुत करती है।"
          ]),
          bodyEn: createBlocks([
            "On behalf of UN-Water, UNESCO published the flagship UN World Water Development Report 2026 on World Water Day.",
            "The report provides a authoritative global review of depletion of freshwater aquifers, agricultural groundwater extraction, and climate mitigation strategies."
          ]),
        },
        {
          _key: "sec-water-2",
          kind: "keyHighlights",
          title: "रिपोर्ट के प्रमुख वैश्विक आंकड़े एवं भारत की स्थिति",
          titleEn: "Key Global Findings & India's Groundwater Crisis",
          body: createBlocks([
            "• सुरक्षित पेयजल का अभाव: दुनिया की 26% आबादी (लगभग 2 अरब लोग) के पास सुरक्षित पेयजल की पहुंच नहीं है, जबकि 46% आबादी सुरक्षित स्वच्छता सुविधाओं से वंचित है।",
            "• भारत: विश्व का सबसे बड़ा भूजल उपभोक्ता: भारत दुनिया में निष्कर्षित कुल भूजल का 25% अकेले उपयोग करता है (चीन और यूएसए के कुल योग से अधिक), जिसमें से 89% भाग का उपयोग केवल कृषि सिंचाई के लिए होता है।",
            "• सतत विकास लक्ष्य 6 (SDG 6): रिपोर्ट चेतावनी देती है कि यदि वर्तमान जल दोहन जारी रहा तो वर्ष 2030 तक सभी के लिए स्वच्छ जल और स्वच्छता (SDG 6.1 & 6.2) हासिल करने का लक्ष्य पिछड़ जाएगा।",
            "• हिमनदों का पिघलना: हिमालयी ग्लेशियरों के तेजी से पिघलने के कारण सिंधु, गंगा और ब्रह्मपुत्र नदी घाटियों में मौसमी जल उपलब्धता पर गंभीर संकट उत्पन्न हो रहा है।"
          ]),
          bodyEn: createBlocks([
            "• Global Clean Water Deficit: 26% of the world's population lacks access to safely managed drinking water, and 46% lacks safe sanitation.",
            "• India: World's Largest Groundwater Abstractor: India accounts for ~25% of global groundwater extraction, of which 89% is consumed by agricultural irrigation.",
            "• SDG 6 Progress Lag: Mandates urgent triple investments to avoid missing universal clean water & sanitation targets (SDG 6) by 2030.",
            "• Himalayan Cryosphere Melt: Accelerated retreat of Himalayan glaciers threatens seasonal discharge in Indus, Ganga, and Brahmaputra basins."
          ]),
        },
        {
          _key: "sec-water-3",
          kind: "background",
          title: "भारत एवं मध्य प्रदेश में जल संरक्षण योजनाएं",
          titleEn: "Water Conservation Schemes in India & Madhya Pradesh",
          body: createBlocks([
            "• जल जीवन मिशन (Jal Jeevan Mission): भारत सरकार द्वारा 2024-26 के तहत प्रत्येक ग्रामीण परिवार को हर घर जल (FHTC) नल कनेक्शन प्रदान करना।",
            "• अटल भूजल योजना (Atal Bhujal Yojana): भारत सरकार और 'विश्व बैंक' (World Bank - 50:50 वित्तीय भागीदारी) द्वारा 7 राज्यों में भूजल रीचार्ज हेतु संचालित।",
            "• मध्य प्रदेश 'बलराम ताल योजना': वर्ष 2007 में मध्य प्रदेश शासन द्वारा कृषकों के खेतों में वर्षा जल संचयन हेतु बलराम ताल निर्माण पर अनुदान योजना शुरू की गई।",
            "• जलाभिषेक अभियान (MP): मध्य प्रदेश में 'जल ही जीवन है' के संकल्प के साथ जन-भागीदारी द्वारा 1,00,000 से अधिक जल संरचनाओं (तालाब, स्टॉप डैम, बोरी बंधान) का निर्माण।"
          ]),
          bodyEn: createBlocks([
            "• Jal Jeevan Mission: Mandates providing functional household tap connections (FHTC) to rural households.",
            "• Atal Bhujal Yojana: Co-funded 50:50 by GoI and the World Bank across 7 water-stressed states for community groundwater management.",
            "• MP's Balaram Tal Yojana: Launched in 2007 in MP to subsidize farm pond construction for rainwater harvesting.",
            "• Jalabhishek Abhiyan (MP): Community-driven campaign in MP building over 100,000 rain catchment structures."
          ]),
        },
        {
          _key: "sec-water-4",
          kind: "syllabusInterlinking",
          title: "MPPSC एवं UPSC परीक्षा जुड़ाव",
          titleEn: "MPPSC & UPSC Syllabus Interlinking",
          body: createBlocks([
            "• MPPSC मुख्य परीक्षा: पेपर 3 (इकाई 10) - 'भूजल संरक्षण, वर्षा जल संचयन, जल निकाय व जल संसाधन प्रबंधन' तथा इकाई 9 (पर्यावरण)।",
            "• UPSC मुख्य परीक्षा: GS Paper 3 - 'जल संसाधन प्रबंधन, जलवायु परिवर्तन व पर्यावरण निम्नीकरण'।",
            "• प्रारंभिक परीक्षा तथ्य: यूनेस्को (मुख्यालय: पेरिस), विश्व जल दिवस (22 मार्च), SDG 6 (स्वच्छ जल), बलराम ताल योजना (2007), और अटल भूजल योजना (विश्व बैंक)।"
          ]),
          bodyEn: createBlocks([
            "• MPPSC Mains: Paper 3 (Unit 10) - Groundwater Recharge, Rainwater Harvesting, Water Resources & Hydrology + Unit 9.",
            "• UPSC Mains: GS Paper 3 - Environmental Pollution, Conservation & Water Management.",
            "• Prelims Quick Facts: UNESCO HQ (Paris), World Water Day (March 22), SDG 6 (Clean Water), Balaram Tal Yojana (2007), and World Bank Atal Bhujal Yojana."
          ]),
        },
      ],
      faqs: [
        { _key: "f1", question: "विश्व जल विकास रिपोर्ट किसके द्वारा जारी की जाती है?", answer: "यह रिपोर्ट संयुक्त राष्ट्र की ओर से यूनेस्को (UNESCO) द्वारा प्रतिवर्ष प्रकाशित की जाती है।", questionEn: "Who publishes the UN World Water Development Report?", answerEn: "It is published annually by UNESCO on behalf of UN-Water." },
        { _key: "f2", question: "यूनेस्को (UNESCO) का मुख्यालय कहाँ स्थित है?", answer: "यूनेस्को का मुख्यालय पेरिस (फ्रांस) में स्थित है।", questionEn: "Where is the Headquarters of UNESCO situated?", answerEn: "Headquartered in Paris, France." },
        { _key: "f3", question: "सतत विकास लक्ष्य 6 (SDG 6) किससे संबंधित है?", answer: "SDG 6 वर्ष 2030 तक सभी के लिए स्वच्छ जल और स्वच्छता (Clean Water and Sanitation) की उपलब्धता सुनिश्चित करने से संबंधित है।", questionEn: "What does UN Sustainable Development Goal 6 (SDG 6) address?", answerEn: "SDG 6 mandates ensuring availability and sustainable management of clean water and sanitation for all by 2030." },
        { _key: "f4", question: "विश्व जल दिवस (World Water Day) किस तिथि को मनाया जाता है?", answer: "प्रतिवर्ष 22 मार्च को विश्व जल दिवस मनाया जाता है।", questionEn: "On which date is World Water Day celebrated globally?", answerEn: "World Water Day is observed every year on March 22." },
        { _key: "f5", question: "मध्य प्रदेश में जल संरक्षण हेतु कौन सी प्रमुख योजनाएं संचालित हैं?", answer: "बलराम ताल योजना, जलाभिषेक अभियान, और खेत-तालाब योजना।", questionEn: "Which key water conservation schemes operate in Madhya Pradesh?", answerEn: "Balaram Tal Yojana, Jalabhishek Abhiyan, and Khet-Talab Yojana." },
        { _key: "f6", question: "भारत की 'अटल भूजल योजना' किस संस्था के सहयोग से चलाई जा रही है?", answer: "अटल भूजल योजना भारत सरकार और 'विश्व बैंक' (World Bank) के 50:50 वित्तीय सहयोग से संचालित है।", questionEn: "Which international agency co-funds India's Atal Bhujal Yojana?", answerEn: "The World Bank (50:50 cost sharing with GoI)." },
      ],
      mcqs: [
        {
          _key: "m1",
          question: "वार्षिक 'संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026' किस अंतर्राष्ट्रीय संस्था द्वारा प्रकाशित की गई है?",
          questionEn: "The annual 'UN World Water Development Report 2026' was released by which international organization?",
          options: ["UNEP", "UNESCO (यूनेस्को)", "UNDP", "विश्व बैंक"],
          optionsEn: ["UNEP", "UNESCO", "UNDP", "World Bank"],
          correctIndex: 1,
          explanation: "यह रिपोर्ट UN-Water की ओर से यूनेस्को (UNESCO) द्वारा प्रकाशित की जाती है।",
          explanationEn: "Published annually by UNESCO on behalf of UN-Water.",
        },
        {
          _key: "m2",
          question: "संयुक्त राष्ट्र के किस सतत विकास लक्ष्य (SDG) में 'स्वच्छ जल और स्वच्छता' का प्रावधान है?",
          questionEn: "Which United Nations Sustainable Development Goal (SDG) targets 'Clean Water and Sanitation'?",
          options: ["SDG 1", "SDG 3", "SDG 6", "SDG 13"],
          optionsEn: ["SDG 1", "SDG 3", "SDG 6", "SDG 13"],
          correctIndex: 2,
          explanation: "SDG 6 वर्ष 2030 तक सभी के लिए स्वच्छ जल व स्वच्छता सुनिश्चित करने का लक्ष्य रखता है।",
          explanationEn: "SDG 6 guarantees clean water and sanitation access.",
        },
        {
          _key: "m3",
          question: "विश्व भर में प्रतिवर्ष 'विश्व जल दिवस' (World Water Day) किस तिथि को मनाया जाता है?",
          questionEn: "On which date is World Water Day observed every year?",
          options: ["22 फरवरी", "22 मार्च", "22 अप्रैल", "5 जून"],
          optionsEn: ["February 22", "March 22", "April 22", "June 5"],
          correctIndex: 1,
          explanation: "प्रत्येक वर्ष 22 मार्च को विश्व जल दिवस मनाया जाता है (22 अप्रैल पृथ्वी दिवस, 5 जून पर्यावरण दिवस)।",
          explanationEn: "March 22 is World Water Day.",
        },
        {
          _key: "m4",
          question: "भारत में सामुदायिक भागीदारी के साथ भूजल प्रबंधन हेतु 'अटल भूजल योजना' में किस संस्था की 50% वित्तीय भागीदारी है?",
          questionEn: "Which agency provides 50% co-funding for India's Atal Bhujal Yojana?",
          options: ["एशियाई विकास बैंक (ADB)", "विश्व बैंक (World Bank)", "अंतर्राष्ट्रीय मुद्रा कोष (IMF)", "BRICS बैंक"],
          optionsEn: ["Asian Development Bank", "World Bank", "International Monetary Fund", "BRICS Bank"],
          correctIndex: 1,
          explanation: "अटल भूजल योजना भारत सरकार और विश्व बैंक के 50:50 सहयोग से 7 राज्यों में संचालित है।",
          explanationEn: "Atal Bhujal Yojana is co-funded by the World Bank.",
        },
        {
          _key: "m5",
          question: "मध्य प्रदेश में कृषि योग्य भूमि के लिए जल संरक्षण हेतु संचालित 'बलराम ताल योजना' किस वर्ष शुरू की गई थी?",
          questionEn: "In which year was the 'Balaram Tal Yojana' for farm pond water harvesting launched in MP?",
          options: ["2007", "2014", "2019", "2021"],
          optionsEn: ["2007", "2014", "2019", "2021"],
          correctIndex: 0,
          explanation: "मध्य प्रदेश में बलराम ताल योजना वर्ष 2007 में कृषकों को खेत में तालाब निर्माण पर अनुदान हेतु शुरू हुई थी।",
          explanationEn: "Balaram Tal Yojana was introduced in MP in 2007.",
        },
        {
          _key: "m6",
          question: "विश्व में भूजल (Groundwater) का सबसे बड़ा निष्कर्षणकर्ता (Abstractor) देश कौन सा है?",
          questionEn: "Which country is the world's largest consumer/abstractor of groundwater?",
          options: ["चीन", "संयुक्त राज्य अमेरिका", "भारत", "ब्राजील"],
          optionsEn: ["China", "United States", "India", "Brazil"],
          correctIndex: 2,
          explanation: "भारत विश्व में कुल निष्कर्षित भूजल का 25% से अधिक अकेले उपयोग करता है जो चीन व यूएसए के योग से भी अधिक है।",
          explanationEn: "India is the world's largest user of groundwater (~25% of global total).",
        },
        {
          _key: "m7",
          question: "MPPSC मुख्य परीक्षा के नए पाठ्यक्रम के अनुसार 'जल संसाधन एवं जल विज्ञान (Hydrology)' किस पेपर की इकाई है?",
          questionEn: "In the MPPSC Mains syllabus, 'Water Resources and Hydrology' is prescribed under which paper?",
          options: ["पेपर 1 (इकाई 2)", "पेपर 2 (इकाई 5)", "पेपर 3 (इकाई 10)", "पेपर 4 (इकाई 3)"],
          optionsEn: ["Paper 1 (Unit 2)", "Paper 2 (Unit 5)", "Paper 3 (Unit 10)", "Paper 4 (Unit 3)"],
          correctIndex: 2,
          explanation: "MPPSC मुख्य परीक्षा के पेपर 3 की इकाई 10 में जल संसाधन, भूजल रीचार्ज और भू-विज्ञान शामिल हैं।",
          explanationEn: "Unit 10 of MPPSC Mains Paper 3 covers Geology, Water Resources & Hydrology.",
        },
        {
          _key: "m8",
          question: "यूनेस्को (UNESCO) का पूरा नाम क्या है?",
          questionEn: "What is the full expansion of the acronym UNESCO?",
          options: [
            "United Nations Educational, Scientific and Cultural Organization",
            "United Nations Environment and Social Conservation Organization",
            "United Nations Energy and Science Commission",
            "Universal Network of Education and Science Officers"
          ],
          optionsEn: [
            "United Nations Educational, Scientific and Cultural Organization",
            "United Nations Environment and Social Conservation Organization",
            "United Nations Energy and Science Commission",
            "Universal Network of Education and Science Officers"
          ],
          correctIndex: 0,
          explanation: "यूनेस्को का पूर्ण नाम 'संयुक्त राष्ट्र शैक्षिक, वैज्ञानिक तथा सांस्कृतिक संगठन' है।",
          explanationEn: "UNESCO stands for United Nations Educational, Scientific and Cultural Organization.",
        },
      ],
    },
  ];

  for (const article of articles) {
    console.log(`Writing rich article to Sanity: ${article.titleEn} (${article._id})...`);
    
    // Also build a top-level body and bodyEn array combining all section blocks for full rendering compatibility
    const allHiBlocks: any[] = [];
    const allEnBlocks: any[] = [];

    for (const sec of article.sections) {
      // Add section title heading block
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
        children: [{ _key: `spnh-en-${sec._key}`, _type: "span", text: sec.titleEn }]
      });
      if (sec.bodyEn) allEnBlocks.push(...sec.bodyEn);
    }

    const docToSave = {
      ...article,
      body: allHiBlocks,
      bodyEn: allEnBlocks,
    };

    await client.createOrReplace(docToSave);
    console.log(`✔ Successfully uploaded rich content for: ${article.slug.current}`);
  }

  console.log("🎉 ALL 7 ARTICLES RE-UPLOADED WITH EXHAUSTIVE RICH BODY CONTENT TO SANITY CMS!");
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
