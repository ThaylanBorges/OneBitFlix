import HeaderAuth from "@/components/home/HeaderAuth";
import { courseService } from "@/services/courseService";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;

  const course = await courseService.getById(Number(id));

  if (!course.success) return;

  return (
    <div>
      <HeaderAuth />
    </div>
  );
}
