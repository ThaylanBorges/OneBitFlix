import { Login } from "@/schemas/loginSchema";
import { authService } from "@/services/authService";

export async function login(data: Login) {
  try {
    const response = await authService.login(data);

    return {
      success: true,
      data: response,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Internal Error.",
    };
  }
}
