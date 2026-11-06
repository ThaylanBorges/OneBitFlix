import { DashboardSchema } from "@/schemas/admin/dashboardSchema";
import { apiWithAuth } from "../apiWithAuth";

export const dashboardService = {
  dashboard: async () => {
    const result = await apiWithAuth("/management/dashboard");

    return DashboardSchema.parse(result);
  },
};
