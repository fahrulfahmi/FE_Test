
export type DashboardPeriod = "7d" | "30d" | "90d";

export interface DashboardFilters {
  period: DashboardPeriod;
  tollRoad: string;
}

export interface DashboardSummary {
  totalTransactions: number;
  totalRevenue: number;
  activeGates: number;
  totalGates: number;
  transactionGrowth: number;
  revenueGrowth: number;
}

export interface TransactionTrend {
  date: string;
  transactions: number;
  revenue: number;
}

export type TransactionStatus = "success" | "pending" | "failed";

export interface RecentTransaction {
  id: string;
  transactionCode: string;
  plateNumber: string;
  vehicleType: string;
  tollGate: string;
  tollRoad: string;
  paymentMethod: string;
  amount: number;
  status: TransactionStatus;
  timestamp: string;
}

export type TollGateStatusType = "active" | "inactive" | "maintenance";

export interface TollGate {
  id: string;
  name: string;
  tollRoad: string;
  location: string;
  status: TollGateStatusType;
  transactions: number;
}

export interface DashboardData {
  summary: DashboardSummary;
  trends: TransactionTrend[];
  recentTransactions: RecentTransaction[];
  tollGates: TollGate[];
}

export interface TollRoadOption {
  value: string;
  label: string;
}
