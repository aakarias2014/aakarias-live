import { redirect } from "next/navigation";
import { getContentRepository } from "@/lib/content/content-repository";

export const revalidate = 60; // Fetch latest date with low cache duration

export default async function HindiDailyRedirectPage() {
  const repo = await getContentRepository();
  const latestDate = await repo.getLatestDateWithContent() || new Date().toISOString().split("T")[0];
  redirect(`/current-affairs/${latestDate}`);
}
