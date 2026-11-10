
"use client";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";
import { useLocale } from "next-intl";
import {
  DASHBOARD_COPY,
  TOLL_GATE_STATUS_LABELS,
  type DashboardLocale,
} from "../constants/dashboard.constants";
import type { TollGate } from "../types/dashboard.types";

interface TollGateStatusProps {
  data: TollGate[];
}

const formatNumber = (value: number, locale: string) =>
  new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US").format(value);

export default function TollGateStatus({ data }: TollGateStatusProps) {
  const locale = useLocale() as DashboardLocale;
  const copy = DASHBOARD_COPY[locale];

  const statusConfig = {
    active: {
      icon: CheckCircle2,
      className: "text-emerald-600 dark:text-emerald-400",
      dotClass: "bg-emerald-500",
    },
    inactive: {
      icon: AlertTriangle,
      className: "text-red-600 dark:text-red-400",
      dotClass: "bg-red-500",
    },
    maintenance: {
      icon: Clock,
      className: "text-amber-600 dark:text-amber-400",
      dotClass: "bg-amber-500",
    },
  };

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">
            {copy.tollGateStatus}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {locale === "id"
              ? "Kondisi operasional setiap gardu"
              : "Operational condition of each toll gate"}
          </p>
        </div>
        <Activity className="size-5 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {data.map((gate) => {
          const config = statusConfig[gate.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={gate.id}
              className="flex items-start justify-between gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-muted p-2">
                  <MapPin className="size-4 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {gate.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {gate.location} · {gate.tollRoad}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatNumber(gate.transactions, locale)}{" "}
                    {copy.transactions.toLowerCase()}
                  </p>
                </div>
              </div>

              <div className={`flex shrink-0 items-center gap-1.5 text-xs font-medium ${config.className}`}>
                <span className={`size-2 rounded-full ${config.dotClass}`} />
                <StatusIcon className="size-3.5" />
                {TOLL_GATE_STATUS_LABELS[gate.status][locale]}
              </div>
            </div>
          );
        })}

        {data.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {copy.noGates}
          </p>
        )}
      </div>
    </section>
  );
}
