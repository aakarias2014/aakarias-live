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
  const isAuthorized = await isAdmin();
  if (!isAuthorized) {
    redirect("/login");
  }

  // Fetch dashboard stats, logs, faculties, offline batches, online courses, test series, test schedules, toppers, publications, daily quizzes and notices
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
    getAdminToppersList(),
    getDailyQuizzesAction("hi"),
    getSubjectQuizzesAction("hi"),
    getAdminPublicationsList(),
    getAdminHomeNoticesList(),
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
