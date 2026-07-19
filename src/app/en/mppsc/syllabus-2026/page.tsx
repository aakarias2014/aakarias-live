import { getContentRepository } from "@/lib/content/content-repository";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, articleJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "MPPSC State Service Examination 2026 – Exam Plan & Complete Syllabus",
  description:
    "Official MPPSC State Service Exam 2026 pattern and full syllabus for Prelims, Mains, and Interview. Paper-wise, unit-wise breakdown for UPSC/MPPSC aspirants.",
  path: "/en/mppsc/syllabus-2026",
  locale: "en",
  keywords: [
    "MPPSC 2026",
    "MP State Service Exam",
    "MPPSC syllabus",
    "MPPSC prelims",
    "MPPSC mains",
    "MPPSC exam pattern",
  ],
  type: "article",
  publishedTime: "2026-01-05",
});

export default async function EnMppscSyllabus2026Page() {
  const repo = await getContentRepository();
  const syllabus = await repo.getSyllabusPage("syllabus-2026", "en");

  if (syllabus && syllabus.papers) {
    return (
      <>
        <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
          <Container size="wide" className="relative py-16 sm:py-20">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-sm font-semibold text-primary">
                {syllabus.exam} Syllabus {syllabus.year}
              </span>
              <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {syllabus.title}
              </h1>
            </div>
          </Container>
        </section>

        <Section className="pb-0 pt-8">
          <Container size="wide">
            <Breadcrumb items={[{ name: "MPPSC", href: "/mppsc" }, { name: "Syllabus" }]} />
          </Container>
        </Section>

        <Section>
          <Container size="narrow">
            <div className="prose prose-aakar dark:prose-invert max-w-none">
              {syllabus.papers.map((paper: any, pi: number) => (
                <div key={pi} className="space-y-6 mb-12">
                  <h2 className="text-2xl font-bold border-b pb-2">{paper.paperTitle}</h2>
                  {paper.units && paper.units.map((unit: any, ui: number) => (
                    <div key={ui} className="space-y-2 my-6">
                      <h3 className="text-xl font-semibold text-primary">
                        {unit.unitNumber}: {unit.unitTitle}
                      </h3>
                      {unit.details && <p className="leading-relaxed whitespace-pre-line text-foreground/80">{unit.details}</p>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </>
    );
  }

  const pageUrl = `${siteConfig.url}/en/mppsc/syllabus-2026`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "MPPSC", url: `${siteConfig.url}/en/mppsc` },
    { name: "Syllabus 2026", url: pageUrl },
  ]);

  const article = articleJsonLd({
    title: "MPPSC State Service Examination 2026 – Exam Plan & Complete Syllabus",
    description:
      "Official MPPSC State Service Exam 2026 pattern and full syllabus for Prelims, Mains, and Interview.",
    url: pageUrl,
    image: `${siteConfig.url}/api/og?title=MPPSC+Syllabus+2026&category=MPPSC&lang=en&type=article`,
    datePublished: "2026-01-05",
    authorName: "Aakar IAS",
    keywords: [
      "MPPSC 2026",
      "MP State Service Exam",
      "MPPSC syllabus",
      "MPPSC prelims",
      "MPPSC mains",
      "MPPSC exam pattern",
    ],
    inLanguage: "en-IN",
    alternates: { hi: `${siteConfig.url}/mppsc/syllabus-2026`, en: pageUrl },
  });

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-sm font-semibold text-primary">
              MPPSC Syllabus 2026
            </span>
            <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              MPPSC State Service Examination 2026 — Exam Plan &amp; Syllabus
            </h1>
            <p className="mt-4 text-pretty text-lg text-white/75">
              Issued by the Madhya Pradesh Public Service Commission (MPPSC). Dated 05 January 2026.
            </p>
          </div>
        </Container>
      </section>

      {/* ─── Breadcrumb ───────────────────────────────────────────────── */}
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "MPPSC", href: "/en/mppsc" },
              { name: "Syllabus 2026" },
            ]}
          />
        </Container>
      </Section>

      {/* ─── Content ──────────────────────────────────────────────────── */}
      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            {/* ───────────────────────────────────────────────────────────
                 Three stages overview
                ─────────────────────────────────────────────────────────── */}
            <p>
              The MPPSC State Service Examination 2026 is conducted in{" "}
              <strong>three successive stages</strong>:
            </p>
            <ol>
              <li>
                <strong>State Service Preliminary Examination</strong> — objective type (OMR sheet
                based)
              </li>
              <li>
                <strong>State Service Main Examination</strong> — written / descriptive
              </li>
              <li>
                <strong>Interview</strong>
              </li>
            </ol>

            <hr />

            {/* ═══════════════════════════════════════════════════════════
                 1. PRELIMINARY EXAM PATTERN
                ═══════════════════════════════════════════════════════════ */}
            <h2 id="prelims-pattern">1. Preliminary Examination — Exam Pattern</h2>
            <p>
              The Preliminary Examination consists of <strong>two objective (multiple-choice) papers</strong>:
            </p>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Paper</th>
                    <th>Subject</th>
                    <th>Duration</th>
                    <th>Maximum Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paper I</td>
                    <td>General Studies</td>
                    <td>2 hours</td>
                    <td>300</td>
                  </tr>
                  <tr>
                    <td>Paper II</td>
                    <td>General Aptitude Test</td>
                    <td>2 hours</td>
                    <td>300</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Key Rules</h3>
            <ul>
              <li>
                The Preliminary Examination is only a{" "}
                <strong>qualifying / eligibility test</strong>. Candidates are declared qualified
                for the Main Examination based on the marks obtained here. The{" "}
                <strong>
                  final selection list is prepared only on the basis of marks in the Main
                  Examination and Interview
                </strong>
                .
              </li>
              <li>
                Both papers are objective (MCQ). Each question has four options (A, B, C, D), of
                which one is correct. Candidates must mark a single answer by darkening the circle
                on the OMR sheet.
              </li>
              <li>
                Each paper has <strong>100 questions of 3 marks each</strong>.
              </li>
              <li>
                <strong>Negative marking applies</strong>: marks are calculated as{" "}
                <strong>(3R − W)</strong>, where <strong>R = number of correct answers</strong> and{" "}
                <strong>W = number of wrong answers</strong>. Each correct answer earns 3 marks;{" "}
                <strong>1 mark is deducted for every wrong answer</strong>.
              </li>
              <li>
                Every question paper is set in <strong>both Hindi and English</strong>. However,
                questions under{" "}
                <strong>
                  Topic 7 of Paper II (&ldquo;Hindi Language Comprehension Skill&rdquo;)
                </strong>{" "}
                appear in <strong>Hindi only</strong>.
              </li>
              <li>
                A provisional answer key is published on{" "}
                <strong>https://mppsc.mp.gov.in</strong> after the exam. Objections can be filed
                online within <strong>05 days</strong> (with the prescribed per-question fee)
                through the official portal only. No objections are entertained after the 05-day
                window.
              </li>
            </ul>

            <h3>Qualifying Marks (Prelims → Mains)</h3>
            <p>
              The number of candidates shortlisted for the Main Examination will be a{" "}
              <strong>maximum of 20 times</strong> the total number of vacancies. Candidates at the
              cut-off margin scoring equal marks are also declared qualified.
            </p>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Minimum Qualifying % (each paper)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Unreserved (including Unreserved Women)</td>
                    <td>40%</td>
                  </tr>
                  <tr>
                    <td>SC / ST / OBC / EWS / PwD</td>
                    <td>30%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <blockquote>
              <p>
                <strong>Note:</strong> Paper II of the Prelims is qualifying only. Its marks are{" "}
                <strong>not</strong> counted toward the merit ranking for the Preliminary result.
                The State Forest Service Prelims syllabus is the same as the State Service Prelims;
                however, the{" "}
                <strong>
                  State Forest Service merit list is prepared by combining marks of both papers
                </strong>
                .
              </p>
            </blockquote>

            <hr />

            {/* ═══════════════════════════════════════════════════════════
                 2. PRELIMINARY EXAM SYLLABUS
                ═══════════════════════════════════════════════════════════ */}
            <h2 id="prelims-syllabus">2. Preliminary Examination — Syllabus</h2>

            {/* Paper I */}
            <h3 id="paper-i-gs">Paper I — General Studies</h3>

            <h4>1. History of India</h4>
            <ul>
              <li>
                <strong>Concepts and Ideas</strong> — Ancient Indian Knowledge Tradition,
                Bharatvarsha, Vedas, Upanishad, Aranyaka, Brahman Granth, Shaddarshan, Smritiyan,
                Rit Sabha-Samiti, Gantantra (Republic), Varnashrama, Purushartha, Rin Sanskara,
                Panch Mahayagya / Yagya, Principle of Karma, Bodhisatva, Teerthankar.
              </li>
              <li>
                Salient features, events and their administrative, social and economic systems of
                Ancient and Medieval India.
              </li>
              <li>
                India&apos;s cultural heritage — Art forms, literature, festivals and events.
              </li>
              <li>Social and Religious Reform Movements in the 19th and 20th century.</li>
              <li>Independence Struggle and Indian National Movement.</li>
              <li>Integration and Reorganization of India after Independence.</li>
            </ul>

            <h4>2. History, Culture and Literature of Madhya Pradesh</h4>
            <ul>
              <li>Major Events and Major Dynasties of Madhya Pradesh.</li>
              <li>Contribution of Madhya Pradesh in the Freedom Movement.</li>
              <li>Major Arts and Sculpture of Madhya Pradesh.</li>
              <li>Major Tribes and Dialects of Madhya Pradesh.</li>
              <li>
                Major Festivals, Folk Music, Folk Arts and Folk Literature of Madhya Pradesh.
              </li>
              <li>
                Important literary creators of Madhya Pradesh and their literary creations.
              </li>
              <li>
                Major Tourist Places of Religious, Cultural and Archaeological importance in Madhya
                Pradesh.
              </li>
              <li>World Heritage sites in Madhya Pradesh.</li>
              <li>Important Tribal Personalities of Madhya Pradesh.</li>
            </ul>

            <h4>3. Geography of India</h4>
            <ul>
              <li>Mountains, Hills, Plateaus, Rivers and Lakes.</li>
              <li>
                Climate phenomena — El Nino, La Nina, Southern Oscillation, Western Disturbance,
                Consequences of Climate Change.
              </li>
              <li>Natural Resources — Forest, Minerals, Water Resources.</li>
              <li>
                Major Crops, Food Security, Green Revolution, Strategies for the Second Green
                Revolution.
              </li>
              <li>Conventional and Non-Conventional sources of energy.</li>
              <li>Natural hazards and disasters in India, Major cyclones in India.</li>
              <li>
                Population growth, distribution and density, Rural-Urban Migration.
              </li>
            </ul>

            <h4>4. Geography of Madhya Pradesh</h4>
            <ul>
              <li>Forest, Forest Produce, Rivers, Hills and Plateaus.</li>
              <li>Climate — Seasons, Temperature, Rainfall.</li>
              <li>Natural Resources — Soils and Major Mineral resources.</li>
              <li>Major Crops, Water Resources, Irrigation and Irrigation Projects.</li>
              <li>Conventional and Non-Conventional Sources of Energy.</li>
              <li>Major Industries of Madhya Pradesh.</li>
              <li>Population Growth, Distribution and Density, Urbanisation.</li>
            </ul>

            <h4>5. Constitutional System of India and Madhya Pradesh</h4>
            <ul>
              <li>Constituent Assembly.</li>
              <li>Federal Executive, President and Parliament.</li>
              <li>Supreme Court and Judicial System.</li>
              <li>Constitutional Amendments.</li>
              <li>
                Fundamental Rights and Duties of Citizens, Duties and Directive Principles of State.
              </li>
              <li>National and Regional Constitutional / Statutory Commissions and Institutions.</li>
              <li>
                Constitutional System of Madhya Pradesh (Governor, Cabinet, Legislative Assembly,
                High Court).
              </li>
              <li>
                Three-Tier Panchayati Raj and Civil Administration system in Madhya Pradesh.
              </li>
              <li>Good Governance in Madhya Pradesh (Governance System).</li>
            </ul>

            <h4>6. Economy of India and Madhya Pradesh</h4>
            <ul>
              <li>Current Situation of Madhya Pradesh in the Indian Economy.</li>
              <li>
                Population and Human Resources Development — Education, Health and Skills in Madhya
                Pradesh.
              </li>
              <li>Progress in Sustainable Development Goals in Madhya Pradesh.</li>
              <li>
                Development of Agriculture, Industry, MSME and Infrastructure in Madhya Pradesh.
              </li>
              <li>Self-Reliant / Atma Nirbhar Madhya Pradesh, One District One Product (ODOP).</li>
              <li>Progress of Intellectual Property Rights (IPR) in Madhya Pradesh.</li>
              <li>
                Recent Trends in Indian Economy — Agriculture, Industry and Service sectors.
              </li>
              <li>
                Financial Institutions — Reserve Bank, Commercial Banks, SEBI, Non-Banking Financial
                Institutions.
              </li>
              <li>India&apos;s foreign Trade Policies — G-20, SAARC and ASEAN.</li>
            </ul>

            <h4>7. Science, Environment and Health</h4>
            <ul>
              <li>Preliminary Knowledge of Main Branches of Science.</li>
              <li>Important Indian Scientific Research Institutions and their Achievements.</li>
              <li>
                Satellite and Space Technology — Achievements of India in the field of Space
                Science.
              </li>
              <li>Structure of the Human Body.</li>
              <li>Nutrition, Food, Nutrient and Malnutrition.</li>
              <li>
                Genetic Disease, Sickle Cell Anemia — Cause, Effect, Diagnosis and Programme.
              </li>
              <li>
                Health Policy and Programmes, Infectious disease and its Prevention, Health
                Indicators.
              </li>
              <li>Concept of Sustainable Development and SDGs.</li>
              <li>Environmental Factors, Biodiversity and Ecosystem.</li>
              <li>Pollution, Natural Calamities and Management.</li>
            </ul>

            <h4>8. International, National and Current Events of Madhya Pradesh</h4>
            <ul>
              <li>International Current Events.</li>
              <li>National Current Events.</li>
              <li>Current Events of Madhya Pradesh.</li>
            </ul>

            <h4>9. Information and Communication Technology</h4>
            <ul>
              <li>Basic Knowledge of Computer.</li>
              <li>Electronics, Information and Communication Technology.</li>
              <li>Robotics, Artificial Intelligence and Cyber Security.</li>
              <li>E-Governance.</li>
              <li>Internet and Social Networking Platforms.</li>
            </ul>

            <h4>
              10. Tribes of Madhya Pradesh — Heritage, Folk Culture and Folk Literature
            </h4>
            <ul>
              <li>
                The Geographical distribution of the Tribes in Madhya Pradesh, Constitutional
                Provisions Related to Tribes.
              </li>
              <li>
                Major Tribes of Madhya Pradesh, Particularly Vulnerable Tribal Groups (PVTG) and
                Tribal Welfare Programs.
              </li>
              <li>
                Tribal Culture of Madhya Pradesh — Customs, Traditions, Special Arts, Festivals,
                Dialects and Literature.
              </li>
              <li>
                Madhya Pradesh Tribals&apos; Contribution to the Freedom Movement of India, Tribal
                Personalities of Madhya Pradesh, Important Institutes, Museums and Publications
                related to tribes of Madhya Pradesh.
              </li>
              <li>Folk Culture and Literature of Madhya Pradesh.</li>
            </ul>

            <hr />

            {/* Paper II */}
            <h3 id="paper-ii-gat">Paper II — General Aptitude Test</h3>
            <ol>
              <li>Comprehension.</li>
              <li>Life Style and Counter Force.</li>
              <li>Communication Skill.</li>
              <li>Logical Reasoning and Analytical Ability.</li>
              <li>Decision Making and Problem Solving.</li>
              <li>General Mental Ability.</li>
              <li>
                Basic Numeracy (Numbers and their Relations, order of magnitude, etc. — Class X
                level); Data Interpretation (charts, graphs, tables, data sufficiency, etc.) of
                Class X level.
              </li>
              <li>Hindi Language Comprehension Skill (Class X level).</li>
            </ol>

            <blockquote>
              <p>
                <strong>Note:</strong> Questions on Hindi Language Comprehension skill are of Class
                X level and tested through passages in Hindi only,{" "}
                <strong>without</strong> an English translation in the question paper.
              </p>
            </blockquote>

            <hr />

            {/* ═══════════════════════════════════════════════════════════
                 3. MAIN EXAM PLAN
                ═══════════════════════════════════════════════════════════ */}
            <h2 id="mains-pattern">3. Main Examination — Exam Plan</h2>
            <p>
              The Main Examination consists of{" "}
              <strong>6 descriptive papers. All papers are compulsory.</strong>
            </p>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Paper</th>
                    <th>Part</th>
                    <th>Subject</th>
                    <th>Max Marks</th>
                    <th>Duration</th>
                    <th>Medium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={2}>General Studies – Paper I</td>
                    <td>(A)</td>
                    <td>History</td>
                    <td>150</td>
                    <td rowSpan={2}>3 hours</td>
                    <td rowSpan={2}>Hindi or English</td>
                  </tr>
                  <tr>
                    <td>(B)</td>
                    <td>Geography</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>General Studies – Paper II</td>
                    <td>(A)</td>
                    <td>Political Science</td>
                    <td>150</td>
                    <td rowSpan={2}>3 hours</td>
                    <td rowSpan={2}>Hindi or English</td>
                  </tr>
                  <tr>
                    <td>(B)</td>
                    <td>Sociology</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>General Studies – Paper III</td>
                    <td>(A)</td>
                    <td>Economics</td>
                    <td>150</td>
                    <td rowSpan={2}>3 hours</td>
                    <td rowSpan={2}>Hindi or English</td>
                  </tr>
                  <tr>
                    <td>(B)</td>
                    <td>Science, Technology &amp; Public Health</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>General Studies – Paper IV</td>
                    <td>(A)</td>
                    <td>Philosophy, Psychology, Public Administration &amp; Case Study</td>
                    <td>150</td>
                    <td rowSpan={2}>3 hours</td>
                    <td rowSpan={2}>Hindi or English</td>
                  </tr>
                  <tr>
                    <td>(B)</td>
                    <td>Entrepreneurship, Management, Personality Development &amp; Case Study</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td>Paper V</td>
                    <td>—</td>
                    <td>General Hindi &amp; Grammar</td>
                    <td>200</td>
                    <td>2 hours</td>
                    <td>Hindi</td>
                  </tr>
                  <tr>
                    <td>Paper VI</td>
                    <td>—</td>
                    <td>Hindi Essay &amp; Drafting</td>
                    <td>100</td>
                    <td>2:30 hours</td>
                    <td>Hindi</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <strong>Total</strong>
                    </td>
                    <td>
                      <strong>1500</strong>
                    </td>
                    <td colSpan={2} />
                  </tr>
                </tbody>
              </table>
            </div>

            <ul>
              <li>
                <strong>Interview:</strong> 185 marks
              </li>
              <li>
                <strong>Grand Total:</strong> 1685 marks
              </li>
            </ul>

            <h3>Marks Distribution — GS Papers I, II &amp; III (each Part A &amp; B)</h3>
            <p>
              For General Studies Paper I, II and III, candidates may answer in{" "}
              <strong>Hindi or English</strong>. Each Part (A and B) is structured as:
            </p>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Question Type</th>
                    <th>No. of Questions</th>
                    <th>Marks per Question</th>
                    <th>Max Word Limit</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Very Short Answer</td>
                    <td>15</td>
                    <td>02</td>
                    <td>20</td>
                    <td>30</td>
                  </tr>
                  <tr>
                    <td>Short Answer</td>
                    <td>10</td>
                    <td>07</td>
                    <td>60</td>
                    <td>70</td>
                  </tr>
                  <tr>
                    <td>Long Answer</td>
                    <td>05</td>
                    <td>10</td>
                    <td>200</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>
                      <strong>30 questions</strong>
                    </td>
                    <td />
                    <td />
                    <td>
                      <strong>150 marks</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Marks Distribution — GS Paper IV (each Part A &amp; B)</h3>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Question Type</th>
                    <th>No. of Questions</th>
                    <th>Marks per Question</th>
                    <th>Max Word Limit</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Very Short Answer</td>
                    <td>16</td>
                    <td>02</td>
                    <td>20</td>
                    <td>32</td>
                  </tr>
                  <tr>
                    <td>Short Answer</td>
                    <td>08</td>
                    <td>07</td>
                    <td>60</td>
                    <td>56</td>
                  </tr>
                  <tr>
                    <td>Long Answer</td>
                    <td>04</td>
                    <td>11</td>
                    <td>200</td>
                    <td>44</td>
                  </tr>
                  <tr>
                    <td>Case Study</td>
                    <td>01</td>
                    <td>18</td>
                    <td>As directed</td>
                    <td>18</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>
                      <strong>29 questions</strong>
                    </td>
                    <td />
                    <td />
                    <td>
                      <strong>150 marks</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Paper V &amp; VI Notes</h3>
            <ul>
              <li>
                <strong>Paper V (General Hindi &amp; Grammar):</strong> Hindi medium only, 200
                marks, 2 hours.
              </li>
              <li>
                <strong>Paper VI (Hindi Essay &amp; Drafting):</strong> Hindi medium only, 100
                marks, 2:30 hours.
              </li>
            </ul>

            <h4>Paper VI — Question Breakdown</h4>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Question</th>
                    <th>No. of Questions</th>
                    <th>Max Words</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>First Essay</td>
                    <td>01</td>
                    <td>1000</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>02</td>
                    <td>Second Essay</td>
                    <td>01</td>
                    <td>500</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>Drafting (Praroop Lekhan)</td>
                    <td>01</td>
                    <td>500</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>04</td>
                    <td>Report (Prativedan)</td>
                    <td>01</td>
                    <td>250</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td />
                    <td />
                    <td>
                      <strong>100</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Mains Qualifying Marks</h3>
            <p>
              For <strong>each Main paper</strong> (combining Parts A and B):
            </p>
            <ul>
              <li>
                <strong>Unreserved (incl. Unreserved Women):</strong> minimum <strong>40%</strong>
              </li>
              <li>
                <strong>SC / ST / OBC / EWS / PwD:</strong> minimum <strong>30%</strong>
              </li>
            </ul>
            <p>
              For the Interview, candidates are shortlisted category-wise at{" "}
              <strong>03 times</strong> the number of advertised posts (candidates with equal
              cut-off marks are also included).
            </p>

            <hr />

            {/* ═══════════════════════════════════════════════════════════
                 4. MAIN EXAM DETAILED SYLLABUS
                ═══════════════════════════════════════════════════════════ */}
            <h2 id="mains-syllabus">4. Main Examination — Detailed Syllabus</h2>

            {/* ─── Paper I, Part (A) — History ──────────────────────── */}
            <h3 id="mains-paper-i-a">Paper I, Part (A) — History</h3>

            <h4>Unit I</h4>
            <ul>
              <li>
                Indian History — Political, Economic, Social and Cultural History of India from the
                Harappan civilization to the 10th Century A.D.
              </li>
              <li>
                Political, Economic, Social and Cultural History of India from the 11th to 18th
                Century A.D.
              </li>
              <li>
                Sultanate and Mughal Rulers and their Administration, and Evolution of Medieval
                Culture.
              </li>
            </ul>

            <h4>Unit II</h4>
            <ul>
              <li>
                Pre-historic and Proto-historic Madhya Pradesh. Major Dynasties of Madhya Pradesh —
                Gardbhill, Nag, Olinkar and Parivrajak, Uccha Kalp, Gurjar-Pratihara, Kalchuri,
                Chandel, Parmar, Tomar, Gond and Kacchapghaat Dynasty.
              </li>
            </ul>

            <h4>Unit III</h4>
            <ul>
              <li>Impact of British Rule on Indian Economy and Society.</li>
              <li>
                Reactions of Indians against British Colonial Rule — Peasant and Tribal Revolts, the
                First Freedom Movement of Independence. Indian Renaissance — National Freedom
                Movement and its leaders.
              </li>
              <li>Freedom Movement in Madhya Pradesh.</li>
            </ul>

            <h4>Unit IV</h4>
            <ul>
              <li>
                Emergence of India as a Republic Nation, Reorganization of States, Formation of
                Madhya Pradesh, Major events of the post-independence period.
              </li>
              <li>
                Indian Cultural Heritage (with special reference to Madhya Pradesh) — Salient
                aspects of Art Forms, Literature, Festivals and Architecture from ancient to modern
                times.
              </li>
              <li>World Heritage Sites and Tourism in Madhya Pradesh.</li>
            </ul>

            <h4>Unit V</h4>
            <ul>
              <li>
                Major Princely States of Madhya Pradesh — Gondwana, Bundeli, Bagheli, Holkar,
                Scindia and Bhopal State (till independence).
              </li>
              <li>
                Struggle of Tribal Heroes of Madhya Pradesh and their contribution in History —
                Shankar Shah, Raghunath Shah, Bhimaji Nayak, Khajya Nayak, Tantya Bhil, Ganjan
                Singh Korku, Badal Bhoe, Pema Falya.
              </li>
            </ul>

            <hr />

            {/* ─── Paper I, Part (B) — Geography ────────────────────── */}
            <h3 id="mains-paper-i-b">Paper I, Part (B) — Geography</h3>

            <h4>Unit I — Physical Features and Climate of India</h4>
            <ul>
              <li>Geographical Knowledge in Ancient India.</li>
              <li>
                Major Physiographic Divisions of India — the Himalayan Mountains, The Great Plain of
                North India, The Peninsular Plateau.
              </li>
              <li>Major Hills, Plateaus, Rivers and Lakes.</li>
              <li>Soils of India — Types and distribution.</li>
              <li>
                Climate — Seasons, Temperature, Rainfall, Origin of Monsoon, Upper Air Circulation –
                Jet Stream.
              </li>
              <li>
                Climatic Phenomena — El-Nino, La-Nina, Southern Oscillation, Western Disturbances,
                Indian Ocean Dipole (IOD), Consequences of Climate Change.
              </li>
            </ul>

            <h4>Unit II — India: Agriculture and Water Resources</h4>
            <ul>
              <li>Agriculture — Production and Distribution of Major crops and Millets.</li>
              <li>
                Irrigation — Types of Irrigation Techniques, Sources of Irrigation and Multipurpose
                Projects.
              </li>
              <li>
                Food Security, Green Revolution, Strategies for Second Green Revolution and
                Sustainable Agriculture.
              </li>
              <li>
                Conservation and Augmentation of Water Resources — Rainwater Harvesting, Methods of
                Water Conservation, Interlinking the Rivers, National Water Policy.
              </li>
            </ul>

            <h4>Unit III — India: Natural Resources and Industries</h4>
            <ul>
              <li>Forest Resources — Their Types and Distribution.</li>
              <li>Major Minerals and Energy Resources.</li>
              <li>Energy Crises and Non-Conventional Sources of Energy.</li>
              <li>
                Major Industries — Iron and Steel, Cement, Paper, Sugar, Cotton Textile Industry.
              </li>
              <li>Major Food Processing Industries.</li>
            </ul>

            <h4>Unit IV — Disasters and Techniques</h4>
            <ul>
              <li>
                Natural Hazards and Disasters in India — Earthquake, Tsunamis, Droughts, Floods,
                Hailstorm, Fog, Cloud burst, Thunderstorm, Tropical Cyclones in India.
              </li>
              <li>
                Environmental Pollution — Air, Water, Soil/Land Pollution and their Prevention,
                Control and Management; Measures to Mitigate Pollution.
              </li>
              <li>
                Population Growth in India, Population Pressure on Resources, Rural-Urban Migration.
              </li>
              <li>
                Advanced Techniques in Geography — Remote Sensing, Geographical Information System
                (GIS), Global Positioning System (GPS) and their Applications; Types of Satellites.
              </li>
            </ul>

            <h4>Unit V — Geography of Madhya Pradesh</h4>
            <ul>
              <li>
                Major Physiographic Divisions — Malwa Plateau, Madhya Bharat Plateau, Bundelkhand
                Plateau, Vindhyachal Range, Baghelkhand Plateau, Narmada-Son Valley, Satpura Range.
              </li>
              <li>Major Rivers and Their Tributaries.</li>
              <li>Climate — Seasons, Temperature, Rainfall.</li>
              <li>
                Soils of Madhya Pradesh — Types and Distribution, Soil Erosion and Soil
                Conservation.
              </li>
              <li>Natural Vegetation — Types and Distribution of Forests, Major Forest Produce.</li>
              <li>Major Crops, Irrigation and Irrigation Projects.</li>
              <li>Major Minerals and Energy Resources, Non-Conventional Sources of Energy.</li>
              <li>Major Industries, Small and Cottage Industries.</li>
              <li>Population Growth, Distribution and Density, Urbanisation.</li>
            </ul>

            <hr />

            {/* ─── Paper II, Part (A) — Constitution ────────────────── */}
            <h3 id="mains-paper-ii-a">
              Paper II, Part (A) — Constitution, Governance, Political and Administrative Structure
            </h3>

            <h4>Unit I</h4>
            <ul>
              <li>
                Constitution of India — Its Formation, characteristics, Basic Structure and
                important amendments.
              </li>
              <li>
                Conceptual elements — Objectives, Fundamental Rights, Fundamental Duties and
                Directive Principles of State Policy.
              </li>
              <li>
                Federalism — Central-State Relations, Supreme Court, High Court, Judicial Review,
                Judicial Activism, Lok Adalat and Public Interest Litigation.
              </li>
            </ul>

            <h4>Unit II</h4>
            <ul>
              <li>
                Election Commission of India, Comptroller and Auditor General of India, Union Public
                Service Commission, Madhya Pradesh Public Service Commission and NITI Aayog.
              </li>
              <li>
                Role of caste, Religion, class, Ethnicity, language and gender in Indian politics;
                Political parties and voting behaviour; Civil society and Mass movement; Issues
                related to National Integrity and security.
              </li>
            </ul>

            <h4>Unit III</h4>
            <ul>
              <li>
                Salient Features of democracy — Political Representation, Participation of Citizens
                in the Decision-making Process.
              </li>
              <li>
                Community Based Organizations (CBO), Non-Government Organizations (NGOs) and Self
                Help Groups (SHG).
              </li>
              <li>Role of Media and Problems (Electronic, Print and Social Media).</li>
              <li>
                Indian Political Thinkers — Kautilya, Devi Ahilya Bai Holkar, Mahatma Gandhi,
                Jawaharlal Nehru, Sardar Vallabh Bhai Patel, Ram Manohar Lohia, Dr. Bhimrao
                Ambedkar, Pandit Deendayal Upadhyaya, Jayaprakash Narayan.
              </li>
            </ul>

            <h4>Unit IV</h4>
            <ul>
              <li>
                Reorganization of State 1956 and Foundation of Madhya Pradesh, Partition of Madhya
                Pradesh (2000).
              </li>
              <li>
                Governor — Appointment, Powers, Status; Chief Minister and Council of Ministers —
                Structure, Function and Role.
              </li>
              <li>
                The State Legislature of Madhya Pradesh — Constitution and Powers, Role of Speaker,
                Role of Opposition.
              </li>
              <li>
                High Court of Madhya Pradesh — Constitution, Jurisdiction and Role.
              </li>
              <li>
                Accountability and Rights — Competition Commission, Scheduled Caste Commission,
                Scheduled Tribes Commission and Other Backward Caste Commission, Central Vigilance
                Commission, Human Rights Commission, Information Commission, Consumer Forum,
                Children&apos;s Commission, Women&apos;s Commission.
              </li>
            </ul>

            <h4>Unit V</h4>
            <ul>
              <li>
                Administration of Madhya Pradesh — Secretariat, Chief Secretary, Secretary and
                Commissioner, District Administration, Role of District Collector.
              </li>
              <li>
                Rural Local Self Government in Madhya Pradesh — Panchayati Raj organization and
                Powers; Urban Local Self Government — Organization and Powers; Finance, Bureaucracy
                in Local Self Government and importance of autonomy.
              </li>
              <li>
                Political Scenario of Madhya Pradesh — Upliftment of Tribal, Backward and Deprived
                classes and issues related to the Naxalite problem.
              </li>
              <li>Contribution of Women in Politics of Madhya Pradesh.</li>
              <li>Current Issues in the Politics of Madhya Pradesh.</li>
            </ul>

            <hr />

            {/* ─── Paper II, Part (B) — Sociology ────────────────────── */}
            <h3 id="mains-paper-ii-b">Paper II, Part (B) — Sociology</h3>

            <h4>Unit I — Basic Concepts of Sociology</h4>
            <ul>
              <li>
                Indian Concept of Society — Joint Family, Family, Kinship, Lineage, Clan, Gotra
                tradition.
              </li>
              <li>Community, Institution, Association, Culture, Norms and Values.</li>
              <li>
                Elements of Social Harmony, Concept of Civilisation and Culture, Salient Features of
                Indian Culture.
              </li>
              <li>
                Social Institutions — Family, Education, Religion, Varna, Rin, Yagya, Sanskar.
              </li>
              <li>
                Rituals — Various references, Caste system, Ashram, Purushartha, Impact of Religion
                and Sects on society and marriage.
              </li>
            </ul>

            <h4>Unit II — Diversity and Challenges in Indian Society</h4>
            <ul>
              <li>Conceptualizing Indian Society — People of India, Unity in diversity.</li>
              <li>Cultural diversity — Regional, Linguistic, Religious, and Tribal.</li>
              <li>
                Changing scenario of Crime — Drug addiction, Suicide, Cyber Crime, Crimes against
                Women and Domestic Violence.
              </li>
              <li>Current Debate — Tradition and Modernity in India.</li>
              <li>Problems of Nation Building — Secularism, Pluralism and Nation building.</li>
            </ul>

            <h4>Unit III — Rural and Urban Sociology</h4>
            <ul>
              <li>
                Approaches to the study of Rural Society — Rural-Urban differences, Ruralism and
                Urbanism.
              </li>
              <li>
                Peasant studies, Panchayati Raj System before and after the 73rd Amendment, Rural
                Leadership, Factionalism, Empowerment of People.
              </li>
              <li>
                Social issues and Strategies for Rural Development — Bonded and Migrant labours,
                Trends of change in rural society.
              </li>
              <li>
                Characteristics of Urban Community, Changes in Urban Community, Causes and Impact of
                Urbanization.
              </li>
              <li>
                Concept of Town Planning, Factors affecting Urban Planning, Problems of Urban
                Management in India.
              </li>
            </ul>

            <h4>Unit IV — Industrialization, Globalization, Social Development and Population</h4>
            <ul>
              <li>
                Industrialization and Social Change in India — Impact on Family, Education,
                Stratification; Class and Class Conflict in Industrial Society.
              </li>
              <li>
                The Challenges of Globalization, Indianization of Sociology, Privatization of
                Education.
              </li>
              <li>
                Social Structure and Development, Facilitators, Inhibitors, Development and
                Socio-Economic disparities.
              </li>
              <li>
                Culture and Development — Culture as aid and impediment, Post-Modernization,
                Westernization.
              </li>
              <li>
                Population Growth and Distribution in India — Growth since 1901, Causes and Effects.
              </li>
              <li>
                Concepts — Fertility, Mortality, Morbidity, Migration, Age and Sex composition.
              </li>
            </ul>

            <h4>Unit V — Human Resource Development and Social Welfare Schemes</h4>
            <ul>
              <li>
                National Education Policy 2020 — Vision, Principles, School Education, Higher
                Education, Professional Education, Online and Digital Education, Adult Education and
                Lifelong learning.
              </li>
              <li>
                Issues related to Social Classes and their Welfare Programmes — Senior Citizens,
                Children, Women, Underprivileged Classes and Displaced groups arising out of
                Developmental Projects; Issues related to Girls&apos; Education.
              </li>
              <li>
                Community Development Programme, Extension Education, Panchayati Raj, Role of NGOs
                in Community Development.
              </li>
              <li>
                Status of Tribes in Madhya Pradesh and their Social Structure, Customs, Beliefs,
                Marriage, Kinship, Religious Beliefs, Traditions, Festivals and Celebrations.
              </li>
              <li>Folk Culture of Madhya Pradesh.</li>
            </ul>

            <hr />

            {/* ─── Paper III, Part (A) — Economics ──────────────────── */}
            <h3 id="mains-paper-iii-a">Paper III, Part (A) — Economics</h3>

            <h4>Unit I — Fundamental Aspects of the Indian Economy</h4>
            <ul>
              <li>Salient features of the Indian economy.</li>
              <li>Viksit Bharat @2047.</li>
              <li>Sectoral contribution of Agriculture, Industry and Service Sector.</li>
              <li>Different concepts of National Income.</li>
              <li>Major Crops and Cropping Patterns.</li>
              <li>Challenges — Declining Productivity, Farmer Distress and Weather Dependency.</li>
              <li>Government Initiatives — PM-KISAN, NMSA and various schemes.</li>
              <li>Agriculture Price Policy, Marketing and Finance.</li>
              <li>Agri Start-ups and Agro-Processing for Value Addition.</li>
              <li>Industrial Policies and Industrial Development in India.</li>
              <li>Manufacturing and Infrastructure — Make in India and Infrastructure Projects.</li>
              <li>Hospitality and Tourism — Contribution to Foreign Exchange Earnings.</li>
              <li>Standardisation of Goods and Services in India.</li>
            </ul>

            <h4>Unit II — Taxation and Policy Landscape</h4>
            <ul>
              <li>
                Fiscal Policy — Public Expenditure, Revenue, Taxation and Deficit Management.
              </li>
              <li>Monetary Policy and Financial Inclusion in India.</li>
              <li>Impact of Cash Transactions on the Informal Economy.</li>
              <li>Food Security and Public Distribution System.</li>
              <li>Poverty, Unemployment and Regional Imbalances.</li>
              <li>India&apos;s Foreign Trade — Value, Composition and Direction.</li>
              <li>Export Promotion, Import Substitution and Foreign Capital.</li>
              <li>
                Role of International Financial Institutions — IMF, World Bank, ADB and WTO.
              </li>
            </ul>

            <h4>Unit III — Overview of Madhya Pradesh Economy</h4>
            <ul>
              <li>
                Growth in State Domestic Product and Per Capita Income; Self Reliant / Aatm Nirbhar
                Madhya Pradesh (ANMP); One District One Product (ODOP).
              </li>
              <li>Major Crops, Cropping Patterns and Holdings.</li>
              <li>Food Security, Distribution Systems and Storage.</li>
              <li>Horticulture, Livestock, Dairy and Fisheries.</li>
              <li>Industrial Sector&apos;s Status, Infrastructure Development.</li>
              <li>MSME and Growth of Traditional Industries and Support.</li>
              <li>
                Rural and Urban Development in Madhya Pradesh; Tribal Economy — Farming Methods,
                Major Forest Produce, Handicrafts and Haat Bazaar.
              </li>
              <li>Tourism, Trade and Investment Promotion.</li>
            </ul>

            <h4>Unit IV — Social and Economic Development in Madhya Pradesh</h4>
            <ul>
              <li>Health Infrastructure, Education and Skill Development.</li>
              <li>
                Policies for Natural Resource Management — Forests, Water and Minerals.
              </li>
              <li>Financial and Social Inclusion and Welfare Schemes.</li>
              <li>Influence of Demography of Madhya Pradesh.</li>
              <li>Productivity of Human Resources and Employment.</li>
              <li>Progress of Intellectual Property Rights (IPR) in Madhya Pradesh.</li>
              <li>State Revenue, Expenditure, Debt and Financial Discipline.</li>
            </ul>

            <h4>Unit V — Statistics, Data Analysis and Probability</h4>
            <ul>
              <li>Data collection techniques.</li>
              <li>Mean, Median and Mode — Calculations and Interpretations.</li>
              <li>Types of data analysis — Descriptive vs. Inferential.</li>
              <li>Sampling techniques.</li>
              <li>Data presentation techniques — Tables, charts, graphs.</li>
              <li>Basic concepts of probability.</li>
            </ul>

            <hr />

            {/* ─── Paper III, Part (B) — Science, Technology and Public Health ── */}
            <h3 id="mains-paper-iii-b">
              Paper III, Part (B) — Science, Technology and Public Health
            </h3>

            <h4>Unit I — General Science</h4>
            <ul>
              <li>Simple Application of Science.</li>
              <li>Micro-organism — Structure and types, and Organic Farming.</li>
              <li>
                Cell — Structure, Types, Division and Function; Classification of Animals and
                Plants.
              </li>
              <li>
                Nutrition in Plants, Animals and Human beings; Balanced Diet, Vitamins, Deficiency
                Diseases, Hormones; Body Organs of Human Beings — Structure and Functioning.
              </li>
              <li>
                Biotechnology — Definition and its uses in sectors like Health and Medicine,
                Agriculture, Horticulture, Animal Husbandry, Industry and Environment.
              </li>
              <li>Application of Ethnobiology.</li>
              <li>
                Contribution in Astronomy by Aryabhata, Varahamihira, Brahmagupta and Bhaskar First
                and Second; Initial information of Ancient and Modern Observatories.
              </li>
              <li>Patents and Intellectual Property Rights (TRIPS, TRIMS).</li>
            </ul>

            <h4>Unit II — Computer Science &amp; Mathematical Science</h4>
            <p>
              <strong>Computer Science</strong>
            </p>
            <ul>
              <li>Types of Computers, Characteristics and Generation.</li>
              <li>
                Memory, Input and Output Devices, Storage Devices, Software and Hardware, Operating
                Systems, Windows, Uses of Microsoft Office.
              </li>
              <li>
                Fundamental Knowledge of Computer Languages (C, C++, Java), Translators,
                Interpreters and Assemblers.
              </li>
              <li>Internet and E-mail.</li>
              <li>Social Media.</li>
              <li>E-Governance.</li>
              <li>
                Fundamental Knowledge of Artificial Intelligence (AI), Cloud Computing, Different
                useful Portals, Websites and Webpages.
              </li>
            </ul>
            <p>
              <strong>Mathematical Science</strong>
            </p>
            <ul>
              <li>
                Numbers and their types, Methods of Unit Measurement, Equations and Factors, Profit
                &amp; Loss, Percentage, Simple and Compound Interest, Ratio-Proportion.
              </li>
              <li>Area and Volume of Geometric shapes and Surface area.</li>
            </ul>

            <h4>Unit III — AYUSH &amp; Ayurveda</h4>
            <ul>
              <li>
                AYUSH — Basic Principles of Ayurveda, Yoga and Naturopathy, Unani, Siddha,
                Sowa-Rigpa, and Basic Principles of Homeopathic Treatment.
              </li>
              <li>One Nation One Health System / Policy-2030.</li>
              <li>
                Ayurveda — Basic knowledge of Tridosh, Panchamahabhut (Aakash, Vayu, Agni, Jal,
                Prathvi), Dincharya, Ritucharya, Panchkarma; Biological Clock.
              </li>
              <li>
                Health Management including AYUSH at the Central, State, District and Village level;
                National Health Policy (NHP) and scope of Ayurveda in NHP.
              </li>
              <li>
                Yoga — Preliminary knowledge of Panchkosh Principles, Ashtanga Yoga, Shatkarma,
                Mudra. Naturopathy — Therapeutic effect of Soil treatment, Sun Bath, Hydrotherapy
                and its types.
              </li>
              <li>
                Shodasha Sanskar — General Knowledge of Namkarana, Nishkramana, Karnavedha, etc.,
                and its scientific importance.
              </li>
            </ul>

            <h4>Unit IV — Public Health Programmes</h4>
            <ul>
              <li>
                National Health Programme — Health Hygiene and Disease, Leprosy (NLEP), AIDS (NACP),
                Blindness (NPCB), Polio, National TB Elimination Program, Vector Borne Disease
                Control Program, Reproductive and Child Health (RCH) Program, Integrated Child
                Development Scheme (ICDS), Universal and National Immunization Program, National
                Ayush Mission (NAM), National Family Health Survey (NFHS).
              </li>
              <li>
                Swachh Bharat Mission, Ayushman Bharat Yojana, National Health Mission (NRHM and
                NUHM), Maternal Mortality Rate in Madhya Pradesh.
              </li>
              <li>
                Different Biomarkers such as normal range of Hematology, Biochemistry, Serology.
              </li>
              <li>
                Primary Health Care — Principles and Elements, levels of Health Care, Structure at
                Village and Sub-centre, Primary Health Center (PHC), Community Health Center (CHC)
                and levels of Rural Hospitals.
              </li>
            </ul>

            <h4>Unit V — Environment</h4>
            <ul>
              <li>
                Concept of Environment in Indian Tradition and Culture; Janapadodhvansh —
                Distortions of Air, Water, Land, Time.
              </li>
              <li>
                Impact of Human activities on Environment; Ethics and Values related to environment;
                Biodiversity (especially in the context of Madhya Pradesh); Environment — Pollution,
                Climate change, Endangered and Extinct Species.
              </li>
              <li>
                Problems and Challenges Related to Environment, Causes and Effects of Environmental
                Degradation.
              </li>
              <li>
                Environmental Education — Public Awareness Programs, Environmental Education and its
                Relationship with Health and Safety.
              </li>
              <li>
                Environment-friendly Technology, Constitutional Provisions for Environmental
                Protection, Environmental Protection Policies and Regulatory Framework.
              </li>
              <li>
                Role of tribes of Madhya Pradesh (Baiga, Sahariya, Bhariya, Bhil, Gond, etc.) in
                Environmental Conservation.
              </li>
              <li>
                Solid Waste Management — Causes, Effects and Control measures of Urban and Industrial
                Waste.
              </li>
              <li>
                Cleanliness Survey Campaign — Objective, Various Stages, Achievements and Future.
              </li>
              <li>Water Security.</li>
              <li>Various efforts in the field of Water Conservation.</li>
            </ul>

            <hr />

            {/* ─── Paper IV, Part (A) — Philosophy, Psychology, Public Admin ── */}
            <h3 id="mains-paper-iv-a">
              Paper IV, Part (A) — Philosophy, Psychology, Public Administration and Case Study
            </h3>

            <h4>Unit I — Indian Shaddarshan, Philosophers/Thinkers, Social Reformers</h4>
            <ul>
              <li>Indian Shaddarshan.</li>
              <li>Socrates, Plato, Aristotle.</li>
              <li>Mahavir, Buddha, Acharya Shankar, Charwak, Bharthari.</li>
              <li>Gurunanak, Kabir, Tulsidas, Sant Ravidas.</li>
              <li>
                Ravindra Nath Tagore, Raja Rammohan Roy, Devi Ahilyabai Holkar, Savitribai Phule.
              </li>
              <li>
                Swami Dayanand Saraswati, Swami Vivekanand, Maharshi Arvind, Sarvpalli
                Radhakrishnan, Dr. Bhimrao Ambedkar, Pandit Deendayal Upadhyay.
              </li>
            </ul>

            <h4>Unit II — Nation Building and Moral Concepts</h4>
            <ul>
              <li>Concept of Nation, Powers and Constituents.</li>
              <li>National Security, Interests and Character.</li>
              <li>
                National Security Operations, Armed Forces, Bodies, Divisions and Spy Agencies.
              </li>
              <li>Basic Morality Concepts — Goodness, Virtues, Non-Violence, Responsibility.</li>
              <li>Role of Bhagavad Gita in Ethics and Administration.</li>
            </ul>

            <h4>Unit III — Human Behaviour and Psychotherapy</h4>
            <ul>
              <li>
                Attitude — Subject-matter, Elements, Function, Formation of Attitude, Attitudinal
                Change, Persuasive Communication, Prejudice and Discrimination, Stereotypeness in
                Indian context.
              </li>
              <li>
                Aptitude — Aptitude and fundamental values for Civil Service, Integrity,
                Impartiality and Non-partnership, Objectivity, Dedication to Public Service, Empathy,
                Tolerance and Compassion towards the weaker sections.
              </li>
              <li>
                Emotional Intelligence — Concepts, their utilities and application in Administration
                and Governance.
              </li>
              <li>Individual differences — Factors, Theories and Behaviour Differences.</li>
              <li>
                Mental Disorders and Psychotherapy — Depression, Social Anxiety Disorder,
                Schizophrenia, Social Phobia, Bipolar Disorder. Psychotherapy — Person Centered
                Therapy, Behaviour Therapy, Rational Emotive Behaviour Therapy, Cognitive Behaviour
                Therapy, Positive Therapy and Family Therapy.
              </li>
            </ul>

            <h4>Unit IV — Moral Value in Public Administration</h4>
            <ul>
              <li>
                Human Need and Motivation — Elements affecting Human Personalities, dutifulness,
                sense of Values, Life-value, Sensitivity, Technology and Moral Values.
              </li>
              <li>
                Ethics and Values in Public Administration — Ethical elements in governance
                (Integrity, Accountability and Transparency), Ethical Reasoning and Moral Dilemmas,
                Conscience as a source of ethical guidance, Code of Conduct for Civil Servants,
                Implementation of Higher Values in Governance.
              </li>
              <li>
                Corruption — Types and Causes, Effects, Approaches to minimizing Corruption, Role of
                Society, Media, Family and Whistleblower, United Nations Convention on Corruption,
                Measuring corruption, Transparency International, Lokpal and Lokayukt.
              </li>
            </ul>

            <h4>Unit V — Case Study</h4>
            <ul>
              <li>Based on the contents of the syllabus in Part-A of the question paper.</li>
            </ul>

            <hr />

            {/* ─── Paper IV, Part (B) — Entrepreneurship ──────────────── */}
            <h3 id="mains-paper-iv-b">
              Paper IV, Part (B) — Entrepreneurship, Management, Personality Development and Case
              Study
            </h3>

            <h4>Unit I — Entrepreneurship Concept and Development</h4>
            <ul>
              <li>Concept and Significance of Entrepreneurship.</li>
              <li>
                Symptoms of Entrepreneurship, Principles, Characteristics and Importance of
                Innovation.
              </li>
              <li>
                Process of Entrepreneurship — Creativity, Idea Generation, Analysis and Business
                Plan.
              </li>
              <li>
                Important factors and statutory requirements for new Enterprise Management;
                Challenges faced by Women Entrepreneurs.
              </li>
              <li>
                Development of Entrepreneurship in India — Startup India, Make in India,
                Organizations for promoting Entrepreneurial development.
              </li>
            </ul>

            <h4>Unit II — Business Organizations and Management</h4>
            <ul>
              <li>
                Business — Concept and Significance, Scope, Administration and Management, Purchase
                and Material Management.
              </li>
              <li>
                Management Process, Resource Management and functions of Management — Planning,
                Organization, Direction, Control, Coordination, Decision Making, Motivation,
                Leadership and Communication.
              </li>
              <li>Time Management and Organization.</li>
              <li>Branding, Marketing and Networking.</li>
            </ul>

            <h4>Unit III — Administration and Management</h4>
            <ul>
              <li>
                Important dimensions of Management in Public Administration; Human Resource
                Management.
              </li>
              <li>
                Financial Management — Its scope and significance in Public Administration.
              </li>
              <li>
                Stress and Conflict Management Techniques and their significance in the Public
                Service Domain.
              </li>
              <li>
                Administration and Management of Plurality, Opportunities and Challenges in Public
                Administration.
              </li>
              <li>Disaster Management.</li>
            </ul>

            <h4>Unit IV — Overall Personality Development</h4>
            <ul>
              <li>Overall Personality and National Development.</li>
              <li>Different components of Personality Development.</li>
              <li>Concepts of successfulness.</li>
              <li>Impediments in achieving success.</li>
              <li>Factors responsible for success.</li>
              <li>
                Learning from failure — accepting failure as an opportunity for continuous
                improvement and valuable introspection.
              </li>
              <li>
                Implementation of Government Programme — Planning effective strategy to ensure
                successful implementation.
              </li>
              <li>
                Approach and facts regarding following issues — Civic Sense, Loyalty to the
                Institution, Voter Awareness Programme, Transport Management, Trend of Drug abuse,
                Adulteration in food items, Night Culture, Value-based life and Legal Awareness
                Programme.
              </li>
            </ul>

            <h4>Unit V — Case Study</h4>
            <ul>
              <li>Based on the contents of the syllabus in Part-B of the question paper.</li>
            </ul>

            <hr />

            {/* ─── Paper V — General Hindi & Grammar ──────────────────── */}
            <h3 id="paper-v-hindi">Paper V — General Hindi &amp; Grammar (200 Marks)</h3>

            <blockquote>
              <p>
                This paper is at the level of graduate-pass students. Its objective is to evaluate
                the candidate&apos;s reading and comprehension ability, linguistic competence,
                writing skill, and the ability to express clear and correct thoughts in Hindi.
              </p>
            </blockquote>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Content</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>(क)</td>
                    <td>Short Answer Questions — from the entire prescribed syllabus</td>
                    <td>25 × 03 = 75</td>
                  </tr>
                  <tr>
                    <td>(ख)</td>
                    <td>
                      Ras — limbs and types (5×1 = 05); Chhand — Doha, Sortha, Chaupai (5×1 = 05)
                    </td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>(ग)</td>
                    <td>
                      Translation — Hindi to English (5×3 = 15), English to Hindi (5×3 = 15),
                      Administrative standard word meanings: Hindi→English (05 words) &amp;
                      English→Hindi (05 words) (10)
                    </td>
                    <td>40</td>
                  </tr>
                  <tr>
                    <td>(घ)</td>
                    <td>Sandhi &amp; Samas (5×2 = 10); Muhavare &amp; Kahawat (5×2 = 10)</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>(ङ)</td>
                    <td>
                      Preliminary Grammar &amp; Vocabulary (2 marks each) — Viram Chihn, Shabd
                      Shaktiyan, Vilom Shabd, Anek Shabdon ke liye Ek Shabd, Tatsam &amp; Tadbhav
                      Shabd, Paryayvachi Shabd, Shabd-Yugm, Vartani Shodhan, Vakya Sanrachna &amp;
                      Prakar, Shabdarth
                    </td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>(च)</td>
                    <td>Pallavan — Bhav Pallavan of underlined or given lines</td>
                    <td>05</td>
                  </tr>
                  <tr>
                    <td>(छ)</td>
                    <td>
                      Major Dialects of Madhya Pradesh — Malvi, Nimadi, Bagheli and Bundeli
                      (3+3+3+3)
                    </td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>(ज)</td>
                    <td>Unseen Passage (Apathit Gadyansh)</td>
                    <td>18</td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>
                      <strong>200</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr />

            {/* ─── Paper VI — Hindi Essay & Drafting ───────────────────── */}
            <h3 id="paper-vi-essay">Paper VI — Hindi Essay &amp; Drafting (100 Marks)</h3>

            <blockquote>
              <p>
                The purpose of this paper is to test the candidate&apos;s expression in Hindi and
                general Hindi knowledge. Hence, answers must be written in Hindi only.
              </p>
            </blockquote>

            <p>
              <strong>1. First Essay (≈1000 words) — 50 marks.</strong> May be asked from topics
              including: Viksit Bharat @2047, concept of Atmanirbhar Bharat, Glorious Madhya
              Pradesh, India&apos;s growing steps in space, glorious history of MP, environment,
              science, religion–spirituality, the concept of Vishwa Gram, quality in education,
              National Education Policy 2020, traditional skill-based vocations, modernization,
              globalization, liberalization, Artificial Intelligence, traditional sports, cultural
              heritage, civilization and culture, religious–cultural tourism, youth policy, yoga and
              health, e-marketing, e-commerce, leadership and development, good governance,
              bureaucracy, role of civil services in democracy, tribal development, indigenous
              languages (swadeshi/swabhasha), various issues of nationality, national unity and
              social harmony, community living, social concerns, renewable energy, sustainable
              development goals, inclusive development, consumer awareness, menace of
              drugs/intoxicants, domestic violence, external and internal security issues, ease of
              doing business, social media&apos;s impact on human life, glorious Indian culture,
              Vasudhaiva Kutumbakam, values and sanskar in human life, One Nation One Health System /
              Policy 2030, etc.
            </p>

            <p>
              <strong>2. Second Essay (≈500 words) — 20 marks.</strong> Contemporary problems and
              their solutions.
            </p>

            <p>
              <strong>3. Drafting (Praroop Lekhan, ≈250 words) — 15 marks.</strong> Official &amp;
              semi-official letters, circulars, memoranda, advertisements, orders, endorsements,
              reminders, etc.
            </p>

            <p>
              <strong>4. Report Writing (Prativedan, ≈250 words) — 15 marks.</strong> Report,
              notification, memorandum, note (Tippan) writing.
            </p>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Max Words</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>First Essay</td>
                    <td>≈1000</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>Second Essay</td>
                    <td>≈500</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>Drafting</td>
                    <td>≈250</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>Report Writing</td>
                    <td>≈250</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td />
                    <td>
                      <strong>100</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr />

            {/* ═══════════════════════════════════════════════════════════
                 QUICK REFERENCE SUMMARY
                ═══════════════════════════════════════════════════════════ */}
            <h2 id="quick-reference">Quick Reference Summary</h2>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>Papers</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Preliminary</td>
                    <td>2 (objective)</td>
                    <td>600 (qualifying)</td>
                  </tr>
                  <tr>
                    <td>Main</td>
                    <td>6 (descriptive)</td>
                    <td>1500</td>
                  </tr>
                  <tr>
                    <td>Interview</td>
                    <td>—</td>
                    <td>185</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Grand Total</strong>
                    </td>
                    <td />
                    <td>
                      <strong>1685</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <blockquote>
              <p>
                <strong>Disclaimer:</strong> This page reproduces the official MPPSC State Service
                Examination 2026 Exam Plan &amp; Syllabus (dated 05.01.2026). For any
                clarification, candidates should refer to the official notification at{" "}
                <strong>
                  <a
                    href="https://mppsc.mp.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://mppsc.mp.gov.in
                  </a>
                </strong>
                .
              </p>
            </blockquote>
          </div>
        </Container>
      </Section>

      <JsonLd data={jsonLdGraph([breadcrumb, article])} />
    </>
  );
}
