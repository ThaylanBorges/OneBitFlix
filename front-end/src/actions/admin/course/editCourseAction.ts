"use server";
import {
  CourseUpdateSchema,
  CourseUpdateType,
} from "@/schemas/admin/courseSchema";
import { courseService } from "@/services/admin/courseService";

export async function editCourseAction(id: number, data: CourseUpdateType) {
  try {
    const parsed = CourseUpdateSchema.safeParse(data);

    if (!parsed.success) return { success: false, message: "Formato inválido" };

    await courseService.edit(id, data);
    return {
      success: true,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao editar curso",
    };
  }
}
