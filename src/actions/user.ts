"use server";

import { getSupabaseCookieClient } from "@/lib/supabase/cookies";
import { revalidatePath } from "next/cache";

export async function getBookmarks() {
  const supabase = await getSupabaseCookieClient();
  if (!supabase) return [];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookmarks:", error);
    return [];
  }

  return data || [];
}

export async function checkIsBookmarked(articleId: string) {
  const supabase = await getSupabaseCookieClient();
  if (!supabase) return false;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", user.id)
    .eq("article_id", articleId)
    .maybeSingle();

  if (error) return false;
  return !!data;
}

export async function toggleBookmark(
  articleId: string,
  title: string,
  slug: string,
  type: string,
  locale: string
) {
  const supabase = await getSupabaseCookieClient();
  if (!supabase) return { success: false, error: "Backend database not configured" };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "You must be signed in to bookmark articles" };

  // Check if it already exists
  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", user.id)
    .eq("article_id", articleId)
    .maybeSingle();

  if (existing) {
    // Remove it
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", user.id)
      .eq("article_id", articleId);

    if (error) return { success: false, error: error.message };
    revalidatePath("/dashboard");
    return { success: true, bookmarked: false };
  } else {
    // Add it
    const { error } = await supabase
      .from("bookmarks")
      .insert({
        user_id: user.id,
        article_id: articleId,
        title,
        slug,
        type,
        locale: locale === "en" ? "en" : "hi",
      });

    if (error) return { success: false, error: error.message };
    revalidatePath("/dashboard");
    return { success: true, bookmarked: true };
  }
}

export async function saveQuizResult(articleSlug: string, score: number, total: number) {
  const supabase = await getSupabaseCookieClient();
  if (!supabase) return { success: false, error: "Backend database not configured" };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "You must be signed in to save quiz results" };

  const { error } = await supabase
    .from("quiz_history")
    .insert({
      user_id: user.id,
      article_slug: articleSlug,
      score,
      total,
    });

  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getQuizHistory() {
  const supabase = await getSupabaseCookieClient();
  if (!supabase) return [];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("quiz_history")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching quiz history:", error);
    return [];
  }

  return data || [];
}

export async function updateTargetExam(targetExam: "UPSC" | "MPPSC" | "Both") {
  const supabase = await getSupabaseCookieClient();
  if (!supabase) return { success: false, error: "Backend database not configured" };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "You must be signed in" };

  const { error } = await supabase
    .from("user_profiles")
    .update({ target_exam: targetExam })
    .eq("id", user.id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard");
  return { success: true };
}
