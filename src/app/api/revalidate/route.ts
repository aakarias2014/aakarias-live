import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
    "current-affairs": "current-affairs",
    "editorial": "editorial",
    "blog": "blog",
    "weekly": "weekly",
    "monthly": "monthly",
    "monthly-pdf": "monthly-pdf",
    "downloadPageConfig": "download",
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

  // Trigger on-demand revalidation for all matching paths
  try {
    for (const path of pathsToRevalidate) {
      revalidatePath(path);
      console.log(`[ISR] Revalidated path: ${path}`);
    }

    return NextResponse.json({
      revalidated: true,
      message: `Successfully revalidated ${pathsToRevalidate.length} paths`,
      paths: pathsToRevalidate,
    });
  } catch (err) {
    console.error("ISR revalidation execution error:", err);
    return NextResponse.json(
      { message: "Error execution path revalidation", error: String(err) },
      { status: 500 }
    );
  }
}
