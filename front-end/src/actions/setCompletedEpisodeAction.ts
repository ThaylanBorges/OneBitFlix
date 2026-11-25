"use server";

import { episodeService } from "@/services/episodeService";
import { ActionResult } from "./types";

export async function setCompletedEpisodeAction(
  id: number,
): Promise<ActionResult> {
  try {
    await episodeService.setCompleted(id);

    return {
      success: true,
      data: null,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Falha ao concluir episódio",
    };
  }
}
