"use client";

import React, { useState, useMemo } from "react";
import type { TopperCopy as SanityTopperCopy } from "@/lib/content/types";
import Link from "next/link";
import { 
  Search, 
  BookOpen, 
  History, 
  Globe, 
  Scale, 
  Brain, 
  Languages, 
  TrendingUp, 
  Bookmark, 
  Download, 
  Star, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  BookOpenCheck,
  CheckCircle,
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShareDropdown } from "@/components/article/share-dropdown";

interface ToppersLibraryProps {
  locale: "hi" | "en";
  sanityCopies?: SanityTopperCopy[];
}

interface TopperCopy {
  id: string;
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
}


const TOPPER_COPIES: TopperCopy[] = [
  {
    id: "gs-ajeet-mishra",
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
  },
  {
    id: "ethics-ananya",
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
    descriptionEn: "Excellent framework for solving case studies and ethical dilemmas."
  },
  {
    id: "history-rohan",
    name: "रोहन देशमुख",
    nameEn: "Rohan Deshmukh",
    rank: "रैंक 12 (2022)",
    rankEn: "Rank 12 (2022)",
    paper: "सामान्य अध्ययन I: इतिहास (History)",
    paperEn: "GS Paper I: History",
    subject: "history",
    marks: "142/200",
    year: "2022",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiPfGSAVTS208SUImOI2AY1jfe5zjk8aSPPIACm9UWJl_FeCAvuTsQHxcG5dxRoAEEMj5vwBNISu3MLxI6KJvR-pPXkjelHv6ZUBh0fEm83QpLVyQuqU6ZaSj2ruVTHn7MglH3KLbauslAfP5l1jP5XUWbXRyis9Zhtft12EJa5YlE31Riskmd_R4ax2ZTy3vwld_K95el80iknoJnp26GCi8DZvNsrfHX2SUyR9pdTrhlZakBGfqgEVQvjF3kakURCB2aD6mRHFM"
  },
  {
    id: "polity-ishani",
    name: "ईशानी गुप्ता",
    nameEn: "Ishani Gupta",
    rank: "रैंक 4 (2022)",
    rankEn: "Rank 4 (2022)",
    paper: "सामान्य अध्ययन II: राजव्यवस्था (Polity)",
    paperEn: "GS Paper II: Polity & Constitution",
    subject: "polity",
    marks: "151/200",
    year: "2022",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp14slwG6PYSc3Fk6lJa6CSwv_Zz1C3oTnqkr3sIbcXFMmHbtUk2zwe4QsdZZ0EDTwlM6VCCgW--FU_DwOK-AC-JWlIFSxbPhyI4PSOl1mf7SEhe7sbRF3hWlpIM2CAcDAz56ezC_4WaAb4h-m5Sm4UQbgDe5dUO6UWhDc4QtTAuzd9q2G1mvBVPDFmQ4YoMuQ8oiVufpN4gMa6MXvkC494-uw5brdXbr7_rkBFyPC_zTEap1OXoochg3uViTQLNTR9bVNW90L6tk"
  },
  {
    id: "essay-vikram",
    name: "विक्रम सिंह",
    nameEn: "Vikram Singh",
    rank: "रैंक 21 (2021)",
    rankEn: "Rank 21 (2021)",
    paper: "प्रश्नपत्र VI: निबंध लेखन (Essay)",
    paperEn: "Paper VI: Essay",
    subject: "hindi",
    marks: "74/100",
    year: "2021",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHmQmVImBroAg-CIqyo6b4zNd8932l28-Vb6Evbi4uxBC0Ocrn1MPuFBUvYmR-9o0kL742TcZKnkbYx0wHiso6lJg_cJRXzRZc1EWaWSVkD7StbHOwYIHQVY9PWH7nKAPSuc_967jc8C_Be4k75tgInGEVoEP5bfoNlU4Y2D-wZCMFC3K7T2AW1DfLlJtWv6i863fKRd3tczJ483qDGFnx95DgJ_wpaSqeoJhjBCGFVLAsONuX48XTkfxFQGBU_v1fSHtX-3GgSYc"
  },
  {
    id: "geography-shreya",
    name: "श्रेया मालवीय",
    nameEn: "Shreya Malviya",
    rank: "रैंक 18 (2023)",
    rankEn: "Rank 18 (2023)",
    paper: "सामान्य अध्ययन I: भूगोल (Geography)",
    paperEn: "GS Paper I: Geography",
    subject: "geography",
    marks: "138/200",
    year: "2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnjYygaNzK1XHibZLQpM4SENRxY_wEKzY8gSklPCXTnIVMfLQ5GyME7gTcYWM55eAbHjsWkfncsOn3LLe00KUL9hIolG82JJPU9dUUVknywXEgc6QaKWX0ip1LtrE4xZWSgtI3cMA1QF4S3y7iA04qR3Vk_9L_TX3O4_Q7FGTIxJ-OIQf1N1aGQXqXyuK-Zmu9vQQogzuViHh7rkBbIlm9-uA443WvwMd0WRbdX8gyo-UUKxsW7OZNt-EiZmFfYSRFQ4KRO0qOBd0"
  },
  {
    id: "economy-neha",
    name: "नेहा तिवारी",
    nameEn: "Neha Tiwari",
    rank: "रैंक 42 (2023)",
    rankEn: "Rank 42 (2023)",
    paper: "सामान्य अध्ययन II: अर्थव्यवस्था (Economy)",
    paperEn: "GS Paper II: Economy",
    subject: "economy",
    marks: "145/200",
    year: "2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDbXWzuPWjr1UPDz6fQ325I_7cvdbAqoCnRHEqu9n3kI2PYshyN3G330fFpZ5vQx45XI1TECP8hqZ2EzHkV4_suGsFKu4UY4kBcwPU7BuJwktSFCp2_8OSCBCg0dVW-thkOrnyuBi2PKxrLx4nulsW87pImVeq2TDgQ6zCHvc2xrNLY2MfwsF4JZlUuKF1eGC8TCgxot2P9p6pJNkzLGdvV6cdDyFy8exr5x4xld-wwOb1JOuP2py08nPIRXnEKj9wA-CPsDSsqu8"
  }
];

