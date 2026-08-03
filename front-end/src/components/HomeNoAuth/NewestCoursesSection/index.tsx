import Slide from "@/components/Slide";
import { Button } from "@/components/ui/button";
import { Courses } from "@/service/course";
import Link from "next/link";

export default async function NewestCoursesSection() {
  const courses = await Courses.getNewestCourses();

  return (
    <div>
      <Slide courses={courses} />
      <div className="flex justify-center mt-10">
        <Button
          render={<Link href="/register" />}
          nativeButton={false}
          variant={"outline"}
          size={"xl"}
        >
          Se cadastre para acessar!
        </Button>
      </div>
    </div>
  );
}
