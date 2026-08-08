import { Badge } from "@/components/ui/badge";

export function VacancyRulebookOverview({ locale = "hi" }: { locale?: string }) {
  const isHi = locale === "hi";

  return (
    <div className="space-y-8 my-6">

      {/* 1. Job Overview Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "1. MPESB पटवारी भर्ती 2026 संक्षिप्त विवरण (Overview)" : "1. MPESB Recruitment 2026 Overview"}
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
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "मध्य प्रदेश कर्मचारी चयन मण्डल (MPESB), भोपाल" : "Madhya Pradesh Employee Selection Board (MPESB), Bhopal"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "पद का नाम (Post Name)" : "Post Name"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "पटवारी (कार्यपालिक) एवं समूह-02 उपसमूह-04 संयुक्त भर्ती 2026" : "Patwari (Executive) & Group-02 Sub Group-04 Posts"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "कुल पदसंख्या (Total Posts)" : "Total Vacancies"}</td>
                  <td className="px-4 py-3 font-bold text-primary">{isHi ? "2306 पद" : "2306 Posts"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "वेतनमान (Pay Scale)" : "Pay Scale"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "₹ 5200 - 20200 + ₹ 2100 ग्रेड पे (लेवल-5) + 3 वर्ष स्टाइपेंड नियम" : "₹ 5200 - 20200 + ₹ 2100 Grade Pay (Level-5) + 3-Year Stipend Rule"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "पदस्थापना (Job Location)" : "Job Location"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "मध्य प्रदेश (जिला संवर्ग)" : "Madhya Pradesh (District Cadre)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2. Important Dates Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "2. महत्वपूर्ण तिथियां एवं समय सारणी (Important Dates)" : "2. Important Dates & Schedule"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[55%]">{isHi ? "घटना / समय चक्र (Event)" : "Event / Schedule"}</th>
                  <th scope="col" className="px-4 py-3 w-[45%]">{isHi ? "निर्धारित तिथि (Date)" : "Date"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "ऑनलाइन आवेदन प्रारंभ तिथि" : "Online Application Start Date"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "04 अगस्त 2026" : "04 Aug 2026"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "आवेदन पत्र संशोधन प्रारंभ तिथि" : "Application Amendment Start"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "04 अगस्त 2026" : "04 Aug 2026"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "ऑनलाइन आवेदन की अंतिम तिथि" : "Online Application End Date"}</td>
                  <td className="px-4 py-3 font-extrabold text-red-600 dark:text-red-400">{isHi ? "18 अगस्त 2026 (कुल 15 दिन)" : "18 Aug 2026 (Total 15 Days)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "आवेदन पत्र संशोधन अंतिम तिथि" : "Form Amendment End Date"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "23 अगस्त 2026 (कुल 20 दिन)" : "23 Aug 2026 (Total 20 Days)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "परीक्षा प्रारंभ तिथि" : "Exam Start Date"}</td>
                  <td className="px-4 py-3 font-black text-primary">{isHi ? "22 सितंबर 2026 (मंगलवार से प्रारंभ)" : "22 Sep 2026 (Tuesday) - Online CBT"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Application Fee Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "3. परीक्षा शुल्क एवं पोर्टल चार्ज (Application Fee)" : "3. Application Fee & Portal Charges"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[60%]">{isHi ? "अभ्यर्थी श्रेणी (Category)" : "Category"}</th>
                  <th scope="col" className="px-4 py-3 w-[40%]">{isHi ? "परीक्षा शुल्क (Fee)" : "Application Fee"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अनारक्षित / सामान्य (UR)" : "Unreserved / General (UR)"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">₹ 500/-</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "SC / ST / OBC / EWS / दिव्यांग (MP मूल निवासी)" : "SC / ST / OBC / EWS / PWD (MP Residents)"}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">₹ 250/-</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "सीधी भर्ती - बैकलॉग पद" : "Direct Recruitment - Backlog Posts"}</td>
                  <td className="px-4 py-3 font-bold text-green-600 dark:text-green-400">{isHi ? "निःशुल्क (कोई शुल्क नहीं)" : "Nil (No Fee)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "MP Online कियोस्क शुल्क" : "MP Online Kiosk Charges"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "₹ 60/- (कियोस्क) | ₹ 20/- (सिटीजन लॉगिन)" : "₹ 60/- (Kiosk) | ₹ 20/- (Citizen Login)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Exam Shifts Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "4. परीक्षा पालियां एवं समय सारणी (Exam Shifts & Timings)" : "4. Exam Shifts & Reporting Timings"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[25%]">{isHi ? "पाली (Shift)" : "Shift"}</th>
                  <th scope="col" className="px-4 py-3 w-[25%]">{isHi ? "रिपोर्टिंग समय" : "Reporting Time"}</th>
                  <th scope="col" className="px-4 py-3 w-[25%]">{isHi ? "निर्देश पढ़ने का समय" : "Instruction Time"}</th>
                  <th scope="col" className="px-4 py-3 w-[25%]">{isHi ? "परीक्षा अवधि व समय" : "Exam Time"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "प्रथम पाली (प्रातः)" : "Shift 1 (Morning)"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "प्रातः 07:00 से 08:00 बजे" : "07:00 AM - 08:00 AM"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "08:50 से 09:00 बजे (10 मि)" : "08:50 AM - 09:00 AM (10 min)"}</td>
                  <td className="px-4 py-3 font-extrabold text-primary">{isHi ? "प्रातः 09:00 से 12:00 बजे (3 घंटे)" : "09:00 AM - 12:00 PM (3 Hours)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "द्वितीय पाली (दोपहर)" : "Shift 2 (Afternoon)"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "दोपहर 12:30 से 01:30 बजे" : "12:30 PM - 01:30 PM"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "02:20 से 02:30 बजे (10 मि)" : "02:20 PM - 02:30 PM (10 min)"}</td>
                  <td className="px-4 py-3 font-extrabold text-purple-600 dark:text-purple-400">{isHi ? "दोपहर 02:30 से 05:30 बजे (3 घंटे)" : "02:30 PM - 05:30 PM (3 Hours)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Eligibility & CPCT Rule Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "5. शैक्षणिक योग्यता एवं CPCT 3 वर्ष की विशेष छूट (Eligibility & CPCT Rule)" : "5. Eligibility Criteria & CPCT 3-Year Rule"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[35%]">{isHi ? "मापदंड (Criterion)" : "Criterion"}</th>
                  <th scope="col" className="px-4 py-3 w-[65%]">{isHi ? "आवश्यकता / नियम विवरण" : "Requirement / Rule Details"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "नागरिकता व निवास" : "Nationality & Domicile"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "भारत का नागरिक हो तथा मध्यप्रदेश का मूल निवासी होना अनिवार्य है।" : "Indian Citizen and MP Domicile mandatory"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "शैक्षणिक योग्यता" : "Educational Qualification"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "किसी भी मान्यता प्राप्त विश्वविद्यालय से स्नातक (Bachelor's Degree) की उपाधि।" : "Bachelor's Degree in any discipline from a recognized University"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "CPCT स्कोर कार्ड" : "CPCT Scorecard"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "हिंदी टाइपिंग एवं कंप्यूटर दक्षता सहित CPCT स्कोर कार्ड उत्तीर्ण होना अनिवार्य।" : "Hindi Typing and Computer Proficiency CPCT Scorecard required"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-bold text-amber-700 dark:text-amber-300">{isHi ? "CPCT 3 वर्ष छूट नियम" : "CPCT 3-Year Relaxation Rule"}</td>
                  <td className="px-4 py-3 text-foreground font-medium">
                    {isHi
                      ? "यदि चयन के समय CPCT उत्तीर्ण नहीं है, तो नियुक्ति के पश्चात 3 वर्ष की परिवीक्षा (Probation) अवधि के भीतर CPCT उत्तीर्ण करना होगा।"
                      : "If CPCT is not cleared at selection, candidates get a 3-year probation period to clear CPCT after appointment."}
                  </td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "रोजगार पंजीयन" : "Employment Registration"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "मध्य प्रदेश राज्य के रोजगार कार्यालय में जीवित पंजीयन होना अनिवार्य है।" : "Active registration with MP Employment Exchange mandatory"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Age Limit Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "6. आयु सीमा एवं छूट (Age Limit - 01.01.2026 की स्थिति में)" : "6. Age Limit & Relaxation (as on 01.01.2026)"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[50%]">{isHi ? "अभ्यर्थी श्रेणी (Category)" : "Category"}</th>
                  <th scope="col" className="px-4 py-3 w-[50%]">{isHi ? "आयु सीमा (Age Limit)" : "Age Limit"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "अनारक्षित (UR) पुरुष" : "Unreserved (UR) Male"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "18 से 40 वर्ष" : "18 to 40 Years"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "SC / ST / OBC / EWS / महिला / दिव्यांग (MP मूल निवासी)" : "SC / ST / OBC / EWS / Female / PWD (MP Residents)"}</td>
                  <td className="px-4 py-3 font-bold text-purple-600 dark:text-purple-400">{isHi ? "18 से 45 वर्ष (5 वर्ष की अधिकतम छूट)" : "18 to 45 Years (5 Years Relaxation)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. Exam Pattern & Syllabus Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "7. परीक्षा योजना एवं 200 अंकों का पाठ्यक्रम (Syllabus)" : "7. Exam Pattern & 200 Marks Syllabus"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[20%]">{isHi ? "भाग (Section)" : "Section"}</th>
                  <th scope="col" className="px-4 py-3 w-[60%]">{isHi ? "शामिल विषय (Subjects Included)" : "Subjects Included"}</th>
                  <th scope="col" className="px-4 py-3 w-[20%]">{isHi ? "अंक (Marks)" : "Marks"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "भाग (अ)" : "Part A"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "सामान्य विज्ञान, सामान्य हिंदी, सामान्य अंग्रेजी, सामान्य गणित" : "General Science, General Hindi, General English, General Mathematics"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "100 अंक" : "100 Marks"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "भाग (ब)" : "Part B"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "सामान्य ज्ञान एवं अभिरुचि, कंप्यूटर ज्ञान, रीजनिंग, सामान्य प्रबंधन" : "General Knowledge & Aptitude, Computer Knowledge, Logical Reasoning, General Management"}</td>
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "100 अंक" : "100 Marks"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5 bg-muted/20">
                  <td className="px-4 py-3 font-bold text-foreground">{isHi ? "अर्हकारी अंक" : "Qualifying Marks"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "UR श्रेणी: 50% (100 अंक) | SC/ST/OBC/EWS/दिव्यांग: 40% (80 अंक)" : "UR Category: 50% (100 Marks) | SC/ST/OBC/EWS/PWD: 40% (80 Marks)"}</td>
                  <td className="px-4 py-3 font-black text-primary">{isHi ? "कुल: 200 अंक" : "Total: 200 Marks"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. Selection Rules & Cadre Restrictions Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {isHi ? "8. चयन नियम, संवर्ग व आवश्यक निर्देश (Rules)" : "8. Selection Rules, Cadre & Instructions"}
        </h3>
        <div className="overflow-hidden rounded-xl border border-sky-300 dark:border-sky-800 shadow-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#6ac7f2] dark:bg-[#20698f] text-slate-950 dark:text-white font-extrabold text-sm border-b border-sky-300 dark:border-sky-700">
                  <th scope="col" className="px-4 py-3 w-[35%]">{isHi ? "नियम / प्रतिबंध (Rule)" : "Rule / Constraint"}</th>
                  <th scope="col" className="px-4 py-3 w-[65%]">{isHi ? "आधिकारिक नियम विवरण" : "Official Rule Details"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "महिला क्षैतिज आरक्षण" : "Women Reservation"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "समस्त अकार्यपालिक पदों पर 35% क्षैतिज (Horizontal) महिला आरक्षण लागू।" : "35% Horizontal Reservation across all non-executive posts"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "जिला संवर्ग व प्राथमिकता" : "District Cadre & Preference"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "पटवारी पद जिला संवर्ग का पद है; फॉर्म में जिला वरीयता दर्ज करना अनिवार्य।" : "Patwari is a district-level post; district preference required during online form submission"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "गृह तहसील प्रतिबंध" : "Home Tehsil Restriction"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "किसी भी चयनित अभ्यर्थी को उसकी गृह तहसील (Home Tehsil) में पदस्थ नहीं किया जाएगा।" : "Selected candidates cannot be posted in their Home Tehsil"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "विशेष आदिम जनजाति छूट" : "Primitive Tribes Exemption"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "बैगा, सहारिया व भारिया समुदाय के अभ्यर्थियों को परीक्षा से छूट (सीधे ऑफलाइन आवेदन)।" : "Baiga, Sahariya and Bhariya communities exempt from CBT exam (Direct offline application)"}</td>
                </tr>
                <tr className="hover:bg-sky-500/5">
                  <td className="px-4 py-3 font-semibold text-foreground">{isHi ? "बायोमैट्रिक सत्यापन" : "Biometric Verification"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{isHi ? "मूल फोटो पहचान पत्र व बायोमैट्रिक सत्यापन (आधार अनलॉक रखना) अनिवार्य।" : "Original Photo ID & mandatory UIDAI biometric verification at exam center"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
