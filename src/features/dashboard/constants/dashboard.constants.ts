
import type { DashboardPeriod } from "../types/dashboard.types";

export const DASHBOARD_PERIODS: {
  value: DashboardPeriod;
  label: string;
}[] = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
];

export const TOLL_ROADS = [
  { value: "all", label: "All Toll Roads" },
  { value: "Jakarta-Cikampek", label: "Jakarta - Cikampek" },
  { value: "Jagorawi", label: "Jagorawi" },
  { value: "JORR", label: "JORR" },
];

export const TRANSACTION_STATUS_LABELS = {
  success: {
    id: "Berhasil",
    en: "Success",
  },
  pending: {
    id: "Pending",
    en: "Pending",
  },
  failed: {
    id: "Gagal",
    en: "Failed",
  },
} as const;

export const TOLL_GATE_STATUS_LABELS = {
  active: {
    id: "Aktif",
    en: "Active",
  },
  inactive: {
    id: "Tidak Aktif",
    en: "Inactive",
  },
  maintenance: {
    id: "Pemeliharaan",
    en: "Maintenance",
  },
} as const;

export const DASHBOARD_COPY = {
  id: {
    title: "Dashboard Operasional",
    subtitle: "Pantau aktivitas dan performa operasional jalan tol.",
    totalTransactions: "Total Transaksi",
    totalRevenue: "Total Pendapatan",
    activeGates: "Gardu Aktif",
    operationalGates: "Status Operasional",
    transactionAnalytics: "Analitik Transaksi",
    revenueAnalytics: "Analitik Pendapatan",
    recentTransactions: "Transaksi Terbaru",
    tollGateStatus: "Status Gardu Tol",
    viewAll: "Lihat Semua",
    allRoads: "Semua Ruas Tol",
    period: "Periode",
    tollRoad: "Ruas Tol",
    transactions: "Transaksi",
    revenue: "Pendapatan",
    transactionCode: "Kode Transaksi",
    vehicle: "Kendaraan",
    tollGate: "Gardu",
    payment: "Pembayaran",
    amount: "Nominal",
    status: "Status",
    date: "Tanggal",
    noTransactions: "Tidak ada transaksi ditemukan.",
    noGates: "Tidak ada data gardu.",
    active: "Aktif",
    inactive: "Tidak Aktif",
    maintenance: "Pemeliharaan",
    comparedToPrevious: "dibanding periode sebelumnya",
    plateNumber: "Nomor Polisi",
    all: "Semua",
    searchPlaceholder: "Cari transaksi...",
  },
  en: {
    title: "Operational Dashboard",
    subtitle: "Monitor toll road activity and operational performance.",
    totalTransactions: "Total Transactions",
    totalRevenue: "Total Revenue",
    activeGates: "Active Gates",
    operationalGates: "Operational Status",
    transactionAnalytics: "Transaction Analytics",
    revenueAnalytics: "Revenue Analytics",
    recentTransactions: "Recent Transactions",
    tollGateStatus: "Toll Gate Status",
    viewAll: "View All",
    allRoads: "All Toll Roads",
    period: "Period",
    tollRoad: "Toll Road",
    transactions: "Transactions",
    revenue: "Revenue",
    transactionCode: "Transaction Code",
    vehicle: "Vehicle",
    tollGate: "Gate",
    payment: "Payment",
    amount: "Amount",
    status: "Status",
    date: "Date",
    noTransactions: "No transactions found.",
    noGates: "No gate data available.",
    active: "Active",
    inactive: "Inactive",
    maintenance: "Maintenance",
    comparedToPrevious: "compared to previous period",
    plateNumber: "Plate Number",
    all: "All",
    searchPlaceholder: "Search transactions...",
  },
} as const;

export type DashboardLocale = keyof typeof DASHBOARD_COPY;
