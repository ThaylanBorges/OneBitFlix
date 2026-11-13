import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Tags } from "lucide-react";

import { PageHeader } from "@/components/admin/page-header";
import { Pagination } from "@/components/admin/pagination";
import { Button } from "@/components/ui/button";
import { courseService } from "@/services/admin/courseService";
import { CourseTable } from "@/components/admin/courses/course-table";

type CoursesPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const { page } = await searchParams;

  const currentPage = Math.max(1, Number(page) || 1);

  const result = await courseService.list(currentPage);

  if (!result) redirect("/admin");

  const totalPages = Math.max(1, Math.ceil(result.total / result.perPage));

  if (result.courses.length === 0 && currentPage > totalPages) {
    redirect(`/admin/courses?page=${totalPages}`);
  }

  return (
    <>
      <PageHeader
        eyebrow="Tabela"
        title="Cursos"
        description={
          result.total === 1
            ? "1 curso cadastrada"
            : `${result.total} cursos cadastrados`
        }
        actions={
          <Button
            size="lg"
            render={<Link href="/admin/courses/new" />}
            nativeButton={false}
          >
            <Plus />
            Novo Curso
          </Button>
        }
      />

      <div className="overflow-hidden rounded-xl bg-card ring-1 ring-white/8">
        {result.courses.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
              <Tags className="size-5 text-white/50" />
            </span>
            <div>
              <p className="font-medium">Nenhum curso por aqui</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Crie o primeiro curso para organizar os episódios.
              </p>
            </div>
            <Button
              className="mt-2"
              render={<Link href="/admin/courses/new" />}
              nativeButton={false}
            >
              <Plus />
              Criar curso
            </Button>
          </div>
        ) : (
          <>
            <CourseTable
              key={currentPage}
              courseList={result.courses}
            ></CourseTable>
            <Pagination
              basePath="/admin/courses"
              page={currentPage}
              perPage={result.perPage}
              total={result.total}
            />
          </>
        )}
      </div>
    </>
  );
}
