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

if (!projectId || dataset === undefined || !token) {
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
  console.log("🚀 Starting upload process for G-7 Summit 2026 Article...");

  // Image file paths
  const imagePaths = {
    hero: "/Users/aakariastech/.gemini/antigravity-ide/brain/56bceb96-4540-49db-8534-3e5aee38c527/g7_summit_hero_1782817036177.png",
    bilateral: "/Users/aakariastech/.gemini/antigravity-ide/brain/56bceb96-4540-49db-8534-3e5aee38c527/g7_bilateral_diplomacy_1782817057618.png",
  };

  // 1. Upload Hero Image
  console.log("📸 Uploading hero image...");
  const asset1 = await client.assets.upload("image", fs.createReadStream(imagePaths.hero), {
    filename: "g7_summit_2026_hero.png",
  });
  console.log(`✔ Uploaded hero. Asset ID: ${asset1._id}`);

  // 2. Upload Bilateral Image
  console.log("📸 Uploading bilateral diplomacy image...");
  const asset2 = await client.assets.upload("image", fs.createReadStream(imagePaths.bilateral), {
    filename: "g7_bilateral_diplomacy.png",
  });
  console.log(`✔ Uploaded bilateral. Asset ID: ${asset2._id}`);

  // 3. Construct the Article
  const article = {
    _id: "ca-g7-summit-2026-modi-outreach-session",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "g7-summit-2026-pm-modi-outreach-session" },
    title: "जी-7 शिखर सम्मेलन 2026: संपर्क सत्र में प्रधानमंत्री मोदी की भागीदारी",
    titleEn: "G-7 Summit 2026: PM Modi's Participation in the Outreach Session",
    excerpt: "52वें जी-7 शिखर सम्मेलन के संपर्क सत्र में प्रधानमंत्री मोदी ने वैश्विक कर्ज संकट, एआई गवर्नेंस, क्रिटिकल मिनरल्स और जलवायु वित्त पर भारत का पक्ष रखा।",
    excerptEn: "At the 52nd G-7 Outreach Session in France, PM Modi raised India's concerns on global debt, AI governance, critical minerals supply chains, and climate finance.",
    ca_date: "2026-06-30",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 7,
    keywords: [
      "G-7 Summit 2026",
      "PM Modi G7",
      "Outreach Session",
      "Évian-les-Bains",
      "AI Governance",
      "Critical Minerals",
      "Climate Finance",
      "IndiaAI Mission",
      "जी-7 शिखर सम्मेलन",
      "प्रधानमंत्री मोदी",
      "UPSC Current Affairs",
      "MPPSC Current Affairs",
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // GS-2: IR & Polity
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
    ],
    syllabus: ["GS-2", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset1._id },
      alt: "G-7 Summit 2026 — PM Modi at Outreach Session in Évian-les-Bains, France",
    },

    /* ─── SECTIONS ──────────────────────────────────────────────── */
    sections: [
      /* ── 1. Why in News ──────────────────────────────────────── */
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "चर्चा में क्यों?",
        titleEn: "Why in News?",
        body: [
          {
            _key: "b1-1", _type: "block", style: "normal",
            children: [{ _key: "s1-1", _type: "span", text: "52वें जी-7 शिखर सम्मेलन के दौरान आयोजित संपर्क सत्र (Outreach Session) में भारत के प्रधानमंत्री नरेंद्र मोदी ने एक विशेष आमंत्रित अतिथि के रूप में भाग लिया।" }],
          },
          {
            _key: "b1-2", _type: "block", style: "normal",
            children: [{ _key: "s1-2", _type: "span", text: "यह सम्मेलन फ्रांस के एवियां-लेस-बैंस (Évian-les-Bains) में 15 से 17 जून 2026 तक आयोजित किया गया था।" }],
          },
          {
            _key: "b1-3", _type: "block", style: "normal",
            children: [{ _key: "s1-3", _type: "span", text: "यद्यपि भारत जी-7 का स्थायी सदस्य नहीं है, फिर भी लगातार इस मंच पर भारत को आमंत्रित किया जाना यह दर्शाता है कि वैश्विक आर्थिक स्थिरता, तकनीकी नियमन और भू-राजनीतिक संकटों के समाधान में भारत की भूमिका को दुनिया की अग्रणी अर्थव्यवस्थाएं अपरिहार्य मानती हैं।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b1-4", _type: "block", style: "normal",
            children: [{ _key: "s1-4", _type: "span", text: "Prime Minister Narendra Modi participated as a specially invited guest in the Outreach Session organized during the 52nd G-7 Summit." }],
          },
          {
            _key: "b1-5", _type: "block", style: "normal",
            children: [{ _key: "s1-5", _type: "span", text: "The summit was held at Évian-les-Bains, France, from June 15 to 17, 2026." }],
          },
          {
            _key: "b1-6", _type: "block", style: "normal",
            children: [{ _key: "s1-6", _type: "span", text: "Although India is not a permanent member of the G-7, its consistent invitation to this platform underscores that the world's leading economies consider India's role indispensable in addressing global economic stability, technology regulation, and geopolitical crises." }],
          },
        ],
      },

      /* ── 2. Background: जी-7 क्या है? ────────────────────────── */
      {
        _key: "sec-background",
        kind: "background",
        title: "जी-7 (G-7) क्या है?",
        titleEn: "What is the G-7?",
        body: [
          {
            _key: "b2-1", _type: "block", style: "normal",
            children: [{ _key: "s2-1", _type: "span", text: "• स्थापना: जी-7 (Group of Seven) की स्थापना 1975 में फ्रांस के रैम्बुइए (Rambouillet) में हुई थी। प्रारंभ में यह जी-6 था, जापान के शामिल होने के बाद 1976 में यह जी-7 बन गया।" }],
          },
          {
            _key: "b2-2", _type: "block", style: "normal",
            children: [{ _key: "s2-2", _type: "span", text: "• सदस्य देश: अमेरिका, ब्रिटेन, फ्रांस, जर्मनी, इटली, कनाडा और जापान — ये सात विकसित अर्थव्यवस्थाएं इसकी सदस्य हैं। यूरोपीय संघ (EU) भी एक अतिरिक्त प्रतिभागी के रूप में शामिल होता है।" }],
          },
          {
            _key: "b2-3", _type: "block", style: "normal",
            children: [{ _key: "s2-3", _type: "span", text: "• अध्यक्षता: जी-7 की अध्यक्षता प्रतिवर्ष एक सदस्य देश के पास बारी-बारी से आती है। 2026 में फ्रांस अध्यक्ष है।" }],
          },
          {
            _key: "b2-4", _type: "block", style: "normal",
            children: [{ _key: "s2-4", _type: "span", text: "• प्रकृति: जी-7 एक अनौपचारिक मंच है — इसका कोई स्थायी सचिवालय या कानूनी रूप से बाध्यकारी निर्णय नहीं होता, परंतु इसके बयान और प्रतिबद्धताएं वैश्विक नीतियों पर गहरा प्रभाव डालती हैं।" }],
          },
          {
            _key: "b2-5", _type: "block", style: "normal",
            children: [{ _key: "s2-5", _type: "span", text: "• संपर्क सत्र (Outreach Session): मेजबान देश कुछ गैर-सदस्य देशों और अंतरराष्ट्रीय संगठनों को शिखर सम्मेलन के एक विशेष सत्र में आमंत्रित करता है। भारत को हाल के वर्षों में लगातार इस सत्र में आमंत्रित किया जा रहा है।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b2-6", _type: "block", style: "normal",
            children: [{ _key: "s2-6", _type: "span", text: "• Establishment: The G-7 (Group of Seven) was established in 1975 at Rambouillet, France. Initially G-6, it became G-7 after Japan joined in 1976." }],
          },
          {
            _key: "b2-7", _type: "block", style: "normal",
            children: [{ _key: "s2-7", _type: "span", text: "• Member Countries: USA, UK, France, Germany, Italy, Canada, and Japan — seven advanced economies. The European Union (EU) also participates as an additional member." }],
          },
          {
            _key: "b2-8", _type: "block", style: "normal",
            children: [{ _key: "s2-8", _type: "span", text: "• Presidency: The G-7 presidency rotates annually among members. France holds the presidency in 2026." }],
          },
          {
            _key: "b2-9", _type: "block", style: "normal",
            children: [{ _key: "s2-9", _type: "span", text: "• Nature: The G-7 is an informal forum — it has no permanent secretariat or legally binding decisions, but its statements and commitments deeply influence global policies." }],
          },
          {
            _key: "b2-10", _type: "block", style: "normal",
            children: [{ _key: "s2-10", _type: "span", text: "• Outreach Session: The host country invites select non-member nations and international organizations to a special session. India has been consistently invited in recent years." }],
          },
        ],
      },

      /* ── 3. Key Highlights: मोदी के संबोधन के मुख्य बिंदु ──── */
      {
        _key: "sec-highlights",
        kind: "keyHighlights",
        title: "प्रधानमंत्री मोदी के संबोधन के मुख्य बिंदु",
        titleEn: "Key Points of PM Modi's Address",
        body: [
          {
            _key: "b3-0", _type: "block", style: "h3",
            children: [{ _key: "s3-0", _type: "span", text: "1. विकासशील देशों का कर्ज संकट" }],
          },
          {
            _key: "b3-1", _type: "block", style: "normal",
            children: [{ _key: "s3-1", _type: "span", text: "प्रधानमंत्री मोदी ने रेखांकित किया कि महामारी और हालिया भू-राजनीतिक युद्धों (जैसे अमेरिका-ईरान संघर्ष) के कारण अफ्रीका, एशिया और लैटिन अमेरिका के विकासशील देश गंभीर कर्ज संकट से जूझ रहे हैं।" }],
          },
          {
            _key: "b3-2", _type: "block", style: "normal",
            children: [{ _key: "s3-2", _type: "span", text: "उन्होंने जी-7 देशों से अंतरराष्ट्रीय वित्तीय संस्थानों (जैसे IMF और वर्ल्ड बैंक) में सुधार करने और इन देशों को रियायती शर्तों पर विकास कोष उपलब्ध कराने का आग्रह किया।" }],
          },
          {
            _key: "b3-3", _type: "block", style: "h3",
            children: [{ _key: "s3-3", _type: "span", text: "2. आर्टिफिशियल इंटेलिजेंस (AI) गवर्नेंस" }],
          },
          {
            _key: "b3-4", _type: "block", style: "normal",
            children: [{ _key: "s3-4", _type: "span", text: "एआई का उपयोग मानव कल्याण के लिए होना चाहिए, न कि समाज में विभाजन या 'डीपफेक' जैसी सुरक्षा चुनौतियां खड़ी करने के लिए।" }],
          },
          {
            _key: "b3-5", _type: "block", style: "normal",
            children: [{ _key: "s3-5", _type: "span", text: "भारत के 'IndiaAI मिशन' का उदाहरण देते हुए एक वैश्विक, समावेशी और लोकतांत्रिक एआई गवर्नेंस ढांचा बनाने पर जोर दिया।" }],
          },
          {
            _key: "b3-6", _type: "block", style: "h3",
            children: [{ _key: "s3-6", _type: "span", text: "3. क्रिटिकल मिनरल्स और सेमीकंडक्टर आपूर्ति श्रृंखला" }],
          },
          {
            _key: "b3-7", _type: "block", style: "normal",
            children: [{ _key: "s3-7", _type: "span", text: "उन्होंने क्रिटिकल मिनरल्स (जैसे लिथियम, कोबाल्ट) और सेमीकंडक्टर की आपूर्ति श्रृंखला को किसी एक देश के एकाधिकार से मुक्त करने की वकालत की।" }],
          },
          {
            _key: "b3-8", _type: "block", style: "normal",
            children: [{ _key: "s3-8", _type: "span", text: "उन्होंने भारत की हाल ही में यूके के साथ शुरू की गई 'क्रिटिकल मिनरल्स ऑब्जर्वेटरी' (GSCO) जैसी पहलों का जिक्र करते हुए एक पारदर्शी और सुरक्षित वैश्विक व्यवस्था का समर्थन किया।" }],
          },
          {
            _key: "b3-9", _type: "block", style: "h3",
            children: [{ _key: "s3-9", _type: "span", text: "4. जलवायु वित्त (Climate Finance)" }],
          },
          {
            _key: "b3-10", _type: "block", style: "normal",
            children: [{ _key: "s3-10", _type: "span", text: "विकसित देशों को याद दिलाया कि वे विकासशील देशों को स्वच्छ ऊर्जा अपनाने के लिए प्रतिवर्ष $100 बिलियन से अधिक की वित्तीय सहायता देने के अपने वादे को जल्द से जल्द पूरा करें।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b3-11", _type: "block", style: "h3",
            children: [{ _key: "s3-11", _type: "span", text: "1. Debt Crisis of Developing Nations" }],
          },
          {
            _key: "b3-12", _type: "block", style: "normal",
            children: [{ _key: "s3-12", _type: "span", text: "PM Modi highlighted that developing countries across Africa, Asia, and Latin America are grappling with severe debt crises due to the pandemic and recent geopolitical conflicts (such as the US-Iran conflict)." }],
          },
          {
            _key: "b3-13", _type: "block", style: "normal",
            children: [{ _key: "s3-13", _type: "span", text: "He urged G-7 nations to reform international financial institutions (like the IMF and World Bank) and provide concessional development funds to these countries." }],
          },
          {
            _key: "b3-14", _type: "block", style: "h3",
            children: [{ _key: "s3-14", _type: "span", text: "2. AI Governance" }],
          },
          {
            _key: "b3-15", _type: "block", style: "normal",
            children: [{ _key: "s3-15", _type: "span", text: "AI should be used for human welfare, not for creating societal divisions or security threats like deepfakes." }],
          },
          {
            _key: "b3-16", _type: "block", style: "normal",
            children: [{ _key: "s3-16", _type: "span", text: "Citing India's 'IndiaAI Mission', he stressed the need for a global, inclusive, and democratic AI governance framework." }],
          },
          {
            _key: "b3-17", _type: "block", style: "h3",
            children: [{ _key: "s3-17", _type: "span", text: "3. Critical Minerals & Semiconductor Supply Chain" }],
          },
          {
            _key: "b3-18", _type: "block", style: "normal",
            children: [{ _key: "s3-18", _type: "span", text: "He advocated for freeing the supply chain of critical minerals (lithium, cobalt) and semiconductors from any single country's monopoly." }],
          },
          {
            _key: "b3-19", _type: "block", style: "normal",
            children: [{ _key: "s3-19", _type: "span", text: "He mentioned India's recently launched 'Critical Minerals Observatory' (GSCO) initiative with the UK, supporting a transparent and secure global system." }],
          },
          {
            _key: "b3-20", _type: "block", style: "h3",
            children: [{ _key: "s3-20", _type: "span", text: "4. Climate Finance" }],
          },
          {
            _key: "b3-21", _type: "block", style: "normal",
            children: [{ _key: "s3-21", _type: "span", text: "He reminded developed nations to fulfill their pledge of providing over $100 billion annually in financial assistance to developing countries for adopting clean energy." }],
          },
        ],
      },

      /* ── 4. Importance: भारत के लिए जी-7 का महत्व ──────────── */
      {
        _key: "sec-importance",
        kind: "importance",
        title: "भारत के लिए जी-7 संपर्क सत्र का महत्व",
        titleEn: "Significance of G-7 Outreach for India",
        body: [
          {
            _key: "b4-1", _type: "block", style: "normal",
            children: [{ _key: "s4-1", _type: "span", text: "• वैश्विक एजेंडा निर्धारण में भागीदारी: जी-7 जैसे शक्तिशाली मंचों पर उपस्थिति भारत को वैश्विक नियम-निर्माण प्रक्रिया में अपनी बात रखने और विकासशील देशों के हितों की पैरवी करने का अवसर प्रदान करती है।" }],
          },
          {
            _key: "b4-2", _type: "block", style: "normal",
            children: [{ _key: "s4-2", _type: "span", text: "• बहुपक्षवाद को मजबूती: भारत ने हमेशा संयुक्त राष्ट्र और बहुपक्षीय संस्थाओं में सुधार की मांग की है। जी-7 मंच पर यह बात दोहराना भारत की बहुपक्षवादी साख को मजबूत करता है।" }],
          },
          {
            _key: "b4-3", _type: "block", style: "normal",
            children: [{ _key: "s4-3", _type: "span", text: "• तकनीकी साझेदारियां: एआई, सेमीकंडक्टर और क्रिटिकल मिनरल्स पर जी-7 देशों के साथ सीधी चर्चा भारत के 'मेक इन इंडिया' और 'आत्मनिर्भर भारत' मिशन को तकनीकी हस्तांतरण और निवेश के माध्यम से गति प्रदान करती है।" }],
          },
          {
            _key: "b4-4", _type: "block", style: "normal",
            children: [{ _key: "s4-4", _type: "span", text: "• जलवायु वित्त में दबाव: विकसित देशों से $100 बिलियन जलवायु वित्त की मांग करना भारत को ग्लोबल साउथ (Global South) के प्रवक्ता के रूप में स्थापित करता है।" }],
          },
          {
            _key: "b4-5", _type: "block", style: "normal",
            children: [{ _key: "s4-5", _type: "span", text: "• द्विपक्षीय कूटनीति का अवसर: शिखर सम्मेलन के इतर होने वाली द्विपक्षीय बैठकें रक्षा, व्यापार और ऊर्जा समझौतों को तेजी से आगे बढ़ाने का माध्यम बनती हैं।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b4-6", _type: "block", style: "normal",
            children: [{ _key: "s4-6", _type: "span", text: "• Participation in Global Agenda-Setting: Presence at powerful forums like the G-7 allows India to voice its stance in global rule-making and advocate for developing countries' interests." }],
          },
          {
            _key: "b4-7", _type: "block", style: "normal",
            children: [{ _key: "s4-7", _type: "span", text: "• Strengthening Multilateralism: India has consistently demanded reforms in UN and multilateral institutions. Reiterating this at the G-7 strengthens India's multilateral credentials." }],
          },
          {
            _key: "b4-8", _type: "block", style: "normal",
            children: [{ _key: "s4-8", _type: "span", text: "• Technology Partnerships: Direct discussions on AI, semiconductors, and critical minerals with G-7 nations accelerate India's 'Make in India' and 'Atmanirbhar Bharat' missions through tech transfer and investment." }],
          },
          {
            _key: "b4-9", _type: "block", style: "normal",
            children: [{ _key: "s4-9", _type: "span", text: "• Climate Finance Pressure: Demanding $100 billion in climate finance from developed nations establishes India as a spokesperson for the Global South." }],
          },
          {
            _key: "b4-10", _type: "block", style: "normal",
            children: [{ _key: "s4-10", _type: "span", text: "• Bilateral Diplomacy: Sidebar bilateral meetings at the summit provide opportunities to fast-track defense, trade, and energy agreements." }],
          },
        ],
      },

      /* ── 5. Bilateral Meetings: द्विपक्षीय बैठकें ─────────── */
      {
        _key: "sec-bilateral",
        kind: "internationalPerspective",
        title: "द्विपक्षीय बैठकें",
        titleEn: "Bilateral Meetings",
        body: [
          {
            _key: "b5-1", _type: "block", style: "normal",
            children: [{ _key: "s5-1", _type: "span", text: "शिखर सम्मेलन के इतर प्रधानमंत्री मोदी ने दुनिया के कई प्रमुख नेताओं के साथ द्विपक्षीय और अनौपचारिक बैठकें कीं:" }],
          },
          // Inline image
          {
            _key: "b5-img", _type: "image",
            asset: { _type: "reference", _ref: asset2._id },
            alt: "Bilateral diplomatic meetings at G-7 Summit 2026",
          },
          {
            _key: "b5-2", _type: "block", style: "normal",
            children: [{ _key: "s5-2", _type: "span", text: "• फ्रांस (मेजबान देश): फ्रांसीसी राष्ट्रपति इमैनुएल मैक्रों के साथ बैठक में हिंद-प्रशांत क्षेत्र में रक्षा सहयोग, राफेल-एम सौदे की प्रगति और अंतरिक्ष कूटनीति पर चर्चा हुई।" }],
          },
          {
            _key: "b5-3", _type: "block", style: "normal",
            children: [{ _key: "s5-3", _type: "span", text: "• अमेरिकी राष्ट्रपति: हाल ही में समाप्त हुए अमेरिका-ईरान युद्ध के बाद वैश्विक तेल बाजार को स्थिर करने और भारत-अमेरिका व्यापार समझौतों को गति देने पर बातचीत।" }],
          },
          {
            _key: "b5-4", _type: "block", style: "normal",
            children: [{ _key: "s5-4", _type: "span", text: "• ब्रिटेन के प्रधानमंत्री: भारत-यूके मुक्त व्यापार समझौते (FTA) की प्रगति और 'क्रिटिकल मिनरल्स ऑब्जर्वेटरी' (GSCO) पर सहयोग को और आगे बढ़ाने पर चर्चा।" }],
          },
          {
            _key: "b5-5", _type: "block", style: "normal",
            children: [{ _key: "s5-5", _type: "span", text: "• यूरोपीय संघ के प्रमुख: भारत-EU व्यापार वार्ता और डिजिटल साझेदारी पर बातचीत।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b5-6", _type: "block", style: "normal",
            children: [{ _key: "s5-6", _type: "span", text: "On the sidelines of the summit, PM Modi held bilateral and informal meetings with several world leaders:" }],
          },
          {
            _key: "b5-img-en", _type: "image",
            asset: { _type: "reference", _ref: asset2._id },
            alt: "Bilateral diplomatic meetings at G-7 Summit 2026",
          },
          {
            _key: "b5-7", _type: "block", style: "normal",
            children: [{ _key: "s5-7", _type: "span", text: "• France (Host Country): Meeting with President Macron discussed Indo-Pacific defense cooperation, Rafale-M deal progress, and space diplomacy." }],
          },
          {
            _key: "b5-8", _type: "block", style: "normal",
            children: [{ _key: "s5-8", _type: "span", text: "• US President: Discussions on stabilizing global oil markets after the US-Iran conflict and accelerating India-US trade agreements." }],
          },
          {
            _key: "b5-9", _type: "block", style: "normal",
            children: [{ _key: "s5-9", _type: "span", text: "• UK Prime Minister: Progress on India-UK FTA and advancing the Critical Minerals Observatory (GSCO) partnership." }],
          },
          {
            _key: "b5-10", _type: "block", style: "normal",
            children: [{ _key: "s5-10", _type: "span", text: "• EU Leaders: Discussions on India-EU trade negotiations and digital partnerships." }],
          },
        ],
      },

      /* ── 6. Government Initiatives ──────────────────────────── */
      {
        _key: "sec-initiatives",
        kind: "governmentInitiatives",
        title: "भारत की प्रमुख संबंधित पहलें",
        titleEn: "India's Key Related Initiatives",
        body: [
          {
            _key: "b6-1", _type: "block", style: "normal",
            children: [{ _key: "s6-1", _type: "span", text: "• IndiaAI मिशन (2024): ₹10,000 करोड़ से अधिक के बजट के साथ एआई अनुसंधान, कंप्यूट इंफ्रास्ट्रक्चर और स्टार्ट-अप्स को बढ़ावा देने वाला राष्ट्रीय मिशन।" }],
          },
          {
            _key: "b6-2", _type: "block", style: "normal",
            children: [{ _key: "s6-2", _type: "span", text: "• भारत सेमीकंडक्टर मिशन (ISM): ₹76,000 करोड़ के प्रोत्साहन के साथ देश में चिप विनिर्माण इकाइयां स्थापित करने का लक्ष्य।" }],
          },
          {
            _key: "b6-3", _type: "block", style: "normal",
            children: [{ _key: "s6-3", _type: "span", text: "• क्रिटिकल मिनरल्स ऑब्जर्वेटरी (GSCO): भारत और यूके की संयुक्त पहल — खनिजों की वैश्विक आपूर्ति श्रृंखला को पारदर्शी और सुरक्षित बनाने हेतु।" }],
          },
          {
            _key: "b6-4", _type: "block", style: "normal",
            children: [{ _key: "s6-4", _type: "span", text: "• अंतरराष्ट्रीय सौर गठबंधन (ISA): 2015 में भारत और फ्रांस द्वारा शुरू किया गया — सौर ऊर्जा को वैश्विक स्तर पर बढ़ावा देने का मंच।" }],
          },
          {
            _key: "b6-5", _type: "block", style: "normal",
            children: [{ _key: "s6-5", _type: "span", text: "• राष्ट्रीय हरित हाइड्रोजन मिशन: ₹19,744 करोड़ का मिशन — 2030 तक 5 मिलियन टन ग्रीन हाइड्रोजन उत्पादन का लक्ष्य।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b6-6", _type: "block", style: "normal",
            children: [{ _key: "s6-6", _type: "span", text: "• IndiaAI Mission (2024): National mission with over ₹10,000 crore budget to promote AI research, compute infrastructure, and startups." }],
          },
          {
            _key: "b6-7", _type: "block", style: "normal",
            children: [{ _key: "s6-7", _type: "span", text: "• India Semiconductor Mission (ISM): ₹76,000 crore incentive to establish chip fabrication units in India." }],
          },
          {
            _key: "b6-8", _type: "block", style: "normal",
            children: [{ _key: "s6-8", _type: "span", text: "• Critical Minerals Observatory (GSCO): India-UK joint initiative to make global mineral supply chains transparent and secure." }],
          },
          {
            _key: "b6-9", _type: "block", style: "normal",
            children: [{ _key: "s6-9", _type: "span", text: "• International Solar Alliance (ISA): Launched in 2015 by India and France — a platform to promote solar energy globally." }],
          },
          {
            _key: "b6-10", _type: "block", style: "normal",
            children: [{ _key: "s6-10", _type: "span", text: "• National Green Hydrogen Mission: ₹19,744 crore mission targeting 5 million tonnes of green hydrogen production by 2030." }],
          },
        ],
      },

      /* ── 7. Prelims Points ──────────────────────────────────── */
      {
        _key: "sec-prelims",
        kind: "prelimsPoint",
        title: "प्रारंभिक परीक्षा हेतु महत्वपूर्ण तथ्य",
        titleEn: "Key Facts for Prelims",
        body: [
          {
            _key: "b7-1", _type: "block", style: "normal",
            children: [{ _key: "s7-1", _type: "span", text: "• जी-7 की स्थापना: 1975 (रैम्बुइए, फ्रांस)" }],
          },
          {
            _key: "b7-2", _type: "block", style: "normal",
            children: [{ _key: "s7-2", _type: "span", text: "• सदस्य: अमेरिका, ब्रिटेन, फ्रांस, जर्मनी, इटली, कनाडा, जापान (+ EU)" }],
          },
          {
            _key: "b7-3", _type: "block", style: "normal",
            children: [{ _key: "s7-3", _type: "span", text: "• 2026 अध्यक्षता: फ्रांस" }],
          },
          {
            _key: "b7-4", _type: "block", style: "normal",
            children: [{ _key: "s7-4", _type: "span", text: "• 52वां शिखर सम्मेलन स्थान: एवियां-लेस-बैंस (Évian-les-Bains), फ्रांस" }],
          },
          {
            _key: "b7-5", _type: "block", style: "normal",
            children: [{ _key: "s7-5", _type: "span", text: "• भारत जी-7 का सदस्य नहीं है, लेकिन संपर्क सत्र (Outreach Session) में आमंत्रित होता है।" }],
          },
          {
            _key: "b7-6", _type: "block", style: "normal",
            children: [{ _key: "s7-6", _type: "span", text: "• ISA (International Solar Alliance) — 2015 में भारत और फ्रांस द्वारा स्थापित" }],
          },
          {
            _key: "b7-7", _type: "block", style: "normal",
            children: [{ _key: "s7-7", _type: "span", text: "• GSCO: क्रिटिकल मिनरल्स ऑब्जर्वेटरी — भारत-यूके संयुक्त पहल" }],
          },
        ],
        bodyEn: [
          {
            _key: "b7-8", _type: "block", style: "normal",
            children: [{ _key: "s7-8", _type: "span", text: "• G-7 Established: 1975 (Rambouillet, France)" }],
          },
          {
            _key: "b7-9", _type: "block", style: "normal",
            children: [{ _key: "s7-9", _type: "span", text: "• Members: USA, UK, France, Germany, Italy, Canada, Japan (+ EU)" }],
          },
          {
            _key: "b7-10", _type: "block", style: "normal",
            children: [{ _key: "s7-10", _type: "span", text: "• 2026 Presidency: France" }],
          },
          {
            _key: "b7-11", _type: "block", style: "normal",
            children: [{ _key: "s7-11", _type: "span", text: "• 52nd Summit Location: Évian-les-Bains, France" }],
          },
          {
            _key: "b7-12", _type: "block", style: "normal",
            children: [{ _key: "s7-12", _type: "span", text: "• India is not a G-7 member but is invited to the Outreach Session." }],
          },
          {
            _key: "b7-13", _type: "block", style: "normal",
            children: [{ _key: "s7-13", _type: "span", text: "• ISA (International Solar Alliance) — established 2015 by India & France" }],
          },
          {
            _key: "b7-14", _type: "block", style: "normal",
            children: [{ _key: "s7-14", _type: "span", text: "• GSCO: Critical Minerals Observatory — India-UK joint initiative" }],
          },
        ],
      },

      /* ── 8. Mains Points ───────────────────────────────────── */
      {
        _key: "sec-mains",
        kind: "mainsPoint",
        title: "मुख्य परीक्षा हेतु विश्लेषणात्मक बिंदु",
        titleEn: "Analytical Points for Mains",
        body: [
          {
            _key: "b8-1", _type: "block", style: "normal",
            children: [{ _key: "s8-1", _type: "span", text: "• जी-7 जैसे अनौपचारिक मंच वैश्विक शासन (Global Governance) में किस प्रकार नियम-निर्माण को प्रभावित करते हैं?" }],
          },
          {
            _key: "b8-2", _type: "block", style: "normal",
            children: [{ _key: "s8-2", _type: "span", text: "• भारत को जी-7 की स्थायी सदस्यता मिलनी चाहिए या नहीं — इस पर विभिन्न दृष्टिकोणों का विश्लेषण।" }],
          },
          {
            _key: "b8-3", _type: "block", style: "normal",
            children: [{ _key: "s8-3", _type: "span", text: "• एआई गवर्नेंस में ग्लोबल नॉर्थ बनाम ग्लोबल साउथ का दृष्टिकोण — भारत 'समावेशी एआई' की अवधारणा से किस प्रकार विश्व को मार्गदर्शन कर सकता है?" }],
          },
          {
            _key: "b8-4", _type: "block", style: "normal",
            children: [{ _key: "s8-4", _type: "span", text: "• क्रिटिकल मिनरल्स की भू-राजनीति (Geopolitics of Critical Minerals) — चीन की एकाधिकारी स्थिति और भारत की चुनौतियां।" }],
          },
          {
            _key: "b8-5", _type: "block", style: "normal",
            children: [{ _key: "s8-5", _type: "span", text: "• $100 बिलियन जलवायु वित्त प्रतिबद्धता की विफलता — विकसित देशों की जिम्मेदारी और CBDR-RC सिद्धांत।" }],
          },
        ],
        bodyEn: [
          {
            _key: "b8-6", _type: "block", style: "normal",
            children: [{ _key: "s8-6", _type: "span", text: "• How do informal forums like the G-7 influence rule-making in global governance?" }],
          },
          {
            _key: "b8-7", _type: "block", style: "normal",
            children: [{ _key: "s8-7", _type: "span", text: "• Should India be given permanent G-7 membership? Analyze different perspectives." }],
          },
          {
            _key: "b8-8", _type: "block", style: "normal",
            children: [{ _key: "s8-8", _type: "span", text: "• Global North vs. Global South perspectives on AI Governance — how can India guide the world with the concept of 'inclusive AI'?" }],
          },
          {
            _key: "b8-9", _type: "block", style: "normal",
            children: [{ _key: "s8-9", _type: "span", text: "• Geopolitics of Critical Minerals — China's monopolistic position and India's challenges." }],
          },
          {
            _key: "b8-10", _type: "block", style: "normal",
            children: [{ _key: "s8-10", _type: "span", text: "• Failure of the $100 billion climate finance commitment — developed nations' responsibility and the CBDR-RC principle." }],
          },
        ],
      },

      /* ── 9. Practice Questions ─────────────────────────────── */
      {
        _key: "sec-practice",
        kind: "practiceQuestions",
        title: "अभ्यास प्रश्न",
        titleEn: "Practice Questions",
        body: [
          {
            _key: "b9-1", _type: "block", style: "h3",
            children: [{ _key: "s9-1", _type: "span", text: "प्रारंभिक परीक्षा अभ्यास प्रश्न" }],
          },
          {
            _key: "b9-2", _type: "block", style: "normal",
            children: [{ _key: "s9-2", _type: "span", text: "1. जी-7 के संदर्भ में निम्नलिखित कथनों पर विचार कीजिए:" }],
          },
          {
            _key: "b9-3", _type: "block", style: "normal",
            children: [{ _key: "s9-3", _type: "span", text: "(i) जी-7 एक औपचारिक अंतरराष्ट्रीय संगठन है जिसका स्थायी सचिवालय है।" }],
          },
          {
            _key: "b9-4", _type: "block", style: "normal",
            children: [{ _key: "s9-4", _type: "span", text: "(ii) भारत जी-7 का स्थायी सदस्य है।" }],
          },
          {
            _key: "b9-5", _type: "block", style: "normal",
            children: [{ _key: "s9-5", _type: "span", text: "(iii) 2026 में जी-7 की अध्यक्षता फ्रांस के पास है।" }],
          },
          {
            _key: "b9-6", _type: "block", style: "normal",
            children: [{ _key: "s9-6", _type: "span", text: "उपर्युक्त कथनों में से कौन-सा/से सही है/हैं? (a) केवल (iii) (b) (i) और (iii) (c) (ii) और (iii) (d) (i), (ii) और (iii)" }],
          },
          {
            _key: "b9-7", _type: "block", style: "normal",
            children: [{ _key: "s9-7", _type: "span", text: "उत्तर: (a) केवल (iii) — जी-7 अनौपचारिक मंच है (कोई सचिवालय नहीं) और भारत इसका स्थायी सदस्य नहीं है।" }],
          },
          {
            _key: "b9-8", _type: "block", style: "h3",
            children: [{ _key: "s9-8", _type: "span", text: "मुख्य परीक्षा अभ्यास प्रश्न" }],
          },
          {
            _key: "b9-9", _type: "block", style: "normal",
            children: [{ _key: "s9-9", _type: "span", text: "\"जी-7 जैसे अनौपचारिक बहुपक्षीय मंचों में भारत की बढ़ती उपस्थिति वैश्विक शासन व्यवस्था में भारत की भूमिका को दर्शाती है।\" इस कथन के आलोक में जी-7 संपर्क सत्र में भारत की भागीदारी के महत्व और चुनौतियों का विश्लेषण कीजिए। (250 शब्द)" }],
          },
        ],
        bodyEn: [
          {
            _key: "b9-10", _type: "block", style: "h3",
            children: [{ _key: "s9-10", _type: "span", text: "Prelims Practice Question" }],
          },
          {
            _key: "b9-11", _type: "block", style: "normal",
            children: [{ _key: "s9-11", _type: "span", text: "1. Consider the following statements regarding the G-7:" }],
          },
          {
            _key: "b9-12", _type: "block", style: "normal",
            children: [{ _key: "s9-12", _type: "span", text: "(i) G-7 is a formal international organization with a permanent secretariat." }],
          },
          {
            _key: "b9-13", _type: "block", style: "normal",
            children: [{ _key: "s9-13", _type: "span", text: "(ii) India is a permanent member of the G-7." }],
          },
          {
            _key: "b9-14", _type: "block", style: "normal",
            children: [{ _key: "s9-14", _type: "span", text: "(iii) France holds the G-7 presidency in 2026." }],
          },
          {
            _key: "b9-15", _type: "block", style: "normal",
            children: [{ _key: "s9-15", _type: "span", text: "Which of the above statements is/are correct? (a) Only (iii) (b) (i) and (iii) (c) (ii) and (iii) (d) (i), (ii), and (iii)" }],
          },
          {
            _key: "b9-16", _type: "block", style: "normal",
            children: [{ _key: "s9-16", _type: "span", text: "Answer: (a) Only (iii) — G-7 is an informal forum (no secretariat) and India is not a permanent member." }],
          },
          {
            _key: "b9-17", _type: "block", style: "h3",
            children: [{ _key: "s9-17", _type: "span", text: "Mains Practice Question" }],
          },
          {
            _key: "b9-18", _type: "block", style: "normal",
            children: [{ _key: "s9-18", _type: "span", text: "\"India's growing presence in informal multilateral forums like the G-7 reflects its role in global governance.\" In light of this statement, analyze the significance and challenges of India's participation in the G-7 Outreach Session. (250 words)" }],
          },
        ],
      },
    ],

    /* ─── MCQs ──────────────────────────────────────────────── */
    mcqs: [
      {
        question: "जी-7 (G-7) की स्थापना कब हुई थी?",
        questionEn: "When was the G-7 established?",
        options: ["1970", "1975", "1980", "1985"],
        optionsEn: ["1970", "1975", "1980", "1985"],
        correctIndex: 1,
      },
      {
        question: "2026 में जी-7 की अध्यक्षता किस देश के पास है?",
        questionEn: "Which country holds the G-7 presidency in 2026?",
        options: ["जर्मनी", "इटली", "फ्रांस", "कनाडा"],
        optionsEn: ["Germany", "Italy", "France", "Canada"],
        correctIndex: 2,
      },
      {
        question: "52वें जी-7 शिखर सम्मेलन 2026 का आयोजन स्थल कौन-सा था?",
        questionEn: "Where was the 52nd G-7 Summit 2026 held?",
        options: ["पेरिस, फ्रांस", "एवियां-लेस-बैंस, फ्रांस", "लंदन, यूके", "रोम, इटली"],
        optionsEn: ["Paris, France", "Évian-les-Bains, France", "London, UK", "Rome, Italy"],
        correctIndex: 1,
      },
      {
        question: "अंतरराष्ट्रीय सौर गठबंधन (ISA) की शुरुआत किन दो देशों ने की?",
        questionEn: "Which two countries launched the International Solar Alliance (ISA)?",
        options: ["भारत और अमेरिका", "भारत और फ्रांस", "भारत और जापान", "भारत और जर्मनी"],
        optionsEn: ["India and USA", "India and France", "India and Japan", "India and Germany"],
        correctIndex: 1,
      },
      {
        question: "'क्रिटिकल मिनरल्स ऑब्जर्वेटरी' (GSCO) किन दो देशों की संयुक्त पहल है?",
        questionEn: "The 'Critical Minerals Observatory' (GSCO) is a joint initiative of which two countries?",
        options: ["भारत और अमेरिका", "भारत और जापान", "भारत और यूके", "भारत और ऑस्ट्रेलिया"],
        optionsEn: ["India and USA", "India and Japan", "India and UK", "India and Australia"],
        correctIndex: 2,
      },
    ],

    /* ─── FAQs ──────────────────────────────────────────────── */
    faqs: [
      {
        question: "जी-7 क्या है और इसके सदस्य कौन हैं?",
        questionEn: "What is the G-7 and who are its members?",
        answer: "जी-7 (Group of Seven) विश्व की सात सबसे बड़ी उन्नत अर्थव्यवस्थाओं — अमेरिका, ब्रिटेन, फ्रांस, जर्मनी, इटली, कनाडा और जापान — का एक अनौपचारिक मंच है। इसकी स्थापना 1975 में हुई थी।",
        answerEn: "G-7 (Group of Seven) is an informal forum of the world's seven largest advanced economies — USA, UK, France, Germany, Italy, Canada, and Japan. It was established in 1975.",
      },
      {
        question: "भारत जी-7 का सदस्य क्यों नहीं है?",
        questionEn: "Why is India not a member of the G-7?",
        answer: "जी-7 विकसित अर्थव्यवस्थाओं का समूह है। भारत अभी विकासशील अर्थव्यवस्था की श्रेणी में है। हालांकि, भारत को लगातार संपर्क सत्र (Outreach Session) में आमंत्रित किया जाता है, जो इसके बढ़ते वैश्विक महत्व को दर्शाता है।",
        answerEn: "G-7 is a grouping of advanced developed economies. India is still classified as a developing economy. However, India is consistently invited to the Outreach Session, reflecting its growing global importance.",
      },
      {
        question: "IndiaAI मिशन क्या है?",
        questionEn: "What is the IndiaAI Mission?",
        answer: "IndiaAI मिशन भारत सरकार द्वारा 2024 में शुरू किया गया ₹10,000 करोड़+ का राष्ट्रीय एआई कार्यक्रम है। इसका उद्देश्य एआई अनुसंधान, कंप्यूट इंफ्रास्ट्रक्चर, डेटासेट्स और स्टार्ट-अप्स को बढ़ावा देना है।",
        answerEn: "IndiaAI Mission is a national AI program worth ₹10,000 crore+ launched by the Indian government in 2024. It aims to boost AI research, compute infrastructure, datasets, and startups.",
      },
    ],

    /* ─── Sources ────────────────────────────────────────────── */
    sources: [
      { label: "Ministry of External Affairs, Government of India", url: "https://mea.gov.in" },
      { label: "G7 France 2026 Official Website", url: "https://www.elysee.fr" },
      { label: "PIB - Press Information Bureau", url: "https://pib.gov.in" },
    ],
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded G-7 Summit 2026 Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
