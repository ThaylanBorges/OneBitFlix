"use server";
import { episodeService } from "@/services/episodeService";

export async function setWatchTimeAction(episodeId: number, seconds: number) {
  return await episodeService.setWatchTime(episodeId, seconds);
}
