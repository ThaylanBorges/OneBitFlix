"use client";

import { editCategoryAction } from "@/actions/admin/category/editCategoryAction";
import { CategoryInputType } from "@/schemas/admin/categorySchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
      router.replace("/admin/categories");
    } else {
      toast.error(result.message, {
        className: "mt-15",
      });
    }
  };

  return <CategoryForm onSubmit={onSubmit} defaultValues={defaultValues} />;
}
