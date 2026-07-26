import api from "./api";

import type { DashboardSummary } from "../types/dashboard";

export async function getDashboardSummary() {
  const response =
    await api.get<DashboardSummary>(
      "/dashboard/summary"
    );

  return response.data;
}