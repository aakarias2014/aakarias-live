import type { Metadata } from "next";
import Link from "next/link";
import { 
  FileText, 
  Download, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  CheckCircle, 
  Check, 
  ChevronRight, 
  Info, 
  ShieldCheck, 
  Star 
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "आकार आईएएस MPPSC नोट्स PDF (प्रीलिम्स & मेन्स) — हिंदी & अंग्रेजी माध्यम",
  description: "आकार आईएएस (Aakar IAS) के प्रीमियम MPPSC स्टडी नोट्स हिंदी और अंग्रेजी में डाउनलोड करें। यूनिट-वार पाठ्यक्रम कवरेज, मुख्य परीक्षा उत्तर पुस्तिकाएं और मुफ्त पीडीएफ नमूने प्राप्त करें।",
  path: "/mppsc-notes",
});

function buildMetadata({ title, description, path }: { title: string; description: string; path: string }) {
  return {
    title: `${title} | Aakar IAS`,
    description,
    alternates: {
      canonical: `${siteConfig.url}${path}`,
      languages: {
        "hi-IN": `${siteConfig.url}${path}`,
        "en-IN": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: `${title} | Aakar IAS`,
      description,
      url: `${siteConfig.url}${path}`,
      type: "website",
    },
  };
}

export default function HindiMppscNotesPage() {
  const pageUrl = `${siteConfig.url}/mppsc-notes`;
  const breadcrumbData = breadcrumbJsonLd([
    { name: "होम", url: `${siteConfig.url}` },
    { name: "एमपीपीएससी नोट्स", url: pageUrl },
  ]);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "आकार आईएएस MPPSC कम्प्लीट स्टडी नोट्स पैकेज (हिंदी और अंग्रेजी माध्यम)",
    "image": `${siteConfig.url}/logo.png`,
    "description": "नवीनतम पाठ्यक्रम के अनुसार तैयार की गई MPPSC प्रीलिम्स और मेन्स की प्रिंटेड और पीडीएफ अध्ययन सामग्री। इसमें यूनिट-वार बुकलेट्स और मॉडल उत्तर पुस्तिकाएं शामिल हैं।",
    "brand": {
      "@type": "Brand",
      "name": "आकार आईएएस"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "342"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "4999",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "url": pageUrl
    }
  };

  const notesPackages = [
    {
      title: "MPPSC प्रीलिम्स सम्पूर्ण नोट्स (सभी 10 यूनिट्स)",
      desc: "अपडेटेड सिलेबस का विस्तृत कवरेज, जिसमें यूनिट 10 (मध्य प्रदेश की जनजातियां) और राज्य-विशेष सामान्य ज्ञान शामिल हैं।",
      medium: "हिंदी और अंग्रेजी माध्यम में अलग-अलग उपलब्ध",
      price: "₹1,499",
      wasPrice: "₹2,500",
      features: [
        "नवीनतम MPPSC सिलेबस ब्लूप्रिंट के अनुसार अपडेटेड",
        "त्वरित रिवीजन के लिए माइंड मैप्स, टेबल्स और चार्ट्स का उपयोग",
        "प्रत्येक बुकलेट के अंत में यूनिट-वार अभ्यास प्रश्न पत्र",
        "मुफ्त मासिक करेंट अफेयर्स सप्लीमेंट"
      ],
      sampleText: "सैंपल डाउनलोड करें (प्रीलिम्स यूनिट 10)",
      sampleMsg: "नमस्कार आकार आईएएस, मैं एमपीपीएससी प्रीलिम्स नोट्स (यूनिट 10) का फ्री सैंपल पीडीएफ डाउनलोड करना चाहता हूं।"
    },
    {
      title: "MPPSC मेन्स सम्पूर्ण नोट्स (पेपर्स I - VI)",
      desc: "स्टेप-बाय-स्टेप सिलेबस मैपिंग के साथ गहन वैचारिक विश्लेषण। इसमें विशेष उत्तर लेखन टेम्पलेट शामिल हैं।",
      medium: "हिंदी और अंग्रेजी माध्यम में अलग-अलग उपलब्ध",
      price: "₹3,999",
      wasPrice: "₹6,000",
      features: [
        "इतिहास, भूगोल, राजनीति, अर्थव्यवस्था, विज्ञान और नैतिकता का सम्पूर्ण कवरेज",
        "मॉडल उत्तर, आरेख टेम्पलेट्स और योजनाबद्ध निरूपण",
        "सामान्य हिंदी व्याकरण और निबंध लेखन टेम्पलेट्स के लिए समर्पित खंड",
        "विशेषज्ञ फैकल्टी द्वारा तैयार और टॉपर-अनुशंसित"
      ],
      sampleText: "सैंपल डाउनलोड करें (मेन्स पेपर II)",
      sampleMsg: "नमस्कार आकार आईएएस, मैं एमपीपीएससी मेन्स नोट्स (पेपर II) का फ्री सैंपल पीडीएफ डाउनलोड करना चाहता हूं।"
    },
    {
      title: "इंटीग्रेटेड फाउंडेशन नोट्स सेट (प्रीलिम्स + मेन्स)",
      desc: "हमारा प्रमुख व्यापक पैकेज। आपको शीर्ष रैंक के लिए वैचारिक स्पष्टता और तथ्यात्मक ज्ञान दोनों से लैस करता है।",
      medium: "हिंदी और अंग्रेजी माध्यम में अलग-अलग उपलब्ध",
      price: "₹4,999",
      wasPrice: "₹8,000",
      features: [
        "सभी 10 प्रीलिम्स बुकलेट्स + सभी मेन्स पेपर्स बुकलेट्स शामिल हैं",
        "पूरे भारत में मुफ्त होम डिलीवरी (Printed Booklets)",
        "1 वर्ष के लिए आकार आईएएस मोबाइल ऐप पर डिजिटल कॉपी अपडेट्स",
        "मानक एमपीपीएससी प्रीलिम्स टेस्ट सीरीज का मानार्थ सब्सक्रिप्शन"
      ],
      sampleText: "इंटीग्रेटेड सैंपल नोट्स का अनुरोध करें",
      sampleMsg: "नमस्कार आकार आईएएस, मैं एमपीपीएससी इंटीग्रेटेड नोट्स के फ्री सैंपल पैक का अनुरोध करना चाहता हूं।"
    }
  ];

  const faqs = [
    {
      q: "क्या आकर आईएएस अध्ययन सामग्री प्रदान करता है?",
      a: "हाँ, आकार आईएएस हिंदी और अंग्रेजी दोनों माध्यमों में एमपीपीएससी (प्रीलिम्स और मेन्स) के लिए व्यापक अध्ययन सामग्री प्रदान करता है। ये नोट्स हमारी विशेषज्ञ फैकल्टी द्वारा तैयार किए गए हैं और नवीनतम सिलेबस के अनुसार हैं।"
    },
    {
      q: "आकार आईएएस MPPSC कोचिंग और नोट्स की फीस क्या है?",
      a: "एमपीपीएससी मेन्स नोट्स (पेपर्स I से VI) का कम्प्लीट सेट ₹3,999 का है। यदि आप इंटीग्रेटेड प्रीलिम्स + मेन्स फाउंडेशन पैकेज चुनते हैं, तो इसकी कीमत ₹4,999 है, जिसमें पूरे भारत में मुफ्त फिजिकल बुकलेट्स डिलीवरी शामिल है।"
    },
    {
      q: "मैं हिंदी में एमपीपीएससी मुख्य परीक्षा के नोट्स पीडीएफ कैसे डाउनलोड कर सकता हूं?",
      a: "आप इस पेज पर दिए गए 'सैंपल डाउनलोड करें' बटन पर क्लिक करके सीधे सैंपल पीडीएफ प्राप्त कर सकते हैं। यह बटन आपके व्हाट्सएप पर सीधा लिंक एक्टिवेट कर देगा। आप आकार आईएएस मोबाइल ऐप पर भी पूरी डिजिटल बुकलेट्स पढ़ सकते हैं।"
    },
    {
      q: "क्या ये नोट्स नवीनतम 2026/2027 परीक्षा पैटर्न के अनुसार अपडेटेड हैं?",
      a: "हाँ, हमारी सभी अध्ययन सामग्री एमपीपीएससी के नवीनतम सिलेबस पैरामीटर के अनुसार 100% अपडेटेड है, जिसमें मध्य प्रदेश की जनजातियाँ (यूनिट 10) और नए आर्थिक आंकड़े शामिल हैं।"
    }
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <section className="border-b border-border bg-muted/20 py-4">
        <Container size="wide">
          <Breadcrumb items={[{ name: "एमपीपीएससी नोट्स", href: "/mppsc-notes" }]} />
        </Container>
      </section>

      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--primary-light),transparent_50%)] opacity-20" />
        <Container size="wide" className="relative space-y-8">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider font-devanagari">
              <Sparkles className="h-3.5 w-3.5" /> 100% अपडेटेड अध्ययन सामग्री
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight font-devanagari">
              आकार आईएएस MPPSC नोट्स PDF <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">प्रीलिम्स और मेन्स पैकेजेस</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-devanagari">
              इंदौर की सबसे अनुशंसित MPPSC अध्ययन सामग्री से तैयारी करें। स्वच्छ और परीक्षा-अनुकूल भाषा में लिखे गए ये नोट्स सिलेबस के हर हिस्से को कवर करते हैं ताकि आप बेहतर स्कोर कर सकें।
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="rounded-xl px-8 py-6 font-bold shadow-lg font-devanagari">
                <a 
                  href={`https://wa.me/919713300123?text=${encodeURIComponent("नमस्कार आकार आईएएस, मुझे एमपीपीएससी कम्प्लीट स्टडी नोट्स पैकेज की जानकारी चाहिए।")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  नोट्स पैकेज खरीदें <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl px-8 py-6 font-bold border-border/80 hover:bg-muted/30 font-devanagari">
                <a 
                  href="#packages"
                >
                  फ्री सैंपल देखें
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Badges */}
      <section className="py-6 border-y border-border bg-muted/10">
        <Container size="wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-devanagari">
            <div className="flex flex-col items-center justify-center p-4">
              <CheckCircle className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-foreground text-sm">सिलेबस के अनुसार</h3>
              <p className="text-xs text-muted-foreground mt-1">प्रत्येक टॉपिक बिन्दुवार कवर</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <Star className="h-8 w-8 text-amber-500 mb-2" />
              <h3 className="font-bold text-foreground text-sm">रेटिंग 4.9/5 स्टार्स</h3>
              <p className="text-xs text-muted-foreground mt-1">5,000+ अभ्यर्थियों द्वारा विश्वसनीय</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-foreground text-sm">हिंदी व अंग्रेजी माध्यम</h3>
              <p className="text-xs text-muted-foreground mt-1">विषय विशेषज्ञों द्वारा सटीक तैयार</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <ShieldCheck className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-foreground text-sm">फास्ट डिलीवरी सेवा</h3>
              <p className="text-xs text-muted-foreground mt-1">प्रिंटेड किताबें सीधे आपके पते पर</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Notes Packages List */}
      <Section id="packages" className="bg-background font-devanagari" title="हमारे प्रीमियम स्टडी मटेरियल पैकेजेस" description="एमपीपीएससी परीक्षा को क्रैक करने के लिए तैयार की गई हमारी मुद्रित पुस्तकों और पीडीएफ डाउनलोड के कैटलॉग का अन्वेषण करें।">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {notesPackages.map((pkg, idx) => (
            <div 
              key={idx} 
              className="bg-card border border-border rounded-3xl p-6 shadow-soft flex flex-col justify-between hover:shadow-soft-lg transition-all hover:border-primary/20 relative overflow-hidden"
            >
              {idx === 2 && (
                <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-extrabold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wide">
                  सर्वोत्तम मूल्य
                </div>
              )}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight">{pkg.title}</h3>
                  <span className="inline-block text-[11px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">
                    {pkg.medium}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{pkg.desc}</p>
                <div className="flex items-baseline gap-2 py-2 border-y border-border/40">
                  <span className="text-3xl font-extrabold text-foreground">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{pkg.wasPrice}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded ml-auto">
                    बचत {Math.round((1 - parseInt(pkg.price.replace(/[^\d]/g, "")) / parseInt(pkg.wasPrice.replace(/[^\d]/g, ""))) * 100)}%
                  </span>
                </div>
                <ul className="space-y-2.5 pt-2">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-normal">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 gap-3 pt-6 mt-6 border-t border-border/40">
                <Button asChild className="w-full rounded-xl py-5 font-bold shadow-soft">
                  <a 
                    href={`https://wa.me/919713300123?text=${encodeURIComponent(pkg.sampleMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" /> {pkg.sampleText}
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full rounded-xl py-5 font-semibold">
                  <a 
                    href={`https://wa.me/919713300123?text=${encodeURIComponent(`नमस्कार आकार आईएएस, मैं "${pkg.title}" पैकेज खरीदना चाहता हूं।`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    प्रिंटेड बुकलेट्स ऑर्डर करें
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Comparison & Syllabus Mapping */}
      <Section className="bg-muted/20 font-devanagari" title="MPPSC नोट्स सूची और मूल्य विवरण" description="हमारी मुद्रित अध्ययन सामग्री के लिए पारदर्शी मूल्य निर्धारण और संपूर्ण पाठ्यक्रम मैपिंग।">
        <Container size="narrow">
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-foreground font-semibold">
                  <th className="p-4">नोट्स पैकेज का विवरण</th>
                  <th className="p-4 text-center">माध्यम</th>
                  <th className="p-4 text-right">ऑफर मूल्य</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr className="hover:bg-muted/10">
                  <td className="p-4">
                    <p className="font-bold text-foreground">प्रीलिम्स कम्प्लीट सेट (यूनिट 1 - 10)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">इसमें एमपी इतिहास, भूगोल और आदिवासी नीतियों के विस्तृत बुकलेट्स शामिल हैं।</p>
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-medium">हिंदी / अंग्रेजी</td>
                  <td className="p-4 text-right font-extrabold text-foreground">₹1,499</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4">
                    <p className="font-bold text-foreground">मेन्स पेपर I: इतिहास एवं भूगोल</p>
                    <p className="text-xs text-muted-foreground mt-0.5">विश्व इतिहास, प्राचीन एमपी इतिहास, और भौतिक भूगोल के लिए अलग बुकलेट्स।</p>
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-medium">हिंदी / अंग्रेजी</td>
                  <td className="p-4 text-right font-extrabold text-foreground">₹850</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4">
                    <p className="font-bold text-foreground">मेन्स पेपर II: संविधान, शासन एवं राजनीति</p>
                    <p className="text-xs text-muted-foreground mt-0.5">लोक प्रशासन, सामाजिक मुद्दे और राजनीति मॉड्यूल को कवर करता है।</p>
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-medium">हिंदी / अंग्रेजी</td>
                  <td className="p-4 text-right font-extrabold text-foreground">₹850</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4">
                    <p className="font-bold text-foreground">मेन्स Paper III: अर्थव्यवस्था एवं समाजशास्त्र</p>
                    <p className="text-xs text-muted-foreground mt-0.5">एमपी की अर्थव्यवस्था, कृषि सुधार और ग्रामीण समाजशास्त्र का विस्तृत विवरण।</p>
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-medium">हिंदी / अंग्रेजी</td>
                  <td className="p-4 text-right font-extrabold text-foreground">₹850</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4">
                    <p className="font-bold text-foreground">मेन्स Paper IV: विज्ञान, तकनीक एवं दर्शन (नैतिकता)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">विज्ञान मॉड्यूल, पर्यावरण, नैतिकता कोर अवधारणाएं और केस स्टडीज।</p>
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-medium">हिंदी / अंग्रेजी</td>
                  <td className="p-4 text-right font-extrabold text-foreground">₹950</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4">
                    <p className="font-bold text-foreground">मेन्स Paper V & VI: सामान्य हिंदी एवं निबंध</p>
                    <p className="text-xs text-muted-foreground mt-0.5">सामान्य हिंदी व्याकरण के नियम और ड्राफ्ट निबंध की मॉडल उत्तर पुस्तिकायें।</p>
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-medium">केवल हिंदी</td>
                  <td className="p-4 text-right font-extrabold text-foreground">₹650</td>
                </tr>
                <tr className="bg-primary/5 font-semibold text-primary">
                  <td className="p-4">
                    <p className="font-extrabold">इंटीग्रेटेड फाउंडेशन पैकेज (प्रीलिम्स + मेन्स कम्प्लीट)</p>
                    <p className="text-xs text-primary/80 mt-0.5">पूरे भारत में मुफ्त होम डिलीवरी + मुफ्त प्रीलिम्स मॉक टेस्ट शामिल हैं।</p>
                  </td>
                  <td className="p-4 text-center">हिंदी / अंग्रेजी</td>
                  <td className="p-4 text-right font-extrabold text-lg">₹4,999</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* FAQ Accordion Section */}
      <Section className="bg-background font-devanagari" title="अक्सर पूछे जाने वाले प्रश्न (FAQs)" description="आकार आईएएस एमपीपीएससी अध्ययन सामग्री, ऑर्डर करने की प्रक्रिया और उपलब्ध प्रारूपों के बारे में तुरंत उत्तर प्राप्त करें।">
        <Container size="narrow">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details 
                key={i} 
                className="group bg-card border border-border rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex justify-between items-center list-none select-none font-bold text-foreground text-base">
                  <span className="group-hover:text-primary transition-colors pr-4">{faq.q}</span>
                  <span className="text-primary font-light text-2xl transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="text-muted-foreground text-sm leading-relaxed mt-3 pt-3 border-t border-border/60 animate-in fade-in slide-in-from-top-2 font-devanagari">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* Injected Schemas */}
      <JsonLd data={faqJsonLd(faqs.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbData} />
    </>
  );
}
