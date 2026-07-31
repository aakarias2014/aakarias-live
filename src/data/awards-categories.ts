export interface AwardCategory {
  slug: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  iconName: string;
  badge?: string;
  badgeEn?: string;
  examples: string[];
  examplesEn: string[];
}

export const AWARD_CATEGORIES: AwardCategory[] = [
  {
    slug: "civilian-awards",
    title: "भारत के सर्वोच्च नागरिक सम्मान",
    titleEn: "Highest Civilian Awards of India",
    subtitle: "भारत रत्न (Bharat Ratna)",
    subtitleEn: "Bharat Ratna & Highest Honors",
    description: "भारत का सर्वोच्च नागरिक सम्मान 'भारत रत्न' तथा देश के उच्च नागरिक सम्मानों की विस्तृत सूची, नियम एवं ऐतिहासिक तथ्य। MPPSC एवं UPSC हेतु अत्यंत महत्वपूर्ण।",
    descriptionEn: "Complete repository of Bharat Ratna awards, eligibility, historical facts, and recent conferments for MPPSC & UPSC exams.",
    iconName: "Award",
    badge: "सर्वोच्च सम्मान",
    badgeEn: "Highest Honor",
    examples: ["भारत रत्न (Bharat Ratna)", "नागरिक योग्यता सम्मान", "ऐतिहासिक प्राप्तकर्ता सूची"],
    examplesEn: ["Bharat Ratna", "Civilian Merit Honors", "Historical Recipient List"]
  },
  {
    slug: "padma-awards",
    title: "पद्म पुरस्कार (Padma Awards)",
    titleEn: "Padma Awards (Vibhushan, Bhushan & Shri)",
    subtitle: "पद्म विभूषण, पद्म भूषण एवं पद्म श्री",
    subtitleEn: "Padma Vibhushan, Bhushan & Shri",
    description: "वर्ष-वार पद्म विभूषण, पद्म भूषण और पद्म श्री पुरस्कारों की घोषणा, मध्य प्रदेश से सम्मानित हस्तियां और परीक्षा-उपयोगी तथ्य।",
    descriptionEn: "Annual Padma awards announcements, recipients from Madhya Pradesh, key domain awards, and exam notes.",
    iconName: "Sparkles",
    badge: "वार्षिक सूची 2026/2025",
    badgeEn: "Annual List",
    examples: ["पद्म विभूषण", "पद्म भूषण", "पद्म श्री (MP विशेष)"],
    examplesEn: ["Padma Vibhushan", "Padma Bhushan", "Padma Shri (MP Special)"]
  },
  {
    slug: "sports-awards",
    title: "राष्ट्रीय खेल पुरस्कार (National Sports Awards)",
    titleEn: "National Sports Awards",
    subtitle: "खेल रत्न, अर्जुन एवं द्रोणाचार्य पुरस्कार",
    subtitleEn: "Khel Ratna, Arjuna & Dronacharya",
    description: "मेजर ध्यानचंद खेल रत्न पुरस्कार, अर्जुन पुरस्कार, द्रोणाचार्य पुरस्कार, ध्यानचंद लाइफटाइम अचीवमेंट पुरस्कार और खेल प्रोत्साहन पुरस्कार।",
    descriptionEn: "Major Dhyan Chand Khel Ratna, Arjuna Awards, Dronacharya Coaching Awards, and Rashtriya Khel Protsahan Puraskar.",
    iconName: "Trophy",
    badge: "खेल क्षेत्र",
    badgeEn: "Sports Honors",
    examples: ["मेजर ध्यानचंद खेल रत्न", "अर्जुन पुरस्कार", "द्रोणाचार्य पुरस्कार"],
    examplesEn: ["Major Dhyan Chand Khel Ratna", "Arjuna Award", "Dronacharya Award"]
  },
  {
    slug: "gallantry-awards",
    title: "सैन्य एवं वीरता पुरस्कार (Gallantry & Military Awards)",
    titleEn: "Gallantry & Military Awards",
    subtitle: "परमवीर चक्र, अशोक चक्र व वीरता सम्मान",
    subtitleEn: "Param Vir Chakra, Ashok Chakra & Gallantry",
    description: "युद्धकालीन वीरता पुरस्कार (परमवीर चक्र, महावीर चक्र, वीर चक्र) और शांतिकालीन वीरता पुरस्कार (अशोक चक्र, कीर्ति चक्र, शौर्य चक्र)।",
    descriptionEn: "Wartime gallantry honors (Param Vir Chakra, Maha Vir Chakra, Vir Chakra) and peacetime bravery awards (Ashok Chakra, Kirti, Shaurya).",
    iconName: "Shield",
    badge: "रक्षा एवं शौर्य",
    badgeEn: "Defense & Valor",
    examples: ["परमवीर चक्र", "अशोक चक्र", "कीर्ति व शौर्य चक्र"],
    examplesEn: ["Param Vir Chakra", "Ashok Chakra", "Kirti & Shaurya Chakra"]
  },
  {
    slug: "literary-awards",
    title: "साहित्य एवं भाषा पुरस्कार (Literary Awards)",
    titleEn: "Literary & Language Awards",
    subtitle: "ज्ञानपीठ, साहित्य अकादमी व सरस्वती सम्मान",
    subtitleEn: "Jnanpith, Sahitya Akademi & Saraswati",
    description: "ज्ञानपीठ पुरस्कार, साहित्य अकादमी पुरस्कार, सरस्वती सम्मान, व्यास सम्मान और अंतर्राष्ट्रीय बुकर पुरस्कार की संपूर्ण जानकारी।",
    descriptionEn: "Jnanpith Award, Sahitya Akademi Awards, Saraswati Samman, Vyas Samman, and International Booker Prize.",
    iconName: "BookOpen",
    badge: "साहित्य व कला",
    badgeEn: "Literature",
    examples: ["ज्ञानपीठ पुरस्कार", "साहित्य अकादमी पुरस्कार", "सरस्वती सम्मान"],
    examplesEn: ["Jnanpith Award", "Sahitya Akademi Award", "Saraswati Samman"]
  },
  {
    slug: "mp-state-awards",
    title: "मध्य प्रदेश के राज्य सम्मान (MP State Awards)",
    titleEn: "Madhya Pradesh State Awards",
    subtitle: "तानसेन, कालिदास व कबीर सम्मान",
    subtitleEn: "Tansen, Kalidas & Kabir Samman",
    description: "MPPSC प्रारंभिक एवं मुख्य परीक्षा हेतु अति-महत्वपूर्ण: तानसेन सम्मान, कालिदास सम्मान, कबीर सम्मान, महात्मा गांधी राज्य सम्मान, लता मंगेशकर सम्मान।",
    descriptionEn: "High-priority for MPPSC exams: Tansen Samman, Kalidas Samman, Kabir Samman, Mahatma Gandhi Award, and Lata Mangeshkar Award.",
    iconName: "Landmark",
    badge: "MPPSC विशेष priority",
    badgeEn: "MPPSC Priority",
    examples: ["तानसेन सम्मान", "कालिदास सम्मान", "कबीर व महात्मा गांधी सम्मान"],
    examplesEn: ["Tansen Samman", "Kalidas Samman", "Kabir & Mahatma Gandhi Award"]
  },
  {
    slug: "international-nobel-awards",
    title: "अंतरराष्ट्रीय एवं नोबेल पुरस्कार (International & Nobel Prizes)",
    titleEn: "International & Nobel Prizes",
    subtitle: "नोबेल पुरस्कार, मैग्सेसे व बुकर पुरस्कार",
    subtitleEn: "Nobel Prize, Magsaysay & Booker",
    description: "नोबेल पुरस्कार (सभी 6 क्षेत्र), रमन मैग्सेसे पुरस्कार, बुकर पुरस्कार, एबल पुरस्कार और विश्व खाद्य पुरस्कार की वर्ष-वार सूची।",
    descriptionEn: "Comprehensive list of Nobel Prizes across 6 domains, Ramon Magsaysay Award, Booker Prize, Abel Prize, and World Food Prize.",
    iconName: "Globe",
    badge: "वैश्विक सम्मान",
    badgeEn: "Global Honors",
    examples: ["नोबेल पुरस्कार 2025/2026", "रमन मैग्सेसे पुरस्कार", "बुकर एवं एबल पुरस्कार"],
    examplesEn: ["Nobel Prizes", "Ramon Magsaysay Award", "Booker & Abel Prize"]
  },
  {
    slug: "cinema-arts-awards",
    title: "सिनेमा, कला एवं संस्कृति पुरस्कार (Cinema & Cultural Awards)",
    titleEn: "Cinema, Arts & Cultural Awards",
    subtitle: "दादा साहेब फाल्के, राष्ट्रीय फिल्म व ऑस्कर पुरस्कार",
    subtitleEn: "Dadasaheb Phalke, National Film & Oscars",
    description: "दादा साहेब फाल्के पुरस्कार, राष्ट्रीय फिल्म पुरस्कार, संगीत नाटक अकादमी पुरस्कार, ललित कला अकादमी और ऑस्कर (Academy Awards)।",
    descriptionEn: "Dadasaheb Phalke Award, National Film Awards, Sangeet Natak Akademi Fellowships, Academy Awards (Oscars).",
    iconName: "Palette",
    badge: "सिनेमा व संस्कृति",
    badgeEn: "Cinema & Culture",
    examples: ["दादा साहेब फाल्के पुरस्कार", "राष्ट्रीय फिल्म पुरस्कार", "ऑस्कर एवं ग्रैमी पुरस्कार"],
    examplesEn: ["Dadasaheb Phalke Award", "National Film Awards", "Oscars & Grammy Awards"]
  },
  {
    slug: "science-environment-awards",
    title: "विज्ञान, प्रौद्योगिकी एवं पर्यावरण पुरस्कार (Science & Environment)",
    titleEn: "Science, Tech & Environment Awards",
    subtitle: "भटनागर पुरस्कार, पर्यावरण पुरस्कार व जीडी बिड़ला",
    subtitleEn: "Bhatnagar Prize, Environment & GD Birla",
    description: "शांति स्वरूप भटनागर पुरस्कार, जीडी बिड़ला वैज्ञानिक अनुसंधान सम्मान, इंदिरा गांधी पर्यावरण पुरस्कार और पृथ्वी पुरस्कार।",
    descriptionEn: "Shanti Swarup Bhatnagar Prize for Science & Tech, GD Birla Award, Indira Gandhi Environment Award, and Tyler Prize.",
    iconName: "FlaskConical",
    badge: "विज्ञान व अनुसंधान",
    badgeEn: "Science & Innovation",
    examples: ["शांति स्वरूप भटनागर पुरस्कार", "जीडी बिड़ला सम्मान", "पर्यावरण व जैव विविधता पुरस्कार"],
    examplesEn: ["Shanti Swarup Bhatnagar Prize", "GD Birla Award", "Environment Honors"]
  }
];
