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

interface RevenueChartProps {
  data: TransactionTrend[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const { resolvedTheme } = useTheme();
  const locale = useLocale() as DashboardLocale;
  const copy = DASHBOARD_COPY[locale];

  const options = useMemo<Highcharts.Options>(() => {
    const isDark = resolvedTheme === "dark";

    return {
      chart: {
        type: "column",
        backgroundColor: "transparent",
        height: 280,
        style: {
          fontFamily: "inherit",
        },
      },
      title: {
        text: undefined,
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        categories: data.map((item) =>
          new Date(`${item.date}T00:00:00`).toLocaleDateString(
            locale === "id" ? "id-ID" : "en-US",
            {
              day: "numeric",
              month: "short",
            },
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
        title: {
          text: undefined,
        },
        gridLineColor: isDark ? "#374151" : "#f1f5f9",
        labels: {
          style: {
            color: isDark ? "#9ca3af" : "#6b7280",
            fontSize: "11px",
          },
          formatter() {
            return new Intl.NumberFormat(
              locale === "id" ? "id-ID" : "en-US",
              {
                notation: "compact",
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              },
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
      },
      plotOptions: {
        column: {
          borderRadius: 4,
          pointPadding: 0.08,
          groupPadding: 0.12,
          borderWidth: 0,
        },
      },
      series: [
        {
          type: "column",
          name: copy.revenue,
          data: data.map((item) => item.revenue),
          color: "#10b981",
        },
      ],
    };
  }, [copy.revenue, data, locale, resolvedTheme]);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="font-semibold text-foreground">
          {copy.revenueAnalytics}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {locale === "id"
            ? "Pendapatan berdasarkan periode"
            : "Revenue over time"}
        </p>
      </div>

      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}