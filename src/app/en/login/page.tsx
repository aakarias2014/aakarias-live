import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LoginForm } from "@/components/layout/login-form";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCurrentUser, isAdmin } from "@/actions/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = buildMetadata({
  title: "Sign In / Register | Aakar IAS",
  description: "Sign in to your Aakar IAS student account to track notes, bookmarks, and quiz progress.",
  path: "/en/login",
});

import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export default async function EnglishLoginPage({ searchParams }: { searchParams: any }) {
  const session = await getCurrentUser();
  if (session) {
    const userIsAdmin = await isAdmin();
    if (userIsAdmin) {
      redirect("/en/admin");
    } else {
      redirect("/en/dashboard");
    }
  }

  const params = await searchParams;
  const showLogin = params?.allow === "true" || params?.admin === "true";

  if (!showLogin) {
    return (
      <Section className="flex min-h-[70vh] items-center py-12 bg-muted/10">
        <Container size="narrow" className="flex flex-col items-center text-center">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-soft">
            <BrainCircuit className="h-10 w-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Student Portal</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-3">
            Student Portal: Coming Soon
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground leading-relaxed">
            We are building a brand new personalized learning dashboard for you. Here you will be able to track your prep, bookmark articles, and upload mains answers. This feature will be live soon!
          </p>
          <Link
            href="/en"
            className="mt-8 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
          >
            Go Back to Homepage
          </Link>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="flex min-h-[70vh] items-center py-12 bg-muted/10">
      <Container size="narrow" className="flex flex-col items-center">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Student Portal</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-2">
            Welcome to Student Portal
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to bookmark current affairs and save your MCQ test history.
          </p>
        </div>
        <LoginForm locale="en" />
      </Container>
    </Section>
  );
}
