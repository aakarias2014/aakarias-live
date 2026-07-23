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
  path: "/en/contact",
  locale: "en",
  keywords: ["Contact Aakar IAS", "Aakar IAS admissions", "Aakar IAS contact number", "Aakar IAS address Indore", "MPPSC enquiry", "UPSC coaching contact"],
});

export default async function EnglishContactPage() {
  const repo = await getContentRepository();
  const latestArticles = await repo.listArticles({
    locale: "en",
    contentType: "currentAffairs",
    page: 1,
    pageSize: 3,
  }).catch(() => null);
  const ads = await repo.listAds("en").catch(() => []);
  const currentAffairs = latestArticles?.items || [];

  const faqs = [
    {
      q: "When do the new batches start?",
      a: "Our new foundation batches start on the 1st and 15th of every month. For more details on the current batch status, feel free to call our support numbers."
    },
    {
      q: "Are both online and offline classes available?",
      a: "Yes, Aakar IAS provides a hybrid learning model. You can either attend offline classes at our Indore center or study online via our mobile application from anywhere."
    },
    {
      q: "Is the study material available in PDF format?",
      a: "Yes, all premium students are provided access to our comprehensive study notes and class resources in digital PDF format."
    },
    {
      q: "What is the fees of Aakar IAS MPPSC coaching?",
      a: "Aakar IAS offers flexible fee structures for MPPSC coaching. Fees vary by course — Prelims, Mains, Pre+Mains Combined, Foundation Batch, and Test Series all have different pricing. For the latest fee details and available installment plans, please contact our counselors at our Indore center or call us directly."
    },
    {
      q: "Does Aakar IAS provide study materials?",
      a: "Yes, Aakar IAS provides comprehensive study materials including printed notes, digital PDFs, current affairs magazines, previous year question papers, and subject-wise booklets. All materials are designed specifically for MPPSC and UPSC syllabi and are regularly updated by our expert faculty."
    }
  ];

  return (
    <>
      {/* Breadcrumb section */}
      <section className="border-b border-border bg-muted/20 py-4">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Contact Us", href: "/en/contact" }]} />
        </Container>
      </section>

      {/* Main contact section */}
      <Section className="bg-background">
        <Container size="wide" className="space-y-12">
          
          {/* Hero Header */}
          <div className="text-center py-6 max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your success is our priority. Connect with us for any guidance, query, or information regarding our UPSC, MPPSC, and other government exam courses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Content Area (8 Columns) */}
            <main className="lg:col-span-8 space-y-10">
              
              {/* Quick Contact Bento Grid */}
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
                    <h3 className="font-bold text-foreground text-lg mb-1">Call Us</h3>
                    <p className="text-primary font-bold text-base tracking-wider">{siteConfig.contact.phone}</p>
                    <p className="text-muted-foreground text-xs mt-1.5 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 10:00 AM - 07:00 PM
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
                    <p className="text-[#25D366] font-bold text-base">Start Chat</p>
                    <p className="text-muted-foreground text-xs mt-1.5">Instant response support</p>
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
                    <p className="text-muted-foreground text-xs mt-1.5">Support within 24 hours</p>
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
                    <p className="text-muted-foreground text-xs mt-1.5">Free study materials & updates</p>
                  </div>
                </a>

              </div>

              {/* Form Section */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-soft">
                <ContactForm locale="en" />
              </div>

              {/* WhatsApp Premium CTA banner */}
              <div className="relative overflow-hidden rounded-2xl p-8 text-white bg-gradient-to-r from-primary to-[#0F172A] shadow-lg group">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 max-w-[450px]">
                    <h3 className="text-2xl font-extrabold">Need Immediate Assistance?</h3>
                    <p className="text-white/80 text-sm">Chat directly with our career counselors on WhatsApp to get the right guidance for your goals.</p>
                  </div>
                  <a 
                    href={siteConfig.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-2 shrink-0"
                  >
                    <MessageSquare className="h-5 w-5 fill-current" />
                    Connect on WhatsApp
                  </a>
                </div>
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              </div>

              {/* Indore Center Address & Live Google Map */}
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                  Our Center
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
                  <div className="md:col-span-5 p-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-border pb-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h3 className="font-extrabold text-foreground text-lg leading-tight">Aakar IAS Indore (Head Office)</h3>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex gap-2.5 items-start text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0 text-primary/70 mt-0.5" />
                          <p>{siteConfig.contact.address}</p>
                        </div>
                        <div className="flex gap-2.5 items-start text-muted-foreground">
                          <Clock className="h-4 w-4 shrink-0 text-primary/70 mt-0.5" />
                          <p>Mon - Sat: 08:00 AM to 08:00 PM | Sunday: Holiday</p>
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
                        <ExternalLink className="h-4 w-4" /> Get Map Directions
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
                  Frequently Asked Questions
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
            <aside data-nosnippet className="lg:col-span-4 space-y-6">
              
              {/* Latest Current Affairs */}
              <div className="bg-card border border-border p-6 rounded-2xl shadow-soft space-y-4">
                <div className="flex items-center gap-2 text-primary border-b border-border pb-3">
                  <BookOpen className="h-5 w-5" />
                  <h3 className="font-extrabold text-foreground">Latest Current Affairs</h3>
                </div>
                
                <ul className="space-y-4">
                  {currentAffairs.map((ca) => (
                    <li key={ca.id} className="group cursor-pointer border-b border-border/40 last:border-0 pb-3 last:pb-0">
                      <span className="text-[10px] font-bold text-muted-foreground block mb-1">{formatDate(ca.date, "en")}</span>
                      <Link href={ca.href} className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {ca.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" size="sm" asChild className="w-full rounded-xl">
                  <Link href="/en/current-affairs">View All</Link>
                </Button>
              </div>

              {/* Monthly PDF Card */}
              <Link 
                href="/en/monthly-pdf"
                className="bg-muted/30 hover:bg-muted/50 border border-border p-6 rounded-2xl shadow-soft group flex flex-col justify-between relative overflow-hidden block"
              >
                <div className="relative z-10 space-y-4">
                  <div>
                    <h3 className="font-extrabold text-foreground text-lg leading-tight">Monthly PDF Magazine</h3>
                    <p className="text-xs text-muted-foreground mt-1">Current Affairs & Editorial Highlights</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    <span className="text-[10px] font-bold text-primary tracking-wider uppercase">OCTOBER 2023 EDITION</span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs font-bold">
                      Download <ChevronRight className="h-4 w-4" />
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
                    <h4 className="font-extrabold text-foreground">Join Community</h4>
                    <p className="text-xs text-muted-foreground">50,000+ Aspirants</p>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Join our official Telegram community to get daily study quizzes, current affairs cards, and free revision notes.
                </p>
                
                <Button className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl font-bold" asChild>
                  <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer">
                    Join Telegram Group
                  </a>
                </Button>
              </div>

              {ads && ads.length > 0 && (
                <ArticleAdRotator ads={ads} locale="en" />
              )}
            </aside>

          </div>

        </Container>
      </Section>
    </>
  );
}
