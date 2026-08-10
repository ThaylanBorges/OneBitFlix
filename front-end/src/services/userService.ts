import { apiWithAuth } from "./api";

export const userService = {
  getCurrentUser: async () => {
    return apiWithAuth("/users/current");
  },
};
