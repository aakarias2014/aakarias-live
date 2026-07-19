import { getContentRepository } from "@/lib/content/content-repository";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "वापसी और धनवापसी नीति (Refund Policy)",
  description: "आकार आईएएस की धनवापसी नीति। निःशुल्क और सशुल्क सामग्री से संबंधित धनवापसी नियम जानें।",
  path: "/refund",
});

export default async function RefundPage() {
  const repo = await getContentRepository();
  const page = await repo.getStaticPage("refund", "hi");

  if (page && page.body) {
    return (
      <>
        <Section className="pb-0 pt-8">
          <Container size="wide">
            <Breadcrumb items={[{ name: "रिफंड नीति" }]} />
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
          <Breadcrumb items={[{ name: "Refund Policy" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              वापसी और धनवापसी नीति (Refund Policy)
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">अंतिम अद्यतन: जून 2026</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            <p>
              आकार आईएएस (Aakar IAS) पर आपका विश्वास हमारे लिए सर्वोपरि है। वर्तमान में, हमारी वेबसाइट पर उपलब्ध अधिकांश सामग्री (जैसे दैनिक करेंट अफेयर्स, लेख और मासिक पीडीएफ) निःशुल्क डाउनलोड और पढ़ने के लिए उपलब्ध हैं।
            </p>

            <h2>1. निःशुल्क सामग्री (Free Resources)</h2>
            <p>
              वेबसाइट पर उपलब्ध सभी निःशुल्क डाउनलोड, पीडीएफ, नोट्स और लेखों के लिए किसी भुगतान की आवश्यकता नहीं होती है। इसलिए, इन मुफ्त सेवाओं पर कोई रिफंड लागू नहीं होता है।
            </p>

            <h2>2. भविष्य की सशुल्क सेवाएं (Future Paid Services)</h2>
            <p>
              भविष्य में, यदि आकार आईएएस टेस्ट सीरीज, ऑनलाइन कोर्सेज, ऑफलाइन क्लासरूम प्रोग्राम या मुद्रित पुस्तकें जैसी सशुल्क सेवाएं शुरू करता है, तो प्रत्येक विशिष्ट सेवा के लिए धनवापसी नीति निम्नलिखित नियमों के अनुसार होगी:
            </p>
            <ul>
              <li><strong>कोर्सेज और टेस्ट सीरीज:</strong> एक बार कोर्स या टेस्ट सीरीज का एक्सेस सक्रिय हो जाने के बाद, कोई रिफंड नहीं दिया जाएगा।</li>
              <li><strong>मुद्रित सामग्री/पुस्तकें:</strong> यदि प्राप्त सामग्री क्षतिग्रस्त या गलत है, तो आप डिलीवरी के 7 दिनों के भीतर प्रतिस्थापन या रिफंड के लिए अनुरोध कर सकते हैं।</li>
            </ul>

            <h2>3. रद्दीकरण नीति (Cancellation Policy)</h2>
            <p>
              सशुल्क सेवाओं के लिए रद्दीकरण अनुरोधों पर केवल तभी विचार किया जाएगा जब वे खरीद के 24 घंटों के भीतर और संबंधित सेवा के सक्रिय होने से पहले किए गए हों।
            </p>

            <h2>संपर्क करें</h2>
            <p>
              यदि रिफंड या कैंसिलेशन से संबंधित आपका कोई प्रश्न या संदेह है, तो कृपया हमें <a href="mailto:help@aakarias.com">help@aakarias.com</a> पर लिखें।
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
