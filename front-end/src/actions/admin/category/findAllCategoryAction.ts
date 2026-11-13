"use server";

import { categoryService } from "@/services/admin/categoryService";

export async function findAllCategoryAction() {
  try {
    const result = await categoryService.findAll();

    return {
      success: true,
      data: result,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao editar categoria",
    };
  }
}
