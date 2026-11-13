"use server";

import { courseService } from "@/services/admin/courseService";

export async function removeCourseAction(id: number) {
  try {
    await courseService.delete(id);

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao remover curso",
    };
  }
}
