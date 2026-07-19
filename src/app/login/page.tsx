import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LoginForm } from "@/components/layout/login-form";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCurrentUser, isAdmin } from "@/actions/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = buildMetadata({
  title: "लॉगिन / रजिस्टर | Aakar IAS",
  description: "Aakar IAS के अपने छात्र अकाउंट में लॉगिन करें और नोट्स, करेंट अफेयर्स, बुकमार्क्स ट्रैक करें।",
  path: "/login",
});

import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export default async function LoginPage({ searchParams }: { searchParams: any }) {
  const session = await getCurrentUser();
  if (session) {
    const userIsAdmin = await isAdmin();
    if (userIsAdmin) {
      redirect("/admin");
    } else {
      redirect("/dashboard");
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
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-3 font-devanagari">
            छात्र पोर्टल: जल्द आ रहा है (Coming Soon)
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground leading-relaxed font-devanagari">
            हम आपके लिए एक नया और बेहतर व्यक्तिगत शिक्षण डैशबोर्ड विकसित कर रहे हैं। यहाँ आप अपनी तैयारी को ट्रैक कर सकेंगे, क्विज़ स्कोर सहेज सकेंगे और मुख्य परीक्षा के उत्तर अपलोड कर सकेंगे। यह सुविधा बहुत जल्द शुरू होगी!
          </p>
          <Link
            href="/"
            className="mt-8 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
          >
            होमपेज पर वापस जाएं
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
            छात्र पोर्टल में आपका स्वागत है
          </h1>
          <p className="text-muted-foreground mt-2">
            लॉगिन करें ताकि आप अपने पसंदीदा लेखों को बुकमार्क कर सकें और क्विज़ दे सकें।
          </p>
        </div>
        <LoginForm locale="hi" />
      </Container>
    </Section>
  );
}
