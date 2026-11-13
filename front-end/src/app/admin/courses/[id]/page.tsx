import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarClock,
  CalendarPlus,
  Hash,
  ListOrdered,
} from "lucide-react";

import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { formatDateTime, formatRelative } from "@/utils/formatDate";
import { courseService } from "@/services/admin/courseService";
import { CourseButtonAction } from "@/components/admin/courses/course-button-action";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const coutseId = Number(id);

  const course = await courseService.show(coutseId);

  if (!course) redirect("/admin/courses");

  const fields = [
    { label: "ID", value: `#${course.id}`, icon: Hash, mono: true },
    {
      label: "Synopsi",
      value: String(course.synopsis),
      icon: ListOrdered,
    },
    {
      label: "Url da thumbnail",
      value: String(course.thumbnailUrl),
      icon: ListOrdered,
    },
    {
      label: "Id da categoria",
      value: course.categoryId,
      icon: ListOrdered,
    },
    {
      label: "Nome da categoria",
      value: String(course.categoryName),
      icon: ListOrdered,
    },
    {
      label: "Em destaque",
      value: course.featured ? "Sim" : "Não",
      icon: ListOrdered,
    },
    {
      label: "Criado em",
      value: formatDateTime(course.createdAt),
      sub: formatRelative(course.createdAt),
      icon: CalendarPlus,
    },
    {
      label: "Atualizado em",
      value: formatDateTime(course.updatedAt),
      sub: formatRelative(course.updatedAt),
      icon: CalendarClock,
    },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 mb-4 text-muted-foreground hover:text-white"
        render={<Link href="/admin/courses" />}
        nativeButton={false}
      >
        <ArrowLeft />
        Cursos
      </Button>

      <PageHeader
        eyebrow="Curso"
        title={course.name}
        description="Detalhes do registro"
        actions={<CourseButtonAction id={course.id} name={course.name} />}
      />

      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/8 ring-1 ring-white/8 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="flex gap-4 bg-card p-5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60 ring-1 ring-white/8">
              <field.icon className="size-4" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {field.label}
              </dt>
              <dd
                className={`mt-1 truncate text-base font-medium ${field.mono ? "font-mono" : ""}`}
              >
                {field.value}
              </dd>
              {field.sub && (
                <dd className="mt-0.5 text-xs text-white/45">{field.sub}</dd>
              )}
            </div>
          </div>
        ))}
      </dl>
    </>
  );
}
