import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbJsonLd,
  articleJsonLd,
  faqJsonLd,
  jsonLdGraph,
} from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = buildMetadata({
  title:
    "MPPSC Mains Syllabus 2026 PDF Download in English | Paper 1-6 Breakdown | Aakar IAS",
  description:
    "Official MPPSC Mains Syllabus 2026 in English PDF Download: Unit-wise breakdown for GS Paper 1 (History & Geography), GS Paper 2 (Polity & Sociology), GS Paper 3 (Economics & Science), GS Paper 4 (Ethics & Management), Hindi & Essay.",
  path: "/en/mppsc/mains-syllabus",
  locale: "en",
  keywords: [
    "mppsc mains syllabus pdf download in english",
    "mppsc mains syllabus pdf download",
    "mppsc mains syllabus 2026 english pdf",
    "mppsc mains syllabus",
    "mppsc mains syllabus 2026 english",
    "MPPSC Mains Exam Pattern PDF",
    "MPPSC GS 1 2 3 4 Syllabus English PDF",
  ],
  type: "article",
  publishedTime: "2026-01-10",
  modifiedTime: new Date().toISOString().split("T")[0],
  category: "MPPSC",
});

/* ─── FAQ Data ─────────────────────────────────────────────────────────────── */
const faqs = [
  {
    question: "How many papers are there in MPPSC Mains Exam?",
    answer:
      "MPPSC Mains Examination consists of 6 descriptive papers: GS Paper I (History & Geography - 300 marks), GS Paper II (Polity & Sociology - 300 marks), GS Paper III (Economics & Science - 300 marks), GS Paper IV (Philosophy, Psychology, Public Administration & Entrepreneurship - 300 marks), General Hindi & Grammar (200 marks), and Hindi Essay & Drafting (100 marks). Total written marks = 1500.",
  },
  {
    question: "What are the key changes in MPPSC Mains Syllabus 2026?",
    answer:
      "The latest MPPSC Mains Syllabus features Case Studies in GS Paper IV (18 marks), AYUSH & Ayurveda in GS Paper III, Artificial Intelligence & Cyber Security topics in Computer Science, and topics related to National Education Policy (NEP 2020) and MP-specific tribal heritage.",
  },
  {
    question: "Can I attempt MPPSC Mains in English Medium?",
    answer:
      "Yes, candidates can attempt GS Paper I, GS Paper II, GS Paper III, and GS Paper IV in English medium. However, General Hindi (Paper V) and Hindi Essay & Drafting (Paper VI) must be written exclusively in Hindi.",
  },
  {
    question: "Is there negative marking in MPPSC Mains?",
    answer:
      "No, there is no negative marking in MPPSC Mains. It is a descriptive written exam. Negative marking (1 mark deduction per wrong answer) is applicable only in the Prelims objective exam.",
  },
  {
    question: "What is the total marks distribution for MPPSC Mains?",
    answer:
      "The total marks for MPPSC Mains are 1500 (Written Exam) + 185 (Interview/Personality Test), making the grand total 1685 marks for final merit selection.",
  },
];

