"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Download,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
  BookOpenCheck,
  Map,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { siteConfig } from "@/lib/site-config";
import { TrackedDownloadLink } from "@/components/content/tracked-download-link";
import { submitOfflineEnquiry } from "@/actions/contact";
import { X, Loader2, CheckCircle2 } from "lucide-react";

interface Batch {
  title: string;
  startDate: string;
  time: string;
  medium: string;
  badge?: string;
  seatsFillPercent?: number;
  description: string;
  locationName: string;
  isNew?: boolean;
}

interface CenterDetails {
  name: string;
  fullName: string;
  address: string;
  phone: string;
  schedule: string;
  mapImage: string;
  directionsUrl: string;
  batches: Batch[];
}

const centersData: Record<string, CenterDetails> = {
  indore: {
    name: "Indore",
    fullName: "इंदौर केंद्र (Indore Center) (Head Office)",
    address: siteConfig.contact.addressHi,
    phone: siteConfig.contact.phone,
    schedule: "सोम - शनि: सुबह 08:00 से रात 08:00 बजे तक | रविवार: अवकाश",
    mapImage: "",
    directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.mapQuery)}`,
    batches: [
      {
        title: "UPSC GS Foundation",
        startDate: "October 15, 2024",
        time: "08:00 AM - 12:00 PM",
        medium: "Hindi / English (Bilingual)",
        badge: "प्रवेश प्रारंभ",
        seatsFillPercent: 85,
        description: "Complete foundational prep for General Studies (Pre + Mains) and CSAT.",
        locationName: "Rajiv Gandhi Circle Campus",
      },
      {
        title: "MPPSC Foundation",
        startDate: "October 20, 2024",
        time: "02:00 PM - 06:00 PM",
        medium: "Hindi Medium",
        badge: "प्रवेश प्रारंभ",
        seatsFillPercent: 60,
        description: "Specialized batch dedicated for MPPSC Prelims, Mains, and Interview guidance.",
        locationName: "Rajiv Gandhi Circle Campus",
      },
      {
        title: "MPSI Specialized",
        startDate: "November 01, 2024",
        time: "10:00 AM - 01:00 PM",
        medium: "Hindi Medium",
        badge: "New Batch",
        seatsFillPercent: 40,
        description: "Targeted guidance and physical preparation strategies for MP Police Sub Inspector exam.",
        locationName: "Rajiv Gandhi Circle Campus",
      },
    ],
  },
};

const features = [
  {
    icon: GraduationCap,
    title: "Expert Faculty",
    desc: "Years of experience and excellent teaching methodology making complex subjects simple.",
  },
  {
    icon: BookOpen,
    title: "Printed Notes",
    desc: "Fully updated, precise, and exam-oriented study materials compiled in simple language.",
  },
  {
    icon: Users,
    title: "Personal Mentorship",
    desc: "One-on-one sessions by mentors to review each student's progress and guide strategy.",
  },
  {
    icon: BookOpenCheck,
    title: "बैकअप क्लासेस & टेस्ट",
    desc: "नियमित मूल्यांकन परीक्षा और क्लास छूट जाने पर ऑनलाइन बैकअप वीडियो उपलब्धता।",
  },
];

const facultiesHindi = [
  {
    name: "अश्विनी कुमार मुदगिल",
    title: "Senior Faculty (Polity & Philosophy)",
    desc: "UPSC और राज्य PSC के लिए 16+ वर्षों का अध्यापन। सहायक भू-अभिलेख अधीक्षक (MPPSC), इंटेलिजेंस ब्यूरो (IB), और संसद में प्रोटोकॉल अधिकारी के रूप में चयनित।",
    image: "/images/faculty/ashwini-kumar.png",
  },
  {
    name: "अथर्व तिवारी",
    title: "Senior Faculty (History & Culture)",
    desc: "UPSC और MPPSC के लिए 16+ वर्षों का अध्यापन। इतिहास में एम.ए., नेट और सेट क्वालिफाइड, पीएच.डी. शोधार्थी। सहायक प्राध्यापक (MPPSC) और सब-इंस्पेक्टर (SSC) के रूप में चयनित।",
    image: "/images/faculty/atharv-tiwari.png",
  },
  {
    name: "गौरव तिवारी",
    title: "Senior Faculty (Geography & Science)",
    desc: "UPSC और राज्य PSC के लिए 12+ वर्षों का अध्यापन। भूगोल में यूजीसी-नेट क्वालिफाइड। जूनियर इंजीनियर और भारतीय रेलवे लोको पायलट के रूप में चयनित।",
    image: "/images/faculty/gaurav-tiwari.png",
  },
  {
    name: "नितिन गुप्ता",
    title: "Faculty (Hindi & Essay)",
    desc: "UPSC और राज्य PSC के लिए 11+ वर्षों का अध्यापन। बीसीए (यूनिवर्सिटी टॉपर) और एमएसडब्ल्यू (कॉलेज टॉपर)। हिंदी भवन भोपाल में वाटरशेड प्रबंधन परियोजना प्रमुख के रूप में चयनित।",
    image: "/images/faculty/nitin-gupta.png",
  },
  {
    name: "जीवन पाटीदार",
    title: "Faculty (Science & Environment)",
    desc: "UPSC और राज्य PSC के लिए 10+ वर्षों का अध्यापन अनुभव। राजनीति विज्ञान में स्नातकोत्तर।",
    image: "/images/faculty/jeevan-patidar.png",
  },
  {
    name: "राहुल बघेल",
    title: "Faculty (MPGK)",
    desc: "UPSC और राज्य PSC के लिए 10+ वर्षों का अध्यापन। बायोमेडिकल इंजीनियरिंग (SGSITS) में स्नातक। मध्य प्रदेश सामान्य ज्ञान विशेषज्ञ।",
    image: "/images/faculty/rahul-baghel.png",
  },
];

const facultiesEnglish = [
  {
    name: "विवेक परमार",
    title: "Faculty (History & Culture)",
    desc: "UPSC और राज्य PSC के लिए 13+ वर्षों का अध्यापन। राज्य सेवा (MPPSC) साक्षात्कार में शामिल। इतिहास में एम.ए., एसएससी सीजीएल और सीपीओ लिखित परीक्षा उत्तीर्ण।",
    image: "/images/faculty/vivek-parmar.png",
  },
  {
    name: "अभिषेक यादव",
    title: "Faculty (Polity)",
    desc: "UPSC और राज्य PSC के लिए 8+ वर्षों का अध्यापन। राज्य सेवा (MPPSC) साक्षात्कार में शामिल। बी.ई. और राजनीति विज्ञान व इतिहास में एम.ए.।",
    image: "/images/faculty/abhishek-yadav.png",
  },
  {
    name: "कार्तिक गौतम",
    title: "Faculty (Economics & Management)",
    desc: "UPSC और राज्य PSC के लिए 7+ वर्षों का अध्यापन। राज्य सेवा (MPPSC) साक्षात्कार में शामिल। राजनीति विज्ञान में स्नातकोत्तर, यूपीएससी सीडीएस लिखित परीक्षा उत्तीर्ण।",
    image: "/images/faculty/kartik-gautam.png",
  },
  {
    name: "निहार रंजन",
    title: "Faculty (Science & Tech & Environment)",
    desc: "UPSC और MPPSC के लिए 9+ वर्षों का अध्यापन अनुभव। यूपीएससी और ओपीएससी मुख्य परीक्षा में शामिल। एम.एससी. (बायोटेक्नोलॉजी) और एम.ए. (लोक प्रशासन)।",
    image: "/images/faculty/nihar-ranjan.png",
  },
  {
    name: "अमित कुमार जैन",
    title: "Faculty (MPGS)",
    desc: "MPPSC और UPSC के लिए 8+ वर्षों का अध्यापन। यूपीएससी मुख्य परीक्षा और 6 बार एमपीपीएससी मुख्य परीक्षा में शामिल। इतिहास में एम.ए., यूजीसी नेट क्वालिफाइड।",
    image: "/images/faculty/amit-kumar-jain.png",
  },
  {
    name: "धर्मेंद्र चौधरी",
    title: "Faculty (Philosophy, Polity & Ethics)",
    desc: "MPPSC और UPSC के लिए 9+ वर्षों का अध्यापन। यूपीएससी सिविल सेवा साक्षात्कार में शामिल। बी.ई., दर्शनशास्त्र व राजनीति विज्ञान में एम.ए. (यूजीसी नेट)। म.प्र. सरकार में स्वच्छता निरीक्षक के रूप में चयनित।",
    image: "/images/faculty/dharmendra-choudhary.png",
  },
  {
    name: "वरुण सक्सेना",
    title: "Faculty (Sociology, Law & Constitution)",
    desc: "UPSC और MPPSC के लिए 10 वर्षों का अध्यापन। यूपीएससी साक्षात्कार में शामिल, 5 बार एसएससी सीजीएल लिखित परीक्षा उत्तीर्ण। म.प्र. उच्च न्यायालय में अभ्यास करने वाले वकील। बी.ई., एलएल.बी., एलएल.एम.।",
    image: "/images/faculty/varun-saxena.png",
  },
];

const successStories = [
  {
    name: "Shruti Sharma",
    rank: "Rank 1, UPSC CSE 2023",
    quote: "आकार IAS की ऑफलाइन कक्षाओं ने मेरी तैयारी को एक नई दिशा दी। यहाँ के मेंटरशिप प्रोग्राम ने मुझे मेरी कमियों को सुधारने में बहुत मदद की।",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEeWk4yJM_vPqEIFmceFKptbpcr09zQV-SyxV6qJ1tCc4WffhgAVdhMNovFiE_4CLnm8GnPKgdjj0EXB6udVtgjla0UTCkthy2tAJQXjypu6hr0wHi9dN9w5bPubb0vMKI7DsM8w23UGUcZoykkq5fir2tOfYOrQJrYZhN24rbHhiBszV1HpcTRRmGjq9T_eQDup_WZH6-FlcBZal0NRcf_W8Mtt52eNV1vUC0wjx1Dn2GVD5mG_e8RUNZLHxsVVdsqSbZvqOko4E",
  },
  {
    name: "Abhishek Gupta",
    rank: "Rank 4, MPPSC 2022",
    quote: "नियमित टेस्ट और क्लास नोट्स परीक्षा के लिए पर्याप्त थे। केंद्र का समर्पित वातावरण आपको कड़ी मेहनत करने के लिए प्रेरित करता है।",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTTk-8Y8xDXvO3egZvcBKF33y_sEl0JBoI-4ddwXFo2BnVAkJtvkppaWDhdbQ0e93VlfI4-sfZoifFuKQ9MQms6bu4Q1_a3xfJfoUnEy9vqzG3IM1Khy8eEKrUSxoIqQcBMMT9WqFPFy4ANKwzlDrkKtQbLIp1S00-0GxlDiKEerUvtZa0F-AXbagtsqHfZY0MKW-I-Z3L6J60IJbZ2JpBSMIo587N649uuvE2MsRtkQKK5LNgtn5G-oTKkY1Mfb-6v8n2FanDxzg",
  },
  {
    name: "Aditya Pratap Singh",
    rank: "AIR 42, UPSC 2023",
    quote: "आकार IAS मेन्स उत्तर लेखन श्रृंखला ने मेरे चयन में महत्वपूर्ण भूमिका निभाई। व्यक्तिगत समर्थन और मार्गदर्शन बस बेजोड़ है।",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwG5aUiOlN_IQaA_8AzXmudp0yFwrBkJyN1knhfZswK6_ulwMZKzo8-cPSwq1myWJ2Gzlc9D9_uKmmtOqtyLDp_mNVhtP1P_iba3QZJ_WcwuEJnWHlIIbPZW1J0J6uilNtKK8w-pCtIi6wB57SEAXJ9sYzYs2oRqPh-jzuEDjFaVrkTJm65pmsciQsm-YJm4tVU74ItvUqK-7EpZXQ_GOHucHufltQGb3NeiCfR6-fwQq8qfkJ5L3cUlINXmPD3oFEyAMMH5vvXPs",
  },
  {
    name: "Priya Sharma",
    rank: "Rank 08, UPPSC 2022",
    quote: "It is hard to find a better study atmosphere and faculty team than here in Indore. The study notes are extremely precise and updated.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB092r7zMOQ2Ktz6xbKkgg4U0AzFN9wnWHPuXf0ELDL0v3VyECbLqV2tw3bWJvpov14lbKyXHzrDvjM22hnWBiMIiJssynmNCzaAVIE7KjKXcvUqC67gTCTTzqWZuna5o5Thm4JKQP7xa1jT_7ABAEaecpK4tSBiyEbIeh-PVCk4wK0k4R94v9WnL5Mt62XhINtEjOqGhE72SQrGbdjSTL2UJ4xYwzJkYN3FpNoN9lot7vDsIaO5qFpyylihoUkdP24pKpXxrQhCXs",
  },
];

interface BatchDescriptionProps {
  description: string;
  seeMoreLabel?: string;
  seeLessLabel?: string;
}

function BatchDescription({
  description,
  seeMoreLabel = "See More",
  seeLessLabel = "See Less",
}: BatchDescriptionProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (!description) return null;

  const lines = description.split("\n");
  const hasMore = description.includes("\n") || description.length > 100;

  // Helper to remove outer markdown formatting asterisks (e.g. *text* -> text)
  const cleanMarkdownText = (str: string) => {
    return str.replace(/^\*+(.*?)\*+$/, "$1").trim();
  };

  const renderFormattedDescription = () => {
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let isListSection = false;

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${idx}`} className="list-disc pl-5 space-y-1 my-1.5 text-sm text-muted-foreground font-devanagari">
              {currentList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
          currentList = [];
        }
        return;
      }

      // Check if line is a header like "हमारी विशेषताएँ" or "Features"
      const isHeader =
        trimmed.includes("विशेषताएँ") ||
        trimmed.includes("विशेषता") ||
        trimmed.toLowerCase().includes("features") ||
        trimmed.toLowerCase().includes("specialities") ||
        trimmed.endsWith(":");

      if (isHeader) {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${idx}`} className="list-disc pl-5 space-y-1 my-1.5 text-sm text-muted-foreground font-devanagari">
              {currentList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
          currentList = [];
        }
        elements.push(
          <p key={`header-${idx}`} className="font-bold text-foreground mt-3 mb-1 text-sm font-devanagari">
            {cleanMarkdownText(trimmed)}
          </p>
        );
        isListSection = true;
        return;
      }

      // Check if line starts with a list marker (e.g. •, -, *, +)
      const listMarkerRegex = /^([•\-\*\+\s]+|\d+\.\s*)/;
      const markerMatch = trimmed.match(listMarkerRegex);

      if (markerMatch) {
        const content = trimmed.substring(markerMatch[0].length).trim();
        currentList.push(cleanMarkdownText(content));
      } else if (isListSection) {
        // If we are in the list section (after a heading), treat non-empty lines as list items
        currentList.push(cleanMarkdownText(trimmed));
      } else {
        // Regular paragraph
        elements.push(
          <p key={`p-${idx}`} className="text-sm text-muted-foreground mb-1 leading-relaxed font-devanagari">
            {cleanMarkdownText(trimmed)}
          </p>
        );
      }
    });

    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-end`} className="list-disc pl-5 space-y-1 my-1.5 text-sm text-muted-foreground font-devanagari">
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }

    return elements;
  };

  if (!isExpanded) {
    // Replace newlines with spaces for a clean inline preview and clean markdown
    const inlineText = lines
      .map(l => cleanMarkdownText(l.trim()))
      .filter(Boolean)
      .join(" ");

    return (
      <div className="mb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-devanagari">
          {inlineText}
        </p>
        {hasMore && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="text-xs font-semibold text-primary hover:underline mt-1 focus:outline-none cursor-pointer"
          >
            {seeMoreLabel}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mb-4 transition-all duration-300">
      <div className="space-y-1">
        {renderFormattedDescription()}
      </div>
      <button
        type="button"
        onClick={() => setIsExpanded(false)}
        className="text-xs font-semibold text-primary hover:underline mt-2 focus:outline-none cursor-pointer"
      >
        {seeLessLabel}
      </button>
    </div>
  );
}

interface OfflineCoursesClientProps {
  faculties?: import("@/lib/content/types").Faculty[];
  offlineBatches?: import("@/lib/content/types").OfflineBatch[];
  brochureUrl?: string;
}


export function OfflineCoursesClient({ faculties, offlineBatches, brochureUrl }: OfflineCoursesClientProps) {
  // States for Enquiry Modal
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = React.useState(false);
  const [selectedBatchTitle, setSelectedBatchTitle] = React.useState("");
  const [enquiryName, setEnquiryName] = React.useState("");
  const [enquiryPhone, setEnquiryPhone] = React.useState("");
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = React.useState(false);
  const [enquiryStatus, setEnquiryStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [enquiryError, setEnquiryError] = React.useState("");

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEnquiry(true);
    setEnquiryStatus("idle");
    setEnquiryError("");

    try {
      const res = await submitOfflineEnquiry({
        name: enquiryName,
        phone: enquiryPhone,
        batchTitle: selectedBatchTitle,
        locale: "hi",
      });

      if (res.success) {
        setEnquiryStatus("success");
        setEnquiryName("");
        setEnquiryPhone("");
        // Auto close after 2 seconds
        setTimeout(() => {
          setIsEnquiryModalOpen(false);
          setEnquiryStatus("idle");
        }, 2000);
      } else {
        setEnquiryStatus("error");
        setEnquiryError(res.message || "Failed to submit enquiry.");
      }
    } catch (err: any) {
      setEnquiryStatus("error");
      setEnquiryError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmittingEnquiry(false);
    }
  };

  const openEnquiryModal = (batchTitle: string) => {
    setSelectedBatchTitle(batchTitle);
    setEnquiryName("");
    setEnquiryPhone("");
    setEnquiryStatus("idle");
    setEnquiryError("");
    setIsEnquiryModalOpen(true);
  };

  const displayHindiMentors = faculties && faculties.filter(f => f.medium === "hindi").length > 0
    ? faculties.filter(f => f.medium === "hindi").map(f => ({
        name: f.nameHi || f.nameEn,
        title: f.titleHi || f.titleEn,
        desc: f.descHi || f.descEn,
        image: f.image
      }))
    : facultiesHindi;

  const displayEnglishMentors = faculties && faculties.filter(f => f.medium === "english").length > 0
    ? faculties.filter(f => f.medium === "english").map(f => ({
        name: f.nameHi || f.nameEn,
        title: f.titleHi || f.titleEn,
        desc: f.descHi || f.descEn,
        image: f.image
      }))
    : facultiesEnglish;

  const dynamicBatches = React.useMemo(() => {
    if (offlineBatches && offlineBatches.length > 0) {
      const indoreBatches = offlineBatches.filter(b => b.center === "indore");
      if (indoreBatches.length > 0) {
        return indoreBatches.map(b => ({
          title: b.titleHi || b.titleEn,
          startDate: b.startDateHi || b.startDateEn,
          time: b.timeHi || b.timeEn,
          medium: b.medium === "bilingual"
            ? "हिंदी / अंग्रेजी (Bilingual)"
            : b.medium === "hindi"
              ? "हिंदी माध्यम"
              : "अंग्रेजी माध्यम",
          badge: b.badgeHi || b.badgeEn,
          seatsFillPercent: b.seatsFillPercent || 0,
          description: b.descHi || b.descEn || "",
          locationName: b.locationNameHi || b.locationNameEn || "Rajiv Gandhi Circle Campus",
          isNew: b.isNew || false,
        }));
      }
    }
    // Fallback to hardcoded batches
    return centersData.indore.batches;
  }, [offlineBatches]);

  const selectedCenter = {
    ...centersData.indore,
    batches: dynamicBatches,
  };

  return (
    <div className="space-y-16 pb-24">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950 text-white border-b border-white/10">
        {/* Ambient light glows & subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <Container size="wide" className="relative py-10 sm:py-16 lg:py-20">
          <div className="mb-6">
            <Breadcrumb items={[{ name: "ऑफलाइन कोर्सेज" }]} />
          </div>

          <AnimatedSection variant="scale-in" duration={0.8} className="mx-auto max-w-4xl text-center space-y-5">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-1 text-xs font-extrabold text-emerald-400 uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" /> प्रीमियम ऑफलाइन कोचिंग
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-bold text-white/90 uppercase tracking-wider backdrop-blur-md">
                📍 इंदौर एवं प्रयागराज केंद्र
              </span>
            </div>

            <h1 className="text-balance text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15] font-devanagari">
              ऑफलाइन कक्षाएँ एवं क्लासरूम प्रोग्राम
            </h1>

            <p className="mt-4 text-pretty text-sm sm:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed font-devanagari">
              इंदौर में अनुभवी शिक्षकों, आधुनिक क्लासरूम, अद्यतन अध्ययन सामग्री, नियमित टेस्ट एवं व्यक्तिगत मार्गदर्शन के साथ MPPSC, UPSC एवं अन्य प्रतियोगी परीक्षाओं की उत्कृष्ट तैयारी।
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild className="rounded-full bg-primary hover:bg-primary/95 text-white font-extrabold shadow-lg shadow-primary/20">
                <a href="#centers" className="gap-2">
                  प्रवेश प्रारंभ (Enroll Now) <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              {brochureUrl ? (
                <Button variant="outline" size="lg" className="rounded-full border-white/20 text-white bg-white/5 hover:bg-white/15 hover:text-white font-bold gap-2 backdrop-blur-md" asChild>
                  <TrackedDownloadLink
                    input={{
                      slug: "offline-brochure",
                      title: "Offline Classroom Program Brochure",
                      kind: "brochure",
                      url: brochureUrl,
                      locale: "hi",
                    }}
                  >
                    <Download className="h-4 w-4" /> ब्रोशर डाउनलोड करें
                  </TrackedDownloadLink>
                </Button>
              ) : null}

              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 hover:text-emerald-300 font-bold gap-2 backdrop-blur-md"
                asChild
              >
                <a href="https://wa.me/919425055050?text=Hello%20Aakar%20IAS,%20I%20want%20information%20about%20offline%20batches" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-4 w-4 text-emerald-400" /> WhatsApp सलाह लें
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ─── Center Selector Section ────────────────────────────── */}
      <section id="centers" className="scroll-mt-24">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-devanagari">
              Our Offline Study Center
            </h2>
            <p className="mt-3 text-muted-foreground">
              Visit our campus or get in touch to know more about our upcoming batches.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left: Batches Grid */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b border-border/60 pb-4">
                <h3 className="text-lg sm:text-xl font-bold text-primary flex items-start sm:items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shrink-0 mt-1.5 sm:mt-0" />
                  <span>New & Upcoming Offline Batches ({selectedCenter.name})</span>
                </h3>
                <span className="self-start sm:self-auto inline-flex items-center px-2.5 py-1 rounded-md bg-muted/60 border border-border/50 text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                  Session 2026 - 2027
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {selectedCenter.batches.map((batch, index) => (
                  <Card key={index} className="relative overflow-hidden border border-border/70 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group rounded-2xl bg-card">
                    {/* Top Progress Bar */}
                    {batch.seatsFillPercent ? (
                      <div className="absolute top-0 left-0 w-full h-[4px] bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary via-emerald-500 to-primary transition-all duration-500 rounded-r-full"
                          style={{ width: `${batch.seatsFillPercent}%` }}
                        />
                      </div>
                    ) : null}
                    
                    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {batch.isNew && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-600 text-white tracking-wider animate-pulse shadow-sm">
                              🔥 NEW BATCH
                            </span>
                          )}
                          {batch.badge && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-primary/10 text-primary border border-primary/20 tracking-wider">
                              ✨ {batch.badge}
                            </span>
                          )}
                        </div>
                        {batch.seatsFillPercent ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                            ⚡ {batch.seatsFillPercent}% Seats Filled
                          </span>
                        ) : null}
                      </div>

                      <h4 className="text-lg sm:text-xl font-black text-foreground group-hover:text-primary transition-colors font-devanagari leading-snug">
                        {batch.title}
                      </h4>

                      <BatchDescription 
                        description={batch.description} 
                        seeMoreLabel="और देखें" 
                        seeLessLabel="कम दिखाएं" 
                      />

                      <div className="space-y-2 border-t border-border/50 pt-3 text-xs sm:text-sm text-muted-foreground font-devanagari">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Calendar className="h-3.5 w-3.5" />
                          </div>
                          <span>प्रारंभ (Start): <strong className="text-foreground font-semibold">{batch.startDate}</strong></span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Clock className="h-3.5 w-3.5" />
                          </div>
                          <span>समय (Timing): <strong className="text-foreground font-semibold">{batch.time}</strong></span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <GraduationCap className="h-3.5 w-3.5" />
                          </div>
                          <span>माध्यम (Medium): <strong className="text-foreground font-semibold">{batch.medium}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 bg-muted/40 border-t border-border/50 flex items-center justify-between gap-3">
                      <span className="text-[11px] sm:text-xs text-muted-foreground flex items-center gap-1 font-medium truncate">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="truncate">{batch.locationName}</span>
                      </span>
                      <Button 
                        size="sm"
                        className="rounded-full bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-md shadow-primary/20 shrink-0 gap-1.5 px-4"
                        onClick={() => openEnquiryModal(batch.title)}
                      >
                        पूछताछ करें <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right: Center Contact Info & Map */}
            <div className="lg:col-span-4 bg-muted/30 border border-border/80 rounded-2xl p-6 lg:sticky lg:top-24 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Study Center
                </span>
                <h3 className="text-2xl font-bold text-foreground">
                  {selectedCenter.fullName}
                </h3>
              </div>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-foreground/90 font-medium leading-relaxed">
                    {selectedCenter.address}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-semibold text-foreground">{selectedCenter.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary shrink-0" />
                  <span>{selectedCenter.schedule}</span>
                </div>
              </div>

              {/* Live Interactive Map */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border shadow-sm">
                <iframe
                  src={siteConfig.contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Aakar IAS Indore Center Map Location"
                  className="w-full h-full absolute inset-0"
                />
              </div>

              <Button asChild className="w-full font-bold bg-primary hover:bg-primary/90 text-white gap-2">
                <a href={selectedCenter.directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Map className="h-4 w-4" /> दिशा-निर्देश प्राप्त करें
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Why Offline Section (Features) ────────────────────────── */}
      <section className="bg-muted/20 py-10 sm:py-16">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl font-devanagari">
              आकार आईएएस ऑफलाइन ही क्यों?
            </h2>
            <p className="mt-2 text-xs sm:text-base text-muted-foreground">
              परंपरागत उत्कृष्ट शिक्षण और आधुनिक तकनीकी सुविधाओं का बेजोड़ संगम।
            </p>
          </div>

          <div className="grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-4">
            {features.map((feat, index) => (
              <Card key={index} className="p-4 sm:p-6 border border-border/60 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start justify-between">
                <div>
                  <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                    <feat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h4 className="text-sm sm:text-lg font-bold text-foreground mb-1 sm:mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Faculty Members (Hindi Medium) ─────────────────────────── */}
      <section className="py-10 sm:py-16">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl font-devanagari">
              हमारे वरिष्ठ मार्गदर्शक (Hindi Medium)
            </h2>
            <p className="mt-2 text-xs sm:text-base text-muted-foreground">
              सिविल सेवा परीक्षा के विशेषज्ञ शिक्षकों की टीम, जो आपके सपनों को हकीकत में बदलने में सक्षम है।
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-5">
            {displayHindiMentors.map((fac, index) => (
              <Link key={index} href="/faculty" className="block group">
                <Card className="overflow-hidden border border-border/80 bg-card hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 p-2.5 sm:p-4 text-center flex flex-col items-center justify-between h-full cursor-pointer">
                  <div className="w-full flex flex-col items-center">
                    <div className="relative h-16 w-16 xs:h-20 xs:w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden shrink-0 border-2 sm:border-4 border-primary/20 bg-muted mb-2 group-hover:scale-105 group-hover:border-primary transition-all duration-300">
                      {fac.image ? (
                        <Image
                          src={fac.image}
                          alt={fac.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                          <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-foreground group-hover:text-primary transition-colors line-clamp-1 font-devanagari">
                      {fac.name}
                    </h3>
                    <p className="text-[9px] sm:text-xs font-bold text-primary tracking-wide uppercase line-clamp-1 mt-0.5">
                      {fac.title}
                    </p>
                    {fac.desc && (
                      <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2 pt-1 font-devanagari hidden sm:block">
                        {fac.desc}
                      </p>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Faculty Members (English Medium) ───────────────────────── */}
      <section className="bg-muted/10 py-10 sm:py-16 border-t border-b border-border/40">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl font-devanagari">
              हमारे वरिष्ठ मार्गदर्शक (English Medium)
            </h2>
            <p className="mt-2 text-xs sm:text-base text-muted-foreground">
              सिविल सेवा परीक्षा के विशेषज्ञ शिक्षकों की टीम, जो आपके सपनों को हकीकत में बदलने में सक्षम है।
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-5">
            {displayEnglishMentors.map((fac, index) => (
              <Link key={index} href="/faculty" className="block group">
                <Card className="overflow-hidden border border-border/80 bg-card hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 p-2.5 sm:p-4 text-center flex flex-col items-center justify-between h-full cursor-pointer">
                  <div className="w-full flex flex-col items-center">
                    <div className="relative h-16 w-16 xs:h-20 xs:w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden shrink-0 border-2 sm:border-4 border-primary/20 bg-muted mb-2 group-hover:scale-105 group-hover:border-primary transition-all duration-300">
                      {fac.image ? (
                        <Image
                          src={fac.image}
                          alt={fac.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                          <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-foreground group-hover:text-primary transition-colors line-clamp-1 font-devanagari">
                      {fac.name}
                    </h3>
                    <p className="text-[9px] sm:text-xs font-bold text-primary tracking-wide uppercase line-clamp-1 mt-0.5">
                      {fac.title}
                    </p>
                    {fac.desc && (
                      <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2 pt-1 font-devanagari hidden sm:block">
                        {fac.desc}
                      </p>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── सफलता की कहानियां (Success Stories) ────────────────────────────────────── */}
      <section className="bg-primary/5 py-16">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              टॉपरों की पसंद
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-devanagari mt-1">
              सफलता की कहानियां (Success Stories)
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {successStories.map((story, index) => (
              <Card key={index} className="p-8 border border-border bg-card relative overflow-hidden shadow-soft flex flex-col sm:flex-row gap-6 items-center sm:items-start group">
                <div className="relative h-20 w-20 rounded-full overflow-hidden shrink-0 border-4 border-primary/20">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-lg font-bold text-foreground">{story.name}</h4>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      {story.rank}
                    </span>
                  </div>
                  <p className="text-sm italic text-muted-foreground leading-relaxed relative z-10">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>
                {/* Large Decorative Quote mark */}
                <span className="absolute right-4 bottom-[-10px] text-8xl font-serif text-primary/5 select-none pointer-events-none">
                  &ldquo;
                </span>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────────────── */}
      <section>
        <Container size="wide">
          <div className="relative rounded-3xl overflow-hidden bg-primary text-white p-8 md:p-16 text-center shadow-soft-lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand-accent)_0%,_transparent_60%)] opacity-10" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                New Session Starting: Enroll Today!
              </h2>
              <p className="text-white/80 text-base md:text-lg">
                Secure your seat in the new batches and get free personal counselling from our experts.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/95 font-bold shadow-lg gap-2">
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}>
                    <Phone className="h-4 w-4" /> Call Now
                  </a>
                </Button>
                <Button asChild size="lg" className="rounded-full bg-[#25D366] text-white hover:bg-[#25D366]/95 font-bold shadow-lg gap-2 border-none">
                  <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-4 w-4 fill-white" /> WhatsApp Help
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Enquiry Modal ────────────────────────────────────────── */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/80 px-6 py-4 bg-muted/20">
              <h3 className="text-lg font-bold text-foreground font-devanagari">
                ऑफलाइन बैच पूछताछ (Enquiry Now)
              </h3>
              <button
                onClick={() => setIsEnquiryModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {enquiryStatus === "success" ? (
                <div className="flex flex-col items-center justify-center py-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center animate-pulse">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-base font-bold text-foreground font-devanagari">
                    पूछताछ सफलतापूर्वक दर्ज की गई!
                  </h4>
                  <p className="text-sm text-muted-foreground font-devanagari">
                    हमारा काउंसलर जल्द ही आपसे संपर्क करेगा।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  {enquiryStatus === "error" && (
                    <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold font-sans">
                      {enquiryError}
                    </div>
                  )}

                  {/* Pre-filled Batch */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 font-sans">
                      चयनित बैच / Selected Batch
                    </label>
                    <input
                      type="text"
                      value={selectedBatchTitle}
                      disabled
                      className="w-full h-10 px-3 bg-muted border border-border/80 rounded-lg text-xs font-semibold text-foreground/80 cursor-not-allowed font-sans select-none"
                    />
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 font-sans">
                      पूरा नाम / Full Name <span className="text-primary font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      placeholder="जैसे: राहुल शर्मा"
                      className="w-full h-10 px-3 bg-background border border-border hover:border-border/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition font-sans"
                    />
                  </div>

                  {/* Mobile Input */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 font-sans">
                      मोबाइल नंबर / Mobile Number <span className="text-primary font-bold">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-sm font-semibold text-muted-foreground select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="10 अंकों का नंबर"
                        className="w-full h-10 pl-11 pr-3 bg-background border border-border hover:border-border/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition font-sans font-semibold tracking-wider"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmittingEnquiry}
                    className="w-full h-10 bg-primary hover:bg-primary/95 text-white font-bold rounded-lg transition-all duration-200 mt-2 flex items-center justify-center gap-2"
                  >
                    {isSubmittingEnquiry ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        भेजा जा रहा है...
                      </>
                    ) : (
                      "पूछताछ भेजें / Submit Inquiry"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
