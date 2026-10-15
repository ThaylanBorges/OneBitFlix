"use server";

import { episodeService } from "@/services/episodeService";

export async function removeCompletedAction(episodeId: number) {
  return await episodeService.removeCompleted(episodeId);
}
