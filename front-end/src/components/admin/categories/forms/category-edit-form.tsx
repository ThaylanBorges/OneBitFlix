"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { editCategoryAction } from "@/actions/admin/category/editCategoryAction";
import { CategoryInputType } from "@/schemas/admin/categorySchema";
import { CategoryForm } from "./category-form";

type CategoryEditFormProps = {
  id: number;
  defaultValues: CategoryInputType;
};

export function CategoryEditForm({ id, defaultValues }: CategoryEditFormProps) {
  const router = useRouter();

  const onSubmit = async (data: CategoryInputType) => {
    const result = await editCategoryAction(id, data);

    if (result.success) {
      toast.success("Alterações salvas");
      router.replace(`/admin/categories/${id}`);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <CategoryForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      cancelHref={`/admin/categories/${id}`}
      submitLabel="Salvar alterações"
    />
  );
}
