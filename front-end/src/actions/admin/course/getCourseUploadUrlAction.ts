"use server";

import { courseService } from "@/services/admin/courseService";

export async function getCourseUploadUrlAction(
  id: number,
  format: string,
  size: number,
) {
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
