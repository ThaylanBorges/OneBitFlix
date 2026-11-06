"use server";

import { categoryService } from "@/services/admin/categoryService";

export async function removeCategoryAction(id: number) {
  try {
    await categoryService.remove(id);
    return {
      success: true,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao remover categoria",
    };
  }
}
