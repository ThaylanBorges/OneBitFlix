"use server";
import { courseService } from "@/services/courseService";

export async function addFavoriteAction(courseId: number) {
  await courseService.addToFavorites(courseId);
}

export async function removeFavoriteAction(courseId: number) {
  await courseService.removeFromFavorites(courseId);
}
