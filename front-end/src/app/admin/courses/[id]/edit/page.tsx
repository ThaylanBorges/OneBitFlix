import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/admin/categoryService";
import { courseService } from "@/services/admin/courseService";
import { CourseEditForm } from "@/components/admin/courses/forms/course-edit-form";

type CourseEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CourseEditPage({ params }: CourseEditPageProps) {
  const { id } = await params;
  const courseId = Number(id);

  const course = await courseService.show(courseId);

  if (!course) redirect("/admin/courses");

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
        render={<Link href={`/admin/courses/${courseId}`} />}
        nativeButton={false}
      >
        <ArrowLeft />
        {course.name}
      </Button>

      <PageHeader
        eyebrow="Cursos"
        title="Editar curso"
        description={`Alterando "${course.name}"`}
      />

      <CourseEditForm
        id={courseId}
        categoryOptions={categoryOptions}
        defaultValues={{
          name: course.name,
          categoryId: course.categoryId,
          synopsis: course.synopsis,
          featured: course.featured,
        }}
      />
    </>
  );
}
