import { getContentRepository } from "@/lib/content/content-repository";

export interface UnifiedTopperCopy {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  rank: string;
  rankEn: string;
  paper: string;
  paperEn: string;
  subject: "history" | "geography" | "polity" | "ethics" | "hindi" | "economy" | "all";
  marks: string;
  year: string;
  image: string;
  description?: string;
  descriptionEn?: string;
  pdfUrl?: string;
  exam: string;
}

export const HARDCODED_TOPPER_COPIES: UnifiedTopperCopy[] = [
  {
    id: "gs-ajeet-mishra",
    slug: "gs-ajeet-mishra",
    name: "अजीत कुमार मिश्रा",
    nameEn: "Ajeet Kumar Mishra",
    rank: "DC रैंक 1 (2023)",
    rankEn: "DC Rank 1 (2023)",
    paper: "MPPSC मुख्य परीक्षा – सामान्य अध्ययन उत्तर लेखन",
    paperEn: "MPPSC Mains GS Answer Writing Copy",
    subject: "history",
    marks: "टॉपर",
    year: "2023",
    image: "https://cdn.sanity.io/images/pnc4agic/production321/53b9daa7581039d3eed29fa12a17655209bcb9c5-319x239.webp",
    description: "MPPSC 2023 DC रैंक 1 – अजीत कुमार मिश्रा की प्रेरणादायक उत्तर पुस्तिका। जानें कैसे संरचनात्मक उत्तर लेखन से उन्होंने प्रथम रैंक प्राप्त किया।",
    descriptionEn: "MPPSC 2023 DC Rank 1 – Ajeet Kumar Mishra's inspirational answer copy. Learn how structured GS answer writing helped him achieve Rank 1.",
    pdfUrl: "https://cdn.sanity.io/files/pnc4agic/production321/0717f8c5b7499d6b22761e662a1c66c34893382b.pdf",
    exam: "MPPSC",
  },
  {
    id: "ethics-ananya",
    slug: "ethics-ananya",
    name: "अनन्या शर्मा",
    nameEn: "Ananya Sharma",
    rank: "रैंक 1 (2022)",
    rankEn: "Rank 1 (2022)",
    paper: "सामान्य अध्ययन IV: नीतिशास्त्र (Ethics)",
    paperEn: "GS Paper IV: Ethics & Integrity",
    subject: "ethics",
    marks: "158/200",
    year: "2022",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbb00rcvOF90siJUGBIL26_X83Ao26dbwoJWGUdxF8XeaAVTArPl1ORYNObTBJx1vrGJJtpvtAcosw5XKnN3YNxKEgnpFBtEGOCFbFAxSSPRfHkxITKjTwvcs-NdjgUkBkXfTz9RJfqx2bRfhu8am7czS-4kbqce62RMK2jccFRQWnvh650mIrOqf_izhzu270p2G5wIZH-sxaBD8slGtWW1ZGubWbyeYA8VF-ILP6zyooORuP-KKssNgl-sxqy3Sxz5WMFMYstto",
    description: "केस स्टडीज और नैतिक दुविधाओं को हल करने की बेहतरीन संरचना।",
    descriptionEn: "Excellent framework for solving case studies and ethical dilemmas.",
    exam: "MPPSC",
  },
  {
    id: "history-rohan",
    slug: "history-rohan",
    name: "रोहन देशमुख",
    nameEn: "Rohan Deshmukh",
    rank: "रैंक 12 (2022)",
    rankEn: "Rank 12 (2022)",
    paper: "सामान्य अध्ययन I: इतिहास (History)",
    paperEn: "GS Paper I: History",
    subject: "history",
    marks: "142/200",
    year: "2022",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiPfGSAVTS208SUImOI2AY1jfe5zjk8aSPPIACm9UWJl_FeCAvuTsQHxcG5dxRoAEEMj5vwBNISu3MLxI6KJvR-pPXkjelHv6ZUBh0fEm83QpLVyQuqU6ZaSj2ruVTHn7MglH3KLbauslAfP5l1jP5XUWbXRyis9Zhtft12EJa5YlE31Riskmd_R4ax2ZTy3vwld_K95el80iknoJnp26GCi8DZvNsrfHX2SUyR9pdTrhlZakBGfqgEVQvjF3kakURCB2aD6mRHFM",
    description: "इतिहास के उत्तरों में आरेख व मानचित्र समावेश की उत्कृष्ट तकनीक।",
    descriptionEn: "Outstanding technique of including maps and diagrams in history answers.",
    exam: "MPPSC",
  },
  {
    id: "polity-ishani",
    slug: "polity-ishani",
    name: "ईशानी गुप्ता",
    nameEn: "Ishani Gupta",
    rank: "रैंक 4 (2022)",
    rankEn: "Rank 4 (2022)",
    paper: "सामान्य अध्ययन II: राजव्यवस्था (Polity)",
    paperEn: "GS Paper II: Polity & Constitution",
    subject: "polity",
    marks: "151/200",
    year: "2022",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp14slwG6PYSc3Fk6lJa6CSwv_Zz1C3oTnqkr3sIbcXFMmHbtUk2zwe4QsdZZ0EDTwlM6VCCgW--FU_DwOK-AC-JWlIFSxbPhyI4PSOl1mf7SEhe7sbRF3hWlpIM2CAcDAz56ezC_4WaAb4h-m5Sm4UQbgDe5dUO6UWhDc4QtTAuzd9q2G1mvBVPDFmQ4YoMuQ8oiVufpN4gMa6MXvkC494-uw5brdXbr7_rkBFyPC_zTEap1OXoochg3uViTQLNTR9bVNW90L6tk",
    description: "संवैधानिक अनुच्छेदों व केस लॉज का प्रभावी उपयोग।",
    descriptionEn: "Effective use of constitutional articles and judicial precedents.",
    exam: "MPPSC",
  },
  {
    id: "essay-vikram",
    slug: "essay-vikram",
    name: "विक्रम सिंह",
    nameEn: "Vikram Singh",
    rank: "रैंक 21 (2021)",
    rankEn: "Rank 21 (2021)",
    paper: "प्रश्नपत्र VI: निबंध लेखन (Essay)",
    paperEn: "Paper VI: Essay",
    subject: "hindi",
    marks: "74/100",
    year: "2021",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHmQmVImBroAg-CIqyo6b4zNd8932l28-Vb6Evbi4uxBC0Ocrn1MPuFBUvYmR-9o0kL742TcZKnkbYx0wHiso6lJg_cJRXzRZc1EWaWSVkD7StbHOwYIHQVY9PWH7nKAPSuc_967jc8C_Be4k75tgInGEVoEP5bfoNlU4Y2D-wZCMFC3K7T2AW1DfLlJtWv6i863fKRd3tczJ483qDGFnx95DgJ_wpaSqeoJhjBCGFVLAsONuX48XTkfxFQGBU_v1fSHtX-3GgSYc",
    description: "निबंध लेखन में विषयों के विविध आयामों का विश्लेषण।",
    descriptionEn: "Comprehensive multi-dimensional analysis in essay writing.",
    exam: "MPPSC",
  },
  {
    id: "geography-shreya",
    slug: "geography-shreya",
    name: "श्रेया मालवीय",
    nameEn: "Shreya Malviya",
    rank: "रैंक 18 (2023)",
    rankEn: "Rank 18 (2023)",
    paper: "सामान्य अध्ययन I: भूगोल (Geography)",
    paperEn: "GS Paper I: Geography",
    subject: "geography",
    marks: "138/200",
    year: "2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnjYygaNzK1XHibZLQpM4SENRxY_wEKzY8gSklPCXTnIVMfLQ5GyME7gTcYWM55eAbHjsWkfncsOn3LLe00KUL9hIolG82JJPU9dUUVknywXEgc6QaKWX0ip1LtrE4xZWSgtI3cMA1QF4S3y7iA04qR3Vk_9L_TX3O4_Q7FGTIxJ-OIQf1N1aGQXqXyuK-Zmu9vQQogzuViHh7rkBbIlm9-uA443WvwMd0WRbdX8gyo-UUKxsW7OZNt-EiZmFfYSRFQ4KRO0qOBd0",
    description: "भूगोल में भारत व मध्य प्रदेश के मानचित्रों का स्पष्ट निरूपण।",
    descriptionEn: "Clear representation of India and MP maps in geography answers.",
    exam: "MPPSC",
  },
  {
    id: "economy-neha",
    slug: "economy-neha",
    name: "नेहा तिवारी",
    nameEn: "Neha Tiwari",
    rank: "रैंक 42 (2023)",
    rankEn: "Rank 42 (2023)",
    paper: "सामान्य अध्ययन II: अर्थव्यवस्था (Economy)",
    paperEn: "GS Paper II: Economy",
    subject: "economy",
    marks: "145/200",
    year: "2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDbXWzuPWjr1UPDz6fQ325I_7cvdbAqoCnRHEqu9n3kI2PYshyN3G330fFpZ5vQx45XI1TECP8hqZ2EzHkV4_suGsFKu4UY4kBcwPU7BuJwktSFCp2_8OSCBCg0dVW-thkOrnyuBi2PKxrLx4nulsW87pImVeq2TDgQ6zCHvc2xrNLY2MfwsF4JZlUuKF1eGC8TCgxot2P9p6pJNkzLGdvV6cdDyFy8exr5x4xld-wwOb1JOuP2py08nPIRXnEKj9wA-CPsDSsqu8",
    description: "आर्थिक सर्वेक्षण व सरकारी योजनाओं के आंकड़ों का सटीक समावेशन।",
    descriptionEn: "Accurate inclusion of economic survey data and government schemes.",
    exam: "MPPSC",
  }
];

