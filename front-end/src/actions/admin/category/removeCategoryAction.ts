"use server";

import { ActionResult } from "@/actions/types";
import { categoryService } from "@/services/admin/categoryService";

export async function removeCategoryAction(id: number): Promise<ActionResult> {
  try {
    await categoryService.remove(id);
    return {
      success: true,
      data: null,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao remover categoria",
    };
  }
}
