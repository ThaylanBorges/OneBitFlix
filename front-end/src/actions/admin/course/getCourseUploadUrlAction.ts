"use server";

import { ActionResult } from "@/actions/types";
import { ThumbnailUrlType } from "@/schemas/admin/courseSchema";
import { courseService } from "@/services/admin/courseService";

export async function getCourseUploadUrlAction(
  id: number,
  format: string,
  size: number,
): Promise<ActionResult<ThumbnailUrlType>> {
  try {
    const result = await courseService.urlForSaveThumbnail(id, format, size);

    return {
      success: true,
      data: result,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao receber url",
    };
  }
}
