"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Contact form submit — Phase 2 Server Action.
 *
 * When Supabase is configured: persists to `contact_messages`.
 * Graceful degradation: logs when Supabase is not configured.
 */

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
  locale: z.enum(["hi", "en"]).default("hi"),
});

export type ContactInput = z.input<typeof schema>;

export async function submitContact(
  input: ContactInput,
): Promise<{ success: boolean; message?: string }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message };
  }
  const { name, email, phone, subject, message, locale } = parsed.data;

  // Get user agent for spam analysis (server-side only)
  let userAgent: string | null = null;
  try {
    const hdrs = await headers();
    userAgent = hdrs.get("user-agent");
  } catch {
    // headers() not available in some edge contexts
  }

  const supabase = getSupabaseServerClient();

  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone: phone ?? null,
      subject: subject ?? null,
      message,
      locale,
      user_agent: userAgent,
      status: "new",
    });

    if (error) {
      console.error("[contact] Supabase error:", error.message);
      return {
        success: false,
        message:
          locale === "hi"
            ? "कुछ गड़बड़ हो गई। कृपया पुनः प्रयास करें।"
            : "Something went wrong. Please try again.",
      };
    }

    console.info(`[contact] Message saved: ${name} <${email}>`);
  } else {
    console.info(
      `[contact] Supabase not configured. name=${name} email=${email} subject=${subject}`,
    );
  }

  return {
    success: true,
    message:
      locale === "hi"
        ? "धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।"
        : "Thank you! We'll get back to you soon.",
  };
}

export interface InquiryInput {
  name: string;
  mobile: string;
  city?: string;
  email?: string;
  exam: string;
  batch: string;
  mode: string;
  medium: string;
  interests: string[];
  locale?: "hi" | "en";
}

export async function submitInquiry(
  input: InquiryInput
): Promise<{ success: boolean; message?: string }> {
  // Validate basic inputs
  if (!input.name.trim() || input.name.trim().length < 2) {
    return { success: false, message: "Name must be at least 2 characters." };
  }
  const mobileRegex = /^[0-9]{10}$/;
  if (!input.mobile.trim() || !mobileRegex.test(input.mobile.trim())) {
    return { success: false, message: "Please enter a valid 10-digit mobile number." };
  }

  // Construct fallback email if not provided
  const emailAddress = input.email?.trim() || `${input.mobile.trim()}@inquiry.aakarias.com`;
  
  // Format message body
  const messageBody = [
    `City: ${input.city?.trim() || "Not Specified"}`,
    `Exam: ${input.exam}`,
    `Batch: ${input.batch}`,
    `Mode: ${input.mode}`,
    `Medium: ${input.medium}`,
    `Interests: ${input.interests.length > 0 ? input.interests.join(", ") : "None"}`
  ].join("\n");

  const subjectLine = `Inquiry Popup: ${input.exam} (${input.batch})`;

  // Get user agent
  let userAgent: string | null = null;
  try {
    const hdrs = await headers();
    userAgent = hdrs.get("user-agent");
  } catch {
    // ignore
  }

  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name: input.name.trim(),
      email: emailAddress,
      phone: input.mobile.trim(),
      subject: subjectLine,
      message: messageBody,
      locale: input.locale || "en",
      user_agent: userAgent,
      status: "new",
    });

    if (error) {
      console.error("[inquiry] Supabase error:", error.message);
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  } else {
    console.info(
      `[inquiry] Supabase not configured. name=${input.name} phone=${input.mobile} message=${messageBody}`
    );
  }

  return {
    success: true,
    message: "Thank you! Your inquiry has been submitted successfully.",
  };
}

export interface OfflineEnquiryInput {
  name: string;
  phone: string;
  batchTitle: string;
  locale?: "hi" | "en";
}

