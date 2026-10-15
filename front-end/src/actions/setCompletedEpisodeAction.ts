"use server";

import { episodeService } from "@/services/episodeService";

export async function setCompletedEpisodeAction(id: number) {
  return await episodeService.setCompleted(id);
}
