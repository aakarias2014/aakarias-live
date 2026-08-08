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
  const img1Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/14251804-5246-4cc0-803c-555991c2ebbe/national_handloom_day_weaver_1786193809037.png";
  const img2Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/14251804-5246-4cc0-803c-555991c2ebbe/swadeshi_movement_handloom_brand_1786193827233.png";

  console.log("Uploading image assets to Sanity CMS...");

  const img1Asset = await client.assets.upload("image", fs.createReadStream(img1Path), {
    filename: "national_handloom_day_weaver.png",
    contentType: "image/png",
  });

  const img2Asset = await client.assets.upload("image", fs.createReadStream(img2Path), {
    filename: "swadeshi_movement_handloom_brand.png",
    contentType: "image/png",
  });

  console.log("Uploaded Image 1:", img1Asset._id);
  console.log("Uploaded Image 2:", img2Asset._id);

  const titleHi = "राष्ट्रीय हथकरघा दिवस 2026 (National Handloom Day): 7 अगस्त, स्वदेशी आंदोलन (1905), बुनकर प्रोत्साहन व वस्त्र मंत्रालय की योजनाएं | MPPSC & UPSC Notes";
  const titleEn = "National Handloom Day 2026: 7th August, Swadeshi Movement (1905), Ministry of Textiles Schemes & Weavers Welfare | MPPSC & UPSC";

  const excerptHi = "राष्ट्रीय हथकरघा दिवस (7 अगस्त 2026) का विस्तृत विश्लेषण: 1905 के स्वदेशी आंदोलन की पृष्ठभूमि, 35.22 लाख बुनकर (72% महिला भागीदारी), NHDP, RMSS (15% सब्सिडी), ई-पहचान पोर्टल, इंडिया हैंडलूम ब्रांड, Handloom Mark (2006), GI Act (1999) तथा MPPSC एवं UPSC परीक्षा उपयोगी मॉडल MCQs व FAQs।";
  const excerptEn = "Detailed study of National Handloom Day observed on 7th August 2026. Covers 1905 Swadeshi Movement origin, 35.22 lakh weavers (72% female participation), Ministry of Textiles schemes (NHDP, RMSS, e-Pehchan), India Handloom Brand, Handloom Mark (2006), GI Act (1999), model answers, and 8 practice MCQs for MPPSC and UPSC exams.";

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
          text: "भारत में प्रतिवर्ष **7 अगस्त** को **राष्ट्रीय हथकरघा दिवस (National Handloom Day)** मनाया जाता है। यह विशेष दिवस देश की समृद्ध हथकरघा परंपरा, सांस्कृतिक विरासत, लाखों बुनकरों के अमूल्य योगदान तथा **आत्मनिर्भर भारत (Self-Reliant India)** की भावना को सम्मानित करने हेतु समर्पित है। ऐतिहासिक रूप से यह दिवस **7 अगस्त 1905 को प्रारंभ हुए 'स्वदेशी आंदोलन' (Swadeshi Movement)** की पावन स्मृति में मनाया जाता है। सिविल सेवा परीक्षाओं (**MPPSC मुख्य परीक्षा प्रश्नपत्र 1 - इतिहास व संस्कृति तथा प्रश्नपत्र 2 - अर्थशास्त्र व सामाजिक क्षेत्र** एवं **UPSC GS Paper 1 & 3**) के दृष्टिकोण से भारत का हथकरघा उद्योग अत्यंत महत्त्वपूर्ण विषय है।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img1Asset._id },
      alt: "राष्ट्रीय हथकरघा दिवस 2026: पारंपरिक हथकरघा पर बुनकर महिला द्वारा वस्त्र बुनाई का दृश्य | MPPSC & UPSC Notes",
      caption: "चित्र 1: राष्ट्रीय हथकरघा दिवस (7 अगस्त) — भारतीय हथकरघा परंपरा, 35.22 लाख बुनकरों का योगदान एवं स्वदेशी वस्त्र निर्माण (वस्त्र मंत्रालय, भारत सरकार)।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. राष्ट्रीय हथकरघा दिवस 2026: मुख्य तथ्य (Key Exam Highlights)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **स्थापना वर्ष (Establishment Year)**: 2015 (प्रथम राष्ट्रीय हथकरघा दिवस का उद्घाटन प्रधानमंत्री नरेंद्र मोदी द्वारा 7 अगस्त 2015 को मद्रास विश्वविद्यालय, चेन्नई में किया गया)।\n• **आयोजन तिथि (Observed On)**: प्रतिवर्ष 7 अगस्त।\n• **ऐतिहासिक आधार (Historical Basis)**: 7 अगस्त 1905 को कलकत्ता के टाउन हॉल से शुरू हुआ ऐतिहासिक **स्वदेशी आंदोलन (Swadeshi Movement)**।\n• **मुख्य उद्देश्य (Core Objective)**: देश में हथकरघा उद्योग को बढ़ावा देना, बुनकरों का सामाजिक-आर्थिक सशक्तीकरण करना तथा स्वदेशी उत्पादों के प्रति जन-जागरूकता बढ़ाना।\n• **नोडल मंत्रालय (Nodal Ministry)**: वस्त्र मंत्रालय (Ministry of Textiles, Government of India)।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. स्वदेशी आंदोलन (1905) से ऐतिहासिक संबंध" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **स्वदेशी आंदोलन की शुरुआत**: 7 अगस्त 1905 को लॉर्ड कर्जन द्वारा किए गए बंगाल विभाजन (Partition of Bengal) के विरोध में कलकत्ता के टाउन हॉल में एक विशाल जनसभा में **स्वदेशी आंदोलन** की घोषणा की गई थी।\n• **बहिष्कार एवं स्वदेशी का आह्वान**: आंदोलन के दौरान ब्रिटिश वस्त्रों व विदेशी वस्तुओं के पूर्ण बहिष्कार का आह्वान किया गया और खादी व घरेलू हथकरघा उत्पादों को स्वतंत्रता संग्राम का मुख्य प्रतीक बनाया गया।\n• **हथकरघा दिवस की प्रेरणा**: इसी ऐतिहासिक स्वदेशी भावना व देशज उद्योगों की पुनर्स्थापना की स्मृति में भारत सरकार ने 2015 में निर्णय लिया कि 7 अगस्त को प्रतिवर्ष राष्ट्रीय हथकरघा दिवस के रूप में मनाया जाएगा।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img2Asset._id },
      alt: "1905 का स्वदेशी आंदोलन एवं आधुनिक इंडिया हैंडलूम ब्रांड (India Handloom Brand)",
      caption: "चित्र 2: 1905 का ऐतिहासिक स्वदेशी आंदोलन एवं आधुनिक भारत का प्रामाणिक 'इंडिया हैंडलूम ब्रांड' (India Handloom Brand) - स्वदेशी से आत्मनिर्भरता की यात्रा।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. भारत का हथकरघा उद्योग: प्रमुख आँकड़े (Statistical Profile)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **कुल बुनकर एवं संबद्ध श्रमिक (Total Weavers & Allied Workers)**: देश भर में **35.22 लाख** हथकरघा बुनकर एवं संबद्ध श्रमिक कार्यरत हैं।\n• **महिला सशक्तीकरण (Women Empowerment)**: हथकरघा क्षेत्र में **72% से अधिक महिलाएँ** कार्यरत हैं, जो इसे ग्रामीण महिला आजीविका का सबसे बड़ा साधन बनाता है।\n• **करघों की संख्या (Number of Looms)**: भारत में लगभग **28.20 लाख करघे (Handlooms)** संचालित हैं।\n• **ग्रामीण उपस्थिति (Rural Concentration)**: देश के लगभग **90% हथकरघे ग्रामीण क्षेत्रों** में स्थित हैं।\n• **डिजिटल ई-पहचान कार्ड (e-Pehchan Cards)**: जुलाई 2026 तक 84,000 से अधिक अतिरिक्त ई-पहचान कार्ड स्वीकृत किए जा चुके हैं।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. हथकरघा क्षेत्र हेतु प्रमुख सरकारी योजनाएँ व पहलें" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **राष्ट्रीय हथकरघा विकास कार्यक्रम (NHDP)**: हथकरघा क्षेत्र के समग्र विकास, क्लस्टर निर्माण, डिजाइन नवाचार, बुनियादी ढांचे और विपणन सहायता हेतु भारत सरकार की फ्लैगशिप योजना।\n• **कच्चा माल आपूर्ति योजना (RMSS - Raw Material Supply Scheme)**: बुनकरों को गुणवत्तापूर्ण धागे की निर्बाध उपलब्धता सुनिश्चित कराना, जिसमें विशेष धागों पर **15% मूल्य सब्सिडी (Price Subsidy)** प्रदान की जाती है।\n• **ई-पहचान पोर्टल (e-Pehchan Portal)**: बुनकरों का पारदर्शी ऑनलाइन पंजीकरण एवं डिजिटल पहचान पत्र जारी करने की प्रणाली।\n• **इंडिया हैंडलूम ब्रांड (India Handloom Brand)**: 7 अगस्त 2015 को लॉन्च किया गया ब्रांड, जिसका उद्देश्य उच्च गुणवत्ता, शून्य दोष (Zero Defect) तथा प्रामाणिक पर्यावरण-अनुकूल हथकरघा उत्पादों की ब्रांडिंग करना है।\n• **GeM पोर्टल एकीकरण**: लगभग **15 लाख बुनकर सरकारी ई-मार्केटप्लेस (GeM Portal)** से जुड़ चुके हैं, जिससे सरकारी मंत्रालयों व विभागों में हथकरघा उत्पादों की सीधी खरीद संभव हुई है।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. वर्ष 2026 की प्रमुख उपलब्धियाँ (Achievements in 2026)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **उत्पादक कंपनियों का गठन**: 200 हथकरघा उत्पादक कंपनियाँ (Handloom Producer Companies) गठित की गईं।\n• **प्रदर्शनी व विपणन कार्यक्रम**: देश भर में **960+ हथकरघा प्रदर्शनियाँ** एवं विपणन मेले आयोजित किए गए।\n• **रियायती ऋण (Concessional Credit)**: मुद्रा योजना के तहत 40,000 से अधिक बुनकरों को रियायती ऋण स्वीकृत किए गए।\n• **निर्यात प्रदर्शन (Export Performance)**: वर्ष 2025-26 के दौरान भारत से हथकरघा उत्पादों का कुल निर्यात लगभग **₹1330.96 करोड़** रहा।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "6. MPPSC & UPSC परीक्षा हेतु क्विक रिवीजन पॉइंट्स (Quick Revision)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **7 अगस्त** → राष्ट्रीय हथकरघा दिवस (National Handloom Day)\n• **1905** → ऐतिहासिक स्वदेशी आंदोलन (Swadeshi Movement)\n• **2015** → राष्ट्रीय हथकरघा दिवस एवं 'इंडिया हैंडलूम ब्रांड' की शुरुआत\n• **2006** → Handloom Mark योजना की शुरुआत\n• **1999** → भौगोलिक उपदर्शन अधिनियम (GI Act 1999)\n• **35.22 लाख** → भारत में कुल बुनकर एवं संबद्ध श्रमिक\n• **72%+** → हथकरघा क्षेत्र में महिला श्रमिकों की हिस्सेदारी\n• **28.20 लाख** → देश में कुल सक्रिय करघे (90% ग्रामीण)",
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
          text: "**National Handloom Day** is celebrated every year on **7th August** across India. This significant day honors the rich heritage of Indian handloom weaving, the invaluable socio-economic contribution of millions of weavers, and the spirit of **Atmanirbhar Bharat (Self-Reliant India)**. Historically, this day commemorates the **Swadeshi Movement launched on 7th August 1905**. From the perspective of competitive examinations (**MPPSC Mains Paper 1 & 2** and **UPSC GS Paper 1 & 3**), India's handloom sector is a vital topic covering socio-economic development, rural livelihoods, and cultural heritage.",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img1Asset._id },
      alt: "National Handloom Day 2026: Artisan woman weaving silk saree on traditional wooden handloom | MPPSC & UPSC Notes",
      caption: "Figure 1: National Handloom Day (7th August) — Celebrating Indian handloom heritage, 35.22 lakh weavers, and rural women empowerment (Ministry of Textiles)."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. National Handloom Day 2026: Key Exam Highlights" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Inauguration Year**: 2015 (First National Handloom Day was inaugurated by PM Narendra Modi on 7th August 2015 at Centenary Hall, Madras University, Chennai).\n• **Observed Date**: 7th August every year.\n• **Historical Origin**: Commemorates the **Swadeshi Movement** launched at Calcutta Town Hall on 7th August 1905.\n• **Nodal Ministry**: Ministry of Textiles, Government of India.\n• **Primary Objective**: Promoting handloom industry, socio-economic empowerment of weavers, and encouraging indigenous swadeshi products.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. Historical Connection with Swadeshi Movement (1905)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Swadeshi Movement Launch**: On 7th August 1905, in protest against Lord Curzon's Partition of Bengal, the Swadeshi Movement was formally proclaimed at a massive rally in Calcutta Town Hall.\n• **Boycott of Foreign Goods**: The movement called for a total boycott of British manufactured goods and promoted khadi and handlooms as symbols of India's freedom struggle.\n• **Commemorative Tribute**: To honor this historical Swadeshi legacy, the Government of India declared 7th August as National Handloom Day in 2015.",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img2Asset._id },
      alt: "1905 Swadeshi Movement boycott of British cloth and India Handloom Brand certification",
      caption: "Figure 2: Historical 1905 Swadeshi Movement and modern India Handloom Brand certification — Journey from boycott to self-reliance."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. Statistical Profile of India's Handloom Sector" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Total Weavers & Workers**: **35.22 lakh** handloom weavers and allied workers across India.\n• **Women Empowerment**: Over **72% of total workers** are women, making handloom a primary driver of female rural employment.\n• **Total Looms**: Approximately **28.20 lakh handlooms** operating nationwide.\n• **Rural Base**: Over **90% of handlooms** are located in rural India.\n• **e-Pehchan Cards**: Over 84,000 additional e-Pehchan digital identity cards approved up to July 2026.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. Major Government Schemes & Initiatives" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **National Handloom Development Programme (NHDP)**: Flagship scheme for cluster development, design innovation, infrastructure, and marketing support.\n• **Raw Material Supply Scheme (RMSS)**: Ensures steady yarn availability to weavers with a **15% price subsidy** on specified yarns.\n• **e-Pehchan Portal**: Online registration portal for digital identity cards for weavers.\n• **India Handloom Brand**: Launched on 7th August 2015 for branding high-quality, zero-defect, and eco-friendly authentic handloom products.\n• **GeM Portal Integration**: Nearly **15 lakh weavers** onboarded on the Government e-Marketplace (GeM) for direct procurement by government departments.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. Key Achievements in 2026" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Producer Companies**: 200 Handloom Producer Companies formed.\n• **Exhibitions**: Over **960 handloom exhibitions** and marketing events organized.\n• **Concessional Credit**: Concessional loans sanctioned to over 40,000 weavers under MUDRA scheme.\n• **Exports**: Total export of handloom products in 2025-26 reached approximately **₹1330.96 crore**.",
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "राष्ट्रीय हथकरघा दिवस प्रतिवर्ष किस तिथि को मनाया जाता है?",
      questionEn: "On which date is National Handloom Day celebrated every year?",
      answer: "राष्ट्रीय हथकरघा दिवस प्रतिवर्ष 7 अगस्त को मनाया जाता है। इसका पहला संस्करण 7 अगस्त 2015 को चेन्नई में आयोजित किया गया था।",
      answerEn: "National Handloom Day is celebrated every year on 7th August. Its first edition was inaugurated on 7th August 2015 in Chennai."
    },
    {
      question: "7 अगस्त की तिथि को राष्ट्रीय हथकरघा दिवस हेतु क्यों चुना गया?",
      questionEn: "Why was 7th August chosen as National Handloom Day?",
      answer: "7 अगस्त 1905 को कलकत्ता के टाउन हॉल से शुरू हुए ऐतिहासिक 'स्वदेशी आंदोलन' (Swadeshi Movement) की स्मृति में 7 अगस्त की तिथि चुनी गई है।",
      answerEn: "7th August was chosen to commemorate the historic Swadeshi Movement launched on 7th August 1905 at Calcutta Town Hall."
    },
    {
      question: "भारत के हथकरघा उद्योग में महिला श्रमिकों की हिस्सेदारी कितनी है?",
      questionEn: "What is the percentage of women workers in India's handloom sector?",
      answer: "भारत के हथकरघा उद्योग में कुल 35.22 लाख श्रमिकों में से 72% से अधिक महिलाएँ कार्यरत हैं।",
      answerEn: "Out of 35.22 lakh total workers in India's handloom sector, over 72% are women."
    },
    {
      question: "इंडिया हैंडलूम ब्रांड (India Handloom Brand) कब शुरू किया गया था?",
      questionEn: "When was the India Handloom Brand launched?",
      answer: "इंडिया हैंडलूम ब्रांड की शुरुआत 7 अगस्त 2015 को प्रथम राष्ट्रीय हथकरघा दिवस के अवसर पर की गई थी।",
      answerEn: "India Handloom Brand was launched on 7th August 2015 on the occasion of the first National Handloom Day."
    }
  ];

  const mcqs = [
    {
      question: "राष्ट्रीय हथकरघा दिवस प्रतिवर्ष किस ऐतिहासिक घटना की स्मृति में 7 अगस्त को मनाया जाता है?",
      questionEn: "National Handloom Day is observed on 7th August to commemorate which historic event?",
      options: ["A. दांडी मार्च (1930)", "B. स्वदेशी आंदोलन (1905)", "C. असहयोग आंदोलन (1920)", "D. भारत छोड़ो आंदोलन (1942)"],
      optionsEn: ["A. Dandi March (1930)", "B. Swadeshi Movement (1905)", "C. Non-Cooperation Movement (1920)", "D. Quit India Movement (1942)"],
      correctIndex: 1,
      explanation: "7 अगस्त 1905 को बंगाल विभाजन के विरोध में कलकत्ता टाउन हॉल से स्वदेशी आंदोलन की घोषणा की गई थी। उसी की स्मृति में 7 अगस्त को राष्ट्रीय हथकरघा दिवस मनाया जाता है।",
      explanationEn: "The Swadeshi Movement was proclaimed on 7th August 1905 at Calcutta Town Hall in protest against the Partition of Bengal. National Handloom Day is celebrated on 7th August to honor this event."
    },
    {
      question: "प्रथम राष्ट्रीय हथकरघा दिवस का औपचारिक उद्घाटन किस वर्ष किया गया था?",
      questionEn: "In which year was the first official National Handloom Day inaugurated?",
      options: ["A. 2014", "B. 2015", "C. 2016", "D. 2018"],
      optionsEn: ["A. 2014", "B. 2015", "C. 2016", "D. 2018"],
      correctIndex: 1,
      explanation: "प्रथम राष्ट्रीय हथकरघा दिवस का उद्घाटन प्रधानमंत्री नरेंद्र मोदी द्वारा 7 अगस्त 2015 को चेन्नई (मद्रास विश्वविद्यालय) में किया गया था।",
      explanationEn: "The inaugural National Handloom Day was launched by PM Narendra Modi on 7th August 2015 in Chennai."
    },
    {
      question: "भारत सरकार में हथकरघा क्षेत्र के विकास हेतु नोडल मंत्रालय कौन-सा है?",
      questionEn: "Which is the nodal ministry for handloom development in the Government of India?",
      options: ["A. एमएसएमई मंत्रालय", "B. वाणिज्य एवं उद्योग मंत्रालय", "C. वस्त्र मंत्रालय", "D. ग्रामीण विकास मंत्रालय"],
      optionsEn: ["A. Ministry of MSME", "B. Ministry of Commerce & Industry", "C. Ministry of Textiles", "D. Ministry of Rural Development"],
      correctIndex: 2,
      explanation: "भारत सरकार का वस्त्र मंत्रालय (Ministry of Textiles) हथकरघा क्षेत्र हेतु नोडल प्रशासनिक मंत्रालय है।",
      explanationEn: "The Ministry of Textiles, Government of India is the nodal ministry responsible for the handloom sector."
    },
    {
      question: "भारत के हथकरघा उद्योग के संदर्भ में निम्नलिखित कथनों पर विचार कीजिए:\n1. कुल श्रमिकों में 72% से अधिक महिलाएँ शामिल हैं।\n2. देश के लगभग 90% करघे ग्रामीण क्षेत्रों में स्थित हैं।\nउपर्युक्त में से कौन-सा/से कथन सत्य है/हैं?",
      questionEn: "Consider the following statements regarding India's handloom industry:\n1. Over 72% of total handloom workers are women.\n2. Nearly 90% of total handlooms are located in rural areas.\nWhich of the above statements is/are correct?",
      options: ["A. केवल 1", "B. केवल 2", "C. 1 और 2 दोनों", "D. न तो 1 और न ही 2"],
      optionsEn: ["A. Only 1", "B. Only 2", "C. Both 1 and 2", "D. Neither 1 nor 2"],
      correctIndex: 2,
      explanation: "दोनों कथन सत्य हैं। भारत के 35.22 लाख हथकरघा श्रमिकों में 72% से अधिक महिलाएँ हैं और 90% करघे ग्रामीण भारत में स्थित हैं।",
      explanationEn: "Both statements are correct. Over 72% of 35.22 lakh total handloom workers are women and 90% of handlooms are situated in rural India."
    },
    {
      question: "'इंडिया हैंडलूम ब्रांड' (India Handloom Brand) किस वर्ष लॉन्च किया गया था?",
      questionEn: "In which year was the 'India Handloom Brand' launched?",
      options: ["A. 2006", "B. 2010", "C. 2015", "D. 2020"],
      optionsEn: ["A. 2006", "B. 2010", "C. 2015", "D. 2020"],
      correctIndex: 2,
      explanation: "इंडिया हैंडलूम ब्रांड को 7 अगस्त 2015 को उच्च गुणवत्ता वाले प्रामाणिक हथकरघा उत्पादों को बढ़ावा देने हेतु लॉन्च किया गया था।",
      explanationEn: "India Handloom Brand was launched on 7th August 2015 to brand high quality authentic handloom products."
    },
    {
      question: "कच्चा माल आपूर्ति योजना (RMSS) के तहत बुनकरों को विशेष धागों पर कितने प्रतिशत मूल्य सब्सिडी दी जाती है?",
      questionEn: "What percentage of price subsidy is provided on specified yarn under the Raw Material Supply Scheme (RMSS)?",
      options: ["A. 5%", "B. 10%", "C. 15%", "D. 25%"],
      optionsEn: ["A. 5%", "B. 10%", "C. 15%", "D. 25%"],
      correctIndex: 2,
      explanation: "वस्त्र मंत्रालय द्वारा कच्चा माल आपूर्ति योजना (RMSS) के अंतर्गत बुनकरों को धागे पर 15% मूल्य सब्सिडी (Price Subsidy) प्रदान की जाती है।",
      explanationEn: "Under the Raw Material Supply Scheme (RMSS), weavers get a 15% price subsidy on specified types of yarn."
    },
    {
      question: "Handloom Mark योजना किस वर्ष प्रारंभ की गई थी?",
      questionEn: "In which year was the Handloom Mark Scheme launched?",
      options: ["A. 1999", "B. 2006", "C. 2012", "D. 2015"],
      optionsEn: ["A. 1999", "B. 2006", "C. 2012", "D. 2015"],
      correctIndex: 1,
      explanation: "Handloom Mark योजना 2006 में शुरू की गई थी, जिसका उद्देश्य ग्राहकों को असली हथकरघा उत्पादों की पहचान करने में मदद करना था।",
      explanationEn: "The Handloom Mark scheme was introduced in 2006 to provide a collective identity to authentic handloom products."
    },
    {
      question: "2025-26 में भारत से हथकरघा उत्पादों का कुल निर्यात लगभग कितना रहा?",
      questionEn: "What was the approximate total export value of handloom products from India in 2025-26?",
      options: ["A. ₹500.50 करोड़", "B. ₹950.00 करोड़", "C. ₹1330.96 करोड़", "D. ₹2500.00 करोड़"],
      optionsEn: ["A. ₹500.50 Crore", "B. ₹950.00 Crore", "C. ₹1330.96 Crore", "D. ₹2500.00 Crore"],
      correctIndex: 2,
      explanation: "वर्ष 2025-26 के दौरान भारत से हथकरघा उत्पादों का कुल निर्यात लगभग ₹1330.96 करोड़ दर्ज किया गया।",
      explanationEn: "The total export of Indian handloom products in 2025-26 reached approximately ₹1330.96 Crore."
    }
  ];

  console.log("Upserting currentAffairs document in Sanity...");

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
      asset: { _type: "reference", _ref: img1Asset._id },
      alt: "राष्ट्रीय हथकरघा दिवस 2026: पारंपरिक हथकरघा पर बुनकर महिला द्वारा वस्त्र बुनाई | MPPSC & UPSC Notes",
      caption: "चित्र 1: राष्ट्रीय हथकरघा दिवस (7 अगस्त) — भारतीय हथकरघा परंपरा एवं 35.22 लाख बुनकरों का सामाजिक-आर्थिक सशक्तीकरण।"
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
  console.log("Successfully published currentAffairs document:", resCa._id);

  console.log("Upserting staticGk document for Important Days feed...");
  const gkDoc = {
    ...caDoc,
    _id: "gk-national-handloom-day-2026",
    _type: "staticGk",
  };
  const resGk = await client.createOrReplace(gkDoc);
  console.log("Successfully published staticGk document:", resGk._id);
}

main().catch((err) => {
  console.error("Error publishing article:", err);
  process.exit(1);
});
