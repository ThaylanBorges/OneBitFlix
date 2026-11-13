import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { CourseNewForm } from "@/components/admin/courses/forms/course-new-form";
import { categoryService } from "@/services/admin/categoryService";

export default async function NewCategoryPage() {
  const data = await categoryService.findAll();

  const categoryOptions =
    data?.categories.map((c) => ({
      label: c.name,
      value: c.id,
    })) ?? [];

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 mb-4 text-muted-foreground hover:text-white"
        render={<Link href="/admin/cursos" />}
        nativeButton={false}
      >
        <ArrowLeft />
        Cursos
      </Button>

      <PageHeader
        eyebrow="Curso"
        title="Nova curso"
        description="Preencha os dados para cadastrar uma novo curso."
      />

      <CourseNewForm categoryOptions={categoryOptions} />
    </>
  );
}
