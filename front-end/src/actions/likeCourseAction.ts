"use server";
import { courseService } from "@/services/courseService";

export async function addLikeAction(courseId: number) {
  return courseService.addLike(courseId);
}

export async function removeLikeAction(courseId: number) {
  return courseService.removeLike(courseId);
}
