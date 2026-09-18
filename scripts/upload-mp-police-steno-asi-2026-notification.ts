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
  console.log("👮 Uploading MP Police Subedar (Steno) & ASI Vacancy 2026 Notification to Sanity CMS...");

  const thumbnailPath = "/Users/aakariastech/Documents/Z-code/aakar-ias/public/images/notifications/mp-police-steno-asi-recruitment-2026-thumbnail.png";

  console.log("📸 Uploading Thumbnail Asset to Sanity CMS...");
  const thumbAsset = await client.assets.upload("image", fs.createReadStream(thumbnailPath), {
    filename: "mp-police-subedar-steno-asi-recruitment-2026-thumbnail.png",
    contentType: "image/png",
  });
  console.log("✔ Uploaded Thumbnail Asset ID:", thumbAsset._id);

  const docId = "mp-police-subedar-steno-asi-bharti-2026";

  const h3Block = (text: string) => ({
    _type: "block",
    _key: `h3_${Math.random().toString(36).substring(2, 9)}`,
    style: "h3",
    children: [{ _type: "span", text }],
  });

  const pBlock = (text: string) => ({
    _type: "block",
    _key: `p_${Math.random().toString(36).substring(2, 9)}`,
    style: "normal",
    children: [{ _type: "span", text }],
  });

  const bulletBlock = (text: string) => ({
    _type: "block",
    _key: `b_${Math.random().toString(36).substring(2, 9)}`,
    style: "normal",
    children: [{ _type: "span", text: text.startsWith("• ") ? text : `• ${text}` }],
  });

  const tableBlock = (headers: string[], rows: string[][], caption?: string) => ({
    _type: "table",
    _key: `tbl_${Math.random().toString(36).substring(2, 9)}`,
    table: {
      headers,
      rows,
      caption,
    },
  });

  // Hindi Body Blocks
  const body = [
    pBlock("मध्य प्रदेश कर्मचारी चयन मंडल (ESB), भोपाल ने पुलिस मुख्यालय, गृह (पुलिस) विभाग, मध्यप्रदेश शासन के अंतर्गत **सूबेदार (अनुसचिवीय)-शीघ्रलेखक** एवं **सहायक उप निरीक्षक (अनुसचिवीय)** के पदों पर सीधी भर्ती हेतु चयन परीक्षा-2026 की अधिसूचना जारी की है। कुल **655 पदों** पर भर्ती होगी। पूरी जानकारी नीचे दी गई है।"),

    h3Block("1. महत्वपूर्ण तिथियां (Important Dates)"),
    tableBlock(
      ["कार्य", "तिथि"],
      [
        ["ऑनलाइन आवेदन प्रारंभ", "24.09.2026"],
        ["ऑनलाइन आवेदन की अंतिम तिथि", "08.10.2026"],
        ["आवेदन में संशोधन प्रारंभ", "24.09.2026"],
        ["आवेदन में संशोधन की अंतिम तिथि", "13.10.2026"],
        ["प्रथम चरण लिखित परीक्षा", "03.11.2026, मंगलवार से प्रारंभ"],
      ]
    ),
    pBlock("**परीक्षा पालियां (03.11.2026):**\n- प्रथम पाली – रिपोर्टिंग: प्रातः 08:00–09:00, उत्तर अंकन: प्रातः 10:00–12:00\n- द्वितीय पाली – रिपोर्टिंग: दोप. 01:00–02:00, उत्तर अंकन: दोपहर 03:00–05:00"),

    h3Block("2. रिक्त पदों का विवरण (कुल: 655 पद)"),
    tableBlock(
      ["पोस्ट कोड", "पद का नाम", "शाखा", "कुल पद"],
      [
        ["01", "सूबेदार (अनुसचिवीय) – शीघ्रलेखक", "सामान्य शाखा", "125"],
        ["02", "सूबेदार (अनुसचिवीय) – शीघ्रलेखक", "विशेष शाखा", "10"],
        ["03", "सहायक उप निरीक्षक (अनुसचिवीय)", "सामान्य शाखा", "100"],
        ["04", "सहायक उप निरीक्षक (अनुसचिवीय)", "मैदानी इकाई", "370"],
        ["05", "सहायक उप निरीक्षक (अनुसचिवीय)", "विशेष शाखा", "25"],
        ["06", "सहायक उप निरीक्षक (अनुसचिवीय)", "अपराध अनुसंधान विभाग", "25"],
      ]
    ),
    pBlock("नोट: जो अभ्यर्थी मध्यप्रदेश के स्थायी अधिवासी (Domicile) नहीं हैं, वे केवल अनारक्षित (Open) श्रेणी के अंतर्गत ही आवेदन कर सकते हैं। ऐसे आवेदकों को आरक्षण या आयु सीमा में छूट का कोई लाभ नहीं मिलेगा और उनकी आयु 08.10.2026 को अधिकतम 33 वर्ष होनी चाहिए।"),
    pBlock("**आरक्षण संरचना:** UR-27%, OBC-27%, SC-16%, ST-20%, EWS-10% (वर्टिकल), महिला-35% व भूतपूर्व सैनिक-10% (हॉरिजॉन्टल)।"),

    h3Block("3. शैक्षणिक योग्यता (Educational Qualification)"),
    h3Block("सूबेदार (अनुसचिवीय) – शीघ्रलेखक"),
    bulletBlock("• हायर सेकेंडरी परीक्षा (10+2) उत्तीर्ण"),
    bulletBlock("• मध्यप्रदेश मान्यता प्राप्त संस्था से **हिंदी आशुलिपि (शॉर्ट-हैंड) 100 शब्द प्रति मिनट** परीक्षा उत्तीर्ण"),
    bulletBlock("• विज्ञान एवं प्रौद्योगिकी विभाग द्वारा आयोजित **CPCT परीक्षा हिंदी टाइपिंग सहित उत्तीर्ण** अनिवार्य"),
    bulletBlock("• DOEACC डिप्लोमा / COPA (ITI) / पॉलिटेक्निक कंप्यूटर कोर्स / कंप्यूटर डिप्लोमा में से कोई एक"),

    h3Block("सहायक उप निरीक्षक (अनुसचिवीय)"),
    bulletBlock("• उच्चतर माध्यमिक (10+2) परीक्षा उत्तीर्ण"),
    bulletBlock("• CPCT परीक्षा हिंदी टाइपिंग सहित उत्तीर्ण अनिवार्य"),
    bulletBlock("• इंजीनियरिंग डिग्री/BCA/BSC/MSC (कंप्यूटर साइंस/IT) या AICTE अनुमोदित पॉलिटेक्निक डिप्लोमा / DOEACC / COPA / कंप्यूटर डिप्लोमा में से कोई एक"),

    h3Block("4. आयु सीमा (08.10.2026 तक)"),
    tableBlock(
      ["श्रेणी", "अधिकतम आयु"],
      [
        ["पुरुष (म.प्र. अनारक्षित)", "33 वर्ष"],
        ["पुरुष (म.प्र. EWS)", "33 वर्ष"],
        ["अन्य प्रदेश के अभ्यर्थी (पुरुष/महिला)", "33 वर्ष"],
        ["महिला (सभी श्रेणी, म.प्र.)", "38 वर्ष"],
        ["पुरुष (आरक्षित श्रेणी – SC/ST/OBC)", "38 वर्ष"],
        ["शासकीय/निगम/मंडल कर्मचारी (पुरुष)", "38 वर्ष"],
        ["अंतर्जातीय विवाह (पुरुष)", "38 वर्ष"],
        ["अंतर्जातीय विवाह (महिला)", "43 वर्ष"],
        ["विक्रम पुरस्कार विजेता (पुरुष – अनारक्षित)", "38 वर्ष"],
        ["विक्रम पुरस्कार विजेता (महिला/आरक्षित पुरुष)", "43 वर्ष"],
      ]
    ),
    pBlock("भूतपूर्व सैनिकों को सेवा अवधि अनुसार अतिरिक्त छूट (अधिकतम सीमा से 3 वर्ष से अधिक नहीं)।"),

    h3Block("5. आवेदन शुल्क (Application Fee)"),
    tableBlock(
      ["श्रेणी", "सीधी भर्ती शुल्क", "विभागीय परीक्षा शुल्क"],
      [
        ["अनारक्षित", "₹500/-", "₹200/-"],
        ["SC/ST/OBC/EWS (केवल म.प्र. मूल निवासी)", "₹250/-", "₹100/-"],
      ]
    ),
    bulletBlock("• MP ऑनलाइन कियोस्क पोर्टल शुल्क: ₹60/-"),
    bulletBlock("• रजिस्टर्ड सिटीजन यूजर लॉगिन से भरने पर पोर्टल शुल्क: ₹20/-"),

    h3Block("6. चयन प्रक्रिया (2 चरण)"),
    h3Block("प्रथम चरण – लिखित परीक्षा (ऑनलाइन)"),
    bulletBlock("• हिंदी भाषा में बहुविकल्पीय प्रश्न (MCQ)"),
    bulletBlock("• अवधि: 2 घंटे | कुल प्रश्न: 100 | कुल अंक: 100"),
    bulletBlock("• सही उत्तर पर +1 अंक; गलत/अनुत्तरित प्रश्न पर कोई कटौती नहीं (कोई निगेटिव मार्किंग नहीं)"),
    bulletBlock("• विज्ञापित पदों की संख्या से **7 गुना** अभ्यर्थी द्वितीय चरण (प्रायोगिक परीक्षा) हेतु बुलाए जाएंगे"),

    h3Block("द्वितीय चरण – दस्तावेज परीक्षण + प्रायोगिक परीक्षा (Skill Test)"),
    pBlock("**सूबेदार (शीघ्रलेखक) हेतु – अनुसूची-एक:**\n• कुल अवधि: 1 घंटा | कुल अंक: 100 | न्यूनतम अर्हक अंक: 30\n• हिंदी आशुलिपि श्रुतलेख (Dictation) 100 शब्द प्रति मिनट की गति से 5 मिनट का — कुल दो श्रुतलेख\n• प्रत्येक श्रुतलेख के बाद ड्राफ्ट हेतु 5 मिनट व टंकण (Typing) हेतु 20 मिनट कंप्यूटर पर\n• श्रुतलेख मूल्यांकन: प्रत्येक 10 अंक; अनुलिपि टंकण मूल्यांकन: प्रत्येक 40 अंक"),
    pBlock("**सहायक उप निरीक्षक हेतु – अनुसूची-दो:**\n• कुल अवधि: 1 घंटा | कुल अंक: 100 | न्यूनतम अर्हक अंक: 30\n• हिंदी टंकण परीक्षा: 600 शब्दों के दो पैराग्राफ, प्रत्येक 30 मिनट में टाइप करना होगा\n• प्रत्येक पैराग्राफ अधिकतम 50 अंक"),

    h3Block("7. पाठ्यक्रम (प्रथम चरण लिखित परीक्षा – 100 अंक)"),
    tableBlock(
      ["विषय", "अंक"],
      [
        ["सामान्य ज्ञान एवं तार्किक ज्ञान", "40"],
        ["बौद्धिक क्षमता एवं मानसिक अभिरुचि", "30"],
        ["विज्ञान एवं सरल अंक गणित", "30"],
      ]
    ),

    h3Block("8. शारीरिक मानक (Physical Standards)"),
    tableBlock(
      ["पद", "वर्ग", "ऊंचाई"],
      [
        ["सूबेदार (शीघ्रलेखक)", "पुरुष", "162 सेमी"],
        ["सूबेदार (शीघ्रलेखक)", "महिला", "152 सेमी"],
        ["सहायक उप निरीक्षक", "पुरुष", "162 सेमी"],
        ["सहायक उप निरीक्षक", "महिला", "152 सेमी"],
      ]
    ),
    bulletBlock("• सीने का माप लागू नहीं (यह पद सचिवीय/क्लर्कीय प्रकृति के हैं)"),
    bulletBlock("• दृष्टि: बिना चश्मे के 6/9 से कम नहीं (दूसरी आंख 6/12 से कम नहीं)"),
    bulletBlock("• नॉक-नी व फ्लैट फुट नहीं होना चाहिए; शरीर किसी भी प्रकार से अपंग नहीं होना चाहिए"),
    bulletBlock("• शारीरिक मानकों में किसी भी स्तर पर छूट नहीं दी जाएगी"),

    h3Block("9. वेतनमान (Pay Scale)"),
    tableBlock(
      ["पद", "वेतनमान"],
      [
        ["सूबेदार (अनुसचिवीय) – शीघ्रलेखक", "₹36,200 – ₹1,14,800"],
        ["सहायक उप निरीक्षक (अनुसचिवीय)", "₹19,500 – ₹62,000"],
      ]
    ),
    pBlock("परिवीक्षा अवधि में स्टायपेंड: प्रथम वर्ष 70%, द्वितीय वर्ष 80%, तृतीय वर्ष 90%"),

    h3Block("10. परीक्षा केंद्र"),
    pBlock("भोपाल, इंदौर, जबलपुर, खंडवा, नीमच, रतलाम, रीवा, सागर, सतना, सीधी, उज्जैन, बड़वानी, अनूपपुर"),

    h3Block("11. जरूरी दस्तावेज (दस्तावेज सत्यापन के समय)"),
    bulletBlock("• जन्मतिथि प्रमाण (10वीं/12वीं की अंकसूची)"),
    bulletBlock("• शैक्षणिक योग्यता प्रमाण पत्र, CPCT प्रमाण पत्र"),
    bulletBlock("• हिंदी आशुलिपि (Shorthand) प्रमाण पत्र (सूबेदार शीघ्रलेखक पद हेतु)"),
    bulletBlock("• जाति प्रमाण पत्र (SC/ST/OBC/EWS – म.प्र. अधिवास सहित)"),
    bulletBlock("• मध्यप्रदेश अधिवासी (Domicile) प्रमाण पत्र (आरक्षण/आयु छूट हेतु)"),
    bulletBlock("• आधार कार्ड (आधार बेस्ड बायोमेट्रिक सत्यापन अनिवार्य)"),

    h3Block("12. अन्य महत्वपूर्ण बातें"),
    bulletBlock("• परीक्षा में मोबाइल फोन, कैलकुलेटर, लॉग टेबल, सनग्लासेस आदि प्रतिबंधित हैं"),
    bulletBlock("• मूल फोटोयुक्त पहचान पत्र लाना अनिवार्य है (ई-आधार मान्य नहीं, केवल UIDAI सत्यापित मूल आधार मान्य)"),
    bulletBlock("• परीक्षा प्रारंभ होने के बाद किसी भी परीक्षार्थी को हॉल छोड़ने की अनुमति नहीं होगी"),
    bulletBlock("• चयनित अभ्यर्थियों को गृह जिले में पदस्थापना नहीं दी जाएगी (पुलिस मुख्यालय म.प्र. को छोड़कर)"),
    bulletBlock("• जिस इकाई में नियुक्ति होगी वहां कम से कम 5 वर्ष सेवा अनिवार्य है"),

    h3Block("13. आवेदन कैसे करें?"),
    pBlock("आधिकारिक वेबसाइट: **www.esb.mp.gov.in**\n\nअभ्यर्थी 24.09.2026 से 08.10.2026 तक उक्त वेबसाइट पर या MP ऑनलाइन के अधिकृत कियोस्क के माध्यम से ऑनलाइन आवेदन कर सकते हैं।\n\nसहायता: टोल फ्री नंबर **1800-233-7899** | शिकायत ईमेल: **complaint.esb@mp.gov.in**"),

    pBlock("*यह जानकारी मध्य प्रदेश कर्मचारी चयन मंडल, भोपाल द्वारा जारी आधिकारिक नियम पुस्तिका (सूबेदार शीघ्रलेखक व सहायक उप निरीक्षक अनुसचिवीय चयन परीक्षा-2026) पर आधारित है। अंतिम व सटीक जानकारी हेतु उम्मीदवारों को आधिकारिक वेबसाइट अवश्य देखनी चाहिए।*")
  ];

  // English Body Blocks
  const bodyEn = [
    pBlock("Madhya Pradesh Employees Selection Board (MPESB), Bhopal has released the official recruitment notification for **Subedar (Secretarial) Steno** and **Assistant Sub Inspector (Secretarial)** posts under Police HQ, Home (Police) Department, Govt of MP. A total of **655 vacancies** are advertised. Detailed information is provided below."),

    h3Block("1. Important Dates"),
    tableBlock(
      ["Event", "Date"],
      [
        ["Online Application Start Date", "24.09.2026"],
        ["Online Application Last Date", "08.10.2026"],
        ["Application Correction Start Date", "24.09.2026"],
        ["Application Correction Last Date", "13.10.2026"],
        ["Stage 1 Written Exam Start Date", "03.11.2026 (Tuesday) Onwards"],
      ]
    ),
    pBlock("**Exam Shifts (03.11.2026):**\n- Shift 1 – Reporting: 08:00–09:00 AM, Exam: 10:00 AM–12:00 PM\n- Shift 2 – Reporting: 01:00–02:00 PM, Exam: 03:00–05:00 PM"),

    h3Block("2. Vacancy Breakdown (Total 655 Posts)"),
    tableBlock(
      ["Post Code", "Post Name", "Branch", "Total Posts"],
      [
        ["01", "Subedar (Secretarial) – Steno", "General Branch", "125"],
        ["02", "Subedar (Secretarial) – Steno", "Special Branch", "10"],
        ["03", "Assistant Sub Inspector (Secretarial)", "General Branch", "100"],
        ["04", "Assistant Sub Inspector (Secretarial)", "Executive Unit", "370"],
        ["05", "Assistant Sub Inspector (Secretarial)", "Special Branch", "25"],
        ["06", "Assistant Sub Inspector (Secretarial)", "Crime Investigation Dept (CID)", "25"],
      ]
    ),
    pBlock("Note: Non-MP Domicile candidates can apply under UR Open category only without reservation or age relaxations, with maximum age limit of 33 years as on 08.10.2026."),

    h3Block("3. Educational Qualifications"),
    h3Block("Subedar (Secretarial) – Steno"),
    bulletBlock("• Passed Higher Secondary (10+2) Examination"),
    bulletBlock("• Passed **Hindi Shorthand 100 wpm** exam from MP recognized institution"),
    bulletBlock("• Mandatory **CPCT Pass with Hindi Typing**"),
    bulletBlock("• Any one of DOEACC Diploma / COPA (ITI) / Polytechnic Computer Course / Computer Diploma"),

    h3Block("Assistant Sub Inspector (Secretarial)"),
    bulletBlock("• Passed Higher Secondary (10+2) Examination"),
    bulletBlock("• Mandatory CPCT Pass with Hindi Typing"),
    bulletBlock("• Engineering Degree / BCA / B.Sc / M.Sc (CS/IT) or AICTE Polytechnic Diploma / DOEACC / COPA / Computer Diploma"),

    h3Block("4. Age Limit (As on 08.10.2026)"),
    tableBlock(
      ["Category", "Max Age"],
      [
        ["Male (MP Unreserved)", "33 Years"],
        ["Male (MP EWS)", "33 Years"],
        ["Other State Candidates (Male/Female)", "33 Years"],
        ["Female (All Categories, MP Domicile)", "38 Years"],
        ["Male (Reserved – SC/ST/OBC MP Domicile)", "38 Years"],
      ]
    ),

    h3Block("5. Application Fee"),
    tableBlock(
      ["Category", "Direct Recruitment Fee", "Departmental Exam Fee"],
      [
        ["Unreserved", "₹500/-", "₹200/-"],
        ["SC/ST/OBC/EWS (MP Domicile Only)", "₹250/-", "₹100/-"],
      ]
    ),

    h3Block("6. Selection Process"),
    bulletBlock("• Stage 1: Written Online Exam (100 MCQs, 100 Marks, 2 Hours, No Negative Marking). 7x candidates called for Stage 2."),
    bulletBlock("• Stage 2: Document Verification + Practical Skill Test (100 Marks, Qualifying 30 Marks)."),

    h3Block("7. Examination Syllabus (100 Marks)"),
    tableBlock(
      ["Subject", "Marks"],
      [
        ["General Knowledge & Logical Knowledge", "40"],
        ["Intellectual Ability & Mental Aptitude", "30"],
        ["Science & Simple Arithmetic", "30"],
      ]
    ),

    h3Block("8. Physical Standards"),
    tableBlock(
      ["Post", "Gender", "Height"],
      [
        ["Subedar (Steno)", "Male", "162 cm"],
        ["Subedar (Steno)", "Female", "152 cm"],
        ["ASI (Secretarial)", "Male", "162 cm"],
        ["ASI (Secretarial)", "Female", "152 cm"],
      ]
    ),
    bulletBlock("• Chest measurement not applicable (Secretarial posts)"),
    bulletBlock("• Minimum Vision 6/9 in main eye and 6/12 in second eye without glasses"),

    h3Block("9. Pay Scale"),
    tableBlock(
      ["Post", "Pay Scale"],
      [
        ["Subedar (Secretarial) Steno", "₹36,200 – ₹1,14,800"],
        ["ASI (Secretarial)", "₹19,500 – ₹62,000"],
      ]
    ),

    pBlock("*This information is based on the official MPESB Rulebook Notification 2026. Please refer to www.esb.mp.gov.in for official details.*")
  ];

  const faqs = [
    {
      _key: "faq1",
      question: "MP Police ASI Vacancy 2026: MP पुलिस सूबेदार शीघ्रलेखक व ASI भर्ती 2026 में कुल कितने पद हैं?",
      answer: "मध्य प्रदेश कर्मचारी चयन मंडल (MPESB), भोपाल द्वारा सूबेदार (शीघ्रलेखक) के 135 पद और सहायक उप निरीक्षक (अनुसचिवीय) के 520 पद यानी कुल 655 पदों पर सीधी भर्ती की अधिसूचना जारी की गई है।",
      questionEn: "How many total vacancies are in MP Police Subedar Steno & ASI Recruitment 2026?",
      answerEn: "There are a total of 655 vacancies — 135 posts for Subedar (Steno) and 520 posts for Assistant Sub Inspector (Secretarial) under Police HQ Bhopal."
    },
    {
      _key: "faq2",
      question: "MP ASI Qualification: सूबेदार (शीघ्रलेखक) और सहायक उप निरीक्षक पद हेतु शैक्षणिक योग्यता क्या है?",
      answer: "सूबेदार (शीघ्रलेखक) पद के लिए 10+2, 100 शब्द प्रति मिनट हिंदी आशुलिपि, CPCT (हिंदी टाइपिंग) एवं कंप्यूटर डिप्लोमा अनिवार्य है। ASI (अनुसचिवीय) पद के लिए 10+2, CPCT (हिंदी टाइपिंग) एवं कंप्यूटर डिग्री/डिप्लोमा अनिवार्य है।",
      questionEn: "What is the educational qualification for MP Police ASI & Subedar Steno posts?",
      answerEn: "For Subedar Steno: 10+2, 100 wpm Hindi Shorthand, CPCT with Hindi typing & Computer Diploma. For ASI: 10+2, CPCT with Hindi typing & Computer Diploma/Degree."
    },
    {
      _key: "faq3",
      question: "MP ASI me physical hota hai kya? क्या इस भर्ती में दौड़ या लंबी कूद होती है?",
      answer: "नहीं। MP ASI व सूबेदार (शीघ्रलेखक) भर्ती में केवल न्यूनतम ऊंचाई का मापदंड (पुरुष 162 सेमी, महिला 152 सेमी) लागू है। इसमें 800 मीटर दौड़, गोला फेंक या लंबी कूद जैसी कोई शारीरिक दक्षता परीक्षा (PET) नहीं होती, क्योंकि ये क्लर्कीय/सचिवीय पद हैं।",
      questionEn: "Is there any physical running test for MP Police ASI Recruitment 2026?",
      answerEn: "No. There is NO 800m running or long jump test. Only minimum height measurement (Male 162 cm, Female 152 cm) is required as these are secretarial posts."
    },
    {
      _key: "faq4",
      question: "MP ASI me height kitni chahiye? पुरुष व महिला अभ्यर्थियों हेतु न्यूनतम लंबाई क्या है?",
      answer: "MP पुलिस सूबेदार (शीघ्रलेखक) व सहायक उप निरीक्षक पद हेतु पुरुष अभ्यर्थियों की न्यूनतम ऊंचाई 162 सेमी तथा महिला अभ्यर्थियों की न्यूनतम ऊंचाई 152 सेमी अनिवार्य है।",
      questionEn: "What is the minimum height requirement for MP Police ASI & Steno?",
      answerEn: "The minimum height requirement is 162 cm for male candidates and 152 cm for female candidates across all categories."
    },
    {
      _key: "faq5",
      question: "MP ASI ki salary kitni hoti hai? सूबेदार व सहायक उप निरीक्षक का वेतनमान क्या है?",
      answer: "सूबेदार (अनुसचिवीय) शीघ्रलेखक का वेतनमान ₹36,200 – ₹1,14,800 तथा सहायक उप निरीक्षक (अनुसचिवीय) का वेतनमान ₹19,500 – ₹62,000 है। परिवीक्षा अवधि में प्रथम वर्ष 70%, द्वितीय वर्ष 80% तथा तृतीय वर्ष 90% स्टायपेंड दिया जाएगा।",
      questionEn: "What is the salary of MP Police ASI and Subedar Steno?",
      answerEn: "Subedar Steno pay scale is ₹36,200 – ₹1,14,800 and ASI secretarial pay scale is ₹19,500 – ₹62,000 with 70%, 80%, 90% probation stipend."
    },
    {
      _key: "faq6",
      question: "MP ASI Syllabus 2026 & Steno Syllabus in Hindi: प्रथम चरण लिखित परीक्षा का स्वरूप क्या है?",
      answer: "प्रथम चरण ऑनलाइन लिखित परीक्षा में 100 बहुविकल्पीय प्रश्न (100 अंक, 2 घंटे) होते हैं। विषयवार अंक: सामान्य ज्ञान एवं तार्किक ज्ञान (40 अंक), बौद्धिक क्षमता एवं मानसिक अभिरुचि (30 अंक), विज्ञान एवं सरल अंक गणित (30 अंक)। इसमें कोई निगेटिव मार्किंग नहीं है।",
      questionEn: "What is the MP Police ASI written exam syllabus and exam pattern?",
      answerEn: "Written exam consists of 100 MCQs (100 Marks, 2 Hours) with no negative marking. Subjects: GK & Reasoning (40 Marks), Mental Aptitude (30 Marks), Science & Arithmetic (30 Marks)."
    },
    {
      _key: "faq7",
      question: "ASI का पद क्या होता है और MP ASI previous year question paper कहां से डाउनलोड करें?",
      answer: "सहायक उप निरीक्षक (ASI अनुसचिवीय) मध्य प्रदेश पुलिस मुख्यालय के अंतर्गत प्रशासनिक, रिकॉर्ड एवं क्लर्कीय कार्यों को संभालने वाला पद है। इसके पिछले वर्षों के प्रश्न पत्र व मॉडल पेपर्स आकार IAS पोर्टल www.aakarias.com से डाउनलोड किए जा सकते हैं।",
      questionEn: "What is the role of ASI in MP Police and where to download previous year papers?",
      answerEn: "ASI (Secretarial) manages administrative, office, and secretarial operations in MP Police HQ. Model question papers and syllabus PDFs are available on Aakar IAS portal."
    },
    {
      _key: "faq8",
      question: "2026 में MP Police SI & ASI भर्ती की ऑनलाइन आवेदन तिथियां क्या हैं?",
      answer: "MPESB द्वारा जारी शेड्यूल अनुसार ऑनलाइन आवेदन 24 सितंबर 2026 से शुरू होकर 08 अक्टूबर 2026 तक भरे जाएंगे। फॉर्म में संशोधन 13 अक्टूबर 2026 तक किया जा सकता है। लिखित परीक्षा 03 नवंबर 2026 से प्रारंभ होगी।",
      questionEn: "What are the online application start and last dates for MP Police ASI 2026?",
      answerEn: "Online applications open on 24 September 2026 and close on 08 October 2026. Correction end date is 13 October 2026 and written exam starts on 03 November 2026."
    },
    {
      _key: "faq9",
      question: "क्या अन्य राज्यों (Non-MP Domicile) के अभ्यर्थी MP ASI भर्ती 2026 हेतु आवेदन कर सकते हैं?",
      answer: "हाँ, अन्य प्रदेशों के अभ्यर्थी केवल अनारक्षित (UR Open) श्रेणी के अंतर्गत आवेदन कर सकते हैं। वे आरक्षण या आयु छूट के पात्र नहीं होंगे और उनकी अधिकतम आयु सीमा 33 वर्ष (08.10.2026 को) होगी।",
      questionEn: "Can candidates from outside Madhya Pradesh apply for MP Police ASI 2026?",
      answerEn: "Yes, non-MP domicile candidates can apply strictly under Unreserved Open category with a maximum age limit of 33 years as on 08.10.2026."
    },
    {
      _key: "faq10",
      question: "MP Police ASI selection process: चयन प्रक्रिया के कितने चरण हैं?",
      answer: "चयन प्रक्रिया में 2 चरण हैं: 1. ऑनलाइन लिखित परीक्षा (100 अंक), 2. दस्तावेज सत्यापन + प्रायोगिक कौशल परीक्षा (Skill Test - 100 अंक)। लिखित परीक्षा से 7 गुना अभ्यर्थी प्रायोगिक परीक्षा हेतु बुलाए जाएंगे।",
      questionEn: "What is the selection process for MP Police Subedar Steno & ASI recruitment?",
      answerEn: "Selection involves 2 stages: 1. Written Online Exam (100 Marks), 2. Document Verification + Practical Skill Test (100 Marks, 7x candidates shortlisted)."
    }
  ];

  const notificationDoc = {
    _id: docId,
    _type: "notification",
    title: "MP पुलिस सूबेदार (शीघ्रलेखक) व सहायक उप निरीक्षक (अनुसचिवीय) भर्ती 2026: 655 पदों पर आवेदन शुरू | MPESB Rulebook & Exam Date",
    titleEn: "MP Police Subedar Steno & ASI Recruitment 2026 Notification Out (655 Posts): MPESB Rulebook, Age Limit & Apply Online",
    slug: {
      _type: "slug",
      current: docId,
    },
    exam: "MP Police / ESB",
    date: "2026-09-18T10:00:00Z",
    status: "out",
    url: "https://esb.mp.gov.in",
    officialPdfUrl: "https://esb.mp.gov.in",
    syllabusPdfUrl: "https://drive.google.com/file/d/1Wlx_JDWSRQUCFTfnWaZ3w3VwYlsgOcko/view?usp=sharing",
    applyOnlineUrl: "https://esb.mponline.gov.in/Portal/Examinations/Vyapam/examsList.aspx",
    youtubeUrl: "https://www.youtube.com/live/D_vZO-vP6lA?si=fFTw2VkJchKQgLoM",
    totalPosts: "655 पद (135 सूबेदार + 520 ASI)",
    totalPostsEn: "655 Posts (135 Subedar + 520 ASI)",
    ageLimit: "18 से 33 वर्ष (आरक्षित/महिला: 38 वर्ष)",
    ageLimitEn: "18 to 33 Years (38 Years for MP Reserved/Females)",
    qualification: "10+2, CPCT (हिंदी), आशुलिपि 100 wpm (सूबेदार हेतु), कंप्यूटर डिप्लोमा/डिग्री",
    qualificationEn: "10+2, CPCT (Hindi), Shorthand 100 wpm (Subedar), Computer Diploma/Degree",
    startDate: "2026-09-24",
    endDate: "2026-10-08",
    examDate: "03 नवंबर 2026 से प्रारंभ",
    examDateEn: "03 November 2026 Onwards",
    description: "मध्य प्रदेश कर्मचारी चयन मंडल (ESB), भोपाल ने पुलिस मुख्यालय के अंतर्गत सूबेदार (शीघ्रलेखक) एवं सहायक उप निरीक्षक (अनुसचिवीय) के 655 पदों पर भर्ती हेतु चयन परीक्षा-2026 की अधिसूचना जारी की है। 24 सितंबर से 08 अक्टूबर 2026 तक ऑनलाइन आवेदन कर सकते हैं।",
    descriptionEn: "MPESB Bhopal has released the official recruitment notification for 655 posts of Subedar (Steno) and Assistant Sub Inspector (Secretarial). Candidates can apply online from 24 September to 08 October 2026. Written exam starts 03 November 2026.",
    featuredImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: thumbAsset._id,
      },
      alt: "MP Police Subedar Steno & ASI Recruitment 2026 Notification Rulebook Syllabus Age Limit Salary Apply Online",
      caption: "मध्य प्रदेश पुलिस सूबेदार (शीघ्रलेखक) व सहायक उप निरीक्षक (अनुसचिवीय) भर्ती परीक्षा 2026 — कुल 655 पद आधिकारिक अधिसूचना बैनर",
    },
    nextArticle: {
      title: "MP Police Constable Bharti 2026: 7500+ पदों पर भर्ती अधिसूचना जारी",
      titleEn: "MP Police Constable Recruitment 2026: 7500+ Posts Notification Out",
      href: "/notifications/mp-police-constable-recruitment-2026",
    },
    body,
    bodyEn,
    faqs,
    mcqs: [],
  };

  console.log("🚀 Creating/Replacing MP Police Subedar Steno & ASI notification document in Sanity...");
  const res = await client.createOrReplace(notificationDoc);
  console.log("✅ Successfully published MP Police Subedar Steno & ASI notification to Sanity CMS!");
  console.log("📄 Document ID:", res._id);
  console.log("🔗 Slug:", res.slug.current);
}

main().catch((err) => {
  console.error("❌ Error uploading notification to Sanity:", err);
  process.exit(1);
});
