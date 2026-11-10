
"use client";

import { useState } from "react";
import { LoaderCircle, RefreshCw } from "lucide-react";

import DashboardFilters from "../components/DashboardFilters";
import DashboardHeader from "../components/DashboardHeader";
import RecentTransactions from "../components/RecentTransactions";
import RevenueChart from "../components/RevenueChart";
import SummaryCards from "../components/SummaryCards";
import TollGateStatus from "../components/TollGateStatus";
import TransactionChart from "../components/TransactionChart";
import { useDashboard } from "../hooks/useDashboard";
import type { DashboardFilters as DashboardFiltersType } from "../types/dashboard.types";

const INITIAL_FILTERS: DashboardFiltersType = {
  period: "7d",
  tollRoad: "all",
};

function DashboardLoading() {
  return (
    <div className="flex min-h-100 items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <LoaderCircle className="size-5 animate-spin" />
        Loading dashboard...
      </div>
    </div>
  );
}

function DashboardError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center gap-3 text-center">
      <p className="font-medium text-foreground">
        Failed to load dashboard data.
      </p>

      <p className="text-sm text-muted-foreground">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <RefreshCw className="size-4" />
        Retry
      </button>
    </div>
  );
}

export default function DashboardPage() {
  const [filters, setFilters] =
    useState<DashboardFiltersType>(INITIAL_FILTERS);

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useDashboard(filters);

  if (isPending) {
    return <DashboardLoading />;
  }

  if (isError) {
    return (
      <DashboardError
        message={error.message}
        onRetry={() => void refetch()}
      />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <DashboardHeader />

        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="inline-flex h-9 w-fit items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            className={`size-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      <DashboardFilters filters={filters} onChange={setFilters} />

      <SummaryCards summary={data.summary} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <TransactionChart data={data.trends} />
        <RevenueChart data={data.trends} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
        <RecentTransactions data={data.recentTransactions} />
        <TollGateStatus data={data.tollGates} />
      </div>
    </div>
  );
}
