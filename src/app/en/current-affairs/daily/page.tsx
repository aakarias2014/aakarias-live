import { redirect } from "next/navigation";
import { getContentRepository } from "@/lib/content/content-repository";

export const revalidate = 3600; // 1h ISR fallback — Sanity webhook handles instant updates

export default async function EnglishDailyRedirectPage() {
  const repo = await getContentRepository();
  const latestDate = await repo.getLatestDateWithContent() || new Date().toISOString().split("T")[0];
  redirect(`/en/current-affairs/${latestDate}`);
}
