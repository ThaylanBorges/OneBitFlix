import { courseService } from "@/services/courseService";
import Slide from "../slide/Slide";

export default async function FavoriteSection() {
  const courses = await courseService.getFavorites();

  return (
    <Slide
      courses={courses}
      emptyMessage="Nenhum curso foi favoritado ainda."
    />
  );
}
