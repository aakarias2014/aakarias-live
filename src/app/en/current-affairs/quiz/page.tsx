import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { QuizListView } from "@/components/quiz/quiz-list-view";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllArticleQuizzesAction } from "@/actions/current-affairs";
import { BrainCircuit } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Daily Current Affairs Quiz | Aakar IAS",
  description: "Daily current affairs practice MCQs based on news analysis and static topics for UPSC, MPPSC, and other civil service exams.",
  path: "/en/current-affairs/quiz",
  keywords: ["Current Affairs Quiz", "Daily CA Quiz", "UPSC Quiz", "MPPSC Quiz"],
});

export default async function EnglishCurrentAffairsQuizPage() {
  const quizzes = await getAllArticleQuizzesAction("en");

  const pageUrl = `${siteConfig.url}/en/current-affairs/quiz`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/en` },
    { name: "Current Affairs", url: `${siteConfig.url}/en/current-affairs` },
    { name: "Quiz", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "Current Affairs Quiz",
    description: "Daily current affairs practice quizzes for UPSC, MPPSC, and other civil services exams.",
    url: pageUrl,
    inLanguage: "en-US",
    items: quizzes.map((q) => ({
      name: q.title,
      url: `${siteConfig.url}/en/general-awareness/${q.slug}`, // Fallback structure
    })),
  });

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "Current Affairs", href: "/en/current-affairs" },
              { name: "Quiz" }
            ]}
          />
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/60">
            <div className="max-w-3xl">
              <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl flex items-center gap-3">
                <BrainCircuit className="h-8 w-8 text-primary shrink-0" />
                <span>Current Affairs Quiz</span>
              </h1>
              <p className="mt-3 text-pretty text-base text-muted-foreground leading-relaxed">
                Solve practice questions (MCQs) based on daily news analysis and static general knowledge to evaluate your civil services exam preparation.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-8 pb-20">
        <Container size="wide">
          <QuizListView quizzes={quizzes} locale="en" />
        </Container>
      </Section>

      <JsonLd data={jsonLdGraph([breadcrumb, collectionPage])} />
    </>
  );
}
