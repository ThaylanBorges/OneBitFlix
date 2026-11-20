"use server";

import { ActionResult } from "@/actions/types";
import {
  ThumbnailUrlSchema,
  ThumbnailUrlType,
} from "@/schemas/admin/courseSchema";
import { courseService } from "@/services/admin/courseService";

export async function getCourseUploadUrlAction(
  id: number,
  format: string,
  size: number,
): Promise<ActionResult<ThumbnailUrlType>> {
  try {
    const result = await courseService.urlForSaveThumbnail(id, format, size);

    const parsed = ThumbnailUrlSchema.safeParse(result);

    if (!parsed.success) return { success: false, message: "Formato inválido" };

    return {
      success: true,
      data: parsed.data,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao receber url",
    };
  }
}
