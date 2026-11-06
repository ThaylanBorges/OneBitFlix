import { CategoryEditForm } from "@/components/admin/categories/forms/category-edit-form";
import { categoryService } from "@/services/admin/categoryService";
import { redirect } from "next/navigation";

type CategoryEditPageProps = {
  params: Promise<{
    id: number;
  }>;
};

export default async function CategoryEditPage({
  params,
}: CategoryEditPageProps) {
  const { id } = await params;

  const category = await categoryService.show(id);

  if (!category) redirect("/admin/categories");

  return (
    <CategoryEditForm
      id={id}
      defaultValues={{ name: category.name, position: category.position }}
    />
  );
}
