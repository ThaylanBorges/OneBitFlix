import { Register } from "@/schemas/registerSchema";
import { api } from "./api";
import { Login } from "@/schemas/loginSchema";

export const authService = {
  register: async (data: Register) => {
    return api("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  login: async (data: Login) => {
    return api("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  logout: async () => {
    return api("/auth/logout", {
      method: "POST",
    });
  },
};
