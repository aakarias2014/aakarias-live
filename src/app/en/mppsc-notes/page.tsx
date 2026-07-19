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
  title: "Aakar IAS MPPSC Notes PDF (Prelims & Mains) — Hindi & English Medium",
  description: "Download premium Aakar IAS MPPSC study notes in Hindi & English. Get unit-wise syllabus coverage, previous year papers, and free sample PDFs.",
  path: "/en/mppsc-notes",
});

function buildMetadata({ title, description, path }: { title: string; description: string; path: string }) {
  return {
    title: `${title} | Aakar IAS`,
    description,
    alternates: {
      canonical: `${siteConfig.url}${path}`,
      languages: {
        "hi-IN": `${siteConfig.url}${path.replace(/^\/en/, "")}`,
        "en-IN": `${siteConfig.url}${path}`,
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

export default function EnglishMppscNotesPage() {
  const pageUrl = `${siteConfig.url}/en/mppsc-notes`;
  const breadcrumbData = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "MPPSC Notes", url: pageUrl },
  ]);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Aakar IAS MPPSC Complete Study Notes Package (Hindi & English Medium)",
    "image": `${siteConfig.url}/logo.png`,
    "description": "Premium printed and PDF study materials for MPPSC Prelims & Mains, designed strictly according to the latest syllabus. Includes unit-wise booklets and model answer notebooks.",
    "brand": {
      "@type": "Brand",
      "name": "Aakar IAS"
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
      title: "MPPSC Prelims Complete Notes (All 10 Units)",
      desc: "Exhaustive coverage of the updated syllabus, including Unit 10 (Tribes of Madhya Pradesh) and state-special GK.",
      medium: "Available in Hindi & English separately",
      price: "₹1,499",
      wasPrice: "₹2,500",
      features: [
        "Updated according to the latest MPPSC syllabus blueprint",
        "Includes mind maps, tables, and charts for quick revision",
        "Unit-wise practice question sets included at the end of each booklet",
        "Free monthly current affairs supplement"
      ],
      sampleText: "Download Sample (Prelims Unit 10)",
      sampleMsg: "Hello Aakar IAS, I want to download a free sample PDF of MPPSC Prelims Notes (Unit 10)."
    },
    {
      title: "MPPSC Mains Complete Notes (Papers I - VI)",
      desc: "In-depth conceptual analysis with step-by-step syllabus mapping. Includes specialized answer writing templates.",
      medium: "Available in Hindi & English separately",
      price: "₹3,999",
      wasPrice: "₹6,000",
      features: [
        "Comprehensive coverage of History, Geography, Polity, Economy, Science & Ethics",
        "Model answers, diagram templates, and schematic representations",
        "Includes dedicated sections on Hindi General Grammar and Essay Writing templates",
        "Curated by expert faculty and topper-recommended"
      ],
      sampleText: "Download Sample (Mains Paper II)",
      sampleMsg: "Hello Aakar IAS, I want to download a free sample PDF of MPPSC Mains Notes (Paper II)."
    },
    {
      title: "Integrated Foundation Notes Set (Prelims + Mains)",
      desc: "Our flagship comprehensive package. Equips you with both conceptual clarity and factual knowledge for a top rank.",
      medium: "Available in Hindi & English separately",
      price: "₹4,999",
      wasPrice: "₹8,000",
      features: [
        "Includes all 10 Prelims booklets + all Mains papers notes booklets",
        "Free standard physical delivery across India",
        "Access to digital copy updates on the Aakar IAS Mobile App for 1 year",
        "Complimentary MPPSC Prelims Test Series subscription"
      ],
      sampleText: "Request Integrated Sample Notes",
      sampleMsg: "Hello Aakar IAS, I want to request a free sample pack of MPPSC Integrated Notes."
    }
  ];

  const faqs = [
    {
      q: "Does Aakar IAS provide study materials for MPPSC?",
      a: "Yes, Aakar IAS provides comprehensive study materials for MPPSC (Prelims and Mains) in both Hindi and English mediums. These notes are curated by our expert faculty and align strictly with the latest syllabus updates."
    },
    {
      q: "What is the price of Aakar IAS MPPSC mains notes?",
      a: "The complete set of MPPSC Mains Notes (Papers I to VI) is priced at ₹3,999. If you opt for the Integrated Prelims + Mains Foundation package, it costs ₹4,999 and includes free physical delivery across India."
    },
    {
      q: "How can I download MPPSC mains notes PDF in Hindi?",
      a: "You can download free sample PDFs of our MPPSC notes directly by clicking the download sample buttons on this page. This initiates a direct WhatsApp link to get the PDF copy on your phone. You can also access full digital editions on the Aakar IAS mobile app."
    },
    {
      q: "Are these notes updated as per the latest syllabus?",
      a: "Yes, all our study notes are 100% updated in accordance with the latest MPPSC syllabus parameters, including detailed unit-wise extensions such as the Tribes of Madhya Pradesh (Unit 10) and updated economic statistics."
    }
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <section className="border-b border-border bg-muted/20 py-4">
        <Container size="wide">
          <Breadcrumb items={[{ name: "MPPSC Notes", href: "/en/mppsc-notes" }]} />
        </Container>
      </section>

      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--primary-light),transparent_50%)] opacity-20" />
        <Container size="wide" className="relative space-y-8">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> 100% Updated Study Material
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Aakar IAS MPPSC Notes PDF <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Prelims & Mains Packages</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Equip yourself with Indore's most recommended MPPSC study materials. Written in clean, candidate-friendly language, our notes map every unit of the syllabus to help you maximize your score.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="rounded-xl px-8 py-6 font-bold shadow-lg">
                <a 
                  href={`https://wa.me/919713300123?text=${encodeURIComponent("Hello Aakar IAS, I want to inquire about the complete MPPSC study notes package.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Notes Packages <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl px-8 py-6 font-bold border-border/80 hover:bg-muted/30">
                <a 
                  href="#packages"
                >
                  Explore Free Samples
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Badges */}
      <section className="py-6 border-y border-border bg-muted/10">
        <Container size="wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center justify-center p-4">
              <CheckCircle className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-foreground text-sm">Strictly Syllabus Mapped</h3>
              <p className="text-xs text-muted-foreground mt-1">Every unit covered point-by-point</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <Star className="h-8 w-8 text-amber-500 mb-2" />
              <h3 className="font-bold text-foreground text-sm">Rating 4.9/5 Stars</h3>
              <p className="text-xs text-muted-foreground mt-1">Trusted by 5,000+ MPPSC aspirants</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-foreground text-sm">Hindi & English Separate</h3>
              <p className="text-xs text-muted-foreground mt-1">Translated precisely by subject experts</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <ShieldCheck className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-foreground text-sm">Fast Pan-India Delivery</h3>
              <p className="text-xs text-muted-foreground mt-1">Printed booklets shipped directly to you</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Notes Packages List */}
      <Section id="packages" className="bg-background" title="Our Premium Study Material Packages" description="Explore our catalog of printed booklets and PDF downloads designed to help you clear the MPPSC exams.">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {notesPackages.map((pkg, idx) => (
            <div 
              key={idx} 
              className="bg-card border border-border rounded-3xl p-6 shadow-soft flex flex-col justify-between hover:shadow-soft-lg transition-all hover:border-primary/20 relative overflow-hidden"
            >
              {idx === 2 && (
                <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-extrabold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wide">
                  Best Value
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
                    Save {Math.round((1 - parseInt(pkg.price.replace(/[^\d]/g, "")) / parseInt(pkg.wasPrice.replace(/[^\d]/g, ""))) * 100)}%
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
                    href={`https://wa.me/919713300123?text=${encodeURIComponent(`Hello Aakar IAS, I want to buy the "${pkg.title}" package.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Order Printed Books
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Comparison & Syllabus Mapping */}
      <Section className="bg-muted/20" title="MPPSC Mains Notes Index & Price Breakdown" description="Transparent pricing and comprehensive unit mapping for our printed study sets.">
        <Container size="narrow">
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-foreground font-semibold">
                  <th className="p-4">Notes Package Details</th>
                  <th className="p-4 text-center">Medium</th>
                  <th className="p-4 text-right">Offer Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr className="hover:bg-muted/10">
                  <td className="p-4">
                    <p className="font-bold text-foreground">Prelims Complete Set (Units 1 - 10)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Includes detailed booklets for MP History, Geography, and tribal policies.</p>
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-medium">Hindi / English</td>
                  <td className="p-4 text-right font-extrabold text-foreground">₹1,499</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4">
                    <p className="font-bold text-foreground">Mains Paper I: History & Geography</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Separate booklets for world history, ancient MP, and physical geography.</p>
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-medium">Hindi / English</td>
                  <td className="p-4 text-right font-extrabold text-foreground">₹850</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4">
                    <p className="font-bold text-foreground">Mains Paper II: Constitution, Governance & Polity</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Covers public administration, social issues, and governance modules.</p>
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-medium">Hindi / English</td>
                  <td className="p-4 text-right font-extrabold text-foreground">₹850</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4">
                    <p className="font-bold text-foreground">Mains Paper III: Economy & Sociology</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Detailed statistics of MP Economy, agricultural reforms, and rural sociology.</p>
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-medium">Hindi / English</td>
                  <td className="p-4 text-right font-extrabold text-foreground">₹850</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4">
                    <p className="font-bold text-foreground">Mains Paper IV: Science, Tech & Ethics</p>
                    <p className="text-xs text-muted-foreground mt-0.5">General science modules, environment, ethics core concepts, and case studies.</p>
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-medium">Hindi / English</td>
                  <td className="p-4 text-right font-extrabold text-foreground">₹950</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4">
                    <p className="font-bold text-foreground">Mains Paper V & VI: General Hindi & Essay</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Detailed Hindi grammar notes and solved model answer drafts.</p>
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-medium">Hindi Only</td>
                  <td className="p-4 text-right font-extrabold text-foreground">₹650</td>
                </tr>
                <tr className="bg-primary/5 font-semibold text-primary">
                  <td className="p-4">
                    <p className="font-extrabold">Integrated Foundation Package (Prelims + Mains Combined)</p>
                    <p className="text-xs text-primary/80 mt-0.5">Includes free home delivery across India + free Prelims mock tests.</p>
                  </td>
                  <td className="p-4 text-center">Hindi / English</td>
                  <td className="p-4 text-right font-extrabold text-lg">₹4,999</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* FAQ Accordion Section */}
      <Section className="bg-background" title="Frequently Asked Questions (FAQs)" description="Get instant answers regarding Aakar IAS MPPSC study material package, ordering process, and formats.">
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
                <div className="text-muted-foreground text-sm leading-relaxed mt-3 pt-3 border-t border-border/60 animate-in fade-in slide-in-from-top-2">
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
