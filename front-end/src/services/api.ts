import { cookies } from "next/headers";

export async function api(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}${endpoint}`,
    {
      ...options,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
      },
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Request Error");
  }

  if (response.status === 204) return null;

  return response.json();
}

export async function apiWithAuth(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) throw new Error("Token not found");

  return api(endpoint, {
    headers: {
      ...options.headers,
      Cookie: `token=${token.value}`,
    },
  });
}
