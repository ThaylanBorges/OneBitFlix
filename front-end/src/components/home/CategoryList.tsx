import { categoryService } from "@/services/categoryService";
import CategorySection from "./CategorySection";

type Category = {
  id: number;
  name: string;
  position: number;
};

export default async function CategotyList() {
  const categories = await categoryService.getCategories();

  return (
    <div>
      {categories.map((c: Category) => (
        <div key={c.id} className="container mx-auto mt-20">
          <p className="px-4 text-2xl font-bold">{c.name}</p>
          <CategorySection categoryId={c.id} />
        </div>
      ))}
    </div>
  );
}
