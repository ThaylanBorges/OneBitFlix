import { categoryService } from "@/services/categoryService";
import Slide from "../slide/Slide";

type CategoryListProps = {
  categoryId: number;
};

export default async function CategorySection({
  categoryId,
}: CategoryListProps) {
  const courses = await categoryService.getCoursesWithCategory(categoryId);

  return (
    <Slide courses={courses} emptyMessage="Nenhum curso foi adicionado." />
  );
}