/* ─── Page Component ───────────────────────────────────────────────────────── */
export default function EnMppscMainsSyllabusPage() {
  const pageUrl = `${siteConfig.url}/en/mppsc/mains-syllabus`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "MPPSC", url: `${siteConfig.url}/en/mppsc` },
    { name: "Mains Syllabus", url: pageUrl },
  ]);

  const article = articleJsonLd({
    title:
      "MPPSC Mains Syllabus 2026 – Paper 1-6 Complete Unit-wise Breakdown in English",
    description:
      "Official MPPSC Mains Exam 2026 unit-wise syllabus in English medium.",
    url: pageUrl,
    image: `${siteConfig.url}/api/og?title=MPPSC+Mains+Syllabus+2026+English&category=MPPSC&lang=en&type=article`,
    datePublished: "2026-01-10",
    authorName: "Aakar IAS",
    keywords: [
      "MPPSC Mains Syllabus",
      "MPPSC Mains Syllabus 2026 English",
      "MPPSC Paper 1 2 3 4 Syllabus",
    ],
    inLanguage: "en-US",
    alternates: {
      hi: `${siteConfig.url}/mppsc/mains-syllabus`,
      en: pageUrl,
    },
  });

  const faqSchema = faqJsonLd(
    faqs.map((f) => ({ question: f.question, answer: f.answer }))
  );

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-sm font-semibold text-primary">
              MPPSC Mains Examination 2026 PDF Download
            </span>
            <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              MPPSC Mains Syllabus 2026 PDF Download in English (Paper 1-6)
            </h1>
            <p className="mt-4 text-pretty text-lg text-white/75">
              Official MPPSC State Service Mains Examination 2026 complete syllabus in English Medium — 6 Papers, 1500 Marks, General Studies I-IV, Hindi & Essay.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="/pdf/mppsc-mains-syllabus-in-english.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md transition hover:bg-primary/90"
              >
                📄 View Mains Syllabus PDF (English)
              </a>
              <a
                href="/pdf/mppsc-mains-syllabus-in-hindi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-bold text-white border border-white/20 transition hover:bg-white/20"
              >
                📄 View Mains Syllabus PDF (Hindi)
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Breadcrumb ─────────────────────────────────────────────── */}
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "MPPSC", href: "/en/mppsc" },
              { name: "Syllabus 2026", href: "/en/mppsc/syllabus-2026" },
              { name: "Mains Syllabus" },
            ]}
          />
        </Container>
      </Section>

      {/* ─── Table of Contents ──────────────────────────────────────── */}
      <Section className="pt-8 pb-0">
        <Container size="narrow">
          <nav
            aria-label="Table of Contents"
            className="rounded-xl border border-border/50 bg-card p-6"
          >
            <h2 className="mb-4 text-lg font-bold text-primary">
              📑 Table of Contents
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>
                <a href="#overview" className="text-primary hover:underline">
                  Mains Exam Scheme & Pattern Overview
                </a>
              </li>
              <li>
                <a href="#paper-1" className="text-primary hover:underline">
                  Paper I — History & Geography (300 Marks)
                </a>
              </li>
              <li>
                <a href="#paper-2" className="text-primary hover:underline">
                  Paper II — Polity & Sociology (300 Marks)
                </a>
              </li>
              <li>
                <a href="#paper-3" className="text-primary hover:underline">
                  Paper III — Economics & Science (300 Marks)
                </a>
              </li>
              <li>
                <a href="#paper-4" className="text-primary hover:underline">
                  Paper IV — Philosophy, Ethics & Management (300 Marks)
                </a>
              </li>
              <li>
                <a href="#paper-5" className="text-primary hover:underline">
                  Paper V — General Hindi & Grammar (200 Marks)
                </a>
              </li>
              <li>
                <a href="#paper-6" className="text-primary hover:underline">
                  Paper VI — Hindi Essay & Drafting (100 Marks)
                </a>
              </li>
              <li>
                <a href="#faq" className="text-primary hover:underline">
                  Frequently Asked Questions (FAQs)
                </a>
              </li>
            </ol>
          </nav>
        </Container>
      </Section>

      {/* ─── Content ─────────────────────────────────────────────────── */}
      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            <h2 id="overview">MPPSC Mains Exam Scheme & Pattern</h2>
            <p>
              The MPPSC State Service Mains Exam consists of <strong>6 descriptive papers</strong>. Candidates can write GS Papers I, II, III, and IV in either English or Hindi. Papers V and VI are conducted in Hindi only.
            </p>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Paper</th>
                    <th>Part</th>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Duration</th>
                    <th>Medium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={2}>GS-I</td>
                    <td>(A)</td>
                    <td>History</td>
                    <td>150</td>
                    <td rowSpan={2}>3 Hours</td>
                    <td rowSpan={2}>Hindi / English</td>
                  </tr>
                  <tr>
                    <td>(B)</td>
                    <td>Geography</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>GS-II</td>
                    <td>(A)</td>
                    <td>Political Science</td>
                    <td>150</td>
                    <td rowSpan={2}>3 Hours</td>
                    <td rowSpan={2}>Hindi / English</td>
                  </tr>
                  <tr>
                    <td>(B)</td>
                    <td>Sociology</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>GS-III</td>
                    <td>(A)</td>
                    <td>Economics</td>
                    <td>150</td>
                    <td rowSpan={2}>3 Hours</td>
                    <td rowSpan={2}>Hindi / English</td>
                  </tr>
                  <tr>
                    <td>(B)</td>
                    <td>Science, Technology & Public Health</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>GS-IV</td>
                    <td>(A)</td>
                    <td>Philosophy, Psychology & Case Study</td>
                    <td>150</td>
                    <td rowSpan={2}>3 Hours</td>
                    <td rowSpan={2}>Hindi / English</td>
                  </tr>
                  <tr>
                    <td>(B)</td>
                    <td>Entrepreneurship, Management & Case Study</td>
                    <td>150</td>
                  </tr>
                  <tr>
                    <td>Paper V</td>
                    <td>—</td>
                    <td>General Hindi & Grammar</td>
                    <td>200</td>
                    <td>2 Hours</td>
                    <td>Hindi</td>
                  </tr>
                  <tr>
                    <td>Paper VI</td>
                    <td>—</td>
                    <td>Hindi Essay & Drafting</td>
                    <td>100</td>
                    <td>2:30 Hours</td>
                    <td>Hindi</td>
                  </tr>
                  <tr>
                    <td colSpan={3}><strong>Total Written Marks</strong></td>
                    <td><strong>1500</strong></td>
                    <td colSpan={2} />
                  </tr>
                  <tr>
                    <td colSpan={3}><strong>Interview / Personality Test</strong></td>
                    <td><strong>185</strong></td>
                    <td colSpan={2} />
                  </tr>
                  <tr>
                    <td colSpan={3}><strong>Grand Total</strong></td>
                    <td><strong>1685</strong></td>
                    <td colSpan={2} />
                  </tr>
                </tbody>
              </table>
            </div>

            <hr />

            <h2 id="paper-1">Paper I: History & Geography (300 Marks)</h2>
            <h3>Part (A) History (150 Marks)</h3>
            <ul>
              <li><strong>Unit I:</strong> Indian History - Political, Economic, Social and Cultural History of India from Harappan civilization to 10th Century A.D.; 11th to 18th Century A.D.; Sultanate & Mughal rulers.</li>
              <li><strong>Unit II:</strong> Pre-historic & Proto-historic Madhya Pradesh, Major Dynasties of MP (Gardbhill, Nag, Olihkar, Kalchuri, Chandel, Parmar, Holkar, Scindia, Bhopal State).</li>
              <li><strong>Unit III:</strong> Impact of British Rule on Indian Economy and Society, Freedom Movement in India and Madhya Pradesh.</li>
              <li><strong>Unit IV:</strong> Emergence of India as a Republic Nation, Reorganization of States, Formation of MP, Cultural Heritage of MP (Art, Festivals, Architecture, World Heritage Sites).</li>
              <li><strong>Unit V:</strong> Tribal Heroes of MP (Shankar Shah, Raghunath Shah, Bhima Nayak, Khajya Nayak, Tantya Bhil, Ganjan Singh Korku, Pema Falya).</li>
            </ul>

            <h3>Part (B) Geography (150 Marks)</h3>
            <ul>
              <li><strong>Unit I: Physical Geography of India</strong> — Major Physiographic Features: Mountains, Plateaus, Plains, Rivers, Water Divides (Great Water Divide of India), Lakes & Glaciers; Physiographic Divisions (Himalayas, Northern Plains, Peninsular Plateau, Coastal Plains, Islands); Climate & Indian Monsoon System, Cyclones (Tropical & Temperate), El-Nino, La-Nina & IOD Effects.</li>
              <li><strong>Unit II: Agriculture & Water Resources</strong> — Major Crops, Farming Systems, Millets (Shree Anna), Green Revolution, Irrigation Methods, Water Resource Management, Rainwater Harvesting & Interlinking of Rivers.</li>
              <li><strong>Unit III: Natural Resources & Industries</strong> — Forests, Mineral & Energy Resources (Coal, Petroleum, Solar, Wind, Biomass); Major Industrial Regions of India, Iron & Steel, Textile, Cement, Food Processing, MSME & Cottage Industries.</li>
              <li><strong>Unit IV: Disasters & Advanced Techniques</strong> — Natural & Man-made Disasters (Earthquakes, Tsunamis, Floods, Droughts, Landslides, Cyclones); Disaster Management Policies, Pollution Control, Remote Sensing, GIS & GPS Applications.</li>
              <li><strong>Unit V: Geography of Madhya Pradesh</strong> — Physiographic Divisions (Malwa Plateau, Vindhyachal, Satpura, Narmada-Son Valley, Bundelkhand, Rewa-Panna, Baghelkhand); Rivers, Drainage Systems, Climate, Seasons, Soil Types, Forests, Minerals, Industries & Demography of MP.</li>
            </ul>

            <hr />

            <h2 id="paper-2">Paper II: Polity & Sociology (300 Marks)</h2>
            <h3>Part (A) Constitution & Governance (150 Marks)</h3>
            <ul>
              <li><strong>Unit I:</strong> Constitution of India - Formation, Basic Structure, Preamble, Fundamental Rights, DPSP, Federalism, Supreme Court, High Court, Judicial Activism, PIL.</li>
              <li><strong>Unit II:</strong> Constitutional Bodies - ECI, CAG, UPSC, MPPSC, NITI Aayog; Role of Caste, Religion, Gender in Indian Politics.</li>
              <li><strong>Unit III:</strong> Democracy, CBOs, NGOs, SHGs, Media; Indian Political Thinkers (Kautilya, Ahilyabai Holkar, Gandhi, Nehru, Patel, Lohia, Ambedkar, Deendayal Upadhyaya, JP).</li>
              <li><strong>Unit IV:</strong> Governance in MP - Governor, Chief Minister, Assembly, High Court, Commissions (SC, ST, OBC, CVC, Human Rights, Information).</li>
              <li><strong>Unit V:</strong> Administration of MP - Secretariat, District Administration, Panchayati Raj, Urban Local Governance, Tribal & Naxal Issues.</li>
            </ul>

            <h3>Part (B) Sociology (150 Marks)</h3>
            <ul>
              <li><strong>Unit I:</strong> Basic Concepts of Sociology - Family, Kinship, Caste, Ashram, Purushartha, Religion.</li>
              <li><strong>Unit II:</strong> Diversity & Challenges - Cultural Diversity, Crime, Cybercrime, Domestic Violence, Secularism, Pluralism.</li>
              <li><strong>Unit III:</strong> Rural & Urban Sociology - 73rd Amendment, Panchayati Raj, Urbanization, Town Planning.</li>
              <li><strong>Unit IV:</strong> Industrialization & Globalization - Social Change, Demography, Fertility, Mortality, Migration.</li>
              <li><strong>Unit V:</strong> Human Resource Development - NEP 2020, Welfare Schemes for SC/ST/Women/Senior Citizens, Tribes of MP.</li>
            </ul>

            <hr />

            <h2 id="paper-3">Paper III: Economics & Science (300 Marks)</h2>
            <h3>Part (A) Economics (150 Marks)</h3>
            <ul>
              <li><strong>Unit I:</strong> Fundamental Aspects of Indian Economy - Viksit Bharat@2047, Sectoral Contribution, PM-KISAN, Agri Start-ups, Make in India.</li>
              <li><strong>Unit II:</strong> Taxation & Policy - Fiscal & Monetary Policy, Financial Inclusion, PDS, Poverty, Unemployment, Foreign Trade, IMF, World Bank, WTO.</li>
              <li><strong>Unit III:</strong> Overview of MP Economy - GSDP, ANMP, ODOP, Crops, Livestock, MSME, Tourism, Tribal Economy.</li>
              <li><strong>Unit IV:</strong> Social & Economic Development in MP - Health & Education Infrastructure, IPR Progress, Fiscal Discipline.</li>
              <li><strong>Unit V:</strong> Statistics & Probability - Mean, Median, Mode, Sampling, Probability.</li>
            </ul>

            <h3>Part (B) Science, Technology & Public Health (150 Marks)</h3>
            <ul>
              <li><strong>Unit I:</strong> General Science - Micro-organisms, Cell Structure, Nutrition, Biotechnology, Astronomy (Arya Bhatta, Varahamihira), Patents/TRIPS.</li>
              <li><strong>Unit II:</strong> Computer Science & Math - Hardware, Software, OS, C/C++/Java, AI, Cloud Computing, E-Governance, Basic Math.</li>
              <li><strong>Unit III:</strong> AYUSH & Ayurveda - One Nation One Health System, Panchakarma, Yoga, Naturopathy, Shodasha Sanskar.</li>
              <li><strong>Unit IV:</strong> National Health Programmes - NLEP, NACP, TB Elimination, Ayushman Bharat, Swachh Bharat, Primary Healthcare Structure.</li>
              <li><strong>Unit V:</strong> Environment - Biodiversity, Pollution, Climate Change, Solid Waste Management, Role of Tribes in Conservation.</li>
            </ul>

            <hr />

            <h2 id="paper-4">Paper IV: Philosophy, Ethics & Management (300 Marks)</h2>
            <h3>Part (A) Philosophy, Psychology & Public Administration (150 Marks)</h3>
            <ul>
              <li><strong>Unit I:</strong> Philosophers & Reformers - Socrates, Plato, Aristotle, Buddha, Mahavira, Shankara, Kabir, Vivekananda, Ambedkar.</li>
              <li><strong>Unit II:</strong> Nation Building & Moral Concepts - National Security, Virtue, Non-violence, Bhagavad Gita in Administration.</li>
              <li><strong>Unit III:</strong> Human Behaviour & Aptitude - Attitude, Emotional Intelligence, Civil Service Values, Mental Disorders.</li>
              <li><strong>Unit IV:</strong> Ethical Values in Public Administration - Good Governance, Anti-Corruption, RTI, Citizen Charter, Lokpal.</li>
              <li><strong>Unit V:</strong> Case Studies (18 Marks).</li>
            </ul>

            <h3>Part (B) Entrepreneurship, Management & Personality Development (150 Marks)</h3>
            <ul>
              <li><strong>Unit I:</strong> Entrepreneurship - Startup India, Make in India, Business Plan.</li>
              <li><strong>Unit II:</strong> Business Organization & Management - Resource Management, Leadership, Branding.</li>
              <li><strong>Unit III:</strong> Administration & Management - HRM, Financial Management, Stress/Conflict & Disaster Management.</li>
              <li><strong>Unit IV:</strong> Overall Personality Development - Factors for Success, Civic Sense, Value-based Life.</li>
              <li><strong>Unit V:</strong> Case Studies (18 Marks).</li>
            </ul>

            <hr />

            <h2 id="paper-5">Paper V: General Hindi & Grammar (200 Marks)</h2>
            <p>Conducted in Hindi only (Graduate Level). Covers Hindi Grammar, Sandhi, Samas, Translation (Hindi-English), Idioms, Administrative Terms, MP Dialects (Malvi, Nimadi, Bagheli, Bundeli), Unseen Passage.</p>

            <hr />

            <h2 id="paper-6">Paper VI: Hindi Essay & Drafting (100 Marks)</h2>
            <p>Conducted in Hindi only. Includes 1st Essay (1000 words - 50 Marks), 2nd Essay (500 words - 20 Marks), Official Letter Drafting (15 Marks), and Report Writing (15 Marks).</p>

            <hr />

            <h2>Essential Links & Resources</h2>
            <ul>
              <li><Link href="/mppsc/mains-syllabus" className="text-primary">MPPSC Mains Syllabus in Hindi (हिंदी माध्यम)</Link></li>
              <li><Link href="/en/mppsc/syllabus-2026" className="text-primary">MPPSC Prelims & Mains Master Syllabus 2026</Link></li>
              <li><Link href="/mppsc-mains-books" className="text-primary">Recommended Books for MPPSC Mains</Link></li>
              <li><Link href="/mppsc/previous-year-papers" className="text-primary">Download MPPSC PYQs (2014-2025)</Link></li>
              <li><Link href="/test-series" className="text-primary">Aakar IAS MPPSC Mains Test Series</Link></li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* ─── FAQs ─────────────────────────────────────────────────── */}
      <Section>
        <Container size="narrow">
          <h2 id="faq" className="mb-8 text-2xl font-bold text-foreground">
            ❓ Frequently Asked Questions (FAQs) — MPPSC Mains Syllabus
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/75 leading-relaxed">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      {/* ─── JSON-LD Schema ────────────────────────────────────────── */}
      <JsonLd data={jsonLdGraph([breadcrumb, article, faqSchema])} />
    </>
  );
}
