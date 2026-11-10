import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { CategoryEditForm } from "@/components/admin/categories/forms/category-edit-form";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/admin/categoryService";

type CategoryEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CategoryEditPage({
  params,
}: CategoryEditPageProps) {
  const { id } = await params;
  const categoryId = Number(id);

  const category = await categoryService.show(categoryId);

  if (!category) redirect("/admin/categories");

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 mb-4 text-muted-foreground hover:text-white"
        render={<Link href={`/admin/categories/${categoryId}`} />}
        nativeButton={false}
      >
        <ArrowLeft />
        {category.name}
      </Button>

      <PageHeader
        eyebrow="Categorias"
        title="Editar categoria"
        description={`Alterando "${category.name}"`}
      />

      <CategoryEditForm
        id={categoryId}
        defaultValues={{ name: category.name, position: category.position }}
      />
    </>
  );
}
