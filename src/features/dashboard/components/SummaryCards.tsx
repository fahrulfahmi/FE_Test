
"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  CreditCard,
  Construction,
} from "lucide-react";
import { useLocale } from "next-intl";
import {
  DASHBOARD_COPY,
  type DashboardLocale,
} from "../constants/dashboard.constants";
import type { DashboardSummary } from "../types/dashboard.types";

interface SummaryCardsProps {
  summary: DashboardSummary;
}

const formatNumber = (value: number, locale: string) =>
  new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US").format(value);

const formatCurrency = (value: number, locale: string) =>
  new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function SummaryCards({ summary }: SummaryCardsProps) {
  const locale = useLocale() as DashboardLocale;
  const copy = DASHBOARD_COPY[locale];

  const cards = [
    {
      title: copy.totalTransactions,
      value: formatNumber(summary.totalTransactions, locale),
      growth: summary.transactionGrowth,
      icon: CreditCard,
      iconClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: copy.totalRevenue,
      value: formatCurrency(summary.totalRevenue, locale),
      growth: summary.revenueGrowth,
      icon: CircleDollarSign,
      iconClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: copy.activeGates,
      value: `${summary.activeGates}/${summary.totalGates}`,
      growth: null,
      icon: Activity,
      iconClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
    {
      title: copy.operationalGates,
      value: `${Math.round(
        (summary.activeGates / Math.max(summary.totalGates, 1)) * 100,
      )}%`,
      growth: null,
      icon: Construction,
      iconClass: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isPositive = (card.growth ?? 0) >= 0;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                {card.title}
              </p>
              <div className={`rounded-lg p-2 ${card.iconClass}`}>
                <Icon className="size-5" />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">
              {card.value}
            </p>

            {card.growth !== null && (
              <div className="mt-2 flex items-center gap-1 text-xs">
                {isPositive ? (
                  <ArrowUpRight className="size-3.5 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="size-3.5 text-red-500" />
                )}
                <span
                  className={
                    isPositive ? "font-medium text-emerald-600" : "font-medium text-red-500"
                  }
                >
                  {Math.abs(card.growth)}%
                </span>
                <span className="text-muted-foreground">
                  {copy.comparedToPrevious}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
