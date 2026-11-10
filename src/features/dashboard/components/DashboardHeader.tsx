
"use client";

import { Activity } from "lucide-react";
import { useLocale } from "next-intl";
import {
  DASHBOARD_COPY,
  type DashboardLocale,
} from "../constants/dashboard.constants";

export default function DashboardHeader() {
  const locale = useLocale() as DashboardLocale;
  const copy = DASHBOARD_COPY[locale];

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {copy.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {copy.subtitle}
        </p>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <Activity className="size-3.5" />
        System Operational
      </div>
    </div>
  );
}
