import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CategoryNewForm } from "@/components/admin/categories/forms/category-new-form";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";

export default function NewCategoryPage() {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 mb-4 text-muted-foreground hover:text-white"
        render={<Link href="/admin/categories" />}
        nativeButton={false}
      >
        <ArrowLeft />
        Categorias
      </Button>

      <PageHeader
        eyebrow="Categorias"
        title="Nova categoria"
        description="Preencha os dados para cadastrar uma nova categoria."
      />

      <CategoryNewForm />
    </>
  );
}
