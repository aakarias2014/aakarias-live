import { getContentRepository } from "@/lib/content/content-repository";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "गोपनीयता नीति (Privacy Policy)",
  description: "आकार आईएएस की गोपनीयता नीति। जानें कि हम आपके डेटा की सुरक्षा और गोपनीयता कैसे बनाए रखते हैं।",
  path: "/privacy",
});

export default async function PrivacyPage() {
  const repo = await getContentRepository();
  const page = await repo.getStaticPage("privacy", "hi");

  if (page && page.body) {
    return (
      <>
        <Section className="pb-0 pt-8">
          <Container size="wide">
            <Breadcrumb items={[{ name: "गोपनीयता नीति" }]} />
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
          <Breadcrumb items={[{ name: "Privacy Policy" }]} />
          <div className="mt-6">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              गोपनीयता नीति (Privacy Policy)
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">अंतिम अद्यतन: जून 2026</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <div className="prose prose-aakar dark:prose-invert max-w-none">
            <p>
              आकार आईएएस (Aakar IAS) में, हम अपने उपयोगकर्ताओं की गोपनीयता का सम्मान करते हैं और उसकी सुरक्षा के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट का उपयोग करते हैं तो हम आपकी जानकारी कैसे एकत्र, उपयोग और सुरक्षित करते हैं।
            </p>

            <h2>1. जानकारी जो हम एकत्र करते हैं</h2>
            <p>
              हम आपके द्वारा स्वेच्छा से प्रदान की गई जानकारी एकत्र करते हैं, जैसे कि जब आप हमारे न्यूज़लेटर की सदस्यता लेते हैं, हमसे संपर्क फ़ॉर्म के माध्यम से संपर्क करते हैं, या कोई अध्ययन सामग्री डाउनलोड करते हैं। इस जानकारी में शामिल हो सकते हैं:
            </p>
            <ul>
              <li>नाम और संपर्क जानकारी (जैसे ईमेल पता और फोन नंबर)</li>
              <li>आपके द्वारा भेजे गए संदेशों की सामग्री</li>
              <li>वेबसाइट उपयोग डेटा (जैसे आईपी पता, ब्राउज़र प्रकार, और देखे गए पृष्ठ)</li>
            </ul>

            <h2>2. जानकारी का उपयोग</h2>
            <p>हम एकत्र की गई जानकारी का उपयोग निम्नलिखित उद्देश्यों के लिए करते हैं:</p>
            <ul>
              <li>आपको दैनिक करेंट अफेयर्स, शैक्षिक सामग्री और अपडेट प्रदान करने के लिए</li>
              <li>आपके प्रश्नों और अनुरोधों का उत्तर देने के लिए</li>
              <li>हमारी वेबसाइट के प्रदर्शन और उपयोगकर्ता अनुभव को बेहतर बनाने के लिए</li>
              <li>यदि आप न्यूज़लेटर की सदस्यता लेते हैं, तो आपको ईमेल भेजने के लिए</li>
            </ul>

            <h2>3. डेटा सुरक्षा</h2>
            <p>
              हम आपकी व्यक्तिगत जानकारी को अनधिकृत पहुंच, उपयोग या प्रकटीकरण से बचाने के लिए उचित सुरक्षा उपाय लागू करते हैं। हालांकि, इंटरनेट पर ट्रांसमिशन की कोई भी विधि 100% सुरक्षित नहीं है, और हम पूर्ण सुरक्षा की गारंटी नहीं दे सकते।
            </p>

            <h2>4. तीसरे पक्ष के लिंक</h2>
            <p>
              हमारी वेबसाइट में अन्य वेबसाइटों के लिंक हो सकते हैं। हम इन तीसरे पक्ष की साइटों की गोपनीयता प्रथाओं या सामग्री के लिए ज़िम्मेदार नहीं हैं। हम आपको उनके नियमों और नीतियों को पढ़ने की सलाह देते हैं।
            </p>

            <h2>5. नीति में बदलाव</h2>
            <p>
              हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। कोई भी बदलाव इस पृष्ठ पर पोस्ट किया जाएगा, और नीति के शीर्ष पर "अंतिम अद्यतन" तिथि को संशोधित किया जाएगा।
            </p>

            <h2>संपर्क करें</h2>
            <p>
              यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो आप हमसे ईमेल <a href="mailto:help@aakarias.com">help@aakarias.com</a> पर संपर्क कर सकते हैं।
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
