"use server";
import { ActionResult } from "@/actions/types";
import {
  CourseUpdateSchema,
  CourseUpdateType,
} from "@/schemas/admin/courseSchema";
import { courseService } from "@/services/admin/courseService";

export async function editCourseAction(
  id: number,
  data: CourseUpdateType,
): Promise<ActionResult> {
  try {
    const parsed = CourseUpdateSchema.safeParse(data);

    if (!parsed.success) return { success: false, message: "Formato inválido" };

    await courseService.edit(id, data);
    return {
      success: true,
      data: null,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao editar curso",
    };
  }
}
