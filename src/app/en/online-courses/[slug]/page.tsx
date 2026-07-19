import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Download,
  FileText,
  GraduationCap,
  MessageSquare,
  Phone,
  Play,
  Quote,
  Star,
  Users,
  Video,
  ChevronDown,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import {
  coursesData,
  getCourseBySlug,
  getAllCourseSlugs,
} from "@/data/courses";
import type { Course, CourseFeature } from "@/data/courses";
import { DownloadAppSection } from "@/components/sections/download-app-section";
import { getContentRepository } from "@/lib/content/content-repository";
import { TrackedDownloadLink } from "@/components/content/tracked-download-link";
import { EnrollButton } from "@/components/online-courses/EnrollPopup";
import { ArticleAdRotator } from "@/components/article/article-ad-rotator";
import { JsonLd } from "@/components/seo/json-ld";
import { courseJsonLd, breadcrumbJsonLd, jsonLdGraph } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

/* ─── Static Params ───────────────────────────────────────────── */
export async function generateStaticParams() {
  try {
    const repo = await getContentRepository();
    const onlineCourses = await repo.listOnlineCourses("en");
    if (onlineCourses.length > 0) {
      return onlineCourses.map((c) => ({ slug: c.slug }));
    }
  } catch (error) {
    console.error("Error generating static params for online courses:", error);
  }
  return getAllCourseSlugs().map((slug) => ({ slug }));
}

/* ─── Dynamic Metadata ────────────────────────────────────────── */
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const repo = await getContentRepository();
  const course = (await repo.getOnlineCourse(slug, "en")) || getCourseBySlug(slug);

  if (!course) {
    return { title: "Course Not Found | Aakar IAS" };
  }

  const title = (course as any).titleEn || (course as any).titleHi || (course as any).title;
  const description = (course as any).descriptionEn || (course as any).descriptionHi || (course as any).description || `${title} — Aakar IAS Online Course`;
  const image = course.image || "/images/placeholder.jpg";

  return {
    title: `${title} | Aakar IAS`,
    description,
    openGraph: {
      title: `${title} | Aakar IAS`,
      description,
      images: [{ url: image }],
    },
  };
}

/* ─── Icon Mapper ─────────────────────────────────────────────── */
function FeatureIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    Clock: <Clock className="h-5 w-5" />,
    Video: <Video className="h-5 w-5" />,
    FileText: <FileText className="h-5 w-5" />,
    Users: <Users className="h-5 w-5" />,
    Download: <Download className="h-5 w-5" />,
    Star: <Star className="h-5 w-5" />,
    GraduationCap: <GraduationCap className="h-5 w-5" />,
    Play: <Play className="h-5 w-5" />,
  };
  return <>{icons[name] || <Zap className="h-5 w-5" />}</>;
}

