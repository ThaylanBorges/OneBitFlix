"use server";
import { courseService } from "@/services/courseService";
import { ActionResult } from "./types";
import { CourseArray } from "@/schemas/courseSchema";

export async function searchCourseAction(
  name: string,
): Promise<ActionResult<CourseArray>> {
  try {
    const result = await courseService.search(name);

    return {
      success: true,
      data: result,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Falha ao buscar curso",
    };
  }
}
