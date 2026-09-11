import { courseService } from "@/services/courseService";

export async function getCourseByIdAction(id: number) {
  return courseService.getById(id);
}
