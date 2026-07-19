import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCurrentUser, isAdmin } from "@/actions/auth";
import { getBookmarks, getQuizHistory } from "@/actions/user";
import { redirect } from "next/navigation";

// Disable static rendering since it is a dynamic private dashboard
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "छात्र डैशबोर्ड (Dashboard) | Aakar IAS",
  description: "आपका व्यक्तिगत Aakar IAS डैशबोर्ड — सहेजे गए लेख, बुकमार्क्स और परीक्षा क्विज़ इतिहास।",
  path: "/dashboard",
});

export default async function DashboardPage() {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/login");
  }

  const userIsAdmin = await isAdmin();
  if (userIsAdmin) {
    redirect("/admin");
  }

  const [bookmarks, quizzes] = await Promise.all([
    getBookmarks(),
    getQuizHistory(),
  ]);

  return (
    <Section className="py-12 bg-muted/5 min-h-[80vh]">
      <Container size="wide">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-6">
          छात्र डैशबोर्ड
        </h1>
        <DashboardContainer
          user={session.user}
          profile={session.profile}
          bookmarks={bookmarks}
          quizzes={quizzes}
          locale="hi"
        />
      </Container>
    </Section>
  );
}
