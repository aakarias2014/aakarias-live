"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isAdmin } from "./auth";
import { revalidatePath, updateTag } from "next/cache";
import { createClient } from "@sanity/client";
import { env } from "@/lib/env";
import { TestSchedule, Topper } from "@/lib/content/types";

// Helper to assert admin privileges
async function requireAdmin() {
  const isAuthorized = await isAdmin();
  if (!isAuthorized) {
    throw new Error("Unauthorized access. Admin privileges required.");
  }
}

/**
 * Fetch aggregated statistics for the admin dashboard metrics grid.
 */
export async function getAdminMetrics() {
  await requireAdmin();

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return {
      subscribersCount: 0,
      whatsappCount: 0,
      messagesCount: 0,
      downloadsCount: 0,
      studentsCount: 0,
    };
  }

  // Fetch counts in parallel
  const [
    subscribersRes,
    whatsappRes,
    messagesRes,
    downloadsRes,
    studentsRes,
  ] = await Promise.all([
    supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
    supabase.from("whatsapp_subscribers").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("downloads").select("countSum:count.sum()"), // Sum of all downloads
    supabase.from("user_profiles").select("id", { count: "exact", head: true }),
  ]);

  // Fetch all downloads to sum if the sum aggregate is not supported directly in this version
  let totalDownloads = 0;
  if (downloadsRes.data && Array.isArray(downloadsRes.data)) {
    // If sum query worked
    const firstRow = downloadsRes.data[0] as unknown as Record<string, unknown>;
    totalDownloads = typeof firstRow?.countSum === "number" ? firstRow.countSum : 0;
  } else {
    // Fallback: Fetch count rows and sum locally
    const { data: downloadRows } = await supabase.from("downloads").select("count");
    totalDownloads = (downloadRows || []).reduce((acc, row) => acc + (row.count || 0), 0);
  }

  return {
    subscribersCount: subscribersRes.count || 0,
    whatsappCount: whatsappRes.count || 0,
    messagesCount: messagesRes.count || 0, // Unread/New messages
    downloadsCount: totalDownloads,
    studentsCount: studentsRes.count || 0,
  };
}

/**
 * Fetch all newsletter and whatsapp subscribers.
 */
export async function getSubscribersList() {
  await requireAdmin();

  const supabase = getSupabaseServerClient();
  if (!supabase) return { newsletter: [], whatsapp: [] };

  const [newsletterRes, whatsappRes] = await Promise.all([
    supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("whatsapp_subscribers")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  return {
    newsletter: newsletterRes.data || [],
    whatsapp: whatsappRes.data || [],
  };
}

/**
 * Fetch contact messages by status.
 */
export async function getContactMessages(status?: string) {
  await requireAdmin();

  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  let query = supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching contact messages:", error.message);
    return [];
  }

  return data || [];
}

/**
 * Update the status of a contact message (e.g. New -> Read / Archived / Replied).
 */
export async function updateMessageStatus(messageId: string, status: "new" | "read" | "replied" | "archived") {
  await requireAdmin();

  const supabase = getSupabaseServerClient();
  if (!supabase) return { success: false, error: "Database not configured" };

  const { error } = await supabase
    .from("contact_messages")
    .update({ status })
    .eq("id", messageId);

  if (error) {
    console.error("Error updating message status:", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/messages");
  return { success: true };
}

/**
 * Fetch downloads analytics.
 */
export async function getDownloadsAnalytics() {
  await requireAdmin();

  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("downloads")
    .select("*")
    .order("count", { ascending: false })
    .limit(30);

  if (error) {
    console.error("Error fetching downloads analytics:", error.message);
    return [];
  }

  return data || [];
}

/**
 * Fetch registered student user profiles.
 */
export async function getStudentProfiles() {
  await requireAdmin();

  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching student profiles:", error.message);
    return [];
  }

  return data || [];
}

/**
 * Fetch list of all static pages created in Sanity.
 */
export async function getStaticPagesList() {
  await requireAdmin();

  const { env } = await import("@/lib/env");
  const source = env().CONTENT_SOURCE;

  if (source !== "sanity") {
    return [];
  }

  try {
    const { sanityClient } = await import("@/lib/sanity/client");
    const query = `*[_type == "staticPage" && !(_id in path("drafts.**"))]{
      _id,
      "slug": slug.current,
      title,
      titleEn
    }`;
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (error) {
    console.error("Error fetching static pages list:", error);
    return [];
  }
}

// Helper to get write-capable Sanity client
function getSanityWriteClient() {
  const {
    NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
    NEXT_PUBLIC_SANITY_DATASET: dataset,
    SANITY_API_WRITE_TOKEN: token,
  } = env();

  if (!projectId || !dataset || !token) {
    throw new Error("Missing Sanity variables for writing.");
  }

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2024-10-01",
    useCdn: false,
  });
}

/**
 * Fetch all faculties (Senior Mentors) for admin panel management.
 */
export async function getFacultiesList() {
  await requireAdmin();
  const client = getSanityWriteClient();

  // Fetch all documents of type 'faculty', ordering by orderIndex, then _createdAt
  const query = `*[_type == "faculty"] | order(orderIndex asc, _createdAt asc){
    "id": _id,
    nameHi,
    nameEn,
    titleHi,
    titleEn,
    descHi,
    descEn,
    "image": image.asset->url,
    medium,
    orderIndex
  }`;

  try {
    const results = await client.fetch(query);
    return results || [];
  } catch (error) {
    console.error("Error fetching faculties list in admin action:", error);
    return [];
  }
}

/**
 * Create a new faculty member (Senior Mentor) document in Sanity.
 */
export async function createFaculty(formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const nameHi = formData.get("nameHi") as string;
  const nameEn = formData.get("nameEn") as string;
  const titleHi = formData.get("titleHi") as string;
  const titleEn = formData.get("titleEn") as string;
  const descHi = formData.get("descHi") as string;
  const descEn = formData.get("descEn") as string;
  const medium = formData.get("medium") as "hindi" | "english";
  const orderIndex = Number(formData.get("orderIndex") || 0);
  const file = formData.get("image") as File | null;

  if (!nameHi || !nameEn || !titleHi || !titleEn) {
    return { success: false, error: "Name and Title fields are required in both Hindi and English." };
  }

  try {
    const doc: any = {
      _type: "faculty",
      nameHi,
      nameEn,
      titleHi,
      titleEn,
      descHi,
      descEn,
      medium,
      orderIndex,
    };

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, {
        filename: file.name,
        contentType: file.type,
      });
      doc.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      };
    }

    await client.create(doc);

    // Revalidate paths & tags
    updateTag("faculties");
    revalidatePath("/offline-courses");
    revalidatePath("/en/offline-courses");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error creating faculty:", error);
    return { success: false, error: error.message || "Failed to create senior mentor." };
  }
}