export async function submitOfflineEnquiry(
  input: OfflineEnquiryInput
): Promise<{ success: boolean; message?: string }> {
  // Validate name
  if (!input.name.trim() || input.name.trim().length < 2) {
    return { 
      success: false, 
      message: input.locale === "hi" ? "नाम कम से कम 2 अक्षरों का होना चाहिए।" : "Name must be at least 2 characters." 
    };
  }

  // Validate phone (10-digit mobile number)
  const mobileRegex = /^[0-9]{10}$/;
  if (!input.phone.trim() || !mobileRegex.test(input.phone.trim())) {
    return { 
      success: false, 
      message: input.locale === "hi" ? "कृपया 10-अंकों का मान्य मोबाइल नंबर दर्ज करें।" : "Please enter a valid 10-digit mobile number." 
    };
  }

  // Construct fallback email for NOT NULL constraint
  const emailAddress = `${input.phone.trim()}@offline-enquiry.aakarias.com`;

  // Construct message details
  const messageBody = `Batch: ${input.batchTitle}\nSource: Offline Course Card`;

  // Subject line used to identify this lead type in the admin panel
  const subjectLine = `Offline Batch Enquiry: ${input.batchTitle}`;

  // Get user agent
  let userAgent: string | null = null;
  try {
    const hdrs = await headers();
    userAgent = hdrs.get("user-agent");
  } catch {
    // ignore
  }

  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name: input.name.trim(),
      email: emailAddress,
      phone: input.phone.trim(),
      subject: subjectLine,
      message: messageBody,
      locale: input.locale || "en",
      user_agent: userAgent,
      status: "new",
    });

    if (error) {
      console.error("[offline-enquiry] Supabase error:", error.message);
      return {
        success: false,
        message: input.locale === "hi" 
          ? "कुछ गड़बड़ हो गई। कृपया पुनः प्रयास करें।" 
          : "Something went wrong. Please try again.",
      };
    }
  } else {
    console.info(
      `[offline-enquiry] Supabase not configured. name=${input.name} phone=${input.phone} batch=${input.batchTitle}`
    );
  }

  return {
    success: true,
    message: input.locale === "hi" 
      ? "पूछताछ दर्ज कर ली गई है! हम जल्द ही आपसे संपर्क करेंगे।" 
      : "Thank you! Your enquiry has been submitted successfully.",
  };
}

/* ─── Online Enrollment Lead ─────────────────────────────────── */

export interface OnlineEnrollmentInput {
  name: string;
  phone: string;
  courseTitle: string;
  locale?: "hi" | "en";
}

export async function submitOnlineEnrollmentLead(
  input: OnlineEnrollmentInput
): Promise<{ success: boolean; message?: string }> {
  // Validate name
  if (!input.name.trim() || input.name.trim().length < 2) {
    return {
      success: false,
      message: input.locale === "hi" ? "नाम कम से कम 2 अक्षरों का होना चाहिए।" : "Name must be at least 2 characters.",
    };
  }

  // Validate phone (10-digit mobile number)
  const mobileRegex = /^[0-9]{10}$/;
  if (!input.phone.trim() || !mobileRegex.test(input.phone.trim())) {
    return {
      success: false,
      message: input.locale === "hi" ? "कृपया 10-अंकों का मान्य मोबाइल नंबर दर्ज करें।" : "Please enter a valid 10-digit mobile number.",
    };
  }

  // Construct fallback email for NOT NULL constraint
  const emailAddress = `${input.phone.trim()}@online-enrollment.aakarias.com`;

  // Construct message details
  const messageBody = `Course: ${input.courseTitle}\nSource: Online Course Detail Page`;

  // Subject line used to identify this lead type in the admin panel
  const subjectLine = `Online Enrollment Lead: ${input.courseTitle}`;

  // Get user agent
  let userAgent: string | null = null;
  try {
    const hdrs = await headers();
    userAgent = hdrs.get("user-agent");
  } catch {
    // ignore
  }

  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name: input.name.trim(),
      email: emailAddress,
      phone: input.phone.trim(),
      subject: subjectLine,
      message: messageBody,
      locale: input.locale || "en",
      user_agent: userAgent,
      status: "new",
    });

    if (error) {
      console.error("[online-enrollment] Supabase error:", error.message);
      return {
        success: false,
        message: input.locale === "hi"
          ? "कुछ गड़बड़ हो गई। कृपया पुनः प्रयास करें।"
          : "Something went wrong. Please try again.",
      };
    }
  } else {
    console.info(
      `[online-enrollment] Supabase not configured. name=${input.name} phone=${input.phone} course=${input.courseTitle}`
    );
  }

  return {
    success: true,
    message: input.locale === "hi"
      ? "आपकी जानकारी दर्ज कर ली गई है! कोर्स पेज खुल रहा है..."
      : "Your details have been saved! Redirecting to course page...",
  };
}

