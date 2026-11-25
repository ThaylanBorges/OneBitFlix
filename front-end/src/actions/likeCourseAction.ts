"use server";
import { courseService } from "@/services/courseService";
import { ActionResult } from "./types";

export async function addLikeAction(courseId: number): Promise<ActionResult> {
  try {
    await courseService.addLike(courseId);
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

export async function removeLikeAction(
  courseId: number,
): Promise<ActionResult> {
  try {
    await courseService.removeLike(courseId);

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