/**
 * Update an existing faculty member (Senior Mentor) document in Sanity.
 */
export async function updateFaculty(id: string, formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const nameHi = formData.get("nameHi") as string;
  const nameEn = formData.get("nameEn") as string;
  const titleHi = formData.get("titleHi") as string;
  const titleEn = formData.get("titleEn") as string;
  const descHi = formData.get("descHi") as string;
  const descEn = formData.get("descEn") as string;
  const medium = formData.get("medium") as "hindi" | "english";
  const orderIndex = Number(formData.get("orderIndex") || 0);
  const file = formData.get("image") as File | null;

  if (!nameHi || !nameEn || !titleHi || !titleEn) {
    return { success: false, error: "Name and Title fields are required in both Hindi and English." };
  }

  try {
    const doc: any = {
      nameHi,
      nameEn,
      titleHi,
      titleEn,
      descHi,
      descEn,
      medium,
      orderIndex,
    };

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, {
        filename: file.name,
        contentType: file.type,
      });
      doc.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      };
    }

    await client.patch(id).set(doc).commit();

    // Revalidate paths & tags
    updateTag("faculties");
    revalidatePath("/offline-courses");
    revalidatePath("/en/offline-courses");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error updating faculty:", error);
    return { success: false, error: error.message || "Failed to update senior mentor." };
  }
}

/**
 * Delete a faculty member (Senior Mentor) document from Sanity.
 */
export async function deleteFaculty(id: string) {
  await requireAdmin();
  const client = getSanityWriteClient();

  try {
    await client.delete(id);

    // Revalidate paths & tags
    updateTag("faculties");
    revalidatePath("/offline-courses");
    revalidatePath("/en/offline-courses");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting faculty:", error);
    return { success: false, error: error.message || "Failed to delete senior mentor." };
  }
}

/**
 * Fetch all offline classroom batches from Sanity for admin management.
 */
export async function getOfflineBatchesList() {
  await requireAdmin();
  const client = getSanityWriteClient();

  const query = `*[_type == "offlineBatch"] | order(orderIndex asc, _createdAt desc) {
    "id": _id,
    titleHi,
    titleEn,
    startDateHi,
    startDateEn,
    timeHi,
    timeEn,
    medium,
    badgeHi,
    badgeEn,
    seatsFillPercent,
    descHi,
    descEn,
    locationNameHi,
    locationNameEn,
    center,
    orderIndex,
    isNew
  }`;

  try {
    const results = await client.fetch(query);
    return results || [];
  } catch (error) {
    console.error("Error fetching offline batches list in admin action:", error);
    return [];
  }
}

/**
 * Create a new offline classroom batch.
 */
export async function createOfflineBatch(formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const titleHi = formData.get("titleHi") as string;
  const titleEn = formData.get("titleEn") as string;
  const startDateHi = formData.get("startDateHi") as string;
  const startDateEn = formData.get("startDateEn") as string;
  const timeHi = formData.get("timeHi") as string;
  const timeEn = formData.get("timeEn") as string;
  const medium = formData.get("medium") as "hindi" | "english" | "bilingual";
  const badgeHi = formData.get("badgeHi") as string;
  const badgeEn = formData.get("badgeEn") as string;
  const seatsFillPercent = Number(formData.get("seatsFillPercent") || 0);
  const descHi = formData.get("descHi") as string;
  const descEn = formData.get("descEn") as string;
  const locationNameHi = formData.get("locationNameHi") as string || "Rajiv Gandhi Circle Campus";
  const locationNameEn = formData.get("locationNameEn") as string || "Rajiv Gandhi Circle Campus";
  const center = formData.get("center") as string || "indore";
  const orderIndex = Number(formData.get("orderIndex") || 0);
  const isNew = formData.get("isNew") === "true";

  if (!titleHi || !titleEn || !startDateHi || !startDateEn || !timeHi || !timeEn) {
    return { success: false, error: "Title, Start Date, and Timing fields are required in both Hindi and English." };
  }

  try {
    const doc = {
      _type: "offlineBatch",
      titleHi,
      titleEn,
      startDateHi,
      startDateEn,
      timeHi,
      timeEn,
      medium,
      badgeHi,
      badgeEn,
      seatsFillPercent,
      descHi,
      descEn,
      locationNameHi,
      locationNameEn,
      center,
      orderIndex,
      isNew,
    };

    await client.create(doc);

    // Revalidate paths & tags
    updateTag("offlineBatches");
    revalidatePath("/offline-courses");
    revalidatePath("/en/offline-courses");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error creating offline batch:", error);
    return { success: false, error: error.message || "Failed to create offline batch." };
  }
}

/**
 * Update an existing offline classroom batch.
 */
