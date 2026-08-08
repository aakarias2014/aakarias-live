import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity environment variables.");
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
  const img1AssetId = "image-74e8fd5ed333a87c5498d8241d404e54fb45833f-1024x1024-jpg";
  const img2AssetId = "image-5e12cd708321a7683d7133ef2edccf1bae87a152-1024x1024-jpg";

  const titleHi = "राष्ट्रीय हथकरघा दिवस 2026 (National Handloom Day): 7 अगस्त, थीम 2026, 1905 स्वदेशी आंदोलन, PIB रिपोर्ट, राष्ट्रीय हथकरघा पुरस्कार व वस्त्र मंत्रालय योजनाएं | MPPSC & UPSC Notes";
  const titleEn = "National Handloom Day 2026: 7th August, Theme 2026, Swadeshi Movement (1905), PIB Release, National Handloom Award & Ministry of Textiles Schemes | MPPSC & UPSC";

  const excerptHi = "राष्ट्रीय हथकरघा दिवस 2026 (7 अगस्त) संपूर्ण परीक्षा गाइड: 1905 का स्वदेशी आंदोलन, थीम 2026, हैंडलूम का अर्थ, 35.22 लाख बुनकर (72% महिला भागीदारी), NHDP, RMSS (15% सब्सिडी), राष्ट्रीय हथकरघा पुरस्कार, ई-पहचान, इंडिया हैंडलूम ब्रांड, Handloom Mark (2006), GI Act (1999) व MPPSC, UPSC हेतु 8 MCQs व FAQs।";
  const excerptEn = "Ultimate exam guide on National Handloom Day 2026 (7th August). Covers Swadeshi Movement 1905, Theme 2026, PIB release stats (35.22 lakh weavers, 72% women), Ministry of Textiles schemes (NHDP, RMSS), National Handloom Award, India Handloom Brand, quotes, PAA FAQs, and 8 MCQs for MPPSC and UPSC exams.";

  const slug = "national-handloom-day-2026-swadeshi-movement-textiles-mppsc-upsc-notes";
  const publishedAt = "2026-08-07T09:00:00.000Z";
  const caDate = "2026-08-07";

  const bodyHi = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "प्रतिवर्ष **7 अगस्त** को पूरे भारत में **राष्ट्रीय हथकरघा दिवस (National Handloom Day 2026)** मनाया जाता है। यह महत्वपूर्ण दिवस देश की समृद्ध हथकरघा परंपरा, उत्कृष्ट वस्त्र कला, लाखों बुनकरों (Weavers) के सामाजिक-आर्थिक योगदान और **'आत्मनिर्भर भारत' (Self-Reliant India)** की अवधारणा को प्रदर्शित करता है। 7 अगस्त की तिथि का ऐतिहासिक महत्व **1905 में बंगाल विभाजन के विरोध में शुरू हुए 'स्वदेशी आंदोलन' (Swadeshi Movement)** से जुड़ा है। सिविल सेवा परीक्षाओं (**MPPSC मुख्य परीक्षा प्रश्नपत्र 1 - इतिहास व संस्कृति, प्रश्नपत्र 2 - सामाजिक व आर्थिक विकास** एवं **UPSC GS Paper 1 & 3**) में हथकरघा क्षेत्र, स्वदेशी आंदोलन, वस्त्र मंत्रालय की योजनाओं व PIB रिपोर्ट से लगातार प्रश्न पूछे जाते हैं।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img1AssetId },
      alt: "राष्ट्रीय हथकरघा दिवस 2026: पारंपरिक हथकरघा पर बुनकर महिला द्वारा वस्त्र बुनाई का दृश्य | MPPSC & UPSC Notes",
      caption: "चित्र 1: राष्ट्रीय हथकरघा दिवस 2026 (7 अगस्त) — भारतीय हथकरघा परंपरा, 35.22 लाख बुनकरों का योगदान एवं वस्त्र मंत्रालय की प्रोत्साहन योजनाएं।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. हैंडलूम (हथकरघा) का अर्थ एवं परिभाषा (Meaning of Handloom)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **हैंडलूम (हथकरघा) का अर्थ**: 'हथकरघा' (Handloom) से तात्पर्य ऐसे करघे से है जो बिना किसी विद्युत या ईंधन ऊर्जा के पूरी तरह मानव हाथों और पैरों की सहायता से संचालित होता है।\n• **परिभाषा (Definition)**: हथकरघा (संरक्षण एवं रोजगार कानून 1985 के अनुसार) ऐसा कोई भी करघा है, जो बिजली (Power) के बिना धागे को आपस में बुनकर कपड़ा तैयार करता है।\n• **सांस्कृतिक महत्व**: चंदेरी, महेश्वरी (मध्य प्रदेश), बनारसी, कांजीवरम, इकत, पोचमपल्ली और जामदानी जैसे प्रसिद्ध भारतीय वस्त्र हथकरघा कला की जीवंत मिसाल हैं।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. राष्ट्रीय हथकरघा दिवस 2026: मुख्य तथ्य (Key Highlights & Quick Overview)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **आयोजन तिथि (Date)**: प्रतिवर्ष 7 अगस्त।\n• **प्रथम राष्ट्रीय हथकरघा दिवस**: 7 अगस्त 2015 (उद्घाटन - प्रधानमंत्री नरेंद्र मोदी द्वारा मद्रास विश्वविद्यालय, चेन्नई में)।\n• **थीम 2026 (National Handloom Day Theme 2026)**: \"बुनकरों का सम्मान • स्वदेशी की पहचान • भारत की सांस्कृतिक विरासत\" (Honoring Weavers • Identity of Swadeshi • Cultural Heritage of India)।\n• **ऐतिहासिक प्रेरणा (Historical Link)**: 7 अगस्त 1905 का स्वदेशी आंदोलन (Swadeshi Movement)।\n• **नोडल मंत्रालय (Nodal Ministry)**: वस्त्र मंत्रालय, भारत सरकार (Ministry of Textiles, Govt. of India)।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. 1905 का स्वदेशी आंदोलन एवं 7 अगस्त का ऐतिहासिक संबंध" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **स्वदेशी आंदोलन का शुभारंभ**: 7 अगस्त 1905 को लॉर्ड कर्जन द्वारा किए गए बंगाल विभाजन (Partition of Bengal) के विरोध में कलकत्ता के टाउन हॉल में आयोजित ऐतिहासिक जनसभा में **स्वदेशी आंदोलन (Swadeshi Movement)** का औपचारिक ऐलान किया गया था।\n• **विदेशी वस्त्रों की होली व स्वदेशी का संकल्प**: आंदोलनकारियों ने ब्रिटिश मिलों में बने कपड़ों व विदेशी वस्तुओं का बहिष्कार किया तथा स्वदेशी हथकरघा व खादी वस्त्रों के उत्पादन व उपयोग को स्वतंत्रता संग्राम का मुख्य आधार बनाया।\n• **2015 में सरकारी घोषणा**: 1905 के इसी स्वदेशी आंदोलन की अमर स्मृति और स्वदेशी उद्योगों की पुनर्स्थापना के प्रतीक के रूप में भारत सरकार ने 2015 में 7 अगस्त को 'राष्ट्रीय हथकरघा दिवस' घोषित किया।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img2AssetId },
      alt: "1905 का स्वदेशी आंदोलन एवं आधुनिक इंडिया हैंडलूम ब्रांड (India Handloom Brand)",
      caption: "चित्र 2: 1905 का ऐतिहासिक स्वदेशी आंदोलन एवं आधुनिक भारत का प्रामाणिक 'इंडिया हैंडलूम ब्रांड' (India Handloom Brand) - स्वदेशी आंदोलन से 2026 तक की यात्रा।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. वस्त्र मंत्रालय व PIB रिपोर्ट के अनुसार प्रमुख आँकड़े (PIB Statistics)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **कुल बुनकर एवं श्रमिक संख्या**: देश भर में **35.22 लाख** हथकरघा बुनकर एवं संबद्ध श्रमिक कार्यरत हैं।\n• **महिला सशक्तीकरण (Women Workers)**: हथकरघा क्षेत्र में **72% से अधिक महिलाएँ** कार्यरत हैं, जो इसे ग्रामीण महिलाओं की आत्मनिर्भरता का प्रमुख आधार बनाता है।\n• **सक्रिय करघे (Active Looms)**: भारत में लगभग **28.20 लाख हथकरघे** संचालित हैं।\n• **ग्रामीण ग्रामीण भारत में उपस्थिति**: देश के लगभग **90% हथकरघे ग्रामीण क्षेत्रों** में केंद्रित हैं।\n• **ई-पहचान कार्ड (e-Pehchan Cards)**: जुलाई 2026 तक 84,000 से अधिक अतिरिक्त डिजिटल ई-पहचान कार्ड जारी किए जा चुके हैं।\n• **निर्यात प्रदर्शन (Export Data)**: 2025-26 के दौरान भारतीय हथकरघा उत्पादों का कुल निर्यात लगभग **₹1330.96 करोड़** रहा।\n• **GeM पोर्टल एकीकरण**: लगभग **15 लाख बुनकर सरकारी ई-मार्केटप्लेस (GeM Portal)** से जुड़ चुके हैं।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. राष्ट्रीय हथकरघा पुरस्कार एवं प्रमुख सरकारी योजनाएं (National Handloom Award & Schemes)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **राष्ट्रीय हथकरघा पुरस्कार (National Handloom Award)**: वस्त्र मंत्रालय द्वारा प्रतिवर्ष उत्कृष्ट बुनाई, डिजाइन नवाचार और हथकरघा कला के संरक्षण हेतु श्रेष्ठ बुनकरों को दिया जाने वाला सर्वोच्च सम्मान।\n• **राष्ट्रीय हथकरघा विकास कार्यक्रम (NHDP)**: क्लस्टर विकास, आधुनिक तकनीक, विपणन और बुनियादी ढांचा सहायता प्रदान करने वाली केंद्र सरकार की प्रमुख योजना।\n• **कच्चा माल आपूर्ति योजना (RMSS)**: बुनकरों को रियायती दर पर धागा उपलब्ध कराना, जिसमें विशेष धागों पर **15% मूल्य सब्सिडी (Price Subsidy)** दी जाती है।\n• **इंडिया हैंडलूम ब्रांड (India Handloom Brand)**: 7 अगस्त 2015 को शुरू किया गया ब्रांड, जो शून्य दोष (Zero Defect), पर्यावरण-अनुकूल और प्रामाणिक हथकरघा उत्पादों की वैश्विक ब्रांडिंग करता है।\n• **Handloom Mark योजना (2006)**: ग्राहकों को असली हथकरघा वस्त्रों की पहचान हेतु 2006 में शुरू की गई प्रमाणन योजना।\n• **GI Tag (भौगोलिक उपदर्शन अधिनियम 1999)**: चंदेरी साड़ी, महेश्वरी साड़ी (MP), पोचमपल्ली इकत, कांजीवरम आदि को जीआई टैग से कानूनी संरक्षण प्राप्त है।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "6. राष्ट्रीय हथकरघा दिवस पर प्रसिद्ध कोट्स एवं स्लोगन (Quotes & Slogans)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• *\"हथकरघा केवल एक वस्त्र नहीं, बल्कि भारत की अमूल्य सांस्कृतिक विरासत और बुनकरों की अटूट लगन का प्रतीक है।\"*\n• *\"My Handloom My Pride: स्वदेशी अपनाएं, भारतीय बुनकरों के सपनों को पंख लगाएं।\"*\n• *\"7 अगस्त का संदेश — खादी और हथकरघा से ही आत्मनिर्भर भारत का निर्माण संभव है।\"*",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "7. MPPSC & UPSC परीक्षा हेतु त्वरित स्मरणीय तथ्य (Quick Revision Summary)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **7 अगस्त** → राष्ट्रीय हथकरघा दिवस (National Handloom Day)\n• **1905** → स्वदेशी आंदोलन (कलकत्ता टाउन हॉल से औपचारिक घोषणा)\n• **2015** → प्रथम राष्ट्रीय हथकरघा दिवस एवं 'इंडिया हैंडलूम ब्रांड' का शुभारंभ\n• **2006** → Handloom Mark योजना की शुरुआत\n• **1999** → GI Act (भौगोलिक उपदर्शन संरक्षण अधिनियम)\n• **35.22 लाख** → भारत में कुल बुनकर व संबद्ध श्रमिक\n• **72%+** → महिला श्रमिकों की हिस्सेदारी\n• **28.20 लाख** → देश में कुल सक्रिय करघे (90% ग्रामीण)\n• **15%** → RMSS योजना के तहत धागे पर मूल्य सब्सिडी",
        },
      ],
    },
  ];

  const bodyEn = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "**National Handloom Day 2026** is observed across India on **7th August** every year. This landmark national event showcases India's magnificent handloom heritage, the socio-economic empowerment of millions of artisans, and the spirit of **Atmanirbhar Bharat (Self-Reliant India)**. The date of 7th August carries immense historical importance as it marks the **launch of the Swadeshi Movement on 7th August 1905 in Bengal**. Questions regarding handlooms, Swadeshi movement, Ministry of Textiles initiatives, and PIB releases frequently feature in competitive exams (**MPPSC Mains Paper 1 & 2** and **UPSC GS Paper 1 & 3**).",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img1AssetId },
      alt: "National Handloom Day 2026: Artisan woman weaving silk saree on traditional wooden handloom | MPPSC & UPSC Notes",
      caption: "Figure 1: National Handloom Day 2026 (7th August) — Celebrating Indian handloom heritage, 35.22 lakh weavers, and rural women empowerment (Ministry of Textiles)."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. Meaning and Definition of Handloom" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Meaning**: A 'handloom' refers to any loom operated entirely by human energy (hands and feet) without using electricity or fossil fuel power.\n• **Statutory Definition**: Under the Handlooms (Reservation of Articles for Production) Act 1985, a handloom is defined as any loom other than a powerloom used for weaving fabric.\n• **Cultural Masterpieces**: Famous traditional weaves include Chanderi & Maheshwari (Madhya Pradesh), Banarasi, Kanjeevaram, Ikat, Pochampally, and Jamdani.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. National Handloom Day 2026: Key Highlights" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Observed Date**: 7th August every year.\n• **Inauguration Year**: 7th August 2015 (Launched by PM Narendra Modi at Madras University, Chennai).\n• **Theme 2026**: \"Honoring Weavers • Identity of Swadeshi • Cultural Heritage of India\".\n• **Historical Basis**: 1905 Swadeshi Movement proclaimed at Calcutta Town Hall.\n• **Nodal Ministry**: Ministry of Textiles, Government of India.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. Historical Connection with Swadeshi Movement (1905)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Proclamation on 7th Aug 1905**: The Swadeshi Movement was formally proclaimed on 7th August 1905 at Calcutta Town Hall in opposition to Lord Curzon's Partition of Bengal.\n• **Boycott & Swadeshi Call**: The movement urged citizens to boycott British machine-made textiles and rely on indigenous handloom and khadi products.\n• **Government Declaration 2015**: To honor this historic Swadeshi legacy, the Government of India designated 7th August as National Handloom Day in 2015.",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img2AssetId },
      alt: "1905 Swadeshi Movement boycott of British cloth and India Handloom Brand certification",
      caption: "Figure 2: Historical 1905 Swadeshi Movement and modern India Handloom Brand certification — Journey from boycott to self-reliance."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. Key Statistics from Ministry of Textiles & PIB Reports" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Total Weavers & Workers**: **35.22 lakh** weavers and allied workers across India.\n• **Women Workforce**: Over **72% of total workers** are women, establishing handlooms as a primary driver of rural women's livelihood.\n• **Active Handlooms**: Approximately **28.20 lakh looms** operating in the country.\n• **Rural Dominance**: Over **90% of handlooms** are located in rural India.\n• **e-Pehchan Cards**: Over 84,000 additional digital e-Pehchan cards issued up to July 2026.\n• **Exports**: Total export of handloom products in 2025-26 reached **₹1330.96 Crore**.\n• **GeM Onboarding**: Nearly **15 lakh weavers** onboarded on Government e-Marketplace (GeM).",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. National Handloom Award & Government Schemes" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **National Handloom Award**: Highest national recognition presented annually by the Ministry of Textiles to weavers for outstanding craftsmanship and design innovation.\n• **National Handloom Development Programme (NHDP)**: Flagship scheme providing cluster development, marketing, and technology support.\n• **Raw Material Supply Scheme (RMSS)**: Ensures yarn supply to weavers with a **15% price subsidy** on specified yarns.\n• **India Handloom Brand (2015)**: Promotes zero-defect, eco-friendly authentic handloom products globally.\n• **Handloom Mark (2006)**: Quality certification mark providing collective identity to genuine handloom products.\n• **GI Protection**: Chanderi & Maheshwari sarees (MP), Banarasi, Pochampally Ikat, Kanjeevaram protected under Geographical Indications Act 1999.",
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "राष्ट्रीय हथकरघा दिवस कब मनाया जाता है?",
      questionEn: "When is National Handloom Day celebrated?",
      answer: "राष्ट्रीय हथकरघा दिवस प्रतिवर्ष 7 अगस्त को मनाया जाता है। पहला राष्ट्रीय हथकरघा दिवस 7 अगस्त 2015 को प्रधानमंत्री नरेंद्र मोदी द्वारा मद्रास विश्वविद्यालय, चेन्नई में शुरू किया गया था।",
      answerEn: "National Handloom Day is celebrated every year on 7th August. The first National Handloom Day was inaugurated on 7th August 2015 by PM Narendra Modi in Chennai."
    },
    {
      question: "हैंडलूम का हिंदी में क्या अर्थ होता है?",
      questionEn: "What is the meaning of Handloom in Hindi?",
      answer: "हैंडलूम (Handloom) का हिंदी अर्थ 'हथकरघा' होता है, अर्थात ऐसा करघा जो बिना किसी बिजली या ऊर्जा के मानव हाथों और पैरों द्वारा संचालित होता है।",
      answerEn: "The Hindi meaning of Handloom is 'Hathkargha' (हथकरघा), which refers to a manual loom operated by human energy without electricity."
    },
    {
      question: "7 अगस्त की तिथि का 1905 के स्वदेशी आंदोलन से क्या संबंध है?",
      questionEn: "What is the connection between 7th August and the 1905 Swadeshi Movement?",
      answer: "7 अगस्त 1905 को बंगाल विभाजन के विरोध में कलकत्ता टाउन हॉल से स्वदेशी आंदोलन की घोषणा की गई थी। इसी ऐतिहासिक घटना की स्मृति में 7 अगस्त को राष्ट्रीय हथकरघा दिवस घोषित किया गया।",
      answerEn: "On 7th August 1905, the Swadeshi Movement was formally proclaimed at Calcutta Town Hall in protest against the Partition of Bengal. 7th August was chosen to honor this event."
    },
    {
      question: "राष्ट्रीय हथकरघा पुरस्कार (National Handloom Award) क्या है?",
      questionEn: "What is the National Handloom Award?",
      answer: "राष्ट्रीय हथकरघा पुरस्कार वस्त्र मंत्रालय द्वारा प्रतिवर्ष दिया जाने वाला सर्वोच्च राष्ट्रीय सम्मान है, जो देश के श्रेष्ठ हथकरघा बुनकरों को उत्कृष्ट बुनाई कला, डिजाइन और संरक्षण हेतु प्रदान किया जाता है।",
      answerEn: "The National Handloom Award is the highest national honor conferred annually by the Ministry of Textiles to outstanding weavers for exemplary weaving skills and design innovation."
    },
    {
      question: "भारत के हथकरघा उद्योग का नोडल मंत्रालय कौन-सा है?",
      questionEn: "Which is the nodal ministry for India's handloom industry?",
      answer: "भारत सरकार का वस्त्र मंत्रालय (Ministry of Textiles) हथकरघा उद्योग का नोडल प्रशासनिक मंत्रालय है।",
      answerEn: "The Ministry of Textiles, Government of India is the nodal administrative ministry for the handloom sector."
    },
    {
      question: "हथकरघा उद्योग में महिला भागीदारी का प्रतिशत कितना है?",
      questionEn: "What is the percentage of female participation in the handloom sector?",
      answer: "भारत में कुल 35.22 लाख हथकरघा श्रमिकों में से 72% से अधिक महिलाएँ कार्यरत हैं, जो इसे ग्रामीण महिला सशक्तीकरण का प्रमुख जरिया बनाता है।",
      answerEn: "Out of 35.22 lakh total handloom workers in India, over 72% are women, making handloom a core driver of rural women's economic independence."
    }
  ];

  const mcqs = [
    {
      question: "राष्ट्रीय हथकरघा दिवस प्रतिवर्ष 7 अगस्त को किस ऐतिहासिक घटना की स्मृति में मनाया जाता है?",
      questionEn: "National Handloom Day is celebrated on 7th August to commemorate which historic event?",
      options: ["A. दांडी मार्च (1930)", "B. स्वदेशी आंदोलन (1905)", "C. असहयोग आंदोलन (1920)", "D. भारत छोड़ो आंदोलन (1942)"],
      optionsEn: ["A. Dandi March (1930)", "B. Swadeshi Movement (1905)", "C. Non-Cooperation Movement (1920)", "D. Quit India Movement (1942)"],
      correctIndex: 1,
      explanation: "7 अगस्त 1905 को बंगाल विभाजन के विरोध में कलकत्ता टाउन हॉल से स्वदेशी आंदोलन की घोषणा की गई थी। इसी दिन की स्मृति में प्रतिवर्ष 7 अगस्त को राष्ट्रीय हथकरघा दिवस मनाया जाता है।",
      explanationEn: "The Swadeshi Movement was proclaimed on 7th August 1905 at Calcutta Town Hall in protest against the Partition of Bengal. National Handloom Day is observed on 7th August to honor this movement."
    },
    {
      question: "प्रथम राष्ट्रीय हथकरघा दिवस का उद्घाटन किस वर्ष एवं किस स्थान पर किया गया था?",
      questionEn: "In which year and location was the inaugural National Handloom Day launched?",
      options: ["A. 2014, नई दिल्ली", "B. 2015, चेन्नई", "C. 2016, वाराणसी", "D. 2018, अहमदाबाद"],
      optionsEn: ["A. 2014, New Delhi", "B. 2015, Chennai", "C. 2016, Varanasi", "D. 2018, Ahmedabad"],
      correctIndex: 1,
      explanation: "प्रथम राष्ट्रीय हथकरघा दिवस का उद्घाटन प्रधानमंत्री नरेंद्र मोदी द्वारा 7 अगस्त 2015 को मद्रास विश्वविद्यालय, चेन्नई (तमिलनाडु) में किया गया था।",
      explanationEn: "The first National Handloom Day was inaugurated by PM Narendra Modi on 7th August 2015 at Madras University, Chennai."
    },
    {
      question: "वस्त्र मंत्रालय की नवीनतम रिपोर्ट के अनुसार, भारत के हथकरघा उद्योग में महिला श्रमिकों की भागीदारी कितने प्रतिशत से अधिक है?",
      questionEn: "According to the Ministry of Textiles, female participation in India's handloom sector is above what percentage?",
      options: ["A. 45%", "B. 55%", "C. 65%", "D. 72%"],
      optionsEn: ["A. 45%", "B. 55%", "C. 65%", "D. 72%"],
      correctIndex: 3,
      explanation: "देश के कुल 35.22 लाख हथकरघा श्रमिकों में 72% से अधिक महिलाएँ कार्यरत हैं, जो इसे ग्रामीण महिला सशक्तीकरण का मुख्य माध्यम बनाता है।",
      explanationEn: "Over 72% of the total 35.22 lakh handloom workers across India are women."
    },
    {
      question: "'इंडिया हैंडलूम ब्रांड' (India Handloom Brand) की शुरुआत कब की गई थी?",
      questionEn: "When was the 'India Handloom Brand' launched?",
      options: ["A. 2006", "B. 2010", "C. 7 अगस्त 2015", "D. 26 जनवरी 2016"],
      optionsEn: ["A. 2006", "B. 2010", "C. 7th August 2015", "D. 26th January 2016"],
      correctIndex: 2,
      explanation: "इंडिया हैंडलूम ब्रांड को 7 अगस्त 2015 को प्रथम राष्ट्रीय हथकरघा दिवस के अवसर पर उच्च गुणवत्ता वाले प्रामाणिक हथकरघा वस्त्रों की ब्रांडिंग हेतु लॉन्च किया गया था।",
      explanationEn: "India Handloom Brand was launched on 7th August 2015 on the occasion of the first National Handloom Day."
    },
    {
      question: "कच्चा माल आपूर्ति योजना (RMSS) के तहत बुनकरों को विशेष धागों पर कितने प्रतिशत मूल्य सब्सिडी प्रदान की जाती है?",
      questionEn: "What percentage of price subsidy is provided on specified yarn under the Raw Material Supply Scheme (RMSS)?",
      options: ["A. 5%", "B. 10%", "C. 15%", "D. 20%"],
      optionsEn: ["A. 5%", "B. 10%", "C. 15%", "D. 20%"],
      correctIndex: 2,
      explanation: "वस्त्र मंत्रालय द्वारा कच्चा माल आपूर्ति योजना (RMSS) के तहत बुनकरों को धागा आपूर्ति पर 15% मूल्य सब्सिडी (Price Subsidy) प्रदान की जाती है।",
      explanationEn: "Under the Raw Material Supply Scheme (RMSS), weavers receive a 15% price subsidy on specified types of yarn."
    },
    {
      question: "हथकरघा उत्पादों की गुणवत्ता व प्रामाणिकता की पहचान हेतु 'Handloom Mark' योजना किस वर्ष शुरू की गई थी?",
      questionEn: "In which year was the 'Handloom Mark' scheme introduced for authenticating handloom products?",
      options: ["A. 1999", "B. 2006", "C. 2014", "D. 2020"],
      optionsEn: ["A. 1999", "B. 2006", "C. 2014", "D. 2020"],
      correctIndex: 1,
      explanation: "ग्राहकों को असली हथकरघा वस्त्रों की पहचान कराने हेतु भारत सरकार ने 2006 में 'Handloom Mark' योजना शुरू की थी।",
      explanationEn: "The Government of India launched the 'Handloom Mark' scheme in 2006 to provide authentication for genuine handloom goods."
    },
    {
      question: "मध्य प्रदेश के कौन-से दो प्रसिद्ध वस्त्र शिल्प भौगोलिक उपदर्शन (GI Tag) के तहत संरक्षित हथकरघा उत्पाद हैं?",
      questionEn: "Which two famous textile crafts of Madhya Pradesh are Geographical Indication (GI Tag) protected handloom products?",
      options: ["A. बनारसी व कांजीवरम", "B. चंदेरी साड़ी व महेश्वरी साड़ी", "C. पोचमपल्ली इकत व जामदानी", "D. पटोला व बांधनी"],
      optionsEn: ["A. Banarasi & Kanjeevaram", "B. Chanderi Saree & Maheshwari Saree", "C. Pochampally Ikat & Jamdani", "D. Patola & Bandhani"],
      correctIndex: 1,
      explanation: "मध्य प्रदेश के अशोकनगर जिले की 'चंदेरी साड़ी' और खरगोन जिले की 'महेश्वरी साड़ी' दोनों जीआई टैग (GI Tag) प्राप्त विश्व प्रसिद्ध हथकरघा उत्पाद हैं।",
      explanationEn: "Chanderi Saree (Ashoknagar, MP) and Maheshwari Saree (Khargone, MP) are world-famous GI-tagged handloom crafts of Madhya Pradesh."
    },
    {
      question: "वर्ष 2025-26 के दौरान भारत से हथकरघा उत्पादों का कुल निर्यात लगभग कितना रहा?",
      questionEn: "What was the approximate total export value of handloom products from India in 2025-26?",
      options: ["A. ₹850.50 करोड़", "B. ₹1100.00 करोड़", "C. ₹1330.96 करोड़", "D. ₹2100.00 करोड़"],
      optionsEn: ["A. ₹850.50 Crore", "B. ₹1100.00 Crore", "C. ₹1330.96 Crore", "D. ₹2100.00 Crore"],
      correctIndex: 2,
      explanation: "वर्ष 2025-26 के दौरान भारत से हथकरघा वस्त्रों एवं हस्तशिल्प उत्पादों का कुल निर्यात लगभग ₹1330.96 करोड़ दर्ज किया गया।",
      explanationEn: "The total export of handloom products from India in 2025-26 reached approximately ₹1330.96 Crore."
    }
  ];

  console.log("Upserting SEO-optimized currentAffairs document in Sanity...");

  const caDoc = {
    _id: "ca-national-handloom-day-2026",
    _type: "currentAffairs",
    title: titleHi,
    titleEn,
    slug: { _type: "slug", current: slug },
    date: publishedAt,
    ca_date: caDate,
    publishedAt,
    excerpt: excerptHi,
    excerptEn,
    author: { _type: "reference", _ref: "author-aakar" },
    category: { _type: "reference", _ref: "cat-misc" },
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: img1AssetId },
      alt: "राष्ट्रीय हथकरघा दिवस 2026: पारंपरिक हथकरघा पर बुनकर महिला द्वारा वस्त्र बुनाई | MPPSC & UPSC Notes",
      caption: "चित्र 1: राष्ट्रीय हथकरघा दिवस 2026 (7 अगस्त) — भारतीय हथकरघा परंपरा, 35.22 लाख बुनकरों का योगदान एवं वस्त्र मंत्रालय की योजनाएं।"
    },
    tags: [
      { _type: "reference", _ref: "tag-mppsc", _key: "tag-mppsc-key" },
      { _type: "reference", _ref: "tag-upsc", _key: "tag-upsc-key" },
      { _type: "reference", _ref: "tag-important-days", _key: "tag-important-days-key" },
      { _type: "reference", _ref: "tag-national-affairs", _key: "tag-national-affairs-key" },
      { _type: "reference", _ref: "tag-prelims", _key: "tag-prelims-key" },
      { _type: "reference", _ref: "tag-mains", _key: "tag-mains-key" }
    ],
    body: bodyHi,
    bodyEn,
    faqs,
    mcqs
  };

  const resCa = await client.createOrReplace(caDoc);
  console.log("Successfully SEO-optimized currentAffairs document:", resCa._id);

  console.log("Upserting SEO-optimized staticGk document in Sanity...");
  const gkDoc = {
    ...caDoc,
    _id: "gk-national-handloom-day-2026",
    _type: "staticGk",
  };
  const resGk = await client.createOrReplace(gkDoc);
  console.log("Successfully SEO-optimized staticGk document:", resGk._id);
}

main().catch((err) => {
  console.error("Error optimizing article:", err);
  process.exit(1);
});
