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

async function optimizeUnWaterReportSEO() {
  console.log("🚀 Starting Ultimate SEO & AI Overview Optimization for UN World Water Development Report 2026...");

  const docId = "ca-un-world-water-development-report-2026";

  const updatedDoc = {
    title: "संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026 (UN World Water Development Report 2026 UNESCO): MPPSC & UPSC नोट्स",
    titleEn: "UN World Water Development Report 2026 (UNESCO): MPPSC & UPSC Complete Notes, Theme & Key Facts",
    slug: {
      _type: "slug",
      current: "un-world-water-development-report-2026-unesco",
    },
    publishedAt: "2026-03-19T10:00:00Z",
    updatedAt: new Date().toISOString(),
    author: {
      _type: "reference",
      _ref: "author-aakar",
    },
    category: "current-affairs",
    tags: ["tag-mppsc", "tag-upsc", "tag-environment", "tag-unesco", "tag-water-report-2026", "tag-sdg6", "tag-current-affairs-2026"],
    targetExams: ["mppsc", "upsc", "other-state-pcs"],
    
    // SEO Payload
    seoTitle: "UN World Water Development Report 2026 UNESCO: MPPSC Notes, Theme & Key Facts",
    seoTitleEn: "UN World Water Development Report 2026 UNESCO: MPPSC & UPSC Complete Notes & Facts",
    seoDescription: "यूनेस्को (UNESCO) द्वारा 19 मार्च 2026 को जारी संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026 (UN World Water Development Report 2026) का संपूर्ण विश्लेषण। मुख्य विषय: 'सभी लोगों के लिए जल: समान अधिकार और अवसर'। दुनिया के 2.1 अरब लोग सुरक्षित पेयजल से वंचित। MPPSC & UPSC हेतु महत्वपूर्ण नोट्स।",
    seoDescriptionEn: "Comprehensive breakdown of UN World Water Development Report 2026 released by UNESCO on 19 March 2026. Theme: 'Water for All People: Equal Rights and Opportunities'. 2.1 billion people lack safely managed drinking water. Essential facts & MCQs for MPPSC & UPSC.",
    
    excerpt: "यूनेस्को (UNESCO) द्वारा 19 मार्च 2026 को विश्व जल दिवस (22 मार्च) की पूर्व संध्या पर जारी संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026 (UN World Water Development Report 2026) का विषय 'सभी लोगों के लिए जल: समान अधिकार और अवसर' है। रिपोर्ट के अनुसार 2.1 अरब लोग सुरक्षित पेयजल से वंचित हैं तथा महिलाएं प्रतिदिन 25 करोड़ घंटे पानी जुटाने में खर्च करती हैं। MPPSC एवं UPSC परीक्षा हेतु संपूर्ण नोट्स।",
    excerptEn: "The UN World Water Development Report 2026 released by UNESCO on March 19, 2026 focuses on 'Water for All People: Equal Rights and Opportunities'. Highlights reveal 2.1 billion people lack safely managed drinking water and women spend 250 million hours daily collecting water. Crucial study notes for MPPSC & UPSC.",

    // Portable Text Body
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026 (UN World Water Development Report 2026) को यूनेस्को (UNESCO) द्वारा यूएन-वाटर (UN-Water) की ओर से 19 मार्च 2026 को विश्व जल दिवस (22 मार्च) से ठीक पहले जारी किया गया है। यह रिपोर्ट वैश्विक जल संकट, लैंगिक असमानता (Gender Inequality), और सतत विकास लक्ष्य 6 (SDG 6: Clean Water and Sanitation) की प्रगति का गहन विश्लेषण प्रस्तुत करती है। MPPSC (प्रारंभिक एवं मुख्य परीक्षा Paper 1 & 3) और UPSC सिविल सेवा परीक्षा के दृष्टिगत यह रिपोर्ट एक अत्यंत महत्वपूर्ण विषय है।",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "1. रिपोर्ट की मुख्य विषय-वस्तु (Theme 2026)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "वर्ष 2026 की संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट का आधिकारिक शीर्षक (Theme) है:",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "\"सभी लोगों के लिए जल: समान अधिकार और अवसर\" (Water for All People: Equal Rights and Opportunities)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "यह थीम स्पष्ट करती है कि जल केवल एक प्राकृतिक संसाधन नहीं है, बल्कि एक बुनियादी मानव अधिकार है। जब तक जल आवंटन और प्रबंधन में लैंगिक एवं सामाजिक असमानता समाप्त नहीं होगी, तब तक सार्वभौमिक जल सुरक्षा (Universal Water Security) प्राप्त करना असंभव है।",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "2. विश्व जल विकास रिपोर्ट 2026 के प्रमुख निष्कर्ष एवं मुख्य आंकड़े",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• सुरक्षित पेयजल से वंचित आबादी: आज भी दुनिया भर में लगभग 2.1 अरब (2.1 Billion) लोग सुरक्षित रूप से प्रबंधित पेयजल (Safely Managed Drinking Water) से पूरी तरह वंचित हैं।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• महिलाओं एवं लड़कियों पर भारी बोझ: बुनियादी जल सुविधाओं से वंचित 70% से अधिक परिवारों (Households) में पानी एकत्र करने और लाने की प्राथमिक जिम्मेदारी महिलाओं और कम उम्र की लड़कियों की होती है।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• दैनिक 25 करोड़ घंटे का नुकसान: महिलाएं और लड़कियां वैश्विक स्तर पर रोजाना पानी जुटाने में कुल मिलाकर 25 करोड़ घंटे (250 Million Hours) व्यतीत करती हैं, जिससे उनकी शिक्षा, स्वास्थ्य और आर्थिक अवसरों पर गंभीर प्रभाव पड़ता है।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• जल प्रशासन में प्रतिनिधित्व का अभाव: दुनिया भर के राष्ट्रीय एवं स्थानीय जल प्रबंधन संस्थानों में महिलाओं का प्रतिनिधित्व बेहद कम है; कई विकासशील देशों में पानी से जुड़े सार्वजनिक निकायों में 5 में से 1 (20%) से भी कम महिला कर्मचारी कार्यरत हैं।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• जलवायु परिवर्तन एवं आपदाओं का प्रभाव: जलवायु परिवर्तन, सूखा (Drought), और बाढ़ (Floods) जैसी जल संबंधी प्राकृतिक आपदाएं इस सामाजिक एवं लैंगिक असमानता को और अधिक गहरा बना रही हैं।",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "3. सतत विकास लक्ष्य 6 (SDG 6) एवं अंतरराष्ट्रीय जल सम्मेलन",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• SDG 6 (Clean Water & Sanitation): संयुक्त राष्ट्र का लक्ष्य 2030 तक सभी के लिए स्वच्छ जल और स्वच्छता की उपलब्धता सुनिश्चित करना है। 2026 की रिपोर्ट चेतावनी देती है कि वर्तमान धीमी गति से यह लक्ष्य समय पर प्राप्त करना कठिन होगा।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• संयुक्त राष्ट्र जल सम्मेलन 2026 (UN Water Conference 2026): यूएन जल सम्मेलन 2026 में संयुक्त अरब अमीरात (UAE) और सेनेगल (Senegal) की सह-मेजबानी में आयोजित किया जाएगा, जिसका उद्देश्य वैश्विक जल कार्रवाई में तेजी लाना है।",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "4. भारत में जल संरक्षण एवं प्रबंधन की प्रमुख पहलें (Indian Govt Initiatives)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• जल जीवन मिशन (Jal Jeevan Mission - Har Ghar Jal): 2019 में शुरू की गई इस योजना का उद्देश्य 2024-2026 तक भारत के प्रत्येक ग्रामीण परिवार को व्यक्तिगत नल कनेक्शन (Tap Water Connection) प्रदान करना है।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• जल शक्ति अभियान: संचयन जल, संचित कल (Catch the Rain): वर्षा जल संचयन (Rainwater Harvesting) और भूजल पुनर्भरण (Groundwater Recharge) के लिए देशव्यापी अभियान।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• अमृत 2.0 (AMRUT 2.0): शहरी क्षेत्रों में 100% जल आपूर्ति कवरेज और सीवेज प्रबंधन हेतु आवासन एवं शहरी कार्य मंत्रालय की प्रमुख योजना।",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "5. MPPSC & UPSC परीक्षा हेतु अति-महत्वपूर्ण क्विक फैक्ट्स (Exam High-Yield Pointers)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• जारीकर्ता संगठन: यूनेस्को (UNESCO) - यूएन-वाटर (UN-Water) की ओर से।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• प्रकाशन तिथि: 19 मार्च 2026 (विश्व जल दिवस 22 मार्च की पूर्व संध्या पर)।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• मुख्य थीम: 'सभी लोगों के लिए जल: समान अधिकार और अवसर' (Water for All People: Equal Rights and Opportunities)।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• प्रमुख आंकड़ा 1: दुनिया के 2.1 अरब लोग सुरक्षित पेयजल से वंचित।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• प्रमुख आंकड़ा 2: जल संग्रह में महिलाएं व लड़कियां रोजाना 25 करोड़ घंटे खर्च करती हैं।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• संबंधित SDG: सतत विकास लक्ष्य 6 (SDG 6 - Clean Water & Sanitation)।",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "6. संबंधित महत्वपूर्ण अध्ययन सामग्री (Related High-Authority Study Material)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• भारत में रामसर आर्द्रभूमि स्थल (Ramsar Sites in India Complete List): ",
          },
          {
            _type: "span",
            text: "https://aakarias.com/static-gk/ramsar-sites-in-india",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• पर्यावरण संरक्षण कानून और नियम भारत (Environmental Protection Laws): ",
          },
          {
            _type: "span",
            text: "https://aakarias.com/static-gk/environmental-laws-india",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• डंपसाइट रेमेडिएशन एक्सेलरेटर प्रोग्राम (DRAP SBM-U 2.0): ",
          },
          {
            _type: "span",
            text: "https://aakarias.com/current-affairs/dumpsite-remediation-accelerator-program-drap-sbm-u-2-0",
          },
        ],
      },
    ],

    // Portable Text English Body
    bodyEn: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The United Nations World Water Development Report 2026 (UN WWDR 2026) was released by UNESCO on behalf of UN-Water on March 19, 2026, ahead of World Water Day (March 22). This flagship publication presents a comprehensive assessment of the global water crisis, gender disparities, and progress towards Sustainable Development Goal 6 (SDG 6: Clean Water and Sanitation). It is a vital current affairs topic for MPPSC (Prelims & Mains Paper 1 & 3) and UPSC Civil Services Examinations.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "1. Official Theme of WWDR 2026",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The official theme for the 2026 UN World Water Development Report is:",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "\"Water for All People: Equal Rights and Opportunities\"",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "This theme underscores that access to clean water is a fundamental human right. Without addressing gender inequality and social inequities in water governance, achieving universal water security remains unattainable.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "2. Key Findings and Global Statistics",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Safely Managed Drinking Water Deficit: Over 2.1 billion people worldwide still lack access to safely managed drinking water services.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Heavy Burden on Women and Girls: In more than 70% of households without basic water supply, women and young girls bear the primary responsibility for collecting water.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• 250 Million Hours Lost Daily: Women and girls collectively spend 250 million hours every day collecting water, severely hindering their education, healthcare, and economic participation.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Underrepresentation in Water Governance: Women remain severely underrepresented in water management institutions, holding fewer than 1 in 5 (20%) positions in many developing nations.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Climate Change Amplification: Droughts, floods, and climate-induced water stress disproportionately affect vulnerable female populations.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "3. SDG 6 Alignment & Upcoming UN Water Conference 2026",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• SDG 6 (Clean Water and Sanitation): The report warns that at current rates of progress, the target of universal access by 2030 will be missed unless investments and gender-inclusive policies are scaled up significantly.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• UN Water Conference 2026: The upcoming UN Water Conference 2026 will be co-hosted by the United Arab Emirates (UAE) and Senegal to catalyze global commitments for water resilience.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "4. India's Key Water Governance Schemes",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Jal Jeevan Mission (Har Ghar Jal): Flagship initiative launched in 2019 to provide tap water connections to every rural household across India.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Jal Shakti Abhiyan (Catch the Rain): Nationwide campaign for rainwater harvesting, aquifer recharge, and community water management.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• AMRUT 2.0: Mission launched by Ministry of Housing and Urban Affairs for 100% water supply coverage in all statutory towns.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "5. High-Yield Exam Facts for MPPSC & UPSC",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Publishing Entity: UNESCO on behalf of UN-Water.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Release Date: March 19, 2026 (Eve of World Water Day, March 22).",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Official Theme: 'Water for All People: Equal Rights and Opportunities'.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Crucial Metric 1: 2.1 Billion people lack safely managed drinking water.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Crucial Metric 2: Women & girls spend 250 million hours daily collecting water.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Targeted Goal: Sustainable Development Goal 6 (SDG 6).",
          },
        ],
      },
    ],

    // 10 Collapsible FAQs (Mapped to faqs array schema)
    faqs: [
      {
        question: "1. संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026 किसके द्वारा जारी की गई है?",
        questionEn: "1. Who published the UN World Water Development Report 2026?",
        answer: "संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026 यूनेस्को (UNESCO) द्वारा यूएन-वाटर (UN-Water) की ओर से 19 मार्च 2026 को विश्व जल दिवस (22 मार्च) की पूर्व संध्या पर जारी की गई है।",
        answerEn: "The UN World Water Development Report 2026 was published by UNESCO on behalf of UN-Water on March 19, 2026, ahead of World Water Day (March 22).",
      },
      {
        question: "2. UN World Water Development Report 2026 का मुख्य विषय (Theme) क्या है?",
        questionEn: "2. What is the official theme of UN World Water Development Report 2026?",
        answer: "वर्ष 2026 की विश्व जल विकास रिपोर्ट का आधिकारिक विषय 'सभी लोगों के लिए जल: समान अधिकार और अवसर' (Water for All People: Equal Rights and Opportunities) है, जो जल सुरक्षा में लैंगिक समानता और मानव अधिकारों पर जोर देता है।",
        answerEn: "The official theme for the 2026 report is 'Water for All People: Equal Rights and Opportunities', highlighting gender equality, human rights, and water security.",
      },
      {
        question: "3. रिपोर्ट 2026 के अनुसार दुनिया में कितने लोग सुरक्षित पेयजल से वंचित हैं?",
        questionEn: "3. According to UN WWDR 2026, how many people lack safely managed drinking water?",
        answer: "रिपोर्ट के अनुसार, दुनिया भर में लगभग 2.1 अरब (2.1 Billion) लोग सुरक्षित रूप से प्रबंधित पेयजल (Safely Managed Drinking Water) की सुविधा से पूरी तरह वंचित हैं।",
        answerEn: "According to the report, approximately 2.1 billion people worldwide lack access to safely managed drinking water services.",
      },
      {
        question: "4. जल संग्रह में महिलाओं और लड़कियों द्वारा प्रतिदिन कितने घंटे खर्च किए जाते हैं?",
        questionEn: "4. How many hours do women and girls spend daily collecting water globally?",
        answer: "वैश्विक स्तर पर जल-वंचित 70% से अधिक घरों में महिलाएं और लड़कियां रोजाना पानी लाने में कुल 25 करोड़ घंटे (250 Million Hours) खर्च करती हैं, जिससे उनकी शिक्षा और स्वास्थ्य प्रभावित होता है।",
        answerEn: "Globally, women and girls spend an estimated 250 million hours every single day collecting water in over 70% of water-deprived households.",
      },
      {
        question: "5. संयुक्त राष्ट्र द्वारा वर्ष 2026 को किस रूप में घोषित किया गया है?",
        questionEn: "5. What international designations has the UN declared for the year 2026?",
        answer: "संयुक्त राष्ट्र (UN) ने वर्ष 2026 को 'अंतरराष्ट्रीय चारागाह और चरवाहा वर्ष' (International Year of Rangelands and Pastoralists) तथा 'अंतरराष्ट्रीय सतत विकास स्वयंसेवक वर्ष' (International Year of Volunteers for Sustainable Development) घोषित किया है।",
        answerEn: "The UN has declared 2026 as the International Year of Rangelands and Pastoralists and the International Year of Volunteers for Sustainable Development.",
      },
      {
        question: "6. 2026 संयुक्त राष्ट्र जल सम्मेलन (UN Water Conference 2026) कहाँ आयोजित होगा?",
        questionEn: "6. Where will the 2026 UN Water Conference be held?",
        answer: "2026 संयुक्त राष्ट्र जल सम्मेलन का आयोजन संयुक्त अरब अमीरात (UAE) और सेनेगल (Senegal) की सह-मेजबानी (Co-hosting) में किया जाएगा, ताकि जल कार्रवाई एजेंडे को गति दी जा सके।",
        answerEn: "The 2026 UN Water Conference will be co-hosted by the United Arab Emirates (UAE) and Senegal to accelerate global water action.",
      },
      {
        question: "7. सतत विकास लक्ष्य 6 (SDG 6) का संबंध किससे है?",
        questionEn: "7. What does Sustainable Development Goal 6 (SDG 6) deal with?",
        answer: "SDG 6 'सभी के लिए स्वच्छता और स्वच्छ पेयजल की उपलब्धता' (Clean Water and Sanitation for All) से संबंधित है, जिसे 2030 तक हासिल करने का लक्ष्य है।",
        answerEn: "SDG 6 focuses on ensuring availability and sustainable management of clean water and sanitation for all by 2030.",
      },
      {
        question: "8. COP31 जलवायु शिखर सम्मेलन 2026 की मेज़बानी कौन सा देश करेगा?",
        questionEn: "8. Which country will host the COP31 UN Climate Change Conference in 2026?",
        answer: "ऑस्ट्रेलिया और प्रशांत द्वीप राष्ट्र (Pacific Island Nations) संयुक्त राष्ट्र जलवायु परिवर्तन सम्मेलन COP31 (2026) की मेज़बानी का प्रस्ताव रख रहे हैं।",
        answerEn: "Australia in partnership with Pacific Island nations is slated to host the COP31 UN Climate Summit in 2026.",
      },
      {
        question: "9. भारत में 'हर घर जल' प्रदान करने के लिए कौन सा मिशन कार्यरत है?",
        questionEn: "9. Which mission provides tap water connections to rural households in India?",
        answer: "भारत में जल शक्ति मंत्रालय द्वारा संचालित 'जल जीवन मिशन' (Jal Jeevan Mission - Har Ghar Jal) का उद्देश्य ग्रामीण भारत के प्रत्येक घर तक नल से जल पहुँचाना है।",
        answerEn: "The Jal Jeevan Mission (Har Ghar Jal) under the Ministry of Jal Shakti aims to provide tap water connections to every rural household in India.",
      },
      {
        question: "10. MPPSC परीक्षा में संयुक्त राष्ट्र जल विकास रिपोर्ट से संबंधित प्रश्न कैसे पूछे जाते हैं?",
        questionEn: "10. How is the UN World Water Development Report tested in MPPSC exams?",
        answer: "MPPSC प्रारंभिक परीक्षा में रिपोर्ट जारीकर्ता (UNESCO), थीम, 2.1 अरब आंकड़े व SDG 6 पर वस्तुनिष्ठ प्रश्न (MCQs) आते हैं, जबकि मुख्य परीक्षा (Paper 1 Geo & Paper 3 Sci-Tech/Env) में जल प्रबंधन व लैंगिक असमानता पर दीर्घ उत्तरीय प्रश्न पूछे जाते हैं।",
        answerEn: "MPPSC Prelims tests publishing agency (UNESCO), theme, 2.1B stats & SDG 6 via MCQs, while Mains (Paper 1 & Paper 3) requires analytical answers on water governance and gender parity.",
      },
    ],

    // 8 Practice MCQs (Mapped to mcqs array schema)
    mcqs: [
      {
        question: "1. संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट 2026 (UN World Water Development Report 2026) किस अंतरराष्ट्रीय संस्था द्वारा जारी की गई है?",
        questionEn: "1. Which international agency released the UN World Water Development Report 2026?",
        options: ["विश्व स्वास्थ्य संगठन (WHO)", "यूनेस्को (UNESCO)", "संयुक्त राष्ट्र पर्यावरण कार्यक्रम (UNEP)", "विश्व बैंक (World Bank)"],
        optionsEn: ["World Health Organization (WHO)", "UNESCO", "United Nations Environment Programme (UNEP)", "World Bank"],
        correctIndex: 1,
        explanation: "संयुक्त राष्ट्र विश्व जल विकास रिपोर्ट यूनेस्को (UNESCO) द्वारा यूएन-वाटर (UN-Water) की ओर से प्रतिवर्ष विश्व जल दिवस की पूर्व संध्या पर प्रकाशित की जाती है।",
        explanationEn: "The UN World Water Development Report is published annually by UNESCO on behalf of UN-Water ahead of World Water Day.",
      },
      {
        question: "2. विश्व जल विकास रिपोर्ट 2026 का आधिकारिक विषय (Theme) क्या है?",
        questionEn: "2. What is the official theme of the UN World Water Development Report 2026?",
        options: [
          "सभी के लिए जल: समान अधिकार और अवसर (Water for All People: Equal Rights and Opportunities)",
          "जल और जलवायु परिवर्तन (Water and Climate Change)",
          "भूजल: अदृश्य को दृश्य बनाना (Groundwater: Making the Invisible Visible)",
          "शांति के लिए जल (Water for Peace)",
        ],
        optionsEn: [
          "Water for All People: Equal Rights and Opportunities",
          "Water and Climate Change",
          "Groundwater: Making the Invisible Visible",
          "Water for Peace",
        ],
        correctIndex: 0,
        explanation: "वर्ष 2026 की रिपोर्ट का मुख्य विषय 'सभी लोगों के लिए जल: समान अधिकार और अवसर' (Water for All People: Equal Rights and Opportunities) है, जो जल सुरक्षा में लैंगिक व सामाजिक समानता पर आधारित है।",
        explanationEn: "The theme for 2026 is 'Water for All People: Equal Rights and Opportunities', focusing on gender and social equity in water access.",
      },
      {
        question: "3. रिपोर्ट 2026 के अनुसार, दुनिया भर में कितने लोग सुरक्षित पेयजल (Safely Managed Drinking Water) से वंचित हैं?",
        questionEn: "3. According to WWDR 2026, how many people globally lack safely managed drinking water?",
        options: ["1.2 अरब (1.2 Billion)", "2.1 अरब (2.1 Billion)", "3.5 अरब (3.5 Billion)", "50 करोड़ (500 Million)"],
        optionsEn: ["1.2 Billion", "2.1 Billion", "3.5 Billion", "500 Million"],
        correctIndex: 1,
        explanation: "रिपोर्ट 2026 के अनुसार, आज भी वैश्विक स्तर पर 2.1 अरब लोग सुरक्षित रूप से प्रबंधित पेयजल की सुविधा से वंचित हैं।",
        explanationEn: "As per the 2026 report, 2.1 billion people worldwide still lack access to safely managed drinking water.",
      },
      {
        question: "4. बुनियादी जल सुविधाओं से वंचित परिवारों में जल संग्रह में महिलाएं और लड़कियां प्रतिदिन वैश्विक स्तर पर कितना समय खर्च करती हैं?",
        questionEn: "4. Globally, how many hours do women and girls spend daily collecting water in water-deprived households?",
        options: ["10 करोड़ घंटे", "15 करोड़ घंटे", "25 करोड़ घंटे (250 Million Hours)", "50 करोड़ घंटे"],
        optionsEn: ["100 Million Hours", "150 Million Hours", "250 Million Hours", "500 Million Hours"],
        correctIndex: 2,
        explanation: "महिलाएं और लड़कियां बिना नल वाले 70% से अधिक घरों में रोजाना पानी लाने में कुल 25 करोड़ घंटे (250 Million Hours) व्यतीत करती हैं।",
        explanationEn: "Women and girls spend 250 million hours every day collecting water across households lacking piped water connections.",
      },
      {
        question: "5. संयुक्त राष्ट्र का कौन सा सतत विकास लक्ष्य (SDG) स्वच्छ जल और स्वच्छता (Clean Water and Sanitation) से संबंधित है?",
        questionEn: "5. Which Sustainable Development Goal (SDG) addresses Clean Water and Sanitation?",
        options: ["SDG 3", "SDG 5", "SDG 6", "SDG 13"],
        optionsEn: ["SDG 3", "SDG 5", "SDG 6", "SDG 13"],
        correctIndex: 2,
        explanation: "सतत विकास लक्ष्य 6 (SDG 6) 2030 तक सभी के लिए स्वच्छ जल और स्वच्छता सुनिश्चित करने का वैश्विक संकल्प है।",
        explanationEn: "Sustainable Development Goal 6 (SDG 6) targets universal availability and sustainable management of water and sanitation by 2030.",
      },
      {
        question: "6. 2026 संयुक्त राष्ट्र जल सम्मेलन (UN Water Conference 2026) की सह-मेजबानी कौन से दो देश कर रहे हैं?",
        questionEn: "6. Which two countries are co-hosting the 2026 UN Water Conference?",
        options: ["भारत और फ्रांस", "संयुक्त अरब अमीरात (UAE) और सेनेगल", "ब्राजील और दक्षिण अफ्रीका", "जापान और जर्मनी"],
        optionsEn: ["India and France", "United Arab Emirates (UAE) and Senegal", "Brazil and South Africa", "Japan and Germany"],
        correctIndex: 1,
        explanation: "2026 संयुक्त राष्ट्र जल सम्मेलन यूएई (UAE) और सेनेगल (Senegal) की संयुक्त मेजबानी में आयोजित किया जा रहा है।",
        explanationEn: "The 2026 UN Water Conference is co-hosted by the UAE and Senegal.",
      },
      {
        question: "7. भारत में ग्रामीण परिवारों को व्यक्तिगत नल कनेक्शन प्रदान करने वाला प्रमुख राष्ट्रीय मिशन कौन सा है?",
        questionEn: "7. Which key Indian national mission provides tap water connections to rural households?",
        options: ["जल जीवन मिशन (Jal Jeevan Mission)", "अमृत 2.0 (AMRUT 2.0)", "नमामि गंगे परियोजना", "राष्ट्रीय जलधारा मिशन"],
        optionsEn: ["Jal Jeevan Mission", "AMRUT 2.0", "Namami Gange Project", "National Jal Dhara Mission"],
        correctIndex: 0,
        explanation: "जल शक्ति मंत्रालय के अधीन 'जल जीवन मिशन' (Jal Jeevan Mission - Har Ghar Jal) 2019 में शुरू किया गया था।",
        explanationEn: "Jal Jeevan Mission (Har Ghar Jal) was launched in 2019 under the Ministry of Jal Shakti for rural tap connections.",
      },
      {
        question: "8. प्रतिवर्ष 'विश्व जल दिवस' (World Water Day) किस तिथि को मनाया जाता है?",
        questionEn: "8. On which date is 'World Water Day' observed annually across the globe?",
        options: ["15 मार्च", "19 मार्च", "22 मार्च (22 March)", "5 अप्रैल"],
        optionsEn: ["March 15", "March 19", "March 22", "April 5"],
        correctIndex: 2,
        explanation: "प्रतिवर्ष 22 मार्च को अंतरराष्ट्रीय स्तर पर विश्व जल दिवस (World Water Day) मनाया जाता है। 2026 की WWDR रिपोर्ट 19 मार्च को जारी की गई।",
        explanationEn: "World Water Day is observed every year on March 22. UNESCO released the 2026 WWDR report on March 19.",
      },
    ],
  };

  const res = await sanityClient.patch(docId).set(updatedDoc).commit();
  console.log("✅ UN World Water Development Report 2026 SEO Optimized in Sanity CMS:", res._id);
}

optimizeUnWaterReportSEO().catch((err) => {
  console.error("❌ Error optimizing UN Water Report SEO:", err);
  process.exit(1);
});