export async function updateOfflineBatch(id: string, formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const titleHi = formData.get("titleHi") as string;
  const titleEn = formData.get("titleEn") as string;
  const startDateHi = formData.get("startDateHi") as string;
  const startDateEn = formData.get("startDateEn") as string;
  const timeHi = formData.get("timeHi") as string;
  const timeEn = formData.get("timeEn") as string;
  const medium = formData.get("medium") as "hindi" | "english" | "bilingual";
  const badgeHi = formData.get("badgeHi") as string;
  const badgeEn = formData.get("badgeEn") as string;
  const seatsFillPercent = Number(formData.get("seatsFillPercent") || 0);
  const descHi = formData.get("descHi") as string;
  const descEn = formData.get("descEn") as string;
  const locationNameHi = formData.get("locationNameHi") as string || "Rajiv Gandhi Circle Campus";
  const locationNameEn = formData.get("locationNameEn") as string || "Rajiv Gandhi Circle Campus";
  const center = formData.get("center") as string || "indore";
  const orderIndex = Number(formData.get("orderIndex") || 0);
  const isNew = formData.get("isNew") === "true";

  if (!titleHi || !titleEn || !startDateHi || !startDateEn || !timeHi || !timeEn) {
    return { success: false, error: "Title, Start Date, and Timing fields are required in both Hindi and English." };
  }

  try {
    const doc = {
      titleHi,
      titleEn,
      startDateHi,
      startDateEn,
      timeHi,
      timeEn,
      medium,
      badgeHi,
      badgeEn,
      seatsFillPercent,
      descHi,
      descEn,
      locationNameHi,
      locationNameEn,
      center,
      orderIndex,
      isNew,
    };

    await client.patch(id).set(doc).commit();

    // Revalidate paths & tags
    updateTag("offlineBatches");
    revalidatePath("/offline-courses");
    revalidatePath("/en/offline-courses");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error updating offline batch:", error);
    return { success: false, error: error.message || "Failed to update offline batch." };
  }
}

/**
 * Delete an offline classroom batch.
 */
export async function deleteOfflineBatch(id: string) {
  await requireAdmin();
  const client = getSanityWriteClient();

  try {
    await client.delete(id);

    // Revalidate paths & tags
    updateTag("offlineBatches");
    revalidatePath("/offline-courses");
    revalidatePath("/en/offline-courses");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting offline batch:", error);
    return { success: false, error: error.message || "Failed to delete offline batch." };
  }
}

/**
 * Fetch all online courses from Sanity for admin management.
 */
export async function getOnlineCoursesList() {
  await requireAdmin();
  const client = getSanityWriteClient();

  const query = `*[_type == "onlineCourse"] | order(orderIndex asc, _createdAt asc) {
    "id": _id,
    "slug": slug.current,
    titleHi,
    titleEn,
    category,
    "image": image.asset->url,
    altHi,
    altEn,
    badgeHi,
    badgeEn,
    isLive,
    mentorNameHi,
    mentorNameEn,
    mentorTitleHi,
    mentorTitleEn,
    "mentorImage": mentorImage.asset->url,
    mentorBioHi,
    mentorBioEn,
    price,
    originalPrice,
    durationHi,
    durationEn,
    lecturesCountHi,
    lecturesCountEn,
    studentsCountHi,
    studentsCountEn,
    rating,
    descriptionHi,
    descriptionEn,
    whatYouLearnHi,
    whatYouLearnEn,
    highlightsHi,
    highlightsEn,
    syllabus,
    features,
    testimonials,
    orderIndex
  }`;

  try {
    const results = await client.fetch(query);
    return results || [];
  } catch (error) {
    console.error("Error fetching online courses list in admin action:", error);
    return [];
  }
}

/**
 * Create a new online course.
 */
export async function createOnlineCourse(formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const titleHi = formData.get("titleHi") as string;
  const titleEn = formData.get("titleEn") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const altHi = formData.get("altHi") as string;
  const altEn = formData.get("altEn") as string;
  const badgeHi = formData.get("badgeHi") as string;
  const badgeEn = formData.get("badgeEn") as string;
  const isLive = formData.get("isLive") === "true";
  const enrollUrl = formData.get("enrollUrl") as string;
  
  const mentorNameHi = formData.get("mentorNameHi") as string;
  const mentorNameEn = formData.get("mentorNameEn") as string;
  const mentorTitleHi = formData.get("mentorTitleHi") as string;
  const mentorTitleEn = formData.get("mentorTitleEn") as string;
  const mentorBioHi = formData.get("mentorBioHi") as string;
  const mentorBioEn = formData.get("mentorBioEn") as string;

  const price = formData.get("price") as string;
  const originalPrice = formData.get("originalPrice") as string;
  const durationHi = formData.get("durationHi") as string;
  const durationEn = formData.get("durationEn") as string;
  const lecturesCountHi = formData.get("lecturesCountHi") as string;
  const lecturesCountEn = formData.get("lecturesCountEn") as string;
  const studentsCountHi = formData.get("studentsCountHi") as string;
  const studentsCountEn = formData.get("studentsCountEn") as string;
  const rating = formData.get("rating") as string || "4.9";
  const descriptionHi = formData.get("descriptionHi") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const orderIndex = Number(formData.get("orderIndex") || 0);

  // Parsed Array Fields
  let whatYouLearnHi: string[] = [];
  let whatYouLearnEn: string[] = [];
  let highlightsHi: string[] = [];
  let highlightsEn: string[] = [];
  let syllabus: any[] = [];
  let features: any[] = [];
  let testimonials: any[] = [];

  try {
    whatYouLearnHi = JSON.parse((formData.get("whatYouLearnHi") as string) || "[]");
    whatYouLearnEn = JSON.parse((formData.get("whatYouLearnEn") as string) || "[]");
    highlightsHi = JSON.parse((formData.get("highlightsHi") as string) || "[]");
    highlightsEn = JSON.parse((formData.get("highlightsEn") as string) || "[]");
    syllabus = JSON.parse((formData.get("syllabus") as string) || "[]");
    features = JSON.parse((formData.get("features") as string) || "[]");
    testimonials = JSON.parse((formData.get("testimonials") as string) || "[]");
  } catch (e) {
    console.error("Error parsing online course array fields:", e);
  }

  const file = formData.get("image") as File | null;
  const mentorFile = formData.get("mentorImage") as File | null;

  if (!titleHi || !titleEn || !slug || !price) {
    return { success: false, error: "Title, Slug, and Price fields are required." };
  }

  try {
    const doc: any = {
      _type: "onlineCourse",
      slug: { _type: "slug", current: slug },
      titleHi,
      titleEn,
      category,
      altHi,
      altEn,
      badgeHi,
      badgeEn,
      isLive,
      enrollUrl,
      mentorNameHi,
      mentorNameEn,
      mentorTitleHi,
      mentorTitleEn,
      mentorBioHi,
      mentorBioEn,
      price,
      originalPrice,
      durationHi,
      durationEn,
      lecturesCountHi,
      lecturesCountEn,
      studentsCountHi,
      studentsCountEn,
      rating,
      descriptionHi,
      descriptionEn,
      whatYouLearnHi,
      whatYouLearnEn,
      highlightsHi,
      highlightsEn,
      syllabus: syllabus.map((s: any, idx: number) => ({
        _key: `module-${idx}-${Date.now()}`,
        _type: "syllabusModule",
        titleHi: s.titleHi || "",
        titleEn: s.titleEn || "",
        topicsHi: s.topicsHi || [],
        topicsEn: s.topicsEn || [],
      })),
      features: features.map((f: any, idx: number) => ({
        _key: `feature-${idx}-${Date.now()}`,
        _type: "courseFeature",
        icon: f.icon || "",
        labelHi: f.labelHi || "",
        labelEn: f.labelEn || "",
        valueHi: f.valueHi || "",
        valueEn: f.valueEn || "",
      })),
      testimonials: testimonials.map((t: any, idx: number) => ({
        _key: `testimonial-${idx}-${Date.now()}`,
        _type: "courseTestimonial",
        nameHi: t.nameHi || "",
        nameEn: t.nameEn || "",
        examHi: t.examHi || "",
        examEn: t.examEn || "",
        textHi: t.textHi || "",
        textEn: t.textEn || "",
      })),
      orderIndex,
    };

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, {
        filename: file.name,
        contentType: file.type,
      });
      doc.image = {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      };
    }

    if (mentorFile && mentorFile.size > 0) {
      const buffer = Buffer.from(await mentorFile.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, {
        filename: mentorFile.name,
        contentType: mentorFile.type,
      });
      doc.mentorImage = {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      };
    }

    await client.create(doc);

    // Revalidate paths & tags
    updateTag("onlineCourses");
    revalidatePath("/online-courses");
    revalidatePath("/en/online-courses");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error creating online course:", error);
    return { success: false, error: error.message || "Failed to create online course." };
  }
}

