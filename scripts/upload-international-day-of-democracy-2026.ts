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
  const img1Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/407e2179-1fa4-4249-b4d8-c2ec26519d1d/democracy_day_2026_civic_participation_1789460075828.jpg";
  const img2Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/407e2179-1fa4-4249-b4d8-c2ec26519d1d/un_undef_human_rights_democracy_1789460095569.jpg";
  const img3Path = "/Users/aakariastech/.gemini/antigravity-ide/brain/407e2179-1fa4-4249-b4d8-c2ec26519d1d/parliament_role_democratic_governance_1789460120698.jpg";

  console.log("Uploading image assets to Sanity CMS...");

  const img1Asset = await client.assets.upload("image", fs.createReadStream(img1Path), {
    filename: "democracy_day_2026_civic_participation.jpg",
    contentType: "image/jpeg",
  });

  const img2Asset = await client.assets.upload("image", fs.createReadStream(img2Path), {
    filename: "un_undef_human_rights_democracy.jpg",
    contentType: "image/jpeg",
  });

  const img3Asset = await client.assets.upload("image", fs.createReadStream(img3Path), {
    filename: "parliament_role_democratic_governance.jpg",
    contentType: "image/jpeg",
  });

  console.log("Uploaded Image 1:", img1Asset._id);
  console.log("Uploaded Image 2:", img2Asset._id);
  console.log("Uploaded Image 3:", img3Asset._id);

  const titleHi = "अंतर्राष्ट्रीय लोकतंत्र दिवस 2026 (International Day of Democracy): 15 सितंबर, जनभागीदारी, जवाबदेह शासन, IPU, UDHR व UNDEF | MPPSC & UPSC Notes";
  const titleEn = "International Day of Democracy 2026: 15th September, Civic Participation, Accountable Governance, IPU, UDHR & UNDEF | MPPSC & UPSC";

  const excerptHi = "अंतर्राष्ट्रीय लोकतंत्र दिवस (15 सितंबर 2026) का संपूर्ण विश्लेषण: 2007 में संयुक्त राष्ट्र महासभा (UNGA) का प्रस्ताव, 1997 IPU की Universal Declaration on Democracy, ICNRD प्रक्रिया, 2026 में जनभागीदारी व मानवाधिकार फोकस, UDHR अनुच्छेद 19, संयुक्त राष्ट्र लोकतंत्र कोष (UNDEF) तथा MPPSC एवं UPSC परीक्षा उपयोगी मॉडल उत्तर, 10 FAQs व 8 अभ्यास MCQs।";
  const excerptEn = "Complete analytical coverage of International Day of Democracy observed on 15th September 2026. Covers 2007 UNGA resolution, 1997 IPU Universal Declaration on Democracy, ICNRD process, 2026 focus on civic participation, UDHR Article 19, UN Democracy Fund (UNDEF), parliamentary roles, 10 FAQs, and 8 practice MCQs for MPPSC & UPSC exams.";

  const slug = "international-day-of-democracy-2026-15-september-civic-participation-mppsc-upsc-notes";
  const publishedAt = "2026-09-15T09:00:00.000Z";
  const caDate = "2026-09-15";

  const bodyHi = [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "प्रतिवर्ष **15 सितंबर** को दुनिया भर में **अंतर्राष्ट्रीय लोकतंत्र दिवस (International Day of Democracy)** मनाया जाता है। यह विशेष दिवस लोकतांत्रिक मूल्यों, मानवाधिकारों, अभिव्यक्ति की स्वतंत्रता, व्यापक नागरिक भागीदारी और जवाबदेह शासन (Accountable Governance) के महत्व को रेखांकित करता है। लोकतंत्र केवल एक राजनीतिक व्यवस्था नहीं, बल्कि यह नागरिकों को स्वतंत्रता, समानता, न्याय और उन निर्णय-प्रक्रियाओं में सक्रिय भागीदारी प्रदान करने का सशक्त माध्यम है जो उनके दैनिक जीवन और राष्ट्र के भविष्य को प्रभावित करती हैं। प्रतियोगी परीक्षाओं (**[MPPSC मुख्य परीक्षा प्रश्नपत्र 2 - राजव्यवस्था व शासन](/mppsc/mains-syllabus)** एवं **UPSC GS Paper 2 - Polity, Governance & International Relations**) के दृष्टिकोण से अंतर्राष्ट्रीय लोकतंत्र दिवस का ऐतिहासिक विकास, संयुक्त राष्ट्र की भूमिका, नागरिक भागीदारी और संवैधानिक प्रावधान अत्यंत महत्त्वपूर्ण विषय हैं। नवीनतम समसामयिकी जानकारी हेतु [MPPSC Current Affairs](/mppsc-current-affairs) और [General Awareness](/general-awareness) अनुभाग का नियमित अध्ययन करें।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img1Asset._id },
      alt: "अंतर्राष्ट्रीय लोकतंत्र दिवस 2026: मतदान, नागरिक भागीदारी, अभिव्यक्ति की स्वतंत्रता व मानवाधिकार | MPPSC & UPSC Notes",
      caption: "चित्र 1: अंतर्राष्ट्रीय लोकतंत्र दिवस (15 सितंबर 2026) — लोकतांत्रिक मूल्यों, मानवाधिकारों, नागरिक भागीदारी एवं समावेशी शासन की सार्वभौम अवधारणा।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. अंतर्राष्ट्रीय लोकतंत्र दिवस: प्रमुख तथ्य (Key Exam Highlights)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **आयोजन तिथि (Date of Observation)**: प्रतिवर्ष 15 सितंबर।\n• **स्थापना (Establishment)**: संयुक्त राष्ट्र महासभा (UNGA) द्वारा वर्ष 2007 में सर्वसम्मति से पारित प्रस्ताव 62/7 (Resolution 62/7) के माध्यम से।\n• **पहला आयोजन (First Celebration)**: वर्ष 2008 में।\n• **मुख्य उद्देश्य (Core Objective)**: लोकतांत्रिक सिद्धांतों, मानवाधिकारों, जनभागीदारी और पारदर्शी व जवाबदेह शासन को विश्व स्तर पर बढ़ावा देना और उसकी समीक्षा करना।\n• **केंद्रीय बिंदु (Central Theme Focus)**: नागरिकों को उन सभी सरकारी व सामाजिक निर्णय-प्रक्रियाओं में भागीदारी के महत्व की ओर आकर्षित करना जो उनके जीवन को प्रत्यक्ष या अप्रत्यक्ष रूप से प्रभावित करती हैं।\n• **नोडल वैश्विक संस्थाएँ (Nodal International Bodies)**: संयुक्त राष्ट्र महासभा (UNGA), अंतर-संसदीय संघ (Inter-Parliamentary Union - IPU), और संयुक्त राष्ट्र लोकतंत्र कोष (UNDEF)।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. वर्ष 2026 की मुख्य थीम एवं विशेष फोकस (Main Theme & Special Focus for 2026)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **2026 की आधिकारिक थीम (Official Theme 2026)**: अंतर-संसदीय संघ (IPU) के अनुसार अंतर्राष्ट्रीय लोकतंत्र दिवस 2026 की थीम **\"मानवाधिकारों पर ध्यान केंद्रित करें\" (Focus on human rights)** है। यह थीम लोकतांत्रिक चर्चा, नीति-निर्माण और शासन व्यवस्था के केंद्र में मानवाधिकारों, सामाजिक समानता और मानवीय गरिमा को सर्वोच्च प्राथमिकता देती है।\n• **व्यापक जनभागीदारी (Broad Civic Participation)**: मानवाधिकारों की रक्षा करते हुए नीति-निर्माण एवं निर्णय लेने की प्रक्रिया में नागरिकों की व्यापक भागीदारी सुनिश्चित करना।\n• **अभिव्यक्ति व समावेशिता की मजबूती (Strengthening Freedom of Expression & Inclusivity)**: अभिव्यक्ति की स्वतंत्रता, सामाजिक समानता, डिजिटल पहुंच और अल्पसंख्यकों तथा हाशिये पर मौजूद समुदायों की समावेशिता को सुदृढ़ करना।\n• **जवाबदेह संस्थागत ढांचा (Accountable Democratic Institutions)**: लोकतांत्रिक संस्थाओं (संसद, न्यायपालिका, निर्वाचन आयोग) को अधिक जवाबदेह, उत्तरदायी और पारदर्शी बनाना।\n• **लचीले व समावेशी समाज का निर्माण (Building Resilient & Peaceful Societies)**: शांतिपूर्ण, समावेशी और संकट-विरोधी (resilient) समाज के निर्माण में जागरूक नागरिकों की सक्रिय भूमिका बढ़ाना।\n• **विचार-विमर्श आधारित लोकतंत्र (Deliberative Democracy)**: नागरिक सभाओं (Citizen Assemblies), सामुदायिक संवाद और निरंतर विचार-विमर्श आधारित लोकतंत्र जैसे आधुनिक माध्यमों पर वैश्विक चर्चा को प्रोत्साहित करना।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. अंतर्राष्ट्रीय लोकतंत्र दिवस का इतिहास एवं वैश्विक घटनाक्रम" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **1988 (ICNRD प्रक्रिया की शुरुआत)**: फिलीपींस की प्रथम महिला राष्ट्रपति **कोराजोन सी. एक्विनो (Corazon C. Aquino)** की पहल पर लोकतंत्र की पुनर्स्थापना हेतु **International Conferences on New and Restored Democracies (ICNRD)** प्रक्रिया प्रारंभ हुई।\n• **सितंबर 1997 (IPU की सार्वभौम घोषणा)**: अंतर-संसदीय संघ (Inter-Parliamentary Union - IPU) ने सितंबर 1997 में **Universal Declaration on Democracy (लोकतंत्र पर सार्वभौम घोषणा)** को अपनाया, जिसने लोकतंत्र के वैश्विक मानकों को स्थापित किया।\n• **2006 (दोहा सम्मेलन)**: ICNRD का छठा अंतर्राष्ट्रीय सम्मेलन दोहा, कतर में आयोजित हुआ, जिसमें लोकतंत्र के लिए एक अंतर्राष्ट्रीय दिवस घोषित करने का प्रस्ताव रखा गया।\n• **8 नवंबर 2007 (UNGA प्रस्ताव)**: संयुक्त राष्ट्र महासभा ने सर्वसम्मति से 15 सितंबर को अंतर्राष्ट्रीय लोकतंत्र दिवस के रूप में स्थापित करने संबंधी प्रस्ताव पारित किया।\n• **15 सितंबर 2008 (प्रथम आयोजन)**: संपूर्ण विश्व में 15 सितंबर 2008 को पहली बार औपचारिक रूप से अंतर्राष्ट्रीय लोकतंत्र दिवस मनाया गया।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img2Asset._id },
      alt: "संयुक्त राष्ट्र महासभा, UDHR अनुच्छेद 19, और संयुक्त राष्ट्र लोकतंत्र कोष (UNDEF) | MPPSC & UPSC Notes",
      caption: "चित्र 2: संयुक्त राष्ट्र (UNGA), मानवाधिकारों की सार्वभौम घोषणा (UDHR Article 19) एवं संयुक्त राष्ट्र लोकतंत्र कोष (UNDEF) की वैश्विक भूमिका।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. लोकतंत्र में संसद की भूमिका (Role of Parliament in Democracy)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **नागरिकों का प्रतिनिधित्व (Public Representation)**: संसद लोकतंत्र की सर्वोच्च प्रतिनिधि संस्था है, जो विभिन्न क्षेत्रों, संस्कृतियों और विचारधाराओं के नागरिकों की आवाज को शासन में प्रतिनिधित्व प्रदान करती है।\n• **विधि निर्माण (Legislative Function)**: जनहित में पारदर्शी, न्यायसंगत और प्रगतिशील कानूनों का निर्माण करना।\n• **कार्यपालिका की जवाबदेही (Executive Accountability)**: प्रश्नकाल, ध्यानाकर्षण प्रस्ताव, अविश्वास प्रस्ताव और संसदीय समितियों के माध्यम से सरकार (कार्यपालिका) की उत्तरदेही सुनिश्चित करना।\n• **विचार-विमर्श का मंच (Debate Forum)**: राष्ट्रीय और अंतर्राष्ट्रीय महत्व के सार्वजनिक मुद्दों पर स्वस्थ चर्चा और विचार-विमर्श हेतु सर्वोच्च मंच उपलब्ध कराना।\n• **नागरिक सहभागिता का सशक्तीकरण**: लोकतांत्रिक शासन प्रणाली में नागरिकों की प्रत्यक्ष और अप्रत्यक्ष सहभागिता को मजबूत करना।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. मानवाधिकार और लोकतंत्र: UDHR का अनुच्छेद 19" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **चुनाव से परे लोकतंत्र (Beyond Elections)**: लोकतंत्र केवल समय-समय पर चुनाव कराने तक सीमित नहीं है, बल्कि इसमें मौलिक अधिकारों की सुरक्षा, सामाजिक समानता, नागरिक स्वतंत्रता और प्रशासनिक जवाबदेही अनिवार्य रूप से शामिल हैं।\n• **UDHR का अनुच्छेद 19 (Article 19 of UDHR)**: मानवाधिकारों की सार्वभौम घोषणा (Universal Declaration of Human Rights - UDHR, 1948) के **अनुच्छेद 19** में विचार और अभिव्यक्ति की स्वतंत्रता (Freedom of Opinion and Expression) का स्पष्ट उल्लेख है।\n• **सूचना प्राप्ति व साझा करने का अधिकार**: अनुच्छेद 19 के अनुसार, प्रत्येक व्यक्ति को बिना किसी हस्तक्षेप के अपने विचार रखने तथा किसी भी माध्यम से सीमाओं की परवाह किए बिना सूचना एवं विचार मांगने, प्राप्त करने और साझा करने का अधिकार है।\n• **भारतीय संविधान से तुलना**: भारतीय संविधान के **अनुच्छेद 19(1)(a)** में नागरिकों को 'वाक एवं अभिव्यक्ति की स्वतंत्रता' मौलिक अधिकार के रूप में प्रदान की गई है। विस्तृत तैयारी हेतु हमारे [MPPSC Notes](/mppsc-notes) देखें।",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img3Asset._id },
      alt: "भारतीय संसद (संसद भवन) में बहस, प्रतिनिधित्व और पारदर्शी कानून निर्माण | MPPSC & UPSC Notes",
      caption: "चित्र 3: लोकतांत्रिक शासन व्यवस्था में संसद (Parliament), नागरिक भागीदारी, कानून निर्माण और सरकार की उत्तरदेही का महत्व।"
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "6. संयुक्त राष्ट्र लोकतंत्र कोष (UNDEF) क्या है?" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **UNDEF का पूरा नाम**: United Nations Democracy Fund (संयुक्त राष्ट्र लोकतंत्र कोष)।\n• **स्थापना वर्ष (Establishment Year)**: 2005 (संयुक्त राष्ट्र महासचिव कोफी अन्नान द्वारा घोषित)।\n• **मुख्य कार्य (Core Function)**: यह कोष दुनिया भर में नागरिक समाज संगठन (CSOs), समावेशी जनभागीदारी, मजबूत लोकतांत्रिक संस्थाओं, लैंगिक समानता (Gender Equality) और पारदर्शी व जवाबदेह शासन से जुड़ी परियोजनाओं को वित्तीय व तकनीकी सहायता प्रदान करता है।\n• **अनुदान लक्ष्य**: UNDEF मुख्य रूप से विकासशील और नए लोकतांत्रिक देशों में स्वतंत्र मीडिया, नागरिक शिक्षा और मानवाधिकार रक्षकों की पहलों को फंडिंग देता है।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "7. भारत में लोकतंत्र का आधार एवं संवैधानिक ढांचा" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **विश्व का सबसे बड़ा लोकतंत्र (World's Largest Democracy)**: भारत विश्व का सबसे बड़ा और जीवंत लोकतंत्र है, जहाँ 1.4 अरब से अधिक नागरिक अपने लोकतांत्रिक अधिकारों का प्रयोग करते हैं।\n• **प्रस्तावना का संकल्प (Preamble Values)**: भारतीय संविधान की प्रस्तावना भारत को एक 'सम्पूर्ण प्रभुत्व-संपन्न, समाजवादी, पंथनिरपेक्ष, **लोकतांत्रिक गणराज्य**' बनाने का संकल्प व्यक्त करती है।\n• **सार्वभौमिक वयस्क मताधिकार (Universal Adult Suffrage - Art. 326)**: अनुच्छेद 326 के तहत 18 वर्ष या उससे अधिक आयु के प्रत्येक नागरिक को बिना किसी भेदभाव के मतदान का अधिकार प्राप्त है।\n• **त्रिस्तरीय पंचायती राज (73वां व 74वां संविधान संशोधन)**: स्थानीय स्तर पर जनभागीदारी और विकेंद्रीकृत लोकतंत्र को मजबूत करने हेतु पंचायती राज एवं नगर निकायों को संवैधानिक दर्जा दिया गया है। अधिक जानकारी हेतु [Online Courses](/online-courses) और [Publications](/publications) देखें।",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "8. MPPSC & UPSC परीक्षा हेतु क्विक रिवीजन पॉइंट्स (Quick Revision Notes)" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **15 सितंबर** → अंतर्राष्ट्रीय लोकतंत्र दिवस (International Day of Democracy)\n• **2026 की थीम** → \"मानवाधिकारों पर ध्यान केंद्रित करें\" (Focus on human rights - IPU)\n• **2007** → UNGA प्रस्ताव 62/7 द्वारा अंतर्राष्ट्रीय लोकतंत्र दिवस की स्थापना\n• **2008** → प्रथम अंतर्राष्ट्रीय लोकतंत्र दिवस का आयोजन\n• **1997** → IPU द्वारा Universal Declaration on Democracy को अपनाया गया\n• **1988** → फिलीपींस (राष्ट्रपति कोराजोन एक्विनो) की पहल पर ICNRD प्रक्रिया प्रारंभ\n• **2005** → UN Secretary General द्वारा UNDEF (United Nations Democracy Fund) की स्थापना\n• **UDHR Art. 19** → विचार एवं अभिव्यक्ति की स्वतंत्रता का सार्वभौम अधिकार\n• **भारतीय संविधान Art. 19(1)(a)** → वाक एवं अभिव्यक्ति की स्वतंत्रता\n• **भारतीय संविधान Art. 326** → सार्वभौमिक वयस्क मताधिकार (18 वर्ष+)",
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
          text: "Every year on **15th September**, the world observes the **International Day of Democracy**. This landmark international day underlines the critical importance of democratic values, human rights, freedom of expression, active civic participation, and accountable governance. Democracy is not merely a political system of holding periodic elections; it is a comprehensive philosophy that empowers citizens with fundamental freedoms, equality, justice, and direct involvement in decision-making processes that shape their lives and future of the nation. From the perspective of competitive examinations (**[MPPSC Mains Paper 2 - Polity & Governance](/mppsc/mains-syllabus)** and **UPSC GS Paper 2 - Polity, Governance & International Relations**), understanding the historical evolution, UN initiatives, role of parliaments, human rights frameworks, and Indian constitutional safeguards is essential. For regular current affairs updates, visit our [MPPSC Current Affairs](/mppsc-current-affairs) and [General Awareness](/general-awareness) sections.",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img1Asset._id },
      alt: "International Day of Democracy 2026: Universal voting rights, civic engagement, freedom of expression and human rights | MPPSC & UPSC Notes",
      caption: "Figure 1: International Day of Democracy (15th September 2026) — Universal democratic values, human rights, civic participation and accountable governance."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "1. International Day of Democracy: Key Exam Highlights" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Observation Date**: 15th September every year.\n• **Establishment**: Proclaimed by the United Nations General Assembly (UNGA) through Resolution 62/7 in 2007.\n• **First Edition**: Observed for the first time in 2008.\n• **Primary Objective**: Promoting democratic principles, protecting fundamental human rights, enhancing public participation, and monitoring transparent governance globally.\n• **Central Focus**: Drawing citizen attention to the importance of active participation in decisions affecting their daily lives.\n• **Nodal International Entities**: UN General Assembly (UNGA), Inter-Parliamentary Union (IPU), and United Nations Democracy Fund (UNDEF).",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "2. Main Theme & Special Focus Areas for 2026" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Official Theme for 2026**: According to the Inter-Parliamentary Union (IPU), the official theme for International Day of Democracy 2026 is **\"Focus on human rights\"**. This theme places human rights, social equality, and human dignity at the very center of democratic discourse, policy formulation, and governance.\n• **Broad Civic Participation**: Guaranteeing broad citizen participation in decision-making and policy formulation while protecting human rights.\n• **Strengthening Expression & Inclusivity**: Reinforcing freedom of expression, social equality, digital accessibility, and inclusion of marginalized communities.\n• **Accountable Institutions**: Making democratic institutions (parliament, judiciary, electoral commission) more accountable, responsive, and transparent.\n• **Building Resilient Societies**: Enhancing the active role of citizens in building peaceful, inclusive, and crisis-resilient societies.\n• **Deliberative Democracy**: Encouraging global discourse on modern mechanisms such as Citizen Assemblies, community dialogue, and deliberative governance.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "3. History & Chronology of International Day of Democracy" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **1988 (ICNRD Process Initiated)**: Following the initiative of Philippine President **Corazon C. Aquino**, the **International Conferences on New and Restored Democracies (ICNRD)** process began to restore global democratic governance.\n• **September 1997 (IPU Declaration)**: The Inter-Parliamentary Union (IPU) adopted the landmark **Universal Declaration on Democracy** in September 1997, laying foundational principles for democratic governance.\n• **2006 (Doha Conference)**: The 6th Conference of ICNRD in Doha, Qatar recommended the creation of an international day for democracy.\n• **8th November 2007 (UNGA Resolution)**: The UN General Assembly unanimously adopted Resolution 62/7 establishing 15th September as the International Day of Democracy.\n• **15th September 2008 (First Global Celebration)**: The inaugural International Day of Democracy was formally celebrated worldwide.",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img2Asset._id },
      alt: "UN General Assembly, UDHR Article 19, and United Nations Democracy Fund UNDEF | MPPSC & UPSC Notes",
      caption: "Figure 2: UN General Assembly, Universal Declaration of Human Rights (UDHR Article 19), and UN Democracy Fund (UNDEF) promoting global democratic standards."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "4. Role of Parliament in Democratic Governance" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Public Representation**: Parliament is the supreme representative institution giving voice to diverse regions, cultures, and citizens in governance.\n• **Lawmaking Function**: Enacting transparent, equitable, and progressive legislation for public welfare.\n• **Executive Accountability**: Ensuring executive accountability through Question Hour, Calling Attention Motions, No-Confidence Motions, and Parliamentary Committees.\n• **Forum for Debate**: Providing the primary forum for robust debate on issues of national and international importance.\n• **Strengthening Citizen Engagement**: Institutionalizing direct and indirect citizen participation in legislative governance.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "5. Human Rights & Democracy: UDHR Article 19" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Democracy Beyond Voting**: Democracy is not limited to holding elections; it encompasses fundamental rights protection, equality, citizen liberties, and administrative accountability.\n• **UDHR Article 19**: Article 19 of the **Universal Declaration of Human Rights (UDHR, 1948)** explicitly guarantees the freedom of opinion and expression.\n• **Right to Seek and Share Information**: Under Article 19, everyone has the right to hold opinions without interference and to seek, receive, and impart information and ideas through any media.\n• **Indian Constitutional Mapping**: Article 19(1)(a) of the Constitution of India guarantees 'Freedom of Speech and Expression' as a fundamental right to all citizens. For structured study materials, explore our [MPPSC Notes](/mppsc-notes).",
        },
      ],
    },
    {
      _type: "image",
      asset: { _type: "reference", _ref: img3Asset._id },
      alt: "Indian Parliament Sansad Bhavan chamber debates, public representation and accountable governance | MPPSC & UPSC Notes",
      caption: "Figure 3: Role of Parliament, citizen participation, lawmaking, and government accountability in democratic governance."
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "6. What is the UN Democracy Fund (UNDEF)?" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **Full Form**: United Nations Democracy Fund (UNDEF).\n• **Established**: 2005 (announced by UN Secretary-General Kofi Annan).\n• **Core Function**: UNDEF supports projects by Civil Society Organizations (CSOs) that empower civic participation, strengthen democratic institutions, promote gender equality, and foster transparent governance.\n• **Target Initiatives**: Provides grants to independent media, civic education, youth leadership, and human rights defenders in developing and emerging democracies.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "7. Foundation of Democracy in India & Constitutional Framework" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **World's Largest Democracy**: India is the world's largest vibrant democracy, empowering over 1.4 billion citizens with democratic rights.\n• **Preamble Principles**: The Preamble of the Constitution of India resolves to constitute India into a 'Sovereign, Socialist, Secular, **Democratic Republic**'.\n• **Universal Adult Suffrage (Article 326)**: Article 326 guarantees equal voting rights to every citizen aged 18 and above without discrimination.\n• **Panchayati Raj & Local Governance (73rd & 74th Amendments)**: Grassroots democracy and decentralized governance are constitutionally fortified through Panchayati Raj institutions and urban local bodies. Check out our [Online Courses](/online-courses) and [Publications](/publications) for comprehensive exam preparation.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "8. Quick Revision Points for MPPSC & UPSC Exams" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "• **15th September** → International Day of Democracy\n• **2026 Theme** → \"Focus on human rights\" (IPU Initiative)\n• **2007** → UNGA Resolution 62/7 established International Day of Democracy\n• **2008** → First celebration of International Day of Democracy\n• **1997** → IPU adopted Universal Declaration on Democracy\n• **1988** → ICNRD process launched on Philippine President Corazon Aquino's initiative\n• **2005** → UN Secretary General established UN Democracy Fund (UNDEF)\n• **UDHR Art. 19** → Universal Right to Freedom of Opinion & Expression\n• **Indian Constitution Art. 19(1)(a)** → Freedom of Speech & Expression\n• **Indian Constitution Art. 326** → Universal Adult Suffrage (18 years+)",
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "अंतर्राष्ट्रीय लोकतंत्र दिवस प्रतिवर्ष किस तिथि को मनाया जाता है?",
      questionEn: "On which date is the International Day of Democracy celebrated every year?",
      answer: "अंतर्राष्ट्रीय लोकतंत्र दिवस प्रतिवर्ष 15 सितंबर को मनाया जाता है। संयुक्त राष्ट्र महासभा द्वारा वर्ष 2007 में पारित प्रस्ताव के बाद पहला आयोजन 15 सितंबर 2008 को किया गया था।",
      answerEn: "International Day of Democracy is celebrated every year on 15th September. Following the UNGA resolution in 2007, the first celebration took place on 15th September 2008."
    },
    {
      question: "संयुक्त राष्ट्र महासभा ने किस वर्ष अंतर्राष्ट्रीय लोकतंत्र दिवस की स्थापना संबंधी प्रस्ताव पारित किया था?",
      questionEn: "In which year did the UN General Assembly adopt the resolution establishing the International Day of Democracy?",
      answer: "संयुक्त राष्ट्र महासभा (UNGA) ने 8 नवंबर 2007 को सर्वसम्मति से प्रस्ताव 62/7 (Resolution 62/7) पारित कर 15 सितंबर को अंतर्राष्ट्रीय लोकतंत्र दिवस घोषित किया।",
      answerEn: "The UN General Assembly unanimously adopted Resolution 62/7 on 8th November 2007, designating 15th September as International Day of Democracy."
    },
    {
      question: "अंतर-संसदीय संघ (IPU) ने Universal Declaration on Democracy किस वर्ष अपनाया था?",
      questionEn: "In which year did the Inter-Parliamentary Union (IPU) adopt the Universal Declaration on Democracy?",
      answer: "अंतर-संसदीय संघ (IPU) ने सितंबर 1997 में Universal Declaration on Democracy को अपनाया था, जिसके सम्मान में 15 सितंबर की तिथि चुनी गई।",
      answerEn: "The Inter-Parliamentary Union (IPU) adopted the Universal Declaration on Democracy in September 1997, which influenced the choice of 15th September."
    },
    {
      question: "मानवाधिकारों की सार्वभौम घोषणा (UDHR) के किस अनुच्छेद में विचार और अभिव्यक्ति की स्वतंत्रता का उल्लेख है?",
      questionEn: "Which article of the Universal Declaration of Human Rights (UDHR) deals with freedom of opinion and expression?",
      answer: "UDHR के अनुच्छेद 19 (Article 19) में विचार और अभिव्यक्ति की स्वतंत्रता का स्पष्ट उल्लेख किया गया है।",
      answerEn: "Article 19 of the Universal Declaration of Human Rights (UDHR) explicitly guarantees freedom of opinion and expression."
    },
    {
      question: "संयुक्त राष्ट्र लोकतंत्र कोष (UNDEF) की स्थापना किस वर्ष की गई थी?",
      questionEn: "In which year was the United Nations Democracy Fund (UNDEF) established?",
      answer: "UNDEF की स्थापना वर्ष 2005 में तत्कालीन संयुक्त राष्ट्र महासचिव कोफी अन्नान द्वारा नागरिक समाज और लोकतांत्रिक संस्थाओं को सहायता देने हेतु की गई थी।",
      answerEn: "UNDEF was established in 2005 by UN Secretary-General Kofi Annan to support civil society organizations and democratic institutions globally."
    },
    {
      question: "भारतीय संविधान का कौन-सा अनुच्छेद सार्वभौमिक वयस्क मताधिकार (Universal Adult Suffrage) की गारंटी देता है?",
      questionEn: "Which article of the Indian Constitution guarantees Universal Adult Suffrage?",
      answer: "भारतीय संविधान का अनुच्छेद 326 (Article 326) 18 वर्ष और उससे अधिक आयु के नागरिकों को सार्वभौमिक वयस्क मताधिकार प्रदान करता है।",
      answerEn: "Article 326 of the Constitution of India guarantees Universal Adult Suffrage to citizens aged 18 years and above."
    },
    {
      question: "लोकतंत्र में संसद (Parliament) के मुख्य कार्य क्या हैं?",
      questionEn: "What are the primary functions of Parliament in a democracy?",
      answer: "संसद के मुख्य कार्यों में नागरिकों को प्रतिनिधित्व देना, कानून बनाना, बजट स्वीकृत करना, कार्यपालिका की जवाबदेही तय करना और सार्वजनिक मुद्दों पर विचार-विमर्श करना शामिल है।",
      answerEn: "The primary functions of Parliament include representing citizens, enacting laws, approving budgets, holding the executive accountable, and serving as a forum for public debate."
    },
    {
      question: "अंतर्राष्ट्रीय लोकतंत्र दिवस 2026 की थीम क्या है?",
      questionEn: "What is the official theme for International Day of Democracy 2026?",
      answer: "अंतर-संसदीय संघ (IPU) के अनुसार अंतर्राष्ट्रीय लोकतंत्र दिवस 2026 की आधिकारिक थीम \"मानवाधिकारों पर ध्यान केंद्रित करें\" (Focus on human rights) है, जो लोकतांत्रिक चर्चा के केंद्र में मानवाधिकारों, समानता और मानवीय गरिमा को स्थापित करती है।",
      answerEn: "According to the Inter-Parliamentary Union (IPU), the official theme for International Day of Democracy 2026 is \"Focus on human rights\", placing human rights, equality, and human dignity at the core of democratic debate."
    },
    {
      question: "ICNRD प्रक्रिया किस देश के राष्ट्रपति की पहल पर शुरू हुई थी?",
      questionEn: "The ICNRD process was launched on the initiative of the president of which country?",
      answer: "ICNRD प्रक्रिया 1988 में फिलीपींस की प्रथम महिला राष्ट्रपति कोराजोन सी. एक्विनो (Corazon C. Aquino) की पहल पर शुरू हुई थी।",
      answerEn: "The ICNRD process was initiated in 1988 under the leadership of Philippines President Corazon C. Aquino."
    },
    {
      question: "भारतीय संविधान में मौलिक अधिकारों के अंतर्गत अभिव्यक्ति की स्वतंत्रता किस अनुच्छेद में दी गई है?",
      questionEn: "Under Fundamental Rights in the Indian Constitution, freedom of speech and expression is provided in which article?",
      answer: "भारतीय संविधान के अनुच्छेद 19(1)(a) में सभी नागरिकों को वाक एवं अभिव्यक्ति की स्वतंत्रता (Freedom of Speech and Expression) प्रदान की गई है।",
      answerEn: "Article 19(1)(a) of the Indian Constitution grants Freedom of Speech and Expression as a fundamental right to all citizens."
    }
  ];

  const mcqs = [
    {
      question: "अंतर्राष्ट्रीय लोकतंत्र दिवस (International Day of Democracy) प्रतिवर्ष किस तिथि को मनाया जाता है?",
      questionEn: "International Day of Democracy is observed globally on which date every year?",
      options: ["A. 10 दिसंबर", "B. 15 सितंबर", "C. 24 अक्टूबर", "D. 26 नवंबर"],
      optionsEn: ["A. 10th December", "B. 15th September", "C. 24th October", "D. 26th November"],
      correctIndex: 1,
      explanation: "संयुक्त राष्ट्र महासभा द्वारा 2007 में पारित प्रस्ताव के अनुसार प्रतिवर्ष 15 सितंबर को अंतर्राष्ट्रीय लोकतंत्र दिवस मनाया जाता है।",
      explanationEn: "As per UN General Assembly Resolution adopted in 2007, International Day of Democracy is celebrated globally on 15th September every year."
    },
    {
      question: "संयुक्त राष्ट्र महासभा (UNGA) ने अंतर्राष्ट्रीय लोकतंत्र दिवस की स्थापना किस वर्ष की थी?",
      questionEn: "In which year was the International Day of Democracy established by the UN General Assembly?",
      options: ["A. 1997", "B. 2005", "C. 2007", "D. 2010"],
      optionsEn: ["A. 1997", "B. 2005", "C. 2007", "D. 2010"],
      correctIndex: 2,
      explanation: "संयुक्त राष्ट्र महासभा ने 8 नवंबर 2007 को सर्वसम्मति से प्रस्ताव 62/7 पारित करके 15 सितंबर को अंतर्राष्ट्रीय लोकतंत्र दिवस के रूप में स्थापित किया।",
      explanationEn: "UNGA adopted Resolution 62/7 on 8th November 2007 establishing 15th September as International Day of Democracy."
    },
    {
      question: "सितंबर 1997 में 'Universal Declaration on Democracy' किस संस्था द्वारा अपनाया गया था?",
      questionEn: "The 'Universal Declaration on Democracy' was adopted in September 1997 by which international organization?",
      options: ["A. संयुक्त राष्ट्र सुरक्षा परिषद (UNSC)", "B. अंतर-संसदीय संघ (IPU)", "C. अंतर्राष्ट्रीय न्यायालय (ICJ)", "D. एम्नेस्टी इंटरनेशनल"],
      optionsEn: ["A. UN Security Council (UNSC)", "B. Inter-Parliamentary Union (IPU)", "C. International Court of Justice (ICJ)", "D. Amnesty International"],
      correctIndex: 1,
      explanation: "अंतर-संसदीय संघ (Inter-Parliamentary Union - IPU) ने सितंबर 1997 में Universal Declaration on Democracy अपनाया था, जिसने अंतर्राष्ट्रीय लोकतंत्र दिवस की नींव रखी।",
      explanationEn: "The Inter-Parliamentary Union (IPU) adopted the Universal Declaration on Democracy in September 1997."
    },
    {
      question: "मानवाधिकारों की सार्वभौम घोषणा (UDHR) का कौन-सा अनुच्छेद विचार और अभिव्यक्ति की स्वतंत्रता से संबंधित है?",
      questionEn: "Which article of the Universal Declaration of Human Rights (UDHR) relates to freedom of opinion and expression?",
      options: ["A. अनुच्छेद 14", "B. अनुच्छेद 19", "C. अनुच्छेद 21", "D. अनुच्छेद 25"],
      optionsEn: ["A. Article 14", "B. Article 19", "C. Article 21", "D. Article 25"],
      correctIndex: 1,
      explanation: "UDHR के अनुच्छेद 19 में स्पष्ट रूप से उल्लेख किया गया है कि प्रत्येक व्यक्ति को विचार और अभिव्यक्ति की स्वतंत्रता का अधिकार प्राप्त है।",
      explanationEn: "Article 19 of UDHR guarantees that everyone has the right to freedom of opinion and expression."
    },
    {
      question: "संयुक्त राष्ट्र लोकतंत्र कोष (UNDEF) की स्थापना किस वर्ष की गई थी?",
      questionEn: "In which year was the United Nations Democracy Fund (UNDEF) created?",
      options: ["A. 1995", "B. 2000", "C. 2005", "D. 2012"],
      optionsEn: ["A. 1995", "B. 2000", "C. 2012", "D. 2005"],
      correctIndex: 3,
      explanation: "संयुक्त राष्ट्र के तत्कालीन महासचिव कोफी अन्नान ने वर्ष 2005 में UNDEF की स्थापना की थी ताकि दुनिया भर में नागरिक समाज संगठनों और लोकतांत्रिक प्रक्रियाओं को समर्थन दिया जा सके।",
      explanationEn: "UNDEF was established in 2005 by UN Secretary-General Kofi Annan to support civil society initiatives strengthening democracy."
    },
    {
      question: "लोकतंत्र के संदर्भ में निम्नलिखित कथनों पर विचार कीजिए:\n1. 1988 में फिलीपींस की पहल पर ICNRD प्रक्रिया प्रारंभ हुई।\n2. प्रथम अंतर्राष्ट्रीय लोकतंत्र दिवस 15 सितंबर 2008 को मनाया गया।\nउपर्युक्त में से कौन-सा/से कथन सही है/हैं?",
      questionEn: "Consider the following statements regarding democracy initiatives:\n1. The ICNRD process was launched in 1988 on the initiative of Philippines.\n2. The first International Day of Democracy was celebrated on 15th September 2008.\nWhich of the above statements is/are correct?",
      options: ["A. केवल 1", "B. केवल 2", "C. 1 और 2 दोनों", "D. न तो 1 और न ही 2"],
      optionsEn: ["A. Only 1", "B. Only 2", "C. Both 1 and 2", "D. Neither 1 nor 2"],
      correctIndex: 2,
      explanation: "दोनों कथन पूर्णतः सही हैं। 1988 में फिलीपींस (राष्ट्रपति कोराजोन एक्विनो) की पहल पर ICNRD प्रक्रिया शुरू हुई और 15 सितंबर 2008 को पहला अंतर्राष्ट्रीय लोकतंत्र दिवस मनाया गया।",
      explanationEn: "Both statements are correct. The ICNRD process was initiated by Philippines in 1988 and the 1st International Day of Democracy was celebrated on 15th September 2008."
    },
    {
      question: "भारतीय संविधान का कौन-सा अनुच्छेद सार्वभौमिक वयस्क मताधिकार (Universal Adult Suffrage) से संबंधित है?",
      questionEn: "Which article of the Constitution of India deals with Universal Adult Suffrage?",
      options: ["A. अनुच्छेद 324", "B. अनुच्छेद 325", "C. अनुच्छेद 326", "D. अनुच्छेद 329"],
      optionsEn: ["A. Article 324", "B. Article 325", "C. Article 326", "D. Article 329"],
      correctIndex: 2,
      explanation: "भारतीय संविधान का अनुच्छेद 326 लोकसभा और राज्य विधानसभाओं के लिए वयस्क मताधिकार के आधार पर निर्वाचनों का उपबंध करता है।",
      explanationEn: "Article 326 of the Constitution of India provides that elections to the House of the People and Legislative Assemblies shall be on the basis of adult suffrage."
    },
    {
      question: "लोकतांत्रिक शासन प्रणाली में संसद की मुख्य भूमिका के संदर्भ में सत्य कथन चुनिए:",
      questionEn: "Select the correct statement regarding the primary role of Parliament in a democratic governance system:",
      options: [
        "A. कानून निर्माण एवं नीतिगत बहस",
        "B. कार्यपालिका की जवाबदेही सुनिश्चित करना",
        "C. जनता के विभिन्न वर्गों का प्रतिनिधित्व",
        "D. उपर्युक्त सभी"
      ],
      optionsEn: [
        "A. Lawmaking and policy debate",
        "B. Ensuring executive accountability",
        "C. Representing diverse sections of public",
        "D. All of the above"
      ],
      correctIndex: 3,
      explanation: "संसद लोकतंत्र की केंद्रीय संस्था है जो कानून निर्माण, कार्यपालिका पर नियंत्रण, बजट अनुमोदन तथा नागरिकों के सर्वसमावेशी प्रतिनिधित्व का दायित्व निभाती है।",
      explanationEn: "Parliament is the central democratic institution performing legislative functions, oversight of executive, budget control, and representative governance."
    },
    {
      question: "अंतर-संसदीय संघ (IPU) के अनुसार अंतर्राष्ट्रीय लोकतंत्र दिवस 2026 की आधिकारिक थीम क्या है?",
      questionEn: "According to the Inter-Parliamentary Union (IPU), what is the official theme for International Day of Democracy 2026?",
      options: [
        "A. डिजिटल लोकतंत्र और एआई का प्रभाव",
        "B. \"मानवाधिकारों पर ध्यान केंद्रित करें\" (Focus on human rights)",
        "C. युवा सहभागिता और सशक्तिकरण",
        "D. जलवायु न्याय और पारदर्शी शासन"
      ],
      optionsEn: [
        "A. Digital Democracy and Impact of AI",
        "B. \"Focus on human rights\"",
        "C. Youth Participation and Empowerment",
        "D. Climate Justice and Transparent Governance"
      ],
      correctIndex: 1,
      explanation: "अंतर-संसदीय संघ (IPU) द्वारा अंतर्राष्ट्रीय लोकतंत्र दिवस 2026 की थीम \"मानवाधिकारों पर ध्यान केंद्रित करें\" (Focus on human rights) घोषित की गई है, जो लोकतांत्रिक चर्चा के केंद्र में मानवाधिकारों, समानता और मानवीय गरिमा को स्थापित करती है।",
      explanationEn: "The Inter-Parliamentary Union (IPU) announced \"Focus on human rights\" as the official theme for International Day of Democracy 2026, placing human rights, equality, and dignity at the heart of democratic discourse."
    }
  ];

  console.log("Upserting currentAffairs document in Sanity...");

  const caDoc = {
    _id: "ca-international-day-of-democracy-2026",
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
      asset: { _type: "reference", _ref: "image-46411d00fc1ee5f1397a6a2d72918e235d54e76a-1024x406-png" },
      alt: "अंतर्राष्ट्रीय लोकतंत्र दिवस 2026: 15 सितंबर, जन की आवाज़ लोकतंत्र की पहचान | MPPSC & UPSC Notes",
      caption: "अंतर्राष्ट्रीय लोकतंत्र दिवस 2026 (15 सितंबर) — लोकतंत्र, जनभागीदारी और जवाबदेह शासन"
    },
    tags: [
      { _type: "reference", _ref: "tag-mppsc", _key: "tag-mppsc-key" },
      { _type: "reference", _ref: "tag-upsc", _key: "tag-upsc-key" },
      { _type: "reference", _ref: "tag-important-days", _key: "tag-important-days-key" },
      { _type: "reference", _ref: "tag-national-affairs", _key: "tag-national-affairs-key" },
      { _type: "reference", _ref: "tag-prelims", _key: "tag-prelims-key" },
      { _type: "reference", _ref: "tag-mains", _key: "tag-mains-key" }
    ],
    nextArticle: {
      title: "राष्ट्रीय हथकरघा दिवस 2026: स्वदेशी आंदोलन एवं वस्त्र मंत्रालय",
      titleEn: "National Handloom Day 2026: Swadeshi Movement & Textiles Ministry",
      href: "/current-affairs/national-handloom-day-2026-swadeshi-movement-textiles-mppsc-upsc-notes"
    },
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
    _id: "gk-international-day-of-democracy-2026",
    _type: "staticGk",
  };
  const resGk = await client.createOrReplace(gkDoc);
  console.log("Successfully published staticGk document:", resGk._id);
}

main().catch((err) => {
  console.error("Error publishing article:", err);
  process.exit(1);
});
