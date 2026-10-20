"use server";

import {
  Login,
  LoginSchema,
  Register,
  RegisterSchema,
  TokenResponseSchema,
} from "@/schemas/userSchemas";
import { authService } from "@/services/authService";
import { ApiError, NetworkError } from "@/services/errors";
import { cookies } from "next/headers";

type ActionResult = Promise<
  { success: true } | { success: false; message: string }
>;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60,
} as const;

export async function loginAction(data: Login): ActionResult {
  try {
    const parsed = LoginSchema.safeParse(data);

    if (!parsed.success)
      return {
        success: false,
        message: "Dados inválidos",
      };

    const response = await authService.login(parsed.data);

    const tokenDecoded = TokenResponseSchema.safeParse(response);

    if (!tokenDecoded.success) {
      console.error(response);

      return {
        success: false,
        message: "Resposta inesperada do servidor. Tente novamente",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("token", tokenDecoded.data.token, COOKIE_OPTIONS);

    return { success: true };
  } catch (err) {
    if (err instanceof NetworkError)
      return {
        success: false,
        message: err.message,
      };

    if (err instanceof ApiError && err.status === 401)
      return {
        success: false,
        message: "Email ou senha inválidos",
      };

    if (err instanceof ApiError && err.status === 429)
      return {
        success: false,
        message: "Muitas tentativas. Tente novamente em alguns minutos",
      };

    console.error(err);

    return {
      success: false,
      message: "Falha ao entrar",
    };
  }
}

export async function registerAction(data: Register): ActionResult {
  try {
    const parsed = RegisterSchema.safeParse(data);

    if (!parsed.success) return { success: false, message: "Dados inválidos" };

    const response = await authService.register(parsed.data);

    const tokenDecoded = TokenResponseSchema.safeParse(response);

    if (!tokenDecoded.success) {
      console.error(response);

      return {
        success: false,
        message: "Resposta inesperada do servidor. Tente novamente",
      };
    }
    const cookieStore = await cookies();

    cookieStore.set("token", tokenDecoded.data.token, COOKIE_OPTIONS);

    return { success: true };
  } catch (err) {
    if (err instanceof NetworkError)
      return {
        success: false,
        message: err.message,
      };

    if (err instanceof ApiError && err.status === 409)
      return {
        success: false,
        message: "Não foi possível criar a conta com esses dados",
      };

    if (err instanceof ApiError && err.status === 429)
      return {
        success: false,
        message: "Muitas tentativas. Tente novamente em alguns minutos",
      };

    console.error(err);

    return {
      success: false,
      message: "Falha ao registrar",
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
