"use server";
import { Register } from "@/schemas/register";
import { User } from "@/service/user";

export async function registerUser(data: Register) {
  try {
    const response = await User.register(data);

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
