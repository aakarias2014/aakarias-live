import type { Metadata } from "next";
import { DailyQuizFlow } from "@/components/quiz/daily-quiz-flow";
import { buildMetadata } from "@/lib/seo/metadata";
import { getDailyQuizzesAction, getSubjectQuizzesAction } from "@/actions/current-affairs";
import { mapSanityQuizzes, mapSanitySubjectQuizzes } from "@/components/quiz/quiz-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Daily Quiz & Practice | Aakar IAS",
  description: "Daily quizzes, important news analysis, and practice MCQs for UPSC and MPPSC Civil Services exam preparation.",
  path: "/en/daily-quiz",
});

export default async function DailyQuizPage() {
  const [rawDailyQuizzes, rawSubjectQuizzes] = await Promise.all([
    getDailyQuizzesAction("en"),
    getSubjectQuizzesAction("en"),
  ]);

  const initialQuizzes = mapSanityQuizzes(rawDailyQuizzes);
  const initialSubjectQuizzes = mapSanitySubjectQuizzes(rawSubjectQuizzes);

  return (
    <DailyQuizFlow 
      locale="en" 
      initialQuizzes={initialQuizzes} 
      initialSubjectQuizzes={initialSubjectQuizzes} 
    />
  );
}
