"use server";
import { courseService } from "@/services/courseService";

export async function addLikeAction(courseId: number) {
  await courseService.(courseId);
}

export async function removeLikeAction(courseId: number) {
  await courseService.(courseId);
}
