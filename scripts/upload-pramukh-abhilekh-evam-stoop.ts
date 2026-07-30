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

// Helper to convert an array of strings into separate Portable Text blocks
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

// Helper to create a custom table block
function createTable(key: string, caption: string, headers: string[], rows: string[][]): any {
  return {
    _key: key,
    _type: "table",
    table: {
      caption,
      headers,
      rows,
    },
  };
}

async function main() {
  console.log("🚀 Starting upload for Ancient India Inscriptions & Stupas (भारत के प्रमुख अभिलेख एवं स्तूप) Article...");

  // Image file paths in public/images/blog/
  const imagePaths = {
    featured: path.resolve(process.cwd(), "public/images/blog/pramukh-abhilekh-1.png"),
    stupa: path.resolve(process.cwd(), "public/images/blog/pramukh-abhilekh-2.png"),
  };

  // Upload images to Sanity
  console.log("📸 Uploading images to Sanity...");
  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imagePaths.featured), {
    filename: "ancient_indian_rock_inscription_ashoka.png",
  });
  const assetStupa = await client.assets.upload("image", fs.createReadStream(imagePaths.stupa), {
    filename: "sanchi_stupa_madhya_pradesh.png",
  });
  console.log(`✔ Uploaded assets. Inscriptions: ${assetFeatured._id}, Stupa: ${assetStupa._id}`);

  // Delete old document if type was generalAwareness
  try {
    await client.delete("sgk-bharat-ke-pramukh-abhilekh-evam-stoop");
  } catch (e) {}

  // Construct Article Document (staticGk)
  const article = {
    _id: "sgk-bharat-ke-pramukh-abhilekh-evam-stoop",
    _type: "staticGk",
    slug: { _type: "slug", current: "bharat-ke-pramukh-abhilekh-evam-stoop-mppsc-upsc-notes" },
    title: "भारत के प्रमुख अभिलेख एवं स्तूप (Ancient Inscriptions & Stupas) | MPPSC & UPSC के लिए महत्वपूर्ण तथ्य, सूची, इतिहास व PDF",
    titleEn: "Major Inscriptions & Stupas of Ancient India: List, Ashokan Edicts, Eran, Junagadh & MPPSC / UPSC Notes PDF",
    excerpt: "प्राचीन भारत के प्रमुख अभिलेख (Inscriptions) और बौद्ध स्तूप (Stupas) का संपूर्ण अध्ययन गाइड। मास्की, गुर्जरा (दतिया), एरण (सागर), रुम्मिनदेई, हाथीगुम्फा, जूनागढ़, प्रयाग प्रशस्ति, ऐहोल अभिलेख एवं साँची, भरहुत, धामेक व केसरिया स्तूप के संस्थापक, विशेषताएं, MPPSC (इतिहास व म.प्र. सामान्य ज्ञान) एवं UPSC परीक्षा नोट्स।",
    excerptEn: "Complete study guide on Major Inscriptions & Stupas of Ancient India for MPPSC & UPSC. Covers Maski, Gurjara, Eran, Rummindei, Hathigumpha, Junagadh, Prayag Prasasti, Aihole, Sanchi, Bharhut, Dhamek, and Kesariya stupas.",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 10,
    keywords: [
      "भारत के प्रमुख अभिलेख",
      "भारत के प्रमुख अभिलेख एवं स्तूप",
      "प्राचीन भारत के प्रमुख अभिलेख pdf",
      "अशोक के अभिलेख PDF",
      "अशोक के अभिलेख UPSC",
      "अशोक के अभिलेख Drishti IAS",
      "प्राचीन भारत के इतिहास के स्रोतों का वर्णन कीजिए",
      "अशोक के शिलालेख कितने हैं",
      "bharat ke pramukh abhilekh mppsc",
      "मध्य प्रदेश के अभिलेख और उनसे सम्बन्धित राजवंश",
      "मास्की अभिलेख",
      "गुर्जरा अभिलेख दतिया",
      "एरण अभिलेख सागर भानुगुप्त",
      "रुम्मिनदेई अभिलेख लुम्बिनी",
      "हाथीगुम्फा अभिलेख खारवेल",
      "जूनागढ़ अभिलेख रुद्रदामन",
      "प्रयाग प्रशस्ति समुद्रगुप्त हरिषेण",
      "ऐहोल अभिलेख पुलकेशिन II रविकीर्ति",
      "मंदसौर अभिलेख रेशम बुनकर",
      "नासिक अभिलेख सातवाहन",
      "साँची स्तूप अशोक जनरल टेलर",
      "भरहुत स्तूप कनिंघम",
      "धामेक स्तूप सारनाथ",
      "केसरिया स्तूप बिहार",
      "बोरोबुदुर स्तूप इंडोनेशिया"
    ],
    category: { _type: "reference", _ref: "cat-history" },
    author: { _type: "reference", _ref: "author-aakar" },
    // MPPSC Priority Rule: Put tag-mppsc before tag-upsc
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["History-Ancient", "MPPSC-Paper-1-History", "MP-GK-History", "UPSC-GS-1"],

    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetFeatured._id },
      alt: "Ancient Indian Rock Inscriptions and Ashokan Edicts MPPSC UPSC History Notes",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Introduction & Overview ────────────────────────────── */
      {
        _key: "sec-intro",
        kind: "overview",
        title: "अभिलेख और स्तूप क्या हैं? (What are Inscriptions & Stupas?)",
        titleEn: "What are Inscriptions & Stupas?",
        body: [
          ...createBlocks([
            "प्राचीन भारतीय इतिहास के पुनर्निर्माण में **अभिलेख (Inscriptions)** और **स्तूप (Stupas)** प्राथमिक और सर्वाधिक प्रामाणिक पुरातात्विक स्रोत (Archaeological Sources) माने जाते हैं।",
            "• **अभिलेख (Inscriptions)**: वे ऐतिहासिक लेख हैं जिन्हें पत्थरों, स्तंभों, चट्टानों, गुफाओं की दीवारों, ताम्रपत्रों (Copper Plates) या सिक्कों पर उत्कीर्ण किया जाता था। अभिलेखों के अध्ययन को **पुरालेखशास्त्र (Epigraphy)** तथा इनकी लिपि के अध्ययन को **पुरालिपिशास्त्र (Palaeography)** कहा जाता है। इनसे तत्कालीन शासकों की विजयों, प्रशासनिक नीतियों, धर्म, दान तथा सामाजिक-आर्थिक स्थिति का प्रामाणिक ब्योरा मिलता है।",
            "• **स्तूप (Stupas)**: बौद्ध स्थापत्य कला के उत्कृष्ट प्रतीक हैं। स्तूप का शाब्दिक अर्थ 'थूहा' या 'ढेर' होता है, जिसमें महात्मा बुद्ध अथवा उनके प्रमुख शिष्यों के पवित्र अस्थि-अवशेषों (Relics) को स्थापित करके उसके ऊपर एक अर्धगोलाकार गुंबद (Dome) का निर्माण किया जाता था।",
            "• **परीक्षा उपयोगिता**: यह विषय [MPPSC प्रारंभिक परीक्षा](/mppsc/prelims-syllabus) (इतिहास व म.प्र. सामान्य ज्ञान) एवं [MPPSC मुख्य परीक्षा (प्रथम प्रश्नपत्र - इतिहास व संस्कृति)](/mppsc/mains-syllabus) के लिए अत्यंत महत्वपूर्ण है।"
          ]),
          createTable(
            "table-inscriptions-overview",
            "भारत के प्रमुख अभिलेख व स्तूप: एक नज़र में (Quick Summary Table)",
            ["अभिलेख / स्तूप", "स्थान / राज्य", "संबंधित शासक / खोजकर्ता", "प्रमुख ऐतिहासिक विशेषता"],
            [
              ["**मास्की अभिलेख**", "रायचूर (कर्नाटक)", "सम्राट अशोक", "पहली बार 'देवानामप्रिय अशोक' नाम का स्पष्ट उल्लेख"],
              ["**गुर्जरा अभिलेख**", "दतिया (मध्य प्रदेश)", "सम्राट अशोक", "अशोक के व्यक्तिगत नाम का उल्लेख"],
              ["**एरण अभिलेख**", "सागर (मध्य प्रदेश)", "भानुगुप्त (गुप्त वंश)", "भारत में सती प्रथा का प्रथम अभिलेखीय साक्ष्य & हूण आक्रमण"],
              ["**रुम्मिनदेई अभिलेख**", "लुम्बिनी (नेपाल)", "सम्राट अशोक", "भगवान बुद्ध के जन्मस्थान की पुष्टि & धार्मिक कर (बल) छूट"],
              ["**हाथीगुम्फा अभिलेख**", "उदयगिरि (ओडिशा)", "कलिंगराज खारवेल", "खारवेल की 13 वर्षों की उपलब्धियों का प्राकृत वर्णन"],
              ["**जूनागढ़ अभिलेख**", "गिरनार (गुजरात)", "रुद्रदामन (शक शासक)", "संस्कृत भाषा का प्रथम दीर्घ अभिलेख & सुदर्शन झील"],
              ["**प्रयाग प्रशस्ति**", "प्रयागराज (उत्तर प्रदेश)", "समुद्रगुप्त (रचयिता: हरिषेण)", "समुद्रगुप्त की भारत विजयों का विस्तृत चंपू शैली वर्णन"],
              ["**ऐहोल अभिलेख**", "कर्नाटक", "पुलकेशिन द्वितीय (रचयिता: रविकीर्ति)", "हर्षवर्धन पर चालुक्य सम्राट पुलकेशिन II की विजय"],
              ["**साँची स्तूप**", "रायसेन (मध्य प्रदेश)", "सम्राट अशोक (खोज: जनरल टेलर 1818)", "भारत का सबसे प्रसिद्ध बौद्ध स्तूप & UNESCO विश्व धरोहर"],
              ["**केसरिया स्तूप**", "पूर्वी चंपारण (बिहार)", "मौर्य / गुप्त काल", "भारत का सबसे बड़ा बौद्ध स्तूप (ऊँचाई ~104 फीट)"]
            ]
          )
        ],
        bodyEn: [
          ...createBlocks([
            "Inscriptions (Epigraphs) and Stupas serve as primary archaeological sources for reconstructing Ancient Indian History.",
            "• **Epigraphy**: The study of inscriptions carved on rocks, pillars, copper plates, and caves.",
            "• **Stupas**: Hemispherical structures containing relics of Lord Buddha and Buddhist monks.",
            "• **Target Exams**: Crucial for [MPPSC Prelims & Mains Paper-1 (History)](/mppsc/mains-syllabus) and UPSC GS-1."
          ])
        ],
      },

      /* ── 2. Major Inscriptions of India ────────────────────────── */
      {
        _key: "sec-major-inscriptions",
        kind: "keyAspects",
        title: "भारत के प्रमुख अभिलेख (Major Inscriptions of India & Kings)",
        titleEn: "Major Inscriptions of Ancient India",
        body: [
          ...createBlocks([
            "प्रतियोगी परीक्षाओं की दृष्टि से भारत के 10 सबसे महत्वपूर्ण अभिलेखों का विस्तृत विवरण निम्नलिखित है:",
            "### 1. मास्की अभिलेख (कर्नाटक)",
            "• **स्थान**: रायचूर जिला, कर्नाटक।",
            "• **शासक**: मौर्य सम्राट अशोक।",
            "• **विशेषता**: इस लघु शिलालेख में पहली बार **'देवानामप्रिय अशोक' (Devanampriya Ashok)** नाम का स्पष्ट उल्लेख प्राप्त होता है। इससे पूर्व शिलालेखों में केवल 'देवानामप्रिय प्रियदस्सी' लिखा मिलता था।",
            "### 2. गुर्जरा अभिलेख (दतिया, मध्य प्रदेश)",
            "• **स्थान**: दतिया जिला, मध्य प्रदेश।",
            "• **शासक**: मौर्य सम्राट अशोक।",
            "• **विशेषता**: मास्की की भाँति इस अभिलेख में भी सम्राट अशोक के व्यक्तिगत नाम **'अशोक'** का स्पष्ट उल्लेख मिलता है। [MPPSC Notes Portal](/mppsc-notes) में मध्य प्रदेश के अशोककालीन अभिलेखों की विस्तृत सूची दी गई है।",
            "### 3. एरण अभिलेख (सागर, मध्य प्रदेश)",
            "• **स्थान**: सागर जिला, मध्य प्रदेश।",
            "• **शासक**: गुप्त सम्राट भानुगुप्त (510 ईस्वी)।",
            "• **विशेषता**: यह अभिलेख दो ऐतिहासिक कारणों से अति प्रसिद्ध है— (1) भारत में **सती प्रथा का प्रथम अभिलेखीय साक्ष्य (First Inscriptional Evidence of Sati)**, जहाँ भानुगुप्त के सेनापति गोपराज की मृत्यु पर उनकी पत्नी के सती होने का वर्णन है; (2) मध्य भारत पर **हूणों (Hunas) के आक्रमण** और तोरमाण का उल्लेख।",
            "### 4. रुम्मिनदेई अभिलेख (लुम्बिनी, नेपाल)",
            "• **स्थान**: लुम्बिनी, नेपाल।",
            "• **शासक**: मौर्य सम्राट अशोक।",
            "• **विशेषता**: यह अशोक का एकमात्र **आर्थिक अभिलेख (Economic Edict)** है। इसमें भगवान बुद्ध के जन्मस्थान की पुष्टि होती है। अशोक ने यहाँ की यात्रा कर कर (Tax) की दर 1/6 से घटाकर 1/8 कर दी थी तथा 'बलि' (धार्मिक कर) को पूरी तरह माफ कर दिया था।",
            "### 5. हाथीगुम्फा अभिलेख (ओडिशा)",
            "• **स्थान**: उदयगिरि पहाड़ियाँ, भुवनेश्वर, ओडिशा।",
            "• **शासक**: चेदि/महामेघवाहन वंश के शासक कलिंगराज **खारवेल (Kharavela)**।",
            "• **विशेषता**: प्राकृत भाषा और ब्राह्मी लिपि में उत्कीर्ण यह अभिलेख बिना तिथि वाला (Undated) है। इसमें राजा खारवेल की 13 वर्षों के शासनकाल की सैन्य उपलब्धियों, नहर निर्माण और भारतवर्ष शब्द के प्रथम प्रयोग की जानकारी मिलती है।",
            "### 6. जूनागढ़ अभिलेख (गिरनार, गुजरात)",
            "• **स्थान**: गिरनार, गुजरात।",
            "• **शासक**: शक महाक्षत्रप **रुद्रदामन प्रथम (Rudradaman I)** (150 ईस्वी)।",
            "• **विशेषता**: यह **संस्कृत भाषा का प्रथम दीर्घ अभिलेख (First Long Sanskrit Inscription)** है। इसमें प्रसिद्ध **सुदर्शन झील (Sudarshana Lake)** के निर्माण और पुनर्निर्माण का इतिहास दर्ज है (चंद्रगुप्त मौर्य, अशोक, रुद्रदामन तथा स्कंदगुप्त का उल्लेख)।",
            "### 7. प्रयाग प्रशस्ति (इलाहाबाद स्तंभ लेख)",
            "• **स्थान**: प्रयागराज (उत्तर प्रदेश)।",
            "• **शासक**: गुप्त सम्राट **समुद्रगुप्त (Samudragupta)**।",
            "• **रचनाकार**: समुद्रगुप्त के संधिग्राहक एवं दरबारी कवि **हरिषेण (Harisena)**।",
            "• **विशेषता**: यह संस्कृत भाषा की **चंपू शैली (गद्य-पद्य मिश्रित)** में लिखा गया है। इसमें समुद्रगुप्त की आर्यावर्त, दक्षिणापथ और आटविक राज्यों पर विजयों (उत्तरी व दक्षिणी भारत अभियान) का विशद वर्णन है।",
            "### 8. ऐहोल अभिलेख (कर्नाटक)",
            "• **स्थान**: बीजापुर/बागलकोट, कर्नाटक।",
            "• **शासक**: चालुक्य सम्राट **पुलकेशिन द्वितीय (Pulakeshin II)**।",
            "• **रचनाकार**: जैन कवि **रविकीर्ति (Ravikirti)**।",
            "• **विशेषता**: इस प्रशस्ति में नर्मदा नदी के तट पर उत्तर भारत के सम्राट **हर्षवर्धन (Harshavardhana)** पर पुलकेशिन द्वितीय की ऐतिहासिक विजय का उल्लेख है। इसमें कालिदास और भारवि की काव्य शैली का प्रभाव दिखता है।",
            "### 9. मंदसौर अभिलेख (मध्य प्रदेश)",
            "• **स्थान**: मंदसौर, मध्य प्रदेश।",
            "• **शासक**: मालव नरेश विश्ववर्मा एवं बंधुवर्मा (द्वितीय चंद्रगुप्त / कुमारगुप्त काल)।",
            "• **रचनाकार**: वत्सभट्टि।",
            "• **विशेषता**: इसमें लाट प्रदेश (गुजरात) से आकर मंदसौर में बसे **रेशम बुनकरों की श्रेणी (Silk Weavers Guild)** द्वारा भव्य सूर्य मंदिर के निर्माण एवं मरम्मत का उल्लेख मिलता है। यह प्राचीन भारत का पहला विज्ञापन साक्ष्य माना जाता है।",
            "### 10. नासिक अभिलेख (महाराष्ट्र)",
            "• **स्थान**: नासिक गुफाएं, महाराष्ट्र।",
            "• **शासक**: सातवाहन सम्राट **गौतमीपुत्र शातकर्णी (Gautamiputra Satakarni)**।",
            "• **रचनाकार**: उनकी माता गौतमी बलश्री।",
            "• **विशेषता**: इसमें गौतमीपुत्र शातकर्णी की शकों पर विजय, उनकी सैनिक उपलब्धियों और 'अद्वितीय ब्राह्मण' की उपाधि का वर्णन है।"
          ])
        ],
        bodyEn: [
          ...createBlocks([
            "### Major Ancient Indian Inscriptions",
            "• **Maski (Karnataka)**: First inscription mentioning 'Devanampriya Ashok'.",
            "• **Gurjara (MP)**: Explicitly names King Ashoka.",
            "• **Eran (MP)**: Bhanugupta's 510 AD inscription - earliest evidence of Sati and Huna invasion.",
            "• **Rummindei (Nepal)**: Confirms Buddha's birthplace and tax exemptions by Ashoka.",
            "• **Hathigumpha (Odisha)**: King Kharavela's 13-year reign in Prakrit.",
            "• **Junagadh (Gujarat)**: Rudradaman I's first long Sanskrit inscription on Sudarshana Lake.",
            "• **Prayag Prasasti (UP)**: Written by Harisena in Champu style praising Samudragupta.",
            "• **Aihole (Karnataka)**: Written by Ravikirti recording Pulakeshin II's victory over Harshavardhana.",
            "• **Mandsaur (MP)**: Mentions Silk Weavers Guild and Sun Temple construction.",
            "• **Nasik (Maharashtra)**: Satavahana King Gautamiputra Satakarni's achievements."
          ])
        ],
      },

      /* ── 3. Major Stupas of India ─────────────────────────────── */
      {
        _key: "sec-major-stupas",
        kind: "keyAspects",
        title: "भारत के प्रमुख स्तूप एवं बौद्ध वास्तुकला (Major Stupas of India & World)",
        titleEn: "Major Stupas of Ancient India & Architecture",
        body: [
          ...createBlocks([
            "स्थापत्य कला एवं बौद्ध धर्म के प्रचार की दृष्टि से निम्नलिखित स्तूप परीक्षाओं में बार-बार पूछे जाते हैं:",
            "### 1. साँची स्तूप (रायसेन, मध्य प्रदेश)",
            "• **निर्माता**: मौर्य सम्राट **अशोक (3rd Century BCE)**।",
            "• **पुनरुद्धार**: शुंग काल (पुष्यमित्र व अग्निमित्र) में इसे पाषाण वेष्टनी (Stone Railings) और तोरण द्वारों से सजाया गया।",
            "• **खोजकर्ता**: वर्ष **1818 में ब्रिटिश अधिकारी जनरल टेलर (General Taylor)** ने साँची के स्तूपों की खोज की थी।",
            "• **विश्व धरोहर**: वर्ष **1989** में UNESCO द्वारा इसे **विश्व धरोहर स्थल (UNESCO World Heritage Site)** घोषित किया गया।",
            "### 2. भरहुत स्तूप (सतना, मध्य प्रदेश)",
            "• **स्थान**: सतना जिला, मध्य प्रदेश।",
            "• **संबंधित काल**: शुंगकालीन कला का सर्वोत्कृष्ट उदाहरण।",
            "• **खोजकर्ता**: वर्ष **1873 में सर एलेक्जेंडर कनिंघम (Sir Alexander Cunningham)** द्वारा खोजा गया।",
            "• **विशेषता**: भरहुत स्तूप की तोरण द्वारों पर बुद्ध के पूर्व जन्मों की **जातक कथाओं (Jataka Tales)** तथा यक्ष-यक्षियों के सुंदर चित्र उकेरे गए हैं।",
            "### 3. धामेक स्तूप (सारनाथ, उत्तर प्रदेश)",
            "• **स्थान**: सारनाथ (वाराणसी), उत्तर प्रदेश।",
            "• **महत्व**: यह वही स्थान है जहाँ भगवान बुद्ध ने ज्ञान प्राप्ति के पश्चात अपने प्रथम 5 शिष्यों को पहला उपदेश दिया था, जिसे **धर्मचक्रप्रवर्तन (Dhammacakkappavattana)** कहा जाता है।",
            "• **संरचना**: यह बेलनाकार (Cylindrical) स्तूप गुप्त काल में अपने वर्तमान भव्य रूप में निर्मित हुआ।",
            "### 4. केसरिया स्तूप (पूर्वी चंपारण, बिहार)",
            "• **स्थान**: चंपारण, बिहार।",
            "• **विशेषता**: यह **भारत का सबसे बड़ा बौद्ध स्तूप (Largest Buddhist Stupa in India)** माना जाता है, जिसकी ऊँचाई लगभग 104 फीट है। इसकी संरचना जावा के बोरोबुदुर स्तूप से मिलती-जुलती है।",
            "### 5. बोरोबुदुर स्तूप (जावा, इंडोनेशिया)",
            "• **स्थान**: जावा, इंडोनेशिया।",
            "• **निर्माता**: 8वीं-9वीं शताब्दी में **शैलेंद्र राजवंश (Sailendra Dynasty)** के बौद्ध राजाओं द्वारा निर्मित।",
            "• **विशेषता**: यह **विश्व का सबसे बड़ा बौद्ध स्तूप (World's Largest Buddhist Stupa)** एवं महायान बौद्ध धर्म का अद्भुत स्थापत्य केंद्र है।"
          ]),
          {
            _key: "b3-img-stupa",
            _type: "image",
            asset: { _type: "reference", _ref: assetStupa._id },
            alt: "Great Stupa at Sanchi Raisen Madhya Pradesh UNESCO World Heritage Site MPPSC UPSC Notes",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### Major Buddhist Stupas",
            "• **Sanchi Stupa (Raisen, MP)**: Built by Emperor Ashoka, discovered by General Taylor in 1818, UNESCO Heritage site in 1989.",
            "• **Bharhut Stupa (Satna, MP)**: Famous Shunga-era stupa discovered by Alexander Cunningham in 1873.",
            "• **Dhamek Stupa (Sarnath, UP)**: Commemorates Buddha's First Sermon (Dhammacakkappavattana).",
            "• **Kesariya Stupa (Bihar)**: India's largest stupa (~104 feet height).",
            "• **Borobudur Stupa (Indonesia)**: World's largest Buddhist stupa built by Sailendra Dynasty."
          ]),
          {
            _key: "b3-img-stupa-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetStupa._id },
            alt: "Great Stupa at Sanchi Raisen Madhya Pradesh UNESCO World Heritage Site MPPSC UPSC Notes",
          }
        ],
      },

      /* ── 4. Madhya Pradesh Special Inscriptions ────────────────── */
      {
        _key: "sec-mp-special",
        kind: "keyAspects",
        title: "मध्य प्रदेश के प्रमुख अभिलेख एवं स्तूप (MPPSC Special Notes)",
        titleEn: "Madhya Pradesh Specific Inscriptions & Stupas (MPPSC)",
        body: createBlocks([
          "### MPPSC प्रारंभिक व मुख्य परीक्षा हेतु मध्य प्रदेश विशेष अभिलेख",
          "• **गुर्जरा (दतिया)**: अशोक का लघु शिलालेख, जिसमें अशोक का नाम दर्ज है।",
          "• **रूपनाथ (सिहोरा, जबलपुर)**: अशोक का लघु शिलालेख, जहाँ शिव मंदिर परिसर में ब्राह्मी लिपि उत्कीर्ण है।",
          "• **पानगुराड़िया / सारो-मारो (सीहोर)**: अशोक का शिलालेख, जहाँ अशोक को 'महाराजकुमार' कहा गया है।",
          "• **साँची (रायसेन)**: अशोक का संघभेद अभिलेख (Schism Edict) तथा कनिष्क/गुप्तकालीन अभिलेख।",
          "• **एरण (सागर)**: सती प्रथा का पहला साक्ष्य (गोपराज सती स्तंभ 510 ई.) तथा वराह मूर्ति पर तोरमाण का अभिलेख।",
          "• **मंदसौर (दशपुर)**: बंधुवर्मा का रेशम बुनकर अभिलेख एवं यशोधर्मन का सोंधनी विजय स्तंभ।",
          "• **बेसनगर / विदिशा**: शुंग काल में आए यूनानी राजदूत **हेलियोडोरस (Heliodorus)** का गरुड़ ध्वज स्तंभ, जो भारत में भागवत/वैष्णव धर्म का प्रथम अभिलेखीय प्रमाण है।"
        ]),
        bodyEn: createBlocks([
          "### MP Special Inscriptions for MPPSC",
          "• Gurjara (Datia), Rupnath (Jabalpur), Panguradia (Sehore), Sanchi (Raisen), Eran (Sagar), Mandsaur (Dashpur), and Besnagar Garuda Pillar (Vidisha)."
        ]),
      },

      /* ── 5. Quick Revision & Memory Tricks ───────────────────── */
      {
        _key: "sec-quick-revision",
        kind: "importance",
        title: "परीक्षा हेतु महत्वपूर्ण तथ्य & Quick Revision Matrix",
        titleEn: "Quick Revision Matrix & Exam One-Liners",
        body: createBlocks([
          "### त्वरित रिवीजन पॉइंटर्स (Quick Revision Matrix)",
          "• **मास्की अभिलेख** → पहली बार 'अशोक' नाम का उल्लेख",
          "• **गुर्जरा अभिलेख** → दतिया (म.प्र.) में अशोक का नाम",
          "• **रुम्मिनदेई अभिलेख** → भगवान बुद्ध का जन्मस्थान (नेपाल)",
          "• **हाथीगुम्फा अभिलेख** → कलिंगराज खारवेल (ओडिशा)",
          "• **जूनागढ़ अभिलेख** → रुद्रदामन I (प्रथम संस्कृत अभिलेख)",
          "• **प्रयाग प्रशस्ति** → समुद्रगुप्त (रचयिता: हरिषेण)",
          "• **ऐहोल अभिलेख** → पुलकेशिन द्वितीय (रचयिता: रविकीर्ति)",
          "• **एरण अभिलेख** → सती प्रथा का प्रथम साक्ष्य & हूण आक्रमण",
          "• **मंदसौर अभिलेख** → रेशम बुनकरों की श्रेणी & सूर्य मंदिर",
          "• **साँची स्तूप** → सम्राट अशोक द्वारा निर्मित (खोज: जनरल टेलर 1818)",
          "• **भरहुत स्तूप** → सतना (खोज: कनिंघम 1873)",
          "• **केसरिया स्तूप** → भारत का सबसे बड़ा स्तूप (बिहार)",
          "• **बोरोबुदुर स्तूप** → विश्व का सबसे बड़ा बौद्ध स्तूप (इंडोनेशिया)"
        ]),
        bodyEn: createBlocks([
          "### Quick Revision Matrix",
          "• Maski → Ashoka name | Rummindei → Buddha birth | Prayag Prasasti → Samudragupta | Junagadh → Rudradaman | Aihole → Pulakeshin II | Eran → Sati evidence | Sanchi → Ashoka Stupa."
        ]),
      },

      /* ── 6. SEO Interlinking & Related MPPSC Study Notes ─────── */
      {
        _key: "sec-interlinking-seo",
        kind: "factsAtAGlance",
        title: "🔗 संबंधित MPPSC अध्ययन सामग्री & महत्वपूर्ण लिंक्स (SEO Interlinking)",
        titleEn: "Related MPPSC Notes & Quick Links",
        body: createBlocks([
          "### MPPSC एवं सिविल सेवा परीक्षा हेतु महत्वपूर्ण लिंक",
          "👉 [MPPSC Mains Syllabus 2026 (प्रथम प्रश्नपत्र: भारतीय इतिहास व मध्य प्रदेश का इतिहास)](/mppsc/mains-syllabus)",
          "👉 [MPPSC Prelims Complete Syllabus & Exam Pattern](/mppsc/prelims-syllabus)",
          "👉 [MPPSC Notes PDF Portal & Study Material](/mppsc-notes)",
          "👉 [73वां व 74वां संविधान संशोधन अधिनियम (पंचायती राज व नगरीय निकाय)](/general-awareness/73rd-74th-constitutional-amendment-acts-panchayati-raj-mppsc-notes)",
          "👉 [भारत में महिलाओं की सुरक्षा हेतु कानून व संवैधानिक प्रावधान](/general-awareness/women-safety-laws-in-india-constitutional-provisions-mppsc-notes)",
          "👉 [भारतीय संविधान सभा का गठन एवं ऐतिहासिक पृष्ठभूमि](/general-awareness/constituent-assembly-of-india-making-of-constitution-mppsc-notes)",
          "👉 [लोक परीक्षा (अनुचित साधनों की रोकथाम) संशोधन विधेयक 2026: Anti Paper Leak Law Notes](/current-affairs/anti-paper-leak-bill-2026-mppsc-upsc-notes)",
          "👉 [FCRA Amendment Bill & Rules 2026: मुख्य प्रावधान व MPPSC Notes](/current-affairs/fcra-amendment-rules-2026)",
          "👉 [आपदा प्रबंधन (संशोधन) अधिनियम 2025: मुख्य प्रावधान व MPPSC Notes](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)",
          "👉 [MPPSC 2026-27 ऑनलाइन लाइव फाउंडेशन बैच में प्रवेश लें](/online-courses/mppsc-mains-2027-online-live-batch)"
        ]),
        bodyEn: createBlocks([
          "### Related MPPSC Notes & Quick Links",
          "👉 [MPPSC Mains Syllabus](/mppsc/mains-syllabus)",
          "👉 [MPPSC Prelims Syllabus](/mppsc/prelims-syllabus)",
          "👉 [MPPSC Notes Portal](/mppsc-notes)"
        ]),
      }
    ],

    /* ─── MCQs (EXACTLY 8 HIGH-QUALITY MCQs) ───────────────── */
    mcqs: [
      {
        question: "प्रयाग प्रशस्ति (इलाहाबाद स्तंभ लेख) किस गुप्त सम्राट की विजयों का विस्तृत वर्णन प्रस्तुत करती है?",
        questionEn: "Prayag Prasasti (Allahabad Pillar inscription) describes the conquests of which Gupta emperor?",
        options: ["अशोक", "समुद्रगुप्त", "चंद्रगुप्त विक्रमादित्य", "स्कंदगुप्त"],
        optionsEn: ["Ashoka", "Samudragupta", "Chandragupta Vikramaditya", "Skandagupta"],
        correctIndex: 1,
        explanation: "प्रयाग प्रशस्ति की रचना समुद्रगुप्त के दरबारी कवि हरिषेण ने संस्कृत की चंपू शैली में की थी, जिसमें समुद्रगुप्त की आर्यावर्त और दक्षिणापथ विजयों का वर्णन है।",
        explanationEn: "Prayag Prasasti was composed by Harisena in Sanskrit praising Emperor Samudragupta."
      },
      {
        question: "पहली बार सम्राट अशोक के नाम 'देवानामप्रिय अशोक' का स्पष्ट उल्लेख किस शिलालेख से प्राप्त होता है?",
        questionEn: "Which rock edict contains the first explicit mention of King Ashoka's name 'Devanampriya Ashok'?",
        options: ["मास्की अभिलेख", "जूनागढ़ अभिलेख", "हाथीगुम्फा अभिलेख", "नासिक अभिलेख"],
        optionsEn: ["Maski Inscription", "Junagadh Inscription", "Hathigumpha Inscription", "Nasik Inscription"],
        correctIndex: 0,
        explanation: "कर्नाटक के रायचूर जिले में स्थित मास्की लघु शिलालेख में पहली बार 'अशोक' नाम का स्पष्ट उल्लेख मिलता है।",
        explanationEn: "The Maski minor rock edict in Karnataka was the first to explicitly name King Ashoka."
      },
      {
        question: "भारत में सती प्रथा का प्रथम अभिलेखीय साक्ष्य (510 ई.) मध्य प्रदेश के किस स्थान के अभिलेख से प्राप्त होता है?",
        questionEn: "Where in Madhya Pradesh is the earliest inscriptional evidence of Sati (510 AD) found?",
        options: ["गुर्जरा (दतिया)", "एरण (सागर)", "मंदसौर", "बेसनगर (विदिशा)"],
        optionsEn: ["Gurjara (Datia)", "Eran (Sagar)", "Mandsaur", "Besnagar (Vidisha)"],
        correctIndex: 1,
        explanation: "सागर जिले के एरण अभिलेख (510 ई.) से गुप्त सम्राट भानुगुप्त के सेनापति गोपराज की मृत्यु पर उनकी पत्नी के सती होने का प्रथम अभिलेखीय प्रमाण मिलता है।",
        explanationEn: "Eran inscription in Sagar (510 AD) provides the earliest inscriptional record of Sati practice."
      },
      {
        question: "संस्कृत भाषा का प्रथम दीर्घ अभिलेख (First Long Sanskrit Inscription) कौन-सा माना जाता है?",
        questionEn: "Which is considered the first long inscription written in pure Sanskrit language?",
        options: ["ऐहोल अभिलेख", "जूनागढ़ अभिलेख (रुद्रदामन)", "प्रयाग प्रशस्ति", "नासिक अभिलेख"],
        optionsEn: ["Aihole Inscription", "Junagadh Inscription (Rudradaman)", "Prayag Prasasti", "Nasik Inscription"],
        correctIndex: 1,
        explanation: "शक शासक रुद्रदामन प्रथम का जूनागढ़ (गिरनार) अभिलेख संस्कृत भाषा का प्रथम बड़ा अभिलेख है, जिसमें सुदर्शन झील का इतिहास है।",
        explanationEn: "Rudradaman I's Junagadh rock inscription is the earliest major inscription in classical Sanskrit."
      },
      {
        question: "मध्य प्रदेश में स्थित प्रसिद्ध साँची के बौद्ध स्तूप की खोज वर्ष 1818 में किस ब्रिटिश अधिकारी ने की थी?",
        questionEn: "Which British officer discovered the famous Sanchi Stupa in Madhya Pradesh in 1818?",
        options: ["एलेक्जेंडर कनिंघम", "जनरल टेलर", "जेम्स प्रिंसेप", "विलियम जोन्स"],
        optionsEn: ["Alexander Cunningham", "General Taylor", "James Prinsep", "William Jones"],
        correctIndex: 1,
        explanation: "वर्ष 1818 में जनरल टेलर ने रायसेन (मध्य प्रदेश) में स्थित साँची के स्तूपों की पुनः खोज की थी।",
        explanationEn: "General Taylor rediscovered the Great Stupa of Sanchi in 1818."
      },
      {
        question: "नर्मदा नदी के तट पर सम्राट हर्षवर्धन पर पुलकेशिन द्वितीय की विजय का उल्लेख किस अभिलेख में मिलता है?",
        questionEn: "Which inscription records Chalukya King Pulakeshin II's victory over Emperor Harshavardhana?",
        options: ["ऐहोल अभिलेख", "मंदसौर अभिलेख", "रुम्मिनदेई अभिलेख", "हाथीगुम्फा अभिलेख"],
        optionsEn: ["Aihole Inscription", "Mandsaur Inscription", "Rummindei Inscription", "Hathigumpha Inscription"],
        correctIndex: 0,
        explanation: "कर्नाटक के ऐहोल अभिलेख (रचयिता: रविकीर्ति) में पुलकेशिन द्वितीय द्वारा हर्षवर्धन को पराजित करने का वर्णन है।",
        explanationEn: "The Aihole inscription written by Ravikirti commemorates Pulakeshin II's defeat of Harshavardhana."
      },
      {
        question: "भारत का सबसे बड़ा बौद्ध स्तूप (Largest Buddhist Stupa in India) कौन-सा है?",
        questionEn: "Which is the largest Buddhist Stupa in India?",
        options: ["साँची स्तूप", "भरहुत स्तूप", "केसरिया स्तूप (बिहार)", "धामेक स्तूप"],
        optionsEn: ["Sanchi Stupa", "Bharhut Stupa", "Kesariya Stupa (Bihar)", "Dhamek Stupa"],
        correctIndex: 2,
        explanation: "बिहार के पूर्वी चंपारण में स्थित केसरिया स्तूप (~104 फीट ऊँचाई) भारत का सबसे बड़ा बौद्ध स्तूप है।",
        explanationEn: "Kesariya Stupa in East Champaran, Bihar is considered the largest Buddhist stupa in India."
      },
      {
        question: "यूनानी राजदूत हेलियोडोरस का गरुड़ ध्वज स्तंभ मध्य प्रदेश के किस स्थान पर स्थित है, जो भागवत धर्म का प्रमाण है?",
        questionEn: "Where is the famous Heliodorus Garuda Pillar located in Madhya Pradesh?",
        options: ["बेसनगर (विदिशा)", "साँची (रायसेन)", "उज्जैन", "त्रिपुरी (जबलपुर)"],
        optionsEn: ["Besnagar (Vidisha)", "Sanchi (Raisen)", "Ujjain", "Tripuri (Jabalpur)"],
        correctIndex: 0,
        explanation: "विदिशा (बेसनगर) स्थित हेलियोडोरस स्तंभ (खाम बाबा) भारत में भागवत/वैष्णव धर्म का प्रथम अभिलेखीय साक्ष्य है।",
        explanationEn: "The Besnagar Garuda Pillar in Vidisha is the earliest inscriptional proof of Bhagavata Vaishnavism."
      }
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "भारत का सबसे प्राचीन अभिलेख कौन-सा माना जाता है?",
        questionEn: "Which is considered the oldest inscription in India?",
        answer: "भारत में सबसे प्राचीन पठनीय अभिलेख मौर्य सम्राट अशोक (3rd Century BCE) के माने जाते हैं, जो ब्राह्मी, खरोष्ठी, ग्रीक और अरामी लिपियों में उत्कीर्ण हैं।",
        answerEn: "Emperor Ashoka's edicts (3rd century BCE) are the oldest deciphered inscriptions in India."
      },
      {
        question: "अशोक के नाम का उल्लेख किन-किन प्रमुख अभिलेखों में मिलता है?",
        questionEn: "In which major inscriptions is King Ashoka named explicitly?",
        answer: "अशोक के व्यक्तिगत नाम का स्पष्ट उल्लेख मास्की (कर्नाटक), गुर्जरा (दतिया, म.प्र.), नेतूर (आंध्र प्रदेश) तथा उडेगोलम अभिलेखों में मिलता है।",
        answerEn: "King Ashoka's personal name is explicitly mentioned in Maski, Gurjara, Nittur, and Udegolam edicts."
      },
      {
        question: "एरण अभिलेख क्यों प्रसिद्ध है और यह किस जिले में स्थित है?",
        questionEn: "Why is Eran inscription famous and where is it located?",
        answer: "एरण अभिलेख मध्य प्रदेश के सागर जिले में स्थित है। यह 510 ईस्वी के भानुगुप्त काल का है और भारत में सती प्रथा का पहला लिखित साक्ष्य तथा हूण आक्रमण की जानकारी देता है।",
        answerEn: "Eran inscription in Sagar district (510 AD) provides the earliest written evidence of Sati and Huna invasions."
      },
      {
        question: "विश्व का सबसे बड़ा बौद्ध स्तूप कौन-सा है?",
        questionEn: "Which is the world's largest Buddhist Stupa?",
        answer: "विश्व का सबसे बड़ा बौद्ध स्तूप इंडोनेशिया के जावा में स्थित **बोरोबुदुर स्तूप (Borobudur Stupa)** है, जिसका निर्माण 8वीं-9वीं सदी में शैलेंद्र वंश के राजाओं ने करवाया था।",
        answerEn: "Borobudur Stupa in Java, Indonesia, built by the Sailendra Dynasty, is the world's largest Buddhist stupa."
      },
      {
        question: "साँची स्तूप को UNESCO विश्व धरोहर स्थल कब घोषित किया गया था?",
        questionEn: "When was Sanchi Stupa declared a UNESCO World Heritage Site?",
        answer: "साँची स्तूप (रायसेन, म.प्र.) को वर्ष **1989** में UNESCO द्वारा विश्व धरोहर स्थल की सूची में शामिल किया गया था।",
        answerEn: "Sanchi Stupa was designated a UNESCO World Heritage Site in 1989."
      }
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Archaeological Survey of India (ASI)", url: "https://asi.nic.in" },
      { label: "NCERT Class 11 & 12 Ancient History", url: "https://ncert.nic.in" },
      { label: "Madhya Pradesh Department of Archaeology", url: "https://mparchaeology.in" }
    ]
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded Ancient India Inscriptions & Stupas Article to Sanity CMS!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
