
"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import {
  DASHBOARD_COPY,
  type DashboardLocale,
} from "../constants/dashboard.constants";
import type { TransactionTrend } from "../types/dashboard.types";

interface TransactionChartProps {
  data: TransactionTrend[];
}

export default function TransactionChart({ data }: TransactionChartProps) {
  const { resolvedTheme } = useTheme();
  const locale = useLocale() as DashboardLocale;
  const copy = DASHBOARD_COPY[locale];

  const options = useMemo<Highcharts.Options>(() => {
    const isDark = resolvedTheme === "dark";

    return {
      chart: {
        type: "areaspline",
        backgroundColor: "transparent",
        height: 280,
        style: {
          fontFamily: "inherit",
        },
      },
      title: { text: undefined },
      credits: { enabled: false },
      legend: { enabled: false },
      xAxis: {
        categories: data.map((item) =>
          new Date(`${item.date}T00:00:00`).toLocaleDateString(
            locale === "id" ? "id-ID" : "en-US",
            { day: "numeric", month: "short" },
          ),
        ),
        lineColor: isDark ? "#374151" : "#e5e7eb",
        tickColor: "transparent",
        labels: {
          style: {
            color: isDark ? "#9ca3af" : "#6b7280",
            fontSize: "11px",
          },
        },
      },
      yAxis: {
        title: { text: undefined },
        gridLineColor: isDark ? "#374151" : "#f1f5f9",
        labels: {
          style: {
            color: isDark ? "#9ca3af" : "#6b7280",
            fontSize: "11px",
          },
          formatter() {
            return new Intl.NumberFormat(
              locale === "id" ? "id-ID" : "en-US",
              { notation: "compact" },
            ).format(Number(this.value));
          },
        },
      },
      tooltip: {
        shared: true,
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
        borderColor: isDark ? "#374151" : "#e5e7eb",
        style: {
          color: isDark ? "#f9fafb" : "#111827",
        },
        valueDecimals: 0,
      },
      plotOptions: {
        areaspline: {
          lineWidth: 2,
          marker: {
            enabled: false,
            radius: 3,
          },
        },
      },
      series: [
        {
          type: "areaspline",
          name: copy.transactions,
          data: data.map((item) => item.transactions),
          color: "#3b82f6",
          fillColor: {
            linearGradient: [0, 0, 0, 250],
            stops: [
              [0, "rgba(59, 130, 246, 0.25)"],
              [1, "rgba(59, 130, 246, 0.01)"],
            ],
          },
        },
      ],
    };
  }, [copy.transactions, data, locale, resolvedTheme]);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="font-semibold text-foreground">
          {copy.transactionAnalytics}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {locale === "id"
            ? "Volume transaksi berdasarkan periode"
            : "Transaction volume over time"}
        </p>
      </div>

      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}
