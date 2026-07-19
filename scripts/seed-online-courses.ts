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

const defaultCourses = [
  {
    slug: "upsc-foundation-complete",
    titleHi: "UPSC फाउंडेशन: संपूर्ण तैयारी (प्रारंभिक + मुख्य)",
    titleEn: "UPSC Foundation: Complete Preparation (Pre + Mains)",
    category: "upsc",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXEnrNW7mqPlPf2lNnehc2QRXSBjKRQqgNjCXGqV8olecJXdUqngVKM4-9NVczsBWX3bG7HfDZNJCRZhsFf76pv3vYsfbaE7X2IC1BNIq803qa1BJBMnr7bUY5K-b3z3MS2sO82wOsAfW-S8PgQBL-Ag29KQzIAdUczOgrJxSKaWR7nIvx2y419mWtRPhHx6LIz7JrDMoyC2LbBk9zIdGGOGWQBDvNK_IWVw-_4G0mqGXTObdKQAT_mrb9yFtaxBZowW8Hq_QM-QM",
    altHi: "UPSC फाउंडेशन कोर्स क्लासरूम",
    altEn: "UPSC Foundation Course Classroom",
    badgeHi: "प्रवेश प्रारंभ",
    badgeEn: "Admission Open",
    isLive: true,
    mentorNameHi: "डॉ. विकास शर्मा",
    mentorNameEn: "Dr. Vikas Sharma",
    mentorTitleHi: "वरिष्ठ शिक्षक (नैतिकता और अंतर्राष्ट्रीय संबंध)",
    mentorTitleEn: "Senior Faculty (Ethics & IR)",
    mentorImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBasIuRf-FwvPuw6Vm_y3KRPEe2I2HesK9DQkGEol0RogyZhS7shvO9HURrx27Qd2KyhVQUNfVvPXiD8zzrgGcsyF3a3Ci9hkjKtAOmMQe3OWHW_NSIQbP1SO_qwMQZLKvtFSbvtKR50Iax_dXvdUsVACU72cAef4B8yyl9clooJtKI1psGhvApkV7OjoIbAAv12o5CWqRaJuGZawoLSWw65kzcHiCMsR_cVPYa1rKknRcQqSAcZSYMYVUgi-U08qfLZ1R4RLSr0-s",
    mentorBioHi: "डॉ. विकास शर्मा 15+ वर्षों के अनुभव के साथ UPSC और राज्य PSC की तैयारी करवाने वाले वरिष्ठ शिक्षक हैं। नैतिकता (Ethics), अंतर्राष्ट्रीय संबंध (IR) और भारतीय राजव्यवस्था (Polity) में विशेषज्ञता।",
    mentorBioEn: "Dr. Vikas Sharma is a senior educator preparing students for UPSC and State PSC exams with 15+ years of experience. Expert in Ethics, International Relations (IR), and Indian Polity.",
    price: "₹54,999",
    originalPrice: "₹85,000",
    durationHi: "18 महीने",
    durationEn: "18 Months",
    lecturesCountHi: "600+ लेक्चर्स",
    lecturesCountEn: "600+ Lectures",
    studentsCountHi: "3.5k+ छात्र",
    studentsCountEn: "3.5k+ Students",
    rating: "4.9",
    descriptionHi: "UPSC सिविल सेवा परीक्षा (IAS/IPS/IFS) की प्रारंभिक और मुख्य परीक्षा दोनों की संपूर्ण तैयारी के लिए डिज़ाइन किया गया फाउंडेशन कोर्स। NCERTs से लेकर एडवांस्ड टॉपिक्स तक, सब कुछ एक ही बैच में।",
    descriptionEn: "A complete foundation course designed for both Prelims and Mains of UPSC CSE (IAS/IPS/IFS). Covering everything from basic NCERTs to advanced topics in a single batch.",
    whatYouLearnHi: [
      "संपूर्ण NCERT कवरेज (कक्षा 6 से 12 तक)",
      "GS Paper I-IV का विस्तृत अध्ययन",
      "CSAT (Paper II) के लिए विशेष सत्र",
      "उत्तर लेखन अभ्यास (Answer Writing Practice)",
      "निबंध लेखन (Essay Writing) कार्यशाला",
      "साक्षात्कार मार्गदर्शन (Interview Guidance)",
      "दैनिक करेंट अफेयर्स विश्लेषण",
      "माइंड मैप और रिवीजन शीट्स",
    ],
    whatYouLearnEn: [
      "Complete NCERT coverage (Class 6th to 12th)",
      "Detailed study of GS Papers I-IV",
      "Special sessions for CSAT (Paper II)",
      "Structured Answer Writing Practice",
      "Essay Writing Workshop",
      "Interview Guidance & Mock Interviews",
      "Daily Current Affairs Analysis",
      "Mind Maps and Revision Sheets",
    ],
    highlightsHi: [
      "लाइव + रिकॉर्डेड दोनों मोड में उपलब्ध",
      "दैनिक डाउट सेशन (Live Doubt Clearing)",
      "मासिक मॉक टेस्ट सीरीज़",
      "व्यक्तिगत मेंटरशिप और प्रगति ट्रैकिंग",
    ],
    highlightsEn: [
      "Available in both Live and Recorded modes",
      "Daily Live Doubt Clearing Sessions",
      "Monthly Mock Test Series",
      "Personal Mentorship and progress tracking",
    ],
    syllabus: [
      {
        titleHi: "Module 1: भारतीय इतिहास",
        titleEn: "Module 1: Indian History",
        topicsHi: [
          "प्राचीन भारत — सिंधु घाटी, वैदिक काल, मौर्य एवं गुप्त साम्राज्य",
          "मध्यकालीन भारत — दिल्ली सल्तनत, मुगल साम्राज्य, भक्ति आंदोलन",
          "आधुनिक भारत — ब्रिटिश शासन, स्वतंत्रता आंदोलन, गांधी युग",
          "कला एवं संस्कृति — भारतीय विरासत, स्थापत्य, साहित्य",
        ],
        topicsEn: [
          "Ancient India — Indus Valley, Vedic Era, Mauryan & Gupta Empires",
          "Medieval India — Delhi Sultanate, Mughal Empire, Bhakti Movement",
          "Modern India — British Rule, Freedom Struggle, Gandhian Era",
          "Art & Culture — Indian Heritage, Architecture, Literature",
        ],
      },
      {
        titleHi: "Module 2: भूगोल",
        titleEn: "Module 2: Geography",
        topicsHi: [
          "भौतिक भूगोल — भू-आकृतियाँ, जलवायु, महासागर",
          "भारत का भूगोल — भौतिक, आर्थिक, मानव भूगोल",
          "विश्व भूगोल — महाद्वीप, देश, प्रमुख मुद्दे",
          "पर्यावरण एवं पारिस्थितिकी — जैव विविधता, जलवायु परिवर्तन",
        ],
        topicsEn: [
          "Physical Geography — Landforms, Climate, Oceans",
          "Geography of India — Physical, Economic, Human Geography",
          "World Geography — Continents, Countries, Key issues",
          "Environment & Ecology — Biodiversity, Climate Change",
        ],
      },
      {
        titleHi: "Module 3: भारतीय राजव्यवस्था",
        titleEn: "Module 3: Indian Polity",
        topicsHi: [
          "संविधान का ऐतिहासिक विकास और प्रस्तावना",
          "मौलिक अधिकार, नीति निदेशक तत्व, मौलिक कर्तव्य",
          "संसद, राज्य विधानमंडल, न्यायपालिका",
          "संवैधानिक निकाय — निर्वाचन आयोग, CAG, UPSC",
        ],
        topicsEn: [
          "Historical Underpinnings and Preamble",
          "Fundamental Rights, DPSPs, Fundamental Duties",
          "Parliament, State Legislatures, Judiciary",
          "Constitutional Bodies — Election Commission, CAG, UPSC",
        ],
      },
    ],
    features: [
      { icon: "Clock", labelHi: "अवधि", labelEn: "Duration", valueHi: "18 महीने", valueEn: "18 Months" },
      { icon: "Video", labelHi: "लेक्चर्स", labelEn: "Lectures", valueHi: "600+", valueEn: "600+" },
      { icon: "FileText", labelHi: "टेस्ट सीरीज़", labelEn: "Test Series", valueHi: "50+ मॉक", valueEn: "50+ Mocks" },
      { icon: "Users", labelHi: "छात्र", labelEn: "Students", valueHi: "3,500+", valueEn: "3,500+" },
    ],
    testimonials: [
      {
        nameHi: "अंकित कुमार",
        nameEn: "Ankit Kumar",
        examHi: "UPSC CSE 2024 — AIR 127",
        examEn: "UPSC CSE 2024 — AIR 127",
        textHi: "आकार IAS के फाउंडेशन कोर्स ने मेरी तैयारी को पूरी तरह बदल दिया। डॉ. शर्मा सर की Ethics की क्लासेस बेहतरीन हैं।",
        textEn: "Aakar IAS foundation course completely transformed my prep. Dr. Sharma's Ethics classes are absolutely top-class.",
      },
    ],
    orderIndex: 1,
  },
  {
    slug: "mppsc-prelims-target-batch",
    titleHi: "MPPSC Prelims: Target Batch (लक्ष्य बैच)",
    titleEn: "MPPSC Prelims: Target Batch (Lakshya Batch)",
    category: "mppsc",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqoqqTMKjzHPda2w1Up3p9dqyRRwNXgpao_jDYnIaPOeN2eLBJwuiMzKd8cBOv3YUdHFZVA9uWT0i_m04-Fi67j4HrZqROmthlsHI481o_Kv08Oz2Q-WqZJcxLxYu46KH2lxK84CZBddv7AjeXvlmS-0Pw4UjnxirW3udkCXYjYeFOwHfq2koXo0cmVIWi5NNX0ytCEIG4sMmiiuzE1RQQi0VF1CEL1azLNgz3-ENbUJAi6aGttaHTWWoIFS_j3IDk8127ummSxWM",
    altHi: "MPPSC प्रारंभिक परीक्षा टार्गेट बैच",
    altEn: "MPPSC Prelims Target Batch",
    badgeHi: "लोकप्रिय",
    badgeEn: "Popular",
    isLive: false,
    mentorNameHi: "अभिषेक सिंह",
    mentorNameEn: "Abhishek Singh",
    mentorTitleHi: "भूगोल विशेषज्ञ",
    mentorTitleEn: "Geography Specialist",
    mentorImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMm43JkhzD3LpABHyegIEtE8cY7u5f-axTxaEVeOAe60J6wEMZRfhY23vBenlkasjiMENLMScGoZJzTsSj2fqDtSPUxrPZskSAM_39lPIjtJ7nlOi7SCLHbC7WXQfImSoeZiBHoMmxbH_coro_sg-w504L4_tvZCyORrZ-t8YdeXLp91_o2qsqrjgTN406pR4RY2ndK7DE0WqN4dkeDAz5YSqw3jNmi1J289Sb0NZ3B0KyagUrexQUBabacxzzEsC3kzNacdYsX-A",
    mentorBioHi: "अभिषेक सिंह MPPSC और भूगोल विषय के विशेषज्ञ शिक्षक हैं। 10+ वर्षों से MP PSC की तैयारी करवा रहे हैं।",
    mentorBioEn: "Abhishek Singh is an expert in geography and MPPSC preparation with over 10+ years of training students.",
    price: "₹12,499",
    originalPrice: "₹24,999",
    durationHi: "12 महीने",
    durationEn: "12 Months",
    lecturesCountHi: "450+ लेक्चर्स",
    lecturesCountEn: "450+ Lectures",
    studentsCountHi: "1.2k छात्र",
    studentsCountEn: "1.2k Students",
    rating: "4.8",
    descriptionHi: "MPPSC प्रारंभिक परीक्षा (Prelims) के लिए विशेष रूप से तैयार किया गया लक्ष्य बैच। मध्यप्रदेश के GK, भूगोल, इतिहास और राजव्यवस्था पर विशेष फोकस।",
    descriptionEn: "A target batch specifically designed for MPPSC Prelims. Focused heavily on Madhya Pradesh GK, geography, history, and polity.",
    whatYouLearnHi: [
      "MPPSC Prelims GS Paper I & II संपूर्ण कवरेज",
      "मध्यप्रदेश सामान्य ज्ञान (MP GK) विशेष",
      "MP का भूगोल, इतिहास, अर्थव्यवस्था",
      "CSAT (Paper II) स्ट्रैटेजी और प्रैक्टिस",
      "Previous Year Papers (PYQ) का विश्लेषण",
      "साप्ताहिक मॉक टेस्ट",
    ],
    whatYouLearnEn: [
      "Full coverage of MPPSC Prelims GS Paper I & II",
      "Madhya Pradesh Special GK details",
      "Geography, History & Economy of MP",
      "CSAT (Paper II) Strategy and practice",
      "Previous Year Papers (PYQ) analysis",
      "Weekly mock tests",
    ],
    highlightsHi: [
      "MP GK पर विशेष जोर",
      "रिकॉर्डेड लेक्चर — कभी भी देखें",
      "सेक्शन-वाइज़ टेस्ट सीरीज़",
      "PYQ-आधारित रिवीजन सत्र",
    ],
    highlightsEn: [
      "Special emphasis on MP GK",
      "Recorded lectures — learn anytime",
      "Section-wise mock test series",
      "PYQ-based revision classes",
    ],
    syllabus: [
      {
        titleHi: "Module 1: मध्यप्रदेश सामान्य ज्ञान",
        titleEn: "Module 1: Madhya Pradesh GK",
        topicsHi: [
          "MP का भौतिक एवं राजनीतिक भूगोल",
          "MP का इतिहास — प्राचीन से आधुनिक तक",
          "MP की जनजातियाँ, लोक कलाएँ, त्योहार",
        ],
        topicsEn: [
          "Physical and Political Geography of MP",
          "History of MP — Ancient to Modern",
          "Tribes, Folk Art, and festivals of MP",
        ],
      },
    ],
    features: [
      { icon: "Clock", labelHi: "अवधि", labelEn: "Duration", valueHi: "12 महीने", valueEn: "12 Months" },
      { icon: "Video", labelHi: "लेक्चर्स", labelEn: "Lectures", valueHi: "450+", valueEn: "450+" },
      { icon: "FileText", labelHi: "टेस्ट सीरीज़", labelEn: "Test Series", valueHi: "30+ मॉक", valueEn: "30+ Mocks" },
    ],
    testimonials: [
      {
        nameHi: "सुमित पटेल",
        nameEn: "Sumit Patel",
        examHi: "MPPSC 2024 — Rank 42",
        examEn: "MPPSC 2024 — Rank 42",
        textHi: "MP GK की तैयारी इस बैच से बहुत अच्छी हुई। PYQ analysis सबसे useful रहा।",
        textEn: "My MP GK preparation was superb through this batch. PYQ analysis was extremely useful.",
      },
    ],
    orderIndex: 2,
  },
  {
    slug: "mpsi-hindi-gs-batch",
    titleHi: "MPSI: विशेष हिंदी एवं जीएस बैच (मध्य प्रदेश सब इंस्पेक्टर)",
    titleEn: "MPSI: Special Hindi & GS Batch (MP Sub Inspector)",
    category: "mpsi",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNr_z6AuIKB3CoSQROu3-Azucl00i6y9RbS6PIqXn_a5BcQomv-v0hWdnZdYlSHygXPjiQwrWxuCFB431T0J2mqCVRzjc99aH5x1DXy6AbJFqY418KvarUBp22eJpffEvSwgPxwdaIgz-eJDKGJbh9zqcUEbnJ-t54XgFzpsz8CQWFPp_VA8XBcQ_kvEVk9AyegleShvcwj_18LPZc0waeFsxifNs1oT9J5CWQ-e-xsiG7Czsodrpb8J8xhrkHvd95oIDuVvhoC3A",
    altHi: "MPSI विशेष कोर्स",
    altEn: "MPSI Special Course",
    badgeHi: "हिंदी माध्यम",
    badgeEn: "Hindi Medium",
    isLive: false,
    mentorNameHi: "संजीव पटेल",
    mentorNameEn: "Sanjeev Patel",
    mentorTitleHi: "संविधान एवं राजव्यवस्था विशेषज्ञ",
    mentorTitleEn: "Polity & Governance Expert",
    mentorImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY0ecFm-5I8DSDL58UhRfqDCpBHtdmgLJ2rJ-vSZaLAqZLUWyPUdpjH_1-QIB_QkpoBgMhvdQvLPUGM4zsEjCYigMmwlsgjqjESJ0PRYXwmkX9wAxapQicKA4BU1KhLDUVk0EjmgGV4kSxv8n8aiu2z9CYvcY3SXBE0gBeR49wDbcU19KDTyGSqby-bhHRbKAbc5HMiX6f17daJNSuRM80MsgYBIRthWXH5wGCF9Nnq6zGk70h45odlILwdYTG1ekjp8H9bnk168k",
    mentorBioHi: "संजीव पटेल MP पुलिस भर्ती (SI/ASI) और Polity विषय के विशेषज्ञ हैं। हिंदी माध्यम से पढ़ाने में माहिर।",
    mentorBioEn: "Sanjeev Patel is a constitution and polity specialist preparing aspirants for MP SI / ASI exams.",
    price: "₹4,999",
    originalPrice: "₹9,999",
    durationHi: "6 महीने",
    durationEn: "6 Months",
    lecturesCountHi: "250+ लेक्चर्स",
    lecturesCountEn: "250+ Lectures",
    studentsCountHi: "850 छात्र",
    studentsCountEn: "850 Students",
    rating: "4.9",
    descriptionHi: "मध्यप्रदेश पुलिस सब इंस्पेक्टर (MPSI) परीक्षा की तैयारी के लिए विशेष बैच। हिंदी व्याकरण, सामान्य ज्ञान और गणित पर गहन फोकस।",
    descriptionEn: "A customized batch focusing on MPSI preparation. Exhaustive coverage of Hindi Grammar, General Studies, and Mathematics.",
    whatYouLearnHi: [
      "हिंदी व्याकरण — संधि, समास, अलंकार, छंद",
      "सामान्य ज्ञान — भारत एवं MP",
      "गणित — अंकगणित, रीजनिंग",
    ],
    whatYouLearnEn: [
      "Hindi Grammar — Sandhi, Samas, Alankar",
      "General Knowledge — India and MP",
      "Mathematics and Reasoning",
    ],
    highlightsHi: [
      "100% हिंदी माध्यम में कक्षाएँ",
      "शारीरिक परीक्षा (Physical Test) गाइडेंस",
    ],
    highlightsEn: [
      "100% Hindi Medium classes",
      "Physical Fitness and test guidance",
    ],
    syllabus: [
      {
        titleHi: "Module 1: हिंदी व्याकरण",
        titleEn: "Module 1: Hindi Grammar",
        topicsHi: ["संधि, समास, उपसर्ग, प्रत्यय", "अलंकार, छंद, रस"],
        topicsEn: ["Morphology and compounding", "Figures of speech and poetics"],
      },
    ],
    features: [
      { icon: "Clock", labelHi: "अवधि", labelEn: "Duration", valueHi: "6 महीने", valueEn: "6 Months" },
    ],
    testimonials: [
      {
        nameHi: "आकाश यादव",
        nameEn: "Aakash Yadav",
        examHi: "MPSI 2024 — चयनित",
        examEn: "MPSI 2024 — Selected",
        textHi: "संजीव सर के हिंदी व्याकरण के नोट्स और क्लासेस बहुत उपयोगी थीं।",
        textEn: "Sanjeev Sir's Hindi grammar notes and mock practices were highly effective.",
      },
    ],
    orderIndex: 3,
  },
  {
    slug: "upsc-365-current-affairs",
    titleHi: "UPSC 365: व्यापक समसामयिकी (Current Affairs) विश्लेषण",
    titleEn: "UPSC 365: Comprehensive Current Affairs Analysis",
    category: "upsc",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr-O-6DdD29rwSqLNnFxs-L5ZTsBxSwErdUEd3_d7n_zQK17nUv1UB-Wx12Wm2we2JHsyqZZ3uac4mhAPz4WHP2CK6ykkrjt8o-v-omjGpFiBkInt3zgJklEiqwXuGFS-1R09GB4ds0-RXnea8sCZLluV3Fq59TStoNA__rJT_u91lHpyHVEcNY7549yMnJ77QF4VRZqMRplbg78cHi4NR0ZdlLOlYMrBNux1k7CoAuPcgK_DOLmLgjJOFZBjkTNsR5K6WyvEKTU4",
    altHi: "UPSC समसामयिकी बैच",
    altEn: "UPSC Current Affairs Batch",
    badgeHi: "बेस्टसेलर",
    badgeEn: "Bestseller",
    isLive: true,
    mentorNameHi: "प्रियंका वर्मा",
    mentorNameEn: "Priyanka Verma",
    mentorTitleHi: "इतिहास और संस्कृति विशेषज्ञ",
    mentorTitleEn: "History & Culture Specialist",
    mentorImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9mO9BmxgQukKvcfapkNp9YaGiKII8OUDDPz_CI8F7B9CReiJKlKVUJYkAmEgUTqz0OKxtqfZ3-p7UUTK8vmSyayuiYLXCBZDoqGoJRG7CvdtdX1GEK18qx3sodOuRMlffFJM86LEaxuGgalfw7OZg_5spJhA8nU2S14DOzL8pbGI4klenP22sulv2lG0r0XEayxpLqZuWDTYckc-6YkT9OLTjLXhsH8_U5tIaLBrPfLB2mwzVrhXCzAxkqETe4Fc2QK83OVrIwQk",
    mentorBioHi: "प्रियंका वर्मा इतिहास और कला एवं संस्कृति की विशेषज्ञ हैं। करेंट अफेयर्स को सिलेबस से जोड़कर पढ़ाती हैं।",
    mentorBioEn: "Priyanka Verma is a history and culture specialist, known for interlinking current affairs with GS core.",
    price: "₹4,499",
    originalPrice: "₹7,999",
    durationHi: "12 महीने",
    durationEn: "12 Months",
    lecturesCountHi: "दैनिक लाइव क्लास",
    lecturesCountEn: "Daily Live Classes",
    studentsCountHi: "15k+ छात्र",
    studentsCountEn: "15k+ Students",
    rating: "4.9",
    descriptionHi: "प्रतिदिन समसामयिकी (Current Affairs) का विस्तृत विश्लेषण UPSC दृष्टिकोण से। दैनिक PDF, साप्ताहिक टेस्ट और मासिक रिवीजन।",
    descriptionEn: "Daily UPSC-aligned Current Affairs analysis. Includes daily PDF summaries, weekly tests, and monthly compilations.",
    whatYouLearnHi: [
      "दैनिक करेंट अफेयर्स — UPSC Prelims + Mains दृष्टिकोण",
      "The Hindu, Indian Express, PIB का विश्लेषण",
      "साप्ताहिक MCQ टेस्ट सीरीज़",
    ],
    whatYouLearnEn: [
      "Daily Current Affairs analytics",
      "Editorial coverage of Hindu, IE, and PIB summaries",
      "Weekly MCQ Test Series",
    ],
    highlightsHi: [
      "365 दिन — दैनिक लाइव क्लास",
      "मासिक मैगज़ीन PDF संकलन",
    ],
    highlightsEn: [
      "365 Days — Daily Live Lectures",
      "Monthly Compilation Magazines",
    ],
    syllabus: [
      {
        titleHi: "दैनिक कार्यक्रम",
        titleEn: "Daily Schedule",
        topicsHi: ["सुबह 8 AM — DNA लाइव क्लास", " MCQs प्रैक्टिस क्विज़"],
        topicsEn: ["08:00 AM — DNA Live Lecture", "Daily MCQ practice quiz"],
      },
    ],
    features: [
      { icon: "Clock", labelHi: "अवधि", labelEn: "Duration", valueHi: "12 महीने", valueEn: "12 Months" },
    ],
    testimonials: [
      {
        nameHi: "दीपिका राठौर",
        nameEn: "Deepika Rathore",
        examHi: "UPSC Prelims — चयनित",
        examEn: "UPSC Prelims — Selected",
        textHi: "डेली DNA क्लास ने मेरी प्रीलिम्स परीक्षा निकालने में बहुत सहायता की।",
        textEn: "Daily DNA classes were extremely helpful in sorting out current affairs.",
      },
    ],
    orderIndex: 4,
  },
];

