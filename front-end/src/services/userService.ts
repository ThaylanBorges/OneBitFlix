import { apiWithAuth } from "./apiWithAuth";

export const userService = {
  getCurrentUser: async () => {
    try {
      const user = await apiWithAuth("/users/current");
      return { ...user, success: true };
    } catch {
      return { success: false };
    }
  },
};
