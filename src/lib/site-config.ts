/**
 * Central site configuration — single source of truth for SEO, navigation,
 * and brand metadata. Imported by layout, sitemap, robots, JSON-LD, and nav.
 */

export const siteConfig = {
  name: "Aakar IAS",
  shortName: "Aakar IAS",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aakarias.com",
  tagline: "भारत का प्रीमियम करेंट अफेयर्स प्लेटफ़ॉर्म",
  taglineEn: "India's Premium Current Affairs Platform",
  description:
    "Aakar IAS — India's premium bilingual (Hindi & English) current affairs platform for UPSC, MPPSC, and State PSC aspirants. Daily, weekly & monthly current affairs, editorials, PYQs, and free PDFs.",
  ogImage: "/api/og", // OG image route (dynamic) — implemented in a later step
  keywords: [
    "Aakar IAS",
    "Current Affairs",
    "करेंट अफेयर्स",
    "UPSC Current Affairs",
    "MPPSC Current Affairs",
    "Daily Current Affairs",
    "UPSC",
    "MPPSC",
    "IAS",
    "Hindi Current Affairs",
    "Monthly Current Affairs PDF",
    "UPSC Notes",
    "Prelims",
    "Mains",
  ] as string[],
  locale: {
    default: "hi",
    available: ["hi", "en"] as const,
  },
  links: {
    twitter: "https://twitter.com/aakarias",
    youtube: "https://youtube.com/@aakarias",
    telegram: "https://t.me/aakariasofficial",
    instagram: "https://www.instagram.com/aakariasofficial",
    facebook: "https://www.facebook.com/Aakar-IAS-100066460000041/",
    whatsapp: "https://wa.me/919713300123",
  },
  contact: {
    email: "help@aakarias.com",
    phone: "+91 9713300123",
    address: "178/2/4 - A B Road, near Rajiv Gandhi Circle, Pipliya Rao, Indore, Madhya Pradesh 452001",
    addressHi: "178/2/4 - ए बी रोड, राजीव गांधी सर्कल के पास, पिपलिया राव, इंदौर, मध्य प्रदेश 452001",
    mapQuery: "Aakar IAS Indore Rajiv Gandhi Circle",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.1746784584643!2d75.85957669999999!3d22.684540400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fce34e59c785%3A0x606bcfefc669ad0a!2sAakar%20IAS!5e0!3m2!1sen!2sin!4v1782564268772!5m2!1sen!2sin"
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Primary navigation — rendered in the header mega-nav and mobile sheet.
 * `section` groups items in the desktop dropdown.
 */
export type NavItem = {
  title: string;
  href: string;
  description?: string;
  badge?: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type DropdownItem = {
  title: string;
  titleEn: string;
  href: string;
};

export type MegaNavItem = {
  title: string;
  titleEn: string;
  href: string;
  dropdown?: DropdownItem[];
  isMega?: boolean;
};

export const navigationConfig: MegaNavItem[] = [
  { title: "होम", titleEn: "Home", href: "/" },
  {
    title: "कोर्स व टेस्ट",
    titleEn: "Courses & Tests",
    href: "/online-courses",
    dropdown: [
      { title: "ऑनलाइन कोर्सेज", titleEn: "Online Courses", href: "/online-courses" },
      { title: "ऑफलाइन कोर्सेज", titleEn: "Offline Courses", href: "/offline-courses" },
      { title: "टेस्ट सीरीज", titleEn: "Test Series", href: "/test-series" },
      { title: "फैकल्टी", titleEn: "Faculty", href: "/faculty" },
    ],
  },
  {
    title: "करेंट अफेयर्स",
    titleEn: "Current Affairs",
    href: "/current-affairs",
    dropdown: [
      { title: "डेली करेंट अफेयर्स", titleEn: "Daily CA", href: "/current-affairs/daily" },
      { title: "वीकली करेंट अफेयर्स", titleEn: "Weekly CA", href: "/weekly" },
      { title: "मंथली करेंट अफेयर्स", titleEn: "Monthly CA", href: "/monthly" },
      { title: "संपादकीय", titleEn: "Editorials", href: "/editorial" },
      { title: "एमपी करेंट अफेयर्स", titleEn: "MP Current Affairs", href: "/tag/mp-current-affairs" },
      { title: "महत्वपूर्ण दिवस", titleEn: "Important Days", href: "/important-days" },
      { title: "राष्ट्रीय मामले", titleEn: "National Affairs", href: "/tag/national-affairs" },
      { title: "अंतरराष्ट्रीय मामले", titleEn: "International Affairs", href: "/tag/international-affairs" },
      { title: "करेंट अफेयर्स क्विज़", titleEn: "CA Quiz", href: "/current-affairs/quiz" },
    ],
  },
  {
    title: "सामान्य अध्ययन (General Studies)",
    titleEn: "General Studies",
    href: "/general-awareness",
    dropdown: [
      { title: "भारतीय इतिहास", titleEn: "Indian History", href: "/general-awareness?subject=history" },
      { title: "भूगोल", titleEn: "Geography", href: "/general-awareness?subject=geography" },
      { title: "राजव्यवस्था", titleEn: "Polity", href: "/general-awareness?subject=polity" },
      { title: "अर्थव्यवस्था", titleEn: "Economics", href: "/general-awareness?subject=economy" },
      { title: "सामान्य विज्ञान", titleEn: "General Science", href: "/general-awareness?subject=general-science" },
      { title: "विज्ञान एवं प्रौद्योगिकी", titleEn: "Science & Technology", href: "/general-awareness?subject=science-technology" },
      { title: "एमपी सामान्य ज्ञान", titleEn: "MP GK", href: "/general-awareness?subject=mpgk" },
      { title: "विविध", titleEn: "Miscellaneous", href: "/general-awareness?subject=misc" },
    ],
  },
  {
    title: "एमपीपीएससी",
    titleEn: "MPPSC",
    href: "/mppsc",
    isMega: true,
    dropdown: [
      { title: "पाठ्यक्रम", titleEn: "Syllabus", href: "/mppsc/syllabus-2026" },
      { title: "नोट्स", titleEn: "Notes", href: "/mppsc-notes" },
      { title: "एमपीपीएससी करेंट अफेयर्स", titleEn: "MPPSC Current Affairs", href: "/tag/mppsc" },
      { title: "एमपीपीएससी पीवाईक्यू", titleEn: "MPPSC PYQ", href: "/pyq?exam=MPPSC" },
      { title: "टेस्ट सीरीज", titleEn: "Test Series", href: "/test-series" },
      { title: "रणनीति", titleEn: "Strategy", href: "/mppsc" },
      { title: "एमपी सामान्य अध्ययन", titleEn: "MP General Studies", href: "/mppsc" },
    ],
  },
  {
    title: "वन डे एग्जाम्स",
    titleEn: "One Day Exams",
    href: "/one-day-exam",
    dropdown: [
      { title: "MPSI", titleEn: "MPSI", href: "/one-day-exam/mpsi" },
      { title: "MP पुलिस कांस्टेबल", titleEn: "MP Constable", href: "/one-day-exam/mp-constable" },
      { title: "MPTET", titleEn: "MPTET", href: "/one-day-exam/mptet" },
      { title: "SSC", titleEn: "SSC", href: "/one-day-exam/ssc" },
      { title: "रेलवे (Railway)", titleEn: "Railway", href: "/one-day-exam/railway" },
      { title: "बैंकिंग (Banking)", titleEn: "Banking", href: "/one-day-exam/banking" },
      { title: "ESB एग्जाम्स", titleEn: "ESB Exams", href: "/one-day-exam/esb-exams" },
      { title: "अन्य सरकारी परीक्षाएं", titleEn: "Other Govt. Exams", href: "/one-day-exam/other-govt-exams" },
    ],
  },
  {
    title: "यूपीएससी",
    titleEn: "UPSC",
    href: "/upsc",
    isMega: true,
    dropdown: [
      { title: "संपादकीय", titleEn: "Editorials", href: "/upsc" },
      { title: "उत्तर लेखन", titleEn: "Answer Writing", href: "/upsc" },
      { title: "यूपीएससी करेंट अफेयर्स", titleEn: "UPSC Current Affairs", href: "/upsc" },
      { title: "यूपीएससी पीवाईक्यू", titleEn: "UPSC PYQ", href: "/upsc" },
      { title: "पुस्तकें", titleEn: "Books", href: "/upsc" },
    ],
  },
  {
    title: "संसाधन",
    titleEn: "Resources",
    href: "/free-pdf",
    dropdown: [
      { title: "टॉपर कॉपियां", titleEn: "Toppers Copy", href: "/mppsc/toppers-copy" },
      { title: "फ्री पीडीएफ लाइब्रेरी", titleEn: "Free PDF Library", href: "/free-pdf" },
      { title: "पीवाईक्यू बैंक", titleEn: "PYQ Bank", href: "/pyq" },
      { title: "पाठ्यक्रम पीडीएफ", titleEn: "Syllabus PDFs", href: "/monthly-pdf" },
      { title: "डेली क्विज़", titleEn: "Daily Quiz", href: "/daily-quiz" },
      { title: "माइंड मैप्स व इन्फोग्राफिक्स", titleEn: "Mind Maps & Infographics", href: "/free-pdf" },
      { title: "ऐप डाउनलोड करें", titleEn: "Download App", href: "/download" },
      { title: "NCERT ई-बुक्स", titleEn: "NCERT E-Books", href: "/ncert-books" },
    ],
  },
  {
    title: "अधिक",
    titleEn: "More",
    href: "/about",
    dropdown: [
      { title: "प्रकाशन", titleEn: "Publications", href: "/publications" },
      { title: "फ्री क्लासेज", titleEn: "Free Classes", href: "/media-center" },
      { title: "टॉपर/सफलता की कहानियां", titleEn: "Toppers / Success Stories", href: "/selections" },
      { title: "हमारे बारे में", titleEn: "About Us", href: "/about" },
      { title: "संपर्क करें", titleEn: "Contact", href: "/contact" },
    ],
  },
];

export const mainNav: NavItem[] = navigationConfig.map((node) => ({
  title: node.titleEn,
  href: node.href,
}));

export const examNav: NavSection[] = [
  {
    title: "Exams",
    items: [
      { title: "UPSC", href: "/upsc", description: "Civil Services Examination" },
      { title: "MPPSC", href: "/mppsc", description: "Madya Pradesh Public Service Commission" },
      {
        title: "Exam Notifications",
        href: "/notifications",
        description: "Latest & upcoming exam notifications",
        badge: "New",
      },
      { title: "Exam Calendar", href: "/calendar", description: "UPSC & State exam timeline" },
    ],
  },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Current Affairs",
    items: [
      { title: "Daily", href: "/current-affairs" },
      { title: "Weekly", href: "/weekly" },
      { title: "Monthly", href: "/monthly" },
      { title: "Monthly PDF", href: "/monthly-pdf" },
    ],
  },
  {
    title: "Exams",
    items: [
      { title: "UPSC", href: "/upsc" },
      { title: "MPPSC", href: "/mppsc" },
      { title: "Editorial", href: "/editorial" },
      { title: "Free PDF", href: "/free-pdf" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "Blog", href: "/blog" },
      { title: "Download App", href: "/download" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
      { title: "Refund Policy", href: "/refund" },
      { title: "Disclaimer", href: "/disclaimer" },
    ],
  },
];
