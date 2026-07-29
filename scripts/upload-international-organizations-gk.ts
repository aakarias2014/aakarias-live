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
  console.log("🚀 Starting upload for International Organizations and Their Headquarters GK Article...");

  const publicBlogDir = path.resolve(process.cwd(), "public/images/blog");
  const artifactDir = "/Users/aakariastech/.gemini/antigravity-ide/brain/46ddf059-c542-4af1-8a30-e0605b309cce";

  const destUn = path.join(publicBlogDir, "un_headquarters_new_york_flags.png");
  const destGeneva = path.join(publicBlogDir, "geneva_international_organizations_hub.png");
  const destIcj = path.join(publicBlogDir, "peace_palace_icj_the_hague.png");

  if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });

  const srcUn = path.join(artifactDir, "un_headquarters_new_york_flags_1785321091522.png");
  const srcGeneva = path.join(artifactDir, "geneva_international_organizations_hub_1785321105767.png");
  const srcIcj = path.join(artifactDir, "peace_palace_icj_the_hague_1785321120450.png");

  if (fs.existsSync(srcUn)) fs.copyFileSync(srcUn, destUn);
  if (fs.existsSync(srcGeneva)) fs.copyFileSync(srcGeneva, destGeneva);
  if (fs.existsSync(srcIcj)) fs.copyFileSync(srcIcj, destIcj);

  console.log("📸 Uploading images to Sanity...");
  const assetUn = await client.assets.upload("image", fs.createReadStream(destUn), {
    filename: "un_headquarters_new_york_flags.png",
  });
  const assetGeneva = await client.assets.upload("image", fs.createReadStream(destGeneva), {
    filename: "geneva_international_organizations_hub.png",
  });
  const assetIcj = await client.assets.upload("image", fs.createReadStream(destIcj), {
    filename: "peace_palace_icj_the_hague.png",
  });

  const docId = "gk-international-organizations-headquarters";
  const slug = "international-organizations-and-their-headquarters-mppsc-upsc-notes";

  const articleDoc = {
    _id: docId,
    _type: "staticGk",
    title: "अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय: संपूर्ण सूची, ट्रिक्स व नोट्स | MPPSC & UPSC Notes",
    titleEn: "International Organizations and Their Headquarters: Complete List, Memory Tricks & Notes | MPPSC & UPSC",
    slug: { _type: "slug", current: slug },
    category: { _type: "reference", _ref: "cat-misc" }, // General Awareness Misc
    ca_date: "2026-07-29",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 8,
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    excerpt: "अंतर्राष्ट्रीय संगठन (UN, WHO, WTO, UNESCO, IMF, World Bank, NATO, SAARC, ASEAN, IAEA) एवं उनके मुख्यालयों की संपूर्ण अद्यतन सूची, शहरवार ट्रिक्स, FAQs तथा MPPSC व UPSC परीक्षा हेतु उपयोगी प्रश्न।",
    excerptEn: "Complete updated list of major International Organizations and their Headquarters (UN, WHO, WTO, UNESCO, IMF, World Bank, NATO, SAARC, ASEAN, IAEA), city-wise memory tricks, FAQs and MCQs for MPPSC & UPSC exams.",
    seoTitle: "अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय | International Organizations and Headquarters | MPPSC & UPSC Notes",
    seoDescription: "अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय की संपूर्ण सूची। UN, WHO, WTO, UNESCO, IMF, World Bank, NATO, SAARC, ASEAN, IAEA सहित सभी महत्वपूर्ण संगठन। MPPSC, UPSC, SSC एवं अन्य प्रतियोगी परीक्षाओं के लिए उपयोगी नोट्स।",
    keywords: [
      "अंतर्राष्ट्रीय संगठन",
      "International Organizations",
      "Headquarters",
      "UN Headquarters",
      "WHO Headquarters",
      "WTO Headquarters",
      "UNESCO Headquarters",
      "IMF Headquarters",
      "World Bank Headquarters",
      "NATO Headquarters",
      "SAARC Headquarters",
      "ASEAN Headquarters",
      "IAEA Headquarters",
      "MPPSC Notes",
      "UPSC Notes",
      "International Organizations List",
      "International Organizations and Their Headquarters",
      "International Organizations PDF",
      "GK Notes",
      "Current Affairs Notes"
    ],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetUn._id },
      alt: "United Nations Headquarters New York Member State Flags International Organizations MPPSC UPSC Notes",
    },

    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "अंतर्राष्ट्रीय संगठन (International Organizations) वैश्विक स्तर पर शांति, सुरक्षा, व्यापार, स्वास्थ्य, शिक्षा, मानवाधिकार, आर्थिक विकास तथा पर्यावरण संरक्षण जैसे महत्वपूर्ण क्षेत्रों में सहयोग स्थापित करने के लिए बनाए गए हैं। विभिन्न प्रतियोगी परीक्षाओं जैसे ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "MPPSC, UPSC, SSC, Banking, Railway, CDS, CAPF",
          },
          {
            _type: "span",
            text: " तथा अन्य राज्य लोक सेवा आयोगों में इन संगठनों के मुख्यालय (Headquarters) से संबंधित प्रश्न नियमित रूप से पूछे जाते हैं। इसलिए इनका अध्ययन परीक्षा की दृष्टि से अत्यंत महत्वपूर्ण है।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "इस लेख में प्रमुख अंतर्राष्ट्रीय संगठनों एवं उनके मुख्यालय की अद्यतन सूची दी गई है, जिसे आप आसानी से याद कर सकते हैं।",
          },
        ],
      },

      /* ── 1. Main List & Table ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. प्रमुख अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय (Complete List & Table)" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetGeneva._id },
        alt: "Geneva Switzerland International Organizations Hub WHO WTO ILO Headquarters MPPSC UPSC Notes",
        caption: "जेनेवा (स्विट्जरलैंड): विश्व स्वास्थ्य संगठन (WHO), विश्व व्यापार संगठन (WTO) एवं अंतर्राष्ट्रीय श्रम संगठन (ILO) का प्रमुख केंद्र",
      },
      {
        _type: "table",
        caption: "प्रमुख अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय (International Organizations & Headquarters Table)",
        headers: ["संगठन (Organization)", "मुख्यालय (Headquarters)"],
        rows: [
          ["**संयुक्त राष्ट्र (UN)**", "न्यूयॉर्क (अमेरिका)"],
          ["**संयुक्त राष्ट्र बाल आपात कोष (UNICEF)**", "न्यूयॉर्क (अमेरिका)"],
          ["**संयुक्त राष्ट्र जनसंख्या कोष (UNFPA)**", "न्यूयॉर्क (अमेरिका)"],
          ["**संयुक्त राष्ट्र व्यापार एवं विकास सम्मेलन (UNCTAD)**", "जेनेवा (स्विट्जरलैंड)"],
          ["**विश्व स्वास्थ्य संगठन (WHO)**", "जेनेवा (स्विट्जरलैंड)"],
          ["**अंतर्राष्ट्रीय श्रम संगठन (ILO)**", "जेनेवा (स्विट्जरलैंड)"],
          ["**विश्व व्यापार संगठन (WTO)**", "जेनेवा (स्विट्जरलैंड)"],
          ["**विश्व मौसम विज्ञान संगठन (WMO)**", "जेनेवा (स्विट्जरलैंड)"],
          ["**विश्व बौद्धिक संपदा संगठन (WIPO)**", "जेनेवा (स्विट्जरलैंड)"],
          ["**अंतर्राष्ट्रीय मानकीकरण संगठन (ISO)**", "जेनेवा (स्विट्जरलैंड)"],
          ["**संयुक्त राष्ट्र शैक्षिक, वैज्ञानिक एवं सांस्कृतिक संगठन (UNESCO)**", "पेरिस (फ्रांस)"],
          ["**एमनेस्टी इंटरनेशनल (Amnesty International)**", "लंदन (यूके)"],
          ["**खाद्य एवं कृषि संगठन (FAO)**", "रोम (इटली)"],
          ["**उत्तर अटलांटिक संधि संगठन (NATO)**", "ब्रुसेल्स (बेल्जियम)"],
          ["**ट्रांसपेरेंसी इंटरनेशनल (Transparency International)**", "बर्लिन (जर्मनी)"],
          ["**दक्षिण एशियाई क्षेत्रीय सहयोग संगठन (SAARC)**", "काठमांडू (नेपाल)"],
          ["**दक्षिण-पूर्व एशियाई राष्ट्रों का संगठन (ASEAN)**", "जकार्ता (इंडोनेशिया)"],
          ["**एशिया-प्रशांत आर्थिक सहयोग (APEC)**", "सिंगापुर (सचिवालय)"],
          ["**विश्व आर्थिक मंच (WEF)**", "जेनेवा (स्विट्जरलैंड)"],
          ["**संयुक्त राष्ट्र औद्योगिक विकास संगठन (UNIDO)**", "वियना (ऑस्ट्रिया)"],
          ["**अंतर्राष्ट्रीय परमाणु ऊर्जा एजेंसी (IAEA)**", "वियना (ऑस्ट्रिया)"],
          ["**पेट्रोलियम निर्यातक देशों का संगठन (OPEC)**", "वियना (ऑस्ट्रिया)"],
          ["**अंतर्राष्ट्रीय मुद्रा कोष (IMF)**", "वॉशिंगटन डी.सी. (अमेरिका)"],
          ["**विश्व बैंक (World Bank)**", "वॉशिंगटन डी.सी. (अमेरिका)"],
          ["**अंतर्राष्ट्रीय न्यायालय (ICJ)**", "द हेग (नीदरलैंड)"],
          ["**अंतर्राष्ट्रीय कृषि विकास निधि (IFAD)**", "रोम (इटली)"]
        ]
      },

      /* ── 2. Memory Tricks ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. परीक्षा की दृष्टि से महत्वपूर्ण शहरवार ट्रिक्स (City-wise Memory Tricks)" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetIcj._id },
        alt: "Peace Palace The Hague Netherlands Headquarters of International Court of Justice ICJ MPPSC UPSC Notes",
        caption: "द हेग (नीदरलैंड): पीस पैलेस - अंतर्राष्ट्रीय न्यायालय (International Court of Justice) का ऐतिहासिक मुख्यालय",
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. न्यूयॉर्क में स्थित प्रमुख संगठन**: संयुक्त राष्ट्र (UN), UNICEF, UNFPA।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **ट्रिक**: \"UN परिवार न्यूयॉर्क में\"" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. जेनेवा में स्थित प्रमुख संगठन**: WHO, WTO, ILO, WMO, WIPO, ISO, UNCTAD, WEF।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **ट्रिक**: \"जेनेवा = स्वास्थ्य + व्यापार + श्रम + मौसम + बौद्धिक संपदा\"" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. वियना में स्थित प्रमुख संगठन**: IAEA, UNIDO, OPEC।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **ट्रिक**: \"वियना = परमाणु + उद्योग + तेल\"" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. वॉशिंगटन डी.सी. में स्थित संगठन**: IMF, World Bank।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **ट्रिक**: \"दुनिया का पैसा – वॉशिंगटन\"" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **5. रोम में स्थित संगठन**: FAO, IFAD।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **ट्रिक**: \"कृषि और भोजन = रोम\"" }],
      },

      /* ── 3. Quick Revision Notes ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. MPPSC & UPSC परीक्षा हेतु Quick Revision Points" }],
      },
      {
        _type: "facts",
        items: [
          { label: "न्यूयॉर्क मुख्यालय", value: "**UN, UNICEF, UNFPA**" },
          { label: "जेनेवा मुख्यालय", value: "**WHO, WTO, ILO, WMO, WIPO, ISO, UNCTAD, WEF**" },
          { label: "वियना मुख्यालय", value: "**IAEA, UNIDO, OPEC**" },
          { label: "वॉशिंगटन डी.सी.", value: "**IMF, World Bank** (अंतर्राष्ट्रीय वित्तीय संस्थाएँ)" },
          { label: "रोम मुख्यालय", value: "**FAO, IFAD** (खाद्य व कृषि)" },
          { label: "द हेग (नीदरलैंड)", value: "**अंतर्राष्ट्रीय न्यायालय (ICJ)**" },
          { label: "पेरिस (फ्रांस)", value: "**UNESCO**" },
          { label: "काठमांडू (नेपाल)", value: "**SAARC**" },
          { label: "जकार्ता (इंडोनेशिया)", value: "**ASEAN**" },
          { label: "ब्रुसेल्स (बेल्जियम)", value: "**NATO**" },
        ]
      },

      /* ── 4. Conclusion ── */
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. निष्कर्ष (Conclusion)" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "अंतर्राष्ट्रीय संगठनों एवं उनके मुख्यालय से संबंधित प्रश्न लगभग हर वर्ष ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "MPPSC, UPSC, SSC, Banking, Railway, CDS",
          },
          {
            _type: "span",
            text: " तथा अन्य प्रतियोगी परीक्षाओं में पूछे जाते हैं। यदि आप मुख्यालयों को शहर के अनुसार समूह बनाकर याद करते हैं—जैसे जेनेवा, न्यूयॉर्क, वियना, रोम और वॉशिंगटन डी.सी.—तो इन्हें लंबे समय तक आसानी से स्मरण रखा जा सकता है। नियमित पुनरावृत्ति और वस्तुनिष्ठ प्रश्नों का अभ्यास इस विषय में अच्छे अंक प्राप्त करने की कुंजी है।",
          },
        ],
      },
    ],

    /* ─── FAQS ─────────────────────────────────────────────── */
    faqs: [
      {
        question: "संयुक्त राष्ट्र (UN) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the United Nations (UN) headquarters located?",
        answer: "संयुक्त राष्ट्र (UN) का मुख्यालय न्यूयॉर्क (अमेरिका) में स्थित है।",
        answerEn: "The headquarters of the United Nations (UN) is located in New York, USA."
      },
      {
        question: "विश्व स्वास्थ्य संगठन (WHO) का मुख्यालय कहाँ है?",
        questionEn: "Where is the World Health Organization (WHO) headquarters located?",
        answer: "विश्व स्वास्थ्य संगठन (WHO) का मुख्यालय जेनेवा, स्विट्जरलैंड में स्थित है।",
        answerEn: "The headquarters of WHO is in Geneva, Switzerland."
      },
      {
        question: "विश्व व्यापार संगठन (WTO) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the World Trade Organization (WTO) headquarters located?",
        answer: "विश्व व्यापार संगठन (WTO) का मुख्यालय जेनेवा, स्विट्जरलैंड में स्थित है।",
        answerEn: "The headquarters of WTO is located in Geneva, Switzerland."
      },
      {
        question: "UNESCO का मुख्यालय कहाँ है?",
        questionEn: "Where is UNESCO headquarters located?",
        answer: "संयुक्त राष्ट्र शैक्षिक, वैज्ञानिक एवं सांस्कृतिक संगठन (UNESCO) का मुख्यालय पेरिस, फ्रांस में स्थित है।",
        answerEn: "The headquarters of UNESCO is in Paris, France."
      },
      {
        question: "IMF और विश्व बैंक का मुख्यालय कहाँ है?",
        questionEn: "Where are the headquarters of IMF and World Bank located?",
        answer: "अंतर्राष्ट्रीय मुद्रा कोष (IMF) तथा विश्व बैंक (World Bank) दोनों का मुख्यालय वॉशिंगटन डी.सी., अमेरिका में स्थित है।",
        answerEn: "The headquarters of both IMF and World Bank are located in Washington D.C., USA."
      },
      {
        question: "NATO का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is NATO headquarters located?",
        answer: "उत्तर अटलांटिक संधि संगठन (NATO) का मुख्यालय ब्रुसेल्स, बेल्जियम में स्थित है।",
        answerEn: "The headquarters of NATO is located in Brussels, Belgium."
      },
      {
        question: "SAARC का मुख्यालय कहाँ है?",
        questionEn: "Where is SAARC headquarters located?",
        answer: "दक्षिण एशियाई क्षेत्रीय सहयोग संगठन (SAARC) का सचिवालय/मुख्यालय काठमांडू, नेपाल में स्थित है।",
        answerEn: "The headquarters of SAARC is located in Kathmandu, Nepal."
      },
      {
        question: "ASEAN का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is ASEAN headquarters located?",
        answer: "दक्षिण-पूर्व एशियाई राष्ट्रों के संगठन (ASEAN) का मुख्यालय जकार्ता, इंडोनेशिया में स्थित है।",
        answerEn: "The headquarters of ASEAN is located in Jakarta, Indonesia."
      }
    ],

    /* ─── MCQS ─────────────────────────────────────────────── */
    mcqs: [
      {
        question: "अंतर्राष्ट्रीय न्यायालय (ICJ) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the headquarters of the International Court of Justice (ICJ) located?",
        options: ["A. द हेग (नीदरलैंड)", "B. पेरिस (फ्रांस)", "C. जेनेवा (स्विट्जरलैंड)", "D. न्यूयॉर्क (अमेरिका)"],
        optionsEn: ["A. The Hague (Netherlands)", "B. Paris (France)", "C. Geneva (Switzerland)", "D. New York (USA)"],
        correctIndex: 0,
        explanation: "अंतर्राष्ट्रीय न्यायालय (ICJ) का मुख्यालय द हेग (नीदरलैंड) के पीस पैलेस में स्थित है।",
        explanationEn: "The headquarters of ICJ is situated at the Peace Palace in The Hague, Netherlands."
      },
      {
        question: "अंतर्राष्ट्रीय परमाणु ऊर्जा एजेंसी (IAEA) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the headquarters of International Atomic Energy Agency (IAEA)?",
        options: ["A. वियना (ऑस्ट्रिया)", "B. लंदन (यूके)", "C. रोम (इटली)", "D. जेनेवा (स्विट्जरलैंड)"],
        optionsEn: ["A. Vienna (Austria)", "B. London (UK)", "C. Rome (Italy)", "D. Geneva (Switzerland)"],
        correctIndex: 0,
        explanation: "IAEA का मुख्यालय वियना (ऑस्ट्रिया) में स्थित है।",
        explanationEn: "The headquarters of IAEA is located in Vienna, Austria."
      },
      {
        question: "खाद्य एवं कृषि संगठन (FAO) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the headquarters of Food and Agriculture Organization (FAO)?",
        options: ["A. रोम (इटली)", "B. पेरिस (फ्रांस)", "C. बर्लिन (जर्मनी)", "D. वॉशिंगटन डी.सी."],
        optionsEn: ["A. Rome (Italy)", "B. Paris (France)", "C. Berlin (Germany)", "D. Washington D.C."],
        correctIndex: 0,
        explanation: "खाद्य एवं कृषि संगठन (FAO) का मुख्यालय रोम, इटली में स्थित है।",
        explanationEn: "The headquarters of FAO is located in Rome, Italy."
      },
      {
        question: "विश्व बौद्धिक संपदा संगठन (WIPO) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the World Intellectual Property Organization (WIPO) headquarters located?",
        options: ["A. जेनेवा (स्विट्जरलैंड)", "B. न्यूयॉर्क (अमेरिका)", "C. वियना (ऑस्ट्रिया)", "D. सिंगापुर"],
        optionsEn: ["A. Geneva (Switzerland)", "B. New York (USA)", "C. Vienna (Austria)", "D. Singapore"],
        correctIndex: 0,
        explanation: "WIPO का मुख्यालय जेनेवा (स्विट्जरलैंड) में स्थित है।",
        explanationEn: "The headquarters of WIPO is in Geneva, Switzerland."
      },
      {
        question: "संयुक्त राष्ट्र बाल आपात कोष (UNICEF) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is UNICEF headquarters located?",
        options: ["A. न्यूयॉर्क (अमेरिका)", "B. लंदन (यूके)", "C. ब्रुसेल्स (बेल्जियम)", "D. पेरिस (फ्रांस)"],
        optionsEn: ["A. New York (USA)", "B. London (UK)", "C. Brussels (Belgium)", "D. Paris (France)"],
        correctIndex: 0,
        explanation: "UNICEF का मुख्यालय न्यूयॉर्क, अमेरिका में स्थित है।",
        explanationEn: "UNICEF headquarters is located in New York, USA."
      },
      {
        question: "उत्तर अटलांटिक संधि संगठन (NATO) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is NATO headquarters located?",
        options: ["A. ब्रुसेल्स (बेल्जियम)", "B. वाशिंगटन डी.सी.", "C. लंदन (यूके)", "D. जेनेवा"],
        optionsEn: ["A. Brussels (Belgium)", "B. Washington D.C.", "C. London (UK)", "D. Geneva"],
        correctIndex: 0,
        explanation: "NATO का मुख्यालय ब्रुसेल्स, बेल्जियम में स्थित है।",
        explanationEn: "NATO headquarters is situated in Brussels, Belgium."
      },
      {
        question: "विश्व आर्थिक मंच (WEF) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is World Economic Forum (WEF) headquarters located?",
        options: ["A. जेनेवा / कलोजी (स्विट्जरलैंड)", "B. वियना (ऑस्ट्रिया)", "C. न्यूयॉर्क (अमेरिका)", "D. लंदन (यूके)"],
        optionsEn: ["A. Geneva / Cologny (Switzerland)", "B. Vienna (Austria)", "C. New York (USA)", "D. London (UK)"],
        correctIndex: 0,
        explanation: "विश्व आर्थिक मंच (WEF) का मुख्यालय जेनेवा (कलोजी), स्विट्जरलैंड में स्थित है।",
        explanationEn: "WEF is headquartered in Cologny/Geneva, Switzerland."
      },
      {
        question: "संयुक्त राष्ट्र शैक्षिक, वैज्ञानिक एवं सांस्कृतिक संगठन (UNESCO) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is UNESCO headquarters located?",
        options: ["A. पेरिस (फ्रांस)", "B. रोम (इटली)", "C. जेनेवा (स्विट्जरलैंड)", "D. द हेग (नीदरलैंड)"],
        optionsEn: ["A. Paris (France)", "B. Rome (Italy)", "C. Geneva (Switzerland)", "D. The Hague (Netherlands)"],
        correctIndex: 0,
        explanation: "UNESCO का मुख्यालय पेरिस (फ्रांस) में स्थित है।",
        explanationEn: "UNESCO headquarters is located in Paris, France."
      }
    ]
  };

  console.log(`📝 Creating and publishing staticGk document ID "${articleDoc._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(articleDoc);
  console.log(`🎉 SUCCESS! Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading International Organizations article:", err);
  process.exit(1);
});
