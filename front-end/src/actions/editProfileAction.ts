"use server";

import { EditProfile } from "@/schemas/userSchemas";
import { userService } from "@/services/userService";
import { ActionResult } from "./types";

export async function editProfileAction(
  data: EditProfile,
): Promise<ActionResult> {
  try {
    await userService.editUser(data);

    return { success: true, data: null };
  } catch {
    return { success: false, message: "Falha ao editar usuário" };
  }
}
