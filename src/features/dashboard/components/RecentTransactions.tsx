
"use client";

import { ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocale } from "next-intl";

import {
  DASHBOARD_COPY,
  TRANSACTION_STATUS_LABELS,
  type DashboardLocale,
} from "../constants/dashboard.constants";
import type { RecentTransaction } from "../types/dashboard.types";

interface RecentTransactionsProps {
  data: RecentTransaction[];
}

const formatCurrency = (amount: number, locale: DashboardLocale) =>
  new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (value: string, locale: DashboardLocale) =>
  new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export default function RecentTransactions({
  data,
}: RecentTransactionsProps) {
  const locale = useLocale() as DashboardLocale;
  const copy = DASHBOARD_COPY[locale];

  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return data;

    return data.filter((transaction) =>
      [
        transaction.transactionCode,
        transaction.plateNumber,
        transaction.vehicleType,
        transaction.tollGate,
        transaction.paymentMethod,
      ].some((value) => value.toLowerCase().includes(keyword)),
    );
  }, [data, search]);

  const statusStyles = {
    success:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    pending:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    failed:
      "bg-red-500/10 text-red-600 dark:text-red-400",
  } as const;

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-foreground">
            {copy.recentTransactions}
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            {locale === "id"
              ? "Aktivitas transaksi terbaru"
              : "Latest transaction activities"}
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchPlaceholder}
            className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-muted/50 text-xs text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">
                {copy.date}
              </th>

              <th className="px-5 py-3 font-medium">
                {copy.transactionCode}
              </th>

              <th className="px-5 py-3 font-medium">
                {copy.vehicle}
              </th>

              <th className="px-5 py-3 font-medium">
                {copy.tollGate}
              </th>

              <th className="px-5 py-3 font-medium">
                {copy.payment}
              </th>

              <th className="px-5 py-3 text-right font-medium">
                {copy.amount}
              </th>

              <th className="px-5 py-3 text-center font-medium">
                {copy.status}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {filteredTransactions.map((transaction) => {
              const statusLabel =
                TRANSACTION_STATUS_LABELS[transaction.status][locale];

              return (
                <tr
                  key={transaction.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                    {formatDate(transaction.timestamp, locale)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium text-foreground">
                    {transaction.transactionCode}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-foreground">
                      {transaction.plateNumber}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {transaction.vehicleType}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                    {transaction.tollGate}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                    {transaction.paymentMethod}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-foreground">
                    {formatCurrency(transaction.amount, locale)}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[transaction.status]}`}
                    >
                      {statusLabel}
                    </span>
                  </td>
                </tr>
              );
            })}

            {filteredTransactions.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-sm text-muted-foreground"
                >
                  {copy.noTransactions}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <p className="text-xs text-muted-foreground">
          {locale === "id"
            ? `Menampilkan ${filteredTransactions.length} dari ${data.length} transaksi`
            : `Showing ${filteredTransactions.length} of ${data.length} transactions`}
        </p>

        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
          {copy.recentTransactions}
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </section>
  );
}
