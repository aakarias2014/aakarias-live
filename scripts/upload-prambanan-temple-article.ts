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
  console.log("🚀 Starting upload process for Prambanan Temple Joint Conservation Article with interactive MCQs...");

  // Image file paths
  const imagePaths = {
    slide1: "/Users/aakariastech/.gemini/antigravity-ide/brain/733b7b5e-cb9f-4f09-8f8d-056b5f893de7/media__1783766379601.jpg",
    slide2: "/Users/aakariastech/.gemini/antigravity-ide/brain/733b7b5e-cb9f-4f09-8f8d-056b5f893de7/media__1783766517707.jpg",
    slide3: "/Users/aakariastech/.gemini/antigravity-ide/brain/733b7b5e-cb9f-4f09-8f8d-056b5f893de7/media__1783766592380.png",
  };

  // 1. Create the International Affairs tag if it doesn't exist
  console.log("🏷 Creating or fetching International Affairs tag...");
  const tagDoc = {
    _id: "tag-international-affairs",
    _type: "tag",
    name: "International Affairs",
    slug: { _type: "slug", current: "international-affairs" },
  };
  await client.createIfNotExists(tagDoc);
  console.log("✔ International Affairs tag is ready.");

  // 2. Upload Slide 1 (Featured Image)
  console.log("📸 Uploading Image 1 (PM Modi Shaking Hands / Plaque) as featured image asset...");
  const asset1 = await client.assets.upload("image", fs.createReadStream(imagePaths.slide1), {
    filename: "prambanan_handshake_plaque.jpg",
  });
  console.log(`✔ Uploaded Image 1. Asset ID: ${asset1._id}`);

  // 3. Upload Slide 2 (Wide Candi View)
  console.log("📸 Uploading Image 2 (Wide Candi View) as inline asset...");
  const asset2 = await client.assets.upload("image", fs.createReadStream(imagePaths.slide2), {
    filename: "prambanan_candi_wide.jpg",
  });
  console.log(`✔ Uploaded Image 2. Asset ID: ${asset2._id}`);

  // 4. Upload Slide 3 (Relief Carvings)
  console.log("📸 Uploading Image 3 (Relief Carvings) as inline asset...");
  const asset3 = await client.assets.upload("image", fs.createReadStream(imagePaths.slide3), {
    filename: "prambanan_relief_carvings.png",
  });
  console.log(`✔ Uploaded Image 3. Asset ID: ${asset3._id}`);

  // 5. Construct the Article
  const article = {
    _id: "ca-prambanan-temple-conservation-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "prambanan-temple-india-indonesia-joint-conservation" },
    title: "प्रंबानन मंदिर (Prambanan Temple) का भारत-इंडोनेशिया मिलकर करेंगे संरक्षण",
    titleEn: "Prambanan Temple: India-Indonesia Joint Cultural Heritage Conservation Project",
    excerpt: "प्रधानमंत्री नरेंद्र मोदी की इंडोनेशिया यात्रा (जुलाई 2026) के दौरान दोनों देशों ने 1200 वर्ष पुराने यूनेस्को विश्व धरोहर प्रंबानन मंदिर के संरक्षण एवं जीर्णोद्धार के लिए संयुक्त परियोजना पर सहमति जताई।",
    excerptEn: "During PM Narendra Modi's visit to Indonesia (July 2026), India and Indonesia agreed on a joint conservation project to restore and protect the 1,200-year-old Prambanan Temple, a UNESCO World Heritage site.",
    ca_date: "2026-07-11",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 6,
    keywords: [
      "Prambanan Temple",
      "India Indonesia relations",
      "UNESCO World Heritage Site",
      "Act East Policy",
      "ASI International Projects",
      "Yogyakarta",
      "Rakai Pikatan",
      "Trimurti Temple",
      "प्रंबानन मंदिर",
      "भारत इंडोनेशिया संबंध",
      "यूनेस्को विश्व धरोहर",
      "एक्ट ईस्ट पॉलिसी",
      "भारतीय पुरातत्व सर्वेक्षण",
      "एएसआई"
    ],
    category: { _type: "reference", _ref: "cat-history" }, // History & Culture
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
      { _type: "reference", _ref: "tag-international-affairs" },
    ],
    syllabus: ["GS-1", "GS-2", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset1._id,
      },
      alt: "Prambanan Temple Joint Conservation Project - Plaque Unveiling by PM Modi & President Prabowo",
    },
    mcqs: [
      {
        question: "प्रंबानन मंदिर किस देश में स्थित है?",
        questionEn: "In which country is the Prambanan Temple located?",
        options: ["थाईलैंड", "इंडोनेशिया", "कंबोडिया", "वियतनाम"],
        optionsEn: ["Thailand", "Indonesia", "Cambodia", "Vietnam"],
        correctIndex: 1,
        explanation: "प्रंबानन इंडोनेशिया का सबसे बड़ा हिंदू मंदिर परिसर है और यह मध्य जावा के योग्याकार्ता में स्थित है।",
        explanationEn: "Prambanan is the largest Hindu temple complex in Indonesia, located in Yogyakarta, Central Java."
      },
      {
        question: "प्रंबानन मंदिर किस देवता समूह को समर्पित है?",
        questionEn: "Which group of deities is the Prambanan Temple dedicated to?",
        options: ["दशावतार", "सप्तऋषि", "त्रिमूर्ति", "नवदुर्गा"],
        optionsEn: ["Dashavatara", "Saptarishi", "Trimurti", "Navadurga"],
        correctIndex: 2,
        explanation: "यह मंदिर त्रिमूर्ति (शिव, विष्णु और ब्रह्मा) को समर्पित है, जिसमें भगवान शिव का मंदिर सबसे ऊंचा (47 मीटर) है।",
        explanationEn: "The temple complex is dedicated to the Trimurti (Shiva, Vishnu, and Brahma), with the temple of Shiva being the tallest (47 meters)."
      },
      {
        question: "प्रंबानन मंदिर को यूनेस्को विश्व धरोहर का दर्जा कब मिला?",
        questionEn: "When was the Prambanan Temple designated as a UNESCO World Heritage Site?",
        options: ["1985", "1988", "1991", "1995"],
        optionsEn: ["1985", "1988", "1991", "1995"],
        correctIndex: 2,
        explanation: "प्रंबानन मंदिर परिसर को वर्ष 1991 में यूनेस्को द्वारा विश्व धरोहर स्थल (UNESCO World Heritage Site) घोषित किया गया था।",
        explanationEn: "The Prambanan Temple compound was designated as a UNESCO World Heritage Site in the year 1991."
      },
      {
        question: "प्रंबानन मंदिर का निर्माण किस राजवंश के शासक ने कराया?",
        questionEn: "Which dynasty's ruler constructed the Prambanan Temple?",
        options: ["चोल", "शैलेंद्र", "मताराम राजवंश", "मजापहित"],
        optionsEn: ["Chola", "Shailendra", "Mataram Dynasty", "Majapahit"],
        correctIndex: 2,
        explanation: "इस मंदिर का निर्माण 9वीं शताब्दी में मताराम राजवंश के राजा रकाई पिकाटन (Rakai Pikatan) ने करवाया था।",
        explanationEn: "The temple was built in the 9th century by King Rakai Pikatan of the Mataram (Sanjaya) Dynasty."
      },
      {
        question: "भारत द्वारा प्रंबानन मंदिर के संरक्षण में कौन-सी संस्था प्रमुख भूमिका निभाएगी?",
        questionEn: "Which institution from India will play the leading role in the conservation of Prambanan Temple?",
        options: ["INTACH", "UNESCO", "भारतीय पुरातत्व सर्वेक्षण (ASI)", "ICCR"],
        optionsEn: ["INTACH", "UNESCO", "Archaeological Survey of India (ASI)", "ICCR"],
        correctIndex: 2,
        explanation: "भारत और इंडोनेशिया के मध्य हुए समझौते के तहत भारतीय पुरातत्व सर्वेक्षण (ASI) इसके संरक्षण व जीर्णोद्धार में मुख्य तकनीकी विशेषज्ञ की भूमिका निभाएगा।",
        explanationEn: "Under the bilateral agreement, the Archaeological Survey of India (ASI) will serve as the technical expert for restoration and conservation."
      },
      {
        question: "प्रंबानन मंदिर के निकट स्थित प्रसिद्ध ज्वालामुखी कौन-सा है?",
        questionEn: "Which famous active volcano is located near the Prambanan Temple?",
        options: ["क्राकाटोआ", "मेरापी", "ब्रोमो", "तंबोरा"],
        optionsEn: ["Krakatoa", "Merapi", "Bromo", "Tambora"],
        correctIndex: 1,
        explanation: "माउंट मेरापी (Mount Merapi) प्रंबानन के निकट स्थित एक सक्रिय ज्वालामुखी है, जिसके 10वीं शताब्दी में हुए विस्फोट से मंदिर को भारी नुकसान हुआ था।",
        explanationEn: "Mount Merapi is an active volcano located near Prambanan. Its eruption in the 10th century is believed to have severely damaged the temple."
      },
      {
        question: "प्रंबानन मंदिर परिसर में कुल कितने मंदिर हैं?",
        questionEn: "How many temples are there in the Prambanan Temple complex?",
        options: ["240", "300", "508", "1008"],
        optionsEn: ["240", "300", "508", "1008"],
        correctIndex: 2,
        explanation: "प्रंबानन मंदिर परिसर में ऐतिहासिक रूप से कुल 508 मंदिर (छोटे-बड़े मिलाकर) मौजूद हैं, जिनमें 240 मुख्य मंदिर शामिल हैं।",
        explanationEn: "The Prambanan temple compound contains a total of 508 temples in its historic layout, which includes 240 primary temples."
      },
      {
        question: "निम्न कथनों पर विचार कीजिए—\n1. प्रंबानन इंडोनेशिया का सबसे बड़ा हिंदू मंदिर परिसर है।\n2. भारत और इंडोनेशिया ने इसके संरक्षण हेतु संयुक्त परियोजना शुरू करने का निर्णय लिया है।\nसही विकल्प चुनिए—",
        questionEn: "Consider the following statements:\n1. Prambanan is the largest Hindu temple complex in Indonesia.\n2. India and Indonesia have decided to launch a joint project for its conservation.\nChoose the correct option:",
        options: ["केवल 1 सही", "केवल 2 सही", "दोनों सही", "दोनों गलत"],
        optionsEn: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
        correctIndex: 2,
        explanation: "दोनों कथन सही हैं। प्रंबानन इंडोनेशिया का सबसे बड़ा हिंदू मंदिर है और दोनों देशों ने हाल ही में इसके संरक्षण के लिए एक संयुक्त परियोजना की घोषणा की है।",
        explanationEn: "Both statements are correct. Prambanan is Indonesia's largest Hindu temple, and both nations have recently announced a joint conservation partnership."
      }
    ],
    sections: [
      {
        _key: "sec-why-news",
        kind: "whyInNews",
        title: "परीक्षा में क्यों महत्वपूर्ण? (Why in News?)",
        titleEn: "Why in News?",
        body: [
          {
            _key: "b1-1",
            _type: "block",
            children: [
              {
                _key: "s1-1",
                _type: "span",
                text: "प्रधानमंत्री नरेंद्र मोदी की इंडोनेशिया यात्रा (जुलाई 2026) के दौरान भारत और इंडोनेशिया ने प्रंबानन मंदिर (Prambanan Temple) के संरक्षण एवं जीर्णोद्धार के लिए संयुक्त परियोजना (Joint Conservation Project) पर सहमति जताई। यह भारत की Act East Policy, सांस्कृतिक कूटनीति (Cultural Diplomacy) तथा ASEAN देशों के साथ विरासत संरक्षण सहयोग का महत्वपूर्ण उदाहरण है।",
              },
            ],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b1-2",
            _type: "block",
            children: [
              {
                _key: "s1-2",
                _type: "span",
                text: "During Prime Minister Narendra Modi's official visit to Indonesia in July 2026, India and Indonesia signed a bilateral agreement to launch a Joint Conservation Project for the restoration and preservation of the historic Prambanan Temple. This project is a crucial milestone in India's Act East Policy, representing a deeper push into cultural diplomacy and heritage conservation collaboration with ASEAN countries.",
              },
            ],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-about-temple",
        kind: "background",
        title: "प्रंबानन मंदिर क्या है? (What is Prambanan Temple?)",
        titleEn: "What is Prambanan Temple?",
        body: [
          {
            _key: "b2-1",
            _type: "block",
            children: [
              {
                _key: "s2-1",
                _type: "span",
                text: "प्रंबानन (Prambanan) इंडोनेशिया का सबसे बड़ा हिंदू मंदिर परिसर है। यह यूनेस्को विश्व धरोहर (UNESCO World Heritage Site) है तथा दक्षिण-पूर्व एशिया में अंगकोर वाट (कंबोडिया) के बाद दूसरा सबसे बड़ा हिंदू मंदिर परिसर माना जाता है।",
              },
            ],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b2-2",
            _type: "block",
            children: [
              {
                _key: "s2-2",
                _type: "span",
                text: "Prambanan is the largest Hindu temple compound in Indonesia and a designated UNESCO World Heritage Site. Located in Central Java, it is considered the second-largest Hindu temple complex in Southeast Asia, surpassed only by the magnificent Angkor Wat in Cambodia.",
              },
            ],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-key-facts",
        kind: "keyHighlights",
        title: "प्रमुख तथ्य एवं इतिहास (Key Facts & History)",
        titleEn: "Key Facts & History",
        body: [
          {
            _key: "b3-1",
            _type: "block",
            children: [{ _key: "s3-1", _type: "span", text: "• स्थान: योग्याकार्ता (Yogyakarta), इंडोनेशिया (योग्याकार्ता से लगभग 17 किमी उत्तर-पूर्व)" }],
            style: "normal",
          },
          {
            _key: "b3-2",
            _type: "block",
            children: [{ _key: "s3-2", _type: "span", text: "• निर्माण: 9वीं शताब्दी (मताराम राजवंश के राजा रकाई पिकाटन द्वारा प्रारंभ)" }],
            style: "normal",
          },
          {
            _key: "b3-3",
            _type: "block",
            children: [{ _key: "s3-3", _type: "span", text: "• कुल परिसर एवं मंदिर: लगभग 40 हेक्टेयर क्षेत्र में विस्तृत, जिसमें कुल 508 मंदिर थे (प्रारंभिक परिसर में लगभग 240 मुख्य मंदिर थे)" }],
            style: "normal",
          },
          {
            _key: "b3-4",
            _type: "block",
            children: [{ _key: "s3-4", _type: "span", text: "• मुख्य देवता: भगवान शिव, भगवान विष्णु एवं भगवान ब्रह्मा (त्रिमूर्ति)। इनमें भगवान शिव का मंदिर सबसे ऊंचा (लगभग 47 मीटर) है।" }],
            style: "normal",
          },
          {
            _key: "b3-5",
            _type: "block",
            children: [{ _key: "s3-5", _type: "span", text: "• वाहन मंदिर: त्रिमूर्ति के वाहनों को समर्पित तीन छोटे मंदिर सामने स्थित हैं— नंदी (शिव), गरुड़ (विष्णु) और हंस (ब्रह्मा)।" }],
            style: "normal",
          },
          {
            _key: "b3-6",
            _type: "block",
            children: [{ _key: "s3-6", _type: "span", text: "• वास्तुकला की विशेषताएँ: रामायण एवं भागवत पुराण के प्रसंगों की अत्यंत सुंदर नक्काशी की गई है। इस पर पल्लव और दक्षिण भारतीय मंदिर वास्तुकला शैली का गहरा प्रभाव दिखाई देता है। यहाँ महिषासुर मर्दिनी (दुर्गा) की प्रसिद्ध प्रतिमा भी स्थापित है।" }],
            style: "normal",
          },
          {
            _key: "b3-7",
            _type: "block",
            children: [{ _key: "s3-7", _type: "span", text: "• इतिहास एवं विनाश: 9वीं सदी में बने इस भव्य परिसर को माउंट मेरापी ज्वालामुखी विस्फोट और भीषण भूकंपों से भारी क्षति पहुंची। 19वीं-20वीं शताब्दी में ब्रिटिश और डच पुरातत्वविदों द्वारा इसकी खोज और आंशिक पुनर्स्थापन का काम शुरू हुआ। 1945 में स्वतंत्रता के बाद इंडोनेशियाई सरकार ने इसका बड़े पैमाने पर पुनर्निर्माण कराया और 1991 में इसे UNESCO विश्व धरोहर घोषित किया गया।" }],
            style: "normal",
          },
          {
            _key: "img-reliefs-block-hi",
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset3._id,
            },
            alt: "प्रंबानन मंदिर की दीवारों पर उकेरी गई रामायण और भागवत पुराण की नक्काशी",
          }
        ],
        bodyEn: [
          {
            _key: "b3-1-en",
            _type: "block",
            children: [{ _key: "s3-1-en", _type: "span", text: "• Location: Yogyakarta, Central Java, Indonesia (approx. 17 km northeast of the city center)" }],
            style: "normal",
          },
          {
            _key: "b3-2-en",
            _type: "block",
            children: [{ _key: "s3-2-en", _type: "span", text: "• Construction: 9th Century AD (Initiated by King Rakai Pikatan of the Hindu Sanjaya/Mataram Dynasty)" }],
            style: "normal",
          },
          {
            _key: "b3-3-en",
            _type: "block",
            children: [{ _key: "s3-3-en", _type: "span", text: "• Layout & Temples: Spread over 40 hectares, the complex historically contained up to 508 structures (including 240 primary temple structures)." }],
            style: "normal",
          },
          {
            _key: "b3-4-en",
            _type: "block",
            children: [{ _key: "s3-4-en", _type: "span", text: "• Main Deities (Trimurti): Dedicated to the Trimurti—Shiva, Vishnu, and Brahma. The Shiva temple is the grandest and tallest in the center, towering at approximately 47 meters." }],
            style: "normal",
          },
          {
            _key: "b3-5-en",
            _type: "block",
            children: [{ _key: "s3-5-en", _type: "span", text: "• Vahana Temples: Three smaller shrines stand directly in front of the Trimurti temples, dedicated to their respective animal mounts: Nandi (Shiva's bull), Garuda (Vishnu's eagle), and Hamsa (Brahma's swan)." }],
            style: "normal",
          },
          {
            _key: "b3-6-en",
            _type: "block",
            children: [{ _key: "s3-6-en", _type: "span", text: "• Architectural Reliefs: Bas-reliefs adorn the inner walls, illustrating scenes from the Hindu epics Ramayana and Bhagavata Purana. The structures show distinct architectural influence from South Indian (Pallava) temple designs, and house a famous Mahishasuramardini (Durga) statue." }],
            style: "normal",
          },
          {
            _key: "b3-7-en",
            _type: "block",
            children: [{ _key: "s3-7-en", _type: "span", text: "• Volcano & Ruins: The complex was abandoned in the 10th century, likely due to a massive eruption of the nearby Mount Merapi volcano and subsequent earthquakes. It lay in ruins until its rediscovery in the early 19th century. Massive reconstruction efforts began under the Dutch and were finalized by the Indonesian Government after 1945, leading to its UNESCO inscription in 1991." }],
            style: "normal",
          },
          {
            _key: "img-reliefs-block-en",
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset3._id,
            },
            alt: "Stone bas-relief carvings illustrating Ramayana stories at Prambanan",
          }
        ],
      },
      {
        _key: "sec-cooperation",
        kind: "importance",
        title: "भारत-इंडोनेशिया सहयोग एवं ASI की भूमिका (Joint Cooperation & ASI's Role)",
        titleEn: "India-Indonesia Cooperation & ASI's Role",
        body: [
          {
            _key: "b4-1",
            _type: "block",
            children: [
              {
                _key: "s4-1",
                _type: "span",
                text: "हाल ही में दोनों देशों के मध्य सांस्कृतिक विरासत के संरक्षण, ऐतिहासिक संबंधों को सुदृढ़ करने तथा 'Shared Heritage' (साझा विरासत) की अवधारणा को मजबूत करने के लिए यह संरक्षण परियोजना प्रारंभ की गई है। इसमें भारतीय पुरातत्व सर्वेक्षण (ASI) प्रमुख तकनीकी विशेषज्ञ की भूमिका निभाएगा।",
              },
            ],
            style: "normal",
          },
          {
            _key: "b4-2",
            _type: "block",
            children: [{ _key: "s4-2", _type: "span", text: "• ASI की अन्य प्रमुख international संरक्षण परियोजनाएँ: भारतीय पुरातत्व सर्वेक्षण इससे पहले भी दक्षिण-पूर्व एशिया में कई ऐतिहासिक स्थलों का जीर्णोद्धार और संरक्षण सफलतापूर्वक कर चुका है:" }],
            style: "normal",
          },
          {
            _key: "b4-3",
            _type: "block",
            children: [{ _key: "s4-3", _type: "span", text: "  - अंगकोर वाट (Angkor Wat) - कंबोडिया" }],
            style: "normal",
          },
          {
            _key: "b4-4",
            _type: "block",
            children: [{ _key: "s4-4", _type: "span", text: "  - ता प्रोहम मंदिर (Ta Prohm) - कंबोडिया" }],
            style: "normal",
          },
          {
            _key: "b4-5",
            _type: "block",
            children: [{ _key: "s4-5", _type: "span", text: "  - वाट फौ मंदिर (Vat Phou) - लाओस" }],
            style: "normal",
          },
          {
            _key: "b4-6",
            _type: "block",
            children: [{ _key: "s4-6", _type: "span", text: "  - माई सोन मंदिर (My Son) - वियतनाम" }],
            style: "normal",
          },
          {
            _key: "b4-7",
            _type: "block",
            children: [{ _key: "s4-7", _type: "span", text: "  - आनंद मंदिर (Ananda Temple) - म्यांमार" }],
            style: "normal",
          },
          {
            _key: "img-wide-block-hi",
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset2._id,
            },
            alt: "प्रंबानन मंदिर के विशाल परिसर का विहंगम दृश्य",
          }
        ],
        bodyEn: [
          {
            _key: "b4-1-en",
            _type: "block",
            children: [
              {
                _key: "s4-1-en",
                _type: "span",
                text: "The joint conservation project is aimed at preserving shared cultural heritage, bolstering bilateral diplomatic ties under India's Act East Policy, and leveraging the technical expertise of the Archaeological Survey of India (ASI).",
              },
            ],
            style: "normal",
          },
          {
            _key: "b4-2-en",
            _type: "block",
            children: [{ _key: "s4-2-en", _type: "span", text: "• ASI's Other Major International Conservation Projects: ASI has a long track record of carrying out conservation and restoration works on major Southeast Asian cultural monuments:" }],
            style: "normal",
          },
          {
            _key: "b4-3-en",
            _type: "block",
            children: [{ _key: "s4-3-en", _type: "span", text: "  - Angkor Wat (Cambodia)" }],
            style: "normal",
          },
          {
            _key: "b4-4-en",
            _type: "block",
            children: [{ _key: "s4-4-en", _type: "span", text: "  - Ta Prohm Temple (Cambodia)" }],
            style: "normal",
          },
          {
            _key: "b4-5-en",
            _type: "block",
            children: [{ _key: "s4-5-en", _type: "span", text: "  - Vat Phou Temple (Laos)" }],
            style: "normal",
          },
          {
            _key: "b4-6-en",
            _type: "block",
            children: [{ _key: "s4-6-en", _type: "span", text: "  - My Son Sanctuary (Vietnam)" }],
            style: "normal",
          },
          {
            _key: "b4-7-en",
            _type: "block",
            children: [{ _key: "s4-7-en", _type: "span", text: "  - Ananda Temple (Myanmar)" }],
            style: "normal",
          },
          {
            _key: "img-wide-block-en",
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset2._id,
            },
            alt: "A panoramic view of the grand Prambanan temple towers and stone ruins",
          }
        ],
      },
    ],
  };

  console.log("✍ Creating currentAffairs document in Sanity...");
  const result = await client.createOrReplace(article);
  console.log(`✔ Success! Document created with ID: ${result._id}`);
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
