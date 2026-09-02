"use server";

import { getContentRepository } from "@/lib/content/content-repository";
import type { AdConfig } from "@/data/ads";

export async function getSanityAdsAction(): Promise<AdConfig[]> {
  try {
    const repo = await getContentRepository();
    const ads = await repo.listAds();
    return ads;
  } catch (error) {
    console.error("Error fetching Sanity ads action:", error);
    return [];
  }
}
