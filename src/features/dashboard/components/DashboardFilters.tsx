
"use client";

import { Filter } from "lucide-react";
import { useLocale } from "next-intl";
import {
  DASHBOARD_COPY,
  DASHBOARD_PERIODS,
  TOLL_ROADS,
  type DashboardLocale,
} from "../constants/dashboard.constants";
import type { DashboardFilters as DashboardFiltersType } from "../types/dashboard.types";

interface DashboardFiltersProps {
  filters: DashboardFiltersType;
  onChange: (filters: DashboardFiltersType) => void;
}

export default function DashboardFilters({
  filters,
  onChange,
}: DashboardFiltersProps) {
  const locale = useLocale() as DashboardLocale;
  const copy = DASHBOARD_COPY[locale];

  const periodLabels = {
    "7d": locale === "id" ? "7 Hari" : "7 Days",
    "30d": locale === "id" ? "30 Hari" : "30 Days",
    "90d": locale === "id" ? "90 Hari" : "90 Days",
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Filter className="size-4 text-muted-foreground" />
        {locale === "id" ? "Filter Dashboard" : "Dashboard Filters"}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2">
          <span className="shrink-0 text-xs text-muted-foreground">
            {copy.period}
          </span>
          <select
            value={filters.period}
            onChange={(event) =>
              onChange({
                ...filters,
                period: event.target.value as DashboardFiltersType["period"],
              })
            }
            className="h-9 min-w-0 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
          >
            {DASHBOARD_PERIODS.map((period) => (
              <option key={period.value} value={period.value}>
                {periodLabels[period.value]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="shrink-0 text-xs text-muted-foreground">
            {copy.tollRoad}
          </span>
          <select
            value={filters.tollRoad}
            onChange={(event) =>
              onChange({
                ...filters,
                tollRoad: event.target.value,
              })
            }
            className="h-9 min-w-0 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
          >
            {TOLL_ROADS.map((road) => (
              <option key={road.value} value={road.value}>
                {road.value === "all"
                  ? copy.allRoads
                  : road.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
