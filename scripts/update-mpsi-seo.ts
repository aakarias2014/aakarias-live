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
  console.error("Missing Sanity credentials in environment variables.");
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
  const docId = "mpsi-vacancy-2026-507-posts";

  console.log("Updating Sanity CMS document for MPSI SEO/GEO optimization...");

  const faqs = [
    {
      _key: "faq1",
      question: "MPESB सूबेदार एवं उप निरीक्षक (MPSI) भर्ती 2026 क्या है?",
      questionEn: "What is MPESB Subedar & Sub Inspector Recruitment 2026?",
      answer: "यह मध्य प्रदेश कर्मचारी चयन मण्डल (MPESB) द्वारा पुलिस मुख्यालय, गृह (पुलिस) विभाग के अंतर्गत 507 सूबेदार एवं उप निरीक्षक (SAF, DEF, आयुध, फोटो, QD, अंगुल चिन्ह) पदों की सीधी भर्ती हेतु आधिकारिक चयन परीक्षा 2026 है।",
      answerEn: "It is a recruitment drive by the Madhya Pradesh Employees Selection Board (MPESB), on behalf of the Police Headquarters, Home (Police) Department, to fill 507 Subedar and Sub Inspector (SAF/DEF/Arms/Photo/QD/Finger Print) posts in Madhya Pradesh Police.",
    },
    {
      _key: "faq2",
      question: "MPSI भर्ती 2026 में कुल कितने पद विज्ञापित किए गए हैं?",
      questionEn: "How many vacancies are available in MPESB Subedar Recruitment 2026?",
      answer: "इस भर्ती में कुल 507 पद विज्ञापित किए गए हैं: सूबेदार 81 पद, उप निरीक्षक SAF 69 पद, उप निरीक्षक DEF 312 पद, उप निरीक्षक आयुध 10 पद, फोटो 9 पद, QD 4 पद एवं अंगुल चिन्ह 22 पद।",
      answerEn: "A total of 507 posts are advertised: 81 Subedar, 69 SI (SAF), 312 SI (DEF), 10 SI (Arms), 9 SI (Photo), 4 SI (QD), and 22 SI (Finger Print).",
    },
    {
      _key: "faq3",
      question: "MPSI भर्ती 2026 ऑनलाइन आवेदन करने की अंतिम तिथि क्या है?",
      questionEn: "What is the last date to apply for MPESB Subedar Recruitment 2026?",
      answer: "ऑनलाइन आवेदन 09.09.2026 से 23.09.2026 तक स्वीकार किए जाएंगे। फॉर्म में त्रुटि सुधार/संशोधन की अंतिम तिथि 28.09.2026 है एवं लिखित परीक्षा 28.10.2026 से शुरू होगी।",
      answerEn: "The online application last date is 23.09.2026, with a correction window open until 28.09.2026. The examination commences from 28.10.2026.",
    },
    {
      _key: "faq4",
      question: "MPSI सूबेदार एवं उप निरीक्षक पदों हेतु शैक्षणिक योग्यता क्या है?",
      questionEn: "What is the qualification required for MPESB Subedar posts?",
      answer: "सूबेदार, SI (SAF) व SI (DEF) हेतु किसी भी विषय में स्नातक (Graduation) की उपाधि आवश्यक है। SI (आयुध) हेतु मैकेनिकल इंजीनियरिंग में 3 वर्षीय डिप्लोमा तथा SI (फोटो/QD/अंगुल चिन्ह) हेतु B.Sc. (गणित, भौतिकी व रसायन शास्त्र - PCM) अनिवार्य है।",
      answerEn: "Subedar, SI (SAF), and SI (DEF) require a graduate degree in any discipline. SI (Arms) requires a 3-year Diploma in Mechanical Engineering. SI (Photo/QD/Finger Print) require a Bachelor's degree in Mathematics, Physics, and Chemistry (B.Sc. PCM).",
    },
    {
      _key: "faq5",
      question: "MP Police SI भर्ती 2026 के लिए आयु सीमा (Age Limit) क्या है?",
      questionEn: "What is the age limit for MPESB Subedar Recruitment 2026?",
      answer: "आवेदन की अंतिम तिथि तक अनारक्षित पुरुष/EWS/अन्य राज्यों हेतु अधिकतम आयु 33 वर्ष है। म.प्र. की महिला अभ्यर्थियों व आरक्षित वर्ग (SC/ST/OBC) के पुरुषों हेतु 38 वर्ष तथा विक्रम पुरस्कार व अंतर्जातीय विवाह योजनाओं में अधिकतम 43 वर्ष की छूट देय है।",
      answerEn: "As on 23.09.2026, the maximum age is 33 years for unreserved male/EWS/other-state candidates, 38 years for MP-domicile women and reserved-category men, and up to 43 years for certain relaxation categories such as inter-caste marriage or Vikram Award winners.",
    },
    {
      _key: "faq6",
      question: "MPSI भर्ती 2026 हेतु आवेदन शुल्क (Application Fee) कितना है?",
      questionEn: "What is the application fee for MPESB Subedar Recruitment 2026?",
      answer: "अनारक्षित श्रेणी हेतु परीक्षा शुल्क ₹500/- तथा म.प्र. के आरक्षित वर्ग (SC/ST/OBC/EWS) हेतु ₹250/- है। इसके अतिरिक्त MP ऑनलाइन कियोस्क शुल्क ₹60/- या सिटीजन लॉगिन शुल्क ₹20/- देय होगा।",
      answerEn: "The fee is ₹500 for Unreserved candidates and ₹250 for SC/ST/OBC/EWS candidates (MP domicile only), plus ₹60 MP Online kiosk portal fee or ₹20 citizen login portal fee.",
    },
    {
      _key: "faq7",
      question: "MP Police Sub Inspector भर्ती 2026 के लिए ऑनलाइन आवेदन कैसे करें?",
      questionEn: "How can I apply online for MPESB Subedar & Sub Inspector Recruitment 2026?",
      answer: "अभ्यर्थी 09.09.2026 से 23.09.2026 के मध्य MPESB की आधिकारिक वेबसाइट (esb.mp.gov.in) एवं MP Online पोर्टल (esb.mponline.gov.in) के माध्यम से फॉर्म भरकर ऑनलाइन शुल्क भुगतान कर सकते हैं।",
      answerEn: "Candidates can apply online through the MPESB official website (esb.mp.gov.in) and MP Online portal (esb.mponline.gov.in) between 09.09.2026 and 23.09.2026 by filling the form, uploading documents, and paying the fee.",
    },
    {
      _key: "faq8",
      question: "MPSI भर्ती 2026 की संपूर्ण चयन प्रक्रिया (Selection Process) क्या है?",
      questionEn: "What is the selection process for MPESB Subedar Recruitment 2026?",
      answer: "चयन प्रक्रिया में दो चरण शामिल हैं: प्रथम चरण प्रारंभिक परीक्षा (100 अंक, कोई ऋणात्मक अंकन नहीं), द्वितीय चरण मुख्य लिखित परीक्षा (300-300 अंक के पेपर I व II, 1/3 ऋणात्मक अंकन), 100 अंक का PET टेस्ट तथा 50 अंक का व्यक्तिगत साक्षात्कार।",
      answerEn: "Selection involves a Preliminary Written Exam (100 marks, no negative marking), a Main Written Exam (Papers I & II of 300 marks each with 1/3rd negative marking), a Physical Efficiency Test (800m race, long jump, shot put - 100 marks), and a Personal Interview (50 marks).",
    },
    {
      _key: "faq9",
      question: "MP Police SI एवं सूबेदार का वेतनमान (Salary Grade Pay) कितना है?",
      questionEn: "What is the salary for MPESB Subedar & Sub Inspector posts?",
      answer: "चयनित अभ्यर्थियों को पे मैट्रिक्स लेवल-9 (₹ 36,200 – ₹ 1,14,800/-) में नियुक्त किया जाएगा। 3 वर्ष की परिवीक्षा अवधि में प्रथम वर्ष 70%, द्वितीय वर्ष 80% तथा तृतीय वर्ष 90% स्टायपेंड दिया जाएगा।",
      answerEn: "Selected candidates are placed in Pay Level 9 (₹36,200 – ₹1,14,800), with a graded stipend during the 3-year probation period (70% Year 1, 80% Year 2, and 90% Year 3).",
    },
    {
      _key: "faq10",
      question: "क्या म.प्र. का मूल निवासी होना MPSI भर्ती हेतु अनिवार्य है?",
      questionEn: "Is Madhya Pradesh domicile mandatory for this recruitment?",
      answer: "म.प्र. का मूल निवासी होना केवल वर्ग व आयु आरक्षण लाभ हेतु अनिवार्य है। अन्य राज्यों के गैर-निवासी अभ्यर्थी भी अनारक्षित (UR) श्रेणी के अंतर्गत अधिकतम 33 वर्ष की आयु सीमा तक आवेदन करने हेतु पूर्णतः पात्र हैं।",
      answerEn: "MP domicile is mandatory to claim reservation or age-relaxation benefits. Non-domicile candidates may still apply, but only under the Unreserved category with a maximum age of 33 years and no relaxation.",
    },
  ];

  await client
    .patch(docId)
    .set({
      title: "MPSI भर्ती 2026: 507 पदों (उप निरीक्षक एवं सूबेदार) के लिए अधिसूचना जारी, ऑनलाइन आवेदन, आयु, योग्यता व विस्तृत परीक्षा पैटर्न",
      titleEn: "MPSI Recruitment 2026 Notification Out: 507 Posts for Sub-Inspector & Subedar, Apply Online, Age Limit, Eligibility & Exam Pattern",
      excerpt: "MP Police MPSI भर्ती 2026: 507 पदों हेतु MPESB आधिकारिक नियमपुस्तिका जारी। जानें MP SI सिलेबस in Hindi PDF download, आयु सीमा, परीक्षा तिथि (28 Oct 2026), शारीरिक पात्रता व ऑनलाइन फॉर्म लिंक।",
      excerptEn: "MP Police MPSI Recruitment 2026: Notification out for 507 posts (Sub-Inspector & Subedar). Check MP SI syllabus in Hindi/English PDF, age limit, selection process, salary Level 9 & apply online link.",
      tags: [
        "tag-mppsc",
        "tag-mpsi",
        "tag-mp-police",
        "tag-esb",
        "tag-vyapam",
        "tag-upsc",
        "mpsi-vacancy-2026",
        "mpsi-notification-2026",
        "mp-si-syllabus-2026",
        "mp-si-syllabus-pdf"
      ],
      faqs,
    })
    .commit();

  console.log("Sanity CMS patched successfully with all 10 SEO/GEO FAQs and search tags!");
}

main().catch((err) => {
  console.error("Failed to patch Sanity CMS:", err);
  process.exit(1);
});
