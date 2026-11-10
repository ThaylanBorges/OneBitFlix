import { userService } from "@/services/userService";
import { redirect } from "next/navigation";
import "server-only";

export async function requireAdmin() {
  const user = await userService.getCurrentUser();

  if (!user || user.role !== "admin") redirect("/home");

  return user;
}
