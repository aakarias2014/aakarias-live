import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

// Load env.local explicitly
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
  console.log("🚀 Uploading VB-G RAM G Act Article to Sanity...");

  const article = {
    _id: "ca-vbg-ramg-act-2026",
    _type: "currentAffairs",
    slug: { _type: "slug", current: "vbg-ramg-act-2026" },
    title: "1 जुलाई 2026 से लागू हुआ VB-G RAM G Act: ग्रामीण रोजगार में बड़े बदलाव",
    titleEn: "VB-G RAM G Act Effective from July 1, 2026: Major Reforms in Rural Employment",
    excerpt: "1 जुलाई 2026 से देश में नया ग्रामीण रोजगार कानून (VB-G RAM G) लागू हो गया है, जिसने मनरेगा का स्थान लिया है। इसके तहत रोजगार गारंटी 100 से बढ़ाकर 125 दिन और दिहाड़ी बढ़ाकर ₹327.4 कर दी गई है।",
    excerptEn: "The new rural employment law (VB-G RAM G) has come into force on July 1, 2026, replacing MGNREGA. It increases the employment guarantee from 100 to 125 days and the daily wage to ₹327.4.",
    ca_date: "2026-07-01", // Match current local time date for immediate view
    publishedAt: new Date().toISOString(),
    featured: true,
    readingTime: 6,
    keywords: [
      "VB-G RAM G Act",
      "Viksit Bharat Rural Employment",
      "MGNREGA replacement",
      "मनरेगा",
      "विकसित भारत गारंटी रोजगार",
      "UPSC Polity & Economy",
      "Rural Development Scheme"
    ],
    category: { _type: "reference", _ref: "cat-polity" }, // Polity & Governance / Social Justice
    author: { _type: "reference", _ref: "author-aakar" },
    tags: [
      { _type: "reference", _ref: "tag-upsc" },
      { _type: "reference", _ref: "tag-mppsc" },
      { _type: "reference", _ref: "tag-prelims" },
      { _type: "reference", _ref: "tag-mains" }
    ],
    syllabus: ["GS-2", "GS-3", "Prelims-GS"],
    sections: [
      {
        _key: "sec-context",
        kind: "whyInNews",
        title: "प्रसंग (Context)",
        titleEn: "Why in News?",
        body: [
          {
            _key: "b1",
            _type: "block",
            children: [
              {
                _key: "s1",
                _type: "span",
                text: "1 जुलाई 2026 से देश भर में नया ग्रामीण रोजगार कानून 'विकसित भारत-गारंटी फॉर रोजगार और आजीविका मिशन (ग्रामीण) कानून, 2025' (VB-G RAM G) लागू हो गया है। इस ऐतिहासिक कानून का राष्ट्रीय शुभारंभ 2 जुलाई 2026 को आंध्र प्रदेश के तिरुपति जिले के मुक्कावरिपल्ली गांव में किया जाएगा, जहां ग्रामीणों को नए रोजगार गारंटी कार्ड बांटे जाएंगे।",
              },
            ],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b1",
            _type: "block",
            children: [
              {
                _key: "s1",
                _type: "span",
                text: "The new rural employment legislation, 'Viksit Bharat-Guarantee for Employment and Livelihood Mission (Rural) Act, 2025' (VB-G RAM G), has come into effect nationwide starting July 1, 2026. The national launch of this historic act is scheduled for July 2, 2026, in Mukkaparipalli village, Tirupati district, Andhra Pradesh, where new rural employment guarantee cards will be distributed to beneficiaries.",
              },
            ],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-background",
        kind: "background",
        title: "पृष्ठभूमि: मनरेगा का स्थान लिया",
        titleEn: "Background: Replaced MGNREGA",
        body: [
          {
            _key: "b2",
            _type: "block",
            children: [
              {
                _key: "s2",
                _type: "span",
                text: "इस नए कानून ने वर्ष 2005 के 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम' (मनरेगा) का स्थान लिया है। यह बदलाव ग्रामीण विकास नीति में एक महत्वपूर्ण मोड़ को प्रदर्शित करता है, जो मुख्य रूप से नीचे से ऊपर की 'मांग-आधारित प्रणाली' से बदलकर केंद्र द्वारा निर्देशित 'आपूर्ति-आधारित योजना' की ओर केंद्रित है।",
              },
            ],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "b2",
            _type: "block",
            children: [
              {
                _key: "s2",
                _type: "span",
                text: "This new law replaces the landmark 'Mahatma Gandhi National Rural Employment Guarantee Act' (MGNREGA) of 2005. It marks a significant shift in rural development policy, transitioning from a bottom-up 'demand-driven system' to a centralized 'supply-based scheme'.",
              },
            ],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-highlights",
        kind: "keyHighlights",
        title: "मुख्य प्रावधान और विशेषताएं",
        titleEn: "Key Provisions and Features",
        body: [
          {
            _key: "bh-1",
            _type: "block",
            children: [{ _key: "sh-1", _type: "span", text: "• रोजगार की अवधि में वृद्धि: ग्रामीण वयस्क सदस्यों के लिए वैधानिक रोजगार गारंटी को 100 दिनों से बढ़ाकर 125 दिन प्रति वित्तीय वर्ष किया गया है।" }],
            style: "normal",
          },
          {
            _key: "bh-2",
            _type: "block",
            children: [{ _key: "sh-2", _type: "span", text: "• दिहाड़ी में बढ़ोतरी: देशभर में औसत दिहाड़ी ₹298.8 से बढ़ाकर ₹327.4 प्रतिदिन की गई है, जिससे प्रति व्यक्ति दैनिक औसत ₹28.6 का लाभ होगा।" }],
            style: "normal",
          },
          {
            _key: "bh-3",
            _type: "block",
            children: [{ _key: "sh-3", _type: "span", text: "• बजटीय सहायता: समय पर मजदूरी भुगतान के लिए केंद्र सरकार ने राज्यों एवं केंद्र शासित प्रदेशों को ₹95,692.31 करोड़ जारी किए हैं।" }],
            style: "normal",
          },
          {
            _key: "bh-4",
            _type: "block",
            children: [{ _key: "sh-4", _type: "span", text: "• वित्तीय हिस्सेदारी अनुपात: सामान्य राज्यों में व्यय साझेदारी केंद्र:राज्य का अनुपात 60:40 होगा, जबकि उत्तराखंड, हिमाचल प्रदेश, जम्मू-कश्मीर, पूर्वोत्तर राज्यों तथा केंद्र शासित प्रदेशों के लिए यह अनुपात 90:10 निर्धारित किया गया है।" }],
            style: "normal",
          },
          {
            _key: "bh-5",
            _type: "block",
            children: [{ _key: "sh-5", _type: "span", text: "• कृषि मौसम सुरक्षा: बुवाई और कटाई जैसे व्यस्त कृषि सीजन में कृषि श्रम की उपलब्धता बनाए रखने के लिए राज्य सरकारें वर्ष में अधिकतम 60 दिन इस योजना के तहत काम को सीमित कर सकेंगी।" }],
            style: "normal",
          },
          {
            _key: "bh-6",
            _type: "block",
            children: [{ _key: "sh-6", _type: "span", text: "• योजना निर्माण का आधार: कार्यों का नियोजन 'विकसित ग्राम पंचायत योजनाओं' (VGPP) के माध्यम से होगा, जिन्हें राष्ट्रीय स्थानिक नियोजन प्रणालियों के साथ एकीकृत किया जाएगा।" }],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "bh-1",
            _type: "block",
            children: [{ _key: "sh-1", _type: "span", text: "• Increased Employment Guarantee: Legally guarantees 125 days of wage employment per financial year for rural households (previously 100 days)." }],
            style: "normal",
          },
          {
            _key: "bh-2",
            _type: "block",
            children: [{ _key: "sh-2", _type: "span", text: "• Wage Hike: The national average daily wage is raised from ₹298.8 to ₹327.4 per day, netting an average daily increase of ₹28.6." }],
            style: "normal",
          },
          {
            _key: "bh-3",
            _type: "block",
            children: [{ _key: "sh-3", _type: "span", text: "• Budgetary Support: An initial sum of ₹95,692.31 crore has been released to states and UTs to prevent delays in wage payouts." }],
            style: "normal",
          },
          {
            _key: "bh-4",
            _type: "block",
            children: [{ _key: "sh-4", _type: "span", text: "• Center-State Sharing Ratio: Set at 60:40 for general states, and 90:10 for North-Eastern, Himalayan states (Uttarakhand, Himachal), J&K, and Union Territories." }],
            style: "normal",
          },
          {
            _key: "bh-5",
            _type: "block",
            children: [{ _key: "sh-5", _type: "span", text: "• Agri Season Safeguard: States can suspend/limit works for up to 60 days in a financial year during busy farming seasons (sowing & harvesting) to ensure agricultural labor availability." }],
            style: "normal",
          },
          {
            _key: "bh-6",
            _type: "block",
            children: [{ _key: "sh-6", _type: "span", text: "• VGPP Planning Structure: Projects will be conceptualized via Developed Gram Panchayat Plans (VGPP) and integrated with national spatial planning networks." }],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-concerns",
        kind: "importance",
        title: "श्रमिकों और विश्लेषकों की चिंताएं",
        titleEn: "Concerns Raised by Workers and Activists",
        body: [
          {
            _key: "bc-1",
            _type: "block",
            children: [{ _key: "sc-1", _type: "span", text: "• वित्तीय व्यवहार्यता पर संशय: विश्लेषकों का मानना है कि बढ़ा हुआ 125 दिनों का रोजगार वादा पर्याप्त बजटीय सहयोग के बिना लागू किया जा रहा है। कोई भी प्रमुख राज्य अपने सक्रिय कार्डधारकों को वादे के आधे दिन भी काम देने की स्थिति में नहीं है।" }],
            style: "normal",
          },
          {
            _key: "bc-2",
            _type: "block",
            children: [{ _key: "sc-2", _type: "span", text: "• मजदूरी दरों में अस्पष्टता: नियमों में वैधानिक न्यूनतम मजदूरी दरों की कानूनी गारंटी को लेकर स्पष्टता का अभाव है।" }],
            style: "normal",
          },
          {
            _key: "bc-3",
            _type: "block",
            children: [{ _key: "sc-3", _type: "span", text: "• बायोमेट्रिक और तकनीकी विफलता: चेहरे की पहचान और बायोमेट्रिक उपस्थिति का सामाजिक कार्यकर्ताओं ने पुरजोर विरोध किया है, क्योंकि इंटरनेट और सर्वर की खराब स्थिति के कारण श्रमिकों के कार्य-दिवस व मजदूरी का नुकसान हो रहा है।" }],
            style: "normal",
          },
          {
            _key: "bc-4",
            _type: "block",
            children: [{ _key: "sc-4", _type: "span", text: "• राज्यों पर बढ़ता वित्तीय बोझ: मनरेगा के तहत मजदूरी का 100% केंद्र वहन करता था, लेकिन नए कानून में सामान्य राज्यों को 40% खर्च स्वयं उठाना होगा, जिससे कई गरीब राज्यों के बजट पर दबाव पड़ेगा और क्षेत्रीय असमानता बढ़ेगी।" }],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "bc-1",
            _type: "block",
            children: [{ _key: "sc-1", _type: "span", text: "• Lack of Financial Backup: Analysts state that the 125-day promise lacks matching fiscal capacity. No major state has the administration or funds to provide even 60 days of work to all active cardholders." }],
            style: "normal",
          },
          {
            _key: "bc-2",
            _type: "block",
            children: [{ _key: "sc-2", _type: "span", text: "• Wage Rate Ambiguity: The rules do not clearly define or legally guarantee statutory minimum wage standards." }],
            style: "normal",
          },
          {
            _key: "bc-3",
            _type: "block",
            children: [{ _key: "sc-3", _type: "span", text: "• Biometric Failures: Activists protest mandatory facial recognition and biometrics, highlighting that technical glitched cause loss of wages and work tracking in remote areas." }],
            style: "normal",
          },
          {
            _key: "bc-4",
            _type: "block",
            children: [{ _key: "sc-4", _type: "span", text: "• Higher Financial Burden on States: Shifting from a 100% central wage subsidy to a 60:40 cost sharing model will stress the resources of poorer states, leading to uneven execution." }],
            style: "normal",
          },
        ],
      },
      {
        _key: "sec-facts",
        kind: "factsAtAGlance",
        title: "VB-G RAM G Act: परीक्षा उपयोगी मुख्य तथ्य",
        titleEn: "VB-G RAM G Act: Key Exam Facts",
        body: [
          {
            _key: "bf-1",
            _type: "block",
            children: [{ _key: "sf-1", _type: "span", text: "• प्रतिस्थापित कानून: महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (मनरेगा), 2005" }],
            style: "normal",
          },
          {
            _key: "bf-2",
            _type: "block",
            children: [{ _key: "sf-2", _type: "span", text: "• नया रोजगार कोटा: 125 दिन प्रति वित्तीय वर्ष (पहले 100 दिन था)" }],
            style: "normal",
          },
          {
            _key: "bf-3",
            _type: "block",
            children: [{ _key: "sf-3", _type: "span", text: "• नई राष्ट्रीय औसत दिहाड़ी: ₹327.4 प्रतिदिन (₹28.6 की बढ़ोतरी)" }],
            style: "normal",
          },
          {
            _key: "bf-4",
            _type: "block",
            children: [{ _key: "sf-4", _type: "span", text: "• वित्तीय भागीदारी अनुपात (केंद्र:राज्य): सामान्य राज्य (60:40), पूर्वोत्तर एवं हिमालयी राज्य/UTs (90:10)" }],
            style: "normal",
          },
          {
            _key: "bf-5",
            _type: "block",
            children: [{ _key: "sf-5", _type: "span", text: "• योजना नियोजन ढांचा: विकसित ग्राम पंचायत योजनाएं (VGPP) और स्थानिक नियोजन एकीकरण" }],
            style: "normal",
          },
        ],
        bodyEn: [
          {
            _key: "bf-1",
            _type: "block",
            children: [{ _key: "sf-1", _type: "span", text: "• Replaced Act: Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA), 2005" }],
            style: "normal",
          },
          {
            _key: "bf-2",
            _type: "block",
            children: [{ _key: "sf-2", _type: "span", text: "• Guaranteed Days: 125 days per financial year (previously 100)" }],
            style: "normal",
          },
          {
            _key: "bf-3",
            _type: "block",
            children: [{ _key: "sf-3", _type: "span", text: "• New Average Wage: ₹327.4 per day (Increase of ₹28.6)" }],
            style: "normal",
          },
          {
            _key: "bf-4",
            _type: "block",
            children: [{ _key: "sf-4", _type: "span", text: "• Fund Share (Center:State): General States (60:40), NE & Hill States/UTs (90:10)" }],
            style: "normal",
          },
          {
            _key: "bf-5",
            _type: "block",
            children: [{ _key: "sf-5", _type: "span", text: "• Planning Strategy: Developed Gram Panchayat Plans (VGPP) integrated with national spatial mapping" }],
            style: "normal",
          },
        ],
      },
    ],
    mcqs: [
      {
        question: "हाल ही में 1 जुलाई 2026 से लागू हुए 'VB-G RAM G Act' ने किस पूर्ववर्ती ग्रामीण रोजगार कानून का स्थान लिया है?",
        questionEn: "Which former rural employment act has been replaced by the 'VB-G RAM G Act', effective from July 1, 2026?",
        options: [
          "ग्रामीण रोजगार गारंटी अधिनियम, 1980",
          "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (मनरेगा), 2005",
          "राष्ट्रीय ग्रामीण विकास अधिनियम, 2010",
          "विकसित ग्राम विकास अधिनियम, 2020"
        ],
        optionsEn: [
          "Rural Employment Guarantee Act, 1980",
          "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA), 2005",
          "National Rural Development Act, 2010",
          "Viksit Gram Vikas Act, 2020"
        ],
        correctIndex: 1,
        explanation: "VB-G RAM G कानून, 2025 ने वर्ष 2005 के मनरेगा अधिनियम का स्थान लिया है और ग्रामीण रोजगार की अवधारणा को मांग-आधारित से बदलकर आपूर्ति-आधारित योजना में परिवर्तित कर दिया है।",
        explanationEn: "The VB-G RAM G Act, 2025 has replaced the MGNREGA Act of 2005, shifting the rural employment concept from a demand-driven framework to a supply-based scheme."
      },
      {
        question: "नये VB-G RAM G कानून के तहत सामान्य राज्यों के लिए केंद्र और राज्य सरकार के बीच वित्तीय साझेदारी का अनुपात क्या निर्धारित किया गया है?",
        questionEn: "What is the funding sharing ratio determined between the Center and state governments for general states under the new VB-G RAM G Act?",
        options: [
          "50:50",
          "90:10",
          "75:25",
          "60:40"
        ],
        optionsEn: [
          "50:50",
          "90:10",
          "75:25",
          "60:40"
        ],
        correctIndex: 3,
        explanation: "VB-G RAM G कानून के तहत सामान्य राज्यों में खर्च का अनुपात 60:40 (केंद्र:राज्य) है, जबकि पूर्वोत्तर व पर्वतीय राज्यों तथा केंद्रशासित प्रदेशों में यह अनुपात 90:10 है।",
        explanationEn: "Under the VB-G RAM G Act, the funding ratio is 60:40 (Center:State) for general states, and 90:10 for North-Eastern, Himalayan states, and UTs."
      }
    ],
    faqs: [
      {
        question: "VB-G RAM G कानून के तहत गारंटीकृत रोजगार के दिनों की संख्या कितनी है?",
        questionEn: "What is the number of guaranteed employment days under the VB-G RAM G Act?",
        answer: "इस नए कानून के तहत अब प्रति वर्ष ग्रामीण वयस्क परिवारों को 100 दिनों के स्थान पर 125 दिनों के रोजगार की कानूनी गारंटी दी जाएगी।",
        answerEn: "Under this new law, rural adult households are legally guaranteed 125 days of employment per year instead of the previous 100 days."
      },
      {
        question: "योजना में राज्यों को कृषि के व्यस्त मौसम में काम सीमित करने का क्या अधिकार दिया गया है?",
        questionEn: "What authority has been given to states regarding peak agricultural seasons under the scheme?",
        answer: "राज्य सरकारें बुवाई और कटाई जैसे व्यस्त कृषि सीजन के दौरान श्रमबल की उपलब्धता सुनिश्चित करने के लिए साल में अधिकतम 60 दिन इस योजना के तहत काम को सीमित कर सकती हैं।",
        answerEn: "To ensure labor availability during peak agricultural seasons like sowing and harvesting, state governments can restrict works under this scheme for a maximum of 60 days in a year."
      }
    ],
    sources: [
      {
        label: "Press Information Bureau (PIB) Press Release",
        url: "https://pib.gov.in/PressReleasePage.aspx?PRID=2259703"
      }
    ],
  };

  try {
    await client.createOrReplace(article);
    console.log("✨ Successfully uploaded VB-G RAM G Act Article to Sanity!");
  } catch (err) {
    console.error("❌ Failed to create/replace document in Sanity:", err);
  }
}

main().catch((err) => {
  console.error("❌ Error running script:", err);
  process.exit(1);
});
