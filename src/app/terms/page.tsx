import { getContentRepository } from "@/lib/content/content-repository";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "नियम और शर्तें (Terms & Conditions)",
  description: "आकार आईएएस के नियम और शर्तें। हमारी वेबसाइट का उपयोग करने से पहले कृपया इन्हें ध्यान से पढ़ें।",
  path: "/terms",
});

export default async function TermsPage() {
  const repo = await getContentRepository();
  const page = await repo.getStaticPage("terms", "hi");

  if (page && page.body) {
    return (
      <>
        <Section className="pb-0 pt-8">
          <Container size="wide">
            <Breadcrumb items={[{ name: "नियम और शर्तें" }]} />
            <div className="mt-6">
              <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {page.title}
              </h1>
            </div>
          </Container>
        </Section>

        <Section>
          <Container size="narrow">
            <div className="prose prose-aakar dark:prose-invert max-w-none">
              <PortableText value={page.body} />
            </div>
          </Container>
        </Section>
      </>
    );
  }

  return (
    <>
      <Section className="pb-0 pt-8">
        <Container size="wide">
          <Breadcrumb items={[{ name: "Terms & Conditions" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              नियम और शर्तें (Terms & Conditions)
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">अंतिम अद्यतन: जून 2026</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            <p>
              आकार आईएएस (Aakar IAS) की वेबसाइट पर आपका स्वागत है। हमारी वेबसाइट का उपयोग करके, आप निम्नलिखित नियमों और शर्तों का पालन करने और उनसे बाध्य होने के लिए सहमत हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया हमारी वेबसाइट का उपयोग न करें।
            </p>

            <h2>1. बौद्धिक संपदा (Intellectual Property)</h2>
            <p>
              इस वेबसाइट पर उपलब्ध सभी सामग्री, जिसमें करेंट अफेयर्स लेख, ब्लॉग पोस्ट, संपादकीय, चित्र, पीडीएफ, लोगो और अन्य सामग्री शामिल हैं, आकार आईएएस की बौद्धिक संपदा है। आप इस सामग्री का उपयोग केवल व्यक्तिगत और गैर-व्यावसायिक अध्ययन के लिए कर सकते हैं। आकार आईएएस की लिखित अनुमति के बिना इस सामग्री का पुनरुत्पादन, वितरण या व्यावसायिक उपयोग सख्त वर्जित है।
            </p>

            <h2>2. उपयोग की शर्तें</h2>
            <p>आप सहमत हैं कि आप वेबसाइट का उपयोग केवल वैध उद्देश्यों के लिए करेंगे और इस तरह से करेंगे जो दूसरों के अधिकारों का उल्लंघन न करे या उनके उपयोग को प्रतिबंधित या बाधित न करे।</p>

            <h2>3. सटीकता और अस्वीकरण</h2>
            <p>
              यद्यपि हम वेबसाइट पर सटीक और अद्यतित जानकारी प्रदान करने का हर संभव प्रयास करते हैं, लेकिन हम इसकी पूर्णता, सटीकता या विश्वसनीयता की गारंटी नहीं देते हैं। यह सामग्री केवल शैक्षिक और सूचनात्मक उद्देश्यों के लिए प्रदान की गई है।
            </p>

            <h2>4. देयता की सीमा</h2>
            <p>
              आकार आईएएस वेबसाइट या उसकी सामग्री के उपयोग या उपयोग करने में असमर्थता से उत्पन्न होने वाले किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक या परिणामी नुकसान के लिए उत्तरदायी नहीं होगा।
            </p>

            <h2>5. शर्तों में संशोधन</h2>
            <p>
              हम बिना किसी पूर्व सूचना के किसी भी समय इन नियमों और शर्तों को बदलने का अधिकार सुरक्षित रखते हैं। वेबसाइट का निरंतर उपयोग यह माना जाएगा कि आपने संशोधित शर्तों को स्वीकार कर लिया है।
            </p>

            <h2>संपर्क करें</h2>
            <p>
              इन शर्तों से संबंधित किसी भी प्रश्न के लिए, कृपया हमें <a href="mailto:help@aakarias.com">help@aakarias.com</a> पर ईमेल करें।
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
