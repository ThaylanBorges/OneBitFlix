"use server";
import { courseService } from "@/services/courseService";
import { ActionResult } from "./types";

export async function addFavoriteAction(
  courseId: number,
): Promise<ActionResult> {
  try {
    await courseService.addToFavorites(courseId);

    return {
      success: true,
      data: null,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Falha ao dar like no curso",
    };
  }
}

export async function removeFavoriteAction(
  courseId: number,
): Promise<ActionResult> {
  try {
    await courseService.removeFromFavorites(courseId);

    return {
      success: true,
      data: null,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Falha ao remover like do curso",
    };
  }
}
