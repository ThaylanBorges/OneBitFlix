import { Login, Register } from "@/schemas/authSchemas";
import { api } from "./api";

export const authService = {
  register: async (data: Register) => {
    return api("/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  login: async (data: Login) => {
    return api("/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  logout: async () => {
    return api("/logout", {
      method: "POST",
    });
  },
};
