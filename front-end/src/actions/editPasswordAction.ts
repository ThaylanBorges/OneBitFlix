"use server";

import { EditPassword } from "@/schemas/userSchemas";
import { ApiError, NetworkError } from "@/services/errors";
import { userService } from "@/services/userService";
import { ActionResult } from "./types";

export async function editPasswordAction(
  data: EditPassword,
): Promise<ActionResult> {
  try {
    await userService.editPassword(data);
    return { success: true, data: null };
  } catch (err) {
    if (err instanceof NetworkError)
      return {
        success: false,
        message: err.message,
      };

    if (err instanceof ApiError && err.status === 403)
      return {
        success: false,
        message: "Senha atual incorreta",
      };

    if (err instanceof ApiError && err.status === 429)
      return {
        success: false,
        message: "Muitas tentativas. Tente novamente em alguns minutos",
      };

    return {
      success: false,
      message: "Falha ao editar senha",
    };
  }
}
