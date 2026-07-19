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
  const isAuthorized = await isAdmin();
  if (!isAuthorized) {
    redirect("/en/login");
  }

  // Fetch dashboard stats, logs, faculties, offline batches, online courses, test series, and test schedules
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
    getAdminMetrics(),
    getSubscribersList(),
    getContactMessages(),
    getDownloadsAnalytics(),
    getStudentProfiles(),
    getStaticPagesList(),
    getFacultiesList(),
    getOfflineBatchesList(),
    getOnlineCoursesList(),
    getAdminTestSeriesList(),
    getAdminTestSchedulesList(),
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
