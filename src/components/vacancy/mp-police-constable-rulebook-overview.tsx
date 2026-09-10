import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle2, ShieldCheck, HelpCircle, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export function MpPoliceConstableRulebookOverview({ locale = "hi" }: { locale?: string }) {
  const isHi = locale === "hi";

  return (
    <div className="space-y-8 my-6">

      {/* 1. Job Overview Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "1. MP Police Constable भर्ती 2026 संक्षिप्त विवरण (Overview)" : "1. MP Police Constable Recruitment 2026 Overview"}
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
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "आरक्षक कॉन्स्टेबल (GD) एवं विशेष सशस्त्र बल (SAF)" : "Constable (General Duty - GD) & Special Armed Force (SAF)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "कुल पदसंख्या (Total Vacancies)" : "Total Vacancies"}</td>
                  <td className="px-4 py-3 font-extrabold text-primary">{isHi ? "7,500 पद (6,800 GD Non-SAF + 700 GD SAF Male)" : "7,500 Posts (6,800 GD Non-SAF + 700 GD SAF Male)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "शैक्षणिक योग्यता (Qualification)" : "Educational Qualification"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "10वीं उत्तीर्ण (अनुसूचित जनजाति ST अभ्यर्थी हेतु 8वीं उत्तीर्ण)" : "10th Pass (8th Pass for ST Candidates)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "आयु सीमा (Age Limit)" : "Age Limit"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "18 से 33 वर्ष (आरक्षित/महिला वर्ग हेतु 38 वर्ष तक)" : "18 to 33 Years (Up to 38 Years for Reserved/Female)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "वेतनमान (Pay Scale)" : "Pay Scale"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "Level 4: ₹ 19,500 – ₹ 62,000/- (3 वर्ष प्रोबेशन स्टाइपेंड सहित)" : "Level 4: ₹ 19,500 – ₹ 62,000/- (with 3-Year Probation Rules)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "संभावित परीक्षा तिथि (Exam Date)" : "Exam Date"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{isHi ? "19 नवंबर 2026 से प्रारंभ" : "19 November 2026 Onwards"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2. Important Dates Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
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
                  <td className="px-4 py-3 font-bold text-foreground">22.09.2026</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "ऑनलाइन आवेदन की अंतिम तिथि" : "Online Application Closing Date"}</td>
                  <td className="px-4 py-3 font-extrabold text-red-600 dark:text-red-400">06.10.2026</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "आवेदन पत्र में संशोधन की अंतिम तिथि" : "Application Form Correction End Date"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">11.10.2026</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "लिखित परीक्षा प्रारंभ तिथि" : "Written Exam Start Date"}</td>
                  <td className="px-4 py-3 font-black text-primary">{isHi ? "19.11.2026 (गुरुवार से प्रारंभ)" : "19.11.2026 (Thursday Onwards)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Vacancy Distribution Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "3. पदों का विवरण (Vacancy Breakdown)" : "3. Vacancy Distribution"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[45%]">{isHi ? "संवर्ग / कैडर (Cadre)" : "Cadre / Post Type"}</th>
                  <th scope="col" className="px-4 py-3 w-[25%]">{isHi ? "पात्रता (Eligibility)" : "Eligibility"}</th>
                  <th scope="col" className="px-4 py-3 w-[30%]">{isHi ? "कुल पदसंख्या (Posts)" : "Total Vacancies"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "आरक्षक (GD) – विशेष सशस्त्र बल छोड़कर" : "Constable (GD) – Non-SAF"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "महिला एवं पुरुष दोनों" : "Both Male & Female"}</td>
                  <td className="px-4 py-3 font-bold text-primary">6,800 {isHi ? "पद" : "Posts"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "आरक्षक (GD) – विशेष सशस्त्र बल (SAF)" : "Constable (GD) – SAF"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "केवल पुरुष अभ्यर्थी" : "Male Candidates Only"}</td>
                  <td className="px-4 py-3 font-bold text-primary">700 {isHi ? "पद" : "Posts"}</td>
                </tr>
                <tr className="bg-sky-500/10 font-bold">
                  <td className="px-4 py-3 text-foreground" colSpan={2}>{isHi ? "कुल सीधी भर्ती पद" : "Total Combined Posts"}</td>
                  <td className="px-4 py-3 text-primary text-base">7,500 {isHi ? "पद" : "Posts"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Educational Qualifications */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "4. शैक्षणिक योग्यता (Educational Qualification)" : "4. Educational Qualifications"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[35%]">{isHi ? "वर्ग / श्रेणी (Category)" : "Category"}</th>
                  <th scope="col" className="px-4 py-3 w-[65%]">{isHi ? "न्यूनतम शैक्षणिक योग्यता (Mandatory Qualification)" : "Required Qualification"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अनारक्षित (UR) / OBC / SC वर्ग" : "Unreserved (UR) / OBC / SC"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "10+2 प्रणाली के अंतर्गत 10वीं कक्षा उत्तीर्ण (Matriculation 10th Pass)" : "10th Class Pass under 10+2 system from recognized board"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अनुसूचित जनजाति (ST वर्ग)" : "Scheduled Tribe (ST Class)"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{isHi ? "8वीं कक्षा उत्तीर्ण (8th Class Pass Eligible)" : "8th Class Pass from recognized school"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "आरक्षक (रेडियो / टेक्निकल)" : "Constable (Radio / Technical)"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "12वीं उत्तीर्ण + आईटीआई (ITI) / पॉलिटेक्निक डिप्लोमा (इलेक्ट्रॉनिक्स/दूरसंचार)" : "12th Pass + ITI / Diploma in Electronics/Telecom"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Age Limit Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "5. आयु सीमा एवं छूट (Age Limit & Relaxation)" : "5. Age Limits & Relaxations"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[45%]">{isHi ? "श्रेणी (Category)" : "Category"}</th>
                  <th scope="col" className="px-4 py-3 w-[25%]">{isHi ? "न्यूनतम आयु" : "Min Age"}</th>
                  <th scope="col" className="px-4 py-3 w-[30%]">{isHi ? "अधिकतम आयु (आयु सीमा)" : "Max Age Limit"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अनारक्षित (सामान्य पुरुष)" : "Unreserved (Male)"}</td>
                  <td className="px-4 py-3 text-muted-foreground">18 {isHi ? "वर्ष" : "Years"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">33 {isHi ? "वर्ष" : "Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "म.प्र. के SC / ST / OBC पुरुष" : "MP Domicile SC / ST / OBC Male"}</td>
                  <td className="px-4 py-3 text-muted-foreground">18 {isHi ? "वर्ष" : "Years"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">38 {isHi ? "वर्ष (5 वर्ष छूट)" : "Years (5 Yrs Relaxation)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सभी वर्ग की महिला अभ्यर्थी" : "All Category Female Candidates"}</td>
                  <td className="px-4 py-3 text-muted-foreground">18 {isHi ? "वर्ष" : "Years"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">38 {isHi ? "वर्ष (5 वर्ष छूट)" : "Years (5 Yrs Relaxation)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अंतरर्जातीय विवाह एवं खेल पुरस्कार विजेता" : "Inter-caste Marriage & Sports Awardees"}</td>
                  <td className="px-4 py-3 text-muted-foreground">18 {isHi ? "वर्ष" : "Years"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">38 {isHi ? "वर्ष तक" : "Up to 38 Years"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-muted-foreground italic">
          {isHi ? "* आयु की गणना 06 अक्टूबर 2026 के आधार पर की जाएगी।" : "* Age will be calculated as on 06 October 2026."}
        </p>
      </section>

      {/* 6. Application Fee Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "6. आवेदन शुल्क (Application Fees)" : "6. Application Fee Structure"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[60%]">{isHi ? "अभ्यर्थी की श्रेणी (Category)" : "Category"}</th>
                  <th scope="col" className="px-4 py-3 w-[40%]">{isHi ? "परीक्षा शुल्क (Fee)" : "Fee Amount"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अनारक्षित (सामान्य) अभ्यर्थी" : "Unreserved (General) Candidates"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">₹ 500/-</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "मध्य प्रदेश के मूल निवासी SC / ST / OBC / EWS" : "MP Domicile SC / ST / OBC / EWS"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">₹ 250/-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {isHi ? "एमपी ऑनलाइन कियोस्क पोर्टल शुल्क ₹60 अथवा सिटिज़न यूज़र पोर्टल शुल्क ₹20 अतिरिक्त देय होगा।" : "MP Online Kiosk portal charges ₹60 or Citizen user charges ₹20 extra."}
        </p>
      </section>

      {/* 7. Selection Process & Exam Pattern */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "7. चयन प्रक्रिया एवं लिखित परीक्षा पैटर्न (Exam Pattern)" : "7. Selection Process & Written Exam Pattern"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {isHi ? "मध्य प्रदेश पुलिस आरक्षक भर्ती परीक्षा में कोई निगेटिव मार्किंग नहीं होगी। परीक्षा 2 घंटे की अवधि की होगी जिसमें 100 बहुविकल्पीय प्रश्न होंगे।" : "There is NO negative marking in MP Police Constable Written Exam. Exam duration is 2 Hours with 100 MCQs."}
        </p>

        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[50%]">{isHi ? "विषय (Subject)" : "Subject"}</th>
                  <th scope="col" className="px-4 py-3 w-[25%]">{isHi ? "प्रश्न संख्या" : "Questions"}</th>
                  <th scope="col" className="px-4 py-3 w-[25%]">{isHi ? "कुल अंक (Marks)" : "Total Marks"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "1. सामान्य ज्ञान एवं तार्किक ज्ञान (GK & Reasoning)" : "1. General Knowledge & Reasoning"}</td>
                  <td className="px-4 py-3 text-muted-foreground">40</td>
                  <td className="px-4 py-3 font-bold text-foreground">40</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "2. बौद्धिक क्षमता एवं मानसिक अभिरुचि (Intellectual Ability)" : "2. Intellectual Ability & Mental Aptitude"}</td>
                  <td className="px-4 py-3 text-muted-foreground">30</td>
                  <td className="px-4 py-3 font-bold text-foreground">30</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "3. विज्ञान एवं सरल अंकगणित (Science & Simple Arithmetic)" : "3. Science & Simple Arithmetic"}</td>
                  <td className="px-4 py-3 text-muted-foreground">30</td>
                  <td className="px-4 py-3 font-bold text-foreground">30</td>
                </tr>
                <tr className="bg-sky-500/10 font-bold">
                  <td className="px-4 py-3 text-foreground">{isHi ? "कुल योग (Total)" : "Total"}</td>
                  <td className="px-4 py-3 text-primary">100 {isHi ? "प्रश्न" : "MCQs"}</td>
                  <td className="px-4 py-3 text-primary text-base">100 {isHi ? "अंक (120 मिनट)" : "Marks (120 Mins)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. Physical Efficiency Test (PET) & Standards */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "8. शारीरिक मापदंड एवं दक्षता परीक्षा (Physical Standards & PET)" : "8. Physical Standards & PET Requirements"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[35%]">{isHi ? "वर्ग / वर्ग समूह" : "Category"}</th>
                  <th scope="col" className="px-4 py-3 w-[30%]">{isHi ? "ऊंचाई (Height)" : "Height"}</th>
                  <th scope="col" className="px-4 py-3 w-[35%]">{isHi ? "सीनाविना फुलाए / फुलाकर (Chest)" : "Chest (Normal/Expanded)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सामान्य पुरुष (General/OBC Male)" : "General/OBC Male"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">168 cm</td>
                  <td className="px-4 py-3 text-muted-foreground">79 cm / 84 cm (5 cm {isHi ? "फुलाव" : "expansion"})</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "मराठा, SC, ST पुरुष अभ्यर्थी" : "Maratha, SC, ST Male"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">165 cm</td>
                  <td className="px-4 py-3 text-muted-foreground">79 cm / 84 cm (5 cm {isHi ? "फुलाव" : "expansion"})</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "गोरखा, गढ़वाली, कुमाऊं पुरुष" : "Gorkha, Garhwali Male"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">157 cm</td>
                  <td className="px-4 py-3 text-muted-foreground">79 cm / 84 cm</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सभी वर्ग की महिला अभ्यर्थी" : "All Female Candidates"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">155 – 157 cm</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "लागू नहीं (Not Applicable)" : "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {isHi ? "* शारीरिक दक्षता परीक्षा (PET) में कम से कम 30% अंक प्राप्त करना अनिवार्य है।" : "* Minimum 30% marks in Physical Efficiency Test (PET) is mandatory for qualification."}
        </p>
      </section>

      {/* 9. Salary & Probation Stipend */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "9. वेतनमान एवं प्रोबेशन स्टाइपेंड (Salary & Stipend)" : "9. Pay Matrix & Probation Stipend"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[40%]">{isHi ? "वर्ष / अवधि (Period)" : "Probation Period"}</th>
                  <th scope="col" className="px-4 py-3 w-[60%]">{isHi ? "देय स्टाइपेंड वेतन (Stipend Salary)" : "Stipend Payable"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "प्रथम वर्ष (1st Year)" : "1st Year"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "न्यूनतम वेतनमान का 70% + अन्य भत्ते" : "70% of Base Pay + Allowances"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "द्वितीय वर्ष (2nd Year)" : "2nd Year"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "न्यूनतम वेतनमान का 80% + अन्य भत्ते" : "80% of Base Pay + Allowances"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "तृतीय वर्ष (3rd Year)" : "3rd Year"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "न्यूनतम वेतनमान का 90% + अन्य भत्ते" : "90% of Base Pay + Allowances"}</td>
                </tr>
                <tr className="bg-sky-500/10 font-bold">
                  <td className="px-4 py-3 text-foreground">{isHi ? "चतुर्थ वर्ष से (4th Year Onwards)" : "4th Year Onwards"}</td>
                  <td className="px-4 py-3 text-primary">{isHi ? "100% पूर्ण मूल वेतनमान (₹ 19,500 – ₹ 62,000/-)" : "100% Full Pay Scale (Level 4)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10. Important Internal Links for Trust & Deep Navigation */}
      <section className="space-y-4 pt-4 border-t border-border/80">
        <h3 className="text-lg font-extrabold text-foreground border-b border-border pb-2 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          {isHi ? "10. उपयोगी स्टडी मटेरियल व संबंधित भर्ती लिंक (Important Links)" : "10. Important Preparation & Vacancy Links"}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {isHi
            ? "MP Police Constable भर्ती परीक्षा 2026 की सर्वोत्तम तैयारी, सिलेबस गाइडेंस तथा मध्य प्रदेश की अन्य प्रमुख सरकारी नौकरियों से जुड़ी आधिकारिक जानकारी हेतु नीचे दिए गए महत्वपूर्ण लिंक्स अवश्य देखें:"
            : "Explore related MP state recruitment notifications, study materials, and target batches designed by Aakar IAS experts:"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <Link
            href="/notifications/mpsi-vacancy-2026-507-posts"
            className="group p-4 rounded-2xl border border-sky-400/40 bg-gradient-to-r from-sky-500/10 via-primary/5 to-transparent hover:border-primary transition-all shadow-soft space-y-1 block"
          >
            <div className="flex items-center justify-between text-xs font-bold text-primary">
              <span>{isHi ? "MP Police Sub Inspector" : "MP Police SI Vacancy"}</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-extrabold text-foreground text-sm">
              {isHi ? "MP सूबेदार एवं उप निरीक्षक (MPSI) भर्ती 2026 — 507 पद" : "MPSI Recruitment 2026 — 507 Posts Rules & Syllabus"}
            </h4>
            <p className="text-[11px] text-muted-foreground">
              {isHi ? "MPSI 2-Stage परीक्षा पैटर्न, 800m PET दौड़ व 50 अंक इंटरव्यू सम्पूर्ण गाइड" : "Detailed 2-stage exam pattern, physical standards & syllabus."}
            </p>
          </Link>

          <Link
            href="/notifications/mp-patwari-group-2-subgroup-4-bharti-2026"
            className="group p-4 rounded-2xl border border-sky-400/40 bg-gradient-to-r from-sky-500/10 via-primary/5 to-transparent hover:border-primary transition-all shadow-soft space-y-1 block"
          >
            <div className="flex items-center justify-between text-xs font-bold text-primary">
              <span>{isHi ? "MPESB Patwari Recruitment" : "MP Patwari Bharti 2026"}</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-extrabold text-foreground text-sm">
              {isHi ? "MP पटवारी एवं समूह-02 उपसमूह-04 भर्ती — 2,306 पद" : "MP Patwari & Group 2 Subgroup 4 — 2,306 Vacancies"}
            </h4>
            <p className="text-[11px] text-muted-foreground">
              {isHi ? "200 अंकों का लिखित परीक्षा पैटर्न, योग्यता एवं कट-ऑफ विश्लेषण" : "200 Marks exam structure, qualification & cutoff details."}
            </p>
          </Link>

          <Link
            href="/mppsc-current-affairs"
            className="group p-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-primary/5 to-transparent hover:border-emerald-500 transition-all shadow-soft space-y-1 block"
          >
            <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>{isHi ? "MP GK & Current Affairs" : "MP Current Affairs 2026"}</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-extrabold text-foreground text-sm">
              {isHi ? "म.प्र. समसामयिकी 2026 एवं मंथली PDF मैगज़ीन" : "MP Daily & Monthly Current Affairs PDF"}
            </h4>
            <p className="text-[11px] text-muted-foreground">
              {isHi ? "MP Constable व MPSI परीक्षा हेतु विशेष MP GK हस्तलिखित नोट्स" : "Free downloadable monthly MP current affairs notes."}
            </p>
          </Link>

          <Link
            href="/mppsc-notes"
            className="group p-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-primary/5 to-transparent hover:border-amber-500 transition-all shadow-soft space-y-1 block"
          >
            <div className="flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
              <span>{isHi ? "Aakar IAS Study Material" : "MPPSC & MP Exam Notes"}</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-extrabold text-foreground text-sm">
              {isHi ? "MPPSC & MP राज्य स्तरीय परीक्षाओं के प्रामाणिक नोट्स" : "Authentic MPPSC & State Exam Handwritten Notes"}
            </h4>
            <p className="text-[11px] text-muted-foreground">
              {isHi ? "टॉपर्स द्वारा अनुमोदित 100% सिलेबस ओरिएंटेड नोट्स" : "Topper-verified handwritten notes for state exams."}
            </p>
          </Link>
        </div>
      </section>

    </div>
  );
}
