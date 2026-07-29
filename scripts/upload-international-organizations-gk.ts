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
  console.log("🚀 Uploading Complete Bilingual (Hindi & English) International Organizations Article to Sanity CMS...");

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
    title: "अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय: संपूर्ण सूची, स्थापना वर्ष, वर्तमान अध्यक्ष, रिपोर्ट व ट्रिक्स | MPPSC & UPSC Notes",
    titleEn: "International Organizations and Their Headquarters: Complete List, Establishment Year, Chiefs, Reports & Tricks | MPPSC & UPSC Notes",
    slug: { _type: "slug", current: slug },
    category: { _type: "reference", _ref: "cat-misc" }, // General Awareness Misc
    ca_date: "2026-07-29",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 12,
    tags: [
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    excerpt: "अंतर्राष्ट्रीय संगठन (UN, WHO, WTO, UNESCO, IMF, World Bank, NATO, SAARC, ASEAN, IAEA, ADB, NDB, SCO) एवं उनके मुख्यालयों, स्थापना वर्ष, वर्तमान अध्यक्ष 2026, प्रमुख रिपोर्ट तथा भारत के राष्ट्रीय संगठनों (ISRO, DRDO, RBI, SEBI, NABARD) की संपूर्ण सूची, ट्रिक्स, FAQs व MCQs। MPPSC & UPSC परीक्षा नोट्स।",
    excerptEn: "Comprehensive master guide on International Organizations & Headquarters, establishment years, current chiefs 2026, member countries, major reports (WB, IMF, WEF, UNDP), Indian organizations (ISRO, DRDO, RBI, SEBI, NABARD), memory tricks, FAQs and MCQs for MPPSC & UPSC exams.",
    seoTitle: "अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय | International Organizations & Headquarters | MPPSC & UPSC",
    seoDescription: "अंतर्राष्ट्रीय संगठन एवं उनके मुख्यालय, स्थापना वर्ष, वर्तमान अध्यक्ष 2026 व जारी रिपोर्ट की संपूर्ण सूची। UN, WHO, WTO, UNESCO, IMF, World Bank, NATO, SAARC, ASEAN, IAEA, ISRO, DRDO नोट्स। MPPSC, UPSC, SSC हेतु ट्रिक्स व MCQs।",
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
      "अंतर्राष्ट्रीय संगठन और उनके मुख्यालय pdf",
      "अंतर्राष्ट्रीय संगठन और उनके मुख्यालय और स्थापना वर्ष",
      "अंतर्राष्ट्रीय संगठन pdf",
      "भारत के प्रमुख संगठन और उनके मुख्यालय",
      "विश्व के प्रमुख संगठन और उनके अध्यक्ष 2026",
      "world ke pramukh sangathan aur unke mukhyalay",
      "pramukh sangathan aur unke mukhyalay pdf",
      "international organizations and their reports upsc",
      "international organizations and their member countries",
      "MPPSC Notes",
      "UPSC Notes",
      "GK Notes"
    ],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetUn._id },
      alt: "United Nations Headquarters New York Member State Flags International Organizations MPPSC UPSC Notes",
    },

    /* ─── HINDI BODY ─── */
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "अंतर्राष्ट्रीय संगठन (International Organizations) वैश्विक स्तर पर शांति, सुरक्षा, व्यापार, स्वास्थ्य, शिक्षा, मानवाधिकार, आर्थिक विकास तथा पर्यावरण संरक्षण जैसे महत्वपूर्ण क्षेत्रों में सहयोग स्थापित करने के लिए बनाए गए संप्रभु राज्यों या अंतर-सरकारी निकायों का समूह हैं। विभिन्न प्रतियोगी परीक्षाओं जैसे ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "MPPSC, UPSC, SSC, Banking, Railway, CDS, CAPF",
          },
          {
            _type: "span",
            text: " तथा अन्य राज्य लोक सेवा आयोगों में इन संगठनों के मुख्यालय (Headquarters), स्थापना वर्ष, वर्तमान अध्यक्ष/प्रमुख (Current Chiefs 2026), सदस्य देशों की संख्या तथा जारी की जाने वाली प्रमुख रिपोर्टों (Reports) से संबंधित प्रश्न नियमित रूप से पूछे जाते हैं।",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "इस लेख में विश्व के प्रमुख अंतर्राष्ट्रीय संगठनों एवं उनके मुख्यालयों की अद्यतन सूची, शहरवार याद रखने की आसान ट्रिक्स, अंतर्राष्ट्रीय संगठनों द्वारा जारी रिपोर्ट, भारत के प्रमुख राष्ट्रीय संगठन (ISRO, DRDO, RBI, SEBI, NABARD) तथा अभ्यास हेतु वस्तुनिष्ठ प्रश्न (MCQs) शामिल किए गए हैं। विस्तृत परीक्षा रणनीति के लिए देखें: [MPPSC 2026 पाठ्यक्रम व सम्पूर्ण परीक्षा रणनीति](/mppsc/syllabus-2026)।",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. विश्व के प्रमुख अंतर्राष्ट्रीय संगठन, मुख्यालय, स्थापना वर्ष व अध्यक्ष (अद्यतन सूची)" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetGeneva._id },
        alt: "Geneva Switzerland International Organizations Hub WHO WTO ILO Headquarters MPPSC UPSC Notes",
        caption: "जेनेवा (स्विट्जरलैंड): विश्व स्वास्थ्य संगठन (WHO), विश्व व्यापार संगठन (WTO) एवं अंतर्राष्ट्रीय श्रम संगठन (ILO) का प्रमुख केंद्र",
      },
      {
        _type: "table",
        caption: "विश्व के प्रमुख अंतर्राष्ट्रीय संगठन, मुख्यालय, स्थापना वर्ष, अध्यक्ष व कुल सदस्य",
        headers: ["संगठन", "मुख्यालय", "स्थापना वर्ष", "वर्तमान अध्यक्ष / प्रमुख", "सदस्य देश"],
        rows: [
          ["**संयुक्त राष्ट्र संघ (UN)**", "न्यूयॉर्क (अमेरिका)", "24 अक्टूबर 1945", "**एंटोनियो गुटेरेस (Antonio Guterres)**", "193"],
          ["**विश्व स्वास्थ्य संगठन (WHO)**", "जेनेवा (स्विट्जरलैंड)", "7 अप्रैल 1948", "**डॉ. टेड्रोस एडहानॉम (Tedros Adhanom)**", "194"],
          ["**विश्व व्यापार संगठन (WTO)**", "जेनेवा (स्विट्जरलैंड)", "1 जनवरी 1995", "**नगोजी ओकोंजो-इवेला (Ngozi Okonjo-Iweala)**", "164"],
          ["**अंतर्राष्ट्रीय मुद्रा कोष (IMF)**", "वॉशिंगटन डी.सी. (अमेरिका)", "27 दिसंबर 1945", "**क्रिस्टालिना जॉर्जीवा (Kristalina Georgieva)**", "190"],
          ["**विश्व बैंक (World Bank)**", "वॉशिंगटन डी.सी. (अमेरिका)", "जुलाई 1944 (ब्रेटन वुड्स)", "**अजय बंगा (Ajay Banga)**", "189"],
          ["**यूनेस्को (UNESCO)**", "पेरिस (फ्रांस)", "16 नवंबर 1945", "**ऑड्रे अज़ोले (Audrey Azoulay)**", "194"],
          ["**उत्तर अटलांटिक संधि संगठन (NATO)**", "ब्रुसेल्स (बेल्जियम)", "4 अप्रैल 1949", "**मार्क रुट्टे (Mark Rutte)**", "32"],
          ["**अंतर्राष्ट्रीय परमाणु ऊर्जा एजेंसी (IAEA)**", "वियना (ऑस्ट्रिया)", "29 जुलाई 1957", "**राफेल मारियानो ग्रॉसी (Rafael Grossi)**", "178"],
          ["**खाद्य एवं कृषि संगठन (FAO)**", "रोम (इटली)", "16 अक्टूबर 1945", "**क्यू डोंगयु (Qu Dongyu)**", "195"],
          ["**अंतर्राष्ट्रीय न्यायालय (ICJ)**", "द हेग (नीदरलैंड)", "26 जून 1945", "**नवाफ सलाम (Nawaf Salam)**", "193 (UN)"],
          ["**दक्षिण एशियाई क्षेत्रीय सहयोग संगठन (SAARC)**", "काठमांडू (नेपाल)", "8 दिसंबर 1985", "**गोलाम सरवर (Golam Sarwar)**", "8"],
          ["**दक्षिण-पूर्व एशियाई राष्ट्रों का संगठन (ASEAN)**", "जकार्ता (इंडोनेशिया)", "8 अगस्त 1967", "**काओ किम होर्न (Kao Kim Hourn)**", "10"],
          ["**अंतर्राष्ट्रीय श्रम संगठन (ILO)**", "जेनेवा (स्विट्जरलैंड)", "11 अप्रैल 1919", "**गिल्बर्ट एफ. होंगबो (Gilbert F. Houngbo)**", "187"],
          ["**पेट्रोलियम निर्यातक देशों का संगठन (OPEC)**", "वियना (ऑस्ट्रिया)", "सितंबर 1960", "**हैथम अल घैस (Haitham Al Ghais)**", "12"],
          ["**विश्व बौद्धिक संपदा संगठन (WIPO)**", "जेनेवा (स्विट्जरलैंड)", "14 जुलाई 1967", "**डैरेन टैंग (Daren Tang)**", "193"],
          ["**एशियाई विकास बैंक (ADB)**", "मनीला (फिलिपींस)", "19 दिसंबर 1966", "**मात्सुगु असाकावा (Masatsugu Asakawa)**", "68"],
          ["**न्यू डेवलपमेंट बैंक (NDB - BRICS)**", "शंघाई (चीन)", "15 जुलाई 2014", "**डिल्मा रूसेफ (Dilma Rousseff)**", "9"],
          ["**एशियन इंफ्रास्ट्रक्चर इन्वेस्टमेंट बैंक (AIIB)**", "बीजिंग (चीन)", "16 जनवरी 2016", "**जिन लिकुन (Jin Liqun)**", "109"],
          ["**शंघाई सहयोग संगठन (SCO)**", "बीजिंग (चीन)", "15 जून 2001", "**झांग मिंग (Zhang Ming)**", "10"],
          ["**अंतर्राष्ट्रीय नागरिक उड्डयन संगठन (ICAO)**", "मॉन्ट्रियल (कनाडा)", "7 दिसंबर 1944", "**जुआन कार्लोस सालाजार**", "193"],
          ["**अंतर्राष्ट्रीय समुद्री संगठन (IMO)**", "लंदन (यूके)", "17 मार्च 1948", "**आर्सेनियो डोमिंग्वेज**", "175"],
          ["**अंतर्राष्ट्रीय मानकीकरण संगठन (ISO)**", "जेनेवा (स्विट्जरलैंड)", "23 फरवरी 1947", "**डॉ. सुंग ह्वान चो**", "170"],
          ["**संयुक्त राष्ट्र पर्यावरण कार्यक्रम (UNEP)**", "नैरोबी (केन्या)", "5 जून 1972", "**इंगर एंडरसन (Inger Andersen)**", "193"],
          ["**अंतर्राष्ट्रीय सौर गठबंधन (ISA)**", "गुरुग्राम (भारत)", "30 नवंबर 2015", "**डॉ. अजय माथुर (Dr. Ajay Mathur)**", "119+"],
          ["**बिम्सटेक (BIMSTEC)**", "ढाका (बांग्लादेश)", "6 जून 1997", "**इन्द्र मणि पांडे (Indra Mani Pandey)**", "7"],
          ["**एमनेस्टी इंटरनेशनल (Amnesty International)**", "लंदन (यूके)", "जुलाई 1961", "**एग्नेस कैलागार्ड**", "150+"],
          ["**संयुक्त राष्ट्र बाल आपात कोष (UNICEF)**", "न्यूयॉर्क (अमेरिका)", "11 दिसंबर 1946", "**कैथरीन रसेल (Catherine Russell)**", "190"],
          ["**संयुक्त राष्ट्र जनसंख्या कोष (UNFPA)**", "न्यूयॉर्क (अमेरिका)", "1969", "**नतालिया कानेम (Natalia Kanem)**", "150+"],
          ["**संयुक्त राष्ट्र व्यापार एवं विकास सम्मेलन (UNCTAD)**", "जेनेवा (स्विट्जरलैंड)", "30 दिसंबर 1964", "**रेबेका ग्रिंस्पैन (Rebeca Grynspan)**", "195"],
          ["**संयुक्त राष्ट्र औद्योगिक विकास संगठन (UNIDO)**", "वियना (ऑस्ट्रिया)", "17 नवंबर 1966", "**गेर्ड मुलर (Gerd Müller)**", "172"],
          ["**विश्व मौसम विज्ञान संगठन (WMO)**", "जेनेवा (स्विट्जरलैंड)", "23 मार्च 1950", "**सेलेस्टे साउलो (Celeste Saulo)**", "193"],
          ["**विश्व आर्थिक मंच (WEF)**", "जेनेवा (कलोजी, स्विट्जरलैंड)", "जनवरी 1971", "**क्लॉस श्वाब (Klaus Schwab)**", "गैर-सरकारी"],
          ["**अंतर्राष्ट्रीय कृषि विकास निधि (IFAD)**", "रोम (इटली)", "15 दिसंबर 1977", "**अल्वारो लारियो (Alvaro Lario)**", "178"],
          ["**ट्रांसपेरेंसी इंटरनेशनल (Transparency International)**", "बर्लिन (जर्मनी)", "मई 1993", "**फ्रैंकोइस वैलेरियन**", "100+"]
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "💡 **अंतर्राष्ट्रीय संबंध एवं राजव्यवस्था नोट्स**: MPPSC मेन्स पेपर-2 हेतु अंतर्राष्ट्रीय संगठनों के वैधानिक ढाँचे व भूमिका का अध्ययन करने के लिए पढ़ें: [भारतीय राजव्यवस्था एवं अंतर्राष्ट्रीय संबंध GS-2 नोट्स](/general-awareness?subject=polity)।",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. प्रमुख अंतर्राष्ट्रीय संगठनों द्वारा जारी की जाने वाली रिपोर्ट एवं सूचकांक" }],
      },
      {
        _type: "table",
        caption: "अंतर्राष्ट्रीय संगठन एवं उनके द्वारा प्रकाशित प्रमुख रिपोर्ट्स",
        headers: ["अंतर्राष्ट्रीय संगठन", "जारी की जाने वाली प्रमुख रिपोर्ट / सूचकांक"],
        rows: [
          ["**विश्व बैंक (World Bank)**", "• विश्व विकास रिपोर्ट (World Development Report)\n• ग्लोबल इकोनॉमिक प्रॉस्पेक्ट्स (Global Economic Prospects)"],
          ["**अंतर्राष्ट्रीय मुद्रा कोष (IMF)**", "• वर्ल्ड इकोनॉमिक आउटलुक (World Economic Outlook - WEO)\n• ग्लोबल फाइनेंशियल स्टेबिलिटी रिपोर्ट (Global Financial Stability Report)"],
          ["**विश्व आर्थिक मंच (WEF)**", "• ग्लोबल जेंडर गैप इंडेक्स (Global Gender Gap Report)\n• ग्लोबल कॉम्पिटिटिवनेस रिपोर्ट (Global Competitiveness Report)\n• ग्लोबल रिस्क रिपोर्ट (Global Risks Report)\n• एनर्जी ट्रांजिशन इंडेक्स (Energy Transition Index)"],
          ["**संयुक्त राष्ट्र विकास कार्यक्रम (UNDP)**", "• मानव विकास सूचकांक (Human Development Index - HDI)\n• बहुआयामी गरीबी सूचकांक (Multidimensional Poverty Index - MPI)"],
          ["**संयुक्त राष्ट्र पर्यावरण कार्यक्रम (UNEP)**", "• एमिशन गैप रिपोर्ट (Emissions Gap Report)\n• ग्लोबल एनवायरनमेंट आउटलुक (Global Environment Outlook)"],
          ["**विश्व स्वास्थ्य संगठन (WHO)**", "• वर्ल्ड हेल्थ रिपोर्ट (World Health Report)\n• ग्लोबल ट्यूबरकुलोसिस (TB) रिपोर्ट"],
          ["**विश्व बौद्धिक संपदा संगठन (WIPO)**", "• ग्लोबल इनोवेशन इंडेक्स (Global Innovation Index - GII)"],
          ["**ट्रांसपेरेंसी इंटरनेशनल**", "• भ्रष्टाचार बोध सूचकांक (Corruption Perceptions Index - CPI)"],
          ["**रिपोर्टर्स विदाउट बॉर्डर्स (RSF)**", "• विश्व प्रेस स्वतंत्रता सूचकांक (World Press Freedom Index)"],
          ["**संयुक्त राष्ट्र सतत विकास समाधान नेटवर्क (SDSN)**", "• विश्व प्रसन्नता रिपोर्ट (World Happiness Report)"]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. भारत के प्रमुख राष्ट्रीय संगठन और उनके मुख्यालय" }],
      },
      {
        _type: "table",
        caption: "भारत के प्रमुख संगठन, मुख्यालय एवं स्थापना वर्ष",
        headers: ["भारतीय संगठन", "मुख्यालय", "स्थापना वर्ष"],
        rows: [
          ["**भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO)**", "बेंगलुरु (कर्नाटक)", "15 अगस्त 1969"],
          ["**रक्षा अनुसंधान एवं विकास संगठन (DRDO)**", "नई दिल्ली", "1958"],
          ["**भारतीय रिजर्व बैंक (RBI)**", "मुंबई (महाराष्ट्र)", "1 अप्रैल 1935 (कोलकाता ➔ मुंबई 1937)"],
          ["**भारतीय प्रतिभूति एवं विनिमय बोर्ड (SEBI)**", "मुंबई (महाराष्ट्र)", "12 अप्रैल 1988 (अधिनियम 1992)"],
          ["**राष्ट्रीय कृषि और ग्रामीण विकास बैंक (NABARD)**", "मुंबई (महाराष्ट्र)", "12 जुलाई 1982"],
          ["**भारतीय लघु उद्योग विकास बैंक (SIDBI)**", "लखनऊ (उत्तर प्रदेश)", "2 अप्रैल 1990"],
          ["**भाभा परमाणु अनुसंधान केंद्र (BARC)**", "ट्रॉम्बे, मुंबई (महाराष्ट्र)", "3 जनवरी 1954"],
          ["**वैज्ञानिक एवं औद्योगिक अनुसंधान परिषद (CSIR)**", "नई दिल्ली", "26 सितंबर 1942"],
          ["**नीति आयोग (NITI Aayog)**", "नई दिल्ली", "1 जनवरी 2015"],
          ["**भारतीय जीवन बीमा निगम (LIC)**", "मुंबई (महाराष्ट्र)", "1 सितंबर 1956"],
          ["**भारतीय बीमा विनियामक और विकास प्राधिकरण (IRDAI)**", "हैदराबाद (तेलंगाना)", "1999"],
          ["**भारतीय दूरसंचार विनियामक प्राधिकरण (TRAI)**", "नई दिल्ली", "20 फरवरी 1997"]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. शहरवार याद रखने की आसान ट्रिक्स" }],
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
        children: [{ _type: "span", text: "💡 **स्मार्ट ट्रिक**: \"UN परिवार न्यूयॉर्क में\"" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. जेनेवा में स्थित प्रमुख संगठन**: WHO, WTO, ILO, WMO, WIPO, ISO, UNCTAD, WEF।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **स्मार्ट ट्रिक**: \"जेनेवा = स्वास्थ्य (WHO) + व्यापार (WTO) + श्रम (ILO) + मौसम (WMO) + बौद्धिक संपदा (WIPO)\"" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. वियना में स्थित प्रमुख संगठन**: IAEA, UNIDO, OPEC।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **स्मार्ट ट्रिक**: \"वियना = परमाणु (IAEA) + उद्योग (UNIDO) + तेल (OPEC)\"" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. वॉशिंगटन डी.सी. में स्थित संगठन**: IMF, World Bank।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **स्मार्ट ट्रिक**: \"दुनिया का पैसा (वित्त) – वॉशिंगटन डी.सी.\"" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **5. रोम में स्थित संगठन**: FAO, IFAD।" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **स्मार्ट ट्रिक**: \"कृषि और भोजन = रोम (इटली)\"" }],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. MPPSC एवं UPSC परीक्षा हेतु त्वरित स्मरणीय बिंदु" }],
      },
      {
        _type: "facts",
        items: [
          { label: "न्यूयॉर्क मुख्यालय", value: "**UN, UNICEF, UNFPA**" },
          { label: "जेनेवा मुख्यालय", value: "**WHO, WTO, ILO, WMO, WIPO, ISO, UNCTAD, WEF**" },
          { label: "वियना मुख्यालय", value: "**IAEA, UNIDO, OPEC**" },
          { label: "वॉशिंगटन डी.सी.", value: "**IMF, World Bank** (अंतर्राष्ट्रीय वित्तीय संस्थाएँ - ब्रेटन वुड्स जुड़वाँ)" },
          { label: "रोम मुख्यालय", value: "**FAO, IFAD** (खाद्य व कृषि)" },
          { label: "द हेग (नीदरलैंड)", value: "**अंतर्राष्ट्रीय न्यायालय (ICJ)**" },
          { label: "पेरिस (फ्रांस)", value: "**UNESCO**" },
          { label: "काठमांडू (नेपाल)", value: "**SAARC**" },
          { label: "जकार्ता (इंडोनेशिया)", value: "**ASEAN**" },
          { label: "गुरुग्राम (भारत)", value: "**अंतर्राष्ट्रीय सौर गठबंधन (ISA)**" },
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
            text: "👉 [MPPSC 2026 नवीन पाठ्यक्रम, परीक्षा पैटर्न व संपूर्ण रणनीति](/mppsc/syllabus-2026)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [भारत की जनसंख्या नीति: NPP-2000, TFR 2.1 व जनसंख्या नियंत्रण के नोट्स](/general-awareness/population-policy-of-india-npp-2000-mppsc-upsc-notes)",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "👉 [आपदा प्रबंधन (संशोधन) अधिनियम 2025: UDMA धारा 41A व संपूर्ण नोट्स](/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes)",
          },
        ],
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
        style: "h3",
        children: [{ _type: "span", text: "7. निष्कर्ष" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "अंतर्राष्ट्रीय संगठनों एवं उनके मुख्यालय से संबंधित प्रश्न लगभग हर वर्ष MPPSC, UPSC, SSC, Banking, Railway, CDS तथा अन्य प्रतियोगी परीक्षाओं में पूछे जाते हैं। नियमित पुनरावृत्ति और वस्तुनिष्ठ प्रश्नों का अभ्यास इस विषय में अच्छे अंक प्राप्त करने की कुंजी है।",
          },
        ],
      },
    ],

    /* ─── ENGLISH BODY ─── */
    bodyEn: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "International Organizations are intergovernmental bodies or associations of sovereign states formed to foster global cooperation in key domains such as peace, security, international trade, public health, education, human rights, economic development, and environmental protection. Questions related to their ",
          },
          {
            _type: "span",
            marks: ["strong"],
            text: "Headquarters, Establishment Years, Current Chiefs (2026), Member Countries, and Annual Reports",
          },
          {
            _type: "span",
            text: " are frequently asked across major competitive exams including MPPSC, UPSC, SSC, Banking, Railway, CDS, and CAPF.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "This comprehensive English notes guide covers the updated master list of global international organizations, city-wise memory tricks, major annual reports published by international bodies, key national organizations of India (ISRO, DRDO, RBI, SEBI, NABARD), collapsible FAQs, and practice MCQs. For complete exam strategy, visit: [MPPSC 2026 Complete Syllabus & Strategy](/en/mppsc/syllabus-2026).",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "1. World's Major International Organizations & Headquarters (Master List 2026)" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetGeneva._id },
        alt: "Geneva Switzerland International Organizations Hub WHO WTO ILO Headquarters MPPSC UPSC Notes",
        caption: "Geneva (Switzerland): Major global hub housing WHO, WTO, and ILO Headquarters",
      },
      {
        _type: "table",
        caption: "Master Table of International Organizations, Headquarters, Formation Year, Current Chiefs & Member Countries",
        headers: ["Organization", "Headquarters", "Formation Year", "Current Head / Director (2026)", "Member Countries"],
        rows: [
          ["**United Nations (UN)**", "New York (USA)", "24 Oct 1945", "**Antonio Guterres**", "193"],
          ["**World Health Organization (WHO)**", "Geneva (Switzerland)", "7 Apr 1948", "**Dr. Tedros Adhanom**", "194"],
          ["**World Trade Organization (WTO)**", "Geneva (Switzerland)", "1 Jan 1995", "**Ngozi Okonjo-Iweala**", "164"],
          ["**International Monetary Fund (IMF)**", "Washington D.C. (USA)", "27 Dec 1945", "**Kristalina Georgieva**", "190"],
          ["**World Bank Group**", "Washington D.C. (USA)", "July 1944 (Bretton Woods)", "**Ajay Banga**", "189"],
          ["**UNESCO**", "Paris (France)", "16 Nov 1945", "**Audrey Azoulay**", "194"],
          ["**North Atlantic Treaty Organization (NATO)**", "Brussels (Belgium)", "4 Apr 1949", "**Mark Rutte**", "32"],
          ["**International Atomic Energy Agency (IAEA)**", "Vienna (Austria)", "29 July 1957", "**Rafael Mariano Grossi**", "178"],
          ["**Food and Agriculture Organization (FAO)**", "Rome (Italy)", "16 Oct 1945", "**Qu Dongyu**", "195"],
          ["**International Court of Justice (ICJ)**", "The Hague (Netherlands)", "26 June 1945", "**Nawaf Salam**", "193 (UN)"],
          ["**SAARC**", "Kathmandu (Nepal)", "8 Dec 1985", "**Golam Sarwar**", "8"],
          ["**ASEAN**", "Jakarta (Indonesia)", "8 Aug 1967", "**Kao Kim Hourn**", "10"],
          ["**International Labour Organization (ILO)**", "Geneva (Switzerland)", "11 Apr 1919", "**Gilbert F. Houngbo**", "187"],
          ["**OPEC**", "Vienna (Austria)", "Sept 1960", "**Haitham Al Ghais**", "12"],
          ["**World Intellectual Property Org (WIPO)**", "Geneva (Switzerland)", "14 July 1967", "**Daren Tang**", "193"],
          ["**Asian Development Bank (ADB)**", "Manila (Philippines)", "19 Dec 1966", "**Masatsugu Asakawa**", "68"],
          ["**New Development Bank (NDB - BRICS)**", "Shanghai (China)", "15 July 2014", "**Dilma Rousseff**", "9"],
          ["**Asian Infrastructure Investment Bank (AIIB)**", "Beijing (China)", "16 Jan 2016", "**Jin Liqun**", "109"],
          ["**Shanghai Cooperation Organisation (SCO)**", "Beijing (China)", "15 June 2001", "**Zhang Ming**", "10"],
          ["**International Civil Aviation Org (ICAO)**", "Montreal (Canada)", "7 Dec 1944", "**Juan Carlos Salazar**", "193"],
          ["**International Maritime Organization (IMO)**", "London (UK)", "17 Mar 1948", "**Arsenio Dominguez**", "175"],
          ["**International Org for Standardization (ISO)**", "Geneva (Switzerland)", "23 Feb 1947", "**Dr. Sung Hwan Cho**", "170"],
          ["**United Nations Environment Programme (UNEP)**", "Nairobi (Kenya)", "5 June 1972", "**Inger Andersen**", "193"],
          ["**International Solar Alliance (ISA)**", "Gurugram (India)", "30 Nov 2015", "**Dr. Ajay Mathur**", "119+"],
          ["**BIMSTEC**", "Dhaka (Bangladesh)", "6 June 1997", "**Indra Mani Pandey**", "7"],
          ["**Amnesty International**", "London (UK)", "July 1961", "**Agnes Callamard**", "150+"],
          ["**UNICEF**", "New York (USA)", "11 Dec 1946", "**Catherine Russell**", "190"],
          ["**UNFPA**", "New York (USA)", "1969", "**Natalia Kanem**", "150+"],
          ["**UNCTAD**", "Geneva (Switzerland)", "30 Dec 1964", "**Rebeca Grynspan**", "195"],
          ["**UNIDO**", "Vienna (Austria)", "17 Nov 1966", "**Gerd Müller**", "172"],
          ["**World Meteorological Organization (WMO)**", "Geneva (Switzerland)", "23 Mar 1950", "**Celeste Saulo**", "193"],
          ["**World Economic Forum (WEF)**", "Geneva (Cologny, Switzerland)", "Jan 1971", "**Klaus Schwab**", "NGO"],
          ["**International Fund for Agricultural Dev (IFAD)**", "Rome (Italy)", "15 Dec 1977", "**Alvaro Lario**", "178"],
          ["**Transparency International**", "Berlin (Germany)", "May 1993", "**Francois Valerian**", "100+"]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "2. Major Reports Published by International Organizations" }],
      },
      {
        _type: "table",
        caption: "International Organizations and Their Major Published Reports",
        headers: ["Organization", "Key Reports & Indexes Published"],
        rows: [
          ["**World Bank**", "• World Development Report\n• Global Economic Prospects"],
          ["**International Monetary Fund (IMF)**", "• World Economic Outlook (WEO)\n• Global Financial Stability Report"],
          ["**World Economic Forum (WEF)**", "• Global Gender Gap Report\n• Global Competitiveness Report\n• Global Risks Report\n• Energy Transition Index"],
          ["**United Nations Development Programme (UNDP)**", "• Human Development Index (HDI)\n• Multidimensional Poverty Index (MPI)"],
          ["**United Nations Environment Programme (UNEP)**", "• Emissions Gap Report\n• Global Environment Outlook"],
          ["**World Health Organization (WHO)**", "• World Health Report\n• Global Tuberculosis (TB) Report"],
          ["**World Intellectual Property Org (WIPO)**", "• Global Innovation Index (GII)"],
          ["**Transparency International**", "• Corruption Perceptions Index (CPI)"],
          ["**Reporters Without Borders (RSF)**", "• World Press Freedom Index"],
          ["**UN Sustainable Development Solutions Network (SDSN)**", "• World Happiness Report"]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "3. Major Indian Organizations & Their Headquarters" }],
      },
      {
        _type: "table",
        caption: "Key National Organizations of India, Headquarters & Formation Year",
        headers: ["Indian Organization", "Headquarters", "Formation Year"],
        rows: [
          ["**ISRO (Indian Space Research Organisation)**", "Bengaluru (Karnataka)", "15 Aug 1969"],
          ["**DRDO (Defence Research and Development Org)**", "New Delhi", "1958"],
          ["**RBI (Reserve Bank of India)**", "Mumbai (Maharashtra)", "1 Apr 1935 (Kolkata -> Mumbai 1937)"],
          ["**SEBI (Securities and Exchange Board of India)**", "Mumbai (Maharashtra)", "12 Apr 1988 (Act 1992)"],
          ["**NABARD**", "Mumbai (Maharashtra)", "12 July 1982"],
          ["**SIDBI**", "Lucknow (Uttar Pradesh)", "2 Apr 1990"],
          ["**BARC (Bhabha Atomic Research Centre)**", "Trombay, Mumbai", "3 Jan 1954"],
          ["**CSIR**", "New Delhi", "26 Sept 1942"],
          ["**NITI Aayog**", "New Delhi", "1 Jan 2015"],
          ["**LIC (Life Insurance Corporation of India)**", "Mumbai (Maharashtra)", "1 Sept 1956"],
          ["**IRDAI**", "Hyderabad (Telangana)", "1999"],
          ["**TRAI**", "New Delhi", "20 Feb 1997"]
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "4. City-wise Memory Tricks" }],
      },
      {
        _type: "image",
        asset: { _type: "reference", _ref: assetIcj._id },
        alt: "Peace Palace The Hague Netherlands Headquarters of International Court of Justice ICJ MPPSC UPSC Notes",
        caption: "The Hague (Netherlands): Peace Palace - Historic Headquarters of the International Court of Justice (ICJ)",
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **1. New York Headquarters**: United Nations (UN), UNICEF, UNFPA." }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **Memory Trick**: \"UN Family in New York\"" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **2. Geneva Headquarters**: WHO, WTO, ILO, WMO, WIPO, ISO, UNCTAD, WEF." }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **Memory Trick**: \"Geneva = Health (WHO) + Trade (WTO) + Labour (ILO) + Weather (WMO) + Intellectual Property (WIPO)\"" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **3. Vienna Headquarters**: IAEA, UNIDO, OPEC." }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **Memory Trick**: \"Vienna = Atomic Energy (IAEA) + Industrial Dev (UNIDO) + Petroleum (OPEC)\"" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **4. Washington D.C. Headquarters**: IMF, World Bank." }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **Memory Trick**: \"Global Finance / Money = Washington D.C.\"" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "• **5. Rome Headquarters**: FAO, IFAD." }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "💡 **Memory Trick**: \"Agriculture & Food = Rome (Italy)\"" }],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "5. High-Yield Revision Takeaways for MPPSC & UPSC" }],
      },
      {
        _type: "facts",
        items: [
          { label: "New York HQ", value: "**UN, UNICEF, UNFPA**" },
          { label: "Geneva HQ", value: "**WHO, WTO, ILO, WMO, WIPO, ISO, UNCTAD, WEF**" },
          { label: "Vienna HQ", value: "**IAEA, UNIDO, OPEC**" },
          { label: "Washington D.C.", value: "**IMF, World Bank** (Bretton Woods Twins)" },
          { label: "Rome HQ", value: "**FAO, IFAD** (Food & Agriculture)" },
          { label: "The Hague", value: "**International Court of Justice (ICJ)**" },
          { label: "Paris", value: "**UNESCO**" },
          { label: "Kathmandu", value: "**SAARC**" },
          { label: "Jakarta", value: "**ASEAN**" },
          { label: "Gurugram (India)", value: "**International Solar Alliance (ISA)**" },
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
            text: "👉 [Population Policy of India: NPP-2000, TFR 2.1 & Control Initiatives](/en/general-awareness/population-policy-of-india-npp-2000-mppsc-upsc-notes)",
          },
        ],
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
            text: "👉 [MPPSC 2026 Syllabus & Complete Strategy](/en/mppsc/syllabus-2026)",
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
            text: "Questions on International Organizations and their headquarters appear regularly in MPPSC, UPSC, SSC, Banking, and Railway examinations. Remembering them through city clusters (Geneva, New York, Vienna, Rome, Washington D.C.) ensures long-term retention and high accuracy in competitive exams.",
          },
        ],
      },
    ],

    /* ─── BILINGUAL FAQS ─── */
    faqs: [
      {
        question: "संयुक्त राष्ट्र (UN) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the United Nations (UN) headquarters located?",
        answer: "संयुक्त राष्ट्र (UN) का मुख्यालय न्यूयॉर्क (अमेरिका) में स्थित है। इसकी स्थापना 24 अक्टूबर 1945 को हुई थी।",
        answerEn: "The headquarters of the United Nations (UN) is located in New York, USA. It was established on October 24, 1945."
      },
      {
        question: "विश्व स्वास्थ्य संगठन (WHO) का मुख्यालय कहाँ है?",
        questionEn: "Where is the World Health Organization (WHO) headquarters located?",
        answer: "विश्व स्वास्थ्य संगठन (WHO) का मुख्यालय जेनेवा, स्विट्जरलैंड में स्थित है। इसकी स्थापना 7 अप्रैल 1948 को हुई थी।",
        answerEn: "The headquarters of WHO is located in Geneva, Switzerland. It was established on April 7, 1948."
      },
      {
        question: "विश्व व्यापार संगठन (WTO) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the World Trade Organization (WTO) headquarters located?",
        answer: "विश्व व्यापार संगठन (WTO) का मुख्यालय जेनेवा, स्विट्जरलैंड में स्थित है। इसकी स्थापना 1 जनवरी 1995 को GATT के स्थान पर हुई थी।",
        answerEn: "The headquarters of WTO is located in Geneva, Switzerland. Established on January 1, 1995."
      },
      {
        question: "UNESCO का मुख्यालय कहाँ है?",
        questionEn: "Where is UNESCO headquarters located?",
        answer: "संयुक्त राष्ट्र शैक्षिक, वैज्ञानिक एवं सांस्कृतिक संगठन (UNESCO) का मुख्यालय पेरिस, फ्रांस में स्थित है।",
        answerEn: "The headquarters of UNESCO is located in Paris, France."
      },
      {
        question: "IMF और विश्व बैंक का मुख्यालय कहाँ है और इन्हें क्या कहा जाता है?",
        questionEn: "Where are the headquarters of IMF and World Bank located?",
        answer: "अंतर्राष्ट्रीय मुद्रा कोष (IMF) तथा विश्व बैंक (World Bank) दोनों का मुख्यालय वॉशिंगटन डी.सी., अमेरिका में स्थित है। इन दोनों को 1944 के सम्मेलन के कारण 'ब्रेटन वुड्स जुड़वाँ (Bretton Woods Twins)' कहा जाता है।",
        answerEn: "The headquarters of both IMF and World Bank are located in Washington D.C., USA. They are known as the Bretton Woods Twins."
      },
      {
        question: "NATO का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is NATO headquarters located?",
        answer: "उत्तर अटलांटिक संधि संगठन (NATO) का मुख्यालय ब्रुसेल्स, बेल्जियम में स्थित है। वर्तमान में इसमें 32 सदस्य देश हैं।",
        answerEn: "The headquarters of NATO is located in Brussels, Belgium. Currently it has 32 member countries."
      },
      {
        question: "SAARC का मुख्यालय कहाँ है?",
        questionEn: "Where is SAARC headquarters located?",
        answer: "दक्षिण एशियाई क्षेत्रीय सहयोग संगठन (SAARC) का सचिवालय/मुख्यालय काठमांडू, नेपाल में स्थित है। इसकी स्थापना 8 दिसंबर 1985 को हुई थी।",
        answerEn: "The headquarters of SAARC is located in Kathmandu, Nepal. Established on December 8, 1985."
      },
      {
        question: "ASEAN का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is ASEAN headquarters located?",
        answer: "दक्षिण-पूर्व एशियाई राष्ट्रों के संगठन (ASEAN) का मुख्यालय जकार्ता, इंडोनेशिया में स्थित है।",
        answerEn: "The headquarters of ASEAN is located in Jakarta, Indonesia."
      },
      {
        question: "अंतर्राष्ट्रीय सौर गठबंधन (ISA) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is International Solar Alliance (ISA) headquarters located?",
        answer: "अंतर्राष्ट्रीय सौर गठबंधन (ISA) का मुख्यालय गुरुग्राम (हरियाणा, भारत) में स्थित है। यह भारत में स्थित पहला प्रमुख अंतर्राष्ट्रीय संगठन का मुख्यालय है।",
        answerEn: "ISA headquarters is located in Gurugram, Haryana, India. It is the first major international organization headquartered in India."
      },
      {
        question: "भारत का ISRO और DRDO का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where are ISRO and DRDO headquarters located in India?",
        answer: "ISRO का मुख्यालय बेंगलुरु (कर्नाटक) तथा DRDO का मुख्यालय नई दिल्ली में स्थित है।",
        answerEn: "ISRO headquarters is in Bengaluru, Karnataka and DRDO headquarters is in New Delhi."
      }
    ],

    /* ─── BILINGUAL MCQS ─── */
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
        question: "विश्व आर्थिक मंच (WEF) द्वारा निम्न में से कौन सी रिपोर्ट प्रकाशित की जाती है?",
        questionEn: "Which of the following reports is published by World Economic Forum (WEF)?",
        options: ["A. ग्लोबल जेंडर गैप रिपोर्ट", "B. मानव विकास सूचकांक", "C. विश्व विकास रिपोर्ट", "D. वर्ल्ड इकोनॉमिक आउटलुक"],
        optionsEn: ["A. Global Gender Gap Report", "B. Human Development Index", "C. World Development Report", "D. World Economic Outlook"],
        correctIndex: 0,
        explanation: "ग्लोबल जेंडर गैप रिपोर्ट व ग्लोबल कॉम्पिटिटिवनेस रिपोर्ट विश्व आर्थिक मंच (WEF) द्वारा जारी की जाती है।",
        explanationEn: "Global Gender Gap Report is published by the World Economic Forum (WEF)."
      },
      {
        question: "भारतीय लघु उद्योग विकास बैंक (SIDBI) का मुख्यालय कहाँ स्थित है?",
        questionEn: "Where is the headquarters of Small Industries Development Bank of India (SIDBI) located?",
        options: ["A. लखनऊ (उत्तर प्रदेश)", "B. मुंबई (महाराष्ट्र)", "C. नई दिल्ली", "D. कोलकाता"],
        optionsEn: ["A. Lucknow (Uttar Pradesh)", "B. Mumbai (Maharashtra)", "C. New Delhi", "D. Kolkata"],
        correctIndex: 0,
        explanation: "SIDBI का मुख्यालय लखनऊ (उत्तर प्रदेश) में स्थित है।",
        explanationEn: "The headquarters of SIDBI is located in Lucknow, Uttar Pradesh."
      },
      {
        question: "अंतर्राष्ट्रीय सौर गठबंधन (ISA) का मुख्यालय किस देश में स्थित है?",
        questionEn: "In which country is the headquarters of International Solar Alliance (ISA) located?",
        options: ["A. भारत (गुरुग्राम)", "B. फ्रांस (पेरिस)", "C. अमेरिका (न्यूयॉर्क)", "D. जापान (टोक्यो)"],
        optionsEn: ["A. India (Gurugram)", "B. France (Paris)", "C. USA (New York)", "D. Japan (Tokyo)"],
        correctIndex: 0,
        explanation: "ISA का मुख्यालय गुरुग्राम (हरियाणा, भारत) में स्थित है।",
        explanationEn: "ISA headquarters is located in Gurugram, Haryana, India."
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

  console.log(`📝 Syncing Fully Bilingual Article "${articleDoc._id}" to Sanity CMS...`);
  const res = await client.createOrReplace(articleDoc);
  console.log(`🎉 SUCCESS! Fully Bilingual Article uploaded & published in Sanity CMS. Document ID: ${res._id}`);
  console.log(`URL slug: ${res.slug.current}`);
}

main().catch((err) => {
  console.error("❌ Error uploading International Organizations article:", err);
  process.exit(1);
});
