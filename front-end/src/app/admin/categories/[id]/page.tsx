import { CategoryButtonAction } from "@/components/admin/categories/category-button-action";
import { categoryService } from "@/services/admin/categoryService";
import { redirect } from "next/navigation";

type CategoryPageProps = {
  params: Promise<{ id: number }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  const result = await categoryService.show(id);

  if (!result) redirect("/admin/categories");

  return (
    <div className="container mt-[5%] mx-auto w-full px-4">
      <div className="flex justify-between gap-5">
        <h1 className="text-3xl">Categoria</h1>
        <CategoryButtonAction id={id} />
      </div>

      <div className="flex flex-col gap-5 mt-5 p-4 bg-secondary">
        <div>
          <p className="font-bold">Id</p>
          <p>{result.id}</p>
        </div>
        <div>
          <p className="font-bold">Name</p>
          <p>{result.name}</p>
        </div>
        <div>
          <p className="font-bold">Posição</p>
          <p>{result.position}</p>
        </div>
        <div>
          <p className="font-bold">Data de criação</p>
          <p>{result.createdAt}</p>
        </div>
        <div>
          <p className="font-bold">Data de atualização</p>
          <p>{result.updatedAt}</p>
        </div>
      </div>
    </div>
  );
}
