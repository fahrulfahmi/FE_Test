
import type {
  RecentTransaction,
  TollGate,
  TransactionTrend,
} from "../types/dashboard.types";

const now = new Date();

const getDate = (daysAgo: number) => {
  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  return date;
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const MOCK_TRENDS: TransactionTrend[] = Array.from(
  { length: 90 },
  (_, index) => {
    const daysAgo = 89 - index;
    const date = getDate(daysAgo);
    const transactions = 12000 + Math.floor(Math.random() * 9000);

    return {
      date: formatDate(date),
      transactions,
      revenue: transactions * (7500 + Math.floor(Math.random() * 5000)),
    };
  },
);

export const MOCK_TOLL_GATES: TollGate[] = [
  {
    id: "GT-001",
    name: "GT Cikampek Utama 1",
    tollRoad: "Jakarta-Cikampek",
    location: "Cikampek",
    status: "active",
    transactions: 12450,
  },
  {
    id: "GT-002",
    name: "GT Cikampek Utama 2",
    tollRoad: "Jakarta-Cikampek",
    location: "Cikampek",
    status: "active",
    transactions: 11280,
  },
  {
    id: "GT-003",
    name: "GT Bekasi Barat",
    tollRoad: "Jakarta-Cikampek",
    location: "Bekasi",
    status: "active",
    transactions: 9850,
  },
  {
    id: "GT-004",
    name: "GT Cibubur",
    tollRoad: "Jagorawi",
    location: "Cibubur",
    status: "active",
    transactions: 8730,
  },
  {
    id: "GT-005",
    name: "GT Bogor",
    tollRoad: "Jagorawi",
    location: "Bogor",
    status: "maintenance",
    transactions: 0,
  },
  {
    id: "GT-006",
    name: "GT Pondok Pinang",
    tollRoad: "JORR",
    location: "Jakarta Selatan",
    status: "active",
    transactions: 7630,
  },
  {
    id: "GT-007",
    name: "GT Bintaro",
    tollRoad: "JORR",
    location: "Bintaro",
    status: "inactive",
    transactions: 0,
  },
];

const VEHICLES = [
  "Sedan",
  "SUV",
  "Bus",
  "Truk",
  "Sepeda Motor",
];

const PAYMENT_METHODS = [
  "E-Toll",
  "Flazz",
  "TapCash",
  "Brizzi",
  "e-Money",
];

const MOCK_PLATES = [
  "B 1234 ABC",
  "D 5678 XYZ",
  "F 9012 DEF",
  "B 3456 GHI",
  "T 7890 JKL",
  "B 1122 MNO",
];

const GATES = MOCK_TOLL_GATES.filter(
  (gate) => gate.status === "active",
);

export const MOCK_TRANSACTIONS: RecentTransaction[] = Array.from(
  { length: 40 },
  (_, index) => {
    const gate = GATES[index % GATES.length];
    const timestamp = getDate(Math.floor(Math.random() * 7));

    timestamp.setHours(
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60),
    );

    const statuses = ["success", "success", "success", "pending", "failed"] as const;

    return {
      id: `TRX-${String(index + 1).padStart(5, "0")}`,
      transactionCode: `TCM-${Date.now().toString().slice(-5)}-${String(index + 1).padStart(3, "0")}`,
      plateNumber: MOCK_PLATES[index % MOCK_PLATES.length],
      vehicleType: VEHICLES[index % VEHICLES.length],
      tollGate: gate.name,
      tollRoad: gate.tollRoad,
      paymentMethod: PAYMENT_METHODS[index % PAYMENT_METHODS.length],
      amount: [7000, 10000, 15000, 20000, 25000][index % 5],
      status: statuses[index % statuses.length],
      timestamp: timestamp.toISOString(),
    };
  },
);
