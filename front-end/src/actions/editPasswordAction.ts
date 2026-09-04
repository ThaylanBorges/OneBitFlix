"use server";

import { EditPassword } from "@/schemas/userSchemas";
import { userService } from "@/services/userService";

export async function editPasswordAction(data: EditPassword) {
  try {
    await userService.editPassword(data);
    return { success: true };
  } catch {
    return { success: false, message: "Senha atual incorreta" };
  }
}
