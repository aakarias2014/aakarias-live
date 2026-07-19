"use server";

import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Track a PDF download event — Phase 2 Server Action.
 *
 * Atomically increments the download count in Supabase's `downloads` table.
 * Degrades gracefully when Supabase is not configured.
 */

const schema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  kind: z.enum(["monthly_pdf", "pyq", "syllabus", "free_pdf", "ncert", "brochure"]).default("monthly_pdf"),
  url: z.string().url(),
  locale: z.enum(["hi", "en"]).default("hi"),
});

export type TrackDownloadInput = z.input<typeof schema>;

export async function trackDownload(
  input: TrackDownloadInput,
): Promise<{ success: boolean; count?: number }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { success: false };

  const { slug, title, kind, url, locale } = parsed.data;

  const supabase = getSupabaseServerClient();

  if (supabase) {
    // Use the upsert_download RPC function for atomic counter increment
    const { error } = await supabase.rpc("upsert_download", {
      p_slug: slug,
      p_title: title,
      p_kind: kind,
      p_url: url,
      p_locale: locale,
    });

    if (error) {
      console.error("[download] Supabase RPC error:", error.message);
      return { success: false };
    }

    // Fetch updated count
    const { data } = await supabase
      .from("downloads")
      .select("count")
      .eq("resource_slug", slug)
      .eq("locale", locale)
      .single();

    console.info(`[download] ${title} (${slug}) → count=${data?.count ?? "?"}`);
    return { success: true, count: data?.count };
  } else {
    console.info(
      `[download] Supabase not configured. slug=${slug} kind=${kind} locale=${locale}`,
    );
    return { success: true };
  }
}

/**
 * Fetch download count for a resource (used for display).
 * Reads from Supabase using the public anon key (RLS allows public SELECT).
 */
export async function getDownloadCount(slug: string, locale: "hi" | "en" = "hi"): Promise<number> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return 0;

  const { data } = await supabase
    .from("downloads")
    .select("count")
    .eq("resource_slug", slug)
    .eq("locale", locale)
    .single();

  return data?.count ?? 0;
}
