"use client";

import { useRouter } from "next/navigation";
import { CategoryForm } from "./category-form";
import { CategoryInputType } from "@/schemas/admin/categorySchema";
import { createCategoryAction } from "@/actions/admin/category/createCategoryAction";
import { toast } from "sonner";

export function CategoryNewForm() {
  const router = useRouter();

  const onSubmit = async (data: CategoryInputType) => {
    const result = await createCategoryAction(data);

    if (result.success) {
      router.replace("/admin/categories");
    } else {
      toast.error(result.message, {
        className: "mt-15",
      });
    }
  };

  return <CategoryForm onSubmit={onSubmit} />;
}
