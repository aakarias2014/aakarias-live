"use client";

import React, { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { signOut } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { 
  Users, 
  MessageSquare, 
  Download, 
  ExternalLink, 
  FileDown, 
  Check, 
  Archive, 
  Search, 
  Globe, 
  CheckCircle,
  FileText,
  BookOpen,
  Award,
  Trophy,
  Bell,
  BookMarked,
  Megaphone,
  GraduationCap,
  Plus,
  Trash2,
  Edit2,
  X,
  Upload,
  Loader2,
  Video,
  Eye,
  LogOut
} from "lucide-react";
import { 
  updateMessageStatus,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  createOfflineBatch,
  updateOfflineBatch,
  deleteOfflineBatch,
  createOnlineCourse,
  updateOnlineCourse,
  deleteOnlineCourse,
  createTestSeries,
  updateTestSeries,
  deleteTestSeries,
  createTestSchedule,
  updateTestSchedule,
  deleteTestSchedule,
  createHomeNotice,
  updateHomeNotice,
  deleteHomeNotice
} from "@/actions/admin";
import { Faculty, OfflineBatch, OnlineCourse, TestSeries, TestSchedule, Topper, Publication, HomeNotice } from "@/lib/content/types";

interface AdminSubscriber {
  id: string;
  email?: string;
  phone?: string;
  locale: string;
  source?: string | null;
  active?: boolean;
  created_at: string;
  createdAt?: string;
}

interface AdminMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  locale: string;
  user_agent: string | null;
  status: string;
  created_at: string;
}

interface AdminDownload {
  id: string;
  resource_slug: string;
  title: string;
  kind: string;
  locale: string;
  count: number;
  created_at: string;
  updated_at: string;
}

interface AdminStudent {
  id: string;
  full_name: string | null;
  target_exam: "UPSC" | "MPPSC" | "Both";
  created_at: string;
  updated_at: string;
}

interface AdminDashboardProps {
  metrics: {
    subscribersCount: number;
    whatsappCount: number;
    messagesCount: number;
    downloadsCount: number;
    studentsCount: number;
  };
  subscribers: {
    newsletter: AdminSubscriber[];
    whatsapp: AdminSubscriber[];
  };
  messages: AdminMessage[];
  downloads: AdminDownload[];
  students: AdminStudent[];
  staticPages?: Array<{ _id: string; slug: string; title?: string; titleEn?: string }>;
  faculties: Faculty[];
  offlineBatches?: OfflineBatch[];
  onlineCourses?: OnlineCourse[];
  testSeries?: TestSeries[];
  testSchedules?: TestSchedule[];
  toppers?: Topper[];
  dailyQuizzes?: any[];
  subjectQuizzes?: any[];
  publications?: Publication[];
  notices?: HomeNotice[];
}

interface AdminStaticPage {
  slug: string;
  name: string;
  nameEn: string;
  path: string;
  description: string;
  descriptionEn: string;
}

const STATIC_PAGES_META: AdminStaticPage[] = [
  {
    slug: "about",
    name: "हमारे बारे में",
    nameEn: "About Us",
    path: "/about",
    description: "संस्थान के बारे में विवरण, इतिहास, दृष्टि और टीम की जानकारी।",
    descriptionEn: "Details about the institute, history, vision, and team members.",
  },
  {
    slug: "contact",
    name: "संपर्क करें",
    nameEn: "Contact Us",
    path: "/contact",
    description: "संस्थान से संपर्क करने के विवरण, स्थान, ईमेल और फोन नंबर।",
    descriptionEn: "Contact information, locations, email, and phone numbers.",
  },
  {
    slug: "download",
    name: "ऐप डाउनलोड",
    nameEn: "App Download Page",
    path: "/download",
    description: "मोबाइल और डेस्कटॉप ऐप के डाउनलोड लिंक और जानकारी।",
    descriptionEn: "Download links and details for mobile and desktop apps.",
  },
  {
    slug: "privacy",
    name: "गोपनीयता नीति",
    nameEn: "Privacy Policy",
    path: "/privacy",
    description: "उपयोगकर्ताओं की डेटा सुरक्षा और गोपनीयता से संबंधित नियम।",
    descriptionEn: "Privacy and data protection rules for website users.",
  },
  {
    slug: "terms",
    name: "नियम और शर्तें",
    nameEn: "Terms & Conditions",
    path: "/terms",
    description: "वेबसाइट और सेवाओं के उपयोग की शर्तें।",
    descriptionEn: "Terms and conditions for using the website and services.",
  },
  {
    slug: "refund",
    name: "रिफंड नीति",
    nameEn: "Refund & Cancellation Policy",
    path: "/refund",
    description: "सशुल्क सेवाओं और पुस्तकों की वापसी नीति।",
    descriptionEn: "Refund, replacement, and cancellation rules.",
  },
  {
    slug: "disclaimer",
    name: "अस्वीकरण",
    nameEn: "Disclaimer",
    path: "/disclaimer",
    description: "शैक्षिक सामग्री और परीक्षा परिणामों से संबंधित अस्वीकरण।",
    descriptionEn: "Disclaimers regarding study material and exam results.",
  },
];

const EMPTY_ARRAY: any[] = [];

