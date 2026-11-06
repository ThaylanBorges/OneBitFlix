import { CategoryTable } from "@/components/admin/categories/category-table";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/admin/categoryService";
import Link from "next/link";
import { redirect } from "next/navigation";

type CategoriesPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  const result = await categoryService.list(currentPage);

  if (!result) redirect("/admin/");

  const totalPages = Math.ceil(result.total / result.perPage);

  return (
    <>
      <Button
        render={<Link href={`/admin/categories/new`} />}
        nativeButton={false}
        variant={"default"}
      >
        Criar Categoria
      </Button>

      <CategoryTable categorieList={result.categories} />

      <div className="flex items-center justify-center gap-5 p-5">
        <Button
          render={<Link href={`/admin/categories?page=${currentPage - 1}`} />}
          disabled={currentPage <= 1}
          nativeButton={false}
          variant={"outline"}
        >
          Voltar
        </Button>

        <div className="flex justify-center">
          {currentPage} de {totalPages}
        </div>

        <Button
          render={<Link href={`/admin/categories?page=${currentPage + 1}`} />}
          disabled={currentPage >= totalPages}
          nativeButton={false}
          variant={"outline"}
        >
          Próximo
        </Button>
      </div>
    </>
  );
}
