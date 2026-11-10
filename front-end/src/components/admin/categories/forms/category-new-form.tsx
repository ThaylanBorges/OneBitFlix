"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createCategoryAction } from "@/actions/admin/category/createCategoryAction";
import { CategoryInputType } from "@/schemas/admin/categorySchema";
import { CategoryForm } from "./category-form";

export function CategoryNewForm() {
  const router = useRouter();

  const onSubmit = async (data: CategoryInputType) => {
    const result = await createCategoryAction(data);

    if (result.success) {
      toast.success(`Categoria "${data.name}" criada`);
      router.replace("/admin/categories");
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return <CategoryForm onSubmit={onSubmit} submitLabel="Criar categoria" />;
}
