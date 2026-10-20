import { courseService } from "@/services/courseService";
import Slide from "./slide/Slide";

export default async function NewestCoursesSection() {
  const courses = await courseService.getNewestCourses();

  return (
    <Slide
      courses={courses}
      emptyMessage="Nenhum curso foi lançado ultimamente."
    />
  );
}
