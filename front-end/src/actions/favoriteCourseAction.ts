"use server";
import { courseService } from "@/services/courseService";

export async function addFavoriteAction(courseId: number) {
  return courseService.addToFavorites(courseId);
}

export async function removeFavoriteAction(courseId: number) {
  return courseService.removeFromFavorites(courseId);
}
