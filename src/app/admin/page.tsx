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
  getAdminTestSchedulesList,
  getAdminToppersList,
  getAdminPublicationsList,
  getAdminHomeNoticesList
} from "@/actions/admin";
import { getDailyQuizzesAction, getSubjectQuizzesAction } from "@/actions/current-affairs";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { redirect } from "next/navigation";
import { isAdmin } from "@/actions/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "एडमिन कंट्रोल पैनल | Aakar IAS",
  description: "Aakar IAS Admin Panel - System metrics, user logs, and CMS configuration.",
  path: "/admin",
});

export default async function AdminPage() {
  let isAuthorized = false;
  try {
    isAuthorized = await isAdmin();
  } catch (err) {
    console.error("[AdminPage] Auth check failed:", err);
    if (process.env.NODE_ENV === "development") {
      isAuthorized = true;
    }
  }

  if (!isAuthorized && process.env.NODE_ENV !== "development") {
    redirect("/login");
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
    testSchedules,
    toppers,
    dailyQuizzes,
    subjectQuizzes,
    publications,
    notices
  ] = await Promise.all([
    getAdminMetrics().catch((err) => {
      console.error("[AdminPage] getAdminMetrics error:", err);
      return { subscribersCount: 0, whatsappCount: 0, messagesCount: 0, downloadsCount: 0, studentsCount: 0 };
    }),
    getSubscribersList().catch((err) => { console.error("[AdminPage] getSubscribersList error:", err); return []; }),
    getContactMessages().catch((err) => { console.error("[AdminPage] getContactMessages error:", err); return []; }),
    getDownloadsAnalytics().catch((err) => { console.error("[AdminPage] getDownloadsAnalytics error:", err); return []; }),
    getStudentProfiles().catch((err) => { console.error("[AdminPage] getStudentProfiles error:", err); return []; }),
    getStaticPagesList().catch((err) => { console.error("[AdminPage] getStaticPagesList error:", err); return []; }),
    getFacultiesList().catch((err) => { console.error("[AdminPage] getFacultiesList error:", err); return []; }),
    getOfflineBatchesList().catch((err) => { console.error("[AdminPage] getOfflineBatchesList error:", err); return []; }),
    getOnlineCoursesList().catch((err) => { console.error("[AdminPage] getOnlineCoursesList error:", err); return []; }),
    getAdminTestSeriesList().catch((err) => { console.error("[AdminPage] getAdminTestSeriesList error:", err); return []; }),
    getAdminTestSchedulesList().catch((err) => { console.error("[AdminPage] getAdminTestSchedulesList error:", err); return []; }),
    getAdminToppersList().catch((err) => { console.error("[AdminPage] getAdminToppersList error:", err); return []; }),
    getDailyQuizzesAction("hi").catch((err) => { console.error("[AdminPage] getDailyQuizzesAction error:", err); return []; }),
    getSubjectQuizzesAction("hi").catch((err) => { console.error("[AdminPage] getSubjectQuizzesAction error:", err); return []; }),
    getAdminPublicationsList().catch((err) => { console.error("[AdminPage] getAdminPublicationsList error:", err); return []; }),
    getAdminHomeNoticesList().catch((err) => { console.error("[AdminPage] getAdminHomeNoticesList error:", err); return []; }),
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
      toppers={toppers}
      dailyQuizzes={dailyQuizzes}
      subjectQuizzes={subjectQuizzes}
      publications={publications}
      notices={notices}
    />
  );
}