/**
 * Update an existing online course.
 */
export async function updateOnlineCourse(id: string, formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const titleHi = formData.get("titleHi") as string;
  const titleEn = formData.get("titleEn") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const altHi = formData.get("altHi") as string;
  const altEn = formData.get("altEn") as string;
  const badgeHi = formData.get("badgeHi") as string;
  const badgeEn = formData.get("badgeEn") as string;
  const isLive = formData.get("isLive") === "true";
  const enrollUrl = formData.get("enrollUrl") as string;
  
  const mentorNameHi = formData.get("mentorNameHi") as string;
  const mentorNameEn = formData.get("mentorNameEn") as string;
  const mentorTitleHi = formData.get("mentorTitleHi") as string;
  const mentorTitleEn = formData.get("mentorTitleEn") as string;
  const mentorBioHi = formData.get("mentorBioHi") as string;
  const mentorBioEn = formData.get("mentorBioEn") as string;

  const price = formData.get("price") as string;
  const originalPrice = formData.get("originalPrice") as string;
  const durationHi = formData.get("durationHi") as string;
  const durationEn = formData.get("durationEn") as string;
  const lecturesCountHi = formData.get("lecturesCountHi") as string;
  const lecturesCountEn = formData.get("lecturesCountEn") as string;
  const studentsCountHi = formData.get("studentsCountHi") as string;
  const studentsCountEn = formData.get("studentsCountEn") as string;
  const rating = formData.get("rating") as string || "4.9";
  const descriptionHi = formData.get("descriptionHi") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const orderIndex = Number(formData.get("orderIndex") || 0);

  // Parsed Array Fields
  let whatYouLearnHi: string[] = [];
  let whatYouLearnEn: string[] = [];
  let highlightsHi: string[] = [];
  let highlightsEn: string[] = [];
  let syllabus: any[] = [];
  let features: any[] = [];
  let testimonials: any[] = [];

  try {
    whatYouLearnHi = JSON.parse((formData.get("whatYouLearnHi") as string) || "[]");
    whatYouLearnEn = JSON.parse((formData.get("whatYouLearnEn") as string) || "[]");
    highlightsHi = JSON.parse((formData.get("highlightsHi") as string) || "[]");
    highlightsEn = JSON.parse((formData.get("highlightsEn") as string) || "[]");
    syllabus = JSON.parse((formData.get("syllabus") as string) || "[]");
    features = JSON.parse((formData.get("features") as string) || "[]");
    testimonials = JSON.parse((formData.get("testimonials") as string) || "[]");
  } catch (e) {
    console.error("Error parsing online course array fields:", e);
  }

  const file = formData.get("image") as File | null;
  const mentorFile = formData.get("mentorImage") as File | null;

  if (!titleHi || !titleEn || !slug || !price) {
    return { success: false, error: "Title, Slug, and Price fields are required." };
  }

  try {
    const doc: any = {
      slug: { _type: "slug", current: slug },
      titleHi,
      titleEn,
      category,
      altHi,
      altEn,
      badgeHi,
      badgeEn,
      isLive,
      enrollUrl,
      mentorNameHi,
      mentorNameEn,
      mentorTitleHi,
      mentorTitleEn,
      mentorBioHi,
      mentorBioEn,
      price,
      originalPrice,
      durationHi,
      durationEn,
      lecturesCountHi,
      lecturesCountEn,
      studentsCountHi,
      studentsCountEn,
      rating,
      descriptionHi,
      descriptionEn,
      whatYouLearnHi,
      whatYouLearnEn,
      highlightsHi,
      highlightsEn,
      syllabus: syllabus.map((s: any, idx: number) => ({
        _key: s._key || `module-${idx}-${Date.now()}`,
        _type: "syllabusModule",
        titleHi: s.titleHi || "",
        titleEn: s.titleEn || "",
        topicsHi: s.topicsHi || [],
        topicsEn: s.topicsEn || [],
      })),
      features: features.map((f: any, idx: number) => ({
        _key: f._key || `feature-${idx}-${Date.now()}`,
        _type: "courseFeature",
        icon: f.icon || "",
        labelHi: f.labelHi || "",
        labelEn: f.labelEn || "",
        valueHi: f.valueHi || "",
        valueEn: f.valueEn || "",
      })),
      testimonials: testimonials.map((t: any, idx: number) => ({
        _key: t._key || `testimonial-${idx}-${Date.now()}`,
        _type: "courseTestimonial",
        nameHi: t.nameHi || "",
        nameEn: t.nameEn || "",
        examHi: t.examHi || "",
        examEn: t.examEn || "",
        textHi: t.textHi || "",
        textEn: t.textEn || "",
      })),
      orderIndex,
    };

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, {
        filename: file.name,
        contentType: file.type,
      });
      doc.image = {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      };
    }

    if (mentorFile && mentorFile.size > 0) {
      const buffer = Buffer.from(await mentorFile.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, {
        filename: mentorFile.name,
        contentType: mentorFile.type,
      });
      doc.mentorImage = {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      };
    }

    await client.patch(id).set(doc).commit();

    // Revalidate paths & tags
    updateTag("onlineCourses");
    revalidatePath("/online-courses");
    revalidatePath("/en/online-courses");
    revalidatePath(`/online-courses/${slug}`);
    revalidatePath(`/en/online-courses/${slug}`);
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error updating online course:", error);
    return { success: false, error: error.message || "Failed to update online course." };
  }
}

