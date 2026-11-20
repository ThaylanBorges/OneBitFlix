"use server";

import { ActionResult } from "@/actions/types";
import { courseService } from "@/services/admin/courseService";

export async function removeCourseAction(id: number): Promise<ActionResult> {
  try {
    await courseService.delete(id);

    return {
      success: true,
      data: null,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao remover curso",
    };
  }
}
