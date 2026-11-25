"use server";

import { ActionResult } from "@/actions/types";
import { CategoryListType } from "@/schemas/admin/categorySchema";
import { categoryService } from "@/services/admin/categoryService";

export async function findAllCategoryAction(): Promise<
  ActionResult<CategoryListType>
> {
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