/**
 * Delete an online course.
 */
export async function deleteOnlineCourse(id: string) {
  await requireAdmin();
  const client = getSanityWriteClient();

  try {
    const courseDoc = await client.getDocument(id);
    const slug = courseDoc?.slug?.current;

    await client.delete(id);

    // Revalidate paths & tags
    updateTag("onlineCourses");
    revalidatePath("/online-courses");
    revalidatePath("/en/online-courses");
    if (slug) {
      revalidatePath(`/online-courses/${slug}`);
      revalidatePath(`/en/online-courses/${slug}`);
    }
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting online course:", error);
    return { success: false, error: error.message || "Failed to delete online course." };
  }
}

/**
 * Fetch all test series from Sanity for admin management.
 */
export async function getAdminTestSeriesList() {
  await requireAdmin();
  const client = getSanityWriteClient();

  const query = `*[_type == "testSeries"] | order(orderIndex asc, _createdAt desc) {
    "id": _id,
    "slug": slug.current,
    title,
    titleEn,
    description,
    descriptionEn,
    price,
    originalPrice,
    buyLink,
    active,
    features,
    featuresEn,
    badgeHi,
    badgeEn,
    orderIndex
  }`;

  try {
    const results = await client.fetch(query);
    return results || [];
  } catch (error) {
    console.error("Error fetching test series list in admin action:", error);
    return [];
  }
}

/**
 * Create a new test series.
 */
export async function createTestSeries(formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const title = formData.get("title") as string;
  const titleEn = formData.get("titleEn") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const price = formData.get("price") ? Number(formData.get("price")) : undefined;
  const originalPrice = formData.get("originalPrice") ? Number(formData.get("originalPrice")) : undefined;
  const buyLink = formData.get("buyLink") as string || undefined;
  const active = formData.get("active") === "true";
  const badgeHi = formData.get("badgeHi") as string || undefined;
  const badgeEn = formData.get("badgeEn") as string || undefined;
  const orderIndex = Number(formData.get("orderIndex") || 0);

  let features: string[] = [];
  let featuresEn: string[] = [];
  try {
    features = JSON.parse((formData.get("features") as string) || "[]");
    featuresEn = JSON.parse((formData.get("featuresEn") as string) || "[]");
  } catch (e) {
    console.error("Error parsing features lists:", e);
  }

  if (!title || !titleEn || !slug) {
    return { success: false, error: "Title (Hindi & English) and Slug are required." };
  }

  try {
    const doc: any = {
      _type: "testSeries",
      slug: { _type: "slug", current: slug },
      title,
      titleEn,
      description,
      descriptionEn,
      active,
      features,
      featuresEn,
      orderIndex,
    };

    if (price !== undefined) doc.price = price;
    if (originalPrice !== undefined) doc.originalPrice = originalPrice;
    if (buyLink !== undefined) doc.buyLink = buyLink;
    if (badgeHi !== undefined) doc.badgeHi = badgeHi;
    if (badgeEn !== undefined) doc.badgeEn = badgeEn;

    await client.create(doc);

    // Revalidate paths & tags
    updateTag("testSeries");
    revalidatePath("/test-series");
    revalidatePath("/en/test-series");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error creating test series:", error);
    return { success: false, error: error.message || "Failed to create test series." };
  }
}

/**
 * Update an existing test series.
 */
export async function updateTestSeries(id: string, formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const title = formData.get("title") as string;
  const titleEn = formData.get("titleEn") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const price = formData.get("price") ? Number(formData.get("price")) : null;
  const originalPrice = formData.get("originalPrice") ? Number(formData.get("originalPrice")) : null;
  const buyLink = formData.get("buyLink") as string || "";
  const active = formData.get("active") === "true";
  const badgeHi = formData.get("badgeHi") as string || "";
  const badgeEn = formData.get("badgeEn") as string || "";
  const orderIndex = Number(formData.get("orderIndex") || 0);

  let features: string[] = [];
  let featuresEn: string[] = [];
  try {
    features = JSON.parse((formData.get("features") as string) || "[]");
    featuresEn = JSON.parse((formData.get("featuresEn") as string) || "[]");
  } catch (e) {
    console.error("Error parsing features lists:", e);
  }

  if (!title || !titleEn || !slug) {
    return { success: false, error: "Title (Hindi & English) and Slug are required." };
  }

  try {
    const doc: any = {
      slug: { _type: "slug", current: slug },
      title,
      titleEn,
      description,
      descriptionEn,
      active,
      features,
      featuresEn,
      orderIndex,
    };

    if (price !== null) doc.price = price;
    if (originalPrice !== null) doc.originalPrice = originalPrice;
    doc.buyLink = buyLink;
    doc.badgeHi = badgeHi;
    doc.badgeEn = badgeEn;

    await client.patch(id).set(doc).commit();

    // Revalidate paths & tags
    updateTag("testSeries");
    revalidatePath("/test-series");
    revalidatePath("/en/test-series");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error updating test series:", error);
    return { success: false, error: error.message || "Failed to update test series." };
  }
}

/**
 * Delete a test series.
 */
export async function deleteTestSeries(id: string) {
  await requireAdmin();
  const client = getSanityWriteClient();

  try {
    await client.delete(id);

    // Revalidate paths & tags
    updateTag("testSeries");
    revalidatePath("/test-series");
    revalidatePath("/en/test-series");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting test series:", error);
    return { success: false, error: error.message || "Failed to delete test series." };
  }
}

