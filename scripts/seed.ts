import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

// Load env.local explicitly since we are running as a standalone script
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
  console.log("🌱 Seeding dummy data to Sanity...");

  // 1. Authors
  const author = {
    _id: "author-aakar",
    _type: "author",
    slug: { _type: "slug", current: "aakar-team" },
    name: "Aakar IAS Editorial Team",
    role: "Senior Content Developers",
    bio: "Expert educators and content developers specializing in UPSC and State PSC exams preparation.",
  };
  await client.createOrReplace(author);
  console.log("✔ Created Author");

  // 2. Categories
  const categories = [
    {
      _id: "cat-polity",
      _type: "category",
      slug: { _type: "slug", current: "polity" },
      title: "राजव्यवस्था",
      titleEn: "Polity & Constitution",
      description: "संविधान, संसद, शासन और न्यायपालिका से संबंधित लेख।",
      descriptionEn: "Articles related to Constitution, Parliament, Governance, and Judiciary.",
      color: { hex: "#3b82f6" }, // Blue
      icon: "gavel",
    },
    {
      _id: "cat-economy",
      _type: "category",
      slug: { _type: "slug", current: "economy" },
      title: "अर्थव्यवस्था",
      titleEn: "Economy & Development",
      description: "बजट, बैंकिंग, मुद्रास्फीति और बुनियादी ढांचे से जुड़े विषय।",
      descriptionEn: "Topics related to Budget, Banking, Inflation, and Infrastructure.",
      color: { hex: "#10b981" }, // Emerald
      icon: "trending-up",
    },
    {
      _id: "cat-environment",
      _type: "category",
      slug: { _type: "slug", current: "environment" },
      title: "पर्यावरण और जैव विविधता",
      titleEn: "Environment & Ecology",
      description: "जलवायु परिवर्तन, वन्यजीव संरक्षण और पर्यावरण नीतियां।",
      descriptionEn: "Climate change, wildlife conservation, and environmental policies.",
      color: { hex: "#f59e0b" }, // Amber
      icon: "leaf",
    },
    {
      _id: "cat-scitech",
      _type: "category",
      slug: { _type: "slug", current: "science-technology" },
      title: "विज्ञान एवं प्रौद्योगिकी",
      titleEn: "Science & Technology",
      description: "अंतरिक्ष, जैव प्रौद्योगिकी, आईटी और रक्षा से जुड़े विकास।",
      descriptionEn: "Developments in space, biotechnology, IT, and defense.",
      color: { hex: "#8b5cf6" }, // Violet
      icon: "atom",
    },
  ];

  for (const c of categories) {
    await client.createOrReplace(c);
  }
  console.log("✔ Created Categories");

  // 3. Tags
  const tags = [
    { _id: "tag-upsc", _type: "tag", slug: { _type: "slug", current: "upsc" }, name: "UPSC" },
    { _id: "tag-mppsc", _type: "tag", slug: { _type: "slug", current: "mppsc" }, name: "MPPSC" },
    { _id: "tag-prelims", _type: "tag", slug: { _type: "slug", current: "prelims" }, name: "Prelims Special" },
    { _id: "tag-mains", _type: "tag", slug: { _type: "slug", current: "mains" }, name: "Mains Answer Writing" },
  ];

  for (const t of tags) {
    await client.createOrReplace(t);
  }
  console.log("✔ Created Tags");

  // 4. Current Affairs Articles
  const currentAffairs: any[] = [
    {
      _id: "ca-pm-pranam",
      _type: "currentAffairs",
      slug: { _type: "slug", current: "pm-pranam-scheme" },
      title: "पीएम-प्रणाम योजना: वैकल्पिक उर्वरकों को बढ़ावा",
      titleEn: "PM-PRANAM Scheme: Promoting Alternative Fertilizers",
      excerpt: "पीएम-प्रणाम योजना का उद्देश्य रासायनिक उर्वरकों का उपयोग कम करना और वैकल्पिक खादों को बढ़ावा देना है।",
      excerptEn: "PM-PRANAM scheme aims to reduce the use of chemical fertilizers and promote alternative organic manures.",
      publishedAt: new Date().toISOString(),
      featured: true,
      readingTime: 6,
      keywords: ["PM-PRANAM", "Fertilizers", "Agriculture", "UPSC"],
      category: { _type: "reference", _ref: "cat-economy" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [
        { _type: "reference", _ref: "tag-upsc" },
        { _type: "reference", _ref: "tag-mppsc" },
        { _type: "reference", _ref: "tag-prelims" },
      ],
      sections: [
        {
          _key: "sec-why",
          kind: "whyInNews",
          title: "चर्चा में क्यों?",
          titleEn: "Why in News?",
          body: [
            {
              _key: "b1",
              _type: "block",
              children: [
                {
                  _key: "s1",
                  _type: "span",
                  text: "हाल ही में भारत सरकार के रसायन और उर्वरक मंत्रालय ने वैकल्पिक उर्वरकों को बढ़ावा देने के लिए पीएम-प्रणाम योजना की शुरुआत को कैबिनेट की मंजूरी दी है।",
                },
              ],
              style: "normal",
            },
          ],
          bodyEn: [
            {
              _key: "b1",
              _type: "block",
              children: [
                {
                  _key: "s1",
                  _type: "span",
                  text: "Recently, the Ministry of Chemicals and Fertilizers approved the launch of the PM-PRANAM scheme to incentivize states to promote alternative organic fertilizers.",
                },
              ],
              style: "normal",
            },
          ],
        },
        {
          _key: "sec-highlights",
          kind: "keyHighlights",
          title: "मुख्य बिंदु",
          titleEn: "Key Highlights",
          body: [
            {
              _key: "b2",
              _type: "block",
              children: [
                {
                  _key: "s2",
                  _type: "span",
                  text: "योजना के तहत, उर्वरक सब्सिडी बचाने वाले राज्यों को बची हुई राशि का 50% वैकल्पिक उर्वरक विकास निधि के रूप में दिया जाएगा।",
                },
              ],
              style: "normal",
            },
          ],
          bodyEn: [
            {
              _key: "b2",
              _type: "block",
              children: [
                {
                  _key: "s2",
                  _type: "span",
                  text: "Under this scheme, states that reduce their chemical fertilizer consumption will be awarded 50% of the saved subsidy as an alternative fertilizer development grant.",
                },
              ],
              style: "normal",
            },
          ],
        },
      ],
      mcqs: [
        {
          question: "PM-PRANAM योजना का प्राथमिक उद्देश्य क्या है?",
          options: [
            "किसानों को सौर पंप प्रदान करना",
            "रासायनिक उर्वरकों के उपयोग को कम करना और वैकल्पिक उर्वरकों को बढ़ावा देना",
            "मछली पालन को बढ़ावा देना",
            "डिजिटल साक्षरता प्रदान करना",
          ],
          correctIndex: 1,
          explanation: "PM-PRANAM (Program for Restoration, Awareness, Nourishment and Amelioration of Mother Earth) का मुख्य लक्ष्य रासायनिक उर्वरकों के संतुलित उपयोग को बढ़ावा देना है।",
        },
      ],
      faqs: [
        {
          question: "PM-PRANAM का फुल फॉर्म क्या है?",
          answer: "Program for Restoration, Awareness, Nourishment and Amelioration of Mother Earth (पीएम-प्रणाम)।",
        },
      ],
    },
    {
      _id: "ca-digital-rupee",
      _type: "currentAffairs",
      slug: { _type: "slug", current: "digital-rupee-cbdc" },
      title: "डिजिटल रुपया: केंद्रीय बैंक डिजिटल मुद्रा (CBDC)",
      titleEn: "Digital Rupee: Central Bank Digital Currency (CBDC)",
      excerpt: "आरबीआई द्वारा पायलट प्रोजेक्ट के रूप में जारी डिजिटल रुपया भारत के वित्तीय परिदृश्य में बदलाव ला रहा है।",
      excerptEn: "The digital rupee (e-Rupee) pilot by the RBI is set to transform the payment ecosystem in India.",
      publishedAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
      featured: false,
      readingTime: 5,
      keywords: ["CBDC", "RBI", "Digital Rupee", "Polity", "Economy"],
      category: { _type: "reference", _ref: "cat-economy" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [
        { _type: "reference", _ref: "tag-upsc" },
        { _type: "reference", _ref: "tag-prelims" },
        { _type: "reference", _ref: "tag-mains" },
      ],
      sections: [
        {
          _key: "sec-why",
          kind: "whyInNews",
          title: "चर्चा में क्यों?",
          titleEn: "Why in News?",
          body: [
            {
              _key: "b1",
              _type: "block",
              children: [
                {
                  _key: "s1",
                  _type: "span",
                  text: "आरबीआई ने डिजिटल रुपया (e₹) के खुदरा और थोक पायलट परियोजनाओं का विस्तार पूरे देश के प्रमुख शहरों में कर दिया है।",
                },
              ],
              style: "normal",
            },
          ],
          bodyEn: [
            {
              _key: "b1",
              _type: "block",
              children: [
                {
                  _key: "s1",
                  _type: "span",
                  text: "The Reserve Bank of India has expanded the retail and wholesale pilots of the Digital Rupee (e-Rupee) across major cities in India.",
                },
              ],
              style: "normal",
            },
          ],
        },
      ],
    },
  ];

  for (const ca of currentAffairs) {
    await client.createOrReplace(ca);
  }
  console.log("✔ Created Current Affairs Articles");

  // 5. Editorials
  const editorials = [
    {
      _id: "ed-federalism",
      _type: "editorial",
      slug: { _type: "slug", current: "cooperative-federalism-india" },
      title: "सहकारी संघवाद: भारत के विकास का आधार स्तंभ",
      titleEn: "Cooperative Federalism: The Cornerstone of India's Growth",
      excerpt: "केंद्र-राज्य संबंधों के सुदृढ़ीकरण और नीतियों के विकास में सहकारी संघवाद की भूमिका पर विशेष विश्लेषण।",
      excerptEn: "An in-depth analysis on the role of cooperative federalism in strengthening center-state relations and policy development.",
      publishedAt: new Date().toISOString(),
      readingTime: 8,
      category: { _type: "reference", _ref: "cat-polity" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [
        { _type: "reference", _ref: "tag-upsc" },
        { _type: "reference", _ref: "tag-mains" },
      ],
      body: [
        {
          _key: "b1",
          _type: "block",
          children: [
            {
              _key: "s1",
              _type: "span",
              text: "भारतीय संविधान का ढांचा संघीय है, जिसमें सहकारी संघवाद (Cooperative Federalism) एक महत्वपूर्ण संकल्पना है। यह राष्ट्र की प्रगति सुनिश्चित करने के लिए केंद्र और राज्यों को मिलकर काम करने पर बल देती है।",
            },
          ],
          style: "normal",
        },
      ],
      bodyEn: [
        {
          _key: "b1",
          _type: "block",
          children: [
            {
              _key: "s1",
              _type: "span",
              text: "Cooperative federalism is a vital pillar of the Indian democratic governance model, emphasizing collaborative action between the Union and the States to foster national development.",
            },
          ],
          style: "normal",
        },
      ],
    },
  ];

  for (const ed of editorials) {
    await client.createOrReplace(ed);
  }
  console.log("✔ Created Editorials");

  // 6. Blogs
  const blogs = [
    {
      _id: "blog-tips",
      _type: "blog",
      slug: { _type: "slug", current: "upsc-mains-answer-writing-tips" },
      title: "UPSC मुख्य परीक्षा के लिए उत्तर लेखन युक्तियाँ",
      titleEn: "UPSC Mains Answer Writing Tips for Beginners",
      excerpt: "मुख्य परीक्षा में बेहतर अंक प्राप्त करने के लिए उत्तर संरचना को कैसे संवारें।",
      excerptEn: "Learn how to structure your answers to secure maximum marks in the UPSC Mains Exam.",
      publishedAt: new Date().toISOString(),
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [{ _type: "reference", _ref: "tag-mains" }],
      body: [
        {
          _key: "b1",
          _type: "block",
          children: [
            {
              _key: "s1",
              _type: "span",
              text: "उत्तर लेखन मुख्य परीक्षा का सबसे महत्वपूर्ण हिस्सा है। एक आदर्श उत्तर में परिचय, मुख्य भाग और निष्कर्ष का सही अनुपात होना चाहिए।",
            },
          ],
          style: "normal",
        },
      ],
      bodyEn: [
        {
          _key: "b1",
          _type: "block",
          children: [
            {
              _key: "s1",
              _type: "span",
              text: "Answer writing is the single most critical factor for clearing the Civil Services Mains Exam. A balanced answer must comprise an introduction, a core body, and a forward-looking conclusion.",
            },
          ],
          style: "normal",
        },
      ],
    },
  ];

  for (const b of blogs) {
    await client.createOrReplace(b);
  }
  console.log("✔ Created Blog Posts");

  // 7. Monthly & Study PDFs
  const monthlyPdfs: any[] = [
    {
      _id: "pdf-june-2026",
      _type: "monthlyPdf",
      slug: { _type: "slug", current: "Half-yearly-current-affairs-june-2026" },
      title: "अर्द्धवार्षिक करेंट अफेयर्स 2026 (जनवरी–जून)",
      titleEn: "Half Yearly Current Affairs 2026 (Jan -June )",
      month: "2026-06",
      pdfType: "half-yearly",
      description: `प्रमुख विशेषताएँ
1000+ परीक्षा-उन्मुख करेंट अफेयर्स प्रश्न
नवीनतम परीक्षा-आधारित PYQs एवं विस्तृत विश्लेषण
'प्रथम', 'कौन क्या है', मानचित्र एवं तथ्य आधारित विशेष सामग्री
राष्ट्रीय एवं अंतरराष्ट्रीय समसामयिक घटनाओं का व्यापक कवरेज
सरल, व्यवस्थित एवं परीक्षा-केंद्रित प्रस्तुतीकरण
तथ्यात्मक एवं विश्लेषणात्मक अध्ययन सामग्री
Prelims एवं Mains दोनों के लिए उपयोगी कंटेंट
महत्वपूर्ण सरकारी योजनाएँ, नीतियाँ एवं रिपोर्ट्स
अर्थव्यवस्था, विज्ञान एवं प्रौद्योगिकी, पर्यावरण, खेल, पुरस्कार एवं अंतरराष्ट्रीय संबंधों का समग्र अध्ययन
त्वरित पुनरावृत्ति (Quick Revision) हेतु संक्षिप्त एवं सारगर्भित नोट्स
MPPSC, UPSC एवं अन्य राज्य लोक सेवा आयोग की परीक्षाओं के अनुरूप तैयार सामग्री`,
      publishedAt: new Date().toISOString(),
      toc: [
        "1000+ परीक्षा-उन्मुख करेंट अफेयर्स प्रश्न",
        "नवीनतम परीक्षा-आधारित PYQs एवं विस्तृत विश्लेषण",
        "'प्रथम', 'कौन क्या है', मानचित्र एवं तथ्य आधारित विशेष सामग्री",
        "राष्ट्रीय एवं अंतरराष्ट्रीय समसामयिक घटनाओं का व्यापक कवरेज",
        "सरल, व्यवस्थित एवं परीक्षा-केंद्रित प्रस्तुतीकरण",
        "तथ्यात्मक एवं विश्लेषणात्मक अध्ययन सामग्री",
        "Prelims एवं Mains दोनों के लिए उपयोगी कंटेंट",
        "महत्वपूर्ण सरकारी योजनाएँ, नीतियाँ एवं रिपोर्ट्स",
        "अर्थव्यवस्था, विज्ञान एवं प्रौद्योगिकी, पर्यावरण, खेल, पुरस्कार एवं अंतरराष्ट्रीय संबंधों का समग्र अध्ययन",
        "त्वरित पुनरावृत्ति (Quick Revision) हेतु संक्षिप्त एवं सारगर्भित नोट्स",
        "MPPSC, UPSC एवं अन्य राज्य लोक सेवा आयोग की परीक्षाओं के अनुरूप तैयार सामग्री"
      ],
      tocEn: [
        "1000+ Exam-Oriented Current Affairs Questions",
        "Latest Exam-Based PYQs & Detailed Analysis",
        "Special Content: 'Firsts', 'Who's Who', Maps & Facts",
        "Comprehensive Coverage of National & International Events",
        "Simple, Organized & Exam-Centric Presentation",
        "Factual & Analytical Study Material",
        "Useful Content for both Prelims & Mains",
        "Important Government Schemes, Policies & Reports",
        "Comprehensive Study of Economy, Science & Tech, Environment, Sports, Awards & International Relations",
        "Concise Notes for Quick Revision",
        "Content Prepared in Line with MPPSC, UPSC & Other State PSC Exams"
      ]
    },
    {
      _id: "pdf-upsc-syllabus",
      _type: "monthlyPdf",
      slug: { _type: "slug", current: "upsc-cse-syllabus-2027" },
      title: "UPSC सिविल सेवा परीक्षा विस्तृत पाठ्यक्रम 2027",
      titleEn: "UPSC CSE Detailed Syllabus 2027",
      pdfType: "syllabus",
      description: "यूपीएससी सिविल सेवा प्रारंभिक और मुख्य परीक्षा का विस्तृत आधिकारिक पाठ्यक्रम (Bilingual)।",
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "pdf-mppsc-pyq-2026",
      _type: "monthlyPdf",
      slug: { _type: "slug", current: "mppsc-prelims-pyq-2026" },
      title: "MPPSC प्रारंभिक परीक्षा 2026 प्रश्न पत्र हल सहित",
      titleEn: "MPPSC Prelims 2026 Question Paper with Solutions",
      pdfType: "pyq",
      description: "एमपीपीएससी राज्य सेवा प्रारंभिक परीक्षा 2026 का आधिकारिक हल सहित प्रश्न पत्र।",
      publishedAt: new Date().toISOString(),
    }
  ];

  for (const p of monthlyPdfs) {
    await client.createOrReplace(p);
  }
  console.log("✔ Created Monthly & Study PDFs");

  // 8. Weekly Digests
  const weeklyArticles = [
    {
      _id: "weekly-june-w1",
      _type: "weekly",
      slug: { _type: "slug", current: "weekly-digest-june-2026-week-1" },
      title: "सापचारिक साप्ताहिक करेंट अफेयर्स: जून 2026 सप्ताह 1",
      titleEn: "Weekly Current Affairs Digest: June 2026 Week 1",
      excerpt: "जून 2026 के प्रथम सप्ताह के सभी महत्वपूर्ण राष्ट्रीय और अंतर्राष्ट्रीय घटनाक्रमों का संकलन।",
      excerptEn: "Consolidated roundup of national and international news for the first week of June 2026.",
      publishedAt: new Date().toISOString(),
      readingTime: 12,
      category: { _type: "reference", _ref: "cat-polity" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [{ _type: "reference", _ref: "tag-upsc" }],
      body: [
        {
          _key: "b1",
          _type: "block",
          children: [{ _key: "s1", _type: "span", text: "इस सप्ताह संसद सत्र की शुरुआत, नई आर्थिक नीतियों की घोषणा और पर्यावरण शिखर सम्मेलन मुख्य आकर्षण रहे।" }],
          style: "normal"
        }
      ],
      bodyEn: [
        {
          _key: "b1",
          _type: "block",
          children: [{ _key: "s1", _type: "span", text: "Key highlights of this week include the beginning of the Parliament session, release of fiscal projections, and climate declarations." }],
          style: "normal"
        }
      ]
    }
  ];

  for (const w of weeklyArticles) {
    await client.createOrReplace(w);
  }
  console.log("✔ Created Weekly Digests");

  // 9. Monthly Digests
  const monthlyArticles = [
    {
      _id: "monthly-june-digest",
      _type: "monthly",
      slug: { _type: "slug", current: "monthly-digest-june-2026" },
      title: "मासिक करेंट अफेयर्स संकलन: जून 2026",
      titleEn: "Monthly Current Affairs Digest: June 2026",
      excerpt: "जून 2026 के पूरे महीने के अति महत्वपूर्ण समसामयिकी विषयों का व्यापक विश्लेषण।",
      excerptEn: "In-depth revision guide of key events and analysis for the entire month of June 2026.",
      publishedAt: new Date().toISOString(),
      readingTime: 25,
      category: { _type: "reference", _ref: "cat-economy" },
      author: { _type: "reference", _ref: "author-aakar" },
      tags: [{ _type: "reference", _ref: "tag-upsc" }, { _type: "reference", _ref: "tag-mppsc" }],
      body: [
        {
          _key: "b1",
          _type: "block",
          children: [{ _key: "s1", _type: "span", text: "जून 2026 का महीना आर्थिक सुधारों, द्विपक्षीय समझौतों और विज्ञान के क्षेत्र में प्रगति के लिए महत्वपूर्ण रहा।" }],
          style: "normal"
        }
      ],
      bodyEn: [
        {
          _key: "b1",
          _type: "block",
          children: [{ _key: "s1", _type: "span", text: "The month of June 2026 was marked by strategic policy frameworks, major bilateral visits, and scientific launches." }],
          style: "normal"
        }
      ]
    }
  ];

  for (const m of monthlyArticles) {
    await client.createOrReplace(m);
  }
  console.log("✔ Created Monthly Digests");

  // 10. Exam Notifications
  const notifications = [
    {
      _id: "notif-upsc-prelims",
      _type: "notification",
      title: "UPSC सिविल सेवा प्रारंभिक परीक्षा 2027 अधिसूचना जारी",
      titleEn: "UPSC Civil Services Prelims 2027 Notification Out",
      exam: "UPSC",
      date: new Date("2027-02-10T10:00:00Z").toISOString(),
      status: "upcoming",
      url: "https://upsc.gov.in",
      description: "यूपीएससी सीएसई 2027 परीक्षा के लिए आधिकारिक अधिसूचना जारी कर दी गई है। आवेदन की अंतिम तिथि 2 मार्च 2027 है।"
    },
    {
      _id: "notif-mppsc-prelims",
      _type: "notification",
      title: "MPPSC राज्य सेवा परीक्षा 2027 आवेदन की तिथि घोषित",
      titleEn: "MPPSC State Service Exam 2027 Schedule Released",
      exam: "MPPSC",
      date: new Date("2027-03-01T10:00:00Z").toISOString(),
      status: "upcoming",
      url: "https://mppsc.mp.gov.in",
      description: "एमपीपीएससी राज्य सेवा परीक्षा 2027 के लिए आवेदन की तिथियां घोषित कर दी गई हैं। आवेदन अप्रैल 2027 से शुरू होंगे।"
    }
  ];

  for (const n of notifications) {
    await client.createOrReplace(n);
  }
  console.log("✔ Created Exam Notifications");

  // 11. Global FAQs
  const faqs = [
    {
      _id: "faq-q1",
      _type: "faq",
      question: "आकार आईएएस वेबसाइट पर क्या सामग्री मुफ्त उपलब्ध है?",
      questionEn: "What resources are available for free on Aakar IAS?",
      answer: "हमारे यहां दैनिक करेंट अफेयर्स विश्लेषण, साप्ताहिक लेख, संपादकीय व्याख्या और मासिक करेंट अफेयर्स पत्रिका का पीडीएफ डाउनलोड पूरी तरह से निःशुल्क हैं।",
      answerEn: "All daily current affairs analysis, weekly compilations, editorial insights, and monthly PDF magazines are 100% free of charge.",
      category: "सामान्य प्रश्न"
    },
    {
      _id: "faq-q2",
      _type: "faq",
      question: "क्या आकार आईएएस का कोई आधिकारिक व्हाट्सएप ग्रुप या टेलीग्राम चैनल है?",
      questionEn: "Does Aakar IAS have an official Telegram or WhatsApp?",
      answer: "हां, आप वेबसाइट के फुटर में दिए गए टेलीग्राम और व्हाट्सएप लिंक पर क्लिक करके हमारे आधिकारिक समूहों में शामिल हो सकते हैं जहां दैनिक अपडेट साझा किए जाते हैं।",
      answerEn: "Yes, you can join our official Telegram and WhatsApp channels directly from the links in the website footer for regular notifications.",
      category: "समुदाय"
    }
  ];

  for (const f of faqs) {
    await client.createOrReplace(f);
  }
  console.log("✔ Created Global FAQs");

  console.log("✨ Seeding completed successfully!");
}

main().catch((err) => {
  console.error("❌ Error seeding data:", err);
  process.exit(1);
});
