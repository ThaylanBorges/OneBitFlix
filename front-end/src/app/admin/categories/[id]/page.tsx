import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, CalendarClock, CalendarPlus, Hash, ListOrdered } from "lucide-react";

import { CategoryButtonAction } from "@/components/admin/categories/category-button-action";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/admin/categoryService";
import { formatDateTime, formatRelative } from "@/utils/formatDate";

type CategoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const categoryId = Number(id);

  const category = await categoryService.show(categoryId);

  if (!category) redirect("/admin/categories");

  const fields = [
    { label: "ID", value: `#${category.id}`, icon: Hash, mono: true },
    { label: "Posição na home", value: String(category.position), icon: ListOrdered },
    {
      label: "Criada em",
      value: formatDateTime(category.createdAt),
      sub: formatRelative(category.createdAt),
      icon: CalendarPlus,
    },
    {
      label: "Atualizada em",
      value: formatDateTime(category.updatedAt),
      sub: formatRelative(category.updatedAt),
      icon: CalendarClock,
    },
  ];

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
        eyebrow="Categoria"
        title={category.name}
        description="Detalhes do registro"
        actions={<CategoryButtonAction id={category.id} name={category.name} />}
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
