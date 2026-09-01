import { categoryService } from "@/services/categoryService";
import CategorySection from "./CategorySection";
import { Suspense } from "react";
import CoursesSlideSkeleton from "../SkeletonCursesSlide";

type Category = {
  id: number;
  name: string;
  position: number;
};

export default async function CategoryList() {
  const categories = await categoryService.getCategories();

  return (
    <div>
      {categories.map((c: Category) => (
        <div key={c.id} className="container mx-auto mt-20">
          <p className="px-4 text-2xl font-bold">{c.name}</p>
          <Suspense fallback={<CoursesSlideSkeleton />}>
            <CategorySection categoryId={c.id} />
          </Suspense>
        </div>
      ))}
    </div>
  );
}