export async function getAllTopperCopies(locale: "hi" | "en" = "hi"): Promise<UnifiedTopperCopy[]> {
  try {
    const repo = await getContentRepository();
    const sanityCopies = await repo.listTopperCopies(locale);

    const sanityConverted: UnifiedTopperCopy[] = sanityCopies.map((s) => {
      const rawId = s.id.replace(/^sanity-/, "");
      return {
        id: s.slug || rawId,
        slug: s.slug || rawId,
        name: s.name,
        nameEn: s.name,
        rank: s.rank ? `DC रैंक ${s.rank} (${s.year || 2023})` : "टॉपर",
        rankEn: s.rank ? `DC Rank ${s.rank} (${s.year || 2023})` : "Topper",
        paper: `MPPSC मुख्य परीक्षा – ${s.subject === "history" ? "इतिहास" : s.subject === "hindi" ? "सामान्य हिंदी" : s.subject === "geography" ? "भूगोल" : s.subject === "polity" ? "राजव्यवस्था" : s.subject === "ethics" ? "नीतिशास्त्र" : s.subject === "economy" ? "अर्थव्यवस्था" : "सामान्य अध्ययन"} उत्तर लेखन`,
        paperEn: `MPPSC Mains ${s.subject === "history" ? "History" : s.subject === "hindi" ? "Hindi/Essay" : s.subject === "geography" ? "Geography" : s.subject === "polity" ? "Polity" : s.subject === "ethics" ? "Ethics" : s.subject === "economy" ? "Economy" : "GS"} Answer Copy`,
        subject: (s.subject as UnifiedTopperCopy["subject"]) || "all",
        marks: s.score ? `${s.score}` : "टॉपर",
        year: s.year ? `${s.year}` : "2023",
        image: s.photoUrl || "https://aakarias.com/opengraph-image.png",
        pdfUrl: s.fileUrl || undefined,
        description: s.recommendationReasonHi || `${s.name} (${s.rank ? `रैंक ${s.rank}` : "टॉपर"}) की वास्तविक MPPSC मुख्य परीक्षा उत्तर पुस्तिका।`,
        descriptionEn: s.recommendationReasonEn || `${s.name}'s actual MPPSC Mains Answer Copy.`,
        exam: s.exam || "MPPSC",
      };
    });

    return [...sanityConverted, ...HARDCODED_TOPPER_COPIES];
  } catch (err) {
    console.error("Error fetching topper copies:", err);
    return HARDCODED_TOPPER_COPIES;
  }
}

export async function getTopperCopyBySlug(slug: string, locale: "hi" | "en" = "hi"): Promise<UnifiedTopperCopy | null> {
  const all = await getAllTopperCopies(locale);
  const cleanSlug = decodeURIComponent(slug).replace(/^sanity-/, "");
  
  return (
    all.find(
      (c) =>
        c.slug.toLowerCase() === cleanSlug.toLowerCase() ||
        c.id.toLowerCase() === cleanSlug.toLowerCase() ||
        c.id.toLowerCase() === `sanity-${cleanSlug.toLowerCase()}`
    ) || null
  );
}
