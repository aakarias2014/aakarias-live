"use server";

import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Newsletter subscribe — Phase 2 Server Action.
 *
 * When Supabase is configured: upserts a row in `newsletter_subscribers`.
 * Graceful degradation: if Supabase is not configured, logs and returns success.
 */

const schema = z.object({
  email: z.email("Please enter a valid email address."),
  locale: z.enum(["hi", "en"]).default("hi"),
  source: z.string().optional(),
});

export type SubscribeNewsletterInput = z.input<typeof schema>;

export async function subscribeNewsletter(
  input: SubscribeNewsletterInput,
): Promise<{ success: boolean; message?: string }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message };
  }
  const { email, locale, source } = parsed.data;

  const supabase = getSupabaseServerClient();

  if (supabase) {
    const { error } = await supabase.from("newsletter_subscribers").upsert(
      {
        email,
        locale,
        source: source ?? "unknown",
        active: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" },
    );

    if (error) {
      console.error("[newsletter] Supabase error:", error.message);
      // Don't expose DB errors to the user — still return success UX
    } else {
      console.info(`[newsletter] Subscribed: ${email} (${locale})`);
    }
  } else {
    // Phase 1 graceful degradation — Supabase not yet configured.
    console.info(
      `[newsletter] Supabase not configured. email=${email} locale=${locale} source=${source}`,
    );
  }

  return {
    success: true,
    message:
      locale === "hi"
        ? "सफलतापूर्वक सब्सक्राइब किया! अगला संस्करण आपको मिलेगा।"
        : "Subscribed! You'll receive our next edition.",
  };
}