/* ─── Page Component ──────────────────────────────────────────── */
export default async function EnCourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const repo = await getContentRepository();
  const [dbCourse, onlineCourses, faculties, brochureUrl, ads] = await Promise.all([
    repo.getOnlineCourse(slug, "en"),
    repo.listOnlineCourses("en"),
    repo.listFaculties("en"),
    repo.getOfflineBrochureUrl(),
    repo.listAds("en"),
  ]);
  const rawCourse = dbCourse || getCourseBySlug(slug);

  if (!rawCourse) {
    notFound();
  }

  const course: Course = {
    id: rawCourse.id,
    slug: rawCourse.slug,
    title: (rawCourse as any).titleEn || (rawCourse as any).titleHi || (rawCourse as any).title || "",
    category: rawCourse.category as any,
    image: rawCourse.image || "/images/placeholder.jpg",
    alt: (rawCourse as any).altEn || (rawCourse as any).alt || (rawCourse as any).titleEn || "",
    badge: (rawCourse as any).badgeEn || (rawCourse as any).badge || "",
    isLive: !!rawCourse.isLive,
    enrollUrl: rawCourse.enrollUrl || "",
    mentorName: (rawCourse as any).mentorNameEn || (rawCourse as any).mentorName || "",
    mentorTitle: (rawCourse as any).mentorTitleEn || (rawCourse as any).mentorTitle || "",
    mentorImage: rawCourse.mentorImage || "/images/placeholder.jpg",
    mentorBio: (rawCourse as any).mentorBioEn || (rawCourse as any).mentorBio || "",
    price: rawCourse.price,
    originalPrice: rawCourse.originalPrice,
    duration: (rawCourse as any).durationEn || (rawCourse as any).duration || "",
    lecturesCount: (rawCourse as any).lecturesCountEn || (rawCourse as any).lecturesCount || "",
    studentsCount: (rawCourse as any).studentsCountEn || (rawCourse as any).studentsCount || "",
    rating: rawCourse.rating,
    description: (rawCourse as any).descriptionEn || (rawCourse as any).description || "",
    whatYouLearn: (rawCourse as any).whatYouLearnEn || (rawCourse as any).whatYouLearn || [],
    highlights: (rawCourse as any).highlightsEn || (rawCourse as any).highlights || [],
    syllabus: (rawCourse as any).syllabus ? (rawCourse as any).syllabus.map((s: any) => ({
      title: s.titleEn || s.title || "",
      topics: s.topicsEn || s.topics || [],
    })) : [],
    features: (rawCourse as any).features ? (rawCourse as any).features.map((f: any) => ({
      icon: f.icon || "",
      label: f.labelEn || f.label || "",
      value: f.valueEn || f.value || "",
    })) : [],
    testimonials: (rawCourse as any).testimonials ? (rawCourse as any).testimonials.map((t: any) => ({
      name: t.nameEn || t.name || "",
      exam: t.examEn || t.exam || "",
      text: t.textEn || t.text || "",
    })) : [],
  };

  const isGenericMentor = 
    !course.mentorName ||
    course.mentorName === "Experienced Faculty" ||
    course.mentorName === "Subject Experts" ||
    course.mentorName === "अनुभवी फैकल्टी" ||
    course.mentorName === "विषय विशेषज्ञ" ||
    !course.mentorImage ||
    course.mentorImage.includes("placeholder");

  const isEnglishMedium = 
    course.slug.includes("english") || 
    course.title.toLowerCase().includes("english");

  const isHindiMedium = 
    !isEnglishMedium && (
      course.category === "mppsc" || 
      course.category === "mpsi" || 
      course.slug.includes("mppsc") || 
      course.slug.includes("mpsi")
    );

  const rawFaculties = faculties && faculties.length > 0
    ? faculties.filter((f) => f.medium === (isHindiMedium ? "hindi" : "english"))
    : (isHindiMedium 
        ? [
            {
              id: "f1",
              nameEn: "Dr. Vikas Singh",
              titleEn: "Polity Expert",
              descEn: "",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6a2DZgmjJ8x3fULvFtV8dwd6zoTgynm_iN7-GVWJ-Om4vZmilNrlWW3ei1Iq2b94dxD3auTixsXZdYn0Bf4bzdilI9VVJPSu6A7bD5SgKThGvIedTu9X5MNE_wbGBYB77kFE0GJzWRzrAAW0G1FossIu3kkh8S8hTfTXcAmldKzfI6CI6WvWwP-euJkwRTHMMMuaoLJbJuGGpuwkJ97prEDjyoiibx6LFoC46hnXOaZw-3TGhxtoCfRFwZuMIztXTxyFhKmnqX3U",
              medium: "hindi"
            },
            {
              id: "f2",
              nameEn: "Anjali Sharma",
              titleEn: "History Expert",
              descEn: "",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLP6cpcghr5QsVBNYiRKF-1zEdRjnJoJcMmLHFpUCeE3nv7qTyyJoDQ8iyi-Q-ck1VJuet53EhHBqM0l_lyG3lCSPA-Lr-XNUlwA-aS45YZ-WbQu0hkv0kyTkSsH8PoWdHypxE8dAFG0a18OTKOUSyhDQvE7xYXMOxYoihEYdbT6RirowtguKqYyw_xOItJUrPllUz2HWA39egauU_84cDPPqfErbKxqk2bFrpl3Fh8NpfXUP3PLo5dXrJ_Coeb7LzhxoXWcQww2Y",
              medium: "hindi"
            },
            {
              id: "f3",
              nameEn: "R. K. Mishra",
              titleEn: "Economics Expert",
              descEn: "",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3gOnNPMFf68FoHrzRENHu6l4Cuqoy_nn9xWgNCVCWlR3f3u2sBRK6_TzBtVlieujXh8AXmpWRHvzviXYmcfQp7ZK-VA7TQCEVkNIlgxyjAGYF0ZcCYuHFW8CpMOQv7Lss5-NzS2Cv2141WSDDSPW72Cp3HNsWyjpCQBtuBj5nM_YS6nuozrvTNz3Jar16OOy1Uu6dqw1PrCFULOyd13DpRJl3tLhXEVpU2Ku3lVHdRroBcoEPJMX_oxrMBlO8euekVSCuvabl-7o",
              medium: "hindi"
            },
            {
              id: "f4",
              nameEn: "Sandeep Patwa",
              titleEn: "Geography Expert",
              descEn: "",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZVH9_YVZpm1cYFPrTgGgLSeYVWJPggL-9ubWFZanFtHoyLVPjC8prsSKYwYn0pmK7A_Kz3lZEUMXxlrnFAl4vGSvGpIIUyvWvVIxZNJ5hbJm4KvPb8VXSdkjNspdT3y-qomeCn1HiwEHzdPdvXUrsq-k8D0QjMkbZ7wKDlXZTcLJfLg-r5sq_2ql8yTDEd1SrhmAD8xzm01ACpw_-52RA4Agpkj27P3Gun8t4zJslsEqqIp__wRbdFQyVl7NVxYgdDbC5y9cRfzw",
              medium: "hindi"
            }
          ]
        : [
            {
              id: "f1",
              nameEn: "Dr. Vikas Singh",
              titleEn: "Polity Expert",
              descEn: "",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6a2DZgmjJ8x3fULvFtV8dwd6zoTgynm_iN7-GVWJ-Om4vZmilNrlWW3ei1Iq2b94dxD3auTixsXZdYn0Bf4bzdilI9VVJPSu6A7bD5SgKThGvIedTu9X5MNE_wbGBYB77kFE0GJzWRzrAAW0G1FossIu3kkh8S8hTfTXcAmldKzfI6CI6WvWwP-euJkwRTHMMMuaoLJbJuGGpuwkJ97prEDjyoiibx6LFoC46hnXOaZw-3TGhxtoCfRFwZuMIztXTxyFhKmnqX3U",
              medium: "english"
            },
            {
              id: "f2",
              nameEn: "Anjali Sharma",
              titleEn: "History Expert",
              descEn: "",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLP6cpcghr5QsVBNYiRKF-1zEdRjnJoJcMmLHFpUCeE3nv7qTyyJoDQ8iyi-Q-ck1VJuet53EhHBqM0l_lyG3lCSPA-Lr-XNUlwA-aS45YZ-WbQu0hkv0kyTkSsH8PoWdHypxE8dAFG0a18OTKOUSyhDQvE7xYXMOxYoihEYdbT6RirowtguKqYyw_xOItJUrPllUz2HWA39egauU_84cDPPqfErbKxqk2bFrpl3Fh8NpfXUP3PLo5dXrJ_Coeb7LzhxoXWcQww2Y",
              medium: "english"
            },
            {
              id: "f3",
              nameEn: "R. K. Mishra",
              titleEn: "Economics Expert",
              descEn: "",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3gOnNPMFf68FoHrzRENHu6l4Cuqoy_nn9xWgNCVCWlR3f3u2sBRK6_TzBtVlieujXh8AXmpWRHvzviXYmcfQp7ZK-VA7TQCEVkNIlgxyjAGYF0ZcCYuHFW8CpMOQv7Lss5-NzS2Cv2141WSDDSPW72Cp3HNsWyjpCQBtuBj5nM_YS6nuozrvTNz3Jar16OOy1Uu6dqw1PrCFULOyd13DpRJl3tLhXEVpU2Ku3lVHdRroBcoEPJMX_oxrMBlO8euekVSCuvabl-7o",
              medium: "english"
            },
            {
              id: "f4",
              nameEn: "Sandeep Patwa",
              titleEn: "Geography Expert",
              descEn: "",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZVH9_YVZpm1cYFPrTgGgLSeYVWJPggL-9ubWFZanFtHoyLVPjC8prsSKYwYn0pmK7A_Kz3lZEUMXxlrnFAl4vGSvGpIIUyvWvVIxZNJ5hbJm4KvPb8VXSdkjNspdT3y-qomeCn1HiwEHzdPdvXUrsq-k8D0QjMkbZ7wKDlXZTcLJfLg-r5sq_2ql8yTDEd1SrhmAD8xzm01ACpw_-52RA4Agpkj27P3Gun8t4zJslsEqqIp__wRbdFQyVl7NVxYgdDbC5y9cRfzw",
              medium: "english"
            }
          ] as any[]
      );

  const parsedRelated = onlineCourses && onlineCourses.length > 0
    ? onlineCourses.map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.titleEn || c.titleHi,
        category: c.category,
        image: c.image || "/images/placeholder.jpg",
        alt: c.altEn || c.titleEn || c.titleHi,
        badge: c.badgeEn || "",
        isLive: !!c.isLive,
        mentorName: c.mentorNameEn || c.mentorNameHi || "",
        mentorTitle: c.mentorTitleEn || c.mentorTitleHi || "",
        mentorImage: c.mentorImage || "/images/placeholder.jpg",
        price: c.price,
        originalPrice: c.originalPrice,
      }))
    : coursesData;

  const relatedCourses = parsedRelated
    .filter((c) => c.slug !== course.slug)
    .slice(0, 3);

  return (
    <>
      {/* ─── Structured Data ─────────────────────────────────────────── */}
      <JsonLd data={jsonLdGraph([
        courseJsonLd({
          name: course.title,
          description: course.description || "",
          url: `${siteConfig.url}/en/online-courses/${course.slug}`,
          image: course.image,
          price: course.price,
          courseMode: "online",
          educationalLevel: "MPPSC / UPSC Preparation",
          inLanguage: "en-IN",
        }),
        breadcrumbJsonLd([
          { name: "Home", url: `${siteConfig.url}/en` },
          { name: "Online Courses", url: `${siteConfig.url}/en/online-courses` },
          { name: course.title, url: `${siteConfig.url}/en/online-courses/${course.slug}` },
        ]),
      ])} />
      {/* ─── Breadcrumb ─────────────────────────────────────────────── */}
      <Section className="pb-0 pt-6">
        <Container size="wide">
          <Breadcrumb
            items={[
              { name: "Online Courses", href: "/en/online-courses" },
              { name: course.title },
            ]}
          />
        </Container>
      </Section>

      {/* ─── Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
        <Container size="wide" className="relative py-12 sm:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left: Course Info */}
            <AnimatedSection
              variant="slide-in"
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                {course.badge && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" />
                    {course.badge}
                  </span>
                )}
                {course.isLive && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider animate-pulse">
                    <span className="h-1.5 w-1.5 bg-white rounded-full" />
                    LIVE Classes
                  </span>
                )}
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 uppercase tracking-wider">
                  {course.category.toUpperCase()} Program
                </span>
              </div>

              <h1 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl font-devanagari">
                {course.title}
              </h1>

              {course.description && (
                <p className="text-pretty text-lg text-white/75 max-w-2xl font-devanagari">
                  {course.description}
                </p>
              )}

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 pt-2">
                {course.rating && (
                  <div className="flex items-center gap-1.5 text-sm text-white/90">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{course.rating}</span>
                    <span className="text-white/50">rating</span>
                  </div>
                )}
                {course.studentsCount && (
                  <div className="flex items-center gap-1.5 text-sm text-white/90">
                    <Users className="h-4 w-4" />
                    <span className="font-bold">{course.studentsCount}</span>
                  </div>
                )}
                {course.duration && (
                  <div className="flex items-center gap-1.5 text-sm text-white/90">
                    <Clock className="h-4 w-4" />
                    <span className="font-bold">{course.duration}</span>
                  </div>
                )}
                {course.lecturesCount && (
                  <div className="flex items-center gap-1.5 text-sm text-white/90">
                    <Video className="h-4 w-4" />
                    <span className="font-bold">{course.lecturesCount}</span>
                  </div>
                )}
              </div>

              {/* Mentor Preview */}
              {!isGenericMentor ? (
                <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0 ring-2 ring-white/20">
                    <Image
                      src={course.mentorImage}
                      alt={course.mentorName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">
                      {course.mentorName}
                    </p>
                    <p className="text-xs text-white/60">{course.mentorTitle}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 shrink-0 ring-2 ring-white/20">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">
                      Aakar IAS Faculty Team
                    </p>
                    <p className="text-xs text-white/60">Subject Experts</p>
                  </div>
                </div>
              )}
            </AnimatedSection>

            {/* Right: Course Image */}
            <AnimatedSection
              variant="scale-in"
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative aspect-video w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 shadow-soft-lg group">
                <Image
                  src={course.image}
                  alt={course.alt}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                  unoptimized
                  priority
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play className="h-7 w-7 text-primary ml-1" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* ─── Main Content Grid ──────────────────────────────────────── */}
      <Section className="py-10 sm:py-14">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* What You'll Learn */}
              {course.whatYouLearn && course.whatYouLearn.length > 0 && (
                <AnimatedSection variant="fade-up">
                  <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-soft">
                    <h2 className="text-2xl font-extrabold text-foreground mb-6 flex items-center gap-2">
                      <GraduationCap className="h-6 w-6 text-primary" />
                      What You&apos;ll Learn
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {course.whatYouLearn.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-sm text-foreground/90 font-devanagari"
                        >
                          <div className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Highlights */}
              {course.highlights && course.highlights.length > 0 && (
                <AnimatedSection variant="fade-up">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
                      <Zap className="h-6 w-6 text-accent" />
                      Key Highlights
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {course.highlights.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-xl bg-accent/5 border border-accent/10 p-4 text-sm font-medium text-foreground font-devanagari"
                        >
                          <Shield className="h-5 w-5 text-accent shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Instructor */}
              <AnimatedSection variant="fade-up">
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold text-foreground">
                    {!isGenericMentor ? "Instructor" : "Our Senior Faculty"}
                  </h2>
                  {!isGenericMentor ? (
                    <Card className="p-6 sm:p-8 border border-border/60 shadow-soft">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden shrink-0 ring-2 ring-primary/20">
                          <Image
                            src={course.mentorImage}
                            alt={course.mentorName}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="space-y-3 flex-1">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">
                              {course.mentorName}
                            </h3>
                            <p className="text-sm font-semibold text-primary">
                              {course.mentorTitle}
                            </p>
                          </div>
                          {course.mentorBio && (
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {course.mentorBio}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-3 pt-1">
                            {course.rating && (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground bg-muted/60 rounded-full px-3 py-1">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                {course.rating} Rating
                              </span>
                            )}
                            {course.studentsCount && (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground bg-muted/60 rounded-full px-3 py-1">
                                <Users className="h-3 w-3" />
                                {course.studentsCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {rawFaculties.map((fac, index) => {
                        const name = fac.nameEn || fac.nameHi;
                        const title = fac.titleEn || fac.titleHi;
                        const desc = fac.descEn || fac.descHi;
                        return (
                          <Card key={fac.id || index} className="group overflow-hidden border border-border/80 bg-card hover:shadow-soft-lg hover:border-primary/20 transition-all duration-300 flex flex-col justify-between">
                            <div>
                              <div className="relative aspect-[4/5] w-full bg-muted overflow-hidden">
                                {fac.image ? (
                                  <Image
                                    src={fac.image}
                                    alt={name}
                                    fill
                                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                    unoptimized
                                  />
                                ) : (
                                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                                    <GraduationCap className="h-12 w-12 text-primary/40" />
                                  </div>
                                )}
                              </div>
                              <div className="p-5 space-y-2">
                                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                  {name}
                                </h3>
                                <p className="text-xs font-bold text-primary tracking-wide uppercase line-clamp-1">
                                  {title}
                                </p>
                                {desc && (
                                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 pt-1">
                                    {desc}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* Testimonials */}
              {course.testimonials && course.testimonials.length > 0 && (
                <AnimatedSection variant="fade-up">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-extrabold text-foreground">
                      Student Reviews
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {course.testimonials.map((t, i) => (
                        <Card
                          key={i}
                          className="p-6 border border-border/60 shadow-soft relative overflow-hidden"
                        >
                          <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                          <div className="space-y-3 relative z-10">
                            <p className="text-sm text-muted-foreground leading-relaxed italic font-devanagari">
                              &ldquo;{t.text}&rdquo;
                            </p>
                            <div className="pt-2 border-t border-border/30">
                              <p className="text-sm font-bold text-foreground font-devanagari">
                                {t.name}
                              </p>
                              <p className="text-xs text-primary font-semibold">
                                {t.exam}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Right: Sticky Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              {/* Pricing Card */}
              <AnimatedSection variant="scale-in">
                <Card className="overflow-hidden border border-border/60 shadow-soft-lg">
                  <div className="bg-primary text-white p-6 text-center space-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_60%)]" />
                    <div className="relative z-10">
                      <p className="text-sm text-white/70 font-semibold uppercase tracking-wider">
                        Course Fee
                      </p>
                      <div className="flex items-baseline justify-center gap-2 mt-1">
                        <span className="text-4xl font-extrabold">
                          {course.price}
                        </span>
                        <span className="text-lg text-white/50 line-through">
                          {course.originalPrice}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mt-1">
                        {Math.round(
                          ((parseInt(course.originalPrice.replace(/[₹,]/g, "")) -
                            parseInt(course.price.replace(/[₹,]/g, ""))) /
                            parseInt(
                              course.originalPrice.replace(/[₹,]/g, "")
                            )) *
                            100
                        )}
                        % discount
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <EnrollButton
                      courseTitle={course.title}
                      enrollUrl={course.enrollUrl || "https://wa.me/919713300123"}
                      locale="en"
                      className="w-full rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-base gap-2 h-11 flex items-center justify-center cursor-pointer transition-all duration-200"
                    />
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full rounded-xl font-bold text-base gap-2 border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
                      asChild
                    >
                      <a
                        href="https://wa.me/919713300123"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageSquare className="h-5 w-5" />
                        Ask on WhatsApp
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full rounded-xl font-bold text-base gap-2"
                      asChild
                    >
                      <a href="tel:+919713300123">
                        <Phone className="h-5 w-5" />
                        Call Us
                      </a>
                    </Button>
                  </div>

                  {course.features && course.features.length > 0 && (
                    <div className="border-t border-border/40 p-6 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        This course includes
                      </h4>
                      {course.features.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 text-sm"
                        >
                          <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                            <FeatureIcon name={f.icon} />
                          </div>
                          <div className="flex-1 flex items-center justify-between">
                            <span className="text-muted-foreground font-devanagari">
                              {f.label}
                            </span>
                            <span className="font-bold text-foreground font-devanagari">
                              {f.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </Card>
              </AnimatedSection>

              {/* Download Brochure */}
              {brochureUrl && (
                <Card className="p-5 border border-border/60 shadow-sm text-center space-y-3">
                  <FileText className="h-8 w-8 text-primary mx-auto" />
                  <p className="text-sm font-bold text-foreground">
                    Download Brochure
                  </p>
                  <TrackedDownloadLink
                    input={{
                      slug: `${course.slug}-brochure`,
                      title: `${course.title} Brochure`,
                      kind: "brochure",
                      url: brochureUrl,
                    }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full gap-2 font-bold w-full"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </TrackedDownloadLink>
                </Card>
              )}

              {ads && ads.length > 0 && (
                <ArticleAdRotator ads={ads} locale="en" />
              )}
            </aside>
          </div>
        </Container>
      </Section>

      {/* ─── Related Courses ──────────────────────────────────────── */}
      {relatedCourses.length > 0 && (
        <Section
          title="Related Courses"
          className="bg-muted/10"
          action={
            <Button variant="ghost" asChild>
              <Link href="/en/online-courses">
                All Courses <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <AnimatedSection
            variant="stagger-container"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {relatedCourses.map((rc) => (
              <AnimatedSection key={rc.id} variant="stagger-item">
                <Link href={`/en/online-courses/${rc.slug}`} className="block group">
                  <Card className="overflow-hidden border border-border/60 hover:shadow-soft-lg transition-all duration-300 flex flex-col">
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      <Image
                        src={rc.image}
                        alt={rc.alt}
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                        unoptimized
                      />
                      {rc.badge && (
                        <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                          {rc.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-5 space-y-3 flex-1 flex flex-col">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                        {rc.category.toUpperCase()} Program
                      </span>
                      <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors font-devanagari flex-1">
                        {rc.title}
                      </h3>
                      <div className="flex items-center justify-between border-t border-border/40 pt-3">
                        <div>
                          <span className="text-lg font-extrabold text-primary">
                            {rc.price}
                          </span>
                          <span className="text-xs text-muted-foreground line-through ml-2">
                            {rc.originalPrice}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                          Details <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </Section>
      )}


      {/* ─── Download App Section ────────────────────────────────── */}
      <DownloadAppSection locale="en" />

      {/* ─── Bottom CTA ──────────────────────────────────────────── */}
      <Section>
        <Container size="wide">
          <div className="relative rounded-3xl overflow-hidden bg-secondary text-white p-8 md:p-16 text-center shadow-soft-lg">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-20" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Ready to Start Your Preparation?
              </h2>
              <p className="text-white/80 text-base md:text-lg">
                Enroll now and take the first step toward achieving your dream.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-primary text-white hover:bg-primary/95 font-bold shadow-lg gap-2"
                >
                  <a href="tel:+919713300123">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[#25D366] text-white hover:bg-[#25D366]/95 font-bold shadow-lg gap-2 border-none"
                >
                  <a
                    href="https://wa.me/919713300123"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="h-4 w-4 fill-white" />
                    WhatsApp
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white font-bold gap-2"
                >
                  <Link href="/en/online-courses">
                    <ArrowLeft className="h-4 w-4" />
                    Browse All Courses
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
