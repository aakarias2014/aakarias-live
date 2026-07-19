"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Check, Truck, ShieldCheck, RefreshCw, ShoppingCart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { Publication } from "@/lib/content/types";

interface BookDetailsClientProps {
  book: Publication;
  relatedBooks: Publication[];
  locale: "hi" | "en";
}

export function BookDetailsClient({ book, relatedBooks, locale }: BookDetailsClientProps) {
  const isHi = locale === "hi";
  const [selectedFormat, setSelectedFormat] = useState<"hardcopy" | "ebook">("hardcopy");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "toc" | "author">("overview");
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "checking" | "available" | "error">("idle");
  const [selectedImage, setSelectedImage] = useState(book.coverImage);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) return;
    setPincodeStatus("checking");
    setTimeout(() => {
      setPincodeStatus("available");
    }, 800);
  };

  const whatsappMessage = isHi
    ? `नमस्ते आकार IAS, मैं यह पुस्तक खरीदना चाहता हूँ:\n📚 *पुस्तक का नाम:* ${book.title}\n💵 *मूल्य:* ₹${book.price || "संपर्क करें"}\n🔢 *मात्रा (Quantity):* ${quantity}\n🛠️ *प्रारूप (Format):* ${selectedFormat === "hardcopy" ? "हार्डकॉपी (घर पर डिलीवरी)" : "ई-बुक (पीडीएफ)"}`
    : `Hello Aakar IAS, I want to purchase this book:\n📚 *Book Name:* ${book.title}\n💵 *Price:* ₹${book.price || "Contact Us"}\n🔢 *Quantity:* ${quantity}\n🛠️ *Format:* ${selectedFormat === "hardcopy" ? "Hardcopy" : "E-Book (PDF)"}`;

  const whatsappUrl = `https://wa.me/919713300123?text=${encodeURIComponent(whatsappMessage)}`;

  // Default description fallback
  const descriptionText = book.description || (isHi
    ? "यह पुस्तक आकार IAS अकादमी के विशेषज्ञ शिक्षकों एवं विषय विशेषज्ञों की टीम द्वारा अत्यंत सूक्ष्म विश्लेषण के साथ परीक्षा की अद्यतन आवश्यकताओं के अनुसार तैयार की गई है।"
    : "This study guide is compiled by senior subject specialists and faculty members of Aakar IAS, tailored meticulously according to the latest syllabus and patterns of Civil Services examinations.");

  return (
    <>
      <Section className="pb-12">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Thumbnail Gallery & Main Image Banner */}
            <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4">
              
              {/* Vertical Thumbnail List */}
              <div className="flex md:flex-col gap-3 justify-center md:justify-start">
                <button 
                  onClick={() => setSelectedImage(book.coverImage)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all relative shrink-0 ${
                    selectedImage === book.coverImage ? "border-primary shadow-soft" : "border-border/60 hover:border-primary/40"
                  }`}
                >
                  {book.coverImage ? (
                    <Image
                      src={book.coverImage}
                      alt="Cover Thumbnail"
                      fill
                      sizes="128px"
                      className="object-contain p-1"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground font-bold">
                      COVER
                    </div>
                  )}
                </button>
                <button 
                  onClick={() => setSelectedImage("")}
                  className={`w-16 h-20 rounded-xl overflow-hidden border bg-muted flex flex-col items-center justify-center text-[10px] text-muted-foreground font-bold hover:bg-muted/80 transition-all shrink-0 ${
                    !selectedImage ? "border-primary ring-2 ring-primary/20" : "border-border"
                  }`}
                >
                  <span>Sample</span>
                  <span>Page 1</span>
                </button>
                <button 
                  className="w-16 h-20 rounded-xl overflow-hidden border bg-muted flex flex-col items-center justify-center text-[10px] text-muted-foreground font-bold hover:bg-muted/80 transition-all shrink-0 border-border"
                >
                  <span>Sample</span>
                  <span>Page 2</span>
                </button>
              </div>

              {/* Main Cover Image Display */}
              <div className="flex-1 bg-muted/20 border border-border/80 rounded-3xl flex items-center justify-center p-8 relative min-h-[400px] md:min-h-[500px]">
                <div className="w-64 sm:w-80 aspect-[3/4] relative shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.01]">
                  {selectedImage ? (
                    <Image
                      src={selectedImage}
                      alt={book.title}
                      fill
                      sizes="(max-width: 640px) 500px, 600px"
                      priority
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="w-full h-full bg-card p-6 flex flex-col justify-between border border-border rounded-lg shadow-inner">
                      <div>
                        <div className="h-2 w-16 bg-primary/20 rounded mb-4" />
                        <h3 className="font-extrabold text-foreground text-lg">{book.title}</h3>
                        <p className="text-xs text-muted-foreground mt-2">Sample Page Preview Content</p>
                      </div>
                      <div className="border-t border-dashed border-border pt-4 text-[10px] text-center text-muted-foreground">
                        Aakar IAS Academic Press
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                  {isHi ? "नया संस्करण" : "New Edition"}
                </div>
              </div>
            </div>

            {/* Right Side: Product Meta, Price, Tabs, Delivery & Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5 bg-emerald-600 text-white px-2.5 py-0.5 rounded text-xs font-black shadow-sm">
                    ★ {book.rating || 4.4}
                  </div>
                  <span className="text-xs text-muted-foreground font-bold">
                    {book.reviewsCount || 120} {isHi ? "रेटिंग्स और 120 समीक्षाएं" : "ratings and 120 reviews"}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                  {book.title}
                </h1>
                <p className="text-xs text-muted-foreground mt-1.5 font-bold uppercase tracking-wider">
                  {isHi ? "लेखक: आकार IAS" : "By Aakar IAS"}
                </p>
                <p className="text-sm text-muted-foreground mt-2 font-medium">
                  {isHi 
                    ? "UPSC और राज्य पीएससी परीक्षाओं के लिए संपूर्ण गाइड" 
                    : "Complete Guide for UPSC & State PSC Civil Services Examinations"}
                </p>
              </div>

              {/* Pricing */}
              <div className="py-4 border-y border-border/80 space-y-1.5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-foreground">₹{book.price || "Contact Us"}</span>
                  {book.price && (
                    <>
                      <span className="text-lg text-muted-foreground line-through font-semibold">
                        ₹{book.originalPrice || Math.round(book.price * 1.33)}
                      </span>
                      <span className="text-sm font-black text-emerald-600">
                        ({book.originalPrice && book.originalPrice > book.price 
                          ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) 
                          : 25}% OFF)
                      </span>
                    </>
                  )}
                </div>
                {book.soldOut ? (
                  <span className="inline-block text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded border border-red-100 dark:border-red-900/40">
                    {isHi ? "आउट ऑफ़ स्टॉक (Sold Out)" : "Out of Stock"}
                  </span>
                ) : (
                  <div className="text-xs font-bold text-emerald-600">
                    {isHi ? "स्टॉक में उपलब्ध है" : "In Stock"}
                  </div>
                )}
              </div>

              {/* Format selection */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
                  {isHi ? "प्रारूप चुनें (Select Format)" : "Select Format"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedFormat("hardcopy")}
                    className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200 ${
                      selectedFormat === "hardcopy"
                        ? "border-primary bg-primary/5 shadow-soft ring-2 ring-primary/20"
                        : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedFormat === "hardcopy"}
                      onChange={() => setSelectedFormat("hardcopy")}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <p className="font-bold text-foreground text-sm">{isHi ? "हार्डकॉपी बुक" : "Hardcopy Book"}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{isHi ? "घर पर डिलीवरी (5-7 दिन)" : "Home Delivery (5-7 Days)"}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedFormat("ebook")}
                    className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200 ${
                      selectedFormat === "ebook"
                        ? "border-primary bg-primary/5 shadow-soft ring-2 ring-primary/20"
                        : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedFormat === "ebook"}
                      onChange={() => setSelectedFormat("ebook")}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <p className="font-bold text-foreground text-sm">{isHi ? "ई-बुक (पीडीएफ)" : "E-Book (PDF)"}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{isHi ? "त्वरित डिजिटल एक्सेस" : "Instant Digital Access"}</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4 pt-2">
                {book.soldOut ? (
                  <Button disabled className="w-full py-6 rounded-2xl font-black bg-muted text-muted-foreground border border-border/80 text-sm uppercase tracking-wider cursor-not-allowed">
                    {isHi ? "आउट ऑफ़ स्टॉक (Sold Out)" : "Out of Stock"}
                  </Button>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-border rounded-2xl bg-card">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-3 text-muted-foreground hover:text-foreground font-extrabold text-lg transition"
                        >
                          -
                        </button>
                        <span className="px-3 font-extrabold text-foreground text-sm">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-4 py-3 text-muted-foreground hover:text-foreground font-extrabold text-lg transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Amazon Link (If exists) */}
                      {book.buyLink && (
                        <a
                          href={book.buyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none"
                        >
                          <Button variant="outline" className="w-full py-6 rounded-2xl font-bold border-border/80 hover:bg-muted text-sm flex items-center justify-center gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            {isHi ? "अमेज़न पर खरीदें" : "Buy on Amazon"}
                          </Button>
                        </a>
                      )}
                    </div>

                    {/* Side-by-side Buy Now and Add To Bag CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full py-6 rounded-2xl font-black border-primary/30 text-primary hover:bg-primary/5 text-sm uppercase tracking-wider">
                          {isHi ? "बैग में जोड़ें" : "Add To Bag"}
                        </Button>
                      </a>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 animate-pulse hover:animate-none"
                      >
                        <Button className="w-full py-6 rounded-2xl font-black bg-[#7c3aed] text-white hover:bg-[#6d28d9] shadow-md border-0 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
                          <MessageSquare className="h-5 w-5 fill-current" />
                          {isHi ? "अभी खरीदें (WhatsApp)" : "Buy Now (WhatsApp)"}
                        </Button>
                      </a>
                    </div>
                  </>
                )}
              </div>

              {/* Delivery checker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-muted/30 p-4 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
                    <Truck className="h-4 w-4 text-primary" /> {isHi ? "डिलीवरी की उपलब्धता जांचें" : "Delivery Availability"}
                  </p>
                  <form onSubmit={handleCheckPincode} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder={isHi ? "पिनकोड दर्ज करें" : "Pincode (e.g. 452001)"}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 min-w-0 px-3 py-1.5 rounded-xl border border-border text-xs focus:outline-none focus:border-primary bg-card"
                    />
                    <Button type="submit" size="sm" className="rounded-xl text-xs px-4">
                      {pincodeStatus === "checking" ? "..." : (isHi ? "जांचें" : "CHECK")}
                    </Button>
                  </form>
                  {pincodeStatus === "available" && (
                    <p className="text-[10px] text-green-700 font-extrabold mt-1.5 flex items-center gap-1">
                      <Check className="h-3 w-3" /> {isHi ? "डिलीवरी उपलब्ध है" : `Delivery available at ${pincode}`}
                    </p>
                  )}
                </div>

                {/* Info summary */}
                <div className="grid grid-cols-2 gap-3 bg-muted/30 p-4 rounded-2xl border border-border/50 text-center">
                  <div className="bg-card rounded-xl border border-border/50 p-2 flex flex-col justify-center">
                    <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">{isHi ? "कुल पृष्ठ" : "PAGES"}</span>
                    <span className="text-base font-extrabold text-foreground">{book.pages || "320+"}</span>
                  </div>
                  <div className="bg-card rounded-xl border border-border/50 p-2 flex flex-col justify-center">
                    <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">{isHi ? "माध्यम" : "MEDIUM"}</span>
                    <span className="text-base font-extrabold text-foreground">
                      {book.medium === "Hindi"
                        ? (isHi ? "हिंदी" : "Hindi")
                        : book.medium === "Bilingual"
                          ? (isHi ? "द्विभाषी" : "Bilingual")
                          : (isHi ? "अंग्रेजी" : "English")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Section */}
              <div className="bg-card border border-border/60 p-5 rounded-2xl shadow-soft">
                <h3 className="font-extrabold text-foreground mb-4 text-sm text-center uppercase tracking-wider">
                  {isHi ? "आकार IAS प्रकाशन क्यों?" : "Why Aakar IAS Publications?"}
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-1.5 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-extrabold text-foreground leading-tight">
                      {isHi ? "प्रामाणिक स्रोत" : "Authentic Content"}
                    </span>
                  </div>
                  <div className="space-y-1.5 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <RefreshCw className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-extrabold text-foreground leading-tight">
                      {isHi ? "अद्यतन सामग्री" : "Updated Material"}
                    </span>
                  </div>
                  <div className="space-y-1.5 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                    <span className="text-[10px] font-extrabold text-foreground leading-tight">
                      {isHi ? "टॉपर अनुशंसित" : "Topper Approved"}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Book Info Tabs */}
          <Section className="mt-12 border-t border-border pt-8">
            <div className="flex border-b border-border mb-6 overflow-x-auto">
              {[
                { id: "overview", label: isHi ? "विवरण (Overview)" : "Overview" },
                { id: "toc", label: isHi ? "विषय सूची" : "Table of Contents" },
                { id: "author", label: isHi ? "लेखक परिचय" : "Author Details" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 font-bold text-sm transition-all border-b-2 -mb-px shrink-0 ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="prose max-w-none text-muted-foreground leading-relaxed text-sm">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <p>{descriptionText}</p>
                  <ul className="list-disc pl-5 space-y-2 font-medium">
                    {book.features && book.features.length > 0 ? (
                      book.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))
                    ) : (
                      <>
                        <li>{isHi ? "नवीनतम परीक्षा पैटर्न और पाठ्यक्रम के अनुसार तैयार किया गया।" : "Designed strictly in accordance with the latest examination pattern and syllabus."}</li>
                        <li>{isHi ? "सरल भाषा और फ्लोचार्ट/मानचित्रों का प्रचुर उपयोग।" : "Simple, lucid language with extensive charts, flow diagrams, and maps."}</li>
                        <li>{isHi ? "अभ्यास प्रश्न और मॉडल उत्तर लेखन फ्रेमवर्क शामिल।" : "Practice questions and model answer frameworks included."}</li>
                      </>
                    )}
                  </ul>
                </div>
              )}
              {activeTab === "toc" && (
                <div className="space-y-2">
                  <p className="font-bold text-foreground">{isHi ? "अध्याय विवरण (Chapters):" : "Chapters Outline:"}</p>
                  <ol className="list-decimal pl-5 space-y-1 font-medium">
                    {book.toc && book.toc.length > 0 ? (
                      book.toc.map((chapter, index) => (
                        <li key={index}>{chapter}</li>
                      ))
                    ) : (
                      <>
                        <li>{isHi ? "इकाई 1: मूल संकल्पनाएं एवं पृष्ठभूमि" : "Unit 1: Foundations and Historical Background"}</li>
                        <li>{isHi ? "इकाई 2: विस्तृत विषय विश्लेषण" : "Unit 2: Comprehensive Core Analysis"}</li>
                        <li>{isHi ? "इकाई 3: पूर्व वर्षों के प्रश्न और उत्तर" : "Unit 3: PYQ Analysis & Answer Writing Strategies"}</li>
                      </>
                    )}
                  </ol>
                </div>
              )}
              {activeTab === "author" && (
                <p className="font-medium">
                  {book.authorDetails || (isHi
                    ? "यह पुस्तक आकार IAS अकादमी के संबंधित विषय-विशेषज्ञों और वरिष्ठ संकाय सदस्यों के मार्गदर्शन में तैयार की गई है, जिन्हें सिविल सेवा परीक्षा अध्यापन का वर्षों का समृद्ध अनुभव है।"
                    : "This publication is prepared under the guidance of core subject experts and senior faculty members of Aakar IAS Academy who possess years of rich teaching experience.")}
                </p>
              )}
            </div>
          </Section>

          {/* Related Publications Carousel */}
          {relatedBooks.length > 0 && (
            <Section className="mt-12 border-t border-border pt-12">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground">{isHi ? "अन्य प्रकाशन" : "Related Publications"}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{isHi ? "आकार IAS के अन्य महत्वपूर्ण अध्ययन ग्रन्थ" : "Other essential preparation materials by Aakar IAS"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedBooks.map((b) => (
                  <Link href={(isHi ? "/publications/" : "/en/publications/") + b.slug} key={b.id} className="group cursor-pointer">
                    <div className="bg-muted/30 rounded-2xl p-4 mb-3 border border-border/50 transform group-hover:-translate-y-1 transition-all shadow-soft flex items-center justify-center aspect-[3/4] relative overflow-hidden">
                      {b.coverImage ? (
                        <Image src={b.coverImage} alt={b.title} fill sizes="300px" className="object-contain p-1" />
                      ) : (
                        <span className="text-xs text-muted-foreground">Book Cover</span>
                      )}
                    </div>
                    <h4 className="font-bold text-foreground text-sm truncate group-hover:text-primary transition-colors">{b.title}</h4>
                    <p className="text-primary font-bold text-xs mt-0.5">₹{b.price || "Contact Us"}</p>
                  </Link>
                ))}
              </div>
            </Section>
          )}

        </Container>
      </Section>
    </>
  );
}
