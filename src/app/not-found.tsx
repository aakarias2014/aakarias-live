import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";

export default function NotFound() {
  return (
    <Container size="narrow" className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Logo />
      <h1 className="mt-8 text-7xl font-extrabold text-foreground sm:text-8xl">404</h1>
      <p className="mt-4 text-xl font-semibold text-foreground sm:text-2xl font-devanagari">
        पेज नहीं मिला / Page not found
      </p>
      <p className="mt-2 max-w-md text-muted-foreground font-devanagari">
        क्षमा करें, जिस पेज को आप ढूंढ रहे हैं वह मौजूद नहीं है या हटा दिया गया है। आप मुख्य पृष्ठ पर जा सकते हैं या नवीनतम करेंट अफेयर्स देख सकते हैं।
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-devanagari">
        <Button size="lg" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            होम पेज (Home)
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/current-affairs">
            <Search className="mr-2 h-4 w-4" />
            करेंट अफेयर्स (Current Affairs)
          </Link>
        </Button>
      </div>
      <div className="mt-12 grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-3 font-devanagari">
        {[
          { href: "/current-affairs", title: "दैनिक करेंट अफेयर्स" },
          { href: "/editorial", title: "संपादकीय विश्लेषण" },
          { href: "/mppsc", title: "एमपीपीएससी पोर्टल" },
          { href: "/upsc", title: "यूपीएससी पोर्टल" },
          { href: "/monthly-pdf", title: "मासिक पीडीएफ लाइब्रेरी" },
          { href: "/free-pdf", title: "फ्री पीडीएफ डाउनलोड" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-xl border border-border bg-card p-3 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary flex flex-col justify-center items-center"
          >
            <span>{link.title}</span>
            <span className="text-[10px] text-muted-foreground mt-0.5 capitalize group-hover:text-primary/80">{link.href.replace("/", "") || "home"}</span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
