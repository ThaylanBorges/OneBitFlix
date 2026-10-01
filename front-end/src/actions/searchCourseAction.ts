"use server";
import { courseService } from "@/services/courseService";

export async function searchCourseAction(name: string) {
  try {
    return courseService.search(name);
  } catch {
    return null;
  }
}
