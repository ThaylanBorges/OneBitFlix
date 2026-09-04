import { EditPassword, EditProfile } from "@/schemas/userSchemas";
import { apiWithAuth } from "./apiWithAuth";
import { cache } from "react";

export const userService = {
  getCurrentUser: cache(async () => {
    try {
      const user = await apiWithAuth("/users/current");
      return { ...user, success: true };
    } catch {
      return { success: false };
    }
  }),
  editUser: async (data: EditProfile) => {
    return apiWithAuth("/users/current", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  editPassword: async (data: EditPassword) => {
    return apiWithAuth("/users/current/password", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
