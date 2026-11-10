"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import type { DashboardFilters } from "../types/dashboard.types";

export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  detail: (filters: DashboardFilters) =>
    [...dashboardQueryKeys.all, filters] as const,
};

export function useDashboard(filters: DashboardFilters) {
  return useQuery({
    queryKey: dashboardQueryKeys.detail(filters),
    queryFn: () => dashboardService.getDashboard(filters),
    staleTime: 60_000,
  });
}