import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export function MpsiRulebookOverview({ locale = "hi" }: { locale?: string }) {
  const isHi = locale === "hi";

  return (
    <div className="space-y-8 my-6">

      {/* 1. Job Overview Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "1. MP Police MPSI भर्ती 2026 संक्षिप्त विवरण (Overview)" : "1. MP Police MPSI Recruitment 2026 Overview"}
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
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "भर्ती बोर्ड (Authority)" : "Recruitment Authority"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "मध्य प्रदेश कर्मचारी चयन मण्डल (MPESB), भोपाल एवं गृह (पुलिस) विभाग" : "Madhya Pradesh Employee Selection Board (MPESB), Bhopal & Home Police Dept."}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "परीक्षा का नाम (Exam Name)" : "Exam Name"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "सूबेदार एवं उप निरीक्षक (MPSI) संवर्ग चयन परीक्षा-2026" : "Subedar & Sub Inspector (MPSI) Cadre Selection Exam 2026"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "कुल पदसंख्या (Total Posts)" : "Total Vacancies"}</td>
                  <td className="px-4 py-3 font-bold text-primary">{isHi ? "507 पद (462 गैर-तकनीकी, 45 तकनीकी)" : "507 Posts (462 Non-Tech, 45 Tech)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "वेतनमान (Pay Scale)" : "Pay Scale"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "Level 9: ₹ 36,200 – ₹ 1,14,800/- (3 वर्ष स्टायपेंड नियम सहित)" : "Level 9: ₹ 36,200 – ₹ 1,14,800/- (with 3-Year Stipend Rules)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "परीक्षा तिथि (Exam Date)" : "Exam Date"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{isHi ? "28 अक्टूबर 2026 (बुधवार से प्रारंभ)" : "28 October 2026 (Wednesday onwards)"}</td>
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
                  <th scope="col" className="px-4 py-3 w-[55%]">{isHi ? "कार्य / घटना (Event)" : "Event / Activity"}</th>
                  <th scope="col" className="px-4 py-3 w-[45%]">{isHi ? "निर्धारित तिथि (Date)" : "Date"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "ऑनलाइन आवेदन प्रारंभ तिथि" : "Online Application Start Date"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">09.09.2026</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "ऑनलाइन आवेदन की अंतिम तिथि" : "Online Application Closing Date"}</td>
                  <td className="px-4 py-3 font-extrabold text-red-600 dark:text-red-400">23.09.2026</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "आवेदन में संशोधन प्रारंभ तिथि" : "Application Modification Start"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">09.09.2026</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "आवेदन में संशोधन की अंतिम तिथि" : "Application Modification End"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">28.09.2026</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "परीक्षा तिथि" : "Exam Start Date"}</td>
                  <td className="px-4 py-3 font-black text-primary">{isHi ? "28.10.2026 (बुधवार से प्रारंभ)" : "28.10.2026 (Wednesday Onwards)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Shift details */}
        <div className="rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50/50 dark:bg-sky-950/20 p-4 text-xs text-muted-foreground space-y-1">
          <p className="font-extrabold text-foreground text-sm">{isHi ? "⏰ परीक्षा पालियां (Exam Shifts):" : "⏰ Exam Shifts Timing:"}</p>
          <p>{isHi ? "• प्रथम पाली: रिपोर्टिंग समय प्रातः 08:00–09:00, उत्तर अंकन प्रातः 10:00–12:00 बजे" : "• Shift 1: Reporting 08:00–09:00 AM, Exam 10:00 AM–12:00 PM"}</p>
          <p>{isHi ? "• द्वितीय पाली: रिपोर्टिंग समय दोप. 01:00–02:00, उत्तर अंकन दोपहर 03:00–05:00 बजे" : "• Shift 2: Reporting 01:00–02:00 PM, Exam 03:00 PM–05:00 PM"}</p>
        </div>
      </section>

      {/* 3. Vacancy Distribution Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "3. रिक्त पदों का विवरण (कुल: 507 पद)" : "3. Vacancy Breakdown (Total: 507 Posts)"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Non-Technical Posts */}
          <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
            <div className="bg-[#6ac7f2] dark:bg-[#20698f] px-4 py-2.5 font-extrabold text-slate-950 dark:text-white text-sm">
              {isHi ? "गैर-तकनीकी पद (Non-Technical - 462)" : "Non-Technical Posts (462)"}
            </div>
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border text-xs font-bold text-muted-foreground bg-muted/30">
                  <th className="px-4 py-2">{isHi ? "पद का नाम" : "Post Name"}</th>
                  <th className="px-4 py-2 text-right">{isHi ? "कुल पद" : "Vacancies"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-2.5 font-semibold text-foreground">{isHi ? "सूबेदार (Subedar)" : "Subedar"}</td>
                  <td className="px-4 py-2.5 font-bold text-primary text-right">81</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-2.5 font-semibold text-foreground">{isHi ? "उप निरीक्षक (विशेष सशस्त्र बल – SAF) *(केवल पुरुष)*" : "Sub Inspector (SAF) *(Male Only)*"}</td>
                  <td className="px-4 py-2.5 font-bold text-primary text-right">69</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-2.5 font-semibold text-foreground">{isHi ? "उप निरीक्षक (जिला पुलिस बल – DEF)" : "Sub Inspector (DEF)"}</td>
                  <td className="px-4 py-2.5 font-bold text-primary text-right">312</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Technical Posts */}
          <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
            <div className="bg-[#6ac7f2] dark:bg-[#20698f] px-4 py-2.5 font-extrabold text-slate-950 dark:text-white text-sm">
              {isHi ? "तकनीकी पद (Technical - 45)" : "Technical Posts (45)"}
            </div>
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border text-xs font-bold text-muted-foreground bg-muted/30">
                  <th className="px-4 py-2">{isHi ? "पद का नाम" : "Post Name"}</th>
                  <th className="px-4 py-2 text-right">{isHi ? "कुल पद" : "Vacancies"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-2.5 font-semibold text-foreground">{isHi ? "उप निरीक्षक (आयुध - Ordnance)" : "Sub Inspector (Ordnance)"}</td>
                  <td className="px-4 py-2.5 font-bold text-primary text-right">10</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-2.5 font-semibold text-foreground">{isHi ? "उप निरीक्षक (फोटो - Photo)" : "Sub Inspector (Photo)"}</td>
                  <td className="px-4 py-2.5 font-bold text-primary text-right">9</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-2.5 font-semibold text-foreground">{isHi ? "उप निरीक्षक (प्रश्नाधीन दस्तावेज़ – Q.D.)" : "Sub Inspector (Q.D.)"}</td>
                  <td className="px-4 py-2.5 font-bold text-primary text-right">4</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-2.5 font-semibold text-foreground">{isHi ? "उप निरीक्षक (अंगुल चिन्ह – Fingerprint)" : "Sub Inspector (Fingerprint)"}</td>
                  <td className="px-4 py-2.5 font-bold text-primary text-right">22</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-muted-foreground bg-muted/40 p-3 rounded-lg border border-border/50">
          {isHi
            ? "📌 नोट: जो अभ्यर्थी मध्यप्रदेश के स्थायी अधिवासी (Domicile) नहीं हैं, वे केवल अनारक्षित (UR) श्रेणी में ही आवेदन कर सकते हैं, और उन्हें आरक्षण या आयु सीमा में छूट का लाभ नहीं मिलेगा।"
            : "📌 Note: Non-MP Domicile candidates can apply strictly under the Unreserved (UR) category without age or category reservation benefits."}
        </p>
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
                  <th scope="col" className="px-4 py-3 w-[45%]">{isHi ? "पद का नाम (Post)" : "Post Name"}</th>
                  <th scope="col" className="px-4 py-3 w-[55%]">{isHi ? "आवश्यक योग्यता (Qualification)" : "Required Qualification"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सूबेदार, SI (SAF), SI (जिला पुलिस बल)" : "Subedar, SI (SAF), SI (DEF)"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "किसी भी मान्यता प्राप्त विश्वविद्यालय से स्नातक (Graduation in any stream)" : "Bachelor's Degree in any discipline from a recognized University"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "SI (आयुध - Ordnance)" : "SI (Ordnance)"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "मैकेनिकल इंजीनियरिंग में 3 वर्षीय डिप्लोमा" : "3-Year Diploma in Mechanical Engineering"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "SI (फोटो / QD / अंगुल चिन्ह)" : "SI (Photo / QD / Fingerprint)"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "गणित, भौतिक शास्त्र व रसायन शास्त्र (B.Sc. PCM) के साथ स्नातक" : "B.Sc. with Mathematics, Physics & Chemistry (PCM)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Age Limit Table - Matching User Reference Screenshot Exactly */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "5. आयु सीमा (आवेदन की अंतिम तिथि तक)" : "5. Age Limit (as on Last Date of Application)"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3.5 w-[65%]">{isHi ? "श्रेणी (Category)" : "Category"}</th>
                  <th scope="col" className="px-4 py-3.5 w-[35%]">{isHi ? "अधिकतम आयु (Max Age)" : "Maximum Age"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "पुरुष (अनारक्षित/EWS, म.प्र.)" : "Male (UR / EWS, MP Domicile)"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "33 वर्ष" : "33 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अन्य राज्य के अभ्यर्थी (पुरुष/महिला)" : "Candidates from Other States (Male / Female)"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "33 वर्ष" : "33 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "महिला (सभी श्रेणी)" : "Female (All Categories)"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{isHi ? "38 वर्ष" : "38 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "पुरुष (आरक्षित श्रेणी – SC/ST/OBC)" : "Male (Reserved Categories - SC/ST/OBC)"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{isHi ? "38 वर्ष" : "38 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "शासकीय/निगम/मंडल कर्मचारी (पुरुष)" : "Govt / Corporation Employees (Male)"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "38 वर्ष" : "38 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "विक्रम पुरस्कार विजेता (पुरुष)" : "Vikram Awardees (Male)"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "38 वर्ष" : "38 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "विक्रम पुरस्कार विजेता (महिला)" : "Vikram Awardees (Female)"}</td>
                  <td className="px-4 py-3 font-bold text-purple-600 dark:text-purple-400">{isHi ? "43 वर्ष" : "43 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अंतर्जातीय विवाह (महिला, आरक्षित सहित)" : "Inter-caste Marriage (Female)"}</td>
                  <td className="px-4 py-3 font-bold text-purple-600 dark:text-purple-400">{isHi ? "43 वर्ष" : "43 Years"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-muted-foreground italic bg-muted/30 p-3 rounded-lg border border-border/40">
          {isHi
            ? "भूतपूर्व सैनिकों को अलग से आयु में छूट का प्रावधान है (शर्तों सहित, अधिकतम सीमा से 3 वर्ष से अधिक नहीं)।"
            : "Ex-Servicemen get separate age relaxation provisions as per rules (not exceeding 3 years beyond maximum limit)."}
        </p>
      </section>

      {/* 6. Application Fee Table - Matching User Reference Screenshot Exactly */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "6. आवेदन शुल्क (Application Fee)" : "6. Application Fee Structure"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3.5 w-[50%]">{isHi ? "श्रेणी (Category)" : "Category"}</th>
                  <th scope="col" className="px-4 py-3.5 w-[25%]">{isHi ? "सीधी भर्ती शुल्क" : "Direct Recruitment Fee"}</th>
                  <th scope="col" className="px-4 py-3.5 w-[25%]">{isHi ? "विभागीय परीक्षा शुल्क" : "Departmental Exam Fee"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अनारक्षित (UR)" : "Unreserved (UR)"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">₹500/-</td>
                  <td className="px-4 py-3 font-bold text-foreground">₹200/-</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "SC/ST/OBC/EWS (केवल म.प्र. मूल निवासी)" : "SC/ST/OBC/EWS (MP Domicile Only)"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">₹250/-</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">₹100/-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground space-y-1">
          <p>{isHi ? "• MP ऑनलाइन कियोस्क पोर्टल शुल्क: ₹ 60/-" : "• MP Online Kiosk Portal Charges: ₹ 60/-"}</p>
          <p>{isHi ? "• रजिस्टर्ड सिटीजन यूजर लॉगिन से भरने पर पोर्टल शुल्क: ₹ 20/-" : "• Registered Citizen User Login Portal Charges: ₹ 20/-"}</p>
        </div>
      </section>

      {/* 7. Selection Process Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "7. चयन प्रक्रिया (2 चरण)" : "7. Selection Process (2 Stages)"}
        </h3>
        
        {/* Stage 1 */}
        <div className="rounded-xl border border-sky-300 dark:border-sky-800 bg-card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <Badge className="bg-primary text-primary-foreground font-bold">{isHi ? "प्रथम चरण" : "Stage 1"}</Badge>
            <span className="text-xs font-bold text-primary">{isHi ? "100 अंक | 2 घंटे | 10 गुना चयन" : "100 Marks | 2 Hours | 10x Selection"}</span>
          </div>
          <h4 className="font-bold text-foreground text-sm">{isHi ? "प्रारंभिक लिखित परीक्षा (Prelims Written Exam)" : "Preliminary Written Examination"}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {isHi
              ? "100 बहुविकल्पीय प्रश्न। कोई ऋणात्मक अंकन (Negative Marking) नहीं। मुख्य परीक्षा हेतु कुल पदों के 10 गुना अभ्यर्थी शार्टलिस्ट होंगे।"
              : "100 Objective MCQs. No Negative Marking. 10 times the total vacancies will be shortlisted for Mains."}
          </p>
        </div>

        {/* Stage 2 */}
        <div className="rounded-xl border border-sky-300 dark:border-sky-800 bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-primary text-primary font-bold">{isHi ? "द्वितीय चरण" : "Stage 2"}</Badge>
            <span className="text-xs font-bold text-red-600 dark:text-red-400">{isHi ? "मुख्य परीक्षा (1/3 ऋणात्मक अंकन) + PET + साक्षात्कार" : "Mains (1/3rd Negative Marking) + PET + Interview"}</span>
          </div>
          
          <div className="space-y-2 text-xs">
            <p className="font-bold text-foreground">{isHi ? "(क) मुख्य लिखित परीक्षा (Mains Written Exam):" : "(A) Mains Written Examination:"}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2">
              <li>{isHi ? "प्रश्न पत्र I: सामान्य अध्ययन (300 अंक, 2 घंटे)" : "Paper I: General Studies (300 Marks, 2 Hours)"}</li>
              <li>{isHi ? "प्रश्न पत्र II: सामान्य अध्ययन (300 अंक, 2 घंटे)" : "Paper II: General Studies (300 Marks, 2 Hours)"}</li>
              <li>{isHi ? "प्रश्न पत्र III (तकनीकी पद हेतु): मैकेनिकल/PCM (300 अंक, 2 घंटे)" : "Paper III (Technical Posts): Mechanical/PCM (300 Marks, 2 Hours)"}</li>
              <li className="text-red-600 dark:text-red-400 font-medium">{isHi ? "गलत उत्तर पर 1/3 ऋणात्मक अंकन। पदों के 3 गुना अभ्यर्थी अगले चरण हेतु चुने जाएंगे।" : "1/3rd Negative Marking per wrong answer. 3 times vacancies selected for PET."}</li>
            </ul>

            <p className="font-bold text-foreground pt-2">{isHi ? "(ख) शारीरिक दक्षता परीक्षण (PET - 100 अंक):" : "(B) Physical Efficiency Test (PET - 100 Marks):"}</p>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-muted font-bold text-foreground">
                    <th className="px-3 py-1.5">{isHi ? "विधा (Event)" : "Event"}</th>
                    <th className="px-3 py-1.5">{isHi ? "अधिकतम अंक" : "Max Marks"}</th>
                    <th className="px-3 py-1.5">{isHi ? "अवसर" : "Attempts"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-3 py-1.5 font-medium">{isHi ? "800 मीटर दौड़" : "800m Run"}</td>
                    <td className="px-3 py-1.5 font-bold text-primary">40</td>
                    <td className="px-3 py-1.5 text-muted-foreground">1</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5 font-medium">{isHi ? "लंबी कूद" : "Long Jump"}</td>
                    <td className="px-3 py-1.5 font-bold text-primary">30</td>
                    <td className="px-3 py-1.5 text-muted-foreground">3</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5 font-medium">{isHi ? "गोला फेंक" : "Shot Put"}</td>
                    <td className="px-3 py-1.5 font-bold text-primary">30</td>
                    <td className="px-3 py-1.5 text-muted-foreground">3</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-muted-foreground italic">{isHi ? "न्यूनतम अर्हक अंक: गैर-तकनीकी – 30 अंक, तकनीकी – 20 अंक" : "Minimum Qualifying Marks: Non-Technical – 30 Marks, Technical – 20 Marks"}</p>

            <p className="font-bold text-foreground pt-2">{isHi ? "(ग) साक्षात्कार (Interview):" : "(C) Interview:"}</p>
            <p className="text-muted-foreground">{isHi ? "कुल 50 अंक का व्यक्तिगत साक्षात्कार आयोजित किया जाएगा।" : "Personal Interview of 50 Marks."}</p>
          </div>
        </div>
      </section>

      {/* 8. Detailed Written Syllabus (विस्तृत पाठ्यक्रम) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-2">
          <h3 className="text-lg font-bold text-foreground">
            {isHi ? "8. विस्तृत परीक्षा पाठ्यक्रम (Detailed Exam Syllabus)" : "8. Detailed Examination Syllabus"}
          </h3>
          <Button className="rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-2 px-4 py-2 h-auto shrink-0 shadow-sm" asChild>
            <a href="https://drive.google.com/file/d/1Db_HqaZzTvqSN5NQa-BEthIh1dv4un6J/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <Download className="h-3.5 w-3.5" />
              {isHi ? "डाउनलोड विस्तृत सिलेबस PDF" : "Download Detailed Syllabus PDF"}
            </a>
          </Button>
        </div>

        {/* Prelims Syllabus Card */}
        <div className="rounded-xl border border-sky-300 dark:border-sky-800 bg-card overflow-hidden shadow-soft">
          <div className="bg-[#6ac7f2] dark:bg-[#20698f] px-4 py-3 font-extrabold text-slate-950 dark:text-white flex items-center justify-between">
            <span>{isHi ? "प्रारंभिक परीक्षा पाठ्यक्रम (100 अंक - 2 घंटे)" : "Prelims Exam Syllabus (100 Marks - 2 Hours)"}</span>
            <Badge className="bg-white text-slate-950 font-black text-xs">{isHi ? "100 वस्तुनिष्ठ प्रश्न (No Negative Marking)" : "100 MCQs (No Negative Marking)"}</Badge>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-xs text-muted-foreground">{isHi ? "निम्न 10 मुख्य विषयों से वस्तुनिष्ठ (MCQs) प्रश्न पूछे जाएंगे:" : "Objective MCQs will be asked from the following 10 core subjects:"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-border bg-muted/20 font-bold text-foreground">1. {isHi ? "हिंदी भाषायी बोध" : "Hindi Language Comprehension"}</div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/20 font-bold text-foreground">2. {isHi ? "अंग्रेजी भाषायी बोध" : "English Language Comprehension"}</div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/20 font-bold text-foreground">3. {isHi ? "विश्लेषणात्मक क्षमता" : "Analytical Ability"}</div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/20 font-bold text-foreground">4. {isHi ? "इतिहास (भारत व म.प्र.)" : "History (India & MP)"}</div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/20 font-bold text-foreground">5. {isHi ? "भूगोल (भारत व म.प्र.)" : "Geography (India & MP)"}</div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/20 font-bold text-foreground">6. {isHi ? "सामान्य विज्ञान" : "General Science"}</div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/20 font-bold text-foreground">7. {isHi ? "नागरिक शास्त्र व राजव्यवस्था" : "Civics & Indian Polity"}</div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/20 font-bold text-foreground">8. {isHi ? "बुनियादी कंप्यूटर ज्ञान" : "Basic Computer Knowledge"}</div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/20 font-bold text-foreground">9. {isHi ? "तर्कशक्ति (Reasoning)" : "Reasoning Ability"}</div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/20 font-bold text-foreground col-span-1 sm:col-span-2 md:col-span-3 text-primary">10. {isHi ? "करेंट अफेयर्स (राष्ट्रीय, अंतर्राष्ट्रीय व म.प्र. समसामयिकी)" : "Current Affairs (National, International & MP)"}</div>
            </div>
          </div>
        </div>

        {/* Mains Paper 1 Syllabus Card */}
        <div className="rounded-xl border border-sky-300 dark:border-sky-800 bg-card overflow-hidden shadow-soft">
          <div className="bg-[#6ac7f2] dark:bg-[#20698f] px-4 py-3 font-extrabold text-slate-950 dark:text-white flex items-center justify-between">
            <span>{isHi ? "मुख्य परीक्षा - प्रश्न पत्र I : सामान्य अध्ययन (300 अंक)" : "Mains Paper I : General Studies (300 Marks)"}</span>
            <Badge variant="outline" className="bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30 font-bold text-xs">{isHi ? "1/3 ऋणात्मक अंकन" : "1/3rd Negative Marking"}</Badge>
          </div>
          <div className="p-4 space-y-4 text-xs">
            {/* Part A */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-border pb-1">
                <span className="font-extrabold text-foreground text-sm">{isHi ? "भाग 'क' – इतिहास और भारतीय समाज" : "Part 'A' – History & Indian Society"}</span>
                <span className="font-bold text-primary">150 {isHi ? "अंक" : "Marks"}</span>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1.5 leading-relaxed pl-1">
                <li><strong className="text-foreground">{isHi ? "भारतीय इतिहास:" : "Indian History:"}</strong> {isHi ? "हड़प्पा सभ्यता, मौर्य साम्राज्य, गुप्त साम्राज्य, हर्षवर्धन, 11वीं–14वीं शताब्दी में विदेशी यात्रियों के विवरण, मध्यकालीन भारत की भक्ति-सूफी परंपराएं, विजयनगर साम्राज्य, मुग़ल साम्राज्य, ईस्ट इंडिया कंपनी व उपनिवेशवाद, 1857 का विद्रोह, औपनिवेशिक नगरीकरण व नगर योजना, महात्मा गांधी और राष्ट्रीय आंदोलन, संविधान निर्माण।" : "Harappan civilization, Mauryan, Gupta, Harsha, Foreign travelers, Bhakti-Sufi movements, Vijayanagar, Mughals, East India Company, 1857 Revolt, Colonial urbanization, Mahatma Gandhi & National Movement, Constitution drafting."}</li>
                <li><strong className="text-foreground">{isHi ? "स्वतंत्रता उत्तर भारत:" : "Post-Independence India:"}</strong> {isHi ? "स्वतंत्रता के बाद देश के भीतर समेकन और पुनर्गठन।" : "Consolidation and reorganization within the country post-independence."}</li>
                <li><strong className="text-foreground">{isHi ? "भारतीय समाज व म.प्र. जनसांख्यिकी:" : "Indian Society & MP Demographics:"}</strong> {isHi ? "भारतीय समाज की मुख्य विशेषताएं, भारत की विविधता, भारत एवं मध्यप्रदेश की जनसांख्यिकी, मध्यप्रदेश की जनजातियां, महिलाओं व महिला संगठनों की भूमिका, जनसंख्या से जुड़े मुद्दे, गरीबी व विकासात्मक मुद्दे, शहरीकरण – समस्याएं व समाधान, भारतीय समाज पर वैश्वीकरण का प्रभाव।" : "Salient features of Indian Society, Diversity, Demographics of India & MP, MP Tribes, Role of women & women's organizations, Population issues, Poverty, Urbanization, Globalization impact."}</li>
              </ul>
            </div>

            {/* Part B */}
            <div className="space-y-2 pt-2 border-t border-border/60">
              <div className="flex items-center justify-between border-b border-border pb-1">
                <span className="font-extrabold text-foreground text-sm">{isHi ? "भाग 'ख' – शासन, संविधान और राजनीति, सामाजिक न्याय और विधान" : "Part 'B' – Governance, Constitution, Polity & Social Justice"}</span>
                <span className="font-bold text-primary">150 {isHi ? "अंक" : "Marks"}</span>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1.5 leading-relaxed pl-1">
                <li><strong className="text-foreground">{isHi ? "भारतीय संविधान:" : "Indian Constitution:"}</strong> {isHi ? "ऐतिहासिक आधार, विकास, विशेषताएं, संशोधन, महत्वपूर्ण प्रावधान व मूल संरचना।" : "Historical underpinnings, evolution, features, amendments, significant provisions & basic structure."}</li>
                <li><strong className="text-foreground">{isHi ? "संघ व राज्य ढाँचा:" : "Union & State Structure:"}</strong> {isHi ? "संघ व राज्यों के कार्य व जिम्मेदारियां, संघीय ढांचे से जुड़े मुद्दे व चुनौतियां, शक्तियों के पृथक्करण संबंधी विवाद, निवारण तंत्र व संस्थान।" : "Functions & responsibilities of Union and States, Federal structure issues, Separation of powers & dispute redressal."}</li>
                <li><strong className="text-foreground">{isHi ? "विधायिका, कार्यपालिका व न्यायपालिका:" : "Legislature, Executive & Judiciary:"}</strong> {isHi ? "संसद व राज्य विधायिका (संरचना, कामकाज, शक्तियां), कार्यपालिका व न्यायपालिका का संगठन, दबाव समूह व राजनीति में भूमिका।" : "Parliament & State Legislatures (structure, functioning, powers), Executive & Judiciary structure, Pressure groups."}</li>
                <li><strong className="text-foreground">{isHi ? "सामाजिक न्याय व कल्याण:" : "Social Justice & Welfare:"}</strong> {isHi ? "कमजोर वर्गों के लिए कल्याणकारी योजनाएं, सुरक्षा तंत्र, कानून व संस्थान, गरीबी व भूख से जुड़े मुद्दे।" : "Welfare schemes for vulnerable sections, protection mechanisms, laws, institutions, poverty & hunger issues."}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mains Paper 2 Syllabus Card */}
        <div className="rounded-xl border border-sky-300 dark:border-sky-800 bg-card overflow-hidden shadow-soft">
          <div className="bg-[#6ac7f2] dark:bg-[#20698f] px-4 py-3 font-extrabold text-slate-950 dark:text-white flex items-center justify-between">
            <span>{isHi ? "मुख्य परीक्षा - प्रश्न पत्र II : सामान्य अध्ययन (300 अंक)" : "Mains Paper II : General Studies (300 Marks)"}</span>
            <Badge variant="outline" className="bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30 font-bold text-xs">{isHi ? "1/3 ऋणात्मक अंकन" : "1/3rd Negative Marking"}</Badge>
          </div>
          <div className="p-4 space-y-4 text-xs">
            {/* Part A */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-border pb-1">
                <span className="font-extrabold text-foreground text-sm">{isHi ? "भाग 'क' – करेंट अफेयर्स, प्रौद्योगिकी, आर्थिक विकास, पर्यावरण व आंतरिक सुरक्षा" : "Part 'A' – Current Affairs, Tech, Economy, Environment & Security"}</span>
                <span className="font-bold text-primary">150 {isHi ? "अंक" : "Marks"}</span>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1.5 leading-relaxed pl-1">
                <li><strong className="text-foreground">{isHi ? "विज्ञान व प्रौद्योगिकी:" : "Science & Tech:"}</strong> {isHi ? "विज्ञान एवं प्रौद्योगिकी का विकास व अनुप्रयोग, सूचना प्रौद्योगिकी, अंतरिक्ष, कंप्यूटर, रोबोटिक्स, नैनो-टेक्नोलॉजी, बायो-टेक्नोलॉजी, AI (कृत्रिम बुद्धिमत्ता), बौद्धिक संपदा अधिकार।" : "Science & Technology applications, IT, Space, Robotics, Nano-tech, Bio-tech, Artificial Intelligence (AI), IPR."}</li>
                <li><strong className="text-foreground">{isHi ? "पर्यावरण व ऊर्जा:" : "Environment & Energy:"}</strong> {isHi ? "पर्यावरण संरक्षण, प्रदूषण व क्षरण, पर्यावरण प्रभाव आंकलन (EIA), परंपरागत व गैर-परंपरागत ऊर्जा संसाधन, नवीकरणीय ऊर्जा।" : "Environmental conservation, pollution, EIA, conventional & non-conventional energy resources, renewable energy."}</li>
                <li><strong className="text-foreground">{isHi ? "आर्थिक विकास:" : "Economic Development:"}</strong> {isHi ? "भारतीय अर्थव्यवस्था व योजना, संसाधन जुटाना, प्रगति, विकास व रोजगार, नवीन तकनीकी (ICT, रिमोट सेंसिंग, GIS, GPS) के अनुप्रयोग।" : "Indian economy & planning, resource mobilization, growth & employment, applications of ICT, Remote Sensing, GIS, GPS."}</li>
                <li><strong className="text-foreground">{isHi ? "पुलिस सेवाएं व आंतरिक सुरक्षा:" : "Police Services & Internal Security:"}</strong> {isHi ? "लोकतंत्र में पुलिस सेवाओं की भूमिका, विकास और उग्रवाद के बीच संबंध, आंतरिक सुरक्षा के कारक, सोशल मीडिया की भूमिका, साइबर सुरक्षा, धन-शोधन (Money Laundering), संगठित अपराध और आतंकवाद।" : "Role of police in democracy, Development & Extremism link, Internal security challenges, Social media role, Cyber security, Money laundering, Organized crime & Terrorism."}</li>
              </ul>
            </div>

            {/* Part B */}
            <div className="space-y-2 pt-2 border-t border-border/60">
              <div className="flex items-center justify-between border-b border-border pb-1">
                <span className="font-extrabold text-foreground text-sm">{isHi ? "भाग 'ख' – तर्क एवं अंकों की व्याख्या" : "Part 'B' – Reasoning & Data Interpretation"}</span>
                <span className="font-bold text-primary">150 {isHi ? "अंक" : "Marks"}</span>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1.5 leading-relaxed pl-1">
                <li><strong className="text-foreground">{isHi ? "सांख्यिकी व प्रायिकता:" : "Statistics & Probability:"}</strong> {isHi ? "आधार संख्याएं और सांख्यिकी (अंक व उनके संबंध), प्रायिकता, माध्य, माध्यिका, बहुलक व मानक विचलन।" : "Number relations, Statistics, Probability, Mean, Median, Mode & Standard Deviation."}</li>
                <li><strong className="text-foreground">{isHi ? "डेटा प्रबंधन व व्याख्या (DI):" : "Data Management & DI:"}</strong> {isHi ? "आंकड़ों का प्रबंधन व व्याख्या (चार्ट, ग्राफ, तालिका), अनुपात व समानुपात, इकाई विधि।" : "Data Interpretation (charts, graphs, tables), Ratio & Proportion, Unitary method."}</li>
                <li><strong className="text-foreground">{isHi ? "अंकगणित व क्षेत्रमिति:" : "Arithmetic & Mensuration:"}</strong> {isHi ? "लाभ-हानि, प्रतिशत, छूट, साधारण व चक्रवृद्धि ब्याज, क्षेत्रफल, परिमाप, आयतन।" : "Profit & Loss, Percentage, Discount, Simple & Compound Interest, Area, Perimeter, Volume."}</li>
                <li><strong className="text-foreground">{isHi ? "तार्किक क्षमता:" : "Logical Reasoning:"}</strong> {isHi ? "तार्किक शक्ति, विश्लेषणात्मक क्षमता व समस्या समाधान।" : "Logical reasoning, analytical ability and problem solving."}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mains Paper 3 Syllabus Card (Technical) */}
        <div className="rounded-xl border border-sky-300 dark:border-sky-800 bg-card overflow-hidden shadow-soft">
          <div className="bg-[#6ac7f2] dark:bg-[#20698f] px-4 py-3 font-extrabold text-slate-950 dark:text-white flex items-center justify-between">
            <span>{isHi ? "मुख्य परीक्षा - प्रश्न पत्र III : तकनीकी परीक्षा (केवल तकनीकी पदों हेतु - 300 अंक)" : "Mains Paper III : Technical Exam (Technical Posts Only - 300 Marks)"}</span>
            <Badge className="bg-white text-slate-950 font-bold text-xs">{isHi ? "100 वस्तुनिष्ठ प्रश्न | 2 घंटे" : "100 MCQs | 2 Hours"}</Badge>
          </div>
          <div className="p-4 space-y-2 text-xs">
            <p className="text-muted-foreground">{isHi ? "तकनीकी पदों हेतु निम्नलिखित विषयों पर आधारित 100 वस्तुनिष्ठ (MCQs) प्रश्न पूछे जाएंगे:" : "100 MCQs based on specialized curriculum for technical posts:"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
                <span className="font-bold text-foreground text-sm">{isHi ? "उप निरीक्षक (आयुध - Ordnance):" : "Sub Inspector (Ordnance):"}</span>
                <p className="text-muted-foreground">{isHi ? "मैकेनिकल इंजीनियरिंग (Mechanical Engineering) डिप्लोमा पाठ्यक्रम पर आधारित प्रश्न पत्र।" : "Questions based on Mechanical Engineering Diploma curriculum."}</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
                <span className="font-bold text-foreground text-sm">{isHi ? "उप निरीक्षक (फोटो / QD / अंगुल चिन्ह):" : "Sub Inspector (Photo / QD / Fingerprint):"}</span>
                <p className="text-muted-foreground">{isHi ? "गणित, भौतिकी एवं रसायन शास्त्र (B.Sc. PCM) विषयों पर आधारित प्रश्न पत्र।" : "Questions based on B.Sc. Mathematics, Physics, and Chemistry."}</p>
              </div>
            </div>
            <p className="text-[11px] text-red-600 dark:text-red-400 font-medium italic pt-1">{isHi ? "📌 गलत उत्तर पर 1/3 अंक ऋणात्मक; छोड़े गए प्रश्नों पर कोई ऋणात्मक अंकन नहीं।" : "📌 1/3rd negative marking per wrong answer; no negative marking for unattempted questions."}</p>
          </div>
        </div>
      </section>

      {/* 8. Physical Standards Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "8. शारीरिक मानक (Physical Standards)" : "8. Physical Standards"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[40%]">{isHi ? "मानक (Standard)" : "Standard"}</th>
                  <th scope="col" className="px-4 py-3 w-[30%]">{isHi ? "पुरुष (Male)" : "Male"}</th>
                  <th scope="col" className="px-4 py-3 w-[30%]">{isHi ? "महिला (Female)" : "Female"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "न्यूनतम ऊंचाई (Height)" : "Minimum Height"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">167.5 cm</td>
                  <td className="px-4 py-3 font-bold text-foreground">152.4 cm</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सीने का माप (Chest)" : "Chest Expansion"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "81 cm (बिना फुलाए), 86 cm (फुलाकर - 5 cm फुलाव)" : "81 cm (Normal), 86 cm (Expanded - 5 cm)"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "लागू नहीं" : "N/A"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "दृष्टि मानक (Vision)" : "Vision Standard"}</td>
                  <td className="px-4 py-3 text-muted-foreground" colSpan={2}>{isHi ? "बिना चश्मे के 6/9 एवं दूसरी आंख 6/12 से कम नहीं" : "Minimum 6/9 and 6/12 without glasses"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अन्य चिकित्सा मानक" : "Other Medical Standard"}</td>
                  <td className="px-4 py-3 text-muted-foreground font-medium" colSpan={2}>{isHi ? "नॉक-नी (Knock-knee) व फ्लैट फुट (Flat Foot) नहीं होना चाहिए।" : "No Knock-knee or Flat foot allowed."}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. Pay Scale & Stipend */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "9. वेतनमान एवं परिवीक्षा स्टायपेंड (Pay Scale & Stipend)" : "9. Pay Scale & Stipend Rules"}
        </h3>
        <div className="rounded-xl border border-sky-300 dark:border-sky-800 bg-card p-4 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground">{isHi ? "वेतनमान (Pay Matrix Level 9):" : "Pay Scale (Level 9):"}</span>
            <span className="font-extrabold text-primary text-base">₹ 36,200 – ₹ 1,14,800/-</span>
          </div>
          <p className="text-xs text-muted-foreground">{isHi ? "सूबेदार व सभी उप निरीक्षक (SI) संवर्ग पदों हेतु लागू।" : "Applicable for Subedar and all Sub Inspector cadres."}</p>
          <div className="pt-2 text-xs space-y-1 border-t border-border">
            <p className="font-bold text-foreground">{isHi ? "परिवीक्षा अवधि में स्टायपेंड नियमावली:" : "Stipend Rules during 3-Year Probation:"}</p>
            <p className="text-muted-foreground">{isHi ? "• प्रथम वर्ष: न्यूनतम वेतनमान का 70%" : "• Year 1: 70% of base scale"}</p>
            <p className="text-muted-foreground">{isHi ? "• द्वितीय वर्ष: न्यूनतम वेतनमान का 80%" : "• Year 2: 80% of base scale"}</p>
            <p className="text-muted-foreground">{isHi ? "• तृतीय वर्ष: न्यूनतम वेतनमान का 90%" : "• Year 3: 90% of base scale"}</p>
          </div>
        </div>
      </section>

      {/* 10. Exam Centers & Verification Documents */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "10. परीक्षा केंद्र एवं आवश्यक दस्तावेज (Exam Centers & Documents)" : "10. Exam Centers & Verification Documents"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="font-bold text-foreground text-sm">{isHi ? "📍 परीक्षा शहर (Exam Centers):" : "📍 Exam Test Cities:"}</h4>
            <p className="text-muted-foreground leading-relaxed">
              {isHi
                ? "भोपाल, इंदौर, जबलपुर, खंडवा, नीमच, रतलाम, रीवा, सागर, सतना, सीधी, उज्जैन, बड़वानी, अनूपपुर।"
                : "Bhopal, Indore, Jabalpur, Khandwa, Neemuch, Ratlam, Rewa, Sagar, Satna, Sidhi, Ujjain, Barwani, Anuppur."}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="font-bold text-foreground text-sm">{isHi ? "📂 जरूरी दस्तावेज (Documents):" : "📂 Mandatory Documents:"}</h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>{isHi ? "10वीं/12वीं अंकसूची (जन्मतिथि प्रमाण)" : "10th/12th Marksheet (DOB Proof)"}</li>
              <li>{isHi ? "स्नातक / डिप्लोमा प्रमाण पत्र" : "Graduation / Diploma Certificate"}</li>
              <li>{isHi ? "जाति व म.प्र. मूल निवासी प्रमाण पत्र" : "Caste & MP Domicile Certificate"}</li>
              <li>{isHi ? "मूल फोटोयुक्त पहचान पत्र व आधार (बायोमेट्रिक)" : "Original Photo ID & Aadhaar (Biometric)"}</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
