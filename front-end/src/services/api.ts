import "server-only";

import { ApiError, NetworkError } from "./errors";
import { getClientIp } from "@/utils/clientIp";

export async function api(endpoint: string, options: RequestInit = {}) {
  let response;

  const clientIp = await getClientIp();

  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
        "x-internal-key": process.env.INTERNAL_API_KEY ?? "",
        ...(clientIp && { "x-client-ip": clientIp }),
      },
    });
  } catch (err) {
    console.error("Falha de rede em", endpoint, err);
    throw new NetworkError("Não foi possível conectar ao servidor");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(error.message || "Request Error", response.status);
  }

  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return null;
  }
  return response.json();
}
