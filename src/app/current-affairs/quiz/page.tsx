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
  title: "डेली करेंट अफेयर्स क्विज़ | Aakar IAS",
  description: "UPSC, MPPSC और अन्य राज्य नागरिक सेवा परीक्षाओं के लिए दैनिक समाचार विश्लेषण और स्टेटिक विषयों पर आधारित समसामयिकी अभ्यास एमसीक्यू क्विज़।",
  path: "/current-affairs/quiz",
  keywords: ["Current Affairs Quiz", "Daily CA Quiz", "करेंट अफेयर्स क्विज़", "MPPSC CA Quiz", "UPSC Quiz"],
});

export default async function CurrentAffairsQuizPage() {
  const quizzes = await getAllArticleQuizzesAction("hi");

  const pageUrl = `${siteConfig.url}/current-affairs/quiz`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Current Affairs", url: `${siteConfig.url}/current-affairs` },
    { name: "Quiz", url: pageUrl },
  ]);

  const collectionPage = collectionPageJsonLd({
    name: "करेंट अफेयर्स क्विज़ (Current Affairs Quiz)",
    description: "UPSC, MPPSC और अन्य परीक्षाओं के लिए दैनिक समसामयिकी अभ्यास क्विज़।",
    url: pageUrl,
    inLanguage: "hi-IN",
    items: quizzes.map((q) => ({
      name: q.title,
      url: `${siteConfig.url}/general-awareness/${q.slug}`, // Fallback structure
    })),
  });

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "Current Affairs", href: "/current-affairs" },
              { name: "Quiz" }
            ]}
          />
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/60">
            <div className="max-w-3xl">
              <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl flex items-center gap-3 font-devanagari">
                <BrainCircuit className="h-8 w-8 text-primary shrink-0" />
                <span>करेंट अफेयर्स क्विज़ (Current Affairs Quiz)</span>
              </h1>
              <p className="mt-3 text-pretty text-base text-muted-foreground leading-relaxed font-devanagari">
                दैनिक समाचार विश्लेषण और स्टेटिक सामान्य ज्ञान पर आधारित अभ्यास प्रश्नों (MCQs) को हल करें और अपनी परीक्षा तैयारी का स्व-मूल्यांकन करें।
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-8 pb-20">
        <Container size="wide">
          <QuizListView quizzes={quizzes} locale="hi" />
        </Container>
      </Section>

      <JsonLd data={jsonLdGraph([breadcrumb, collectionPage])} />
    </>
  );
}
