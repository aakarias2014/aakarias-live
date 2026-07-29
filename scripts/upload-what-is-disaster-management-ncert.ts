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
  console.log("🚀 Uploading Complete Bilingual (Hindi & English) NCERT Disaster Management Article to Sanity CMS...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const destTypes = path.join(publicBlogDir, "ncert_disaster_management_concept_types.png");

  if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });

  const docId = "gk-what-is-disaster-management-ncert";
  const slug = "what-is-disaster-management-ncert-types-mppsc-notes";

  // Check if image exists in publicBlogDir
  let assetTypesRef: string | undefined = undefined;
  if (fs.existsSync(destTypes)) {
    console.log("📸 Uploading image to Sanity...");
    const assetTypes = await client.assets.upload("image", fs.createReadStream(destTypes), {
      filename: "ncert_disaster_management_concept_types.png",
    });
    assetTypesRef = assetTypes._id;
  }

  const articleDoc = {
    _id: docId,
    _type: "staticGk",
    title: "आपदा प्रबंधन क्या है? अर्थ, प्रकार, चरण, आवश्यकता एवं NCERT नोट्स | MPPSC & UPSC Notes",
    titleEn: "What is Disaster Management: Concept, Types, Cycle, Institutional Framework & NCERT Notes | MPPSC & UPSC Notes",
    slug: { _type: "slug", current: slug },
    category: { _type: "reference", _ref: "cat-disaster-management" },
    ca_date: "2026-07-27",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 9,
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    excerpt: "आपदा प्रबंधन (Disaster Management) की अवधारणा, प्राकृतिक एवं मानव निर्मित आपदाओं का वर्गीकरण (NCERT डेटा), आपदा प्रबंधन चक्र, आवश्यकता, पूर्व तैयारी एवं सुरक्षात्मक उपाय। MPPSC Mains GS Paper 3 हेतु सम्पूर्ण नोट्स।",
    excerptEn: "Comprehensive guide on Disaster Management based on NCERT material. Covers definition, natural vs manmade disasters, disaster management cycle, preparedness, emergency kit, and NDMA framework for MPPSC and UPSC exams.",
    seoTitle: "आपदा प्रबंधन क्या है? आपदा के प्रकार, चक्र व NCERT नोट्स | MPPSC & UPSC",
    seoDescription: "आपदा प्रबंधन (Disaster Management in Hindi): आपदा का अर्थ, प्राकृतिक व मानव निर्मित आपदाएँ (NCERT डेटा), 6 प्रमुख चरण, आपातकालीन किट, आवश्यकता एवं MPPSC Mains Paper 3 हेतु 8 MCQs व FAQs।",
    keywords: [
      "आपदा प्रबंधन क्या है",
      "what is disaster management ncert",
      "aapda prabandhan kya hai",
      "disaster management notes mppsc",
      "disaster management cycle",
      "natural and manmade disasters",
      "NDMA",
      "SDRF",
      "NDRF",
      "MPPSC Mains GS Paper 3"
    ],
    ...(assetTypesRef ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetTypesRef },
        alt: "Disaster Management Concept Types Natural and Manmade Disasters NCERT Notes MPPSC",
      }
    } : {}),

    /* ─── HINDI BODY ─── */
    body: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. आपदा एवं आपदा प्रबंधन की अवधारणा" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "किसी भी क्षेत्र में होने वाली ऐसी अनपेक्षित दुर्घटना या विनाशकारी घटना जिससे सामान्य जन-जीवन गंभीर रूप से प्रभावित होता है, व्यापक जान-माल की हानि होती है तथा स्थानीय संसाधन उससे निपटने के लिए अपर्याप्त सिद्ध होते हैं, उसे ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "आपदा (Disaster)",
          },
          {
            _type: "span",
            text: " कहा जाता है। ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "आपदा प्रबंधन (Disaster Management)",
          },
          {
            _type: "span",
            text: " वह योजनाबद्ध प्रक्रिया है जिसके अंतर्गत आपदा के जोखिम को कम करने, आपदा पूर्व तैयारी करने, त्वरित राहत एवं बचाव कार्य संचालित करने तथा आपदा के बाद पुनर्वास व पुनर्निर्माण के प्रयास शामिल होते हैं।",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. आपदाओं का वर्गीकरण: प्राकृतिक एवं मानव-निर्मित" }],
      },
      {
        _type: "table",
        caption: "NCERT के अनुसार आपदाओं का विस्तृत वर्गीकरण",
        headers: ["आपदा की श्रेणी", "उदाहरण एवं प्रमुख घटक"],
        rows: [
          ["**प्राकृतिक आपदाएँ (Natural Disasters)**", "• **भू-भौतिकी**: भूकंप, सुनामी, भूस्खलन, ज्वालामुखी विस्फोट।\n• **मौसम संबंधी**: चक्रवात, बवंडर, ओलावृष्टि, बादल फटना।\n• **जल-जलवायु संबंधी**: बाढ़, सूखा, लू (Heat Wave), शीत लहर।\n• **जैविक आपदाएँ**: महामारी (जैसे कोविड-19), टिड्डी दल का हमला।"],
          ["**मानव-निर्मित आपदाएँ (Man-made Disasters)**", "• **औद्योगिक/रासायनिक**: जहरीली गैस का रिसाव (जैसे भोपाल गैस त्रासदी 1984), रासायनिक विस्फोट।\n• **परमाणु/नाभिकीय**: चेरनोबिल, फुकुशिमा परमाणु दुर्घटना।\n• **तकनीकी/परिवहन**: ट्रेन दुर्घटना, विमान दुर्घटना, पुल ढहना।\n• **सामाजिक-राजनीतिक**: दंगे, आतंकवाद, युद्ध, भगदड़।"]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. आपदा प्रबंधन चक्र (Disaster Management Cycle)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. आपदा पूर्व चरण (Pre-Disaster Phase)**: रोकथाम (Prevention), शमन (Mitigation), एवं पूर्व तैयारी (Preparedness)।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. आपदा के दौरान चरण (During-Disaster Phase)**: त्वरित प्रतिक्रिया (Response), खोज एवं बचाव कार्य (Search & Rescue), एवं प्राथमिक चिकित्सा।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. आपदा पश्चात चरण (Post-Disaster Phase)**: राहत कार्य (Relief), पुनर्वास (Rehabilitation), एवं पुनर्निर्माण (Reconstruction - Build Back Better)।" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. भारत में संस्थागत ढाँचा (Institutional Framework in India)" }],
      },
      {
        _type: "table",
        caption: "आपदा प्रबंधन अधिनियम 2005 के तहत भारत का त्रिस्तरीय ढाँचा",
        headers: ["स्तर", "प्राधिकरण / संस्था", "अध्यक्ष / प्रमुख"],
        rows: [
          ["**राष्ट्रीय स्तर**", "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA)", "प्रधानमंत्री (PM)"],
          ["**राज्य स्तर**", "राज्य आपदा प्रबंधन प्राधिकरण (SDMA)", "मुख्यमंत्री (CM)"],
          ["**जिला स्तर**", "जिला आपदा प्रबंधन प्राधिकरण (DDMA)", "जिला कलेक्टर / मैजिस्ट्रेट (DM)"],
          ["**प्रतिक्रिया बल**", "राष्ट्रीय आपदा मोचन बल (NDRF)", "महानिदेशक (DG, NDRF)"]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. परीक्षा हेतु महत्वपूर्ण तथ्य एवं स्मरणीय बिंदु" }],
      },
      {
        _type: "facts",
        items: [
          { label: "आपदा प्रबंधन अधिनियम", value: "**23 दिसंबर 2005** को लागू" },
          { label: "NDMA अध्यक्ष", value: "**भारत के प्रधानमंत्री**" },
          { label: "SDMA अध्यक्ष", value: "**संबंधित राज्य के मुख्यमंत्री**" },
          { label: "DDMA अध्यक्ष", value: "**जिला कलेक्टर / मैजिस्ट्रेट**" },
          { label: "NDRF स्थापना", value: "**2006 (12 बटालियन)**" },
          { label: "नवीन संशोधन", value: "**आपदा प्रबंधन (संशोधन) अधिनियम 2025** (UDMA व NCMC को वैधानिक दर्जा)" }
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "6. संबंधित अध्ययन सामग्री एवं नोट्स" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [आपदा प्रबंधन (संशोधन) अधिनियम 2025: NCMC, UDMA धारा 41A व MPPSC Notes](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय: संपूर्ण सूची व रिपोर्ट्स](/general-awareness/international-organizations-and-their-headquarters-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [भारत की जनसंख्या नीति: NPP-2000, TFR 2.1 व नोट्स](/general-awareness/population-policy-of-india-npp-2000-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "7. निष्कर्ष" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "आपदा प्रबंधन एक सतत और एकीकृत प्रक्रिया है। MPPSC मुख्य परीक्षा GS Paper 3 एवं UPSC अभ्यर्थियों के लिए आपदा प्रबंधन के सिद्धांत, चक्र और संस्थागत ढाँचे को समझना उत्तर लेखन की दृष्टि से अति महत्वपूर्ण है।",
          },
        ],
      },
    ],

    /* ─── ENGLISH BODY ─── */
    bodyEn: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. Concept & Definition of Disaster Management" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "A disaster is a sudden, catastrophic event that severely disrupts the normal functioning of a community or society, causing widespread human, material, economic, or environmental losses that exceed the affected community's ability to cope using its own resources. ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "Disaster Management",
          },
          {
            _type: "span",
            text: " is a continuous, integrated process of planning, organizing, coordinating, and implementing measures necessary for risk reduction, emergency response, relief, and post-disaster rehabilitation.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. Classification of Disasters: Natural vs. Man-made" }],
      },
      {
        _type: "table",
        caption: "Classification of Disasters based on NCERT Curriculum",
        headers: ["Category of Disaster", "Examples & Sub-types"],
        rows: [
          ["**Natural Disasters**", "• **Geophysical**: Earthquakes, Tsunamis, Landslides, Volcanic Eruptions.\n• **Meteorological**: Cyclones, Tornadoes, Hailstorms, Cloudbursts.\n• **Hydrological/Climatic**: Floods, Droughts, Heat Waves, Cold Waves.\n• **Biological**: Pandemics (e.g., COVID-19), Locust Attacks."],
          ["**Man-made Disasters**", "• **Industrial/Chemical**: Toxic gas leaks (e.g., Bhopal Gas Tragedy 1984), chemical explosions.\n• **Nuclear/Radiological**: Chernobyl, Fukushima nuclear disasters.\n• **Technical/Transport**: Major train accidents, plane crashes, structural collapses.\n• **Socio-Political**: Riots, terrorism, stampedes, armed conflict."]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. Disaster Management Cycle" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. Pre-Disaster Phase**: Prevention, Hazard Mitigation, and Community Preparedness." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. During-Disaster Phase**: Immediate Emergency Response, Search & Rescue operations, and First Aid." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. Post-Disaster Phase**: Relief Distribution, Rehabilitation, and Reconstruction (Build Back Better)." }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. Institutional Framework in India" }],
      },
      {
        _type: "table",
        caption: "Three-Tier Institutional Framework under Disaster Management Act 2005",
        headers: ["Level", "Authority / Body", "Head / Chairperson"],
        rows: [
          ["**National Level**", "National Disaster Management Authority (NDMA)", "Prime Minister of India"],
          ["**State Level**", "State Disaster Management Authority (SDMA)", "Chief Minister of State"],
          ["**District Level**", "District Disaster Management Authority (DDMA)", "District Collector / Magistrate"],
          ["**Response Force**", "National Disaster Response Force (NDRF)", "Director General (DG, NDRF)"]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. High-Yield Revision Takeaways for MPPSC & UPSC" }],
      },
      {
        _type: "facts",
        items: [
          { label: "DM Act 2005 Enactment", value: "**23 December 2005**" },
          { label: "NDMA Head", value: "**Prime Minister of India**" },
          { label: "SDMA Head", value: "**Chief Minister** of respective State" },
          { label: "DDMA Head", value: "**District Collector / DM**" },
          { label: "NDRF Raised", value: "**2006 (12 Battalions)**" },
          { label: "2025 Amendment", value: "**Disaster Management (Amendment) Act 2025** (Statutory status to NCMC & UDMA Section 41A)" }
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "6. Related Study Material & Interlinked Notes" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [Disaster Management (Amendment) Act 2025: UDMA Section 41A Notes](/en/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [International Organizations & Headquarters List](/en/general-awareness/international-organizations-and-their-headquarters-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [Population Policy of India: NPP-2000 Notes](/en/general-awareness/population-policy-of-india-npp-2000-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "7. Conclusion" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Disaster management is an essential subject for MPPSC Mains GS Paper 3 and UPSC CSE. A clear understanding of the disaster management cycle, natural vs man-made classification, and NDMA framework ensures high-scoring answer writing.",
          },
        ],
      },
    ],

    /* ─── BILINGUAL FAQS ─── */
    faqs: [
      {
        question: "आपदा प्रबंधन अधिनियम किस वर्ष लागू किया गया था?",
        questionEn: "In which year was the Disaster Management Act enacted in India?",
        answer: "भारत में आपदा प्रबंधन अधिनियम 23 दिसंबर 2005 को लागू किया गया था।",
        answerEn: "The Disaster Management Act was enacted in India on December 23, 2005."
      },
      {
        question: "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) के अध्यक्ष कौन होते हैं?",
        questionEn: "Who is the ex-officio Chairperson of NDMA?",
        answer: "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) के पदेन अध्यक्ष भारत के प्रधानमंत्री होते हैं।",
        answerEn: "The ex-officio Chairperson of NDMA is the Prime Minister of India."
      },
      {
        question: "जिला आपदा प्रबंधन प्राधिकरण (DDMA) का नेतृत्व कौन करता है?",
        questionEn: "Who heads the District Disaster Management Authority (DDMA)?",
        answer: "जिला स्तर पर DDMA का नेतृत्व जिला कलेक्टर / मैजिस्ट्रेट (DM) द्वारा किया जाता है।",
        answerEn: "DDMA is headed by the District Collector / District Magistrate."
      },
      {
        question: "आपदा प्रबंधन चक्र के मुख्य चरण कौन-कौन से हैं?",
        questionEn: "What are the main phases of the Disaster Management Cycle?",
        answer: "इसके तीन प्रमुख चरण हैं: आपदा पूर्व (रोकथाम, शमन, पूर्व तैयारी), आपदा के दौरान (त्वरित प्रतिक्रिया, खोज व बचाव), एवं आपदा पश्चात (राहत, पुनर्वास, पुनर्निर्माण)।",
        answerEn: "The three main phases are Pre-disaster (prevention, mitigation, preparedness), During-disaster (response, search & rescue), and Post-disaster (relief, rehabilitation, reconstruction)."
      }
    ],

    /* ─── BILINGUAL MCQS ─── */
    mcqs: [
      {
        question: "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) की स्थापना किस अधिनियम के तहत की गई थी?",
        questionEn: "Under which Act was the National Disaster Management Authority (NDMA) established?",
        options: ["A. पर्यावरण संरक्षण अधिनियम 1986", "B. आपदा प्रबंधन अधिनियम 2005", "C. महामारी अधिनियम 1897", "D. राष्ट्रीय सुरक्षा अधिनियम 1980"],
        optionsEn: ["A. Environment Protection Act 1986", "B. Disaster Management Act 2005", "C. Epidemic Diseases Act 1897", "D. National Security Act 1980"],
        correctIndex: 1,
        explanation: "NDMA की स्थापना आपदा प्रबंधन अधिनियम 2005 के तहत की गई थी।",
        explanationEn: "NDMA was established under the Disaster Management Act, 2005."
      },
      {
        question: "आपदा प्रबंधन अधिनियम 2005 के अनुसार राज्य आपदा प्रबंधन प्राधिकरण (SDMA) के अध्यक्ष कौन होते हैं?",
        questionEn: "Who is the Chairperson of the State Disaster Management Authority (SDMA)?",
        options: ["A. राज्य के राज्यपाल", "B. राज्य के मुख्यमंत्री", "C. गृह मंत्री", "D. मुख्य सचिव"],
        optionsEn: ["A. Governor of the State", "B. Chief Minister of the State", "C. Home Minister", "D. Chief Secretary"],
        correctIndex: 1,
        explanation: "राज्य स्तर पर SDMA के अध्यक्ष संबंधित राज्य के मुख्यमंत्री होते हैं।",
        explanationEn: "The Chief Minister of the respective State is the Chairperson of SDMA."
      },
      {
        question: "भोपाल गैस त्रासदी (1984) किस प्रकार की आपदा का उदाहरण है?",
        questionEn: "The Bhopal Gas Tragedy (1984) is an example of which type of disaster?",
        options: ["A. प्राकृतिक भू-भौतिकीय आपदा", "B. औद्योगिक व रासायनिक मानव-निर्मित आपदा", "C. जैविक आपदा", "D. मौसम संबंधी आपदा"],
        optionsEn: ["A. Natural Geophysical Disaster", "B. Industrial & Chemical Man-made Disaster", "C. Biological Disaster", "D. Meteorological Disaster"],
        correctIndex: 1,
        explanation: "भोपाल गैस त्रासदी मिथाइल आइसोसाइनेट (MIC) गैस रिसाव के कारण हुई एक औद्योगिक व रासायनिक आपदा थी।",
        explanationEn: "Bhopal Gas Tragedy was a major industrial chemical disaster caused by Methyl Isocyanate gas leak."
      },
      {
        question: "राष्ट्रीय आपदा मोचन बल (NDRF) का गठन किस वर्ष किया गया था?",
        questionEn: "In which year was the National Disaster Response Force (NDRF) constituted?",
        options: ["A. 2001", "B. 2005", "C. 2006", "D. 2010"],
        optionsEn: ["A. 2001", "B. 2005", "C. 2006", "D. 2010"],
        correctIndex: 2,
        explanation: "NDRF का गठन वर्ष 2006 में आपदा प्रबंधन अधिनियम 2005 के तहत किया गया था।",
        explanationEn: "NDRF was constituted in 2006 under Section 44 of the Disaster Management Act, 2005."
      }
    ]
  };

  console.log(`📝 Syncing Fully Bilingual NCERT Disaster Management Article "${articleDoc._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(articleDoc);
  console.log(`🎉 SUCCESS! Fully Bilingual Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading NCERT Disaster Management article:", err);
  process.exit(1);
});
