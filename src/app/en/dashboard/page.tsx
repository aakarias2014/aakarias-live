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
  title: "Student Dashboard | Aakar IAS",
  description: "Your personalized Aakar IAS dashboard — saved bookmarks, target exams, and practice history.",
  path: "/en/dashboard",
});

export default async function EnglishDashboardPage() {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/en/login");
  }

  const userIsAdmin = await isAdmin();
  if (userIsAdmin) {
    redirect("/en/admin");
  }

  const [bookmarks, quizzes] = await Promise.all([
    getBookmarks(),
    getQuizHistory(),
  ]);

  return (
    <Section className="py-12 bg-muted/5 min-h-[80vh]">
      <Container size="wide">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-6">
          Student Dashboard
        </h1>
        <DashboardContainer
          user={session.user}
          profile={session.profile}
          bookmarks={bookmarks}
          quizzes={quizzes}
          locale="en"
        />
      </Container>
    </Section>
  );
}
