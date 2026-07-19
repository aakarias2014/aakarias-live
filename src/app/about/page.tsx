import { getContentRepository } from "@/lib/content/content-repository";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { buildMetadata, formatDate } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { 
  Award, 
  Compass, 
  Eye, 
  Users, 
  Flag, 
  Brain, 
  BookOpen, 
  Globe, 
  ArrowRight, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Briefcase,
  GraduationCap,
  UserCheck,
  Calendar
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArticleAdRotator } from "@/components/article/article-ad-rotator";

export const metadata: Metadata = buildMetadata({
  title: "हमारे बारे में (About Us)",
  description: "आकार आईएएस की कहानी, मिशन, विज़न और हमारी महत्वपूर्ण उपलब्धियां।",
  path: "/about",
});

export default async function AboutPage() {
  const repo = await getContentRepository();
  const [page, faculties, aboutConfig, latestArticles, ads] = await Promise.all([
    repo.getStaticPage("about", "hi").catch(() => null),
    repo.listFaculties("hi").catch(() => []),
    repo.getAboutPageConfig("hi").catch(() => null),
    repo.listArticles({ locale: "hi", contentType: "currentAffairs", page: 1, pageSize: 3 }).catch(() => null),
    repo.listAds("hi").catch(() => []),
  ]);

  // Find director photos from faculty data
  const directorNames = ["Ashwini Kumar Mudgil", "Atharv Tiwari", "Gaurav Tiwari"];
  const directorImages: Record<string, string> = {};
  for (const faculty of faculties || []) {
    for (const name of directorNames) {
      if (faculty.nameEn.toLowerCase().includes(name.toLowerCase()) && faculty.image) {
        directorImages[name] = faculty.image;
      }
    }
  }



  return (
    <>
      {/* Page Header & Hero Section */}
      <Section className="relative overflow-hidden pb-12 pt-8 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <Container size="wide">
          <Breadcrumb items={[{ name: "About Us" }]} />
          
          <div className="relative z-10 mt-12 max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              <Sparkles className="h-3 w-3" /> ESTD. 2014
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance leading-tight">
              हम सिर्फ पढ़ाते नहीं,<br />
              <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                सपनों को आकार देते हैं
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
              आकार आईएएस व्यक्तिगत मार्गदर्शन, गहन विश्लेषण और व्यापक तैयारी के माध्यम से आपकी क्षमता को प्रशासनिक सेवाओं में उत्कृष्ट सफलता में बदलने के लिए समर्पित है।
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link 
                href="/offline-courses" 
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/95 active:scale-[0.98] transition-all group"
              >
                ऑफलाइन कोर्सेज
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/online-courses" 
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3.5 rounded-xl font-semibold hover:bg-primary/5 active:scale-[0.98] transition-all group"
              >
                ऑनलाइन कोर्सेज
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Layout Grid */}
      <Section className="pt-0">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
            
            {/* Sticky Sidebar Navigation */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 space-y-6">
                <nav className="flex flex-col gap-1 p-5 bg-card border border-border/60 rounded-2xl shadow-soft">
                  <h4 className="font-mono text-xs font-bold text-primary tracking-wider uppercase mb-3 px-2">NAVIGATION</h4>
                  {[
                    { name: "हमारी कहानी", href: "#story" },
                    { name: "लक्ष्य और दृष्टिकोण", href: "#mission" },
                    { name: "आकार ही क्यों?", href: "#why-aakar" },
                    { name: "आंकड़े", href: "#stats" },
                    { name: "हमारे निदेशक", href: "#faculty" },
                    { name: "सफलता की कहानियां", href: "#success" },
                    { name: "कैंपस की झलकियां", href: "#gallery" }
                  ].map((item) => (
                    <a 
                      key={item.href} 
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted hover:text-foreground transition-all group"
                    >
                      {item.name}
                      <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    </a>
                  ))}
                </nav>

                {latestArticles?.items && latestArticles.items.length > 0 && (
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl border border-primary/10 shadow-soft">
                    <h4 className="font-mono text-xs font-bold text-primary tracking-wider uppercase mb-3">नवीनतम करेंट अफेयर्स</h4>
                    <ul className="space-y-4">
                      {latestArticles.items.map((item) => (
                        <li key={item.id} className="group">
                          <span className="block font-mono text-[10px] text-muted-foreground">
                            {formatDate(item.date, "hi")}
                          </span>
                          <Link href={item.href} className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {ads && ads.length > 0 && (
                  <ArticleAdRotator ads={ads} locale="hi" />
                )}
              </div>
            </aside>

            {/* Main Content Content */}
            <div className="col-span-12 lg:col-span-9 space-y-20 pb-20">
              
              {/* Our Story (Timeline) */}
              <section id="story" className="scroll-mt-28 space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl border-b border-border/60 pb-3">
                  हमारी कहानी (Our Story)
                </h2>
                {page && page.body && (
                  <div className="prose prose-aakar dark:prose-invert max-w-none pb-4 text-muted-foreground leading-relaxed">
                    <PortableText value={page.body} />
                  </div>
                )}
                <div className="relative pl-8 md:pl-12 border-l-2 border-primary/20 py-4 space-y-12">
                  
                  {/* Timeline 2012 */}
                  <div className="relative">
                    <div className="absolute -left-[39px] md:-left-[55px] top-1.5 w-4 h-4 bg-primary rounded-full border-4 border-background ring-4 ring-primary/15"></div>
                    <div className="max-w-2xl space-y-2">
                      <span className="inline-block font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">2014</span>
                      <h3 className="text-xl font-bold text-foreground">शुरुआत (The Seed is Sown)</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        मुखर्जी नगर में एक छोटे से कमरे में 10 छात्रों और सिविल सेवा परीक्षा की तैयारी की जटिलताओं को सरल बनाने के एक मजबूत दृष्टिकोण के साथ आकार एकेडमी की शुरुआत हुई।
                      </p>
                    </div>
                  </div>

                  {/* Timeline 2016 */}
                  <div className="relative">
                    <div className="absolute -left-[39px] md:-left-[55px] top-1.5 w-4 h-4 bg-primary/40 rounded-full border-4 border-background ring-4 ring-primary/5"></div>
                    <div className="max-w-2xl space-y-2">
                      <span className="inline-block font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">2016</span>
                      <h3 className="text-xl font-bold text-foreground">राष्ट्रव्यापी उपस्थिति</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        हमने अपना पहला प्रमुख केंद्र स्थापित किया और देश भर के छात्रों को जोड़ने के लिए एकीकृत हिंदी-अंग्रेजी टेस्ट सीरीज प्लेटफॉर्म लॉन्च किया।
                      </p>
                    </div>
                  </div>

                  {/* Timeline 2024 */}
                  <div className="relative">
                    <div className="absolute -left-[39px] md:-left-[55px] top-1.5 w-4 h-4 bg-primary/40 rounded-full border-4 border-background ring-4 ring-primary/5"></div>
                    <div className="max-w-2xl space-y-2">
                      <span className="inline-block font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">2024</span>
                      <h3 className="text-xl font-bold text-foreground">डिजिटल क्रांति का नेतृत्व</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        हमारे हाइब्रिड लर्निंग इकोसिस्टम, दैनिक करेंट अफेयर्स अपडेट और व्यक्तिगत परामर्श के माध्यम से देश भर में सालाना 50,000 से अधिक उम्मीदवारों को ऑनलाइन व ऑफलाइन सशक्त बनाना।
                      </p>
                    </div>
                  </div>

                </div>
              </section>

              {/* Mission & Vision Bento Cards */}
              <section id="mission" className="scroll-mt-28 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 md:p-10 bg-primary text-on-primary rounded-3xl shadow-lg shadow-primary/10 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-white/10 text-white">
                      <Flag className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold">हमारा लक्ष्य (Mission)</h3>
                    <p className="text-white/95 leading-relaxed text-sm md:text-base">
                      हर समर्पित उम्मीदवार को उसकी पृष्ठभूमि या आर्थिक स्थिति की परवाह किए बिना विश्व स्तरीय शिक्षा, सटीक अध्ययन सामग्री और उत्कृष्ट मार्गदर्शन प्रदान करके सिविल सेवा तैयारी का लोकतंत्रीकरण करना।
                    </p>
                  </div>
                </div>

                <div className="p-8 md:p-10 bg-card border border-border/80 rounded-3xl shadow-soft flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                      <Eye className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">हमारी दृष्टि (Vision)</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      एक ऐसे सक्षम प्रशासनिक तंत्र का निर्माण करना जहां योग्य, संवेदनशील और प्रबुद्ध युवा देश की सेवा कर सकें, और राष्ट्र के नीति निर्धारण में अपना सकारात्मक योगदान दे सकें।
                    </p>
                  </div>
                </div>
              </section>

              {/* Why Aakar */}
              <section id="why-aakar" className="scroll-mt-28 space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl border-b border-border/60 pb-3">
                  आकार ही क्यों? (Why Aakar?)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="p-6 bg-card rounded-2xl border border-border/60 shadow-soft hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                      <Brain className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">व्यक्तिगत मार्गदर्शन</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      आपके लेखन कौशल और व्यक्तित्व को निखारने के लिए विषय विशेषज्ञों और पूर्व नौकरशाहों द्वारा वन-टू-वन मेंटरशिप सत्र।
                    </p>
                  </div>

                  <div className="p-6 bg-card rounded-2xl border border-border/60 shadow-soft hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">व्यवस्थित पाठ्यक्रम</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      पिछले 12 वर्षों के प्रश्नों का गहन विश्लेषण करके तैयार की गई उच्च-उत्पादकता (High-Yield) वाली अध्ययन सामग्री।
                    </p>
                  </div>

                  <div className="p-6 bg-card rounded-2xl border border-border/60 shadow-soft hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                      <Globe className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">द्विभाषी उत्कृष्टता</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      हिंदी और अंग्रेजी दोनों माध्यमों के लिए पूर्ण और उत्कृष्ट अध्ययन संसाधन व कक्षाएं एक साथ उपलब्ध।
                    </p>
                  </div>

                </div>
              </section>

              {/* Stats Section */}
              <section id="stats" className="scroll-mt-28 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "कुल चयन (Selections)", count: "2000+" },
                  { label: "वर्षों का अनुभव", count: "12+" },
                  { label: "टेस्ट सीरीज छात्र", count: "50k+" },
                  { label: "विशेषज्ञ शिक्षक", count: "50+" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-card border border-border/60 rounded-2xl shadow-soft text-center space-y-1">
                    <div className="text-3xl md:text-4xl font-extrabold text-primary">{stat.count}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{stat.label}</div>
                  </div>
                ))}
              </section>

              {/* Our Directors Section */}
              <section id="faculty" className="scroll-mt-28 space-y-8">
                <div className="border-b border-border/60 pb-3">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    हमारे निदेशक (Our Directors)
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Letter to Students */}
                  <div className="lg:col-span-7 bg-card border-2 border-primary/20 rounded-2xl p-6 sm:p-8 relative shadow-soft overflow-hidden">
                    {/* Quotation Icon Decorator */}
                    <div className="absolute top-6 right-6 text-primary/10 select-none pointer-events-none">
                      <span className="font-serif text-8xl leading-none">“</span>
                    </div>

                    <div className="space-y-6 relative z-10">
                      {/* Quote header */}
                      <div className="flex items-center gap-3">
                        <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                          “
                        </div>
                        <h3 className="text-xl font-extrabold text-foreground">प्रिय विद्यार्थियों,</h3>
                      </div>

                      {/* Letter Body */}
                      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed text-justify">
                        <p>
                          आप ही के सामान हर युवामन स्वप्नशील होता है. उसके कुछ सपने होते है. वह जीवन में एक सफल इंसान बनना चाहता है और कुछ मुकाम पाना चाहता है. अपने इन्ही सपनो को पूरा करने के लिए वह एक क्षेत्र विशेष का चुनाव करता है. ऐसा ही एक क्षेत्र है - <span className="font-extrabold text-foreground">प्रशासनिक सेवा का क्षेत्र</span>.
                        </p>
                        <p>
                          यह क्षेत्र दशकों से अभ्यर्थियों क कैरियर और भविष्य निर्माण का केंद्र रहा है. प्रशासनिक सेवा हेतु संघ एवं राज्य लोक सेवा आयोग द्वारा प्रतियोगी परीक्षाओं का आयोजन करवाया जाता है. हर साल लाखों अभ्यर्थी प्रतियोगी परीक्षाओं में सम्मिलित होते है, लेकिन परीक्षार्थियों के समक्ष सबसे बड़ी बढ़ा <span className="font-extrabold text-foreground">विश्वसनीय मार्गदर्शन, स्तरीय अध्ययन सामग्री तथा तकनीकी समझ</span> के अभाव की होती है.
                        </p>
                        <p>
                          संघ एवं राज्य सेवा परीक्षा की तैयारी करने वाले अभ्यर्थियों के समक्ष आने वाली इन्हीं समस्याओं को ध्यान में रखते हुए <span className="font-extrabold text-primary font-devanagari">'आकार IAS'</span> में श्रेष्ठ एवं अनुभवी अध्यापकों की टीम है, जिनके द्वारा विद्यार्थियों को नियमित व गहन कक्षा-कार्यक्रम के माध्यम से नियत समय में परीक्षा की संपूर्ण एवं सारगर्भित तैयारी कराई जाती है.
                        </p>
                        <p>
                          विगत कुछ वर्षों से <span className="font-extrabold text-primary font-devanagari">'आकार IAS'</span> ने म. प्र. राज्य सेवा परीक्षा, की तैयारी कर रहे विद्यार्थियों के बीच विश्वसनीयता, समर्पण और कर्तव्यनिष्ठता का जो उदाहरण प्रस्तुत किया है, उसे आगे भी बनाये रखने हेतु संस्थान पूर्णतः संकल्पित एवं प्रतिबद्ध है.
                        </p>
                      </div>

                      {/* Signature */}
                      <div className="pt-4 border-t border-border/60 flex flex-col items-end text-right">
                        <span className="font-extrabold text-foreground text-base tracking-tight font-devanagari">'आकार IAS'</span>
                        <span className="text-xs text-muted-foreground">इंदौर (म. प्र.)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Directorate Team Card */}
                  <div className="lg:col-span-5 bg-card border border-border/60 rounded-2xl p-6 sm:p-8 shadow-soft text-center space-y-6 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-extrabold text-foreground tracking-tight">निदेशक मंडल</h3>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">अनुभवी शिक्षाविदों का नेतृत्व</p>
                    </div>

                    {/* Directors Grid inside Card */}
                    <div className="space-y-6">
                      {/* Top 2 directors */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Ashwini Kumar Mudgil */}
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-24 h-24 rounded-full border border-muted overflow-hidden shadow relative bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                            {directorImages["Ashwini Kumar Mudgil"] ? (
                              <Image src={directorImages["Ashwini Kumar Mudgil"]} alt="अश्विनी कुमार मुदगिल" fill className="object-cover animate-fade-in" sizes="96px" />
                            ) : (
                              <GraduationCap className="h-10 w-10 text-primary/60" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-foreground leading-tight">अश्विनी कुमार मुदगिल</h4>
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase mt-0.5">प्रबंध निदेशक</p>
                          </div>
                        </div>

                        {/* Atharv Tiwari */}
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-24 h-24 rounded-full border border-muted overflow-hidden shadow relative bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                            {directorImages["Atharv Tiwari"] ? (
                              <Image src={directorImages["Atharv Tiwari"]} alt="अथर्व तिवारी" fill className="object-cover animate-fade-in" sizes="96px" />
                            ) : (
                              <GraduationCap className="h-10 w-10 text-primary/60" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-foreground leading-tight">अथर्व तिवारी</h4>
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase mt-0.5">निदेशक</p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Center director */}
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-24 h-24 rounded-full border border-muted overflow-hidden shadow relative bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                          {directorImages["Gaurav Tiwari"] ? (
                            <Image src={directorImages["Gaurav Tiwari"]} alt="गौरव तिवारी" fill className="object-cover animate-fade-in" sizes="96px" />
                          ) : (
                            <GraduationCap className="h-10 w-10 text-primary/60" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-foreground leading-tight">गौरव तिवारी</h4>
                          <p className="text-[10px] text-muted-foreground font-semibold uppercase mt-0.5">निदेशक</p>
                        </div>
                      </div>
                    </div>

                    {/* Book Appointment CTA */}
                    <div className="pt-4 border-t border-border/60 space-y-3">
                      <p className="text-xs text-muted-foreground">निदेशक मंडल से सीधे मिलें</p>
                      <Button asChild className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 font-bold shadow-md gap-2 py-3 text-xs">
                        <Link href={`https://wa.me/919713300123?text=${encodeURIComponent("Hello Aakar IAS, I want to book an appointment with the directors.")}`} target="_blank" rel="noopener noreferrer">
                          <Calendar className="h-4 w-4" /> अपॉइंटमेंट बुक करें
                        </Link>
                      </Button>
                    </div>
                  </div>

                </div>
              </section>

              {/* Success Stories */}
              <section id="success" className="scroll-mt-28 space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl border-b border-border/60 pb-3">
                  सफलता की कहानियां (Success Stories)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(aboutConfig?.testimonials && aboutConfig.testimonials.length > 0
                    ? aboutConfig.testimonials
                    : [
                        { nameHi: "राहुल शर्मा (Rahul Sharma)", nameEn: "Rahul Sharma", examHi: "AIR 42, UPSC CSE 2022", examEn: "AIR 42, UPSC CSE 2022", quoteHi: "आकार आईएएस की व्यक्तिगत मेंटरशिप कार्यक्रम मेरी तैयारी का सबसे महत्वपूर्ण मोड़ साबित हुआ। विशेष रूप से हिंदी माध्यम के उम्मीदवारों के लिए इनका उत्कृष्ट कंटेंट और सटीक मार्गदर्शन लाज़वाब है।", quoteEn: "", avatar: "" },
                        { nameHi: "प्रिया गुप्ता (Priya Gupta)", nameEn: "Priya Gupta", examHi: "AIR 115, UPSC CSE 2023", examEn: "AIR 115, UPSC CSE 2023", quoteHi: "आकार की मुख्य परीक्षा टेस्ट सीरीज वास्तविक एग्जाम हॉल के वातावरण और प्रेशर को हूबहू दर्शाती है। विस्तृत इवैल्यूएशन और कॉपियों के फीडबैक ने मुख्य परीक्षा में मेरे स्कोर को बेहतर बनाने में बहुत मदद की।", quoteEn: "", avatar: "" },
                      ]
                  ).map((t, i) => {
                    const initials = (t.nameEn || t.nameHi).split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                    return (
                      <div key={i} className="p-6 md:p-8 bg-muted/30 border border-border/60 rounded-2xl italic relative space-y-4">
                        <MessageSquare className="absolute right-6 top-6 h-10 w-10 text-primary/10" />
                        <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
                          &quot;{t.quoteHi}&quot;
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                          {t.avatar ? (
                            <div className="w-10 h-10 rounded-full overflow-hidden relative">
                              <Image src={t.avatar} alt={t.nameHi} fill className="object-cover" sizes="40px" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                              {initials}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-foreground text-sm">{t.nameHi}</div>
                            <div className="text-xs text-muted-foreground">{t.examHi}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Campus Gallery */}
              <section id="gallery" className="scroll-mt-28 space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl border-b border-border/60 pb-3">
                  झलकियां (Our Campus & Library)
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {(aboutConfig?.galleryImages && aboutConfig.galleryImages.length > 0
                    ? aboutConfig.galleryImages
                    : [
                        { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWkbljz_U_Yg3A-qVn9o4nd-9SBgE1gtiHrauDragpsMgpGOLE9KNrpQGdooyg-uAfq3xoXnVVlu061irDS77Tj51kLzobRGSl-xF2pykLWDRnjtHypDvIlNfJ5XjK4gdtEfYTEA17bLwWtxqxGC50XJBlvPVvhFlxTFObDseqY3hlhFMtCll7Ko-syOJ8RP3h6vM22d2REj6iD45dpBK03wusgUdRXA_DiZPTiAj3GSqWkiII3futNm-Tb74Fuqc35OcWoKTKrbA", captionHi: "डिजिटल क्लासरूम और इंटरैक्टिव शिक्षा व्यवस्था", captionEn: "Modern Classroom Hall", layout: "large" as const },
                        { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGYMVCka8tCXwt0cmgtnTp5f6EEJL5aCF4a8jgHSxFbgsiarFBiFCVXj2vVkmXTu26irKBRgrZ2q4JMRKF413-wSt9PvhXgilsucnPmkQUt0J-lL11kPvgCuwl6r7Dc92nbxrqDloOsZMK5-yT2rMtSe0-cHjF3PRmuquR9tX2Sg0DeA9ewENaAxWAP8QOTN-Xy_t5KC59vanFrSkq5XVmpHSZ2ppZ4XB2qXMs3mYVBgrS7O555CUyORW06Q8mGsUtBR4nOk-rUvg", captionHi: "सुव्यवस्थित शांत अध्ययन पुस्तकालय", captionEn: "Premium Library", layout: "small" as const },
                        { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIe6yL4aiZXGkDkrj-e4gRwmBS3Bik42Raw3tyMRPyHLsPpgGcT4tFTnF3kYoCzew6XSbyhyiXnyfe8BvyOIyW25UOzHNMPmdMP349pbAnwq4pfWI865BLFlqidaUAVxNw8IT-aS0NHpH1ITQiOm1ke-eiaMqiPf0r8kKLfA-1Wa7OZ-Cxxfd43M4zwoUoN318AeFfZOYl3oKVwu-DuCu_HvNqnCXRNhFlG1K3y52Vx_a1beMHZ6bVHvQ9nE4H10oZ6pknLXMzU-Q", captionHi: "व्यक्तिगत मेंटरशिप और डाउट क्लीयरिंग सेशन", captionEn: "One-on-One Mentorship Session", layout: "full" as const },
                      ]
                  ).map((g, i) => {
                    const colSpan = g.layout === "full" ? "md:col-span-12" : g.layout === "small" ? "md:col-span-4" : "md:col-span-8";
                    const aspectClass = g.layout === "full" ? "aspect-[21/9] hidden md:block" : g.layout === "small" ? "aspect-square md:aspect-auto" : "aspect-[16/10]";
                    return (
                      <div key={i} className={`${colSpan} rounded-2xl overflow-hidden bg-muted border border-border/60 ${aspectClass} relative group`}>
                        <Image 
                          src={g.image} 
                          alt={g.captionEn || g.captionHi} 
                          fill
                          className="object-cover group-hover:scale-105 transition-all duration-700" 
                          sizes={g.layout === "full" ? "100vw" : g.layout === "small" ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 66vw"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <p className="text-white font-medium text-sm">{g.captionHi}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Large CTA Section */}
              <section className="p-8 md:p-12 bg-foreground text-background rounded-3xl relative overflow-hidden shadow-xl">
                <div className="relative z-10 max-w-2xl space-y-6">
                  <h2 className="text-3xl font-extrabold tracking-tight leading-tight sm:text-4xl text-background">
                    क्या आप अपनी सफलता को नया आकार देने के लिए तैयार हैं?
                  </h2>
                  <p className="text-muted opacity-90 leading-relaxed text-sm md:text-base">
                    भावी प्रशासनिक लीडर्स के अगले बैच में शामिल हों। आकार आईएएस के साथ व्यक्तिगत काउंसिलिंग प्राप्त करें और अपनी तैयारी को सही दिशा दें।
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link 
                      href="/contact" 
                      className="bg-primary text-on-primary px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:bg-primary/95 transition-all text-sm"
                    >
                      काउंसिलिंग बुक करें
                    </Link>
                    <Link 
                      href="/download" 
                      className="border border-border/40 text-background px-8 py-3.5 rounded-xl font-semibold hover:bg-background/10 transition-all text-sm"
                    >
                      ब्रोशर डाउनलोड करें
                    </Link>
                  </div>
                </div>
              </section>

            </div>

          </div>
        </Container>
      </Section>

      {/* ─── FAQ Section (Google PAA) ──────────────────────────────── */}
      <Section className="bg-muted/20">
        <Container size="narrow">
          <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4 mb-6 font-devanagari">
            आकार आईएएस के बारे में अक्सर पूछे जाने वाले प्रश्न (FAQ)
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "आकार आईएएस का मालिक कौन है?",
                a: "आकार आईएएस का नेतृत्व और संचालन इसके निदेशक मंडल (Board of Directors) द्वारा किया जाता है, जिसमें श्री अश्विनी कुमार मुदगिल (प्रबंध निदेशक), श्री अथर्व तिवारी (निदेशक), और श्री गौरव तिवारी (निदेशक) शामिल हैं। इनके कुशल मार्गदर्शन और दूरदर्शिता के अंतर्गत, आकार आईएएस इंदौर और मध्य प्रदेश का एक अत्यंत विश्वसनीय MPPSC एवं UPSC कोचिंग संस्थान बन गया है।"
              },
              {
                q: "क्या आकर आईएएस अध्ययन सामग्री प्रदान करता है?",
                a: "हाँ, आकार आईएएस व्यापक अध्ययन सामग्री प्रदान करता है जिसमें प्रिंटेड नोट्स, डिजिटल PDF, करेंट अफेयर्स मैगजीन, पिछले वर्षों के प्रश्न पत्र और विषयवार पुस्तिकाएँ शामिल हैं। सभी सामग्री MPPSC और UPSC पाठ्यक्रम के अनुसार तैयार की जाती है।"
              },
              {
                q: "Aakar IAS ऐप क्या है?",
                a: "Aakar IAS ऐप हमारा ऑफिशियल मोबाइल एप्लिकेशन है जो Android और iOS दोनों पर उपलब्ध है। इसमें लाइव और रिकॉर्डेड वीडियो लेक्चर, डेली करेंट अफेयर्स, टेस्ट सीरीज़, स्टडी PDF और पर्फॉर्मेंस एनालिटिक्स उपलब्ध हैं — जिससे छात्र कहीं से भी MPPSC और UPSC की तैयारी कर सकते हैं।"
              },
              {
                q: "इंदौर में MPPSC के लिए सबसे अच्छी ऑनलाइन कोचिंग कौन सी है?",
                a: "आकार आईएएस इंदौर के सबसे प्रतिष्ठित MPPSC कोचिंग संस्थानों में से एक है। 5,000+ छात्रों के साथ, हमारी विशेषज्ञ फैकल्टी टीम, व्यापक अध्ययन सामग्री, नियमित टेस्ट सीरीज़ और ऑनलाइन-ऑफलाइन दोनों मोड के साथ, आकार आईएएस MPPSC अभ्यर्थियों के लिए सम्पूर्ण तैयारी इकोसिस्टम प्रदान करता है।"
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-card border border-border rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex justify-between items-center list-none select-none font-bold text-foreground text-base font-devanagari">
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

      {/* FAQ JSON-LD for SEO */}
      <JsonLd data={faqJsonLd([
        { question: "आकार आईएएस का मालिक कौन है?", answer: "आकार आईएएस का नेतृत्व और संचालन इसके निदेशक मंडल (Board of Directors) द्वारा किया जाता है, जिसमें श्री अश्विनी कुमार मुदगिल (प्रबंध निदेशक), श्री अथर्व तिवारी (निदेशक), और श्री गौरव तिवारी (निदेशक) शामिल हैं।" },
        { question: "क्या आकर आईएएस अध्ययन सामग्री प्रदान करता है?", answer: "हाँ, आकार आईएएस व्यापक अध्ययन सामग्री प्रदान करता है जिसमें प्रिंटेड नोट्स, डिजिटल PDF, करेंट अफेयर्स मैगजीन, पिछले वर्षों के प्रश्न पत्र और विषयवार पुस्तिकाएँ शामिल हैं।" },
        { question: "Aakar IAS ऐप क्या है?", answer: "Aakar IAS ऐप हमारा ऑफिशियल मोबाइल एप्लिकेशन है जो Android और iOS दोनों पर उपलब्ध है।" },
        { question: "इंदौर में MPPSC के लिए सबसे अच्छी ऑनलाइन कोचिंग कौन सी है?", answer: "आकार आईएएस इंदौर के सबसे प्रतिष्ठित MPPSC कोचिंग संस्थानों में से एक है।" },
      ])} />
    </>
  );
}

