import { courseService } from "@/services/courseService";
import Slide from "../Slide";

export default async function FavoriteSection() {
  const courses = await courseService.getFavorites();

  return (
    <Slide
      courses={courses}
      errorMessage="Nenhum curso foi favoritado ainda."
    />
  );
}
