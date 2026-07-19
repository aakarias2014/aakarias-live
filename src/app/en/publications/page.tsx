import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, FileText, Search, Star, Bookmark, Send, Award, Users } from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { BookCard } from "@/components/content/book-card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { getContentRepository } from "@/lib/content/content-repository";

export const metadata: Metadata = buildMetadata({
  title: "Aakar IAS Publications – Books for Civil Services Preparation",
  description: "Explore premium text books, preparation material, and study guides for UPSC, MPPSC, and State PSC examinations by Aakar IAS.",
  path: "/en/publications",
  locale: "en",
  keywords: ["Aakar IAS Books", "MPPSC Books English", "UPSC history book", "MP GK book English", "Aakar IAS publications"],
});

export default async function EnPublicationsPage() {
  const repo = await getContentRepository();
  const [publications, faculties] = await Promise.all([
    repo.listPublications("en"),
    repo.listFaculties("en")
  ]);
  const categories = [
    { name: "UPSC", active: true },
    { name: "MPPSC", active: false },
    { name: "MPSI", active: false },
    { name: "History", active: false },
    { name: "Hindi Medium", active: false },
    { name: "Current Affairs", active: false },
  ];

  const experts = [
    {
      name: "Dr. R.K. Sharma",
      subject: "History & Ethics",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiZAZ7QNGe9TEadoP8qLsxHUTrPHMcZTi9cOsau6rYqLka1c_iIDJcKrGksfSjXw2TmILrSvS8C5QiqyEED8Yw_Mbu4t9I7j4gDpS64Z6-zBtf38RI-Q5MDghPR6qYuwEyXyMeTTmzjjW5Aljr4DFhvUSKigDhGglDIY0mlJsK7F683xv3DPrqJ0NQsNpB_-VyxyrEu83bnT36Vt9ykUvcC8geJyEVt8Y1K5qI0i_sNcdlcJ2ElzCIIZKIM3rG354Q5UPxnlNneFo",
    },
    {
      name: "Ananya Singh",
      subject: "Political Science",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWz7xTXAR86wkeFc1OWHvMRiqjompQQwFAxqvnonkB4gBHbDtJE0c1k4xiHLzMCWBCmevOTG8d4j6-78UzEcGhPJDFQvUhUXkSm7xxEqkxcxZiZKLySFNRJ-AFacj4mcFn4H70pLkFQjp1XZ7AGFtF1wbgcaZ45mfx289CDtL9cUzvTwpUU--aI6rFHLpNz17p1QzjNRkrVG9m2BApwCqRBOaKSDWpTgYsK-KJeEQfBc09dR5hNVLQcMx6RFrC4Nt0mfw8YZlqsE8",
    },
    {
      name: "Prof. V. Gupta",
      subject: "Geography & IR",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ8G7YUr4xJzrMK54w8l2OeQ5NVSQJnvGYb1_astoRwWka0HA4v3oXFWrUX1hrOuLaulaKubeZ6IQJj2C0cDHsrThrog1tahcX3sDWIJTH7lsZqRPX5mwabTm3EVxOTY0m9THEf_vuNgAelxQPDrfcuVs_RxQTnqTzdCtDIgJYclar5NCTKOv7gfs6HO7hxvipA90guZaK1mqd2KZE_TL5dRr4Tze1px8Mf0ymADvkJBF09ds6C2WiJnTx4Ww1vlpfDtC5br9yPVg",
    },
    {
      name: "Shanti Devi",
      subject: "MP GK Specialist",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZJDr4fMWnOdZdO_8G_AvwcLsJdaPM9uQP64PjQDGyIRGj-NwZVOSS_iI_Qg0eBKfpFRSsqLF8rIi8gNB8T6Ir3TUBV7ohnyqhqnwtyrruq4kWdT3jaReJM4XP--UDPtvJOh5iabqnY-2v2m78WvC3DZXBehLdvqtS09Vs_Mt-n5QyCRomBKQS0NjdL9182Ou28aYEVrcx9OrZRnhwRN5UsoGxoR7Vf98dXCzQv_AsQKeGpnQtfuv5wbXQqL7Xqyamx_P3T2ZPdhc",
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
              NEW RELEASES 2024
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Aakar IAS Publications
            </h1>
            <p className="text-pretty text-lg text-white/75 max-w-xl">
              Premium study materials designed specifically for Civil Services examination preparation.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild className="px-8 py-6 rounded-xl shadow-lg shadow-primary/20">
                <Link href="#explore">Explore Books <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" className="px-8 py-6 rounded-xl border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white">
                Buy Now
              </Button>
            </div>
          </div>
          <div className="flex-1 relative w-full h-64 md:h-80 flex items-center justify-center">
            <div className="flex -space-x-12">
              <div className="w-40 sm:w-48 aspect-[3/4] relative transform -rotate-6 transition-transform hover:-rotate-2 duration-500 rounded-lg shadow-2xl overflow-hidden border border-border/20">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl9uYVweNfZJqvxx-4K9u5SQk5pjI3W82Y0QrPEcgrwhl2kAztT745B8_8eYvM1yTy35aDUb3-kIZOz13uUlrEubSVAkdxxOvomBEIzTeWTwYK4pnjiqnP5ZrIv6EHPkxM1luxWu6A_k43liawMoyP5fViS28vT_cP0vWZk80HJREobKl8Oel--GeLts55cbufLAQuKXPFc2QE34H_xiq8xcyOuhJ2i8fapksmBOHLlZEgOfY5f1_swYrqFNSOMP9JVawy6LvoVA4"
                  alt="Bharat Ka Itihas"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              <div className="w-40 sm:w-48 aspect-[3/4] relative transform rotate-6 transition-transform hover:rotate-2 duration-500 rounded-lg shadow-2xl overflow-hidden border border-border/20">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1LKLshgJvyCF9cgb-Moxouc0K9y3sseSKVMfNJW1mX7WlE82xL9RwUNGVjOwfJekd6IFP99l8AZXAVvvcEh6IHGSnFFNbpJ2_z8BEhHT9hpKTy8rfu158TfE9JISEJgQ8rS0SDTfz6EdutIlneTPeblTmFeojnmITY3HtYUYI6Fk240ksk3b67_eDxomJ9S5gq455FHZPtm7uw5JN3ZD8731SSgF5ueEDOBNhfl7A9UqZfDL_5BbwkIlIS3hYlcmU8COMYngGgWQ"
                  alt="MP GK"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Breadcrumbs */}
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Publications", href: "/en/publications" }]} />
        </Container>
      </Section>

      {/* Main Content Area */}
      <Section id="explore">
        <Container size="wide">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filter Area */}
            <aside className="w-full lg:w-72 shrink-0 space-y-6">
              {/* Category Filter */}
              <div className="bg-card border border-border p-5 rounded-2xl shadow-soft">
                <h3 className="font-bold text-foreground mb-4 text-lg">Categories</h3>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.name}
                      className={`px-4 py-2 rounded-xl text-left text-sm transition-all duration-200 ${
                        c.active
                          ? "bg-primary text-white font-medium"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resource Hub Links */}
              <div className="bg-card border border-border p-5 rounded-2xl shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <Bookmark className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-foreground text-lg">Study Resources</h3>
                </div>
                <div className="space-y-3">
                  <Link href="/en/current-affairs" className="flex items-center gap-3 p-2 hover:bg-muted rounded-xl transition-all">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Daily Current Affairs</p>
                      <p className="text-xs text-muted-foreground">Daily Updates</p>
                    </div>
                  </Link>
                  <Link href="/en/free-pdf" className="flex items-center gap-3 p-2 hover:bg-muted rounded-xl transition-all">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Monthly PDFs</p>
                      <p className="text-xs text-muted-foreground">Free Downloads</p>
                    </div>
                  </Link>
                </div>
                <Button className="w-full mt-6 bg-primary-container text-on-primary-container hover:opacity-90 transition-opacity flex items-center justify-center gap-2 py-5 rounded-xl font-bold">
                  <Send className="h-4 w-4 fill-current" /> Telegram Community
                </Button>
              </div>
            </aside>

            {/* Catalog Grid Area */}
            <div className="flex-1 space-y-12">
              {/* Featured Section */}
              {publications.length > 0 && (
                <section>
                  <h2 className="text-2xl font-extrabold text-foreground mb-6 border-l-4 border-primary pl-4">
                    Featured Publications
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {publications.slice(0, 2).map((pub) => (
                      <BookCard key={pub.id} pub={pub} locale="en" />
                    ))}
                  </div>
                </section>
              )}

              {/* Latest Releases Grid */}
              {publications.length > 2 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-extrabold text-foreground">Latest Releases</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {publications.slice(2).map((pub) => (
                      <BookCard key={pub.id} pub={pub} locale="en" />
                    ))}
                  </div>
                </section>
              )}

              {publications.length === 0 && (
                <div className="text-center py-16 border border-dashed rounded-2xl">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-bold text-lg text-foreground">No Books Found</h3>
                  <p className="text-sm text-muted-foreground mt-1">New books will be added shortly.</p>
                </div>
              )}

              {/* Expert Faculty */}
              {(faculties.length > 0 || experts.length > 0) && (
                <section className="pt-6">
                  <h2 className="text-2xl font-extrabold text-foreground mb-6 flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" /> Our Academic Experts
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {(faculties.length > 0 ? faculties : experts.map((e, idx) => ({
                      id: `static-${idx}`,
                      nameHi: e.name,
                      nameEn: e.name,
                      titleHi: e.subject,
                      titleEn: e.subject,
                      image: e.img
                    }))).map((f) => {
                      const name = f.nameEn || f.nameHi;
                      const title = f.titleEn || f.titleHi;
                      return (
                        <div key={f.id} className="text-center group">
                          <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-background shadow-soft transition-transform group-hover:scale-105 relative">
                            {f.image ? (
                              <Image src={f.image} alt={name} fill sizes="96px" className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
                                <Users className="h-8 w-8" />
                              </div>
                            )}
                          </div>
                          <h4 className="font-bold text-foreground">{name}</h4>
                          <p className="text-xs text-muted-foreground">{title}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Newsletter Section */}
          <Section className="mt-12 pb-0">
            <div className="bg-primary text-primary-foreground p-8 sm:p-12 rounded-2xl relative overflow-hidden shadow-soft-lg">
              <div className="absolute right-0 top-0 opacity-5">
                <MailIconLarge />
              </div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <h2 className="text-3xl font-extrabold text-white">Get Updates on New Releases</h2>
                <p className="text-sm opacity-90">
                  Join our newsletter to receive updates on new book releases, free study materials, and exam notifications directly in your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/60 focus:bg-white focus:text-foreground focus:outline-none transition-all text-sm"
                  />
                  <Button className="bg-white text-primary hover:bg-neutral-100 rounded-xl px-8 py-3.5 font-bold shadow-md">
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </div>
          </Section>
        </Container>
      </Section>
    </>
  );
}

function MailIconLarge() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
