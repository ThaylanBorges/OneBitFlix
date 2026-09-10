import { categoryService } from "@/services/categoryService";
import Slide from "../Slide";

type CategoryListProps = {
  categoryId: number;
};

export default async function CategorySection({
  categoryId,
}: CategoryListProps) {
  const category = await categoryService.getCoursesWithCategory(categoryId);

  if (!category.success) return null;

  return <Slide courses={category.data.courses} />;
}
