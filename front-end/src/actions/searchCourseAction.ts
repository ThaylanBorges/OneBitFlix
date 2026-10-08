"use server";
import { courseService } from "@/services/courseService";

export async function searchCourseAction(name: string) {
  try {
    return await courseService.search(name);
  } catch {
    return null;
  }
}
