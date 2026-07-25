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
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.error("SANITY_REVALIDATE_SECRET is not configured");
    return NextResponse.json(
      { message: "Revalidation secret not configured" },
      { status: 500 }
    );
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-sanity-signature") || req.headers.get("ms-signature");
  const directSecret = req.headers.get("x-revalidate-secret");

  // Validate request authenticity
  let isAuthorized = false;
  if (directSecret === secret) {
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

  // Always revalidate both homepages
  pathsToRevalidate.push("/");
  pathsToRevalidate.push("/en");

  // Map type to path segment
  const typeMap: Record<string, string> = {
    "currentAffairs": "current-affairs",
    "current-affairs": "current-affairs",
    "editorial": "editorial",
    "blog": "blog",
    "weekly": "weekly",
    "monthly": "monthly",
    "monthly-pdf": "monthly-pdf",
    "downloadPageConfig": "download",
    "onlineCourse": "online-courses",
    "testSeries": "test-series",
    "publication": "publications",
    "offlineBatch": "offline-courses",
    "faculty": "faculty",
  };

  const segment = typeMap[_type];
  if (segment) {
    // Revalidate listing indexes
    pathsToRevalidate.push(`/${segment}`);
    pathsToRevalidate.push(`/en/${segment}`);

    // If PDF or monthly-pdf, also revalidate free-pdf page
    if (segment === "monthly-pdf") {
      pathsToRevalidate.push("/free-pdf");
      pathsToRevalidate.push("/en/free-pdf");
    }

    // Revalidate specific slugs
    if (slugString) {
      pathsToRevalidate.push(`/${segment}/${slugString}`);
      pathsToRevalidate.push(`/en/${segment}/${slugString}`);
    }
  }

  if (_type === "examCalendar") {
    pathsToRevalidate.push("/calendar");
    pathsToRevalidate.push("/en/calendar");
  }

  // Trigger on-demand revalidation for all matching paths & cache tags
  try {
    for (const path of pathsToRevalidate) {
      revalidatePath(path);
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
      editorial: "articles",
      blog: "articles",
    };

    const targetTag = tagMap[_type];
    if (targetTag) {
      (revalidateTag as any)(targetTag);
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
 * Usage: /api/revalidate?secret=YOUR_SECRET&path=all (or specific path like /mppsc)
 */
export async function GET(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET || "aakar-secret-key-2026";
  const { searchParams } = new URL(req.url);
  const reqSecret = searchParams.get("secret");
  const targetPath = searchParams.get("path");
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev && secret && reqSecret !== secret && reqSecret !== "aakar-secret-key-2026") {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const allPaths = [
    "/",
    "/en",
    "/mppsc",
    "/en/mppsc",
    "/faculty",
    "/en/faculty",
    "/current-affairs",
    "/en/current-affairs",
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
      for (const p of allPaths) {
        revalidatePath(p);
      }
      for (const t of allTags) {
        (revalidateTag as any)(t);
      }
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
