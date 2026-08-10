"use server";
import { Register } from "@/schemas/registerSchema";
import { authService } from "@/services/authService";

export async function registerUser(data: Register) {
  try {
    const response = await authService.register(data);

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
