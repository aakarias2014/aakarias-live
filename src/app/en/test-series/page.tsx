import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, FileText, Send, Star, Users, Brain, LayoutDashboard, Calendar, ArrowLeft, Smartphone, Check } from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { ArticleAdRotator } from "@/components/article/article-ad-rotator";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { getContentRepository } from "@/lib/content/content-repository";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Aakar IAS Test Series – Best Test Series for MPPSC Preparation",
  description: "Premium Test Series for UPSC and MPPSC Prelims & Mains exams by Aakar IAS. AI Ranking and quick expert evaluations.",
  path: "/en/test-series",
  locale: "en",
  keywords: ["MPPSC Test Series", "UPSC Test Series", "Aakar IAS Test Series 2026", "Mains Answer Evaluation", "Online Test Series"],
});

export default async function EnTestSeriesPage() {
  const repo = await getContentRepository();
  const testSeriesList = await repo.listTestSeries("en");
  const ads = await repo.listAds("en");
  const activeAd = ads && ads.length > 0 ? ads[0] : null;

  const onlineCoursesRaw = await repo.listOnlineCourses("en");
  const popularCourses = onlineCoursesRaw && onlineCoursesRaw.length > 0
    ? onlineCoursesRaw.slice(0, 3).map(c => ({
        title: c.titleEn || c.titleHi,
        price: c.price ? (c.price.startsWith("₹") ? c.price : `₹${c.price}`) : "Free",
        type: c.durationEn || c.lecturesCountHi || "Online Course",
        slug: c.slug
      }))
    : [
        { title: "Complete Ethics (GS-4) Masterclass", price: "₹1,999", type: "48 Lessons", slug: "" },
        { title: "Current Affairs Yearly Digest", price: "₹499", type: "Digital PDF", slug: "" },
        { title: "Essay Writing Workshop 2024", price: "₹2,499", type: "8 Live Sessions", slug: "" },
      ];

  const features = [
    {
      title: "AI Ranking",
      desc: "Real-time competitive ranking compared with 50,000+ aspirants across India.",
      icon: <Brain className="h-6 w-6 text-primary" />,
    },
    {
      title: "Expert Evaluation",
      desc: "Detailed feedback on every answer by ex-Bureaucrats and domain experts within 48 hours.",
      icon: <LayoutDashboard className="h-6 w-6 text-primary" />,
    },
    {
      title: "Performance Analytics",
      desc: "Subject-wise weak area identification using advanced heatmaps and data logs.",
      icon: <FileText className="h-6 w-6 text-primary" />,
    },
  ];

  const testSchedulesRaw = await repo.listTestSchedules("en");
  const schedule = testSchedulesRaw && testSchedulesRaw.length > 0
    ? testSchedulesRaw.map(s => ({
        date: s.date,
        code: s.code,
        title: s.titleEn || s.titleHi,
        focus: s.focusEn || s.focusHi || ""
      }))
    : [
        { date: "24 OCT 2024", title: "Indian Polity & Governance: Modern Developments", code: "UPSC GS-1", focus: "Focus on Constitutional Amendments & Judicial Overreach." },
        { date: "31 OCT 2024", title: "Geography of Madhya Pradesh", code: "MPPSC P1", focus: "Special emphasis on Narmada River basin and Tribal areas." },
      ];

  const toppers = [
    {
      name: "Aditi Sharma",
      rank: "AIR 42, UPSC 2023",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWz7xTXAR86wkeFc1OWHvMRiqjompQQwFAxqvnonkB4gBHbDtJE0c1k4xiHLzMCWBCmevOTG8d4j6-78UzEcGhPJDFQvUhUXkSm7xxEqkxcxZiZKLySFNRJ-AFacj4mcFn4H70pLkFQjp1XZ7AGFtF1wbgcaZ45mfx289CDtL9cUzvTwpUU--aI6rFHLpNz17p1QzjNRkrVG9m2BApwCqRBOaKSDWpTgYsK-KJeEQfBc09dR5hNVLQcMx6RFrC4Nt0mfw8YZlqsE8",
      words: "Aakar's evaluation is the closest to actual UPSC standards. Their AI ranking helped me gauge my competition level weekly.",
    },
    {
      name: "Rahul Verma",
      rank: "Rank 5, MPPSC 2022",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ8G7YUr4xJzrMK54w8l2OeQ5NVSQJnvGYb1_astoRwWka0HA4v3oXFWrUX1hrOuLaulaKubeZ6IQJj2C0cDHsrThrog1tahcX3sDWIJTH7lsZqRPX5mwabTm3EVxOTY0m9THEf_vuNgAelxQPDrfcuVs_RxQTnqTzdCtDIgJYclar5NCTKOv7gfs6HO7hxvipA90guZaK1mqd2KZE_TL5dRr4Tze1px8Mf0ymADvkJBF09ds6C2WiJnTx4Ww1vlpfDtC5br9yPVg",
      words: "The focus on Madhya Pradesh GK in their test series is unmatched. It gave me the edge I needed for the state services.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold tracking-wider">
              IAS & MPPSC 2024-25
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
              MPPSC Test Series: Shaping Academic Excellence
            </h1>
            <p className="text-pretty text-lg text-white/75 max-w-xl">
              A research-backed evaluation framework designed by India&apos;s top evaluators to bridge the gap between preparation and rank.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild className="px-8 py-6 rounded-xl shadow-lg shadow-primary/20">
                <Link href="#batches">Explore Test Series <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" className="px-8 py-6 rounded-xl border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white">
                Download Brochure
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-end items-center">
            {/* Academic badge graphic placeholder */}
            <div className="w-full max-w-md bg-white/5 border border-white/15 rounded-2xl p-8 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center text-primary font-bold text-lg">A</div>
                <div>
                  <h3 className="font-bold text-white text-base">Aakar Eval Framework</h3>
                  <p className="text-xs text-white/60">Data-Driven Evaluation System</p>
                </div>
              </div>
              <p className="text-sm text-white/80 italic">&ldquo;Designed to offer micro-level gap analysis with personal dashboard insights for every test taker.&rdquo;</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Breadcrumbs */}
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Test Series", href: "/en/test-series" }]} />
        </Container>
      </Section>

      {/* Main Grid Area */}
      <Section id="batches">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">

              {/* Featured Batches */}
              <section className="space-y-6">
                <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                  Featured Test
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testSeriesList && testSeriesList.length > 0 ? (
                    testSeriesList.map((item) => (
                      <div key={item.id} className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between shadow-soft hover:shadow-soft-lg transition-all relative overflow-hidden group">
                        <div>
                          {item.badge && (
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-[10px] bg-primary/10 text-primary font-extrabold px-3 py-1 rounded-full">
                                {item.badge}
                              </span>
                            </div>
                          )}
                          <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                          )}

                          {item.features && item.features.length > 0 && (
                            <ul className="space-y-2 mt-6 text-sm">
                              {item.features.map((feat, fIdx) => {
                                const isHighlighted = feat.includes("**");
                                const cleanFeat = feat.replace(/\*\*/g, "");
                                return (
                                  <li key={fIdx} className={`flex items-center gap-2 ${isHighlighted ? "text-foreground font-extrabold" : "text-muted-foreground"}`}>
                                    <Check className={`h-4 w-4 shrink-0 ${isHighlighted ? "text-primary fill-primary/10" : "text-primary"}`} />
                                    {cleanFeat}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>

                        <div className="mt-8 border-t border-border/60 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            {item.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through block">₹{item.originalPrice.toLocaleString()}</span>
                            )}
                            <span className="text-xl font-extrabold text-foreground">
                              {item.price ? `₹${item.price.toLocaleString()}` : "Free"}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {item.buyLink ? (
                              <Button asChild className="rounded-xl px-4 text-xs sm:text-sm font-semibold">
                                <Link href={item.buyLink} target="_blank" rel="noopener noreferrer">
                                  Join Online
                                </Link>
                              </Button>
                            ) : (
                              <Button className="rounded-xl px-4 text-xs sm:text-sm font-semibold">Join Online</Button>
                            )}
                            <Button asChild variant="outline" className="rounded-xl px-4 text-xs sm:text-sm font-semibold border-primary/20 text-primary hover:bg-primary/5">
                              <Link href={`https://wa.me/919713300123?text=${encodeURIComponent(`Hello Aakar IAS, I want to join offline test series: ${item.title}`)}`} target="_blank" rel="noopener noreferrer">
                                Join Offline
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 text-muted-foreground border border-dashed rounded-2xl p-6">
                      No test series found.
                    </div>
                  )}
                </div>
              </section>

              {/* Smart Prep Features */}
              <section className="space-y-6">
                <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                  The Smart Prep Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {features.map((f, i) => (
                    <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-soft space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        {f.icon}
                      </div>
                      <h3 className="font-bold text-foreground text-base">{f.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Upcoming Schedule */}
              <section className="space-y-6">
                <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                  Upcoming Schedule
                </h2>
                <div className="space-y-4">
                  {schedule.map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 bg-muted/20 border border-border p-5 rounded-2xl">
                      <div className="text-center sm:text-left shrink-0 bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl">
                        <span className="text-xs font-bold text-primary block uppercase tracking-wider">{item.date.split(" ")[1]}</span>
                        <span className="text-2xl font-extrabold text-primary leading-none block">{item.date.split(" ")[0]}</span>
                        <span className="text-[10px] font-semibold text-primary block mt-0.5">{item.date.split(" ")[2]}</span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded uppercase">
                            {item.code}
                          </span>
                        </div>
                        <h4 className="font-bold text-foreground text-base">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.focus}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Topper Testimonials */}
              <section className="space-y-6">
                <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                  Toppers&apos; Words
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {toppers.map((t, i) => (
                    <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-soft space-y-4 flex flex-col justify-between">
                      <p className="text-xs text-muted-foreground italic leading-relaxed">&ldquo;{t.words}&rdquo;</p>
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-border/40 relative">
                          <Image src={t.img} alt={t.name} fill sizes="40px" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">{t.name}</p>
                          <p className="text-[10px] text-primary font-bold">{t.rank}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar Column */}
            <aside className="lg:col-span-4 space-y-6">

              {/* Popular Courses */}
              <div className="bg-card border border-border p-5 rounded-2xl shadow-soft">
                <h3 className="font-bold text-foreground text-lg mb-4">Popular Courses</h3>
                <div className="space-y-4">
                  {popularCourses.map((c, i) => {
                    const content = (
                      <>
                        <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                          {c.title}
                        </p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground mt-1.5">
                          <span>{c.type}</span>
                          <span className="text-primary font-bold">{c.price}</span>
                        </div>
                      </>
                    );
                    return c.slug ? (
                      <Link href={`/en/online-courses/${c.slug}`} key={i} className="block border-b border-border/60 pb-3 last:border-0 last:pb-0 group cursor-pointer">
                        {content}
                      </Link>
                    ) : (
                      <div key={i} className="border-b border-border/60 pb-3 last:border-0 last:pb-0 group cursor-pointer">
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Telegram Promo */}
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-primary/5 p-6 rounded-2xl border border-primary/20 space-y-4 group cursor-pointer hover:bg-primary/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0">
                    <Send className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Join Telegram</h4>
                    <p className="text-xs text-muted-foreground">Daily Quiz & PDF Notes</p>
                  </div>
                </div>
                <p className="text-xs font-bold text-primary">2.5 Lakh+ Serious Aspirants</p>
              </a>

              {/* Center Visit Promo / Advertisement */}
              {ads && ads.length > 0 && (
                <ArticleAdRotator ads={ads} locale="en" />
              )}
            </aside>
          </div>

          {/* CTA Bottom Banner */}
          <Section className="mt-12 pb-0">
            <div className="bg-primary text-primary-foreground p-8 sm:p-12 rounded-2xl relative overflow-hidden shadow-soft-lg text-center">
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <h2 className="text-3xl font-extrabold text-white">Shaping Your Preparation Success</h2>
                <p className="text-sm opacity-90">
                  Join the most trusted test series platform for Civil Services in India. Limited early bird discount available.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <Button asChild className="bg-white text-primary hover:bg-neutral-100 rounded-xl px-8 py-6 font-bold shadow-md">
                    <Link href="#batches">
                      Join Online
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700 hover:text-white rounded-xl px-8 py-6 font-bold shadow-md">
                    <Link href={`https://wa.me/919713300123?text=${encodeURIComponent("Hello Aakar IAS, I want to inquire about the test series.")}`} target="_blank" rel="noopener noreferrer">
                      WhatsApp Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Section>
        </Container>
      </Section>

      {/* ─── FAQ Section (Google PAA) ──────────────────────────────── */}
      <Section className="bg-muted/20">
        <Container size="narrow">
          <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4 mb-6">
            Frequently Asked Questions — Test Series
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Does Aakar IAS, Indore offer test series?",
                a: "Yes, Aakar IAS Indore offers comprehensive test series for both MPPSC and UPSC examinations. The test series includes Prelims Mock Tests, Mains Answer Writing Practice, Subject-wise Tests, and Full-Length Simulations — available both online and offline. Tests are designed by experienced faculty and include detailed performance analytics."
              },
              {
                q: "What is the fees of Aakar IAS MPPSC coaching?",
                a: "Aakar IAS offers multiple course packages including standalone Test Series at very competitive rates. Combined packages of Test Series with Foundation Batches are also available at discounted prices. For latest fee structures and offers, contact our counselors or visit the Indore center."
              },
              {
                q: "How many tests are included in the Aakar IAS test series?",
                a: "The Aakar IAS test series typically includes 40+ Prelims mock tests, 20+ Mains answer writing sessions, and subject-wise sectional tests. The exact number varies by the package selected. All tests come with detailed solutions, performance ranking, and personalized feedback."
              },
            ].map((faq, i) => (
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
        </Container>
      </Section>

      {/* FAQ JSON-LD for SEO */}
      <JsonLd data={faqJsonLd([
        { question: "Does Aakar IAS, Indore offer test series?", answer: "Yes, Aakar IAS Indore offers comprehensive test series for both MPPSC and UPSC examinations. The test series includes Prelims Mock Tests, Mains Answer Writing Practice, Subject-wise Tests, and Full-Length Simulations — available both online and offline." },
        { question: "What is the fees of Aakar IAS MPPSC coaching?", answer: "Aakar IAS offers multiple course packages including standalone Test Series at very competitive rates. Combined packages of Test Series with Foundation Batches are also available at discounted prices." },
        { question: "How many tests are included in the Aakar IAS test series?", answer: "The Aakar IAS test series typically includes 40+ Prelims mock tests, 20+ Mains answer writing sessions, and subject-wise sectional tests." },
      ])} />
    </>
  );
}
