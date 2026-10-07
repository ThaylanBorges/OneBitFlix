"use server";

import { episodeService } from "@/services/episodeService";

export async function setCompletedEpisodeAction(id: number, seconds: number) {
  return await episodeService.setCompleted(id, Math.floor(seconds));
}
