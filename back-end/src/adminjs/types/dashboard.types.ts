export interface DashboardMetrics {
  courses: number;
  episodes: number;
  categories: number;
  standardUsers: number;
}

export interface DashboardData extends DashboardMetrics {
  recentUsers?: Array<{
    id: number;
    firstName: string;
    email: string;
    createdAt: string;
  }>;
}