export async function logWhatsAppClick(
  pageUrl: string,
  targetUrl: string,
  locale: "hi" | "en" = "hi"
): Promise<{ success: boolean }> {
  let userAgent: string | null = null;
  try {
    const hdrs = await headers();
    userAgent = hdrs.get("user-agent");
  } catch {
    // ignore
  }

  let path = "Unknown Page";
  try {
    path = new URL(pageUrl).pathname;
  } catch {
    path = pageUrl;
  }

  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name: "WhatsApp Click User",
      email: `whatsapp_${Date.now()}@inquiry.aakarias.com`,
      phone: null,
      subject: `WhatsApp Lead: Clicked on ${path}`,
      message: `User clicked the WhatsApp connection link on page.\n\n- Page URL: ${pageUrl}\n- Destination WhatsApp Link: ${targetUrl}`,
      locale,
      user_agent: userAgent,
      status: "new",
    });
    if (error) {
      console.error("[whatsapp-click-lead] Supabase error:", error.message);
    }
  } else {
    console.info(`[whatsapp-click-lead] Supabase not configured. pageUrl=${pageUrl} targetUrl=${targetUrl}`);
  }

  return { success: true };
}

export async function submitWhatsAppLead(input: {
  phone: string;
  pageUrl: string;
  targetUrl: string;
  locale?: "hi" | "en";
}): Promise<{ success: boolean; message?: string }> {
  // Validate basic input
  const mobileRegex = /^[0-9]{10}$/;
  if (!input.phone.trim() || !mobileRegex.test(input.phone.trim())) {
    return {
      success: false,
      message:
        input.locale === "hi"
          ? "कृपया 10-अंकों का मान्य मोबाइल नंबर दर्ज करें।"
          : "Please enter a valid 10-digit mobile number.",
    };
  }

  const phone = input.phone.trim();
  const locale = input.locale || "hi";
  let path = "Unknown Page";
  try {
    path = new URL(input.pageUrl).pathname;
  } catch {
    path = input.pageUrl;
  }

  const source = `whatsapp_popup_${path.replace(/^\/+|\/+$/g, "") || "home"}`;

  // Get user agent
  let userAgent: string | null = null;
  try {
    const hdrs = await headers();
    userAgent = hdrs.get("user-agent");
  } catch {
    // ignore
  }

  const supabase = getSupabaseServerClient();
  if (supabase) {
    // 1. Save to whatsapp_subscribers
    const { error: subError } = await supabase.from("whatsapp_subscribers").upsert(
      {
        phone,
        locale,
        source,
        active: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "phone" }
    );

    if (subError) {
      console.error("[whatsapp-lead-sub] Supabase error:", subError.message);
    }

    // 2. Save to contact_messages
    const { error: msgError } = await supabase.from("contact_messages").insert({
      name: "WhatsApp Popup Lead",
      email: `${phone}@inquiry.aakarias.com`,
      phone,
      subject: `WhatsApp Lead: Connected from ${path}`,
      message: `User entered their WhatsApp number to initiate chat.\n\n- Phone: ${phone}\n- Page URL: ${input.pageUrl}\n- Destination WhatsApp Link: ${input.targetUrl}`,
      locale,
      user_agent: userAgent,
      status: "new",
    });

    if (msgError) {
      console.error("[whatsapp-lead-msg] Supabase error:", msgError.message);
    }
  } else {
    console.info(`[whatsapp-lead] Supabase not configured. phone=${phone} pageUrl=${input.pageUrl} targetUrl=${input.targetUrl}`);
  }

  return { success: true };
}