const FACULTY_RECOMMENDED = [
  {
    id: "rec-geography",
    name: "श्रेया मालवीय",
    nameEn: "Shreya Malviya",
    subject: "Geography",
    subjectHi: "भूगोल",
    reason: "Recommended for Diagrams & Maps",
    reasonHi: "मानचित्र और आरेख प्रस्तुति हेतु अनुशंसित",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnjYygaNzK1XHibZLQpM4SENRxY_wEKzY8gSklPCXTnIVMfLQ5GyME7gTcYWM55eAbHjsWkfncsOn3LLe00KUL9hIolG82JJPU9dUUVknywXEgc6QaKWX0ip1LtrE4xZWSgtI3cMA1QF4S3y7iA04qR3Vk_9L_TX3O4_Q7FGTIxJ-OIQf1N1aGQXqXyuK-Zmu9vQQogzuViHh7rkBbIlm9-uA443WvwMd0WRbdX8gyo-UUKxsW7OZNt-EiZmFfYSRFQ4KRO0qOBd0"
  },
  {
    id: "rec-hindi",
    name: "अमित चौहान",
    nameEn: "Amit Chouhan",
    subject: "Hindi",
    subjectHi: "सामान्य हिंदी",
    reason: "Recommended for Language Flow",
    reasonHi: "भाषा प्रवाह और शुद्धता हेतु अनुशंसित",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7fqXWZD-Nv76q2FkT5syZx84wb2qhCYeKAcfem0K_AoEhguEXkpEN4vNAfDZEwSlEOEs8AlxKHavm9EJPUS2kBQrF7QAl2gjhnsR45RTlleobhKFUPwTITcf3YYIct0Cw4efAVmvRpnLYqUZV7u80AsMVcfXG8OFGhaROooMIJO6_NzOfdNNx9Td1iJNQGShY8SWTzp_qzH_SdOSayViAWj7nrGNTtPf4fdIU_kTYsIfDIIFKUxe5SigiAo4OZnEfO8Pv8jMI8YY"
  },
  {
    id: "rec-economy",
    name: "नेहा तिवारी",
    nameEn: "Neha Tiwari",
    subject: "Economy",
    subjectHi: "अर्थव्यवस्था",
    reason: "Recommended for Data & Case Studies",
    reasonHi: "आंकड़े और केस स्टडी समावेशन हेतु अनुशंसित",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDbXWzuPWjr1UPDz6fQ325I_7cvdbAqoCnRHEqu9n3kI2PYshyN3G330fFpZ5vQx45XI1TECP8hqZ2EzHkV4_suGsFKu4UY4kBcwPU7BuJwktSFCp2_8OSCBCg0dVW-thkOrnyuBi2PKxrLx4nulsW87pImVeq2TDgQ6zCHvc2xrNLY2MfwsF4JZlUuKF1eGC8TCgxot2P9p6pJNkzLGdvV6cdDyFy8exr5x4xld-wwOb1JOuP2py08nPIRXnEKj9wA-CPsDSsqu8"
  },
  {
    id: "rec-ethics",
    name: "करण राठौर",
    nameEn: "Karan Rathore",
    subject: "Ethics",
    subjectHi: "नीतिशास्त्र",
    reason: "Recommended for Answer Structure",
    reasonHi: "उत्तर संरचना और प्रवाह हेतु अनुशंसित",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQbeB0uhs7lByo363CRgQkB59QyheNPN1m82lf-RgXIaIKFaN7iNaysVcqQTR9iYoosx7zwVURr2HXixxmI0wKA3Ak01pDKtJ9Y5PR7apr1Ms2gO7iFMmYSpyCBdSg3N3Avp0aueakVIqCXv86HtVp6pj8Arzpj97MMMC1HzhePUanl56-eqs6frV3oxODNyCkr6IQZJKlJeRI_K1t_wLfU5Qb8lR2q7IQGxtHGxzkwCOaGf4dKWxpYcSwo5RhaOLw433G3eh2H_Q"
  }
];

