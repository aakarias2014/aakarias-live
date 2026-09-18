import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle2, ShieldCheck, HelpCircle, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export function MpPoliceStenoAsiRulebookOverview({ locale = "hi" }: { locale?: string }) {
  const isHi = locale === "hi";

  return (
    <div className="space-y-8 my-6">

      {/* 1. Job Overview Table */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
          {isHi ? "1. MP पुलिस सूबेदार (शीघ्रलेखक) व ASI भर्ती 2026 संक्षिप्त विवरण" : "1. MP Police Subedar Steno & ASI Recruitment 2026 Overview"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[35%]">{isHi ? "सुविधा / नियम (Feature)" : "Feature"}</th>
                  <th scope="col" className="px-4 py-3 w-[65%]">{isHi ? "विवरण (Details)" : "Details"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "भर्ती बोर्ड (Authority)" : "Recruitment Board"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "मध्य प्रदेश कर्मचारी चयन मण्डल (MPESB), भोपाल एवं पुलिस मुख्यालय गृह विभाग" : "MP Employees Selection Board (MPESB), Bhopal & Police HQ"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "पद का नाम (Post Name)" : "Post Name"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "सूबेदार (अनुसचिवीय)-शीघ्रलेखक एवं सहायक उप निरीक्षक (अनुसचिवीय)" : "Subedar (Secretarial) Steno & Assistant Sub Inspector (Secretarial)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "कुल पदसंख्या (Total Vacancies)" : "Total Vacancies"}</td>
                  <td className="px-4 py-3 font-extrabold text-primary">{isHi ? "655 पद (135 सूबेदार + 520 ASI)" : "655 Posts (135 Subedar + 520 ASI)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "शैक्षणिक योग्यता (Qualification)" : "Educational Qualification"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "10+2, CPCT (हिंदी टाइपिंग), हिंदी आशुलिपि 100 wpm (सूबेदार हेतु), कंप्यूटर डिप्लोमा/डिग्री" : "10+2, CPCT (Hindi Typing), Hindi Shorthand 100 wpm (Subedar), Computer Diploma/Degree"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "आयु सीमा (Age Limit)" : "Age Limit"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "18 से 33 वर्ष (म.प्र. आरक्षित व सभी वर्ग की महिलाओं हेतु 38 से 43 वर्ष)" : "18 to 33 Years (Up to 38-43 Years for MP Reserved/Female)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "वेतनमान (Pay Scale)" : "Pay Scale"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "सूबेदार: ₹ 36,200 – ₹ 1,14,800 | ASI: ₹ 19,500 – ₹ 62,000" : "Subedar: ₹ 36,200 – ₹ 1,14,800 | ASI: ₹ 19,500 – ₹ 62,000"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "लिखित परीक्षा तिथि (Exam Date)" : "Exam Date"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{isHi ? "03 नवंबर 2026, मंगलवार से प्रारंभ" : "03 November 2026 Onwards"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2. Important Dates Table */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
          {isHi ? "2. महत्वपूर्ण तिथियां (Important Dates)" : "2. Important Dates & Schedule"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[55%]">{isHi ? "घटना / कार्य (Event)" : "Event"}</th>
                  <th scope="col" className="px-4 py-3 w-[45%]">{isHi ? "निर्धारित तिथि (Date)" : "Date"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "ऑनलाइन आवेदन प्रारंभ तिथि" : "Online Application Start Date"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">24.09.2026</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "ऑनलाइन आवेदन की अंतिम तिथि" : "Online Application Closing Date"}</td>
                  <td className="px-4 py-3 font-extrabold text-red-600 dark:text-red-400">08.10.2026</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "आवेदन पत्र में संशोधन प्रारंभ तिथि" : "Application Form Correction Start Date"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">24.09.2026</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "आवेदन पत्र में संशोधन की अंतिम तिथि" : "Application Form Correction End Date"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">13.10.2026</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "प्रथम चरण लिखित परीक्षा प्रारंभ तिथि" : "Written Exam Start Date"}</td>
                  <td className="px-4 py-3 font-black text-primary">{isHi ? "03.11.2026 (मंगलवार से प्रारंभ)" : "03.11.2026 (Tuesday Onwards)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Shift Timings Box */}
        <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-2">
          <h4 className="font-bold text-foreground text-sm">
            {isHi ? "📌 परीक्षा पालियां (Shift Timings - 03.11.2026)" : "📌 Exam Shift Timings"}
          </h4>
          <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
            <li>
              {isHi ? (
                <><strong>प्रथम पाली:</strong> अभ्यर्थियों का रिपोर्टिंग समय प्रातः 08:00 से 09:00 बजे | उत्तर अंकन समय: प्रातः 10:00 से 12:00 बजे (2 घंटे)</>
              ) : (
                <><strong>Shift 1:</strong> Reporting Time 08:00 AM to 09:00 AM | Exam Time: 10:00 AM to 12:00 PM (2 Hours)</>
              )}
            </li>
            <li>
              {isHi ? (
                <><strong>द्वितीय पाली:</strong> अभ्यर्थियों का रिपोर्टिंग समय दोपहर 01:00 से 02:00 बजे | उत्तर अंकन समय: दोपहर 03:00 से 05:00 बजे (2 घंटे)</>
              ) : (
                <><strong>Shift 2:</strong> Reporting Time 01:00 PM to 02:00 PM | Exam Time: 03:00 PM to 05:00 PM (2 Hours)</>
              )}
            </li>
          </ul>
        </div>
      </section>

      {/* 3. Vacancy Distribution Table */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
          {isHi ? "3. रिक्त पदों का विवरण (Post Code Wise Breakup - Total 655 Posts)" : "3. Vacancy Breakdown (655 Posts)"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-3 py-3 w-[15%]">{isHi ? "पोस्ट कोड" : "Post Code"}</th>
                  <th scope="col" className="px-3 py-3 w-[45%]">{isHi ? "पद का नाम" : "Post Name"}</th>
                  <th scope="col" className="px-3 py-3 w-[25%]">{isHi ? "शाखा / इकाई" : "Branch / Unit"}</th>
                  <th scope="col" className="px-3 py-3 w-[15%] text-right">{isHi ? "कुल पद" : "Total Posts"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-3 py-3 font-bold text-primary">01</td>
                  <td className="px-3 py-3 font-semibold text-foreground">{isHi ? "सूबेदार (अनुसचिवीय) – शीघ्रलेखक" : "Subedar (Secretarial) – Stenographer"}</td>
                  <td className="px-3 py-3 text-muted-foreground">{isHi ? "सामान्य शाखा" : "General Branch"}</td>
                  <td className="px-3 py-3 font-extrabold text-foreground text-right">125</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-3 py-3 font-bold text-primary">02</td>
                  <td className="px-3 py-3 font-semibold text-foreground">{isHi ? "सूबेदार (अनुसचिवीय) – शीघ्रलेखक" : "Subedar (Secretarial) – Stenographer"}</td>
                  <td className="px-3 py-3 text-muted-foreground">{isHi ? "विशेष शाखा" : "Special Branch"}</td>
                  <td className="px-3 py-3 font-extrabold text-foreground text-right">10</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-3 py-3 font-bold text-primary">03</td>
                  <td className="px-3 py-3 font-semibold text-foreground">{isHi ? "सहायक उप निरीक्षक (अनुसचिवीय)" : "Assistant Sub Inspector (Secretarial)"}</td>
                  <td className="px-3 py-3 text-muted-foreground">{isHi ? "सामान्य शाखा" : "General Branch"}</td>
                  <td className="px-3 py-3 font-extrabold text-foreground text-right">100</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-3 py-3 font-bold text-primary">04</td>
                  <td className="px-3 py-3 font-semibold text-foreground">{isHi ? "सहायक उप निरीक्षक (अनुसचिवीय)" : "Assistant Sub Inspector (Secretarial)"}</td>
                  <td className="px-3 py-3 text-muted-foreground">{isHi ? "मैदानी इकाई" : "Executive / Field Unit"}</td>
                  <td className="px-3 py-3 font-extrabold text-foreground text-right">370</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-3 py-3 font-bold text-primary">05</td>
                  <td className="px-3 py-3 font-semibold text-foreground">{isHi ? "सहायक उप निरीक्षक (अनुसचिवीय)" : "Assistant Sub Inspector (Secretarial)"}</td>
                  <td className="px-3 py-3 text-muted-foreground">{isHi ? "विशेष शाखा" : "Special Branch"}</td>
                  <td className="px-3 py-3 font-extrabold text-foreground text-right">25</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-3 py-3 font-bold text-primary">06</td>
                  <td className="px-3 py-3 font-semibold text-foreground">{isHi ? "सहायक उप निरीक्षक (अनुसचिवीय)" : "Assistant Sub Inspector (Secretarial)"}</td>
                  <td className="px-3 py-3 text-muted-foreground">{isHi ? "अपराध अनुसंधान विभाग (CID)" : "Crime Investigation Dept (CID)"}</td>
                  <td className="px-3 py-3 font-extrabold text-foreground text-right">25</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs sm:text-sm leading-relaxed text-amber-950 dark:text-amber-100">
          <strong>{isHi ? "आरक्षण व अधिवास नियम (Domicile Rules):" : "Domicile & Reservation Rules:"}</strong>{" "}
          {isHi
            ? "मध्य प्रदेश के बाहर (अन्य राज्यों) के अभ्यर्थी केवल अनारक्षित (Open) श्रेणी के अंतर्गत आवेदन कर सकेंगे। उन्हें आरक्षण व आयु छूट का लाभ नहीं मिलेगा तथा 08.10.2026 को अधिकतम आयु 33 वर्ष निर्धारित है। वर्टिकल आरक्षण: UR 27%, OBC 27%, SC 16%, ST 20%, EWS 10% | हॉरिजॉन्टल आरक्षण: महिला 35% एवं भूतपूर्व सैनिक 10%।"
            : "Candidates from outside Madhya Pradesh (Non-MP Domicile) can apply strictly under Unreserved (Open) category only, without reservation or age relaxations, with max age 33 years as on 08.10.2026. Vertical Reservation: UR 27%, OBC 27%, SC 16%, ST 20%, EWS 10% | Horizontal Reservation: Female 35%, Ex-Servicemen 10%."}
        </div>
      </section>

      {/* 4. Educational Qualifications */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
          {isHi ? "4. शैक्षणिक योग्यता (Educational Qualification)" : "4. Educational Qualifications"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-soft">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-bold">
              {isHi ? "सूबेदार (अनुसचिवीय) – शीघ्रलेखक (135 पद)" : "Subedar (Secretarial) – Stenographer (135 Posts)"}
            </Badge>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 list-disc pl-5">
              <li>{isHi ? "हायर सेकेंडरी परीक्षा (10+2) उत्तीर्ण होना अनिवार्य।" : "Higher Secondary (10+2) pass mandatory."}</li>
              <li>{isHi ? "मध्यप्रदेश मान्यता प्राप्त संस्था से हिंदी आशुलिपि (शॉर्ट-हैंड) 100 शब्द प्रति मिनट परीक्षा उत्तीर्ण।" : "Passed Hindi Shorthand 100 wpm exam from MP recognized institution."}</li>
              <li>{isHi ? "विज्ञान एवं प्रौद्योगिकी विभाग द्वारा आयोजित CPCT परीक्षा हिंदी टाइपिंग सहित उत्तीर्ण होना अनिवार्य।" : "Mandatory CPCT pass certificate with Hindi Typing."}</li>
              <li>{isHi ? "DOEACC डिप्लोमा / COPA (ITI) / पॉलिटेक्निक कंप्यूटर कोर्स / कंप्यूटर डिप्लोमा में से कोई एक।" : "Any one of DOEACC Diploma / COPA (ITI) / Polytechnic Computer Course / Computer Diploma."}</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-soft">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-bold">
              {isHi ? "सहायक उप निरीक्षक (अनुसचिवीय) (520 पद)" : "Assistant Sub Inspector (Secretarial) (520 Posts)"}
            </Badge>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 list-disc pl-5">
              <li>{isHi ? "उच्चतर माध्यमिक परीक्षा (10+2) उत्तीर्ण होना अनिवार्य।" : "Higher Secondary (10+2) pass mandatory."}</li>
              <li>{isHi ? "विज्ञान एवं प्रौद्योगिकी विभाग द्वारा आयोजित CPCT परीक्षा हिंदी टाइपिंग सहित उत्तीर्ण होना अनिवार्य।" : "Mandatory CPCT pass certificate with Hindi Typing."}</li>
              <li>{isHi ? "इंजीनियरिंग डिग्री / BCA / B.Sc / M.Sc (CS/IT) या AICTE अनुमोदित पॉलिटेक्निक डिप्लोमा / DOEACC / COPA / कंप्यूटर डिप्लोमा में से कोई एक।" : "Engineering Degree / BCA / B.Sc / M.Sc (CS/IT) or AICTE Polytechnic Diploma / DOEACC / COPA / Computer Diploma."}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Age Limit Table */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
          {isHi ? "5. आयु सीमा (Age Limit as on 08.10.2026)" : "5. Age Limit Requirements"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[65%]">{isHi ? "श्रेणी (Category)" : "Category"}</th>
                  <th scope="col" className="px-4 py-3 w-[35%]">{isHi ? "अधिकतम आयु (Max Age)" : "Maximum Age"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "पुरुष (म.प्र. अनारक्षित Open)" : "Male (MP Unreserved Open)"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "33 वर्ष" : "33 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "पुरुष (म.प्र. EWS)" : "Male (MP EWS)"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "33 वर्ष" : "33 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अन्य प्रदेश के सभी अभ्यर्थी (पुरुष / महिला)" : "Other State Candidates (Male / Female)"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "33 वर्ष" : "33 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "महिला अभ्यर्थी (सभी श्रेणी - म.प्र. अधिवास)" : "Female Candidates (All Categories - MP Domicile)"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{isHi ? "38 वर्ष" : "38 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "पुरुष (आरक्षित श्रेणी – SC/ST/OBC म.प्र. निवासी)" : "Male (Reserved SC/ST/OBC MP Domicile)"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{isHi ? "38 वर्ष" : "38 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "शासकीय / निगम / मंडल कर्मचारी (पुरुष)" : "Govt / Corporation / Board Employees (Male)"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "38 वर्ष" : "38 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अंतर्जातीय विवाह प्रोत्साहन योजना (महिला)" : "Inter-caste Marriage Scheme (Female)"}</td>
                  <td className="px-4 py-3 font-bold text-primary">{isHi ? "43 वर्ष" : "43 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "विक्रम पुरस्कार विजेता (महिला / आरक्षित पुरुष)" : "Vikram Award Winners (Female / Reserved Male)"}</td>
                  <td className="px-4 py-3 font-bold text-primary">{isHi ? "43 वर्ष" : "43 Years"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Application Fee Table */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
          {isHi ? "6. आवेदन शुल्क (Application Fee Structure)" : "6. Application Fees"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[45%]">{isHi ? "श्रेणी (Category)" : "Category"}</th>
                  <th scope="col" className="px-4 py-3 w-[30%]">{isHi ? "सीधी भर्ती शुल्क" : "Direct Recruitment Fee"}</th>
                  <th scope="col" className="px-4 py-3 w-[25%]">{isHi ? "विभागीय परीक्षा शुल्क" : "Departmental Exam Fee"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अनारक्षित (General / UR)" : "Unreserved (General / UR)"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">₹ 500/-</td>
                  <td className="px-4 py-3 text-muted-foreground">₹ 200/-</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "SC / ST / OBC / EWS (केवल म.प्र. मूल निवासी)" : "SC / ST / OBC / EWS (MP Domicile Only)"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">₹ 250/-</td>
                  <td className="px-4 py-3 text-muted-foreground">₹ 100/-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {isHi ? "* MP ऑनलाइन कियोस्क पोर्टल शुल्क ₹ 60/- देय होगा। रजिस्टर्ड सिटीजन यूजर लॉगिन द्वारा आवेदन भरने पर पोर्टल शुल्क ₹ 20/- देय होगा।" : "* MP Online Kiosk portal fee is ₹60. Portal fee via Registered Citizen Login is ₹20."}
        </p>
      </section>

      {/* 7. Selection Process */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
          {isHi ? "7. चयन प्रक्रिया (Selection Process - 2 Stages)" : "7. Selection Process (2 Stages)"}
        </h3>
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-soft">
            <h4 className="font-extrabold text-foreground text-base">
              {isHi ? "प्रथम चरण – ऑनलाइन लिखित परीक्षा (100 अंक)" : "Stage 1 – Online Written Examination (100 Marks)"}
            </h4>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
              <li>{isHi ? "वस्तुनिष्ठ प्रकार की परीक्षा (MCQs), कुल 100 प्रश्न | समय: 2 घंटे | कुल अंक: 100" : "Objective MCQs, Total 100 Questions | Duration: 2 Hours | Total Marks: 100"}</li>
              <li>{isHi ? "सही उत्तर पर +1 अंक। गलत या अनुत्तरित प्रश्न पर कोई ऋणात्मक अंकन (No Negative Marking) नहीं है।" : "Correct answer +1 mark. NO Negative Marking for incorrect or unattempted questions."}</li>
              <li>{isHi ? "कुल विज्ञापित पदों की संख्या से 7 गुना अभ्यर्थियों को द्वितीय चरण (प्रायोगिक कौशल परीक्षा) हेतु शॉर्टलिस्ट किया जाएगा।" : "Candidates equal to 7 times total vacancies will be shortlisted for Stage 2 Skill Test."}</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-soft">
            <h4 className="font-extrabold text-foreground text-base">
              {isHi ? "द्वितीय चरण – दस्तावेज परीक्षण + प्रायोगिक कौशल परीक्षा (Skill Test - 100 अंक)" : "Stage 2 – Document Verification + Practical Skill Test (100 Marks)"}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-muted-foreground">
              <div className="p-3 bg-muted/40 rounded-xl border border-border/40">
                <strong className="text-foreground block mb-1">
                  {isHi ? "सूबेदार (शीघ्रलेखक) – अनुसूची-एक (100 अंक):" : "Subedar (Stenographer) – Schedule-1 (100 Marks):"}
                </strong>
                {isHi
                  ? "कुल अवधि 1 घंटा, न्यूनतम अर्हक अंक: 30 अंक। हिंदी आशुलिपि श्रुतलेख (Dictation) 100 शब्द प्रति मिनट की गति से 5 मिनट के दो श्रुतलेख। कंप्यूटर पर अनुलिपि टंकण हेतु 20 मिनट समय। श्रुतलेख 10 अंक प्रत्येक तथा अनुलिपि टंकण 40 अंक प्रत्येक।"
                  : "Total duration 1 Hour, Qualifying marks: 30 Marks. Two 5-minute Hindi Shorthand dictations at 100 wpm. 20 minutes for computer transcription. Dictation 10 marks each & transcription typing 40 marks each."}
              </div>

              <div className="p-3 bg-muted/40 rounded-xl border border-border/40">
                <strong className="text-foreground block mb-1">
                  {isHi ? "सहायक उप निरीक्षक (अनुसचिवीय) – अनुसूची-दो (100 अंक):" : "Assistant Sub Inspector (Secretarial) – Schedule-2 (100 Marks):"}
                </strong>
                {isHi
                  ? "कुल अवधि 1 घंटा, न्यूनतम अर्हक अंक: 30 अंक। हिंदी टंकण परीक्षा: 600 शब्दों के दो पैराग्राफ, प्रत्येक पैराग्राफ 30 मिनट में कंप्यूटर पर टाइप करना होगा (प्रत्येक पैराग्राफ अधिकतम 50 अंक)।"
                  : "Total duration 1 Hour, Qualifying marks: 30 Marks. Hindi Typing Test: Two 600-word paragraphs, 30 minutes each on computer (50 marks max per paragraph)."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Exam Syllabus Table */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
          {isHi ? "8. प्रथम चरण लिखित परीक्षा पाठ्यक्रम (Syllabus - 100 Marks)" : "8. Written Exam Syllabus"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[70%]">{isHi ? "विषय (Subject)" : "Subject"}</th>
                  <th scope="col" className="px-4 py-3 w-[30%] text-right">{isHi ? "अंक (Marks)" : "Marks"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सामान्य ज्ञान एवं तार्किक ज्ञान (General Knowledge & Reasoning)" : "General Knowledge & Logical Reasoning"}</td>
                  <td className="px-4 py-3 font-extrabold text-foreground text-right">{isHi ? "40 अंक" : "40 Marks"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "बौद्धिक क्षमता एवं मानसिक अभिरुचि (Intellectual Ability & Mental Aptitude)" : "Intellectual Ability & Mental Aptitude"}</td>
                  <td className="px-4 py-3 font-extrabold text-foreground text-right">{isHi ? "30 अंक" : "30 Marks"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "विज्ञान एवं सरल अंक गणित (Science & Simple Arithmetic)" : "Science & Simple Arithmetic"}</td>
                  <td className="px-4 py-3 font-extrabold text-foreground text-right">{isHi ? "30 अंक" : "30 Marks"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. Physical Standards Table */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
          {isHi ? "9. शारीरिक मानक (Physical Height Standards)" : "9. Physical Height Standards"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[40%]">{isHi ? "पद का नाम" : "Post Name"}</th>
                  <th scope="col" className="px-4 py-3 w-[30%]">{isHi ? "वर्ग" : "Gender / Category"}</th>
                  <th scope="col" className="px-4 py-3 w-[30%]">{isHi ? "न्यूनतम ऊंचाई (Height)" : "Minimum Height"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सूबेदार (शीघ्रलेखक)" : "Subedar (Stenographer)"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "पुरुष (Male)" : "Male"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "162 सेमी" : "162 cm"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सूबेदार (शीघ्रलेखक)" : "Subedar (Stenographer)"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "महिला (Female)" : "Female"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "152 सेमी" : "152 cm"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सहायक उप निरीक्षक (ASI)" : "Assistant Sub Inspector (ASI)"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "पुरुष (Male)" : "Male"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "162 सेमी" : "162 cm"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सहायक उप निरीक्षक (ASI)" : "Assistant Sub Inspector (ASI)"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "महिला (Female)" : "Female"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "152 सेमी" : "152 cm"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 list-disc pl-5">
          <li>{isHi ? "सीने का माप लागू नहीं है (ये सचिवीय/क्लर्कीय प्रकृति के पद हैं)।" : "Chest measurement NOT applicable (Secretarial / Clerical posts)."}</li>
          <li>{isHi ? "दृष्टि: बिना चश्मे के 6/9 से कम नहीं तथा दूसरी आंख 6/12 से कम नहीं होनी चाहिए।" : "Vision: Minimum 6/9 in main eye and 6/12 in second eye without glasses."}</li>
          <li>{isHi ? "नॉक-नी व फ्लैट फुट की समस्या नहीं होनी चाहिए। शारीरिक मानकों में छूट देय नहीं होगी।" : "Must not have knock-knees or flat-feet. No relaxation in physical height standards."}</li>
        </ul>
      </section>

      {/* 10. Pay Scale Table */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">
          {isHi ? "10. वेतनमान (Pay Scale & Stipend)" : "10. Pay Scale Details"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[55%]">{isHi ? "पद का नाम" : "Post Name"}</th>
                  <th scope="col" className="px-4 py-3 w-[45%]">{isHi ? "वेतनमान (Pay Matrix)" : "Pay Scale (Level Matrix)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सूबेदार (अनुसचिवीय) – शीघ्रलेखक" : "Subedar (Secretarial) – Stenographer"}</td>
                  <td className="px-4 py-3 font-bold text-primary">₹ 36,200 – ₹ 1,14,800</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सहायक उप निरीक्षक (अनुसचिवीय)" : "Assistant Sub Inspector (Secretarial)"}</td>
                  <td className="px-4 py-3 font-bold text-primary">₹ 19,500 – ₹ 62,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {isHi ? "* परिवीक्षा अवधि में स्टायपेंड: प्रथम वर्ष नियत वेतन का 70%, द्वितीय वर्ष 80%, तृतीय वर्ष 90%।" : "* Probation Stipend: 70% in 1st year, 80% in 2nd year, 90% in 3rd year."}
        </p>
      </section>

      {/* 11. Important Interlinks & Exam Preparation Hub */}
      <section className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          {isHi ? "11. मध्य प्रदेश पुलिस व MPPSC परीक्षा तैयारी हब (Quick Links)" : "11. Exam Preparation Hub & Important Links"}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isHi
            ? "आकार IAS द्वारा MP पुलिस, MPPSC एवं व्यापम (ESB) परीक्षाओं की सर्वोत्कृष्ट तैयारी हेतु नीचे दिए गए महत्वपूर्ण लिंक्स का अवलोकन करें:"
            : "Explore top study resources, syllabus breakdowns, and related recruitment notifications curated by Aakar IAS:"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Link
            href={isHi ? "/notifications/mp-police-constable-recruitment-2026" : "/en/notifications/mp-police-constable-recruitment-2026"}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/60 hover:border-primary/50 hover:bg-sky-500/5 transition-all group"
          >
            <span className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors">
              👮 MP Police Constable Bharti 2026 (7,500 Posts)
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
          </Link>

          <Link
            href={isHi ? "/notifications/mpsi-recruitment-2026" : "/en/notifications/mpsi-recruitment-2026"}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/60 hover:border-primary/50 hover:bg-sky-500/5 transition-all group"
          >
            <span className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors">
              ⭐ MPSI Bharti 2026 (Sub Inspector 507 Posts)
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
          </Link>

          <Link
            href={isHi ? "/mppsc-notes" : "/en/mppsc-notes"}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/60 hover:border-primary/50 hover:bg-sky-500/5 transition-all group"
          >
            <span className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors">
              📚 MPPSC Notes & Study Material 2026
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
          </Link>

          <Link
            href={isHi ? "/mppsc/prelims-syllabus" : "/en/mppsc/prelims-syllabus"}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/60 hover:border-primary/50 hover:bg-sky-500/5 transition-all group"
          >
            <span className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors">
              📜 MPPSC Prelims Detailed Syllabus 2026
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
          </Link>

          <Link
            href={isHi ? "/online-courses" : "/en/online-courses"}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/60 hover:border-primary/50 hover:bg-sky-500/5 transition-all group"
          >
            <span className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors">
              🏆 Aakar IAS Online Courses & Batches
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
          </Link>

          <Link
            href={isHi ? "/general-awareness" : "/en/general-awareness"}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/60 hover:border-primary/50 hover:bg-sky-500/5 transition-all group"
          >
            <span className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors">
              🌐 General Awareness & Static GK Notes
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
          </Link>
        </div>
      </section>

    </div>
  );
}
