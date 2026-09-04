"use server";

import { EditProfile } from "@/schemas/userSchemas";
import { userService } from "@/services/userService";

export async function editProfileAction(data: EditProfile) {
  try {
    await userService.editUser(data);
    return { success: true };
  } catch {
    return { success: false, message: "Falha ao editar usuário" };
  }
}
