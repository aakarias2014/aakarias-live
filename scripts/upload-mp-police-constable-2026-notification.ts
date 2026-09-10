import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !dataset || !token) {
  console.error("❌ Missing Sanity environment variables in .env.local!");
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
  console.log("👮 Uploading MP Police Constable Vacancy 2026 Notification to Sanity CMS...");

  const thumbnailPath = "/Users/aakariastech/.gemini/antigravity-ide/brain/fd3a9409-fc40-42fe-b9fb-a975a01b25dd/.user_uploaded/media_1789050430222.jpg";

  console.log("📸 Uploading Thumbnail Asset to Sanity CMS...");
  const thumbAsset = await client.assets.upload("image", fs.createReadStream(thumbnailPath), {
    filename: "mp-police-constable-recruitment-2026-thumbnail.jpg",
    contentType: "image/jpeg",
  });
  console.log("✔ Uploaded Thumbnail Asset ID:", thumbAsset._id);

  const docId = "mp-police-constable-recruitment-2026";

  const faqs = [
    {
      _key: "faq1",
      question: "MP Police Constable भर्ती 2026 में कुल कितने पदों पर विज्ञापन जारी हुआ है?",
      answer: "मध्य प्रदेश पुलिस भर्ती 2026 में कुल 7,500 पदों पर सीधी भर्ती का विज्ञापन जारी हुआ है, जिसमें 6,800 पद आरक्षक GD (Non-SAF) तथा 700 पद आरक्षक GD (SAF - केवल पुरुष) के लिए हैं।",
      questionEn: "How many total vacancies are advertised in MP Police Constable Recruitment 2026?",
      answerEn: "A total of 7,500 vacancies have been advertised in MP Police Constable 2026, comprising 6,800 GD Non-SAF posts and 700 GD SAF Male posts."
    },
    {
      _key: "faq2",
      question: "MP Police Constable 2026 के लिए ऑनलाइन आवेदन प्रारंभ व अंतिम तिथि क्या है?",
      answer: "ऑनलाइन आवेदन प्रारंभ होने की तिथि 22 सितंबर 2026 है तथा आवेदन करने की अंतिम तिथि 06 अक्टूबर 2026 है। फॉर्म में संशोधन 11 अक्टूबर 2026 तक किए जा सकेंगे।",
      questionEn: "What are the start and end dates for MP Police Constable 2026 online applications?",
      answerEn: "Online applications start on 22 September 2026 and close on 06 October 2026. Application corrections can be made till 11 October 2026."
    },
    {
      _key: "faq3",
      question: "MP Police Constable पद हेतु अनिवार्य शैक्षणिक योग्यता क्या है?",
      answer: "सामान्य, ओबीसी तथा एससी वर्ग के अभ्यर्थियों के लिए मान्यता प्राप्त बोर्ड से 10वीं उत्तीर्ण होना अनिवार्य है। अनुसूचित जनजाति (ST) वर्ग के अभ्यर्थी यदि केवल 8वीं उत्तीर्ण हैं, तो भी वे आवेदन कर सकते हैं।",
      questionEn: "What is the mandatory educational qualification for MP Police Constable?",
      answerEn: "Candidates of General, OBC, and SC categories must be 10th Pass. ST category candidates who have passed 8th class are also eligible."
    },
    {
      _key: "faq4",
      question: "MP Police Constable भर्ती में आयु सीमा कितनी निर्धारित है?",
      answer: "न्यूनतम आयु 18 वर्ष तथा अधिकतम आयु 33 वर्ष (06 अक्टूबर 2026 को) निर्धारित है। मध्य प्रदेश के SC/ST/OBC पुरुष तथा सभी वर्ग की महिला अभ्यर्थियों को अधिकतम आयु सीमा में 5 वर्ष की छूट (38 वर्ष तक) प्रदान की जाएगी।",
      questionEn: "What is the age limit for MP Police Constable Recruitment 2026?",
      answerEn: "The age limit is 18 to 33 years as on 06 October 2026. MP Domicile SC/ST/OBC males and all female candidates get 5 years age relaxation (up to 38 years)."
    },
    {
      _key: "faq5",
      question: "MP Police Constable परीक्षा पैटर्न में कितने प्रश्न होते हैं और क्या निगेटिव मार्किंग होती है?",
      answer: "लिखित परीक्षा में कुल 100 बहुविकल्पीय प्रश्न (100 अंक) पूछे जाते हैं जिसकी समयावधि 2 घंटे (120 मिनट) होती है। परीक्षा में कोई भी निगेटिव मार्किंग (Negative Marking) नहीं होती है।",
      questionEn: "How many questions are in MP Police Constable exam and is there negative marking?",
      answerEn: "The written exam consists of 100 MCQs (100 Marks) for a duration of 2 Hours (120 Mins). There is NO negative marking."
    },
    {
      _key: "faq6",
      question: "लिखित परीक्षा में किन-किन विषयों से प्रश्न पूछे जाते हैं?",
      answer: "1. सामान्य ज्ञान एवं तार्किक ज्ञान (40 अंक), 2. बौद्धिक क्षमता एवं मानसिक अभिरुचि (30 अंक), 3. विज्ञान एवं सरल अंकगणित (30 अंक)।",
      questionEn: "What are the subject-wise marks in MP Police Constable exam?",
      answerEn: "1. General Knowledge & Reasoning (40 Marks), 2. Intellectual Ability & Mental Aptitude (30 Marks), 3. Science & Simple Arithmetic (30 Marks)."
    },
    {
      _key: "faq7",
      question: "MP Police Constable पुरुष अभ्यर्थियों के लिए शारीरिक मापदंड (Height & Chest) क्या हैं?",
      answer: "सामान्य/ओबीसी पुरुष अभ्यर्थियों की न्यूनतम ऊंचाई 168 सेमी तथा सीना बिना फुलाए 79 सेमी व फुलाने पर 84 सेमी होना चाहिए। एससी/एसटी पुरुष अभ्यर्थियों के लिए न्यूनतम ऊंचाई 165 सेमी है।",
      questionEn: "What are the physical height and chest standards for male candidates?",
      answerEn: "General/OBC males require minimum height of 168 cm and chest 79-84 cm. SC/ST males require minimum height of 165 cm."
    },
    {
      _key: "faq8",
      question: "MP Police Constable महिला अभ्यर्थियों के लिए न्यूनतम ऊंचाई मापदंड क्या है?",
      answer: "सभी वर्गों की महिला अभ्यर्थियों के लिए न्यूनतम ऊंचाई 155 सेमी से 157 सेमी निर्धारित की गई है।",
      questionEn: "What is the minimum height requirement for female candidates?",
      answerEn: "Female candidates of all categories require a minimum height of 155 cm to 157 cm."
    },
    {
      _key: "faq9",
      question: "मध्य प्रदेश पुलिस कॉन्स्टेबल को प्रोबेशन काल के दौरान कितना वेतन (Salary) मिलता है?",
      answer: "पे मैट्रिक्स लेवल 4 (₹19,500 – ₹62,000/-) के तहत पहले साल 70% स्टाइपेंड, दूसरे साल 80% स्टाइपेंड, तीसरे साल 90% स्टाइपेंड तथा चौथे साल से 100% पूर्ण वेतन मिलता है।",
      questionEn: "What is the monthly salary and probation stipend for MP Police Constable?",
      answerEn: "Under Level 4 pay scale (₹19,500 – ₹62,000/-), 1st year stipend is 70%, 2nd year 80%, 3rd year 90%, and 100% full salary from the 4th year."
    },
    {
      _key: "faq10",
      question: "MP Police Constable 2026 लिखित परीक्षा की संभावित तिथि क्या है?",
      answer: "MPESB द्वारा जारी कार्यक्रम के अनुसार लिखित परीक्षा 19 नवंबर 2026 (गुरुवार) से प्रारंभ होकर विभिन्न पालियों में आयोजित की जाएगी।",
      questionEn: "What is the expected exam date for MP Police Constable 2026?",
      answerEn: "As per the MPESB schedule, written exams are slated to start from 19 November 2026 across multiple shifts."
    }
  ];

  const notificationDoc = {
    _id: docId,
    _type: "notification",
    title: "MP Police Constable Vacancy 2026: 7500 पदों पर निकली भर्ती, 10वीं पास करें ऑनलाइन आवेदन | MPESB Rulebook & Exam Date",
    titleEn: "MP Police Constable Recruitment 2026 Notification Out (7500 Posts): MPESB Syllabus, Age Limit & Apply Online",
    slug: {
      _type: "slug",
      current: docId,
    },
    exam: "MP Police / ESB",
    date: "2026-09-10T10:00:00Z",
    status: "out",
    url: "https://esb.mp.gov.in",
    officialPdfUrl: "https://esb.mp.gov.in",
    applyOnlineUrl: "https://esb.mponline.gov.in/Portal/Examinations/Vyapam/examsList.aspx",
    youtubeUrl: "https://youtube.com/live/PaP_uUtYGMU?feature=share",
    totalPosts: "7,500 पद (6,800 GD Non-SAF + 700 GD SAF Male)",
    totalPostsEn: "7,500 Posts (6,800 GD Non-SAF + 700 GD SAF Male)",
    ageLimit: "18 से 33 वर्ष (आरक्षित/महिला: 38 वर्ष)",
    ageLimitEn: "18 to 33 Years (38 Years for MP Reserved/Females)",
    qualification: "10वीं उत्तीर्ण (ST वर्ग हेतु 8वीं उत्तीर्ण)",
    qualificationEn: "10th Class Pass (8th Pass for ST candidates)",
    startDate: "2026-09-22",
    endDate: "2026-10-06",
    examDate: "19 नवंबर 2026 से प्रारंभ",
    examDateEn: "19 November 2026 Onwards",
    description: "मध्य प्रदेश पुलिस मुख्यालय, गृह (पुलिस) विभाग के अंतर्गत आरक्षक (GD) एवं विशेष सशस्त्र बल के 7500 पदों पर भर्ती हेतु MPESB द्वारा आधिकारिक विज्ञापन जारी कर दिया गया है। 10वीं पास अभ्यर्थी 22 सितंबर 2026 से 06 अक्टूबर 2026 तक ऑनलाइन आवेदन कर सकते हैं। परीक्षा 19 नवंबर 2026 से आयोजित की जाएगी।",
    descriptionEn: "MP Police Headquarters and MPESB Bhopal have released the official recruitment advertisement for 7,500 MP Police Constable posts. 10th Pass candidates can apply online from 22 September to 06 October 2026. Written examination starts on 19 November 2026.",
    featuredImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: thumbAsset._id,
      },
      alt: "MP Police Constable Vacancy 2026 7500 Posts Notification Rulebook Syllabus Age Limit Salary Apply Online",
      caption: "मध्य प्रदेश पुलिस आरक्षक (GD) भर्ती परीक्षा 2026 — कुल 7500 पद आधिकारिक अधिसूचना बैनर",
    },
    body: [],
    bodyEn: [],
    faqs: faqs,
    mcqs: [],
  };

  console.log("🚀 Creating/Replacing MP Police Constable notification document in Sanity...");
  const res = await client.createOrReplace(notificationDoc);
  console.log("✅ Successfully published MP Police Constable notification to Sanity CMS!");
  console.log("📄 Document ID:", res._id);
  console.log("🔗 Slug:", res.slug.current);
}

main().catch((err) => {
  console.error("❌ Error uploading notification to Sanity:", err);
  process.exit(1);
});
