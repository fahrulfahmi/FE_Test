
import {
  MOCK_TOLL_GATES,
  MOCK_TRANSACTIONS,
  MOCK_TRENDS,
} from "../mocks/dashboard.mock.ts";
import type {
  DashboardData,
  DashboardFilters,
  DashboardSummary,
  TransactionTrend,
} from "../types/dashboard.types";

const delay = (duration = 300) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const getPeriodDays = (period: DashboardFilters["period"]) => {
  const periodDays = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
  };

  return periodDays[period];
};

const filterByTollRoad = <T extends { tollRoad: string }>(
  items: T[],
  tollRoad: string,
) => {
  if (tollRoad === "all") return items;

  return items.filter((item) => item.tollRoad === tollRoad);
};

const calculateSummary = (
  trends: TransactionTrend[],
  activeGates: number,
  totalGates: number,
): DashboardSummary => ({
  totalTransactions: trends.reduce(
    (total, item) => total + item.transactions,
    0,
  ),
  totalRevenue: trends.reduce(
    (total, item) => total + item.revenue,
    0,
  ),
  activeGates,
  totalGates,
  transactionGrowth: 12.8,
  revenueGrowth: 8.4,
});

export const dashboardService = {
  async getDashboard(
    filters: DashboardFilters,
  ): Promise<DashboardData> {
    await delay();

    const periodDays = getPeriodDays(filters.period);

    const trends = MOCK_TRENDS.slice(-periodDays);

    const filteredGates = filterByTollRoad(
      MOCK_TOLL_GATES,
      filters.tollRoad,
    );

    const filteredTrends = filters.tollRoad === "all"
      ? trends
      : trends.map((trend, index) => {
          const ratio = Math.max(
            filteredGates.length / MOCK_TOLL_GATES.length,
            0.1,
          );

          return {
            ...trend,
            transactions: Math.floor(
              trend.transactions * ratio,
            ),
            revenue: Math.floor(trend.revenue * ratio),
          };
        });

    const filteredTransactions = filterByTollRoad(
      MOCK_TRANSACTIONS,
      filters.tollRoad,
    ).slice(0, 10);

    const activeGates = filteredGates.filter(
      (gate) => gate.status === "active",
    ).length;

    const summary = calculateSummary(
      filteredTrends,
      activeGates,
      filteredGates.length,
    );

    return {
      summary,
      trends: filteredTrends,
      recentTransactions: filteredTransactions,
      tollGates: filteredGates,
    };
  },
};
