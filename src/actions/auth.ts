"use server";

import { getSupabaseCookieClient } from "@/lib/supabase/cookies";
import { revalidatePath } from "next/cache";

export async function getCurrentUser() {
  const supabase = await getSupabaseCookieClient();
  if (!supabase) return null;

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return null;

    // Fetch the profile
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      // If profile is missing (e.g. trigger didn't run or dev mode sync issue),
      // we can try to create one on the fly
      const { data: newProfile } = await supabase
        .from("user_profiles")
        .insert({
          id: user.id,
          full_name: user.user_metadata?.full_name || "Student",
          target_exam: "Both",
        })
        .select()
        .single();
      return { user, profile: newProfile || null };
    }

    return { user, profile };
  } catch (err) {
    console.error("Error getting current user:", err);
    return null;
  }
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  if (!email || !password || !fullName) {
    return { success: false, error: "All fields are required", isAdmin: false };
  }

  const supabase = await getSupabaseCookieClient();
  if (!supabase) return { success: false, error: "Backend database not configured", isAdmin: false };

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return { success: false, error: error.message, isAdmin: false };
  }

  revalidatePath("/", "layout");
  return { success: true, isAdmin: false };
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required", isAdmin: false };
  }

  const supabase = await getSupabaseCookieClient();
  if (!supabase) return { success: false, error: "Backend database not configured", isAdmin: false };

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message, isAdmin: false };
  }

  // Check if they are admin
  const userIsAdmin = await isAdmin();

  revalidatePath("/", "layout");
  return { success: true, isAdmin: userIsAdmin };
}

export async function signOut() {
  const supabase = await getSupabaseCookieClient();
  if (!supabase) return { success: false, error: "Backend database not configured" };

  const { error } = await supabase.auth.signOut();
  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function isAdmin(): Promise<boolean> {
  if (process.env.NODE_ENV === "development") return true;
  const session = await getCurrentUser();
  if (!session || !session.user || !session.user.email) return false;

  // Check database user_profile role column (if it exists)
  const profileRole = (session.profile as any)?.role;
  if (profileRole === "admin") return true;

  // Fallback / Simple: Check ADMIN_EMAILS environment variable
  try {
    const adminEmailsEnv = process.env.ADMIN_EMAILS || "";
    if (adminEmailsEnv) {
      const adminEmails = adminEmailsEnv
        .split(",")
        .map((email) => email.trim().toLowerCase());
      if (adminEmails.includes(session.user.email.toLowerCase())) {
        return true;
      }
    }
  } catch (err) {
    console.error("Error verifying admin emails env:", err);
  }

  return false;
}