async function seed() {
  console.log("🌱 Starting to seed online courses...");

  for (const course of defaultCourses) {
    try {
      console.log(`📸 Uploading main cover image for ${course.titleEn}...`);
      const imgRes = await fetch(course.imageUrl);
      const imgBuf = Buffer.from(await imgRes.arrayBuffer());
      const imgAsset = await client.assets.upload("image", imgBuf, {
        filename: `${course.slug}-cover.jpg`,
      });

      console.log(`📸 Uploading mentor image for ${course.titleEn}...`);
      const mentorRes = await fetch(course.mentorImageUrl);
      const mentorBuf = Buffer.from(await mentorRes.arrayBuffer());
      const mentorAsset = await client.assets.upload("image", mentorBuf, {
        filename: `${course.slug}-mentor.jpg`,
      });

      console.log(`📝 Creating Sanity document for online course: ${course.titleEn}...`);
      await client.create({
        _type: "onlineCourse",
        slug: { _type: "slug", current: course.slug },
        titleHi: course.titleHi,
        titleEn: course.titleEn,
        category: course.category,
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: imgAsset._id },
        },
        altHi: course.altHi,
        altEn: course.altEn,
        badgeHi: course.badgeHi,
        badgeEn: course.badgeEn,
        isLive: course.isLive,
        mentorNameHi: course.mentorNameHi,
        mentorNameEn: course.mentorNameEn,
        mentorTitleHi: course.mentorTitleHi,
        mentorTitleEn: course.mentorTitleEn,
        mentorImage: {
          _type: "image",
          asset: { _type: "reference", _ref: mentorAsset._id },
        },
        mentorBioHi: course.mentorBioHi,
        mentorBioEn: course.mentorBioEn,
        price: course.price,
        originalPrice: course.originalPrice,
        durationHi: course.durationHi,
        durationEn: course.durationEn,
        lecturesCountHi: course.lecturesCountHi,
        lecturesCountEn: course.lecturesCountEn,
        studentsCountHi: course.studentsCountHi,
        studentsCountEn: course.studentsCountEn,
        rating: course.rating,
        descriptionHi: course.descriptionHi,
        descriptionEn: course.descriptionEn,
        whatYouLearnHi: course.whatYouLearnHi,
        whatYouLearnEn: course.whatYouLearnEn,
        highlightsHi: course.highlightsHi,
        highlightsEn: course.highlightsEn,
        syllabus: course.syllabus.map((s, idx) => ({
          _key: `module-${idx}`,
          _type: "syllabusModule",
          titleHi: s.titleHi,
          titleEn: s.titleEn,
          topicsHi: s.topicsHi,
          topicsEn: s.topicsEn,
        })),
        features: course.features.map((f, idx) => ({
          _key: `feature-${idx}`,
          _type: "courseFeature",
          icon: f.icon,
          labelHi: f.labelHi,
          labelEn: f.labelEn,
          valueHi: f.valueHi,
          valueEn: f.valueEn,
        })),
        testimonials: course.testimonials.map((t, idx) => ({
          _key: `testimonial-${idx}`,
          _type: "courseTestimonial",
          nameHi: t.nameHi,
          nameEn: t.nameEn,
          examHi: t.examHi,
          examEn: t.examEn,
          textHi: t.textHi,
          textEn: t.textEn,
        })),
        orderIndex: course.orderIndex,
      });

      console.log(`✅ Seeded ${course.titleEn} successfully.`);
    } catch (err: any) {
      console.error(`❌ Failed to seed ${course.titleEn}:`, err.message);
    }
  }

  console.log("🎉 Seeding completed!");
}

seed();
