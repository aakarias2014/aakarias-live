import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, formatDate } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { ContactForm } from "@/components/layout/contact-form";
import { siteConfig } from "@/lib/site-config";
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, ExternalLink, ChevronRight, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getContentRepository } from "@/lib/content/content-repository";
import { ArticleAdRotator } from "@/components/article/article-ad-rotator";

export const metadata: Metadata = buildMetadata({
  title: "Contact Aakar IAS | Admission, Support & Enquiry",
  description: "Contact Aakar IAS for admissions, course information, technical support and general enquiries. Visit our Indore centre or connect via phone, WhatsApp and email.",
  path: "/contact",
  keywords: ["Contact Aakar IAS", "Aakar IAS admissions", "Aakar IAS contact number", "Aakar IAS address Indore", "MPPSC enquiry", "UPSC coaching contact"],
});

export default async function ContactPage() {
  const repo = await getContentRepository();
  const latestArticles = await repo.listArticles({
    locale: "hi",
    contentType: "currentAffairs",
    page: 1,
    pageSize: 3,
  }).catch(() => null);
  const ads = await repo.listAds("hi").catch(() => []);
  const currentAffairs = latestArticles?.items || [];

  const faqs = [
    {
      q: "नए बैच कब से शुरू हो रहे हैं?",
      a: "नए बैच हर महीने की 1 और 15 तारीख को शुरू होते हैं। आप वर्तमान बैच की स्थिति जानने के लिए हमारे कांटेक्ट नंबर पर कॉल कर सकते हैं।"
    },
    {
      q: "क्या ऑनलाइन और ऑफलाइन दोनों क्लासेस उपलब्ध हैं?",
      a: "हाँ, आकार आईएएस हाइब्रिड मॉडल प्रदान करता है। आप इंदौर सेंटर पर ऑफलाइन या हमारे मोबाइल ऐप के माध्यम से घर बैठे ऑनलाइन क्लास ले सकते हैं।"
    },
    {
      q: "स्टडी मटेरियल पीडीएफ में उपलब्ध है?",
      a: "प्रीमियम छात्रों को सभी रिसोर्सेज और क्लास नोट्स डिजिटल पीडीएफ फॉर्मेट में उपलब्ध कराए जाते हैं।"
    },
    {
      q: "आकार आईएएस MPPSC कोचिंग की फीस क्या है?",
      a: "आकार आईएएस MPPSC कोचिंग के लिए लचीली फीस संरचना प्रदान करता है। फीस कोर्स के अनुसार अलग-अलग होती है — प्रीलिम्स, मेन्स, प्री+मेन्स कम्बाइंड, फाउंडेशन बैच और टेस्ट सीरीज़ सभी की अलग-अलग कीमत है। नवीनतम फीस विवरण और किस्त योजना के लिए हमारे इंदौर सेंटर पर संपर्क करें。"
    },
    {
      q: "क्या आकर आईएएस अध्ययन सामग्री प्रदान करता है?",
      a: "हाँ, आकार आईएएस व्यापक अध्ययन सामग्री प्रदान करता है जिसमें प्रिंटेड नोट्स, डिजिटल PDF, करेंट अफेयर्स मैगजीन, पिछले वर्षों के प्रश्न पत्र और विषयवार पुस्तिकाएँ शामिल हैं। सभी सामग्री MPPSC और UPSC पाठ्यक्रम के अनुसार तैयार की जाती है।"
    }
  ];

  return (
    <>
      {/* Breadcrumb section */}
      <section className="border-b border-border bg-muted/20 py-4">
        <Container size="wide">
          <Breadcrumb items={[{ name: "संपर्क करें", href: "/contact" }]} />
        </Container>
      </section>

      <Section className="py-8 md:py-12">
        <Container size="wide">
          {/* Header section */}
          <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl tracking-tight">
              आकार IAS से संपर्क करें
            </h1>
            <p className="text-base text-muted-foreground">
              MPPSC, UPSC एवं अन्य प्रतियोगी परीक्षाओं के नए बैच, प्रवेश प्रक्रिया, टेस्ट सीरीज़ और मार्गदर्शन के लिए हमसे जुड़ें।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Content Area (8 Columns) */}
            <main className="lg:col-span-8 space-y-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Call card */}
                <a 
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="bg-card hover:bg-muted/10 border border-border p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all group flex flex-col justify-between"
                >
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">कॉल करें (Call Us)</h3>
                    <p className="text-primary font-bold text-base tracking-wider">{siteConfig.contact.phone}</p>
                    <p className="text-muted-foreground text-xs mt-1.5 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> सुबह 10:00 - शाम 07:00 बजे
                    </p>
                  </div>
                </a>

                {/* WhatsApp card */}
                <a 
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card hover:bg-muted/10 border border-border p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all group flex flex-col justify-between"
                >
                  <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">WhatsApp</h3>
                    <p className="text-[#25D366] font-bold text-base">चैट शुरू करें</p>
                    <p className="text-muted-foreground text-xs mt-1.5">त्वरित प्रतिक्रिया प्राप्त करें</p>
                  </div>
                </a>

                {/* Email card */}
                <a 
                  href={`mailto:${siteConfig.contact.email}`}
                  className="bg-card hover:bg-muted/10 border border-border p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all group flex flex-col justify-between"
                >
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">Email</h3>
                    <p className="text-secondary font-bold text-base truncate">{siteConfig.contact.email}</p>
                    <p className="text-muted-foreground text-xs mt-1.5">24 घंटे के भीतर सहायता</p>
                  </div>
                </a>

                {/* Telegram card */}
                <a 
                  href={siteConfig.links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card hover:bg-muted/10 border border-border p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all group flex flex-col justify-between"
                >
                  <div className="w-12 h-12 bg-[#0088cc]/10 text-[#0088cc] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0088cc] group-hover:text-white transition-colors">
                    <Send className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">Telegram</h3>
                    <p className="text-[#0088cc] font-bold text-base">@AakarIAS</p>
                    <p className="text-muted-foreground text-xs mt-1.5">फ्री स्टडी रिसोर्सेज</p>
                  </div>
                </a>

              </div>

              {/* Form Section */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-soft">
                <ContactForm locale="hi" />
              </div>

              {/* WhatsApp Premium CTA banner */}
              <div className="relative overflow-hidden rounded-2xl p-8 text-white bg-gradient-to-r from-primary to-[#0F172A] shadow-lg group">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 max-w-[450px]">
                    <h3 className="text-2xl font-extrabold font-display-hindi">तुरंत सहायता चाहिए?</h3>
                    <p className="text-white/80 text-sm">हमारे काउंसलर से सीधे व्हाट्सएप पर बात करें और अपने करियर के बारे में सही मार्गदर्शन प्राप्त करें।</p>
                  </div>
                  <a 
                    href={siteConfig.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-2 shrink-0"
                  >
                    <MessageSquare className="h-5 w-5 fill-current" />
                    WhatsApp पर जुड़ें
                  </a>
                </div>
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              </div>

              {/* Indore Center Address & Live Google Map */}
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                  हमारा केंद्र (Our Center)
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
                  <div className="md:col-span-5 p-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-border pb-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h3 className="font-extrabold text-foreground text-lg leading-tight">आकार आईएएस इंदौर (Indore Head Office)</h3>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex gap-2.5 items-start text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0 text-primary/70 mt-0.5" />
                          <p>{siteConfig.contact.addressHi}</p>
                        </div>
                        <div className="flex gap-2.5 items-start text-muted-foreground">
                          <Clock className="h-4 w-4 shrink-0 text-primary/70 mt-0.5" />
                          <p>सोम - शनि: सुबह 08:00 से रात 08:00 बजे तक | रविवार: अवकाश</p>
                        </div>
                        <div className="flex gap-2.5 items-start text-muted-foreground">
                          <Phone className="h-4 w-4 shrink-0 text-primary/70 mt-0.5" />
                          <p className="font-semibold text-foreground">{siteConfig.contact.phone}</p>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" asChild className="w-full rounded-xl gap-2 mt-auto">
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" /> गूगल मैप्स पर दिशा निर्देश
                      </a>
                    </Button>
                  </div>
                  
                  {/* Embedded Google Map */}
                  <div className="md:col-span-7 h-[300px] md:h-auto min-h-[300px] w-full border-t md:border-t-0 md:border-l border-border">
                    <iframe
                      src={siteConfig.contact.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="Aakar IAS Indore Center Map Location"
                      className="w-full h-full"
                    />
                  </div>
                </div>

              </div>

              {/* FAQ Accordion Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                  अक्सर पूछे जाने वाले प्रश्न
                </h2>
                
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <details 
                      key={i} 
                      className="group bg-card border border-border rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
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
              </div>

            </main>

            {/* Right Sidebar Area (4 Columns) */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Latest Current Affairs */}
              <div className="bg-card border border-border p-6 rounded-2xl shadow-soft space-y-4">
                <div className="flex items-center gap-2 text-primary border-b border-border pb-3">
                  <BookOpen className="h-5 w-5" />
                  <h3 className="font-extrabold text-foreground">नवीनतम करेंट अफेयर्स</h3>
                </div>
                
                <ul className="space-y-4">
                  {currentAffairs.map((ca) => (
                    <li key={ca.id} className="group cursor-pointer border-b border-border/40 last:border-0 pb-3 last:pb-0">
                      <span className="text-[10px] font-bold text-muted-foreground block mb-1">{formatDate(ca.date, "hi")}</span>
                      <Link href={ca.href} className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {ca.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" size="sm" asChild className="w-full rounded-xl">
                  <Link href="/current-affairs">सभी देखें</Link>
                </Button>
              </div>

              {/* Monthly PDF Card */}
              <Link 
                href="/monthly-pdf"
                className="bg-muted/30 hover:bg-muted/50 border border-border p-6 rounded-2xl shadow-soft group flex flex-col justify-between relative overflow-hidden block"
              >
                <div className="relative z-10 space-y-4">
                  <div>
                    <h3 className="font-extrabold text-foreground text-lg leading-tight">मासिक पत्रिका (PDF)</h3>
                    <p className="text-xs text-muted-foreground mt-1">करेंट अफेयर्स और एडिटोरियल का मिश्रण</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    <span className="text-[10px] font-bold text-primary tracking-wider uppercase">अक्टूबर 2023 संस्करण</span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs font-bold">
                      डाउनलोड <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <FileText className="absolute -right-4 -bottom-4 h-24 w-24 text-foreground/5 -rotate-12 pointer-events-none" />
              </Link>

              {/* Telegram Community */}
              <div className="bg-[#0088cc]/5 border border-[#0088cc]/20 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                    <Send className="h-5 w-5 fill-current ml-0.5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground">कम्युनिटी से जुड़ें</h4>
                    <p className="text-xs text-muted-foreground">50,000+ प्रतियोगी छात्र</p>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  डेली क्विज़, करेंट अफेयर्स अपडेट और स्टडी नोट्स के लिए अभी टेलीग्राम ग्रुप जॉइन करें।
                </p>
                
                <Button className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl font-bold" asChild>
                  <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer">
                    टेलीग्राम ग्रुप जॉइन करें
                  </a>
                </Button>
              </div>

              {ads && ads.length > 0 && (
                <ArticleAdRotator ads={ads} locale="hi" />
              )}
            </aside>

          </div>

        </Container>
      </Section>
    </>
  );
}
