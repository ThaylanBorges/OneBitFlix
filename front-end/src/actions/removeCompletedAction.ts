"use server";

import { episodeService } from "@/services/episodeService";
import { ActionResult } from "./types";

export async function removeCompletedAction(
  episodeId: number,
): Promise<ActionResult> {
  try {
    await episodeService.removeCompleted(episodeId);
    return {
      success: true,
      data: null,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Falha ao desmarcar o episódio completo",
    };
  }
}
