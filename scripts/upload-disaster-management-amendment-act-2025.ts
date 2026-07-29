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
  console.log("🚀 Uploading Complete Bilingual (Hindi & English) Disaster Management Amendment Act 2025 Article to Sanity CMS...");

  const docId = "ca-disaster-management-amendment-act-2025";
  const slug = "disaster-management-amendment-act-2025-mppsc-upsc-notes";

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const destImg = path.join(publicBlogDir, "disaster_management_amendment_act_2025_udma.png");

  let assetRef: string | undefined = undefined;
  if (fs.existsSync(destImg)) {
    console.log("📸 Uploading image to Sanity...");
    const asset = await client.assets.upload("image", fs.createReadStream(destImg), {
      filename: "disaster_management_amendment_act_2025_udma.png",
    });
    assetRef = asset._id;
  }

  const articleDoc = {
    _id: docId,
    _type: "currentAffairs",
    title: "आपदा प्रबंधन (संशोधन) अधिनियम 2025: NCMC, UDMA धारा 41A एवं प्रमुख प्रावधान | MPPSC & UPSC Notes",
    titleEn: "Disaster Management (Amendment) Act 2025: NCMC Statutory Status, UDMA Section 41A & Key Provisions | MPPSC & UPSC Notes",
    slug: { _type: "slug", current: slug },
    category: { _type: "reference", _ref: "cat-disaster-management" },
    ca_date: "2026-07-28",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 11,
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    excerpt: "आपदा प्रबंधन (संशोधन) अधिनियम 2025 के मुख्य प्रावधान: NCMC व HLC को वैधानिक दर्जा, शहरी आपदा प्रबंधन प्राधिकरण (UDMA - धारा 41A), राष्ट्रीय आपदा डेटाबेस, राज्य आपदा प्रतिक्रिया बल (SDRF) का सुदृढ़ीकरण। MPPSC & UPSC परीक्षा नोट्स।",
    excerptEn: "Detailed analysis of Disaster Management (Amendment) Act 2025. Statutory backing for National Crisis Management Committee (NCMC), Urban Disaster Management Authorities (UDMA under Section 41A), National Disaster Database, and SDRF provisions for MPPSC and UPSC exams.",
    seoTitle: "आपदा प्रबंधन (संशोधन) अधिनियम 2025 | UDMA Section 41A & NCMC | MPPSC & UPSC",
    seoDescription: "आपदा प्रबंधन (संशोधन) अधिनियम 2025: NCMC व HLC को वैधानिक दर्जा, UDMA (धारा 41A), राष्ट्रीय आपदा डेटाबेस व SDRF प्रावधान। MPPSC & UPSC परीक्षा हेतु विश्लेषणात्मक नोट्स, MCQs व FAQs।",
    keywords: [
      "आपदा प्रबंधन संशोधन अधिनियम 2025",
      "Disaster Management Amendment Act 2025",
      "UDMA Section 41A",
      "Urban Disaster Management Authority",
      "NCMC statutory status",
      "National Crisis Management Committee",
      "National Disaster Database",
      "MPPSC Notes",
      "UPSC Notes"
    ],
    ...(assetRef ? {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetRef },
        alt: "Disaster Management Amendment Act 2025 UDMA Section 41A NCMC Statutory Status MPPSC UPSC",
      }
    } : {}),

    /* ─── HINDI BODY ─── */
    body: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. चर्चा में क्यों? एवं अधिनियम की पृष्ठभूमि" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "संसद द्वारा हाल ही में 20 वर्ष पुराने ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "आपदा प्रबंधन अधिनियम, 2005",
          },
          {
            _type: "span",
            text: " में दूरगामी संशोधन करने हेतु ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "आपदा प्रबंधन (संशोधन) अधिनियम, 2025",
          },
          {
            _type: "span",
            text: " पारित किया गया है। जलवायु परिवर्तन के कारण शहरी बाढ़, बादल फटने और भीषण प्राकृतिक आपदाओं की बढ़ती आवृत्ति को देखते हुए भारत के आपदा प्रतिक्रिया तंत्र को आधुनिक बनाने के लिए यह संशोधन लाया गया है।",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. संशोधन अधिनियम 2025 के मुख्य प्रावधान एवं बदलाव" }],
      },
      {
        _type: "table",
        caption: "आपदा प्रबंधन (संशोधन) अधिनियम 2025 के मुख्य नवाचार एवं प्रावधान",
        headers: ["क्षेत्र / विषय", "2005 का मूल अधिनियम", "2025 संशोधन अधिनियम का नया प्रावधान"],
        rows: [
          ["**NCMC का दर्जा**", "प्रशासनिक निकाय (कार्यकारी आदेश से)", "**वैधानिक दर्जा (Statutory Status)** प्राप्त"],
          ["**शहरी आपदा प्रबंधन**", "कोई पृथक संस्थागत ढाँचा नहीं", "**UDMA (धारा 41A)**: राज्य की राजधानी व नगर निगमों में शहरी आपदा प्राधिकरण"],
          ["**आपदा डेटाबेस**", "कोई एकीकृत केंद्रीय डेटाबेस नहीं", "**राष्ट्रीय आपदा डेटाबेस (National Disaster Database)** की स्थापना"],
          ["**HLC समिति**", "गृह मंत्री की अध्यक्षता में प्रशासनिक समिति", "**उच्च स्तरीय समिति (HLC)** को वैधानिक मान्यता"],
          ["**SDRF सुदृढ़ीकरण**", "सीमित वित्तीय लचीलापन", "राज्य आपदा प्रतिक्रिया बल हेतु वित्तीय एवं परिचालन शक्तियों का विस्तार"]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. शहरी आपदा प्रबंधन प्राधिकरण (UDMA - धारा 41A)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **धारा 41A का समावेश**: नए अधिनियम के तहत धारा 41A जोड़ी गई है जो राज्य सरकारों को राज्य की राजधानी तथा 10 लाख से अधिक आबादी वाले नगर निगम शहरों के लिए पृथक **शहरी आपदा प्रबंधन प्राधिकरण (Urban Disaster Management Authority - UDMA)** गठित करने की शक्ति देती है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **अध्यक्षता**: UDMA की अध्यक्षता नगर निगम के आयुक्त (Municipal Commissioner) या जिला मजिस्ट्रेट द्वारा की जाएगी।" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. NCMC एवं HLC को वैधानिक दर्जा" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **राष्ट्रीय संकट प्रबंधन समिति (NCMC)**: कैबिनेट सचिव (Cabinet Secretary) की अध्यक्षता वाली इस सर्वोच्च संस्था को पहली बार कानून के तहत वैधानिक दर्जा दिया गया है।" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **उच्च स्तरीय समिति (HLC)**: केंद्रीय गृह मंत्री की अध्यक्षता वाली समिति को अंतर-मंत्रालयी समन्वय हेतु वैधानिक शक्तियाँ दी गई हैं।" }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. परीक्षा हेतु महत्वपूर्ण तथ्य एवं स्मरणीय बिंदु" }],
      },
      {
        _type: "facts",
        items: [
          { label: "मूल अधिनियम", value: "**आपदा प्रबंधन अधिनियम 2005**" },
          { label: "संशोधन वर्ष", value: "**2025 (20 वर्ष पश्चात व्यापक संशोधन)**" },
          { label: "UDMA धारा", value: "**धारा 41A (शहरी आपदा प्रबंधन प्राधिकरण)**" },
          { label: "NCMC प्रमुख", value: "**भारत के कैबिनेट सचिव (Cabinet Secretary)**" },
          { label: "HLC प्रमुख", value: "**केंद्रीय गृह मंत्री (Union Home Minister)**" },
          { label: "डेटाबेस", value: "**राष्ट्रीय आपदा डेटाबेस (National Disaster Database)**" }
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
            text: "👉 [आपदा प्रबंधन क्या है? NCERT सिद्धांत, प्रकार व मेन्स उत्तर लेखन नोट्स](/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes)",
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
        style: "h3",
        children: [{ _type: "span", text: "7. निष्कर्ष" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "आपदा प्रबंधन (संशोधन) अधिनियम 2025 भारत के आपदा जोखिम न्यूनीकरण ढाँचे को आधुनिक बनाने की दिशा में एक ऐतिहासिक कदम है। MPPSC Mains GS Paper 3 एवं UPSC अभ्यर्थियों के लिए धारा 41A, UDMA व NCMC के वैधानिक दर्जे का विश्लेषण अति महत्वपूर्ण है।",
          },
        ],
      },
    ],

    /* ─── ENGLISH BODY ─── */
    bodyEn: [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. Why in News? & Background" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Parliament recently enacted the ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "Disaster Management (Amendment) Act 2025",
          },
          {
            _type: "span",
            text: " to replace key frameworks in the two-decade-old Disaster Management Act of 2005. The amendment addresses urban flooding, climate-induced cloudbursts, industrial hazards, and institutional overlap by modernizing India's disaster response architecture.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. Key Provisions & Major Changes Introduced" }],
      },
      {
        _type: "table",
        caption: "Key Comparative Features of Disaster Management (Amendment) Act 2025",
        headers: ["Domain / Subject", "Original 2005 Act Framework", "New 2025 Amendment Act Provision"],
        rows: [
          ["**NCMC Status**", "Administrative body under executive order", "**Statutory backing** granted under law"],
          ["**Urban Disaster Mgmt**", "No separate institutional tier", "**UDMA (Section 41A)**: Urban Disaster Management Authority for state capitals & million-plus cities"],
          ["**Disaster Database**", "No centralized unified database", "Creation of a **National Disaster Database**"],
          ["**High Level Committee**", "Administrative committee headed by Home Minister", "**High-Level Committee (HLC)** given statutory status"],
          ["**SDRF Operational Power**", "Limited financial flexibility", "Expanded operational and financial powers for State Disaster Response Forces"]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. Urban Disaster Management Authority (UDMA - Section 41A)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Insertion of Section 41A**: Enables State Governments to constitute a dedicated **Urban Disaster Management Authority (UDMA)** for state capital cities and municipal corporations with a population exceeding one million." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **Head of UDMA**: Chaired by the Municipal Commissioner or District Magistrate of the respective city." }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. Statutory Backing to NCMC & HLC" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **National Crisis Management Committee (NCMC)**: Headed by the **Cabinet Secretary of India**, NCMC is officially granted statutory powers for apex crisis management." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **High-Level Committee (HLC)**: Headed by the Union Home Minister, authorized under law for inter-ministerial relief funding and emergency allocation." }]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. High-Yield Takeaways for MPPSC & UPSC" }],
      },
      {
        _type: "facts",
        items: [
          { label: "Principal Act", value: "**Disaster Management Act, 2005**" },
          { label: "Amendment Enactment", value: "**2025 (First major overhaul in 20 years)**" },
          { label: "UDMA Section", value: "**Section 41A (Urban Disaster Management Authority)**" },
          { label: "NCMC Head", value: "**Cabinet Secretary of India**" },
          { label: "HLC Head", value: "**Union Home Minister**" },
          { label: "National Database", value: "**National Disaster Database**" }
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
            text: "👉 [What is Disaster Management? NCERT Concepts & MPPSC Notes](/en/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes)",
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
        style: "h3",
        children: [{ _type: "span", text: "7. Conclusion" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The Disaster Management (Amendment) Act 2025 marks a landmark paradigm shift towards urban disaster mitigation and statutory governance in India. For MPPSC Mains GS Paper 3 and UPSC CSE aspirants, questions on Section 41A, UDMA, and NCMC are highly expected.",
          },
        ],
      },
    ],

    /* ─── BILINGUAL FAQS ─── */
    faqs: [
      {
        question: "आपदा प्रबंधन (संशोधन) अधिनियम 2025 में UDMA की स्थापना किस धारा के तहत की गई है?",
        questionEn: "Under which Section is the Urban Disaster Management Authority (UDMA) introduced in the 2025 Amendment Act?",
        answer: "शहरी आपदा प्रबंधन प्राधिकरण (UDMA) की स्थापना नए कानून की धारा 41A के तहत की गई है।",
        answerEn: "UDMA is introduced under Section 41A of the Disaster Management (Amendment) Act 2025."
      },
      {
        question: "राष्ट्रीय संकट प्रबंधन समिति (NCMC) का नेतृत्व कौन करता है?",
        questionEn: "Who heads the National Crisis Management Committee (NCMC)?",
        answer: "NCMC का नेतृत्व भारत के कैबिनेट सचिव (Cabinet Secretary) करते हैं।",
        answerEn: "NCMC is headed by the Cabinet Secretary of India."
      },
      {
        question: "उच्च स्तरीय समिति (HLC) के अध्यक्ष कौन होते हैं?",
        questionEn: "Who is the Chairperson of the High-Level Committee (HLC)?",
        answer: "उच्च स्तरीय समिति (HLC) के अध्यक्ष केंद्रीय गृह मंत्री (Union Home Minister) होते हैं।",
        answerEn: "The High-Level Committee (HLC) is chaired by the Union Home Minister."
      }
    ],

    /* ─── BILINGUAL MCQS ─── */
    mcqs: [
      {
        question: "आपदा प्रबंधन (संशोधन) अधिनियम 2025 के तहत किस धारा के अंतर्गत शहरी आपदा प्रबंधन प्राधिकरण (UDMA) के गठन का प्रावधान है?",
        questionEn: "Under which Section of the Disaster Management (Amendment) Act 2025 is the Urban Disaster Management Authority (UDMA) provided?",
        options: ["A. धारा 24", "B. धारा 35B", "C. धारा 41A", "D. धारा 60"],
        optionsEn: ["A. Section 24", "B. Section 35B", "C. Section 41A", "D. Section 60"],
        correctIndex: 2,
        explanation: "नए अधिनियम की धारा 41A के तहत राज्य की राजधानी तथा 10 लाख से अधिक आबादी वाले नगर निगमों में UDMA के गठन का प्रावधान है।",
        explanationEn: "Section 41A provides for the constitution of Urban Disaster Management Authority (UDMA) in state capitals and million-plus cities."
      },
      {
        question: "राष्ट्रीय संकट प्रबंधन समिति (NCMC) के अध्यक्ष कौन होते हैं?",
        questionEn: "Who is the Chairperson of the National Crisis Management Committee (NCMC)?",
        options: ["A. प्रधानमंत्री", "B. केंद्रीय गृह मंत्री", "C. भारत के कैबिनेट सचिव", "D. गृह सचिव"],
        optionsEn: ["A. Prime Minister", "B. Union Home Minister", "C. Cabinet Secretary of India", "D. Home Secretary"],
        correctIndex: 2,
        explanation: "NCMC का नेतृत्व भारत के कैबिनेट सचिव करते हैं, जिसे 2025 के अधिनियम द्वारा वैधानिक दर्जा दिया गया है।",
        explanationEn: "NCMC is headed by the Cabinet Secretary of India, granted statutory status under the 2025 Act."
      }
    ]
  };

  console.log(`📝 Syncing Fully Bilingual Disaster Management Amendment Act 2025 Article "${articleDoc._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(articleDoc);
  console.log(`🎉 SUCCESS! Fully Bilingual Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading Disaster Management Amendment Act 2025 article:", err);
  process.exit(1);
});
