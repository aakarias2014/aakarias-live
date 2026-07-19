export interface AdConfig {
  id: string;
  image: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  ctaHi: string;
  ctaEn: string;
  href: string;
  hrefEn?: string;
}

export const ADS: AdConfig[] = [
  {
    id: "batch-2025",
    image: "/images/ads/batch-2025.png",
    titleHi: "नया बैच शुरू!",
    titleEn: "New Batch Starting!",
    subtitleHi: "UPSC प्रीलिम्स 2025 के लिए विशेष क्रैश कोर्स।",
    subtitleEn: "Special Crash Course for UPSC Prelims 2025.",
    ctaHi: "अभी जुड़ें →",
    ctaEn: "Join Now →",
    href: "/download",
    hrefEn: "/en/download",
  },
  {
    id: "monthly-pdf",
    image: "/images/ads/monthly-pdf.png",
    titleHi: "मासिक PDF डाउनलोड करें",
    titleEn: "Download Monthly PDF",
    subtitleHi: "जून 2025 की सम्पूर्ण करेंट अफेयर्स PDF — निःशुल्क।",
    subtitleEn: "Complete June 2025 Current Affairs PDF — Free.",
    ctaHi: "PDF पाएं →",
    ctaEn: "Get PDF →",
    href: "/monthly-pdf",
    hrefEn: "/en/monthly-pdf",
  },
  {
    id: "app-download",
    image: "/images/ads/app-download.png",
    titleHi: "आकार IAS ऐप डाउनलोड करें",
    titleEn: "Download Aakar IAS App",
    subtitleHi: "MCQ, लाइव क्लास, और करेंट अफेयर्स — एक ऐप में।",
    subtitleEn: "MCQs, Live Classes & Current Affairs — all in one app.",
    ctaHi: "अभी डाउनलोड करें →",
    ctaEn: "Download Now →",
    href: "/download",
    hrefEn: "/en/download",
  },
  {
    id: "test-series",
    image: "/images/ads/test-series.png",
    titleHi: "टेस्ट सीरीज़ 2025",
    titleEn: "Test Series 2025",
    subtitleHi: "UPSC प्रीलिम्स की सटीक तैयारी के लिए मॉक टेस्ट।",
    subtitleEn: "Mock tests designed for UPSC Prelims precision.",
    ctaHi: "टेस्ट दें →",
    ctaEn: "Start Test →",
    href: "/test-series",
    hrefEn: "/en/test-series",
  },
];
