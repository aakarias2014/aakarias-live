/**
 * Shared course data module — used by listing and detail pages.
 * All online courses are defined here with extended fields for the detail page.
 */

export interface SyllabusModule {
  title: string;
  topics: string[];
}

export interface Testimonial {
  name: string;
  exam: string;
  text: string;
  avatar?: string;
}

export interface CourseFeature {
  icon: string; // lucide icon name as string key
  label: string;
  value: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: "live" | "upsc" | "mppsc" | "mpsi" | "literature";
  image: string;
  alt: string;
  badge?: string;
  isLive?: boolean;
  enrollUrl?: string;
  mentorName: string;
  mentorTitle: string;
  mentorImage: string;
  mentorBio?: string;
  price: string;
  originalPrice: string;
  duration?: string;
  lecturesCount?: string;
  studentsCount?: string;
  rating?: string;
  description?: string;
  whatYouLearn?: string[];
  highlights?: string[];
  syllabus?: SyllabusModule[];
  features?: CourseFeature[];
  testimonials?: Testimonial[];
}

export const coursesData: Course[] = [
  {
    id: "featured-upsc",
    slug: "upsc-foundation-complete",
    title: "UPSC फाउंडेशन: संपूर्ण तैयारी (प्रारंभिक + मुख्य)",
    category: "upsc",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXEnrNW7mqPlPf2lNnehc2QRXSBjKRQqgNjCXGqV8olecJXdUqngVKM4-9NVczsBWX3bG7HfDZNJCRZhsFf76pv3vYsfbaE7X2IC1BNIq803qa1BJBMnr7bUY5K-b3z3MS2sO82wOsAfW-S8PgQBL-Ag29KQzIAdUczOgrJxSKaWR7nIvx2y419mWtRPhHx6LIz7JrDMoyC2LbBk9zIdGGOGWQBDvNK_IWVw-_4G0mqGXTObdKQAT_mrb9yFtaxBZowW8Hq_QM-QM",
    alt: "UPSC फाउंडेशन कोर्स क्लासरूम",
    badge: "Admission Open",
    isLive: true,
    mentorName: "Dr. Vikas Sharma",
    mentorTitle: "Senior Faculty (Ethics & IR)",
    mentorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBasIuRf-FwvPuw6Vm_y3KRPEe2I2HesK9DQkGEol0RogyZhS7shvO9HURrx27Qd2KyhVQUNfVvPXiD8zzrgGcsyF3a3Ci9hkjKtAOmMQe3OWHW_NSIQbP1SO_qwMQZLKvtFSbvtKR50Iax_dXvdUsVACU72cAef4B8yyl9clooJtKI1psGhvApkV7OjoIbAAv12o5CWqRaJuGZawoLSWw65kzcHiCMsR_cVPYa1rKknRcQqSAcZSYMYVUgi-U08qfLZ1R4RLSr0-s",
    mentorBio:
      "डॉ. विकास शर्मा 15+ वर्षों के अनुभव के साथ UPSC और राज्य PSC की तैयारी करवाने वाले वरिष्ठ शिक्षक हैं। नैतिकता (Ethics), अंतर्राष्ट्रीय संबंध (IR) और भारतीय राजव्यवस्था (Polity) में विशेषज्ञता।",
    price: "₹54,999",
    originalPrice: "₹85,000",
    duration: "18 Months",
    lecturesCount: "600+ Lectures",
    studentsCount: "3.5k+ Students",
    rating: "4.9",
    description:
      "UPSC सिविल सेवा परीक्षा (IAS/IPS/IFS) की प्रारंभिक और मुख्य परीक्षा दोनों की संपूर्ण तैयारी के लिए डिज़ाइन किया गया फाउंडेशन कोर्स। NCERTs से लेकर एडवांस्ड टॉपिक्स तक, सब कुछ एक ही बैच में।",
    whatYouLearn: [
      "संपूर्ण NCERT कवरेज (कक्षा 6 से 12 तक)",
      "GS Paper I-IV का विस्तृत अध्ययन",
      "CSAT (Paper II) के लिए विशेष सत्र",
      "उत्तर लेखन अभ्यास (Answer Writing Practice)",
      "निबंध लेखन (Essay Writing) कार्यशाला",
      "साक्षात्कार मार्गदर्शन (Interview Guidance)",
      "दैनिक करेंट अफेयर्स विश्लेषण",
      "माइंड मैप और रिवीजन शीट्स",
    ],
    highlights: [
      "लाइव + रिकॉर्डेड दोनों मोड में उपलब्ध",
      "दैनिक डाउट सेशन (Live Doubt Clearing)",
      "मासिक मॉक टेस्ट सीरीज़",
      "व्यक्तिगत मेंटरशिप और प्रगति ट्रैकिंग",
    ],
    syllabus: [
      {
        title: "Module 1: भारतीय इतिहास (Indian History)",
        topics: [
          "प्राचीन भारत — सिंधु घाटी, वैदिक काल, मौर्य एवं गुप्त साम्राज्य",
          "मध्यकालीन भारत — दिल्ली सल्तनत, मुगल साम्राज्य, भक्ति आंदोलन",
          "आधुनिक भारत — ब्रिटिश शासन, स्वतंत्रता आंदोलन, गांधी युग",
          "कला एवं संस्कृति — भारतीय विरासत, स्थापत्य, साहित्य",
        ],
      },
      {
        title: "Module 2: भूगोल (Geography)",
        topics: [
          "भौतिक भूगोल — भू-आकृतियाँ, जलवायु, महासागर",
          "भारत का भूगोल — भौतिक, आर्थिक, मानव भूगोल",
          "विश्व भूगोल — महाद्वीप, देश, प्रमुख मुद्दे",
          "पर्यावरण एवं पारिस्थितिकी — जैव विविधता, जलवायु परिवर्तन",
        ],
      },
      {
        title: "Module 3: भारतीय राजव्यवस्था (Indian Polity)",
        topics: [
          "संविधान का ऐतिहासिक विकास और प्रस्तावना",
          "मौलिक अधिकार, नीति निदेशक तत्व, मौलिक कर्तव्य",
          "संसद, राज्य विधानमंडल, न्यायपालिका",
          "संवैधानिक निकाय — निर्वाचन आयोग, CAG, UPSC",
        ],
      },
      {
        title: "Module 4: अर्थव्यवस्था (Economy)",
        topics: [
          "भारतीय अर्थव्यवस्था की मूल अवधारणाएँ",
          "बजट, राजकोषीय नीति, मौद्रिक नीति",
          "बैंकिंग एवं वित्तीय संस्थाएँ — RBI, SEBI, NABARD",
          "आर्थिक सुधार, FDI, Make in India, आत्मनिर्भर भारत",
        ],
      },
      {
        title: "Module 5: विज्ञान एवं प्रौद्योगिकी (Science & Tech)",
        topics: [
          "अंतरिक्ष प्रौद्योगिकी — ISRO, चंद्रयान, मंगलयान",
          "जैव प्रौद्योगिकी — जीन थेरेपी, GMO, नैनोटेक",
          "IT एवं साइबर सुरक्षा",
          "रक्षा प्रौद्योगिकी एवं परमाणु नीति",
        ],
      },
      {
        title: "Module 6: नैतिकता (Ethics & Governance)",
        topics: [
          "नैतिकता के सिद्धांत — ईमानदारी, सहानुभूति, निष्पक्षता",
          "सिविल सेवा में नैतिकता — केस स्टडी आधारित",
          "शासन — ई-गवर्नेंस, लोकपाल, RTI",
          "अंतर्राष्ट्रीय नैतिकता और भ्रष्टाचार",
        ],
      },
    ],
    features: [
      { icon: "Clock", label: "अवधि", value: "18 महीने" },
      { icon: "Video", label: "लेक्चर्स", value: "600+" },
      { icon: "FileText", label: "टेस्ट सीरीज़", value: "50+ मॉक" },
      { icon: "Users", label: "छात्र", value: "3,500+" },
      { icon: "Download", label: "नोट्स", value: "PDF उपलब्ध" },
      { icon: "Star", label: "रेटिंग", value: "4.9/5" },
    ],
    testimonials: [
      {
        name: "अंकित कुमार",
        exam: "UPSC CSE 2024 — AIR 127",
        text: "आकार IAS के फाउंडेशन कोर्स ने मेरी तैयारी को पूरी तरह बदल दिया। डॉ. शर्मा सर की Ethics की क्लासेस बेहतरीन हैं।",
      },
      {
        name: "प्रिया जैन",
        exam: "UPSC CSE 2024 — AIR 345",
        text: "मैंने ऑनलाइन माध्यम से पूरी तैयारी की। डेली CA और मॉक टेस्ट सबसे ज़्यादा helpful रहे।",
      },
      {
        name: "राहुल वर्मा",
        exam: "MPPSC 2024 — Rank 18",
        text: "छोटे शहर से होने के बावजूद, इस कोर्स ने मुझे Top-quality guidance दी। बहुत आभारी हूँ।",
      },
    ],
  },
  {
    id: "mppsc-target",
    slug: "mppsc-prelims-target-batch",
    title: "MPPSC Prelims 2024: Target Batch (लक्ष्य बैच)",
    category: "mppsc",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqoqqTMKjzHPda2w1Up3p9dqyRRwNXgpao_jDYnIaPOeN2eLBJwuiMzKd8cBOv3YUdHFZVA9uWT0i_m04-Fi67j4HrZqROmthlsHI481o_Kv08Oz2Q-WqZJcxLxYu46KH2lxK84CZBddv7AjeXvlmS-0Pw4UjnxirW3udkCXYjYeFOwHfq2koXo0cmVIWi5NNX0ytCEIG4sMmiiuzE1RQQi0VF1CEL1azLNgz3-ENbUJAi6aGttaHTWWoIFS_j3IDk8127ummSxWM",
    alt: "MPPSC Prelims Target Batch Banner",
    badge: "Popular",
    isLive: false,
    mentorName: "Abhishek Singh",
    mentorTitle: "Geography Specialist",
    mentorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMm43JkhzD3LpABHyegIEtE8cY7u5f-axTxaEVeOAe60J6wEMZRfhY23vBenlkasjiMENLMScGoZJzTsSj2fqDtSPUxrPZskSAM_39lPIjtJ7nlOi7SCLHbC7WXQfImSoeZiBHoMmxbH_coro_sg-w504L4_tvZCyORrZ-t8YdeXLp91_o2qsqrjgTN406pR4RY2ndK7DE0WqN4dkeDAz5YSqw3jNmi1J289Sb0NZ3B0KyagUrexQUBabacxzzEsC3kzNacdYsX-A",
    mentorBio:
      "अभिषेक सिंह MPPSC और भूगोल विषय के विशेषज्ञ शिक्षक हैं। 10+ वर्षों से MP PSC की तैयारी करवा रहे हैं और कई छात्रों को सफलता दिला चुके हैं।",
    price: "₹12,499",
    originalPrice: "₹24,999",
    duration: "12 Months",
    lecturesCount: "450+ Lectures",
    studentsCount: "1.2k Students",
    rating: "4.8",
    description:
      "MPPSC प्रारंभिक परीक्षा (Prelims) के लिए विशेष रूप से तैयार किया गया लक्ष्य बैच। मध्यप्रदेश के GK, भूगोल, इतिहास और राजव्यवस्था पर विशेष फोकस।",
    whatYouLearn: [
      "MPPSC Prelims GS Paper I & II संपूर्ण कवरेज",
      "मध्यप्रदेश सामान्य ज्ञान (MP GK) विशेष",
      "MP का भूगोल, इतिहास, अर्थव्यवस्था",
      "CSAT (Paper II) स्ट्रैटेजी और प्रैक्टिस",
      "Previous Year Papers (PYQ) का विश्लेषण",
      "साप्ताहिक मॉक टेस्ट",
    ],
    highlights: [
      "MP GK पर विशेष जोर",
      "रिकॉर्डेड लेक्चर — कभी भी देखें",
      "सेक्शन-वाइज़ टेस्ट सीरीज़",
      "PYQ-आधारित रिवीजन सत्र",
    ],
    syllabus: [
      {
        title: "Module 1: मध्यप्रदेश सामान्य ज्ञान",
        topics: [
          "MP का भौतिक एवं राजनीतिक भूगोल",
          "MP का इतिहास — प्राचीन से आधुनिक तक",
          "MP की जनजातियाँ, लोक कलाएँ, त्योहार",
          "MP की प्रमुख योजनाएँ एवं पुरस्कार",
        ],
      },
      {
        title: "Module 2: भारतीय राजव्यवस्था एवं शासन",
        topics: [
          "भारतीय संविधान — प्रस्तावना, मौलिक अधिकार",
          "संसद, न्यायपालिका, केंद्र-राज्य संबंध",
          "स्थानीय शासन — पंचायती राज, नगरपालिका",
          "MP शासन — राज्यपाल, विधानसभा, जिला प्रशासन",
        ],
      },
      {
        title: "Module 3: अर्थव्यवस्था एवं विज्ञान",
        topics: [
          "भारतीय अर्थव्यवस्था — GDP, बजट, बैंकिंग",
          "MP की अर्थव्यवस्था — कृषि, उद्योग, खनिज",
          "सामान्य विज्ञान — भौतिकी, रसायन, जीवविज्ञान",
          "पर्यावरण एवं पारिस्थितिकी",
        ],
      },
    ],
    features: [
      { icon: "Clock", label: "अवधि", value: "12 महीने" },
      { icon: "Video", label: "लेक्चर्स", value: "450+" },
      { icon: "FileText", label: "टेस्ट सीरीज़", value: "30+ मॉक" },
      { icon: "Users", label: "छात्र", value: "1,200+" },
      { icon: "Download", label: "नोट्स", value: "PDF उपलब्ध" },
      { icon: "Star", label: "रेटिंग", value: "4.8/5" },
    ],
    testimonials: [
      {
        name: "सुमित पटेल",
        exam: "MPPSC 2024 — Rank 42",
        text: "MP GK की तैयारी इस बैच से बहुत अच्छी हुई। PYQ analysis सबसे useful रहा।",
      },
      {
        name: "नेहा शर्मा",
        exam: "MPPSC 2023 — Rank 78",
        text: "टार्गेट बैच ने मेरी Prelims रणनीति को पूरी तरह बदल दिया।",
      },
    ],
  },
  {
    id: "mpsi-special",
    slug: "mpsi-hindi-gs-batch",
    title: "MPSI: Special Hindi & GS Batch (एमपी पुलिस सब इंस्पेक्टर)",
    category: "mpsi",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNr_z6AuIKB3CoSQROu3-Azucl00i6y9RbS6PIqXn_a5BcQomv-v0hWdnZdYlSHygXPjiQwrWxuCFB431T0J2mqCVRzjc99aH5x1DXy6AbJFqY418KvarUBp22eJpffEvSwgPxwdaIgz-eJDKGJbh9zqcUEbnJ-t54XgFzpsz8CQWFPp_VA8XBcQ_kvEVk9AyegleShvcwj_18LPZc0waeFsxifNs1oT9J5CWQ-e-xsiG7Czsodrpb8J8xhrkHvd95oIDuVvhoC3A",
    alt: "MPSI Special Course Graphic",
    badge: "Hindi Medium",
    isLive: false,
    mentorName: "Sanjeev Patel",
    mentorTitle: "Polity & Governance Expert",
    mentorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBY0ecFm-5I8DSDL58UhRfqDCpBHtdmgLJ2rJ-vSZaLAqZLUWyPUdpjH_1-QIB_QkpoBgMhvdQvLPUGM4zsEjCYigMmwlsgjqjESJ0PRYXwmkX9wAxapQicKA4BU1KhLDUVk0EjmgGV4kSxv8n8aiu2z9CYvcY3SXBE0gBeR49wDbcU19KDTyGSqby-bhHRbKAbc5HMiX6f17daJNSuRM80MsgYBIRthWXH5wGCF9Nnq6zGk70h45odlILwdYTG1ekjp8H9bnk168k",
    mentorBio:
      "संजीव पटेल MP पुलिस भर्ती (SI/ASI) और Polity विषय के विशेषज्ञ हैं। हिंदी माध्यम से पढ़ाने में माहिर।",
    price: "₹4,999",
    originalPrice: "₹9,999",
    duration: "6 Months",
    lecturesCount: "250+ Lectures",
    studentsCount: "850 Students",
    rating: "4.9",
    description:
      "मध्यप्रदेश पुलिस सब इंस्पेक्टर (MPSI) परीक्षा की तैयारी के लिए विशेष बैच। हिंदी व्याकरण, सामान्य ज्ञान और गणित पर गहन फोकस।",
    whatYouLearn: [
      "हिंदी व्याकरण — संधि, समास, अलंकार, छंद",
      "सामान्य ज्ञान — भारत एवं MP",
      "गणित — अंकगणित, बीजगणित, ज्यामिति",
      "तर्कशक्ति (Reasoning) और मानसिक योग्यता",
      "विज्ञान — भौतिकी, रसायन, जीवविज्ञान",
      "कंप्यूटर ज्ञान बेसिक्स",
    ],
    highlights: [
      "100% हिंदी माध्यम में कक्षाएँ",
      "PYQ-आधारित अध्ययन सामग्री",
      "साप्ताहिक मॉक टेस्ट",
      "शारीरिक परीक्षा (Physical Test) गाइडेंस",
    ],
    syllabus: [
      {
        title: "Module 1: हिंदी भाषा एवं व्याकरण",
        topics: [
          "वर्ण विचार, शब्द विचार, वाक्य विचार",
          "संधि, समास, उपसर्ग, प्रत्यय",
          "अलंकार, छंद, रस",
          "मुहावरे, लोकोक्तियाँ, अशुद्धि शोधन",
        ],
      },
      {
        title: "Module 2: सामान्य ज्ञान एवं विज्ञान",
        topics: [
          "भारत एवं MP का भूगोल, इतिहास",
          "भारतीय राजव्यवस्था — संविधान, न्यायपालिका",
          "सामान्य विज्ञान — भौतिकी, रसायन, जीव विज्ञान",
          "करेंट अफेयर्स और स्टैटिक GK",
        ],
      },
      {
        title: "Module 3: गणित एवं तर्कशक्ति",
        topics: [
          "अंकगणित — प्रतिशत, लाभ-हानि, अनुपात",
          "बीजगणित — समीकरण, असमिकाएँ",
          "तर्कशक्ति — Series, Analogy, Coding",
          "Data Interpretation, Table, Graph",
        ],
      },
    ],
    features: [
      { icon: "Clock", label: "अवधि", value: "6 महीने" },
      { icon: "Video", label: "लेक्चर्स", value: "250+" },
      { icon: "FileText", label: "टेस्ट सीरीज़", value: "20+ मॉक" },
      { icon: "Users", label: "छात्र", value: "850+" },
      { icon: "Download", label: "नोट्स", value: "PDF उपलब्ध" },
      { icon: "Star", label: "रेटिंग", value: "4.9/5" },
    ],
    testimonials: [
      {
        name: "आकाश यादव",
        exam: "MPSI 2024 — चयनित",
        text: "हिंदी माध्यम में इतनी बेहतरीन कक्षाएं पहले कभी नहीं मिलीं। संजीव सर के नोट्स बहुत काम आए।",
      },
    ],
  },
  {
    id: "upsc-ca-365",
    slug: "upsc-365-current-affairs",
    title: "UPSC 365: व्यापक समसामयिकी (Current Affairs) विश्लेषण",
    category: "upsc",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAr-O-6DdD29rwSqLNnFxs-L5ZTsBxSwErdUEd3_d7n_zQK17nUv1UB-Wx12Wm2we2JHsyqZZ3uac4mhAPz4WHP2CK6ykkrjt8o-v-omjGpFiBkInt3zgJklEiqwXuGFS-1R09GB4ds0-RXnea8sCZLluV3Fq59TStoNA__rJT_u91lHpyHVEcNY7549yMnJ77QF4VRZqMRplbg78cHi4NR0ZdlLOlYMrBNux1k7CoAuPcgK_DOLmLgjJOFZBjkTNsR5K6WyvEKTU4",
    alt: "UPSC Current Affairs Workspace",
    badge: "Bestseller",
    isLive: true,
    mentorName: "Priyanka Verma",
    mentorTitle: "History & Culture Specialist",
    mentorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9mO9BmxgQukKvcfapkNp9YaGiKII8OUDDPz_CI8F7B9CReiJKlKVUJYkAmEgUTqz0OKxtqfZ3-p7UUTK8vmSyayuiYLXCBZDoqGoJRG7CvdtdX1GEK18qx3sodOuRMlffFJM86LEaxuGgalfw7OZg_5spJhA8nU2S14DOzL8pbGI4klenP22sulv2lG0r0XEayxpLqZuWDTYckc-6YkT9OLTjLXhsH8_U5tIaLBrPfLB2mwzVrhXCzAxkqETe4Fc2QK83OVrIwQk",
    mentorBio:
      "प्रियंका वर्मा इतिहास और भारतीय कला एवं संस्कृति की विशेषज्ञ शिक्षिका हैं। करेंट अफेयर्स को GS से जोड़कर पढ़ाने में माहिर।",
    price: "₹4,499",
    originalPrice: "₹7,999",
    duration: "12 Months",
    lecturesCount: "Daily Analytics + PDF",
    studentsCount: "15k+ Students",
    rating: "4.9",
    description:
      "प्रतिदिन समसामयिकी (Current Affairs) का विस्तृत विश्लेषण UPSC दृष्टिकोण से। दैनिक PDF, साप्ताहिक टेस्ट और मासिक रिवीजन।",
    whatYouLearn: [
      "दैनिक करेंट अफेयर्स — UPSC Prelims + Mains दृष्टिकोण",
      "The Hindu, Indian Express, PIB का विश्लेषण",
      "GS Papers से करेंट अफेयर्स का सम्बन्ध (Interlinking)",
      "मासिक करेंट अफेयर्स PDF मैगज़ीन",
      "साप्ताहिक MCQ टेस्ट सीरीज़",
      "Mains-oriented Answer Writing से CA का जोड़",
    ],
    highlights: [
      "365 दिन — एक भी दिन मिस नहीं",
      "LIVE दैनिक क्लास + रिकॉर्डिंग",
      "हर महीने Magazine PDF",
      "15,000+ छात्रों का भरोसा",
    ],
    syllabus: [
      {
        title: "Daily Routine: दैनिक कार्यक्रम",
        topics: [
          "सुबह 8 AM — Daily News Analysis (DNA) लाइव क्लास",
          "दोपहर — PDF नोट्स अपलोड",
          "शाम — MCQ Practice Quiz",
          "सप्ताह के अंत में — Weekly Revision Test",
        ],
      },
      {
        title: "Monthly Compilation: मासिक संकलन",
        topics: [
          "करेंट अफेयर्स मैगज़ीन PDF",
          "GS Mains-linked करेंट अफेयर्स",
          "Monthly Mock Test (100 MCQs)",
          "Special Focus Topics — बजट, सर्वे, समिति रिपोर्ट",
        ],
      },
    ],
    features: [
      { icon: "Clock", label: "अवधि", value: "12 महीने" },
      { icon: "Video", label: "क्लासेस", value: "Daily LIVE" },
      { icon: "FileText", label: "PDF", value: "Daily + Monthly" },
      { icon: "Users", label: "छात्र", value: "15,000+" },
      { icon: "Download", label: "नोट्स", value: "PDF उपलब्ध" },
      { icon: "Star", label: "रेटिंग", value: "4.9/5" },
    ],
    testimonials: [
      {
        name: "दीपिका राठौर",
        exam: "UPSC CSE 2024 — Prelims Cleared",
        text: "CA 365 के बिना Prelims clear करना मुश्किल था। Daily DNA class ने बहुत मदद की।",
      },
      {
        name: "विशाल गुप्ता",
        exam: "MPPSC 2024 — Rank 55",
        text: "करेंट अफेयर्स की तैयारी यहाँ से बेहतर कहीं नहीं हो सकती।",
      },
    ],
  },
  {
    id: "mppsc-mains-2027-live",
    slug: "mppsc-mains-2027-online-live-batch",
    title: "MPPSC Mains 2027 ऑनलाइन लाइव बैच",
    category: "mppsc",
    image: "/images/mppsc-mains-2027.png",
    alt: "MPPSC Mains 2027 Online Live Batch",
    badge: "Admission Open",
    isLive: true,
    enrollUrl: "https://online.aakarias.com/courses/194",
    mentorName: "Experienced Faculty",
    mentorTitle: "Subject Experts",
    mentorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBasIuRf-FwvPuw6Vm_y3KRPEe2I2HesK9DQkGEol0RogyZhS7shvO9HURrx27Qd2KyhVQUNfVvPXiD8zzrgGcsyF3a3Ci9hkjKtAOmMQe3OWHW_NSIQbP1SO_qwMQZLKvtFSbvtKR50Iax_dXvdUsVACU72cAef4B8yyl9clooJtKI1psGhvApkV7OjoIbAAv12o5CWqRaJuGZawoLSWw65kzcHiCMsR_cVPYa1rKknRcQqSAcZSYMYVUgi-U08qfLZ1R4RLSr0-s",
    price: "₹24,999",
    originalPrice: "₹35,000",
    duration: "15 Months",
    lecturesCount: "6-8 Classes Per Week",
    studentsCount: "New Batch",
    rating: "4.9",
    description: "Aakar IAS का MPPSC Mains 2027 Live Studio Batch मुख्य परीक्षा की सम्पूर्ण एवं व्यवस्थित तैयारी के लिए तैयार किया गया है। इस कोर्स में अनुभवी फैकल्टी द्वारा Point-to-Point Concept Based Teaching, Live Interactive Classes, Recorded Backup Lectures, Answer Writing Practice, PDF Notes एवं Current Affairs Integration के साथ सम्पूर्ण सिलेबस पढ़ाया जाएगा।",
    whatYouLearn: [
      "सम्पूर्ण MPPSC Mains सिलेबस कवरेज",
      "Live + Recorded Classes",
      "15 माह की वैधता",
      "12 माह में सिलेबस पूर्ण",
      "प्रति सप्ताह 6–8 कक्षाएँ",
      "PDF Study Notes",
      "Answer Writing Guidance",
      "Doubt Solving Sessions",
      "अनुभवी फैकल्टी का मार्गदर्शन",
      "Exam-Oriented Preparation"
    ],
    highlights: [
      "बैच प्रारंभ: 15 मई 2026",
      "Mode: Live (Studio) + Recorded",
      "विशेष शुल्क: ₹24,999 (₹35,000 से घटाकर)",
      "Helpline: +91 97133 00123"
    ],
    features: [
      { icon: "Clock", label: "अवधि", value: "15 महीने" },
      { icon: "Video", label: "लेक्चर्स", value: "लाइव + रिकॉर्डेड" },
      { icon: "Download", label: "नोट्स", value: "PDF उपलब्ध" },
      { icon: "MessageSquare", label: "सत्र", value: "डाउट सॉल्विंग" }
    ],
    syllabus: [
      {
        title: "सामान्य अध्ययन पेपर I (General Studies Paper I)",
        topics: ["इतिहास (History) — प्राचीन, मध्यकालीन, आधुनिक भारत एवं मध्य प्रदेश का इतिहास", "भूगोल (Geography) — भारत, विश्व एवं मध्य प्रदेश का भूगोल"]
      },
      {
        title: "सामान्य अध्ययन पेपर II (General Studies Paper II)",
        topics: ["राजव्यवस्था एवं संविधान (Polity & Constitution)", "सामाजिक मुद्दे एवं शासन (Social Issues & Governance)"]
      },
      {
        title: "सामान्य अध्ययन पेपर III (General Studies Paper III)",
        topics: ["विज्ञान एवं प्रौद्योगिकी (Science & Technology)", "भारतीय अर्थव्यवस्था (Indian Economy)"]
      },
      {
        title: "पेपर IV, V एवं VI (Paper IV, V & VI)",
        topics: ["नैतिकता एवं विचार (Ethics & Thinkers)", "सामान्य हिंदी एवं व्याकरण (General Hindi & Grammar)", "निबंध लेखन (Essay Writing)"]
      }
    ]
  },
  {
    id: "XGarqHjldI8mR16XsUYQK7",
    slug: "mppsc-pre-mains-hybrid-batch",
    title: "MPPSC Pre + Mains ऑनलाइन (हाइब्रिड) बैच (हिंदी माध्यम)",
    titleHi: "MPPSC Pre + Mains ऑनलाइन (हाइब्रिड) बैच (हिंदी माध्यम)",
    titleEn: "MPPSC Pre + Mains Online (Hybrid) Batch (Hindi Medium)",
    category: "mppsc",
    image: "/images/mppsc-pre-mains-hybrid.png",
    alt: "MPPSC Pre + Mains ऑनलाइन (हाइब्रिड) बैच (हिंदी माध्यम)",
    altEn: "MPPSC Pre + Mains Online (Hybrid) Batch (Hindi Medium)",
    badge: "5 Days Demo",
    badgeEn: "5 Days Demo",
    isLive: true,
    enrollUrl: "https://online.aakarias.com/courses/195",
    mentorName: "अनुभवी फैकल्टी",
    mentorNameEn: "Experienced Faculty",
    mentorTitle: "विषय विशेषज्ञ",
    mentorTitleEn: "Subject Experts",
    mentorImage: "/images/placeholder.jpg",
    price: "₹50,000",
    originalPrice: "₹80,000",
    duration: "24 महीने",
    durationEn: "24 Months",
    lecturesCount: "प्रतिदिन 5 घंटे",
    lecturesCountEn: "Daily 5 Hours",
    studentsCount: "नया बैच",
    studentsCountEn: "New Batch",
    rating: "4.9",
    description: "आकार आईएएस का MPPSC Pre + Mains Online Hybrid Batch प्रारंभिक एवं मुख्य परीक्षा की सम्पूर्ण एवं व्यवस्थित तैयारी के लिए तैयार किया गया है। कोर्स की समयावधि लगभग 24 माह होगी। हार्ड कॉपी नोट्स न्यूनतम शुल्क पर संस्था से खरीदे जा सकते हैं, जो कूरियर द्वारा आपके पते पर भेजे जाएंगे।",
    descriptionEn: "Aakar IAS MPPSC Pre + Mains Online Hybrid Batch is designed for complete and systematic preparation of both Prelims and Mains. The course duration is approx 24 months. Hard copy notes can be purchased from the institute at a minimal fee and will be sent to your address via courier.",
    whatYouLearn: [
      "अनुभवी शिक्षकों द्वारा प्रतिदिन 5 घंटों का अध्यापन",
      "प्रारंभिक व मुख्य परीक्षा हेतु अद्यतन प्रिंटेड नोट्स",
      "नेगेटिव मार्किंग के अनुरूप अध्ययन सामग्री",
      "उत्तर लेखन हेतु नियमित मार्गदर्शन",
      "साप्ताहिक एवं मासिक टेस्ट श्रृंखला",
      "ऑनलाइन बैकअप की सुविधा",
      "आधुनिक डिजिटल क्लासरूम"
    ],
    whatYouLearnEn: [
      "Daily 5 hours of teaching by experienced faculty",
      "Updated printed notes for Prelims and Mains",
      "Study material aligned with negative marking",
      "Regular guidance for Answer Writing",
      "Weekly & Monthly Test Series",
      "Online class backup facility",
      "Modern digital classroom experience"
    ],
    highlights: [
      "समयावधि: लगभग 24 माह",
      "बैच प्रारंभ: 27 जनवरी (02:30 PM)",
      "नोट्स: कूरियर द्वारा उपलब्ध (न्यूनतम शुल्क पर)",
      "विशेषता: 5 Days Demo",
      "Helpline: +91 97133 00123"
    ],
    highlightsEn: [
      "Duration: Approx 24 Months",
      "Batch Starts: 27 January (02:30 PM)",
      "Notes: Available via courier at minimal fee",
      "Feature: 5 Days Demo",
      "Helpline: +91 97133 00123"
    ],
    features: [
      { icon: "Clock", label: "अध्यापन", value: "प्रतिदिन 5 घंटे" } as any,
      { icon: "BookOpen", label: "नोट्स", value: "प्रिंटेड (कूरियर उपलब्ध)" } as any,
      { icon: "Video", label: "बैकअप", value: "ऑनलाइन बैकअप सुविधा" } as any,
      { icon: "MessageSquare", label: "मार्गदर्शन", value: "उत्तर लेखन मार्गदर्शन" } as any
    ],
    featuresEn: [
      { icon: "Clock", label: "Daily Class", value: "5 Hours Daily" } as any,
      { icon: "BookOpen", label: "Notes", value: "Printed (Courier available)" } as any,
      { icon: "Video", label: "Backup", value: "Online Backup Facility" } as any,
      { icon: "MessageSquare", label: "Guidance", value: "Answer Writing Guidance" } as any
    ],
    syllabus: [
      {
        title: "प्रारंभिक परीक्षा पाठ्यक्रम (Prelims Syllabus)",
        titleEn: "Prelims Syllabus",
        topics: ["सामान्य अध्ययन (General Studies) Paper 1", "सामान्य अभिरुचि परीक्षण (CSAT) Paper 2"],
        topicsEn: ["General Studies (Paper 1)", "General Aptitude Test (CSAT) (Paper 2)"]
      },
      {
        title: "मुख्य परीक्षा पाठ्यक्रम (Mains Syllabus)",
        titleEn: "Mains Syllabus",
        topics: ["सामान्य अध्ययन प्रश्न पत्र I, II, III", "सामान्य अध्ययन प्रश्न पत्र IV, V, VI"],
        topicsEn: ["General Studies Papers I, II, III", "Papers IV, V, VI (Ethics, Hindi, Essay)"]
      }
    ] as any
  } as any,
  {
    id: "eNCHM9gIufizNXYH9pG8IR",
    slug: "mppsc-pre-mains-recorded-batch-english",
    title: "MPPSC Prelims + Mains English Medium (Online Recorded Batch)",
    titleHi: "MPPSC Pre + Mains अंग्रेजी माध्यम (ऑनलाइन रिकॉर्डेड बैच)",
    titleEn: "MPPSC Prelims + Mains English Medium (Online Recorded Batch)",
    category: "mppsc",
    image: "/images/mppsc-pre-mains-recorded-en.png",
    alt: "MPPSC Prelims + Mains English Medium (Online Recorded Batch)",
    altEn: "MPPSC Prelims + Mains English Medium (Online Recorded Batch)",
    badge: "Admission Open",
    badgeEn: "Admission Open",
    isLive: false,
    enrollUrl: "https://online.aakarias.com/courses/196",
    mentorName: "अनुभवी फैकल्टी",
    mentorNameEn: "Experienced Faculty",
    mentorTitle: "विषय विशेषज्ञ",
    mentorTitleEn: "Subject Experts",
    mentorImage: "/images/placeholder.jpg",
    price: "₹30,000",
    originalPrice: "₹59,000",
    duration: "18 महीने की वैधता",
    durationEn: "18 Months Validity",
    lecturesCount: "सम्पूर्ण रिकॉर्डेड लेक्चर्स",
    lecturesCountEn: "Complete Recorded Lectures",
    studentsCount: "नया रिकॉर्डेड बैच",
    studentsCountEn: "New Recorded Batch",
    rating: "4.9",
    description: "आकार आईएएस का MPPSC Pre + Mains English Medium Online Recorded Batch उन छात्रों के लिए है जो अपनी सुविधा के अनुसार व्यवस्थित तैयारी करना चाहते हैं। इस कोर्स में हार्ड कॉपी प्रिंटेड नोट्स शामिल हैं जो सीधे आपके पते पर भेजे जाएंगे। कोर्स की वैधता 18 महीने होगी।",
    descriptionEn: "Aakar IAS's MPPSC Pre + Mains English Medium Online Recorded Batch is designed for students who want to prepare systematically at their own convenience. This course includes hardcopy printed notes delivered directly to your address. The course validity is 18 months.",
    whatYouLearn: [
      "प्रारंभिक एवं मुख्य परीक्षा का संपूर्ण इंग्लिश मीडियम सिलेबस कवरेज",
      "उच्च गुणवत्ता वाले रिकॉर्डेड लेक्चर्स",
      "हार्ड कॉपी प्रिंटेड नोट्स आपके पते पर (घर बैठे)",
      "18 महीने की सम्पूर्ण वैधता",
      "साप्ताहिक टेस्ट श्रृंखला द्वारा स्व-मूल्यांकन",
      "विशेष डाउट सॉल्विंग सेशन्स"
    ],
    whatYouLearnEn: [
      "Complete English Medium syllabus coverage for Prelims & Mains",
      "High-quality Online Recorded Lectures",
      "Hardcopy printed notes delivered to your home address",
      "Complete Course Validity of 18 Months",
      "Self-assessment through weekly test series",
      "Dedicated Doubt Clearing Sessions"
    ],
    highlights: [
      "कोर्स की वैधता: 18 महीने",
      "बैच का प्रकार: ऑनलाइन रिकॉर्डेड (Online Recorded)",
      "विशेष: हार्ड कॉपी प्रिंटेड नोट्स शामिल (कूरियर द्वारा)",
      "बैच प्रारंभ: 4 मई 2026",
      "Helpline: +91 97133 00123"
    ],
    highlightsEn: [
      "Course Validity: 18 Months",
      "Batch Type: Online Recorded Batch",
      "Special: Hardcopy Printed Notes Included (delivered)",
      "Batch Starts: 4 May 2026",
      "Helpline: +91 97133 00123"
    ],
    features: [
      { icon: "Clock", label: "वैधता", value: "18 महीने" } as any,
      { icon: "BookOpen", label: "नोट्स", value: "हार्डकॉपी प्रिंटेड नोट्स शामिल" } as any,
      { icon: "Video", label: "क्लासेस", value: "सम्पूर्ण रिकॉर्डेड लेक्चर्स" } as any,
      { icon: "MessageSquare", label: "सत्र", value: "डाउट सॉल्विंग" } as any
    ],
    featuresEn: [
      { icon: "Clock", label: "Validity", value: "18 Months" } as any,
      { icon: "BookOpen", label: "Notes", value: "Hardcopy Printed Notes Included" } as any,
      { icon: "Video", label: "Classes", value: "Complete Recorded Lectures" } as any,
      { icon: "MessageSquare", label: "Sessions", value: "Doubt Solving" } as any
    ],
    syllabus: [
      {
        title: "प्रारंभिक परीक्षा पाठ्यक्रम (Prelims Syllabus)",
        titleEn: "Prelims Syllabus",
        topics: ["Paper 1: General Studies (GS)", "Paper 2: General Aptitude (CSAT)"],
        topicsEn: ["Paper 1: General Studies (GS)", "Paper 2: General Aptitude (CSAT)"]
      },
      {
        title: "मुख्य परीक्षा पाठ्यक्रम (Mains Syllabus)",
        titleEn: "Mains Syllabus",
        topics: ["Papers I to VI Complete Syllabus Coverage"],
        topicsEn: ["Papers I to VI Complete Syllabus Coverage"]
      }
    ] as any
  } as any,
  {
    id: "ItFnZ66xsPbdbQxW4mWpy1",
    slug: "mppsc-pre-mains-hybrid-june-batch",
    title: "MPPSC Pre + Mains ऑनलाइन (हाइब्रिड) जून बैच (हिंदी माध्यम)",
    titleHi: "MPPSC Pre + Mains ऑनलाइन (हाइब्रिड) जून बैच (हिंदी माध्यम)",
    titleEn: "MPPSC Pre + Mains Online (Hybrid) June Batch (Hindi Medium)",
    category: "mppsc",
    image: "/images/mppsc-pre-mains-hybrid-june.png",
    alt: "MPPSC Pre + Mains ऑनलाइन (हाइब्रिड) जून बैच (हिंदी माध्यम)",
    altEn: "MPPSC Pre + Mains Online (Hybrid) June Batch (Hindi Medium)",
    badge: "05 Free Demo",
    badgeEn: "05 Free Demo",
    isLive: true,
    enrollUrl: "https://online.aakarias.com/courses/197",
    mentorName: "अनुभवी फैकल्टी",
    mentorNameEn: "Experienced Faculty",
    mentorTitle: "विषय विशेषज्ञ",
    mentorTitleEn: "Subject Experts",
    mentorImage: "/images/placeholder.jpg",
    price: "₹50,000",
    originalPrice: "₹80,000",
    duration: "24 महीने",
    durationEn: "24 Months",
    lecturesCount: "प्रतिदिन 5 घंटे",
    lecturesCountEn: "Daily 5 Hours",
    studentsCount: "जून बैच",
    studentsCountEn: "June Batch",
    rating: "4.9",
    description: "आकार आईएएस का MPPSC Pre + Mains Online Hybrid June Batch (Recorded from Classroom) प्रारंभिक एवं मुख्य परीक्षा की सम्पूर्ण एवं व्यवस्थित तैयारी के लिए तैयार किया गया है। कोर्स की समयावधि लगभग 24 माह होगी। हार्ड कॉपी नोट्स न्यूनतम शुल्क पर संस्था से खरीदे जा सकते हैं, जो कूरियर द्वारा आपके पते पर भेजे जाएंगे।",
    descriptionEn: "Aakar IAS MPPSC Pre + Mains Online Hybrid June Batch (Recorded from Classroom) is designed for complete and systematic preparation of both Prelims and Mains. The course duration is approx 24 months. Hard copy notes can be purchased from the institute at a minimal fee and will be sent to your address via courier.",
    whatYouLearn: [
      "अनुभवी शिक्षकों द्वारा प्रतिदिन 5 घंटों का अध्यापन",
      "प्रारंभिक व मुख्य परीक्षा हेतु अद्यतन प्रिंटेड नोट्स",
      "नेगेटिव मार्किंग के अनुरूप अध्ययन सामग्री",
      "उत्तर लेखन हेतु नियमित मार्गदर्शन",
      "साप्ताहिक एवं मासिक टेस्ट श्रृंखला",
      "ऑनलाइन बैकअप की सुविधा",
      "आधुनिक डिजिटल क्लासरूम"
    ],
    whatYouLearnEn: [
      "Daily 5 hours of teaching by experienced faculty",
      "Updated printed notes for Prelims and Mains",
      "Study material aligned with negative marking",
      "Regular guidance for Answer Writing",
      "Weekly & Monthly Test Series",
      "Online class backup facility",
      "Modern digital classroom experience"
    ],
    highlights: [
      "समयावधि: लगभग 24 माह",
      "बैच प्रारंभ: 22 जून 2026 (08:00 AM)",
      "नोट्स: कूरियर द्वारा उपलब्ध (न्यूनतम शुल्क पर)",
      "विशेषता: 05 Free Demo Available",
      "Helpline: +91 97133 00123"
    ],
    highlightsEn: [
      "Duration: Approx 24 Months",
      "Batch Starts: 22 June 2026 (08:00 AM)",
      "Notes: Available via courier at minimal fee",
      "Feature: 05 Free Demo Available",
      "Helpline: +91 97133 00123"
    ],
    features: [
      { icon: "Clock", label: "अध्यापन", value: "प्रतिदिन 5 घंटे" } as any,
      { icon: "BookOpen", label: "नोट्स", value: "प्रिंटेड (कूरियर उपलब्ध)" } as any,
      { icon: "Video", label: "बैकअप", value: "ऑनलाइन बैकअप सुविधा" } as any,
      { icon: "MessageSquare", label: "मार्गदर्शन", value: "उत्तर लेखन मार्गदर्शन" } as any
    ],
    featuresEn: [
      { icon: "Clock", label: "Daily Class", value: "5 Hours Daily" } as any,
      { icon: "BookOpen", label: "Notes", value: "Printed (Courier available)" } as any,
      { icon: "Video", label: "Backup", value: "Online Backup Facility" } as any,
      { icon: "MessageSquare", label: "Guidance", value: "Answer Writing Guidance" } as any
    ],
    syllabus: [
      {
        title: "प्रारंभिक परीक्षा पाठ्यक्रम (Prelims Syllabus)",
        titleEn: "Prelims Syllabus",
        topics: ["सामान्य अध्ययन (General Studies) Paper 1", "सामान्य अभिरुचि परीक्षण (CSAT) Paper 2"],
        topicsEn: ["General Studies (Paper 1)", "General Aptitude Test (CSAT) (Paper 2)"]
      },
      {
        title: "मुख्य परीक्षा पाठ्यक्रम (Mains Syllabus)",
        titleEn: "Mains Syllabus",
        topics: ["सामान्य अध्ययन प्रश्न पत्र I, II, III", "सामान्य अध्ययन प्रश्न पत्र IV, V, VI"],
        topicsEn: ["General Studies Papers I, II, III", "Papers IV, V, VI (Ethics, Hindi, Essay)"]
      }
    ] as any
  } as any,
  {
    id: "eNCHM9gIufizNXYH9pS2xZ",
    slug: "mppsc-prelims-paper2-csat-recorded-batch",
    title: "MPPSC Prelims Paper-2 C-SAT ऑनलाइन रिकॉर्डेड कोर्स",
    titleHi: "MPPSC Prelims Paper-2 C-SAT ऑनलाइन रिकॉर्डेड कोर्स",
    titleEn: "MPPSC Prelims Paper-2 C-SAT Online Recorded Course",
    category: "mppsc",
    image: "/images/mppsc-csat-recorded.png",
    alt: "MPPSC Prelims Paper-2 C-SAT ऑनलाइन रिकॉर्डेड कोर्स",
    altEn: "MPPSC Prelims Paper-2 C-SAT Online Recorded Course",
    badge: "C-SAT Special",
    badgeEn: "C-SAT Special",
    isLive: false,
    enrollUrl: "https://online.aakarias.com/courses/198",
    mentorName: "अनुभवी फैकल्टी",
    mentorNameEn: "Experienced Faculty",
    mentorTitle: "विषय विशेषज्ञ",
    mentorTitleEn: "Subject Experts",
    mentorImage: "/images/placeholder.jpg",
    price: "₹99",
    originalPrice: "₹499",
    duration: "8 महीने की वैधता",
    durationEn: "8 Months Validity",
    lecturesCount: "सम्पूर्ण रिकॉर्डेड लेक्चर्स",
    lecturesCountEn: "Complete Recorded Lectures",
    studentsCount: "रिकॉर्डेड बैच",
    studentsCountEn: "Recorded Batch",
    rating: "4.9",
    description: "आकार आईएएस का MPPSC Prelims Paper-2 C-SAT Online Recorded Batch प्रारंभिक परीक्षा के द्वितीय प्रश्न पत्र की सम्पूर्ण एवं व्यवस्थित तैयारी के लिए तैयार किया गया है। यह कोर्स नेगेटिव मार्किंग के नवीनतम प्रारूप के अनुकूल डिज़ाइन किया गया है। कोर्स की वैधता 8 महीने होगी।",
    descriptionEn: "Aakar IAS's MPPSC Prelims Paper-2 C-SAT Online Recorded Course is designed for complete and systematic preparation of the second paper of the Prelims exam. This course is fully aligned with the latest negative marking pattern. The course validity is 8 months.",
    whatYouLearn: [
      "C-SAT (Paper 2) का संपूर्ण सिलेबस कवरेज",
      "उच्च गुणवत्ता वाले रिकॉर्डेड लेक्चर्स",
      "नेगेटिव मार्किंग के नवीनतम पैटर्न पर विशेष फोकस",
      "8 महीने की सम्पूर्ण वैधता",
      "क्लास पीडीएफ नोट्स की सुविधा",
      "तैयारी का मूल्यांकन करने के लिए महत्वपूर्ण प्रैक्टिस प्रश्न"
    ],
    whatYouLearnEn: [
      "Complete syllabus coverage for C-SAT (Paper 2)",
      "High-quality Online Recorded Lectures",
      "Special focus on the latest negative marking pattern",
      "Complete Course Validity of 8 Months",
      "Class PDF Notes available",
      "Important practice questions to evaluate preparation"
    ],
    highlights: [
      "कोर्स की वैधता: 8 महीने",
      "बैच का प्रकार: ऑनलाइन रिकॉर्डेड (Online Recorded)",
      "विशेष: नवीनतम नेगेटिव मार्किंग पैटर्न पर आधारित",
      "मूल्य: केवल ₹99 (₹499 से 80% छूट)",
      "Helpline: +91 97133 00123"
    ],
    highlightsEn: [
      "Course Validity: 8 Months",
      "Batch Type: Online Recorded Course",
      "Feature: Aligned with latest negative marking pattern",
      "Price: Only ₹99 (80% Off from ₹499)",
      "Helpline: +91 97133 00123"
    ],
    features: [
      { icon: "Clock", label: "वैधता", value: "8 महीने" } as any,
      { icon: "BookOpen", label: "नोट्स", value: "क्लास पीडीएफ नोट्स" } as any,
      { icon: "Video", label: "क्लासेस", value: "सम्पूर्ण रिकॉर्डेड लेक्चर्स" } as any,
      { icon: "MessageSquare", label: "पैटर्न", value: "नेगेटिव मार्किंग ओरिएंटेड" } as any
    ],
    featuresEn: [
      { icon: "Clock", label: "Validity", value: "8 Months" } as any,
      { icon: "BookOpen", label: "Notes", value: "Class PDF Notes" } as any,
      { icon: "Video", label: "Classes", value: "Complete Recorded Lectures" } as any,
      { icon: "MessageSquare", label: "Pattern", value: "Negative Marking Oriented" } as any
    ],
    syllabus: [
      {
        title: "C-SAT पाठ्यक्रम (C-SAT Syllabus)",
        titleEn: "C-SAT Syllabus",
        topics: ["गणित (Mathematics)", "तार्किक अभियोग्यता (Logical Reasoning)", "निर्णय क्षमता (Decision Making)", "सम्प्रेषण कौशल (Communication Skills)"],
        topicsEn: ["Mathematics", "Logical Reasoning", "Decision Making", "Communication Skills"]
      }
    ] as any
  } as any,
  {
    id: "XGarqHjldI8mR16XsV7zMd",
    slug: "mppsc-ug-foundation-3year-recorded-batch",
    title: "MPPSC 3 Year Program – UG Foundation Batch (रिकॉर्डेड)",
    titleHi: "MPPSC 3 Year Program – UG Foundation Batch (रिकॉर्डेड)",
    titleEn: "MPPSC 3 Year Program – UG Foundation Batch (Recorded)",
    category: "mppsc",
    image: "/images/mppsc-ug-foundation-3year-recorded.png",
    alt: "MPPSC 3 Year UG Foundation Batch 2026 रिकॉर्डेड बैच",
    altEn: "MPPSC 3 Year UG Foundation Batch 2026 Recorded Batch",
    badge: "3 Year Program",
    badgeEn: "3 Year Program",
    isLive: false,
    enrollUrl: "https://online.aakarias.com/courses/192",
    mentorName: "अनुभवी फैकल्टी टीम",
    mentorNameEn: "Experienced Faculty Team",
    mentorTitle: "विषय विशेषज्ञ",
    mentorTitleEn: "Subject Experts",
    mentorImage: "/images/placeholder.jpg",
    price: "₹56,000",
    originalPrice: "₹80,000",
    duration: "36 महीने की वैधता (3 वर्ष)",
    durationEn: "36 Months Validity (3 Years)",
    lecturesCount: "सम्पूर्ण रिकॉर्डेड लेक्चर्स",
    lecturesCountEn: "Complete Recorded Lectures",
    studentsCount: "2026 रिकॉर्डेड बैच",
    studentsCountEn: "2026 Recorded Batch",
    rating: "4.9",
    description: "12वीं के बाद, ग्रेजुएशन के साथ प्रशासनिक अधिकारी तक का सफ़र – आकार IAS के साथ। MPPSC 3 Year Program – UG Foundation Batch (2026 Recorded) NCERT आधारित पाठ्यक्रम पर तैयार किया गया है। नियमित रूप से प्रतिदिन 5 घंटे की कक्षाएँ, योग्य एवं अनुभवी शिक्षकों की सर्वश्रेष्ठ टीम, सम्पूर्ण पाठ्यक्रम पर आधारित प्रिंटेड नोट्स, विस्तृत परिचर्चा के साथ साप्ताहिक टेस्ट, और साक्षात्कार की निःशुल्क एवं सम्पूर्ण तैयारी शामिल है। कोर्स की वैधता 36 महीने है।",
    descriptionEn: "After 12th, journey towards becoming an Administrative Officer along with graduation – with Aakar IAS. MPPSC 3 Year Program – UG Foundation Batch (2026 Recorded) is designed based on NCERT curriculum. It includes regular 5-hour daily classes, the best team of qualified and experienced teachers, printed notes based on the complete syllabus, weekly tests with detailed discussion, and free and complete interview preparation. Course validity is 36 months.",
    whatYouLearn: [
      "NCERT आधारित सम्पूर्ण पाठ्यक्रम कवरेज",
      "प्रतिदिन 5 घंटे की नियमित कक्षाएँ",
      "योग्य एवं अनुभवी शिक्षकों की सर्वश्रेष्ठ टीम",
      "सम्पूर्ण पाठ्यक्रम पर आधारित प्रिंटेड नोट्स",
      "विस्तृत परिचर्चा के साथ साप्ताहिक टेस्ट",
      "नियत समय में परीक्षा का पाठ्यक्रम पूर्ण करना",
      "साक्षात्कार की निःशुल्क एवं सम्पूर्ण तैयारी",
      "36 महीने की कोर्स वैधता"
    ],
    whatYouLearnEn: [
      "Complete NCERT-based syllabus coverage",
      "Regular 5-hour daily classes",
      "Best team of qualified and experienced teachers",
      "Printed notes based on complete syllabus",
      "Weekly tests with detailed discussion",
      "Complete syllabus coverage within scheduled time",
      "Free and complete interview preparation",
      "36 months course validity"
    ],
    highlights: [
      "कोर्स की वैधता: 36 महीने (3 वर्ष)",
      "बैच का प्रकार: ऑनलाइन रिकॉर्डेड (2026 Recorded Batch)",
      "12वीं के बाद, ग्रेजुएशन के साथ MPPSC की तैयारी",
      "NCERT आधारित पाठ्यक्रम",
      "प्रतिदिन 5 घंटे की कक्षाएँ",
      "संस्थान से 75+ विद्यार्थियों का चयन",
      "Helpline: +91 97133 00123"
    ],
    highlightsEn: [
      "Course Validity: 36 Months (3 Years)",
      "Batch Type: Online Recorded (2026 Recorded Batch)",
      "MPPSC preparation after 12th, along with graduation",
      "NCERT-based curriculum",
      "Daily 5-hour classes",
      "75+ students selected from the institute",
      "Helpline: +91 97133 00123"
    ],
    features: [
      { icon: "Clock", label: "वैधता", value: "36 महीने (3 वर्ष)" } as any,
      { icon: "BookOpen", label: "नोट्स", value: "प्रिंटेड नोट्स" } as any,
      { icon: "Video", label: "कक्षाएँ", value: "प्रतिदिन 5 घंटे रिकॉर्डेड" } as any,
      { icon: "GraduationCap", label: "प्रोग्राम", value: "UG Foundation 3 Year" } as any,
      { icon: "Users", label: "चयन", value: "75+ विद्यार्थी चयनित" } as any
    ],
    featuresEn: [
      { icon: "Clock", label: "Validity", value: "36 Months (3 Years)" } as any,
      { icon: "BookOpen", label: "Notes", value: "Printed Notes" } as any,
      { icon: "Video", label: "Classes", value: "5 Hours Daily Recorded" } as any,
      { icon: "GraduationCap", label: "Program", value: "UG Foundation 3 Year" } as any,
      { icon: "Users", label: "Selections", value: "75+ Students Selected" } as any
    ],
    syllabus: [
      {
        title: "सामान्य अध्ययन (General Studies)",
        titleEn: "General Studies",
        topics: ["भारतीय इतिहास", "भारतीय राजव्यवस्था", "भारतीय अर्थव्यवस्था", "भूगोल", "विज्ञान एवं प्रौद्योगिकी", "पर्यावरण एवं पारिस्थितिकी"],
        topicsEn: ["Indian History", "Indian Polity", "Indian Economy", "Geography", "Science & Technology", "Environment & Ecology"]
      },
      {
        title: "मध्य प्रदेश विशेष (MP Special)",
        titleEn: "Madhya Pradesh Special",
        topics: ["म.प्र. का इतिहास", "म.प्र. का भूगोल", "म.प्र. की राजनीति एवं प्रशासन", "म.प्र. की अर्थव्यवस्था", "म.प्र. की कला एवं संस्कृति"],
        topicsEn: ["MP History", "MP Geography", "MP Politics & Administration", "MP Economy", "MP Art & Culture"]
      },
      {
        title: "NCERT आधारित (NCERT Based)",
        titleEn: "NCERT Based",
        topics: ["कक्षा 6-12 NCERT", "सामान्य विज्ञान", "गणित", "सामाजिक विज्ञान"],
        topicsEn: ["Class 6-12 NCERT", "General Science", "Mathematics", "Social Science"]
      },
      {
        title: "साक्षात्कार तैयारी (Interview Preparation)",
        titleEn: "Interview Preparation",
        topics: ["व्यक्तित्व विकास", "मॉक इंटरव्यू", "करेंट अफेयर्स", "संवाद कौशल"],
        topicsEn: ["Personality Development", "Mock Interview", "Current Affairs", "Communication Skills"]
      }
    ] as any
  } as any,
];

/** Lookup a course by its slug */
export function getCourseBySlug(slug: string): Course | undefined {
  return coursesData.find((c) => c.slug === slug);
}

/** Get all course slugs (for generateStaticParams) */
export function getAllCourseSlugs(): string[] {
  return coursesData.map((c) => c.slug);
}