/**
 * Fetch all test schedules for admin.
 */
export async function getAdminTestSchedulesList(): Promise<TestSchedule[]> {
  await requireAdmin();
  const client = getSanityWriteClient();

  const query = `*[_type == "testSchedule" && !(_id in path("drafts.**"))] | order(orderIndex asc, date desc){
    "id": _id,
    date,
    code,
    titleHi,
    titleEn,
    focusHi,
    focusEn,
    orderIndex
  }`;

  try {
    const results = await client.fetch<any[]>(query);
    return (results || []).map((r) => ({
      id: r.id,
      date: r.date || "",
      code: r.code || "",
      titleHi: r.titleHi || "",
      titleEn: r.titleEn || "",
      focusHi: r.focusHi || "",
      focusEn: r.focusEn || "",
      orderIndex: r.orderIndex || 0,
    }));
  } catch (error) {
    console.error("Error fetching admin test schedules list:", error);
    return [];
  }
}

/**
 * Create a new test schedule.
 */
export async function createTestSchedule(formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const date = formData.get("date") as string;
  const code = formData.get("code") as string;
  const titleHi = formData.get("titleHi") as string;
  const titleEn = formData.get("titleEn") as string;
  const focusHi = formData.get("focusHi") as string;
  const focusEn = formData.get("focusEn") as string;
  const orderIndex = Number(formData.get("orderIndex") || 0);

  if (!date || !code || !titleHi || !titleEn) {
    return { success: false, error: "Date, code, and title (both Hindi and English) are required." };
  }

  try {
    const doc = {
      _type: "testSchedule",
      date,
      code,
      titleHi,
      titleEn,
      focusHi,
      focusEn,
      orderIndex,
    };

    await client.create(doc);

    // Revalidate paths & tags
    updateTag("testSchedules");
    revalidatePath("/test-series");
    revalidatePath("/en/test-series");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error creating test schedule:", error);
    return { success: false, error: error.message || "Failed to create test schedule." };
  }
}

/**
 * Update an existing test schedule.
 */
export async function updateTestSchedule(id: string, formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const date = formData.get("date") as string;
  const code = formData.get("code") as string;
  const titleHi = formData.get("titleHi") as string;
  const titleEn = formData.get("titleEn") as string;
  const focusHi = formData.get("focusHi") as string;
  const focusEn = formData.get("focusEn") as string;
  const orderIndex = Number(formData.get("orderIndex") || 0);

  if (!date || !code || !titleHi || !titleEn) {
    return { success: false, error: "Date, code, and title (both Hindi and English) are required." };
  }

  try {
    const doc: any = {
      date,
      code,
      titleHi,
      titleEn,
      focusHi,
      focusEn,
      orderIndex,
    };

    await client.patch(id).set(doc).commit();

    // Revalidate paths & tags
    updateTag("testSchedules");
    revalidatePath("/test-series");
    revalidatePath("/en/test-series");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error updating test schedule:", error);
    return { success: false, error: error.message || "Failed to update test schedule." };
  }
}

/**
 * Delete a test schedule.
 */
export async function deleteTestSchedule(id: string) {
  await requireAdmin();
  const client = getSanityWriteClient();

  try {
    await client.delete(id);

    // Revalidate paths & tags
    updateTag("testSchedules");
    revalidatePath("/test-series");
    revalidatePath("/en/test-series");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting test schedule:", error);
    return { success: false, error: error.message || "Failed to delete test schedule." };
  }
}

/**
 * Fetch all toppers for admin panel management.
 */
export async function getAdminToppersList(): Promise<Topper[]> {
  await requireAdmin();
  const client = getSanityWriteClient();

  const query = `*[_type == "topper"] | order(orderIndex asc, rank asc){
    "id": _id,
    nameHi,
    nameEn,
    rank,
    exam,
    year,
    postHi,
    postEn,
    "avatar": avatar.asset->url,
    quoteHi,
    quoteEn,
    rollNo,
    isRanker,
    orderIndex
  }`;

  try {
    const results = await client.fetch(query);
    return (results || []).map((r: any) => ({
      id: r.id,
      name: r.nameHi || "",
      nameEn: r.nameEn || "",
      rank: r.rank || 0,
      exam: r.exam || "MPPSC",
      year: r.year || new Date().getFullYear(),
      post: r.postHi || "",
      postEn: r.postEn || "",
      avatar: r.avatar || "",
      quote: r.quoteHi || undefined,
      quoteEn: r.quoteEn || undefined,
      rollNo: r.rollNo || undefined,
      isRanker: !!r.isRanker,
      orderIndex: r.orderIndex || 0,
    }));
  } catch (error) {
    console.error("Error fetching toppers list in admin action:", error);
    return [];
  }
}

/**
 * Create a new topper document in Sanity.
 */
export async function createTopper(formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const nameHi = formData.get("nameHi") as string;
  const nameEn = formData.get("nameEn") as string;
  const rank = Number(formData.get("rank") || 0);
  const exam = formData.get("exam") as "UPSC" | "MPPSC";
  const year = Number(formData.get("year") || new Date().getFullYear());
  const postHi = formData.get("postHi") as string;
  const postEn = formData.get("postEn") as string;
  const quoteHi = formData.get("quoteHi") as string;
  const quoteEn = formData.get("quoteEn") as string;
  const rollNo = formData.get("rollNo") as string;
  const isRanker = formData.get("isRanker") === "true";
  const orderIndex = Number(formData.get("orderIndex") || 0);
  const file = formData.get("avatar") as File | null;

  if (!nameHi || !nameEn || !postHi || !postEn || !rank || !year) {
    return { success: false, error: "Name, Rank, Year, and Post are required in both Hindi and English." };
  }

  try {
    const doc: any = {
      _type: "topper",
      nameHi,
      nameEn,
      rank,
      exam,
      year,
      postHi,
      postEn,
      quoteHi,
      quoteEn,
      rollNo,
      isRanker,
      orderIndex,
    };

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, {
        filename: file.name,
        contentType: file.type,
      });
      doc.avatar = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      };
    }

    await client.create(doc);

    updateTag("toppers");
    revalidatePath("/selections");
    revalidatePath("/en/selections");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error creating topper:", error);
    return { success: false, error: error.message || "Failed to create topper." };
  }
}

