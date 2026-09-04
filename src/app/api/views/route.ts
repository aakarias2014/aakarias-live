import { NextRequest, NextResponse } from "next/server";
import { getBaseArticleViews } from "@/lib/views";

// In-memory store for incremental live view counts per article slug
const liveExtraViewsMap = new Map<string, number>();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
  }

  const base = getBaseArticleViews(slug);
  const extra = liveExtraViewsMap.get(slug) || 0;

  return NextResponse.json({
    slug,
    views: base + extra,
    base,
    extra,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = body?.slug;

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const currentExtra = liveExtraViewsMap.get(slug) || 0;
    const newExtra = currentExtra + 1;
    liveExtraViewsMap.set(slug, newExtra);

    const base = getBaseArticleViews(slug);
    const totalViews = base + newExtra;

    return NextResponse.json({
      slug,
      views: totalViews,
      base,
      extra: newExtra,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to record view" }, { status: 500 });
  }
}
