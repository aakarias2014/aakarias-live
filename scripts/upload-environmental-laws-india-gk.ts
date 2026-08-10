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
  console.log("🚀 Starting upload process for Environmental Laws in India (Static GK Article)...");

  // Ensure author-aakar (Deepraj Sikarwar) exists as default author per rules
  const authorDoc = {
    _id: "author-aakar",
    _type: "author",
    slug: { _type: "slug", current: "deepraj-sikarwar" },
    name: "Deepraj Sikarwar (Editorial Team)",
    role: "Senior Editorial Lead & MPPSC/UPSC Subject Specialist",
    bio: "Lead content developer and researcher specializing in MPPSC & UPSC environment, governance, and national affairs.",
  };
  await client.createOrReplace(authorDoc);
  console.log("✔ Verified/Updated Default Author: Deepraj Sikarwar (Editorial Team)");

  // Ensure environment category exists
  const categoryDoc = {
    _id: "cat-environment",
    _type: "category",
    slug: { _type: "slug", current: "environment" },
    title: "पर्यावरण और जैव विविधता",
    titleEn: "Environment & Ecology",
    description: "MPPSC एवं UPSC परीक्षाओं हेतु पर्यावरण संरक्षण, प्रदूषण नियंत्रण, वन कानून एवं जैव विविधता संबंधी अध्ययन सामग्री।",
    descriptionEn: "Study material on Environment, Ecology, Pollution Control, Forest Laws, and Biodiversity for MPPSC & UPSC Civil Services.",
    color: { hex: "#10b981" },
    icon: "leaf",
  };
  await client.createOrReplace(categoryDoc);
  console.log("✔ Verified Environment & Ecology Category");

  // Copy images from artifact folder to public/images/blog/
  const artifactDir = "/Users/aakariastech/.gemini/antigravity-ide/brain/e3e69904-e85d-4cda-b8a4-97e34fb756b4";
  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });

  const imageFiles = {
    featured: path.join(publicBlogDir, "env_laws_india_featured.png"),
    wildlifeWater: path.join(publicBlogDir, "env_laws_wildlife_water_air.png"),
    biodiversity: path.join(publicBlogDir, "env_laws_biodiversity_nba.png"),
    ngt: path.join(publicBlogDir, "env_laws_national_green_tribunal.png"),
  };

  fs.copyFileSync(path.join(artifactDir, "env_laws_india_featured_1786364107391.png"), imageFiles.featured);
  fs.copyFileSync(path.join(artifactDir, "wildlife_water_air_act_1786364125080.png"), imageFiles.wildlifeWater);
  fs.copyFileSync(path.join(artifactDir, "biodiversity_nba_bmc_1786364141010.png"), imageFiles.biodiversity);
  fs.copyFileSync(path.join(artifactDir, "national_green_tribunal_1786364155182.png"), imageFiles.ngt);

  console.log("📸 Uploading images to Sanity CMS asset pipeline...");

  const assetFeatured = await client.assets.upload("image", fs.createReadStream(imageFiles.featured), {
    filename: "env_laws_india_featured.png",
  });
  const assetWildlifeWater = await client.assets.upload("image", fs.createReadStream(imageFiles.wildlifeWater), {
    filename: "env_laws_wildlife_water_air.png",
  });
  const assetBiodiversity = await client.assets.upload("image", fs.createReadStream(imageFiles.biodiversity), {
    filename: "env_laws_biodiversity_nba.png",
  });
  const assetNgt = await client.assets.upload("image", fs.createReadStream(imageFiles.ngt), {
    filename: "env_laws_national_green_tribunal.png",
  });

  console.log("✔ Successfully uploaded all 4 image assets.");

  // Build the Static GK Document
  const article = {
    _id: "gk-environmental-laws-in-india",
    _type: "staticGk",
    slug: { _type: "slug", current: "environmental-laws-in-india-mppsc-upsc" },
    title: "भारत में पर्यावरण संबंधी कानून: प्रमुख अधिनियम, नीतियाँ, NGT एवं संस्थाएँ | MPPSC & UPSC Note",
    titleEn: "Environmental Laws in India: Major Acts, Policies, NGT & Institutions | MPPSC & UPSC Guide",
    excerpt: "MPPSC एवं UPSC परीक्षा के लिए भारत के प्रमुख पर्यावरण कानून: वन्यजीव संरक्षण 1972, जल अधिनियम 1974, वन संरक्षण 1980, वायु अधिनियम 1981, पर्यावरण संरक्षण 1986, जैव विविधता 2002, राष्ट्रीय हरित न्यायाधिकरण (NGT) 2010, अनुसूचियाँ, CPCB, NBA एवं अंतरराष्ट्रीय समझौतों की संपूर्ण हिंदी व अंग्रेजी व्याख्या।",
    excerptEn: "Complete study material for MPPSC & UPSC on Environmental Laws in India: Wildlife Protection Act 1972, Water Act 1974, Forest Conservation Act 1980, Air Act 1981, EPA 1986, Biological Diversity Act 2002, NGT Act 2010, CPCB, SPCB, NBA, schedules, and international conventions.",
    ca_date: "2026-08-10",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 12,
    keywords: [
      "MPPSC Environmental Laws",
      "UPSC Environmental Legislation India",
      "Wildlife Protection Act 1972 Schedules",
      "Water Act 1974 CPCB SPCB",
      "Forest Conservation Act 1980",
      "Air Pollution Act 1981",
      "Environment Protection Act 1986 Section",
      "Biological Diversity Act 2002 NBA BMC",
      "National Green Tribunal Act 2010 Excluded Acts",
      "Stockholm Declaration 1972 India",
      "पेरिस समझौता मॉन्ट्रियल प्रोटोकॉल",
      "राष्ट्रीय हरित न्यायाधिकरण",
      "पर्यावरण एवं वन मंत्रालय MoEFCC"
    ],
    category: { _type: "reference", _ref: "cat-environment" },
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["MPPSC Paper-3", "GS-3 Environment", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetFeatured._id },
      alt: "Metallic scale of justice floating above a pristine Indian green forest with a flowing river and wild Bengal tiger, with Supreme Court of India background",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Background & Stockholm Declaration 1972 ────────────── */
      {
        _key: "sec-background-stockholm",
        kind: "whyInNews",
        title: "भारत में पर्यावरण कानूनों की शुरुआत एवं 1972 का स्टॉकहोम घोषणापत्र",
        titleEn: "Origin of Environmental Laws in India & Stockholm Declaration 1972",
        body: [
          ...createBlocks([
            "भारत में पर्यावरण संरक्षण के लिए समय-समय पर विभिन्न कानून, संस्थाएँ और नीतियाँ विकसित की गई हैं। इनका मुख्य उद्देश्य प्राकृतिक संसाधनों की रक्षा, प्रदूषण नियंत्रण, जैव विविधता का संरक्षण और सतत विकास (Sustainable Development) सुनिश्चित करना है।",
            "भारत में पर्यावरण कानूनों का विकास विशेष रूप से **1972 के स्टॉकहोम घोषणापत्र (Stockholm Declaration 1972)** के बाद तेज हुआ। इसके बाद भारत में वन्यजीव संरक्षण अधिनियम 1972, जल अधिनियम 1974, वन संरक्षण अधिनियम 1980, वायु अधिनियम 1981, पर्यावरण संरक्षण अधिनियम 1986, जैव विविधता अधिनियम 2002 तथा राष्ट्रीय हरित न्यायाधिकरण अधिनियम 2010 जैसे ऐतिहासिक कानून पारित किए गए।",
            "यह विषय **MPPSC (पेपर 3) तथा UPSC (GS Paper 3 & Prelims)** परीक्षा की दृष्टि से अत्यंत महत्वपूर्ण है।",
            "### 1972 का स्टॉकहोम घोषणापत्र",
            "1972 का स्टॉकहोम घोषणापत्र वैश्विक स्तर पर पर्यावरण जागरूकता की दिशा में एक महत्वपूर्ण मोड़ था। इसने मानव पर्यावरण के संरक्षण और संवर्धन के लिए साझा दृष्टिकोण एवं सिद्धांतों की आवश्यकता पर बल दिया। भारत ने इस अंतरराष्ट्रीय सम्मेलन में सक्रिय भाग लिया और इसके बाद भारतीय नीति निर्माण में पर्यावरण को प्राथमिकता दी गई।",
            "### राष्ट्रीय पर्यावरण नीति एवं योजना के लिए परिषद (NCPEP)",
            "1972 में स्टॉकहोम घोषणा के जवाब में भारत ने **राष्ट्रीय पर्यावरण नीति एवं योजना परिषद (NCPEP)** की स्थापना की। यह देश में पर्यावरणीय मुद्दों के लिए एक संरचित दृष्टिकोण की दिशा में पहला ठोस कदम था।",
            "बाद में **1985 में इसका नाम बदलकर पर्यावरण एवं वन मंत्रालय (Ministry of Environment and Forests - MoEF)** कर दिया गया, जिसे अब **पर्यावरण, वन और जलवायु परिवर्तन मंत्रालय (MoEFCC)** के रूप में जाना जाता है।",
            "### पर्यावरण एवं वन मंत्रालय (MoEFCC)",
            "पर्यावरण एवं वन मंत्रालय (MoEFCC) का उद्देश्य राष्ट्रीय पर्यावरण नीतियों और कार्यक्रमों की देखरेख एवं कार्यान्वयन करना है। यह वनों, वन्यजीवों तथा झीलों और नदियों सहित भारत के समस्त प्राकृतिक संसाधनों के संरक्षण में केंद्रीय भूमिका निभाता है।"
          ]),
        ],
        bodyEn: [
          ...createBlocks([
            "In India, various laws, institutions, and policies have been developed over time for environmental protection. Their primary objective is to safeguard natural resources, control pollution, conserve biodiversity, and ensure sustainable development.",
            "The evolution of environmental jurisprudence in India gained immense momentum after the landmark **Stockholm Declaration of 1972**. Subsequently, India enacted pivotal legislations such as the Wildlife Protection Act 1972, Water Act 1974, Forest Conservation Act 1980, Air Act 1981, Environment Protection Act 1986, Biological Diversity Act 2002, and the National Green Tribunal Act 2010.",
            "This subject is highly vital for **MPPSC (Paper 3) and UPSC (GS Paper 3 & Prelims)** civil services examinations.",
            "### The Stockholm Declaration of 1972",
            "The 1972 Stockholm Declaration was a historic watershed moment for global environmental consciousness. It emphasized a common outlook and shared principles for preserving and enhancing the human environment. India played an active role at Stockholm, which directly transformed India's domestic policy agenda.",
            "### National Committee on Environmental Planning and Coordination (NCEPC)",
            "In response to the 1972 Stockholm Conference, India established the **National Committee on Environmental Planning and Coordination (NCEPC)** in 1972. This marked India's first structured institutional approach towards environmental governance.",
            "Later in **1985, it was upgraded into the Ministry of Environment and Forests (MoEF)**, which is presently known as the **Ministry of Environment, Forest and Climate Change (MoEFCC)**.",
            "### Ministry of Environment, Forest and Climate Change (MoEFCC)",
            "MoEFCC serves as the nodal central administrative ministry for overseeing, planning, promoting, and coordinating environmental, forestry, and wildlife policies across India."
          ]),
        ],
      },

      /* ── 2. Wildlife Protection Act, 1972 ────────────────────── */
      {
        _key: "sec-wildlife-act-1972",
        kind: "keyAspects",
        title: "1. वन्यजीव संरक्षण अधिनियम, 1972 (Wildlife Protection Act, 1972)",
        titleEn: "1. Wildlife Protection Act, 1972",
        body: [
          ...createBlocks([
            "वन्यजीव संरक्षण अधिनियम, 1972 भारत के सबसे प्रमुख पर्यावरण कानूनों में से एक है। इसका उद्देश्य वन्यजीवों और उनके प्राकृतिक आवासों की रक्षा एवं संरक्षण करना है। यह वन्य पशुओं, पक्षियों और वनस्पतियों की सुरक्षा के लिए कानूनी ढाँचा प्रदान करता है।",
            "### प्रमुख उद्देश्य",
            "• **वन्यजीव संरक्षण**: जंगली जानवरों, पक्षियों और पौधों की प्रजातियों की व्यापक रक्षा।",
            "• **शिकार पर नियंत्रण**: निर्दिष्ट संकटग्रस्त और विलुप्तप्राय जानवरों के अवैध शिकार (Poaching) और शिकार (Hunting) पर पूर्ण रोक।",
            "• **आवास संरक्षण**: राष्ट्रीय उद्यानों, अभयारण्यों और संरक्षित क्षेत्रों का गठन कर वन्यजीवों के प्राकृतिक आवासों का संरक्षण करना।",
            "• **व्यापार पर प्रतिबंध**: वन्यजीवों एवं उनसे बने उत्पादों के व्यावसायिक व्यापार को विनियमित व प्रतिबंधित करना।",
            "### अधिनियम की अनुसूचियाँ (Schedules)",
            "अधिनियम में विभिन्न स्तर की सुरक्षा और दंड के आधार पर अनुसूचियाँ शामिल हैं:"
          ]),
          createTable(
            "table-wildlife-schedules-hi",
            "वन्यजीव संरक्षण अधिनियम, 1972 की अनुसूचियाँ एवं प्रावधान",
            ["अनुसूची", "प्रावधान एवं दंड का स्तर"],
            [
              ["**अनुसूची I और II**", "प्रजातियों को पूर्ण कानूनी सुरक्षा; उल्लंघन करने पर उच्चतम दंड एवं कठोर कारावास का प्रावधान।"],
              ["**अनुसूची III और IV**", "सुरक्षित प्रजातियाँ, लेकिन अनुसूची I और II की तुलना में कम दंड।"],
              ["**अनुसूची V**", "कौवे, चूहे, और चमगादड़ जैसे कीट-पतंग (Vermin), जिनका स्वतंत्र रूप से शिकार किया जा सकता है।"],
              ["**अनुसूची VI**", "वे दुर्लभ और स्थानिक पौधे (Specified Plants) जिनकी खेती, बिक्री और संग्रह प्रतिबंधित है।"]
            ]
          ),
          ...createBlocks([
            "### अधिनियम के तहत गठित वैधानिक निकाय",
            "• **राष्ट्रीय वन्यजीव बोर्ड (National Board for Wildlife - NBWL)**: प्रधानमंत्री की अध्यक्षता में वन्यजीव संरक्षण की नीतिगत मामलों पर केंद्र सरकार को सलाह देने वाला शीर्ष निकाय।",
            "• **राज्य वन्यजीव सलाहकार बोर्ड (State Board for Wildlife)**: राज्य सरकारों को अभयारण्य या राष्ट्रीय उद्यान घोषित किए जाने वाले क्षेत्रों के चयन एवं नीतियाँ बनाने में सहायता।",
            "• **मुख्य वन्यजीव संरक्षक (Chief Wildlife Warden)**: राज्य स्तर पर इस अधिनियम के प्रावधानों के प्रवर्तन और निगरानी की जिम्मेदारी।"
          ]),
          {
            _key: "img-wildlife-water",
            _type: "image",
            asset: { _type: "reference", _ref: assetWildlifeWater._id },
            alt: "Bengal tiger in protected national park habitat alongside clean water river sampling equipment operated by Indian environmental scientists",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "The Wildlife Protection Act of 1972 is an umbrella legislation for wildlife conservation in India. It provides a comprehensive legal matrix for protecting wild animals, birds, and plant species to ensure ecological security.",
            "### Core Objectives",
            "• **Wildlife Conservation**: Comprehensive protection of wild fauna, avifauna, and flora.",
            "• **Hunting Control**: Total prohibition on hunting and poaching of endangered wild animals.",
            "• **Habitat Protection**: Declaration and management of Protected Areas like National Parks, Wildlife Sanctuaries, and Conservation Reserves.",
            "• **Trade Regulation**: Strict ban and regulation on illegal trade in wildlife animal parts and derivatives.",
            "### Schedules of the Act",
            "The Act categorizes species into specific schedules based on protection levels and penalty severity:"
          ]),
          createTable(
            "table-wildlife-schedules-en",
            "Schedules & Provisions under Wildlife Protection Act, 1972",
            ["Schedule", "Provisions & Level of Protection"],
            [
              ["**Schedules I & II**", "Absolute legal protection; maximum penalties and severe imprisonment for violations."],
              ["**Schedules III & IV**", "Protected species, but subject to lower penal intensity compared to Schedule I/II."],
              ["**Schedule V**", "Vermin species (e.g., crows, fruit bats, mice, rats) that can be hunted freely."],
              ["**Schedule VI**", "Specified endemic plant species prohibited from cultivation, possession, or sale."]
            ]
          ),
          ...createBlocks([
            "### Statutory Bodies Constituted under the Act",
            "• **National Board for Wildlife (NBWL)**: Apex policy advisory board chaired by the Prime Minister of India.",
            "• **State Board for Wildlife (SBWL)**: Advises state governments on declaring protected areas and framing local conservation policies.",
            "• **Chief Wildlife Warden (CWLW)**: Statutory authority responsible for enforcing wildlife regulations at the state level."
          ]),
          {
            _key: "img-wildlife-water-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetWildlifeWater._id },
            alt: "Bengal tiger in protected national park habitat alongside clean water river sampling equipment operated by Indian environmental scientists",
          }
        ],
      },

      /* ── 3. Water Act 1974, Forest Act 1980 & Air Act 1981 ──── */
      {
        _key: "sec-water-forest-air-acts",
        kind: "keyHighlights",
        title: "2. जल (1974), वन (1980) एवं वायु (1981) संरक्षण अधिनियम",
        titleEn: "2. Water (1974), Forest (1980) & Air (1981) Conservation Acts",
        body: [
          ...createBlocks([
            "### 2. जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम, 1974",
            "जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम, 1974 भारत में जल प्रदूषण से निपटने के लिए बनाया गया पहला प्रमुख कानून है। इसका मुख्य उद्देश्य जल स्रोतों की शुद्धता बनाए रखना और जल प्रदूषण की रोकथाम करना है।",
            "• **प्रदूषण नियंत्रण बोर्डों की स्थापना**: इस अधिनियम के तहत **केंद्रीय प्रदूषण नियंत्रण बोर्ड (CPCB)** तथा **राज्य प्रदूषण नियंत्रण बोर्ड (SPCB)** का गठन किया गया।",
            "• **CPCB और SPCB की भूमिका**: CPCB राष्ट्रीय स्तर पर नीतियाँ बनाता है, जबकि SPCB उद्योगों को नदियों व जल निकायों में सीवेज व अपशिष्ट (Effluents) बहाने की सहमति (Consent to Operate) प्रदान करता है।",
            "• **संशोधन**: इस कानून में 1988 और 2003 में महत्वपूर्ण संशोधन किए गए।",
            "### 3. वन (संरक्षण) अधिनियम, 1980",
            "वन संरक्षण अधिनियम, 1980 का मुख्य लक्ष्य वनों का विनाश रोकना और वन भूमि के गैर-वन उपयोग को नियंत्रित करना है।",
            "• **केंद्र सरकार की पूर्व अनुमति**: किसी भी वन भूमि को कृषि, खनन या औद्योगिक उद्देश्यों (Non-forest purpose) के लिए उपयोग करने से पहले केंद्र सरकार (MoEFCC) की पूर्व स्वीकृति अनिवार्य है।",
            "• **क्षतिपूरक वनीकरण (Compensatory Afforestation)**: यदि वन भूमि का डायवर्जन होता है, तो उतने ही क्षेत्रफल पर पुनर्वनीकरण की व्यवस्था की जाती है।",
            "### 4. वायु (प्रदूषण निवारण एवं नियंत्रण) अधिनियम, 1981",
            "भारत में बढ़ते वायु प्रदूषण को रोकने के लिए 1981 में वायु अधिनियम लागू किया गया।",
            "• **उत्सर्जन मानक निर्धारित करना**: उद्योगों एवं वाहनों से निकलने वाले कण पदार्थ (PM), सीसा, सल्फर डाइऑक्साइड (SO2) और नाइट्रोजन ऑक्साइड (NOx) की अनुमेय सीमा तय करना।",
            "• **ध्वनि प्रदूषण का समावेश**: 1987 के संशोधन द्वारा **ध्वनि प्रदूषण (Noise Pollution)** को भी वायु प्रदूषण की परिभाषा में शामिल किया गया।"
          ]),
        ],
        bodyEn: [
          ...createBlocks([
            "### 2. Water (Prevention and Control of Pollution) Act, 1974",
            "The Water Act of 1974 was India's pioneer law enacted specifically to control water pollution and restore wholesomeness of water bodies across the country.",
            "• **Establishment of Pollution Control Boards**: Created the **Central Pollution Control Board (CPCB)** and **State Pollution Control Boards (SPCBs)**.",
            "• **Functions of CPCB & SPCB**: CPCB coordinates national policies, while SPCB inspects industrial plants and grants/refuses consent for discharging industrial effluents into water bodies.",
            "• **Amendments**: Major amendments were introduced in 1988 and 2003 to enhance penalty structures.",
            "### 3. Forest (Conservation) Act, 1980",
            "The Forest Conservation Act, 1980 aims to arrest indiscriminate deforestation and regulate the diversion of forest lands for non-forestry purposes.",
            "• **Prior Central Government Approval**: No state government can divert reserved forest land for non-forest activities (mining, roads, dams) without mandatory prior approval from the Central Government.",
            "• **Compensatory Afforestation**: Mandates equivalent afforestation and funding via CAMPA to offset lost tree cover.",
            "### 4. Air (Prevention and Control of Pollution) Act, 1981",
            "The Air Act of 1981 was passed to arrest ambient air pollution and control industrial emissions.",
            "• **Ambient Air Quality Standards**: Establishes maximum permissible limits for particulate matter (PM), lead, carbon monoxide, SO2, and NOx.",
            "• **Inclusion of Noise Pollution**: Amending the Act in 1987 explicitly brought **Noise Pollution** under the legal definition of air pollutants."
          ]),
        ],
      },

      /* ── 4. EPA 1986 & Biodiversity Act 2002 ──────────────────── */
      {
        _key: "sec-epa-biodiversity",
        kind: "keyAspects",
        title: "3. पर्यावरण संरक्षण अधिनियम, 1986 एवं जैव विविधता अधिनियम, 2002",
        titleEn: "3. Environment Protection Act, 1986 & Biological Diversity Act, 2002",
        body: [
          ...createBlocks([
            "### 5. पर्यावरण (संरक्षण) अधिनियम, 1986 (EPA 1986)",
            "1984 की **भोपाल गैस त्रासदी (Bhopal Gas Tragedy)** के बाद संसद द्वारा पर्यावरण (संरक्षण) अधिनियम, 1986 पारित किया गया। इसे **छाता विधान (Umbrella Legislation)** कहा जाता है क्योंकि यह पहले से मौजूद कानूनों (जल व वायु अधिनियम) को आपस में जोड़ता है।",
            "• **संविधान का आधार**: यह अधिनियम भारतीय संविधान के **अनुच्छेद 253** के तहत लागू किया गया था (1972 के स्टॉकहोम सम्मेलन के निर्णयों को लागू करने के लिए)।",
            "• **व्यापक शक्तियाँ**: केंद्र सरकार को पर्यावरण गुणवत्ता मानक तय करने, औद्योगिक इकाइयों को बंद करने का निर्देश देने तथा खतरनाक पदार्थों के संचालन को नियंत्रित करने का पूर्ण अधिकार है।",
            "• **पर्यावरणीय प्रभाव आकलन (EIA)**: इसी अधिनियम के तहत EIA अधिसूचना जारी की जाती है।",
            "### 6. जैव विविधता अधिनियम, 2002",
            "1992 के **रिया डिजनेरियो पृथ्वी सम्मेलन (CBD)** के सिद्धांतों को लागू करने के लिए भारत ने 2002 में जैव विविधता अधिनियम पारित किया।",
            "• **त्रिस्तरीय संस्थागत ढाँचा**: ",
            "  1. **राष्ट्रीय स्तर**: राष्ट्रीय जैव विविधता प्राधिकरण (NBA) - चेन्नई में मुख्यालय।",
            "  2. **राज्य स्तर**: राज्य जैव विविधता बोर्ड (SBB)।",
            "  3. **स्थानीय स्तर**: जैव विविधता प्रबंधन समितियाँ (BMC)।",
            "• **जैव-चोरी (Biopiracy) की रोकथाम**: सरकार की अनुमति के बिना भारतीय आनुवंशिक संसाधनों तथा पारंपरिक ज्ञान को देश से बाहर स्थानांतरित करने या उस पर IP/पेटेंट अधिकार प्राप्त करने पर रोक।",
            "• **लाभ साझाकरण (Access and Benefit Sharing - ABS)**: स्थानीय समुदायों को उनके पारंपरिक जैविक संसाधनों के उपयोग से प्राप्त लाभों का निष्पक्ष हिस्सा देना।"
          ]),
          {
            _key: "img-biodiversity",
            _type: "image",
            asset: { _type: "reference", _ref: assetBiodiversity._id },
            alt: "Indian rural community members and environmental botanists documenting medicinal plants and local biodiversity in a Western Ghats forest",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "### 5. Environment (Protection) Act, 1986 (EPA 1986)",
            "Enacted in the aftermath of the tragic **1984 Bhopal Gas Leak**, the Environment (Protection) Act, 1986 functions as an **Umbrella Legislation** that ties together various specialized environmental laws.",
            "• **Constitutional Provision**: Enacted under **Article 253** of the Constitution of India to implement decisions taken at the 1972 Stockholm Conference.",
            "• **Empowered Central Powers**: Grants the Central Government broad mandates to prescribe environmental quality standards, shut down polluting units, and regulate hazardous substances.",
            "• **Environmental Impact Assessment (EIA)**: Statutory notifications for EIA are mandated under this framework.",
            "### 6. Biological Diversity Act, 2002",
            "Enacted to fulfill India's commitments under the United Nations **Convention on Biological Diversity (CBD, 1992)**.",
            "• **Three-Tiered Institutional Architecture**:",
            "  1. **National Level**: National Biodiversity Authority (NBA) – Headquartered in Chennai.",
            "  2. **State Level**: State Biodiversity Boards (SBBs).",
            "  3. **Local Level**: Biodiversity Management Committees (BMCs) at Panchayat/Municipal levels.",
            "• **Prevention of Biopiracy**: Prohibits non-citizens/foreign entities from securing Indian genetic resources or traditional knowledge without prior approval of NBA.",
            "• **Access and Benefit Sharing (ABS)**: Ensures fair and equitable distribution of commercial benefits to indigenous communities."
          ]),
          {
            _key: "img-biodiversity-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetBiodiversity._id },
            alt: "Indian rural community members and environmental botanists documenting medicinal plants and local biodiversity in a Western Ghats forest",
          }
        ],
      },

      /* ── 5. National Green Tribunal Act, 2010 ───────────────── */
      {
        _key: "sec-ngt-act-2010",
        kind: "keyAspects",
        title: "4. राष्ट्रीय हरित न्यायाधिकरण अधिनियम, 2010 (NGT Act, 2010)",
        titleEn: "4. National Green Tribunal Act, 2010 (NGT Act)",
        body: [
          ...createBlocks([
            "राष्ट्रीय हरित न्यायाधिकरण (NGT) की स्थापना **18 अक्टूबर 2010** को NGT अधिनियम 2010 के तहत की गई थी। भारत ऑस्ट्रेलिया और न्यूजीलैंड के बाद पर्यावरण मामलों के लिए समर्पित विशेष न्यायाधिकरण स्थापित करने वाला दुनिया का तीसरा देश बना।",
            "### NGT के प्रमुख उद्देश्य",
            "• **त्वरित पर्यावरण न्याय**: पर्यावरण संबंधी याचिकाओं का **6 माह के भीतर** समयबद्ध निपटारा।",
            "• **उच्च न्यायालयों का बोझ कम करना**: सिविल अदालतों और उच्च न्यायालयों में लंबित पर्यावरण मुकदमों का भार कम करना।",
            "• **मुआवजा एवं बहाली**: पर्यावरण क्षति के पीड़ितों को राहत, मुआवजा और पारिस्थितिकी तंत्र की बहाली के आदेश देना।",
            "### NGT के अधिकार क्षेत्र में आने वाले 5 प्रमुख कानून",
            "NGT निम्नलिखित 5 सिविल पर्यावरण कानूनों के तहत मामलों की सुनवाई करता है:"
          ]),
          createTable(
            "table-ngt-laws-hi",
            "NGT के अधिकार क्षेत्र वाले प्रमुख पर्यावरण अधिनियम",
            ["क्रमांक", "कानून का नाम", "वर्ष"],
            [
              ["1", "जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम", "1974"],
              ["2", "जल (प्रदूषण निवारण एवं नियंत्रण) उपकर अधिनियम", "1977"],
              ["3", "वायु (प्रदूषण निवारण एवं नियंत्रण) अधिनियम", "1981"],
              ["4", "पर्यावरण (संरक्षण) अधिनियम", "1986"],
              ["5", "जैव विविधता अधिनियम", "2002"]
            ]
          ),
          ...createBlocks([
            "### NGT के अधिकार क्षेत्र से बाहर रखे गए 2 अधिनियम (Exclusions)",
            "प्रतियोगी परीक्षाओं (MPPSC/UPSC) के लिए यह ध्यान रखना बहुत जरूरी है कि **NGT निम्नलिखित 2 कानूनों के तहत मामलों की सुनवाई नहीं करता**:",
            "1. **वन्यजीव (संरक्षण) अधिनियम, 1972 (Wildlife Protection Act, 1972)**",
            "2. **भारतीय वन अधिनियम, 1927 (Indian Forest Act, 1927)**"
          ]),
          {
            _key: "img-ngt",
            _type: "image",
            asset: { _type: "reference", _ref: assetNgt._id },
            alt: "National Green Tribunal court complex in New Delhi featuring an emblem of environmental justice",
          }
        ],
        bodyEn: [
          ...createBlocks([
            "The National Green Tribunal (NGT) was established on **18th October 2010** under the National Green Tribunal Act 2010. India became the third country globally (after Australia and New Zealand) to set up a dedicated fast-track environmental tribunal.",
            "### Key Objectives of NGT",
            "• **Expeditious Environmental Justice**: Mandated to dispose of environmental petitions within **6 months**.",
            "• **Judicial Burden Relief**: Reduces litigation load on High Courts and the Supreme Court.",
            "• **Restoration & Compensation**: Grants relief, damages, and restoration orders to victims of environmental pollution.",
            "### 5 Major Acts covered under NGT Jurisdiction",
            "NGT adjudication encompasses 5 core statutory civil environmental legislations:"
          ]),
          createTable(
            "table-ngt-laws-en",
            "Acts under the Jurisdiction of NGT",
            ["S.No.", "Act Title", "Year"],
            [
              ["1", "Water (Prevention and Control of Pollution) Act", "1974"],
              ["2", "Water (Prevention and Control of Pollution) Cess Act", "1977"],
              ["3", "Air (Prevention and Control of Pollution) Act", "1981"],
              ["4", "Environment (Protection) Act", "1986"],
              ["5", "Biological Diversity Act", "2002"]
            ]
          ),
          ...createBlocks([
            "### 2 Acts Excluded from NGT Jurisdiction (Critical Exam Fact)",
            "For civil services exams (MPPSC/UPSC), note that **NGT does NOT possess jurisdiction over the following 2 acts**:",
            "1. **Wildlife Protection Act, 1972**",
            "2. **Indian Forest Act, 1927**"
          ]),
          {
            _key: "img-ngt-en",
            _type: "image",
            asset: { _type: "reference", _ref: assetNgt._id },
            alt: "National Green Tribunal court complex in New Delhi featuring an emblem of environmental justice",
          }
        ],
      },

      /* ── 6. International Conventions & Challenges ────────────── */
      {
        _key: "sec-international-challenges",
        kind: "keyAspects",
        title: "5. अंतरराष्ट्रीय समझौते एवं कार्यान्वयन संबंधी प्रमुख चुनौतियाँ",
        titleEn: "5. International Agreements & Key Implementation Challenges",
        body: [
          ...createBlocks([
            "### अंतरराष्ट्रीय समझौतों की भूमिका",
            "• **1972 स्टॉकहोम घोषणापत्र**: भारत में पर्यावरण विधान की आधारशिला रखी और 42वें संविधान संशोधन (1976) द्वारा अनुच्छेद 48A और 51A(g) जोड़े गए।",
            "• **मॉन्ट्रियल प्रोटोकॉल (1987)**: ओजोन परत को नुकसान पहुँचाने वाले पदार्थों (ODS जैसे CFCs) को चरणबद्ध तरीके से समाप्त करने में भारत ने अभूतपूर्व सफलता हासिल की है।",
            "• **पेरिस जलवायु समझौता (2015)**: वैश्विक तापमान वृद्धि को 1.5°C से 2°C तक सीमित करने और भारत के NDC (Nationally Determined Contributions) एवं 2070 तक नेट-जीरो लक्ष्य को हासिल करने में कानूनी ढांचा सहायक है।",
            "### भारत में पर्यावरण कानूनों की प्रमुख चुनौतियाँ",
            "• **तकनीकी व वित्तीय बाधाएँ**: ग्रीन हाइड्रोजन, कार्बन कैप्चर और स्वच्छ प्रौद्योगिकियों के लिए उच्च लागत व किफायती वैश्विक वित्तपोषण की कमी।",
            "• **प्रवर्तन एवं नियामकीय सीमाएँ**: कड़े कानूनों के बावजूद CPCB व SPCB के पास जनशक्ति और बुनियादी ढाँचे की कमी होना।",
            "• **विकास और संरक्षण का टकराव**: बुनियादी ढाँचा परियोजनाओं एवं वन संरक्षण कानूनों के बीच नौकरशाही संबंधी देरी।",
            "• **भविष्य की आवश्यकताएँ**: ई-कचरा, प्लास्टिक प्रदूषण और जलवायु परिवर्तन के दुष्परिणामों से निपटने के लिए एकीकृत संहिताबद्ध कानून (Environmental Code) की आवश्यकता।"
          ]),
        ],
        bodyEn: [
          ...createBlocks([
            "### Role of International Conventions",
            "• **1972 Stockholm Conference**: Inspired the 42nd Constitutional Amendment Act (1976) inserting Article 48A (DPSPs) and Article 51A(g) (Fundamental Duties).",
            "• **Montreal Protocol (1987)**: India successfully phased out Ozone Depleting Substances (ODS) like Chlorofluorocarbons (CFCs).",
            "• **Paris Climate Agreement (2015)**: Underpins India's Nationally Determined Contributions (NDCs) and target of achieving Net Zero carbon emissions by 2070.",
            "### Major Implementation Challenges",
            "• **Technological & Financial Constraints**: High capital investment required for Green Hydrogen, Carbon Capture, and clean industrial tech.",
            "• **Enforcement Deficits**: Pollution Control Boards often suffer from manpower shortages and infrastructure constraints.",
            "• **Development vs. Conservation**: Administrative delays in securing environmental clearances for infrastructure projects.",
            "• **Future Legislative Needs**: Need for a consolidated unified Environmental Code to regulate emerging threats like E-waste and Microplastics."
          ]),
        ],
      },

      /* ── 7. Quick Revision Table & One-Liners ────────────────── */
      {
        _key: "sec-revision-oneliners",
        kind: "keyHighlights",
        title: "Quick Revision Table & MPPSC / UPSC One-Liner Facts",
        titleEn: "Quick Revision Table & MPPSC / UPSC One-Liner Facts",
        body: [
          createTable(
            "table-quick-revision-hi",
            "पर्यावरण कानून / नीतियाँ: त्वरित पुनरीक्षण सारणी",
            ["वर्ष", "अधिनियम / पहल", "प्रमुख उद्देश्य / विशेषता"],
            [
              ["1972", "स्टॉकहोम घोषणापत्र & वन्यजीव संरक्षण अधिनियम", "पर्यावरण का वैश्विक संकल्प & वन्यजीवों तथा अनुसूचियों का संरक्षण"],
              ["1974", "जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम", "जल निकायों की शुद्धता बहाल करना, CPCB & SPCB का गठन"],
              ["1980", "वन (संरक्षण) अधिनियम", "वनों की कटाई रोकना, गैर-वन उपयोग हेतु केंद्र की अनुमति अनिवार्य"],
              ["1981", "वायु (प्रदूषण निवारण एवं नियंत्रण) अधिनियम", "वायु प्रदूषण नियंत्रण (1987 में ध्वनि प्रदूषण शामिल किया गया)"],
              ["1986", "पर्यावरण (संरक्षण) अधिनियम", "भोपाल गैस त्रासदी के बाद व्यापक छाता विधान (Umbrella Act)"],
              ["2002", "जैव विविधता अधिनियम", "NBA (चेन्नई), SBB, BMC का गठन एवं जैव-चोरी पर रोक"],
              ["2010", "राष्ट्रीय हरित न्यायाधिकरण (NGT) अधिनियम", "पर्यावरणीय मामलों का 6 माह में त्वरित निपटारा (18 ऑक्टोबर 2010)"]
            ]
          ),
          ...createBlocks([
            "### MPPSC & UPSC Exam One-Liner Facts",
            "• **1972**: स्टॉकहोम घोषणापत्र आयोजित हुआ तथा भारत में वन्यजीव संरक्षण अधिनियम पारित किया गया।",
            "• **1974**: जल प्रदूषण निवारण एवं नियंत्रण अधिनियम के तहत CPCB (केंद्रीय प्रदूषण नियंत्रण बोर्ड) की स्थापना हुई।",
            "• **1980**: वन (संरक्षण) अधिनियम लागू हुआ; वन भूमि के गैर-वन उपयोग हेतु केंद्र सरकार की अनुमति अनिवार्य बनाई गई।",
            "• **1981**: वायु प्रदूषण निवारण एवं नियंत्रण अधिनियम पारित हुआ (1987 में ध्वनि प्रदूषण जोड़ा गया)।",
            "• **1986**: भोपाल गैस त्रासदी (1984) के बाद पर्यावरण (संरक्षण) अधिनियम (अनुच्छेद 253 के तहत) लागू किया गया।",
            "• **2002**: जैव विविधता अधिनियम पारित हुआ और राष्ट्रीय जैव विविधता प्राधिकरण (NBA) का मुख्यालय चेन्नई में स्थापित हुआ।",
            "• **18 अक्टूबर 2010**: राष्ट्रीय हरित न्यायाधिकरण (NGT) की स्थापना की गई।",
            "• **NGT के अधिकार क्षेत्र से बाहर**: वन्यजीव (संरक्षण) अधिनियम 1972 और भारतीय वन अधिनियम 1927 NGT के दायरे में नहीं आते।"
          ])
        ],
        bodyEn: [
          createTable(
            "table-quick-revision-en",
            "Environmental Laws & Policies: Quick Revision Matrix",
            ["Year", "Act / Initiative", "Core Significance / Feature"],
            [
              ["1972", "Stockholm Declaration & Wildlife Protection Act", "Global environmental pledge & legal fauna/flora protection"],
              ["1974", "Water (Prevention & Control of Pollution) Act", "Restoration of water bodies; constituted CPCB & SPCBs"],
              ["1980", "Forest (Conservation) Act", "Check deforestation; mandatory central clearance for non-forest use"],
              ["1981", "Air (Prevention & Control of Pollution) Act", "Control air emissions (Noise pollution added in 1987)"],
              ["1986", "Environment (Protection) Act", "Umbrella legislation enacted post-Bhopal gas leak (Article 253)"],
              ["2002", "Biological Diversity Act", "3-tier setup: NBA (Chennai), SBB, BMC; prevents biopiracy"],
              ["2010", "National Green Tribunal (NGT) Act", "Fast-track 6-month resolution tribunal (Est. 18 Oct 2010)"]
            ]
          ),
          ...createBlocks([
            "### MPPSC & UPSC Exam One-Liner Facts",
            "• **1972**: Stockholm Declaration convened & Wildlife Protection Act enacted in India.",
            "• **1974**: Central Pollution Control Board (CPCB) constituted under Water Pollution Act.",
            "• **1980**: Forest Conservation Act passed making Central approval compulsory for non-forest usage.",
            "• **1981**: Air Pollution Control Act passed; Noise pollution added as air pollutant in 1987.",
            "• **1986**: Environment Protection Act (Umbrella Act) enacted under Article 253 after 1984 Bhopal Gas Leak.",
            "• **2002**: Biological Diversity Act enacted; National Biodiversity Authority (NBA) set up in Chennai.",
            "• **18 October 2010**: National Green Tribunal (NGT) established.",
            "• **NGT Exclusions**: Wildlife Protection Act 1972 and Indian Forest Act 1927 fall OUTSIDE NGT jurisdiction."
          ])
        ],
      }
    ],

    /* ─── INTERACTIVE COLLAPSIBLE FAQS ───────────────────────────── */
    faqs: [
      {
        _key: "faq-1",
        question: "1972 का स्टॉकहोम घोषणापत्र क्या है और इसका भारत पर क्या प्रभाव पड़ा?",
        questionEn: "What is the Stockholm Declaration of 1972 and its impact on India?",
        answer: "1972 का स्टॉकहोम घोषणापत्र पर्यावरण संरक्षण पर पहला प्रमुख वैश्विक सम्मेलन था। इसके बाद भारत ने राष्ट्रीय पर्यावरण नीति परिषद बनाई और 42वें संविधान संशोधन (1976) के माध्यम से अनुच्छेद 48A और 51A(g) को संविधान में शामिल किया।",
        answerEn: "The 1972 Stockholm Declaration was the first major international summit on human environment. In response, India established NCEPC and amended its Constitution in 1976 (42nd Amendment) adding Articles 48A and 51A(g).",
      },
      {
        _key: "faq-2",
        question: "वन्यजीव संरक्षण अधिनियम 1972 की अनुसूचियाँ (Schedules) क्या दर्शाती हैं?",
        questionEn: "What do the Schedules under the Wildlife Protection Act 1972 denote?",
        answer: "इस अधिनियम में 6 अनुसूचियाँ हैं: अनुसूची I और II प्रजातियों को सर्वोच्च कानूनी सुरक्षा और उल्लंघन पर कठोरतम दंड देती हैं; अनुसूची III और IV कम दंड वाली प्रजातियाँ दर्शाती हैं; अनुसूची V कीट-पतंग (Vermin) जानवरों के लिए है; तथा अनुसूची VI संरक्षित दुर्लभ पौधों से संबंधित है।",
        answerEn: "The Act contains 6 schedules: Schedules I & II offer absolute protection with highest penal consequences; Schedules III & IV cover protected species with lesser penalties; Schedule V lists Vermin; and Schedule VI covers specified protected plants.",
      },
      {
        _key: "faq-3",
        question: "केंद्रीय प्रदूषण नियंत्रण बोर्ड (CPCB) का गठन किस कानून के तहत हुआ?",
        questionEn: "Under which legislation was the Central Pollution Control Board (CPCB) constituted?",
        answer: "CPCB का गठन जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम, 1974 के तहत सितंबर 1974 में किया गया था। बाद में इसे वायु अधिनियम 1981 के तहत भी शक्तियाँ प्रदान की गईं।",
        answerEn: "CPCB was constituted in September 1974 under the Water (Prevention and Control of Pollution) Act, 1974. It was subsequently entrusted with powers under the Air Act, 1981.",
      },
      {
        _key: "faq-4",
        question: "वन संरक्षण अधिनियम 1980 की सबसे मुख्य शर्त क्या है?",
        questionEn: "What is the core mandatory requirement under the Forest Conservation Act 1980?",
        answer: "इसकी सबसे मुख्य शर्त यह है कि किसी भी वन भूमि को गैर-वन उद्देश्य (जैसे सड़क निर्माण, खनन, बाँध) के लिए उपयोग करने से पहले केंद्र सरकार (MoEFCC) की पूर्व अनुमति प्राप्त करना अनिवार्य है।",
        answerEn: "The core requirement is that any diversion of forest land for non-forestry purposes (such as mining, roads, or power projects) requires prior compulsory approval from the Central Government.",
      },
      {
        _key: "faq-5",
        question: "1986 के पर्यावरण संरक्षण अधिनियम को 'छाता विधान' (Umbrella Act) क्यों कहा जाता है?",
        questionEn: "Why is the Environment Protection Act 1986 termed an 'Umbrella Legislation'?",
        answer: "क्योंकि यह 1984 की भोपाल गैस त्रासदी के बाद जल, वायु और पर्यावरण के विभिन्न पहलुओं को विनियमित करने वाले सभी पूर्ववर्ती कानूनों के बीच समन्वय स्थापित करने के लिए एक व्यापक कानूनी ढांचा प्रदान करता है।",
        answerEn: "Enacted after the 1984 Bhopal Gas Leak under Article 253, it provides an integrated overarching framework coordinating all previous sectoral laws (Water Act, Air Act).",
      },
      {
        _key: "faq-6",
        question: "राष्ट्रीय जैव विविधता प्राधिकरण (NBA) का मुख्यालय कहाँ स्थित है और इसका क्या कार्य है?",
        questionEn: "Where is the headquarters of National Biodiversity Authority (NBA) located and what is its role?",
        answer: "NBA का मुख्यालय चेन्नई (तमिलनाडु) में स्थित है। यह जैव विविधता अधिनियम 2002 के कार्यान्वयन की देखरेख करता है और भारतीय जैविक संसाधनों पर विदेशी बौद्धिक संपदा अधिकारों (Biopiracy) को नियंत्रित करता है।",
        answerEn: "NBA is headquartered in Chennai, Tamil Nadu. It implements the Biological Diversity Act 2002 and regulates foreign access to Indian genetic resources to prevent biopiracy.",
      },
      {
        _key: "faq-7",
        question: "राष्ट्रीय हरित न्यायाधिकरण (NGT) की स्थापना कब हुई थी?",
        questionEn: "When was the National Green Tribunal (NGT) established?",
        answer: "NGT की स्थापना 18 अक्टूबर 2010 को राष्ट्रीय हरित न्यायाधिकरण अधिनियम 2010 के तहत पर्यावरण संबंधी विवादों के 6 माह में त्वरित निपटारे के लिए की गई थी।",
        answerEn: "NGT was formally established on 18th October 2010 under the NGT Act 2010 for fast-track resolution of environmental disputes within 6 months.",
      },
      {
        _key: "faq-8",
        question: "कौन से 2 कानून NGT के अधिकार क्षेत्र में नहीं आते हैं?",
        questionEn: "Which 2 major acts are excluded from NGT jurisdiction?",
        answer: "वन्यजीव (संरक्षण) अधिनियम, 1972 तथा भारतीय वन अधिनियम, 1927 NGT के अधिकार क्षेत्र में नहीं आते हैं।",
        answerEn: "The Wildlife (Protection) Act, 1972 and the Indian Forest Act, 1927 fall strictly OUTSIDE NGT's statutory jurisdiction.",
      },
      {
        _key: "faq-9",
        question: "वायु अधिनियम में ध्वनि प्रदूषण को कब शामिल किया गया था?",
        questionEn: "When was noise pollution included under the Air Act?",
        answer: "1987 के संशोधन अधिनियम द्वारा ध्वनि प्रदूषण (Noise Pollution) को वायु (प्रदूषण निवारण एवं नियंत्रण) अधिनियम, 1981 में शामिल किया गया था।",
        answerEn: "Noise Pollution was officially incorporated into the Air (Prevention and Control of Pollution) Act, 1981 through an amendment in 1987.",
      },
      {
        _key: "faq-10",
        question: "MPPSC और UPSC परीक्षा की तैयारी में यह अध्याय कैसे सहायक है?",
        questionEn: "How is this topic useful for MPPSC & UPSC Civil Services preparation?",
        answer: "MPPSC मुख्य परीक्षा (पेपर-3 इकाई-10 / पर्यावरण) और प्रारंभिक परीक्षा तथा UPSC GS-3 में अधिनियमों के वर्ष, वैधानिक निकाय (CPCB, NBA, NGT), अनुसूचियाँ और संवैधानिक प्रावधान (48A, 51A) बार-बार पूछे जाते हैं।",
        answerEn: "It covers high-frequency exam topics for MPPSC Paper 3 & Prelims, and UPSC GS-3 Environment, including enactment years, statutory bodies (CPCB, NBA, NGT), schedules, and constitutional amendments.",
      }
    ],

    /* ─── INTERACTIVE PRACTICE MCQS ───────────────────────────────── */
    mcqs: [
      {
        _key: "mcq-1",
        question: "भारत में पर्यावरण (संरक्षण) अधिनियम, 1986 भारतीय संविधान के किस अनुच्छेद के तहत पारित किया गया था?",
        questionEn: "Under which Article of the Indian Constitution was the Environment (Protection) Act, 1986 enacted?",
        options: [
          "अनुच्छेद 48A / Article 48A",
          "अनुच्छेद 253 / Article 253",
          "अनुच्छेद 51A(g) / Article 51A(g)",
          "अनुच्छेद 300A / Article 300A"
        ],
        correctIndex: 1,
        explanation: "पर्यावरण (संरक्षण) अधिनियम 1986 संसद द्वारा अनुच्छेद 253 के तहत पारित किया गया था, ताकि 1972 के स्टॉकहोम सम्मेलन में लिए गए अंतरराष्ट्रीय निर्णयों को देश में लागू किया जा सके।",
        explanationEn: "The Environment (Protection) Act 1986 was enacted under Article 253 of the Constitution to give effect to international decisions made at the 1972 Stockholm Conference.",
      },
      {
        _key: "mcq-2",
        question: "निम्नलिखित में से कौन सा कानून राष्ट्रीय हरित न्यायाधिकरण (NGT) के क्षेत्राधिकार से बाहर है?",
        questionEn: "Which of the following Acts falls outside the jurisdiction of the National Green Tribunal (NGT)?",
        options: [
          "जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम, 1974",
          "पर्यावरण (संरक्षण) अधिनियम, 1986",
          "वन्यजीव (संरक्षण) अधिनियम, 1972",
          "जैव विविधता अधिनियम, 2002"
        ],
        correctIndex: 2,
        explanation: "वन्यजीव (संरक्षण) अधिनियम, 1972 और भारतीय वन अधिनियम, 1927 NGT अधिनियम 2010 की अनुसूची I में शामिल नहीं हैं, अतः वे NGT के क्षेत्राधिकार से बाहर हैं।",
        explanationEn: "The Wildlife (Protection) Act, 1972 and Indian Forest Act, 1927 are excluded from Schedule I of the NGT Act 2010 and hence remain outside NGT jurisdiction.",
      },
      {
        _key: "mcq-3",
        question: "वन्यजीव संरक्षण अधिनियम 1972 की किस अनुसूची के तहत आने वाले जीवों को 'कीट-पतंग' (Vermin) घोषित कर शिकार किया जा सकता है?",
        questionEn: "Which Schedule of the Wildlife Protection Act 1972 categorizes animals as 'Vermin' that can be hunted freely?",
        options: [
          "अनुसूची I / Schedule I",
          "अनुसूची III / Schedule III",
          "अनुसूची V / Schedule V",
          "अनुसूची VI / Schedule VI"
        ],
        correctIndex: 2,
        explanation: "अनुसूची V में कौवे, चूहे और फल खाने वाले चमगादड़ जैसे कीट-पतंग (Vermin) जानवर शामिल हैं, जिनका शिकार किया जा सकता है।",
        explanationEn: "Schedule V contains Vermin species (such as common crows, rats, and fruit bats) that are exempt from general hunting bans.",
      },
      {
        _key: "mcq-4",
        question: "केंद्रीय प्रदूषण नियंत्रण बोर्ड (CPCB) की स्थापना किस वर्ष और किस अधिनियम के तहत हुई थी?",
        questionEn: "In which year and under which Act was the Central Pollution Control Board (CPCB) established?",
        options: [
          "1972 - वन्यजीव संरक्षण अधिनियम",
          "1974 - जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम",
          "1981 - वायु (प्रदूषण निवारण एवं नियंत्रण) अधिनियम",
          "1986 - पर्यावरण संरक्षण अधिनियम"
        ],
        correctIndex: 1,
        explanation: "CPCB की स्थापना सितंबर 1974 में जल (प्रदूषण निवारण एवं नियंत्रण) अधिनियम, 1974 के तहत की गई थी।",
        explanationEn: "CPCB was established in September 1974 under the statutory provisions of the Water (Prevention and Control of Pollution) Act, 1974.",
      },
      {
        _key: "mcq-5",
        question: "राष्ट्रीय जैव विविधता प्राधिकरण (NBA) का मुख्यालय भारत के किस शहर में स्थित है?",
        questionEn: "In which Indian city is the headquarters of the National Biodiversity Authority (NBA) situated?",
        options: [
          "नई दिल्ली / New Delhi",
          "भोपाल / Bhopal",
          "चेन्नई / Chennai",
          "कोलकाता / Kolkata"
        ],
        correctIndex: 2,
        explanation: "राष्ट्रीय जैव विविधता प्राधिकरण (NBA) की स्थापना 2003 में हुई थी और इसका मुख्यालय चेन्नई (तमिलनाडु) में है।",
        explanationEn: "The National Biodiversity Authority (NBA) was established in 2003 and is headquartered in Chennai, Tamil Nadu.",
      },
      {
        _key: "mcq-6",
        question: "वायु (प्रदूषण निवारण एवं नियंत्रण) अधिनियम 1981 में किस वर्ष संशोधन करके 'ध्वनि प्रदूषण' को शामिल किया गया था?",
        questionEn: "In which year was 'Noise Pollution' officially included in the Air Act 1981 via amendment?",
        options: [
          "1985",
          "1987",
          "1991",
          "2000"
        ],
        correctIndex: 1,
        explanation: "1987 के संशोधन अधिनियम द्वारा वायु (प्रदूषण निवारण एवं नियंत्रण) अधिनियम 1981 में ध्वनि प्रदूषण को वायु प्रदूषक के रूप में शामिल किया गया था।",
        explanationEn: "Noise pollution was explicitly incorporated into the definition of air pollutants under the Air Act of 1981 through an amendment in 1987.",
      },
      {
        _key: "mcq-7",
        question: "भारतीय संविधान का 42वां संशोधन अधिनियम (1976) पर्यावरण संरक्षण से संबंधित कौन सा अनुच्छेद जोड़ता है?",
        questionEn: "Which Articles related to environmental protection were inserted into the Constitution by the 42nd Amendment Act (1976)?",
        options: [
          "अनुच्छेद 21 एवं 19 / Article 21 and 19",
          "अनुच्छेद 48A एवं 51A(g) / Article 48A and 51A(g)",
          "अनुच्छेद 32 एवं 226 / Article 32 and 226",
          "अनुच्छेद 370 एवं 371 / Article 370 and 371"
        ],
        correctIndex: 1,
        explanation: "42वें संशोधन (1976) ने नीति निदेशक तत्वों में अनुच्छेद 48A (राज्य का कर्तव्य) और मौलिक कर्तव्यों में अनुच्छेद 51A(g) (नागरिक का कर्तव्य) जोड़ा।",
        explanationEn: "The 42nd Constitutional Amendment Act of 1976 added Article 48A (Directive Principles) and Article 51A(g) (Fundamental Duties) for environmental protection.",
      },
      {
        _key: "mcq-8",
        question: "वन (संरक्षण) अधिनियम, 1980 की सबसे मुख्य विशेषता निम्नलिखित में से कौन सी है?",
        questionEn: "Which of the following is the defining feature of the Forest (Conservation) Act, 1980?",
        options: [
          "वन भूमियों को निजी कंपनियों को बेचना",
          "गैर-वन उपयोग के लिए केंद्र सरकार की पूर्व अनुमति अनिवार्य करना",
          "वन्यजीवों के शिकार की अनुमति देना",
          "पंचायतों को वनों की पूर्ण नीलामी का अधिकार देना"
        ],
        correctIndex: 1,
        explanation: "1980 का वन संरक्षण अधिनियम यह अनिवार्य करता है कि राज्य सरकारें केंद्र सरकार की पूर्व अनुमति के बिना वन भूमि को गैर-वन उद्देश्यों के लिए हस्तांतरित नहीं कर सकतीं।",
        explanationEn: "The Forest Conservation Act 1980 mandates prior Central Government permission before any state government can divert reserved forest land for non-forestry purposes.",
      }
    ]
  };

  console.log("📝 Writing/Replacing document in Sanity CMS:", article.titleEn);
  await client.createOrReplace(article);

  console.log("🎉 Successfully published Environmental Laws in India Static GK Article to Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error uploading article:", err);
  process.exit(1);
});
