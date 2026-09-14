import { EditPassword, EditProfile, UserSchema } from "@/schemas/userSchemas";
import { apiWithAuth } from "./apiWithAuth";
import { cache } from "react";

export const userService = {
  getCurrentUser: cache(async () => {
    try {
      const user = await apiWithAuth("/users/current");
      return UserSchema.parse(user);
    } catch {
      return null;
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
