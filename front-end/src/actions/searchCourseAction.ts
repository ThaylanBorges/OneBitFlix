"use server";
import { courseService } from "@/services/courseService";

export async function searchCourseAction(name: string) {
  return courseService.search(name);
}
