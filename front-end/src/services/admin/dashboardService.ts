import { apiWithAuth } from "../apiWithAuth";

export const dashboardService = {
  dashboard: async () => {
    return await apiWithAuth("/management/dashboard");
  },
};
