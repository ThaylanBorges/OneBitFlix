"use server";
import { Register } from "@/schemas/register";
import { userService } from "@/services/userService";

export async function registerUser(data: Register) {
  try {
    const response = await userService.register(data);

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