/**
 * Update an existing topper document in Sanity.
 */
export async function updateTopper(id: string, formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const nameHi = formData.get("nameHi") as string;
  const nameEn = formData.get("nameEn") as string;
  const rank = Number(formData.get("rank") || 0);
  const exam = formData.get("exam") as "UPSC" | "MPPSC";
  const year = Number(formData.get("year") || new Date().getFullYear());
  const postHi = formData.get("postHi") as string;
  const postEn = formData.get("postEn") as string;
  const quoteHi = formData.get("quoteHi") as string;
  const quoteEn = formData.get("quoteEn") as string;
  const rollNo = formData.get("rollNo") as string;
  const isRanker = formData.get("isRanker") === "true";
  const orderIndex = Number(formData.get("orderIndex") || 0);
  const file = formData.get("avatar") as File | null;
  const removeAvatar = formData.get("removeAvatar") === "true";

  if (!nameHi || !nameEn || !postHi || !postEn || !rank || !year) {
    return { success: false, error: "Name, Rank, Year, and Post are required in both Hindi and English." };
  }

  try {
    const mutations: any = {
      nameHi,
      nameEn,
      rank,
      exam,
      year,
      postHi,
      postEn,
      quoteHi,
      quoteEn,
      rollNo,
      isRanker,
      orderIndex,
    };

    if (removeAvatar) {
      mutations.avatar = null;
    } else if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, {
        filename: file.name,
        contentType: file.type,
      });
      mutations.avatar = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      };
    }

    await client.patch(id).set(mutations).commit();

    updateTag("toppers");
    revalidatePath("/selections");
    revalidatePath("/en/selections");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error updating topper:", error);
    return { success: false, error: error.message || "Failed to update topper." };
  }
}

/**
 * Delete a topper document in Sanity.
 */
export async function deleteTopper(id: string) {
  await requireAdmin();
  const client = getSanityWriteClient();

  try {
    await client.delete(id);

    updateTag("toppers");
    revalidatePath("/selections");
    revalidatePath("/en/selections");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting topper:", error);
    return { success: false, error: error.message || "Failed to delete topper." };
  }
}

/**
 * Fetch all publications from Sanity for admin management.
 */
export async function getAdminPublicationsList() {
  await requireAdmin();
  const client = getSanityWriteClient();

  const query = `*[_type == "publication"] | order(_createdAt desc) {
    "id": _id,
    "slug": slug.current,
    title,
    titleEn,
    description,
    descriptionEn,
    price,
    originalPrice,
    rating,
    reviewsCount,
    edition,
    badge,
    pages,
    medium,
    features,
    featuresEn,
    toc,
    tocEn,
    authorDetails,
    authorDetailsEn,
    soldOut,
    "coverImage": coverImage.asset->url,
    buyLink
  }`;

  try {
    const results = await client.fetch(query);
    return results || [];
  } catch (error) {
    console.error("Error fetching publications list in admin action:", error);
    return [];
  }
}

/**
 * Create a new publication.
 */
export async function createPublication(formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const title = formData.get("title") as string;
  const titleEn = formData.get("titleEn") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const price = formData.get("price") ? Number(formData.get("price")) : undefined;
  const originalPrice = formData.get("originalPrice") ? Number(formData.get("originalPrice")) : undefined;
  const rating = formData.get("rating") ? Number(formData.get("rating")) : undefined;
  const reviewsCount = formData.get("reviewsCount") ? Number(formData.get("reviewsCount")) : undefined;
  const edition = formData.get("edition") as string || undefined;
  const badge = formData.get("badge") as string || undefined;
  const pages = formData.get("pages") as string || undefined;
  const medium = formData.get("medium") as string || undefined;
  
  const parseArrayField = (key: string): string[] | undefined => {
    const raw = formData.get(key);
    if (!raw) return undefined;
    try {
      return JSON.parse(raw as string);
    } catch {
      return (raw as string).split("\n").map(s => s.trim()).filter(Boolean);
    }
  };

  const features = parseArrayField("features");
  const featuresEn = parseArrayField("featuresEn");
  const toc = parseArrayField("toc");
  const tocEn = parseArrayField("tocEn");
  const authorDetails = formData.get("authorDetails") as string || undefined;
  const authorDetailsEn = formData.get("authorDetailsEn") as string || undefined;

  const buyLink = formData.get("buyLink") as string || undefined;
  const soldOut = formData.get("soldOut") === "true";
  const file = formData.get("coverImage") as File;

  if (!title || !titleEn || !slug) {
    return { success: false, error: "Title (Hindi & English) and Slug are required." };
  }

  try {
    const doc: any = {
      _type: "publication",
      slug: { _type: "slug", current: slug },
      title,
      titleEn,
      description,
      descriptionEn,
    };

    if (price !== undefined) doc.price = price;
    if (originalPrice !== undefined) doc.originalPrice = originalPrice;
    if (rating !== undefined) doc.rating = rating;
    if (reviewsCount !== undefined) doc.reviewsCount = reviewsCount;
    if (edition !== undefined) doc.edition = edition;
    if (badge !== undefined) doc.badge = badge;
    if (pages !== undefined) doc.pages = pages;
    if (medium !== undefined) doc.medium = medium;
    if (features !== undefined) doc.features = features;
    if (featuresEn !== undefined) doc.featuresEn = featuresEn;
    if (toc !== undefined) doc.toc = toc;
    if (tocEn !== undefined) doc.tocEn = tocEn;
    if (authorDetails !== undefined) doc.authorDetails = authorDetails;
    if (authorDetailsEn !== undefined) doc.authorDetailsEn = authorDetailsEn;
    doc.soldOut = soldOut;
    if (buyLink !== undefined) doc.buyLink = buyLink;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, {
        filename: file.name,
        contentType: file.type,
      });
      doc.coverImage = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      };
    }

    await client.create(doc);

    // Revalidate paths & tags
    updateTag("publications");
    revalidatePath("/publications");
    revalidatePath("/en/publications");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error creating publication:", error);
    return { success: false, error: error.message || "Failed to create publication." };
  }
}

