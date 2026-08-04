import { Register } from "@/schemas/register";
import { api } from "./api";

export const User = {
  register: async (data: Register) => {
    return api("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
