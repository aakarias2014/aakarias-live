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

export const metadata: Metadata = buildMetadata({
  title:
    "MPPSC Prelims Syllabus 2026 PDF Download in English | GS & CSAT | Aakar IAS",
  description:
    "Official MPPSC Prelims Syllabus 2026 in English PDF Download: Paper 1 General Studies (10 Units breakdown) and Paper 2 CSAT. Exam pattern, negative marking & free PDF.",
  path: "/en/mppsc/prelims-syllabus",
  locale: "en",
  keywords: [
    "mppsc prelims syllabus 2026 pdf english",
    "mppsc syllabus 2026 pdf prelims english",
    "mppsc prelims syllabus",
    "mppsc prelims syllabus 2026 english",
    "mppsc pre syllabus english pdf",
    "mppsc csat syllabus english",
    "MPPSC State Service Prelims Exam Pattern",
  ],
  type: "article",
  publishedTime: "2026-01-10",
  modifiedTime: new Date().toISOString().split("T")[0],
  category: "MPPSC",
});

export default function EnMppscPrelimsSyllabusPage() {
  const pageUrl = `${siteConfig.url}/en/mppsc/prelims-syllabus`;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "MPPSC", url: `${siteConfig.url}/en/mppsc` },
    { name: "Prelims Syllabus", url: pageUrl },
  ]);

  const article = articleJsonLd({
    title: "MPPSC Prelims Syllabus 2026 PDF Download in English – 10 Units Complete Breakdown",
    description: "Official MPPSC State Service Prelims Exam 2026 syllabus in English medium PDF.",
    url: pageUrl,
    image: `${siteConfig.url}/api/og?title=MPPSC+Prelims+Syllabus+2026+English+PDF&category=MPPSC&lang=en&type=article`,
    datePublished: "2026-01-10",
    authorName: "Aakar IAS",
    keywords: ["MPPSC Prelims Syllabus", "MPPSC Pre Syllabus 2026 English"],
    inLanguage: "en-US",
    alternates: {
      hi: `${siteConfig.url}/mppsc/prelims-syllabus`,
      en: pageUrl,
    },
  });

  return (
    <>
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1 text-sm font-semibold text-primary">
              MPPSC Prelims Exam 2026 PDF Download
            </span>
            <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              MPPSC Prelims Syllabus 2026 PDF Download in English
            </h1>
            <p className="mt-4 text-pretty text-lg text-white/75">
              Official MPPSC State Service Prelims Examination 2026 complete syllabus in English Medium — Paper 1 General Studies (10 Units) & Paper 2 CSAT.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="/pdf/mppsc-prelims-syllabus-in-hindi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md transition hover:bg-primary/90"
              >
                📄 View Prelims Syllabus PDF
              </a>
              <a
                href="/pdf/mppsc-mains-syllabus-in-english.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-bold text-white border border-white/20 transition hover:bg-white/20"
              >
                📄 View Mains Syllabus PDF (English)
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "MPPSC", href: "/en/mppsc" },
              { name: "Syllabus 2026", href: "/en/mppsc/syllabus-2026" },
              { name: "Prelims Syllabus" },
            ]}
          />
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            <h2>MPPSC Prelims Exam Scheme</h2>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Paper</th>
                    <th>Subject</th>
                    <th>Questions</th>
                    <th>Marks</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paper I</td>
                    <td>General Studies</td>
                    <td>100 MCQs</td>
                    <td>300</td>
                    <td>2 Hours</td>
                  </tr>
                  <tr>
                    <td>Paper II</td>
                    <td>General Aptitude Test (CSAT)</td>
                    <td>100 MCQs</td>
                    <td>300</td>
                    <td>2 Hours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr />

            <h2>Paper I: General Studies (10 Units)</h2>
            <h3>Unit 1: History of India</h3>
            <p>Ancient & Medieval Indian History, Concepts & Ideas (Vedas, Upanishads, Purusharthas), Cultural Heritage, Freedom Struggle, Independence & Integration.</p>

            <h3>Unit 2: History, Culture & Literature of Madhya Pradesh</h3>
            <p>Major Dynasties of MP, Freedom Movement in MP, Art & Architecture, Tribes, Folk Arts, Literature & World Heritage Sites in MP.</p>

            <h3>Unit 3: Geography of India</h3>
            <p>Physiographic Divisions, Rivers, Mountains, Climate (El-Nino, La-Nina), Natural Resources, Agriculture, Energy Sources, Disaster Management.</p>

            <h3>Unit 4: Geography of Madhya Pradesh</h3>
            <p>Physiographic Divisions of MP (Malwa Plateau, Narmada Valley), Rivers, Climate, Soils, Forests, Minerals, Irrigation Projects & Demography.</p>

            <h3>Unit 5: Constitutional System of India & Madhya Pradesh</h3>
            <p>Constituent Assembly, President, Parliament, Supreme Court, Constitutional Amendments, Fundamental Rights, Governance of MP (Governor, CM, Assembly), Panchayati Raj.</p>

            <h3>Unit 6: Economy of India & Madhya Pradesh</h3>
            <p>Status of MP in Indian Economy, Viksit Bharat@2047, SDGs, ODOP, IPR, RBI, SEBI, G-20, Foreign Trade.</p>

            <h3>Unit 7: Science, Environment & Health</h3>
            <p>General Science, Space Technology (ISRO), Human Body, Nutrition, Sickle Cell Anaemia, Biodiversity & Pollution Control.</p>

            <h3>Unit 8: International, National & MP Current Affairs</h3>
            <p>Major events of International, National and Madhya Pradesh importance, Sports and Personalities.</p>

            <h3>Unit 9: Information & Communication Technology (ICT)</h3>
            <p>Computer Fundamentals, Electronics, Artificial Intelligence, Robotics, Cyber Security, E-Governance, Internet & Social Media.</p>

            <h3>Unit 10: Tribes of Madhya Pradesh — Heritage, Folk Culture & Literature</h3>
            <p>Geographical Distribution of Tribes in MP, Constitutional Provisions, PVTG, Tribal Welfare Schemes, Tribal Art, Freedom Movement Contribution & Tribal Heroes.</p>

            <hr />

            <h2>Paper II: General Aptitude Test (CSAT)</h2>
            <ol>
              <li>Comprehension</li>
              <li>Interpersonal skills including communication skills</li>
              <li>Logical reasoning and analytical ability</li>
              <li>Decision-making and problem-solving</li>
              <li>General mental ability</li>
              <li>Basic numeracy (Class 10th level)</li>
              <li>Hindi Language Comprehension skills (Class 10th level)</li>
            </ol>

            <hr />

            <h2>Related Resources</h2>
            <ul>
              <li><Link href="/en/mppsc/mains-syllabus" className="text-primary">MPPSC Mains Syllabus 2026 (Paper 1-6)</Link></li>
              <li><Link href="/mppsc/prelims-syllabus" className="text-primary">MPPSC Prelims Syllabus in Hindi (हिंदी माध्यम)</Link></li>
              <li><Link href="/mppsc/previous-year-papers" className="text-primary">Download MPPSC PYQs PDF</Link></li>
            </ul>
          </div>
        </Container>
      </Section>

      <JsonLd data={jsonLdGraph([breadcrumb, article])} />
    </>
  );
}
