import Slide from "@/components/Slide";
import { Courses } from "@/service/course";

export default async function NewestCoursesSection() {
  const courses = await Courses.getNewestCourses();

  return <Slide courses={courses} />;
}
