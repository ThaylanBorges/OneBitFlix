"use server";

import { ActionResult } from "@/actions/types";
import {
  CategoryInputSchema,
  CategoryInputType,
} from "@/schemas/admin/categorySchema";
import { categoryService } from "@/services/admin/categoryService";

export async function editCategoryAction(
  id: number,
  data: CategoryInputType,
): Promise<ActionResult> {
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
      data: null,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao editar categoria",
    };
  }
}
