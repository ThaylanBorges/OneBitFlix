"use server";

import { EditPassword } from "@/schemas/userSchemas";
import { ApiError, NetworkError } from "@/services/errors";
import { userService } from "@/services/userService";

type ActionResult = Promise<
  { success: true } | { success: false; message: string }
>;

export async function editPasswordAction(data: EditPassword): ActionResult {
  try {
    await userService.editPassword(data);
    return { success: true };
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
