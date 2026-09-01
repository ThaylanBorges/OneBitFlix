import { categoryService } from "@/services/categoryService";
import Slide from "../Slide";

type CategoryListProps = {
  categoryId: number;
};

export default async function CategorySection({
  categoryId,
}: CategoryListProps) {
  const { courses } = await categoryService.getCoursesWithCategorie(categoryId);

  return <Slide courses={courses} />;
}
