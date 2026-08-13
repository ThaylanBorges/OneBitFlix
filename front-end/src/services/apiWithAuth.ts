import { cookies } from "next/headers";
import { api } from "./api";

export async function apiWithAuth(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) throw new Error("Token not found");

  return api(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Cookie: `token=${token.value}`,
    },
  });
}
