import { Register } from "@/schemas/register";
import { api } from "./api";

export const userService = {
  register: async (data: Register) => {
    const res = await api("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return res;
  },
};
