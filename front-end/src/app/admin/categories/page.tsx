import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Tags } from "lucide-react";

import { CategoryTable } from "@/components/admin/categories/category-table";
import { PageHeader } from "@/components/admin/page-header";
import { Pagination } from "@/components/admin/pagination";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/admin/categoryService";

type CategoriesPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const { page } = await searchParams;

  const currentPage = Math.max(1, Number(page) || 1);

  const result = await categoryService.list(currentPage);

  if (!result) redirect("/admin");

  const totalPages = Math.max(1, Math.ceil(result.total / result.perPage));

  // ex.: excluiu o último item da última página
  if (result.categories.length === 0 && currentPage > totalPages) {
    redirect(`/admin/categories?page=${totalPages}`);
  }

  return (
    <>
      <PageHeader
        eyebrow="Tabela"
        title="Categorias"
        description={
          result.total === 1
            ? "1 categoria cadastrada"
            : `${result.total} categorias cadastradas`
        }
        actions={
          <Button
            size="lg"
            render={<Link href="/admin/categories/new" />}
            nativeButton={false}
          >
            <Plus />
            Nova categoria
          </Button>
        }
      />

      <div className="overflow-hidden rounded-xl bg-card ring-1 ring-white/8">
        {result.categories.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
              <Tags className="size-5 text-white/50" />
            </span>
            <div>
              <p className="font-medium">Nenhuma categoria por aqui</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Crie a primeira categoria para organizar os cursos.
              </p>
            </div>
            <Button
              className="mt-2"
              render={<Link href="/admin/categories/new" />}
              nativeButton={false}
            >
              <Plus />
              Criar categoria
            </Button>
          </div>
        ) : (
          <>
            {/* key força o reset do estado local da tabela ao trocar de página */}
            <CategoryTable key={currentPage} categorieList={result.categories} />
            <Pagination
              basePath="/admin/categories"
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
