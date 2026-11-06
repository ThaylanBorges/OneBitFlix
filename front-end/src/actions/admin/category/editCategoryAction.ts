"use server";

import {
  CategoryInputSchema,
  CategoryInputType,
} from "@/schemas/admin/categorySchema";
import { categoryService } from "@/services/admin/categoryService";

export async function editCategoryAction(id: number, data: CategoryInputType) {
  try {
    const parsed = CategoryInputSchema.safeParse(data);

    if (!parsed.success)
      return {
        success: false,
        message: "Formato inválido",
      };

    await categoryService.update(id, parsed.data);

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao editar categoria",
    };
  }
}
