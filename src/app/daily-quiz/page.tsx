import type { Metadata } from "next";
import { DailyQuizFlow } from "@/components/quiz/daily-quiz-flow";
import { buildMetadata } from "@/lib/seo/metadata";
import { getDailyQuizzesAction, getSubjectQuizzesAction } from "@/actions/current-affairs";
import { mapSanityQuizzes, mapSanitySubjectQuizzes } from "@/components/quiz/quiz-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "डेली क्विज़ और अभ्यास | Aakar IAS",
  description: "UPSC और MPPSC सिविल सेवा परीक्षा की तैयारी के लिए दैनिक क्विज़, महत्वपूर्ण समाचार विश्लेषण और अभ्यास एमसीक्यू।",
  path: "/daily-quiz",
});

export default async function DailyQuizPage() {
  const [rawDailyQuizzes, rawSubjectQuizzes] = await Promise.all([
    getDailyQuizzesAction("hi"),
    getSubjectQuizzesAction("hi"),
  ]);

  const initialQuizzes = mapSanityQuizzes(rawDailyQuizzes);
  const initialSubjectQuizzes = mapSanitySubjectQuizzes(rawSubjectQuizzes);

  return (
    <DailyQuizFlow 
      locale="hi" 
      initialQuizzes={initialQuizzes} 
      initialSubjectQuizzes={initialSubjectQuizzes} 
    />
  );
}