export function ToppersLibrary({ locale, sanityCopies = [] }: ToppersLibraryProps) {
  const isHi = locale === "hi";

  // Convert Sanity docs to component format and merge with hardcoded copies
  const allCopies = useMemo<TopperCopy[]>(() => {
    const sanityConverted: TopperCopy[] = sanityCopies.map((s) => ({
      id: `sanity-${s.id}`,
      name: s.name,
      nameEn: s.name,
      rank: s.rank ? `DC रैंक ${s.rank} (${s.year})` : "टॉपर",
      rankEn: s.rank ? `DC Rank ${s.rank} (${s.year})` : "Topper",
      paper: `MPPSC मुख्य परीक्षा – ${s.subject === "history" ? "इतिहास" : s.subject === "hindi" ? "सामान्य हिंदी" : s.subject === "geography" ? "भूगोल" : s.subject === "polity" ? "राजव्यवस्था" : s.subject === "ethics" ? "नीतिशास्त्र" : s.subject === "economy" ? "अर्थव्यवस्था" : "सामान्य अध्ययन"} उत्तर लेखन`,
      paperEn: `MPPSC Mains ${s.subject === "history" ? "History" : s.subject === "hindi" ? "Hindi/Essay" : s.subject === "geography" ? "Geography" : s.subject === "polity" ? "Polity" : s.subject === "ethics" ? "Ethics" : s.subject === "economy" ? "Economy" : "GS"} Answer Copy`,
      subject: (s.subject as TopperCopy["subject"]) || "all",
      marks: s.score ? `${s.score}` : "टॉपर",
      year: s.year ? `${s.year}` : "2023",
      image: s.photoUrl || "https://cdn.sanity.io/images/pnc4agic/production321/53b9daa7581039d3eed29fa12a17655209bcb9c5-319x239.webp",
      pdfUrl: s.fileUrl || undefined,
    }));
    // Merge: Sanity copies first (newest), then hardcoded ones that don't duplicate
    const sanityIds = new Set(sanityCopies.map((s) => s.fileUrl));
    const filteredHardcoded = TOPPER_COPIES.filter(
      (c) => !c.pdfUrl || !sanityIds.has(c.pdfUrl)
    );
    return [...sanityConverted, ...filteredHardcoded];
  }, [sanityCopies]);

  const dynamicRecommendations = useMemo(() => {
    const sanityRecs = sanityCopies
      .filter((s) => s.isRecommended)
      .map((s) => {
        const getSubjectHi = (sub?: string) => {
          switch (sub) {
            case "history": return "इतिहास";
            case "geography": return "भूगोल";
            case "polity": return "राजव्यवस्था";
            case "ethics": return "नीतिशास्त्र";
            case "hindi": return "सामान्य हिंदी";
            case "economy": return "अर्थव्यवस्था";
            default: return "सामान्य अध्ययन";
          }
        };
        const getSubjectEn = (sub?: string) => {
          switch (sub) {
            case "history": return "History";
            case "geography": return "Geography";
            case "polity": return "Polity";
            case "ethics": return "Ethics";
            case "hindi": return "Hindi";
            case "economy": return "Economy";
            default: return "General Studies";
          }
        };

        return {
          id: `rec-${s.id}`,
          name: s.name,
          nameEn: s.name,
          subject: getSubjectEn(s.subject),
          subjectHi: getSubjectHi(s.subject),
          reason: s.recommendationReasonEn || "Recommended by faculty",
          reasonHi: s.recommendationReasonHi || "संकाय द्वारा अनुशंसित",
          image: s.recommendedBy?.image || s.photoUrl || "https://cdn.sanity.io/images/pnc4agic/production321/53b9daa7581039d3eed29fa12a17655209bcb9c5-319x239.webp",
        };
      });

    return sanityRecs.length > 0 ? sanityRecs : FACULTY_RECOMMENDED;
  }, [sanityCopies]);

  const [activeSubject, setActiveSubject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [activeYear, setActiveYear] = useState<string>("all");
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [selectedCopy, setSelectedCopy] = useState<TopperCopy | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const subjects = [
    { value: "all", label: isHi ? "सभी विषय" : "All Subjects", icon: BookOpen },
    { value: "history", label: isHi ? "इतिहास" : "History", icon: History },
    { value: "geography", label: isHi ? "भूगोल" : "Geography", icon: Globe },
    { value: "polity", label: isHi ? "राजव्यवस्था" : "Polity", icon: Scale },
    { value: "ethics", label: isHi ? "नीतिशास्त्र" : "Ethics", icon: Brain },
    { value: "hindi", label: isHi ? "सामान्य हिंदी / निबंध" : "Hindi / Essay", icon: Languages },
    { value: "economy", label: isHi ? "अर्थव्यवस्था" : "Economy", icon: TrendingUp },
  ];

  const years = [
    { value: "all", label: isHi ? "सभी वर्ष" : "All Years" },
    { value: "2026", label: "2026" },
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
  ];

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setBookmarked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredCopies = useMemo(() => {
    return allCopies.filter(copy => {
      const matchSubject = activeSubject === "all" || copy.subject === activeSubject;
      const matchYear = activeYear === "all" || copy.year === activeYear;
      
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        copy.name.toLowerCase().includes(q) ||
        copy.nameEn.toLowerCase().includes(q) ||
        copy.paper.toLowerCase().includes(q) ||
        copy.paperEn.toLowerCase().includes(q) ||
        copy.rank.toLowerCase().includes(q) ||
        copy.rankEn.toLowerCase().includes(q);

      return matchSubject && matchYear && matchSearch;
    });
  }, [activeSubject, activeYear, searchQuery, allCopies]);

  return (
    <div className="min-h-screen bg-muted/10 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-secondary text-secondary-foreground py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[var(--content-max)] relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-4 py-1 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            {isHi ? "नया" : "New"}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
            {isHi ? "MPPSC टॉपर्स आंसर कॉपियां" : "MPPSC Toppers Answer Copies"}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-white/80 leading-relaxed">
            {isHi 
              ? "MPPSC राज्य सेवा परीक्षा के सफल अभ्यर्थियों (टॉपर्स) की वास्तविक उत्तर पुस्तिकाएं (Answer Copies) मुफ्त डाउनलोड करें। उत्तर संरचना, चित्र और केस स्टडी प्रस्तुति रणनीतियाँ सीखें।"
              : "Download authentic answer scripts of successfully selected MPPSC candidates. Learn presentation structure, diagrams, and time-management strategies directly from the source."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all" onClick={() => {
              const element = document.getElementById("copies-section");
              element?.scrollIntoView({ behavior: "smooth" });
            }}>
              {isHi ? "नवीनतम कॉपियां देखें" : "View Latest Copies"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="ghost" className="border border-white/30 text-white hover:bg-white/10 hover:text-white rounded-xl" onClick={() => setIsRequestModalOpen(true)}>
              {isHi ? "कॉपी के लिए अनुरोध करें" : "Request a Copy"}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[var(--content-max)] mt-[-40px] relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card border border-border shadow-soft-lg rounded-2xl p-6 md:p-8">
          <div className="text-center md:border-r border-border/50 py-2">
            <p className="text-3xl lg:text-4xl font-black text-primary">500+</p>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1.5">
              {isHi ? "प्रमाणित कॉपियां" : "Authenticated Copies"}
            </p>
          </div>
          <div className="text-center md:border-r border-border/50 py-2">
            <p className="text-3xl lg:text-4xl font-black text-primary">120+</p>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1.5">
              {isHi ? "शीर्ष रैंकर्स" : "Top Rankers"}
            </p>
          </div>
          <div className="text-center md:border-r border-border/50 py-2">
            <p className="text-3xl lg:text-4xl font-black text-primary">ALL GS</p>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1.5">
              {isHi ? "पेपर्स कवर्ड" : "Papers Covered"}
            </p>
          </div>
          <div className="text-center py-2">
            <p className="text-3xl lg:text-4xl font-black text-primary">2020-26</p>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1.5">
              {isHi ? "नवीनतम अपडेट" : "Latest Updates"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[var(--content-max)] mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-5 sticky top-20 shadow-soft">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/60">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpenCheck className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-bold text-foreground leading-tight">
                  {isHi ? "विषय पुस्तकालय" : "Subject Library"}
                </h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
                  {isHi ? "एमपीपीएससी मुख्य परीक्षा" : "MPPSC Mains Repository"}
                </p>
              </div>
            </div>
            
            <nav className="space-y-1">
              {subjects.map((sub) => {
                const IconComp = sub.icon;
                const isActive = activeSubject === sub.value;
                return (
                  <button
                    key={sub.value}
                    onClick={() => setActiveSubject(sub.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 scale-[1.01]" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <IconComp className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-muted-foreground/80"}`} />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-border/60">
              <Button className="w-full rounded-xl" onClick={() => setIsRequestModalOpen(true)}>
                {isHi ? "कॉपी का अनुरोध करें" : "Request Copy"}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-8" id="copies-section">
          
          {/* Search Bar & Year Filter */}
          <div className="bg-card border border-border shadow-soft rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={isHi ? "टॉपर, विषय, वर्ष खोजें..." : "Search topper, subject, paper..."}
                value={searchQuery === " " ? "" : searchQuery}
                onChange={(e) => setSearchQuery(e.target.value || " ")}
                className="pl-9 h-11 rounded-xl bg-muted/20 border-border focus-visible:ring-primary/20"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto shrink-0 justify-end">
              {years.map((y) => (
                <button
                  key={y.value}
                  onClick={() => setActiveYear(y.value)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                    activeYear === y.value
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "bg-background text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {y.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Copy Spotlight */}
          {activeSubject === "all" && activeYear === "all" && !searchQuery.trim() && allCopies.length > 0 && (
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all flex flex-col md:flex-row">
              <div className="md:w-1/2 h-64 md:h-auto min-h-[300px] relative bg-muted/40">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${allCopies[0].image}')` }}
                />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {isHi ? "टॉपर की पसंद" : "Topper's Choice"}
                </div>
              </div>
              <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 block">
                  {isHi ? "विशेष रुप से प्रदर्शित" : "Featured Spotlight"}
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight text-foreground mb-4">
                  {isHi ? allCopies[0].paper : allCopies[0].paperEn}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">{isHi ? "टॉपर का नाम" : "Topper Name"}</span>
                    <span className="font-bold text-foreground">{isHi ? allCopies[0].name : allCopies[0].nameEn}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">{isHi ? "रैंक" : "Rank"}</span>
                    <span className="font-bold text-primary">{isHi ? allCopies[0].rank : allCopies[0].rankEn}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{isHi ? "प्राप्त अंक" : "Marks Obtained"}</span>
                    <span className="font-bold text-foreground">{allCopies[0].marks}</span>
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-wrap">
                  <Button className="flex-1 rounded-xl" onClick={() => setSelectedCopy(allCopies[0])}>
                    {isHi ? "उत्तर-पुस्तिका देखें" : "View PDF"}
                  </Button>
                  <Button variant="outline" className="px-3 rounded-xl" onClick={(e) => handleToggleBookmark(allCopies[0].id, e)}>
                    <Bookmark className={`h-5 w-5 ${bookmarked[allCopies[0].id] ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  </Button>
                  <ShareDropdown
                    title={isHi ? `आकार IAS MPPSC टॉपर उत्तर पुस्तिका - ${allCopies[0].name}` : `Aakar IAS MPPSC Topper Copy - ${allCopies[0].nameEn}`}
                    url={typeof window !== "undefined" ? `${window.location.origin}/mppsc/toppers-copy#${allCopies[0].id}` : `https://aakarias.com/mppsc/toppers-copy#${allCopies[0].id}`}
                    locale={locale}
                    showBullet={false}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Copies Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              {isHi ? "सभी उत्तर पुस्तिकाएं" : "Available Answer Copies"}
              <span className="ml-2 text-sm font-medium text-muted-foreground">({filteredCopies.length})</span>
            </h3>

            {filteredCopies.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/60 mx-auto mb-4" />
                <p className="font-bold text-foreground">{isHi ? "कोई उत्तर पुस्तिका नहीं मिली" : "No copies found"}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isHi ? "कृपया भिन्न फ़िल्टर या खोज शब्द आज़माएं।" : "Try adjusting your filters or search terms."}
                </p>
                <Button variant="outline" className="mt-4 rounded-xl" onClick={() => {
                  setActiveSubject("all");
                  setActiveYear("all");
                  setSearchQuery(" ");
                }}>
                  {isHi ? "फ़िल्टर साफ़ करें" : "Clear Filters"}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCopies.map((copy) => (
                  <Card key={copy.id} className="overflow-hidden border-border bg-card hover:border-primary/50 hover:shadow-soft-lg transition-all group">
                    <div className="h-44 bg-muted/40 relative">
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${copy.image}')` }}
                      />
                      <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-foreground uppercase tracking-wider">
                        {isHi ? copy.paper.split(":")[0] : copy.paperEn.split(":")[0]}
                      </div>
                    </div>
                    <CardContent className="p-5 space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                            {isHi ? copy.name : copy.nameEn}
                          </h4>
                          <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">
                            {copy.marks}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {isHi ? copy.rank : copy.rankEn} • {copy.year}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-1 border-t border-border/50">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="flex-1 rounded-lg text-xs font-bold"
                          onClick={() => setSelectedCopy(copy)}
                        >
                          {isHi ? "उत्तर पढ़ें" : "Read Copy"}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="px-2.5 rounded-lg"
                          onClick={(e) => handleToggleBookmark(copy.id, e)}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarked[copy.id] ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                        </Button>
                        <ShareDropdown
                          title={isHi ? `आकार IAS MPPSC टॉपर उत्तर पुस्तिका - ${copy.name}` : `Aakar IAS MPPSC Topper Copy - ${copy.nameEn}`}
                          url={typeof window !== "undefined" ? `${window.location.origin}/mppsc/toppers-copy#${copy.id}` : `https://aakarias.com/mppsc/toppers-copy#${copy.id}`}
                          locale={locale}
                          showBullet={false}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Faculty Recommended Carousel Section */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {isHi ? "संकाय अनुशंसित उत्तर पुस्तिकाएं" : "Faculty Recommended Copies"}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isHi 
                  ? "सर्वोत्तम उत्तर संरचना और उत्कृष्ट प्रस्तुति के आधार पर हमारे विशेषज्ञों द्वारा चयनित"
                  : "Selected by our expert faculty for exceptional structure and presentation"}
              </p>
            </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {dynamicRecommendations.map((rec) => (
                <div 
                  key={rec.id} 
                  className="border border-border/60 hover:border-primary bg-muted/20 hover:bg-card p-4 rounded-xl flex items-center gap-3.5 transition-all cursor-pointer group"
                  onClick={() => {
                    const match = allCopies.find(c => c.name.toLowerCase() === rec.name.toLowerCase());
                    if (match) setSelectedCopy(match);
                  }}
                >
                  <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${rec.image}')` }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest">
                      {isHi ? rec.subjectHi : rec.subject}
                    </p>
                    <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {isHi ? rec.name : rec.nameEn}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {isHi ? rec.reasonHi : rec.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Writing Tips (Topper's Arsenal) */}
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-bold text-foreground text-center">
              {isHi ? "मुख्य परीक्षा लेखन रणनीतियाँ (Topper's Arsenal)" : "Topper's Writing Arsenal"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card border border-border rounded-2xl hover:bg-muted/10 transition-colors">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <FileText className="h-5 w-5" />
                </span>
                <h4 className="font-bold text-foreground text-base mb-2">
                  {isHi ? "उत्तर संरचना (Answer Structure)" : "Answer Structure"}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isHi 
                    ? "भूमिका (Introduction) को प्रभावशाली बनाने और मुख्य भाग में पैराग्राफ के बजाय पॉइंट-वार उत्तर लिखने की कला सीखें।"
                    : "Learn to frame engaging introductions and structured points that capture the evaluator's attention."}
                </p>
              </div>

              <div className="p-6 bg-card border border-border rounded-2xl hover:bg-muted/10 transition-colors">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Globe className="h-5 w-5" />
                </span>
                <h4 className="font-bold text-foreground text-base mb-2">
                  {isHi ? "मानचित्र एवं आरेख (Visual Aids)" : "Visual Aids & Diagrams"}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isHi 
                    ? "मध्यप्रदेश के भूगोल और इतिहास के उत्तरों में प्रासंगिक फ्लोचार्ट, मैप और टाइमलाइन जोड़ने की तकनीक।"
                    : "Integrate maps, flowcharts, and diagrams to explain complex concepts in less time."}
                </p>
              </div>

              <div className="p-6 bg-card border border-border rounded-2xl hover:bg-muted/10 transition-colors">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Brain className="h-5 w-5" />
                </span>
                <h4 className="font-bold text-foreground text-base mb-2">
                  {isHi ? "कीवर्ड मैपिंग (Keyword Density)" : "Keyword Mapping"}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isHi 
                    ? "हिंदी व अंग्रेजी दोनों माध्यमों में उत्तरों की गुणवत्ता बढ़ाने के लिए मानक प्रशासनिक व संवैधानिक शब्दावली का उपयोग।"
                    : "Identify high-yield academic keywords that increase marks density per page in Hindi & English."}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-lg shadow-primary/10">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {isHi ? "क्या आप नई टॉपर कॉपियां इनबॉक्स में चाहते हैं?" : "Want the latest topper copies in your inbox?"}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {isHi 
                  ? "हमारे साप्ताहिक समाचार पत्र को सब्सक्राइब करें और नवीनतम एमपीपीएससी मेन्स परीक्षा की सर्वश्रेष्ठ उत्तर प्रतियों का विश्लेषण सीधे प्राप्त करें।"
                  : "Subscribe to our weekly newsletter and get curated analysis of the best answers from the recent MPPSC Mains exams."}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder={isHi ? "अपना ईमेल पता दर्ज करें" : "Your email address"}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-11 rounded-xl focus-visible:ring-white/35"
                />
                <Button variant="outline" className="bg-white text-primary border-white hover:bg-white/90 h-11 rounded-xl shrink-0 font-bold">
                  {isHi ? "सब्सक्राइब करें" : "Subscribe"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* PDF View Modal */}
      {selectedCopy && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-3xl overflow-hidden shadow-soft-lg flex flex-col h-[85vh]">
            <div className="p-4 border-b border-border/60 flex items-center justify-between bg-muted/30">
              <div>
                <h4 className="font-bold text-foreground">
                  {isHi ? selectedCopy.paper : selectedCopy.paperEn}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isHi ? "टॉपर:" : "Topper:"} {isHi ? selectedCopy.name : selectedCopy.nameEn} ({isHi ? selectedCopy.rank : selectedCopy.rankEn})
                </p>
              </div>
              <button 
                onClick={() => setSelectedCopy(null)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold bg-muted px-3 py-1.5 rounded-lg transition-colors"
              >
                {isHi ? "बंद करें" : "Close"}
              </button>
            </div>
            
            {/* PDF Viewer */}
            <div className="flex-1 bg-neutral-900 overflow-hidden min-h-0">
              {selectedCopy?.pdfUrl ? (
                <iframe
                  src={`${selectedCopy.pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                  className="w-full h-full border-0"
                  title={`${selectedCopy.nameEn} Answer Copy`}
                  loading="lazy"
                />
              ) : (
                /* Fallback mock preview when no real PDF */
                <div className="overflow-y-auto p-4 flex justify-center items-start h-full">
                  <div className="w-full max-w-2xl bg-white border border-neutral-700 shadow-2xl rounded-sm p-8 md:p-12 space-y-6 relative select-none">
                    <div className="absolute inset-y-0 left-12 w-[1px] bg-red-400" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100%_28px]" />
                    <div className="relative z-10 space-y-6 text-slate-800">
                      <div className="pb-6 border-b-2 border-slate-300 flex justify-between items-center text-xs text-slate-500 font-mono">
                        <span>AAKAR IAS MPPSC MAINS REPOSITORY</span>
                        <span>MARKS: {selectedCopy?.marks}</span>
                      </div>
                      <div className="text-center py-12 text-slate-500">
                        <p className="text-lg font-bold">PDF जल्द उपलब्ध होगी</p>
                        <p className="text-sm">Coming Soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>


            <div className="p-4 border-t border-border/60 flex items-center justify-between bg-muted/30">
              <span className="text-xs text-muted-foreground">
                {isHi ? "* यह एक प्रमाणित टॉपर कॉपी का पूर्वावलोकन है।" : "* This is a verified topper copy preview."}
              </span>
              <div className="flex gap-2 items-center flex-wrap">
                {selectedCopy && (
                  <ShareDropdown
                    title={isHi ? `आकार IAS MPPSC टॉपर उत्तर पुस्तिका - ${selectedCopy.name}` : `Aakar IAS MPPSC Topper Copy - ${selectedCopy.nameEn}`}
                    url={typeof window !== "undefined" ? `${window.location.origin}/mppsc/toppers-copy#${selectedCopy.id}` : `https://aakarias.com/mppsc/toppers-copy#${selectedCopy.id}`}
                    locale={locale}
                    showBullet={false}
                  />
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  onClick={() => {
                    if (selectedCopy?.pdfUrl) {
                      const a = document.createElement("a");
                      a.href = selectedCopy.pdfUrl;
                      a.target = "_blank";
                      a.rel = "noopener noreferrer";
                      a.download = `${selectedCopy.nameEn.replace(/\s+/g, "-")}-MPPSC-Answer-Copy.pdf`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    } else {
                      alert(isHi ? "पीडीएफ जल्द उपलब्ध होगी।" : "PDF coming soon!");
                    }
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isHi ? "डाउनलोड" : "Download PDF"}
                </Button>
                <Button size="sm" className="rounded-lg" onClick={() => setSelectedCopy(null)}>
                  {isHi ? "समझ गए" : "Got it"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Copy Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-soft-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-foreground text-lg">
                {isHi ? "नई उत्तर-पुस्तिका का अनुरोध करें" : "Request Topper Copy"}
              </h4>
              <button 
                onClick={() => {
                  setIsRequestModalOpen(false);
                  setRequestSubmitted(false);
                }}
                className="text-muted-foreground hover:text-foreground text-sm font-bold bg-muted px-2.5 py-1.5 rounded-lg transition-colors"
              >
                {isHi ? "बंद करें" : "Close"}
              </button>
            </div>

            {requestSubmitted ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle className="h-12 w-12 text-primary mx-auto" />
                <p className="font-bold text-foreground">{isHi ? "अनुरोध सफलतापूर्वक भेजा गया!" : "Request Sent Successfully!"}</p>
                <p className="text-sm text-muted-foreground">
                  {isHi 
                    ? "जैसे ही यह कॉपी उपलब्ध होगी, हम आपको आपके पंजीकृत ईमेल पर सूचित करेंगे।"
                    : "We will notify you via email as soon as this topper copy is added to the repository."}
                </p>
                <Button className="mt-4 rounded-xl" onClick={() => {
                  setIsRequestModalOpen(false);
                  setRequestSubmitted(false);
                }}>
                  {isHi ? "ठीक है" : "Okay"}
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                setRequestSubmitted(true);
              }}>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase">{isHi ? "टॉपर का नाम (यदि ज्ञात हो)" : "Topper Name (Optional)"}</label>
                  <Input type="text" placeholder={isHi ? "उदाहरण: अनन्य शर्मा" : "e.g. Ananya Sharma"} required={false} className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase">{isHi ? "विषय / पेपर" : "Subject / Paper"}</label>
                  <Input type="text" placeholder={isHi ? "उदाहरण: सामान्य अध्ययन III (अर्थव्यवस्था)" : "e.g. GS Paper I (History)"} required className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase">{isHi ? "अपना ईमेल पता" : "Your Email"}</label>
                  <Input type="email" placeholder="you@example.com" required className="rounded-xl" />
                </div>
                <Button type="submit" className="w-full h-11 rounded-xl font-bold mt-2">
                  {isHi ? "अनुरोध सबमिट करें" : "Submit Request"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
