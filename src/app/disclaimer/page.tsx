import { getContentRepository } from "@/lib/content/content-repository";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "अस्वीकरण (Disclaimer)",
  description: "आकार आईएएस का अस्वीकरण। कृपया हमारी शैक्षिक सामग्री और मार्गदर्शन से संबंधित नियम पढ़ें।",
  path: "/disclaimer",
});

export default async function DisclaimerPage() {
  const repo = await getContentRepository();
  const page = await repo.getStaticPage("disclaimer", "hi");

  if (page && page.body) {
    return (
      <>
        <Section className="pb-0 pt-8">
          <Container size="wide">
            <Breadcrumb items={[{ name: "अस्वीकरण" }]} />
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
          <Breadcrumb items={[{ name: "Disclaimer" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              अस्वीकरण (Disclaimer)
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">अंतिम अद्यतन: जून 2026</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            <p>
              आकार आईएएस (Aakar IAS) की वेबसाइट पर प्रदान की जाने वाली जानकारी केवल सामान्य शैक्षिक और सूचनात्मक उद्देश्यों के लिए है। हमारी वेबसाइट का उपयोग करने से पहले कृपया निम्नलिखित अस्वीकरण को ध्यान से पढ़ें।
            </p>

            <h2>1. केवल शैक्षिक उद्देश्य</h2>
            <p>
              इस वेबसाइट पर उपलब्ध सभी अध्ययन सामग्री, करेंट अफेयर्स संकलन, ब्लॉग और संपादकीय केवल यूपीएससी (UPSC), एमपीपीएससी (MPPSC) और अन्य प्रतियोगी परीक्षाओं की तैयारी करने वाले छात्रों के मार्गदर्शन के लिए हैं। किसी भी सरकारी सेवा या परीक्षा में सफलता की कोई गारंटी नहीं दी जाती है।
            </p>

            <h2>2. जानकारी की सटीकता</h2>
            <p>
              हम विश्वसनीय स्रोतों (जैसे पीआईबी, द हिंदू, दैनिक जागरण आदि) से जानकारी एकत्र करने और उसे सही रूप में प्रस्तुत करने का हर संभव प्रयास करते हैं। हालांकि, सरकारी नीतियों, आंकड़ों या परीक्षा के पैटर्न में बदलाव के कारण कुछ जानकारी पुरानी या गलत हो सकती है। उपयोगकर्ताओं को सलाह दी जाती है कि वे आधिकारिक सरकारी स्रोतों से जानकारी की पुष्टि करें।
            </p>

            <h2>3. तीसरे पक्ष के लिंक और विज्ञापन</h2>
            <p>
              हमारी वेबसाइट में बाहरी वेबसाइटों के लिंक हो सकते हैं जो हमारे नियंत्रण में नहीं हैं। हम इन बाहरी साइटों की सामग्री, नीतियों या सुरक्षा के लिए कोई जिम्मेदारी स्वीकार नहीं करते हैं।
            </p>

            <h2>4. कोई व्यावसायिक संबंध नहीं</h2>
            <p>
              वेबसाइट पर मुफ्त सामग्री प्रदान करने से किसी भी प्रकार के व्यावसायिक या कानूनी संबंध (जैसे शिक्षक-छात्र या परामर्शदाता-ग्राहक) का निर्माण नहीं होता है।
            </p>

            <h2>संपर्क करें</h2>
            <p>
              इस अस्वीकरण के संबंध में किसी भी स्पष्टीकरण के लिए, कृपया हमें <a href="mailto:help@aakarias.com">help@aakarias.com</a> पर ईमेल करें।
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
