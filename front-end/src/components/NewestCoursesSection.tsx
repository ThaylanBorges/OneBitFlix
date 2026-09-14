import { courseService } from "@/services/courseService";
import Slide from "./Slide";

export default async function NewestCoursesSection() {
  const courses = await courseService.getNewestCourses();

  return <Slide courses={courses} />;
}