/**
 * Update an existing publication.
 */
export async function updatePublication(id: string, formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const title = formData.get("title") as string;
  const titleEn = formData.get("titleEn") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const price = formData.get("price") ? Number(formData.get("price")) : null;
  const originalPrice = formData.get("originalPrice") ? Number(formData.get("originalPrice")) : null;
  const rating = formData.get("rating") ? Number(formData.get("rating")) : null;
  const reviewsCount = formData.get("reviewsCount") ? Number(formData.get("reviewsCount")) : null;
  const edition = formData.get("edition") as string || "";
  const badge = formData.get("badge") as string || "";
  const pages = formData.get("pages") as string || "";
  const medium = formData.get("medium") as string || "";
  
  const parseArrayField = (key: string): string[] | undefined => {
    const raw = formData.get(key);
    if (!raw) return undefined;
    try {
      return JSON.parse(raw as string);
    } catch {
      return (raw as string).split("\n").map(s => s.trim()).filter(Boolean);
    }
  };

  const features = parseArrayField("features");
  const featuresEn = parseArrayField("featuresEn");
  const toc = parseArrayField("toc");
  const tocEn = parseArrayField("tocEn");
  const authorDetails = formData.get("authorDetails") as string || "";
  const authorDetailsEn = formData.get("authorDetailsEn") as string || "";

  const buyLink = formData.get("buyLink") as string || "";
  const soldOut = formData.get("soldOut") === "true";
  const file = formData.get("coverImage") as File;

  if (!title || !titleEn || !slug) {
    return { success: false, error: "Title (Hindi & English) and Slug are required." };
  }

  try {
    const doc: any = {
      slug: { _type: "slug", current: slug },
      title,
      titleEn,
      description,
      descriptionEn,
    };

    if (price !== null) doc.price = price;
    if (originalPrice !== null) doc.originalPrice = originalPrice;
    if (rating !== null) doc.rating = rating;
    if (reviewsCount !== null) doc.reviewsCount = reviewsCount;
    doc.edition = edition;
    doc.badge = badge;
    doc.pages = pages;
    doc.medium = medium;
    if (features !== undefined) doc.features = features;
    if (featuresEn !== undefined) doc.featuresEn = featuresEn;
    if (toc !== undefined) doc.toc = toc;
    if (tocEn !== undefined) doc.tocEn = tocEn;
    doc.authorDetails = authorDetails;
    doc.authorDetailsEn = authorDetailsEn;
    doc.soldOut = soldOut;
    doc.buyLink = buyLink;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, {
        filename: file.name,
        contentType: file.type,
      });
      doc.coverImage = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      };
    }

    await client.patch(id).set(doc).commit();

    // Revalidate paths & tags
    updateTag("publications");
    revalidatePath("/publications");
    revalidatePath("/en/publications");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error updating publication:", error);
    return { success: false, error: error.message || "Failed to update publication." };
  }
}

/**
 * Delete a publication.
 */
export async function deletePublication(id: string) {
  await requireAdmin();
  const client = getSanityWriteClient();

  try {
    await client.delete(id);

    // Revalidate paths & tags
    updateTag("publications");
    revalidatePath("/publications");
    revalidatePath("/en/publications");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting publication:", error);
    return { success: false, error: error.message || "Failed to delete publication." };
  }
}

/**
 * Fetch all home notices for admin management.
 */
export async function getAdminHomeNoticesList() {
  await requireAdmin();
  const client = getSanityWriteClient();

  const query = `*[_type == "homeNotice"] | order(orderIndex asc, _createdAt desc) {
    "id": _id,
    noticeTextHi,
    noticeTextEn,
    noticeLink,
    isActive,
    orderIndex
  }`;

  try {
    const results = await client.fetch(query);
    return results || [];
  } catch (error) {
    console.error("Error fetching home notices list in admin action:", error);
    return [];
  }
}

/**
 * Create a new home notice.
 */
export async function createHomeNotice(formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const noticeTextHi = formData.get("noticeTextHi") as string;
  const noticeTextEn = formData.get("noticeTextEn") as string;
  const noticeLink = formData.get("noticeLink") as string || "";
  const isActive = formData.get("isActive") === "true";
  const orderIndex = Number(formData.get("orderIndex") || 0);

  if (!noticeTextHi || !noticeTextEn) {
    return { success: false, error: "Notice Text is required in both Hindi and English." };
  }

  try {
    const doc = {
      _type: "homeNotice",
      noticeTextHi,
      noticeTextEn,
      noticeLink,
      isActive,
      orderIndex,
    };

    await client.create(doc);

    // Revalidate paths & tags
    updateTag("homeNotices");
    revalidatePath("/");
    revalidatePath("/en");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error creating home notice:", error);
    return { success: false, error: error.message || "Failed to create home notice." };
  }
}

/**
 * Update an existing home notice.
 */
export async function updateHomeNotice(id: string, formData: FormData) {
  await requireAdmin();
  const client = getSanityWriteClient();

  const noticeTextHi = formData.get("noticeTextHi") as string;
  const noticeTextEn = formData.get("noticeTextEn") as string;
  const noticeLink = formData.get("noticeLink") as string || "";
  const isActive = formData.get("isActive") === "true";
  const orderIndex = Number(formData.get("orderIndex") || 0);

  if (!noticeTextHi || !noticeTextEn) {
    return { success: false, error: "Notice Text is required in both Hindi and English." };
  }

  try {
    const doc = {
      noticeTextHi,
      noticeTextEn,
      noticeLink,
      isActive,
      orderIndex,
    };

    await client.patch(id).set(doc).commit();

    // Revalidate paths & tags
    updateTag("homeNotices");
    revalidatePath("/");
    revalidatePath("/en");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error updating home notice:", error);
    return { success: false, error: error.message || "Failed to update home notice." };
  }
}

/**
 * Delete a home notice.
 */
export async function deleteHomeNotice(id: string) {
  await requireAdmin();
  const client = getSanityWriteClient();

  try {
    await client.delete(id);

    // Revalidate paths & tags
    updateTag("homeNotices");
    revalidatePath("/");
    revalidatePath("/en");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting home notice:", error);
    return { success: false, error: error.message || "Failed to delete home notice." };
  }
}
