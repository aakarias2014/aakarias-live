"use server";

import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const schema = z.object({
  phone: z.string()
    .min(10, "Please enter a valid phone number.")
    .max(15, "Please enter a valid phone number."),
  locale: z.enum(["hi", "en"]).default("hi"),
  source: z.string().optional(),
});

export type SubscribeWhatsAppInput = z.input<typeof schema>;

export async function subscribeWhatsApp(
  input: SubscribeWhatsAppInput,
): Promise<{ success: boolean; message?: string }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message };
  }
  const { phone, locale, source } = parsed.data;

  const supabase = getSupabaseServerClient();

  if (supabase) {
    const { error } = await supabase.from("whatsapp_subscribers").upsert(
      {
        phone,
        locale,
        source: source ?? "unknown",
        active: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "phone" },
    );

    if (error) {
      console.error("[whatsapp] Supabase error:", error.message);
    } else {
      console.info(`[whatsapp] Subscribed phone: ${phone} (${locale})`);
    }
  } else {
    console.info(
      `[whatsapp] Supabase not configured. phone=${phone} locale=${locale} source=${source}`,
    );
  }

  return {
    success: true,
    message:
      locale === "hi"
        ? "सफलतापूर्वक सब्सक्राइब किया! दैनिक पीडीएफ सीधे आपके व्हाट्सएप पर भेजी जाएगी।"
        : "Subscribed successfully! Daily current affairs PDF will be sent directly to your WhatsApp.",
  };
}
