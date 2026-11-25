"use server";

import { ActionResult } from "@/actions/types";
import {
  CategoryInputSchema,
  CategoryInputType,
} from "@/schemas/admin/categorySchema";
import { categoryService } from "@/services/admin/categoryService";

export async function createCategoryAction(
  data: CategoryInputType,
): Promise<ActionResult> {
  try {
    const parsed = CategoryInputSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Dados inválidos",
      };
    }

    await categoryService.create(parsed.data);

    return {
      success: true,
      data: null,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Falha ao criar categoria",
    };
  }
}
