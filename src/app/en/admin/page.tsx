import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { 
  getAdminMetrics, 
  getSubscribersList, 
  getContactMessages, 
  getDownloadsAnalytics, 
  getStudentProfiles,
  getStaticPagesList,
  getFacultiesList,
  getOfflineBatchesList,
  getOnlineCoursesList,
  getAdminTestSeriesList,
  getAdminTestSchedulesList
} from "@/actions/admin";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { redirect } from "next/navigation";
import { isAdmin } from "@/actions/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Admin Control Panel | Aakar IAS",
  description: "Aakar IAS Admin Panel - System metrics, user logs, and CMS configuration.",
  path: "/en/admin",
});

export default async function EnglishAdminPage() {
  let isAuthorized = false;
  try {
    isAuthorized = await isAdmin();
  } catch (err) {
    console.error("[EnglishAdminPage] Auth check failed:", err);
    if (process.env.NODE_ENV === "development") {
      isAuthorized = true;
    }
  }

  if (!isAuthorized && process.env.NODE_ENV !== "development") {
    redirect("/en/login");
  }

  // Gracefully fetch all admin data with fallbacks so page NEVER crashes
  const [
    metrics,
    subscribers,
    messages,
    downloads,
    students,
    staticPages,
    faculties,
    offlineBatches,
    onlineCourses,
    testSeries,
    testSchedules
  ] = await Promise.all([
    getAdminMetrics().catch((err) => {
      console.error("[EnglishAdminPage] getAdminMetrics error:", err);
      return { subscribersCount: 0, whatsappCount: 0, messagesCount: 0, downloadsCount: 0, studentsCount: 0 };
    }),
    getSubscribersList().catch((err) => { console.error("[EnglishAdminPage] getSubscribersList error:", err); return []; }),
    getContactMessages().catch((err) => { console.error("[EnglishAdminPage] getContactMessages error:", err); return []; }),
    getDownloadsAnalytics().catch((err) => { console.error("[EnglishAdminPage] getDownloadsAnalytics error:", err); return []; }),
    getStudentProfiles().catch((err) => { console.error("[EnglishAdminPage] getStudentProfiles error:", err); return []; }),
    getStaticPagesList().catch((err) => { console.error("[EnglishAdminPage] getStaticPagesList error:", err); return []; }),
    getFacultiesList().catch((err) => { console.error("[EnglishAdminPage] getFacultiesList error:", err); return []; }),
    getOfflineBatchesList().catch((err) => { console.error("[EnglishAdminPage] getOfflineBatchesList error:", err); return []; }),
    getOnlineCoursesList().catch((err) => { console.error("[EnglishAdminPage] getOnlineCoursesList error:", err); return []; }),
    getAdminTestSeriesList().catch((err) => { console.error("[EnglishAdminPage] getAdminTestSeriesList error:", err); return []; }),
    getAdminTestSchedulesList().catch((err) => { console.error("[EnglishAdminPage] getAdminTestSchedulesList error:", err); return []; }),
  ]);

  return (
    <AdminDashboard
      metrics={metrics}
      subscribers={subscribers}
      messages={messages}
      downloads={downloads}
      students={students}
      staticPages={staticPages}
      faculties={faculties}
      offlineBatches={offlineBatches}
      onlineCourses={onlineCourses}
      testSeries={testSeries}
      testSchedules={testSchedules}
    />
  );
}
