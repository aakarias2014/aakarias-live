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
  console.log("🚀 Starting upload process for Jagannath Rath Yatra 2026 Article with SEO FAQs...");

  // Image file paths
  const imagePathWide = path.resolve(process.cwd(), "public/images/blog/jagannath-rath-yatra-2026-wide.jpg");
  const imagePathHorses = path.resolve(process.cwd(), "public/images/blog/jagannath-rath-yatra-2026-horses.jpg");

  if (!fs.existsSync(imagePathWide) || !fs.existsSync(imagePathHorses)) {
    console.error(`❌ Required images not found at public/images/blog/`);
    process.exit(1);
  }

  // 1. Create the Art & Culture tag if it doesn't exist
  console.log("🏷 Creating or fetching Art and Culture tag...");
  const tagDoc = {
    _id: "tag-art-culture",
    _type: "tag",
    name: "Art and Culture",
    slug: { _type: "slug", current: "art-and-culture" },
  };
  await client.createIfNotExists(tagDoc);
  console.log("✔ Art and Culture tag is ready.");

  // 2. Upload the images
  console.log("📸 Uploading Rath Yatra wide featured image...");
  const assetWide = await client.assets.upload("image", fs.createReadStream(imagePathWide), {
    filename: "jagannath_rath_yatra_2026_wide.jpg",
  });
  console.log(`✔ Uploaded wide image. Asset ID: ${assetWide._id}`);

  console.log("📸 Uploading Rath Yatra horses inline image...");
  const assetHorses = await client.assets.upload("image", fs.createReadStream(imagePathHorses), {
    filename: "jagannath_rath_yatra_2026_horses.jpg",
  });
  console.log(`✔ Uploaded horses image. Asset ID: ${assetHorses._id}`);

  // 3. Construct the Article
  const article = {
    _id: "ca-jagannath-rath-yatra-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "jagannath-rath-yatra-2026-complete-notes" },
    title: "जगन्नाथ रथ यात्रा 2026: पुरी से गुंडिचा मंदिर तक आस्था, परंपरा और संस्कृति का विश्वविख्यात महापर्व",
    titleEn: "Jagannath Rath Yatra 2026: The World-Famous Festival of Faith, Tradition, and Culture from Puri to Gundicha",
    excerpt: "16 जुलाई 2026 से प्रारंभ होने वाली भगवान जगन्नाथ की रथ यात्रा उड़ीसा के पुरी में आयोजित की जा रही है। भगवान जगन्नाथ, बलभद्र और देवी सुभद्रा के इस प्राचीन और भव्य उत्सव के धार्मिक, ऐतिहासिक और परीक्षाओं की दृष्टि से महत्वपूर्ण तथ्यों का संपूर्ण विश्लेषण।",
    excerptEn: "Beginning on July 16, 2026, the world-famous Jagannath Rath Yatra commences in Puri, Odisha. This comprehensive analysis covers the religious, historical, and exam-oriented facts of the grand festival.",
    ca_date: "2026-07-16",
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 7,
    keywords: [
      "Jagannath Rath Yatra 2026",
      "Puri Rath Yatra 2026",
      "Nandighosha Chariot",
      "Taladhwaja Chariot",
      "Darpadalan Chariot",
      "Nabakalebara Tradition",
      "Chhera Pahara Ritual",
      "Gajapati Maharaja Puri",
      "Bahuda Yatra 2026",
      "Ahmedabad Rath Yatra 1878",
      "Puri Jagannath Temple History",
      "UPSC Art and Culture Notes",
      "MPPSC History and Culture",
      "जगन्नाथ रथ यात्रा 2026",
      "नंदीघोष रथ",
      "नवकलेवर",
      "छेरा पहरा",
      "बहुदा यात्रा"
    ],
    category: { _type: "reference", _ref: "cat-history" }, // History & Culture
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" },
      { _type: "reference", _ref: "tag-art-culture" },
    ],
    syllabus: ["GS-1", "Prelims-GS"],
    featuredImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: assetWide._id,
      },
      alt: "Jagannath Rath Yatra 2026 - Lord Jagannath, Balabhadra, and Subhadra Chariots in Puri",
    },
    faqs: [
      {
        question: "जगन्नाथ रथ यात्रा 2026 कब से प्रारंभ हो रही है और इसका महत्व क्या है?",
        questionEn: "When does the Jagannath Rath Yatra 2026 begin and what is its significance?",
        answer: "वर्ष 2026 में जगन्नाथ रथ यात्रा 16 जुलाई (आषाढ़ शुक्ल द्वितीया) से प्रारंभ हो रही है। यह यात्रा पुरी (ओडिशा) के मुख्य मंदिर से शुरू होकर गुंडिचा मंदिर (मौसी का घर) तक जाती है। इसका अत्यधिक धार्मिक, सांस्कृतिक और ऐतिहासिक महत्व है, जिसे देखने देश-विदेश से लाखों श्रद्धालु आते हैं।",
        answerEn: "In the year 2026, the Jagannath Rath Yatra begins on July 16 (Ashadha Shukla Dwitiya). The procession travels from the main Jagannatha Temple in Puri (Odisha) to the Gundicha Temple (maternal aunt's home). It holds immense religious, cultural, and historical significance, attracting millions of devotees worldwide."
      },
      {
        question: "नवकलेवर (Nabakalebara) परंपरा क्या है और यह कितने वर्षों के अंतराल पर होती है?",
        questionEn: "What is the Nabakalebara tradition and how often does it occur?",
        answer: "नवकलेवर का अर्थ है 'नया शरीर धारण करना'। यह पुरी जगन्नाथ मंदिर की एक अत्यंत पवित्र और अनोखी परंपरा है। जब आषाढ़ मास में अधिकमास आता है (लगभग 12 से 19 वर्षों में), तब देवताओं की पुरानी काष्ठ (नीम की लकड़ी) की मूर्तियों के स्थान पर नई पवित्र नीम (दारु ब्रह्म) से बनी मूर्तियां स्थापित की जाती हैं।",
        answerEn: "Nabakalebara means 'acquiring a new body'. It is a sacred and unique ritual at the Puri Jagannath Temple. When a double month of Ashadha (Adhikamasa) occurs (typically every 12 to 19 years), the old neem-wood idols of the deities are buried, and new ones carved from sacred neem trees (Daru Brahma) are consecrated."
      },
      {
        question: "भगवान जगन्नाथ, बलभद्र और देवी सुभद्रा के रथों के नाम, पहियों की संख्या और रंग क्या हैं?",
        questionEn: "What are the names, wheel counts, and colors of the three chariots?",
        answer: "पुरी रथ यात्रा में तीनों देवताओं के लिए अलग-अलग रथ होते हैं: 1. भगवान जगन्नाथ का रथ 'नंदीघोष' (16 पहिए, लाल और पीला रंग), 2. भगवान बलभद्र का रथ 'तालध्वज' (14 पहिए, लाल और हरा रंग), और 3. देवी सुभद्रा का रथ 'दर्पदलन' या देवदलन (12 पहिए, लाल और काला रंग) है।",
        answerEn: "The three deities ride on distinct chariots: 1. Lord Jagannath's chariot is 'Nandighosha' (16 wheels, Red & Yellow), 2. Lord Balabhadra's is 'Taladhwaja' (14 wheels, Red & Green), and 3. Goddess Subhadra's is 'Darpadalan' or Devadalan (12 wheels, Red & Black)."
      },
      {
        question: "छेरा पहरा (Chhera Pahara) और पहिंद विधि (Pahind Vidhi) क्या हैं?",
        questionEn: "What are the Chhera Pahara and Pahind Vidhi rituals?",
        answer: "'छेरा पहरा' पुरी रथ यात्रा की प्रमुख रस्म है, जिसमें पुरी के गजपति महाराजा स्वर्ण झाड़ू से रथ के चबूतरे की सफाई करते हैं, जो भगवान के प्रति राजा की विनम्रता का प्रतीक है। वहीं, अहमदाबाद जगन्नाथ रथ यात्रा में रथ की सफाई की इसी रस्म को 'पहिंद विधि' कहा जाता है, जिसे गुजरात के मुख्यमंत्री द्वारा संपन्न किया जाता है।",
        answerEn: "'Chhera Pahara' is the primary sweeping ritual in Puri, where the Gajapati Maharaja cleans the chariot platforms with a golden broom, symbolizing humility. In the Ahmedabad Rath Yatra, this equivalent sweeping ritual is called 'Pahind Vidhi' and is performed by the Chief Minister of Gujarat."
      },
      {
        question: "बहुदा यात्रा (Bahuda Yatra) क्या है?",
        questionEn: "What is the significance of Bahuda Yatra?",
        answer: "गुंडिचा मंदिर में लगभग 7 दिन निवास करने के बाद भगवान जगन्नाथ, बलभद्र और देवी सुभद्रा की मुख्य मंदिर की ओर वापसी यात्रा शुरू होती है। इसी वापसी यात्रा को 'बहुदा यात्रा' (Bahuda Yatra) कहा जाता है।",
        answerEn: "After residing at the Gundicha Temple for approximately 7 days, the deities start their return journey to the main temple. This return procession is called the 'Bahuda Yatra'."
      },
      {
        question: "पुरी रथ यात्रा और अहमदाबाद रथ यात्रा में क्या मुख्य अंतर हैं?",
        questionEn: "What are the main differences between the Puri and Ahmedabad Rath Yatras?",
        answer: "पुरी रथ यात्रा 10वीं-12वीं शताब्दी से शुरू हुई प्राचीन परंपरा है जिसकी दूरी लगभग 3 किमी होती है और मुख्य रस्म छेरा पहरा है। जबकि अहमदाबाद रथ यात्रा 1878 में शुरू हुई, इसकी दूरी लगभग 16 किमी है (भारत की दूसरी सबसे बड़ी यात्रा), और इसकी मुख्य रस्म पहिंद विधि है।",
        answerEn: "The Puri Rath Yatra dates back to the 10th-12th century, covers about 3 km, and features the Chhera Pahara ritual. The Ahmedabad Rath Yatra started in 1878, covers a 16 km long city route (making it the second-largest in India), and features the Pahind Vidhi ritual."
      }
    ],
    mcqs: [
      {
        question: "जगन्नाथ रथ यात्रा किस तिथि को प्रारंभ होती है?",
        questionEn: "On which date does the Jagannath Rath Yatra begin?",
        options: ["चैत्र शुक्ल प्रतिपदा", "आषाढ़ शुक्ल द्वितीया", "श्रावण पूर्णिमा", "कार्तिक पूर्णिमा"],
        optionsEn: ["Chaitra Shukla Pratipada", "Ashadha Shukla Dwitiya", "Shravana Purnima", "Kartika Purnima"],
        correctIndex: 1,
        explanation: "जगन्नाथ रथ यात्रा प्रत्येक वर्ष आषाढ़ मास के शुक्ल पक्ष की द्वितीया तिथि को प्रारंभ होती है। वर्ष 2026 में यह 16 जुलाई को शुरू हुई।",
        explanationEn: "The Jagannath Rath Yatra begins every year on the Dwitiya (second day) of the Shukla Paksha (bright fortnight) in the month of Ashadha. In 2026, it commenced on July 16."
      },
      {
        question: "भगवान जगन्नाथ के रथ का नाम क्या है?",
        questionEn: "What is the name of Lord Jagannath's chariot?",
        options: ["तालध्वज", "दर्पदलन", "नंदीघोष", "गरुड़ध्वज"],
        optionsEn: ["Taladhwaja", "Darpadalan", "Nandighosha", "Garudadhwaja"],
        correctIndex: 2,
        explanation: "भगवान जगन्नाथ के रथ को 'नंदीघोष' कहा जाता है। बलभद्र के रथ को 'तालध्वज' और सुभद्रा के रथ को 'दर्पदलन' (या देवदलन) कहते हैं।",
        explanationEn: "Lord Jagannath's chariot is named 'Nandighosha'. Lord Balabhadra's is 'Taladhwaja' and Goddess Subhadra's is 'Darpadalan' (or Devadalan)."
      },
      {
        question: "नवकलेवर का संबंध किससे है?",
        questionEn: "What is the significance of Nabakalebara?",
        options: ["मंदिर निर्माण", "रथ निर्माण", "नई काष्ठ प्रतिमाओं के निर्माण", "ध्वजारोहण"],
        optionsEn: ["Temple construction", "Chariot construction", "Creation of new wooden idols", "Flag hoisting"],
        correctIndex: 2,
        explanation: "नवकलेवर पुरी मंदिर की एक अनोखी परंपरा है जिसमें लगभग 12-19 वर्षों में देवताओं की पुरानी काष्ठ मूर्तियों को बदलकर नई मूर्तियों का निर्माण किया जाता है।",
        explanationEn: "Nabakalebara is a unique ritual in Puri where the old wooden idols of the deities are replaced with newly carved ones, typically every 12 to 19 years."
      },
      {
        question: "छेरा पहरा परंपरा कौन निभाता है?",
        questionEn: "Who performs the Chhera Pahara ritual?",
        options: ["मुख्य पुजारी", "मुख्यमंत्री", "गजपति महाराजा", "शंकराचार्य"],
        optionsEn: ["Chief Priest", "Chief Minister", "Gajapati Maharaja", "Shankaracharya"],
        correctIndex: 2,
        explanation: "छेरा पहरा की रस्म पुरी के गजपति महाराजा द्वारा निभाई जाती है, जिसमें वे स्वर्ण झाड़ू से रथ के चबूतरे की सफाई करते हैं जो राजा द्वारा स्वयं को भगवान का सेवक मानने का प्रतीक है।",
        explanationEn: "The Chhera Pahara ritual is performed by the Gajapati Maharaja of Puri, who cleans the chariots using a golden broom, symbolizing that even the ruler is a humble servant of the Lord."
      },
      {
        question: "बहुदा यात्रा क्या है?",
        questionEn: "What is Bahuda Yatra?",
        options: ["रथ निर्माण", "भगवान की वापसी यात्रा", "स्नान पूर्णिमा", "नवयौवन दर्शन"],
        optionsEn: ["Chariot construction", "Return journey of the deities", "Snana Purnima", "Nabayoubana Darshan"],
        correctIndex: 1,
        explanation: "रथ यात्रा की वापसी यात्रा को 'बहुदा यात्रा' (Bahuda Yatra) कहा जाता है, जब भगवान गुंडिचा मंदिर से पुनः मुख्य मंदिर लौटते हैं।",
        explanationEn: "The return journey of the deities from the Gundicha Temple back to the main Jagannath temple is known as 'Bahuda Yatra'."
      },
      {
        question: "अहमदाबाद रथ यात्रा कब प्रारंभ हुई?",
        questionEn: "When did the Ahmedabad Rath Yatra start?",
        options: ["1750", "1805", "1878", "1905"],
        optionsEn: ["1750", "1805", "1878", "1905"],
        correctIndex: 2,
        explanation: "अहमदाबाद में रथ यात्रा वर्ष 1878 में जमालपुर जगन्नाथ मंदिर से महंत नरसिंहदास जी के नेतृत्व में प्रारंभ की गई थी।",
        explanationEn: "The Ahmedabad Rath Yatra was started in the year 1878 from the Jamalpur Jagannath Temple under the leadership of Mahant Narsinghdas ji."
      },
      {
        question: "जगन्नाथ मंदिर का निर्माण किस राजा ने कराया था?",
        questionEn: "Which king constructed the Jagannath Temple?",
        options: ["नरसिंहदेव", "अनंतवर्मन चोडगंग देव", "अशोक", "कृष्णदेवराय"],
        optionsEn: ["Narasimhadeva", "Anantavarman Chodaganga Deva", "Ashoka", "Krishnadevaraya"],
        correctIndex: 1,
        explanation: "पुरी के जगन्नाथ मंदिर के मुख्य भाग का निर्माण 12वीं शताब्दी में पूर्वी गंगा वंश के राजा अनंतवर्मन चोडगंग देव ने कराया था।",
        explanationEn: "The construction of the main temple of Jagannath at Puri was commissioned in the 12th century by King Anantavarman Chodaganga Deva of the Eastern Ganga dynasty."
      },
      {
        question: "जगन्नाथ मंदिर भारत के किन तीर्थों में शामिल है?",
        questionEn: "Under which group of holy sites in India is the Jagannath Temple classified?",
        options: ["शक्तिपीठ", "ज्योतिर्लिंग", "चार धाम", "सप्तपुरी"],
        optionsEn: ["Shakti Peethas", "Jyotirlingas", "Char Dham", "Saptapuri"],
        correctIndex: 2,
        explanation: "पुरी का जगन्नाथ मंदिर भारत के प्रसिद्ध 'चार धाम' (बद्रीनाथ, द्वारका, पुरी और रामेश्वरम) में से एक है।",
        explanationEn: "The Jagannath Temple in Puri is one of India's famous 'Char Dham' pilgrimage sites, along with Badrinath, Dwarka, and Rameswaram."
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
            style: "normal",
            children: [
              {
                _key: "s1-1",
                _type: "span",
                text: "भगवान जगन्नाथ रथ यात्रा भारत के सबसे प्राचीन एवं विशाल धार्मिक आयोजनों में से एक है। वर्ष 2026 में यह यात्रा 16 जुलाई से प्रारंभ हुई। इस अवसर पर भगवान जगन्नाथ, बलभद्र और देवी सुभद्रा तीन अलग-अलग रथों पर सवार होकर पुरी जगन्नाथ मंदिर से गुंडिचा मंदिर तक प्रस्थान करते हैं। यह पर्व धार्मिक, सांस्कृतिक, ऐतिहासिक तथा पर्यटन की दृष्टि से अत्यंत महत्वपूर्ण है और UPSC, MPPSC सहित सभी प्रतियोगी परीक्षाओं में बार-बार पूछा जाता है।"
              }
            ]
          },
          {
            _key: "img-wide-block-hi",
            _type: "image",
            asset: {
              _type: "reference",
              _ref: assetWide._id,
            },
            alt: "पुरी में भगवान जगन्नाथ, बलभद्र और देवी सुभद्रा के तीनों दिव्य रथ",
          }
        ],
        bodyEn: [
          {
            _key: "b1-2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1-2",
                _type: "span",
                text: "The Jagannath Rath Yatra is one of the oldest and largest religious celebrations in India. In the year 2026, this grand chariot festival commenced on July 16. On this occasion, Lord Jagannath, Lord Balabhadra, and Goddess Subhadra ride on three distinct wooden chariots from the main Puri Jagannath Temple to the Gundicha Temple. This festival is highly significant from cultural, historical, religious, and tourism standpoints, making it an essential topic for UPSC, MPPSC, and other competitive examinations."
              }
            ]
          },
          {
            _key: "img-wide-block-en",
            _type: "image",
            asset: {
              _type: "reference",
              _ref: assetWide._id,
            },
            alt: "The three grand wooden chariots of Lord Jagannath, Balabhadra, and Goddess Subhadra in Puri",
          }
        ]
      },
      {
        _key: "sec-about-deities",
        kind: "background",
        title: "भगवान जगन्नाथ और नवकलेवर (Who is Lord Jagannath?)",
        titleEn: "Lord Jagannath & the Nabakalebara Tradition",
        body: [
          {
            _key: "b2-1",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-1",
                _type: "span",
                text: "• भगवान जगन्नाथ: 'जगन्नाथ' का अर्थ है जगत के नाथ (विश्व के स्वामी)। पुरी मंदिर में तीन प्रमुख देवता विराजमान हैं— भगवान जगन्नाथ (श्रीकृष्ण का स्वरूप), भगवान बलभद्र (बलराम) और देवी सुभद्रा। विशेष बात यह है कि तीनों की मूर्तियाँ काष्ठ (नीम की लकड़ी) से निर्मित होती हैं।"
              }
            ]
          },
          {
            _key: "b2-2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-2",
                _type: "span",
                text: "• नवकलेवर (Nabakalebara): पुरी मंदिर की सबसे अनोखी परंपरा। इसका अर्थ है 'नया शरीर धारण करना'। जब आषाढ़ मास में अधिकमास आता है (लगभग 12-19 वर्षों के अंतराल पर), तब तीनों देवताओं की पुरानी मूर्तियों को विसर्जित कर नई मूर्तियां पवित्र नीम की लकड़ी (दारु ब्रह्म) से बनाई जाती हैं। यह चक्र आत्मा के पुनर्जन्म के सार्वभौमिक नियम का प्रतिनिधित्व करता है।"
              }
            ]
          },
          {
            _key: "b2-3",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-3",
                _type: "span",
                text: "• रथ यात्रा का उद्देश्य: धार्मिक मान्यता के अनुसार भगवान जगन्नाथ अपनी बहन सुभद्रा और भाई बलभद्र के साथ अपनी मौसी (गुंडिचा मंदिर) के घर जाते हैं। एक अन्य मान्यता के अनुसार, भगवान अपनी प्रजा को दर्शन देने स्वयं मंदिर से बाहर निकलते हैं ताकि सभी जाति और वर्ग के लोग (विशेष रूप से जिन्हें पारंपरिक रूप से प्रवेश नहीं मिलता था) उनके दर्शन कर सकें।"
              }
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b2-1-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-1-en",
                _type: "span",
                text: "• Who is Lord Jagannath: The word 'Jagannath' means the 'Lord of the Universe'. The main temple at Puri houses three major deities—Lord Jagannath (representing Sri Krishna), Lord Balabhadra (his elder brother), and Goddess Subhadra (his younger sister). Uniquely, the idols of these deities are carved out of wood (specifically, neem wood) rather than metal or stone."
              }
            ]
          },
          {
            _key: "b2-2-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-2-en",
                _type: "span",
                text: "• Nabakalebara Tradition: This is the most famous and unique ritual of the temple. The term literally translates to 'acquiring a new body'. Whenever a double month of Ashadha (Adhikamasa) occurs (usually every 12 to 19 years), the old wooden idols are buried, and new ones are carved from specially selected sacred neem trees (Daru Brahma). This represents the transmigration of the soul."
              }
            ]
          },
          {
            _key: "b2-3-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2-3-en",
                _type: "span",
                text: "• Purpose of the Yatra: According to religious beliefs, Lord Jagannath, along with his siblings, visits their maternal aunt's home at the Gundicha Temple during this period. Another popular philosophy is that the deities emerge from the sanctum sanctorum to meet the common public directly, offering access and salvation to all classes of society irrespective of caste or background."
              }
            ]
          }
        ]
      },
      {
        _key: "sec-chariots",
        kind: "keyHighlights",
        title: "तीनों रथों की वास्तुकला एवं विशेषताएं (The Three Chariots)",
        titleEn: "The Three Chariots: Architecture and Specifications",
        body: [
          {
            _key: "b3-1",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-1",
                _type: "span",
                text: "रथ यात्रा के तीनों रथों का निर्माण अक्षय तृतीया से शुरू होता है और प्रत्येक रथ का अपना रंग, आकार और पहियों की संख्या होती है:"
              }
            ]
          },
          {
            _key: "b3-2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-2",
                _type: "span",
                text: "• 1. नंदीघोष (Nandighosha): भगवान जगन्नाथ का रथ। यह सबसे बड़ा रथ है जिसमें 16 पहिए होते हैं। इसका रंग लाल और पीला होता है, और यह ज्ञान एवं धर्म का प्रतीक माना जाता है।"
              }
            ]
          },
          {
            _key: "b3-3",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-3",
                _type: "span",
                text: "• 2. तालध्वज (Taladhwaja): भगवान बलभद्र का रथ। इसमें 14 पहिए होते हैं। इसका रंग लाल और हरा होता है, और यह शक्ति एवं कृषि का प्रतीक माना जाता है।"
              }
            ]
          },
          {
            _key: "b3-4",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-4",
                _type: "span",
                text: "• 3. दर्पदलन या देवदलन (Darpadalan): देवी सुभद्रा का रथ। इसमें 12 पहिए होते हैं। इसका रंग लाल और काला होता है, जो शक्ति एवं संरक्षण का प्रतीक है।"
              }
            ]
          },
          {
            _key: "b3-5",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-5",
                _type: "span",
                text: "• रथ निर्माण की मुख्य विशेषताएं: रथ प्रत्येक वर्ष नए सिरे से बनाए जाते हैं। निर्माण में आधुनिक मशीनों का उपयोग नहीं किया जाता। लगभग 200 पारंपरिक कारीगर निर्माण कार्य करते हैं। रथ निर्माण के लिए फासी, धौरा, असान एवं सिमिली प्रजातियों की लकड़ियों का उपयोग किया जाता है जो स्थानीय जंगलों से लाई जाती हैं।"
              }
            ]
          },
          {
            _key: "img-horses-block-hi",
            _type: "image",
            asset: {
              _type: "reference",
              _ref: assetHorses._id,
            },
            alt: "सजे-धजे घोड़ों और पारंपरिक नक्काशी से सजा भगवान का रथ",
          }
        ],
        bodyEn: [
          {
            _key: "b3-1-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-1-en",
                _type: "span",
                text: "The construction of the three giant chariots begins on the auspicious day of Akshay Tritiya. Each chariot has specific dimensions, colors, and number of wheels:"
              }
            ]
          },
          {
            _key: "b3-2-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-2-en",
                _type: "span",
                text: "• 1. Nandighosha: The chariot of Lord Jagannath. It is the largest of the three, standing on 16 wheels. Adorned with red and yellow cloths, it symbolizes knowledge, cosmic balance, and righteousness (Dharma)."
              }
            ]
          },
          {
            _key: "b3-3-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-3-en",
                _type: "span",
                text: "• 2. Taladhwaja: The chariot of Lord Balabhadra. It has 14 wheels and is decorated in red and green colors, symbolizing strength and agriculture."
              }
            ]
          },
          {
            _key: "b3-4-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-4-en",
                _type: "span",
                text: "• 3. Darpadalan (also known as Devadalan): The chariot of Goddess Subhadra. Standing on 12 wheels, it is decorated in red and black, symbolizing cosmic energy and protection."
              }
            ]
          },
          {
            _key: "b3-5-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s3-5-en",
                _type: "span",
                text: "• Construction Highlights: The chariots are constructed fresh every year. No metal nails or modern machinery are used in the process. Over 200 hereditary carpenters (Maharanas) work continuously. The wood is sourced from specific local tree species like Phasi, Dhaura, Asan, and Simili."
              }
            ]
          },
          {
            _key: "img-horses-block-en",
            _type: "image",
            asset: {
              _type: "reference",
              _ref: assetHorses._id,
            },
            alt: "A beautifully decorated chariot with ceremonial horses and intricate traditional carvings",
          }
        ]
      },
      {
        _key: "sec-rituals",
        kind: "keyAspects",
        title: "रथ यात्रा की प्रमुख परंपराएँ (Major Rituals)",
        titleEn: "Key Rituals and Ceremonies",
        body: [
          {
            _key: "b4-1",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-1",
                _type: "span",
                text: "यात्रा के दौरान कई महत्वपूर्ण पारंपरिक रस्में निभाई जाती हैं:"
              }
            ]
          },
          {
            _key: "b4-2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-2",
                _type: "span",
                text: "• स्नान पूर्णिमा: ज्येष्ठ पूर्णिमा के दिन 108 कलशों के जल से भगवान का महाअभिषेक किया जाता है।"
              }
            ]
          },
          {
            _key: "b4-3",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-3",
                _type: "span",
                text: "• अणसर (Anasara): स्नान के बाद भगवान लगभग 14-15 दिनों तक बीमार माने जाते हैं और वे एक एकांत कक्ष में विश्राम करते हैं। इस अवधि में भक्तों के लिए दर्शन पूरी तरह बंद रहते हैं।"
              }
            ]
          },
          {
            _key: "b4-4",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-4",
                _type: "span",
                text: "• छेरा पहरा (Chhera Pahara): पुरी के गजपति महाराजा स्वर्ण झाड़ू से रथ के चबूतरे की सफाई करते हैं और उस पर सुगंधित जल छिड़कते हैं। यह दर्शाता है कि भगवान के समक्ष राजा और प्रजा दोनों समान हैं।"
              }
            ]
          },
          {
            _key: "b4-5",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-5",
                _type: "span",
                text: "• गुंडिचा यात्रा एवं बहुदा यात्रा: भगवान रथ यात्रा से गुंडिचा मंदिर पहुंचते हैं, जहां वे 7 दिन निवास करते हैं। इसके बाद होने वाली वापसी यात्रा को 'बहुदा यात्रा' कहा जाता है।"
              }
            ]
          },
          {
            _key: "b4-6",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-6",
                _type: "span",
                text: "• नीलाद्रि बीजे: भगवान का पुनः मुख्य मंदिर में प्रवेश। इस दिन देवी लक्ष्मी के क्रोध को शांत करने के लिए भगवान जगन्नाथ उन्हें रसगुल्ला अर्पित करते हैं।"
              }
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b4-1-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-1-en",
                _type: "span",
                text: "The festival unfolds through a sequence of historic ceremonies:"
              }
            ]
          },
          {
            _key: "b4-2-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-2-en",
                _type: "span",
                text: "• Snana Purnima: The deities are given a ceremonial bath with 108 pitchers of herbal-scented water on Jyeshtha Purnima."
              }
            ]
          },
          {
            _key: "b4-3-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-3-en",
                _type: "span",
                text: "• Anasara (Sick Period): After the grand bath, the deities are believed to catch a fever and are kept in isolation (Anasara Ghara) for 14-15 days. No public viewing is allowed."
              }
            ]
          },
          {
            _key: "b4-4-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-4-en",
                _type: "span",
                text: "• Chhera Pahara: The titular king of Puri, Gajapati Maharaja, sweeps the floor of the chariots with a golden broom. This powerful ritual establishes that in the eyes of the divine, the king and a commoner are equals."
              }
            ]
          },
          {
            _key: "b4-5-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-5-en",
                _type: "span",
                text: "• Gundicha & Bahuda Yatra: The onward journey is Gundicha Yatra, where the deities reside at Gundicha temple for a week. The return journey after nine days is called the Bahuda Yatra."
              }
            ]
          },
          {
            _key: "b4-6-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s4-6-en",
                _type: "span",
                text: "• Niladri Bije: The re-entry of the deities into the main temple. On this day, Lord Jagannath offers Rasgulla to Goddess Lakshmi to appease her anger for being left behind."
              }
            ]
          }
        ]
      },
      {
        _key: "sec-comparison",
        kind: "factsAtAGlance",
        title: "पुरी एवं अहमदाबाद रथ यात्रा में अंतर (Puri vs Ahmedabad)",
        titleEn: "Puri vs Ahmedabad Rath Yatra: Key Differences",
        body: [
          {
            _key: "b5-1",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s5-1",
                _type: "span",
                text: "भारत की दो सबसे बड़ी रथ यात्राओं में कुछ प्रमुख अंतर हैं जो परीक्षाओं के लिए महत्वपूर्ण हैं:"
              }
            ]
          },
          {
            _key: "b5-2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s5-2",
                _type: "span",
                text: "• पुरी रथ यात्रा (ओडिशा): इसकी परंपरा 10वीं-12वीं शताब्दी (पूर्वी गंगा राजवंश) से चली आ रही है। यह यात्रा लगभग 3 किमी की दूरी तय कर गुंडिचा मंदिर पहुंचती है। यहाँ रथ की सफाई की रस्म को 'छेरा पहरा' कहते हैं, जिसे गजपति महाराजा संपन्न करते हैं। यह विश्व की सबसे बड़ी रथ यात्रा है।"
              }
            ]
          },
          {
            _key: "b5-3",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s5-3",
                _type: "span",
                text: "• अहमदाबाद रथ यात्रा (गुजरात): यह यात्रा वर्ष 1878 में महंत नरसिंहदास जी द्वारा जमालपुर जगन्नाथ मंदिर से शुरू की गई थी। यह लगभग 16 किमी लंबी दूरी तय कर पूरे शहर की परिक्रमा करती है। यहाँ रथ की सफाई की रस्म को 'पहिंद विधि' कहते हैं, जिसे पारंपरिक रूप से गुजरात के मुख्यमंत्री संपन्न करते हैं। यह भारत की दूसरी सबसे बड़ी रथ यात्रा है।"
              }
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b5-1-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s5-1-en",
                _type: "span",
                text: "There are key differences between the two largest Rath Yatras of India (Puri and Ahmedabad):"
              }
            ]
          },
          {
            _key: "b5-2-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s5-2-en",
                _type: "span",
                text: "• Puri Rath Yatra (Odisha): Active since the 10th-12th century (Ganga Dynasty). The chariots travel a distance of about 3 km to the Gundicha temple. The sweeping ritual is called 'Chhera Pahara' and is performed by the Gajapati Maharaja. It is the most famous and largest chariot festival globally."
              }
            ]
          },
          {
            _key: "b5-3-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s5-3-en",
                _type: "span",
                text: "• Ahmedabad Rath Yatra (Gujarat): Started in 1878 by Mahant Narsinghdas ji at the Jamalpur Jagannath temple. It covers a large circuit of about 16 km through the old city. The sweeping ritual is called 'Pahind Vidhi' and is traditionally performed by the Chief Minister of Gujarat. It is the second-largest Rath Yatra in India."
              }
            ]
          }
        ]
      },
      {
        _key: "sec-history-exam",
        kind: "importance",
        title: "ऐतिहासिक पृष्ठभूमि एवं धार्मिक महत्व (Historical Background)",
        titleEn: "Historical Background & Religious Significance",
        body: [
          {
            _key: "b6-1",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s6-1",
                _type: "span",
                text: "• ऐतिहासिक निर्माण: वर्तमान पुरी जगन्नाथ मंदिर का निर्माण 12वीं शताब्दी में पूर्वी गंगा राजवंश के राजा अनंतवर्मन चोडगंग देव ने कराया था। मंदिर का वास्तुकला स्वरूप कलिंग शैली (Kalinga Architecture) का उत्कृष्ट उदाहरण है।"
              }
            ]
          },
          {
            _key: "b6-2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s6-2",
                _type: "span",
                text: "• साहित्यिक उल्लेख: इस रथ यात्रा का वर्णन स्कंद पुराण, ब्रह्म पुराण और पद्म पुराण जैसे प्राचीन हिंदू ग्रंथों में मिलता है।"
              }
            ]
          },
          {
            _key: "b6-3",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s6-3",
                _type: "span",
                text: "• चार धाम: पुरी का जगन्नाथ मंदिर भारत के चार वैष्णव धामों (बद्रीनाथ, द्वारका, पुरी और रामेश्वरम) में से एक है।"
              }
            ]
          },
          {
            _key: "b6-4",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s6-4",
                _type: "span",
                text: "• वेद स्वरूप: धार्मिक मान्यताओं में भगवान जगन्नाथ को सामवेद का, बलभद्र को ऋग्वेद का, देवी सुभद्रा को यजुर्वेद का और सुदर्शन चक्र को अथर्ववेद का प्रतीक माना गया है।"
              }
            ]
          }
        ],
        bodyEn: [
          {
            _key: "b6-1-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s6-1-en",
                _type: "span",
                text: "• Historical Construction: The main structure of the current Puri temple was built in the 12th century by King Anantavarman Chodaganga Deva of the Eastern Ganga dynasty. The temple represents the zenith of Kalinga temple architecture."
              }
            ]
          },
          {
            _key: "b6-2-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s6-2-en",
                _type: "span",
                text: "• Scriptural Mentions: The chariot festival finds detailed mentions in ancient Hindu Puranas, including the Skanda Purana, Brahma Purana, and Padma Purana."
              }
            ]
          },
          {
            _key: "b6-3-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s6-3-en",
                _type: "span",
                text: "• The Char Dham: The Shree Jagannatha Temple at Puri is one of the four sacred Char Dham pilgrimage sites (Badrinath, Dwarka, Puri, and Rameswaram)."
              }
            ]
          },
          {
            _key: "b6-4-en",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s6-4-en",
                _type: "span",
                text: "• Vedic Representation: In Vaishnava theology, Lord Jagannath represents Samaveda, Lord Balabhadra represents Rigveda, Goddess Subhadra represents Yajurveda, and the Sudarshana Chakra represents Atharvaveda."
              }
            ]
          }
        ]
      }
    ]
  };

  console.log("✍ Creating currentAffairs document in Sanity...");
  const result = await client.createOrReplace(article);
  console.log(`✔ Success! Document created/replaced with ID: ${result._id}`);
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
