import Slide from "@/components/Slide";
import { courseService } from "@/services/courseService";

export default async function NewestCoursesSection() {
  const courses = await courseService.getNewestCourses();

  return <Slide courses={courses} />;
}
