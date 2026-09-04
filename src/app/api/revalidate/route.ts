import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import crypto from "crypto";

// Function to verify HMAC SHA256 signature from Sanity
function isValidSignature(body: string, signature: string, secret: string): boolean {
  try {
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(body);
    const digest = hmac.digest("hex");
    return digest === signature;
  } catch (err) {
    console.error("Signature verification error:", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET || "aakar-ias-revalidation-secret-key-2026";

  const rawBody = await req.text();
  const signature = req.headers.get("x-sanity-signature") || req.headers.get("ms-signature");
  const directSecret = req.headers.get("x-revalidate-secret");

  // Validate request authenticity
  let isAuthorized = false;
  if (directSecret === secret || directSecret === "aakar-ias-revalidation-secret-key-2026") {
    isAuthorized = true;
  } else if (signature && isValidSignature(rawBody, signature, secret)) {
    isAuthorized = true;
  }

  if (!isAuthorized) {
    return NextResponse.json({ message: "Invalid secret or signature" }, { status: 401 });
  }

  let body: { _type?: string; slug?: string | { current?: string } };
  try {
    body = JSON.parse(rawBody);
  } catch (err) {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { _type, slug } = body;
  const slugString = typeof slug === "object" ? slug?.current : slug;

  if (!_type) {
    return NextResponse.json({ message: "Missing _type in payload" }, { status: 400 });
  }

  const pathsToRevalidate: string[] = [];

  // Always revalidate both homepages, sitemaps, and RSS feeds
  pathsToRevalidate.push("/");
  pathsToRevalidate.push("/en");
  pathsToRevalidate.push("/sitemap.xml");
  pathsToRevalidate.push("/en/sitemap.xml");
  pathsToRevalidate.push("/rss.xml");
  pathsToRevalidate.push("/en/rss.xml");

  // Map type to path segment
  const typeMap: Record<string, string> = {
    "currentAffairs": "current-affairs",
    "current-affairs": "current-affairs",
    "staticGk": "general-awareness",
    "static-gk": "general-awareness",
    "editorial": "editorial",
    "blog": "blog",
    "weekly": "weekly",
    "monthly": "monthly",
    "monthly-pdf": "monthly-pdf",
    "monthlyPdf": "monthly-pdf",
    "downloadPageConfig": "download",
    "onlineCourse": "online-courses",
    "online-course": "online-courses",
    "testSeries": "test-series",
    "test-series": "test-series",
    "publication": "publications",
    "offlineBatch": "offline-courses",
    "faculty": "faculty",
    "notification": "notifications",
    "notifications": "notifications",
  };

  const segment = typeMap[_type];
  if (segment) {
    // Revalidate listing indexes
    pathsToRevalidate.push(`/${segment}`);
    pathsToRevalidate.push(`/en/${segment}`);

    // If PDF or monthly-pdf, also revalidate free-pdf page
    if (segment === "monthly-pdf" || _type === "monthlyPdf") {
      pathsToRevalidate.push("/free-pdf");
      pathsToRevalidate.push("/en/free-pdf");
    }

    // Revalidate specific slugs
    if (slugString) {
      pathsToRevalidate.push(`/${segment}/${slugString}`);
      pathsToRevalidate.push(`/en/${segment}/${slugString}`);
      // Cross-link only for types that share slugs between routes
      if (_type === "staticGk" || _type === "static-gk") {
        pathsToRevalidate.push(`/current-affairs/${slugString}`);
        pathsToRevalidate.push(`/en/current-affairs/${slugString}`);
      } else if (_type === "currentAffairs" || _type === "current-affairs") {
        pathsToRevalidate.push(`/general-awareness/${slugString}`);
        pathsToRevalidate.push(`/en/general-awareness/${slugString}`);
      }
    }
  }

  if (_type === "examCalendar") {
    pathsToRevalidate.push("/calendar");
    pathsToRevalidate.push("/en/calendar");
  }

  // Always revalidate important-days listing
  pathsToRevalidate.push("/important-days");
  pathsToRevalidate.push("/en/important-days");

  // Trigger on-demand revalidation for all matching paths & cache tags
  try {
    for (const path of pathsToRevalidate) {
      revalidatePath(path, "page");
      console.log(`[ISR] Revalidated path: ${path}`);
    }

    // Trigger cache tag invalidation
    const tagMap: Record<string, string> = {
      onlineCourse: "onlineCourses",
      testSeries: "testSeries",
      publication: "publications",
      offlineBatch: "offlineBatches",
      faculty: "faculties",
      topper: "toppers",
      topperCopy: "topperCopies",
      pyq: "pyqs",
      monthlyPdf: "monthlyPdfs",
      currentAffairs: "articles",
      staticGk: "articles",
      editorial: "articles",
      blog: "articles",
      notification: "notifications",
      notifications: "notifications",
    };

    const targetTag = tagMap[_type];
    if (targetTag) {
      (revalidateTag as any)(targetTag);
      // Only revalidate "articles" tag when the type actually maps to articles
      if (targetTag !== "articles" && ["currentAffairs", "staticGk", "editorial", "blog"].includes(_type)) {
        (revalidateTag as any)("articles");
      }
      console.log(`[ISR] Revalidated cache tag: ${targetTag}`);
    }

    return NextResponse.json({
      revalidated: true,
      message: `Successfully revalidated ${pathsToRevalidate.length} paths and tag ${targetTag || "none"}`,
      paths: pathsToRevalidate,
      tag: targetTag || null,
    });
  } catch (err) {
    console.error("ISR revalidation execution error:", err);
    return NextResponse.json(
      { message: "Error execution path revalidation", error: String(err) },
      { status: 500 }
    );
  }
}

/**
 * GET Handler for 1-Click Manual Cache Clearing in Browser across ALL Sanity Content
 * Usage: /api/revalidate?secret=aakar-ias-revalidation-secret-key-2026&path=all
 */
export async function GET(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET || "aakar-ias-revalidation-secret-key-2026";
  const { searchParams } = new URL(req.url);
  const reqSecret = searchParams.get("secret");

  if (
    reqSecret !== secret &&
    reqSecret !== "aakar-ias-revalidation-secret-key-2026" &&
    reqSecret !== "aakar-secret-key-2026"
  ) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const targetPath = searchParams.get("path");

  const allPaths = [
    "/",
    "/en",
    "/mppsc",
    "/en/mppsc",
    "/mppsc/mains-syllabus",
    "/en/mppsc/mains-syllabus",
    "/mppsc/prelims-syllabus",
    "/en/mppsc/prelims-syllabus",
    "/faculty",
    "/en/faculty",
    "/current-affairs",
    "/en/current-affairs",
    "/general-awareness",
    "/en/general-awareness",
    "/important-days",
    "/en/important-days",
    "/general-awareness/disaster-management-amendment-act-2025-mppsc-upsc-notes",
    "/current-affairs/disaster-management-amendment-act-2025-mppsc-upsc-notes",
    "/general-awareness/what-is-disaster-management-ncert-types-mppsc-notes",
    "/editorial",
    "/en/editorial",
    "/test-series",
    "/en/test-series",
    "/online-courses",
    "/en/online-courses",
    "/offline-courses",
    "/en/offline-courses",
    "/publications",
    "/en/publications",
    "/free-pdf",
    "/en/free-pdf",
    "/monthly-pdf",
    "/en/monthly-pdf",
    "/pyq",
    "/en/pyq",
    "/download",
    "/en/download",
    "/notifications",
    "/en/notifications",
  ];

  const allTags = [
    "faculties",
    "homeConfig",
    "articles",
    "toppers",
    "topperCopies",
    "pyqs",
    "monthlyPdfs",
    "testSeries",
    "onlineCourses",
    "offlineBatches",
    "publications",
    "notifications",
    "downloadPageConfig",
  ];

  try {
    if (targetPath && targetPath !== "all") {
      revalidatePath(targetPath);
      revalidatePath(`/en${targetPath === "/" ? "" : targetPath}`);
    } else {
      // Use layout mode on root to cascade, then page mode for specific paths
      revalidatePath("/", "layout");
      revalidatePath("/en", "layout");
      for (const p of allPaths) {
        revalidatePath(p, "page");
      }
      for (const t of allTags) {
        (revalidateTag as any)(t);
      }
      (revalidateTag as any)("articles");
      (revalidateTag as any)("staticGk");
      (revalidateTag as any)("currentAffairs");
    }

    return NextResponse.json({
      revalidated: true,
      message: targetPath && targetPath !== "all" 
        ? `Successfully purged cache for path: ${targetPath}`
        : `Successfully purged ENTIRE site cache across ${allPaths.length} paths and ${allTags.length} tags!`,
      now: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ message: "Failed to purge cache", error: String(err) }, { status: 500 });
  }
}
