import Slide from "@/components/Slide";
import { courseService } from "@/services/courseService";

export default async function FavoriteSection() {
  const courses = await courseService.getFavorites();

  return (
    <Slide
      courses={courses}
      errorMessage="Nenhum curso foi favoritado ainda."
    />
  );
}
