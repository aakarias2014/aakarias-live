import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

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
  const docId = "mp-police-constable-recruitment-2026";

  console.log("🔍 Enhancing SEO & PAA FAQs for MP Police Constable 2026 in Sanity CMS...");

  const seoTitle = "MP Police Constable Vacancy 2026 Notification Out (7500 Posts): Apply Online Date, Syllabus in Hindi, Height, Physical Test & Salary";
  const seoTitleHi = "MP Police Constable भर्ती 2026 आधिकारिक विज्ञापन (7,500 पद): ऑनलाइन आवेदन, सिलेबस, आयु सीमा, वेतन व फिजिकल नियम";
  const seoExcerpt = "मध्यप्रदेश पुलिस आरक्षक (GD) एवं विशेष सशस्त्र बल भर्ती 2026 हेतु 7,500 पदों पर आधिकारिक विज्ञापन जारी। जाने 10वीं पास पात्रता, ऑनलाइन आवेदन तिथि 22 सितंबर, 800m PET फिजिकल दौड़, सिलेबस तथा 5 साल बाद इन-हैंड सैलरी की पूरी जानकारी।";
  const seoExcerptEn = "MPESB Bhopal has officially advertised 7,500 MP Police Constable vacancies. Check 10th pass eligibility, online application dates (22 Sept to 06 Oct 2026), 800m PET running test, exam syllabus in Hindi & salary details.";

  const faqs = [
    {
      _key: "faq1",
      question: "MP पुलिस में पास होने के लिए कितने नंबर चाहिए? (Passing Marks & Cutoff)",
      answer: "MP Police Constable 100 अंक लिखित परीक्षा में अनारक्षित (General/OBC) वर्ग हेतु सामान्यतः 70-75+ अंक तथा SC/ST वर्ग हेतु 65-70+ अंक कट-ऑफ सुरक्षित माना जाता है। इसके अतिरिक्त द्वितीय चरण की शारीरिक दक्षता परीक्षा (PET - 100 अंक) में न्यूनतम 30% अंक प्राप्त करना अनिवार्य है।",
      questionEn: "How many marks are required to pass MP Police Constable exam?",
      answerEn: "In MP Police Constable 100 marks written exam, 70-75+ marks for General/OBC and 65-70+ for SC/ST are typically safe cutoff scores. Additionally, candidates must score at least 30% marks in the 100 marks Physical Efficiency Test (PET)."
    },
    {
      _key: "faq2",
      question: "5 साल बाद कांस्टेबल का वेतन कितना होगा? (Salary after 5 years)",
      answer: "MP Police Constable का मूल वेतनमान ₹19,500 – ₹62,000 (Pay Level 4) है। प्रथम 3 वर्ष प्रोबेशन अवधि में स्टाइपेंड मिलता है। 4 वर्ष पूर्ण होने पर 100% मूल वेतन + DA (महंगाई भत्ता) + HRA + पुलिस विशेष भत्ते जोड़कर 5 साल बाद कांस्टेबल की कुल इन-हैंड सैलरी ₹32,000 से ₹36,000 प्रति माह हो जाती है।",
      questionEn: "What will be the monthly salary of MP Police Constable after 5 years?",
      answerEn: "MP Police Constable pay scale is ₹19,500 - ₹62,000 (Pay Level 4). After completing the 3-year probation period, with 100% base pay plus DA, HRA and police special allowances, the in-hand salary after 5 years reaches approximately ₹32,000 to ₹36,000 per month."
    },
    {
      _key: "faq3",
      question: "पुलिस कांस्टेबल एडमिट कार्ड कब आएगा? (Admit Card Release Date)",
      answer: "MPESB द्वारा MP Police Constable भर्ती परीक्षा का आयोजन 19 नवंबर 2026 से किया जाएगा। आधिकारिक प्रवेश पत्र (Admit Card) परीक्षा तिथि से 7 से 10 दिन पूर्व (नवंबर 2026 के प्रथम सप्ताह) आधिकारिक MPOnline पोर्टल पर डाउनलोड हेतु उपलब्ध कराए जाएंगे।",
      questionEn: "When will the MP Police Constable Admit Card 2026 be released?",
      answerEn: "MPESB will conduct the MP Police Constable exam from 19 November 2026 onwards. Official admit cards will be released 7 to 10 days prior to the exam (first week of November 2026) on the MPOnline portal."
    },
    {
      _key: "faq4",
      question: "मप्र पुलिस की दौड़ कितनी होती है? (Physical PET Running Standard)",
      answer: "MP Police Constable भर्ती में 800 मीटर की शारीरिक दौड़ (Running Test) आयोजित की जाती है, जिसके लिए कुल 40 अंक निर्धारित हैं। पुरुष अभ्यर्थियों को 800m दौड़ 2 मिनट 45 सेकंड में तथा महिला अभ्यर्थियों को 3 मिनट 55 सेकंड में पूरी करनी होती है।",
      questionEn: "What is the physical running standard for MP Police Constable?",
      answerEn: "In MP Police Constable PET, candidates undergo an 800-meter running test carrying 40 marks. Male candidates must complete 800m in 2 minutes 45 seconds and female candidates in 3 minutes 55 seconds."
    },
    {
      _key: "faq5",
      question: "MP Police Constable 2026 ऑनलाइन आवेदन की अंतिम तिथि क्या है?",
      answer: "ऑनलाइन आवेदन प्रक्रिया 22 सितंबर 2026 से प्रारंभ होकर 06 अक्टूबर 2026 तक संचालित रहेगी। आवेदन पत्र में संशोधन करने की अंतिम तिथि 11 अक्टूबर 2026 है।",
      questionEn: "What is the last date to apply online for MP Police Constable 2026?",
      answerEn: "Online applications open on 22 September 2026 and close on 06 October 2026. Application corrections can be made until 11 October 2026."
    },
    {
      _key: "faq6",
      question: "MP Police Constable भर्ती 2026 में कुल कितने पदों पर विज्ञापन जारी हुआ है?",
      answer: "मध्य प्रदेश पुलिस भर्ती 2026 में कुल 7,500 पदों पर सीधी भर्ती का विज्ञापन जारी हुआ है, जिसमें 6,800 पद आरक्षक GD (Non-SAF) तथा 700 पद आरक्षक GD (SAF - केवल पुरुष) के लिए हैं।",
      questionEn: "How many total vacancies are advertised in MP Police Constable 2026?",
      answerEn: "A total of 7,500 vacancies are advertised in MP Police Constable 2026, comprising 6,800 GD Non-SAF posts and 700 GD SAF Male posts."
    },
    {
      _key: "faq7",
      question: "MP Police Constable हेतु पुरुषों एवं महिलाओं के लिए न्यूनतम ऊंचाई (Height) क्या है?",
      answer: "सामान्य एवं OBC वर्ग के पुरुष अभ्यर्थियों हेतु न्यूनतम ऊंचाई 168 सेमी तथा SC/ST पुरुष हेतु 165 सेमी अनिवार्य है। सभी वर्ग की महिला अभ्यर्थियों हेतु न्यूनतम ऊंचाई 155 से 157 सेमी निर्धारित है।",
      questionEn: "What is the height requirement for MP Police Constable male and female candidates?",
      answerEn: "Minimum height for General/OBC male is 168 cm, SC/ST male is 165 cm, and for all female candidates it is 155-157 cm."
    },
    {
      _key: "faq8",
      question: "MP Police Constable 2026 का लिखित परीक्षा सिलेबस क्या है?",
      answer: "लिखित परीक्षा में 100 बहुविकल्पीय प्रश्न (MCQs) होते हैं: सामान्य ज्ञान एवं तार्किक ज्ञान (40 अंक), बौद्धिक क्षमता एवं मानसिक अभिरुचि (30 अंक), तथा विज्ञान एवं सरल गणित (30 अंक)। परीक्षा में ऋणात्मक अंकन (Negative Marking) नहीं होता है।",
      questionEn: "What is the written exam syllabus for MP Police Constable 2026?",
      answerEn: "The 100 marks written exam comprises GK & Reasoning (40 marks), Mental Ability (30 marks), and Science & Elementary Maths (30 marks). There is no negative marking."
    },
    {
      _key: "faq9",
      question: "MP Police Constable पद हेतु अनिवार्य शैक्षणिक योग्यता क्या है?",
      answer: "सामान्य, OBC एवं SC वर्ग के अभ्यर्थियों के लिए मान्यता प्राप्त बोर्ड से 10वीं उत्तीर्ण होना अनिवार्य है। अनुसूचित जनजाति (ST) वर्ग के अभ्यर्थी यदि केवल 8वीं उत्तीर्ण हैं, तो भी वे आवेदन कर सकते हैं।",
      questionEn: "What is the mandatory educational qualification for MP Police Constable?",
      answerEn: "General, OBC & SC candidates must be 10th Class Pass. ST category candidates who have passed 8th Class are also eligible to apply."
    },
    {
      _key: "faq10",
      question: "MP Police Constable की फ्री तैयारी हेतु आकार IAS के पास क्या संसाधन उपलब्ध हैं?",
      answer: "आकार IAS द्वारा यूट्यूब पर रोजाना सुबह 9 AM से शाम 6 PM तक daily free live marathon classes, हस्तलिखित MP GK नोट्स, मॉडल पेपर्स तथा 'MP Police Constable 2026 Online Target Batch' संचालित किया जा रहा है।",
      questionEn: "What free preparation resources are provided by Aakar IAS for MP Police Constable?",
      answerEn: "Aakar IAS provides daily free YouTube live marathon streaming (9 AM to 6 PM), handwritten MP GK notes, model question papers, and dedicated online target coaching."
    }
  ];

  await client.patch(docId)
    .set({
      title: seoTitleHi,
      titleEn: seoTitle,
      description: seoExcerpt,
      descriptionEn: seoExcerptEn,
      faqs: faqs,
    })
    .commit();

  console.log("🎉 SUCCESS! SEO title, description, and 10 PAA FAQs updated live in Sanity CMS!");
}

main().catch((err) => {
  console.error("❌ Error updating SEO FAQs:", err);
  process.exit(1);
});