export function AdminDashboard({
  metrics,
  subscribers,
  messages: initialMessages,
  downloads,
  students,
  staticPages = EMPTY_ARRAY,
  faculties = EMPTY_ARRAY,
  offlineBatches = EMPTY_ARRAY,
  onlineCourses = EMPTY_ARRAY,
  testSeries = EMPTY_ARRAY,
  testSchedules = EMPTY_ARRAY,
  toppers = EMPTY_ARRAY,
  dailyQuizzes = EMPTY_ARRAY,
  subjectQuizzes = EMPTY_ARRAY,
  publications = EMPTY_ARRAY,
  notices = EMPTY_ARRAY,
}: AdminDashboardProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/login?allow=true";
  };

  const [activeTab, setActiveTab] = useState<"subscribers" | "messages" | "offlineEnquiries" | "onlineLeads" | "downloads" | "students" | "pages" | "mentors" | "batches" | "onlineCourses" | "testSeries" | "testSchedules" | "quizzes" | "publications" | "notices">("subscribers");
  const [noticesList, setNoticesList] = useState<HomeNotice[]>(notices);
  const [messagesList, setMessagesList] = useState(initialMessages);
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "yesterday" | "custom">("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expandedMsgId, setExpandedMsgId] = useState<string | null>(null);
  const [facultiesList, setFacultiesList] = useState<Faculty[]>(faculties);
  const [offlineBatchesList, setOfflineBatchesList] = useState<OfflineBatch[]>(offlineBatches);
  const [onlineCoursesList, setOnlineCoursesList] = useState<OnlineCourse[]>(onlineCourses);
  const [testSeriesList, setTestSeriesList] = useState<TestSeries[]>(testSeries);
  const [testSchedulesList, setTestSchedulesList] = useState<TestSchedule[]>(testSchedules);
  const [dailyQuizzesList, setDailyQuizzesList] = useState<any[]>(dailyQuizzes);
  const [subjectQuizzesList, setSubjectQuizzesList] = useState<any[]>(subjectQuizzes);
  const [publicationsList, setPublicationsList] = useState<Publication[]>(publications);
  const [quizSubTab, setQuizSubTab] = useState<"daily" | "subject">("daily");
  const [subType, setSubType] = useState<"newsletter" | "whatsapp">("newsletter");
  const [mentorMediumFilter, setMentorMediumFilter] = useState<"all" | "hindi" | "english">("all");
  const [batchMediumFilter, setBatchMediumFilter] = useState<"all" | "hindi" | "english" | "bilingual">("all");
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<"all" | "live" | "upsc" | "mppsc" | "mpsi" | "literature">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // Sync state with props when server-side updates happen
  useEffect(() => {
    setFacultiesList(faculties);
  }, [faculties]);

  useEffect(() => {
    setOfflineBatchesList(offlineBatches);
  }, [offlineBatches]);

  useEffect(() => {
    setTestSeriesList(testSeries || []);
  }, [testSeries]);

  useEffect(() => {
    setTestSchedulesList(testSchedules || []);
  }, [testSchedules]);

  useEffect(() => {
    setDailyQuizzesList(dailyQuizzes || []);
  }, [dailyQuizzes]);

  useEffect(() => {
    setSubjectQuizzesList(subjectQuizzes || []);
  }, [subjectQuizzes]);

  useEffect(() => {
    setPublicationsList(publications || []);
  }, [publications]);

  useEffect(() => {
    setNoticesList(notices || []);
  }, [notices]);

  // Modal / Form states for Notices
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<HomeNotice | null>(null);
  const [formNoticeTextHi, setFormNoticeTextHi] = useState("");
  const [formNoticeTextEn, setFormNoticeTextEn] = useState("");
  const [formNoticeLink, setFormNoticeLink] = useState("");
  const [formNoticeOrderIndex, setFormNoticeOrderIndex] = useState(0);
  const [formNoticeIsActive, setFormNoticeIsActive] = useState(true);
  const [isNoticeSubmitting, setIsNoticeSubmitting] = useState(false);

  // Modal / Form states for Offline Batches
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<OfflineBatch | null>(null);
  const [formBatchTitleHi, setFormBatchTitleHi] = useState("");
  const [formBatchTitleEn, setFormBatchTitleEn] = useState("");
  const [formBatchStartDateHi, setFormBatchStartDateHi] = useState("");
  const [formBatchStartDateEn, setFormBatchStartDateEn] = useState("");
  const [formBatchTimeHi, setFormBatchTimeHi] = useState("");
  const [formBatchTimeEn, setFormBatchTimeEn] = useState("");
  const [formBatchMedium, setFormBatchMedium] = useState<"hindi" | "english" | "bilingual">("bilingual");
  const [formBatchBadgeHi, setFormBatchBadgeHi] = useState("");
  const [formBatchBadgeEn, setFormBatchBadgeEn] = useState("");
  const [formBatchSeatsFillPercent, setFormBatchSeatsFillPercent] = useState(0);
  const [formBatchIsNew, setFormBatchIsNew] = useState(false);
  const [formBatchDescHi, setFormBatchDescHi] = useState("");
  const [formBatchDescEn, setFormBatchDescEn] = useState("");
  const [formBatchLocationNameHi, setFormBatchLocationNameHi] = useState("Rajiv Gandhi Circle Campus");
  const [formBatchLocationNameEn, setFormBatchLocationNameEn] = useState("Rajiv Gandhi Circle Campus");
  const [formBatchCenter, setFormBatchCenter] = useState("indore");
  const [formBatchOrderIndex, setFormBatchOrderIndex] = useState(0);
  const [isBatchSubmitting, setIsBatchSubmitting] = useState(false);

  // Modal / Form states for Senior Mentors
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<Faculty | null>(null);
  const [formNameHi, setFormNameHi] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formTitleHi, setFormTitleHi] = useState("");
  const [formTitleEn, setFormTitleEn] = useState("");
  const [formDescHi, setFormDescHi] = useState("");
  const [formDescEn, setFormDescEn] = useState("");
  const [formMedium, setFormMedium] = useState<"hindi" | "english">("hindi");
  const [formOrderIndex, setFormOrderIndex] = useState(0);
  const [formImageFile, setFormImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter subscribers based on type and search query
  const filteredSubs = (subType === "newsletter" ? subscribers.newsletter : subscribers.whatsapp).filter(
    (sub) => {
      const target = subType === "newsletter" ? sub.email : sub.phone;
      return target?.toLowerCase().includes(searchQuery.toLowerCase());
    }
  );

  // Filter messages based on search query and date filters
  const filteredMessages = messagesList.filter((msg) => {
    // 1. Search Query filter
    const matchesSearch =
      !searchQuery ||
      msg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (msg.phone && msg.phone.includes(searchQuery)) ||
      (msg.subject && msg.subject.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    // 2. Date Filter
    const msgDate = new Date(msg.created_at);
    const now = new Date();

    if (dateFilter === "today") {
      return msgDate.toDateString() === now.toDateString();
    }

    if (dateFilter === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      return msgDate.toDateString() === yesterday.toDateString();
    }

    if (dateFilter === "custom") {
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (msgDate < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (msgDate > end) return false;
      }
    }

    return true;
  });

  // Split messages into general contact inquiries, offline batch enquiries, and online enrollment leads
  const filteredGeneralMessages = filteredMessages.filter(
    (msg) => !msg.subject?.startsWith("Offline Batch Enquiry:") && !msg.subject?.startsWith("Online Enrollment Lead:")
  );
  
  const filteredOfflineEnquiries = filteredMessages.filter(
    (msg) => msg.subject?.startsWith("Offline Batch Enquiry:")
  );

  const filteredOnlineLeads = filteredMessages.filter(
    (msg) => msg.subject?.startsWith("Online Enrollment Lead:")
  );

  // Filter downloads based on search query
  const filteredDownloads = downloads.filter(
    (dl) =>
      dl.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dl.resource_slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dl.kind?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter students based on search query
  const filteredStudents = students.filter(
    (st) =>
      st.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter mentors based on search query and medium
  const filteredMentors = facultiesList.filter((m) => {
    const matchesSearch =
      m.nameHi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.nameEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.titleHi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.titleEn?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMedium = mentorMediumFilter === "all" || m.medium === mentorMediumFilter;
    return matchesSearch && matchesMedium;
  });

  // Filter offline batches based on search query and medium
  const filteredBatches = offlineBatchesList.filter((b) => {
    const matchesSearch =
      b.titleHi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.titleEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.startDateHi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.startDateEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.descHi && b.descHi.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.descEn && b.descEn.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMedium = batchMediumFilter === "all" || b.medium === batchMediumFilter;
    return matchesSearch && matchesMedium;
  });

  const filteredCoursesList = onlineCoursesList.filter((c) => {
    const matchesSearch =
      c.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.mentorNameHi || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.mentorNameEn || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (courseCategoryFilter === "all") return true;
    if (courseCategoryFilter === "live") return !!c.isLive;
    return c.category === courseCategoryFilter;
  });

  const filteredTestSeriesList = testSeriesList.filter((ts) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      (ts.title || "").toLowerCase().includes(term) ||
      (ts.slug || "").toLowerCase().includes(term) ||
      ((ts as TestSeries & { titleEn?: string; descriptionEn?: string }).titleEn || "").toLowerCase().includes(term) ||
      (ts.description || "").toLowerCase().includes(term) ||
      ((ts as TestSeries & { titleEn?: string; descriptionEn?: string }).descriptionEn || "").toLowerCase().includes(term);
    return matchesSearch;
  });

  const filteredTestSchedulesList = testSchedulesList.filter((s) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      (s.titleEn || "").toLowerCase().includes(term) ||
      (s.titleHi || "").toLowerCase().includes(term) ||
      (s.code || "").toLowerCase().includes(term) ||
      (s.date || "").toLowerCase().includes(term) ||
      (s.focusEn || "").toLowerCase().includes(term) ||
      (s.focusHi || "").toLowerCase().includes(term);
    return matchesSearch;
  });

  const filteredPublicationsList = publicationsList.filter((pub) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      (pub.title || "").toLowerCase().includes(term) ||
      (pub.titleEn || "").toLowerCase().includes(term) ||
      (pub.description || "").toLowerCase().includes(term) ||
      (pub.slug || "").toLowerCase().includes(term);
    return matchesSearch;
  });

  const filteredNoticesList = noticesList.filter((notice) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      (notice.noticeTextHi || "").toLowerCase().includes(term) ||
      (notice.noticeTextEn || "").toLowerCase().includes(term) ||
      (notice.noticeLink || "").toLowerCase().includes(term);
    return matchesSearch;
  });

  const filteredQuizzesList = dailyQuizzesList.filter((quiz) => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      (quiz.titleHi || "").toLowerCase().includes(term) ||
      (quiz.titleEn || "").toLowerCase().includes(term) ||
      (quiz.ca_date || "").includes(term) ||
      (quiz.descriptionHi || "").toLowerCase().includes(term) ||
      (quiz.descriptionEn || "").toLowerCase().includes(term)
    );
  });

  const filteredSubjectQuizzesList = subjectQuizzesList.filter((quiz) => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      (quiz.titleHi || "").toLowerCase().includes(term) ||
      (quiz.titleEn || "").toLowerCase().includes(term) ||
      (quiz.subject || "").toLowerCase().includes(term) ||
      (quiz.descriptionHi || "").toLowerCase().includes(term) ||
      (quiz.descriptionEn || "").toLowerCase().includes(term)
    );
  });

  // Modal / Form states for Online Courses
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<OnlineCourse | null>(null);

  const [formCourseTitleHi, setFormCourseTitleHi] = useState("");
  const [formCourseTitleEn, setFormCourseTitleEn] = useState("");
  const [formCourseSlug, setFormCourseSlug] = useState("");
  const [formCourseCategory, setFormCourseCategory] = useState<"live" | "upsc" | "mppsc" | "mpsi" | "literature">("upsc");
  const [formCourseBadgeHi, setFormCourseBadgeHi] = useState("");
  const [formCourseBadgeEn, setFormCourseBadgeEn] = useState("");
  const [formCourseIsLive, setFormCourseIsLive] = useState(false);
  const [formCourseEnrollUrl, setFormCourseEnrollUrl] = useState("");

  const [formCourseMentorNameHi, setFormCourseMentorNameHi] = useState("");
  const [formCourseMentorNameEn, setFormCourseMentorNameEn] = useState("");
  const [formCourseMentorTitleHi, setFormCourseMentorTitleHi] = useState("");
  const [formCourseMentorTitleEn, setFormCourseMentorTitleEn] = useState("");
  const [formCourseMentorBioHi, setFormCourseMentorBioHi] = useState("");
  const [formCourseMentorBioEn, setFormCourseMentorBioEn] = useState("");

  const [formCoursePrice, setFormCoursePrice] = useState("");
  const [formCourseOriginalPrice, setFormCourseOriginalPrice] = useState("");
  const [formCourseDurationHi, setFormCourseDurationHi] = useState("");
  const [formCourseDurationEn, setFormCourseDurationEn] = useState("");
  const [formCourseLecturesCountHi, setFormCourseLecturesCountHi] = useState("");
  const [formCourseLecturesCountEn, setFormCourseLecturesCountEn] = useState("");
  const [formCourseStudentsCountHi, setFormCourseStudentsCountHi] = useState("");
  const [formCourseStudentsCountEn, setFormCourseStudentsCountEn] = useState("");
  const [formCourseRating, setFormCourseRating] = useState("4.9");
  const [formCourseDescriptionHi, setFormCourseDescriptionHi] = useState("");
  const [formCourseDescriptionEn, setFormCourseDescriptionEn] = useState("");
  const [formCourseOrderIndex, setFormCourseOrderIndex] = useState(0);

  const [formCourseImageFile, setFormCourseImageFile] = useState<File | null>(null);
  const [formCourseImagePreview, setFormCourseImagePreview] = useState<string | null>(null);
  const [existingCourseImageUrl, setExistingCourseImageUrl] = useState<string | null>(null);

  const [formCourseMentorImageFile, setFormCourseMentorImageFile] = useState<File | null>(null);
  const [formCourseMentorImagePreview, setFormCourseMentorImagePreview] = useState<string | null>(null);
  const [existingCourseMentorImageUrl, setExistingCourseMentorImageUrl] = useState<string | null>(null);

  const [formCourseWhatYouLearnHi, setFormCourseWhatYouLearnHi] = useState("");
  const [formCourseWhatYouLearnEn, setFormCourseWhatYouLearnEn] = useState("");
  const [formCourseHighlightsHi, setFormCourseHighlightsHi] = useState("");
  const [formCourseHighlightsEn, setFormCourseHighlightsEn] = useState("");
  const [formCourseSyllabusJSON, setFormCourseSyllabusJSON] = useState("[]");
  const [formCourseFeaturesJSON, setFormCourseFeaturesJSON] = useState("[]");
  const [formCourseTestimonialsJSON, setFormCourseTestimonialsJSON] = useState("[]");

  const [isCourseSubmitting, setIsCourseSubmitting] = useState(false);

  // Modal / Form states for Test Series
  const [isTestSeriesModalOpen, setIsTestSeriesModalOpen] = useState(false);
  const [editingTestSeries, setEditingTestSeries] = useState<TestSeries | null>(null);

  const [formTestTitleHi, setFormTestTitleHi] = useState("");
  const [formTestTitleEn, setFormTestTitleEn] = useState("");
  const [formTestSlug, setFormTestSlug] = useState("");
  const [formTestDescriptionHi, setFormTestDescriptionHi] = useState("");
  const [formTestDescriptionEn, setFormTestDescriptionEn] = useState("");
  const [formTestPrice, setFormTestPrice] = useState("");
  const [formTestOriginalPrice, setFormTestOriginalPrice] = useState("");
  const [formTestBuyLink, setFormTestBuyLink] = useState("");
  const [formTestActive, setFormTestActive] = useState(true);
  const [formTestFeaturesHi, setFormTestFeaturesHi] = useState("");
  const [formTestFeaturesEn, setFormTestFeaturesEn] = useState("");
  const [formTestBadgeHi, setFormTestBadgeHi] = useState("");
  const [formTestBadgeEn, setFormTestBadgeEn] = useState("");
  const [formTestOrderIndex, setFormTestOrderIndex] = useState(0);

  const [isTestSeriesSubmitting, setIsTestSeriesSubmitting] = useState(false);

  const openAddTestSeriesModal = () => {
    setEditingTestSeries(null);
    setFormTestTitleHi("");
    setFormTestTitleEn("");
    setFormTestSlug("");
    setFormTestDescriptionHi("");
    setFormTestDescriptionEn("");
    setFormTestPrice("");
    setFormTestOriginalPrice("");
    setFormTestBuyLink("");
    setFormTestActive(true);
    setFormTestFeaturesHi("");
    setFormTestFeaturesEn("");
    setFormTestBadgeHi("");
    setFormTestBadgeEn("");
    setFormTestOrderIndex(testSeriesList.length + 1);
    setIsTestSeriesModalOpen(true);
  };

  const openEditTestSeriesModal = (test: TestSeries) => {
    setEditingTestSeries(test);
    setFormTestTitleHi(test.title || "");
    setFormTestTitleEn((test as TestSeries & { titleEn?: string; descriptionEn?: string }).titleEn || test.title || "");
    setFormTestSlug(test.slug || "");
    setFormTestDescriptionHi(test.description || "");
    setFormTestDescriptionEn((test as TestSeries & { titleEn?: string; descriptionEn?: string }).descriptionEn || "");
    setFormTestPrice(test.price !== undefined ? String(test.price) : "");
    setFormTestOriginalPrice(test.originalPrice !== undefined ? String(test.originalPrice) : "");
    setFormTestBuyLink(test.buyLink || "");
    setFormTestActive(!!test.active);
    setFormTestFeaturesHi((test.features || []).join("\n"));
    setFormTestFeaturesEn((test.featuresEn || []).join("\n"));
    setFormTestBadgeHi(test.badgeHi || "");
    setFormTestBadgeEn(test.badgeEn || "");
    setFormTestOrderIndex(test.orderIndex || 0);
    setIsTestSeriesModalOpen(true);
  };

  const handleDeleteTestSeries = async (testId: string) => {
    if (!confirm("Are you sure you want to delete this test series?")) return;
    startTransition(async () => {
      const res = await deleteTestSeries(testId);
      if (res.success) {
        setTestSeriesList(prev => prev.filter(t => t.id !== testId));
        alert("Test series deleted successfully!");
      } else {
        alert("Failed to delete test series: " + res.error);
      }
    });
  };

  const handleTestSeriesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTestSeriesSubmitting(true);

    const formData = new FormData();
    formData.append("title", formTestTitleHi);
    formData.append("titleEn", formTestTitleEn);
    formData.append("slug", formTestSlug);
    formData.append("description", formTestDescriptionHi);
    formData.append("descriptionEn", formTestDescriptionEn);
    if (formTestPrice) formData.append("price", formTestPrice);
    if (formTestOriginalPrice) formData.append("originalPrice", formTestOriginalPrice);
    formData.append("buyLink", formTestBuyLink);
    formData.append("active", String(formTestActive));
    formData.append("badgeHi", formTestBadgeHi);
    formData.append("badgeEn", formTestBadgeEn);
    formData.append("orderIndex", String(formTestOrderIndex));

    const features = formTestFeaturesHi.split("\n").map(s => s.trim()).filter(Boolean);
    const featuresEn = formTestFeaturesEn.split("\n").map(s => s.trim()).filter(Boolean);
    formData.append("features", JSON.stringify(features));
    formData.append("featuresEn", JSON.stringify(featuresEn));

    try {
      let res;
      if (editingTestSeries) {
        res = await updateTestSeries(editingTestSeries.id, formData);
      } else {
        res = await createTestSeries(formData);
      }

      if (res.success) {
        setIsTestSeriesModalOpen(false);
        window.location.reload();
      } else {
        alert("Error saving test series: " + res.error);
      }
    } catch (err: any) {
      alert("An unexpected error occurred: " + err.message);
    } finally {
      setIsTestSeriesSubmitting(false);
    }
  };

  // Modal / Form states for Test Schedules
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<TestSchedule | null>(null);

  const [formScheduleDate, setFormScheduleDate] = useState("");
  const [formScheduleCode, setFormScheduleCode] = useState("");
  const [formScheduleTitleHi, setFormScheduleTitleHi] = useState("");
  const [formScheduleTitleEn, setFormScheduleTitleEn] = useState("");
  const [formScheduleFocusHi, setFormScheduleFocusHi] = useState("");
  const [formScheduleFocusEn, setFormScheduleFocusEn] = useState("");
  const [formScheduleOrderIndex, setFormScheduleOrderIndex] = useState(0);

  const [isScheduleSubmitting, setIsScheduleSubmitting] = useState(false);

  const openAddScheduleModal = () => {
    setEditingSchedule(null);
    setFormScheduleDate("");
    setFormScheduleCode("");
    setFormScheduleTitleHi("");
    setFormScheduleTitleEn("");
    setFormScheduleFocusHi("");
    setFormScheduleFocusEn("");
    setFormScheduleOrderIndex(testSchedulesList.length + 1);
    setIsScheduleModalOpen(true);
  };

  const openEditScheduleModal = (schedule: TestSchedule) => {
    setEditingSchedule(schedule);
    setFormScheduleDate(schedule.date || "");
    setFormScheduleCode(schedule.code || "");
    setFormScheduleTitleHi(schedule.titleHi || "");
    setFormScheduleTitleEn(schedule.titleEn || "");
    setFormScheduleFocusHi(schedule.focusHi || "");
    setFormScheduleFocusEn(schedule.focusEn || "");
    setFormScheduleOrderIndex(schedule.orderIndex || 0);
    setIsScheduleModalOpen(true);
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (!confirm("Are you sure you want to delete this test schedule?")) return;
    startTransition(async () => {
      const res = await deleteTestSchedule(scheduleId);
      if (res.success) {
        setTestSchedulesList(prev => prev.filter(s => s.id !== scheduleId));
        alert("Test schedule deleted successfully!");
      } else {
        alert("Failed to delete test schedule: " + res.error);
      }
    });
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScheduleSubmitting(true);

    const formData = new FormData();
    formData.append("date", formScheduleDate);
    formData.append("code", formScheduleCode);
    formData.append("titleHi", formScheduleTitleHi);
    formData.append("titleEn", formScheduleTitleEn);
    formData.append("focusHi", formScheduleFocusHi);
    formData.append("focusEn", formScheduleFocusEn);
    formData.append("orderIndex", String(formScheduleOrderIndex));

    try {
      let res;
      if (editingSchedule) {
        res = await updateTestSchedule(editingSchedule.id, formData);
      } else {
        res = await createTestSchedule(formData);
      }

      if (res.success) {
        setIsScheduleModalOpen(false);
        window.location.reload();
      } else {
        alert("Error saving test schedule: " + res.error);
      }
    } catch (err: any) {
      alert("An unexpected error occurred: " + err.message);
    } finally {
      setIsScheduleSubmitting(false);
    }
  };

  const openAddCourseModal = () => {
    setEditingCourse(null);
    setFormCourseTitleHi("");
    setFormCourseTitleEn("");
    setFormCourseSlug("");
    setFormCourseCategory("upsc");
    setFormCourseBadgeHi("");
    setFormCourseBadgeEn("");
    setFormCourseIsLive(false);
    setFormCourseEnrollUrl("");
    setFormCourseMentorNameHi("");
    setFormCourseMentorNameEn("");
    setFormCourseMentorTitleHi("");
    setFormCourseMentorTitleEn("");
    setFormCourseMentorBioHi("");
    setFormCourseMentorBioEn("");
    setFormCoursePrice("");
    setFormCourseOriginalPrice("");
    setFormCourseDurationHi("");
    setFormCourseDurationEn("");
    setFormCourseLecturesCountHi("");
    setFormCourseLecturesCountEn("");
    setFormCourseStudentsCountHi("");
    setFormCourseStudentsCountEn("");
    setFormCourseRating("4.9");
    setFormCourseDescriptionHi("");
    setFormCourseDescriptionEn("");
    setFormCourseOrderIndex(0);
    setFormCourseImageFile(null);
    setFormCourseImagePreview(null);
    setExistingCourseImageUrl(null);
    setFormCourseMentorImageFile(null);
    setFormCourseMentorImagePreview(null);
    setExistingCourseMentorImageUrl(null);
    setFormCourseWhatYouLearnHi("");
    setFormCourseWhatYouLearnEn("");
    setFormCourseHighlightsHi("");
    setFormCourseHighlightsEn("");
    setFormCourseSyllabusJSON("[\n  {\n    \"titleHi\": \"Module 1: भारतीय इतिहास\",\n    \"titleEn\": \"Module 1: Indian History\",\n    \"topicsHi\": [\"सिंधु घाटी सभ्यता\", \"वैदिक काल\"],\n    \"topicsEn\": [\"Indus Valley Civilization\", \"Vedic Era\"]\n  }\n]");
    setFormCourseFeaturesJSON("[\n  {\n    \"icon\": \"Clock\",\n    \"labelHi\": \"अवधि\",\n    \"labelEn\": \"Duration\",\n    \"valueHi\": \"18 महीने\",\n    \"valueEn\": \"18 Months\"\n  }\n]");
    setFormCourseTestimonialsJSON("[\n  {\n    \"nameHi\": \"छात्र का नाम\",\n    \"nameEn\": \"Student Name\",\n    \"examHi\": \"UPSC CSE 2024 — AIR 127\",\n    \"examEn\": \"UPSC CSE 2024 — AIR 127\",\n    \"textHi\": \"संतुष्टि और अनुभव...\",\n    \"textEn\": \"Highly recommended...\"\n  }\n]");
    setIsCourseModalOpen(true);
  };

  const openEditCourseModal = (course: OnlineCourse) => {
    setEditingCourse(course);
    setFormCourseTitleHi(course.titleHi);
    setFormCourseTitleEn(course.titleEn);
    setFormCourseSlug(course.slug);
    setFormCourseCategory(course.category);
    setFormCourseBadgeHi(course.badgeHi || "");
    setFormCourseBadgeEn(course.badgeEn || "");
    setFormCourseIsLive(!!course.isLive);
    setFormCourseEnrollUrl(course.enrollUrl || "");
    setFormCourseMentorNameHi(course.mentorNameHi || "");
    setFormCourseMentorNameEn(course.mentorNameEn || "");
    setFormCourseMentorTitleHi(course.mentorTitleHi || "");
    setFormCourseMentorTitleEn(course.mentorTitleEn || "");
    setFormCourseMentorBioHi(course.mentorBioHi || "");
    setFormCourseMentorBioEn(course.mentorBioEn || "");
    setFormCoursePrice(course.price);
    setFormCourseOriginalPrice(course.originalPrice);
    setFormCourseDurationHi(course.durationHi || "");
    setFormCourseDurationEn(course.durationEn || "");
    setFormCourseLecturesCountHi(course.lecturesCountHi || "");
    setFormCourseLecturesCountEn(course.lecturesCountEn || "");
    setFormCourseStudentsCountHi(course.studentsCountHi || "");
    setFormCourseStudentsCountEn(course.studentsCountEn || "");
    setFormCourseRating(course.rating || "4.9");
    setFormCourseDescriptionHi(course.descriptionHi || "");
    setFormCourseDescriptionEn(course.descriptionEn || "");
    setFormCourseOrderIndex(course.orderIndex || 0);
    setFormCourseImageFile(null);
    setFormCourseImagePreview(null);
    setExistingCourseImageUrl(course.image || null);
    setFormCourseMentorImageFile(null);
    setFormCourseMentorImagePreview(null);
    setExistingCourseMentorImageUrl(course.mentorImage || null);
    setFormCourseWhatYouLearnHi((course.whatYouLearnHi || []).join("\n"));
    setFormCourseWhatYouLearnEn((course.whatYouLearnEn || []).join("\n"));
    setFormCourseHighlightsHi((course.highlightsHi || []).join("\n"));
    setFormCourseHighlightsEn((course.highlightsEn || []).join("\n"));
    setFormCourseSyllabusJSON(JSON.stringify(course.syllabus || [], null, 2));
    setFormCourseFeaturesJSON(JSON.stringify(course.features || [], null, 2));
    setFormCourseTestimonialsJSON(JSON.stringify(course.testimonials || [], null, 2));
    setIsCourseModalOpen(true);
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this online course?")) return;
    startTransition(async () => {
      const res = await deleteOnlineCourse(courseId);
      if (res.success) {
        setOnlineCoursesList(prev => prev.filter(c => c.id !== courseId));
        alert("Online course deleted successfully!");
      } else {
        alert("Failed to delete online course: " + res.error);
      }
    });
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCourseSubmitting(true);

    try {
      JSON.parse(formCourseSyllabusJSON);
      JSON.parse(formCourseFeaturesJSON);
      JSON.parse(formCourseTestimonialsJSON);
    } catch (err: any) {
      alert("Invalid JSON format in Syllabus, Features, or Testimonials. Please check and correct the format: " + err.message);
      setIsCourseSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("titleHi", formCourseTitleHi);
    formData.append("titleEn", formCourseTitleEn);
    formData.append("slug", formCourseSlug);
    formData.append("category", formCourseCategory);
    formData.append("badgeHi", formCourseBadgeHi);
    formData.append("badgeEn", formCourseBadgeEn);
    formData.append("isLive", String(formCourseIsLive));
    formData.append("enrollUrl", formCourseEnrollUrl);
    formData.append("mentorNameHi", formCourseMentorNameHi);
    formData.append("mentorNameEn", formCourseMentorNameEn);
    formData.append("mentorTitleHi", formCourseMentorTitleHi);
    formData.append("mentorTitleEn", formCourseMentorTitleEn);
    formData.append("mentorBioHi", formCourseMentorBioHi);
    formData.append("mentorBioEn", formCourseMentorBioEn);
    formData.append("price", formCoursePrice);
    formData.append("originalPrice", formCourseOriginalPrice);
    formData.append("durationHi", formCourseDurationHi);
    formData.append("durationEn", formCourseDurationEn);
    formData.append("lecturesCountHi", formCourseLecturesCountHi);
    formData.append("lecturesCountEn", formCourseLecturesCountEn);
    formData.append("studentsCountHi", formCourseStudentsCountHi);
    formData.append("studentsCountEn", formCourseStudentsCountEn);
    formData.append("rating", formCourseRating);
    formData.append("descriptionHi", formCourseDescriptionHi);
    formData.append("descriptionEn", formCourseDescriptionEn);
    formData.append("orderIndex", String(formCourseOrderIndex));

    const whatYouLearnHi = formCourseWhatYouLearnHi.split("\n").map(s => s.trim()).filter(Boolean);
    const whatYouLearnEn = formCourseWhatYouLearnEn.split("\n").map(s => s.trim()).filter(Boolean);
    const highlightsHi = formCourseHighlightsHi.split("\n").map(s => s.trim()).filter(Boolean);
    const highlightsEn = formCourseHighlightsEn.split("\n").map(s => s.trim()).filter(Boolean);

    formData.append("whatYouLearnHi", JSON.stringify(whatYouLearnHi));
    formData.append("whatYouLearnEn", JSON.stringify(whatYouLearnEn));
    formData.append("highlightsHi", JSON.stringify(highlightsHi));
    formData.append("highlightsEn", JSON.stringify(highlightsEn));
    formData.append("syllabus", formCourseSyllabusJSON);
    formData.append("features", formCourseFeaturesJSON);
    formData.append("testimonials", formCourseTestimonialsJSON);

    if (formCourseImageFile) {
      formData.append("image", formCourseImageFile);
    }
    if (formCourseMentorImageFile) {
      formData.append("mentorImage", formCourseMentorImageFile);
    }

    try {
      let res;
      if (editingCourse) {
        res = await updateOnlineCourse(editingCourse.id, formData);
      } else {
        res = await createOnlineCourse(formData);
      }

      if (res.success) {
        setIsCourseModalOpen(false);
        window.location.reload();
      } else {
        alert("Error saving course: " + res.error);
      }
    } catch (err: any) {
      alert("An unexpected error occurred: " + err.message);
    } finally {
      setIsCourseSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteMentor = async (mentor: Faculty) => {
    if (!confirm(`Are you sure you want to delete ${mentor.nameEn}?`)) {
      return;
    }
    startTransition(async () => {
      const res = await deleteFaculty(mentor.id);
      if (res.success) {
        setFacultiesList((prev) => prev.filter((m) => m.id !== mentor.id));
      } else {
        alert("Failed to delete mentor: " + res.error);
      }
    });
  };

  const openAddBatchModal = () => {
    setEditingBatch(null);
    setFormBatchTitleHi("");
    setFormBatchTitleEn("");
    setFormBatchStartDateHi("");
    setFormBatchStartDateEn("");
    setFormBatchTimeHi("");
    setFormBatchTimeEn("");
    setFormBatchMedium("bilingual");
    setFormBatchBadgeHi("");
    setFormBatchBadgeEn("");
    setFormBatchSeatsFillPercent(0);
    setFormBatchIsNew(false);
    setFormBatchDescHi("");
    setFormBatchDescEn("");
    setFormBatchLocationNameHi("Rajiv Gandhi Circle Campus");
    setFormBatchLocationNameEn("Rajiv Gandhi Circle Campus");
    setFormBatchCenter("indore");
    setFormBatchOrderIndex(offlineBatchesList.length + 1);
    setIsBatchModalOpen(true);
  };

  const openEditBatchModal = (batch: OfflineBatch) => {
    setEditingBatch(batch);
    setFormBatchTitleHi(batch.titleHi || "");
    setFormBatchTitleEn(batch.titleEn || "");
    setFormBatchStartDateHi(batch.startDateHi || "");
    setFormBatchStartDateEn(batch.startDateEn || "");
    setFormBatchTimeHi(batch.timeHi || "");
    setFormBatchTimeEn(batch.timeEn || "");
    setFormBatchMedium(batch.medium || "bilingual");
    setFormBatchBadgeHi(batch.badgeHi || "");
    setFormBatchBadgeEn(batch.badgeEn || "");
    setFormBatchSeatsFillPercent(batch.seatsFillPercent || 0);
    setFormBatchIsNew(batch.isNew || false);
    setFormBatchDescHi(batch.descHi || "");
    setFormBatchDescEn(batch.descEn || "");
    setFormBatchLocationNameHi(batch.locationNameHi || "Rajiv Gandhi Circle Campus");
    setFormBatchLocationNameEn(batch.locationNameEn || "Rajiv Gandhi Circle Campus");
    setFormBatchCenter(batch.center || "indore");
    setFormBatchOrderIndex(batch.orderIndex || 0);
    setIsBatchModalOpen(true);
  };

  const handleBatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBatchTitleHi || !formBatchTitleEn || !formBatchStartDateHi || !formBatchStartDateEn || !formBatchTimeHi || !formBatchTimeEn) {
      alert("Please fill in all required fields (Title, Start Date, and Timing).");
      return;
    }

    setIsBatchSubmitting(true);
    const formData = new FormData();
    formData.append("titleHi", formBatchTitleHi);
    formData.append("titleEn", formBatchTitleEn);
    formData.append("startDateHi", formBatchStartDateHi);
    formData.append("startDateEn", formBatchStartDateEn);
    formData.append("timeHi", formBatchTimeHi);
    formData.append("timeEn", formBatchTimeEn);
    formData.append("medium", formBatchMedium);
    formData.append("badgeHi", formBatchBadgeHi);
    formData.append("badgeEn", formBatchBadgeEn);
    formData.append("seatsFillPercent", String(formBatchSeatsFillPercent));
    formData.append("isNew", String(formBatchIsNew));
    formData.append("descHi", formBatchDescHi);
    formData.append("descEn", formBatchDescEn);
    formData.append("locationNameHi", formBatchLocationNameHi);
    formData.append("locationNameEn", formBatchLocationNameEn);
    formData.append("center", formBatchCenter);
    formData.append("orderIndex", String(formBatchOrderIndex));

    try {
      let res;
      if (editingBatch) {
        res = await updateOfflineBatch(editingBatch.id, formData);
      } else {
        res = await createOfflineBatch(formData);
      }

      if (res.success) {
        setIsBatchModalOpen(false);
        // Refresh local state list for immediate UI reactivity
        if (editingBatch) {
          setOfflineBatchesList(prev =>
            prev.map(b => (b.id === editingBatch.id ? { ...b, titleHi: formBatchTitleHi, titleEn: formBatchTitleEn, startDateHi: formBatchStartDateHi, startDateEn: formBatchStartDateEn, timeHi: formBatchTimeHi, timeEn: formBatchTimeEn, medium: formBatchMedium, badgeHi: formBatchBadgeHi, badgeEn: formBatchBadgeEn, seatsFillPercent: formBatchSeatsFillPercent, descHi: formBatchDescHi, descEn: formBatchDescEn, locationNameHi: formBatchLocationNameHi, locationNameEn: formBatchLocationNameEn, center: formBatchCenter, orderIndex: formBatchOrderIndex, isNew: formBatchIsNew } : b))
          );
          alert("Offline batch saved successfully!");
        } else {
          window.location.reload();
        }
      } else {
        alert("Error saving offline batch: " + res.error);
      }
    } catch (err: any) {
      alert("An unexpected error occurred: " + err.message);
    } finally {
      setIsBatchSubmitting(false);
    }
  };

  const handleDeleteBatch = async (batchId: string) => {
    if (!confirm("Are you sure you want to delete this offline batch?")) return;

    startTransition(async () => {
      const res = await deleteOfflineBatch(batchId);
      if (res.success) {
        setOfflineBatchesList(prev => prev.filter(b => b.id !== batchId));
        alert("Offline batch deleted successfully!");
      } else {
        alert("Failed to delete offline batch: " + res.error);
      }
    });
  };

  const openAddNoticeModal = () => {
    setEditingNotice(null);
    setFormNoticeTextHi("");
    setFormNoticeTextEn("");
    setFormNoticeLink("");
    setFormNoticeOrderIndex(noticesList.length + 1);
    setFormNoticeIsActive(true);
    setIsNoticeModalOpen(true);
  };

  const openEditNoticeModal = (notice: HomeNotice) => {
    setEditingNotice(notice);
    setFormNoticeTextHi(notice.noticeTextHi || "");
    setFormNoticeTextEn(notice.noticeTextEn || "");
    setFormNoticeLink(notice.noticeLink || "");
    setFormNoticeOrderIndex(notice.orderIndex || 0);
    setFormNoticeIsActive(notice.isActive !== false);
    setIsNoticeModalOpen(true);
  };

  const handleNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNoticeTextHi || !formNoticeTextEn) {
      alert("Please fill in both Hindi and English notice text fields.");
      return;
    }

    setIsNoticeSubmitting(true);
    const formData = new FormData();
    formData.append("noticeTextHi", formNoticeTextHi);
    formData.append("noticeTextEn", formNoticeTextEn);
    formData.append("noticeLink", formNoticeLink);
    formData.append("orderIndex", String(formNoticeOrderIndex));
    formData.append("isActive", String(formNoticeIsActive));

    try {
      let res;
      if (editingNotice) {
        res = await updateHomeNotice(editingNotice.id, formData);
      } else {
        res = await createHomeNotice(formData);
      }

      if (res.success) {
        setIsNoticeModalOpen(false);
        if (editingNotice) {
          setNoticesList(prev =>
            prev.map(n => (n.id === editingNotice.id ? { ...n, noticeTextHi: formNoticeTextHi, noticeTextEn: formNoticeTextEn, noticeLink: formNoticeLink, orderIndex: formNoticeOrderIndex, isActive: formNoticeIsActive } : n))
          );
          alert("Notice saved successfully!");
        } else {
          window.location.reload();
        }
      } else {
        alert("Error saving notice: " + res.error);
      }
    } catch (err: any) {
      alert("An unexpected error occurred: " + err.message);
    } finally {
      setIsNoticeSubmitting(false);
    }
  };

  const handleDeleteNotice = async (noticeId: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    startTransition(async () => {
      const res = await deleteHomeNotice(noticeId);
      if (res.success) {
        setNoticesList(prev => prev.filter(n => n.id !== noticeId));
        alert("Notice deleted successfully!");
      } else {
        alert("Failed to delete notice: " + res.error);
      }
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("nameHi", formNameHi);
    formData.append("nameEn", formNameEn);
    formData.append("titleHi", formTitleHi);
    formData.append("titleEn", formTitleEn);
    formData.append("descHi", formDescHi);
    formData.append("descEn", formDescEn);
    formData.append("medium", formMedium);
    formData.append("orderIndex", String(formOrderIndex));
    if (formImageFile) {
      formData.append("image", formImageFile);
    }

    try {
      let res;
      if (editingMentor) {
        res = await updateFaculty(editingMentor.id, formData);
      } else {
        res = await createFaculty(formData);
      }

      if (res.success) {
        setIsModalOpen(false);
        alert(editingMentor ? "Senior Mentor updated successfully!" : "Senior Mentor created successfully!");
      } else {
        alert("Error saving mentor: " + res.error);
      }
    } catch (err: any) {
      alert("An unexpected error occurred: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateMessageStatus = async (messageId: string, newStatus: "new" | "read" | "replied" | "archived") => {
    startTransition(async () => {
      const res = await updateMessageStatus(messageId, newStatus);
      if (res.success) {
        setMessagesList((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, status: newStatus } : msg))
        );
      } else {
        alert("Failed to update status: " + res.error);
      }
    });
  };

  const handleExportCSV = <T extends object>(data: T[], filename: string) => {
    if (!data || data.length === 0) {
      alert("No data available to export");
      return;
    }
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) => `"${String(val ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );
    
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportOfflineEnquiriesCSV = () => {
    if (!filteredOfflineEnquiries || filteredOfflineEnquiries.length === 0) {
      alert("No offline enquiry data available to export");
      return;
    }
    
    const csvHeaders = [
      "ID",
      "Submission Date",
      "Student Name",
      "Mobile",
      "Batch Name",
      "Locale",
      "Status"
    ].join(",");

    const csvRows = filteredOfflineEnquiries.map((msg) => {
      // Message format: Batch: <Batch Title>\nSource: Offline Course Card
      const batchLine = msg.message.split("\n").find(l => l.startsWith("Batch: "));
      const batchName = batchLine ? batchLine.replace("Batch: ", "") : "";

      const fields = [
        msg.id,
        new Date(msg.created_at).toLocaleString(),
        msg.name || "",
        msg.phone || "",
        batchName,
        msg.locale,
        msg.status
      ].map(val => `"${String(val).replace(/"/g, '""')}"`); // Escape double quotes

      return fields.join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [csvHeaders, ...csvRows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `offline_enquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportOnlineLeadsCSV = () => {
    if (!filteredOnlineLeads || filteredOnlineLeads.length === 0) {
      alert("No online lead data available to export");
      return;
    }
    
    const csvHeaders = [
      "ID",
      "Submission Date",
      "Student Name",
      "Mobile",
      "Course Name",
      "Locale",
      "Status"
    ].join(",");

    const csvRows = filteredOnlineLeads.map((msg) => {
      const courseName = msg.subject?.replace("Online Enrollment Lead: ", "") || "";

      const fields = [
        msg.id,
        new Date(msg.created_at).toLocaleString(),
        msg.name || "",
        msg.phone || "",
        courseName,
        msg.locale,
        msg.status
      ].map(val => `"${String(val).replace(/"/g, '""')}"`);

      return fields.join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [csvHeaders, ...csvRows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `online_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportInquiriesCSV = () => {
    if (!filteredMessages || filteredMessages.length === 0) {
      alert("No inquiry data available to export");
      return;
    }
    
    const headers = [
      "ID",
      "Submission Date",
      "Student Name",
      "Mobile",
      "Email",
      "City",
      "Exam",
      "Batch",
      "Mode",
      "Medium",
      "Interests",
      "Raw Message",
      "Status"
    ].join(",");

    const rows = filteredMessages.map((msg) => {
      const lines = msg.message.split("\n");
      const city = lines.find(l => l.startsWith("City: "))?.replace("City: ", "") || "";
      const exam = lines.find(l => l.startsWith("Exam: "))?.replace("Exam: ", "") || "";
      const batch = lines.find(l => l.startsWith("Batch: "))?.replace("Batch: ", "") || "";
      const mode = lines.find(l => l.startsWith("Mode: "))?.replace("Mode: ", "") || "";
      const medium = lines.find(l => l.startsWith("Medium: "))?.replace("Medium: ", "") || "";
      const interests = lines.find(l => l.startsWith("Interests: "))?.replace("Interests: ", "") || "";

      const fields = [
        msg.id,
        new Date(msg.created_at).toLocaleString(),
        msg.name || "",
        msg.phone || "",
        msg.email || "",
        city,
        exam,
        batch,
        mode,
        medium,
        interests,
        msg.message,
        msg.status
      ].map(val => `"${String(val ?? "").replace(/"/g, '""')}"`);

      return fields.join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inquiry_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div id="admin-panel-container" className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-muted">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">System Control Panel</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mt-1">
            Admin Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor dynamic operational logs, user database, and access Sanity Studio content editor.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <a
            href="/studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium shadow hover:bg-primary/95 transition duration-150 text-sm"
          >
            <Globe className="h-4 w-4" />
            Open Sanity Studio
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-destructive/20 bg-destructive/5 text-destructive font-medium shadow hover:bg-destructive hover:text-white transition duration-150 text-sm cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Subscribers */}
        <div className="rounded-xl border border-muted bg-card p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total Subscribers</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold tracking-tight">
              {metrics.subscribersCount + metrics.whatsappCount}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Newsletter: <span className="font-semibold">{metrics.subscribersCount}</span> | WhatsApp: <span className="font-semibold">{metrics.whatsappCount}</span>
            </p>
          </div>
        </div>

        {/* Dynamic Inquiries */}
        <div className="rounded-xl border border-muted bg-card p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Unread Inquiries</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold tracking-tight">{metrics.messagesCount}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Requires administrative attention
            </p>
          </div>
        </div>

        {/* PDF Downloads */}
        <div className="rounded-xl border border-muted bg-card p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total PDF Downloads</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Download className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold tracking-tight">{metrics.downloadsCount}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Downloaded via monthly-pdf, PYQs, etc.
            </p>
          </div>
        </div>

        {/* Registered Users */}
        <div className="rounded-xl border border-muted bg-card p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Registered Students</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BookMarked className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold tracking-tight">{metrics.studentsCount}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Active student portal accounts
            </p>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Sanity Quick Editors */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-muted bg-card p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">Sanity Editor Links</h3>
            <p className="text-xs text-muted-foreground mb-5">
              Click to directly manage structured written content within Sanity Studio:
            </p>
            
            <div className="grid grid-cols-1 gap-3">
              <a
                href="/studio/structure/homeConfig"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-emerald-500" />
                  Home config
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/downloadPageConfig"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-blue-500" />
                  App Downloads config
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/aboutPageConfig"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-orange-500" />
                  About Page Config
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/currentAffairs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-indigo-500" />
                  Current Affairs Articles
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/editorial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-amber-500" />
                  Editorials
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/publication"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-emerald-500" />
                  Publications (Books)
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/notification"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-red-500" />
                  Exam Notifications
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/pyq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-purple-500" />
                  PYQs & Papers
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/faq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-sky-500" />
                  General FAQs
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/staticPage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-teal-500" />
                  Static Pages (CMS)
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/ad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <Megaphone className="h-4 w-4 text-pink-500" />
                  Advertisements / Banners
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/faculty"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-emerald-500" />
                  Senior Mentors (Faculty)
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/topper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500 animate-pulse" />
                  MPPSC Toppers List
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>

              <a
                href="/studio/structure/topperCopy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/50 transition duration-150 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <BookMarked className="h-4 w-4 text-purple-500" />
                  Topper Answer Copies
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Supabase SQL Logs & Database Management */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-xl border border-muted bg-card shadow-sm overflow-hidden">
            
            {/* Tabs Header */}
            <div className="border-b border-muted bg-muted/10 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setActiveTab("subscribers"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "subscribers"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Subscribers
                </button>
                <button
                  onClick={() => { setActiveTab("messages"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "messages"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Inquiries ({messagesList.filter(m => m.status === "new" && !m.subject?.startsWith("Offline Batch Enquiry:") && !m.subject?.startsWith("Online Enrollment Lead:")).length})
                </button>
                <button
                  onClick={() => { setActiveTab("offlineEnquiries"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "offlineEnquiries"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Offline Enquiries ({messagesList.filter(m => m.status === "new" && m.subject?.startsWith("Offline Batch Enquiry:")).length})
                </button>
                <button
                  onClick={() => { setActiveTab("onlineLeads"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "onlineLeads"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Online Leads ({messagesList.filter(m => m.status === "new" && m.subject?.startsWith("Online Enrollment Lead:")).length})
                </button>
                <button
                  onClick={() => { setActiveTab("downloads"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "downloads"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  PDF Downloads
                </button>
                <button
                  onClick={() => { setActiveTab("students"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "students"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Students ({students.length})
                </button>
                <button
                  onClick={() => { setActiveTab("pages"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "pages"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Website Pages
                </button>
                <button
                  onClick={() => { setActiveTab("mentors"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "mentors"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Senior Mentors ({facultiesList.length})
                </button>
                <button
                  onClick={() => { setActiveTab("batches"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "batches"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Offline Batches ({offlineBatchesList.length})
                </button>
                <button
                  onClick={() => { setActiveTab("onlineCourses"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "onlineCourses"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Online Courses ({onlineCoursesList.length})
                </button>
                <button
                  onClick={() => { setActiveTab("testSeries"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "testSeries"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Test Series ({testSeriesList.length})
                </button>
                <button
                  onClick={() => { setActiveTab("publications"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "publications"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Publications ({publicationsList.length})
                </button>
                <button
                  onClick={() => { setActiveTab("testSchedules"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "testSchedules"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Test Schedules ({testSchedulesList.length})
                </button>
                <button
                  onClick={() => { setActiveTab("quizzes"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "quizzes"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Daily Quizzes ({dailyQuizzesList.length})
                </button>
                <button
                  onClick={() => { setActiveTab("notices"); setSearchQuery(""); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === "notices"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/30"
                  }`}
                >
                  Notices ({noticesList.length})
                </button>
              </div>

              {/* CSV Export Button (Only relevant tabs) */}
              {(activeTab === "subscribers" || activeTab === "students" || activeTab === "downloads") && (
                <button
                  onClick={() => {
                    if (activeTab === "subscribers") {
                      handleExportCSV(filteredSubs, `${subType}_subscribers.csv`);
                    } else if (activeTab === "students") {
                      handleExportCSV(filteredStudents, "registered_students.csv");
                    } else {
                      handleExportCSV(filteredDownloads, "pdf_downloads_statistics.csv");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-muted bg-background hover:bg-muted/30 text-xs font-medium text-foreground transition"
                >
                  <FileDown className="h-3.5 w-3.5 text-muted-foreground" />
                  Export CSV
                </button>
              )}
            </div>

            {/* Filtering bar */}
            <div className="p-4 border-b border-muted bg-muted/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Subscriber Sub-tabs */}
              {activeTab === "subscribers" ? (
                <div className="flex rounded-md border border-muted overflow-hidden w-full sm:w-auto">
                  <button
                    onClick={() => setSubType("newsletter")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      subType === "newsletter"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    Newsletter ({subscribers.newsletter.length})
                  </button>
                  <button
                    onClick={() => setSubType("whatsapp")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      subType === "whatsapp"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    WhatsApp ({subscribers.whatsapp.length})
                  </button>
                </div>
              ) : activeTab === "mentors" ? (
                <div className="flex rounded-md border border-muted overflow-hidden w-full sm:w-auto">
                  <button
                    onClick={() => setMentorMediumFilter("all")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      mentorMediumFilter === "all"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    All Mediums
                  </button>
                  <button
                    onClick={() => setMentorMediumFilter("hindi")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      mentorMediumFilter === "hindi"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    Hindi ({facultiesList.filter(f => f.medium === "hindi").length})
                  </button>
                  <button
                    onClick={() => setMentorMediumFilter("english")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      mentorMediumFilter === "english"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    English ({facultiesList.filter(f => f.medium === "english").length})
                  </button>
                </div>
              ) : activeTab === "batches" ? (
                <div className="flex rounded-md border border-muted overflow-hidden w-full sm:w-auto">
                  <button
                    onClick={() => setBatchMediumFilter("all")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      batchMediumFilter === "all"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setBatchMediumFilter("hindi")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      batchMediumFilter === "hindi"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    Hindi ({offlineBatchesList.filter(f => f.medium === "hindi").length})
                  </button>
                  <button
                    onClick={() => setBatchMediumFilter("english")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      batchMediumFilter === "english"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    English ({offlineBatchesList.filter(f => f.medium === "english").length})
                  </button>
                  <button
                    onClick={() => setBatchMediumFilter("bilingual")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      batchMediumFilter === "bilingual"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    Bilingual ({offlineBatchesList.filter(f => f.medium === "bilingual").length})
                  </button>
                </div>
              ) : activeTab === "onlineCourses" ? (
                <div className="flex rounded-md border border-muted overflow-hidden w-full sm:w-auto">
                  <button
                    onClick={() => setCourseCategoryFilter("all")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      courseCategoryFilter === "all"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setCourseCategoryFilter("live")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      courseCategoryFilter === "live"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    Live ({onlineCoursesList.filter(c => c.isLive).length})
                  </button>
                  <button
                    onClick={() => setCourseCategoryFilter("upsc")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      courseCategoryFilter === "upsc"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    UPSC ({onlineCoursesList.filter(c => c.category === "upsc").length})
                  </button>
                  <button
                    onClick={() => setCourseCategoryFilter("mppsc")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      courseCategoryFilter === "mppsc"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    MPPSC ({onlineCoursesList.filter(c => c.category === "mppsc").length})
                  </button>
                  <button
                    onClick={() => setCourseCategoryFilter("mpsi")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold transition ${
                      courseCategoryFilter === "mpsi"
                        ? "bg-muted text-foreground font-bold"
                        : "bg-background text-muted-foreground hover:bg-muted/20"
                    }`}
                  >
                    MPSI ({onlineCoursesList.filter(c => c.category === "mpsi").length})
                  </button>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground font-semibold uppercase">
                  {activeTab === "messages" && "Contact Message Inquiries"}
                  {activeTab === "downloads" && "PDF Download logs"}
                  {activeTab === "students" && "Registered Student Accounts"}
                  {activeTab === "pages" && "Exposed Website Pages & CMS Status"}
                  {activeTab === "testSeries" && "Test Series Batches"}
                  {activeTab === "testSchedules" && "Test Schedules List"}
                  {activeTab === "quizzes" && "Daily Current Affairs Quizzes"}
                  {activeTab === "publications" && "Publications (Books)"}
                </span>
              )}

              {/* Action buttons + Search Field */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {activeTab === "mentors" && (
                  <button
                    onClick={() => {
                      setEditingMentor(null);
                      setFormNameHi("");
                      setFormNameEn("");
                      setFormTitleHi("");
                      setFormTitleEn("");
                      setFormDescHi("");
                      setFormDescEn("");
                      setFormMedium("hindi");
                      setFormOrderIndex(0);
                      setFormImageFile(null);
                      setImagePreview(null);
                      setExistingImageUrl(null);
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Senior Mentor
                  </button>
                )}

                {activeTab === "batches" && (
                  <button
                    onClick={openAddBatchModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Offline Batch
                  </button>
                )}

                {activeTab === "onlineCourses" && (
                  <button
                    onClick={openAddCourseModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Online Course
                  </button>
                )}

                {activeTab === "testSeries" && (
                  <button
                    onClick={openAddTestSeriesModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Test Series
                  </button>
                )}

                {activeTab === "testSchedules" && (
                  <button
                    onClick={openAddScheduleModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Test Schedule
                  </button>
                )}

                {activeTab === "quizzes" && (
                  <a
                    href={quizSubTab === "daily" ? "/studio/structure/currentAffairs" : "/studio/structure/subjectQuiz"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {quizSubTab === "daily" ? "Create Daily Quiz" : "Create Subject Quiz"}
                  </a>
                )}

                {activeTab === "publications" && (
                  <a
                    href="/studio/structure/publication"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Publication
                  </a>
                )}
                {activeTab === "notices" && (
                  <button
                    onClick={openAddNoticeModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Notice
                  </button>
                )}

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border border-muted bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="p-0 overflow-x-auto min-h-[300px]">
              
              {/* Tab: Subscribers */}
              {activeTab === "subscribers" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/10 border-b border-muted text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <th className="px-6 py-3.5">Subscriber Identifier</th>
                      <th className="px-6 py-3.5">Locale</th>
                      <th className="px-6 py-3.5">Source</th>
                      <th className="px-6 py-3.5">Active</th>
                      <th className="px-6 py-3.5">Date Subscribed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/50 text-sm">
                    {filteredSubs.length > 0 ? (
                      filteredSubs.map((sub: AdminSubscriber) => (
                        <tr key={sub.id} className="hover:bg-muted/5 transition">
                          <td className="px-6 py-3.5 font-medium text-foreground">
                            {subType === "newsletter" ? sub.email : sub.phone}
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="uppercase px-2 py-0.5 rounded-full text-2xs font-bold bg-muted text-foreground">
                              {sub.locale}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-muted-foreground">
                            {sub.source || "Direct"}
                          </td>
                          <td className="px-6 py-3.5">
                            <span className={`inline-flex items-center gap-1 text-xs font-medium ${sub.active ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${sub.active ? "bg-emerald-500" : "bg-muted"}`} />
                              {sub.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-muted-foreground">
                            {new Date(sub.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                          No subscribers found matching the query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab: Messages */}
              {activeTab === "messages" && (
                <div className="space-y-4">
                  {/* Filters & Export Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/20 p-4 rounded-xl border border-border/60">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-sans">Date Filter:</span>
                        <select
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value as any)}
                          className="h-9 px-3 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer font-sans"
                        >
                          <option value="all">All Time</option>
                          <option value="today">Today</option>
                          <option value="yesterday">Yesterday</option>
                          <option value="custom">Custom Range</option>
                        </select>
                      </div>

                      {dateFilter === "custom" && (
                        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="h-9 px-3 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans"
                            placeholder="Start Date"
                          />
                          <span className="text-xs text-muted-foreground">to</span>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="h-9 px-3 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans"
                            placeholder="End Date"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleExportInquiriesCSV}
                      disabled={filteredGeneralMessages.length === 0}
                      className="h-9 px-4 bg-primary text-primary-foreground font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary/95 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm font-sans"
                    >
                      <FileDown className="h-4 w-4 shrink-0" />
                      Export Excel (CSV)
                    </button>
                  </div>

                  {/* Spreadsheet style Table */}
                  <div className="border border-border/80 rounded-xl overflow-hidden shadow-xs bg-background">
                    <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                      <table className="w-full text-left border-collapse font-sans text-xs">
                        <thead>
                          <tr className="bg-muted/40 border-b border-border sticky top-0 z-10">
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Date</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Name</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Mobile</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Email</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">City</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Exam</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Batch</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Mode</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Medium</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Interests</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Status</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {filteredGeneralMessages.length > 0 ? (
                            filteredGeneralMessages.map((msg: AdminMessage, index) => {
                              const lines = msg.message.split("\n");
                              const city = lines.find(l => l.startsWith("City: "))?.replace("City: ", "") || "-";
                              const exam = lines.find(l => l.startsWith("Exam: "))?.replace("Exam: ", "") || "-";
                              const batch = lines.find(l => l.startsWith("Batch: "))?.replace("Batch: ", "") || "-";
                              const mode = lines.find(l => l.startsWith("Mode: "))?.replace("Mode: ", "") || "-";
                              const medium = lines.find(l => l.startsWith("Medium: "))?.replace("Medium: ", "") || "-";
                              const interests = lines.find(l => l.startsWith("Interests: "))?.replace("Interests: ", "") || "-";

                              const isPopupInquiry = msg.subject?.startsWith("Inquiry Popup");
                              const isExpanded = expandedMsgId === msg.id;
                              
                              return (
                                <React.Fragment key={msg.id}>
                                  <tr 
                                    className={cn(
                                      "hover:bg-muted/10 transition duration-150 cursor-pointer select-none",
                                      msg.status === "new" ? "bg-primary/2 font-medium" : index % 2 === 0 ? "bg-background" : "bg-muted/5",
                                      isExpanded && "bg-muted/10"
                                    )}
                                    onClick={() => setExpandedMsgId(isExpanded ? null : msg.id)}
                                  >
                                    <td className="p-3 whitespace-nowrap text-muted-foreground text-[11px]">
                                      {new Date(msg.created_at).toLocaleString()}
                                    </td>
                                    <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                                      <div className="flex items-center gap-1">
                                        <Eye className="h-3 w-3 shrink-0 text-muted-foreground" />
                                        {msg.name}
                                      </div>
                                    </td>
                                    <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                                      {msg.phone || "-"}
                                    </td>
                                    <td className="p-3 text-muted-foreground whitespace-nowrap">
                                      {msg.email}
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-foreground">
                                      {city}
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                      {isPopupInquiry ? (
                                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 font-extrabold text-[10px] uppercase border border-amber-500/20">
                                          {exam}
                                        </span>
                                      ) : (
                                        <span className="text-muted-foreground italic text-[10px]">Contact Us</span>
                                      )}
                                    </td>
                                    <td className="p-3 whitespace-nowrap font-medium text-foreground">
                                      {batch}
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                      {isPopupInquiry ? (
                                        <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 font-bold text-[10px] border border-blue-500/10">
                                          {mode}
                                        </span>
                                      ) : (
                                        "-"
                                      )}
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-muted-foreground">
                                      {medium}
                                    </td>
                                    <td className="p-3 max-w-[150px] truncate text-muted-foreground" title={interests}>
                                      {interests}
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                                        msg.status === "new" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20" :
                                        msg.status === "replied" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" :
                                        "bg-muted text-muted-foreground border border-border/60"
                                      }`}>
                                        {msg.status}
                                      </span>
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                                      <div className="flex items-center justify-end gap-1.5">
                                        {msg.status !== "replied" && (
                                          <button
                                            disabled={isPending}
                                            onClick={() => handleUpdateMessageStatus(msg.id, "replied")}
                                            className="p-1 rounded border border-border bg-background hover:bg-muted/40 text-emerald-600 transition cursor-pointer"
                                            title="Mark as Replied"
                                          >
                                            <Check className="h-3.5 w-3.5" />
                                          </button>
                                        )}
                                        {msg.status !== "archived" && (
                                          <button
                                            disabled={isPending}
                                            onClick={() => handleUpdateMessageStatus(msg.id, "archived")}
                                            className="p-1 rounded border border-border bg-background hover:bg-muted/40 text-muted-foreground transition cursor-pointer"
                                            title="Archive message"
                                          >
                                            <Archive className="h-3.5 w-3.5" />
                                          </button>
                                        )}
                                        {msg.status !== "read" && msg.status !== "replied" && (
                                          <button
                                            disabled={isPending}
                                            onClick={() => handleUpdateMessageStatus(msg.id, "read")}
                                            className="p-1 rounded border border-border bg-background hover:bg-muted/40 text-blue-600 transition cursor-pointer"
                                            title="Mark as Read"
                                          >
                                            <CheckCircle className="h-3.5 w-3.5" />
                                          </button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                  {isExpanded && (
                                    <tr className="bg-muted/5 border-b border-border/60">
                                      <td colSpan={12} className="p-4" onClick={(e) => e.stopPropagation()}>
                                        <div className="space-y-3 text-xs leading-relaxed max-w-4xl bg-background border border-border/85 rounded-xl p-4 shadow-xs">
                                          <div>
                                            <h5 className="font-extrabold text-foreground mb-1 uppercase tracking-wider text-[9px]">Subject / Title:</h5>
                                            <p className="text-foreground font-semibold bg-muted/40 px-3 py-1.5 rounded-lg border border-border/40 inline-block font-sans">{msg.subject || "No Subject"}</p>
                                          </div>
                                          <div>
                                            <h5 className="font-extrabold text-foreground mb-1 uppercase tracking-wider text-[9px]">Message Details:</h5>
                                            <pre className="bg-muted/20 border border-border/40 rounded-lg p-3 font-mono text-xs whitespace-pre-wrap text-foreground leading-normal">{msg.message}</pre>
                                          </div>
                                          <div className="flex flex-wrap gap-4 text-[10px] text-muted-foreground pt-1.5 border-t border-border/40">
                                            <span><strong>Submitted:</strong> {new Date(msg.created_at).toLocaleString()}</span>
                                            <span><strong>Language:</strong> {msg.locale.toUpperCase()}</span>
                                            {msg.user_agent && <span className="truncate"><strong>User Agent:</strong> {msg.user_agent}</span>}
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={12} className="p-12 text-center text-muted-foreground font-sans">
                                No inquiries found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Offline Enquiries */}
              {activeTab === "offlineEnquiries" && (
                <div className="space-y-4">
                  {/* Filters & Export Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/20 p-4 rounded-xl border border-border/60">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-sans">Date Filter:</span>
                        <select
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value as any)}
                          className="h-9 px-3 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer font-sans"
                        >
                          <option value="all">All Time</option>
                          <option value="today">Today</option>
                          <option value="yesterday">Yesterday</option>
                          <option value="custom">Custom Range</option>
                        </select>
                      </div>

                      {dateFilter === "custom" && (
                        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="h-9 px-3 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans"
                            placeholder="Start Date"
                          />
                          <span className="text-xs text-muted-foreground">to</span>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="h-9 px-3 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans"
                            placeholder="End Date"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleExportOfflineEnquiriesCSV}
                      disabled={filteredOfflineEnquiries.length === 0}
                      className="h-9 px-4 bg-primary text-primary-foreground font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary/95 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm font-sans"
                    >
                      <FileDown className="h-4 w-4 shrink-0" />
                      Export Excel (CSV)
                    </button>
                  </div>

                  {/* Spreadsheet style Table */}
                  <div className="border border-border/80 rounded-xl overflow-hidden shadow-xs bg-background">
                    <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                      <table className="w-full text-left border-collapse font-sans text-xs">
                        <thead>
                          <tr className="bg-muted/40 border-b border-border sticky top-0 z-10">
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Date</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Student Name</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Mobile</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Batch Name</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Locale</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Status</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {filteredOfflineEnquiries.length > 0 ? (
                            filteredOfflineEnquiries.map((msg: AdminMessage, index) => {
                              const batchLine = msg.message.split("\n").find(l => l.startsWith("Batch: "));
                              const batchName = batchLine ? batchLine.replace("Batch: ", "") : "-";
                              const isExpanded = expandedMsgId === msg.id;
                              
                              return (
                                <React.Fragment key={msg.id}>
                                  <tr 
                                    className={cn(
                                      "hover:bg-muted/10 transition duration-150 cursor-pointer select-none",
                                      msg.status === "new" ? "bg-primary/2 font-medium" : index % 2 === 0 ? "bg-background" : "bg-muted/5",
                                      isExpanded && "bg-muted/10"
                                    )}
                                    onClick={() => setExpandedMsgId(isExpanded ? null : msg.id)}
                                  >
                                    <td className="p-3 whitespace-nowrap text-muted-foreground text-[11px]">
                                      {new Date(msg.created_at).toLocaleString()}
                                    </td>
                                    <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                                      <div className="flex items-center gap-1">
                                        <Eye className="h-3 w-3 shrink-0 text-muted-foreground" />
                                        {msg.name}
                                      </div>
                                    </td>
                                    <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                                      {msg.phone || "-"}
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-foreground font-medium">
                                      {batchName}
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-muted-foreground uppercase text-[10px]">
                                      {msg.locale}
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                      <span className={cn(
                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                        msg.status === "new" ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" :
                                        msg.status === "read" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                                        "bg-muted text-muted-foreground border border-border"
                                      )}>
                                        {msg.status}
                                      </span>
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                                      <div className="flex items-center justify-end gap-1">
                                        {msg.status === "new" ? (
                                          <button
                                            onClick={() => handleUpdateMessageStatus(msg.id, "read")}
                                            className="p-1 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition"
                                            title="Mark as Read"
                                          >
                                            <Check className="h-3.5 w-3.5" />
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => handleUpdateMessageStatus(msg.id, "new" as any)}
                                            className="p-1 rounded bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700 transition"
                                            title="Mark as Unread"
                                          >
                                            <Archive className="h-3.5 w-3.5" />
                                          </button>
                                        )}
                                        <button
                                          onClick={() => handleUpdateMessageStatus(msg.id, "archived")}
                                          className="p-1 rounded bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition"
                                          title="Archive Lead"
                                        >
                                          <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                  {isExpanded && (
                                    <tr className="bg-muted/5">
                                      <td colSpan={7} className="p-4 border-t border-b border-border/40">
                                        <div className="bg-background rounded-lg border border-border/60 p-4 space-y-3 shadow-xs">
                                          <div>
                                            <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Raw Lead Message</h5>
                                            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed font-sans">{msg.message}</p>
                                          </div>
                                          <div className="flex flex-wrap gap-4 text-[10px] text-muted-foreground pt-1.5 border-t border-border/40">
                                            <span><strong>Submitted:</strong> {new Date(msg.created_at).toLocaleString()}</span>
                                            <span><strong>Language:</strong> {msg.locale.toUpperCase()}</span>
                                            {msg.user_agent && <span className="truncate"><strong>User Agent:</strong> {msg.user_agent}</span>}
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={7} className="p-12 text-center text-muted-foreground font-sans">
                                No offline enquiries found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Online Leads */}
              {activeTab === "onlineLeads" && (
                <div className="space-y-4">
                  {/* Filters & Export Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/20 p-4 rounded-xl border border-border/60">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-sans">Date Filter:</span>
                        <select
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value as any)}
                          className="h-9 px-3 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer font-sans"
                        >
                          <option value="all">All Time</option>
                          <option value="today">Today</option>
                          <option value="7days">Last 7 Days</option>
                          <option value="30days">Last 30 Days</option>
                          <option value="custom">Custom Range</option>
                        </select>
                      </div>
                      {dateFilter === "custom" && (
                        <div className="flex items-center gap-2">
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="h-9 px-3 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans"
                            placeholder="Start Date"
                          />
                          <span className="text-xs text-muted-foreground">to</span>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="h-9 px-3 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans"
                            placeholder="End Date"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleExportOnlineLeadsCSV}
                      disabled={filteredOnlineLeads.length === 0}
                      className="h-9 px-4 bg-primary text-primary-foreground font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary/95 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm font-sans"
                    >
                      <FileDown className="h-4 w-4 shrink-0" />
                      Export Excel (CSV)
                    </button>
                  </div>

                  {/* Spreadsheet style Table */}
                  <div className="border border-border/80 rounded-xl overflow-hidden shadow-xs bg-background">
                    <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                      <table className="w-full text-left border-collapse font-sans text-xs">
                        <thead>
                          <tr className="bg-muted/40 border-b border-border sticky top-0 z-10">
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Date</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Student Name</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Mobile</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Course Name</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Locale</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap">Status</th>
                            <th className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground text-[10px] bg-muted/40 whitespace-nowrap text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {filteredOnlineLeads.length > 0 ? (
                            filteredOnlineLeads.map((msg: AdminMessage, index) => {
                              const courseName = msg.subject?.replace("Online Enrollment Lead: ", "") || "-";
                              const isExpanded = expandedMsgId === msg.id;
                              
                              return (
                                <React.Fragment key={msg.id}>
                                  <tr 
                                    className={cn(
                                      "hover:bg-muted/10 transition duration-150 cursor-pointer select-none",
                                      msg.status === "new" ? "bg-primary/2 font-medium" : index % 2 === 0 ? "bg-background" : "bg-muted/5",
                                      isExpanded && "bg-muted/10"
                                    )}
                                    onClick={() => setExpandedMsgId(isExpanded ? null : msg.id)}
                                  >
                                    <td className="p-3 whitespace-nowrap text-muted-foreground text-[11px]">
                                      {new Date(msg.created_at).toLocaleString()}
                                    </td>
                                    <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                                      <div className="flex items-center gap-1">
                                        <Eye className="h-3 w-3 shrink-0 text-muted-foreground" />
                                        {msg.name}
                                      </div>
                                    </td>
                                    <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                                      {msg.phone || "-"}
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-foreground font-medium">
                                      {courseName}
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-muted-foreground uppercase text-[10px]">
                                      {msg.locale}
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                      <span className={cn(
                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                        msg.status === "new" ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"
                                      )}>
                                        {msg.status}
                                      </span>
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                                      <div className="flex items-center justify-end gap-1">
                                        {msg.status === "new" ? (
                                          <button
                                            onClick={() => handleUpdateMessageStatus(msg.id, "read")}
                                            className="p-1 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition"
                                            title="Mark as Read"
                                          >
                                            <Check className="h-3.5 w-3.5" />
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => handleUpdateMessageStatus(msg.id, "new" as any)}
                                            className="p-1 rounded bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700 transition"
                                            title="Mark as Unread"
                                          >
                                            <Archive className="h-3.5 w-3.5" />
                                          </button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                  {isExpanded && (
                                    <tr className="bg-muted/10">
                                      <td colSpan={7} className="p-4">
                                        <div className="text-xs text-muted-foreground font-sans space-y-1">
                                          <p><strong>Subject:</strong> {msg.subject}</p>
                                          <p><strong>Message:</strong> {msg.message}</p>
                                          <p><strong>Email:</strong> {msg.email}</p>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={7} className="p-12 text-center text-muted-foreground font-sans">
                                No online enrollment leads found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Downloads */}
              {activeTab === "downloads" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/10 border-b border-muted text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <th className="px-6 py-3.5">Resource Slug</th>
                      <th className="px-6 py-3.5">Title</th>
                      <th className="px-6 py-3.5">Kind</th>
                      <th className="px-6 py-3.5">Locale</th>
                      <th className="px-6 py-3.5">Downloads Count</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/50 text-sm">
                    {filteredDownloads.length > 0 ? (
                      filteredDownloads.map((dl: AdminDownload) => (
                        <tr key={dl.id} className="hover:bg-muted/5 transition">
                          <td className="px-6 py-3.5 font-medium text-foreground">
                            {dl.resource_slug}
                          </td>
                          <td className="px-6 py-3.5 font-medium text-foreground">
                            {dl.title}
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="px-2 py-0.5 rounded-full text-2xs font-semibold bg-primary/10 text-primary">
                              {dl.kind}
                            </span>
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="uppercase px-2 py-0.5 rounded-full text-2xs font-bold bg-muted text-foreground">
                              {dl.locale}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 font-bold text-foreground">
                            {dl.count}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                          No download history found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab: Students */}
              {activeTab === "students" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/10 border-b border-muted text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <th className="px-6 py-3.5">User ID</th>
                      <th className="px-6 py-3.5">Full Name</th>
                      <th className="px-6 py-3.5">Target Exam</th>
                      <th className="px-6 py-3.5">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/50 text-sm">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((st: AdminStudent) => (
                        <tr key={st.id} className="hover:bg-muted/5 transition">
                          <td className="px-6 py-3.5 font-mono text-2xs text-muted-foreground">
                            {st.id}
                          </td>
                          <td className="px-6 py-3.5 font-medium text-foreground">
                            {st.full_name || "Student"}
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="px-2.5 py-0.5 rounded-full text-2xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                              {st.target_exam}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-muted-foreground">
                            {new Date(st.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                          No student accounts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab: Website Pages */}
              {activeTab === "pages" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/10 border-b border-muted text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <th className="px-6 py-3.5">Page Name</th>
                      <th className="px-6 py-3.5">Path / Slug</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/50 text-sm">
                    {STATIC_PAGES_META.filter(p => 
                      searchQuery === "" || 
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.slug.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((page) => {
                      const sanityPage = staticPages.find((sp: { slug: string; _id: string }) => sp.slug === page.slug);
                      const isDynamic = !!sanityPage;
                      const editUrl = isDynamic 
                        ? `/studio/structure/staticPage;${sanityPage._id}`
                        : `/studio/structure/staticPage`;

                      return (
                        <tr key={page.slug} className="hover:bg-muted/5 transition">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-foreground">{page.name}</div>
                            <div className="text-xs text-muted-foreground">{page.nameEn}</div>
                          </td>
                          <td className="px-6 py-4">
                            <code className="text-xs font-mono bg-muted/40 px-1.5 py-0.5 rounded text-foreground/80">
                              {page.path}
                            </code>
                          </td>
                          <td className="px-6 py-4">
                            {isDynamic ? (
                              <span className="inline-flex items-center gap-1 text-2xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full">
                                <CheckCircle className="h-3 w-3" /> Dynamic CMS
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-2xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full">
                                <Award className="h-3 w-3" /> Local Fallback
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap items-center gap-2">
                              <a
                                href={page.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
                              >
                                View (HI) <ExternalLink className="h-3 w-3" />
                              </a>
                              <span className="text-muted-foreground/30">|</span>
                              <a
                                href={`/en${page.path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
                              >
                                View (EN) <ExternalLink className="h-3 w-3" />
                              </a>
                              <span className="text-muted-foreground/30">|</span>
                              <a
                                href={editUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold"
                              >
                                {isDynamic ? "Edit in Studio" : "Create in Studio"} <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {/* Tab: Senior Mentors */}
              {activeTab === "mentors" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/10 border-b border-muted text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <th className="px-6 py-3.5 w-20">Photo</th>
                      <th className="px-6 py-3.5">Details (Hindi)</th>
                      <th className="px-6 py-3.5">Details (English)</th>
                      <th className="px-6 py-3.5 font-medium">Medium</th>
                      <th className="px-6 py-3.5 font-medium">Sort Order</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/50 text-sm">
                    {filteredMentors.length > 0 ? (
                      filteredMentors.map((mentor: Faculty) => (
                        <tr key={mentor.id} className="hover:bg-muted/5 transition">
                          <td className="px-6 py-4">
                            <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-muted bg-muted">
                              {mentor.image ? (
                                <img
                                  src={mentor.image}
                                  alt={mentor.nameEn}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                                  <GraduationCap className="h-6 w-6" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-foreground">{mentor.nameHi}</div>
                            <div className="text-xs text-primary font-medium">{mentor.titleHi}</div>
                            {mentor.descHi && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 max-w-xs">{mentor.descHi}</p>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-foreground">{mentor.nameEn}</div>
                            <div className="text-xs text-primary font-medium">{mentor.titleEn}</div>
                            {mentor.descEn && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 max-w-xs">{mentor.descEn}</p>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-2xs font-bold ${
                              mentor.medium === "hindi" 
                                ? "bg-orange-500/10 text-orange-600 dark:text-orange-400" 
                                : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            }`}>
                              {mentor.medium === "hindi" ? "Hindi" : "English"}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-foreground">
                            {mentor.orderIndex}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingMentor(mentor);
                                  setFormNameHi(mentor.nameHi);
                                  setFormNameEn(mentor.nameEn);
                                  setFormTitleHi(mentor.titleHi);
                                  setFormTitleEn(mentor.titleEn);
                                  setFormDescHi(mentor.descHi || "");
                                  setFormDescEn(mentor.descEn || "");
                                  setFormMedium(mentor.medium);
                                  setFormOrderIndex(mentor.orderIndex || 0);
                                  setFormImageFile(null);
                                  setImagePreview(null);
                                  setExistingImageUrl(mentor.image || null);
                                  setIsModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-amber-600 dark:text-amber-400 transition cursor-pointer"
                                title="Edit Mentor"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                disabled={isPending}
                                onClick={() => handleDeleteMentor(mentor)}
                                className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-destructive hover:bg-destructive/5 transition cursor-pointer"
                                title="Delete Mentor"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                          No mentors found matching the query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab: Offline Classroom Batches */}
              {activeTab === "batches" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/10 border-b border-muted text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <th className="px-6 py-3.5">Batch Title</th>
                      <th className="px-6 py-3.5">Start Date</th>
                      <th className="px-6 py-3.5">Timing</th>
                      <th className="px-6 py-3.5">Medium</th>
                      <th className="px-6 py-3.5">Filled</th>
                      <th className="px-6 py-3.5 font-medium">Sort Order</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/50 text-sm">
                    {filteredBatches.length > 0 ? (
                      filteredBatches.map((batch: OfflineBatch) => (
                        <tr key={batch.id} className="hover:bg-muted/5 transition">
                          <td className="px-6 py-4">
                            <div className="font-bold text-foreground">{batch.titleHi}</div>
                            <div className="text-xs text-muted-foreground">{batch.titleEn}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {batch.badgeHi && (
                                <span className="inline-block bg-primary/10 text-primary text-3xs font-bold rounded px-1.5 py-0.5">
                                  {batch.badgeHi}
                                </span>
                              )}
                              {batch.badgeEn && (
                                <span className="inline-block bg-muted/65 text-muted-foreground text-3xs font-semibold rounded px-1.5 py-0.5">
                                  {batch.badgeEn}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-foreground font-medium">{batch.startDateHi}</div>
                            <div className="text-xs text-muted-foreground">{batch.startDateEn}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-foreground font-medium">{batch.timeHi}</div>
                            <div className="text-xs text-muted-foreground">{batch.timeEn}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-2xs font-bold ${
                              batch.medium === "bilingual"
                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                : batch.medium === "hindi"
                                  ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                                  : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            }`}>
                              {batch.medium === "bilingual" ? "Bilingual" : batch.medium === "hindi" ? "Hindi" : "English"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-foreground">{batch.seatsFillPercent}%</div>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-foreground">
                            {batch.orderIndex}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditBatchModal(batch)}
                                className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-amber-600 dark:text-amber-400 transition cursor-pointer"
                                title="Edit Batch"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                disabled={isPending}
                                onClick={() => handleDeleteBatch(batch.id)}
                                className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-destructive hover:bg-destructive/5 transition cursor-pointer"
                                title="Delete Batch"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                          No offline classroom batches found matching the query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab: Online Courses */}
              {activeTab === "onlineCourses" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-muted bg-muted/20 text-muted-foreground text-xs uppercase font-bold">
                      <th className="px-6 py-3.5 w-16">Cover</th>
                      <th className="px-6 py-3.5">Course Details</th>
                      <th className="px-6 py-3.5">Pricing</th>
                      <th className="px-6 py-3.5">Mentor</th>
                      <th className="px-6 py-3.5 w-24">Category</th>
                      <th className="px-6 py-3.5 w-20">Live?</th>
                      <th className="px-6 py-3.5 w-20">Sort</th>
                      <th className="px-6 py-3.5 text-right w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/50 text-sm">
                    {filteredCoursesList.length > 0 ? (
                      filteredCoursesList.map((course: OnlineCourse) => (
                        <tr key={course.id} className="hover:bg-muted/5 transition">
                          <td className="px-6 py-4">
                            <div className="h-10 w-16 rounded overflow-hidden bg-muted border border-border relative">
                              {course.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={course.image}
                                  alt={course.titleEn}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                                  <Video className="h-5 w-5" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-foreground line-clamp-1">{course.titleHi}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">{course.titleEn}</div>
                            <div className="text-2xs font-mono text-muted-foreground mt-1">Slug: {course.slug}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {course.badgeHi && (
                                <span className="inline-block bg-primary/10 text-primary text-3xs font-bold rounded px-1.5 py-0.5">
                                  {course.badgeHi}
                                </span>
                              )}
                              {course.badgeEn && (
                                <span className="inline-block bg-muted/65 text-muted-foreground text-3xs font-semibold rounded px-1.5 py-0.5">
                                  {course.badgeEn}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-primary">{course.price}</div>
                            <div className="text-xs text-muted-foreground line-through">{course.originalPrice}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-foreground font-medium">{course.mentorNameEn || course.mentorNameHi}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">{course.mentorTitleEn}</div>
                          </td>
                          <td className="px-6 py-4 capitalize font-medium text-foreground">
                            {course.category}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-3xs font-bold uppercase ${
                              course.isLive 
                                ? "bg-red-500/10 text-red-600 dark:text-red-400" 
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {course.isLive ? "LIVE" : "Recorded"}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-foreground">
                            {course.orderIndex}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditCourseModal(course)}
                                className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-amber-600 dark:text-amber-400 transition cursor-pointer"
                                title="Edit Course"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                disabled={isPending}
                                onClick={() => handleDeleteCourse(course.id)}
                                className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-destructive hover:bg-destructive/5 transition cursor-pointer"
                                title="Delete Course"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                          No online courses found matching the query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab: Test Series */}
              {activeTab === "testSeries" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-muted bg-muted/20 text-muted-foreground text-xs uppercase font-bold">
                      <th className="px-6 py-3.5">Test Series Details</th>
                      <th className="px-6 py-3.5">Pricing</th>
                      <th className="px-6 py-3.5">Buy Link</th>
                      <th className="px-6 py-3.5 w-24">Status</th>
                      <th className="px-6 py-3.5 w-20">Sort</th>
                      <th className="px-6 py-3.5 text-right w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/50 text-sm">
                    {filteredTestSeriesList.length > 0 ? (
                      filteredTestSeriesList.map((test) => (
                        <tr key={test.id} className="hover:bg-muted/5 transition">
                          <td className="px-6 py-4">
                            <div className="font-bold text-foreground line-clamp-1">{test.title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">{(test as TestSeries & { titleEn?: string }).titleEn || ""}</div>
                            <div className="text-2xs font-mono text-muted-foreground mt-1">Slug: {test.slug}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {test.badgeHi && (
                                <span className="inline-block bg-primary/10 text-primary text-3xs font-bold rounded px-1.5 py-0.5">
                                  {test.badgeHi}
                                </span>
                              )}
                              {test.badgeEn && (
                                <span className="inline-block bg-muted/65 text-muted-foreground text-3xs font-semibold rounded px-1.5 py-0.5">
                                  {test.badgeEn}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-primary">₹{test.price?.toLocaleString()}</div>
                            {test.originalPrice && (
                              <div className="text-xs text-muted-foreground line-through">₹{test.originalPrice.toLocaleString()}</div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {test.buyLink ? (
                              <a href={test.buyLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1 font-medium">
                                View Link <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-xs text-muted-foreground italic">None</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-3xs font-bold uppercase ${
                              test.active 
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {test.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-foreground">
                            {test.orderIndex}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditTestSeriesModal(test)}
                                className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-amber-600 dark:text-amber-400 transition cursor-pointer"
                                title="Edit Test Series"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                disabled={isPending}
                                onClick={() => handleDeleteTestSeries(test.id)}
                                className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-destructive hover:bg-destructive/5 transition cursor-pointer"
                                title="Delete Test Series"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                          No test series found matching the query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab: Test Schedules */}
              {activeTab === "testSchedules" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-muted bg-muted/20 text-muted-foreground text-xs uppercase font-bold">
                      <th className="px-6 py-3.5 w-32">Date</th>
                      <th className="px-6 py-3.5 w-32">Code</th>
                      <th className="px-6 py-3.5">Test Details</th>
                      <th className="px-6 py-3.5">Syllabus / Focus</th>
                      <th className="px-6 py-3.5 w-20">Sort</th>
                      <th className="px-6 py-3.5 text-right w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/50 text-sm">
                    {filteredTestSchedulesList.length > 0 ? (
                      filteredTestSchedulesList.map((schedule) => (
                        <tr key={schedule.id} className="hover:bg-muted/5 transition">
                          <td className="px-6 py-4 font-mono font-semibold text-foreground">
                            {schedule.date}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block bg-primary/10 text-primary text-2xs font-extrabold rounded px-2 py-0.5 uppercase">
                              {schedule.code}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-foreground">{schedule.titleHi}</div>
                            <div className="text-xs text-muted-foreground">{schedule.titleEn}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-xs text-foreground line-clamp-2">{schedule.focusHi || "-"}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2">{schedule.focusEn || "-"}</div>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-foreground">
                            {schedule.orderIndex}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditScheduleModal(schedule)}
                                className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-amber-600 dark:text-amber-400 transition cursor-pointer"
                                title="Edit Schedule"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                disabled={isPending}
                                onClick={() => handleDeleteSchedule(schedule.id)}
                                className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-destructive hover:bg-destructive/5 transition cursor-pointer"
                                title="Delete Schedule"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                          No test schedules found matching the query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab: Daily Quizzes */}
              {activeTab === "quizzes" && (
                <div className="space-y-4">
                  {/* Quizzes Sub-tab switcher */}
                  <div className="flex gap-2 border-b border-muted pb-3 mb-2">
                    <button
                      onClick={() => setQuizSubTab("daily")}
                      className={cn(
                        "px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer",
                        quizSubTab === "daily"
                          ? "bg-primary text-primary-foreground shadow-sm font-bold"
                          : "bg-muted/40 hover:bg-muted/65 text-muted-foreground"
                      )}
                    >
                      Daily Quizzes (दैनिक क्विज़)
                    </button>
                    <button
                      onClick={() => setQuizSubTab("subject")}
                      className={cn(
                        "px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer",
                        quizSubTab === "subject"
                          ? "bg-primary text-primary-foreground shadow-sm font-bold"
                          : "bg-muted/40 hover:bg-muted/65 text-muted-foreground"
                      )}
                    >
                      Subject-wise Quizzes (विषय-वार क्विज़)
                    </button>
                  </div>

                  {quizSubTab === "subject" ? (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-muted bg-muted/20 text-muted-foreground text-xs uppercase font-bold">
                          <th className="px-6 py-3.5 w-32">Subject</th>
                          <th className="px-6 py-3.5">Quiz Details</th>
                          <th className="px-6 py-3.5 w-40">Questions Count</th>
                          <th className="px-6 py-3.5 text-right w-44">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-muted/50 text-sm">
                        {filteredSubjectQuizzesList.length > 0 ? (
                          filteredSubjectQuizzesList.map((quiz) => (
                            <tr key={quiz.id} className="hover:bg-muted/5 transition">
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-2xs font-bold bg-primary/10 text-primary uppercase font-mono tracking-wider">
                                  {quiz.subject || "GENERAL"}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-bold text-foreground">{quiz.titleHi || "विषय-वार क्विज़"}</div>
                                <div className="text-xs text-muted-foreground">{quiz.titleEn || "Subject Quiz"}</div>
                                {quiz.descriptionEn && (
                                  <div className="text-2xs text-muted-foreground mt-0.5 line-clamp-1">{quiz.descriptionEn}</div>
                                )}
                              </td>
                              <td className="px-6 py-4 font-mono font-bold text-foreground">
                                {quiz.mcqs?.length || 0} Questions
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <a
                                    href={`/studio/structure/subjectQuiz;${quiz.id.replace("drafts.", "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-primary transition cursor-pointer text-xs font-semibold"
                                    title="Edit in Sanity Studio"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Edit in Sanity
                                  </a>
                                  <a
                                    href={`/en/daily-quiz`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-foreground transition cursor-pointer text-xs font-semibold"
                                    title="Preview Subject Quiz"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    Preview
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                              No subject-wise quizzes found matching the query.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-muted bg-muted/20 text-muted-foreground text-xs uppercase font-bold">
                          <th className="px-6 py-3.5 w-32">Date</th>
                          <th className="px-6 py-3.5">Quiz Details</th>
                          <th className="px-6 py-3.5 w-40">Questions Count</th>
                          <th className="px-6 py-3.5 text-right w-44">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-muted/50 text-sm">
                        {filteredQuizzesList.length > 0 ? (
                          filteredQuizzesList.map((quiz) => (
                            <tr key={quiz.id} className="hover:bg-muted/5 transition">
                              <td className="px-6 py-4 font-mono font-semibold text-foreground">
                                {quiz.ca_date}
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-bold text-foreground">{quiz.titleHi || "दैनिक क्विज़"}</div>
                                <div className="text-xs text-muted-foreground">{quiz.titleEn || "Daily Quiz"}</div>
                              </td>
                              <td className="px-6 py-4 font-mono font-bold text-foreground">
                                {quiz.mcqs?.length || 0} Questions
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <a
                                    href={`/studio/structure/currentAffairs;${quiz.id.replace("drafts.", "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-primary transition cursor-pointer text-xs font-semibold"
                                    title="Edit in Sanity Studio"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Edit in Sanity
                                  </a>
                                  <a
                                    href={`/en/daily-quiz`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-foreground transition cursor-pointer text-xs font-semibold"
                                    title="Preview Daily Quiz"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    Preview
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                              No daily quizzes found matching the query.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* Tab: Publications */}
              {activeTab === "publications" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-muted bg-muted/20 text-muted-foreground text-xs uppercase font-bold">
                        <th className="px-6 py-3.5 w-24">Cover</th>
                        <th className="px-6 py-3.5">Book Details</th>
                        <th className="px-6 py-3.5">Price</th>
                        <th className="px-6 py-3.5">Buy Link</th>
                        <th className="px-6 py-3.5 text-right w-24">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-muted/50 text-sm">
                      {filteredPublicationsList.length > 0 ? (
                        filteredPublicationsList.map((pub) => (
                          <tr key={pub.id} className="hover:bg-muted/5 transition">
                            <td className="px-6 py-4">
                              {pub.coverImage ? (
                                <div className="relative h-12 w-9 rounded overflow-hidden bg-muted border border-border">
                                  <Image
                                    src={pub.coverImage}
                                    alt={pub.title}
                                    fill
                                    sizes="36px"
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-12 w-9 rounded bg-muted flex items-center justify-center border border-dashed border-border text-muted-foreground">
                                  <BookOpen className="h-4 w-4" />
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-bold text-foreground">{pub.title}</div>
                              <div className="text-xs text-muted-foreground">{pub.titleEn}</div>
                              {pub.description && <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{pub.description}</div>}
                            </td>
                            <td className="px-6 py-4 font-mono font-bold text-foreground">
                              {pub.price ? `₹${pub.price}` : "Free"}
                            </td>
                            <td className="px-6 py-4">
                              {pub.buyLink ? (
                                <a
                                  href={pub.buyLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary hover:underline font-semibold"
                                >
                                  Buy Link
                                </a>
                              ) : (
                                <span className="text-xs text-muted-foreground">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={`/studio/structure/publication;${pub.id.replace("drafts.", "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-amber-600 dark:text-amber-400 transition cursor-pointer"
                                  title="Edit in Sanity"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground font-semibold">
                            No publications found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab: Notices */}
              {activeTab === "notices" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-muted bg-muted/20 text-muted-foreground text-xs uppercase font-bold">
                        <th className="px-6 py-3.5">Notice Text (Hindi)</th>
                        <th className="px-6 py-3.5">Notice Text (English)</th>
                        <th className="px-6 py-3.5">Link / URL</th>
                        <th className="px-6 py-3.5 w-24">Order</th>
                        <th className="px-6 py-3.5 w-28">Status</th>
                        <th className="px-6 py-3.5 text-right w-24">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-muted/50 text-sm">
                      {filteredNoticesList.length > 0 ? (
                        filteredNoticesList.map((notice) => (
                          <tr key={notice.id} className="hover:bg-muted/5 transition">
                            <td className="px-6 py-4 font-semibold text-foreground">
                              {notice.noticeTextHi}
                            </td>
                            <td className="px-6 py-4 text-foreground/80">
                              {notice.noticeTextEn}
                            </td>
                            <td className="px-6 py-4">
                              {notice.noticeLink ? (
                                <a
                                  href={notice.noticeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary hover:underline font-semibold max-w-[200px] truncate block"
                                >
                                  {notice.noticeLink}
                                </a>
                              ) : (
                                <span className="text-xs text-muted-foreground">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 font-mono">
                              {notice.orderIndex}
                            </td>
                            <td className="px-6 py-4">
                              {notice.isActive !== false ? (
                                <span className="inline-flex items-center gap-1 text-2xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                                  <Check className="h-3 w-3" /> Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-2xs font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                  <X className="h-3 w-3" /> Inactive
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditNoticeModal(notice)}
                                  className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-primary transition cursor-pointer"
                                  title="Edit Notice"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteNotice(notice.id)}
                                  className="p-1.5 rounded-lg border border-muted bg-background hover:bg-muted/30 text-destructive transition cursor-pointer"
                                  title="Delete Notice"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground font-semibold">
                            No notices found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

      {/* Add / Edit Mentor Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card border border-muted w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-muted flex items-center justify-between bg-muted/10">
              <h3 className="text-xl font-bold text-foreground">
                {editingMentor ? "Edit Senior Mentor" : "Add Senior Mentor"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleFormSubmit}>
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                
                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name (Hindi) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formNameHi}
                      onChange={(e) => setFormNameHi(e.target.value)}
                      placeholder="e.g. अश्विनी कुमार"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground animate-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name (English) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formNameEn}
                      onChange={(e) => setFormNameEn(e.target.value)}
                      placeholder="e.g. Ashwini Kumar"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground animate-none"
                    />
                  </div>
                </div>

                {/* Title fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title / Role (Hindi) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formTitleHi}
                      onChange={(e) => setFormTitleHi(e.target.value)}
                      placeholder="e.g. वरिष्ठ फैकल्टी (राजव्यवस्था)"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground animate-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title / Role (English) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formTitleEn}
                      onChange={(e) => setFormTitleEn(e.target.value)}
                      placeholder="e.g. Senior Faculty (Polity)"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground animate-none"
                    />
                  </div>
                </div>

                {/* Medium and Order Index */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Medium <span className="text-destructive">*</span></label>
                    <select
                      value={formMedium}
                      onChange={(e) => setFormMedium(e.target.value as "hindi" | "english")}
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground cursor-pointer"
                    >
                      <option value="hindi">Hindi Medium</option>
                      <option value="english">English Medium</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Order Index (For Sorting)</label>
                    <input
                      type="number"
                      value={formOrderIndex}
                      onChange={(e) => setFormOrderIndex(Number(e.target.value))}
                      placeholder="0"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description / Highlights (Hindi)</label>
                  <textarea
                    rows={3}
                    value={formDescHi}
                    onChange={(e) => setFormDescHi(e.target.value)}
                    placeholder="शिक्षक के अनुभव और उपलब्धियों के बारे में..."
                    className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm resize-none text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description / Highlights (English)</label>
                  <textarea
                    rows={3}
                    value={formDescEn}
                    onChange={(e) => setFormDescEn(e.target.value)}
                    placeholder="Details about teacher's experience, achievements..."
                    className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm resize-none text-foreground"
                  />
                </div>

                {/* Image upload */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Faculty Photo</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-dashed border-muted bg-muted/5">
                    
                    {/* Preview */}
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-muted bg-muted shrink-0 flex items-center justify-center">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                      ) : existingImageUrl ? (
                        <img src={existingImageUrl} alt="Existing" className="h-full w-full object-cover" />
                      ) : (
                        <GraduationCap className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>

                    {/* Upload Input */}
                    <div className="flex-1 w-full space-y-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        id="mentor-image-upload"
                        className="hidden"
                      />
                      <label
                        htmlFor="mentor-image-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-muted bg-background hover:bg-muted/30 font-medium text-xs text-foreground cursor-pointer transition"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        {formImageFile ? "Change Photo" : "Upload Photo"}
                      </label>
                      <p className="text-3xs text-muted-foreground">
                        {formImageFile ? formImageFile.name : "PNG, JPG or WEBP. Square ratio recommended."}
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-muted bg-muted/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-muted bg-background hover:bg-muted/30 font-medium text-sm text-foreground transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/95 transition text-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Mentor"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Course Modal Overlay */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card border border-muted w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-muted flex items-center justify-between bg-muted/10">
              <h3 className="text-xl font-bold text-foreground">
                {editingCourse ? "Edit Online Course" : "Add Online Course"}
              </h3>
              <button
                type="button"
                onClick={() => setIsCourseModalOpen(false)}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleCourseSubmit}>
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                
                {/* Section: General Info */}
                <div className="border-b border-muted/50 pb-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">1. General Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Course Title (Hindi) <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formCourseTitleHi}
                        onChange={(e) => setFormCourseTitleHi(e.target.value)}
                        placeholder="e.g. इतिहास विशेष बैच"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Course Title (English) <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formCourseTitleEn}
                        onChange={(e) => setFormCourseTitleEn(e.target.value)}
                        placeholder="e.g. History Special Batch"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Enrollment / Payment Link (URL)</label>
                    <input
                      type="url"
                      value={formCourseEnrollUrl}
                      onChange={(e) => setFormCourseEnrollUrl(e.target.value)}
                      placeholder="e.g. https://aakarias.page.link/abc or payment gateway URL"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Slug (URL Path) <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formCourseSlug}
                        onChange={(e) => setFormCourseSlug(e.target.value)}
                        placeholder="e.g. history-special"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category <span className="text-destructive">*</span></label>
                      <select
                        value={formCourseCategory}
                        onChange={(e) => setFormCourseCategory(e.target.value as "live" | "upsc" | "mppsc" | "mpsi" | "literature")}
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      >
                        <option value="upsc">UPSC</option>
                        <option value="mppsc">MPPSC</option>
                        <option value="mpsi">MPSI</option>
                        <option value="literature">Literature</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sort Order <span className="text-destructive">*</span></label>
                      <input
                        type="number"
                        required
                        value={formCourseOrderIndex}
                        onChange={(e) => setFormCourseOrderIndex(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 items-center">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Badge (Hindi)</label>
                      <input
                        type="text"
                        value={formCourseBadgeHi}
                        onChange={(e) => setFormCourseBadgeHi(e.target.value)}
                        placeholder="e.g. नया बैच"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Badge (English)</label>
                      <input
                        type="text"
                        value={formCourseBadgeEn}
                        onChange={(e) => setFormCourseBadgeEn(e.target.value)}
                        placeholder="e.g. New Batch"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                      <input
                        type="checkbox"
                        id="formCourseIsLive"
                        checked={formCourseIsLive}
                        onChange={(e) => setFormCourseIsLive(e.target.checked)}
                        className="h-4 w-4 rounded border-muted text-primary focus:ring-primary"
                      />
                      <label htmlFor="formCourseIsLive" className="text-xs font-bold uppercase tracking-wider text-muted-foreground cursor-pointer select-none">
                        Is Live Class?
                      </label>
                    </div>
                  </div>
                </div>

                {/* Section: Cover Image */}
                <div className="border-b border-muted/50 pb-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">2. Course Banner / Image</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cover Image {!editingCourse && <span className="text-destructive">*</span>}</label>
                      <input
                        type="file"
                        accept="image/*"
                        required={!editingCourse}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormCourseImageFile(file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormCourseImagePreview(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                      />
                    </div>
                    <div>
                      {formCourseImagePreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={formCourseImagePreview} alt="Preview" className="h-20 rounded border border-muted object-cover" />
                      ) : existingCourseImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={existingCourseImageUrl} alt="Current" className="h-20 rounded border border-muted object-cover" />
                      ) : (
                        <div className="h-20 w-32 border border-dashed border-muted rounded flex items-center justify-center text-2xs text-muted-foreground font-medium">No image chosen</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section: Pricing & Stats */}
                <div className="border-b border-muted/50 pb-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">3. Pricing & Metrics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Display Price <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formCoursePrice}
                        onChange={(e) => setFormCoursePrice(e.target.value)}
                        placeholder="e.g. ₹12,999"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Original Price <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formCourseOriginalPrice}
                        onChange={(e) => setFormCourseOriginalPrice(e.target.value)}
                        placeholder="e.g. ₹25,000"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Rating <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formCourseRating}
                        onChange={(e) => setFormCourseRating(e.target.value)}
                        placeholder="e.g. 4.9"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Duration (Hindi) <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formCourseDurationHi}
                        onChange={(e) => setFormCourseDurationHi(e.target.value)}
                        placeholder="e.g. 12 महीने"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Duration (English) <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formCourseDurationEn}
                        onChange={(e) => setFormCourseDurationEn(e.target.value)}
                        placeholder="e.g. 12 Months"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lectures Count (Hindi)</label>
                      <input
                        type="text"
                        value={formCourseLecturesCountHi}
                        onChange={(e) => setFormCourseLecturesCountHi(e.target.value)}
                        placeholder="e.g. 350+ लेक्चर्स"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lectures Count (English)</label>
                      <input
                        type="text"
                        value={formCourseLecturesCountEn}
                        onChange={(e) => setFormCourseLecturesCountEn(e.target.value)}
                        placeholder="e.g. 350+ Lectures"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Students Count (Hindi)</label>
                      <input
                        type="text"
                        value={formCourseStudentsCountHi}
                        onChange={(e) => setFormCourseStudentsCountHi(e.target.value)}
                        placeholder="e.g. 1,200+ छात्र"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Students Count (English)</label>
                      <input
                        type="text"
                        value={formCourseStudentsCountEn}
                        onChange={(e) => setFormCourseStudentsCountEn(e.target.value)}
                        placeholder="e.g. 1,200+ Students"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Mentor Info */}
                <div className="border-b border-muted/50 pb-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">4. Course Mentor</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mentor Name (Hindi) <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formCourseMentorNameHi}
                        onChange={(e) => setFormCourseMentorNameHi(e.target.value)}
                        placeholder="e.g. मयंक सर"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mentor Name (English) <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formCourseMentorNameEn}
                        onChange={(e) => setFormCourseMentorNameEn(e.target.value)}
                        placeholder="e.g. Mayank Sir"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mentor Title / Designation (Hindi)</label>
                      <input
                        type="text"
                        value={formCourseMentorTitleHi}
                        onChange={(e) => setFormCourseMentorTitleHi(e.target.value)}
                        placeholder="e.g. इतिहास विशेषज्ञ"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mentor Title / Designation (English)</label>
                      <input
                        type="text"
                        value={formCourseMentorTitleEn}
                        onChange={(e) => setFormCourseMentorTitleEn(e.target.value)}
                        placeholder="e.g. History Expert"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mentor Bio (Hindi)</label>
                      <textarea
                        value={formCourseMentorBioHi}
                        onChange={(e) => setFormCourseMentorBioHi(e.target.value)}
                        rows={2}
                        placeholder="मेंटर का संक्षिप्त परिचय..."
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mentor Bio (English)</label>
                      <textarea
                        value={formCourseMentorBioEn}
                        onChange={(e) => setFormCourseMentorBioEn(e.target.value)}
                        rows={2}
                        placeholder="Brief bio of the mentor..."
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 items-center">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mentor Image {!editingCourse && <span className="text-destructive">*</span>}</label>
                      <input
                        type="file"
                        accept="image/*"
                        required={!editingCourse}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormCourseMentorImageFile(file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormCourseMentorImagePreview(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                      />
                    </div>
                    <div>
                      {formCourseMentorImagePreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={formCourseMentorImagePreview} alt="Preview" className="h-16 rounded-full border border-muted object-cover w-16" />
                      ) : existingCourseMentorImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={existingCourseMentorImageUrl} alt="Current" className="h-16 rounded-full border border-muted object-cover w-16" />
                      ) : (
                        <div className="h-16 w-16 border border-dashed border-muted rounded-full flex items-center justify-center text-3xs text-muted-foreground text-center font-medium">No image</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section: Description & What you learn */}
                <div className="border-b border-muted/50 pb-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">5. Content Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description (Hindi)</label>
                      <textarea
                        value={formCourseDescriptionHi}
                        onChange={(e) => setFormCourseDescriptionHi(e.target.value)}
                        rows={4}
                        placeholder="कोर्स के बारे में विस्तृत विवरण..."
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description (English)</label>
                      <textarea
                        value={formCourseDescriptionEn}
                        onChange={(e) => setFormCourseDescriptionEn(e.target.value)}
                        rows={4}
                        placeholder="Detailed description of the course..."
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">What You Learn (Hindi) <span className="text-2xs text-muted-foreground">(One item per line)</span></label>
                      <textarea
                        value={formCourseWhatYouLearnHi}
                        onChange={(e) => setFormCourseWhatYouLearnHi(e.target.value)}
                        rows={4}
                        placeholder="जैसे:&#10;इतिहास की गहरी समझ&#10;उत्तर लेखन अभ्यास"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">What You Learn (English) <span className="text-2xs text-muted-foreground">(One item per line)</span></label>
                      <textarea
                        value={formCourseWhatYouLearnEn}
                        onChange={(e) => setFormCourseWhatYouLearnEn(e.target.value)}
                        rows={4}
                        placeholder="e.g.&#10;Deep understanding of history&#10;Answer writing practice"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Course Highlights (Hindi) <span className="text-2xs text-muted-foreground">(One item per line)</span></label>
                      <textarea
                        value={formCourseHighlightsHi}
                        onChange={(e) => setFormCourseHighlightsHi(e.target.value)}
                        rows={4}
                        placeholder="जैसे:&#10;लाइव क्लासेज&#10;पीडीएफ नोट्स"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Course Highlights (English) <span className="text-2xs text-muted-foreground">(One item per line)</span></label>
                      <textarea
                        value={formCourseHighlightsEn}
                        onChange={(e) => setFormCourseHighlightsEn(e.target.value)}
                        rows={4}
                        placeholder="e.g.&#10;Live Classes&#10;PDF Notes"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Dynamic Lists as JSON */}
                <div>
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">6. Syllabus, Key Features & Student Reviews (JSON Arrays)</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Syllabus Modules (JSON Format)</label>
                        <span className="text-3xs text-primary font-bold">Array of objects with titleHi, titleEn, topicsHi[], topicsEn[]</span>
                      </div>
                      <textarea
                        value={formCourseSyllabusJSON}
                        onChange={(e) => setFormCourseSyllabusJSON(e.target.value)}
                        rows={6}
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-xs text-foreground font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Course Features (JSON Format)</label>
                        <span className="text-3xs text-primary font-bold">Array of objects with icon, labelHi, labelEn, valueHi, valueEn</span>
                      </div>
                      <textarea
                        value={formCourseFeaturesJSON}
                        onChange={(e) => setFormCourseFeaturesJSON(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-xs text-foreground font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Student Testimonials (JSON Format)</label>
                        <span className="text-3xs text-primary font-bold">Array of objects with nameHi, nameEn, examHi, examEn, textHi, textEn</span>
                      </div>
                      <textarea
                        value={formCourseTestimonialsJSON}
                        onChange={(e) => setFormCourseTestimonialsJSON(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-xs text-foreground font-mono"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-muted flex items-center justify-end gap-3 bg-muted/10">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-xl border border-muted bg-background hover:bg-muted/30 text-foreground transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCourseSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 shadow transition cursor-pointer disabled:opacity-50"
                >
                  {isCourseSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingCourse ? "Save Changes" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Batch Modal Overlay */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card border border-muted w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-muted flex items-center justify-between bg-muted/10">
              <h3 className="text-xl font-bold text-foreground">
                {editingBatch ? "Edit Offline Classroom Batch" : "Add Offline Classroom Batch"}
              </h3>
              <button
                type="button"
                onClick={() => setIsBatchModalOpen(false)}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleBatchSubmit}>
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                
                {/* Title fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Batch Title (Hindi) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formBatchTitleHi}
                      onChange={(e) => setFormBatchTitleHi(e.target.value)}
                      placeholder="e.g. UPSC GS Foundation"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Batch Title (English) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formBatchTitleEn}
                      onChange={(e) => setFormBatchTitleEn(e.target.value)}
                      placeholder="e.g. UPSC GS Foundation"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                </div>

                {/* Start Date fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Start Date (Hindi) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formBatchStartDateHi}
                      onChange={(e) => setFormBatchStartDateHi(e.target.value)}
                      placeholder="e.g. 15 अक्टूबर, 2024"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Start Date (English) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formBatchStartDateEn}
                      onChange={(e) => setFormBatchStartDateEn(e.target.value)}
                      placeholder="e.g. October 15, 2024"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                </div>

                {/* Timing fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Timing (Hindi) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formBatchTimeHi}
                      onChange={(e) => setFormBatchTimeHi(e.target.value)}
                      placeholder="e.g. सुबह 08:00 से दोपहर 12:00 बजे"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Timing (English) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formBatchTimeEn}
                      onChange={(e) => setFormBatchTimeEn(e.target.value)}
                      placeholder="e.g. 08:00 AM - 12:00 PM"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                </div>

                {/* Medium, Center & Order Index */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Medium <span className="text-destructive">*</span></label>
                    <select
                      value={formBatchMedium}
                      onChange={(e) => setFormBatchMedium(e.target.value as "hindi" | "english" | "bilingual")}
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    >
                      <option value="bilingual">Bilingual</option>
                      <option value="hindi">Hindi Medium</option>
                      <option value="english">English Medium</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Center Location <span className="text-destructive">*</span></label>
                    <select
                      value={formBatchCenter}
                      onChange={(e) => setFormBatchCenter(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    >
                      <option value="indore">Indore</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sort Order <span className="text-destructive">*</span></label>
                    <input
                      type="number"
                      required
                      value={formBatchOrderIndex}
                      onChange={(e) => setFormBatchOrderIndex(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground font-mono"
                    />
                  </div>
                </div>

                {/* Status Badge fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status Badge (Hindi)</label>
                    <input
                      type="text"
                      value={formBatchBadgeHi}
                      onChange={(e) => setFormBatchBadgeHi(e.target.value)}
                      placeholder="e.g. प्रवेश प्रारंभ"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status Badge (English)</label>
                    <input
                      type="text"
                      value={formBatchBadgeEn}
                      onChange={(e) => setFormBatchBadgeEn(e.target.value)}
                      placeholder="e.g. Admission Open"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                </div>

                {/* Seats Filled Percentage */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Seats Filled Percentage: {formBatchSeatsFillPercent}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formBatchSeatsFillPercent}
                    onChange={(e) => setFormBatchSeatsFillPercent(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Is New Batch Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isNewBatch"
                    checked={formBatchIsNew}
                    onChange={(e) => setFormBatchIsNew(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                  />
                  <label htmlFor="isNewBatch" className="text-sm font-semibold text-foreground cursor-pointer select-none">
                    Is New Batch? (Tick to show blinking NEW badge)
                  </label>
                </div>

                {/* Description fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description (Hindi)</label>
                    <textarea
                      value={formBatchDescHi}
                      onChange={(e) => setFormBatchDescHi(e.target.value)}
                      rows={3}
                      placeholder="संक्षिप्त विवरण दर्ज करें..."
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description (English)</label>
                    <textarea
                      value={formBatchDescEn}
                      onChange={(e) => setFormBatchDescEn(e.target.value)}
                      rows={3}
                      placeholder="Enter brief description..."
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                </div>

                {/* Location fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Campus Location Name (Hindi)</label>
                    <input
                      type="text"
                      value={formBatchLocationNameHi}
                      onChange={(e) => setFormBatchLocationNameHi(e.target.value)}
                      placeholder="e.g. राजीव गांधी सर्कल कैंपस"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Campus Location Name (English)</label>
                    <input
                      type="text"
                      value={formBatchLocationNameEn}
                      onChange={(e) => setFormBatchLocationNameEn(e.target.value)}
                      placeholder="e.g. Rajiv Gandhi Circle Campus"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-muted flex items-center justify-end gap-3 bg-muted/10">
                <button
                  type="button"
                  onClick={() => setIsBatchModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-xl border border-muted bg-background hover:bg-muted/30 text-foreground transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isBatchSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 shadow transition cursor-pointer disabled:opacity-50"
                >
                  {isBatchSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingBatch ? "Save Changes" : "Add Batch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Test Series Modal Overlay */}
      {isTestSeriesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card border border-muted w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-muted flex items-center justify-between bg-muted/10">
              <h3 className="text-xl font-bold text-foreground">
                {editingTestSeries ? "Edit Test Series" : "Add Test Series"}
              </h3>
              <button
                type="button"
                onClick={() => setIsTestSeriesModalOpen(false)}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleTestSeriesSubmit}>
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                
                {/* Section: General Info */}
                <div className="border-b border-muted/50 pb-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">1. General Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Test Title (Hindi) <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formTestTitleHi}
                        onChange={(e) => setFormTestTitleHi(e.target.value)}
                        placeholder="e.g. UPSC प्रारंभिक परीक्षा '25"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Test Title (English) <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formTestTitleEn}
                        onChange={(e) => setFormTestTitleEn(e.target.value)}
                        placeholder="e.g. UPSC Prelims '25"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Slug (Unique Path) <span className="text-destructive">*</span></label>
                      <input
                        type="text"
                        required
                        value={formTestSlug}
                        onChange={(e) => setFormTestSlug(e.target.value)}
                        placeholder="e.g. upsc-prelims-2025"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Buy Link (External URL)</label>
                      <input
                        type="text"
                        value={formTestBuyLink}
                        onChange={(e) => setFormTestBuyLink(e.target.value)}
                        placeholder="e.g. https://buy.instamojo.com/..."
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Badges & Pricing */}
                <div className="border-b border-muted/50 pb-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">2. Badges & Pricing</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price (Discounted Price) <span className="text-destructive">*</span></label>
                      <input
                        type="number"
                        required
                        value={formTestPrice}
                        onChange={(e) => setFormTestPrice(e.target.value)}
                        placeholder="e.g. 7499"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Original Price (Crossed Out)</label>
                      <input
                        type="number"
                        value={formTestOriginalPrice}
                        onChange={(e) => setFormTestOriginalPrice(e.target.value)}
                        placeholder="e.g. 12000"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Badge Text (Hindi)</label>
                      <input
                        type="text"
                        value={formTestBadgeHi}
                        onChange={(e) => setFormTestBadgeHi(e.target.value)}
                        placeholder="e.g. सीमित सीटें"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Badge Text (English)</label>
                      <input
                        type="text"
                        value={formTestBadgeEn}
                        onChange={(e) => setFormTestBadgeEn(e.target.value)}
                        placeholder="e.g. LIMITED SEATS"
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Status & Order */}
                <div className="border-b border-muted/50 pb-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">3. Status & Ordering</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Sort Order Index</label>
                      <input
                        type="number"
                        value={formTestOrderIndex}
                        onChange={(e) => setFormTestOrderIndex(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="formTestActive"
                        checked={formTestActive}
                        onChange={(e) => setFormTestActive(e.target.checked)}
                        className="rounded border-muted text-primary focus:ring-primary"
                      />
                      <label htmlFor="formTestActive" className="text-xs font-bold uppercase tracking-wider text-muted-foreground cursor-pointer">Show on Public Pages</label>
                    </div>
                  </div>
                </div>

                {/* Section: Descriptions */}
                <div className="border-b border-muted/50 pb-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">4. Descriptions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description (Hindi)</label>
                      <textarea
                        value={formTestDescriptionHi}
                        onChange={(e) => setFormTestDescriptionHi(e.target.value)}
                        placeholder="Short description in Hindi"
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description (English)</label>
                      <textarea
                        value={formTestDescriptionEn}
                        onChange={(e) => setFormTestDescriptionEn(e.target.value)}
                        placeholder="Short description in English"
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Features list */}
                <div>
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">5. Bullet Features (Newline Separated)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Features (Hindi)</label>
                      <textarea
                        value={formTestFeaturesHi}
                        onChange={(e) => setFormTestFeaturesHi(e.target.value)}
                        placeholder="e.g.&#10;45 विस्तृत टेस्ट&#10;विशेषज्ञ मूल्यांकन&#10;व्यक्तिगत मार्गदर्शन"
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Features (English)</label>
                      <textarea
                        value={formTestFeaturesEn}
                        onChange={(e) => setFormTestFeaturesEn(e.target.value)}
                        placeholder="e.g.&#10;45 Comprehensive Tests&#10;Expert Evaluation&#10;Personal Mentorship"
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-muted flex items-center justify-end gap-3 bg-muted/10">
                <button
                  type="button"
                  onClick={() => setIsTestSeriesModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-xl border border-muted bg-background hover:bg-muted/30 text-foreground transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isTestSeriesSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 shadow transition cursor-pointer disabled:opacity-50"
                >
                  {isTestSeriesSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingTestSeries ? "Save Changes" : "Add Test Series"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Test Schedule Modal Overlay */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card border border-muted w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-muted flex items-center justify-between bg-muted/10">
              <h3 className="text-xl font-bold text-foreground">
                {editingSchedule ? "Edit Test Schedule" : "Add Test Schedule"}
              </h3>
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleScheduleSubmit}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Date / Time (e.g. 24 OCT 2024) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formScheduleDate}
                      onChange={(e) => setFormScheduleDate(e.target.value)}
                      placeholder="e.g. 24 OCT 2024"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Test Code (e.g. UPSC GS-1) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formScheduleCode}
                      onChange={(e) => setFormScheduleCode(e.target.value)}
                      placeholder="e.g. UPSC GS-1"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Test Title (Hindi) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formScheduleTitleHi}
                      onChange={(e) => setFormScheduleTitleHi(e.target.value)}
                      placeholder="e.g. भारतीय राजव्यवस्था और शासन"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Test Title (English) <span className="text-destructive">*</span></label>
                    <input
                      type="text"
                      required
                      value={formScheduleTitleEn}
                      onChange={(e) => setFormScheduleTitleEn(e.target.value)}
                      placeholder="e.g. Indian Polity & Governance"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Syllabus / Focus (Hindi)</label>
                    <input
                      type="text"
                      value={formScheduleFocusHi}
                      onChange={(e) => setFormScheduleFocusHi(e.target.value)}
                      placeholder="e.g. संवैधानिक संशोधनों पर विशेष ध्यान"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Syllabus / Focus (English)</label>
                    <input
                      type="text"
                      value={formScheduleFocusEn}
                      onChange={(e) => setFormScheduleFocusEn(e.target.value)}
                      placeholder="e.g. Focus on Constitutional Amendments"
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sort Order Index</label>
                  <input
                    type="number"
                    value={formScheduleOrderIndex}
                    onChange={(e) => setFormScheduleOrderIndex(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-muted flex items-center justify-end gap-3 bg-muted/10">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-xl border border-muted bg-background hover:bg-muted/30 text-foreground transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isScheduleSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 shadow transition cursor-pointer disabled:opacity-50"
                >
                  {isScheduleSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingSchedule ? "Save Changes" : "Add Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Notice Modal Overlay */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card border border-muted w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-muted flex items-center justify-between bg-muted/10">
              <h3 className="text-xl font-bold text-foreground">
                {editingNotice ? "Edit Homepage Notice" : "Add Homepage Notice"}
              </h3>
              <button
                type="button"
                onClick={() => setIsNoticeModalOpen(false)}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleNoticeSubmit}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Notice Text (Hindi) <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    required
                    value={formNoticeTextHi}
                    onChange={(e) => setFormNoticeTextHi(e.target.value)}
                    placeholder="जैसे: प्रवेश प्रारंभ! नए बैच 2026 के लिए रजिस्ट्रेशन शुरू..."
                    className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Notice Text (English) <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    required
                    value={formNoticeTextEn}
                    onChange={(e) => setFormNoticeTextEn(e.target.value)}
                    placeholder="e.g. Admissions Open! Registration started for new 2026 batches..."
                    className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Notice Redirect Link / URL (Optional)</label>
                  <input
                    type="text"
                    value={formNoticeLink}
                    onChange={(e) => setFormNoticeLink(e.target.value)}
                    placeholder="e.g. /offline-courses or https://t.me/AakarIAS"
                    className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sort Order Index</label>
                    <input
                      type="number"
                      value={formNoticeOrderIndex}
                      onChange={(e) => setFormNoticeOrderIndex(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-lg border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm text-foreground"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="noticeActiveCheck"
                      checked={formNoticeIsActive}
                      onChange={(e) => setFormNoticeIsActive(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="noticeActiveCheck" className="text-sm font-semibold text-foreground">
                      Active (Show in Ticker)
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-muted flex items-center justify-end gap-3 bg-muted/10">
                <button
                  type="button"
                  onClick={() => setIsNoticeModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-xl border border-muted bg-background hover:bg-muted/30 text-foreground transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isNoticeSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 shadow transition cursor-pointer disabled:opacity-50"
                >
                  {isNoticeSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingNotice ? "Save Changes" : "Add Notice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
