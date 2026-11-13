"use server";

import {
  CourseCreatePayloadSchema,
  CourseCreatePayloadType,
} from "@/schemas/admin/courseSchema";
import { courseService } from "@/services/admin/courseService";

export async function createCourseAction(data: CourseCreatePayloadType) {
  const parsed = CourseCreatePayloadSchema.safeParse(data);

  if (!parsed.success) return { success: false, message: "Formato inválido" };

  try {
    const course = await courseService.create(parsed.data);

    return { success: true, id: course.id };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao criar curso",
    };
  }
}
