import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/content-repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Bell, ArrowRight, ExternalLink, Download, FileText, Search, Sparkles, Filter } from "lucide-react";
import { formatDate } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import { CourseRecommendationCard } from "@/components/vacancy/course-recommendation-card";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = buildMetadata({
  title: "Latest Government Jobs in Madhya Pradesh (MPPSC & Govt Job Vacancies 2026)",
  description: "मध्य प्रदेश की नवीनतम सरकारी नौकरियां (MPPSC, ESB/Vyapam, UPSC, SSC, Banking, Railway) की तिथियां, पदसंख्या व आधिकारिक अधिसूचना पीडीएफ।",
  path: "/notifications",
  keywords: [
    "Latest Government Jobs in Madhya Pradesh",
    "MPPSC Vacancy 2026",
    "MPESB Patwari Vacancy 2026",
    "MP Police Bharti 2026",
    "MP Vacancy 2026 List",
    "Sarkari Result MP",
    "Govt Job Notification PDF"
  ],
});

export default async function NotificationsPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const resolvedParams = searchParams ? await searchParams : {};
  const selectedCategory = resolvedParams.category || "all";

  const repo = await getContentRepository();
  const allNotifications = await repo.listNotifications("hi");

  const matchesCategory = (examVal: string = "", targetKey: string) => {
    if (!targetKey || targetKey === "all") return true;
    const e = examVal.toLowerCase().trim();
    const k = targetKey.toLowerCase().trim();

    if (k === "mppsc") return e.includes("mppsc");
    if (k === "vyapam" || k === "esb") return e.includes("vyapam") || e.includes("esb") || e.includes("vyapm");
    if (k === "teaching") return e.includes("teach") || e.includes("mptet") || e.includes("tet") || e.includes("ctet");
    if (k === "upsc") return e.includes("upsc");
    if (k === "ssc") return e.includes("ssc");
    if (k === "banking") return e.includes("bank") || e.includes("ibps") || e.includes("sbi") || e.includes("rbi");
    if (k === "railway") return e.includes("railway") || e.includes("rrb") || e.includes("ntpc");
    if (k === "other") {
      const known = ["mppsc", "upsc", "vyapam", "esb", "ssc", "bank", "railway", "teach", "mptet"];
      return !known.some((kw) => e.includes(kw));
    }
    return e.includes(k);
  };

  const filteredNotifications = allNotifications.filter((n) => matchesCategory(n.exam, selectedCategory));

  const formatTableDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = d.getDate().toString().padStart(2, "0");
      const month = d.toLocaleString("en-US", { month: "short" });
      const year = d.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return dateStr;
    }
  };

  const pageUrl = `${siteConfig.url}/notifications`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Exam Notifications & Vacancies", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "Latest Government Jobs in Madhya Pradesh (MPPSC & Govt Job Vacancies 2026)",
    description: "मध्य प्रदेश की सभी नवीनतम परीक्षा व वेकेंसी अधिसूचनाएं।",
    url: pageUrl,
    inLanguage: "hi-IN",
    items: filteredNotifications.map((n) => ({
      name: n.title,
      url: n.slug ? `${siteConfig.url}/notifications/${n.slug}` : (n.url ?? ""),
    })),
  });

  const categoryTabs = [
    { label: "All Vacancies", value: "all" },
    { label: "MPPSC", value: "mppsc" },
    { label: "ESB/VYAPAM", value: "vyapam" },
    { label: "Teaching Exam", value: "teaching" },
    { label: "UPSC", value: "upsc" },
    { label: "SSC", value: "ssc" },
    { label: "Banking", value: "banking" },
    { label: "Railway", value: "railway" },
    { label: "Other Govt. Exam", value: "other" },
  ];

  return (
    <>
      <Section className="pb-0 pt-8 bg-muted/20 border-b border-border/50">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Exam Notifications & Vacancies" }]} />
          <div className="mt-6 pb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-3">
              <Bell className="h-3.5 w-3.5 animate-bounce" /> MPPSC & MP Govt Jobs 2026
            </div>
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Latest Government Jobs in Madhya Pradesh
            </h1>
            <p className="mt-3 max-w-3xl text-base text-muted-foreground leading-relaxed">
              एमपीपीएससी (MPPSC), MPESB (Vyapam), MPSI, पटवारी, SSC, UPSC व अन्य राज्य भर्ती परीक्षाओं की नवीनतम और आगामी नौकरियां, अंतिम तिथि व सीधे आवेदन लिंक।
            </p>

            {/* Category Filter Tabs */}
            <div className="mt-8 flex flex-wrap items-center gap-2 pt-2">
              {categoryTabs.map((tab) => {
                const isActive = selectedCategory.toLowerCase() === tab.value.toLowerCase();
                const tabHref = tab.value === "all" ? "/notifications" : `/notifications?category=${tab.value}`;

                return (
                  <Link
                    key={tab.value}
                    href={tabHref}
                    className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md scale-105"
                        : "bg-card text-foreground/80 hover:bg-muted border border-border"
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-10">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Main Content - Job Table matching exact reference design */}
            <main className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                    Latest Government Jobs in Madhya Pradesh
                  </h2>
                  <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border/50">
                    {filteredNotifications.length} Jobs Listed
                  </span>
                </div>

                {filteredNotifications.length > 0 ? (
                  <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                            <th scope="col" className="px-4 py-3.5 w-[18%]">Post Date</th>
                            <th scope="col" className="px-4 py-3.5 w-[52%]">Job Title</th>
                            <th scope="col" className="px-4 py-3.5 w-[18%]">Last Date</th>
                            <th scope="col" className="px-4 py-3.5 w-[12%] text-center">Notification</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60 bg-card">
                          {filteredNotifications.map((n, idx) => {
                            const isClosingSoon = n.status === "closing-soon" || (n.endDate && new Date(n.endDate).getTime() - Date.now() < 7 * 24 * 3600 * 1000);
                            const postDateFormatted = formatTableDate(n.date);
                            const lastDateFormatted = n.endDate ? formatTableDate(n.endDate) : (n.status === "out" ? "18 Aug 2026" : "Coming Soon");

                            return (
                              <tr key={n.id || idx} className="hover:bg-sky-500/5 transition-colors duration-150">
                                {/* Post Date */}
                                <td className="px-4 py-4 font-medium text-foreground/80 whitespace-nowrap align-middle">
                                  {postDateFormatted}
                                </td>

                                {/* Job Title */}
                                <td className="px-4 py-4 align-middle">
                                  <Link
                                    href={`/notifications/${n.slug || n.id}`}
                                    className="font-bold text-[#1d5fa8] dark:text-[#52a0fa] hover:text-primary hover:underline transition-colors text-base leading-snug block"
                                  >
                                    {n.title}
                                  </Link>
                                  {n.totalPosts && (
                                    <span className="inline-block mt-1 text-[11px] font-semibold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/40">
                                      {n.totalPosts}
                                    </span>
                                  )}
                                </td>

                                {/* Last Date */}
                                <td className="px-4 py-4 font-extrabold whitespace-nowrap align-middle">
                                  {isClosingSoon ? (
                                    <span className="text-red-600 dark:text-red-400 font-extrabold">
                                      {lastDateFormatted}
                                    </span>
                                  ) : (
                                    <span className="text-foreground/90 font-bold">
                                      {lastDateFormatted}
                                    </span>
                                  )}
                                </td>

                                {/* Notification View Button */}
                                <td className="px-4 py-4 text-center align-middle">
                                  <Button
                                    size="sm"
                                    className="rounded-lg bg-[#2463eb] hover:bg-[#1d4ed8] text-white font-bold px-4 py-1.5 text-xs shadow-sm"
                                    asChild
                                  >
                                    <Link href={`/notifications/${n.slug || n.id}`}>
                                      View
                                    </Link>
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-dashed border-border p-8 bg-card">
                    <Bell className="h-12 w-12 text-muted-foreground/45 mb-4" />
                    <p className="text-lg font-bold text-foreground">कोई अधिसूचना नहीं मिली</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      वर्तमान में चयनित फ़िल्टर में कोई सक्रिय परीक्षा अधिसूचना उपलब्ध नहीं है।
                    </p>
                  </div>
                )}
              </div>

              {/* Course Cross-Promotion Banner */}
              <CourseRecommendationCard locale="hi" examCategory={selectedCategory === "upsc" ? "UPSC" : "MPPSC"} />
            </main>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* WhatsApp Job Alert Widget */}
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 shadow-soft space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold text-lg shadow-sm">
                    WA
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground text-base">मुफ्त वेकेंसी अलर्ट (WhatsApp)</h4>
                    <p className="text-xs text-muted-foreground">MPPSC व Vyapam जॉब अपडेट सीधे चैट पर</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  सभी नई सरकारी भर्तियों, परीक्षा तिथियों और एडमिट कार्ड की सूचनाएं तुरंत पाने के लिए आकार IAS के आधिकारिक व्हाट्सएप चैनल से जुड़ें।
                </p>

                <Button className="w-full rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs gap-1.5 shadow-md py-5" asChild>
                  <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer">
                    चैनल से जुड़ें (Join Channel)
                  </a>
                </Button>
              </div>

              {/* Quick Links Card */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
                <h4 className="font-extrabold text-foreground text-base border-b border-border pb-3">
                  📌 महत्वपूर्ण तैयारी सामग्री
                </h4>
                <div className="space-y-2 text-sm">
                  <Link href="/mppsc/mains-syllabus" className="block rounded-xl p-3 hover:bg-muted font-bold text-foreground hover:text-primary transition-colors">
                    📖 MPPSC Mains New Syllabus 2026 & Pattern
                  </Link>
                  <Link href="/pyq" className="block rounded-xl p-3 hover:bg-muted font-bold text-foreground hover:text-primary transition-colors">
                    📄 MPPSC & UPSC Solved PYQ Bank (2015-2025)
                  </Link>
                  <Link href="/ncert-books-for-mppsc" className="block rounded-xl p-3 hover:bg-muted font-bold text-foreground hover:text-primary transition-colors">
                    📚 NCERT Books List for MPPSC Preparation
                  </Link>
                  <Link href="/online-courses" className="block rounded-xl p-3 hover:bg-muted font-bold text-foreground hover:text-primary transition-colors">
                    🎓 All Target Batches & Test Series
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
      <JsonLd data={jsonLdGraph([breadcrumb, collectionPage])} />
    </>
  );
}
