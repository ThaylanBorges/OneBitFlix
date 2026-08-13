import { apiWithAuth } from "./apiWithAuth";

export const userService = {
  getCurrentUser: async () => {
    return apiWithAuth("/users/current");
  },
};
