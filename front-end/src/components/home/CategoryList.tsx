import { categoryService } from "@/services/categoryService";
import CategorySection from "./CategorySection";
import { Suspense } from "react";
import CoursesSlideSkeleton from "../SkeletonCursesSlide";
import { Category } from "@/schemas/categorySchema";
import SectionHeading from "./SectionHeading";
import Animated from "../Animated";

export default async function CategoryList() {
  const categories = await categoryService.getCategories();

  return (
    <div>
      {categories.map((c: Category) => (
        <div key={c.id} className="container mx-auto mt-16 sm:mt-20">
          <Animated type="fadeUp">
            <SectionHeading title={c.name} />
          </Animated>
          <Suspense fallback={<CoursesSlideSkeleton />}>
            <CategorySection categoryId={c.id} />
          </Suspense>
        </div>
      ))}
    </div>
  );
}
