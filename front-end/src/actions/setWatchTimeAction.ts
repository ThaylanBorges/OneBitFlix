"use server";
import { episodeService } from "@/services/episodeService";
import { ActionResult } from "./types";

export async function setWatchTimeAction(
  episodeId: number,
  seconds: number,
): Promise<ActionResult> {
  try {
    await episodeService.setWatchTime(episodeId, seconds);
    return {
      success: true,
      data: null,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Falha ao salvar tempo de episódio",
    };
  }
}
